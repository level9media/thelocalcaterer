/**
 * Portal Order Router
 * Handles multi-student meal ordering for authenticated parents.
 * Each checkout session can include multiple students × multiple meals.
 */
import { z } from "zod";
import { router, publicProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { lunchOrders, lunchOrderItems, students, parentAccounts } from "../drizzle/schema";
import { eq, desc, and, inArray } from "drizzle-orm";
import Stripe from "stripe";
import { AUGUST_MENU } from "./lunchRouter";
import { getAuthenticatedParent } from "./parentAuthRouter";
import { sendLeadEmail } from "./email";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" });
const MEAL_PRICE_CENTS = 800; // $8.00

function isOrderingOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  if (day === 5 && (hour > 12 || (hour === 12 && minute >= 0))) return false;
  if (day === 6 || day === 0) return false;
  return true;
}

export const portalOrderRouter = router({
  /**
   * Create a Stripe checkout for multiple students.
   * Input: { selections: [{ studentId, mealIds: string[] }] }
   * Each studentId × mealId = one $8 line item.
   */
  createCheckout: publicProcedure
    .input(
      z.object({
        selections: z
          .array(
            z.object({
              studentId: z.number(),
              mealIds: z.array(z.string()).min(1),
            })
          )
          .min(1),
        origin: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const parent = await getAuthenticatedParent(ctx);
      if (!parent) throw new TRPCError({ code: "UNAUTHORIZED", message: "Please log in." });

      if (!isOrderingOpen()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Ordering is currently closed. Orders close every Friday at 12 PM.",
        });
      }

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Verify all students belong to this parent
      const studentIds = input.selections.map((s) => s.studentId);
      const parentStudents = await db
        .select()
        .from(students)
        .where(and(eq(students.parentAccountId, parent.id), inArray(students.id, studentIds)));

      const validStudentIds = new Set(parentStudents.map((s) => s.id));
      const studentMap = new Map(parentStudents.map((s) => [s.id, s]));

      // Build line items and validate meal IDs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineItems: any[] = [];
      let totalMealCount = 0;
      let totalCents = 0;

      const validSelections: { studentId: number; studentName: string; mealIds: string[] }[] = [];

      for (const sel of input.selections) {
        if (!validStudentIds.has(sel.studentId)) continue;
        const student = studentMap.get(sel.studentId)!;
        const validMealIds = sel.mealIds.filter((id) => AUGUST_MENU.some((m) => m.id === id));
        if (validMealIds.length === 0) continue;

        validSelections.push({
          studentId: sel.studentId,
          studentName: student.name,
          mealIds: validMealIds,
        });

        for (const mealId of validMealIds) {
          const meal = AUGUST_MENU.find((m) => m.id === mealId)!;
          lineItems.push({
            price_data: {
              currency: "usd",
              product_data: {
                name: `${student.name} — ${meal.day}, ${meal.date}: ${meal.name}`,
                description: meal.description,
              },
              unit_amount: MEAL_PRICE_CENTS,
            },
            quantity: 1,
          });
          totalMealCount++;
          totalCents += MEAL_PRICE_CENTS;
        }
      }

      if (lineItems.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "No valid meals selected." });
      }

      // Build a summary student name for the legacy field
      const studentNames = validSelections.map((s) => s.studentName).join(", ");

      // Create pending order
      const [result] = await db.insert(lunchOrders).values({
        parentName: parent.name,
        email: parent.email,
        parentAccountId: parent.id,
        studentName: studentNames,
        allergies: null,
        selectedMeals: validSelections.map((s) => s.mealIds).flat(),
        mealCount: totalMealCount,
        totalCents,
        paymentStatus: "pending",
      });

      const orderId = (result as any).insertId as number;

      // Insert order items
      const itemRows = validSelections.flatMap((sel) =>
        sel.mealIds.map((mealId) => ({
          orderId,
          studentId: sel.studentId,
          studentName: sel.studentName,
          mealId,
        }))
      );
      await db.insert(lunchOrderItems).values(itemRows);

      // Create Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        customer_email: parent.email,
        success_url: `${input.origin}/school-lunch/portal?success=1&order=${orderId}`,
        cancel_url: `${input.origin}/school-lunch/portal?cancelled=1`,
        metadata: {
          orderId: orderId.toString(),
          parentName: parent.name,
          parentAccountId: parent.id.toString(),
          studentNames,
        },
      });

      // Update order with session ID
      await db
        .update(lunchOrders)
        .set({ stripeSessionId: session.id })
        .where(eq(lunchOrders.id, orderId));

      return { checkoutUrl: session.url };
    }),

  // Get order history for the current parent
  getMyOrders: publicProcedure.query(async ({ ctx }) => {
    const parent = await getAuthenticatedParent(ctx);
    if (!parent) return [];

    const db = await getDb();
    if (!db) return [];

    const orders = await db
      .select()
      .from(lunchOrders)
      .where(eq(lunchOrders.parentAccountId, parent.id))
      .orderBy(desc(lunchOrders.createdAt));

    // For each order, fetch the items
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await db
          .select()
          .from(lunchOrderItems)
          .where(eq(lunchOrderItems.orderId, order.id));

        // Expand meal IDs to meal details
        const expandedItems = items.map((item) => {
          const meal = AUGUST_MENU.find((m) => m.id === item.mealId);
          return {
            ...item,
            mealName: meal?.name || item.mealId,
            mealDate: meal?.date || "",
            mealDay: meal?.day || "",
          };
        });

        return { ...order, items: expandedItems };
      })
    );

    return ordersWithItems;
  }),
});

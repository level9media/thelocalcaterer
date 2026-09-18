import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { lunchOrders } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import Stripe from "stripe";
import { sendLeadEmail } from "./email";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" });

const MEAL_PRICE_CENTS = 1200; // $12.00
const TAX_RATE = 0.083; // 8.3% sales tax

// August 2026 lunch menu — confirmed dates from Josh Bakken
export const AUGUST_MENU = [
  {
    id: "aug-wed-5",
    day: "Wednesday",
    date: "August 5, 2026",
    dateObj: "2026-08-05",
    name: "Chicken Tenders",
    description: "Crispy chicken tenders with apple slices and ketchup",
  },
  {
    id: "aug-mon-10",
    day: "Monday",
    date: "August 10, 2026",
    dateObj: "2026-08-10",
    name: "Ham & Cheese Hoagie",
    description: "Ham and cheese sandwich on a soft roll with chips and a cookie",
  },
  {
    id: "aug-wed-12",
    day: "Wednesday",
    date: "August 12, 2026",
    dateObj: "2026-08-12",
    name: "BBQ Pulled Chicken",
    description: "Shredded BBQ chicken with mac and cheese and corn",
  },
  {
    id: "aug-mon-17",
    day: "Monday",
    date: "August 17, 2026",
    dateObj: "2026-08-17",
    name: "Chicken Quesadilla",
    description: "Grilled chicken and cheese quesadilla with rice and beans (mild)",
  },
  {
    id: "aug-wed-19",
    day: "Wednesday",
    date: "August 19, 2026",
    dateObj: "2026-08-19",
    name: "Chicken Tenders",
    description: "Crispy chicken tenders with fresh fruit and ranch",
  },
  {
    id: "aug-mon-24",
    day: "Monday",
    date: "August 24, 2026",
    dateObj: "2026-08-24",
    name: "Turkey & Cheese Hoagie",
    description: "Turkey and cheese sandwich on a soft roll with chips and a cookie",
  },
  {
    id: "aug-wed-26",
    day: "Wednesday",
    date: "August 26, 2026",
    dateObj: "2026-08-26",
    name: "Chicken Alfredo Pasta",
    description: "Chicken with pasta in a creamy sauce and vegetables",
  },
  {
    id: "aug-mon-31",
    day: "Monday",
    date: "August 31, 2026",
    dateObj: "2026-08-31",
    name: "Cheese Quesadilla",
    description: "Melted cheese quesadilla with rice and beans (mild)",
  },
];

// Check if ordering is open (closes Friday at 12 PM for the following week)
// Admin email whitelist
function isOrderingOpen(): boolean {
  return true;
}

// Admin email whitelist
const ADMIN_EMAILS = [
  "josh@thelocalcaterer.com",
  "kasandra@thelocalcaterer.com",
  "robertgray@gmail.com",
];

export const lunchRouter = router({
  // Get the menu and ordering status
  getMenu: publicProcedure.query(() => {
    return {
      meals: AUGUST_MENU,
      orderingOpen: isOrderingOpen(),
      cutoffMessage: "",
      pricePerMeal: MEAL_PRICE_CENTS,
    };
  }),

  // Create a Stripe checkout session
  createCheckout: publicProcedure
    .input(
      z.object({
        parentName: z.string().min(1),
        email: z.string().email(),
        studentName: z.string().min(1),
        allergies: z.string().optional(),
        selectedMealIds: z.array(z.string()).min(1),
        origin: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (!isOrderingOpen()) {
        throw new Error("Ordering is currently closed.");
      }

      const validMealIds = input.selectedMealIds.filter((id) =>
        AUGUST_MENU.some((m) => m.id === id)
      );
      if (validMealIds.length === 0) {
        throw new Error("No valid meals selected.");
      }

      const subtotalCents = validMealIds.length * MEAL_PRICE_CENTS;
      const taxCents = Math.round(subtotalCents * TAX_RATE);
      const totalCents = subtotalCents + taxCents;

      // Collapse duplicates into quantity for cleaner Stripe line items
      const mealQuantityMap: Record<string, number> = {};
      for (const id of validMealIds) {
        mealQuantityMap[id] = (mealQuantityMap[id] || 0) + 1;
      }
      const lineItems: { price_data: { currency: string; product_data: { name: string; description?: string }; unit_amount: number }; quantity: number }[] = Object.entries(mealQuantityMap).map(([id, qty]) => {
        const meal = AUGUST_MENU.find((m) => m.id === id)!;
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${meal.day}, ${meal.date} — ${meal.name}`,
              description: meal.description,
            },
            unit_amount: MEAL_PRICE_CENTS,
          },
          quantity: qty,
        };
      });
      // Add tax as a separate line item
      if (taxCents > 0) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: { name: "Sales Tax (8.3%)" },
            unit_amount: taxCents,
          },
          quantity: 1,
        });
      }

      // Create a pending order in DB first
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const [result] = await db.insert(lunchOrders).values({
        parentName: input.parentName,
        email: input.email,
        studentName: input.studentName,
        allergies: input.allergies || null,
        selectedMeals: validMealIds,
        mealCount: validMealIds.length,
        totalCents,
        paymentStatus: "pending",
      });

      const orderId = (result as any).insertId as number;

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        customer_email: input.email,
        success_url: `${input.origin}/school-lunch?success=1&order=${orderId}`,
        cancel_url: `${input.origin}/school-lunch?cancelled=1`,
        metadata: {
          orderId: orderId.toString(),
          parentName: input.parentName,
          studentName: input.studentName,
          allergies: input.allergies || "",
        },
      });

      // Update order with session ID
      const db2 = await getDb();
      if (!db2) throw new Error("Database unavailable");
      await db2
        .update(lunchOrders)
        .set({ stripeSessionId: session.id })
        .where(eq(lunchOrders.id, orderId));

      return { checkoutUrl: session.url };
    }),

  // Admin: get all orders sorted by meal date
  getOrders: protectedProcedure.query(async ({ ctx }) => {
    const userEmail = ctx.user.email || "";
    if (ctx.user.role !== "admin" && !ADMIN_EMAILS.includes(userEmail)) {
      throw new Error("Access denied.");
    }

      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const orders = await db
        .select()
        .from(lunchOrders)
        .orderBy(desc(lunchOrders.createdAt));

    return orders;
  }),

  // Admin: get orders expanded by individual meal (for kitchen use)
  getOrdersByMeal: protectedProcedure.query(async ({ ctx }) => {
    const userEmail = ctx.user.email || "";
    if (ctx.user.role !== "admin" && !ADMIN_EMAILS.includes(userEmail)) {
      throw new Error("Access denied.");
    }

    const db = await getDb();
    if (!db) throw new Error("Database unavailable");
    const orders = await db
      .select()
      .from(lunchOrders)
      .where(eq(lunchOrders.paymentStatus, "paid"))
      .orderBy(desc(lunchOrders.createdAt));

    // Expand each order into individual meal rows
    const rows: {
      mealDate: string;
      mealDay: string;
      mealName: string;
      studentName: string;
      parentName: string;
      email: string;
      allergies: string;
      orderId: number;
      paidAt: Date;
    }[] = [];

    for (const order of orders) {
      const mealIds = order.selectedMeals as string[];
      for (const mealId of mealIds) {
        const meal = AUGUST_MENU.find((m) => m.id === mealId);
        if (meal) {
          rows.push({
            mealDate: meal.date,
            mealDay: meal.day,
            mealName: meal.name,
            studentName: order.studentName,
            parentName: order.parentName,
            email: order.email,
            allergies: order.allergies || "",
            orderId: order.id,
            paidAt: order.updatedAt,
          });
        }
      }
    }

    // Sort by meal date
    rows.sort((a, b) => {
      const dateA = AUGUST_MENU.find((m) => m.date === a.mealDate)?.dateObj || "";
      const dateB = AUGUST_MENU.find((m) => m.date === b.mealDate)?.dateObj || "";
      return dateA.localeCompare(dateB);
    });

    return rows;
  }),
});

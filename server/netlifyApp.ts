import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import Stripe from "stripe";
import { sql } from "drizzle-orm";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { registerOAuthRoutes } from "./_core/oauth";
import { redirectMiddleware } from "./redirects";
import { registerSitemapRoute } from "./sitemap";
import { getDb } from "./db";
import { lunchOrders } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { sendLunchOrderEmails } from "./email";
import { AUGUST_MENU } from "./lunchRouter";

export function createNetlifyApp() {
  const app = express();

  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const signature = req.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2026-04-22.dahlia" });
      const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
      if (event.id.startsWith("evt_test_")) return res.json({ verified: true });

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = Number.parseInt(session.metadata?.orderId ?? "0", 10);
        const db = await getDb();
        if (orderId && db) {
          const [existing] = await db.select().from(lunchOrders).where(eq(lunchOrders.id, orderId)).limit(1);
          if (existing && existing.paymentStatus !== "paid") {
            await db.update(lunchOrders).set({ paymentStatus: "paid", stripePaymentIntentId: session.payment_intent as string }).where(eq(lunchOrders.id, orderId));
            const [order] = await db.select().from(lunchOrders).where(eq(lunchOrders.id, orderId)).limit(1);
            if (order) {
              const quantities: Record<string, number> = {};
              for (const id of order.selectedMeals as string[]) quantities[id] = (quantities[id] ?? 0) + 1;
              const meals = Object.entries(quantities)
                .map(([id, qty]) => {
                  const meal = AUGUST_MENU.find((entry) => entry.id === id);
                  return meal ? { day: meal.day, date: meal.date, name: meal.name, qty } : null;
                })
                .filter(Boolean) as { day: string; date: string; name: string; qty: number }[];
              await sendLunchOrderEmails({
                parentName: order.parentName,
                parentEmail: order.email,
                studentName: order.studentName,
                allergies: order.allergies || undefined,
                meals,
                totalCents: order.totalCents,
                orderId: order.id,
              });
            }
          }
        }
      }

      return res.json({ received: true });
    } catch (error) {
      console.error("[Netlify webhook] Failed:", error);
      return res.status(400).send("Webhook verification failed");
    }
  });

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(redirectMiddleware);
  registerSitemapRoute(app);
  registerOAuthRoutes(app);
  app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));
  app.get("/api/health", (_req, res) => res.json({ ok: true, runtime: "netlify-functions" }));

  // TEMPORARY: one-time migration runner to create the jobApplications table.
  // Protected by JWT_SECRET as a simple shared secret. Remove this route after use.
  app.get("/api/admin/run-migration", async (req, res) => {
    if (req.query.secret !== process.env.JWT_SECRET) {
      return res.status(403).json({ error: "forbidden" });
    }
    try {
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "no db connection" });
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS \`jobApplications\` (
          \`id\` int AUTO_INCREMENT NOT NULL,
          \`name\` varchar(255) NOT NULL,
          \`email\` varchar(320) NOT NULL,
          \`phone\` varchar(30),
          \`position\` varchar(255) NOT NULL,
          \`experience\` varchar(100),
          \`availability\` varchar(100),
          \`message\` text,
          \`status\` enum('new','reviewed','interviewed','hired','rejected') NOT NULL DEFAULT 'new',
          \`createdAt\` timestamp NOT NULL DEFAULT (now()),
          CONSTRAINT \`jobApplications_id\` PRIMARY KEY(\`id\`)
        )
      `);
      return res.json({ success: true, message: "jobApplications table created (or already existed)" });
    } catch (error: any) {
      return res.status(500).json({
        error: String(error?.message ?? error),
        cause: error?.cause ? String(error.cause?.message ?? error.cause) : null,
        code: error?.cause?.code ?? error?.code ?? null,
        errno: error?.cause?.errno ?? error?.errno ?? null,
        sqlState: error?.cause?.sqlState ?? error?.sqlState ?? null,
      });
    }
  });

  return app;
}
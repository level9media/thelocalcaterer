import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { redirectMiddleware } from "../redirects";
import Stripe from "stripe";
import { getDb } from "../db";
import { lunchOrders } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { sendLunchOrderEmails } from "../email";
import { AUGUST_MENU } from "../lunchRouter";
import { registerSitemapRoute } from "../sitemap";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // ── Stripe webhook — MUST use raw body, registered BEFORE express.json ──
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"] as string;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
      let event: Stripe.Event;
      try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2026-04-22.dahlia" });
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error("[Webhook] Signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = parseInt(session.metadata?.orderId ?? "0");
        if (orderId) {
          try {
            const db = await getDb();
            if (db) {
              // Idempotency: fetch first, only proceed if still pending
              const [existing] = await db
                .select()
                .from(lunchOrders)
                .where(eq(lunchOrders.id, orderId))
                .limit(1);

              if (!existing || existing.paymentStatus === "paid") {
                console.log(`[Webhook] Order ${orderId} already paid — skipping duplicate processing`);
                return res.json({ received: true });
              }

              await db
                .update(lunchOrders)
                .set({
                  paymentStatus: "paid",
                  stripePaymentIntentId: session.payment_intent as string,
                })
                .where(eq(lunchOrders.id, orderId));

              // Re-fetch updated order for email
              const [order] = await db
                .select()
                .from(lunchOrders)
                .where(eq(lunchOrders.id, orderId))
                .limit(1);

              if (order) {
                const mealIds = order.selectedMeals as string[];
                // Collapse duplicate IDs into { meal, qty } for email
                const qtyMap: Record<string, number> = {};
                for (const id of mealIds) qtyMap[id] = (qtyMap[id] || 0) + 1;
                const meals = Object.entries(qtyMap)
                  .map(([id, qty]) => {
                    const meal = AUGUST_MENU.find((m) => m.id === id);
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
          } catch (err) {
            console.error("[Webhook] Failed to update order:", err);
          }
        }
      }

      res.json({ received: true });
    }
  );

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // 301 Redirect middleware — must run before tRPC and OAuth to catch legacy URLs
  app.use(redirectMiddleware);
  // Dynamic sitemap sourced from the same route registry as SSR and the footer.
  registerSitemapRoute(app);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

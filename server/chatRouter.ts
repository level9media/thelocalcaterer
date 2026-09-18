/**
 * AI Chatbot Router
 * Powers the site-wide chatbot for The Local Caterer.
 * Uses the built-in LLM to answer FAQs, guide visitors, and capture leads.
 */
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { createLead } from "./db";
import { sendLeadEmail } from "./email";

const SYSTEM_PROMPT = `You are a friendly, knowledgeable assistant for The Local Caterer — Mesa, Arizona's premier catering company. Your job is to help website visitors get information, answer questions, and guide them toward booking a catering event.

## About The Local Caterer
- **Location:** Mesa, AZ (East Valley) — serving Mesa, Phoenix, Scottsdale, Chandler, and Gilbert
- **Phone:** (480) 718-1671
- **Email:** info@thelocalcaterer.com
- **Booking:** https://www.thelocalcaterer.com/contact
- **Owner/Chef:** Josh Bakken

## Services
- **Wedding Catering** — full-service wedding catering, custom menus, staffing
- **Corporate Catering** — office lunches, corporate events, galas
- **Private Events** — birthdays, anniversaries, celebrations of life, backyard parties
- **Baby Shower Catering** — elegant menus for baby showers
- **BBQ Catering** — outdoor BBQ events, casual gatherings
- **Charcuterie Boards** — event add-ons, grazing tables, gifting

## Menu Options
- Mexican, Italian, Asian, Breakfast, Lunch, Dessert, Sandwich Bar, Holiday menus
- Custom menus available for all events
- Full menu PDF available for download at /catering-menu

## Pricing
- Pricing varies by event size, menu selection, and service level
- We provide free, no-obligation quotes within 24 hours
- Minimum guest counts may apply depending on event type
- Direct visitors to request a quote at: https://www.thelocalcaterer.com/contact

## Frequently Asked Questions
- **How far in advance should I book?** Weddings: 6-12 months. Corporate/private events: 2-4 weeks minimum.
- **Do you provide staff?** Yes — servers, bartenders, and event staff available.
- **Do you handle setup and cleanup?** Yes, full-service packages include setup and breakdown.
- **What areas do you serve?** Mesa, Phoenix, Scottsdale, Chandler, Gilbert, and surrounding East Valley.
- **Can you accommodate dietary restrictions?** Yes — vegetarian, vegan, gluten-free, halal, and allergy-aware menus available.
- **Do you offer tastings?** Yes, tastings can be arranged for weddings and larger events.
- **What is your cancellation policy?** Contact us directly for cancellation terms.

## Lead Capture
If a visitor seems interested in booking or wants a quote, encourage them to:
1. Call (480) 718-1671
2. Visit the contact page at /contact
3. Request a quote at https://www.thelocalcaterer.com/contact

## Tone & Style
- Warm, professional, and enthusiastic about food and events
- Keep responses concise — 2-4 sentences max unless more detail is needed
- Always end with a clear next step (call, contact form, or quote request)
- Never make up pricing — always direct to a quote request
- If you don't know something, say so and direct them to call or email`;

export const chatRouter = router({
  // Main chat endpoint
  message: publicProcedure
    .input(z.object({
      messages: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })),
    }))
    .mutation(async ({ input }) => {
      const llmMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
        { role: "system", content: SYSTEM_PROMPT },
        ...input.messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ];

      const response = await invokeLLM({ messages: llmMessages });

      const content = response.choices?.[0]?.message?.content ?? "I'm sorry, I couldn't process that. Please call us at (480) 718-1671 or visit our contact page.";
      return { content };
    }),

  // Lead capture from chatbot
  captureLead: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      eventType: z.string().optional(),
      message: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await createLead({
        name: input.name,
        email: input.email,
        phone: input.phone,
        eventType: input.eventType,
        message: input.message || "Lead captured via chatbot",
        source: "chatbot",
        status: "new",
      });

      await sendLeadEmail({
        subject: `New Chatbot Lead — ${input.name}`,
        replyTo: input.email,
        fields: {
          Name: input.name,
          Email: input.email,
          Phone: input.phone,
          "Event Type": input.eventType,
          Message: input.message || "Lead captured via chatbot",
        },
      });

      return { success: true };
    }),
});

/**
 * Contact Form Router
 * Handles lead capture for all 5 brands:
 * - The Local Caterer → DB leads table + Mailchimp + email notification
 * - The Local Wedding → DB leads table + Mailchimp + email notification
 * - The Local Meal Prep → DB leads table + Mailchimp + email notification
 * - The Local Charcuterie → DB leads table + Mailchimp + email notification
 * - Bakken Hospitality → DB leads table + Mailchimp + email notification
 *
 * Email notifications go to both josh@thelocalcaterer.com and kasandra@thelocalcaterer.com
 * via Gmail SMTP — sender shows as "The Local Caterer"
 */
import { z } from "zod";
import { publicProcedure, protectedProcedure, router, isAdminUser } from "./_core/trpc";
import { sendLeadEmail } from "./email";
import { addToMailchimp } from "./mailchimp";
import { createLead, getAllLeads, updateLeadStatus, deleteLead } from "./db";
import { TRPCError } from "@trpc/server";

const baseContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

const eventInquirySchema = baseContactSchema.extend({
  eventType: z.string().optional(),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
});

const mealPrepSchema = baseContactSchema.extend({
  mealPlan: z.string().optional(),
  servings: z.string().optional(),
  dietaryNeeds: z.string().optional(),
});

export const contactRouter = router({
  // ─── Public: Form Submissions ────────────────────────────────────────────────

  // The Local Caterer — main catering inquiries
  caterer: publicProcedure
    .input(eventInquirySchema)
    .mutation(async ({ input }) => {
      const [firstName, ...rest] = input.name.split(" ");
      const lastName = rest.join(" ");

      // Save to database
      await createLead({
        name: input.name,
        email: input.email,
        phone: input.phone,
        eventType: input.eventType,
        eventDate: input.eventDate,
        guestCount: input.guestCount,
        message: input.message,
        source: "caterer-contact-form",
        status: "new",
      });

      // Add to Mailchimp
      await addToMailchimp("caterer", {
        email: input.email,
        firstName,
        lastName,
        phone: input.phone,
        tags: ["catering-inquiry", input.eventType || "general"].filter(Boolean),
        mergeFields: {
          EVENT_TYPE: input.eventType || "",
          EVENT_DATE: input.eventDate || "",
          GUESTS: input.guestCount || "",
        },
      });

      // Send email notification to Josh + Kasandra
      await sendLeadEmail({
        subject: `New Catering Inquiry — ${input.name}`,
        replyTo: input.email,
        fields: {
          Name: input.name,
          Email: input.email,
          Phone: input.phone,
          "Event Type": input.eventType,
          "Event Date": input.eventDate,
          "Guest Count": input.guestCount,
          Message: input.message,
        },
      });

      return { success: true, tripleseatUrl: "https://thelocalcaterer.tripleseat.com/party_request/34341" };
    }),

  // The Local Wedding — wedding catering inquiries
  wedding: publicProcedure
    .input(eventInquirySchema)
    .mutation(async ({ input }) => {
      const [firstName, ...rest] = input.name.split(" ");
      const lastName = rest.join(" ");

      await createLead({
        name: input.name,
        email: input.email,
        phone: input.phone,
        eventType: input.eventType || "wedding",
        eventDate: input.eventDate,
        guestCount: input.guestCount,
        message: input.message,
        source: "wedding-contact-form",
        status: "new",
      });

      await addToMailchimp("wedding", {
        email: input.email,
        firstName,
        lastName,
        phone: input.phone,
        tags: ["wedding-inquiry"],
        mergeFields: {
          EVENT_DATE: input.eventDate || "",
          GUESTS: input.guestCount || "",
        },
      });

      await sendLeadEmail({
        subject: `New Wedding Inquiry — ${input.name}`,
        replyTo: input.email,
        fields: {
          Name: input.name,
          Email: input.email,
          Phone: input.phone,
          "Event Date": input.eventDate,
          "Guest Count": input.guestCount,
          Message: input.message,
        },
      });

      return { success: true, tripleseatUrl: "https://thelocalcaterer.tripleseat.com/party_request/34341" };
    }),

  // The Local Meal Prep — meal prep subscriptions
  mealprep: publicProcedure
    .input(mealPrepSchema)
    .mutation(async ({ input }) => {
      const [firstName, ...rest] = input.name.split(" ");
      const lastName = rest.join(" ");

      await createLead({
        name: input.name,
        email: input.email,
        phone: input.phone,
        eventType: "meal-prep",
        message: [input.mealPlan, input.servings, input.dietaryNeeds, input.message]
          .filter(Boolean)
          .join(" | "),
        source: "mealprep-contact-form",
        status: "new",
      });

      await addToMailchimp("mealprep", {
        email: input.email,
        firstName,
        lastName,
        phone: input.phone,
        tags: ["meal-prep-inquiry", input.mealPlan || "general"].filter(Boolean),
        mergeFields: {
          MEAL_PLAN: input.mealPlan || "",
          SERVINGS: input.servings || "",
          DIETARY: input.dietaryNeeds || "",
        },
      });

      await sendLeadEmail({
        subject: `New Meal Prep Inquiry — ${input.name}`,
        replyTo: input.email,
        fields: {
          Name: input.name,
          Email: input.email,
          Phone: input.phone,
          "Meal Plan": input.mealPlan,
          Servings: input.servings,
          "Dietary Needs": input.dietaryNeeds,
          Message: input.message,
        },
      });

      return { success: true };
    }),

  // The Local Charcuterie — charcuterie/event add-on inquiries
  charcuterie: publicProcedure
    .input(eventInquirySchema)
    .mutation(async ({ input }) => {
      const [firstName, ...rest] = input.name.split(" ");
      const lastName = rest.join(" ");

      await createLead({
        name: input.name,
        email: input.email,
        phone: input.phone,
        eventType: input.eventType,
        eventDate: input.eventDate,
        guestCount: input.guestCount,
        message: input.message,
        source: "charcuterie-contact-form",
        status: "new",
      });

      await addToMailchimp("charcuterie", {
        email: input.email,
        firstName,
        lastName,
        phone: input.phone,
        tags: ["charcuterie-inquiry", input.eventType || "general"].filter(Boolean),
        mergeFields: {
          EVENT_TYPE: input.eventType || "",
          EVENT_DATE: input.eventDate || "",
          GUESTS: input.guestCount || "",
        },
      });

      await sendLeadEmail({
        subject: `New Charcuterie Inquiry — ${input.name}`,
        replyTo: input.email,
        fields: {
          Name: input.name,
          Email: input.email,
          Phone: input.phone,
          "Event Type": input.eventType,
          "Event Date": input.eventDate,
          "Guest Count": input.guestCount,
          Message: input.message,
        },
      });

      return { success: true, tripleseatUrl: "https://thelocalcaterer.tripleseat.com/party_request/34341" };
    }),

  // Bakken Hospitality — general brand inquiries
  bakken: publicProcedure
    .input(baseContactSchema)
    .mutation(async ({ input }) => {
      const [firstName, ...rest] = input.name.split(" ");
      const lastName = rest.join(" ");

      await createLead({
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        source: "bakken-contact-form",
        status: "new",
      });

      await addToMailchimp("bakken", {
        email: input.email,
        firstName,
        lastName,
        phone: input.phone,
        tags: ["bakken-inquiry"],
      });

      await sendLeadEmail({
        subject: `New Bakken Hospitality Inquiry — ${input.name}`,
        replyTo: input.email,
        fields: {
          Name: input.name,
          Email: input.email,
          Phone: input.phone,
          Message: input.message,
        },
      });

      return { success: true };
    }),

  // ─── Protected: Admin Lead Management ────────────────────────────────────────

  // Get all leads (admin only)
  getLeads: protectedProcedure
    .query(async ({ ctx }) => {
      if (!isAdminUser(ctx.user)) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }
      return getAllLeads();
    }),

  // Update lead status (admin only)
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["new", "contacted", "quoted", "booked", "closed", "lost"]),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (!isAdminUser(ctx.user)) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }
      await updateLeadStatus(input.id, input.status, input.notes);
      return { success: true };
    }),

  // Delete lead (admin only)
  deleteLead: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (!isAdminUser(ctx.user)) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }
      await deleteLead(input.id);
      return { success: true };
    }),
});

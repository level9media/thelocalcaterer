import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { jobApplications } from "../drizzle/schema";
import { sendJobApplicationEmail } from "./email";

export const careersRouter = router({
  submitApplication: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(320),
        phone: z.string().max(30).optional(),
        position: z.string().min(1).max(255),
        experience: z.string().max(100).optional(),
        availability: z.string().max(100).optional(),
        message: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      // Store in DB
      await db.insert(jobApplications).values({
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        position: input.position,
        experience: input.experience ?? null,
        availability: input.availability ?? null,
        message: input.message ?? null,
      });

      // Send email notification to Josh + Kasandra
      await sendJobApplicationEmail({
        applicantName: input.name,
        applicantEmail: input.email,
        applicantPhone: input.phone,
        position: input.position,
        experience: input.experience,
        availability: input.availability,
        message: input.message,
      });

      return { success: true };
    }),
});

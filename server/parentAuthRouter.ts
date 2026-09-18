/**
 * Parent Portal Auth + Student Management Router
 * Separate from Manus OAuth — parents use email + password.
 * JWT stored in an httpOnly cookie: "parent_token"
 */
import { z } from "zod";
import { router, publicProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { parentAccounts, students } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-school-lunch-secret"
);
const COOKIE_NAME = "parent_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function signToken(payload: { parentId: number; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { parentId: number; email: string };
  } catch {
    return null;
  }
}

function getParentFromCookie(req: any) {
  const raw = req?.headers?.cookie || "";
  const match = raw.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
}

function setCookie(res: any, token: string) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
  );
}

function clearCookie(res: any) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
  );
}

// Middleware to get authenticated parent from cookie
async function getAuthenticatedParent(ctx: any) {
  const token = getParentFromCookie(ctx.req);
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;
  const db = await getDb();
  if (!db) return null;
  const [parent] = await db
    .select()
    .from(parentAccounts)
    .where(eq(parentAccounts.id, payload.parentId))
    .limit(1);
  return parent || null;
}

export const parentAuthRouter = router({
  // Register a new parent account
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        phone: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Check if email already exists
      const [existing] = await db
        .select({ id: parentAccounts.id })
        .from(parentAccounts)
        .where(eq(parentAccounts.email, input.email.toLowerCase()))
        .limit(1);

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An account with this email already exists. Please log in.",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 12);

      const [result] = await db.insert(parentAccounts).values({
        email: input.email.toLowerCase(),
        passwordHash,
        name: input.name,
        phone: input.phone || null,
      });

      const parentId = (result as any).insertId as number;
      const token = await signToken({ parentId, email: input.email.toLowerCase() });
      setCookie((ctx as any).res, token);

      return { success: true, name: input.name };
    }),

  // Login
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [parent] = await db
        .select()
        .from(parentAccounts)
        .where(eq(parentAccounts.email, input.email.toLowerCase()))
        .limit(1);

      if (!parent) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      const valid = await bcrypt.compare(input.password, parent.passwordHash);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      const token = await signToken({ parentId: parent.id, email: parent.email });
      setCookie((ctx as any).res, token);

      return { success: true, name: parent.name };
    }),

  // Get current parent (me)
  me: publicProcedure.query(async ({ ctx }) => {
    const parent = await getAuthenticatedParent(ctx);
    if (!parent) return null;
    return {
      id: parent.id,
      name: parent.name,
      email: parent.email,
      phone: parent.phone,
    };
  }),

  // Logout
  logout: publicProcedure.mutation(async ({ ctx }) => {
    clearCookie((ctx as any).res);
    return { success: true };
  }),

  // Add a student
  addStudent: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Student name is required"),
        allergies: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const parent = await getAuthenticatedParent(ctx);
      if (!parent) throw new TRPCError({ code: "UNAUTHORIZED", message: "Please log in." });

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [result] = await db.insert(students).values({
        parentAccountId: parent.id,
        name: input.name,
        allergies: input.allergies || null,
      });

      const studentId = (result as any).insertId as number;
      return { id: studentId, name: input.name, allergies: input.allergies || null };
    }),

  // Remove a student
  removeStudent: publicProcedure
    .input(z.object({ studentId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const parent = await getAuthenticatedParent(ctx);
      if (!parent) throw new TRPCError({ code: "UNAUTHORIZED", message: "Please log in." });

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db
        .delete(students)
        .where(and(eq(students.id, input.studentId), eq(students.parentAccountId, parent.id)));

      return { success: true };
    }),

  // Update a student
  updateStudent: publicProcedure
    .input(
      z.object({
        studentId: z.number(),
        name: z.string().min(1),
        allergies: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const parent = await getAuthenticatedParent(ctx);
      if (!parent) throw new TRPCError({ code: "UNAUTHORIZED", message: "Please log in." });

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db
        .update(students)
        .set({ name: input.name, allergies: input.allergies || null })
        .where(and(eq(students.id, input.studentId), eq(students.parentAccountId, parent.id)));

      return { success: true };
    }),

  // Get all students for the current parent
  getStudents: publicProcedure.query(async ({ ctx }) => {
    const parent = await getAuthenticatedParent(ctx);
    if (!parent) return [];

    const db = await getDb();
    if (!db) return [];

    return db
      .select()
      .from(students)
      .where(eq(students.parentAccountId, parent.id));
  }),
});

// Export helper for use in portal order router
export { getAuthenticatedParent };

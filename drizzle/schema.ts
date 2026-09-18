import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Catering leads table — stores every contact form submission.
 * Accessible via the /admin/leads dashboard (owner only).
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  /** Contact info */
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  /** Event details */
  eventType: varchar("eventType", { length: 100 }),
  eventDate: varchar("eventDate", { length: 50 }),
  guestCount: varchar("guestCount", { length: 50 }),
  message: text("message"),
  /** Source tracking */
  source: varchar("source", { length: 100 }).default("contact-form"),
  /** Lead management */
  status: mysqlEnum("status", ["new", "contacted", "quoted", "booked", "closed", "lost"])
    .default("new")
    .notNull(),
  notes: text("notes"),
  /** Timestamps */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Parent accounts for the school lunch portal.
 * Separate from Manus OAuth — parents register with email + password.
 */
export const parentAccounts = mysqlTable("parentAccounts", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ParentAccount = typeof parentAccounts.$inferSelect;
export type InsertParentAccount = typeof parentAccounts.$inferInsert;

/**
 * Students linked to a parent account.
 * A parent can have multiple students.
 */
export const students = mysqlTable("students", {
  id: int("id").autoincrement().primaryKey(),
  parentAccountId: int("parentAccountId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  allergies: text("allergies"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Student = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;

/**
 * Student lunch orders table — one row per checkout session.
 * Links to parentAccounts. Items are stored in lunchOrderItems.
 * Legacy single-student orders (no parentAccountId) are preserved.
 */
export const lunchOrders = mysqlTable("lunchOrders", {
  id: int("id").autoincrement().primaryKey(),
  /** Parent info — kept for legacy orders and as denormalized fallback */
  parentName: varchar("parentName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  /** Portal link — null for legacy guest orders */
  parentAccountId: int("parentAccountId"),
  /** Legacy single-student fields — kept for backward compat */
  studentName: varchar("studentName", { length: 255 }).notNull(),
  allergies: text("allergies"),
  /** Legacy: selected meals as JSON array of meal IDs (guest orders) */
  selectedMeals: json("selectedMeals").notNull(),
  /** Meal count and total */
  mealCount: int("mealCount").notNull(),
  totalCents: int("totalCents").notNull(),
  /** Stripe payment tracking */
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }),
  /** Order status */
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "paid", "failed", "refunded"])
    .default("pending")
    .notNull(),
  /** Timestamps */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LunchOrder = typeof lunchOrders.$inferSelect;
export type InsertLunchOrder = typeof lunchOrders.$inferInsert;

/**
 * Per-student per-meal line items for portal orders.
 * Each row = one student ordered one meal.
 */
export const lunchOrderItems = mysqlTable("lunchOrderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  studentId: int("studentId").notNull(),
  studentName: varchar("studentName", { length: 255 }).notNull(),
  mealId: varchar("mealId", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LunchOrderItem = typeof lunchOrderItems.$inferSelect;
export type InsertLunchOrderItem = typeof lunchOrderItems.$inferInsert;

/**
 * Job applications table — stores every careers form submission.
 */
export const jobApplications = mysqlTable("jobApplications", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  position: varchar("position", { length: 255 }).notNull(),
  experience: varchar("experience", { length: 100 }),
  availability: varchar("availability", { length: 100 }),
  message: text("message"),
  status: mysqlEnum("status", ["new", "reviewed", "interviewed", "hired", "rejected"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = typeof jobApplications.$inferInsert;

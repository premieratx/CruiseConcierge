import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  contactId: varchar("contact_id").notNull(),
  title: text("title"),
  status: varchar("status").notNull().default("NEW"),
  projectDate: timestamp("project_date"),
  pipelinePhase: varchar("pipeline_phase").notNull().default("ph_new"),
  groupSize: integer("group_size"),
  eventType: text("event_type"),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const boats = pgTable("boats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  capacity: integer("capacity").notNull(),
  active: boolean("active").notNull().default(true),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  unitPrice: integer("unit_price").notNull(), // in cents
  taxable: boolean("taxable").notNull().default(true),
});

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  projectId: varchar("project_id").notNull(),
  status: varchar("status").notNull().default("DRAFT"),
  items: jsonb("items").$type<QuoteItem[]>().default([]),
  promoCode: text("promo_code"),
  discountTotal: integer("discount_total").notNull().default(0),
  subtotal: integer("subtotal").notNull().default(0),
  tax: integer("tax").notNull().default(0),
  total: integer("total").notNull().default(0),
  version: integer("version").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  projectId: varchar("project_id").notNull(),
  quoteId: varchar("quote_id"),
  status: varchar("status").notNull().default("OPEN"),
  subtotal: integer("subtotal").notNull(),
  tax: integer("tax").notNull(),
  total: integer("total").notNull(),
  balance: integer("balance").notNull(),
  schedule: jsonb("schedule").$type<PaymentSchedule[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceId: varchar("invoice_id").notNull(),
  amount: integer("amount").notNull(),
  status: varchar("status").notNull(),
  paidAt: timestamp("paid_at"),
  method: varchar("method").notNull().default("card"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  contactId: varchar("contact_id"),
  role: varchar("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const availabilitySlots = pgTable("availability_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  boatId: varchar("boat_id").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: varchar("status").notNull().default("AVAILABLE"),
  projectId: varchar("project_id"), // if booked
});

// Type definitions
export type QuoteItem = {
  type: string;
  name: string;
  productId?: string;
  unitPrice: number;
  qty: number;
  clientCanEditQty?: boolean;
  groupId?: string;
  required?: boolean;
  order?: number;
};

export type PaymentSchedule = {
  line: number;
  due: string;
  percent: number;
  daysBefore?: number;
};

// Insert schemas
export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

// Select types
export type Contact = typeof contacts.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Boat = typeof boats.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type AvailabilitySlot = typeof availabilitySlots.$inferSelect;

// Insert types
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

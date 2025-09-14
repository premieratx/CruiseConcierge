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
  duration: integer("duration"), // in hours
  specialRequests: text("special_requests"),
  preferredTime: text("preferred_time"),
  budget: integer("budget"), // in cents
  leadSource: varchar("lead_source").default("chat"),
  availabilitySlotId: varchar("availability_slot_id"), // reference to booked slot
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
  description: text("description"),
  unitPrice: integer("unit_price").notNull(), // in cents
  taxable: boolean("taxable").notNull().default(true),
});

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  projectId: varchar("project_id").notNull(),
  templateId: varchar("template_id"), // reference to quote template
  status: varchar("status").notNull().default("DRAFT"),
  items: jsonb("items").$type<QuoteItem[]>().default([]),
  promoCode: text("promo_code"),
  discountTotal: integer("discount_total").notNull().default(0),
  subtotal: integer("subtotal").notNull().default(0),
  tax: integer("tax").notNull().default(0),
  gratuity: integer("gratuity").notNull().default(0),
  total: integer("total").notNull().default(0),
  perPersonCost: integer("per_person_cost").notNull().default(0),
  depositRequired: boolean("deposit_required").notNull().default(true),
  depositPercent: integer("deposit_percent").notNull().default(25),
  depositAmount: integer("deposit_amount").notNull().default(0),
  paymentSchedule: jsonb("payment_schedule").$type<PaymentSchedule[]>().default([]),
  expiresAt: timestamp("expires_at"),
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

// Quote Templates - for reusable quote configurations
export const quoteTemplates = pgTable("quote_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  description: text("description"),
  eventType: text("event_type").notNull(),
  defaultItems: jsonb("default_items").$type<QuoteItem[]>().default([]),
  minGroupSize: integer("min_group_size"),
  maxGroupSize: integer("max_group_size"),
  basePricePerPerson: integer("base_price_per_person"), // in cents
  duration: integer("duration").notNull(), // in hours
  active: boolean("active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  visualTheme: jsonb("visual_theme").$type<TemplateVisual>().default({}),
  automationRules: jsonb("automation_rules").$type<string[]>().default([]), // rule IDs
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Template Rules - for dynamic behavior based on conditions
export const templateRules = pgTable("template_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  description: text("description"),
  ruleType: varchar("rule_type").notNull(), // 'pricing', 'availability', 'items', 'messaging'
  conditions: jsonb("conditions").$type<RuleCondition[]>().default([]),
  actions: jsonb("actions").$type<RuleAction[]>().default([]),
  priority: integer("priority").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Discount Rules - for automated discount applications
export const discountRules = pgTable("discount_rules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  code: text("code"), // promo code, if applicable
  discountType: varchar("discount_type").notNull(), // 'percentage', 'fixed_amount', 'per_person'
  discountValue: integer("discount_value").notNull(), // percentage (0-100) or amount in cents
  minGroupSize: integer("min_group_size"),
  maxGroupSize: integer("max_group_size"),
  minSubtotal: integer("min_subtotal"), // minimum order value in cents
  validFrom: timestamp("valid_from"),
  validUntil: timestamp("valid_until"),
  usageLimit: integer("usage_limit"),
  usageCount: integer("usage_count").notNull().default(0),
  active: boolean("active").notNull().default(true),
  conditions: jsonb("conditions").$type<DiscountCondition[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Pricing Settings - for organization-wide pricing configuration
export const pricingSettings = pgTable("pricing_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  taxRate: integer("tax_rate").notNull().default(825), // 8.25% as 825 basis points
  defaultGratuityPercent: integer("default_gratuity_percent").notNull().default(18),
  gratuityIncluded: boolean("gratuity_included").notNull().default(false),
  defaultDepositPercent: integer("default_deposit_percent").notNull().default(25),
  urgencyThresholdDays: integer("urgency_threshold_days").notNull().default(30),
  fullPaymentThresholdDays: integer("full_payment_threshold_days").notNull().default(14),
  currency: varchar("currency").notNull().default("USD"),
  timezone: varchar("timezone").notNull().default("America/Chicago"),
  priceDisplayMode: varchar("price_display_mode").notNull().default("total"), // 'total', 'per_person', 'both'
  dayOfWeekMultipliers: jsonb("day_of_week_multipliers").$type<DayOfWeekMultipliers>().default({}),
  seasonalAdjustments: jsonb("seasonal_adjustments").$type<SeasonalAdjustment[]>().default([]),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Affiliates - for commission tracking and referral programs
export const affiliates = pgTable("affiliates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  companyName: text("company_name"),
  code: varchar("code").notNull(), // unique referral code
  commissionType: varchar("commission_type").notNull().default("percentage"), // 'percentage' or 'flat_fee'
  commissionRate: integer("commission_rate").notNull(), // percentage (0-100) or cents for flat fee
  totalReferrals: integer("total_referrals").notNull().default(0),
  totalRevenue: integer("total_revenue").notNull().default(0), // in cents
  totalCommission: integer("total_commission").notNull().default(0), // in cents
  pendingCommission: integer("pending_commission").notNull().default(0), // in cents
  lastReferralDate: timestamp("last_referral_date"),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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
  description?: string;
  category?: string;
};

export type PaymentSchedule = {
  line: number;
  due: string;
  percent: number;
  daysBefore?: number;
};

export type TemplateVisual = {
  primaryColor?: string;
  accentColor?: string;
  headerImage?: string;
  logoUrl?: string;
  theme?: string;
};

export type RuleCondition = {
  field: string; // 'groupSize', 'eventType', 'projectDate', 'daysBefore', etc.
  operator: string; // 'equals', 'greater_than', 'less_than', 'contains', etc.
  value: any;
  logicalOperator?: 'AND' | 'OR'; // for combining conditions
};

export type RuleAction = {
  actionType: string; // 'add_item', 'modify_price', 'set_message', 'require_deposit', etc.
  target?: string;
  value: any;
  parameters?: Record<string, any>;
};

export type DiscountCondition = {
  field: string;
  operator: string;
  value: any;
};

export type DayOfWeekMultipliers = {
  monday?: number;
  tuesday?: number;
  wednesday?: number;
  thursday?: number;
  friday?: number;
  saturday?: number;
  sunday?: number;
};

export type SeasonalAdjustment = {
  name: string;
  startDate: string; // MM-DD format
  endDate: string; // MM-DD format
  multiplier: number; // 1.0 = no change, 1.5 = 50% increase
  description?: string;
};

export type ChatbotButton = {
  id: string;
  text: string;
  value: string;
  style?: 'primary' | 'secondary' | 'outline';
  metadata?: Record<string, any>;
};

export type ChatbotFlow = {
  stepId: string;
  message: string;
  buttons?: ChatbotButton[];
  nextStep?: string;
  actions?: string[]; // action types to execute
};

// Insert schemas
export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
}).partial({
  orgId: true,
  status: true,
  pipelinePhase: true,
  leadSource: true,
  tags: true,
}).extend({
  projectDate: z.string().datetime().transform(str => new Date(str)).optional(),
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteTemplateSchema = createInsertSchema(quoteTemplates).omit({
  id: true,
  createdAt: true,
});

export const insertTemplateRuleSchema = createInsertSchema(templateRules).omit({
  id: true,
  createdAt: true,
});

export const insertDiscountRuleSchema = createInsertSchema(discountRules).omit({
  id: true,
  createdAt: true,
});

export const insertPricingSettingsSchema = createInsertSchema(pricingSettings).omit({
  id: true,
  updatedAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertBoatSchema = createInsertSchema(boats).omit({
  id: true,
});

export const insertAffiliateSchema = createInsertSchema(affiliates).omit({
  id: true,
  totalLeads: true,
  totalQuotes: true,
  totalRevenue: true,
  totalCommission: true,
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
export type QuoteTemplate = typeof quoteTemplates.$inferSelect;
export type TemplateRule = typeof templateRules.$inferSelect;
export type DiscountRule = typeof discountRules.$inferSelect;
export type PricingSettings = typeof pricingSettings.$inferSelect;
export type Affiliate = typeof affiliates.$inferSelect;

// Insert types
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type InsertQuoteTemplate = z.infer<typeof insertQuoteTemplateSchema>;
export type InsertTemplateRule = z.infer<typeof insertTemplateRuleSchema>;
export type InsertDiscountRule = z.infer<typeof insertDiscountRuleSchema>;
export type InsertPricingSettings = z.infer<typeof insertPricingSettingsSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertBoat = z.infer<typeof insertBoatSchema>;
export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;

// Enhanced pricing response type
export type PricingPreview = {
  subtotal: number;
  discountTotal: number;
  tax: number;
  gratuity: number;
  total: number;
  perPersonCost: number;
  depositRequired: boolean;
  depositPercent: number;
  depositAmount: number;
  urgencyMessage?: string;
  appliedDiscounts: string[];
  paymentSchedule: PaymentSchedule[];
  expiresAt?: Date;
  displaySettings?: {
    showPerPerson: boolean;
    showDeposit: boolean;
    showPaymentSchedule: boolean;
    showUrgency: boolean;
  };
  breakdown?: {
    boatType: string;
    dayName: string;
    baseHourlyRate: number;
    cruiseDuration: number;
    baseCruiseCost: number;
    crewFee: number;
    subtotalBeforeTax: number;
    gratuityAmount: number;
    taxAmount: number;
    grandTotal: number;
    perPerson: number;
    deposit: number;
    balanceDue: number;
  };
};

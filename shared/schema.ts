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
  capacity: integer("capacity").notNull(), // standard capacity
  maxCapacity: integer("max_capacity").notNull(), // maximum capacity with additional crew
  extraCrewThreshold: integer("extra_crew_threshold"), // group size requiring extra crew
  active: boolean("active").notNull().default(true),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  description: text("description"),
  unitPrice: integer("unit_price").notNull(), // in cents
  taxable: boolean("taxable").notNull().default(true),
  pricingModel: varchar("pricing_model").notNull().default("hourly"), // 'hourly', 'per_person', 'flat_rate'
  productType: varchar("product_type").notNull().default("private_cruise"), // 'private_cruise', 'disco_cruise', 'addon'
  dayType: varchar("day_type"), // 'weekday', 'friday', 'saturday', 'sunday' (for private cruises)
  groupSize: integer("group_size"), // 14, 25, 30, 50, 75 (for private cruises)
  imageUrl: text("image_url"), // Background image for photo-centric cards
  categoryType: varchar("category_type").notNull().default("experience"), // 'experience', 'addon'
  eventTypes: jsonb("event_types").$type<string[]>().default([]), // which event types this product applies to
  active: boolean("active").notNull().default(true),
});

export const quotes = pgTable("quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  projectId: varchar("project_id").notNull(),
  templateId: varchar("template_id"), // reference to quote template
  status: varchar("status").notNull().default("DRAFT"),
  items: jsonb("items").$type<QuoteItem[]>().default([]),
  radioSections: jsonb("radio_sections").$type<RadioSection[]>().default([]),
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
  accessToken: varchar("access_token"), // nullable 128-bit secure token for public access
  accessTokenCreatedAt: timestamp("access_token_created_at"), // when token was generated
  accessTokenRevokedAt: timestamp("access_token_revoked_at"), // optional revocation timestamp
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
  defaultRadioSections: jsonb("default_radio_sections").$type<RadioSection[]>().default([]),
  components: jsonb("components").$type<TemplateComponent[]>().default([]), // Added for visual template builder
  minGroupSize: integer("min_group_size"),
  maxGroupSize: integer("max_group_size"),
  basePricePerPerson: integer("base_price_per_person"), // in cents
  duration: integer("duration").notNull(), // in hours
  active: boolean("active").notNull().default(true),
  isDefault: boolean("is_default").notNull().default(false), // Added isDefault field
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

// Bookings - for tracking both private and disco cruise bookings
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  boatId: varchar("boat_id"), // nullable for disco cruises which may use multiple boats
  type: varchar("type").notNull(), // 'private' or 'disco'
  status: varchar("status").notNull().default("booked"), // 'booked', 'hold', 'blocked', 'canceled'
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  partyType: text("party_type"), // e.g., 'wedding', 'birthday', 'corporate', etc.
  groupSize: integer("group_size").notNull(),
  projectId: varchar("project_id"), // reference to project/lead if applicable
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Disco Slots - for managing disco cruise availability
export const discoSlots = pgTable("disco_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  ticketCap: integer("ticket_cap").notNull().default(100),
  ticketsSold: integer("tickets_sold").notNull().default(0),
  status: varchar("status").notNull().default("available"), // 'available', 'soldout', 'canceled'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Timeframes - for recurring booking templates
export const timeframes = pgTable("timeframes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6 (Sunday-Saturday)
  type: varchar("type").notNull(), // 'private' or 'disco'
  startTime: text("start_time").notNull(), // HH:MM format
  endTime: text("end_time").notNull(), // HH:MM format
  boatIds: jsonb("boat_ids").$type<string[]>().default([]), // array of boat IDs, or ['any'] for flexible
  active: boolean("active").notNull().default(true),
  description: text("description"), // e.g., "Friday Evening Cruise"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Email Templates - for customizable email communications
export const emailTemplates = pgTable("email_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  description: text("description"),
  templateType: varchar("template_type").notNull(), // 'quote_delivery', 'payment_confirmation', 'booking_confirmation', 'follow_up', 'reminder'
  subject: text("subject").notNull(),
  components: jsonb("components").$type<TemplateComponent[]>().default([]),
  variables: jsonb("variables").$type<string[]>().default([]), // {{contact.name}}, {{quote.total}}, etc.
  active: boolean("active").notNull().default(true),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Master Templates - base structure for all quote templates
export const masterTemplates = pgTable("master_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  description: text("description"),
  components: jsonb("components").$type<TemplateComponent[]>().default([]),
  styles: jsonb("styles").$type<TemplateStyles>().default({}),
  active: boolean("active").notNull().default(true),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Type definitions
export type QuoteItem = {
  id: string;
  type: string;
  name: string;
  productId?: string;
  unitPrice: number;
  qty: number;
  clientCanEditQty?: boolean;
  groupId?: string;
  required?: boolean;
  isOptional?: boolean;
  order?: number;
  description?: string;
  category?: string;
};

export type RadioOption = {
  id: string;
  name: string;
  description?: string;
  price: number; // in cents
  isDefault?: boolean;
  metadata?: Record<string, any>;
};

export type RadioSection = {
  id: string;
  title: string;
  description?: string;
  required: boolean;
  options: RadioOption[];
  selectedOptionId?: string;
  selectedValue?: string;
  allowCustomInput?: boolean;
  customInputLabel?: string;
  order?: number;
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

// Template Component types for drag-and-drop builders
export type TemplateComponent = {
  id: string;
  type: 'text' | 'line_items' | 'radio_group' | 'checkbox_group' | 'quantity_selector' | 
        'info_box' | 'divider' | 'pricing_breakdown' | 'terms' | 'header' | 'footer' |
        'button' | 'image' | 'table' | 'quote_summary';
  properties: Record<string, any>;
  children?: any[]; // Changed from TemplateComponent[] to avoid circular reference
  order: number;
  conditions?: ComponentCondition[];
};

export type ComponentCondition = {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
};

export type TemplateStyles = {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  fontSize?: string;
  headerStyle?: Record<string, any>;
  bodyStyle?: Record<string, any>;
  footerStyle?: Record<string, any>;
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
}).extend({
  expiresAt: z.string().datetime().transform(str => new Date(str)).optional(),
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
}).extend({
  pricingModel: z.enum(["hourly", "per_person", "flat_rate"]).default("hourly"),
  productType: z.enum(["private_cruise", "disco_cruise", "addon"]).default("private_cruise"),
  dayType: z.enum(["weekday", "friday", "saturday", "sunday"]).optional(),
  groupSize: z.number().optional(),
  imageUrl: z.string().optional(),
  categoryType: z.enum(["experience", "addon"]).default("experience"),
  eventTypes: z.array(z.string()).default([]),
  active: z.boolean().default(true),
});

export const insertBoatSchema = createInsertSchema(boats).omit({
  id: true,
}).extend({
  maxCapacity: z.number().min(1),
  extraCrewThreshold: z.number().optional(),
});

export const insertAffiliateSchema = createInsertSchema(affiliates).omit({
  id: true,
  totalReferrals: true,
  totalRevenue: true,
  totalCommission: true,
  pendingCommission: true,
  lastReferralDate: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
}).extend({
  type: z.enum(["private", "disco"]),
  status: z.enum(["booked", "hold", "blocked", "canceled"]).default("booked"),
  startTime: z.string().datetime().transform(str => new Date(str)),
  endTime: z.string().datetime().transform(str => new Date(str)),
  groupSize: z.number().min(1),
});

export const insertDiscoSlotSchema = createInsertSchema(discoSlots).omit({
  id: true,
  createdAt: true,
}).extend({
  date: z.string().datetime().transform(str => new Date(str)),
  startTime: z.string().datetime().transform(str => new Date(str)),
  endTime: z.string().datetime().transform(str => new Date(str)),
  status: z.enum(["available", "soldout", "canceled"]).default("available"),
  ticketCap: z.number().min(1).default(100),
  ticketsSold: z.number().min(0).default(0),
});

export const insertTimeframeSchema = createInsertSchema(timeframes).omit({
  id: true,
  createdAt: true,
}).extend({
  dayOfWeek: z.number().min(0).max(6), // 0-6 for Sunday-Saturday
  type: z.enum(["private", "disco"]),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:MM format
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:MM format
  boatIds: z.array(z.string()).default([]),
  active: z.boolean().default(true),
});

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMasterTemplateSchema = createInsertSchema(masterTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
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
export type Booking = typeof bookings.$inferSelect;
export type DiscoSlot = typeof discoSlots.$inferSelect;
export type Timeframe = typeof timeframes.$inferSelect;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type MasterTemplate = typeof masterTemplates.$inferSelect;

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
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertDiscoSlot = z.infer<typeof insertDiscoSlotSchema>;
export type InsertTimeframe = z.infer<typeof insertTimeframeSchema>;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type InsertMasterTemplate = z.infer<typeof insertMasterTemplateSchema>;

// Lead tracking types for Google Sheets integration
export type LeadProgressStage = 'started' | 'contact_complete' | 'date_selected' | 'size_selected' | 'options_selected' | 'complete';
export type LeadStatus = 'NEW' | 'CONTACT_INFO' | 'DATE_SELECTED' | 'OPTIONS_SELECTED' | 'QUOTED' | 'BOOKED' | 'LOST';

export interface LeadData {
  leadId: string;
  createdDate: string;
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventTypeLabel?: string;
  cruiseDate?: string;
  groupSize?: number;
  boatType?: string;
  discoPackage?: string;
  timeSlot?: string;
  status: LeadStatus;
  progress: LeadProgressStage;
  lastUpdated: string;
  source: string;
  specialRequests?: string;
  budget?: string;
  projectId?: string;
  notes?: string;
}

export interface LeadUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventTypeLabel?: string;
  cruiseDate?: string;
  groupSize?: number;
  boatType?: string;
  discoPackage?: string;
  timeSlot?: string;
  status?: LeadStatus;
  progress?: LeadProgressStage;
  specialRequests?: string;
  budget?: string;
  projectId?: string;
  notes?: string;
}

export interface CreateLeadRequest {
  leadId: string;
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventTypeLabel?: string;
  source?: string;
}

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

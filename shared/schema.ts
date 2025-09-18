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
  boatId: varchar("boat_id"), // links to specific boat for private/disco cruises
  startTime: text("start_time"), // time slot start (e.g., "10:00") for private/disco cruises
  endTime: text("end_time"), // time slot end (e.g., "14:00") for private/disco cruises
  duration: integer("duration"), // duration in hours for time slot products
  crewFeePerHour: integer("crew_fee_per_hour").default(0), // additional crew fee in cents/hour when capacity threshold reached
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
  // Persistent deposit calculation fields (always 25%)
  depositPercent: integer("deposit_percent").notNull().default(25),
  depositAmount: integer("deposit_amount").notNull().default(0),
  remainingBalance: integer("remaining_balance").notNull().default(0),
  remainingBalanceDueAt: timestamp("remaining_balance_due_at"),
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
  status: varchar("status").notNull().default("AVAILABLE"), // 'AVAILABLE', 'BOOKED', 'BLOCKED', 'MAINTENANCE'
  projectId: varchar("project_id"), // if booked
  bookingId: varchar("booking_id"), // reference to booking if booked
  blockReason: text("block_reason"), // reason for blocking (admin notes)
  blockedBy: varchar("blocked_by"), // admin user who blocked this slot
  blockedAt: timestamp("blocked_at"), // when slot was blocked
  notes: text("notes"), // general notes about this slot
  isRecurring: boolean("is_recurring").default(false), // part of recurring pattern
  recurringId: varchar("recurring_id"), // reference to recurring pattern
  createdAt: timestamp("created_at").defaultNow(),
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
  // Phase 1 extensions
  triggerOn: varchar("trigger_on").notNull().default("event"), // 'event', 'inquiry', 'both'
  inquiryStartDate: timestamp("inquiry_start_date"), // When discount applies to inquiry period
  inquiryEndDate: timestamp("inquiry_end_date"), // When discount stops applying to inquiry period
  autoApply: boolean("auto_apply").notNull().default(false), // Apply automatically without code
  requiresCode: boolean("requires_code").notNull().default(true), // Whether a code is required
  scopeType: varchar("scope_type").notNull().default("global"), // 'global', 'boat', 'product', 'category'
  scopeId: varchar("scope_id"), // nullable when scopeType is 'global'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Pricing Settings - for organization-wide pricing configuration
export const pricingSettings = pgTable("pricing_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  taxRate: integer("tax_rate").notNull().default(825), // 8.25% as 825 basis points
  defaultGratuityPercent: integer("default_gratuity_percent").notNull().default(20),
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
  status: varchar("status").notNull().default("booked"), // 'booked', 'hold', 'blocked', 'canceled', 'confirmed'
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  partyType: text("party_type"), // e.g., 'wedding', 'birthday', 'corporate', etc.
  groupSize: integer("group_size").notNull(),
  projectId: varchar("project_id"), // reference to project/lead if applicable
  productId: varchar("product_id"), // reference to product for pricing and package details
  quoteId: varchar("quote_id"), // reference to generated quote
  paymentStatus: varchar("payment_status").default("pending"), // 'pending', 'deposit_paid', 'fully_paid'
  amountPaid: integer("amount_paid").default(0), // in cents
  totalAmount: integer("total_amount").default(0), // in cents
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  specialRequests: text("special_requests"),
  adminNotes: text("admin_notes"), // private admin-only notes
  blockedReason: text("blocked_reason"), // reason if status is 'blocked'
  lastModifiedBy: varchar("last_modified_by"), // admin user who last modified
  lastModifiedAt: timestamp("last_modified_at").defaultNow(),
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

// Slot Holds - for temporary reservation of availability slots
export const slotHolds = pgTable("slot_holds", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  slotId: varchar("slot_id").notNull(), // normalized slot identifier
  boatId: varchar("boat_id"), // specific boat if assigned
  cruiseType: varchar("cruise_type").notNull(), // 'private' or 'disco'
  dateISO: varchar("date_iso").notNull(), // YYYY-MM-DD format
  startTime: varchar("start_time").notNull(), // HH:MM format
  endTime: varchar("end_time").notNull(), // HH:MM format
  sessionId: varchar("session_id"), // client session for tracking
  groupSize: integer("group_size"), // requested group size
  expiresAt: timestamp("expires_at").notNull(), // TTL for automatic cleanup
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

// Customer Portal - SMS Authentication Tokens
export const smsAuthTokens = pgTable("sms_auth_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phoneNumber: text("phone_number").notNull(), // normalized phone number
  code: varchar("code", { length: 6 }).notNull(), // 6-digit verification code
  token: varchar("token", { length: 128 }), // longer secure token for magic links
  purpose: varchar("purpose").notNull().default("login"), // 'login', 'password_reset', etc.
  attempts: integer("attempts").notNull().default(0), // failed verification attempts
  maxAttempts: integer("max_attempts").notNull().default(3),
  used: boolean("used").notNull().default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  usedAt: timestamp("used_at"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
});

// Customer Portal - Active Sessions
export const customerSessions = pgTable("customer_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().unique(), // Express session ID
  contactId: varchar("contact_id").notNull(), // links to contacts table
  phoneNumber: text("phone_number").notNull(),
  isAuthenticated: boolean("is_authenticated").notNull().default(true),
  loginTime: timestamp("login_time").notNull().defaultNow(),
  lastActivity: timestamp("last_activity").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  deviceInfo: jsonb("device_info").$type<{
    browser?: string;
    os?: string;
    mobile?: boolean;
    screen?: string;
  }>().default({}),
  loggedOut: boolean("logged_out").notNull().default(false),
  loggedOutAt: timestamp("logged_out_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Customer Portal - Activity Logging
export const portalActivityLog = pgTable("portal_activity_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id"), // links to customer_sessions
  contactId: varchar("contact_id"), // links to contacts table
  phoneNumber: text("phone_number"),
  action: varchar("action").notNull(), // 'login', 'view_quote', 'download_invoice', 'update_profile', etc.
  resource: varchar("resource"), // 'quote', 'invoice', 'booking', 'profile', etc.
  resourceId: varchar("resource_id"), // ID of the resource being accessed
  details: jsonb("details").$type<Record<string, any>>().default({}), // additional context
  success: boolean("success").notNull().default(true),
  errorMessage: text("error_message"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  duration: integer("duration"), // request duration in milliseconds
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Customer Portal - Phone Number Rate Limiting
export const phoneRateLimit = pgTable("phone_rate_limit", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phoneNumber: text("phone_number").notNull().unique(),
  requestCount: integer("request_count").notNull().default(1),
  windowStart: timestamp("window_start").notNull().defaultNow(),
  lastRequest: timestamp("last_request").notNull().defaultNow(),
  blocked: boolean("blocked").notNull().default(false),
  blockedUntil: timestamp("blocked_until"),
  resetAt: timestamp("reset_at").notNull(), // when the rate limit window resets
});

// Customer Portal - Verification Attempt Tracking
export const customerVerificationAttempts = pgTable("customer_verification_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phoneNumber: text("phone_number").notNull(),
  sessionId: varchar("session_id").notNull(),
  attemptCount: integer("attempt_count").notNull().default(1),
  lastAttempt: timestamp("last_attempt").notNull().defaultNow(),
  lockedUntil: timestamp("locked_until"),
  lockoutCount: integer("lockout_count").notNull().default(0), // tracks escalating lockouts
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Partial Leads - for capturing abandoned contact information
export const partialLeads = pgTable("partial_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().unique(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  eventType: text("event_type"),
  eventTypeLabel: text("event_type_label"),
  groupSize: integer("group_size"),
  preferredDate: timestamp("preferred_date"),
  chatbotData: jsonb("chatbot_data").$type<Record<string, any>>().default({}),
  quoteId: varchar("quote_id"), // reference to auto-generated quote
  status: varchar("status").notNull().default("partial"), // 'partial', 'abandoned', 'converted', 'contacted'
  source: varchar("source").notNull().default("chat"), // tracking source
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  abandonedAt: timestamp("abandoned_at"),
  convertedToContactId: varchar("converted_to_contact_id"), // reference to contacts table if converted
  followUpCount: integer("follow_up_count").notNull().default(0),
  lastContactedAt: timestamp("last_contacted_at"),
  contactMethod: varchar("contact_method"), // 'email', 'sms', 'phone' for last contact
  adminNotes: text("admin_notes"),
});

// Quote Analytics - for tracking quote views and interactions
export const quoteAnalytics = pgTable("quote_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  quoteId: varchar("quote_id").notNull(),
  contactId: varchar("contact_id"),
  sessionId: varchar("session_id"),
  action: varchar("action").notNull(), // 'view', 'download', 'accept', 'decline', 'share'
  viewDuration: integer("view_duration"), // seconds spent viewing
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  deviceInfo: jsonb("device_info").$type<{
    browser?: string;
    os?: string;
    mobile?: boolean;
    screen?: string;
  }>().default({}),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// File Tracking - for documents sent to customers
export const fileSends = pgTable("file_sends", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contactId: varchar("contact_id").notNull(),
  projectId: varchar("project_id"),
  quoteId: varchar("quote_id"),
  fileType: varchar("file_type").notNull(), // 'quote', 'invoice', 'contract', 'confirmation', 'other'
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url"),
  fileSize: integer("file_size"), // in bytes
  deliveryMethod: varchar("delivery_method").notNull(), // 'email', 'sms', 'portal', 'download'
  emailId: varchar("email_id"), // reference to email tracking
  sentBy: varchar("sent_by"), // admin user who sent
  delivered: boolean("delivered").notNull().default(false),
  deliveredAt: timestamp("delivered_at"),
  accessed: boolean("accessed").notNull().default(false),
  accessedAt: timestamp("accessed_at"),
  downloadCount: integer("download_count").notNull().default(0),
  lastAccessedAt: timestamp("last_accessed_at"),
  expiresAt: timestamp("expires_at"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Email Tracking - for tracking email opens and clicks
export const emailTracking = pgTable("email_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contactId: varchar("contact_id").notNull(),
  projectId: varchar("project_id"),
  quoteId: varchar("quote_id"),
  emailType: varchar("email_type").notNull(), // 'quote_delivery', 'payment_confirmation', 'booking_confirmation', 'reminder', 'follow_up'
  emailSubject: text("email_subject").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  senderEmail: text("sender_email").notNull(),
  emailProvider: varchar("email_provider").notNull().default("sendgrid"), // 'sendgrid', 'mailgun'
  providerMessageId: text("provider_message_id"), // provider's unique message ID
  sentAt: timestamp("sent_at").notNull().defaultNow(),
  delivered: boolean("delivered").notNull().default(false),
  deliveredAt: timestamp("delivered_at"),
  opened: boolean("opened").notNull().default(false),
  firstOpenedAt: timestamp("first_opened_at"),
  openCount: integer("open_count").notNull().default(0),
  lastOpenedAt: timestamp("last_opened_at"),
  clicked: boolean("clicked").notNull().default(false),
  firstClickedAt: timestamp("first_clicked_at"),
  clickCount: integer("click_count").notNull().default(0),
  lastClickedAt: timestamp("last_clicked_at"),
  bounced: boolean("bounced").notNull().default(false),
  bouncedAt: timestamp("bounced_at"),
  bounceReason: text("bounce_reason"),
  unsubscribed: boolean("unsubscribed").notNull().default(false),
  unsubscribedAt: timestamp("unsubscribed_at"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
});

// Customer Lifecycle Status - for tracking customer journey progress
export const customerLifecycle = pgTable("customer_lifecycle", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contactId: varchar("contact_id").notNull().unique(),
  projectId: varchar("project_id"),
  currentStage: varchar("current_stage").notNull().default("initial_contact"), // 'initial_contact', 'quote_sent', 'quote_viewed', 'quote_accepted', 'deposit_paid', 'fully_paid', 'confirmed', 'completed', 'cancelled'
  previousStage: varchar("previous_stage"),
  stageEnteredAt: timestamp("stage_entered_at").notNull().defaultNow(),
  stageHistory: jsonb("stage_history").$type<{
    stage: string;
    enteredAt: string;
    duration?: number; // minutes in this stage
    notes?: string;
  }[]>().default([]),
  nextActionRequired: varchar("next_action_required"), // 'send_quote', 'follow_up', 'collect_deposit', 'confirm_booking', 'send_reminder'
  nextActionDue: timestamp("next_action_due"),
  totalValue: integer("total_value").notNull().default(0), // estimated/actual total value in cents
  probabilityScore: integer("probability_score").notNull().default(50), // 0-100 likelihood of conversion
  lastTouchpoint: timestamp("last_touchpoint"),
  lastTouchpointType: varchar("last_touchpoint_type"), // 'email', 'call', 'text', 'chat', 'quote_view'
  daysSinceLastContact: integer("days_since_last_contact").notNull().default(0),
  totalTouchpoints: integer("total_touchpoints").notNull().default(0),
  conversionDate: timestamp("conversion_date"), // when they became a paying customer
  completionDate: timestamp("completion_date"), // when service was delivered
  adminNotes: text("admin_notes"),
  systemNotes: text("system_notes"), // automated system notes
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Enhanced Activity Tracking - for comprehensive customer interaction tracking
export const customerActivity = pgTable("customer_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contactId: varchar("contact_id").notNull(),
  projectId: varchar("project_id"),
  activityType: varchar("activity_type").notNull(), // 'chat', 'email_open', 'quote_view', 'file_download', 'payment', 'booking', 'call', 'meeting'
  activitySubtype: varchar("activity_subtype"), // 'message_sent', 'quote_opened', 'pdf_downloaded', 'deposit_paid', etc.
  description: text("description").notNull(),
  value: integer("value"), // monetary value if applicable (in cents)
  duration: integer("duration"), // duration in seconds if applicable
  source: varchar("source").notNull().default("system"), // 'system', 'admin', 'customer', 'automation'
  sourceId: varchar("source_id"), // ID of source record (chat message, email, etc.)
  initiatedBy: varchar("initiated_by"), // 'customer', 'admin', 'system'
  adminUserId: varchar("admin_user_id"), // if action taken by admin
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  deviceInfo: jsonb("device_info").$type<{
    browser?: string;
    os?: string;
    mobile?: boolean;
  }>().default({}),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  importance: varchar("importance").notNull().default("normal"), // 'low', 'normal', 'high', 'critical'
  isAutomated: boolean("is_automated").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ===== BLOG SYSTEM SCHEMA =====

// Blog Authors - can link to existing contacts or be standalone
export const blogAuthors = pgTable("blog_authors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  contactId: varchar("contact_id"), // optional link to existing contact
  name: text("name").notNull(),
  email: text("email"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  website: text("website"),
  socialLinks: jsonb("social_links").$type<{
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  }>().default({}),
  slug: text("slug").notNull().unique(), // URL-friendly author identifier
  active: boolean("active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Blog Categories - hierarchical support for organizing posts
export const blogCategories = pgTable("blog_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  parentId: varchar("parent_id"), // for hierarchical categories
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(), // URL-friendly category identifier
  description: text("description"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  featuredImage: text("featured_image"),
  color: varchar("color"), // hex color for category theming
  icon: text("icon"), // icon identifier (lucide icon name)
  active: boolean("active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  postCount: integer("post_count").notNull().default(0), // denormalized count
  wpCategoryId: integer("wp_category_id"), // WordPress import tracking
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Blog Tags - flexible content organization
export const blogTags = pgTable("blog_tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(), // URL-friendly tag identifier
  description: text("description"),
  color: varchar("color"), // hex color for tag theming
  active: boolean("active").notNull().default(true),
  postCount: integer("post_count").notNull().default(0), // denormalized count
  wpTagId: integer("wp_tag_id"), // WordPress import tracking
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Blog Posts - main content table with WordPress import support
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  authorId: varchar("author_id").notNull(), // references blog_authors
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(), // URL-friendly post identifier
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  contentType: varchar("content_type").notNull().default("html"), // 'html', 'markdown', 'rich_text'
  status: varchar("status").notNull().default("draft"), // 'draft', 'published', 'scheduled', 'archived'
  publishedAt: timestamp("published_at"),
  scheduledFor: timestamp("scheduled_for"), // for scheduled posts
  
  // SEO fields
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyphrase: text("focus_keyphrase"),
  featuredImage: text("featured_image"),
  featuredImageAlt: text("featured_image_alt"),
  socialImage: text("social_image"), // specific image for social sharing
  
  // WordPress import fields
  wpPostId: integer("wp_post_id"), // original WordPress post ID
  wpGuid: text("wp_guid"), // WordPress GUID for tracking
  wpStatus: varchar("wp_status"), // original WordPress status
  wpImportDate: timestamp("wp_import_date"), // when imported from WordPress
  wpModified: timestamp("wp_modified"), // last modified in WordPress
  wpAuthorId: integer("wp_author_id"), // original WordPress author ID
  
  // Content organization
  readingTime: integer("reading_time"), // estimated reading time in minutes
  wordCount: integer("word_count"), // content word count
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  shareCount: integer("share_count").notNull().default(0),
  commentCount: integer("comment_count").notNull().default(0),
  
  // Display options
  featured: boolean("featured").notNull().default(false), // highlight on homepage
  allowComments: boolean("allow_comments").notNull().default(true),
  sticky: boolean("sticky").notNull().default(false), // pin to top
  template: varchar("template"), // custom post template
  displayOrder: integer("display_order").notNull().default(0),
  
  // Media and formatting
  galleryImages: jsonb("gallery_images").$type<string[]>().default([]), // image URLs for galleries
  videoUrl: text("video_url"), // embedded video URL
  audioUrl: text("audio_url"), // embedded audio URL
  customFields: jsonb("custom_fields").$type<Record<string, any>>().default({}), // extensible metadata
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Junction table for post-category relationships (many-to-many)
export const blogPostCategories = pgTable("blog_post_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(), // references blog_posts
  categoryId: varchar("category_id").notNull(), // references blog_categories
  isPrimary: boolean("is_primary").notNull().default(false), // one primary category per post
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Junction table for post-tag relationships (many-to-many)
export const blogPostTags = pgTable("blog_post_tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(), // references blog_posts
  tagId: varchar("tag_id").notNull(), // references blog_tags
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Blog Comments - for post engagement
export const blogComments = pgTable("blog_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(), // references blog_posts
  parentId: varchar("parent_id"), // for nested comments
  contactId: varchar("contact_id"), // optional link to contact
  authorName: text("author_name").notNull(),
  authorEmail: text("author_email").notNull(),
  authorWebsite: text("author_website"),
  authorIp: varchar("author_ip"),
  content: text("content").notNull(),
  status: varchar("status").notNull().default("pending"), // 'pending', 'approved', 'spam', 'rejected'
  isAuthorVerified: boolean("is_author_verified").notNull().default(false),
  likeCount: integer("like_count").notNull().default(0),
  replyCount: integer("reply_count").notNull().default(0),
  wpCommentId: integer("wp_comment_id"), // WordPress import tracking
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Blog Analytics - track post performance
export const blogAnalytics = pgTable("blog_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(), // references blog_posts
  date: timestamp("date").notNull(), // analytics date
  views: integer("views").notNull().default(0),
  uniqueViews: integer("unique_views").notNull().default(0),
  bounceRate: integer("bounce_rate").notNull().default(0), // as percentage
  avgTimeOnPage: integer("avg_time_on_page").notNull().default(0), // in seconds
  shares: integer("shares").notNull().default(0),
  comments: integer("comments").notNull().default(0),
  referrerData: jsonb("referrer_data").$type<Record<string, number>>().default({}),
  deviceData: jsonb("device_data").$type<{
    desktop: number;
    mobile: number;
    tablet: number;
  }>().default({}),
  countryData: jsonb("country_data").$type<Record<string, number>>().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ===== END BLOG SYSTEM SCHEMA =====

// Type definitions for partial leads
export type PartialLead = typeof partialLeads.$inferSelect;
export type InsertPartialLead = typeof partialLeads.$inferInsert;

export type PartialLeadStatus = 'partial' | 'abandoned' | 'converted' | 'contacted' | 'dismissed';

export type PartialLeadFilters = {
  status?: PartialLeadStatus;
  dateFrom?: Date;
  dateTo?: Date;
  hasEmail?: boolean;
  hasPhone?: boolean;
  eventType?: string;
};

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
}).extend({
  name: z.string().min(1, "Discount name is required"),
  discountType: z.enum(["percentage", "fixed_amount", "per_person"]),
  discountValue: z.number().min(0, "Discount value must be positive"),
  triggerOn: z.enum(["event", "inquiry", "both"]).default("event"),
  inquiryStartDate: z.string().datetime().transform(str => new Date(str)).optional(),
  inquiryEndDate: z.string().datetime().transform(str => new Date(str)).optional(),
  autoApply: z.boolean().default(false),
  requiresCode: z.boolean().default(true),
  scopeType: z.enum(["global", "boat", "product", "category"]).default("global"),
  validFrom: z.string().datetime().transform(str => new Date(str)).optional(),
  validUntil: z.string().datetime().transform(str => new Date(str)).optional(),
  minGroupSize: z.number().min(1).optional(),
  maxGroupSize: z.number().min(1).optional(),
  minSubtotal: z.number().min(0).optional(),
  usageLimit: z.number().min(1).optional(),
  active: z.boolean().default(true),
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
  lastModifiedAt: true,
}).extend({
  type: z.enum(["private", "disco"]),
  status: z.enum(["booked", "hold", "blocked", "canceled", "confirmed"]).default("booked"),
  paymentStatus: z.enum(["pending", "deposit_paid", "fully_paid"]).default("pending"),
  startTime: z.string().datetime().transform(str => new Date(str)),
  endTime: z.string().datetime().transform(str => new Date(str)),
  groupSize: z.number().min(1),
  amountPaid: z.number().min(0).default(0),
  totalAmount: z.number().min(0).default(0),
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

// Customer Portal Insert Schemas
export const insertSmsAuthTokenSchema = createInsertSchema(smsAuthTokens).omit({
  id: true,
  createdAt: true,
  usedAt: true,
}).extend({
  phoneNumber: z.string().min(1, "Phone number is required"),
  code: z.string().length(6, "Code must be 6 digits"),
  token: z.string().min(32, "Token must be at least 32 characters").optional(),
  purpose: z.enum(["login", "password_reset", "verification"]).default("login"),
  expiresAt: z.string().datetime().transform(str => new Date(str)),
  attempts: z.number().min(0).default(0),
  maxAttempts: z.number().min(1).default(3),
  used: z.boolean().default(false),
});

export const insertCustomerSessionSchema = createInsertSchema(customerSessions).omit({
  id: true,
  createdAt: true,
  loggedOutAt: true,
}).extend({
  sessionId: z.string().min(1, "Session ID is required"),
  contactId: z.string().min(1, "Contact ID is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  isAuthenticated: z.boolean().default(true),
  loginTime: z.string().datetime().transform(str => new Date(str)).optional(),
  lastActivity: z.string().datetime().transform(str => new Date(str)).optional(),
  expiresAt: z.string().datetime().transform(str => new Date(str)),
  loggedOut: z.boolean().default(false),
});

export const insertPortalActivityLogSchema = createInsertSchema(portalActivityLog).omit({
  id: true,
  createdAt: true,
}).extend({
  action: z.string().min(1, "Action is required"),
  success: z.boolean().default(true),
  duration: z.number().min(0).optional(),
});

export const insertPhoneRateLimitSchema = createInsertSchema(phoneRateLimit).omit({
  id: true,
}).extend({
  phoneNumber: z.string().min(1, "Phone number is required"),
  requestCount: z.number().min(1).default(1),
  windowStart: z.string().datetime().transform(str => new Date(str)).optional(),
  lastRequest: z.string().datetime().transform(str => new Date(str)).optional(),
  resetAt: z.string().datetime().transform(str => new Date(str)),
  blocked: z.boolean().default(false),
  blockedUntil: z.string().datetime().transform(str => new Date(str)).optional(),
});

export const insertCustomerVerificationAttemptsSchema = createInsertSchema(customerVerificationAttempts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  phoneNumber: z.string().min(1, "Phone number is required"),
  sessionId: z.string().min(1, "Session ID is required"),
  attemptCount: z.number().min(1).default(1),
  lastAttempt: z.string().datetime().transform(str => new Date(str)).optional(),
  lockedUntil: z.string().datetime().transform(str => new Date(str)).optional(),
  lockoutCount: z.number().min(0).default(0),
});

export const insertPartialLeadSchema = createInsertSchema(partialLeads).omit({
  id: true,
  createdAt: true,
  lastUpdated: true,
}).extend({
  sessionId: z.string().min(1, "Session ID is required"),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  eventType: z.string().optional(),
  eventTypeLabel: z.string().optional(),
  groupSize: z.number().min(1).optional(),
  preferredDate: z.string().datetime().transform(str => new Date(str)).optional(),
  chatbotData: z.record(z.any()).default({}),
  status: z.enum(['partial', 'abandoned', 'converted', 'contacted', 'dismissed']).default('partial'),
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

// Blog System Types
export type BlogAuthor = typeof blogAuthors.$inferSelect;
export type BlogCategory = typeof blogCategories.$inferSelect;
export type BlogTag = typeof blogTags.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type BlogPostCategory = typeof blogPostCategories.$inferSelect;
export type BlogPostTag = typeof blogPostTags.$inferSelect;
export type BlogComment = typeof blogComments.$inferSelect;
export type BlogAnalytics = typeof blogAnalytics.$inferSelect;

// Customer Portal Types
export type SmsAuthToken = typeof smsAuthTokens.$inferSelect;
export type CustomerSession = typeof customerSessions.$inferSelect;
export type PortalActivityLog = typeof portalActivityLog.$inferSelect;
export type PhoneRateLimit = typeof phoneRateLimit.$inferSelect;
export type CustomerVerificationAttempts = typeof customerVerificationAttempts.$inferSelect;

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

// Blog System Insert Schemas
export const insertBlogAuthorSchema = createInsertSchema(blogAuthors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Author name is required"),
  slug: z.string().min(1, "Author slug is required"),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  socialLinks: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
  }).default({}),
  active: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export const insertBlogCategorySchema = createInsertSchema(blogCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Category slug is required"),
  description: z.string().optional(),
  parentId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  active: z.boolean().default(true),
  displayOrder: z.number().default(0),
  postCount: z.number().default(0),
});

export const insertBlogTagSchema = createInsertSchema(blogTags).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Tag name is required"),
  slug: z.string().min(1, "Tag slug is required"),
  description: z.string().optional(),
  active: z.boolean().default(true),
  postCount: z.number().default(0),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  authorId: z.string().min(1, "Author ID is required"),
  title: z.string().min(1, "Post title is required"),
  slug: z.string().min(1, "Post slug is required"),
  content: z.string().min(1, "Post content is required"),
  contentType: z.enum(['html', 'markdown', 'rich_text']).default('html'),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).default('draft'),
  excerpt: z.string().optional(),
  publishedAt: z.string().datetime().transform(str => new Date(str)).optional(),
  scheduledFor: z.string().datetime().transform(str => new Date(str)).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  focusKeyphrase: z.string().optional(),
  featuredImage: z.string().optional(),
  featuredImageAlt: z.string().optional(),
  socialImage: z.string().optional(),
  readingTime: z.number().optional(),
  wordCount: z.number().optional(),
  viewCount: z.number().default(0),
  featured: z.boolean().default(false),
  allowComments: z.boolean().default(true),
  sticky: z.boolean().default(false),
  galleryImages: z.array(z.string()).default([]),
  videoUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  customFields: z.record(z.any()).default({}),
});

export const insertBlogPostCategorySchema = createInsertSchema(blogPostCategories).omit({
  id: true,
  createdAt: true,
}).extend({
  postId: z.string().min(1, "Post ID is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  isPrimary: z.boolean().default(false),
});

export const insertBlogPostTagSchema = createInsertSchema(blogPostTags).omit({
  id: true,
  createdAt: true,
}).extend({
  postId: z.string().min(1, "Post ID is required"),
  tagId: z.string().min(1, "Tag ID is required"),
});

export const insertBlogCommentSchema = createInsertSchema(blogComments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  postId: z.string().min(1, "Post ID is required"),
  authorName: z.string().min(1, "Author name is required"),
  authorEmail: z.string().email("Valid email is required"),
  content: z.string().min(1, "Comment content is required"),
  status: z.enum(['pending', 'approved', 'spam', 'rejected']).default('pending'),
  parentId: z.string().optional(),
  contactId: z.string().optional(),
  authorWebsite: z.string().optional(),
  isAuthorVerified: z.boolean().default(false),
});

export const insertBlogAnalyticsSchema = createInsertSchema(blogAnalytics).omit({
  id: true,
  createdAt: true,
}).extend({
  postId: z.string().min(1, "Post ID is required"),
  date: z.string().datetime().transform(str => new Date(str)),
  views: z.number().default(0),
  uniqueViews: z.number().default(0),
  bounceRate: z.number().default(0),
  avgTimeOnPage: z.number().default(0),
  shares: z.number().default(0),
  comments: z.number().default(0),
  referrerData: z.record(z.number()).default({}),
  deviceData: z.object({
    desktop: z.number(),
    mobile: z.number(),
    tablet: z.number(),
  }).default({ desktop: 0, mobile: 0, tablet: 0 }),
  countryData: z.record(z.number()).default({}),
});

// Blog System Insert Types
export type InsertBlogAuthor = z.infer<typeof insertBlogAuthorSchema>;
export type InsertBlogCategory = z.infer<typeof insertBlogCategorySchema>;
export type InsertBlogTag = z.infer<typeof insertBlogTagSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertBlogPostCategory = z.infer<typeof insertBlogPostCategorySchema>;
export type InsertBlogPostTag = z.infer<typeof insertBlogPostTagSchema>;
export type InsertBlogComment = z.infer<typeof insertBlogCommentSchema>;
export type InsertBlogAnalytics = z.infer<typeof insertBlogAnalyticsSchema>;

// Customer Portal Insert Types
export type InsertSmsAuthToken = z.infer<typeof insertSmsAuthTokenSchema>;
export type InsertCustomerSession = z.infer<typeof insertCustomerSessionSchema>;
export type InsertPortalActivityLog = z.infer<typeof insertPortalActivityLogSchema>;
export type InsertPhoneRateLimit = z.infer<typeof insertPhoneRateLimitSchema>;
export type InsertCustomerVerificationAttempts = z.infer<typeof insertCustomerVerificationAttemptsSchema>;

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

// Admin calendar-specific types for enhanced management
export type AdminCalendarSlot = {
  id: string;
  boatId: string;
  boatName: string;
  startTime: Date;
  endTime: Date;
  status: 'available' | 'booked' | 'blocked' | 'maintenance';
  booking?: AdminBookingInfo;
  blockReason?: string;
  blockedBy?: string;
  blockedAt?: Date;
  notes?: string;
  isRecurring: boolean;
  capacity: number;
  bookedCount: number;
  availableSpots: number;
};

export type AdminBookingInfo = {
  id: string;
  type: 'private' | 'disco';
  status: 'booked' | 'hold' | 'blocked' | 'canceled' | 'confirmed';
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  groupSize: number;
  partyType?: string;
  paymentStatus: 'pending' | 'deposit_paid' | 'fully_paid';
  amountPaid: number;
  totalAmount: number;
  specialRequests?: string;
  adminNotes?: string;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
};

export type CalendarSlotAction = 
  | { type: 'block'; slotId: string; reason?: string }
  | { type: 'unblock'; slotId: string }
  | { type: 'create_booking'; slotId: string; bookingData: Partial<AdminBookingInfo> }
  | { type: 'edit_booking'; bookingId: string; updates: Partial<AdminBookingInfo> }
  | { type: 'cancel_booking'; bookingId: string; reason?: string }
  | { type: 'move_booking'; bookingId: string; newSlotId: string };

export type BatchSlotOperation = {
  action: 'block' | 'unblock' | 'maintenance';
  slotIds: string[];
  reason?: string;
  notes?: string;
};

export type RecurringPattern = {
  type: 'weekly' | 'monthly' | 'custom';
  startDate: Date;
  endDate?: Date;
  daysOfWeek?: number[]; // 0-6 for Sunday-Saturday
  timeSlots: Array<{
    startTime: string; // HH:MM format
    endTime: string;   // HH:MM format
  }>;
  boatIds: string[];
  excludeDates?: Date[]; // specific dates to exclude
};

export type CalendarViewMode = 'week' | 'day' | 'month';

export type AdminCalendarFilters = {
  boatIds?: string[];
  status?: ('available' | 'booked' | 'blocked' | 'maintenance')[];
  paymentStatus?: ('pending' | 'deposit_paid' | 'fully_paid')[];
  bookingType?: ('private' | 'disco')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string; // search contact name/email
};

// Comprehensive booking data for admin table views
export type ComprehensiveAdminBooking = {
  id: string;
  cruiseDate: Date;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  partySize: number;
  partyType?: string;
  boatAssigned: string;
  boatName: string;
  totalAmount: number;
  amountPaid: number;
  amountOwed: number;
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid';
  bookingStatus: string;
  eventType: string;
  startTime: Date;
  endTime: Date;
  projectId?: string;
  quoteId?: string;
  specialRequests?: string;
  adminNotes?: string;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
  createdAt: Date;
};

// Type definitions for customer tracking tables
export type QuoteAnalytics = typeof quoteAnalytics.$inferSelect;
export type InsertQuoteAnalytics = typeof quoteAnalytics.$inferInsert;

export type FileSend = typeof fileSends.$inferSelect;
export type InsertFileSend = typeof fileSends.$inferInsert;

export type EmailTracking = typeof emailTracking.$inferSelect;
export type InsertEmailTracking = typeof emailTracking.$inferInsert;

export type CustomerLifecycle = typeof customerLifecycle.$inferSelect;
export type InsertCustomerLifecycle = typeof customerLifecycle.$inferInsert;

export type CustomerActivity = typeof customerActivity.$inferSelect;
export type InsertCustomerActivity = typeof customerActivity.$inferInsert;

// Unified Availability Data Models

// Slot Hold types
export type SlotHold = typeof slotHolds.$inferSelect;
export type InsertSlotHold = typeof slotHolds.$inferInsert;

// Create insert schema for slot holds
export const insertSlotHoldSchema = createInsertSchema(slotHolds);
export type InsertSlotHoldType = z.infer<typeof insertSlotHoldSchema>;

// Normalized slot interface for unified availability system
export interface NormalizedSlot {
  id: string; // unique identifier for the slot (date + time + cruiseType combination)
  cruiseType: 'private' | 'disco'; // type of cruise offering
  dateISO: string; // YYYY-MM-DD format for the cruise date
  date: string; // Alias for dateISO for backward compatibility
  startTime: string; // HH:MM format start time
  endTime: string; // HH:MM format end time  
  label: string; // human-readable time display (e.g., "11am-3pm")
  duration: number; // duration in hours
  capacity: number; // maximum group size for this slot
  availableCount: number; // how many boats/tickets are available
  price: number; // base price in cents for this slot/group size
  totalPrice: number; // total price including all fees and taxes
  boatName: string; // name of the preferred/assigned boat for this slot
  boatCandidates: string[]; // array of boat IDs that could serve this slot
  bookable: boolean; // whether this slot can be booked (available and not held)
  held?: boolean; // whether this slot is currently held by someone
  holdExpiresAt?: Date; // when the current hold expires
}

// Customer lifecycle stage definitions
export type LifecycleStage = 
  | 'initial_contact'
  | 'quote_sent'
  | 'quote_viewed'
  | 'quote_accepted'
  | 'deposit_paid'
  | 'fully_paid'
  | 'confirmed'
  | 'completed'
  | 'cancelled';

// Customer activity types
export type ActivityType = 
  | 'chat'
  | 'email_open'
  | 'quote_view'
  | 'file_download'
  | 'payment'
  | 'booking'
  | 'call'
  | 'meeting'
  | 'email_send'
  | 'sms_send';

// Comprehensive customer profile data structure
export type CustomerProfile = {
  contact: Contact;
  projects: Project[];
  quotes: Quote[];
  lifecycle: CustomerLifecycle;
  chatHistory: ChatMessage[];
  quoteAnalytics: QuoteAnalytics[];
  fileSends: FileSend[];
  emailTracking: EmailTracking[];
  customerActivity: CustomerActivity[];
  payments: Payment[];
  bookings: Booking[];
  totalValue: number;
  totalPaid: number;
  balance: number;
  lastActivity: Date | null;
  daysInCurrentStage: number;
  conversionProbability: number;
  nextActionRequired: string | null;
  nextActionDue: Date | null;
};

// ==========================================
// SEO MANAGEMENT SCHEMA
// ==========================================

// SEO pages table for comprehensive SEO management
export const seoPages = pgTable("seo_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  pageRoute: text("page_route").notNull(), // e.g., '/', '/bachelor-party', '/bachelorette-party'
  pageName: text("page_name").notNull(), // Human-readable page name
  
  // Primary Meta Tags
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: jsonb("meta_keywords").$type<string[]>().default([]),
  
  // Open Graph Tags
  openGraphTitle: text("og_title"),
  openGraphDescription: text("og_description"),
  openGraphImage: text("og_image"),
  openGraphType: varchar("og_type").default("website"),
  
  // Twitter Card Tags
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),
  twitterCard: varchar("twitter_card").default("summary_large_image"),
  
  // SEO Focus
  focusKeyword: text("focus_keyword"),
  targetKeywords: jsonb("target_keywords").$type<string[]>().default([]),
  
  // Structured Data
  schemaMarkup: jsonb("schema_markup").$type<Record<string, any>>().default({}),
  
  // URL Management
  canonicalUrl: text("canonical_url"),
  alternateUrls: jsonb("alternate_urls").$type<string[]>().default([]),
  
  // Technical SEO
  robotsDirective: varchar("robots_directive").default("index, follow"),
  priority: integer("priority").default(50), // 0-100 for sitemap priority
  changeFrequency: varchar("change_frequency").default("monthly"), // weekly, monthly, yearly
  
  // SEO Analysis Results
  seoScore: integer("seo_score").default(0), // 0-100
  lastAnalyzed: timestamp("last_analyzed"),
  issues: jsonb("issues").$type<SEOIssue[]>().default([]),
  recommendations: jsonb("recommendations").$type<string[]>().default([]),
  
  // Content Analysis
  contentLength: integer("content_length").default(0),
  keywordDensity: jsonb("keyword_density").$type<Record<string, number>>().default({}),
  headingStructure: jsonb("heading_structure").$type<HeadingStructure>().default({ h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] }),
  internalLinks: integer("internal_links").default(0),
  externalLinks: integer("external_links").default(0),
  imagesWithoutAlt: integer("images_without_alt").default(0),
  
  // Performance Metrics
  loadTime: integer("load_time"), // in milliseconds
  mobileOptimized: boolean("mobile_optimized").default(true),
  
  // Status and Management
  active: boolean("active").notNull().default(true),
  autoOptimize: boolean("auto_optimize").default(false), // Allow AI optimization
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// SEO audit log for tracking changes and optimizations
export const seoAuditLog = pgTable("seo_audit_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  pageId: varchar("page_id").notNull(), // reference to seo_pages
  
  // Audit Details
  auditType: varchar("audit_type").notNull(), // 'manual', 'ai_optimization', 'bulk_update', 'scheduled'
  changesMade: jsonb("changes_made").$type<Record<string, any>>().default({}),
  previousData: jsonb("previous_data").$type<Record<string, any>>().default({}),
  
  // Results
  scoreBefore: integer("score_before").default(0),
  scoreAfter: integer("score_after").default(0),
  issuesResolved: jsonb("issues_resolved").$type<string[]>().default([]),
  newIssues: jsonb("new_issues").$type<string[]>().default([]),
  
  // AI Optimization Details
  aiPrompt: text("ai_prompt"),
  aiModel: varchar("ai_model"), // 'gpt-4', 'gpt-3.5-turbo', etc.
  aiTokensUsed: integer("ai_tokens_used"),
  
  // Metadata
  performedBy: varchar("performed_by"), // 'system', 'admin', or user ID
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// SEO competitor tracking
export const seoCompetitors = pgTable("seo_competitors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  
  // Competitor Details
  name: text("name").notNull(),
  domain: text("domain").notNull(),
  targetKeywords: jsonb("target_keywords").$type<string[]>().default([]),
  
  // Analysis Results
  estimatedTraffic: integer("estimated_traffic"),
  domainAuthority: integer("domain_authority"),
  backlinks: integer("backlinks"),
  topRankingPages: jsonb("top_ranking_pages").$type<CompetitorPage[]>().default([]),
  
  // Tracking
  active: boolean("active").notNull().default(true),
  lastAnalyzed: timestamp("last_analyzed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Global SEO settings and configurations
export const seoSettings = pgTable("seo_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  
  // Global Meta Defaults
  defaultMetaTitle: text("default_meta_title"),
  defaultMetaDescription: text("default_meta_description"),
  defaultOgImage: text("default_og_image"),
  
  // Business Information for Schema
  businessName: text("business_name"),
  businessType: varchar("business_type"), // 'LocalBusiness', 'Organization', etc.
  businessAddress: jsonb("business_address").$type<BusinessAddress>().default({}),
  businessPhone: text("business_phone"),
  businessEmail: text("business_email"),
  businessHours: jsonb("business_hours").$type<BusinessHours[]>().default([]),
  
  // Social Media Profiles
  socialProfiles: jsonb("social_profiles").$type<SocialProfile[]>().default([]),
  
  // SEO Tools Integration
  googleAnalyticsId: text("google_analytics_id"),
  googleSearchConsoleId: text("google_search_console_id"),
  facebookPixelId: text("facebook_pixel_id"),
  
  // Technical Settings
  robotsTxtContent: text("robots_txt_content"),
  customSchemaMarkup: jsonb("custom_schema_markup").$type<Record<string, any>>().default({}),
  
  // AI Optimization Settings
  aiOptimizationEnabled: boolean("ai_optimization_enabled").default(true),
  preferredAiModel: varchar("preferred_ai_model").default("gpt-4"),
  aiOptimizationPrompts: jsonb("ai_optimization_prompts").$type<Record<string, string>>().default({}),
  
  // Automated Features
  autoGenerateSitemap: boolean("auto_generate_sitemap").default(true),
  autoAnalyzeNewPages: boolean("auto_analyze_new_pages").default(true),
  scheduleRegularAudits: boolean("schedule_regular_audits").default(false),
  auditFrequency: varchar("audit_frequency").default("weekly"), // daily, weekly, monthly
  
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Types for SEO functionality
export type SEOIssue = {
  type: 'error' | 'warning' | 'info';
  category: 'meta' | 'content' | 'technical' | 'performance' | 'accessibility';
  message: string;
  element?: string;
  priority: 'high' | 'medium' | 'low';
  autoFixable: boolean;
};

export type HeadingStructure = {
  h1: string[];
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
};

export type CompetitorPage = {
  url: string;
  title: string;
  keywords: string[];
  estimatedTraffic: number;
  position: number;
};

export type BusinessAddress = {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
};

export type BusinessHours = {
  dayOfWeek: string;
  opens: string;
  closes: string;
};

export type SocialProfile = {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok';
  url: string;
  username?: string;
};

// Insert schemas for SEO entities
export const insertSeoPageSchema = createInsertSchema(seoPages).omit({
  id: true,
  createdAt: true,
  lastUpdated: true,
});

export const insertSeoAuditLogSchema = createInsertSchema(seoAuditLog).omit({
  id: true,
  createdAt: true,
});

export const insertSeoCompetitorSchema = createInsertSchema(seoCompetitors).omit({
  id: true,
  createdAt: true,
});

export const insertSeoSettingsSchema = createInsertSchema(seoSettings).omit({
  id: true,
  createdAt: true,
  lastUpdated: true,
});

// TypeScript types for SEO entities
export type SeoPage = typeof seoPages.$inferSelect;
export type InsertSeoPage = z.infer<typeof insertSeoPageSchema>;
export type SeoAuditLog = typeof seoAuditLog.$inferSelect;
export type InsertSeoAuditLog = z.infer<typeof insertSeoAuditLogSchema>;
export type SeoCompetitor = typeof seoCompetitors.$inferSelect;
export type InsertSeoCompetitor = z.infer<typeof insertSeoCompetitorSchema>;
export type SeoSettings = typeof seoSettings.$inferSelect;
export type InsertSeoSettings = z.infer<typeof insertSeoSettingsSchema>;

// SEO analysis and optimization types
export type SEOAnalysisResult = {
  score: number;
  issues: SEOIssue[];
  recommendations: string[];
  keywordDensity: Record<string, number>;
  headingStructure: HeadingStructure;
  contentMetrics: {
    wordCount: number;
    paragraphCount: number;
    sentenceCount: number;
    readabilityScore: number;
  };
  technicalMetrics: {
    loadTime: number;
    mobileOptimized: boolean;
    hasStructuredData: boolean;
    internalLinks: number;
    externalLinks: number;
    imagesWithoutAlt: number;
  };
};

export type SEOOptimizationRequest = {
  pageRoute: string;
  targetKeyword?: string;
  optimizationType: 'meta_tags' | 'content' | 'headings' | 'full_page';
  currentContent?: string;
  competitorUrls?: string[];
};

export type SEOBulkOperation = {
  operation: 'analyze' | 'optimize' | 'update_meta';
  pageRoutes: string[];
  parameters?: Record<string, any>;
};

// AI Media Library Tables
export const mediaItems = pgTable('media_items', {
  id: varchar('id', { length: 255 }).primaryKey().default(sql`gen_random_uuid()`),
  filename: varchar('filename', { length: 500 }).notNull(),
  originalName: varchar('original_name', { length: 500 }),
  fileType: varchar('file_type', { length: 50 }).notNull(), // 'photo', 'video', 'generated_video', 'edited_photo'
  filePath: varchar('file_path', { length: 1000 }).notNull(),
  fileSize: integer('file_size'),
  mimeType: varchar('mime_type', { length: 100 }),
  uploadDate: timestamp('upload_date').defaultNow(),
  
  // AI Analysis
  aiAnalyzed: boolean('ai_analyzed').default(false),
  aiAnalysis: jsonb('ai_analysis'),
  autoTags: jsonb('auto_tags'),
  manualTags: jsonb('manual_tags'),
  qualityScore: integer('quality_score'),
  ugcPotential: integer('ugc_potential'),
  
  // Editing
  originalPhotoId: varchar('original_photo_id', { length: 255 }),
  editHistory: jsonb('edit_history'),
  
  // Management
  status: varchar('status', { length: 50 }).default('draft'),
  publishedLocations: jsonb('published_locations'),
  createdBy: varchar('created_by', { length: 255 }),
  lastModified: timestamp('last_modified').defaultNow()
});

export const photoEdits = pgTable('photo_edits', {
  id: varchar('id', { length: 255 }).primaryKey().default(sql`gen_random_uuid()`),
  originalPhotoId: varchar('original_photo_id', { length: 255 }),
  editedPhotoId: varchar('edited_photo_id', { length: 255 }),
  editType: varchar('edit_type', { length: 100 }),
  editPrompt: text('edit_prompt'),
  nanoBananaJobId: varchar('nanobanan_job_id', { length: 500 }),
  editCost: integer('edit_cost'),
  status: varchar('status', { length: 50 }).default('processing'),
  createdAt: timestamp('created_at').defaultNow()
});

export const insertMediaItemSchema = createInsertSchema(mediaItems).omit({
  id: true,
  uploadDate: true,
  lastModified: true,
});

export const insertPhotoEditSchema = createInsertSchema(photoEdits).omit({
  id: true,
  createdAt: true,
});

export type InsertMediaItem = z.infer<typeof insertMediaItemSchema>;
export type MediaItem = typeof mediaItems.$inferSelect;
export type InsertPhotoEdit = z.infer<typeof insertPhotoEditSchema>;
export type PhotoEdit = typeof photoEdits.$inferSelect;

// Pricing Adjustments - for dynamic pricing modifications (Phase 1)
export const pricingAdjustments = pgTable("pricing_adjustments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  description: text("description"),
  scopeType: varchar("scope_type").notNull(), // 'global', 'boat', 'product', 'category'
  scopeId: varchar("scope_id"), // nullable when scopeType is 'global'
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  daysOfWeek: jsonb("days_of_week").$type<number[]>().default([]), // 0-6 for Sunday-Saturday
  adjustmentType: varchar("adjustment_type").notNull(), // 'amount', 'percent', 'override'
  amountCents: integer("amount_cents").notNull().default(0), // Fixed amount in cents
  percentBps: integer("percent_bps").notNull().default(0), // Percentage in basis points (0-10000)
  operation: varchar("operation").notNull().default("increase"), // 'increase', 'decrease'
  priority: integer("priority").notNull().default(0), // Lower number = higher priority
  stackable: boolean("stackable").notNull().default(true), // Can be combined with other adjustments
  isDateOfInterest: boolean("is_date_of_interest").notNull().default(false), // Special date highlighting
  interestLabel: text("interest_label"), // Label for special dates (e.g., "New Year's Eve")
  interestColor: varchar("interest_color"), // Color code for calendar highlighting
  recurrence: varchar("recurrence").notNull().default("none"), // 'none', 'annual'
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Pricing Adjustments Insert Schema
export const insertPricingAdjustmentSchema = createInsertSchema(pricingAdjustments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Adjustment name is required"),
  scopeType: z.enum(["global", "boat", "product", "category"]),
  startDate: z.string().datetime().transform(str => new Date(str)),
  endDate: z.string().datetime().transform(str => new Date(str)),
  daysOfWeek: z.array(z.number().min(0).max(6)).default([]),
  adjustmentType: z.enum(["amount", "percent", "override"]),
  amountCents: z.number().min(0).default(0),
  percentBps: z.number().min(0).max(10000).default(0), // 0-10000 basis points (0-100%)
  operation: z.enum(["increase", "decrease"]).default("increase"),
  priority: z.number().default(0),
  stackable: z.boolean().default(true),
  isDateOfInterest: z.boolean().default(false),
  recurrence: z.enum(["none", "annual"]).default("none"),
  active: z.boolean().default(true),
});

// Type definitions for Pricing Adjustments
export type PricingAdjustment = typeof pricingAdjustments.$inferSelect;
export type InsertPricingAdjustment = z.infer<typeof insertPricingAdjustmentSchema>;

// ==========================================
// UNIVERSAL INTELLIGENT CHECKOUT SYSTEM
// ==========================================

/**
 * Entry point types for tracking where the checkout originated
 */
export type CheckoutEntryPoint = 
  | 'quote_builder'    // From quote builder interface
  | 'live_calendar'    // From calendar slot selection
  | 'quote_form'       // From quote request forms
  | 'chat_flow'        // From chatbot flow
  | 'direct_link'      // Direct URL access
  | 'admin_booking';   // Admin-created booking

/**
 * Boat configuration with capacity and pricing information
 */
export interface BoatOption {
  id: string;
  name: string;
  displayName: string;
  capacity: number;          // Standard capacity (e.g., 14, 25, 50)
  maxCapacity: number;       // Maximum with extra crew
  extraCrewThreshold: number; // Group size requiring extra crew
  crewFeePerHour: number;    // Additional crew fee in cents per hour
  description: string;       // "Intimate gatherings", "Medium groups", etc.
  imageUrl?: string;
  active: boolean;
}

/**
 * Cruise type options with intelligent bachelor/bachelorette support
 */
export interface CruiseTypeOption {
  id: 'private' | 'disco';
  label: string;
  description: string;
  availableFor: string[];    // Event types this is available for
  minimumAdvanceHours: number; // Minimum booking advance notice
  cancellationPolicy: string;
  features: string[];
}

/**
 * Package selection for disco cruises
 */
export interface DiscoPackageOption {
  id: 'basic' | 'disco_queen' | 'platinum';
  label: string;
  description: string;
  pricePerPerson: number;    // In cents
  features: string[];
  popular?: boolean;
}

/**
 * Add-on package options for private cruises
 */
export interface AddOnPackageOption {
  id: string;
  name: string;
  description: string;
  hourlyRate: number;        // Additional rate in cents per hour
  features: string[];
  eventTypes: string[];      // Which event types this applies to
  popular?: boolean;
}

/**
 * Comprehensive checkout context from entry points
 */
export interface CheckoutContext {
  // Entry point tracking
  entryPoint: CheckoutEntryPoint;
  referrerUrl?: string;
  utmParams?: Record<string, string>;
  
  // Pre-selected data from entry point
  preselectedData: {
    // Basic event details
    eventDate?: Date;
    eventType?: string;
    eventTypeLabel?: string;
    groupSize?: number;
    
    // Boat and time selection
    boatId?: string;
    timeSlot?: NormalizedSlot;
    cruiseType?: 'private' | 'disco';
    
    // Package selections
    discoPackage?: 'basic' | 'disco_queen' | 'platinum';
    discoTicketQuantity?: number;
    addOnPackages?: string[];
    
    // Pricing context
    quotedPrice?: number;
    depositAmount?: number;
    
    // Contact information (if available)
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    
    // Special requirements
    specialRequests?: string;
    budget?: number;
  };
  
  // Context metadata
  sessionId: string;
  quoteId?: string;
  projectId?: string;
  holdId?: string;           // Slot hold identifier
  createdAt: Date;
  lastModified: Date;
}

/**
 * Current checkout selections (editable by user)
 */
export interface CheckoutSelections {
  // Core selections
  eventDate: Date;
  eventType: string;
  eventTypeLabel: string;
  groupSize: number;
  
  // Boat selection
  selectedBoat: BoatOption;
  selectedTimeSlot: NormalizedSlot;
  
  // Cruise type and packages
  cruiseType: 'private' | 'disco';
  discoPackage?: DiscoPackageOption;
  discoTicketQuantity?: number;
  addOnPackages: AddOnPackageOption[];
  
  // Contact information
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Additional details
  specialRequests?: string;
  marketingConsent: boolean;
}

/**
 * Real-time pricing calculation for checkout
 */
export interface CheckoutPricing extends PricingPreview {
  // Boat-specific pricing
  boatInfo: {
    name: string;
    baseHourlyRate: number;
    crewFee: number;
    capacity: number;
  };
  
  // Package pricing breakdown
  packageBreakdown: {
    baseCruiseCost: number;
    discoPackageCost?: number;
    addOnPackagesCost: number;
    crewFee: number;
  };
  
  // Payment options
  paymentOptions: {
    depositOnly: {
      amount: number;
      description: string;
    };
    fullPayment: {
      amount: number;
      description: string;
    };
  };
  
  // Pricing validity
  validUntil: Date;
  requiresRevalidation: boolean;
}

/**
 * Bachelor/Bachelorette intelligent comparison data
 */
export interface BachelorComparison {
  privateOption: {
    available: boolean;
    pricing: CheckoutPricing;
    boats: BoatOption[];
    timeSlots: NormalizedSlot[];
    benefits: string[];
  };
  
  discoOption: {
    available: boolean;
    pricing: CheckoutPricing;
    packages: DiscoPackageOption[];
    timeSlots: NormalizedSlot[];
    benefits: string[];
  };
  
  recommendation: 'private' | 'disco';
  comparisonNote: string;
}

/**
 * Checkout validation result
 */
export interface CheckoutValidation {
  isValid: boolean;
  errors: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  warnings: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  
  // Availability check
  slotAvailable: boolean;
  holdValid: boolean;
  pricingCurrent: boolean;
  
  // Required actions
  requiresHoldRenewal: boolean;
  requiresPricingUpdate: boolean;
}

/**
 * Post-payment processing data
 */
export interface PostPaymentProcessing {
  // Stripe payment information
  stripePaymentIntentId: string;
  stripeCustomerId?: string;
  paymentAmount: number;
  paymentType: 'deposit' | 'full_payment';
  
  // Booking creation
  bookingData: {
    contactId: string;
    projectId: string;
    quoteId?: string;
    boatId: string;
    startTime: Date;
    endTime: Date;
    groupSize: number;
    totalAmount: number;
    amountPaid: number;
    paymentStatus: 'deposit_paid' | 'fully_paid';
    specialRequests?: string;
  };
  
  // CRM updates
  crmUpdates: {
    leadStatus: string;
    pipelinePhase: string;
    nextFollowUp?: Date;
  };
  
  // External integrations
  integrationUpdates: {
    updateGoogleSheets: boolean;
    updateGoHighLevel: boolean;
    sendConfirmationEmail: boolean;
    sendConfirmationSMS: boolean;
  };
  
  // Availability management
  availabilityUpdates: {
    releaseHold: boolean;
    markSlotBooked: boolean;
    updateCapacity: boolean;
  };
}

/**
 * Checkout session state management
 */
export interface CheckoutSession {
  sessionId: string;
  context: CheckoutContext;
  selections: CheckoutSelections;
  pricing: CheckoutPricing;
  validation: CheckoutValidation;
  
  // State tracking
  currentStep: 'selections' | 'contact' | 'payment' | 'confirmation';
  completedSteps: string[];
  
  // Hold management
  holdId?: string;
  holdExpiresAt?: Date;
  
  // Checkout flow state
  isEditing: boolean;
  hasChanges: boolean;
  lastUpdated: Date;
  
  // Error handling
  lastError?: string;
  retryCount: number;
}

// Zod schemas for validation
export const checkoutContextSchema = z.object({
  entryPoint: z.enum(['quote_builder', 'live_calendar', 'quote_form', 'chat_flow', 'direct_link', 'admin_booking']),
  referrerUrl: z.string().optional(),
  utmParams: z.record(z.string()).optional(),
  preselectedData: z.object({
    eventDate: z.date().optional(),
    eventType: z.string().optional(),
    eventTypeLabel: z.string().optional(),
    groupSize: z.number().min(1).optional(),
    boatId: z.string().optional(),
    timeSlot: z.any().optional(), // NormalizedSlot
    cruiseType: z.enum(['private', 'disco']).optional(),
    discoPackage: z.enum(['basic', 'disco_queen', 'platinum']).optional(),
    discoTicketQuantity: z.number().optional(),
    addOnPackages: z.array(z.string()).optional(),
    quotedPrice: z.number().optional(),
    depositAmount: z.number().optional(),
    contactName: z.string().optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
    specialRequests: z.string().optional(),
    budget: z.number().optional(),
  }).default({}),
  sessionId: z.string(),
  quoteId: z.string().optional(),
  projectId: z.string().optional(),
  holdId: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  lastModified: z.date().default(() => new Date()),
});

export const checkoutSelectionsSchema = z.object({
  eventDate: z.date(),
  eventType: z.string(),
  eventTypeLabel: z.string(),
  groupSize: z.number().min(1),
  selectedBoat: z.any(), // BoatOption
  selectedTimeSlot: z.any(), // NormalizedSlot
  cruiseType: z.enum(['private', 'disco']),
  discoPackage: z.any().optional(), // DiscoPackageOption
  discoTicketQuantity: z.number().optional(),
  addOnPackages: z.array(z.any()).default([]), // AddOnPackageOption[]
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  specialRequests: z.string().optional(),
  marketingConsent: z.boolean().default(false),
});

// Export types
export type CheckoutContext = z.infer<typeof checkoutContextSchema>;
export type CheckoutSelections = z.infer<typeof checkoutSelectionsSchema>;

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, unique, bigint, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ==========================================
// CORE TABLES
// ==========================================

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
  unitPrice: bigint("unit_price", { mode: "number" }).notNull(), // in cents
  taxable: boolean("taxable").notNull().default(true),
  pricingModel: varchar("pricing_model").notNull().default("hourly"), // 'hourly', 'per_person', 'flat_rate'
  productType: varchar("product_type").notNull().default("private_cruise"), // 'private_cruise', 'disco_cruise', 'addon'
  dayType: varchar("day_type"), // 'weekday', 'friday', 'saturday', 'sunday' (for private cruises)
  groupSize: integer("group_size"), // 14, 25, 30, 50, 75 (for private cruises)
  boatId: varchar("boat_id"), // links to specific boat for private/disco cruises
  startTime: text("start_time"), // time slot start (e.g., "10:00") for private/disco cruises
  endTime: text("end_time"), // time slot end (e.g., "14:00") for private/disco cruises
  duration: integer("duration"), // duration in hours for time slot products
  crewFeePerHour: bigint("crew_fee_per_hour", { mode: "number" }).default(0), // additional crew fee in cents/hour when capacity threshold reached
  imageUrl: text("image_url"), // Background image for photo-centric cards
  categoryType: varchar("category_type").notNull().default("experience"), // 'experience', 'addon'
  eventTypes: jsonb("event_types").$type<string[]>().default([]), // which event types this product applies to
  active: boolean("active").notNull().default(true),
});

// ==========================================
// AUTHENTICATION
// ==========================================

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  username: varchar("username", { length: 100 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("user").notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
});

export const invites = pgTable("invites", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  inviteToken: varchar("invite_token", { length: 255 }).unique().notNull(),
  invitedBy: integer("invited_by").references(() => users.id).notNull(),
  role: varchar("role", { length: 50 }).default("user").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==========================================
// ADMIN CHAT (AI ASSISTANT)
// ==========================================

export const adminChatSessions = pgTable("admin_chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  adminUserId: varchar("admin_user_id"), // reference to admin user
  title: text("title").notNull(),
  description: text("description"),
  tags: jsonb("tags").$type<string[]>().default([]),
  isActive: boolean("is_active").notNull().default(true),
  lastMessageAt: timestamp("last_message_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const adminChatMessages = pgTable("admin_chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  adminUserId: varchar("admin_user_id"), // reference to admin user
  role: varchar("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  messageType: varchar("message_type").notNull().default("text"), // 'text', 'code', 'system'
  codeLanguage: varchar("code_language"), // programming language for code blocks
  metadata: jsonb("metadata").$type<{
    requestType?: 'coding' | 'admin' | 'query' | 'debug' | 'review';
    attachments?: string[];
    tokens?: number;
    model?: string;
    reasoning?: string;
  }>().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ==========================================
// PRICING SETTINGS
// ==========================================

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

// ==========================================
// AFFILIATES
// ==========================================

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
  totalRevenue: bigint("total_revenue", { mode: "number" }).notNull().default(0), // in cents
  totalCommission: bigint("total_commission", { mode: "number" }).notNull().default(0), // in cents
  pendingCommission: bigint("pending_commission", { mode: "number" }).notNull().default(0), // in cents
  lastReferralDate: timestamp("last_referral_date"),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ==========================================
// BLOG SYSTEM
// ==========================================

export const blogAuthors = pgTable("blog_authors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  slug: varchar("slug").notNull().unique(),
  email: text("email"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  socialLinks: jsonb("social_links").$type<{
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  }>().default({}),
  active: boolean("active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogCategories = pgTable("blog_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  slug: varchar("slug").notNull().unique(),
  description: text("description"),
  parentId: varchar("parent_id"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  active: boolean("active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  postCount: integer("post_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogTags = pgTable("blog_tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  name: text("name").notNull(),
  slug: varchar("slug").notNull().unique(),
  description: text("description"),
  active: boolean("active").notNull().default(true),
  postCount: integer("post_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  authorId: varchar("author_id").notNull(),
  title: text("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  content: text("content").notNull(),
  contentType: varchar("content_type").notNull().default("html"),
  status: varchar("status").notNull().default("draft"),
  excerpt: text("excerpt"),
  publishedAt: timestamp("published_at"),
  scheduledFor: timestamp("scheduled_for"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyphrase: text("focus_keyphrase"),
  featuredImage: text("featured_image"),
  featuredImageAlt: text("featured_image_alt"),
  socialImage: text("social_image"),
  readingTime: integer("reading_time"),
  wordCount: integer("word_count"),
  viewCount: integer("view_count").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  allowComments: boolean("allow_comments").notNull().default(true),
  sticky: boolean("sticky").notNull().default(false),
  galleryImages: jsonb("gallery_images").$type<string[]>().default([]),
  videoUrl: text("video_url"),
  audioUrl: text("audio_url"),
  customFields: jsonb("custom_fields").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogPostCategories = pgTable("blog_post_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(),
  categoryId: varchar("category_id").notNull(),
  isPrimary: boolean("is_primary").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const blogPostTags = pgTable("blog_post_tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull(),
  tagId: varchar("tag_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ==========================================
// AI ENDORSEMENTS & AUTHORITY SIGNALS
// ==========================================

export const endorsements = pgTable("endorsements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  source: varchar("source", { length: 100 }).notNull(), // e.g., "Claude AI (Anthropic)"
  sourceType: varchar("source_type", { length: 50 }).notNull().default("ai_analysis"), // 'ai_analysis', 'review', 'certification'
  headline: text("headline").notNull(), // e.g., "9.8/10 SEO Excellence Rating"
  rating: integer("rating"), // Score out of 10 or 100
  maxRating: integer("max_rating").default(10), // For schema.org Review rating
  summary: text("summary").notNull(), // Brief overview for display
  fullAnalysis: text("full_analysis"), // Complete transcript/analysis
  highlightQuotes: jsonb("highlight_quotes").$type<string[]>().default([]), // Key quotes to feature
  artifactUrl: text("artifact_url"), // Link to original Claude artifact or PDF
  artifactType: varchar("artifact_type", { length: 50 }), // 'url', 'pdf', 'text'
  artifactData: text("artifact_data"), // Store artifact content if needed
  categories: jsonb("categories").$type<string[]>().default([]), // e.g., ['seo', 'content', 'authority']
  displayOnHomepage: boolean("display_on_homepage").notNull().default(false),
  displayOrder: integer("display_order").default(0), // For sorting multiple endorsements
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ==========================================
// SEO MANAGEMENT
// ==========================================

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

// ==========================================
// MEDIA LIBRARY
// ==========================================

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
  editCost: bigint('edit_cost', { mode: "number" }),
  status: varchar('status', { length: 50 }).default('processing'),
  createdAt: timestamp('created_at').defaultNow()
});

// ==========================================
// CONTENT BLOCKS
// ==========================================

export const contentBlocks = pgTable('content_blocks', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().default("org_demo"),
  route: text('route').notNull(), // page route like '/home', '/about'
  key: text('key').notNull(), // unique identifier like 'hero-title', 'popup-text'
  title: text('title'), // human-readable title for the block
  valueJSON: text('value_json').notNull(), // JSON content
  type: text('type').notNull(), // 'text', 'image', 'video', 'cta', 'section', 'gallery', 'testimonial', 'pricing', 'faq', 'contact', 'custom', 'html'
  category: text('category').default('content'), // 'content', 'layout', 'media', 'interactive'
  displayOrder: integer('display_order').default(0), // for ordering blocks within a page
  isVisible: boolean('is_visible').default(true), // show/hide blocks
  status: varchar('status').notNull().default('draft'), // 'draft', 'published', 'archived'
  conditions: jsonb('conditions').$type<{
    showOnMobile?: boolean;
    showOnDesktop?: boolean;
    showForUserRoles?: string[];
    dateRange?: {
      start?: string;
      end?: string;
    };
  }>().default({}), // conditional display rules
  styling: jsonb('styling').$type<{
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    customCSS?: string;
  }>().default({}), // block-specific styling
  metadata: jsonb('metadata').$type<{
    version?: number;
    lastPublished?: string;
    isDraft?: boolean;
    approvalStatus?: 'pending' | 'approved' | 'rejected';
    approvedBy?: string;
    approvedAt?: string;
    tags?: string[];
    seoTitle?: string;
    seoDescription?: string;
  }>().default({}), // extensible metadata
  parentBlockId: varchar('parent_block_id'), // for nested blocks (e.g., sections containing other blocks)
  templateId: varchar('template_id'), // reference to block templates
  updatedBy: text('updated_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// ==========================================
// PROMPTS LIBRARY
// ==========================================

export const promptsLibrary = pgTable('prompts_library', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  category: varchar('category', { length: 100 }).notNull(),
  content: text('content').notNull(),
  version: varchar('version', { length: 50 }).default('1.0'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isActive: boolean('is_active').default(true)
});

// ==========================================
// TYPE DEFINITIONS
// ==========================================

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

// ==========================================
// INSERT SCHEMAS
// ==========================================

export const insertBoatSchema = createInsertSchema(boats).omit({
  id: true,
}).extend({
  maxCapacity: z.number().min(1),
  extraCrewThreshold: z.number().optional(),
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

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastLoginAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "user"]).default("user"),
  isActive: z.boolean().default(true),
});

export const insertInviteSchema = createInsertSchema(invites).omit({
  id: true,
  createdAt: true,
  usedAt: true,
}).extend({
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user"]).default("user"),
});

export const insertAdminChatSessionSchema = createInsertSchema(adminChatSessions).omit({
  id: true,
  createdAt: true,
  lastMessageAt: true,
});

export const insertAdminChatMessageSchema = createInsertSchema(adminChatMessages).omit({
  id: true,
  createdAt: true,
});

export const insertPricingSettingsSchema = createInsertSchema(pricingSettings).omit({
  id: true,
  updatedAt: true,
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

export const insertEndorsementSchema = createInsertSchema(endorsements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  source: z.string().min(1, "Source is required"),
  headline: z.string().min(1, "Headline is required"),
  summary: z.string().min(1, "Summary is required"),
  rating: z.number().int().min(0).max(100).optional(),
  maxRating: z.number().int().default(10),
  highlightQuotes: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
});

export const insertSeoPageSchema = createInsertSchema(seoPages).omit({
  id: true,
  createdAt: true,
  lastUpdated: true,
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

export const insertContentBlockSchema = createInsertSchema(contentBlocks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  route: z.string().min(1, "Route is required"),
  key: z.string().min(1, "Key is required"),
  title: z.string().optional(),
  valueJSON: z.string().min(1, "Content is required"),
  type: z.enum(['text', 'image', 'video', 'cta', 'section', 'gallery', 'testimonial', 'pricing', 'faq', 'contact', 'custom', 'html']),
  category: z.string().default('content'),
  displayOrder: z.number().default(0),
  isVisible: z.boolean().default(true),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  conditions: z.object({
    showOnMobile: z.boolean().optional(),
    showOnDesktop: z.boolean().optional(),
    showForUserRoles: z.array(z.string()).optional(),
    dateRange: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
    }).optional(),
  }).optional(),
  styling: z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    padding: z.string().optional(),
    margin: z.string().optional(),
    customCSS: z.string().optional(),
  }).optional(),
  metadata: z.object({
    version: z.number().optional(),
    lastPublished: z.string().optional(),
    isDraft: z.boolean().optional(),
    approvalStatus: z.enum(['pending', 'approved', 'rejected']).optional(),
    approvedBy: z.string().optional(),
    approvedAt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }).optional(),
  parentBlockId: z.string().optional(),
  templateId: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const insertPromptsLibrarySchema = createInsertSchema(promptsLibrary).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Content is required"),
  version: z.string().default('1.0'),
  isActive: z.boolean().default(true),
});

// ==========================================
// SELECT TYPES
// ==========================================

export type Boat = typeof boats.$inferSelect;
export type Product = typeof products.$inferSelect;
export type User = typeof users.$inferSelect;
export type Invite = typeof invites.$inferSelect;
export type AdminChatSession = typeof adminChatSessions.$inferSelect;
export type AdminChatMessage = typeof adminChatMessages.$inferSelect;
export type PricingSettings = typeof pricingSettings.$inferSelect;
export type Affiliate = typeof affiliates.$inferSelect;
export type BlogAuthor = typeof blogAuthors.$inferSelect;
export type BlogCategory = typeof blogCategories.$inferSelect;
export type BlogTag = typeof blogTags.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type BlogPostCategory = typeof blogPostCategories.$inferSelect;
export type BlogPostTag = typeof blogPostTags.$inferSelect;
export type Endorsement = typeof endorsements.$inferSelect;
export type SeoPage = typeof seoPages.$inferSelect;
export type MediaItem = typeof mediaItems.$inferSelect;
export type PhotoEdit = typeof photoEdits.$inferSelect;
export type ContentBlock = typeof contentBlocks.$inferSelect;
export type PromptsLibrary = typeof promptsLibrary.$inferSelect;

// ==========================================
// INSERT TYPES
// ==========================================

export type InsertBoat = z.infer<typeof insertBoatSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertInvite = z.infer<typeof insertInviteSchema>;
export type InsertAdminChatSession = z.infer<typeof insertAdminChatSessionSchema>;
export type InsertAdminChatMessage = z.infer<typeof insertAdminChatMessageSchema>;
export type InsertPricingSettings = z.infer<typeof insertPricingSettingsSchema>;
export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;
export type InsertBlogAuthor = z.infer<typeof insertBlogAuthorSchema>;
export type InsertBlogCategory = z.infer<typeof insertBlogCategorySchema>;
export type InsertBlogTag = z.infer<typeof insertBlogTagSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertBlogPostCategory = z.infer<typeof insertBlogPostCategorySchema>;
export type InsertBlogPostTag = z.infer<typeof insertBlogPostTagSchema>;
export type InsertEndorsement = z.infer<typeof insertEndorsementSchema>;
export type InsertSeoPage = z.infer<typeof insertSeoPageSchema>;
export type InsertMediaItem = z.infer<typeof insertMediaItemSchema>;
export type InsertPhotoEdit = z.infer<typeof insertPhotoEditSchema>;
export type InsertContentBlock = z.infer<typeof insertContentBlockSchema>;
export type InsertPromptsLibrary = z.infer<typeof insertPromptsLibrarySchema>;

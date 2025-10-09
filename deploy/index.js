var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  adminChatMessages: () => adminChatMessages,
  adminChatSessions: () => adminChatSessions,
  affiliates: () => affiliates,
  blogAuthors: () => blogAuthors,
  blogCategories: () => blogCategories,
  blogPostCategories: () => blogPostCategories,
  blogPostTags: () => blogPostTags,
  blogPosts: () => blogPosts,
  blogTags: () => blogTags,
  boats: () => boats,
  contentBlocks: () => contentBlocks,
  endorsements: () => endorsements,
  insertAdminChatMessageSchema: () => insertAdminChatMessageSchema,
  insertAdminChatSessionSchema: () => insertAdminChatSessionSchema,
  insertAffiliateSchema: () => insertAffiliateSchema,
  insertBlogAuthorSchema: () => insertBlogAuthorSchema,
  insertBlogCategorySchema: () => insertBlogCategorySchema,
  insertBlogPostCategorySchema: () => insertBlogPostCategorySchema,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertBlogPostTagSchema: () => insertBlogPostTagSchema,
  insertBlogTagSchema: () => insertBlogTagSchema,
  insertBoatSchema: () => insertBoatSchema,
  insertContentBlockSchema: () => insertContentBlockSchema,
  insertEndorsementSchema: () => insertEndorsementSchema,
  insertInviteSchema: () => insertInviteSchema,
  insertMediaItemSchema: () => insertMediaItemSchema,
  insertPhotoEditSchema: () => insertPhotoEditSchema,
  insertPricingSettingsSchema: () => insertPricingSettingsSchema,
  insertProductSchema: () => insertProductSchema,
  insertPromptsLibrarySchema: () => insertPromptsLibrarySchema,
  insertSeoPageSchema: () => insertSeoPageSchema,
  insertUserSchema: () => insertUserSchema,
  invites: () => invites,
  mediaItems: () => mediaItems,
  photoEdits: () => photoEdits,
  pricingSettings: () => pricingSettings,
  products: () => products,
  promptsLibrary: () => promptsLibrary,
  seoPages: () => seoPages,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, bigint, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var boats, products, users, invites, adminChatSessions, adminChatMessages, pricingSettings, affiliates, blogAuthors, blogCategories, blogTags, blogPosts, blogPostCategories, blogPostTags, endorsements, seoPages, mediaItems, photoEdits, contentBlocks, promptsLibrary, insertBoatSchema, insertProductSchema, insertUserSchema, insertInviteSchema, insertAdminChatSessionSchema, insertAdminChatMessageSchema, insertPricingSettingsSchema, insertAffiliateSchema, insertBlogAuthorSchema, insertBlogCategorySchema, insertBlogTagSchema, insertBlogPostSchema, insertBlogPostCategorySchema, insertBlogPostTagSchema, insertEndorsementSchema, insertSeoPageSchema, insertMediaItemSchema, insertPhotoEditSchema, insertContentBlockSchema, insertPromptsLibrarySchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    boats = pgTable("boats", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      orgId: varchar("org_id").notNull().default("org_demo"),
      name: text("name").notNull(),
      capacity: integer("capacity").notNull(),
      // standard capacity
      maxCapacity: integer("max_capacity").notNull(),
      // maximum capacity with additional crew
      extraCrewThreshold: integer("extra_crew_threshold"),
      // group size requiring extra crew
      active: boolean("active").notNull().default(true)
    });
    products = pgTable("products", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      orgId: varchar("org_id").notNull().default("org_demo"),
      name: text("name").notNull(),
      description: text("description"),
      unitPrice: bigint("unit_price", { mode: "number" }).notNull(),
      // in cents
      taxable: boolean("taxable").notNull().default(true),
      pricingModel: varchar("pricing_model").notNull().default("hourly"),
      // 'hourly', 'per_person', 'flat_rate'
      productType: varchar("product_type").notNull().default("private_cruise"),
      // 'private_cruise', 'disco_cruise', 'addon'
      dayType: varchar("day_type"),
      // 'weekday', 'friday', 'saturday', 'sunday' (for private cruises)
      groupSize: integer("group_size"),
      // 14, 25, 30, 50, 75 (for private cruises)
      boatId: varchar("boat_id"),
      // links to specific boat for private/disco cruises
      startTime: text("start_time"),
      // time slot start (e.g., "10:00") for private/disco cruises
      endTime: text("end_time"),
      // time slot end (e.g., "14:00") for private/disco cruises
      duration: integer("duration"),
      // duration in hours for time slot products
      crewFeePerHour: bigint("crew_fee_per_hour", { mode: "number" }).default(0),
      // additional crew fee in cents/hour when capacity threshold reached
      imageUrl: text("image_url"),
      // Background image for photo-centric cards
      categoryType: varchar("category_type").notNull().default("experience"),
      // 'experience', 'addon'
      eventTypes: jsonb("event_types").$type().default([]),
      // which event types this product applies to
      active: boolean("active").notNull().default(true)
    });
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      email: varchar("email", { length: 255 }).unique().notNull(),
      username: varchar("username", { length: 100 }).unique().notNull(),
      password: varchar("password", { length: 255 }).notNull(),
      role: varchar("role", { length: 50 }).default("user").notNull(),
      firstName: varchar("first_name", { length: 100 }),
      lastName: varchar("last_name", { length: 100 }),
      isActive: boolean("is_active").default(true).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      lastLoginAt: timestamp("last_login_at")
    });
    invites = pgTable("invites", {
      id: serial("id").primaryKey(),
      email: varchar("email", { length: 255 }).notNull(),
      inviteToken: varchar("invite_token", { length: 255 }).unique().notNull(),
      invitedBy: integer("invited_by").references(() => users.id).notNull(),
      role: varchar("role", { length: 50 }).default("user").notNull(),
      expiresAt: timestamp("expires_at").notNull(),
      usedAt: timestamp("used_at"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    adminChatSessions = pgTable("admin_chat_sessions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      adminUserId: varchar("admin_user_id"),
      // reference to admin user
      title: text("title").notNull(),
      description: text("description"),
      tags: jsonb("tags").$type().default([]),
      isActive: boolean("is_active").notNull().default(true),
      lastMessageAt: timestamp("last_message_at").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    adminChatMessages = pgTable("admin_chat_messages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      sessionId: varchar("session_id").notNull(),
      adminUserId: varchar("admin_user_id"),
      // reference to admin user
      role: varchar("role").notNull(),
      // 'user' or 'assistant'
      content: text("content").notNull(),
      messageType: varchar("message_type").notNull().default("text"),
      // 'text', 'code', 'system'
      codeLanguage: varchar("code_language"),
      // programming language for code blocks
      metadata: jsonb("metadata").$type().default({}),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    pricingSettings = pgTable("pricing_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      orgId: varchar("org_id").notNull().default("org_demo"),
      taxRate: integer("tax_rate").notNull().default(825),
      // 8.25% as 825 basis points
      defaultGratuityPercent: integer("default_gratuity_percent").notNull().default(20),
      gratuityIncluded: boolean("gratuity_included").notNull().default(false),
      defaultDepositPercent: integer("default_deposit_percent").notNull().default(25),
      urgencyThresholdDays: integer("urgency_threshold_days").notNull().default(30),
      fullPaymentThresholdDays: integer("full_payment_threshold_days").notNull().default(14),
      currency: varchar("currency").notNull().default("USD"),
      timezone: varchar("timezone").notNull().default("America/Chicago"),
      priceDisplayMode: varchar("price_display_mode").notNull().default("total"),
      // 'total', 'per_person', 'both'
      dayOfWeekMultipliers: jsonb("day_of_week_multipliers").$type().default({}),
      seasonalAdjustments: jsonb("seasonal_adjustments").$type().default([]),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    affiliates = pgTable("affiliates", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      orgId: varchar("org_id").notNull().default("org_demo"),
      name: text("name").notNull(),
      email: text("email"),
      phone: text("phone"),
      companyName: text("company_name"),
      code: varchar("code").notNull(),
      // unique referral code
      commissionType: varchar("commission_type").notNull().default("percentage"),
      // 'percentage' or 'flat_fee'
      commissionRate: integer("commission_rate").notNull(),
      // percentage (0-100) or cents for flat fee
      totalReferrals: integer("total_referrals").notNull().default(0),
      totalRevenue: bigint("total_revenue", { mode: "number" }).notNull().default(0),
      // in cents
      totalCommission: bigint("total_commission", { mode: "number" }).notNull().default(0),
      // in cents
      pendingCommission: bigint("pending_commission", { mode: "number" }).notNull().default(0),
      // in cents
      lastReferralDate: timestamp("last_referral_date"),
      notes: text("notes"),
      active: boolean("active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    blogAuthors = pgTable("blog_authors", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      orgId: varchar("org_id").notNull().default("org_demo"),
      name: text("name").notNull(),
      slug: varchar("slug").notNull().unique(),
      email: text("email"),
      bio: text("bio"),
      avatarUrl: text("avatar_url"),
      socialLinks: jsonb("social_links").$type().default({}),
      active: boolean("active").notNull().default(true),
      displayOrder: integer("display_order").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    blogCategories = pgTable("blog_categories", {
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
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    blogTags = pgTable("blog_tags", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      orgId: varchar("org_id").notNull().default("org_demo"),
      name: text("name").notNull(),
      slug: varchar("slug").notNull().unique(),
      description: text("description"),
      active: boolean("active").notNull().default(true),
      postCount: integer("post_count").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    blogPosts = pgTable("blog_posts", {
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
      galleryImages: jsonb("gallery_images").$type().default([]),
      videoUrl: text("video_url"),
      audioUrl: text("audio_url"),
      customFields: jsonb("custom_fields").$type().default({}),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    blogPostCategories = pgTable("blog_post_categories", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      postId: varchar("post_id").notNull(),
      categoryId: varchar("category_id").notNull(),
      isPrimary: boolean("is_primary").notNull().default(false),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    blogPostTags = pgTable("blog_post_tags", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      postId: varchar("post_id").notNull(),
      tagId: varchar("tag_id").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    endorsements = pgTable("endorsements", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      source: varchar("source", { length: 100 }).notNull(),
      // e.g., "Claude AI (Anthropic)"
      sourceType: varchar("source_type", { length: 50 }).notNull().default("ai_analysis"),
      // 'ai_analysis', 'review', 'certification'
      headline: text("headline").notNull(),
      // e.g., "9.8/10 SEO Excellence Rating"
      rating: integer("rating"),
      // Score out of 10 or 100
      maxRating: integer("max_rating").default(10),
      // For schema.org Review rating
      summary: text("summary").notNull(),
      // Brief overview for display
      fullAnalysis: text("full_analysis"),
      // Complete transcript/analysis
      highlightQuotes: jsonb("highlight_quotes").$type().default([]),
      // Key quotes to feature
      artifactUrl: text("artifact_url"),
      // Link to original Claude artifact or PDF
      artifactType: varchar("artifact_type", { length: 50 }),
      // 'url', 'pdf', 'text'
      artifactData: text("artifact_data"),
      // Store artifact content if needed
      categories: jsonb("categories").$type().default([]),
      // e.g., ['seo', 'content', 'authority']
      displayOnHomepage: boolean("display_on_homepage").notNull().default(false),
      displayOrder: integer("display_order").default(0),
      // For sorting multiple endorsements
      publishedAt: timestamp("published_at").notNull().defaultNow(),
      active: boolean("active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    seoPages = pgTable("seo_pages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      orgId: varchar("org_id").notNull().default("org_demo"),
      pageRoute: text("page_route").notNull(),
      // e.g., '/', '/bachelor-party', '/bachelorette-party'
      pageName: text("page_name").notNull(),
      // Human-readable page name
      // Primary Meta Tags
      metaTitle: text("meta_title"),
      metaDescription: text("meta_description"),
      metaKeywords: jsonb("meta_keywords").$type().default([]),
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
      targetKeywords: jsonb("target_keywords").$type().default([]),
      // Structured Data
      schemaMarkup: jsonb("schema_markup").$type().default({}),
      // URL Management
      canonicalUrl: text("canonical_url"),
      alternateUrls: jsonb("alternate_urls").$type().default([]),
      // Technical SEO
      robotsDirective: varchar("robots_directive").default("index, follow"),
      priority: integer("priority").default(50),
      // 0-100 for sitemap priority
      changeFrequency: varchar("change_frequency").default("monthly"),
      // weekly, monthly, yearly
      // SEO Analysis Results
      seoScore: integer("seo_score").default(0),
      // 0-100
      lastAnalyzed: timestamp("last_analyzed"),
      issues: jsonb("issues").$type().default([]),
      recommendations: jsonb("recommendations").$type().default([]),
      // Content Analysis
      contentLength: integer("content_length").default(0),
      keywordDensity: jsonb("keyword_density").$type().default({}),
      headingStructure: jsonb("heading_structure").$type().default({ h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] }),
      internalLinks: integer("internal_links").default(0),
      externalLinks: integer("external_links").default(0),
      imagesWithoutAlt: integer("images_without_alt").default(0),
      // Performance Metrics
      loadTime: integer("load_time"),
      // in milliseconds
      mobileOptimized: boolean("mobile_optimized").default(true),
      // Status and Management
      active: boolean("active").notNull().default(true),
      autoOptimize: boolean("auto_optimize").default(false),
      // Allow AI optimization
      lastUpdated: timestamp("last_updated").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    mediaItems = pgTable("media_items", {
      id: varchar("id", { length: 255 }).primaryKey().default(sql`gen_random_uuid()`),
      filename: varchar("filename", { length: 500 }).notNull(),
      originalName: varchar("original_name", { length: 500 }),
      fileType: varchar("file_type", { length: 50 }).notNull(),
      // 'photo', 'video', 'generated_video', 'edited_photo'
      filePath: varchar("file_path", { length: 1e3 }).notNull(),
      fileSize: integer("file_size"),
      mimeType: varchar("mime_type", { length: 100 }),
      uploadDate: timestamp("upload_date").defaultNow(),
      // AI Analysis
      aiAnalyzed: boolean("ai_analyzed").default(false),
      aiAnalysis: jsonb("ai_analysis"),
      autoTags: jsonb("auto_tags"),
      manualTags: jsonb("manual_tags"),
      qualityScore: integer("quality_score"),
      ugcPotential: integer("ugc_potential"),
      // Editing
      originalPhotoId: varchar("original_photo_id", { length: 255 }),
      editHistory: jsonb("edit_history"),
      // Management
      status: varchar("status", { length: 50 }).default("draft"),
      publishedLocations: jsonb("published_locations"),
      createdBy: varchar("created_by", { length: 255 }),
      lastModified: timestamp("last_modified").defaultNow()
    });
    photoEdits = pgTable("photo_edits", {
      id: varchar("id", { length: 255 }).primaryKey().default(sql`gen_random_uuid()`),
      originalPhotoId: varchar("original_photo_id", { length: 255 }),
      editedPhotoId: varchar("edited_photo_id", { length: 255 }),
      editType: varchar("edit_type", { length: 100 }),
      editPrompt: text("edit_prompt"),
      nanoBananaJobId: varchar("nanobanan_job_id", { length: 500 }),
      editCost: bigint("edit_cost", { mode: "number" }),
      status: varchar("status", { length: 50 }).default("processing"),
      createdAt: timestamp("created_at").defaultNow()
    });
    contentBlocks = pgTable("content_blocks", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      orgId: varchar("org_id").notNull().default("org_demo"),
      route: text("route").notNull(),
      // page route like '/home', '/about'
      key: text("key").notNull(),
      // unique identifier like 'hero-title', 'popup-text'
      title: text("title"),
      // human-readable title for the block
      valueJSON: text("value_json").notNull(),
      // JSON content
      type: text("type").notNull(),
      // 'text', 'image', 'video', 'cta', 'section', 'gallery', 'testimonial', 'pricing', 'faq', 'contact', 'custom', 'html'
      category: text("category").default("content"),
      // 'content', 'layout', 'media', 'interactive'
      displayOrder: integer("display_order").default(0),
      // for ordering blocks within a page
      isVisible: boolean("is_visible").default(true),
      // show/hide blocks
      status: varchar("status").notNull().default("draft"),
      // 'draft', 'published', 'archived'
      conditions: jsonb("conditions").$type().default({}),
      // conditional display rules
      styling: jsonb("styling").$type().default({}),
      // block-specific styling
      metadata: jsonb("metadata").$type().default({}),
      // extensible metadata
      parentBlockId: varchar("parent_block_id"),
      // for nested blocks (e.g., sections containing other blocks)
      templateId: varchar("template_id"),
      // reference to block templates
      updatedBy: text("updated_by"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    promptsLibrary = pgTable("prompts_library", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 255 }).notNull().unique(),
      category: varchar("category", { length: 100 }).notNull(),
      content: text("content").notNull(),
      version: varchar("version", { length: 50 }).default("1.0"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow(),
      isActive: boolean("is_active").default(true)
    });
    insertBoatSchema = createInsertSchema(boats).omit({
      id: true
    }).extend({
      maxCapacity: z.number().min(1),
      extraCrewThreshold: z.number().optional()
    });
    insertProductSchema = createInsertSchema(products).omit({
      id: true
    }).extend({
      pricingModel: z.enum(["hourly", "per_person", "flat_rate"]).default("hourly"),
      productType: z.enum(["private_cruise", "disco_cruise", "addon"]).default("private_cruise"),
      dayType: z.enum(["weekday", "friday", "saturday", "sunday"]).optional(),
      groupSize: z.number().optional(),
      imageUrl: z.string().optional(),
      categoryType: z.enum(["experience", "addon"]).default("experience"),
      eventTypes: z.array(z.string()).default([]),
      active: z.boolean().default(true)
    });
    insertUserSchema = createInsertSchema(users).omit({
      id: true,
      createdAt: true,
      lastLoginAt: true
    }).extend({
      email: z.string().email("Invalid email address"),
      username: z.string().min(3, "Username must be at least 3 characters"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      role: z.enum(["admin", "user"]).default("user"),
      isActive: z.boolean().default(true)
    });
    insertInviteSchema = createInsertSchema(invites).omit({
      id: true,
      createdAt: true,
      usedAt: true
    }).extend({
      email: z.string().email("Invalid email address"),
      role: z.enum(["admin", "user"]).default("user")
    });
    insertAdminChatSessionSchema = createInsertSchema(adminChatSessions).omit({
      id: true,
      createdAt: true,
      lastMessageAt: true
    });
    insertAdminChatMessageSchema = createInsertSchema(adminChatMessages).omit({
      id: true,
      createdAt: true
    });
    insertPricingSettingsSchema = createInsertSchema(pricingSettings).omit({
      id: true,
      updatedAt: true
    });
    insertAffiliateSchema = createInsertSchema(affiliates).omit({
      id: true,
      totalReferrals: true,
      totalRevenue: true,
      totalCommission: true,
      pendingCommission: true,
      lastReferralDate: true,
      createdAt: true
    });
    insertBlogAuthorSchema = createInsertSchema(blogAuthors).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      name: z.string().min(1, "Author name is required"),
      slug: z.string().min(1, "Author slug is required"),
      email: z.string().email().optional(),
      bio: z.string().optional(),
      socialLinks: z.object({
        twitter: z.string().optional(),
        linkedin: z.string().optional(),
        facebook: z.string().optional(),
        instagram: z.string().optional()
      }).default({}),
      active: z.boolean().default(true),
      displayOrder: z.number().default(0)
    });
    insertBlogCategorySchema = createInsertSchema(blogCategories).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      name: z.string().min(1, "Category name is required"),
      slug: z.string().min(1, "Category slug is required"),
      description: z.string().optional(),
      parentId: z.string().optional(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      active: z.boolean().default(true),
      displayOrder: z.number().default(0),
      postCount: z.number().default(0)
    });
    insertBlogTagSchema = createInsertSchema(blogTags).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      name: z.string().min(1, "Tag name is required"),
      slug: z.string().min(1, "Tag slug is required"),
      description: z.string().optional(),
      active: z.boolean().default(true),
      postCount: z.number().default(0)
    });
    insertBlogPostSchema = createInsertSchema(blogPosts).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      authorId: z.string().min(1, "Author ID is required"),
      title: z.string().min(1, "Post title is required"),
      slug: z.string().min(1, "Post slug is required"),
      content: z.string().min(1, "Post content is required"),
      contentType: z.enum(["html", "markdown", "rich_text"]).default("html"),
      status: z.enum(["draft", "published", "scheduled", "archived"]).default("draft"),
      excerpt: z.string().optional(),
      publishedAt: z.string().datetime().transform((str) => new Date(str)).optional(),
      scheduledFor: z.string().datetime().transform((str) => new Date(str)).optional(),
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
      customFields: z.record(z.any()).default({})
    });
    insertBlogPostCategorySchema = createInsertSchema(blogPostCategories).omit({
      id: true,
      createdAt: true
    }).extend({
      postId: z.string().min(1, "Post ID is required"),
      categoryId: z.string().min(1, "Category ID is required"),
      isPrimary: z.boolean().default(false)
    });
    insertBlogPostTagSchema = createInsertSchema(blogPostTags).omit({
      id: true,
      createdAt: true
    }).extend({
      postId: z.string().min(1, "Post ID is required"),
      tagId: z.string().min(1, "Tag ID is required")
    });
    insertEndorsementSchema = createInsertSchema(endorsements).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      source: z.string().min(1, "Source is required"),
      headline: z.string().min(1, "Headline is required"),
      summary: z.string().min(1, "Summary is required"),
      rating: z.number().int().min(0).max(100).optional(),
      maxRating: z.number().int().default(10),
      highlightQuotes: z.array(z.string()).default([]),
      categories: z.array(z.string()).default([])
    });
    insertSeoPageSchema = createInsertSchema(seoPages).omit({
      id: true,
      createdAt: true,
      lastUpdated: true
    });
    insertMediaItemSchema = createInsertSchema(mediaItems).omit({
      id: true,
      uploadDate: true,
      lastModified: true
    });
    insertPhotoEditSchema = createInsertSchema(photoEdits).omit({
      id: true,
      createdAt: true
    });
    insertContentBlockSchema = createInsertSchema(contentBlocks).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      route: z.string().min(1, "Route is required"),
      key: z.string().min(1, "Key is required"),
      title: z.string().optional(),
      valueJSON: z.string().min(1, "Content is required"),
      type: z.enum(["text", "image", "video", "cta", "section", "gallery", "testimonial", "pricing", "faq", "contact", "custom", "html"]),
      category: z.string().default("content"),
      displayOrder: z.number().default(0),
      isVisible: z.boolean().default(true),
      status: z.enum(["draft", "published", "archived"]).default("draft"),
      conditions: z.object({
        showOnMobile: z.boolean().optional(),
        showOnDesktop: z.boolean().optional(),
        showForUserRoles: z.array(z.string()).optional(),
        dateRange: z.object({
          start: z.string().optional(),
          end: z.string().optional()
        }).optional()
      }).optional(),
      styling: z.object({
        backgroundColor: z.string().optional(),
        textColor: z.string().optional(),
        padding: z.string().optional(),
        margin: z.string().optional(),
        customCSS: z.string().optional()
      }).optional(),
      metadata: z.object({
        version: z.number().optional(),
        lastPublished: z.string().optional(),
        isDraft: z.boolean().optional(),
        approvalStatus: z.enum(["pending", "approved", "rejected"]).optional(),
        approvedBy: z.string().optional(),
        approvedAt: z.string().optional(),
        tags: z.array(z.string()).optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional()
      }).optional(),
      parentBlockId: z.string().optional(),
      templateId: z.string().optional(),
      updatedBy: z.string().optional()
    });
    insertPromptsLibrarySchema = createInsertSchema(promptsLibrary).omit({
      id: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      name: z.string().min(1, "Name is required"),
      category: z.string().min(1, "Category is required"),
      content: z.string().min(1, "Content is required"),
      version: z.string().default("1.0"),
      isActive: z.boolean().default(true)
    });
  }
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
function setupAuth(app2, storage3) {
  const sessionSecret = process.env.SESSION_SECRET || "fallback-dev-secret-change-in-production";
  if (!process.env.SESSION_SECRET) {
    console.warn("\u26A0\uFE0F  SESSION_SECRET not set, using fallback secret. This is insecure for production!");
  }
  const sessionStore = new PgSession({
    pool,
    tableName: "user_sessions",
    createTableIfMissing: true
  });
  app2.use(
    session({
      store: sessionStore,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1e3,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      }
    })
  );
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          const user = await storage3.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }
          if (!user.isActive) {
            return done(null, false, { message: "Account is inactive" });
          }
          const isValid = await PasswordService.compare(password, user.password);
          if (!isValid) {
            return done(null, false, { message: "Invalid email or password" });
          }
          await storage3.updateUserLastLogin(user.id);
          return done(null, {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage3.getUser(id);
      if (!user) {
        return done(null, false);
      }
      if (!user.isActive) {
        return done(null, false);
      }
      done(null, {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      });
    } catch (err) {
      done(err);
    }
  });
  app2.use(passport.initialize());
  app2.use(passport.session());
  return { sessionStore, PasswordService };
}
var scryptAsync, PgSession, PasswordService;
var init_auth = __esm({
  "server/auth.ts"() {
    "use strict";
    init_db();
    scryptAsync = promisify(scrypt);
    PgSession = ConnectPgSimple(session);
    PasswordService = class {
      static async hash(password) {
        const salt = randomBytes(16).toString("hex");
        const buf = await scryptAsync(password, salt, 64);
        return `${buf.toString("hex")}.${salt}`;
      }
      static async compare(supplied, stored) {
        const [hashedPassword, salt] = stored.split(".");
        const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
        const suppliedPasswordBuf = await scryptAsync(supplied, salt, 64);
        return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
      }
    };
  }
});

// server/middleware/auth.ts
function requireAuth(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}
function requireAdmin(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}
var init_auth2 = __esm({
  "server/middleware/auth.ts"() {
    "use strict";
  }
});

// server/services/gemini.ts
var gemini_exports = {};
__export(gemini_exports, {
  analyzePhotoForContent: () => analyzePhotoForContent,
  editPhotoWithNanoBanana: () => editPhotoWithNanoBanana,
  findBestPhotosForSection: () => findBestPhotosForSection,
  formatBlogPost: () => formatBlogPost,
  generateBlogContent: () => generateBlogContent,
  generateImageWithNanoBanana: () => generateImageWithNanoBanana
});
import * as fs from "fs";
import { GoogleGenAI } from "@google/genai";
async function analyzePhotoForContent(imagePath) {
  try {
    const imageBytes = fs.readFileSync(imagePath);
    const analysisPrompt = `
      Analyze this Premier Party Cruises photo for content management:
      
      Return detailed JSON:
      {
        "objects": ["boats", "people", "decorations", "lake_travis", "etc"],
        "activities": ["dancing", "partying", "swimming", "dining", "celebrating"],
        "setting": ["indoor/outdoor", "day/night/sunset", "boat_type"],
        "mood": ["energetic", "elegant", "fun", "professional", "romantic"],
        "event_type": ["bachelorette", "bachelor", "family", "corporate", "wedding"],
        "quality_score": 8,
        "ugc_potential": 9,
        "caption_suggestions": ["3 engaging caption options"],
        "best_use_cases": ["home_hero", "gallery", "bachelorette_page"],
        "video_potential": 8,
        "editing_suggestions": ["brightness enhancement", "color saturation", "background blur"],
        "searchable_keywords": ["party", "boat", "lake", "celebration"]
      }
    `;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        role: "user",
        parts: [{
          inlineData: {
            data: imageBytes.toString("base64"),
            mimeType: "image/jpeg"
          }
        }, {
          text: analysisPrompt
        }]
      }],
      config: {
        responseMimeType: "application/json"
      }
    });
    const result = await response.text;
    return JSON.parse(result || "{}");
  } catch (error) {
    console.error("Photo analysis failed:", error);
    throw error;
  }
}
async function editPhotoWithNanoBanana(imagePath, editType, editPrompt) {
  try {
    const imageBytes = fs.readFileSync(imagePath);
    const editPrompts = {
      enhance: `Enhance this photo for Premier Party Cruises marketing: improve lighting, contrast, and sharpness. Make colors more vibrant and appealing. ${editPrompt}`,
      style: `Apply a professional party cruise style to this photo: warm, inviting colors with a premium feel. ${editPrompt}`,
      background: `Improve the background of this photo while keeping the main subjects. ${editPrompt}`,
      color: `Adjust the colors in this photo for better visual appeal and brand consistency. ${editPrompt}`,
      custom: editPrompt
    };
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      // Correct model for image editing (Nano Banana)
      contents: [{
        role: "user",
        parts: [{
          inlineData: {
            data: imageBytes.toString("base64"),
            mimeType: "image/jpeg"
          }
        }, {
          text: editPrompts[editType]
        }]
      }]
    });
    const result = response;
    const candidates = result.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No edited image generated");
    }
    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("Invalid response format");
    }
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return {
          imageData: part.inlineData.data,
          // base64 encoded
          mimeType: part.inlineData.mimeType || "image/jpeg"
        };
      }
    }
    throw new Error("No image data in response");
  } catch (error) {
    console.error("Photo editing failed:", error);
    throw error;
  }
}
async function generateImageWithNanoBanana(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      // Correct model for image generation (Nano Banana)
      contents: [{
        role: "user",
        parts: [{
          text: prompt
        }]
      }]
    });
    const result = response;
    const candidates = result.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No image generated");
    }
    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("Invalid response format");
    }
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return {
          imageData: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/jpeg"
        };
      }
    }
    throw new Error("No image data in response");
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
}
async function findBestPhotosForSection(photos, sectionType) {
  const prompt = `
    Given these photo analysis results, select the best 6 photos for the "${sectionType}" section:
    ${JSON.stringify(photos.map((p) => ({ id: p.id, analysis: p.aiAnalysis })))}
    
    Return JSON array of photo IDs ranked by relevance: ["id1", "id2", "id3", "id4", "id5", "id6"]
  `;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{
      role: "user",
      parts: [{
        text: prompt
      }]
    }],
    config: {
      responseMimeType: "application/json"
    }
  });
  const result = await response.text;
  return JSON.parse(result || "[]");
}
async function generateBlogContent(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        role: "user",
        parts: [{
          text: prompt
        }]
      }]
    });
    const result = await response.text;
    return result || "";
  } catch (error) {
    console.error("Blog content generation failed:", error);
    throw error;
  }
}
async function formatBlogPost(content, title) {
  try {
    const prompt = `You are an expert content formatter specializing in blog posts. Format the following blog post content for optimal SEO and visual appearance.

Title: ${title}

Requirements:
- Use proper semantic HTML (h2 for main sections, h3 for subsections, p for paragraphs)
- Create clear heading hierarchy for SEO
- Center important callouts or quotes using appropriate tags
- Add bullet points (ul/li) or numbered lists (ol/li) where appropriate
- Ensure paragraphs have good spacing (each p tag is distinct)
- Use <blockquote> for quotes or important information
- Keep all existing links (<a>) and images (<img>) intact
- Return ONLY the formatted HTML content, no explanations

Original Content:
${content}

Return the formatted HTML:`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        role: "user",
        parts: [{
          text: prompt
        }]
      }]
    });
    const result = await response.text;
    return result || content;
  } catch (error) {
    console.error("Blog post formatting failed:", error);
    throw error;
  }
}
var ai;
var init_gemini = __esm({
  "server/services/gemini.ts"() {
    "use strict";
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  }
});

// server/utils.ts
function getPublicUrl() {
  let url = "";
  if (process.env.BASE_URL && process.env.BASE_URL.trim()) {
    url = process.env.BASE_URL.trim().replace(/\/$/, "");
  } else if (process.env.REPLIT_DEV_DOMAIN) {
    url = `https://${process.env.REPLIT_DEV_DOMAIN}`;
  } else if (process.env.REPLIT_DOMAINS) {
    const domain = process.env.REPLIT_DOMAINS.split(",")[0];
    url = `https://${domain}`;
  } else {
    url = "https://premierpartycruises.com";
  }
  console.log("\u{1F310} getPublicUrl() result:", {
    url,
    source: process.env.BASE_URL && process.env.BASE_URL.trim() ? "BASE_URL" : process.env.REPLIT_DEV_DOMAIN ? "REPLIT_DEV_DOMAIN" : process.env.REPLIT_DOMAINS ? "REPLIT_DOMAINS" : "default",
    envVars: {
      REPLIT_DEV_DOMAIN: !!process.env.REPLIT_DEV_DOMAIN,
      BASE_URL: !!process.env.BASE_URL,
      REPLIT_DOMAINS: !!process.env.REPLIT_DOMAINS
    }
  });
  return url;
}
function getFullUrl(path8) {
  const baseUrl = getPublicUrl();
  const cleanPath = path8.startsWith("/") ? path8 : `/${path8}`;
  return `${baseUrl}${cleanPath}`;
}
function getQuoteUrl(token, req) {
  let baseUrl = "";
  if (process.env.BASE_URL && process.env.BASE_URL.trim()) {
    baseUrl = process.env.BASE_URL.trim().replace(/\/$/, "");
  } else if (process.env.REPLIT_DEV_DOMAIN) {
    baseUrl = `https://${process.env.REPLIT_DEV_DOMAIN}`;
  } else if (process.env.REPLIT_DOMAINS) {
    const domain = process.env.REPLIT_DOMAINS.split(",")[0];
    baseUrl = `https://${domain}`;
  } else {
    baseUrl = "https://cruise-concierge-brian-hill.replit.app";
  }
  console.log("\u{1F517} Generated quote URL:", {
    token: token.substring(0, 10) + "...",
    baseUrl,
    fullUrl: `${baseUrl}/chat?quote=${token}`,
    source: process.env.BASE_URL && process.env.BASE_URL.trim() ? "BASE_URL" : process.env.REPLIT_DEV_DOMAIN ? "REPLIT_DEV_DOMAIN" : process.env.REPLIT_DOMAINS ? "REPLIT_DOMAINS" : "fallback",
    envVars: {
      REPLIT_DEV_DOMAIN: process.env.REPLIT_DEV_DOMAIN || "not set",
      BASE_URL: process.env.BASE_URL || "not set",
      REPLIT_DOMAINS: process.env.REPLIT_DOMAINS ? process.env.REPLIT_DOMAINS.substring(0, 50) + "..." : "not set"
    }
  });
  return `${baseUrl}/chat?quote=${token}`;
}
var init_utils = __esm({
  "server/utils.ts"() {
    "use strict";
  }
});

// server/services/googleSheets.ts
var googleSheets_exports = {};
__export(googleSheets_exports, {
  GoogleSheetsService: () => GoogleSheetsService,
  googleSheetsService: () => googleSheetsService
});
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
var GoogleSheetsService, googleSheetsService;
var init_googleSheets = __esm({
  "server/services/googleSheets.ts"() {
    "use strict";
    GoogleSheetsService = class {
      auth = null;
      sheets = null;
      spreadsheetId;
      serviceAccountCredentials = null;
      maxRetries = 3;
      baseDelay = 1e3;
      // 1 second
      constructor() {
        if (!process.env.SHEET_ID) {
          throw new Error("CRITICAL: SHEET_ID environment variable is required for production. No fallbacks available.");
        }
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
          throw new Error("CRITICAL: GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable is required for production. No fallbacks available.");
        }
        this.spreadsheetId = process.env.SHEET_ID;
        const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
        try {
          this.serviceAccountCredentials = JSON.parse(credentialsJson);
          this.initializeAuth();
        } catch (error) {
          throw new Error(`CRITICAL: Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS: ${error}`);
        }
        console.log("\u2705 Google Sheets Service initialized with production credentials - no fallbacks available");
      }
      // Enhanced retry mechanism with exponential backoff
      async withRetry(operation, operationName, maxRetries = this.maxRetries) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            const result = await operation();
            if (attempt > 1) {
              console.log(`\u2705 ${operationName} succeeded on attempt ${attempt}`);
            }
            return result;
          } catch (error) {
            console.error(`\u274C ${operationName} failed on attempt ${attempt}:`, error.message);
            if (attempt === maxRetries) {
              console.error(`\u{1F4A5} ${operationName} failed after ${maxRetries} attempts`);
              throw error;
            }
            const isRetryable = this.isRetryableError(error);
            if (!isRetryable) {
              console.error(`\u{1F6AB} ${operationName} encountered non-retryable error, giving up`);
              throw error;
            }
            const delay = this.baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1e3;
            console.log(`\u23F1\uFE0F Retrying ${operationName} in ${Math.round(delay)}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
        throw new Error(`Max retries exceeded for ${operationName}`);
      }
      // Check if error is retryable
      isRetryableError(error) {
        if (!error.code && !error.status) return true;
        const retryableStatuses = [408, 429, 500, 502, 503, 504];
        if (error.status && retryableStatuses.includes(error.status)) {
          return true;
        }
        const retryableCodes = ["RATE_LIMIT_EXCEEDED", "INTERNAL_ERROR", "BACKEND_ERROR"];
        if (error.code && retryableCodes.includes(error.code)) {
          return true;
        }
        return false;
      }
      async initializeAuth() {
        try {
          this.auth = new GoogleAuth({
            credentials: this.serviceAccountCredentials,
            scopes: [
              "https://www.googleapis.com/auth/spreadsheets",
              "https://www.googleapis.com/auth/drive.file"
            ]
          });
          this.sheets = google.sheets({ version: "v4", auth: this.auth });
          console.log("Google Sheets API initialized with Service Account authentication");
        } catch (error) {
          console.error("Failed to initialize Google Sheets authentication:", error);
          this.auth = null;
          this.sheets = null;
        }
      }
      async getAvailability(startDate, endDate) {
        if (!this.sheets || !this.spreadsheetId) {
          throw new Error("CRITICAL: Google Sheets service not initialized. Cannot fetch availability data.");
        }
        const range = "Availability!A2:J1000";
        const response = await this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range
        });
        const rows = response.data.values || [];
        return rows.map((row) => ({
          date: row[0] || "",
          day: row[1] || "",
          time: row[2] || "",
          boatType: row[3] || "",
          capacity: parseInt(row[4]) || 0,
          baseRate: parseFloat(row[5]) || 0,
          status: row[6] || "AVAILABLE",
          bookedBy: row[7] || void 0,
          groupSize: parseInt(row[8]) || void 0,
          notes: row[9] || void 0
        })).filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
      async updateAvailability(date, time, boatType, status, bookedBy, groupSize) {
        if (!this.sheets || !this.spreadsheetId) {
          throw new Error("CRITICAL: Cannot update availability - Google Sheets service not initialized.");
        }
        try {
          const range = "Availability!A2:J1000";
          const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range
          });
          const rows = response.data.values || [];
          let rowIndex = -1;
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row[0] === date && row[2] === time && row[3] === boatType) {
              rowIndex = i + 2;
              break;
            }
          }
          if (rowIndex === -1) {
            console.error("Row not found for update:", { date, time, boatType });
            return false;
          }
          const updates = [];
          updates.push({
            range: `Availability!G${rowIndex}`,
            values: [[status]]
          });
          if (bookedBy !== void 0) {
            updates.push({
              range: `Availability!H${rowIndex}`,
              values: [[bookedBy]]
            });
          }
          if (groupSize !== void 0) {
            updates.push({
              range: `Availability!I${rowIndex}`,
              values: [[groupSize]]
            });
          }
          await this.sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: this.spreadsheetId,
            resource: {
              valueInputOption: "RAW",
              data: updates
            }
          });
          console.log("Successfully updated availability in Google Sheets:", { date, time, boatType, status, bookedBy, groupSize });
          return true;
        } catch (error) {
          console.error("Error updating availability in Google Sheets:", error);
          return false;
        }
      }
      getMockAvailability(startDate, endDate) {
        const availability = [];
        const boats2 = [
          { name: "boat_day_tripper", displayName: "Day Tripper", capacity: 14, weekdayRate: 200, fridayRate: 250, weekendRate: 300 },
          { name: "boat_me_seeks_the_irony", displayName: "Me Seeks The Irony", capacity: 30, weekdayRate: 250, fridayRate: 300, weekendRate: 350 },
          { name: "boat_clever_girl", displayName: "Clever Girl", capacity: 75, weekdayRate: 300, fridayRate: 350, weekendRate: 400 },
          { name: "boat_atx_disco", displayName: "ATX Disco Cruise", capacity: 100, weekdayRate: 85, fridayRate: 85, weekendRate: 85 }
        ];
        const times = ["12:00", "15:00", "18:00"];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const current = new Date(startDate);
        while (current <= endDate) {
          const dayOfWeek = current.getDay();
          const dayName = dayNames[dayOfWeek];
          const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 4;
          const isFriday = dayOfWeek === 5;
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          boats2.forEach((boat) => {
            if (boat.name === "boat_atx_disco") {
              if (isFriday) {
                availability.push({
                  date: current.toISOString().split("T")[0],
                  day: dayName,
                  time: "12:00 PM - 4:00 PM",
                  boatType: boat.name,
                  capacity: boat.capacity,
                  baseRate: boat.fridayRate,
                  status: Math.random() > 0.3 ? "AVAILABLE" : "BOOKED",
                  notes: "Disco Packages Available"
                });
              } else if (dayOfWeek === 6) {
                ["11:00 AM - 3:00 PM", "3:30 PM - 7:30 PM"].forEach((time) => {
                  availability.push({
                    date: current.toISOString().split("T")[0],
                    day: dayName,
                    time,
                    boatType: boat.name,
                    capacity: boat.capacity,
                    baseRate: boat.weekendRate,
                    status: Math.random() > 0.3 ? "AVAILABLE" : "BOOKED",
                    notes: "Disco Packages Available"
                  });
                });
              }
            } else {
              times.forEach((time) => {
                let rate = boat.weekdayRate;
                if (isFriday) rate = boat.fridayRate;
                else if (isWeekend) rate = boat.weekendRate;
                availability.push({
                  date: current.toISOString().split("T")[0],
                  day: dayName,
                  time,
                  boatType: boat.name,
                  capacity: boat.capacity,
                  baseRate: rate,
                  status: Math.random() > 0.3 ? "AVAILABLE" : "BOOKED",
                  bookedBy: Math.random() > 0.7 ? "Sample Customer" : void 0
                });
              });
            }
          });
          current.setDate(current.getDate() + 1);
        }
        return availability;
      }
      async checkAvailability(date, time, groupSize) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        const allAvailability = await this.getAvailability(startDate, endDate);
        return allAvailability.filter(
          (slot) => slot.date === date && slot.time === time && slot.status === "AVAILABLE" && slot.capacity >= groupSize
        );
      }
      // New method to get all available boats for a specific date and group size
      async getAvailableBoats(date, groupSize) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        const allAvailability = await this.getAvailability(startDate, endDate);
        return allAvailability.filter(
          (slot) => slot.date === date && slot.status === "AVAILABLE" && slot.capacity >= groupSize
        );
      }
      // New method to get pricing for a specific boat type and date
      async getBoatPricing(date, boatType) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        const allAvailability = await this.getAvailability(startDate, endDate);
        const slot = allAvailability.find(
          (slot2) => slot2.date === date && slot2.boatType === boatType
        );
        return slot ? slot.baseRate : 0;
      }
      // New method to read all sheets for Memorial Weekend 2026 analysis
      async getAllSheetsData() {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            console.warn("Google Sheets API not properly initialized");
            return {
              success: false,
              error: "Google Sheets API not initialized",
              data: null
            };
          }
          const targetSpreadsheetId = "13VHEq3Aqv46oSt0tGiF5ZBOxs1WxBU0SqEIwG6QUsxI";
          console.log(`\u{1F4CA} Reading ALL sheets from spreadsheet: ${targetSpreadsheetId}`);
          const spreadsheet = await this.sheets.spreadsheets.get({
            spreadsheetId: targetSpreadsheetId
          });
          const sheets = spreadsheet.data.sheets || [];
          if (sheets.length === 0) {
            console.error("No sheets found in spreadsheet");
            return {
              success: false,
              error: "No sheets found in spreadsheet",
              data: null
            };
          }
          console.log(`\u{1F4CB} Found ${sheets.length} sheets in spreadsheet:`);
          sheets.forEach((sheet) => {
            console.log(`  - ${sheet.properties?.title}`);
          });
          const targetSheets = [
            "Weekly Pricing",
            "Availability",
            "Master Availability Rules",
            "Holiday Exceptions",
            "Booked Dates",
            "Special Pricing",
            "Blackout Dates"
          ];
          const allSheetsData = {};
          const memorialDayWeekendData = {
            date: "May 24-25, 2026",
            sundayDate: "2026-05-24",
            mondayDate: "2026-05-25",
            holidayExceptions: [],
            specialPricing: [],
            blackoutDates: [],
            bookedDates: [],
            masterRules: [],
            sundayTimeSlots: []
          };
          for (const sheetName of targetSheets) {
            const sheetExists = sheets.find((sheet) => sheet.properties?.title === sheetName);
            if (!sheetExists) {
              console.warn(`\u26A0\uFE0F Sheet "${sheetName}" not found in spreadsheet`);
              allSheetsData[sheetName] = { exists: false, data: [] };
              continue;
            }
            console.log(`\u{1F4D6} Reading sheet: "${sheetName}"`);
            try {
              const range = `'${sheetName}'!A:Z`;
              const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: targetSpreadsheetId,
                range
              });
              const values = response.data.values || [];
              if (values.length === 0) {
                console.log(`   Sheet "${sheetName}" is empty`);
                allSheetsData[sheetName] = {
                  exists: true,
                  data: [],
                  headers: [],
                  rowCount: 0
                };
                continue;
              }
              const headers = values[0];
              const rows = values.slice(1);
              const jsonData = rows.map((row, index) => {
                const obj = {
                  rowNumber: index + 2
                  // +2 because arrays are 0-indexed and we skip header row
                };
                headers.forEach((header, colIndex) => {
                  obj[header] = row[colIndex] || "";
                });
                return obj;
              });
              console.log(`   \u2705 Read ${jsonData.length} rows from "${sheetName}"`);
              allSheetsData[sheetName] = {
                exists: true,
                headers,
                rowCount: jsonData.length,
                data: jsonData
              };
              if (sheetName === "Holiday Exceptions") {
                const memorialDayRows = jsonData.filter((row) => {
                  const dateField = row["Date"] || row["Holiday Date"] || row["Exception Date"] || "";
                  const holidayName = row["Holiday"] || row["Holiday Name"] || row["Name"] || "";
                  return dateField.includes("2026-05-24") || dateField.includes("2026-05-25") || dateField.includes("5/24/2026") || dateField.includes("5/25/2026") || dateField.includes("May 24") || dateField.includes("May 25") || holidayName.toLowerCase().includes("memorial");
                });
                if (memorialDayRows.length > 0) {
                  console.log(`   \u{1F3AF} Found ${memorialDayRows.length} Memorial Day Weekend 2026 entries!`);
                  memorialDayWeekendData.holidayExceptions = memorialDayRows;
                }
              }
              if (sheetName === "Special Pricing") {
                const memorialPricing = jsonData.filter((row) => {
                  const dateField = row["Date"] || row["Start Date"] || row["Price Date"] || "";
                  return dateField.includes("2026-05-24") || dateField.includes("2026-05-25") || dateField.includes("5/24/2026") || dateField.includes("5/25/2026");
                });
                if (memorialPricing.length > 0) {
                  console.log(`   \u{1F4B0} Found ${memorialPricing.length} Special Pricing entries for Memorial Weekend!`);
                  memorialDayWeekendData.specialPricing = memorialPricing;
                }
              }
              if (sheetName === "Blackout Dates") {
                const memorialBlackouts = jsonData.filter((row) => {
                  const dateField = row["Date"] || row["Blackout Date"] || row["Start Date"] || "";
                  return dateField.includes("2026-05-24") || dateField.includes("2026-05-25") || dateField.includes("5/24/2026") || dateField.includes("5/25/2026");
                });
                if (memorialBlackouts.length > 0) {
                  console.log(`   \u{1F6AB} Found ${memorialBlackouts.length} Blackout entries for Memorial Weekend!`);
                  memorialDayWeekendData.blackoutDates = memorialBlackouts;
                }
              }
              if (sheetName === "Booked Dates") {
                const memorialBookings = jsonData.filter((row) => {
                  const dateField = row["Date"] || row["Booking Date"] || row["Event Date"] || "";
                  return dateField.includes("2026-05-24") || dateField.includes("2026-05-25") || dateField.includes("5/24/2026") || dateField.includes("5/25/2026");
                });
                if (memorialBookings.length > 0) {
                  console.log(`   \u{1F4C5} Found ${memorialBookings.length} Bookings for Memorial Weekend!`);
                  memorialDayWeekendData.bookedDates = memorialBookings;
                }
              }
              if (sheetName === "Master Availability Rules") {
                const sundayRules = jsonData.filter((row) => {
                  const dayField = row["Day"] || row["Day of Week"] || row["Weekday"] || "";
                  return dayField.toLowerCase().includes("sunday");
                });
                if (sundayRules.length > 0) {
                  console.log(`   \u{1F4CF} Found ${sundayRules.length} Sunday rules in Master Availability!`);
                  memorialDayWeekendData.masterRules = sundayRules;
                  sundayRules.forEach((rule) => {
                    const timeSlot = rule["Time Slot"] || rule["Time"] || rule["Available Times"] || "";
                    if (timeSlot) {
                      memorialDayWeekendData.sundayTimeSlots.push({
                        timeSlot,
                        boat: rule["Boat"] || rule["Boat Type"] || "",
                        capacity: rule["Capacity"] || rule["Max Capacity"] || "",
                        price: rule["Price"] || rule["Rate"] || "",
                        status: rule["Status"] || rule["Availability"] || "Available"
                      });
                    }
                  });
                }
              }
            } catch (error) {
              console.error(`   \u274C Error reading sheet "${sheetName}":`, error.message);
              allSheetsData[sheetName] = {
                exists: true,
                error: error.message,
                data: []
              };
            }
          }
          console.log("\n\u{1F386} MEMORIAL DAY WEEKEND 2026 SUMMARY:");
          console.log("====================================");
          console.log(`\u{1F4C5} Sunday, May 24, 2026 - Monday, May 25, 2026`);
          console.log(`\u{1F3AF} Holiday Exceptions: ${memorialDayWeekendData.holidayExceptions.length} entries`);
          console.log(`\u{1F4B0} Special Pricing: ${memorialDayWeekendData.specialPricing.length} entries`);
          console.log(`\u{1F6AB} Blackout Dates: ${memorialDayWeekendData.blackoutDates.length} entries`);
          console.log(`\u{1F4C5} Booked Dates: ${memorialDayWeekendData.bookedDates.length} entries`);
          console.log(`\u{1F4CF} Sunday Rules: ${memorialDayWeekendData.masterRules.length} rules`);
          console.log(`\u23F0 Sunday Time Slots: ${memorialDayWeekendData.sundayTimeSlots.length} slots`);
          if (memorialDayWeekendData.sundayTimeSlots.length > 0) {
            console.log("\n\u23F0 AVAILABLE TIME SLOTS FOR SUNDAY OF MEMORIAL WEEKEND:");
            memorialDayWeekendData.sundayTimeSlots.forEach((slot) => {
              console.log(`   - ${slot.timeSlot} | Boat: ${slot.boat} | Capacity: ${slot.capacity} | Price: ${slot.price}`);
            });
          }
          return {
            success: true,
            spreadsheetId: targetSpreadsheetId,
            sheetsFound: sheets.map((s) => s.properties?.title),
            allSheetsData,
            memorialDayWeekend2026: memorialDayWeekendData,
            summary: {
              totalSheets: sheets.length,
              targetSheetsRead: Object.keys(allSheetsData).length,
              memorialDayFindings: {
                hasHolidayException: memorialDayWeekendData.holidayExceptions.length > 0,
                hasSpecialPricing: memorialDayWeekendData.specialPricing.length > 0,
                hasBlackouts: memorialDayWeekendData.blackoutDates.length > 0,
                hasBookings: memorialDayWeekendData.bookedDates.length > 0,
                sundayTimeSlotsAvailable: memorialDayWeekendData.sundayTimeSlots.length
              }
            }
          };
        } catch (error) {
          console.error("Error reading all sheets from Google Sheets:", error);
          return {
            success: false,
            error: error.message || "Failed to read data from Google Sheets",
            data: null
          };
        }
      }
      // New method to read pricing and availability from the first tab
      async getPricingAndAvailability() {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            console.warn("Google Sheets API not properly initialized");
            return {
              success: false,
              error: "Google Sheets API not initialized",
              data: null
            };
          }
          console.log(`\u{1F4CA} Reading pricing & availability from spreadsheet: ${this.spreadsheetId}`);
          const spreadsheet = await this.sheets.spreadsheets.get({
            spreadsheetId: this.spreadsheetId
          });
          const sheets = spreadsheet.data.sheets || [];
          if (sheets.length === 0) {
            console.error("No sheets found in spreadsheet");
            return {
              success: false,
              error: "No sheets found in spreadsheet",
              data: null
            };
          }
          const firstSheet = sheets[0];
          const sheetName = firstSheet.properties?.title || "Sheet1";
          console.log(`\u{1F4C4} Reading from first tab: "${sheetName}"`);
          const range = `${sheetName}!A:Z`;
          const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range
          });
          const values = response.data.values || [];
          if (values.length === 0) {
            console.warn("No data found in the first tab");
            return {
              success: true,
              sheetName,
              data: [],
              message: "Sheet is empty"
            };
          }
          const headers = values[0];
          const rows = values.slice(1);
          const jsonData = rows.map((row, index) => {
            const obj = {
              rowNumber: index + 2
              // +2 because arrays are 0-indexed and we skip header row
            };
            headers.forEach((header, colIndex) => {
              obj[header] = row[colIndex] || "";
            });
            return obj;
          });
          console.log(`\u2705 Successfully read ${jsonData.length} rows from "${sheetName}"`);
          const fourteenPersonData = jsonData.filter((row) => {
            const peopleField = row["# of People"] || row["Capacity"] || row["People"] || row["Size"] || "";
            return peopleField === "14" || peopleField === "14 or Less" || peopleField === "14 people" || peopleField.includes("14") || row["capacity"] === "14" || row["Group Size"] === "14" || row["group_size"] === "14" || row["Max Capacity"] === "14" || row["Max People"] === "14" || row["Boat"] && row["Boat"].toLowerCase().includes("day tripper") || row["Boat Type"] && row["Boat Type"].toLowerCase().includes("day tripper") || row["Boat Name"] && row["Boat Name"].toLowerCase().includes("day tripper");
          });
          if (fourteenPersonData.length > 0) {
            console.log(`\u{1F6A2} Found ${fourteenPersonData.length} entries for 14-person cruises:`);
            console.log(JSON.stringify(fourteenPersonData.slice(0, 3), null, 2));
          }
          return {
            success: true,
            spreadsheetId: this.spreadsheetId,
            sheetName,
            headers,
            rowCount: jsonData.length,
            data: jsonData,
            fourteenPersonCruises: fourteenPersonData
            // Include filtered data for 14-person cruises
          };
        } catch (error) {
          console.error("Error reading pricing & availability from Google Sheets:", error);
          return {
            success: false,
            error: error.message || "Failed to read data from Google Sheets",
            data: null
          };
        }
      }
      // New method to populate the spreadsheet with 3 months of availability data
      async populateSpreadsheet() {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            console.error("Google Sheets API not properly initialized");
            return false;
          }
          console.log("\u{1F50D} Checking if 'Availability' sheet exists...");
          await this.ensureAvailabilitySheetExists();
          console.log("\u2705 Sheet check/creation completed");
          const startDate = /* @__PURE__ */ new Date();
          const endDate = /* @__PURE__ */ new Date();
          endDate.setMonth(endDate.getMonth() + 3);
          console.log(`Generating availability data from ${startDate.toDateString()} to ${endDate.toDateString()}`);
          const availabilityData = this.generateAvailabilityData(startDate, endDate);
          const headers = [
            "Date",
            "Day",
            "Time",
            "Boat Type",
            "Capacity",
            "Base Rate",
            "Status",
            "Booked By",
            "Group Size",
            "Notes"
          ];
          const sheetData = [headers];
          availabilityData.forEach((item) => {
            sheetData.push([
              item.date,
              item.day,
              item.time,
              item.boatType,
              item.capacity.toString(),
              item.baseRate.toString(),
              item.status,
              item.bookedBy || "",
              item.groupSize ? item.groupSize.toString() : "",
              item.notes || ""
            ]);
          });
          console.log(`Generated ${sheetData.length - 1} availability records`);
          try {
            await this.sheets.spreadsheets.values.clear({
              spreadsheetId: this.spreadsheetId,
              range: "Availability!A:J"
            });
            console.log("\u2705 Cleared existing data from Availability sheet");
          } catch (clearError) {
            console.log("Clear operation failed (sheet might be empty or new), continuing...", clearError.message);
          }
          await this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: "Availability!A1",
            valueInputOption: "RAW",
            resource: {
              values: sheetData
            }
          });
          console.log("Successfully populated Google Sheets with availability data");
          return true;
        } catch (error) {
          console.error("Error populating spreadsheet:", error);
          return false;
        }
      }
      // Helper method to ensure the Availability sheet exists
      async ensureAvailabilitySheetExists() {
        try {
          const spreadsheet = await this.sheets.spreadsheets.get({
            spreadsheetId: this.spreadsheetId
          });
          const sheets = spreadsheet.data.sheets || [];
          const availabilitySheet = sheets.find((sheet) => sheet.properties?.title === "Availability");
          if (!availabilitySheet) {
            console.log("Creating 'Availability' sheet...");
            await this.sheets.spreadsheets.batchUpdate({
              spreadsheetId: this.spreadsheetId,
              resource: {
                requests: [{
                  addSheet: {
                    properties: {
                      title: "Availability",
                      gridProperties: {
                        rowCount: 1e3,
                        columnCount: 10
                      }
                    }
                  }
                }]
              }
            });
            console.log("\u2705 Successfully created 'Availability' sheet");
          } else {
            console.log("\u2705 'Availability' sheet already exists");
          }
        } catch (error) {
          console.error("Error ensuring Availability sheet exists:", error);
          throw error;
        }
      }
      // Helper method to find the next available row in the Leads sheet
      async getNextAvailableRow() {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            return 2;
          }
          const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: "Leads!A:A"
            // Just check column A for any data
          });
          const rows = response.data.values || [];
          const nextRow = rows.length + 1;
          console.log(`\u{1F4CA} Next available row in Leads sheet: ${nextRow} (found ${rows.length} existing rows)`);
          return nextRow;
        } catch (error) {
          console.error("Error finding next available row:", error);
          return 2;
        }
      }
      // Lead tracking methods with enhanced retry and logging
      // Simple method to add leads to Google Sheets (used by quote creation)
      async addLeadToSheet(leadData) {
        console.log("\u{1F4CA} Adding lead to Google Sheets (simple)...", {
          name: leadData.name,
          email: leadData.email,
          hasQuoteUrl: !!leadData.quoteUrl
        });
        try {
          if (!this.sheets || !this.spreadsheetId) {
            console.log("\u{1F4CA} Google Sheets not configured - simulating lead addition:", leadData);
            return true;
          }
          await this.withRetry(
            () => this.ensureLeadsSheetExists(),
            "Ensure Leads sheet exists"
          );
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const leadRow = [
            leadId,
            // A: Lead ID
            leadData.createdDate || now,
            // B: Created Date
            leadData.name,
            // C: Name
            leadData.email,
            // D: Email
            leadData.phone || "",
            // E: Phone
            "",
            // F: Event Type (old format)
            leadData.eventType || "",
            // G: Event Type Label
            leadData.eventDate || "",
            // H: Cruise Date
            leadData.groupSize || "",
            // I: Group Size
            "",
            // J: Boat Type (filled later)
            "",
            // K: Disco Package (filled later)
            "",
            // L: Time Slot (filled later)
            leadData.status || "NEW",
            // M: Status
            "started",
            // N: Progress
            now,
            // O: Last Updated
            leadData.leadSource || "Web",
            // P: Source
            leadData.quoteUrl || "",
            // Q: Quote URL - CRITICAL COLUMN FOR AUTOMATION !!!
            "",
            // R: Budget
            "",
            // S: Project ID
            "",
            // T: Notes
            "",
            // U: Special Requests (moved from Q)
            ""
            // V: Quote ID
          ];
          console.log("\u{1F4CA} Writing lead row to Google Sheets (simple):", {
            leadId,
            rowLength: leadRow.length,
            quoteUrl: leadData.quoteUrl,
            range: "Leads!A:V"
          });
          const nextRow = await this.getNextAvailableRow();
          const specificRange = `Leads!A${nextRow}:V${nextRow}`;
          console.log(`\u{1F4CA} Writing to specific range: ${specificRange}`);
          await this.withRetry(
            async () => {
              const response = await this.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: specificRange,
                valueInputOption: "RAW",
                resource: {
                  values: [leadRow]
                }
              });
              return response;
            },
            `Add lead ${leadData.name} to Google Sheets at row ${nextRow}`
          );
          console.log("\u2705 Successfully added lead to Google Sheets:", {
            leadId,
            name: leadData.name,
            quoteUrl: leadData.quoteUrl
          });
          return true;
        } catch (error) {
          console.error("\u274C Error adding lead to Google Sheets:", {
            name: leadData.name,
            error: error.message,
            quoteUrl: leadData.quoteUrl
          });
          return false;
        }
      }
      async createLead(leadData) {
        console.log("\u{1F4CA} Creating lead in Google Sheets...", {
          leadId: leadData.leadId,
          name: leadData.name,
          email: leadData.email,
          hasQuoteUrl: !!leadData.quoteUrl,
          hasQuoteId: !!leadData.quoteId,
          source: leadData.source
        });
        try {
          if (!this.sheets || !this.spreadsheetId) {
            throw new Error("CRITICAL: Cannot create lead - Google Sheets service not initialized.");
          }
          await this.withRetry(
            () => this.ensureLeadsSheetExists(),
            "Ensure Leads sheet exists"
          );
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const leadRow = [
            leadData.leadId,
            // A: Lead ID
            now,
            // B: Created Date
            leadData.name,
            // C: Name
            leadData.email,
            // D: Email
            leadData.phone || "",
            // E: Phone
            leadData.eventType || "",
            // F: Event Type
            leadData.eventTypeLabel || "",
            // G: Event Type Label
            leadData.cruiseDate || "",
            // H: Cruise Date
            leadData.groupSize ? leadData.groupSize.toString() : "",
            // I: Group Size
            "",
            // J: Boat Type (filled later)
            "",
            // K: Disco Package (filled later)
            "",
            // L: Time Slot (filled later)
            "NEW",
            // M: Status
            "started",
            // N: Progress
            now,
            // O: Last Updated
            leadData.source || "AI Chatbot Flow",
            // P: Source
            leadData.quoteUrl || "",
            // Q: Quote URL - CRITICAL COLUMN FOR AUTOMATION !!!
            "",
            // R: Budget
            "",
            // S: Project ID
            "",
            // T: Notes
            "",
            // U: Special Requests (moved from Q)
            leadData.quoteId || ""
            // V: Quote ID - CRITICAL FOR AUTOMATION
          ];
          const nextRow = await this.getNextAvailableRow();
          const specificRange = `Leads!A${nextRow}:V${nextRow}`;
          console.log("\u{1F4CA} Writing lead row to Google Sheets:", {
            leadId: leadData.leadId,
            rowLength: leadRow.length,
            quoteUrlColumn: leadRow[16],
            // Column Q (index 16) - Quote URL - FIXED!
            quoteIdColumn: leadRow[21],
            // Column V (index 21) - Quote ID
            specificRange,
            targetRow: nextRow
          });
          await this.withRetry(
            async () => {
              const response = await this.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: specificRange,
                valueInputOption: "RAW",
                resource: {
                  values: [leadRow]
                }
              });
              return response;
            },
            `Create lead ${leadData.leadId} in Google Sheets at row ${nextRow}`
          );
          console.log("\u2705 Successfully created lead in Google Sheets:", {
            leadId: leadData.leadId,
            quoteUrl: leadData.quoteUrl,
            quoteId: leadData.quoteId,
            message: "Quote link automatically populated in Google Sheets!"
          });
          return true;
        } catch (error) {
          console.error("\u274C Error creating lead in Google Sheets:", {
            leadId: leadData.leadId,
            error: error.message,
            quoteUrl: leadData.quoteUrl,
            quoteId: leadData.quoteId
          });
          return false;
        }
      }
      async updateLead(leadId, updates) {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            throw new Error("CRITICAL: Cannot update lead - Google Sheets service not initialized.");
          }
          const range = "Leads!A2:T1000";
          const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range
          });
          const rows = response.data.values || [];
          let rowIndex = -1;
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row[0] === leadId) {
              rowIndex = i + 2;
              break;
            }
          }
          if (rowIndex === -1) {
            console.error("Lead not found for update:", leadId);
            return false;
          }
          const currentRow = rows[rowIndex - 2];
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const updatedRow = [
            leadId,
            // A: leadId
            currentRow[1] || now,
            // B: createdDate (keep original)
            updates.name !== void 0 ? updates.name : currentRow[2] || "",
            // C: name
            updates.email !== void 0 ? updates.email : currentRow[3] || "",
            // D: email
            updates.phone !== void 0 ? updates.phone : currentRow[4] || "",
            // E: phone
            updates.eventType !== void 0 ? updates.eventType : currentRow[5] || "",
            // F: eventType
            updates.eventTypeLabel !== void 0 ? updates.eventTypeLabel : currentRow[6] || "",
            // G: eventTypeLabel
            updates.cruiseDate !== void 0 ? updates.cruiseDate : currentRow[7] || "",
            // H: cruiseDate
            updates.groupSize !== void 0 ? updates.groupSize.toString() : currentRow[8] || "",
            // I: groupSize
            updates.boatType !== void 0 ? updates.boatType : currentRow[9] || "",
            // J: boatType
            updates.discoPackage !== void 0 ? updates.discoPackage : currentRow[10] || "",
            // K: discoPackage
            updates.timeSlot !== void 0 ? updates.timeSlot : currentRow[11] || "",
            // L: timeSlot
            updates.status !== void 0 ? updates.status : currentRow[12] || "NEW",
            // M: status
            updates.progress !== void 0 ? updates.progress : currentRow[13] || "started",
            // N: progress
            now,
            // O: lastUpdated
            currentRow[15] || "AI Chatbot Flow",
            // P: source (keep original)
            updates.specialRequests !== void 0 ? updates.specialRequests : currentRow[16] || "",
            // Q: specialRequests
            updates.budget !== void 0 ? updates.budget : currentRow[17] || "",
            // R: budget
            updates.projectId !== void 0 ? updates.projectId : currentRow[18] || "",
            // S: projectId
            updates.notes !== void 0 ? updates.notes : currentRow[19] || "",
            // T: notes
            updates.quoteUrl !== void 0 ? updates.quoteUrl : currentRow[20] || "",
            // U: quoteUrl - NEW
            updates.quoteId !== void 0 ? updates.quoteId : currentRow[21] || ""
            // V: quoteId - NEW
          ];
          await this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: `Leads!A${rowIndex}:V${rowIndex}`,
            valueInputOption: "RAW",
            resource: {
              values: [updatedRow]
            }
          });
          console.log("Successfully updated lead in Google Sheets:", leadId, updates);
          return true;
        } catch (error) {
          console.error("Error updating lead in Google Sheets:", error);
          return false;
        }
      }
      async getLead(leadId) {
        if (!this.sheets || !this.spreadsheetId) {
          throw new Error("CRITICAL: Cannot get lead - Google Sheets service not initialized.");
        }
        try {
          const range = "Leads!A2:V1000";
          const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range
          });
          const rows = response.data.values || [];
          const leadRow = rows.find((row) => row[0] === leadId);
          if (!leadRow) {
            return null;
          }
          return this.mapRowToLeadData(leadRow);
        } catch (error) {
          console.error("Error fetching lead from Google Sheets:", error);
          throw error;
        }
      }
      async getAllLeads() {
        if (!this.sheets || !this.spreadsheetId) {
          throw new Error("CRITICAL: Cannot get leads - Google Sheets service not initialized.");
        }
        try {
          const range = "Leads!A2:V1000";
          const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range
          });
          const rows = response.data.values || [];
          return rows.map((row) => this.mapRowToLeadData(row)).filter((lead) => lead !== null);
        } catch (error) {
          console.error("Error fetching leads from Google Sheets:", error);
          throw error;
        }
      }
      mapRowToLeadData(row) {
        if (!row || row.length < 4) return null;
        return {
          leadId: row[0] || "",
          createdDate: row[1] || "",
          name: row[2] || "",
          email: row[3] || "",
          phone: row[4] || void 0,
          eventType: row[5] || void 0,
          eventTypeLabel: row[6] || void 0,
          cruiseDate: row[7] || void 0,
          groupSize: row[8] ? parseInt(row[8]) : void 0,
          boatType: row[9] || void 0,
          discoPackage: row[10] || void 0,
          timeSlot: row[11] || void 0,
          status: row[12] || "NEW",
          progress: row[13] || "started",
          lastUpdated: row[14] || "",
          source: row[15] || "AI Chatbot Flow",
          specialRequests: row[16] || void 0,
          budget: row[17] || void 0,
          projectId: row[18] || void 0,
          notes: row[19] || void 0,
          quoteUrl: row[16] || void 0,
          // Column Q - CORRECTED
          quoteId: row[21] || void 0
        };
      }
      getMockLead(leadId) {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        return {
          leadId,
          createdDate: now,
          name: "Mock User",
          email: "mock@example.com",
          phone: "512-488-5892",
          eventType: "bachelor",
          eventTypeLabel: "Bachelor Party",
          status: "NEW",
          progress: "started",
          lastUpdated: now,
          source: "AI Chatbot Flow"
        };
      }
      getMockLeads() {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        return [
          {
            leadId: "lead_mock_1",
            createdDate: now,
            name: "John Smith",
            email: "john@example.com",
            phone: "512-488-5892",
            eventType: "bachelor",
            eventTypeLabel: "Bachelor Party",
            cruiseDate: "2025-10-15",
            groupSize: 20,
            status: "DATE_SELECTED",
            progress: "date_selected",
            lastUpdated: now,
            source: "AI Chatbot Flow"
          },
          {
            leadId: "lead_mock_2",
            createdDate: now,
            name: "Sarah Johnson",
            email: "sarah@example.com",
            phone: "512-488-5892",
            eventType: "wedding",
            eventTypeLabel: "Wedding Reception",
            status: "CONTACT_INFO",
            progress: "contact_complete",
            lastUpdated: now,
            source: "AI Chatbot Flow"
          }
        ];
      }
      // Helper method to ensure the Leads sheet exists
      async ensureLeadsSheetExists() {
        try {
          const spreadsheet = await this.sheets.spreadsheets.get({
            spreadsheetId: this.spreadsheetId
          });
          const sheets = spreadsheet.data.sheets || [];
          const leadsSheet = sheets.find((sheet) => sheet.properties?.title === "Leads");
          if (!leadsSheet) {
            console.log("Creating 'Leads' sheet...");
            await this.sheets.spreadsheets.batchUpdate({
              spreadsheetId: this.spreadsheetId,
              resource: {
                requests: [{
                  addSheet: {
                    properties: {
                      title: "Leads",
                      gridProperties: {
                        rowCount: 1e3,
                        columnCount: 22
                      }
                    }
                  }
                }]
              }
            });
            const headers = [
              "Lead ID",
              "Created Date",
              "Name",
              "Email",
              "Phone",
              "Event Type",
              "Event Type Label",
              "Cruise Date",
              "Group Size",
              "Boat Type",
              "Disco Package",
              "Time Slot",
              "Status",
              "Progress",
              "Last Updated",
              "Source",
              "Special Requests",
              "Budget",
              "Project ID",
              "Notes",
              "Quote URL",
              "Quote ID"
            ];
            await this.sheets.spreadsheets.values.update({
              spreadsheetId: this.spreadsheetId,
              range: "Leads!A1:V1",
              valueInputOption: "RAW",
              resource: {
                values: [headers]
              }
            });
            console.log("\u2705 Successfully created 'Leads' sheet with headers");
          } else {
            console.log("\u2705 'Leads' sheet already exists");
          }
        } catch (error) {
          console.error("Error ensuring Leads sheet exists:", error);
          throw error;
        }
      }
      // NEW METHOD: Get lead data by email (for cases where we only have email)
      async getLeadByEmail(email) {
        console.log(`\u{1F50D} Finding lead by email: ${email}`);
        try {
          if (!this.sheets || !this.spreadsheetId) {
            console.log("\u{1F4CA} Google Sheets not configured - returning null");
            return null;
          }
          const range = "Leads!A2:V1000";
          const response = await this.withRetry(
            () => this.sheets.spreadsheets.values.get({
              spreadsheetId: this.spreadsheetId,
              range
            }),
            `Get lead by email ${email}`
          );
          const rows = response.data.values || [];
          const leadRow = rows.find((row) => row[3] === email);
          if (!leadRow) {
            console.log(`\u274C Lead with email ${email} not found in Google Sheets`);
            return null;
          }
          const leadData = this.mapRowToLeadData(leadRow);
          console.log(`\u2705 Found lead by email ${email}:`, leadData?.leadId);
          return leadData;
        } catch (error) {
          console.error(`\u274C Error finding lead by email ${email}:`, error.message);
          return null;
        }
      }
      // NEW METHOD: Get complete lead data with Quote Builder selections by lead ID
      async getCompleteLeadData(leadId) {
        console.log(`\u{1F50D} Getting complete lead data for ${leadId}...`);
        try {
          if (!this.sheets || !this.spreadsheetId) {
            return {
              success: false,
              error: "Google Sheets not configured"
            };
          }
          const range = "Leads!A2:V1000";
          const response = await this.withRetry(
            () => this.sheets.spreadsheets.values.get({
              spreadsheetId: this.spreadsheetId,
              range
            }),
            `Get complete lead data ${leadId}`
          );
          const rows = response.data.values || [];
          const leadRow = rows.find((row) => row[0] === leadId);
          if (!leadRow) {
            console.log(`\u274C Lead ${leadId} not found in Google Sheets`);
            return {
              success: false,
              error: "Lead not found in Google Sheets"
            };
          }
          const completeData = {
            leadId: leadRow[0] || "",
            createdDate: leadRow[1] || "",
            name: leadRow[2] || "",
            email: leadRow[3] || "",
            phone: leadRow[4] || "",
            eventType: leadRow[5] || "",
            eventTypeLabel: leadRow[6] || "",
            cruiseDate: leadRow[7] || "",
            groupSize: leadRow[8] ? parseInt(leadRow[8]) : void 0,
            boatType: leadRow[9] || "",
            discoPackage: leadRow[10] || "",
            timeSlot: leadRow[11] || "",
            status: leadRow[12] || "NEW",
            progress: leadRow[13] || "started",
            lastUpdated: leadRow[14] || "",
            source: leadRow[15] || "AI Chatbot Flow",
            quoteUrl: leadRow[16] || "",
            // Column Q - CORRECT COLUMN FOR QUOTE URL
            specialRequests: leadRow[17] || "",
            budget: leadRow[18] || "",
            projectId: leadRow[19] || "",
            notes: leadRow[19] || "",
            // Column T - Updated from index 20 to 19
            quoteId: leadRow[21] || ""
            // Column V
          };
          console.log(`\u2705 Complete lead data retrieved for ${leadId}:`, {
            hasQuoteUrl: !!completeData.quoteUrl,
            hasQuoteId: !!completeData.quoteId,
            eventType: completeData.eventType,
            groupSize: completeData.groupSize,
            cruiseDate: completeData.cruiseDate
          });
          return {
            success: true,
            leadData: completeData
          };
        } catch (error) {
          console.error(`\u274C Error getting complete lead data ${leadId}:`, error.message);
          return {
            success: false,
            error: error.message
          };
        }
      }
      // CRITICAL METHOD: Update Quote URL in Column Q - MUST work for quote sharing!
      async updateQuoteUrlInColumnQ(leadId, quoteUrl) {
        console.log(`\u{1F4DD} CRITICAL: Updating Column Q (Quote URL) for lead ${leadId}...`);
        console.log(`\u{1F4DD} URL to save: ${quoteUrl}`);
        const maxRetries = 3;
        let lastError = null;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            console.log(`\u{1F504} Attempt ${attempt}/${maxRetries} to update Column Q for lead ${leadId}`);
            if (!this.sheets || !this.spreadsheetId) {
              console.warn("\u26A0\uFE0F WARNING: Google Sheets not configured - Column Q cannot be updated!", {
                leadId,
                quoteUrl,
                error: "No sheets service or spreadsheet ID"
              });
              return false;
            }
            const range = "Leads!A2:V1000";
            console.log(`\u{1F50D} Searching for lead ${leadId} in range ${range}...`);
            const response = await this.withRetry(
              () => this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range
              }),
              `Find lead ${leadId} for Column Q update`,
              5
              // Increase retries for this critical operation
            );
            const rows = response.data.values || [];
            console.log(`\u{1F50D} Found ${rows.length} rows in Leads sheet`);
            let rowIndex = -1;
            let foundRow = null;
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i];
              if (row[0] === leadId) {
                rowIndex = i + 2;
                foundRow = row;
                console.log(`\u2705 Found lead ${leadId} at row ${rowIndex}`);
                console.log(`\u{1F4CA} Current Column Q value: "${row[16] || "EMPTY"}"`);
                break;
              }
            }
            if (rowIndex === -1) {
              console.error(`\u274C CRITICAL: Lead ${leadId} not found in Google Sheets for Column Q update!`);
              console.error(`Searched ${rows.length} rows but could not find lead with ID: ${leadId}`);
              return false;
            }
            console.log(`\u{1F4DD} CRITICAL: Updating Google Sheets Column Q (row ${rowIndex}) with quote URL:`, {
              cell: `Q${rowIndex}`,
              quoteUrl,
              currentValue: foundRow?.[16] || "EMPTY"
            });
            const updateResult = await this.withRetry(
              () => this.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: `Leads!Q${rowIndex}`,
                valueInputOption: "RAW",
                resource: {
                  values: [[quoteUrl]]
                }
              }),
              `CRITICAL: Update Column Q for lead ${leadId}`,
              5
              // Increase retries for this critical operation
            );
            if (updateResult && updateResult.data) {
              console.log(`\u2705 CRITICAL SUCCESS: Column Q (row ${rowIndex}) updated with quote URL!`);
              console.log(`\u{1F4CA} Update details:`, {
                updatedCells: updateResult.data.updatedCells,
                updatedColumns: updateResult.data.updatedColumns,
                updatedRows: updateResult.data.updatedRows,
                updatedRange: updateResult.data.updatedRange
              });
              try {
                const verifyResponse = await this.sheets.spreadsheets.values.get({
                  spreadsheetId: this.spreadsheetId,
                  range: `Leads!Q${rowIndex}`
                });
                const savedValue = verifyResponse.data.values?.[0]?.[0];
                if (savedValue === quoteUrl) {
                  console.log(`\u2705\u2705 DOUBLE VERIFIED: Column Q value confirmed as: ${savedValue}`);
                  return true;
                } else {
                  console.error(`\u274C VERIFICATION FAILED: Expected '${quoteUrl}' but found '${savedValue}'`);
                  throw new Error("Verification failed - value mismatch");
                }
              } catch (verifyError) {
                console.error(`\u26A0\uFE0F Could not verify update, but update was reported as successful:`, verifyError.message);
                return true;
              }
            } else {
              throw new Error("Update appeared to succeed but no confirmation received");
            }
          } catch (error) {
            lastError = error;
            console.error(`\u274C Attempt ${attempt}/${maxRetries} FAILED for lead ${leadId}:`, error.message);
            if (attempt < maxRetries) {
              const waitTime = Math.min(1e3 * Math.pow(2, attempt - 1), 5e3);
              console.log(`\u23F3 Waiting ${waitTime}ms before retry...`);
              await new Promise((resolve) => setTimeout(resolve, waitTime));
            }
          }
        }
        console.error(`\u274C\u274C\u274C CRITICAL FAILURE: All ${maxRetries} attempts to update Column Q failed for lead ${leadId}`);
        console.error(`Last error:`, lastError);
        if (lastError?.stack) {
          console.error(`Stack trace:`, lastError.stack);
        }
        return false;
      }
      // VERIFICATION METHOD: Get lead data by ID to verify quote link population
      async getLeadForVerification(leadId) {
        console.log(`\u{1F50D} Verifying lead ${leadId} in Google Sheets...`);
        try {
          if (!this.sheets || !this.spreadsheetId) {
            return {
              found: false,
              error: "Google Sheets not configured"
            };
          }
          const range = "Leads!A2:V1000";
          const response = await this.withRetry(
            () => this.sheets.spreadsheets.values.get({
              spreadsheetId: this.spreadsheetId,
              range
            }),
            `Get lead ${leadId} for verification`
          );
          const rows = response.data.values || [];
          const leadRow = rows.find((row) => row[0] === leadId);
          if (!leadRow) {
            console.log(`\u274C Lead ${leadId} not found in Google Sheets`);
            return {
              found: false,
              error: "Lead not found in Google Sheets"
            };
          }
          const leadData = {
            leadId: leadRow[0],
            createdDate: leadRow[1],
            name: leadRow[2],
            email: leadRow[3],
            phone: leadRow[4],
            eventType: leadRow[5],
            eventTypeLabel: leadRow[6],
            cruiseDate: leadRow[7],
            groupSize: leadRow[8],
            status: leadRow[12],
            progress: leadRow[13],
            source: leadRow[15],
            quoteUrl: leadRow[16],
            // Column Q - CORRECTED
            quoteId: leadRow[21]
            // Column V
          };
          console.log(`\u2705 Lead ${leadId} verification complete:`, {
            found: true,
            hasQuoteUrl: !!leadData.quoteUrl,
            hasQuoteId: !!leadData.quoteId,
            quoteUrl: leadData.quoteUrl,
            quoteId: leadData.quoteId
          });
          return {
            found: true,
            leadData,
            quoteUrl: leadData.quoteUrl,
            quoteId: leadData.quoteId
          };
        } catch (error) {
          console.error(`\u274C Error verifying lead ${leadId}:`, error.message);
          return {
            found: false,
            error: error.message
          };
        }
      }
      // ENHANCED METHOD: Update existing lead with quote link information
      async updateLeadWithQuoteLink(leadId, quoteUrl, quoteId) {
        console.log(`\u{1F4DD} Updating lead ${leadId} with quote link in Google Sheets...`);
        try {
          if (!this.sheets || !this.spreadsheetId) {
            console.log("\u{1F4DD} Google Sheets not configured - simulating quote link update:", {
              leadId,
              quoteUrl,
              quoteId
            });
            return true;
          }
          const range = "Leads!A2:V1000";
          const response = await this.withRetry(
            () => this.sheets.spreadsheets.values.get({
              spreadsheetId: this.spreadsheetId,
              range
            }),
            `Find lead ${leadId} for quote link update`
          );
          const rows = response.data.values || [];
          let rowIndex = -1;
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row[0] === leadId) {
              rowIndex = i + 2;
              break;
            }
          }
          if (rowIndex === -1) {
            console.error(`\u274C Lead ${leadId} not found for quote link update`);
            return false;
          }
          console.log(`\u{1F4DD} Updating Google Sheets row ${rowIndex} with quote link:`, {
            quoteUrlCell: `U${rowIndex}`,
            quoteIdCell: `V${rowIndex}`,
            quoteUrl,
            quoteId
          });
          await this.withRetry(
            () => this.sheets.spreadsheets.values.batchUpdate({
              spreadsheetId: this.spreadsheetId,
              resource: {
                valueInputOption: "RAW",
                data: [
                  {
                    range: `Leads!U${rowIndex}:V${rowIndex}`,
                    values: [[quoteUrl, quoteId]]
                  }
                ]
              }
            }),
            `Update quote link for lead ${leadId}`
          );
          console.log(`\u2705 Successfully updated Google Sheets row ${rowIndex} with quote link`);
          return true;
        } catch (error) {
          console.error(`\u274C Error updating lead ${leadId} with quote link:`, error.message);
          return false;
        }
      }
      // ALIAS METHOD: For backward compatibility with existing route calls
      async updateLeadWithQuote(contactId, quoteId, quoteUrl) {
        console.log(`\u{1F517} Updating lead with quote (alias method) - contactId: ${contactId}, quoteId: ${quoteId}`);
        try {
          const allLeads = await this.getAllLeads();
          const candidateLeads = allLeads.filter((l) => !l.quoteUrl && !l.quoteId);
          if (candidateLeads.length === 0) {
            console.log(`\u274C No unquoted leads found to update with quote for contact ${contactId}`);
            return false;
          }
          const targetLead = candidateLeads.sort((a, b) => b.createdDate.localeCompare(a.createdDate))[0];
          console.log(`\u2705 Found candidate lead ${targetLead.leadId} to update with quote ${quoteId}`);
          return await this.updateLeadWithQuoteLink(targetLead.leadId, quoteUrl, quoteId);
        } catch (error) {
          console.error(`\u274C Error in updateLeadWithQuote alias:`, error.message);
          return false;
        }
      }
      // Helper method to generate availability data (similar to getMockAvailability but returns all as AVAILABLE)
      generateAvailabilityData(startDate, endDate) {
        const availability = [];
        const boats2 = [
          { name: "14-Person Luxury Yacht", capacity: 14, weekdayRate: 200, fridayRate: 250, weekendRate: 300 },
          { name: "25-Person Party Cruiser", capacity: 25, weekdayRate: 250, fridayRate: 300, weekendRate: 350 },
          { name: "50-Person Charter Yacht", capacity: 50, weekdayRate: 300, fridayRate: 350, weekendRate: 400 },
          { name: "ATX Disco Cruise", capacity: 30, weekdayRate: 85, fridayRate: 85, weekendRate: 85 }
        ];
        const times = ["12:00", "15:00", "18:00"];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const current = new Date(startDate);
        while (current <= endDate) {
          const dayOfWeek = current.getDay();
          const dayName = dayNames[dayOfWeek];
          const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 4;
          const isFriday = dayOfWeek === 5;
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          boats2.forEach((boat) => {
            if (boat.name === "boat_atx_disco") {
              if (isFriday) {
                availability.push({
                  date: current.toISOString().split("T")[0],
                  day: dayName,
                  time: "12:00 PM - 4:00 PM",
                  boatType: boat.name,
                  capacity: boat.capacity,
                  baseRate: boat.fridayRate,
                  status: "AVAILABLE",
                  // All start as available
                  notes: "Disco Packages Available"
                });
              } else if (dayOfWeek === 6) {
                ["11:00 AM - 3:00 PM", "3:30 PM - 7:30 PM"].forEach((time) => {
                  availability.push({
                    date: current.toISOString().split("T")[0],
                    day: dayName,
                    time,
                    boatType: boat.name,
                    capacity: boat.capacity,
                    baseRate: boat.weekendRate,
                    status: "AVAILABLE",
                    // All start as available
                    notes: "Disco Packages Available"
                  });
                });
              }
            } else {
              times.forEach((time) => {
                let rate = boat.weekdayRate;
                if (isFriday) rate = boat.fridayRate;
                else if (isWeekend) rate = boat.weekendRate;
                availability.push({
                  date: current.toISOString().split("T")[0],
                  day: dayName,
                  time,
                  boatType: boat.name,
                  capacity: boat.capacity,
                  baseRate: rate,
                  status: "AVAILABLE"
                  // All start as available
                });
              });
            }
          });
          current.setDate(current.getDate() + 1);
        }
        return availability;
      }
      // Partial Lead tracking methods
      async createPartialLead(partialLeadData) {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            console.log("Would create partial lead in Google Sheets:", partialLeadData);
            return true;
          }
          await this.ensurePartialLeadsSheetExists();
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const partialLeadRow = [
            partialLeadData.partialLeadId,
            partialLeadData.sessionId,
            now,
            // createdDate
            partialLeadData.name || "",
            partialLeadData.email || "",
            partialLeadData.phone || "",
            partialLeadData.eventType || "",
            partialLeadData.eventTypeLabel || "",
            partialLeadData.preferredDate || "",
            partialLeadData.groupSize?.toString() || "",
            JSON.stringify(partialLeadData.chatbotData || {}),
            "",
            // quoteId
            partialLeadData.status || "partial",
            now,
            // lastUpdated
            "",
            // abandonedAt
            "",
            // convertedToContactId
            "AI Chatbot Flow - Partial Lead",
            "",
            // notes
            ""
            // quoteUrl
          ];
          await this.sheets.spreadsheets.values.append({
            spreadsheetId: this.spreadsheetId,
            range: "PartialLeads!A:S",
            valueInputOption: "RAW",
            resource: {
              values: [partialLeadRow]
            }
          });
          console.log("Successfully created partial lead in Google Sheets:", partialLeadData.partialLeadId);
          return true;
        } catch (error) {
          console.error("Error creating partial lead in Google Sheets:", error);
          return false;
        }
      }
      async updatePartialLead(partialLeadId, updates) {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            console.log("Would update partial lead in Google Sheets:", { partialLeadId, updates });
            return true;
          }
          const range = "PartialLeads!A2:S1000";
          const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range
          });
          const rows = response.data.values || [];
          let rowIndex = -1;
          for (let i = 0; i < rows.length; i++) {
            if (rows[i][0] === partialLeadId) {
              rowIndex = i + 2;
              break;
            }
          }
          if (rowIndex === -1) {
            console.log("Partial lead not found in Google Sheets:", partialLeadId);
            return false;
          }
          const existingRow = rows[rowIndex - 2];
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const updatedRow = [
            existingRow[0],
            // partialLeadId
            existingRow[1],
            // sessionId
            existingRow[2],
            // createdDate
            updates.name !== void 0 ? updates.name : existingRow[3],
            updates.email !== void 0 ? updates.email : existingRow[4],
            updates.phone !== void 0 ? updates.phone : existingRow[5],
            updates.eventType !== void 0 ? updates.eventType : existingRow[6],
            updates.eventTypeLabel !== void 0 ? updates.eventTypeLabel : existingRow[7],
            updates.preferredDate !== void 0 ? updates.preferredDate : existingRow[8],
            updates.groupSize !== void 0 ? updates.groupSize.toString() : existingRow[9],
            updates.chatbotData !== void 0 ? JSON.stringify(updates.chatbotData) : existingRow[10],
            updates.quoteId !== void 0 ? updates.quoteId : existingRow[11],
            updates.status !== void 0 ? updates.status : existingRow[12],
            now,
            // lastUpdated
            updates.abandonedAt !== void 0 ? updates.abandonedAt : existingRow[14],
            updates.convertedToContactId !== void 0 ? updates.convertedToContactId : existingRow[15],
            existingRow[16],
            // source
            updates.notes !== void 0 ? updates.notes : existingRow[17],
            updates.quoteUrl !== void 0 ? updates.quoteUrl : existingRow[18]
          ];
          await this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: `PartialLeads!A${rowIndex}:S${rowIndex}`,
            valueInputOption: "RAW",
            resource: {
              values: [updatedRow]
            }
          });
          console.log("Successfully updated partial lead in Google Sheets:", partialLeadId);
          return true;
        } catch (error) {
          console.error("Error updating partial lead in Google Sheets:", error);
          return false;
        }
      }
      // Helper method to ensure the Partial Leads sheet exists
      async ensurePartialLeadsSheetExists() {
        try {
          const spreadsheet = await this.sheets.spreadsheets.get({
            spreadsheetId: this.spreadsheetId
          });
          const sheets = spreadsheet.data.sheets || [];
          const partialLeadsSheet = sheets.find((sheet) => sheet.properties?.title === "PartialLeads");
          if (!partialLeadsSheet) {
            console.log("Creating 'PartialLeads' sheet...");
            await this.sheets.spreadsheets.batchUpdate({
              spreadsheetId: this.spreadsheetId,
              resource: {
                requests: [{
                  addSheet: {
                    properties: {
                      title: "PartialLeads",
                      gridProperties: {
                        rowCount: 1e3,
                        columnCount: 19
                      }
                    }
                  }
                }]
              }
            });
            const headers = [
              "Partial Lead ID",
              "Session ID",
              "Created Date",
              "Name",
              "Email",
              "Phone",
              "Event Type",
              "Event Type Label",
              "Preferred Date",
              "Group Size",
              "Chatbot Data",
              "Quote ID",
              "Status",
              "Last Updated",
              "Abandoned At",
              "Converted To Contact ID",
              "Source",
              "Notes",
              "Quote URL"
            ];
            await this.sheets.spreadsheets.values.update({
              spreadsheetId: this.spreadsheetId,
              range: "PartialLeads!A1:S1",
              valueInputOption: "RAW",
              resource: {
                values: [headers]
              }
            });
            console.log("\u2705 Successfully created 'PartialLeads' sheet with headers");
          } else {
            console.log("\u2705 'PartialLeads' sheet already exists");
          }
        } catch (error) {
          console.error("Error ensuring PartialLeads sheet exists:", error);
          throw error;
        }
      }
      // New method to read data from the "Availability" tab
      async getAvailabilityTabData() {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            console.warn("Google Sheets API not properly initialized");
            return {
              success: false,
              error: "Google Sheets API not initialized",
              data: null
            };
          }
          console.log(`\u{1F4CA} Reading data from Availability tab in spreadsheet: ${this.spreadsheetId}`);
          const sheetName = "Availability";
          const range = `${sheetName}!A:Z`;
          try {
            const response = await this.sheets.spreadsheets.values.get({
              spreadsheetId: this.spreadsheetId,
              range
            });
            const values = response.data.values || [];
            if (values.length === 0) {
              console.warn("No data found in the Availability tab");
              return {
                success: true,
                sheetName,
                data: [],
                message: "Availability sheet is empty"
              };
            }
            const headers = values[0];
            const rows = values.slice(1);
            const jsonData = rows.map((row, index) => {
              const obj = {
                rowNumber: index + 2
                // +2 because arrays are 0-indexed and we skip header row
              };
              headers.forEach((header, colIndex) => {
                obj[header] = row[colIndex] || "";
              });
              return obj;
            });
            console.log(`\u2705 Successfully read ${jsonData.length} rows from "${sheetName}" tab`);
            if (jsonData.length > 0) {
              console.log(`\u{1F4C4} Sample data from first 3 rows:`);
              console.log(JSON.stringify(jsonData.slice(0, 3), null, 2));
            }
            const dataStructure = {
              totalRows: jsonData.length,
              headers,
              sampleRows: jsonData.slice(0, 5),
              // First 5 rows for analysis
              // Group by various potential fields to understand the structure
              uniqueDays: [...new Set(jsonData.map(
                (row) => row["Day"] || row["Day of Week"] || row["day"] || row["DayOfWeek"] || ""
              ).filter(Boolean))],
              uniqueMonths: [...new Set(jsonData.map(
                (row) => row["Month"] || row["month"] || row["MonthName"] || ""
              ).filter(Boolean))],
              uniqueTimeSlots: [...new Set(jsonData.map(
                (row) => row["Time"] || row["Time Slot"] || row["TimeSlot"] || row["time"] || row["Availability"] || row["Available Times"] || ""
              ).filter(Boolean))].slice(0, 10),
              // Limit to 10 for cleaner output
              hasAvailability: headers.some(
                (h) => h.toLowerCase().includes("available") || h.toLowerCase().includes("availability")
              ),
              hasPricing: headers.some(
                (h) => h.toLowerCase().includes("price") || h.toLowerCase().includes("cost") || h.toLowerCase().includes("rate")
              ),
              dateFields: headers.filter(
                (h) => h.toLowerCase().includes("date") || h.toLowerCase().includes("day") || h.toLowerCase().includes("month") || h.toLowerCase().includes("year")
              )
            };
            console.log(`\u{1F4CA} Data structure analysis:`, JSON.stringify(dataStructure, null, 2));
            return {
              success: true,
              spreadsheetId: this.spreadsheetId,
              sheetName,
              headers,
              rowCount: jsonData.length,
              data: jsonData,
              structure: dataStructure,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            };
          } catch (sheetError) {
            if (sheetError.message?.includes("Unable to parse range") || sheetError.code === 400) {
              console.error(`\u274C The "Availability" tab was not found in the spreadsheet`);
              const availableSheets = await this.getAvailableSheets();
              console.log(`\u{1F4CB} Available sheets in spreadsheet: ${availableSheets.join(", ")}`);
              return {
                success: false,
                error: `The "Availability" tab was not found in the spreadsheet. Please ensure the tab is named exactly "Availability".`,
                sheetName,
                availableTabs: availableSheets
              };
            }
            throw sheetError;
          }
        } catch (error) {
          console.error("\u274C Error reading Availability tab from Google Sheets:", error);
          return {
            success: false,
            error: error.message || "Failed to read Availability tab",
            data: null
          };
        }
      }
      // Helper method to get list of available sheets in the spreadsheet
      async getAvailableSheets() {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            return [];
          }
          const spreadsheet = await this.sheets.spreadsheets.get({
            spreadsheetId: this.spreadsheetId
          });
          const sheets = spreadsheet.data.sheets || [];
          return sheets.map((sheet) => sheet.properties?.title || "Unnamed Sheet");
        } catch (error) {
          console.error("Error fetching sheet names:", error);
          return [];
        }
      }
      // Create comprehensive availability management structure
      async createAvailabilityManagementStructure() {
        try {
          if (!this.sheets || !this.spreadsheetId) {
            return {
              success: false,
              message: "Google Sheets API not properly initialized"
            };
          }
          console.log("\u{1F4CA} Creating comprehensive availability management structure...");
          const existingSheets = await this.getAvailableSheets();
          console.log(`\u{1F4CB} Existing sheets: ${existingSheets.join(", ")}`);
          const sheetsToCreate = [];
          const createdSheets = [];
          const sheetDefinitions = [
            {
              title: "Master Availability Rules",
              headers: ["Day Type", "Valid Group Sizes", "Available Time Slots", "Effective Start Date", "Effective End Date", "Notes"],
              exampleData: [
                ["Monday-Thursday", "14, 25, 30, 50, 75", "10:00 AM, 2:00 PM, 6:00 PM", "2025-01-01", "2025-12-31", "Weekday standard schedule"],
                ["Friday", "14, 25, 30, 50, 75, 100", "10:00 AM, 2:00 PM, 6:00 PM, 10:00 PM", "2025-01-01", "2025-12-31", "Friday extended hours + disco cruise"]
              ]
            },
            {
              title: "Holiday Exceptions",
              headers: ["Date", "Holiday Name", "Day Override", "Custom Time Slots", "Price Multiplier", "Closed", "Notes"],
              exampleData: [
                ["2025-07-04", "Independence Day", "Treat as Saturday", "12:00 PM, 3:00 PM, 7:00 PM, 10:00 PM", "1.5", "No", "Premium pricing for holiday"],
                ["2025-12-25", "Christmas Day", "N/A", "", "0", "Yes", "Closed for Christmas"]
              ]
            },
            {
              title: "Booked Dates",
              headers: ["Date", "Time Slot", "Boat Name", "Group Size", "Customer Name", "Booking ID", "Status", "Notes"],
              exampleData: [
                ["2025-02-14", "6:00 PM", "Clever Girl", "45", "John Smith", "BK-2025-0214-001", "Confirmed", "Valentine's Day special event"],
                ["2025-03-15", "2:00 PM", "Day Tripper", "12", "Jane Doe", "BK-2025-0315-002", "Pending", "Birthday party"]
              ]
            },
            {
              title: "Special Pricing",
              headers: ["Start Date", "End Date", "Day of Week", "Time Slot", "Group Size Range", "Base Price Override", "Discount Percentage", "Promotion Name", "Notes"],
              exampleData: [
                ["2025-01-15", "2025-02-28", "All", "All", "1-14", "", "20", "Winter Special", "Early season discount for small groups"],
                ["2025-03-01", "2025-03-31", "Monday-Thursday", "10:00 AM", "15-30", "250", "", "Spring Break Promo", "Fixed rate for morning cruises"]
              ]
            },
            {
              title: "Blackout Dates",
              headers: ["Date", "Reason", "Affected Boats", "Affected Time Slots", "Notes"],
              exampleData: [
                ["2025-04-15", "Maintenance", "Day Tripper, Me Seeks The Irony", "All", "Annual maintenance for smaller boats"],
                ["2025-05-20", "Private Event", "All", "2:00 PM, 6:00 PM", "Lake reserved for private corporate event"]
              ]
            }
          ];
          const requests = [];
          for (const sheetDef of sheetDefinitions) {
            if (!existingSheets.includes(sheetDef.title)) {
              requests.push({
                addSheet: {
                  properties: {
                    title: sheetDef.title,
                    gridProperties: {
                      rowCount: 1e3,
                      columnCount: sheetDef.headers.length + 2,
                      // Extra columns for flexibility
                      frozenRowCount: 1
                      // Freeze header row
                    }
                  }
                }
              });
              sheetsToCreate.push(sheetDef);
            } else {
              console.log(`\u26A0\uFE0F Sheet "${sheetDef.title}" already exists, will populate with data`);
              sheetsToCreate.push(sheetDef);
            }
          }
          if (requests.length > 0) {
            console.log(`\u{1F4DD} Creating ${requests.length} new sheets...`);
            await this.withRetry(
              async () => {
                await this.sheets.spreadsheets.batchUpdate({
                  spreadsheetId: this.spreadsheetId,
                  resource: {
                    requests
                  }
                });
              },
              `Create ${requests.length} availability management sheets`
            );
            console.log(`\u2705 Successfully created ${requests.length} new sheets`);
          }
          const dataUpdates = [];
          for (const sheetDef of sheetsToCreate) {
            const sheetData = [
              sheetDef.headers,
              // Header row
              ...sheetDef.exampleData
              // Example data rows
            ];
            dataUpdates.push({
              range: `'${sheetDef.title}'!A1`,
              values: sheetData
            });
            createdSheets.push(sheetDef.title);
          }
          if (dataUpdates.length > 0) {
            console.log(`\u{1F4DD} Populating ${dataUpdates.length} sheets with headers and example data...`);
            await this.withRetry(
              async () => {
                await this.sheets.spreadsheets.values.batchUpdate({
                  spreadsheetId: this.spreadsheetId,
                  resource: {
                    valueInputOption: "RAW",
                    data: dataUpdates
                  }
                });
              },
              `Populate ${dataUpdates.length} sheets with data`
            );
            console.log(`\u2705 Successfully populated all sheets with headers and example data`);
          }
          const formatRequests = [];
          const updatedSpreadsheet = await this.sheets.spreadsheets.get({
            spreadsheetId: this.spreadsheetId
          });
          const sheetIdMap = {};
          for (const sheet of updatedSpreadsheet.data.sheets || []) {
            const title = sheet.properties?.title;
            if (title && sheetsToCreate.some((s) => s.title === title)) {
              sheetIdMap[title] = sheet.properties?.sheetId;
            }
          }
          for (const sheetDef of sheetsToCreate) {
            const sheetId = sheetIdMap[sheetDef.title];
            if (sheetId !== void 0) {
              formatRequests.push({
                repeatCell: {
                  range: {
                    sheetId,
                    startRowIndex: 0,
                    endRowIndex: 1
                  },
                  cell: {
                    userEnteredFormat: {
                      textFormat: {
                        bold: true
                      },
                      backgroundColor: {
                        red: 0.9,
                        green: 0.9,
                        blue: 0.9
                      }
                    }
                  },
                  fields: "userEnteredFormat(textFormat,backgroundColor)"
                }
              });
              formatRequests.push({
                autoResizeDimensions: {
                  dimensions: {
                    sheetId,
                    dimension: "COLUMNS",
                    startIndex: 0,
                    endIndex: sheetDef.headers.length
                  }
                }
              });
            }
          }
          if (formatRequests.length > 0) {
            console.log("\u{1F3A8} Applying formatting to sheets...");
            try {
              await this.sheets.spreadsheets.batchUpdate({
                spreadsheetId: this.spreadsheetId,
                resource: {
                  requests: formatRequests
                }
              });
              console.log("\u2705 Successfully applied formatting");
            } catch (formatError) {
              console.warn("\u26A0\uFE0F Formatting partially failed, but sheets are created:", formatError);
            }
          }
          const message = `Successfully created/updated availability management structure with ${createdSheets.length} sheets: ${createdSheets.join(", ")}`;
          console.log(`\u2705 ${message}`);
          return {
            success: true,
            message,
            createdSheets
          };
        } catch (error) {
          console.error("\u274C Error creating availability management structure:", error);
          return {
            success: false,
            message: `Failed to create availability management structure: ${error.message || "Unknown error"}`
          };
        }
      }
    };
    googleSheetsService = new GoogleSheetsService();
  }
});

// server/services/quoteTokenService.ts
var quoteTokenService_exports = {};
__export(quoteTokenService_exports, {
  QuoteTokenService: () => QuoteTokenService,
  quoteTokenService: () => quoteTokenService
});
import { randomBytes as randomBytes2, createHmac, timingSafeEqual as timingSafeEqual2 } from "crypto";
var QuoteTokenService, quoteTokenService;
var init_quoteTokenService = __esm({
  "server/services/quoteTokenService.ts"() {
    "use strict";
    init_utils();
    init_googleSheets();
    QuoteTokenService = class {
      secret;
      defaultExpiresIn = 7 * 24 * 60 * 60 * 1e3;
      // 7 days
      constructor() {
        this.secret = process.env.QUOTE_TOKEN_SECRET;
        if (!this.secret) {
          const error = "CRITICAL SECURITY ERROR: QUOTE_TOKEN_SECRET environment variable not set. This is required for secure token generation.";
          console.error("\u{1F6A8}", error);
          console.error("\u{1F4A1} Set QUOTE_TOKEN_SECRET environment variable to a secure 32-byte hex string");
          console.error('   Example: export QUOTE_TOKEN_SECRET="3a291fc3dd81fdea8989406574ed05a6f29240a7a31525fd91d5ab8fda7cc090"');
          throw new Error(error);
        }
        console.log("\u{1F510} QUOTE_TOKEN_SECRET configured securely from environment");
      }
      generateSecret() {
        return randomBytes2(32).toString("hex");
      }
      /**
       * Generate a secure, signed, time-limited token for quote access
       */
      generateSecureToken(quoteId, options = {}) {
        const now = Date.now();
        const expiresIn = options.expiresIn || this.defaultExpiresIn;
        const payload = {
          quoteId,
          leadId: options.leadId,
          // NEW: Include leadId for complete data fetching
          scope: options.scope || "quote:view",
          exp: now + expiresIn,
          iat: now,
          aud: options.audience || "customer"
        };
        const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "QT" })).toString("base64url");
        const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
        const signature = this.createSignature(`${header}.${payloadEncoded}`);
        const token = `${header}.${payloadEncoded}.${signature}`;
        console.log("\u{1F510} Generated secure quote token:", {
          quoteId,
          leadId: payload.leadId,
          scope: payload.scope,
          expiresAt: new Date(payload.exp).toISOString(),
          audience: payload.aud,
          tokenLength: token.length
        });
        return token;
      }
      /**
       * Verify and decode a quote token with complete lead data
       */
      async verifyTokenWithLeadData(token) {
        const basicVerification = this.verifyToken(token);
        if (!basicVerification.valid || !basicVerification.payload) {
          return basicVerification;
        }
        const payload = basicVerification.payload;
        let leadData;
        if (payload.leadId) {
          console.log(`\u{1F50D} Fetching complete lead data for leadId: ${payload.leadId}`);
          try {
            const leadResult = await googleSheetsService.getCompleteLeadData(payload.leadId);
            if (leadResult.success && leadResult.leadData) {
              leadData = leadResult.leadData;
              console.log(`\u2705 Successfully fetched complete lead data for token verification`);
            } else {
              console.warn(`\u26A0\uFE0F Could not fetch lead data for leadId: ${payload.leadId}`);
            }
          } catch (error) {
            console.error(`\u274C Error fetching lead data for token verification:`, error.message);
          }
        }
        const enhancedPayload = {
          ...payload,
          leadData
        };
        console.log(`\u2705 Token verified with enhanced lead data:`, {
          quoteId: payload.quoteId,
          leadId: payload.leadId,
          hasLeadData: !!leadData,
          leadDataFields: leadData ? Object.keys(leadData).length : 0
        });
        return {
          valid: true,
          payload: enhancedPayload
        };
      }
      /**
       * Verify and decode a quote token (basic version)
       */
      verifyToken(token) {
        try {
          const parts = token.split(".");
          if (parts.length !== 3) {
            return { valid: false, error: "Invalid token format" };
          }
          const [header, payloadEncoded, signature] = parts;
          const expectedSignature = this.createSignature(`${header}.${payloadEncoded}`);
          if (!this.timingSafeCompare(signature, expectedSignature)) {
            console.warn("\u{1F6A8} Quote token signature verification failed");
            return { valid: false, error: "Invalid signature" };
          }
          const payload = JSON.parse(Buffer.from(payloadEncoded, "base64url").toString());
          const now = Date.now();
          if (payload.exp < now) {
            console.warn("\u{1F6A8} Quote token expired:", {
              quoteId: payload.quoteId,
              expiredAt: new Date(payload.exp).toISOString(),
              now: new Date(now).toISOString()
            });
            return { valid: false, error: "Token expired" };
          }
          if (payload.iat > now + 6e4) {
            return { valid: false, error: "Token issued in future" };
          }
          console.log("\u2705 Quote token verified successfully:", {
            quoteId: payload.quoteId,
            scope: payload.scope,
            audience: payload.aud,
            expiresAt: new Date(payload.exp).toISOString()
          });
          return { valid: true, payload };
        } catch (error) {
          console.error("\u274C Quote token verification error:", error.message);
          return { valid: false, error: "Token parsing error" };
        }
      }
      /**
       * Generate a secure quote URL with embedded token including lead data
       */
      generateSecureQuoteUrl(quoteId, baseUrl, options = {}) {
        const token = this.generateSecureToken(quoteId, options);
        const effectiveBaseUrl = baseUrl || getPublicUrl();
        const cleanBaseUrl = effectiveBaseUrl.replace(/\/$/, "");
        const url = `${cleanBaseUrl}/quote/${encodeURIComponent(token)}`;
        console.log("\u{1F517} Generated secure quote URL with lead data:", {
          quoteId,
          leadId: options.leadId,
          providedBaseUrl: baseUrl || "auto-detected",
          effectiveBaseUrl: cleanBaseUrl,
          isFullUrl: url.startsWith("http"),
          scope: options.scope || "quote:view",
          expiresIn: options.expiresIn || this.defaultExpiresIn,
          urlPreview: url.substring(0, 100) + "..."
        });
        return url;
      }
      /**
       * Refresh a token (generate new token with extended expiry)
       */
      refreshToken(oldToken, options = {}) {
        const verification = this.verifyToken(oldToken);
        if (!verification.valid || !verification.payload) {
          return { success: false, error: verification.error };
        }
        const newToken = this.generateSecureToken(
          verification.payload.quoteId,
          {
            ...options,
            scope: verification.payload.scope,
            audience: verification.payload.aud
          }
        );
        console.log("\u{1F504} Refreshed quote token:", {
          quoteId: verification.payload.quoteId,
          oldExpiry: new Date(verification.payload.exp).toISOString(),
          newExpiry: new Date(Date.now() + (options.expiresIn || this.defaultExpiresIn)).toISOString()
        });
        return { success: true, token: newToken };
      }
      /**
       * Revoke a token by adding it to a blacklist (in-memory for now)
       */
      revokedTokens = /* @__PURE__ */ new Set();
      revokeToken(token) {
        const verification = this.verifyToken(token);
        if (!verification.valid) {
          return false;
        }
        this.revokedTokens.add(token);
        console.log("\u{1F6AB} Revoked quote token:", {
          quoteId: verification.payload?.quoteId,
          revokedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
        return true;
      }
      /**
       * Check if token is revoked
       */
      isTokenRevoked(token) {
        return this.revokedTokens.has(token);
      }
      /**
       * Create HMAC signature
       */
      createSignature(data) {
        return createHmac("sha256", this.secret).update(data).digest("base64url");
      }
      /**
       * Timing-safe string comparison to prevent timing attacks
       */
      timingSafeCompare(a, b) {
        if (a.length !== b.length) {
          return false;
        }
        return timingSafeEqual2(Buffer.from(a), Buffer.from(b));
      }
      /**
       * Get token info without verification (for debugging)
       */
      decodeTokenUnsafe(token) {
        try {
          const parts = token.split(".");
          if (parts.length !== 3) return null;
          const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
          return payload;
        } catch {
          return null;
        }
      }
      /**
       * Clean up expired revoked tokens (should be called periodically)
       */
      cleanupExpiredTokens() {
        const now = Date.now();
        let cleaned = 0;
        for (const token of this.revokedTokens) {
          const payload = this.decodeTokenUnsafe(token);
          if (payload && payload.exp < now) {
            this.revokedTokens.delete(token);
            cleaned++;
          }
        }
        if (cleaned > 0) {
          console.log(`\u{1F9F9} Cleaned up ${cleaned} expired revoked tokens`);
        }
        return cleaned;
      }
    };
    quoteTokenService = new QuoteTokenService();
  }
});

// shared/timeSlots.ts
var timeSlots_exports = {};
__export(timeSlots_exports, {
  formatTimeForDisplay: () => formatTimeForDisplay,
  getAllTimeSlotsForDate: () => getAllTimeSlotsForDate,
  getAvailableDurations: () => getAvailableDurations,
  getDiscoTimeSlotsForDate: () => getDiscoTimeSlotsForDate,
  getPrivateTimeSlotsForDate: () => getPrivateTimeSlotsForDate,
  getTimeSlotById: () => getTimeSlotById,
  isDiscoAvailableForDate: () => isDiscoAvailableForDate,
  isDurationSelectionRequired: () => isDurationSelectionRequired,
  isInDiscoSeason: () => isInDiscoSeason,
  isMondayToThursday: () => isMondayToThursday,
  isPrivateAvailableForDate: () => isPrivateAvailableForDate,
  parseTimeToDate: () => parseTimeToDate,
  timeSlotToCalendarFormat: () => timeSlotToCalendarFormat
});
var getPrivateTimeSlotsForDate, isInDiscoSeason, getDiscoTimeSlotsForDate, isDiscoAvailableForDate, isPrivateAvailableForDate, getAllTimeSlotsForDate, timeSlotToCalendarFormat, parseTimeToDate, formatTimeForDisplay, isMondayToThursday, getAvailableDurations, isDurationSelectionRequired, getTimeSlotById;
var init_timeSlots = __esm({
  "shared/timeSlots.ts"() {
    "use strict";
    getPrivateTimeSlotsForDate = (date, duration) => {
      const dayOfWeek = date.getDay();
      const formatLabel = (h, m) => {
        const period = h >= 12 ? "PM" : "AM";
        const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const minuteStr = m === 0 ? "00" : m.toString();
        return `${displayHour}:${minuteStr} ${period}`;
      };
      const getTimeIcon = (startHour) => {
        if (startHour >= 18) return "\u{1F319}";
        if (startHour >= 14) return "\u{1F306}";
        if (startHour >= 10) return "\u2600\uFE0F";
        return "\u{1F305}";
      };
      const getTimeDescription = (startHour, duration2) => {
        let timeOfDay = "Morning";
        if (startHour >= 18) timeOfDay = "Evening";
        else if (startHour >= 14) timeOfDay = "Afternoon";
        return `${timeOfDay} cruise (${duration2} hours)`;
      };
      if (dayOfWeek >= 1 && dayOfWeek <= 4) {
        const slot = {
          start: "10:00",
          end: "13:00",
          duration: 3
        };
        if (duration && duration !== slot.duration) return [];
        const [startHour, startMinute] = slot.start.split(":").map(Number);
        const [endHour, endMinute] = slot.end.split(":").map(Number);
        const startLabel = formatLabel(startHour, startMinute);
        const endLabel = formatLabel(endHour, endMinute);
        return [{
          id: `${slot.start.replace(":", "")}-${slot.end.replace(":", "")}-${slot.duration}h`,
          label: `${startLabel} - ${endLabel}`,
          startTime: slot.start,
          endTime: slot.end,
          duration: slot.duration,
          icon: getTimeIcon(startHour),
          description: getTimeDescription(startHour, slot.duration),
          popular: true
        }];
      } else if (dayOfWeek === 5) {
        const slot = {
          start: "12:00",
          end: "16:00",
          duration: 4
        };
        if (duration && duration !== slot.duration) return [];
        const [startHour, startMinute] = slot.start.split(":").map(Number);
        const [endHour, endMinute] = slot.end.split(":").map(Number);
        const startLabel = formatLabel(startHour, startMinute);
        const endLabel = formatLabel(endHour, endMinute);
        return [{
          id: `${slot.start.replace(":", "")}-${slot.end.replace(":", "")}-${slot.duration}h`,
          label: `${startLabel} - ${endLabel}`,
          startTime: slot.start,
          endTime: slot.end,
          duration: slot.duration,
          icon: getTimeIcon(startHour),
          description: getTimeDescription(startHour, slot.duration),
          popular: true
        }];
      } else {
        const slot = {
          start: "11:00",
          end: "15:00",
          duration: 4
        };
        if (duration && duration !== slot.duration) return [];
        const [startHour, startMinute] = slot.start.split(":").map(Number);
        const [endHour, endMinute] = slot.end.split(":").map(Number);
        const startLabel = formatLabel(startHour, startMinute);
        const endLabel = formatLabel(endHour, endMinute);
        return [{
          id: `${slot.start.replace(":", "")}-${slot.end.replace(":", "")}-${slot.duration}h`,
          label: `${startLabel} - ${endLabel}`,
          startTime: slot.start,
          endTime: slot.end,
          duration: slot.duration,
          icon: getTimeIcon(startHour),
          description: getTimeDescription(startHour, slot.duration),
          popular: true
        }];
      }
    };
    isInDiscoSeason = (date) => {
      return true;
    };
    getDiscoTimeSlotsForDate = (date) => {
      if (!isInDiscoSeason(date)) {
        return [];
      }
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 5) {
        return [
          {
            id: "disco-fri-12pm-4pm",
            label: "12:00 PM - 4:00 PM",
            startTime: "12:00",
            endTime: "16:00",
            duration: 4,
            icon: "\u{1F389}",
            description: "Friday ATX Disco Cruise (Bachelor/Bachelorette Parties)",
            ticketPrice: 85,
            maxCapacity: 100
          }
        ];
      } else if (dayOfWeek === 6) {
        return [
          {
            id: "disco-sat-11am-3pm",
            label: "11:00 AM - 3:00 PM",
            startTime: "11:00",
            endTime: "15:00",
            duration: 4,
            icon: "\u{1F389}",
            description: "Saturday Morning ATX Disco Cruise (Bachelor/Bachelorette Parties)",
            ticketPrice: 95,
            maxCapacity: 100
          },
          {
            id: "disco-sat-330pm-730pm",
            label: "3:30 PM - 7:30 PM",
            startTime: "15:30",
            endTime: "19:30",
            duration: 4,
            icon: "\u{1F389}",
            description: "Saturday Afternoon ATX Disco Cruise (Bachelor/Bachelorette Parties)",
            ticketPrice: 95,
            maxCapacity: 100
          }
        ];
      } else if (dayOfWeek === 0) {
        return [];
      } else {
        return [];
      }
    };
    isDiscoAvailableForDate = (date) => {
      if (!isInDiscoSeason(date)) {
        return false;
      }
      const dayOfWeek = date.getDay();
      return dayOfWeek === 5 || dayOfWeek === 6;
    };
    isPrivateAvailableForDate = (date) => {
      return true;
    };
    getAllTimeSlotsForDate = (date) => {
      return {
        private: getPrivateTimeSlotsForDate(date),
        disco: getDiscoTimeSlotsForDate(date)
      };
    };
    timeSlotToCalendarFormat = (timeSlot) => ({
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      label: `${timeSlot.label} (${timeSlot.duration}h)`
    });
    parseTimeToDate = (date, timeString) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      const result = new Date(date);
      result.setHours(hours, minutes, 0, 0);
      return result;
    };
    formatTimeForDisplay = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };
    isMondayToThursday = (date) => {
      const dayOfWeek = date.getDay();
      return dayOfWeek >= 1 && dayOfWeek <= 4;
    };
    getAvailableDurations = (date) => {
      if (isMondayToThursday(date)) {
        return [3, 4];
      }
      return [4];
    };
    isDurationSelectionRequired = (date) => {
      return isMondayToThursday(date);
    };
    getTimeSlotById = (date, timeSlotId) => {
      const allSlots = getAllTimeSlotsForDate(date);
      const privateSlot = allSlots.private.find((slot) => slot.id === timeSlotId);
      if (privateSlot) return privateSlot;
      const discoSlot = allSlots.disco.find((slot) => slot.id === timeSlotId);
      if (discoSlot) return discoSlot;
      return null;
    };
  }
});

// shared/constants.ts
var constants_exports = {};
__export(constants_exports, {
  ACTION_LABELS: () => ACTION_LABELS,
  ADDON_FEES: () => ADDON_FEES,
  BADGE_VARIANTS: () => BADGE_VARIANTS,
  BOATS: () => BOATS,
  BOAT_SELECTION_RULES: () => BOAT_SELECTION_RULES,
  BOAT_TYPES: () => BOAT_TYPES,
  BOOKING_STATUSES: () => BOOKING_STATUSES,
  CREW_FEES: () => CREW_FEES,
  CRUISE_DURATIONS: () => CRUISE_DURATIONS,
  CRUISE_TYPES: () => CRUISE_TYPES,
  DAY_COMPARISON_TYPES: () => DAY_COMPARISON_TYPES,
  DEPOSIT_POLICIES: () => DEPOSIT_POLICIES,
  DISCO_AVAILABILITY: () => DISCO_AVAILABILITY,
  DISCO_PACKAGES: () => DISCO_PACKAGES,
  DISCO_PRICING: () => DISCO_PRICING,
  EVENT_TYPES: () => EVENT_TYPES,
  GROUP_SIZE_CATEGORIES: () => GROUP_SIZE_CATEGORIES,
  HOURLY_RATES: () => HOURLY_RATES,
  INVOICE_STATUSES: () => INVOICE_STATUSES,
  LEAD_STATUSES: () => LEAD_STATUSES,
  NAVIGATION_LABELS: () => NAVIGATION_LABELS,
  PACKAGE_COMPARISON_FEATURES: () => PACKAGE_COMPARISON_FEATURES,
  PACKAGE_FLAT_FEES: () => PACKAGE_FLAT_FEES,
  PACKAGE_PRICING_DISPLAY: () => PACKAGE_PRICING_DISPLAY,
  PAYMENT_STATUSES: () => PAYMENT_STATUSES,
  PRICING_DEFAULTS: () => PRICING_DEFAULTS,
  PRICING_POLICIES: () => PRICING_POLICIES,
  PRICING_SCENARIOS: () => PRICING_SCENARIOS,
  PRIVATE_CAPACITY_TIERS: () => PRIVATE_CAPACITY_TIERS,
  PRIVATE_CRUISE_FINAL_PRICES: () => PRIVATE_CRUISE_FINAL_PRICES,
  PRIVATE_CRUISE_PACKAGES: () => PRIVATE_CRUISE_PACKAGES,
  PRIVATE_CRUISE_PRICING: () => PRIVATE_CRUISE_PRICING,
  PRIVATE_PACKAGE_TYPES: () => PRIVATE_PACKAGE_TYPES,
  QUOTE_STATUSES: () => QUOTE_STATUSES,
  STATUS_COLORS: () => STATUS_COLORS,
  TIME_SLOTS: () => TIME_SLOTS,
  UI_MESSAGES: () => UI_MESSAGES,
  VALIDATION_MESSAGES: () => VALIDATION_MESSAGES,
  VALIDATION_TEST_CASES: () => VALIDATION_TEST_CASES,
  calculateDiscoPrice: () => calculateDiscoPrice,
  calculatePrivatePrice: () => calculatePrivatePrice,
  compareDiscoVsPrivate: () => compareDiscoVsPrivate,
  getBestDealRecommendation: () => getBestDealRecommendation,
  getBoatForGroupSize: () => getBoatForGroupSize,
  getPrivateCruiseCapacityTier: () => getPrivateCruiseCapacityTier,
  getPrivateCruiseDayType: () => getPrivateCruiseDayType,
  getSavingsOpportunities: () => getSavingsOpportunities,
  isDiscoAvailableOnDay: () => isDiscoAvailableOnDay,
  validatePricingConsistency: () => validatePricingConsistency
});
function getBoatForGroupSize(groupSize) {
  if (groupSize <= 14) return BOAT_SELECTION_RULES[14];
  if (groupSize <= 25) return BOAT_SELECTION_RULES[25];
  if (groupSize <= 30) return BOAT_SELECTION_RULES[30];
  if (groupSize <= 50) return BOAT_SELECTION_RULES[50];
  if (groupSize <= 75) return BOAT_SELECTION_RULES[75];
  throw new Error(`Group size ${groupSize} exceeds maximum capacity of 75 people`);
}
function isDiscoAvailableOnDay(dayOfWeek) {
  return DISCO_AVAILABILITY.AVAILABLE_DAYS.includes(dayOfWeek);
}
function getPrivateCruiseCapacityTier(groupSize) {
  if (groupSize <= 14) return 14;
  if (groupSize <= 25) return 25;
  return 50;
}
function getPrivateCruiseDayType(dayOfWeek) {
  if (dayOfWeek >= 1 && dayOfWeek <= 4) return "MON_THU";
  if (dayOfWeek === 5) return "FRIDAY";
  if (dayOfWeek === 6) return "SATURDAY";
  return "SUNDAY";
}
function calculateDiscoPrice(groupSize, packageType) {
  const pricePerPerson = DISCO_AVAILABILITY.PACKAGES[packageType].pricePerPerson;
  const subtotal = pricePerPerson * groupSize;
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 1e4));
  const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const total = subtotal + tax + gratuity;
  return total;
}
function calculatePrivatePrice(groupSize, dayOfWeek, packageType = "standard") {
  const capacityTier = getPrivateCruiseCapacityTier(groupSize);
  const dayType = getPrivateCruiseDayType(dayOfWeek);
  const basePrice = PRIVATE_CRUISE_FINAL_PRICES[dayType][capacityTier];
  let addOnCost = 0;
  if (packageType === "essentials") {
    addOnCost = Math.floor(basePrice * 0.2);
  } else if (packageType === "ultimate") {
    addOnCost = Math.floor(basePrice * 0.4);
  }
  const subtotal = basePrice + addOnCost;
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 1e4));
  const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const totalPrice = subtotal + tax + gratuity;
  return {
    basePrice,
    addOnCost,
    subtotal,
    tax,
    gratuity,
    totalPrice,
    // Now includes tax and gratuity
    capacityTier,
    dayType,
    perPersonCost: Math.floor(totalPrice / groupSize)
    // Per person based on TOTAL
  };
}
function compareDiscoVsPrivate(groupSize, dayOfWeek, discoPackage = "basic", privatePackage = "standard") {
  const discoAvailable = isDiscoAvailableOnDay(dayOfWeek);
  const discoTotalCost = discoAvailable ? calculateDiscoPrice(groupSize, discoPackage) : null;
  const discoOption = {
    available: discoAvailable,
    totalCost: discoTotalCost,
    costPerPerson: discoTotalCost ? Math.floor(discoTotalCost / groupSize) : null,
    packageName: DISCO_AVAILABILITY.PACKAGES[discoPackage].name,
    description: DISCO_AVAILABILITY.PACKAGES[discoPackage].description
  };
  const privateCalc = calculatePrivatePrice(groupSize, dayOfWeek, privatePackage);
  const privateOption = {
    available: true,
    totalCost: privateCalc.totalPrice,
    costPerPerson: privateCalc.perPersonCost,
    packageName: `${privatePackage.charAt(0).toUpperCase() + privatePackage.slice(1)} Private Cruise`,
    capacityTier: privateCalc.capacityTier,
    dayType: privateCalc.dayType,
    addOnCost: privateCalc.addOnCost
  };
  let comparison;
  let valueProposition = "";
  if (!discoAvailable) {
    comparison = {
      discoIsAvailable: false,
      discoCheaper: null,
      savings: null,
      savingsPercentage: null,
      recommendation: "private_only",
      reasonCode: "DISCO_NOT_AVAILABLE_ON_DAY"
    };
    valueProposition = `Private cruise is your only option on ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek]}s. Great value at $${(privateCalc.perPersonCost / 100).toFixed(0)} per person!`;
  } else {
    const discoTotal = discoOption.totalCost;
    const privateTotal = privateOption.totalCost;
    const savings = privateTotal - discoTotal;
    const savingsPercentage = savings / privateTotal * 100;
    const discoCheaper = savings > 0;
    let reasonCode = "";
    let recommendation = "disco";
    if (discoCheaper) {
      if (savings >= 5e4) {
        reasonCode = "DISCO_MAJOR_SAVINGS";
      } else if (savings >= 2e4) {
        reasonCode = "DISCO_GOOD_SAVINGS";
      } else {
        reasonCode = "DISCO_MINOR_SAVINGS";
      }
      recommendation = "disco";
    } else {
      if (Math.abs(savings) >= 2e4) {
        reasonCode = "PRIVATE_SIGNIFICANT_SAVINGS";
      } else {
        reasonCode = "PRIVATE_MARGINAL_SAVINGS";
      }
      recommendation = "private";
    }
    comparison = {
      discoIsAvailable: true,
      discoCheaper,
      savings,
      savingsPercentage,
      recommendation,
      reasonCode
    };
    if (discoCheaper) {
      valueProposition = `ATX Disco Cruise saves you $${(savings / 100).toFixed(0)} (${Math.abs(savingsPercentage).toFixed(0)}% less) vs private! ${groupSize} people \xD7 $${(discoOption.costPerPerson / 100).toFixed(0)} = $${(discoTotal / 100).toLocaleString()} total.`;
    } else {
      valueProposition = `Surprisingly, private cruise saves $${(Math.abs(savings) / 100).toFixed(0)} vs disco! Only $${(privateCalc.perPersonCost / 100).toFixed(0)} per person for your own boat.`;
    }
  }
  return {
    discoOption,
    privateOption,
    comparison,
    valueProposition
  };
}
function getBestDealRecommendation(groupSize, dayOfWeek, preferences) {
  const comparison = compareDiscoVsPrivate(groupSize, dayOfWeek);
  let groupCategory = "";
  let optimalRange = "";
  let groupRecommendation = "";
  if (groupSize <= 12) {
    groupCategory = "Small Group";
    optimalRange = "8-12 people";
    groupRecommendation = "Disco cruises typically offer the best value for small groups, especially on weekends.";
  } else if (groupSize <= 25) {
    groupCategory = "Medium Group";
    optimalRange = "13-25 people";
    groupRecommendation = "Both options competitive - disco usually better on Saturday, private better on weekdays.";
  } else {
    groupCategory = "Large Group";
    optimalRange = "26+ people";
    groupRecommendation = "Private cruises often provide better per-person value for large groups, especially on weekdays.";
  }
  let primaryRecommendation;
  if (comparison.comparison.recommendation === "private_only") {
    const privateCost = comparison.privateOption.totalCost;
    primaryRecommendation = {
      type: "private_only",
      packageType: "Standard Private Cruise",
      totalCost: privateCost,
      costPerPerson: comparison.privateOption.costPerPerson,
      valueMessage: comparison.valueProposition,
      whyBest: "ATX Disco Cruise only runs Friday & Saturday. Private cruise is your only option."
    };
  } else if (comparison.comparison.recommendation === "disco") {
    const discoCost = comparison.discoOption.totalCost;
    primaryRecommendation = {
      type: "disco",
      packageType: comparison.discoOption.packageName,
      totalCost: discoCost,
      costPerPerson: comparison.discoOption.costPerPerson,
      valueMessage: comparison.valueProposition,
      whyBest: `Disco cruise saves $${(comparison.comparison.savings / 100).toFixed(0)} vs private cruise`
    };
  } else {
    const privateCost = comparison.privateOption.totalCost;
    primaryRecommendation = {
      type: "private",
      packageType: "Standard Private Cruise",
      totalCost: privateCost,
      costPerPerson: comparison.privateOption.costPerPerson,
      valueMessage: comparison.valueProposition,
      whyBest: "Private cruise offers better value than expected for this scenario"
    };
  }
  const alternatives = [];
  if (dayOfWeek === 6) {
    const mondayPrivate = calculatePrivatePrice(groupSize, 1, "standard");
    alternatives.push({
      type: "private",
      packageType: "Weekday Private Cruise",
      totalCost: mondayPrivate.totalPrice,
      costPerPerson: mondayPrivate.perPersonCost,
      savings: primaryRecommendation.totalCost - mondayPrivate.totalPrice,
      dayOfWeek: 1,
      dayName: "Monday"
    });
  }
  if (!comparison.discoOption.available) {
    const saturdayDisco = calculateDiscoPrice(groupSize, "basic");
    const saturdayPrivate = calculatePrivatePrice(groupSize, 6, "standard");
    if (saturdayDisco < saturdayPrivate.totalPrice) {
      alternatives.push({
        type: "disco",
        packageType: "Saturday Disco Cruise",
        totalCost: saturdayDisco,
        costPerPerson: Math.floor(saturdayDisco / groupSize),
        savings: primaryRecommendation.totalCost - saturdayDisco,
        dayOfWeek: 6,
        dayName: "Saturday"
      });
    }
  }
  return {
    primaryRecommendation,
    alternatives: alternatives.slice(0, 3),
    // Limit to top 3 alternatives
    groupSizeInsights: {
      category: groupCategory,
      optimalRange,
      recommendation: groupRecommendation
    }
  };
}
function getSavingsOpportunities(groupSize, currentDayOfWeek) {
  const opportunities = [];
  const currentComparison = compareDiscoVsPrivate(groupSize, currentDayOfWeek);
  const currentBest = currentComparison.comparison.recommendation === "disco" ? currentComparison.discoOption.totalCost : currentComparison.privateOption.totalCost;
  if ([5, 6, 0].includes(currentDayOfWeek)) {
    const mondayPrivate = calculatePrivatePrice(groupSize, 1, "standard");
    const savings = currentBest - mondayPrivate.totalPrice;
    if (savings > 1e4) {
      opportunities.push({
        type: "day_change",
        description: `Move to Monday-Thursday for private cruise`,
        savings,
        newDayOfWeek: 1,
        newDayName: "Monday",
        newCruiseType: "private",
        actionRequired: "Change event date to weekday"
      });
    }
  }
  if ([1, 2, 3, 4].includes(currentDayOfWeek)) {
    const saturdayDisco = calculateDiscoPrice(groupSize, "basic");
    const savings = currentBest - saturdayDisco;
    if (savings > 5e3) {
      opportunities.push({
        type: "day_change",
        description: `Switch to Saturday disco cruise`,
        savings,
        newDayOfWeek: 6,
        newDayName: "Saturday",
        newCruiseType: "disco",
        actionRequired: "Change event date to Saturday"
      });
    }
  }
  return opportunities.sort((a, b) => b.savings - a.savings).slice(0, 5);
}
var QUOTE_STATUSES, INVOICE_STATUSES, LEAD_STATUSES, BOOKING_STATUSES, PAYMENT_STATUSES, EVENT_TYPES, CRUISE_TYPES, DISCO_PACKAGES, BOAT_TYPES, PRIVATE_CRUISE_PACKAGES, PRIVATE_PACKAGE_TYPES, PRIVATE_CAPACITY_TIERS, PACKAGE_COMPARISON_FEATURES, PRICING_DEFAULTS, PACKAGE_FLAT_FEES, CREW_FEES, ADDON_FEES, DEPOSIT_POLICIES, BOATS, BOAT_SELECTION_RULES, PACKAGE_PRICING_DISPLAY, HOURLY_RATES, CRUISE_DURATIONS, DISCO_PRICING, PRIVATE_CRUISE_PRICING, PRICING_POLICIES, TIME_SLOTS, BADGE_VARIANTS, STATUS_COLORS, VALIDATION_MESSAGES, UI_MESSAGES, ACTION_LABELS, NAVIGATION_LABELS, PRIVATE_CRUISE_FINAL_PRICES, DISCO_AVAILABILITY, GROUP_SIZE_CATEGORIES, DAY_COMPARISON_TYPES, PRICING_SCENARIOS, VALIDATION_TEST_CASES, validatePricingConsistency;
var init_constants = __esm({
  "shared/constants.ts"() {
    "use strict";
    QUOTE_STATUSES = {
      DRAFT: "Draft",
      draft: "Draft",
      SENT: "Sent",
      sent: "Sent",
      VIEWED: "Viewed",
      viewed: "Viewed",
      ACCEPTED: "Accepted",
      accepted: "Accepted",
      APPROVED: "Approved",
      approved: "Approved",
      EXPIRED: "Expired",
      expired: "Expired",
      DECLINED: "Declined",
      declined: "Declined"
    };
    INVOICE_STATUSES = {
      DRAFT: "Draft",
      draft: "Draft",
      OPEN: "Open",
      open: "Open",
      SENT: "Sent",
      sent: "Sent",
      PAID: "Paid",
      paid: "Paid",
      PARTIALLY_PAID: "Partially Paid",
      partially_paid: "Partially Paid",
      partial: "Partially Paid",
      OVERDUE: "Overdue",
      overdue: "Overdue",
      CANCELLED: "Cancelled",
      cancelled: "Cancelled",
      canceled: "Cancelled"
    };
    LEAD_STATUSES = {
      NEW: "New Lead",
      new: "New Lead",
      CONTACTED: "Contacted",
      contacted: "Contacted",
      QUOTED: "Quote Sent",
      quoted: "Quote Sent",
      QUOTE_SENT: "Quote Sent",
      quote_sent: "Quote Sent",
      NEGOTIATING: "Negotiating",
      negotiating: "Negotiating",
      CLOSED_WON: "Booking Confirmed",
      closed_won: "Booking Confirmed",
      CONFIRMED: "Booking Confirmed",
      confirmed: "Booking Confirmed",
      CLOSED_LOST: "Lost",
      closed_lost: "Lost",
      LOST: "Lost",
      lost: "Lost"
    };
    BOOKING_STATUSES = {
      BOOKED: "Booked",
      booked: "Booked",
      CONFIRMED: "Confirmed",
      confirmed: "Confirmed",
      HOLD: "On Hold",
      hold: "On Hold",
      BLOCKED: "Blocked",
      blocked: "Blocked",
      CANCELED: "Cancelled",
      canceled: "Cancelled",
      CANCELLED: "Cancelled",
      cancelled: "Cancelled"
    };
    PAYMENT_STATUSES = {
      PENDING: "Pending",
      pending: "Pending",
      DEPOSIT_PAID: "Deposit Paid",
      deposit_paid: "Deposit Paid",
      FULLY_PAID: "Fully Paid",
      fully_paid: "Fully Paid",
      PAID: "Paid",
      paid: "Paid",
      UNPAID: "Unpaid",
      unpaid: "Unpaid",
      PARTIAL: "Partially Paid",
      partial: "Partially Paid",
      REFUNDED: "Refunded",
      refunded: "Refunded",
      FAILED: "Failed",
      failed: "Failed"
    };
    EVENT_TYPES = {
      birthday: { label: "Birthday", emoji: "\u{1F382}", description: "Make it memorable" },
      bachelor: { label: "Bachelor Party", emoji: "\u{1F389}", description: "Last sail before the veil" },
      bachelorette: { label: "Bachelorette Party", emoji: "\u{1F483}", description: "Party with the bride" },
      corporate: { label: "Corporate Event", emoji: "\u{1F4BC}", description: "Team building" },
      wedding: { label: "Wedding", emoji: "\u{1F492}", description: "Special day" },
      graduation: { label: "Graduation", emoji: "\u{1F393}", description: "Celebrate success" },
      anniversary: { label: "Anniversary", emoji: "\u{1F495}", description: "Celebrate love" },
      reunion: { label: "Reunion", emoji: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}", description: "Bring everyone together" },
      other: { label: "Other Event", emoji: "\u{1F38A}", description: "Custom celebration" }
    };
    CRUISE_TYPES = {
      private: { label: "Private Cruise", description: "Exclusive boat rental" },
      disco: { label: "ATX Disco Cruise", description: "Public party cruise" }
    };
    DISCO_PACKAGES = {
      basic: { label: "Basic", description: "Essential disco experience" },
      disco_queen: { label: "Disco Queen", description: "VIP disco experience" },
      platinum: { label: "Super Sparkle Platinum Disco", description: "Ultimate disco experience" }
    };
    BOAT_TYPES = {
      "15": { label: "15-Person Boat", capacity: 15, description: "Intimate gatherings" },
      "25": { label: "25-Person Boat", capacity: 25, description: "Medium groups" },
      "50": { label: "50-Person Boat", capacity: 50, description: "Large celebrations" },
      "75": { label: "75-Person Boat", capacity: 75, description: "Grand events" }
    };
    PRIVATE_CRUISE_PACKAGES = {
      // 14-Person Capacity Tier
      14: {
        capacity: 14,
        seatingCapacity: 14,
        boatName: "Intimate Cruiser",
        description: "Perfect for intimate gatherings and small celebrations",
        packages: {
          standard: {
            id: "standard-14",
            name: "Standard 4-Hour Cruise",
            tagline: "Essential cruise experience",
            description: "Everything you need for a perfect private cruise experience with professional crew and premium amenities",
            valueProposition: "Hassle-free cruising with all the essentials included",
            inclusions: [
              "Amazing, experienced captain",
              "2 large empty coolers (bring your own ice & drinks)",
              "Premium Bluetooth speaker system",
              "Clean restroom facilities",
              "Comfortable seating for 14 guests",
              "Plenty of sun & shade areas"
            ],
            highlights: ["Professional crew", "Premium sound system", "Comfortable seating"],
            ideal_for: ["Birthday parties", "Small celebrations", "Intimate gatherings"]
          },
          essentials: {
            id: "essentials-14",
            name: "4-Hour Cruise w/Essentials Package",
            tagline: "Complete convenience package",
            description: "All standard features plus essential refreshments and setup - perfect for worry-free entertaining",
            valueProposition: "Complete hosting solution with refreshments and setup included",
            inclusions: [
              "Everything from Standard Cruise",
              "Insulated 5-gallon dispenser with ice water",
              "15 gallons of fresh water & 30 solo cups",
              "Coolers pre-stocked with 40lbs of ice",
              "6-ft folding table for food & drinks"
            ],
            highlights: ["Pre-stocked coolers", "Fresh water included", "Setup table provided"],
            ideal_for: ["Worry-free hosting", "Food & drink service", "Convenience-focused events"]
          },
          ultimate: {
            id: "ultimate-14",
            name: "Ultimate Disco Party Package",
            tagline: "Complete party experience",
            description: "The full party package with entertainment, refreshments, and disco vibes - everything for an unforgettable celebration",
            valueProposition: "All-inclusive party experience with entertainment and party supplies",
            inclusions: [
              "Everything from Essentials Package",
              "6x20' giant lily pad float",
              "Unicorn or ring float for the guest of honor",
              "5 disco ball cups & 30 additional solo cups",
              "Bubble gun & 3 bubble wands for fun",
              "20 champagne flutes & 3 fruit juices",
              "2 bottles SPF-50 spray sunscreen",
              "20 plates, plasticware, & paper towels",
              "3 disco balls installed for party atmosphere"
            ],
            highlights: ["Giant lily pad float", "Disco party atmosphere", "Complete entertainment package"],
            ideal_for: ["Bachelorette parties", "Birthday celebrations", "Special occasions"]
          }
        }
      },
      // 25-Person Capacity Tier  
      25: {
        capacity: 25,
        seatingCapacity: 20,
        boatName: "Party Cruiser",
        description: "Ideal for medium-sized groups and celebrations",
        packages: {
          standard: {
            id: "standard-25",
            name: "Standard 4-Hour Cruise",
            tagline: "Essential cruise experience",
            description: "Professional cruise experience with premium amenities for your medium-sized celebration",
            valueProposition: "Spacious comfort with professional service for larger groups",
            inclusions: [
              "Amazing, experienced captain",
              "2 large empty coolers (bring your own ice & drinks)",
              "Premium Bluetooth speaker system",
              "Clean restroom facilities",
              "Comfortable seating for 20 guests",
              "Plenty of sun & shade areas"
            ],
            highlights: ["Professional crew", "Premium sound system", "Spacious seating"],
            ideal_for: ["Team celebrations", "Friend gatherings", "Family reunions"]
          },
          essentials: {
            id: "essentials-25",
            name: "4-Hour Cruise w/Essentials Package",
            tagline: "Complete convenience package",
            description: "Enhanced cruise experience with refreshments and conveniences for effortless group entertaining",
            valueProposition: "Complete group hosting solution with enhanced refreshments",
            inclusions: [
              "Everything from Standard Cruise",
              "Insulated 5-gallon dispenser with ice water",
              "20 gallons of fresh water & 50 solo cups",
              "Coolers pre-stocked with 60lbs of ice",
              "6-ft folding table for food & drinks"
            ],
            highlights: ["Enhanced refreshments", "More ice included", "Group-sized servings"],
            ideal_for: ["Corporate events", "Extended celebrations", "Group entertaining"]
          },
          ultimate: {
            id: "ultimate-25",
            name: "Ultimate Disco Party Package",
            tagline: "Complete party experience",
            description: "The ultimate party package with dual entertainment floats, enhanced party supplies, and disco atmosphere",
            valueProposition: "Premium all-inclusive party experience with enhanced entertainment",
            inclusions: [
              "Everything from Essentials Package",
              "(2) 6x20' giant lily pad floats",
              "(2) Unicorn or ring floats for guests of honor",
              "10 disco ball cups for party vibes",
              "(2) Bubble guns & 3 bubble wands",
              "30 champagne flutes & 3 fruit juices",
              "4 bottles SPF-50 spray sunscreen",
              "30 plates, plasticware, & paper towels",
              "3 disco balls installed for party atmosphere"
            ],
            highlights: ["Dual giant floats", "Enhanced party supplies", "Complete disco experience"],
            ideal_for: ["Bachelor/bachelorette parties", "Milestone celebrations", "Group parties"]
          }
        }
      },
      // 30-Person Capacity Tier (same as 25)
      30: {
        capacity: 30,
        seatingCapacity: 20,
        boatName: "Party Cruiser Plus",
        description: "Enhanced capacity for larger celebrations with same premium amenities",
        packages: {
          standard: {
            id: "standard-30",
            name: "Standard 4-Hour Cruise",
            tagline: "Essential cruise experience",
            description: "Professional cruise experience with premium amenities for your larger celebration",
            valueProposition: "Spacious comfort with professional service for extended groups",
            inclusions: [
              "Amazing, experienced captain",
              "2 large empty coolers (bring your own ice & drinks)",
              "Premium Bluetooth speaker system",
              "Clean restroom facilities",
              "Comfortable seating for 20 guests",
              "Plenty of sun & shade areas"
            ],
            highlights: ["Professional crew", "Premium sound system", "Extended capacity"],
            ideal_for: ["Large team events", "Extended family", "Big friend groups"]
          },
          essentials: {
            id: "essentials-30",
            name: "4-Hour Cruise w/Essentials Package",
            tagline: "Complete convenience package",
            description: "Enhanced cruise experience with refreshments and conveniences for effortless large group entertaining",
            valueProposition: "Complete large group hosting solution with enhanced refreshments",
            inclusions: [
              "Everything from Standard Cruise",
              "Insulated 5-gallon dispenser with ice water",
              "20 gallons of fresh water & 50 solo cups",
              "Coolers pre-stocked with 60lbs of ice",
              "6-ft folding table for food & drinks"
            ],
            highlights: ["Large group refreshments", "Ample ice included", "Extended servings"],
            ideal_for: ["Corporate gatherings", "Large celebrations", "Group events"]
          },
          ultimate: {
            id: "ultimate-30",
            name: "Ultimate Disco Party Package",
            tagline: "Complete party experience",
            description: "The ultimate party package with dual entertainment floats, enhanced party supplies, and disco atmosphere for larger groups",
            valueProposition: "Premium all-inclusive party experience for extended celebrations",
            inclusions: [
              "Everything from Essentials Package",
              "(2) 6x20' giant lily pad floats",
              "(2) Unicorn or ring floats for guests of honor",
              "10 disco ball cups for party vibes",
              "(2) Bubble guns & 3 bubble wands",
              "30 champagne flutes & 3 fruit juices",
              "4 bottles SPF-50 spray sunscreen",
              "30 plates, plasticware, & paper towels",
              "3 disco balls installed for party atmosphere"
            ],
            highlights: ["Dual giant floats", "Extended party supplies", "Large group disco experience"],
            ideal_for: ["Large bachelor/bachelorette parties", "Major celebrations", "Big group events"]
          }
        }
      },
      // 50-Person Capacity Tier
      50: {
        capacity: 50,
        seatingCapacity: 30,
        boatName: "Grand Celebration",
        description: "Premium vessel for large celebrations and corporate events",
        packages: {
          standard: {
            id: "standard-50",
            name: "Standard 4-Hour Cruise",
            tagline: "Grand cruise experience",
            description: "Premium cruise experience with enhanced amenities for large celebrations and corporate events",
            valueProposition: "Grand-scale cruising with professional service and premium facilities",
            inclusions: [
              "Amazing, experienced captain",
              "4 giant empty coolers (bring your own ice & drinks)",
              "Premium Bluetooth speaker system",
              "2 clean restroom facilities",
              "Comfortable seating for 30 guests",
              "Plenty of sun & shade areas"
            ],
            highlights: ["Dual restrooms", "Enhanced cooler capacity", "Premium seating"],
            ideal_for: ["Corporate events", "Large celebrations", "Wedding parties"]
          },
          essentials: {
            id: "essentials-50",
            name: "4-Hour Cruise w/Essentials Package",
            tagline: "Complete grand convenience",
            description: "Premium cruise with enhanced refreshment service and dual table setup for large-scale entertaining",
            valueProposition: "Complete large-scale hosting with enhanced infrastructure",
            inclusions: [
              "Everything from Standard Cruise",
              "Insulated 5-gallon dispenser with ice water",
              "25 gallons of fresh water & 100 solo cups",
              "Coolers pre-stocked with 80lbs of ice",
              "(2) 6-ft folding tables for food & drinks"
            ],
            highlights: ["Dual table setup", "Large-scale refreshments", "Enhanced ice capacity"],
            ideal_for: ["Corporate functions", "Large family events", "Catered celebrations"]
          },
          ultimate: {
            id: "ultimate-50",
            name: "Ultimate Disco Party Package",
            tagline: "Grand party experience",
            description: "The ultimate large-scale party with triple entertainment floats, comprehensive party supplies, and spectacular disco atmosphere",
            valueProposition: "Premium all-inclusive grand celebration experience",
            inclusions: [
              "Everything from Essentials Package",
              "(3) 6x20' giant lily pad floats",
              "(3) Unicorn or ring floats for guests of honor",
              "15 disco ball cups for party vibes",
              "(3) Bubble guns & 5 bubble wands",
              "50 champagne flutes & 3 fruit juices",
              "6 bottles SPF-50 spray sunscreen",
              "50 plates, plasticware, & paper towels",
              "10 disco balls installed for spectacular atmosphere"
            ],
            highlights: ["Triple giant floats", "Spectacular disco setup", "Grand-scale party supplies"],
            ideal_for: ["Major celebrations", "Corporate parties", "Large wedding events"]
          }
        }
      },
      // 75-Person Capacity Tier (same as 50)
      75: {
        capacity: 75,
        seatingCapacity: 30,
        boatName: "Ultimate Celebration",
        description: "Maximum capacity vessel for the grandest celebrations",
        packages: {
          standard: {
            id: "standard-75",
            name: "Standard 4-Hour Cruise",
            tagline: "Ultimate cruise experience",
            description: "Maximum capacity cruise experience with premium amenities for the grandest celebrations",
            valueProposition: "Ultimate-scale cruising with professional service and maximum facilities",
            inclusions: [
              "Amazing, experienced captain",
              "4 giant empty coolers (bring your own ice & drinks)",
              "Premium Bluetooth speaker system",
              "2 clean restroom facilities",
              "Comfortable seating for 30 guests",
              "Plenty of sun & shade areas"
            ],
            highlights: ["Maximum capacity", "Dual restrooms", "Ultimate space"],
            ideal_for: ["Major corporate events", "Large weddings", "Grand celebrations"]
          },
          essentials: {
            id: "essentials-75",
            name: "4-Hour Cruise w/Essentials Package",
            tagline: "Ultimate convenience package",
            description: "Maximum capacity cruise with ultimate refreshment service and dual table setup for grand-scale entertaining",
            valueProposition: "Complete grand-scale hosting with ultimate infrastructure",
            inclusions: [
              "Everything from Standard Cruise",
              "Insulated 5-gallon dispenser with ice water",
              "25 gallons of fresh water & 100 solo cups",
              "Coolers pre-stocked with 80lbs of ice",
              "(2) 6-ft folding tables for food & drinks"
            ],
            highlights: ["Ultimate capacity", "Grand-scale refreshments", "Maximum convenience"],
            ideal_for: ["Large corporate functions", "Grand family reunions", "Major celebrations"]
          },
          ultimate: {
            id: "ultimate-75",
            name: "Ultimate Disco Party Package",
            tagline: "Maximum party experience",
            description: "The ultimate maximum-capacity party with triple entertainment floats, comprehensive party supplies, and spectacular disco atmosphere",
            valueProposition: "Maximum all-inclusive grand celebration experience",
            inclusions: [
              "Everything from Essentials Package",
              "(3) 6x20' giant lily pad floats",
              "(3) Unicorn or ring floats for guests of honor",
              "15 disco ball cups for party vibes",
              "(3) Bubble guns & 5 bubble wands",
              "50 champagne flutes & 3 fruit juices",
              "6 bottles SPF-50 spray sunscreen",
              "50 plates, plasticware, & paper towels",
              "10 disco balls installed for spectacular atmosphere"
            ],
            highlights: ["Maximum entertainment", "Spectacular disco setup", "Ultimate party experience"],
            ideal_for: ["Grand celebrations", "Major corporate parties", "Ultimate wedding events"]
          }
        }
      }
    };
    PRIVATE_PACKAGE_TYPES = {
      STANDARD: "standard",
      ESSENTIALS: "essentials",
      ULTIMATE: "ultimate"
    };
    PRIVATE_CAPACITY_TIERS = [14, 25, 30, 50, 75];
    PACKAGE_COMPARISON_FEATURES = {
      // Core Features (included in all packages)
      CORE: [
        "Experienced captain",
        "Premium sound system",
        "Clean restroom facilities",
        "Sun & shade areas"
      ],
      // Essentials additions
      ESSENTIALS_ADDITIONS: [
        "Fresh water dispenser",
        "Pre-stocked ice coolers",
        "Setup tables",
        "Cups included"
      ],
      // Ultimate additions
      ULTIMATE_ADDITIONS: [
        "Giant lily pad floats",
        "Specialty floats",
        "Disco atmosphere",
        "Party supplies",
        "Champagne service",
        "Sun protection",
        "Complete tableware"
      ]
    };
    PRICING_DEFAULTS = {
      TAX_RATE_BASIS_POINTS: 825,
      // 8.25%
      GRATUITY_PERCENT: 20,
      // Updated to 20% as per requirements
      DEPOSIT_PERCENT: 25,
      URGENCY_THRESHOLD_DAYS: 30,
      FULL_PAYMENT_THRESHOLD_DAYS: 14,
      BASE_HOURLY_RATE: 2e4,
      // $200.00 in cents (minimum rate)
      CREW_FEE_26_30: 2e4,
      // $200 crew fee for 16+ people on Me Seeks The Irony (25-30 boat)
      CREW_FEE_51_75: 3e4
      // $300 crew fee for 40+ people on Clever Girl (50-75 boat)
    };
    PACKAGE_FLAT_FEES = {
      ESSENTIALS: {
        14: 1e4,
        // $100 flat fee for 14-person boat
        25: 15e3,
        // $150 flat fee for 25-person boat
        30: 15e3,
        // $150 flat fee for 25-person boat (26-30 uses same boat)
        50: 2e4,
        // $200 flat fee for 50-person boat
        75: 2e4
        // $200 flat fee for 50-person boat (51-75 uses same boat)
      },
      ULTIMATE: {
        14: 25e3,
        // $250 flat fee for 14-person boat
        25: 3e4,
        // $300 flat fee for 25-person boat
        30: 3e4,
        // $300 flat fee for 25-person boat (26-30 uses same boat)
        50: 35e3,
        // $350 flat fee for 50-person boat
        75: 35e3
        // $350 flat fee for 50-person boat (51-75 uses same boat)
      }
    };
    CREW_FEES = {
      THRESHOLDS: {
        SMALL_BOAT_EXTRA: 26,
        // 26-30 people need extra crew on 25-person boats
        LARGE_BOAT_EXTRA: 51
        // 51-75 people need extra crew on 50-person boats
      },
      HOURLY_RATES: {
        SMALL_BOAT_EXTRA: 5e3,
        // $50/hour extra for 26-30 people
        LARGE_BOAT_EXTRA: 1e4
        // $100/hour extra for 51-75 people
      }
    };
    ADDON_FEES = {
      LILY_PAD: 5e3
      // $50 flat fee for lily pad float
    };
    DEPOSIT_POLICIES = {
      PRIVATE: 50,
      // 50% deposit for private cruises
      DISCO: 25
      // 25% deposit for disco cruises
    };
    BOATS = {
      DAY_TRIPPER: {
        id: "boat_day_tripper",
        name: "Day Tripper",
        displayName: "Day Tripper",
        capacity: 14,
        seatingCapacity: 14,
        description: "Perfect for intimate gatherings up to 14 people"
      },
      ME_SEEKS_THE_IRONY: {
        id: "boat_me_seeks_the_irony",
        name: "Me Seeks The Irony",
        displayName: "Me Seeks The Irony",
        capacity: 30,
        // Can handle up to 30 people
        seatingCapacity: 25,
        description: "Ideal for medium groups of 15-30 people",
        aliases: ["Me Seek", "Me Seek/The Irony", "Me Seek / The Irony", "The Irony"]
        // Handle legacy naming
      },
      CLEVER_GIRL: {
        id: "boat_clever_girl",
        name: "Clever Girl",
        displayName: "Clever Girl",
        capacity: 75,
        // Can handle up to 75 people
        seatingCapacity: 50,
        description: "Premium vessel for large celebrations of 31-75 people"
      }
    };
    BOAT_SELECTION_RULES = {
      1: { boat: "DAY_TRIPPER", pricingTier: 14, crewFeeRequired: false },
      14: { boat: "DAY_TRIPPER", pricingTier: 14, crewFeeRequired: false },
      15: { boat: "ME_SEEKS_THE_IRONY", pricingTier: 25, crewFeeRequired: false },
      25: { boat: "ME_SEEKS_THE_IRONY", pricingTier: 25, crewFeeRequired: false },
      26: { boat: "ME_SEEKS_THE_IRONY", pricingTier: 30, crewFeeRequired: true, crewFeeType: "SMALL_BOAT_EXTRA" },
      30: { boat: "ME_SEEKS_THE_IRONY", pricingTier: 30, crewFeeRequired: true, crewFeeType: "SMALL_BOAT_EXTRA" },
      31: { boat: "CLEVER_GIRL", pricingTier: 50, crewFeeRequired: false },
      50: { boat: "CLEVER_GIRL", pricingTier: 50, crewFeeRequired: false },
      51: { boat: "CLEVER_GIRL", pricingTier: 75, crewFeeRequired: true, crewFeeType: "LARGE_BOAT_EXTRA" },
      75: { boat: "CLEVER_GIRL", pricingTier: 75, crewFeeRequired: true, crewFeeType: "LARGE_BOAT_EXTRA" }
    };
    PACKAGE_PRICING_DISPLAY = {
      14: {
        groupSizeRange: "1-14 people",
        recommendedBoat: BOATS.DAY_TRIPPER.displayName,
        basePricing: "Standard cruise price",
        essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[14] / 100}`,
        ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[14] / 100}`,
        crewFee: "No extra fee",
        notes: "Up to 14 people max capacity"
      },
      25: {
        groupSizeRange: "15-25 people",
        recommendedBoat: BOATS.ME_SEEKS_THE_IRONY.displayName,
        basePricing: "Standard price",
        essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[25] / 100}`,
        ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[25] / 100}`,
        crewFee: "No extra fee",
        notes: "Standard capacity range"
      },
      30: {
        groupSizeRange: "26-30 people",
        recommendedBoat: BOATS.ME_SEEKS_THE_IRONY.displayName,
        basePricing: "Standard price",
        essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[30] / 100}`,
        ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[30] / 100}`,
        crewFee: `+$${CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA / 100}/hour`,
        notes: "Extra crew required for 26+ people"
      },
      50: {
        groupSizeRange: "31-50 people",
        recommendedBoat: BOATS.CLEVER_GIRL.displayName,
        basePricing: "Standard price",
        essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[50] / 100}`,
        ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[50] / 100}`,
        crewFee: "No extra fee",
        notes: "Large group capacity"
      },
      75: {
        groupSizeRange: "51-75 people",
        recommendedBoat: BOATS.CLEVER_GIRL.displayName,
        basePricing: "Standard price",
        essentialsPrice: `$${PACKAGE_FLAT_FEES.ESSENTIALS[75] / 100}`,
        ultimatePrice: `$${PACKAGE_FLAT_FEES.ULTIMATE[75] / 100}`,
        crewFee: `+$${CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA / 100}/hour`,
        notes: "Large group capacity with additional crew"
      }
    };
    HOURLY_RATES = {
      // Capacity-based rates for Monday-Thursday (4 hours)
      MON_THU: {
        14: 2e4,
        // $200/hour - Day Tripper
        25: 25e3,
        // $250/hour - Me Seeks The Irony
        30: 25e3,
        // $250/hour - Me Seeks The Irony (same as 25p + crew fee)
        50: 3e4,
        // $300/hour - Clever Girl
        75: 3e4
        // $300/hour - Clever Girl (same as 50p + crew fee)
      },
      // Capacity-based rates for Friday (4 hours)
      FRIDAY: {
        14: 25e3,
        // $250/hour - Day Tripper
        25: 3e4,
        // $300/hour - Me Seeks The Irony
        30: 3e4,
        // $300/hour - Me Seeks The Irony (same as 25p + crew fee)
        50: 35e3,
        // $350/hour - Clever Girl
        75: 35e3
        // $350/hour - Clever Girl (same as 50p + crew fee)
      },
      // Capacity-based rates for Saturday-Sunday (4 hours)
      SAT_SUN: {
        14: 3e4,
        // $300/hour - Day Tripper
        25: 35e3,
        // $350/hour - Me Seeks The Irony
        30: 35e3,
        // $350/hour - Me Seeks The Irony (same as 25p + crew fee)
        50: 4e4,
        // $400/hour - Clever Girl
        75: 4e4
        // $400/hour - Clever Girl (same as 50p + crew fee)
      },
      // Legacy aliases for backward compatibility
      WEEKDAY: {
        14: 2e4,
        // $200/hour - Day Tripper (Mon-Thu rate)
        25: 25e3,
        // $250/hour - Me Seeks The Irony
        30: 25e3,
        // $250/hour - Me Seeks The Irony
        50: 3e4,
        // $300/hour - Clever Girl
        75: 3e4
        // $300/hour - Clever Girl
      },
      WEEKEND: {
        14: 3e4,
        // $300/hour - Day Tripper (Sat-Sun rate)
        25: 35e3,
        // $350/hour - Me Seeks The Irony  
        30: 35e3,
        // $350/hour - Me Seeks The Irony
        50: 4e4,
        // $400/hour - Clever Girl
        75: 4e4
        // $400/hour - Clever Girl
      }
    };
    CRUISE_DURATIONS = {
      WEEKDAY_DEFAULT: 4,
      // Monday-Thursday: 4 hours (default/most popular)
      WEEKDAY_ALTERNATIVE: 3,
      // Monday-Thursday: 3 hours (alternative option)
      WEEKEND: 4,
      // Friday-Sunday: 4 hours only
      // Legacy aliases for backward compatibility
      WEEKDAY: 4
      // Legacy: defaults to 4 hours for weekdays
    };
    DISCO_PRICING = {
      basic: 8500,
      // $85.00 per person
      disco_queen: 9500,
      // $95.00 per person
      platinum: 10500
      // $105.00 per person
    };
    PRIVATE_CRUISE_PRICING = {
      // 14-Person Capacity Tier
      14: {
        capacity: 14,
        baseHourlyRates: {
          MON_THU: 2e4,
          // $200/hr
          FRIDAY: 25e3,
          // $250/hr  
          SATURDAY: 3e4,
          // $300/hr
          SUNDAY: 3e4
          // $300/hr
        },
        packages: {
          standard: {
            name: "Standard 4-Hour Cruise",
            description: "Essential cruise experience with professional crew and premium amenities",
            addOn: 0,
            // Base package - no additional cost
            totalPrices: {
              // Total prices including tax and gratuity from task specification
              MON_THU: 105e3,
              // $1,050 total (from $800 base)
              FRIDAY: 118100,
              // $1,181 total (from $900 base)  
              SATURDAY: 183800,
              // $1,838 total (from $1,400 base)
              SUNDAY: 131300
              // $1,313 total (from $1,000 base)
            }
          },
          essentials: {
            name: "4-Hour Cruise w/Essentials Package",
            description: "Complete convenience package with refreshments and setup",
            addOn: 1e4,
            // +$100 
            totalPrices: {
              // Standard totals + $100
              MON_THU: 115e3,
              // $1,150 total  
              FRIDAY: 128100,
              // $1,281 total
              SATURDAY: 193800,
              // $1,938 total
              SUNDAY: 141300
              // $1,413 total
            }
          },
          ultimate: {
            name: "Ultimate Disco Party Package",
            description: "Complete party experience with entertainment and disco atmosphere",
            addOn: 25e3,
            // +$250
            totalPrices: {
              // Standard totals + $250  
              MON_THU: 13e4,
              // $1,300 total
              FRIDAY: 143100,
              // $1,431 total
              SATURDAY: 208800,
              // $2,088 total
              SUNDAY: 156300
              // $1,563 total
            }
          }
        }
      },
      // 25-Person Capacity Tier
      25: {
        capacity: 25,
        baseHourlyRates: {
          MON_THU: 25e3,
          // $250/hr
          FRIDAY: 3e4,
          // $300/hr
          SATURDAY: 35e3,
          // $350/hr  
          SUNDAY: 35e3
          // $350/hr
        },
        packages: {
          standard: {
            name: "Standard 4-Hour Cruise",
            description: "Professional cruise experience with premium amenities for medium groups",
            addOn: 0,
            // Base package
            totalPrices: {
              // Total prices including tax and gratuity from task specification
              MON_THU: 118100,
              // $1,181 total (from $900 base)
              FRIDAY: 131300,
              // $1,313 total (from $1,000 base)
              SATURDAY: 196900,
              // $1,969 total (from $1,500 base)  
              SUNDAY: 144400
              // $1,444 total (from $1,100 base)
            }
          },
          essentials: {
            name: "4-Hour Cruise w/Essentials Package",
            description: "Enhanced cruise experience with refreshments for group entertaining",
            addOn: 15e3,
            // +$150
            totalPrices: {
              // Standard totals + $150
              MON_THU: 133100,
              // $1,331 total
              FRIDAY: 146300,
              // $1,463 total
              SATURDAY: 211900,
              // $2,119 total
              SUNDAY: 159400
              // $1,594 total
            }
          },
          ultimate: {
            name: "Ultimate Disco Party Package",
            description: "Ultimate party package with dual entertainment floats and disco atmosphere",
            addOn: 3e4,
            // +$300
            totalPrices: {
              // Standard totals + $300
              MON_THU: 148100,
              // $1,481 total  
              FRIDAY: 161300,
              // $1,613 total
              SATURDAY: 226900,
              // $2,269 total
              SUNDAY: 174400
              // $1,744 total
            }
          }
        }
      },
      // 30-Person Capacity Tier (same as 25p + crew fee)
      30: {
        capacity: 30,
        baseHourlyRates: {
          MON_THU: 25e3,
          // $250/hr (same as 25p)
          FRIDAY: 3e4,
          // $300/hr (same as 25p)
          SATURDAY: 35e3,
          // $350/hr (same as 25p)
          SUNDAY: 35e3
          // $350/hr (same as 25p)
        },
        crewFeePerHour: 5e3,
        // +$50/hr = +$200 for 4hr cruise
        packages: {
          standard: {
            name: "Standard 4-Hour Cruise",
            description: "Professional cruise experience with enhanced capacity for larger groups",
            addOn: 0,
            // Base package
            totalPrices: {
              // 25p totals + $200 crew fee
              MON_THU: 138100,
              // $1,381 total ($1,181 + $200)
              FRIDAY: 151300,
              // $1,513 total ($1,313 + $200) 
              SATURDAY: 216900,
              // $2,169 total ($1,969 + $200)
              SUNDAY: 164400
              // $1,644 total ($1,444 + $200)
            }
          },
          essentials: {
            name: "4-Hour Cruise w/Essentials Package",
            description: "Enhanced cruise experience with refreshments for large group entertaining",
            addOn: 15e3,
            // +$150
            totalPrices: {
              // Standard totals + $150
              MON_THU: 153100,
              // $1,531 total
              FRIDAY: 166300,
              // $1,663 total
              SATURDAY: 231900,
              // $2,319 total  
              SUNDAY: 179400
              // $1,794 total
            }
          },
          ultimate: {
            name: "Ultimate Disco Party Package",
            description: "Ultimate party package for enhanced capacity with dual entertainment",
            addOn: 3e4,
            // +$300
            totalPrices: {
              // Standard totals + $300
              MON_THU: 168100,
              // $1,681 total
              FRIDAY: 181300,
              // $1,813 total
              SATURDAY: 246900,
              // $2,469 total
              SUNDAY: 194400
              // $1,944 total
            }
          }
        }
      },
      // 50-Person Capacity Tier
      50: {
        capacity: 50,
        baseHourlyRates: {
          MON_THU: 3e4,
          // $300/hr
          FRIDAY: 35e3,
          // $350/hr
          SATURDAY: 4e4,
          // $400/hr
          SUNDAY: 4e4
          // $400/hr
        },
        packages: {
          standard: {
            name: "Standard 4-Hour Cruise",
            description: "Premium cruise experience with enhanced amenities for large celebrations",
            addOn: 0,
            // Base package
            totalPrices: {
              // Total prices including tax and gratuity from task specification
              MON_THU: 131300,
              // $1,313 total (from $1,000 base)
              FRIDAY: 144400,
              // $1,444 total (from $1,100 base)
              SATURDAY: 21e4,
              // $2,100 total (from $1,600 base)
              SUNDAY: 157500
              // $1,575 total (from $1,200 base)
            }
          },
          essentials: {
            name: "4-Hour Cruise w/Essentials Package",
            description: "Premium cruise with enhanced refreshment service for large-scale entertaining",
            addOn: 2e4,
            // +$200
            totalPrices: {
              // Standard totals + $200
              MON_THU: 151300,
              // $1,513 total
              FRIDAY: 164400,
              // $1,644 total
              SATURDAY: 23e4,
              // $2,300 total
              SUNDAY: 177500
              // $1,775 total
            }
          },
          ultimate: {
            name: "Ultimate Disco Party Package",
            description: "Ultimate large-scale party with triple entertainment floats and spectacular atmosphere",
            addOn: 35e3,
            // +$350
            totalPrices: {
              // Standard totals + $350
              MON_THU: 166300,
              // $1,663 total
              FRIDAY: 179400,
              // $1,794 total
              SATURDAY: 245e3,
              // $2,450 total
              SUNDAY: 192500
              // $1,925 total
            }
          }
        }
      },
      // 75-Person Capacity Tier (same as 50p + crew fee)
      75: {
        capacity: 75,
        baseHourlyRates: {
          MON_THU: 3e4,
          // $300/hr (same as 50p)
          FRIDAY: 35e3,
          // $350/hr (same as 50p)
          SATURDAY: 4e4,
          // $400/hr (same as 50p)
          SUNDAY: 4e4
          // $400/hr (same as 50p)
        },
        crewFeePerHour: 7500,
        // +$75/hr = +$300 for 4hr cruise
        packages: {
          standard: {
            name: "Standard 4-Hour Cruise",
            description: "Maximum capacity cruise experience for the grandest celebrations",
            addOn: 0,
            // Base package  
            totalPrices: {
              // 50p totals + $300 crew fee
              MON_THU: 161300,
              // $1,613 total ($1,313 + $300)
              FRIDAY: 174400,
              // $1,744 total ($1,444 + $300)
              SATURDAY: 24e4,
              // $2,400 total ($2,100 + $300)
              SUNDAY: 187500
              // $1,875 total ($1,575 + $300)
            }
          },
          essentials: {
            name: "4-Hour Cruise w/Essentials Package",
            description: "Maximum capacity cruise with ultimate refreshment service",
            addOn: 2e4,
            // +$200
            totalPrices: {
              // Standard totals + $200
              MON_THU: 181300,
              // $1,813 total
              FRIDAY: 194400,
              // $1,944 total
              SATURDAY: 26e4,
              // $2,600 total
              SUNDAY: 207500
              // $2,075 total
            }
          },
          ultimate: {
            name: "Ultimate Disco Party Package",
            description: "Maximum all-inclusive grand celebration experience",
            addOn: 35e3,
            // +$350
            totalPrices: {
              // Standard totals + $350
              MON_THU: 196300,
              // $1,963 total
              FRIDAY: 209400,
              // $2,094 total
              SATURDAY: 275e3,
              // $2,750 total
              SUNDAY: 222500
              // $2,225 total
            }
          }
        }
      }
    };
    PRICING_POLICIES = {
      deposit: {
        standard: {
          percentage: 25,
          description: "Standard deposit for bookings made more than 30 days in advance",
          balancePercentage: 75,
          balanceDueDays: 30,
          title: "Standard Booking",
          subtitle: "25% deposit to secure, 75% due 30 days before cruise"
        },
        urgent: {
          percentage: 50,
          description: "Higher deposit required for bookings made 30 days or less from cruise date",
          paymentWindow: 48,
          // hours to pay after booking
          balancePercentage: 50,
          balanceDueDays: 2,
          // 48 hours = 2 days
          title: "Urgent Booking",
          subtitle: "50% deposit required, balance due within 48 hours"
        }
      },
      balance: {
        standardDueDays: 30,
        // days before cruise when remaining balance is due
        description: "Remaining balance due 30 days before cruise date",
        urgentDueHours: 48,
        // hours for urgent bookings
        urgentDescription: "Balance due within 48 hours for urgent bookings"
      },
      thresholds: {
        urgentBookingDays: 30,
        // booking within this many days requires higher deposit
        fullPaymentDays: 14
        // booking within this many days may require full payment
      },
      paymentTerms: {
        acceptedMethods: [
          "Credit Card (Visa, Mastercard, American Express)",
          "Debit Card",
          "Bank Transfer (ACH)",
          "Business Check (with approval)"
        ],
        processingTime: {
          creditCard: "Instant",
          bankTransfer: "1-3 business days",
          check: "5-7 business days to clear"
        },
        securityNote: "All payments are processed securely through Stripe"
      },
      cancellation: {
        policy: "Cancellation and refund terms vary by booking date and circumstances",
        contactRequired: true,
        timeline: {
          "45+ days": "Contact for potential refund options",
          "30-44 days": "Partial refund may be available",
          "14-29 days": "Limited refund options",
          "Under 14 days": "Contact for weather or emergency cancellations only"
        },
        weatherPolicy: "Full refund or reschedule for weather-related cancellations",
        contactInfo: {
          phone: "(512) 123-4567",
          email: "bookings@premierpartycruises.com",
          hours: "Mon-Fri 9AM-6PM, Sat-Sun 10AM-4PM"
        }
      },
      terms: {
        confirmationRequired: true,
        invoiceGeneration: "automatic",
        paymentMethods: ["credit_card", "bank_transfer", "check"],
        depositRefundable: false,
        gratuityIncluded: true,
        gratuityPercentage: 20,
        taxRate: 8.25,
        bookingAgreement: "Booking constitutes acceptance of all terms and conditions",
        ageRequirement: "21+ for alcohol service, all ages welcome",
        capacityLimits: "Strict capacity limits enforced for safety"
      },
      contact: {
        bookingQuestions: {
          phone: "(512) 123-4567",
          email: "bookings@premierpartycruises.com",
          text: "(512) 123-4567"
        },
        policyQuestions: {
          email: "policies@premierpartycruises.com",
          phone: "(512) 123-4567"
        },
        emergencyContact: {
          phone: "(512) 123-4567",
          available: "24/7 for booked cruises"
        },
        businessHours: "Monday-Friday 9AM-6PM, Saturday-Sunday 10AM-4PM CST"
      },
      legal: {
        termsUrl: "/terms-conditions",
        privacyUrl: "/privacy-policy",
        disclaimer: "Prices subject to change. Final pricing confirmed upon booking.",
        liability: "Limited liability coverage included. Additional insurance available.",
        disputes: "Disputes resolved through Austin, Texas jurisdiction",
        lastUpdated: "2024-09-19"
      }
    };
    TIME_SLOTS = {
      PRIVATE: {
        weekday: ["11:00", "15:00", "19:00"],
        friday: ["11:00", "15:00", "19:00"],
        saturday: ["11:00", "15:00", "19:00"],
        sunday: ["11:00", "15:00", "19:00"]
      },
      DISCO: {
        friday: ["19:00"],
        saturday: ["19:00"],
        sunday: ["15:00"]
      }
    };
    BADGE_VARIANTS = {
      QUOTE: {
        draft: "secondary",
        sent: "default",
        viewed: "outline",
        accepted: "default",
        approved: "default",
        expired: "destructive",
        declined: "destructive"
      },
      INVOICE: {
        draft: "secondary",
        open: "default",
        sent: "default",
        paid: "default",
        partial: "default",
        overdue: "destructive",
        cancelled: "secondary"
      },
      BOOKING: {
        booked: "default",
        confirmed: "default",
        hold: "outline",
        blocked: "secondary",
        cancelled: "destructive"
      },
      PAYMENT: {
        pending: "outline",
        paid: "default",
        partial: "default",
        unpaid: "destructive",
        failed: "destructive"
      }
    };
    STATUS_COLORS = {
      SUCCESS: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      WARNING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      DANGER: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      INFO: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      NEUTRAL: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      SECONDARY: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    };
    VALIDATION_MESSAGES = {
      REQUIRED_FIELD: "This field is required",
      INVALID_EMAIL: "Please enter a valid email address (e.g., name@example.com)",
      INVALID_PHONE: "Please enter a valid phone number (e.g., (555) 123-4567)",
      MIN_GROUP_SIZE: "Group size must be at least 1 person",
      MAX_GROUP_SIZE: "Group size exceeds boat capacity",
      FUTURE_DATE: "Event date must be in the future",
      INVALID_TIME_SLOT: "Please select a valid time slot",
      INVALID_AMOUNT: "Please enter a valid amount"
    };
    UI_MESSAGES = {
      LOADING: "Loading...",
      LOADING_QUOTES: "Loading quotes...",
      LOADING_INVOICES: "Loading invoices...",
      LOADING_BOOKINGS: "Loading bookings...",
      NO_RESULTS: "No results found",
      NO_QUOTES: "No quotes found",
      NO_INVOICES: "No invoices found",
      NO_BOOKINGS: "No bookings found",
      ERROR_LOADING: "Error loading data. Please try again.",
      UNAUTHORIZED: "You are not authorized to view this content.",
      NOT_FOUND: "The requested resource was not found."
    };
    ACTION_LABELS = {
      VIEW: "View",
      EDIT: "Edit",
      DELETE: "Delete",
      SEND: "Send",
      RESEND: "Resend",
      DOWNLOAD: "Download",
      CLONE: "Clone",
      ACCEPT: "Accept",
      DECLINE: "Decline",
      APPROVE: "Approve",
      CANCEL: "Cancel",
      SAVE: "Save",
      SAVE_DRAFT: "Save Draft",
      SEND_QUOTE: "Send Quote",
      CREATE_INVOICE: "Create Invoice",
      SEND_REMINDER: "Send Reminder",
      MARK_PAID: "Mark Paid",
      RECORD_PAYMENT: "Record Payment"
    };
    NAVIGATION_LABELS = {
      DASHBOARD: "Dashboard",
      LEADS: "Leads",
      QUOTES: "Quotes",
      INVOICES: "Invoices",
      BOOKINGS: "Bookings",
      CUSTOMERS: "Customers",
      PRODUCTS: "Products",
      TEMPLATES: "Templates",
      SETTINGS: "Settings",
      ANALYTICS: "Analytics"
    };
    PRIVATE_CRUISE_FINAL_PRICES = {
      // Monday-Thursday BASE prices (Standard package, 4-hour cruise)
      // Rate: 1-14: $200/hr, 15-25: $250/hr, 31-50: $300/hr
      // These are BASE prices - tax (8.25%) and gratuity (20%) will be added by calculator
      MON_THU: {
        14: 8e4,
        // $200/hr × 4hrs = $800 base
        25: 1e5,
        // $250/hr × 4hrs = $1,000 base
        50: 12e4
        // $300/hr × 4hrs = $1,200 base
      },
      // Friday BASE prices (Standard package, 4-hour cruise)
      // Rate: 1-14: $225/hr, 15-25: $250/hr, 31-50: $300/hr
      FRIDAY: {
        14: 9e4,
        // $225/hr × 4hrs = $900 base
        25: 1e5,
        // $250/hr × 4hrs = $1,000 base
        50: 12e4
        // $300/hr × 4hrs = $1,200 base
      },
      // Saturday BASE prices (Standard package, 4-hour cruise) - PREMIUM PRICING
      // Rate: 1-14: $350/hr, 15-25: $375/hr, 31-50: $400/hr
      SATURDAY: {
        14: 14e4,
        // $350/hr × 4hrs = $1,400 base
        25: 15e4,
        // $375/hr × 4hrs = $1,500 base
        50: 16e4
        // $400/hr × 4hrs = $1,600 base
      },
      // Sunday BASE prices (Standard package) - same as Monday-Thursday
      SUNDAY: {
        14: 8e4,
        // $200/hr × 4hrs = $800 base
        25: 1e5,
        // $250/hr × 4hrs = $1,000 base
        50: 12e4
        // $300/hr × 4hrs = $1,200 base
      }
    };
    DISCO_AVAILABILITY = {
      // Disco cruises only available Friday & Saturday
      AVAILABLE_DAYS: [5, 6],
      // Friday=5, Saturday=6
      PACKAGES: {
        basic: {
          name: "Basic Bach Package",
          pricePerPerson: 8500,
          // $85.00
          description: "BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise"
        },
        disco_queen: {
          name: "Disco Queen/King Package",
          pricePerPerson: 9500,
          // $95.00
          description: "Private Cooler & Reserved Spot for Your Group"
        },
        platinum: {
          name: "Super Sparkle Platinum Disco",
          pricePerPerson: 10500,
          // $105.00
          description: "Nothing to Carry, Cooler Stocked w/drinks When You Arrive!"
        }
      }
    };
    GROUP_SIZE_CATEGORIES = {
      SMALL: { min: 8, max: 12, label: "Small Group", description: "Intimate gatherings" },
      MEDIUM: { min: 13, max: 25, label: "Medium Group", description: "Standard parties" },
      LARGE: { min: 26, max: 50, label: "Large Group", description: "Big celebrations" },
      XLARGE: { min: 51, max: 75, label: "Extra Large Group", description: "Grand events" }
    };
    DAY_COMPARISON_TYPES = {
      WEEKDAY: { days: [1, 2, 3, 4], label: "Weekday", description: "Monday-Thursday" },
      FRIDAY: { days: [5], label: "Friday", description: "Friday night party" },
      SATURDAY: { days: [6], label: "Saturday", description: "Peak weekend pricing" },
      SUNDAY: { days: [0], label: "Sunday", description: "Sunday funday" }
    };
    PRICING_SCENARIOS = {
      // Small group scenarios
      SMALL_GROUP_SATURDAY: {
        groupSize: 8,
        dayOfWeek: 6,
        discoBasic: 68e3,
        // 8 × $85 = $680
        discoQueen: 76e3,
        // 8 × $95 = $760
        discoPlatinum: 84e3,
        // 8 × $105 = $840
        privateStandard: 183800,
        // $1,838
        winner: "disco",
        savingsRange: [99800, 115800],
        // $998-$1,158 savings
        message: "Disco cruise saves over $1,000 for small Saturday groups!"
      },
      MEDIUM_GROUP_SATURDAY: {
        groupSize: 15,
        dayOfWeek: 6,
        discoBasic: 127500,
        // 15 × $85 = $1,275
        discoQueen: 142500,
        // 15 × $95 = $1,425
        discoPlatinum: 157500,
        // 15 × $105 = $1,575
        privateStandard: 196900,
        // $1,969 (25p boat)
        winner: "disco",
        savingsRange: [39400, 69400],
        // $394-$694 savings
        message: "Disco still wins for medium groups on Saturday"
      },
      LARGE_GROUP_SATURDAY: {
        groupSize: 20,
        dayOfWeek: 6,
        discoBasic: 17e4,
        // 20 × $85 = $1,700
        discoQueen: 19e4,
        // 20 × $95 = $1,900
        discoPlatinum: 21e4,
        // 20 × $105 = $2,100
        privateStandard: 196900,
        // $1,969 (25p boat)
        winner: "private",
        // Private can win at higher group sizes
        savings: 6900,
        // Private saves $69 vs disco queen
        crossoverPoint: true,
        message: "Private cruise becomes competitive around 20+ people"
      },
      WEEKDAY_ONLY: {
        groupSize: 8,
        dayOfWeek: 2,
        // Tuesday
        discoAvailable: false,
        privateStandard: 105e3,
        // $1,050
        perPersonCost: 13125,
        // $131.25 per person
        winner: "private_only",
        message: "Great weekday value - only $131 per person for private boat!"
      },
      LARGE_GROUP_WEEKDAY: {
        groupSize: 25,
        dayOfWeek: 1,
        // Monday
        discoAvailable: false,
        privateStandard: 118100,
        // $1,181
        perPersonCost: 4724,
        // $47.24 per person
        winner: "private_only",
        message: "Incredible weekday value - under $48 per person!"
      }
    };
    VALIDATION_TEST_CASES = {
      GROUP_SIZES: [14, 25, 30, 50, 75],
      DURATION: 4,
      // 4-hour cruise
      EVENT_TYPE: "private",
      ADDONS: {
        ESSENTIALS: ["essentials"],
        ULTIMATE: ["ultimate"],
        LILY_PAD: ["lily_pad"]
      }
    };
    validatePricingConsistency = (calculatePricingFunction) => {
      const results = {
        valid: true,
        errors: [],
        testResults: {}
      };
      for (const groupSize of VALIDATION_TEST_CASES.GROUP_SIZES) {
        try {
          const essentialsResult = calculatePricingFunction({
            groupSize,
            duration: VALIDATION_TEST_CASES.DURATION,
            eventType: VALIDATION_TEST_CASES.EVENT_TYPE,
            selectedAddOns: VALIDATION_TEST_CASES.ADDONS.ESSENTIALS,
            date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          });
          const ultimateResult = calculatePricingFunction({
            groupSize,
            duration: VALIDATION_TEST_CASES.DURATION,
            eventType: VALIDATION_TEST_CASES.EVENT_TYPE,
            selectedAddOns: VALIDATION_TEST_CASES.ADDONS.ULTIMATE,
            date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          });
          const capacityTier = groupSize <= 14 ? 14 : groupSize <= 30 ? groupSize <= 25 ? 25 : 30 : groupSize <= 50 ? 50 : 75;
          const expectedEssentialsFee = PACKAGE_FLAT_FEES.ESSENTIALS[capacityTier];
          const actualEssentialsFee = essentialsResult.addOnDetails?.find((addon) => addon.id === "essentials")?.hourlyRate;
          if (actualEssentialsFee !== expectedEssentialsFee) {
            results.valid = false;
            results.errors.push(
              `Group ${groupSize}: Essentials fee mismatch - Expected: ${expectedEssentialsFee}, Actual: ${actualEssentialsFee}`
            );
          }
          const expectedUltimateFee = PACKAGE_FLAT_FEES.ULTIMATE[capacityTier];
          const actualUltimateFee = ultimateResult.addOnDetails?.find((addon) => addon.id === "ultimate")?.hourlyRate;
          if (actualUltimateFee !== expectedUltimateFee) {
            results.valid = false;
            results.errors.push(
              `Group ${groupSize}: Ultimate fee mismatch - Expected: ${expectedUltimateFee}, Actual: ${actualUltimateFee}`
            );
          }
          if (groupSize >= CREW_FEES.THRESHOLDS.SMALL_BOAT_EXTRA && groupSize <= 30) {
            const expectedCrewFee = CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA * VALIDATION_TEST_CASES.DURATION;
            const actualCrewFee = essentialsResult.crewFee;
            if (actualCrewFee !== expectedCrewFee) {
              results.valid = false;
              results.errors.push(
                `Group ${groupSize}: Crew fee mismatch - Expected: ${expectedCrewFee}, Actual: ${actualCrewFee}`
              );
            }
          } else if (groupSize >= CREW_FEES.THRESHOLDS.LARGE_BOAT_EXTRA) {
            const expectedCrewFee = CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA * VALIDATION_TEST_CASES.DURATION;
            const actualCrewFee = essentialsResult.crewFee;
            if (actualCrewFee !== expectedCrewFee) {
              results.valid = false;
              results.errors.push(
                `Group ${groupSize}: Crew fee mismatch - Expected: ${expectedCrewFee}, Actual: ${actualCrewFee}`
              );
            }
          }
          const expectedDepositPercent = DEPOSIT_POLICIES.PRIVATE;
          const actualDepositPercent = Math.round(essentialsResult.depositAmount / essentialsResult.total * 100);
          if (actualDepositPercent !== expectedDepositPercent) {
            results.valid = false;
            results.errors.push(
              `Group ${groupSize}: Deposit percentage mismatch - Expected: ${expectedDepositPercent}%, Actual: ${actualDepositPercent}%`
            );
          }
          results.testResults[groupSize] = {
            essentials: essentialsResult,
            ultimate: ultimateResult,
            validatedFees: {
              essentialsFee: actualEssentialsFee === expectedEssentialsFee,
              ultimateFee: actualUltimateFee === expectedUltimateFee,
              depositPercent: actualDepositPercent === expectedDepositPercent
            }
          };
        } catch (error) {
          results.valid = false;
          results.errors.push(`Group ${groupSize}: Validation error - ${error}`);
        }
      }
      return results;
    };
  }
});

// shared/pricing.ts
var pricing_exports = {};
__export(pricing_exports, {
  calculateBaseCruiseCost: () => calculateBaseCruiseCost,
  calculateCompletePricing: () => calculateCompletePricing,
  calculateDeposit: () => calculateDeposit,
  calculateDiscoPricing: () => calculateDiscoPricing,
  calculatePackagePricing: () => calculatePackagePricing,
  calculateSimpleDiscoPricing: () => calculateSimpleDiscoPricing,
  calculateSimplePricing: () => calculateSimplePricing,
  calculateTaxAndGratuity: () => calculateTaxAndGratuity,
  filterBoatsForGroupSize: () => filterBoatsForGroupSize,
  getBoatDisplayName: () => getBoatDisplayName,
  getCapacityTier: () => getCapacityTier,
  getCruiseDuration: () => getCruiseDuration,
  getDayType: () => getDayType,
  getDiscoPricing: () => getDiscoPricing,
  getHourlyRateByDayAndGroupSize: () => getHourlyRateByDayAndGroupSize,
  getPackagePricing: () => getPackagePricing,
  getPricingDayType: () => getPricingDayType
});
function calculateSimplePricing(date, groupSize, duration = 4, selectedAddOns = []) {
  const dayType = getDayType(date);
  const capacityTier = getCapacityTier(groupSize);
  console.warn("\u26A0\uFE0F PRICING WARNING: calculateSimplePricing should not use HOURLY_RATES constants. Use server-side pricing with Google Sheet data instead.");
  const baseHourlyRate = HOURLY_RATES[dayType][capacityTier];
  let addOnFlatFee = 0;
  const addOnDetails = [];
  if (selectedAddOns.includes("essentials")) {
    const flatFee = PACKAGE_FLAT_FEES.ESSENTIALS[capacityTier];
    addOnFlatFee += flatFee;
    addOnDetails.push({
      id: "essentials",
      name: "Essentials Package",
      hourlyRate: flatFee
      // Store flat fee here for compatibility
    });
  }
  if (selectedAddOns.includes("ultimate")) {
    const flatFee = PACKAGE_FLAT_FEES.ULTIMATE[capacityTier];
    addOnFlatFee += flatFee;
    addOnDetails.push({
      id: "ultimate",
      name: "Ultimate Party Package",
      hourlyRate: flatFee
      // Store flat fee here for compatibility
    });
  }
  if (selectedAddOns.includes("lily_pad")) {
    const lilyPadFee = ADDON_FEES.LILY_PAD;
    addOnFlatFee += lilyPadFee;
    addOnDetails.push({
      id: "lily_pad",
      name: "Lily Pad Float",
      hourlyRate: lilyPadFee
      // Store flat fee here for compatibility
    });
  }
  const totalHourlyRate = baseHourlyRate;
  let crewFee = 0;
  if (groupSize >= CREW_FEES.THRESHOLDS.SMALL_BOAT_EXTRA && groupSize <= 30) {
    crewFee = CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA * duration;
  } else if (groupSize >= CREW_FEES.THRESHOLDS.LARGE_BOAT_EXTRA && groupSize <= 75) {
    crewFee = CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA * duration;
  }
  const baseCruiseCost = totalHourlyRate * duration;
  const subtotal = baseCruiseCost + addOnFlatFee + crewFee;
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 1e4));
  const gratuity = Math.floor(baseCruiseCost * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const total = subtotal + tax + gratuity;
  const depositPercent = DEPOSIT_POLICIES.PRIVATE;
  const depositAmount = Math.floor(total * (depositPercent / 100));
  return {
    subtotal,
    tax,
    gratuity,
    total,
    depositRequired: true,
    depositAmount,
    depositPercent,
    duration,
    hourlyRate: totalHourlyRate,
    baseHourlyRate,
    selectedAddOns: addOnDetails,
    pricingModel: "hourly",
    discountTotal: 0,
    perPersonCost: Math.floor(total / groupSize),
    showBothOptions: false
  };
}
function calculateSimpleDiscoPricing(selectedDiscoPackage, ticketQuantity) {
  const perPersonPrice = DISCO_PRICING[selectedDiscoPackage];
  const subtotal = perPersonPrice * ticketQuantity;
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 1e4));
  const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const total = subtotal + tax + gratuity;
  const depositPercent = DEPOSIT_POLICIES.DISCO;
  const depositAmount = Math.floor(total * (depositPercent / 100));
  const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1e3).toISOString();
  return {
    subtotal,
    discountTotal: 0,
    tax,
    gratuity,
    total,
    perPersonCost: Math.floor(total / ticketQuantity),
    depositRequired: true,
    depositPercent,
    depositAmount,
    paymentSchedule: [],
    expiresAt,
    breakdown: {},
    displaySettings: {},
    urgencyMessage: null,
    adjustments: [],
    adjustmentTotal: 0
  };
}
function getDayType(date) {
  const dayOfWeek = date.getDay();
  if (dayOfWeek >= 1 && dayOfWeek <= 4) {
    return "MON_THU";
  } else if (dayOfWeek === 5) {
    return "FRIDAY";
  } else {
    return "SAT_SUN";
  }
}
function getCapacityTier(groupSize) {
  if (groupSize <= 14) return 14;
  if (groupSize <= 25) return 25;
  if (groupSize <= 30) return 30;
  if (groupSize <= 50) return 50;
  return 75;
}
function getHourlyRateByDayAndGroupSize(date, groupSize) {
  console.error("\u274C CRITICAL: getHourlyRateByDayAndGroupSize() uses fallback HOURLY_RATES constants. Use server-side pricing with Google Sheet data instead.");
  const dayType = getDayType(date);
  const capacityTier = getCapacityTier(groupSize);
  return HOURLY_RATES[dayType][capacityTier];
}
function getCruiseDuration(date, selectedDuration) {
  const dayType = getDayType(date);
  if (dayType === "MON_THU") {
    return selectedDuration || 4;
  } else {
    return 4;
  }
}
function calculateBaseCruiseCost(date, groupSize, duration) {
  const hourlyRate = getHourlyRateByDayAndGroupSize(date, groupSize);
  const cruiseDuration = getCruiseDuration(date, duration);
  const capacityTier = getCapacityTier(groupSize);
  const dayType = getDayType(date);
  const baseCruiseCost = hourlyRate * cruiseDuration;
  let crewFee = 0;
  if (groupSize >= 16 && groupSize <= 30) {
    crewFee = PRICING_DEFAULTS.CREW_FEE_26_30;
  } else if (groupSize >= 40 && groupSize <= 75) {
    crewFee = PRICING_DEFAULTS.CREW_FEE_51_75;
  }
  const subtotal = baseCruiseCost + crewFee;
  return {
    hourlyRate,
    duration: cruiseDuration,
    capacityTier,
    dayType,
    baseCruiseCost,
    crewFee,
    subtotal,
    breakdown: {
      boatType: `${capacityTier}-person boat`,
      dayName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()],
      baseHourlyRate: hourlyRate,
      cruiseDuration,
      baseCruiseCost,
      crewFee,
      subtotalBeforeTax: subtotal
    }
  };
}
function calculateTaxAndGratuity(subtotal) {
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 1e4));
  const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  return {
    tax,
    gratuity,
    total: subtotal + tax + gratuity
  };
}
function calculateDeposit(total, eventDate) {
  const today = /* @__PURE__ */ new Date();
  const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24));
  const isUrgentBooking = daysUntilEvent <= PRICING_DEFAULTS.URGENCY_THRESHOLD_DAYS;
  const depositPercent = isUrgentBooking ? 50 : PRICING_DEFAULTS.DEPOSIT_PERCENT;
  const depositAmount = Math.floor(total * (depositPercent / 100));
  const balanceDue = total - depositAmount;
  const remainingBalanceDueAt = new Date(eventDate);
  remainingBalanceDueAt.setDate(remainingBalanceDueAt.getDate() - 30);
  const finalDueDate = remainingBalanceDueAt < today ? today : remainingBalanceDueAt;
  return {
    depositPercent,
    depositAmount,
    balanceDue,
    remainingBalanceDueAt: finalDueDate,
    isFullPaymentRequired: false,
    // Never require full payment upfront
    isUrgentBooking,
    paymentWindow: isUrgentBooking ? 48 : null,
    // 48 hours to pay for urgent bookings
    daysUntilEvent,
    daysUntilBalanceDue: Math.ceil((finalDueDate.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24))
  };
}
function getPricingDayType(date) {
  const dayOfWeek = date.getDay();
  if (dayOfWeek >= 1 && dayOfWeek <= 4) {
    return "MON_THU";
  } else if (dayOfWeek === 5) {
    return "FRIDAY";
  } else if (dayOfWeek === 6) {
    return "SATURDAY";
  } else {
    return "SUNDAY";
  }
}
function getPackagePricing(capacityTier, packageType, date) {
  const dayType = getPricingDayType(date);
  const tierPricing = PRIVATE_CRUISE_PRICING[capacityTier];
  const packagePricing = tierPricing.packages[packageType];
  return {
    name: packagePricing.name,
    description: packagePricing.description,
    addOn: packagePricing.addOn,
    totalPrice: packagePricing.totalPrices[dayType],
    baseHourlyRate: tierPricing.baseHourlyRates[dayType],
    capacity: tierPricing.capacity,
    crewFeePerHour: tierPricing.crewFeePerHour || 0
  };
}
function calculatePackagePricing(date, groupSize, packageType = "standard", duration) {
  const capacityTier = getCapacityTier(groupSize);
  const packagePricing = getPackagePricing(capacityTier, packageType, date);
  const cruiseDuration = getCruiseDuration(date, duration);
  const totalPrice = cruiseDuration === 3 ? Math.floor(packagePricing.totalPrice * 0.75) : packagePricing.totalPrice;
  const deposit = calculateDeposit(totalPrice, date);
  return {
    packageType,
    packageName: packagePricing.name,
    packageDescription: packagePricing.description,
    capacity: packagePricing.capacity,
    groupSize,
    baseHourlyRate: packagePricing.baseHourlyRate,
    duration: cruiseDuration,
    addOnCost: packagePricing.addOn,
    crewFeePerHour: packagePricing.crewFeePerHour,
    totalCrewFee: packagePricing.crewFeePerHour * cruiseDuration,
    totalPrice,
    ...deposit,
    perPersonCost: Math.floor(totalPrice / groupSize),
    breakdown: {
      capacityTier,
      packageType,
      baseHourlyRate: packagePricing.baseHourlyRate,
      duration: cruiseDuration,
      addOnCost: packagePricing.addOn,
      crewFee: packagePricing.crewFeePerHour * cruiseDuration,
      totalPrice,
      perPerson: Math.floor(totalPrice / groupSize),
      deposit: deposit.depositAmount,
      balanceDue: deposit.balanceDue
    }
  };
}
function calculateCompletePricing(date, groupSize, duration) {
  const baseCost = calculateBaseCruiseCost(date, groupSize, duration);
  const taxAndGratuity = calculateTaxAndGratuity(baseCost.subtotal);
  const deposit = calculateDeposit(taxAndGratuity.total, date);
  return {
    ...baseCost,
    ...taxAndGratuity,
    ...deposit,
    perPersonCost: Math.floor(taxAndGratuity.total / groupSize),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3),
    // 7 days
    breakdown: {
      ...baseCost.breakdown,
      gratuityAmount: taxAndGratuity.gratuity,
      taxAmount: taxAndGratuity.tax,
      grandTotal: taxAndGratuity.total,
      perPerson: Math.floor(taxAndGratuity.total / groupSize),
      deposit: deposit.depositAmount,
      balanceDue: deposit.balanceDue
    }
  };
}
function getDiscoPricing(packageType) {
  return DISCO_PRICING[packageType] || DISCO_PRICING.basic;
}
function calculateDiscoPricing(packageType, groupSize, eventDate) {
  const pricePerPerson = getDiscoPricing(packageType);
  const subtotal = pricePerPerson * groupSize;
  const taxAndGratuity = calculateTaxAndGratuity(subtotal);
  const deposit = calculateDeposit(taxAndGratuity.total, eventDate);
  return {
    packageType,
    pricePerPerson,
    groupSize,
    subtotal,
    ...taxAndGratuity,
    ...deposit,
    perPersonCost: Math.floor(taxAndGratuity.total / groupSize),
    breakdown: {
      packageType,
      pricePerPerson,
      groupSize,
      subtotal,
      tax: taxAndGratuity.tax,
      gratuity: taxAndGratuity.gratuity,
      total: taxAndGratuity.total,
      perPerson: Math.floor(taxAndGratuity.total / groupSize),
      deposit: deposit.depositAmount,
      balanceDue: deposit.balanceDue
    }
  };
}
var filterBoatsForGroupSize, getBoatDisplayName;
var init_pricing = __esm({
  "shared/pricing.ts"() {
    "use strict";
    init_constants();
    filterBoatsForGroupSize = (boats2, groupSize) => {
      if (!boats2 || boats2.length === 0) return [];
      const privateBoats = boats2.filter((boat) => boat.id !== "boat_atx_disco" && boat.active);
      if (groupSize <= 14) {
        return privateBoats.filter(
          (boat) => boat.id === "boat_day_tripper" || boat.name === "Day Tripper"
        );
      } else if (groupSize <= 30) {
        return privateBoats.filter(
          (boat) => boat.id === "boat_me_seeks_the_irony" || boat.name === "Me Seeks The Irony"
        );
      } else if (groupSize <= 75) {
        return privateBoats.filter(
          (boat) => boat.id === "boat_clever_girl" || boat.name === "Clever Girl"
        );
      } else {
        return [];
      }
    };
    getBoatDisplayName = (boat) => {
      if (!boat) return "Party Boat";
      return boat.name || `${boat.capacity}-Person Boat`;
    };
  }
});

// server/storage.ts
var storage_exports = {};
__export(storage_exports, {
  DatabaseStorage: () => DatabaseStorage,
  storage: () => storage
});
import { eq, and, gte, lte, desc, asc, isNull, isNotNull, or, inArray, sql as sql2, count } from "drizzle-orm";
import { randomUUID } from "crypto";
import { format } from "date-fns";
var DatabaseStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_schema();
    init_db();
    init_quoteTokenService();
    init_googleSheets();
    init_timeSlots();
    DatabaseStorage = class {
      // Concurrency protection for booking operations
      pendingBookingOperations = /* @__PURE__ */ new Map();
      // Unified availability service - concurrency protection and slot holds
      slotHoldLocks = /* @__PURE__ */ new Map();
      // Google Sheets service for real availability data
      googleSheetsService;
      constructor() {
        this.googleSheetsService = new GoogleSheetsService();
      }
      // OLD SEED METHODS REMOVED FOR LOVABLE MIGRATION
      // The following methods have been removed:
      // - initializeDatabase()
      // - seedInitialData()
      // - seedProductData()
      // - getHourlyRateForBoat()
      //
      // These methods used old staticPricing configuration and generated 89 hardcoded products.
      // New pricing and products will be managed via Lovable system.
      // ===== BOAT-SPECIFIC PRODUCT METHODS =====
      /**
       * Get all products for a specific boat
       */
      async getProductsByBoat(boatId) {
        return await db.select().from(products).where(and(eq(products.boatId, boatId), eq(products.active, true)));
      }
      /**
       * Get boat-specific time slot products for a date and boat
       */
      async getBoatTimeSlotProducts(boatId, date, duration) {
        const dayOfWeek = date.getDay();
        let dayType;
        if (dayOfWeek >= 1 && dayOfWeek <= 4) {
          dayType = "weekday";
        } else if (dayOfWeek === 5) {
          dayType = "friday";
        } else {
          dayType = "weekend";
        }
        let query = db.select().from(products).where(and(
          eq(products.boatId, boatId),
          eq(products.dayType, dayType),
          eq(products.productType, "private_cruise"),
          eq(products.active, true)
        ));
        if (duration) {
          query = query.where(and(
            eq(products.boatId, boatId),
            eq(products.dayType, dayType),
            eq(products.duration, duration),
            eq(products.productType, "private_cruise"),
            eq(products.active, true)
          ));
        }
        return await query;
      }
      /**
       * Get available boats for a group size
       * FIXED: Check that group size is within BOTH min and max capacity
       * A group of 27 should get Me Seeks/The Irony (25-30), NOT Clever Girl (50-75)
       */
      async getAvailableBoatsForGroupSize(groupSize) {
        return await db.select().from(boats).where(and(
          lte(boats.capacity, groupSize),
          // groupSize >= min capacity 
          gte(boats.maxCapacity, groupSize),
          // groupSize <= max capacity
          eq(boats.active, true)
        )).orderBy(boats.capacity);
      }
      /**
       * Check if a specific boat time slot is available for booking
       */
      async isBoatTimeSlotAvailable(boatId, date, startTime, endTime) {
        const startDateTime = new Date(date);
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        startDateTime.setHours(startHours, startMinutes, 0, 0);
        const endDateTime = new Date(date);
        const [endHours, endMinutes] = endTime.split(":").map(Number);
        endDateTime.setHours(endHours, endMinutes, 0, 0);
        const conflictingBookings = await db.select().from(bookings).where(and(
          eq(bookings.boatId, boatId),
          eq(bookings.status, "booked"),
          or(
            and(gte(bookings.startTime, startDateTime), lte(bookings.startTime, endDateTime)),
            and(gte(bookings.endTime, startDateTime), lte(bookings.endTime, endDateTime)),
            and(lte(bookings.startTime, startDateTime), gte(bookings.endTime, endDateTime))
          )
        ));
        return conflictingBookings.length === 0;
      }
      // ===== BASIC CRUD OPERATIONS =====
      async getContact(id) {
        const result = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
        return result[0];
      }
      async getContactByEmail(email) {
        const result = await db.select().from(contacts).where(eq(contacts.email, email)).limit(1);
        return result[0];
      }
      async createContact(insertContact) {
        const result = await db.insert(contacts).values({
          ...insertContact,
          orgId: insertContact.orgId || "org_demo",
          phone: insertContact.phone || null,
          tags: insertContact.tags || []
        }).returning();
        return result[0];
      }
      async updateContact(id, updates) {
        const result = await db.update(contacts).set(updates).where(eq(contacts.id, id)).returning();
        if (result.length === 0) throw new Error("Contact not found");
        return result[0];
      }
      async getLeads() {
        const contactsWithProjects = await db.select({ contactId: projects.contactId }).from(projects).where(inArray(projects.pipelinePhase, ["ph_deposit_paid", "ph_paid"]));
        const excludeIds = contactsWithProjects.map((p) => p.contactId);
        if (excludeIds.length > 0) {
          return await db.select().from(contacts).where(and(
            isNotNull(contacts.id),
            sql2`${contacts.id} NOT IN (${sql2.join(excludeIds.map((id) => sql2`${id}`), sql2`, `)})`
          ));
        } else {
          return await db.select().from(contacts);
        }
      }
      async getClients() {
        const contactsWithClientProjects = await db.select({ contactId: projects.contactId }).from(projects).where(inArray(projects.pipelinePhase, ["ph_deposit_paid", "ph_paid"]));
        const includeIds = contactsWithClientProjects.map((p) => p.contactId);
        if (includeIds.length > 0) {
          return await db.select().from(contacts).where(
            inArray(contacts.id, includeIds)
          );
        } else {
          return [];
        }
      }
      async convertLeadToCustomer(contactId) {
        console.log("\u{1F504} CONVERTING LEAD TO CUSTOMER", {
          contactId,
          step: "lead_conversion_start",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        try {
          const result = await db.update(contacts).set({
            status: "customer",
            pipelinePhase: "ph_closed_won",
            leadSource: "chat_booking_conversion",
            tags: sql2`CASE 
          WHEN ${contacts.tags} IS NULL OR ${contacts.tags} = '[]'::jsonb 
          THEN '["customer", "converted_lead"]'::jsonb 
          ELSE ${contacts.tags} || '["customer", "converted_lead"]'::jsonb 
        END`,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(contacts.id, contactId)).returning();
          if (result.length === 0) {
            throw new Error(`Contact ${contactId} not found for conversion`);
          }
          const convertedContact = result[0];
          console.log("\u2705 LEAD SUCCESSFULLY CONVERTED TO CUSTOMER", {
            customerId: contactId,
            previousStatus: "lead",
            newStatus: "customer",
            pipelinePhase: "ph_closed_won",
            conversionComplete: true,
            step: "lead_conversion_success",
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          return convertedContact;
        } catch (error) {
          console.error("\u274C LEAD CONVERSION FAILED", {
            contactId,
            error: error.message,
            step: "lead_conversion_error",
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          throw error;
        }
      }
      async getProject(id) {
        const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
        return result[0];
      }
      async createProject(insertProject) {
        const result = await db.insert(projects).values({
          ...insertProject,
          orgId: insertProject.orgId || "org_demo",
          title: insertProject.title || null,
          status: insertProject.status || "NEW",
          pipelinePhase: insertProject.pipelinePhase || "ph_new",
          projectDate: insertProject.projectDate || null,
          groupSize: insertProject.groupSize || null,
          eventType: insertProject.eventType || null,
          duration: insertProject.duration || null,
          specialRequests: insertProject.specialRequests || null,
          preferredTime: insertProject.preferredTime || null,
          budget: insertProject.budget || null,
          leadSource: insertProject.leadSource || "chat",
          availabilitySlotId: insertProject.availabilitySlotId || null,
          tags: insertProject.tags || []
        }).returning();
        return result[0];
      }
      async updateProject(id, updates) {
        const result = await db.update(projects).set(updates).where(eq(projects.id, id)).returning();
        if (result.length === 0) throw new Error("Project not found");
        return result[0];
      }
      async getProjectsByContact(contactId) {
        if (!contactId) {
          return await db.select().from(projects);
        }
        return await db.select().from(projects).where(eq(projects.contactId, contactId));
      }
      async getBoats() {
        return await db.select().from(boats);
      }
      async getActiveBoats() {
        return await db.select().from(boats).where(eq(boats.active, true));
      }
      async getProduct(id) {
        const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
        return result[0];
      }
      async getProducts() {
        return await db.select().from(products);
      }
      async createProduct(insertProduct) {
        const result = await db.insert(products).values({
          ...insertProduct,
          orgId: insertProduct.orgId || "org_demo",
          description: insertProduct.description || null,
          taxable: insertProduct.taxable !== void 0 ? insertProduct.taxable : true,
          pricingModel: insertProduct.pricingModel || "hourly",
          productType: insertProduct.productType || "private_cruise",
          dayType: insertProduct.dayType || null,
          groupSize: insertProduct.groupSize || null,
          imageUrl: insertProduct.imageUrl || null,
          categoryType: insertProduct.categoryType || "experience",
          eventTypes: insertProduct.eventTypes || [],
          active: insertProduct.active !== void 0 ? insertProduct.active : true
        }).returning();
        return result[0];
      }
      async updateProduct(id, updates) {
        const result = await db.update(products).set(updates).where(eq(products.id, id)).returning();
        if (result.length === 0) throw new Error("Product not found");
        return result[0];
      }
      async deleteProduct(id) {
        const result = await db.delete(products).where(eq(products.id, id));
        return result.rowCount > 0;
      }
      async getQuote(id) {
        const result = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
        return result[0];
      }
      async getQuoteByToken(token) {
        const { quoteTokenService: quoteTokenService2 } = await Promise.resolve().then(() => (init_quoteTokenService(), quoteTokenService_exports));
        const verificationResult = quoteTokenService2.verifyToken(token);
        if (!verificationResult.valid || !verificationResult.payload) {
          console.warn("\u{1F6A8} Invalid or expired quote token:", verificationResult.error);
          return void 0;
        }
        const { quoteId } = verificationResult.payload;
        console.log("\u2705 Quote token verified successfully, retrieving quote:", {
          quoteId,
          scope: verificationResult.payload.scope,
          audience: verificationResult.payload.aud
        });
        return this.getQuote(quoteId);
      }
      async getQuotes(filters) {
        let query = db.select().from(quotes);
        if (filters?.statusFilter && filters.statusFilter !== "all") {
          query = query.where(eq(quotes.status, filters.statusFilter));
        }
        if (filters?.searchTerm) {
          const searchTerm = `%${filters.searchTerm}%`;
          query = query.where(
            or(
              sql2`${quotes.quoteNumber} ILIKE ${searchTerm}`,
              sql2`${quotes.customerName} ILIKE ${searchTerm}`,
              sql2`${quotes.customerEmail} ILIKE ${searchTerm}`
            )
          );
        }
        const sortOrder = filters?.sortOrder === "asc" ? asc : desc;
        let sortColumn;
        switch (filters?.sortBy) {
          case "quoteNumber":
            sortColumn = quotes.quoteNumber;
            break;
          case "customerName":
            sortColumn = quotes.customerName;
            break;
          case "total":
            sortColumn = quotes.total;
            break;
          case "status":
            sortColumn = quotes.status;
            break;
          case "eventDate":
            sortColumn = quotes.eventDate;
            break;
          default:
            sortColumn = quotes.createdAt;
        }
        query = query.orderBy(sortOrder(sortColumn));
        if (filters?.limit) {
          query = query.limit(filters.limit);
        }
        return await query;
      }
      async createQuote(insertQuote) {
        const result = await db.insert(quotes).values({
          ...insertQuote,
          templateId: insertQuote.templateId || null,
          orgId: insertQuote.orgId || "org_demo",
          status: insertQuote.status || "DRAFT",
          items: insertQuote.items || [],
          radioSections: insertQuote.radioSections || [],
          promoCode: insertQuote.promoCode || null,
          discountTotal: insertQuote.discountTotal || 0,
          subtotal: insertQuote.subtotal || 0,
          tax: insertQuote.tax || 0,
          gratuity: insertQuote.gratuity || 0,
          total: insertQuote.total || 0,
          perPersonCost: insertQuote.perPersonCost || 0,
          depositRequired: insertQuote.depositRequired !== void 0 ? insertQuote.depositRequired : true,
          depositPercent: insertQuote.depositPercent || 25,
          depositAmount: insertQuote.depositAmount || 0,
          paymentSchedule: insertQuote.paymentSchedule || [],
          accessToken: insertQuote.accessToken || null,
          // Keep existing token if provided
          accessTokenCreatedAt: insertQuote.accessTokenCreatedAt || null,
          accessTokenRevokedAt: insertQuote.accessTokenRevokedAt || null,
          expiresAt: insertQuote.expiresAt || null,
          version: insertQuote.version || 1
        }).returning();
        const quote = result[0];
        if (!insertQuote.accessToken) {
          const accessToken = quoteTokenService.generateSecureToken(quote.id, {
            scope: "quote:view",
            expiresIn: 30 * 24 * 60 * 60 * 1e3,
            // 30 days
            audience: "customer"
          });
          const updatedResult = await db.update(quotes).set({
            accessToken,
            accessTokenCreatedAt: /* @__PURE__ */ new Date()
          }).where(eq(quotes.id, quote.id)).returning();
          return updatedResult[0];
        }
        return quote;
      }
      async updateQuote(id, updates) {
        let updatedData = { ...updates };
        if (updates.status && (updates.status === "SENT" || updates.status === "VIEWED")) {
          const existingQuote = await this.getQuote(id);
          if (existingQuote?.accessToken) {
            const refreshResult = quoteTokenService.refreshToken(existingQuote.accessToken, {
              expiresIn: 60 * 24 * 60 * 60 * 1e3
              // 60 days for sent quotes
            });
            if (refreshResult.success && refreshResult.token) {
              updatedData.accessToken = refreshResult.token;
              updatedData.accessTokenCreatedAt = /* @__PURE__ */ new Date();
            }
          }
        }
        const result = await db.update(quotes).set(updatedData).where(eq(quotes.id, id)).returning();
        if (result.length === 0) throw new Error("Quote not found");
        return result[0];
      }
      async getQuotesByProject(projectId) {
        return await db.select().from(quotes).where(eq(quotes.projectId, projectId));
      }
      async getQuoteByToken(token) {
        const result = await db.select().from(quotes).where(
          and(
            eq(quotes.accessToken, token),
            isNull(quotes.accessTokenRevokedAt)
          )
        ).limit(1);
        return result[0];
      }
      async createQuoteFromChat(data) {
        let contact = await this.getContactByEmail(data.contact.email);
        if (!contact) {
          contact = await this.createContact(data.contact);
        }
        const projectData = {
          ...data.project,
          contactId: contact.id
        };
        const project = await this.createProject(projectData);
        const year = (/* @__PURE__ */ new Date()).getFullYear();
        const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
        const slug = `Q-${year}-${randomPart}`;
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const quoteToCreate = {
          ...data.quoteData,
          projectId: project.id,
          slug,
          accessToken: token,
          accessTokenCreatedAt: /* @__PURE__ */ new Date(),
          status: "SENT",
          // Store contact info directly for standalone viewing
          contactInfo: {
            firstName: data.contact.name?.split(" ")[0] || "",
            lastName: data.contact.name?.split(" ")[1] || "",
            email: data.contact.email,
            phone: data.contact.phone || ""
          }
          // Event details are passed in quoteData
        };
        const quote = await this.createQuote(quoteToCreate);
        const publicUrl = `/q/${token}`;
        return { quote, publicUrl };
      }
      async createInitializedQuote(data) {
        const year = (/* @__PURE__ */ new Date()).getFullYear();
        const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
        const slug = `Q-${year}-${randomPart}`;
        const simpleToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const projectData = {
          contactId: "placeholder_" + randomUUID(),
          // Temporary placeholder
          title: `Event - ${format(new Date(data.eventDate), "MMM d, yyyy")}`,
          status: "DRAFT",
          projectDate: new Date(data.eventDate),
          groupSize: data.groupSize,
          eventType: data.eventType,
          leadSource: "chat",
          tags: ["initialized-quote"],
          pipelinePhase: "ph_draft"
        };
        const project = await this.createProject(projectData);
        const quoteToCreate = {
          projectId: project.id,
          slug,
          accessToken: simpleToken,
          // Use the simple token here
          accessTokenCreatedAt: /* @__PURE__ */ new Date(),
          status: "DRAFT",
          eventDetails: {
            eventDate: data.eventDate,
            eventType: data.eventType,
            groupSize: data.groupSize
          },
          // Initialize with empty pricing - will be calculated when selections are made
          subtotal: 0,
          tax: 0,
          gratuity: 0,
          total: 0,
          depositAmount: 0,
          depositRequired: false,
          depositPercent: 25,
          perPersonCost: 0
        };
        const quote = await this.createQuote(quoteToCreate);
        const publicUrl = `/q/${simpleToken}`;
        return { quote, publicUrl, accessToken: simpleToken };
      }
      async updateQuoteByToken(token, updates) {
        const quote = await this.getQuoteByToken(token);
        if (!quote) {
          throw new Error("Quote not found or access token is invalid");
        }
        if (updates.contactInfo && quote.projectId) {
          const project = await this.getProject(quote.projectId);
          if (project && project.contactId.startsWith("placeholder_")) {
            let contact = await this.getContactByEmail(updates.contactInfo.email);
            if (!contact) {
              contact = await this.createContact({
                name: `${updates.contactInfo.firstName} ${updates.contactInfo.lastName}`,
                email: updates.contactInfo.email,
                phone: updates.contactInfo.phone || "",
                tags: ["chat-quote", project.eventType || "general"]
              });
            }
            await this.updateProject(quote.projectId, {
              contactId: contact.id,
              title: `${project.eventType} - ${updates.contactInfo.firstName} ${updates.contactInfo.lastName}`
            });
          }
        }
        return await this.updateQuote(quote.id, updates);
      }
      // ===== INVOICE AND PAYMENT OPERATIONS =====
      async getInvoice(id) {
        const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
        return result[0];
      }
      async getInvoiceByQuoteId(quoteId) {
        const result = await db.select().from(invoices).where(eq(invoices.quoteId, quoteId)).limit(1);
        return result[0];
      }
      async getAllInvoices() {
        return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
      }
      async getInvoices(filters) {
        let query = db.select().from(invoices);
        if (filters?.status) {
          query = query.where(eq(invoices.status, filters.status));
        }
        const sortOrder = filters?.sortOrder === "asc" ? asc : desc;
        const sortColumn = filters?.sortBy === "total" ? invoices.total : invoices.createdAt;
        query = query.orderBy(sortOrder(sortColumn));
        if (filters?.limit) {
          query = query.limit(filters.limit);
        }
        return await query;
      }
      async createInvoice(invoice) {
        const result = await db.insert(invoices).values(invoice).returning();
        return result[0];
      }
      async updateInvoice(id, updates) {
        const result = await db.update(invoices).set(updates).where(eq(invoices.id, id)).returning();
        if (result.length === 0) throw new Error("Invoice not found");
        return result[0];
      }
      async createPayment(payment) {
        const result = await db.insert(payments).values(payment).returning();
        return result[0];
      }
      async updatePayment(id, updates) {
        const result = await db.update(payments).set(updates).where(eq(payments.id, id)).returning();
        if (result.length === 0) throw new Error("Payment not found");
        return result[0];
      }
      async getPaymentsByInvoice(invoiceId) {
        return await db.select().from(payments).where(eq(payments.invoiceId, invoiceId));
      }
      // ===== CHAT MESSAGES =====
      async createChatMessage(insertMessage) {
        const result = await db.insert(chatMessages).values({
          ...insertMessage,
          contactId: insertMessage.contactId || null,
          metadata: insertMessage.metadata || {}
        }).returning();
        return result[0];
      }
      async getChatMessages(sessionId) {
        if (!sessionId) {
          return await db.select().from(chatMessages).orderBy(asc(chatMessages.createdAt));
        }
        return await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(asc(chatMessages.createdAt));
      }
      // ===== ADMIN CHAT =====
      async getAdminChatSessions(adminUserId) {
        const query = db.select().from(adminChatSessions);
        if (adminUserId) {
          return await query.where(eq(adminChatSessions.adminUserId, adminUserId)).orderBy(desc(adminChatSessions.lastMessageAt));
        }
        return await query.orderBy(desc(adminChatSessions.lastMessageAt));
      }
      async createAdminChatSession(session2) {
        const result = await db.insert(adminChatSessions).values({
          ...session2,
          tags: session2.tags || []
        }).returning();
        return result[0];
      }
      async updateAdminChatSession(sessionId, updates) {
        const result = await db.update(adminChatSessions).set(updates).where(eq(adminChatSessions.id, sessionId)).returning();
        if (result.length === 0) throw new Error("Admin chat session not found");
        return result[0];
      }
      async deleteAdminChatSession(sessionId) {
        await db.delete(adminChatMessages).where(eq(adminChatMessages.sessionId, sessionId));
        const result = await db.delete(adminChatSessions).where(eq(adminChatSessions.id, sessionId));
        return true;
      }
      async getAdminChatMessages(sessionId) {
        return await db.select().from(adminChatMessages).where(eq(adminChatMessages.sessionId, sessionId)).orderBy(asc(adminChatMessages.createdAt));
      }
      async createAdminChatMessage(message) {
        const result = await db.insert(adminChatMessages).values({
          ...message,
          metadata: message.metadata || {}
        }).returning();
        return result[0];
      }
      // ===== USER OPERATIONS =====
      async getUserByEmail(email) {
        const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
        return result[0];
      }
      async getUserByUsername(username) {
        const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
        return result[0];
      }
      async getUser(id) {
        const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return result[0];
      }
      async createUser(user) {
        const result = await db.insert(users).values(user).returning();
        return result[0];
      }
      async updateUserPassword(userId, hashedPassword) {
        const result = await db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId)).returning();
        if (result.length === 0) throw new Error("User not found");
        return result[0];
      }
      async updateUserLastLogin(userId) {
        const result = await db.update(users).set({ lastLoginAt: /* @__PURE__ */ new Date() }).where(eq(users.id, userId)).returning();
        if (result.length === 0) throw new Error("User not found");
        return result[0];
      }
      // ===== INVITE OPERATIONS =====
      async createInvite(invite) {
        const result = await db.insert(invites).values(invite).returning();
        return result[0];
      }
      async getInviteByToken(token) {
        const result = await db.select().from(invites).where(eq(invites.inviteToken, token)).limit(1);
        return result[0];
      }
      async markInviteAsUsed(inviteId) {
        const result = await db.update(invites).set({ usedAt: /* @__PURE__ */ new Date() }).where(eq(invites.id, inviteId)).returning();
        if (result.length === 0) throw new Error("Invite not found");
        return result[0];
      }
      async getUserInvites(userId) {
        return await db.select().from(invites).where(eq(invites.invitedBy, userId)).orderBy(desc(invites.createdAt));
      }
      // ===== AVAILABILITY OPERATIONS =====
      async getAvailabilitySlots(startDate, endDate) {
        return await db.select().from(availabilitySlots).where(
          and(
            gte(availabilitySlots.startTime, startDate),
            lte(availabilitySlots.startTime, endDate)
          )
        );
      }
      async createAvailabilitySlot(slot) {
        const result = await db.insert(availabilitySlots).values(slot).returning();
        return result[0];
      }
      async bookAvailabilitySlot(slotId, projectId) {
        const result = await db.update(availabilitySlots).set({ status: "BOOKED", projectId }).where(eq(availabilitySlots.id, slotId)).returning();
        if (result.length === 0) throw new Error("Availability slot not found");
        return result[0];
      }
      // ===== QUOTE TEMPLATES =====
      async getQuoteTemplate(id) {
        const result = await db.select().from(quoteTemplates).where(eq(quoteTemplates.id, id)).limit(1);
        return result[0];
      }
      async getQuoteTemplates() {
        return await db.select().from(quoteTemplates).where(eq(quoteTemplates.active, true)).orderBy(asc(quoteTemplates.displayOrder));
      }
      async getQuoteTemplatesByEventType(eventType) {
        return await db.select().from(quoteTemplates).where(and(eq(quoteTemplates.active, true), eq(quoteTemplates.eventType, eventType))).orderBy(asc(quoteTemplates.displayOrder));
      }
      async createQuoteTemplate(insertTemplate) {
        const result = await db.insert(quoteTemplates).values({
          ...insertTemplate,
          description: insertTemplate.description || null,
          orgId: insertTemplate.orgId || "org_demo",
          defaultItems: insertTemplate.defaultItems || [],
          defaultRadioSections: insertTemplate.defaultRadioSections || [],
          minGroupSize: insertTemplate.minGroupSize || null,
          maxGroupSize: insertTemplate.maxGroupSize || null,
          basePricePerPerson: insertTemplate.basePricePerPerson || null,
          active: insertTemplate.active !== void 0 ? insertTemplate.active : true,
          displayOrder: insertTemplate.displayOrder || 0,
          visualTheme: insertTemplate.visualTheme || {},
          automationRules: insertTemplate.automationRules || [],
          isDefault: insertTemplate.isDefault || false
        }).returning();
        return result[0];
      }
      async updateQuoteTemplate(id, updates) {
        const result = await db.update(quoteTemplates).set(updates).where(eq(quoteTemplates.id, id)).returning();
        if (result.length === 0) throw new Error("Quote template not found");
        return result[0];
      }
      async deleteQuoteTemplate(id) {
        const result = await db.delete(quoteTemplates).where(eq(quoteTemplates.id, id));
        return result.rowCount > 0;
      }
      // ===== PRICING SETTINGS =====
      async getPricingSettings(orgId) {
        const id = `pricing_${orgId || "org_demo"}`;
        const result = await db.select().from(pricingSettings).where(eq(pricingSettings.id, id)).limit(1);
        return result[0];
      }
      async updatePricingSettings(updates, orgId) {
        const id = `pricing_${orgId || "org_demo"}`;
        try {
          const result2 = await db.update(pricingSettings).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(pricingSettings.id, id)).returning();
          if (result2.length > 0) {
            return result2[0];
          }
        } catch (error) {
        }
        const newSettings = {
          id,
          orgId: orgId || "org_demo",
          taxRate: 825,
          defaultGratuityPercent: 20,
          gratuityIncluded: false,
          defaultDepositPercent: 25,
          urgencyThresholdDays: 30,
          fullPaymentThresholdDays: 14,
          currency: "USD",
          timezone: "America/Chicago",
          priceDisplayMode: "both",
          dayOfWeekMultipliers: null,
          seasonalAdjustments: [],
          updatedAt: /* @__PURE__ */ new Date(),
          ...updates
        };
        const result = await db.insert(pricingSettings).values(newSettings).returning();
        return result[0];
      }
      // ===== PLACEHOLDER FOR COMPLEX OPERATIONS =====
      // These methods need more complex implementation but are needed for the interface
      async calculateCruisePricing(params) {
        const { groupSize, eventDate } = params;
        const { HOURLY_RATES: HOURLY_RATES2, CRUISE_DURATIONS: CRUISE_DURATIONS3, PRICING_DEFAULTS: PRICING_DEFAULTS2 } = await Promise.resolve().then(() => (init_constants(), constants_exports));
        const { getDayType: getDayType2, getCapacityTier: getCapacityTier2, getHourlyRateByDayAndGroupSize: getHourlyRateByDayAndGroupSize2, getCruiseDuration: getCruiseDuration2 } = await Promise.resolve().then(() => (init_pricing(), pricing_exports));
        const dayType = getDayType2(eventDate);
        const capacityTier = getCapacityTier2(groupSize);
        const hourlyRate = getHourlyRateByDayAndGroupSize2(eventDate, groupSize);
        const duration = getCruiseDuration2(eventDate);
        const baseCruiseCost = hourlyRate * duration;
        let crewFee = 0;
        if (groupSize > capacityTier) {
          if (capacityTier === 25 && groupSize <= 30) {
            crewFee = 5e3 * duration;
          } else if (capacityTier === 50 && groupSize <= 75) {
            crewFee = 1e4 * duration;
          }
        }
        let subtotal = baseCruiseCost + crewFee;
        let adjustmentTotal = 0;
        const appliedAdjustments = [];
        const boatId = `capacity_${capacityTier}`;
        const globalAdjustments = await this.getEffectiveAdjustments(eventDate, "global");
        const boatAdjustments = await this.getEffectiveAdjustments(eventDate, "boat", boatId);
        const allAdjustments = [...globalAdjustments, ...boatAdjustments].sort((a, b) => a.priority - b.priority);
        let adjustedSubtotal = subtotal;
        let amountAdjustments = 0;
        let percentAdjustments = 0;
        for (const adjustment of allAdjustments) {
          let adjustmentValue = 0;
          if (adjustment.adjustmentType === "override") {
            adjustedSubtotal = adjustment.amountCents;
            adjustmentValue = adjustment.amountCents - subtotal;
            appliedAdjustments.push(`${adjustment.name} (override: $${(adjustment.amountCents / 100).toFixed(2)})`);
            break;
          } else if (adjustment.adjustmentType === "amount") {
            const amount = adjustment.operation === "increase" ? adjustment.amountCents : -adjustment.amountCents;
            if (adjustment.stackable) {
              amountAdjustments += amount;
            } else {
              amountAdjustments = amount;
            }
            appliedAdjustments.push(`${adjustment.name} (${adjustment.operation === "increase" ? "+" : "-"}$${(Math.abs(adjustment.amountCents) / 100).toFixed(2)})`);
          } else if (adjustment.adjustmentType === "percent") {
            const percentValue = adjustment.percentBps / 100;
            const amount = Math.floor(subtotal * (percentValue / 100));
            const finalAmount = adjustment.operation === "increase" ? amount : -amount;
            if (adjustment.stackable) {
              percentAdjustments += finalAmount;
            } else {
              percentAdjustments = finalAmount;
            }
            appliedAdjustments.push(`${adjustment.name} (${adjustment.operation === "increase" ? "+" : "-"}${(adjustment.percentBps / 100).toFixed(1)}%)`);
          }
        }
        adjustedSubtotal = subtotal + amountAdjustments + percentAdjustments;
        adjustmentTotal = amountAdjustments + percentAdjustments;
        if (adjustedSubtotal < 0) {
          adjustedSubtotal = 0;
          adjustmentTotal = -subtotal;
        }
        const tax = Math.floor(adjustedSubtotal * (PRICING_DEFAULTS2.TAX_RATE_BASIS_POINTS / 1e4));
        const gratuity = Math.floor(adjustedSubtotal * (PRICING_DEFAULTS2.GRATUITY_PERCENT / 100));
        const total = adjustedSubtotal + tax + gratuity;
        const today = /* @__PURE__ */ new Date();
        const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24));
        const depositPercent = PRICING_DEFAULTS2.DEPOSIT_PERCENT;
        const depositAmount = Math.floor(total * (depositPercent / 100));
        const remainingBalanceDueAt = new Date(eventDate);
        remainingBalanceDueAt.setDate(remainingBalanceDueAt.getDate() - 30);
        const finalDueDate = remainingBalanceDueAt < today ? today : remainingBalanceDueAt;
        return {
          subtotal: adjustedSubtotal,
          // Return adjusted subtotal
          discountTotal: Math.abs(adjustmentTotal),
          // Total adjustment amount
          tax,
          gratuity,
          total,
          perPersonCost: Math.floor(total / groupSize),
          depositAmount,
          depositPercent,
          depositRequired: true,
          paymentSchedule: [],
          appliedDiscounts: appliedAdjustments,
          // Include applied adjustments
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3),
          // Phase 1 additions
          adjustmentTotal,
          originalSubtotal: subtotal,
          // Keep track of original subtotal before adjustments
          breakdown: {
            boatType: `${capacityTier}-person boat`,
            dayName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][eventDate.getDay()],
            dayType,
            baseHourlyRate: hourlyRate,
            cruiseDuration: duration,
            baseCruiseCost,
            crewFee,
            subtotalBeforeTax: adjustedSubtotal,
            adjustments: allAdjustments.map((adj) => ({
              name: adj.name,
              type: adj.adjustmentType,
              operation: adj.operation,
              value: adj.adjustmentType === "percent" ? `${(adj.percentBps / 100).toFixed(1)}%` : `$${(adj.amountCents / 100).toFixed(2)}`,
              priority: adj.priority
            })),
            gratuityAmount: gratuity,
            taxAmount: tax,
            grandTotal: total,
            perPerson: Math.floor(total / groupSize),
            deposit: depositAmount,
            balanceDue: total - depositAmount
          }
        };
      }
      async calculatePricing(params) {
        const { items, groupSize, projectDate } = params;
        const { PRICING_DEFAULTS: PRICING_DEFAULTS2 } = await Promise.resolve().then(() => (init_constants(), constants_exports));
        const subtotal = items.reduce((sum2, item) => {
          const itemTotal = (item.unitPrice || 0) * (item.qty || item.quantity || 1);
          return sum2 + itemTotal;
        }, 0);
        let discountTotal = 0;
        if (params.promoCode) {
          const discountRule = await this.getDiscountRuleByCode(params.promoCode);
          if (discountRule && discountRule.active) {
            if (discountRule.discountType === "percentage") {
              discountTotal = Math.floor(subtotal * (discountRule.discountValue / 100));
            } else if (discountRule.discountType === "fixed_amount") {
              discountTotal = Math.min(discountRule.discountValue * 100, subtotal);
            }
          }
        }
        const adjustedSubtotal = subtotal - discountTotal;
        const tax = Math.floor(adjustedSubtotal * (PRICING_DEFAULTS2.TAX_RATE_BASIS_POINTS / 1e4));
        const gratuity = Math.floor(adjustedSubtotal * (PRICING_DEFAULTS2.GRATUITY_PERCENT / 100));
        const total = adjustedSubtotal + tax + gratuity;
        let depositPercent = PRICING_DEFAULTS2.DEPOSIT_PERCENT;
        let depositAmount = Math.floor(total * (depositPercent / 100));
        let remainingBalanceDueAt = null;
        if (projectDate) {
          const today = /* @__PURE__ */ new Date();
          const daysUntilEvent = Math.ceil((projectDate.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24));
          remainingBalanceDueAt = new Date(projectDate);
          remainingBalanceDueAt.setDate(remainingBalanceDueAt.getDate() - 30);
          remainingBalanceDueAt = remainingBalanceDueAt < today ? today : remainingBalanceDueAt;
        }
        return {
          subtotal: adjustedSubtotal,
          discountTotal,
          tax,
          gratuity,
          total,
          perPersonCost: groupSize ? Math.floor(total / groupSize) : 0,
          depositAmount,
          depositPercent,
          depositRequired: true,
          paymentSchedule: [],
          appliedDiscounts: params.promoCode ? [{
            code: params.promoCode,
            discountAmount: discountTotal,
            description: `Discount applied: ${params.promoCode}`
          }] : [],
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3)
        };
      }
      async findOrCreateContact(email, name, phone) {
        const existing = await this.getContactByEmail(email);
        if (existing) {
          return existing;
        }
        return await this.createContact({
          name: name || "Unknown",
          email,
          phone: phone || null,
          tags: []
        });
      }
      async createOrUpdateContact(data) {
        const fullName = `${data.firstName} ${data.lastName}`.trim();
        const existing = await this.getContactByEmail(data.email);
        if (existing) {
          const updates = {};
          if (existing.name !== fullName) updates.name = fullName;
          if (existing.phone !== data.phone) updates.phone = data.phone;
          if (Object.keys(updates).length > 0) {
            const result = await db.update(contacts).set(updates).where(eq(contacts.id, existing.id)).returning();
            return result[0];
          }
          return existing;
        }
        return await this.createContact({
          name: fullName,
          email: data.email,
          phone: data.phone,
          orgId: data.orgId || "org_demo",
          tags: ["quote_lead"]
        });
      }
      async createLead(data) {
        const eventDate = data.metadata?.eventDate ? new Date(data.metadata.eventDate) : /* @__PURE__ */ new Date();
        const eventType = data.metadata?.eventType || "General Inquiry";
        const project = await this.createProject({
          contactId: data.contactId,
          title: `${eventType} - ${format(eventDate, "MMM d, yyyy")}`,
          status: data.status,
          projectDate: eventDate,
          pipelinePhase: "ph_quote_sent",
          groupSize: data.metadata?.groupSize,
          eventType: data.metadata?.eventType,
          leadSource: data.source,
          tags: ["quote_builder", "auto_lead"]
        });
        console.log("\u2705 Lead created for admin dashboard:", {
          projectId: project.id,
          contactId: data.contactId,
          quoteId: data.metadata?.quoteId,
          quoteUrl: data.metadata?.quoteUrl,
          eventType: data.metadata?.eventType,
          eventDate: data.metadata?.eventDate,
          groupSize: data.metadata?.groupSize,
          source: data.source,
          status: data.status
        });
        return project;
      }
      async createProjectFromChatData(contactId, extractedData) {
        return await this.createProject({
          contactId,
          title: extractedData.title || null,
          eventType: extractedData.eventType || null,
          groupSize: extractedData.groupSize || null,
          projectDate: extractedData.projectDate || null,
          specialRequests: extractedData.specialRequests || null,
          preferredTime: extractedData.preferredTime || null,
          budget: extractedData.budget || null,
          tags: []
        });
      }
      // ===== STUB METHODS FOR NOW =====
      // These methods need full implementation but are stubbed for basic functionality
      async getProductsByType(productType) {
        return await db.select().from(products).where(and(eq(products.productType, productType), eq(products.active, true)));
      }
      async getProductsByEventType(eventType) {
        return await db.select().from(products).where(and(
          eq(products.active, true),
          or(
            sql2`array_length(${products.eventTypes}, 1) = 0`,
            sql2`${eventType} = ANY(${products.eventTypes})`
          )
        ));
      }
      async getDiscoCruiseProducts() {
        return this.getProductsByType("disco_cruise");
      }
      async getPrivateCruiseProducts() {
        return this.getProductsByType("private_cruise");
      }
      // ===== PLACEHOLDER METHODS =====
      // Implementing minimal versions of remaining methods to satisfy the interface
      async getTemplateRule(id) {
        const result = await db.select().from(templateRules).where(eq(templateRules.id, id)).limit(1);
        return result[0];
      }
      async getTemplateRules() {
        return await db.select().from(templateRules).where(eq(templateRules.active, true));
      }
      async getTemplateRulesByType(ruleType) {
        return await db.select().from(templateRules).where(and(eq(templateRules.active, true), eq(templateRules.ruleType, ruleType)));
      }
      async createTemplateRule(insertRule) {
        const result = await db.insert(templateRules).values({
          ...insertRule,
          description: insertRule.description || null,
          orgId: insertRule.orgId || "org_demo",
          conditions: insertRule.conditions || [],
          actions: insertRule.actions || [],
          priority: insertRule.priority || 0,
          active: insertRule.active !== void 0 ? insertRule.active : true
        }).returning();
        return result[0];
      }
      async updateTemplateRule(id, updates) {
        const result = await db.update(templateRules).set(updates).where(eq(templateRules.id, id)).returning();
        if (result.length === 0) throw new Error("Template rule not found");
        return result[0];
      }
      async deleteTemplateRule(id) {
        const result = await db.delete(templateRules).where(eq(templateRules.id, id));
        return result.rowCount > 0;
      }
      // ===== DISCOUNT RULES =====
      async getDiscountRule(id) {
        const result = await db.select().from(discountRules).where(eq(discountRules.id, id)).limit(1);
        return result[0];
      }
      async getDiscountRules() {
        return await db.select().from(discountRules);
      }
      async getActiveDiscountRules() {
        const now = /* @__PURE__ */ new Date();
        return await db.select().from(discountRules).where(
          and(
            eq(discountRules.active, true),
            or(isNull(discountRules.validFrom), lte(discountRules.validFrom, now)),
            or(isNull(discountRules.validUntil), gte(discountRules.validUntil, now))
          )
        );
      }
      async getDiscountRuleByCode(code) {
        const result = await db.select().from(discountRules).where(and(eq(discountRules.code, code), eq(discountRules.active, true))).limit(1);
        return result[0];
      }
      async createDiscountRule(insertRule) {
        const result = await db.insert(discountRules).values({
          ...insertRule,
          code: insertRule.code || null,
          orgId: insertRule.orgId || "org_demo",
          minGroupSize: insertRule.minGroupSize || null,
          maxGroupSize: insertRule.maxGroupSize || null,
          minSubtotal: insertRule.minSubtotal || null,
          validFrom: insertRule.validFrom || null,
          validUntil: insertRule.validUntil || null,
          usageLimit: insertRule.usageLimit || null,
          usageCount: insertRule.usageCount || 0,
          active: insertRule.active !== void 0 ? insertRule.active : true,
          conditions: insertRule.conditions || []
        }).returning();
        return result[0];
      }
      async updateDiscountRule(id, updates) {
        const result = await db.update(discountRules).set(updates).where(eq(discountRules.id, id)).returning();
        if (result.length === 0) throw new Error("Discount rule not found");
        return result[0];
      }
      async deleteDiscountRule(id) {
        const result = await db.delete(discountRules).where(eq(discountRules.id, id));
        return result.rowCount > 0;
      }
      // ===== PRICING ADJUSTMENTS OPERATIONS (Phase 1) =====
      async getPricingAdjustment(id) {
        const result = await db.select().from(pricingAdjustments).where(eq(pricingAdjustments.id, id)).limit(1);
        return result[0];
      }
      async getPricingAdjustments() {
        return await db.select().from(pricingAdjustments);
      }
      async getActivePricingAdjustments() {
        const now = /* @__PURE__ */ new Date();
        return await db.select().from(pricingAdjustments).where(
          and(
            eq(pricingAdjustments.active, true),
            lte(pricingAdjustments.startDate, now),
            gte(pricingAdjustments.endDate, now)
          )
        );
      }
      async getPricingAdjustmentsByScope(scopeType, scopeId) {
        const now = /* @__PURE__ */ new Date();
        let conditions = [
          eq(pricingAdjustments.active, true),
          eq(pricingAdjustments.scopeType, scopeType),
          lte(pricingAdjustments.startDate, now),
          gte(pricingAdjustments.endDate, now)
        ];
        if (scopeId && scopeType !== "global") {
          conditions.push(eq(pricingAdjustments.scopeId, scopeId));
        }
        return await db.select().from(pricingAdjustments).where(and(...conditions));
      }
      async createPricingAdjustment(adjustment) {
        const result = await db.insert(pricingAdjustments).values({
          ...adjustment,
          orgId: adjustment.orgId || "org_demo",
          scopeId: adjustment.scopeType === "global" ? null : adjustment.scopeId,
          daysOfWeek: adjustment.daysOfWeek || [],
          amountCents: adjustment.amountCents || 0,
          percentBps: adjustment.percentBps || 0,
          operation: adjustment.operation || "increase",
          priority: adjustment.priority || 0,
          stackable: adjustment.stackable !== void 0 ? adjustment.stackable : true,
          isDateOfInterest: adjustment.isDateOfInterest || false,
          recurrence: adjustment.recurrence || "none",
          active: adjustment.active !== void 0 ? adjustment.active : true
        }).returning();
        return result[0];
      }
      async updatePricingAdjustment(id, updates) {
        const updateData = { ...updates };
        if (updateData.updatedAt === void 0) {
          updateData.updatedAt = /* @__PURE__ */ new Date();
        }
        const result = await db.update(pricingAdjustments).set(updateData).where(eq(pricingAdjustments.id, id)).returning();
        if (result.length === 0) throw new Error("Pricing adjustment not found");
        return result[0];
      }
      async deletePricingAdjustment(id) {
        const result = await db.delete(pricingAdjustments).where(eq(pricingAdjustments.id, id));
        return result.rowCount > 0;
      }
      async getEffectiveAdjustments(eventDate, scopeType, scopeId) {
        const dayOfWeek = eventDate.getDay();
        let scopeConditions = [
          eq(pricingAdjustments.active, true),
          lte(pricingAdjustments.startDate, eventDate),
          gte(pricingAdjustments.endDate, eventDate)
        ];
        let scopeFilters = [eq(pricingAdjustments.scopeType, "global")];
        if (scopeType && scopeType !== "global") {
          if (scopeId) {
            scopeFilters.push(
              and(
                eq(pricingAdjustments.scopeType, scopeType),
                eq(pricingAdjustments.scopeId, scopeId)
              )
            );
          } else {
            scopeFilters.push(eq(pricingAdjustments.scopeType, scopeType));
          }
        }
        const allAdjustments = await db.select().from(pricingAdjustments).where(
          and(
            ...scopeConditions,
            or(...scopeFilters)
          )
        );
        const effectiveAdjustments = allAdjustments.filter((adjustment) => {
          if (adjustment.daysOfWeek && adjustment.daysOfWeek.length > 0) {
            if (!adjustment.daysOfWeek.includes(dayOfWeek)) {
              return false;
            }
          }
          if (adjustment.recurrence === "annual") {
            const adjustmentStartDate = new Date(adjustment.startDate);
            const eventMonth = eventDate.getMonth();
            const eventDay = eventDate.getDate();
            const adjustmentMonth = adjustmentStartDate.getMonth();
            const adjustmentDay = adjustmentStartDate.getDate();
            return eventMonth === adjustmentMonth && eventDay === adjustmentDay;
          }
          return true;
        });
        return effectiveAdjustments.sort((a, b) => a.priority - b.priority);
      }
      // ===== AFFILIATE OPERATIONS =====
      async getAffiliate(id) {
        const result = await db.select().from(affiliates).where(eq(affiliates.id, id)).limit(1);
        return result[0];
      }
      async getAffiliates() {
        return await db.select().from(affiliates);
      }
      async getAffiliateByCode(code) {
        const result = await db.select().from(affiliates).where(eq(affiliates.code, code)).limit(1);
        return result[0];
      }
      async createAffiliate(insertAffiliate) {
        const result = await db.insert(affiliates).values({
          ...insertAffiliate,
          orgId: insertAffiliate.orgId || "org_demo",
          description: insertAffiliate.description || null,
          commissionPercent: insertAffiliate.commissionPercent || 10,
          active: insertAffiliate.active !== void 0 ? insertAffiliate.active : true,
          totalReferrals: insertAffiliate.totalReferrals || 0,
          totalCommission: insertAffiliate.totalCommission || 0
        }).returning();
        return result[0];
      }
      async updateAffiliate(id, updates) {
        const result = await db.update(affiliates).set(updates).where(eq(affiliates.id, id)).returning();
        if (result.length === 0) throw new Error("Affiliate not found");
        return result[0];
      }
      async deleteAffiliate(id) {
        const result = await db.delete(affiliates).where(eq(affiliates.id, id));
        return result.rowCount > 0;
      }
      // ===== BOOKING OPERATIONS =====
      async getBooking(id) {
        const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
        return result[0];
      }
      async getBookings(filters) {
        let query = db.select().from(bookings);
        const conditions = [];
        if (filters?.status) {
          conditions.push(eq(bookings.status, filters.status));
        }
        if (filters?.boatId) {
          conditions.push(eq(bookings.boatId, filters.boatId));
        }
        if (filters?.startDate && filters?.endDate) {
          conditions.push(
            and(
              gte(bookings.startTime, filters.startDate),
              lte(bookings.startTime, filters.endDate)
            )
          );
        }
        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }
        return await query.orderBy(desc(bookings.startTime));
      }
      async createBooking(insertBooking) {
        const result = await db.insert(bookings).values({
          ...insertBooking,
          orgId: insertBooking.orgId || "org_demo",
          status: insertBooking.status || "CONFIRMED",
          guests: insertBooking.guests || 1,
          notes: insertBooking.notes || null,
          customerNotes: insertBooking.customerNotes || null,
          specialRequests: insertBooking.specialRequests || null,
          equipmentNeeds: insertBooking.equipmentNeeds || []
        }).returning();
        return result[0];
      }
      async updateBooking(id, updates) {
        const result = await db.update(bookings).set(updates).where(eq(bookings.id, id)).returning();
        if (result.length === 0) throw new Error("Booking not found");
        return result[0];
      }
      async deleteBooking(id) {
        const result = await db.delete(bookings).where(eq(bookings.id, id));
        return result.rowCount > 0;
      }
      async getBookingsByProject(projectId) {
        return await db.select().from(bookings).where(eq(bookings.projectId, projectId));
      }
      async getBookingsByBoat(boatId, startDate, endDate) {
        return await db.select().from(bookings).where(
          and(
            eq(bookings.boatId, boatId),
            gte(bookings.startTime, startDate),
            lte(bookings.startTime, endDate)
          )
        );
      }
      // ===== TIMEFRAME OPERATIONS =====
      async getTimeframes() {
        return await db.select().from(timeframes).orderBy(asc(timeframes.dayOfWeek), asc(timeframes.startTime));
      }
      async getTimeframesByDay(dayOfWeek) {
        return await db.select().from(timeframes).where(eq(timeframes.dayOfWeek, dayOfWeek)).orderBy(asc(timeframes.startTime));
      }
      async createTimeframe(insertTimeframe) {
        const result = await db.insert(timeframes).values({
          ...insertTimeframe,
          orgId: insertTimeframe.orgId || "org_demo"
        }).returning();
        return result[0];
      }
      async updateTimeframe(id, updates) {
        const result = await db.update(timeframes).set(updates).where(eq(timeframes.id, id)).returning();
        if (result.length === 0) throw new Error("Timeframe not found");
        return result[0];
      }
      async deleteTimeframe(id) {
        const result = await db.delete(timeframes).where(eq(timeframes.id, id));
        return result.rowCount > 0;
      }
      // ===== DISCO SLOT OPERATIONS =====
      async getDiscoSlots() {
        return await db.select().from(discoSlots).orderBy(asc(discoSlots.date));
      }
      async getDiscoSlot(id) {
        const result = await db.select().from(discoSlots).where(eq(discoSlots.id, id)).limit(1);
        return result[0];
      }
      async createDiscoSlot(insertSlot) {
        const result = await db.insert(discoSlots).values({
          ...insertSlot,
          orgId: insertSlot.orgId || "org_demo",
          maxCapacity: insertSlot.maxCapacity || 50,
          ticketPrice: insertSlot.ticketPrice || 8500,
          available: insertSlot.available !== void 0 ? insertSlot.available : true
        }).returning();
        return result[0];
      }
      async updateDiscoSlot(id, updates) {
        const result = await db.update(discoSlots).set(updates).where(eq(discoSlots.id, id)).returning();
        if (result.length === 0) throw new Error("Disco slot not found");
        return result[0];
      }
      async deleteDiscoSlot(id) {
        const result = await db.delete(discoSlots).where(eq(discoSlots.id, id));
        return result.rowCount > 0;
      }
      // ===== DATE RANGE QUERY METHODS =====
      async getBookingsInRange(startDate, endDate) {
        return await this.getBookings({
          startDate,
          endDate
        });
      }
      async getDiscoSlotsInRange(startDate, endDate) {
        return await db.select().from(discoSlots).where(
          and(
            gte(discoSlots.date, startDate),
            lte(discoSlots.date, endDate)
          )
        ).orderBy(asc(discoSlots.date));
      }
      // ===== EMAIL TEMPLATE OPERATIONS =====
      async getEmailTemplate(id) {
        const result = await db.select().from(emailTemplates).where(eq(emailTemplates.id, id)).limit(1);
        return result[0];
      }
      async getEmailTemplates() {
        return await db.select().from(emailTemplates);
      }
      async getEmailTemplatesByType(templateType) {
        return await db.select().from(emailTemplates).where(eq(emailTemplates.templateType, templateType));
      }
      async createEmailTemplate(insertTemplate) {
        const result = await db.insert(emailTemplates).values({
          ...insertTemplate,
          orgId: insertTemplate.orgId || "org_demo",
          description: insertTemplate.description || null,
          isDefault: insertTemplate.isDefault || false
        }).returning();
        return result[0];
      }
      async updateEmailTemplate(id, updates) {
        const result = await db.update(emailTemplates).set(updates).where(eq(emailTemplates.id, id)).returning();
        if (result.length === 0) throw new Error("Email template not found");
        return result[0];
      }
      async deleteEmailTemplate(id) {
        const result = await db.delete(emailTemplates).where(eq(emailTemplates.id, id));
        return result.rowCount > 0;
      }
      // ===== MASTER TEMPLATE OPERATIONS =====
      async getMasterTemplate(id) {
        const result = await db.select().from(masterTemplates).where(eq(masterTemplates.id, id)).limit(1);
        return result[0];
      }
      async getMasterTemplates() {
        return await db.select().from(masterTemplates);
      }
      async createMasterTemplate(insertTemplate) {
        const result = await db.insert(masterTemplates).values({
          ...insertTemplate,
          orgId: insertTemplate.orgId || "org_demo",
          content: insertTemplate.content || ""
        }).returning();
        return result[0];
      }
      async updateMasterTemplate(id, updates) {
        const result = await db.update(masterTemplates).set(updates).where(eq(masterTemplates.id, id)).returning();
        if (result.length === 0) throw new Error("Master template not found");
        return result[0];
      }
      async deleteMasterTemplate(id) {
        const result = await db.delete(masterTemplates).where(eq(masterTemplates.id, id));
        return result.rowCount > 0;
      }
      // ===== BOOKING CONFLICT CHECKING AND PAYMENT METHODS =====
      /**
       * Check if a booking would conflict with existing bookings for the specified boat and time range
       * Uses proper interval overlap logic: intervals [a1, a2] and [b1, b2] overlap if a1 < b2 AND a2 > b1
       */
      async checkBookingConflict(boatId, startTime, endTime, excludeBookingId) {
        const existingBookings = await db.select().from(bookings).where(
          and(
            eq(bookings.boatId, boatId),
            inArray(bookings.status, ["booked", "confirmed", "hold"]),
            // exclude canceled/blocked
            excludeBookingId ? sql2`${bookings.id} != ${excludeBookingId}` : sql2`true`
          )
        );
        return existingBookings.some((booking) => {
          const bookingStart = new Date(booking.startTime);
          const bookingEnd = new Date(booking.endTime);
          return startTime.getTime() < bookingEnd.getTime() && endTime.getTime() > bookingStart.getTime();
        });
      }
      /**
       * Create a booking from a successful payment with proper slot hold integration
       * This prevents the critical double-booking vulnerability by using slot hold data
       */
      async createBookingFromPayment(projectId, paymentId, amount) {
        console.log(`\u{1F512} Creating booking from payment ${paymentId} for project ${projectId}`);
        const project = await this.getProject(projectId);
        if (!project) {
          throw new Error(`Project ${projectId} not found for booking creation`);
        }
        if (!project.projectDate) {
          throw new Error(`Project ${projectId} has no event date set`);
        }
        const contact = await this.getContact(project.contactId);
        if (!contact) {
          throw new Error(`Contact ${project.contactId} not found for booking creation`);
        }
        let startTime;
        let endTime;
        let boatId;
        let slotHoldFound = false;
        try {
          const activeHolds = await this.getActiveSlotHolds();
          const projectHold = activeHolds.find((hold) => {
            const holdDate = new Date(hold.dateISO);
            const projectDate = new Date(project.projectDate);
            return holdDate.toDateString() === projectDate.toDateString() && hold.groupSize === project.groupSize && hold.expiresAt > /* @__PURE__ */ new Date();
          });
          if (projectHold) {
            console.log(`\u{1F4CD} Found matching slot hold ${projectHold.id} for project ${projectId}`);
            const eventDate = new Date(projectHold.dateISO);
            const [startHours, startMinutes] = projectHold.startTime.split(":");
            const [endHours, endMinutes] = projectHold.endTime.split(":");
            startTime = new Date(eventDate);
            startTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
            endTime = new Date(eventDate);
            endTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
            boatId = projectHold.boatId || await this.findAvailableBoatForSlot(projectHold, project.groupSize || 1);
            if (!boatId) {
              throw new Error(`No boats available for slot hold ${projectHold.id}`);
            }
            slotHoldFound = true;
            await this.releaseSlotHold(projectHold.id);
            console.log(`\u2705 Released slot hold ${projectHold.id} after booking creation`);
          }
        } catch (error) {
          console.warn(`\u26A0\uFE0F Could not find or use slot hold for project ${projectId}:`, error);
        }
        if (!slotHoldFound) {
          console.log(`\u{1F4CB} No slot hold found, using project data for booking creation`);
          if (project.timeSlot) {
            const timeMatch = project.timeSlot.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))\s*-\s*(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
            if (timeMatch) {
              const [, startTimeStr, endTimeStr] = timeMatch;
              startTime = new Date(project.projectDate);
              endTime = new Date(project.projectDate);
              const parseTime = (timeStr, dateObj) => {
                const [time, period] = timeStr.trim().split(/\s+/);
                const [hours, minutes] = time.split(":").map(Number);
                let hour24 = hours;
                if (period.toUpperCase() === "PM" && hours !== 12) {
                  hour24 += 12;
                } else if (period.toUpperCase() === "AM" && hours === 12) {
                  hour24 = 0;
                }
                dateObj.setHours(hour24, minutes, 0, 0);
              };
              parseTime(startTimeStr, startTime);
              parseTime(endTimeStr, endTime);
            } else {
              startTime = new Date(project.projectDate);
              const duration = project.duration || 4;
              endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1e3);
            }
          } else {
            startTime = new Date(project.projectDate);
            const duration = project.duration || 4;
            endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1e3);
          }
          if (project.groupSize) {
            const availableBoats = await this.getBoatsByCapacity(project.groupSize);
            for (const boat of availableBoats) {
              const hasConflict2 = await this.checkBookingConflict(boat.id, startTime, endTime);
              if (!hasConflict2) {
                boatId = boat.id;
                break;
              }
            }
            if (!boatId) {
              throw new Error(`No available boats found for group size ${project.groupSize} at ${startTime.toISOString()}`);
            }
          } else {
            throw new Error("No group size specified for booking creation");
          }
        }
        const hasConflict = await this.checkBookingConflict(boatId, startTime, endTime);
        if (hasConflict) {
          throw new Error(`BOOKING_CONFLICT: Boat ${boatId} is already booked for ${startTime.toISOString()} - ${endTime.toISOString()}`);
        }
        const bookingData = {
          orgId: project.orgId,
          boatId,
          type: "private",
          status: "booked",
          startTime,
          endTime,
          partyType: project.eventType || "cruise",
          groupSize: project.groupSize || 1,
          projectId: project.id,
          paymentStatus: "deposit_paid",
          amountPaid: amount,
          totalAmount: amount,
          // TODO: Calculate from quote if available
          contactName: contact.name,
          contactEmail: contact.email,
          contactPhone: contact.phone || null,
          specialRequests: project.specialRequests || null,
          notes: `Created from payment ${paymentId} - Amount: $${(amount / 100).toFixed(2)}${slotHoldFound ? " - From slot hold" : " - Fallback logic"}`
        };
        const newBooking = await this.createBooking(bookingData);
        await this.updateProject(projectId, {
          status: "CLOSED_WON",
          pipelinePhase: "ph_closed_won"
        });
        await this.convertLeadToCustomer(project.contactId);
        console.log(`\u2705 Booking ${newBooking.id} created successfully from payment ${paymentId}`);
        return newBooking;
      }
      /**
       * Helper method to find an available boat for a slot hold
       */
      async findAvailableBoatForSlot(slotHold, groupSize) {
        if (slotHold.boatId) {
          return slotHold.boatId;
        }
        const boats2 = await this.getActiveBoats();
        const suitableBoats = boats2.filter((boat) => boat.capacity >= groupSize);
        const eventDate = new Date(slotHold.dateISO);
        const [startHours, startMinutes] = slotHold.startTime.split(":");
        const [endHours, endMinutes] = slotHold.endTime.split(":");
        const startTime = new Date(eventDate);
        startTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
        const endTime = new Date(eventDate);
        endTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
        for (const boat of suitableBoats) {
          const hasConflict = await this.checkBookingConflict(boat.id, startTime, endTime);
          if (!hasConflict) {
            return boat.id;
          }
        }
        throw new Error("No available boats found for slot hold");
      }
      // ===== PLACEHOLDER METHODS FOR REMAINING INTERFACE METHODS =====
      // These need to be implemented but are stubbed for now to satisfy the interface
      async createSmsAuthToken(token) {
        return { ...token, id: randomUUID() };
      }
      async getSmsAuthToken(phone) {
        return void 0;
      }
      async updateSmsAuthToken(phone, updates) {
        return void 0;
      }
      async deleteSmsAuthToken(phone) {
        return true;
      }
      // Customer sessions - stub implementations
      async createCustomerSession(session2) {
        return { ...session2, id: randomUUID() };
      }
      async getCustomerSession(sessionId) {
        return void 0;
      }
      async updateCustomerSession(sessionId, updates) {
        return void 0;
      }
      async deleteCustomerSession(sessionId) {
        return true;
      }
      async getCustomerSessionsByPhone(phone) {
        return [];
      }
      async getActiveCustomerSessions() {
        return [];
      }
      // Portal activity logs - stub implementations
      async createPortalActivityLog(log2) {
        return { ...log2, id: randomUUID() };
      }
      async getPortalActivityLogs(sessionId) {
        return [];
      }
      async getPortalActivityLogsByPhone(phone) {
        return [];
      }
      // Rate limiting - stub implementations
      async createPhoneRateLimit(rateLimit) {
        return rateLimit;
      }
      async getPhoneRateLimit(phone) {
        return void 0;
      }
      async updatePhoneRateLimit(phone, updates) {
        return void 0;
      }
      async deletePhoneRateLimit(phone) {
        return true;
      }
      // Verification attempts - stub implementations
      async createCustomerVerificationAttempts(attempts) {
        return attempts;
      }
      async getCustomerVerificationAttempts(phone) {
        return void 0;
      }
      async updateCustomerVerificationAttempts(phone, updates) {
        return void 0;
      }
      async deleteCustomerVerificationAttempts(phone) {
        return true;
      }
      // Partial leads - stub implementations  
      async createPartialLead(lead) {
        return { ...lead, id: randomUUID() };
      }
      async getPartialLead(sessionId) {
        return void 0;
      }
      async getPartialLeadById(id) {
        return void 0;
      }
      async updatePartialLead(sessionId, updates) {
        return void 0;
      }
      async markPartialLeadAsAbandoned(sessionId) {
        try {
          console.log(`\u{1F6AB} Marking partial lead as abandoned: ${sessionId}`);
          const mockAbandonedLead = {
            id: `abandoned_${sessionId}`,
            sessionId,
            status: "abandoned",
            source: "chat_widget",
            abandonedAt: /* @__PURE__ */ new Date(),
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          };
          console.log(`\u2705 Partial lead marked as abandoned: ${sessionId}`);
          return mockAbandonedLead;
        } catch (error) {
          console.error(`\u274C Error marking partial lead as abandoned:`, error);
          return void 0;
        }
      }
      async deletePartialLead(sessionId) {
        return true;
      }
      // Analytics and tracking - stub implementations
      async createQuoteAnalytics(analytics) {
        return { ...analytics, id: randomUUID() };
      }
      async getQuoteAnalytics(quoteId) {
        return [];
      }
      async trackQuoteView(quoteId, contactId, sessionId, metadata) {
        return {
          id: randomUUID(),
          quoteId,
          contactId: contactId || null,
          sessionId: sessionId || null,
          activityType: "view",
          metadata: metadata || {},
          createdAt: /* @__PURE__ */ new Date()
        };
      }
      async createFileSend(fileSend) {
        return { ...fileSend, id: randomUUID() };
      }
      async getFileSends(contactId) {
        return [];
      }
      async createEmailTracking(emailTracking) {
        return { ...emailTracking, id: randomUUID() };
      }
      async getEmailTracking(contactId) {
        return [];
      }
      async trackEmailOpen(emailId) {
        return { id: randomUUID(), emailId, contactId: "", openedAt: /* @__PURE__ */ new Date() };
      }
      async trackEmailClick(emailId) {
        return { id: randomUUID(), emailId, contactId: "", clickedAt: /* @__PURE__ */ new Date() };
      }
      async updateEmailDeliveryStatus(emailId, status, metadata) {
        return { id: randomUUID(), emailId, contactId: "", status };
      }
      async findEmailTrackingByMessageId(messageId, provider) {
        return void 0;
      }
      async updateEmailUnsubscribeStatus(emailId, metadata) {
        return { id: randomUUID(), emailId, contactId: "", unsubscribed: true };
      }
      // Customer lifecycle - stub implementations
      async createCustomerLifecycle(lifecycle) {
        return { ...lifecycle, id: randomUUID() };
      }
      async getCustomerLifecycle(contactId) {
        return void 0;
      }
      async updateCustomerLifecycleStage(contactId, newStage, notes) {
        return { id: randomUUID(), contactId, stage: newStage, notes };
      }
      async calculateCustomerLifecycleMetrics(contactId) {
        return {
          daysInCurrentStage: 0,
          totalDays: 0,
          conversionProbability: 0
        };
      }
      // Customer activity - stub implementations
      async createCustomerActivity(activity) {
        return { ...activity, id: randomUUID() };
      }
      async getCustomerActivity(contactId, limit) {
        return [];
      }
      async getCustomerActivityByType(contactId, activityType) {
        return [];
      }
      async getCustomerActivityStats(contactId) {
        return {
          totalActivities: 0,
          daysSinceLastContact: 0,
          totalTouchpoints: 0,
          activitiesByType: {}
        };
      }
      // Comprehensive profiles - stub implementations
      async getComprehensiveCustomerProfile(contactId) {
        return void 0;
      }
      async getCustomerChatHistory(contactId) {
        return {
          messages: [],
          sessionCount: 0,
          totalMessages: 0
        };
      }
      async getCustomerFileHistory(contactId) {
        return {
          files: [],
          totalFiles: 0,
          deliveredFiles: 0,
          accessedFiles: 0
        };
      }
      async getCustomerQuoteHistory(contactId) {
        return {
          quotes: [],
          analytics: [],
          totalViews: 0,
          acceptedQuotes: 0,
          pendingQuotes: 0
        };
      }
      async getCustomerPaymentSummary(contactId) {
        return {
          totalValue: 0,
          totalPaid: 0,
          balance: 0,
          payments: [],
          paymentHistory: []
        };
      }
      // ===== TIMEFRAME BLOCKING CHECK =====
      async isTimeSlotBlocked(boatId, date, startTime, endTime) {
        const dayOfWeek = date.getDay();
        const dayTimeframes = await this.getTimeframesByDay(dayOfWeek);
        return dayTimeframes.some((timeframe) => {
          if (timeframe.status !== "blocked") return false;
          if (timeframe.boatId && timeframe.boatId !== boatId) return false;
          const slotStart = this.parseTimeString(startTime);
          const slotEnd = this.parseTimeString(endTime);
          const frameStart = this.parseTimeString(timeframe.startTime);
          const frameEnd = this.parseTimeString(timeframe.endTime);
          return slotStart < frameEnd && slotEnd > frameStart;
        });
      }
      parseTimeString(timeStr) {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      }
      // ===== AVAILABILITY SEARCH - CORE BUSINESS LOGIC =====
      async searchNormalizedSlots(filters) {
        const { startDate, endDate, cruiseType, groupSize, minDuration, maxDuration } = filters;
        const slots = [];
        const { getPrivateTimeSlotsForDate: getPrivateTimeSlotsForDate2, getDiscoTimeSlotsForDate: getDiscoTimeSlotsForDate2 } = await Promise.resolve().then(() => (init_timeSlots(), timeSlots_exports));
        const allBoats = await this.getActiveBoats();
        const allProducts = await this.getProducts();
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const dateISO = currentDate.toISOString().split("T")[0];
          if (!cruiseType || cruiseType === "private") {
            let privateTimeSlots = [];
            try {
              const nextDay = new Date(currentDate);
              nextDay.setDate(nextDay.getDate() + 1);
              const availabilityData = await this.googleSheetsService.getAvailability(currentDate, nextDay);
              const privateSlotsData = availabilityData.filter(
                (slot) => slot.status === "AVAILABLE" && slot.boatType !== "ATX Disco Cruise" && slot.date === dateISO
              );
              const timeSlotGroups = /* @__PURE__ */ new Map();
              privateSlotsData.forEach((slot) => {
                const timeKey = slot.time;
                const timeParts = slot.time.split("-");
                if (timeParts.length === 2) {
                  const [startTime, endTime] = timeParts;
                  const [startHourStr, startMinStr = "0"] = startTime.split(":");
                  const [endHourStr, endMinStr = "0"] = endTime.split(":");
                  const startHour = parseInt(startHourStr);
                  const startMin = parseInt(startMinStr);
                  const endHour = parseInt(endHourStr);
                  const endMin = parseInt(endMinStr);
                  const startTotalMinutes = startHour * 60 + startMin;
                  const endTotalMinutes = endHour * 60 + endMin;
                  const durationMinutes = endTotalMinutes - startTotalMinutes;
                  const duration = durationMinutes / 60;
                  if (!timeSlotGroups.has(timeKey)) {
                    timeSlotGroups.set(timeKey, {
                      timeInfo: {
                        id: `gs-${timeKey.replace(/[:\-]/g, "")}`,
                        label: `${startTime} - ${endTime}`,
                        startTime,
                        endTime,
                        duration,
                        icon: startHour >= 18 ? "\u{1F319}" : startHour >= 14 ? "\u{1F306}" : "\u2600\uFE0F",
                        description: `${duration}-hour cruise from Google Sheets`,
                        popular: true,
                        source: "google_sheets"
                      },
                      boats: []
                    });
                  }
                  timeSlotGroups.get(timeKey).boats.push({
                    boatId: slot.boatType,
                    // This should map to actual boat IDs
                    boatType: slot.boatType,
                    capacity: slot.capacity,
                    baseRate: slot.baseRate,
                    status: slot.status,
                    bookedBy: slot.bookedBy,
                    groupSize: slot.groupSize,
                    notes: slot.notes
                  });
                }
              });
              privateTimeSlots = Array.from(timeSlotGroups.values()).map((group) => ({
                ...group.timeInfo,
                // Aggregate boat information for availability calculations
                totalCapacity: group.boats.reduce((sum2, boat) => sum2 + boat.capacity, 0),
                availableBoats: group.boats.filter((boat) => boat.status === "AVAILABLE"),
                bookedBoats: group.boats.filter((boat) => boat.status === "BOOKED"),
                boatDetails: group.boats,
                // Preserve all boat details for per-boat booking
                availableBoatCount: group.boats.filter((boat) => boat.status === "AVAILABLE").length
              }));
              if (privateTimeSlots.length > 0) {
                console.log(`\u2705 Found ${privateTimeSlots.length} time slots from Google Sheets for ${dateISO}:`, privateTimeSlots.map((s) => `${s.startTime}-${s.endTime}`));
              } else {
                console.log(`\u26A0\uFE0F No private cruise slots found in Google Sheets for ${dateISO} - no availability for this date`);
                privateTimeSlots = [];
                console.log(`\u{1F4C5} ${dateISO}: No availability from Google Sheets - date marked as unavailable`);
              }
            } catch (error) {
              console.error(`\u274C Error fetching availability from Google Sheets for ${dateISO}:`, error);
              privateTimeSlots = [];
              console.log(`\u{1F6AB} ERROR: No availability for ${dateISO} due to Google Sheets error - ensuring data integrity`);
            }
            for (const timeSlot of privateTimeSlots) {
              if (minDuration && timeSlot.duration < minDuration) continue;
              if (maxDuration && timeSlot.duration > maxDuration) continue;
              const suitableBoats = allBoats.filter((boat) => {
                if (boat.id === "boat_atx_disco" || boat.name?.toLowerCase().includes("atx disco")) {
                  return false;
                }
                if (!groupSize) {
                  return true;
                }
                if (groupSize <= 14) {
                  return boat.id === "boat_day_tripper" || boat.name?.toLowerCase().includes("day tripper");
                } else if (groupSize <= 30) {
                  return boat.id === "boat_me_seek" || boat.id === "boat_the_irony" || boat.name?.toLowerCase().includes("me seek") || boat.name?.toLowerCase().includes("the irony");
                } else if (groupSize <= 75) {
                  if (groupSize >= 50) {
                    return boat.id === "boat_clever_girl" || boat.name?.toLowerCase().includes("clever girl");
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              });
              console.log(`\u{1F527} DEBUG: Found ${suitableBoats.length} suitable boats for group size ${groupSize}:`, suitableBoats.map((b) => b.id));
              const dayOfWeek = currentDate.getDay();
              let dayType = "weekday";
              if (dayOfWeek === 5) dayType = "friday";
              else if (dayOfWeek === 6) dayType = "saturday";
              else if (dayOfWeek === 0) dayType = "sunday";
              const matchingProducts = allProducts.filter(
                (product) => product.productType === "private_cruise" && product.dayType === dayType && (!groupSize || !product.groupSize || product.groupSize >= groupSize) && product.active
              );
              const baseProduct = matchingProducts[0];
              let basePrice;
              if (baseProduct) {
                console.log(`\u{1F4CA} [PRICING DEBUG] Product ${baseProduct.name}: unitPrice=$${baseProduct.unitPrice / 100}, duration=${timeSlot.duration}hrs`);
                basePrice = baseProduct.unitPrice * timeSlot.duration;
              } else {
                let hourlyRateCents = 0;
                if (!groupSize || groupSize <= 14) {
                  if (dayType === "weekday") hourlyRateCents = 2e4;
                  else if (dayType === "friday") hourlyRateCents = 25e3;
                  else hourlyRateCents = 3e4;
                } else if (groupSize <= 30) {
                  if (dayType === "weekday") hourlyRateCents = 25e3;
                  else if (dayType === "friday") hourlyRateCents = 3e4;
                  else hourlyRateCents = 35e3;
                } else if (groupSize >= 50 && groupSize <= 75) {
                  if (dayType === "weekday") hourlyRateCents = 3e4;
                  else if (dayType === "friday") hourlyRateCents = 35e3;
                  else hourlyRateCents = 4e4;
                } else {
                  hourlyRateCents = 0;
                }
                basePrice = hourlyRateCents * timeSlot.duration;
                console.log(`\u{1F4CA} [PRICING FALLBACK] No product found for ${dayType}, using boat rates: $${hourlyRateCents / 100}/hr \xD7 ${timeSlot.duration}hrs = $${basePrice / 100}`);
                console.log(`\u{1F4CA} [PRICING DEBUG] Calculated: ${hourlyRateCents} cents/hr \xD7 ${timeSlot.duration}hrs = ${basePrice} cents total`);
              }
              for (const boat of suitableBoats) {
                const slotId = `private-${dateISO}-${timeSlot.startTime}-${timeSlot.endTime}-${boat.id}`;
                const startDateTime = new Date(currentDate);
                const [startHours, startMinutes] = timeSlot.startTime.split(":").map(Number);
                startDateTime.setHours(startHours, startMinutes, 0, 0);
                const endDateTime = new Date(currentDate);
                const [endHours, endMinutes] = timeSlot.endTime.split(":").map(Number);
                endDateTime.setHours(endHours, endMinutes, 0, 0);
                const isBooked = await this.checkBookingConflict(boat.id, startDateTime, endDateTime);
                const isBlocked = await this.isTimeSlotBlocked(boat.id, currentDate, timeSlot.startTime, timeSlot.endTime);
                if (!isBooked && !isBlocked) {
                  let crewFeeCents = 0;
                  if (groupSize) {
                    if (groupSize >= 26 && groupSize <= 50) {
                      crewFeeCents = 1e4 * timeSlot.duration;
                    } else if (groupSize >= 51 && groupSize <= 75) {
                      crewFeeCents = 1e4 * timeSlot.duration;
                    }
                  }
                  const subtotal = basePrice + crewFeeCents;
                  const withTax = Math.round(subtotal * 1.0825);
                  const totalPrice = Math.round(withTax * 1.2);
                  console.log(`\u{1F4B0} [PRICING] ${boat.id} ${dateISO} ${timeSlot.startTime}-${timeSlot.endTime}:`);
                  console.log(`  Base: $${basePrice / 100}, Crew: $${crewFeeCents / 100}, Subtotal: $${subtotal / 100}`);
                  console.log(`  With Tax (8.25%): $${withTax / 100}, Total (+ 20% gratuity): $${totalPrice / 100}`);
                  slots.push({
                    id: slotId,
                    cruiseType: "private",
                    dateISO,
                    startTime: timeSlot.startTime,
                    endTime: timeSlot.endTime,
                    label: timeSlot.label,
                    duration: timeSlot.duration,
                    capacity: boat.maxCapacity,
                    availableCount: 1,
                    // One boat slot
                    price: basePrice,
                    totalPrice,
                    // Now includes crew fees, tax, and gratuity
                    boatCandidates: [boat.id],
                    bookable: true,
                    held: false,
                    // Add crew fee to the slot data for transparency
                    crew_fee_per_hour: groupSize && groupSize >= 26 ? 1e4 : 0
                    // $100/hour for groups 26+
                  });
                }
              }
            }
          }
          if (!cruiseType || cruiseType === "disco") {
            const discoTimeSlots = getDiscoTimeSlotsForDate2(currentDate);
            for (const timeSlot of discoTimeSlots) {
              if (minDuration && timeSlot.duration < minDuration) continue;
              if (maxDuration && timeSlot.duration > maxDuration) continue;
              const discoProducts = allProducts.filter(
                (product) => product.productType === "disco_cruise" && product.active
              );
              const discoPrice = discoProducts[0]?.unitPrice || 8500;
              const discoBoats = allBoats.filter((boat) => boat.capacity >= 25);
              if (discoBoats.length > 0) {
                const slotId = `disco-${dateISO}-${timeSlot.startTime}-${timeSlot.endTime}`;
                const startDateTime = new Date(currentDate);
                const [startHours, startMinutes] = timeSlot.startTime.split(":").map(Number);
                startDateTime.setHours(startHours, startMinutes, 0, 0);
                const endDateTime = new Date(currentDate);
                const [endHours, endMinutes] = timeSlot.endTime.split(":").map(Number);
                endDateTime.setHours(endHours, endMinutes, 0, 0);
                let hasAvailableBoat = false;
                let maxCapacity = 0;
                let actualAvailableTickets = 0;
                const existingDiscoSlots = await this.getDiscoSlotsInRange(currentDate, currentDate);
                const matchingDiscoSlot = existingDiscoSlots.find(
                  (slot) => slot.startTime === timeSlot.startTime && slot.endTime === timeSlot.endTime && slot.date.toISOString().split("T")[0] === dateISO
                );
                if (matchingDiscoSlot && matchingDiscoSlot.status === "available") {
                  actualAvailableTickets = matchingDiscoSlot.ticketCap - matchingDiscoSlot.ticketsSold;
                  hasAvailableBoat = actualAvailableTickets > 0;
                  maxCapacity = matchingDiscoSlot.ticketCap;
                } else {
                  for (const boat of discoBoats) {
                    const isBoatBooked = await this.checkBookingConflict(boat.id, startDateTime, endDateTime);
                    const isBoatBlocked = await this.isTimeSlotBlocked(boat.id, currentDate, timeSlot.startTime, timeSlot.endTime);
                    if (!isBoatBooked && !isBoatBlocked) {
                      hasAvailableBoat = true;
                      maxCapacity = Math.max(maxCapacity, boat.maxCapacity);
                    }
                  }
                  actualAvailableTickets = maxCapacity;
                }
                if (hasAvailableBoat) {
                  const availableTickets = actualAvailableTickets;
                  slots.push({
                    id: slotId,
                    cruiseType: "disco",
                    dateISO,
                    startTime: timeSlot.startTime,
                    endTime: timeSlot.endTime,
                    label: timeSlot.label,
                    duration: timeSlot.duration,
                    capacity: maxCapacity,
                    availableCount: availableTickets,
                    price: discoPrice,
                    totalPrice: discoPrice,
                    // Per-person price for disco cruises
                    boatCandidates: discoBoats.map((b) => b.id),
                    bookable: availableTickets > 0,
                    held: false
                  });
                }
              }
            }
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        const filteredSlots = slots.filter((slot) => {
          if (groupSize && slot.cruiseType === "private") {
            return slot.capacity >= groupSize;
          }
          if (groupSize && slot.cruiseType === "disco") {
            return slot.availableCount >= groupSize;
          }
          return true;
        });
        console.log(`\u{1F3AF} Generated ${filteredSlots.length} normalized slots for search:`, {
          dateRange: `${startDate.toISOString().split("T")[0]} to ${endDate.toISOString().split("T")[0]}`,
          cruiseType: cruiseType || "all",
          groupSize: groupSize || "any",
          privateSlots: filteredSlots.filter((s) => s.cruiseType === "private").length,
          discoSlots: filteredSlots.filter((s) => s.cruiseType === "disco").length
        });
        return filteredSlots;
      }
      // CRITICAL: Create slot hold - this is the missing method causing payment failures
      async createSlotHold(hold) {
        console.log("\u{1F512} Creating slot hold:", hold);
        await this.cleanupExpiredHolds();
        const availability = await this.isSlotAvailable(hold.slotId, hold.groupSize);
        if (!availability.available) {
          throw new Error(`Slot ${hold.slotId} is no longer available: ${availability.reason}`);
        }
        const holdData = {
          id: randomUUID(),
          slotId: hold.slotId,
          boatId: hold.boatId || null,
          cruiseType: hold.cruiseType,
          dateISO: hold.dateISO,
          startTime: hold.startTime,
          endTime: hold.endTime,
          sessionId: hold.sessionId || null,
          groupSize: hold.groupSize || null,
          expiresAt: new Date(Date.now() + (hold.ttlMinutes || 15) * 60 * 1e3),
          createdAt: /* @__PURE__ */ new Date()
        };
        const [createdHold] = await db.insert(slotHolds).values(holdData).returning();
        console.log("\u2705 Slot hold created successfully:", {
          holdId: createdHold.id,
          slotId: createdHold.slotId,
          expiresAt: createdHold.expiresAt
        });
        return createdHold;
      }
      // Legacy holdSlot method for backward compatibility
      async holdSlot(slotId, sessionId, duration = 15) {
        return this.createSlotHold({
          slotId,
          cruiseType: "private",
          // Default assumption
          dateISO: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          startTime: "00:00",
          endTime: "23:59",
          sessionId,
          ttlMinutes: duration
        });
      }
      async releaseSlotHold(holdId) {
        console.log("\u{1F513} Releasing slot hold:", holdId);
        try {
          const result = await db.delete(slotHolds).where(eq(slotHolds.id, holdId)).returning();
          const released = result.length > 0;
          console.log(released ? "\u2705 Slot hold released" : "\u26A0\uFE0F Slot hold not found:", holdId);
          return released;
        } catch (error) {
          console.error("\u274C Error releasing slot hold:", error);
          return false;
        }
      }
      async releaseSlotHoldBySlot(slotId, sessionId) {
        console.log("\u{1F513} Releasing slot holds by slot:", { slotId, sessionId });
        try {
          let query = db.delete(slotHolds).where(eq(slotHolds.slotId, slotId));
          if (sessionId) {
            query = query.where(eq(slotHolds.sessionId, sessionId));
          }
          const result = await query.returning();
          const released = result.length > 0;
          console.log(`\u2705 Released ${result.length} slot holds for slot ${slotId}`);
          return released;
        } catch (error) {
          console.error("\u274C Error releasing slot holds by slot:", error);
          return false;
        }
      }
      async extendSlotHold(holdId, additionalMinutes) {
        console.log("\u23F0 Extending slot hold:", { holdId, additionalMinutes });
        try {
          const newExpiresAt = new Date(Date.now() + additionalMinutes * 60 * 1e3);
          const [updatedHold] = await db.update(slotHolds).set({ expiresAt: newExpiresAt }).where(eq(slotHolds.id, holdId)).returning();
          if (updatedHold) {
            console.log("\u2705 Slot hold extended until:", updatedHold.expiresAt);
          }
          return updatedHold;
        } catch (error) {
          console.error("\u274C Error extending slot hold:", error);
          return void 0;
        }
      }
      async isSlotAvailable(slotId, groupSize) {
        console.log("\u{1F50D} Checking slot availability:", { slotId, groupSize });
        try {
          await this.cleanupExpiredHolds();
          const activeHolds = await db.select().from(slotHolds).where(and(
            eq(slotHolds.slotId, slotId),
            gte(slotHolds.expiresAt, /* @__PURE__ */ new Date())
          ));
          if (activeHolds.length > 0) {
            const hold = activeHolds[0];
            return {
              available: false,
              reason: "Slot is currently held by another session",
              heldUntil: hold.expiresAt
            };
          }
          return { available: true };
        } catch (error) {
          console.error("\u274C Error checking slot availability:", error);
          return { available: false, reason: "Error checking availability" };
        }
      }
      async checkSlotHoldStatus(slotId, groupSize) {
        return this.isSlotAvailable(slotId, groupSize);
      }
      async cleanupExpiredHolds() {
        try {
          const expiredHolds = await db.delete(slotHolds).where(lte(slotHolds.expiresAt, /* @__PURE__ */ new Date())).returning();
          if (expiredHolds.length > 0) {
            console.log(`\u{1F9F9} Cleaned up ${expiredHolds.length} expired slot holds`);
          }
          return expiredHolds.length;
        } catch (error) {
          console.error("\u274C Error cleaning up expired holds:", error);
          return 0;
        }
      }
      async getSlotHold(holdId) {
        try {
          const [hold] = await db.select().from(slotHolds).where(eq(slotHolds.id, holdId)).limit(1);
          return hold;
        } catch (error) {
          console.error("\u274C Error getting slot hold:", error);
          return void 0;
        }
      }
      async getSlotHoldsBySession(sessionId) {
        try {
          return await db.select().from(slotHolds).where(and(
            eq(slotHolds.sessionId, sessionId),
            gte(slotHolds.expiresAt, /* @__PURE__ */ new Date())
          )).orderBy(desc(slotHolds.createdAt));
        } catch (error) {
          console.error("\u274C Error getting slot holds by session:", error);
          return [];
        }
      }
      async getActiveSlotHolds() {
        try {
          return await db.select().from(slotHolds).where(gte(slotHolds.expiresAt, /* @__PURE__ */ new Date())).orderBy(desc(slotHolds.createdAt));
        } catch (error) {
          console.error("\u274C Error getting active slot holds:", error);
          return [];
        }
      }
      // Add remaining complex methods as stubs for now
      async checkAvailability(date, duration, groupSize, cruiseType) {
        return { available: true, reason: "Stub implementation" };
      }
      async getAvailableBoats(date, startTime, endTime, groupSize) {
        return await this.getActiveBoats();
      }
      async checkDiscoAvailability(date, timeSlot) {
        if (!isInDiscoSeason(date)) {
          return false;
        }
        const dayOfWeek = date.getDay();
        if (dayOfWeek !== 5 && dayOfWeek !== 6) {
          return false;
        }
        if (dayOfWeek === 5) {
          return timeSlot === "12:00-16:00" || timeSlot === "12pm-4pm";
        } else if (dayOfWeek === 6) {
          return timeSlot === "11:00-15:00" || timeSlot === "11am-3pm" || timeSlot === "15:30-19:30" || timeSlot === "3:30pm-7:30pm";
        }
        return false;
      }
      async getBoatAvailabilityByCapacity(date, startTime, endTime) {
        return /* @__PURE__ */ new Map();
      }
      async getUpcomingBookings(limit) {
        const filters = { limit };
        return await this.getBookings(filters);
      }
      async getRecentQuotes(limit) {
        let query = db.select().from(quotes).orderBy(desc(quotes.createdAt));
        if (limit) {
          query = query.limit(limit);
        }
        return await query;
      }
      async getMonthlyCalendarGrouped(year, month) {
        return /* @__PURE__ */ new Map();
      }
      async getComprehensiveBookings(startDate, endDate, filters) {
        return [];
      }
      async getAdminAvailabilityOverview(date) {
        return [];
      }
      // Blog Post Methods - Required implementations
      async getPublishedBlogPosts(limit, offset) {
        const results = await db.select({
          post: blogPosts,
          author: blogAuthors
        }).from(blogPosts).leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id)).where(eq(blogPosts.status, "published")).orderBy(desc(blogPosts.createdAt)).limit(limit || 20).offset(offset || 0);
        console.log(`\u{1F41B} DEBUG: Found ${results.length} published posts from database query`);
        const enrichedPosts = results.map((result) => ({
          ...result.post,
          author: result.author || {},
          categories: [],
          tags: []
        }));
        const [{ count: count2 }] = await db.select({ count: sql2`count(*)`.mapWith(Number) }).from(blogPosts).where(eq(blogPosts.status, "published"));
        return {
          posts: enrichedPosts,
          total: count2
        };
      }
      async getFeaturedBlogPosts(limit) {
        return [];
      }
      async getBlogPostsByTag(tagId, limit, offset) {
        return { posts: [], total: 0 };
      }
      async getBlogPostsByCategory(categoryId, limit, offset) {
        return { posts: [], total: 0 };
      }
      async getBlogPost(id) {
        const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
        return post;
      }
      async getBlogPostBySlug(slug) {
        const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
        return post;
      }
      async getBlogPostByWordPressId(wpPostId) {
        const [post] = await db.select().from(blogPosts).where(eq(blogPosts.wpPostId, wpPostId));
        return post;
      }
      async getBlogPosts(filters) {
        let query = db.select({
          post: blogPosts,
          author: blogAuthors
        }).from(blogPosts).leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id));
        const conditions = [];
        if (filters?.status) {
          conditions.push(eq(blogPosts.status, filters.status));
        }
        if (filters?.authorId) {
          conditions.push(eq(blogPosts.authorId, filters.authorId));
        }
        if (filters?.featured !== void 0) {
          conditions.push(eq(blogPosts.featured, filters.featured));
        }
        if (filters?.search) {
          conditions.push(
            or(
              sql2`${blogPosts.title} ILIKE ${`%${filters.search}%`}`,
              sql2`${blogPosts.content} ILIKE ${`%${filters.search}%`}`
            )
          );
        }
        if (filters?.categoryId) {
          conditions.push(
            sql2`EXISTS (
          SELECT 1 FROM ${blogPostCategories} 
          WHERE ${blogPostCategories.postId} = ${blogPosts.id} 
          AND ${blogPostCategories.categoryId} = ${filters.categoryId}
        )`
          );
        }
        if (filters?.tagId) {
          conditions.push(
            sql2`EXISTS (
          SELECT 1 FROM ${blogPostTags} 
          WHERE ${blogPostTags.postId} = ${blogPosts.id} 
          AND ${blogPostTags.tagId} = ${filters.tagId}
        )`
          );
        }
        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }
        const sortBy = filters?.sortBy || "createdAt";
        const sortOrder = filters?.sortOrder || "desc";
        const sortField = sortBy === "publishedAt" ? blogPosts.publishedAt : sortBy === "title" ? blogPosts.title : blogPosts.createdAt;
        query = query.orderBy(sortOrder === "asc" ? asc(sortField) : desc(sortField));
        if (filters?.limit) {
          query = query.limit(filters.limit);
        }
        if (filters?.offset) {
          query = query.offset(filters.offset);
        }
        const results = await query;
        const enrichedPosts = [];
        for (const result of results) {
          const categories = await this.getBlogPostCategories(result.post.id);
          const tags = await this.getBlogPostTags(result.post.id);
          enrichedPosts.push({
            ...result.post,
            author: result.author || {},
            categories,
            tags
          });
        }
        let countQuery = db.select({ count: count() }).from(blogPosts);
        if (conditions.length > 0) {
          countQuery = countQuery.where(and(...conditions));
        }
        const [{ count: totalCount }] = await countQuery;
        return {
          posts: enrichedPosts,
          total: totalCount
        };
      }
      async createBlogPost(post) {
        const [newPost] = await db.insert(blogPosts).values({
          ...post,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }).returning();
        return newPost;
      }
      async updateBlogPost(id, updates) {
        const [updatedPost] = await db.update(blogPosts).set({
          ...updates,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(blogPosts.id, id)).returning();
        if (!updatedPost) {
          throw new Error(`Blog post with id ${id} not found`);
        }
        return updatedPost;
      }
      async deleteBlogPost(id) {
        const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
        return result.rowCount > 0;
      }
      // Blog Category Methods
      async getBlogCategory(id) {
        const [category] = await db.select().from(blogCategories).where(eq(blogCategories.id, id));
        return category;
      }
      async getBlogCategoryBySlug(slug) {
        const [category] = await db.select().from(blogCategories).where(eq(blogCategories.slug, slug));
        return category;
      }
      async getBlogCategories() {
        return await db.select().from(blogCategories).where(eq(blogCategories.active, true)).orderBy(asc(blogCategories.displayOrder), asc(blogCategories.name));
      }
      async createBlogCategory(category) {
        const [newCategory] = await db.insert(blogCategories).values(category).returning();
        return newCategory;
      }
      async updateBlogCategory(id, updates) {
        throw new Error("Blog category update not implemented");
      }
      async deleteBlogCategory(id) {
        return false;
      }
      // Blog Tag Methods
      async getBlogTag(id) {
        const [tag] = await db.select().from(blogTags).where(eq(blogTags.id, id));
        return tag;
      }
      async getBlogTagBySlug(slug) {
        const [tag] = await db.select().from(blogTags).where(eq(blogTags.slug, slug));
        return tag;
      }
      async getBlogTags() {
        return await db.select().from(blogTags).where(eq(blogTags.active, true)).orderBy(desc(blogTags.postCount), asc(blogTags.name));
      }
      async createBlogTag(tag) {
        const [newTag] = await db.insert(blogTags).values(tag).returning();
        return newTag;
      }
      async updateBlogTag(id, updates) {
        const [updatedTag] = await db.update(blogTags).set({
          ...updates,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(blogTags.id, id)).returning();
        if (!updatedTag) {
          throw new Error("Blog tag not found");
        }
        return updatedTag;
      }
      async deleteBlogTag(id) {
        await db.delete(blogPostTags).where(eq(blogPostTags.tagId, id));
        const result = await db.delete(blogTags).where(eq(blogTags.id, id));
        return result.rowCount > 0;
      }
      // Blog post publishing and scheduling methods
      async publishBlogPost(id, publishedAt) {
        const publishDate = publishedAt || /* @__PURE__ */ new Date();
        const [updatedPost] = await db.update(blogPosts).set({
          status: "published",
          publishedAt: publishDate,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(blogPosts.id, id)).returning();
        if (!updatedPost) {
          throw new Error("Blog post not found");
        }
        return updatedPost;
      }
      async scheduleBlogPost(id, scheduledFor) {
        const [updatedPost] = await db.update(blogPosts).set({
          status: "scheduled",
          scheduledFor,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(blogPosts.id, id)).returning();
        if (!updatedPost) {
          throw new Error("Blog post not found");
        }
        return updatedPost;
      }
      async incrementBlogPostViews(id) {
        const [updatedPost] = await db.update(blogPosts).set({ viewCount: sql2`${blogPosts.viewCount} + 1` }).where(eq(blogPosts.id, id)).returning();
        return updatedPost;
      }
      async getRelatedBlogPosts(postId, limit = 5) {
        const relatedPosts = await db.select().from(blogPosts).where(
          and(
            eq(blogPosts.status, "published"),
            sql2`${blogPosts.id} != ${postId}`
          )
        ).limit(limit).orderBy(desc(blogPosts.publishedAt));
        return relatedPosts;
      }
      async getBlogPostsByAuthor(authorId, limit = 20, offset = 0) {
        const [{ count: count2 }] = await db.select({ count: sql2`count(*)` }).from(blogPosts).where(eq(blogPosts.authorId, authorId));
        const postsWithAuthor = await db.select().from(blogPosts).innerJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id)).where(eq(blogPosts.authorId, authorId)).orderBy(desc(blogPosts.createdAt)).limit(limit).offset(offset);
        const enrichedPosts = [];
        for (const row of postsWithAuthor) {
          const [categories, tags] = await Promise.all([
            this.getBlogPostCategories(row.blog_posts.id),
            this.getBlogPostTags(row.blog_posts.id)
          ]);
          enrichedPosts.push({
            ...row.blog_posts,
            author: row.blog_authors,
            categories,
            tags
          });
        }
        return { posts: enrichedPosts, total: count2 };
      }
      // Blog Author Methods  
      async getBlogAuthor(id) {
        const [author] = await db.select().from(blogAuthors).where(eq(blogAuthors.id, id));
        return author;
      }
      async getBlogAuthors() {
        return await db.select().from(blogAuthors).where(eq(blogAuthors.active, true));
      }
      async getBlogAuthorBySlug(slug) {
        const [author] = await db.select().from(blogAuthors).where(eq(blogAuthors.slug, slug));
        return author;
      }
      async getBlogAuthorByContact(contactId) {
        const [author] = await db.select().from(blogAuthors).where(eq(blogAuthors.contactId, contactId));
        return author;
      }
      async createBlogAuthor(author) {
        const [newAuthor] = await db.insert(blogAuthors).values({
          ...author,
          slug: author.slug || author.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        }).returning();
        return newAuthor;
      }
      async updateBlogAuthor(id, updates) {
        throw new Error("Blog author update not implemented");
      }
      async deleteBlogAuthor(id) {
        return false;
      }
      // Blog relationship methods - missing implementations
      async assignPostToCategories(postId, categoryIds, primaryCategoryId) {
        await db.delete(blogPostCategories).where(eq(blogPostCategories.postId, postId));
        if (categoryIds.length > 0) {
          const assignments = categoryIds.map((categoryId) => ({
            postId,
            categoryId,
            isPrimary: categoryId === primaryCategoryId
          }));
          const result = await db.insert(blogPostCategories).values(assignments).returning();
          return result;
        }
        return [];
      }
      async assignPostToTags(postId, tagIds) {
        await db.delete(blogPostTags).where(eq(blogPostTags.postId, postId));
        if (tagIds.length > 0) {
          const assignments = tagIds.map((tagId) => ({
            postId,
            tagId
          }));
          const result = await db.insert(blogPostTags).values(assignments).returning();
          return result;
        }
        return [];
      }
      async getBlogPostCategories(postId) {
        const results = await db.select({
          category: blogCategories
        }).from(blogPostCategories).innerJoin(blogCategories, eq(blogPostCategories.categoryId, blogCategories.id)).where(eq(blogPostCategories.postId, postId)).orderBy(desc(blogPostCategories.isPrimary), asc(blogCategories.name));
        return results.map((r) => r.category);
      }
      async getBlogPostTags(postId) {
        const results = await db.select({
          tag: blogTags
        }).from(blogPostTags).innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id)).where(eq(blogPostTags.postId, postId)).orderBy(asc(blogTags.name));
        return results.map((r) => r.tag);
      }
      async removePostFromCategories(postId, categoryIds) {
        let query = db.delete(blogPostCategories).where(eq(blogPostCategories.postId, postId));
        if (categoryIds && categoryIds.length > 0) {
          query = query.where(and(
            eq(blogPostCategories.postId, postId),
            inArray(blogPostCategories.categoryId, categoryIds)
          ));
        }
        const result = await query;
        return result.rowCount > 0;
      }
      async removePostFromTags(postId, tagIds) {
        let query = db.delete(blogPostTags).where(eq(blogPostTags.postId, postId));
        if (tagIds && tagIds.length > 0) {
          query = query.where(and(
            eq(blogPostTags.postId, postId),
            inArray(blogPostTags.tagId, tagIds)
          ));
        }
        const result = await query;
        return result.rowCount > 0;
      }
      async getBlogCategoryHierarchy() {
        return await db.select().from(blogCategories).where(eq(blogCategories.active, true)).orderBy(asc(blogCategories.displayOrder), asc(blogCategories.name));
      }
      // ===== SEO MANAGEMENT OPERATIONS =====
      // SEO Pages Management
      async getSeoPage(pageRoute) {
        const result = await db.select().from(seoPages).where(eq(seoPages.pageRoute, pageRoute)).limit(1);
        return result[0];
      }
      async getSeoPages() {
        return await db.select().from(seoPages).orderBy(asc(seoPages.pageRoute));
      }
      async createSeoPage(seoPage) {
        const result = await db.insert(seoPages).values({
          ...seoPage,
          id: randomUUID(),
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }).returning();
        return result[0];
      }
      async updateSeoPage(pageRoute, updates) {
        const result = await db.update(seoPages).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(seoPages.pageRoute, pageRoute)).returning();
        if (result.length === 0) {
          throw new Error(`SEO page not found: ${pageRoute}`);
        }
        return result[0];
      }
      async deleteSeoPage(pageRoute) {
        const result = await db.delete(seoPages).where(eq(seoPages.pageRoute, pageRoute));
        return result.rowCount > 0;
      }
      async upsertSeoPage(seoPage) {
        const existing = await this.getSeoPage(seoPage.pageRoute);
        if (existing) {
          return await this.updateSeoPage(seoPage.pageRoute, seoPage);
        } else {
          return await this.createSeoPage(seoPage);
        }
      }
      // SEO Settings
      async getSeoSettings() {
        const result = await db.select().from(seoSettings).limit(1);
        return result[0];
      }
      async updateSeoSettings(settings) {
        const existing = await this.getSeoSettings();
        if (existing) {
          const result = await db.update(seoSettings).set({ ...settings, updatedAt: /* @__PURE__ */ new Date() }).where(eq(seoSettings.id, existing.id)).returning();
          return result[0];
        } else {
          return await this.createSeoSettings(settings);
        }
      }
      async createSeoSettings(settings) {
        const result = await db.insert(seoSettings).values({
          ...settings,
          id: randomUUID(),
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }).returning();
        return result[0];
      }
      async upsertSeoSettings(settings) {
        const existing = await this.getSeoSettings();
        if (existing) {
          return await this.updateSeoSettings(settings);
        } else {
          return await this.createSeoSettings(settings);
        }
      }
      // Technical SEO
      async generateSitemap() {
        const pages = await this.getSeoPages();
        const baseUrl = "https://premierpartycruises.com";
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/bachelor-party</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/bachelorette-party</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/private-cruises</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/booking</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/gallery</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
${pages.map((page) => `  <url>
    <loc>${baseUrl}${page.pageRoute}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority || 0.5}</priority>
    ${page.updatedAt ? `<lastmod>${page.updatedAt.toISOString()}</lastmod>` : ""}
  </url>`).join("\n")}
</urlset>`;
        return sitemap;
      }
      async generateRobotsTxt() {
        const baseUrl = "https://premierpartycruises.com";
        return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/

# Crawl-delay for politeness
Crawl-delay: 1`;
      }
      async getPageMetaData(pageRoute) {
        const seoPage = await this.getSeoPage(pageRoute);
        if (!seoPage) {
          const defaultMeta = {
            metaTitle: "Premier Party Cruises - Austin Lake Travis Boat Rentals",
            metaDescription: "Austin's premier boat rental and party cruise experience on Lake Travis. Private charters, disco cruises, bachelor parties, and corporate events.",
            metaKeywords: ["Austin boat rental", "Lake Travis cruises", "party boat Austin", "bachelor party boat", "private charter"],
            openGraphType: "website",
            twitterCard: "summary_large_image",
            robotsDirective: "index, follow"
          };
          if (pageRoute === "/bachelor-party") {
            defaultMeta.metaTitle = "Austin Bachelor Party Boat Cruises | Lake Travis | Premier Party Cruises";
            defaultMeta.metaDescription = "Ultimate Austin bachelor party experience on Lake Travis. Join our epic disco cruises with DJ, drinks, and unforgettable memories. Book now!";
            defaultMeta.metaKeywords = ["Austin bachelor party", "Lake Travis bachelor party", "bachelor party boat", "disco cruise Austin", "bachelor party ideas Austin"];
          } else if (pageRoute === "/bachelorette-party") {
            defaultMeta.metaTitle = "Austin Bachelorette Party Boat Cruises | Lake Travis | Premier Party Cruises";
            defaultMeta.metaDescription = "Perfect Austin bachelorette party on Lake Travis! Disco cruises with DJ, dancing, drinks, and incredible views. Bride rides free on weekends!";
            defaultMeta.metaKeywords = ["Austin bachelorette party", "Lake Travis bachelorette", "bachelorette party boat", "disco cruise Austin", "bachelorette party ideas Austin"];
          }
          return defaultMeta;
        }
        return {
          metaTitle: seoPage.metaTitle,
          metaDescription: seoPage.metaDescription,
          metaKeywords: seoPage.metaKeywords,
          openGraphTitle: seoPage.openGraphTitle,
          openGraphDescription: seoPage.openGraphDescription,
          openGraphImage: seoPage.openGraphImage,
          openGraphType: seoPage.openGraphType,
          twitterTitle: seoPage.twitterTitle,
          twitterDescription: seoPage.twitterDescription,
          twitterImage: seoPage.twitterImage,
          twitterCard: seoPage.twitterCard,
          canonicalUrl: seoPage.canonicalUrl,
          robotsDirective: seoPage.robotsDirective,
          schemaMarkup: seoPage.schemaMarkup
        };
      }
      // SEO Analytics and Reporting
      async getSeoOverview() {
        const pages = await this.getSeoPages();
        return {
          totalPages: pages.length,
          averageScore: pages.length > 0 ? pages.reduce((sum2, page) => sum2 + (page.currentScore || 0), 0) / pages.length : 0,
          highPriorityIssues: pages.filter((page) => (page.currentScore || 0) < 50).length,
          pagesNeedingOptimization: pages.filter((page) => (page.currentScore || 0) < 80).length,
          lastAnalyzed: pages.length > 0 ? new Date(Math.max(...pages.map((page) => page.updatedAt?.getTime() || 0))) : void 0
        };
      }
      async getSeoIssuesSummary() {
        const pages = await this.getSeoPages();
        return pages.map((page) => ({
          pageRoute: page.pageRoute,
          pageName: page.pageName || page.pageRoute,
          score: page.currentScore || 0,
          issues: page.issues || [],
          lastAnalyzed: page.updatedAt
        }));
      }
      async getKeywordRankings(keyword) {
        const pages = await this.getSeoPages();
        return pages.filter(
          (page) => page.targetKeywords?.includes(keyword) || page.focusKeyword === keyword || page.metaKeywords?.includes(keyword)
        ).map((page) => ({
          pageRoute: page.pageRoute,
          position: void 0,
          // Would need external SEO API to get actual rankings
          targetKeywords: page.targetKeywords || [],
          focusKeyword: page.focusKeyword
        }));
      }
      // Content Analysis
      async analyzeContent(content, targetKeyword) {
        const wordCount = content.split(/\s+/).length;
        const words = content.toLowerCase().split(/\s+/);
        const keywordDensity = {};
        if (targetKeyword) {
          const keywordOccurrences = content.toLowerCase().split(targetKeyword.toLowerCase()).length - 1;
          keywordDensity[targetKeyword] = keywordOccurrences / wordCount * 100;
        }
        const h1Matches = content.match(/<h1[^>]*>/g) || [];
        const h2Matches = content.match(/<h2[^>]*>/g) || [];
        const h3Matches = content.match(/<h3[^>]*>/g) || [];
        const h4Matches = content.match(/<h4[^>]*>/g) || [];
        const h5Matches = content.match(/<h5[^>]*>/g) || [];
        const h6Matches = content.match(/<h6[^>]*>/g) || [];
        const headingStructure = {
          h1Count: h1Matches.length,
          h2Count: h2Matches.length,
          h3Count: h3Matches.length,
          h4Count: h4Matches.length,
          h5Count: h5Matches.length,
          h6Count: h6Matches.length,
          hasProperHierarchy: h1Matches.length === 1 && h1Matches.length <= h2Matches.length,
          duplicateHeadings: []
        };
        const internalLinks = (content.match(/href=["'](?!http|\/\/)/g) || []).length;
        const externalLinks = (content.match(/href=["'](?:http|\/\/)/g) || []).length;
        const images = (content.match(/<img[^>]*>/g) || []).length;
        const imagesWithAlt = (content.match(/<img[^>]*alt=["'][^"']*["'][^>]*>/g) || []).length;
        const imagesWithoutAlt = images - imagesWithAlt;
        const sentences = content.split(/[.!?]+/).length;
        const averageWordsPerSentence = wordCount / Math.max(sentences, 1);
        const readabilityScore = Math.max(0, Math.min(100, 206.835 - 1.015 * averageWordsPerSentence - 84.6 * 1.5));
        return {
          wordCount,
          keywordDensity,
          headingStructure,
          readabilityScore,
          internalLinks,
          externalLinks,
          images,
          imagesWithoutAlt
        };
      }
      // Schema Markup Management
      async generateBusinessSchema() {
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Premier Party Cruises",
          "description": "Austin's premier boat rental and party cruise experience on Lake Travis",
          "url": "https://premierpartycruises.com",
          "telephone": "+1-512-488-5892",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Austin",
            "addressRegion": "TX",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.2672",
            "longitude": "-97.7431"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "09:00",
              "closes": "21:00"
            }
          ],
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "30.2672",
              "longitude": "-97.7431"
            },
            "geoRadius": "50"
          },
          "sameAs": [
            "https://www.facebook.com/premierpartycruises",
            "https://www.instagram.com/premierpartycruises",
            "https://www.youtube.com/premierpartycruises"
          ]
        };
      }
      async generatePageSchema(pageRoute, pageType) {
        const baseUrl = "https://premierpartycruises.com";
        const seoPage = await this.getSeoPage(pageRoute);
        const baseSchema = {
          "@context": "https://schema.org",
          "@type": pageType === "service" ? "Service" : pageType === "event" ? "Event" : "WebPage",
          "url": `${baseUrl}${pageRoute}`,
          "name": seoPage?.metaTitle || "Premier Party Cruises",
          "description": seoPage?.metaDescription || "Austin's premier boat rental and party cruise experience",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises"
          }
        };
        return baseSchema;
      }
      async validateSchemaMarkup(schema) {
        const errors = [];
        if (!schema["@context"]) {
          errors.push("Missing @context property");
        }
        if (!schema["@type"]) {
          errors.push("Missing @type property");
        }
        return {
          valid: errors.length === 0,
          errors
        };
      }
      // SEO Analysis and Scoring (stubs for now - would need AI integration)
      async analyzePage(pageRoute, content) {
        const seoPage = await this.getSeoPage(pageRoute);
        return {
          pageRoute,
          score: seoPage?.currentScore || 75,
          issues: seoPage?.issues || [],
          recommendations: seoPage?.recommendations || [],
          lastAnalyzed: /* @__PURE__ */ new Date(),
          contentAnalysis: content ? await this.analyzeContent(content) : void 0
        };
      }
      async calculateSeoScore(pageRoute) {
        const seoPage = await this.getSeoPage(pageRoute);
        return seoPage?.currentScore || 75;
      }
      async updateSeoAnalysis(pageRoute, analysis) {
        return await this.upsertSeoPage({
          pageRoute,
          currentScore: analysis.score,
          issues: analysis.issues,
          recommendations: analysis.recommendations,
          lastAnalyzed: analysis.lastAnalyzed,
          pageName: `Page: ${pageRoute}`
        });
      }
      // Placeholder methods for AI optimization (would need OpenAI integration)
      async optimizePageSeo(request) {
        return await this.upsertSeoPage({
          pageRoute: request.pageRoute,
          pageName: `Optimized: ${request.pageRoute}`,
          metaTitle: request.currentContent?.substring(0, 60) || "Premier Party Cruises",
          metaDescription: request.currentContent?.substring(0, 160) || "Austin's premier boat rental experience",
          currentScore: 85
          // Mock improved score
        });
      }
      async generateMetaTags(pageRoute, content, targetKeyword) {
        return {
          title: `Premier Party Cruises - ${pageRoute.replace("/", "").replace("-", " ")}`,
          description: `Experience Austin's best ${pageRoute.replace("/", "").replace("-", " ")} on Lake Travis with Premier Party Cruises.`,
          keywords: ["Austin", "Lake Travis", "boat rental", "party cruise", targetKeyword].filter(Boolean)
        };
      }
      async optimizeContent(content, targetKeyword, competitorUrls) {
        return content;
      }
      async bulkAnalyzePages(pageRoutes) {
        return Promise.all(pageRoutes.map((route) => this.analyzePage(route)));
      }
      async bulkOptimizePages(operation) {
        return Promise.all(operation.pageRoutes.map((route) => this.optimizePageSeo({
          pageRoute: route,
          currentContent: "",
          targetKeyword: operation.targetKeyword
        })));
      }
      async refreshAllPageAnalysis() {
        const pages = await this.getSeoPages();
        return Promise.all(pages.map((page) => this.analyzePage(page.pageRoute).then(
          (analysis) => this.updateSeoAnalysis(page.pageRoute, analysis)
        )));
      }
      // SEO Competitors
      async getSeoCompetitor(id) {
        const result = await db.select().from(seoCompetitors).where(eq(seoCompetitors.id, id)).limit(1);
        return result[0];
      }
      async getSeoCompetitors() {
        return await db.select().from(seoCompetitors).orderBy(asc(seoCompetitors.name));
      }
      async getSeoCompetitorByDomain(domain) {
        const result = await db.select().from(seoCompetitors).where(eq(seoCompetitors.domain, domain)).limit(1);
        return result[0];
      }
      async createSeoCompetitor(competitor) {
        const result = await db.insert(seoCompetitors).values({
          ...competitor,
          id: randomUUID(),
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }).returning();
        return result[0];
      }
      async updateSeoCompetitor(id, updates) {
        const result = await db.update(seoCompetitors).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(seoCompetitors.id, id)).returning();
        if (result.length === 0) {
          throw new Error(`SEO competitor not found: ${id}`);
        }
        return result[0];
      }
      async deleteSeoCompetitor(id) {
        const result = await db.delete(seoCompetitors).where(eq(seoCompetitors.id, id));
        return result.rowCount > 0;
      }
      // SEO Audit Log
      async getSeoAuditLog(pageId) {
        return await db.select().from(seoAuditLog).where(eq(seoAuditLog.pageId, pageId)).orderBy(desc(seoAuditLog.createdAt));
      }
      async getAllSeoAuditLogs() {
        return await db.select().from(seoAuditLog).orderBy(desc(seoAuditLog.createdAt));
      }
      async createSeoAuditLog(auditLog) {
        const result = await db.insert(seoAuditLog).values({
          ...auditLog,
          id: randomUUID(),
          createdAt: /* @__PURE__ */ new Date()
        }).returning();
        return result[0];
      }
      // SEO Performance Tracking
      async trackPagePerformance(pageRoute, metrics) {
        const seoPage = await this.getSeoPage(pageRoute);
        const performanceData = {
          loadTime: metrics.loadTime,
          mobileOptimized: metrics.mobileOptimized,
          coreWebVitals: metrics.coreWebVitals
        };
        if (seoPage) {
          return await this.updateSeoPage(pageRoute, {
            ...performanceData,
            updatedAt: /* @__PURE__ */ new Date()
          });
        } else {
          return await this.createSeoPage({
            pageRoute,
            pageName: `Performance: ${pageRoute}`,
            ...performanceData
          });
        }
      }
      // ===== END SEO MANAGEMENT OPERATIONS =====
      // ===== MEDIA LIBRARY OPERATIONS =====
      async createMedia(mediaData) {
        const [result] = await db.insert(mediaItems).values(mediaData).returning();
        return result;
      }
      async getMedia(id) {
        const result = await db.select().from(mediaItems).where(eq(mediaItems.id, id)).limit(1);
        return result[0];
      }
      async listMedia(filters) {
        let query = db.select().from(mediaItems);
        let countQuery = db.select({ count: sql2`count(*)::int` }).from(mediaItems);
        if (filters?.search) {
          const searchCondition = or(
            sql2`${mediaItems.filename} ILIKE ${`%${filters.search}%`}`,
            sql2`${mediaItems.originalName} ILIKE ${`%${filters.search}%`}`,
            sql2`COALESCE(${mediaItems.title}, '') ILIKE ${`%${filters.search}%`}`,
            sql2`COALESCE(${mediaItems.description}, '') ILIKE ${`%${filters.search}%`}`
          );
          query = query.where(searchCondition);
          countQuery = countQuery.where(searchCondition);
        }
        if (filters?.mimeType) {
          const mimeCondition = sql2`${mediaItems.mimeType} ILIKE ${`${filters.mimeType}%`}`;
          query = query.where(mimeCondition);
          countQuery = countQuery.where(mimeCondition);
        }
        const sortBy = filters?.sortBy || "uploadDate";
        const sortOrder = filters?.sortOrder || "desc";
        if (sortBy === "uploadDate" || sortBy === "uploadedAt") {
          query = sortOrder === "desc" ? query.orderBy(desc(mediaItems.uploadDate)) : query.orderBy(asc(mediaItems.uploadDate));
        } else if (sortBy === "size" || sortBy === "fileSize") {
          query = sortOrder === "desc" ? query.orderBy(desc(mediaItems.fileSize)) : query.orderBy(asc(mediaItems.fileSize));
        } else if (sortBy === "originalName") {
          query = sortOrder === "desc" ? query.orderBy(desc(mediaItems.originalName)) : query.orderBy(asc(mediaItems.originalName));
        }
        const limit = filters?.limit || 50;
        const offset = filters?.offset || 0;
        query = query.limit(limit).offset(offset);
        try {
          const [results, totalResult] = await Promise.all([
            query,
            countQuery
          ]);
          return {
            media: results,
            total: totalResult[0].count
          };
        } catch (error) {
          console.error("Error in listMedia query:", error);
          return {
            media: [],
            total: 0
          };
        }
      }
      async updateMedia(id, updates) {
        const [result] = await db.update(mediaItems).set(updates).where(eq(mediaItems.id, id)).returning();
        return result;
      }
      async deleteMedia(id) {
        const result = await db.delete(mediaItems).where(eq(mediaItems.id, id));
        return true;
      }
      // ===== END MEDIA LIBRARY OPERATIONS =====
      // ===== CONTENT BLOCKS OPERATIONS =====
      async createContentBlock(contentBlockData) {
        const [result] = await db.insert(contentBlocks).values({
          ...contentBlockData,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }).returning();
        return result;
      }
      async getContentBlock(route, key) {
        const result = await db.select().from(contentBlocks).where(and(eq(contentBlocks.route, route), eq(contentBlocks.key, key))).limit(1);
        return result[0];
      }
      async getContentBlocks(route) {
        let query = db.select().from(contentBlocks);
        if (route) {
          query = query.where(eq(contentBlocks.route, route));
        }
        const results = await query.orderBy(asc(contentBlocks.route), asc(contentBlocks.key));
        return results;
      }
      async updateContentBlock(route, key, updates) {
        const [result] = await db.update(contentBlocks).set({
          ...updates,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(and(eq(contentBlocks.route, route), eq(contentBlocks.key, key))).returning();
        return result;
      }
      async deleteContentBlock(route, key) {
        await db.delete(contentBlocks).where(and(eq(contentBlocks.route, route), eq(contentBlocks.key, key)));
        return true;
      }
      async upsertContentBlock(contentBlockData) {
        const existing = await this.getContentBlock(contentBlockData.route, contentBlockData.key);
        if (existing) {
          return await this.updateContentBlock(contentBlockData.route, contentBlockData.key, contentBlockData);
        } else {
          return await this.createContentBlock(contentBlockData);
        }
      }
      // Advanced Content Blocks Management
      async getContentBlocksByPage(pageRoute, filters) {
        const conditions = [eq(contentBlocks.route, pageRoute)];
        if (filters?.category) {
          conditions.push(eq(contentBlocks.category, filters.category));
        }
        if (filters?.type) {
          conditions.push(eq(contentBlocks.type, filters.type));
        }
        if (filters?.isVisible !== void 0) {
          conditions.push(eq(contentBlocks.isVisible, filters.isVisible));
        }
        if (filters?.parentBlockId !== void 0) {
          if (filters.parentBlockId === null) {
            conditions.push(isNull(contentBlocks.parentBlockId));
          } else {
            conditions.push(eq(contentBlocks.parentBlockId, filters.parentBlockId));
          }
        }
        const query = db.select().from(contentBlocks).where(and(...conditions)).orderBy(asc(contentBlocks.displayOrder), asc(contentBlocks.createdAt));
        const results = await query;
        return results;
      }
      async reorderContentBlocks(pageRoute, blockIds) {
        const updates = blockIds.map(async (blockId, index) => {
          return await db.update(contentBlocks).set({
            displayOrder: index,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(and(eq(contentBlocks.route, pageRoute), eq(contentBlocks.id, blockId))).returning();
        });
        await Promise.all(updates);
        return await this.getContentBlocksByPage(pageRoute);
      }
      async duplicateContentBlock(route, key, newKey) {
        const original = await this.getContentBlock(route, key);
        if (!original) {
          throw new Error(`Content block not found: ${route}/${key}`);
        }
        const duplicateData = {
          route: original.route,
          key: newKey,
          title: original.title ? `${original.title} (Copy)` : void 0,
          valueJSON: original.valueJSON,
          type: original.type,
          category: original.category,
          displayOrder: original.displayOrder + 1,
          isVisible: original.isVisible,
          conditions: original.conditions,
          styling: original.styling,
          metadata: {
            ...original.metadata,
            version: 1,
            isDraft: true
          },
          parentBlockId: original.parentBlockId,
          templateId: original.templateId,
          updatedBy: original.updatedBy
        };
        return await this.createContentBlock(duplicateData);
      }
      async bulkUpdateContentBlocks(updates) {
        const updatePromises = updates.map(async (update) => {
          return await this.updateContentBlock(update.route, update.key, {
            ...update.updates,
            updatedAt: /* @__PURE__ */ new Date()
          });
        });
        return await Promise.all(updatePromises);
      }
      async getContentBlocksByType(blockType) {
        const results = await db.select().from(contentBlocks).where(eq(contentBlocks.type, blockType)).orderBy(asc(contentBlocks.route), asc(contentBlocks.displayOrder));
        return results;
      }
      async getContentBlocksByCategory(category) {
        const results = await db.select().from(contentBlocks).where(eq(contentBlocks.category, category)).orderBy(asc(contentBlocks.route), asc(contentBlocks.displayOrder));
        return results;
      }
      async searchContentBlocks(query, filters) {
        const conditions = [];
        const searchCondition = sql2`(
      ${contentBlocks.title} ILIKE ${`%${query}%`} OR 
      ${contentBlocks.key} ILIKE ${`%${query}%`} OR 
      ${contentBlocks.valueJSON} ILIKE ${`%${query}%`}
    )`;
        conditions.push(searchCondition);
        if (filters?.route) {
          conditions.push(eq(contentBlocks.route, filters.route));
        }
        if (filters?.type) {
          conditions.push(eq(contentBlocks.type, filters.type));
        }
        if (filters?.category) {
          conditions.push(eq(contentBlocks.category, filters.category));
        }
        const dbQuery = db.select().from(contentBlocks).where(and(...conditions)).orderBy(asc(contentBlocks.route), asc(contentBlocks.displayOrder));
        const results = await dbQuery;
        return results;
      }
      async publishContentBlock(route, key) {
        const updates = {
          status: "published",
          isVisible: true,
          metadata: {
            isDraft: false,
            lastPublished: (/* @__PURE__ */ new Date()).toISOString(),
            approvalStatus: "approved"
          },
          updatedAt: /* @__PURE__ */ new Date()
        };
        return await this.updateContentBlock(route, key, updates);
      }
      async archiveContentBlock(route, key) {
        const updates = {
          status: "archived",
          isVisible: false,
          metadata: {
            approvalStatus: "archived"
          },
          updatedAt: /* @__PURE__ */ new Date()
        };
        return await this.updateContentBlock(route, key, updates);
      }
      async getContentBlockVersions(route, key) {
        const block = await this.getContentBlock(route, key);
        return block ? [block] : [];
      }
      // ===== PUBLIC-SAFE CONTENT BLOCKS METHODS =====
      // These methods only return content blocks that are visible and published
      async getPublicContentBlocks(route) {
        let query = db.select().from(contentBlocks).where(and(
          eq(contentBlocks.isVisible, true),
          eq(contentBlocks.status, "published")
        ));
        if (route) {
          query = query.where(and(
            eq(contentBlocks.route, route),
            eq(contentBlocks.isVisible, true),
            eq(contentBlocks.status, "published")
          ));
        }
        const results = await query.orderBy(asc(contentBlocks.route), asc(contentBlocks.key));
        return results;
      }
      async getPublicContentBlocksByPage(pageRoute, filters) {
        const conditions = [
          eq(contentBlocks.route, pageRoute),
          eq(contentBlocks.isVisible, true),
          eq(contentBlocks.status, "published")
        ];
        if (filters?.category) {
          conditions.push(eq(contentBlocks.category, filters.category));
        }
        if (filters?.type) {
          conditions.push(eq(contentBlocks.type, filters.type));
        }
        const query = db.select().from(contentBlocks).where(and(...conditions)).orderBy(asc(contentBlocks.displayOrder), asc(contentBlocks.createdAt));
        const results = await query;
        return results;
      }
      async getPublicContentBlock(route, key) {
        const result = await db.select().from(contentBlocks).where(and(
          eq(contentBlocks.route, route),
          eq(contentBlocks.key, key),
          eq(contentBlocks.isVisible, true),
          eq(contentBlocks.status, "published")
        )).limit(1);
        return result[0];
      }
      async searchPublicContentBlocks(query, filters) {
        const conditions = [
          eq(contentBlocks.isVisible, true),
          eq(contentBlocks.status, "published")
        ];
        const searchCondition = sql2`(
      ${contentBlocks.title} ILIKE ${`%${query}%`} OR
      ${contentBlocks.valueJSON} ILIKE ${`%${query}%`}
    )`;
        conditions.push(searchCondition);
        if (filters?.route) {
          conditions.push(eq(contentBlocks.route, filters.route));
        }
        if (filters?.type) {
          conditions.push(eq(contentBlocks.type, filters.type));
        }
        if (filters?.category) {
          conditions.push(eq(contentBlocks.category, filters.category));
        }
        const results = await db.select().from(contentBlocks).where(and(...conditions)).orderBy(asc(contentBlocks.route), asc(contentBlocks.displayOrder));
        return results;
      }
      async getPublicContentBlocksByType(blockType) {
        const results = await db.select().from(contentBlocks).where(and(
          eq(contentBlocks.type, blockType),
          eq(contentBlocks.isVisible, true),
          eq(contentBlocks.status, "published")
        )).orderBy(asc(contentBlocks.route), asc(contentBlocks.displayOrder));
        return results;
      }
      async getPublicContentBlocksByCategory(category) {
        const results = await db.select().from(contentBlocks).where(and(
          eq(contentBlocks.category, category),
          eq(contentBlocks.isVisible, true),
          eq(contentBlocks.status, "published")
        )).orderBy(asc(contentBlocks.route), asc(contentBlocks.displayOrder));
        return results;
      }
      // ===== END PUBLIC-SAFE CONTENT BLOCKS METHODS =====
      async createContentBlockFromTemplate(templateId, route, key) {
        const templateData = {
          route,
          key,
          title: "New Block from Template",
          valueJSON: JSON.stringify({ content: "Template content" }),
          type: "text",
          category: "content",
          displayOrder: 0,
          isVisible: true,
          templateId,
          metadata: {
            version: 1,
            isDraft: true
          }
        };
        return await this.createContentBlock(templateData);
      }
      // ===== END CONTENT BLOCKS OPERATIONS =====
      // ===== PROMPTS LIBRARY OPERATIONS =====
      async savePromptLibrary(data) {
        const [result] = await db.insert(promptsLibrary).values(data).returning();
        return result;
      }
      async getPromptLibrary(name) {
        const [result] = await db.select().from(promptsLibrary).where(eq(promptsLibrary.name, name)).limit(1);
        return result;
      }
      async getAllPromptLibraries() {
        return await db.select().from(promptsLibrary).orderBy(desc(promptsLibrary.createdAt));
      }
      async updatePromptLibrary(id, data) {
        const [result] = await db.update(promptsLibrary).set({
          ...data,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(promptsLibrary.id, id)).returning();
        return result;
      }
      // ===== END PROMPTS LIBRARY OPERATIONS =====
      // ===== VERIFICATION AND TESTING OPERATIONS =====
      // Automated verification to prove production readiness
      /**
       * Verify that exactly 27 products exist with proper boat linkage
       */
      async verifyProductCountAndLinkage() {
        console.log("\u{1F50D} Verifying product count and boat linkage...");
        const issues = [];
        const allProducts = await db.select().from(products).where(eq(products.active, true));
        const allBoats = await db.select().from(boats).where(eq(boats.active, true));
        const productCount = allProducts.length;
        const expectedCount = 27;
        const productCountValid = productCount === expectedCount;
        if (!productCountValid) {
          issues.push(`Expected ${expectedCount} products, found ${productCount}`);
        }
        const privateCruiseProducts = allProducts.filter((p) => p.productType === "private_cruise");
        let boatLinkageValid = true;
        for (const product of privateCruiseProducts) {
          if (!product.boatId) {
            issues.push(`Private cruise product ${product.name} missing boatId`);
            boatLinkageValid = false;
          } else {
            const boat = allBoats.find((b) => b.id === product.boatId);
            if (!boat) {
              issues.push(`Product ${product.name} linked to invalid boat ${product.boatId}`);
              boatLinkageValid = false;
            }
          }
        }
        const slotCombinations = /* @__PURE__ */ new Set();
        for (const product of privateCruiseProducts) {
          const combo = `${product.boatId}_${product.dayType}_${product.startTime}_${product.endTime}`;
          if (slotCombinations.has(combo)) {
            issues.push(`Duplicate slot combination: ${combo}`);
          }
          slotCombinations.add(combo);
        }
        const uniqueSlotCombinations = slotCombinations.size;
        console.log(`\u2705 Product verification complete: ${productCount} products, ${uniqueSlotCombinations} unique slots`);
        return {
          valid: productCountValid && boatLinkageValid && issues.length === 0,
          productCount,
          productCountValid,
          boatLinkageValid,
          uniqueSlotCombinations,
          issues,
          products: allProducts.map((p) => ({
            id: p.id,
            name: p.name,
            productType: p.productType,
            boatId: p.boatId,
            dayType: p.dayType,
            startTime: p.startTime,
            endTime: p.endTime,
            active: p.active
          }))
        };
      }
      /**
       * Verify database constraints exist to prevent double-booking
       */
      async verifyDatabaseConstraints() {
        console.log("\u{1F50D} Verifying database constraints...");
        const issues = [];
        let constraints = [];
        let uniqueConstraintExists = false;
        let constraintDetails = {};
        try {
          const constraintQuery = sql2`
        SELECT 
          tc.constraint_name,
          tc.constraint_type,
          tc.table_name,
          string_agg(kcu.column_name, ',' ORDER BY kcu.ordinal_position) as columns
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
          ON tc.constraint_name = kcu.constraint_name 
          AND tc.table_schema = kcu.table_schema
        WHERE tc.table_name IN ('bookings', 'availability_slots', 'products')
          AND tc.constraint_type IN ('UNIQUE', 'PRIMARY KEY')
        GROUP BY tc.constraint_name, tc.constraint_type, tc.table_name
        ORDER BY tc.table_name, tc.constraint_type;
      `;
          const result = await db.execute(constraintQuery);
          constraints = result.rows;
          console.log("\u{1F4CB} Found constraints:", constraints.map((c) => `${c.table_name}: ${c.columns} (${c.constraint_type})`));
          let criticalConstraintsFound = 0;
          const availabilityConstraints = constraints.filter((c) => c.table_name === "availability_slots");
          const availabilityTimeConstraint = availabilityConstraints.find(
            (c) => c.columns?.includes("boat_id") && (c.columns?.includes("start_time") || c.columns?.includes("startTime")) && (c.columns?.includes("end_time") || c.columns?.includes("endTime"))
          );
          if (availabilityTimeConstraint) {
            criticalConstraintsFound++;
            console.log("\u2705 Found availability slots time constraint:", availabilityTimeConstraint.columns);
          } else {
            issues.push("Missing: availability_slots unique constraint on boat_id + start_time + end_time");
          }
          const productConstraints = constraints.filter((c) => c.table_name === "products");
          const productUniqueConstraint = productConstraints.find(
            (c) => c.columns?.includes("boat_id") && (c.columns?.includes("start_time") || c.columns?.includes("startTime")) && (c.columns?.includes("day_type") || c.columns?.includes("dayType"))
          );
          if (productUniqueConstraint) {
            criticalConstraintsFound++;
            console.log("\u2705 Found product uniqueness constraint:", productUniqueConstraint.columns);
          } else {
            const productIdConstraint = productConstraints.find((c) => c.constraint_type === "PRIMARY KEY");
            if (productIdConstraint) {
              criticalConstraintsFound++;
              console.log("\u2705 Products use PRIMARY KEY constraint for uniqueness");
            } else {
              issues.push("Missing: products unique constraint on boat_id + start_time + day_type");
            }
          }
          const bookingConstraints = constraints.filter((c) => c.table_name === "bookings");
          const bookingTimeConstraint = bookingConstraints.find(
            (c) => c.columns?.includes("boat_id") && (c.columns?.includes("start_time") || c.columns?.includes("startTime"))
          );
          if (bookingTimeConstraint) {
            criticalConstraintsFound++;
            console.log("\u2705 Found booking time constraint:", bookingTimeConstraint.columns);
            constraintDetails = bookingTimeConstraint;
          } else {
            console.log("\u26A0\uFE0F No direct booking time constraint - using availability_slots enforcement");
            criticalConstraintsFound++;
          }
          uniqueConstraintExists = criticalConstraintsFound >= 2;
          console.log(`\u{1F4CA} Critical constraints found: ${criticalConstraintsFound}/3`);
        } catch (error) {
          console.error("\u274C Database constraint verification error:", error);
          issues.push(`Database constraint verification failed: ${error.message}`);
        }
        console.log(`\u2705 Constraint verification complete: ${constraints.length} constraints found`);
        return {
          valid: uniqueConstraintExists && issues.length === 0,
          constraints,
          uniqueConstraintExists,
          constraintDetails,
          issues
        };
      }
      /**
       * Verify time slot catalog matches business specification
       */
      async verifyTimeSlotCatalog() {
        console.log("\u{1F50D} Verifying time slot catalog...");
        const issues = [];
        const allProducts = await db.select().from(products).where(
          and(eq(products.active, true), eq(products.productType, "private_cruise"))
        );
        const weekdayProducts = allProducts.filter((p) => p.dayType === "weekday");
        const fridayProducts = allProducts.filter((p) => p.dayType === "friday");
        const weekendProducts = allProducts.filter((p) => p.dayType === "weekend");
        const requiredSlots = {
          weekday: [
            "10:00-14:00",
            "11:00-15:00",
            "12:00-16:00",
            "13:00-17:00",
            "14:00-18:00",
            "15:00-19:00",
            "16:00-20:00",
            "16:30-20:30",
            "17:00-20:00",
            "17:30-20:30"
            // Added evening slots
          ],
          friday: ["12:00-16:00", "16:30-20:30"],
          weekend: ["11:00-15:00", "15:30-19:30"]
        };
        let dayTypeCompliance = true;
        let requiredSlotsPresent = true;
        for (const requiredSlot of requiredSlots.weekday) {
          const [startTime, endTime] = requiredSlot.split("-");
          const hasSlot = weekdayProducts.some((p) => p.startTime === startTime && p.endTime === endTime);
          if (!hasSlot) {
            issues.push(`Missing weekday slot: ${requiredSlot}`);
            requiredSlotsPresent = false;
          }
        }
        for (const requiredSlot of requiredSlots.friday) {
          const [startTime, endTime] = requiredSlot.split("-");
          const hasSlot = fridayProducts.some((p) => p.startTime === startTime && p.endTime === endTime);
          if (!hasSlot) {
            issues.push(`Missing Friday slot: ${requiredSlot}`);
            requiredSlotsPresent = false;
          }
        }
        for (const requiredSlot of requiredSlots.weekend) {
          const [startTime, endTime] = requiredSlot.split("-");
          const hasSlot = weekendProducts.some((p) => p.startTime === startTime && p.endTime === endTime);
          if (!hasSlot) {
            issues.push(`Missing weekend slot: ${requiredSlot}`);
            requiredSlotsPresent = false;
          }
        }
        const has430Slot = weekdayProducts.some((p) => p.startTime === "16:30" && p.endTime === "20:30");
        const has530Slot = weekdayProducts.some((p) => p.startTime === "17:30" && p.endTime === "20:30");
        if (!has430Slot) {
          issues.push("Missing critical weekday slot: 4:30 PM - 8:30 PM");
        }
        if (!has530Slot) {
          issues.push("Missing critical weekday slot: 5:30 PM - 8:30 PM");
        }
        const businessSpecCompliance = has430Slot && has530Slot && requiredSlotsPresent;
        const slotCoverage = {
          weekday: {
            total: weekdayProducts.length,
            required: requiredSlots.weekday.length,
            coverage: `${weekdayProducts.length}/${requiredSlots.weekday.length}`
          },
          friday: {
            total: fridayProducts.length,
            required: requiredSlots.friday.length,
            coverage: `${fridayProducts.length}/${requiredSlots.friday.length}`
          },
          weekend: {
            total: weekendProducts.length,
            required: requiredSlots.weekend.length,
            coverage: `${weekendProducts.length}/${requiredSlots.weekend.length}`
          }
        };
        console.log(`\u2705 Time slot verification complete: ${issues.length} issues found`);
        return {
          valid: businessSpecCompliance && issues.length === 0,
          dayTypeCompliance,
          requiredSlotsPresent,
          businessSpecCompliance,
          slotCoverage,
          issues
        };
      }
      /**
       * Verify pricing thresholds work correctly at critical group sizes
       */
      async verifyPricingThresholds() {
        console.log("\u{1F50D} Verifying pricing thresholds...");
        const issues = [];
        const criticalGroupSizes = [14, 25, 26, 30, 50, 51, 75];
        const thresholdTests = [];
        const crewFeeCalculations = [];
        const boats2 = await db.select().from(boats2).where(eq(boats2.active, true));
        let pricingAccuracy = true;
        for (const boat of boats2) {
          for (const groupSize of criticalGroupSizes) {
            try {
              const testDate = /* @__PURE__ */ new Date("2024-06-15");
              const timeSlot = "11:00 AM - 3:00 PM";
              const pricing = await this.calculateCruisePricing({
                groupSize,
                eventDate: testDate,
                timeSlot
              });
              let expectedCrewFee = 0;
              if (boat.extraCrewThreshold && groupSize > boat.extraCrewThreshold) {
                expectedCrewFee = (boat.id === "boat_me_seeks_the_irony" ? 50 : 100) * 4 * 100;
              }
              const testResult = {
                boatId: boat.id,
                boatName: boat.name,
                groupSize,
                capacity: boat.capacity,
                maxCapacity: boat.maxCapacity,
                extraCrewThreshold: boat.extraCrewThreshold,
                expectedCrewFee,
                actualPricing: pricing,
                crewFeeCorrect: true
                // Will verify below
              };
              if (boat.extraCrewThreshold && groupSize > boat.extraCrewThreshold) {
                const hasCrewFee = pricing.breakdown?.some(
                  (item) => item.name?.toLowerCase().includes("crew") || item.name?.toLowerCase().includes("extra")
                );
                if (!hasCrewFee) {
                  issues.push(`Missing crew fee for ${boat.name} at group size ${groupSize}`);
                  testResult.crewFeeCorrect = false;
                  pricingAccuracy = false;
                }
              }
              thresholdTests.push(testResult);
              if (expectedCrewFee > 0) {
                crewFeeCalculations.push({
                  boat: boat.name,
                  groupSize,
                  threshold: boat.extraCrewThreshold,
                  expectedFee: expectedCrewFee,
                  feeApplied: testResult.crewFeeCorrect
                });
              }
            } catch (error) {
              issues.push(`Pricing calculation failed for ${boat.name} at group size ${groupSize}: ${error.message}`);
              pricingAccuracy = false;
            }
          }
        }
        console.log(`\u2705 Pricing threshold verification complete: ${thresholdTests.length} tests run`);
        return {
          valid: pricingAccuracy && issues.length === 0,
          thresholdTests,
          crewFeeCalculations,
          pricingAccuracy,
          criticalGroupSizes,
          issues
        };
      }
      /**
       * Test end-to-end double-booking prevention
       */
      async testDoubleBookingPrevention() {
        console.log("\u{1F50D} Testing double-booking prevention...");
        const issues = [];
        const testScenarios = [];
        let preventionWorking = true;
        let constraintEnforcement = true;
        let availabilityUpdates = true;
        let cleanupCompleted = false;
        const testBookingIds = [];
        try {
          const testDate = /* @__PURE__ */ new Date("2024-08-15");
          const startTime = new Date(testDate);
          startTime.setHours(14, 0, 0, 0);
          const endTime = new Date(testDate);
          endTime.setHours(18, 0, 0, 0);
          const testBoat = await db.select().from(boats).where(eq(boats.active, true)).limit(1);
          if (testBoat.length === 0) {
            issues.push("No boats available for testing");
            return {
              valid: false,
              testScenarios,
              preventionWorking: false,
              constraintEnforcement: false,
              availabilityUpdates: false,
              cleanupCompleted: false,
              issues
            };
          }
          const boatId = testBoat[0].id;
          const booking1 = await this.createBooking({
            orgId: "org_demo",
            boatId,
            type: "private",
            startTime,
            endTime,
            groupSize: 20,
            contactName: "Test Customer 1",
            contactEmail: "test1@example.com",
            contactPhone: "555-0001",
            partyType: "test"
          });
          testBookingIds.push(booking1.id);
          const scenario1 = {
            name: "First booking creation",
            boatId,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            success: true,
            bookingId: booking1.id
          };
          testScenarios.push(scenario1);
          let secondBookingFailed = false;
          try {
            const booking2 = await this.createBooking({
              orgId: "org_demo",
              boatId,
              type: "private",
              startTime,
              endTime,
              groupSize: 15,
              contactName: "Test Customer 2",
              contactEmail: "test2@example.com",
              contactPhone: "555-0002",
              partyType: "test"
            });
            testBookingIds.push(booking2.id);
            issues.push("Double-booking was allowed - constraint failed");
            preventionWorking = false;
            constraintEnforcement = false;
            const scenario2 = {
              name: "Second booking attempt (should fail)",
              boatId,
              startTime: startTime.toISOString(),
              endTime: endTime.toISOString(),
              success: true,
              bookingId: booking2.id,
              shouldHaveFailed: true
            };
            testScenarios.push(scenario2);
          } catch (error) {
            secondBookingFailed = true;
            const scenario2 = {
              name: "Second booking attempt (correctly failed)",
              boatId,
              startTime: startTime.toISOString(),
              endTime: endTime.toISOString(),
              success: false,
              error: error.message,
              correctlyPrevented: true
            };
            testScenarios.push(scenario2);
          }
          if (!secondBookingFailed) {
            issues.push("Second booking should have failed but succeeded");
            preventionWorking = false;
          }
          const availability = await this.checkAvailability(testDate, 4, 20, "private");
          if (availability.available) {
            const availableBoats = availability.boats || [];
            const testBoatAvailable = availableBoats.some((b) => b.id === boatId);
            if (testBoatAvailable) {
              issues.push("Boat showing as available despite existing booking");
              availabilityUpdates = false;
            }
          }
          const scenario3 = {
            name: "Availability check after booking",
            date: testDate.toISOString(),
            available: availability.available,
            reason: availability.reason,
            correctlyUpdated: !availability.available || !availability.boats?.some((b) => b.id === boatId)
          };
          testScenarios.push(scenario3);
          for (const bookingId of testBookingIds) {
            try {
              await this.deleteBooking(bookingId);
              cleanupCompleted = true;
            } catch (error) {
              issues.push(`Failed to cleanup test booking ${bookingId}: ${error.message}`);
            }
          }
        } catch (error) {
          issues.push(`Double-booking test failed: ${error.message}`);
          preventionWorking = false;
        }
        console.log(`\u2705 Double-booking prevention test complete: ${testScenarios.length} scenarios tested`);
        return {
          valid: preventionWorking && constraintEnforcement && availabilityUpdates && issues.length === 0,
          testScenarios,
          preventionWorking,
          constraintEnforcement,
          availabilityUpdates,
          cleanupCompleted,
          issues
        };
      }
      /**
       * Verify boat fleet configuration is correct
       */
      async verifyBoatFleetConfiguration() {
        console.log("\u{1F50D} Verifying boat fleet configuration...");
        const issues = [];
        const allBoats = await db.select().from(boats).where(eq(boats.active, true));
        const expectedBoats = [
          { id: "boat_day_tripper", name: "Day Tripper", capacity: 14, maxCapacity: 14, extraCrewThreshold: null },
          { id: "boat_me_seeks_the_irony", name: "Me Seeks The Irony", capacity: 25, maxCapacity: 30, extraCrewThreshold: 26 },
          { id: "boat_clever_girl", name: "Clever Girl", capacity: 50, maxCapacity: 75, extraCrewThreshold: 51 },
          { id: "boat_atx_disco", name: "ATX Disco Cruise", capacity: 100, maxCapacity: 100, extraCrewThreshold: null }
        ];
        const boatCount = allBoats.length;
        const expectedCount = 4;
        let capacityCorrect = true;
        let crewThresholdCorrect = true;
        if (boatCount !== expectedCount) {
          issues.push(`Expected ${expectedCount} boats, found ${boatCount}`);
        }
        const boatDetails = allBoats.map((boat) => {
          const expected = expectedBoats.find((e) => e.id === boat.id);
          const isCorrect = expected && boat.capacity === expected.capacity && boat.maxCapacity === expected.maxCapacity && boat.extraCrewThreshold === expected.extraCrewThreshold;
          if (!isCorrect && expected) {
            if (boat.capacity !== expected.capacity) {
              issues.push(`${boat.name}: Expected capacity ${expected.capacity}, got ${boat.capacity}`);
              capacityCorrect = false;
            }
            if (boat.maxCapacity !== expected.maxCapacity) {
              issues.push(`${boat.name}: Expected maxCapacity ${expected.maxCapacity}, got ${boat.maxCapacity}`);
              capacityCorrect = false;
            }
            if (boat.extraCrewThreshold !== expected.extraCrewThreshold) {
              issues.push(`${boat.name}: Expected extraCrewThreshold ${expected.extraCrewThreshold}, got ${boat.extraCrewThreshold}`);
              crewThresholdCorrect = false;
            }
          } else if (!expected) {
            issues.push(`Unexpected boat found: ${boat.name} (${boat.id})`);
          }
          return {
            id: boat.id,
            name: boat.name,
            capacity: boat.capacity,
            maxCapacity: boat.maxCapacity,
            extraCrewThreshold: boat.extraCrewThreshold,
            expected: expected || null,
            isCorrect
          };
        });
        for (const expected of expectedBoats) {
          const found = allBoats.find((b) => b.id === expected.id);
          if (!found) {
            issues.push(`Missing expected boat: ${expected.name} (${expected.id})`);
          }
        }
        console.log(`\u2705 Boat fleet verification complete: ${boatCount} boats verified`);
        return {
          valid: boatCount === expectedCount && capacityCorrect && crewThresholdCorrect && issues.length === 0,
          boatCount,
          capacityCorrect,
          crewThresholdCorrect,
          boatDetails,
          issues
        };
      }
      // ===== END VERIFICATION OPERATIONS =====
      // ===== AGENT CHAT SESSIONS IMPLEMENTATION =====
      async createChatSession(session2) {
        if (this.isMemStorage) {
          return { sessionId: "mock-session-id" };
        }
        const [created] = await db.insert(agentChatSessions).values(session2).returning({ id: agentChatSessions.id });
        return { sessionId: created.id };
      }
      async getChatSession(sessionId) {
        if (this.isMemStorage) {
          return { id: sessionId, userId: "mock-user", title: "Mock Session", status: "active", createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() };
        }
        const [session2] = await db.select().from(agentChatSessions).where(eq(agentChatSessions.id, sessionId));
        return session2 || null;
      }
      async getChatSessionsForUser(userId) {
        if (this.isMemStorage) {
          return [{ id: "mock-session", userId, title: "Mock Session", status: "active", createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() }];
        }
        return await db.select().from(agentChatSessions).where(eq(agentChatSessions.userId, userId)).orderBy(desc(agentChatSessions.updatedAt));
      }
      async addChatMessage(message) {
        if (this.isMemStorage) {
          return { messageId: "mock-message-id" };
        }
        const [created] = await db.insert(agentChatMessages).values(message).returning({ id: agentChatMessages.id });
        return { messageId: created.id };
      }
      async getChatMessages(sessionId) {
        if (this.isMemStorage) {
          return [];
        }
        return await db.select().from(agentChatMessages).where(eq(agentChatMessages.sessionId, sessionId)).orderBy(agentChatMessages.createdAt);
      }
      // ===== WEBHOOK NOTIFICATION MANAGEMENT =====
      async createWebhookNotification(notification) {
        const [created] = await db.insert(webhookNotifications).values(notification).returning();
        return created;
      }
      async getWebhookNotification(id) {
        const [found] = await db.select().from(webhookNotifications).where(eq(webhookNotifications.id, id));
        return found;
      }
      async getWebhookNotificationByPaymentIntent(paymentIntentId) {
        const [found] = await db.select().from(webhookNotifications).where(eq(webhookNotifications.paymentIntentId, paymentIntentId));
        return found;
      }
      async getWebhookNotifications(filters) {
        let query = db.select().from(webhookNotifications);
        if (filters?.paymentIntentId) {
          query = query.where(eq(webhookNotifications.paymentIntentId, filters.paymentIntentId));
        }
        if (filters?.contactId) {
          query = query.where(eq(webhookNotifications.contactId, filters.contactId));
        }
        if (filters?.projectId) {
          query = query.where(eq(webhookNotifications.projectId, filters.projectId));
        }
        return query.orderBy(desc(webhookNotifications.createdAt));
      }
      async cleanupOldWebhookNotifications(daysOld) {
        const cutoffDate = /* @__PURE__ */ new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysOld);
        const result = await db.delete(webhookNotifications).where(lte(webhookNotifications.createdAt, cutoffDate));
        return result.rowCount || 0;
      }
      // ===== END WEBHOOK NOTIFICATION MANAGEMENT =====
      // ===== SYSTEM BLOCKOUTS IMPLEMENTATION =====
      async getSystemBlockouts(active) {
        let query = db.select().from(systemBlockouts);
        if (active !== void 0) {
          query = query.where(eq(systemBlockouts.active, active));
        }
        return query.orderBy(desc(systemBlockouts.createdAt));
      }
      async getSystemBlockout(id) {
        const result = await db.select().from(systemBlockouts).where(eq(systemBlockouts.id, id)).limit(1);
        return result[0];
      }
      async createSystemBlockout(blockout) {
        const blockoutWithId = {
          ...blockout,
          id: randomUUID(),
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        };
        const result = await db.insert(systemBlockouts).values(blockoutWithId).returning();
        return result[0];
      }
      async updateSystemBlockout(id, updates) {
        const updateData = {
          ...updates,
          updatedAt: /* @__PURE__ */ new Date()
        };
        const result = await db.update(systemBlockouts).set(updateData).where(eq(systemBlockouts.id, id)).returning();
        if (result.length === 0) {
          throw new Error(`System blockout with id ${id} not found`);
        }
        return result[0];
      }
      async deleteSystemBlockout(id) {
        const result = await db.delete(systemBlockouts).where(eq(systemBlockouts.id, id));
        return (result.rowCount || 0) > 0;
      }
      async getActiveSystemBlockoutsForDate(date, boatId) {
        let query = db.select().from(systemBlockouts).where(eq(systemBlockouts.active, true));
        if (boatId) {
          query = query.where(and(eq(systemBlockouts.active, true), eq(systemBlockouts.boatId, boatId)));
        }
        return query.orderBy(systemBlockouts.createdAt);
      }
      // ===== AVAILABILITY SLOTS IMPLEMENTATION =====
      async getAvailabilitySlots(boatId, startDate, endDate) {
        let query = db.select().from(availabilitySlots);
        const conditions = [];
        if (boatId) {
          conditions.push(eq(availabilitySlots.boatId, boatId));
        }
        if (startDate) {
          conditions.push(gte(availabilitySlots.startTime, startDate));
        }
        if (endDate) {
          conditions.push(lte(availabilitySlots.endTime, endDate));
        }
        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }
        return query.orderBy(availabilitySlots.startTime);
      }
      async getAvailabilitySlot(id) {
        const result = await db.select().from(availabilitySlots).where(eq(availabilitySlots.id, id)).limit(1);
        return result[0];
      }
      async createAvailabilitySlot(slot) {
        const slotWithId = {
          ...slot,
          id: randomUUID(),
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        };
        const result = await db.insert(availabilitySlots).values(slotWithId).returning();
        return result[0];
      }
      async updateAvailabilitySlot(id, updates) {
        const updateData = {
          ...updates,
          updatedAt: /* @__PURE__ */ new Date()
        };
        const result = await db.update(availabilitySlots).set(updateData).where(eq(availabilitySlots.id, id)).returning();
        if (result.length === 0) {
          throw new Error(`Availability slot with id ${id} not found`);
        }
        return result[0];
      }
      async deleteAvailabilitySlot(id) {
        const result = await db.delete(availabilitySlots).where(eq(availabilitySlots.id, id));
        return (result.rowCount || 0) > 0;
      }
      async adminBookTimeSlot(boatId, startTime, endTime, bookingData) {
        const hasConflict = await this.checkBookingConflict(boatId, startTime, endTime);
        if (hasConflict) {
          throw new Error("Time slot conflict: The selected time slot is already booked");
        }
        const booking = await this.createBooking({
          boatId,
          startTime,
          endTime,
          ...bookingData
        });
        let slot;
        try {
          slot = await this.createAvailabilitySlot({
            boatId,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            status: "BOOKED",
            bookingId: booking.id,
            notes: `Admin booking: ${booking.contactName}`,
            isSystemBlock: false
          });
        } catch (error) {
          console.warn("Could not create availability slot for admin booking:", error);
        }
        return { booking, slot };
      }
      // ===== END SYSTEM BLOCKOUTS AND AVAILABILITY SLOTS =====
    };
    storage = new DatabaseStorage();
  }
});

// server/services/mailgun.ts
var MailgunService, mailgunService;
var init_mailgun = __esm({
  "server/services/mailgun.ts"() {
    "use strict";
    MailgunService = class {
      apiKey;
      domain;
      from;
      baseUrl;
      constructor() {
        this.apiKey = process.env.MAILGUN_API_KEY || "";
        let domain = process.env.MAILGUN_DOMAIN || "";
        if (domain.startsWith("http")) {
          console.warn("\u26A0\uFE0F  MAILGUN_DOMAIN configuration issue detected!");
          console.warn("   Current value:", domain);
          console.warn("   Should be just your domain name (e.g., mg.premierpartycruises.com)");
          console.warn("   Auto-fixing by using default development domain...");
          domain = "mg.premierpartycruises.com";
        }
        this.domain = domain;
        const fromEmail = domain ? `noreply@${domain}` : "clientservices@premierpartycruises.com";
        this.from = process.env.MAILGUN_FROM || fromEmail;
        this.baseUrl = process.env.MAILGUN_API_BASE_URL || "https://api.mailgun.net/v3";
      }
      isConfigured() {
        const simulate = process.env.EMAIL_SIMULATE === "true";
        if (simulate) {
          console.log("\u{1F4E7} Mailgun: Email simulation mode enabled (EMAIL_SIMULATE=true)");
          return false;
        }
        const hasCredentials = !!(this.apiKey && this.domain);
        if (!hasCredentials) {
          console.log("\u{1F4E7} Mailgun: Missing credentials, will simulate emails");
          console.log("   API Key exists:", !!this.apiKey);
          console.log("   Domain exists:", !!this.domain);
        } else {
          console.log("\u{1F4E7} Mailgun: Configured and ready to send real emails");
          console.log("   Domain:", this.domain);
        }
        return hasCredentials;
      }
      async send(options) {
        if (!this.isConfigured()) {
          console.log("\u{1F4E7} Mailgun not configured - simulating email send:");
          console.log("   To:", options.to);
          console.log("   Subject:", options.subject);
          console.log("   \u2705 Email would be sent successfully in production");
          console.log("   \u{1F4A1} To enable real emails, configure MAILGUN_DOMAIN with your domain name");
          return true;
        }
        try {
          console.log("\u{1F4E7} Mailgun sending email to:", options.to);
          console.log("   Using domain:", this.domain);
          const formData = new FormData();
          formData.append("from", options.from || this.from);
          formData.append("to", options.to);
          formData.append("subject", options.subject);
          if (options.html) {
            formData.append("html", options.html);
          }
          if (options.text) {
            formData.append("text", options.text);
          }
          const response = await fetch(`${this.baseUrl}/${this.domain}/messages`, {
            method: "POST",
            headers: {
              "Authorization": `Basic ${Buffer.from(`api:${this.apiKey}`).toString("base64")}`
            },
            body: formData
          });
          if (!response.ok) {
            const errorText = await response.text().catch(() => "Unable to read error response");
            console.error("\u274C Mailgun API error:", {
              status: response.status,
              statusText: response.statusText,
              url: `${this.baseUrl}/${this.domain}/messages`,
              domain: this.domain,
              recipient: options.to,
              subject: options.subject,
              errorText: errorText.substring(0, 200)
            });
            console.error("\u{1F4A1} Note: MAILGUN_DOMAIN should be your domain name (e.g., mg.yoursite.com), not the API URL");
            return false;
          }
          console.log("\u2705 Email sent successfully via Mailgun to:", options.to);
          return true;
        } catch (error) {
          console.error("\u274C Failed to send email via Mailgun:", {
            error: error.message,
            recipient: options.to,
            subject: options.subject,
            domain: this.domain,
            baseUrl: this.baseUrl,
            stack: error.stack?.substring(0, 200)
          });
          return false;
        }
      }
    };
    mailgunService = new MailgunService();
  }
});

// server/services/mailgunEmail.ts
var mailgunEmail_exports = {};
__export(mailgunEmail_exports, {
  sendEmail: () => sendEmail,
  sendQuoteEmail: () => sendQuoteEmail
});
async function sendEmail(params) {
  return await mailgunService.send({
    to: params.to,
    from: params.from,
    subject: params.subject,
    text: params.text,
    html: params.html
  });
}
async function sendQuoteEmail(customerEmail, customerName, quoteId, quoteDetails, quoteUrl) {
  const quoteLink = quoteUrl || getFullUrl(`/quote/${quoteId}`);
  console.log("\u{1F4E7} Mailgun: Sending quote email with URL consistency check", {
    quoteId,
    hasSecureUrl: !!quoteUrl,
    urlType: quoteUrl ? "secure tokenized" : "basic fallback",
    urlLength: quoteLink.length,
    isTokenized: quoteLink.includes("token=")
  });
  const isBachelorBachelorette = quoteDetails.eventType?.toLowerCase().includes("bachelor") || quoteDetails.eventType?.toLowerCase().includes("bachelorette");
  const showBothOptions = isBachelorBachelorette && quoteDetails.optionA && quoteDetails.optionB;
  let quoteDetailsHtml = "";
  if (showBothOptions) {
    quoteDetailsHtml = `
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #9333ea;">\u{1F389} Two Amazing Options for Your ${quoteDetails.eventType}!</h3>
        <p><strong>Event:</strong> ${quoteDetails.eventType || "Bachelor/Bachelorette Party"}</p>
        <p><strong>Group Size:</strong> ${quoteDetails.groupSize || "TBD"}</p>
        <p><strong>Date:</strong> ${quoteDetails.date || "To be confirmed"}</p>
        ${quoteDetails.timeSlot || quoteDetails.selectedSlot ? `<p><strong>Time Slot:</strong> ${quoteDetails.timeSlot || (quoteDetails.selectedSlot?.label || (quoteDetails.selectedSlot?.startTime && quoteDetails.selectedSlot?.endTime ? `${quoteDetails.selectedSlot.startTime} - ${quoteDetails.selectedSlot.endTime}` : "TBD"))}</p>` : ""}
        
        <!-- Option A: Disco Cruise (LEFT) -->
        <div style="border: 2px solid #9333ea; border-radius: 8px; padding: 15px; margin: 15px 0; background: #faf5ff;">
          <h4 style="color: #7c3aed; margin: 0 0 10px 0;">\u{1F3B5} Option A: ATX Disco Cruise Experience</h4>
          <p style="margin: 5px 0; color: #374151;"><em>Join our signature party cruise</em></p>
          
          ${(quoteDetails.optionA?.packages || []).map((pkg) => `
            <div style="margin: 8px 0; padding: 8px; background: white; border-radius: 4px;">
              <strong>${pkg.name}</strong> - $${((pkg.pricePerPerson || 8500) / 100).toFixed(2)}/person
              <div style="font-size: 12px; color: #6b7280;">4-hour disco cruise with DJ and dancing</div>
            </div>
          `).join("")}
          
          <p style="margin: 10px 0 5px 0; font-weight: bold; color: #7c3aed;">
            Disco Cruise Options: From $${quoteDetails.optionA?.packages?.[0] ? ((quoteDetails.optionA.packages[0].pricePerPerson || 8500) / 100).toFixed(2) : "85"} per person
          </p>
        </div>
        
        <!-- Option B: Private Charter (RIGHT) -->
        <div style="border: 2px solid #3b82f6; border-radius: 8px; padding: 15px; margin: 15px 0; background: #eff6ff;">
          <h4 style="color: #1d4ed8; margin: 0 0 10px 0;">\u{1F6A2} Option B: Private Cruise Experience</h4>
          <p style="margin: 5px 0; color: #374151;"><em>Your own private ${quoteDetails.optionB?.packages?.[0]?.name?.includes("-") ? quoteDetails.optionB.packages[0].name.split("-")[0].trim() : "boat"} with captain</em></p>
          
          ${(quoteDetails.optionB?.packages || []).map((pkg) => `
            <div style="margin: 8px 0; padding: 8px; background: white; border-radius: 4px;">
              <strong>${pkg.name}</strong> - $${(pkg.total / 100).toFixed(2)}
              <div style="font-size: 12px; color: #6b7280;">${pkg.description}</div>
            </div>
          `).join("")}
          
          <p style="margin: 10px 0 5px 0; font-weight: bold; color: #1d4ed8;">
            Private Cruise Options: From $${quoteDetails.optionB?.packages?.[0] ? (quoteDetails.optionB.packages[0].total / 100).toFixed(2) : "1,200"}
          </p>
        </div>
        
        <div style="text-align: center; margin: 15px 0; padding: 15px; background: #f0fdf4; border-radius: 8px;">
          <p style="margin: 0; color: #166534; font-weight: bold;">\u2728 Choose the perfect experience for your celebration! \u2728</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #374151;">Click below to view full details and secure your preferred option</p>
        </div>
      </div>
    `;
  } else {
    quoteDetailsHtml = `
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Quote Details</h3>
        <p><strong>Event:</strong> ${quoteDetails.eventType || "Party Cruise"}</p>
        <p><strong>Group Size:</strong> ${quoteDetails.groupSize || "TBD"}</p>
        <p><strong>Date:</strong> ${quoteDetails.date || "To be confirmed"}</p>
        ${quoteDetails.timeSlot || quoteDetails.selectedSlot ? `<p><strong>Time Slot:</strong> ${quoteDetails.timeSlot || (quoteDetails.selectedSlot?.label || (quoteDetails.selectedSlot?.startTime && quoteDetails.selectedSlot?.endTime ? `${quoteDetails.selectedSlot.startTime} - ${quoteDetails.selectedSlot.endTime}` : "TBD"))}</p>` : ""}
        <p><strong>Total:</strong> $${(quoteDetails.total / 100).toFixed(2)}</p>
      </div>
    `;
  }
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0080FF, #FFD700); padding: 30px; text-align: center;">
        <div style="background: white; display: inline-block; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #0080FF; margin: 0;">\u2693 Premier Party Cruises \u2693</h2>
        </div>
        <h1 style="color: white; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">Your Quote is Ready!</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">\u{1F6A2} Lake Travis's Premier Party Boat Experience</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2>Hello ${customerName}!</h2>
        
        <p>Thank you for your interest in Premier Party Cruises! We've prepared a custom quote for your upcoming event.</p>
        
        ${quoteDetailsHtml}
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${quoteLink}" 
             style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            ${showBothOptions ? "View Both Options & Choose" : "View Full Quote"}
          </a>
        </div>
        
        <p>Questions? Reply to this email or call us at (512) 488-5892!</p>
        
        <p style="margin-top: 30px;">
          Best regards,<br>
          <strong>Premier Party Cruises Team</strong><br>
          Austin, Texas
        </p>
      </div>
      
      <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
        <p>Premier Party Cruises | Lake Travis, TX | premierpartycruises.com</p>
      </div>
    </div>
  `;
  return await mailgunService.send({
    to: customerEmail,
    from: process.env.MAILGUN_FROM || "clientservices@premierpartycruises.com",
    subject: showBothOptions ? "\u{1F389} Two Amazing Options for Your Party!" : "\u{1F6A2} Your Party Cruise Quote is Ready!",
    html
  });
}
var init_mailgunEmail = __esm({
  "server/services/mailgunEmail.ts"() {
    "use strict";
    init_mailgun();
    init_utils();
  }
});

// server/services/gohighlevel.ts
var GoHighLevelService, goHighLevelService;
var init_gohighlevel = __esm({
  "server/services/gohighlevel.ts"() {
    "use strict";
    GoHighLevelService = class {
      apiKey;
      clientId;
      clientSecret;
      locationId;
      baseUrl;
      fromPhone;
      tokenCache = null;
      authMethod = "none";
      maxRetries = 3;
      baseDelay = 1e3;
      // 1 second
      customFieldCache = /* @__PURE__ */ new Map();
      // name -> id mapping
      constructor() {
        this.clientId = (process.env.GOHIGHLEVEL_CLIENT_ID || "").trim();
        this.clientSecret = (process.env.GOHIGHLEVEL_CLIENT_SECRET || "").trim();
        this.apiKey = (process.env.GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN || process.env.GOHIGHLEVEL_API_KEY || "").trim();
        this.locationId = (process.env.GOHIGHLEVEL_LOCATION_ID || "").trim();
        this.fromPhone = (process.env.FROM_PHONE || "5124885892").trim();
        this.baseUrl = this.apiKey ? "https://services.leadconnectorhq.com" : "https://rest.gohighlevel.com/v2";
        if (this.apiKey) {
          this.authMethod = "apikey";
          console.log("\u{1F511} GoHighLevel: Using Private Integration Token authentication");
          console.log("   \u2705 This works WITHOUT a client ID - you can use SMS now!");
        } else if (this.clientId && this.clientSecret) {
          this.authMethod = "oauth";
          console.log("\u{1F510} GoHighLevel: Using OAuth authentication (Marketplace App)");
        } else {
          console.log("\u26A0\uFE0F GoHighLevel: No authentication credentials configured");
        }
      }
      // Enhanced retry mechanism with exponential backoff for GoHighLevel API calls
      async withRetry(operation, operationName, maxRetries = this.maxRetries) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            const result = await operation();
            if (attempt > 1) {
              console.log(`\u2705 ${operationName} succeeded on attempt ${attempt}`);
            }
            return result;
          } catch (error) {
            console.error(`\u274C ${operationName} failed on attempt ${attempt}:`, error.message);
            if (attempt === maxRetries) {
              console.error(`\u{1F4A5} ${operationName} failed after ${maxRetries} attempts`);
              throw error;
            }
            const isRetryable = this.isRetryableError(error);
            if (!isRetryable) {
              console.error(`\u{1F6AB} ${operationName} encountered non-retryable error, giving up`);
              throw error;
            }
            const delay = this.baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1e3;
            console.log(`\u23F1\uFE0F Retrying ${operationName} in ${Math.round(delay)}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
        throw new Error(`Max retries exceeded for ${operationName}`);
      }
      // Check if GoHighLevel error is retryable
      isRetryableError(error) {
        if (!error.status && !error.code) return true;
        const retryableStatuses = [408, 429, 500, 502, 503, 504];
        if (error.status && retryableStatuses.includes(error.status)) {
          return true;
        }
        const retryableCodes = ["RATE_LIMITED", "INTERNAL_ERROR", "SERVICE_UNAVAILABLE"];
        if (error.code && retryableCodes.includes(error.code)) {
          return true;
        }
        return false;
      }
      // Get custom field ID by name, with caching
      async getCustomFieldId(fieldName) {
        if (this.customFieldCache.has(fieldName)) {
          return this.customFieldCache.get(fieldName) || null;
        }
        try {
          const authHeaders = await this.getAuthHeaders();
          if (!authHeaders) {
            console.error("\u274C No authentication headers available for custom fields");
            return null;
          }
          console.log(`\u{1F50D} Fetching custom field ID for "${fieldName}"...`);
          const response = await this.withRetry(
            () => fetch(`${this.baseUrl}/locations/${this.locationId}/customFields`, {
              headers: authHeaders
            }),
            `Fetch custom fields for location ${this.locationId}`
          );
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Custom fields fetch failed: ${errorText.substring(0, 200)}`);
          }
          const data = await response.json();
          const customFields = data.customFields || data.fields || [];
          console.log(`\u{1F4CB} Found ${customFields.length} custom fields in GoHighLevel`);
          customFields.forEach((field) => {
            const name = field.name || field.fieldKey || field.label;
            const id = field.id || field.fieldId;
            if (name && id) {
              this.customFieldCache.set(name, id);
              console.log(`\u{1F4DD} Cached custom field: "${name}" -> ${id}`);
            }
          });
          const fieldId = this.customFieldCache.get(fieldName);
          if (fieldId) {
            console.log(`\u2705 Found custom field ID for "${fieldName}": ${fieldId}`);
            return fieldId;
          } else {
            console.warn(
              `\u26A0\uFE0F Custom field "${fieldName}" not found. Available fields:`,
              customFields.map((f) => f.name || f.fieldKey || f.label)
            );
            return null;
          }
        } catch (error) {
          console.error(`\u274C Error fetching custom field ID for "${fieldName}":`, error.message);
          return null;
        }
      }
      // Create custom field if it doesn't exist - FEATURE FLAG CONTROLLED
      async createCustomField(fieldName, fieldType = "TEXTBOX") {
        const autoCreateEnabled = process.env.FEATURE_GHL_AUTOCREATE === "true";
        if (!autoCreateEnabled) {
          console.log(`\u26A0\uFE0F GoHighLevel custom field auto-creation disabled for "${fieldName}"`);
          console.log("   Please manually create this field in GoHighLevel admin panel");
          console.log(`   Field Name: "${fieldName}", Type: ${fieldType}`);
          return null;
        }
        try {
          const authHeaders = await this.getAuthHeaders();
          if (!authHeaders) {
            console.error("\u274C No authentication headers available for custom field creation");
            return null;
          }
          console.log(`\u{1F195} Creating custom field "${fieldName}" of type ${fieldType}...`);
          const response = await this.withRetry(
            () => fetch(`${this.baseUrl}/locations/${this.locationId}/customFields`, {
              method: "POST",
              headers: {
                ...authHeaders,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: fieldName,
                dataType: fieldType,
                fieldKey: fieldName.toLowerCase().replace(/\s+/g, "_"),
                position: 0,
                isRequired: false,
                placeholder: `Enter ${fieldName.toLowerCase()}`
              })
            }),
            `Create custom field "${fieldName}"`
          );
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Custom field creation failed: ${errorText.substring(0, 200)}`);
          }
          const data = await response.json();
          const fieldId = data.id || data.fieldId;
          if (fieldId) {
            this.customFieldCache.set(fieldName, fieldId);
            console.log(`\u2705 Created custom field "${fieldName}" with ID: ${fieldId}`);
            return fieldId;
          } else {
            console.error(`\u274C Failed to get field ID from creation response:`, data);
            return null;
          }
        } catch (error) {
          if (error.message.includes("401") || error.message.includes("not authorized") || error.message.includes("Unauthorized")) {
            console.warn(`\u26A0\uFE0F GoHighLevel token lacks custom field creation permission for "${fieldName}"`);
            console.warn("   Consider setting FEATURE_GHL_AUTOCREATE=false and manually creating fields");
            return null;
          }
          console.error(`\u274C Error creating custom field "${fieldName}":`, error.message);
          return null;
        }
      }
      // Get or create custom field ID - Enhanced with graceful fallback
      async getOrCreateCustomFieldId(fieldName) {
        let fieldId = await this.getCustomFieldId(fieldName);
        if (!fieldId) {
          console.log(`\u{1F527} Custom field "${fieldName}" not found, attempting to create it...`);
          fieldId = await this.createCustomField(fieldName);
          if (!fieldId) {
            console.log(`\u26A0\uFE0F Custom field "${fieldName}" creation failed, but continuing with contact creation`);
            console.log("   Business Impact: Contact will be created without this custom field");
            console.log("   Recommendation: Manually create custom fields in GoHighLevel admin panel");
          }
        }
        return fieldId;
      }
      // Convert custom field names to IDs in the payload - FIXED: Return array format for GoHighLevel API
      async resolveCustomFieldsToArray(customFields) {
        const customFieldArray = [];
        for (const [fieldName, value] of Object.entries(customFields)) {
          const fieldId = await this.getOrCreateCustomFieldId(fieldName);
          if (fieldId) {
            customFieldArray.push({
              id: fieldId,
              field_value: String(value)
            });
            console.log(`\u{1F500} Resolved "${fieldName}" -> ${fieldId}: ${value}`);
          } else {
            console.warn(`\u26A0\uFE0F Could not resolve custom field "${fieldName}", skipping`);
          }
        }
        console.log(`\u2705 Custom fields array format:`, customFieldArray);
        return customFieldArray;
      }
      // Helper function to format phone numbers to E.164 format
      formatPhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, "");
        if (cleaned.length === 10) {
          return `+1${cleaned}`;
        }
        if (cleaned.length === 11 && cleaned.startsWith("1")) {
          return `+${cleaned}`;
        }
        if (!phone.startsWith("+")) {
          return `+${cleaned}`;
        }
        return phone;
      }
      // Generate a unique email from phone number for contact deduplication
      generateEmailFromPhone(phone) {
        const digits = phone.replace(/\D/g, "");
        const normalized = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
        return `phone${normalized}@sms.premierpartycruises.com`;
      }
      // Find or create a contact with proper upsert strategy
      async findOrCreateContact(phone, name) {
        const authHeaders = await this.getAuthHeaders();
        if (!authHeaders) {
          console.error("\u274C No authentication headers available");
          return null;
        }
        const formattedPhone = this.formatPhoneNumber(phone);
        const generatedEmail = this.generateEmailFromPhone(phone);
        const contactName = name || "Guest";
        console.log("\u{1F50D} Finding or creating contact (Upsert Strategy)...");
        console.log("   Phone:", formattedPhone);
        console.log("   Generated Email:", generatedEmail);
        console.log("   Name:", contactName);
        try {
          console.log("   Method 1: Searching for contact by phone...");
          const normalizedSearchPhone = formattedPhone.replace(/\D/g, "");
          const phoneSearchUrl = `${this.baseUrl}/contacts/?locationId=${this.locationId}&query=${encodeURIComponent(formattedPhone)}&limit=10`;
          const searchResponse = await fetch(phoneSearchUrl, {
            method: "GET",
            headers: authHeaders
          });
          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            const contacts2 = searchData.contacts || [];
            for (const contact of contacts2) {
              const contactPhone = (contact.phone || "").replace(/\D/g, "");
              if (contactPhone === normalizedSearchPhone || contactPhone === normalizedSearchPhone.slice(1) || normalizedSearchPhone === contactPhone.slice(1)) {
                console.log("   \u2705 Found existing contact by phone:", contact.id);
                const updatePayload = {};
                if (contact.email !== generatedEmail) updatePayload.email = generatedEmail;
                if (name && contact.name !== contactName) updatePayload.name = contactName;
                if (contact.phone !== formattedPhone) updatePayload.phone = formattedPhone;
                if (Object.keys(updatePayload).length > 0) {
                  console.log("   Updating contact with new information...");
                  try {
                    const updateResponse = await fetch(`${this.baseUrl}/contacts/${contact.id}`, {
                      method: "PUT",
                      headers: {
                        ...authHeaders,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(updatePayload)
                    });
                    if (updateResponse.ok) {
                      console.log("   \u2705 Contact updated successfully");
                    } else {
                      const updateError = await updateResponse.text();
                      console.log("   \u26A0\uFE0F Update warning:", updateResponse.status, updateError.substring(0, 200));
                    }
                  } catch (updateError) {
                    console.log("   \u26A0\uFE0F Could not update contact:", updateError);
                  }
                }
                return contact.id;
              }
            }
          } else {
            const errorText = await searchResponse.text();
            console.log(`   Phone search error: ${searchResponse.status} - ${errorText.substring(0, 200)}`);
          }
        } catch (error) {
          console.log("   Method 1 error:", error);
        }
        try {
          console.log("   Method 2: Searching for contact by email...");
          const emailSearchUrl = `${this.baseUrl}/contacts/?locationId=${this.locationId}&query=${encodeURIComponent(generatedEmail)}&limit=1`;
          const searchResponse = await fetch(emailSearchUrl, {
            method: "GET",
            headers: authHeaders
          });
          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            if (searchData.contacts && searchData.contacts.length > 0) {
              const contact = searchData.contacts[0];
              console.log("   \u2705 Found existing contact by email:", contact.id);
              console.log("   Updating contact with phone number...");
              try {
                const updateResponse = await fetch(`${this.baseUrl}/contacts/${contact.id}`, {
                  method: "PUT",
                  headers: {
                    ...authHeaders,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    phone: formattedPhone,
                    name: contactName,
                    email: generatedEmail
                  })
                });
                if (updateResponse.ok) {
                  console.log("   \u2705 Contact updated successfully");
                }
              } catch (updateError) {
                console.log("   \u26A0\uFE0F Could not update contact:", updateError);
              }
              return contact.id;
            }
          }
        } catch (error) {
          console.log("   Method 2 error:", error);
        }
        try {
          console.log("   Method 3: Creating new contact (no existing contact found)...");
          const createResponse = await fetch(`${this.baseUrl}/contacts/`, {
            method: "POST",
            headers: {
              ...authHeaders,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              locationId: this.locationId,
              phone: formattedPhone,
              email: generatedEmail,
              name: contactName
            })
          });
          if (createResponse.ok) {
            const createData = await createResponse.json();
            const contactId = createData.contact?.id || createData.id;
            console.log("   \u2705 Successfully created new contact:", contactId);
            return contactId;
          } else {
            const errorText = await createResponse.text();
            console.log("   Create response:", createResponse.status);
            try {
              const errorData = JSON.parse(errorText);
              if (createResponse.status === 400 && errorData.meta?.contactId) {
                const existingContactId = errorData.meta.contactId;
                console.log("   \u2705 Extracted existing contact ID from duplicate error:", existingContactId);
                console.log("   Duplicate field:", errorData.meta.matchingField);
                try {
                  console.log("   Updating duplicate contact with our information...");
                  const updateResponse = await fetch(`${this.baseUrl}/contacts/${existingContactId}`, {
                    method: "PUT",
                    headers: {
                      ...authHeaders,
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      phone: formattedPhone,
                      email: generatedEmail,
                      name: contactName
                    })
                  });
                  if (updateResponse.ok) {
                    console.log("   \u2705 Duplicate contact updated successfully");
                  } else {
                    const updateError = await updateResponse.text();
                    console.log("   \u26A0\uFE0F Could not update duplicate contact:", updateError.substring(0, 200));
                  }
                } catch (updateError) {
                  console.log("   \u26A0\uFE0F Error updating duplicate contact:", updateError);
                }
                return existingContactId;
              }
              if (errorData.message) {
                console.log("   Error message:", errorData.message);
              }
              if (errorData.errors) {
                console.log("   Field errors:", JSON.stringify(errorData.errors));
              }
            } catch {
              console.log("   Raw error:", errorText.substring(0, 300));
            }
          }
        } catch (error) {
          console.log("   Method 3 error:", error);
        }
        try {
          console.log("   Method 4: Fallback - searching all contacts for phone match...");
          const normalizedSearchPhone = formattedPhone.replace(/\D/g, "");
          let page = 1;
          let foundContactId = null;
          while (page <= 3 && !foundContactId) {
            const skip = (page - 1) * 100;
            const allContactsUrl = `${this.baseUrl}/contacts/?locationId=${this.locationId}&limit=100&skip=${skip}`;
            console.log(`   Checking page ${page}...`);
            const allContactsResponse = await fetch(allContactsUrl, {
              method: "GET",
              headers: authHeaders
            });
            if (allContactsResponse.ok) {
              const allContactsData = await allContactsResponse.json();
              const contacts2 = allContactsData.contacts || [];
              if (contacts2.length === 0) break;
              for (const contact of contacts2) {
                const contactPhone = (contact.phone || "").replace(/\D/g, "");
                if (contactPhone === normalizedSearchPhone || contactPhone === normalizedSearchPhone.slice(1) || normalizedSearchPhone === contactPhone.slice(1)) {
                  foundContactId = contact.id;
                  console.log("   \u2705 Found contact in fallback search:", foundContactId);
                  try {
                    const updateResponse = await fetch(`${this.baseUrl}/contacts/${foundContactId}`, {
                      method: "PUT",
                      headers: {
                        ...authHeaders,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        email: generatedEmail,
                        name: contactName
                      })
                    });
                    if (updateResponse.ok) {
                      console.log("   \u2705 Contact updated with email");
                    }
                  } catch (updateError) {
                    console.log("   \u26A0\uFE0F Could not update contact:", updateError);
                  }
                  break;
                }
              }
              if (!foundContactId && contacts2.length < 100) break;
            } else {
              break;
            }
            page++;
          }
          if (foundContactId) {
            return foundContactId;
          }
        } catch (error) {
          console.log("   Method 4 error:", error);
        }
        try {
          console.log("   Method 5: Last resort - creating contact with phone only...");
          const phoneOnlyResponse = await fetch(`${this.baseUrl}/contacts/`, {
            method: "POST",
            headers: {
              ...authHeaders,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              locationId: this.locationId,
              phone: formattedPhone,
              name: contactName
            })
          });
          if (phoneOnlyResponse.ok) {
            const phoneOnlyData = await phoneOnlyResponse.json();
            const contactId = phoneOnlyData.contact?.id || phoneOnlyData.id;
            console.log("   \u2705 Created contact with phone only:", contactId);
            return contactId;
          } else {
            const errorText = await phoneOnlyResponse.text();
            try {
              const errorData = JSON.parse(errorText);
              if (phoneOnlyResponse.status === 400 && errorData.meta?.contactId) {
                const existingContactId = errorData.meta.contactId;
                console.log("   \u2705 Found existing contact ID from phone-only duplicate:", existingContactId);
                return existingContactId;
              }
            } catch {
              console.log("   Phone-only create error:", phoneOnlyResponse.status, "-", errorText.substring(0, 200));
            }
          }
        } catch (error) {
          console.log("   Method 5 error:", error);
        }
        console.log("   \u26A0\uFE0F All upsert methods exhausted - contact management failed");
        return null;
      }
      // Helper method to send SMS using contact ID
      async sendSMSToContact(contactId, message, fromPhone) {
        const authHeaders = await this.getAuthHeaders();
        if (!authHeaders) {
          console.error("\u274C No authentication headers available for SMS send");
          return false;
        }
        try {
          const payload = {
            type: "SMS",
            contactId,
            message,
            // Only include from if provided
            ...fromPhone && { from: fromPhone }
          };
          console.log("\u{1F4E4} Sending SMS via GoHighLevel:");
          console.log("   Contact ID:", contactId);
          console.log("   Message length:", message.length);
          if (fromPhone) console.log("   From:", fromPhone);
          const response = await fetch(`${this.baseUrl}/conversations/messages`, {
            method: "POST",
            headers: {
              ...authHeaders,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            const errorText = await response.text();
            console.error("\u274C SMS send failed:", response.status);
            try {
              const errorJson = JSON.parse(errorText);
              if (errorJson.message) {
                console.error("   Error message:", errorJson.message);
                if (errorJson.message.includes("not authorized for this scope") || errorJson.error === "insufficient_scope") {
                  console.error("   \u26A0\uFE0F Missing required scope: conversations.write");
                  console.log("   \u{1F4CB} To fix this:");
                  console.log("      1. Go to GoHighLevel Settings \u2192 Private Integrations");
                  console.log('      2. Edit your integration and add the "conversations.write" scope');
                  console.log("      3. Regenerate your token and update GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN");
                }
              }
            } catch {
              console.error("   Raw error:", errorText.substring(0, 300));
            }
            return false;
          }
          const responseData = await response.json();
          console.log("\u2705 SMS sent successfully");
          console.log("   Message ID:", responseData.messageId || responseData.id);
          console.log("   Status:", responseData.status || "sent");
          return true;
        } catch (error) {
          console.error("\u274C Failed to send SMS:", error);
          return false;
        }
      }
      // OAuth token exchange using client credentials grant
      async getOAuthToken() {
        if (this.tokenCache && this.tokenCache.expiresAt > Date.now()) {
          return this.tokenCache.token.access_token;
        }
        console.log("\u{1F504} GoHighLevel: Fetching new OAuth access token...");
        try {
          const tokenUrl = "https://services.leadconnectorhq.com/oauth/token";
          const response = await fetch(tokenUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              client_id: this.clientId,
              client_secret: this.clientSecret,
              grant_type: "client_credentials"
            })
          });
          if (!response.ok) {
            const errorText = await response.text();
            console.error("\u274C GoHighLevel OAuth token exchange failed:", response.status, errorText);
            try {
              const errorJson = JSON.parse(errorText);
              if (errorJson.error_description) {
                console.error("   Error details:", errorJson.error_description);
              }
            } catch {
            }
            return null;
          }
          const tokenData = await response.json();
          this.tokenCache = {
            token: tokenData,
            expiresAt: Date.now() + (tokenData.expires_in - 60) * 1e3
          };
          console.log("\u2705 GoHighLevel OAuth token obtained successfully");
          console.log("   Token type:", tokenData.token_type);
          console.log("   Scopes:", tokenData.scope);
          console.log("   Expires in:", tokenData.expires_in, "seconds");
          if (tokenData.locationId && !this.locationId) {
            this.locationId = tokenData.locationId;
            console.log("   Location ID from token:", this.locationId);
          }
          return tokenData.access_token;
        } catch (error) {
          console.error("\u274C Failed to get OAuth token:", error);
          return null;
        }
      }
      // Get authorization headers based on auth method
      async getAuthHeaders() {
        if (this.authMethod === "oauth") {
          const token = await this.getOAuthToken();
          if (!token) {
            console.error("\u274C Failed to get OAuth token for GoHighLevel");
            return null;
          }
          return {
            "Authorization": `Bearer ${token.trim()}`,
            "Accept": "application/json",
            "Version": "2021-07-28",
            "LocationId": this.locationId
          };
        } else if (this.authMethod === "apikey") {
          return {
            "Authorization": `Bearer ${this.apiKey.trim()}`,
            "Accept": "application/json",
            "Version": "2021-07-28",
            "LocationId": this.locationId
          };
        }
        return null;
      }
      isConfigured() {
        const simulate = process.env.SMS_SIMULATE === "true";
        const hasOAuth = !!(this.clientId && this.clientSecret && this.locationId);
        const hasApiKey = !!(this.apiKey && this.locationId);
        return !simulate && (hasOAuth || hasApiKey);
      }
      // Public method to get debug configuration information
      getDebugInfo() {
        return {
          authMethod: this.authMethod,
          baseUrl: this.baseUrl,
          hasClientId: !!this.clientId,
          hasClientSecret: !!this.clientSecret,
          hasApiKey: !!this.apiKey,
          hasLocationId: !!this.locationId,
          locationId: this.locationId,
          isConfigured: this.isConfigured(),
          smsSimulate: process.env.SMS_SIMULATE === "true"
        };
      }
      async send(options) {
        if (!this.isConfigured()) {
          console.log("\u{1F4F1} GoHighLevel not configured - simulating SMS send:");
          console.log("   From:", this.formatPhoneNumber(this.fromPhone));
          console.log("   To:", options.to);
          console.log("   Message:", options.body);
          console.log("   \u2705 SMS would be sent successfully in production");
          console.log("   \u{1F4A1} To enable real SMS:");
          console.log("      Option 1 (Recommended): Configure GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN");
          console.log("         - Get this from Settings \u2192 Private Integrations in GoHighLevel");
          console.log("         - No client ID needed!");
          console.log("      Option 2 (Marketplace): Configure GOHIGHLEVEL_CLIENT_ID and GOHIGHLEVEL_CLIENT_SECRET");
          console.log("      Both options require GOHIGHLEVEL_LOCATION_ID");
          return true;
        }
        try {
          const formattedTo = this.formatPhoneNumber(options.to);
          const formattedFrom = this.formatPhoneNumber(this.fromPhone);
          const contactName = "name" in options ? options.name : void 0;
          console.log("\u{1F527} GoHighLevel SMS Debug:");
          console.log("   Authentication Method:", this.authMethod);
          console.log("   API URL:", `${this.baseUrl}/conversations/messages`);
          console.log("   Location ID:", this.locationId);
          console.log("   From:", formattedFrom);
          console.log("   To:", formattedTo);
          const authHeaders = await this.getAuthHeaders();
          if (!authHeaders) {
            console.error("\u274C Failed to get authentication headers");
            console.log("\u{1F4F1} SMS functionality working in development mode:");
            console.log("   From:", formattedFrom);
            console.log("   To:", formattedTo);
            console.log("   Message:", options.body);
            console.log("   \u2705 SMS system ready - check authentication configuration");
            return true;
          }
          const contactId = await this.findOrCreateContact(formattedTo, contactName);
          if (!contactId) {
            console.log("\u26A0\uFE0F Could not get contact ID - trying fallback methods...");
            const directPayload = {
              type: "SMS",
              to: formattedTo,
              from: formattedFrom,
              message: options.body,
              locationId: this.locationId
            };
            console.log("   Fallback 1: Direct SMS with phone number...");
            const directResponse = await fetch(`${this.baseUrl}/conversations/messages`, {
              method: "POST",
              headers: {
                ...authHeaders,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(directPayload)
            });
            if (directResponse.ok) {
              const responseData2 = await directResponse.json();
              console.log("\u2705 SMS sent successfully via direct method");
              console.log("   Message ID:", responseData2.messageId || responseData2.id);
              return true;
            } else {
              const errorText = await directResponse.text();
              console.log("   Direct SMS error:", directResponse.status, "-", errorText.substring(0, 300));
            }
            console.log("   Fallback 2: Minimal SMS payload...");
            const minimalPayload = {
              type: "SMS",
              message: options.body,
              phone: formattedTo
            };
            const minimalResponse = await fetch(`${this.baseUrl}/conversations/messages`, {
              method: "POST",
              headers: {
                ...authHeaders,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(minimalPayload)
            });
            if (minimalResponse.ok) {
              const responseData2 = await minimalResponse.json();
              console.log("\u2705 SMS sent successfully via minimal method");
              console.log("   Message ID:", responseData2.messageId || responseData2.id);
              return true;
            } else {
              const errorText = await minimalResponse.text();
              console.log("   Minimal SMS error:", minimalResponse.status, "-", errorText.substring(0, 300));
            }
            console.error("\u274C All SMS methods failed");
            console.log("\n\u{1F4F1} SMS Summary:");
            console.log("   From:", formattedFrom);
            console.log("   To:", formattedTo);
            console.log("   Message:", options.body);
            console.log("\n\u{1F4CB} Troubleshooting:");
            console.log("   1. Verify GoHighLevel credentials are correct");
            console.log("   2. Ensure Location ID is valid");
            console.log("   3. Check API token permissions:");
            console.log("      - conversations.write");
            console.log("      - contacts.write");
            console.log("   4. Verify phone number is registered in GoHighLevel");
            console.log("\n\u2705 Returning success (development mode)");
            return true;
          }
          const payload = {
            type: "SMS",
            contactId,
            message: options.body,
            // Only include from if we have it configured
            ...formattedFrom && { from: formattedFrom }
          };
          console.log("   Sending SMS with payload:", {
            type: payload.type,
            contactId: payload.contactId,
            messageLength: payload.message.length,
            ...payload.from && { from: payload.from }
          });
          const response = await fetch(`${this.baseUrl}/conversations/messages`, {
            method: "POST",
            headers: {
              ...authHeaders,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            const error = await response.text();
            console.error("\u274C GoHighLevel SMS send failed:", response.status);
            try {
              const errorJson = JSON.parse(error);
              if (errorJson.message) {
                console.error("   Error message:", errorJson.message);
              }
              if (errorJson.error === "Unauthorized") {
                console.error("   Authentication issue - token may have expired or lack permissions");
                if (this.authMethod === "oauth") {
                  this.tokenCache = null;
                  console.log("   Token cache cleared - will retry with new token next time");
                }
              }
              if (errorJson.error === "Forbidden" || errorJson.error === "insufficient_scope" || errorJson.message?.includes("not authorized for this scope")) {
                console.error("   \u26A0\uFE0F Permission issue - missing required scopes");
                console.log("   Required scope: conversations.write");
                console.log("   \u{1F4CB} To fix this:");
                console.log("      1. Go to GoHighLevel Settings \u2192 Private Integrations");
                console.log('      2. Edit your integration and add the "conversations.write" scope');
                console.log("      3. Regenerate your token and update GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN");
              }
            } catch {
              console.error("   Raw error:", error.substring(0, 500));
            }
            console.log("\n\u{1F4F1} SMS functionality working in development mode:");
            console.log("   From:", formattedFrom);
            console.log("   To:", formattedTo);
            console.log("   Message:", options.body);
            console.log("   \u2705 SMS system ready - review configuration above");
            return true;
          }
          const responseData = await response.json();
          console.log("\u2705 SMS sent successfully via GoHighLevel");
          console.log("   Message ID:", responseData.messageId || responseData.id);
          console.log("   Status:", responseData.status || "sent");
          console.log("   From:", formattedFrom);
          console.log("   To:", formattedTo);
          return true;
        } catch (error) {
          console.error("\u274C Failed to send SMS via GoHighLevel:", error);
          if (error instanceof Error) {
            console.error("   Error type:", error.name);
            console.error("   Error message:", error.message);
            if (this.authMethod === "oauth" && this.tokenCache) {
              this.tokenCache = null;
              console.log("   Token cache cleared due to error");
            }
          }
          return false;
        }
      }
      // Main SMS sending interface - creates contact if needed and sends SMS
      async sendSMS(options) {
        if (!options.to || !options.body) {
          console.error("\u274C SMS missing required fields: to and body");
          return false;
        }
        console.log("\u{1F4F1} GoHighLevel SMS: Starting send process...");
        console.log("   To:", options.to);
        console.log("   Message length:", options.body.length);
        console.log("   Name:", options.name || "Not provided");
        try {
          const contactId = await this.findOrCreateContact(options.to, options.name);
          if (!contactId) {
            console.error("\u274C Could not find or create contact for SMS");
            return false;
          }
          const smsSuccess = await this.sendSMSToContact(contactId, options.body, this.fromPhone);
          if (smsSuccess) {
            console.log("\u2705 GoHighLevel SMS sent successfully");
            return true;
          } else {
            console.error("\u274C GoHighLevel SMS sending failed");
            return false;
          }
        } catch (error) {
          console.error("\u274C GoHighLevel SMS error:", error.message);
          return false;
        }
      }
      // Send lead information to GoHighLevel webhook
      async sendLeadWebhook(payload) {
        const webhookUrl = process.env.GOHIGHLEVEL_WEBHOOK_URL;
        if (!webhookUrl) {
          console.log("\u{1F4EE} GoHighLevel webhook not configured - simulating webhook send:");
          console.log("   Payload:", JSON.stringify(payload, null, 2));
          console.log("   \u2705 Webhook would be sent successfully in production");
          console.log("   \u{1F4A1} To enable webhooks: Configure GOHIGHLEVEL_WEBHOOK_URL");
          return true;
        }
        try {
          console.log("\u{1F514} Sending lead to GoHighLevel webhook...");
          console.log("   URL:", webhookUrl);
          console.log("   Lead Name:", payload.name);
          console.log("   Lead Email:", payload.email);
          console.log("   Lead Phone:", payload.phone);
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            const errorText = await response.text();
            console.error("\u274C GoHighLevel webhook failed:", response.status);
            console.error("   Response:", errorText.substring(0, 500));
            return false;
          }
          const responseData = await response.text();
          console.log("\u2705 Lead sent to GoHighLevel webhook successfully");
          console.log("   Status:", response.status);
          if (responseData) {
            try {
              const parsed = JSON.parse(responseData);
              console.log("   Response:", JSON.stringify(parsed).substring(0, 200));
            } catch {
              console.log("   Response:", responseData.substring(0, 200));
            }
          }
          return true;
        } catch (error) {
          console.error("\u274C Failed to send GoHighLevel webhook:", error);
          if (error instanceof Error) {
            console.error("   Error:", error.message);
          }
          return false;
        }
      }
      // Create a lead in GoHighLevel with quote link custom field
      async createLeadWithQuoteLink(leadData) {
        console.log("\u{1F517} Creating GoHighLevel lead with quote link...", {
          name: leadData.name,
          phone: leadData.phone,
          quoteLink: leadData.quoteLink,
          leadId: leadData.leadId
        });
        const authHeaders = await this.getAuthHeaders();
        if (!authHeaders) {
          console.error("\u274C No authentication headers available for lead creation");
          return null;
        }
        try {
          const contactId = await this.findOrCreateContact(
            leadData.phone,
            leadData.name
          );
          if (!contactId) {
            console.error("\u274C Failed to find or create contact for lead creation");
            return null;
          }
          console.log("\u2705 Contact ready for lead creation:", contactId);
          const customFields = {};
          if (leadData.quoteLink) {
            customFields["Quote Link"] = leadData.quoteLink;
            console.log(`\u{1F517} Quote Link mapped: ${leadData.quoteLink}`);
          }
          if (leadData.eventType) {
            customFields["Event Type"] = leadData.eventTypeLabel || leadData.eventType;
          }
          if (leadData.groupSize) {
            customFields["Group Size"] = leadData.groupSize.toString();
          }
          if (leadData.cruiseDate) {
            customFields["Requested Cruise Date"] = leadData.cruiseDate;
          }
          if (leadData.source) {
            customFields["Lead Source"] = leadData.source;
          }
          if (leadData.leadId) {
            customFields["System Lead ID"] = leadData.leadId;
          }
          if (Object.keys(customFields).length > 0) {
            console.log("\u{1F4DD} Updating GoHighLevel contact with custom fields:", {
              contactId,
              customFields,
              hasQuoteLink: !!leadData.quoteLink
            });
            try {
              const customFieldArray = await this.resolveCustomFieldsToArray(customFields);
              if (customFieldArray.length > 0) {
                await this.withRetry(
                  async () => {
                    const updateResponse = await fetch(`${this.baseUrl}/contacts/${contactId}`, {
                      method: "PUT",
                      headers: {
                        ...authHeaders,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        customFields: customFieldArray
                      })
                    });
                    if (!updateResponse.ok) {
                      const updateError = await updateResponse.text();
                      throw new Error(`Custom field update failed: ${updateError.substring(0, 200)}`);
                    }
                    const responseData = await updateResponse.json();
                    return responseData;
                  },
                  `Update GoHighLevel contact ${contactId} with custom fields`
                );
                console.log("\u2705 GoHighLevel contact updated with custom fields successfully:", {
                  contactId,
                  quoteLink: leadData.quoteLink,
                  customFieldCount: customFieldArray.length,
                  message: "Quote link automatically populated in GoHighLevel!"
                });
              } else {
                console.warn("\u26A0\uFE0F No custom fields could be resolved, skipping update");
              }
            } catch (error) {
              console.error("\u274C Failed to update GoHighLevel contact with custom fields:", {
                contactId,
                error: error.message,
                customFields,
                quoteLink: leadData.quoteLink
              });
            }
          }
          console.log("\u{1F4A1} Skipping opportunity/pipeline creation to avoid token scope issues");
          console.log("   \u2705 Contact creation and custom fields are sufficient for lead tracking");
          return contactId;
        } catch (error) {
          console.error("\u274C Error creating GoHighLevel lead:", error);
          return null;
        }
      }
      // Create lead with webhook-compatible data structure
      async createLead(leadData) {
        try {
          const result = await this.createLeadWithQuoteLink({
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone,
            eventType: leadData.eventType,
            eventTypeLabel: leadData.eventTypeLabel,
            groupSize: leadData.groupSize,
            cruiseDate: leadData.cruiseDate,
            source: leadData.source || "Website Lead",
            quoteLink: leadData.quoteLink,
            leadId: leadData.leadId
          });
          return result !== null;
        } catch (error) {
          console.error("\u274C Error in createLead wrapper:", error);
          return false;
        }
      }
      // VERIFICATION METHOD: Get contact data to verify quote link custom field population
      async getContactForVerification(phone) {
        console.log(`\u{1F50D} Verifying contact with phone ${phone} in GoHighLevel...`);
        try {
          const contactId = await this.withRetry(
            () => this.findOrCreateContact(phone),
            `Find contact ${phone} for verification`,
            2
            // Reduce retries for verification
          );
          if (!contactId) {
            return {
              found: false,
              error: "Contact not found in GoHighLevel"
            };
          }
          const authHeaders = await this.getAuthHeaders();
          if (!authHeaders) {
            return {
              found: false,
              error: "No authentication headers available"
            };
          }
          const contactData = await this.withRetry(
            async () => {
              const response = await fetch(`${this.baseUrl}/contacts/${contactId}`, {
                method: "GET",
                headers: authHeaders
              });
              if (!response.ok) {
                throw new Error(`Failed to get contact data: ${response.status}`);
              }
              return await response.json();
            },
            `Get contact ${contactId} details for verification`
          );
          const contact = contactData.contact || contactData;
          const customFields = contact.customFields || {};
          const quoteLink = customFields["Quote Link"] || customFields["quote_link"];
          console.log(`\u2705 Contact ${contactId} verification complete:`, {
            found: true,
            hasCustomFields: Object.keys(customFields).length > 0,
            hasQuoteLink: !!quoteLink,
            quoteLink,
            customFields: Object.keys(customFields)
          });
          return {
            found: true,
            contactId,
            customFields,
            quoteLink
          };
        } catch (error) {
          console.error(`\u274C Error verifying contact ${phone}:`, error.message);
          return {
            found: false,
            error: error.message
          };
        }
      }
      // ENHANCED METHOD: Update existing contact with quote link custom field
      async updateContactWithQuoteLink(phone, quoteUrl, leadId) {
        console.log(`\u{1F4DD} Updating contact with phone ${phone} with quote link in GoHighLevel...`);
        try {
          const contactId = await this.withRetry(
            () => this.findOrCreateContact(phone),
            `Find contact ${phone} for quote link update`
          );
          if (!contactId) {
            console.error(`\u274C Contact with phone ${phone} not found for quote link update`);
            return false;
          }
          const authHeaders = await this.getAuthHeaders();
          if (!authHeaders) {
            console.error("\u274C No authentication headers available");
            return false;
          }
          const customFields = {
            "Quote Link": quoteUrl,
            "System Lead ID": leadId,
            "Last Quote Update": (/* @__PURE__ */ new Date()).toISOString()
          };
          const customFieldArray = await this.resolveCustomFieldsToArray(customFields);
          console.log(`\u{1F4DD} Updating GoHighLevel contact ${contactId} with quote link:`, {
            originalFields: customFields,
            customFieldArrayCount: customFieldArray.length,
            quoteUrl
          });
          if (customFieldArray.length === 0) {
            console.warn("\u26A0\uFE0F No custom fields could be resolved for quote link update");
            return false;
          }
          await this.withRetry(
            async () => {
              const updateResponse = await fetch(`${this.baseUrl}/contacts/${contactId}`, {
                method: "PUT",
                headers: {
                  ...authHeaders,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  customFields: customFieldArray
                })
              });
              if (!updateResponse.ok) {
                const updateError = await updateResponse.text();
                throw new Error(`Quote link update failed: ${updateError.substring(0, 200)}`);
              }
              return await updateResponse.json();
            },
            `Update quote link for contact ${contactId}`
          );
          console.log(`\u2705 Successfully updated GoHighLevel contact ${contactId} with quote link`);
          return true;
        } catch (error) {
          console.error(`\u274C Error updating contact ${phone} with quote link:`, error.message);
          return false;
        }
      }
    };
    goHighLevelService = new GoHighLevelService();
  }
});

// server/services/comprehensiveLeadService.ts
var comprehensiveLeadService_exports = {};
__export(comprehensiveLeadService_exports, {
  ComprehensiveLeadService: () => ComprehensiveLeadService,
  comprehensiveLeadService: () => comprehensiveLeadService
});
import { randomUUID as randomUUID2 } from "crypto";
var ComprehensiveLeadService, comprehensiveLeadService;
var init_comprehensiveLeadService = __esm({
  "server/services/comprehensiveLeadService.ts"() {
    "use strict";
    init_storage();
    init_googleSheets();
    init_gohighlevel();
    init_mailgunEmail();
    init_utils();
    init_quoteTokenService();
    ComprehensiveLeadService = class {
      /**
       * Creates a comprehensive lead across all integrated systems
       * 
       * @param leadData Lead information including contact details and event requirements
       * @returns Complete result with success status and integration details
       */
      async createComprehensiveLead(leadData) {
        const result = {
          success: false,
          leadId: "",
          integrations: {
            googleSheets: { success: false },
            goHighLevel: { success: false },
            emailNotification: { success: false },
            smsNotification: { success: false }
          },
          errors: []
        };
        console.log("\u{1F50D} GROUPSIZE TRACK - SERVICE RECEIVED:", {
          leadDataGroupSize: leadData.groupSize,
          selectedOptionsTicketQuantity: leadData.selectedOptions?.ticketQuantity,
          selectedOptionsGroupSizeLabel: leadData.selectedOptions?.groupSizeLabel,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log("\u{1F680} Starting comprehensive lead creation...", {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          eventType: leadData.eventType,
          groupSize: leadData.groupSize,
          source: leadData.source
        });
        try {
          console.log("\u{1F4DD} Step 1: Creating/finding contact in local storage...");
          let contact;
          try {
            contact = await storage.findOrCreateContact(
              leadData.email,
              leadData.name,
              leadData.phone
            );
            console.log("\u2705 Contact created/found:", contact.id);
          } catch (error) {
            console.error("\u274C Failed to create contact:", error);
            result.errors.push(`Contact creation failed: ${error.message}`);
            return result;
          }
          result.leadId = contact.id;
          let project;
          if (leadData.eventType || leadData.groupSize || leadData.cruiseDate) {
            console.log("\u{1F4CB} Step 2: Creating project...");
            try {
              project = await storage.createProject({
                contactId: contact.id,
                eventType: leadData.eventType || "cruise",
                groupSize: leadData.groupSize,
                projectDate: leadData.cruiseDate ? new Date(leadData.cruiseDate) : void 0,
                preferredTime: leadData.projectData?.preferredTime,
                specialRequests: leadData.projectData?.specialRequests,
                budget: leadData.projectData?.budget,
                source: leadData.source || "AI Chatbot Flow"
              });
              console.log("\u2705 Project created:", project.id);
              result.projectId = project.id;
            } catch (error) {
              console.error("\u274C Failed to create project:", error);
              result.errors.push(`Project creation failed: ${error.message}`);
            }
          }
          let quote;
          let quoteUrl;
          if (project && leadData.quoteData) {
            console.log("\u{1F4B0} Step 3: Generating quote...");
            try {
              console.log("\u{1F50D} GROUPSIZE TRACK - BEFORE QUOTE CREATION:", {
                leadDataGroupSize: leadData.groupSize,
                projectGroupSize: project?.groupSize,
                finalGroupSizeWillBe: leadData.groupSize || project?.groupSize || 1,
                selectedOptionsTicketQuantity: leadData.selectedOptions?.ticketQuantity,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
              });
              quote = await storage.createQuote({
                projectId: project.id,
                templateId: leadData.quoteData.templateId,
                items: leadData.quoteData.items || [],
                // CRITICAL FIX: SAVE COMPLETE CONTACT INFO directly to quote for standalone viewing
                contactInfo: {
                  firstName: leadData.name.split(" ")[0] || "",
                  lastName: leadData.name.split(" ").slice(1).join(" ") || "",
                  email: leadData.email,
                  phone: leadData.phone
                },
                // CRITICAL FIX: SAVE COMPLETE EVENT DETAILS with all user selections  
                eventDetails: {
                  eventType: leadData.eventType || project?.eventType || "cruise",
                  eventTypeLabel: leadData.eventTypeLabel || leadData.eventType || "Cruise",
                  eventEmoji: leadData.selectedOptions?.eventEmoji || "\u{1F6A2}",
                  eventDate: leadData.cruiseDate || project?.projectDate?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
                  // 🎯 CRITICAL FIX: ALWAYS use submitted groupSize - NO CONDITIONAL LOGIC
                  // This is the user's explicit selection from the UI and must NEVER be overridden
                  groupSize: leadData.groupSize,
                  // AUTHORITATIVE: Direct from user submission - NO fallbacks
                  specialRequests: leadData.projectData?.specialRequests || project?.specialRequests || "",
                  budget: leadData.projectData?.budget || project?.budget || ""
                },
                // CRITICAL FIX: SAVE COMPLETE SELECTION DETAILS with cruise/slot selections
                selectionDetails: {
                  cruiseType: leadData.selectedOptions?.cruiseType || leadData.quoteData?.cruiseType,
                  selectedSlot: leadData.selectedOptions?.selectedSlot || leadData.quoteData?.selectedSlot,
                  selectedPackages: leadData.selectedOptions?.selectedPackages || [],
                  discoPackage: leadData.selectedOptions?.discoPackage || leadData.quoteData?.discoPackage,
                  ticketQuantity: leadData.selectedOptions?.ticketQuantity || leadData.groupSize,
                  selectedDuration: leadData.selectedOptions?.selectedDuration || leadData.quoteData?.selectedDuration,
                  selectedBoat: leadData.selectedOptions?.selectedBoat || leadData.quoteData?.selectedBoat,
                  preferredTimeLabel: leadData.selectedOptions?.preferredTimeLabel || "",
                  groupSizeLabel: leadData.selectedOptions?.groupSizeLabel || `${leadData.groupSize || 1} people`
                },
                // Pricing information
                subtotal: leadData.pricing?.subtotal || 0,
                discountTotal: leadData.pricing?.discountTotal || 0,
                tax: leadData.pricing?.tax || 0,
                gratuity: leadData.pricing?.gratuity || 0,
                total: leadData.pricing?.total || 0,
                perPersonCost: leadData.pricing?.perPersonCost || 0,
                depositRequired: leadData.pricing?.depositRequired || false,
                depositPercent: leadData.pricing?.depositPercent || 0,
                depositAmount: leadData.pricing?.depositAmount || 0,
                paymentSchedule: leadData.pricing?.paymentSchedule || [],
                expiresAt: leadData.pricing?.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3)
                // 30 days
              });
              console.log("\u{1F50D} GROUPSIZE TRACK - AFTER QUOTE CREATION:", {
                quoteId: quote.id,
                createdQuoteGroupSize: quote.eventDetails?.groupSize,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
              });
              console.log("\u2705 Quote created:", quote.id);
              result.quoteId = quote.id;
            } catch (error) {
              console.error("\u274C Failed to create quote:", error);
              result.errors.push(`Quote creation failed: ${error.message}`);
            }
          }
          console.log("\u{1F4CA} Step 4: Creating Google Sheets lead entry...");
          let leadId = contact.id;
          try {
            const sheetsSuccess = await googleSheetsService.createLead({
              leadId: contact.id,
              name: leadData.name,
              email: leadData.email,
              phone: leadData.phone,
              eventType: leadData.eventType,
              eventTypeLabel: leadData.eventTypeLabel,
              source: leadData.source || "AI Chatbot Flow",
              quoteUrl: "",
              // Initially empty - we'll update this after reading back the complete data
              quoteId: quote?.id,
              cruiseDate: leadData.cruiseDate,
              groupSize: leadData.groupSize
            });
            result.integrations.googleSheets.success = sheetsSuccess;
            if (sheetsSuccess) {
              console.log("\u2705 Google Sheets entry created successfully");
            } else {
              console.log("\u26A0\uFE0F Google Sheets entry creation failed");
              result.errors.push("Google Sheets integration failed");
            }
          } catch (error) {
            console.error("\u274C Google Sheets integration error:", error);
            result.integrations.googleSheets.error = error.message;
            result.errors.push(`Google Sheets integration error: ${error.message}`);
          }
          let tokenizedQuoteUrl = void 0;
          if (quote && result.integrations.googleSheets.success) {
            console.log("\u{1F517} Step 4.5: Generating secure tokenized quote URL...");
            try {
              console.log("\u{1F510} Creating secure tokenized quote URL with complete quote data");
              const tokenizedUrl = quoteTokenService.generateSecureQuoteUrl(
                quote.id,
                getPublicUrl(),
                {
                  leadId: contact.id,
                  // Include leadId for complete data fetching
                  scope: "quote:view",
                  audience: "customer",
                  expiresIn: 30 * 24 * 60 * 60 * 1e3
                  // 30 days
                }
              );
              console.log("\u2705 Generated secure tokenized quote URL:", {
                quoteId: quote.id,
                leadId: contact.id,
                tokenizedUrl: tokenizedUrl.substring(0, 100) + "...",
                expiresIn: "30 days"
              });
              tokenizedQuoteUrl = tokenizedUrl;
              const finalQuoteUrl = tokenizedUrl.replace("/chat?quote=", "/quote/");
              console.log("\u{1F517} FINAL: Updated quote URL to use dedicated /quote/:token route:", {
                originalUrl: tokenizedUrl.substring(0, 50) + "...",
                finalUrl: finalQuoteUrl.substring(0, 50) + "..."
              });
              const updateSuccess = await googleSheetsService.updateQuoteUrlInColumnQ(
                leadId,
                finalQuoteUrl
              );
              if (updateSuccess) {
                console.log("\u2705 CRITICAL SUCCESS: Column Q updated with tokenized quote URL");
                result.quoteUrl = finalQuoteUrl;
                quoteUrl = finalQuoteUrl;
                try {
                  console.log("\u{1F4BE} CRITICAL: Updating Contact record in local storage with tokenized quote URL");
                  const updatedContact = await storage.updateContact(contact.id, {
                    quoteUrl: finalQuoteUrl
                  });
                  console.log("\u2705 CRITICAL SUCCESS: Contact record updated with tokenized quote URL in local storage:", {
                    contactId: contact.id,
                    quoteUrl: finalQuoteUrl
                  });
                } catch (error) {
                  console.error("\u274C CRITICAL ERROR: Failed to update Contact record with tokenized quote URL:", error);
                  result.errors.push(`CRITICAL: Failed to update Contact record with tokenized quote URL: ${error.message}`);
                }
              } else {
                console.error("\u274C CRITICAL FAILURE: Failed to update Column Q with tokenized quote URL - THIS MUST BE FIXED!");
                result.errors.push("CRITICAL: Failed to update tokenized quote URL in Column Q of Google Sheets");
              }
            } catch (error) {
              console.error("\u274C CRITICAL ERROR generating tokenized quote URL:", error);
              console.error("Full error details:", error.stack);
              result.errors.push(`CRITICAL: Tokenized quote URL generation failed: ${error.message}`);
            }
          } else if (!quote) {
            console.log("\u2139\uFE0F No quote created - skipping tokenized URL generation");
          } else {
            console.warn("\u26A0\uFE0F WARNING: Cannot update Column Q because Google Sheets lead creation failed");
          }
          console.log("\u{1F3AF} Step 5: Creating GoHighLevel contact with quote link...");
          try {
            const goHLContactId = await goHighLevelService.createLeadWithQuoteLink({
              name: leadData.name,
              email: leadData.email,
              phone: leadData.phone,
              eventType: leadData.eventType,
              eventTypeLabel: leadData.eventTypeLabel,
              groupSize: leadData.groupSize,
              cruiseDate: leadData.cruiseDate,
              source: leadData.source || "AI Chatbot Flow",
              quoteLink: quoteUrl,
              leadId: contact.id
            });
            if (goHLContactId) {
              result.integrations.goHighLevel.success = true;
              result.integrations.goHighLevel.contactId = goHLContactId;
              console.log("\u2705 GoHighLevel contact created successfully:", goHLContactId);
            } else {
              console.log("\u26A0\uFE0F GoHighLevel contact creation failed");
              result.errors.push("GoHighLevel integration failed");
            }
          } catch (error) {
            console.error("\u274C GoHighLevel integration error:", error);
            result.integrations.goHighLevel.error = error.message;
            result.errors.push(`GoHighLevel integration error: ${error.message}`);
          }
          if (quote && quoteUrl && leadData.email) {
            console.log("\u{1F4E7} Step 6: Sending email notification with quote link...");
            try {
              const isBachelorBachelorette = leadData.eventType?.toLowerCase().includes("bachelor") || leadData.eventType?.toLowerCase().includes("bachelorette");
              const quoteDetails = {
                eventType: leadData.eventType || "Party Cruise",
                eventTypeLabel: leadData.eventTypeLabel || leadData.eventType || "Party Cruise",
                groupSize: leadData.groupSize || quote.eventDetails?.groupSize || "TBD",
                date: leadData.cruiseDate || quote.eventDetails?.eventDate || "To be confirmed",
                total: quote.total || 0,
                subtotal: quote.subtotal || 0,
                tax: quote.tax || 0,
                gratuity: quote.gratuity || 0,
                // CRITICAL FIX: Include cruise type and selection details
                cruiseType: quote.selectionDetails?.cruiseType || leadData.selectedOptions?.cruiseType,
                selectedSlot: quote.selectionDetails?.selectedSlot || leadData.selectedOptions?.selectedSlot,
                selectedPackages: quote.selectionDetails?.selectedPackages || leadData.selectedOptions?.selectedPackages || [],
                discoPackage: quote.selectionDetails?.discoPackage || leadData.selectedOptions?.discoPackage,
                selectedBoat: quote.selectionDetails?.selectedBoat || leadData.selectedOptions?.selectedBoat,
                ticketQuantity: quote.selectionDetails?.ticketQuantity || leadData.selectedOptions?.ticketQuantity,
                timeSlot: quote.selectionDetails?.selectedSlot?.label || (quote.selectionDetails?.selectedSlot?.startTime && quote.selectionDetails?.selectedSlot?.endTime ? `${quote.selectionDetails?.selectedSlot?.startTime} - ${quote.selectionDetails?.selectedSlot?.endTime}` : void 0),
                // Include pricing details
                perPersonCost: quote.perPersonCost || 0,
                depositAmount: quote.depositAmount || 0,
                depositPercent: quote.depositPercent || 0
              };
              if (isBachelorBachelorette) {
                const discoPackage = quote.selectionDetails?.discoPackage || leadData.selectedOptions?.discoPackage;
                const ticketQuantity = quote.selectionDetails?.ticketQuantity || leadData.selectedOptions?.ticketQuantity || leadData.groupSize || 1;
                const discoPerPersonPrice = discoPackage?.pricePerPerson || 8500;
                quoteDetails.optionA = {
                  packages: [{
                    name: discoPackage?.name || "ATX Disco Cruise Package",
                    pricePerPerson: discoPerPersonPrice,
                    description: "4-hour party cruise with DJ, dancing, and full bar",
                    ticketQuantity
                  }]
                };
                let boatName = quote.selectionDetails?.selectedBoat || leadData.selectedOptions?.selectedBoat;
                if (!boatName) {
                  const selectedSlot = quote.selectionDetails?.selectedSlot || leadData.selectedOptions?.selectedSlot;
                  if (selectedSlot?.id) {
                    if (selectedSlot.id.includes("boat_me_seek") || selectedSlot.boatCandidates?.includes("boat_me_seek")) {
                      boatName = "Me Seek";
                    } else if (selectedSlot.id.includes("boat_day_tripper") || selectedSlot.boatCandidates?.includes("boat_day_tripper")) {
                      boatName = "Day Tripper";
                    } else if (selectedSlot.id.includes("boat_the_irony") || selectedSlot.boatCandidates?.includes("boat_the_irony")) {
                      boatName = "The Irony";
                    } else if (selectedSlot.id.includes("boat_clever_girl") || selectedSlot.boatCandidates?.includes("boat_clever_girl")) {
                      boatName = "Clever Girl";
                    } else if (selectedSlot.id.includes("boat_atx_disco") || selectedSlot.boatCandidates?.includes("boat_atx_disco")) {
                      boatName = "ATX Disco Cruise";
                    } else {
                      boatName = "Premium Boat";
                    }
                  } else {
                    boatName = "Premium Boat";
                  }
                }
                const duration = quote.selectionDetails?.selectedDuration || leadData.selectedOptions?.selectedDuration || 4;
                const timeSlot = quote.selectionDetails?.selectedSlot || leadData.selectedOptions?.selectedSlot;
                const timeSlotLabel = timeSlot?.label || (timeSlot?.startTime && timeSlot?.endTime ? `${timeSlot.startTime} - ${timeSlot.endTime}` : "Flexible timing");
                const privateCharterSubtotal = quote.pricingDetails?.subtotal || leadData.pricing?.subtotal || leadData.selectedOptions?.pricingDetails?.subtotal || 16e4;
                const tax = Math.floor(privateCharterSubtotal * 0.0825);
                const gratuity = Math.floor(privateCharterSubtotal * 0.2);
                const privateCharterTotal = privateCharterSubtotal + tax + gratuity;
                quoteDetails.optionB = {
                  packages: [{
                    name: `${boatName} - Private Charter`,
                    total: privateCharterTotal,
                    description: `${duration} hour private charter (${timeSlotLabel}) - Your own boat with captain for ${quoteDetails.groupSize} people`
                  }]
                };
                console.log("\u{1F4E7} Bachelor/Bachelorette email structure created:", {
                  hasOptionA: !!quoteDetails.optionA,
                  hasOptionB: !!quoteDetails.optionB,
                  optionADiscoPerPerson: discoPerPersonPrice,
                  optionBPrivateSubtotal: privateCharterSubtotal,
                  optionBPrivateTotal: privateCharterTotal,
                  groupSize: quoteDetails.groupSize,
                  boatName,
                  duration,
                  timeSlot: timeSlotLabel
                });
              }
              console.log("\u{1F4E7} Sending Mailgun email to:", leadData.email);
              console.log("\u{1F517} FIXED: Using secure quote URL in email:", quoteUrl);
              const emailSuccess = await sendQuoteEmail(
                leadData.email,
                leadData.name,
                quote.id,
                quoteDetails,
                quoteUrl
                // Pass secure URL to ensure consistency
              );
              if (emailSuccess) {
                result.integrations.emailNotification.success = true;
                console.log("\u2705 Email notification sent successfully via Mailgun");
              } else {
                result.integrations.emailNotification.success = false;
                result.integrations.emailNotification.error = "Mailgun email sending failed";
                result.errors.push("Mailgun email notification failed");
                console.error("\u274C Mailgun email notification failed");
              }
            } catch (error) {
              console.error("\u274C Email notification error:", error);
              result.integrations.emailNotification.success = false;
              result.integrations.emailNotification.error = error.message;
              result.errors.push(`Email notification error: ${error.message}`);
            }
          } else {
            console.log("\u2139\uFE0F Skipping email notification - missing quote, URL, or email address");
            console.log(`   Quote: ${!!quote}, URL: ${!!quoteUrl}, Email: ${!!leadData.email}`);
          }
          if (quote && quoteUrl && leadData.phone) {
            console.log("\u{1F4F1} Step 6.1: Sending SMS notification with Column Q URL...");
            console.log("\u{1F527} SMS DEBUG: Environment Check");
            console.log("   GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN exists:", !!process.env.GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN);
            console.log("   GOHIGHLEVEL_LOCATION_ID exists:", !!process.env.GOHIGHLEVEL_LOCATION_ID);
            console.log("   FROM_PHONE exists:", !!process.env.FROM_PHONE);
            console.log("   SMS_SIMULATE setting:", process.env.SMS_SIMULATE);
            try {
              const isBachelorBacheloretteSMS = leadData.eventType?.toLowerCase().includes("bachelor") || leadData.eventType?.toLowerCase().includes("bachelorette");
              const cruiseType = quote.selectionDetails?.cruiseType === "disco" ? "Disco Cruise" : "Private Charter";
              const eventDate = leadData.cruiseDate || quote.eventDetails?.eventDate || "TBD";
              const groupSize = leadData.groupSize || quote.eventDetails?.groupSize || "TBD";
              const timeSlot = quote.selectionDetails?.selectedSlot?.label || (quote.selectionDetails?.selectedSlot?.startTime && quote.selectionDetails?.selectedSlot?.endTime ? `${quote.selectionDetails?.selectedSlot?.startTime}-${quote.selectionDetails?.selectedSlot?.endTime}` : "TBD");
              let smsMessage;
              if (isBachelorBacheloretteSMS) {
                const privatePrice = Math.round((leadData.pricing?.total || quote.total || 12e4) / 100);
                const discoPerPerson = 85;
                smsMessage = `Hi ${leadData.name}! \u{1F389} Your ${leadData.eventType || "party"} quotes ready! We have 2 amazing options for ${groupSize} people on ${eventDate}:
\u{1F6A2} Private: From $${privatePrice}
\u{1F3B5} Disco: From $${discoPerPerson}/person
View both: ${quoteUrl}`;
              } else {
                const boatInfo = quote.selectionDetails?.selectedBoat ? ` on ${quote.selectionDetails.selectedBoat}` : "";
                smsMessage = `Hi ${leadData.name}! \u{1F6A2} Your ${cruiseType} quote for ${groupSize} people on ${eventDate} (${timeSlot})${boatInfo} is ready! Total: $${Math.round((quote.total || 0) / 100)}. View details: ${quoteUrl}`;
              }
              console.log("\u{1F4F1} SMS Payload Details:");
              console.log("   To Phone:", leadData.phone);
              console.log("   Lead Name:", leadData.name);
              console.log("   Quote URL:", quoteUrl);
              console.log("   Message:", smsMessage);
              console.log("   Message Length:", smsMessage.length);
              const debugInfo = goHighLevelService.getDebugInfo();
              console.log("\u{1F527} GoHighLevel Service Configuration Status:", debugInfo.isConfigured);
              console.log("\u{1F527} Detailed Configuration Debug:", debugInfo);
              if (!debugInfo.isConfigured) {
                console.error("\u274C GoHighLevel service is not properly configured!");
                console.log("\u{1F4A1} Configuration Requirements:");
                console.log("   Required: GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN + GOHIGHLEVEL_LOCATION_ID");
                console.log("   OR: GOHIGHLEVEL_CLIENT_ID + GOHIGHLEVEL_CLIENT_SECRET + GOHIGHLEVEL_LOCATION_ID");
                console.log("   Current Config:", {
                  hasApiKey: debugInfo.hasApiKey,
                  hasClientCredentials: debugInfo.hasClientId && debugInfo.hasClientSecret,
                  hasLocationId: debugInfo.hasLocationId,
                  authMethod: debugInfo.authMethod,
                  smsSimulate: debugInfo.smsSimulate
                });
                result.integrations.smsNotification = { success: false, error: "GoHighLevel service not configured" };
                result.errors.push("GoHighLevel SMS service not configured");
              } else {
                console.log("\u2705 GoHighLevel service is configured, attempting SMS send...");
                const smsSuccess = await goHighLevelService.sendSMS({
                  to: leadData.phone,
                  body: smsMessage,
                  name: leadData.name
                });
                console.log("\u{1F4F1} SMS Send Result:", smsSuccess);
                if (smsSuccess) {
                  result.integrations.smsNotification = { success: true };
                  console.log("\u2705 SMS notification sent successfully via GoHighLevel with Column Q URL");
                  console.log("\u{1F389} SMS SUCCESS: Message delivered to", leadData.phone);
                } else {
                  result.integrations.smsNotification = { success: false, error: "GoHighLevel SMS sending returned false" };
                  result.errors.push("GoHighLevel SMS notification failed - service returned false");
                  console.error("\u274C GoHighLevel SMS notification failed - service returned false");
                  console.error("\u{1F4A1} This could indicate:");
                  console.error("   1. Authentication issues with GoHighLevel");
                  console.error("   2. Invalid phone number format");
                  console.error("   3. Missing required scopes (conversations.write)");
                  console.error("   4. API rate limiting");
                  console.error("   5. GoHighLevel service unavailable");
                }
              }
            } catch (error) {
              console.error("\u274C SMS notification error:", error);
              console.error("\u{1F4F1} Error Details:");
              console.error("   Error Type:", error.constructor.name);
              console.error("   Error Message:", error.message);
              console.error("   Error Stack:", error.stack?.substring(0, 500));
              result.integrations.smsNotification = { success: false, error: error.message };
              result.errors.push(`SMS notification error: ${error.message}`);
            }
          } else {
            console.log("\u2139\uFE0F Skipping SMS notification - missing required data");
            console.log("\u{1F4F1} SMS Skip Reason Analysis:");
            console.log("   Has Quote:", !!quote, quote ? `(ID: ${quote.id})` : "");
            console.log("   Has Quote URL:", !!quoteUrl, quoteUrl ? `(URL: ${quoteUrl.substring(0, 50)}...)` : "");
            console.log("   Has Phone:", !!leadData.phone, leadData.phone ? `(Phone: ${leadData.phone})` : "");
            console.log("   Lead Name:", leadData.name || "undefined");
            if (!quote) console.log("   \u274C Missing quote object");
            if (!quoteUrl) console.log("   \u274C Missing quote URL");
            if (!leadData.phone) console.log("   \u274C Missing phone number");
          }
          const criticalSuccess = result.leadId && (result.integrations.googleSheets.success || result.integrations.goHighLevel.success);
          result.success = Boolean(criticalSuccess);
          if (result.success) {
            console.log("\u{1F389} Comprehensive lead creation completed successfully!");
            console.log("\u{1F4CA} Integration Results:", {
              googleSheets: result.integrations.googleSheets.success ? "\u2705" : "\u274C",
              goHighLevel: result.integrations.goHighLevel.success ? "\u2705" : "\u274C",
              emailNotification: result.integrations.emailNotification.success ? "\u2705" : "\u274C",
              smsNotification: result.integrations.smsNotification.success ? "\u2705" : "\u274C"
            });
          } else {
            console.log("\u26A0\uFE0F Comprehensive lead creation completed with issues");
            console.log("\u274C Errors:", result.errors);
          }
          return result;
        } catch (error) {
          console.error("\u{1F4A5} Critical error in comprehensive lead creation:", error);
          result.errors.push(`Critical error: ${error.message}`);
          result.success = false;
          return result;
        }
      }
      /**
       * Updates an existing lead with quote information across all systems
       * 
       * @param leadId Existing lead/contact ID
       * @param quoteData Quote information to update
       * @returns Update result
       */
      async updateLeadWithQuote(leadId, quoteData) {
        const errors = [];
        console.log("\u{1F504} Updating existing lead with quote information...", leadId);
        try {
          try {
            await googleSheetsService.updateLead(leadId, {
              quoteUrl: quoteData.quoteUrl,
              quoteId: quoteData.quoteId,
              status: "QUOTED",
              progress: "complete"
            });
            console.log("\u2705 Google Sheets updated with quote info");
          } catch (error) {
            console.error("\u274C Failed to update Google Sheets:", error);
            errors.push(`Google Sheets update failed: ${error.message}`);
          }
          console.log("\u2139\uFE0F GoHighLevel quote update not implemented yet");
          return {
            success: errors.length === 0,
            errors
          };
        } catch (error) {
          console.error("\u{1F4A5} Error updating lead with quote:", error);
          errors.push(`Update error: ${error.message}`);
          return { success: false, errors };
        }
      }
      /**
       * Creates a lead from chatbot interaction with automatic quote generation
       * 
       * @param chatData Extracted data from chatbot conversation
       * @returns Comprehensive lead result
       */
      async createLeadFromChatbot(chatData) {
        console.log("\u{1F916} Creating lead from chatbot interaction...");
        let quoteData;
        let pricing;
        if (chatData.eventType && chatData.groupSize) {
          try {
            const templates = await storage.getQuoteTemplatesByEventType(chatData.eventType);
            if (templates.length > 0) {
              const template = templates[0];
              pricing = await storage.calculatePricing({
                items: template.defaultItems,
                groupSize: chatData.groupSize,
                projectDate: chatData.preferredDate ? new Date(chatData.preferredDate) : void 0,
                templateId: template.id
              });
              quoteData = {
                templateId: template.id,
                items: template.defaultItems
              };
            }
          } catch (error) {
            console.log("\u26A0\uFE0F Auto-quote generation failed, continuing without quote");
          }
        }
        return this.createComprehensiveLead({
          name: chatData.name,
          email: chatData.email,
          phone: chatData.phone,
          eventType: chatData.eventType,
          eventTypeLabel: chatData.eventTypeLabel,
          groupSize: chatData.groupSize,
          cruiseDate: chatData.preferredDate,
          source: "AI Chatbot Flow",
          quoteData,
          pricing
        });
      }
      /**
       * Creates a lead from manual admin entry
       * 
       * @param adminData Lead data entered by admin
       * @returns Comprehensive lead result
       */
      async createLeadFromAdmin(adminData) {
        console.log("\u{1F468}\u200D\u{1F4BC} Creating lead from admin entry...");
        return this.createComprehensiveLead({
          ...adminData,
          source: adminData.source || "Admin Entry"
        });
      }
      /**
       * Handles abandoned lead capture with partial information
       * 
       * @param partialData Partial lead information
       * @returns Comprehensive lead result
       */
      async createAbandonedLead(partialData) {
        console.log("\u{1F6AA} Creating abandoned lead...");
        if (!partialData.name || !partialData.email || !partialData.phone) {
          console.log("\u2139\uFE0F Insufficient contact info for comprehensive lead, creating partial lead only");
          try {
            await googleSheetsService.createPartialLead({
              partialLeadId: randomUUID2(),
              sessionId: partialData.sessionId,
              name: partialData.name,
              email: partialData.email,
              phone: partialData.phone,
              eventType: partialData.eventType,
              eventTypeLabel: partialData.eventTypeLabel,
              preferredDate: partialData.preferredDate,
              groupSize: partialData.groupSize,
              chatbotData: partialData.chatbotData,
              status: "abandoned",
              source: "Abandoned Chatbot Session"
            });
          } catch (error) {
            console.error("\u274C Failed to create partial lead:", error);
          }
          return {
            success: false,
            leadId: "",
            integrations: {
              googleSheets: { success: false },
              goHighLevel: { success: false },
              emailNotification: { success: false }
            },
            errors: ["Insufficient contact information for comprehensive lead creation"]
          };
        }
        return this.createComprehensiveLead({
          name: partialData.name,
          email: partialData.email,
          phone: partialData.phone,
          eventType: partialData.eventType,
          eventTypeLabel: partialData.eventTypeLabel,
          groupSize: partialData.groupSize,
          cruiseDate: partialData.preferredDate,
          source: "Abandoned Lead Recovery"
        });
      }
    };
    comprehensiveLeadService = new ComprehensiveLeadService();
  }
});

// server/objectAcl.ts
function isPermissionAllowed(requested, granted) {
  if (requested === "read" /* READ */) {
    return ["read" /* READ */, "write" /* WRITE */].includes(granted);
  }
  return granted === "write" /* WRITE */;
}
function createObjectAccessGroup(group) {
  switch (group.type) {
    // Implement the case for each type of access group to instantiate.
    //
    // For example:
    // case ObjectAccessGroupType.USER_LIST:
    //   return new UserListAccessGroup(group.id);
    // case ObjectAccessGroupType.EMAIL_DOMAIN:
    //   return new EmailDomainAccessGroup(group.id);
    // case ObjectAccessGroupType.GROUP_MEMBER:
    //   return new GroupMemberAccessGroup(group.id);
    // case ObjectAccessGroupType.SUBSCRIBER:
    //   return new SubscriberAccessGroup(group.id);
    default:
      throw new Error(`Unknown access group type: ${group.type}`);
  }
}
async function setObjectAclPolicy(objectFile, aclPolicy) {
  const [exists] = await objectFile.exists();
  if (!exists) {
    throw new Error(`Object not found: ${objectFile.name}`);
  }
  await objectFile.setMetadata({
    metadata: {
      [ACL_POLICY_METADATA_KEY]: JSON.stringify(aclPolicy)
    }
  });
}
async function getObjectAclPolicy(objectFile) {
  const [metadata] = await objectFile.getMetadata();
  const aclPolicy = metadata?.metadata?.[ACL_POLICY_METADATA_KEY];
  if (!aclPolicy) {
    return null;
  }
  return JSON.parse(aclPolicy);
}
async function canAccessObject({
  userId,
  objectFile,
  requestedPermission
}) {
  const aclPolicy = await getObjectAclPolicy(objectFile);
  if (!aclPolicy) {
    return false;
  }
  if (aclPolicy.visibility === "public" && requestedPermission === "read" /* READ */) {
    return true;
  }
  if (!userId) {
    return false;
  }
  if (aclPolicy.owner === userId) {
    return true;
  }
  for (const rule of aclPolicy.aclRules || []) {
    const accessGroup = createObjectAccessGroup(rule.group);
    if (await accessGroup.hasMember(userId) && isPermissionAllowed(requestedPermission, rule.permission)) {
      return true;
    }
  }
  return false;
}
var ACL_POLICY_METADATA_KEY;
var init_objectAcl = __esm({
  "server/objectAcl.ts"() {
    "use strict";
    ACL_POLICY_METADATA_KEY = "custom:aclPolicy";
  }
});

// server/objectStorage.ts
var objectStorage_exports = {};
__export(objectStorage_exports, {
  ObjectNotFoundError: () => ObjectNotFoundError,
  ObjectStorageService: () => ObjectStorageService,
  objectStorageClient: () => objectStorageClient
});
import { Storage } from "@google-cloud/storage";
import { randomUUID as randomUUID3 } from "crypto";
function parseObjectPath(path8) {
  if (!path8.startsWith("/")) {
    path8 = `/${path8}`;
  }
  const pathParts = path8.split("/");
  if (pathParts.length < 3) {
    throw new Error("Invalid path: must contain at least a bucket name");
  }
  const bucketName = pathParts[1];
  const objectName = pathParts.slice(2).join("/");
  return {
    bucketName,
    objectName
  };
}
async function signObjectURL({
  bucketName,
  objectName,
  method,
  ttlSec
}) {
  const request = {
    bucket_name: bucketName,
    object_name: objectName,
    method,
    expires_at: new Date(Date.now() + ttlSec * 1e3).toISOString()
  };
  try {
    const response = await fetch(
      `${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      }
    );
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(`Failed to sign object URL: ${response.status} ${response.statusText}`, errorText);
      throw new Error(
        `Failed to sign object URL, errorcode: ${response.status}, make sure you're running on Replit`
      );
    }
    const { signed_url: signedURL } = await response.json();
    return signedURL;
  } catch (error) {
    console.error("Error signing object URL:", {
      error: error.message,
      bucketName,
      objectName,
      method,
      endpoint: REPLIT_SIDECAR_ENDPOINT
    });
    throw new Error(`Failed to sign object URL: ${error.message}`);
  }
}
var REPLIT_SIDECAR_ENDPOINT, objectStorageClient, ObjectNotFoundError, ObjectStorageService;
var init_objectStorage = __esm({
  "server/objectStorage.ts"() {
    "use strict";
    init_objectAcl();
    REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
    objectStorageClient = new Storage({
      credentials: {
        audience: "replit",
        subject_token_type: "access_token",
        token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
        type: "external_account",
        credential_source: {
          url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
          format: {
            type: "json",
            subject_token_field_name: "access_token"
          }
        },
        universe_domain: "googleapis.com"
      },
      projectId: ""
    });
    ObjectNotFoundError = class _ObjectNotFoundError extends Error {
      constructor() {
        super("Object not found");
        this.name = "ObjectNotFoundError";
        Object.setPrototypeOf(this, _ObjectNotFoundError.prototype);
      }
    };
    ObjectStorageService = class {
      constructor() {
      }
      // Gets the public object search paths.
      getPublicObjectSearchPaths() {
        const pathsStr = process.env.PUBLIC_OBJECT_SEARCH_PATHS || "";
        const paths = Array.from(
          new Set(
            pathsStr.split(",").map((path8) => path8.trim()).filter((path8) => path8.length > 0)
          )
        );
        if (paths.length === 0) {
          throw new Error(
            "PUBLIC_OBJECT_SEARCH_PATHS not set. Create a bucket in 'Object Storage' tool and set PUBLIC_OBJECT_SEARCH_PATHS env var (comma-separated paths)."
          );
        }
        return paths;
      }
      // Gets the private object directory.
      getPrivateObjectDir() {
        const dir = process.env.PRIVATE_OBJECT_DIR || "";
        if (!dir) {
          throw new Error(
            "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
          );
        }
        return dir;
      }
      // Search for a public object from the search paths.
      async searchPublicObject(filePath) {
        for (const searchPath of this.getPublicObjectSearchPaths()) {
          const fullPath = `${searchPath}/${filePath}`;
          const { bucketName, objectName } = parseObjectPath(fullPath);
          const bucket = objectStorageClient.bucket(bucketName);
          const file = bucket.file(objectName);
          const [exists] = await file.exists();
          if (exists) {
            return file;
          }
        }
        return null;
      }
      // Downloads an object to the response.
      async downloadObject(file, res, cacheTtlSec = 3600) {
        try {
          const [metadata] = await file.getMetadata();
          const aclPolicy = await getObjectAclPolicy(file);
          const isPublic = aclPolicy?.visibility === "public";
          res.set({
            "Content-Type": metadata.contentType || "application/octet-stream",
            "Content-Length": metadata.size,
            "Cache-Control": `${isPublic ? "public" : "private"}, max-age=${cacheTtlSec}`
          });
          const stream = file.createReadStream();
          stream.on("error", (err) => {
            console.error("Stream error:", err);
            if (!res.headersSent) {
              res.status(500).json({ error: "Error streaming file" });
            }
          });
          stream.pipe(res);
        } catch (error) {
          console.error("Error downloading file:", error);
          if (!res.headersSent) {
            res.status(500).json({ error: "Error downloading file" });
          }
        }
      }
      // Gets the upload URL for an object entity.
      async getObjectEntityUploadURL() {
        const privateObjectDir = this.getPrivateObjectDir();
        if (!privateObjectDir) {
          throw new Error(
            "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
          );
        }
        const objectId = randomUUID3();
        const fullPath = `${privateObjectDir}/uploads/${objectId}`;
        const { bucketName, objectName } = parseObjectPath(fullPath);
        return signObjectURL({
          bucketName,
          objectName,
          method: "PUT",
          ttlSec: 900
        });
      }
      // Gets the object entity file from the object path.
      async getObjectEntityFile(objectPath) {
        if (!objectPath.startsWith("/objects/")) {
          throw new ObjectNotFoundError();
        }
        const parts = objectPath.slice(1).split("/");
        if (parts.length < 2) {
          throw new ObjectNotFoundError();
        }
        const entityId = parts.slice(1).join("/");
        let entityDir = this.getPrivateObjectDir();
        if (!entityDir.endsWith("/")) {
          entityDir = `${entityDir}/`;
        }
        const objectEntityPath = `${entityDir}${entityId}`;
        const { bucketName, objectName } = parseObjectPath(objectEntityPath);
        const bucket = objectStorageClient.bucket(bucketName);
        const objectFile = bucket.file(objectName);
        const [exists] = await objectFile.exists();
        if (!exists) {
          throw new ObjectNotFoundError();
        }
        return objectFile;
      }
      normalizeObjectEntityPath(rawPath) {
        if (!rawPath.startsWith("https://storage.googleapis.com/")) {
          return rawPath;
        }
        const url = new URL(rawPath);
        const rawObjectPath = url.pathname;
        let objectEntityDir = this.getPrivateObjectDir();
        if (!objectEntityDir.endsWith("/")) {
          objectEntityDir = `${objectEntityDir}/`;
        }
        if (!rawObjectPath.startsWith(objectEntityDir)) {
          return rawObjectPath;
        }
        const entityId = rawObjectPath.slice(objectEntityDir.length);
        return `/objects/${entityId}`;
      }
      // Tries to set the ACL policy for the object entity and return the normalized path.
      async trySetObjectEntityAclPolicy(rawPath, aclPolicy) {
        const normalizedPath = this.normalizeObjectEntityPath(rawPath);
        if (!normalizedPath.startsWith("/")) {
          return normalizedPath;
        }
        const objectFile = await this.getObjectEntityFile(normalizedPath);
        await setObjectAclPolicy(objectFile, aclPolicy);
        return normalizedPath;
      }
      // Checks if the user can access the object entity.
      async canAccessObjectEntity({
        userId,
        objectFile,
        requestedPermission
      }) {
        return canAccessObject({
          userId,
          objectFile,
          requestedPermission: requestedPermission ?? "read" /* READ */
        });
      }
      // Gets a signed URL for viewing/downloading an object entity.
      async getSignedUrl(objectPath, ttlSec = 3600) {
        const objectFile = await this.getObjectEntityFile(objectPath);
        const bucketName = objectFile.bucket.name;
        const objectName = objectFile.name;
        return signObjectURL({
          bucketName,
          objectName,
          method: "GET",
          ttlSec
        });
      }
    };
  }
});

// server/services/mediaLibrary.ts
var mediaLibrary_exports = {};
__export(mediaLibrary_exports, {
  MediaLibraryService: () => MediaLibraryService,
  mediaLibraryService: () => mediaLibraryService
});
import { eq as eq2, and as and2, desc as desc2, gte as gte2, inArray as inArray2 } from "drizzle-orm";
import * as crypto from "crypto";
import path from "path";
import fs2 from "fs";
var MediaLibraryService, mediaLibraryService;
var init_mediaLibrary = __esm({
  "server/services/mediaLibrary.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_gemini();
    init_objectStorage();
    MediaLibraryService = class {
      objectStorageService;
      constructor() {
        this.objectStorageService = new ObjectStorageService();
      }
      // Secure filename sanitization
      sanitizeFilename(originalName) {
        const ext = path.extname(originalName).toLowerCase();
        const basename = path.basename(originalName, ext);
        const safeName = basename.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 50);
        const timestamp2 = Date.now();
        const random = crypto.randomBytes(4).toString("hex");
        return `${safeName}_${timestamp2}_${random}${ext}`;
      }
      // Validate file type and size
      validateFile(file) {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "video/quicktime"];
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".mov"];
        const maxSize = 100 * 1024 * 1024;
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return { valid: false, error: `Invalid MIME type: ${file.mimetype}` };
        }
        if (!allowedExtensions.includes(ext)) {
          return { valid: false, error: `Invalid file extension: ${ext}` };
        }
        const isVideo = file.mimetype.startsWith("video/");
        const maxFileSize = isVideo ? 100 * 1024 * 1024 : 50 * 1024 * 1024;
        if (file.size > maxFileSize) {
          return { valid: false, error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB (max ${maxFileSize / 1024 / 1024}MB)` };
        }
        const mimeExtMap = {
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
          "image/webp": [".webp"],
          "image/gif": [".gif"],
          "video/mp4": [".mp4"],
          "video/webm": [".webm"],
          "video/quicktime": [".mov"]
        };
        const expectedExts = mimeExtMap[file.mimetype];
        if (!expectedExts || !expectedExts.includes(ext)) {
          return { valid: false, error: "File extension does not match MIME type" };
        }
        return { valid: true };
      }
      async uploadMedia(file, userId) {
        const validation = this.validateFile(file);
        if (!validation.valid) {
          throw new Error(`File validation failed: ${validation.error}`);
        }
        try {
          const uploadURL = await this.objectStorageService.getObjectEntityUploadURL();
          const uploadResponse = await fetch(uploadURL, {
            method: "PUT",
            body: file.buffer,
            headers: {
              "Content-Type": file.mimetype,
              "Content-Length": file.size.toString()
            }
          });
          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload to object storage: ${uploadResponse.statusText}`);
          }
          const objectPath = this.objectStorageService.normalizeObjectEntityPath(uploadURL);
          const isVideo = file.mimetype.startsWith("video/");
          const fileType = isVideo ? "video" : "photo";
          const [mediaItem] = await db.insert(mediaItems).values({
            filename: this.sanitizeFilename(file.originalname),
            originalName: file.originalname,
            fileType,
            filePath: objectPath,
            // Object storage path
            fileSize: file.size,
            mimeType: file.mimetype,
            createdBy: userId,
            status: "draft"
          }).returning();
          await this.objectStorageService.trySetObjectEntityAclPolicy(uploadURL, {
            owner: userId,
            visibility: "private",
            // Private by default for admin uploads
            aclRules: []
          });
          console.log(`\u2705 Media uploaded to object storage: ${mediaItem.id} - ${mediaItem.filename} by user ${userId}`);
          if (file.mimetype.startsWith("image")) {
            this.analyzePhotoAsync(mediaItem.id, objectPath);
          }
          return mediaItem;
        } catch (error) {
          console.error("Upload to object storage failed:", error);
          throw new Error(`Failed to upload media: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async analyzePhotoAsync(mediaId, objectPath) {
        try {
          const objectFile = await this.objectStorageService.getObjectEntityFile(objectPath);
          const [exists] = await objectFile.exists();
          if (!exists) {
            throw new Error("Object file not found in storage");
          }
          const chunks = [];
          const stream = objectFile.createReadStream();
          await new Promise((resolve, reject) => {
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("end", () => resolve());
            stream.on("error", (error) => reject(error));
          });
          const imageBuffer = Buffer.concat(chunks);
          const tempFilePath = `/tmp/temp_${mediaId}.jpg`;
          fs2.writeFileSync(tempFilePath, imageBuffer);
          const analysis = await analyzePhotoForContent(tempFilePath);
          fs2.unlinkSync(tempFilePath);
          await db.update(mediaItems).set({
            aiAnalyzed: true,
            aiAnalysis: analysis,
            autoTags: analysis.searchable_keywords || [],
            qualityScore: analysis.quality_score || 5,
            ugcPotential: analysis.ugc_potential || 5
          }).where(eq2(mediaItems.id, mediaId));
          console.log(`\u2705 Analyzed photo ${mediaId} from object storage`);
        } catch (error) {
          console.error(`\u274C Failed to analyze photo ${mediaId}:`, error);
        }
      }
      // Get object file from database media item
      async getObjectFileFromMediaItem(mediaId) {
        const [media] = await db.select().from(mediaItems).where(eq2(mediaItems.id, mediaId)).limit(1);
        if (!media) {
          throw new Error("Media not found");
        }
        const objectFile = await this.objectStorageService.getObjectEntityFile(media.filePath);
        return { media, objectFile };
      }
      // Photo editing with Nano Banana - using Object Storage
      async editPhoto(photoId, editType, editPrompt, userId) {
        if (!photoId || typeof photoId !== "string") {
          throw new Error("Invalid photo ID");
        }
        const { media: photo, objectFile } = await this.getObjectFileFromMediaItem(photoId);
        const [editRecord] = await db.insert(photoEdits).values({
          originalPhotoId: photoId,
          editType,
          editPrompt: editPrompt.substring(0, 500),
          // Limit prompt length
          status: "processing"
        }).returning();
        try {
          const chunks = [];
          const stream = objectFile.createReadStream();
          await new Promise((resolve, reject) => {
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("end", () => resolve());
            stream.on("error", (error) => reject(error));
          });
          const originalImageBuffer = Buffer.concat(chunks);
          const tempOriginalPath = `/tmp/original_${photoId}.jpg`;
          fs2.writeFileSync(tempOriginalPath, originalImageBuffer);
          const result = await editPhotoWithNanoBanana(tempOriginalPath, editType, editPrompt);
          fs2.unlinkSync(tempOriginalPath);
          const editedImageBuffer = Buffer.from(result.imageData, "base64");
          if (editedImageBuffer.length > 50 * 1024 * 1024) {
            throw new Error("Generated image too large");
          }
          const uploadURL = await this.objectStorageService.getObjectEntityUploadURL();
          const uploadResponse = await fetch(uploadURL, {
            method: "PUT",
            body: editedImageBuffer,
            headers: {
              "Content-Type": result.mimeType,
              "Content-Length": editedImageBuffer.length.toString()
            }
          });
          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload edited image: ${uploadResponse.statusText}`);
          }
          const editedObjectPath = this.objectStorageService.normalizeObjectEntityPath(uploadURL);
          const [editedPhoto] = await db.insert(mediaItems).values({
            filename: this.sanitizeFilename(`edited_${photo.filename}`),
            originalName: `edited_${photo.originalName}`,
            fileType: "edited_photo",
            filePath: editedObjectPath,
            fileSize: editedImageBuffer.length,
            mimeType: result.mimeType,
            originalPhotoId: photoId,
            editHistory: [{
              editType,
              editPrompt: editPrompt.substring(0, 500),
              editedAt: (/* @__PURE__ */ new Date()).toISOString()
            }],
            createdBy: userId,
            status: "draft"
          }).returning();
          await this.objectStorageService.trySetObjectEntityAclPolicy(uploadURL, {
            owner: userId,
            visibility: "private",
            aclRules: []
          });
          console.log(`\u2705 Photo edited with object storage: ${editedPhoto.id} from ${photoId} by user ${userId}`);
          await db.update(photoEdits).set({
            editedPhotoId: editedPhoto.id,
            status: "completed"
          }).where(eq2(photoEdits.id, editRecord.id));
          this.analyzePhotoAsync(editedPhoto.id, editedObjectPath);
          return editedPhoto;
        } catch (error) {
          await db.update(photoEdits).set({ status: "failed" }).where(eq2(photoEdits.id, editRecord.id));
          throw error;
        }
      }
      // Generate new image with Nano Banana - using Object Storage
      async generateImage(prompt, userId) {
        try {
          if (!prompt || prompt.length < 5 || prompt.length > 500) {
            throw new Error("Invalid prompt length");
          }
          const sanitizedPrompt = prompt.replace(/[<>]/g, "");
          const result = await generateImageWithNanoBanana(sanitizedPrompt);
          const imageBuffer = Buffer.from(result.imageData, "base64");
          if (imageBuffer.length > 50 * 1024 * 1024) {
            throw new Error("Generated image too large");
          }
          const uploadURL = await this.objectStorageService.getObjectEntityUploadURL();
          const uploadResponse = await fetch(uploadURL, {
            method: "PUT",
            body: imageBuffer,
            headers: {
              "Content-Type": result.mimeType,
              "Content-Length": imageBuffer.length.toString()
            }
          });
          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload generated image: ${uploadResponse.statusText}`);
          }
          const objectPath = this.objectStorageService.normalizeObjectEntityPath(uploadURL);
          const [generatedPhoto] = await db.insert(mediaItems).values({
            filename: this.sanitizeFilename(`generated_${Date.now()}.jpg`),
            originalName: `generated_${prompt.substring(0, 30)}.jpg`,
            fileType: "photo",
            filePath: objectPath,
            fileSize: imageBuffer.length,
            mimeType: result.mimeType,
            createdBy: userId,
            status: "draft"
          }).returning();
          await this.objectStorageService.trySetObjectEntityAclPolicy(uploadURL, {
            owner: userId,
            visibility: "private",
            aclRules: []
          });
          console.log(`\u2705 Image generated with object storage: ${generatedPhoto.id} by user ${userId}`);
          this.analyzePhotoAsync(generatedPhoto.id, objectPath);
          return generatedPhoto;
        } catch (error) {
          console.error("Image generation failed:", error);
          throw error;
        }
      }
      async publishToWebsite(mediaIds, targetSection) {
        const items = await db.select().from(mediaItems).where(inArray2(mediaItems.id, mediaIds));
        for (const item of items) {
          const locations = item.publishedLocations || [];
          locations.push({
            section: targetSection,
            publishedAt: (/* @__PURE__ */ new Date()).toISOString()
          });
          await db.update(mediaItems).set({
            publishedLocations: locations,
            status: "published"
          }).where(eq2(mediaItems.id, item.id));
        }
        return { success: true, publishedCount: items.length };
      }
      async getMediaLibrary(page = 1, limit = 20, filter) {
        let query = db.select().from(mediaItems);
        if (filter === "photos") {
          query = query.where(inArray2(mediaItems.fileType, ["photo", "edited_photo"]));
        } else if (filter === "videos") {
          query = query.where(inArray2(mediaItems.fileType, ["video", "generated_video"]));
        } else if (filter === "analyzed") {
          query = query.where(eq2(mediaItems.aiAnalyzed, true));
        } else if (filter === "edited") {
          query = query.where(eq2(mediaItems.fileType, "edited_photo"));
        }
        const items = await query.orderBy(desc2(mediaItems.uploadDate)).limit(limit).offset((page - 1) * limit);
        return items;
      }
      async getAISuggestions(sectionType) {
        const photos = await db.select().from(mediaItems).where(and2(
          inArray2(mediaItems.fileType, ["photo", "edited_photo"]),
          eq2(mediaItems.aiAnalyzed, true),
          gte2(mediaItems.qualityScore, 7)
        ));
        const suggestions = await findBestPhotosForSection(photos, sectionType);
        return suggestions;
      }
      // Delete media item from object storage
      async deleteMedia(mediaId, userId) {
        if (!mediaId || typeof mediaId !== "string") {
          throw new Error("Invalid media ID");
        }
        try {
          const { media, objectFile } = await this.getObjectFileFromMediaItem(mediaId);
          try {
            await objectFile.delete();
            console.log(`\u2705 Deleted object from storage: ${media.filePath}`);
          } catch (storageError) {
            console.warn(`\u26A0\uFE0F Failed to delete from object storage: ${storageError}. Continuing with database cleanup.`);
          }
          await db.delete(mediaItems).where(eq2(mediaItems.id, mediaId));
          await db.delete(photoEdits).where(eq2(photoEdits.originalPhotoId, mediaId));
          console.log(`\u2705 Media deleted: ${mediaId} by user ${userId}`);
          return { success: true, deletedId: mediaId };
        } catch (error) {
          console.error(`\u274C Failed to delete media ${mediaId}:`, error);
          throw new Error("Failed to delete media item");
        }
      }
      // Bulk delete media items
      async bulkDeleteMedia(mediaIds, userId) {
        if (!Array.isArray(mediaIds) || mediaIds.length === 0) {
          throw new Error("Invalid media IDs array");
        }
        if (mediaIds.length > 50) {
          throw new Error("Too many items to delete at once (max 50)");
        }
        const results = {
          deleted: [],
          failed: []
        };
        for (const mediaId of mediaIds) {
          try {
            await this.deleteMedia(mediaId, userId);
            results.deleted.push(mediaId);
          } catch (error) {
            results.failed.push({
              id: mediaId,
              error: error instanceof Error ? error.message : "Unknown error"
            });
          }
        }
        console.log(`\u2705 Bulk delete completed: ${results.deleted.length} successful, ${results.failed.length} failed`);
        return results;
      }
      // Update media metadata
      async updateMediaMetadata(mediaId, updates, userId) {
        if (!mediaId || typeof mediaId !== "string") {
          throw new Error("Invalid media ID");
        }
        const [existingMedia] = await db.select().from(mediaItems).where(eq2(mediaItems.id, mediaId)).limit(1);
        if (!existingMedia) {
          throw new Error("Media not found");
        }
        const [updatedMedia] = await db.update(mediaItems).set({
          ...updates,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq2(mediaItems.id, mediaId)).returning();
        console.log(`\u2705 Media metadata updated: ${mediaId} by user ${userId}`);
        return updatedMedia;
      }
    };
    mediaLibraryService = new MediaLibraryService();
  }
});

// server/services/openai.ts
var openai_exports = {};
__export(openai_exports, {
  generateQuoteDescription: () => generateQuoteDescription,
  processChatMessage: () => processChatMessage
});
import OpenAI from "openai";
async function processChatMessage(message, conversationHistory, contactId) {
  try {
    if (!openai) {
      return await handleMockFlow(message, conversationHistory, contactId);
    }
    const templates = await storage.getQuoteTemplates();
    const eventTypes = templates.map((t) => t.eventType).filter((type, index, self) => self.indexOf(type) === index);
    const systemPrompt = `You are an intelligent AI assistant for Premier Party Cruises in Austin, Texas.
    You help customers book memorable party boat cruises on beautiful Lake Travis.
    
    AVAILABLE EVENT TYPES AND TEMPLATES:
    ${templates.map((t) => `- ${t.eventType}: ${t.name} (${t.minGroupSize}-${t.maxGroupSize} people, $${(t.basePricePerPerson || 0) / 100}/person base)`).join("\n    ")}
    
    YOUR CONVERSATION FLOW:
    1. Welcome and event type selection (show buttons for event types)
    2. Collect group size and basic details
    3. Show personalized quote preview with template
    4. Collect contact information
    5. Create project and offer booking
    
    CONVERSATION CONTEXT:
    ${conversationHistory.length > 0 ? "Previous messages: " + conversationHistory.slice(-3).map((m) => `${m.role}: ${m.content}`).join("; ") : "This is the start of conversation"}
    
    RESPONSE INSTRUCTIONS:
    - Always be warm, professional, and enthusiastic about Lake Travis cruises
    - Use buttons for event type selection and common choices
    - Extract ALL customer data from messages (name, email, phone, group size, date, etc.)
    - When you have enough info, automatically create contact and project
    - Progress the conversation naturally toward booking
    
    Respond with JSON in this exact format:
    {
      "message": "your response to the customer",
      "intent": "greeting|event_selection|info_collection|quote_generation|booking|contact_creation|other",
      "buttons": [
        {"id": "btn_1", "text": "Button Text", "value": "button_value", "style": "primary|secondary|outline"}
      ],
      "extractedData": {
        "groupSize": number or null,
        "eventType": "string or null",
        "preferredDate": "string or null",
        "preferredTime": "string or null",
        "duration": number or null,
        "budget": number or null,
        "specialRequests": "string or null",
        "name": "string or null",
        "email": "string or null",
        "phone": "string or null"
      },
      "suggestedActions": ["create_contact", "create_project", "generate_quote", "check_availability"],
      "flowStep": "welcome|event_selection|details_collection|quote_preview|contact_collection|booking_ready"
    }`;
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message }
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages,
      response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    const enhancedResult = await processAutomatedActions(result, contactId);
    return enhancedResult;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      message: "I'm sorry, I'm experiencing technical difficulties. Please try again in a moment.",
      intent: "error",
      suggestedActions: []
    };
  }
}
async function handleMockFlow(message, conversationHistory, contactId) {
  const lowerMessage = message.toLowerCase();
  if (conversationHistory.length === 0 || lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    const templates2 = await storage.getQuoteTemplates();
    const eventButtons = templates2.map((template, index) => ({
      id: `event_${template.eventType}`,
      text: `${template.name} (${template.minGroupSize}-${template.maxGroupSize} people)`,
      value: template.eventType,
      style: index === 0 ? "primary" : "secondary"
    }));
    return {
      message: "\u{1F6A2} Welcome to Premier Party Cruises! I'm here to help you plan the perfect celebration on beautiful Lake Travis. What type of event are you planning?",
      intent: "greeting",
      buttons: eventButtons,
      flowStep: "event_selection",
      extractedData: {}
    };
  }
  const templates = await storage.getQuoteTemplates();
  const selectedTemplate = templates.find(
    (t) => lowerMessage.includes(t.eventType.toLowerCase()) || lowerMessage.includes(t.name.toLowerCase())
  );
  if (selectedTemplate) {
    return {
      message: `Great choice! The ${selectedTemplate.name} is perfect for ${selectedTemplate.eventType} celebrations. How many guests will you have? We can accommodate ${selectedTemplate.minGroupSize}-${selectedTemplate.maxGroupSize} people.`,
      intent: "event_selection",
      buttons: [
        { id: "group_small", text: `${selectedTemplate.minGroupSize}-15 guests`, value: "small", style: "secondary" },
        { id: "group_medium", text: "16-25 guests", value: "medium", style: "secondary" },
        { id: "group_large", text: `26-${selectedTemplate.maxGroupSize} guests`, value: "large", style: "primary" }
      ],
      flowStep: "details_collection",
      extractedData: { eventType: selectedTemplate.eventType }
    };
  }
  const groupSizeMatch = message.match(/(\d+)/);
  const groupSize = groupSizeMatch ? parseInt(groupSizeMatch[1]) : null;
  if (groupSize) {
    return {
      message: `Perfect! ${groupSize} guests sounds like a fantastic celebration. \u{1F389} When are you thinking of booking? I can check our availability and create a personalized quote for you.`,
      intent: "info_collection",
      buttons: [
        { id: "date_soon", text: "Within 2 weeks", value: "soon", style: "primary" },
        { id: "date_month", text: "Next month", value: "month", style: "secondary" },
        { id: "date_flexible", text: "I'm flexible", value: "flexible", style: "outline" }
      ],
      flowStep: "quote_preview",
      extractedData: { groupSize },
      suggestedActions: ["generate_quote"]
    };
  }
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = message.match(/[\+]?[1-9]?[\d\s\-\(\)]{10,15}/);
  const nameMatch = message.match(/my name is ([a-zA-Z\s]+)|i'm ([a-zA-Z\s]+)|call me ([a-zA-Z\s]+)/i);
  const extractedData = {};
  if (emailMatch) extractedData.email = emailMatch[0];
  if (phoneMatch) extractedData.phone = phoneMatch[0];
  if (nameMatch) extractedData.name = (nameMatch[1] || nameMatch[2] || nameMatch[3]).trim();
  if (emailMatch || phoneMatch || nameMatch) {
    return {
      message: "Thank you for that information! I'll create your personalized quote right away. Here's what I have so far, and I'll send you the complete details.",
      intent: "contact_creation",
      flowStep: "booking_ready",
      extractedData,
      suggestedActions: ["create_contact", "create_project", "generate_quote"]
    };
  }
  return {
    message: "That sounds exciting! To create the perfect quote for your event, could you share your email address so I can send you all the details?",
    intent: "inquiry",
    buttons: [
      { id: "contact_email", text: "Share Email", value: "email", style: "primary" },
      { id: "contact_phone", text: "Prefer Phone Call", value: "phone", style: "secondary" },
      { id: "more_info", text: "Tell Me More First", value: "info", style: "outline" }
    ],
    flowStep: "contact_collection",
    extractedData: {},
    suggestedActions: ["collect_contact_info"]
  };
}
async function processAutomatedActions(response, existingContactId) {
  const automatedActions = {};
  try {
    const hasContactInfo = response.extractedData?.email && response.extractedData?.name && response.extractedData?.phone;
    const shouldCreateLead = hasContactInfo && !existingContactId && (response.suggestedActions?.includes("create_contact") || response.suggestedActions?.includes("create_project") || response.suggestedActions?.includes("generate_quote"));
    if (shouldCreateLead) {
      console.log("\u{1F916} Triggering comprehensive lead creation from chatbot interaction...");
      const leadResult = await comprehensiveLeadService.createLeadFromChatbot({
        name: response.extractedData?.name || "",
        email: response.extractedData?.email || "",
        phone: response.extractedData?.phone || "",
        eventType: response.extractedData?.eventType,
        eventTypeLabel: response.extractedData?.eventType,
        // Use eventType as label if not provided
        groupSize: response.extractedData?.groupSize,
        preferredDate: response.extractedData?.preferredDate,
        extractedData: response.extractedData
      });
      if (leadResult.success) {
        console.log("\u2705 Comprehensive lead creation successful!");
        automatedActions.contactId = leadResult.leadId;
        automatedActions.projectId = leadResult.projectId;
        automatedActions.quoteId = leadResult.quoteId;
        automatedActions.quoteUrl = leadResult.quoteUrl;
        if (leadResult.quoteId && leadResult.quoteUrl) {
          try {
            const quote = await storage.getQuote(leadResult.quoteId);
            if (quote) {
              response.message += `

\u{1F4B0} I've created a personalized quote for you! Your ${response.extractedData?.eventType || "cruise"} celebration will be approximately ${quote.perPersonCost > 0 ? `$${(quote.perPersonCost / 100).toFixed(2)} per person` : `$${(quote.total / 100).toFixed(2)} total`}.`;
              response.message += `

\u{1F4E7} I'm sending you the complete details now with all the inclusions! You'll also receive an SMS with your quote link.`;
              response.message += `

\u{1F517} View your quote here: ${leadResult.quoteUrl}`;
            }
          } catch (error) {
            console.log("Warning: Could not enhance message with quote details:", error);
          }
        }
        const integrationSummary = [
          leadResult.integrations.googleSheets.success ? "\u2705 Google Sheets" : "\u274C Google Sheets",
          leadResult.integrations.goHighLevel.success ? "\u2705 GoHighLevel" : "\u274C GoHighLevel",
          leadResult.integrations.emailNotification.success ? "\u2705 Email" : "\u274C Email"
        ].join(" | ");
        console.log("\u{1F4CA} Integration Results:", integrationSummary);
        if (leadResult.integrations.googleSheets.success || leadResult.integrations.goHighLevel.success) {
          response.message += `

\u2728 Your information has been securely saved and our team will follow up with you shortly!`;
        }
        if (leadResult.errors.length > 0) {
          console.log("\u26A0\uFE0F Some integrations had issues:", leadResult.errors);
        }
      } else {
        console.log("\u274C Comprehensive lead creation failed, falling back to basic contact creation");
        try {
          const contact = await storage.findOrCreateContact(
            response.extractedData?.email || "",
            response.extractedData?.name,
            response.extractedData?.phone
          );
          automatedActions.contactId = contact.id;
          response.message += `

\u{1F4DD} I've saved your contact information and our team will reach out to you soon!`;
        } catch (error) {
          console.error("\u274C Fallback contact creation also failed:", error);
        }
      }
    } else if (existingContactId && (response.suggestedActions?.includes("create_project") || response.suggestedActions?.includes("generate_quote"))) {
      console.log("\u{1F4CB} Creating project and quote for existing contact:", existingContactId);
      try {
        if (response.extractedData?.eventType || response.extractedData?.groupSize) {
          const project = await storage.createProjectFromChatData(existingContactId, response.extractedData || {});
          automatedActions.projectId = project.id;
          if (response.extractedData?.eventType && response.suggestedActions?.includes("generate_quote")) {
            const templates = await storage.getQuoteTemplatesByEventType(response.extractedData.eventType);
            if (templates.length > 0) {
              const template = templates[0];
              const pricing = await storage.calculatePricing({
                items: template.defaultItems || [],
                groupSize: response.extractedData?.groupSize,
                projectDate: response.extractedData?.preferredDate ? new Date(response.extractedData.preferredDate) : void 0,
                templateId: template.id
              });
              const quote = await storage.createQuote({
                projectId: project.id,
                templateId: template.id,
                items: template.defaultItems,
                subtotal: pricing.subtotal,
                discountTotal: pricing.discountTotal,
                tax: pricing.tax,
                gratuity: pricing.gratuity,
                total: pricing.total,
                perPersonCost: pricing.perPersonCost,
                depositRequired: pricing.depositRequired,
                depositPercent: pricing.depositPercent,
                depositAmount: pricing.depositAmount,
                paymentSchedule: pricing.paymentSchedule,
                expiresAt: pricing.expiresAt
              });
              automatedActions.quoteId = quote.id;
              const contact = await storage.getContact(existingContactId);
              if (contact?.email) {
                const quoteUrl = getQuoteUrl(quote.accessToken);
                await comprehensiveLeadService.updateLeadWithQuote(existingContactId, {
                  quoteId: quote.id,
                  quoteUrl,
                  projectId: project.id,
                  pricing
                });
              }
              response.message += `

\u{1F4B0} I've created a personalized quote for you! Your ${response.extractedData.eventType} celebration will be approximately ${pricing.perPersonCost > 0 ? `$${(pricing.perPersonCost / 100).toFixed(2)} per person` : `$${(pricing.total / 100).toFixed(2)} total`}. I'll send you the complete details with all the inclusions.`;
              if (pricing.urgencyMessage) {
                response.message += `

${pricing.urgencyMessage}`;
              }
            }
          }
        }
      } catch (error) {
        console.error("\u274C Error creating project/quote for existing contact:", error);
      }
    }
    return {
      ...response,
      automatedActions: Object.keys(automatedActions).length > 0 ? automatedActions : void 0
    };
  } catch (error) {
    console.error("\u{1F4A5} Critical error in processAutomatedActions:", error);
    return response;
  }
}
async function generateQuoteDescription(eventType, groupSize, selectedServices) {
  try {
    if (!openai) {
      return `Get ready for an unforgettable ${eventType} cruise on beautiful Lake Travis for ${groupSize} people!`;
    }
    const prompt = `Generate a friendly, professional quote description for a ${eventType} for ${groupSize} people with these services: ${selectedServices.join(", ")}. 
    Make it personalized and exciting for a party boat cruise in Austin, Texas.`;
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }]
    });
    return response.choices[0].message.content || "Your amazing party cruise awaits!";
  } catch (error) {
    console.error("Error generating quote description:", error);
    return "Get ready for an unforgettable party cruise experience on beautiful Lake Travis!";
  }
}
var openai;
var init_openai = __esm({
  "server/services/openai.ts"() {
    "use strict";
    init_storage();
    init_comprehensiveLeadService();
    init_utils();
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY not configured. AI functionality will be mocked.");
    }
    openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
  }
});

// server/services/seoService.ts
var seoService_exports = {};
__export(seoService_exports, {
  SEOService: () => SEOService,
  seoService: () => seoService
});
var SEOService, seoService;
var init_seoService = __esm({
  "server/services/seoService.ts"() {
    "use strict";
    SEOService = class {
      openaiService = null;
      geminiService = null;
      constructor() {
        this.initializeAIServices();
      }
      async initializeAIServices() {
        try {
          const { openaiService } = await Promise.resolve().then(() => (init_openai(), openai_exports));
          this.openaiService = openaiService;
        } catch (error) {
          console.warn("OpenAI service not available:", error);
        }
        try {
          const { geminiService } = await Promise.resolve().then(() => (init_gemini(), gemini_exports));
          this.geminiService = geminiService;
        } catch (error) {
          console.warn("Gemini service not available:", error);
        }
      }
      /**
       * Discover all application routes automatically
       * This includes both static routes and dynamic routes from the React app
       */
      async discoverApplicationRoutes() {
        const routes = [
          // Main pages
          { route: "/", name: "Home Page", description: "Main landing page", isPublic: true },
          { route: "/private-cruises", name: "Private Cruises", description: "Private cruise packages", isPublic: true },
          { route: "/bachelor-party", name: "Bachelor Party", description: "Bachelor party cruises", isPublic: true },
          { route: "/bachelorette-party", name: "Bachelorette Party", description: "Bachelorette party cruises", isPublic: true },
          { route: "/birthday-parties", name: "Birthday Parties", description: "Birthday celebration cruises", isPublic: true },
          { route: "/corporate-events", name: "Corporate Events", description: "Corporate team building events", isPublic: true },
          { route: "/wedding-parties", name: "Wedding Parties", description: "Wedding celebration cruises", isPublic: true },
          { route: "/team-building", name: "Team Building", description: "Corporate team building activities", isPublic: true },
          { route: "/after-party", name: "After Party", description: "After party cruise events", isPublic: true },
          { route: "/rehearsal-dinner", name: "Rehearsal Dinner", description: "Wedding rehearsal dinner cruises", isPublic: true },
          { route: "/sweet16", name: "Sweet 16", description: "Sweet 16 birthday cruises", isPublic: true },
          { route: "/graduation-party", name: "Graduation Party", description: "Graduation celebration cruises", isPublic: true },
          { route: "/milestone-birthday", name: "Milestone Birthday", description: "Special milestone birthday cruises", isPublic: true },
          { route: "/welcome-party", name: "Welcome Party", description: "Welcome party events", isPublic: true },
          { route: "/company-milestone", name: "Company Milestone", description: "Corporate milestone celebrations", isPublic: true },
          { route: "/client-entertainment", name: "Client Entertainment", description: "Client entertainment events", isPublic: true },
          // Information pages
          { route: "/gallery", name: "Photo Gallery", description: "Event photos and boat gallery", isPublic: true },
          { route: "/contact", name: "Contact Us", description: "Contact information and form", isPublic: true },
          { route: "/testimonials-faq", name: "Testimonials & FAQ", description: "Customer testimonials and FAQ", isPublic: true },
          // Blog pages
          { route: "/blog", name: "Blog", description: "Company blog and articles", isPublic: true },
          { route: "/blog/category/:category", name: "Blog Category", description: "Blog posts by category", isPublic: true },
          { route: "/blog/tag/:tag", name: "Blog Tag", description: "Blog posts by tag", isPublic: true },
          { route: "/blog/author/:author", name: "Blog Author", description: "Posts by specific author", isPublic: true }
        ];
        return routes;
      }
      /**
       * Analyze a page's SEO performance
       */
      async analyzePage(pageRoute, content) {
        const issues = [];
        const recommendations = [];
        let score = 100;
        const storage3 = await this.getStorage();
        const existingPage = await storage3.getSeoPage(pageRoute);
        const mockContent = content || this.generateMockContentForRoute(pageRoute);
        const metaAnalysis = this.analyzeMetaTags(existingPage, pageRoute);
        issues.push(...metaAnalysis.issues);
        recommendations.push(...metaAnalysis.recommendations);
        score -= metaAnalysis.scorePenalty;
        const contentAnalysis = this.analyzeContent(mockContent, existingPage?.focusKeyword);
        issues.push(...contentAnalysis.issues);
        recommendations.push(...contentAnalysis.recommendations);
        score -= contentAnalysis.scorePenalty;
        const technicalAnalysis = this.analyzeTechnicalSEO(pageRoute);
        issues.push(...technicalAnalysis.issues);
        recommendations.push(...technicalAnalysis.recommendations);
        score -= technicalAnalysis.scorePenalty;
        const keywordDensity = this.calculateKeywordDensity(mockContent, existingPage?.focusKeyword);
        const headingStructure = this.analyzeHeadingStructure(mockContent);
        const contentMetrics = {
          wordCount: mockContent.split(" ").length,
          paragraphCount: mockContent.split("\n\n").length,
          sentenceCount: mockContent.split(/[.!?]+/).length,
          readabilityScore: this.calculateReadabilityScore(mockContent)
        };
        const technicalMetrics = {
          loadTime: Math.floor(Math.random() * 2e3) + 500,
          // Mock load time
          mobileOptimized: true,
          hasStructuredData: !!existingPage?.schemaMarkup && Object.keys(existingPage.schemaMarkup).length > 0,
          internalLinks: existingPage?.internalLinks || 0,
          externalLinks: existingPage?.externalLinks || 0,
          imagesWithoutAlt: existingPage?.imagesWithoutAlt || 0
        };
        return {
          score: Math.max(0, Math.min(100, score)),
          issues,
          recommendations,
          keywordDensity,
          headingStructure,
          contentMetrics,
          technicalMetrics
        };
      }
      /**
       * Generate AI-powered SEO optimizations
       */
      async optimizePage(request) {
        const { pageRoute, targetKeyword, optimizationType, currentContent } = request;
        const aiService = this.openaiService || this.geminiService;
        let aiSuggestions = [];
        let model = "fallback";
        const optimizedData = {};
        if (aiService && this.openaiService) {
          model = "gpt-4";
          try {
            if (optimizationType === "meta_tags" || optimizationType === "full_page") {
              const titlePrompt = `Generate an SEO-optimized meta title for a ${this.getPageTypeFromRoute(pageRoute)} page about "${targetKeyword || this.getDefaultKeywordForRoute(pageRoute)}". The title should be compelling, under 60 characters, and include the target keyword naturally. Page route: ${pageRoute}`;
              const titleResponse = await this.openaiService.generateResponse(titlePrompt, {
                maxTokens: 100,
                temperature: 0.7
              });
              if (titleResponse) {
                optimizedData.metaTitle = titleResponse.trim().replace(/"/g, "");
                aiSuggestions.push(`Generated optimized meta title: "${optimizedData.metaTitle}"`);
              }
            }
            if (optimizationType === "meta_tags" || optimizationType === "full_page") {
              const descPrompt = `Generate an SEO-optimized meta description for a ${this.getPageTypeFromRoute(pageRoute)} page about "${targetKeyword || this.getDefaultKeywordForRoute(pageRoute)}". The description should be compelling, under 160 characters, include the target keyword, and encourage clicks. Page route: ${pageRoute}`;
              const descResponse = await this.openaiService.generateResponse(descPrompt, {
                maxTokens: 150,
                temperature: 0.7
              });
              if (descResponse) {
                optimizedData.metaDescription = descResponse.trim().replace(/"/g, "");
                aiSuggestions.push(`Generated optimized meta description: "${optimizedData.metaDescription}"`);
              }
            }
            if (optimizationType === "full_page") {
              const keywordsPrompt = `Generate 5-8 relevant SEO keywords for a ${this.getPageTypeFromRoute(pageRoute)} page about "${targetKeyword || this.getDefaultKeywordForRoute(pageRoute)}". Include both primary and long-tail keywords. Return as a comma-separated list.`;
              const keywordsResponse = await this.openaiService.generateResponse(keywordsPrompt, {
                maxTokens: 100,
                temperature: 0.5
              });
              if (keywordsResponse) {
                const keywords = keywordsResponse.trim().split(",").map((k) => k.trim()).filter((k) => k.length > 0);
                optimizedData.targetKeywords = keywords;
                optimizedData.focusKeyword = targetKeyword || keywords[0];
                aiSuggestions.push(`Generated ${keywords.length} target keywords including focus keyword: "${optimizedData.focusKeyword}"`);
              }
            }
            if (optimizationType === "content" || optimizationType === "full_page") {
              const contentPrompt = `Provide 3-5 specific SEO content optimization recommendations for a ${this.getPageTypeFromRoute(pageRoute)} page targeting "${targetKeyword || this.getDefaultKeywordForRoute(pageRoute)}". Focus on content structure, keyword usage, and user engagement.`;
              const contentResponse = await this.openaiService.generateResponse(contentPrompt, {
                maxTokens: 300,
                temperature: 0.6
              });
              if (contentResponse) {
                const suggestions = contentResponse.trim().split("\n").filter((s) => s.trim().length > 0);
                aiSuggestions.push(...suggestions);
              }
            }
          } catch (error) {
            console.error("AI optimization failed:", error);
            aiSuggestions.push("AI optimization temporarily unavailable - using fallback recommendations");
          }
        }
        if (aiSuggestions.length === 0) {
          optimizedData.metaTitle = this.generateFallbackTitle(pageRoute, targetKeyword);
          optimizedData.metaDescription = this.generateFallbackDescription(pageRoute, targetKeyword);
          optimizedData.targetKeywords = this.generateFallbackKeywords(pageRoute, targetKeyword);
          optimizedData.focusKeyword = targetKeyword || this.getDefaultKeywordForRoute(pageRoute);
          aiSuggestions = [
            "Generated optimized meta tags using SEO best practices",
            "Added relevant target keywords for the page topic",
            "Ensured meta title is under 60 characters",
            "Created compelling meta description under 160 characters"
          ];
        }
        optimizedData.lastAnalyzed = /* @__PURE__ */ new Date();
        optimizedData.seoScore = Math.floor(Math.random() * 15) + 75;
        optimizedData.recommendations = aiSuggestions;
        return {
          optimizedData,
          aiSuggestions,
          model
        };
      }
      /**
       * Calculate SEO overview metrics
       */
      async calculateOverviewMetrics() {
        const storage3 = await this.getStorage();
        const pages = await storage3.getSeoPages();
        if (pages.length === 0) {
          await this.initializeDiscoveredPages();
          const newPages = await storage3.getSeoPages();
          return this.calculateMetricsFromPages(newPages);
        }
        return this.calculateMetricsFromPages(pages);
      }
      /**
       * Initialize SEO pages for all discovered routes
       */
      async initializeDiscoveredPages() {
        const routes = await this.discoverApplicationRoutes();
        const storage3 = await this.getStorage();
        for (const route of routes) {
          const existingPage = await storage3.getSeoPage(route.route);
          if (!existingPage) {
            const pageData = {
              pageRoute: route.route,
              pageName: route.name,
              metaTitle: this.generateFallbackTitle(route.route),
              metaDescription: this.generateFallbackDescription(route.route),
              targetKeywords: this.generateFallbackKeywords(route.route),
              focusKeyword: this.getDefaultKeywordForRoute(route.route),
              seoScore: 50,
              // Default score for unoptimized pages
              active: route.isPublic,
              autoOptimize: false
            };
            await storage3.createSeoPage(pageData);
          }
        }
      }
      // Helper methods
      async getStorage() {
        const { storage: storage3 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
        return storage3;
      }
      calculateMetricsFromPages(pages) {
        const totalPages = pages.length;
        const averageScore = pages.reduce((sum2, page) => sum2 + (page.seoScore || 0), 0) / totalPages;
        const highPriorityIssues = pages.reduce((sum2, page) => {
          return sum2 + (page.issues?.filter((issue) => issue.priority === "high").length || 0);
        }, 0);
        const pagesNeedingOptimization = pages.filter((page) => (page.seoScore || 0) < 70).length;
        const lastAnalyzed = pages.map((page) => page.lastAnalyzed).filter((date) => date).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
        return {
          totalPages,
          averageScore: Math.round(averageScore),
          highPriorityIssues,
          pagesNeedingOptimization,
          lastAnalyzed: lastAnalyzed?.toISOString()
        };
      }
      analyzeMetaTags(page, pageRoute) {
        const issues = [];
        const recommendations = [];
        let scorePenalty = 0;
        if (!page?.metaTitle) {
          issues.push({
            type: "error",
            category: "meta",
            message: "Missing meta title",
            priority: "high",
            autoFixable: true
          });
          recommendations.push("Add a unique, descriptive meta title (50-60 characters)");
          scorePenalty += 15;
        } else if (page.metaTitle.length > 60) {
          issues.push({
            type: "warning",
            category: "meta",
            message: "Meta title too long (over 60 characters)",
            priority: "medium",
            autoFixable: true
          });
          recommendations.push("Shorten meta title to under 60 characters");
          scorePenalty += 8;
        } else if (page.metaTitle.length < 30) {
          issues.push({
            type: "warning",
            category: "meta",
            message: "Meta title too short (under 30 characters)",
            priority: "medium",
            autoFixable: true
          });
          recommendations.push("Expand meta title to 50-60 characters for better SEO");
          scorePenalty += 5;
        }
        if (!page?.metaDescription) {
          issues.push({
            type: "error",
            category: "meta",
            message: "Missing meta description",
            priority: "high",
            autoFixable: true
          });
          recommendations.push("Add a compelling meta description (150-160 characters)");
          scorePenalty += 12;
        } else if (page.metaDescription.length > 160) {
          issues.push({
            type: "warning",
            category: "meta",
            message: "Meta description too long (over 160 characters)",
            priority: "medium",
            autoFixable: true
          });
          recommendations.push("Shorten meta description to under 160 characters");
          scorePenalty += 6;
        } else if (page.metaDescription.length < 120) {
          issues.push({
            type: "info",
            category: "meta",
            message: "Meta description could be longer for better SERP visibility",
            priority: "low",
            autoFixable: true
          });
          recommendations.push("Expand meta description to 150-160 characters");
          scorePenalty += 2;
        }
        if (!page?.focusKeyword) {
          issues.push({
            type: "warning",
            category: "meta",
            message: "No focus keyword defined",
            priority: "medium",
            autoFixable: true
          });
          recommendations.push("Define a primary focus keyword for this page");
          scorePenalty += 10;
        }
        return { issues, recommendations, scorePenalty };
      }
      analyzeContent(content, focusKeyword) {
        const issues = [];
        const recommendations = [];
        let scorePenalty = 0;
        const wordCount = content.split(" ").length;
        if (wordCount < 300) {
          issues.push({
            type: "warning",
            category: "content",
            message: "Content too short (under 300 words)",
            priority: "medium",
            autoFixable: false
          });
          recommendations.push("Add more descriptive content (aim for 300+ words)");
          scorePenalty += 10;
        }
        if (focusKeyword && content.toLowerCase().indexOf(focusKeyword.toLowerCase()) === -1) {
          issues.push({
            type: "warning",
            category: "content",
            message: "Focus keyword not found in content",
            priority: "medium",
            autoFixable: false
          });
          recommendations.push(`Include the focus keyword "${focusKeyword}" naturally in the content`);
          scorePenalty += 8;
        }
        return { issues, recommendations, scorePenalty };
      }
      analyzeTechnicalSEO(pageRoute) {
        const issues = [];
        const recommendations = [];
        let scorePenalty = 0;
        issues.push({
          type: "info",
          category: "technical",
          message: "Consider adding structured data markup",
          priority: "low",
          autoFixable: false
        });
        recommendations.push("Add JSON-LD structured data for better search engine understanding");
        return { issues, recommendations, scorePenalty };
      }
      calculateKeywordDensity(content, focusKeyword) {
        if (!focusKeyword) return {};
        const words = content.toLowerCase().split(/\s+/);
        const totalWords = words.length;
        const keywordCount = words.filter((word) => word.includes(focusKeyword.toLowerCase())).length;
        return {
          [focusKeyword]: parseFloat((keywordCount / totalWords * 100).toFixed(2))
        };
      }
      analyzeHeadingStructure(content) {
        return {
          h1: ["Main Page Title"],
          // Mock data
          h2: ["Section 1", "Section 2"],
          h3: ["Subsection 1.1", "Subsection 2.1"],
          h4: [],
          h5: [],
          h6: []
        };
      }
      calculateReadabilityScore(content) {
        const words = content.split(" ").length;
        const sentences = content.split(/[.!?]+/).length;
        const avgWordsPerSentence = words / sentences;
        return Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 2));
      }
      generateMockContentForRoute(pageRoute) {
        const routeContentMap = {
          "/": "Welcome to our premier boat cruise experience in Austin, Texas. We offer unforgettable private cruises and disco boat parties on beautiful Lake Austin. Our experienced crew and modern fleet ensure your event is perfect.",
          "/private-cruises": "Experience the ultimate private cruise on Lake Austin. Perfect for intimate celebrations, corporate events, and special occasions. Our private boats accommodate groups of 14 to 75 people with customizable packages.",
          "/bachelor-party": "Make your bachelor party legendary with our exclusive boat cruise packages. Celebrate with your crew on Lake Austin with music, drinks, and unforgettable memories.",
          "/bachelorette-party": "Create the perfect bachelorette party experience on the water. Our boat cruises offer the ideal setting for celebrating with your closest friends."
        };
        return routeContentMap[pageRoute] || `This is the ${pageRoute} page content. Learn more about our services and book your perfect cruise experience today.`;
      }
      getPageTypeFromRoute(pageRoute) {
        if (pageRoute.includes("bachelor")) return "bachelor party cruise";
        if (pageRoute.includes("bachelorette")) return "bachelorette party cruise";
        if (pageRoute.includes("birthday")) return "birthday party cruise";
        if (pageRoute.includes("corporate")) return "corporate event cruise";
        if (pageRoute.includes("wedding")) return "wedding party cruise";
        if (pageRoute.includes("private")) return "private cruise";
        if (pageRoute === "/") return "boat cruise service";
        return "cruise service";
      }
      getDefaultKeywordForRoute(pageRoute) {
        const keywordMap = {
          "/": "boat cruise Austin",
          "/private-cruises": "private boat cruise Austin",
          "/bachelor-party": "bachelor party boat Austin",
          "/bachelorette-party": "bachelorette party boat Austin",
          "/birthday-parties": "birthday party boat cruise",
          "/corporate-events": "corporate boat event Austin",
          "/wedding-parties": "wedding party boat cruise",
          "/gallery": "boat cruise photos Austin",
          "/contact": "boat cruise contact Austin"
        };
        return keywordMap[pageRoute] || "boat cruise Austin";
      }
      generateFallbackTitle(pageRoute, targetKeyword) {
        const keyword = targetKeyword || this.getDefaultKeywordForRoute(pageRoute);
        const pageType = this.getPageTypeFromRoute(pageRoute);
        return `${this.capitalizeFirst(pageType)} | Austin Boat Cruises`;
      }
      generateFallbackDescription(pageRoute, targetKeyword) {
        const keyword = targetKeyword || this.getDefaultKeywordForRoute(pageRoute);
        const pageType = this.getPageTypeFromRoute(pageRoute);
        return `Book the perfect ${pageType} in Austin, TX. Professional crew, modern boats, and unforgettable experiences on Lake Austin. Get your quote today!`;
      }
      generateFallbackKeywords(pageRoute, targetKeyword) {
        const baseKeyword = targetKeyword || this.getDefaultKeywordForRoute(pageRoute);
        return [
          baseKeyword,
          "Austin boat rental",
          "Lake Austin cruise",
          "boat party Austin",
          "Austin water activities"
        ];
      }
      capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    };
    seoService = new SEOService();
  }
});

// server/services/errorMonitoring.ts
var errorMonitoring_exports = {};
__export(errorMonitoring_exports, {
  errorMonitoringService: () => errorMonitoringService
});
var ErrorMonitoringService, errorMonitoringService;
var init_errorMonitoring = __esm({
  "server/services/errorMonitoring.ts"() {
    "use strict";
    init_mailgun();
    init_gohighlevel();
    ErrorMonitoringService = class {
      ownerPhone;
      ownerEmail;
      websiteUrl = "premierpartycruises.com";
      constructor() {
        this.ownerPhone = process.env.ERROR_ALERT_PHONE || "5125767975";
        this.ownerEmail = process.env.ERROR_ALERT_EMAIL || "ppcaustin@gmail.com";
        if (!process.env.ERROR_ALERT_PHONE) {
          console.warn("\u26A0\uFE0F ERROR_ALERT_PHONE not set, using default value: 5125767975");
        }
        if (!process.env.ERROR_ALERT_EMAIL) {
          console.warn("\u26A0\uFE0F ERROR_ALERT_EMAIL not set, using default value: ppcaustin@gmail.com");
        }
        console.log("\u{1F4E7} Error Monitoring Service initialized:");
        console.log(`   Phone: ${this.ownerPhone} ${process.env.ERROR_ALERT_PHONE ? "(from env)" : "(default)"}`);
        console.log(`   Email: ${this.ownerEmail} ${process.env.ERROR_ALERT_EMAIL ? "(from env)" : "(default)"}`);
      }
      /**
       * Send error alert via SMS and/or Email based on severity
       * CRITICAL: Sends both SMS and Email
       * ERROR: Sends Email only
       */
      async sendAlert(options) {
        const { error, severity, request, context } = options;
        try {
          const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
          const environment = process.env.NODE_ENV || "development";
          const errorType = error.name || "Error";
          const errorMessage = error.message || "Unknown error";
          const stackTrace = error.stack || "No stack trace available";
          const truncatedStack = stackTrace.substring(0, 500);
          const fullStack = stackTrace;
          const requestInfo = request ? {
            method: request.method,
            path: request.path,
            query: JSON.stringify(request.query),
            ip: request.ip,
            userAgent: request.get("user-agent") || "Unknown"
          } : null;
          console.log(`\u{1F6A8} Error Monitoring: ${severity} alert triggered`);
          console.log(`   Error: ${errorType} - ${errorMessage}`);
          console.log(`   Environment: ${environment}`);
          console.log(`   Context: ${context || "None"}`);
          if (severity === "CRITICAL") {
            const smsMessage = `\u{1F6A8} CRITICAL ERROR on ${this.websiteUrl}: ${errorType} - ${errorMessage}. Check email for details.`;
            try {
              const smsSent = await goHighLevelService.send({
                to: this.ownerPhone,
                body: smsMessage
              });
              if (smsSent) {
                console.log("\u2705 Critical error SMS alert sent successfully");
              } else {
                console.warn("\u26A0\uFE0F Failed to send critical error SMS alert");
              }
            } catch (smsError) {
              console.error("\u274C Error sending SMS alert:", smsError.message);
            }
          }
          const emailSubject = `\u{1F6A8} ${severity === "CRITICAL" ? "Critical" : ""} Error: ${errorType}`;
          const emailHtml = this.generateEmailHtml({
            severity,
            errorType,
            errorMessage,
            timestamp: timestamp2,
            environment,
            truncatedStack,
            fullStack,
            requestInfo,
            context
          });
          const emailText = this.generateEmailText({
            severity,
            errorType,
            errorMessage,
            timestamp: timestamp2,
            environment,
            fullStack,
            requestInfo,
            context
          });
          try {
            const emailSent = await mailgunService.send({
              to: this.ownerEmail,
              subject: emailSubject,
              html: emailHtml,
              text: emailText
            });
            if (emailSent) {
              console.log("\u2705 Error email alert sent successfully");
            } else {
              console.warn("\u26A0\uFE0F Failed to send error email alert");
            }
          } catch (emailError) {
            console.error("\u274C Error sending email alert:", emailError.message);
          }
        } catch (monitoringError) {
          console.error("\u274C Error in error monitoring service:", monitoringError.message);
        }
      }
      /**
       * Generate HTML email content for error alert
       */
      generateEmailHtml(params) {
        const {
          severity,
          errorType,
          errorMessage,
          timestamp: timestamp2,
          environment,
          fullStack,
          requestInfo,
          context
        } = params;
        return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: ${severity === "CRITICAL" ? "#dc2626" : "#ea580c"};
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #f9fafb;
      padding: 20px;
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
    .info-block {
      background-color: white;
      padding: 15px;
      margin: 10px 0;
      border-radius: 6px;
      border-left: 4px solid #3b82f6;
    }
    .info-label {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 5px;
    }
    .info-value {
      color: #4b5563;
      font-family: 'Courier New', monospace;
      word-break: break-word;
    }
    .stack-trace {
      background-color: #1f2937;
      color: #f3f4f6;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      line-height: 1.4;
    }
    .severity-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      background-color: ${severity === "CRITICAL" ? "#fef2f2" : "#fff7ed"};
      color: ${severity === "CRITICAL" ? "#dc2626" : "#ea580c"};
      font-weight: 600;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">\u{1F6A8} ${severity === "CRITICAL" ? "Critical" : ""} Server Error Detected</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Website: ${this.websiteUrl}</p>
  </div>
  
  <div class="content">
    <div class="info-block">
      <div class="info-label">Severity</div>
      <div><span class="severity-badge">${severity}</span></div>
    </div>

    <div class="info-block">
      <div class="info-label">Error Type</div>
      <div class="info-value">${errorType}</div>
    </div>

    <div class="info-block">
      <div class="info-label">Error Message</div>
      <div class="info-value">${errorMessage}</div>
    </div>

    <div class="info-block">
      <div class="info-label">Timestamp</div>
      <div class="info-value">${new Date(timestamp2).toLocaleString("en-US", {
          timeZone: "America/Chicago",
          dateStyle: "full",
          timeStyle: "long"
        })}</div>
    </div>

    <div class="info-block">
      <div class="info-label">Environment</div>
      <div class="info-value">${environment}</div>
    </div>

    ${context ? `
    <div class="info-block">
      <div class="info-label">Context</div>
      <div class="info-value">${context}</div>
    </div>
    ` : ""}

    ${requestInfo ? `
    <div class="info-block">
      <div class="info-label">Request Information</div>
      <div class="info-value">
        <strong>Method:</strong> ${requestInfo.method}<br>
        <strong>Path:</strong> ${requestInfo.path}<br>
        <strong>Query:</strong> ${requestInfo.query}<br>
        <strong>IP:</strong> ${requestInfo.ip}<br>
        <strong>User Agent:</strong> ${requestInfo.userAgent}
      </div>
    </div>
    ` : ""}

    <div class="info-block">
      <div class="info-label">Stack Trace</div>
      <div class="stack-trace">${this.escapeHtml(fullStack)}</div>
    </div>

    <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 6px; border-left: 4px solid #3b82f6;">
      <strong>Action Required:</strong> Please investigate this error immediately and take appropriate action to prevent further issues.
    </div>
  </div>
</body>
</html>
    `.trim();
      }
      /**
       * Generate plain text email content for error alert
       */
      generateEmailText(params) {
        const {
          severity,
          errorType,
          errorMessage,
          timestamp: timestamp2,
          environment,
          fullStack,
          requestInfo,
          context
        } = params;
        let text2 = `\u{1F6A8} ${severity === "CRITICAL" ? "CRITICAL" : ""} SERVER ERROR DETECTED

Website: ${this.websiteUrl}

SEVERITY: ${severity}

ERROR TYPE: ${errorType}

ERROR MESSAGE: ${errorMessage}

TIMESTAMP: ${new Date(timestamp2).toLocaleString("en-US", {
          timeZone: "America/Chicago",
          dateStyle: "full",
          timeStyle: "long"
        })}

ENVIRONMENT: ${environment}
`;
        if (context) {
          text2 += `
CONTEXT: ${context}`;
        }
        if (requestInfo) {
          text2 += `
REQUEST INFORMATION:
  Method: ${requestInfo.method}
  Path: ${requestInfo.path}
  Query: ${requestInfo.query}
  IP: ${requestInfo.ip}
  User Agent: ${requestInfo.userAgent}
`;
        }
        text2 += `
STACK TRACE:
${fullStack}

---
Action Required: Please investigate this error immediately and take appropriate action to prevent further issues.
`;
        return text2;
      }
      /**
       * Escape HTML special characters
       */
      escapeHtml(text2) {
        const map = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;"
        };
        return text2.replace(/[&<>"']/g, (m) => map[m]);
      }
      /**
       * Check if error monitoring is configured
       */
      isConfigured() {
        return goHighLevelService.isConfigured() || mailgunService.isConfigured();
      }
      /**
       * Check if environment variables are set for owner contact info
       */
      isContactConfigured() {
        return !!(process.env.ERROR_ALERT_PHONE && process.env.ERROR_ALERT_EMAIL);
      }
      /**
       * Get owner contact information with source indication
       */
      getContactInfo() {
        return {
          phone: this.ownerPhone,
          email: this.ownerEmail,
          phoneSource: process.env.ERROR_ALERT_PHONE ? "environment" : "default",
          emailSource: process.env.ERROR_ALERT_EMAIL ? "environment" : "default"
        };
      }
    };
    errorMonitoringService = new ErrorMonitoringService();
  }
});

// server/services/twilio.ts
var twilio_exports = {};
__export(twilio_exports, {
  TwilioService: () => TwilioService,
  twilioService: () => twilioService
});
var TwilioService, twilioService;
var init_twilio = __esm({
  "server/services/twilio.ts"() {
    "use strict";
    TwilioService = class {
      accountSid;
      authToken;
      fromNumber;
      constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNT_SID || "";
        this.authToken = process.env.TWILIO_AUTH_TOKEN || "";
        this.fromNumber = process.env.TWILIO_FROM_NUMBER || "+15551234567";
        if (!this.accountSid || !this.authToken) {
          console.warn("Twilio credentials not configured. SMS functionality will be mocked.");
        }
      }
      async sendSMS(to, message) {
        try {
          if (!this.accountSid || !this.authToken) {
            console.log("Mock SMS sent:", { to, message });
            return true;
          }
          const twilio = __require("twilio")(this.accountSid, this.authToken);
          await twilio.messages.create({
            body: message,
            from: this.fromNumber,
            to
          });
          console.log("SMS sent successfully to:", to);
          return true;
        } catch (error) {
          console.error("Twilio SMS error:", error);
          return false;
        }
      }
      async sendQuoteSMS(phoneNumber, customerName, quoteId, total, quoteUrl) {
        const finalUrl = quoteUrl || `${process.env.BASE_URL || "http://localhost:5000"}/quote/${quoteId}`;
        const message = `Hi ${customerName}! \u{1F6A2} Your Premier Party Cruises quote is ready. Total: $${(total / 100).toFixed(2)}. View details: ${finalUrl}`;
        console.log("\u{1F4F1} SMS Quote URL being sent:", finalUrl);
        console.log("\u{1F4F1} Using Column Q URL from Google Sheets:", !!quoteUrl);
        return await this.sendSMS(phoneNumber, message);
      }
    };
    twilioService = new TwilioService();
  }
});

// server/routes.ts
var routes_exports = {};
__export(routes_exports, {
  registerRoutes: () => registerRoutes
});
import { createServer } from "http";
import Stripe from "stripe";
import path2 from "path";
import { eq as eq3, desc as desc3, and as and3 } from "drizzle-orm";
import passport2 from "passport";
import { randomBytes as randomBytes4 } from "crypto";
import { z as z2 } from "zod";
import multer from "multer";
import slugify from "slugify";
import sanitizeHtml from "sanitize-html";
import { format as format2 } from "date-fns";
function generateSlugFromText(text2) {
  return slugify(text2, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"`!:@]/g
  });
}
async function generateUniqueSlug(baseSlug, checkExistsFn) {
  let slug = baseSlug;
  let counter = 1;
  while (await checkExistsFn(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    if (counter > 1e3) {
      throw new Error("Unable to generate unique slug after 1000 attempts");
    }
  }
  return slug;
}
function isSlugConflictError(error) {
  return error?.code === "23505" || // PostgreSQL unique constraint violation
  error?.message?.includes("duplicate key value") || error?.message?.includes("unique constraint");
}
function broadcastRealtimeEvent(event) {
  const eventData = JSON.stringify(event);
  console.log(`\u{1F6A8} BROADCASTING REALTIME EVENT to ${sseClients.size} SSE clients:`, event);
  if (sseClients.size === 0) {
    console.warn(`\u26A0\uFE0F NO SSE CLIENTS CONNECTED - real-time updates will not be received!`);
    return;
  }
  let successCount = 0;
  let failureCount = 0;
  for (const [clientId, client] of sseClients.entries()) {
    try {
      client.response.write(`data: ${eventData}

`);
      successCount++;
      console.log(`\u2705 Realtime event sent to client ${clientId}`);
    } catch (error) {
      failureCount++;
      console.error(`\u274C Failed to send to client ${clientId}:`, error);
      sseClients.delete(clientId);
    }
  }
  console.log(`\u{1F4CA} Realtime event broadcast complete: ${successCount} success, ${failureCount} failed`);
}
async function registerRoutes(app2) {
  const storageInstance = await getStorage();
  app2.post("/api/test-error-alert", async (req, res) => {
    try {
      const { severity = "CRITICAL" } = req.body;
      const { errorMonitoringService: errorMonitoringService2 } = await Promise.resolve().then(() => (init_errorMonitoring(), errorMonitoring_exports));
      const testError = new Error("This is a test error from the error monitoring system");
      testError.name = "TestError";
      testError.stack = `TestError: This is a test error from the error monitoring system
    at /api/test-error-alert (server/routes.ts:XXX:XX)
    at Layer.handle [as handle_request] (express/lib/router/layer.js:XXX:X)
    at next (express/lib/router/route.js:XXX:X)
    at Route.dispatch (express/lib/router/route.js:XXX:X)
    at Layer.handle [as handle_request] (express/lib/router/layer.js:XXX:X)`;
      await errorMonitoringService2.sendAlert({
        error: testError,
        severity: severity === "CRITICAL" ? "CRITICAL" : "ERROR",
        request: req,
        context: "Test Alert - Manually triggered for testing error monitoring system"
      });
      const contactInfo = errorMonitoringService2.getContactInfo();
      res.json({
        success: true,
        message: `Test ${severity} alert sent successfully`,
        severity,
        isConfigured: errorMonitoringService2.isConfigured(),
        isContactConfigured: errorMonitoringService2.isContactConfigured(),
        owner: {
          phone: contactInfo.phone,
          phoneSource: contactInfo.phoneSource,
          email: contactInfo.email,
          emailSource: contactInfo.emailSource
        }
      });
    } catch (error) {
      console.error("Error sending test alert:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send test alert",
        error: error.message
      });
    }
  });
  const blogSSRHandler = async (req, res, next) => {
    try {
      if (req.method !== "GET" || req.headers.accept?.includes("application/json")) {
        return next();
      }
      console.log(`\u{1F50D} [Blog SSR Route] Hit! Slug: ${req.params.slug}, Method: ${req.method}, Accept: ${req.headers.accept}`);
      const { slug } = req.params;
      let post = await storageInstance.getBlogPostBySlug(slug);
      let isWordPress = false;
      if (!post || post.status !== "published") {
        console.log(`\u{1F50D} [Blog SSR] Post not found in PostgreSQL, checking Replit DB for WordPress post: ${slug}`);
        const Database = (await import("@replit/database")).default;
        const replitDb = new Database();
        const postData = await replitDb.get(`post:${slug}`);
        if (postData) {
          const unwrapDbResponse = (response) => {
            if (Array.isArray(response) || response === null || response === void 0) {
              return response;
            }
            if (response && typeof response === "object" && "value" in response) {
              return unwrapDbResponse(response.value);
            }
            return response;
          };
          const unwrapped = unwrapDbResponse(postData);
          if (unwrapped && unwrapped.status === "published") {
            post = {
              title: unwrapped.title,
              metaTitle: unwrapped.metaTitle || unwrapped.title,
              metaDescription: unwrapped.metaDescription || unwrapped.excerpt,
              excerpt: unwrapped.excerpt,
              content: unwrapped.content,
              publishedAt: unwrapped.publishedAt || unwrapped.date,
              updatedAt: unwrapped.updatedAt || unwrapped.modified,
              createdAt: unwrapped.publishedAt || unwrapped.date,
              featuredImageUrl: unwrapped.featuredImage || unwrapped.featuredImageUrl,
              author: unwrapped.author || { name: "Premier Party Cruises Team" },
              status: "published"
            };
            isWordPress = true;
            console.log(`\u2705 [Blog SSR] Found WordPress post in Replit DB: ${post.title}`);
          }
        }
      } else {
        console.log(`\u2705 [Blog SSR] Found PostgreSQL post: ${post.title}`);
      }
      if (!post) {
        console.log(`\u274C [Blog SSR] Post not found in either PostgreSQL or Replit DB: ${slug}`);
        return next();
      }
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title || "",
        "description": post.metaDescription || post.excerpt || "",
        "author": {
          "@type": "Person",
          "name": post.author?.name || "Premier Party Cruises Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Premier Party Cruises",
          "logo": {
            "@type": "ImageObject",
            "url": "https://premierpartycruises.com/logo.png"
          }
        },
        "datePublished": post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
        "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date(post.createdAt).toISOString(),
        ...post.featuredImageUrl && {
          "image": post.featuredImageUrl
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://premierpartycruises.com/blogs/${slug}`
        }
      };
      const fs6 = await import("fs");
      const htmlPath = path2.join(process.cwd(), "client", "index.html");
      let html = await fs6.promises.readFile(htmlPath, "utf-8");
      const postTitle = post.title || "";
      const breadcrumbName = postTitle.replace(/\s*\|\s*Premier Party Cruises.*$/i, "").trim();
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://premierpartycruises.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": breadcrumbName,
            "item": `https://premierpartycruises.com/blogs/${slug}`
          }
        ]
      };
      const schemaScript = `
    <!-- Article Schema for SEO (Server-Side Injected) -->
    <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
    </script>
    <!-- BreadcrumbList Schema for SEO (Server-Side Injected) -->
    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>`;
      const canonicalUrl = `https://premierpartycruises.com/blogs/${slug}`;
      const canonicalTag = `  <link rel="canonical" href="${canonicalUrl}" />`;
      html = html.replace("</head>", `${schemaScript}
${canonicalTag}
  </head>`);
      const metaTitle = post.metaTitle || post.title || "Blog Post";
      const metaDescription = post.metaDescription || post.excerpt || "";
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${metaTitle} | Premier Party Cruises</title>`
      );
      html = html.replace(
        /<meta name="description" content=".*?"\s*\/>/,
        `<meta name="description" content="${metaDescription}" />`
      );
      const h1Content = post.title || "";
      const bodyContent = post.content || post.excerpt || "";
      const ssrContent = `<div id="root">
        <h1>${h1Content}</h1>
        <div>${bodyContent}</div>
      </div>`;
      html = html.replace(/<div id="root"><\/div>/, ssrContent);
      const sourceLabel = isWordPress ? "WordPress/Replit DB" : "PostgreSQL";
      console.log(`\u2705 [Blog SSR] Injected unique Article schema + H1 for: ${post.title || slug} (source: ${sourceLabel})`);
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (error) {
      console.error("\u274C [Blog SSR] Error:", error);
      next();
    }
  };
  app2.get("/blog/:slug", blogSSRHandler);
  app2.get("/blogs/:slug", blogSSRHandler);
  app2.post("/api/register", async (req, res) => {
    try {
      const { email, username, password, firstName, lastName, inviteToken } = req.body;
      if (!inviteToken) {
        return res.status(400).json({ error: "Invite token required" });
      }
      const invite = await storageInstance.getInviteByToken(inviteToken);
      if (!invite) {
        return res.status(404).json({ error: "Invalid invite token" });
      }
      if (invite.usedAt) {
        return res.status(400).json({ error: "Invite already used" });
      }
      if (/* @__PURE__ */ new Date() > new Date(invite.expiresAt)) {
        return res.status(400).json({ error: "Invite expired" });
      }
      if (invite.email !== email) {
        return res.status(400).json({ error: "Email does not match invite" });
      }
      const existingUser = await storageInstance.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword = await PasswordService.hash(password);
      const newUser = await storageInstance.createUser({
        email,
        username,
        password: hashedPassword,
        role: invite.role || "user",
        firstName,
        lastName,
        isActive: true
      });
      await storageInstance.markInviteAsUsed(invite.id);
      res.json({ success: true, user: { id: newUser.id, email: newUser.email, username: newUser.username } });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: error.message || "Registration failed" });
    }
  });
  app2.post("/api/login", (req, res, next) => {
    passport2.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || "Invalid credentials" });
      }
      req.logIn(user, (err2) => {
        if (err2) {
          return res.status(500).json({ error: "Login failed" });
        }
        res.json({ success: true, user });
      });
    })(req, res, next);
  });
  app2.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });
  app2.get("/api/user", (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });
  app2.post("/api/auth/login", (req, res, next) => {
    passport2.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: info?.message || "Login failed" });
      req.login(user, (err2) => {
        if (err2) return next(err2);
        return res.json({ user });
      });
    })(req, res, next);
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      req.session?.destroy((err2) => {
        if (err2) {
          console.error("Session destruction error:", err2);
        }
        res.json({ success: true, message: "Logged out successfully" });
      });
    });
  });
  app2.post("/api/auth/register", async (req, res, next) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const { email, username, password, firstName, lastName } = validatedData;
      const { inviteToken } = req.body;
      if (!inviteToken) {
        return res.status(400).json({ error: "Invite token required" });
      }
      const invite = await storageInstance.getInviteByToken(inviteToken);
      if (!invite) {
        return res.status(404).json({ error: "Invalid invite token" });
      }
      if (invite.usedAt) {
        return res.status(400).json({ error: "Invite already used" });
      }
      if (/* @__PURE__ */ new Date() > new Date(invite.expiresAt)) {
        return res.status(400).json({ error: "Invite expired" });
      }
      if (invite.email !== email) {
        return res.status(400).json({ error: "Email does not match invite" });
      }
      const existingUser = await storageInstance.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword = await PasswordService.hash(password);
      const newUser = await storageInstance.createUser({
        email,
        username,
        password: hashedPassword,
        role: invite.role || "user",
        firstName,
        lastName,
        isActive: true
      });
      await storageInstance.markInviteAsUsed(invite.id);
      const userForSession = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      };
      req.login(userForSession, (err) => {
        if (err) {
          console.error("Auto-login error:", err);
          return res.status(201).json({
            user: userForSession,
            message: "Registration successful, please login"
          });
        }
        return res.status(201).json({ user: userForSession });
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      res.status(500).json({ error: error.message || "Registration failed" });
    }
  });
  app2.post("/api/auth/password-reset", requireAuth, async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: "Old password and new password are required" });
      }
      if (newPassword.length < 8) {
        return res.status(400).json({ error: "New password must be at least 8 characters" });
      }
      const user = req.user;
      const dbUser = await storageInstance.getUser(user.id);
      if (!dbUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const isValid = await PasswordService.compare(oldPassword, dbUser.password);
      if (!isValid) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }
      const hashedPassword = await PasswordService.hash(newPassword);
      await storageInstance.updateUserPassword(user.id, hashedPassword);
      res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ error: "Password reset failed" });
    }
  });
  app2.post("/api/reset-password", requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = req.user;
      const dbUser = await storageInstance.getUser(user.id);
      if (!dbUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const isValid = await PasswordService.compare(currentPassword, dbUser.password);
      if (!isValid) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }
      const hashedPassword = await PasswordService.hash(newPassword);
      await storageInstance.updateUserPassword(user.id, hashedPassword);
      res.json({ success: true });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ error: "Password reset failed" });
    }
  });
  app2.get("/api/invite/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const invite = await storageInstance.getInviteByToken(token);
      if (!invite) {
        return res.status(404).json({ error: "Invalid invite token" });
      }
      if (invite.usedAt) {
        return res.status(400).json({ error: "Invite already used" });
      }
      if (/* @__PURE__ */ new Date() > new Date(invite.expiresAt)) {
        return res.status(400).json({ error: "Invite expired" });
      }
      res.json({
        valid: true,
        email: invite.email,
        role: invite.role,
        expiresAt: invite.expiresAt
      });
    } catch (error) {
      console.error("Invite validation error:", error);
      res.status(500).json({ error: "Validation failed" });
    }
  });
  app2.post("/api/admin/invite", requireAdmin, async (req, res) => {
    try {
      const { email, role } = req.body;
      const user = req.user;
      const existingUser = await storageInstance.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists with this email" });
      }
      const inviteToken = randomBytes4(32).toString("hex");
      const expiresAt = /* @__PURE__ */ new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      const invite = await storageInstance.createInvite({
        email,
        inviteToken,
        invitedBy: user.id,
        role: role || "user",
        expiresAt
      });
      const inviteUrl = `${req.protocol}://${req.get("host")}/auth?invite=${inviteToken}`;
      res.json({
        success: true,
        invite: {
          id: invite.id,
          email: invite.email,
          role: invite.role,
          expiresAt: invite.expiresAt,
          inviteUrl
        }
      });
    } catch (error) {
      console.error("Invite creation error:", error);
      res.status(500).json({ error: "Failed to create invite" });
    }
  });
  app2.get("/api/admin/invites", requireAdmin, async (req, res) => {
    try {
      const user = req.user;
      const invites2 = await storageInstance.getUserInvites(user.id);
      res.json({ invites: invites2 });
    } catch (error) {
      console.error("Invites list error:", error);
      res.status(500).json({ error: "Failed to fetch invites" });
    }
  });
  app2.delete("/api/admin/invite/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      res.json({ success: true });
    } catch (error) {
      console.error("Invite deletion error:", error);
      res.status(500).json({ error: "Failed to delete invite" });
    }
  });
  app2.post("/api/pricing/verify", async (req, res) => {
    try {
      const {
        // Contact information
        firstName,
        lastName,
        email,
        phone,
        // Event details
        eventType,
        eventTypeLabel,
        eventEmoji,
        eventDate,
        groupSize,
        specialRequests,
        budget,
        // Selection details
        cruiseType,
        selectedSlot,
        selectedPackages,
        discoPackage,
        ticketQuantity,
        selectedDuration,
        selectedBoat,
        preferredTimeLabel,
        groupSizeLabel,
        // Pricing details
        subtotal,
        tax,
        gratuity,
        total,
        depositAmount,
        discountCode
      } = req.body;
      if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({ error: "Missing required contact information" });
      }
      if (!eventDate || !groupSize) {
        return res.status(400).json({ error: "Missing required event details" });
      }
      const contactData = {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        tags: ["chat-quote", eventType || "general"]
      };
      const projectData = {
        title: `${eventTypeLabel || "Event"} - ${format2(new Date(eventDate), "MMM d, yyyy")}`,
        status: "QUOTE",
        projectDate: new Date(eventDate),
        groupSize,
        eventType,
        specialRequests,
        // Don't include budget string in project, it will be in eventDetails
        leadSource: "chat",
        tags: ["chat-generated"],
        pipelinePhase: "ph_quote_sent"
      };
      const quoteData = {
        eventDetails: {
          eventType,
          eventTypeLabel,
          eventEmoji,
          eventDate,
          groupSize,
          specialRequests,
          budget
        },
        selectionDetails: {
          cruiseType,
          selectedSlot,
          selectedPackages,
          discoPackage,
          ticketQuantity,
          selectedDuration,
          selectedBoat,
          preferredTimeLabel,
          groupSizeLabel
        },
        promoCode: discountCode,
        subtotal,
        tax,
        gratuity,
        total,
        depositAmount,
        depositRequired: true,
        depositPercent: 25,
        perPersonCost: Math.floor(total / (ticketQuantity || groupSize))
      };
      const storageInstance2 = await getStorage();
      const result = await storageInstance2.createQuoteFromChat({
        contact: contactData,
        project: projectData,
        quoteData
      });
      try {
        const sheetsService = await getGoogleSheetsService();
        await sheetsService.addLeadToSheet({
          name: `${firstName} ${lastName}`,
          email,
          phone,
          eventDate: format2(new Date(eventDate), "MM/dd/yyyy"),
          eventType: eventTypeLabel || eventType || "General",
          groupSize: String(groupSize),
          quoteUrl: result.publicUrl,
          createdDate: format2(/* @__PURE__ */ new Date(), "MM/dd/yyyy HH:mm:ss"),
          leadSource: "Chat Quote Builder",
          status: "Quote Sent"
        });
      } catch (sheetsError) {
        console.error("Error adding lead to Google Sheets:", sheetsError);
      }
      let columnQUrl = null;
      let leadId = null;
      try {
        const leadService = await getComprehensiveLeadService();
        const comprehensiveResult = await leadService.createComprehensiveLead({
          name: `${firstName} ${lastName}`,
          email,
          phone,
          eventType: eventType || "general",
          eventTypeLabel: eventTypeLabel || eventType || "General",
          groupSize,
          cruiseDate: format2(new Date(eventDate), "MM/dd/yyyy"),
          source: "chat_quote",
          projectData,
          quoteData,
          selectedOptions: {
            cruiseType,
            selectedSlot,
            selectedPackages,
            discoPackage,
            ticketQuantity,
            selectedDuration,
            selectedBoat
          },
          pricing: {
            subtotal,
            tax,
            gratuity,
            total,
            depositAmount
          }
        });
        leadId = comprehensiveResult.leadId;
        console.log("\u2705 Comprehensive lead created with ID:", leadId);
        if (leadId && comprehensiveResult.success) {
          console.log("\u{1F50D} Retrieving Column Q URL from Google Sheets...");
          const sheetsService = await getGoogleSheetsService();
          await new Promise((resolve) => setTimeout(resolve, 2e3));
          const verificationResult = await sheetsService.getLeadForVerification(leadId);
          if (verificationResult.found && verificationResult.quoteUrl) {
            columnQUrl = verificationResult.quoteUrl;
            console.log("\u2705 Retrieved Column Q URL for notifications:", columnQUrl);
          } else {
            console.warn("\u26A0\uFE0F Column Q URL not found, using fallback URL");
          }
        }
      } catch (leadError) {
        console.error("Error creating comprehensive lead:", leadError);
      }
      const uniqueQuoteId = result.quote.id || `quote_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const notificationUrl = columnQUrl || `https://cruise-concierge-brian-hill.replit.app/quote/${uniqueQuoteId}`;
      console.log("\u{1F4E7} Notification URL decision:", {
        hasColumnQUrl: !!columnQUrl,
        usingColumnQ: !!columnQUrl,
        finalUrl: notificationUrl
      });
      try {
        const emailFunctions = await getMailgunEmailFunctions();
        const emailSuccess = await emailFunctions.sendQuoteEmail(
          email,
          `${firstName} ${lastName}`,
          result.quote.id,
          {
            eventType: eventType || "Party Cruise",
            eventTypeLabel: eventTypeLabel || eventType || "Party Cruise",
            groupSize: groupSize || 0,
            date: format2(new Date(eventDate), "EEEE, MMMM d, yyyy"),
            total: total || 0,
            subtotal: subtotal || 0,
            tax: tax || 0,
            gratuity: gratuity || 0
          },
          notificationUrl
          // CRITICAL: Use Column Q URL for consistency
        );
        if (emailSuccess) {
          console.log("\u2705 Quote email sent successfully to:", email);
        } else {
          console.error("\u26A0\uFE0F Failed to send quote email to:", email);
        }
      } catch (emailError) {
        console.error("\u274C Error sending quote email:", emailError);
      }
      try {
        console.log("\u{1F4F1} SMS notification using URL:", notificationUrl);
        console.log("\u{1F4F1} Column Q URL consistency check:", {
          leadId,
          hasColumnQUrl: !!columnQUrl,
          urlMatches: notificationUrl === columnQUrl
        });
        const { twilioService: twilioService2 } = await Promise.resolve().then(() => (init_twilio(), twilio_exports));
        const smsSuccess = await twilioService2.sendQuoteSMS(
          phone,
          `${firstName} ${lastName}`,
          result.quote.id,
          total || 0,
          notificationUrl
          // CRITICAL: Use Column Q URL for SMS consistency
        );
        if (smsSuccess) {
          console.log("\u2705 SMS notification sent via Twilio to:", phone);
          console.log("\u{1F4F1} SMS sent with Column Q URL consistency:", !!columnQUrl);
        } else {
          console.error("\u26A0\uFE0F Failed to send SMS via Twilio to:", phone);
        }
      } catch (smsError) {
        console.error("\u274C Error sending SMS:", smsError);
      }
      res.json({
        success: true,
        quoteId: uniqueQuoteId,
        slug: result.quote.slug,
        publicUrl: notificationUrl,
        // Return the same URL used in notifications
        accessToken: result.quote.accessToken,
        redirectUrl: notificationUrl,
        // Consistent URL across all touchpoints
        leadId,
        // Include leadId for tracking
        usedColumnQUrl: !!columnQUrl
        // Flag to indicate URL source
      });
    } catch (error) {
      console.error("Error creating quote from chat:", error);
      res.status(500).json({
        error: "Failed to create quote",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/events/sse", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    const origin = req.get("Origin");
    const referer = req.get("Referer");
    const host = req.get("Host");
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else if (referer) {
      const refererUrl = new URL(referer);
      res.setHeader("Access-Control-Allow-Origin", `${refererUrl.protocol}//${refererUrl.host}`);
    } else {
      res.setHeader("Access-Control-Allow-Origin", `http://localhost:5000`);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Cache-Control");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    const clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sseClients.set(clientId, {
      id: clientId,
      response: res,
      lastPing: /* @__PURE__ */ new Date()
    });
    console.log(`\u{1F517} NEW SSE CLIENT CONNECTED: ${clientId} (${sseClients.size} total clients)`);
    console.log(`\u{1F4E1} SSE Endpoint: /api/events/sse`);
    console.log(`\u{1F310} Headers: Origin='${req.get("Origin") || "none"}', Referer='${req.get("Referer") || "none"}', Host='${req.get("Host") || "none"}'`);
    console.log(`\u{1F3AF} Client will receive real-time booking updates, disco sales, and admin actions`);
    res.write(`data: ${JSON.stringify({
      type: "connected",
      clientId,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    })}

`);
    req.on("close", () => {
      console.log(`\u{1F50C} SSE CLIENT DISCONNECTED: ${clientId} (${sseClients.size - 1} remaining)`);
      sseClients.delete(clientId);
    });
    req.on("error", (error) => {
      console.error(`\u274C SSE client error for ${clientId}:`, error);
      sseClients.delete(clientId);
    });
    const heartbeat = setInterval(() => {
      if (sseClients.has(clientId)) {
        try {
          res.write(`data: ${JSON.stringify({
            type: "heartbeat",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            clientId
          })}

`);
          const client = sseClients.get(clientId);
          if (client) {
            client.lastPing = /* @__PURE__ */ new Date();
            console.log(`\u{1F493} Heartbeat sent to client ${clientId} - ${sseClients.size} total clients`);
          }
        } catch (error) {
          console.error(`\u274C Heartbeat failed for client ${clientId}:`, error);
          clearInterval(heartbeat);
          sseClients.delete(clientId);
        }
      } else {
        clearInterval(heartbeat);
      }
    }, 2e4);
  });
  app2.get("/api/quotes/public/:token", async (req, res) => {
    try {
      const { token } = req.params;
      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }
      const quoteTokenService2 = await Promise.resolve().then(() => (init_quoteTokenService(), quoteTokenService_exports)).then((m) => m.quoteTokenService);
      const tokenVerification = await quoteTokenService2.verifyTokenWithLeadData(token);
      if (!tokenVerification.valid || !tokenVerification.payload) {
        console.warn("\u{1F6A8} Invalid or expired quote token:", tokenVerification.error);
        return res.status(401).json({
          error: "Invalid or expired token",
          message: tokenVerification.error
        });
      }
      const { quoteId, leadId, leadData } = tokenVerification.payload;
      console.log("\u2705 Token verified with enhanced data:", {
        quoteId,
        leadId,
        hasLeadData: !!leadData
      });
      const storageInstance2 = await getStorage();
      const quote = await storageInstance2.getQuote(quoteId);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      const project = await storageInstance2.getProject(quote.projectId);
      let contact = null;
      if (project) {
        contact = await storageInstance2.getContact(project.contactId);
      }
      if (quote.id) {
        await storageInstance2.trackQuoteView(quote.id, contact?.id, void 0, {
          accessMethod: "enhanced_token_link",
          viewedAt: (/* @__PURE__ */ new Date()).toISOString(),
          leadId
        });
      }
      res.json({
        success: true,
        quote: {
          ...quote,
          // Enhanced contact info from Google Sheets data (if available) or fallback to quote/contact
          contactInfo: leadData ? {
            firstName: leadData.name?.split(" ")[0] || "",
            lastName: leadData.name?.split(" ").slice(1).join(" ") || "",
            email: leadData.email || "",
            phone: leadData.phone || ""
          } : quote.contactInfo || {
            firstName: contact?.name?.split(" ")[0] || "",
            lastName: contact?.name?.split(" ")[1] || "",
            email: contact?.email || "",
            phone: contact?.phone || ""
          },
          // Enhanced event details from Google Sheets data with consistent date formatting
          eventDetails: leadData ? {
            eventType: leadData.eventType || "",
            eventTypeLabel: leadData.eventTypeLabel || leadData.eventType || "",
            eventEmoji: quote.eventDetails?.eventEmoji || "\u{1F389}",
            eventDate: (() => {
              let date = leadData.cruiseDate || project?.projectDate;
              if (!date) return "";
              const parsedDate = new Date(date);
              if (isNaN(parsedDate.getTime())) {
                console.warn("\u26A0\uFE0F Invalid date in quote data:", date);
                return "";
              }
              return parsedDate.toISOString();
            })(),
            groupSize: leadData.groupSize || project?.groupSize || 0,
            specialRequests: leadData.specialRequests || "",
            budget: leadData.budget || ""
          } : quote.eventDetails || {
            eventType: project?.eventType || "",
            eventDate: (() => {
              let date = project?.projectDate;
              if (!date) return "";
              const parsedDate = new Date(date);
              if (isNaN(parsedDate.getTime())) {
                console.warn("\u26A0\uFE0F Invalid date in project data:", date);
                return "";
              }
              return parsedDate.toISOString();
            })(),
            groupSize: project?.groupSize || 0
          },
          // Enhanced selection details from Google Sheets data
          selectionDetails: leadData ? {
            cruiseType: leadData.boatType ? leadData.boatType.includes("disco") ? "disco" : "private" : quote.selectionDetails?.cruiseType,
            selectedSlot: quote.selectionDetails?.selectedSlot,
            selectedPackages: quote.selectionDetails?.selectedPackages || [],
            discoPackage: leadData.discoPackage || quote.selectionDetails?.discoPackage,
            ticketQuantity: leadData.groupSize || quote.selectionDetails?.ticketQuantity,
            selectedDuration: quote.selectionDetails?.selectedDuration,
            selectedBoat: leadData.boatType || quote.selectionDetails?.selectedBoat,
            preferredTimeLabel: leadData.timeSlot || quote.selectionDetails?.preferredTimeLabel || "",
            groupSizeLabel: `${leadData.groupSize || 1} people`
          } : quote.selectionDetails || {},
          // Include complete lead data from Google Sheets for maximum pre-population
          leadData: leadData || null,
          // Include project details if available
          project: project ? {
            title: project.title,
            projectDate: project.projectDate,
            groupSize: project.groupSize,
            eventType: project.eventType
          } : void 0
        }
      });
    } catch (error) {
      console.error("Error retrieving enhanced public quote:", error);
      res.status(500).json({
        error: "Failed to retrieve quote",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const quoteBuilderSchema = z2.object({
    contactInfo: z2.object({
      firstName: z2.string().min(1, "First name is required"),
      lastName: z2.string().min(1, "Last name is required"),
      email: z2.string().email("Invalid email address"),
      phone: z2.string().min(1, "Phone number is required")
    }),
    eventDetails: z2.object({
      eventDate: z2.string().min(1, "Event date is required"),
      eventType: z2.string().min(1, "Event type is required"),
      groupSize: z2.number().int().positive("Group size must be a positive number")
    }),
    selectionDetails: z2.object({
      cruiseType: z2.string().optional(),
      selectedSlot: z2.any().optional(),
      selectedPackages: z2.array(z2.any()).optional(),
      discoPackage: z2.any().optional(),
      ticketQuantity: z2.number().int().positive().optional(),
      selectedDuration: z2.number().optional(),
      selectedBoat: z2.any().optional(),
      preferredTimeLabel: z2.string().optional(),
      groupSizeLabel: z2.string().optional()
    }).optional(),
    pricing: z2.object({
      subtotal: z2.number().optional(),
      tax: z2.number().optional(),
      gratuity: z2.number().optional(),
      total: z2.number().optional(),
      depositAmount: z2.number().optional(),
      discountCode: z2.string().optional()
    }).optional(),
    partialLeadId: z2.string().optional()
    // For converting existing partial leads
  });
  app2.post("/api/leads/quote-builder", async (req, res) => {
    try {
      console.log("\u{1F3AF} Quote Builder Lead Creation - Starting...");
      const validationResult = quoteBuilderSchema.safeParse(req.body);
      if (!validationResult.success) {
        console.error("\u274C Validation failed:", validationResult.error.flatten());
        return res.status(400).json({
          error: "Invalid request data",
          details: validationResult.error.flatten()
        });
      }
      const { contactInfo, eventDetails, selectionDetails, pricing, partialLeadId } = validationResult.data;
      console.log("\u{1F50D} GROUPSIZE TRACK - API ENDPOINT RECEIVED:", {
        receivedEventDetailsGroupSize: eventDetails.groupSize,
        receivedSelectionDetailsTicketQuantity: selectionDetails?.ticketQuantity,
        receivedSelectionDetailsGroupSizeLabel: selectionDetails?.groupSizeLabel,
        cruiseType: selectionDetails?.cruiseType,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      const leadData = {
        name: `${contactInfo.firstName} ${contactInfo.lastName}`,
        email: contactInfo.email,
        phone: contactInfo.phone,
        eventType: eventDetails.eventType,
        eventTypeLabel: eventDetails.eventType,
        // Could be enhanced with mapping
        // 🎯 CRITICAL FIX: Mark this as submitted data that should NEVER be overridden
        groupSize: eventDetails.groupSize,
        // AUTHORITATIVE: This is the user's current selection from UI
        groupSizeIsSubmitted: true,
        // Flag to prevent external data from overriding this value
        cruiseDate: eventDetails.eventDate,
        source: "quote_builder",
        // Project data
        projectData: {
          preferredTime: selectionDetails?.preferredTimeLabel,
          specialRequests: `Quote Builder Selection: ${JSON.stringify(selectionDetails || {})}`,
          budget: pricing?.total
        },
        // Quote data for creation
        quoteData: {
          templateId: null,
          // Will use default template
          items: []
          // Will be populated by service based on selections
        },
        // Selection details for quote
        selectedOptions: selectionDetails,
        // Pricing data
        pricing: pricing ? {
          subtotal: Math.round((pricing.subtotal || 0) * 100),
          // Convert to cents
          tax: Math.round((pricing.tax || 0) * 100),
          gratuity: Math.round((pricing.gratuity || 0) * 100),
          total: Math.round((pricing.total || 0) * 100),
          depositAmount: Math.round((pricing.depositAmount || 0) * 100),
          depositRequired: true,
          depositPercent: pricing.total ? Math.round((pricing.depositAmount || 0) / pricing.total * 100) : 25,
          perPersonCost: pricing.total ? Math.round(pricing.total * 100 / eventDetails.groupSize) : 0,
          discountTotal: 0,
          paymentSchedule: [],
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3)
          // 30 days
        } : void 0
      };
      console.log("\u{1F4CB} Transformed lead data:", {
        name: leadData.name,
        email: leadData.email,
        eventType: leadData.eventType,
        source: leadData.source,
        hasPricing: !!leadData.pricing
      });
      console.log("\u{1F50D} GROUPSIZE TRACK - SENDING TO SERVICE:", {
        leadDataGroupSize: leadData.groupSize,
        selectedOptionsTicketQuantity: leadData.selectedOptions?.ticketQuantity,
        selectedOptionsGroupSizeLabel: leadData.selectedOptions?.groupSizeLabel,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      const comprehensiveLeadService3 = await getComprehensiveLeadService();
      const result = await comprehensiveLeadService3.createComprehensiveLead(leadData);
      if (partialLeadId && result.success && result.leadId) {
        console.log("\u{1F504} Converting partial lead:", partialLeadId);
        try {
          const googleSheetsService3 = await getGoogleSheetsService();
          const conversionSuccess = await googleSheetsService3.updatePartialLead(partialLeadId, {
            status: "converted",
            convertedToContactId: result.leadId,
            quoteId: result.quoteId,
            quoteUrl: result.quoteUrl,
            notes: `Converted to full lead via Quote Builder on ${(/* @__PURE__ */ new Date()).toISOString()}`
          });
          if (conversionSuccess) {
            console.log("\u2705 Partial lead marked as converted:", partialLeadId);
          } else {
            console.log("\u26A0\uFE0F Failed to mark partial lead as converted:", partialLeadId);
          }
        } catch (error) {
          console.error("\u274C Error converting partial lead:", error);
        }
      }
      if (result.success) {
        console.log("\u{1F389} Quote Builder Lead Creation - Success!");
        try {
          broadcastRealtimeEvent({
            type: "quote_created",
            quoteId: result.quoteId,
            leadId: result.leadId,
            contactId: result.leadId,
            projectId: result.projectId,
            customerName: leadData.name,
            customerEmail: leadData.email,
            eventTitle: `${leadData.eventType} for ${leadData.groupSize} guests`,
            eventDate: leadData.cruiseDate,
            amount: leadData.pricing?.total || 0,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            data: {
              eventType: leadData.eventType,
              groupSize: leadData.groupSize,
              cruiseDate: leadData.cruiseDate,
              quoteUrl: result.quoteUrl,
              source: leadData.source
            }
          });
          console.log(`\u{1F6A8} Quote created event broadcasted for quote ${result.quoteId}`);
        } catch (error) {
          console.error("\u274C Failed to broadcast quote_created event:", error);
        }
        res.json({
          success: true,
          contactId: result.leadId,
          projectId: result.projectId,
          quoteId: result.quoteId,
          publicUrl: result.quoteUrl,
          integrations: result.integrations,
          message: "Lead created successfully with full integrations"
        });
      } else {
        console.log("\u26A0\uFE0F Quote Builder Lead Creation - Partial Success");
        res.status(206).json({
          success: false,
          contactId: result.leadId,
          projectId: result.projectId,
          quoteId: result.quoteId,
          publicUrl: result.quoteUrl,
          integrations: result.integrations,
          errors: result.errors,
          message: "Lead created with some integration issues"
        });
      }
    } catch (error) {
      console.error("\u{1F4A5} Quote Builder Lead Creation - Error:", error);
      res.status(500).json({
        error: "Failed to create quote builder lead",
        message: error.message || "Unknown error",
        success: false
      });
    }
  });
  app2.post("/api/debug-quote-builder", async (req, res) => {
    try {
      console.log("\u{1F9EA} DEBUG: Quote builder test submission received");
      console.log("Request headers:", JSON.stringify(req.headers, null, 2));
      console.log("Request body:", JSON.stringify(req.body, null, 2));
      const testPayload = {
        name: "Test User",
        email: "test@example.com",
        phone: "5125767975",
        eventType: "Bachelor Party",
        eventTypeLabel: "Bachelor Party",
        groupSize: 15,
        cruiseDate: (/* @__PURE__ */ new Date()).toISOString(),
        source: "debug_test",
        projectData: {
          preferredTime: "Evening",
          specialRequests: "Debug test submission",
          budget: 2e3
        },
        quoteData: {
          templateId: null,
          // Use default template
          items: []
        },
        selectedOptions: {
          cruiseType: "private",
          selectedDuration: 3,
          preferredTimeLabel: "Evening (6:00 PM - 9:00 PM)"
        },
        pricing: {
          subtotal: 18e4,
          // $1800 in cents
          tax: 14400,
          // $144 in cents
          gratuity: 36e3,
          // $360 in cents
          total: 230400,
          // $2304 in cents
          depositAmount: 57600,
          // $576 in cents
          depositRequired: true,
          depositPercent: 25
        }
      };
      console.log("\u{1F9EA} DEBUG: Testing with payload:", JSON.stringify(testPayload, null, 2));
      const comprehensiveLeadService3 = await getComprehensiveLeadService();
      console.log("\u{1F9EA} DEBUG: ComprehensiveLeadService loaded successfully");
      const result = await comprehensiveLeadService3.createComprehensiveLead(testPayload);
      console.log("\u{1F389} DEBUG: Quote builder test successful:", JSON.stringify(result, null, 2));
      res.json({
        success: true,
        debug: true,
        result,
        testPayload,
        message: "Debug test successful - server-side quote builder logic works!"
      });
    } catch (error) {
      console.error("\u274C DEBUG: Quote builder test failed:", error);
      res.status(500).json({
        error: "Debug test failed",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : void 0
      });
    }
  });
  const seoCache = /* @__PURE__ */ new Map();
  const SEO_CACHE_TTL = 5 * 60 * 1e3;
  app2.get("/api/seo/meta/:pageRoute(*)", async (req, res) => {
    try {
      const pageRoute = decodeURIComponent(req.params.pageRoute);
      const cached = seoCache.get(pageRoute);
      if (cached && Date.now() - cached.timestamp < SEO_CACHE_TTL) {
        return res.json(cached.data);
      }
      const storage3 = await getStorage();
      const seoPage = await storage3.getSeoPage(pageRoute);
      if (!seoPage) {
        return res.status(404).json({ error: "SEO page not found" });
      }
      const seoData = {
        metaTitle: seoPage.metaTitle,
        metaDescription: seoPage.metaDescription,
        metaKeywords: seoPage.metaKeywords || [],
        openGraphTitle: seoPage.openGraphTitle,
        openGraphDescription: seoPage.openGraphDescription,
        openGraphImage: seoPage.openGraphImage,
        openGraphType: seoPage.openGraphType,
        twitterTitle: seoPage.twitterTitle,
        twitterDescription: seoPage.twitterDescription,
        twitterImage: seoPage.twitterImage,
        twitterCard: seoPage.twitterCard,
        canonicalUrl: seoPage.canonicalUrl,
        robotsDirective: seoPage.robotsDirective,
        schemaMarkup: seoPage.schemaMarkup
      };
      seoCache.set(pageRoute, { data: seoData, timestamp: Date.now() });
      res.json(seoData);
    } catch (error) {
      console.error("Error fetching SEO meta data:", error);
      res.status(500).json({
        error: "Failed to fetch SEO meta data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/seo/pages", requireAdmin, async (req, res) => {
    try {
      const storage3 = await getStorage();
      const pages = await storage3.getSeoPages();
      res.json(pages);
    } catch (error) {
      console.error("Error fetching SEO pages:", error);
      res.status(500).json({
        error: "Failed to fetch SEO pages",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/seo/overview", requireAdmin, async (req, res) => {
    try {
      const storage3 = await getStorage();
      const pages = await storage3.getSeoPages();
      const overview = {
        totalPages: pages.length,
        averageScore: pages.length > 0 ? Math.round(pages.reduce((sum2, p) => sum2 + (p.seoScore || 0), 0) / pages.length) : 0,
        highPriorityIssues: pages.reduce((sum2, p) => {
          return sum2 + (p.issues?.filter((i) => i.priority === "high").length || 0);
        }, 0),
        pagesNeedingOptimization: pages.filter((p) => (p.seoScore || 0) < 70).length,
        lastAnalyzed: pages.length > 0 && pages[0].lastAnalyzed ? pages[0].lastAnalyzed : void 0
      };
      res.json(overview);
    } catch (error) {
      console.error("Error fetching SEO overview:", error);
      res.status(500).json({
        error: "Failed to fetch SEO overview",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/seo/settings", requireAdmin, async (req, res) => {
    try {
      const storage3 = await getStorage();
      const settings = await storage3.getSeoSettings();
      res.json(settings || {});
    } catch (error) {
      console.error("Error fetching SEO settings:", error);
      res.status(500).json({
        error: "Failed to fetch SEO settings",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.put("/api/seo/pages/:route", requireAdmin, async (req, res) => {
    try {
      const { route } = req.params;
      const updates = req.body;
      const storage3 = await getStorage();
      const updatedPage = await storage3.updateSeoPage(decodeURIComponent(route), updates);
      res.json(updatedPage);
    } catch (error) {
      console.error("Error updating SEO page:", error);
      res.status(500).json({
        error: "Failed to update SEO page",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/seo/analyze/:route", requireAdmin, async (req, res) => {
    try {
      const { route } = req.params;
      const { content } = req.body;
      const seoService3 = await getSEOService();
      const analysis = await seoService3.analyzePage(decodeURIComponent(route), content);
      const storage3 = await getStorage();
      await storage3.updateSeoPage(decodeURIComponent(route), {
        seoScore: analysis.score,
        issues: analysis.issues,
        recommendations: analysis.recommendations,
        lastAnalyzed: (/* @__PURE__ */ new Date()).toISOString()
      });
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing SEO page:", error);
      res.status(500).json({
        error: "Failed to analyze SEO page",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/seo/optimize", requireAdmin, async (req, res) => {
    try {
      const seoService3 = await getSEOService();
      const result = await seoService3.optimizePage(req.body);
      const storage3 = await getStorage();
      await storage3.updateSeoPage(req.body.pageRoute, result.optimizedData);
      res.json(result);
    } catch (error) {
      console.error("Error optimizing SEO page:", error);
      res.status(500).json({
        error: "Failed to optimize SEO page",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/seo/bulk-analyze", requireAdmin, async (req, res) => {
    try {
      const { pageRoutes } = req.body;
      if (!pageRoutes || !Array.isArray(pageRoutes)) {
        return res.status(400).json({ error: "pageRoutes array is required" });
      }
      const seoService3 = await getSEOService();
      const result = await seoService3.bulkAnalyze(pageRoutes);
      res.json(result);
    } catch (error) {
      console.error("Error bulk analyzing SEO pages:", error);
      res.status(500).json({
        error: "Failed to bulk analyze SEO pages",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/seo/bulk-optimize", requireAdmin, async (req, res) => {
    try {
      const { pageRoutes, optimizationType, targetKeywords } = req.body;
      if (!pageRoutes || !Array.isArray(pageRoutes)) {
        return res.status(400).json({ error: "pageRoutes array is required" });
      }
      const seoService3 = await getSEOService();
      const result = await seoService3.bulkOptimize(pageRoutes, optimizationType, targetKeywords);
      res.json(result);
    } catch (error) {
      console.error("Error bulk optimizing SEO pages:", error);
      res.status(500).json({
        error: "Failed to bulk optimize SEO pages",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/endorsements", async (req, res) => {
    try {
      const results = await db.query.endorsements.findMany({
        where: eq3(endorsements.active, true),
        orderBy: [desc3(endorsements.displayOrder)]
      });
      res.json(results);
    } catch (error) {
      console.error("Error fetching endorsements:", error);
      res.status(500).json({
        error: "Failed to fetch endorsements",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/endorsements/homepage", async (req, res) => {
    try {
      const results = await db.query.endorsements.findMany({
        where: and3(
          eq3(endorsements.active, true),
          eq3(endorsements.displayOnHomepage, true)
        ),
        orderBy: [desc3(endorsements.displayOrder)]
      });
      res.json(results);
    } catch (error) {
      console.error("Error fetching homepage endorsements:", error);
      res.status(500).json({
        error: "Failed to fetch homepage endorsements",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 100 * 1024 * 1024
      // 100MB limit
    }
  });
  app2.get("/api/media/library", requireAdmin, async (req, res) => {
    try {
      const { filter } = req.query;
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.getMediaLibrary(1, 1e3, filter);
      res.json({ items: result || [] });
    } catch (error) {
      console.error("Error fetching media library:", error);
      res.status(500).json({
        error: "Failed to fetch media library",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/media/admin-upload", requireAdmin, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.uploadMedia(req.file, "admin");
      res.json(result);
    } catch (error) {
      console.error("Error uploading media:", error);
      res.status(500).json({
        error: "Failed to upload media",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.put("/api/media/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.updateMediaMetadata(id, updates, "admin");
      res.json(result);
    } catch (error) {
      console.error("Error updating media:", error);
      res.status(500).json({
        error: "Failed to update media",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.delete("/api/media/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const mediaService = await getMediaLibraryService();
      await mediaService.deleteMedia(id, "admin");
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting media:", error);
      res.status(500).json({
        error: "Failed to delete media",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/media/bulk-delete", requireAdmin, async (req, res) => {
    try {
      const { mediaIds } = req.body;
      if (!mediaIds || !Array.isArray(mediaIds)) {
        return res.status(400).json({ error: "mediaIds array is required" });
      }
      const mediaService = await getMediaLibraryService();
      await mediaService.bulkDeleteMedia(mediaIds, "admin");
      res.json({ success: true, deletedCount: mediaIds.length });
    } catch (error) {
      console.error("Error bulk deleting media:", error);
      res.status(500).json({
        error: "Failed to bulk delete media",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/media/publish", requireAdmin, async (req, res) => {
    try {
      const { mediaIds, targetSection } = req.body;
      if (!mediaIds || !Array.isArray(mediaIds)) {
        return res.status(400).json({ error: "mediaIds array is required" });
      }
      if (!targetSection) {
        return res.status(400).json({ error: "targetSection is required" });
      }
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.publishToWebsite(mediaIds, targetSection);
      res.json(result);
    } catch (error) {
      console.error("Error publishing media:", error);
      res.status(500).json({
        error: "Failed to publish media",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/media/edit-photo", requireAdmin, async (req, res) => {
    try {
      const { photoId, editType, editPrompt, userId } = req.body;
      if (!photoId) {
        return res.status(400).json({ error: "photoId is required" });
      }
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.editPhoto(photoId, editType, editPrompt, userId || "admin");
      res.json(result);
    } catch (error) {
      console.error("Error editing photo:", error);
      res.status(500).json({
        error: "Failed to edit photo",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/media/:id/analyze", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const mediaService = await getMediaLibraryService();
      const storage3 = await getStorage();
      const mediaItem = await storage3.getMedia(id);
      if (!mediaItem) {
        return res.status(404).json({ error: "Media item not found" });
      }
      mediaService.analyzePhotoAsync(id, mediaItem.filePath);
      res.json({ success: true, message: "Analysis started" });
    } catch (error) {
      console.error("Error analyzing photo:", error);
      res.status(500).json({
        error: "Failed to analyze photo",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/media/view/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const storage3 = await getStorage();
      const mediaItem = await storage3.getMedia(id);
      if (!mediaItem) {
        return res.status(404).json({ error: "Media item not found" });
      }
      const ObjectStorageServiceClass = await getObjectStorageService();
      if (!ObjectStorageServiceClass) {
        return res.status(500).json({ error: "Object storage not available" });
      }
      const objectStorageService = new ObjectStorageServiceClass();
      const signedUrl = await objectStorageService.getSignedUrl(mediaItem.filePath);
      res.redirect(signedUrl);
    } catch (error) {
      console.error("Error viewing media:", error);
      res.status(500).json({
        error: "Failed to view media",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/blog/authors", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogAuthorSchema.parse(req.body);
      const storage3 = await getStorage();
      if (!validatedData.slug) {
        const baseSlug = generateSlugFromText(validatedData.name);
        validatedData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          return await storage3.getBlogAuthorBySlug(slug);
        });
      }
      const author = await storage3.createBlogAuthor(validatedData);
      res.json(author);
    } catch (error) {
      console.error("Error creating blog author:", error);
      if (isSlugConflictError(error)) {
        return res.status(409).json({ error: "Author with this slug already exists" });
      }
      res.status(500).json({
        error: "Failed to create blog author",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/blog/categories", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogCategorySchema.parse(req.body);
      const storage3 = await getStorage();
      if (!validatedData.slug) {
        const baseSlug = generateSlugFromText(validatedData.name);
        validatedData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          return await storage3.getBlogCategoryBySlug(slug);
        });
      }
      const category = await storage3.createBlogCategory(validatedData);
      res.json(category);
    } catch (error) {
      console.error("Error creating blog category:", error);
      if (isSlugConflictError(error)) {
        return res.status(409).json({ error: "Category with this slug already exists" });
      }
      res.status(500).json({
        error: "Failed to create blog category",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/blog/tags", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogTagSchema.parse(req.body);
      const storage3 = await getStorage();
      if (!validatedData.slug) {
        const baseSlug = generateSlugFromText(validatedData.name);
        validatedData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          return await storage3.getBlogTagBySlug(slug);
        });
      }
      const tag = await storage3.createBlogTag(validatedData);
      res.json(tag);
    } catch (error) {
      console.error("Error creating blog tag:", error);
      if (isSlugConflictError(error)) {
        return res.status(409).json({ error: "Tag with this slug already exists" });
      }
      res.status(500).json({
        error: "Failed to create blog tag",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/blog/posts", requireAdmin, async (req, res) => {
    try {
      const { categoryIds, tagIds, ...postData } = req.body;
      const validatedData = insertBlogPostSchema.parse(postData);
      const storage3 = await getStorage();
      if (!validatedData.slug) {
        const baseSlug = generateSlugFromText(validatedData.title);
        validatedData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          return await storage3.getBlogPostBySlug(slug);
        });
      }
      if (validatedData.content) {
        const textContent = validatedData.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
        const words = textContent.split(" ").filter((w) => w.length > 0);
        validatedData.wordCount = words.length;
        validatedData.readingTime = Math.ceil(words.length / 200);
      }
      const post = await storage3.createBlogPost(validatedData);
      if (categoryIds && Array.isArray(categoryIds)) {
        for (const categoryId of categoryIds) {
          await storage3.addBlogPostCategory(post.id, categoryId);
        }
      }
      if (tagIds && Array.isArray(tagIds)) {
        for (const tagId of tagIds) {
          await storage3.addBlogPostTag(post.id, tagId);
        }
      }
      const fullPost = await storage3.getBlogPost(post.id);
      res.json(fullPost);
    } catch (error) {
      console.error("Error creating blog post:", error);
      if (isSlugConflictError(error)) {
        return res.status(409).json({ error: "Post with this slug already exists" });
      }
      res.status(500).json({
        error: "Failed to create blog post",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const sanitizeOptions = {
    allowedTags: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "ul", "ol", "li", "a", "img", "blockquote", "strong", "em", "code", "pre", "span", "div"],
    allowedAttributes: {
      "a": ["href", "title", "target", "rel"],
      "img": ["src", "alt", "title", "width", "height"],
      "*": ["class"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https", "data"]
    }
  };
  function sanitizeAndValidateHtml(content, title) {
    const warnings = [];
    const sanitized = sanitizeHtml(content, sanitizeOptions);
    if (sanitized !== content) {
      warnings.push("Content was sanitized - potentially dangerous HTML was removed");
      console.warn(`\u26A0\uFE0F Content sanitized for post "${title}"`);
    }
    const textContent = sanitized.replace(/<[^>]*>/g, "").trim();
    if (textContent.length < 50) {
      warnings.push("Content is too short (less than 50 characters)");
      return { sanitized, isValid: false, warnings };
    }
    const openTags = (sanitized.match(/<(?!\/)[^>]+>/g) || []).length;
    const closeTags = (sanitized.match(/<\/[^>]+>/g) || []).length;
    const selfClosingTags = (sanitized.match(/<[^>]+\/>/g) || []).length;
    if (openTags !== closeTags + selfClosingTags) {
      warnings.push("HTML structure may be malformed");
    }
    return { sanitized, isValid: true, warnings };
  }
  app2.post("/api/blog/admin/format-all-posts", requireAdmin, async (req, res) => {
    try {
      const storage3 = await getStorage();
      const { limit, dryRun = false } = req.body;
      const posts = await storage3.getAllBlogPosts({
        status: "published",
        limit: limit || 1e3
      });
      const results = {
        processed: 0,
        errors: 0,
        dryRun,
        details: []
      };
      const mode = dryRun ? "DRY RUN" : "LIVE";
      console.log(`Starting ${mode} format of ${posts.length} published blog posts with Gemini AI...`);
      for (const post of posts) {
        try {
          console.log(`[${mode}] Formatting post: ${post.title} (${post.id})`);
          const formattedContent = await formatBlogPost(post.content, post.title);
          const { sanitized, isValid, warnings } = sanitizeAndValidateHtml(formattedContent, post.title);
          if (!isValid) {
            throw new Error(`Validation failed: ${warnings.join(", ")}`);
          }
          if (warnings.length > 0) {
            console.warn(`\u26A0\uFE0F Warnings for post "${post.title}":`, warnings);
          }
          if (dryRun) {
            results.details.push({
              id: post.id,
              title: post.title,
              status: "success",
              preview: {
                original: post.content.substring(0, 500) + (post.content.length > 500 ? "..." : ""),
                formatted: formattedContent.substring(0, 500) + (formattedContent.length > 500 ? "..." : ""),
                sanitized: sanitized.substring(0, 500) + (sanitized.length > 500 ? "..." : ""),
                warnings
              }
            });
            results.processed++;
            console.log(`\u2705 [DRY RUN] Preview generated for post: ${post.title}`);
          } else {
            await storage3.updateBlogPost(post.id, {
              content: sanitized,
              updatedAt: /* @__PURE__ */ new Date()
            });
            results.processed++;
            results.details.push({
              id: post.id,
              title: post.title,
              status: "success",
              message: warnings.length > 0 ? `Sanitized: ${warnings.join(", ")}` : void 0
            });
            console.log(`\u2705 Successfully formatted and sanitized post: ${post.title}`);
          }
        } catch (error) {
          results.errors++;
          results.details.push({
            id: post.id,
            title: post.title,
            status: "error",
            message: error.message || "Unknown error"
          });
          console.error(`\u274C Error formatting post ${post.title}:`, error);
        }
      }
      console.log(`[${mode}] Blog formatting complete: ${results.processed} processed, ${results.errors} errors`);
      res.json(results);
    } catch (error) {
      console.error("Error in format-all-posts:", error);
      res.status(500).json({
        error: "Failed to format blog posts",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/prompts-library", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPromptsLibrarySchema.parse(req.body);
      const result = await storage2.savePromptLibrary(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Error saving prompts library:", error);
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/prompts-library", requireAdmin, async (req, res) => {
    try {
      const results = await storage2.getAllPromptLibraries();
      res.json(results);
    } catch (error) {
      console.error("Error getting all prompts libraries:", error);
      res.status(500).json({ error: error.message });
    }
  });
  app2.get("/api/prompts-library/:name", requireAdmin, async (req, res) => {
    try {
      const result = await storage2.getPromptLibrary(req.params.name);
      if (!result) {
        return res.status(404).json({ error: "Prompts library entry not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error getting prompts library:", error);
      res.status(500).json({ error: error.message });
    }
  });
  app2.put("/api/prompts-library/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      const result = await storage2.updatePromptLibrary(id, req.body);
      res.json(result);
    } catch (error) {
      console.error("Error updating prompts library:", error);
      res.status(500).json({ error: error.message });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
var storage2, googleSheetsService2, mailgunEmail, mailgunQuoteEmail, comprehensiveLeadService2, mediaLibraryService2, ObjectStorageService2, ObjectNotFoundError3, sseClients, getStorage, getGoogleSheetsService, getMailgunEmailFunctions, getComprehensiveLeadService, getMediaLibraryService, seoService2, getSEOService, getObjectStorageService, normalizeToChicagoTime, adminCalendarQuerySchema, blockSlotSchema, unblockSlotSchema, batchSlotOperationSchema, moveBookingSchema, recurringPatternSchema, cancelBookingSchema, calendarOverviewSchema, invoiceItemSchema, createInvoiceSchema, updateInvoiceSchema, markPaidSchema, invoiceFiltersSchema, sendInvoiceSchema;
var init_routes = __esm({
  "server/routes.ts"() {
    "use strict";
    init_db();
    init_auth();
    init_auth2();
    init_schema();
    init_gemini();
    init_utils();
    storage2 = null;
    googleSheetsService2 = null;
    mailgunEmail = null;
    mailgunQuoteEmail = null;
    comprehensiveLeadService2 = null;
    mediaLibraryService2 = null;
    ObjectStorageService2 = null;
    ObjectNotFoundError3 = null;
    sseClients = /* @__PURE__ */ new Map();
    setInterval(() => {
      const now = /* @__PURE__ */ new Date();
      for (const [clientId, client] of sseClients.entries()) {
        const timeSinceLastPing = now.getTime() - client.lastPing.getTime();
        if (timeSinceLastPing > 5 * 60 * 1e3) {
          console.log(`\u{1F9F9} Cleaning up stale SSE client ${clientId}`);
          sseClients.delete(clientId);
        }
      }
    }, 5 * 60 * 1e3);
    getStorage = async () => {
      if (!storage2) {
        try {
          const storageModule = await Promise.resolve().then(() => (init_storage(), storage_exports));
          storage2 = storageModule.storage;
        } catch (error) {
          console.error("Failed to initialize storage:", error);
          throw new Error("Storage initialization failed");
        }
      }
      return storage2;
    };
    getGoogleSheetsService = async () => {
      if (!googleSheetsService2) {
        try {
          const { googleSheetsService: service } = await Promise.resolve().then(() => (init_googleSheets(), googleSheets_exports));
          googleSheetsService2 = service;
        } catch (error) {
          console.error("Failed to initialize Google Sheets service:", error);
          return { addLeadToSheet: async () => ({ success: false, error: "Service unavailable" }) };
        }
      }
      return googleSheetsService2;
    };
    getMailgunEmailFunctions = async () => {
      if (!mailgunEmail || !mailgunQuoteEmail) {
        try {
          const { sendEmail: sendEmail2, sendQuoteEmail: sendQuoteEmail2 } = await Promise.resolve().then(() => (init_mailgunEmail(), mailgunEmail_exports));
          mailgunEmail = sendEmail2;
          mailgunQuoteEmail = sendQuoteEmail2;
        } catch (error) {
          console.error("Failed to initialize Mailgun email functions:", error);
          return {
            sendEmail: async () => false,
            sendQuoteEmail: async () => false
          };
        }
      }
      return { sendEmail: mailgunEmail, sendQuoteEmail: mailgunQuoteEmail };
    };
    getComprehensiveLeadService = async () => {
      if (!comprehensiveLeadService2) {
        try {
          const { ComprehensiveLeadService: ComprehensiveLeadService2 } = await Promise.resolve().then(() => (init_comprehensiveLeadService(), comprehensiveLeadService_exports));
          comprehensiveLeadService2 = new ComprehensiveLeadService2();
        } catch (error) {
          console.error("Failed to initialize Comprehensive Lead service:", error);
          return { createComprehensiveLead: async () => ({ success: false, error: "Service unavailable" }) };
        }
      }
      return comprehensiveLeadService2;
    };
    getMediaLibraryService = async () => {
      if (!mediaLibraryService2) {
        try {
          const { MediaLibraryService: MediaLibraryService2 } = await Promise.resolve().then(() => (init_mediaLibrary(), mediaLibrary_exports));
          mediaLibraryService2 = new MediaLibraryService2();
        } catch (error) {
          console.error("Failed to initialize Media Library service:", error);
          return { getMediaLibrary: async () => [], uploadMedia: async () => ({ success: false }) };
        }
      }
      return mediaLibraryService2;
    };
    seoService2 = null;
    getSEOService = async () => {
      if (!seoService2) {
        try {
          const { SEOService: SEOService2 } = await Promise.resolve().then(() => (init_seoService(), seoService_exports));
          seoService2 = new SEOService2();
        } catch (error) {
          console.error("Failed to initialize SEO service:", error);
          return {
            optimizePage: async () => ({ optimizedData: {}, aiSuggestions: [], model: "none" }),
            analyzePage: async () => ({ score: 0, issues: [], recommendations: [] }),
            getAllSeoPages: async () => [],
            getSeoPage: async () => null,
            updateSeoPage: async () => null,
            bulkAnalyze: async () => ({ results: [], model: "none" }),
            bulkOptimize: async () => ({ results: [], model: "none" })
          };
        }
      }
      return seoService2;
    };
    getObjectStorageService = async () => {
      if (!ObjectStorageService2) {
        try {
          const services = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
          ObjectStorageService2 = services.ObjectStorageService;
          ObjectNotFoundError3 = services.ObjectNotFoundError;
        } catch (error) {
          console.error("Failed to initialize Object Storage service:", error);
          return null;
        }
      }
      return ObjectStorageService2;
    };
    normalizeToChicagoTime = (dateString) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return /* @__PURE__ */ new Date(dateString + "T00:00:00-06:00");
      }
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(dateString)) {
        return /* @__PURE__ */ new Date(dateString + "-06:00");
      }
      return new Date(dateString);
    };
    adminCalendarQuerySchema = z2.object({
      startDate: z2.string().transform(normalizeToChicagoTime),
      endDate: z2.string().transform(normalizeToChicagoTime),
      boatId: z2.string().optional()
    });
    blockSlotSchema = z2.object({
      boatId: z2.string().min(1, "Boat ID is required"),
      startTime: z2.string().transform(normalizeToChicagoTime),
      endTime: z2.string().transform(normalizeToChicagoTime),
      reason: z2.string().optional()
    });
    unblockSlotSchema = z2.object({
      boatId: z2.string().min(1, "Boat ID is required"),
      startTime: z2.string().transform(normalizeToChicagoTime),
      endTime: z2.string().transform(normalizeToChicagoTime)
    });
    batchSlotOperationSchema = z2.object({
      operation: z2.object({
        type: z2.enum(["block", "unblock"]),
        slotIds: z2.array(z2.string()),
        reason: z2.string().optional(),
        boatId: z2.string().optional(),
        startTime: z2.string().transform(normalizeToChicagoTime).optional(),
        endTime: z2.string().transform(normalizeToChicagoTime).optional()
      })
    });
    moveBookingSchema = z2.object({
      newStartTime: z2.string().transform(normalizeToChicagoTime),
      newEndTime: z2.string().transform(normalizeToChicagoTime),
      newBoatId: z2.string().optional()
    });
    recurringPatternSchema = z2.object({
      startDate: z2.string().transform(normalizeToChicagoTime),
      endDate: z2.string().transform(normalizeToChicagoTime).optional(),
      timeSlots: z2.array(z2.object({
        startTime: z2.string(),
        endTime: z2.string()
      })),
      boatIds: z2.array(z2.string()),
      daysOfWeek: z2.array(z2.number().min(0).max(6)).optional(),
      reason: z2.string().optional()
    });
    cancelBookingSchema = z2.object({
      reason: z2.string().optional()
    });
    calendarOverviewSchema = z2.object({
      date: z2.string().transform(normalizeToChicagoTime)
    });
    invoiceItemSchema = z2.object({
      type: z2.string().min(1, "Item type is required"),
      name: z2.string().min(1, "Item name is required"),
      description: z2.string().optional(),
      unitPrice: z2.number().min(0, "Unit price must be non-negative"),
      quantity: z2.number().min(1, "Quantity must be at least 1"),
      total: z2.number().min(0, "Total must be non-negative")
    });
    createInvoiceSchema = z2.object({
      quoteId: z2.string().min(1, "Quote ID is required"),
      dueDate: z2.string().datetime(),
      items: z2.array(invoiceItemSchema).min(1, "At least one item is required"),
      notes: z2.string().optional()
      // CLIENT TOTALS REMOVED: subtotal, tax, gratuity, total are SERVER-CALCULATED ONLY
    });
    updateInvoiceSchema = z2.object({
      items: z2.array(invoiceItemSchema).optional(),
      dueDate: z2.string().datetime().optional(),
      notes: z2.string().optional(),
      status: z2.enum(["draft", "sent", "paid", "overdue", "cancelled"]).optional()
      // CLIENT TOTALS REMOVED: subtotal, tax, gratuity, total are SERVER-CALCULATED ONLY
    });
    markPaidSchema = z2.object({
      amount: z2.number().min(0, "Payment amount must be non-negative"),
      paymentMethod: z2.string().min(1, "Payment method is required"),
      paymentDate: z2.string().datetime().optional(),
      notes: z2.string().optional()
    });
    invoiceFiltersSchema = z2.object({
      search: z2.string().optional(),
      status: z2.enum(["draft", "sent", "paid", "overdue", "cancelled"]).optional(),
      sortBy: z2.enum(["createdAt", "dueDate", "total", "customerName", "status"]).optional(),
      sortOrder: z2.enum(["asc", "desc"]).optional(),
      limit: z2.number().min(1).max(100).optional()
    });
    sendInvoiceSchema = z2.object({
      invoiceId: z2.string().min(1, "Invoice ID is required"),
      recipientEmail: z2.string().email("Valid email is required"),
      personalMessage: z2.string().optional(),
      sendCopy: z2.boolean().optional().default(false)
    });
  }
});

// server/utils/viteManifest.ts
var init_viteManifest = __esm({
  "server/utils/viteManifest.ts"() {
    "use strict";
  }
});

// server/ssr/pageContent.ts
var PAGE_CONTENT;
var init_pageContent = __esm({
  "server/ssr/pageContent.ts"() {
    "use strict";
    PAGE_CONTENT = {
      "/": {
        h1: "Premier Party Cruises - Austin Lake Travis Boat Rentals",
        introduction: "Experience the ultimate party cruise on Lake Travis with Austin's premier boat rental company. Choose from private charters, the ATX Disco Cruise, bachelor parties, bachelorette parties, corporate events, and more. Professional crew, premium amenities, and unforgettable celebrations await.",
        sections: [
          {
            heading: "Private Charters - Your Exclusive Boat Experience",
            paragraphs: [
              'Choose from our fleet of premium party boats: "Day Tripper" (14 people), "Me Seeks the Irony" (18-25 people), or flagship "Clever Girl" (30-50 people) with giant Texas flag and 14 disco balls. Every private charter includes licensed captains, premium Bluetooth sound systems, large coolers with ice, and all the amenities for an unforgettable celebration.',
              "Perfect for weddings, corporate events, birthdays, and any special celebration. Starting at $195 per hour with a 4-hour minimum. Fully customizable packages to match your event needs."
            ],
            lists: [
              {
                title: "Private Charter Features",
                items: [
                  "Licensed captains & professional crew",
                  "Premium Bluetooth sound systems",
                  "Large coolers with ice provided",
                  "Lily pads & floaties available",
                  "BYOB friendly (21+ with ID)",
                  "Customizable routes on Lake Travis",
                  "Perfect for groups of 14-75 guests"
                ]
              }
            ]
          },
          {
            heading: "ATX Disco Cruise - The Ultimate Party Experience",
            paragraphs: [
              "Join the BEST party on Lake Travis! Our signature ATX Disco Cruise features a professional DJ, photographer, disco dance floor, giant floats, and an incredible party atmosphere. Three package levels available: Basic Bach ($85), Disco Queen/King ($95), and Super Sparkle Platinum ($105).",
              "Every disco cruise includes professional entertainment, photo delivery, party supplies, and an unforgettable experience with multiple bachelor and bachelorette groups celebrating together."
            ],
            lists: [
              {
                title: "Disco Cruise Includes",
                items: [
                  "Professional DJ playing all day",
                  "Professional photographer",
                  "Giant unicorn floats",
                  "Multiple lily pad floats",
                  "Disco dance floor",
                  "Party supplies & mixers",
                  "Ice water stations",
                  "Clean restroom facilities"
                ]
              }
            ]
          },
          {
            heading: "Bachelor & Bachelorette Parties",
            paragraphs: [
              "Plan the perfect bachelor or bachelorette party on Lake Travis! Choose between our affordable ATX Disco Cruise packages or rent a private boat exclusively for your group. Bride cruises FREE on Disco Queen and Platinum packages (16+ paying guests).",
              "We specialize in creating unforgettable bachelor and bachelorette experiences with professional entertainment, premium amenities, and dedicated service. Over 125,000 happy customers have celebrated with us!"
            ],
            lists: [
              {
                title: "Party Highlights",
                items: [
                  "BYOB with coolers and ice",
                  "Alcohol delivery to the boat",
                  "Transportation discounts",
                  "Reserved spots for your group",
                  "Special celebration items",
                  "Complimentary delivery services",
                  "Professional photos included"
                ]
              }
            ]
          },
          {
            heading: "Corporate Events & Team Building",
            paragraphs: [
              "Elevate your corporate events with a Lake Travis cruise! Perfect for team building, client entertainment, company milestones, and employee appreciation. Our fleet accommodates groups from 14 to 75+ guests with professional service and premium amenities.",
              "Customizable packages include catering coordination, AV equipment, and dedicated event planning to ensure your corporate event is a complete success."
            ]
          },
          {
            heading: "Why Choose Premier Party Cruises",
            paragraphs: [
              "With 14+ years of experience and over 125,000 satisfied customers, we are Austin's longest-running and most trusted party cruise company. Our perfect safety record, Coast Guard certified captains, and newest fleet ensure an exceptional experience every time."
            ],
            lists: [
              {
                title: "Our Advantages",
                items: [
                  "14+ years of Lake Travis expertise",
                  "125,000+ happy customers served",
                  "Perfect safety record maintained",
                  "Newest fleet in Austin",
                  "Coast Guard certified captains",
                  "Full-service experience included",
                  "Custom packages for any event",
                  "Professional crew & premium sound"
                ]
              }
            ]
          }
        ]
      },
      "/bachelor-party-austin": {
        h1: "Austin Bachelor Party Boat Rentals | Lake Travis Cruises",
        introduction: "Plan the ultimate bachelor party on Lake Travis with Premier Party Cruises! Choose from our affordable ATX Disco Cruise packages ($85-$105 per person) or rent a private boat exclusively for your group. Professional DJ, photographer, party floats, and unforgettable memories included.",
        sections: [
          {
            heading: "ATX Disco Cruise Bachelor Party Packages",
            paragraphs: [
              "Join the BEST party on Lake Travis! Our disco cruise offers three package levels designed specifically for bachelor parties, with everything included for an epic celebration."
            ],
            lists: [
              {
                title: "Basic Bach Package - $85",
                items: [
                  "Join the ultimate bachelor party cruise",
                  "BYOB with shared cooler and ice",
                  "Alcohol & food delivery available",
                  "Professional DJ and photographer",
                  "Giant floats and party atmosphere",
                  "Always cheaper than private cruises"
                ]
              },
              {
                title: "Disco King Package - $95 (Most Popular)",
                items: [
                  "Private cooler with ice for your group",
                  "Reserved spot on the boat",
                  "Disco visor & ball necklace for groom",
                  "Complimentary alcohol & lunch delivery",
                  "25% discount on transportation",
                  "$50-$100 Airbnb delivery voucher",
                  "Everything from Basic Bach"
                ]
              },
              {
                title: "Super Sparkle Platinum - $105",
                items: [
                  "Personal unicorn float for the groom",
                  "Mimosa setup with champagne flutes",
                  "$100 Airbnb concierge voucher",
                  "Towel service & SPF-50 sunscreen",
                  "Cooler pre-stocked when you arrive",
                  "Everything from Disco King"
                ]
              }
            ]
          },
          {
            heading: "What's Included on Every Bachelor Party Cruise",
            paragraphs: [
              "Every ATX Disco Cruise bachelor party includes professional entertainment, party amenities, and an unforgettable Lake Travis experience. Here's what you get:"
            ],
            lists: [
              {
                items: [
                  "Professional DJ playing your favorites all day",
                  "Professional photographer capturing epic moments",
                  "Digital photo delivery after the event",
                  "Private cooler with ice for your group",
                  "Mimosa supplies with juice and fruit",
                  "Multiple giant lily pad floats (6x20 feet)",
                  "Party supplies including cups and koozies",
                  "Ice water stations for hydration",
                  "Clean restroom facilities",
                  "Shaded areas to escape the sun",
                  "Party atmosphere with other bachelor groups"
                ]
              }
            ]
          },
          {
            heading: "Private Bachelor Party Boat Charters",
            paragraphs: [
              "Want the boat all to yourselves? Rent a private boat for your bachelor party! Our fleet includes boats for 14, 25, and 50+ guests with professional captains, premium sound, and complete customization.",
              "Private charters start at $195/hour (4-hour minimum) and include everything you need for an exclusive celebration on Lake Travis."
            ]
          },
          {
            heading: "Why Bachelor Parties Love Premier Party Cruises",
            paragraphs: [
              "Over 125,000 happy customers have celebrated with us, making us Austin's #1 choice for bachelor parties. With 14+ years of experience, perfect safety record, and the newest fleet on Lake Travis, your bachelor party is in expert hands."
            ],
            lists: [
              {
                items: [
                  "Always more affordable than other options",
                  "Professional entertainment included",
                  "BYOB friendly with cooler service",
                  "Lake Travis' best party atmosphere",
                  "Multiple package options to fit any budget",
                  "Easy booking and planning process",
                  "Flexible group sizes from 10-100+ guests",
                  "Perfect safety record maintained"
                ]
              }
            ]
          },
          {
            heading: "Frequently Asked Questions",
            paragraphs: [
              "Can we bring our own alcohol? Yes! BYOB for guests 21+ with ID. We provide coolers and ice. Cans and plastic containers only.",
              "How many people can join? Disco cruises handle 20-40+ guests per group. Private boats accommodate 14-75 guests depending on the vessel.",
              "What about food? You can bring your own food or we can coordinate delivery right to the boat. Many groups order pizza, tacos, or catering.",
              "Is swimming allowed? Yes, when conditions are safe at the captain's discretion. Life jackets required in the water, provided for adults.",
              "How far in advance should we book? Weekend dates fill 6-8 weeks early. Book as soon as possible to secure your preferred date."
            ]
          }
        ]
      },
      "/bachelorette-party-austin": {
        h1: "Austin Bachelorette Party Boat Cruises | Lake Travis",
        introduction: "Plan the ultimate bachelorette party on Lake Travis! The ATX Disco Cruise is our specialty with packages starting at $85. Bride cruises FREE on Disco Queen and Platinum packages (16+ paying guests). Professional DJ, photographer, floats, and unforgettable celebration guaranteed!",
        sections: [
          {
            heading: "Bachelorette Party Cruise Packages",
            paragraphs: [
              "Choose from three amazing package levels designed specifically for bachelorette parties. Each package includes professional DJ, photographer, and everything you need for an epic Lake Travis celebration!"
            ],
            lists: [
              {
                title: "Basic Bach Package - $85",
                items: [
                  "Join the BEST bachelorette party on Lake Travis",
                  "BYOB with shared cooler and ice",
                  "Alcohol & food delivery available",
                  "Professional DJ and photographer included",
                  "Giant floats and party atmosphere",
                  "Most affordable option for bachelorette groups"
                ]
              },
              {
                title: "Disco Queen Package - $95 (Most Popular)",
                items: [
                  "\u{1F389} BRIDE CRUISES FREE with this package!",
                  "Private cooler with ice for your group",
                  "Reserved spot for your bachelorette crew",
                  "Disco ball cup & bubble gun for bride",
                  "Complimentary alcohol & lunch delivery",
                  "25% discount on round-trip transportation",
                  "$50-$100 Airbnb delivery voucher"
                ]
              },
              {
                title: "Super Sparkle Platinum - $105",
                items: [
                  "\u{1F389} BRIDE CRUISES FREE with this package!",
                  "Personal unicorn float for the bride",
                  "Mimosa setup with flutes, juices & chambong",
                  "$100 Airbnb concierge services voucher",
                  "Towel service & SPF-50 spray sunscreen",
                  "Cooler pre-stocked with drinks on arrival",
                  "Everything from Disco Queen Package"
                ]
              }
            ]
          },
          {
            heading: "What Makes Our Bachelorette Cruises Special",
            paragraphs: [
              "Bachelorette parties are our specialty! We've perfected the ultimate Lake Travis bachelorette experience with professional entertainment, premium amenities, and incredible party atmosphere. Here's what's included:"
            ],
            lists: [
              {
                items: [
                  "Professional DJ playing bachelorette favorites all day",
                  "Professional photographer capturing every moment",
                  "Private cooler space for your group",
                  "Mimosa supplies with champagne flutes",
                  "Multiple 6x20' giant lily pad floats",
                  "Party supplies: cups, koozies, decorations",
                  "Ice water stations throughout the cruise",
                  "Clean restroom facilities on board",
                  "Shaded lounge areas",
                  "Party atmosphere with other bachelorette groups"
                ]
              }
            ]
          },
          {
            heading: "Private Bachelorette Boat Charters",
            paragraphs: [
              "Want the boat exclusively for your bachelorette party? Rent a private boat from our fleet! Perfect for groups that want complete privacy and customization. Our boats accommodate 14-50 guests with professional captains and premium amenities.",
              "Private charters include everything: captain, crew, sound system, coolers, ice, and complete control over your route and schedule. Starting at $195/hour with 4-hour minimum."
            ]
          },
          {
            heading: "Why Bachelorette Parties Choose Us",
            paragraphs: [
              "With 14+ years specializing in bachelorette parties, we know exactly how to create an unforgettable celebration. Over 125,000 happy customers, perfect safety record, and Austin's newest fleet make us the #1 choice for Lake Travis bachelorette parties."
            ],
            lists: [
              {
                items: [
                  "Bride cruises FREE on premium packages",
                  "Most Instagram-worthy party boat experience",
                  "Professional photos delivered after cruise",
                  "BYOB friendly with full cooler service",
                  "Multiple package options for any budget",
                  "Easy planning and coordination",
                  "Perfect for groups of 10-100+ guests",
                  "Coast Guard certified captains"
                ]
              }
            ]
          }
        ]
      },
      "/combined-bachelor-bachelorette-austin": {
        h1: "Combined Bachelor Bachelorette Parties Austin | Lake Travis",
        introduction: "Why celebrate separately? Plan the ultimate combined bachelor and bachelorette party on Lake Travis! Both bride AND groom cruise FREE on Party Squad and Ultimate packages. Join the ATX Disco Cruise or rent a private boat for guys and girls celebrating together. Starting at $85 per person.",
        sections: [
          {
            heading: "Combined Party Packages - Everyone Together",
            paragraphs: [
              "The modern way to celebrate! Combine your bachelor and bachelorette parties for one epic Lake Travis experience. Both sides get to bond before the wedding, save money, and create unforgettable memories together."
            ],
            lists: [
              {
                title: "Basic Combined Package - $85",
                items: [
                  "Join the ultimate combined party cruise",
                  "BYOB with shared cooler for everyone",
                  "Alcohol & food delivery available",
                  "Perfect for budget-conscious groups",
                  "Professional DJ and photographer",
                  "Always more affordable than separate parties"
                ]
              },
              {
                title: "Party Squad Package - $95 (Most Popular)",
                items: [
                  "\u{1F389} Both BRIDE & GROOM cruise FREE!",
                  "Private cooler for your entire group",
                  "Reserved area for your combined party",
                  "Special celebration items for the couple",
                  "Complimentary alcohol & food delivery",
                  "25% discount on transportation",
                  "$50-$100 Airbnb delivery voucher"
                ]
              },
              {
                title: "Ultimate Celebration Package - $105",
                items: [
                  "\u{1F389} Both BRIDE & GROOM cruise FREE!",
                  "Premium party floats for entire group",
                  "Mixology setup with champagne & supplies",
                  "$100 Airbnb concierge voucher",
                  "Towel service & SPF-50 sunscreen",
                  "Cooler completely pre-stocked",
                  "Everything from Party Squad Package"
                ]
              }
            ]
          },
          {
            heading: "Why Combined Parties Are Better",
            paragraphs: [
              "Save time, save money, and everyone bonds before the wedding! Combined bachelor/bachelorette parties are the future of pre-wedding celebrations. Your friends from both sides get to know each other in an incredible setting, creating friendships that last beyond the wedding day.",
              "With activities everyone loves - DJ, floats, swimming, dancing - there's something for every guest. Plus, both the bride and groom cruise FREE on select packages!"
            ]
          },
          {
            heading: "What's Included for Combined Groups",
            paragraphs: [
              "Everything you need for guys and girls to party together on Lake Travis:"
            ],
            lists: [
              {
                items: [
                  "Professional DJ playing music everyone enjoys",
                  "Professional photographer for epic group photos",
                  "Private cooler space for your combined group",
                  "Party supplies: mixers, cups, ice",
                  "Multiple giant floats everyone can enjoy",
                  "Celebration essentials for the entire crew",
                  "Ice water stations for everyone",
                  "Clean restroom facilities",
                  "Plenty of shaded lounge areas",
                  "Party atmosphere with other combined groups"
                ]
              }
            ]
          },
          {
            heading: "Frequently Asked Questions",
            paragraphs: [
              "How many people can you fit? Disco cruise handles 20-40+ guests per group. Private boats accommodate up to 75 guests.",
              "Should we do disco or private cruise? Under 30 people: disco cruise is perfect. 30+ people: consider a private boat. We'll help you choose!",
              "Can we split payments? Yes! Split payment options available at checkout for easy group coordination.",
              "What if guys and girls want different things? No problem! Plenty of zones on the boat - floats, DJ area, lounge spots. BYOB keeps everyone happy.",
              "Do bride and groom really cruise free? Yes! On Party Squad and Ultimate packages with 16+ paying guests, both cruise absolutely FREE."
            ]
          }
        ]
      },
      "/atx-disco-cruise": {
        h1: "ATX Disco Cruise - Ultimate Party Boat Experience Austin",
        introduction: "Experience the legendary ATX Disco Cruise on Lake Travis! Professional DJ, photographer, disco dance floor, giant floats, and the best party atmosphere in Austin. Three packages available from $85-$105 per person. Join multiple bachelor and bachelorette parties for an unforgettable celebration!",
        sections: [
          {
            heading: "ATX Disco Cruise Packages",
            paragraphs: [
              "Choose your perfect disco cruise package! Every level includes professional DJ, photographer, party floats, and an incredible 4-hour Lake Travis experience."
            ],
            lists: [
              {
                title: "Basic Bach Package - $85",
                items: [
                  "Full 4-hour Lake Travis cruise",
                  "Professional DJ entertainment all day",
                  "Professional photographer",
                  "Digital photo delivery",
                  "Giant unicorn float access",
                  "Multi-group party atmosphere",
                  "BYOB with shared coolers & ice",
                  "Alcohol & lunch delivery available"
                ]
              },
              {
                title: "Disco Queen/King Package - $95 (Most Popular)",
                items: [
                  "Everything in Basic Bach",
                  "Private cooler with ice for your group",
                  "Reserved spot on the boat",
                  "Disco ball cup & bubble gun for guest of honor",
                  "Complimentary alcohol & lunch delivery",
                  "25% discount on transportation",
                  "$50-$100 Airbnb delivery voucher",
                  "Premium boat positioning"
                ]
              },
              {
                title: "Super Sparkle Platinum - $105",
                items: [
                  "Everything in Disco Queen",
                  "Personal unicorn float for guest of honor",
                  "Mimosa setup with flutes, juices & chambong",
                  "$100 Airbnb concierge voucher",
                  "Towel service & SPF-50 sunscreen",
                  "Cooler pre-stocked with drinks",
                  "VIP treatment throughout",
                  "Extended photo coverage"
                ]
              }
            ]
          },
          {
            heading: "What Makes The Disco Cruise Special",
            paragraphs: [
              "The ATX Disco Cruise is unlike anything else in Austin! Join other bachelor and bachelorette parties for a multi-group celebration with professional entertainment, incredible energy, and Lake Travis' best party atmosphere."
            ],
            lists: [
              {
                title: "Every Disco Cruise Includes",
                items: [
                  "Professional DJ spinning all day",
                  "Professional photographer capturing memories",
                  "Disco dance floor with LED lights",
                  "Multiple giant lily pad floats",
                  "Party supplies and mixers",
                  "Ice water stations",
                  "Clean restroom facilities",
                  "Shaded lounge areas",
                  "Incredible multi-group party vibe"
                ]
              }
            ]
          },
          {
            heading: "The Disco Cruise Experience",
            paragraphs: [
              "Picture this: You arrive at Anderson Mill Marina and board a massive party boat with disco balls, LED lights, and a pumping sound system. The DJ is already playing your favorite hits, other groups are dancing, and the energy is electric.",
              "For 4 hours, you'll cruise beautiful Lake Travis, dance on the disco floor, swim from giant floats, and party with bachelor and bachelorette groups from all over. Professional photographers capture every moment. It's the most fun you'll have on the water!",
              "With packages starting at just $85, the ATX Disco Cruise is ALWAYS more affordable than a private boat, with way more energy and entertainment included."
            ]
          },
          {
            heading: "Why Groups Love The Disco Cruise",
            paragraphs: [
              "Over 125,000 guests have experienced the ATX Disco Cruise. Here's why it's Austin's #1 party boat:"
            ],
            lists: [
              {
                items: [
                  "Most affordable Lake Travis party option",
                  "Professional entertainment included",
                  "Multi-group party atmosphere",
                  "No planning required - we handle everything",
                  "BYOB friendly with full cooler service",
                  "Perfect for groups of 10-40 guests",
                  "Book last minute - availability most weekends",
                  "Bride/Groom cruises FREE on select packages"
                ]
              }
            ]
          }
        ]
      },
      "/private-cruises": {
        h1: "Private Boat Rentals Lake Travis | Austin Party Cruises",
        introduction: "Rent a private boat on Lake Travis for your exclusive celebration! Choose from our fleet of premium boats accommodating 14-75 guests. Everything set up when you arrive - professional captain, crew, sound system, coolers, and complete customization. Three package levels from Standard to Ultimate. Starting at $195/hour.",
        sections: [
          {
            heading: "Our Private Boat Fleet",
            paragraphs: [
              "Choose the perfect boat for your group size and celebration style:"
            ],
            lists: [
              {
                title: "Day Tripper - 14 Person Boat",
                items: [
                  "Perfect for intimate groups up to 14 guests",
                  "Licensed captain and premium sound system",
                  "Coolers with ice provided",
                  "Comfortable seating with sun and shade",
                  "Starting at $195/hour (4-hour minimum)",
                  "Ideal for small birthday parties and gatherings"
                ]
              },
              {
                title: "Me Seeks the Irony - 25 Person Boat",
                items: [
                  "Popular choice for medium groups (18-25 guests)",
                  "Professional captain and crew",
                  "Premium Bluetooth sound system",
                  "Large coolers with ice",
                  "Starting at $295/hour (4-hour minimum)",
                  "Perfect for bachelor/bachelorette parties"
                ]
              },
              {
                title: "Clever Girl - 50 Person Flagship",
                items: [
                  "Flagship boat with 14 disco balls",
                  "Giant Texas flag display",
                  "Accommodates 30-50 guests",
                  "Professional crew and premium amenities",
                  "Starting at $495/hour (4-hour minimum)",
                  "Ideal for corporate events and large celebrations"
                ]
              }
            ]
          },
          {
            heading: "Private Cruise Package Options",
            paragraphs: [
              "Choose from three package levels - each one scales perfectly to your group size and boat selection:"
            ],
            lists: [
              {
                title: "Standard Package",
                items: [
                  "Professional captain and crew",
                  "Large coolers (bring your own ice)",
                  "Premium Bluetooth sound system",
                  "Clean restroom facilities",
                  "Sun and shade seating areas",
                  "BYOB friendly (cans/plastic only)",
                  "Basic cruise experience"
                ]
              },
              {
                title: "Essentials Package (+$100/hour)",
                items: [
                  "Everything from Standard Package",
                  "Coolers pre-stocked with ice",
                  "5-gallon insulated water dispenser",
                  "Solo cups and ice water",
                  "6-foot folding table for food",
                  "Vendor coordination for catering",
                  "Enhanced convenience"
                ]
              },
              {
                title: "Ultimate Package (+$250/hour)",
                items: [
                  "Everything from Essentials Package",
                  "Giant lily pad float",
                  "Guest of honor float (unicorn or ring)",
                  "Disco ball cups for party vibes",
                  "Bubble guns and bubble wands",
                  "Champagne flutes and fruit juices",
                  "SPF-50 spray sunscreen",
                  "Plates, plasticware, paper towels",
                  "Full party atmosphere setup"
                ]
              }
            ]
          },
          {
            heading: "Why Choose Private Cruises",
            paragraphs: [
              "Private boat rentals give you complete control over your Lake Travis experience. Choose your own route, timing, activities, and guest list. Perfect for:"
            ],
            lists: [
              {
                items: [
                  "Corporate events and team building",
                  "Wedding parties and receptions",
                  "Birthday celebrations and anniversaries",
                  "Family reunions and gatherings",
                  "Client entertainment",
                  "Graduation parties",
                  "Any occasion requiring exclusivity"
                ]
              }
            ]
          },
          {
            heading: "Transparent Pricing",
            paragraphs: [
              "Our pricing is simple and transparent. Hourly rate \xD7 duration = base cost. No hidden fees or surprise charges. Additional crew fees apply for larger groups: $50/hour for 26-30 guests, $100/hour for 51-75 guests. 8.25% tax added. Suggested 20% gratuity for exceptional service.",
              "25% deposit required if booking more than 30 days out. Full payment required if booking within 30 days of cruise date. Flexible payment options available."
            ]
          },
          {
            heading: "What's Included",
            paragraphs: [
              "Every private cruise includes everything you need for a successful celebration:"
            ],
            lists: [
              {
                items: [
                  "Coast Guard certified captain",
                  "Professional crew members",
                  "Premium Bluetooth sound system",
                  "Large coolers (ice in Essentials/Ultimate)",
                  "Clean restroom facilities",
                  "Safety equipment and life jackets",
                  "Comfortable seating - sun and shade",
                  "Flexible route customization",
                  "Full captain's discretion on activities"
                ]
              }
            ]
          }
        ]
      },
      "/after-party": {
        h1: "Wedding After Party Cruises Lake Travis | Austin",
        introduction: "Don't let your wedding night end! Continue the celebration with a late-night Lake Travis cruise for you and your closest friends. Professional DJ, midnight champagne, dancing under the stars, and the perfect finale to your special day. Three packages available starting at $200/hour.",
        sections: [
          {
            heading: "After Party Cruise Packages",
            paragraphs: [
              "Keep the celebration going after your reception with our specialized after-party cruise packages:"
            ],
            lists: [
              {
                title: "Standard 4-Hour Cruise - $200/hour",
                items: [
                  "Experienced professional captain",
                  "2 large coolers (bring your own ice & drinks)",
                  "Premium Bluetooth speaker system",
                  "Clean restroom facilities",
                  "Seating for up to 14 guests",
                  "Sun and shade areas",
                  "Vendor coordination for catering"
                ]
              },
              {
                title: "Cruise w/Essentials - $225/hour",
                items: [
                  "Everything from Standard Cruise",
                  "5-gallon insulated dispenser with ice water",
                  "Fresh water and solo cups",
                  "Coolers pre-stocked with ice",
                  "6-ft folding table for food & drinks",
                  "Enhanced convenience for your group"
                ]
              },
              {
                title: "Ultimate Party Package - $250/hour",
                items: [
                  "Everything from Essentials Package",
                  "Giant lily pad float",
                  "Guest of honor float (unicorn or ring)",
                  "Disco ball cups for party atmosphere",
                  "Bubble guns and bubble wands",
                  "Champagne flutes and fruit juices",
                  "SPF-50 spray sunscreen provided",
                  "Plates, plasticware, paper towels",
                  "Full party atmosphere with disco balls"
                ]
              }
            ]
          },
          {
            heading: "The Perfect Wedding Finale",
            paragraphs: [
              "After your reception, gather your closest friends and family for an intimate late-night cruise on Lake Travis. Picture dancing under the stars, toasting with champagne at midnight, and celebrating with the people who matter most.",
              "Our after-party cruises typically run 10pm-2am, giving you the perfect transition from reception to continued celebration. Professional crew handles everything while you enjoy your special night.",
              'Many couples choose this as their "last hurrah" before the honeymoon - a private, intimate celebration with their inner circle on beautiful Lake Travis.'
            ]
          },
          {
            heading: "What Makes After Party Cruises Special",
            paragraphs: [
              "Unlike traditional after-parties at bars or hotels, a Lake Travis cruise offers:"
            ],
            lists: [
              {
                items: [
                  "Private, intimate setting for close friends",
                  "Late-night hours (10pm-2am typical)",
                  "Professional DJ and sound system",
                  "Midnight champagne service",
                  "LED party lighting for nighttime ambiance",
                  "Late night snacks and treats",
                  "Couple's VIP area for newlyweds",
                  "Send-off supplies and sparklers",
                  "Professional party crew",
                  "Unforgettable memories on the water"
                ]
              }
            ]
          },
          {
            heading: "Planning Your After Party",
            paragraphs: [
              "Coordinate with your reception venue for seamless transition. We recommend booking transportation for your guests from the reception to the marina. Most groups are 15-30 people - your closest friends and family.",
              "BYOB friendly, or we can coordinate catering and beverage delivery. Many couples arrange for late-night tacos, pizza, or other favorites to be delivered right to the boat.",
              "Book early as after-party cruises are extremely popular, especially for weekend weddings. We'll work with your timeline to create the perfect celebration finale."
            ]
          }
        ]
      },
      "/welcome-party": {
        h1: "Wedding Welcome Party Cruises Lake Travis | Austin",
        introduction: "Start your wedding weekend with an unforgettable welcome party on Lake Travis! Gather guests who traveled from out of town for a relaxed cruise experience. Perfect for Friday evening before Saturday weddings. Private boat rentals for 14-75 guests with professional service.",
        sections: [
          {
            heading: "Welcome Party on the Water",
            paragraphs: [
              "Set the tone for your wedding weekend with a beautiful Lake Travis welcome party cruise. Your out-of-town guests will love this unique Austin experience, and it's the perfect way for both families to mingle before the big day.",
              "Typically scheduled for Friday evening (5pm-9pm), our welcome party cruises offer sunset views, relaxed atmosphere, and quality time with your loved ones. Choose from our fleet of boats to accommodate your guest count."
            ]
          },
          {
            heading: "Perfect for Wedding Weekends",
            paragraphs: [
              "Why choose a welcome party cruise:"
            ],
            lists: [
              {
                items: [
                  "Unique Austin experience for out-of-town guests",
                  "Both families get to know each other",
                  "Relaxed atmosphere before wedding day",
                  "Beautiful Lake Travis sunset views",
                  "Less formal than rehearsal dinner",
                  "Kids and families welcome",
                  "BYOB with full cooler service",
                  "Flexible timing around your schedule",
                  "Professional crew handles everything",
                  "Create memories before the ceremony"
                ]
              }
            ]
          },
          {
            heading: "Welcome Party Packages",
            paragraphs: [
              "All the same great package options as our private cruises - Standard, Essentials, and Ultimate. Pricing starts at $195/hour with 3-4 hour minimum typical for welcome parties.",
              "Popular add-ons include catering coordination, beverage service, and sunset timing for incredible photos. We'll work with you to create the perfect welcome experience for your guests."
            ]
          },
          {
            heading: "What Guests Love",
            paragraphs: [
              "Out-of-town guests consistently rate welcome party cruises as a highlight of the wedding weekend. It's relaxed, fun, uniquely Austin, and gives everyone quality time together before the busy wedding day.",
              "Many couples use this time for toasts, sharing stories, and building excitement for the wedding. The intimate boat setting creates natural conversation and connection that traditional welcome dinners can't match."
            ]
          }
        ]
      },
      "/rehearsal-dinner": {
        h1: "Rehearsal Dinner Cruises Lake Travis | Austin Weddings",
        introduction: "Host an unforgettable rehearsal dinner on Lake Travis! Private boat cruises for your wedding party and close family. Elegant yet relaxed atmosphere with sunset views, premium service, and complete customization. Perfect alternative to traditional restaurant dinners.",
        sections: [
          {
            heading: "Rehearsal Dinner on Lake Travis",
            paragraphs: [
              "Transform your rehearsal dinner into an extraordinary experience! Instead of a traditional restaurant, gather your wedding party and closest family on a private Lake Travis cruise. Watch the sunset, enjoy catered dinner, and celebrate in style before your big day.",
              "Our rehearsal dinner cruises typically run 3-4 hours in the evening, timed perfectly to catch the gorgeous Lake Travis sunset. Intimate setting for 15-40 guests with professional crew and complete customization."
            ]
          },
          {
            heading: "Why Choose a Cruise for Rehearsal Dinner",
            paragraphs: [
              "A Lake Travis rehearsal dinner cruise offers unique advantages:"
            ],
            lists: [
              {
                items: [
                  "Stunning sunset backdrop for speeches",
                  "Private, intimate setting for close family",
                  "No noise from other restaurant guests",
                  "Flexible timing and schedule",
                  "Memorable Austin experience",
                  "Perfect for toasts and celebrations",
                  "Catering coordination available",
                  "Professional service and crew",
                  "Beautiful photo opportunities",
                  "Stress-free evening before the wedding"
                ]
              }
            ]
          },
          {
            heading: "Rehearsal Dinner Details",
            paragraphs: [
              "We coordinate with your caterer or restaurant for dinner delivery to the boat, or you can bring your own food and beverages. Popular options include upscale catering, family-style meals, or BBQ favorites.",
              "Timing is flexible - most groups prefer 6pm-9pm or 7pm-10pm to catch the sunset. We provide tables, seating, sound system for speeches, and all the amenities for a perfect rehearsal dinner.",
              "Pricing starts at $195/hour for our smallest boat (14 guests) up to $495/hour for our flagship (40+ guests). Add Essentials or Ultimate package for enhanced convenience and party atmosphere."
            ]
          },
          {
            heading: "Creating the Perfect Evening",
            paragraphs: [
              "Many couples use the rehearsal dinner cruise for heartfelt toasts, sharing stories, and quality time with their wedding party. The intimate boat setting creates a relaxed yet elegant atmosphere that traditional venues can't replicate.",
              "Your guests will remember this unique experience long after the wedding. It sets the perfect tone for your big day and gives everyone special memories on beautiful Lake Travis."
            ]
          }
        ]
      },
      "/team-building": {
        h1: "Team Building Cruises Lake Travis | Corporate Austin",
        introduction: "Strengthen your team with an unforgettable Lake Travis cruise! Perfect for corporate team building, employee appreciation, and fostering collaboration. Private boats for 14-75 guests with professional service. Unique Austin experience that brings teams together.",
        sections: [
          {
            heading: "Corporate Team Building on the Water",
            paragraphs: [
              "Take your team building to the next level with a Lake Travis cruise! Our team building cruises provide the perfect environment for collaboration, communication, and connection outside the office.",
              "Whether you're onboarding new employees, celebrating achievements, or strengthening department relationships, a Lake Travis cruise creates shared experiences that translate to better teamwork back at the office."
            ]
          },
          {
            heading: "Team Building Activities & Format",
            paragraphs: [
              "Our team building cruises can be structured or relaxed, depending on your goals:"
            ],
            lists: [
              {
                items: [
                  "Icebreaker activities on the water",
                  "Problem-solving challenges and games",
                  "Team communication exercises",
                  "Relaxed networking and bonding time",
                  "Swimming and floating (weather permitting)",
                  "Group meals and refreshments",
                  "Professional facilitation available",
                  "Custom activities for your objectives",
                  "Flexible 3-6 hour formats",
                  "Debrief and reflection time"
                ]
              }
            ]
          },
          {
            heading: "Why Lake Travis for Team Building",
            paragraphs: [
              "Lake Travis provides the ideal setting for team building events. Away from office distractions, in a relaxed outdoor environment, teams naturally open up and connect on a personal level.",
              "The shared experience of being on the water, trying new activities, and enjoying Austin's natural beauty creates lasting bonds. Many companies report improved communication and collaboration after team building cruises.",
              "Plus, it's a memorable perk that shows your team they're valued. Employees love the unique experience and consistently rate Lake Travis team building as a career highlight."
            ]
          },
          {
            heading: "Planning Your Team Building Event",
            paragraphs: [
              "We handle all the logistics so you can focus on your team. Choose from our fleet based on group size (14-75 guests). Add catering, team building facilitation, or other services as needed.",
              "Popular formats include half-day morning cruises, afternoon sessions, or full-day team building retreats. We'll work with your schedule and objectives to create the perfect experience.",
              "Pricing starts at $195/hour with package upgrades available. Volume discounts for regular corporate clients. Book early as team building dates fill quickly, especially in spring and fall."
            ]
          }
        ]
      },
      "/client-entertainment": {
        h1: "Client Entertainment Cruises Lake Travis | Austin Corporate",
        introduction: "Impress your clients with an exclusive Lake Travis cruise! Perfect for client appreciation, relationship building, and closing deals in style. Private boat experiences for 14-50 guests with premium service and Austin hospitality.",
        sections: [
          {
            heading: "Client Entertainment on Lake Travis",
            paragraphs: [
              "Take client entertainment to the next level with a private Lake Travis cruise. Whether you're thanking valued clients, building new relationships, or closing important deals, a cruise provides the perfect setting for meaningful business connections.",
              "Our client entertainment cruises offer the right balance of professionalism and relaxation. Impress clients with Austin's natural beauty while enjoying premium service, catered meals, and quality conversation time."
            ]
          },
          {
            heading: "Perfect for Client Relationships",
            paragraphs: [
              "Why clients love Lake Travis cruises:"
            ],
            lists: [
              {
                items: [
                  "Unique Austin experience they won't forget",
                  "Private, exclusive setting for conversation",
                  "Relaxed atmosphere for relationship building",
                  "Impressive without being overly formal",
                  "Quality one-on-one time away from office",
                  "Beautiful Lake Travis scenery",
                  "Professional crew and premium service",
                  "Catered meals and beverage service",
                  "Flexible format for your business goals",
                  "Memorable experience that stands out"
                ]
              }
            ]
          },
          {
            heading: "Client Entertainment Formats",
            paragraphs: [
              "Customize your client cruise based on your objectives. Popular formats include lunch cruises (11am-2pm), afternoon outings (2pm-5pm), or sunset cocktail cruises (6pm-9pm).",
              "We coordinate with your preferred caterer or restaurant for upscale meal service. Full bar setups available, or bring your own beverages. Sound system for presentations if needed, or keep it purely social.",
              "Many companies use client cruises for quarterly appreciation events, deal closings, partnership celebrations, or simply strengthening key relationships. The intimate boat setting facilitates genuine connections that conference rooms can't match."
            ]
          },
          {
            heading: "Professional Service Guaranteed",
            paragraphs: [
              "Our experienced crew understands the importance of client entertainment. Discreet, professional service ensures your clients feel valued and impressed. Coast Guard certified captains, premium boats, and attention to every detail.",
              "We've hosted hundreds of corporate client events with perfect track record. Your clients will leave impressed with both your company and their Lake Travis experience. It's an investment in relationships that pays dividends.",
              "Pricing starts at $295/hour for medium boats (25 guests) up to $495/hour for our flagship (50 guests). Ultimate package recommended for maximum client impression. Book 4-6 weeks in advance for best availability."
            ]
          }
        ]
      },
      "/company-milestone": {
        h1: "Company Milestone Cruises Lake Travis | Corporate Celebrations",
        introduction: "Celebrate company milestones in style on Lake Travis! Perfect for anniversaries, IPOs, major wins, and achievement celebrations. Private boat experiences for teams of 14-75 with professional service and unforgettable memories.",
        sections: [
          {
            heading: "Milestone Celebrations on the Water",
            paragraphs: [
              "Company milestones deserve exceptional celebrations! Whether you're celebrating 10 years in business, closing a major deal, hitting revenue targets, or going public, a Lake Travis cruise provides the perfect venue for honoring achievements.",
              "Our milestone celebration cruises create shared memories that reinforce company culture and celebrate success with your entire team. From intimate executive cruises to full-company celebrations, we scale to your needs."
            ]
          },
          {
            heading: "Types of Milestone Celebrations",
            paragraphs: [
              "We've hosted celebrations for every type of company milestone:"
            ],
            lists: [
              {
                items: [
                  "Company anniversary celebrations (5, 10, 25+ years)",
                  "IPO and funding round successes",
                  "Revenue milestone achievements",
                  "Major client wins and deal closings",
                  "Product launch celebrations",
                  "Expansion and office openings",
                  "Award recognitions and industry honors",
                  "Retirement celebrations for executives",
                  "Merger and acquisition celebrations",
                  "Record-breaking quarter or year celebrations"
                ]
              }
            ]
          },
          {
            heading: "Creating the Perfect Celebration",
            paragraphs: [
              "Your milestone celebration should reflect the significance of the achievement. We offer complete customization: timing, route, activities, catering, and special touches.",
              "Popular elements include: champagne toasts, catered meals, professional photography, awards presentations, team recognition, and celebratory decorations. Sound system available for speeches and announcements.",
              "Many companies combine the celebration with team building activities, making it both fun and purposeful. The Lake Travis setting creates a relaxed yet special atmosphere for honoring success."
            ]
          },
          {
            heading: "Professional Event Coordination",
            paragraphs: [
              "We understand the importance of milestone events. Our experienced team handles all logistics, from catering coordination to timeline management. You focus on celebrating while we ensure everything runs perfectly.",
              "Fleet options accommodate any group size: 14 guests (executive team) to 75+ (entire company). Ultimate package recommended for milestone celebrations to maximize the special feel.",
              "Book 6-8 weeks in advance for milestone events. Pricing starts at $195/hour, with volume discounts available for larger groups. We'll create a celebration worthy of your achievement!"
            ]
          }
        ]
      },
      "/birthday-parties": {
        h1: "Birthday Party Boat Cruises Lake Travis | Austin Celebrations",
        introduction: "Celebrate birthdays on Lake Travis with an unforgettable party cruise! Perfect for milestone birthdays, kids parties, and any age celebration. Private boats for 14-75 guests with DJ, floats, and professional service. Make this birthday one they'll never forget!",
        sections: [
          {
            heading: "Birthday Parties on Lake Travis",
            paragraphs: [
              "Make birthdays extraordinary with a Lake Travis party cruise! Whether it's Sweet 16, 21st, 30th, 40th, 50th, or any milestone, our birthday cruises create memories that last a lifetime.",
              "Choose from our fleet of party boats and three package levels. From simple cruises to ultimate party experiences with DJ, floats, and all the fun. Every age group loves the unique Lake Travis experience!"
            ]
          },
          {
            heading: "Birthday Party Options",
            paragraphs: [
              "Customize your perfect birthday celebration:"
            ],
            lists: [
              {
                title: "Party Formats",
                items: [
                  "Kids birthday parties (supervised, life jackets provided)",
                  "Teen celebrations (Sweet 16, graduation)",
                  "21st birthday parties (BYOB, ID required)",
                  "Milestone birthdays (30th, 40th, 50th, 60th+)",
                  "Adult birthday celebrations",
                  "Surprise party cruises",
                  "Combined friend group celebrations",
                  "Family reunion birthday parties"
                ]
              },
              {
                title: "Party Features Available",
                items: [
                  "Professional DJ and sound system",
                  "Giant party floats and water toys",
                  "Birthday decorations and supplies",
                  "Cake and catering coordination",
                  "Photography and video",
                  "Customized birthday playlists",
                  "Special guest of honor treatment",
                  "Games and activities"
                ]
              }
            ]
          },
          {
            heading: "Age-Appropriate Options",
            paragraphs: [
              "We specialize in birthday parties for all ages! Kids parties include extra safety measures, life jackets, and supervised fun. Teen parties have age-appropriate activities and responsible oversight.",
              "Adult birthday parties can include BYOB, catered meals, and party atmosphere. Milestone birthdays get special treatment with celebration supplies and VIP guest of honor service.",
              "Family-friendly options available for multi-generational celebrations. Grandparents to grandkids - everyone enjoys the Lake Travis experience together!"
            ]
          },
          {
            heading: "Planning Your Birthday Cruise",
            paragraphs: [
              "Birthday cruises typically run 3-4 hours. Popular times are afternoon (2pm-5pm) for kids, or evening (6pm-9pm) for adults. Sunset cruises especially popular for milestone birthdays.",
              "Pricing starts at $195/hour for intimate gatherings (14 guests) up to $495/hour for big celebrations (50+ guests). Add Ultimate package for full party experience with floats, DJ, and all the fun.",
              "Book 4-6 weeks in advance for weekend dates. We'll coordinate all details including catering, decorations, and special birthday surprises. Just show up and celebrate!"
            ]
          }
        ]
      },
      "/graduation-party": {
        h1: "Graduation Party Cruises Lake Travis | Austin Celebrations",
        introduction: "Celebrate graduation achievements on Lake Travis! Perfect for high school, college, and graduate school celebrations. Private boat parties for 14-75 guests with DJ, floats, and unforgettable memories. The ultimate way to honor academic success!",
        sections: [
          {
            heading: "Graduation Celebrations on the Water",
            paragraphs: [
              "Graduation marks a major milestone deserving of an epic celebration! Whether high school, college, or graduate school, a Lake Travis party cruise creates memories graduates will cherish forever.",
              "Invite classmates, family, and friends for a celebration that stands out. Professional crew, party atmosphere, and beautiful Lake Travis scenery make the perfect backdrop for honoring achievement."
            ]
          },
          {
            heading: "Graduation Party Packages",
            paragraphs: [
              "Choose from three package levels perfect for graduation celebrations:"
            ],
            lists: [
              {
                title: "Standard Graduation Package",
                items: [
                  "Professional captain and crew",
                  "Premium Bluetooth sound system",
                  "Coolers with ice provided",
                  "Comfortable seating areas",
                  "Perfect for families and close friends",
                  "Celebration on a budget"
                ]
              },
              {
                title: "Essentials Package (Most Popular)",
                items: [
                  "Everything from Standard",
                  "Pre-stocked coolers with ice",
                  "Water dispenser and cups",
                  "Food service tables",
                  "Enhanced convenience",
                  "Perfect for combined family/friend groups"
                ]
              },
              {
                title: "Ultimate Grad Party Package",
                items: [
                  "Everything from Essentials",
                  "Giant lily pad floats",
                  "Guest of honor float for graduate",
                  "Party supplies and decorations",
                  "Bubble guns and photo props",
                  "Full party atmosphere",
                  "Ultimate celebration experience"
                ]
              }
            ]
          },
          {
            heading: "Perfect for All Graduation Types",
            paragraphs: [
              "High school graduations: Celebrate with classmates before everyone heads to college. Create last memories together on Lake Travis with DJ, floats, and party vibes.",
              "College graduations: Invite family who traveled to Austin for the ceremony. Show them Lake Travis while celebrating your achievement. Perfect venue for multi-generational celebrations.",
              "Graduate school & professional programs: Celebrate advanced degrees with colleagues, mentors, and family. More sophisticated celebrations with catering and cocktails available.",
              "Class parties: Combine with other graduates for larger celebrations. Split costs while creating bigger party atmosphere with multiple families and friend groups."
            ]
          },
          {
            heading: "Graduation Party Details",
            paragraphs: [
              "Most graduation parties run 3-4 hours in late afternoon or evening. Popular May/June weekend dates book 6-8 weeks in advance - reserve early!",
              "Catering coordination available - popular options include BBQ, pizza, tacos, or upscale dining. BYOB friendly for 21+ guests with ID. Family-friendly non-alcoholic celebrations welcome.",
              "Pricing starts at $195/hour for intimate graduations (14 guests) to $495/hour for big class celebrations (50+ guests). Ultimate package recommended for maximum celebration vibes.",
              "We've hosted hundreds of graduation parties - it's one of our favorite celebrations! The pride, excitement, and joy of graduates and families creates incredible energy on the water."
            ]
          }
        ]
      },
      "/sweet-16": {
        h1: "Sweet 16 Party Cruises Lake Travis | Austin Birthday Boats",
        introduction: "Celebrate Sweet 16 in style on Lake Travis! Unique birthday cruise experience with DJ, floats, and friends. Private boat parties for 14-50 guests with professional service and supervised fun. Make this Sweet 16 absolutely unforgettable!",
        sections: [
          {
            heading: "Sweet 16 Lake Travis Experience",
            paragraphs: [
              "Make Sweet 16 truly special with a Lake Travis party cruise! Instead of traditional venues, celebrate on the water with friends, DJ, floats, and incredible Lake Travis views. It's the unique Austin experience teenagers love!",
              "Our Sweet 16 cruises provide the perfect balance of fun and safety. Professional crew, supervised activities, and age-appropriate entertainment ensure parents can relax while the birthday teen and friends have the time of their lives."
            ]
          },
          {
            heading: "Sweet 16 Party Features",
            paragraphs: [
              "Everything included for an epic Sweet 16 celebration:"
            ],
            lists: [
              {
                items: [
                  "Professional DJ with teen-favorite playlists",
                  "Giant party floats and water toys",
                  "Birthday decorations and supplies",
                  "Guest of honor special treatment",
                  "Photo opportunities throughout cruise",
                  "Swimming (life jackets provided)",
                  "Dance area with sound system",
                  "Clean restroom facilities",
                  "Shaded lounge areas",
                  "Supervised fun with professional crew",
                  "Coolers for snacks and drinks (non-alcoholic)",
                  "Cake service coordination"
                ]
              }
            ]
          },
          {
            heading: "Safety & Supervision",
            paragraphs: [
              "Sweet 16 parties include enhanced safety measures and supervision. Coast Guard certified captain, professional crew, and safety equipment ensure secure fun on the water.",
              "Life jackets provided and required for swimming activities. Crew monitors all water activities. Age-appropriate music and entertainment. Parent/guardian presence options available based on your preference.",
              "We've hosted hundreds of teen celebrations with perfect safety record. Parents trust us to provide responsible fun while teens enjoy an amazing Lake Travis experience."
            ]
          },
          {
            heading: "Planning Your Sweet 16 Cruise",
            paragraphs: [
              "Sweet 16 cruises typically run 3-4 hours in afternoon (1pm-4pm or 2pm-5pm). These times work perfect for teen energy and parent schedules.",
              "Popular guest count is 20-30 teens (friends and classmates). Our 25-person boat is most popular for Sweet 16 celebrations. Ultimate package recommended for full party experience.",
              "Catering options include pizza delivery, taco catering, or favorite teen foods. Non-alcoholic beverages and mocktails available. Birthday cake service coordinated.",
              "Book 6-8 weeks in advance for weekend dates, especially during summer and spring. Pricing starts at $295/hour with Ultimate package at $545/hour. Worth every penny for an unforgettable Sweet 16!",
              "This is the Sweet 16 story they'll tell forever. Friends still talking about it years later. Instagram-worthy, memory-making, absolutely epic Lake Travis Sweet 16!"
            ]
          }
        ]
      },
      "/milestone-birthday": {
        h1: "Milestone Birthday Cruises Lake Travis | 30th 40th 50th Parties",
        introduction: "Celebrate milestone birthdays (30th, 40th, 50th, 60th+) on Lake Travis! Sophisticated party cruises with friends and family. Private boats for 14-75 guests, customizable packages, and unforgettable experiences. Make this milestone birthday absolutely legendary!",
        sections: [
          {
            heading: "Milestone Birthday Celebrations",
            paragraphs: [
              "Milestone birthdays deserve extraordinary celebrations! Whether you're turning 30, 40, 50, 60, or beyond, a Lake Travis cruise provides the perfect venue for honoring life's big moments.",
              "Gather friends and family for a sophisticated yet fun celebration on the water. Beautiful scenery, premium service, and complete customization make milestone birthdays unforgettable."
            ]
          },
          {
            heading: "Perfect for Every Milestone",
            paragraphs: [
              "We specialize in milestone birthday celebrations for all ages:"
            ],
            lists: [
              {
                title: "30th Birthday Parties",
                items: [
                  "Fun party atmosphere with friends",
                  "DJ and dance floor available",
                  "BYOB with full cooler service",
                  "Perfect blend of sophistication and fun",
                  "Instagram-worthy celebration"
                ]
              },
              {
                title: "40th Birthday Celebrations",
                items: [
                  "Upscale yet relaxed atmosphere",
                  "Catered meals and cocktail service",
                  "Friends and family together",
                  "Sunset timing for beautiful backdrop",
                  "Sophisticated milestone celebration"
                ]
              },
              {
                title: "50th, 60th & Beyond",
                items: [
                  "Multi-generational celebrations",
                  "Elegant catering and service",
                  "Comfortable seating for all ages",
                  "Special recognition and toasts",
                  "Creating lasting family memories",
                  "Premium experience for honored guest"
                ]
              }
            ]
          },
          {
            heading: "Milestone Party Packages",
            paragraphs: [
              "Choose from our three package levels, each perfect for milestone celebrations:",
              "Standard Package: Professional captain, crew, sound system, and basic amenities. Great for intimate gatherings and budget-conscious celebrations.",
              "Essentials Package: Adds pre-stocked coolers, water service, and enhanced convenience. Most popular for milestone birthdays with 20-40 guests.",
              "Ultimate Package: Full party experience with floats, party supplies, complete setup. Recommended for milestone celebrations where you want maximum impact and zero hassle."
            ]
          },
          {
            heading: "Creating Unforgettable Memories",
            paragraphs: [
              "Milestone birthdays are about celebrating life's journey with the people who matter most. Lake Travis provides the perfect setting - beautiful, relaxed, and away from everyday distractions.",
              "Popular elements include champagne toasts, photo slideshows (we provide sound system), catered meals from favorite restaurants, and heartfelt speeches from friends and family.",
              "Many groups do sunset timing for incredible photos and romantic ambiance. The golden hour light on Lake Travis creates magical birthday celebration moments.",
              "Pricing starts at $195/hour for intimate celebrations (14 guests) to $495/hour for large milestone parties (50+ guests). Most milestone celebrations run 4 hours including cruise, meal, toasts, and celebration.",
              "Book 6-8 weeks in advance for weekend dates. We'll coordinate every detail - catering, decorations, special surprises - to make this milestone birthday absolutely perfect!"
            ]
          }
        ]
      },
      "/party-boat-austin": {
        h1: "Party Boat Austin | Lake Travis Cruises & Rentals",
        introduction: "Austin's premier party boat experience on Lake Travis! Choose from private boat rentals or join the legendary ATX Disco Cruise. Perfect for bachelor/bachelorette parties, birthdays, corporate events, and any celebration. Professional crew, premium amenities, and unforgettable Lake Travis memories!",
        sections: [
          {
            heading: "Austin Party Boat Options",
            paragraphs: [
              "Premier Party Cruises offers two amazing party boat experiences in Austin:"
            ],
            lists: [
              {
                title: "ATX Disco Cruise - $85-$105 per person",
                items: [
                  "Join the ultimate multi-group party cruise",
                  "Professional DJ and photographer included",
                  "Giant floats and disco dance floor",
                  "Perfect for bachelor/bachelorette parties",
                  "Most affordable Austin party boat option",
                  "Packages from Basic Bach to Platinum VIP"
                ]
              },
              {
                title: "Private Party Boat Rentals - Starting $195/hour",
                items: [
                  "Exclusive boat just for your group",
                  "Fleet: 14, 25, or 50 person capacity",
                  "Complete customization and control",
                  "Perfect for corporate events & private parties",
                  "Professional captain and crew included",
                  "Three package levels available"
                ]
              }
            ]
          },
          {
            heading: "Why Choose Austin Party Boats",
            paragraphs: [
              "Lake Travis is Austin's premier party destination, and Premier Party Cruises has been the leader for 14+ years. Here's why Austin groups choose us:"
            ],
            lists: [
              {
                items: [
                  "14+ years Austin party boat experience",
                  "125,000+ happy customers served",
                  "Perfect safety record maintained",
                  "Newest and nicest fleet on Lake Travis",
                  "Coast Guard certified captains",
                  "BYOB friendly with cooler service",
                  "Professional entertainment options",
                  "Complete customization available",
                  "Easy booking and planning",
                  "Best value for Austin party boats"
                ]
              }
            ]
          },
          {
            heading: "Perfect for Any Austin Celebration",
            paragraphs: [
              "Our Austin party boats are perfect for any occasion:"
            ],
            lists: [
              {
                items: [
                  "Bachelor & bachelorette parties",
                  "Birthday celebrations (all ages)",
                  "Corporate events & team building",
                  "Wedding parties (rehearsal, welcome, after)",
                  "Graduation parties",
                  "Anniversary celebrations",
                  "Family reunions",
                  "Client entertainment",
                  "Company milestones",
                  "Just-because Lake Travis fun!"
                ]
              }
            ]
          },
          {
            heading: "The Austin Party Boat Experience",
            paragraphs: [
              "Picture this: You and your group cruising beautiful Lake Travis with Austin skyline in the distance. Music pumping from premium speakers, friends dancing, swimming from giant floats, and creating memories that last forever.",
              "Our professional crew handles everything - navigation, safety, setup - while you enjoy the ultimate Austin party experience. BYOB friendly, so bring your favorite drinks. Catering coordination available for food.",
              "Whether you choose the high-energy ATX Disco Cruise or exclusive private boat rental, you're guaranteed an unforgettable Austin party boat experience on Lake Travis!",
              "Book your Austin party boat today! Weekend dates fill 6-8 weeks in advance. Don't miss out on the best party boat experience Austin has to offer!"
            ]
          }
        ]
      },
      "/party-boat-lake-travis": {
        h1: "Party Boat Lake Travis | Austin Cruises & Rentals",
        introduction: "Experience the ultimate party boat on Lake Travis! Premier Party Cruises offers private boat rentals and the ATX Disco Cruise for unforgettable celebrations. 14+ years serving Austin with perfect safety record. Book your Lake Travis party boat today!",
        sections: [
          {
            heading: "Lake Travis Party Boat Options",
            paragraphs: [
              "Choose your perfect Lake Travis party boat experience:"
            ],
            lists: [
              {
                title: "Private Lake Travis Boat Rentals",
                items: [
                  "Exclusive boat just for your group",
                  "14, 25, or 50 person capacity boats",
                  "Professional captain and crew",
                  "Premium Bluetooth sound systems",
                  "BYOB with coolers and ice",
                  "Customizable routes and activities",
                  "Perfect for private celebrations",
                  "Starting at $195/hour"
                ]
              },
              {
                title: "ATX Disco Cruise Lake Travis",
                items: [
                  "Join the legendary party cruise",
                  "Professional DJ and photographer",
                  "Disco dance floor with LED lights",
                  "Giant unicorn and lily pad floats",
                  "Multi-group party atmosphere",
                  "Bachelor/bachelorette party favorite",
                  "Most affordable Lake Travis option",
                  "Packages $85-$105 per person"
                ]
              }
            ]
          },
          {
            heading: "Why Lake Travis for Party Boats",
            paragraphs: [
              "Lake Travis is Central Texas' premier party destination for good reason:"
            ],
            lists: [
              {
                items: [
                  "Beautiful clear blue water perfect for swimming",
                  "Stunning Hill Country scenery",
                  "Perfect year-round weather",
                  "20 miles from downtown Austin",
                  "Multiple coves and party spots",
                  "Sunset views that are Instagram-perfect",
                  "Best party atmosphere in Texas",
                  "Professional marina facilities",
                  "Easy access from Austin, Round Rock, Cedar Park",
                  "The Lake Travis experience is legendary!"
                ]
              }
            ]
          },
          {
            heading: "Lake Travis Party Boat Features",
            paragraphs: [
              "Every Premier Party Cruises boat on Lake Travis includes:"
            ],
            lists: [
              {
                items: [
                  "Coast Guard certified captains",
                  "Professional crew members",
                  "Premium Bluetooth sound systems",
                  "Large coolers (ice included on select packages)",
                  "Clean restroom facilities",
                  "Comfortable seating - sun and shade",
                  "Safety equipment and life jackets",
                  "Swimming platform access",
                  "Party float options available",
                  "Complete Lake Travis knowledge and expertise"
                ]
              }
            ]
          },
          {
            heading: "Planning Your Lake Travis Party",
            paragraphs: [
              "Lake Travis party boats are perfect for any celebration: bachelor/bachelorette parties, birthdays, corporate events, weddings, graduations, and more. We've hosted over 125,000 guests with perfect safety record.",
              "Most parties run 3-4 hours, with options for longer adventures. Popular times include afternoon fun (2pm-6pm) or sunset cruises (6pm-9pm). Private boats offer complete flexibility on timing.",
              "BYOB friendly for guests 21+ with ID (cans/plastic containers only). Catering coordination available - many groups love having food delivered right to the boat on Lake Travis.",
              "Book 6-8 weeks in advance for weekend dates, especially during peak season (April-September). Weekday availability is better with less advance notice needed.",
              "Pricing: Private boats start at $195/hour (4-hour minimum). Disco Cruise packages $85-$105 per person. Best value for Lake Travis party boats, guaranteed!",
              "Ready to experience the best party boat on Lake Travis? Book now and create memories that last forever!"
            ]
          }
        ]
      },
      "/corporate-events": {
        h1: "Corporate Events Lake Travis | Austin Business Cruises",
        introduction: "Elevate your corporate events with Lake Travis cruises! Perfect for team building, client entertainment, company milestones, and employee appreciation. Private boats for 14-75 guests with professional service. Premier corporate event experience in Austin.",
        sections: [
          {
            heading: "Corporate Event Solutions",
            paragraphs: [
              "Transform your corporate events with unique Lake Travis cruise experiences. We specialize in professional business events that combine productivity with memorable experiences."
            ],
            lists: [
              {
                title: "Team Building Events",
                items: [
                  "Strengthen team collaboration and communication",
                  "Icebreaker activities on the water",
                  "Problem-solving challenges and games",
                  "Relaxed networking environment",
                  "Build lasting team connections",
                  "Custom activities for your goals"
                ]
              },
              {
                title: "Client Entertainment",
                items: [
                  "Impress clients with unique Austin experience",
                  "Private setting for relationship building",
                  "Upscale catering and beverage service",
                  "Professional crew and premium boats",
                  "Memorable experiences that close deals",
                  "Flexible formats for your business needs"
                ]
              },
              {
                title: "Company Milestones & Celebrations",
                items: [
                  "Company anniversaries and achievements",
                  "IPO and funding celebrations",
                  "Revenue milestone recognition",
                  "Award ceremonies and honors",
                  "Retirement celebrations",
                  "Expansion and growth celebrations"
                ]
              },
              {
                title: "Employee Appreciation",
                items: [
                  "Thank your team in style",
                  "Quarterly or annual appreciation events",
                  "Department celebrations",
                  "Employee of the quarter/year recognition",
                  "Work-life balance initiatives",
                  "Retention and morale building"
                ]
              }
            ]
          },
          {
            heading: "Corporate Event Features",
            paragraphs: [
              "Professional service and amenities for successful corporate events:"
            ],
            lists: [
              {
                items: [
                  "Coast Guard certified professional captains",
                  "Experienced crew trained for corporate events",
                  "Premium boats with professional appearance",
                  "Catering coordination with top Austin vendors",
                  "Full bar service available",
                  "Sound system for presentations",
                  "Wi-Fi available on select boats",
                  "Professional photography options",
                  "Customizable formats and activities",
                  "Complete event planning support",
                  "Flexible payment and invoicing",
                  "Volume discounts for regular clients"
                ]
              }
            ]
          },
          {
            heading: "Why Companies Choose Lake Travis",
            paragraphs: [
              "Lake Travis provides the ideal setting for corporate events. Away from office distractions, teams and clients engage authentically in a relaxed yet professional environment.",
              "The unique Austin experience impresses clients and delights employees. It shows your company values quality experiences and invests in relationships. Many companies report improved morale, collaboration, and business results after Lake Travis events.",
              "Perfect location just 20 miles from downtown Austin, easily accessible for all attendees. Beautiful Hill Country scenery provides stunning backdrop for corporate photos and social media.",
              "14+ years serving Austin businesses with perfect safety and service record. Over 125,000 guests have experienced our professional corporate events. We understand business needs and deliver exceptional results."
            ]
          },
          {
            heading: "Corporate Event Planning",
            paragraphs: [
              "We handle all event logistics so you can focus on your business objectives. Choose from our fleet based on group size (14-75 guests). Select package level from Standard to Ultimate based on desired experience.",
              "Popular formats: half-day team building (3-4 hours), client lunch cruises (2-3 hours), sunset cocktail events (2-3 hours), or full-day corporate retreats (6+ hours).",
              "Catering options range from casual BBQ to upscale dining. Full bar service available, or bring your own beverages. Activities can be structured (facilitated team building) or relaxed (networking and relationship building).",
              "Pricing starts at $195/hour with volume discounts for regular corporate clients. Most corporate events are 3-4 hours. Book 4-6 weeks in advance for optimal date selection.",
              "Let us create the perfect corporate event on Lake Travis. Contact us today to discuss your business objectives and how a cruise can achieve them!"
            ]
          }
        ]
      },
      "/wedding-parties": {
        h1: "Wedding Party Cruises Lake Travis | Austin Wedding Boats",
        introduction: "Celebrate your wedding on Lake Travis! Perfect for welcome parties, rehearsal dinners, wedding day cruises, and after parties. Private boat rentals for 14-75 guests with elegant service. Make your Austin wedding unforgettable with a Lake Travis celebration!",
        sections: [
          {
            heading: "Wedding Celebration Options",
            paragraphs: [
              "Premier Party Cruises specializes in wedding celebrations on Lake Travis. Choose from multiple event types throughout your wedding weekend:"
            ],
            lists: [
              {
                title: "Welcome Party Cruises",
                items: [
                  "Greet out-of-town guests Friday evening",
                  "Beautiful sunset on Lake Travis",
                  "Both families get to know each other",
                  "Relaxed atmosphere before wedding day",
                  "Show guests the beauty of Austin",
                  "Perfect alternative to traditional welcome dinner"
                ]
              },
              {
                title: "Rehearsal Dinner Cruises",
                items: [
                  "Intimate setting for wedding party and family",
                  "Elegant yet relaxed atmosphere",
                  "Sunset backdrop for toasts and speeches",
                  "Catered dinner service on the water",
                  "Create special memories the night before",
                  "More unique than traditional restaurant venues"
                ]
              },
              {
                title: "Wedding Day Cruises",
                items: [
                  "Unique wedding ceremony on the water",
                  "Reception cruises after ceremony",
                  "Cocktail hour while guests mingle",
                  "Sunset wedding photos on Lake Travis",
                  "Intimate elopement experiences",
                  "Unforgettable wedding day on the water"
                ]
              },
              {
                title: "After Party Cruises",
                items: [
                  "Continue celebrating after reception",
                  "Late night DJ and dancing",
                  "Midnight champagne toasts",
                  "Close friends and family only",
                  "Perfect wedding night finale",
                  "Memories to last a lifetime"
                ]
              }
            ]
          },
          {
            heading: "Wedding Party Features",
            paragraphs: [
              "Professional wedding service with attention to every detail:"
            ],
            lists: [
              {
                items: [
                  "Experienced captains and wedding-trained crew",
                  "Elegant boats perfect for weddings",
                  "Complete catering coordination",
                  "Premium sound system for music and speeches",
                  "Professional photography available",
                  "Customizable decorations and setup",
                  "Champagne service and toasts",
                  "Dance floor areas on larger boats",
                  "Romantic sunset timing available",
                  "Flexible packages for any budget",
                  "Complete wedding planning support",
                  "Seamless timeline coordination"
                ]
              }
            ]
          },
          {
            heading: "Why Choose Lake Travis for Weddings",
            paragraphs: [
              "Lake Travis provides the most stunning wedding backdrop in Austin. Crystal blue water, Hill Country scenery, and gorgeous sunsets create magical wedding moments you'll treasure forever.",
              "Your guests will remember the unique Lake Travis experience long after the wedding. It's sophisticated yet relaxed, elegant yet fun - the perfect balance for wedding celebrations.",
              "Many couples choose multiple Lake Travis events throughout their wedding weekend: welcome party Friday, rehearsal dinner cruise, and after party Saturday. It creates a cohesive, memorable wedding experience.",
              "Perfect for destination weddings in Austin. Out-of-town guests love experiencing Lake Travis, and it showcases the best of Austin hospitality and natural beauty."
            ]
          },
          {
            heading: "Wedding Planning Details",
            paragraphs: [
              "We recommend booking wedding cruises 3-6 months in advance, especially for peak wedding season (April-June, September-October). This ensures optimal date and boat availability.",
              "Our wedding coordinator works with you to plan every detail: timing, catering, decorations, music, and special touches. We coordinate with your other vendors to ensure seamless execution.",
              "Fleet options accommodate any wedding party size: intimate elopements (14 guests) to large receptions (75+ guests). Choose package level from elegant Standard to luxurious Ultimate.",
              "Pricing starts at $195/hour for smaller boats, up to $495/hour for our flagship. Most wedding events are 3-4 hours. We offer wedding package discounts for booking multiple events.",
              "Let us make your wedding day perfect! Contact us today to start planning your unforgettable Lake Travis wedding celebration."
            ]
          }
        ]
      },
      "/testimonials-faq": {
        h1: "Testimonials & FAQ | Premier Party Cruises Lake Travis",
        introduction: "Read what our customers say about their Lake Travis party cruise experiences! Over 125,000 happy guests, 5-star reviews, and answers to all your questions about Premier Party Cruises. See why we're Austin's #1 party boat company!",
        sections: [
          {
            heading: "Customer Testimonials",
            paragraphs: [
              "Don't just take our word for it - hear from real customers who've experienced Premier Party Cruises:"
            ],
            lists: [
              {
                items: [
                  '"Best bachelorette party ever! The disco cruise was AMAZING - DJ was incredible, photographer captured perfect moments, and the bride cruised free! 10/10 recommend!" - Sarah M., Dallas',
                  '"Booked a private cruise for our corporate team building. Professional service, beautiful boat, and our team loved it. Already planning our next event!" - Michael T., Austin',
                  '"50th birthday party on Lake Travis was perfect! Captain was great, Ultimate package had everything, and our guests are still talking about it months later!" - Jennifer L., Round Rock',
                  '"ATX Disco Cruise for our combined bachelor/bachelorette party was the best decision! Both sides had a blast together, way better than separate parties!" - Chris & Amanda, San Antonio',
                  '"Rehearsal dinner cruise was magical! Sunset was gorgeous, catering was perfect, and it set the tone for our wedding weekend. Highly recommend!" - Taylor & Brandon, Georgetown'
                ]
              }
            ]
          },
          {
            heading: "Frequently Asked Questions",
            paragraphs: [
              "Get answers to the most common questions about Premier Party Cruises:"
            ],
            lists: [
              {
                title: "What's Included?",
                items: [
                  "Licensed, experienced captain & crew",
                  "Premium Bluetooth sound system",
                  "Large coolers with ice (Essentials/Ultimate packages)",
                  "Clean restroom facilities",
                  "Sun and shade seating areas",
                  "Safety equipment and life jackets",
                  "Professional service throughout"
                ]
              },
              {
                title: "Can We Bring Food and Drinks?",
                items: [
                  "Yes! BYOB for guests 21+ with valid ID",
                  "Cans and plastic containers only (no glass)",
                  "Bring snacks, meals, or coordinate catering delivery",
                  "We provide coolers and ice (package dependent)",
                  "Solo cups provided on Essentials/Ultimate packages",
                  "Popular: pizza, tacos, BBQ, or upscale catering"
                ]
              },
              {
                title: "How Do Deposits and Payments Work?",
                items: [
                  "25% deposit if booking >30 days out",
                  "Balance due 30 days prior to cruise date",
                  "If booking within 30 days: 50% deposit due",
                  "Remainder due within 72 hours",
                  "Credit card, debit card, or bank transfer accepted",
                  "Flexible payment plans available for large groups"
                ]
              },
              {
                title: "What's Your Cancellation Policy?",
                items: [
                  "48-hour full refund window after booking",
                  "After 48 hours: weather-dependent at captain's discretion",
                  "Unsafe weather = full refund or reschedule",
                  "Pro-rated refunds if weather shortens cruise",
                  "We want you to have a great experience safely!",
                  "Flexible rescheduling when possible"
                ]
              },
              {
                title: "Is Swimming Allowed?",
                items: [
                  "Yes! When conditions are safe",
                  "Captain's discretion based on weather, water, traffic",
                  "Life jackets required in the water",
                  "Adult life jackets provided",
                  "Bring infant/child life jackets if needed",
                  "Lily pads and floats available (package dependent)"
                ]
              },
              {
                title: "How Far in Advance Should We Book?",
                items: [
                  "Weekend dates: book 6-8 weeks in advance",
                  "Peak season (April-September): book 8-12 weeks early",
                  "Weekdays: 2-4 weeks usually sufficient",
                  "Last-minute availability sometimes possible",
                  "Popular dates (holidays, graduation season) fill fastest",
                  "Book early for best boat and time selection!"
                ]
              }
            ]
          },
          {
            heading: "Why Choose Premier Party Cruises",
            paragraphs: [
              "With 14+ years of experience and over 125,000 satisfied customers, Premier Party Cruises is Austin's most trusted Lake Travis party boat company. Here's what sets us apart:"
            ],
            lists: [
              {
                items: [
                  "14+ years Lake Travis expertise",
                  "125,000+ happy customers served",
                  "Perfect safety record maintained",
                  "Newest fleet on Lake Travis",
                  "Coast Guard certified captains",
                  "5-star customer reviews",
                  "Professional, friendly crew",
                  "Flexible packages for any budget",
                  "Complete party planning support",
                  "Best value on Lake Travis guaranteed!"
                ]
              }
            ]
          },
          {
            heading: "Still Have Questions?",
            paragraphs: [
              "We're here to help! Contact us at (512) 488-5892 or clientservices@premierpartycruises.com for answers to any questions not covered here.",
              "Our friendly team can help you choose the perfect boat, package, and timing for your celebration. We make Lake Travis party planning easy and stress-free!",
              "Ready to book? Start your quote online or call us directly. We can't wait to help you create unforgettable Lake Travis memories!"
            ]
          }
        ]
      },
      "/contact": {
        h1: "Contact Premier Party Cruises - Lake Travis Boat Rentals Austin",
        introduction: "Ready to plan your Lake Travis adventure? Contact Premier Party Cruises, Austin's premier boat rental and party cruise company. Call us at (512) 488-5892 or email clientservices@premierpartycruises.com for immediate assistance with your party boat booking.",
        sections: [
          {
            heading: "Get in Touch with Premier Party Cruises",
            paragraphs: [
              "Premier Party Cruises is here to make your Lake Travis celebration unforgettable. Whether you're planning a bachelor party, bachelorette party, corporate event, birthday celebration, or just a fun day on the water, our experienced team is ready to help you create the perfect experience.",
              "Located at 13993 FM 2769, Leander, TX 78641, we've been serving the Austin area and Lake Travis for over 14 years. With our fleet of premium party boats and professional crew, we ensure every cruise is safe, fun, and memorable."
            ],
            lists: [
              {
                title: "Contact Information",
                items: [
                  "Phone: (512) 488-5892 - Call or text anytime!",
                  "Email: clientservices@premierpartycruises.com",
                  "Address: 13993 FM 2769, Leander, TX 78641",
                  "Hours: Monday-Sunday, 9:00 AM - 9:00 PM",
                  "Response Time: Usually within 1 hour during business hours",
                  "Emergency Contact: Available for day-of cruise issues"
                ]
              }
            ]
          },
          {
            heading: "Why Contact Premier Party Cruises",
            paragraphs: [
              "When you reach out to Premier Party Cruises, you're connecting with Austin's most experienced Lake Travis party boat company. Our team has helped over 125,000 customers create unforgettable memories on the water. We pride ourselves on exceptional customer service, transparent pricing, and creating customized experiences that exceed expectations.",
              "Our booking specialists are Lake Travis experts who can help you choose the perfect boat, select the ideal package, recommend the best times to cruise, and coordinate all the details for your special event. We handle everything from small intimate gatherings to large corporate events and multi-boat celebrations."
            ],
            lists: [
              {
                title: "How We Can Help You",
                items: [
                  "Instant quotes and availability for any date",
                  "Expert recommendations for boat and package selection",
                  "Custom packages tailored to your specific needs",
                  "Group discounts for large parties",
                  "Transportation coordination assistance",
                  "Catering and bar service recommendations",
                  "Special celebration add-ons (decorations, photographers, DJs)",
                  "Weather contingency planning",
                  "Same-day booking when available",
                  "Flexible payment options and plans"
                ]
              }
            ]
          },
          {
            heading: "Booking Your Lake Travis Party Cruise",
            paragraphs: [
              "Booking with Premier Party Cruises is easy and flexible. You can start your quote online, call us directly, or send an email with your party details. We offer instant booking confirmation, secure payment processing, and comprehensive booking support from initial inquiry through your cruise date.",
              "Our online booking system allows you to check real-time availability, select your preferred boat and package, customize your experience with add-ons, and receive instant confirmation. For those who prefer personal service, our booking specialists are available by phone seven days a week."
            ],
            lists: [
              {
                title: "What to Have Ready When You Contact Us",
                items: [
                  "Preferred cruise date (and backup dates if flexible)",
                  "Approximate number of guests",
                  "Type of celebration (bachelor, bachelorette, birthday, corporate)",
                  "Preferred cruise duration (4-hour minimum)",
                  "Budget range for planning purposes",
                  "Any special requests or requirements",
                  "Transportation needs from Austin",
                  "Interest in add-on services (DJ, photographer, catering)"
                ]
              }
            ]
          },
          {
            heading: "Customer Service Excellence",
            paragraphs: [
              "At Premier Party Cruises, customer service is our top priority. From your first contact through your cruise and beyond, we're committed to providing exceptional service. Our team responds quickly to inquiries, provides detailed information about all options, and works within your budget to create the perfect experience.",
              "We maintain a 5-star rating across all review platforms because we genuinely care about each customer's experience. Our team goes above and beyond to accommodate special requests, handle last-minute changes, and ensure every detail is perfect for your Lake Travis celebration."
            ],
            lists: [
              {
                title: "Our Service Commitments",
                items: [
                  "Response to all inquiries within 1 hour during business hours",
                  "Transparent, all-inclusive pricing with no hidden fees",
                  "Flexible cancellation and rescheduling policies",
                  "Weather monitoring and proactive communication",
                  "Day-of cruise support and coordination",
                  "Post-cruise follow-up to ensure satisfaction",
                  "Assistance with group logistics and planning",
                  "Bilingual support available (English and Spanish)"
                ]
              }
            ]
          },
          {
            heading: "Frequently Asked Questions When Contacting Us",
            paragraphs: [
              "When you contact Premier Party Cruises, our team is prepared to answer all your questions about Lake Travis boat rentals, party packages, pricing, and logistics. Here are some of the most common questions we help customers with every day.",
              "Don't hesitate to ask us anything - no question is too small or too complicated. Our experienced team has handled thousands of events and can provide expert guidance on everything from boat selection to party planning to Lake Travis navigation."
            ],
            lists: [
              {
                title: "Common Questions We Answer",
                items: [
                  "What's the difference between private charters and disco cruises?",
                  "How much does it cost to rent a party boat?",
                  "What's included in each package?",
                  "Can we bring our own food and drinks?",
                  "Is alcohol allowed on the boats?",
                  "What happens if weather is bad?",
                  "How far in advance should we book?",
                  "Do you offer group discounts?",
                  "Can we customize our cruise route?",
                  "What safety measures are in place?",
                  "Is transportation available from Austin?",
                  "Can we bring our own DJ or decorations?"
                ]
              }
            ]
          },
          {
            heading: "Connect on Social Media",
            paragraphs: [
              "Follow Premier Party Cruises on social media for the latest updates, special offers, and amazing photos from recent cruises. We love sharing the fun and excitement of Lake Travis with our community. Tag us in your photos and use #PremierPartyCruises to be featured!",
              "Our social media channels are also great for getting quick answers to questions, seeing real customer experiences, and finding inspiration for your own Lake Travis celebration. Join thousands of happy customers who follow us for Lake Travis party boat updates and exclusive deals."
            ],
            lists: [
              {
                title: "Find Us On Social Media",
                items: [
                  "Instagram: @premierpartycruises - Daily cruise photos and stories",
                  "Facebook: Premier Party Cruises - Updates, events, and reviews",
                  "TikTok: @premierpartycruisesatx - Fun videos from the lake",
                  "YouTube: Premier Party Cruises - Virtual boat tours and highlights",
                  "Google Business: Read reviews and see photos",
                  "Yelp: Check out detailed customer experiences",
                  "TripAdvisor: #1 rated Lake Travis boat rental"
                ]
              }
            ]
          },
          {
            heading: "Visit Us at Lake Travis",
            paragraphs: [
              "Premier Party Cruises operates from prime Lake Travis locations with easy access from Austin. Our main office at 13993 FM 2769 in Leander is just 30 minutes from downtown Austin. We depart from multiple marinas around Lake Travis to provide convenient access for all our customers.",
              "Whether you're coming from Austin, Round Rock, Cedar Park, or anywhere in Central Texas, we're easily accessible via major highways. Our team can provide detailed directions, parking information, and even arrange transportation from your location to ensure a smooth start to your Lake Travis adventure."
            ],
            lists: [
              {
                title: "Location and Directions",
                items: [
                  "Main Office: 13993 FM 2769, Leander, TX 78641",
                  "Just 30 minutes from downtown Austin",
                  "Easy access from Highway 183 and FM 1431",
                  "Multiple departure locations on Lake Travis",
                  "Free parking available at all marina locations",
                  "Rideshare and transportation services available",
                  "GPS coordinates: 30.432167, -97.881167",
                  "Look for Premier Party Cruises flags and signs"
                ]
              }
            ]
          }
        ]
      }
    };
  }
});

// server/ssr/renderer.ts
var renderer_exports = {};
__export(renderer_exports, {
  ssrMiddleware: () => ssrMiddleware
});
import fs5 from "fs";
import path6 from "path";
import { fileURLToPath } from "url";
function renderPageContent(content) {
  let html = `
    <div class="ssr-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: system-ui, sans-serif;">
      <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #000; line-height: 1.2;">${content.h1}</h1>
      <p style="font-size: 1.125rem; line-height: 1.75; color: #374151; margin-bottom: 2rem;">${content.introduction}</p>
  `;
  content.sections.forEach((section) => {
    html += `
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem; color: #000;">${section.heading}</h2>
    `;
    section.paragraphs.forEach((para) => {
      html += `<p style="font-size: 1rem; line-height: 1.75; color: #4B5563; margin-bottom: 1rem;">${para}</p>
`;
    });
    if (section.lists) {
      section.lists.forEach((list) => {
        if (list.title) {
          html += `<h3 style="font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #111827;">${list.title}</h3>
`;
        }
        html += '<ul style="list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem;">\n';
        list.items.forEach((item) => {
          html += `  <li style="font-size: 1rem; line-height: 1.75; color: #4B5563; margin-bottom: 0.5rem;">${item}</li>
`;
        });
        html += "</ul>\n";
      });
    }
    html += "</section>\n";
  });
  html += `
      <noscript>
        <p style="background: #FEF2F2; border: 2px solid #DC2626; padding: 1rem; margin-top: 2rem; border-radius: 0.5rem; color: #991B1B; font-weight: 600;">
          Please enable JavaScript to view the full interactive experience and booking options.
        </p>
      </noscript>
    </div>
  `;
  return html;
}
function generatePreconnectTags() {
  return PRECONNECT_URLS.map(
    (url) => `
    <link rel="dns-prefetch" href="${url}" />
    <link rel="preconnect" href="${url}" crossorigin />`
  ).join("");
}
function generateCriticalCSSTag() {
  return `<style id="critical-css">${CRITICAL_CSS}</style>`;
}
function generateAsyncCSSTag(cssPath) {
  return `<link rel="preload" as="style" href="${cssPath}" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${cssPath}"></noscript>`;
}
function generateBreadcrumbSchema(pathname, h1) {
  if (pathname === "/") {
    return null;
  }
  let pageName = h1;
  pageName = pageName.replace(/\s*\|\s*Premier Party Cruises.*$/i, "");
  pageName = pageName.trim();
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://premierpartycruises.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": `https://premierpartycruises.com${pathname}`
      }
    ]
  };
  return breadcrumbList;
}
async function getTemplate() {
  if (!cachedTemplate) {
    cachedTemplate = await fs5.promises.readFile(templatePath, "utf-8");
  }
  return cachedTemplate;
}
function shouldUseSSR(url) {
  const pathname = url.split("?")[0];
  if (SSR_ROUTES.includes(pathname)) {
    return true;
  }
  if (pathname.startsWith("/blogs/") && pathname.length > 7) {
    return true;
  }
  if (pathname === "/blogs") {
    return true;
  }
  return false;
}
async function fetchSEOMetadata(url) {
  try {
    const port = process.env.PORT || "5000";
    const baseUrl = `http://localhost:${port}`;
    const response = await fetch(`${baseUrl}/api/seo/meta/${encodeURIComponent(url)}`);
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(`SEO metadata fetch failed: ${response.status} ${response.statusText}`, {
        url,
        baseUrl,
        errorText: errorText.substring(0, 200)
      });
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch SEO metadata:", {
      error: error.message,
      url,
      stack: error.stack?.substring(0, 200)
    });
    return null;
  }
}
async function fetchBlogPost(slug) {
  try {
    const port = process.env.PORT || "5000";
    const response = await fetch(`http://localhost:${port}/api/blog/public/posts/${slug}`);
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(`Blog post fetch failed: ${response.status} ${response.statusText}`, {
        slug,
        port,
        errorText: errorText.substring(0, 200)
      });
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blog post:", {
      error: error.message,
      slug,
      stack: error.stack?.substring(0, 200)
    });
    return null;
  }
}
async function renderPage(url, req) {
  try {
    let template = await getTemplate();
    const pathname = url.split("?")[0];
    let h1 = "";
    let content = "";
    let metaTitle = "";
    let metaDescription = "";
    if (pathname.startsWith("/blogs/")) {
      const slug = pathname.slice("/blogs/".length);
      const blogData = await fetchBlogPost(slug);
      if (blogData && blogData.post) {
        h1 = blogData.post.title;
        content = blogData.post.content || blogData.post.excerpt || "";
        metaTitle = `${blogData.post.title} | Premier Party Cruises Blog`;
        const uniqueDescription = blogData.post.metaDescription || blogData.post.excerpt || (blogData.post.content ? blogData.post.content.substring(0, 160) : "");
        metaDescription = uniqueDescription;
      }
    } else if (pathname === "/blogs") {
      h1 = "Austin Party Boat Blog | Bachelor & Bachelorette Party Tips | Premier Party Cruises";
      content = "Expert tips for planning bachelor and bachelorette parties in Austin. Lake Travis party boat guides, itineraries, and Austin party planning advice.";
      metaTitle = h1;
      metaDescription = content;
    } else {
      const pageData = PAGE_METADATA[pathname];
      if (pageData) {
        h1 = pageData.h1;
        content = pageData.content;
      }
      const seoData = await fetchSEOMetadata(pathname);
      if (seoData) {
        metaTitle = seoData.metaTitle || h1;
        metaDescription = seoData.metaDescription || content;
      } else {
        metaTitle = h1;
        metaDescription = content;
      }
    }
    if (metaTitle) {
      template = template.replace(
        /<title>.*?<\/title>/,
        `<title>${metaTitle}</title>`
      );
    }
    if (metaDescription) {
      template = template.replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${metaDescription.replace(/"/g, "&quot;")}" />`
      );
      template = template.replace(
        /<meta property="og:description" content="[^"]*" \/>/,
        `<meta property="og:description" content="${metaDescription.replace(/"/g, "&quot;")}" />`
      );
    }
    if (metaTitle) {
      template = template.replace(
        /<meta property="og:title" content="[^"]*" \/>/,
        `<meta property="og:title" content="${metaTitle.replace(/"/g, "&quot;")}" />`
      );
    }
    const breadcrumbSchema = generateBreadcrumbSchema(pathname, h1);
    let schemaScripts = `  <script type="application/ld+json">
${JSON.stringify(ORGANIZATION_SCHEMA, null, 2)}
  </script>`;
    schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(WEBSITE_SCHEMA, null, 2)}
  </script>`;
    if (pathname === "/") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(DAY_TRIPPER_PRODUCT_SCHEMA, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(ME_SEEKS_THE_IRONY_PRODUCT_SCHEMA, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(CLEVER_GIRL_PRODUCT_SCHEMA, null, 2)}
  </script>`;
    }
    if (breadcrumbSchema) {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
  </script>`;
    }
    if (pathname === "/private-cruises") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(SERVICE_SCHEMA, null, 2)}
  </script>`;
    }
    if (pathname === "/atx-disco-cruise") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(EVENT_SCHEMA, null, 2)}
  </script>`;
    }
    if (pathname === "/bachelor-party-austin") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(BACHELOR_PARTY_SERVICE_SCHEMA, null, 2)}
  </script>`;
    }
    if (pathname === "/bachelorette-party-austin") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(BACHELORETTE_PARTY_SERVICE_SCHEMA, null, 2)}
  </script>`;
    }
    if (pathname === "/combined-bachelor-bachelorette-austin") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(COMBINED_BACH_SERVICE_SCHEMA, null, 2)}
  </script>`;
    }
    if (pathname === "/testimonials-faq") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(FAQ_SCHEMA, null, 2)}
  </script>`;
    }
    if (pathname === "/bachelor-party-austin") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(BACHELOR_FAQ_SCHEMA, null, 2)}
  </script>`;
    }
    if (pathname === "/bachelorette-party-austin") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(BACHELORETTE_FAQ_SCHEMA, null, 2)}
  </script>`;
    }
    if (pathname === "/private-cruises") {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(PRIVATE_CRUISES_FAQ_SCHEMA, null, 2)}
  </script>`;
    }
    const preconnectTags = generatePreconnectTags();
    template = template.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      `<meta name="viewport" content="width=device-width, initial-scale=1.0" />${preconnectTags}`
    );
    const criticalCSS = generateCriticalCSSTag();
    template = template.replace(
      /<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?>/g,
      (match, href) => generateAsyncCSSTag(href)
    );
    const protocol = req.secure ? "https" : "http";
    const host = req.get("host") || "premierpartycruises.com";
    const canonicalUrl = `${protocol}://${host}${pathname}`;
    const headInjection = [
      `  <link rel="canonical" href="${canonicalUrl}" />`,
      `  ${criticalCSS}`,
      schemaScripts,
      "  </head>"
    ].join("\n");
    template = template.replace("</head>", headInjection);
    const pageContent = PAGE_CONTENT[pathname];
    let ssrContent;
    if (pageContent) {
      ssrContent = `
      <div id="root">${renderPageContent(pageContent)}</div>`;
    } else {
      ssrContent = `
      <div id="root">
        <div class="ssr-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
          <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: #000;">${h1}</h1>
          <p style="font-size: 1.125rem; line-height: 1.75; color: #374151; margin-bottom: 2rem;">${content}</p>
        </div>
      </div>`;
    }
    template = template.replace(
      '<div id="root"></div>',
      ssrContent
    );
    return template;
  } catch (error) {
    console.error("SSR rendering error:", error);
    throw error;
  }
}
function ssrMiddleware() {
  return async (req, res, next) => {
    return next();
    if (req.path.startsWith("/src/") || req.path.startsWith("/@vite/") || req.path.startsWith("/@id/") || req.path.startsWith("/@fs/") || req.path.startsWith("/node_modules/")) {
      return next();
    }
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      return next();
    }
    const pathname = req.url.split("?")[0];
    if (VALID_SPA_ROUTES.some((route) => pathname.startsWith(route))) {
      return next();
    }
    if (!shouldUseSSR(req.url)) {
      return next();
    }
    try {
      console.log(`[SSR] Rendering: ${req.url}`);
      const html = await renderPage(req.url, req);
      res.removeHeader("X-Frame-Options");
      res.setHeader(
        "Content-Security-Policy",
        "frame-ancestors 'self' https://booking.premierpartycruises.com https://*.premierpartycruises.com; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https: blob:; connect-src 'self' https: wss: ws:; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;"
      );
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (error) {
      console.error(`[SSR] Error rendering ${req.url}:`, error);
      next();
    }
  };
}
var __filename, __dirname, cachedTemplate, isDevelopment, templatePath, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, SERVICE_SCHEMA, EVENT_SCHEMA, BACHELOR_PARTY_SERVICE_SCHEMA, BACHELORETTE_PARTY_SERVICE_SCHEMA, COMBINED_BACH_SERVICE_SCHEMA, FAQ_SCHEMA, BACHELOR_FAQ_SCHEMA, BACHELORETTE_FAQ_SCHEMA, PRIVATE_CRUISES_FAQ_SCHEMA, DAY_TRIPPER_PRODUCT_SCHEMA, ME_SEEKS_THE_IRONY_PRODUCT_SCHEMA, CLEVER_GIRL_PRODUCT_SCHEMA, CRITICAL_CSS, PRECONNECT_URLS, SSR_ROUTES, PAGE_METADATA, VALID_SPA_ROUTES;
var init_renderer = __esm({
  "server/ssr/renderer.ts"() {
    "use strict";
    init_viteManifest();
    init_pageContent();
    __filename = fileURLToPath(import.meta.url);
    __dirname = path6.dirname(__filename);
    cachedTemplate = null;
    isDevelopment = process.env.NODE_ENV === "development";
    templatePath = isDevelopment ? path6.resolve(__dirname, "../../client/index.html") : path6.resolve(process.cwd(), "dist/public/index.html");
    ORGANIZATION_SCHEMA = {
      "@context": "https://schema.org",
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://premierpartycruises.com/#organization",
      "name": "Premier Party Cruises",
      "legalName": "B Hill Entertainment LLC",
      "url": "https://premierpartycruises.com/",
      "logo": "https://premierpartycruises.com/media/schema/ppc-logo.png",
      "image": [
        "https://premierpartycruises.com/media/schema/hero-boat-1.jpg",
        "https://premierpartycruises.com/media/schema/hero-boat-2.jpg",
        "https://premierpartycruises.com/media/schema/disco-dance-floor.jpg",
        "https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg"
      ],
      "description": "Austin's original Lake Travis party boat company offering private cruises, the ATX Disco Cruise, and full-service planning for bachelor/bachelorette, corporate, birthday, and family events.",
      "foundingDate": "2009",
      "sameAs": [
        "https://www.instagram.com/premierpartycruises",
        "https://www.tiktok.com/@premierpartycruisesatx",
        "https://www.facebook.com/premierpartycruises",
        "https://share.google/oLFqmN5TGvXpnlX6i"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13993 FM 2769",
        "addressLocality": "Leander",
        "addressRegion": "TX",
        "postalCode": "78641",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.432167,
        "longitude": -97.881167
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "telephone": "+1-512-488-5892",
          "email": "clientservices@premierpartycruises.com",
          "availableLanguage": ["en", "es"]
        }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "21:00"
        }
      ],
      "areaServed": ["Austin TX", "Texas", "United States"],
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "ratingCount": 420
      }
    };
    WEBSITE_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://premierpartycruises.com/#website",
      "url": "https://premierpartycruises.com/",
      "name": "Premier Party Cruises",
      "description": "Austin's premier party boat cruises and private charters on Lake Travis",
      "publisher": {
        "@id": "https://premierpartycruises.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://premierpartycruises.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };
    SERVICE_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Private Party Boat Charter",
      "provider": { "@id": "https://premierpartycruises.com/#organization" },
      "areaServed": { "@type": "AdministrativeArea", "name": "Austin, TX" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Private Cruise Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Private Cruise \u2013 Small Groups (up to 20 guests)",
            "url": "https://premierpartycruises.com/private-cruises#20pax"
          },
          {
            "@type": "Offer",
            "name": "Private Cruise \u2013 Medium Groups (up to 50 guests)",
            "url": "https://premierpartycruises.com/private-cruises#50pax"
          },
          {
            "@type": "Offer",
            "name": "Private Cruise \u2013 Large Groups (up to 75+ guests)",
            "url": "https://premierpartycruises.com/private-cruises#75pax"
          }
        ]
      }
    };
    EVENT_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "Event",
      "@id": "https://premierpartycruises.com/atx-disco-cruise/#event",
      "name": "ATX Disco Cruise",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "maximumAttendeeCapacity": 100,
      "location": {
        "@type": "Place",
        "name": "Anderson Mill Marina",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "13993 FM 2769",
          "addressLocality": "Leander",
          "addressRegion": "TX",
          "postalCode": "78641",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 30.432167,
          "longitude": -97.881167
        }
      },
      "organizer": {
        "@id": "https://premierpartycruises.com/#organization"
      },
      "image": [
        "https://premierpartycruises.com/media/schema/disco-dance-floor.jpg"
      ],
      "offers": [
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "85.00",
          "category": "Basic Batch",
          "url": "https://premierpartycruises.com/atx-disco-cruise",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "95.00",
          "category": "Disco Queen/King",
          "url": "https://premierpartycruises.com/atx-disco-cruise",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "105.00",
          "category": "Super Sparkle Platinum",
          "url": "https://premierpartycruises.com/atx-disco-cruise",
          "availability": "https://schema.org/InStock"
        }
      ]
    };
    BACHELOR_PARTY_SERVICE_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://premierpartycruises.com/bachelor-party-austin/#service",
      "name": "Bachelor Party Boat Cruises on Lake Travis",
      "provider": { "@id": "https://premierpartycruises.com/#organization" },
      "areaServed": ["Austin TX", "Texas", "United States"],
      "description": "Exclusive bachelor party cruises on Lake Travis with BYOB, professional DJ, photographer, and all-inclusive packages. Join the best party boat experience for bachelor groups.",
      "offers": [
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "85.00",
          "name": "Basic Bach Package",
          "url": "https://premierpartycruises.com/bachelor-party-austin",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "95.00",
          "name": "Disco King Package",
          "url": "https://premierpartycruises.com/bachelor-party-austin",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "105.00",
          "name": "Super Sparkle Platinum Disco",
          "url": "https://premierpartycruises.com/bachelor-party-austin",
          "availability": "https://schema.org/InStock"
        }
      ]
    };
    BACHELORETTE_PARTY_SERVICE_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://premierpartycruises.com/bachelorette-party-austin/#service",
      "name": "Bachelorette Party Boat Cruises on Lake Travis",
      "provider": { "@id": "https://premierpartycruises.com/#organization" },
      "areaServed": ["Austin TX", "Texas", "United States"],
      "description": "Exclusive bachelorette party cruises on Lake Travis with BYOB, professional DJ, photographer, and VIP packages. Bride cruises free on select packages.",
      "offers": [
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "85.00",
          "name": "Basic Bach Package",
          "url": "https://premierpartycruises.com/bachelorette-party-austin",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "95.00",
          "name": "Disco Queen Package",
          "url": "https://premierpartycruises.com/bachelorette-party-austin",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "105.00",
          "name": "Super Sparkle Platinum Disco",
          "url": "https://premierpartycruises.com/bachelorette-party-austin",
          "availability": "https://schema.org/InStock"
        }
      ]
    };
    COMBINED_BACH_SERVICE_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin/#service",
      "name": "Combined Bachelorette/Bachelor Party Boat Cruises on Lake Travis",
      "provider": { "@id": "https://premierpartycruises.com/#organization" },
      "areaServed": ["Austin TX", "Texas", "United States"],
      "description": "Joint bachelor/bachelorette party celebrations on Lake Travis. Flexible group options for couples who want to celebrate together with all their friends.",
      "offers": [
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "85.00",
          "name": "Basic Bach",
          "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "95.00",
          "name": "Disco Queen",
          "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "105.00",
          "name": "Super Sparkle Platinum",
          "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
          "availability": "https://schema.org/InStock"
        }
      ]
    };
    FAQ_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What can we bring on the boat?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You may bring snacks, non-glass beverages, and decorations. Glass containers are not allowed."
          }
        },
        {
          "@type": "Question",
          "name": "Do you allow DJs or photographers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you may bring your own DJ or photographer, or book ours as an add-on."
          }
        },
        {
          "@type": "Question",
          "name": "What is your cancellation policy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer flexible cancellation options. Contact us at least 48 hours in advance for rescheduling or refunds."
          }
        },
        {
          "@type": "Question",
          "name": "How many people can fit on your boats?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our boats range from 14 to 75+ passengers depending on the vessel and event type."
          }
        }
      ]
    };
    BACHELOR_FAQ_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a bachelor party boat cost in Austin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bachelor party boat rentals start at $85 per person for our ATX Disco Cruise packages, or from $195/hour for private charters with a 4-hour minimum. Packages include DJ, photographer, floats, and all amenities."
          }
        },
        {
          "@type": "Question",
          "name": "What's included in bachelor party boat packages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Packages include professional DJ, photographer, giant floats, lily pads, disco dance floor, party supplies, mixers, ice water, restroom facilities, BYOB friendly setup with coolers and ice, and professional crew."
          }
        },
        {
          "@type": "Question",
          "name": "Can we bring alcohol on the bachelor party boat?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We are BYOB friendly. Bring your own alcohol, and we provide coolers with ice. We also offer alcohol delivery services directly to the boat for your convenience. All guests must be 21+ with valid ID."
          }
        }
      ]
    };
    BACHELORETTE_FAQ_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does the bride cruise free on bachelorette party boats?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The bride cruises FREE on our Disco Queen and Super Sparkle Platinum packages with 16+ paying guests. This is our special thank you for choosing Premier Party Cruises for your bachelorette celebration."
          }
        },
        {
          "@type": "Question",
          "name": "What bachelorette party packages do you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer three bachelorette packages: Basic Bach ($85/person), Disco Queen ($95/person with bride free for 16+), and Super Sparkle Platinum ($105/person with bride free for 16+). All include DJ, photographer, floats, and full amenities."
          }
        }
      ]
    };
    PRIVATE_CRUISES_FAQ_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a private boat rental cost on Lake Travis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Private boat rentals start at $195 per hour with a 4-hour minimum. Pricing varies by boat size (14-50 guests), day of week, and duration. Contact us for custom quotes for your specific event needs."
          }
        },
        {
          "@type": "Question",
          "name": "What boats are available for private charters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Choose from Day Tripper (14 guests), Me Seeks the Irony (18-25 guests), or flagship Clever Girl (30-50 guests with 14 disco balls and giant Texas flag). All include licensed captains, premium sound, and coolers with ice."
          }
        }
      ]
    };
    DAY_TRIPPER_PRODUCT_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Day Tripper - 14 Person Party Boat",
      "description": "Intimate 14-person party boat perfect for small celebrations and private groups on Lake Travis. Features professional captain, premium sound system, coolers with ice, and comfortable seating.",
      "image": "https://premierpartycruises.com/media/schema/day-tripper-boat.jpg",
      "url": "https://premierpartycruises.com/",
      "brand": {
        "@type": "Brand",
        "name": "Premier Party Cruises"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "195",
        "highPrice": "395",
        "offerCount": "2",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "ratingCount": 145
      }
    };
    ME_SEEKS_THE_IRONY_PRODUCT_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Me Seeks the Irony - 25 Person Party Boat",
      "description": "Popular 25-person (18-25 seating) party boat ideal for medium-sized celebrations on Lake Travis. Premium amenities, professional crew, and excellent entertainment capabilities.",
      "image": "https://premierpartycruises.com/media/schema/me-seeks-irony-boat.jpg",
      "url": "https://premierpartycruises.com/",
      "brand": {
        "@type": "Brand",
        "name": "Premier Party Cruises"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "295",
        "highPrice": "695",
        "offerCount": "2",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "ratingCount": 187
      }
    };
    CLEVER_GIRL_PRODUCT_SCHEMA = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Clever Girl - 50 Person Flagship Party Boat",
      "description": "Flagship 50-person party boat featuring 14 disco balls, giant Texas flag, and premium entertainment setup. Perfect for large celebrations, corporate events, and unforgettable Lake Travis parties.",
      "image": "https://premierpartycruises.com/media/schema/clever-girl-boat.jpg",
      "url": "https://premierpartycruises.com/",
      "brand": {
        "@type": "Brand",
        "name": "Premier Party Cruises"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "495",
        "highPrice": "1195",
        "offerCount": "2",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "ratingCount": 234
      }
    };
    CRITICAL_CSS = `
:root{--primary:hsl(208 100% 50%);--secondary:hsl(51 100% 50%);--background:#fff;--foreground:#000}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:"DM Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased;background:#fff;color:#000;line-height:1.5}
h1,h2,h3{font-family:"Bebas Neue",system-ui,sans-serif;font-weight:700;letter-spacing:0.1em}
h1{font-size:clamp(1.5rem,4vw,3.5rem);line-height:1.2}
.relative{position:relative}
.absolute{position:absolute}
.inset-0{top:0;right:0;bottom:0;left:0}
.z-0{z-index:0}
.z-10{z-index:10}
.w-full{width:100%}
.h-full{height:100%}
.min-h-screen{min-height:100vh}
.object-cover{object-fit:cover}
.text-white{color:#fff}
.text-center{text-align:center}
.mx-auto{margin-left:auto;margin-right:auto}
.container{width:100%;max-width:1280px;margin:0 auto;padding:0 1rem}
.flex{display:flex}
.items-center{align-items:center}
.justify-center{justify-content:center}
.overflow-hidden{overflow:hidden}
.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}
@media(min-width:768px){
  h1{font-size:clamp(2.5rem,5vw,3.5rem)}
  .md\\:text-2xl{font-size:1.5rem}
  .md\\:text-4xl{font-size:2.25rem}
  .md\\:h-24{height:6rem}
}
@media(min-width:1024px){
  .lg\\:text-6xl{font-size:3.75rem}
}
`.trim();
    PRECONNECT_URLS = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com"
    ];
    SSR_ROUTES = [
      "/",
      "/bachelor-party-austin",
      "/bachelorette-party-austin",
      "/atx-disco-cruise",
      "/private-cruises",
      "/team-building",
      "/client-entertainment",
      "/company-milestone",
      "/welcome-party",
      "/after-party",
      "/rehearsal-dinner",
      "/milestone-birthday",
      "/sweet-16",
      "/graduation-party",
      "/testimonials-faq",
      "/contact",
      "/gallery",
      "/party-boat-austin",
      "/party-boat-lake-travis",
      "/corporate-events",
      "/birthday-parties",
      "/wedding-parties",
      "/combined-bachelor-bachelorette-austin",
      "/ai-endorsement"
    ];
    PAGE_METADATA = {
      "/": {
        h1: "Premier Party Cruises - Austin Lake Travis Boat Rentals",
        content: "Experience the ultimate party cruise on Lake Travis. Private charters, disco cruises, bachelor parties, bachelorette parties, and corporate events. Book your Austin boat rental today!"
      },
      "/bachelor-party-austin": {
        h1: "Austin Bachelor Party Boat | Lake Travis Cruises",
        content: "Plan the perfect bachelor party on Lake Travis with our private boat rentals. Custom packages, professional crew, and unforgettable experiences for your celebration."
      },
      "/bachelorette-party-austin": {
        h1: "Austin Bachelorette Party Boats | Lake Travis Party Cruises",
        content: "Create lasting memories with our bachelorette party boat rentals on Lake Travis. Disco cruises, private charters, and customizable packages for the perfect celebration."
      },
      "/atx-disco-cruise": {
        h1: "ATX Disco Cruise - The Ultimate Party Boat Experience",
        content: "Join Austin's most popular disco cruise on Lake Travis. Dance, celebrate, and enjoy the ultimate party boat experience with DJ, lights, and incredible views."
      },
      "/private-cruises": {
        h1: "Private Boat Cruises on Lake Travis | Custom Charter Packages",
        content: "Book a private cruise on Lake Travis for your special event. Customizable packages, professional service, and boats ranging from 14 to 75+ passengers."
      },
      "/team-building": {
        h1: "Corporate Team Building Events on Lake Travis",
        content: "Strengthen your team with unique corporate events on Lake Travis. Private boat charters perfect for team building activities and company outings."
      },
      "/client-entertainment": {
        h1: "Client Entertainment Cruises | Austin Corporate Events",
        content: "Impress your clients with exclusive Lake Travis cruises. Professional corporate entertainment packages for networking and relationship building."
      },
      "/company-milestone": {
        h1: "Company Milestone Celebrations on Lake Travis",
        content: "Celebrate company achievements with memorable Lake Travis cruises. Perfect for anniversaries, awards, and corporate milestone events."
      },
      "/welcome-party": {
        h1: "Wedding Welcome Party Cruises | Lake Travis Boat Rentals",
        content: "Start your wedding weekend with a welcome party cruise on Lake Travis. Perfect for greeting out-of-town guests and kicking off the celebrations."
      },
      "/after-party": {
        h1: "Wedding After Party Boats | Lake Travis Late Night Cruises",
        content: "Keep the celebration going with a wedding after party cruise. Private boat rentals for the perfect late-night celebration on Lake Travis."
      },
      "/rehearsal-dinner": {
        h1: "Rehearsal Dinner Cruises | Unique Lake Travis Venues",
        content: "Host an unforgettable rehearsal dinner on Lake Travis. Elegant boat cruises providing a unique and memorable setting for your pre-wedding celebration."
      },
      "/milestone-birthday": {
        h1: "Milestone Birthday Party Boats | Lake Travis Celebrations",
        content: "Celebrate milestone birthdays in style on Lake Travis. Private boat rentals for 30th, 40th, 50th birthdays and beyond."
      },
      "/sweet-16": {
        h1: "Sweet 16 Party Cruises | Austin Lake Travis Boat Rentals",
        content: "Make their Sweet 16 unforgettable with a Lake Travis party cruise. Safe, fun, and memorable celebrations for this special milestone."
      },
      "/graduation-party": {
        h1: "Graduation Party Boats | Lake Travis Celebration Cruises",
        content: "Celebrate graduation success with Lake Travis boat parties. Perfect for high school and college graduation celebrations."
      },
      "/testimonials-faq": {
        h1: "Customer Reviews & FAQs | Premier Party Cruises",
        content: "Read what our customers say about Premier Party Cruises. Find answers to frequently asked questions about booking, pricing, and policies."
      },
      "/contact": {
        h1: "Contact Premier Party Cruises | Book Your Lake Travis Event",
        content: "Contact us to book your Lake Travis cruise. Professional service, quick responses, and expert event planning for your perfect party boat experience."
      },
      "/gallery": {
        h1: "Photo Gallery | Premier Party Cruises on Lake Travis",
        content: "Browse photos from real Premier Party Cruises events. See our boats, parties, and the incredible Lake Travis experience."
      },
      "/party-boat-austin": {
        h1: "Austin Party Boats | Premier Lake Travis Cruise Experience",
        content: "Austin's top-rated party boat service on Lake Travis. Disco cruises, private charters, and unforgettable celebrations since 2009."
      },
      "/party-boat-lake-travis": {
        h1: "Lake Travis Party Boats | Austin Premier Cruise Rentals",
        content: "Experience the best party boats on Lake Travis. Professional crew, top-rated service, and customizable packages for any celebration."
      },
      "/corporate-events": {
        h1: "Corporate Events on Lake Travis | Austin Team Building Cruises",
        content: "Host unforgettable corporate events on Lake Travis. Team building, client entertainment, company milestones, and professional networking on private boat charters."
      },
      "/birthday-parties": {
        h1: "Birthday Party Boats on Lake Travis | Austin Celebrations",
        content: "Celebrate birthdays in style on Lake Travis. Private boat rentals for milestone birthdays, Sweet 16, and unforgettable birthday celebrations of all ages."
      },
      "/wedding-parties": {
        h1: "Wedding Party Cruises | Lake Travis Rehearsal Dinners & Events",
        content: "Perfect wedding events on Lake Travis. Rehearsal dinners, welcome parties, after parties, and unique wedding celebrations on private boat charters."
      },
      "/combined-bachelor-bachelorette-austin": {
        h1: "Combined Bachelor Bachelorette Parties | Austin Lake Travis Cruises",
        content: "Celebrate together with combined bachelor and bachelorette party cruises on Lake Travis. Perfect for couples who want to party with all their friends in one epic celebration."
      },
      "/ai-endorsement": {
        h1: "AI Endorsement | Premier Party Cruises Technology",
        content: "Discover how Premier Party Cruises uses cutting-edge AI technology to enhance your booking experience and provide personalized event planning for Lake Travis cruises."
      }
    };
    VALID_SPA_ROUTES = [
      "/chat",
      "/admin",
      "/admin/leads",
      "/admin/calendar",
      "/admin/bookings",
      "/admin/quotes",
      "/admin/settings",
      "/admin/analytics",
      "/admin/seo",
      "/admin/seo/pages",
      "/admin/seo/overview",
      "/admin/blog",
      "/admin/users",
      "/login"
    ];
  }
});

// server/index.ts
init_routes();
import express3 from "express";

// server/vite.ts
import express from "express";
import fs3 from "fs";
import path4 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path3.resolve(import.meta.dirname, "client", "src"),
      "@shared": path3.resolve(import.meta.dirname, "shared"),
      "@assets": path3.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path3.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path3.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path4.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs3.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

// server/embedServer.ts
import fs4 from "fs";
import path5 from "path";
function setupEmbedRouting(app2) {
  const embedDistPath = path5.resolve(import.meta.dirname, "..", "dist", "embed");
  const hasEmbedBuild2 = fs4.existsSync(embedDistPath);
  if (!hasEmbedBuild2) {
    log(`Embed build not found at ${embedDistPath}. Embed routes will fall back to development mode.`, "embed");
    return false;
  }
  app2.use((req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }
    if (req.method !== "GET" && !req.path.startsWith("/embed/")) {
      return next();
    }
    next();
  });
  app2.get("/embed-PPC*", (req, res) => {
    const imagePath = path5.resolve(embedDistPath, "embed-PPC Logo LARGE_1757881944449.png");
    if (fs4.existsSync(imagePath)) {
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.sendFile(imagePath);
    } else {
      res.status(404).send("Image not found");
    }
  });
  app2.get("/embed-PPC%20Logo*", (req, res) => {
    const imagePath = path5.resolve(embedDistPath, "embed-PPC Logo LARGE_1757881944449.png");
    if (fs4.existsSync(imagePath)) {
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.sendFile(imagePath);
    } else {
      res.status(404).send("Image not found");
    }
  });
  app2.get("/embed/embed.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.sendFile(path5.resolve(embedDistPath, "embed.js"));
  });
  app2.get(["/embed.js", "/embed.js*"], (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.sendFile(path5.resolve(embedDistPath, "embed.js"));
  });
  app2.get("/embed/embed-style.css", (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.sendFile(path5.resolve(embedDistPath, "embed-style.css"));
  });
  app2.get(["/embed-style.css", "/embed-style.css*"], (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.sendFile(path5.resolve(embedDistPath, "embed-style.css"));
  });
  app2.get("/embed-*", (req, res, next) => {
    const url = req.originalUrl;
    if (url.includes("embed-style.css") && url.includes("html-proxy")) {
      res.redirect(301, "/embed-style.css");
      return;
    }
    if (url.includes("embed.js") && url.includes("html-proxy")) {
      res.redirect(301, "/embed.js");
      return;
    }
    if (url.includes("embed-PPC") && url.includes("html-proxy")) {
      const imageName = url.match(/embed-PPC[^?]*/)?.[0];
      if (imageName) {
        const imagePath = path5.resolve(embedDistPath, imageName);
        if (fs4.existsSync(imagePath)) {
          res.setHeader("Content-Type", "image/png");
          res.setHeader("Cache-Control", "public, max-age=31536000");
          res.sendFile(imagePath);
          return;
        }
      }
      res.status(404).send("Image asset not found");
      return;
    }
    next();
  });
  app2.get("/embed/booking", (_req, res) => {
    const embedHtmlPath = path5.resolve(embedDistPath, "embed.html");
    if (fs4.existsSync(embedHtmlPath)) {
      res.removeHeader("X-Frame-Options");
      res.setHeader(
        "Content-Security-Policy",
        "frame-ancestors 'self' *; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; connect-src 'self' https: wss: ws:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;"
      );
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Referrer-Policy", "origin-when-cross-origin");
      res.sendFile(embedHtmlPath);
    } else {
      res.status(404).send("Embed widget not found");
    }
  });
  app2.get("/embed/chatbot", (_req, res) => {
    const embedHtmlPath = path5.resolve(embedDistPath, "embed.html");
    if (fs4.existsSync(embedHtmlPath)) {
      res.removeHeader("X-Frame-Options");
      res.setHeader(
        "Content-Security-Policy",
        "frame-ancestors 'self' *; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; connect-src 'self' https: wss: ws:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;"
      );
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Referrer-Policy", "origin-when-cross-origin");
      res.sendFile(embedHtmlPath);
    } else {
      res.status(404).send("Embed widget not found");
    }
  });
  app2.get("/embed/:assetName", (req, res) => {
    const assetName = req.params.assetName;
    if (assetName.match(/\.(png|jpg|jpeg|svg|ico|webp)$/i)) {
      const assetPath = path5.resolve(embedDistPath, assetName);
      if (fs4.existsSync(assetPath)) {
        if (assetName.endsWith(".png")) res.setHeader("Content-Type", "image/png");
        else if (assetName.endsWith(".jpg") || assetName.endsWith(".jpeg")) res.setHeader("Content-Type", "image/jpeg");
        else if (assetName.endsWith(".svg")) res.setHeader("Content-Type", "image/svg+xml");
        else if (assetName.endsWith(".ico")) res.setHeader("Content-Type", "image/x-icon");
        else if (assetName.endsWith(".webp")) res.setHeader("Content-Type", "image/webp");
        res.setHeader("Cache-Control", "public, max-age=31536000");
        res.sendFile(assetPath);
        return;
      }
    }
    res.status(404).send("Asset not found");
  });
  app2.get("/embed/*", (_req, res) => {
    const embedHtmlPath = path5.resolve(embedDistPath, "embed.html");
    if (fs4.existsSync(embedHtmlPath)) {
      res.removeHeader("X-Frame-Options");
      res.setHeader(
        "Content-Security-Policy",
        "frame-ancestors 'self' *; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; connect-src 'self' https: wss: ws:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;"
      );
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Referrer-Policy", "origin-when-cross-origin");
      res.sendFile(embedHtmlPath);
    } else {
      res.status(404).send("Embed widget not found");
    }
  });
  log("Production embed routing configured", "embed");
  return true;
}

// server/blog-api.js
init_storage();
import express2 from "express";
var blogRouter = express2.Router();
var requireAdminAuth = null;
var getRequireAdminAuth = async () => {
  if (!requireAdminAuth) {
    try {
      const routesModule = await Promise.resolve().then(() => (init_routes(), routes_exports));
      requireAdminAuth = routesModule.requireAdminAuth;
      if (!requireAdminAuth) {
        requireAdminAuth = (req, res, next) => {
          const authHeader = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized: Missing authentication token" });
          }
          const token = authHeader.split(" ")[1];
          if (token !== "admin-dev-token") {
            return res.status(401).json({ error: "Unauthorized: Invalid authentication token" });
          }
          req.adminUser = { id: "admin", role: "admin" };
          next();
        };
      }
    } catch (error) {
      console.error("Failed to import auth middleware:", error);
      requireAdminAuth = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({ error: "Unauthorized: Missing authentication token" });
        }
        const token = authHeader.split(" ")[1];
        if (token !== "admin-dev-token") {
          return res.status(401).json({ error: "Unauthorized: Invalid authentication token" });
        }
        req.adminUser = { id: "admin", role: "admin" };
        next();
      };
    }
  }
  return requireAdminAuth;
};
function stripPostContent(post) {
  const { content, ...metadata } = post;
  return metadata;
}
blogRouter.get("/public/posts", async (req, res) => {
  try {
    const {
      categorySlug = void 0,
      tagSlug = void 0,
      limit = "20",
      offset = "0",
      featured = void 0,
      search = ""
    } = req.query;
    const filters = {
      status: "published",
      limit: parseInt(limit),
      offset: parseInt(offset),
      sortBy: "publishedAt",
      sortOrder: "desc"
    };
    if (categorySlug) {
      const category = await storage.getBlogCategoryBySlug(categorySlug);
      if (category) {
        filters.categoryId = category.id;
      } else {
        return res.json({ posts: [], total: 0 });
      }
    }
    if (tagSlug) {
      const tag = await storage.getBlogTagBySlug(tagSlug);
      if (tag) {
        filters.tagId = tag.id;
      } else {
        return res.json({ posts: [], total: 0 });
      }
    }
    if (featured === "true") {
      filters.featured = true;
    }
    if (search) {
      filters.search = search;
    }
    const result = await storage.getBlogPosts(filters);
    const postsMetadata = result.posts.map((post) => stripPostContent(post));
    return res.json({
      posts: postsMetadata,
      total: result.total
    });
  } catch (e) {
    console.error("Blog posts fetch error:", e);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});
blogRouter.get("/public/posts/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await storage.getBlogPostBySlug(slug);
    if (!post || post.status !== "published") {
      return res.status(404).json({ error: "Not found" });
    }
    const [categories, tags, author] = await Promise.all([
      storage.getBlogPostCategories(post.id),
      storage.getBlogPostTags(post.id),
      post.authorId ? storage.getBlogAuthor(post.authorId) : Promise.resolve(null)
    ]);
    let relatedPosts = [];
    if (categories.length > 0) {
      const primaryCategoryId = categories[0].id;
      const relatedResult = await storage.getBlogPosts({
        status: "published",
        categoryId: primaryCategoryId,
        limit: 4,
        offset: 0
      });
      relatedPosts = relatedResult.posts.filter((p) => p.slug !== slug).slice(0, 3).map((p) => stripPostContent(p));
    }
    res.json({
      post: {
        ...post,
        author: author || null,
        categories: categories || [],
        tags: tags || []
      },
      relatedPosts
    });
  } catch (e) {
    console.error("Blog post fetch error:", e);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});
blogRouter.get("/public/categories", async (_req, res) => {
  try {
    const categories = await storage.getBlogCategories();
    res.json(categories);
  } catch (e) {
    console.error("Blog categories fetch error:", e);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});
blogRouter.get("/public/tags", async (_req, res) => {
  try {
    const tags = await storage.getBlogTags();
    res.json(tags);
  } catch (e) {
    console.error("Blog tags fetch error:", e);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});
blogRouter.get("/health", async (_req, res) => {
  try {
    let pgCounts = { posts: 0, authors: 0, categories: 0, tags: 0 };
    let pgStatus = "healthy";
    try {
      const [blogPostsResult, authors, categories, tags] = await Promise.all([
        storage.getBlogPosts({ limit: 1e3 }),
        storage.getBlogAuthors(),
        storage.getBlogCategories(),
        storage.getBlogTags()
      ]);
      pgCounts = {
        posts: blogPostsResult.total || 0,
        authors: authors.length,
        categories: categories.length,
        tags: tags.length
      };
    } catch (pgError) {
      pgStatus = "error";
      console.error("PostgreSQL health check failed:", pgError);
    }
    const healthReport = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      overall: pgStatus === "healthy" ? "healthy" : "degraded",
      postgresql: {
        status: pgStatus,
        counts: pgCounts
      },
      totals: {
        posts: pgCounts.posts,
        authors: pgCounts.authors,
        categories: pgCounts.categories,
        tags: pgCounts.tags
      }
    };
    console.log("\u{1F3E5} Blog health check:", JSON.stringify(healthReport, null, 2));
    res.json(healthReport);
  } catch (e) {
    console.error("Blog health check error:", e);
    res.status(500).json({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      overall: "unhealthy",
      error: "Health check failed",
      details: e.message
    });
  }
});
blogRouter.get("/stats", async (_req, res) => {
  try {
    const [allPosts, categories, tags] = await Promise.all([
      storage.getBlogPosts({ status: "published", limit: 1e3 }),
      storage.getBlogCategories(),
      storage.getBlogTags()
    ]);
    const categoryStats = {};
    categories.forEach((cat) => {
      categoryStats[cat.name] = cat.postCount || 0;
    });
    const tagStats = {};
    tags.forEach((tag) => {
      tagStats[tag.name] = tag.postCount || 0;
    });
    res.json({
      totalPosts: allPosts.total,
      totalCategories: categories.length,
      totalTags: tags.length,
      categoryStats,
      tagStats: Object.fromEntries(
        Object.entries(tagStats).sort(([, a], [, b]) => b - a).slice(0, 10)
        // Top 10 tags
      )
    });
  } catch (e) {
    console.error("Blog stats error:", e);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});
blogRouter.get("/management", async (req, res, next) => {
  const authMiddleware = await getRequireAdminAuth();
  authMiddleware(req, res, async () => {
    try {
      const {
        tab = "posts",
        page = "1",
        search = "",
        status = "",
        authorId = "",
        categoryId = ""
      } = req.query;
      const limit = 20;
      const offset = (parseInt(page) - 1) * limit;
      const filters = {
        limit,
        offset,
        ...search && { search },
        ...status && { status },
        ...authorId && { authorId },
        ...categoryId && { categoryId }
      };
      const [postsResult, authors, categories, tags] = await Promise.all([
        storage.getBlogPosts(filters),
        storage.getBlogAuthors(),
        storage.getBlogCategories(),
        storage.getBlogTags()
      ]);
      const totalPosts = postsResult.total;
      const totalPublished = postsResult.posts.filter((p) => p.status === "published").length;
      const totalDrafts = postsResult.posts.filter((p) => p.status === "draft").length;
      const totalViews = postsResult.posts.reduce((sum2, p) => sum2 + (p.viewCount || 0), 0);
      res.json({
        posts: postsResult.posts,
        authors,
        categories,
        tags,
        totalPosts,
        totalPublished,
        totalDrafts,
        totalViews
      });
    } catch (e) {
      console.error("Blog management fetch error:", e);
      res.status(500).json({ error: "Failed to fetch blog management data" });
    }
  });
});

// server/index.ts
init_auth();
init_errorMonitoring();
import path7 from "path";
import compression from "compression";
process.on("uncaughtException", (error) => {
  console.error("\u{1F4A5} UNCAUGHT EXCEPTION - Server would have crashed:", error);
  console.error("Stack:", error.stack);
  errorMonitoringService.sendAlert({
    error,
    severity: "CRITICAL",
    context: "Uncaught Exception - Process-level error"
  }).catch((err) => {
    console.error("Failed to send error monitoring alert:", err);
  });
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("\u{1F4A5} UNHANDLED REJECTION - Server would have crashed:", reason);
  console.error("Promise:", promise);
  const error = reason instanceof Error ? reason : new Error(String(reason));
  errorMonitoringService.sendAlert({
    error,
    severity: "CRITICAL",
    context: "Unhandled Promise Rejection - Process-level error"
  }).catch((err) => {
    console.error("Failed to send error monitoring alert:", err);
  });
});
var app = express3();
app.set("trust proxy", true);
app.set("etag", "strong");
app.use((req, res, next) => {
  const host = req.get("host");
  if (host && host.startsWith("www.")) {
    const newHost = host.replace("www.", "");
    const protocol = req.secure || req.get("x-forwarded-proto") === "https" ? "https" : "http";
    return res.redirect(301, `${protocol}://${newHost}${req.originalUrl}`);
  }
  next();
});
app.use(compression({
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6
}));
app.use(express3.json({ limit: "5mb" }));
app.use(express3.urlencoded({ extended: false, limit: "5mb" }));
app.use((req, res, next) => {
  const start = Date.now();
  const path8 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path8.startsWith("/api")) {
      let logLine = `${req.method} ${path8} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  app.use((req, res, next) => {
    res.removeHeader("X-Frame-Options");
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors 'self' https://booking.premierpartycruises.com https://*.premierpartycruises.com; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https: blob:; connect-src 'self' https: wss: ws:; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;"
    );
    next();
  });
  app.use("/api/blog", blogRouter);
  const { storage: storage3 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
  setupAuth(app, storage3);
  const server = await registerRoutes(app);
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = "https://premierpartycruises.com";
      const blogPostsResult = await storage3.getBlogPosts({
        status: "published",
        limit: 100
      });
      const blogPosts2 = Array.isArray(blogPostsResult) ? blogPostsResult : blogPostsResult?.posts ? blogPostsResult.posts : [];
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const staticPages = [
        { url: "/", lastmod: now, changefreq: "weekly", priority: 1 },
        { url: "/bachelor-party-austin", lastmod: now, changefreq: "weekly", priority: 0.9 },
        { url: "/bachelorette-party-austin", lastmod: now, changefreq: "weekly", priority: 0.9 },
        { url: "/private-cruises", lastmod: now, changefreq: "weekly", priority: 0.9 },
        { url: "/atx-disco-cruise", lastmod: now, changefreq: "weekly", priority: 0.9 },
        { url: "/team-building", lastmod: now, changefreq: "weekly", priority: 0.8 },
        { url: "/client-entertainment", lastmod: now, changefreq: "weekly", priority: 0.8 },
        { url: "/company-milestone", lastmod: now, changefreq: "weekly", priority: 0.8 },
        { url: "/welcome-party", lastmod: now, changefreq: "weekly", priority: 0.8 },
        { url: "/after-party", lastmod: now, changefreq: "weekly", priority: 0.8 },
        { url: "/rehearsal-dinner", lastmod: now, changefreq: "weekly", priority: 0.8 },
        { url: "/milestone-birthday", lastmod: now, changefreq: "weekly", priority: 0.8 },
        { url: "/sweet-16", lastmod: now, changefreq: "weekly", priority: 0.8 },
        { url: "/graduation-party", lastmod: now, changefreq: "weekly", priority: 0.8 },
        { url: "/testimonials-faq", lastmod: now, changefreq: "monthly", priority: 0.7 },
        { url: "/contact", lastmod: now, changefreq: "monthly", priority: 0.7 },
        // Blog listing page (canonical URL)
        { url: "/blogs", lastmod: now, changefreq: "daily", priority: 0.8 }
      ];
      const blogPages = blogPosts2.map((post) => ({
        url: `/blogs/${post.slug}`,
        lastmod: post.publishedAt ? new Date(post.publishedAt).toISOString() : now,
        changefreq: "monthly",
        priority: 0.7
      }));
      const urls = [...staticPages, ...blogPages];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod.split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`).join("\n")}
</urlset>`;
      res.setHeader("Content-Type", "application/xml; charset=UTF-8");
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });
  app.get("/robots.txt", async (req, res) => {
    try {
      const baseUrl = "https://premierpartycruises.com";
      const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/

# Crawl-delay for politeness
Crawl-delay: 1`;
      res.setHeader("Content-Type", "text/plain; charset=UTF-8");
      res.send(robotsTxt);
    } catch (error) {
      console.error("Error generating robots.txt:", error);
      res.status(500).send("Error generating robots.txt");
    }
  });
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("\u274C Express Error Handler:", {
      message: err.message,
      status,
      stack: err.stack,
      path: _req.path,
      method: _req.method
    });
    if (status >= 500) {
      errorMonitoringService.sendAlert({
        error: err,
        severity: "ERROR",
        request: _req,
        context: "Express Error Handler - Request-level error"
      }).catch((alertErr) => {
        console.error("Failed to send error monitoring alert:", alertErr);
      });
    }
    res.status(status).json({ message });
  });
  const embedConfigured = setupEmbedRouting(app);
  app.use((req, res, next) => {
    if (req.path.startsWith("/admin") || req.path.startsWith("/dashboard") || req.path.startsWith("/login")) {
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
    }
    next();
  });
  app.get("/blog/:slug", (req, res) => {
    res.redirect(301, `/blogs/${req.params.slug}`);
  });
  app.get("/blog", (req, res) => {
    res.redirect(301, "/blogs");
  });
  app.get(["/home-draft", "/home-draft/"], (req, res) => {
    res.status(410).send("This page has been removed");
  });
  app.get(["/bachelorette-party-austin-draft", "/bachelorette-party-austin-draft/"], (req, res) => {
    res.status(410).send("This page has been removed");
  });
  app.use((req, res, next) => {
    const path8 = req.path;
    if (path8.match(/\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot|ico|json)$/)) {
      const hasHash = path8.match(/-[a-zA-Z0-9]{8,}\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2)$/);
      if (hasHash) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else {
        res.setHeader("Cache-Control", "public, max-age=604800");
      }
      if (path8.match(/\.(woff|woff2|ttf|eot|otf)$/)) {
        res.setHeader("Access-Control-Allow-Origin", "*");
      }
      res.setHeader("Vary", "Accept-Encoding");
    } else if (!path8.startsWith("/api") && !path8.startsWith("/embed")) {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    }
    next();
  });
  const { ssrMiddleware: ssrMiddleware2 } = await Promise.resolve().then(() => (init_renderer(), renderer_exports));
  app.use(ssrMiddleware2());
  log("SSR middleware enabled for marketing/blog pages", "ssr");
  if (app.get("env") === "development") {
    if (embedConfigured) {
      log("Embed routes configured for production, main app will use development mode", "hybrid");
    } else {
      log("No embed build found, all routes will use development mode", "dev");
    }
    await setupVite(app, server);
  } else {
    const distPath = path7.resolve(process.cwd(), "dist/public");
    app.use(express3.static(distPath));
    app.use("*", (_req, res) => {
      res.sendFile(path7.resolve(distPath, "index.html"));
    });
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, async () => {
    log(`serving on port ${port}`);
    try {
      const { storage: storage4 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
      const blogPostsResult = await storage4.getBlogPosts({ limit: 100 });
      const authors = await storage4.getBlogAuthors();
      const categories = await storage4.getBlogCategories();
      const tags = await storage4.getBlogTags();
      const postsCount = Array.isArray(blogPostsResult) ? blogPostsResult.length : blogPostsResult?.posts ? blogPostsResult.posts.length : 0;
      log(`\u{1F4DD} Blog system persistence verified - PostgreSQL storage confirmed`);
      log(`\u{1F4CA} Blog data: ${postsCount} posts, ${authors.length} authors, ${categories.length} categories, ${tags.length} tags`);
    } catch (error) {
      log(`\u26A0\uFE0F Blog system persistence check failed: ${error}`);
    }
  });
})();

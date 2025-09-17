import { type Contact, type InsertContact, type Project, type InsertProject, type Boat, type InsertBoat, type Product, type InsertProduct, type Quote, type InsertQuote, type Invoice, type Payment, type ChatMessage, type InsertChatMessage, type AvailabilitySlot, type QuoteTemplate, type InsertQuoteTemplate, type TemplateRule, type InsertTemplateRule, type DiscountRule, type InsertDiscountRule, type PricingSettings, type InsertPricingSettings, type PricingPreview, type Affiliate, type InsertAffiliate, type PaymentSchedule, type DiscountCondition, type DayOfWeekMultipliers, type SeasonalAdjustment, type Booking, type InsertBooking, type DiscoSlot, type InsertDiscoSlot, type Timeframe, type InsertTimeframe, type EmailTemplate, type InsertEmailTemplate, type MasterTemplate, type InsertMasterTemplate, type QuoteItem, type RadioSection, type TemplateVisual, type RuleCondition, type RuleAction, type TemplateComponent, type AdminCalendarSlot, type AdminBookingInfo, type BatchSlotOperation, type AdminCalendarFilters, type ComprehensiveAdminBooking, type RecurringPattern, type PartialLead, type InsertPartialLead, type PartialLeadFilters, type SmsAuthToken, type InsertSmsAuthToken, type CustomerSession, type InsertCustomerSession, type PortalActivityLog, type InsertPortalActivityLog, type PhoneRateLimit, type CustomerVerificationAttempts, type QuoteAnalytics, type InsertQuoteAnalytics, type FileSend, type InsertFileSend, type EmailTracking, type InsertEmailTracking, type CustomerLifecycle, type InsertCustomerLifecycle, type CustomerActivity, type InsertCustomerActivity, type CustomerProfile, type LifecycleStage, type ActivityType, type SlotHold, type InsertSlotHold, type NormalizedSlot, type BlogPost, type InsertBlogPost, type BlogAuthor, type InsertBlogAuthor, type BlogCategory, type InsertBlogCategory, type BlogTag, type InsertBlogTag, type BlogPostCategory, type InsertBlogPostCategory, type BlogPostTag, type InsertBlogPostTag, type BlogComment, type InsertBlogComment, type BlogAnalytics, type InsertBlogAnalytics, type SeoPage, type InsertSeoPage, type SeoAuditLog, type InsertSeoAuditLog, type SeoCompetitor, type InsertSeoCompetitor, type SeoSettings, type InsertSeoSettings, type SEOAnalysisResult, type SEOOptimizationRequest, type SEOBulkOperation, type SEOIssue, type HeadingStructure, contacts, projects, boats, products, quotes, invoices, payments, chatMessages, availabilitySlots, quoteTemplates, templateRules, discountRules, pricingSettings, affiliates, bookings, discoSlots, timeframes, emailTemplates, masterTemplates, smsAuthTokens, customerSessions, portalActivityLog, phoneRateLimit, customerVerificationAttempts, quoteAnalytics, fileSends, emailTracking, customerLifecycle, customerActivity, slotHolds, partialLeads, blogPosts, blogAuthors, blogCategories, blogTags, blogPostCategories, blogPostTags, blogComments, blogAnalytics, seoPages, seoAuditLog, seoCompetitors, seoSettings } from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc, asc, isNull, isNotNull, or, inArray, sql, count, sum } from "drizzle-orm";
import { randomUUID } from "crypto";
import { quoteTokenService } from "./services/quoteTokenService";

export interface IStorage {
  // Contacts
  getContact(id: string): Promise<Contact | undefined>;
  getContactByEmail(email: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  getLeads(): Promise<Contact[]>;
  getClients(): Promise<Contact[]>;

  // Projects
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project>;
  getProjectsByContact(contactId: string): Promise<Project[]>;

  // Boats
  getBoats(): Promise<Boat[]>;
  getActiveBoats(): Promise<Boat[]>;

  // Products
  getProduct(id: string): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<boolean>;

  // Affiliates
  getAffiliate(id: string): Promise<Affiliate | undefined>;
  getAffiliates(): Promise<Affiliate[]>;
  getAffiliateByCode(code: string): Promise<Affiliate | undefined>;
  createAffiliate(affiliate: InsertAffiliate): Promise<Affiliate>;
  updateAffiliate(id: string, updates: Partial<Affiliate>): Promise<Affiliate>;
  deleteAffiliate(id: string): Promise<boolean>;
  updateAffiliateStats(affiliateId: string): Promise<Affiliate>;

  // Quotes
  getQuote(id: string): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuote(id: string, updates: Partial<Quote>): Promise<Quote>;
  getQuotesByProject(projectId: string): Promise<Quote[]>;

  // Invoices
  getInvoice(id: string): Promise<Invoice | undefined>;
  getInvoiceByQuoteId(quoteId: string): Promise<Invoice | undefined>;
  getAllInvoices(): Promise<Invoice[]>;
  getInvoices(filters?: {
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    limit?: number;
  }): Promise<any[]>;
  createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt'>): Promise<Invoice>;
  updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice>;

  // Payments
  createPayment(payment: Omit<Payment, 'id'>): Promise<Payment>;
  updatePayment(id: string, updates: Partial<Payment>): Promise<Payment>;
  getPaymentsByInvoice(invoiceId: string): Promise<Payment[]>;

  // Chat Messages
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;

  // Availability
  getAvailabilitySlots(startDate: Date, endDate: Date): Promise<AvailabilitySlot[]>;
  createAvailabilitySlot(slot: Omit<AvailabilitySlot, 'id'>): Promise<AvailabilitySlot>;
  bookAvailabilitySlot(slotId: string, projectId: string): Promise<AvailabilitySlot>;

  // Quote Templates
  getQuoteTemplate(id: string): Promise<QuoteTemplate | undefined>;
  getQuoteTemplates(): Promise<QuoteTemplate[]>;
  getQuoteTemplatesByEventType(eventType: string): Promise<QuoteTemplate[]>;
  createQuoteTemplate(template: InsertQuoteTemplate): Promise<QuoteTemplate>;
  updateQuoteTemplate(id: string, updates: Partial<QuoteTemplate>): Promise<QuoteTemplate>;
  deleteQuoteTemplate(id: string): Promise<boolean>;

  // Template Rules
  getTemplateRule(id: string): Promise<TemplateRule | undefined>;
  getTemplateRules(): Promise<TemplateRule[]>;
  getTemplateRulesByType(ruleType: string): Promise<TemplateRule[]>;
  createTemplateRule(rule: InsertTemplateRule): Promise<TemplateRule>;
  updateTemplateRule(id: string, updates: Partial<TemplateRule>): Promise<TemplateRule>;
  deleteTemplateRule(id: string): Promise<boolean>;

  // Discount Rules
  getDiscountRule(id: string): Promise<DiscountRule | undefined>;
  getDiscountRules(): Promise<DiscountRule[]>;
  getActiveDiscountRules(): Promise<DiscountRule[]>;
  getDiscountRuleByCode(code: string): Promise<DiscountRule | undefined>;
  createDiscountRule(rule: InsertDiscountRule): Promise<DiscountRule>;
  updateDiscountRule(id: string, updates: Partial<DiscountRule>): Promise<DiscountRule>;
  deleteDiscountRule(id: string): Promise<boolean>;

  // Pricing Settings
  getPricingSettings(orgId?: string): Promise<PricingSettings | undefined>;
  updatePricingSettings(settings: Partial<PricingSettings>, orgId?: string): Promise<PricingSettings>;

  // Enhanced pricing operations
  calculateCruisePricing(params: {
    groupSize: number;
    eventDate: Date;
    timeSlot: string;
    promoCode?: string;
  }): Promise<PricingPreview>;
  calculatePricing(params: {
    items: any[];
    groupSize?: number;
    projectDate?: Date;
    promoCode?: string;
    templateId?: string;
  }): Promise<PricingPreview>;
  findOrCreateContact(email: string, name?: string, phone?: string): Promise<Contact>;
  createProjectFromChatData(contactId: string, extractedData: any): Promise<Project>;

  // Booking Management
  getBookings(startDate?: Date, endDate?: Date, boatId?: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<Booking>): Promise<Booking>;
  deleteBooking(id: string): Promise<boolean>;
  checkBookingConflict(boatId: string, startTime: Date, endTime: Date, excludeBookingId?: string): Promise<boolean>;
  createBookingFromPayment(projectId: string, paymentId: string, amount: number): Promise<Booking>;
  convertLeadToCustomer(contactId: string): Promise<Contact>;

  // Disco Cruise Management
  getDiscoSlots(year: number, month: number): Promise<DiscoSlot[]>;
  getDiscoSlot(id: string): Promise<DiscoSlot | undefined>;
  createDiscoSlot(slot: InsertDiscoSlot): Promise<DiscoSlot>;
  purchaseDiscoTickets(slotId: string, quantity: number): Promise<DiscoSlot>;
  updateDiscoSlot(id: string, updates: Partial<DiscoSlot>): Promise<DiscoSlot>;
  checkDiscoAvailability(date: Date, time: string): Promise<boolean>;

  // Timeframe Management
  getTimeframes(dayOfWeek?: number, type?: string): Promise<Timeframe[]>;
  getTimeframe(id: string): Promise<Timeframe | undefined>;
  createTimeframe(timeframe: InsertTimeframe): Promise<Timeframe>;
  updateTimeframe(id: string, updates: Partial<Timeframe>): Promise<Timeframe>;
  deleteTimeframe(id: string): Promise<boolean>;
  generateTimeframesForMonth(year: number, month: number): Promise<{ date: Date; timeframes: Timeframe[] }[]>;

  // Boat Fleet Management
  getAvailableBoats(date: Date, startTime: string, endTime: string, groupSize: number): Promise<Boat[]>;
  getBoatsByCapacity(capacity: number): Promise<Boat[]>;
  assignFlexibleBoat(capacity: number, startTime: Date, endTime: Date, excludeBoatIds?: string[]): Promise<Boat | undefined>;
  reassignBooking(bookingId: string, newBoatId: string): Promise<Booking>;
  getBoatAvailabilityByCapacity(date: Date, startTime: string, endTime: string): Promise<Map<number, { total: number; available: number; boats: Boat[] }>>;

  // Availability Management
  checkAvailability(date: Date, duration: number, groupSize: number, type: 'private' | 'disco'): Promise<{ available: boolean; boats?: Boat[]; reason?: string }>;
  getMonthlyCalendar(boatId: string, year: number, month: number): Promise<{ date: Date; bookings: Booking[]; available: boolean }[]>;
  getMonthlyCalendarGrouped(year: number, month: number): Promise<Map<string, { date: Date; bookings: Booking[]; boatsByCapacity: Map<number, { available: Boat[]; booked: Boat[] }> }>>;
  
  // Email Template Management
  getEmailTemplate(id: string): Promise<EmailTemplate | undefined>;
  getEmailTemplates(): Promise<EmailTemplate[]>;
  getEmailTemplateByType(templateType: string): Promise<EmailTemplate | undefined>;
  createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate>;
  updateEmailTemplate(id: string, updates: Partial<EmailTemplate>): Promise<EmailTemplate>;
  deleteEmailTemplate(id: string): Promise<boolean>;
  
  // Master Template Management
  getMasterTemplate(id: string): Promise<MasterTemplate | undefined>;
  getMasterTemplates(): Promise<MasterTemplate[]>;
  getDefaultMasterTemplate(): Promise<MasterTemplate | undefined>;
  createMasterTemplate(template: InsertMasterTemplate): Promise<MasterTemplate>;
  updateMasterTemplate(id: string, updates: Partial<MasterTemplate>): Promise<MasterTemplate>;
  deleteMasterTemplate(id: string): Promise<boolean>;

  // Admin Calendar Management - Enhanced availability and booking operations
  getAdminCalendarSlots(startDate: Date, endDate: Date, boatId?: string): Promise<AdminCalendarSlot[]>;
  blockTimeSlot(boatId: string, startTime: Date, endTime: Date, reason?: string, adminUser?: string): Promise<AvailabilitySlot>;
  unblockTimeSlot(boatId: string, startTime: Date, endTime: Date): Promise<boolean>;
  batchBlockSlots(operation: BatchSlotOperation, adminUser?: string): Promise<AvailabilitySlot[]>;
  createBookingWithValidation(booking: InsertBooking, adminUser?: string): Promise<Booking>;
  updateBookingWithValidation(id: string, updates: Partial<Booking>, adminUser?: string): Promise<Booking>;
  cancelBookingWithCleanup(id: string, reason?: string, adminUser?: string): Promise<Booking>;
  moveBookingToSlot(bookingId: string, newStartTime: Date, newEndTime: Date, newBoatId?: string): Promise<Booking>;
  
  // Comprehensive admin data for calendar views
  getComprehensiveBookings(startDate?: Date, endDate?: Date, filters?: AdminCalendarFilters): Promise<ComprehensiveAdminBooking[]>;
  getAdminAvailabilityOverview(date: Date): Promise<{ boatId: string; boatName: string; slots: AdminCalendarSlot[] }[]>;
  
  // Recurring pattern management
  createRecurringAvailability(pattern: RecurringPattern): Promise<AvailabilitySlot[]>;
  updateRecurringAvailability(recurringId: string, pattern: Partial<RecurringPattern>): Promise<AvailabilitySlot[]>;
  deleteRecurringAvailability(recurringId: string): Promise<boolean>;
  
  // Enhanced conflict checking and validation
  validateBookingRequest(booking: InsertBooking): Promise<{ valid: boolean; conflicts: string[]; warnings: string[] }>;
  getBookingConflicts(boatId: string, startTime: Date, endTime: Date, excludeBookingId?: string): Promise<Booking[]>;
  
  // Audit and tracking
  getBookingHistory(bookingId: string): Promise<Array<{ action: string; timestamp: Date; adminUser?: string; details: any }>>;
  logAdminAction(action: string, details: any, adminUser?: string): Promise<void>;
  
  // Additional methods for specific date range queries
  getBookingsInRange(startDate: Date, endDate: Date): Promise<Booking[]>;
  getDiscoSlotsInRange(startDate: Date, endDate: Date): Promise<DiscoSlot[]>;

  // Automatic Quote Generation for Lead Creation
  generateAutomaticQuote(contact: Contact, project: Project, eventType?: string): Promise<Quote>;
  generateQuoteForLead(leadData: {
    contactId: string;
    eventType?: string;
    groupSize?: number;
    projectDate?: Date;
    projectId?: string;
  }): Promise<Quote>;

  // Customer Portal - SMS Authentication
  createSmsAuthToken(token: InsertSmsAuthToken): Promise<SmsAuthToken>;
  getSmsAuthToken(phoneNumber: string, code: string): Promise<SmsAuthToken | undefined>;
  getSmsAuthTokenByToken(token: string): Promise<SmsAuthToken | undefined>;
  markTokenAsUsed(tokenId: string): Promise<SmsAuthToken>;
  incrementTokenAttempts(tokenId: string): Promise<SmsAuthToken>;
  cleanupExpiredTokens(): Promise<number>;
  
  // Customer Portal - Session Management
  createCustomerSession(session: InsertCustomerSession): Promise<CustomerSession>;
  getCustomerSession(sessionId: string): Promise<CustomerSession | undefined>;
  getCustomerSessionByContact(contactId: string): Promise<CustomerSession | undefined>;
  updateCustomerSessionActivity(sessionId: string): Promise<CustomerSession>;
  endCustomerSession(sessionId: string): Promise<CustomerSession>;
  cleanupExpiredSessions(): Promise<number>;
  
  // Customer Portal - Activity Logging
  logPortalActivity(activity: InsertPortalActivityLog): Promise<PortalActivityLog>;
  getCustomerActivityLog(contactId: string, limit?: number): Promise<PortalActivityLog[]>;
  
  // Customer Portal - Rate Limiting
  checkPhoneRateLimit(phoneNumber: string): Promise<{ allowed: boolean; resetIn?: number; requestCount: number }>;
  updatePhoneRateLimit(phoneNumber: string): Promise<PhoneRateLimit>;
  resetPhoneRateLimit(phoneNumber: string): Promise<boolean>;
  
  // Customer Portal - Verification Attempt Tracking (SECURITY)
  trackVerificationAttempt(phoneNumber: string, sessionId: string, ipAddress?: string, userAgent?: string): Promise<CustomerVerificationAttempts>;
  isVerificationLocked(phoneNumber: string, sessionId: string): Promise<{ locked: boolean; lockedUntil?: Date; attemptCount: number }>;
  getVerificationAttempts(phoneNumber: string, sessionId: string): Promise<CustomerVerificationAttempts | undefined>;
  resetVerificationAttempts(phoneNumber: string, sessionId: string): Promise<boolean>;
  cleanupExpiredVerificationAttempts(): Promise<number>;

  // Partial Lead Management - Abandoned lead capture system
  createPartialLead(data: InsertPartialLead): Promise<PartialLead>;
  updatePartialLead(sessionId: string, updates: Partial<PartialLead>): Promise<PartialLead>;
  getPartialLead(sessionId: string): Promise<PartialLead | undefined>;
  getPartialLeads(filters?: PartialLeadFilters): Promise<PartialLead[]>;
  getPartialLeadById(id: string): Promise<PartialLead | undefined>;
  convertPartialLeadToContact(partialLeadId: string): Promise<Contact>;
  markPartialLeadAsContacted(partialLeadId: string, method: string): Promise<PartialLead>;
  markPartialLeadAsAbandoned(sessionId: string): Promise<PartialLead | undefined>;
  getPartialLeadStats(): Promise<{ total: number; today: number; thisWeek: number; thisMonth: number }>;
  cleanupOldPartialLeads(daysOld: number): Promise<number>;
  
  // Customer Portal - Customer Lookup
  searchCustomersByPhone(phoneNumber: string): Promise<Contact[]>;
  searchCustomersByName(query: string): Promise<Contact[]>;
  searchCustomersByEmail(email: string): Promise<Contact[]>;
  getCustomerDataById(contactId: string): Promise<{
    contact: Contact;
    projects: Project[];
    quotes: Quote[];
    invoices: Invoice[];
    bookings: Booking[];
  } | undefined>;
  getCustomerQuotesWithAccess(contactId: string): Promise<Quote[]>;
  getCustomerInvoices(contactId: string): Promise<Invoice[]>;
  getCustomerBookings(contactId: string): Promise<Booking[]>;
  updateCustomerProfile(contactId: string, updates: Partial<Contact>): Promise<Contact>;

  // Enhanced Customer Tracking - Quote Analytics
  createQuoteAnalytics(analytics: InsertQuoteAnalytics): Promise<QuoteAnalytics>;
  getQuoteAnalytics(quoteId: string): Promise<QuoteAnalytics[]>;
  getQuoteAnalyticsByContact(contactId: string): Promise<QuoteAnalytics[]>;
  trackQuoteView(quoteId: string, contactId?: string, sessionId?: string, metadata?: Record<string, any>): Promise<QuoteAnalytics>;
  getQuoteViewStats(quoteId: string): Promise<{ views: number; uniqueViews: number; totalDuration: number; lastViewed?: Date }>;

  // Enhanced Customer Tracking - File Send Tracking
  createFileSend(fileSend: InsertFileSend): Promise<FileSend>;
  getFileSends(contactId: string): Promise<FileSend[]>;
  getFileSendsByProject(projectId: string): Promise<FileSend[]>;
  trackFileAccess(fileSendId: string): Promise<FileSend>;
  updateFileSendStatus(fileSendId: string, status: 'delivered' | 'accessed'): Promise<FileSend>;

  // Enhanced Customer Tracking - Email Tracking
  createEmailTracking(emailTracking: InsertEmailTracking): Promise<EmailTracking>;
  getEmailTracking(contactId: string): Promise<EmailTracking[]>;
  trackEmailOpen(emailId: string): Promise<EmailTracking>;
  trackEmailClick(emailId: string): Promise<EmailTracking>;
  updateEmailDeliveryStatus(emailId: string, status: 'delivered' | 'bounced', metadata?: Record<string, any>): Promise<EmailTracking>;
  findEmailTrackingByMessageId(messageId: string, provider: string): Promise<EmailTracking | undefined>;
  updateEmailUnsubscribeStatus(emailId: string, metadata?: Record<string, any>): Promise<EmailTracking>;

  // Enhanced Customer Tracking - Customer Lifecycle
  createCustomerLifecycle(lifecycle: InsertCustomerLifecycle): Promise<CustomerLifecycle>;
  getCustomerLifecycle(contactId: string): Promise<CustomerLifecycle | undefined>;
  updateCustomerLifecycleStage(contactId: string, newStage: LifecycleStage, notes?: string): Promise<CustomerLifecycle>;
  calculateCustomerLifecycleMetrics(contactId: string): Promise<{
    daysInCurrentStage: number;
    totalDays: number;
    conversionProbability: number;
    nextActionRequired?: string;
    nextActionDue?: Date;
  }>;

  // Enhanced Customer Tracking - Customer Activity
  createCustomerActivity(activity: InsertCustomerActivity): Promise<CustomerActivity>;
  getCustomerActivity(contactId: string, limit?: number): Promise<CustomerActivity[]>;
  getCustomerActivityByType(contactId: string, activityType: ActivityType): Promise<CustomerActivity[]>;
  getCustomerActivityStats(contactId: string): Promise<{
    totalActivities: number;
    lastActivity?: Date;
    daysSinceLastContact: number;
    totalTouchpoints: number;
    activitiesByType: Record<string, number>;
  }>;

  // Enhanced Customer Tracking - Comprehensive Profile
  getComprehensiveCustomerProfile(contactId: string): Promise<CustomerProfile | undefined>;
  getCustomerChatHistory(contactId: string): Promise<{
    messages: ChatMessage[];
    sessionCount: number;
    totalMessages: number;
    firstContact?: Date;
    lastContact?: Date;
  }>;
  getCustomerFileHistory(contactId: string): Promise<{
    files: FileSend[];
    totalFiles: number;
    deliveredFiles: number;
    accessedFiles: number;
  }>;
  getCustomerQuoteHistory(contactId: string): Promise<{
    quotes: Quote[];
    analytics: QuoteAnalytics[];
    totalViews: number;
    acceptedQuotes: number;
    pendingQuotes: number;
  }>;
  getCustomerPaymentSummary(contactId: string): Promise<{
    totalValue: number;
    totalPaid: number;
    balance: number;
    payments: Payment[];
    paymentHistory: Array<{
      date: Date;
      amount: number;
      method: string;
      status: string;
      invoiceId?: string;
    }>;
  }>;

  // Unified Availability Service
  searchNormalizedSlots(filters: {
    startDate: Date;
    endDate: Date;
    cruiseType?: 'private' | 'disco';
    groupSize?: number;
    minDuration?: number;
    maxDuration?: number;
  }): Promise<NormalizedSlot[]>;
  
  createSlotHold(hold: {
    slotId: string;
    boatId?: string;
    cruiseType: 'private' | 'disco';
    dateISO: string;
    startTime: string;
    endTime: string;
    sessionId?: string;
    groupSize?: number;
    ttlMinutes?: number;
  }): Promise<SlotHold>;
  
  releaseSlotHold(holdId: string): Promise<boolean>;
  releaseSlotHoldBySlot(slotId: string, sessionId?: string): Promise<boolean>;
  
  isSlotAvailable(slotId: string, groupSize?: number): Promise<{ available: boolean; reason?: string; heldUntil?: Date }>;
  
  normalizeAvailabilityData(startDate: Date, endDate: Date): Promise<NormalizedSlot[]>;
  
  cleanupExpiredHolds(): Promise<number>;
  
  // Slot Hold Management
  getSlotHold(holdId: string): Promise<SlotHold | undefined>;
  getSlotHoldsBySession(sessionId: string): Promise<SlotHold[]>;
  getActiveSlotHolds(): Promise<SlotHold[]>;

  // ===== BLOG SYSTEM OPERATIONS =====
  
  // Blog Authors
  getBlogAuthor(id: string): Promise<BlogAuthor | undefined>;
  getBlogAuthors(): Promise<BlogAuthor[]>;
  getBlogAuthorBySlug(slug: string): Promise<BlogAuthor | undefined>;
  getBlogAuthorByContact(contactId: string): Promise<BlogAuthor | undefined>;
  createBlogAuthor(author: InsertBlogAuthor): Promise<BlogAuthor>;
  updateBlogAuthor(id: string, updates: Partial<BlogAuthor>): Promise<BlogAuthor>;
  deleteBlogAuthor(id: string): Promise<boolean>;

  // Blog Categories
  getBlogCategory(id: string): Promise<BlogCategory | undefined>;
  getBlogCategories(): Promise<BlogCategory[]>;
  getBlogCategoryBySlug(slug: string): Promise<BlogCategory | undefined>;
  getBlogCategoriesByParent(parentId: string | null): Promise<BlogCategory[]>;
  getBlogCategoryHierarchy(): Promise<BlogCategory[]>;
  createBlogCategory(category: InsertBlogCategory): Promise<BlogCategory>;
  updateBlogCategory(id: string, updates: Partial<BlogCategory>): Promise<BlogCategory>;
  deleteBlogCategory(id: string): Promise<boolean>;
  updateCategoryPostCount(categoryId: string): Promise<BlogCategory>;

  // Blog Tags
  getBlogTag(id: string): Promise<BlogTag | undefined>;
  getBlogTags(): Promise<BlogTag[]>;
  getBlogTagBySlug(slug: string): Promise<BlogTag | undefined>;
  getBlogTagsByName(names: string[]): Promise<BlogTag[]>;
  createBlogTag(tag: InsertBlogTag): Promise<BlogTag>;
  updateBlogTag(id: string, updates: Partial<BlogTag>): Promise<BlogTag>;
  deleteBlogTag(id: string): Promise<boolean>;
  updateTagPostCount(tagId: string): Promise<BlogTag>;

  // Blog Posts
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostByWordPressId(wpPostId: number): Promise<BlogPost | undefined>;
  getBlogPosts(filters?: {
    status?: 'draft' | 'published' | 'scheduled' | 'archived';
    authorId?: string;
    categoryId?: string;
    tagId?: string;
    featured?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
    sortBy?: 'createdAt' | 'publishedAt' | 'viewCount' | 'title';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }>;
  getPublishedBlogPosts(limit?: number, offset?: number): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }>;
  getFeaturedBlogPosts(limit?: number): Promise<(BlogPost & { 
    author: BlogAuthor;
    categories: BlogCategory[];
    tags: BlogTag[];
  })[]>;
  getRelatedBlogPosts(postId: string, limit?: number): Promise<BlogPost[]>;
  getBlogPostsByCategory(categoryId: string, limit?: number, offset?: number): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }>;
  getBlogPostsByTag(tagId: string, limit?: number, offset?: number): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }>;
  getBlogPostsByAuthor(authorId: string, limit?: number, offset?: number): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<boolean>;
  publishBlogPost(id: string, publishedAt?: Date): Promise<BlogPost>;
  scheduleBlogPost(id: string, scheduledFor: Date): Promise<BlogPost>;
  incrementBlogPostViews(id: string): Promise<BlogPost>;

  // Blog Post Relationships
  assignPostToCategories(postId: string, categoryIds: string[], primaryCategoryId?: string): Promise<BlogPostCategory[]>;
  removePostFromCategories(postId: string, categoryIds?: string[]): Promise<boolean>;
  assignPostToTags(postId: string, tagIds: string[]): Promise<BlogPostTag[]>;
  removePostFromTags(postId: string, tagIds?: string[]): Promise<boolean>;
  getBlogPostCategories(postId: string): Promise<BlogCategory[]>;
  getBlogPostTags(postId: string): Promise<BlogTag[]>;

  // Blog Comments
  getBlogComment(id: string): Promise<BlogComment | undefined>;
  getBlogCommentsByPost(postId: string, status?: 'pending' | 'approved' | 'spam' | 'rejected'): Promise<BlogComment[]>;
  getBlogCommentsByParent(parentId: string): Promise<BlogComment[]>;
  getBlogCommentsByAuthor(authorEmail: string): Promise<BlogComment[]>;
  createBlogComment(comment: InsertBlogComment): Promise<BlogComment>;
  updateBlogComment(id: string, updates: Partial<BlogComment>): Promise<BlogComment>;
  deleteBlogComment(id: string): Promise<boolean>;
  approveBlogComment(id: string): Promise<BlogComment>;
  rejectBlogComment(id: string): Promise<BlogComment>;
  markBlogCommentAsSpam(id: string): Promise<BlogComment>;
  updateCommentCounts(postId: string): Promise<BlogPost>;

  // Blog Analytics
  getBlogAnalytics(postId: string, startDate?: Date, endDate?: Date): Promise<BlogAnalytics[]>;
  createBlogAnalytics(analytics: InsertBlogAnalytics): Promise<BlogAnalytics>;
  updateBlogAnalytics(postId: string, date: Date, updates: Partial<BlogAnalytics>): Promise<BlogAnalytics>;
  getBlogAnalyticsSummary(startDate: Date, endDate: Date): Promise<{
    totalViews: number;
    totalUniqueViews: number;
    totalShares: number;
    totalComments: number;
    avgBounceRate: number;
    avgTimeOnPage: number;
    topPosts: Array<{ post: BlogPost; views: number; shares: number }>;
    topCategories: Array<{ category: BlogCategory; views: number }>;
  }>;

  // WordPress Import Support
  importWordPressPost(wpData: {
    wpPostId: number;
    wpGuid: string;
    wpStatus: string;
    wpModified: Date;
    wpAuthorId: number;
    title: string;
    content: string;
    excerpt?: string;
    publishedAt?: Date;
    categories: string[];
    tags: string[];
    authorName: string;
    authorEmail?: string;
    featuredImage?: string;
    metaData?: Record<string, any>;
  }): Promise<BlogPost>;
  checkWordPressPostExists(wpPostId: number): Promise<boolean>;
  mapWordPressCategories(wpCategories: Array<{ id: number; name: string; slug: string; parent?: number }>): Promise<BlogCategory[]>;
  mapWordPressTags(wpTags: Array<{ id: number; name: string; slug: string }>): Promise<BlogTag[]>;
  mapWordPressAuthor(wpAuthorData: { id: number; name: string; email?: string; bio?: string }): Promise<BlogAuthor>;

  // ===== END BLOG SYSTEM OPERATIONS =====
  
  // ===== SEO MANAGEMENT OPERATIONS =====
  
  // SEO Pages Management
  getSeoPage(pageRoute: string): Promise<SeoPage | undefined>;
  getSeoPages(): Promise<SeoPage[]>;
  createSeoPage(seoPage: InsertSeoPage): Promise<SeoPage>;
  updateSeoPage(pageRoute: string, updates: Partial<SeoPage>): Promise<SeoPage>;
  deleteSeoPage(pageRoute: string): Promise<boolean>;
  upsertSeoPage(seoPage: InsertSeoPage): Promise<SeoPage>;
  
  // SEO Analysis and Scoring
  analyzePage(pageRoute: string, content?: string): Promise<SEOAnalysisResult>;
  calculateSeoScore(pageRoute: string): Promise<number>;
  updateSeoAnalysis(pageRoute: string, analysis: SEOAnalysisResult): Promise<SeoPage>;
  
  // SEO Optimization with AI
  optimizePageSeo(request: SEOOptimizationRequest): Promise<SeoPage>;
  generateMetaTags(pageRoute: string, content: string, targetKeyword?: string): Promise<{
    title: string;
    description: string;
    keywords: string[];
  }>;
  optimizeContent(content: string, targetKeyword: string, competitorUrls?: string[]): Promise<string>;
  
  // SEO Bulk Operations
  bulkAnalyzePages(pageRoutes: string[]): Promise<SEOAnalysisResult[]>;
  bulkOptimizePages(operation: SEOBulkOperation): Promise<SeoPage[]>;
  refreshAllPageAnalysis(): Promise<SeoPage[]>;
  
  // SEO Audit Log
  getSeoAuditLog(pageId: string): Promise<SeoAuditLog[]>;
  getAllSeoAuditLogs(): Promise<SeoAuditLog[]>;
  createSeoAuditLog(auditLog: InsertSeoAuditLog): Promise<SeoAuditLog>;
  
  // SEO Competitors
  getSeoCompetitor(id: string): Promise<SeoCompetitor | undefined>;
  getSeoCompetitors(): Promise<SeoCompetitor[]>;
  getSeoCompetitorByDomain(domain: string): Promise<SeoCompetitor | undefined>;
  createSeoCompetitor(competitor: InsertSeoCompetitor): Promise<SeoCompetitor>;
  updateSeoCompetitor(id: string, updates: Partial<SeoCompetitor>): Promise<SeoCompetitor>;
  deleteSeoCompetitor(id: string): Promise<boolean>;
  
  // SEO Settings
  getSeoSettings(): Promise<SeoSettings | undefined>;
  updateSeoSettings(settings: Partial<SeoSettings>): Promise<SeoSettings>;
  createSeoSettings(settings: InsertSeoSettings): Promise<SeoSettings>;
  upsertSeoSettings(settings: Partial<SeoSettings>): Promise<SeoSettings>;
  
  // Technical SEO
  generateSitemap(): Promise<string>;
  generateRobotsTxt(): Promise<string>;
  getPageMetaData(pageRoute: string): Promise<{
    title?: string;
    description?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    canonicalUrl?: string;
    robotsDirective?: string;
    schemaMarkup?: Record<string, any>;
  }>;
  
  // SEO Analytics and Reporting
  getSeoOverview(): Promise<{
    totalPages: number;
    averageScore: number;
    highPriorityIssues: number;
    pagesNeedingOptimization: number;
    lastAnalyzed?: Date;
  }>;
  getSeoIssuesSummary(): Promise<Array<{
    pageRoute: string;
    pageName: string;
    score: number;
    issues: SEOIssue[];
    lastAnalyzed?: Date;
  }>>;
  getKeywordRankings(keyword: string): Promise<Array<{
    pageRoute: string;
    position?: number;
    targetKeywords: string[];
    focusKeyword?: string;
  }>>;
  
  // Content Analysis
  analyzeContent(content: string, targetKeyword?: string): Promise<{
    wordCount: number;
    keywordDensity: Record<string, number>;
    headingStructure: HeadingStructure;
    readabilityScore: number;
    internalLinks: number;
    externalLinks: number;
    images: number;
    imagesWithoutAlt: number;
  }>;
  
  // Schema Markup Management
  generateBusinessSchema(): Promise<Record<string, any>>;
  generatePageSchema(pageRoute: string, pageType: 'webpage' | 'service' | 'event'): Promise<Record<string, any>>;
  validateSchemaMarkup(schema: Record<string, any>): Promise<{ valid: boolean; errors: string[] }>;
  
  // SEO Performance Tracking
  trackPagePerformance(pageRoute: string, metrics: {
    loadTime?: number;
    mobileOptimized?: boolean;
    coreWebVitals?: Record<string, number>;
  }): Promise<SeoPage>;
  
  // ===== END SEO MANAGEMENT OPERATIONS =====
}

export class DatabaseStorage implements IStorage {
  // Concurrency protection for booking operations
  private pendingBookingOperations = new Map<string, Promise<Booking>>();
  
  // Unified availability service - concurrency protection and slot holds
  private slotHoldLocks = new Map<string, Promise<SlotHold>>();
  
  // Initialize database seeding
  private seedComplete = false;

  constructor() {
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      if (!this.seedComplete) {
        await this.seedInitialData();
        this.seedComplete = true;
        console.log('✅ Database initialized with seed data');
      }
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      // Continue anyway - tables may already exist
    }
  }

  private async seedInitialData() {
    try {
      console.log('🌱 Starting database seeding...');
      
      // Check if data already exists
      const existingBoats = await db.select().from(boats).limit(1);
      if (existingBoats.length > 0) {
        console.log('📋 Database already seeded, skipping...');
        return;
      }
      
      // Seed boats with full fleet data
      const boatData = [
        { 
          id: "boat_day_tripper", 
          orgId: "org_demo", 
          name: "Day Tripper", 
          capacity: 14, 
          maxCapacity: 14,
          extraCrewThreshold: null, // no extra crew needed
          active: true 
        },
        { 
          id: "boat_meeseeks", 
          orgId: "org_demo", 
          name: "Meeseeks", 
          capacity: 25, 
          maxCapacity: 30,
          extraCrewThreshold: 25, // extra crew needed at 25+
          active: true 
        },
        { 
          id: "boat_the_irony", 
          orgId: "org_demo", 
          name: "The Irony", 
          capacity: 25, 
          maxCapacity: 30,
          extraCrewThreshold: 25, // extra crew needed at 25+
          active: true 
        },
        { 
          id: "boat_clever_girl", 
          orgId: "org_demo", 
          name: "Clever Girl", 
          capacity: 50, 
          maxCapacity: 75,
          extraCrewThreshold: 50, // extra crew needed at 50+
          active: true 
        },
      ];
      
      await db.insert(boats).values(boatData);
      console.log(`✅ Seeded ${boatData.length} boats`);
      
      // Seed pricing settings
      await db.insert(pricingSettings).values({
        id: "pricing_org_demo",
        orgId: "org_demo",
        taxRate: 825, // 8.25%
        defaultGratuityPercent: 20, // Updated to 20% as per requirements
        gratuityIncluded: false,
        defaultDepositPercent: 25,
        urgencyThresholdDays: 30,
        fullPaymentThresholdDays: 14,
        currency: "USD",
        timezone: "America/Chicago",
        priceDisplayMode: "both",
        dayOfWeekMultipliers: null,
        seasonalAdjustments: [],
        updatedAt: new Date(),
      });
      console.log('✅ Seeded pricing settings');

      // Seed products
      await this.seedProductData();
      
    } catch (error: any) {
      if (error.message?.includes('duplicate key')) {
        console.log('📋 Seed data already exists, continuing...');
      } else {
        console.error('❌ Error seeding database:', error);
        throw error;
      }
    }
  }

  private async seedProductData() {
    try {
      // Check if products already exist
      const existingProducts = await db.select().from(products).limit(1);
      if (existingProducts.length > 0) {
        console.log('📦 Products already seeded, skipping...');
        return;
      }

      // Seed essential products
      const productData = [
        // ===== DISCO CRUISE PRODUCTS =====
        {
          id: "disco_basic_bach",
          orgId: "org_demo",
          name: "Basic Bach Disco Package",
          description: "Essential disco cruise experience with DJ, dance floor, and party atmosphere.",
          unitPrice: 8500, // $85 per person
          taxable: true,
          pricingModel: "per_person" as const,
          productType: "disco_cruise" as const,
          dayType: null,
          groupSize: null,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          eventTypes: ["bachelor", "bachelorette"],
          active: true,
        },
        {
          id: "disco_queen",
          orgId: "org_demo", 
          name: "Disco Queen Package",
          description: "Premium disco cruise with upgraded sound system, disco lights, and party favors.",
          unitPrice: 9500, // $95 per person
          taxable: true,
          pricingModel: "per_person" as const,
          productType: "disco_cruise" as const,
          dayType: null,
          groupSize: null,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          eventTypes: ["bachelor", "bachelorette"],
          active: true,
        },
        {
          id: "disco_platinum",
          orgId: "org_demo",
          name: "Super Sparkle Platinum Package",
          description: "The most exclusive disco cruise with VIP service, premium cocktails, and luxury amenities.",
          unitPrice: 10500, // $105 per person
          taxable: true,
          pricingModel: "per_person" as const,
          productType: "disco_cruise" as const,
          dayType: null,
          groupSize: null,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
          eventTypes: ["bachelor", "bachelorette"],
          active: true,
        },

        // ===== PRIVATE CRUISE PRODUCTS =====
        // Weekday Private Cruises (Monday-Thursday, 3 hours)
        {
          id: "private_cruise_weekday_14",
          orgId: "org_demo",
          name: "Weekday Private Cruise (Up to 14 Guests)",
          description: "Private weekday cruise for intimate groups, includes captain and crew. 3-hour duration.",
          unitPrice: 40000, // $400/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "weekday",
          groupSize: 14,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_weekday_25",
          orgId: "org_demo",
          name: "Weekday Private Cruise (Up to 25 Guests)",
          description: "Private weekday cruise for medium groups, includes captain and crew. 3-hour duration.",
          unitPrice: 45000, // $450/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "weekday",
          groupSize: 25,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_weekday_30",
          orgId: "org_demo",
          name: "Weekday Private Cruise (Up to 30 Guests)",
          description: "Private weekday cruise for medium-large groups, includes captain and crew. 3-hour duration.",
          unitPrice: 50000, // $500/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "weekday",
          groupSize: 30,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_weekday_50",
          orgId: "org_demo",
          name: "Weekday Private Cruise (Up to 50 Guests)",
          description: "Private weekday cruise for large groups, includes captain and crew. 3-hour duration.",
          unitPrice: 55000, // $550/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "weekday",
          groupSize: 50,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_weekday_75",
          orgId: "org_demo",
          name: "Weekday Private Cruise (Up to 75 Guests)",
          description: "Private weekday cruise for very large groups, includes captain and crew. 3-hour duration.",
          unitPrice: 60000, // $600/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "weekday",
          groupSize: 75,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },

        // Weekend Private Cruises (Friday-Sunday, 4 hours)
        {
          id: "private_cruise_friday_14",
          orgId: "org_demo",
          name: "Friday Private Cruise (Up to 14 Guests)",
          description: "Private Friday cruise for intimate groups, includes captain and crew. 4-hour duration.",
          unitPrice: 50000, // $500/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "friday",
          groupSize: 14,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_friday_25",
          orgId: "org_demo",
          name: "Friday Private Cruise (Up to 25 Guests)",
          description: "Private Friday cruise for medium groups, includes captain and crew. 4-hour duration.",
          unitPrice: 55000, // $550/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "friday",
          groupSize: 25,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_friday_30",
          orgId: "org_demo",
          name: "Friday Private Cruise (Up to 30 Guests)",
          description: "Private Friday cruise for medium-large groups, includes captain and crew. 4-hour duration.",
          unitPrice: 60000, // $600/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "friday",
          groupSize: 30,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_friday_50",
          orgId: "org_demo",
          name: "Friday Private Cruise (Up to 50 Guests)",
          description: "Private Friday cruise for large groups, includes captain and crew. 4-hour duration.",
          unitPrice: 65000, // $650/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "friday",
          groupSize: 50,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_friday_75",
          orgId: "org_demo",
          name: "Friday Private Cruise (Up to 75 Guests)",
          description: "Private Friday cruise for very large groups, includes captain and crew. 4-hour duration.",
          unitPrice: 70000, // $700/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "friday",
          groupSize: 75,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },

        // Saturday Private Cruises (Premium Weekend)
        {
          id: "private_cruise_saturday_14",
          orgId: "org_demo",
          name: "Saturday Private Cruise (Up to 14 Guests)",
          description: "Premium Saturday private cruise for intimate groups, includes captain and crew. 4-hour duration.",
          unitPrice: 50000, // $500/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "saturday",
          groupSize: 14,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_saturday_25",
          orgId: "org_demo",
          name: "Saturday Private Cruise (Up to 25 Guests)",
          description: "Premium Saturday private cruise for medium groups, includes captain and crew. 4-hour duration.",
          unitPrice: 55000, // $550/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "saturday",
          groupSize: 25,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_saturday_30",
          orgId: "org_demo",
          name: "Saturday Private Cruise (Up to 30 Guests)",
          description: "Premium Saturday private cruise for medium-large groups, includes captain and crew. 4-hour duration.",
          unitPrice: 60000, // $600/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "saturday",
          groupSize: 30,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_saturday_50",
          orgId: "org_demo",
          name: "Saturday Private Cruise (Up to 50 Guests)",
          description: "Premium Saturday private cruise for large groups, includes captain and crew. 4-hour duration.",
          unitPrice: 65000, // $650/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "saturday",
          groupSize: 50,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_saturday_75",
          orgId: "org_demo",
          name: "Saturday Private Cruise (Up to 75 Guests)",
          description: "Premium Saturday private cruise for very large groups, includes captain and crew. 4-hour duration.",
          unitPrice: 70000, // $700/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "saturday",
          groupSize: 75,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },

        // Sunday Private Cruises
        {
          id: "private_cruise_sunday_14",
          orgId: "org_demo",
          name: "Sunday Private Cruise (Up to 14 Guests)",
          description: "Sunday private cruise for intimate groups, includes captain and crew. 4-hour duration.",
          unitPrice: 50000, // $500/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "sunday",
          groupSize: 14,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_sunday_25",
          orgId: "org_demo",
          name: "Sunday Private Cruise (Up to 25 Guests)",
          description: "Sunday private cruise for medium groups, includes captain and crew. 4-hour duration.",
          unitPrice: 55000, // $550/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "sunday",
          groupSize: 25,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_sunday_30",
          orgId: "org_demo",
          name: "Sunday Private Cruise (Up to 30 Guests)",
          description: "Sunday private cruise for medium-large groups, includes captain and crew. 4-hour duration.",
          unitPrice: 60000, // $600/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "sunday",
          groupSize: 30,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_sunday_50",
          orgId: "org_demo",
          name: "Sunday Private Cruise (Up to 50 Guests)",
          description: "Sunday private cruise for large groups, includes captain and crew. 4-hour duration.",
          unitPrice: 65000, // $650/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "sunday",
          groupSize: 50,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },
        {
          id: "private_cruise_sunday_75",
          orgId: "org_demo",
          name: "Sunday Private Cruise (Up to 75 Guests)",
          description: "Sunday private cruise for very large groups, includes captain and crew. 4-hour duration.",
          unitPrice: 70000, // $700/hour
          taxable: true,
          pricingModel: "hourly" as const,
          productType: "private_cruise" as const,
          dayType: "sunday",
          groupSize: 75,
          categoryType: "experience" as const,
          imageUrl: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
          eventTypes: ["birthday", "anniversary", "corporate", "general"],
          active: true,
        },

        // ===== ADD-ON PRODUCTS =====
        { 
          id: "prod_cooler_ice", 
          orgId: "org_demo", 
          name: "Cooler + Ice", 
          description: null,
          unitPrice: 1500, 
          taxable: true,
          pricingModel: "flat_rate" as const,
          productType: "addon" as const,
          dayType: null,
          groupSize: null,
          categoryType: "addon" as const,
          imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          eventTypes: [],
          active: true,
        },
      ];
      
      await db.insert(products).values(productData);
      console.log(`✅ Seeded ${productData.length} products`);
      
    } catch (error: any) {
      if (error.message?.includes('duplicate key')) {
        console.log('📦 Products already exist, skipping...');
      } else {
        console.error('❌ Error seeding products:', error);
      }
    }
  }

  // ===== BASIC CRUD OPERATIONS =====

  async getContact(id: string): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
    return result[0];
  }

  async getContactByEmail(email: string): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.email, email)).limit(1);
    return result[0];
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values({
      ...insertContact,
      orgId: insertContact.orgId || "org_demo",
      phone: insertContact.phone || null,
      tags: insertContact.tags || [],
    }).returning();
    return result[0];
  }

  async getLeads(): Promise<Contact[]> {
    // Get contacts who don't have projects in deposit_paid or paid phases
    const contactsWithProjects = await db
      .select({ contactId: projects.contactId })
      .from(projects)
      .where(inArray(projects.pipelinePhase, ["ph_deposit_paid", "ph_paid"]));
    
    const excludeIds = contactsWithProjects.map(p => p.contactId);
    
    if (excludeIds.length > 0) {
      return await db.select().from(contacts).where(and(
        isNotNull(contacts.id),
        sql`${contacts.id} NOT IN (${sql.join(excludeIds.map(id => sql`${id}`), sql`, `)})`
      ));
    } else {
      return await db.select().from(contacts);
    }
  }

  async getClients(): Promise<Contact[]> {
    // Get contacts who have projects in deposit_paid or paid phases
    const contactsWithClientProjects = await db
      .select({ contactId: projects.contactId })
      .from(projects)
      .where(inArray(projects.pipelinePhase, ["ph_deposit_paid", "ph_paid"]));
    
    const includeIds = contactsWithClientProjects.map(p => p.contactId);
    
    if (includeIds.length > 0) {
      return await db.select().from(contacts).where(
        inArray(contacts.id, includeIds)
      );
    } else {
      return [];
    }
  }

  async convertLeadToCustomer(contactId: string): Promise<Contact> {
    console.log("🔄 CONVERTING LEAD TO CUSTOMER", { 
      contactId, 
      step: "lead_conversion_start",
      timestamp: new Date().toISOString()
    });
    
    try {
      // Update contact status to customer and related fields
      const result = await db.update(contacts).set({
        status: 'customer',
        pipelinePhase: 'ph_closed_won',
        leadSource: 'chat_booking_conversion',
        tags: sql`CASE 
          WHEN ${contacts.tags} IS NULL OR ${contacts.tags} = '[]'::jsonb 
          THEN '["customer", "converted_lead"]'::jsonb 
          ELSE ${contacts.tags} || '["customer", "converted_lead"]'::jsonb 
        END`,
        updatedAt: new Date()
      }).where(eq(contacts.id, contactId)).returning();
      
      if (result.length === 0) {
        throw new Error(`Contact ${contactId} not found for conversion`);
      }
      
      const convertedContact = result[0];
      
      console.log("✅ LEAD SUCCESSFULLY CONVERTED TO CUSTOMER", {
        customerId: contactId,
        previousStatus: 'lead',
        newStatus: 'customer',
        pipelinePhase: 'ph_closed_won',
        conversionComplete: true,
        step: "lead_conversion_success",
        timestamp: new Date().toISOString()
      });
      
      return convertedContact;
    } catch (error) {
      console.error("❌ LEAD CONVERSION FAILED", {
        contactId,
        error: error.message,
        step: "lead_conversion_error",
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  async getProject(id: string): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result[0];
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
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
      tags: insertProject.tags || [],
    }).returning();
    return result[0];
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const result = await db.update(projects).set(updates).where(eq(projects.id, id)).returning();
    if (result.length === 0) throw new Error("Project not found");
    return result[0];
  }

  async getProjectsByContact(contactId: string): Promise<Project[]> {
    if (!contactId) {
      return await db.select().from(projects);
    }
    return await db.select().from(projects).where(eq(projects.contactId, contactId));
  }

  async getBoats(): Promise<Boat[]> {
    return await db.select().from(boats);
  }

  async getActiveBoats(): Promise<Boat[]> {
    return await db.select().from(boats).where(eq(boats.active, true));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values({
      ...insertProduct,
      orgId: insertProduct.orgId || "org_demo",
      description: insertProduct.description || null,
      taxable: insertProduct.taxable !== undefined ? insertProduct.taxable : true,
      pricingModel: insertProduct.pricingModel || "hourly",
      productType: insertProduct.productType || "private_cruise",
      dayType: insertProduct.dayType || null,
      groupSize: insertProduct.groupSize || null,
      imageUrl: insertProduct.imageUrl || null,
      categoryType: insertProduct.categoryType || "experience",
      eventTypes: insertProduct.eventTypes || [],
      active: insertProduct.active !== undefined ? insertProduct.active : true,
    }).returning();
    return result[0];
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const result = await db.update(products).set(updates).where(eq(products.id, id)).returning();
    if (result.length === 0) throw new Error("Product not found");
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount > 0;
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    const result = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
    return result[0];
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    // Generate secure, time-limited access token for public access
    const accessToken = quoteTokenService.generateSecureToken(randomUUID(), {
      scope: 'quote:view',
      expiresIn: 30 * 24 * 60 * 60 * 1000, // 30 days
      audience: 'customer'
    });
    
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
      depositRequired: insertQuote.depositRequired !== undefined ? insertQuote.depositRequired : true,
      depositPercent: insertQuote.depositPercent || 25,
      depositAmount: insertQuote.depositAmount || 0,
      paymentSchedule: insertQuote.paymentSchedule || [],
      accessToken,
      accessTokenCreatedAt: new Date(),
      accessTokenRevokedAt: null,
      expiresAt: insertQuote.expiresAt || null,
      version: insertQuote.version || 1,
    }).returning();
    return result[0];
  }

  async updateQuote(id: string, updates: Partial<Quote>): Promise<Quote> {
    let updatedData = { ...updates };
    
    // If quote is being updated, optionally refresh the access token for extended access
    if (updates.status && (updates.status === 'SENT' || updates.status === 'VIEWED')) {
      const existingQuote = await this.getQuote(id);
      if (existingQuote?.accessToken) {
        const refreshResult = quoteTokenService.refreshToken(existingQuote.accessToken, {
          expiresIn: 60 * 24 * 60 * 60 * 1000 // 60 days for sent quotes
        });
        
        if (refreshResult.success && refreshResult.token) {
          updatedData.accessToken = refreshResult.token;
          updatedData.accessTokenCreatedAt = new Date();
        }
      }
    }
    
    const result = await db.update(quotes).set(updatedData).where(eq(quotes.id, id)).returning();
    if (result.length === 0) throw new Error("Quote not found");
    return result[0];
  }

  async getQuotesByProject(projectId: string): Promise<Quote[]> {
    return await db.select().from(quotes).where(eq(quotes.projectId, projectId));
  }

  // ===== INVOICE AND PAYMENT OPERATIONS =====

  async getInvoice(id: string): Promise<Invoice | undefined> {
    const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
    return result[0];
  }

  async getInvoiceByQuoteId(quoteId: string): Promise<Invoice | undefined> {
    const result = await db.select().from(invoices).where(eq(invoices.quoteId, quoteId)).limit(1);
    return result[0];
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
  }

  async getInvoices(filters?: {
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    limit?: number;
  }): Promise<any[]> {
    let query = db.select().from(invoices);
    
    if (filters?.status) {
      query = query.where(eq(invoices.status, filters.status));
    }
    
    // Apply sorting
    const sortOrder = filters?.sortOrder === 'asc' ? asc : desc;
    const sortColumn = filters?.sortBy === 'total' ? invoices.total : invoices.createdAt;
    query = query.orderBy(sortOrder(sortColumn));
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    return await query;
  }

  async createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt'>): Promise<Invoice> {
    const result = await db.insert(invoices).values(invoice).returning();
    return result[0];
  }

  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice> {
    const result = await db.update(invoices).set(updates).where(eq(invoices.id, id)).returning();
    if (result.length === 0) throw new Error("Invoice not found");
    return result[0];
  }

  async createPayment(payment: Omit<Payment, 'id'>): Promise<Payment> {
    const result = await db.insert(payments).values(payment).returning();
    return result[0];
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment> {
    const result = await db.update(payments).set(updates).where(eq(payments.id, id)).returning();
    if (result.length === 0) throw new Error("Payment not found");
    return result[0];
  }

  async getPaymentsByInvoice(invoiceId: string): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.invoiceId, invoiceId));
  }

  // ===== CHAT MESSAGES =====

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const result = await db.insert(chatMessages).values({
      ...insertMessage,
      contactId: insertMessage.contactId || null,
      metadata: insertMessage.metadata || {},
    }).returning();
    return result[0];
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    if (!sessionId) {
      return await db.select().from(chatMessages).orderBy(asc(chatMessages.createdAt));
    }
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(asc(chatMessages.createdAt));
  }

  // ===== AVAILABILITY OPERATIONS =====

  async getAvailabilitySlots(startDate: Date, endDate: Date): Promise<AvailabilitySlot[]> {
    return await db.select().from(availabilitySlots).where(
      and(
        gte(availabilitySlots.startTime, startDate),
        lte(availabilitySlots.startTime, endDate)
      )
    );
  }

  async createAvailabilitySlot(slot: Omit<AvailabilitySlot, 'id'>): Promise<AvailabilitySlot> {
    const result = await db.insert(availabilitySlots).values(slot).returning();
    return result[0];
  }

  async bookAvailabilitySlot(slotId: string, projectId: string): Promise<AvailabilitySlot> {
    const result = await db.update(availabilitySlots)
      .set({ status: "BOOKED", projectId })
      .where(eq(availabilitySlots.id, slotId))
      .returning();
    
    if (result.length === 0) throw new Error("Availability slot not found");
    return result[0];
  }

  // ===== QUOTE TEMPLATES =====

  async getQuoteTemplate(id: string): Promise<QuoteTemplate | undefined> {
    const result = await db.select().from(quoteTemplates).where(eq(quoteTemplates.id, id)).limit(1);
    return result[0];
  }

  async getQuoteTemplates(): Promise<QuoteTemplate[]> {
    return await db.select().from(quoteTemplates)
      .where(eq(quoteTemplates.active, true))
      .orderBy(asc(quoteTemplates.displayOrder));
  }

  async getQuoteTemplatesByEventType(eventType: string): Promise<QuoteTemplate[]> {
    return await db.select().from(quoteTemplates)
      .where(and(eq(quoteTemplates.active, true), eq(quoteTemplates.eventType, eventType)))
      .orderBy(asc(quoteTemplates.displayOrder));
  }

  async createQuoteTemplate(insertTemplate: InsertQuoteTemplate): Promise<QuoteTemplate> {
    const result = await db.insert(quoteTemplates).values({
      ...insertTemplate,
      description: insertTemplate.description || null,
      orgId: insertTemplate.orgId || "org_demo",
      defaultItems: insertTemplate.defaultItems || [],
      defaultRadioSections: insertTemplate.defaultRadioSections || [],
      minGroupSize: insertTemplate.minGroupSize || null,
      maxGroupSize: insertTemplate.maxGroupSize || null,
      basePricePerPerson: insertTemplate.basePricePerPerson || null,
      active: insertTemplate.active !== undefined ? insertTemplate.active : true,
      displayOrder: insertTemplate.displayOrder || 0,
      visualTheme: insertTemplate.visualTheme || {},
      automationRules: insertTemplate.automationRules || [],
      isDefault: insertTemplate.isDefault || false,
    }).returning();
    return result[0];
  }

  async updateQuoteTemplate(id: string, updates: Partial<QuoteTemplate>): Promise<QuoteTemplate> {
    const result = await db.update(quoteTemplates).set(updates).where(eq(quoteTemplates.id, id)).returning();
    if (result.length === 0) throw new Error("Quote template not found");
    return result[0];
  }

  async deleteQuoteTemplate(id: string): Promise<boolean> {
    const result = await db.delete(quoteTemplates).where(eq(quoteTemplates.id, id));
    return result.rowCount > 0;
  }

  // ===== PRICING SETTINGS =====

  async getPricingSettings(orgId?: string): Promise<PricingSettings | undefined> {
    const id = `pricing_${orgId || "org_demo"}`;
    const result = await db.select().from(pricingSettings).where(eq(pricingSettings.id, id)).limit(1);
    return result[0];
  }

  async updatePricingSettings(updates: Partial<PricingSettings>, orgId?: string): Promise<PricingSettings> {
    const id = `pricing_${orgId || "org_demo"}`;
    
    try {
      // Try to update existing settings
      const result = await db.update(pricingSettings)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(pricingSettings.id, id))
        .returning();
      
      if (result.length > 0) {
        return result[0];
      }
    } catch (error) {
      // Settings don't exist, create them
    }
    
    // Create new settings if none exist
    const newSettings = {
      id,
      orgId: orgId || "org_demo",
      taxRate: 825,
      defaultGratuityPercent: 18,
      gratuityIncluded: false,
      defaultDepositPercent: 25,
      urgencyThresholdDays: 30,
      fullPaymentThresholdDays: 14,
      currency: "USD",
      timezone: "America/Chicago",
      priceDisplayMode: "both" as const,
      dayOfWeekMultipliers: null,
      seasonalAdjustments: [],
      updatedAt: new Date(),
      ...updates,
    };
    
    const result = await db.insert(pricingSettings).values(newSettings).returning();
    return result[0];
  }

  // ===== PLACEHOLDER FOR COMPLEX OPERATIONS =====
  // These methods need more complex implementation but are needed for the interface

  async calculateCruisePricing(params: {
    groupSize: number;
    eventDate: Date;
    timeSlot: string;
    promoCode?: string;
  }): Promise<PricingPreview> {
    const { groupSize, eventDate } = params;
    
    // Import pricing constants
    const { HOURLY_RATES, CRUISE_DURATIONS, PRICING_DEFAULTS } = await import('@shared/constants');
    
    // Determine boat capacity tier based on group size
    let capacityTier: number;
    if (groupSize <= 14) capacityTier = 14;
    else if (groupSize <= 25) capacityTier = 25;
    else if (groupSize <= 30) capacityTier = 30;
    else if (groupSize <= 50) capacityTier = 50;
    else capacityTier = 75;
    
    // Determine if it's weekend (Friday=5, Saturday=6, Sunday=0) or weekday
    const dayOfWeek = eventDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6; // Sun, Fri, Sat
    
    // Get hourly rate and duration
    const hourlyRate = isWeekend ? HOURLY_RATES.WEEKEND[capacityTier] : HOURLY_RATES.WEEKDAY[capacityTier];
    const duration = isWeekend ? CRUISE_DURATIONS.WEEKEND : CRUISE_DURATIONS.WEEKDAY;
    
    // Calculate base cruise cost
    const baseCruiseCost = hourlyRate * duration;
    
    // Add crew fee for groups >20 people
    const crewFee = groupSize > 20 ? PRICING_DEFAULTS.EXTRA_CREW_FEE : 0;
    
    // Calculate subtotal (base + crew fee)
    const subtotal = baseCruiseCost + crewFee;
    
    // Calculate tax and gratuity on subtotal
    const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
    const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
    
    // Calculate total
    const total = subtotal + tax + gratuity;
    
    // Calculate deposit based on event date (30-day rule)
    const today = new Date();
    const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const depositPercent = daysUntilEvent >= PRICING_DEFAULTS.URGENCY_THRESHOLD_DAYS ? 
      PRICING_DEFAULTS.DEPOSIT_PERCENT : 100;
    const depositAmount = Math.floor(total * (depositPercent / 100));
    
    return {
      subtotal,
      discountTotal: 0,
      tax,
      gratuity,
      total,
      perPersonCost: Math.floor(total / groupSize),
      depositAmount,
      depositPercent,
      depositRequired: true,
      paymentSchedule: [],
      appliedDiscounts: [],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
  }

  async calculatePricing(params: {
    items: any[];
    groupSize?: number;
    projectDate?: Date;
    promoCode?: string;
    templateId?: string;
  }): Promise<PricingPreview> {
    const { items, groupSize, projectDate } = params;
    
    // Import pricing constants
    const { PRICING_DEFAULTS } = await import('@shared/constants');
    
    // Calculate subtotal from items
    const subtotal = items.reduce((sum, item) => {
      const itemTotal = (item.unitPrice || 0) * (item.qty || item.quantity || 1);
      return sum + itemTotal;
    }, 0);
    
    // Apply discount logic if promo code provided
    let discountTotal = 0;
    if (params.promoCode) {
      const discountRule = await this.getDiscountRuleByCode(params.promoCode);
      if (discountRule && discountRule.active) {
        if (discountRule.discountType === 'percentage') {
          discountTotal = Math.floor(subtotal * (discountRule.discountValue / 100));
        } else if (discountRule.discountType === 'fixed_amount') {
          discountTotal = Math.min(discountRule.discountValue * 100, subtotal); // Convert to cents and cap at subtotal
        }
      }
    }
    
    // Calculate adjusted subtotal after discount
    const adjustedSubtotal = subtotal - discountTotal;
    
    // Calculate tax and gratuity on adjusted subtotal
    const tax = Math.floor(adjustedSubtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
    const gratuity = Math.floor(adjustedSubtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
    
    // Calculate total
    const total = adjustedSubtotal + tax + gratuity;
    
    // Calculate deposit based on project date (30-day rule)
    let depositPercent = PRICING_DEFAULTS.DEPOSIT_PERCENT;
    let depositAmount = Math.floor(total * (depositPercent / 100));
    
    if (projectDate) {
      const today = new Date();
      const daysUntilEvent = Math.ceil((projectDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      depositPercent = daysUntilEvent >= PRICING_DEFAULTS.URGENCY_THRESHOLD_DAYS ? 
        PRICING_DEFAULTS.DEPOSIT_PERCENT : 100;
      depositAmount = Math.floor(total * (depositPercent / 100));
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
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
  }

  async findOrCreateContact(email: string, name?: string, phone?: string): Promise<Contact> {
    const existing = await this.getContactByEmail(email);
    if (existing) {
      return existing;
    }
    
    return await this.createContact({
      name: name || 'Unknown',
      email,
      phone: phone || null,
      tags: [],
    });
  }

  async createProjectFromChatData(contactId: string, extractedData: any): Promise<Project> {
    return await this.createProject({
      contactId,
      title: extractedData.title || null,
      eventType: extractedData.eventType || null,
      groupSize: extractedData.groupSize || null,
      projectDate: extractedData.projectDate || null,
      specialRequests: extractedData.specialRequests || null,
      preferredTime: extractedData.preferredTime || null,
      budget: extractedData.budget || null,
      tags: [],
    });
  }

  // ===== STUB METHODS FOR NOW =====
  // These methods need full implementation but are stubbed for basic functionality

  async getProductsByType(productType: string): Promise<Product[]> {
    return await db.select().from(products)
      .where(and(eq(products.productType, productType), eq(products.active, true)));
  }

  async getProductsByEventType(eventType: string): Promise<Product[]> {
    return await db.select().from(products)
      .where(and(
        eq(products.active, true),
        or(
          sql`array_length(${products.eventTypes}, 1) = 0`,
          sql`${eventType} = ANY(${products.eventTypes})`
        )
      ));
  }

  async getDiscoCruiseProducts(): Promise<Product[]> {
    return this.getProductsByType("disco_cruise");
  }

  async getPrivateCruiseProducts(): Promise<Product[]> {
    return this.getProductsByType("private_cruise");
  }

  // ===== PLACEHOLDER METHODS =====
  // Implementing minimal versions of remaining methods to satisfy the interface

  async getTemplateRule(id: string): Promise<TemplateRule | undefined> {
    const result = await db.select().from(templateRules).where(eq(templateRules.id, id)).limit(1);
    return result[0];
  }

  async getTemplateRules(): Promise<TemplateRule[]> {
    return await db.select().from(templateRules).where(eq(templateRules.active, true));
  }

  async getTemplateRulesByType(ruleType: string): Promise<TemplateRule[]> {
    return await db.select().from(templateRules)
      .where(and(eq(templateRules.active, true), eq(templateRules.ruleType, ruleType)));
  }

  async createTemplateRule(insertRule: InsertTemplateRule): Promise<TemplateRule> {
    const result = await db.insert(templateRules).values({
      ...insertRule,
      description: insertRule.description || null,
      orgId: insertRule.orgId || "org_demo",
      conditions: insertRule.conditions || [],
      actions: insertRule.actions || [],
      priority: insertRule.priority || 0,
      active: insertRule.active !== undefined ? insertRule.active : true,
    }).returning();
    return result[0];
  }

  async updateTemplateRule(id: string, updates: Partial<TemplateRule>): Promise<TemplateRule> {
    const result = await db.update(templateRules).set(updates).where(eq(templateRules.id, id)).returning();
    if (result.length === 0) throw new Error("Template rule not found");
    return result[0];
  }

  async deleteTemplateRule(id: string): Promise<boolean> {
    const result = await db.delete(templateRules).where(eq(templateRules.id, id));
    return result.rowCount > 0;
  }

  // ===== DISCOUNT RULES =====

  async getDiscountRule(id: string): Promise<DiscountRule | undefined> {
    const result = await db.select().from(discountRules).where(eq(discountRules.id, id)).limit(1);
    return result[0];
  }

  async getDiscountRules(): Promise<DiscountRule[]> {
    return await db.select().from(discountRules);
  }

  async getActiveDiscountRules(): Promise<DiscountRule[]> {
    const now = new Date();
    return await db.select().from(discountRules).where(
      and(
        eq(discountRules.active, true),
        or(isNull(discountRules.validFrom), lte(discountRules.validFrom, now)),
        or(isNull(discountRules.validUntil), gte(discountRules.validUntil, now))
      )
    );
  }

  async getDiscountRuleByCode(code: string): Promise<DiscountRule | undefined> {
    const result = await db.select().from(discountRules)
      .where(and(eq(discountRules.code, code), eq(discountRules.active, true)))
      .limit(1);
    return result[0];
  }

  async createDiscountRule(insertRule: InsertDiscountRule): Promise<DiscountRule> {
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
      active: insertRule.active !== undefined ? insertRule.active : true,
      conditions: insertRule.conditions || [],
    }).returning();
    return result[0];
  }

  async updateDiscountRule(id: string, updates: Partial<DiscountRule>): Promise<DiscountRule> {
    const result = await db.update(discountRules).set(updates).where(eq(discountRules.id, id)).returning();
    if (result.length === 0) throw new Error("Discount rule not found");
    return result[0];
  }

  async deleteDiscountRule(id: string): Promise<boolean> {
    const result = await db.delete(discountRules).where(eq(discountRules.id, id));
    return result.rowCount > 0;
  }

  // ===== AFFILIATE OPERATIONS =====

  async getAffiliate(id: string): Promise<Affiliate | undefined> {
    const result = await db.select().from(affiliates).where(eq(affiliates.id, id)).limit(1);
    return result[0];
  }

  async getAffiliates(): Promise<Affiliate[]> {
    return await db.select().from(affiliates);
  }

  async getAffiliateByCode(code: string): Promise<Affiliate | undefined> {
    const result = await db.select().from(affiliates).where(eq(affiliates.code, code)).limit(1);
    return result[0];
  }

  async createAffiliate(insertAffiliate: InsertAffiliate): Promise<Affiliate> {
    const result = await db.insert(affiliates).values({
      ...insertAffiliate,
      orgId: insertAffiliate.orgId || "org_demo",
      description: insertAffiliate.description || null,
      commissionPercent: insertAffiliate.commissionPercent || 10,
      active: insertAffiliate.active !== undefined ? insertAffiliate.active : true,
      totalReferrals: insertAffiliate.totalReferrals || 0,
      totalCommission: insertAffiliate.totalCommission || 0,
    }).returning();
    return result[0];
  }

  async updateAffiliate(id: string, updates: Partial<Affiliate>): Promise<Affiliate> {
    const result = await db.update(affiliates).set(updates).where(eq(affiliates.id, id)).returning();
    if (result.length === 0) throw new Error("Affiliate not found");
    return result[0];
  }

  async deleteAffiliate(id: string): Promise<boolean> {
    const result = await db.delete(affiliates).where(eq(affiliates.id, id));
    return result.rowCount > 0;
  }

  // ===== BOOKING OPERATIONS =====

  async getBooking(id: string): Promise<Booking | undefined> {
    const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    return result[0];
  }

  async getBookings(filters?: {
    status?: string;
    boatId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Booking[]> {
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

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values({
      ...insertBooking,
      orgId: insertBooking.orgId || "org_demo",
      status: insertBooking.status || "CONFIRMED",
      guests: insertBooking.guests || 1,
      notes: insertBooking.notes || null,
      customerNotes: insertBooking.customerNotes || null,
      specialRequests: insertBooking.specialRequests || null,
      equipmentNeeds: insertBooking.equipmentNeeds || [],
    }).returning();
    return result[0];
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const result = await db.update(bookings).set(updates).where(eq(bookings.id, id)).returning();
    if (result.length === 0) throw new Error("Booking not found");
    return result[0];
  }

  async deleteBooking(id: string): Promise<boolean> {
    const result = await db.delete(bookings).where(eq(bookings.id, id));
    return result.rowCount > 0;
  }

  async getBookingsByProject(projectId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.projectId, projectId));
  }

  async getBookingsByBoat(boatId: string, startDate: Date, endDate: Date): Promise<Booking[]> {
    return await db.select().from(bookings).where(
      and(
        eq(bookings.boatId, boatId),
        gte(bookings.startTime, startDate),
        lte(bookings.startTime, endDate)
      )
    );
  }

  // ===== TIMEFRAME OPERATIONS =====

  async getTimeframes(): Promise<Timeframe[]> {
    return await db.select().from(timeframes).orderBy(asc(timeframes.dayOfWeek), asc(timeframes.startTime));
  }

  async getTimeframesByDay(dayOfWeek: number): Promise<Timeframe[]> {
    return await db.select().from(timeframes)
      .where(eq(timeframes.dayOfWeek, dayOfWeek))
      .orderBy(asc(timeframes.startTime));
  }

  async createTimeframe(insertTimeframe: InsertTimeframe): Promise<Timeframe> {
    const result = await db.insert(timeframes).values({
      ...insertTimeframe,
      orgId: insertTimeframe.orgId || "org_demo",
    }).returning();
    return result[0];
  }

  async updateTimeframe(id: string, updates: Partial<Timeframe>): Promise<Timeframe> {
    const result = await db.update(timeframes).set(updates).where(eq(timeframes.id, id)).returning();
    if (result.length === 0) throw new Error("Timeframe not found");
    return result[0];
  }

  async deleteTimeframe(id: string): Promise<boolean> {
    const result = await db.delete(timeframes).where(eq(timeframes.id, id));
    return result.rowCount > 0;
  }

  // ===== DISCO SLOT OPERATIONS =====

  async getDiscoSlots(): Promise<DiscoSlot[]> {
    return await db.select().from(discoSlots).orderBy(asc(discoSlots.date));
  }

  async getDiscoSlot(id: string): Promise<DiscoSlot | undefined> {
    const result = await db.select().from(discoSlots).where(eq(discoSlots.id, id)).limit(1);
    return result[0];
  }

  async createDiscoSlot(insertSlot: InsertDiscoSlot): Promise<DiscoSlot> {
    const result = await db.insert(discoSlots).values({
      ...insertSlot,
      orgId: insertSlot.orgId || "org_demo",
      maxCapacity: insertSlot.maxCapacity || 50,
      ticketPrice: insertSlot.ticketPrice || 8500,
      available: insertSlot.available !== undefined ? insertSlot.available : true,
    }).returning();
    return result[0];
  }

  async updateDiscoSlot(id: string, updates: Partial<DiscoSlot>): Promise<DiscoSlot> {
    const result = await db.update(discoSlots).set(updates).where(eq(discoSlots.id, id)).returning();
    if (result.length === 0) throw new Error("Disco slot not found");
    return result[0];
  }

  async deleteDiscoSlot(id: string): Promise<boolean> {
    const result = await db.delete(discoSlots).where(eq(discoSlots.id, id));
    return result.rowCount > 0;
  }

  // ===== DATE RANGE QUERY METHODS =====

  async getBookingsInRange(startDate: Date, endDate: Date): Promise<Booking[]> {
    return await this.getBookings({
      startDate,
      endDate
    });
  }

  async getDiscoSlotsInRange(startDate: Date, endDate: Date): Promise<DiscoSlot[]> {
    return await db.select().from(discoSlots)
      .where(
        and(
          gte(discoSlots.date, startDate),
          lte(discoSlots.date, endDate)
        )
      )
      .orderBy(asc(discoSlots.date));
  }

  // ===== EMAIL TEMPLATE OPERATIONS =====

  async getEmailTemplate(id: string): Promise<EmailTemplate | undefined> {
    const result = await db.select().from(emailTemplates).where(eq(emailTemplates.id, id)).limit(1);
    return result[0];
  }

  async getEmailTemplates(): Promise<EmailTemplate[]> {
    return await db.select().from(emailTemplates);
  }

  async getEmailTemplatesByType(templateType: string): Promise<EmailTemplate[]> {
    return await db.select().from(emailTemplates)
      .where(eq(emailTemplates.templateType, templateType));
  }

  async createEmailTemplate(insertTemplate: InsertEmailTemplate): Promise<EmailTemplate> {
    const result = await db.insert(emailTemplates).values({
      ...insertTemplate,
      orgId: insertTemplate.orgId || "org_demo",
      description: insertTemplate.description || null,
      isDefault: insertTemplate.isDefault || false,
    }).returning();
    return result[0];
  }

  async updateEmailTemplate(id: string, updates: Partial<EmailTemplate>): Promise<EmailTemplate> {
    const result = await db.update(emailTemplates).set(updates).where(eq(emailTemplates.id, id)).returning();
    if (result.length === 0) throw new Error("Email template not found");
    return result[0];
  }

  async deleteEmailTemplate(id: string): Promise<boolean> {
    const result = await db.delete(emailTemplates).where(eq(emailTemplates.id, id));
    return result.rowCount > 0;
  }

  // ===== MASTER TEMPLATE OPERATIONS =====

  async getMasterTemplate(id: string): Promise<MasterTemplate | undefined> {
    const result = await db.select().from(masterTemplates).where(eq(masterTemplates.id, id)).limit(1);
    return result[0];
  }

  async getMasterTemplates(): Promise<MasterTemplate[]> {
    return await db.select().from(masterTemplates);
  }

  async createMasterTemplate(insertTemplate: InsertMasterTemplate): Promise<MasterTemplate> {
    const result = await db.insert(masterTemplates).values({
      ...insertTemplate,
      orgId: insertTemplate.orgId || "org_demo",
      content: insertTemplate.content || "",
    }).returning();
    return result[0];
  }

  async updateMasterTemplate(id: string, updates: Partial<MasterTemplate>): Promise<MasterTemplate> {
    const result = await db.update(masterTemplates).set(updates).where(eq(masterTemplates.id, id)).returning();
    if (result.length === 0) throw new Error("Master template not found");
    return result[0];
  }

  async deleteMasterTemplate(id: string): Promise<boolean> {
    const result = await db.delete(masterTemplates).where(eq(masterTemplates.id, id));
    return result.rowCount > 0;
  }

  // ===== BOOKING CONFLICT CHECKING AND PAYMENT METHODS =====
  
  /**
   * Check if a booking would conflict with existing bookings for the specified boat and time range
   * Uses proper interval overlap logic: intervals [a1, a2] and [b1, b2] overlap if a1 < b2 AND a2 > b1
   */
  async checkBookingConflict(boatId: string, startTime: Date, endTime: Date, excludeBookingId?: string): Promise<boolean> {
    // Get all active bookings for this boat
    const existingBookings = await db.select()
      .from(bookings)
      .where(
        and(
          eq(bookings.boatId, boatId),
          inArray(bookings.status, ['booked', 'confirmed', 'hold']), // exclude canceled/blocked
          excludeBookingId ? sql`${bookings.id} != ${excludeBookingId}` : sql`true`
        )
      );
    
    // Check for time interval overlaps using proper overlap logic
    return existingBookings.some(booking => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      
      // Intervals overlap if startTime < bookingEnd AND endTime > bookingStart
      return startTime.getTime() < bookingEnd.getTime() && endTime.getTime() > bookingStart.getTime();
    });
  }

  /**
   * Create a booking from a successful payment with proper slot hold integration
   * This prevents the critical double-booking vulnerability by using slot hold data
   */
  async createBookingFromPayment(projectId: string, paymentId: string, amount: number): Promise<Booking> {
    console.log(`🔒 Creating booking from payment ${paymentId} for project ${projectId}`);
    
    // 1. Get project details
    const project = await this.getProject(projectId);
    if (!project) {
      throw new Error(`Project ${projectId} not found for booking creation`);
    }
    
    if (!project.projectDate) {
      throw new Error(`Project ${projectId} has no event date set`);
    }
    
    // 2. Get contact details
    const contact = await this.getContact(project.contactId);
    if (!contact) {
      throw new Error(`Contact ${project.contactId} not found for booking creation`);
    }
    
    // 3. Try to find an active slot hold for this project
    // This ensures we use the exact selected slot information
    let startTime: Date;
    let endTime: Date;
    let boatId: string;
    let slotHoldFound = false;
    
    try {
      // Look for any active slot holds that might be related to this project
      const activeHolds = await this.getActiveSlotHolds();
      const projectHold = activeHolds.find(hold => {
        // Match by date and group size as a heuristic
        const holdDate = new Date(hold.dateISO);
        const projectDate = new Date(project.projectDate!);
        return (
          holdDate.toDateString() === projectDate.toDateString() &&
          hold.groupSize === project.groupSize &&
          hold.expiresAt > new Date() // Still active
        );
      });
      
      if (projectHold) {
        console.log(`📍 Found matching slot hold ${projectHold.id} for project ${projectId}`);
        
        // Use slot hold data for exact timing and boat
        const eventDate = new Date(projectHold.dateISO);
        const [startHours, startMinutes] = projectHold.startTime.split(':');
        const [endHours, endMinutes] = projectHold.endTime.split(':');
        
        startTime = new Date(eventDate);
        startTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
        
        endTime = new Date(eventDate);
        endTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
        
        // Use slot hold's boat or find one if not specified
        boatId = projectHold.boatId || await this.findAvailableBoatForSlot(projectHold, project.groupSize || 1);
        
        if (!boatId) {
          throw new Error(`No boats available for slot hold ${projectHold.id}`);
        }
        
        slotHoldFound = true;
        
        // Release the hold since we're converting it to a booking
        await this.releaseSlotHold(projectHold.id);
        console.log(`✅ Released slot hold ${projectHold.id} after booking creation`);
      }
    } catch (error) {
      console.warn(`⚠️ Could not find or use slot hold for project ${projectId}:`, error);
      // Continue with fallback logic
    }
    
    // 4. Fallback logic if no slot hold found
    if (!slotHoldFound) {
      console.log(`📋 No slot hold found, using project data for booking creation`);
      
      // FIXED: Use project.projectDate properly, not midnight times
      if (project.timeSlot) {
        // Try to parse time from project.timeSlot if available
        const timeMatch = project.timeSlot.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))\s*-\s*(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
        if (timeMatch) {
          const [, startTimeStr, endTimeStr] = timeMatch;
          
          startTime = new Date(project.projectDate);
          endTime = new Date(project.projectDate);
          
          // Parse and set times
          const parseTime = (timeStr: string, dateObj: Date) => {
            const [time, period] = timeStr.trim().split(/\s+/);
            const [hours, minutes] = time.split(':').map(Number);
            let hour24 = hours;
            
            if (period.toUpperCase() === 'PM' && hours !== 12) {
              hour24 += 12;
            } else if (period.toUpperCase() === 'AM' && hours === 12) {
              hour24 = 0;
            }
            
            dateObj.setHours(hour24, minutes, 0, 0);
          };
          
          parseTime(startTimeStr, startTime);
          parseTime(endTimeStr, endTime);
        } else {
          // Fallback to duration-based calculation
          startTime = new Date(project.projectDate);
          const duration = project.duration || 4; // default 4 hours
          endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);
        }
      } else {
        // Fallback to duration-based calculation
        startTime = new Date(project.projectDate);
        const duration = project.duration || 4; // default 4 hours
        endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);
      }
      
      // FIXED: Don't use project.availabilitySlotId as boatId (wrong field!)
      // Instead, find appropriate boat based on group size
      if (project.groupSize) {
        const availableBoats = await this.getBoatsByCapacity(project.groupSize);
        
        // Find a boat that doesn't have conflicts
        for (const boat of availableBoats) {
          const hasConflict = await this.checkBookingConflict(boat.id, startTime, endTime);
          if (!hasConflict) {
            boatId = boat.id;
            break;
          }
        }
        
        if (!boatId) {
          throw new Error(`No available boats found for group size ${project.groupSize} at ${startTime.toISOString()}`);
        }
      } else {
        throw new Error('No group size specified for booking creation');
      }
    }
    
    // 5. CRITICAL: Final conflict check before creating the booking
    const hasConflict = await this.checkBookingConflict(boatId, startTime, endTime);
    if (hasConflict) {
      throw new Error(`BOOKING_CONFLICT: Boat ${boatId} is already booked for ${startTime.toISOString()} - ${endTime.toISOString()}`);
    }
    
    // 6. Create the booking with validated data
    const bookingData: InsertBooking = {
      orgId: project.orgId,
      boatId,
      type: 'private',
      status: 'booked',
      startTime,
      endTime,
      partyType: project.eventType || 'cruise',
      groupSize: project.groupSize || 1,
      projectId: project.id,
      paymentStatus: 'deposit_paid',
      amountPaid: amount,
      totalAmount: amount, // TODO: Calculate from quote if available
      contactName: contact.name,
      contactEmail: contact.email,
      contactPhone: contact.phone || null,
      specialRequests: project.specialRequests || null,
      notes: `Created from payment ${paymentId} - Amount: $${(amount / 100).toFixed(2)}${slotHoldFound ? ' - From slot hold' : ' - Fallback logic'}`,
    };
    
    const newBooking = await this.createBooking(bookingData);
    
    // 7. Update project status to closed won
    await this.updateProject(projectId, { 
      status: 'CLOSED_WON',
      pipelinePhase: 'ph_closed_won'
    });
    
    // 8. Convert lead to customer
    await this.convertLeadToCustomer(project.contactId);
    
    console.log(`✅ Booking ${newBooking.id} created successfully from payment ${paymentId}`);
    return newBooking;
  }
  
  /**
   * Helper method to find an available boat for a slot hold
   */
  private async findAvailableBoatForSlot(slotHold: any, groupSize: number): Promise<string> {
    if (slotHold.boatId) {
      return slotHold.boatId;
    }
    
    // Find boats that can accommodate the group size
    const boats = await this.getActiveBoats();
    const suitableBoats = boats.filter(boat => boat.capacity >= groupSize);
    
    // Convert hold time to Date objects for conflict checking
    const eventDate = new Date(slotHold.dateISO);
    const [startHours, startMinutes] = slotHold.startTime.split(':');
    const [endHours, endMinutes] = slotHold.endTime.split(':');
    
    const startTime = new Date(eventDate);
    startTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
    
    const endTime = new Date(eventDate);
    endTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
    
    // Check each suitable boat for conflicts
    for (const boat of suitableBoats) {
      const hasConflict = await this.checkBookingConflict(boat.id, startTime, endTime);
      if (!hasConflict) {
        return boat.id;
      }
    }
    
    throw new Error('No available boats found for slot hold');
  }

  // ===== PLACEHOLDER METHODS FOR REMAINING INTERFACE METHODS =====
  // These need to be implemented but are stubbed for now to satisfy the interface

  async createSmsAuthToken(token: Omit<SmsAuthToken, 'id'>): Promise<SmsAuthToken> {
    // TODO: Implement with database table
    return { ...token, id: randomUUID() };
  }

  async getSmsAuthToken(phone: string): Promise<SmsAuthToken | undefined> {
    // TODO: Implement with database table
    return undefined;
  }

  async updateSmsAuthToken(phone: string, updates: Partial<SmsAuthToken>): Promise<SmsAuthToken | undefined> {
    // TODO: Implement with database table
    return undefined;
  }

  async deleteSmsAuthToken(phone: string): Promise<boolean> {
    // TODO: Implement with database table
    return true;
  }

  // Customer sessions - stub implementations
  async createCustomerSession(session: Omit<CustomerSession, 'id'>): Promise<CustomerSession> {
    return { ...session, id: randomUUID() };
  }

  async getCustomerSession(sessionId: string): Promise<CustomerSession | undefined> {
    return undefined;
  }

  async updateCustomerSession(sessionId: string, updates: Partial<CustomerSession>): Promise<CustomerSession | undefined> {
    return undefined;
  }

  async deleteCustomerSession(sessionId: string): Promise<boolean> {
    return true;
  }

  async getCustomerSessionsByPhone(phone: string): Promise<CustomerSession[]> {
    return [];
  }

  async getActiveCustomerSessions(): Promise<CustomerSession[]> {
    return [];
  }

  // Portal activity logs - stub implementations
  async createPortalActivityLog(log: Omit<PortalActivityLog, 'id'>): Promise<PortalActivityLog> {
    return { ...log, id: randomUUID() };
  }

  async getPortalActivityLogs(sessionId: string): Promise<PortalActivityLog[]> {
    return [];
  }

  async getPortalActivityLogsByPhone(phone: string): Promise<PortalActivityLog[]> {
    return [];
  }

  // Rate limiting - stub implementations
  async createPhoneRateLimit(rateLimit: PhoneRateLimit): Promise<PhoneRateLimit> {
    return rateLimit;
  }

  async getPhoneRateLimit(phone: string): Promise<PhoneRateLimit | undefined> {
    return undefined;
  }

  async updatePhoneRateLimit(phone: string, updates: Partial<PhoneRateLimit>): Promise<PhoneRateLimit | undefined> {
    return undefined;
  }

  async deletePhoneRateLimit(phone: string): Promise<boolean> {
    return true;
  }

  // Verification attempts - stub implementations
  async createCustomerVerificationAttempts(attempts: CustomerVerificationAttempts): Promise<CustomerVerificationAttempts> {
    return attempts;
  }

  async getCustomerVerificationAttempts(phone: string): Promise<CustomerVerificationAttempts | undefined> {
    return undefined;
  }

  async updateCustomerVerificationAttempts(phone: string, updates: Partial<CustomerVerificationAttempts>): Promise<CustomerVerificationAttempts | undefined> {
    return undefined;
  }

  async deleteCustomerVerificationAttempts(phone: string): Promise<boolean> {
    return true;
  }

  // Partial leads - stub implementations  
  async createPartialLead(lead: Omit<PartialLead, 'id'>): Promise<PartialLead> {
    return { ...lead, id: randomUUID() };
  }

  async getPartialLead(sessionId: string): Promise<PartialLead | undefined> {
    return undefined;
  }

  async getPartialLeadById(id: string): Promise<PartialLead | undefined> {
    return undefined;
  }

  async updatePartialLead(sessionId: string, updates: Partial<PartialLead>): Promise<PartialLead | undefined> {
    return undefined;
  }

  async deletePartialLead(sessionId: string): Promise<boolean> {
    return true;
  }

  // Analytics and tracking - stub implementations
  async createQuoteAnalytics(analytics: Omit<QuoteAnalytics, 'id'>): Promise<QuoteAnalytics> {
    return { ...analytics, id: randomUUID() };
  }

  async getQuoteAnalytics(quoteId: string): Promise<QuoteAnalytics[]> {
    return [];
  }

  async createFileSend(fileSend: Omit<FileSend, 'id'>): Promise<FileSend> {
    return { ...fileSend, id: randomUUID() };
  }

  async getFileSends(contactId: string): Promise<FileSend[]> {
    return [];
  }

  async createEmailTracking(emailTracking: InsertEmailTracking): Promise<EmailTracking> {
    return { ...emailTracking, id: randomUUID() } as EmailTracking;
  }

  async getEmailTracking(contactId: string): Promise<EmailTracking[]> {
    return [];
  }

  async trackEmailOpen(emailId: string): Promise<EmailTracking> {
    return { id: randomUUID(), emailId, contactId: '', openedAt: new Date() } as EmailTracking;
  }

  async trackEmailClick(emailId: string): Promise<EmailTracking> {
    return { id: randomUUID(), emailId, contactId: '', clickedAt: new Date() } as EmailTracking;
  }

  async updateEmailDeliveryStatus(emailId: string, status: 'delivered' | 'bounced', metadata?: Record<string, any>): Promise<EmailTracking> {
    return { id: randomUUID(), emailId, contactId: '', status } as EmailTracking;
  }

  async findEmailTrackingByMessageId(messageId: string, provider: string): Promise<EmailTracking | undefined> {
    return undefined;
  }

  async updateEmailUnsubscribeStatus(emailId: string, metadata?: Record<string, any>): Promise<EmailTracking> {
    return { id: randomUUID(), emailId, contactId: '', unsubscribed: true } as EmailTracking;
  }

  // Customer lifecycle - stub implementations
  async createCustomerLifecycle(lifecycle: InsertCustomerLifecycle): Promise<CustomerLifecycle> {
    return { ...lifecycle, id: randomUUID() } as CustomerLifecycle;
  }

  async getCustomerLifecycle(contactId: string): Promise<CustomerLifecycle | undefined> {
    return undefined;
  }

  async updateCustomerLifecycleStage(contactId: string, newStage: LifecycleStage, notes?: string): Promise<CustomerLifecycle> {
    return { id: randomUUID(), contactId, stage: newStage, notes } as CustomerLifecycle;
  }

  async calculateCustomerLifecycleMetrics(contactId: string): Promise<{
    daysInCurrentStage: number;
    totalDays: number;
    conversionProbability: number;
    nextActionRequired?: string;
    nextActionDue?: Date;
  }> {
    return {
      daysInCurrentStage: 0,
      totalDays: 0,
      conversionProbability: 0,
    };
  }

  // Customer activity - stub implementations
  async createCustomerActivity(activity: InsertCustomerActivity): Promise<CustomerActivity> {
    return { ...activity, id: randomUUID() } as CustomerActivity;
  }

  async getCustomerActivity(contactId: string, limit?: number): Promise<CustomerActivity[]> {
    return [];
  }

  async getCustomerActivityByType(contactId: string, activityType: ActivityType): Promise<CustomerActivity[]> {
    return [];
  }

  async getCustomerActivityStats(contactId: string): Promise<{
    totalActivities: number;
    lastActivity?: Date;
    daysSinceLastContact: number;
    totalTouchpoints: number;
    activitiesByType: Record<string, number>;
  }> {
    return {
      totalActivities: 0,
      daysSinceLastContact: 0,
      totalTouchpoints: 0,
      activitiesByType: {},
    };
  }

  // Comprehensive profiles - stub implementations
  async getComprehensiveCustomerProfile(contactId: string): Promise<CustomerProfile | undefined> {
    return undefined;
  }

  async getCustomerChatHistory(contactId: string): Promise<{
    messages: ChatMessage[];
    sessionCount: number;
    totalMessages: number;
    firstContact?: Date;
    lastContact?: Date;
  }> {
    return {
      messages: [],
      sessionCount: 0,
      totalMessages: 0,
    };
  }

  async getCustomerFileHistory(contactId: string): Promise<{
    files: FileSend[];
    totalFiles: number;
    deliveredFiles: number;
    accessedFiles: number;
  }> {
    return {
      files: [],
      totalFiles: 0,
      deliveredFiles: 0,
      accessedFiles: 0,
    };
  }

  async getCustomerQuoteHistory(contactId: string): Promise<{
    quotes: Quote[];
    analytics: QuoteAnalytics[];
    totalViews: number;
    acceptedQuotes: number;
    pendingQuotes: number;
  }> {
    return {
      quotes: [],
      analytics: [],
      totalViews: 0,
      acceptedQuotes: 0,
      pendingQuotes: 0,
    };
  }

  async getCustomerPaymentSummary(contactId: string): Promise<{
    totalValue: number;
    totalPaid: number;
    balance: number;
    payments: Payment[];
    paymentHistory: Array<{
      date: Date;
      amount: number;
      method: string;
      status: string;
      invoiceId?: string;
    }>;
  }> {
    return {
      totalValue: 0,
      totalPaid: 0,
      balance: 0,
      payments: [],
      paymentHistory: [],
    };
  }

  // ===== AVAILABILITY SEARCH - CORE BUSINESS LOGIC =====
  async searchNormalizedSlots(filters: {
    startDate: Date;
    endDate: Date;
    cruiseType?: 'private' | 'disco';
    groupSize?: number;
    minDuration?: number;
    maxDuration?: number;
  }): Promise<NormalizedSlot[]> {
    const { startDate, endDate, cruiseType, groupSize, minDuration, maxDuration } = filters;
    const slots: NormalizedSlot[] = [];
    
    // Import the time slot functions dynamically to avoid circular dependency
    const { getPrivateTimeSlotsForDate, getDiscoTimeSlotsForDate } = await import('@shared/timeSlots');
    
    // Get all available boats
    const allBoats = await this.getActiveBoats();
    
    // Get all products for pricing
    const allProducts = await this.getProducts();
    
    // Generate slots for each date in the range
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateISO = currentDate.toISOString().split('T')[0];
      
      // Generate private cruise slots if requested
      if (!cruiseType || cruiseType === 'private') {
        const privateTimeSlots = getPrivateTimeSlotsForDate(currentDate);
        
        for (const timeSlot of privateTimeSlots) {
          // Filter by duration if specified
          if (minDuration && timeSlot.duration < minDuration) continue;
          if (maxDuration && timeSlot.duration > maxDuration) continue;
          
          // Find suitable boats for the group size
          const suitableBoats = allBoats.filter(boat => {
            return !groupSize || boat.maxCapacity >= groupSize;
          });
          
          // Find appropriate private cruise product for pricing
          const dayOfWeek = currentDate.getDay();
          let dayType = 'weekday';
          if (dayOfWeek === 5) dayType = 'friday';
          else if (dayOfWeek === 6) dayType = 'saturday';
          else if (dayOfWeek === 0) dayType = 'sunday';
          
          // Find products that match the day type and group size
          const matchingProducts = allProducts.filter(product => 
            product.productType === 'private_cruise' &&
            product.dayType === dayType &&
            (!groupSize || !product.groupSize || product.groupSize >= groupSize) &&
            product.active
          );
          
          // Calculate pricing (use first matching product or default)
          const baseProduct = matchingProducts[0];
          const basePrice = baseProduct ? baseProduct.unitPrice * timeSlot.duration : 50000; // Default $500/hour
          
          // Create slot for each suitable boat
          for (const boat of suitableBoats) {
            const slotId = `private-${dateISO}-${timeSlot.startTime}-${timeSlot.endTime}-${boat.id}`;
            
            // Check if slot is already booked (simplified for now)
            const existingBookings = await db.select().from(bookings).where(
              and(
                eq(bookings.boatId, boat.id),
                eq(bookings.eventDate, currentDate),
                eq(bookings.status, 'confirmed')
              )
            );
            
            const isBooked = existingBookings.some(booking => {
              const bookingStart = booking.startTime?.getHours() || 0;
              const bookingEnd = booking.endTime?.getHours() || 0;
              const slotStart = parseInt(timeSlot.startTime.split(':')[0]);
              const slotEnd = parseInt(timeSlot.endTime.split(':')[0]);
              
              // Check for time overlap
              return (slotStart < bookingEnd && slotEnd > bookingStart);
            });
            
            if (!isBooked) {
              slots.push({
                id: slotId,
                cruiseType: 'private',
                dateISO,
                startTime: timeSlot.startTime,
                endTime: timeSlot.endTime,
                label: timeSlot.label,
                duration: timeSlot.duration,
                capacity: boat.maxCapacity,
                availableCount: 1, // One boat slot
                price: basePrice,
                boatCandidates: [boat.id],
                bookable: true,
                held: false
              });
            }
          }
        }
      }
      
      // Generate disco cruise slots if requested
      if (!cruiseType || cruiseType === 'disco') {
        const discoTimeSlots = getDiscoTimeSlotsForDate(currentDate);
        
        for (const timeSlot of discoTimeSlots) {
          // Filter by duration if specified
          if (minDuration && timeSlot.duration < minDuration) continue;
          if (maxDuration && timeSlot.duration > maxDuration) continue;
          
          // Find disco cruise products for pricing
          const discoProducts = allProducts.filter(product => 
            product.productType === 'disco_cruise' && product.active
          );
          
          const discoPrice = discoProducts[0]?.unitPrice || 8500; // Default $85 per person
          
          // Find boats suitable for disco cruises (typically larger boats)
          const discoBoats = allBoats.filter(boat => boat.capacity >= 25); // Disco needs bigger boats
          
          if (discoBoats.length > 0) {
            const slotId = `disco-${dateISO}-${timeSlot.startTime}-${timeSlot.endTime}`;
            
            // Simplified availability check for disco
            const maxCapacity = Math.max(...discoBoats.map(b => b.maxCapacity));
            const availableTickets = groupSize ? Math.max(0, maxCapacity - (groupSize || 0)) : maxCapacity;
            
            slots.push({
              id: slotId,
              cruiseType: 'disco',
              dateISO,
              startTime: timeSlot.startTime,
              endTime: timeSlot.endTime,
              label: timeSlot.label,
              duration: timeSlot.duration,
              capacity: maxCapacity,
              availableCount: availableTickets,
              price: discoPrice,
              boatCandidates: discoBoats.map(b => b.id),
              bookable: availableTickets > 0,
              held: false
            });
          }
        }
      }
      
      // Move to next date
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Apply additional filtering by group size
    const filteredSlots = slots.filter(slot => {
      if (groupSize && slot.cruiseType === 'private') {
        return slot.capacity >= groupSize;
      }
      if (groupSize && slot.cruiseType === 'disco') {
        return slot.availableCount >= groupSize;
      }
      return true;
    });
    
    console.log(`🎯 Generated ${filteredSlots.length} normalized slots for search:`, {
      dateRange: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
      cruiseType: cruiseType || 'all',
      groupSize: groupSize || 'any',
      privateSlots: filteredSlots.filter(s => s.cruiseType === 'private').length,
      discoSlots: filteredSlots.filter(s => s.cruiseType === 'disco').length
    });
    
    return filteredSlots;
  }

  async holdSlot(slotId: string, sessionId: string, duration: number = 15): Promise<SlotHold> {
    const holdId = randomUUID();
    const expiresAt = new Date(Date.now() + duration * 60 * 1000);
    return {
      id: holdId,
      slotId,
      sessionId,
      expiresAt,
      createdAt: new Date(),
    };
  }

  async releaseSlotHold(holdId: string): Promise<boolean> {
    return true;
  }

  async extendSlotHold(holdId: string, additionalMinutes: number): Promise<SlotHold | undefined> {
    return undefined;
  }

  async checkSlotHoldStatus(slotId: string, groupSize?: number): Promise<{
    available: boolean;
    reason?: string;
    heldUntil?: Date;
  }> {
    return { available: true };
  }

  async cleanupExpiredHolds(): Promise<number> {
    return 0;
  }

  async getSlotHold(holdId: string): Promise<SlotHold | undefined> {
    return undefined;
  }

  async getSlotHoldsBySession(sessionId: string): Promise<SlotHold[]> {
    return [];
  }

  async getActiveSlotHolds(): Promise<SlotHold[]> {
    return [];
  }

  // Add remaining complex methods as stubs for now
  async checkAvailability(date: Date, duration: number, groupSize: number, cruiseType: 'private' | 'disco'): Promise<AvailabilityResult> {
    return { available: true, reason: 'Stub implementation' };
  }

  async getAvailableBoats(date: Date, startTime: string, endTime: string, groupSize: number): Promise<Boat[]> {
    return await this.getActiveBoats();
  }

  async checkDiscoAvailability(date: Date, timeSlot: string): Promise<boolean> {
    return true;
  }

  async getBoatAvailabilityByCapacity(date: Date, startTime: string, endTime: string): Promise<Map<number, { total: number; available: number; boats: Boat[] }>> {
    return new Map();
  }

  async getUpcomingBookings(limit?: number): Promise<Booking[]> {
    const filters = { limit };
    return await this.getBookings(filters);
  }

  async getRecentQuotes(limit?: number): Promise<Quote[]> {
    let query = db.select().from(quotes).orderBy(desc(quotes.createdAt));
    if (limit) {
      query = query.limit(limit);
    }
    return await query;
  }

  async getMonthlyCalendarGrouped(year: number, month: number): Promise<Map<string, { date: Date; bookings: Booking[]; boatsByCapacity: Map<number, { available: Boat[]; booked: Boat[] }> }>> {
    return new Map();
  }

  async getComprehensiveBookings(startDate?: Date, endDate?: Date, filters?: AdminCalendarFilters): Promise<ComprehensiveAdminBooking[]> {
    return [];
  }

  async getAdminAvailabilityOverview(date: Date): Promise<{ boatId: string; boatName: string; slots: AdminCalendarSlot[] }[]> {
    return [];
  }

  // Blog Post Methods - Required implementations
  async getPublishedBlogPosts(limit?: number, offset?: number): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }> {
    const results = await db.select({
      post: blogPosts,
      author: blogAuthors
    })
    .from(blogPosts)
    .innerJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
    .where(eq(blogPosts.status, 'published'))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit || 20)
    .offset(offset || 0);

    // Get categories and tags for each post
    const enrichedPosts = await Promise.all(
      results.map(async (result) => {
        const [categories, tags] = await Promise.all([
          this.getBlogPostCategories(result.post.id),
          this.getBlogPostTags(result.post.id)
        ]);
        return {
          ...result.post,
          author: result.author,
          categories,
          tags
        };
      })
    );

    // Get total count
    const [{ count }] = await db.select({ count: sql`count(*)`.mapWith(Number) })
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'));

    return {
      posts: enrichedPosts,
      total: count
    };
  }

  async getFeaturedBlogPosts(limit?: number): Promise<(BlogPost & { 
    author: BlogAuthor;
    categories: BlogCategory[];
    tags: BlogTag[];
  })[]> {
    // Stub implementation - returns empty array for now
    return [];
  }

  async getBlogPostsByTag(tagId: string, limit?: number, offset?: number): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }> {
    // Stub implementation - returns empty result for now
    return { posts: [], total: 0 };
  }

  async getBlogPostsByCategory(categoryId: string, limit?: number, offset?: number): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }> {
    // Stub implementation - returns empty result for now
    return { posts: [], total: 0 };
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    // Stub implementation - returns undefined for now
    return undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    // Stub implementation - returns undefined for now  
    return undefined;
  }

  async getBlogPosts(filters?: any): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }> {
    // Stub implementation - returns empty result for now
    return { posts: [], total: 0 };
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    // Stub implementation - basic structure for now
    const newPost: BlogPost = {
      id: randomUUID(),
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newPost;
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    // Stub implementation
    throw new Error('Blog post update not implemented');
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    // Stub implementation
    return false;
  }

  // Blog Category Methods
  async getBlogCategory(id: string): Promise<BlogCategory | undefined> {
    const [category] = await db.select().from(blogCategories).where(eq(blogCategories.id, id));
    return category;
  }

  async getBlogCategoryBySlug(slug: string): Promise<BlogCategory | undefined> {
    const [category] = await db.select().from(blogCategories).where(eq(blogCategories.slug, slug));
    return category;
  }

  async getBlogCategories(): Promise<BlogCategory[]> {
    return await db.select().from(blogCategories)
      .where(eq(blogCategories.active, true))
      .orderBy(asc(blogCategories.displayOrder), asc(blogCategories.name));
  }

  async createBlogCategory(category: InsertBlogCategory): Promise<BlogCategory> {
    const [newCategory] = await db.insert(blogCategories).values(category).returning();
    return newCategory;
  }

  async updateBlogCategory(id: string, updates: Partial<BlogCategory>): Promise<BlogCategory> {
    throw new Error('Blog category update not implemented');
  }

  async deleteBlogCategory(id: string): Promise<boolean> {
    return false;
  }

  // Blog Tag Methods
  async getBlogTag(id: string): Promise<BlogTag | undefined> {
    const [tag] = await db.select().from(blogTags).where(eq(blogTags.id, id));
    return tag;
  }

  async getBlogTagBySlug(slug: string): Promise<BlogTag | undefined> {
    const [tag] = await db.select().from(blogTags).where(eq(blogTags.slug, slug));
    return tag;
  }

  async getBlogTags(): Promise<BlogTag[]> {
    return await db.select().from(blogTags)
      .where(eq(blogTags.active, true))
      .orderBy(desc(blogTags.postCount), asc(blogTags.name));
  }

  async createBlogTag(tag: InsertBlogTag): Promise<BlogTag> {
    const [newTag] = await db.insert(blogTags).values(tag).returning();
    return newTag;
  }

  async updateBlogTag(id: string, updates: Partial<BlogTag>): Promise<BlogTag> {
    throw new Error('Blog tag update not implemented');
  }

  async deleteBlogTag(id: string): Promise<boolean> {
    return false;
  }

  // Stub implementations for other missing blog methods
  async publishBlogPost(id: string, publishedAt?: Date): Promise<BlogPost> {
    throw new Error('Blog post publish not implemented');
  }

  async scheduleBlogPost(id: string, scheduledFor: Date): Promise<BlogPost> {
    throw new Error('Blog post schedule not implemented');
  }

  async incrementBlogPostViews(id: string): Promise<BlogPost> {
    const [updatedPost] = await db.update(blogPosts)
      .set({ viewCount: sql`${blogPosts.viewCount} + 1` })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async getRelatedBlogPosts(postId: string, limit?: number): Promise<BlogPost[]> {
    return [];
  }

  async getBlogPostsByAuthor(authorId: string, limit?: number, offset?: number): Promise<{
    posts: (BlogPost & { 
      author: BlogAuthor;
      categories: BlogCategory[];
      tags: BlogTag[];
    })[];
    total: number;
  }> {
    return { posts: [], total: 0 };
  }

  // Blog Author Methods  
  async getBlogAuthor(id: string): Promise<BlogAuthor | undefined> {
    const [author] = await db.select().from(blogAuthors).where(eq(blogAuthors.id, id));
    return author;
  }

  async getBlogAuthors(): Promise<BlogAuthor[]> {
    return await db.select().from(blogAuthors).where(eq(blogAuthors.active, true));
  }

  async createBlogAuthor(author: InsertBlogAuthor): Promise<BlogAuthor> {
    const [newAuthor] = await db.insert(blogAuthors).values({
      ...author,
      slug: author.slug || author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }).returning();
    return newAuthor;
  }

  async updateBlogAuthor(id: string, updates: Partial<BlogAuthor>): Promise<BlogAuthor> {
    throw new Error('Blog author update not implemented');
  }

  async deleteBlogAuthor(id: string): Promise<boolean> {
    return false;
  }

  // Blog relationship methods - missing implementations
  async assignPostToCategories(postId: string, categoryIds: string[], primaryCategoryId?: string): Promise<BlogPostCategory[]> {
    // First remove existing category assignments
    await db.delete(blogPostCategories).where(eq(blogPostCategories.postId, postId));
    
    // Insert new assignments
    if (categoryIds.length > 0) {
      const assignments = categoryIds.map(categoryId => ({
        postId,
        categoryId,
        isPrimary: categoryId === primaryCategoryId
      }));
      const result = await db.insert(blogPostCategories).values(assignments).returning();
      return result;
    }
    return [];
  }

  async assignPostToTags(postId: string, tagIds: string[]): Promise<BlogPostTag[]> {
    // First remove existing tag assignments
    await db.delete(blogPostTags).where(eq(blogPostTags.postId, postId));
    
    // Insert new assignments
    if (tagIds.length > 0) {
      const assignments = tagIds.map(tagId => ({
        postId,
        tagId
      }));
      const result = await db.insert(blogPostTags).values(assignments).returning();
      return result;
    }
    return [];
  }

  async getBlogPostCategories(postId: string): Promise<BlogCategory[]> {
    const results = await db.select({
      category: blogCategories
    })
    .from(blogPostCategories)
    .innerJoin(blogCategories, eq(blogPostCategories.categoryId, blogCategories.id))
    .where(eq(blogPostCategories.postId, postId))
    .orderBy(desc(blogPostCategories.isPrimary), asc(blogCategories.name));
    
    return results.map(r => r.category);
  }

  async getBlogPostTags(postId: string): Promise<BlogTag[]> {
    const results = await db.select({
      tag: blogTags
    })
    .from(blogPostTags)
    .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
    .where(eq(blogPostTags.postId, postId))
    .orderBy(asc(blogTags.name));
    
    return results.map(r => r.tag);
  }

  async getBlogCategoryHierarchy(): Promise<BlogCategory[]> {
    return await db.select().from(blogCategories)
      .where(eq(blogCategories.active, true))
      .orderBy(asc(blogCategories.displayOrder), asc(blogCategories.name));
  }

  // ===== SEO MANAGEMENT OPERATIONS =====
  
  // SEO Pages Management
  async getSeoPage(pageRoute: string): Promise<SeoPage | undefined> {
    const result = await db.select().from(seoPages).where(eq(seoPages.pageRoute, pageRoute)).limit(1);
    return result[0];
  }

  async getSeoPages(): Promise<SeoPage[]> {
    return await db.select().from(seoPages).orderBy(asc(seoPages.pageRoute));
  }

  async createSeoPage(seoPage: InsertSeoPage): Promise<SeoPage> {
    const result = await db.insert(seoPages).values({
      ...seoPage,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return result[0];
  }

  async updateSeoPage(pageRoute: string, updates: Partial<SeoPage>): Promise<SeoPage> {
    const result = await db.update(seoPages)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(seoPages.pageRoute, pageRoute))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`SEO page not found: ${pageRoute}`);
    }
    return result[0];
  }

  async deleteSeoPage(pageRoute: string): Promise<boolean> {
    const result = await db.delete(seoPages).where(eq(seoPages.pageRoute, pageRoute));
    return result.rowCount > 0;
  }

  async upsertSeoPage(seoPage: InsertSeoPage): Promise<SeoPage> {
    const existing = await this.getSeoPage(seoPage.pageRoute);
    if (existing) {
      return await this.updateSeoPage(seoPage.pageRoute, seoPage);
    } else {
      return await this.createSeoPage(seoPage);
    }
  }

  // SEO Settings
  async getSeoSettings(): Promise<SeoSettings | undefined> {
    const result = await db.select().from(seoSettings).limit(1);
    return result[0];
  }

  async updateSeoSettings(settings: Partial<SeoSettings>): Promise<SeoSettings> {
    const existing = await this.getSeoSettings();
    if (existing) {
      const result = await db.update(seoSettings)
        .set({ ...settings, updatedAt: new Date() })
        .where(eq(seoSettings.id, existing.id))
        .returning();
      return result[0];
    } else {
      return await this.createSeoSettings(settings as InsertSeoSettings);
    }
  }

  async createSeoSettings(settings: InsertSeoSettings): Promise<SeoSettings> {
    const result = await db.insert(seoSettings).values({
      ...settings,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return result[0];
  }

  async upsertSeoSettings(settings: Partial<SeoSettings>): Promise<SeoSettings> {
    const existing = await this.getSeoSettings();
    if (existing) {
      return await this.updateSeoSettings(settings);
    } else {
      return await this.createSeoSettings(settings as InsertSeoSettings);
    }
  }

  // Technical SEO
  async generateSitemap(): Promise<string> {
    const pages = await this.getSeoPages();
    const baseUrl = 'https://premierppartycruises.com';
    
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
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.pageRoute}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority || 0.5}</priority>
    ${page.updatedAt ? `<lastmod>${page.updatedAt.toISOString()}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;
    
    return sitemap;
  }

  async generateRobotsTxt(): Promise<string> {
    const baseUrl = 'https://premierppartycruises.com';
    
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

  async getPageMetaData(pageRoute: string): Promise<{
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    openGraphTitle?: string;
    openGraphDescription?: string;
    openGraphImage?: string;
    openGraphType?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    twitterCard?: string;
    canonicalUrl?: string;
    robotsDirective?: string;
    schemaMarkup?: Record<string, any>;
  }> {
    const seoPage = await this.getSeoPage(pageRoute);
    
    if (!seoPage) {
      // Return default meta data for the page
      const defaultMeta = {
        metaTitle: 'Premier Party Cruises - Austin Lake Travis Boat Rentals',
        metaDescription: 'Austin\'s premier boat rental and party cruise experience on Lake Travis. Private charters, disco cruises, bachelor parties, and corporate events.',
        metaKeywords: ['Austin boat rental', 'Lake Travis cruises', 'party boat Austin', 'bachelor party boat', 'private charter'],
        openGraphType: 'website',
        twitterCard: 'summary_large_image',
        robotsDirective: 'index, follow'
      };
      
      // Page-specific defaults
      if (pageRoute === '/bachelor-party') {
        defaultMeta.metaTitle = 'Austin Bachelor Party Boat Cruises | Lake Travis | Premier Party Cruises';
        defaultMeta.metaDescription = 'Ultimate Austin bachelor party experience on Lake Travis. Join our epic disco cruises with DJ, drinks, and unforgettable memories. Book now!';
        defaultMeta.metaKeywords = ['Austin bachelor party', 'Lake Travis bachelor party', 'bachelor party boat', 'disco cruise Austin', 'bachelor party ideas Austin'];
      } else if (pageRoute === '/bachelorette-party') {
        defaultMeta.metaTitle = 'Austin Bachelorette Party Boat Cruises | Lake Travis | Premier Party Cruises';
        defaultMeta.metaDescription = 'Perfect Austin bachelorette party on Lake Travis! Disco cruises with DJ, dancing, drinks, and incredible views. Bride rides free on weekends!';
        defaultMeta.metaKeywords = ['Austin bachelorette party', 'Lake Travis bachelorette', 'bachelorette party boat', 'disco cruise Austin', 'bachelorette party ideas Austin'];
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
  async getSeoOverview(): Promise<{
    totalPages: number;
    averageScore: number;
    highPriorityIssues: number;
    pagesNeedingOptimization: number;
    lastAnalyzed?: Date;
  }> {
    const pages = await this.getSeoPages();
    
    return {
      totalPages: pages.length,
      averageScore: pages.length > 0 ? pages.reduce((sum, page) => sum + (page.currentScore || 0), 0) / pages.length : 0,
      highPriorityIssues: pages.filter(page => (page.currentScore || 0) < 50).length,
      pagesNeedingOptimization: pages.filter(page => (page.currentScore || 0) < 80).length,
      lastAnalyzed: pages.length > 0 ? new Date(Math.max(...pages.map(page => page.updatedAt?.getTime() || 0))) : undefined
    };
  }

  async getSeoIssuesSummary(): Promise<Array<{
    pageRoute: string;
    pageName: string;
    score: number;
    issues: SEOIssue[];
    lastAnalyzed?: Date;
  }>> {
    const pages = await this.getSeoPages();
    
    return pages.map(page => ({
      pageRoute: page.pageRoute,
      pageName: page.pageName || page.pageRoute,
      score: page.currentScore || 0,
      issues: page.issues || [],
      lastAnalyzed: page.updatedAt
    }));
  }

  async getKeywordRankings(keyword: string): Promise<Array<{
    pageRoute: string;
    position?: number;
    targetKeywords: string[];
    focusKeyword?: string;
  }>> {
    const pages = await this.getSeoPages();
    
    return pages
      .filter(page => 
        page.targetKeywords?.includes(keyword) || 
        page.focusKeyword === keyword ||
        page.metaKeywords?.includes(keyword)
      )
      .map(page => ({
        pageRoute: page.pageRoute,
        position: undefined, // Would need external SEO API to get actual rankings
        targetKeywords: page.targetKeywords || [],
        focusKeyword: page.focusKeyword
      }));
  }

  // Content Analysis
  async analyzeContent(content: string, targetKeyword?: string): Promise<{
    wordCount: number;
    keywordDensity: Record<string, number>;
    headingStructure: HeadingStructure;
    readabilityScore: number;
    internalLinks: number;
    externalLinks: number;
    images: number;
    imagesWithoutAlt: number;
  }> {
    const wordCount = content.split(/\s+/).length;
    const words = content.toLowerCase().split(/\s+/);
    const keywordDensity: Record<string, number> = {};
    
    // Calculate keyword density
    if (targetKeyword) {
      const keywordOccurrences = content.toLowerCase().split(targetKeyword.toLowerCase()).length - 1;
      keywordDensity[targetKeyword] = (keywordOccurrences / wordCount) * 100;
    }
    
    // Analyze heading structure
    const h1Matches = content.match(/<h1[^>]*>/g) || [];
    const h2Matches = content.match(/<h2[^>]*>/g) || [];
    const h3Matches = content.match(/<h3[^>]*>/g) || [];
    const h4Matches = content.match(/<h4[^>]*>/g) || [];
    const h5Matches = content.match(/<h5[^>]*>/g) || [];
    const h6Matches = content.match(/<h6[^>]*>/g) || [];
    
    const headingStructure: HeadingStructure = {
      h1Count: h1Matches.length,
      h2Count: h2Matches.length,
      h3Count: h3Matches.length,
      h4Count: h4Matches.length,
      h5Count: h5Matches.length,
      h6Count: h6Matches.length,
      hasProperHierarchy: h1Matches.length === 1 && h1Matches.length <= h2Matches.length,
      duplicateHeadings: []
    };
    
    // Count links
    const internalLinks = (content.match(/href=["'](?!http|\/\/)/g) || []).length;
    const externalLinks = (content.match(/href=["'](?:http|\/\/)/g) || []).length;
    
    // Count images
    const images = (content.match(/<img[^>]*>/g) || []).length;
    const imagesWithAlt = (content.match(/<img[^>]*alt=["'][^"']*["'][^>]*>/g) || []).length;
    const imagesWithoutAlt = images - imagesWithAlt;
    
    // Simple readability score (Flesch-Kincaid approximation)
    const sentences = content.split(/[.!?]+/).length;
    const averageWordsPerSentence = wordCount / Math.max(sentences, 1);
    const readabilityScore = Math.max(0, Math.min(100, 206.835 - (1.015 * averageWordsPerSentence) - (84.6 * 1.5))); // Simplified
    
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
  async generateBusinessSchema(): Promise<Record<string, any>> {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Premier Party Cruises",
      "description": "Austin's premier boat rental and party cruise experience on Lake Travis",
      "url": "https://premierppartycruises.com",
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
        "https://www.facebook.com/premierppartycruises",
        "https://www.instagram.com/premierppartycruises",
        "https://www.youtube.com/premierppartycruises"
      ]
    };
  }

  async generatePageSchema(pageRoute: string, pageType: 'webpage' | 'service' | 'event'): Promise<Record<string, any>> {
    const baseUrl = 'https://premierppartycruises.com';
    const seoPage = await this.getSeoPage(pageRoute);
    
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": pageType === 'service' ? 'Service' : pageType === 'event' ? 'Event' : 'WebPage',
      "url": `${baseUrl}${pageRoute}`,
      "name": seoPage?.metaTitle || 'Premier Party Cruises',
      "description": seoPage?.metaDescription || 'Austin\'s premier boat rental and party cruise experience',
      "provider": {
        "@type": "LocalBusiness",
        "name": "Premier Party Cruises"
      }
    };
    
    return baseSchema;
  }

  async validateSchemaMarkup(schema: Record<string, any>): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    
    // Basic validation
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
  async analyzePage(pageRoute: string, content?: string): Promise<SEOAnalysisResult> {
    const seoPage = await this.getSeoPage(pageRoute);
    return {
      pageRoute,
      score: seoPage?.currentScore || 75,
      issues: seoPage?.issues || [],
      recommendations: seoPage?.recommendations || [],
      lastAnalyzed: new Date(),
      contentAnalysis: content ? await this.analyzeContent(content) : undefined
    };
  }

  async calculateSeoScore(pageRoute: string): Promise<number> {
    const seoPage = await this.getSeoPage(pageRoute);
    return seoPage?.currentScore || 75;
  }

  async updateSeoAnalysis(pageRoute: string, analysis: SEOAnalysisResult): Promise<SeoPage> {
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
  async optimizePageSeo(request: SEOOptimizationRequest): Promise<SeoPage> {
    // This would integrate with OpenAI for content optimization
    return await this.upsertSeoPage({
      pageRoute: request.pageRoute,
      pageName: `Optimized: ${request.pageRoute}`,
      metaTitle: request.currentContent?.substring(0, 60) || 'Premier Party Cruises',
      metaDescription: request.currentContent?.substring(0, 160) || 'Austin\'s premier boat rental experience',
      currentScore: 85 // Mock improved score
    });
  }

  async generateMetaTags(pageRoute: string, content: string, targetKeyword?: string): Promise<{
    title: string;
    description: string;
    keywords: string[];
  }> {
    // This would integrate with OpenAI for AI-generated meta tags
    return {
      title: `Premier Party Cruises - ${pageRoute.replace('/', '').replace('-', ' ')}`,
      description: `Experience Austin's best ${pageRoute.replace('/', '').replace('-', ' ')} on Lake Travis with Premier Party Cruises.`,
      keywords: ['Austin', 'Lake Travis', 'boat rental', 'party cruise', targetKeyword].filter(Boolean) as string[]
    };
  }

  async optimizeContent(content: string, targetKeyword: string, competitorUrls?: string[]): Promise<string> {
    // This would integrate with OpenAI for content optimization
    return content;
  }

  async bulkAnalyzePages(pageRoutes: string[]): Promise<SEOAnalysisResult[]> {
    return Promise.all(pageRoutes.map(route => this.analyzePage(route)));
  }

  async bulkOptimizePages(operation: SEOBulkOperation): Promise<SeoPage[]> {
    return Promise.all(operation.pageRoutes.map(route => this.optimizePageSeo({ 
      pageRoute: route, 
      currentContent: '', 
      targetKeyword: operation.targetKeyword 
    })));
  }

  async refreshAllPageAnalysis(): Promise<SeoPage[]> {
    const pages = await this.getSeoPages();
    return Promise.all(pages.map(page => this.analyzePage(page.pageRoute).then(analysis => 
      this.updateSeoAnalysis(page.pageRoute, analysis)
    )));
  }

  // SEO Competitors
  async getSeoCompetitor(id: string): Promise<SeoCompetitor | undefined> {
    const result = await db.select().from(seoCompetitors).where(eq(seoCompetitors.id, id)).limit(1);
    return result[0];
  }

  async getSeoCompetitors(): Promise<SeoCompetitor[]> {
    return await db.select().from(seoCompetitors).orderBy(asc(seoCompetitors.name));
  }

  async getSeoCompetitorByDomain(domain: string): Promise<SeoCompetitor | undefined> {
    const result = await db.select().from(seoCompetitors).where(eq(seoCompetitors.domain, domain)).limit(1);
    return result[0];
  }

  async createSeoCompetitor(competitor: InsertSeoCompetitor): Promise<SeoCompetitor> {
    const result = await db.insert(seoCompetitors).values({
      ...competitor,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return result[0];
  }

  async updateSeoCompetitor(id: string, updates: Partial<SeoCompetitor>): Promise<SeoCompetitor> {
    const result = await db.update(seoCompetitors)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(seoCompetitors.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`SEO competitor not found: ${id}`);
    }
    return result[0];
  }

  async deleteSeoCompetitor(id: string): Promise<boolean> {
    const result = await db.delete(seoCompetitors).where(eq(seoCompetitors.id, id));
    return result.rowCount > 0;
  }

  // SEO Audit Log
  async getSeoAuditLog(pageId: string): Promise<SeoAuditLog[]> {
    return await db.select().from(seoAuditLog)
      .where(eq(seoAuditLog.pageId, pageId))
      .orderBy(desc(seoAuditLog.createdAt));
  }

  async getAllSeoAuditLogs(): Promise<SeoAuditLog[]> {
    return await db.select().from(seoAuditLog).orderBy(desc(seoAuditLog.createdAt));
  }

  async createSeoAuditLog(auditLog: InsertSeoAuditLog): Promise<SeoAuditLog> {
    const result = await db.insert(seoAuditLog).values({
      ...auditLog,
      id: randomUUID(),
      createdAt: new Date()
    }).returning();
    return result[0];
  }

  // SEO Performance Tracking
  async trackPagePerformance(pageRoute: string, metrics: {
    loadTime?: number;
    mobileOptimized?: boolean;
    coreWebVitals?: Record<string, number>;
  }): Promise<SeoPage> {
    const seoPage = await this.getSeoPage(pageRoute);
    const performanceData = {
      loadTime: metrics.loadTime,
      mobileOptimized: metrics.mobileOptimized,
      coreWebVitals: metrics.coreWebVitals
    };
    
    if (seoPage) {
      return await this.updateSeoPage(pageRoute, { 
        ...performanceData,
        updatedAt: new Date()
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
}

export const storage = new DatabaseStorage();

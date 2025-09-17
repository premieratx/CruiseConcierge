import { type Contact, type InsertContact, type Project, type InsertProject, type Boat, type InsertBoat, type Product, type InsertProduct, type Quote, type InsertQuote, type Invoice, type Payment, type ChatMessage, type InsertChatMessage, type AvailabilitySlot, type QuoteTemplate, type InsertQuoteTemplate, type TemplateRule, type InsertTemplateRule, type DiscountRule, type InsertDiscountRule, type PricingSettings, type InsertPricingSettings, type PricingPreview, type Affiliate, type InsertAffiliate, type PaymentSchedule, type DiscountCondition, type DayOfWeekMultipliers, type SeasonalAdjustment, type Booking, type InsertBooking, type DiscoSlot, type InsertDiscoSlot, type Timeframe, type InsertTimeframe, type EmailTemplate, type InsertEmailTemplate, type MasterTemplate, type InsertMasterTemplate, type QuoteItem, type RadioSection, type TemplateVisual, type RuleCondition, type RuleAction, type TemplateComponent, type AdminCalendarSlot, type AdminBookingInfo, type BatchSlotOperation, type AdminCalendarFilters, type ComprehensiveAdminBooking, type RecurringPattern, type PartialLead, type InsertPartialLead, type PartialLeadFilters, type SmsAuthToken, type InsertSmsAuthToken, type CustomerSession, type InsertCustomerSession, type PortalActivityLog, type InsertPortalActivityLog, type PhoneRateLimit, type CustomerVerificationAttempts, type QuoteAnalytics, type InsertQuoteAnalytics, type FileSend, type InsertFileSend, type EmailTracking, type InsertEmailTracking, type CustomerLifecycle, type InsertCustomerLifecycle, type CustomerActivity, type InsertCustomerActivity, type CustomerProfile, type LifecycleStage, type ActivityType, type SlotHold, type InsertSlotHold, type NormalizedSlot, contacts, projects, boats, products, quotes, invoices, payments, chatMessages, availabilitySlots, quoteTemplates, templateRules, discountRules, pricingSettings, affiliates, bookings, discoSlots, timeframes, emailTemplates, masterTemplates, smsAuthTokens, customerSessions, portalActivityLog, phoneRateLimit, customerVerificationAttempts, quoteAnalytics, fileSends, emailTracking, customerLifecycle, customerActivity, slotHolds, partialLeads } from "@shared/schema";
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
        defaultGratuityPercent: 18,
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
          unitPrice: 7500, // $75 per person
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
          unitPrice: 12500, // $125 per person
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
    // TODO: Implement full pricing calculation logic
    const { groupSize, eventDate } = params;
    
    const basePrice = 50000; // $500 base
    const subtotal = basePrice;
    const tax = Math.floor(subtotal * 0.0825);
    const gratuity = Math.floor(subtotal * 0.18);
    const total = subtotal + tax + gratuity;
    
    return {
      subtotal,
      discountTotal: 0,
      tax,
      gratuity,
      total,
      perPersonCost: Math.floor(total / groupSize),
      depositAmount: Math.floor(total * 0.25),
      depositPercent: 25,
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
    // TODO: Implement full pricing calculation logic
    const subtotal = params.items.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    const tax = Math.floor(subtotal * 0.0825);
    const gratuity = Math.floor(subtotal * 0.18);
    const total = subtotal + tax + gratuity;
    
    return {
      subtotal,
      discountTotal: 0,
      tax,
      gratuity,
      total,
      perPersonCost: params.groupSize ? Math.floor(total / params.groupSize) : 0,
      depositAmount: Math.floor(total * 0.25),
      depositPercent: 25,
      depositRequired: true,
      paymentSchedule: [],
      appliedDiscounts: [],
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

  // Availability operations - stub implementations for now
  async searchNormalizedSlots(filters: {
    startDate: Date;
    endDate: Date;
    cruiseType?: 'private' | 'disco';
    groupSize?: number;
    minDuration?: number;
    maxDuration?: number;
  }): Promise<NormalizedSlot[]> {
    return [];
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
}

export const storage = new DatabaseStorage();

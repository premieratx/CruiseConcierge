import { type Contact, type InsertContact, type Project, type InsertProject, type Boat, type InsertBoat, type Product, type InsertProduct, type Quote, type InsertQuote, type Invoice, type Payment, type ChatMessage, type InsertChatMessage, type AvailabilitySlot, type QuoteTemplate, type InsertQuoteTemplate, type TemplateRule, type InsertTemplateRule, type DiscountRule, type InsertDiscountRule, type PricingSettings, type InsertPricingSettings, type PricingPreview, type Affiliate, type InsertAffiliate, type PaymentSchedule, type DiscountCondition, type DayOfWeekMultipliers, type SeasonalAdjustment, type Booking, type InsertBooking, type DiscoSlot, type InsertDiscoSlot, type Timeframe, type InsertTimeframe, type EmailTemplate, type InsertEmailTemplate, type MasterTemplate, type InsertMasterTemplate, type QuoteItem, type RadioSection, type TemplateVisual, type RuleCondition, type RuleAction, type TemplateComponent, type AdminCalendarSlot, type AdminBookingInfo, type BatchSlotOperation, type AdminCalendarFilters, type ComprehensiveAdminBooking, type RecurringPattern, type PartialLead, type InsertPartialLead, type PartialLeadFilters, type SmsAuthToken, type InsertSmsAuthToken, type CustomerSession, type InsertCustomerSession, type PortalActivityLog, type InsertPortalActivityLog, type PhoneRateLimit, type CustomerVerificationAttempts, type QuoteAnalytics, type InsertQuoteAnalytics, type FileSend, type InsertFileSend, type EmailTracking, type InsertEmailTracking, type CustomerLifecycle, type InsertCustomerLifecycle, type CustomerActivity, type InsertCustomerActivity, type CustomerProfile, type LifecycleStage, type ActivityType, type SlotHold, type InsertSlotHold, type NormalizedSlot, smsAuthTokens, customerSessions, portalActivityLog, phoneRateLimit, customerVerificationAttempts, quoteAnalytics, fileSends, emailTracking, customerLifecycle, customerActivity } from "@shared/schema";
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

export class MemStorage implements IStorage {
  // Concurrency protection for booking operations
  private pendingBookingOperations = new Map<string, Promise<Booking>>();
  
  // Unified availability service - concurrency protection and slot holds
  private slotHoldLocks = new Map<string, Promise<SlotHold>>();
  private slotHolds: Map<string, SlotHold> = new Map();
  
  private contacts: Map<string, Contact> = new Map();
  private projects: Map<string, Project> = new Map();
  private boats: Map<string, Boat> = new Map();
  private products: Map<string, Product> = new Map();
  private quotes: Map<string, Quote> = new Map();
  private invoices: Map<string, Invoice> = new Map();
  private payments: Map<string, Payment> = new Map();
  private chatMessages: Map<string, ChatMessage> = new Map();
  private availabilitySlots: Map<string, AvailabilitySlot> = new Map();
  private quoteTemplates: Map<string, QuoteTemplate> = new Map();
  private templateRules: Map<string, TemplateRule> = new Map();
  private discountRules: Map<string, DiscountRule> = new Map();
  private pricingSettings: Map<string, PricingSettings> = new Map();
  private affiliates: Map<string, Affiliate> = new Map();
  private bookings: Map<string, Booking> = new Map();
  private discoSlots: Map<string, DiscoSlot> = new Map();
  private timeframes: Map<string, Timeframe> = new Map();
  private emailTemplates: Map<string, EmailTemplate> = new Map();
  private masterTemplates: Map<string, MasterTemplate> = new Map();
  
  // Customer Portal Storage
  private smsAuthTokens: Map<string, SmsAuthToken> = new Map();
  private customerSessions: Map<string, CustomerSession> = new Map();
  private portalActivityLogs: Map<string, PortalActivityLog> = new Map();
  private phoneRateLimits: Map<string, PhoneRateLimit> = new Map();
  private customerVerificationAttempts: Map<string, CustomerVerificationAttempts> = new Map();
  
  // Partial Lead Storage - abandoned lead capture system
  private partialLeads: Map<string, PartialLead> = new Map(); // key: sessionId
  private partialLeadsById: Map<string, PartialLead> = new Map(); // key: id
  
  // Enhanced Customer Tracking Storage
  private quoteAnalytics: Map<string, QuoteAnalytics> = new Map();
  private fileSends: Map<string, FileSend> = new Map();
  private emailTracking: Map<string, EmailTracking> = new Map();
  private customerLifecycle: Map<string, CustomerLifecycle> = new Map(); // key: contactId
  private customerActivity: Map<string, CustomerActivity> = new Map();
  
  // Admin audit logs for tracking changes
  private adminLogs: Array<{ id: string; action: string; timestamp: Date; adminUser?: string; details: any }> = [];
  private bookingHistory: Map<string, Array<{ action: string; timestamp: Date; adminUser?: string; details: any }>> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed boats with full fleet data
    const boats = [
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
    boats.forEach(boat => this.boats.set(boat.id, boat));

    // Seed products with comprehensive pricing
    const products = [
      // ===== ADD-ON PRODUCTS =====
      { 
        id: "prod_cooler_ice", 
        orgId: "org_demo", 
        name: "Cooler + Ice", 
        description: null,
        unitPrice: 1500, 
        taxable: true,
        pricingModel: "flat_rate",
        productType: "addon",
        dayType: null,
        groupSize: null,
        categoryType: "addon",
        imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        eventTypes: [],
        active: true,
      },
      { 
        id: "prod_pod_kit", 
        orgId: "org_demo", 
        name: "POD Pre-stock Kit", 
        description: null,
        unitPrice: 9500, 
        taxable: true,
        pricingModel: "flat_rate",
        productType: "addon",
        dayType: null,
        groupSize: null,
        categoryType: "addon",
        imageUrl: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        eventTypes: [],
        active: true,
      },

      // ===== DISCO CRUISE PRODUCTS (Shared Cruise) =====
      {
        id: "disco_basic_bach",
        orgId: "org_demo",
        name: "Basic Bach Disco Package",
        description: "Essential disco cruise experience with DJ, dance floor, and party atmosphere.",
        unitPrice: 7500, // $75 per person
        taxable: true,
        pricingModel: "per_person",
        productType: "disco_cruise",
        dayType: null,
        groupSize: null,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        eventTypes: ["bachelor", "bachelorette"],
        active: true,
      },
      {
        id: "disco_queen",
        orgId: "org_demo",
        name: "Disco Queen Disco Package",
        description: "Premium disco cruise with upgraded sound system, disco lights, and party favors.",
        unitPrice: 9500, // $95 per person
        taxable: true,
        pricingModel: "per_person",
        productType: "disco_cruise",
        dayType: null,
        groupSize: null,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        eventTypes: ["bachelor", "bachelorette"],
        active: true,
      },
      {
        id: "disco_platinum",
        orgId: "org_demo",
        name: "Super Sparkle Platinum Disco Package",
        description: "The most exclusive disco cruise with VIP service, premium cocktails, and luxury amenities.",
        unitPrice: 12500, // $125 per person
        taxable: true,
        pricingModel: "per_person",
        productType: "disco_cruise",
        dayType: null,
        groupSize: null,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        eventTypes: ["bachelor", "bachelorette"],
        active: true,
      },

      // ===== PRIVATE CRUISE PRODUCTS =====
      // Monday-Thursday pricing
      {
        id: "private_weekday_14",
        orgId: "org_demo",
        name: "Private Cruise - Monday-Thursday - 14 Guests",
        description: "Premium private boat charter for up to 14 guests",
        unitPrice: 45000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "weekday",
        groupSize: 14,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #3c8dbc 0%, #4fc3f7 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_weekday_25",
        orgId: "org_demo",
        name: "Private Cruise - Monday-Thursday - 25 Guests",
        description: "Premium private boat charter for up to 25 guests",
        unitPrice: 65000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "weekday",
        groupSize: 25,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_weekday_30",
        orgId: "org_demo",
        name: "Private Cruise - Monday-Thursday - 30 Guests",
        description: "Premium private boat charter for up to 30 guests",
        unitPrice: 75000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "weekday",
        groupSize: 30,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_weekday_50",
        orgId: "org_demo",
        name: "Private Cruise - Monday-Thursday - 50 Guests",
        description: "Premium private boat charter for up to 50 guests",
        unitPrice: 95000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "weekday",
        groupSize: 50,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_weekday_75",
        orgId: "org_demo",
        name: "Private Cruise - Monday-Thursday - 75 Guests",
        description: "Premium private boat charter for up to 75 guests",
        unitPrice: 135000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "weekday",
        groupSize: 75,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },

      // Friday pricing
      {
        id: "private_friday_14",
        orgId: "org_demo",
        name: "Private Cruise - Friday - 14 Guests",
        description: "Premium private boat charter for up to 14 guests",
        unitPrice: 55000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "friday",
        groupSize: 14,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_friday_25",
        orgId: "org_demo",
        name: "Private Cruise - Friday - 25 Guests",
        description: "Premium private boat charter for up to 25 guests",
        unitPrice: 75000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "friday",
        groupSize: 25,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_friday_30",
        orgId: "org_demo",
        name: "Private Cruise - Friday - 30 Guests",
        description: "Premium private boat charter for up to 30 guests",
        unitPrice: 85000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "friday",
        groupSize: 30,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_friday_50",
        orgId: "org_demo",
        name: "Private Cruise - Friday - 50 Guests",
        description: "Premium private boat charter for up to 50 guests",
        unitPrice: 105000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "friday",
        groupSize: 50,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_friday_75",
        orgId: "org_demo",
        name: "Private Cruise - Friday - 75 Guests",
        description: "Premium private boat charter for up to 75 guests",
        unitPrice: 155000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "friday",
        groupSize: 75,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },

      // Saturday pricing
      {
        id: "private_saturday_14",
        orgId: "org_demo",
        name: "Private Cruise - Saturday - 14 Guests",
        description: "Premium private boat charter for up to 14 guests",
        unitPrice: 65000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "saturday",
        groupSize: 14,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_saturday_25",
        orgId: "org_demo",
        name: "Private Cruise - Saturday - 25 Guests",
        description: "Premium private boat charter for up to 25 guests",
        unitPrice: 85000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "saturday",
        groupSize: 25,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_saturday_30",
        orgId: "org_demo",
        name: "Private Cruise - Saturday - 30 Guests",
        description: "Premium private boat charter for up to 30 guests",
        unitPrice: 95000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "saturday",
        groupSize: 30,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #f794a4 0%, #fdd6bd 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_saturday_50",
        orgId: "org_demo",
        name: "Private Cruise - Saturday - 50 Guests",
        description: "Premium private boat charter for up to 50 guests",
        unitPrice: 120000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "saturday",
        groupSize: 50,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_saturday_75",
        orgId: "org_demo",
        name: "Private Cruise - Saturday - 75 Guests",
        description: "Premium private boat charter for up to 75 guests",
        unitPrice: 175000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "saturday",
        groupSize: 75,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },

      // Sunday pricing
      {
        id: "private_sunday_14",
        orgId: "org_demo",
        name: "Private Cruise - Sunday - 14 Guests",
        description: "Premium private boat charter for up to 14 guests",
        unitPrice: 60000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "sunday",
        groupSize: 14,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_sunday_25",
        orgId: "org_demo",
        name: "Private Cruise - Sunday - 25 Guests",
        description: "Premium private boat charter for up to 25 guests",
        unitPrice: 80000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "sunday",
        groupSize: 25,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_sunday_30",
        orgId: "org_demo",
        name: "Private Cruise - Sunday - 30 Guests",
        description: "Premium private boat charter for up to 30 guests",
        unitPrice: 90000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "sunday",
        groupSize: 30,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_sunday_50",
        orgId: "org_demo",
        name: "Private Cruise - Sunday - 50 Guests",
        description: "Premium private boat charter for up to 50 guests",
        unitPrice: 110000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "sunday",
        groupSize: 50,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #a8caba 0%, #5d4157 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
      {
        id: "private_sunday_75",
        orgId: "org_demo",
        name: "Private Cruise - Sunday - 75 Guests",
        description: "Premium private boat charter for up to 75 guests",
        unitPrice: 165000,
        taxable: true,
        pricingModel: "hourly",
        productType: "private_cruise",
        dayType: "sunday",
        groupSize: 75,
        categoryType: "experience",
        imageUrl: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        eventTypes: ["corporate", "wedding", "birthday", "graduation", "anniversary", "other"],
        active: true,
      },
    ];
    products.forEach(product => this.products.set(product.id, product));

    // Seed pricing settings
    const pricingSettings: PricingSettings = {
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
      dayOfWeekMultipliers: {
        friday: 1.2,
        saturday: 1.5,
        sunday: 1.3,
      },
      seasonalAdjustments: [
        { name: "Summer Peak", startDate: "06-01", endDate: "08-31", multiplier: 1.25, description: "Peak summer season" },
        { name: "Holiday Season", startDate: "12-15", endDate: "01-05", multiplier: 1.4, description: "Holiday premium" },
      ],
      updatedAt: new Date(),
    };
    this.pricingSettings.set(pricingSettings.id, pricingSettings);

    // Seed quote templates
    const templates: QuoteTemplate[] = [
      {
        id: "tmpl_birthday_party",
        orgId: "org_demo",
        name: "Birthday Party Package",
        description: "Perfect for birthday celebrations with decorations and fun activities",
        eventType: "birthday",
        defaultItems: [
          { id: "item_1", type: "service", name: "2-hour Charter", productId: "prod_charter_2hr", unitPrice: 60000, qty: 1, required: true, order: 1 },
          { id: "item_2", type: "addon", name: "Cooler + Ice", productId: "prod_cooler_ice", unitPrice: 1500, qty: 1, clientCanEditQty: true, order: 2 },
          { id: "item_3", type: "addon", name: "Birthday Decorations", unitPrice: 2500, qty: 1, clientCanEditQty: true, order: 3 },
        ],
        minGroupSize: 8,
        maxGroupSize: 30,
        basePricePerPerson: 0,
        duration: 2,
        active: true,
        isDefault: true,
        displayOrder: 1,
        components: [],
        visualTheme: { primaryColor: "#FF6B9D", accentColor: "#F7DC6F", theme: "celebration" },
        automationRules: [],
        defaultRadioSections: null,
        createdAt: new Date(),
      },
      {
        id: "tmpl_corporate_event",
        orgId: "org_demo",
        name: "Corporate Event Package",
        description: "Professional package for business events and team building",
        eventType: "corporate",
        defaultItems: [
          { id: "item_4", type: "service", name: "3-hour Charter", unitPrice: 90000, qty: 1, required: true, order: 1 },
          { id: "item_5", type: "addon", name: "Catering Setup", unitPrice: 5000, qty: 1, order: 2 },
          { id: "item_6", type: "addon", name: "Professional Sound System", unitPrice: 3000, qty: 1, order: 3 },
        ],
        minGroupSize: 15,
        maxGroupSize: 30,
        basePricePerPerson: 2500,
        duration: 3,
        active: true,
        isDefault: false,
        displayOrder: 2,
        components: [],
        visualTheme: { primaryColor: "#2E86AB", accentColor: "#A23B72", theme: "professional" },
        automationRules: [],
        defaultRadioSections: null,
        createdAt: new Date(),
      },
    ];
    templates.forEach(template => this.quoteTemplates.set(template.id, template));

    // Seed discount rules
    const discountRules: DiscountRule[] = [
      {
        id: "disc_early_bird",
        orgId: "org_demo",
        name: "Early Bird Discount",
        code: "EARLY10",
        discountType: "percentage",
        discountValue: 10,
        minGroupSize: 10,
        maxGroupSize: null,
        minSubtotal: 50000,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        usageLimit: 100,
        usageCount: 0,
        active: true,
        conditions: [{ field: "daysBefore", operator: "greater_than", value: 30 }],
        createdAt: new Date(),
      },
      {
        id: "disc_large_group",
        orgId: "org_demo",
        name: "Large Group Discount",
        code: null,
        discountType: "percentage",
        discountValue: 15,
        minGroupSize: 25,
        maxGroupSize: null,
        minSubtotal: 100000,
        validFrom: new Date(),
        validUntil: null,
        usageLimit: null,
        usageCount: 0,
        active: true,
        conditions: [],
        createdAt: new Date(),
      },
    ];
    discountRules.forEach(rule => this.discountRules.set(rule.id, rule));

    // Seed affiliates
    const affiliates: Affiliate[] = [
      {
        id: "aff_austin_events",
        orgId: "org_demo",
        name: "Austin Events Co",
        email: "partner@austinevents.com",
        code: "AUSTIN15",
        commissionType: "percentage",
        commissionRate: 15,
        totalReferrals: 42,
        totalRevenue: 450000,
        totalCommission: 67500,
        pendingCommission: 0,
        lastReferralDate: null,
        phone: null,
        companyName: null,
        notes: null,
        active: true,
        createdAt: new Date(),
      },
      {
        id: "aff_wedding_planner",
        orgId: "org_demo",
        name: "Lake Travis Weddings",
        email: "info@laketravisweddings.com",
        code: "WEDDING10",
        commissionType: "percentage",
        commissionRate: 10,
        totalReferrals: 28,
        totalRevenue: 320000,
        totalCommission: 32000,
        pendingCommission: 0,
        lastReferralDate: null,
        phone: null,
        companyName: null,
        notes: null,
        active: true,
        createdAt: new Date(),
      },
    ];
    affiliates.forEach(affiliate => this.affiliates.set(affiliate.id, affiliate));

    // Seed timeframes for regular operations
    const timeframeData: Timeframe[] = [
      // Weekday timeframes (Monday-Thursday)
      ...[1, 2, 3, 4].flatMap(dayOfWeek => [
        {
          id: `tf_weekday_morning_${dayOfWeek}`,
          dayOfWeek,
          startTime: "10:00",
          endTime: "14:00",
          type: "private" as const,
          boatIds: [], // All boats available
          active: true,
          description: null,
          createdAt: new Date(),
        },
        {
          id: `tf_weekday_afternoon_${dayOfWeek}`,
          dayOfWeek,
          startTime: "14:30",
          endTime: "18:30",
          type: "private" as const,
          boatIds: [], // All boats available
          active: true,
          description: null,
          createdAt: new Date(),
        },
        {
          id: `tf_weekday_evening_${dayOfWeek}`,
          dayOfWeek,
          startTime: "19:00",
          endTime: "23:00",
          type: "private" as const,
          boatIds: [], // All boats available
          active: true,
          description: null,
          createdAt: new Date(),
        },
      ]),
      // Friday timeframes (Disco cruise in afternoon)
      {
        id: "tf_friday_morning",
        dayOfWeek: 5,
        startTime: "10:00",
        endTime: "11:30",
        type: "private" as const,
        boatIds: [], 
        active: true,
        description: null,
        createdAt: new Date(),
      },
      {
        id: "tf_friday_disco",
        dayOfWeek: 5,
        startTime: "12:00",
        endTime: "16:00",
        type: "disco" as const,
        boatIds: ["boat_clever_girl"], // Clever Girl for disco cruises
        active: true,
        description: null,
        createdAt: new Date(),
      },
      {
        id: "tf_friday_evening",
        dayOfWeek: 5,
        startTime: "17:00",
        endTime: "23:00",
        type: "private" as const,
        boatIds: [], 
        active: true,
        description: null,
        createdAt: new Date(),
      },
      // Saturday timeframes (Two disco cruises)
      {
        id: "tf_saturday_morning",
        dayOfWeek: 6,
        startTime: "09:00",
        endTime: "10:30",
        type: "private" as const,
        boatIds: [], 
        active: true,
        description: null,
        createdAt: new Date(),
      },
      {
        id: "tf_saturday_disco_1",
        dayOfWeek: 6,
        startTime: "11:00",
        endTime: "15:00",
        type: "disco" as const,
        boatIds: ["boat_clever_girl"],
        active: true,
        description: null,
        createdAt: new Date(),
      },
      {
        id: "tf_saturday_disco_2",
        dayOfWeek: 6,
        startTime: "15:30",
        endTime: "19:30",
        type: "disco" as const,
        boatIds: ["boat_clever_girl"],
        active: true,
        description: null,
        createdAt: new Date(),
      },
      {
        id: "tf_saturday_evening",
        dayOfWeek: 6,
        startTime: "20:00",
        endTime: "23:00",
        type: "private" as const,
        boatIds: [], 
        active: true,
        description: null,
        createdAt: new Date(),
      },
      // Sunday timeframes
      {
        id: "tf_sunday_morning",
        dayOfWeek: 0,
        startTime: "10:00",
        endTime: "14:00",
        type: "private" as const,
        boatIds: [], 
        active: true,
        description: null,
        createdAt: new Date(),
      },
      {
        id: "tf_sunday_afternoon",
        dayOfWeek: 0,
        startTime: "14:30",
        endTime: "18:30",
        type: "private" as const,
        boatIds: [], 
        active: true,
        description: null,
        createdAt: new Date(),
      },
      {
        id: "tf_sunday_evening",
        dayOfWeek: 0,
        startTime: "19:00",
        endTime: "23:00",
        type: "private" as const,
        boatIds: [], 
        active: true,
        description: null,
        createdAt: new Date(),
      },
    ];
    timeframeData.forEach(tf => this.timeframes.set(tf.id, tf));

    // Seed disco slots for the next 3 months
    const today = new Date();
    const discoSlotsData: DiscoSlot[] = [];
    
    for (let monthOffset = 0; monthOffset < 3; monthOffset++) {
      const targetDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
      const daysInMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(targetDate.getFullYear(), targetDate.getMonth(), day);
        const dayOfWeek = date.getDay();
        
        // Friday disco cruise (12-4pm)
        if (dayOfWeek === 5) {
          discoSlotsData.push({
            id: `disco_${date.toISOString().split('T')[0]}_12`,
            date,
            startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0),
            endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 16, 0),
            ticketsSold: Math.floor(Math.random() * 30), // Random initial data
            ticketCap: 75,
            status: "available" as const,
            createdAt: new Date(),
          });
        }
        
        // Saturday disco cruises (11-3pm and 3:30-7:30pm)
        if (dayOfWeek === 6) {
          discoSlotsData.push({
            id: `disco_${date.toISOString().split('T')[0]}_11`,
            date,
            startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 0),
            endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 0),
            ticketsSold: Math.floor(Math.random() * 50),
            ticketCap: 75,
            status: "available" as const,
            createdAt: new Date(),
          });
          
          discoSlotsData.push({
            id: `disco_${date.toISOString().split('T')[0]}_1530`,
            date,
            startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 30),
            endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 30),
            ticketsSold: Math.floor(Math.random() * 40),
            ticketCap: 75,
            status: "available" as const,
            createdAt: new Date(),
          });
        }
      }
    }
    discoSlotsData.forEach(slot => this.discoSlots.set(slot.id, slot));
    
    // Master templates removed - using isDefault on quote templates instead
    
    // Seed default email templates
    const emailTemplates: EmailTemplate[] = [
      {
        id: "email_quote_delivery",
        orgId: "org_demo",
        name: "Quote Delivery",
        templateType: "quote_delivery",
        subject: "Your Quote from Premier Party Cruises - {{eventType}} on {{eventDate}}",
        components: [
          {
            id: "email_header",
            type: "header",
            properties: {
              title: "Your Custom Quote is Ready!",
              greeting: "Hi {{contactName}},"
            },
            order: 0
          },
          {
            id: "email_content",
            type: "text",
            properties: {
              content: "Thank you for considering Premier Party Cruises for your {{eventType}}. We're excited to help make your event unforgettable! Your personalized quote is attached below."
            },
            order: 1
          }
        ],
        variables: ["contactName", "eventType", "eventDate", "groupSize", "totalAmount", "quoteLink"],
        description: "Template for delivering quotes to potential customers",
        isDefault: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "email_payment_confirmation",
        orgId: "org_demo",
        name: "Payment Confirmation",
        templateType: "payment_confirmation",
        subject: "Payment Received - Thank You!",
        components: [
          {
            id: "payment_header",
            type: "header",
            properties: {
              title: "Payment Confirmation",
              greeting: "Hi {{contactName}},"
            },
            order: 0
          },
          {
            id: "payment_content",
            type: "text",
            properties: {
              content: "We've received your payment of {{paymentAmount}}. Thank you! Your booking is confirmed for {{eventDate}}. We'll send you a final confirmation with all details 48 hours before your event."
            },
            order: 1
          }
        ],
        variables: ["contactName", "paymentAmount", "eventDate"],
        description: "Template for confirming payment receipt",
        isDefault: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "email_booking_confirmation",
        orgId: "org_demo",
        name: "Booking Confirmation",
        templateType: "booking_confirmation",
        subject: "Your Cruise is Confirmed! - {{eventDate}}",
        components: [
          {
            id: "booking_header",
            type: "header",
            properties: {
              title: "Booking Confirmed!",
              greeting: "Hi {{contactName}},"
            },
            order: 0
          },
          {
            id: "booking_content",
            type: "text",
            properties: {
              content: "Your {{eventType}} cruise is all set for {{eventDate}}! Event Details: Date: {{eventDate}}, Time: {{eventTime}}, Boat: {{boatName}}, Group Size: {{groupSize}} guests. We can't wait to see you!"
            },
            order: 1
          }
        ],
        variables: ["contactName", "eventType", "eventDate", "eventTime", "boatName", "groupSize"],
        description: "Template for sending final booking confirmation",
        isDefault: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    emailTemplates.forEach(template => this.emailTemplates.set(template.id, template));
    
    // Seed quote templates with example configurations
    const quoteTemplates: QuoteTemplate[] = [
      {
        id: "qt_bachelor_party",
        orgId: "org_demo",
        name: "Bachelor Party Template",
        description: "Perfect for unforgettable bachelor party celebrations",
        eventType: "bachelor",
        defaultItems: [],
        defaultRadioSections: null,
        minGroupSize: 10,
        maxGroupSize: 30,
        basePricePerPerson: null,
        duration: 3,
        active: true,
        isDefault: true,
        displayOrder: 3,
        components: [],
        visualTheme: { primaryColor: "#FF7F50", accentColor: "#4169E1", theme: "bachelor" },
        automationRules: [],
        createdAt: new Date(),
      },
      {
        id: "qt_bachelorette_party",
        orgId: "org_demo",
        name: "Bachelorette Party Template",
        description: "Elegant and fun bachelorette party packages",
        eventType: "bachelorette",
        defaultItems: [],
        defaultRadioSections: null,
        minGroupSize: 10,
        maxGroupSize: 30,
        basePricePerPerson: null,
        duration: 3,
        active: true,
        isDefault: false,
        displayOrder: 4,
        components: [],
        visualTheme: { primaryColor: "#FFB6C1", accentColor: "#FF69B4", theme: "bachelorette" },
        automationRules: [],
        createdAt: new Date(),
      },
      {
        id: "qt_birthday_party",
        orgId: "org_demo",
        name: "Birthday Party Template",
        description: "Fun birthday celebration packages for all ages",
        eventType: "birthday",
        defaultItems: [],
        defaultRadioSections: null,
        minGroupSize: 8,
        maxGroupSize: 30,
        basePricePerPerson: null,
        duration: 2,
        active: true,
        isDefault: false,
        displayOrder: 5,
        components: [],
        visualTheme: { primaryColor: "#FF6B9D", accentColor: "#F7DC6F", theme: "birthday" },
        automationRules: [],
        createdAt: new Date(),
      },
      {
        id: "qt_corporate_event",
        orgId: "org_demo",
        name: "Corporate Event Template",
        description: "Professional corporate event and team building packages",
        eventType: "corporate",
        defaultItems: [],
        defaultRadioSections: null,
        minGroupSize: 15,
        maxGroupSize: 50,
        basePricePerPerson: null,
        duration: 3,
        active: true,
        isDefault: false,
        displayOrder: 6,
        components: [],
        visualTheme: { primaryColor: "#2E86AB", accentColor: "#A23B72", theme: "professional" },
        automationRules: [],
        createdAt: new Date(),
      },
    ];
    quoteTemplates.forEach(template => this.quoteTemplates.set(template.id, template));
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async getContactByEmail(email: string): Promise<Contact | undefined> {
    return Array.from(this.contacts.values()).find(c => c.email === email);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      orgId: insertContact.orgId || "org_demo",
      phone: insertContact.phone || null,
      tags: insertContact.tags ? [...insertContact.tags] : [],
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getLeads(): Promise<Contact[]> {
    const allContacts = Array.from(this.contacts.values());
    const leads = [];
    
    for (const contact of allContacts) {
      const projects = await this.getProjectsByContact(contact.id);
      const hasClientProject = projects.some(p => ["ph_deposit_paid", "ph_paid"].includes(p.pipelinePhase));
      if (!hasClientProject) {
        leads.push(contact);
      }
    }
    return leads;
  }

  async getClients(): Promise<Contact[]> {
    const allContacts = Array.from(this.contacts.values());
    const clients = [];
    
    for (const contact of allContacts) {
      const projects = await this.getProjectsByContact(contact.id);
      const hasClientProject = projects.some(p => ["ph_deposit_paid", "ph_paid"].includes(p.pipelinePhase));
      if (hasClientProject) {
        clients.push(contact);
      }
    }
    return clients;
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      title: insertProject.title || null,
      orgId: insertProject.orgId || "org_demo",
      status: insertProject.status || "NEW",
      pipelinePhase: insertProject.pipelinePhase || "ph_new",
      projectDate: insertProject.projectDate || null,
      groupSize: insertProject.groupSize || null,
      eventType: insertProject.eventType || null,
      duration: insertProject.duration ?? null,
      specialRequests: insertProject.specialRequests ?? null,
      preferredTime: insertProject.preferredTime ?? null,
      budget: insertProject.budget ?? null,
      leadSource: insertProject.leadSource ?? "chat",
      availabilitySlotId: insertProject.availabilitySlotId ?? null,
      tags: insertProject.tags ? [...insertProject.tags] : [],
      id,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const project = this.projects.get(id);
    if (!project) throw new Error("Project not found");
    
    const updated = { ...project, ...updates };
    this.projects.set(id, updated);
    return updated;
  }

  async getProjectsByContact(contactId: string): Promise<Project[]> {
    // If contactId is empty, return all projects
    if (!contactId) {
      return Array.from(this.projects.values());
    }
    return Array.from(this.projects.values()).filter(p => p.contactId === contactId);
  }

  async getBoats(): Promise<Boat[]> {
    return Array.from(this.boats.values());
  }

  async getActiveBoats(): Promise<Boat[]> {
    return Array.from(this.boats.values()).filter(b => b.active);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByType(productType: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.productType === productType && p.active);
  }

  async getProductsByEventType(eventType: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => 
      p.active && ((p.eventTypes && p.eventTypes.length === 0) || (p.eventTypes && p.eventTypes.includes(eventType)))
    );
  }

  async getDiscoCruiseProducts(): Promise<Product[]> {
    return this.getProductsByType("disco_cruise");
  }

  async getPrivateCruiseProducts(): Promise<Product[]> {
    return this.getProductsByType("private_cruise");
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      orgId: insertProduct.orgId || "org_demo",
      description: insertProduct.description ?? null,
      unitPrice: insertProduct.unitPrice,
      taxable: insertProduct.taxable ?? true,
      pricingModel: insertProduct.pricingModel || "hourly",
      productType: insertProduct.productType || "private_cruise",
      dayType: insertProduct.dayType ?? null,
      groupSize: insertProduct.groupSize ?? null,
      imageUrl: insertProduct.imageUrl ?? null,
      categoryType: insertProduct.categoryType || "experience",
      eventTypes: insertProduct.eventTypes || [],
      active: insertProduct.active !== undefined ? insertProduct.active : true,
      id,
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const product = this.products.get(id);
    if (!product) throw new Error("Product not found");
    
    const updated = { ...product, ...updates };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    
    // Generate secure, time-limited access token for public access
    const accessToken = quoteTokenService.generateSecureToken(id, {
      scope: 'quote:view',
      expiresIn: 30 * 24 * 60 * 60 * 1000, // 30 days
      audience: 'customer'
    });
    
    console.log('🔐 Created quote with secure token:', {
      quoteId: id,
      tokenLength: accessToken.length,
      hasSecureToken: accessToken.includes('.'),
      expiresIn: '30 days'
    });
    
    const quote: Quote = {
      ...insertQuote,
      templateId: insertQuote.templateId ?? null,
      orgId: insertQuote.orgId || "org_demo",
      status: insertQuote.status || "DRAFT",
      items: insertQuote.items ? [...insertQuote.items] as QuoteItem[] : [],
      promoCode: insertQuote.promoCode || null,
      discountTotal: insertQuote.discountTotal || 0,
      subtotal: insertQuote.subtotal || 0,
      tax: insertQuote.tax || 0,
      total: insertQuote.total || 0,
      version: insertQuote.version || 1,
      accessToken, // Set the secure access token for public access
      accessTokenCreatedAt: new Date(), // Record when token was created
      accessTokenRevokedAt: null, // Initially not revoked
      id,
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async updateQuote(id: string, updates: Partial<Quote>): Promise<Quote> {
    const quote = this.quotes.get(id);
    if (!quote) throw new Error("Quote not found");
    
    const updated = { ...quote, ...updates };
    
    // If quote is being updated, optionally refresh the access token for extended access
    if (updates.status && (updates.status === 'SENT' || updates.status === 'VIEWED')) {
      console.log('🔄 Refreshing quote access token due to status update:', {
        quoteId: id,
        oldStatus: quote.status,
        newStatus: updates.status
      });
      
      const refreshResult = quoteTokenService.refreshToken(quote.accessToken, {
        expiresIn: 60 * 24 * 60 * 60 * 1000 // 60 days for sent quotes
      });
      
      if (refreshResult.success && refreshResult.token) {
        updated.accessToken = refreshResult.token;
        updated.accessTokenCreatedAt = new Date();
      }
    }
    
    this.quotes.set(id, updated);
    return updated;
  }

  async getQuotesByProject(projectId: string): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(q => q.projectId === projectId);
  }

  // Enhanced quote retrieval with search, filter, and sorting for admin dashboard
  async getQuotes(filters: {
    searchTerm?: string;
    statusFilter?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<any[]> {
    const { searchTerm, statusFilter, sortBy = 'createdAt', sortOrder = 'desc' } = filters;
    const allQuotes: any[] = [];
    
    console.log('🔍 Starting quote retrieval with filters:', filters);
    
    // FIXED: Direct quote enumeration instead of broken getProjectsByContact('')
    // Get ALL quotes directly from quotes store to ensure chatbot quotes are included
    const allQuoteEntries = Array.from(this.quotes.values());
    console.log('📊 Found total quotes in storage:', allQuoteEntries.length);
    
    for (const quote of allQuoteEntries) {
      // Get project and contact data for each quote
      const project = quote.projectId ? this.projects.get(quote.projectId) : null;
      const contact = project?.contactId ? this.contacts.get(project.contactId) : null;
      
      console.log('🔄 Processing quote:', {
        quoteId: quote.id,
        hasProject: !!project,
        hasContact: !!contact,
        projectId: quote.projectId
      });
      
      // Build quote data with proper field mapping
      const quoteData = {
        id: quote.id,
        quoteNumber: quote.quoteNumber || `Q-${quote.id.slice(0, 8).toUpperCase()}`,
        customerName: contact?.name || project?.contactName || 'Unknown Customer',
        customerEmail: contact?.email || project?.contactEmail || '',
        eventDate: project?.projectDate?.toISOString() || '',
        totalAmount: quote.total || 0,
        status: quote.status?.toLowerCase() || 'draft',
        createdAt: quote.createdAt?.toISOString() || new Date().toISOString(),
        // FIXED: Proper sentAt/viewedAt mapping instead of using createdAt
        sentAt: quote.sentAt?.toISOString() || (quote.status === 'SENT' ? quote.updatedAt?.toISOString() : null),
        viewedAt: quote.viewedAt?.toISOString() || (quote.status === 'VIEWED' ? quote.updatedAt?.toISOString() : null),
        expiresAt: quote.expiresAt?.toISOString() || null,
        projectId: quote.projectId,
        contactId: contact?.id,
        eventType: project?.eventType || 'Unknown',
        groupSize: project?.groupSize || null
      };
      allQuotes.push(quoteData);
    }
    
    console.log('✅ Total quotes processed:', allQuotes.length);
    
    // Apply search filter
    let filteredQuotes = allQuotes;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filteredQuotes = allQuotes.filter(quote => 
        quote.quoteNumber.toLowerCase().includes(search) ||
        quote.customerName.toLowerCase().includes(search) ||
        quote.customerEmail.toLowerCase().includes(search)
      );
      console.log('🔍 After search filter:', filteredQuotes.length);
    }
    
    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      filteredQuotes = filteredQuotes.filter(quote => 
        quote.status === statusFilter.toLowerCase()
      );
      console.log('🏷️ After status filter:', filteredQuotes.length);
    }
    
    // Apply sorting
    filteredQuotes.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle date sorting
      if (sortBy === 'createdAt' || sortBy === 'eventDate') {
        aValue = new Date(aValue || 0).getTime();
        bValue = new Date(bValue || 0).getTime();
      }
      
      // Handle numeric sorting
      if (sortBy === 'totalAmount') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }
      
      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });
    
    console.log('📈 Final filtered and sorted quotes:', filteredQuotes.length);
    
    return filteredQuotes;
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    return this.invoices.get(id);
  }

  async getInvoiceByQuoteId(quoteId: string): Promise<Invoice | undefined> {
    for (const invoice of Array.from(this.invoices.values())) {
      if (invoice.quoteId === quoteId) {
        return invoice;
      }
    }
    return undefined;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return Array.from(this.invoices.values());
  }

  async getInvoices(filters?: {
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    limit?: number;
  }): Promise<any[]> {
    const allInvoices = Array.from(this.invoices.values());
    const results: any[] = [];
    
    console.log('📊 Found total invoices in storage:', allInvoices.length);
    
    for (const invoice of allInvoices) {
      // Get project and contact data for each invoice
      const project = invoice.projectId ? this.projects.get(invoice.projectId) : null;
      const contact = project?.contactId ? this.contacts.get(project.contactId) : null;
      
      if (project && contact) {
        const invoiceData = {
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber || `INV-${invoice.id.slice(-8)}`,
          customerName: contact.name,
          customerEmail: contact.email,
          projectId: project.id,
          projectTitle: project.title,
          eventType: project.eventType,
          eventDate: project.projectDate,
          totalAmount: invoice.total,
          paidAmount: invoice.paidAmount || 0,
          status: invoice.status,
          dueDate: invoice.dueDate,
          createdAt: invoice.createdAt,
          sentAt: invoice.sentAt,
          subtotal: invoice.subtotal,
          tax: invoice.tax,
          gratuity: invoice.gratuity,
          items: invoice.items || []
        };
        
        // Apply search filter
        if (filters?.search) {
          const search = filters.search.toLowerCase();
          const matchesSearch = (
            contact.name.toLowerCase().includes(search) ||
            contact.email.toLowerCase().includes(search) ||
            (project.title?.toLowerCase().includes(search)) ||
            (invoice.invoiceNumber?.toLowerCase().includes(search)) ||
            (invoice.id.toLowerCase().includes(search))
          );
          if (!matchesSearch) continue;
        }
        
        // Apply status filter
        if (filters?.status && invoice.status !== filters.status) {
          continue;
        }
        
        results.push(invoiceData);
      }
    }
    
    // Apply sorting
    if (filters?.sortBy) {
      const sortBy = filters.sortBy;
      const order = filters.sortOrder === 'desc' ? -1 : 1;
      
      results.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];
        
        if (sortBy === 'createdAt' || sortBy === 'eventDate' || sortBy === 'dueDate') {
          aVal = new Date(aVal || 0).getTime();
          bVal = new Date(bVal || 0).getTime();
        } else if (sortBy === 'totalAmount' || sortBy === 'paidAmount') {
          aVal = Number(aVal) || 0;
          bVal = Number(bVal) || 0;
        } else {
          aVal = String(aVal || '').toLowerCase();
          bVal = String(bVal || '').toLowerCase();
        }
        
        if (aVal < bVal) return -1 * order;
        if (aVal > bVal) return 1 * order;
        return 0;
      });
    } else {
      // Default sort by creation date, newest first
      results.sort((a, b) => {
        const aDate = new Date(a.createdAt || 0).getTime();
        const bDate = new Date(b.createdAt || 0).getTime();
        return bDate - aDate;
      });
    }
    
    // Apply limit
    if (filters?.limit && filters.limit > 0) {
      return results.slice(0, filters.limit);
    }
    
    console.log('📋 Returning invoice results:', results.length);
    return results;
  }

  async createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt'>): Promise<Invoice> {
    const id = randomUUID();
    const newInvoice: Invoice = {
      ...invoice,
      id,
      createdAt: new Date(),
    };
    this.invoices.set(id, newInvoice);
    return newInvoice;
  }

  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice> {
    const invoice = this.invoices.get(id);
    if (!invoice) throw new Error("Invoice not found");
    
    const updated = { ...invoice, ...updates };
    this.invoices.set(id, updated);
    return updated;
  }

  async createPayment(payment: Omit<Payment, 'id'>): Promise<Payment> {
    const id = randomUUID();
    const newPayment: Payment = {
      ...payment,
      id,
    };
    this.payments.set(id, newPayment);
    return newPayment;
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment> {
    const payment = this.payments.get(id);
    if (!payment) throw new Error('Payment not found');
    
    const updated = { ...payment, ...updates };
    this.payments.set(id, updated);
    return updated;
  }

  async getPaymentsByInvoice(invoiceId: string): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(p => p.invoiceId === invoiceId);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      contactId: insertMessage.contactId || null,
      metadata: insertMessage.metadata || {},
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    // If sessionId is empty, return all messages
    if (!sessionId) {
      return Array.from(this.chatMessages.values())
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
    return Array.from(this.chatMessages.values())
      .filter(m => m.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async getAvailabilitySlots(startDate: Date, endDate: Date): Promise<AvailabilitySlot[]> {
    return Array.from(this.availabilitySlots.values())
      .filter(s => s.startTime >= startDate && s.startTime <= endDate);
  }

  async createAvailabilitySlot(slot: Omit<AvailabilitySlot, 'id'>): Promise<AvailabilitySlot> {
    const id = randomUUID();
    const newSlot: AvailabilitySlot = {
      ...slot,
      id,
    };
    this.availabilitySlots.set(id, newSlot);
    return newSlot;
  }

  async bookAvailabilitySlot(slotId: string, projectId: string): Promise<AvailabilitySlot> {
    const slot = this.availabilitySlots.get(slotId);
    if (!slot) throw new Error("Availability slot not found");
    
    const updated = { ...slot, status: "BOOKED", projectId };
    this.availabilitySlots.set(slotId, updated);
    return updated;
  }

  // Quote Templates
  async getQuoteTemplate(id: string): Promise<QuoteTemplate | undefined> {
    return this.quoteTemplates.get(id);
  }

  async getQuoteTemplates(): Promise<QuoteTemplate[]> {
    return Array.from(this.quoteTemplates.values())
      .filter(t => t.active)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getQuoteTemplatesByEventType(eventType: string): Promise<QuoteTemplate[]> {
    return Array.from(this.quoteTemplates.values())
      .filter(t => t.active && t.eventType === eventType)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async createQuoteTemplate(insertTemplate: InsertQuoteTemplate): Promise<QuoteTemplate> {
    const id = randomUUID();
    const template: QuoteTemplate = {
      ...insertTemplate,
      description: insertTemplate.description ?? null,
      orgId: insertTemplate.orgId || "org_demo",
      defaultItems: insertTemplate.defaultItems ? [...insertTemplate.defaultItems] as QuoteItem[] : [],
      minGroupSize: insertTemplate.minGroupSize || null,
      maxGroupSize: insertTemplate.maxGroupSize || null,
      basePricePerPerson: insertTemplate.basePricePerPerson || null,
      active: insertTemplate.active !== undefined ? insertTemplate.active : true,
      displayOrder: insertTemplate.displayOrder || 0,
      visualTheme: insertTemplate.visualTheme ? { ...insertTemplate.visualTheme } as TemplateVisual : {},
      automationRules: insertTemplate.automationRules ? [...insertTemplate.automationRules] : [],
      id,
      createdAt: new Date(),
    };
    this.quoteTemplates.set(id, template);
    return template;
  }

  async updateQuoteTemplate(id: string, updates: Partial<QuoteTemplate>): Promise<QuoteTemplate> {
    const template = this.quoteTemplates.get(id);
    if (!template) throw new Error("Quote template not found");
    
    const updated = { ...template, ...updates };
    this.quoteTemplates.set(id, updated);
    return updated;
  }

  async deleteQuoteTemplate(id: string): Promise<boolean> {
    return this.quoteTemplates.delete(id);
  }

  // Template Rules
  async getTemplateRule(id: string): Promise<TemplateRule | undefined> {
    return this.templateRules.get(id);
  }

  async getTemplateRules(): Promise<TemplateRule[]> {
    return Array.from(this.templateRules.values())
      .filter(r => r.active)
      .sort((a, b) => b.priority - a.priority);
  }

  async getTemplateRulesByType(ruleType: string): Promise<TemplateRule[]> {
    return Array.from(this.templateRules.values())
      .filter(r => r.active && r.ruleType === ruleType)
      .sort((a, b) => b.priority - a.priority);
  }

  async createTemplateRule(insertRule: InsertTemplateRule): Promise<TemplateRule> {
    const id = randomUUID();
    const rule: TemplateRule = {
      ...insertRule,
      description: insertRule.description ?? null,
      orgId: insertRule.orgId || "org_demo",
      conditions: insertRule.conditions ? [...insertRule.conditions] as RuleCondition[] : [],
      actions: insertRule.actions ? [...insertRule.actions] as RuleAction[] : [],
      priority: insertRule.priority || 0,
      active: insertRule.active !== undefined ? insertRule.active : true,
      id,
      createdAt: new Date(),
    };
    this.templateRules.set(id, rule);
    return rule;
  }

  async updateTemplateRule(id: string, updates: Partial<TemplateRule>): Promise<TemplateRule> {
    const rule = this.templateRules.get(id);
    if (!rule) throw new Error("Template rule not found");
    
    const updated = { ...rule, ...updates };
    this.templateRules.set(id, updated);
    return updated;
  }

  async deleteTemplateRule(id: string): Promise<boolean> {
    return this.templateRules.delete(id);
  }

  // Discount Rules
  async getDiscountRule(id: string): Promise<DiscountRule | undefined> {
    return this.discountRules.get(id);
  }

  async getDiscountRules(): Promise<DiscountRule[]> {
    return Array.from(this.discountRules.values());
  }

  async getActiveDiscountRules(): Promise<DiscountRule[]> {
    const now = new Date();
    return Array.from(this.discountRules.values())
      .filter(r => 
        r.active && 
        (!r.validFrom || r.validFrom <= now) &&
        (!r.validUntil || r.validUntil >= now) &&
        (!r.usageLimit || r.usageCount < r.usageLimit)
      );
  }

  async getDiscountRuleByCode(code: string): Promise<DiscountRule | undefined> {
    return Array.from(this.discountRules.values())
      .find(r => r.code === code && r.active);
  }

  async createDiscountRule(insertRule: InsertDiscountRule): Promise<DiscountRule> {
    const id = randomUUID();
    const rule: DiscountRule = {
      ...insertRule,
      code: insertRule.code ?? null,
      orgId: insertRule.orgId || "org_demo",
      minGroupSize: insertRule.minGroupSize || null,
      maxGroupSize: insertRule.maxGroupSize || null,
      minSubtotal: insertRule.minSubtotal || null,
      validFrom: insertRule.validFrom || null,
      validUntil: insertRule.validUntil || null,
      usageLimit: insertRule.usageLimit || null,
      usageCount: insertRule.usageCount || 0,
      active: insertRule.active !== undefined ? insertRule.active : true,
      conditions: insertRule.conditions ? [...insertRule.conditions] : [],
      id,
      createdAt: new Date(),
    };
    this.discountRules.set(id, rule);
    return rule;
  }

  async updateDiscountRule(id: string, updates: Partial<DiscountRule>): Promise<DiscountRule> {
    const rule = this.discountRules.get(id);
    if (!rule) throw new Error("Discount rule not found");
    
    const updated = { ...rule, ...updates };
    this.discountRules.set(id, updated);
    return updated;
  }

  async deleteDiscountRule(id: string): Promise<boolean> {
    return this.discountRules.delete(id);
  }

  // Pricing Settings
  async getPricingSettings(orgId?: string): Promise<PricingSettings | undefined> {
    const id = `pricing_${orgId || "org_demo"}`;
    return this.pricingSettings.get(id);
  }

  async updatePricingSettings(updates: Partial<PricingSettings>, orgId?: string): Promise<PricingSettings> {
    const id = `pricing_${orgId || "org_demo"}`;
    const existing = this.pricingSettings.get(id);
    
    if (!existing) {
      // Create new settings if none exist
      const newSettings: PricingSettings = {
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
        priceDisplayMode: "both",
        dayOfWeekMultipliers: null,
        seasonalAdjustments: [],
        updatedAt: new Date(),
        ...updates,
      };
      this.pricingSettings.set(id, newSettings);
      return newSettings;
    }
    
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    this.pricingSettings.set(id, updated);
    return updated;
  }

  // Affiliates
  async getAffiliate(id: string): Promise<Affiliate | undefined> {
    return this.affiliates.get(id);
  }

  async getAffiliates(): Promise<Affiliate[]> {
    return Array.from(this.affiliates.values())
      .filter(a => a.active)
      .sort((a, b) => b.totalRevenue - a.totalRevenue);
  }

  async getAffiliateByCode(code: string): Promise<Affiliate | undefined> {
    return Array.from(this.affiliates.values())
      .find(a => a.code === code && a.active);
  }

  async createAffiliate(insertAffiliate: InsertAffiliate): Promise<Affiliate> {
    const id = randomUUID();
    const affiliate: Affiliate = {
      ...insertAffiliate,
      orgId: insertAffiliate.orgId || "org_demo",
      email: insertAffiliate.email || null,
      phone: insertAffiliate.phone || null,
      companyName: insertAffiliate.companyName || null,
      commissionType: insertAffiliate.commissionType || "percentage",
      totalReferrals: 0,
      totalRevenue: 0,
      totalCommission: 0,
      pendingCommission: 0,
      lastReferralDate: null,
      notes: insertAffiliate.notes || null,
      active: insertAffiliate.active !== undefined ? insertAffiliate.active : true,
      id,
      createdAt: new Date(),
    };
    this.affiliates.set(id, affiliate);
    return affiliate;
  }

  async updateAffiliate(id: string, updates: Partial<Affiliate>): Promise<Affiliate> {
    const affiliate = this.affiliates.get(id);
    if (!affiliate) throw new Error("Affiliate not found");
    
    const updated = { ...affiliate, ...updates };
    this.affiliates.set(id, updated);
    return updated;
  }

  async deleteAffiliate(id: string): Promise<boolean> {
    return this.affiliates.delete(id);
  }

  async updateAffiliateStats(affiliateId: string): Promise<Affiliate> {
    const affiliate = await this.getAffiliate(affiliateId);
    if (!affiliate) throw new Error("Affiliate not found");

    // Calculate stats based on projects and quotes with the affiliate's code as leadSource
    const allProjects = Array.from(this.projects.values());
    const affiliateProjects = allProjects.filter(p => p.leadSource === affiliate.code);
    
    let totalRevenue = 0;
    let totalCommission = 0;
    let pendingCommission = 0;
    let lastReferralDate = null;

    for (const project of affiliateProjects) {
      const quotes = await this.getQuotesByProject(project.id);
      
      if (project.createdAt && (!lastReferralDate || project.createdAt > lastReferralDate)) {
        lastReferralDate = project.createdAt;
      }
      
      for (const quote of quotes) {
        if (quote.status === "ACCEPTED" || quote.status === "PAID" || quote.status === "INVOICED") {
          totalRevenue += quote.total;
          
          // Calculate commission
          let commission = 0;
          if (affiliate.commissionType === "percentage") {
            commission = Math.floor(quote.total * affiliate.commissionRate / 100);
          } else {
            commission = affiliate.commissionRate;
          }
          
          if (quote.status === "PAID") {
            totalCommission += commission;
          } else {
            pendingCommission += commission;
          }
        }
      }
    }

    return await this.updateAffiliate(affiliateId, {
      totalReferrals: affiliateProjects.length,
      totalRevenue,
      totalCommission,
      pendingCommission,
      lastReferralDate,
    });
  }

  // Calculate cruise-specific pricing
  async calculateCruisePricing(params: {
    groupSize: number;
    eventDate: Date;
    timeSlot: string;
    promoCode?: string;
  }): Promise<PricingPreview> {
    const { groupSize, eventDate, timeSlot, promoCode } = params;
    
    // Ensure eventDate is a proper Date object
    const eventDateObj = eventDate instanceof Date ? eventDate : new Date(eventDate);
    if (isNaN(eventDateObj.getTime())) {
      throw new Error("Invalid event date provided");
    }
    
    // Determine boat based on group size
    let boatType: string;
    let boatCapacity: number;
    if (groupSize <= 14) {
      boatType = "14-Person Luxury Yacht";
      boatCapacity = 14;
    } else if (groupSize <= 30) {
      boatType = "25-Person Party Cruiser";
      boatCapacity = 25;
    } else if (groupSize <= 75) {
      boatType = "50-Person Charter Yacht";
      boatCapacity = 50;
    } else {
      throw new Error("Group size exceeds maximum capacity of 75 people");
    }

    // Get day of week
    const dayOfWeek = eventDateObj.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dayOfWeek];

    // Determine base hourly rate based on boat and day
    let baseHourlyRate = 0;
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 4; // Monday-Thursday
    const isFriday = dayOfWeek === 5;
    const isSaturday = dayOfWeek === 6;
    const isSunday = dayOfWeek === 0;

    if (boatCapacity === 14) {
      if (isWeekday) baseHourlyRate = 20000; // $200/hour in cents
      else if (isFriday) baseHourlyRate = 25000; // $250/hour
      else if (isSaturday || isSunday) baseHourlyRate = 30000; // $300/hour
    } else if (boatCapacity === 25) {
      if (isWeekday) baseHourlyRate = 25000; // $250/hour
      else if (isFriday) baseHourlyRate = 30000; // $300/hour
      else if (isSaturday || isSunday) baseHourlyRate = 35000; // $350/hour
    } else if (boatCapacity === 50) {
      if (isWeekday) baseHourlyRate = 30000; // $300/hour
      else if (isFriday) baseHourlyRate = 35000; // $350/hour
      else if (isSaturday || isSunday) baseHourlyRate = 40000; // $400/hour
    }

    // Calculate base cruise cost (4 hours)
    const cruiseDuration = 4;
    const baseCruiseCost = baseHourlyRate * cruiseDuration;

    // Calculate crew fees based on Texas law
    let crewFee = 0;
    if (groupSize >= 26 && groupSize <= 30) {
      crewFee = 5000 * cruiseDuration; // $50/hour * 4 hours
    } else if (groupSize >= 51 && groupSize <= 75) {
      crewFee = 10000 * cruiseDuration; // $100/hour * 4 hours
    }

    // Calculate subtotal before tax
    const subtotalBeforeTax = baseCruiseCost + crewFee;

    // Calculate mandatory 20% gratuity
    const gratuity = Math.floor(subtotalBeforeTax * 0.20);

    // Subtotal with gratuity
    const subtotalWithGratuity = subtotalBeforeTax + gratuity;

    // Calculate 8.25% Texas sales tax
    const tax = Math.floor(subtotalWithGratuity * 0.0825);

    // Grand total
    const total = subtotalWithGratuity + tax;

    // Calculate deposit (25% if more than 30 days away, 100% if less)
    const daysUntil = Math.ceil((eventDateObj.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const depositPercent = daysUntil > 30 ? 25 : 100;
    const depositAmount = Math.floor(total * depositPercent / 100);

    // Calculate per-person cost
    const perPersonCost = Math.floor(total / groupSize);

    // Generate urgency message
    let urgencyMessage: string | undefined;
    if (daysUntil <= 7) {
      urgencyMessage = "⚡ Last-minute booking - limited availability!";
    } else if (daysUntil <= 30) {
      urgencyMessage = "📅 Full payment required - event is less than 30 days away!";
    }

    // Payment schedule
    const paymentSchedule: PaymentSchedule[] = [];
    if (depositPercent < 100) {
      paymentSchedule.push({
        line: 1,
        due: "booking",
        percent: 25,
        daysBefore: 0,
      });
      paymentSchedule.push({
        line: 2,
        due: "final",
        percent: 75,
        daysBefore: 30,
      });
    } else {
      paymentSchedule.push({
        line: 1,
        due: "full",
        percent: 100,
        daysBefore: 0,
      });
    }

    // Generate quote items
    const items: QuoteItem[] = [];
    
    // Add main cruise charter
    items.push({
      id: `cruise_${Date.now()}`,
      type: 'cruise_charter',
      name: `Private ${boatType} Charter`,
      description: `Exclusive ${cruiseDuration}-hour cruise on ${dayName} from ${timeSlot}`,
      unitPrice: baseCruiseCost,
      qty: 1,
      category: 'cruise_package'
    });
    
    // Add crew fee if applicable
    if (crewFee > 0) {
      items.push({
        id: `crew_${Date.now()}`,
        type: 'crew_fee',
        name: 'Additional Crew Service',
        description: `Professional crew service required for groups of ${groupSize}+ people`,
        unitPrice: crewFee,
        qty: 1,
        category: 'service_fee'
      });
    }

    return {
      // items,  // Removed - not part of PricingPreview type
      subtotal: baseCruiseCost,
      discountTotal: 0,
      tax,
      gratuity,
      total,
      perPersonCost,
      depositAmount,
      depositPercent,
      depositRequired: true,
      paymentSchedule,
      appliedDiscounts: [],
      urgencyMessage,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      displaySettings: {
        showPerPerson: true,
        showDeposit: true,
        showPaymentSchedule: true,
        showUrgency: !!urgencyMessage,
      },
      breakdown: {
        boatType,
        dayName,
        baseHourlyRate: baseHourlyRate / 100, // Convert back to dollars for display
        cruiseDuration,
        baseCruiseCost: baseCruiseCost / 100,
        crewFee: crewFee / 100,
        subtotalBeforeTax: subtotalBeforeTax / 100,
        gratuityAmount: gratuity / 100,
        taxAmount: tax / 100,
        grandTotal: total / 100,
        perPerson: perPersonCost / 100,
        deposit: depositAmount / 100,
        balanceDue: (total - depositAmount) / 100,
      }
    };
  }

  // Enhanced pricing calculation
  async calculatePricing(params: {
    items: any[];
    groupSize?: number;
    projectDate?: Date;
    promoCode?: string;
    templateId?: string;
  }): Promise<PricingPreview> {
    const { items, groupSize, projectDate, promoCode, templateId } = params;
    const settings = await this.getPricingSettings();
    
    if (!settings) {
      throw new Error("Pricing settings not found");
    }

    // Calculate subtotal
    let subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);

    // Apply template-specific pricing if templateId provided
    if (templateId) {
      const template = await this.getQuoteTemplate(templateId);
      if (template && template.basePricePerPerson && groupSize) {
        subtotal += template.basePricePerPerson * groupSize;
      }
    }

    // Apply discounts
    let discountTotal = 0;
    let appliedDiscounts: string[] = [];

    if (promoCode) {
      const discountRule = await this.getDiscountRuleByCode(promoCode);
      if (discountRule && this.validateDiscountRule(discountRule, { subtotal, groupSize, projectDate })) {
        discountTotal = this.calculateDiscount(discountRule, subtotal, groupSize);
        appliedDiscounts.push(discountRule.name);
      }
    }

    // Check for automatic discounts
    const activeDiscounts = await this.getActiveDiscountRules();
    for (const discount of activeDiscounts) {
      if (!discount.code && this.validateDiscountRule(discount, { subtotal, groupSize, projectDate })) {
        const additionalDiscount = this.calculateDiscount(discount, subtotal, groupSize);
        if (additionalDiscount > discountTotal) {
          discountTotal = additionalDiscount;
          appliedDiscounts = [discount.name];
        }
      }
    }

    const discountedSubtotal = subtotal - discountTotal;

    // Calculate tax
    const tax = Math.floor(discountedSubtotal * settings.taxRate / 10000);

    // Calculate gratuity
    const gratuity = settings.gratuityIncluded 
      ? Math.floor(discountedSubtotal * settings.defaultGratuityPercent / 100)
      : 0;

    const total = discountedSubtotal + tax + gratuity;

    // Calculate per-person cost
    const perPersonCost = groupSize ? Math.floor(total / groupSize) : 0;

    // Determine deposit requirements
    let depositPercent = settings.defaultDepositPercent;
    let depositRequired = true;

    if (projectDate) {
      const daysUntil = Math.ceil((projectDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      
      if (daysUntil <= settings.fullPaymentThresholdDays) {
        depositPercent = 100; // Full payment required
      }
    }

    const depositAmount = Math.floor(total * depositPercent / 100);

    // Generate urgency message
    let urgencyMessage: string | undefined;
    if (projectDate) {
      const daysUntil = Math.ceil((projectDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      
      if (daysUntil <= settings.urgencyThresholdDays) {
        urgencyMessage = daysUntil <= 7 
          ? "⚡ Last-minute booking - limited availability!"
          : "📅 Book soon - less than 30 days away!";
      }
    }

    // Generate payment schedule
    const paymentSchedule: PaymentSchedule[] = [];
    if (depositPercent < 100) {
      paymentSchedule.push({
        line: 1,
        due: "booking",
        percent: depositPercent,
        daysBefore: 0,
      });
      paymentSchedule.push({
        line: 2,
        due: "final",
        percent: 100 - depositPercent,
        daysBefore: 3,
      });
    } else {
      paymentSchedule.push({
        line: 1,
        due: "full",
        percent: 100,
        daysBefore: 0,
      });
    }

    // Set expiration date (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return {
      subtotal,
      discountTotal,
      tax,
      gratuity,
      total,
      perPersonCost,
      depositRequired,
      depositPercent,
      depositAmount,
      urgencyMessage,
      appliedDiscounts,
      paymentSchedule,
      expiresAt,
    };
  }

  private validateDiscountRule(rule: DiscountRule, context: { subtotal: number; groupSize?: number; projectDate?: Date }): boolean {
    const { subtotal, groupSize, projectDate } = context;

    // Check group size
    if (rule.minGroupSize && (!groupSize || groupSize < rule.minGroupSize)) return false;
    if (rule.maxGroupSize && groupSize && groupSize > rule.maxGroupSize) return false;

    // Check minimum subtotal
    if (rule.minSubtotal && subtotal < rule.minSubtotal) return false;

    // Check conditions
    if (rule.conditions) {
      for (const condition of rule.conditions) {
        if (!this.evaluateCondition(condition, context)) return false;
      }
    }

    return true;
  }

  private evaluateCondition(condition: DiscountCondition, context: any): boolean {
    const { field, operator, value } = condition;
    
    let contextValue: any;
    if (field === "daysBefore" && context.projectDate) {
      contextValue = Math.ceil((context.projectDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    } else {
      contextValue = context[field];
    }

    switch (operator) {
      case "equals":
        return contextValue === value;
      case "greater_than":
        return contextValue > value;
      case "less_than":
        return contextValue < value;
      case "greater_than_or_equal":
        return contextValue >= value;
      case "less_than_or_equal":
        return contextValue <= value;
      default:
        return false;
    }
  }

  private calculateDiscount(rule: DiscountRule, subtotal: number, groupSize?: number): number {
    switch (rule.discountType) {
      case "percentage":
        return Math.floor(subtotal * rule.discountValue / 100);
      case "fixed_amount":
        return rule.discountValue;
      case "per_person":
        return groupSize ? rule.discountValue * groupSize : 0;
      default:
        return 0;
    }
  }

  // Helper methods for automated contact/project creation
  async findOrCreateContact(email: string, name?: string, phone?: string): Promise<Contact> {
    let contact = await this.getContactByEmail(email);
    
    if (!contact) {
      // Ensure we have a valid email before processing
      const validEmail = email || `guest_${Date.now()}@temp.com`;
      const defaultName = name || (validEmail.includes('@') ? validEmail.split('@')[0] : 'Guest');
      
      contact = await this.createContact({
        name: defaultName,
        email: validEmail,
        phone: phone || null,
        tags: ["chatbot"],
      });
    }
    
    return contact;
  }

  // Automatic Quote Generation Methods
  async generateAutomaticQuote(contact: Contact, project: Project, eventType?: string): Promise<Quote> {
    const finalEventType = eventType || project.eventType || 'general';
    
    // Get appropriate template
    let templates = await this.getQuoteTemplatesByEventType(finalEventType);
    
    // If no templates for specific event type, try general
    if (templates.length === 0 && finalEventType !== 'general') {
      templates = await this.getQuoteTemplatesByEventType('general');
    }
    
    // If still no templates, use default template
    if (templates.length === 0) {
      templates = Array.from(this.quoteTemplates.values()).filter(t => t.active && t.isDefault);
    }
    
    // If still no templates, use the first active template
    if (templates.length === 0) {
      templates = Array.from(this.quoteTemplates.values()).filter(t => t.active).slice(0, 1);
    }
    
    if (templates.length === 0) {
      throw new Error('No quote templates available for automatic quote generation');
    }
    
    const template = templates[0];
    
    // Calculate pricing
    const pricing = await this.calculatePricing({
      items: template.defaultItems,
      groupSize: project.groupSize || template.minGroupSize || 1,
      projectDate: project.projectDate || undefined,
      templateId: template.id,
    });

    // Create the quote
    const quote = await this.createQuote({
      projectId: project.id,
      templateId: template.id,
      items: template.defaultItems,
      radioSections: template.defaultRadioSections || [],
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
      expiresAt: pricing.expiresAt,
      status: 'DRAFT'
    });

    return quote;
  }

  async generateQuoteForLead(leadData: {
    contactId: string;
    eventType?: string;
    groupSize?: number;
    projectDate?: Date;
    projectId?: string;
  }): Promise<Quote> {
    const contact = await this.getContact(leadData.contactId);
    if (!contact) {
      throw new Error('Contact not found for quote generation');
    }

    let project;
    if (leadData.projectId) {
      project = await this.getProject(leadData.projectId);
      if (!project) {
        throw new Error('Project not found for quote generation');
      }
    } else {
      // Create a new project for this lead
      project = await this.createProject({
        contactId: leadData.contactId,
        title: `${leadData.eventType || 'General'} Event - Auto-Generated`,
        eventType: leadData.eventType || null,
        groupSize: leadData.groupSize || null,
        projectDate: leadData.projectDate || null,
        leadSource: 'auto_quote_generation',
        tags: ['auto_generated'],
      });
    }

    return await this.generateAutomaticQuote(contact, project, leadData.eventType);
  }

  async createProjectFromChatData(contactId: string, extractedData: any): Promise<Project> {
    // Add null-safety and support legacy date field
    const projectDateStr = extractedData?.projectDate ?? extractedData?.date;
    const projectDate = projectDateStr ? new Date(projectDateStr) : null;
    
    return await this.createProject({
      contactId,
      title: extractedData?.eventType ? `${extractedData.eventType} Event` : "New Event",
      eventType: extractedData?.eventType || null,
      groupSize: extractedData?.groupSize || null,
      projectDate: projectDate || undefined,
      duration: extractedData?.duration || null,
      specialRequests: extractedData?.specialRequests || null,
      preferredTime: extractedData?.preferredTime || extractedData?.timePreference || null,
      budget: extractedData?.budget || null,
      leadSource: "chat",
      tags: ["chatbot"],
    });
  }

  // Booking Management Methods
  async getBookings(startDate?: Date, endDate?: Date, boatId?: string): Promise<Booking[]> {
    const bookings = Array.from(this.bookings.values()).filter(booking => {
      // If no date range specified, return all bookings
      if (!startDate || !endDate) {
        // Filter by boat if specified
        if (boatId) {
          return booking.boatId === boatId;
        }
        return true;
      }
      
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      
      // Check if booking overlaps with date range
      const overlaps = bookingStart <= endDate && bookingEnd >= startDate;
      
      // Filter by boat if specified
      if (boatId) {
        return overlaps && booking.boatId === boatId;
      }
      
      return overlaps;
    });
    
    // Sort by start time
    return bookings.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    // Validate no conflict exists
    if (insertBooking.boatId) {
      const hasConflict = await this.checkBookingConflict(
        insertBooking.boatId,
        insertBooking.startTime,
        insertBooking.endTime
      );
      
      if (hasConflict) {
        throw new Error("Booking conflicts with existing reservation");
      }
    }
    
    // Check boat capacity if private booking
    if (insertBooking.type === "private" && insertBooking.boatId) {
      const boat = await this.boats.get(insertBooking.boatId);
      if (boat && insertBooking.groupSize > boat.maxCapacity) {
        throw new Error(`Group size ${insertBooking.groupSize} exceeds boat capacity ${boat.maxCapacity}`);
      }
    }
    
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      specialRequests: insertBooking.specialRequests ?? null,
      orgId: insertBooking.orgId || "org_demo",
      status: insertBooking.status || "booked",
      notes: insertBooking.notes || null,
      projectId: insertBooking.projectId || null,
      partyType: insertBooking.partyType || null,
      boatId: insertBooking.boatId || null,
      paymentStatus: insertBooking.paymentStatus || "pending",
      amountPaid: insertBooking.amountPaid || 0,
      totalAmount: insertBooking.totalAmount || 0,
      lastModifiedAt: new Date(),
      id,
      createdAt: new Date(),
    };
    
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const booking = this.bookings.get(id);
    if (!booking) throw new Error("Booking not found");
    
    // If changing time or boat, check for conflicts
    if ((updates.startTime || updates.endTime || updates.boatId) && booking.boatId) {
      const newStartTime = updates.startTime || booking.startTime;
      const newEndTime = updates.endTime || booking.endTime;
      const newBoatId = updates.boatId || booking.boatId;
      
      const hasConflict = await this.checkBookingConflict(
        newBoatId,
        newStartTime,
        newEndTime,
        id // Exclude this booking from conflict check
      );
      
      if (hasConflict) {
        throw new Error("Updated booking would conflict with existing reservation");
      }
    }
    
    const updated = { ...booking, ...updates };
    this.bookings.set(id, updated);
    return updated;
  }

  async deleteBooking(id: string): Promise<boolean> {
    return this.bookings.delete(id);
  }

  async checkBookingConflict(
    boatId: string, 
    startTime: Date, 
    endTime: Date, 
    excludeBookingId?: string
  ): Promise<boolean> {
    const bookings = Array.from(this.bookings.values());
    
    return bookings.some(booking => {
      // Skip if this is the booking we're updating
      if (excludeBookingId && booking.id === excludeBookingId) return false;
      
      // Skip if different boat or canceled
      if (booking.boatId !== boatId || booking.status === "canceled") return false;
      
      // Check for time overlap using proper interval overlap logic
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      
      // Two time intervals [startTime, endTime) and [bookingStart, bookingEnd) overlap if:
      // startTime < bookingEnd AND endTime > bookingStart
      // This handles all overlap cases including partial overlaps, containment, and exact matches
      return startTime < bookingEnd && endTime > bookingStart;
    });
  }

  async createBookingFromPayment(projectId: string, paymentId: string, amount: number): Promise<Booking> {
    // CONCURRENCY PROTECTION: Add timestamp-based idempotent check
    const operationKey = `booking_${projectId}_${paymentId}`;
    const existingOperation = this.pendingBookingOperations.get(operationKey);
    if (existingOperation) {
      // Wait for existing operation to complete or throw if it failed
      try {
        return await existingOperation;
      } catch (error) {
        // If existing operation failed, remove it and try again
        this.pendingBookingOperations.delete(operationKey);
        throw error;
      }
    }

    // Create promise for this operation to prevent concurrent executions
    const operationPromise = this._executeBookingFromPayment(projectId, paymentId, amount);
    this.pendingBookingOperations.set(operationKey, operationPromise);

    try {
      const result = await operationPromise;
      this.pendingBookingOperations.delete(operationKey);
      return result;
    } catch (error) {
      this.pendingBookingOperations.delete(operationKey);
      throw error;
    }
  }

  private async _executeBookingFromPayment(projectId: string, paymentId: string, amount: number): Promise<Booking> {
    // Get the project details
    const project = await this.getProject(projectId);
    if (!project) throw new Error('Project not found');
    
    // Get the contact to convert to customer
    const contact = await this.getContact(project.contactId);
    if (!contact) throw new Error('Contact not found');
    
    // NORMALIZE CHICAGO TIME: Ensure project date is properly normalized
    let normalizedProjectDate: Date;
    if (project.projectDate) {
      normalizedProjectDate = this.normalizeToChicagoTime(project.projectDate);
    } else {
      throw new Error('Project date is required for booking creation');
    }

    // Parse time slot from preferredTime if available
    let startTime: Date, endTime: Date;
    if (project.preferredTime) {
      const timeSlot = this.parseTimeSlot(project.preferredTime, normalizedProjectDate);
      startTime = timeSlot.startTime;
      endTime = timeSlot.endTime;
    } else {
      // Default to project date with 4-hour duration
      startTime = normalizedProjectDate;
      endTime = new Date(startTime.getTime() + (project.duration || 4) * 60 * 60 * 1000);
    }
    
    // Find an available boat if not specified
    let boatId = project.availabilitySlotId || '';
    
    // CRITICAL FIX: Always perform conflict checking, even with pre-selected boatId
    if (boatId) {
      // Verify the pre-selected boat is still available
      const hasConflict = await this.checkBookingConflict(boatId, startTime, endTime);
      if (hasConflict) {
        // Clear the conflicted boat and find a new one
        boatId = '';
        console.warn(`Pre-selected boat ${boatId} has conflicts, finding alternative`);
      }
    }
    
    if (!boatId && project.groupSize) {
      const boats = await this.getBoatsByCapacity(project.groupSize);
      
      // Check each boat for conflicts and select the first available one
      for (const boat of boats) {
        const hasConflict = await this.checkBookingConflict(boat.id, startTime, endTime);
        
        if (!hasConflict) {
          boatId = boat.id;
          break;
        }
      }
      
      // If no available boat found, throw specific error for booking conflicts
      if (!boatId) {
        const error = new Error('BOOKING_CONFLICT: No available boats for the requested time slot. All boats are booked.');
        (error as any).code = 'BOOKING_CONFLICT';
        (error as any).details = {
          projectId,
          paymentId,
          requestedTime: { startTime, endTime },
          groupSize: project.groupSize
        };
        throw error;
      }
    }

    if (!boatId) {
      const error = new Error('BOOKING_CONFLICT: Unable to assign boat for booking');
      (error as any).code = 'BOOKING_CONFLICT';
      throw error;
    }
    
    const booking: InsertBooking = {
      orgId: project.orgId,
      boatId,
      type: 'private',
      status: 'booked',
      startTime,
      endTime,
      partyType: project.eventType || 'cruise',
      groupSize: project.groupSize || 0,
      projectId: project.id,
      paymentStatus: 'deposit_paid',
      amountPaid: amount,
      totalAmount: amount,
      notes: `Payment ${paymentId} - Amount: $${(amount / 100).toFixed(2)}`,
    };
    
    // Create the booking with built-in conflict checking
    const newBooking = await this.createBooking(booking);
    
    // GOOGLE SHEETS INTEGRATION: Update availability after successful booking
    try {
      await this.updateGoogleSheetsAfterBooking(newBooking, project, contact);
    } catch (error) {
      console.error('Failed to update Google Sheets after booking:', error);
      // Don't fail the booking creation, just log the error
    }
    
    // Update project status to CLOSED_WON
    await this.updateProject(projectId, { status: 'CLOSED_WON' });
    
    // Convert lead to customer (add customer tag)
    await this.convertLeadToCustomer(project.contactId);
    
    return newBooking;
  }

  // HELPER METHODS FOR ENHANCED BOOKING CREATION
  
  private normalizeToChicagoTime(date: Date | string): Date {
    // Chicago timezone offset: CST is UTC-6, CDT is UTC-5
    // For simplicity, we'll assume CST (UTC-6) - in production, use a proper timezone library
    if (typeof date === 'string') {
      // If it's just a date (YYYY-MM-DD), treat as Chicago timezone
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return new Date(date + 'T00:00:00-06:00'); // CST
      }
      
      // If it includes time but no timezone, assume Chicago
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(date)) {
        return new Date(date + '-06:00');
      }
      
      // Otherwise parse as-is
      return new Date(date);
    }
    
    return date;
  }
  
  private parseTimeSlot(timeSlot: string, baseDate: Date): { startTime: Date; endTime: Date } {
    // Parse time slots like "11am-2pm", "2pm-6pm", "6pm-10pm"
    const timeSlotPattern = /^(\d{1,2})(am|pm)-(\d{1,2})(am|pm)$/i;
    const match = timeSlot.match(timeSlotPattern);
    
    if (!match) {
      // Fallback to 4-hour duration from base date
      const startTime = new Date(baseDate);
      const endTime = new Date(startTime.getTime() + 4 * 60 * 60 * 1000);
      return { startTime, endTime };
    }
    
    const [, startHourStr, startPeriod, endHourStr, endPeriod] = match;
    
    let startHour = parseInt(startHourStr);
    let endHour = parseInt(endHourStr);
    
    // Convert to 24-hour format
    if (startPeriod.toLowerCase() === 'pm' && startHour !== 12) {
      startHour += 12;
    } else if (startPeriod.toLowerCase() === 'am' && startHour === 12) {
      startHour = 0;
    }
    
    if (endPeriod.toLowerCase() === 'pm' && endHour !== 12) {
      endHour += 12;
    } else if (endPeriod.toLowerCase() === 'am' && endHour === 12) {
      endHour = 0;
    }
    
    const startTime = new Date(baseDate);
    startTime.setHours(startHour, 0, 0, 0);
    
    const endTime = new Date(baseDate);
    endTime.setHours(endHour, 0, 0, 0);
    
    return { startTime, endTime };
  }
  
  private async updateGoogleSheetsAfterBooking(
    booking: Booking, 
    project: Project, 
    contact: Contact
  ): Promise<void> {
    try {
      // Import the Google Sheets service
      const { googleSheetsService } = await import('./services/googleSheets');
      
      // Update availability status to BOOKED
      const boat = await this.boats.get(booking.boatId);
      if (!boat) return;
      
      // Format the booking data for Google Sheets
      const availabilityData = {
        date: booking.startTime.toISOString().split('T')[0],
        day: booking.startTime.toLocaleDateString('en-US', { weekday: 'long' }),
        time: `${booking.startTime.toTimeString().slice(0, 5)}-${booking.endTime.toTimeString().slice(0, 5)}`,
        boatType: boat.name,
        capacity: boat.capacity,
        baseRate: 0, // Will be calculated based on pricing rules
        status: 'BOOKED' as const,
        bookedBy: contact.name,
        groupSize: booking.groupSize,
        notes: `Booking ID: ${booking.id}, Project: ${project.title || 'Private Cruise'}, Payment: $${(booking.amountPaid / 100).toFixed(2)}`
      };
      
      // Update Google Sheets availability
      await googleSheetsService.updateAvailabilityStatus(
        booking.startTime,
        booking.endTime,
        boat.name,
        'BOOKED',
        {
          bookedBy: contact.name,
          groupSize: booking.groupSize,
          bookingId: booking.id
        }
      );
      
      console.log(`✅ Google Sheets updated for booking ${booking.id}`);
      
    } catch (error) {
      console.error('❌ Failed to update Google Sheets after booking:', error);
      // Don't throw - this is a non-critical operation
    }
  }

  async convertLeadToCustomer(contactId: string): Promise<Contact> {
    const contact = this.contacts.get(contactId);
    if (!contact) throw new Error('Contact not found');
    
    // Add 'customer' tag if not already present
    const tags = contact.tags || [];
    if (!tags.includes('customer')) {
      tags.push('customer');
      contact.tags = tags;
    }
    
    this.contacts.set(contactId, contact);
    return contact;
  }

  // Disco Cruise Management Methods
  async getDiscoSlots(year: number, month: number): Promise<DiscoSlot[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const slots = Array.from(this.discoSlots.values()).filter(slot => {
      const slotDate = slot.date;
      return slotDate >= startDate && slotDate <= endDate;
    });
    
    return slots.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async getDiscoSlot(id: string): Promise<DiscoSlot | undefined> {
    return this.discoSlots.get(id);
  }

  async createDiscoSlot(insertSlot: InsertDiscoSlot): Promise<DiscoSlot> {
    const id = randomUUID();
    const slot: DiscoSlot = {
      ...insertSlot,
      status: insertSlot.status || "available",
      ticketCap: insertSlot.ticketCap || 100,
      ticketsSold: insertSlot.ticketsSold || 0,
      id,
      createdAt: new Date(),
    };
    
    this.discoSlots.set(id, slot);
    return slot;
  }

  async purchaseDiscoTickets(slotId: string, quantity: number): Promise<DiscoSlot> {
    const slot = this.discoSlots.get(slotId);
    if (!slot) throw new Error("Disco slot not found");
    
    if (slot.status !== "available") {
      throw new Error("Disco slot is not available for purchase");
    }
    
    // Atomic operation to prevent overselling
    const newTicketsSold = slot.ticketsSold + quantity;
    
    if (newTicketsSold > slot.ticketCap) {
      throw new Error(`Only ${slot.ticketCap - slot.ticketsSold} tickets remaining`);
    }
    
    const updated = {
      ...slot,
      ticketsSold: newTicketsSold,
      status: newTicketsSold >= slot.ticketCap ? "soldout" as const : "available" as const,
    };
    
    this.discoSlots.set(slotId, updated);
    return updated;
  }

  async updateDiscoSlot(id: string, updates: Partial<DiscoSlot>): Promise<DiscoSlot> {
    const slot = this.discoSlots.get(id);
    if (!slot) throw new Error("Disco slot not found");
    
    const updated = { ...slot, ...updates };
    
    // Update status based on tickets sold
    if (updated.ticketsSold >= updated.ticketCap) {
      updated.status = "soldout";
    } else if (updated.status === "soldout" && updated.ticketsSold < updated.ticketCap) {
      updated.status = "available";
    }
    
    this.discoSlots.set(id, updated);
    return updated;
  }

  async checkDiscoAvailability(date: Date, time: string): Promise<boolean> {
    const slots = Array.from(this.discoSlots.values());
    
    // Parse time string (HH:MM format)
    const [hours, minutes] = time.split(':').map(Number);
    const checkDateTime = new Date(date);
    checkDateTime.setHours(hours, minutes, 0, 0);
    
    const slot = slots.find(s => {
      const slotStart = s.startTime;
      const slotEnd = s.endTime;
      
      return checkDateTime >= slotStart && checkDateTime < slotEnd;
    });
    
    if (!slot) return false;
    
    return slot.status === "available" && slot.ticketsSold < slot.ticketCap;
  }

  // Timeframe Management Methods
  async getTimeframes(dayOfWeek?: number, type?: string): Promise<Timeframe[]> {
    let timeframes = Array.from(this.timeframes.values()).filter(tf => tf.active);
    
    if (dayOfWeek !== undefined) {
      timeframes = timeframes.filter(tf => tf.dayOfWeek === dayOfWeek);
    }
    
    if (type) {
      timeframes = timeframes.filter(tf => tf.type === type);
    }
    
    return timeframes.sort((a, b) => {
      // Sort by day of week, then by start time
      if (a.dayOfWeek !== b.dayOfWeek) {
        return a.dayOfWeek - b.dayOfWeek;
      }
      return a.startTime.localeCompare(b.startTime);
    });
  }

  async getTimeframe(id: string): Promise<Timeframe | undefined> {
    return this.timeframes.get(id);
  }

  async createTimeframe(insertTimeframe: InsertTimeframe): Promise<Timeframe> {
    const id = randomUUID();
    const timeframe: Timeframe = {
      ...insertTimeframe,
      boatIds: insertTimeframe.boatIds || [],
      active: insertTimeframe.active !== undefined ? insertTimeframe.active : true,
      description: insertTimeframe.description || null,
      id,
      createdAt: new Date(),
    };
    
    this.timeframes.set(id, timeframe);
    return timeframe;
  }

  async updateTimeframe(id: string, updates: Partial<Timeframe>): Promise<Timeframe> {
    const timeframe = this.timeframes.get(id);
    if (!timeframe) throw new Error("Timeframe not found");
    
    const updated = { ...timeframe, ...updates };
    this.timeframes.set(id, updated);
    return updated;
  }

  async deleteTimeframe(id: string): Promise<boolean> {
    return this.timeframes.delete(id);
  }

  async generateTimeframesForMonth(year: number, month: number): Promise<{ date: Date; timeframes: Timeframe[] }[]> {
    const timeframes = await this.getTimeframes();
    const result: { date: Date; timeframes: Timeframe[] }[] = [];
    
    // Get all days in the month
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();
      
      // Find timeframes for this day of week
      const dayTimeframes = timeframes.filter(tf => tf.dayOfWeek === dayOfWeek);
      
      if (dayTimeframes.length > 0) {
        result.push({
          date,
          timeframes: dayTimeframes,
        });
      }
    }
    
    return result;
  }

  // Boat Fleet Management Methods
  async getAvailableBoats(
    date: Date, 
    startTime: string, 
    endTime: string, 
    groupSize: number
  ): Promise<Boat[]> {
    // Get all active boats that can accommodate the group size
    const boats = await this.getActiveBoats();
    const suitableBoats = boats.filter(boat => boat.maxCapacity >= groupSize);
    
    if (suitableBoats.length === 0) {
      return [];
    }
    
    // Parse time strings and create full datetime objects
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startDateTime = new Date(date);
    startDateTime.setHours(startHours, startMinutes, 0, 0);
    
    const endDateTime = new Date(date);
    endDateTime.setHours(endHours, endMinutes, 0, 0);
    
    // Check each boat for conflicts
    const availableBoats: Boat[] = [];
    
    for (const boat of suitableBoats) {
      const hasConflict = await this.checkBookingConflict(
        boat.id,
        startDateTime,
        endDateTime
      );
      
      if (!hasConflict) {
        availableBoats.push(boat);
      }
    }
    
    // Sort by capacity (smallest suitable boat first)
    return availableBoats.sort((a, b) => a.capacity - b.capacity);
  }

  async getBoatsByCapacity(capacity: number): Promise<Boat[]> {
    const activeBoats = await this.getActiveBoats();
    return activeBoats.filter(boat => boat.capacity === capacity);
  }

  async assignFlexibleBoat(capacity: number, startTime: Date, endTime: Date, excludeBoatIds: string[] = []): Promise<Boat | undefined> {
    const boats = await this.getBoatsByCapacity(capacity);
    
    for (const boat of boats) {
      if (excludeBoatIds.includes(boat.id)) continue;
      
      const hasConflict = await this.checkBookingConflict(boat.id, startTime, endTime);
      if (!hasConflict) {
        return boat;
      }
    }
    
    return undefined;
  }

  async reassignBooking(bookingId: string, newBoatId: string): Promise<Booking> {
    const booking = await this.getBooking(bookingId);
    if (!booking) throw new Error('Booking not found');
    
    const boat = Array.from(this.boats.values()).find(b => b.id === newBoatId);
    if (!boat) throw new Error('Boat not found');
    
    // Check if new boat is available for this time slot
    const hasConflict = await this.checkBookingConflict(newBoatId, booking.startTime, booking.endTime, bookingId);
    if (hasConflict) {
      throw new Error('New boat is not available for this time slot');
    }
    
    // Update the booking
    return await this.updateBooking(bookingId, { boatId: newBoatId });
  }

  async getBoatAvailabilityByCapacity(date: Date, startTime: string, endTime: string): Promise<Map<number, { total: number; available: number; boats: Boat[] }>> {
    const activeBoats = await this.getActiveBoats();
    const capacityMap = new Map<number, { total: number; available: number; boats: Boat[] }>();
    
    // Group boats by capacity
    const boatsByCapacity = new Map<number, Boat[]>();
    for (const boat of activeBoats) {
      const boats = boatsByCapacity.get(boat.capacity) || [];
      boats.push(boat);
      boatsByCapacity.set(boat.capacity, boats);
    }
    
    // Parse time strings
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startDateTime = new Date(date);
    startDateTime.setHours(startHours, startMinutes, 0, 0);
    
    const endDateTime = new Date(date);
    endDateTime.setHours(endHours, endMinutes, 0, 0);
    
    // Check availability for each capacity group
    for (const [capacity, boats] of Array.from(boatsByCapacity.entries())) {
      const availableBoats: Boat[] = [];
      
      for (const boat of boats) {
        const hasConflict = await this.checkBookingConflict(boat.id, startDateTime, endDateTime);
        if (!hasConflict) {
          availableBoats.push(boat);
        }
      }
      
      capacityMap.set(capacity, {
        total: boats.length,
        available: availableBoats.length,
        boats: availableBoats
      });
    }
    
    return capacityMap;
  }

  // Availability Management Methods
  async checkAvailability(
    date: Date, 
    duration: number, 
    groupSize: number, 
    type: 'private' | 'disco'
  ): Promise<{ available: boolean; boats?: Boat[]; reason?: string }> {
    if (type === 'disco') {
      // For disco cruises, check if there's a slot on this date
      const slots = await this.getDiscoSlots(date.getFullYear(), date.getMonth() + 1);
      const daySlots = slots.filter(slot => {
        const slotDate = new Date(slot.date);
        return slotDate.toDateString() === date.toDateString();
      });
      
      if (daySlots.length === 0) {
        return { available: false, reason: "No disco cruise scheduled for this date" };
      }
      
      const availableSlot = daySlots.find(slot => 
        slot.status === "available" && 
        (slot.ticketCap - slot.ticketsSold) >= groupSize
      );
      
      if (!availableSlot) {
        return { available: false, reason: "Not enough tickets available for your group size" };
      }
      
      return { available: true };
    }
    
    // For private cruises, check boat availability
    const dayOfWeek = date.getDay();
    const timeframes = await this.getTimeframes(dayOfWeek, 'private');
    
    if (timeframes.length === 0) {
      return { available: false, reason: "No private cruises available on this day" };
    }
    
    // Try each timeframe to find available boats
    for (const timeframe of timeframes) {
      const availableBoats = await this.getAvailableBoats(
        date,
        timeframe.startTime,
        timeframe.endTime,
        groupSize
      );
      
      if (availableBoats.length > 0) {
        return { available: true, boats: availableBoats };
      }
    }
    
    return { available: false, reason: "All boats are booked for this date" };
  }

  async getMonthlyCalendar(
    boatId: string, 
    year: number, 
    month: number
  ): Promise<{ date: Date; bookings: Booking[]; available: boolean }[]> {
    const calendar: { date: Date; bookings: Booking[]; available: boolean }[] = [];
    
    // Get all bookings for the month
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    lastDay.setHours(23, 59, 59, 999);
    
    const monthBookings = await this.getBookings(firstDay, lastDay, boatId);
    
    // Create calendar entries for each day
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month - 1, day);
      
      // Find bookings for this specific day
      const dayBookings = monthBookings.filter(booking => {
        const bookingDate = new Date(booking.startTime);
        return bookingDate.toDateString() === date.toDateString();
      });
      
      // Check if there are any available slots on this day
      const dayOfWeek = date.getDay();
      const timeframes = await this.getTimeframes(dayOfWeek);
      
      // A day is available if it has timeframes and not all slots are booked
      let available = false;
      
      if (timeframes.length > 0) {
        // Check if the boat is in any of the timeframe boat lists
        const boatTimeframes = timeframes.filter(tf => 
          !tf.boatIds || tf.boatIds.length === 0 || 
          tf.boatIds.includes('any') || 
          tf.boatIds.includes(boatId)
        );
        
        if (boatTimeframes.length > 0) {
          // Check if all timeframes are booked
          const allBooked = boatTimeframes.every(tf => {
            const [startHours, startMinutes] = tf.startTime.split(':').map(Number);
            const [endHours, endMinutes] = tf.endTime.split(':').map(Number);
            
            const slotStart = new Date(date);
            slotStart.setHours(startHours, startMinutes, 0, 0);
            
            const slotEnd = new Date(date);
            slotEnd.setHours(endHours, endMinutes, 0, 0);
            
            // Check if this timeframe overlaps with any booking
            return dayBookings.some(booking => {
              const bookingStart = booking.startTime;
              const bookingEnd = booking.endTime;
              
              return (
                (slotStart >= bookingStart && slotStart < bookingEnd) ||
                (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
                (slotStart <= bookingStart && slotEnd >= bookingEnd)
              );
            });
          });
          
          available = !allBooked;
        }
      }
      
      calendar.push({
        date,
        bookings: dayBookings,
        available,
      });
    }
    
    return calendar;
  }

  async getMonthlyCalendarGrouped(year: number, month: number): Promise<Map<string, { date: Date; bookings: Booking[]; boatsByCapacity: Map<number, { available: Boat[]; booked: Boat[] }> }>> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    endDate.setHours(23, 59, 59, 999);
    const allBookings = await this.getBookings(startDate, endDate);
    const activeBoats = await this.getActiveBoats();
    
    const calendarMap = new Map<string, { date: Date; bookings: Booking[]; boatsByCapacity: Map<number, { available: Boat[]; booked: Boat[] }> }>();
    
    // Group boats by capacity
    const boatsByCapacity = new Map<number, Boat[]>();
    for (const boat of activeBoats) {
      const boats = boatsByCapacity.get(boat.capacity) || [];
      boats.push(boat);
      boatsByCapacity.set(boat.capacity, boats);
    }
    
    for (let day = 1; day <= endDate.getDate(); day++) {
      const date = new Date(year, month - 1, day);
      const dateStr = date.toISOString().split('T')[0];
      const dayBookings = allBookings.filter(booking => {
        const bookingDate = new Date(booking.startTime);
        return bookingDate.getDate() === day && bookingDate.getMonth() === month - 1;
      });
      
      const capacityAvailability = new Map<number, { available: Boat[]; booked: Boat[] }>();
      
      for (const [capacity, boats] of Array.from(boatsByCapacity.entries())) {
        const available: Boat[] = [];
        const booked: Boat[] = [];
        
        for (const boat of boats) {
          const boatBookings = dayBookings.filter(b => b.boatId === boat.id);
          if (boatBookings.length > 0) {
            booked.push(boat);
          } else {
            available.push(boat);
          }
        }
        
        capacityAvailability.set(capacity, { available, booked });
      }
      
      calendarMap.set(dateStr, {
        date,
        bookings: dayBookings,
        boatsByCapacity: capacityAvailability
      });
    }
    
    return calendarMap;
  }
  
  // Email Template Management
  async getEmailTemplate(id: string): Promise<EmailTemplate | undefined> {
    return this.emailTemplates.get(id);
  }
  
  async getEmailTemplates(): Promise<EmailTemplate[]> {
    return Array.from(this.emailTemplates.values());
  }
  
  async getEmailTemplateByType(templateType: string): Promise<EmailTemplate | undefined> {
    return Array.from(this.emailTemplates.values())
      .find(t => t.templateType === templateType && t.active);
  }
  
  async createEmailTemplate(template: InsertEmailTemplate): Promise<EmailTemplate> {
    const emailTemplate: EmailTemplate = {
      id: randomUUID(),
      orgId: template.orgId || "org_demo",
      name: template.name,
      description: template.description || null,
      templateType: template.templateType,
      subject: template.subject,
      components: template.components || [],
      variables: template.variables || [],
      active: template.active !== undefined ? template.active : true,
      isDefault: template.isDefault || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.emailTemplates.set(emailTemplate.id, emailTemplate);
    return emailTemplate;
  }
  
  async updateEmailTemplate(id: string, updates: Partial<EmailTemplate>): Promise<EmailTemplate> {
    const template = this.emailTemplates.get(id);
    if (!template) throw new Error("Email template not found");
    const updated = { ...template, ...updates, updatedAt: new Date() };
    this.emailTemplates.set(id, updated);
    return updated;
  }
  
  async deleteEmailTemplate(id: string): Promise<boolean> {
    return this.emailTemplates.delete(id);
  }
  
  // Master Template Management
  async getMasterTemplate(id: string): Promise<MasterTemplate | undefined> {
    return this.masterTemplates.get(id);
  }
  
  async getMasterTemplates(): Promise<MasterTemplate[]> {
    return Array.from(this.masterTemplates.values());
  }
  
  async getDefaultMasterTemplate(): Promise<MasterTemplate | undefined> {
    return Array.from(this.masterTemplates.values())
      .find(t => t.isDefault && t.active);
  }
  
  async createMasterTemplate(template: InsertMasterTemplate): Promise<MasterTemplate> {
    const masterTemplate: MasterTemplate = {
      id: randomUUID(),
      orgId: template.orgId || "org_demo",
      name: template.name,
      description: template.description || null,
      components: template.components || [],
      styles: template.styles || {},
      active: template.active !== undefined ? template.active : true,
      isDefault: template.isDefault || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.masterTemplates.set(masterTemplate.id, masterTemplate);
    return masterTemplate;
  }
  
  async updateMasterTemplate(id: string, updates: Partial<MasterTemplate>): Promise<MasterTemplate> {
    const template = this.masterTemplates.get(id);
    if (!template) throw new Error("Master template not found");
    const updated = { ...template, ...updates, updatedAt: new Date() };
    this.masterTemplates.set(id, updated);
    return updated;
  }
  
  async deleteMasterTemplate(id: string): Promise<boolean> {
    return this.masterTemplates.delete(id);
  }

  // ===== ADMIN CALENDAR MANAGEMENT METHODS =====

  async getAdminCalendarSlots(startDate: Date, endDate: Date, boatId?: string): Promise<AdminCalendarSlot[]> {
    const boats = boatId ? [await this.boats.get(boatId)].filter(Boolean) : Array.from(this.boats.values());
    const bookings = await this.getBookings(startDate, endDate, boatId);
    const availabilitySlots = Array.from(this.availabilitySlots.values())
      .filter(slot => slot.startTime >= startDate && slot.startTime <= endDate)
      .filter(slot => !boatId || slot.boatId === boatId);

    const adminSlots: AdminCalendarSlot[] = [];

    for (const boat of boats) {
      if (!boat) continue;

      // Find all relevant slots for this boat
      const boatAvailabilitySlots = availabilitySlots.filter(slot => slot.boatId === boat.id);
      const boatBookings = bookings.filter(booking => booking.boatId === boat.id);

      // Create admin slots based on availability slots
      for (const slot of boatAvailabilitySlots) {
        const booking = boatBookings.find(b => 
          b.startTime.getTime() === slot.startTime.getTime() && 
          b.endTime.getTime() === slot.endTime.getTime()
        );

        const adminSlot: AdminCalendarSlot = {
          id: slot.id,
          boatId: boat.id,
          boatName: boat.name,
          startTime: slot.startTime,
          endTime: slot.endTime,
          status: booking ? 'booked' : (slot.status.toLowerCase() as any),
          capacity: boat.capacity,
          bookedCount: booking ? booking.groupSize : 0,
          availableSpots: boat.capacity - (booking ? booking.groupSize : 0),
          isRecurring: slot.isRecurring || false,
          blockReason: slot.blockReason || undefined,
          blockedBy: slot.blockedBy || undefined,
          blockedAt: slot.blockedAt || undefined,
          notes: slot.notes || undefined,
        };

        if (booking) {
          adminSlot.booking = {
            id: booking.id,
            type: booking.type as 'private' | 'disco',
            status: booking.status as any,
            contactName: booking.contactName || 'Unknown',
            contactEmail: booking.contactEmail || 'unknown@example.com',
            contactPhone: booking.contactPhone || undefined,
            groupSize: booking.groupSize,
            partyType: booking.partyType || undefined,
            paymentStatus: booking.paymentStatus as any || 'pending',
            amountPaid: booking.amountPaid || 0,
            totalAmount: booking.totalAmount || 0,
            specialRequests: booking.specialRequests || undefined,
            adminNotes: booking.adminNotes || undefined,
            lastModifiedBy: booking.lastModifiedBy || undefined,
            lastModifiedAt: booking.lastModifiedAt || undefined,
          };
        }

        adminSlots.push(adminSlot);
      }
    }

    return adminSlots.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  async blockTimeSlot(boatId: string, startTime: Date, endTime: Date, reason?: string, adminUser?: string): Promise<AvailabilitySlot> {
    // Check if there's an existing slot to update
    let slot = Array.from(this.availabilitySlots.values())
      .find(s => s.boatId === boatId && s.startTime.getTime() === startTime.getTime() && s.endTime.getTime() === endTime.getTime());

    if (slot) {
      // Update existing slot to blocked
      const updated: AvailabilitySlot = {
        ...slot,
        status: 'BLOCKED',
        blockReason: reason || null,
        blockedBy: adminUser || null,
        blockedAt: new Date(),
      };
      this.availabilitySlots.set(slot.id, updated);
      
      // Log admin action
      await this.logAdminAction('block_slot', { slotId: slot.id, boatId, startTime, endTime, reason }, adminUser);
      
      return updated;
    } else {
      // Create new blocked slot
      const newSlot: AvailabilitySlot = {
        id: randomUUID(),
        boatId,
        startTime,
        endTime,
        status: 'BLOCKED',
        projectId: null,
        bookingId: null,
        blockReason: reason || null,
        blockedBy: adminUser || null,
        blockedAt: new Date(),
        notes: null,
        isRecurring: false,
        recurringId: null,
        createdAt: new Date(),
      };
      
      this.availabilitySlots.set(newSlot.id, newSlot);
      
      // Log admin action
      await this.logAdminAction('create_blocked_slot', { slotId: newSlot.id, boatId, startTime, endTime, reason }, adminUser);
      
      return newSlot;
    }
  }

  async unblockTimeSlot(boatId: string, startTime: Date, endTime: Date): Promise<boolean> {
    const slot = Array.from(this.availabilitySlots.values())
      .find(s => s.boatId === boatId && s.startTime.getTime() === startTime.getTime() && s.endTime.getTime() === endTime.getTime());

    if (!slot) return false;

    if (slot.status === 'BLOCKED') {
      const updated: AvailabilitySlot = {
        ...slot,
        status: 'AVAILABLE',
        blockReason: null,
        blockedBy: null,
        blockedAt: null,
      };
      this.availabilitySlots.set(slot.id, updated);
      
      // Log admin action
      await this.logAdminAction('unblock_slot', { slotId: slot.id, boatId, startTime, endTime }, undefined);
      
      return true;
    }

    return false;
  }

  async batchBlockSlots(operation: BatchSlotOperation, adminUser?: string): Promise<AvailabilitySlot[]> {
    const updatedSlots: AvailabilitySlot[] = [];

    for (const slotId of operation.slotIds) {
      const slot = this.availabilitySlots.get(slotId);
      if (!slot) continue;

      let newStatus: string;
      switch (operation.action) {
        case 'block':
          newStatus = 'BLOCKED';
          break;
        case 'unblock':
          newStatus = 'AVAILABLE';
          break;
        case 'maintenance':
          newStatus = 'MAINTENANCE';
          break;
        default:
          continue;
      }

      const updated: AvailabilitySlot = {
        ...slot,
        status: newStatus,
        blockReason: operation.action === 'block' ? operation.reason || null : null,
        blockedBy: operation.action === 'block' ? adminUser || null : null,
        blockedAt: operation.action === 'block' ? new Date() : null,
        notes: operation.notes || slot.notes,
      };

      this.availabilitySlots.set(slotId, updated);
      updatedSlots.push(updated);
    }

    // Log batch admin action
    await this.logAdminAction('batch_slot_operation', { action: operation.action, slotCount: updatedSlots.length, reason: operation.reason }, adminUser);

    return updatedSlots;
  }

  async createBookingWithValidation(booking: InsertBooking, adminUser?: string): Promise<Booking> {
    // Enhanced validation for admin bookings
    const validation = await this.validateBookingRequest(booking);
    if (!validation.valid) {
      throw new Error(`Booking validation failed: ${validation.conflicts.join(', ')}`);
    }

    // Create the booking with admin tracking
    const newBooking = await this.createBooking(booking);
    
    // Update availability slot if it exists
    if (booking.boatId) {
      const slot = Array.from(this.availabilitySlots.values())
        .find(s => s.boatId === booking.boatId && 
                   s.startTime.getTime() === booking.startTime.getTime() && 
                   s.endTime.getTime() === booking.endTime.getTime());
      
      if (slot) {
        const updated: AvailabilitySlot = {
          ...slot,
          status: 'BOOKED',
          bookingId: newBooking.id,
          projectId: booking.projectId || null,
        };
        this.availabilitySlots.set(slot.id, updated);
      }
    }

    // Log booking history
    await this.logBookingAction(newBooking.id, 'created', { booking: newBooking }, adminUser);

    return newBooking;
  }

  async updateBookingWithValidation(id: string, updates: Partial<Booking>, adminUser?: string): Promise<Booking> {
    const existingBooking = await this.getBooking(id);
    if (!existingBooking) throw new Error('Booking not found');

    // Create a temporary booking object for validation
    const testBooking = { ...existingBooking, ...updates };
    
    // Validate if changes affect time or boat
    if (updates.startTime || updates.endTime || updates.boatId) {
      const validation = await this.validateBookingRequest({
        ...testBooking,
        startTime: testBooking.startTime,
        endTime: testBooking.endTime,
        type: testBooking.type as any,
        groupSize: testBooking.groupSize,
        paymentStatus: testBooking.paymentStatus as any,
        amountPaid: testBooking.amountPaid || 0,
        totalAmount: testBooking.totalAmount || 0,
      });
      
      if (!validation.valid) {
        throw new Error(`Booking update validation failed: ${validation.conflicts.join(', ')}`);
      }
    }

    // Update booking with admin tracking
    const updatedBooking = await this.updateBooking(id, {
      ...updates,
      lastModifiedBy: adminUser,
      lastModifiedAt: new Date(),
    });

    // Log booking history
    await this.logBookingAction(id, 'updated', { updates, adminUser }, adminUser);

    return updatedBooking;
  }

  async cancelBookingWithCleanup(id: string, reason?: string, adminUser?: string): Promise<Booking> {
    const booking = await this.getBooking(id);
    if (!booking) throw new Error('Booking not found');

    // Update booking status
    const canceledBooking = await this.updateBooking(id, {
      status: 'canceled',
      adminNotes: reason ? `Canceled: ${reason}` : 'Canceled by admin',
      lastModifiedBy: adminUser,
      lastModifiedAt: new Date(),
    });

    // Free up availability slot
    if (booking.boatId) {
      const slot = Array.from(this.availabilitySlots.values())
        .find(s => s.bookingId === id);
      
      if (slot) {
        const updated: AvailabilitySlot = {
          ...slot,
          status: 'AVAILABLE',
          bookingId: null,
          projectId: null,
        };
        this.availabilitySlots.set(slot.id, updated);
      }
    }

    // Log booking history
    await this.logBookingAction(id, 'canceled', { reason, adminUser }, adminUser);

    return canceledBooking;
  }

  async moveBookingToSlot(bookingId: string, newStartTime: Date, newEndTime: Date, newBoatId?: string): Promise<Booking> {
    const booking = await this.getBooking(bookingId);
    if (!booking) throw new Error('Booking not found');

    const updates: Partial<Booking> = {
      startTime: newStartTime,
      endTime: newEndTime,
    };

    if (newBoatId) {
      updates.boatId = newBoatId;
    }

    return this.updateBookingWithValidation(bookingId, updates);
  }

  async getComprehensiveBookings(startDate?: Date, endDate?: Date, filters?: AdminCalendarFilters): Promise<ComprehensiveAdminBooking[]> {
    let bookings = await this.getBookings(startDate, endDate);

    // Apply filters if provided
    if (filters) {
      if (filters.boatIds && filters.boatIds.length > 0) {
        bookings = bookings.filter(b => b.boatId && filters.boatIds!.includes(b.boatId));
      }

      if (filters.status && filters.status.length > 0) {
        // Map admin calendar statuses to booking statuses
        const statusMap: Record<string, string[]> = {
          available: [], // No bookings for available slots
          booked: ['booked', 'confirmed'],
          blocked: ['blocked'],
          maintenance: ['blocked'], // Maintenance is a type of block
        };
        
        const allowedStatuses = filters.status.flatMap(s => statusMap[s] || [s]);
        bookings = bookings.filter(b => allowedStatuses.includes(b.status));
      }

      if (filters.paymentStatus && filters.paymentStatus.length > 0) {
        bookings = bookings.filter(b => b.paymentStatus && filters.paymentStatus!.includes(b.paymentStatus as any));
      }

      if (filters.bookingType && filters.bookingType.length > 0) {
        bookings = bookings.filter(b => filters.bookingType!.includes(b.type as any));
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        bookings = bookings.filter(b => 
          b.contactName?.toLowerCase().includes(searchTerm) ||
          b.contactEmail?.toLowerCase().includes(searchTerm)
        );
      }
    }

    // Convert to comprehensive admin booking format
    const comprehensiveBookings: ComprehensiveAdminBooking[] = [];
    
    for (const booking of bookings) {
      const boat = booking.boatId ? this.boats.get(booking.boatId) : null;
      
      const comprehensive: ComprehensiveAdminBooking = {
        id: booking.id,
        cruiseDate: booking.startTime,
        contactName: booking.contactName || 'Unknown',
        contactEmail: booking.contactEmail || 'unknown@example.com',
        contactPhone: booking.contactPhone || undefined,
        partySize: booking.groupSize,
        partyType: booking.partyType || undefined,
        boatAssigned: booking.boatId || 'Unassigned',
        boatName: boat?.name || 'Unknown Boat',
        totalAmount: booking.totalAmount || 0,
        amountPaid: booking.amountPaid || 0,
        amountOwed: (booking.totalAmount || 0) - (booking.amountPaid || 0),
        paymentStatus: this.getPaymentStatusLabel(booking.paymentStatus, booking.amountPaid || 0, booking.totalAmount || 0),
        bookingStatus: booking.status,
        eventType: booking.partyType || 'Cruise',
        startTime: booking.startTime,
        endTime: booking.endTime,
        projectId: booking.projectId || undefined,
        quoteId: booking.quoteId || undefined,
        specialRequests: booking.specialRequests || undefined,
        adminNotes: booking.adminNotes || undefined,
        lastModifiedBy: booking.lastModifiedBy || undefined,
        lastModifiedAt: booking.lastModifiedAt || undefined,
        createdAt: booking.createdAt,
      };

      comprehensiveBookings.push(comprehensive);
    }

    return comprehensiveBookings.sort((a, b) => a.cruiseDate.getTime() - b.cruiseDate.getTime());
  }

  private getPaymentStatusLabel(paymentStatus?: string, amountPaid: number = 0, totalAmount: number = 0): 'Paid' | 'Partial' | 'Unpaid' {
    if (paymentStatus === 'fully_paid' || (totalAmount > 0 && amountPaid >= totalAmount)) {
      return 'Paid';
    } else if (paymentStatus === 'deposit_paid' || amountPaid > 0) {
      return 'Partial';
    } else {
      return 'Unpaid';
    }
  }

  async getAdminAvailabilityOverview(date: Date): Promise<{ boatId: string; boatName: string; slots: AdminCalendarSlot[] }[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const boats = await this.getActiveBoats();
    const overview: { boatId: string; boatName: string; slots: AdminCalendarSlot[] }[] = [];

    for (const boat of boats) {
      const slots = await this.getAdminCalendarSlots(startOfDay, endOfDay, boat.id);
      overview.push({
        boatId: boat.id,
        boatName: boat.name,
        slots,
      });
    }

    return overview.sort((a, b) => a.boatName.localeCompare(b.boatName));
  }

  async createRecurringAvailability(pattern: RecurringPattern): Promise<AvailabilitySlot[]> {
    const createdSlots: AvailabilitySlot[] = [];
    const recurringId = randomUUID();

    // Generate slots based on pattern
    let currentDate = new Date(pattern.startDate);
    const endDate = pattern.endDate || new Date(pattern.startDate.getFullYear() + 1, pattern.startDate.getMonth(), pattern.startDate.getDate());

    while (currentDate <= endDate) {
      // Check if this date matches the pattern
      const shouldCreateSlot = pattern.type === 'weekly' ? 
        (pattern.daysOfWeek?.includes(currentDate.getDay()) || false) :
        pattern.type === 'monthly' ? 
        (currentDate.getDate() === pattern.startDate.getDate()) :
        true; // custom pattern - create for all dates

      if (shouldCreateSlot && !pattern.excludeDates?.some(d => d.getTime() === currentDate.getTime())) {
        // Create slots for each time slot in the pattern
        for (const timeSlot of pattern.timeSlots) {
          for (const boatId of pattern.boatIds) {
            const [startHours, startMinutes] = timeSlot.startTime.split(':').map(Number);
            const [endHours, endMinutes] = timeSlot.endTime.split(':').map(Number);

            const startTime = new Date(currentDate);
            startTime.setHours(startHours, startMinutes, 0, 0);
            
            const endTime = new Date(currentDate);
            endTime.setHours(endHours, endMinutes, 0, 0);

            // Check if slot already exists
            const existingSlot = Array.from(this.availabilitySlots.values())
              .find(s => s.boatId === boatId && 
                         s.startTime.getTime() === startTime.getTime() && 
                         s.endTime.getTime() === endTime.getTime());

            if (!existingSlot) {
              const slot: AvailabilitySlot = {
                id: randomUUID(),
                boatId,
                startTime,
                endTime,
                status: 'AVAILABLE',
                projectId: null,
                bookingId: null,
                blockReason: null,
                blockedBy: null,
                blockedAt: null,
                notes: null,
                isRecurring: true,
                recurringId,
                createdAt: new Date(),
              };

              this.availabilitySlots.set(slot.id, slot);
              createdSlots.push(slot);
            }
          }
        }
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Log admin action
    await this.logAdminAction('create_recurring_availability', { pattern, createdCount: createdSlots.length, recurringId }, undefined);

    return createdSlots;
  }

  async updateRecurringAvailability(recurringId: string, pattern: Partial<RecurringPattern>): Promise<AvailabilitySlot[]> {
    // For now, we'll implement this as delete + recreate
    await this.deleteRecurringAvailability(recurringId);
    
    if (pattern.startDate) {
      return this.createRecurringAvailability(pattern as RecurringPattern);
    }

    return [];
  }

  async deleteRecurringAvailability(recurringId: string): Promise<boolean> {
    const slotsToDelete = Array.from(this.availabilitySlots.values())
      .filter(s => s.recurringId === recurringId);

    for (const slot of slotsToDelete) {
      // Only delete if not booked
      if (slot.status !== 'BOOKED') {
        this.availabilitySlots.delete(slot.id);
      }
    }

    // Log admin action
    await this.logAdminAction('delete_recurring_availability', { recurringId, deletedCount: slotsToDelete.length }, undefined);

    return true;
  }

  async validateBookingRequest(booking: InsertBooking): Promise<{ valid: boolean; conflicts: string[]; warnings: string[] }> {
    const conflicts: string[] = [];
    const warnings: string[] = [];

    // Check boat capacity
    if (booking.boatId) {
      const boat = this.boats.get(booking.boatId);
      if (boat) {
        if (booking.groupSize > boat.maxCapacity) {
          conflicts.push(`Group size ${booking.groupSize} exceeds boat maximum capacity of ${boat.maxCapacity}`);
        }
        if (booking.groupSize > boat.capacity) {
          warnings.push(`Group size ${booking.groupSize} exceeds standard capacity of ${boat.capacity}. Extra crew may be required.`);
        }
      }
    }

    // Check for booking conflicts
    if (booking.boatId) {
      const hasConflict = await this.checkBookingConflict(
        booking.boatId,
        booking.startTime,
        booking.endTime
      );
      
      if (hasConflict) {
        conflicts.push('Time slot conflicts with existing booking');
      }
    }

    // Check if slot is blocked
    const slot = Array.from(this.availabilitySlots.values())
      .find(s => s.boatId === booking.boatId && 
                 s.startTime.getTime() === booking.startTime.getTime() && 
                 s.endTime.getTime() === booking.endTime.getTime());

    if (slot && (slot.status === 'BLOCKED' || slot.status === 'MAINTENANCE')) {
      conflicts.push(`Time slot is ${slot.status.toLowerCase()}: ${slot.blockReason || 'No reason provided'}`);
    }

    return {
      valid: conflicts.length === 0,
      conflicts,
      warnings,
    };
  }

  async getBookingConflicts(boatId: string, startTime: Date, endTime: Date, excludeBookingId?: string): Promise<Booking[]> {
    const bookings = Array.from(this.bookings.values());
    
    return bookings.filter(booking => {
      // Skip if this is the booking we're updating
      if (excludeBookingId && booking.id === excludeBookingId) return false;
      
      // Skip if different boat or canceled
      if (booking.boatId !== boatId || booking.status === "canceled") return false;
      
      // Check for time overlap using proper interval overlap logic
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      
      // Two time intervals [startTime, endTime) and [bookingStart, bookingEnd) overlap if:
      // startTime < bookingEnd AND endTime > bookingStart
      // This handles all overlap cases including partial overlaps, containment, and exact matches
      return startTime < bookingEnd && endTime > bookingStart;
    });
  }

  async getBookingHistory(bookingId: string): Promise<Array<{ action: string; timestamp: Date; adminUser?: string; details: any }>> {
    return this.bookingHistory.get(bookingId) || [];
  }

  async logAdminAction(action: string, details: any, adminUser?: string): Promise<void> {
    const logEntry = {
      id: randomUUID(),
      action,
      timestamp: new Date(),
      adminUser,
      details,
    };
    
    this.adminLogs.push(logEntry);
    
    // Keep only last 1000 log entries to prevent memory issues
    if (this.adminLogs.length > 1000) {
      this.adminLogs = this.adminLogs.slice(-1000);
    }
  }

  private async logBookingAction(bookingId: string, action: string, details: any, adminUser?: string): Promise<void> {
    const history = this.bookingHistory.get(bookingId) || [];
    history.push({
      action,
      timestamp: new Date(),
      adminUser,
      details,
    });
    
    // Keep only last 50 history entries per booking
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }
    
    this.bookingHistory.set(bookingId, history);
  }

  async getBookingsInRange(startDate: Date, endDate: Date): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => {
      const bookingDate = new Date(booking.startTime);
      return bookingDate >= startDate && bookingDate <= endDate;
    });
  }

  async getDiscoSlotsInRange(startDate: Date, endDate: Date): Promise<DiscoSlot[]> {
    return Array.from(this.discoSlots.values()).filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate >= startDate && slotDate <= endDate;
    });
  }

  // ==========================================
  // CUSTOMER PORTAL - SMS AUTHENTICATION
  // ==========================================

  async createSmsAuthToken(token: InsertSmsAuthToken): Promise<SmsAuthToken> {
    const id = randomUUID();
    const now = new Date();
    
    const newToken: SmsAuthToken = {
      id,
      phoneNumber: token.phoneNumber,
      code: token.code,
      token: token.token,
      purpose: token.purpose || 'login',
      attempts: token.attempts || 0,
      maxAttempts: token.maxAttempts || 3,
      used: false,
      expiresAt: token.expiresAt,
      createdAt: now,
      usedAt: null,
      ipAddress: token.ipAddress,
      userAgent: token.userAgent,
    };

    this.smsAuthTokens.set(id, newToken);
    
    // Clean up old tokens for this phone number (keep only the latest)
    const phoneTokens = Array.from(this.smsAuthTokens.values())
      .filter(t => t.phoneNumber === token.phoneNumber && t.id !== id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    // Remove all but the most recent 2 tokens for this phone
    phoneTokens.slice(2).forEach(t => this.smsAuthTokens.delete(t.id));
    
    return newToken;
  }

  async getSmsAuthToken(phoneNumber: string, code: string): Promise<SmsAuthToken | undefined> {
    const now = new Date();
    
    return Array.from(this.smsAuthTokens.values()).find(token => 
      token.phoneNumber === phoneNumber && 
      token.code === code && 
      !token.used && 
      token.expiresAt > now &&
      token.attempts < token.maxAttempts
    );
  }

  async getSmsAuthTokenByToken(token: string): Promise<SmsAuthToken | undefined> {
    const now = new Date();
    
    return Array.from(this.smsAuthTokens.values()).find(authToken => 
      authToken.token === token && 
      !authToken.used && 
      authToken.expiresAt > now &&
      authToken.attempts < authToken.maxAttempts
    );
  }

  async markTokenAsUsed(tokenId: string): Promise<SmsAuthToken> {
    const token = this.smsAuthTokens.get(tokenId);
    if (!token) {
      throw new Error('Token not found');
    }

    const updatedToken = {
      ...token,
      used: true,
      usedAt: new Date(),
    };

    this.smsAuthTokens.set(tokenId, updatedToken);
    return updatedToken;
  }

  async incrementTokenAttempts(tokenId: string): Promise<SmsAuthToken> {
    const token = this.smsAuthTokens.get(tokenId);
    if (!token) {
      throw new Error('Token not found');
    }

    const updatedToken = {
      ...token,
      attempts: token.attempts + 1,
    };

    this.smsAuthTokens.set(tokenId, updatedToken);
    return updatedToken;
  }

  async cleanupExpiredTokens(): Promise<number> {
    const now = new Date();
    const expiredTokens = Array.from(this.smsAuthTokens.entries())
      .filter(([_, token]) => token.expiresAt <= now || token.used);

    expiredTokens.forEach(([id, _]) => this.smsAuthTokens.delete(id));
    
    return expiredTokens.length;
  }

  // ==========================================
  // CUSTOMER PORTAL - SESSION MANAGEMENT
  // ==========================================

  async createCustomerSession(session: InsertCustomerSession): Promise<CustomerSession> {
    const id = randomUUID();
    const now = new Date();
    
    const newSession: CustomerSession = {
      id,
      sessionId: session.sessionId,
      contactId: session.contactId,
      phoneNumber: session.phoneNumber,
      isAuthenticated: session.isAuthenticated !== undefined ? session.isAuthenticated : true,
      loginTime: session.loginTime ? new Date(session.loginTime) : now,
      lastActivity: session.lastActivity ? new Date(session.lastActivity) : now,
      expiresAt: new Date(session.expiresAt),
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      deviceInfo: session.deviceInfo || {},
      loggedOut: false,
      loggedOutAt: null,
      createdAt: now,
    };

    this.customerSessions.set(id, newSession);
    
    // Clean up any existing sessions for this contact (only allow one active session per customer)
    const existingSessions = Array.from(this.customerSessions.entries())
      .filter(([sessionId, s]) => s.contactId === session.contactId && sessionId !== id && !s.loggedOut);
    
    existingSessions.forEach(([sessionId, s]) => {
      this.customerSessions.set(sessionId, { ...s, loggedOut: true, loggedOutAt: now });
    });
    
    return newSession;
  }

  async getCustomerSession(sessionId: string): Promise<CustomerSession | undefined> {
    const now = new Date();
    
    return Array.from(this.customerSessions.values()).find(session => 
      session.sessionId === sessionId && 
      !session.loggedOut && 
      session.expiresAt > now
    );
  }

  async getCustomerSessionByContact(contactId: string): Promise<CustomerSession | undefined> {
    const now = new Date();
    
    return Array.from(this.customerSessions.values()).find(session => 
      session.contactId === contactId && 
      !session.loggedOut && 
      session.expiresAt > now
    );
  }

  async updateCustomerSessionActivity(sessionId: string): Promise<CustomerSession> {
    const session = Array.from(this.customerSessions.values())
      .find(s => s.sessionId === sessionId);
    
    if (!session) {
      throw new Error('Session not found');
    }

    const now = new Date();
    const updatedSession = {
      ...session,
      lastActivity: now,
      expiresAt: new Date(now.getTime() + 2 * 60 * 60 * 1000), // Extend by 2 hours
    };

    this.customerSessions.set(session.id, updatedSession);
    return updatedSession;
  }

  async endCustomerSession(sessionId: string): Promise<CustomerSession> {
    const session = Array.from(this.customerSessions.values())
      .find(s => s.sessionId === sessionId);
    
    if (!session) {
      throw new Error('Session not found');
    }

    const now = new Date();
    const updatedSession = {
      ...session,
      loggedOut: true,
      loggedOutAt: now,
    };

    this.customerSessions.set(session.id, updatedSession);
    return updatedSession;
  }

  async cleanupExpiredSessions(): Promise<number> {
    const now = new Date();
    const expiredSessions = Array.from(this.customerSessions.entries())
      .filter(([_, session]) => session.expiresAt <= now && !session.loggedOut);

    expiredSessions.forEach(([id, session]) => {
      this.customerSessions.set(id, { ...session, loggedOut: true, loggedOutAt: now });
    });
    
    return expiredSessions.length;
  }

  // ==========================================
  // CUSTOMER PORTAL - ACTIVITY LOGGING
  // ==========================================

  async logPortalActivity(activity: InsertPortalActivityLog): Promise<PortalActivityLog> {
    const id = randomUUID();
    const now = new Date();
    
    const newActivity: PortalActivityLog = {
      id,
      sessionId: activity.sessionId,
      contactId: activity.contactId,
      phoneNumber: activity.phoneNumber,
      action: activity.action,
      resource: activity.resource,
      resourceId: activity.resourceId,
      details: activity.details || {},
      success: activity.success !== undefined ? activity.success : true,
      errorMessage: activity.errorMessage,
      ipAddress: activity.ipAddress,
      userAgent: activity.userAgent,
      duration: activity.duration,
      createdAt: now,
    };

    this.portalActivityLogs.set(id, newActivity);
    
    // Keep only the last 1000 activity logs to prevent memory issues
    const allLogs = Array.from(this.portalActivityLogs.entries())
      .sort(([_, a], [__, b]) => b.createdAt.getTime() - a.createdAt.getTime());
    
    if (allLogs.length > 1000) {
      const toDelete = allLogs.slice(1000);
      toDelete.forEach(([logId, _]) => this.portalActivityLogs.delete(logId));
    }
    
    return newActivity;
  }

  async getCustomerActivityLog(contactId: string, limit: number = 50): Promise<PortalActivityLog[]> {
    const customerLogs = Array.from(this.portalActivityLogs.values())
      .filter(log => log.contactId === contactId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    
    return customerLogs;
  }

  // ==========================================
  // CUSTOMER PORTAL - RATE LIMITING
  // ==========================================

  async checkPhoneRateLimit(phoneNumber: string): Promise<{ allowed: boolean; resetIn?: number; requestCount: number }> {
    const now = new Date();
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    let rateLimit = this.phoneRateLimits.get(phoneNumber);
    
    // Create new rate limit entry if doesn't exist
    if (!rateLimit) {
      rateLimit = {
        id: randomUUID(),
        phoneNumber,
        requestCount: 0,
        windowStart: now,
        lastRequest: now,
        blocked: false,
        blockedUntil: null,
        resetAt: new Date(now.getTime() + 60 * 60 * 1000), // 1 hour window
      };
      this.phoneRateLimits.set(phoneNumber, rateLimit);
    }
    
    // Check if currently blocked
    if (rateLimit.blocked && rateLimit.blockedUntil && now < rateLimit.blockedUntil) {
      return {
        allowed: false,
        resetIn: Math.ceil((rateLimit.blockedUntil.getTime() - now.getTime()) / 1000),
        requestCount: rateLimit.requestCount,
      };
    }
    
    // Reset window if it's been more than an hour
    if (now >= rateLimit.resetAt) {
      rateLimit.requestCount = 0;
      rateLimit.windowStart = now;
      rateLimit.resetAt = new Date(now.getTime() + 60 * 60 * 1000);
      rateLimit.blocked = false;
      rateLimit.blockedUntil = null;
    }
    
    // Check if exceeded limit (3 per hour)
    if (rateLimit.requestCount >= 3) {
      rateLimit.blocked = true;
      rateLimit.blockedUntil = rateLimit.resetAt;
      this.phoneRateLimits.set(phoneNumber, rateLimit);
      
      return {
        allowed: false,
        resetIn: Math.ceil((rateLimit.resetAt.getTime() - now.getTime()) / 1000),
        requestCount: rateLimit.requestCount,
      };
    }
    
    return {
      allowed: true,
      requestCount: rateLimit.requestCount,
    };
  }

  async updatePhoneRateLimit(phoneNumber: string): Promise<PhoneRateLimit> {
    const now = new Date();
    let rateLimit = this.phoneRateLimits.get(phoneNumber);
    
    if (!rateLimit) {
      rateLimit = {
        id: randomUUID(),
        phoneNumber,
        requestCount: 1,
        windowStart: now,
        lastRequest: now,
        blocked: false,
        blockedUntil: null,
        resetAt: new Date(now.getTime() + 60 * 60 * 1000),
      };
    } else {
      rateLimit = {
        ...rateLimit,
        requestCount: rateLimit.requestCount + 1,
        lastRequest: now,
      };
    }
    
    this.phoneRateLimits.set(phoneNumber, rateLimit);
    return rateLimit;
  }

  async resetPhoneRateLimit(phoneNumber: string): Promise<boolean> {
    const rateLimit = this.phoneRateLimits.get(phoneNumber);
    if (!rateLimit) return false;
    
    const now = new Date();
    const resetLimit = {
      ...rateLimit,
      requestCount: 0,
      windowStart: now,
      resetAt: new Date(now.getTime() + 60 * 60 * 1000),
      blocked: false,
      blockedUntil: null,
    };
    
    this.phoneRateLimits.set(phoneNumber, resetLimit);
    return true;
  }

  // ==========================================
  // CUSTOMER PORTAL - VERIFICATION ATTEMPT TRACKING (SECURITY)
  // ==========================================

  async trackVerificationAttempt(phoneNumber: string, sessionId: string, ipAddress?: string, userAgent?: string): Promise<CustomerVerificationAttempts> {
    const now = new Date();
    const key = `${phoneNumber}:${sessionId}`;
    
    let attempts = this.customerVerificationAttempts.get(key);
    
    if (!attempts) {
      attempts = {
        id: randomUUID(),
        phoneNumber,
        sessionId,
        attemptCount: 1,
        lastAttempt: now,
        lockedUntil: null,
        lockoutCount: 0,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        createdAt: now,
        updatedAt: now,
      };
    } else {
      const newAttemptCount = attempts.attemptCount + 1;
      let lockedUntil = attempts.lockedUntil;
      let lockoutCount = attempts.lockoutCount;
      
      // Implement escalating lockout logic
      if (newAttemptCount >= 6) {
        lockoutCount = attempts.lockoutCount + 1;
        
        // Escalating lockout periods
        if (lockoutCount === 1) {
          lockedUntil = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes
        } else if (lockoutCount === 2) {
          lockedUntil = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes
        } else {
          lockedUntil = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
        }
      } else if (newAttemptCount >= 4) {
        // Add 30-second delay for attempts 4-5
        lockedUntil = new Date(now.getTime() + 30 * 1000); // 30 seconds
      }
      
      attempts = {
        ...attempts,
        attemptCount: newAttemptCount,
        lastAttempt: now,
        lockedUntil,
        lockoutCount,
        updatedAt: now,
      };
    }
    
    this.customerVerificationAttempts.set(key, attempts);
    
    // Cleanup old attempts periodically
    if (Math.random() < 0.1) { // 10% chance to cleanup
      await this.cleanupExpiredVerificationAttempts();
    }
    
    return attempts;
  }

  async isVerificationLocked(phoneNumber: string, sessionId: string): Promise<{ locked: boolean; lockedUntil?: Date; attemptCount: number }> {
    const now = new Date();
    const key = `${phoneNumber}:${sessionId}`;
    const attempts = this.customerVerificationAttempts.get(key);
    
    if (!attempts) {
      return { locked: false, attemptCount: 0 };
    }
    
    // Check if locked and lockout period hasn't expired
    if (attempts.lockedUntil && now < attempts.lockedUntil) {
      return { 
        locked: true, 
        lockedUntil: attempts.lockedUntil, 
        attemptCount: attempts.attemptCount 
      };
    }
    
    return { 
      locked: false, 
      attemptCount: attempts.attemptCount 
    };
  }

  async getVerificationAttempts(phoneNumber: string, sessionId: string): Promise<CustomerVerificationAttempts | undefined> {
    const key = `${phoneNumber}:${sessionId}`;
    return this.customerVerificationAttempts.get(key);
  }

  async resetVerificationAttempts(phoneNumber: string, sessionId: string): Promise<boolean> {
    const key = `${phoneNumber}:${sessionId}`;
    const deleted = this.customerVerificationAttempts.delete(key);
    return deleted;
  }

  async cleanupExpiredVerificationAttempts(): Promise<number> {
    const now = new Date();
    const expiredCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours old
    let deletedCount = 0;
    
    for (const [key, attempts] of this.customerVerificationAttempts.entries()) {
      // Delete if expired lockout and old, or if very old
      const shouldDelete = (
        (attempts.lockedUntil && now > attempts.lockedUntil && attempts.lastAttempt < expiredCutoff) ||
        (attempts.lastAttempt < expiredCutoff)
      );
      
      if (shouldDelete) {
        this.customerVerificationAttempts.delete(key);
        deletedCount++;
      }
    }
    
    return deletedCount;
  }

  // ==========================================
  // CUSTOMER PORTAL - CUSTOMER LOOKUP
  // ==========================================

  async searchCustomersByPhone(phoneNumber: string): Promise<Contact[]> {
    // Normalize phone number for search
    const normalized = phoneNumber.replace(/\D/g, '');
    
    return Array.from(this.contacts.values()).filter(contact => {
      if (!contact.phone) return false;
      const contactPhone = contact.phone.replace(/\D/g, '');
      return contactPhone.includes(normalized) || normalized.includes(contactPhone);
    });
  }

  async searchCustomersByName(query: string): Promise<Contact[]> {
    const searchTerm = query.toLowerCase().trim();
    
    return Array.from(this.contacts.values()).filter(contact => {
      const name = contact.name.toLowerCase();
      return name.includes(searchTerm) || 
             name.split(' ').some(part => part.startsWith(searchTerm));
    });
  }

  async searchCustomersByEmail(email: string): Promise<Contact[]> {
    const searchTerm = email.toLowerCase().trim();
    
    return Array.from(this.contacts.values()).filter(contact => 
      contact.email.toLowerCase().includes(searchTerm)
    );
  }

  // ==========================================
  // PARTIAL LEAD MANAGEMENT - ABANDONED LEAD CAPTURE
  // ==========================================

  async createPartialLead(data: InsertPartialLead): Promise<PartialLead> {
    const id = randomUUID();
    const now = new Date();
    
    const partialLead: PartialLead = {
      id,
      sessionId: data.sessionId,
      name: data.name || null,
      email: data.email || null,
      phone: data.phone || null,
      eventType: data.eventType || null,
      eventTypeLabel: data.eventTypeLabel || null,
      groupSize: data.groupSize || null,
      preferredDate: data.preferredDate || null,
      chatbotData: data.chatbotData || {},
      quoteId: null,
      status: data.status || 'partial',
      source: data.source || 'chat',
      createdAt: now,
      lastUpdated: now,
      abandonedAt: null,
      convertedToContactId: null,
      followUpCount: 0,
      lastContactedAt: null,
      contactMethod: null,
      adminNotes: null,
    };

    this.partialLeads.set(data.sessionId, partialLead);
    this.partialLeadsById.set(id, partialLead);
    
    return partialLead;
  }

  async updatePartialLead(sessionId: string, updates: Partial<PartialLead>): Promise<PartialLead> {
    const existing = this.partialLeads.get(sessionId);
    if (!existing) {
      throw new Error(`Partial lead not found for session: ${sessionId}`);
    }

    const updated: PartialLead = {
      ...existing,
      ...updates,
      lastUpdated: new Date(),
    };

    this.partialLeads.set(sessionId, updated);
    this.partialLeadsById.set(updated.id, updated);
    
    return updated;
  }

  async getPartialLead(sessionId: string): Promise<PartialLead | undefined> {
    return this.partialLeads.get(sessionId);
  }

  async getPartialLeadById(id: string): Promise<PartialLead | undefined> {
    return this.partialLeadsById.get(id);
  }

  async getPartialLeads(filters?: PartialLeadFilters): Promise<PartialLead[]> {
    let leads = Array.from(this.partialLeads.values());

    if (filters) {
      if (filters.status) {
        leads = leads.filter(lead => lead.status === filters.status);
      }
      
      if (filters.dateFrom) {
        leads = leads.filter(lead => lead.createdAt >= filters.dateFrom!);
      }
      
      if (filters.dateTo) {
        leads = leads.filter(lead => lead.createdAt <= filters.dateTo!);
      }
      
      if (filters.hasEmail) {
        leads = leads.filter(lead => !!lead.email);
      }
      
      if (filters.hasPhone) {
        leads = leads.filter(lead => !!lead.phone);
      }
      
      if (filters.eventType) {
        leads = leads.filter(lead => lead.eventType === filters.eventType);
      }
    }

    // Sort by most recent first
    leads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return leads;
  }

  async convertPartialLeadToContact(partialLeadId: string): Promise<Contact> {
    const partialLead = this.partialLeadsById.get(partialLeadId);
    if (!partialLead) {
      throw new Error(`Partial lead not found: ${partialLeadId}`);
    }

    if (!partialLead.email && !partialLead.phone) {
      throw new Error('Cannot convert partial lead without email or phone');
    }

    // Create contact from partial lead data
    const contact = await this.createContact({
      name: partialLead.name || 'Unknown',
      email: partialLead.email || '',
      phone: partialLead.phone || '',
      tags: ['converted_from_partial_lead'],
    });

    // Update partial lead to mark as converted
    await this.updatePartialLead(partialLead.sessionId, {
      status: 'converted',
      convertedToContactId: contact.id,
    });

    return contact;
  }

  async markPartialLeadAsContacted(partialLeadId: string, method: string): Promise<PartialLead> {
    const partialLead = this.partialLeadsById.get(partialLeadId);
    if (!partialLead) {
      throw new Error(`Partial lead not found: ${partialLeadId}`);
    }

    const updated = await this.updatePartialLead(partialLead.sessionId, {
      status: 'contacted',
      lastContactedAt: new Date(),
      contactMethod: method,
      followUpCount: (partialLead.followUpCount || 0) + 1,
    });

    return updated;
  }

  async markPartialLeadAsAbandoned(sessionId: string): Promise<PartialLead | undefined> {
    const partialLead = this.partialLeads.get(sessionId);
    if (!partialLead) {
      return undefined;
    }

    const updated = await this.updatePartialLead(sessionId, {
      status: 'abandoned',
      abandonedAt: new Date(),
    });

    return updated;
  }

  async getPartialLeadStats(): Promise<{ total: number; today: number; thisWeek: number; thisMonth: number }> {
    const leads = Array.from(this.partialLeads.values());
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: leads.length,
      today: leads.filter(lead => lead.createdAt >= today).length,
      thisWeek: leads.filter(lead => lead.createdAt >= thisWeek).length,
      thisMonth: leads.filter(lead => lead.createdAt >= thisMonth).length,
    };
  }

  async cleanupOldPartialLeads(daysOld: number): Promise<number> {
    const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
    let deletedCount = 0;

    for (const [sessionId, lead] of this.partialLeads.entries()) {
      if (lead.createdAt < cutoffDate && lead.status === 'partial') {
        this.partialLeads.delete(sessionId);
        this.partialLeadsById.delete(lead.id);
        deletedCount++;
      }
    }

    return deletedCount;
  }

  async getCustomerDataById(contactId: string): Promise<{
    contact: Contact;
    projects: Project[];
    quotes: Quote[];
    invoices: Invoice[];
    bookings: Booking[];
  } | undefined> {
    const contact = this.contacts.get(contactId);
    if (!contact) return undefined;
    
    const projects = Array.from(this.projects.values())
      .filter(p => p.contactId === contactId);
    
    const projectIds = projects.map(p => p.id);
    
    const quotes = Array.from(this.quotes.values())
      .filter(q => projectIds.includes(q.projectId));
    
    const invoices = Array.from(this.invoices.values())
      .filter(i => projectIds.includes(i.projectId));
    
    const bookings = Array.from(this.bookings.values())
      .filter(b => b.projectId && projectIds.includes(b.projectId));
    
    return {
      contact,
      projects,
      quotes,
      invoices,
      bookings,
    };
  }

  async getCustomerQuotesWithAccess(contactId: string): Promise<Quote[]> {
    const projects = Array.from(this.projects.values())
      .filter(p => p.contactId === contactId);
    
    const projectIds = projects.map(p => p.id);
    
    return Array.from(this.quotes.values())
      .filter(q => projectIds.includes(q.projectId))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCustomerInvoices(contactId: string): Promise<Invoice[]> {
    const projects = Array.from(this.projects.values())
      .filter(p => p.contactId === contactId);
    
    const projectIds = projects.map(p => p.id);
    
    return Array.from(this.invoices.values())
      .filter(i => projectIds.includes(i.projectId))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCustomerBookings(contactId: string): Promise<Booking[]> {
    const projects = Array.from(this.projects.values())
      .filter(p => p.contactId === contactId);
    
    const projectIds = projects.map(p => p.id);
    
    return Array.from(this.bookings.values())
      .filter(b => b.projectId && projectIds.includes(b.projectId))
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }

  async updateCustomerProfile(contactId: string, updates: Partial<Contact>): Promise<Contact> {
    const contact = this.contacts.get(contactId);
    if (!contact) {
      throw new Error('Contact not found');
    }

    const updatedContact = {
      ...contact,
      ...updates,
      id: contactId, // Ensure ID doesn't change
    };

    this.contacts.set(contactId, updatedContact);
    return updatedContact;
  }

  // ===== ENHANCED CUSTOMER TRACKING METHODS =====

  // Quote Analytics Methods
  async createQuoteAnalytics(analytics: InsertQuoteAnalytics): Promise<QuoteAnalytics> {
    const id = randomUUID();
    const newAnalytics: QuoteAnalytics = {
      ...analytics,
      id,
      contactId: analytics.contactId || null,
      sessionId: analytics.sessionId || null,
      viewDuration: analytics.viewDuration || null,
      ipAddress: analytics.ipAddress || null,
      userAgent: analytics.userAgent || null,
      referrer: analytics.referrer || null,
      deviceInfo: analytics.deviceInfo || {},
      metadata: analytics.metadata || {},
      createdAt: new Date(),
    };
    this.quoteAnalytics.set(id, newAnalytics);
    return newAnalytics;
  }

  async getQuoteAnalytics(quoteId: string): Promise<QuoteAnalytics[]> {
    return Array.from(this.quoteAnalytics.values())
      .filter(qa => qa.quoteId === quoteId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getQuoteAnalyticsByContact(contactId: string): Promise<QuoteAnalytics[]> {
    return Array.from(this.quoteAnalytics.values())
      .filter(qa => qa.contactId === contactId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async trackQuoteView(quoteId: string, contactId?: string, sessionId?: string, metadata?: Record<string, any>): Promise<QuoteAnalytics> {
    return this.createQuoteAnalytics({
      quoteId,
      contactId,
      sessionId,
      action: 'view',
      metadata: metadata || {},
    });
  }

  async getQuoteViewStats(quoteId: string): Promise<{ views: number; uniqueViews: number; totalDuration: number; lastViewed?: Date }> {
    const analytics = await this.getQuoteAnalytics(quoteId);
    const views = analytics.filter(qa => qa.action === 'view');
    const uniqueViews = new Set(views.map(v => v.contactId || v.sessionId || v.ipAddress).filter(Boolean)).size;
    const totalDuration = views.reduce((total, view) => total + (view.viewDuration || 0), 0);
    const lastViewed = views.length > 0 ? views[0].createdAt : undefined;

    return {
      views: views.length,
      uniqueViews,
      totalDuration,
      lastViewed,
    };
  }

  // File Send Tracking Methods
  async createFileSend(fileSend: InsertFileSend): Promise<FileSend> {
    const id = randomUUID();
    const newFileSend: FileSend = {
      ...fileSend,
      id,
      projectId: fileSend.projectId || null,
      quoteId: fileSend.quoteId || null,
      fileUrl: fileSend.fileUrl || null,
      fileSize: fileSend.fileSize || null,
      emailId: fileSend.emailId || null,
      sentBy: fileSend.sentBy || null,
      delivered: fileSend.delivered || false,
      deliveredAt: fileSend.deliveredAt || null,
      accessed: fileSend.accessed || false,
      accessedAt: fileSend.accessedAt || null,
      downloadCount: fileSend.downloadCount || 0,
      lastAccessedAt: fileSend.lastAccessedAt || null,
      expiresAt: fileSend.expiresAt || null,
      metadata: fileSend.metadata || {},
      createdAt: new Date(),
    };
    this.fileSends.set(id, newFileSend);
    return newFileSend;
  }

  async getFileSends(contactId: string): Promise<FileSend[]> {
    return Array.from(this.fileSends.values())
      .filter(fs => fs.contactId === contactId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getFileSendsByProject(projectId: string): Promise<FileSend[]> {
    return Array.from(this.fileSends.values())
      .filter(fs => fs.projectId === projectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async trackFileAccess(fileSendId: string): Promise<FileSend> {
    const fileSend = this.fileSends.get(fileSendId);
    if (!fileSend) {
      throw new Error('File send not found');
    }

    const updated: FileSend = {
      ...fileSend,
      accessed: true,
      accessedAt: new Date(),
      downloadCount: fileSend.downloadCount + 1,
      lastAccessedAt: new Date(),
    };

    this.fileSends.set(fileSendId, updated);
    return updated;
  }

  async updateFileSendStatus(fileSendId: string, status: 'delivered' | 'accessed'): Promise<FileSend> {
    const fileSend = this.fileSends.get(fileSendId);
    if (!fileSend) {
      throw new Error('File send not found');
    }

    const now = new Date();
    const updated: FileSend = {
      ...fileSend,
      delivered: status === 'delivered' ? true : fileSend.delivered,
      deliveredAt: status === 'delivered' ? now : fileSend.deliveredAt,
      accessed: status === 'accessed' ? true : fileSend.accessed,
      accessedAt: status === 'accessed' ? now : fileSend.accessedAt,
    };

    this.fileSends.set(fileSendId, updated);
    return updated;
  }

  // Email Tracking Methods
  async createEmailTracking(emailTracking: InsertEmailTracking): Promise<EmailTracking> {
    const id = randomUUID();
    const newEmailTracking: EmailTracking = {
      ...emailTracking,
      id,
      projectId: emailTracking.projectId || null,
      quoteId: emailTracking.quoteId || null,
      emailProvider: emailTracking.emailProvider || 'sendgrid',
      providerMessageId: emailTracking.providerMessageId || null,
      sentAt: emailTracking.sentAt || new Date(),
      delivered: emailTracking.delivered || false,
      deliveredAt: emailTracking.deliveredAt || null,
      opened: emailTracking.opened || false,
      firstOpenedAt: emailTracking.firstOpenedAt || null,
      openCount: emailTracking.openCount || 0,
      lastOpenedAt: emailTracking.lastOpenedAt || null,
      clicked: emailTracking.clicked || false,
      firstClickedAt: emailTracking.firstClickedAt || null,
      clickCount: emailTracking.clickCount || 0,
      lastClickedAt: emailTracking.lastClickedAt || null,
      bounced: emailTracking.bounced || false,
      bouncedAt: emailTracking.bouncedAt || null,
      bounceReason: emailTracking.bounceReason || null,
      unsubscribed: emailTracking.unsubscribed || false,
      unsubscribedAt: emailTracking.unsubscribedAt || null,
      metadata: emailTracking.metadata || {},
    };
    this.emailTracking.set(id, newEmailTracking);
    return newEmailTracking;
  }

  async getEmailTracking(contactId: string): Promise<EmailTracking[]> {
    return Array.from(this.emailTracking.values())
      .filter(et => et.contactId === contactId)
      .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
  }

  async trackEmailOpen(emailId: string): Promise<EmailTracking> {
    const emailTracking = this.emailTracking.get(emailId);
    if (!emailTracking) {
      throw new Error('Email tracking not found');
    }

    const now = new Date();
    const updated: EmailTracking = {
      ...emailTracking,
      opened: true,
      firstOpenedAt: emailTracking.firstOpenedAt || now,
      openCount: emailTracking.openCount + 1,
      lastOpenedAt: now,
    };

    this.emailTracking.set(emailId, updated);
    return updated;
  }

  async trackEmailClick(emailId: string): Promise<EmailTracking> {
    const emailTracking = this.emailTracking.get(emailId);
    if (!emailTracking) {
      throw new Error('Email tracking not found');
    }

    const now = new Date();
    const updated: EmailTracking = {
      ...emailTracking,
      clicked: true,
      firstClickedAt: emailTracking.firstClickedAt || now,
      clickCount: emailTracking.clickCount + 1,
      lastClickedAt: now,
    };

    this.emailTracking.set(emailId, updated);
    return updated;
  }

  async updateEmailDeliveryStatus(emailId: string, status: 'delivered' | 'bounced', metadata?: Record<string, any>): Promise<EmailTracking> {
    const emailTracking = this.emailTracking.get(emailId);
    if (!emailTracking) {
      throw new Error('Email tracking not found');
    }

    const now = new Date();
    const updated: EmailTracking = {
      ...emailTracking,
      delivered: status === 'delivered',
      deliveredAt: status === 'delivered' ? now : emailTracking.deliveredAt,
      bounced: status === 'bounced',
      bouncedAt: status === 'bounced' ? now : emailTracking.bouncedAt,
      bounceReason: status === 'bounced' ? metadata?.reason || 'Unknown' : emailTracking.bounceReason,
      metadata: { ...emailTracking.metadata, ...metadata },
    };

    this.emailTracking.set(emailId, updated);
    return updated;
  }

  async findEmailTrackingByMessageId(messageId: string, provider: string): Promise<EmailTracking | undefined> {
    return Array.from(this.emailTracking.values())
      .find(et => et.providerMessageId === messageId && et.emailProvider === provider);
  }

  async updateEmailUnsubscribeStatus(emailId: string, metadata?: Record<string, any>): Promise<EmailTracking> {
    const emailTracking = this.emailTracking.get(emailId);
    if (!emailTracking) {
      throw new Error('Email tracking not found');
    }

    const now = new Date();
    const updated: EmailTracking = {
      ...emailTracking,
      unsubscribed: true,
      unsubscribedAt: now,
      metadata: { ...emailTracking.metadata, ...metadata },
    };

    this.emailTracking.set(emailId, updated);
    return updated;
  }

  // Customer Lifecycle Methods
  async createCustomerLifecycle(lifecycle: InsertCustomerLifecycle): Promise<CustomerLifecycle> {
    const id = randomUUID();
    const now = new Date();
    const newLifecycle: CustomerLifecycle = {
      ...lifecycle,
      id,
      projectId: lifecycle.projectId || null,
      currentStage: lifecycle.currentStage || 'initial_contact',
      previousStage: lifecycle.previousStage || null,
      stageEnteredAt: lifecycle.stageEnteredAt || now,
      stageHistory: lifecycle.stageHistory || [],
      nextActionRequired: lifecycle.nextActionRequired || null,
      nextActionDue: lifecycle.nextActionDue || null,
      totalValue: lifecycle.totalValue || 0,
      probabilityScore: lifecycle.probabilityScore || 50,
      lastTouchpoint: lifecycle.lastTouchpoint || null,
      lastTouchpointType: lifecycle.lastTouchpointType || null,
      daysSinceLastContact: lifecycle.daysSinceLastContact || 0,
      totalTouchpoints: lifecycle.totalTouchpoints || 0,
      conversionDate: lifecycle.conversionDate || null,
      completionDate: lifecycle.completionDate || null,
      adminNotes: lifecycle.adminNotes || null,
      systemNotes: lifecycle.systemNotes || null,
      updatedAt: now,
      createdAt: now,
    };
    this.customerLifecycle.set(lifecycle.contactId, newLifecycle);
    return newLifecycle;
  }

  async getCustomerLifecycle(contactId: string): Promise<CustomerLifecycle | undefined> {
    return this.customerLifecycle.get(contactId);
  }

  async updateCustomerLifecycleStage(contactId: string, newStage: LifecycleStage, notes?: string): Promise<CustomerLifecycle> {
    let lifecycle = this.customerLifecycle.get(contactId);
    const now = new Date();

    if (!lifecycle) {
      // Create new lifecycle if it doesn't exist
      lifecycle = await this.createCustomerLifecycle({
        contactId,
        currentStage: newStage,
        systemNotes: notes || `Initial stage: ${newStage}`,
      });
    } else {
      // Calculate time in previous stage
      const timeInPreviousStage = now.getTime() - lifecycle.stageEnteredAt.getTime();
      const minutesInStage = Math.floor(timeInPreviousStage / (1000 * 60));

      // Update stage history
      const newStageHistory = [
        ...lifecycle.stageHistory,
        {
          stage: lifecycle.currentStage,
          enteredAt: lifecycle.stageEnteredAt.toISOString(),
          duration: minutesInStage,
          notes: notes || '',
        },
      ];

      const updated: CustomerLifecycle = {
        ...lifecycle,
        previousStage: lifecycle.currentStage,
        currentStage: newStage,
        stageEnteredAt: now,
        stageHistory: newStageHistory,
        updatedAt: now,
        systemNotes: `${lifecycle.systemNotes || ''}\n${now.toISOString()}: Moved to ${newStage}${notes ? ` - ${notes}` : ''}`.trim(),
      };

      this.customerLifecycle.set(contactId, updated);
      lifecycle = updated;
    }

    return lifecycle;
  }

  async calculateCustomerLifecycleMetrics(contactId: string): Promise<{
    daysInCurrentStage: number;
    totalDays: number;
    conversionProbability: number;
    nextActionRequired?: string;
    nextActionDue?: Date;
  }> {
    const lifecycle = this.customerLifecycle.get(contactId);
    if (!lifecycle) {
      return {
        daysInCurrentStage: 0,
        totalDays: 0,
        conversionProbability: 50,
      };
    }

    const now = new Date();
    const daysInCurrentStage = Math.floor((now.getTime() - lifecycle.stageEnteredAt.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.floor((now.getTime() - lifecycle.createdAt.getTime()) / (1000 * 60 * 60 * 24));

    return {
      daysInCurrentStage,
      totalDays,
      conversionProbability: lifecycle.probabilityScore,
      nextActionRequired: lifecycle.nextActionRequired || undefined,
      nextActionDue: lifecycle.nextActionDue || undefined,
    };
  }

  // Customer Activity Methods
  async createCustomerActivity(activity: InsertCustomerActivity): Promise<CustomerActivity> {
    const id = randomUUID();
    const newActivity: CustomerActivity = {
      ...activity,
      id,
      projectId: activity.projectId || null,
      activitySubtype: activity.activitySubtype || null,
      value: activity.value || null,
      duration: activity.duration || null,
      source: activity.source || 'system',
      sourceId: activity.sourceId || null,
      initiatedBy: activity.initiatedBy || null,
      adminUserId: activity.adminUserId || null,
      ipAddress: activity.ipAddress || null,
      userAgent: activity.userAgent || null,
      deviceInfo: activity.deviceInfo || {},
      metadata: activity.metadata || {},
      importance: activity.importance || 'normal',
      isAutomated: activity.isAutomated || false,
      createdAt: new Date(),
    };
    this.customerActivity.set(id, newActivity);
    return newActivity;
  }

  async getCustomerActivity(contactId: string, limit?: number): Promise<CustomerActivity[]> {
    let activities = Array.from(this.customerActivity.values())
      .filter(ca => ca.contactId === contactId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (limit) {
      activities = activities.slice(0, limit);
    }

    return activities;
  }

  async getCustomerActivityByType(contactId: string, activityType: ActivityType): Promise<CustomerActivity[]> {
    return Array.from(this.customerActivity.values())
      .filter(ca => ca.contactId === contactId && ca.activityType === activityType)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCustomerActivityStats(contactId: string): Promise<{
    totalActivities: number;
    lastActivity?: Date;
    daysSinceLastContact: number;
    totalTouchpoints: number;
    activitiesByType: Record<string, number>;
  }> {
    const activities = await this.getCustomerActivity(contactId);
    const activitiesByType: Record<string, number> = {};

    activities.forEach(activity => {
      activitiesByType[activity.activityType] = (activitiesByType[activity.activityType] || 0) + 1;
    });

    const lastActivity = activities.length > 0 ? activities[0].createdAt : undefined;
    const daysSinceLastContact = lastActivity
      ? Math.floor((new Date().getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    return {
      totalActivities: activities.length,
      lastActivity,
      daysSinceLastContact,
      totalTouchpoints: activities.length,
      activitiesByType,
    };
  }

  // Comprehensive Profile Methods
  async getComprehensiveCustomerProfile(contactId: string): Promise<CustomerProfile | undefined> {
    const contact = this.contacts.get(contactId);
    if (!contact) return undefined;

    const [
      projects,
      quotes,
      lifecycle,
      chatHistory,
      quoteAnalytics,
      fileSends,
      emailTracking,
      customerActivity,
      payments,
      bookings,
    ] = await Promise.all([
      this.getProjectsByContact(contactId),
      this.getCustomerQuotesWithAccess(contactId),
      this.getCustomerLifecycle(contactId),
      this.getCustomerChatHistory(contactId),
      this.getQuoteAnalyticsByContact(contactId),
      this.getFileSends(contactId),
      this.getEmailTracking(contactId),
      this.getCustomerActivity(contactId),
      this.getPaymentsByCustomer(contactId),
      this.getCustomerBookings(contactId),
    ]);

    const paymentSummary = await this.getCustomerPaymentSummary(contactId);
    const lifecycleMetrics = await this.calculateCustomerLifecycleMetrics(contactId);

    return {
      contact,
      projects,
      quotes,
      lifecycle: lifecycle || await this.createCustomerLifecycle({ contactId }),
      chatHistory: chatHistory.messages,
      quoteAnalytics,
      fileSends,
      emailTracking,
      customerActivity,
      payments,
      bookings,
      totalValue: paymentSummary.totalValue,
      totalPaid: paymentSummary.totalPaid,
      balance: paymentSummary.balance,
      lastActivity: chatHistory.lastContact || null,
      daysInCurrentStage: lifecycleMetrics.daysInCurrentStage,
      conversionProbability: lifecycleMetrics.conversionProbability,
      nextActionRequired: lifecycleMetrics.nextActionRequired || null,
      nextActionDue: lifecycleMetrics.nextActionDue || null,
    };
  }

  async getCustomerChatHistory(contactId: string): Promise<{
    messages: ChatMessage[];
    sessionCount: number;
    totalMessages: number;
    firstContact?: Date;
    lastContact?: Date;
  }> {
    const allMessages = Array.from(this.chatMessages.values())
      .filter(msg => msg.contactId === contactId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const sessionIds = new Set(allMessages.map(msg => msg.sessionId));
    const firstContact = allMessages.length > 0 ? allMessages[0].createdAt : undefined;
    const lastContact = allMessages.length > 0 ? allMessages[allMessages.length - 1].createdAt : undefined;

    return {
      messages: allMessages,
      sessionCount: sessionIds.size,
      totalMessages: allMessages.length,
      firstContact,
      lastContact,
    };
  }

  async getCustomerFileHistory(contactId: string): Promise<{
    files: FileSend[];
    totalFiles: number;
    deliveredFiles: number;
    accessedFiles: number;
  }> {
    const files = await this.getFileSends(contactId);
    const deliveredFiles = files.filter(f => f.delivered).length;
    const accessedFiles = files.filter(f => f.accessed).length;

    return {
      files,
      totalFiles: files.length,
      deliveredFiles,
      accessedFiles,
    };
  }

  async getCustomerQuoteHistory(contactId: string): Promise<{
    quotes: Quote[];
    analytics: QuoteAnalytics[];
    totalViews: number;
    acceptedQuotes: number;
    pendingQuotes: number;
  }> {
    const quotes = await this.getCustomerQuotesWithAccess(contactId);
    const analytics = await this.getQuoteAnalyticsByContact(contactId);
    const totalViews = analytics.filter(qa => qa.action === 'view').length;
    const acceptedQuotes = quotes.filter(q => q.status === 'ACCEPTED').length;
    const pendingQuotes = quotes.filter(q => q.status === 'DRAFT' || q.status === 'SENT').length;

    return {
      quotes,
      analytics,
      totalViews,
      acceptedQuotes,
      pendingQuotes,
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
    const projects = await this.getProjectsByContact(contactId);
    const projectIds = projects.map(p => p.id);
    
    const invoices = Array.from(this.invoices.values())
      .filter(i => projectIds.includes(i.projectId));
    
    const allPayments = Array.from(this.payments.values())
      .filter(p => invoices.some(i => i.id === p.invoiceId));

    const totalValue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
    const totalPaid = allPayments
      .filter(p => p.status === 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0);
    const balance = totalValue - totalPaid;

    const paymentHistory = allPayments.map(payment => ({
      date: payment.paidAt || new Date(),
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      invoiceId: payment.invoiceId,
    })).sort((a, b) => b.date.getTime() - a.date.getTime());

    return {
      totalValue,
      totalPaid,
      balance,
      payments: allPayments,
      paymentHistory,
    };
  }

  // Helper method for getting payments by customer
  private async getPaymentsByCustomer(contactId: string): Promise<Payment[]> {
    const projects = await this.getProjectsByContact(contactId);
    const projectIds = projects.map(p => p.id);
    
    const invoices = Array.from(this.invoices.values())
      .filter(i => projectIds.includes(i.projectId));
    
    return Array.from(this.payments.values())
      .filter(p => invoices.some(i => i.id === p.invoiceId))
      .sort((a, b) => (b.paidAt || new Date()).getTime() - (a.paidAt || new Date()).getTime());
  }

  // ==========================================
  // UNIFIED AVAILABILITY SERVICE
  // ==========================================

  async searchNormalizedSlots(filters: {
    startDate: Date;
    endDate: Date;
    cruiseType?: 'private' | 'disco';
    groupSize?: number;
    minDuration?: number;
    maxDuration?: number;
  }): Promise<NormalizedSlot[]> {
    // Clean up expired holds first
    await this.cleanupExpiredHolds();
    
    // Get normalized availability data
    const allSlots = await this.normalizeAvailabilityData(filters.startDate, filters.endDate);
    
    // Apply filters
    let filteredSlots = allSlots;
    
    if (filters.cruiseType) {
      filteredSlots = filteredSlots.filter(slot => slot.cruiseType === filters.cruiseType);
    }
    
    if (filters.groupSize) {
      filteredSlots = filteredSlots.filter(slot => slot.capacity >= filters.groupSize);
    }
    
    if (filters.minDuration) {
      filteredSlots = filteredSlots.filter(slot => slot.duration >= filters.minDuration);
    }
    
    if (filters.maxDuration) {
      filteredSlots = filteredSlots.filter(slot => slot.duration <= filters.maxDuration);
    }
    
    // Filter out non-bookable slots
    return filteredSlots.filter(slot => slot.bookable);
  }

  async createSlotHold(hold: {
    slotId: string;
    boatId?: string;
    cruiseType: 'private' | 'disco';
    dateISO: string;
    startTime: string;
    endTime: string;
    sessionId?: string;
    groupSize?: number;
    ttlMinutes?: number;
  }): Promise<SlotHold> {
    const slotKey = hold.slotId;
    
    // Use locking to prevent race conditions
    if (this.slotHoldLocks.has(slotKey)) {
      await this.slotHoldLocks.get(slotKey);
    }
    
    const lockPromise = this.executeSlotHold(hold);
    this.slotHoldLocks.set(slotKey, lockPromise);
    
    try {
      const result = await lockPromise;
      return result;
    } finally {
      this.slotHoldLocks.delete(slotKey);
    }
  }

  private async executeSlotHold(hold: {
    slotId: string;
    boatId?: string;
    cruiseType: 'private' | 'disco';
    dateISO: string;
    startTime: string;
    endTime: string;
    sessionId?: string;
    groupSize?: number;
    ttlMinutes?: number;
  }): Promise<SlotHold> {
    // Check if slot is available
    const availability = await this.isSlotAvailable(hold.slotId, hold.groupSize);
    if (!availability.available) {
      throw new Error(`Slot not available: ${availability.reason}`);
    }
    
    // Calculate expiration (default 15 minutes)
    const ttlMinutes = hold.ttlMinutes || 15;
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
    
    // Create slot hold
    const slotHold: SlotHold = {
      id: randomUUID(),
      orgId: "org_demo",
      slotId: hold.slotId,
      boatId: hold.boatId || null,
      cruiseType: hold.cruiseType,
      dateISO: hold.dateISO,
      startTime: hold.startTime,
      endTime: hold.endTime,
      sessionId: hold.sessionId || null,
      groupSize: hold.groupSize || null,
      expiresAt,
      createdAt: new Date(),
    };
    
    this.slotHolds.set(slotHold.id, slotHold);
    return slotHold;
  }

  async releaseSlotHold(holdId: string): Promise<boolean> {
    return this.slotHolds.delete(holdId);
  }

  async releaseSlotHoldBySlot(slotId: string, sessionId?: string): Promise<boolean> {
    const holds = Array.from(this.slotHolds.values()).filter(hold => {
      if (hold.slotId !== slotId) return false;
      if (sessionId && hold.sessionId !== sessionId) return false;
      return true;
    });
    
    let releasedCount = 0;
    for (const hold of holds) {
      if (this.slotHolds.delete(hold.id)) {
        releasedCount++;
      }
    }
    
    return releasedCount > 0;
  }

  async isSlotAvailable(slotId: string, groupSize?: number): Promise<{ available: boolean; reason?: string; heldUntil?: Date }> {
    // Clean up expired holds first
    await this.cleanupExpiredHolds();
    
    // Check for active holds on this slot
    const activeHolds = Array.from(this.slotHolds.values()).filter(hold => 
      hold.slotId === slotId && hold.expiresAt > new Date()
    );
    
    if (activeHolds.length > 0) {
      return {
        available: false,
        reason: 'Slot is currently held by another session',
        heldUntil: activeHolds[0].expiresAt
      };
    }
    
    // Parse slot components
    const [cruiseType, dateISO, timeRange] = slotId.split('_');
    if (!cruiseType || !dateISO || !timeRange) {
      return { available: false, reason: 'Invalid slot ID format' };
    }
    
    const slotDate = new Date(dateISO + 'T00:00:00-06:00'); // Chicago timezone
    const [startTime, endTime] = timeRange.split('-');
    
    // Check basic availability through existing methods
    const basicAvailability = await this.checkAvailability(
      slotDate, 
      this.calculateDurationFromTimes(startTime, endTime), 
      groupSize || 1, 
      cruiseType as 'private' | 'disco'
    );
    
    if (!basicAvailability.available) {
      return { available: false, reason: basicAvailability.reason };
    }
    
    return { available: true };
  }

  private calculateDurationFromTimes(startTime: string, endTime: string): number {
    const start = this.parseTimeToMinutes(startTime);
    const end = this.parseTimeToMinutes(endTime);
    return (end - start) / 60; // Convert to hours
  }

  private parseTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + (minutes || 0);
  }

  async normalizeAvailabilityData(startDate: Date, endDate: Date): Promise<NormalizedSlot[]> {
    const slots: NormalizedSlot[] = [];
    
    // Import time slot functions
    const { getPrivateTimeSlotsForDate, getDiscoTimeSlotsForDate } = await import('@shared/timeSlots');
    
    // Iterate through each date in the range
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateISO = currentDate.toISOString().split('T')[0];
      
      // Get private cruise slots for this date
      const privateSlots = getPrivateTimeSlotsForDate(currentDate);
      for (const timeSlot of privateSlots) {
        const slotId = `private_${dateISO}_${timeSlot.startTime}-${timeSlot.endTime}`;
        const availableBoats = await this.getAvailableBoats(currentDate, timeSlot.startTime, timeSlot.endTime, 1);
        
        const normalizedSlot: NormalizedSlot = {
          id: slotId,
          cruiseType: 'private',
          dateISO,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          label: timeSlot.label,
          duration: timeSlot.duration,
          capacity: availableBoats.length > 0 ? Math.max(...availableBoats.map(b => b.maxCapacity)) : 0,
          availableCount: availableBoats.length,
          price: await this.calculateSlotPrice(currentDate, timeSlot, 'private'),
          boatCandidates: availableBoats.map(b => b.id),
          bookable: availableBoats.length > 0,
          held: await this.isSlotHeld(slotId),
        };
        
        if (normalizedSlot.held) {
          const hold = Array.from(this.slotHolds.values()).find(h => h.slotId === slotId);
          normalizedSlot.holdExpiresAt = hold?.expiresAt;
        }
        
        slots.push(normalizedSlot);
      }
      
      // Get disco cruise slots for this date
      const discoSlots = getDiscoTimeSlotsForDate(currentDate);
      for (const timeSlot of discoSlots) {
        const slotId = `disco_${dateISO}_${timeSlot.startTime}-${timeSlot.endTime}`;
        const discoAvailable = await this.checkDiscoAvailability(currentDate, timeSlot.startTime);
        
        const normalizedSlot: NormalizedSlot = {
          id: slotId,
          cruiseType: 'disco',
          dateISO,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          label: timeSlot.label,
          duration: timeSlot.duration,
          capacity: timeSlot.maxCapacity || 50,
          availableCount: discoAvailable ? 1 : 0,
          price: (timeSlot.ticketPrice || 85) * 100, // Convert to cents
          boatCandidates: discoAvailable ? ['disco'] : [],
          bookable: discoAvailable,
          held: await this.isSlotHeld(slotId),
        };
        
        if (normalizedSlot.held) {
          const hold = Array.from(this.slotHolds.values()).find(h => h.slotId === slotId);
          normalizedSlot.holdExpiresAt = hold?.expiresAt;
        }
        
        slots.push(normalizedSlot);
      }
      
      // Move to next date
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return slots;
  }

  private async isSlotHeld(slotId: string): Promise<boolean> {
    const activeHolds = Array.from(this.slotHolds.values()).filter(hold => 
      hold.slotId === slotId && hold.expiresAt > new Date()
    );
    return activeHolds.length > 0;
  }

  private async calculateSlotPrice(date: Date, timeSlot: any, cruiseType: 'private' | 'disco'): Promise<number> {
    // This is a simplified pricing calculation
    // In a real implementation, this would integrate with the pricing system
    const basePrice = cruiseType === 'private' ? 50000 : 8500; // $500 or $85 in cents
    return basePrice;
  }

  async cleanupExpiredHolds(): Promise<number> {
    const now = new Date();
    const expiredHolds = Array.from(this.slotHolds.entries()).filter(([, hold]) => hold.expiresAt <= now);
    
    for (const [holdId] of expiredHolds) {
      this.slotHolds.delete(holdId);
    }
    
    return expiredHolds.length;
  }

  async getSlotHold(holdId: string): Promise<SlotHold | undefined> {
    return this.slotHolds.get(holdId);
  }

  async getSlotHoldsBySession(sessionId: string): Promise<SlotHold[]> {
    return Array.from(this.slotHolds.values()).filter(hold => hold.sessionId === sessionId);
  }

  async getActiveSlotHolds(): Promise<SlotHold[]> {
    const now = new Date();
    return Array.from(this.slotHolds.values()).filter(hold => hold.expiresAt > now);
  }
}

export const storage = new MemStorage();

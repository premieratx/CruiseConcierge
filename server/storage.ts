import { type Contact, type InsertContact, type Project, type InsertProject, type Boat, type InsertBoat, type Product, type InsertProduct, type Quote, type InsertQuote, type Invoice, type Payment, type ChatMessage, type InsertChatMessage, type AvailabilitySlot, type QuoteTemplate, type InsertQuoteTemplate, type TemplateRule, type InsertTemplateRule, type DiscountRule, type InsertDiscountRule, type PricingSettings, type InsertPricingSettings, type PricingPreview, type Affiliate, type InsertAffiliate, type PaymentSchedule, type DiscountCondition, type DayOfWeekMultipliers, type SeasonalAdjustment, type Booking, type InsertBooking, type DiscoSlot, type InsertDiscoSlot, type Timeframe, type InsertTimeframe, type EmailTemplate, type InsertEmailTemplate, type MasterTemplate, type InsertMasterTemplate } from "@shared/schema";
import { randomUUID } from "crypto";

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
  createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt'>): Promise<Invoice>;
  updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice>;

  // Payments
  createPayment(payment: Omit<Payment, 'id'>): Promise<Payment>;
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
}

export class MemStorage implements IStorage {
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
        displayOrder: 1,
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
        displayOrder: 2,
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
          });
          
          discoSlotsData.push({
            id: `disco_${date.toISOString().split('T')[0]}_1530`,
            date,
            startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 30),
            endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 30),
            ticketsSold: Math.floor(Math.random() * 40),
            ticketCap: 75,
            status: "available" as const,
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
        active: true,
        createdAt: new Date(),
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
        active: true,
        createdAt: new Date(),
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
        active: true,
        createdAt: new Date(),
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
      tags: insertContact.tags || [],
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
      tags: insertProject.tags || [],
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
      p.active && (p.eventTypes.length === 0 || p.eventTypes.includes(eventType))
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
      pricingModel: insertProduct.pricingModel || "hourly",
      productType: insertProduct.productType || "private_cruise",
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
    const quote: Quote = {
      ...insertQuote,
      orgId: insertQuote.orgId || "org_demo",
      status: insertQuote.status || "DRAFT",
      items: insertQuote.items || [],
      promoCode: insertQuote.promoCode || null,
      discountTotal: insertQuote.discountTotal || 0,
      subtotal: insertQuote.subtotal || 0,
      tax: insertQuote.tax || 0,
      total: insertQuote.total || 0,
      version: insertQuote.version || 1,
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
    this.quotes.set(id, updated);
    return updated;
  }

  async getQuotesByProject(projectId: string): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(q => q.projectId === projectId);
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    return this.invoices.get(id);
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
      orgId: insertTemplate.orgId || "org_demo",
      defaultItems: insertTemplate.defaultItems || [],
      minGroupSize: insertTemplate.minGroupSize || null,
      maxGroupSize: insertTemplate.maxGroupSize || null,
      basePricePerPerson: insertTemplate.basePricePerPerson || null,
      active: insertTemplate.active !== undefined ? insertTemplate.active : true,
      displayOrder: insertTemplate.displayOrder || 0,
      visualTheme: insertTemplate.visualTheme || {},
      automationRules: insertTemplate.automationRules || [],
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
      orgId: insertRule.orgId || "org_demo",
      conditions: insertRule.conditions || [],
      actions: insertRule.actions || [],
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

    return {
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
    for (const condition of rule.conditions) {
      if (!this.evaluateCondition(condition, context)) return false;
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
      contact = await this.createContact({
        name: name || email.split('@')[0],
        email,
        phone: phone || null,
        tags: ["chatbot"],
      });
    }
    
    return contact;
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
      projectDate,
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
      orgId: insertBooking.orgId || "org_demo",
      status: insertBooking.status || "booked",
      notes: insertBooking.notes || null,
      projectId: insertBooking.projectId || null,
      partyType: insertBooking.partyType || null,
      boatId: insertBooking.boatId || null,
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
      
      // Check for time overlap
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      
      // Overlaps if: start is during existing booking OR end is during existing booking 
      // OR new booking completely contains existing booking
      return (
        (startTime >= bookingStart && startTime < bookingEnd) ||
        (endTime > bookingStart && endTime <= bookingEnd) ||
        (startTime <= bookingStart && endTime >= bookingEnd)
      );
    });
  }

  async createBookingFromPayment(projectId: string, paymentId: string, amount: number): Promise<Booking> {
    // Get the project details
    const project = await this.getProject(projectId);
    if (!project) throw new Error('Project not found');
    
    // Get the contact to convert to customer
    const contact = await this.getContact(project.contactId);
    if (!contact) throw new Error('Contact not found');
    
    // Find an available boat if not specified
    let boatId = project.availabilitySlotId || '';
    if (!boatId && project.groupSize) {
      const boats = await this.getBoatsByCapacity(project.groupSize);
      if (boats.length > 0) {
        boatId = boats[0].id;
      }
    }
    
    // Create the booking
    const startTime = project.projectDate || new Date();
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + (project.duration || 4)); // Default 4 hour cruise
    
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
      notes: `Payment ${paymentId} - Amount: $${(amount / 100).toFixed(2)}`,
    };
    
    const newBooking = await this.createBooking(booking);
    
    // Update project status to CLOSED_WON
    await this.updateProject(projectId, { status: 'CLOSED_WON' });
    
    // Convert lead to customer (add customer tag)
    await this.convertLeadToCustomer(project.contactId);
    
    return newBooking;
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
    for (const [capacity, boats] of boatsByCapacity.entries()) {
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
          tf.boatIds.length === 0 || 
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
      
      for (const [capacity, boats] of boatsByCapacity.entries()) {
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
}

export const storage = new MemStorage();

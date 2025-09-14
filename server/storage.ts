import { type Contact, type InsertContact, type Project, type InsertProject, type Boat, type InsertBoat, type Product, type InsertProduct, type Quote, type InsertQuote, type Invoice, type Payment, type ChatMessage, type InsertChatMessage, type AvailabilitySlot, type QuoteTemplate, type InsertQuoteTemplate, type TemplateRule, type InsertTemplateRule, type DiscountRule, type InsertDiscountRule, type PricingSettings, type InsertPricingSettings, type PricingPreview, type Affiliate, type InsertAffiliate, type PaymentSchedule, type DiscountCondition, type DayOfWeekMultipliers, type SeasonalAdjustment } from "@shared/schema";
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

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed boats
    const boats = [
      { id: "boat_disco", orgId: "org_demo", name: "Disco Boat", capacity: 30, active: true },
      { id: "boat_pontoon", orgId: "org_demo", name: "Classic Pontoon", capacity: 12, active: true },
    ];
    boats.forEach(boat => this.boats.set(boat.id, boat));

    // Seed products
    const products = [
      { id: "prod_charter_2hr", orgId: "org_demo", name: "2-hour Charter", unitPrice: 60000, taxable: true },
      { id: "prod_cooler_ice", orgId: "org_demo", name: "Cooler + Ice", unitPrice: 1500, taxable: true },
      { id: "prod_pod_kit", orgId: "org_demo", name: "POD Pre-stock Kit", unitPrice: 9500, taxable: true },
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
          { type: "service", name: "2-hour Charter", productId: "prod_charter_2hr", unitPrice: 60000, qty: 1, required: true, order: 1 },
          { type: "addon", name: "Cooler + Ice", productId: "prod_cooler_ice", unitPrice: 1500, qty: 1, clientCanEditQty: true, order: 2 },
          { type: "addon", name: "Birthday Decorations", unitPrice: 2500, qty: 1, clientCanEditQty: true, order: 3 },
        ],
        minGroupSize: 8,
        maxGroupSize: 30,
        basePricePerPerson: 0,
        duration: 2,
        active: true,
        displayOrder: 1,
        visualTheme: { primaryColor: "#FF6B9D", accentColor: "#F7DC6F", theme: "celebration" },
        automationRules: [],
        createdAt: new Date(),
      },
      {
        id: "tmpl_corporate_event",
        orgId: "org_demo",
        name: "Corporate Event Package",
        description: "Professional package for business events and team building",
        eventType: "corporate",
        defaultItems: [
          { type: "service", name: "3-hour Charter", unitPrice: 90000, qty: 1, required: true, order: 1 },
          { type: "addon", name: "Catering Setup", unitPrice: 5000, qty: 1, order: 2 },
          { type: "addon", name: "Professional Sound System", unitPrice: 3000, qty: 1, order: 3 },
        ],
        minGroupSize: 15,
        maxGroupSize: 30,
        basePricePerPerson: 2500,
        duration: 3,
        active: true,
        displayOrder: 2,
        visualTheme: { primaryColor: "#2E86AB", accentColor: "#A23B72", theme: "professional" },
        automationRules: [],
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
        commissionAmount: 15,
        totalLeads: 42,
        totalQuotes: 18,
        totalRevenue: 450000,
        totalCommission: 67500,
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
        commissionAmount: 10,
        totalLeads: 28,
        totalQuotes: 12,
        totalRevenue: 320000,
        totalCommission: 32000,
        active: true,
        createdAt: new Date(),
      },
    ];
    affiliates.forEach(affiliate => this.affiliates.set(affiliate.id, affiliate));
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

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      orgId: insertProduct.orgId || "org_demo",
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
    const dayOfWeek = eventDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
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
    const daysUntil = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
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
    const projectDate = extractedData.date ? new Date(extractedData.date) : null;
    
    return await this.createProject({
      contactId,
      title: extractedData.eventType ? `${extractedData.eventType} Event` : "New Event",
      eventType: extractedData.eventType || null,
      groupSize: extractedData.groupSize || null,
      projectDate,
      duration: extractedData.duration || null,
      specialRequests: extractedData.specialRequests || null,
      preferredTime: extractedData.preferredTime || null,
      budget: extractedData.budget || null,
      leadSource: "chat",
      tags: ["chatbot"],
    });
  }
}

export const storage = new MemStorage();

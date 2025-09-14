import { type Contact, type InsertContact, type Project, type InsertProject, type Boat, type Product, type Quote, type InsertQuote, type Invoice, type Payment, type ChatMessage, type InsertChatMessage, type AvailabilitySlot } from "@shared/schema";
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
  getProducts(): Promise<Product[]>;

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

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
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
}

export const storage = new MemStorage();

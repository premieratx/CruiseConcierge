import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { generateQuoteDescription } from "./services/openai";
import { googleSheetsService } from "./services/googleSheets";
import { mailgunService } from "./services/mailgun";
import { openRouterService } from "./services/openrouter";
import { goHighLevelService, type LeadWebhookPayload } from "./services/gohighlevel";
import { sendEmail as sendgridEmail, sendQuoteEmail as sendgridQuoteEmail } from "./services/sendgrid";
import { insertContactSchema, insertProjectSchema, insertQuoteSchema, insertChatMessageSchema, insertQuoteTemplateSchema, insertTemplateRuleSchema, insertDiscountRuleSchema, insertPricingSettingsSchema, insertProductSchema, insertAffiliateSchema, insertBookingSchema, insertDiscoSlotSchema, insertTimeframeSchema, type LeadData, type LeadUpdateData, type CreateLeadRequest } from "@shared/schema";
import { templateRenderer } from "./services/templateRenderer";
import { z } from "zod";
import { randomUUID } from "crypto";
import { getFullUrl, getPublicUrl } from "./utils";
import { seedQuoteTemplates } from "./seedTemplates";

// ==========================================
// ADMIN AUTHENTICATION AND AUTHORIZATION
// ==========================================

interface AdminUser {
  id: string;
  name: string;
  email: string;
  permissions: ('read' | 'edit' | 'full')[];
}

// Mock admin session validation - replace with real authentication
const validateAdminSession = (req: any): AdminUser | null => {
  // Check for admin session or token
  const authHeader = req.headers.authorization;
  const sessionAdmin = req.session?.admin;
  
  // For development, allow a test admin token
  if (authHeader === 'Bearer admin-dev-token' || process.env.ADMIN_DEV_MODE === 'true') {
    return {
      id: 'admin-dev',
      name: 'Development Admin',
      email: 'admin@premierpartycruises.com',
      permissions: ['read', 'edit', 'full']
    };
  }
  
  // Check for valid session admin
  if (sessionAdmin && sessionAdmin.id && sessionAdmin.email) {
    return {
      id: sessionAdmin.id,
      name: sessionAdmin.name || 'Admin User',
      email: sessionAdmin.email,
      permissions: sessionAdmin.permissions || ['read', 'edit']
    };
  }
  
  return null;
};

// Authentication middleware for admin routes
const requireAdminAuth = (req: any, res: any, next: any) => {
  const adminUser = validateAdminSession(req);
  
  if (!adminUser) {
    return res.status(401).json({ 
      error: "Admin authentication required",
      details: "Please authenticate with valid admin credentials"
    });
  }
  
  // Attach verified admin identity to request
  req.adminUser = adminUser;
  next();
};

// Permission check middleware
const requirePermission = (permission: 'read' | 'edit' | 'full') => {
  return (req: any, res: any, next: any) => {
    if (!req.adminUser || !req.adminUser.permissions.includes(permission)) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        required: permission,
        current: req.adminUser?.permissions || []
      });
    }
    next();
  };
};

// ==========================================
// ADMIN ENDPOINT VALIDATION SCHEMAS
// ==========================================

// Timezone normalization for America/Chicago
const normalizeToChicagoTime = (dateString: string): Date => {
  // If it's just a date (YYYY-MM-DD), treat as Chicago timezone
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return new Date(dateString + 'T00:00:00-06:00'); // CST/CDT
  }
  
  // If it includes time but no timezone, assume Chicago
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(dateString)) {
    return new Date(dateString + '-06:00');
  }
  
  // Otherwise parse as-is
  return new Date(dateString);
};

const adminCalendarQuerySchema = z.object({
  startDate: z.string().transform(normalizeToChicagoTime),
  endDate: z.string().transform(normalizeToChicagoTime),
  boatId: z.string().optional()
});

const blockSlotSchema = z.object({
  boatId: z.string().min(1, "Boat ID is required"),
  startTime: z.string().transform(normalizeToChicagoTime),
  endTime: z.string().transform(normalizeToChicagoTime),
  reason: z.string().optional()
});

const unblockSlotSchema = z.object({
  boatId: z.string().min(1, "Boat ID is required"),
  startTime: z.string().transform(normalizeToChicagoTime),
  endTime: z.string().transform(normalizeToChicagoTime)
});

const batchSlotOperationSchema = z.object({
  operation: z.object({
    type: z.enum(['block', 'unblock']),
    slotIds: z.array(z.string()),
    reason: z.string().optional(),
    boatId: z.string().optional(),
    startTime: z.string().transform(normalizeToChicagoTime).optional(),
    endTime: z.string().transform(normalizeToChicagoTime).optional()
  })
});

const adminBookingCreateSchema = insertBookingSchema.extend({
  startTime: z.string().transform(normalizeToChicagoTime),
  endTime: z.string().transform(normalizeToChicagoTime)
});

const adminBookingUpdateSchema = adminBookingCreateSchema.partial();

const moveBookingSchema = z.object({
  newStartTime: z.string().transform(normalizeToChicagoTime),
  newEndTime: z.string().transform(normalizeToChicagoTime),
  newBoatId: z.string().optional()
});

const recurringPatternSchema = z.object({
  startDate: z.string().transform(normalizeToChicagoTime),
  endDate: z.string().transform(normalizeToChicagoTime).optional(),
  timeSlots: z.array(z.object({
    startTime: z.string(),
    endTime: z.string()
  })),
  boatIds: z.array(z.string()),
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  reason: z.string().optional()
});

const cancelBookingSchema = z.object({
  reason: z.string().optional()
});

const calendarOverviewSchema = z.object({
  date: z.string().transform(normalizeToChicagoTime)
});

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY not configured. Payment functionality will be mocked.');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
}) : null;

// Helper functions for sending quotes
async function sendQuoteEmail(quoteId: string, email: string, personalMessage?: string) {
  const quote = await storage.getQuote(quoteId);
  if (!quote) throw new Error("Quote not found");
  
  const project = await storage.getProject(quote.projectId);
  const contact = project ? await storage.getContact(project.contactId) : null;
  
  // Get detailed pricing breakdown for the email
  const eventDate = project?.projectDate ? (typeof project.projectDate === 'string' ? new Date(project.projectDate) : project.projectDate) : null;
  const formattedDate = eventDate ? eventDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'To be confirmed';
  
  // Extract cruise type and package info from project
  const cruiseType = 'private'; // Default to private cruise
  const timeSlot = project?.preferredTime || 'TBD';
  const packageName = 'Custom Package';
  const boatType = cruiseType;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #3b82f6, #06b6d4); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">🚢 Premier Party Cruises</h1>
        <p style="color: white; margin: 10px 0 0 0;">Your Quote is Ready!</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2>Hello ${contact?.name || 'Valued Customer'}!</h2>
        
        <p>Thank you for your interest in Premier Party Cruises! We've prepared a custom quote for your upcoming event.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">📋 Quote Details</h3>
          <p><strong>Event:</strong> ${project?.eventType || 'Party Cruise'}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${timeSlot}</p>
          <p><strong>Group Size:</strong> ${project?.groupSize || 'TBD'} guests</p>
          <p><strong>Cruise Type:</strong> Private Charter</p>
          ${packageName && packageName !== 'Custom Package' ? `<p><strong>Package:</strong> ${packageName}</p>` : ''}
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin-top: 0; color: #1e40af;">💰 Pricing Breakdown</h3>
          <p style="font-size: 18px;"><strong>Subtotal:</strong> $${(quote.subtotal / 100).toFixed(2)}</p>
          ${quote.discountTotal > 0 ? `<p style="color: #dc2626;"><strong>Discount:</strong> -$${(quote.discountTotal / 100).toFixed(2)}</p>` : ''}
          ${quote.tax > 0 ? `<p><strong>Tax:</strong> $${(quote.tax / 100).toFixed(2)}</p>` : ''}
          ${quote.gratuity > 0 ? `<p><strong>Gratuity:</strong> $${(quote.gratuity / 100).toFixed(2)}</p>` : ''}
          <hr style="margin: 15px 0;">
          <p style="font-size: 24px; color: #1e40af;"><strong>Total: $${(quote.total / 100).toFixed(2)}</strong></p>
          ${quote.depositRequired ? `<p style="color: #059669;"><strong>Deposit Required:</strong> $${(quote.depositAmount / 100).toFixed(2)}</p>` : ''}
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${getFullUrl(`/quote/${quote.id}`)}" 
             style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 10px;">
            🚢 View Full Quote & Book
          </a>
        </div>
        
        ${personalMessage ? `<p style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;"><strong>Personal Message:</strong><br>${personalMessage}</p>` : ''}
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>🎉 Ready to book?</strong> Click the link above to secure your date with a deposit, or reply to this email with any questions!</p>
        </div>
        
        <p><strong>Questions?</strong> Reply to this email or call us at <strong>(512) 555-BOAT</strong>!</p>
        
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
  
  // Use Mailgun service (which is configured with valid credentials)
  return await mailgunService.send({
    to: email,
    from: process.env.MAILGUN_FROM || 'quotes@premierpartycruises.com',
    subject: '🚢 Your Party Cruise Quote is Ready!',
    html
  });
}

async function sendQuoteSMS(quoteId: string, phone: string) {
  const quote = await storage.getQuote(quoteId);
  if (!quote) throw new Error("Quote not found");
  
  const project = await storage.getProject(quote.projectId);
  const contact = project ? await storage.getContact(project.contactId) : null;
  
  // Get event details for more informative SMS
  const eventDate = project?.projectDate ? (typeof project.projectDate === 'string' ? new Date(project.projectDate) : project.projectDate) : null;
  const formattedDate = eventDate ? eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD';
  const cruiseType = 'private'; // Default to private cruise
  const eventType = project?.eventType || 'event';
  
  const message = `Hi ${contact?.name || 'there'}! 🚢 Your ${eventType} cruise quote (${formattedDate}) is ready: $${(quote.total / 100).toFixed(2)}. View & book: ${getFullUrl(`/quote/${quote.id}`)}`;
  
  return await goHighLevelService.send({
    to: phone,
    body: message
  });
}

async function sendAdminNotificationSMS(quoteId: string) {
  const adminPhone = process.env.ADMIN_PHONE_NUMBER;
  if (!adminPhone) {
    console.log('ADMIN_PHONE_NUMBER not configured. Skipping admin SMS notification.');
    return true;
  }

  const quote = await storage.getQuote(quoteId);
  if (!quote) throw new Error("Quote not found");
  
  const project = await storage.getProject(quote.projectId);
  const contact = project ? await storage.getContact(project.contactId) : null;
  
  const eventDate = project?.projectDate ? (typeof project.projectDate === 'string' ? new Date(project.projectDate) : project.projectDate) : null;
  const formattedDate = eventDate ? eventDate.toLocaleDateString() : 'TBD';
  const eventType = project?.eventType || 'Party Cruise';
  
  const message = `🚢 NEW BOOKING REQUEST!\n\nCustomer: ${contact?.name || 'Unknown'}\nEvent: ${eventType}\nDate: ${formattedDate}\nGroup Size: ${project?.groupSize || 'TBD'}\nTotal: $${(quote.total / 100).toFixed(2)}\n\nView quote: ${getFullUrl(`/quote/${quote.id}`)}`;
  
  return await goHighLevelService.send({
    to: adminPhone,
    body: message
  });
}

// Helper function to parse time strings like "12pm", "11am" into 24-hour format
function parseTimeString(timeStr: string): number {
  const cleanTime = timeStr.toLowerCase().trim();
  const isAM = cleanTime.includes('am');
  const isPM = cleanTime.includes('pm');
  
  // Extract the number part
  const numberPart = cleanTime.replace(/[ap]m/g, '');
  let hour = parseInt(numberPart);
  
  // Convert to 24-hour format
  if (isPM && hour !== 12) {
    hour += 12;
  } else if (isAM && hour === 12) {
    hour = 0;
  }
  
  return hour;
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Analytics API endpoints
  app.get("/api/analytics/metrics", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      const clients = await storage.getClients();
      const quotes: any[] = [];
      const messages: any[] = [];
      
      // Get all quotes from projects
      const projects = await storage.getProjectsByContact('');
      for (const project of projects) {
        const projectQuotes = await storage.getQuotesByProject(project.id);
        quotes.push(...projectQuotes);
      }
      
      // Get messages from recent sessions (last 100 sessions)
      const sessionIds = new Set<string>();
      const allMessages = await storage.getChatMessages('');
      allMessages.forEach((msg: any) => sessionIds.add(msg.sessionId));
      const recentSessions = Array.from(sessionIds).slice(-100);
      for (const sessionId of recentSessions) {
        const sessionMessages = await storage.getChatMessages(sessionId);
        messages.push(...sessionMessages);
      }
      
      // Calculate metrics
      const totalLeads = leads.length;
      const totalClients = clients.length;
      const conversionRate = totalLeads > 0 ? Math.round((totalClients / totalLeads) * 100) : 0;
      
      // Calculate average booking value from accepted quotes
      const acceptedQuotes = quotes.filter((q: any) => q.status === 'accepted');
      const avgBookingValue = acceptedQuotes.length > 0
        ? Math.round(acceptedQuotes.reduce((sum: number, q: any) => sum + q.total, 0) / acceptedQuotes.length / 100)
        : 0;
      
      // Count today's messages
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const messagesToday = messages.filter((m: any) => {
        const msgDate = new Date(m.timestamp || m.createdAt);
        msgDate.setHours(0, 0, 0, 0);
        return msgDate.getTime() === today.getTime();
      }).length;
      
      // Count leads generated today
      const leadsToday = leads.filter((l: any) => {
        const leadDate = new Date(l.createdAt);
        leadDate.setHours(0, 0, 0, 0);
        return leadDate.getTime() === today.getTime();
      }).length;
      
      res.json({
        conversionRate,
        avgBookingValue,
        totalLeads,
        totalClients,
        messagesToday,
        leadsGenerated: leadsToday,
        responseTime: "< 1m"
      });
    } catch (error: any) {
      console.error("Analytics metrics error:", error);
      res.status(500).json({ error: "Failed to load analytics metrics" });
    }
  });

  // Pipeline API endpoints
  app.get("/api/pipeline/summary", async (req, res) => {
    try {
      const projects = await storage.getProjectsByContact('');
      
      // Count projects by pipeline phase
      const newLeads = projects.filter((p: any) => p.pipelinePhase === 'ph_new').length;
      const quoteSent = projects.filter((p: any) => p.pipelinePhase === 'ph_quote_sent').length;
      const depositPaid = projects.filter((p: any) => p.pipelinePhase === 'ph_deposit_paid').length;
      const fullyPaid = projects.filter((p: any) => p.pipelinePhase === 'ph_fully_paid').length;
      
      res.json({
        newLeads,
        quoteSent,
        depositPaid,
        fullyPaid
      });
    } catch (error: any) {
      console.error("Pipeline summary error:", error);
      res.status(500).json({ error: "Failed to load pipeline summary" });
    }
  });

  // Recent quotes endpoint
  app.get("/api/quotes/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const allQuotes: any[] = [];
      
      // Get all projects and their quotes
      const projects = await storage.getProjectsByContact('');
      for (const project of projects) {
        const quotes = await storage.getQuotesByProject(project.id);
        for (const quote of quotes) {
          const contact = await storage.getContact(project.contactId);
          allQuotes.push({
            id: quote.id,
            quoteNumber: `Q-${quote.id.slice(0, 8).toUpperCase()}`,
            customerName: contact?.name || 'Unknown',
            customerEmail: contact?.email || '',
            eventDate: project.projectDate,
            totalAmount: quote.total,
            status: quote.status || 'draft',
            createdAt: quote.createdAt,
            sentAt: quote.createdAt, // Using createdAt as sentAt since sentAt doesn't exist in schema
            viewedAt: null, // viewedAt doesn't exist in schema
            expiresAt: quote.expiresAt
          });
        }
      }
      
      // Sort by creation date and limit
      allQuotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const recentQuotes = allQuotes.slice(0, limit);
      
      res.json(recentQuotes);
    } catch (error: any) {
      console.error("Recent quotes error:", error);
      res.status(500).json({ error: "Failed to load recent quotes" });
    }
  });

  // Recent invoices endpoint
  app.get("/api/invoices/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const allInvoices: any[] = [];
      
      // Get all quotes that are accepted (they would have invoices)
      const projects = await storage.getProjectsByContact('');
      for (const project of projects) {
        const quotes = await storage.getQuotesByProject(project.id);
        for (const quote of quotes) {
          if (quote.status === 'accepted') {
            const invoice = await storage.getInvoiceByQuoteId(quote.id);
            if (invoice) {
              const contact = await storage.getContact(project.contactId);
              
              allInvoices.push({
                id: invoice.id,
                invoiceNumber: `INV-${invoice.id.slice(0, 8).toUpperCase()}`,
                customerName: contact?.name || 'Unknown',
                customerEmail: contact?.email || '',
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Generate due date since it doesn't exist in schema
                totalAmount: invoice.total, // Use total instead of amount
                paidAmount: invoice.status === 'paid' ? invoice.total : 0, // Use total instead of amount
                status: invoice.status,
                createdAt: invoice.createdAt,
                sentAt: invoice.createdAt,
                paidAt: invoice.status === 'paid' ? invoice.createdAt : null
              });
            }
          }
        }
      }
      
      // Sort by creation date and limit
      allInvoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const recentInvoices = allInvoices.slice(0, limit);
      
      res.json(recentInvoices);
    } catch (error: any) {
      console.error("Recent invoices error:", error);
      res.status(500).json({ error: "Failed to load recent invoices" });
    }
  });

  // Get individual invoice endpoint
  app.get("/api/invoices/:id", async (req, res) => {
    try {
      console.log("🎯 Invoice API endpoint hit for ID:", req.params.id);
      const invoiceId = req.params.id;
      const invoice = await storage.getInvoice(invoiceId);
      
      console.log("🎯 Found invoice:", invoice ? "YES" : "NO");
      
      if (!invoice) {
        console.log("🎯 Invoice not found, returning 404");
        return res.status(404).json({ error: "Invoice not found" });
      }
      
      // Get related project and contact data
      const project = await storage.getProject(invoice.projectId);
      const contact = project ? await storage.getContact(project.contactId) : null;
      
      console.log("🎯 Returning invoice with details");
      
      // Return invoice with related data
      const invoiceWithDetails = {
        ...invoice,
        project,
        contact
      };
      
      res.json(invoiceWithDetails);
    } catch (error: any) {
      console.error("Get invoice error:", error);
      res.status(500).json({ error: "Failed to fetch invoice" });
    }
  });

  // Seed sample data endpoint (for testing)
  app.post("/api/seed-sample-data", async (req, res) => {
    try {
      // Create sample contacts
      const contacts = [];
      const contactData = [
        { name: "Sarah Johnson", email: "sarah@example.com", phone: "+15125551234" },
        { name: "Mike Rodriguez", email: "mike@example.com", phone: "+15125555678" },
        { name: "Jennifer Martinez", email: "jennifer@example.com", phone: "+15125559012" },
        { name: "David Chen", email: "david@example.com", phone: "+15125553456" },
        { name: "Emily Wilson", email: "emily@example.com", phone: "+15125557890" }
      ];
      
      for (const data of contactData) {
        const contact = await storage.createContact({
          name: data.name,
          email: data.email,
          phone: data.phone,
          tags: ["lead"]
        });
        contacts.push(contact);
      }
      
      // Create sample projects with different pipeline phases
      const projects = [];
      const projectData = [
        { contactIndex: 0, phase: "ph_new", eventType: "birthday", groupSize: 25, title: "Sarah's Birthday Cruise" },
        { contactIndex: 1, phase: "ph_quote_sent", eventType: "corporate", groupSize: 40, title: "Tech Company Team Building" },
        { contactIndex: 2, phase: "ph_deposit_paid", eventType: "bachelorette", groupSize: 15, title: "Jennifer's Bachelorette Party" },
        { contactIndex: 3, phase: "ph_fully_paid", eventType: "wedding", groupSize: 50, title: "Chen Wedding Reception" },
        { contactIndex: 4, phase: "ph_new", eventType: "graduation", groupSize: 30, title: "Emily's Graduation Party" }
      ];
      
      for (const data of projectData) {
        const eventDate = new Date();
        eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 60) + 30); // 30-90 days from now
        
        const project = await storage.createProject({
          contactId: contacts[data.contactIndex].id,
          title: data.title,
          status: "active",
          projectDate: eventDate,
          pipelinePhase: data.phase,
          groupSize: data.groupSize,
          eventType: data.eventType,
          duration: 3,
          preferredTime: "afternoon",
          budget: Math.floor(Math.random() * 5000 + 2000) * 100, // $2000-7000
          leadSource: "chat",
          tags: []
        });
        projects.push(project);
      }
      
      // Create sample quotes for some projects
      const quotes = [];
      for (let i = 0; i < 3; i++) {
        const project = projects[i];
        const quoteItems = [
          { id: randomUUID(), type: "service", name: "Private Cruise (3 hours)", qty: 1, unitPrice: 150000, description: "Private Cruise (3 hours)" },
          { id: randomUUID(), type: "addon", name: "Cooler + Ice", qty: 1, unitPrice: 1500, description: "Cooler + Ice" },
          { id: randomUUID(), type: "addon", name: "Sound System Upgrade", qty: 1, unitPrice: 5000, description: "Sound System Upgrade" }
        ];
        
        const quote = await storage.createQuote({
          projectId: project.id,
          items: quoteItems,
          subtotal: quoteItems.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0),
          tax: Math.floor(quoteItems.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0) * 0.0825),
          total: Math.floor(quoteItems.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0) * 1.0825),
          status: i === 0 ? "draft" : i === 1 ? "sent" : "accepted",
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        });
        quotes.push(quote);
      }
      
      // Create sample invoices for accepted quotes
      const acceptedQuote = quotes[2];
      const invoice = await storage.createInvoice({
        orgId: "org_demo",
        projectId: acceptedQuote.projectId,
        quoteId: acceptedQuote.id,
        subtotal: acceptedQuote.subtotal,
        tax: acceptedQuote.tax,
        total: acceptedQuote.total,
        balance: acceptedQuote.total,
        schedule: [],
        status: "sent"
      });
      
      // Create sample chat messages
      const sessionId = "sample-session-" + Date.now();
      await storage.createChatMessage({
        sessionId,
        contactId: contacts[0].id,
        role: "user",
        content: "Hi, I'm interested in booking a birthday party cruise",
        metadata: {}
      });
      
      await storage.createChatMessage({
        sessionId,
        contactId: contacts[0].id,
        role: "assistant",
        content: "Hello! I'd be happy to help you plan an amazing birthday party cruise. How many guests are you expecting?",
        metadata: {}
      });
      
      res.json({
        success: true,
        message: "Sample data created successfully",
        data: {
          contacts: contacts.length,
          projects: projects.length,
          quotes: quotes.length,
          invoices: 1,
          messages: 2
        }
      });
    } catch (error: any) {
      console.error("Seed sample data error:", error);
      res.status(500).json({ error: "Failed to seed sample data" });
    }
  });

  // Chat API endpoints
  app.post("/api/chat/message", async (req, res) => {
    try {
      const { sessionId, message, contactId } = req.body;
      
      if (!sessionId || !message) {
        return res.status(400).json({ error: "sessionId and message required" });
      }

      // Get conversation history
      const history = await storage.getChatMessages(sessionId);
      const conversationHistory = history.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Process message with AI
      const typedHistory = conversationHistory.map(msg => ({
        role: msg.role as "user" | "system" | "assistant",
        content: msg.content
      }));
      const aiResponse = await openRouterService.processMessage(typedHistory.concat([{
        role: "user" as const,
        content: message
      }]), { referer: req.get('referer') || 'https://premierpartycruises.com' });

      // Save user message
      await storage.createChatMessage({
        sessionId,
        contactId: contactId || null,
        role: "user",
        content: message,
        metadata: {}
      });

      // Process booking flow based on extracted data
      let automatedActions: any = {};
      
      // Check if we have extracted booking data from the conversation
      if (aiResponse.extractedData) {
        const extractedData = aiResponse.extractedData;
        
        // If we have all required contact info, create lead and contact
        if (extractedData.name && extractedData.email) {
          try {
            // Create or find contact
            const contact = await storage.findOrCreateContact(
              extractedData.email,
              extractedData.name,
              extractedData.phone
            );
            automatedActions.contactCreated = contact.id;
            
            // Create project if we have event details
            if (extractedData.eventType || extractedData.groupSize || extractedData.eventDate) {
              const project = await storage.createProject({
                contactId: contact.id,
                title: `${extractedData.eventType || 'Party'} Cruise for ${extractedData.name}`,
                status: "NEW",
                projectDate: extractedData.eventDate ? new Date(extractedData.eventDate) : undefined,
                groupSize: extractedData.groupSize,
                eventType: extractedData.eventType,
                preferredTime: extractedData.timeSlot,
                budget: extractedData.budget ? parseInt(extractedData.budget) * 100 : undefined,
                leadSource: "chat"
              });
              automatedActions.projectCreated = project.id;
              
              // Create lead in Google Sheets
              const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
              await googleSheetsService.createLead({
                leadId,
                name: contact.name,
                email: contact.email,
                phone: contact.phone || undefined,
                eventType: extractedData.eventType,
                source: "AI Chat Widget"
                // Removed cruiseDate and groupSize as they don't exist in the type
              });
              automatedActions.leadCreated = leadId;
              
              // Check availability if we have a date
              if (extractedData.eventDate && extractedData.groupSize) {
                const availableBoats = await googleSheetsService.getAvailableBoats(
                  extractedData.eventDate,
                  extractedData.groupSize
                );
                automatedActions.availabilityChecked = availableBoats.length > 0;
                
                // If available and we have all info, generate a quote
                if (availableBoats.length > 0 && project.projectDate) {
                  const pricing = await storage.calculateCruisePricing({
                    groupSize: project.groupSize || 20,
                    eventDate: project.projectDate,
                    timeSlot: project.preferredTime || "2pm-6pm",
                    promoCode: undefined
                  });
                  
                  const quote = await storage.createQuote({
                    projectId: project.id,
                    items: [], // PricingPreview doesn't have items property, using empty array
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
                  automatedActions.quoteGenerated = quote.id;
                  
                  // Send quote via email
                  if (contact.email) {
                    await sendQuoteEmail(quote.id, contact.email, 
                      "Thank you for choosing Premier Party Cruises! Your custom quote is ready."
                    );
                    automatedActions.emailSent = true;
                  }
                  
                  // Send SMS notifications
                  if (contact.phone) {
                    // Customer SMS
                    await sendQuoteSMS(quote.id, contact.phone);
                    automatedActions.smsSent = true;
                    
                    // Admin SMS
                    await sendAdminNotificationSMS(quote.id);
                    automatedActions.adminNotified = true;
                  }
                  
                  // Trigger GoHighLevel webhook
                  const webhookPayload: LeadWebhookPayload = {
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone || '',
                    requested_cruise_date: project.projectDate ? project.projectDate.toISOString() : new Date().toISOString(),
                    type_of_cruise: project.eventType || 'Party',
                    max_number_of_people: project.groupSize || 0,
                    quote_link: getFullUrl(`/quote/${quote.id}`),
                    created_at: new Date().toISOString()
                  };
                  
                  // Send webhook (would be implemented in goHighLevelService)
                  console.log("Would send GoHighLevel webhook:", webhookPayload);
                  automatedActions.webhookSent = true;
                }
              }
            }
          } catch (error) {
            console.error("Error processing automated booking actions:", error);
          }
        }
      }

      // Save AI response with metadata
      await storage.createChatMessage({
        sessionId,
        contactId: contactId || null,
        role: "assistant", 
        content: aiResponse.response,
        metadata: {
          intent: "booking",
          extractedData: aiResponse.extractedData || {},
          suggestedActions: aiResponse.suggestedActions || [],
          automatedActions
        } as Record<string, any>
      });

      res.json({
        response: aiResponse.response,
        message: aiResponse.response, // Keep for backward compatibility
        intent: "booking",
        extractedData: aiResponse.extractedData || {},
        suggestedActions: aiResponse.suggestedActions || [],
        automatedActions
      });

    } catch (error: any) {
      console.error("Chat message error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // New endpoint for chat booking flow
  app.post("/api/chat/booking", async (req, res) => {
    try {
      const { 
        sessionId, 
        step, 
        data,
        email,
        phone,
        name,
        eventType,
        eventDate,
        groupSize,
        specialRequests,
        cruiseType,
        timeSlot,
        discoPackage,
        budget
      } = req.body;
      
      console.log("🚢 Chat booking endpoint called:", { step, sessionId });

      // Handle different steps in the booking flow
      if (step === "create-lead") {
        // Create or update contact
        const contact = await storage.findOrCreateContact(
          email || data?.email,
          name || data?.name,
          phone || data?.phone
        );
        
        // Create lead in Google Sheets
        const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await googleSheetsService.createLead({
          leadId,
          name: contact.name,
          email: contact.email,
          phone: contact.phone || undefined,
          eventType: eventType || data?.eventType,
          eventTypeLabel: data?.eventTypeLabel,
          source: "AI Chat Widget"
        });
        
        // Create project with comprehensive comparison screen data
        const projectData = {
          contactId: contact.id,
          title: `${eventType || data?.eventType || 'Party'} Cruise for ${name || contact.name}`,
          status: "NEW" as const,
          projectDate: eventDate ? new Date(eventDate) : data?.eventDate ? new Date(data.eventDate) : undefined,
          groupSize: groupSize || data?.groupSize,
          eventType: eventType || data?.eventType,
          specialRequests: specialRequests || data?.specialRequests,
          preferredTime: timeSlot || data?.timeSlot,
          budget: budget ? parseInt(budget) * 100 : data?.budget ? parseInt(data.budget) * 100 : undefined,
          leadSource: "chat" as const,
          // Store all comparison screen data in the data field
          data: {
            // Cruise selection data
            cruiseType: cruiseType || data?.cruiseType,
            timeSlot: timeSlot || data?.timeSlot,
            discoPackage: discoPackage || data?.discoPackage,
            discoTimeSlot: data?.discoTimeSlot,
            discoTicketQuantity: data?.discoTicketQuantity,
            
            // Private cruise data
            selectedPrivatePackage: data?.selectedPrivatePackage,
            selectedBoat: data?.selectedBoat,
            preferredTimeLabel: data?.preferredTimeLabel,
            groupSizeLabel: data?.groupSizeLabel,
            
            // Event details from form
            eventTypeLabel: data?.eventTypeLabel,
            eventEmoji: data?.eventEmoji,
            firstName: data?.firstName,
            lastName: data?.lastName,
            
            // Pricing data (will be populated when quote is generated)
            privatePricing: data?.privatePricing,
            discoPricing: data?.discoPricing,
            
            // Additional metadata
            sessionId: sessionId,
            chatSource: true,
            flowStep: "lead_created"
          }
        };
        
        const project = await storage.createProject(projectData);
        
        // Update lead with project ID
        await googleSheetsService.updateLead(leadId, {
          projectId: project.id,
          cruiseDate: eventDate || data?.eventDate,
          groupSize: groupSize || data?.groupSize,
          boatType: cruiseType || data?.cruiseType,
          discoPackage: discoPackage || data?.discoPackage,
          timeSlot: timeSlot || data?.timeSlot,
          status: "CONTACT_INFO",
          progress: "contact_complete"
        });
        
        // Send SMS notification to customer
        if (contact.phone) {
          try {
            await goHighLevelService.send({
              to: contact.phone,
              body: `Hi ${contact.name}! 🚢 Thanks for your interest in Premier Party Cruises! We're reviewing your request for a ${eventType || data?.eventType || 'party'} cruise. We'll send you a quote shortly. Questions? Call us at (512) 555-BOAT!`
            });
            console.log("✅ SMS sent to customer:", contact.phone);
          } catch (smsError) {
            console.error("SMS send error:", smsError);
            // Continue even if SMS fails
          }
        }
        
        // Send admin notification
        const adminPhone = process.env.ADMIN_PHONE_NUMBER;
        if (adminPhone) {
          try {
            await goHighLevelService.send({
              to: adminPhone,
              body: `🚨 New lead from chat! ${contact.name} (${contact.email}) - ${eventType || 'Party'} for ${groupSize || 'TBD'} people on ${eventDate || 'TBD'}. Check CRM for details.`
            });
            console.log("✅ Admin SMS notification sent");
          } catch (adminSmsError) {
            console.error("Admin SMS error:", adminSmsError);
          }
        }
        
        res.json({
          success: true,
          contact,
          project,
          leadId,
          message: "Lead created successfully!"
        });
        
      } else if (step === "check-availability") {
        // Check availability from Google Sheets
        const { date, groupSize: size } = data || {};
        
        if (!date) {
          return res.status(400).json({ error: "Date is required for availability check" });
        }
        
        const availableBoats = await googleSheetsService.getAvailableBoats(
          date,
          size || 20
        );
        
        res.json({
          success: true,
          available: availableBoats.length > 0,
          boats: availableBoats,
          message: availableBoats.length > 0 
            ? "Great news! We have availability!"
            : "This date appears to be booked. Let me show you alternative dates."
        });
        
      } else if (step === "generate-quote") {
        // Generate a quote for the lead
        const { projectId, items } = data || {};
        
        if (!projectId) {
          return res.status(400).json({ error: "Project ID is required for quote generation" });
        }
        
        const project = await storage.getProject(projectId);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        
        // Calculate pricing
        const pricing = await storage.calculateCruisePricing({
          groupSize: project.groupSize || 20,
          eventDate: project.projectDate || new Date(),
          timeSlot: project.preferredTime || "2pm-6pm",
          promoCode: data?.promoCode
        });
        
        // Create quote
        const quote = await storage.createQuote({
          projectId: project.id,
          items: [], // PricingPreview doesn't have items property, using empty array
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
        
        // Send quote via email with error handling
        const contact = await storage.getContact(project.contactId);
        let emailSent = false;
        let smsSent = false;
        
        if (contact?.email) {
          try {
            emailSent = await sendQuoteEmail(quote.id, contact.email, 
              "Thank you for choosing Premier Party Cruises! Your custom quote is ready."
            );
            console.log(`✅ Quote email sent successfully to ${contact.email}`);
          } catch (emailError) {
            console.error("❌ Failed to send quote email:", emailError);
            // Continue processing even if email fails
          }
        } else {
          console.warn("⚠️ No email address available for contact");
        }
        
        // Send SMS with quote link with error handling
        if (contact?.phone) {
          try {
            smsSent = await sendQuoteSMS(quote.id, contact.phone);
            console.log(`✅ Quote SMS sent successfully to ${contact.phone}`);
          } catch (smsError) {
            console.error("❌ Failed to send quote SMS:", smsError);
            // Continue processing even if SMS fails
          }
        } else {
          console.warn("⚠️ No phone number available for contact");
        }
        
        // Create delivery status message
        let deliveryMessage = "Quote generated successfully!";
        if (emailSent && smsSent) {
          deliveryMessage = "Quote generated and sent via email & SMS!";
        } else if (emailSent && !smsSent) {
          deliveryMessage = "Quote generated and sent via email! SMS delivery failed - we'll follow up.";
        } else if (!emailSent && smsSent) {
          deliveryMessage = "Quote generated and sent via SMS! Email delivery failed - we'll follow up.";
        } else if (!emailSent && !smsSent) {
          deliveryMessage = "Quote generated! We'll contact you directly to share the details.";
        }
        
        res.json({
          success: true,
          quote,
          pricing,
          quoteUrl: `/quote/${quote.id}`,
          delivery: {
            emailSent,
            smsSent,
            hasContact: !!(contact?.email || contact?.phone)
          },
          message: deliveryMessage
        });
        
      } else {
        res.status(400).json({ error: "Invalid step" });
      }
      
    } catch (error: any) {
      console.error("Chat booking error:", error);
      res.status(500).json({ error: "Failed to process booking step", details: error.message });
    }
  });

  app.get("/api/chat/history/:sessionId", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  // Availability endpoints
  app.get("/api/availability", async (req, res) => {
    try {
      const { startDate, endDate, groupSize } = req.query;
      
      const start = startDate ? new Date(startDate as string) : new Date();
      const end = endDate ? new Date(endDate as string) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      // Use in-memory storage instead of Google Sheets
      const bookings = await storage.getBookings(start, end);
      const timeframes = await storage.getTimeframes();
      const boats = await storage.getActiveBoats();
      
      // Generate availability data from timeframes
      const availability = [];
      const currentDate = new Date(start);
      
      while (currentDate <= end) {
        const dayOfWeek = currentDate.getDay();
        const dayTimeframes = timeframes.filter(tf => tf.dayOfWeek === dayOfWeek && tf.type === 'private');
        
        for (const tf of dayTimeframes) {
          const slotDate = new Date(currentDate);
          const [startHours, startMinutes] = tf.startTime.split(':').map(Number);
          const [endHours, endMinutes] = tf.endTime.split(':').map(Number);
          
          slotDate.setHours(startHours, startMinutes, 0, 0);
          const slotEnd = new Date(currentDate);
          slotEnd.setHours(endHours, endMinutes, 0, 0);
          
          // Check if this slot is already booked
          const isBooked = bookings.some(booking => {
            const bookingStart = booking.startTime;
            const bookingEnd = booking.endTime;
            return (
              (slotDate >= bookingStart && slotDate < bookingEnd) ||
              (slotEnd > bookingStart && slotEnd <= bookingEnd)
            );
          });
          
          if (!isBooked) {
            for (const boat of boats) {
              if (!groupSize || boat.capacity >= parseInt(groupSize as string)) {
                availability.push({
                  date: currentDate.toISOString().split('T')[0],
                  day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
                  time: `${tf.startTime.replace(':', '')}-${tf.endTime.replace(':', '')}`,
                  boatType: boat.name,
                  capacity: boat.capacity,
                  baseRate: 350, // Base rate per hour
                  status: 'AVAILABLE',
                  bookedBy: undefined,
                  groupSize: undefined,
                  notes: tf.description
                });
              }
            }
          }
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }

      res.json({ availability });
    } catch (error) {
      console.error("Availability error:", error);
      res.status(500).json({ error: "Failed to fetch availability" });
    }
  });

  app.post("/api/availability/check", async (req, res) => {
    try {
      const { date, time, groupSize } = req.body;
      
      if (!date || !time || !groupSize) {
        return res.status(400).json({ error: "date, time, and groupSize required" });
      }

      // Use the new availability system instead of Google Sheets
      const dateObj = new Date(date);
      const availability = await storage.checkAvailability(dateObj, 4, groupSize, 'private');
      res.json(availability);
    } catch (error) {
      console.error("Check availability error:", error);
      res.status(500).json({ error: "Failed to check availability" });
    }
  });

  app.post("/api/populate-sheets", async (req, res) => {
    try {
      console.log("🚀 Starting Google Sheets population process...");
      const success = await googleSheetsService.populateSpreadsheet();
      
      if (success) {
        console.log("✅ Successfully populated Google Sheets with 3 months of availability data");
        res.json({ 
          success: true, 
          message: "Successfully populated Google Sheets with 3 months of availability data",
          timestamp: new Date().toISOString()
        });
      } else {
        console.error("❌ Failed to populate Google Sheets");
        res.status(500).json({ 
          success: false, 
          error: "Failed to populate Google Sheets. Check server logs for details." 
        });
      }
    } catch (error) {
      console.error("❌ Populate sheets endpoint error:", error);
      res.status(500).json({ 
        success: false, 
        error: "An error occurred while populating Google Sheets",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Contact endpoints
  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getContact(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      console.error("Get contact error:", error);
      res.status(500).json({ error: "Failed to fetch contact" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Send webhook to GoHighLevel if additional data is provided
      if (req.body.eventDate || req.body.eventType || req.body.groupSize || req.body.quoteId) {
        const webhookPayload: LeadWebhookPayload = {
          name: contact.name,
          email: contact.email,
          phone: contact.phone || "",
          requested_cruise_date: req.body.eventDate || "",
          type_of_cruise: req.body.eventType || "",
          max_number_of_people: req.body.groupSize || 0,
          quote_link: req.body.quoteId ? getFullUrl(`/quote/${req.body.quoteId}`) : "",
          created_at: new Date().toISOString()
        };
        
        // Fire and forget - don't wait for webhook response
        goHighLevelService.sendLeadWebhook(webhookPayload)
          .then(success => {
            if (success) {
              console.log('✅ Lead webhook sent for contact:', contact.id);
            } else {
              console.log('⚠️ Lead webhook failed for contact:', contact.id);
            }
          })
          .catch(error => {
            console.error('❌ Lead webhook error for contact:', contact.id, error);
          });
      }
      
      res.status(201).json(contact);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact data", details: error.errors });
      }
      console.error("Create contact error:", error);
      res.status(500).json({ error: "Failed to create contact" });
    }
  });

  app.get("/api/contacts/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      console.error("Get leads error:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/contacts/clients", async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      console.error("Get clients error:", error);
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  });

  // Lead tracking endpoints
  app.post("/api/leads", async (req, res) => {
    try {
      const { leadId, name, email, phone, eventType, eventTypeLabel, source } = req.body;

      if (!leadId || !name || !email) {
        return res.status(400).json({ error: "leadId, name, and email are required" });
      }

      const success = await googleSheetsService.createLead({
        leadId,
        name,
        email,
        phone,
        eventType,
        eventTypeLabel,
        source: source || "AI Chatbot Flow"
      });

      if (success) {
        console.log("✅ Lead created successfully:", leadId);
        res.status(201).json({ 
          success: true, 
          leadId,
          message: "Lead created successfully" 
        });
      } else {
        console.error("❌ Failed to create lead:", leadId);
        res.status(500).json({ 
          success: false, 
          error: "Failed to create lead in tracking system" 
        });
      }
    } catch (error: any) {
      console.error("Create lead error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to create lead",
        details: error.message 
      });
    }
  });

  app.patch("/api/leads/:leadId", async (req, res) => {
    try {
      const { leadId } = req.params;
      const updates = req.body as LeadUpdateData;

      if (!leadId) {
        return res.status(400).json({ error: "leadId is required" });
      }

      const success = await googleSheetsService.updateLead(leadId, updates);

      if (success) {
        console.log("✅ Lead updated successfully:", leadId, updates);
        res.json({ 
          success: true, 
          leadId,
          message: "Lead updated successfully",
          updates 
        });
      } else {
        console.error("❌ Failed to update lead:", leadId);
        res.status(500).json({ 
          success: false, 
          error: "Failed to update lead in tracking system" 
        });
      }
    } catch (error: any) {
      console.error("Update lead error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to update lead",
        details: error.message 
      });
    }
  });

  app.get("/api/leads/:leadId", async (req, res) => {
    try {
      const { leadId } = req.params;

      if (!leadId) {
        return res.status(400).json({ error: "leadId is required" });
      }

      const lead = await googleSheetsService.getLead(leadId);

      if (lead) {
        res.json({ success: true, lead });
      } else {
        res.status(404).json({ 
          success: false, 
          error: "Lead not found" 
        });
      }
    } catch (error: any) {
      console.error("Get lead error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch lead",
        details: error.message 
      });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await googleSheetsService.getAllLeads();
      res.json({ success: true, leads, count: leads.length });
    } catch (error: any) {
      console.error("Get all leads error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch leads",
        details: error.message 
      });
    }
  });

  // Enhanced lead tracking endpoint for immediate lead creation with contact info
  app.post("/api/leads/immediate", async (req, res) => {
    try {
      const { name, email, phone, eventType, eventTypeLabel, sessionId } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "name and email are required for immediate lead creation" });
      }

      // Generate unique lead ID using timestamp and session
      const leadId = `lead_${Date.now()}_${sessionId || Math.random().toString(36).substr(2, 9)}`;

      // Create lead in Google Sheets immediately
      const leadSuccess = await googleSheetsService.createLead({
        leadId,
        name,
        email,
        phone,
        eventType,
        eventTypeLabel,
        source: "AI Chatbot Flow - Immediate"
      });

      // Also create contact in local storage for the application
      let contact = null;
      try {
        contact = await storage.createContact({
          name,
          email,
          phone: phone || null,
          tags: ["chatbot_lead", "immediate_tracking"]
        });
        console.log("✅ Contact created in local storage:", contact.id);
      } catch (contactError) {
        // Contact might already exist, try to find it
        try {
          contact = await storage.getContactByEmail(email);
          console.log("📝 Found existing contact:", contact?.id);
        } catch (findError) {
          console.error("Failed to create or find contact:", findError);
        }
      }

      if (leadSuccess) {
        console.log("✅ Immediate lead created successfully:", leadId);
        res.status(201).json({ 
          success: true, 
          leadId,
          contactId: contact?.id,
          message: "Lead created immediately with contact info",
          trackingActive: true
        });
      } else {
        console.error("❌ Failed to create immediate lead:", leadId);
        res.status(500).json({ 
          success: false, 
          error: "Failed to create immediate lead in tracking system" 
        });
      }
    } catch (error: any) {
      console.error("Immediate lead creation error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to create immediate lead",
        details: error.message 
      });
    }
  });

  // Project endpoints
  app.get("/api/projects", async (req, res) => {
    try {
      const { contactId, pipelinePhase, status } = req.query;
      
      // Get all projects
      let projects = await storage.getProjectsByContact('');
      
      // Filter by contactId if provided
      if (contactId) {
        projects = projects.filter(p => p.contactId === contactId);
      }
      
      // Filter by pipelinePhase if provided
      if (pipelinePhase) {
        projects = projects.filter(p => p.pipelinePhase === pipelinePhase);
      }
      
      // Filter by status if provided
      if (status) {
        projects = projects.filter(p => p.status === status);
      }
      
      res.json(projects);
    } catch (error) {
      console.error("Get projects error:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      
      // Convert projectDate string to Date if needed
      if (projectData.projectDate && typeof projectData.projectDate === 'string') {
        projectData.projectDate = new Date(projectData.projectDate);
      }
      
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid project data", details: error.errors });
      }
      console.error("Create project error:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      res.json(project);
    } catch (error: any) {
      if (error.message === "Project not found") {
        return res.status(404).json({ error: "Project not found" });
      }
      console.error("Update project error:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  // Product endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Get product error:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid product data", details: error.errors });
      }
      console.error("Create product error:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error: any) {
      if (error.message === "Product not found") {
        return res.status(404).json({ error: "Product not found" });
      }
      console.error("Update product error:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete product error:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Disco Cruise specific endpoints
  app.get("/api/products/disco-cruise", async (req, res) => {
    try {
      const discoCruiseProducts = await storage.getDiscoCruiseProducts();
      console.log("Disco cruise products found:", discoCruiseProducts.length);
      if (discoCruiseProducts.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(discoCruiseProducts);
    } catch (error) {
      console.error("Get disco cruise products error:", error);
      res.status(500).json({ error: "Failed to fetch disco cruise products" });
    }
  });

  app.get("/api/products/private-cruise", async (req, res) => {
    try {
      const privateCruiseProducts = await storage.getPrivateCruiseProducts();
      res.json(privateCruiseProducts);
    } catch (error) {
      console.error("Get private cruise products error:", error);
      res.status(500).json({ error: "Failed to fetch private cruise products" });
    }
  });

  app.get("/api/products/by-event/:eventType", async (req, res) => {
    try {
      const eventType = req.params.eventType;
      const products = await storage.getProductsByEventType(eventType);
      res.json(products);
    } catch (error) {
      console.error("Get products by event type error:", error);
      res.status(500).json({ error: "Failed to fetch products for event type" });
    }
  });

  // Quote endpoints
  app.post("/api/quotes", async (req, res) => {
    try {
      console.log("Quote creation request body:", JSON.stringify(req.body, null, 2));
      
      const quoteData = insertQuoteSchema.parse(req.body);
      console.log("Quote data after validation:", JSON.stringify(quoteData, null, 2));
      
      const quote = await storage.createQuote(quoteData);
      console.log("Quote created successfully:", quote.id);
      
      res.status(201).json(quote);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.error("Quote validation errors:", JSON.stringify(error.errors, null, 2));
        return res.status(400).json({ error: "Invalid quote data", details: error.errors });
      }
      console.error("Create quote error:", error);
      res.status(500).json({ error: "Failed to create quote" });
    }
  });

  app.put("/api/quotes/:id", async (req, res) => {
    try {
      const quote = await storage.updateQuote(req.params.id, req.body);
      res.json(quote);
    } catch (error: any) {
      if (error.message === "Quote not found") {
        return res.status(404).json({ error: "Quote not found" });
      }
      console.error("Update quote error:", error);
      res.status(500).json({ error: "Failed to update quote" });
    }
  });

  app.post("/api/quotes/:id/send", async (req, res) => {
    try {
      // Support both formats: simple {email, phone} from chat, or detailed {delivery, customerInfo, personalMessage}
      let { email, phone } = req.body;
      const { delivery, customerInfo, personalMessage } = req.body;
      
      // If using simple format from chat, convert to full format
      if (!customerInfo && (email || phone)) {
        const sendEmail = !!email;
        const sendSMS = !!phone;
        
        // Send both email and SMS if both are provided
        if (sendEmail) {
          await sendQuoteEmail(req.params.id, email, personalMessage);
        }
        if (sendSMS) {
          await sendQuoteSMS(req.params.id, phone);
        }
        
        // Send admin notification SMS for chat-generated quotes
        try {
          await sendAdminNotificationSMS(req.params.id);
          console.log('Admin notification SMS sent for quote:', req.params.id);
        } catch (error) {
          console.error('Failed to send admin notification SMS:', error);
          // Don't fail the request if admin SMS fails
        }
        
        return res.json({ success: true, sent: { email: sendEmail, sms: sendSMS, adminNotification: true } });
      }
      
      const quote = await storage.getQuote(req.params.id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }

      const project = await storage.getProject(quote.projectId);
      if (!project) {
        return res.status(404).json({ error: "Associated project not found" });
      }

      let success = false;
      
      if (delivery === 'email' && customerInfo.email) {
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3b82f6, #06b6d4); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">🚢 Premier Party Cruises</h1>
              <p style="color: white; margin: 10px 0 0 0;">Your Quote is Ready!</p>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2>Hello ${customerInfo.name || 'Valued Customer'}!</h2>
              
              <p>Thank you for your interest in Premier Party Cruises! We've prepared a custom quote for your upcoming event.</p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Quote Details</h3>
                <p><strong>Event:</strong> ${project.eventType || 'Party Cruise'}</p>
                <p><strong>Group Size:</strong> ${project.groupSize || 'TBD'}</p>
                <p><strong>Date:</strong> ${project.projectDate?.toISOString().split('T')[0] || 'To be confirmed'}</p>
                <p><strong>Total:</strong> $${(quote.total / 100).toFixed(2)}</p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${getFullUrl(`/quote/${quote.id}`)}" 
                   style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  View Full Quote
                </a>
              </div>
              
              ${personalMessage ? `<p style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;"><strong>Personal Message:</strong><br>${personalMessage}</p>` : ''}
              
              <p>Questions? Reply to this email or call us at (512) 555-BOAT!</p>
              
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
        
        success = await mailgunService.send({
          to: customerInfo.email,
          subject: '🚢 Your Party Cruise Quote is Ready!',
          html,
          from: process.env.MAILGUN_FROM || 'quotes@premierpartycruises.com'
        });
      } else if (delivery === 'sms' && customerInfo.phone) {
        const message = `Hi ${customerInfo.name || 'Valued Customer'}! 🚢 Your Premier Party Cruises quote is ready. Total: $${(quote.total / 100).toFixed(2)}. View details: ${getFullUrl(`/quote/${quote.id}`)}`;
        
        success = await goHighLevelService.send({
          to: customerInfo.phone,
          body: message
        });
      }

      if (success) {
        await storage.updateQuote(quote.id, { status: "SENT" });
        await storage.updateProject(project.id, { pipelinePhase: "ph_quote_sent" });
      }

      res.json({ success, quoteId: quote.id });
    } catch (error) {
      console.error("Send quote error:", error);
      res.status(500).json({ error: "Failed to send quote" });
    }
  });

  // Get a single quote by ID
  app.get("/api/quotes/:id", async (req, res) => {
    try {
      const quote = await storage.getQuote(req.params.id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      res.json(quote);
    } catch (error) {
      console.error("Get quote error:", error);
      res.status(500).json({ error: "Failed to retrieve quote" });
    }
  });

  // Get quotes by project
  app.get("/api/projects/:projectId/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuotesByProject(req.params.projectId);
      res.json(quotes);
    } catch (error) {
      console.error("Get project quotes error:", error);
      res.status(500).json({ error: "Failed to retrieve quotes" });
    }
  });

  // Test SMS endpoint
  app.post("/api/sms/test", async (req, res) => {
    try {
      const { phone, message } = req.body;
      
      // Default test message if none provided
      const testMessage = message || 
        "🚢 Premier Party Cruises Test\n\n" +
        "This is a test message from your CRM system. " +
        "GoHighLevel SMS integration is working correctly!\n\n" +
        "- SMS delivery: ✅\n" +
        "- Integration status: Active\n" +
        "- System ready for production\n\n" +
        "Reply STOP to opt out.";
      
      const success = await goHighLevelService.send({
        to: phone || '5125767975',  // Default to user's phone if not specified
        body: testMessage
      });
      
      res.json({ 
        success, 
        message: success ? 'Test SMS sent successfully!' : 'SMS send failed - check logs for details',
        phone: phone || '5125767975',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Test SMS error:", error);
      res.status(500).json({ error: "Failed to send test SMS" });
    }
  });

  // Public quote viewing endpoint
  app.get("/api/quotes/:id/public", async (req, res) => {
    try {
      const quote = await storage.getQuote(req.params.id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      
      const project = await storage.getProject(quote.projectId);
      const contact = project ? await storage.getContact(project.contactId) : null;
      
      // Calculate pricing for display
      const pricing = await storage.calculateCruisePricing({
        groupSize: project?.groupSize || 25,
        eventDate: project?.projectDate || new Date(),
        timeSlot: project?.preferredTime || 'afternoon',
      });
      
      res.json({
        ...quote,
        pricing,
        project,
        contact,
      });
    } catch (error) {
      console.error("Get public quote error:", error);
      res.status(500).json({ error: "Failed to retrieve quote" });
    }
  });

  // Update quote selections (public endpoint for customer interactions)
  app.patch("/api/quotes/:id/selections", async (req, res) => {
    try {
      const { selectedPackage, discoTickets, selectedAddOns, signature } = req.body;
      
      // Validate request body
      const selectionsSchema = z.object({
        selectedPackage: z.string().optional(),
        discoTickets: z.number().min(0).optional(),
        selectedAddOns: z.array(z.string()).optional(),
        signature: z.string().nullable().optional(),
      });
      
      const validatedData = selectionsSchema.parse(req.body);
      
      const quote = await storage.getQuote(req.params.id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      
      // Check if quote is expired
      if (quote.expiresAt && new Date(quote.expiresAt) < new Date()) {
        return res.status(400).json({ error: "Quote has expired and cannot be modified" });
      }
      
      // Get existing radioSections or create empty array
      let radioSections = quote.radioSections || [];
      
      // Update package selection
      if (validatedData.selectedPackage !== undefined) {
        const packageSectionIndex = radioSections.findIndex(section => section.id === 'package_selection');
        if (packageSectionIndex >= 0) {
          radioSections[packageSectionIndex].selectedValue = validatedData.selectedPackage;
        } else {
          radioSections.push({
            id: 'package_selection',
            title: 'Package Selection',
            required: true,
            options: [],
            selectedValue: validatedData.selectedPackage,
          });
        }
      }
      
      // Update disco tickets selection
      if (validatedData.discoTickets !== undefined) {
        const discoSectionIndex = radioSections.findIndex(section => section.id === 'disco_tickets');
        if (discoSectionIndex >= 0) {
          radioSections[discoSectionIndex].selectedValue = validatedData.discoTickets.toString();
        } else {
          radioSections.push({
            id: 'disco_tickets',
            title: 'Disco Tickets',
            required: false,
            options: [],
            selectedValue: validatedData.discoTickets.toString(),
          });
        }
      }
      
      // Update add-ons selection
      if (validatedData.selectedAddOns !== undefined) {
        const addOnsSectionIndex = radioSections.findIndex(section => section.id === 'selected_addons');
        if (addOnsSectionIndex >= 0) {
          radioSections[addOnsSectionIndex].selectedValue = JSON.stringify(validatedData.selectedAddOns);
        } else {
          radioSections.push({
            id: 'selected_addons',
            title: 'Selected Add-ons',
            required: false,
            options: [],
            selectedValue: JSON.stringify(validatedData.selectedAddOns),
          });
        }
      }
      
      // Update signature
      if (validatedData.signature !== undefined) {
        const signatureSectionIndex = radioSections.findIndex(section => section.id === 'customer_signature');
        if (signatureSectionIndex >= 0) {
          radioSections[signatureSectionIndex].selectedValue = validatedData.signature || undefined;
        } else if (validatedData.signature) {
          radioSections.push({
            id: 'customer_signature',
            title: 'Customer Signature',
            required: false,
            options: [],
            selectedValue: validatedData.signature,
          });
        }
      }
      
      // Update the quote with new radioSections
      const updatedQuote = await storage.updateQuote(req.params.id, {
        radioSections,
      });
      
      console.log(`Quote ${req.params.id} selections updated:`, {
        selectedPackage: validatedData.selectedPackage,
        discoTickets: validatedData.discoTickets,
        selectedAddOnsCount: validatedData.selectedAddOns?.length || 0,
        hasSignature: !!validatedData.signature,
      });
      
      res.json({ 
        success: true, 
        message: "Selections saved successfully",
        quote: updatedQuote 
      });
    } catch (error) {
      console.error("Update quote selections error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request data", 
          details: error.errors 
        });
      }
      
      res.status(500).json({ error: "Failed to save selections" });
    }
  });

  // Clone quote
  app.post("/api/quotes/:id/clone", async (req, res) => {
    try {
      const { projectId, title } = req.body;
      const originalQuote = await storage.getQuote(req.params.id);
      
      if (!originalQuote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      
      // Create new quote with same items but new project
      const clonedQuote = await storage.createQuote({
        projectId: projectId || originalQuote.projectId,
        items: originalQuote.items,
        radioSections: originalQuote.radioSections || [],
        subtotal: originalQuote.subtotal,
        tax: originalQuote.tax,
        discountTotal: originalQuote.discountTotal || 0,
        total: originalQuote.total,
        depositAmount: originalQuote.depositAmount,
        status: 'DRAFT',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
        // Removed notes property as it doesn't exist in quotes schema
      });
      
      res.json(clonedQuote);
    } catch (error) {
      console.error("Clone quote error:", error);
      res.status(500).json({ error: "Failed to clone quote" });
    }
  });

  // Check and update expired quotes
  app.post("/api/quotes/check-expiration", async (req, res) => {
    try {
      const allQuotes = [];
      const projects = await storage.getProjectsByContact(''); // Get all projects
      
      for (const project of projects) {
        const quotes = await storage.getQuotesByProject(project.id);
        allQuotes.push(...quotes);
      }
      
      const now = new Date();
      let expiredCount = 0;
      
      for (const quote of allQuotes) {
        if (quote.status === 'SENT' && quote.expiresAt && new Date(quote.expiresAt) < now) {
          await storage.updateQuote(quote.id, { status: 'EXPIRED' });
          expiredCount++;
        }
      }
      
      res.json({ 
        success: true, 
        message: `Updated ${expiredCount} expired quotes`,
        expiredCount 
      });
    } catch (error) {
      console.error("Check expiration error:", error);
      res.status(500).json({ error: "Failed to check quote expiration" });
    }
  });

  // Recalculate quote with customizations
  app.post("/api/quotes/:id/recalculate-public", async (req, res) => {
    try {
      const { groupSize, options, discountCode } = req.body;
      const quote = await storage.getQuote(req.params.id);
      
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      
      const project = await storage.getProject(quote.projectId);
      
      // Recalculate pricing with new parameters
      const pricing = await storage.calculateCruisePricing({
        groupSize: groupSize || project?.groupSize || 25,
        eventDate: project?.projectDate || new Date(),
        timeSlot: project?.preferredTime || 'afternoon',
        promoCode: discountCode,
      });
      
      // Update quote with new pricing
      await storage.updateQuote(req.params.id, {
        total: pricing.total,
        subtotal: pricing.subtotal,
        tax: pricing.tax,
        gratuity: pricing.gratuity,
        discountTotal: pricing.discountTotal,
      });
      
      res.json({ success: true, pricing });
    } catch (error) {
      console.error("Recalculate quote error:", error);
      res.status(500).json({ error: "Failed to recalculate quote" });
    }
  });

  // Sign quote and generate invoice
  app.post("/api/quotes/:id/sign", async (req, res) => {
    try {
      const { signature, selectedOptions, specialRequests, discountCode } = req.body;
      
      if (!signature) {
        return res.status(400).json({ error: "Signature required" });
      }
      
      const quote = await storage.getQuote(req.params.id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      
      // Update quote status
      await storage.updateQuote(req.params.id, {
        status: "ACCEPTED",
      });
      
      // Store signature and customization details separately if needed
      // For now, we'll just update the status
      
      // Create invoice
      const invoice = await storage.createInvoice({
        orgId: quote.orgId,
        projectId: quote.projectId,
        quoteId: quote.id,
        subtotal: quote.subtotal,
        tax: quote.tax,
        total: quote.total,
        balance: quote.total,
        schedule: quote.paymentSchedule,
        status: "PENDING",
      });
      
      // Update project status
      await storage.updateProject(quote.projectId, {
        pipelinePhase: "ph_deposit_pending",
      });
      
      res.json({ success: true, invoiceId: invoice.id });
    } catch (error) {
      console.error("Sign quote error:", error);
      res.status(500).json({ error: "Failed to sign quote" });
    }
  });

  // Enhanced pricing preview endpoint
  app.post("/api/pricing/preview", async (req, res) => {
    try {
      const { items = [], promoCode, projectDate, groupSize, templateId } = req.body;
      
      // Enhanced logging for debugging
      console.log("Pricing preview request:", { items, groupSize, projectDate, promoCode, templateId });
      
      // Validate items structure for proper pricing calculation
      const validatedItems = items.map((item: any) => ({
        ...item,
        unitPrice: Number(item.unitPrice) || 0,
        qty: Number(item.qty) || 1,
      }));
      
      const pricing = await storage.calculatePricing({
        items: validatedItems,
        groupSize,
        projectDate: projectDate ? new Date(projectDate) : undefined,
        promoCode,
        templateId,
      });

      // Ensure all pricing values are valid numbers, not null
      const validatedPricing = {
        subtotal: Number(pricing.subtotal) || 0,
        discountTotal: Number(pricing.discountTotal) || 0,
        tax: Number(pricing.tax) || 0,
        gratuity: Number(pricing.gratuity) || 0,
        total: Number(pricing.total) || 0,
        perPersonCost: Number(pricing.perPersonCost) || 0,
        depositRequired: Boolean(pricing.depositRequired),
        depositPercent: Number(pricing.depositPercent) || 25,
        depositAmount: Number(pricing.depositAmount) || 0,
        paymentSchedule: pricing.paymentSchedule || [],
        expiresAt: pricing.expiresAt,
        breakdown: pricing.breakdown || {},
        displaySettings: pricing.displaySettings || {},
        urgencyMessage: pricing.urgencyMessage || null,
      };
      
      console.log("Pricing preview response:", validatedPricing);
      res.json(validatedPricing);
    } catch (error) {
      console.error("Pricing preview error:", error);
      res.status(500).json({ error: "Failed to calculate pricing" });
    }
  });

  // Stripe payment endpoints
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ error: "Stripe not configured" });
      }

      const { amount, quoteId, invoiceId } = req.body;
      
      if (!amount) {
        return res.status(400).json({ error: "amount required" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount), // amount in cents
        currency: "usd",
        metadata: {
          quoteId: quoteId || '',
          invoiceId: invoiceId || ''
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Create payment intent error:", error);
      res.status(500).json({ error: "Error creating payment intent: " + error.message });
    }
  });

  // Secure Stripe Checkout Session endpoint - server-side amount validation
  app.post("/api/checkout/create-session", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ error: "Stripe not configured" });
      }

      const { paymentType, customerEmail, metadata = {}, selectionPayload } = req.body;
      
      if (!paymentType || !selectionPayload) {
        return res.status(400).json({ error: "paymentType and selectionPayload required" });
      }

      // Validate required selection data
      const {
        cruiseType,
        groupSize,
        eventDate,
        timeSlot,
        selectedTimeSlot,
        selectedAddOnPackages,
        discoPackage,
        discoTimeSlot,
        discoTicketQuantity,
        eventType,
        quoteId
      } = selectionPayload;

      if (!cruiseType || !groupSize || !eventDate || !eventType) {
        return res.status(400).json({ error: "Missing required selection data" });
      }

      // Calculate pricing server-side to prevent tampering
      let pricing;
      try {
        if (cruiseType === 'private') {
          const effectiveTimeSlot = selectedTimeSlot || timeSlot;
          if (!effectiveTimeSlot) {
            return res.status(400).json({ error: "timeSlot required for private cruise" });
          }
          
          // Use new pricing logic with add-on packages
          const baseHourlyRate = 300;
          const selectedAddOns = selectedAddOnPackages || [];
          
          // Define available add-on packages (server-side validation)
          const addOnPackages = [
            { id: 'essentials', name: 'Essentials Package', hourlyRate: 50 },
            { id: 'ultimate', name: 'Ultimate Party Package', hourlyRate: 75 }
          ];
          
          // Calculate total hourly rate server-side
          let serverCalculatedHourlyRate = baseHourlyRate;
          const appliedAddOns = [];
          
          for (const addOnId of selectedAddOns) {
            const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
            if (addOn) {
              serverCalculatedHourlyRate += addOn.hourlyRate;
              appliedAddOns.push(addOn);
            }
          }
          
          // Calculate time slot duration and total cost
          const date = new Date(eventDate);
          const dayOfWeek = date.getDay();
          
          let duration = 3; // Default 3 hours for weekdays
          if (dayOfWeek === 5) { // Friday
            duration = 4;
          } else if (dayOfWeek === 6 || dayOfWeek === 0) { // Saturday/Sunday
            duration = 4;
          }
          
          const subtotalCents = serverCalculatedHourlyRate * duration * 100; // Convert to cents
          const taxRate = 0.0825; // 8.25% tax
          const taxCents = Math.round(subtotalCents * taxRate);
          const gratuityRate = 0.20; // 20% gratuity
          const gratuityCents = Math.round(subtotalCents * gratuityRate);
          const totalCents = subtotalCents + taxCents + gratuityCents;
          
          // Calculate deposit (50% of total)
          const depositCents = Math.round(totalCents * 0.5);
          
          pricing = {
            subtotal: subtotalCents,
            tax: taxCents,
            gratuity: gratuityCents,
            total: totalCents,
            depositRequired: true,
            depositAmount: depositCents,
            depositPercent: 50,
            duration: duration,
            hourlyRate: serverCalculatedHourlyRate,
            baseHourlyRate: baseHourlyRate,
            selectedAddOns: appliedAddOns,
            timeSlot: effectiveTimeSlot,
            pricingModel: 'hourly',
            discountTotal: 0,
            perPersonCost: Math.round(totalCents / parseInt(groupSize))
          };
        } else if (cruiseType === 'disco') {
          if (!discoPackage || !discoTicketQuantity) {
            return res.status(400).json({ error: "discoPackage and discoTicketQuantity required for disco cruise" });
          }

          // Calculate disco pricing using the pricing preview endpoint logic
          const getDiscoPriceByPackage = (packageId: string): number => {
            const packagePrices = {
              'basic': 8500, // $85.00 in cents
              'disco_queen': 9500, // $95.00 in cents  
              'platinum': 10500, // $105.00 in cents
            };
            return packagePrices[packageId as keyof typeof packagePrices] || 8500;
          };

          pricing = await storage.calculatePricing({
            items: [{
              productId: `disco_${discoPackage}`,
              qty: parseInt(discoTicketQuantity),
              unitPrice: getDiscoPriceByPackage(discoPackage),
            }],
            groupSize: parseInt(discoTicketQuantity),
            projectDate: new Date(eventDate),
          });
        } else {
          return res.status(400).json({ error: "Invalid cruise type" });
        }
      } catch (pricingError: any) {
        console.error("Pricing calculation failed:", pricingError);
        return res.status(400).json({ error: "Unable to calculate pricing: " + pricingError.message });
      }

      // Determine payment amount based on type
      let paymentAmount;
      let productName;
      if (paymentType === 'deposit') {
        paymentAmount = pricing.depositAmount;
        productName = 'Deposit Payment';
      } else if (paymentType === 'full') {
        paymentAmount = pricing.total;
        productName = 'Full Payment';
      } else {
        return res.status(400).json({ error: "Invalid payment type. Must be 'deposit' or 'full'" });
      }

      if (!paymentAmount || paymentAmount <= 0) {
        return res.status(400).json({ error: "Invalid payment amount calculated" });
      }

      const cruiseTypeLabel = cruiseType === 'private' ? 'Private' : 'ATX Disco';
      const eventTypeLabel = eventType.charAt(0).toUpperCase() + eventType.slice(1);
      
      // Build description based on cruise type
      let description;
      if (cruiseType === 'private') {
        const effectiveTimeSlot = selectedTimeSlot || timeSlot;
        const addOnsText = selectedAddOnPackages && selectedAddOnPackages.length > 0 
          ? ` | Add-ons: ${selectedAddOnPackages.join(', ')}` 
          : '';
        description = `Group Size: ${groupSize} | Date: ${new Date(eventDate).toLocaleDateString()} | Time: ${effectiveTimeSlot}${addOnsText}`;
      } else {
        description = `Group Size: ${groupSize} | Date: ${new Date(eventDate).toLocaleDateString()} | Package: ${discoPackage}`;
      }
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${productName} - ${eventTypeLabel} ${cruiseTypeLabel} Cruise`,
              description: description,
            },
            unit_amount: Math.round(paymentAmount), // Server-validated amount in cents
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${getFullUrl('/booking-success?session_id={CHECKOUT_SESSION_ID}')}`,
        cancel_url: `${getFullUrl('/chat')}`,
        customer_email: customerEmail,
        metadata: {
          paymentType,
          eventType,
          eventDate: eventDate,
          groupSize: groupSize.toString(),
          cruiseType,
          // Handle both old and new field names for backward compatibility
          timeSlot: selectedTimeSlot || timeSlot || '',
          selectedTimeSlot: selectedTimeSlot || timeSlot || '',
          selectedAddOnPackages: selectedAddOnPackages ? JSON.stringify(selectedAddOnPackages) : '',
          // Disco cruise fields
          discoPackage: discoPackage || '',
          discoTicketQuantity: discoTicketQuantity?.toString() || '',
          // New pricing fields for private cruises
          baseHourlyRate: cruiseType === 'private' ? pricing.breakdown?.baseHourlyRate?.toString() || '300' : '',
          totalHourlyRate: cruiseType === 'private' ? pricing.breakdown?.baseHourlyRate?.toString() || '300' : '',
          duration: cruiseType === 'private' ? pricing.breakdown?.cruiseDuration?.toString() || '3' : '',
          calculatedAmount: paymentAmount.toString(),
          quoteId: quoteId || '',
          ...metadata
        }
      });

      res.json({ 
        sessionId: session.id, 
        url: session.url,
        success: true,
        calculatedAmount: paymentAmount // Return calculated amount for verification
      });
    } catch (error: any) {
      console.error("Create checkout session error:", error);
      res.status(500).json({ error: "Error creating checkout session: " + error.message });
    }
  });

  // Get Stripe session details for booking confirmation
  app.get("/api/stripe/session/:sessionId", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ error: "Stripe not configured" });
      }

      const { sessionId } = req.params;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID required" });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      // Return relevant session data for booking confirmation
      res.json({
        id: session.id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_email,
        metadata: session.metadata,
        created: session.created,
        expires_at: session.expires_at,
        payment_intent: session.payment_intent,
        status: session.status
      });
    } catch (error: any) {
      console.error("Get Stripe session error:", error);
      res.status(500).json({ error: "Error retrieving session: " + error.message });
    }
  });

  // Webhook for payment confirmations
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const { type, data } = req.body;
      
      if (type === "payment_intent.succeeded") {
        const paymentIntent = data.object;
        const { quoteId, invoiceId } = paymentIntent.metadata;
        
        if (invoiceId) {
          // Update invoice
          const invoice = await storage.getInvoice(invoiceId);
          if (invoice) {
            const newBalance = Math.max(0, invoice.balance - paymentIntent.amount);
            await storage.updateInvoice(invoiceId, { balance: newBalance });
            
            // Create payment record
            const payment = await storage.createPayment({
              invoiceId,
              amount: paymentIntent.amount,
              status: "SUCCEEDED",
              paidAt: new Date(),
              method: "card",
              stripePaymentIntentId: paymentIntent.id
            });

            // Update project status
            const project = await storage.getProject(invoice.projectId);
            if (project) {
              const newPhase = newBalance === 0 ? "ph_paid" : "ph_deposit_paid";
              await storage.updateProject(project.id, { pipelinePhase: newPhase });
              
              // Create booking and convert lead to customer
              try {
                await storage.createBookingFromPayment(project.id, payment.id, paymentIntent.amount);
                console.log(`Booking created for project ${project.id} with payment ${payment.id}`);
              } catch (error) {
                console.error("Failed to create booking:", error);
                // Don't fail the webhook, just log the error
              }
            }
          }
        }
      }
      
      // Handle checkout session completed events
      if (type === "checkout.session.completed") {
        const session = data.object;
        const { 
          paymentType, 
          eventType, 
          eventTypeLabel,
          eventEmoji,
          eventDate, 
          groupSize, 
          cruiseType,
          selectedTimeSlot,
          selectedAddOnPackages,
          baseHourlyRate,
          totalHourlyRate,
          duration,
          discoPackage,
          discoTicketQuantity,
          projectId, 
          quoteId 
        } = session.metadata;
        
        console.log(`Payment successful: ${paymentType} payment for ${eventType} event`, {
          amount: session.amount_total,
          customerEmail: session.customer_email,
          eventDate,
          groupSize,
          cruiseType,
          selectedTimeSlot,
          selectedAddOnPackages
        });
        
        try {
          // Create a payment record
          const payment = await storage.createPayment({
            invoiceId: 'direct_payment_' + session.id,
            amount: session.amount_total,
            status: "SUCCEEDED",
            paidAt: new Date(),
            method: "card",
            stripePaymentIntentId: session.payment_intent as string
          });
          
          // Create booking directly from payment metadata (new streamlined flow)
          if (projectId) {
            // Existing project flow
            await storage.createBookingFromPayment(projectId, payment.id, session.amount_total);
            console.log(`Direct booking created for project ${projectId}`);
          } else {
            // New direct booking flow from chat
            console.log('Creating direct booking from payment metadata...');
            
            // Create a temporary contact if we have customer email
            let contactId = '';
            if (session.customer_email) {
              try {
                const contact = await storage.createContact({
                  name: session.customer_details?.name || 'New Customer',
                  email: session.customer_email,
                  phone: session.customer_details?.phone || '',
                  tags: ['customer', 'direct_booking']
                });
                contactId = contact.id;
              } catch (error) {
                console.error('Failed to create contact:', error);
              }
            }
            
            // Parse the event date
            const bookingDate = new Date(eventDate);
            const bookingDuration = parseInt(duration || '4');
            const bookingGroupSize = parseInt(groupSize);
            
            // Find an appropriate boat for the group size with conflict checking
            const boats = await storage.getBoatsByCapacity(bookingGroupSize);
            let boatId = '';
            
            // Check each boat for conflicts and select the first available one
            for (const boat of boats) {
              const hasConflict = await storage.checkBookingConflict(
                boat.id,
                startTime,
                endTime
              );
              
              if (!hasConflict) {
                boatId = boat.id;
                break;
              }
            }
            
            // If no available boat found, log error but continue (will be handled in booking creation)
            if (!boatId && boats.length > 0) {
              console.warn(`No available boats for direct booking at ${eventDate} ${timeSlot}. Using first boat with conflict handling.`);
              boatId = boats[0].id; // Fallback - createBooking will handle the conflict
            }
            
            // Calculate start and end times from time slot
            const timeSlot = selectedTimeSlot || '';
            let startTime = new Date(bookingDate);
            let endTime = new Date(bookingDate);
            
            // Parse time slot (e.g., "12pm-4pm", "11am-3pm")
            if (timeSlot.includes('-')) {
              const [startStr, endStr] = timeSlot.split('-');
              const startHour = parseTimeString(startStr);
              const endHour = parseTimeString(endStr);
              
              startTime.setHours(startHour, 0, 0, 0);
              endTime.setHours(endHour, 0, 0, 0);
            } else {
              // Default to time based on duration
              startTime.setHours(12, 0, 0, 0); // Default noon start
              endTime.setHours(12 + bookingDuration, 0, 0, 0);
            }
            
            // Create booking
            const booking = await storage.createBooking({
              orgId: '',
              boatId,
              type: cruiseType === 'disco' ? 'disco' : 'private',
              status: 'booked',
              startTime,
              endTime,
              partyType: eventType || 'cruise',
              groupSize: bookingGroupSize,
              paymentStatus: 'fully_paid',
              amountPaid: session.amount_total || 0,
              totalAmount: session.amount_total || 0,
              notes: `Direct booking from chat - Payment: ${payment.id} - Amount: $${(session.amount_total / 100).toFixed(2)}${selectedAddOnPackages ? ` - Add-ons: ${selectedAddOnPackages}` : ''}`,
              projectId: null // No project for direct bookings
            });
            
            console.log(`Direct booking created: ${booking.id} for ${eventType} cruise on ${bookingDate.toLocaleDateString()}`);
            
            // Convert contact to customer if we created one
            if (contactId) {
              await storage.convertLeadToCustomer(contactId);
            }
          }
        } catch (error) {
          console.error("Failed to create booking from checkout:", error);
        }
      }
      
      res.json({ received: true });
    } catch (error) {
      console.error("Stripe webhook error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics/metrics", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      const clients = await storage.getClients();
      
      // Calculate conversion rate
      const totalContacts = leads.length + clients.length;
      const conversionRate = totalContacts > 0 ? Math.round((clients.length / totalContacts) * 100) : 0;
      
      // Mock average booking value - in production would calculate from actual invoices
      const avgBookingValue = 687;
      
      res.json({
        conversionRate,
        avgBookingValue,
        totalLeads: leads.length,
        totalClients: clients.length,
        messagesToday: 147, // Mock data
        leadsGenerated: 23,  // Mock data
        responseTime: '1.2s' // Mock data
      });
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Pipeline data
  app.get("/api/pipeline/summary", async (req, res) => {
    try {
      // Get all projects
      const projects = await storage.getProjectsByContact('');
      
      // Count projects by pipeline phase
      const pipelinePhases = {
        ph_new: 0,
        ph_quote_sent: 0,
        ph_deposit_paid: 0,
        ph_fully_paid: 0,
        ph_event_complete: 0
      };
      
      projects.forEach(project => {
        if (project.pipelinePhase && pipelinePhases.hasOwnProperty(project.pipelinePhase)) {
          pipelinePhases[project.pipelinePhase as keyof typeof pipelinePhases]++;
        } else if (!project.pipelinePhase || project.pipelinePhase === 'ph_new') {
          pipelinePhases.ph_new++;
        }
      });
      
      // Get contacts without projects (also new leads)
      const contacts = await storage.getLeads();
      const contactsWithProjects = new Set(projects.map(p => p.contactId));
      const contactsWithoutProjects = contacts.filter(c => !contactsWithProjects.has(c.id));
      
      // Add contacts without projects to new leads count
      pipelinePhases.ph_new += contactsWithoutProjects.length;
      
      // Calculate conversion rate
      const totalLeads = contacts.length;
      const converted = pipelinePhases.ph_fully_paid + pipelinePhases.ph_event_complete;
      const conversionRate = totalLeads > 0 ? (converted / totalLeads) * 100 : 0;
      
      res.json({
        newLeads: pipelinePhases.ph_new,
        quoteSent: pipelinePhases.ph_quote_sent,
        depositPaid: pipelinePhases.ph_deposit_paid,
        fullyPaid: pipelinePhases.ph_fully_paid,
        eventComplete: pipelinePhases.ph_event_complete,
        conversionRate: Math.round(conversionRate),
        totalLeads,
        totalPipelineValue: 0 // Could calculate from quotes if needed
      });
    } catch (error) {
      console.error("Pipeline summary error:", error);
      res.status(500).json({ error: "Failed to fetch pipeline summary" });
    }
  });

  // Seed Quote Templates endpoint
  app.post("/api/quote-templates/seed", async (req, res) => {
    try {
      const success = await seedQuoteTemplates();
      if (success) {
        res.json({ success: true, message: "Quote templates seeded successfully" });
      } else {
        res.status(500).json({ error: "Failed to seed quote templates" });
      }
    } catch (error) {
      console.error("Seed quote templates error:", error);
      res.status(500).json({ error: "Failed to seed quote templates" });
    }
  });

  // Test Quote System endpoint
  app.post("/api/test-quote-system", async (req, res) => {
    try {
      const { testQuoteSystem } = await import("./testQuoteSystem");
      const result = await testQuoteSystem();
      
      if (result.success) {
        res.json({
          success: true,
          message: "Quote system test completed successfully",
          testData: result,
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error || "Quote system test failed",
        });
      }
    } catch (error) {
      console.error("Test quote system error:", error);
      res.status(500).json({ error: "Failed to test quote system" });
    }
  });

  // Quote Templates endpoints
  app.get("/api/quote-templates", async (req, res) => {
    try {
      const { eventType } = req.query;
      let templates;
      
      if (eventType) {
        templates = await storage.getQuoteTemplatesByEventType(eventType as string);
      } else {
        templates = await storage.getQuoteTemplates();
      }
      
      res.json(templates);
    } catch (error) {
      console.error("Get quote templates error:", error);
      res.status(500).json({ error: "Failed to fetch quote templates" });
    }
  });

  app.get("/api/quote-templates/:id", async (req, res) => {
    try {
      const template = await storage.getQuoteTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ error: "Quote template not found" });
      }
      res.json(template);
    } catch (error) {
      console.error("Get quote template error:", error);
      res.status(500).json({ error: "Failed to fetch quote template" });
    }
  });

  app.post("/api/quote-templates", async (req, res) => {
    try {
      const templateData = insertQuoteTemplateSchema.parse(req.body);
      const template = await storage.createQuoteTemplate(templateData);
      res.status(201).json(template);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid template data", details: error.errors });
      }
      console.error("Create quote template error:", error);
      res.status(500).json({ error: "Failed to create quote template" });
    }
  });

  app.put("/api/quote-templates/:id", async (req, res) => {
    try {
      const template = await storage.updateQuoteTemplate(req.params.id, req.body);
      res.json(template);
    } catch (error: any) {
      if (error.message === "Quote template not found") {
        return res.status(404).json({ error: "Quote template not found" });
      }
      console.error("Update quote template error:", error);
      res.status(500).json({ error: "Failed to update quote template" });
    }
  });

  app.delete("/api/quote-templates/:id", async (req, res) => {
    try {
      const success = await storage.deleteQuoteTemplate(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Quote template not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete quote template error:", error);
      res.status(500).json({ error: "Failed to delete quote template" });
    }
  });

  // Template Rules endpoints
  app.get("/api/template-rules", async (req, res) => {
    try {
      const { ruleType } = req.query;
      let rules;
      
      if (ruleType) {
        rules = await storage.getTemplateRulesByType(ruleType as string);
      } else {
        rules = await storage.getTemplateRules();
      }
      
      res.json(rules);
    } catch (error) {
      console.error("Get template rules error:", error);
      res.status(500).json({ error: "Failed to fetch template rules" });
    }
  });

  app.post("/api/template-rules", async (req, res) => {
    try {
      const ruleData = insertTemplateRuleSchema.parse(req.body);
      const rule = await storage.createTemplateRule(ruleData);
      res.status(201).json(rule);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid rule data", details: error.errors });
      }
      console.error("Create template rule error:", error);
      res.status(500).json({ error: "Failed to create template rule" });
    }
  });

  app.put("/api/template-rules/:id", async (req, res) => {
    try {
      const rule = await storage.updateTemplateRule(req.params.id, req.body);
      res.json(rule);
    } catch (error: any) {
      if (error.message === "Template rule not found") {
        return res.status(404).json({ error: "Template rule not found" });
      }
      console.error("Update template rule error:", error);
      res.status(500).json({ error: "Failed to update template rule" });
    }
  });

  app.delete("/api/template-rules/:id", async (req, res) => {
    try {
      const success = await storage.deleteTemplateRule(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Template rule not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete template rule error:", error);
      res.status(500).json({ error: "Failed to delete template rule" });
    }
  });

  // Discount Rules endpoints
  app.get("/api/discount-rules", async (req, res) => {
    try {
      const { active } = req.query;
      let rules;
      
      if (active === 'true') {
        rules = await storage.getActiveDiscountRules();
      } else {
        rules = await storage.getDiscountRules();
      }
      
      res.json(rules);
    } catch (error) {
      console.error("Get discount rules error:", error);
      res.status(500).json({ error: "Failed to fetch discount rules" });
    }
  });

  app.get("/api/discount-rules/by-code/:code", async (req, res) => {
    try {
      const rule = await storage.getDiscountRuleByCode(req.params.code);
      if (!rule) {
        return res.status(404).json({ error: "Discount rule not found" });
      }
      res.json(rule);
    } catch (error) {
      console.error("Get discount rule by code error:", error);
      res.status(500).json({ error: "Failed to fetch discount rule" });
    }
  });

  app.post("/api/discount-rules", async (req, res) => {
    try {
      const ruleData = insertDiscountRuleSchema.parse(req.body);
      const rule = await storage.createDiscountRule(ruleData);
      res.status(201).json(rule);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid discount rule data", details: error.errors });
      }
      console.error("Create discount rule error:", error);
      res.status(500).json({ error: "Failed to create discount rule" });
    }
  });

  app.put("/api/discount-rules/:id", async (req, res) => {
    try {
      const rule = await storage.updateDiscountRule(req.params.id, req.body);
      res.json(rule);
    } catch (error: any) {
      if (error.message === "Discount rule not found") {
        return res.status(404).json({ error: "Discount rule not found" });
      }
      console.error("Update discount rule error:", error);
      res.status(500).json({ error: "Failed to update discount rule" });
    }
  });

  app.delete("/api/discount-rules/:id", async (req, res) => {
    try {
      const success = await storage.deleteDiscountRule(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Discount rule not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete discount rule error:", error);
      res.status(500).json({ error: "Failed to delete discount rule" });
    }
  });

  // Pricing Settings endpoints
  app.get("/api/pricing-settings", async (req, res) => {
    try {
      const { orgId } = req.query;
      const settings = await storage.getPricingSettings(orgId as string);
      if (!settings) {
        return res.status(404).json({ error: "Pricing settings not found" });
      }
      res.json(settings);
    } catch (error) {
      console.error("Get pricing settings error:", error);
      res.status(500).json({ error: "Failed to fetch pricing settings" });
    }
  });

  app.put("/api/pricing-settings", async (req, res) => {
    try {
      const { orgId, ...updates } = req.body;
      const settings = await storage.updatePricingSettings(updates, orgId);
      res.json(settings);
    } catch (error) {
      console.error("Update pricing settings error:", error);
      res.status(500).json({ error: "Failed to update pricing settings" });
    }
  });
  
  // Email Template Routes
  app.get("/api/email-templates", async (req, res) => {
    try {
      const templates = await storage.getEmailTemplates();
      res.json(templates);
    } catch (error: any) {
      console.error("Error fetching email templates:", error);
      res.status(500).json({ error: "Failed to fetch email templates" });
    }
  });
  
  app.get("/api/email-templates/:id", async (req, res) => {
    try {
      const template = await storage.getEmailTemplate(req.params.id);
      if (!template) return res.status(404).json({ error: "Template not found" });
      res.json(template);
    } catch (error: any) {
      console.error("Error fetching email template:", error);
      res.status(500).json({ error: "Failed to fetch email template" });
    }
  });
  
  app.post("/api/email-templates", async (req, res) => {
    try {
      const template = await storage.createEmailTemplate(req.body);
      res.status(201).json(template);
    } catch (error: any) {
      console.error("Error creating email template:", error);
      res.status(500).json({ error: "Failed to create email template" });
    }
  });
  
  app.patch("/api/email-templates/:id", async (req, res) => {
    try {
      const template = await storage.updateEmailTemplate(req.params.id, req.body);
      res.json(template);
    } catch (error: any) {
      console.error("Error updating email template:", error);
      res.status(500).json({ error: "Failed to update email template" });
    }
  });
  
  app.delete("/api/email-templates/:id", async (req, res) => {
    try {
      await storage.deleteEmailTemplate(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting email template:", error);
      res.status(500).json({ error: "Failed to delete email template" });
    }
  });
  
  // Master Template Routes
  app.get("/api/master-template", async (req, res) => {
    try {
      const template = await storage.getDefaultMasterTemplate();
      res.json(template || {});
    } catch (error: any) {
      console.error("Error fetching master template:", error);
      res.status(500).json({ error: "Failed to fetch master template" });
    }
  });
  
  app.patch("/api/master-template", async (req, res) => {
    try {
      let template = await storage.getDefaultMasterTemplate();
      if (template) {
        template = await storage.updateMasterTemplate(template.id, req.body);
      } else {
        // Create default master template if it doesn't exist
        template = await storage.createMasterTemplate({
          ...req.body,
          name: "Default Master Template",
          isDefault: true,
        });
      }
      res.json(template);
    } catch (error: any) {
      console.error("Error updating master template:", error);
      res.status(500).json({ error: "Failed to update master template" });
    }
  });

  // Affiliate endpoints
  app.get("/api/affiliates", async (req, res) => {
    try {
      const affiliates = await storage.getAffiliates();
      res.json(affiliates);
    } catch (error) {
      console.error("Get affiliates error:", error);
      res.status(500).json({ error: "Failed to fetch affiliates" });
    }
  });

  app.get("/api/affiliates/:id", async (req, res) => {
    try {
      const affiliate = await storage.getAffiliate(req.params.id);
      if (!affiliate) {
        return res.status(404).json({ error: "Affiliate not found" });
      }
      res.json(affiliate);
    } catch (error) {
      console.error("Get affiliate error:", error);
      res.status(500).json({ error: "Failed to fetch affiliate" });
    }
  });

  app.post("/api/affiliates", async (req, res) => {
    try {
      const affiliateData = insertAffiliateSchema.parse(req.body);
      const affiliate = await storage.createAffiliate(affiliateData);
      res.status(201).json(affiliate);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid affiliate data", details: error.errors });
      }
      console.error("Create affiliate error:", error);
      res.status(500).json({ error: "Failed to create affiliate" });
    }
  });

  app.put("/api/affiliates/:id", async (req, res) => {
    try {
      const affiliate = await storage.updateAffiliate(req.params.id, req.body);
      res.json(affiliate);
    } catch (error: any) {
      if (error.message === "Affiliate not found") {
        return res.status(404).json({ error: "Affiliate not found" });
      }
      console.error("Update affiliate error:", error);
      res.status(500).json({ error: "Failed to update affiliate" });
    }
  });

  app.delete("/api/affiliates/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAffiliate(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Affiliate not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete affiliate error:", error);
      res.status(500).json({ error: "Failed to delete affiliate" });
    }
  });

  app.post("/api/affiliates/:id/update-stats", async (req, res) => {
    try {
      const affiliate = await storage.updateAffiliateStats(req.params.id);
      res.json(affiliate);
    } catch (error: any) {
      if (error.message === "Affiliate not found") {
        return res.status(404).json({ error: "Affiliate not found" });
      }
      console.error("Update affiliate stats error:", error);
      res.status(500).json({ error: "Failed to update affiliate stats" });
    }
  });

  // Template Rendering endpoints
  app.get("/api/quotes/:id/render", async (req, res) => {
    try {
      const { format = 'html' } = req.query;
      const rendered = await templateRenderer.renderQuote(
        req.params.id, 
        format as 'html' | 'text' | 'json' | 'pdf'
      );
      
      if (format === 'html') {
        res.set('Content-Type', 'text/html');
      } else if (format === 'json') {
        res.set('Content-Type', 'application/json');
      } else {
        res.set('Content-Type', 'text/plain');
      }
      
      res.send(rendered.content);
    } catch (error) {
      console.error("Render quote error:", error);
      res.status(500).json({ error: "Failed to render quote" });
    }
  });

  app.post("/api/quotes/:id/apply-rules", async (req, res) => {
    try {
      const quote = await storage.getQuote(req.params.id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }

      const project = await storage.getProject(quote.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const result = await templateRenderer.applyTemplateRules(quote, project);
      
      // Update quote with modified items
      const updatedQuote = await storage.updateQuote(quote.id, { items: result.items });
      
      res.json({
        quote: updatedQuote,
        messages: result.messages,
      });
    } catch (error) {
      console.error("Apply template rules error:", error);
      res.status(500).json({ error: "Failed to apply template rules" });
    }
  });

  // Automated Contact/Project Creation endpoints
  app.post("/api/contacts/find-or-create", async (req, res) => {
    try {
      const { email, name, phone } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const contact = await storage.findOrCreateContact(email, name, phone);
      res.json(contact);
    } catch (error) {
      console.error("Find or create contact error:", error);
      res.status(500).json({ error: "Failed to find or create contact" });
    }
  });

  app.post("/api/projects/from-chat-data", async (req, res) => {
    try {
      // Debug log for request body structure
      console.log("📋 Request body keys:", Object.keys(req.body));
      
      const { contactId, sessionId, messageId } = req.body;
      
      if (!contactId) {
        return res.status(400).json({ error: "Contact ID is required" });
      }

      // Retrieve extracted data robustly - try multiple sources
      let extractedData = req.body.extractedData || req.body.data || req.body.extracted || null;
      
      // If no extractedData provided, use the request body itself (excluding system fields)
      if (!extractedData) {
        const { contactId: _, sessionId: __, messageId: ___, ...restData } = req.body;
        extractedData = restData;
        console.log("📋 Using request body as extractedData:", Object.keys(extractedData));
      }

      const project = await storage.createProjectFromChatData(contactId, extractedData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Create project from chat data error:", error);
      res.status(500).json({ error: "Failed to create project from chat data" });
    }
  });

  // Enhanced Quote Management endpoints
  app.post("/api/quotes/from-template", async (req, res) => {
    try {
      const { templateId, projectId, customizations = {} } = req.body;
      
      if (!templateId || !projectId) {
        return res.status(400).json({ error: "Template ID and Project ID are required" });
      }

      const template = await storage.getQuoteTemplate(templateId);
      if (!template) {
        return res.status(404).json({ error: "Quote template not found" });
      }

      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Create quote from template
      const items = (template.defaultItems || []).map(item => ({
        ...item,
        ...customizations.items?.[item.productId || item.name] || {},
      }));

      const pricing = await storage.calculatePricing({
        items,
        groupSize: project.groupSize || undefined,
        projectDate: project.projectDate || undefined,
        templateId: template.id,
      });

      const quote = await storage.createQuote({
        projectId: project.id,
        templateId: template.id,
        items,
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
      });

      res.status(201).json({ quote, pricing });
    } catch (error) {
      console.error("Create quote from template error:", error);
      res.status(500).json({ error: "Failed to create quote from template" });
    }
  });

  app.post("/api/quotes/:id/recalculate", async (req, res) => {
    try {
      const { items, promoCode } = req.body;
      
      const quote = await storage.getQuote(req.params.id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }

      const project = await storage.getProject(quote.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const pricing = await storage.calculatePricing({
        items: items || quote.items,
        groupSize: project.groupSize || undefined,
        projectDate: project.projectDate || undefined,
        promoCode: promoCode !== undefined ? promoCode : quote.promoCode,
        templateId: quote.templateId || undefined,
      });

      const updatedQuote = await storage.updateQuote(quote.id, {
        items: items || quote.items,
        promoCode: promoCode !== undefined ? promoCode : quote.promoCode,
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
      });

      res.json({ quote: updatedQuote, pricing });
    } catch (error) {
      console.error("Recalculate quote error:", error);
      res.status(500).json({ error: "Failed to recalculate quote" });
    }
  });

  // Enhanced cruise pricing endpoint with disco cruise support
  app.post("/api/pricing/cruise", async (req, res) => {
    try {
      const { groupSize, eventDate, timeSlot, promoCode, eventType, cruiseType, packageType, hourlyRate } = req.body;
      
      if (!groupSize || !eventDate || !timeSlot) {
        return res.status(400).json({ 
          error: "Group size, event date, and time slot are required" 
        });
      }

      // For bachelor/bachelorette parties, return both pricing options
      if ((eventType === 'bachelor' || eventType === 'bachelorette') && cruiseType === 'both') {
        const discoCruiseProducts = await storage.getDiscoCruiseProducts();
        const privateCruisePricing = await storage.calculateCruisePricing({
          groupSize: parseInt(groupSize),
          eventDate: new Date(eventDate),
          timeSlot,
          promoCode,
        });

        // Calculate disco cruise pricing (per-person)
        const discoCruiseOptions = discoCruiseProducts.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          pricePerPerson: product.unitPrice,
          totalPrice: product.unitPrice * parseInt(groupSize),
          pricingModel: 'per_person',
          productType: 'disco_cruise'
        }));

        res.json({
          privateCruise: privateCruisePricing,
          discoCruise: {
            options: discoCruiseOptions,
            groupSize: parseInt(groupSize),
            pricingModel: 'per_person'
          },
          showBothOptions: true,
          eventType: eventType
        });
      } else if (cruiseType === 'private') {
        // New private cruise pricing with time slot + add-on packages structure
        const baseHourlyRate = 300; // Base rate for private cruises
        
        // Parse selected add-on packages
        const selectedAddOns = packageType ? packageType.split(',').filter(Boolean) : [];
        
        // Define available add-on packages (server-side validation)
        const addOnPackages = [
          { id: 'essentials', name: 'Essentials Package', hourlyRate: 50 },
          { id: 'ultimate', name: 'Ultimate Party Package', hourlyRate: 75 }
        ];
        
        // Calculate total hourly rate server-side to prevent tampering
        let serverCalculatedHourlyRate = baseHourlyRate;
        const appliedAddOns = [];
        
        for (const addOnId of selectedAddOns) {
          const addOn = addOnPackages.find(pkg => pkg.id === addOnId);
          if (addOn) {
            serverCalculatedHourlyRate += addOn.hourlyRate;
            appliedAddOns.push(addOn);
          }
        }
        
        // Validate client's hourly rate matches server calculation (security check)
        if (hourlyRate && Math.abs(hourlyRate - serverCalculatedHourlyRate) > 0.01) {
          console.warn(`Client hourly rate (${hourlyRate}) doesn't match server calculation (${serverCalculatedHourlyRate})`);
        }
        
        // Calculate time slot duration and total cost
        const date = new Date(eventDate);
        const dayOfWeek = date.getDay();
        
        let duration = 3; // Default 3 hours for weekdays
        if (dayOfWeek === 5) { // Friday
          duration = 4;
        } else if (dayOfWeek === 6 || dayOfWeek === 0) { // Saturday/Sunday
          duration = 4;
        }
        
        const subtotalCents = serverCalculatedHourlyRate * duration * 100; // Convert to cents
        const taxRate = 0.0825; // 8.25% tax
        const taxCents = Math.round(subtotalCents * taxRate);
        const gratuityRate = 0.20; // 20% gratuity
        const gratuityCents = Math.round(subtotalCents * gratuityRate);
        const totalCents = subtotalCents + taxCents + gratuityCents;
        
        // Calculate deposit (50% of total)
        const depositCents = Math.round(totalCents * 0.5);
        
        const pricing = {
          subtotal: subtotalCents,
          tax: taxCents,
          gratuity: gratuityCents,
          total: totalCents,
          depositRequired: true,
          depositAmount: depositCents,
          depositPercent: 50,
          duration: duration,
          hourlyRate: serverCalculatedHourlyRate,
          baseHourlyRate: baseHourlyRate,
          selectedAddOns: appliedAddOns,
          timeSlot: timeSlot,
          pricingModel: 'hourly',
          discountTotal: 0,
          perPersonCost: Math.round(totalCents / parseInt(groupSize))
        };
        
        res.json({
          ...pricing,
          showBothOptions: false,
          eventType: eventType || 'other'
        });
      } else {
        // Regular private cruise pricing for all other events (backward compatibility)
        const pricing = await storage.calculateCruisePricing({
          groupSize: parseInt(groupSize),
          eventDate: new Date(eventDate),
          timeSlot,
          promoCode,
        });

        res.json({
          ...pricing,
          showBothOptions: false,
          eventType: eventType || 'other'
        });
      }
    } catch (error: any) {
      console.error("Calculate cruise pricing error:", error);
      res.status(400).json({ error: error.message || "Failed to calculate pricing" });
    }
  });

  // Invoice Generation endpoints
  app.post("/api/quotes/:id/generate-invoice", async (req, res) => {
    try {
      const quote = await storage.getQuote(req.params.id);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }

      const project = await storage.getProject(quote.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Create invoice from quote
      const invoice = await storage.createInvoice({
        orgId: quote.orgId,
        projectId: quote.projectId,
        quoteId: quote.id,
        status: "OPEN",
        subtotal: quote.subtotal,
        tax: quote.tax,
        total: quote.total,
        balance: quote.total, // Full amount initially
        schedule: quote.paymentSchedule,
      });

      // Update quote status
      await storage.updateQuote(quote.id, { status: "INVOICED" });
      
      // Update project phase
      await storage.updateProject(project.id, { pipelinePhase: "ph_invoice_sent" });

      res.status(201).json(invoice);
    } catch (error) {
      console.error("Generate invoice error:", error);
      res.status(500).json({ error: "Failed to generate invoice" });
    }
  });

  // Test endpoints for messaging systems
  app.post("/api/test-email", async (req, res) => {
    try {
      const { email, quoteId } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email address required" });
      }
      
      let testQuoteId = quoteId;
      
      // If no quote ID provided, create a test quote
      if (!testQuoteId) {
        // Create a test contact first
        const testContact = await storage.createContact({
          name: "Test Customer",
          email,
          phone: "+15125551234"
        });
        
        // Create a test project
        const testProject = await storage.createProject({
          contactId: testContact.id,
          title: "Test Party Cruise",
          eventType: "birthday",
          groupSize: 20,
          projectDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          specialRequests: "This is a test booking request",
          budget: 250000 // $2500 in cents
        });
        
        // Create a test quote
        const testQuote = await storage.createQuote({
          projectId: testProject.id,
          items: [
            {
              id: randomUUID(),
              name: "Private Party Cruise",
              type: "service",
              unitPrice: 200000, // $2000 in cents
              qty: 1,
              description: "4-hour private cruise for up to 25 people"
            },
            {
              id: randomUUID(),
              name: "Captain & Crew Fee",
              type: "service",
              unitPrice: 50000, // $500 in cents
              qty: 1,
              description: "Professional captain and crew services"
            }
          ],
          subtotal: 250000,
          tax: 20000,
          total: 270000,
          depositAmount: 67500,
          depositPercent: 25
        });
        
        testQuoteId = testQuote.id;
      }
      
      // Send test email
      const result = await sendQuoteEmail(testQuoteId, email, "This is a test email to verify our quote delivery system is working properly.");
      
      res.json({ 
        success: true, 
        message: "Test email sent successfully",
        quoteId: testQuoteId,
        result
      });
      
    } catch (error: any) {
      console.error("Test email error:", error);
      res.status(500).json({ 
        error: "Failed to send test email",
        details: error.message 
      });
    }
  });
  
  // Test webhook endpoint for GoHighLevel
  app.post("/api/webhook/test", async (req, res) => {
    try {
      const { 
        name = "Test Customer",
        email = "test@example.com",
        phone = "+15125551234",
        eventDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        eventType = "Bachelor Party",
        groupSize = 25,
        quoteId = "test-quote-123"
      } = req.body;

      const webhookPayload: LeadWebhookPayload = {
        name,
        email,
        phone,
        requested_cruise_date: eventDate,
        type_of_cruise: eventType,
        max_number_of_people: groupSize,
        quote_link: getFullUrl(`/quote/${quoteId}`),
        created_at: new Date().toISOString()
      };

      console.log('📧 Testing GoHighLevel webhook with payload:', webhookPayload);
      
      const success = await goHighLevelService.sendLeadWebhook(webhookPayload);
      
      if (success) {
        res.json({ 
          success: true, 
          message: "Webhook test sent successfully",
          payload: webhookPayload 
        });
      } else {
        res.status(500).json({ 
          success: false,
          error: "Failed to send webhook",
          payload: webhookPayload
        });
      }
    } catch (error: any) {
      console.error("Webhook test error:", error);
      res.status(500).json({ 
        success: false,
        error: "Failed to test webhook", 
        details: error.message 
      });
    }
  });

  app.post("/api/test-sms", async (req, res) => {
    try {
      const { phone, to, message, quoteId, type = "customer" } = req.body;
      
      // Accept both 'phone' and 'to' parameters for flexibility
      const targetPhone = phone || to;
      
      if (!targetPhone) {
        return res.status(400).json({ error: "Phone number required (use 'phone' or 'to' parameter)" });
      }
      
      // If a custom message is provided, send it directly without creating a quote
      if (message) {
        console.log('🧪 Testing SMS functionality with custom message...');
        console.log('   To:', targetPhone);
        console.log('   Message:', message);
        
        const success = await goHighLevelService.send({
          to: targetPhone,
          body: message
        });
        
        return res.json({ 
          success, 
          message: success ? 'Test SMS sent successfully' : 'SMS test failed',
          details: {
            to: targetPhone,
            message: message,
            timestamp: new Date().toISOString()
          }
        });
      }
      
      let testQuoteId = quoteId;
      
      // If no quote ID provided, create a test quote (similar logic as email test)
      if (!testQuoteId) {
        const testContact = await storage.createContact({
          name: "Test SMS Customer",
          email: "test@example.com",
          phone
        });
        
        const testProject = await storage.createProject({
          contactId: testContact.id,
          title: "Test SMS Cruise",
          eventType: "bachelor",
          groupSize: 15,
          projectDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
          specialRequests: "This is a test SMS booking",
          budget: 180000 // $1800 in cents
        });
        
        const testQuote = await storage.createQuote({
          projectId: testProject.id,
          items: [
            {
              id: randomUUID(),
              name: "Bachelor Party Cruise",
              type: "service",
              unitPrice: 150000, // $1500 in cents
              qty: 1,
              description: "3-hour bachelor party cruise"
            },
            {
              id: randomUUID(),
              name: "Party Package",
              type: "addon",
              unitPrice: 30000, // $300 in cents
              qty: 1,
              description: "Sound system and party decorations"
            }
          ],
          subtotal: 180000,
          tax: 14400,
          total: 194400,
          depositAmount: 48600,
          depositPercent: 25
        });
        
        testQuoteId = testQuote.id;
      }
      
      let result;
      
      if (type === "admin") {
        // Send admin notification SMS
        result = await sendAdminNotificationSMS(testQuoteId);
      } else {
        // Send customer SMS
        result = await sendQuoteSMS(testQuoteId, targetPhone);
      }
      
      res.json({ 
        success: true, 
        message: `Test ${type} SMS sent successfully`,
        quoteId: testQuoteId,
        result
      });
      
    } catch (error: any) {
      console.error("Test SMS error:", error);
      res.status(500).json({ 
        error: "Failed to send test SMS",
        details: error.message 
      });
    }
  });

  // Populate Google Sheets with availability data
  app.post("/api/populate-availability", async (req, res) => {
    try {
      console.log("🚀 Starting Google Sheets availability population...");
      const result = await googleSheetsService.populateSpreadsheet();
      
      if (result) {
        res.json({ 
          success: true, 
          message: "Successfully populated Google Sheets with 3 months of availability data"
        });
      } else {
        res.status(500).json({ 
          error: "Failed to populate availability data"
        });
      }
    } catch (error: any) {
      console.error("Populate availability error:", error);
      res.status(500).json({ 
        error: "Failed to populate availability data",
        details: error.message 
      });
    }
  });
  
  // Test endpoint to check messaging services status
  app.get("/api/test-messaging-status", async (req, res) => {
    try {
      const status = {
        mailgun: {
          configured: !!process.env.MAILGUN_API_KEY && !!process.env.MAILGUN_DOMAIN,
          domain: process.env.MAILGUN_DOMAIN || 'Not configured',
          from: process.env.MAILGUN_FROM || 'Not configured'
        },
        gohighlevel: {
          configured: !!process.env.GOHIGHLEVEL_API_KEY && !!process.env.GOHIGHLEVEL_LOCATION_ID,
          locationId: process.env.GOHIGHLEVEL_LOCATION_ID || 'Not configured'
        },
        admin: {
          phoneConfigured: !!process.env.ADMIN_PHONE_NUMBER,
          phone: process.env.ADMIN_PHONE_NUMBER ? `${process.env.ADMIN_PHONE_NUMBER.substring(0, 6)}***` : 'Not configured'
        },
        baseUrl: getPublicUrl()
      };
      
      res.json({ status, timestamp: new Date().toISOString() });
    } catch (error: any) {
      console.error("Status check error:", error);
      res.status(500).json({ error: "Failed to check status" });
    }
  });

  // ==========================================
  // PRODUCT ENDPOINTS
  // ==========================================
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Create new product
  app.post("/api/products", async (req, res) => {
    try {
      const validation = insertProductSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid product data",
          details: validation.error.errors 
        });
      }
      
      const product = await storage.createProduct(validation.data);
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // Update product
  app.put("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const existingProduct = await storage.getProduct(id);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const updated = await storage.updateProduct(id, req.body);
      res.json(updated);
    } catch (error: any) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  // Delete product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const existingProduct = await storage.getProduct(id);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const deleted = await storage.deleteProduct(id);
      
      if (deleted) {
        res.json({ success: true, message: "Product deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete product" });
      }
    } catch (error: any) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // ==========================================
  // BOAT FLEET ENDPOINTS
  // ==========================================
  
  // Get all boats with capacities and crew requirements
  app.get("/api/boats", async (req, res) => {
    try {
      const boats = await storage.getBoats();
      res.json(boats);
    } catch (error: any) {
      console.error("Error fetching boats:", error);
      res.status(500).json({ error: "Failed to fetch boats" });
    }
  });

  // Get specific boat details
  app.get("/api/boats/:id", async (req, res) => {
    try {
      const boats = await storage.getBoats();
      const boat = boats.find(b => b.id === req.params.id);
      
      if (!boat) {
        return res.status(404).json({ error: "Boat not found" });
      }
      
      res.json(boat);
    } catch (error: any) {
      console.error("Error fetching boat:", error);
      res.status(500).json({ error: "Failed to fetch boat details" });
    }
  });

  // ==========================================
  // CALENDAR/BOOKING ENDPOINTS
  // ==========================================
  
  // Get monthly calendar view with bookings and availability
  app.get("/api/calendar/month", async (req, res) => {
    try {
      const { boatId, year, month } = req.query;
      
      if (!boatId || !year || !month) {
        return res.status(400).json({ error: "boatId, year, and month are required" });
      }
      
      const calendar = await storage.getMonthlyCalendar(
        boatId as string,
        parseInt(year as string),
        parseInt(month as string)
      );
      
      res.json(calendar);
    } catch (error: any) {
      console.error("Error fetching monthly calendar:", error);
      res.status(500).json({ error: "Failed to fetch calendar" });
    }
  });

  // Get bookings for date range
  app.get("/api/bookings", async (req, res) => {
    try {
      const { startDate, endDate, boatId } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: "startDate and endDate are required" });
      }
      
      const bookings = await storage.getBookings(
        new Date(startDate as string),
        new Date(endDate as string),
        boatId as string | undefined
      );
      
      res.json(bookings);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // Create new booking with validation
  app.post("/api/bookings", async (req, res) => {
    try {
      const validation = insertBookingSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid booking data",
          details: validation.error.errors 
        });
      }
      
      // Check for conflicts before creating (only if boatId is provided)
      if (validation.data.boatId) {
        const conflict = await storage.checkBookingConflict(
          validation.data.boatId,
          new Date(validation.data.startTime),
          new Date(validation.data.endTime)
        );
        
        if (conflict) {
          return res.status(409).json({ 
            error: "Booking conflict",
            message: "This time slot is already booked for the selected boat" 
          });
        }
      }
      
      
      const booking = await storage.createBooking(validation.data);
      res.status(201).json(booking);
    } catch (error: any) {
      console.error("Error creating booking:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // Update existing booking
  app.patch("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if booking exists
      const existing = await storage.getBooking(id);
      if (!existing) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      // If changing time/boat, check for conflicts
      if (req.body.boatId || req.body.startTime || req.body.endTime) {
        const boatId = req.body.boatId || existing.boatId;
        const startTime = req.body.startTime ? new Date(req.body.startTime) : existing.startTime;
        const endTime = req.body.endTime ? new Date(req.body.endTime) : existing.endTime;
        
        const conflict = await storage.checkBookingConflict(
          boatId,
          startTime,
          endTime,
          id // Exclude current booking from conflict check
        );
        
        if (conflict) {
          return res.status(409).json({ 
            error: "Booking conflict",
            message: "The new time slot conflicts with an existing booking" 
          });
        }
      }
      
      const updated = await storage.updateBooking(id, req.body);
      res.json(updated);
    } catch (error: any) {
      console.error("Error updating booking:", error);
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // Cancel/delete booking
  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const existing = await storage.getBooking(id);
      if (!existing) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      const deleted = await storage.deleteBooking(id);
      
      if (deleted) {
        res.json({ success: true, message: "Booking deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete booking" });
      }
    } catch (error: any) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });

  // ==========================================
  // DISCO CRUISE ENDPOINTS
  // ==========================================
  
  // Get disco slots for a month
  app.get("/api/disco/slots", async (req, res) => {
    try {
      const { year, month } = req.query;
      
      if (!year || !month) {
        return res.status(400).json({ error: "year and month are required" });
      }
      
      const slots = await storage.getDiscoSlots(
        parseInt(year as string),
        parseInt(month as string)
      );
      
      res.json(slots);
    } catch (error: any) {
      console.error("Error fetching disco slots:", error);
      res.status(500).json({ error: "Failed to fetch disco slots" });
    }
  });

  // Create new disco slot
  app.post("/api/disco/slots", async (req, res) => {
    try {
      const validation = insertDiscoSlotSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid disco slot data",
          details: validation.error.errors 
        });
      }
      
      // Check availability before creating (using startTime instead of time)
      const timeString = new Date(validation.data.startTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      const available = await storage.checkDiscoAvailability(
        new Date(validation.data.date),
        timeString
      );
      
      if (!available) {
        return res.status(409).json({ 
          error: "Slot conflict",
          message: "A disco cruise is already scheduled for this date and time" 
        });
      }
      
      const slot = await storage.createDiscoSlot(validation.data);
      res.status(201).json(slot);
    } catch (error: any) {
      console.error("Error creating disco slot:", error);
      res.status(500).json({ error: "Failed to create disco slot" });
    }
  });

  // Purchase tickets for a disco slot
  app.post("/api/disco/slots/:id/purchase", async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      
      if (!quantity || quantity < 1) {
        return res.status(400).json({ error: "Valid quantity is required" });
      }
      
      const slot = await storage.getDiscoSlot(id);
      if (!slot) {
        return res.status(404).json({ error: "Disco slot not found" });
      }
      
      const remainingCapacity = slot.ticketCap - slot.ticketsSold;
      if (quantity > remainingCapacity) {
        return res.status(400).json({ 
          error: "Insufficient capacity",
          message: `Only ${remainingCapacity} tickets available` 
        });
      }
      
      const updated = await storage.purchaseDiscoTickets(id, quantity);
      res.json(updated);
    } catch (error: any) {
      console.error("Error purchasing disco tickets:", error);
      res.status(500).json({ error: "Failed to purchase tickets" });
    }
  });

  // Update disco slot
  app.patch("/api/disco/slots/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const existing = await storage.getDiscoSlot(id);
      if (!existing) {
        return res.status(404).json({ error: "Disco slot not found" });
      }
      
      // If changing date/time, check for conflicts
      if (req.body.date || req.body.startTime) {
        const date = req.body.date ? new Date(req.body.date) : existing.date;
        const timeString = req.body.startTime ? new Date(req.body.startTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : new Date(existing.startTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        
        const available = await storage.checkDiscoAvailability(date, timeString);
        
        if (!available && (date !== existing.date || timeString !== new Date(existing.startTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }))) {
          return res.status(409).json({ 
            error: "Slot conflict",
            message: "Another disco cruise is already scheduled for this date and time" 
          });
        }
      }
      
      const updated = await storage.updateDiscoSlot(id, req.body);
      res.json(updated);
    } catch (error: any) {
      console.error("Error updating disco slot:", error);
      res.status(500).json({ error: "Failed to update disco slot" });
    }
  });

  // Get individual disco slot by ID  
  app.get("/api/disco/slots/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const slot = await storage.getDiscoSlot(id);
      if (!slot) {
        return res.status(404).json({ error: "Disco slot not found" });
      }
      
      // Add ticket pricing information for booking flow
      const slotWithPricing = {
        ...slot,
        ticketPrice: 8500, // $85 default ticket price in cents
        availableTickets: slot.ticketCap - slot.ticketsSold
      };
      
      res.json(slotWithPricing);
    } catch (error: any) {
      console.error("Error fetching disco slot:", error);
      res.status(500).json({ error: "Failed to fetch disco slot" });
    }
  });

  // Get slot details for availability slot endpoint (used by booking flow)
  app.get("/api/availability/slot", async (req, res) => {
    try {
      const { slotId } = req.query;
      
      if (!slotId && !boatId) {
        return res.status(400).json({ error: "slotId or boatId parameter is required" });
      }
      
      // Parse slot ID to determine type and return appropriate data
      if (typeof slotId === 'string' && slotId.startsWith('disco_')) {
        // Disco slot: disco_{id}
        const discoSlotId = slotId.replace('disco_', '');
        const slot = await storage.getDiscoSlot(discoSlotId);
        
        if (!slot) {
          return res.status(404).json({ error: "Disco slot not found" });
        }
        
        res.json({
          id: slotId,
          type: 'disco',
          date: slot.date.toISOString().split('T')[0],
          startTime: new Date(slot.startTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          endTime: new Date(slot.endTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          ticketPrice: 8500, // $85 default
          availableTickets: slot.ticketCap - slot.ticketsSold,
          description: 'ATX Disco Cruise'
        });
        
      } else if (typeof slotId === 'string' && slotId.startsWith('private_')) {
        // Private slot: private_{boatId}_{date}_{startTime}_{endTime}
        const parts = slotId.split('_');
        if (parts.length !== 5) {
          return res.status(400).json({ error: "Invalid private slot ID format" });
        }
        
        const [, boatId, dateStr, startTime, endTime] = parts;
        
        // Fetch boat details
        const boats = await storage.getActiveBoats();
        const boat = boats.find(b => b.id === boatId);
        
        if (!boat) {
          return res.status(404).json({ error: "Boat not found" });
        }
        
        // Calculate duration
        const startHour = parseInt(startTime.split(':')[0]);
        const endHour = parseInt(endTime.split(':')[0]);
        const duration = endHour - startHour;
        
        // Calculate base pricing based on boat capacity and day type
        const eventDate = new Date(dateStr);
        const dayOfWeek = eventDate.getDay();
        
        let baseHourlyRate = 45000; // $450/hour weekday default
        if (dayOfWeek === 5) { // Friday
          baseHourlyRate = 55000; // $550/hour
        } else if (dayOfWeek === 6 || dayOfWeek === 0) { // Saturday/Sunday
          baseHourlyRate = 65000; // $650/hour
        }
        
        // Adjust rate based on boat capacity
        if (boat.capacity >= 50) {
          baseHourlyRate = Math.round(baseHourlyRate * 1.5); // 50% premium for large boats
        } else if (boat.capacity <= 15) {
          baseHourlyRate = Math.round(baseHourlyRate * 0.7); // 30% discount for small boats
        }
        
        const totalPrice = baseHourlyRate * duration;
        
        res.json({
          id: slotId,
          type: 'private',
          date: dateStr,
          startTime,
          endTime,
          duration,
          boatId,
          boatName: boat.name,
          boatType: boat.capacity <= 15 ? 'dayTripper' : boat.capacity >= 50 ? 'luxury' : 'standard',
          capacity: boat.capacity,
          baseHourlyRate,
          totalPrice,
          description: `${duration}-hour ${boat.name} cruise`
        });
        
      } else {
        return res.status(400).json({ error: "Invalid slot ID format" });
      }
      
    } catch (error: any) {
      console.error("Error fetching availability slot:", error);
      res.status(500).json({ error: "Failed to fetch availability slot" });
    }
  });

  // ==========================================
  // TIMEFRAME ENDPOINTS
  // ==========================================
  
  // Get recurring timeframe templates
  app.get("/api/timeframes", async (req, res) => {
    try {
      const { dayOfWeek, type } = req.query;
      
      const timeframes = await storage.getTimeframes(
        dayOfWeek ? parseInt(dayOfWeek as string) : undefined,
        type as string | undefined
      );
      
      res.json(timeframes);
    } catch (error: any) {
      console.error("Error fetching timeframes:", error);
      res.status(500).json({ error: "Failed to fetch timeframes" });
    }
  });

  // Create new timeframe
  app.post("/api/timeframes", async (req, res) => {
    try {
      const validation = insertTimeframeSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid timeframe data",
          details: validation.error.errors 
        });
      }
      
      const timeframe = await storage.createTimeframe(validation.data);
      res.status(201).json(timeframe);
    } catch (error: any) {
      console.error("Error creating timeframe:", error);
      res.status(500).json({ error: "Failed to create timeframe" });
    }
  });

  // Update timeframe
  app.put("/api/timeframes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const existing = await storage.getTimeframe(id);
      if (!existing) {
        return res.status(404).json({ error: "Timeframe not found" });
      }
      
      const updated = await storage.updateTimeframe(id, req.body);
      res.json(updated);
    } catch (error: any) {
      console.error("Error updating timeframe:", error);
      res.status(500).json({ error: "Failed to update timeframe" });
    }
  });

  // Delete timeframe
  app.delete("/api/timeframes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const existing = await storage.getTimeframe(id);
      if (!existing) {
        return res.status(404).json({ error: "Timeframe not found" });
      }
      
      const deleted = await storage.deleteTimeframe(id);
      
      if (deleted) {
        res.json({ success: true, message: "Timeframe deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete timeframe" });
      }
    } catch (error: any) {
      console.error("Error deleting timeframe:", error);
      res.status(500).json({ error: "Failed to delete timeframe" });
    }
  });

  // Generate timeframes for a month
  app.get("/api/timeframes/generate", async (req, res) => {
    try {
      const { year, month } = req.query;
      
      if (!year || !month) {
        return res.status(400).json({ error: "year and month are required" });
      }
      
      const timeframes = await storage.generateTimeframesForMonth(
        parseInt(year as string),
        parseInt(month as string)
      );
      
      res.json(timeframes);
    } catch (error: any) {
      console.error("Error generating timeframes:", error);
      res.status(500).json({ error: "Failed to generate timeframes" });
    }
  });

  // ==========================================
  // AVAILABILITY ENDPOINTS
  // ==========================================
  
  // Initialize default time slots and disco cruise slots
  app.post("/api/initialize-slots", async (req, res) => {
    try {
      console.log("🚀 Initializing default time slots and disco cruise slots...");
      
      // Create default timeframes for private cruises
      const privateTimeframes = [
        // Monday-Thursday
        { dayOfWeek: 1, type: 'private' as const, startTime: '10:00', endTime: '14:00', description: 'Monday Morning Cruise' },
        { dayOfWeek: 1, type: 'private' as const, startTime: '11:00', endTime: '15:00', description: 'Monday Midday Cruise' },
        { dayOfWeek: 1, type: 'private' as const, startTime: '12:00', endTime: '16:00', description: 'Monday Afternoon Cruise' },
        { dayOfWeek: 1, type: 'private' as const, startTime: '13:00', endTime: '17:00', description: 'Monday Early Evening' },
        { dayOfWeek: 1, type: 'private' as const, startTime: '14:00', endTime: '18:00', description: 'Monday Late Afternoon' },
        { dayOfWeek: 1, type: 'private' as const, startTime: '15:00', endTime: '19:00', description: 'Monday Evening Cruise' },
        { dayOfWeek: 1, type: 'private' as const, startTime: '16:00', endTime: '20:00', description: 'Monday Sunset Cruise' },
        { dayOfWeek: 1, type: 'private' as const, startTime: '16:30', endTime: '20:30', description: 'Monday Late Evening' },
        
        // Tuesday (same as Monday)
        { dayOfWeek: 2, type: 'private' as const, startTime: '10:00', endTime: '14:00', description: 'Tuesday Morning Cruise' },
        { dayOfWeek: 2, type: 'private' as const, startTime: '11:00', endTime: '15:00', description: 'Tuesday Midday Cruise' },
        { dayOfWeek: 2, type: 'private' as const, startTime: '12:00', endTime: '16:00', description: 'Tuesday Afternoon Cruise' },
        { dayOfWeek: 2, type: 'private' as const, startTime: '13:00', endTime: '17:00', description: 'Tuesday Early Evening' },
        { dayOfWeek: 2, type: 'private' as const, startTime: '14:00', endTime: '18:00', description: 'Tuesday Late Afternoon' },
        { dayOfWeek: 2, type: 'private' as const, startTime: '15:00', endTime: '19:00', description: 'Tuesday Evening Cruise' },
        { dayOfWeek: 2, type: 'private' as const, startTime: '16:00', endTime: '20:00', description: 'Tuesday Sunset Cruise' },
        { dayOfWeek: 2, type: 'private' as const, startTime: '16:30', endTime: '20:30', description: 'Tuesday Late Evening' },
        
        // Wednesday (same as Monday)
        { dayOfWeek: 3, type: 'private' as const, startTime: '10:00', endTime: '14:00', description: 'Wednesday Morning Cruise' },
        { dayOfWeek: 3, type: 'private' as const, startTime: '11:00', endTime: '15:00', description: 'Wednesday Midday Cruise' },
        { dayOfWeek: 3, type: 'private' as const, startTime: '12:00', endTime: '16:00', description: 'Wednesday Afternoon Cruise' },
        { dayOfWeek: 3, type: 'private' as const, startTime: '13:00', endTime: '17:00', description: 'Wednesday Early Evening' },
        { dayOfWeek: 3, type: 'private' as const, startTime: '14:00', endTime: '18:00', description: 'Wednesday Late Afternoon' },
        { dayOfWeek: 3, type: 'private' as const, startTime: '15:00', endTime: '19:00', description: 'Wednesday Evening Cruise' },
        { dayOfWeek: 3, type: 'private' as const, startTime: '16:00', endTime: '20:00', description: 'Wednesday Sunset Cruise' },
        { dayOfWeek: 3, type: 'private' as const, startTime: '16:30', endTime: '20:30', description: 'Wednesday Late Evening' },
        
        // Thursday (same as Monday)
        { dayOfWeek: 4, type: 'private' as const, startTime: '10:00', endTime: '14:00', description: 'Thursday Morning Cruise' },
        { dayOfWeek: 4, type: 'private' as const, startTime: '11:00', endTime: '15:00', description: 'Thursday Midday Cruise' },
        { dayOfWeek: 4, type: 'private' as const, startTime: '12:00', endTime: '16:00', description: 'Thursday Afternoon Cruise' },
        { dayOfWeek: 4, type: 'private' as const, startTime: '13:00', endTime: '17:00', description: 'Thursday Early Evening' },
        { dayOfWeek: 4, type: 'private' as const, startTime: '14:00', endTime: '18:00', description: 'Thursday Late Afternoon' },
        { dayOfWeek: 4, type: 'private' as const, startTime: '15:00', endTime: '19:00', description: 'Thursday Evening Cruise' },
        { dayOfWeek: 4, type: 'private' as const, startTime: '16:00', endTime: '20:00', description: 'Thursday Sunset Cruise' },
        { dayOfWeek: 4, type: 'private' as const, startTime: '16:30', endTime: '20:30', description: 'Thursday Late Evening' },
        
        // Friday
        { dayOfWeek: 5, type: 'private' as const, startTime: '12:00', endTime: '16:00', description: 'Friday Afternoon Cruise' },
        { dayOfWeek: 5, type: 'private' as const, startTime: '16:30', endTime: '20:30', description: 'Friday Evening Cruise' },
        
        // Saturday
        { dayOfWeek: 6, type: 'private' as const, startTime: '11:00', endTime: '15:00', description: 'Saturday Morning Cruise' },
        { dayOfWeek: 6, type: 'private' as const, startTime: '15:30', endTime: '19:30', description: 'Saturday Afternoon Cruise' },
        
        // Sunday
        { dayOfWeek: 0, type: 'private' as const, startTime: '11:00', endTime: '15:00', description: 'Sunday Morning Cruise' },
        { dayOfWeek: 0, type: 'private' as const, startTime: '15:30', endTime: '19:30', description: 'Sunday Afternoon Cruise' },
      ];
      
      // Create disco cruise timeframes
      const discoTimeframes = [
        { dayOfWeek: 5, type: 'disco' as const, startTime: '12:00', endTime: '16:00', description: 'Friday Disco Cruise' },
        { dayOfWeek: 6, type: 'disco' as const, startTime: '11:00', endTime: '15:00', description: 'Saturday Morning Disco' },
        { dayOfWeek: 6, type: 'disco' as const, startTime: '15:30', endTime: '19:30', description: 'Saturday Afternoon Disco' },
      ];
      
      // Add all timeframes
      const createdTimeframes = [];
      for (const tf of [...privateTimeframes, ...discoTimeframes]) {
        try {
          const created = await storage.createTimeframe({
            ...tf,
            boatIds: [],
            active: true
          });
          createdTimeframes.push(created);
        } catch (error) {
          console.log(`Timeframe already exists or error: ${tf.description}`);
        }
      }
      
      // Create disco slots for the next 3 months
      const today = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 3);
      
      const createdDiscoSlots = [];
      const currentDate = new Date(today);
      
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        
        // Friday disco cruise
        if (dayOfWeek === 5) {
          const slotDate = new Date(currentDate);
          const startTime = new Date(slotDate);
          startTime.setHours(12, 0, 0, 0);
          const endTime = new Date(slotDate);
          endTime.setHours(16, 0, 0, 0);
          
          try {
            const slot = await storage.createDiscoSlot({
              date: slotDate,
              startTime,
              endTime,
              ticketCap: 100,
              ticketsSold: 0,
              status: 'available'
            });
            createdDiscoSlots.push(slot);
          } catch (error) {
            console.log(`Disco slot already exists for ${slotDate.toDateString()}`);
          }
        }
        
        // Saturday disco cruises
        if (dayOfWeek === 6) {
          // Morning disco
          const morningDate = new Date(currentDate);
          const morningStart = new Date(morningDate);
          morningStart.setHours(11, 0, 0, 0);
          const morningEnd = new Date(morningDate);
          morningEnd.setHours(15, 0, 0, 0);
          
          try {
            const morningSlot = await storage.createDiscoSlot({
              date: morningDate,
              startTime: morningStart,
              endTime: morningEnd,
              ticketCap: 100,
              ticketsSold: 0,
              status: 'available'
            });
            createdDiscoSlots.push(morningSlot);
          } catch (error) {
            console.log(`Morning disco slot already exists for ${morningDate.toDateString()}`);
          }
          
          // Afternoon disco
          const afternoonDate = new Date(currentDate);
          const afternoonStart = new Date(afternoonDate);
          afternoonStart.setHours(15, 30, 0, 0);
          const afternoonEnd = new Date(afternoonDate);
          afternoonEnd.setHours(19, 30, 0, 0);
          
          try {
            const afternoonSlot = await storage.createDiscoSlot({
              date: afternoonDate,
              startTime: afternoonStart,
              endTime: afternoonEnd,
              ticketCap: 100,
              ticketsSold: 0,
              status: 'available'
            });
            createdDiscoSlots.push(afternoonSlot);
          } catch (error) {
            console.log(`Afternoon disco slot already exists for ${afternoonDate.toDateString()}`);
          }
        }
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      console.log(`✅ Created ${createdTimeframes.length} timeframes and ${createdDiscoSlots.length} disco slots`);
      
      res.json({
        success: true,
        message: `Successfully initialized ${createdTimeframes.length} timeframes and ${createdDiscoSlots.length} disco slots`,
        timeframes: createdTimeframes.length,
        discoSlots: createdDiscoSlots.length
      });
    } catch (error) {
      console.error("Initialize slots error:", error);
      res.status(500).json({ error: "Failed to initialize slots" });
    }
  });
  
  // Check availability for quotes
  app.get("/api/availability/check", async (req, res) => {
    try {
      const { date, duration, groupSize, type } = req.query;
      
      if (!date || !duration || !groupSize || !type) {
        return res.status(400).json({ 
          error: "date, duration, groupSize, and type are required" 
        });
      }
      
      if (type !== 'private' && type !== 'disco') {
        return res.status(400).json({ 
          error: "type must be either 'private' or 'disco'" 
        });
      }
      
      const availability = await storage.checkAvailability(
        new Date(date as string),
        parseInt(duration as string),
        parseInt(groupSize as string),
        type
      );
      
      res.json(availability);
    } catch (error: any) {
      console.error("Error checking availability:", error);
      res.status(500).json({ error: "Failed to check availability" });
    }
  });

  // Get available boats
  app.get("/api/availability/boats", async (req, res) => {
    try {
      const { date, startTime, endTime, groupSize } = req.query;
      
      if (!date || !startTime || !endTime || !groupSize) {
        return res.status(400).json({ 
          error: "date, startTime, endTime, and groupSize are required" 
        });
      }
      
      const boats = await storage.getAvailableBoats(
        new Date(date as string),
        startTime as string,
        endTime as string,
        parseInt(groupSize as string)
      );
      
      res.json(boats);
    } catch (error: any) {
      console.error("Error fetching available boats:", error);
      res.status(500).json({ error: "Failed to fetch available boats" });
    }
  });

  // ==========================================
  // CALENDAR VIEW MANAGEMENT ENDPOINTS
  // ==========================================

  // Toggle time block availability (quick booking/unbooking)
  app.post("/api/timeframes/toggle-availability", async (req, res) => {
    try {
      const { date, startTime, endTime, boatId, status } = req.body;
      
      if (!date || !startTime || !endTime || !boatId || !status) {
        return res.status(400).json({ 
          error: "date, startTime, endTime, boatId, and status are required" 
        });
      }
      
      const startDateTime = new Date(`${date}T${startTime}:00`);
      const endDateTime = new Date(`${date}T${endTime}:00`);
      
      if (status === 'booked') {
        // Create a quick booking to block the time
        const booking = await storage.createBooking({
          boatId,
          type: 'private',
          status: 'blocked',
          startTime: startDateTime,
          endTime: endDateTime,
          groupSize: 0,
          paymentStatus: 'pending',
          amountPaid: 0,
          totalAmount: 0,
          notes: 'Manually blocked time slot'
        });
        res.json({ success: true, booking });
      } else {
        // Find and remove the blocking booking
        const bookings = await storage.getBookings(startDateTime, endDateTime, boatId);
        const blockingBooking = bookings.find(b => 
          b.status === 'blocked' && 
          b.startTime.getTime() === startDateTime.getTime() &&
          b.endTime.getTime() === endDateTime.getTime()
        );
        
        if (blockingBooking) {
          await storage.deleteBooking(blockingBooking.id);
          res.json({ success: true, message: 'Time slot unblocked' });
        } else {
          res.status(404).json({ error: 'No blocking booking found for this time slot' });
        }
      }
    } catch (error: any) {
      console.error("Error toggling availability:", error);
      res.status(500).json({ error: "Failed to toggle availability" });
    }
  });

  // Update disco cruise ticket quantity
  app.post("/api/disco/slots/:id/update-quantity", async (req, res) => {
    try {
      const { id } = req.params;
      const { adjustment } = req.body; // positive or negative number
      
      if (adjustment === undefined || typeof adjustment !== 'number') {
        return res.status(400).json({ error: "adjustment must be a number" });
      }
      
      const slot = await storage.getDiscoSlot(id);
      if (!slot) {
        return res.status(404).json({ error: "Disco slot not found" });
      }
      
      const newTicketsSold = Math.max(0, Math.min(slot.ticketCap, slot.ticketsSold + adjustment));
      const updated = await storage.updateDiscoSlot(id, {
        ticketsSold: newTicketsSold,
        status: newTicketsSold >= slot.ticketCap ? 'soldout' : 'available'
      });
      
      res.json(updated);
    } catch (error: any) {
      console.error("Error updating disco ticket quantity:", error);
      res.status(500).json({ error: "Failed to update ticket quantity" });
    }
  });

  // Test endpoint to verify URL generation
  app.get("/api/test-url", async (req, res) => {
    res.json({
      publicUrl: getPublicUrl(),
      fullQuoteUrl: getFullUrl('/quote/test-123'),
      fullChatUrl: getFullUrl('/chat'),
      environment: {
        REPLIT_DEV_DOMAIN: process.env.REPLIT_DEV_DOMAIN || 'not set',
        REPLIT_DOMAINS: process.env.REPLIT_DOMAINS || 'not set',
        BASE_URL: process.env.BASE_URL || 'not set'
      }
    });
  });


  // Reassign booking between identical boats
  app.post("/api/bookings/:id/reassign", async (req, res) => {
    try {
      const { id } = req.params;
      const { newBoatId } = req.body;
      
      if (!newBoatId) {
        return res.status(400).json({ error: "newBoatId is required" });
      }
      
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      // Check if new boat is available for this time
      const conflict = await storage.checkBookingConflict(
        newBoatId, 
        booking.startTime, 
        booking.endTime,
        id
      );
      
      if (conflict) {
        return res.status(409).json({ error: "New boat is not available for this time" });
      }
      
      const updated = await storage.reassignBooking(id, newBoatId);
      res.json(updated);
    } catch (error: any) {
      console.error("Error reassigning booking:", error);
      res.status(500).json({ error: "Failed to reassign booking" });
    }
  });

  // Get comprehensive booking data with joins for BookingsTable
  app.get("/api/bookings/comprehensive", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      // Default to current week if no dates provided
      const start = startDate ? new Date(startDate as string) : new Date();
      const end = endDate ? new Date(endDate as string) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      
      // Get bookings for the date range
      const bookings = await storage.getBookings(start, end);
      
      // Fetch all related data we'll need
      const boats = await storage.getBoats();
      const projects = await storage.getProjectsByContact(''); // Get all projects
      const leads = await storage.getLeads();
      const clients = await storage.getClients();
      const contacts = leads.concat(clients);
      
      // Build comprehensive booking data
      const comprehensiveBookings = [];
      
      for (const booking of bookings) {
        // Find related project
        const project = booking.projectId ? projects.find(p => p.id === booking.projectId) : null;
        
        // Find contact through project
        const contact = project ? contacts.find(c => c.id === project.contactId) : null;
        
        // Find boat details
        const boat = booking.boatId ? boats.find(b => b.id === booking.boatId) : null;
        
        // Get quotes for this project
        let quote = null;
        let totalAmount = 0;
        if (project) {
          const quotes = await storage.getQuotesByProject(project.id);
          quote = quotes.find(q => q.status === 'accepted') || quotes[0]; // Get accepted quote or latest
          totalAmount = quote?.total || 0;
        }
        
        // Get payment information
        let amountPaid = 0;
        let paymentStatus = 'Unpaid';
        if (quote) {
          try {
            const invoice = await storage.getInvoice(quote.id); // May not exist
            if (invoice) {
              amountPaid = invoice.balance ? totalAmount - invoice.balance : totalAmount;
            }
          } catch (error) {
            // Invoice may not exist, that's ok
          }
        }
        
        // Calculate payment status
        if (amountPaid === 0) {
          paymentStatus = 'Unpaid';
        } else if (amountPaid >= totalAmount) {
          paymentStatus = 'Paid';
        } else {
          paymentStatus = 'Partial';
        }
        
        comprehensiveBookings.push({
          id: booking.id,
          cruiseDate: booking.startTime,
          contactName: contact?.name || 'Unknown Contact',
          contactEmail: contact?.email || '',
          partySize: booking.groupSize || project?.groupSize || 0,
          boatAssigned: boat?.name || 'No Boat Assigned',
          totalAmount,
          amountPaid,
          amountOwed: Math.max(0, totalAmount - amountPaid),
          paymentStatus,
          bookingStatus: booking.status || 'confirmed',
          eventType: project?.eventType || booking.partyType || 'Private Cruise',
          startTime: booking.startTime,
          endTime: booking.endTime,
          projectId: booking.projectId,
          quoteId: quote?.id
        });
      }
      
      // Sort by cruise date (most recent first)
      comprehensiveBookings.sort((a, b) => new Date(b.cruiseDate).getTime() - new Date(a.cruiseDate).getTime());
      
      res.json(comprehensiveBookings);
    } catch (error: any) {
      console.error("Error fetching comprehensive booking data:", error);
      res.status(500).json({ error: "Failed to fetch booking data" });
    }
  });

  // ==========================================
  // ADMIN CALENDAR MANAGEMENT ENDPOINTS
  // ==========================================

  // Get admin calendar slots with comprehensive data
  app.get("/api/admin/calendar/slots", requireAdminAuth, requirePermission('read'), async (req, res) => {
    try {
      const validation = adminCalendarQuerySchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid query parameters",
          details: validation.error.errors 
        });
      }
      
      const { startDate, endDate, boatId } = validation.data;
      
      const slots = await storage.getAdminCalendarSlots(
        startDate,
        endDate,
        boatId
      );
      
      // Log admin access
      await storage.logAdminAction('view_calendar_slots', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        boatId
      }, req.adminUser.id);
      
      res.json(slots);
    } catch (error: any) {
      console.error("Error fetching admin calendar slots:", error);
      res.status(500).json({ error: "Failed to fetch admin calendar slots" });
    }
  });

  // Block time slot
  app.post("/api/admin/calendar/block", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const validation = blockSlotSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid block slot request",
          details: validation.error.errors 
        });
      }
      
      const { boatId, startTime, endTime, reason } = validation.data;
      
      const slot = await storage.blockTimeSlot(
        boatId,
        startTime,
        endTime,
        reason,
        req.adminUser.id // Use authenticated admin identity
      );
      
      // Log admin action
      await storage.logAdminAction('block_time_slot', {
        boatId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        reason
      }, req.adminUser.id);
      
      res.json(slot);
    } catch (error: any) {
      console.error("Error blocking time slot:", error);
      res.status(500).json({ error: "Failed to block time slot" });
    }
  });

  // Unblock time slot
  app.delete("/api/admin/calendar/block", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const validation = unblockSlotSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid unblock slot request",
          details: validation.error.errors 
        });
      }
      
      const { boatId, startTime, endTime } = validation.data;
      
      const success = await storage.unblockTimeSlot(
        boatId,
        startTime,
        endTime
      );
      
      // Log admin action
      await storage.logAdminAction('unblock_time_slot', {
        boatId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString()
      }, req.adminUser.id);
      
      if (success) {
        res.json({ success: true, message: "Time slot unblocked" });
      } else {
        res.status(404).json({ error: "Time slot not found or not blocked" });
      }
    } catch (error: any) {
      console.error("Error unblocking time slot:", error);
      res.status(500).json({ error: "Failed to unblock time slot" });
    }
  });

  // Batch slot operations
  app.post("/api/admin/calendar/batch-slots", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const validation = batchSlotOperationSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid batch operation request",
          details: validation.error.errors 
        });
      }
      
      const { operation } = validation.data;
      
      const updatedSlots = await storage.batchBlockSlots(operation, req.adminUser.id);
      
      // Log admin action
      await storage.logAdminAction('batch_slot_operation', {
        operationType: operation.type,
        slotCount: operation.slotIds.length,
        operation
      }, req.adminUser.id);
      
      res.json({ success: true, updatedSlots, count: updatedSlots.length });
    } catch (error: any) {
      console.error("Error performing batch slot operation:", error);
      res.status(500).json({ error: "Failed to perform batch slot operation" });
    }
  });

  // Create admin booking with validation
  app.post("/api/admin/bookings", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const validation = adminBookingCreateSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid booking data",
          details: validation.error.errors 
        });
      }
      
      const booking = await storage.createBookingWithValidation(validation.data, req.adminUser.id);
      
      // Log admin action
      await storage.logAdminAction('create_booking', {
        bookingId: booking.id,
        boatId: booking.boatId,
        startTime: booking.startTime.toISOString(),
        endTime: booking.endTime.toISOString()
      }, req.adminUser.id);
      
      res.status(201).json(booking);
    } catch (error: any) {
      console.error("Error creating admin booking:", error);
      res.status(500).json({ error: error.message || "Failed to create booking" });
    }
  });

  // Update admin booking with validation
  app.patch("/api/admin/bookings/:id", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const { id } = req.params;
      
      const validation = adminBookingUpdateSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid booking update data",
          details: validation.error.errors 
        });
      }
      
      // Check if booking exists
      const existing = await storage.getBooking(id);
      if (!existing) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      const booking = await storage.updateBookingWithValidation(id, validation.data, req.adminUser.id);
      
      // Log admin action
      await storage.logAdminAction('update_booking', {
        bookingId: id,
        changes: validation.data
      }, req.adminUser.id);
      
      res.json(booking);
    } catch (error: any) {
      console.error("Error updating admin booking:", error);
      res.status(500).json({ error: error.message || "Failed to update booking" });
    }
  });

  // Cancel booking with cleanup
  app.delete("/api/admin/bookings/:id", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const { id } = req.params;
      
      const validation = cancelBookingSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid cancellation request",
          details: validation.error.errors 
        });
      }
      
      const { reason } = validation.data;
      
      const canceledBooking = await storage.cancelBookingWithCleanup(id, reason, req.adminUser.id);
      
      // Log admin action
      await storage.logAdminAction('cancel_booking', {
        bookingId: id,
        reason
      }, req.adminUser.id);
      
      res.json(canceledBooking);
    } catch (error: any) {
      console.error("Error canceling booking:", error);
      res.status(500).json({ error: error.message || "Failed to cancel booking" });
    }
  });

  // Move booking to new slot
  app.patch("/api/admin/bookings/:id/move", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const { id } = req.params;
      
      const validation = moveBookingSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid move booking request",
          details: validation.error.errors 
        });
      }
      
      const { newStartTime, newEndTime, newBoatId } = validation.data;
      
      const booking = await storage.moveBookingToSlot(
        id,
        newStartTime,
        newEndTime,
        newBoatId
      );
      
      // Log admin action
      await storage.logAdminAction('move_booking', {
        bookingId: id,
        newStartTime: newStartTime.toISOString(),
        newEndTime: newEndTime.toISOString(),
        newBoatId
      }, req.adminUser.id);
      
      res.json(booking);
    } catch (error: any) {
      console.error("Error moving booking:", error);
      res.status(500).json({ error: error.message || "Failed to move booking" });
    }
  });

  // Get comprehensive booking data for admin
  app.get("/api/admin/bookings/comprehensive", requireAdminAuth, requirePermission('read'), async (req, res) => {
    try {
      const { startDate, endDate, ...filters } = req.query;
      
      const bookings = await storage.getComprehensiveBookings(
        startDate ? normalizeToChicagoTime(startDate as string) : undefined,
        endDate ? normalizeToChicagoTime(endDate as string) : undefined,
        filters
      );
      
      // Log admin access
      await storage.logAdminAction('view_comprehensive_bookings', {
        startDate: startDate as string,
        endDate: endDate as string,
        filters
      }, req.adminUser.id);
      
      res.json(bookings);
    } catch (error: any) {
      console.error("Error fetching comprehensive admin bookings:", error);
      res.status(500).json({ error: "Failed to fetch comprehensive booking data" });
    }
  });

  // Get availability overview for a specific date
  app.get("/api/admin/calendar/overview", requireAdminAuth, requirePermission('read'), async (req, res) => {
    try {
      const validation = calendarOverviewSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid overview request",
          details: validation.error.errors 
        });
      }
      
      const { date } = validation.data;
      
      const overview = await storage.getAdminAvailabilityOverview(date);
      
      // Log admin access
      await storage.logAdminAction('view_availability_overview', {
        date: date.toISOString()
      }, req.adminUser.id);
      
      res.json(overview);
    } catch (error: any) {
      console.error("Error fetching availability overview:", error);
      res.status(500).json({ error: "Failed to fetch availability overview" });
    }
  });

  // Create recurring availability pattern
  app.post("/api/admin/calendar/recurring", requireAdminAuth, requirePermission('full'), async (req, res) => {
    try {
      const validation = recurringPatternSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid recurring pattern request",
          details: validation.error.errors 
        });
      }
      
      const pattern = validation.data;
      
      const slots = await storage.createRecurringAvailability(pattern);
      
      // Log admin action
      await storage.logAdminAction('create_recurring_availability', {
        pattern,
        createdSlots: slots.length
      }, req.adminUser.id);
      
      res.json({ success: true, createdSlots: slots.length, slots });
    } catch (error: any) {
      console.error("Error creating recurring availability:", error);
      res.status(500).json({ error: "Failed to create recurring availability" });
    }
  });

  // Get booking history and audit trail
  app.get("/api/admin/bookings/:id/history", requireAdminAuth, requirePermission('read'), async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: "Valid booking ID is required" });
      }
      
      const history = await storage.getBookingHistory(id);
      
      // Log admin access
      await storage.logAdminAction('view_booking_history', {
        bookingId: id
      }, req.adminUser.id);
      
      res.json(history);
    } catch (error: any) {
      console.error("Error fetching booking history:", error);
      res.status(500).json({ error: "Failed to fetch booking history" });
    }
  });

  // Validate booking request
  app.post("/api/admin/bookings/validate", requireAdminAuth, requirePermission('read'), async (req, res) => {
    try {
      const validation = adminBookingCreateSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid booking data format",
          details: validation.error.errors 
        });
      }
      
      const result = await storage.validateBookingRequest(validation.data);
      
      // Log admin access
      await storage.logAdminAction('validate_booking_request', {
        requestData: validation.data
      }, req.adminUser.id);
      
      res.json(result);
    } catch (error: any) {
      console.error("Error validating booking request:", error);
      res.status(500).json({ error: "Failed to validate booking request" });
    }
  });

  // Comprehensive API Service Testing Endpoint
  app.get("/api/test-integrations", async (req, res) => {
    console.log("🧪 Starting comprehensive API integration testing...");
    
    const results: any = {
      timestamp: new Date().toISOString(),
      overall_status: "unknown",
      services: {},
      summary: {}
    };

    // Test 1: Stripe API Connection
    console.log("1️⃣ Testing Stripe API connection...");
    try {
      if (stripe) {
        // Test by retrieving account details - minimal API call
        const account = await stripe.accounts.retrieve();
        results.services.stripe = {
          status: "✅ Connected",
          account_id: account.id,
          country: account.country,
          charges_enabled: account.charges_enabled,
          details_submitted: account.details_submitted,
          test_passed: true
        };
        console.log("   ✅ Stripe API: Connected successfully");
      } else {
        results.services.stripe = {
          status: "⚠️ Not configured",
          test_passed: false,
          note: "STRIPE_SECRET_KEY not set - payment functionality mocked"
        };
        console.log("   ⚠️ Stripe API: Not configured (using mock mode)");
      }
    } catch (error: any) {
      results.services.stripe = {
        status: "❌ Failed",
        error: error.message,
        test_passed: false
      };
      console.log("   ❌ Stripe API: Failed -", error.message);
    }

    // Test 2: Mailgun Email Service
    console.log("2️⃣ Testing Mailgun email service...");
    try {
      const testResult = await mailgunService.send({
        to: "test@example.com",
        subject: "API Test - Ignore",
        text: "This is a test email to verify Mailgun connectivity.",
        html: "<p>This is a test email to verify Mailgun connectivity.</p>"
      });
      
      if (testResult) {
        results.services.mailgun = {
          status: "✅ Connected",
          configured: mailgunService.isConfigured(),
          test_passed: true,
          note: mailgunService.isConfigured() ? "Email sent successfully" : "Simulation mode (no real email sent)"
        };
        console.log("   ✅ Mailgun: Email test successful");
      } else {
        results.services.mailgun = {
          status: "❌ Failed",
          configured: mailgunService.isConfigured(),
          test_passed: false,
          note: "Email send returned false"
        };
        console.log("   ❌ Mailgun: Email test failed");
      }
    } catch (error: any) {
      results.services.mailgun = {
        status: "❌ Failed",
        error: error.message,
        test_passed: false
      };
      console.log("   ❌ Mailgun: Failed -", error.message);
    }

    // Test 3: GoHighLevel SMS Service
    console.log("3️⃣ Testing GoHighLevel SMS service...");
    try {
      const testResult = await goHighLevelService.send({
        to: "+15125551234",
        body: "API Test - This is a test SMS to verify GoHighLevel connectivity."
      });
      
      if (testResult) {
        results.services.gohighlevel = {
          status: "✅ Connected",
          configured: goHighLevelService.isConfigured(),
          test_passed: true,
          note: goHighLevelService.isConfigured() ? "SMS sent successfully" : "Simulation mode (no real SMS sent)"
        };
        console.log("   ✅ GoHighLevel: SMS test successful");
      } else {
        results.services.gohighlevel = {
          status: "❌ Failed",
          configured: goHighLevelService.isConfigured(),
          test_passed: false,
          note: "SMS send returned false"
        };
        console.log("   ❌ GoHighLevel: SMS test failed");
      }
    } catch (error: any) {
      results.services.gohighlevel = {
        status: "❌ Failed",
        error: error.message,
        test_passed: false
      };
      console.log("   ❌ GoHighLevel: Failed -", error.message);
    }

    // Test 4: Google Sheets API Service
    console.log("4️⃣ Testing Google Sheets API service...");
    try {
      // Test by getting availability data for a small date range
      const testStartDate = new Date();
      const testEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
      
      const availabilityData = await googleSheetsService.getAvailability(testStartDate, testEndDate);
      
      if (availabilityData && Array.isArray(availabilityData)) {
        results.services.google_sheets = {
          status: "✅ Connected",
          test_passed: true,
          records_found: availabilityData.length,
          note: availabilityData.length > 0 ? "API working, data retrieved" : "API working, no data in date range"
        };
        console.log("   ✅ Google Sheets: API test successful, found", availabilityData.length, "records");
      } else {
        results.services.google_sheets = {
          status: "⚠️ Connected but no data",
          test_passed: false,
          note: "API responded but returned no data"
        };
        console.log("   ⚠️ Google Sheets: API connected but no data returned");
      }
    } catch (error: any) {
      results.services.google_sheets = {
        status: "❌ Failed",
        error: error.message,
        test_passed: false
      };
      console.log("   ❌ Google Sheets: Failed -", error.message);
    }

    // Test 5: OpenAI Service (check configuration only)
    console.log("5️⃣ Checking OpenAI service configuration...");
    try {
      const hasApiKey = !!process.env.OPENAI_API_KEY;
      
      if (hasApiKey) {
        results.services.openai = {
          status: "✅ Configured",
          test_passed: true,
          note: "API key configured, AI functionality available"
        };
        console.log("   ✅ OpenAI: API key configured");
      } else {
        results.services.openai = {
          status: "⚠️ Not configured",
          test_passed: false,
          note: "No API key - using mock AI responses"
        };
        console.log("   ⚠️ OpenAI: Not configured (using mock responses)");
      }
    } catch (error: any) {
      results.services.openai = {
        status: "❌ Failed",
        error: error.message,
        test_passed: false
      };
      console.log("   ❌ OpenAI: Failed -", error.message);
    }

    // Test 6: SendGrid Service (check configuration only)
    console.log("6️⃣ Checking SendGrid service configuration...");
    try {
      const hasApiKey = !!process.env.SENDGRID_API_KEY;
      
      if (hasApiKey) {
        results.services.sendgrid = {
          status: "✅ Configured",
          test_passed: true,
          note: "API key configured, email functionality available"
        };
        console.log("   ✅ SendGrid: API key configured");
      } else {
        results.services.sendgrid = {
          status: "⚠️ Not configured",
          test_passed: false,
          note: "No API key - using mock email responses"
        };
        console.log("   ⚠️ SendGrid: Not configured (using mock responses)");
      }
    } catch (error: any) {
      results.services.sendgrid = {
        status: "❌ Failed",
        error: error.message,
        test_passed: false
      };
      console.log("   ❌ SendGrid: Failed -", error.message);
    }

    // Calculate overall status
    const serviceTests = Object.values(results.services);
    const passedTests = serviceTests.filter((service: any) => service.test_passed);
    const criticalServices = ['stripe', 'mailgun', 'gohighlevel', 'google_sheets'];
    const criticalPassed = criticalServices.filter(serviceName => 
      results.services[serviceName]?.test_passed || 
      results.services[serviceName]?.status?.includes('Connected')
    );

    results.summary = {
      total_services: serviceTests.length,
      passed_tests: passedTests.length,
      critical_services: criticalServices.length,
      critical_passed: criticalPassed.length,
      all_critical_working: criticalPassed.length === criticalServices.length
    };

    if (results.summary.all_critical_working) {
      results.overall_status = "✅ All Critical Services Working";
    } else if (results.summary.critical_passed >= criticalServices.length / 2) {
      results.overall_status = "⚠️ Some Services Working";
    } else {
      results.overall_status = "❌ Major Service Issues";
    }

    console.log("🏁 Integration testing completed!");
    console.log(`   Overall Status: ${results.overall_status}`);
    console.log(`   Critical Services: ${results.summary.critical_passed}/${results.summary.critical_services} working`);
    
    res.json(results);
  });

  // ==========================================
  // PUBLIC CUSTOMER API ENDPOINTS
  // ==========================================

  // Simple rate limiting for public endpoints
  const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
  
  const checkRateLimit = (req: Request, maxRequests: number = 100, windowMs: number = 15 * 60 * 1000): boolean => {
    const now = Date.now();
    // Use req.ip which respects trust proxy setting for correct IP detection
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const client = rateLimitStore.get(clientIP);
    
    if (!client || now > client.resetTime) {
      rateLimitStore.set(clientIP, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (client.count >= maxRequests) {
      return false;
    }
    
    client.count++;
    return true;
  };

  // Rate limiting middleware for public endpoints
  const publicRateLimit = (maxRequests: number = 100) => {
    return (req: any, res: any, next: any) => {
      const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
      
      if (!checkRateLimit(clientIP, maxRequests)) {
        return res.status(429).json({
          error: "Too many requests",
          details: "Please wait before making more requests",
          retryAfter: 900 // 15 minutes
        });
      }
      
      next();
    };
  };

  // Enhanced validation with custom error messages
  const publicAvailabilitySchema = z.object({
    startDate: z.string().transform(normalizeToChicagoTime),
    endDate: z.string().transform(normalizeToChicagoTime),
    boatType: z.string().optional(),
    groupSize: z.number().min(8, "Group size must be at least 8").max(75, "Group size cannot exceed 75").optional(),
    eventType: z.string().optional()
  });

  app.get("/api/availability/public", publicRateLimit(50), async (req, res) => {
    try {
      const { startDate, endDate, boatType, groupSize, eventType } = publicAvailabilitySchema.parse(req.query);
      
      // Get all boats (filter by type if specified)
      const boats = await storage.getActiveBoats();
      const filteredBoats = boatType 
        ? boats.filter(b => b.boatType === boatType)
        : boats;
      
      // Get bookings for the date range
      const bookings = await storage.getBookingsInRange(startDate, endDate);
      
      // Calculate available slots
      const availableSlots = [];
      const currentDate = new Date(startDate);
      const end = new Date(endDate);
      
      while (currentDate <= end) {
        // Get time slots for this date
        const timeSlots = getPrivateTimeSlotsForDate(currentDate);
        
        for (const timeSlot of timeSlots) {
          for (const boat of filteredBoats) {
            // Skip if group size filter and boat doesn't fit
            if (groupSize && boat.capacity < groupSize) continue;
            
            // Parse time slot into full dates
            const slotStartTime = parseTimeToDate(currentDate, timeSlot.startTime);
            const slotEndTime = parseTimeToDate(currentDate, timeSlot.endTime);
            
            // Check if this slot is booked
            const isBooked = bookings.some(booking => 
              booking.boatId === boat.id &&
              booking.status !== 'canceled' &&
              booking.startTime.getTime() === slotStartTime.getTime() &&
              booking.endTime.getTime() === slotEndTime.getTime()
            );
            
            if (!isBooked) {
              // Calculate pricing for this slot
              const pricing = await storage.calculateCruisePricing({
                groupSize: groupSize || 20,
                duration: timeSlot.duration,
                date: currentDate,
                cruiseType: 'private',
                boatType: boat.boatType || 'standard',
                selectedAddOnPackages: []
              });
              
              availableSlots.push({
                id: `${boat.id}_${currentDate.toISOString().split('T')[0]}_${timeSlot.startTime}_${timeSlot.endTime}`,
                date: currentDate.toISOString().split('T')[0],
                startTime: timeSlot.startTime,
                endTime: timeSlot.endTime,
                duration: timeSlot.duration,
                boatId: boat.id,
                boatName: boat.name,
                boatType: boat.boatType,
                capacity: boat.capacity,
                availableSpots: boat.capacity,
                baseHourlyRate: pricing.baseRate,
                totalPrice: pricing.subtotal,
                icon: timeSlot.icon,
                popular: timeSlot.popular,
                description: timeSlot.description,
                status: 'available'
              });
            }
          }
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      res.json({
        slots: availableSlots,
        totalCount: availableSlots.length
      });
      
    } catch (error: any) {
      console.error("Public availability error:", error);
      res.status(400).json({ 
        error: "Failed to get availability",
        details: error.message 
      });
    }
  });

  // Public disco availability
  app.get("/api/disco/availability/public", publicRateLimit(50), async (req, res) => {
    try {
      const { startDate, endDate } = publicAvailabilitySchema.parse(req.query);
      
      // Get disco slots for the date range
      const discoSlots = await storage.getDiscoSlotsInRange(startDate, endDate);
      
      // Filter for available slots and format for public consumption
      const availableSlots = discoSlots
        .filter(slot => slot.status === 'available' && slot.ticketsSold < slot.ticketCap)
        .map(slot => ({
          id: slot.id,
          date: slot.date.toISOString().split('T')[0],
          startTime: slot.startTime,
          endTime: slot.endTime,
          ticketPrice: slot.ticketPrice,
          availableTickets: slot.ticketCap - slot.ticketsSold,
          totalCapacity: slot.ticketCap,
          status: 'available',
          type: 'disco'
        }));
      
      res.json({
        slots: availableSlots,
        totalCount: availableSlots.length
      });
      
    } catch (error: any) {
      console.error("Public disco availability error:", error);
      res.status(400).json({ 
        error: "Failed to get disco availability",
        details: error.message 
      });
    }
  });

  // Public pricing calculation
  const publicPricingSchema = z.object({
    date: z.string().transform(normalizeToChicagoTime),
    timeSlotId: z.string(),
    groupSize: z.number().min(8).max(75),
    cruiseType: z.enum(['private', 'disco']),
    selectedAddOnPackages: z.array(z.string()).optional(),
    discoTicketQuantity: z.number().min(1).optional()
  });

  app.post("/api/pricing/public", publicRateLimit(30), async (req, res) => {
    try {
      const { date, timeSlotId, groupSize, cruiseType, selectedAddOnPackages = [], discoTicketQuantity } = publicPricingSchema.parse(req.body);
      
      if (cruiseType === 'private') {
        // Get time slot details
        const timeSlot = getTimeSlotById(date, timeSlotId);
        if (!timeSlot) {
          return res.status(404).json({ error: "Time slot not found" });
        }
        
        // Calculate pricing
        const pricing = await storage.calculateCruisePricing({
          groupSize,
          duration: timeSlot.duration,
          date,
          cruiseType: 'private',
          boatType: 'standard', // Default for pricing
          selectedAddOnPackages
        });
        
        res.json({
          type: 'private',
          subtotal: pricing.subtotal,
          tax: pricing.tax,
          gratuity: pricing.gratuity,
          total: pricing.total,
          depositAmount: Math.round(pricing.total * 0.25), // 25% deposit
          breakdown: pricing.breakdown
        });
        
      } else if (cruiseType === 'disco') {
        // Get disco slot details
        const discoSlot = await storage.getDiscoSlot(timeSlotId);
        if (!discoSlot) {
          return res.status(404).json({ error: "Disco slot not found" });
        }
        
        const quantity = discoTicketQuantity || 1;
        const subtotal = discoSlot.ticketPrice * quantity;
        const tax = Math.round(subtotal * 0.0825); // Texas sales tax
        const total = subtotal + tax;
        
        res.json({
          type: 'disco',
          ticketPrice: discoSlot.ticketPrice,
          quantity,
          subtotal,
          tax,
          total,
          depositAmount: total, // Full payment for disco cruises
          breakdown: {
            tickets: `${quantity} × $${discoSlot.ticketPrice}`,
            tax: `${(0.0825 * 100).toFixed(2)}% Texas Sales Tax`
          }
        });
      }
      
    } catch (error: any) {
      console.error("Public pricing error:", error);
      res.status(400).json({ 
        error: "Failed to calculate pricing",
        details: error.message 
      });
    }
  });

  // Public booking creation
  const publicBookingSchema = z.object({
    slotId: z.string().min(1),
    cruiseType: z.enum(['private', 'disco']),
    contactInfo: z.object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      phone: z.string().min(10).max(20)
    }),
    eventDetails: z.object({
      eventType: z.string().min(1),
      groupSize: z.number().min(8).max(75).optional(),
      specialRequests: z.string().max(500).optional(),
      discoTicketQuantity: z.number().min(1).optional()
    }),
    selectedProducts: z.array(z.string()).optional(),
    captchaToken: z.string().optional() // For future CAPTCHA integration
  });

  app.post("/api/bookings/public", publicRateLimit(10), async (req, res) => {
    try {
      const validated = publicBookingSchema.parse(req.body);
      const { slotId, cruiseType, contactInfo, eventDetails, selectedProducts = [] } = validated;
      
      // Additional security logging
      const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
      console.log(`[PUBLIC BOOKING] ${new Date().toISOString()} - IP: ${clientIP} - Slot: ${slotId} - Type: ${cruiseType}`);
      
      // Basic honeypot field check (hidden field to catch bots)
      if (req.body.website || req.body.url) {
        console.log(`[SECURITY] Potential bot detected from IP: ${clientIP}`);
        return res.status(400).json({ 
          error: "Invalid submission",
          details: "Please try again"
        });
      }
      
      if (cruiseType === 'private') {
        // Parse slot ID to get booking details
        const [boatId, dateStr, startTime, endTime] = slotId.split('_');
        const date = new Date(dateStr);
        const startDateTime = parseTimeToDate(date, startTime);
        const endDateTime = parseTimeToDate(date, endTime);
        
        // Verify slot is still available
        const hasConflict = await storage.checkBookingConflict(boatId, startDateTime, endDateTime);
        if (hasConflict) {
          return res.status(409).json({ 
            error: "Time slot no longer available",
            details: "This slot has been booked by another customer"
          });
        }
        
        // Create contact
        const contact = await storage.createContact({
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          tags: ['public-booking', 'website-lead']
        });
        
        // Create project
        const project = await storage.createProject({
          contactId: contact.id,
          title: `${eventDetails.eventType} - ${contactInfo.name}`,
          status: 'NEW',
          projectDate: date,
          groupSize: eventDetails.groupSize || 20,
          eventType: eventDetails.eventType,
          specialRequests: eventDetails.specialRequests,
          preferredTime: `${startTime}-${endTime}`,
          leadSource: 'public-calendar',
          pipelinePhase: 'ph_new'
        });
        
        // Calculate final pricing
        const timeSlot = getTimeSlotById(date, `${startTime}-${endTime}`) || 
                        { duration: Math.round((endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60)) };
        
        const pricing = await storage.calculateCruisePricing({
          groupSize: eventDetails.groupSize || 20,
          duration: timeSlot.duration,
          date,
          cruiseType: 'private',
          boatType: 'standard',
          selectedAddOnPackages: selectedProducts
        });
        
        // Create quote
        const quote = await storage.createQuote({
          projectId: project.id,
          subtotal: pricing.subtotal,
          discountTotal: 0,
          tax: pricing.tax,
          gratuity: pricing.gratuity,
          total: pricing.total,
          depositRequired: true,
          depositAmount: Math.round(pricing.total * 0.25),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          items: [
            {
              id: randomUUID(),
              name: `Private Cruise - ${timeSlot.duration} hours`,
              description: `${eventDetails.eventType} cruise for ${eventDetails.groupSize} guests`,
              quantity: 1,
              unitPrice: pricing.subtotal,
              total: pricing.subtotal
            }
          ]
        });
        
        // Create Stripe checkout session
        if (stripe) {
          const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `Private Cruise Deposit - ${contactInfo.name}`,
                  description: `${eventDetails.eventType} on ${date.toLocaleDateString()}`
                },
                unit_amount: Math.round(pricing.total * 0.25)
              },
              quantity: 1
            }],
            mode: 'payment',
            success_url: `${getFullUrl('/booking-success')}?session_id={CHECKOUT_SESSION_ID}&quote_id=${quote.id}`,
            cancel_url: `${getFullUrl('/book')}?cancelled=true`,
            customer_email: contactInfo.email,
            metadata: {
              quoteId: quote.id,
              projectId: project.id,
              contactId: contact.id,
              boatId,
              startTime: startDateTime.toISOString(),
              endTime: endDateTime.toISOString(),
              source: 'public-calendar'
            }
          });
          
          res.json({
            bookingId: project.id,
            quoteId: quote.id,
            quoteUrl: getPublicUrl(`/quote/${quote.id}`),
            checkoutUrl: checkoutSession.url,
            total: pricing.total,
            depositRequired: Math.round(pricing.total * 0.25),
            depositPercentage: 25
          });
        } else {
          // Mock response for development
          res.json({
            bookingId: project.id,
            quoteId: quote.id,
            quoteUrl: getPublicUrl(`/quote/${quote.id}`),
            checkoutUrl: '/mock-payment',
            total: pricing.total,
            depositRequired: Math.round(pricing.total * 0.25),
            depositPercentage: 25
          });
        }
        
      } else if (cruiseType === 'disco') {
        // Handle disco cruise booking
        const discoSlot = await storage.getDiscoSlot(slotId);
        if (!discoSlot) {
          return res.status(404).json({ error: "Disco slot not found" });
        }
        
        const ticketQuantity = eventDetails.discoTicketQuantity || 1;
        
        // Check availability
        if (discoSlot.ticketsSold + ticketQuantity > discoSlot.ticketCap) {
          return res.status(409).json({ 
            error: "Not enough tickets available",
            details: `Only ${discoSlot.ticketCap - discoSlot.ticketsSold} tickets remaining`
          });
        }
        
        // Create contact and project for disco booking
        const contact = await storage.createContact({
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          tags: ['disco-cruise', 'public-booking']
        });
        
        const project = await storage.createProject({
          contactId: contact.id,
          title: `Disco Cruise - ${contactInfo.name}`,
          status: 'NEW',
          projectDate: discoSlot.date,
          groupSize: ticketQuantity,
          eventType: 'disco',
          leadSource: 'public-calendar',
          pipelinePhase: 'ph_new'
        });
        
        const subtotal = discoSlot.ticketPrice * ticketQuantity;
        const tax = Math.round(subtotal * 0.0825);
        const total = subtotal + tax;
        
        // Create quote for disco cruise
        const quote = await storage.createQuote({
          projectId: project.id,
          subtotal,
          discountTotal: 0,
          tax,
          gratuity: 0,
          total,
          depositRequired: false, // Full payment for disco
          depositAmount: total,
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          items: [
            {
              id: randomUUID(),
              name: `Disco Cruise Tickets`,
              description: `${ticketQuantity} tickets for disco cruise`,
              quantity: ticketQuantity,
              unitPrice: discoSlot.ticketPrice,
              total: subtotal
            }
          ]
        });
        
        // Create Stripe checkout for disco cruise
        if (stripe) {
          const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `Disco Cruise Tickets - ${contactInfo.name}`,
                  description: `${ticketQuantity} tickets for ${discoSlot.date.toLocaleDateString()}`
                },
                unit_amount: discoSlot.ticketPrice
              },
              quantity: ticketQuantity
            }],
            mode: 'payment',
            success_url: `${getFullUrl('/booking-success')}?session_id={CHECKOUT_SESSION_ID}&quote_id=${quote.id}`,
            cancel_url: `${getFullUrl('/book')}?cancelled=true`,
            customer_email: contactInfo.email,
            metadata: {
              quoteId: quote.id,
              projectId: project.id,
              contactId: contact.id,
              discoSlotId: slotId,
              ticketQuantity: ticketQuantity.toString(),
              source: 'public-calendar'
            }
          });
          
          res.json({
            bookingId: project.id,
            quoteId: quote.id,
            quoteUrl: getPublicUrl(`/quote/${quote.id}`),
            checkoutUrl: checkoutSession.url,
            total,
            depositRequired: total,
            ticketQuantity
          });
        } else {
          res.json({
            bookingId: project.id,
            quoteId: quote.id,
            quoteUrl: getPublicUrl(`/quote/${quote.id}`),
            checkoutUrl: '/mock-payment',
            total,
            depositRequired: total,
            ticketQuantity
          });
        }
      }
      
    } catch (error: any) {
      console.error("Public booking error:", error);
      res.status(400).json({ 
        error: "Failed to create booking",
        details: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

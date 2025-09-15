import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { generateQuoteDescription } from "./services/openai";
import { googleSheetsService } from "./services/googleSheets";
import { mailgunService } from "./services/mailgun";
import { openRouterService } from "./services/openrouter";
import { goHighLevelService, type LeadWebhookPayload } from "./services/gohighlevel";
import { insertContactSchema, insertProjectSchema, insertQuoteSchema, insertChatMessageSchema, insertQuoteTemplateSchema, insertTemplateRuleSchema, insertDiscountRuleSchema, insertPricingSettingsSchema, insertProductSchema, insertAffiliateSchema, insertBookingSchema, insertDiscoSlotSchema, insertTimeframeSchema, type LeadData, type LeadUpdateData, type CreateLeadRequest } from "@shared/schema";
import { templateRenderer } from "./services/templateRenderer";
import { z } from "zod";
import { getFullUrl, getPublicUrl } from "./utils";

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
          <h3 style="margin-top: 0;">Quote Details</h3>
          <p><strong>Event:</strong> ${project?.eventType || 'Party Cruise'}</p>
          <p><strong>Group Size:</strong> ${project?.groupSize || 'TBD'}</p>
          <p><strong>Date:</strong> ${project?.projectDate ? (typeof project.projectDate === 'string' ? new Date(project.projectDate).toISOString().split('T')[0] : project.projectDate.toISOString().split('T')[0]) : 'To be confirmed'}</p>
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
  
  // Remove unsafe from override - let service use its safe default
  return await mailgunService.send({
    to: email,
    subject: '🚢 Your Party Cruise Quote is Ready!',
    html
  });
}

async function sendQuoteSMS(quoteId: string, phone: string) {
  const quote = await storage.getQuote(quoteId);
  if (!quote) throw new Error("Quote not found");
  
  const project = await storage.getProject(quote.projectId);
  const contact = project ? await storage.getContact(project.contactId) : null;
  
  const message = `Hi ${contact?.name || 'there'}! 🚢 Your Premier Party Cruises quote is ready. Total: $${(quote.total / 100).toFixed(2)}. View details: ${getFullUrl(`/quote/${quote.id}`)}`;
  
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
            sentAt: quote.sentAt,
            viewedAt: quote.viewedAt,
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
            const invoice = await storage.getInvoice(quote.id);
            if (invoice) {
              const contact = await storage.getContact(project.contactId);
              
              allInvoices.push({
                id: invoice.id,
                invoiceNumber: `INV-${invoice.id.slice(0, 8).toUpperCase()}`,
                customerName: contact?.name || 'Unknown',
                customerEmail: contact?.email || '',
                dueDate: invoice.dueDate,
                totalAmount: invoice.amount,
                paidAmount: invoice.status === 'paid' ? invoice.amount : 0,
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
          { description: "Private Cruise (3 hours)", quantity: 1, unitPrice: 150000 },
          { description: "Cooler + Ice", quantity: 1, unitPrice: 1500 },
          { description: "Sound System Upgrade", quantity: 1, unitPrice: 5000 }
        ];
        
        const quote = await storage.createQuote({
          projectId: project.id,
          items: quoteItems,
          subtotal: quoteItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0),
          tax: Math.floor(quoteItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) * 0.0825),
          total: Math.floor(quoteItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) * 1.0825),
          status: i === 0 ? "draft" : i === 1 ? "sent" : "accepted",
          sentAt: i > 0 ? new Date() : undefined,
          viewedAt: i > 0 ? new Date() : undefined,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        });
        quotes.push(quote);
      }
      
      // Create sample invoices for accepted quotes
      const acceptedQuote = quotes[2];
      const invoice = await storage.createInvoice({
        quoteId: acceptedQuote.id,
        amount: acceptedQuote.total,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
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

      // Save AI response
      await storage.createChatMessage({
        sessionId,
        contactId: contactId || null,
        role: "assistant", 
        content: aiResponse.response,
        metadata: {
          intent: "general",
          extractedData: aiResponse.extractedData || {},
          suggestedActions: aiResponse.suggestedActions || []
        } as Record<string, any>
      });

      res.json({
        response: aiResponse.response,
        message: aiResponse.response, // Keep for backward compatibility
        intent: "general", // Default intent since openRouterService doesn't provide it
        extractedData: aiResponse.extractedData || {},
        suggestedActions: aiResponse.suggestedActions || []
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
          phone: contact.phone,
          eventType: eventType || data?.eventType,
          eventTypeLabel: data?.eventTypeLabel,
          source: "AI Chat Widget"
        });
        
        // Create project
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
          leadSource: "chat" as const
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
          items: pricing.items,
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
        
        // Send quote via email
        const contact = await storage.getContact(project.contactId);
        if (contact?.email) {
          await sendQuoteEmail(quote.id, contact.email, 
            "Thank you for choosing Premier Party Cruises! Your custom quote is ready."
          );
        }
        
        // Send SMS with quote link
        if (contact?.phone) {
          await sendQuoteSMS(quote.id, contact.phone);
        }
        
        res.json({
          success: true,
          quote,
          pricing,
          quoteUrl: `/quote/${quote.id}`,
          message: "Quote generated and sent successfully!"
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
        const message = `Hi ${customerInfo.name || 'Valued Customer'}! 🚢 Your Premier Party Cruises quote is ready. Total: $${(quote.total / 100).toFixed(2)}. View details: ${getFullUrl(`/public/quote/${quote.id}`)}`;
        
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
          if (!timeSlot) {
            return res.status(400).json({ error: "timeSlot required for private cruise" });
          }
          
          pricing = await storage.calculateCruisePricing({
            groupSize: parseInt(groupSize),
            eventDate: new Date(eventDate),
            timeSlot: timeSlot,
          });
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
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${productName} - ${eventTypeLabel} ${cruiseTypeLabel} Cruise`,
              description: `Group Size: ${groupSize} | Date: ${new Date(eventDate).toLocaleDateString()} | ${cruiseType === 'disco' ? `Package: ${discoPackage}` : `Time: ${timeSlot}`}`,
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
          timeSlot: timeSlot || '',
          discoPackage: discoPackage || '',
          discoTicketQuantity: discoTicketQuantity?.toString() || '',
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
        const { paymentType, eventType, eventDate, groupSize, projectId, quoteId } = session.metadata;
        
        console.log(`Payment successful: ${paymentType} payment for ${eventType} event`, {
          amount: session.amount_total,
          customerEmail: session.customer_email,
          eventDate,
          groupSize
        });
        
        // Create booking if we have project information
        if (projectId) {
          try {
            // Create a simple payment record for now (without invoice)
            const payment = await storage.createPayment({
              invoiceId: 'direct_payment_' + session.id,
              amount: session.amount_total,
              status: "SUCCEEDED",
              paidAt: new Date(),
              method: "card",
              stripePaymentIntentId: session.payment_intent as string
            });
            
            // Create booking and convert lead to customer
            await storage.createBookingFromPayment(projectId, payment.id, session.amount_total);
            console.log(`Direct booking created for project ${projectId}`);
          } catch (error) {
            console.error("Failed to create booking from checkout:", error);
          }
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
      const leads = await storage.getLeads();
      const clients = await storage.getClients();
      
      // In production, you would query for actual pipeline counts
      res.json({
        newLeads: leads.length,
        quoteSent: Math.floor(leads.length * 0.6),
        depositPaid: Math.floor(clients.length * 0.3),
        fullyPaid: Math.floor(clients.length * 0.7)
      });
    } catch (error) {
      console.error("Pipeline summary error:", error);
      res.status(500).json({ error: "Failed to fetch pipeline summary" });
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
      const { groupSize, eventDate, timeSlot, promoCode, eventType, cruiseType } = req.body;
      
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
      } else {
        // Regular private cruise pricing for all other events
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
              name: "Private Party Cruise",
              type: "service",
              unitPrice: 200000, // $2000 in cents
              qty: 1,
              description: "4-hour private cruise for up to 25 people"
            },
            {
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
              name: "Bachelor Party Cruise",
              type: "service",
              unitPrice: 150000, // $1500 in cents
              qty: 1,
              description: "3-hour bachelor party cruise"
            },
            {
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
      
      // Check for conflicts before creating
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
      
      // Check availability before creating
      const available = await storage.checkDiscoAvailability(
        new Date(validation.data.date),
        validation.data.time
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
      
      const remainingCapacity = slot.capacity - slot.soldTickets;
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
      if (req.body.date || req.body.time) {
        const date = req.body.date ? new Date(req.body.date) : existing.date;
        const time = req.body.time || existing.time;
        
        const available = await storage.checkDiscoAvailability(date, time);
        
        if (!available && (date !== existing.date || time !== existing.time)) {
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

  const httpServer = createServer(app);
  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { processChatMessage, generateQuoteDescription } from "./services/openai";
import { googleSheetsService } from "./services/googleSheets";
import { sendQuoteEmail } from "./services/sendgrid";
import { twilioService } from "./services/twilio";
import { insertContactSchema, insertProjectSchema, insertQuoteSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY not configured. Payment functionality will be mocked.');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
}) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  
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
      const aiResponse = await processChatMessage(message, conversationHistory);

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
        content: aiResponse.message,
        metadata: {
          intent: aiResponse.intent,
          extractedData: aiResponse.extractedData || {},
          suggestedActions: aiResponse.suggestedActions || []
        }
      });

      res.json({
        message: aiResponse.message,
        intent: aiResponse.intent,
        extractedData: aiResponse.extractedData,
        suggestedActions: aiResponse.suggestedActions
      });

    } catch (error: any) {
      console.error("Chat message error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
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

      const availability = await googleSheetsService.getAvailability(start, end);
      
      let filtered = availability;
      if (groupSize) {
        filtered = availability.filter(slot => slot.capacity >= parseInt(groupSize as string));
      }

      res.json({ availability: filtered });
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

      const available = await googleSheetsService.checkAvailability(date, time, groupSize);
      res.json({ available });
    } catch (error) {
      console.error("Check availability error:", error);
      res.status(500).json({ error: "Failed to check availability" });
    }
  });

  // Contact endpoints
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
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

  // Project endpoints
  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
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

  // Quote endpoints
  app.post("/api/quotes", async (req, res) => {
    try {
      const quoteData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(quoteData);
      res.status(201).json(quote);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
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
      const { delivery, customerInfo, personalMessage } = req.body;
      
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
        success = await sendQuoteEmail(
          customerInfo.email,
          customerInfo.name || 'Valued Customer',
          quote.id,
          {
            eventType: project.eventType,
            groupSize: project.groupSize,
            date: project.projectDate?.toISOString().split('T')[0],
            total: quote.total
          }
        );
      } else if (delivery === 'sms' && customerInfo.phone) {
        success = await twilioService.sendQuoteSMS(
          customerInfo.phone,
          customerInfo.name || 'Valued Customer',
          quote.id,
          quote.total
        );
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

  // Pricing preview endpoint
  app.post("/api/pricing/preview", (req, res) => {
    try {
      const { items = [], promoCode, projectDate } = req.body;
      
      // Simple pricing calculation
      let subtotal = items.reduce((sum: number, item: any) => 
        sum + (item.unitPrice * item.qty), 0);
      
      let discountTotal = 0;
      if (promoCode) {
        // Apply 10% discount for demo
        discountTotal = Math.floor(subtotal * 0.1);
      }
      
      const tax = Math.floor((subtotal - discountTotal) * 0.0825); // 8.25% Austin tax
      const total = subtotal - discountTotal + tax;
      
      // Determine deposit policy
      let depositRequired = true;
      let depositPercent = 25;
      
      if (projectDate) {
        const projectDateObj = new Date(projectDate);
        const now = new Date();
        const daysUntil = Math.ceil((projectDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntil <= 30) {
          depositPercent = 100; // Full payment required within 30 days
        }
      }

      res.json({
        subtotal,
        discountTotal,
        tax,
        total,
        depositRequired,
        depositPercent,
        depositAmount: Math.floor(total * depositPercent / 100)
      });
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
            await storage.createPayment({
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
            }
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

  const httpServer = createServer(app);
  return httpServer;
}

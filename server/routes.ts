import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { generateQuoteDescription } from "./services/openai";
import { googleSheetsService } from "./services/googleSheets";
import { mailgunService } from "./services/mailgun";
import { openRouterService } from "./services/openrouter";
import { goHighLevelService } from "./services/gohighlevel";
import { insertContactSchema, insertProjectSchema, insertQuoteSchema, insertChatMessageSchema, insertQuoteTemplateSchema, insertTemplateRuleSchema, insertDiscountRuleSchema, insertPricingSettingsSchema, insertProductSchema, insertAffiliateSchema } from "@shared/schema";
import { templateRenderer } from "./services/templateRenderer";
import { z } from "zod";

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
          <p><strong>Date:</strong> ${project?.projectDate?.toISOString().split('T')[0] || 'To be confirmed'}</p>
          <p><strong>Total:</strong> $${(quote.total / 100).toFixed(2)}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.BASE_URL || 'http://localhost:5000'}/quote/${quote.id}" 
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
        <p>Premier Party Cruises | Lake Austin, TX | premierpartycruises.com</p>
      </div>
    </div>
  `;
  
  return await mailgunService.send({
    to: email,
    subject: '🚢 Your Party Cruise Quote is Ready!',
    html,
    from: process.env.MAILGUN_FROM || 'quotes@premierpartycruises.com'
  });
}

async function sendQuoteSMS(quoteId: string, phone: string) {
  const quote = await storage.getQuote(quoteId);
  if (!quote) throw new Error("Quote not found");
  
  const project = await storage.getProject(quote.projectId);
  const contact = project ? await storage.getContact(project.contactId) : null;
  
  const message = `Hi ${contact?.name || 'there'}! 🚢 Your Premier Party Cruises quote is ready. Total: $${(quote.total / 100).toFixed(2)}. View details: ${process.env.BASE_URL || 'http://localhost:5000'}/quote/${quote.id}`;
  
  return await goHighLevelService.send({
    to: phone,
    body: message
  });
}

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
          extractedData: aiResponse.extractedData || {} as any,
          suggestedActions: aiResponse.suggestedActions || [] as any
        }
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
        
        return res.json({ success: true, sent: { email: sendEmail, sms: sendSMS } });
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
                <a href="${process.env.BASE_URL || 'http://localhost:5000'}/quote/${quote.id}" 
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
              <p>Premier Party Cruises | Lake Austin, TX | premierpartycruises.com</p>
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
        const message = `Hi ${customerInfo.name || 'Valued Customer'}! 🚢 Your Premier Party Cruises quote is ready. Total: $${(quote.total / 100).toFixed(2)}. View details: ${process.env.BASE_URL || 'http://localhost:5000'}/public/quote/${quote.id}`;
        
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
        projectId: quote.projectId,
        quoteId: quote.id,
        items: quote.items || [],
        subtotal: quote.subtotal,
        tax: quote.tax,
        discountTotal: quote.discountTotal,
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
      
      const pricing = await storage.calculatePricing({
        items,
        groupSize,
        projectDate: projectDate ? new Date(projectDate) : undefined,
        promoCode,
        templateId,
      });

      res.json(pricing);
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
      const { contactId, extractedData } = req.body;
      
      if (!contactId) {
        return res.status(400).json({ error: "Contact ID is required" });
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
      const items = template.defaultItems.map(item => ({
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

  // Cruise-specific pricing endpoint
  app.post("/api/pricing/cruise", async (req, res) => {
    try {
      const { groupSize, eventDate, timeSlot, promoCode } = req.body;
      
      if (!groupSize || !eventDate || !timeSlot) {
        return res.status(400).json({ 
          error: "Group size, event date, and time slot are required" 
        });
      }

      const pricing = await storage.calculateCruisePricing({
        groupSize: parseInt(groupSize),
        eventDate: new Date(eventDate),
        timeSlot,
        promoCode,
      });

      res.json(pricing);
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

  const httpServer = createServer(app);
  return httpServer;
}

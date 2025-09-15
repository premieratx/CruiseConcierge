import OpenAI from "openai";
import { storage } from "../storage";
import { type ChatbotButton, type ChatbotFlow } from "@shared/schema";

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY not configured. AI functionality will be mocked.");
}

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export interface ChatbotResponse {
  message: string;
  intent: string;
  buttons?: ChatbotButton[];
  extractedData?: {
    groupSize?: number;
    eventType?: string;
    preferredDate?: string;
    preferredTime?: string;
    duration?: number;
    budget?: number;
    specialRequests?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  suggestedActions?: string[];
  flowStep?: string;
  automatedActions?: {
    contactId?: string;
    projectId?: string;
    quoteId?: string;
  };
}

export async function processChatMessage(
  message: string,
  conversationHistory: { role: string; content: string }[],
  contactId?: string
): Promise<ChatbotResponse> {
  try {
    if (!openai) {
      // Enhanced mock response with button flow
      return await handleMockFlow(message, conversationHistory, contactId);
    }
    // Get available quote templates for dynamic responses
    const templates = await storage.getQuoteTemplates();
    const eventTypes = templates.map(t => t.eventType).filter((type, index, self) => self.indexOf(type) === index);
    
    const systemPrompt = `You are an intelligent AI assistant for Premier Party Cruises in Austin, Texas.
    You help customers book memorable party boat cruises on beautiful Lake Travis.
    
    AVAILABLE EVENT TYPES AND TEMPLATES:
    ${templates.map(t => `- ${t.eventType}: ${t.name} (${t.minGroupSize}-${t.maxGroupSize} people, $${(t.basePricePerPerson || 0) / 100}/person base)`).join('\n    ')}
    
    YOUR CONVERSATION FLOW:
    1. Welcome and event type selection (show buttons for event types)
    2. Collect group size and basic details
    3. Show personalized quote preview with template
    4. Collect contact information
    5. Create project and offer booking
    
    CONVERSATION CONTEXT:
    ${conversationHistory.length > 0 ? 'Previous messages: ' + conversationHistory.slice(-3).map(m => `${m.role}: ${m.content}`).join('; ') : 'This is the start of conversation'}
    
    RESPONSE INSTRUCTIONS:
    - Always be warm, professional, and enthusiastic about Lake Travis cruises
    - Use buttons for event type selection and common choices
    - Extract ALL customer data from messages (name, email, phone, group size, date, etc.)
    - When you have enough info, automatically create contact and project
    - Progress the conversation naturally toward booking
    
    Respond with JSON in this exact format:
    {
      "message": "your response to the customer",
      "intent": "greeting|event_selection|info_collection|quote_generation|booking|contact_creation|other",
      "buttons": [
        {"id": "btn_1", "text": "Button Text", "value": "button_value", "style": "primary|secondary|outline"}
      ],
      "extractedData": {
        "groupSize": number or null,
        "eventType": "string or null",
        "preferredDate": "string or null",
        "preferredTime": "string or null",
        "duration": number or null,
        "budget": number or null,
        "specialRequests": "string or null",
        "name": "string or null",
        "email": "string or null",
        "phone": "string or null"
      },
      "suggestedActions": ["create_contact", "create_project", "generate_quote", "check_availability"],
      "flowStep": "welcome|event_selection|details_collection|quote_preview|contact_collection|booking_ready"
    }`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: messages as any,
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Process automated actions
    const enhancedResult = await processAutomatedActions(result, contactId);
    
    return enhancedResult;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      message: "I'm sorry, I'm experiencing technical difficulties. Please try again in a moment.",
      intent: "error",
      suggestedActions: []
    };
  }
}

/**
 * Handle mock conversation flow when OpenAI is not configured
 */
async function handleMockFlow(
  message: string, 
  conversationHistory: { role: string; content: string }[], 
  contactId?: string
): Promise<ChatbotResponse> {
  const lowerMessage = message.toLowerCase();
  
  // Determine conversation stage based on history and message content
  if (conversationHistory.length === 0 || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    // Welcome stage - show event type selection
    const templates = await storage.getQuoteTemplates();
    const eventButtons: ChatbotButton[] = templates.map((template, index) => ({
      id: `event_${template.eventType}`,
      text: `${template.name} (${template.minGroupSize}-${template.maxGroupSize} people)`,
      value: template.eventType,
      style: index === 0 ? 'primary' : 'secondary',
    }));

    return {
      message: "🚢 Welcome to Premier Party Cruises! I'm here to help you plan the perfect celebration on beautiful Lake Travis. What type of event are you planning?",
      intent: "greeting",
      buttons: eventButtons,
      flowStep: "event_selection",
      extractedData: {},
    };
  }

  // Check if user selected an event type
  const templates = await storage.getQuoteTemplates();
  const selectedTemplate = templates.find(t => 
    lowerMessage.includes(t.eventType.toLowerCase()) || 
    lowerMessage.includes(t.name.toLowerCase())
  );

  if (selectedTemplate) {
    return {
      message: `Great choice! The ${selectedTemplate.name} is perfect for ${selectedTemplate.eventType} celebrations. How many guests will you have? We can accommodate ${selectedTemplate.minGroupSize}-${selectedTemplate.maxGroupSize} people.`,
      intent: "event_selection",
      buttons: [
        { id: "group_small", text: `${selectedTemplate.minGroupSize}-15 guests`, value: "small", style: "secondary" },
        { id: "group_medium", text: "16-25 guests", value: "medium", style: "secondary" },
        { id: "group_large", text: `26-${selectedTemplate.maxGroupSize} guests`, value: "large", style: "primary" }
      ],
      flowStep: "details_collection",
      extractedData: { eventType: selectedTemplate.eventType },
    };
  }

  // Extract group size from message
  const groupSizeMatch = message.match(/(\d+)/);
  const groupSize = groupSizeMatch ? parseInt(groupSizeMatch[1]) : null;

  if (groupSize) {
    return {
      message: `Perfect! ${groupSize} guests sounds like a fantastic celebration. 🎉 When are you thinking of booking? I can check our availability and create a personalized quote for you.`,
      intent: "info_collection",
      buttons: [
        { id: "date_soon", text: "Within 2 weeks", value: "soon", style: "primary" },
        { id: "date_month", text: "Next month", value: "month", style: "secondary" },
        { id: "date_flexible", text: "I'm flexible", value: "flexible", style: "outline" }
      ],
      flowStep: "quote_preview",
      extractedData: { groupSize },
      suggestedActions: ["generate_quote"],
    };
  }

  // Extract contact information
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = message.match(/[\+]?[1-9]?[\d\s\-\(\)]{10,15}/);
  const nameMatch = message.match(/my name is ([a-zA-Z\s]+)|i'm ([a-zA-Z\s]+)|call me ([a-zA-Z\s]+)/i);

  const extractedData: any = {};
  if (emailMatch) extractedData.email = emailMatch[0];
  if (phoneMatch) extractedData.phone = phoneMatch[0];
  if (nameMatch) extractedData.name = (nameMatch[1] || nameMatch[2] || nameMatch[3]).trim();

  if (emailMatch || phoneMatch || nameMatch) {
    return {
      message: "Thank you for that information! I'll create your personalized quote right away. Here's what I have so far, and I'll send you the complete details.",
      intent: "contact_creation",
      flowStep: "booking_ready",
      extractedData,
      suggestedActions: ["create_contact", "create_project", "generate_quote"],
    };
  }

  // Default response
  return {
    message: "That sounds exciting! To create the perfect quote for your event, could you share your email address so I can send you all the details?",
    intent: "inquiry",
    buttons: [
      { id: "contact_email", text: "Share Email", value: "email", style: "primary" },
      { id: "contact_phone", text: "Prefer Phone Call", value: "phone", style: "secondary" },
      { id: "more_info", text: "Tell Me More First", value: "info", style: "outline" }
    ],
    flowStep: "contact_collection",
    extractedData: {},
    suggestedActions: ["collect_contact_info"],
  };
}

/**
 * Process automated actions based on chatbot response
 */
async function processAutomatedActions(
  response: ChatbotResponse, 
  existingContactId?: string
): Promise<ChatbotResponse> {
  const automatedActions: any = {};

  try {
    // Auto-create contact if we have email and no existing contact
    if (response.extractedData?.email && !existingContactId) {
      const contact = await storage.findOrCreateContact(
        response.extractedData.email,
        response.extractedData.name,
        response.extractedData.phone
      );
      automatedActions.contactId = contact.id;
      existingContactId = contact.id;
    }

    // Auto-create project if we have sufficient data
    if (existingContactId && response.suggestedActions?.includes("create_project")) {
      const hasRequiredData = response.extractedData?.eventType || response.extractedData?.groupSize;
      
      if (hasRequiredData) {
        const project = await storage.createProjectFromChatData(existingContactId, response.extractedData);
        automatedActions.projectId = project.id;

        // Auto-generate quote if we have a project and template info
        if (response.extractedData?.eventType && response.suggestedActions?.includes("generate_quote")) {
          const templates = await storage.getQuoteTemplatesByEventType(response.extractedData.eventType);
          
          if (templates.length > 0) {
            const template = templates[0];
            const pricing = await storage.calculatePricing({
              items: template.defaultItems,
              groupSize: response.extractedData.groupSize,
              projectDate: response.extractedData.preferredDate ? new Date(response.extractedData.preferredDate) : undefined,
              templateId: template.id,
            });

            const quote = await storage.createQuote({
              projectId: project.id,
              templateId: template.id,
              items: template.defaultItems,
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

            automatedActions.quoteId = quote.id;

            // Enhance response with quote information
            response.message += `\n\n💰 I've created a personalized quote for you! Your ${response.extractedData.eventType} celebration will be approximately ${pricing.perPersonCost > 0 ? `$${(pricing.perPersonCost / 100).toFixed(2)} per person` : `$${(pricing.total / 100).toFixed(2)} total`}. I'll send you the complete details with all the inclusions.`;
            
            if (pricing.urgencyMessage) {
              response.message += `\n\n${pricing.urgencyMessage}`;
            }
          }
        }
      }
    }

    return {
      ...response,
      automatedActions: Object.keys(automatedActions).length > 0 ? automatedActions : undefined,
    };

  } catch (error) {
    console.error("Error processing automated actions:", error);
    return response; // Return original response if automation fails
  }
}

export async function generateQuoteDescription(
  eventType: string,
  groupSize: number,
  selectedServices: string[]
): Promise<string> {
  try {
    if (!openai) {
      return `Get ready for an unforgettable ${eventType} cruise on beautiful Lake Travis for ${groupSize} people!`;
    }
    const prompt = `Generate a friendly, professional quote description for a ${eventType} for ${groupSize} people with these services: ${selectedServices.join(", ")}. 
    Make it personalized and exciting for a party boat cruise in Austin, Texas.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    return response.choices[0].message.content || "Your amazing party cruise awaits!";
  } catch (error) {
    console.error("Error generating quote description:", error);
    return "Get ready for an unforgettable party cruise experience on beautiful Lake Travis!";
  }
}

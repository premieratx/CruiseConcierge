import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY not configured. AI functionality will be mocked.");
}

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export interface ChatbotResponse {
  message: string;
  intent: string;
  extractedData?: {
    groupSize?: number;
    eventType?: string;
    preferredDate?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  suggestedActions?: string[];
}

export async function processChatMessage(
  message: string,
  conversationHistory: { role: string; content: string }[]
): Promise<ChatbotResponse> {
  try {
    if (!openai) {
      // Mock response when OpenAI is not configured
      return {
        message: "Thank you for your interest in Premier Party Cruises! I'd be happy to help you plan your event. Could you tell me more about your group size and preferred date?",
        intent: "inquiry",
        extractedData: {},
        suggestedActions: ["collect_contact_info"]
      };
    }
    const systemPrompt = `You are a helpful AI assistant for Premier Party Cruises in Austin, Texas. 
    You help customers book party boat cruises on Lake Austin.
    
    Your responsibilities:
    1. Collect customer information (name, email, phone, group size, event type, preferred date)
    2. Check boat availability 
    3. Generate quotes
    4. Guide customers through booking process
    
    Available boats:
    - Disco Boat (capacity: 30 people)
    - Classic Pontoon (capacity: 12 people)
    
    Services offered:
    - 2-hour Charter ($600)
    - Cooler + Ice ($15)
    - POD Pre-stock Kit ($95)
    
    Always be friendly, helpful, and professional. Extract any customer data from their messages.
    Respond with JSON in this format:
    {
      "message": "your response to the customer",
      "intent": "greeting|inquiry|booking|payment|other",
      "extractedData": {
        "groupSize": number or null,
        "eventType": "string or null",
        "preferredDate": "string or null", 
        "name": "string or null",
        "email": "string or null",
        "phone": "string or null"
      },
      "suggestedActions": ["check_availability", "generate_quote", "collect_contact_info"]
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
    return result as ChatbotResponse;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      message: "I'm sorry, I'm experiencing technical difficulties. Please try again in a moment.",
      intent: "error",
      suggestedActions: []
    };
  }
}

export async function generateQuoteDescription(
  eventType: string,
  groupSize: number,
  selectedServices: string[]
): Promise<string> {
  try {
    if (!openai) {
      return `Get ready for an unforgettable ${eventType} cruise on beautiful Lake Austin for ${groupSize} people!`;
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
    return "Get ready for an unforgettable party cruise experience on beautiful Lake Austin!";
  }
}

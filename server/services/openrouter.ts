import type { ChatMessage, ChatService } from './types';

class OpenRouterService implements ChatService {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    this.baseUrl = 'https://openrouter.ai/api/v1';
    this.model = process.env.OPENROUTER_MODEL || 'anthropic/claude-3-sonnet';
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async processMessage(messages: ChatMessage[], context?: any): Promise<{
    response: string;
    extractedData?: any;
    suggestedActions?: Array<{
      label: string;
      value: string;
      icon?: string;
    }>;
  }> {
    if (!this.isConfigured()) {
      // Mock response for development
      return this.getMockResponse(messages);
    }

    try {
      const systemMessage: ChatMessage = {
        role: 'system',
        content: `You are a helpful booking assistant for Premier Party Cruises on Lake Travis. 
        Extract key information from conversations including:
        - Name, email, phone
        - Event type (Birthday, Bachelor/ette, Corporate, Wedding, Graduation)
        - Group size
        - Preferred date and time
        - Budget
        
        Provide suggested actions for common inquiries.
        Be friendly, professional, and focus on gathering booking information.`
      };

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': context?.referer || 'https://premierpartycruises.com',
          'X-Title': 'Premier Party Cruises CRM',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [systemMessage, ...messages],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unable to read error response');
        console.error('❌ OpenRouter API error:', {
          status: response.status,
          statusText: response.statusText,
          model: this.model,
          messageCount: messages.length,
          errorText: errorText.substring(0, 200)
        });
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      // Parse response for extracted data and suggestions
      const extractedData = this.extractDataFromResponse(assistantMessage);
      const suggestedActions = this.generateSuggestedActions(messages, extractedData);

      return {
        response: assistantMessage,
        extractedData,
        suggestedActions,
      };
    } catch (error: any) {
      console.error('❌ OpenRouter API error:', {
        error: error.message,
        model: this.model,
        messageCount: messages.length,
        stack: error.stack?.substring(0, 200)
      });
      console.log('🔄 Falling back to mock response');
      return this.getMockResponse(messages);
    }
  }

  private getMockResponse(messages: ChatMessage[]) {
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    
    let response = "I'd be happy to help you plan your perfect event on Lake Travis!";
    let extractedData: any = {};
    let suggestedActions: any[] = [];

    // Check for event type mentions
    if (lastMessage.includes('birthday')) {
      response = "A birthday party on the water sounds amazing! How many guests are you expecting, and do you have a preferred date in mind?";
      extractedData.eventType = 'BIRTHDAY';
      suggestedActions = [
        { label: '10-20 guests', value: 'We have about 15 guests', icon: '👥' },
        { label: '20-30 guests', value: 'We have about 25 guests', icon: '👥' },
        { label: 'Next weekend', value: 'We want to book for next weekend', icon: '📅' },
      ];
    } else if (lastMessage.includes('bachelor') || lastMessage.includes('bachelorette')) {
      response = "Bachelor/ette parties are our specialty! We'll make it unforgettable. What size is your party and when's the big day?";
      extractedData.eventType = 'BACHELOR_BACHELORETTE';
      suggestedActions = [
        { label: 'Small group (8-12)', value: 'We have a small group of 10', icon: '👥' },
        { label: 'Large group (15-25)', value: 'We have about 20 people', icon: '👥' },
        { label: 'See availability', value: 'What dates are available?', icon: '📅' },
      ];
    } else if (lastMessage.includes('corporate') || lastMessage.includes('company')) {
      response = "Corporate events on our boats are perfect for team building! How many team members will be joining?";
      extractedData.eventType = 'CORPORATE';
      suggestedActions = [
        { label: '10-20 employees', value: 'About 15 employees', icon: '👔' },
        { label: '20-40 employees', value: 'About 30 employees', icon: '👔' },
        { label: 'Weekday event', value: 'We prefer a weekday', icon: '📅' },
      ];
    }

    // Extract group size
    const groupMatch = lastMessage.match(/(\d+)\s*(people|guests|persons?)/i);
    if (groupMatch) {
      extractedData.groupSize = parseInt(groupMatch[1]);
      response = `Perfect! A group of ${groupMatch[1]} guests. Let me check our availability. What date works best for you?`;
      suggestedActions = [
        { label: 'This weekend', value: 'This weekend works', icon: '📅' },
        { label: 'Next week', value: 'Sometime next week', icon: '📅' },
        { label: 'View pricing', value: 'What are your prices?', icon: '💰' },
      ];
    }

    // Extract contact info
    const emailMatch = lastMessage.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      extractedData.email = emailMatch[1];
    }

    const phoneMatch = lastMessage.match(/(\d{3}[-.]?\d{3}[-.]?\d{4})/);
    if (phoneMatch) {
      extractedData.phone = phoneMatch[1].replace(/[.-]/g, '');
    }

    // Default suggestions if none set
    if (suggestedActions.length === 0) {
      suggestedActions = [
        { label: '🎂 Birthday Party', value: "I'm planning a birthday party", icon: '🎂' },
        { label: '💍 Bachelor/ette', value: "I'm planning a bachelor party", icon: '💍' },
        { label: '🏢 Corporate Event', value: "I'm planning a corporate event", icon: '🏢' },
        { label: '📅 Check Availability', value: "What dates are available?", icon: '📅' },
        { label: '💰 View Pricing', value: "What are your prices?", icon: '💰' },
      ];
    }

    return {
      response,
      extractedData,
      suggestedActions,
    };
  }

  private extractDataFromResponse(response: string): any {
    // This would parse the AI response for extracted data
    // For now, returning empty object
    return {};
  }

  private generateSuggestedActions(messages: ChatMessage[], extractedData: any): any[] {
    // Generate contextual suggestions based on conversation state
    if (!extractedData.eventType) {
      return [
        { label: '🎂 Birthday Party', value: "I'm planning a birthday party", icon: '🎂' },
        { label: '💍 Bachelor/ette', value: "I'm planning a bachelor party", icon: '💍' },
        { label: '🏢 Corporate Event', value: "I'm planning a corporate event", icon: '🏢' },
      ];
    }

    if (!extractedData.groupSize) {
      return [
        { label: '10-20 guests', value: 'We have about 15 guests', icon: '👥' },
        { label: '20-30 guests', value: 'We have about 25 guests', icon: '👥' },
        { label: '30+ guests', value: 'We have more than 30 guests', icon: '👥' },
      ];
    }

    return [
      { label: 'Check Availability', value: 'What dates are available?', icon: '📅' },
      { label: 'View Pricing', value: 'What are your prices?', icon: '💰' },
      { label: 'Book Now', value: 'I want to book this', icon: '✅' },
    ];
  }
}

export const openRouterService = new OpenRouterService();
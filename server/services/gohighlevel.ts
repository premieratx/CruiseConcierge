import type { SMSOptions, SMSService } from './types';

class GoHighLevelService implements SMSService {
  private apiKey: string;
  private locationId: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.GOHIGHLEVEL_API_KEY || '';
    this.locationId = process.env.GOHIGHLEVEL_LOCATION_ID || '';
    this.baseUrl = 'https://rest.gohighlevel.com/v1';
  }

  isConfigured(): boolean {
    return !!(this.apiKey && this.locationId);
  }

  async send(options: SMSOptions): Promise<boolean> {
    if (!this.isConfigured()) {
      console.log('GoHighLevel not configured. Mocking SMS send:', options);
      return true;
    }

    try {
      const response = await fetch(`${this.baseUrl}/conversations/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'SMS',
          locationId: this.locationId,
          contactPhone: options.to,
          body: options.body,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('GoHighLevel SMS error:', error);
        return false;
      }

      console.log('SMS sent successfully via GoHighLevel to:', options.to);
      return true;
    } catch (error) {
      console.error('Failed to send SMS via GoHighLevel:', error);
      return false;
    }
  }
}

export const goHighLevelService = new GoHighLevelService();
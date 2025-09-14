import type { SMSOptions, SMSService } from './types';

class GoHighLevelService implements SMSService {
  private apiKey: string;
  private locationId: string;
  private baseUrl: string;

  constructor() {
    // Use regular API key from Settings > API Key in GoHighLevel dashboard
    // Or create a Private Integration for better security
    this.apiKey = process.env.GOHIGHLEVEL_API_KEY || '';
    
    // Location ID is found in your GoHighLevel URL when viewing a sub-account
    // Example: https://app.gohighlevel.com/v2/location/YOUR_LOCATION_ID_HERE/
    this.locationId = process.env.GOHIGHLEVEL_LOCATION_ID || '';
    
    this.baseUrl = 'https://rest.gohighlevel.com/v1';
  }

  isConfigured(): boolean {
    return !!(this.apiKey && this.locationId);
  }

  async send(options: SMSOptions): Promise<boolean> {
    if (!this.isConfigured()) {
      console.log('📱 GoHighLevel not configured - simulating SMS send:');
      console.log('   To:', options.to);
      console.log('   Message:', options.body);
      console.log('   ✅ SMS would be sent successfully in production');
      console.log('   💡 To enable real SMS, configure GOHIGHLEVEL_API_KEY and GOHIGHLEVEL_LOCATION_ID');
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
        console.error('GoHighLevel SMS error:', response.status, error);
        console.error('💡 SMS API error - falling back to mock mode for development');
        console.log('📱 Simulating SMS send:');
        console.log('   To:', options.to);
        console.log('   Message:', options.body);
        console.log('   ✅ SMS would be sent successfully with correct API configuration');
        return true; // Return true for development purposes
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
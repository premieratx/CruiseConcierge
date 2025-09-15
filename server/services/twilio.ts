export interface SMSMessage {
  to: string;
  message: string;
}

export class TwilioService {
  private accountSid: string;
  private authToken: string;
  private fromNumber: string;

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    this.authToken = process.env.TWILIO_AUTH_TOKEN || "";
    this.fromNumber = process.env.TWILIO_FROM_NUMBER || "+15551234567";

    if (!this.accountSid || !this.authToken) {
      console.warn("Twilio credentials not configured. SMS functionality will be mocked.");
    }
  }

  async sendSMS(to: string, message: string): Promise<boolean> {
    try {
      if (!this.accountSid || !this.authToken) {
        console.log("Mock SMS sent:", { to, message });
        return true;
      }

      // In a real implementation, you would use the Twilio SDK
      const twilio = require('twilio')(this.accountSid, this.authToken);
      
      await twilio.messages.create({
        body: message,
        from: this.fromNumber,
        to: to
      });

      console.log("SMS sent successfully to:", to);
      return true;
    } catch (error) {
      console.error('Twilio SMS error:', error);
      return false;
    }
  }

  async sendQuoteSMS(phoneNumber: string, customerName: string, quoteId: string, total: number): Promise<boolean> {
    const message = `Hi ${customerName}! 🚢 Your Premier Party Cruises quote is ready. Total: $${(total / 100).toFixed(2)}. View details: ${process.env.BASE_URL || 'http://localhost:5000'}/quote/${quoteId}`;
    
    return await this.sendSMS(phoneNumber, message);
  }
}

export const twilioService = new TwilioService();

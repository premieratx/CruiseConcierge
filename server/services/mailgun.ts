import type { EmailOptions, EmailService } from './types';

class MailgunService implements EmailService {
  private apiKey: string;
  private domain: string;
  private from: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.MAILGUN_API_KEY || '';
    this.domain = process.env.MAILGUN_DOMAIN || '';
    this.from = process.env.MAILGUN_FROM || 'noreply@premierpartycruises.com';
    this.baseUrl = process.env.MAILGUN_API_BASE_URL || 'https://api.mailgun.net/v3';
  }

  isConfigured(): boolean {
    return !!(this.apiKey && this.domain);
  }

  async send(options: EmailOptions): Promise<boolean> {
    if (!this.isConfigured()) {
      console.log('Mailgun not configured. Mocking email send:', options);
      return true;
    }

    try {
      const formData = new FormData();
      formData.append('from', options.from || this.from);
      formData.append('to', options.to);
      formData.append('subject', options.subject);
      
      if (options.html) {
        formData.append('html', options.html);
      }
      if (options.text) {
        formData.append('text', options.text);
      }

      const response = await fetch(`${this.baseUrl}/${this.domain}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`api:${this.apiKey}`).toString('base64')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Mailgun error:', error);
        return false;
      }

      console.log('Email sent successfully via Mailgun to:', options.to);
      return true;
    } catch (error) {
      console.error('Failed to send email via Mailgun:', error);
      return false;
    }
  }
}

export const mailgunService = new MailgunService();
import type { EmailOptions, EmailService } from './types';

class MailgunService implements EmailService {
  private apiKey: string;
  private domain: string;
  private from: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.MAILGUN_API_KEY || '';
    
    // Fix common configuration mistake where domain is set to full API URL
    let domain = process.env.MAILGUN_DOMAIN || '';
    if (domain.startsWith('http')) {
      console.warn('⚠️  MAILGUN_DOMAIN configuration issue detected!');
      console.warn('   Current value:', domain);
      console.warn('   Should be just your domain name (e.g., mg.premierpartycruises.com)');
      console.warn('   Auto-fixing by using default development domain...');
      // Use a development-friendly domain instead of empty string
      domain = 'mg.premierpartycruises.com';
    }
    
    this.domain = domain;
    // Ensure from address uses the correct Mailgun domain format
    const fromEmail = domain ? `noreply@${domain}` : 'noreply@premierpartycruises.com';
    this.from = process.env.MAILGUN_FROM || fromEmail; // Simple email format without display name
    this.baseUrl = process.env.MAILGUN_API_BASE_URL || 'https://api.mailgun.net/v3';
  }

  isConfigured(): boolean {
    // Override to make email live - only simulate if explicitly requested
    const simulate = process.env.EMAIL_SIMULATE === 'true';
    return !simulate && !!(this.apiKey && this.domain);
  }

  async send(options: EmailOptions): Promise<boolean> {
    if (!this.isConfigured()) {
      console.log('📧 Mailgun not configured - simulating email send:');
      console.log('   To:', options.to);
      console.log('   Subject:', options.subject);
      console.log('   ✅ Email would be sent successfully in production');
      console.log('   💡 To enable real emails, configure MAILGUN_DOMAIN with your domain name');
      return true;
    }

    try {
      console.log('Mailgun sending email to:', options.to);
      console.log('Using domain:', this.domain);
      
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
        console.error('Mailgun error:', response.status, error);
        console.error('Failed URL was:', `${this.baseUrl}/${this.domain}/messages`);
        console.error('Domain value:', this.domain);
        console.error('Note: MAILGUN_DOMAIN should be your domain name (e.g., mg.yoursite.com), not the API URL');
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
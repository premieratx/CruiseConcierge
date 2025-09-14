import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY not configured. Email functionality will be mocked.");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log("Mock email sent:", params);
      return true;
    }

    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
    });
    
    console.log("Email sent successfully to:", params.to);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendQuoteEmail(
  customerEmail: string,
  customerName: string,
  quoteId: string,
  quoteDetails: any
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #3b82f6, #06b6d4); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">🚢 Premier Party Cruises</h1>
        <p style="color: white; margin: 10px 0 0 0;">Your Quote is Ready!</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2>Hello ${customerName}!</h2>
        
        <p>Thank you for your interest in Premier Party Cruises! We've prepared a custom quote for your upcoming event.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Quote Details</h3>
          <p><strong>Event:</strong> ${quoteDetails.eventType || 'Party Cruise'}</p>
          <p><strong>Group Size:</strong> ${quoteDetails.groupSize || 'TBD'}</p>
          <p><strong>Date:</strong> ${quoteDetails.date || 'To be confirmed'}</p>
          <p><strong>Total:</strong> $${(quoteDetails.total / 100).toFixed(2)}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.BASE_URL || 'http://localhost:5000'}/public/quote/${quoteId}" 
             style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            View Full Quote
          </a>
        </div>
        
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

  return await sendEmail({
    to: customerEmail,
    from: process.env.SENDGRID_FROM_EMAIL || 'quotes@premierpartycruises.com',
    subject: '🚢 Your Party Cruise Quote is Ready!',
    html
  });
}

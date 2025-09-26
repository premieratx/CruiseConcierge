import { mailgunService } from './mailgun';
import { getFullUrl } from '../utils';

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  return await mailgunService.send({
    to: params.to,
    from: params.from,
    subject: params.subject,
    text: params.text,
    html: params.html
  });
}

export async function sendQuoteEmail(
  customerEmail: string,
  customerName: string,
  quoteId: string,
  quoteDetails: any,
  quoteUrl?: string
): Promise<boolean> {
  // Use secure URL if provided, otherwise fallback to basic URL for backward compatibility
  const quoteLink = quoteUrl || getFullUrl(`/quote/${quoteId}`);
  
  console.log('📧 Mailgun: Sending quote email with URL consistency check', {
    quoteId,
    hasSecureUrl: !!quoteUrl,
    urlType: quoteUrl ? 'secure tokenized' : 'basic fallback',
    urlLength: quoteLink.length,
    isTokenized: quoteLink.includes('token=')
  });

  // Check if this is a bachelor/bachelorette party that should show both options
  const isBachelorBachelorette = 
    quoteDetails.eventType?.toLowerCase().includes('bachelor') || 
    quoteDetails.eventType?.toLowerCase().includes('bachelorette');
  
  const showBothOptions = isBachelorBachelorette && quoteDetails.optionA && quoteDetails.optionB;

  let quoteDetailsHtml = '';
  
  if (showBothOptions) {
    // Bachelor/Bachelorette: Show both Private and Disco options
    quoteDetailsHtml = `
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #9333ea;">🎉 Two Amazing Options for Your ${quoteDetails.eventType}!</h3>
        <p><strong>Event:</strong> ${quoteDetails.eventType || 'Bachelor/Bachelorette Party'}</p>
        <p><strong>Group Size:</strong> ${quoteDetails.groupSize || 'TBD'}</p>
        <p><strong>Date:</strong> ${quoteDetails.date || 'To be confirmed'}</p>
        ${quoteDetails.timeSlot || quoteDetails.selectedSlot ? 
          `<p><strong>Time Slot:</strong> ${
            quoteDetails.timeSlot || 
            (quoteDetails.selectedSlot?.label || 
             (quoteDetails.selectedSlot?.startTime && quoteDetails.selectedSlot?.endTime ? 
              `${quoteDetails.selectedSlot.startTime} - ${quoteDetails.selectedSlot.endTime}` : 
              'TBD'))}</p>` : ''}
        
        <!-- Option A: Private Cruise -->
        <div style="border: 2px solid #3b82f6; border-radius: 8px; padding: 15px; margin: 15px 0; background: #eff6ff;">
          <h4 style="color: #1d4ed8; margin: 0 0 10px 0;">🚢 Option A: Private Cruise Experience</h4>
          <p style="margin: 5px 0; color: #374151;"><em>Your own private boat with captain</em></p>
          
          ${(quoteDetails.optionA?.packages || []).map((pkg: any) => `
            <div style="margin: 8px 0; padding: 8px; background: white; border-radius: 4px;">
              <strong>${pkg.name}</strong> - $${(pkg.total / 100).toFixed(2)}
              <div style="font-size: 12px; color: #6b7280;">${pkg.description}</div>
            </div>
          `).join('')}
          
          <p style="margin: 10px 0 5px 0; font-weight: bold; color: #1d4ed8;">
            Private Cruise Options: From $${quoteDetails.optionA?.packages?.[0] ? (quoteDetails.optionA.packages[0].total / 100).toFixed(2) : '1,200'}
          </p>
        </div>
        
        <!-- Option B: Disco Cruise -->
        <div style="border: 2px solid #9333ea; border-radius: 8px; padding: 15px; margin: 15px 0; background: #faf5ff;">
          <h4 style="color: #7c3aed; margin: 0 0 10px 0;">🎵 Option B: ATX Disco Cruise Experience</h4>
          <p style="margin: 5px 0; color: #374151;"><em>Join our signature party cruise</em></p>
          
          ${(quoteDetails.optionB?.packages || []).map((pkg: any) => `
            <div style="margin: 8px 0; padding: 8px; background: white; border-radius: 4px;">
              <strong>${pkg.name}</strong> - $${((pkg.pricePerPerson || 8500) / 100).toFixed(2)}/person
              <div style="font-size: 12px; color: #6b7280;">4-hour disco cruise with DJ and dancing</div>
            </div>
          `).join('')}
          
          <p style="margin: 10px 0 5px 0; font-weight: bold; color: #7c3aed;">
            Disco Cruise Options: From $${quoteDetails.optionB?.packages?.[0] ? ((quoteDetails.optionB.packages[0].pricePerPerson || 8500) / 100).toFixed(2) : '85'} per person
          </p>
        </div>
        
        <div style="text-align: center; margin: 15px 0; padding: 15px; background: #f0fdf4; border-radius: 8px;">
          <p style="margin: 0; color: #166534; font-weight: bold;">✨ Choose the perfect experience for your celebration! ✨</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #374151;">Click below to view full details and secure your preferred option</p>
        </div>
      </div>
    `;
  } else {
    // Standard single option quote
    quoteDetailsHtml = `
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Quote Details</h3>
        <p><strong>Event:</strong> ${quoteDetails.eventType || 'Party Cruise'}</p>
        <p><strong>Group Size:</strong> ${quoteDetails.groupSize || 'TBD'}</p>
        <p><strong>Date:</strong> ${quoteDetails.date || 'To be confirmed'}</p>
        ${quoteDetails.timeSlot || quoteDetails.selectedSlot ? 
          `<p><strong>Time Slot:</strong> ${
            quoteDetails.timeSlot || 
            (quoteDetails.selectedSlot?.label || 
             (quoteDetails.selectedSlot?.startTime && quoteDetails.selectedSlot?.endTime ? 
              `${quoteDetails.selectedSlot.startTime} - ${quoteDetails.selectedSlot.endTime}` : 
              'TBD'))}</p>` : ''}
        <p><strong>Total:</strong> $${(quoteDetails.total / 100).toFixed(2)}</p>
      </div>
    `;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0080FF, #FFD700); padding: 30px; text-align: center;">
        <div style="background: white; display: inline-block; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #0080FF; margin: 0;">⚓ Premier Party Cruises ⚓</h2>
        </div>
        <h1 style="color: white; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">Your Quote is Ready!</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">🚢 Lake Travis's Premier Party Boat Experience</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2>Hello ${customerName}!</h2>
        
        <p>Thank you for your interest in Premier Party Cruises! We've prepared a custom quote for your upcoming event.</p>
        
        ${quoteDetailsHtml}
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${quoteLink}" 
             style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            ${showBothOptions ? 'View Both Options & Choose' : 'View Full Quote'}
          </a>
        </div>
        
        <p>Questions? Reply to this email or call us at (512) 488-5892!</p>
        
        <p style="margin-top: 30px;">
          Best regards,<br>
          <strong>Premier Party Cruises Team</strong><br>
          Austin, Texas
        </p>
      </div>
      
      <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
        <p>Premier Party Cruises | Lake Travis, TX | premierpartycruises.com</p>
      </div>
    </div>
  `;

  return await mailgunService.send({
    to: customerEmail,
    from: process.env.MAILGUN_FROM || 'clientservices@premierpartycruises.com',
    subject: showBothOptions ? 
      '🎉 Two Amazing Options for Your Party!' : 
      '🚢 Your Party Cruise Quote is Ready!',
    html
  });
}
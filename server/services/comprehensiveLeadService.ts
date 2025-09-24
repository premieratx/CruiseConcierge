import { randomUUID } from "crypto";
import { storage } from "../storage";
import { googleSheetsService } from "./googleSheets";
import { goHighLevelService } from "./gohighlevel";
import { sendQuoteEmail } from "./mailgunEmail";
import { getFullUrl, getPublicUrl } from "../utils";
import { quoteTokenService } from "./quoteTokenService";

export interface ComprehensiveLeadData {
  name: string;
  email: string;
  phone: string;
  eventType?: string;
  eventTypeLabel?: string;
  groupSize?: number;
  cruiseDate?: string;
  source?: string;
  projectData?: any;
  quoteData?: any;
  selectedOptions?: any;
  pricing?: any;
}

export interface ComprehensiveLeadResult {
  success: boolean;
  leadId: string;
  projectId?: string;
  quoteId?: string;
  quoteUrl?: string;
  integrations: {
    googleSheets: { success: boolean; error?: string };
    goHighLevel: { success: boolean; error?: string; contactId?: string };
    emailNotification: { success: boolean; error?: string };
  };
  errors: string[];
}

/**
 * Comprehensive Lead Creation Service
 * 
 * This service orchestrates the complete lead creation flow including:
 * 1. Creating lead in local storage
 * 2. Generating quote with accessible URL
 * 3. Creating Google Sheets entry with quote link
 * 4. Creating GoHighLevel contact with quote link custom fields
 * 5. Sending email notification with quote link
 * 6. Robust error handling and logging
 */
export class ComprehensiveLeadService {
  
  /**
   * Creates a comprehensive lead across all integrated systems
   * 
   * @param leadData Lead information including contact details and event requirements
   * @returns Complete result with success status and integration details
   */
  async createComprehensiveLead(leadData: ComprehensiveLeadData): Promise<ComprehensiveLeadResult> {
    const result: ComprehensiveLeadResult = {
      success: false,
      leadId: '',
      integrations: {
        googleSheets: { success: false },
        goHighLevel: { success: false },
        emailNotification: { success: false }
      },
      errors: []
    };

    console.log('🚀 Starting comprehensive lead creation...', {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      eventType: leadData.eventType,
      source: leadData.source
    });

    try {
      // 1. Create or find contact in local storage
      console.log('📝 Step 1: Creating/finding contact in local storage...');
      let contact;
      try {
        contact = await storage.findOrCreateContact(
          leadData.email,
          leadData.name,
          leadData.phone
        );
        console.log('✅ Contact created/found:', contact.id);
      } catch (error: any) {
        console.error('❌ Failed to create contact:', error);
        result.errors.push(`Contact creation failed: ${error.message}`);
        return result;
      }

      result.leadId = contact.id;

      // 2. Create project if we have sufficient data
      let project;
      if (leadData.eventType || leadData.groupSize || leadData.cruiseDate) {
        console.log('📋 Step 2: Creating project...');
        try {
          project = await storage.createProject({
            contactId: contact.id,
            eventType: leadData.eventType || 'cruise',
            groupSize: leadData.groupSize,
            projectDate: leadData.cruiseDate ? new Date(leadData.cruiseDate) : undefined,
            preferredTime: leadData.projectData?.preferredTime,
            specialRequests: leadData.projectData?.specialRequests,
            budget: leadData.projectData?.budget,
            source: leadData.source || 'AI Chatbot Flow'
          });
          console.log('✅ Project created:', project.id);
          result.projectId = project.id;
        } catch (error: any) {
          console.error('❌ Failed to create project:', error);
          result.errors.push(`Project creation failed: ${error.message}`);
          // Continue with lead creation even if project fails
        }
      }

      // 3. Generate quote if we have project and quote data
      let quote;
      let quoteUrl;
      if (project && leadData.quoteData) {
        console.log('💰 Step 3: Generating quote...');
        try {
          // Create the quote first (without token)
          quote = await storage.createQuote({
            projectId: project.id,
            templateId: leadData.quoteData.templateId,
            items: leadData.quoteData.items || [],
            subtotal: leadData.pricing?.subtotal || 0,
            discountTotal: leadData.pricing?.discountTotal || 0,
            tax: leadData.pricing?.tax || 0,
            gratuity: leadData.pricing?.gratuity || 0,
            total: leadData.pricing?.total || 0,
            perPersonCost: leadData.pricing?.perPersonCost || 0,
            depositRequired: leadData.pricing?.depositRequired || false,
            depositPercent: leadData.pricing?.depositPercent || 0,
            depositAmount: leadData.pricing?.depositAmount || 0,
            paymentSchedule: leadData.pricing?.paymentSchedule || [],
            expiresAt: leadData.pricing?.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
          });
          
          // DEBUG: Log the quote object to see what token was returned
          console.log('🐛 DEBUG: Quote object returned:', {
            id: quote.id,
            accessToken: quote.accessToken ? quote.accessToken.substring(0, 50) + '...' : 'NULL',
            hasAccessToken: !!quote.accessToken
          });
          
          // Use the SAME token that was stored in the database for the URL
          // This ensures complete token consistency between database and URL
          const baseUrl = getPublicUrl().replace(/\/$/, '');
          quoteUrl = `${baseUrl}/chat?quote=${encodeURIComponent(quote.accessToken)}`;
          
          console.log('✅ Quote created with token consistency:', quote.id);
          console.log('🔗 Quote URL:', quoteUrl);
          console.log('🔐 Using database token for URL:', quote.accessToken ? 'YES' : 'NO');
          console.log('🔐 Token preview:', quote.accessToken ? quote.accessToken.substring(0, 50) + '...' : 'NULL');
          result.quoteId = quote.id;
          result.quoteUrl = quoteUrl;
        } catch (error: any) {
          console.error('❌ Failed to create quote:', error);
          result.errors.push(`Quote creation failed: ${error.message}`);
          // Continue with integrations even if quote fails
        }
      }

      // 4. Create Google Sheets entry with quote link
      console.log('📊 Step 4: Creating Google Sheets lead entry...');
      try {
        const sheetsSuccess = await googleSheetsService.createLead({
          leadId: contact.id,
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          eventType: leadData.eventType,
          eventTypeLabel: leadData.eventTypeLabel,
          source: leadData.source || 'AI Chatbot Flow',
          quoteUrl: quoteUrl,
          quoteId: quote?.id,
          cruiseDate: leadData.cruiseDate,
          groupSize: leadData.groupSize
        });

        result.integrations.googleSheets.success = sheetsSuccess;
        if (sheetsSuccess) {
          console.log('✅ Google Sheets entry created successfully');
        } else {
          console.log('⚠️ Google Sheets entry creation failed');
          result.errors.push('Google Sheets integration failed');
        }
      } catch (error: any) {
        console.error('❌ Google Sheets integration error:', error);
        result.integrations.googleSheets.error = error.message;
        result.errors.push(`Google Sheets integration error: ${error.message}`);
      }

      // 5. Create GoHighLevel contact with quote link custom fields
      console.log('🎯 Step 5: Creating GoHighLevel contact with quote link...');
      try {
        const goHLContactId = await goHighLevelService.createLeadWithQuoteLink({
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          eventType: leadData.eventType,
          eventTypeLabel: leadData.eventTypeLabel,
          groupSize: leadData.groupSize,
          cruiseDate: leadData.cruiseDate,
          source: leadData.source || 'AI Chatbot Flow',
          quoteLink: quoteUrl,
          leadId: contact.id
        });

        if (goHLContactId) {
          result.integrations.goHighLevel.success = true;
          result.integrations.goHighLevel.contactId = goHLContactId;
          console.log('✅ GoHighLevel contact created successfully:', goHLContactId);
        } else {
          console.log('⚠️ GoHighLevel contact creation failed');
          result.errors.push('GoHighLevel integration failed');
        }
      } catch (error: any) {
        console.error('❌ GoHighLevel integration error:', error);
        result.integrations.goHighLevel.error = error.message;
        result.errors.push(`GoHighLevel integration error: ${error.message}`);
      }

      // 6. Send email notification with quote link (if quote exists) - Using Mailgun
      if (quote && quoteUrl && leadData.email) {
        console.log('📧 Step 6: Sending email notification with quote link...');
        try {
          // Prepare email data for quote notification
          const quoteDetails = {
            eventType: leadData.eventType || 'Party Cruise',
            eventTypeLabel: leadData.eventTypeLabel || leadData.eventType || 'Party Cruise',
            groupSize: leadData.groupSize || 'TBD',
            date: leadData.cruiseDate || 'To be confirmed',
            total: quote.total || 0,
            subtotal: quote.subtotal || 0,
            tax: quote.tax || 0,
            gratuity: quote.gratuity || 0
          };

          console.log('📧 Sending Mailgun email to:', leadData.email);
          console.log('🔗 FIXED: Using secure quote URL in email:', quoteUrl);
          
          // CRITICAL FIX: Use secure quote URL consistently across all integrations
          const emailSuccess = await sendQuoteEmail(
            leadData.email,
            leadData.name,
            quote.id,
            quoteDetails,
            quoteUrl  // Pass secure URL to ensure consistency
          );

          if (emailSuccess) {
            result.integrations.emailNotification.success = true;
            console.log('✅ Email notification sent successfully via Mailgun');
          } else {
            result.integrations.emailNotification.success = false;
            result.integrations.emailNotification.error = 'Mailgun email sending failed';
            result.errors.push('Mailgun email notification failed');
            console.error('❌ Mailgun email notification failed');
          }
        } catch (error: any) {
          console.error('❌ Email notification error:', error);
          result.integrations.emailNotification.success = false;
          result.integrations.emailNotification.error = error.message;
          result.errors.push(`Email notification error: ${error.message}`);
        }
      } else {
        console.log('ℹ️ Skipping email notification - missing quote, URL, or email address');
        console.log(`   Quote: ${!!quote}, URL: ${!!quoteUrl}, Email: ${!!leadData.email}`);
      }

      // 7. Determine overall success
      const criticalSuccess = (
        result.leadId && 
        (result.integrations.googleSheets.success || result.integrations.goHighLevel.success)
      );

      result.success = Boolean(criticalSuccess);

      if (result.success) {
        console.log('🎉 Comprehensive lead creation completed successfully!');
        console.log('📊 Integration Results:', {
          googleSheets: result.integrations.googleSheets.success ? '✅' : '❌',
          goHighLevel: result.integrations.goHighLevel.success ? '✅' : '❌',
          emailNotification: result.integrations.emailNotification.success ? '✅' : '❌'
        });
      } else {
        console.log('⚠️ Comprehensive lead creation completed with issues');
        console.log('❌ Errors:', result.errors);
      }

      return result;

    } catch (error: any) {
      console.error('💥 Critical error in comprehensive lead creation:', error);
      result.errors.push(`Critical error: ${error.message}`);
      result.success = false;
      return result;
    }
  }

  /**
   * Updates an existing lead with quote information across all systems
   * 
   * @param leadId Existing lead/contact ID
   * @param quoteData Quote information to update
   * @returns Update result
   */
  async updateLeadWithQuote(leadId: string, quoteData: {
    quoteId: string;
    quoteUrl: string;
    projectId?: string;
    pricing?: any;
  }): Promise<{ success: boolean; errors: string[] }> {
    const errors: string[] = [];
    console.log('🔄 Updating existing lead with quote information...', leadId);

    try {
      // Update Google Sheets
      try {
        await googleSheetsService.updateLead(leadId, {
          quoteUrl: quoteData.quoteUrl,
          quoteId: quoteData.quoteId,
          status: 'QUOTED',
          progress: 'complete'
        });
        console.log('✅ Google Sheets updated with quote info');
      } catch (error: any) {
        console.error('❌ Failed to update Google Sheets:', error);
        errors.push(`Google Sheets update failed: ${error.message}`);
      }

      // Update GoHighLevel contact with quote link custom field
      // Note: This would require additional API calls to find and update the contact
      console.log('ℹ️ GoHighLevel quote update not implemented yet');

      return {
        success: errors.length === 0,
        errors
      };
    } catch (error: any) {
      console.error('💥 Error updating lead with quote:', error);
      errors.push(`Update error: ${error.message}`);
      return { success: false, errors };
    }
  }

  /**
   * Creates a lead from chatbot interaction with automatic quote generation
   * 
   * @param chatData Extracted data from chatbot conversation
   * @returns Comprehensive lead result
   */
  async createLeadFromChatbot(chatData: {
    name: string;
    email: string;
    phone: string;
    eventType?: string;
    eventTypeLabel?: string;
    groupSize?: number;
    preferredDate?: string;
    selectedOptions?: any;
    extractedData?: any;
  }): Promise<ComprehensiveLeadResult> {
    console.log('🤖 Creating lead from chatbot interaction...');

    // Try to auto-generate quote if we have sufficient data
    let quoteData;
    let pricing;

    if (chatData.eventType && chatData.groupSize) {
      try {
        // Get template for event type
        const templates = await storage.getQuoteTemplatesByEventType(chatData.eventType);
        if (templates.length > 0) {
          const template = templates[0];
          
          // Calculate pricing
          pricing = await storage.calculatePricing({
            items: template.defaultItems,
            groupSize: chatData.groupSize,
            projectDate: chatData.preferredDate ? new Date(chatData.preferredDate) : undefined,
            templateId: template.id,
          });

          quoteData = {
            templateId: template.id,
            items: template.defaultItems
          };
        }
      } catch (error) {
        console.log('⚠️ Auto-quote generation failed, continuing without quote');
      }
    }

    return this.createComprehensiveLead({
      name: chatData.name,
      email: chatData.email,
      phone: chatData.phone,
      eventType: chatData.eventType,
      eventTypeLabel: chatData.eventTypeLabel,
      groupSize: chatData.groupSize,
      cruiseDate: chatData.preferredDate,
      source: 'AI Chatbot Flow',
      quoteData,
      pricing
    });
  }

  /**
   * Creates a lead from manual admin entry
   * 
   * @param adminData Lead data entered by admin
   * @returns Comprehensive lead result
   */
  async createLeadFromAdmin(adminData: ComprehensiveLeadData): Promise<ComprehensiveLeadResult> {
    console.log('👨‍💼 Creating lead from admin entry...');
    
    return this.createComprehensiveLead({
      ...adminData,
      source: adminData.source || 'Admin Entry'
    });
  }

  /**
   * Handles abandoned lead capture with partial information
   * 
   * @param partialData Partial lead information
   * @returns Comprehensive lead result
   */
  async createAbandonedLead(partialData: {
    sessionId: string;
    name?: string;
    email?: string;
    phone?: string;
    eventType?: string;
    eventTypeLabel?: string;
    groupSize?: number;
    preferredDate?: string;
    chatbotData?: any;
  }): Promise<ComprehensiveLeadResult> {
    console.log('🚪 Creating abandoned lead...');

    // Only create comprehensive lead if we have minimum contact info
    if (!partialData.name || !partialData.email || !partialData.phone) {
      console.log('ℹ️ Insufficient contact info for comprehensive lead, creating partial lead only');
      
      // Create partial lead in Google Sheets
      try {
        await googleSheetsService.createPartialLead({
          partialLeadId: randomUUID(),
          sessionId: partialData.sessionId,
          name: partialData.name,
          email: partialData.email,
          phone: partialData.phone,
          eventType: partialData.eventType,
          eventTypeLabel: partialData.eventTypeLabel,
          preferredDate: partialData.preferredDate,
          groupSize: partialData.groupSize,
          chatbotData: partialData.chatbotData,
          status: 'abandoned',
          source: 'Abandoned Chatbot Session'
        });
      } catch (error) {
        console.error('❌ Failed to create partial lead:', error);
      }

      return {
        success: false,
        leadId: '',
        integrations: {
          googleSheets: { success: false },
          goHighLevel: { success: false },
          emailNotification: { success: false }
        },
        errors: ['Insufficient contact information for comprehensive lead creation']
      };
    }

    return this.createComprehensiveLead({
      name: partialData.name,
      email: partialData.email,
      phone: partialData.phone,
      eventType: partialData.eventType,
      eventTypeLabel: partialData.eventTypeLabel,
      groupSize: partialData.groupSize,
      cruiseDate: partialData.preferredDate,
      source: 'Abandoned Lead Recovery'
    });
  }
}

export const comprehensiveLeadService = new ComprehensiveLeadService();
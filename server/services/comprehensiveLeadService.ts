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
    smsNotification: { success: boolean; error?: string };
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
        emailNotification: { success: false },
        smsNotification: { success: false }
      },
      errors: []
    };

    // 🎯 CRITICAL GROUPSIZE DEBUG: Track groupSize at service entry
    console.log("🔍 GROUPSIZE TRACK - SERVICE RECEIVED:", {
      leadDataGroupSize: leadData.groupSize,
      selectedOptionsTicketQuantity: leadData.selectedOptions?.ticketQuantity,
      selectedOptionsGroupSizeLabel: leadData.selectedOptions?.groupSizeLabel,
      timestamp: new Date().toISOString()
    });

    console.log('🚀 Starting comprehensive lead creation...', {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      eventType: leadData.eventType,
      groupSize: leadData.groupSize,
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
          // 🎯 CRITICAL GROUPSIZE DEBUG: Track values before quote creation
          console.log("🔍 GROUPSIZE TRACK - BEFORE QUOTE CREATION:", {
            leadDataGroupSize: leadData.groupSize,
            projectGroupSize: project?.groupSize,
            finalGroupSizeWillBe: leadData.groupSize || project?.groupSize || 1,
            selectedOptionsTicketQuantity: leadData.selectedOptions?.ticketQuantity,
            timestamp: new Date().toISOString()
          });
          
          // Create the quote with ALL user selections (CRITICAL FIX)
          quote = await storage.createQuote({
            projectId: project.id,
            templateId: leadData.quoteData.templateId,
            items: leadData.quoteData.items || [],
            
            // CRITICAL FIX: SAVE COMPLETE CONTACT INFO directly to quote for standalone viewing
            contactInfo: {
              firstName: leadData.name.split(' ')[0] || '',
              lastName: leadData.name.split(' ').slice(1).join(' ') || '',
              email: leadData.email,
              phone: leadData.phone
            },
            
            // CRITICAL FIX: SAVE COMPLETE EVENT DETAILS with all user selections  
            eventDetails: {
              eventType: leadData.eventType || project?.eventType || 'cruise',
              eventTypeLabel: leadData.eventTypeLabel || leadData.eventType || 'Cruise',
              eventEmoji: leadData.selectedOptions?.eventEmoji || '🚢',
              eventDate: leadData.cruiseDate || project?.projectDate?.toISOString() || new Date().toISOString(),
              // 🎯 CRITICAL FIX: ALWAYS use submitted groupSize - NO CONDITIONAL LOGIC
              // This is the user's explicit selection from the UI and must NEVER be overridden
              groupSize: leadData.groupSize, // AUTHORITATIVE: Direct from user submission - NO fallbacks
              specialRequests: leadData.projectData?.specialRequests || project?.specialRequests || '',
              budget: leadData.projectData?.budget || project?.budget || ''
            },
            
            // CRITICAL FIX: SAVE COMPLETE SELECTION DETAILS with cruise/slot selections
            selectionDetails: {
              cruiseType: leadData.selectedOptions?.cruiseType || leadData.quoteData?.cruiseType,
              selectedSlot: leadData.selectedOptions?.selectedSlot || leadData.quoteData?.selectedSlot,
              selectedPackages: leadData.selectedOptions?.selectedPackages || [],
              discoPackage: leadData.selectedOptions?.discoPackage || leadData.quoteData?.discoPackage,
              ticketQuantity: leadData.selectedOptions?.ticketQuantity || leadData.groupSize,
              selectedDuration: leadData.selectedOptions?.selectedDuration || leadData.quoteData?.selectedDuration,
              selectedBoat: leadData.selectedOptions?.selectedBoat || leadData.quoteData?.selectedBoat,
              preferredTimeLabel: leadData.selectedOptions?.preferredTimeLabel || '',
              groupSizeLabel: leadData.selectedOptions?.groupSizeLabel || `${leadData.groupSize || 1} people`
            },
            
            // Pricing information
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
          
          // Store basic info for now - we'll generate the REAL URL from Google Sheets data later
          // 🎯 CRITICAL GROUPSIZE DEBUG: Track quote creation result
          console.log("🔍 GROUPSIZE TRACK - AFTER QUOTE CREATION:", {
            quoteId: quote.id,
            createdQuoteGroupSize: quote.eventDetails?.groupSize,
            timestamp: new Date().toISOString()
          });
          
          console.log('✅ Quote created:', quote.id);
          result.quoteId = quote.id;
          
          // NOTE: We'll generate the quote URL from Google Sheets data after the lead is saved
          // This ensures the URL contains complete lead information for pre-population
        } catch (error: any) {
          console.error('❌ Failed to create quote:', error);
          result.errors.push(`Quote creation failed: ${error.message}`);
          // Continue with integrations even if quote fails
        }
      }

      // 4. Create Google Sheets entry (without quote URL initially)
      console.log('📊 Step 4: Creating Google Sheets lead entry...');
      let leadId: string = contact.id;
      try {
        const sheetsSuccess = await googleSheetsService.createLead({
          leadId: contact.id,
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          eventType: leadData.eventType,
          eventTypeLabel: leadData.eventTypeLabel,
          source: leadData.source || 'AI Chatbot Flow',
          quoteUrl: '', // Initially empty - we'll update this after reading back the complete data
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

      // 4.5. CRITICAL FIX: ALWAYS generate simple parameter URL and update Column Q for EVERY lead
      // This must happen for ALL leads, not just those with quotes!
      if (result.integrations.googleSheets.success) {
        console.log('🔗 Step 4.5: ALWAYS Generating simple parameter URL for Column Q...');
        try {
          // 🎯 CRITICAL FIX: Generate simple parameter URL for EVERY lead
          console.log('🔗 Creating human-readable parameter URL with event details');
          
          // Format the date as YYYY-MM-DD
          // CRITICAL FIX: Parse date carefully to avoid timezone issues
          let formattedDate = '';
          if (leadData.cruiseDate) {
            // If cruiseDate is already in YYYY-MM-DD format, use it directly
            if (typeof leadData.cruiseDate === 'string' && /^\d{4}-\d{2}-\d{2}/.test(leadData.cruiseDate)) {
              // Extract just the date part (YYYY-MM-DD) in case it has time component
              formattedDate = leadData.cruiseDate.split('T')[0];
            } else {
              // If it's a Date object or ISO string with time, extract local date components
              const dateObj = new Date(leadData.cruiseDate);
              if (!isNaN(dateObj.getTime())) {
                // Use local date methods to preserve the intended date
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                formattedDate = `${year}-${month}-${day}`;
              }
            }
          }
          
          // Get the event type (lowercase, no spaces)
          const eventType = (leadData.eventType || 'cruise').toLowerCase().replace(/\s+/g, '');
          
          // Get the group size - use leadData first, then quote if available, then default to 1
          const groupSize = leadData.groupSize || quote?.eventDetails?.groupSize || 1;
          
          // Build URL parameters
          const params = new URLSearchParams();
          
          // Add date parameter if we have it
          if (formattedDate) {
            params.append('date', formattedDate);
          }
          
          // Add party type parameter
          params.append('party', eventType);
          
          // Add people count parameter
          params.append('people', String(groupSize));
          
          // Add contact=done to signal modal bypass
          params.append('contact', 'done');
          
          // Generate the full URL
          const baseUrl = getPublicUrl();
          const simpleQuoteUrl = `${baseUrl}/chat?${params.toString()}`;
          
          console.log('🔗 CRITICAL: Generated simple parameter URL for Column Q:', {
            url: simpleQuoteUrl,
            parameters: {
              date: formattedDate || 'not set',
              party: eventType,
              people: groupSize,
              contact: 'done'
            },
            leadId: leadId,
            hasQuote: !!quote
          });
          
          // CRITICAL: Update Column Q in Google Sheets with the generated URL - MUST succeed!
          const updateSuccess = await googleSheetsService.updateQuoteUrlInColumnQ(
            leadId,
            simpleQuoteUrl
          );
          
          if (updateSuccess) {
            console.log('✅ CRITICAL SUCCESS: Column Q updated with simple parameter URL');
            result.quoteUrl = simpleQuoteUrl;
            quoteUrl = simpleQuoteUrl; // Update for use in notifications
            
            // 🎯 CRITICAL FIX: Also update the Contact record in local storage with quote URL
            try {
              console.log('💾 CRITICAL: Updating Contact record in local storage with quote URL');
              const updatedContact = await storage.updateContact(contact.id, {
                quoteUrl: simpleQuoteUrl
              });
              console.log('✅ CRITICAL SUCCESS: Contact record updated with quote URL in local storage:', {
                contactId: contact.id,
                quoteUrl: simpleQuoteUrl
              });
            } catch (error: any) {
              console.error('❌ CRITICAL ERROR: Failed to update Contact record with quote URL:', error);
              result.errors.push(`CRITICAL: Failed to update Contact record with quote URL: ${error.message}`);
            }
          } else {
            // This is CRITICAL - log loudly if this fails
            console.error('❌ CRITICAL FAILURE: Failed to update Column Q with quote URL - THIS MUST BE FIXED!');
            result.errors.push('CRITICAL: Failed to update quote URL in Column Q of Google Sheets');
          }
        } catch (error: any) {
          // This is CRITICAL - log the full error
          console.error('❌ CRITICAL ERROR generating simple parameter URL:', error);
          console.error('Full error details:', error.stack);
          result.errors.push(`CRITICAL: Quote URL generation failed: ${error.message}`);
        }
      } else {
        // Log if Google Sheets creation failed so we know why Column Q wasn't updated
        console.warn('⚠️ WARNING: Cannot update Column Q because Google Sheets lead creation failed');
      }

      // 5. Create GoHighLevel contact with quote link custom fields (using the URL from Column Q)
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

      // 6.1. Send SMS notification with Column Q URL - ENHANCED DEBUGGING
      if (quote && quoteUrl && leadData.phone) {
        console.log('📱 Step 6.1: Sending SMS notification with Column Q URL...');
        console.log('🔧 SMS DEBUG: Environment Check');
        console.log('   GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN exists:', !!process.env.GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN);
        console.log('   GOHIGHLEVEL_LOCATION_ID exists:', !!process.env.GOHIGHLEVEL_LOCATION_ID);
        console.log('   FROM_PHONE exists:', !!process.env.FROM_PHONE);
        console.log('   SMS_SIMULATE setting:', process.env.SMS_SIMULATE);
        
        try {
          // Use GoHighLevel SMS service as specified in requirements
          const smsMessage = `Hi ${leadData.name}! 🚢 Your cruise quote is ready: ${quoteUrl}. Questions? Reply here or call us!`;
          
          console.log('📱 SMS Payload Details:');
          console.log('   To Phone:', leadData.phone);
          console.log('   Lead Name:', leadData.name);
          console.log('   Quote URL:', quoteUrl);
          console.log('   Message:', smsMessage);
          console.log('   Message Length:', smsMessage.length);
          
          // Check if GoHighLevel service is properly configured
          const debugInfo = goHighLevelService.getDebugInfo();
          console.log('🔧 GoHighLevel Service Configuration Status:', debugInfo.isConfigured);
          console.log('🔧 Detailed Configuration Debug:', debugInfo);
          
          if (!debugInfo.isConfigured) {
            console.error('❌ GoHighLevel service is not properly configured!');
            console.log('💡 Configuration Requirements:');
            console.log('   Required: GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN + GOHIGHLEVEL_LOCATION_ID');
            console.log('   OR: GOHIGHLEVEL_CLIENT_ID + GOHIGHLEVEL_CLIENT_SECRET + GOHIGHLEVEL_LOCATION_ID');
            console.log('   Current Config:', {
              hasApiKey: debugInfo.hasApiKey,
              hasClientCredentials: debugInfo.hasClientId && debugInfo.hasClientSecret,
              hasLocationId: debugInfo.hasLocationId,
              authMethod: debugInfo.authMethod,
              smsSimulate: debugInfo.smsSimulate
            });
            result.integrations.smsNotification = { success: false, error: 'GoHighLevel service not configured' };
            result.errors.push('GoHighLevel SMS service not configured');
          } else {
            console.log('✅ GoHighLevel service is configured, attempting SMS send...');
            
            // CRITICAL FIX: Use GoHighLevel SMS with enhanced error reporting
            const smsSuccess = await goHighLevelService.sendSMS({
              to: leadData.phone,
              body: smsMessage,
              name: leadData.name
            });
            
            console.log('📱 SMS Send Result:', smsSuccess);
            
            if (smsSuccess) {
              result.integrations.smsNotification = { success: true };
              console.log('✅ SMS notification sent successfully via GoHighLevel with Column Q URL');
              console.log('🎉 SMS SUCCESS: Message delivered to', leadData.phone);
            } else {
              result.integrations.smsNotification = { success: false, error: 'GoHighLevel SMS sending returned false' };
              result.errors.push('GoHighLevel SMS notification failed - service returned false');
              console.error('❌ GoHighLevel SMS notification failed - service returned false');
              console.error('💡 This could indicate:');
              console.error('   1. Authentication issues with GoHighLevel');
              console.error('   2. Invalid phone number format');
              console.error('   3. Missing required scopes (conversations.write)');
              console.error('   4. API rate limiting');
              console.error('   5. GoHighLevel service unavailable');
            }
          }
        } catch (error: any) {
          console.error('❌ SMS notification error:', error);
          console.error('📱 Error Details:');
          console.error('   Error Type:', error.constructor.name);
          console.error('   Error Message:', error.message);
          console.error('   Error Stack:', error.stack?.substring(0, 500));
          result.integrations.smsNotification = { success: false, error: error.message };
          result.errors.push(`SMS notification error: ${error.message}`);
        }
      } else {
        console.log('ℹ️ Skipping SMS notification - missing required data');
        console.log('📱 SMS Skip Reason Analysis:');
        console.log('   Has Quote:', !!quote, quote ? `(ID: ${quote.id})` : '');
        console.log('   Has Quote URL:', !!quoteUrl, quoteUrl ? `(URL: ${quoteUrl.substring(0, 50)}...)` : '');
        console.log('   Has Phone:', !!leadData.phone, leadData.phone ? `(Phone: ${leadData.phone})` : '');
        console.log('   Lead Name:', leadData.name || 'undefined');
        
        if (!quote) console.log('   ❌ Missing quote object');
        if (!quoteUrl) console.log('   ❌ Missing quote URL');
        if (!leadData.phone) console.log('   ❌ Missing phone number');
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
          emailNotification: result.integrations.emailNotification.success ? '✅' : '❌',
          smsNotification: result.integrations.smsNotification.success ? '✅' : '❌'
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
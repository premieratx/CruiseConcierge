import { storage } from "../storage";
import { type Quote, type QuoteTemplate, type Project, type Contact, type PricingPreview } from "@shared/schema";

interface RenderContext {
  quote: Quote;
  project: Project;
  contact: Contact;
  template?: QuoteTemplate;
  pricing: PricingPreview;
  format: 'html' | 'text' | 'json' | 'pdf';
}

interface RenderedQuote {
  content: string;
  subject?: string;
  metadata: {
    templateId?: string;
    theme?: string;
    format: string;
    generatedAt: Date;
  };
}

export class TemplateRenderer {
  
  /**
   * Render a quote using template-based formatting
   */
  async renderQuote(
    quoteId: string, 
    format: 'html' | 'text' | 'json' | 'pdf' = 'html'
  ): Promise<RenderedQuote> {
    const quote = await storage.getQuote(quoteId);
    if (!quote) throw new Error("Quote not found");

    const project = await storage.getProject(quote.projectId);
    if (!project) throw new Error("Project not found");

    const contact = await storage.getContact(project.contactId);
    if (!contact) throw new Error("Contact not found");

    const template = quote.templateId ? await storage.getQuoteTemplate(quote.templateId) : undefined;

    // Calculate current pricing
    const pricing = await storage.calculatePricing({
      items: quote.items,
      groupSize: project.groupSize || undefined,
      projectDate: project.projectDate || undefined,
      promoCode: quote.promoCode || undefined,
      templateId: quote.templateId || undefined,
    });

    const context: RenderContext = {
      quote,
      project,
      contact,
      template,
      pricing,
      format,
    };

    switch (format) {
      case 'html':
        return this.renderHTML(context);
      case 'text':
        return this.renderText(context);
      case 'json':
        return this.renderJSON(context);
      case 'pdf':
        return this.renderPDF(context);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  /**
   * Render quote as HTML for email or web display
   */
  private async renderHTML(context: RenderContext): Promise<RenderedQuote> {
    const { quote, project, contact, template, pricing } = context;
    
    const theme = template?.visualTheme || {};
    const primaryColor = theme.primaryColor || '#2E86AB';
    const accentColor = theme.accentColor || '#A23B72';

    const subject = this.generateSubject(context);
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote ${quote.id}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .quote-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, ${primaryColor}, ${accentColor});
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px;
        }
        .event-details {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
        }
        .event-details h3 {
            margin: 0 0 15px 0;
            color: ${primaryColor};
            font-size: 18px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .items-section {
            margin-bottom: 25px;
        }
        .items-section h3 {
            color: ${primaryColor};
            margin-bottom: 15px;
            font-size: 18px;
        }
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .item:last-child {
            border-bottom: none;
        }
        .item-name {
            font-weight: 500;
        }
        .item-details {
            font-size: 14px;
            color: #6c757d;
        }
        .item-price {
            font-weight: 600;
            color: ${primaryColor};
        }
        .pricing-summary {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
        }
        .pricing-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .pricing-row.total {
            font-weight: 600;
            font-size: 18px;
            color: ${primaryColor};
            border-top: 2px solid ${primaryColor};
            padding-top: 12px;
            margin-top: 12px;
        }
        .payment-info {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
        }
        .payment-info h3 {
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        .urgency-message {
            background: linear-gradient(135deg, #fd7e14, #e63946);
            color: white;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 25px;
            text-align: center;
            font-weight: 500;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #6c757d;
            font-size: 14px;
            border-top: 1px solid #e9ecef;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: ${primaryColor};
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 10px 5px;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .content { padding: 20px; }
            .detail-row, .pricing-row, .item {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="quote-container">
        <div class="header">
            <h1>🚢 Premier Party Cruises</h1>
            <p>Your Austin Lake Experience Awaits</p>
        </div>
        
        <div class="content">
            <div class="event-details">
                <h3>Event Details</h3>
                <div class="detail-row">
                    <span>Customer:</span>
                    <span><strong>${contact.name}</strong></span>
                </div>
                <div class="detail-row">
                    <span>Event Type:</span>
                    <span>${project.eventType || 'Party Cruise'}</span>
                </div>
                ${project.projectDate ? `
                <div class="detail-row">
                    <span>Date:</span>
                    <span>${this.formatDate(project.projectDate)}</span>
                </div>
                ` : ''}
                ${project.groupSize ? `
                <div class="detail-row">
                    <span>Group Size:</span>
                    <span>${project.groupSize} guests</span>
                </div>
                ` : ''}
                ${project.duration ? `
                <div class="detail-row">
                    <span>Duration:</span>
                    <span>${project.duration} hours</span>
                </div>
                ` : ''}
            </div>

            ${pricing.urgencyMessage ? `
            <div class="urgency-message">
                ${pricing.urgencyMessage}
            </div>
            ` : ''}

            <div class="items-section">
                <h3>Package Includes</h3>
                ${quote.items.map(item => `
                <div class="item">
                    <div>
                        <div class="item-name">${item.name}</div>
                        ${item.description ? `<div class="item-details">${item.description}</div>` : ''}
                    </div>
                    <div class="item-price">
                        ${item.qty}x ${this.formatCurrency(item.unitPrice)}
                    </div>
                </div>
                `).join('')}
            </div>

            <div class="pricing-summary">
                <div class="pricing-row">
                    <span>Subtotal:</span>
                    <span>${this.formatCurrency(pricing.subtotal)}</span>
                </div>
                ${pricing.discountTotal > 0 ? `
                <div class="pricing-row">
                    <span>Discount (${pricing.appliedDiscounts.join(', ')}):</span>
                    <span>-${this.formatCurrency(pricing.discountTotal)}</span>
                </div>
                ` : ''}
                <div class="pricing-row">
                    <span>Tax (8.25%):</span>
                    <span>${this.formatCurrency(pricing.tax)}</span>
                </div>
                ${pricing.gratuity > 0 ? `
                <div class="pricing-row">
                    <span>Gratuity (18%):</span>
                    <span>${this.formatCurrency(pricing.gratuity)}</span>
                </div>
                ` : ''}
                <div class="pricing-row total">
                    <span>Total:</span>
                    <span>${this.formatCurrency(pricing.total)}</span>
                </div>
                ${pricing.perPersonCost > 0 ? `
                <div class="pricing-row">
                    <span>Per Person:</span>
                    <span>${this.formatCurrency(pricing.perPersonCost)}</span>
                </div>
                ` : ''}
            </div>

            <div class="payment-info">
                <h3>💳 Payment Information</h3>
                <div class="detail-row">
                    <span>Deposit Required:</span>
                    <span><strong>${this.formatCurrency(pricing.depositAmount)} (${pricing.depositPercent}%)</strong></span>
                </div>
                ${pricing.paymentSchedule.length > 1 ? `
                <div class="detail-row">
                    <span>Final Payment:</span>
                    <span>${this.formatCurrency(pricing.total - pricing.depositAmount)} due 3 days before event</span>
                </div>
                ` : ''}
                ${pricing.expiresAt ? `
                <div class="detail-row">
                    <span>Quote Expires:</span>
                    <span>${this.formatDate(pricing.expiresAt)}</span>
                </div>
                ` : ''}
            </div>

            <div style="text-align: center;">
                <a href="#" class="btn">💳 Book Now</a>
                <a href="#" class="btn" style="background: #6c757d;">📞 Call Us</a>
            </div>
        </div>

        <div class="footer">
            <p>Questions? Call us at (512) 555-BOAT or email info@premiercruises.com</p>
            <p>This quote is valid for 7 days and subject to availability.</p>
        </div>
    </div>
</body>
</html>`;

    return {
      content: html,
      subject,
      metadata: {
        templateId: template?.id,
        theme: template?.visualTheme?.theme,
        format: 'html',
        generatedAt: new Date(),
      },
    };
  }

  /**
   * Render quote as plain text for SMS or plain email
   */
  private async renderText(context: RenderContext): Promise<RenderedQuote> {
    const { quote, project, contact, template, pricing } = context;
    
    const subject = this.generateSubject(context);
    
    const text = `
🚢 PREMIER PARTY CRUISES - QUOTE

Customer: ${contact.name}
Event: ${project.eventType || 'Party Cruise'}
${project.projectDate ? `Date: ${this.formatDate(project.projectDate)}` : ''}
${project.groupSize ? `Group Size: ${project.groupSize} guests` : ''}

PACKAGE INCLUDES:
${quote.items.map(item => `• ${item.name} - ${this.formatCurrency(item.unitPrice * item.qty)}`).join('\n')}

PRICING:
Subtotal: ${this.formatCurrency(pricing.subtotal)}
${pricing.discountTotal > 0 ? `Discount: -${this.formatCurrency(pricing.discountTotal)}` : ''}
Tax: ${this.formatCurrency(pricing.tax)}
${pricing.gratuity > 0 ? `Gratuity: ${this.formatCurrency(pricing.gratuity)}` : ''}
TOTAL: ${this.formatCurrency(pricing.total)}
${pricing.perPersonCost > 0 ? `Per Person: ${this.formatCurrency(pricing.perPersonCost)}` : ''}

PAYMENT:
Deposit Required: ${this.formatCurrency(pricing.depositAmount)} (${pricing.depositPercent}%)
${pricing.paymentSchedule.length > 1 ? `Final Payment: ${this.formatCurrency(pricing.total - pricing.depositAmount)} due 3 days before` : ''}

${pricing.urgencyMessage ? `⚡ ${pricing.urgencyMessage}` : ''}

Book now: [BOOKING_LINK]
Questions? Call (512) 555-BOAT

Quote expires: ${pricing.expiresAt ? this.formatDate(pricing.expiresAt) : '7 days from now'}
    `.trim();

    return {
      content: text,
      subject,
      metadata: {
        templateId: template?.id,
        format: 'text',
        generatedAt: new Date(),
      },
    };
  }

  /**
   * Render quote as JSON for API consumption
   */
  private async renderJSON(context: RenderContext): Promise<RenderedQuote> {
    const { quote, project, contact, template, pricing } = context;
    
    const data = {
      quote: {
        id: quote.id,
        status: quote.status,
        items: quote.items,
        version: quote.version,
      },
      project: {
        id: project.id,
        title: project.title,
        eventType: project.eventType,
        projectDate: project.projectDate,
        groupSize: project.groupSize,
        duration: project.duration,
      },
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      },
      template: template ? {
        id: template.id,
        name: template.name,
        eventType: template.eventType,
        visualTheme: template.visualTheme,
      } : null,
      pricing,
      formatting: {
        currency: 'USD',
        locale: 'en-US',
        timezone: 'America/Chicago',
      },
      generatedAt: new Date().toISOString(),
    };

    return {
      content: JSON.stringify(data, null, 2),
      metadata: {
        templateId: template?.id,
        format: 'json',
        generatedAt: new Date(),
      },
    };
  }

  /**
   * Render quote as PDF (placeholder - would integrate with PDF generation library)
   */
  private async renderPDF(context: RenderContext): Promise<RenderedQuote> {
    // In a real implementation, this would use a PDF library like puppeteer or jsPDF
    // For now, we'll return HTML that can be converted to PDF
    const htmlResult = await this.renderHTML({ ...context, format: 'html' });
    
    return {
      content: htmlResult.content,
      subject: htmlResult.subject,
      metadata: {
        templateId: context.template?.id,
        format: 'pdf',
        generatedAt: new Date(),
      },
    };
  }

  /**
   * Generate email subject line based on context
   */
  private generateSubject(context: RenderContext): string {
    const { project, contact, template } = context;
    
    const eventType = project.eventType || 'Event';
    const customerName = contact.name.split(' ')[0]; // First name only
    
    if (template?.name) {
      return `${template.name} Quote for ${customerName} - Premier Party Cruises`;
    }
    
    return `${eventType} Quote for ${customerName} - Premier Party Cruises`;
  }

  /**
   * Format currency values
   */
  private formatCurrency(cents: number): string {
    return `$${(cents / 100).toFixed(2)}`;
  }

  /**
   * Format dates consistently
   */
  private formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Apply template rules to modify quote content
   */
  async applyTemplateRules(quote: Quote, project: Project): Promise<{ items: any[]; messages: string[] }> {
    if (!quote.templateId) {
      return { items: quote.items, messages: [] };
    }

    const template = await storage.getQuoteTemplate(quote.templateId);
    if (!template || !template.automationRules.length) {
      return { items: quote.items, messages: [] };
    }

    let modifiedItems = [...quote.items];
    const messages: string[] = [];

    // Apply each automation rule
    for (const ruleId of template.automationRules) {
      const rule = await storage.getTemplateRule(ruleId);
      if (!rule || !rule.active) continue;

      // Evaluate rule conditions
      const conditionsMet = rule.conditions.every(condition => 
        this.evaluateRuleCondition(condition, { quote, project })
      );

      if (conditionsMet) {
        // Execute rule actions
        for (const action of rule.actions) {
          const result = this.executeRuleAction(action, { items: modifiedItems, project });
          modifiedItems = result.items;
          if (result.message) {
            messages.push(result.message);
          }
        }
      }
    }

    return { items: modifiedItems, messages };
  }

  private evaluateRuleCondition(condition: any, context: { quote: Quote; project: Project }): boolean {
    const { field, operator, value } = condition;
    let contextValue: any;

    // Extract context value based on field
    switch (field) {
      case 'groupSize':
        contextValue = context.project.groupSize;
        break;
      case 'eventType':
        contextValue = context.project.eventType;
        break;
      case 'daysBefore':
        if (context.project.projectDate) {
          contextValue = Math.ceil((context.project.projectDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        }
        break;
      default:
        contextValue = null;
    }

    // Evaluate condition
    switch (operator) {
      case 'equals':
        return contextValue === value;
      case 'greater_than':
        return contextValue > value;
      case 'less_than':
        return contextValue < value;
      case 'contains':
        return contextValue && contextValue.toString().toLowerCase().includes(value.toLowerCase());
      default:
        return false;
    }
  }

  private executeRuleAction(action: any, context: { items: any[]; project: Project }): { items: any[]; message?: string } {
    const { actionType, target, value, parameters } = action;
    let items = [...context.items];
    let message: string | undefined;

    switch (actionType) {
      case 'add_item':
        items.push({
          type: parameters?.type || 'addon',
          name: value.name,
          unitPrice: value.unitPrice,
          qty: value.qty || 1,
          order: items.length + 1,
        });
        message = `Added ${value.name} based on event requirements`;
        break;
        
      case 'modify_price':
        items = items.map(item => {
          if (item.productId === target || item.name === target) {
            return {
              ...item,
              unitPrice: Math.floor(item.unitPrice * (1 + value / 100)),
            };
          }
          return item;
        });
        message = `Applied ${value}% adjustment to ${target}`;
        break;
        
      case 'require_deposit':
        // This would be handled at the pricing level
        message = `Deposit requirement updated based on event type`;
        break;
    }

    return { items, message };
  }
}

export const templateRenderer = new TemplateRenderer();
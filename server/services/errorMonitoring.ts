import type { Request } from 'express';
import { mailgunService } from './mailgun';
import { goHighLevelService } from './gohighlevel';

export type ErrorSeverity = 'CRITICAL' | 'ERROR';

export interface ErrorAlertOptions {
  error: Error;
  severity: ErrorSeverity;
  request?: Request;
  context?: string;
}

class ErrorMonitoringService {
  private ownerPhone: string;
  private ownerEmail: string;
  private websiteUrl = 'premierpartycruises.com';

  constructor() {
    // Use environment variables with fallback defaults
    this.ownerPhone = process.env.ERROR_ALERT_PHONE || '5125767975';
    this.ownerEmail = process.env.ERROR_ALERT_EMAIL || 'ppcaustin@gmail.com';

    // Log warnings if using default fallback values
    if (!process.env.ERROR_ALERT_PHONE) {
      console.warn('⚠️ ERROR_ALERT_PHONE not set, using default value: 5125767975');
    }
    if (!process.env.ERROR_ALERT_EMAIL) {
      console.warn('⚠️ ERROR_ALERT_EMAIL not set, using default value: ppcaustin@gmail.com');
    }

    // Log configuration status on startup
    console.log('📧 Error Monitoring Service initialized:');
    console.log(`   Phone: ${this.ownerPhone} ${process.env.ERROR_ALERT_PHONE ? '(from env)' : '(default)'}`);
    console.log(`   Email: ${this.ownerEmail} ${process.env.ERROR_ALERT_EMAIL ? '(from env)' : '(default)'}`);
  }

  /**
   * Send error alert via SMS and/or Email based on severity
   * CRITICAL: Sends both SMS and Email
   * ERROR: Sends Email only
   */
  async sendAlert(options: ErrorAlertOptions): Promise<void> {
    const { error, severity, request, context } = options;
    
    try {
      const timestamp = new Date().toISOString();
      const environment = process.env.NODE_ENV || 'development';
      const errorType = error.name || 'Error';
      const errorMessage = error.message || 'Unknown error';
      
      // Truncate stack trace to first 500 characters for SMS/email
      const stackTrace = error.stack || 'No stack trace available';
      const truncatedStack = stackTrace.substring(0, 500);
      const fullStack = stackTrace;
      
      // Extract request info if available
      const requestInfo = request ? {
        method: request.method,
        path: request.path,
        query: JSON.stringify(request.query),
        ip: request.ip,
        userAgent: request.get('user-agent') || 'Unknown'
      } : null;

      console.log(`🚨 Error Monitoring: ${severity} alert triggered`);
      console.log(`   Error: ${errorType} - ${errorMessage}`);
      console.log(`   Environment: ${environment}`);
      console.log(`   Context: ${context || 'None'}`);

      // Send SMS alert for CRITICAL errors
      if (severity === 'CRITICAL') {
        const smsMessage = `🚨 CRITICAL ERROR on ${this.websiteUrl}: ${errorType} - ${errorMessage}. Check email for details.`;
        
        try {
          const smsSent = await goHighLevelService.send({
            to: this.ownerPhone,
            body: smsMessage
          });
          
          if (smsSent) {
            console.log('✅ Critical error SMS alert sent successfully');
          } else {
            console.warn('⚠️ Failed to send critical error SMS alert');
          }
        } catch (smsError: any) {
          console.error('❌ Error sending SMS alert:', smsError.message);
        }
      }

      // Send Email alert for both CRITICAL and ERROR severity
      const emailSubject = `🚨 ${severity === 'CRITICAL' ? 'Critical' : ''} Error: ${errorType}`;
      const emailHtml = this.generateEmailHtml({
        severity,
        errorType,
        errorMessage,
        timestamp,
        environment,
        truncatedStack,
        fullStack,
        requestInfo,
        context
      });

      const emailText = this.generateEmailText({
        severity,
        errorType,
        errorMessage,
        timestamp,
        environment,
        fullStack,
        requestInfo,
        context
      });

      try {
        const emailSent = await mailgunService.send({
          to: this.ownerEmail,
          subject: emailSubject,
          html: emailHtml,
          text: emailText
        });

        if (emailSent) {
          console.log('✅ Error email alert sent successfully');
        } else {
          console.warn('⚠️ Failed to send error email alert');
        }
      } catch (emailError: any) {
        console.error('❌ Error sending email alert:', emailError.message);
      }

    } catch (monitoringError: any) {
      // Don't let monitoring errors crash the app
      console.error('❌ Error in error monitoring service:', monitoringError.message);
    }
  }

  /**
   * Generate HTML email content for error alert
   */
  private generateEmailHtml(params: {
    severity: ErrorSeverity;
    errorType: string;
    errorMessage: string;
    timestamp: string;
    environment: string;
    truncatedStack: string;
    fullStack: string;
    requestInfo: any;
    context?: string;
  }): string {
    const {
      severity,
      errorType,
      errorMessage,
      timestamp,
      environment,
      fullStack,
      requestInfo,
      context
    } = params;

    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: ${severity === 'CRITICAL' ? '#dc2626' : '#ea580c'};
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #f9fafb;
      padding: 20px;
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
    .info-block {
      background-color: white;
      padding: 15px;
      margin: 10px 0;
      border-radius: 6px;
      border-left: 4px solid #3b82f6;
    }
    .info-label {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 5px;
    }
    .info-value {
      color: #4b5563;
      font-family: 'Courier New', monospace;
      word-break: break-word;
    }
    .stack-trace {
      background-color: #1f2937;
      color: #f3f4f6;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      line-height: 1.4;
    }
    .severity-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      background-color: ${severity === 'CRITICAL' ? '#fef2f2' : '#fff7ed'};
      color: ${severity === 'CRITICAL' ? '#dc2626' : '#ea580c'};
      font-weight: 600;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">🚨 ${severity === 'CRITICAL' ? 'Critical' : ''} Server Error Detected</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Website: ${this.websiteUrl}</p>
  </div>
  
  <div class="content">
    <div class="info-block">
      <div class="info-label">Severity</div>
      <div><span class="severity-badge">${severity}</span></div>
    </div>

    <div class="info-block">
      <div class="info-label">Error Type</div>
      <div class="info-value">${errorType}</div>
    </div>

    <div class="info-block">
      <div class="info-label">Error Message</div>
      <div class="info-value">${errorMessage}</div>
    </div>

    <div class="info-block">
      <div class="info-label">Timestamp</div>
      <div class="info-value">${new Date(timestamp).toLocaleString('en-US', { 
        timeZone: 'America/Chicago',
        dateStyle: 'full',
        timeStyle: 'long'
      })}</div>
    </div>

    <div class="info-block">
      <div class="info-label">Environment</div>
      <div class="info-value">${environment}</div>
    </div>

    ${context ? `
    <div class="info-block">
      <div class="info-label">Context</div>
      <div class="info-value">${context}</div>
    </div>
    ` : ''}

    ${requestInfo ? `
    <div class="info-block">
      <div class="info-label">Request Information</div>
      <div class="info-value">
        <strong>Method:</strong> ${requestInfo.method}<br>
        <strong>Path:</strong> ${requestInfo.path}<br>
        <strong>Query:</strong> ${requestInfo.query}<br>
        <strong>IP:</strong> ${requestInfo.ip}<br>
        <strong>User Agent:</strong> ${requestInfo.userAgent}
      </div>
    </div>
    ` : ''}

    <div class="info-block">
      <div class="info-label">Stack Trace</div>
      <div class="stack-trace">${this.escapeHtml(fullStack)}</div>
    </div>

    <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 6px; border-left: 4px solid #3b82f6;">
      <strong>Action Required:</strong> Please investigate this error immediately and take appropriate action to prevent further issues.
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generate plain text email content for error alert
   */
  private generateEmailText(params: {
    severity: ErrorSeverity;
    errorType: string;
    errorMessage: string;
    timestamp: string;
    environment: string;
    fullStack: string;
    requestInfo: any;
    context?: string;
  }): string {
    const {
      severity,
      errorType,
      errorMessage,
      timestamp,
      environment,
      fullStack,
      requestInfo,
      context
    } = params;

    let text = `🚨 ${severity === 'CRITICAL' ? 'CRITICAL' : ''} SERVER ERROR DETECTED

Website: ${this.websiteUrl}

SEVERITY: ${severity}

ERROR TYPE: ${errorType}

ERROR MESSAGE: ${errorMessage}

TIMESTAMP: ${new Date(timestamp).toLocaleString('en-US', { 
  timeZone: 'America/Chicago',
  dateStyle: 'full',
  timeStyle: 'long'
})}

ENVIRONMENT: ${environment}
`;

    if (context) {
      text += `\nCONTEXT: ${context}`;
    }

    if (requestInfo) {
      text += `\nREQUEST INFORMATION:
  Method: ${requestInfo.method}
  Path: ${requestInfo.path}
  Query: ${requestInfo.query}
  IP: ${requestInfo.ip}
  User Agent: ${requestInfo.userAgent}
`;
    }

    text += `\nSTACK TRACE:
${fullStack}

---
Action Required: Please investigate this error immediately and take appropriate action to prevent further issues.
`;

    return text;
  }

  /**
   * Escape HTML special characters
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  /**
   * Check if error monitoring is configured
   */
  isConfigured(): boolean {
    return goHighLevelService.isConfigured() || mailgunService.isConfigured();
  }

  /**
   * Check if environment variables are set for owner contact info
   */
  isContactConfigured(): boolean {
    return !!(process.env.ERROR_ALERT_PHONE && process.env.ERROR_ALERT_EMAIL);
  }

  /**
   * Get owner contact information with source indication
   */
  getContactInfo() {
    return {
      phone: this.ownerPhone,
      email: this.ownerEmail,
      phoneSource: process.env.ERROR_ALERT_PHONE ? 'environment' : 'default',
      emailSource: process.env.ERROR_ALERT_EMAIL ? 'environment' : 'default'
    };
  }
}

export const errorMonitoringService = new ErrorMonitoringService();

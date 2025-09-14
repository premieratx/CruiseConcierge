export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

export interface EmailService {
  isConfigured(): boolean;
  send(options: EmailOptions): Promise<boolean>;
}

export interface SMSOptions {
  to: string;
  body: string;
}

export interface SMSService {
  isConfigured(): boolean;
  send(options: SMSOptions): Promise<boolean>;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatService {
  isConfigured(): boolean;
  processMessage(messages: ChatMessage[], context?: any): Promise<{
    response: string;
    extractedData?: any;
    suggestedActions?: Array<{
      label: string;
      value: string;
      icon?: string;
    }>;
  }>;
}
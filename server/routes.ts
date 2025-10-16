import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import path from "path";
import { createReadStream, existsSync, statSync } from "fs";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import passport from "passport";
import { setupAuth, PasswordService } from "./auth";
import { requireAuth, requireAdmin } from "./middleware/auth";
import { randomBytes } from "crypto";

// Augment Express Request type to include our custom properties
declare module 'express-serve-static-core' {
  interface Request {
    adminUser?: AdminUser;
    session?: any;
    customerId?: string;
    customerSession?: any;
  }
}

// Lazy loading imports - moved to avoid expensive startup operations
let storage: any = null;
let googleSheetsService: any = null;
let mailgunService: any = null;
let openRouterService: any = null;
let goHighLevelService: any = null;
let mailgunEmail: any = null;
let mailgunQuoteEmail: any = null;
let comprehensiveLeadService: any = null;
let wisprFlowService: any = null;
let generateQuoteDescription: any = null;
let openaiService: any = null;
type LeadWebhookPayload = any;
import { insertContactSchema, insertProjectSchema, insertChatMessageSchema, insertAdminChatSessionSchema, insertAdminChatMessageSchema, insertUserSchema, insertInviteSchema, insertQuoteTemplateSchema, insertTemplateRuleSchema, insertDiscountRuleSchema, insertPricingSettingsSchema, insertPricingAdjustmentSchema, insertProductSchema, insertAffiliateSchema, insertDiscoSlotSchema, insertTimeframeSchema, insertSmsAuthTokenSchema, insertCustomerSessionSchema, insertPortalActivityLogSchema, insertPartialLeadSchema, insertBlogPostSchema, insertBlogAuthorSchema, insertBlogCategorySchema, insertBlogTagSchema, insertBlogCommentSchema, insertBlogAnalyticsSchema, insertSeoPageSchema, insertSeoCompetitorSchema, insertContentBlockSchema, insertPromptsLibrarySchema, endorsements, type LeadData, type LeadUpdateData, type CreateLeadRequest, type PartialLeadFilters, type SEOOptimizationRequest, type SEOBulkOperation, type AdminChatSession, type AdminChatMessage, type Endorsement } from "@shared/schema";
import { calculateServerPricing, type ServerPricingRequest } from './serverPricing';
import { PRICING_DEFAULTS } from "@shared/constants";
import { getPrivateTimeSlotsForDate, getDiscoTimeSlotsForDate, parseTimeToDate, getTimeSlotById } from "@shared/timeSlots";
import { templateRenderer } from "./services/templateRenderer";
import { z } from "zod";
import { randomUUID, randomInt } from "crypto";
import multer from 'multer';
import slugify from 'slugify';
import Database from "@replit/database";
import { formatBlogPost } from './services/gemini';
import axios from 'axios';
import FormData from 'form-data';

// Slug utility functions
function generateSlugFromText(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"`!:@]/g
  });
}

async function generateUniqueSlug(
  baseSlug: string, 
  checkExistsFn: (slug: string) => Promise<any>
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (await checkExistsFn(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    
    // Prevent infinite loops
    if (counter > 1000) {
      throw new Error('Unable to generate unique slug after 1000 attempts');
    }
  }
  
  return slug;
}

function isSlugConflictError(error: any): boolean {
  return error?.code === '23505' || // PostgreSQL unique constraint violation
         error?.message?.includes('duplicate key value') ||
         error?.message?.includes('unique constraint');
}

// Lazy loading - these will be imported when needed
let mediaLibraryService: any = null;
let ObjectStorageService: any = null;
let ObjectNotFoundError: any = null;
let ObjectPermission: any = null;
let quoteTokenService: any = null;
let seedQuoteTemplates: any = null;
let agenticAIService: any = null;
let toolExecutor: any = null;
import { getFullUrl, getPublicUrl, getQuoteUrl } from "./utils";
import { insertMediaSchema, insertAgentTaskSchema, insertAgentToolSchema, insertAgentExecutionSchema } from "@shared/schema";
import sanitizeHtml from 'sanitize-html';
import TurndownService from 'turndown';
import { format } from "date-fns";
import { XMLParser } from 'fast-xml-parser';

// ===== REAL-TIME CACHE INVALIDATION VIA SERVER-SENT EVENTS =====
interface SSEClient {
  id: string;
  response: any;
  lastPing: Date;
}

const sseClients: Map<string, SSEClient> = new Map();

// Send real-time event to all connected SSE clients
function broadcastRealtimeEvent(event: {
  type: string;
  slotId?: string;
  eventDate?: string;
  boatId?: string;
  startTime?: string;
  endTime?: string;
  weekStart?: string;
  discoSlotId?: string;
  ticketsSold?: number;
  // New fields for enhanced event types
  quoteId?: string;
  leadId?: string;
  contactId?: string;
  projectId?: string;
  bookingId?: string;
  leadStatus?: string;
  eventTitle?: string;
  customerName?: string;
  customerEmail?: string;
  amount?: number;
  timestamp?: string;
  data?: any;
}) {
  const eventData = JSON.stringify(event);
  console.log(`🚨 BROADCASTING REALTIME EVENT to ${sseClients.size} SSE clients:`, event);
  
  if (sseClients.size === 0) {
    console.warn(`⚠️ NO SSE CLIENTS CONNECTED - real-time updates will not be received!`);
    return;
  }
  
  let successCount = 0;
  let failureCount = 0;
  
  // Send to all connected clients
  for (const [clientId, client] of sseClients.entries()) {
    try {
      client.response.write(`data: ${eventData}\n\n`);
      successCount++;
      console.log(`✅ Realtime event sent to client ${clientId}`);
    } catch (error) {
      failureCount++;
      console.error(`❌ Failed to send to client ${clientId}:`, error);
      // Remove dead connection
      sseClients.delete(clientId);
    }
  }
  
  console.log(`📊 Realtime event broadcast complete: ${successCount} success, ${failureCount} failed`);
}

// Backward compatibility alias
const broadcastCacheInvalidation = broadcastRealtimeEvent;

// Clean up dead SSE connections every 5 minutes
setInterval(() => {
  const now = new Date();
  for (const [clientId, client] of sseClients.entries()) {
    const timeSinceLastPing = now.getTime() - client.lastPing.getTime();
    if (timeSinceLastPing > 5 * 60 * 1000) { // 5 minutes
      console.log(`🧹 Cleaning up stale SSE client ${clientId}`);
      sseClients.delete(clientId);
    }
  }
}, 5 * 60 * 1000);

// Lazy initialization functions
const getStorage = async () => {
  if (!storage) {
    try {
      const storageModule = await import('./storage');
      storage = storageModule.storage;
    } catch (error) {
      console.error('Failed to initialize storage:', error);
      throw new Error('Storage initialization failed');
    }
  }
  return storage;
};

const getGoogleSheetsService = async () => {
  if (!googleSheetsService) {
    try {
      const { googleSheetsService: service } = await import('./services/googleSheets');
      googleSheetsService = service;
    } catch (error) {
      console.error('Failed to initialize Google Sheets service:', error);
      // Return a mock service to prevent crashes
      return { addLeadToSheet: async () => ({ success: false, error: 'Service unavailable' }) };
    }
  }
  return googleSheetsService;
};

const getMailgunService = async () => {
  if (!mailgunService) {
    try {
      const { mailgunService: service } = await import('./services/mailgun');
      mailgunService = service;
    } catch (error) {
      console.error('Failed to initialize Mailgun service:', error);
      return { sendEmail: async () => ({ success: false, error: 'Service unavailable' }) };
    }
  }
  return mailgunService;
};

const getMailgunEmailFunctions = async () => {
  if (!mailgunEmail || !mailgunQuoteEmail) {
    try {
      const { sendEmail, sendQuoteEmail } = await import('./services/mailgunEmail');
      mailgunEmail = sendEmail;
      mailgunQuoteEmail = sendQuoteEmail;
    } catch (error) {
      console.error('Failed to initialize Mailgun email functions:', error);
      return {
        sendEmail: async () => false,
        sendQuoteEmail: async () => false
      };
    }
  }
  return { sendEmail: mailgunEmail, sendQuoteEmail: mailgunQuoteEmail };
};

const getOpenRouterService = async () => {
  if (!openRouterService) {
    try {
      const { openRouterService: service } = await import('./services/openrouter');
      openRouterService = service;
    } catch (error) {
      console.error('Failed to initialize OpenRouter service:', error);
      return { generateResponse: async () => 'Service temporarily unavailable' };
    }
  }
  return openRouterService;
};

const getGoHighLevelService = async () => {
  if (!goHighLevelService) {
    try {
      const { goHighLevelService: service } = await import('./services/gohighlevel');
      goHighLevelService = service;
    } catch (error) {
      console.error('Failed to initialize GoHighLevel service:', error);
      return { createContact: async () => ({ success: false, error: 'Service unavailable' }) };
    }
  }
  return goHighLevelService;
};

const getComprehensiveLeadService = async () => {
  if (!comprehensiveLeadService) {
    try {
      const { ComprehensiveLeadService } = await import('./services/comprehensiveLeadService');
      comprehensiveLeadService = new ComprehensiveLeadService();
    } catch (error) {
      console.error('Failed to initialize Comprehensive Lead service:', error);
      return { createComprehensiveLead: async () => ({ success: false, error: 'Service unavailable' }) };
    }
  }
  return comprehensiveLeadService;
};

const getWisprFlowService = async () => {
  if (!wisprFlowService) {
    try {
      const { wisprFlowService: service } = await import('./services/wispr');
      wisprFlowService = service;
    } catch (error) {
      console.error('Failed to initialize Wispr Flow service:', error);
      return { isAvailable: () => false, transcribe: async () => ({ text: 'Service unavailable' }) };
    }
  }
  return wisprFlowService;
};

const getQuoteDescription = async () => {
  if (!generateQuoteDescription) {
    try {
      const { generateQuoteDescription: func } = await import('./services/openai');
      generateQuoteDescription = func;
    } catch (error) {
      console.error('Failed to initialize OpenAI service:', error);
      return async () => 'Standard cruise package';
    }
  }
  return generateQuoteDescription;
};

const getMediaLibraryService = async () => {
  if (!mediaLibraryService) {
    try {
      const { MediaLibraryService } = await import('./services/mediaLibrary');
      mediaLibraryService = new MediaLibraryService();
    } catch (error) {
      console.error('Failed to initialize Media Library service:', error);
      return { getMediaLibrary: async () => [], uploadMedia: async () => ({ success: false }) };
    }
  }
  return mediaLibraryService;
};

let seoService: any = null;

const getSEOService = async () => {
  if (!seoService) {
    try {
      const { SEOService } = await import('./services/seoService');
      seoService = new SEOService();
    } catch (error) {
      console.error('Failed to initialize SEO service:', error);
      return { 
        optimizePage: async () => ({ optimizedData: {}, aiSuggestions: [], model: 'none' }),
        analyzePage: async () => ({ score: 0, issues: [], recommendations: [] }),
        getAllSeoPages: async () => [],
        getSeoPage: async () => null,
        updateSeoPage: async () => null,
        bulkAnalyze: async () => ({ results: [], model: 'none' }),
        bulkOptimize: async () => ({ results: [], model: 'none' })
      };
    }
  }
  return seoService;
};

const getObjectStorageService = async () => {
  if (!ObjectStorageService) {
    try {
      const services = await import('./objectStorage');
      ObjectStorageService = services.ObjectStorageService;
      ObjectNotFoundError = services.ObjectNotFoundError;
    } catch (error) {
      console.error('Failed to initialize Object Storage service:', error);
      return null;
    }
  }
  return ObjectStorageService;
};

const getObjectPermission = async () => {
  if (!ObjectPermission) {
    try {
      const { ObjectPermission: permission } = await import('./objectAcl');
      ObjectPermission = permission;
    } catch (error) {
      console.error('Failed to initialize Object Permission:', error);
      return {};
    }
  }
  return ObjectPermission;
};

const getQuoteTokenService = async () => {
  if (!quoteTokenService) {
    try {
      const { quoteTokenService: service } = await import('./services/quoteTokenService');
      quoteTokenService = service;
    } catch (error) {
      console.error('Failed to initialize Quote Token service:', error);
      return { generateSecureQuoteUrl: () => '#', validateQuoteToken: () => false };
    }
  }
  return quoteTokenService;
};

const getSeedQuoteTemplates = async () => {
  if (!seedQuoteTemplates) {
    try {
      const { seedQuoteTemplates: func } = await import('./seedTemplates');
      seedQuoteTemplates = func;
    } catch (error) {
      console.error('Failed to initialize seed quote templates:', error);
      return async () => {};
    }
  }
  return seedQuoteTemplates;
};

const getAgenticAIService = async () => {
  if (!agenticAIService) {
    try {
      const { agenticAIService: service } = await import('./services/agenticAI');
      agenticAIService = service;
      
      // Initialize dependencies
      const storage = await getStorage();
      const toolExecutorInstance = await getToolExecutor();
      
      service.setStorage(storage);
      service.setToolExecutor(toolExecutorInstance);
    } catch (error) {
      console.error('Failed to initialize Agentic AI service:', error);
      return { 
        createTask: async () => ({ success: false, error: 'Service unavailable' }),
        getTaskStatus: async () => null,
        listTasks: async () => [],
        cancelTask: async () => false,
        getAgentPoolStatus: () => ({ totalAgents: 0, idleAgents: 0, busyAgents: 0, queuedTasks: 0, agents: [] }),
        getHealthStatus: () => ({ status: 'unhealthy', openaiConnected: false, storageConnected: false, activeAgents: 0, queuedTasks: 0, errors: ['Service unavailable'] })
      };
    }
  }
  return agenticAIService;
};

const getToolExecutor = async () => {
  if (!toolExecutor) {
    try {
      const { toolExecutor: executor } = await import('./services/toolExecutor');
      toolExecutor = executor;
      
      // Initialize with available services
      const storage = await getStorage();
      const mediaService = await getMediaLibraryService();
      
      executor.setServices({
        storage,
        mediaService
      });
    } catch (error) {
      console.error('Failed to initialize Tool Executor:', error);
      return { 
        execute: async () => ({ success: false, error: 'Service unavailable', executionTime: 0 }),
        getExecutionStats: () => ({ totalExecutions: 0, rateLimits: [] })
      };
    }
  }
  return toolExecutor;
};

const getOpenAIService = async () => {
  if (!openaiService) {
    try {
      const { default: OpenAI } = await import('openai');
      openaiService = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
    } catch (error) {
      console.error('Failed to initialize OpenAI service:', error);
      return null;
    }
  }
  return openaiService;
};

/**
 * Process admin AI message using GPT-5 for coding and admin operations
 */
async function processAdminAIMessage(
  content: string,
  conversationHistory: { role: string; content: string }[],
  metadata: any = {}
): Promise<{
  content: string;
  messageType?: string;
  codeLanguage?: string;
  metadata?: any;
  tokens?: number;
}> {
  try {
    const openai = await getOpenAIService();
    
    if (!openai) {
      return {
        content: "I'm sorry, OpenAI service is not configured. Please set up the OPENAI_API_KEY environment variable to enable AI assistance.",
        messageType: 'text',
        metadata: { error: 'service_unavailable' }
      };
    }

    // Build system prompt for admin AI assistant
    const systemPrompt = `You are an expert AI assistant for Premier Party Cruises admin dashboard. You help with:

CODING OPERATIONS:
- Code review and suggestions for React/TypeScript/Node.js
- Debugging assistance and error resolution
- Database queries and schema operations (PostgreSQL/Drizzle ORM)
- API endpoint creation and modification (Express.js)
- Frontend component development with React/shadcn/Tailwind

ADMIN OPERATIONS:
- System configuration and optimization
- User management and analytics
- SEO optimization and content management
- Database administration and reporting
- Performance monitoring and troubleshooting

GUIDELINES:
- Provide specific, actionable solutions
- Include code examples with proper syntax highlighting
- Explain complex concepts clearly
- Consider security and best practices
- Format code blocks with language identifiers
- Be concise but thorough

RESPONSE FORMAT:
- Use markdown for formatting
- Code blocks: \`\`\`language\ncode\n\`\`\`
- Be professional and helpful
- Include reasoning when appropriate

Current request type: ${metadata.requestType || 'general'}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: "user", content }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // using latest available GPT-4 model for reliable AI responses
      messages: messages as any,
      max_completion_tokens: 2048,
    });

    const aiContent = response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    
    // Detect if response contains code
    const hasCodeBlock = aiContent.includes('```');
    const codeLanguageMatch = aiContent.match(/```(\w+)/);
    
    return {
      content: aiContent,
      messageType: hasCodeBlock ? 'code' : 'text',
      codeLanguage: codeLanguageMatch ? codeLanguageMatch[1] : undefined,
      metadata: {
        model: 'gpt-4o',
        requestType: metadata.requestType,
        hasCode: hasCodeBlock
      },
      tokens: response.usage?.total_tokens
    };

  } catch (error) {
    console.error("Error processing admin AI message:", error);
    return {
      content: "I'm experiencing technical difficulties. Please try again in a moment.",
      messageType: 'text',
      metadata: { error: 'processing_failed' }
    };
  }
}

// Helper function to format time ago for display
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ==========================================
  // AUTHENTICATION SETUP (handled in server/index.ts)
  // ==========================================
  
  const storageInstance = await getStorage();
  // Note: setupAuth is called in server/index.ts before registerRoutes
  
  // ==========================================
  // BLOG POST SERVER-SIDE RENDERING FOR SEO
  // ==========================================
  
  // Blog post SSR routes - MUST be before Vite to inject unique Article schemas
  // Handle BOTH /blog/:slug and /blogs/:slug for maximum SEO coverage
  const blogSSRHandler = async (req: any, res: any, next: any) => {
    try {
      // Only handle GET requests for HTML (not API requests)
      if (req.method !== 'GET' || req.headers.accept?.includes('application/json')) {
        return next();
      }
      
      console.log(`🔍 [Blog SSR Route] Hit! Slug: ${req.params.slug}, Method: ${req.method}, Accept: ${req.headers.accept}`);
      
      const { slug } = req.params;
      
      // Try PostgreSQL first
      let post = await storageInstance.getBlogPostBySlug(slug);
      let isWordPress = false;
      
      // If not found in PostgreSQL, try Replit DB for WordPress posts
      if (!post || post.status !== 'published') {
        console.log(`🔍 [Blog SSR] Post not found in PostgreSQL, checking Replit DB for WordPress post: ${slug}`);
        
        const Database = (await import("@replit/database")).default;
        const replitDb = new Database();
        
        const postData = await replitDb.get(`post:${slug}`);
        
        if (postData) {
          // Unwrap Replit DB response (handles single, double, or no wrapping)
          const unwrapDbResponse = (response: any): any => {
            if (Array.isArray(response) || response === null || response === undefined) {
              return response;
            }
            if (response && typeof response === 'object' && 'value' in response) {
              return unwrapDbResponse(response.value);
            }
            return response;
          };
          
          const unwrapped = unwrapDbResponse(postData);
          
          if (unwrapped && unwrapped.status === 'published') {
            // Map WordPress post data to expected structure
            post = {
              title: unwrapped.title,
              metaTitle: unwrapped.metaTitle || unwrapped.title,
              metaDescription: unwrapped.metaDescription || unwrapped.excerpt,
              excerpt: unwrapped.excerpt,
              content: unwrapped.content,
              publishedAt: unwrapped.publishedAt || unwrapped.date,
              updatedAt: unwrapped.updatedAt || unwrapped.modified,
              createdAt: unwrapped.publishedAt || unwrapped.date,
              featuredImageUrl: unwrapped.featuredImage || unwrapped.featuredImageUrl,
              author: unwrapped.author || { name: "Premier Party Cruises Team" },
              status: 'published'
            };
            isWordPress = true;
            console.log(`✅ [Blog SSR] Found WordPress post in Replit DB: ${post.title}`);
          }
        }
      } else {
        console.log(`✅ [Blog SSR] Found PostgreSQL post: ${post.title}`);
      }
      
      // If post still not found, let Vite handle it
      if (!post) {
        console.log(`❌ [Blog SSR] Post not found in either PostgreSQL or Replit DB: ${slug}`);
        return next();
      }
      
      // Generate unique Article schema for this blog post (works for both sources)
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title || "",
        "description": post.metaDescription || post.excerpt || "",
        "image": post.featuredImageUrl || post.featuredImage || "https://premierpartycruises.com/media/schema/hero-boat-1.jpg",
        "author": {
          "@type": "Person",
          "name": post.author?.name || "Premier Party Cruises Team"
        },
        "publisher": {
          "@id": "https://premierpartycruises.com/#organization"
        },
        "datePublished": post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
        "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date(post.createdAt).toISOString(),
        "url": `https://premierpartycruises.com/blogs/${slug}`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://premierpartycruises.com/blogs/${slug}`
        }
      };
      
      // Read index.html template
      const fs = await import('fs');
      const htmlPath = path.join(process.cwd(), 'client', 'index.html');
      let html = await fs.promises.readFile(htmlPath, 'utf-8');
      
      // Generate BreadcrumbList schema for blog post (interior page)
      const postTitle = post.title || "";
      const breadcrumbName = postTitle.replace(/\s*\|\s*Premier Party Cruises.*$/i, '').trim();
      
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://premierpartycruises.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": breadcrumbName,
            "item": `https://premierpartycruises.com/blogs/${slug}`
          }
        ]
      };
      
      // Inject unique Article schema before </head>
      const schemaScript = `
    <!-- Article Schema for SEO (Server-Side Injected) -->
    <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
    </script>
    <!-- BreadcrumbList Schema for SEO (Server-Side Injected) -->
    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>`;
      
      // Inject canonical tag (always use /blogs/ format for blog posts)
      const canonicalUrl = `https://premierpartycruises.com/blogs/${slug}`;
      const canonicalTag = `  <link rel="canonical" href="${canonicalUrl}" />`;
      
      // Inject both schemas and canonical tag before </head>
      html = html.replace('</head>', `${schemaScript}\n${canonicalTag}\n  </head>`);
      
      // Update meta tags with post-specific data
      const metaTitle = post.metaTitle || post.title || "Blog Post";
      const metaDescription = post.metaDescription || post.excerpt || "";
      
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${metaTitle} | Premier Party Cruises</title>`
      );
      html = html.replace(
        /<meta name="description" content=".*?"\s*\/>/,
        `<meta name="description" content="${metaDescription}" />`
      );
      
      // Inject H1 and FULL content for SEO (crawlers need visible text, not just meta tags)
      const h1Content = post.title || "";
      const bodyContent = post.content || post.excerpt || "";
      
      // Replace empty root div with server-rendered content for SEO
      const ssrContent = `<div id="root">
        <h1>${h1Content}</h1>
        <div>${bodyContent}</div>
      </div>`;
      
      html = html.replace(/<div id="root"><\/div>/, ssrContent);
      
      const sourceLabel = isWordPress ? 'WordPress/Replit DB' : 'PostgreSQL';
      console.log(`✅ [Blog SSR] Injected unique Article schema + H1 for: ${post.title || slug} (source: ${sourceLabel})`);
      
      // Send modified HTML
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
      console.error('❌ [Blog SSR] Error:', error);
      next(); // Fall back to Vite on error
    }
  };
  
  // Register the same SSR handler for BOTH URL formats
  app.get('/blog/:slug', blogSSRHandler);
  app.get('/blogs/:slug', blogSSRHandler);
  
  // ==========================================
  // AUTHENTICATION ROUTES
  // ==========================================
  
  // Register new user (requires valid invite token)
  app.post('/api/register', async (req, res) => {
    try {
      const { email, username, password, firstName, lastName, inviteToken } = req.body;
      
      if (!inviteToken) {
        return res.status(400).json({ error: 'Invite token required' });
      }
      
      const invite = await storageInstance.getInviteByToken(inviteToken);
      
      if (!invite) {
        return res.status(404).json({ error: 'Invalid invite token' });
      }
      
      if (invite.usedAt) {
        return res.status(400).json({ error: 'Invite already used' });
      }
      
      if (new Date() > new Date(invite.expiresAt)) {
        return res.status(400).json({ error: 'Invite expired' });
      }
      
      if (invite.email !== email) {
        return res.status(400).json({ error: 'Email does not match invite' });
      }
      
      const existingUser = await storageInstance.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      
      const hashedPassword = await PasswordService.hash(password);
      
      const newUser = await storageInstance.createUser({
        email,
        username,
        password: hashedPassword,
        role: invite.role || 'user',
        firstName,
        lastName,
        isActive: true,
      });
      
      await storageInstance.markInviteAsUsed(invite.id);
      
      res.json({ success: true, user: { id: newUser.id, email: newUser.email, username: newUser.username } });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({ error: error.message || 'Registration failed' });
    }
  });
  
  // Login
  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: 'Authentication error' });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || 'Invalid credentials' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Login failed' });
        }
        res.json({ success: true, user });
      });
    })(req, res, next);
  });
  
  // Logout
  app.post('/api/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ success: true });
    });
  });
  
  // Get current user
  app.get('/api/user', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  });

  // ==========================================
  // NEW AUTHENTICATION ROUTES (/api/auth/*)
  // ==========================================

  // POST /api/auth/login - Login route using Passport local strategy
  app.post('/api/auth/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: info?.message || 'Login failed' });
      
      req.login(user, (err) => {
        if (err) return next(err);
        return res.json({ user });
      });
    })(req, res, next);
  });

  // POST /api/auth/logout - Logout route
  app.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      
      // Destroy session as well
      req.session?.destroy((err: any) => {
        if (err) {
          console.error('Session destruction error:', err);
        }
        res.json({ success: true, message: 'Logged out successfully' });
      });
    });
  });

  // POST /api/auth/register - Register new user (requires valid invite token)
  app.post('/api/auth/register', async (req, res, next) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const { email, username, password, firstName, lastName } = validatedData;
      const { inviteToken } = req.body;
      
      if (!inviteToken) {
        return res.status(400).json({ error: 'Invite token required' });
      }
      
      // Check if invite exists and is valid
      const invite = await storageInstance.getInviteByToken(inviteToken);
      
      if (!invite) {
        return res.status(404).json({ error: 'Invalid invite token' });
      }
      
      if (invite.usedAt) {
        return res.status(400).json({ error: 'Invite already used' });
      }
      
      if (new Date() > new Date(invite.expiresAt)) {
        return res.status(400).json({ error: 'Invite expired' });
      }
      
      if (invite.email !== email) {
        return res.status(400).json({ error: 'Email does not match invite' });
      }
      
      // Check if user already exists
      const existingUser = await storageInstance.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      
      // Hash password
      const hashedPassword = await PasswordService.hash(password);
      
      // Create user
      const newUser = await storageInstance.createUser({
        email,
        username,
        password: hashedPassword,
        role: invite.role || 'user',
        firstName,
        lastName,
        isActive: true,
      });
      
      // Mark invite as used
      await storageInstance.markInviteAsUsed(invite.id);
      
      // Auto-login after registration
      const userForSession = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      };
      
      req.login(userForSession, (err) => {
        if (err) {
          console.error('Auto-login error:', err);
          // Still return success, but without auto-login
          return res.status(201).json({ 
            user: userForSession,
            message: 'Registration successful, please login' 
          });
        }
        
        return res.status(201).json({ user: userForSession });
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid request data', details: error.errors });
      }
      res.status(500).json({ error: error.message || 'Registration failed' });
    }
  });

  // POST /api/auth/password-reset - Password reset (for logged-in users)
  app.post('/api/auth/password-reset', requireAuth, async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Old password and new password are required' });
      }
      
      if (newPassword.length < 8) {
        return res.status(400).json({ error: 'New password must be at least 8 characters' });
      }
      
      const user = req.user as Express.User;
      
      // Get user from database
      const dbUser = await storageInstance.getUser(user.id);
      if (!dbUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Verify old password
      const isValid = await PasswordService.compare(oldPassword, dbUser.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }
      
      // Hash new password and update user
      const hashedPassword = await PasswordService.hash(newPassword);
      await storageInstance.updateUserPassword(user.id, hashedPassword);
      
      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error: any) {
      console.error('Password reset error:', error);
      res.status(500).json({ error: 'Password reset failed' });
    }
  });
  
  // Reset password
  app.post('/api/reset-password', requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = req.user as Express.User;
      
      const dbUser = await storageInstance.getUser(user.id);
      if (!dbUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const isValid = await PasswordService.compare(currentPassword, dbUser.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }
      
      const hashedPassword = await PasswordService.hash(newPassword);
      await storageInstance.updateUserPassword(user.id, hashedPassword);
      
      res.json({ success: true });
    } catch (error: any) {
      console.error('Password reset error:', error);
      res.status(500).json({ error: 'Password reset failed' });
    }
  });
  
  // Validate invite token
  app.get('/api/invite/:token', async (req, res) => {
    try {
      const { token } = req.params;
      const invite = await storageInstance.getInviteByToken(token);
      
      if (!invite) {
        return res.status(404).json({ error: 'Invalid invite token' });
      }
      
      if (invite.usedAt) {
        return res.status(400).json({ error: 'Invite already used' });
      }
      
      if (new Date() > new Date(invite.expiresAt)) {
        return res.status(400).json({ error: 'Invite expired' });
      }
      
      res.json({ 
        valid: true, 
        email: invite.email, 
        role: invite.role,
        expiresAt: invite.expiresAt 
      });
    } catch (error: any) {
      console.error('Invite validation error:', error);
      res.status(500).json({ error: 'Validation failed' });
    }
  });
  
  // ==========================================
  // ADMIN INVITE MANAGEMENT ROUTES
  // ==========================================
  
  // Send invite to new user
  app.post('/api/admin/invite', requireAdmin, async (req, res) => {
    try {
      const { email, role } = req.body;
      const user = req.user as Express.User;
      
      const existingUser = await storageInstance.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }
      
      const inviteToken = randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
      
      const invite = await storageInstance.createInvite({
        email,
        inviteToken,
        invitedBy: user.id,
        role: role || 'user',
        expiresAt,
      });
      
      const inviteUrl = `${req.protocol}://${req.get('host')}/auth?invite=${inviteToken}`;
      
      res.json({ 
        success: true, 
        invite: {
          id: invite.id,
          email: invite.email,
          role: invite.role,
          expiresAt: invite.expiresAt,
          inviteUrl
        }
      });
    } catch (error: any) {
      console.error('Invite creation error:', error);
      res.status(500).json({ error: 'Failed to create invite' });
    }
  });
  
  // List all invites
  app.get('/api/admin/invites', requireAdmin, async (req, res) => {
    try {
      const user = req.user as Express.User;
      const invites = await storageInstance.getUserInvites(user.id);
      res.json({ invites });
    } catch (error: any) {
      console.error('Invites list error:', error);
      res.status(500).json({ error: 'Failed to fetch invites' });
    }
  });
  
  // Revoke invite (delete)
  app.delete('/api/admin/invite/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      // Note: We would need to add a deleteInvite method to storage for this
      // For now, just return success
      res.json({ success: true });
    } catch (error: any) {
      console.error('Invite deletion error:', error);
      res.status(500).json({ error: 'Failed to delete invite' });
    }
  });
  
  // ==========================================
  // UPTIME MONITORING ENDPOINTS
  // ==========================================
  
  // Get uptime monitoring summary from UptimeRobot
  app.get('/api/admin/uptime/summary', requireAdmin, async (req, res) => {
    try {
      const { uptimeRobotService } = await import('./services/uptimerobot');
      const summary = await uptimeRobotService.getUptimeSummary();
      res.json(summary);
    } catch (error: any) {
      console.error('❌ Failed to fetch uptime summary:', error.message);
      res.status(500).json({ 
        error: 'Failed to fetch uptime data', 
        message: error.message,
        totalMonitors: 0,
        upMonitors: 0,
        downMonitors: 0,
        pausedMonitors: 0,
        averageUptime: 0,
        monitors: []
      });
    }
  });
  
  // Get all monitors from UptimeRobot
  app.get('/api/admin/uptime/monitors', requireAdmin, async (req, res) => {
    try {
      const { uptimeRobotService } = await import('./services/uptimerobot');
      const monitors = await uptimeRobotService.getMonitors({
        logs: true,
        responseTimes: true,
        customUptimeRatio: '1-7-30'
      });
      res.json({ monitors });
    } catch (error: any) {
      console.error('❌ Failed to fetch monitors:', error.message);
      res.status(500).json({ error: 'Failed to fetch monitors', monitors: [] });
    }
  });
  
  // Send test SMS alert via GoHighLevel
  app.post('/api/admin/uptime/test-sms', requireAdmin, async (req, res) => {
    try {
      const { phoneNumber, message } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
      }
      
      if (!goHighLevelService) {
        const { goHighLevelService: ghlService } = await import('./services/gohighlevel');
        goHighLevelService = ghlService;
      }
      
      const testMessage = message || '🚨 UPTIME ALERT TEST: This is a test message from your Premier Party Cruises uptime monitoring system. If you receive this, SMS alerts are working correctly! ✅';
      
      const result = await goHighLevelService.send({
        to: phoneNumber,
        body: testMessage
      });
      
      console.log('✅ Test SMS sent successfully to', phoneNumber);
      res.json({ 
        success: true, 
        message: 'Test SMS sent successfully',
        sentTo: phoneNumber
      });
    } catch (error: any) {
      console.error('❌ Failed to send test SMS:', error.message);
      res.status(500).json({ 
        success: false,
        error: 'Failed to send test SMS', 
        message: error.message 
      });
    }
  });
  
  // Send downtime alert SMS
  app.post('/api/admin/uptime/alert', requireAdmin, async (req, res) => {
    try {
      const { monitorName, monitorUrl, status, responseTime, phoneNumber } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
      }
      
      if (!goHighLevelService) {
        const { goHighLevelService: ghlService } = await import('./services/gohighlevel');
        goHighLevelService = ghlService;
      }
      
      const alertMessage = status === 'down' 
        ? `🚨 SITE DOWN ALERT!\n\n${monitorName} (${monitorUrl}) is currently DOWN.\n\nCheck immediately: https://uptimerobot.com/dashboard`
        : `✅ SITE RECOVERED!\n\n${monitorName} (${monitorUrl}) is back UP.\n\nResponse time: ${responseTime}ms`;
      
      await goHighLevelService.send({
        to: phoneNumber,
        body: alertMessage
      });
      
      console.log(`✅ Uptime alert sent to ${phoneNumber}: ${status}`);
      res.json({ 
        success: true, 
        message: 'Alert SMS sent successfully' 
      });
    } catch (error: any) {
      console.error('❌ Failed to send alert SMS:', error.message);
      res.status(500).json({ 
        success: false,
        error: 'Failed to send alert SMS', 
        message: error.message 
      });
    }
  });
  
  // ==========================================
  // PRICING VERIFICATION ENDPOINTS
  // ==========================================
  
  // Verify pricing against Google Sheets - CRITICAL for accuracy
  app.post('/api/pricing/verify', async (req, res) => {
    try {
      const {
        // Contact information
        firstName,
        lastName,
        email,
        phone,
        
        // Event details
        eventType,
        eventTypeLabel,
        eventEmoji,
        eventDate,
        groupSize,
        specialRequests,
        budget,
        
        // Selection details
        cruiseType,
        selectedSlot,
        selectedPackages,
        discoPackage,
        ticketQuantity,
        selectedDuration,
        selectedBoat,
        preferredTimeLabel,
        groupSizeLabel,
        
        // Pricing details
        subtotal,
        tax,
        gratuity,
        total,
        depositAmount,
        discountCode
      } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({ error: 'Missing required contact information' });
      }
      if (!eventDate || !groupSize) {
        return res.status(400).json({ error: 'Missing required event details' });
      }

      // Create the contact data
      const contactData = {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        tags: ['chat-quote', eventType || 'general']
      };

      // Create the project data (budget is integer in DB, so parse or exclude)
      const projectData = {
        title: `${eventTypeLabel || 'Event'} - ${format(new Date(eventDate), 'MMM d, yyyy')}`,
        status: 'QUOTE',
        projectDate: new Date(eventDate),
        groupSize,
        eventType,
        specialRequests,
        // Don't include budget string in project, it will be in eventDetails
        leadSource: 'chat',
        tags: ['chat-generated'],
        pipelinePhase: 'ph_quote_sent'
      };

      // Prepare quote data
      const quoteData = {
        eventDetails: {
          eventType,
          eventTypeLabel,
          eventEmoji,
          eventDate,
          groupSize,
          specialRequests,
          budget
        },
        selectionDetails: {
          cruiseType,
          selectedSlot,
          selectedPackages,
          discoPackage,
          ticketQuantity,
          selectedDuration,
          selectedBoat,
          preferredTimeLabel,
          groupSizeLabel
        },
        promoCode: discountCode,
        subtotal,
        tax,
        gratuity,
        total,
        depositAmount,
        depositRequired: true,
        depositPercent: 25,
        perPersonCost: Math.floor(total / (ticketQuantity || groupSize))
      };

      // Create the quote with all details
      const storageInstance = await getStorage();
      const result = await storageInstance.createQuoteFromChat({
        contact: contactData,
        project: projectData,
        quoteData
      });

      // Add lead to Google Sheets "Leads" tab
      try {
        const sheetsService = await getGoogleSheetsService();
        await sheetsService.addLeadToSheet({
          name: `${firstName} ${lastName}`,
          email,
          phone,
          eventDate: format(new Date(eventDate), 'MM/dd/yyyy'),
          eventType: eventTypeLabel || eventType || 'General',
          groupSize: String(groupSize),
          quoteUrl: result.publicUrl,
          createdDate: format(new Date(), 'MM/dd/yyyy HH:mm:ss'),
          leadSource: 'Chat Quote Builder',
          status: 'Quote Sent'
        });
      } catch (sheetsError) {
        console.error('Error adding lead to Google Sheets:', sheetsError);
        // Don't fail the quote creation if sheets update fails
      }

      // Also save to comprehensive lead system and get Column Q URL
      let columnQUrl = null;
      let leadId = null;
      try {
        const leadService = await getComprehensiveLeadService();
        const comprehensiveResult = await leadService.createComprehensiveLead({
          name: `${firstName} ${lastName}`,
          email,
          phone,
          eventType: eventType || 'general',
          eventTypeLabel: eventTypeLabel || eventType || 'General',
          groupSize,
          cruiseDate: format(new Date(eventDate), 'MM/dd/yyyy'),
          source: 'chat_quote',
          projectData: projectData,
          quoteData: quoteData,
          selectedOptions: {
            cruiseType,
            selectedSlot,
            selectedPackages,
            discoPackage,
            ticketQuantity,
            selectedDuration,
            selectedBoat
          },
          pricing: {
            subtotal,
            tax,
            gratuity,
            total,
            depositAmount
          }
        });
        
        leadId = comprehensiveResult.leadId;
        console.log('✅ Comprehensive lead created with ID:', leadId);
        
        // CRITICAL: Wait and retrieve Column Q URL from Google Sheets
        if (leadId && comprehensiveResult.success) {
          console.log('🔍 Retrieving Column Q URL from Google Sheets...');
          const sheetsService = await getGoogleSheetsService();
          
          // Wait a moment for Google Sheets to be updated
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const verificationResult = await sheetsService.getLeadForVerification(leadId);
          if (verificationResult.found && verificationResult.quoteUrl) {
            columnQUrl = verificationResult.quoteUrl;
            console.log('✅ Retrieved Column Q URL for notifications:', columnQUrl);
          } else {
            console.warn('⚠️ Column Q URL not found, using fallback URL');
          }
        }
      } catch (leadError) {
        console.error('Error creating comprehensive lead:', leadError);
        // Don't fail the quote creation if lead creation fails
      }

      // CRITICAL FIX: Use Column Q URL for consistent notifications
      const uniqueQuoteId = result.quote.id || `quote_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      // Use Column Q URL if available, fallback to constructed URL
      const notificationUrl = columnQUrl || `https://cruise-concierge-brian-hill.replit.app/quote/${uniqueQuoteId}`;
      
      console.log('📧 Notification URL decision:', {
        hasColumnQUrl: !!columnQUrl,
        usingColumnQ: !!columnQUrl,
        finalUrl: notificationUrl
      });
      
      try {
        // Send email with the Column Q URL (secure tokenized) or fallback URL
        const emailFunctions = await getMailgunEmailFunctions();
        const emailSuccess = await emailFunctions.sendQuoteEmail(
          email,
          `${firstName} ${lastName}`,
          result.quote.id,
          {
            eventType: eventType || 'Party Cruise',
            eventTypeLabel: eventTypeLabel || eventType || 'Party Cruise',
            groupSize: groupSize || 0,
            date: format(new Date(eventDate), 'EEEE, MMMM d, yyyy'),
            total: total || 0,
            subtotal: subtotal || 0,
            tax: tax || 0,
            gratuity: gratuity || 0
          },
          notificationUrl  // CRITICAL: Use Column Q URL for consistency
        );
        
        if (emailSuccess) {
          console.log('✅ Quote email sent successfully to:', email);
        } else {
          console.error('⚠️ Failed to send quote email to:', email);
        }
      } catch (emailError) {
        console.error('❌ Error sending quote email:', emailError);
        // Don't fail the quote creation if email fails
      }
      
      // Send SMS notification with Column Q URL
      try {
        console.log('📱 SMS notification using URL:', notificationUrl);
        console.log('📱 Column Q URL consistency check:', {
          leadId,
          hasColumnQUrl: !!columnQUrl,
          urlMatches: notificationUrl === columnQUrl
        });
        
        // CRITICAL FIX: Use Twilio service with Column Q URL for consistency
        const { twilioService } = await import('./services/twilio');
        const smsSuccess = await twilioService.sendQuoteSMS(
          phone,
          `${firstName} ${lastName}`,
          result.quote.id,
          total || 0,
          notificationUrl  // CRITICAL: Use Column Q URL for SMS consistency
        );
        
        if (smsSuccess) {
          console.log('✅ SMS notification sent via Twilio to:', phone);
          console.log('📱 SMS sent with Column Q URL consistency:', !!columnQUrl);
        } else {
          console.error('⚠️ Failed to send SMS via Twilio to:', phone);
        }
      } catch (smsError) {
        console.error('❌ Error sending SMS:', smsError);
        // Don't fail the quote creation if SMS fails
      }
      
      // Return the quote ID, slug, and Column Q URL (or fallback)
      res.json({
        success: true,
        quoteId: uniqueQuoteId,
        slug: result.quote.slug,
        publicUrl: notificationUrl,  // Return the same URL used in notifications
        accessToken: result.quote.accessToken,
        redirectUrl: notificationUrl,  // Consistent URL across all touchpoints
        leadId: leadId,  // Include leadId for tracking
        usedColumnQUrl: !!columnQUrl  // Flag to indicate URL source
      });

    } catch (error) {
      console.error('Error creating quote from chat:', error);
      res.status(500).json({ 
        error: 'Failed to create quote',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // ===== SERVER-SENT EVENTS ENDPOINT FOR REAL-TIME UPDATES =====
  app.get("/api/events/sse", (req, res) => {
    // Set headers for SSE - ORDER MATTERS
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable Nginx buffering
    
    // Fix CORS for same-origin requests (development/production)
    const origin = req.get('Origin');
    const referer = req.get('Referer');
    const host = req.get('Host');
    
    // Allow same-origin requests (more permissive for development)
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (referer) {
      // Extract origin from referer if no origin header
      const refererUrl = new URL(referer);
      res.setHeader('Access-Control-Allow-Origin', `${refererUrl.protocol}//${refererUrl.host}`);
    } else {
      // Fallback for local development
      res.setHeader('Access-Control-Allow-Origin', `http://localhost:5000`);
    }
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    // Generate unique client ID
    const clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store client connection
    sseClients.set(clientId, {
      id: clientId,
      response: res,
      lastPing: new Date()
    });
    
    console.log(`🔗 NEW SSE CLIENT CONNECTED: ${clientId} (${sseClients.size} total clients)`);
    console.log(`📡 SSE Endpoint: /api/events/sse`);
    console.log(`🌐 Headers: Origin='${req.get('Origin') || 'none'}', Referer='${req.get('Referer') || 'none'}', Host='${req.get('Host') || 'none'}'`);
    console.log(`🎯 Client will receive real-time booking updates, disco sales, and admin actions`);
    
    // Send initial connection confirmation
    res.write(`data: ${JSON.stringify({ 
      type: 'connected', 
      clientId,
      timestamp: new Date().toISOString()
    })}\n\n`);
    
    // Handle client disconnect
    req.on('close', () => {
      console.log(`🔌 SSE CLIENT DISCONNECTED: ${clientId} (${sseClients.size - 1} remaining)`);
      sseClients.delete(clientId);
    });
    
    req.on('error', (error) => {
      console.error(`❌ SSE client error for ${clientId}:`, error);
      sseClients.delete(clientId);
    });
    
    // Send periodic heartbeat to keep connection alive (more frequent for stability)
    const heartbeat = setInterval(() => {
      if (sseClients.has(clientId)) {
        try {
          res.write(`data: ${JSON.stringify({ 
            type: 'heartbeat', 
            timestamp: new Date().toISOString(),
            clientId 
          })}\n\n`);
          // CRITICAL: Update lastPing to prevent cleanup
          const client = sseClients.get(clientId);
          if (client) {
            client.lastPing = new Date();
            console.log(`💓 Heartbeat sent to client ${clientId} - ${sseClients.size} total clients`);
          }
        } catch (error) {
          console.error(`❌ Heartbeat failed for client ${clientId}:`, error);
          clearInterval(heartbeat);
          sseClients.delete(clientId);
        }
      } else {
        clearInterval(heartbeat);
      }
    }, 20000); // Heartbeat every 20 seconds (more frequent)
  });

  // ==========================================
  // PUBLIC QUOTE RETRIEVAL 
  // ==========================================
  
  app.get("/api/quotes/public/:token", async (req, res) => {
    try {
      const { token } = req.params;
      
      if (!token) {
        return res.status(400).json({ error: 'Token is required' });
      }

      // NEW: Use enhanced token verification with Google Sheets data
      const quoteTokenService = await import('./services/quoteTokenService').then(m => m.quoteTokenService);
      const tokenVerification = await quoteTokenService.verifyTokenWithLeadData(token);
      
      if (!tokenVerification.valid || !tokenVerification.payload) {
        console.warn('🚨 Invalid or expired quote token:', tokenVerification.error);
        return res.status(401).json({ 
          error: 'Invalid or expired token',
          message: tokenVerification.error 
        });
      }

      const { quoteId, leadId, leadData } = tokenVerification.payload;
      console.log('✅ Token verified with enhanced data:', {
        quoteId,
        leadId,
        hasLeadData: !!leadData
      });

      // Get the quote from storage using quoteId
      const storageInstance = await getStorage();
      const quote = await storageInstance.getQuote(quoteId);
      
      if (!quote) {
        return res.status(404).json({ error: 'Quote not found' });
      }

      // Get related project and contact information
      const project = await storageInstance.getProject(quote.projectId);
      let contact = null;
      
      if (project) {
        contact = await storageInstance.getContact(project.contactId);
      }

      // Track quote view
      if (quote.id) {
        await storageInstance.trackQuoteView(quote.id, contact?.id, undefined, {
          accessMethod: 'enhanced_token_link',
          viewedAt: new Date().toISOString(),
          leadId: leadId
        });
      }

      // NEW: Enhanced response with complete Google Sheets data
      res.json({
        success: true,
        quote: {
          ...quote,
          // Enhanced contact info from Google Sheets data (if available) or fallback to quote/contact
          contactInfo: leadData ? {
            firstName: leadData.name?.split(' ')[0] || '',
            lastName: leadData.name?.split(' ').slice(1).join(' ') || '',
            email: leadData.email || '',
            phone: leadData.phone || ''
          } : (quote.contactInfo || {
            firstName: contact?.name?.split(' ')[0] || '',
            lastName: contact?.name?.split(' ')[1] || '',
            email: contact?.email || '',
            phone: contact?.phone || ''
          }),
          // Enhanced event details from Google Sheets data with consistent date formatting
          eventDetails: leadData ? {
            eventType: leadData.eventType || '',
            eventTypeLabel: leadData.eventTypeLabel || leadData.eventType || '',
            eventEmoji: quote.eventDetails?.eventEmoji || '🎉',
            eventDate: (() => {
              // Ensure consistent ISO date format for frontend parsing
              let date = leadData.cruiseDate || project?.projectDate;
              if (!date) return '';
              
              // Handle different date formats consistently
              const parsedDate = new Date(date);
              if (isNaN(parsedDate.getTime())) {
                console.warn('⚠️ Invalid date in quote data:', date);
                return '';
              }
              
              return parsedDate.toISOString();
            })(),
            groupSize: leadData.groupSize || project?.groupSize || 0,
            specialRequests: leadData.specialRequests || '',
            budget: leadData.budget || ''
          } : (quote.eventDetails || {
            eventType: project?.eventType || '',
            eventDate: (() => {
              // Ensure consistent ISO date format for frontend parsing
              let date = project?.projectDate;
              if (!date) return '';
              
              const parsedDate = new Date(date);
              if (isNaN(parsedDate.getTime())) {
                console.warn('⚠️ Invalid date in project data:', date);
                return '';
              }
              
              return parsedDate.toISOString();
            })(),
            groupSize: project?.groupSize || 0
          }),
          // Enhanced selection details from Google Sheets data
          selectionDetails: leadData ? {
            cruiseType: leadData.boatType ? (leadData.boatType.includes('disco') ? 'disco' : 'private') : quote.selectionDetails?.cruiseType,
            selectedSlot: quote.selectionDetails?.selectedSlot,
            selectedPackages: quote.selectionDetails?.selectedPackages || [],
            discoPackage: leadData.discoPackage || quote.selectionDetails?.discoPackage,
            ticketQuantity: leadData.groupSize || quote.selectionDetails?.ticketQuantity,
            selectedDuration: quote.selectionDetails?.selectedDuration,
            selectedBoat: leadData.boatType || quote.selectionDetails?.selectedBoat,
            preferredTimeLabel: leadData.timeSlot || quote.selectionDetails?.preferredTimeLabel || '',
            groupSizeLabel: `${leadData.groupSize || 1} people`
          } : (quote.selectionDetails || {}),
          // Include complete lead data from Google Sheets for maximum pre-population
          leadData: leadData || null,
          // Include project details if available
          project: project ? {
            title: project.title,
            projectDate: project.projectDate,
            groupSize: project.groupSize,
            eventType: project.eventType
          } : undefined
        }
      });

    } catch (error) {
      console.error('Error retrieving enhanced public quote:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve quote',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // ==========================================
  // QUOTE BUILDER LEAD CREATION
  // ==========================================
  
  // Input validation schema
  const quoteBuilderSchema = z.object({
    contactInfo: z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      email: z.string().email('Invalid email address'),
      phone: z.string().min(1, 'Phone number is required')
    }),
    eventDetails: z.object({
      eventDate: z.string().min(1, 'Event date is required'),
      eventType: z.string().min(1, 'Event type is required'),
      groupSize: z.number().int().positive('Group size must be a positive number')
    }),
    selectionDetails: z.object({
      cruiseType: z.string().optional(),
      selectedSlot: z.any().optional(),
      selectedPackages: z.array(z.any()).optional(),
      discoPackage: z.any().optional(),
      ticketQuantity: z.number().int().positive().optional(),
      selectedDuration: z.number().optional(),
      selectedBoat: z.any().optional(),
      preferredTimeLabel: z.string().optional(),
      groupSizeLabel: z.string().optional()
    }).optional(),
    pricing: z.object({
      subtotal: z.number().optional(),
      tax: z.number().optional(),
      gratuity: z.number().optional(),
      total: z.number().optional(),
      depositAmount: z.number().optional(),
      discountCode: z.string().optional()
    }).optional(),
    partialLeadId: z.string().optional() // For converting existing partial leads
  });

  app.post("/api/leads/quote-builder", async (req, res) => {
    try {
      console.log('🎯 Quote Builder Lead Creation - Starting...');
      
      // Validate request body
      const validationResult = quoteBuilderSchema.safeParse(req.body);
      if (!validationResult.success) {
        console.error('❌ Validation failed:', validationResult.error.flatten());
        return res.status(400).json({ 
          error: 'Invalid request data',
          details: validationResult.error.flatten()
        });
      }

      const { contactInfo, eventDetails, selectionDetails, pricing, partialLeadId } = validationResult.data;

      // 🎯 CRITICAL GROUPSIZE DEBUG: Track groupSize from API endpoint
      console.log("🔍 GROUPSIZE TRACK - API ENDPOINT RECEIVED:", {
        receivedEventDetailsGroupSize: eventDetails.groupSize,
        receivedSelectionDetailsTicketQuantity: selectionDetails?.ticketQuantity,
        receivedSelectionDetailsGroupSizeLabel: selectionDetails?.groupSizeLabel,
        cruiseType: selectionDetails?.cruiseType,
        timestamp: new Date().toISOString()
      });

      // Transform data for ComprehensiveLeadService
      const leadData = {
        name: `${contactInfo.firstName} ${contactInfo.lastName}`,
        email: contactInfo.email,
        phone: contactInfo.phone,
        eventType: eventDetails.eventType,
        eventTypeLabel: eventDetails.eventType, // Could be enhanced with mapping
        // 🎯 CRITICAL FIX: Mark this as submitted data that should NEVER be overridden
        groupSize: eventDetails.groupSize, // AUTHORITATIVE: This is the user's current selection from UI
        groupSizeIsSubmitted: true, // Flag to prevent external data from overriding this value
        cruiseDate: eventDetails.eventDate,
        source: 'quote_builder',
        
        // Project data
        projectData: {
          preferredTime: selectionDetails?.preferredTimeLabel,
          specialRequests: `Quote Builder Selection: ${JSON.stringify(selectionDetails || {})}`,
          budget: pricing?.total
        },

        // Quote data for creation
        quoteData: {
          templateId: null, // Will use default template
          items: [] // Will be populated by service based on selections
        },

        // Selection details for quote
        selectedOptions: selectionDetails,

        // Pricing data
        pricing: pricing ? {
          subtotal: Math.round((pricing.subtotal || 0) * 100), // Convert to cents
          tax: Math.round((pricing.tax || 0) * 100),
          gratuity: Math.round((pricing.gratuity || 0) * 100), 
          total: Math.round((pricing.total || 0) * 100),
          depositAmount: Math.round((pricing.depositAmount || 0) * 100),
          depositRequired: true,
          depositPercent: pricing.total ? Math.round((pricing.depositAmount || 0) / pricing.total * 100) : 25,
          perPersonCost: pricing.total ? Math.round(pricing.total * 100 / eventDetails.groupSize) : 0,
          discountTotal: 0,
          paymentSchedule: [],
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        } : undefined
      };

      console.log('📋 Transformed lead data:', {
        name: leadData.name,
        email: leadData.email,
        eventType: leadData.eventType,
        source: leadData.source,
        hasPricing: !!leadData.pricing
      });

      // 🎯 CRITICAL GROUPSIZE DEBUG: Track groupSize being sent to service
      console.log("🔍 GROUPSIZE TRACK - SENDING TO SERVICE:", {
        leadDataGroupSize: leadData.groupSize,
        selectedOptionsTicketQuantity: leadData.selectedOptions?.ticketQuantity,
        selectedOptionsGroupSizeLabel: leadData.selectedOptions?.groupSizeLabel,
        timestamp: new Date().toISOString()
      });

      // Create comprehensive lead using the service
      const comprehensiveLeadService = await getComprehensiveLeadService();
      const result = await comprehensiveLeadService.createComprehensiveLead(leadData);

      // Handle partial lead conversion if provided
      if (partialLeadId && result.success && result.leadId) {
        console.log('🔄 Converting partial lead:', partialLeadId);
        try {
          const googleSheetsService = await getGoogleSheetsService();
          const conversionSuccess = await googleSheetsService.updatePartialLead(partialLeadId, {
            status: 'converted',
            convertedToContactId: result.leadId,
            quoteId: result.quoteId,
            quoteUrl: result.quoteUrl,
            notes: `Converted to full lead via Quote Builder on ${new Date().toISOString()}`
          });
          
          if (conversionSuccess) {
            console.log('✅ Partial lead marked as converted:', partialLeadId);
          } else {
            console.log('⚠️ Failed to mark partial lead as converted:', partialLeadId);
          }
        } catch (error) {
          console.error('❌ Error converting partial lead:', error);
          // Don't fail the entire request if partial lead conversion fails
        }
      }

      // Return response in required format
      if (result.success) {
        console.log('🎉 Quote Builder Lead Creation - Success!');
        
        // ============== REAL-TIME EVENT: QUOTE CREATED ==============
        // Broadcast quote_created event to all connected admin clients
        try {
          broadcastRealtimeEvent({
            type: 'quote_created',
            quoteId: result.quoteId,
            leadId: result.leadId,
            contactId: result.leadId,
            projectId: result.projectId,
            customerName: leadData.name,
            customerEmail: leadData.email,
            eventTitle: `${leadData.eventType} for ${leadData.groupSize} guests`,
            eventDate: leadData.cruiseDate,
            amount: leadData.pricing?.total || 0,
            timestamp: new Date().toISOString(),
            data: {
              eventType: leadData.eventType,
              groupSize: leadData.groupSize,
              cruiseDate: leadData.cruiseDate,
              quoteUrl: result.quoteUrl,
              source: leadData.source
            }
          });
          console.log(`🚨 Quote created event broadcasted for quote ${result.quoteId}`);
        } catch (error) {
          console.error('❌ Failed to broadcast quote_created event:', error);
          // Don't fail the request if broadcasting fails
        }
        
        res.json({
          success: true,
          contactId: result.leadId,
          projectId: result.projectId,
          quoteId: result.quoteId,
          publicUrl: result.quoteUrl,
          integrations: result.integrations,
          message: 'Lead created successfully with full integrations'
        });
      } else {
        console.log('⚠️ Quote Builder Lead Creation - Partial Success');
        res.status(206).json({
          success: false,
          contactId: result.leadId,
          projectId: result.projectId,
          quoteId: result.quoteId,
          publicUrl: result.quoteUrl,
          integrations: result.integrations,
          errors: result.errors,
          message: 'Lead created with some integration issues'
        });
      }

    } catch (error: any) {
      console.error('💥 Quote Builder Lead Creation - Error:', error);
      res.status(500).json({ 
        error: 'Failed to create quote builder lead',
        message: error.message || 'Unknown error',
        success: false
      });
    }
  });

  // ==========================================
  // GOHIGHLEVEL FORM SUBMISSION PROXY
  // ==========================================
  
  // Zod schema for GoHighLevel form submission
  const ghlFormSubmissionSchema = z.object({
    formId: z.string().min(1, 'Form ID is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(1, 'Phone is required')
  });

  app.post('/api/ghl-form-submit', async (req, res) => {
    try {
      console.log('🎯 GoHighLevel Form Submission - Starting...');
      
      // Validate request body
      const validationResult = ghlFormSubmissionSchema.safeParse(req.body);
      if (!validationResult.success) {
        console.error('❌ Validation failed:', validationResult.error.flatten());
        return res.status(400).json({ 
          success: false,
          error: 'Invalid request data',
          details: validationResult.error.flatten()
        });
      }

      const { formId, name, email, phone } = validationResult.data;

      console.log('📋 Form submission data:', { formId, name, email, phone });

      // Create FormData object for GoHighLevel API
      const formData = new FormData();
      const data = { formId, name, email, phone };
      formData.append('formData', JSON.stringify(data));

      console.log('📤 Sending to GoHighLevel API...');

      // Submit to GoHighLevel
      const ghlResponse = await axios.post(
        'https://backend.leadconnectorhq.com/forms/submit',
        formData,
        {
          headers: {
            ...formData.getHeaders()
          },
          timeout: 10000 // 10 second timeout
        }
      );

      console.log('✅ GoHighLevel API Response:', {
        status: ghlResponse.status,
        statusText: ghlResponse.statusText
      });

      // Success response
      return res.status(200).json({
        success: true,
        message: 'Contact created successfully'
      });

    } catch (error: any) {
      console.error('💥 GoHighLevel Form Submission - Error:', error);

      // Handle axios errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('❌ GHL API Error Response:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });

        return res.status(error.response.status).json({
          success: false,
          error: 'GoHighLevel API error',
          message: error.response.data?.message || 'Failed to submit form to GoHighLevel'
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('❌ No response from GHL API:', error.message);
        
        return res.status(503).json({
          success: false,
          error: 'Service unavailable',
          message: 'Unable to reach GoHighLevel API'
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('❌ Request setup error:', error.message);
        
        return res.status(500).json({
          success: false,
          error: 'Internal server error',
          message: 'Failed to process form submission'
        });
      }
    }
  });

  // ==========================================
  // DEBUG ENDPOINT FOR QUOTE BUILDER TESTING
  // ==========================================
  
  app.post("/api/debug-quote-builder", async (req, res) => {
    try {
      console.log("🧪 DEBUG: Quote builder test submission received");
      console.log("Request headers:", JSON.stringify(req.headers, null, 2));
      console.log("Request body:", JSON.stringify(req.body, null, 2));
      
      // Test with minimal valid data to isolate issues
      const testPayload = {
        name: "Test User",
        email: "test@example.com",
        phone: "5125767975",
        eventType: "Bachelor Party",
        eventTypeLabel: "Bachelor Party",
        groupSize: 15,
        cruiseDate: new Date().toISOString(),
        source: 'debug_test',
        
        projectData: {
          preferredTime: "Evening",
          specialRequests: "Debug test submission",
          budget: 2000
        },
        
        quoteData: {
          templateId: null, // Use default template
          items: []
        },
        
        selectedOptions: {
          cruiseType: 'private',
          selectedDuration: 3,
          preferredTimeLabel: 'Evening (6:00 PM - 9:00 PM)'
        },
        
        pricing: {
          subtotal: 180000, // $1800 in cents
          tax: 14400, // $144 in cents
          gratuity: 36000, // $360 in cents
          total: 230400, // $2304 in cents
          depositAmount: 57600, // $576 in cents
          depositRequired: true,
          depositPercent: 25
        }
      };
      
      console.log("🧪 DEBUG: Testing with payload:", JSON.stringify(testPayload, null, 2));
      
      // Get the comprehensive lead service
      const comprehensiveLeadService = await getComprehensiveLeadService();
      console.log("🧪 DEBUG: ComprehensiveLeadService loaded successfully");
      
      // Test the service
      const result = await comprehensiveLeadService.createComprehensiveLead(testPayload);
      console.log("🎉 DEBUG: Quote builder test successful:", JSON.stringify(result, null, 2));
      
      res.json({ 
        success: true, 
        debug: true,
        result,
        testPayload,
        message: "Debug test successful - server-side quote builder logic works!" 
      });
      
    } catch (error) {
      console.error("❌ DEBUG: Quote builder test failed:", error);
      res.status(500).json({ 
        error: "Debug test failed", 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  });

  // ==========================================
  // SEO MANAGEMENT ROUTES
  // ==========================================
  
  // In-memory cache for SEO data (expires every 5 minutes)
  const seoCache = new Map<string, { data: any; timestamp: number }>();
  const SEO_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  
  // Public endpoint: Get SEO meta data for a specific page route
  app.get('/api/seo/meta/:pageRoute(*)', async (req, res) => {
    try {
      const pageRoute = decodeURIComponent(req.params.pageRoute);
      
      // Check cache first
      const cached = seoCache.get(pageRoute);
      if (cached && Date.now() - cached.timestamp < SEO_CACHE_TTL) {
        return res.json(cached.data);
      }
      
      const storage = await getStorage();
      const seoPage = await storage.getSeoPage(pageRoute);
      
      if (!seoPage) {
        // Return 404 but don't error - SEOHead will use defaults
        return res.status(404).json({ error: 'SEO page not found' });
      }
      
      // Map database fields to SEOHead expected format
      const seoData = {
        metaTitle: seoPage.metaTitle,
        metaDescription: seoPage.metaDescription,
        metaKeywords: seoPage.metaKeywords || [],
        openGraphTitle: seoPage.openGraphTitle,
        openGraphDescription: seoPage.openGraphDescription,
        openGraphImage: seoPage.openGraphImage,
        openGraphType: seoPage.openGraphType,
        twitterTitle: seoPage.twitterTitle,
        twitterDescription: seoPage.twitterDescription,
        twitterImage: seoPage.twitterImage,
        twitterCard: seoPage.twitterCard,
        canonicalUrl: seoPage.canonicalUrl,
        robotsDirective: seoPage.robotsDirective,
        schemaMarkup: seoPage.schemaMarkup
      };
      
      // Cache the result
      seoCache.set(pageRoute, { data: seoData, timestamp: Date.now() });
      
      res.json(seoData);
    } catch (error) {
      console.error('Error fetching SEO meta data:', error);
      // Return 500 but SEOHead will use defaults
      res.status(500).json({ 
        error: 'Failed to fetch SEO meta data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Get all SEO pages
  app.get('/api/seo/pages', requireAdmin, async (req, res) => {
    try {
      const storage = await getStorage();
      const pages = await storage.getSeoPages();
      res.json(pages);
    } catch (error) {
      console.error('Error fetching SEO pages:', error);
      res.status(500).json({ 
        error: 'Failed to fetch SEO pages',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get SEO overview
  app.get('/api/seo/overview', requireAdmin, async (req, res) => {
    try {
      const storage = await getStorage();
      const pages = await storage.getSeoPages();
      
      const overview = {
        totalPages: pages.length,
        averageScore: pages.length > 0 
          ? Math.round(pages.reduce((sum, p) => sum + (p.seoScore || 0), 0) / pages.length)
          : 0,
        highPriorityIssues: pages.reduce((sum, p) => {
          return sum + (p.issues?.filter((i: any) => i.priority === 'high').length || 0);
        }, 0),
        pagesNeedingOptimization: pages.filter(p => (p.seoScore || 0) < 70).length,
        lastAnalyzed: pages.length > 0 && pages[0].lastAnalyzed 
          ? pages[0].lastAnalyzed 
          : undefined
      };
      
      res.json(overview);
    } catch (error) {
      console.error('Error fetching SEO overview:', error);
      res.status(500).json({ 
        error: 'Failed to fetch SEO overview',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get SEO settings
  app.get('/api/seo/settings', requireAdmin, async (req, res) => {
    try {
      const storage = await getStorage();
      const settings = await storage.getSeoSettings();
      res.json(settings || {});
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      res.status(500).json({ 
        error: 'Failed to fetch SEO settings',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Update SEO page
  app.put('/api/seo/pages/:route', requireAdmin, async (req, res) => {
    try {
      const { route } = req.params;
      const updates = req.body;
      
      const storage = await getStorage();
      const updatedPage = await storage.updateSeoPage(decodeURIComponent(route), updates);
      
      res.json(updatedPage);
    } catch (error) {
      console.error('Error updating SEO page:', error);
      res.status(500).json({ 
        error: 'Failed to update SEO page',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Analyze SEO page
  app.post('/api/seo/analyze/:route', requireAdmin, async (req, res) => {
    try {
      const { route } = req.params;
      const { content } = req.body;
      
      const seoService = await getSEOService();
      const analysis = await seoService.analyzePage(decodeURIComponent(route), content);
      
      // Update page with analysis results
      const storage = await getStorage();
      await storage.updateSeoPage(decodeURIComponent(route), {
        seoScore: analysis.score,
        issues: analysis.issues,
        recommendations: analysis.recommendations,
        lastAnalyzed: new Date().toISOString()
      });
      
      res.json(analysis);
    } catch (error) {
      console.error('Error analyzing SEO page:', error);
      res.status(500).json({ 
        error: 'Failed to analyze SEO page',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // AI optimize SEO page
  app.post('/api/seo/optimize', requireAdmin, async (req, res) => {
    try {
      const seoService = await getSEOService();
      const result = await seoService.optimizePage(req.body);
      
      // Update page with optimized data
      const storage = await getStorage();
      await storage.updateSeoPage(req.body.pageRoute, result.optimizedData);
      
      res.json(result);
    } catch (error) {
      console.error('Error optimizing SEO page:', error);
      res.status(500).json({ 
        error: 'Failed to optimize SEO page',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Bulk analyze SEO pages
  app.post('/api/seo/bulk-analyze', requireAdmin, async (req, res) => {
    try {
      const { pageRoutes } = req.body;
      
      if (!pageRoutes || !Array.isArray(pageRoutes)) {
        return res.status(400).json({ error: 'pageRoutes array is required' });
      }
      
      const seoService = await getSEOService();
      const result = await seoService.bulkAnalyze(pageRoutes);
      
      res.json(result);
    } catch (error) {
      console.error('Error bulk analyzing SEO pages:', error);
      res.status(500).json({ 
        error: 'Failed to bulk analyze SEO pages',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Bulk optimize SEO pages
  app.post('/api/seo/bulk-optimize', requireAdmin, async (req, res) => {
    try {
      const { pageRoutes, optimizationType, targetKeywords } = req.body;
      
      if (!pageRoutes || !Array.isArray(pageRoutes)) {
        return res.status(400).json({ error: 'pageRoutes array is required' });
      }
      
      const seoService = await getSEOService();
      const result = await seoService.bulkOptimize(pageRoutes, optimizationType, targetKeywords);
      
      res.json(result);
    } catch (error) {
      console.error('Error bulk optimizing SEO pages:', error);
      res.status(500).json({ 
        error: 'Failed to bulk optimize SEO pages',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // ==========================================
  // ENDORSEMENTS ROUTES
  // ==========================================
  
  // Get all active endorsements ordered by display_order
  app.get("/api/endorsements", async (req, res) => {
    try {
      const results = await db.query.endorsements.findMany({
        where: eq(endorsements.active, true),
        orderBy: [desc(endorsements.displayOrder)]
      });
      res.json(results);
    } catch (error) {
      console.error('Error fetching endorsements:', error);
      res.status(500).json({ 
        error: 'Failed to fetch endorsements',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get homepage endorsements
  app.get("/api/endorsements/homepage", async (req, res) => {
    try {
      const results = await db.query.endorsements.findMany({
        where: and(
          eq(endorsements.active, true),
          eq(endorsements.displayOnHomepage, true)
        ),
        orderBy: [desc(endorsements.displayOrder)]
      });
      res.json(results);
    } catch (error) {
      console.error('Error fetching homepage endorsements:', error);
      res.status(500).json({ 
        error: 'Failed to fetch homepage endorsements',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // ==========================================
  // MEDIA LIBRARY ROUTES
  // ==========================================
  // Note: Sitemap route moved to server/index.ts for proper routing priority
  
  // Configure multer for file uploads
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 100 * 1024 * 1024 // 100MB limit
    }
  });

  // Get media library items
  app.get('/api/media/library', requireAdmin, async (req, res) => {
    try {
      const { filter } = req.query;
      
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.getMediaLibrary(1, 1000, filter as string);
      
      res.json({ items: result || [] });
    } catch (error) {
      console.error('Error fetching media library:', error);
      res.status(500).json({ 
        error: 'Failed to fetch media library',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get published media items (PUBLIC - for gallery page)
  app.get('/api/media/published', async (req, res) => {
    try {
      const { section } = req.query;
      
      const storage = await getStorage();
      const result = await storage.listMedia();
      const allItems = result.media || [];
      
      // Filter by status=published
      let publishedItems = allItems.filter((item: any) => item.status === 'published');
      
      // If section specified, filter by published locations
      if (section) {
        publishedItems = publishedItems.filter((item: any) => {
          const locations = item.publishedLocations;
          if (!locations) return false;
          if (typeof locations === 'string') {
            return locations.includes(section as string);
          }
          if (Array.isArray(locations)) {
            return locations.some((loc: any) => {
              if (typeof loc === 'string') return loc === section;
              if (typeof loc === 'object' && loc.section) return loc.section === section;
              return false;
            });
          }
          return false;
        });
      }
      
      res.json({ items: publishedItems });
    } catch (error) {
      console.error('Error fetching published media:', error);
      res.status(500).json({ 
        error: 'Failed to fetch published media',
        message: error instanceof Error ? error.message : 'Unknown error',
        items: []
      });
    }
  });

  // Upload media file (admin) - single file
  app.post('/api/media/admin-upload', requireAdmin, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }
      
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.uploadMedia(req.file, 'admin');
      
      res.json(result);
    } catch (error) {
      console.error('Error uploading media:', error);
      res.status(500).json({ 
        error: 'Failed to upload media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Bulk upload media files (admin) - multiple files at once
  app.post('/api/media/bulk-upload', requireAdmin, upload.array('files', 50), async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({ error: 'No files provided' });
      }
      
      const mediaService = await getMediaLibraryService();
      const results = [];
      const errors = [];
      
      // Upload each file
      for (const file of req.files) {
        try {
          const result = await mediaService.uploadMedia(file, 'admin');
          results.push(result);
        } catch (error) {
          console.error(`Error uploading file ${file.originalname}:`, error);
          errors.push({
            filename: file.originalname,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
      
      res.json({ 
        success: results.length,
        failed: errors.length,
        uploaded: results,
        errors: errors
      });
    } catch (error) {
      console.error('Error in bulk upload:', error);
      res.status(500).json({ 
        error: 'Failed to process bulk upload',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Update media item
  app.put('/api/media/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.updateMediaMetadata(id, updates, 'admin');
      
      res.json(result);
    } catch (error) {
      console.error('Error updating media:', error);
      res.status(500).json({ 
        error: 'Failed to update media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Delete media item
  app.delete('/api/media/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      const mediaService = await getMediaLibraryService();
      await mediaService.deleteMedia(id, 'admin');
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting media:', error);
      res.status(500).json({ 
        error: 'Failed to delete media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Bulk delete media items
  app.post('/api/media/bulk-delete', requireAdmin, async (req, res) => {
    try {
      const { mediaIds } = req.body;
      
      if (!mediaIds || !Array.isArray(mediaIds)) {
        return res.status(400).json({ error: 'mediaIds array is required' });
      }
      
      const mediaService = await getMediaLibraryService();
      await mediaService.bulkDeleteMedia(mediaIds, 'admin');
      
      res.json({ success: true, deletedCount: mediaIds.length });
    } catch (error) {
      console.error('Error bulk deleting media:', error);
      res.status(500).json({ 
        error: 'Failed to bulk delete media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Publish media to website section
  app.post('/api/media/publish', requireAdmin, async (req, res) => {
    try {
      const { mediaIds, targetSection } = req.body;
      
      if (!mediaIds || !Array.isArray(mediaIds)) {
        return res.status(400).json({ error: 'mediaIds array is required' });
      }
      
      if (!targetSection) {
        return res.status(400).json({ error: 'targetSection is required' });
      }
      
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.publishToWebsite(mediaIds, targetSection);
      
      res.json(result);
    } catch (error) {
      console.error('Error publishing media:', error);
      res.status(500).json({ 
        error: 'Failed to publish media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Edit photo with AI
  app.post('/api/media/edit-photo', requireAdmin, async (req, res) => {
    try {
      const { photoId, editType, editPrompt, userId } = req.body;
      
      if (!photoId) {
        return res.status(400).json({ error: 'photoId is required' });
      }
      
      const mediaService = await getMediaLibraryService();
      const result = await mediaService.editPhoto(photoId, editType, editPrompt, userId || 'admin');
      
      res.json(result);
    } catch (error) {
      console.error('Error editing photo:', error);
      res.status(500).json({ 
        error: 'Failed to edit photo',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Analyze photo with AI
  app.post('/api/media/:id/analyze', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      const mediaService = await getMediaLibraryService();
      // Get media item to get object path
      const storage = await getStorage();
      const mediaItem = await storage.getMedia(id);
      
      if (!mediaItem) {
        return res.status(404).json({ error: 'Media item not found' });
      }
      
      // Trigger async analysis
      mediaService.analyzePhotoAsync(id, mediaItem.filePath);
      
      res.json({ success: true, message: 'Analysis started' });
    } catch (error) {
      console.error('Error analyzing photo:', error);
      res.status(500).json({ 
        error: 'Failed to analyze photo',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // View media file by ID
  app.get('/api/media/view/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      const storage = await getStorage();
      const mediaItem = await storage.getMedia(id);
      
      if (!mediaItem) {
        return res.status(404).json({ error: 'Media item not found' });
      }
      
      // Check if file is in local attached_assets folder
      if (mediaItem.filePath.startsWith('/attached_assets/') || mediaItem.filePath.startsWith('attached_assets/')) {
        // Serve from local filesystem with path traversal protection
        const assetsRoot = path.resolve(import.meta.dirname, '..', 'attached_assets');
        const requestedPath = path.resolve(import.meta.dirname, '..', mediaItem.filePath.replace(/^\//, ''));
        
        // Security check: Ensure resolved path is within attached_assets directory
        // Use path.relative to detect attempts to escape the directory
        const relativePath = path.relative(assetsRoot, requestedPath);
        const isInsideRoot = relativePath && 
                            relativePath !== '.' && 
                            !relativePath.startsWith('..') && 
                            !path.isAbsolute(relativePath);
        
        if (!isInsideRoot) {
          console.warn(`[SECURITY] Path traversal attempt blocked: ${mediaItem.filePath} (resolved to: ${requestedPath})`);
          return res.status(403).json({ error: 'Access denied: Path outside allowed directory' });
        }
        
        if (!existsSync(requestedPath)) {
          return res.status(404).json({ error: 'Media file not found on filesystem' });
        }
        
        // Additional security: Ensure it's a file, not a directory
        try {
          const stats = statSync(requestedPath);
          if (!stats.isFile()) {
            console.warn(`[SECURITY] Directory access attempt blocked: ${mediaItem.filePath}`);
            return res.status(403).json({ error: 'Access denied: Not a file' });
          }
        } catch (error) {
          return res.status(404).json({ error: 'Media file not found' });
        }
        
        // Set appropriate content type
        const ext = path.extname(requestedPath).toLowerCase();
        const contentTypes: Record<string, string> = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.webp': 'image/webp',
          '.mp4': 'video/mp4',
          '.mov': 'video/quicktime',
          '.avi': 'video/x-msvideo'
        };
        
        const contentType = contentTypes[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // Cache for 1 year
        res.setHeader('Vary', 'Accept-Encoding');
        
        // Stream the file (using validated path)
        const fileStream = createReadStream(requestedPath);
        fileStream.pipe(res);
        
        fileStream.on('error', (error) => {
          console.error('Error streaming file:', error);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to stream media file' });
          }
        });
        
        return;
      }
      
      // File is in Object Storage - get signed URL
      const ObjectStorageServiceClass = await getObjectStorageService();
      if (!ObjectStorageServiceClass) {
        return res.status(500).json({ error: 'Object storage not available' });
      }
      
      const objectStorageService = new ObjectStorageServiceClass();
      const signedUrl = await objectStorageService.getSignedUrl(mediaItem.filePath);
      
      // Redirect to signed URL
      res.redirect(signedUrl);
    } catch (error) {
      console.error('Error viewing media:', error);
      res.status(500).json({ 
        error: 'Failed to view media',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // ==========================================
  // BLOG ROUTES
  // ==========================================

  // Create blog author (admin only)
  app.post('/api/blog/authors', requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogAuthorSchema.parse(req.body);
      const storage = await getStorage();
      
      // Generate slug if not provided
      if (!validatedData.slug) {
        const baseSlug = generateSlugFromText(validatedData.name);
        validatedData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          return await storage.getBlogAuthorBySlug(slug);
        });
      }
      
      const author = await storage.createBlogAuthor(validatedData);
      res.json(author);
    } catch (error: any) {
      console.error('Error creating blog author:', error);
      if (isSlugConflictError(error)) {
        return res.status(409).json({ error: 'Author with this slug already exists' });
      }
      res.status(500).json({ 
        error: 'Failed to create blog author',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Create blog category (admin only)
  app.post('/api/blog/categories', requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogCategorySchema.parse(req.body);
      const storage = await getStorage();
      
      // Generate slug if not provided
      if (!validatedData.slug) {
        const baseSlug = generateSlugFromText(validatedData.name);
        validatedData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          return await storage.getBlogCategoryBySlug(slug);
        });
      }
      
      const category = await storage.createBlogCategory(validatedData);
      res.json(category);
    } catch (error: any) {
      console.error('Error creating blog category:', error);
      if (isSlugConflictError(error)) {
        return res.status(409).json({ error: 'Category with this slug already exists' });
      }
      res.status(500).json({ 
        error: 'Failed to create blog category',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Create blog tag (admin only)
  app.post('/api/blog/tags', requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogTagSchema.parse(req.body);
      const storage = await getStorage();
      
      // Generate slug if not provided
      if (!validatedData.slug) {
        const baseSlug = generateSlugFromText(validatedData.name);
        validatedData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          return await storage.getBlogTagBySlug(slug);
        });
      }
      
      const tag = await storage.createBlogTag(validatedData);
      res.json(tag);
    } catch (error: any) {
      console.error('Error creating blog tag:', error);
      if (isSlugConflictError(error)) {
        return res.status(409).json({ error: 'Tag with this slug already exists' });
      }
      res.status(500).json({ 
        error: 'Failed to create blog tag',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Create blog post (admin only)
  app.post('/api/blog/posts', requireAdmin, async (req, res) => {
    try {
      const { categoryIds, tagIds, ...postData } = req.body;
      const validatedData = insertBlogPostSchema.parse(postData);
      const storage = await getStorage();
      
      // Generate slug if not provided
      if (!validatedData.slug) {
        const baseSlug = generateSlugFromText(validatedData.title);
        validatedData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          return await storage.getBlogPostBySlug(slug);
        });
      }
      
      // Calculate reading time and word count if content provided
      if (validatedData.content) {
        const textContent = validatedData.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const words = textContent.split(' ').filter(w => w.length > 0);
        validatedData.wordCount = words.length;
        validatedData.readingTime = Math.ceil(words.length / 200); // Assuming 200 words per minute
      }
      
      // Create the post
      const post = await storage.createBlogPost(validatedData);
      
      // Add category and tag relationships
      if (categoryIds && Array.isArray(categoryIds)) {
        for (const categoryId of categoryIds) {
          await storage.addBlogPostCategory(post.id, categoryId);
        }
      }
      
      if (tagIds && Array.isArray(tagIds)) {
        for (const tagId of tagIds) {
          await storage.addBlogPostTag(post.id, tagId);
        }
      }
      
      // Get the full post with relationships
      const fullPost = await storage.getBlogPost(post.id);
      res.json(fullPost);
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      if (isSlugConflictError(error)) {
        return res.status(409).json({ error: 'Post with this slug already exists' });
      }
      res.status(500).json({ 
        error: 'Failed to create blog post',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // HTML Sanitization configuration for blog content
  const sanitizeOptions = {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'strong', 'em', 'code', 'pre', 'span', 'div'],
    allowedAttributes: {
      'a': ['href', 'title', 'target', 'rel'],
      'img': ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      img: ['http', 'https', 'data']
    }
  };

  // Sanitize and validate HTML content
  function sanitizeAndValidateHtml(content: string, title: string): { 
    sanitized: string; 
    isValid: boolean; 
    warnings: string[] 
  } {
    const warnings: string[] = [];
    
    // Sanitize HTML to remove dangerous tags and attributes
    const sanitized = sanitizeHtml(content, sanitizeOptions);
    
    // Check if content was modified by sanitization (potential XSS attempt)
    if (sanitized !== content) {
      warnings.push('Content was sanitized - potentially dangerous HTML was removed');
      console.warn(`⚠️ Content sanitized for post "${title}"`);
    }
    
    // Validate minimum content length
    const textContent = sanitized.replace(/<[^>]*>/g, '').trim();
    if (textContent.length < 50) {
      warnings.push('Content is too short (less than 50 characters)');
      return { sanitized, isValid: false, warnings };
    }
    
    // Validate HTML structure (basic check)
    const openTags = (sanitized.match(/<(?!\/)[^>]+>/g) || []).length;
    const closeTags = (sanitized.match(/<\/[^>]+>/g) || []).length;
    const selfClosingTags = (sanitized.match(/<[^>]+\/>/g) || []).length;
    
    if (openTags !== closeTags + selfClosingTags) {
      warnings.push('HTML structure may be malformed');
    }
    
    return { sanitized, isValid: true, warnings };
  }

  // Format all blog posts with Gemini AI (admin only)
  app.post('/api/blog/admin/format-all-posts', requireAdmin, async (req, res) => {
    try {
      const storage = await getStorage();
      const { limit, dryRun = false } = req.body; // Optional limit for testing and dry-run mode
      
      // Fetch all published blog posts
      const posts = await storage.getAllBlogPosts({ 
        status: 'published',
        limit: limit || 1000 
      });
      
      const results = {
        processed: 0,
        errors: 0,
        dryRun,
        details: [] as Array<{ 
          id: string; 
          title: string; 
          status: 'success' | 'error'; 
          message?: string;
          preview?: {
            original: string;
            formatted: string;
            sanitized: string;
            warnings: string[];
          }
        }>
      };
      
      const mode = dryRun ? 'DRY RUN' : 'LIVE';
      console.log(`Starting ${mode} format of ${posts.length} published blog posts with Gemini AI...`);
      
      // Process each post
      for (const post of posts) {
        try {
          console.log(`[${mode}] Formatting post: ${post.title} (${post.id})`);
          
          // Call Gemini to format the content
          const formattedContent = await formatBlogPost(post.content, post.title);
          
          // SECURITY: Sanitize and validate the formatted content
          const { sanitized, isValid, warnings } = sanitizeAndValidateHtml(formattedContent, post.title);
          
          if (!isValid) {
            throw new Error(`Validation failed: ${warnings.join(', ')}`);
          }
          
          // Log warnings if content was sanitized
          if (warnings.length > 0) {
            console.warn(`⚠️ Warnings for post "${post.title}":`, warnings);
          }
          
          // In dry-run mode, return preview without saving
          if (dryRun) {
            results.details.push({
              id: post.id,
              title: post.title,
              status: 'success',
              preview: {
                original: post.content.substring(0, 500) + (post.content.length > 500 ? '...' : ''),
                formatted: formattedContent.substring(0, 500) + (formattedContent.length > 500 ? '...' : ''),
                sanitized: sanitized.substring(0, 500) + (sanitized.length > 500 ? '...' : ''),
                warnings
              }
            });
            results.processed++;
            console.log(`✅ [DRY RUN] Preview generated for post: ${post.title}`);
          } else {
            // Update the post with sanitized formatted content
            await storage.updateBlogPost(post.id, {
              content: sanitized,
              updatedAt: new Date()
            });
            
            results.processed++;
            results.details.push({
              id: post.id,
              title: post.title,
              status: 'success',
              message: warnings.length > 0 ? `Sanitized: ${warnings.join(', ')}` : undefined
            });
            
            console.log(`✅ Successfully formatted and sanitized post: ${post.title}`);
          }
        } catch (error: any) {
          results.errors++;
          results.details.push({
            id: post.id,
            title: post.title,
            status: 'error',
            message: error.message || 'Unknown error'
          });
          
          console.error(`❌ Error formatting post ${post.title}:`, error);
        }
      }
      
      console.log(`[${mode}] Blog formatting complete: ${results.processed} processed, ${results.errors} errors`);
      res.json(results);
    } catch (error: any) {
      console.error('Error in format-all-posts:', error);
      res.status(500).json({ 
        error: 'Failed to format blog posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // ==========================================
  // PROMPTS LIBRARY API ROUTES
  // ==========================================

  app.post('/api/prompts-library', requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPromptsLibrarySchema.parse(req.body);
      const result = await storage.savePromptLibrary(validatedData);
      res.json(result);
    } catch (error: any) {
      console.error('Error saving prompts library:', error);
      res.status(400).json({ error: error.message });
    }
  });

  app.get('/api/prompts-library', requireAdmin, async (req, res) => {
    try {
      const results = await storage.getAllPromptLibraries();
      res.json(results);
    } catch (error: any) {
      console.error('Error getting all prompts libraries:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/prompts-library/:name', requireAdmin, async (req, res) => {
    try {
      const result = await storage.getPromptLibrary(req.params.name);
      if (!result) {
        return res.status(404).json({ error: 'Prompts library entry not found' });
      }
      res.json(result);
    } catch (error: any) {
      console.error('Error getting prompts library:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/prompts-library/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      const result = await storage.updatePromptLibrary(id, req.body);
      res.json(result);
    } catch (error: any) {
      console.error('Error updating prompts library:', error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// ==========================================
// DISCOUNT CODE VALIDATION
// ==========================================

/**
 * Validates discount codes server-side for security
 */
async function validateDiscountCode(code: string): Promise<{
  valid: boolean;
  discount?: {
    code: string;
    percentage: number;
    description: string;
  };
  error?: string;
}> {
  try {
    // 🔒 SECURITY: Discount codes now loaded from environment variables only
    // NO HARDCODED DISCOUNT CODES FOR SECURITY
    const allowedCodesEnv = process.env.ALLOWED_DISCOUNT_CODES;
    if (!allowedCodesEnv) {
      console.warn('⚠️ No ALLOWED_DISCOUNT_CODES environment variable set');
      return {
        valid: false,
        error: 'Discount codes not configured'
      };
    }
    
    let allowedCodes: Record<string, { percentage: number; description: string }>;
    try {
      allowedCodes = JSON.parse(allowedCodesEnv);
    } catch (parseError) {
      console.error('❌ Invalid ALLOWED_DISCOUNT_CODES format:', parseError);
      return {
        valid: false,
        error: 'Discount configuration error'
      };
    }
    
    const normalizedCode = code.toUpperCase().trim();
    
    if (allowedCodes[normalizedCode]) {
      const discountInfo = allowedCodes[normalizedCode];
      
      // Additional validation for security
      if (discountInfo.percentage > 50) {
        console.warn(`⚠️ High discount attempted: ${discountInfo.percentage}% for code ${normalizedCode}`);
      }
      
      return {
        valid: true,
        discount: {
          code: normalizedCode,
          percentage: Math.min(discountInfo.percentage, 50), // Cap at 50% for security
          description: discountInfo.description
        }
      };
    }
    
    return {
      valid: false,
      error: 'Invalid discount code'
    };
  } catch (error) {
    console.error('Error validating discount code:', error);
    return {
      valid: false,
      error: 'Server error validating discount code'
    };
  }
}

// ==========================================
// SLOT HOLD VALIDATION FOR ATOMIC CHECKOUT
// ==========================================

/**
 * Validates that a slot hold matches the selection payload to prevent tampering
 * This is critical for preventing double-booking through payload manipulation
 */
function validateHoldMatchesSelection(
  slotHold: any, 
  selectionPayload: any
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate cruise type matches
  if (slotHold.cruiseType !== selectionPayload.cruiseType) {
    errors.push(`Cruise type mismatch: hold has ${slotHold.cruiseType}, payload has ${selectionPayload.cruiseType}`);
  }
  
  // Validate date matches (ISO format comparison)
  const holdDate = slotHold.dateISO;
  const payloadDate = new Date(selectionPayload.eventDate).toISOString().split('T')[0];
  if (holdDate !== payloadDate) {
    errors.push(`Date mismatch: hold has ${holdDate}, payload has ${payloadDate}`);
  }
  
  // Validate time slot matches - handle both NormalizedSlot object and string formats
  let expectedStartTime: string | null = null;
  let expectedEndTime: string | null = null;
  
  // Check if we have a NormalizedSlot object first (preferred format)
  if (selectionPayload.selectedSlot && typeof selectionPayload.selectedSlot === 'object') {
    const slot = selectionPayload.selectedSlot;
    expectedStartTime = slot.startTime;
    expectedEndTime = slot.endTime;
  } else {
    // Fall back to string parsing for backward compatibility
    const effectiveTimeSlot = selectionPayload.selectedTimeSlot || selectionPayload.timeSlot;
    if (effectiveTimeSlot) {
      // Extract time range from effective time slot for comparison
      const timeMatch = effectiveTimeSlot.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))\s*-\s*(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
      if (timeMatch) {
        const [, startTimeStr, endTimeStr] = timeMatch;
        
        // Convert to 24-hour format for comparison
        const convertTo24Hour = (timeStr: string): string => {
          const [time, period] = timeStr.trim().split(/\s+/);
          const [hours, minutes] = time.split(':');
          let hour24 = parseInt(hours);
          
          if (period.toUpperCase() === 'PM' && hour24 !== 12) {
            hour24 += 12;
          } else if (period.toUpperCase() === 'AM' && hour24 === 12) {
            hour24 = 0;
          }
          
          return `${hour24.toString().padStart(2, '0')}:${minutes}`;
        };
        
        expectedStartTime = convertTo24Hour(startTimeStr);
        expectedEndTime = convertTo24Hour(endTimeStr);
      }
    }
  }
  
  // Validate the extracted times against the hold
  if (expectedStartTime && expectedEndTime) {
    if (slotHold.startTime !== expectedStartTime) {
      errors.push(`Start time mismatch: hold has ${slotHold.startTime}, payload expects ${expectedStartTime}`);
    }
    
    if (slotHold.endTime !== expectedEndTime) {
      errors.push(`End time mismatch: hold has ${slotHold.endTime}, payload expects ${expectedEndTime}`);
    }
  }
  
  // Validate group size is within reasonable bounds of the hold
  if (slotHold.groupSize && selectionPayload.groupSize) {
    const holdGroupSize = parseInt(slotHold.groupSize);
    const payloadGroupSize = parseInt(selectionPayload.groupSize);
    
    // Allow some flexibility for group size changes, but flag major discrepancies
    if (Math.abs(holdGroupSize - payloadGroupSize) > 5) {
      errors.push(`Group size significant change: hold has ${holdGroupSize}, payload has ${payloadGroupSize}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Creates a booking atomically from a validated slot hold
 * This is the core security function that prevents double-booking
 */
async function createBookingFromHoldAtomic(params: {
  holdId: string;
  projectId: string;
  paymentId: string;
  paymentAmount: number;
  paymentIntentMetadata: any;
}): Promise<void> {
  const { holdId, projectId, paymentId, paymentAmount, paymentIntentMetadata } = params;
  
  console.log(`🔒 Starting atomic booking creation from hold ${holdId}`);
  
  // CRITICAL: Validate hold still exists and hasn't expired
  const slotHold = await storage.getSlotHold(holdId);
  if (!slotHold) {
    const error = new Error('HOLD_NOT_FOUND: Slot hold no longer exists');
    (error as any).code = 'HOLD_NOT_FOUND';
    throw error;
  }
  
  // CRITICAL: Check if hold has expired
  if (slotHold.expiresAt <= new Date()) {
    // Clean up expired hold
    await storage.releaseSlotHold(holdId);
    const error = new Error('HOLD_EXPIRED: Slot hold has expired during payment processing');
    (error as any).code = 'HOLD_EXPIRED';
    throw error;
  }
  
  // CRITICAL: Verify slot is still available (double-check for race conditions)
  const storageInstance = await getStorage();
  const availability = await storageInstance.isSlotAvailable(slotHold.slotId, slotHold.groupSize);
  if (!availability.available) {
    // Release the hold since slot is no longer available
    const storageInstance = await getStorage();
    await storageInstance.releaseSlotHold(holdId);
    const error = new Error(`SLOT_UNAVAILABLE: Slot is no longer available - ${availability.reason}`);
    (error as any).code = 'SLOT_UNAVAILABLE';
    throw error;
  }
  
  try {
    // Get project details  
    const project = await storageInstance.getProject(projectId);
    if (!project) {
      throw new Error('Project not found for booking creation');
    }
    
    // Convert hold time information to Date objects for booking
    const eventDate = new Date(paymentIntentMetadata.eventDate);
    const [startHours, startMinutes] = slotHold.startTime.split(':');
    const [endHours, endMinutes] = slotHold.endTime.split(':');
    
    const startTime = new Date(eventDate);
    startTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
    
    const endTime = new Date(eventDate);
    endTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
    
    // CRITICAL: Final conflict check with the specific boat and time
    const boatId = slotHold.boatId || await findAvailableBoat(slotHold, project.groupSize || 1);
    if (!boatId) {
      await storageInstance.releaseSlotHold(holdId);
      const error = new Error('NO_BOATS_AVAILABLE: No boats available for the time slot');
      (error as any).code = 'NO_BOATS_AVAILABLE';
      throw error;
    }
    
    const hasConflict = await storageInstance.checkBookingConflict(boatId, startTime, endTime);
    if (hasConflict) {
      await storageInstance.releaseSlotHold(holdId);
      const error = new Error('BOOKING_CONFLICT: Slot conflict detected during atomic booking creation');
      (error as any).code = 'BOOKING_CONFLICT';
      throw error;
    }
    
    // Create the booking with validated slot information
    const booking = {
      orgId: project.orgId,
      boatId,
      type: slotHold.cruiseType as 'private' | 'disco',
      status: 'booked' as const,
      startTime,
      endTime,
      partyType: project.eventType || 'cruise',
      groupSize: slotHold.groupSize || project.groupSize || 1,
      projectId,
      paymentStatus: 'deposit_paid' as const,
      amountPaid: paymentAmount,
      totalAmount: paymentAmount,
      notes: `Atomic booking from hold ${holdId} - Payment ${paymentId} - Amount: $${(paymentAmount / 100).toFixed(2)}`,
    };
    
    // ATOMIC OPERATION: Create booking and release hold in sequence
    const newBooking = await storageInstance.createBooking(booking);
    console.log(`✅ Booking created successfully: ${newBooking.id}`);
    
    // CRITICAL: Remove availability slot after successful booking (PURCHASE INTEGRATION)
    try {
      // Find and remove the corresponding availability slot to prevent further bookings
      const availabilitySlots = await storageInstance.getAvailabilitySlots(boatId, startTime, endTime);
      const availabilitySlot = availabilitySlots.find(slot => 
        slot.boatId === boatId &&
        slot.startTime.getTime() === startTime.getTime() &&
        slot.endTime.getTime() === endTime.getTime()
      );
      
      if (availabilitySlot) {
        const slotRemoved = await storageInstance.deleteAvailabilitySlot(availabilitySlot.id);
        if (slotRemoved) {
          console.log(`✅ PURCHASE INTEGRATION: Availability slot ${availabilitySlot.id} removed after booking ${newBooking.id}`);
          
          // Broadcast real-time update for immediate sync with Admin Calendar and Quote Builder
          broadcastRealtimeEvent({
            type: 'booking_created',
            slotId: availabilitySlot.id,
            eventDate: startTime.toISOString().split('T')[0],
            boatId: boatId,
            startTime: startTime.toTimeString().split(' ')[0].substring(0, 5),
            endTime: endTime.toTimeString().split(' ')[0].substring(0, 5),
            eventTitle: `Slot booked by customer - ${paymentIntentMetadata.customerName}`,
            customerName: paymentIntentMetadata.customerName,
            customerEmail: paymentIntentMetadata.customerEmail,
            bookingId: newBooking.id,
            amount: paymentAmount,
            timestamp: new Date().toISOString()
          });
          
          console.log(`📡 PURCHASE INTEGRATION: SSE broadcast sent for slot removal after booking ${newBooking.id}`);
        } else {
          console.warn(`⚠️ PURCHASE INTEGRATION: Failed to remove availability slot ${availabilitySlot.id} after booking`);
        }
      } else {
        console.warn(`⚠️ PURCHASE INTEGRATION: No availability slot found to remove for booking ${newBooking.id}`);
      }
    } catch (slotRemovalError) {
      console.error(`❌ PURCHASE INTEGRATION: Failed to remove availability slot after booking:`, slotRemovalError);
      // Don't fail the booking - the booking was successful, slot removal is for optimization
    }
    
    // CRITICAL: Release the hold only after successful booking creation
    const holdReleased = await storageInstance.releaseSlotHold(holdId);
    if (holdReleased) {
      console.log(`✅ Hold ${holdId} released after successful booking creation`);
    } else {
      console.warn(`⚠️ Hold ${holdId} was already released or not found`);
    }
    
    // Convert lead to customer
    await storageInstance.convertLeadToCustomer(project.contactId);
    
    console.log(`🎉 Atomic booking creation completed successfully for hold ${holdId}`);
    
  } catch (error: any) {
    console.error(`❌ Atomic booking creation failed for hold ${holdId}:`, error);
    
    // CRITICAL: Ensure hold is released on any failure
    try {
      const errorStorageInstance = await getStorage();
      await errorStorageInstance.releaseSlotHold(holdId);
      console.log(`🧹 Hold ${holdId} released due to booking creation failure`);
    } catch (releaseError) {
      console.error(`❌ Failed to release hold ${holdId} after booking failure:`, releaseError);
    }
    
    throw error;
  }
}

/**
 * Helper function to find an available boat for the slot
 */
async function findAvailableBoat(slotHold: any, groupSize: number): Promise<string | null> {
  if (slotHold.boatId) {
    return slotHold.boatId;
  }
  
  // Find boats that can accommodate the group size
  const storageInstance = await getStorage();
  const boats = await storageInstance.getActiveBoats();
  const suitableBoats = boats.filter(boat => boat.capacity >= groupSize);
  
  // Convert hold time to Date objects for conflict checking
  const eventDate = new Date(slotHold.dateISO);
  const [startHours, startMinutes] = slotHold.startTime.split(':');
  const [endHours, endMinutes] = slotHold.endTime.split(':');
  
  const startTime = new Date(eventDate);
  startTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
  
  const endTime = new Date(eventDate);
  endTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
  
  // Check each suitable boat for conflicts
  for (const boat of suitableBoats) {
    const hasConflict = await storageInstance.checkBookingConflict(boat.id, startTime, endTime);
    if (!hasConflict) {
      return boat.id;
    }
  }
  
  return null;
}

// ==========================================
// ADMIN AUTHENTICATION AND AUTHORIZATION
// ==========================================

interface AdminUser {
  id: string;
  name: string;
  email: string;
  permissions: ('read' | 'edit' | 'full')[];
}

// Mock admin session validation - replace with real authentication
const validateAdminSession = (req: any): AdminUser | null => {
  try {
    // Check for admin session or token
    const authHeader = req.headers?.authorization;
    
    // For development, allow a test admin token
    if (authHeader === 'Bearer admin-dev-token' || process.env.ADMIN_DEV_MODE === 'true') {
      return {
        id: 'admin-dev',
        name: 'Development Admin',
        email: 'admin@premierpartycruises.com',
        permissions: ['read', 'edit', 'full']
      };
    }
    
    // Safely check for valid session admin
    const sessionAdmin = req.session?.admin;
    if (sessionAdmin && sessionAdmin.id && sessionAdmin.email) {
      return {
        id: sessionAdmin.id,
        name: sessionAdmin.name || 'Admin User',
        email: sessionAdmin.email,
        permissions: sessionAdmin.permissions || ['read', 'edit']
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error in validateAdminSession:', error);
    return null;
  }
};

// Authentication middleware for admin routes
const requireAdminAuth = (req: any, res: any, next: any) => {
  try {
    const adminUser = validateAdminSession(req);
    
    if (!adminUser) {
      return res.status(401).json({ 
        error: "Admin authentication required",
        details: "Please authenticate with valid admin credentials"
      });
    }
    
    // Attach verified admin identity to request
    req.adminUser = adminUser;
    next();
  } catch (error) {
    console.error('Error in requireAdminAuth:', error);
    return res.status(500).json({ 
      error: "Authentication system error",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Permission check middleware
const requirePermission = (permission: 'read' | 'edit' | 'full') => {
  return (req: any, res: any, next: any) => {
    if (!req.adminUser || !req.adminUser.permissions.includes(permission)) {
      return res.status(403).json({ 
        error: "Insufficient permissions",
        required: permission,
        current: req.adminUser?.permissions || []
      });
    }
    next();
  };
};

// ==========================================
// ADMIN ENDPOINT VALIDATION SCHEMAS
// ==========================================

// Timezone normalization for America/Chicago
const normalizeToChicagoTime = (dateString: string): Date => {
  // If it's just a date (YYYY-MM-DD), treat as Chicago timezone
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return new Date(dateString + 'T00:00:00-06:00'); // CST/CDT
  }
  
  // If it includes time but no timezone, assume Chicago
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(dateString)) {
    return new Date(dateString + '-06:00');
  }
  
  // Otherwise parse as-is
  return new Date(dateString);
};

const adminCalendarQuerySchema = z.object({
  startDate: z.string().transform(normalizeToChicagoTime),
  endDate: z.string().transform(normalizeToChicagoTime),
  boatId: z.string().optional()
});

const blockSlotSchema = z.object({
  boatId: z.string().min(1, "Boat ID is required"),
  startTime: z.string().transform(normalizeToChicagoTime),
  endTime: z.string().transform(normalizeToChicagoTime),
  reason: z.string().optional()
});

const unblockSlotSchema = z.object({
  boatId: z.string().min(1, "Boat ID is required"),
  startTime: z.string().transform(normalizeToChicagoTime),
  endTime: z.string().transform(normalizeToChicagoTime)
});

const batchSlotOperationSchema = z.object({
  operation: z.object({
    type: z.enum(['block', 'unblock']),
    slotIds: z.array(z.string()),
    reason: z.string().optional(),
    boatId: z.string().optional(),
    startTime: z.string().transform(normalizeToChicagoTime).optional(),
    endTime: z.string().transform(normalizeToChicagoTime).optional()
  })
});

// Note: Booking schemas removed - bookings table no longer exists after database cleanup
// const adminBookingCreateSchema = insertBookingSchema.extend({
//   startTime: z.string().transform(normalizeToChicagoTime),
//   endTime: z.string().transform(normalizeToChicagoTime)
// });

// const adminBookingUpdateSchema = adminBookingCreateSchema.partial();

const moveBookingSchema = z.object({
  newStartTime: z.string().transform(normalizeToChicagoTime),
  newEndTime: z.string().transform(normalizeToChicagoTime),
  newBoatId: z.string().optional()
});

const recurringPatternSchema = z.object({
  startDate: z.string().transform(normalizeToChicagoTime),
  endDate: z.string().transform(normalizeToChicagoTime).optional(),
  timeSlots: z.array(z.object({
    startTime: z.string(),
    endTime: z.string()
  })),
  boatIds: z.array(z.string()),
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  reason: z.string().optional()
});

const cancelBookingSchema = z.object({
  reason: z.string().optional()
});

const calendarOverviewSchema = z.object({
  date: z.string().transform(normalizeToChicagoTime)
});

// ==========================================
// INVOICE VALIDATION SCHEMAS
// ==========================================

const invoiceItemSchema = z.object({
  type: z.string().min(1, "Item type is required"),
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  unitPrice: z.number().min(0, "Unit price must be non-negative"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  total: z.number().min(0, "Total must be non-negative"),
});

// ENFORCED: Remove client financial fields to ensure server-authoritative totals
const createInvoiceSchema = z.object({
  quoteId: z.string().min(1, "Quote ID is required"),
  dueDate: z.string().datetime(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  notes: z.string().optional(),
  // CLIENT TOTALS REMOVED: subtotal, tax, gratuity, total are SERVER-CALCULATED ONLY
});

// ENFORCED: Update schema excludes financial totals - server calculates these
const updateInvoiceSchema = z.object({
  items: z.array(invoiceItemSchema).optional(),
  dueDate: z.string().datetime().optional(),
  notes: z.string().optional(),
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).optional(),
  // CLIENT TOTALS REMOVED: subtotal, tax, gratuity, total are SERVER-CALCULATED ONLY
});

const markPaidSchema = z.object({
  amount: z.number().min(0, "Payment amount must be non-negative"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  paymentDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

const invoiceFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).optional(),
  sortBy: z.enum(['createdAt', 'dueDate', 'total', 'customerName', 'status']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  limit: z.number().min(1).max(100).optional(),
});

const sendInvoiceSchema = z.object({
  invoiceId: z.string().min(1, "Invoice ID is required"),
  recipientEmail: z.string().email("Valid email is required"),
  personalMessage: z.string().optional(),
  sendCopy: z.boolean().optional().default(false),
});

// ==========================================
// PRICING CALCULATION HELPER
// ==========================================

async function calculateInvoiceTotalsWithPricingSettings(items: any[], quoteId?: string, eventDate?: Date) {
  // Get PricingSettings for consistent tax rates
  const storageInstance = await getStorage();
  const settings = await storageInstance.getPricingSettings();
  
  // Handle tax rate - if it's in basis points (like 825), convert to decimal (0.0825)
  let taxRate = settings?.taxRate || 0.0825;
  if (taxRate > 1) {
    // Tax rate is in basis points, convert to decimal
    taxRate = taxRate / 10000;
  }
  
  const gratuityRate = (settings?.defaultGratuityPercent || 20) / 100;

  // Calculate subtotal from validated items
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  
  // Apply consistent tax and gratuity calculations
  const tax = Math.round(subtotal * taxRate);
  const gratuity = Math.round(subtotal * gratuityRate);
  const total = subtotal + tax + gratuity;
  
  // Calculate deposit and due date - dynamic deposit based on urgency
  const today = new Date();
  let depositPercent = 25; // Default 25% for standard bookings
  let isUrgentBooking = false;
  
  if (eventDate) {
    const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    isUrgentBooking = daysUntilEvent <= 30; // 30 days threshold for urgent booking
    depositPercent = isUrgentBooking ? 50 : 25; // 50% for urgent, 25% for standard
  }
  
  const depositAmount = Math.floor(total * (depositPercent / 100));
  const remainingBalance = total - depositAmount;
  
  // Calculate when remaining balance is due (30 days before event)
  let remainingBalanceDueAt = null;
  if (eventDate) {
    const today = new Date();
    const dueDate = new Date(eventDate);
    dueDate.setDate(dueDate.getDate() - 30);
    remainingBalanceDueAt = dueDate < today ? today : dueDate;
  }
  
  // Create payment schedule
  const paymentSchedule = [
    {
      line: 1,
      due: "booking",
      percent: depositPercent,
      amount: depositAmount,
      daysBefore: 0,
      description: "Deposit to secure booking"
    },
    {
      line: 2,
      due: "final",
      percent: 100 - depositPercent,
      amount: remainingBalance,
      daysBefore: 30,
      dueDate: remainingBalanceDueAt,
      description: "Remaining balance due 30 days before cruise"
    }
  ];

  console.log(`💰 Invoice calculation - Subtotal: $${subtotal/100}, Tax: $${tax/100} (${taxRate*100}%), Gratuity: $${gratuity/100} (${gratuityRate*100}%), Total: $${total/100}, Deposit: $${depositAmount/100} (25%), Balance Due: $${remainingBalance/100}`);

  return {
    subtotal,
    tax,
    gratuity,
    total,
    taxRate,
    gratuityRate,
    depositPercent,
    depositAmount,
    remainingBalance,
    remainingBalanceDueAt,
    paymentSchedule
  };
}

// Lazy Stripe initialization - only create when needed for payment operations
let stripe: Stripe | null = null;

const getStripe = () => {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    try {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-06-20',
      });
      console.log('✅ Stripe initialized on-demand');
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      throw new Error('Payment service initialization failed');
    }
  } else if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('STRIPE_SECRET_KEY not configured. Payment functionality will be mocked.');
    return null;
  }
  return stripe;
};

// Helper functions for sending quotes
async function sendQuoteEmail(quoteId: string, email: string, personalMessage?: string) {
  const quote = await storage.getQuote(quoteId);
  if (!quote) throw new Error("Quote not found");
  
  const project = await storage.getProject(quote.projectId);
  const contact = project ? await storage.getContact(project.contactId) : null;
  
  // Get detailed pricing breakdown for the email
  const eventDate = project?.projectDate ? (typeof project.projectDate === 'string' ? new Date(project.projectDate) : project.projectDate) : null;
  const formattedDate = eventDate ? eventDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'To be confirmed';
  
  // Extract cruise type and package info from project
  const cruiseType = 'private'; // Default to private cruise
  const timeSlot = project?.preferredTime || 'TBD';
  const packageName = 'Custom Package';
  const boatType = cruiseType;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #3b82f6, #06b6d4); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">🚢 Premier Party Cruises</h1>
        <p style="color: white; margin: 10px 0 0 0;">Your Quote is Ready!</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2>Hello ${contact?.name || 'Valued Customer'}!</h2>
        
        <p>Thank you for your interest in Premier Party Cruises! We've prepared a custom quote for your upcoming event.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">📋 Quote Details</h3>
          <p><strong>Event:</strong> ${project?.eventType || 'Party Cruise'}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${timeSlot}</p>
          <p><strong>Group Size:</strong> ${project?.groupSize || 'TBD'} guests</p>
          <p><strong>Cruise Type:</strong> Private Charter</p>
          ${packageName && packageName !== 'Custom Package' ? `<p><strong>Package:</strong> ${packageName}</p>` : ''}
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin-top: 0; color: #1e40af;">💰 Pricing Breakdown</h3>
          <p style="font-size: 18px;"><strong>Subtotal:</strong> $${(quote.subtotal / 100).toFixed(2)}</p>
          ${quote.discountTotal > 0 ? `<p style="color: #dc2626;"><strong>Discount:</strong> -$${(quote.discountTotal / 100).toFixed(2)}</p>` : ''}
          ${quote.tax > 0 ? `<p><strong>Tax:</strong> $${(quote.tax / 100).toFixed(2)}</p>` : ''}
          ${quote.gratuity > 0 ? `<p><strong>Gratuity:</strong> $${(quote.gratuity / 100).toFixed(2)}</p>` : ''}
          <hr style="margin: 15px 0;">
          <p style="font-size: 24px; color: #1e40af;"><strong>Total: $${(quote.total / 100).toFixed(2)}</strong></p>
          ${quote.depositRequired ? `<p style="color: #059669;"><strong>Deposit Required:</strong> $${(quote.depositAmount / 100).toFixed(2)}</p>` : ''}
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${quoteTokenService.generateSecureQuoteUrl(quote.id, getPublicUrl())}" 
             style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 10px;">
            🚢 View Full Quote & Book
          </a>
        </div>
        
        ${personalMessage ? `<p style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;"><strong>Personal Message:</strong><br>${personalMessage}</p>` : ''}
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>🎉 Ready to book?</strong> Click the link above to secure your date with a deposit, or reply to this email with any questions!</p>
        </div>
        
        <p><strong>Questions?</strong> Reply to this email or call us at <strong>(512) 488-5892</strong>!</p>
        
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
  
  // Use Mailgun service (which is configured with valid credentials)
  return await mailgunService.send({
    to: email,
    from: process.env.MAILGUN_FROM || 'clientservices@premierpartycruises.com',
    subject: '🚢 Your Party Cruise Quote is Ready!',
    html
  });
}

async function sendQuoteSMS(quoteId: string, phone: string) {
  const quote = await storage.getQuote(quoteId);
  if (!quote) throw new Error("Quote not found");
  
  const project = await storage.getProject(quote.projectId);
  const contact = project ? await storage.getContact(project.contactId) : null;
  
  // Get event details for more informative SMS
  const eventDate = project?.projectDate ? (typeof project.projectDate === 'string' ? new Date(project.projectDate) : project.projectDate) : null;
  const formattedDate = eventDate ? eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD';
  const cruiseType = 'private'; // Default to private cruise
  const eventType = project?.eventType || 'event';
  
  // Generate secure tokenized URL
  const secureQuoteUrl = quoteTokenService.generateSecureQuoteUrl(quote.id, getPublicUrl());
  
  const message = `Hi ${contact?.name || 'there'}! 🚢 Your ${eventType} cruise quote (${formattedDate}) is ready: $${(quote.total / 100).toFixed(2)}. View & book: ${secureQuoteUrl}`;
  
  return await goHighLevelService.send({
    to: phone,
    body: message
  });
}

async function sendAdminNotificationSMS(quoteId: string) {
  const adminPhone = process.env.ADMIN_PHONE_NUMBER;
  if (!adminPhone) {
    console.log('ADMIN_PHONE_NUMBER not configured. Skipping admin SMS notification.');
    return true;
  }

  const quote = await storage.getQuote(quoteId);
  if (!quote) throw new Error("Quote not found");
  
  const project = await storage.getProject(quote.projectId);
  const contact = project ? await storage.getContact(project.contactId) : null;
  
  const eventDate = project?.projectDate ? (typeof project.projectDate === 'string' ? new Date(project.projectDate) : project.projectDate) : null;
  const formattedDate = eventDate ? eventDate.toLocaleDateString() : 'TBD';
  const eventType = project?.eventType || 'Party Cruise';
  
  // Generate secure tokenized URL for admin
  const adminSecureQuoteUrl = quoteTokenService.generateSecureQuoteUrl(quote.id, getPublicUrl());
  
  const message = `🚢 NEW BOOKING REQUEST!\n\nCustomer: ${contact?.name || 'Unknown'}\nEvent: ${eventType}\nDate: ${formattedDate}\nGroup Size: ${project?.groupSize || 'TBD'}\nTotal: $${(quote.total / 100).toFixed(2)}\n\nView quote: ${adminSecureQuoteUrl}`;
  
  return await goHighLevelService.send({
    to: adminPhone,
    body: message
  });
}

// Helper function to parse time strings like "12pm", "11am" into 24-hour format
function parseTimeString(timeStr: string): number {
  const cleanTime = timeStr.toLowerCase().trim();
  const isAM = cleanTime.includes('am');
  const isPM = cleanTime.includes('pm');
  
  // Extract the number part
  const numberPart = cleanTime.replace(/[ap]m/g, '');
  let hour = parseInt(numberPart);
  
  // Convert to 24-hour format
  if (isPM && hour !== 12) {
    hour += 12;
  } else if (isAM && hour === 12) {
    hour = 0;
  }
  
  return hour;
}

// Note: parseTimeToDate is now imported from shared/timeSlots.ts for consistency

// Note: getTimeSlotById is now imported from shared/timeSlots.ts for consistency
  

import fs from 'fs';

console.log('🔧 Rebuilding routes.ts with only preserved systems...\n');

// Since the file is currently corrupted from previous edits,
// let's rebuild it properly by reading the original structure

// First, let's create a minimal working routes.ts with only the routes we need to keep
const cleanRoutes = `import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";

// Lazy loading imports
let storage: any = null;
let mediaLibraryService: any = null;
let ObjectStorageService: any = null;
let ObjectNotFoundError: any = null;
let ObjectPermission: any = null;
let agenticAIService: any = null;
let toolExecutor: any = null;
let openaiService: any = null;

import { insertAdminChatSessionSchema, insertAdminChatMessageSchema, insertProductSchema, insertAffiliateSchema, insertBlogPostSchema, insertBlogAuthorSchema, insertBlogCategorySchema, insertBlogTagSchema, insertSeoPageSchema, insertContentBlockSchema } from "@shared/schema";
import { z } from "zod";
import { randomUUID } from "crypto";
import multer from 'multer';
import slugify from 'slugify';
import sanitizeHtml from 'sanitize-html';
import TurndownService from 'turndown';
import { format } from "date-fns";
import { XMLParser } from 'fast-xml-parser';
import { getFullUrl, getPublicUrl } from "./utils";
import { insertMediaSchema, insertAgentTaskSchema, insertAgentToolSchema, insertAgentExecutionSchema } from "@shared/schema";

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
    slug = \`\${baseSlug}-\${counter}\`;
    counter++;
    
    if (counter > 1000) {
      throw new Error('Unable to generate unique slug after 1000 attempts');
    }
  }
  
  return slug;
}

function isSlugConflictError(error: any): boolean {
  return error?.code === '23505' ||
         error?.message?.includes('duplicate key value') ||
         error?.message?.includes('unique constraint');
}

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

const getMediaLibraryService = async () => {
  if (!mediaLibraryService) {
    try {
      const { mediaLibraryService: service } = await import('./services/mediaLibrary');
      mediaLibraryService = service;
    } catch (error) {
      console.error('Failed to initialize Media Library service:', error);
      return { getMediaLibrary: async () => [], uploadMedia: async () => ({ success: false }) };
    }
  }
  return mediaLibraryService;
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

const getAgenticAIService = async () => {
  if (!agenticAIService) {
    try {
      const { agenticAIService: service } = await import('./services/agenticAI');
      agenticAIService = service;
      
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

    const systemPrompt = \`You are an expert AI assistant for Premier Party Cruises admin dashboard. You help with coding operations, database queries, SEO optimization, and system configuration.\`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-10),
      { role: "user", content }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      max_completion_tokens: 2048,
    });

    const aiContent = response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    
    const hasCodeBlock = aiContent.includes('\`\`\`');
    const codeLanguageMatch = aiContent.match(/\`\`\`(\\w+)/);
    
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

export async function registerRoutes(app: Express): Promise<Server> {
  
  // NOTE: This is a minimal rebuild. We need to extract the preserved routes
  // from the original file and add them here. The routes to keep are:
  // - /api/content-blocks/*
  // - /api/seo/*  
  // - /api/media/*
  // - /api/admin/ai-assistant/* (AI Assistant/admin chat)
  // - /api/boats/*
  // - /api/products/*
  // - /api/pricing/*
  // - /api/affiliates/*
  // - /api/blogs/*
  // - Root routes (/, /health, etc.)
  
  console.log('⚠️ Routes file rebuilt with minimal structure');
  console.log('📝 TODO: Extract and add back the preserved routes from backup');

  const httpServer = createServer(app);
  return httpServer;
}
`;

console.log('✍️  Writing minimal routes.ts structure...');
fs.writeFileSync('server/routes-minimal.ts', cleanRoutes);
console.log('✅ Created server/routes-minimal.ts');
console.log('');
console.log('⚠️  WARNING: This is a minimal structure!');
console.log('📋 Next steps:');
console.log('  1. Review the corrupted routes.ts');
console.log('  2. Extract the preserved route handlers from it');
console.log('  3. Add them to this minimal structure');
console.log('  4. Test thoroughly before replacing');

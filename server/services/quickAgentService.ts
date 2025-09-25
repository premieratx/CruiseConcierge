import OpenAI from "openai";
import { storage } from "../storage";
import { InsertAgentChatMessage, InsertAgentChatSession } from "@shared/schema";

export interface AgentTool {
  name: string;
  description: string;
  schema: any;
  handler: (args: any) => Promise<any>;
}

export class QuickAgentService {
  private openai: OpenAI | null = null;
  private tools: Map<string, AgentTool> = new Map();

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    this.setupBasicTools();
  }

  private setupBasicTools() {
    // Blog Management Tool
    this.tools.set("blog_create_post", {
      name: "blog_create_post",
      description: "Create or update a blog post with SEO optimization",
      schema: {
        type: "object",
        properties: {
          title: { type: "string", description: "Blog post title" },
          content: { type: "string", description: "Blog post content in HTML" },
          excerpt: { type: "string", description: "Short excerpt" },
          status: { type: "string", enum: ["draft", "published"], description: "Publication status" }
        },
        required: ["title", "content"]
      },
      handler: async (args) => {
        try {
          const slug = args.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const post = await storage.createBlogPost({
            slug,
            title: args.title,
            content: args.content,
            excerpt: args.excerpt || "",
            status: args.status || "draft",
            authorId: "admin",
            metaTitle: args.title,
            metaDescription: args.excerpt || args.title
          });
          return { success: true, data: post, message: `Blog post "${args.title}" created successfully` };
        } catch (error: any) {
          return { success: false, error: error.message };
        }
      }
    });

    // SECURITY: File reading tool removed due to security vulnerability
    // Previously allowed reading any file on server - potential data exfiltration risk
    // If file reading is needed in the future, implement with strict allowlisting

    // Database Query Tool
    this.tools.set("database_query", {
      name: "database_query",
      description: "Execute a safe database query",
      schema: {
        type: "object", 
        properties: {
          operation: { type: "string", enum: ["get_blog_posts", "get_bookings", "get_contacts"], description: "Type of query" },
          limit: { type: "number", description: "Limit results", default: 10 }
        },
        required: ["operation"]
      },
      handler: async (args) => {
        try {
          let data;
          switch (args.operation) {
            case "get_blog_posts":
              data = await storage.getBlogPosts(args.limit || 10);
              break;
            case "get_bookings":
              data = await storage.getProjects();
              break;
            case "get_contacts":
              data = await storage.getContacts();
              break;
            default:
              throw new Error("Invalid operation");
          }
          return { success: true, data, message: `Query executed successfully: ${args.operation}` };
        } catch (error: any) {
          return { success: false, error: error.message };
        }
      }
    });

    // SEO Analysis Tool
    this.tools.set("seo_analyze", {
      name: "seo_analyze",
      description: "Analyze a page for SEO issues and suggestions",
      schema: {
        type: "object",
        properties: {
          url: { type: "string", description: "URL or page route to analyze" },
          content: { type: "string", description: "Page content to analyze" }
        },
        required: ["url"]
      },
      handler: async (args) => {
        try {
          const analysis = await storage.analyzePage(args.url, args.content);
          return { success: true, data: analysis, message: `SEO analysis completed for ${args.url}` };
        } catch (error: any) {
          return { success: false, error: error.message };
        }
      }
    });
  }

  async createChatSession(userId: string, title: string): Promise<string> {
    const sessionData: InsertAgentChatSession = {
      userId,
      title,
      status: "active"
    };
    const result = await storage.createChatSession(sessionData);
    return result.sessionId;
  }

  async processMessage(sessionId: string, message: string): Promise<{
    content: string;
    toolCalls?: Array<{ name: string; result: any }>;
  }> {
    if (!this.openai) {
      return { content: "OpenAI API key not configured. This is a mock response for testing." };
    }

    try {
      // Add user message to database
      await storage.addChatMessage({
        sessionId,
        role: "user", 
        content: message,
        metadata: {}
      });

      // Get chat history
      const messages = await storage.getChatMessages(sessionId);
      
      // Build conversation context
      const conversationMessages = messages.map(msg => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content
      }));

      // Add system prompt
      const systemPrompt = `You are an AI assistant for Premier Party Cruises website administration. You can help with:
- Creating and managing blog posts
- Analyzing website SEO
- Querying database information
- Reading and analyzing files

Use the available tools to complete tasks. Be helpful and professional.`;

      const openaiMessages = [
        { role: "system" as const, content: systemPrompt },
        ...conversationMessages,
        { role: "user" as const, content: message }
      ];

      // Get available tools
      const toolSchemas = Array.from(this.tools.values()).map(tool => ({
        type: "function" as const,
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.schema
        }
      }));

      // Call OpenAI with function calling
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: openaiMessages,
        tools: toolSchemas,
        tool_choice: "auto"
      });

      const assistantMessage = completion.choices[0].message;
      let responseContent = assistantMessage.content || "";
      const toolCalls: Array<{ name: string; result: any }> = [];

      // Handle tool calls
      if (assistantMessage.tool_calls) {
        for (const toolCall of assistantMessage.tool_calls) {
          const toolName = toolCall.function.name;
          const toolArgs = JSON.parse(toolCall.function.arguments);
          
          const tool = this.tools.get(toolName);
          if (tool) {
            const result = await tool.handler(toolArgs);
            toolCalls.push({ name: toolName, result });
            
            // Add function result context for follow-up
            if (result.success) {
              responseContent += `\n\n✅ ${result.message}`;
            } else {
              responseContent += `\n\n❌ Error: ${result.error}`;
            }
          }
        }
      }

      // Add assistant response to database
      await storage.addChatMessage({
        sessionId,
        role: "assistant",
        content: responseContent,
        functionCall: assistantMessage.tool_calls?.[0] ? {
          name: assistantMessage.tool_calls[0].function.name,
          arguments: assistantMessage.tool_calls[0].function.arguments
        } : undefined,
        toolResult: toolCalls.length > 0 ? {
          success: toolCalls.every(tc => tc.result.success),
          data: toolCalls.map(tc => tc.result.data)
        } : undefined,
        metadata: {}
      });

      return { content: responseContent, toolCalls };

    } catch (error: any) {
      console.error("Agent service error:", error);
      return { content: `Sorry, I encountered an error: ${error.message}` };
    }
  }

  async getChatHistory(sessionId: string) {
    return await storage.getChatMessages(sessionId);
  }

  async getUserSessions(userId: string) {
    return await storage.getChatSessionsForUser(userId);
  }
}

export const quickAgentService = new QuickAgentService();
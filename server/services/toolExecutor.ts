/**
 * Tool Execution Engine
 * Handles safe execution of agent tools with validation, error handling, and rate limiting
 */

import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { getToolByName, type AgentToolDefinition } from './agentTools';

interface ExecutionContext {
  agentId: string;
  taskId: string;
  environment: string;
  timestamp: Date;
  userPermissions?: string[];
}

interface ExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
  executionTime: number;
  warnings?: string[];
}

interface RateLimit {
  calls: number;
  windowStart: number;
  windowSize: number; // in milliseconds
}

export class ToolExecutor {
  private rateLimits: Map<string, RateLimit> = new Map();
  private storage: any = null;
  private mediaService: any = null;
  private blogService: any = null;
  private seoService: any = null;
  private systemService: any = null;
  private environment: string;

  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
  }

  /**
   * Set service dependencies
   */
  setServices(services: {
    storage?: any;
    mediaService?: any;
    blogService?: any;
    seoService?: any;
    systemService?: any;
  }): void {
    Object.assign(this, services);
  }

  /**
   * Execute a tool with safety checks and validation
   */
  async execute(
    toolName: string, 
    args: any, 
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    const startTime = Date.now();

    try {
      // 1. Validate tool exists
      const toolDef = getToolByName(toolName);
      if (!toolDef) {
        return {
          success: false,
          error: `Tool '${toolName}' not found`,
          executionTime: Date.now() - startTime
        };
      }

      // 2. Environment check
      const envCheck = this.checkEnvironment(toolDef, context.environment);
      if (!envCheck.allowed) {
        return {
          success: false,
          error: envCheck.reason,
          executionTime: Date.now() - startTime
        };
      }

      // 3. Rate limiting check
      const rateCheck = this.checkRateLimit(toolName, toolDef);
      if (!rateCheck.allowed) {
        return {
          success: false,
          error: rateCheck.reason,
          executionTime: Date.now() - startTime
        };
      }

      // 4. Input validation
      const validationResult = this.validateInput(toolDef, args);
      if (!validationResult.valid) {
        return {
          success: false,
          error: `Input validation failed: ${validationResult.errors.join(', ')}`,
          executionTime: Date.now() - startTime
        };
      }

      // 5. Safety checks for dangerous operations
      const safetyCheck = await this.checkSafety(toolDef, args, context);
      if (!safetyCheck.safe) {
        return {
          success: false,
          error: safetyCheck.reason,
          executionTime: Date.now() - startTime,
          warnings: safetyCheck.warnings
        };
      }

      // 6. Execute the tool
      console.log(`🔧 Executing tool: ${toolName} (${toolDef.category})`);
      const result = await this.executeToolLogic(toolDef, args, context);

      // 7. Update rate limits
      this.updateRateLimit(toolName);

      return {
        ...result,
        executionTime: Date.now() - startTime
      };

    } catch (error: any) {
      console.error(`❌ Tool execution error for ${toolName}:`, error);
      return {
        success: false,
        error: `Execution failed: ${error.message}`,
        executionTime: Date.now() - startTime
      };
    }
  }

  /**
   * Check if tool is allowed in current environment
   */
  private checkEnvironment(toolDef: AgentToolDefinition, environment: string): {
    allowed: boolean;
    reason?: string;
  } {
    const allowedEnvs = toolDef.implementation.allowedEnvironments;
    if (allowedEnvs && !allowedEnvs.includes(environment)) {
      return {
        allowed: false,
        reason: `Tool '${toolDef.name}' not allowed in ${environment} environment`
      };
    }
    return { allowed: true };
  }

  /**
   * Check rate limiting
   */
  private checkRateLimit(toolName: string, toolDef: AgentToolDefinition): {
    allowed: boolean;
    reason?: string;
  } {
    const rateLimit = toolDef.implementation.rateLimit;
    if (!rateLimit) return { allowed: true };

    const now = Date.now();
    const windowSize = 60 * 1000; // 1 minute window
    const key = `${toolName}:${this.environment}`;
    
    let limit = this.rateLimits.get(key);
    if (!limit) {
      limit = { calls: 0, windowStart: now, windowSize };
      this.rateLimits.set(key, limit);
    }

    // Reset window if needed
    if (now - limit.windowStart > limit.windowSize) {
      limit.calls = 0;
      limit.windowStart = now;
    }

    if (limit.calls >= rateLimit) {
      return {
        allowed: false,
        reason: `Rate limit exceeded for tool '${toolName}' (${rateLimit} calls per minute)`
      };
    }

    return { allowed: true };
  }

  /**
   * Update rate limit counter
   */
  private updateRateLimit(toolName: string): void {
    const key = `${toolName}:${this.environment}`;
    const limit = this.rateLimits.get(key);
    if (limit) {
      limit.calls++;
    }
  }

  /**
   * Validate tool input parameters
   */
  private validateInput(toolDef: AgentToolDefinition, args: any): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const schema = toolDef.functionSchema.parameters;

    // Check required parameters
    if (schema.required) {
      for (const requiredParam of schema.required) {
        if (!(requiredParam in args)) {
          errors.push(`Missing required parameter: ${requiredParam}`);
        }
      }
    }

    // Basic type checking (simplified)
    for (const [paramName, paramSchema] of Object.entries(schema.properties)) {
      if (paramName in args) {
        const value = args[paramName];
        const expectedType = (paramSchema as any).type;
        
        if (expectedType === 'string' && typeof value !== 'string') {
          errors.push(`Parameter '${paramName}' must be a string`);
        } else if (expectedType === 'number' && typeof value !== 'number') {
          errors.push(`Parameter '${paramName}' must be a number`);
        } else if (expectedType === 'boolean' && typeof value !== 'boolean') {
          errors.push(`Parameter '${paramName}' must be a boolean`);
        } else if (expectedType === 'array' && !Array.isArray(value)) {
          errors.push(`Parameter '${paramName}' must be an array`);
        } else if (expectedType === 'object' && (typeof value !== 'object' || Array.isArray(value))) {
          errors.push(`Parameter '${paramName}' must be an object`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Perform safety checks for dangerous operations
   */
  private async checkSafety(
    toolDef: AgentToolDefinition, 
    args: any, 
    context: ExecutionContext
  ): Promise<{
    safe: boolean;
    reason?: string;
    warnings?: string[];
  }> {
    const warnings: string[] = [];

    // Check danger level
    if (toolDef.implementation.dangerLevel === 'dangerous') {
      if (this.environment === 'production') {
        return {
          safe: false,
          reason: `Dangerous tool '${toolDef.name}' not allowed in production`
        };
      }
      warnings.push(`Executing dangerous operation: ${toolDef.name}`);
    }

    // Specific safety checks for different tools
    switch (toolDef.name) {
      case 'database_delete':
        if (args.where && Object.keys(args.where).length === 0) {
          return {
            safe: false,
            reason: 'Cannot delete all records - WHERE clause is empty'
          };
        }
        break;

      case 'file_write':
        if (args.filePath) {
          // Prevent writing to system directories
          const safePaths = ['/', '/etc', '/usr', '/bin', '/sys', '/proc'];
          if (safePaths.some(safePath => args.filePath.startsWith(safePath))) {
            return {
              safe: false,
              reason: `Cannot write to system directory: ${args.filePath}`
            };
          }
        }
        break;

      case 'api_endpoint_create':
      case 'api_endpoint_modify':
        // Only allow in development
        if (this.environment !== 'development') {
          return {
            safe: false,
            reason: 'API modification only allowed in development environment'
          };
        }
        break;
    }

    return { safe: true, warnings };
  }

  /**
   * Execute the actual tool logic
   */
  private async executeToolLogic(
    toolDef: AgentToolDefinition,
    args: any,
    context: ExecutionContext
  ): Promise<Omit<ExecutionResult, 'executionTime'>> {
    try {
      // Route to appropriate handler based on category
      switch (toolDef.category) {
        case 'database':
          return await this.executeDatabaseTool(toolDef.name, args);
        
        case 'filesystem':
          return await this.executeFilesystemTool(toolDef.name, args);
        
        case 'api':
          return await this.executeApiTool(toolDef.name, args);
        
        case 'seo':
          return await this.executeSeoTool(toolDef.name, args);
        
        case 'media':
          return await this.executeMediaTool(toolDef.name, args);
        
        case 'blog':
          return await this.executeBlogTool(toolDef.name, args);
        
        case 'analytics':
          return await this.executeAnalyticsTool(toolDef.name, args);
        
        case 'system':
          return await this.executeSystemTool(toolDef.name, args);
        
        default:
          return {
            success: false,
            error: `Unsupported tool category: ${toolDef.category}`
          };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * DATABASE TOOLS EXECUTION
   */
  private async executeDatabaseTool(toolName: string, args: any): Promise<Omit<ExecutionResult, 'executionTime'>> {
    if (!this.storage) {
      return { success: false, error: 'Database storage not available' };
    }

    switch (toolName) {
      case 'database_query':
        try {
          const result = await this.storage.executeQuery(args.query, args.params);
          return { success: true, data: result };
        } catch (error: any) {
          return { success: false, error: error.message };
        }

      case 'database_insert':
        try {
          const result = await this.storage.insertRecord(args.table, args.data);
          return { success: true, data: result };
        } catch (error: any) {
          return { success: false, error: error.message };
        }

      case 'database_update':
        try {
          const result = await this.storage.updateRecord(args.table, args.data, args.where);
          return { success: true, data: result };
        } catch (error: any) {
          return { success: false, error: error.message };
        }

      case 'database_delete':
        try {
          const result = await this.storage.deleteRecord(args.table, args.where);
          return { success: true, data: result };
        } catch (error: any) {
          return { success: false, error: error.message };
        }

      case 'database_analytics':
        try {
          const result = await this.generateDatabaseAnalytics(args);
          return { success: true, data: result };
        } catch (error: any) {
          return { success: false, error: error.message };
        }

      default:
        return { success: false, error: `Unknown database tool: ${toolName}` };
    }
  }

  /**
   * FILESYSTEM TOOLS EXECUTION
   */
  private async executeFilesystemTool(toolName: string, args: any): Promise<Omit<ExecutionResult, 'executionTime'>> {
    switch (toolName) {
      case 'file_read':
        // SECURITY: File reading tool disabled due to security vulnerability
        // Previously allowed reading any file on server - potential data exfiltration risk
        return { success: false, error: "File reading tool disabled for security" };

      case 'file_write':
        try {
          if (args.createDirs) {
            await fs.mkdir(path.dirname(args.filePath), { recursive: true });
          }
          await fs.writeFile(args.filePath, args.content, args.encoding || 'utf8');
          return { success: true, data: { filePath: args.filePath, bytesWritten: args.content.length } };
        } catch (error: any) {
          return { success: false, error: error.message };
        }

      case 'file_list':
        try {
          const entries = await this.listFiles(args.directoryPath, args.recursive, args.fileType);
          return { success: true, data: entries };
        } catch (error: any) {
          return { success: false, error: error.message };
        }

      case 'file_search':
        try {
          const results = await this.searchFiles(args.searchPath, args.pattern, args.searchType, args.maxResults);
          return { success: true, data: results };
        } catch (error: any) {
          return { success: false, error: error.message };
        }

      default:
        return { success: false, error: `Unknown filesystem tool: ${toolName}` };
    }
  }

  /**
   * API TOOLS EXECUTION (Mock for safety)
   */
  private async executeApiTool(toolName: string, args: any): Promise<Omit<ExecutionResult, 'executionTime'>> {
    // API modification tools are restricted and mostly return mock responses for safety
    switch (toolName) {
      case 'api_endpoint_create':
      case 'api_endpoint_modify':
        return {
          success: false,
          error: 'API modification tools are disabled for safety. Use manual code changes instead.'
        };

      case 'api_test':
        try {
          // Simple API testing (could use fetch in real implementation)
          return {
            success: true,
            data: {
              method: args.method,
              url: args.url,
              mockResponse: 'API test tool - would perform actual HTTP request in full implementation'
            }
          };
        } catch (error: any) {
          return { success: false, error: error.message };
        }

      default:
        return { success: false, error: `Unknown API tool: ${toolName}` };
    }
  }

  /**
   * SEO TOOLS EXECUTION (Mock implementations)
   */
  private async executeSeoTool(toolName: string, args: any): Promise<Omit<ExecutionResult, 'executionTime'>> {
    switch (toolName) {
      case 'seo_analyze_page':
        return {
          success: true,
          data: {
            url: args.url,
            analysis: 'Mock SEO analysis - would use real SEO tools in full implementation',
            score: 85,
            suggestions: ['Optimize meta description', 'Add more internal links', 'Improve page load speed']
          }
        };

      case 'seo_generate_meta':
        return {
          success: true,
          data: {
            title: `Optimized title for ${args.pageType} page`,
            description: 'Generated meta description optimized for SEO',
            keywords: args.keywords || ['default', 'keywords']
          }
        };

      case 'seo_keyword_research':
        return {
          success: true,
          data: {
            seedKeywords: args.seedKeywords,
            suggestions: args.seedKeywords.map((keyword: string) => ({
              keyword: `${keyword} related`,
              searchVolume: Math.floor(Math.random() * 10000),
              difficulty: Math.floor(Math.random() * 100)
            }))
          }
        };

      default:
        return { success: false, error: `Unknown SEO tool: ${toolName}` };
    }
  }

  /**
   * MEDIA TOOLS EXECUTION (Mock implementations)
   */
  private async executeMediaTool(toolName: string, args: any): Promise<Omit<ExecutionResult, 'executionTime'>> {
    switch (toolName) {
      case 'media_upload':
        return {
          success: true,
          data: {
            id: randomUUID(),
            filename: args.filename,
            url: `/media/${args.filename}`,
            message: 'Mock media upload - would handle actual file upload in full implementation'
          }
        };

      case 'media_search':
        return {
          success: true,
          data: {
            query: args.query,
            results: [
              { id: '1', filename: 'sample1.jpg', url: '/media/sample1.jpg' },
              { id: '2', filename: 'sample2.jpg', url: '/media/sample2.jpg' }
            ],
            message: 'Mock media search - would search actual media library in full implementation'
          }
        };

      case 'media_optimize':
        return {
          success: true,
          data: {
            mediaId: args.mediaId,
            optimizations: args.optimizations,
            message: 'Mock media optimization - would optimize actual media files in full implementation'
          }
        };

      default:
        return { success: false, error: `Unknown media tool: ${toolName}` };
    }
  }

  /**
   * BLOG TOOLS EXECUTION (Mock implementations)
   */
  private async executeBlogTool(toolName: string, args: any): Promise<Omit<ExecutionResult, 'executionTime'>> {
    switch (toolName) {
      case 'blog_create_post':
        return {
          success: true,
          data: {
            id: randomUUID(),
            title: args.title,
            status: args.status || 'draft',
            message: 'Mock blog post creation - would create actual blog post in full implementation'
          }
        };

      case 'blog_update_post':
        return {
          success: true,
          data: {
            postId: args.postId,
            updates: args.updates,
            message: 'Mock blog post update - would update actual blog post in full implementation'
          }
        };

      case 'blog_generate_content':
        return {
          success: true,
          data: {
            topic: args.topic,
            content: `Generated blog content about ${args.topic}. This is a mock implementation - would use AI content generation in full implementation.`,
            wordCount: args.wordCount || 800
          }
        };

      default:
        return { success: false, error: `Unknown blog tool: ${toolName}` };
    }
  }

  /**
   * ANALYTICS TOOLS EXECUTION
   */
  private async executeAnalyticsTool(toolName: string, args: any): Promise<Omit<ExecutionResult, 'executionTime'>> {
    return {
      success: true,
      data: {
        reportType: args.reportType,
        dateRange: args.dateRange,
        mockData: 'Analytics tool - would generate actual analytics in full implementation'
      }
    };
  }

  /**
   * SYSTEM TOOLS EXECUTION (Mock implementations)
   */
  private async executeSystemTool(toolName: string, args: any): Promise<Omit<ExecutionResult, 'executionTime'>> {
    switch (toolName) {
      case 'system_monitor':
        return {
          success: true,
          data: {
            metrics: args.metrics || ['cpu', 'memory'],
            values: {
              cpu: Math.floor(Math.random() * 100),
              memory: Math.floor(Math.random() * 100),
              disk: Math.floor(Math.random() * 100)
            },
            message: 'Mock system monitoring - would provide real metrics in full implementation'
          }
        };

      case 'system_logs':
        return {
          success: true,
          data: {
            logType: args.logType,
            entries: [
              { timestamp: new Date().toISOString(), level: 'info', message: 'Sample log entry 1' },
              { timestamp: new Date().toISOString(), level: 'warn', message: 'Sample log entry 2' }
            ],
            message: 'Mock log retrieval - would fetch actual logs in full implementation'
          }
        };

      case 'system_backup':
        return {
          success: true,
          data: {
            backupType: args.backupType,
            backupId: randomUUID(),
            message: 'Mock backup creation - would create actual backup in full implementation'
          }
        };

      default:
        return { success: false, error: `Unknown system tool: ${toolName}` };
    }
  }

  /**
   * Helper: List files in directory
   */
  private async listFiles(directoryPath: string, recursive: boolean = false, fileType: string = 'all'): Promise<any[]> {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    let results: any[] = [];

    for (const entry of entries) {
      const fullPath = path.join(directoryPath, entry.name);
      
      if (entry.isDirectory()) {
        if (fileType === 'all' || fileType === 'directories') {
          results.push({ name: entry.name, type: 'directory', path: fullPath });
        }
        if (recursive) {
          const subEntries = await this.listFiles(fullPath, true, fileType);
          results = results.concat(subEntries);
        }
      } else if (fileType === 'all' || fileType === 'files') {
        results.push({ name: entry.name, type: 'file', path: fullPath });
      }
    }

    return results;
  }

  /**
   * Helper: Search files
   */
  private async searchFiles(searchPath: string, pattern: string, searchType: string = 'filename', maxResults: number = 100): Promise<any[]> {
    // Simple implementation - would use more sophisticated search in production
    const allFiles = await this.listFiles(searchPath, true, 'files');
    const results = allFiles.filter(file => {
      if (searchType === 'filename' || searchType === 'both') {
        return file.name.toLowerCase().includes(pattern.toLowerCase());
      }
      return false; // Content search would require reading files
    });

    return results.slice(0, maxResults);
  }

  /**
   * Helper: Generate database analytics
   */
  private async generateDatabaseAnalytics(args: any): Promise<any> {
    // Mock analytics - would query actual database in production
    return {
      reportType: args.reportType,
      dateRange: args.dateRange,
      data: {
        totalRecords: Math.floor(Math.random() * 10000),
        avgPerDay: Math.floor(Math.random() * 100),
        trends: 'Mock trend analysis'
      }
    };
  }

  /**
   * Get execution statistics
   */
  getExecutionStats(): {
    totalExecutions: number;
    rateLimits: Array<{ tool: string; calls: number; windowStart: number }>;
  } {
    return {
      totalExecutions: Array.from(this.rateLimits.values()).reduce((sum, limit) => sum + limit.calls, 0),
      rateLimits: Array.from(this.rateLimits.entries()).map(([key, limit]) => ({
        tool: key,
        calls: limit.calls,
        windowStart: limit.windowStart
      }))
    };
  }
}

// Export singleton instance
export const toolExecutor = new ToolExecutor();
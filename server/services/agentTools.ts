/**
 * Comprehensive tool definitions for the Agentic AI system
 * These tools are used by AI agents to perform various backend operations
 */

export interface AgentToolDefinition {
  name: string;
  description: string;
  category: 'database' | 'filesystem' | 'api' | 'seo' | 'media' | 'blog' | 'analytics' | 'system';
  functionSchema: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, any>;
      required?: string[];
    };
  };
  implementation: {
    handlerFunction: string;
    module: string;
    requiresAuth?: boolean;
    rateLimit?: number;
    dangerLevel: 'safe' | 'moderate' | 'dangerous';
    allowedEnvironments?: string[];
  };
}

/**
 * DATABASE OPERATIONS TOOLS
 */
export const databaseTools: AgentToolDefinition[] = [
  {
    name: 'database_query',
    description: 'Execute SQL queries against the PostgreSQL database',
    category: 'database',
    functionSchema: {
      name: 'database_query',
      description: 'Execute a read-only SQL query against the database and return results',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The SQL query to execute (SELECT statements only)'
          },
          params: {
            type: 'array',
            description: 'Optional parameters for parameterized queries',
            items: { type: 'string' }
          }
        },
        required: ['query']
      }
    },
    implementation: {
      handlerFunction: 'executeQuery',
      module: 'database',
      requiresAuth: true,
      rateLimit: 60,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'database_insert',
    description: 'Insert data into database tables',
    category: 'database',
    functionSchema: {
      name: 'database_insert',
      description: 'Insert new records into a database table',
      parameters: {
        type: 'object',
        properties: {
          table: {
            type: 'string',
            description: 'The table name to insert into'
          },
          data: {
            type: 'object',
            description: 'The data to insert as key-value pairs'
          }
        },
        required: ['table', 'data']
      }
    },
    implementation: {
      handlerFunction: 'insertRecord',
      module: 'database',
      requiresAuth: true,
      rateLimit: 30,
      dangerLevel: 'moderate',
      allowedEnvironments: ['development', 'staging']
    }
  },
  {
    name: 'database_update',
    description: 'Update existing records in database tables',
    category: 'database',
    functionSchema: {
      name: 'database_update',
      description: 'Update existing records in a database table',
      parameters: {
        type: 'object',
        properties: {
          table: {
            type: 'string',
            description: 'The table name to update'
          },
          data: {
            type: 'object',
            description: 'The updated data as key-value pairs'
          },
          where: {
            type: 'object',
            description: 'WHERE conditions for the update'
          }
        },
        required: ['table', 'data', 'where']
      }
    },
    implementation: {
      handlerFunction: 'updateRecord',
      module: 'database',
      requiresAuth: true,
      rateLimit: 30,
      dangerLevel: 'moderate',
      allowedEnvironments: ['development', 'staging']
    }
  },
  {
    name: 'database_delete',
    description: 'Delete records from database tables',
    category: 'database',
    functionSchema: {
      name: 'database_delete',
      description: 'Delete records from a database table',
      parameters: {
        type: 'object',
        properties: {
          table: {
            type: 'string',
            description: 'The table name to delete from'
          },
          where: {
            type: 'object',
            description: 'WHERE conditions for the deletion'
          }
        },
        required: ['table', 'where']
      }
    },
    implementation: {
      handlerFunction: 'deleteRecord',
      module: 'database',
      requiresAuth: true,
      rateLimit: 10,
      dangerLevel: 'dangerous',
      allowedEnvironments: ['development']
    }
  },
  {
    name: 'database_analytics',
    description: 'Run analytical queries and generate reports',
    category: 'database',
    functionSchema: {
      name: 'database_analytics',
      description: 'Execute analytical queries to generate business intelligence reports',
      parameters: {
        type: 'object',
        properties: {
          reportType: {
            type: 'string',
            enum: ['revenue', 'bookings', 'leads', 'performance', 'custom'],
            description: 'Type of analytics report to generate'
          },
          dateRange: {
            type: 'object',
            properties: {
              start: { type: 'string', format: 'date' },
              end: { type: 'string', format: 'date' }
            },
            description: 'Date range for the analysis'
          },
          filters: {
            type: 'object',
            description: 'Additional filters for the analysis'
          }
        },
        required: ['reportType']
      }
    },
    implementation: {
      handlerFunction: 'generateAnalytics',
      module: 'analytics',
      requiresAuth: true,
      rateLimit: 20,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  }
];

/**
 * FILE SYSTEM OPERATIONS TOOLS
 */
export const filesystemTools: AgentToolDefinition[] = [
  // SECURITY: file_read tool removed due to security vulnerability
  // Previously allowed reading any file on server - potential data exfiltration risk
  // If file reading is needed in the future, implement with strict allowlisting
  {
    name: 'file_write',
    description: 'Write content to a file',
    category: 'filesystem',
    functionSchema: {
      name: 'file_write',
      description: 'Write content to a file in the filesystem',
      parameters: {
        type: 'object',
        properties: {
          filePath: {
            type: 'string',
            description: 'Relative or absolute path to the file'
          },
          content: {
            type: 'string',
            description: 'Content to write to the file'
          },
          encoding: {
            type: 'string',
            enum: ['utf8', 'base64'],
            default: 'utf8',
            description: 'File encoding'
          },
          createDirs: {
            type: 'boolean',
            default: false,
            description: 'Create directories if they don\'t exist'
          }
        },
        required: ['filePath', 'content']
      }
    },
    implementation: {
      handlerFunction: 'writeFile',
      module: 'filesystem',
      requiresAuth: true,
      rateLimit: 30,
      dangerLevel: 'moderate',
      allowedEnvironments: ['development', 'staging']
    }
  },
  {
    name: 'file_list',
    description: 'List files and directories',
    category: 'filesystem',
    functionSchema: {
      name: 'file_list',
      description: 'List files and directories in a given path',
      parameters: {
        type: 'object',
        properties: {
          directoryPath: {
            type: 'string',
            description: 'Path to the directory to list'
          },
          recursive: {
            type: 'boolean',
            default: false,
            description: 'List files recursively'
          },
          fileType: {
            type: 'string',
            enum: ['all', 'files', 'directories'],
            default: 'all',
            description: 'Type of items to list'
          }
        },
        required: ['directoryPath']
      }
    },
    implementation: {
      handlerFunction: 'listFiles',
      module: 'filesystem',
      requiresAuth: true,
      rateLimit: 60,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'file_search',
    description: 'Search for files by name or content',
    category: 'filesystem',
    functionSchema: {
      name: 'file_search',
      description: 'Search for files by name pattern or content',
      parameters: {
        type: 'object',
        properties: {
          searchPath: {
            type: 'string',
            description: 'Path to search in'
          },
          pattern: {
            type: 'string',
            description: 'Search pattern (glob or regex)'
          },
          searchType: {
            type: 'string',
            enum: ['filename', 'content', 'both'],
            default: 'filename',
            description: 'Type of search to perform'
          },
          maxResults: {
            type: 'number',
            default: 100,
            description: 'Maximum number of results to return'
          }
        },
        required: ['searchPath', 'pattern']
      }
    },
    implementation: {
      handlerFunction: 'searchFiles',
      module: 'filesystem',
      requiresAuth: true,
      rateLimit: 30,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  }
];

/**
 * API MANAGEMENT TOOLS
 */
export const apiTools: AgentToolDefinition[] = [
  {
    name: 'api_endpoint_create',
    description: 'Create new API endpoints',
    category: 'api',
    functionSchema: {
      name: 'api_endpoint_create',
      description: 'Create a new API endpoint with specified route and handler',
      parameters: {
        type: 'object',
        properties: {
          method: {
            type: 'string',
            enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            description: 'HTTP method for the endpoint'
          },
          path: {
            type: 'string',
            description: 'API path (e.g., /api/new-endpoint)'
          },
          handler: {
            type: 'string',
            description: 'Handler function code or reference'
          },
          middleware: {
            type: 'array',
            items: { type: 'string' },
            description: 'Middleware functions to apply'
          },
          documentation: {
            type: 'object',
            description: 'API documentation metadata'
          }
        },
        required: ['method', 'path', 'handler']
      }
    },
    implementation: {
      handlerFunction: 'createEndpoint',
      module: 'apiManager',
      requiresAuth: true,
      rateLimit: 10,
      dangerLevel: 'dangerous',
      allowedEnvironments: ['development']
    }
  },
  {
    name: 'api_endpoint_modify',
    description: 'Modify existing API endpoints',
    category: 'api',
    functionSchema: {
      name: 'api_endpoint_modify',
      description: 'Modify an existing API endpoint',
      parameters: {
        type: 'object',
        properties: {
          endpointId: {
            type: 'string',
            description: 'ID or path of the endpoint to modify'
          },
          changes: {
            type: 'object',
            description: 'Changes to apply to the endpoint'
          }
        },
        required: ['endpointId', 'changes']
      }
    },
    implementation: {
      handlerFunction: 'modifyEndpoint',
      module: 'apiManager',
      requiresAuth: true,
      rateLimit: 10,
      dangerLevel: 'dangerous',
      allowedEnvironments: ['development']
    }
  },
  {
    name: 'api_test',
    description: 'Test API endpoints',
    category: 'api',
    functionSchema: {
      name: 'api_test',
      description: 'Test an API endpoint with specified parameters',
      parameters: {
        type: 'object',
        properties: {
          method: {
            type: 'string',
            enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
          },
          url: {
            type: 'string',
            description: 'Full URL or path to test'
          },
          headers: {
            type: 'object',
            description: 'HTTP headers to include'
          },
          body: {
            type: 'object',
            description: 'Request body for POST/PUT requests'
          }
        },
        required: ['method', 'url']
      }
    },
    implementation: {
      handlerFunction: 'testEndpoint',
      module: 'apiManager',
      requiresAuth: true,
      rateLimit: 50,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  }
];

/**
 * SEO OPTIMIZATION TOOLS
 */
export const seoTools: AgentToolDefinition[] = [
  {
    name: 'seo_analyze_page',
    description: 'Analyze page SEO performance',
    category: 'seo',
    functionSchema: {
      name: 'seo_analyze_page',
      description: 'Analyze SEO performance of a specific page',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'URL of the page to analyze'
          },
          checkTypes: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['meta', 'headings', 'images', 'links', 'performance', 'content']
            },
            description: 'Types of SEO checks to perform'
          }
        },
        required: ['url']
      }
    },
    implementation: {
      handlerFunction: 'analyzePage',
      module: 'seoService',
      requiresAuth: true,
      rateLimit: 20,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'seo_generate_meta',
    description: 'Generate SEO meta tags',
    category: 'seo',
    functionSchema: {
      name: 'seo_generate_meta',
      description: 'Generate optimized meta tags for a page',
      parameters: {
        type: 'object',
        properties: {
          pageContent: {
            type: 'string',
            description: 'Content of the page'
          },
          pageType: {
            type: 'string',
            enum: ['home', 'service', 'blog', 'product', 'contact'],
            description: 'Type of page'
          },
          keywords: {
            type: 'array',
            items: { type: 'string' },
            description: 'Target keywords'
          },
          businessInfo: {
            type: 'object',
            description: 'Business information for local SEO'
          }
        },
        required: ['pageContent', 'pageType']
      }
    },
    implementation: {
      handlerFunction: 'generateMeta',
      module: 'seoService',
      requiresAuth: true,
      rateLimit: 30,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'seo_keyword_research',
    description: 'Perform keyword research and analysis',
    category: 'seo',
    functionSchema: {
      name: 'seo_keyword_research',
      description: 'Research keywords and analyze their potential',
      parameters: {
        type: 'object',
        properties: {
          seedKeywords: {
            type: 'array',
            items: { type: 'string' },
            description: 'Initial keywords to research'
          },
          industry: {
            type: 'string',
            description: 'Industry or niche'
          },
          location: {
            type: 'string',
            description: 'Geographic location for local SEO'
          },
          maxResults: {
            type: 'number',
            default: 50,
            description: 'Maximum number of keyword suggestions'
          }
        },
        required: ['seedKeywords']
      }
    },
    implementation: {
      handlerFunction: 'researchKeywords',
      module: 'seoService',
      requiresAuth: true,
      rateLimit: 10,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  }
];

/**
 * MEDIA LIBRARY TOOLS
 */
export const mediaTools: AgentToolDefinition[] = [
  {
    name: 'media_upload',
    description: 'Upload media files to the library',
    category: 'media',
    functionSchema: {
      name: 'media_upload',
      description: 'Upload a media file to the media library',
      parameters: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            description: 'Base64 encoded file content or file path'
          },
          filename: {
            type: 'string',
            description: 'Original filename'
          },
          mimeType: {
            type: 'string',
            description: 'MIME type of the file'
          },
          title: {
            type: 'string',
            description: 'Title for the media item'
          },
          altText: {
            type: 'string',
            description: 'Alt text for images'
          },
          description: {
            type: 'string',
            description: 'Description of the media item'
          }
        },
        required: ['file', 'filename', 'mimeType']
      }
    },
    implementation: {
      handlerFunction: 'uploadMedia',
      module: 'mediaLibrary',
      requiresAuth: true,
      rateLimit: 20,
      dangerLevel: 'moderate',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'media_search',
    description: 'Search media library',
    category: 'media',
    functionSchema: {
      name: 'media_search',
      description: 'Search for media files in the library',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query'
          },
          mediaType: {
            type: 'string',
            enum: ['image', 'video', 'audio', 'document', 'all'],
            default: 'all',
            description: 'Type of media to search for'
          },
          sortBy: {
            type: 'string',
            enum: ['date', 'name', 'size', 'relevance'],
            default: 'date',
            description: 'Sort order for results'
          },
          limit: {
            type: 'number',
            default: 20,
            description: 'Maximum number of results'
          }
        }
      }
    },
    implementation: {
      handlerFunction: 'searchMedia',
      module: 'mediaLibrary',
      requiresAuth: true,
      rateLimit: 50,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'media_optimize',
    description: 'Optimize media files',
    category: 'media',
    functionSchema: {
      name: 'media_optimize',
      description: 'Optimize media files for web performance',
      parameters: {
        type: 'object',
        properties: {
          mediaId: {
            type: 'string',
            description: 'ID of the media item to optimize'
          },
          optimizations: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['compress', 'resize', 'format_convert', 'webp']
            },
            description: 'Types of optimizations to apply'
          },
          targetSize: {
            type: 'object',
            properties: {
              width: { type: 'number' },
              height: { type: 'number' }
            },
            description: 'Target dimensions for resizing'
          },
          quality: {
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 85,
            description: 'Compression quality (1-100)'
          }
        },
        required: ['mediaId', 'optimizations']
      }
    },
    implementation: {
      handlerFunction: 'optimizeMedia',
      module: 'mediaLibrary',
      requiresAuth: true,
      rateLimit: 15,
      dangerLevel: 'moderate',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  }
];

/**
 * BLOG MANAGEMENT TOOLS
 */
export const blogTools: AgentToolDefinition[] = [
  {
    name: 'blog_create_post',
    description: 'Create a new blog post',
    category: 'blog',
    functionSchema: {
      name: 'blog_create_post',
      description: 'Create a new blog post with content and metadata',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Blog post title'
          },
          content: {
            type: 'string',
            description: 'Blog post content (HTML or Markdown)'
          },
          excerpt: {
            type: 'string',
            description: 'Short excerpt or summary'
          },
          categories: {
            type: 'array',
            items: { type: 'string' },
            description: 'Post categories'
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Post tags'
          },
          featuredImage: {
            type: 'string',
            description: 'Featured image URL or media ID'
          },
          publishDate: {
            type: 'string',
            format: 'date-time',
            description: 'Publication date'
          },
          status: {
            type: 'string',
            enum: ['draft', 'published', 'scheduled'],
            default: 'draft'
          }
        },
        required: ['title', 'content']
      }
    },
    implementation: {
      handlerFunction: 'createBlogPost',
      module: 'blogService',
      requiresAuth: true,
      rateLimit: 20,
      dangerLevel: 'moderate',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'blog_update_post',
    description: 'Update an existing blog post',
    category: 'blog',
    functionSchema: {
      name: 'blog_update_post',
      description: 'Update an existing blog post',
      parameters: {
        type: 'object',
        properties: {
          postId: {
            type: 'string',
            description: 'ID of the blog post to update'
          },
          updates: {
            type: 'object',
            description: 'Fields to update'
          }
        },
        required: ['postId', 'updates']
      }
    },
    implementation: {
      handlerFunction: 'updateBlogPost',
      module: 'blogService',
      requiresAuth: true,
      rateLimit: 30,
      dangerLevel: 'moderate',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'blog_generate_content',
    description: 'Generate blog content using AI',
    category: 'blog',
    functionSchema: {
      name: 'blog_generate_content',
      description: 'Generate blog post content using AI based on topic and guidelines',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Main topic for the blog post'
          },
          keywords: {
            type: 'array',
            items: { type: 'string' },
            description: 'Target keywords to include'
          },
          wordCount: {
            type: 'number',
            default: 800,
            description: 'Target word count'
          },
          tone: {
            type: 'string',
            enum: ['professional', 'casual', 'friendly', 'authoritative'],
            default: 'professional'
          },
          audience: {
            type: 'string',
            description: 'Target audience description'
          },
          includeImages: {
            type: 'boolean',
            default: false,
            description: 'Whether to suggest images'
          }
        },
        required: ['topic']
      }
    },
    implementation: {
      handlerFunction: 'generateBlogContent',
      module: 'blogService',
      requiresAuth: true,
      rateLimit: 10,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  }
];

/**
 * SYSTEM ADMINISTRATION TOOLS
 */
export const systemTools: AgentToolDefinition[] = [
  {
    name: 'system_monitor',
    description: 'Monitor system performance and health',
    category: 'system',
    functionSchema: {
      name: 'system_monitor',
      description: 'Check system performance metrics and health status',
      parameters: {
        type: 'object',
        properties: {
          metrics: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['cpu', 'memory', 'disk', 'network', 'database', 'response_time']
            },
            description: 'Metrics to check'
          },
          timeRange: {
            type: 'string',
            enum: ['5m', '15m', '1h', '24h'],
            default: '15m',
            description: 'Time range for metrics'
          }
        }
      }
    },
    implementation: {
      handlerFunction: 'monitorSystem',
      module: 'systemService',
      requiresAuth: true,
      rateLimit: 30,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'system_logs',
    description: 'Access and analyze system logs',
    category: 'system',
    functionSchema: {
      name: 'system_logs',
      description: 'Retrieve and analyze system logs',
      parameters: {
        type: 'object',
        properties: {
          logType: {
            type: 'string',
            enum: ['application', 'error', 'access', 'security', 'database'],
            description: 'Type of logs to retrieve'
          },
          level: {
            type: 'string',
            enum: ['debug', 'info', 'warn', 'error', 'fatal'],
            description: 'Minimum log level'
          },
          timeRange: {
            type: 'string',
            enum: ['1h', '24h', '7d', '30d'],
            default: '24h',
            description: 'Time range for logs'
          },
          maxEntries: {
            type: 'number',
            default: 100,
            description: 'Maximum number of log entries'
          }
        },
        required: ['logType']
      }
    },
    implementation: {
      handlerFunction: 'getLogs',
      module: 'systemService',
      requiresAuth: true,
      rateLimit: 20,
      dangerLevel: 'safe',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  },
  {
    name: 'system_backup',
    description: 'Create system backups',
    category: 'system',
    functionSchema: {
      name: 'system_backup',
      description: 'Create backups of system data and configurations',
      parameters: {
        type: 'object',
        properties: {
          backupType: {
            type: 'string',
            enum: ['database', 'files', 'config', 'full'],
            description: 'Type of backup to create'
          },
          compression: {
            type: 'boolean',
            default: true,
            description: 'Whether to compress the backup'
          },
          encryption: {
            type: 'boolean',
            default: false,
            description: 'Whether to encrypt the backup'
          }
        },
        required: ['backupType']
      }
    },
    implementation: {
      handlerFunction: 'createBackup',
      module: 'systemService',
      requiresAuth: true,
      rateLimit: 5,
      dangerLevel: 'moderate',
      allowedEnvironments: ['development', 'staging', 'production']
    }
  }
];

/**
 * ALL TOOLS REGISTRY
 * Combines all tool categories into a single registry
 */
export const ALL_AGENT_TOOLS: AgentToolDefinition[] = [
  ...databaseTools,
  ...filesystemTools,
  ...apiTools,
  ...seoTools,
  ...mediaTools,
  ...blogTools,
  ...systemTools
];

/**
 * Get tools by category
 */
export function getToolsByCategory(category: string): AgentToolDefinition[] {
  return ALL_AGENT_TOOLS.filter(tool => tool.category === category);
}

/**
 * Get tool by name
 */
export function getToolByName(name: string): AgentToolDefinition | undefined {
  return ALL_AGENT_TOOLS.find(tool => tool.name === name);
}

/**
 * Get OpenAI function schemas for all tools
 */
export function getOpenAIFunctionSchemas(): any[] {
  return ALL_AGENT_TOOLS.map(tool => tool.functionSchema);
}

/**
 * Get enabled tools for a specific environment
 */
export function getEnabledToolsForEnvironment(environment: string): AgentToolDefinition[] {
  return ALL_AGENT_TOOLS.filter(tool => 
    !tool.implementation.allowedEnvironments || 
    tool.implementation.allowedEnvironments.includes(environment)
  );
}
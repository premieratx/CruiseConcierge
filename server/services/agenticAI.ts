/**
 * Core Agentic AI Service
 * Handles GPT-3.5-turbo function calling, task queue management, and multi-agent coordination
 */

import OpenAI from 'openai';
import { randomUUID } from 'crypto';
import { ALL_AGENT_TOOLS, getToolByName, getEnabledToolsForEnvironment, type AgentToolDefinition } from './agentTools';
import type { AgentTask, AgentExecution, InsertAgentTask, InsertAgentExecution } from '@shared/schema';

interface AgentConfig {
  model: 'gpt-3.5-turbo' | 'gpt-4o-mini' | 'gpt-4';
  temperature?: number;
  maxTokens?: number;
  enabledTools?: string[];
  systemPrompt?: string;
  maxRetries?: number;
  timeoutMs?: number;
}

interface TaskResult {
  success: boolean;
  output?: any;
  error?: string;
  executedTools?: string[];
  tokensUsed?: number;
  executionTime?: number;
}

interface AgentInstance {
  id: string;
  status: 'idle' | 'busy' | 'error';
  currentTaskId?: string;
  config: AgentConfig;
  conversationHistory: Array<{role: string; content: string}>;
  createdAt: Date;
  lastActivity: Date;
}

export class AgenticAIService {
  private openai: OpenAI | null = null;
  private agentPool: Map<string, AgentInstance> = new Map();
  private taskQueue: AgentTask[] = [];
  private activeExecutions: Map<string, AgentExecution> = new Map();
  private storage: any = null;
  private toolExecutor: any = null;
  private environment: string;
  private maxConcurrentAgents: number = 3;
  private defaultAgentConfig: AgentConfig = {
    model: 'gpt-3.5-turbo',
    maxTokens: 2048,
    maxRetries: 3,
    timeoutMs: 60000
  };

  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.initializeOpenAI();
  }

  /**
   * Initialize OpenAI client
   */
  private initializeOpenAI(): void {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    } else {
      console.warn('⚠️ OPENAI_API_KEY not set. Agentic AI service will run in mock mode.');
    }
  }

  /**
   * Set storage instance (injected dependency)
   */
  setStorage(storage: any): void {
    this.storage = storage;
  }

  /**
   * Set tool executor (injected dependency)
   */
  setToolExecutor(toolExecutor: any): void {
    this.toolExecutor = toolExecutor;
  }

  /**
   * Create a new agent task
   */
  async createTask(taskData: {
    title: string;
    description?: string;
    instructions: string;
    type?: 'single_action' | 'workflow' | 'continuous';
    category: string;
    priority?: number;
    context?: Record<string, any>;
    agentConfig?: Partial<AgentConfig>;
    createdBy?: string;
  }): Promise<{ taskId: string; status: string }> {
    try {
      if (!this.storage) {
        throw new Error('Storage not initialized');
      }

      const taskId = randomUUID();
      const task: InsertAgentTask = {
        id: taskId,
        title: taskData.title,
        description: taskData.description || '',
        type: taskData.type || 'single_action',
        category: taskData.category,
        priority: taskData.priority || 1,
        status: 'pending',
        taskData: {
          instructions: taskData.instructions,
          context: taskData.context || {},
          retryCount: 0,
          maxRetries: taskData.agentConfig?.maxRetries || this.defaultAgentConfig.maxRetries
        },
        agentConfig: {
          ...this.defaultAgentConfig,
          ...taskData.agentConfig
        },
        createdBy: taskData.createdBy
      };

      // Save task to database
      await this.storage.createAgentTask(task);

      // Add to internal queue
      await this.queueTask(taskId);

      console.log(`🤖 Created agent task: ${taskId} - ${taskData.title}`);
      
      return {
        taskId,
        status: 'queued'
      };
    } catch (error: any) {
      console.error('❌ Error creating agent task:', error);
      throw new Error(`Failed to create task: ${error.message}`);
    }
  }

  /**
   * Queue a task for execution
   */
  private async queueTask(taskId: string): Promise<void> {
    if (!this.storage) return;

    const task = await this.storage.getAgentTask(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    // Update task status to queued
    await this.storage.updateAgentTask(taskId, { status: 'queued' });

    // Add to internal queue (sorted by priority)
    this.taskQueue.push(task);
    this.taskQueue.sort((a, b) => (b.priority || 1) - (a.priority || 1));

    // Try to process the queue
    await this.processQueue();
  }

  /**
   * Process the task queue
   */
  private async processQueue(): Promise<void> {
    if (this.taskQueue.length === 0) return;

    const idleAgents = Array.from(this.agentPool.values()).filter(agent => agent.status === 'idle');
    const availableSlots = this.maxConcurrentAgents - (this.agentPool.size - idleAgents.length);

    if (availableSlots <= 0 && idleAgents.length === 0) {
      return; // All agents busy
    }

    // Get next task
    const nextTask = this.taskQueue.shift();
    if (!nextTask) return;

    try {
      // Find or create agent
      let agent: AgentInstance;
      if (idleAgents.length > 0) {
        agent = idleAgents[0];
      } else if (this.agentPool.size < this.maxConcurrentAgents) {
        agent = await this.createAgent(nextTask.agentConfig);
      } else {
        // Put task back in queue
        this.taskQueue.unshift(nextTask);
        return;
      }

      // Assign task to agent
      await this.assignTaskToAgent(nextTask, agent);
      
    } catch (error) {
      console.error('❌ Error processing queue:', error);
      
      // Mark task as failed
      if (nextTask.id && this.storage) {
        await this.storage.updateAgentTask(nextTask.id, {
          status: 'failed',
          result: {
            success: false,
            error: `Queue processing error: ${error.message}`
          }
        });
      }
    }

    // Continue processing if there are more tasks
    if (this.taskQueue.length > 0) {
      setTimeout(() => this.processQueue(), 1000);
    }
  }

  /**
   * Create a new agent instance
   */
  private async createAgent(config: any = {}): Promise<AgentInstance> {
    const agentId = randomUUID();
    const agent: AgentInstance = {
      id: agentId,
      status: 'idle',
      config: { ...this.defaultAgentConfig, ...config },
      conversationHistory: [],
      createdAt: new Date(),
      lastActivity: new Date()
    };

    this.agentPool.set(agentId, agent);
    console.log(`🤖 Created new agent: ${agentId}`);
    
    return agent;
  }

  /**
   * Assign task to agent and execute
   */
  private async assignTaskToAgent(task: AgentTask, agent: AgentInstance): Promise<void> {
    try {
      agent.status = 'busy';
      agent.currentTaskId = task.id;
      agent.lastActivity = new Date();

      // Update task status
      if (this.storage) {
        await this.storage.updateAgentTask(task.id, {
          status: 'running',
          startedAt: new Date(),
          assignedAgent: agent.id
        });
      }

      console.log(`🔄 Agent ${agent.id} executing task: ${task.title}`);

      // Execute the task
      const result = await this.executeTask(task, agent);

      // Update task with results
      if (this.storage) {
        await this.storage.updateAgentTask(task.id, {
          status: result.success ? 'completed' : 'failed',
          completedAt: new Date(),
          result
        });
      }

      console.log(`✅ Agent ${agent.id} completed task: ${task.title} (${result.success ? 'success' : 'failed'})`);

    } catch (error: any) {
      console.error(`❌ Agent ${agent.id} task execution error:`, error);
      
      if (this.storage) {
        await this.storage.updateAgentTask(task.id, {
          status: 'failed',
          completedAt: new Date(),
          result: {
            success: false,
            error: error.message
          }
        });
      }
    } finally {
      // Reset agent state
      agent.status = 'idle';
      agent.currentTaskId = undefined;
      agent.lastActivity = new Date();
      agent.conversationHistory = [];

      // Continue processing queue
      setTimeout(() => this.processQueue(), 500);
    }
  }

  /**
   * Execute a task using the agent
   */
  private async executeTask(task: AgentTask, agent: AgentInstance): Promise<TaskResult> {
    const startTime = Date.now();

    try {
      if (!this.openai) {
        return await this.mockTaskExecution(task);
      }

      // Get available tools for this environment
      const availableTools = getEnabledToolsForEnvironment(this.environment);
      
      // Filter tools based on agent configuration
      const enabledTools = agent.config.enabledTools 
        ? availableTools.filter(tool => agent.config.enabledTools!.includes(tool.name))
        : availableTools;

      // Build system prompt
      const systemPrompt = this.buildSystemPrompt(task, agent, enabledTools);

      // Initialize conversation
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: task.taskData.instructions }
      ];

      let tokensUsed = 0;
      let executedTools: string[] = [];
      let conversationContext = [...agent.conversationHistory];

      // Execute with function calling
      while (true) {
        const completion = await this.openai.chat.completions.create({
          model: agent.config.model,
          messages: [...messages, ...conversationContext],
          functions: enabledTools.map(tool => tool.functionSchema),
          function_call: 'auto',
          temperature: agent.config.temperature,
          max_tokens: agent.config.maxTokens
        });

        tokensUsed += completion.usage?.total_tokens || 0;
        const assistantMessage = completion.choices[0].message;

        // Add assistant message to context
        conversationContext.push({
          role: 'assistant',
          content: assistantMessage.content || ''
        });

        // Check if function was called
        if (assistantMessage.function_call) {
          const functionName = assistantMessage.function_call.name;
          const functionArgs = JSON.parse(assistantMessage.function_call.arguments || '{}');

          console.log(`🔧 Agent ${agent.id} calling function: ${functionName}`);

          // Execute the tool
          const toolResult = await this.executeTool(task.id!, functionName, functionArgs, agent.id);
          executedTools.push(functionName);

          // Add function result to context
          conversationContext.push({
            role: 'function',
            name: functionName,
            content: JSON.stringify(toolResult)
          });

          // Check if task should continue (simple heuristic)
          if (toolResult.error || conversationContext.length > 20) {
            break;
          }
        } else {
          // No more function calls, task completed
          break;
        }
      }

      const executionTime = Date.now() - startTime;

      // Get final response
      const finalMessage = conversationContext[conversationContext.length - 1];
      
      return {
        success: true,
        output: finalMessage?.content || 'Task completed successfully',
        executedTools,
        tokensUsed,
        executionTime
      };

    } catch (error: any) {
      console.error('❌ Task execution error:', error);
      return {
        success: false,
        error: error.message,
        executionTime: Date.now() - startTime
      };
    }
  }

  /**
   * Build system prompt for the agent
   */
  private buildSystemPrompt(task: AgentTask, agent: AgentInstance, availableTools: AgentToolDefinition[]): string {
    const toolList = availableTools.map(tool => `- ${tool.name}: ${tool.description}`).join('\n');
    
    return `You are an advanced agentic AI assistant for Premier Party Cruises. Your role is to execute tasks autonomously using the available tools.

**Task Details:**
- Title: ${task.title}
- Category: ${task.category}
- Type: ${task.type}
- Description: ${task.description || 'No description provided'}

**Your Capabilities:**
You have access to the following tools:
${toolList}

**Guidelines:**
1. Analyze the task instructions carefully
2. Break down complex tasks into smaller steps
3. Use the appropriate tools to accomplish each step
4. Provide clear, actionable results
5. Handle errors gracefully and suggest alternatives
6. Be efficient with tool usage and API calls
7. Always validate your work before concluding

**Safety Rules:**
- Only use tools that are necessary for the task
- Verify parameters before executing dangerous operations
- Report any security concerns or unexpected errors
- Follow the principle of least privilege

**Context:**
${task.taskData.context ? JSON.stringify(task.taskData.context, null, 2) : 'No additional context provided'}

Execute the task step by step and provide a comprehensive result.`;
  }

  /**
   * Execute a specific tool
   */
  private async executeTool(taskId: string, toolName: string, args: any, agentId: string): Promise<any> {
    const executionId = randomUUID();
    const startTime = Date.now();

    try {
      // Find the tool definition
      const toolDef = getToolByName(toolName);
      if (!toolDef) {
        throw new Error(`Tool '${toolName}' not found`);
      }

      // Log execution start
      if (this.storage) {
        const execution: InsertAgentExecution = {
          id: executionId,
          taskId,
          toolId: toolDef.name, // Use name as ID for now
          input: args,
          status: 'running',
          agentId,
          startedAt: new Date()
        };
        await this.storage.createAgentExecution(execution);
      }

      // Execute tool through tool executor
      let result: any;
      if (this.toolExecutor) {
        result = await this.toolExecutor.execute(toolName, args);
      } else {
        // Mock execution for development
        result = await this.mockToolExecution(toolName, args);
      }

      const executionTime = Date.now() - startTime;

      // Log execution completion
      if (this.storage) {
        await this.storage.updateAgentExecution(executionId, {
          status: 'completed',
          output: result,
          completedAt: new Date(),
          executionTime
        });
      }

      console.log(`✅ Tool ${toolName} executed successfully in ${executionTime}ms`);
      return result;

    } catch (error: any) {
      const executionTime = Date.now() - startTime;
      
      console.error(`❌ Tool ${toolName} execution failed:`, error);

      // Log execution failure
      if (this.storage) {
        await this.storage.updateAgentExecution(executionId, {
          status: 'failed',
          error: error.message,
          completedAt: new Date(),
          executionTime
        });
      }

      return {
        error: error.message,
        success: false
      };
    }
  }

  /**
   * Mock task execution for development/testing
   */
  private async mockTaskExecution(task: AgentTask): Promise<TaskResult> {
    console.log(`🔄 Mock execution for task: ${task.title}`);
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      output: `Mock execution completed for task: ${task.title}. In production, this would use OpenAI GPT-3.5-turbo with function calling.`,
      executedTools: ['mock_tool'],
      tokensUsed: 150,
      executionTime: 1000
    };
  }

  /**
   * Mock tool execution for development/testing
   */
  private async mockToolExecution(toolName: string, args: any): Promise<any> {
    console.log(`🔧 Mock execution for tool: ${toolName} with args:`, args);
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      message: `Mock execution of ${toolName}`,
      data: args,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get task status
   */
  async getTaskStatus(taskId: string): Promise<AgentTask | null> {
    if (!this.storage) return null;
    return await this.storage.getAgentTask(taskId);
  }

  /**
   * List tasks with filters
   */
  async listTasks(filters: {
    status?: string;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<AgentTask[]> {
    if (!this.storage) return [];
    return await this.storage.listAgentTasks(filters);
  }

  /**
   * Cancel a task
   */
  async cancelTask(taskId: string): Promise<boolean> {
    try {
      if (!this.storage) return false;

      // Update task status
      await this.storage.updateAgentTask(taskId, {
        status: 'cancelled',
        completedAt: new Date()
      });

      // Remove from queue if present
      this.taskQueue = this.taskQueue.filter(task => task.id !== taskId);

      // If task is currently running, mark agent as idle
      for (const agent of this.agentPool.values()) {
        if (agent.currentTaskId === taskId) {
          agent.status = 'idle';
          agent.currentTaskId = undefined;
          break;
        }
      }

      console.log(`🚫 Cancelled task: ${taskId}`);
      return true;
    } catch (error) {
      console.error('❌ Error cancelling task:', error);
      return false;
    }
  }

  /**
   * Get agent pool status
   */
  getAgentPoolStatus(): {
    totalAgents: number;
    idleAgents: number;
    busyAgents: number;
    queuedTasks: number;
    agents: Array<{
      id: string;
      status: string;
      currentTaskId?: string;
      lastActivity: Date;
    }>;
  } {
    const agents = Array.from(this.agentPool.values());
    
    return {
      totalAgents: agents.length,
      idleAgents: agents.filter(a => a.status === 'idle').length,
      busyAgents: agents.filter(a => a.status === 'busy').length,
      queuedTasks: this.taskQueue.length,
      agents: agents.map(agent => ({
        id: agent.id,
        status: agent.status,
        currentTaskId: agent.currentTaskId,
        lastActivity: agent.lastActivity
      }))
    };
  }

  /**
   * Cleanup idle agents (garbage collection)
   */
  async cleanupIdleAgents(): Promise<void> {
    const now = new Date();
    const maxIdleTime = 5 * 60 * 1000; // 5 minutes

    for (const [agentId, agent] of this.agentPool.entries()) {
      if (agent.status === 'idle' && now.getTime() - agent.lastActivity.getTime() > maxIdleTime) {
        this.agentPool.delete(agentId);
        console.log(`🗑️ Cleaned up idle agent: ${agentId}`);
      }
    }
  }

  /**
   * Health check
   */
  getHealthStatus(): {
    status: 'healthy' | 'degraded' | 'unhealthy';
    openaiConnected: boolean;
    storageConnected: boolean;
    activeAgents: number;
    queuedTasks: number;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (!this.openai) {
      errors.push('OpenAI client not initialized');
    }
    
    if (!this.storage) {
      errors.push('Storage not connected');
    }

    const status = errors.length === 0 ? 'healthy' : errors.length === 1 ? 'degraded' : 'unhealthy';

    return {
      status,
      openaiConnected: !!this.openai,
      storageConnected: !!this.storage,
      activeAgents: this.agentPool.size,
      queuedTasks: this.taskQueue.length,
      errors
    };
  }
}

// Export singleton instance
export const agenticAIService = new AgenticAIService();
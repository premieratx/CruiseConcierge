/**
 * Agentic AI Admin Interface
 * Comprehensive dashboard for managing AI agents, tasks, and monitoring workflows
 */

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Bot, 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Activity, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  RefreshCw,
  Eye,
  Terminal,
  Zap,
  Users,
  Database,
  FileText,
  Globe,
  Search,
  Image,
  MessageSquare,
  TrendingUp,
  Monitor,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTab } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

// Types and Schemas
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  instructions: z.string().min(1, 'Instructions are required'),
  type: z.enum(['single', 'multi_step', 'scheduled', 'recurring']),
  category: z.enum(['database', 'filesystem', 'api', 'seo', 'media', 'blog', 'analytics', 'system']),
  priority: z.enum(['low', 'normal', 'high', 'urgent']),
  agentConfig: z.object({
    model: z.enum(['gpt-3.5-turbo', 'gpt-4o-mini', 'gpt-4']).optional(),
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().min(1).max(4096).optional(),
    enabledTools: z.array(z.string()).optional(),
    maxRetries: z.number().min(1).max(5).optional(),
    timeoutMs: z.number().min(1000).max(300000).optional()
  }).optional()
});

type CreateTaskForm = z.infer<typeof createTaskSchema>;

// Category Icons
const categoryIcons = {
  database: Database,
  filesystem: FileText,
  api: Globe,
  seo: Search,
  media: Image,
  blog: MessageSquare,
  analytics: TrendingUp,
  system: Monitor
};

// Status Colors
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  running: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
};

// Priority Colors
const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  normal: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

export default function AgenticAI() {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [taskFilters, setTaskFilters] = useState({
    status: 'all',
    category: 'all',
    priority: 'all'
  });
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [toolExecutionData, setToolExecutionData] = useState({
    toolName: '',
    args: '{}'
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Create task form
  const form = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      type: 'single',
      category: 'database',
      priority: 'normal',
      agentConfig: {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 2048,
        maxRetries: 3,
        timeoutMs: 60000
      }
    }
  });

  // Queries
  const { data: coordinationStatus, isLoading: coordinationLoading } = useQuery({
    queryKey: ['/api/agents/coordinate'],
    refetchInterval: 5000 // Refresh every 5 seconds
  });

  const { data: tasks, isLoading: tasksLoading, refetch: refetchTasks } = useQuery({
    queryKey: ['/api/agents/task/list', taskFilters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (taskFilters.status !== 'all') params.append('status', taskFilters.status);
      if (taskFilters.category !== 'all') params.append('category', taskFilters.category);
      if (taskFilters.priority !== 'all') params.append('priority', taskFilters.priority);
      params.append('limit', '50');
      
      return fetch(`/api/agents/task/list?${params.toString()}`).then(res => res.json());
    }
  });

  const { data: availableTools } = useQuery({
    queryKey: ['/api/agents/tools']
  });

  // Mutations
  const createTaskMutation = useMutation({
    mutationFn: async (data: CreateTaskForm) => {
      const response = await apiRequest('POST', '/api/agents/task/create', data);
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: '✅ Task Created',
        description: `Agent task "${data.taskId}" has been created successfully.`
      });
      refetchTasks();
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: '❌ Create Task Failed',
        description: error.message || 'Failed to create agent task',
        variant: 'destructive'
      });
    }
  });

  const cancelTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await apiRequest('POST', `/api/agents/task/${taskId}/cancel`);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: '✅ Task Cancelled',
        description: 'Agent task has been cancelled successfully.'
      });
      refetchTasks();
    },
    onError: (error: any) => {
      toast({
        title: '❌ Cancel Failed',
        description: error.message || 'Failed to cancel task',
        variant: 'destructive'
      });
    }
  });

  const executeToolMutation = useMutation({
    mutationFn: async (data: { toolName: string; args: any }) => {
      const response = await apiRequest('POST', '/api/agents/tools/execute', data);
      return await response.json();
    },
    onSuccess: (result) => {
      toast({
        title: result.success ? '✅ Tool Executed' : '❌ Tool Failed',
        description: result.success ? 'Tool executed successfully' : result.error,
        variant: result.success ? 'default' : 'destructive'
      });
    },
    onError: (error: any) => {
      toast({
        title: '❌ Execution Failed',
        description: error.message || 'Failed to execute tool',
        variant: 'destructive'
      });
    }
  });

  // Handlers
  const onCreateTask = (data: CreateTaskForm) => {
    createTaskMutation.mutate(data);
  };

  const handleCancelTask = (taskId: string) => {
    cancelTaskMutation.mutate(taskId);
  };

  const handleToolExecution = () => {
    try {
      const args = JSON.parse(toolExecutionData.args);
      executeToolMutation.mutate({
        toolName: toolExecutionData.toolName,
        args
      });
    } catch (error) {
      toast({
        title: '❌ Invalid JSON',
        description: 'Please provide valid JSON for tool arguments',
        variant: 'destructive'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'running': return <Activity className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'cancelled': return <Square className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-blue-600" />
            Agentic AI System
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Advanced AI automation with function calling and task delegation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => queryClient.invalidateQueries()}
            data-testid="button-refresh"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTab value="dashboard" data-testid="tab-dashboard">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTab>
          <TabsTab value="tasks" data-testid="tab-tasks">
            <Activity className="h-4 w-4 mr-2" />
            Tasks
          </TabsTab>
          <TabsTab value="agents" data-testid="tab-agents">
            <Users className="h-4 w-4 mr-2" />
            Agents
          </TabsTab>
          <TabsTab value="tools" data-testid="tab-tools">
            <Terminal className="h-4 w-4 mr-2" />
            Tools
          </TabsTab>
          <TabsTab value="analytics" data-testid="tab-analytics">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </TabsTab>
          <TabsTab value="settings" data-testid="tab-settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTab>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* System Health */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {coordinationStatus?.health?.status === 'healthy' ? '✅ Healthy' : '❌ Issues'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {coordinationStatus?.health?.activeAgents || 0} active agents
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-active-tasks">
                  {coordinationStatus?.agentPool?.busyAgents || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {coordinationStatus?.agentPool?.queuedTasks || 0} queued
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tool Executions</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-tool-executions">
                  {coordinationStatus?.executionStats?.totalExecutions || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Today's executions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Agent Pool</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-agent-pool">
                  {coordinationStatus?.agentPool?.totalAgents || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {coordinationStatus?.agentPool?.idleAgents || 0} idle
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Agent Activity</CardTitle>
              <CardDescription>Latest task executions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" data-testid="activity-list">
                {tasks?.slice(0, 5).map((task: any) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {task.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[task.status as keyof typeof statusColors]}>
                        {task.status}
                      </Badge>
                      <Badge variant="outline">
                        {task.category}
                      </Badge>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    No recent activity
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          {/* Task Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Select value={taskFilters.status} onValueChange={(value) => setTaskFilters({...taskFilters, status: value})}>
                <SelectTrigger className="w-40" data-testid="select-status-filter">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={taskFilters.category} onValueChange={(value) => setTaskFilters({...taskFilters, category: value})}>
                <SelectTrigger className="w-40" data-testid="select-category-filter">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="filesystem">File System</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>

              <Select value={taskFilters.priority} onValueChange={(value) => setTaskFilters({...taskFilters, priority: value})}>
                <SelectTrigger className="w-40" data-testid="select-priority-filter">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button data-testid="button-create-task">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Agent Task</DialogTitle>
                  <DialogDescription>
                    Configure a new task for the agentic AI system to execute
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onCreateTask)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Task Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Analyze website performance" {...field} data-testid="input-task-title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe what this task should accomplish..." 
                              {...field} 
                              data-testid="input-task-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="instructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Instructions</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide step-by-step instructions for the AI agent..." 
                              rows={4}
                              {...field} 
                              data-testid="input-task-instructions"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Task Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-task-type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="single">Single Task</SelectItem>
                                <SelectItem value="multi_step">Multi-Step</SelectItem>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="recurring">Recurring</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-task-category">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="database">Database</SelectItem>
                                <SelectItem value="filesystem">File System</SelectItem>
                                <SelectItem value="api">API</SelectItem>
                                <SelectItem value="seo">SEO</SelectItem>
                                <SelectItem value="media">Media</SelectItem>
                                <SelectItem value="blog">Blog</SelectItem>
                                <SelectItem value="analytics">Analytics</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-task-priority">
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button 
                        type="submit" 
                        disabled={createTaskMutation.isPending}
                        data-testid="button-submit-task"
                      >
                        {createTaskMutation.isPending ? 'Creating...' : 'Create Task'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Task List */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Tasks</CardTitle>
              <CardDescription>Monitor and manage all agent tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" data-testid="task-list">
                {tasksLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                    Loading tasks...
                  </div>
                ) : tasks?.length > 0 ? (
                  tasks.map((task: any) => {
                    const CategoryIcon = categoryIcons[task.category as keyof typeof categoryIcons] || FileText;
                    
                    return (
                      <div 
                        key={task.id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        data-testid={`task-item-${task.id}`}
                      >
                        <div className="flex items-center gap-4">
                          <CategoryIcon className="h-6 w-6 text-gray-500" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{task.title}</h3>
                              <Badge className={statusColors[task.status as keyof typeof statusColors]}>
                                {getStatusIcon(task.status)}
                                <span className="ml-1">{task.status}</span>
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={priorityColors[task.priority as keyof typeof priorityColors]}
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {task.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>Created: {format(new Date(task.createdAt), 'MMM dd, HH:mm')}</span>
                              {task.completedAt && (
                                <span>Completed: {format(new Date(task.completedAt), 'MMM dd, HH:mm')}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTask(task)}
                            data-testid={`button-view-task-${task.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {task.status === 'running' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelTask(task.id)}
                              disabled={cancelTaskMutation.isPending}
                              data-testid={`button-cancel-task-${task.id}`}
                            >
                              <Square className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No tasks found. Create your first agent task to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tool Execution */}
            <Card>
              <CardHeader>
                <CardTitle>Direct Tool Execution</CardTitle>
                <CardDescription>Test and execute tools directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="toolName">Tool Name</Label>
                  <Select value={toolExecutionData.toolName} onValueChange={(value) => setToolExecutionData({...toolExecutionData, toolName: value})}>
                    <SelectTrigger data-testid="select-tool-name">
                      <SelectValue placeholder="Select a tool" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTools?.tools?.map((tool: any) => (
                        <SelectItem key={tool.name} value={tool.name}>
                          {tool.name} ({tool.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="toolArgs">Arguments (JSON)</Label>
                  <Textarea
                    id="toolArgs"
                    placeholder='{"param1": "value1", "param2": "value2"}'
                    value={toolExecutionData.args}
                    onChange={(e) => setToolExecutionData({...toolExecutionData, args: e.target.value})}
                    rows={6}
                    data-testid="input-tool-args"
                  />
                </div>

                <Button
                  onClick={handleToolExecution}
                  disabled={!toolExecutionData.toolName || executeToolMutation.isPending}
                  className="w-full"
                  data-testid="button-execute-tool"
                >
                  {executeToolMutation.isPending ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Zap className="h-4 w-4 mr-2" />
                  )}
                  Execute Tool
                </Button>
              </CardContent>
            </Card>

            {/* Available Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Available Tools</CardTitle>
                <CardDescription>All registered tools in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto" data-testid="tools-list">
                  {availableTools?.tools?.map((tool: any) => {
                    const CategoryIcon = categoryIcons[tool.category as keyof typeof categoryIcons] || FileText;
                    
                    return (
                      <div 
                        key={tool.name} 
                        className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={() => setToolExecutionData({...toolExecutionData, toolName: tool.name})}
                        data-testid={`tool-item-${tool.name}`}
                      >
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{tool.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{tool.category}</Badge>
                          {tool.dangerLevel === 'dangerous' && (
                            <Badge variant="destructive">⚠️</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">94.2%</div>
                <Progress value={94.2} className="mt-2" />
                <p className="text-sm text-gray-600 mt-2">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg Execution Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.3s</div>
                <p className="text-sm text-gray-600">Per tool execution</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Used Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>database_query</span>
                    <span className="font-medium">342</span>
                  </div>
                  <div className="flex justify-between">
                    <span>file_read</span>
                    <span className="font-medium">198</span>
                  </div>
                  <div className="flex justify-between">
                    <span>seo_analyze</span>
                    <span className="font-medium">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Configuration</CardTitle>
              <CardDescription>Global settings for the agentic AI system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-retry Failed Tasks</Label>
                  <p className="text-sm text-gray-600">Automatically retry failed tasks up to 3 times</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Rate Limiting</Label>
                  <p className="text-sm text-gray-600">Enable rate limiting for tool executions</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Task Cleanup</Label>
                  <p className="text-sm text-gray-600">Auto-cleanup completed tasks after 30 days</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Task Detail Modal */}
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedTask.title}</DialogTitle>
              <DialogDescription>Task Details and Execution History</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Badge className={statusColors[selectedTask.status as keyof typeof statusColors]}>
                    {getStatusIcon(selectedTask.status)}
                    <span className="ml-1">{selectedTask.status}</span>
                  </Badge>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge className={priorityColors[selectedTask.priority as keyof typeof priorityColors]}>
                    {selectedTask.priority}
                  </Badge>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <p className="text-sm mt-1">{selectedTask.description}</p>
              </div>

              {selectedTask.result && (
                <div>
                  <Label>Result</Label>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm mt-1 overflow-auto">
                    {JSON.stringify(selectedTask.result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
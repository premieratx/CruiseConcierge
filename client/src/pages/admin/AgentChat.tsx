import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Bot, 
  User, 
  Send, 
  Plus, 
  Code, 
  Database, 
  Search, 
  FileText, 
  MessageSquare,
  Copy,
  Check,
  Loader2,
  Trash2,
  Play,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface AgentChatSession {
  sessionId: string;
  userId: string;
  title: string;
  status: 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface AgentChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  functionCall?: {
    name: string;
    arguments: string;
  };
  toolResult?: {
    success: boolean;
    data: any;
  };
  metadata: Record<string, any>;
  createdAt: string;
}

interface ToolCall {
  name: string;
  result: {
    success: boolean;
    data?: any;
    error?: string;
    message?: string;
  };
}

export default function AgentChat() {
  // SECURITY: Authentication check for admin agent chat access
  useEffect(() => {
    // Check if user has admin access - redirect if not authenticated
    const checkAuthentication = async () => {
      try {
        // Test if the user has access to admin endpoints by making a simple authenticated request
        await apiRequest('GET', '/api/contacts?limit=1');
      } catch (error: any) {
        console.error('Authentication check failed:', error);
        if (error.status === 401 || error.status === 403) {
          // Redirect to login or show error message
          window.location.href = '/admin';
          return;
        }
      }
    };
    
    checkAuthentication();
  }, []);

  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch chat sessions
  const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
    queryKey: ['/api/agent/chat/sessions'],
    queryFn: async () => {
      return await apiRequest('GET', '/api/agent/chat/sessions') as AgentChatSession[];
    },
  });

  // Fetch messages for selected session
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/agent/chat', selectedSession, 'history'],
    queryFn: async () => {
      return await apiRequest('GET', `/api/agent/chat/${selectedSession}/history`) as AgentChatMessage[];
    },
    enabled: !!selectedSession,
  });

  // Create new session mutation
  const createSessionMutation = useMutation({
    mutationFn: async (data: { title: string }) => {
      return await apiRequest('POST', '/api/agent/chat/sessions', data) as AgentChatSession;
    },
    onSuccess: (newSession) => {
      queryClient.invalidateQueries({ queryKey: ['/api/agent/chat/sessions'] });
      setSelectedSession(newSession.sessionId);
      setIsNewSessionDialogOpen(false);
      setNewSessionTitle('');
      toast({
        title: "Session Created",
        description: "New agent chat session has been created.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create session",
        variant: "destructive",
      });
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (data: { sessionId: string; message: string }) => {
      return await apiRequest('POST', '/api/agent/chat/message', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['/api/agent/chat', selectedSession, 'history'] 
      });
      queryClient.invalidateQueries({ queryKey: ['/api/agent/chat/sessions'] });
      setNewMessage('');
      setIsTyping(false);
    },
    onError: (error: any) => {
      setIsTyping(false);
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-select first session if none selected
  useEffect(() => {
    if (sessions.length > 0 && !selectedSession) {
      setSelectedSession(sessions[0].sessionId);
    }
  }, [sessions, selectedSession]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedSession) return;

    setIsTyping(true);
    await sendMessageMutation.mutateAsync({
      sessionId: selectedSession,
      message: newMessage.trim()
    });
  };

  const handleCreateSession = async () => {
    if (!newSessionTitle.trim()) return;

    await createSessionMutation.mutateAsync({
      title: newSessionTitle.trim()
    });
  };

  const handleCopyCode = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
      toast({
        title: "Copied",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy code",
        variant: "destructive",
      });
    }
  };

  const renderToolCall = (toolCall: ToolCall, messageId: string) => {
    const { name, result } = toolCall;
    
    const getToolIcon = (toolName: string) => {
      switch (toolName) {
        case 'blog_create_post': return FileText;
        case 'read_file': return FileText;
        case 'database_query': return Database;
        case 'seo_analyze': return Search;
        default: return Code;
      }
    };

    const Icon = getToolIcon(name);

    return (
      <div key={`${messageId}-${name}`} className="mt-3 p-3 bg-muted/30 rounded-lg border">
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            result.success ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}>
            {result.success ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4" />
              <span className="font-medium text-sm">{name.replace(/_/g, ' ').toUpperCase()}</span>
              <Badge variant={result.success ? "default" : "destructive"} className="text-xs">
                {result.success ? 'Success' : 'Error'}
              </Badge>
            </div>
            
            {result.message && (
              <p className="text-sm text-muted-foreground mb-2">{result.message}</p>
            )}
            
            {result.error && (
              <p className="text-sm text-red-600 dark:text-red-400 mb-2">{result.error}</p>
            )}
            
            {result.data && (
              <div className="text-sm">
                <details className="cursor-pointer">
                  <summary className="font-medium text-muted-foreground hover:text-foreground">
                    View Result Data
                  </summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                    {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMessage = (message: AgentChatMessage) => {
    const isUser = message.role === 'user';
    const hasCode = message.content.includes('```');
    const hasToolCalls = message.toolResult && message.functionCall;
    
    // Parse code blocks
    const parts = message.content.split(/(```[\s\S]*?```)/);
    
    return (
      <div
        key={message.id}
        className={`flex gap-3 p-4 ${isUser ? 'bg-muted/50' : 'bg-background'}`}
        data-testid={`message-${message.role}-${message.id}`}
      >
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {isUser ? 'You' : 'AI Agent'}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(message.createdAt), 'h:mm a')}
            </span>
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {parts.map((part, index) => {
              if (part.startsWith('```')) {
                const codeMatch = part.match(/```(\w+)?\n?([\s\S]*?)\n?```/);
                if (codeMatch) {
                  const language = codeMatch[1] || 'text';
                  const code = codeMatch[2];
                  
                  return (
                    <div key={index} className="relative my-4">
                      <div className="flex items-center justify-between bg-muted p-2 rounded-t-lg border">
                        <span className="text-xs font-medium">{language}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(code, message.id)}
                          data-testid={`copy-code-${message.id}`}
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <SyntaxHighlighter
                        language={language}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          fontSize: '0.875rem'
                        }}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  );
                }
              }
              
              return (
                <div key={index} className="whitespace-pre-wrap">
                  {part}
                </div>
              );
            })}
          </div>
          
          {/* Tool Execution Results */}
          {hasToolCalls && message.functionCall && message.toolResult && (
            <div className="mt-3">
              {renderToolCall({
                name: message.functionCall.name,
                result: message.toolResult
              }, message.id)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold" data-testid="page-title">AI Agent Chat</h1>
              <p className="text-muted-foreground">
                Chat with AI agent that can perform backend tasks: create blog posts, query databases, analyze SEO, and manage files
              </p>
            </div>
            
            <Dialog open={isNewSessionDialogOpen} onOpenChange={setIsNewSessionDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="new-session-button">
                  <Plus className="w-4 h-4 mr-2" />
                  New Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Agent Chat Session</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Session Title</label>
                    <Input
                      value={newSessionTitle}
                      onChange={(e) => setNewSessionTitle(e.target.value)}
                      placeholder="e.g., Blog post creation help"
                      data-testid="session-title-input"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleCreateSession}
                      disabled={!newSessionTitle.trim() || createSessionMutation.isPending}
                      data-testid="create-session-button"
                    >
                      {createSessionMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Create Session
                    </Button>
                    <Button variant="outline" onClick={() => setIsNewSessionDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Sessions Sidebar */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {sessionsLoading ? (
                    <div className="p-4 text-center text-muted-foreground">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading sessions...
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No sessions yet</p>
                      <p className="text-xs">Create your first session to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {sessions.map((session: AgentChatSession) => (
                        <div
                          key={session.sessionId}
                          className={`p-3 cursor-pointer hover:bg-muted/50 border-l-2 transition-colors ${
                            selectedSession === session.sessionId
                              ? 'bg-muted border-l-primary'
                              : 'border-l-transparent'
                          }`}
                          onClick={() => setSelectedSession(session.sessionId)}
                          data-testid={`session-${session.sessionId}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{session.title}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {session.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {format(new Date(session.createdAt), 'MMM d, h:mm a')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="lg:col-span-3 flex flex-col">
              {selectedSession ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {sessions.find((s: AgentChatSession) => s.sessionId === selectedSession)?.title || 'Chat'}
                      </CardTitle>
                      <Badge variant="outline">
                        AI Tools: Blog Posts • Database • SEO • Files
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <Separator />
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      {messagesLoading ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                          Loading messages...
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <h3 className="font-medium mb-2">Start a Conversation</h3>
                          <p className="text-sm mb-4">
                            Ask me to help with backend tasks. I can create blog posts, query databases, analyze SEO, and manage files.
                          </p>
                          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto text-xs">
                            <div className="p-3 bg-muted rounded-lg">
                              <FileText className="w-4 h-4 mb-1" />
                              <p>Create Blog Posts</p>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <Database className="w-4 h-4 mb-1" />
                              <p>Query Database</p>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <Search className="w-4 h-4 mb-1" />
                              <p>SEO Analysis</p>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <Code className="w-4 h-4 mb-1" />
                              <p>Read/Manage Files</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="divide-y divide-border">
                          {messages.map(renderMessage)}
                          {isTyping && (
                            <div className="flex gap-3 p-4 bg-background">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                                <Bot className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-medium">AI Agent</span>
                                  <Badge variant="outline" className="text-xs">
                                    Processing...
                                  </Badge>
                                </div>
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                              </div>
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                  
                  <Separator />
                  
                  {/* Message Input */}
                  <div className="p-4 bg-muted/30">
                    <div className="flex gap-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask the AI agent to help with backend tasks..."
                        className="flex-1 resize-none"
                        rows={2}
                        disabled={sendMessageMutation.isPending}
                        data-testid="message-input"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || sendMessageMutation.isPending}
                        size="sm"
                        className="self-end"
                        data-testid="send-message-button"
                      >
                        {sendMessageMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="font-medium mb-2">Select a Session</h3>
                    <p className="text-sm">Choose a chat session from the sidebar or create a new one</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Bot, 
  User, 
  Send, 
  Plus, 
  Code, 
  Database, 
  Settings, 
  BarChart3, 
  Search, 
  MessageSquare,
  Copy,
  Check,
  Loader2,
  Trash2,
  Edit
} from 'lucide-react';
import { format } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface AdminChatSession {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  isActive: boolean;
  lastMessageAt: string;
  createdAt: string;
}

interface AdminChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  messageType: 'text' | 'code' | 'system';
  codeLanguage?: string;
  metadata?: {
    requestType?: 'coding' | 'admin' | 'query' | 'debug' | 'review';
    model?: string;
    tokens?: number;
    hasCode?: boolean;
  };
  createdAt: string;
}

const REQUEST_TYPES = [
  { value: 'coding', label: 'Coding Help', icon: Code },
  { value: 'admin', label: 'Admin Tasks', icon: Settings },
  { value: 'query', label: 'Database Query', icon: Database },
  { value: 'debug', label: 'Debug Issue', icon: Search },
  { value: 'review', label: 'Code Review', icon: BarChart3 },
];

export default function AIAssistant() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [requestType, setRequestType] = useState<string>('coding');
  const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionDescription, setNewSessionDescription] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch chat sessions
  const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
    queryKey: ['/api/admin/ai-assistant/sessions'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/admin/ai-assistant/sessions');
      return response as AdminChatSession[];
    },
  });

  // Fetch messages for selected session
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/admin/ai-assistant/sessions', selectedSession, 'messages'],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/admin/ai-assistant/sessions/${selectedSession}/messages`);
      return response as AdminChatMessage[];
    },
    enabled: !!selectedSession,
  });

  // Create new session mutation
  const createSessionMutation = useMutation({
    mutationFn: async (data: { title: string; description?: string; tags?: string[] }) => {
      const response = await apiRequest('POST', '/api/admin/ai-assistant/sessions', data);
      return response as AdminChatSession;
    },
    onSuccess: (newSession) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ai-assistant/sessions'] });
      setSelectedSession(newSession.id);
      setIsNewSessionDialogOpen(false);
      setNewSessionTitle('');
      setNewSessionDescription('');
      toast({
        title: "Session Created",
        description: "New AI assistant session has been created.",
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
    mutationFn: async (data: { 
      sessionId: string; 
      content: string; 
      messageType?: string;
      metadata?: any;
    }) => {
      const response = await apiRequest('POST', `/api/admin/ai-assistant/sessions/${data.sessionId}/messages`, data);
      return response as AdminChatMessage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['/api/admin/ai-assistant/sessions', selectedSession, 'messages'] 
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ai-assistant/sessions'] });
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

  // Delete session mutation
  const deleteSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await apiRequest('DELETE', `/api/admin/ai-assistant/sessions/${sessionId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ai-assistant/sessions'] });
      setSelectedSession(null);
      toast({
        title: "Session Deleted",
        description: "Chat session has been deleted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete session",
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
      setSelectedSession(sessions[0].id);
    }
  }, [sessions, selectedSession]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedSession) return;

    setIsTyping(true);
    await sendMessageMutation.mutateAsync({
      sessionId: selectedSession,
      content: newMessage.trim(),
      messageType: 'text',
      metadata: { requestType }
    });
  };

  const handleCreateSession = async () => {
    if (!newSessionTitle.trim()) return;

    await createSessionMutation.mutateAsync({
      title: newSessionTitle.trim(),
      description: newSessionDescription.trim() || undefined,
      tags: [requestType]
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

  const renderMessage = (message: AdminChatMessage) => {
    const isUser = message.role === 'user';
    const hasCode = message.content.includes('```');
    
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
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            {message.metadata?.requestType && (
              <Badge variant="outline" className="text-xs">
                {REQUEST_TYPES.find(t => t.value === message.metadata?.requestType)?.label}
              </Badge>
            )}
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
          
          {message.metadata?.tokens && (
            <div className="text-xs text-muted-foreground">
              {message.metadata.tokens} tokens • {message.metadata.model}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold" data-testid="page-title">AI Assistant</h1>
              <p className="text-muted-foreground">
                Get AI-powered help with coding, admin tasks, and system operations using GPT-5
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
                  <DialogTitle>Create New Chat Session</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Session Title</label>
                    <Input
                      value={newSessionTitle}
                      onChange={(e) => setNewSessionTitle(e.target.value)}
                      placeholder="e.g., Database optimization help"
                      data-testid="session-title-input"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description (Optional)</label>
                    <Textarea
                      value={newSessionDescription}
                      onChange={(e) => setNewSessionDescription(e.target.value)}
                      placeholder="Brief description of what you need help with..."
                      rows={3}
                      data-testid="session-description-input"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Request Type</label>
                    <Select value={requestType} onValueChange={setRequestType}>
                      <SelectTrigger data-testid="request-type-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {REQUEST_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="w-4 h-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      {sessions.map((session: AdminChatSession) => (
                        <div
                          key={session.id}
                          className={`p-3 cursor-pointer hover:bg-muted/50 border-l-2 transition-colors ${
                            selectedSession === session.id
                              ? 'bg-muted border-l-primary'
                              : 'border-l-transparent'
                          }`}
                          onClick={() => setSelectedSession(session.id)}
                          data-testid={`session-${session.id}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{session.title}</h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {session.description || 'No description'}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                {session.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {REQUEST_TYPES.find(t => t.value === tag)?.label || tag}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {format(new Date(session.lastMessageAt), 'MMM d, h:mm a')}
                              </p>
                            </div>
                            {selectedSession === session.id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSessionMutation.mutate(session.id);
                                }}
                                data-testid={`delete-session-${session.id}`}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
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
                        {sessions.find((s: AdminChatSession) => s.id === selectedSession)?.title || 'Chat'}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Select value={requestType} onValueChange={setRequestType}>
                          <SelectTrigger className="w-48" data-testid="message-type-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {REQUEST_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                  <type.icon className="w-4 h-4" />
                                  {type.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
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
                            Ask me anything about coding, admin tasks, database queries, or system operations.
                          </p>
                          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto text-xs">
                            <div className="p-3 bg-muted rounded-lg">
                              <Code className="w-4 h-4 mb-1" />
                              <p>Code Review & Debug</p>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <Database className="w-4 h-4 mb-1" />
                              <p>Database Queries</p>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <Settings className="w-4 h-4 mb-1" />
                              <p>System Configuration</p>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <BarChart3 className="w-4 h-4 mb-1" />
                              <p>Analytics & Reports</p>
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
                                  <span className="text-sm font-medium">AI Assistant</span>
                                  <Badge variant="outline" className="text-xs">
                                    {REQUEST_TYPES.find(t => t.value === requestType)?.label}
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
                  <div className="p-4">
                    <div className="flex gap-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Ask me anything about coding, admin tasks, database queries, or system operations..."
                        className="flex-1 resize-none"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        data-testid="message-input"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || sendMessageMutation.isPending || isTyping}
                        size="lg"
                        data-testid="send-message-button"
                      >
                        {sendMessageMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="font-medium mb-2">No Session Selected</h3>
                    <p className="text-sm">
                      Select a chat session from the sidebar or create a new one to get started.
                    </p>
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
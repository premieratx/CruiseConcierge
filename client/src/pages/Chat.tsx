import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Calendar, Users, DollarSign, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  extractedData?: {
    name?: string;
    email?: string;
    phone?: string;
    eventType?: string;
    groupSize?: number;
    eventDate?: string;
    eventTime?: string;
    budget?: number;
  };
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize session
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Load chat history
  const { data: chatHistory } = useQuery({
    queryKey: ['/api/chat/history', sessionId],
    enabled: !!sessionId,
  });

  useEffect(() => {
    if (chatHistory && Array.isArray(chatHistory)) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest('POST', '/api/chat/message', {
        message,
        sessionId,
        context: {
          isEmbed: true,
          source: 'fullscreen',
        },
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.extractedData && Object.keys(data.extractedData).length > 0) {
        // Create contact and project automatically
        createContactAndProject(data.extractedData);
      }
      
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
        suggestedActions: data.suggestedActions,
        extractedData: data.extractedData,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsStreaming(false);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      setIsStreaming(false);
    },
  });

  // Create contact and project
  const createContactAndProject = async (extractedData: any) => {
    try {
      // Create contact
      const contactRes = await apiRequest('POST', '/api/contacts', {
        name: extractedData.name || 'New Lead',
        email: extractedData.email || '',
        phone: extractedData.phone || '',
        source: 'CHATBOT',
        tags: [extractedData.eventType || 'General Inquiry'],
      });
      const contactResponse = await contactRes.json();

      if (contactResponse.id) {
        // Create project
        await apiRequest('POST', '/api/projects', {
          contactId: contactResponse.id,
          name: `${extractedData.eventType || 'Event'} - ${extractedData.eventDate || 'TBD'}`,
          eventType: extractedData.eventType || 'OTHER',
          eventDate: extractedData.eventDate || new Date().toISOString(),
          groupSize: extractedData.groupSize || 0,
          status: 'LEAD',
        });

        toast({
          title: 'Lead Created',
          description: 'Your information has been saved. Our team will follow up soon!',
        });

        queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
        queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      }
    } catch (error) {
      console.error('Failed to create contact/project:', error);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);
    sendMessage.mutate(input);
  };

  const handleQuickAction = (action: { label: string; value: string }) => {
    setInput(action.value);
    handleSend();
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: "Welcome to Premier Party Cruises! 🚢 I'm here to help you plan the perfect event on Lake Austin. What type of celebration are you planning?",
        timestamp: new Date().toISOString(),
        suggestedActions: [
          { label: '🎂 Birthday Party', value: "I'm planning a birthday party", icon: '🎂' },
          { label: '💍 Bachelor/ette', value: "I'm planning a bachelor or bachelorette party", icon: '💍' },
          { label: '🏢 Corporate Event', value: "I'm planning a corporate event", icon: '🏢' },
          { label: '💒 Wedding', value: "I'm planning a wedding celebration", icon: '💒' },
          { label: '🎓 Graduation', value: "I'm planning a graduation party", icon: '🎓' },
        ],
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Premier Party Cruises
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                AI Booking Assistant
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Lake Austin's Premier Party Boats
          </Badge>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              data-testid={`message-${message.role}-${message.id}`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                } gap-3`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div className="flex flex-col gap-2">
                  <Card
                    className={`px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </Card>

                  {/* Suggested Actions */}
                  {message.suggestedActions && message.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {message.suggestedActions.map((action, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action)}
                          className="text-xs"
                          data-testid={`button-action-${idx}`}
                        >
                          {action.icon && <span className="mr-1">{action.icon}</span>}
                          {action.label}
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Extracted Data Preview */}
                  {message.extractedData && Object.keys(message.extractedData).length > 0 && (
                    <Card className="p-3 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          Information Captured
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {message.extractedData.name && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-green-600" />
                            <span>{message.extractedData.name}</span>
                          </div>
                        )}
                        {message.extractedData.groupSize && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-green-600" />
                            <span>{message.extractedData.groupSize} guests</span>
                          </div>
                        )}
                        {message.extractedData.eventDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-green-600" />
                            <span>{message.extractedData.eventDate}</span>
                          </div>
                        )}
                        {message.extractedData.budget && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-green-600" />
                            <span>${message.extractedData.budget}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Streaming Indicator */}
          {isStreaming && (
            <div className="flex justify-start" data-testid="streaming-indicator">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white animate-pulse" />
                </div>
                <Card className="px-4 py-3 bg-white dark:bg-gray-800">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about availability, pricing, or tell us about your event..."
              className="flex-1 min-h-[60px] max-h-[200px] resize-none"
              disabled={isStreaming}
              data-testid="input-message"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              data-testid="button-send"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Premier Party Cruises AI Assistant • Instant Quotes • Real-Time Availability
          </p>
        </div>
      </div>
    </div>
  );
}
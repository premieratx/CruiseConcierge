import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: any;
}

interface ChatWidgetProps {
  sessionId?: string;
  contactId?: string;
  isPreview?: boolean;
}

export function ChatWidget({ sessionId, contactId, isPreview = false }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId] = useState(sessionId || `session_${Date.now()}`);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!isPreview) {
      loadChatHistory();
    } else {
      // Load preview messages
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Welcome to Premier Party Cruises! 🚢 I'm here to help you plan the perfect party on Lake Austin. What type of event are you planning?",
          timestamp: new Date(),
        },
        {
          id: '2', 
          role: 'user',
          content: "Birthday party for 15 people",
          timestamp: new Date(),
        },
        {
          id: '3',
          role: 'assistant', 
          content: "Perfect! A birthday party for 15 sounds amazing! 🎉 When are you thinking?",
          timestamp: new Date(),
        }
      ]);
    }
  }, [isPreview, currentSessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadChatHistory = async () => {
    try {
      const response = await apiRequest("GET", `/api/chat/history/${currentSessionId}`);
      const history = await response.json();
      
      const formattedMessages = history.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.createdAt),
        metadata: msg.metadata
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || isPreview) return;

    const userMessage: Message = {
      id: `temp_${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/chat/message", {
        sessionId: currentSessionId,
        contactId,
        message: userMessage.content
      });

      const result = await response.json();
      
      const assistantMessage: Message = {
        id: `response_${Date.now()}`,
        role: 'assistant',
        content: result.message,
        timestamp: new Date(),
        metadata: {
          intent: result.intent,
          extractedData: result.extractedData,
          suggestedActions: result.suggestedActions
        }
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Handle extracted data and suggested actions
      if (result.extractedData && Object.keys(result.extractedData).some(key => result.extractedData[key])) {
        console.log("Extracted customer data:", result.extractedData);
      }

    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const QuickReplyButton = ({ text, onClick }: { text: string; onClick: () => void }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="text-xs h-8 bg-secondary/20 hover:bg-secondary/30 transition-colors"
      data-testid={`button-quick-reply-${text.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {text}
    </Button>
  );

  return (
    <Card className="h-96 flex flex-col boat-shadow" data-testid="chat-widget">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg font-heading" data-testid="text-chat-title">
          {isPreview ? "Chat Widget Preview" : "Premier Party Cruises"}
        </CardTitle>
        <p className="text-sm text-muted-foreground" data-testid="text-chat-subtitle">
          {isPreview ? "Live preview of customer-facing chat" : "How can we help you today?"}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${message.role === 'user' ? 'justify-end' : ''}`}
                data-testid={`message-${message.role}-${message.id}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                
                <div
                  className={`rounded-lg p-3 max-w-xs ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-muted rounded-tl-none'
                  }`}
                >
                  <p className="text-sm" data-testid={`text-message-content-${message.id}`}>
                    {message.content}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-austin-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Quick Reply Buttons for Preview */}
            {isPreview && messages.length === 3 && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-xs">
                  <p className="text-sm mb-2">Perfect! A birthday party for 15 sounds amazing! 🎉 When are you thinking?</p>
                  <div className="space-y-1">
                    <QuickReplyButton text="This Weekend" onClick={() => {}} />
                    <QuickReplyButton text="Next Month" onClick={() => {}} />
                    <QuickReplyButton text="Custom Date" onClick={() => {}} />
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg rounded-tl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={scrollRef} />
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder={isPreview ? "Type your message..." : "Ask about availability, pricing, or book now..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || isPreview}
              className="flex-1"
              data-testid="input-chat-message"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading || isPreview}
              className="px-4"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

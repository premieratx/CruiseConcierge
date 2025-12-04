import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
const logoPath = '/attached_assets/PPC Logo LARGE_1757881944449.png';
import { 
  MessageCircle, Send, Bot, User, X, Minimize2, Maximize2,
  Sparkles, Heart, PartyPopper, Ship, Music, Calendar,
  ArrowRight, ChevronUp, Star, Trophy, Crown
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  buttons?: ChatbotButton[];
  metadata?: any;
}

interface ChatbotButton {
  id: string;
  text: string;
  value: string;
  style: 'primary' | 'secondary' | 'outline';
}

interface EmbeddedQuoteBuilderProps {
  pageContext: 'home' | 'bachelor' | 'bachelorette';
  className?: string;
}

// Context-aware configurations
const contextConfigs = {
  home: {
    title: 'Get Your Custom Quote',
    subtitle: 'Start planning your perfect Lake Travis party cruise',
    emoji: '🚢',
    primaryColor: 'bg-brand-blue',
    welcomeMessage: "Welcome to Premier Party Cruises! 🚢 I'm here to help you plan the perfect party on Lake Travis. What type of event are you planning?",
    previewMessages: [
      { role: 'assistant', content: "Welcome! What type of event are you planning?" },
      { role: 'user', content: "Birthday party for 20 people" },
      { role: 'assistant', content: "Perfect! When are you thinking?" }
    ],
    features: [
      { icon: Ship, text: 'Private Charters' },
      { icon: Music, text: 'Disco Cruises' },
      { icon: Calendar, text: 'Flexible Dates' }
    ]
  },
  bachelor: {
    title: 'Plan Your Epic Bachelor Party',
    subtitle: 'Austin\'s ultimate bachelor party cruise experience',
    emoji: '🎉',
    primaryColor: 'bg-brand-blue',
    welcomeMessage: "Ready to plan an epic Austin bachelor party? 🎉 Our ATX Disco Cruises are perfect for the ultimate celebration with the boys. How many people are in your crew?",
    previewMessages: [
      { role: 'assistant', content: "Ready to plan an epic bachelor party? 🎉" },
      { role: 'user', content: "Bachelor party for 15 guys" },
      { role: 'assistant', content: "Awesome! ATX Disco Cruise would be perfect!" }
    ],
    features: [
      { icon: PartyPopper, text: 'Bachelor Specialty' },
      { icon: Music, text: 'DJ & Party Host' },
      { icon: Trophy, text: 'Epic Experiences' }
    ]
  },
  bachelorette: {
    title: 'Plan Your Dream Bachelorette',
    subtitle: 'That happens to be our specialty! 💕',
    emoji: '👰',
    primaryColor: 'bg-pink-500',
    welcomeMessage: "Welcome to your bachelorette party planning! 👰 This happens to be our specialty! Our ATX Disco Cruises are perfect for celebrating with your girls. How many ladies will be joining?",
    previewMessages: [
      { role: 'assistant', content: "Welcome to your bachelorette planning! 👰" },
      { role: 'user', content: "Bachelorette party for 12 girls" },
      { role: 'assistant', content: "Perfect! We'll make this amazing!" }
    ],
    features: [
      { icon: Heart, text: 'Bachelorette Specialty' },
      { icon: Crown, text: 'VIP Treatment' },
      { icon: Sparkles, text: 'Instagram Perfect' }
    ]
  }
};

export function EmbeddedQuoteBuilder({ pageContext, className }: EmbeddedQuoteBuilderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`embedded_${pageContext}_${Date.now()}`);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const config = contextConfigs[pageContext];

  useEffect(() => {
    // Initialize with context-aware welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: config.welcomeMessage,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [pageContext]);

  useEffect(() => {
    if (isExpanded && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await apiRequest('POST', '/api/chat/message', {
        sessionId,
        message: userMessage.content,
        context: {
          pageContext,
          eventType: pageContext === 'home' ? 'general' : pageContext,
          source: 'embedded_widget'
        }
      });

      const result = await response.json();
      
      const assistantMessage: Message = {
        id: `response_${Date.now()}`,
        role: 'assistant',
        content: result.message,
        timestamp: new Date(),
        buttons: result.buttons,
        metadata: result.metadata
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Handle any automated actions or quote generation
      if (result.automatedActions?.quoteId) {
        toast({
          title: 'Quote Generated!',
          description: 'Your personalized quote is ready for review.',
        });
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Connection Error',
        description: 'Please try again or call us at (512) 488-5892',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleButtonClick = async (button: ChatbotButton) => {
    const userMessage: Message = {
      id: `btn_${Date.now()}`,
      role: 'user',
      content: button.text,
      timestamp: new Date(),
      metadata: { buttonValue: button.value }
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await apiRequest('POST', '/api/chat/message', {
        sessionId,
        message: `${button.text} [${button.value}]`,
        context: {
          pageContext,
          eventType: pageContext === 'home' ? 'general' : pageContext,
          source: 'embedded_widget'
        }
      });

      const result = await response.json();
      
      const assistantMessage: Message = {
        id: `response_${Date.now()}`,
        role: 'assistant',
        content: result.message,
        timestamp: new Date(),
        buttons: result.buttons,
        metadata: result.metadata
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Button response error:', error);
      toast({
        title: 'Error',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ChatButton = ({ button }: { button: ChatbotButton }) => {
    const variants = {
      primary: 'default',
      secondary: 'secondary',
      outline: 'outline'
    } as const;
    
    return (
      <Button
        variant={variants[button.style]}
        size="sm"
        onClick={() => handleButtonClick(button)}
        className="text-xs h-8 transition-colors"
        data-testid={`button-chat-${button.id}`}
      >
        {button.text}
      </Button>
    );
  };

  const PreviewState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', config.primaryColor)}>
            <span className="text-2xl">{config.emoji}</span>
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-brand-black dark:text-brand-white">
              {config.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {config.subtitle}
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsExpanded(true)}
          className="btn-primary"
          data-testid="button-expand-chat"
        >
          Start Chat
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Preview conversation */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
        <div className="space-y-2">
          {config.previewMessages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.4 }}
              className={cn(
                'flex',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div className={cn(
                'max-w-[80%] px-3 py-2 rounded-lg text-sm',
                msg.role === 'user' 
                  ? 'bg-brand-blue text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4">
        {config.features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            className="text-center"
          >
            <div className="w-8 h-8 mx-auto mb-2 text-brand-blue">
              <feature.icon className="w-full h-full" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {feature.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const ExpandedState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <img src={logoPath} alt="Premier Party Cruises" className="w-8 h-8" width={32} height={32} loading="eager" />
          <div>
            <h3 className="font-heading font-bold text-brand-black dark:text-brand-white">
              {config.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {config.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            data-testid="button-minimize-chat"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div className="flex gap-2 max-w-[85%]">
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div>
                  <div className={cn(
                    'px-4 py-2 rounded-lg',
                    message.role === 'user'
                      ? 'bg-brand-blue text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  )}>
                    {message.content}
                  </div>
                  {message.buttons && message.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.buttons.map((button) => (
                        <ChatButton key={button.id} button={button} />
                      ))}
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
            data-testid="input-chat-message"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="btn-primary"
            data-testid="button-send-message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className={cn('max-w-4xl mx-auto', className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-2xl border-0 overflow-hidden">
        <motion.div
          animate={{
            height: isExpanded ? '600px' : '280px'
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <ExpandedState key="expanded" />
            ) : (
              <PreviewState key="preview" />
            )}
          </AnimatePresence>
        </motion.div>
      </Card>

      {/* Backdrop blur when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
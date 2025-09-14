import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { ChatWidget } from "./ChatWidget";

interface ChatBubbleProps {
  contactId?: string;
  isDemo?: boolean;
}

export function ChatBubble({ contactId, isDemo = false }: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 h-96 mb-2 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-card rounded-lg border border-border shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-sm" data-testid="text-chat-bubble-title">Premier Party Cruises</h3>
                  <p className="text-xs text-muted-foreground" data-testid="text-chat-bubble-subtitle">We're online!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
                data-testid="button-close-chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ChatWidget contactId={contactId} isPreview={isDemo} />
            </div>
          </div>
        </div>
      )}

      {/* Chat Bubble Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'scale-95' : 'hover:scale-105'
        } bg-accent hover:bg-accent/90`}
        data-testid="button-chat-bubble"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-accent-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-accent-foreground" />
        )}
      </Button>

      {/* Demo Info */}
      {isDemo && !isOpen && (
        <div className="absolute bottom-20 right-0 bg-card rounded-lg border border-border p-4 w-80 shadow-xl">
          <h4 className="font-semibold mb-2" data-testid="text-demo-info-title">Floating Chat Bubble</h4>
          <p className="text-sm text-muted-foreground" data-testid="text-demo-info-description">
            Website visitors see this chat button in the bottom-right corner. Click to expand the full chat interface.
          </p>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StickyCTAProps {
  primaryText?: string;
  primaryAction?: () => void;
  primaryHref?: string;
  secondaryText?: string;
  secondaryAction?: () => void;
  secondaryHref?: string;
  showOnDesktop?: boolean;
  className?: string;
}

export function StickyCTA({
  primaryText = "Get Free Quote",
  primaryAction,
  primaryHref = "/chat",
  secondaryText,
  secondaryAction,
  secondaryHref = "tel:+15124885892",
  showOnDesktop = false,
  className,
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handlePrimaryClick = () => {
    if (primaryAction) {
      primaryAction();
    } else if (primaryHref) {
      window.location.href = primaryHref;
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryAction) {
      secondaryAction();
    } else if (secondaryHref) {
      window.location.href = secondaryHref;
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
        showOnDesktop ? "" : "lg:hidden",
        className
      )}
    >
      <div className="bg-white dark:bg-gray-900 border-t-2 border-brand-blue shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className={cn(
            "flex gap-2",
            secondaryText ? "grid grid-cols-2" : ""
          )}>
            <Button
              onClick={handlePrimaryClick}
              size="lg"
              className="flex-1 bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue/90 hover:to-purple-600/90 text-white font-bold shadow-lg"
              data-testid="button-sticky-cta-primary"
            >
              <Calendar className="h-5 w-5 mr-2" />
              {primaryText}
            </Button>

            {secondaryText && (
              <Button
                onClick={handleSecondaryClick}
                size="lg"
                variant="outline"
                className="flex-1 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold"
                data-testid="button-sticky-cta-secondary"
              >
                <Phone className="h-5 w-5 mr-2" />
                {secondaryText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  alwaysOpen?: 'desktop' | 'mobile' | 'never';
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  icon,
  className,
  titleClassName,
  contentClassName,
  alwaysOpen = 'desktop',
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isDesktop, setIsDesktop] = useState(false);

  // SSR-safe window size detection
  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Initial check
    checkSize();
    
    // Listen for resize
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const shouldBeOpen = () => {
    if (alwaysOpen === 'desktop') {
      // Always open on desktop, collapsible on mobile
      return isDesktop || isOpen;
    }
    if (alwaysOpen === 'mobile') {
      // Always open on mobile, collapsible on desktop
      return !isDesktop || isOpen;
    }
    return isOpen;
  };

  const isCollapsible = () => {
    if (alwaysOpen === 'desktop') {
      return !isDesktop;
    }
    if (alwaysOpen === 'mobile') {
      return isDesktop;
    }
    return true;
  };

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden", className)}>
      <button
        onClick={() => isCollapsible() && setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-6 text-left transition-colors",
          isCollapsible() ? "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" : "cursor-default",
          titleClassName
        )}
        aria-expanded={shouldBeOpen()}
        data-testid={`collapsible-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-brand-blue flex-shrink-0">{icon}</span>}
          <h3 className="text-lg lg:text-xl font-bold font-playfair text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        
        {/* Only show chevron on collapsible breakpoints */}
        {isCollapsible() && (
          <span className={cn(
            "text-brand-blue transition-transform duration-300",
            alwaysOpen === 'desktop' ? "lg:hidden" : "",
            alwaysOpen === 'mobile' ? "block lg:block" : ""
          )}>
            {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </span>
        )}
      </button>

      {/* Content with smooth animation */}
      <AnimatePresence initial={false}>
        {(shouldBeOpen() || !isCollapsible()) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={cn("p-6 pt-0", contentClassName)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

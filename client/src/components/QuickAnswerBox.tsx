import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Check,
  MessageCircle
} from 'lucide-react';

export interface QuickAnswerBoxProps {
  question: string;
  answer: string;
  answerJsx?: React.ReactNode;
  icon?: React.ComponentType<any>;
  defaultOpen?: boolean;
  className?: string;
  keywords?: string[];
  relatedLink?: {
    href: string;
    text: string;
  };
  image?: string;
  imageAlt?: string;
  id?: string;
}

interface QuickAnswerBoxGroupProps {
  boxes: QuickAnswerBoxProps[];
  title?: string;
  className?: string;
  columns?: 1 | 2 | 3;
  mobileCollapse?: boolean;
}

export function QuickAnswerBox({
  question,
  answer,
  answerJsx,
  icon: Icon = HelpCircle,
  defaultOpen = false,
  className,
  keywords = [],
  relatedLink,
  image,
  imageAlt,
  id
}: QuickAnswerBoxProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedback = (isHelpful: boolean) => {
    setHelpful(isHelpful);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  // Generate unique ID for ARIA if not provided
  const answerId = id || `answer-${question.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300',
        'hover:shadow-lg hover:scale-[1.02]',
        'border-brand-blue/20 bg-gradient-to-br from-white to-blue-50/30',
        'dark:from-gray-900 dark:to-blue-950/30',
        isOpen && 'shadow-md',
        className
      )}
    >
      {/* Schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: answer
            }
          })
        }}
      />

      {/* Question Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 text-left flex items-start gap-3 transition-colors"
        aria-expanded={isOpen}
        aria-controls={answerId}
        data-testid={`button-quickanswer-${id}`}
      >
        <div className="flex-shrink-0 mt-0.5">
          <div className="relative">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-blue" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
          </div>
        </div>
        
        <div className="flex-1 pr-2">
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white leading-snug">
            {question}
          </h3>
          {/* Show brief preview when collapsed on mobile */}
          {!isOpen && typeof answer === 'string' && (
            <p className="sm:hidden mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
              {answer.substring(0, 50)}...
            </p>
          )}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>

      {/* Answer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-11 sm:pl-14">
              {/* Answer text with keyword highlighting */}
              <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                {answerJsx || (
                  <p>
                    {typeof answer === 'string' ? answer.split(' ').map((word, i) => {
                      const isKeyword = keywords.some(kw => 
                        word.toLowerCase().includes(kw.toLowerCase())
                      );
                      return (
                        <span key={i}>
                          {isKeyword ? (
                            <strong className="font-semibold text-brand-blue">
                              {word}
                            </strong>
                          ) : (
                            word
                          )}
                          {' '}
                        </span>
                      );
                    }) : answer}
                  </p>
                )}
              </div>

              {/* Optional image */}
              {image && (
                <div className="mt-3">
                  <img
                    src={image}
                    alt={imageAlt || 'Related image'}
                    className="rounded-lg w-full max-w-xs h-auto"
                    loading="lazy"
                    width={320}
                    height={180}
                  />
                </div>
              )}

              {/* Related link */}
              {relatedLink && (
                <div className="mt-3">
                  <a
                    href={relatedLink.href}
                    className="inline-flex items-center gap-1 text-sm text-brand-blue hover:underline font-medium"
                    data-testid={`link-quickanswer-related-${id}`}
                  >
                    {relatedLink.text}
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </a>
                </div>
              )}

              {/* Feedback section */}
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                {!showFeedback ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Was this helpful?</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(true)}
                      className="h-7 px-2"
                      data-testid={`button-helpful-yes-${id}`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(false)}
                      className="h-7 px-2"
                      data-testid={`button-helpful-no-${id}`}
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Thanks for your feedback!
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-bl-full pointer-events-none" />
    </Card>
  );
}

export function QuickAnswerBoxGroup({
  boxes,
  title,
  className,
  columns = 2,
  mobileCollapse = true
}: QuickAnswerBoxGroupProps) {
  const [allOpen, setAllOpen] = useState(false);

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <div className={cn('space-y-4', className)} data-testid="quickanswer-group">
      {/* Group header */}
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-brand-blue" />
            {title}
          </h2>
          {boxes.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAllOpen(!allOpen)}
              className="text-xs"
              data-testid="button-expand-all"
            >
              {allOpen ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5 mr-1" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5 mr-1" />
                  Expand All
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Question boxes grid */}
      <div className={cn('grid gap-3 sm:gap-4', gridCols[columns])}>
        {boxes.map((box, index) => (
          <QuickAnswerBox
            key={box.id || index}
            {...box}
            defaultOpen={allOpen || box.defaultOpen}
            className={cn(
              mobileCollapse && index > 1 && 'hidden sm:block',
              box.className
            )}
          />
        ))}
      </div>

      {/* Show more on mobile */}
      {mobileCollapse && boxes.length > 2 && (
        <div className="sm:hidden text-center">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              // You could implement a show more functionality here
            }}
            data-testid="button-show-more-mobile"
          >
            View More Questions
          </Button>
        </div>
      )}

      {/* NOTE: FAQPage schema removed to prevent GSC "Duplicate field 'FAQPage'" errors.
          All FAQ schemas are now handled centrally via SSR from attached_assets/schema_data/ files.
          See server/schemaLoader.ts for the single source of truth. */}
    </div>
  );
}
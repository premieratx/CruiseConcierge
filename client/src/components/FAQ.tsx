import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

export interface FAQItem {
  id: string;
  question: string;
  answer: string | JSX.Element;
  category?: string;
}

export interface FAQCategory {
  name: string;
  description?: string;
  items: FAQItem[];
}

interface FAQProps {
  items?: FAQItem[];
  categories?: FAQCategory[];
  className?: string;
  defaultOpenItems?: string[];
  showCategories?: boolean;
  compact?: boolean;
}

export default function FAQ({ 
  items, 
  categories, 
  className,
  defaultOpenItems = [],
  showCategories = true,
  compact = false
}: FAQProps) {
  // If items are provided directly, create a single category
  const faqCategories: FAQCategory[] = categories || (items ? [{
    name: 'Frequently Asked Questions',
    items
  }] : []);

  if (!faqCategories.length) return null;

  return (
    <div className={cn("space-y-8", className)}>
      {faqCategories.map((category, categoryIndex) => (
        <div key={category.name} className="space-y-4">
          {showCategories && faqCategories.length > 1 && (
            <div className="space-y-2">
              <h2 className={cn(
                "font-bold tracking-tight text-gray-900 dark:text-white",
                compact ? "text-xl" : "text-2xl"
              )}>
                {category.name}
              </h2>
              {category.description && (
                <p className="text-muted-foreground">{category.description}</p>
              )}
            </div>
          )}
          
          <Accordion 
            type="multiple" 
            defaultValue={defaultOpenItems}
            className="space-y-4"
          >
            {category.items.map((item, itemIndex) => {
              const itemKey = `${categoryIndex}-${itemIndex}-${item.id}`;
              return (
                <AccordionItem 
                  key={itemKey} 
                  value={itemKey}
                  className="border rounded-lg px-4 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className={cn(
                    "text-left hover:no-underline",
                    compact ? "py-3 text-sm" : "py-4"
                  )}>
                    <h3 className={cn(
                      "font-semibold text-gray-900 dark:text-white pr-4",
                      compact ? "text-sm" : "text-base"
                    )}>
                      {item.question}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className={cn(
                    "text-gray-700 dark:text-gray-300 leading-relaxed",
                    compact ? "pb-3 text-sm" : "pb-4"
                  )}>
                    {typeof item.answer === 'string' ? (
                      <p>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      ))}
    </div>
  );
}

// Export function to generate FAQ schema for SEO
export function generateFAQSchema(items: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' 
          ? item.answer 
          : '' // For JSX answers, schema should use plain text
      }
    }))
  };
}
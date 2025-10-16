import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export type FeaturedSnippetFormat = 'paragraph' | 'list' | 'table';

interface TableRow {
  label: string;
  value: string;
  highlighted?: boolean;
}

interface FeaturedSnippetProps {
  question: string;
  answer?: string | React.ReactNode; // For paragraph format - can be string or JSX
  listItems?: string[]; // For list format
  tableData?: TableRow[]; // For table format
  format: FeaturedSnippetFormat;
  ordered?: boolean; // For list format (true = ol, false = ul)
  className?: string;
  schemaType?: 'HowTo' | 'FAQ';
  position?: number; // Position in FAQ list
}

export function FeaturedSnippet({
  question,
  answer,
  listItems,
  tableData,
  format,
  ordered = false,
  className,
  schemaType,
  position = 1
}: FeaturedSnippetProps) {
  // Generate schema markup
  const generateSchemaMarkup = () => {
    if (!schemaType) return null;

    if (schemaType === 'FAQ') {
      // Extract text from answer - handle both string and JSX
      let answerText = '';
      if (typeof answer === 'string') {
        answerText = answer;
      } else if (listItems) {
        answerText = listItems.join(' ');
      }
      // For JSX answers, we skip schema or use a placeholder
      
      return {
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answerText || question // Use question as fallback if answer is JSX
        }
      };
    }

    if (schemaType === 'HowTo' && listItems) {
      return {
        "@type": "HowToStep",
        "name": question,
        "itemListElement": listItems.map((item, index) => ({
          "@type": "HowToDirection",
          "text": item,
          "position": index + 1
        }))
      };
    }

    return null;
  };

  const schemaMarkup = generateSchemaMarkup();

  return (
    <div className={cn("featured-snippet", className)}>
      <Card className="border-2 border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 pt-4">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {question}
            </h2>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {format === 'paragraph' && answer && (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {typeof answer === 'string' ? (
                <>
                  <strong className="text-gray-900 dark:text-gray-100">{answer.split('.')[0]}.</strong>
                  {answer.substring(answer.indexOf('.') + 1)}
                </>
              ) : (
                answer
              )}
            </p>
          )}

          {format === 'list' && listItems && (
            <>
              {ordered ? (
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {listItems.map((item, index) => (
                    <li key={index} className="leading-relaxed">
                      <span className="ml-1">{item}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {listItems.map((item, index) => (
                    <li key={index} className="leading-relaxed">
                      <span className="ml-1">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {format === 'table' && tableData && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {tableData.map((row, index) => (
                    <tr 
                      key={index} 
                      className={cn(
                        "border-b border-gray-200 dark:border-gray-700 last:border-0",
                        row.highlighted && "bg-yellow-50 dark:bg-yellow-900/20"
                      )}
                    >
                      <td className="py-2 pr-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        {row.label}
                      </td>
                      <td className="py-2 text-gray-700 dark:text-gray-300 font-semibold">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Invisible schema markup */}
          {schemaMarkup && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
              className="hidden"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Wrapper component for multiple FAQ snippets with proper schema
export function FeaturedSnippetFAQGroup({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("featured-snippet-group", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": []
          })
        }}
        className="hidden"
      />
      {children}
    </div>
  );
}

// Wrapper component for HowTo snippets with proper schema
export function FeaturedSnippetHowTo({ 
  title,
  description,
  steps,
  className 
}: { 
  title: string;
  description: string;
  steps: string[];
  className?: string;
}) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "text": step,
      "position": index + 1
    }))
  };

  return (
    <div className={cn("featured-snippet-howto", className)}>
      <Card className="border-2 border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 pt-4">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {title}
            </h2>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">{description}</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {steps.map((step, index) => (
              <li key={index} className="leading-relaxed">
                <span className="ml-1">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        className="hidden"
      />
    </div>
  );
}
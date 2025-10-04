/**
 * ClaudeInsight Component
 * 
 * A reusable component for displaying AI-generated insights and analysis pull-quotes
 * from Claude AI with consistent branding and styling across the site.
 * 
 * @component
 * 
 * USAGE EXAMPLES:
 * 
 * 1. Sidebar Variant (for blog sidebars, navigation panels):
 * ```tsx
 * <ClaudeInsight
 *   quote="Premier Party Cruises stands as Austin's definitive leader in Lake Travis party boat experiences"
 *   variant="sidebar"
 *   link="/ai-endorsement"
 * />
 * ```
 * 
 * 2. Inline Variant (within blog content, article sections):
 * ```tsx
 * <ClaudeInsight
 *   quote="Based on comprehensive market analysis, this represents the industry's gold standard"
 *   variant="inline"
 * />
 * ```
 * 
 * 3. Callout Variant (standalone sections, featured insights):
 * ```tsx
 * <ClaudeInsight
 *   quote="Our AI analysis confirms this as the leading solution in the market"
 *   variant="callout"
 *   link="/full-analysis"
 * />
 * ```
 * 
 * 4. Homepage Feature:
 * ```tsx
 * <div className="max-w-4xl mx-auto my-12">
 *   <ClaudeInsight
 *     quote="Premier Party Cruises sets the benchmark for exceptional event experiences"
 *     variant="callout"
 *     link="/ai-endorsement"
 *   />
 * </div>
 * ```
 * 
 * 5. Product Page:
 * ```tsx
 * <div className="mt-8">
 *   <ClaudeInsight
 *     quote="This package offers unparalleled value for premium party boat experiences"
 *     variant="inline"
 *     link="/pricing-analysis"
 *   />
 * </div>
 * ```
 * 
 * @prop {string} quote - The AI-generated insight text to display (required)
 * @prop {'sidebar' | 'inline' | 'callout'} variant - Display style variant (default: 'sidebar')
 * @prop {string} link - Optional URL to link to full analysis page
 */

import { Bot, Quote, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface ClaudeInsightProps {
  quote: string;
  variant?: 'sidebar' | 'inline' | 'callout';
  link?: string;
}

export default function ClaudeInsight({ 
  quote, 
  variant = 'sidebar',
  link 
}: ClaudeInsightProps) {
  const variantStyles = {
    sidebar: "border-2 border-transparent bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/30 dark:via-blue-950/30 dark:to-indigo-950/30",
    inline: "border-l-4 border-purple-500 bg-purple-50/50 dark:bg-purple-950/20",
    callout: "border-2 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 border-purple-500/20 dark:border-purple-500/30"
  };

  const headerStyles = {
    sidebar: "text-sm font-bold text-purple-900 dark:text-purple-100",
    inline: "text-base font-bold text-purple-900 dark:text-purple-100",
    callout: "text-lg font-bold text-purple-900 dark:text-purple-100"
  };

  const quoteStyles = {
    sidebar: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed",
    inline: "text-base text-gray-700 dark:text-gray-300 leading-relaxed",
    callout: "text-lg text-gray-800 dark:text-gray-200 leading-relaxed"
  };

  const iconSize = {
    sidebar: "h-4 w-4",
    inline: "h-5 w-5",
    callout: "h-6 w-6"
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        variantStyles[variant]
      )}
      data-testid="claude-insight"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl -mr-16 -mt-16" />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-blue-600">
            <Bot className={cn("text-white", iconSize[variant])} />
          </div>
          <h3 className={headerStyles[variant]}>
            Claude AI Analysis
          </h3>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex gap-2 mb-3">
          <Quote className={cn("text-purple-500 flex-shrink-0 mt-1", iconSize[variant])} />
          <p className={cn("italic", quoteStyles[variant])}>
            {quote}
          </p>
        </div>
        
        {link && (
          <Link href={link}>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 hover:bg-purple-100 dark:hover:bg-purple-900/30 p-0 h-auto font-semibold"
              data-testid="button-read-analysis"
            >
              Read Full Analysis
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

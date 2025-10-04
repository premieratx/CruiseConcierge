/**
 * DiscoInsight Component
 * 
 * A reusable component for displaying ATX Disco Cruise insights and highlights
 * with consistent branding and styling across the site. Designed to promote
 * the ATX Disco Cruise experience in blog posts and various pages.
 * 
 * @component
 * 
 * USAGE EXAMPLES:
 * 
 * 1. Default Variant (for blog sidebars, general widgets):
 * ```tsx
 * <DiscoInsight variant="default" showCTA={true} />
 * ```
 * 
 * 2. Compact Variant (for tight spaces, inline content):
 * ```tsx
 * <DiscoInsight variant="compact" showCTA={false} />
 * ```
 * 
 * 3. Featured Variant (for prominent placements, hero sections):
 * ```tsx
 * <DiscoInsight variant="featured" showCTA={true} />
 * ```
 * 
 * @prop {'default' | 'compact' | 'featured'} variant - Display style variant (default: 'default')
 * @prop {boolean} showCTA - Whether to show the CTA button (default: true)
 * @prop {string} className - Additional CSS classes for customization
 */

import { Sparkles, Award, ArrowRight, Star, Disc3 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface DiscoInsightProps {
  variant?: 'default' | 'compact' | 'featured';
  showCTA?: boolean;
  className?: string;
}

// Rotating highlight quotes from Claude AI analysis
const highlightQuotes = [
  "The single most unique and comprehensive bachelor/bachelorette party experience in the United States",
  "Only all-inclusive, multi-group bachelor/bachelorette party cruise in the country",
  "3-5x better value than private rentals with professional DJ and photographer included",
  "100% satisfaction track record with thousands of groups served nationwide",
  "Single-handedly making Austin a top-tier bachelor & bachelorette destination",
  "Industry's only weather guarantee with Lemonade Disco backup plan"
];

export default function DiscoInsight({ 
  variant = 'default',
  showCTA = true,
  className
}: DiscoInsightProps) {
  // Randomly select a quote (using date-based selection for consistency during page session)
  const quoteIndex = Math.floor(Date.now() / (1000 * 60 * 60)) % highlightQuotes.length;
  const selectedQuote = highlightQuotes[quoteIndex];

  const variantStyles = {
    default: "border-2 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-pink-950/20 border-yellow-500/30",
    compact: "border-l-4 border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20",
    featured: "border-2 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-pink-500/10 border-yellow-500/30 dark:border-yellow-500/40"
  };

  const headerStyles = {
    default: "text-sm font-bold text-yellow-900 dark:text-yellow-100",
    compact: "text-xs font-bold text-yellow-900 dark:text-yellow-100",
    featured: "text-lg font-bold text-yellow-900 dark:text-yellow-100"
  };

  const titleStyles = {
    default: "text-base font-extrabold text-gray-900 dark:text-white",
    compact: "text-sm font-bold text-gray-900 dark:text-white",
    featured: "text-xl font-extrabold text-gray-900 dark:text-white"
  };

  const quoteStyles = {
    default: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed",
    compact: "text-xs text-gray-700 dark:text-gray-300 leading-snug",
    featured: "text-base text-gray-800 dark:text-gray-200 leading-relaxed"
  };

  const iconSize = {
    default: "h-5 w-5",
    compact: "h-4 w-4",
    featured: "h-6 w-6"
  };

  const badgeSize = {
    default: "text-xs px-2 py-0.5",
    compact: "text-[10px] px-1.5 py-0.5",
    featured: "text-sm px-3 py-1"
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
        variantStyles[variant],
        className
      )}
      data-testid="disco-insight"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl -mr-16 -mt-16" />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600">
              <Disc3 className={cn("text-white", iconSize[variant])} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className={headerStyles[variant]}>Featured in Claude AI Analysis</span>
              </div>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={cn(
              "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0 font-bold",
              badgeSize[variant]
            )}
          >
            10/10
          </Badge>
        </div>
        
        <h3 className={cn("flex items-center gap-2", titleStyles[variant])}>
          <Sparkles className={iconSize[variant]} />
          ATX Disco Cruise: America's Best Bach Party Experience
        </h3>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex gap-2 mb-3">
          <Award className={cn("text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-1", iconSize[variant])} />
          <p className={cn("italic", quoteStyles[variant])}>
            {selectedQuote}
          </p>
        </div>
        
        {showCTA && (
          <Link href="/atx-disco-cruise">
            <Button
              variant="default"
              size={variant === 'compact' ? 'sm' : 'default'}
              className="mt-2 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white border-0 font-bold w-full sm:w-auto"
              data-testid="button-disco-analysis"
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

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export interface ComparisonColumn {
  id: string;
  title: string;
  subtitle?: string;
  recommended?: boolean;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  };
}

export interface ComparisonRow {
  feature: string;
  tooltip?: string;
  values: (string | boolean | { text: string; highlight?: boolean })[];
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  caption?: string;
  summary?: string;
  className?: string;
  mobileView?: 'scroll' | 'cards'; // scroll for horizontal scroll, cards for stacked cards
  schemaType?: 'Product' | 'Service' | 'Event';
  ariaLabel?: string;
  highlightBest?: boolean;
}

export function ComparisonTable2({
  columns,
  rows,
  caption,
  summary,
  className,
  mobileView = 'scroll',
  schemaType = 'Product',
  ariaLabel,
  highlightBest = true
}: ComparisonTableProps) {
  const renderCellValue = (value: string | boolean | { text: string; highlight?: boolean }) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" aria-label="Yes" />
      ) : (
        <X className="w-5 h-5 text-red-500 dark:text-red-400 mx-auto" aria-label="No" />
      );
    }
    
    if (typeof value === 'object' && 'text' in value) {
      return (
        <span className={cn(
          value.highlight && "font-semibold text-primary"
        )}>
          {value.text}
        </span>
      );
    }
    
    return <span>{value}</span>;
  };

  // Desktop and tablet view - traditional table
  const DesktopTable = () => (
    <div 
      className={cn(
        "relative overflow-x-auto rounded-lg border",
        className
      )}
      role="region"
      aria-label={ariaLabel || "Comparison table"}
    >
      <table 
        className="w-full text-sm" 
        summary={summary}
      >
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead className="bg-muted/50 border-b">
          <tr>
            <th 
              scope="col" 
              className="px-4 py-3 text-left font-medium text-muted-foreground sticky left-0 bg-muted/50 z-10"
            >
              Feature
            </th>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={cn(
                  "px-4 py-3 text-center font-medium",
                  column.recommended && "bg-primary/5"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-semibold text-foreground">
                      {column.title}
                    </span>
                    {column.recommended && highlightBest && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-label="Recommended" />
                    )}
                  </div>
                  {column.subtitle && (
                    <div className="text-xs text-muted-foreground">
                      {column.subtitle}
                    </div>
                  )}
                  {column.badge && (
                    <Badge 
                      variant={column.badge.variant || 'default'} 
                      className="text-xs"
                    >
                      {column.badge.text}
                    </Badge>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={cn(
                "border-b hover:bg-muted/30 transition-colors",
                rowIndex % 2 === 0 ? "bg-background" : "bg-muted/10"
              )}
            >
              <td 
                className="px-4 py-3 font-medium text-left sticky left-0 z-10"
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? 'hsl(var(--background))' : 'hsl(var(--muted) / 0.1)'
                }}
              >
                <span className="flex items-center gap-2">
                  {row.feature}
                  {row.tooltip && (
                    <span 
                      className="text-xs text-muted-foreground" 
                      title={row.tooltip}
                      aria-label={`Info: ${row.tooltip}`}
                    >
                      ⓘ
                    </span>
                  )}
                </span>
              </td>
              {row.values.map((value, colIndex) => (
                <td
                  key={colIndex}
                  className={cn(
                    "px-4 py-3 text-center",
                    columns[colIndex]?.recommended && "bg-primary/5"
                  )}
                >
                  {renderCellValue(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Mobile view - stacked cards
  const MobileCards = () => (
    <div className="space-y-4 md:hidden">
      {columns.map((column, colIndex) => (
        <Card 
          key={column.id} 
          className={cn(
            "relative overflow-hidden",
            column.recommended && "ring-2 ring-primary"
          )}
        >
          {column.recommended && highlightBest && (
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
              Recommended
            </div>
          )}
          <CardContent className="p-4">
            <div className="mb-4 text-center">
              <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
                {column.title}
                {column.recommended && highlightBest && (
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                )}
              </h3>
              {column.subtitle && (
                <p className="text-sm text-muted-foreground mt-1">
                  {column.subtitle}
                </p>
              )}
              {column.badge && (
                <Badge 
                  variant={column.badge.variant || 'default'} 
                  className="mt-2"
                >
                  {column.badge.text}
                </Badge>
              )}
            </div>
            <div className="space-y-3">
              {rows.map((row, rowIndex) => (
                <div 
                  key={rowIndex} 
                  className={cn(
                    "flex justify-between items-center py-2 px-3 rounded",
                    rowIndex % 2 === 0 ? "bg-muted/20" : ""
                  )}
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {row.feature}
                  </span>
                  <span className="text-sm font-medium">
                    {renderCellValue(row.values[colIndex])}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Mobile horizontal scroll view
  const MobileScroll = () => (
    <div className="md:hidden overflow-x-auto">
      <DesktopTable />
    </div>
  );

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block">
        <DesktopTable />
      </div>
      
      {/* Mobile view */}
      {mobileView === 'cards' ? <MobileCards /> : <MobileScroll />}
    </>
  );
}

// Export specific comparison configurations for reuse
export const DiscoVsPrivateComparison: ComparisonRow[] = [
  {
    feature: "Price Range",
    values: [
      { text: "$85-$125 per person", highlight: true },
      { text: "$263-$459+ per hour" }
    ]
  },
  {
    feature: "Group Size",
    values: [
      "8-30 people typical",
      "1-75 people"
    ]
  },
  {
    feature: "Duration",
    values: [
      "4 hours fixed",
      "4+ hours flexible"
    ]
  },
  {
    feature: "Music/DJ",
    values: [
      true,
      false
    ]
  },
  {
    feature: "Professional Photographer",
    values: [
      true,
      false
    ]
  },
  {
    feature: "Food Options",
    values: [
      "Alcohol delivery available",
      "Bring your own, coordinate catering, or we can help"
    ]
  },
  {
    feature: "Customization",
    values: [
      "Limited",
      "Full control"
    ]
  },
  {
    feature: "Best For",
    values: [
      "Bach parties, social groups",
      "Any private event"
    ]
  },
  {
    feature: "Booking Type",
    values: [
      "Per person tickets",
      "Charter entire boat"
    ]
  },
  {
    feature: "Availability",
    values: [
      "Fri, Sat, Sun only",
      "7 days a week"
    ]
  }
];

export const FleetComparison: ComparisonRow[] = [
  {
    feature: "Capacity",
    values: [
      "1-14 guests",
      "15-25 guests",
      "31-75 guests",
      "15-30 guests"
    ]
  },
  {
    feature: "Boat Size",
    values: [
      "Intimate",
      "Medium",
      "Flagship Large",
      "Medium Plus"
    ]
  },
  {
    feature: "Amenities",
    values: [
      "Sound system, coolers",
      "Premium sound, spacious",
      "14 disco balls, Texas flag",
      "Dual decks, comfort seating"
    ]
  },
  {
    feature: "Best For Events",
    values: [
      "Small birthdays, dates",
      "Bach parties, friends",
      "Corporate, large groups",
      "Mixed groups, comfort"
    ]
  },
  {
    feature: "Price Tier",
    values: [
      { text: "$263/hr", highlight: true },
      "$295/hr",
      "$353/hr",
      "$295/hr"
    ]
  },
  {
    feature: "Marina Location",
    values: [
      "Anderson Mill",
      "Anderson Mill",
      "Anderson Mill",
      "Anderson Mill"
    ]
  }
];

export const BachelorettePackages: ComparisonRow[] = [
  {
    feature: "Price",
    values: [
      { text: "$85/person", highlight: true },
      "$95/person",
      "$125/person"
    ]
  },
  {
    feature: "What's Included",
    values: [
      "DJ, photographer, floats",
      "Everything + private cooler",
      "Everything + mimosa bar"
    ]
  },
  {
    feature: "Duration",
    values: [
      "4 hours",
      "4 hours",
      "4 hours"
    ]
  },
  {
    feature: "Cooler Service",
    values: [
      "Shared cooler",
      "Private cooler for group",
      "Pre-stocked cooler"
    ]
  },
  {
    feature: "Group Size",
    values: [
      "8+ people",
      "8+ people",
      "8+ people"
    ]
  },
  {
    feature: "Best For",
    values: [
      "Budget-conscious groups",
      { text: "Most popular choice", highlight: true },
      "VIP all-inclusive experience"
    ]
  },
  {
    feature: "Extras",
    values: [
      "BYOB",
      "Disco cups, bubble gun",
      "Champagne setup, towels, sunscreen"
    ]
  }
];
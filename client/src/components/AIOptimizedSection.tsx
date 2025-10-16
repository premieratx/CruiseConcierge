import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Check, 
  Star, 
  Users, 
  Clock, 
  Calendar, 
  MapPin, 
  DollarSign,
  Info,
  Target,
  TrendingUp,
  Award,
  Shield,
  Waves,
  Sun
} from 'lucide-react';

// Type definitions for different content blocks
interface StatisticItem {
  value: string;
  label: string;
  icon?: ReactNode;
  itemProp?: string;
}

interface StructuredListItem {
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: string;
  highlighted?: boolean;
}

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  icon?: ReactNode;
  duration?: string;
}

interface QuestionAnswer {
  question: string;
  answer: string;
  category?: string;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

interface AIOptimizedSectionProps {
  type: 'statistics' | 'list' | 'timeline' | 'qa' | 'pricing' | 'definition' | 'comparison';
  title?: string;
  description?: string;
  data: any;
  className?: string;
  schemaType?: 'Service' | 'Event' | 'Product' | 'FAQPage' | 'Organization' | 'LocalBusiness';
  structuredData?: object;
}

// Statistics Block Component
const StatisticsBlock = ({ items, title }: { items: StatisticItem[], title?: string }) => {
  return (
    <div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      itemScope 
      itemType="https://schema.org/AggregateRating"
    >
      {items.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
          itemProp={stat.itemProp}
        >
          <div className="flex justify-center mb-2 text-purple-600">
            {stat.icon}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white" data-value={stat.value}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400" data-label={stat.label}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// Structured List Block Component
const StructuredListBlock = ({ items }: { items: StructuredListItem[] }) => {
  return (
    <div className="space-y-4" itemScope itemType="https://schema.org/ItemList">
      {items.map((item, index) => (
        <div 
          key={index}
          className={cn(
            "flex items-start space-x-3 p-4 rounded-lg",
            "bg-white dark:bg-gray-800",
            item.highlighted && "border-2 border-purple-500 shadow-md"
          )}
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <meta itemProp="position" content={String(index + 1)} />
          <div className="flex-shrink-0 text-purple-600">
            {item.icon || <Check className="w-5 h-5" />}
          </div>
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white" itemProp="name">
                {item.title}
              </h4>
              {item.badge && (
                <Badge variant="secondary" className="ml-2">
                  {item.badge}
                </Badge>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1" itemProp="description">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Timeline Block Component  
const TimelineBlock = ({ items }: { items: TimelineItem[] }) => {
  return (
    <div className="relative" itemScope itemType="https://schema.org/Schedule">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
      {items.map((item, index) => (
        <div 
          key={index} 
          className="relative flex items-start mb-8"
          itemScope
          itemType="https://schema.org/Event"
        >
          <div className="absolute left-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            {item.icon || <Clock className="w-4 h-4 text-white" />}
          </div>
          <div className="ml-12">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-sm font-medium text-purple-600" itemProp="startTime">
                {item.time}
              </span>
              {item.duration && (
                <Badge variant="outline" className="text-xs">
                  {item.duration}
                </Badge>
              )}
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1" itemProp="name">
              {item.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400" itemProp="description">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Q&A Block Component
const QABlock = ({ items }: { items: QuestionAnswer[] }) => {
  return (
    <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
      {items.map((qa, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg p-5"
          itemScope 
          itemProp="mainEntity" 
          itemType="https://schema.org/Question"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-start">
            <span className="text-purple-600 mr-2">Q:</span>
            <span itemProp="name">{qa.question}</span>
          </h4>
          <div 
            className="text-gray-600 dark:text-gray-400 flex items-start"
            itemScope 
            itemProp="acceptedAnswer" 
            itemType="https://schema.org/Answer"
          >
            <span className="text-purple-600 mr-2">A:</span>
            <span itemProp="text">{qa.answer}</span>
          </div>
          {qa.category && (
            <Badge variant="outline" className="mt-2 text-xs">
              {qa.category}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};

// Pricing Block Component
const PricingBlock = ({ items }: { items: PricingTier[] }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((tier, index) => (
        <Card 
          key={index}
          className={cn(
            "relative",
            tier.recommended && "border-purple-500 border-2"
          )}
          itemScope
          itemType="https://schema.org/Offer"
        >
          {tier.recommended && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              Recommended
            </Badge>
          )}
          <CardHeader>
            <CardTitle itemProp="name">{tier.name}</CardTitle>
            <div className="text-2xl font-bold text-purple-600" itemProp="price">
              {tier.price}
            </div>
            <CardDescription itemProp="description">{tier.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Definition Block Component
const DefinitionBlock = ({ term, definition, context }: { term: string; definition: string; context?: string }) => {
  return (
    <div 
      className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500"
      itemScope
      itemType="https://schema.org/DefinedTerm"
    >
      <div className="flex items-start">
        <Info className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            <span itemProp="name">{term}</span>
          </h4>
          <p className="text-gray-700 dark:text-gray-300" itemProp="description">
            {definition}
          </p>
          {context && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
              Context: {context}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Comparison Block Component
const ComparisonBlock = ({ items, headers }: { items: any[]; headers: string[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {headers.map((header, index) => (
              <th key={index} className="border p-3 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              {Object.values(row).map((cell: any, cellIndex) => (
                <td key={cellIndex} className="border p-3">
                  {typeof cell === 'boolean' ? (
                    cell ? <Check className="w-5 h-5 text-green-500" /> : <span className="text-gray-400">—</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main AIOptimizedSection Component
const AIOptimizedSection: React.FC<AIOptimizedSectionProps> = ({
  type,
  title,
  description,
  data,
  className,
  schemaType,
  structuredData
}) => {
  const renderContent = () => {
    switch (type) {
      case 'statistics':
        return <StatisticsBlock items={data} title={title} />;
      case 'list':
        return <StructuredListBlock items={data} />;
      case 'timeline':
        return <TimelineBlock items={data} />;
      case 'qa':
        return <QABlock items={data} />;
      case 'pricing':
        return <PricingBlock items={data} />;
      case 'definition':
        return <DefinitionBlock {...data} />;
      case 'comparison':
        return <ComparisonBlock items={data.items} headers={data.headers} />;
      default:
        return null;
    }
  };

  return (
    <section 
      className={cn("py-8", className)}
      aria-label={title}
    >
      {structuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      {renderContent()}
    </section>
  );
};

export default AIOptimizedSection;

// Export individual components for direct use
export {
  StatisticsBlock,
  StructuredListBlock,
  TimelineBlock,
  QABlock,
  PricingBlock,
  DefinitionBlock,
  ComparisonBlock,
  AIOptimizedSection
};
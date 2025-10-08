import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Ship, Users, Camera, Calendar, Sparkles, Crown } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  count: number;
  icon?: ComponentType<{ className?: string }>;
  description?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
  variant?: 'tabs' | 'pills' | 'cards';
  showCounts?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

const categoryIcons = {
  Fleet: Ship,
  Parties: Users,
  Scenery: Camera,
  Events: Calendar,
  Celebrations: Sparkles,
  VIP: Crown,
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
  variant = 'pills',
  showCounts = true,
  orientation = 'horizontal'
}: CategoryFilterProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (variant === 'cards') {
    return (
      <motion.div
        className={cn(
          "grid gap-4",
          orientation === 'horizontal' 
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" 
            : "grid-cols-1",
          className
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        data-testid="category-filter-cards"
      >
        {categories.map((category) => {
          const IconComponent = category.icon || categoryIcons[category.label as keyof typeof categoryIcons];
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.div key={category.id} variants={itemVariants}>
              <Button
                variant={isSelected ? 'default' : 'outline'}
                className={cn(
                  "w-full h-auto p-4 flex flex-col items-center gap-2 transition-all duration-200",
                  isSelected 
                    ? "bg-brand-yellow text-black hover:bg-brand-yellow/90 shadow-lg" 
                    : "hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md"
                )}
                onClick={() => onCategoryChange(category.id)}
                data-testid={`category-card-${category.id}`}
              >
                {IconComponent && (
                  <IconComponent className={cn(
                    "h-6 w-6",
                    isSelected ? "text-black" : "text-gray-600 dark:text-gray-400"
                  )} />
                )}
                
                <div className="text-center">
                  <div className={cn(
                    "font-medium",
                    isSelected ? "text-black" : "text-gray-900 dark:text-white"
                  )}>
                    {category.label}
                  </div>
                  
                  {showCounts && (
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "mt-1 text-xs",
                        isSelected 
                          ? "bg-black/10 text-black" 
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      )}
                    >
                      {category.count}
                    </Badge>
                  )}
                  
                  {category.description && (
                    <div className={cn(
                      "text-xs mt-1 line-clamp-2",
                      isSelected ? "text-black/70" : "text-gray-500 dark:text-gray-400"
                    )}>
                      {category.description}
                    </div>
                  )}
                </div>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  if (variant === 'tabs') {
    return (
      <motion.div
        className={cn(
          "flex border-b border-gray-200 dark:border-gray-800",
          orientation === 'vertical' && "flex-col border-b-0 border-r",
          className
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        data-testid="category-filter-tabs"
      >
        {categories.map((category) => {
          const IconComponent = category.icon || categoryIcons[category.label as keyof typeof categoryIcons];
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.div key={category.id} variants={itemVariants}>
              <Button
                variant="ghost"
                className={cn(
                  "relative px-4 py-3 rounded-none border-b-2 transition-all duration-200",
                  orientation === 'vertical' && "w-full justify-start border-b-0 border-r-2",
                  isSelected 
                    ? "text-brand-blue border-brand-blue bg-brand-blue/5" 
                    : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
                onClick={() => onCategoryChange(category.id)}
                data-testid={`category-tab-${category.id}`}
              >
                <div className="flex items-center gap-2">
                  {IconComponent && (
                    <IconComponent className="h-4 w-4" />
                  )}
                  <span className="font-medium">{category.label}</span>
                  {showCounts && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  )}
                </div>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // Default: pills variant
  return (
    <motion.div
      className={cn(
        "flex flex-wrap gap-2",
        orientation === 'vertical' && "flex-col items-start",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="category-filter-pills"
    >
      {categories.map((category) => {
        const IconComponent = category.icon || categoryIcons[category.label as keyof typeof categoryIcons];
        const isSelected = selectedCategory === category.id;
        
        return (
          <motion.div key={category.id} variants={itemVariants}>
            <Button
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "transition-all duration-200",
                isSelected 
                  ? "bg-brand-yellow text-black hover:bg-brand-yellow/90 shadow-lg" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
              onClick={() => onCategoryChange(category.id)}
              data-testid={`category-pill-${category.id}`}
            >
              <div className="flex items-center gap-2">
                {IconComponent && (
                  <IconComponent className="h-4 w-4" />
                )}
                <span>{category.label}</span>
                {showCounts && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "ml-1 text-xs",
                      isSelected 
                        ? "bg-black/10 text-black" 
                        : "bg-gray-100 dark:bg-gray-700"
                    )}
                  >
                    {category.count}
                  </Badge>
                )}
              </div>
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
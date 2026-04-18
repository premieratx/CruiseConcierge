import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  CheckCircle2,
  Sun,
  Shirt,
  GlassWater,
  Camera,
  Music,
  Package,
  XCircle,
  Info,
  PartyPopper,
  Utensils,
  Sparkles,
  Heart,
  AlertTriangle,
  Waves,
  Glasses,
  ShoppingBag,
  DollarSign,
  Footprints,
  Gift,
  Shield,
  Coffee,
  IceCream2
} from 'lucide-react';

interface WhatToBringItem {
  icon: typeof CheckCircle2;
  text: string;
  required?: boolean;
  tooltip?: string;
}

interface WhatToBringCategory {
  title: string;
  icon: typeof CheckCircle2;
  color: string;
  items: WhatToBringItem[];
}

interface WhatToBringProps {
  variant?: 'disco' | 'private' | 'bachelor' | 'bachelorette' | 'corporate' | 'birthday' | 'general';
  className?: string;
  title?: string;
  description?: string;
}

const generalCategories: WhatToBringCategory[] = [
  {
    title: 'Essentials',
    icon: Shield,
    color: 'text-blue-600',
    items: [
      { icon: Shield, text: 'Valid ID (21+ only)', required: true },
      { icon: Sun, text: 'Sunscreen SPF 30+', required: true },
      { icon: Waves, text: 'Swimsuit & towel', required: true },
      { icon: Glasses, text: 'Sunglasses', required: true },
      { icon: Shirt, text: 'Change of clothes' }
    ]
  },
  {
    title: 'Food & Drinks',
    icon: GlassWater,
    color: 'text-green-600',
    items: [
      { icon: GlassWater, text: 'BYOB (cans/plastic only)', tooltip: 'No glass bottles allowed' },
      { icon: Package, text: 'Cooler if desired', tooltip: 'We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company)' },
      { icon: Utensils, text: 'Snacks & food' },
      { icon: Coffee, text: 'Non-alcoholic beverages' },
      { icon: IceCream2, text: 'Ice (we provide but bring extra if needed)' }
    ]
  },
  {
    title: 'Comfort & Fun',
    icon: Sparkles,
    color: 'text-purple-600',
    items: [
      { icon: Shirt, text: 'Hat or cover-up' },
      { icon: Camera, text: 'Camera/phone for photos' },
      { icon: Music, text: 'Bluetooth speaker (optional)', tooltip: 'Boats have sound systems' },
      { icon: PartyPopper, text: 'Decorations (if allowed)' },
      { icon: Gift, text: 'Games or activities' }
    ]
  },
  {
    title: 'NOT Allowed',
    icon: XCircle,
    color: 'text-red-600',
    items: [
      { icon: XCircle, text: 'Glass bottles or containers' },
      { icon: AlertTriangle, text: 'Illegal substances' },
      { icon: XCircle, text: 'Weapons of any kind' },
      { icon: XCircle, text: 'Fireworks or flares' },
      { icon: XCircle, text: 'Pets (except service animals)' }
    ]
  }
];

const discoCategories: WhatToBringCategory[] = [
  {
    title: 'Disco Essentials',
    icon: Sparkles,
    color: 'text-purple-600',
    items: [
      { icon: Shield, text: 'Valid ID (21+ only)', required: true },
      { icon: PartyPopper, text: 'Party attire for themed night', required: true },
      { icon: Footprints, text: 'Dancing shoes', required: true },
      { icon: ShoppingBag, text: 'Small bag for personal items', tooltip: 'Limited storage on boat' },
      { icon: DollarSign, text: 'Cash for tips' }
    ]
  },
  {
    title: 'Sun Protection',
    icon: Sun,
    color: 'text-yellow-600',
    items: [
      { icon: Sun, text: 'Sunscreen SPF 30+', required: true },
      { icon: Glasses, text: 'Sunglasses', required: true },
      { icon: Shirt, text: 'Cover-up or hat' },
      { icon: Waves, text: 'Swimsuit & towel' }
    ]
  },
  {
    title: 'Party Supplies',
    icon: GlassWater,
    color: 'text-green-600',
    items: [
      { icon: GlassWater, text: 'BYOB (Basic package)', tooltip: 'Platinum includes drinks' },
      { icon: Camera, text: 'Phone for photos', tooltip: 'Professional photographer included' },
      { icon: Heart, text: 'Good vibes & energy!' }
    ]
  },
  {
    title: 'Leave at Home',
    icon: XCircle,
    color: 'text-red-600',
    items: [
      { icon: XCircle, text: 'Glass bottles' },
      { icon: XCircle, text: 'Large bags or luggage' },
      { icon: XCircle, text: 'Valuable jewelry' },
      { icon: XCircle, text: 'Bad attitudes' }
    ]
  }
];

const privateCategories: WhatToBringCategory[] = [
  {
    title: 'Required Items',
    icon: Shield,
    color: 'text-blue-600',
    items: [
      { icon: Shield, text: 'Valid ID for all 21+ guests', required: true },
      { icon: Sun, text: 'Sunscreen for everyone', required: true },
      { icon: Waves, text: 'Appropriate swim attire' }
    ]
  },
  {
    title: 'Customization',
    icon: Gift,
    color: 'text-purple-600',
    items: [
      { icon: Music, text: 'Custom playlist', tooltip: 'Bluetooth compatible sound system' },
      { icon: Utensils, text: 'Food & snacks', tooltip: 'Bring your own' },
      { icon: Camera, text: 'Photography equipment' },
      { icon: Gift, text: 'AV package available', tooltip: 'Microphone + projector/screen' }
    ]
  },
  {
    title: 'Food & Beverage',
    icon: GlassWater,
    color: 'text-green-600',
    items: [
      { icon: GlassWater, text: 'BYOB via Party On Delivery', tooltip: 'Beer, seltzers, cocktail kits delivered to boat' },
      { icon: Package, text: 'Extra ice if needed', tooltip: 'Essentials package includes ice' },
      { icon: Utensils, text: 'Food and snacks' },
      { icon: Coffee, text: 'Non-alcoholic options' }
    ]
  },
  {
    title: 'Prohibited',
    icon: XCircle,
    color: 'text-red-600',
    items: [
      { icon: XCircle, text: 'Glass containers' },
      { icon: XCircle, text: 'Red wine or staining beverages' },
      { icon: AlertTriangle, text: 'Confetti or glitter' },
      { icon: XCircle, text: 'Grills or open flames' }
    ]
  }
];

const corporateCategories: WhatToBringCategory[] = [
  {
    title: 'Professional Essentials',
    icon: Shield,
    color: 'text-blue-600',
    items: [
      { icon: Shield, text: 'Company badges or IDs' },
      { icon: Sun, text: 'Sun protection' },
      { icon: Shirt, text: 'Business casual attire' },
      { icon: Camera, text: 'Camera for team photos' }
    ]
  },
  {
    title: 'Team Building',
    icon: Heart,
    color: 'text-purple-600',
    items: [
      { icon: Gift, text: 'Team building materials' },
      { icon: Music, text: 'Presentation equipment', tooltip: 'If needed' },
      { icon: PartyPopper, text: 'Awards or recognition items' },
      { icon: Package, text: 'Company swag or gifts' }
    ]
  },
  {
    title: 'Refreshments',
    icon: Coffee,
    color: 'text-green-600',
    items: [
      { icon: Coffee, text: 'Coffee and soft drinks' },
      { icon: Utensils, text: 'Food & snacks', tooltip: 'Bring your own' },
      { icon: GlassWater, text: 'Alcoholic beverages', tooltip: 'If appropriate' },
      { icon: IceCream2, text: 'Desserts or treats' }
    ]
  }
];

export function WhatToBring({ 
  variant = 'general',
  className,
  title = "What to Bring",
  description = "Everything you need for an amazing time on the water"
}: WhatToBringProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const categories = (() => {
    switch (variant) {
      case 'disco':
        return discoCategories;
      case 'private':
        return privateCategories;
      case 'corporate':
        return corporateCategories;
      case 'bachelor':
      case 'bachelorette':
        return [
          ...generalCategories.slice(0, 3),
          {
            title: variant === 'bachelor' ? 'Bachelor Party' : 'Bachelorette Party',
            icon: Heart,
            color: 'text-pink-600',
            items: [
              { icon: PartyPopper, text: 'Party decorations' },
              { icon: Gift, text: 'Games and activities' },
              { icon: Camera, text: 'Props for photos' },
              { icon: Heart, text: `${variant === 'bachelor' ? 'Groom' : 'Bride'} sash/crown` },
              { icon: Sparkles, text: 'Good energy!' }
            ]
          },
          generalCategories[3]
        ];
      default:
        return generalCategories;
    }
  })();

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;
          const isProhibited = category.title.includes('NOT') || category.title.includes('Leave') || category.title.includes('Prohibited');
          
          return (
            <Card 
              key={categoryIndex}
              className={cn(
                "relative overflow-hidden transition-all hover:shadow-lg",
                isProhibited && "border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20"
              )}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    isProhibited ? "bg-red-100 dark:bg-red-900/50" : "bg-gray-100 dark:bg-gray-800"
                  )}>
                    <CategoryIcon className={cn("h-5 w-5", category.color)} />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const ItemIcon = item.icon;
                  const itemId = `${categoryIndex}-${itemIndex}`;
                  const isChecked = checkedItems.has(itemId);
                  
                  return (
                    <div
                      key={itemIndex}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg transition-all cursor-pointer",
                        !isProhibited && "hover:bg-gray-50 dark:hover:bg-gray-800",
                        isChecked && !isProhibited && "bg-green-50 dark:bg-green-950/30"
                      )}
                      onClick={() => !isProhibited && toggleCheck(itemId)}
                    >
                      <div className="flex-shrink-0">
                        {isProhibited ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : isChecked ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <ItemIcon className={cn("h-5 w-5", category.color)} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-sm",
                            isChecked && !isProhibited && "line-through text-gray-500"
                          )}>
                            {item.text}
                          </span>
                          {item.required && (
                            <Badge variant="destructive" className="text-xs py-0 h-5">
                              Required
                            </Badge>
                          )}
                        </div>
                        {item.tooltip && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.tooltip}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
        <CardContent className="flex items-start gap-3 pt-6">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold mb-1">Pro Tips:</p>
            <ul className="space-y-1 ml-4">
              <li>• Arrive 15 minutes early for smooth boarding</li>
              <li>• Pack light - space is limited on boats</li>
              <li>• Bring extra towels if you plan to swim</li>
              <li>• Consider waterproof phone cases</li>
              {variant === 'disco' && <li>• Platinum package includes drinks - no BYOB needed!</li>}
              {variant === 'private' && <li>• Contact us 48 hours before to coordinate special requests</li>}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
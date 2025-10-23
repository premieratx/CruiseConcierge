import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles, Crown, Star } from 'lucide-react';
import { Link } from 'wouter';

interface DiscoCruisePricingProps {
  className?: string;
}

// EXACT disco package details from knowledge base - NO BULLSHIT
const DISCO_PACKAGES = {
  basic: {
    name: 'Basic Bach Package',
    price: '$85',
    priceWithTax: '$111',
    description: 'Join the BEST Party on Lake Travis, Exclusively for Bach Parties!',
    icon: Star,
    popular: false,
    features: [
      'GIANT 25-ft Inflatable Unicorn Float - Biggest in the Country!',
      'Incredible DJ spinnin\' all day',
      'Pro Photographer & Free Photos',
      '3 Giant Lily Pads + Floaties',
      'Cups, Koozies, Bubbles, Name Tags',
      'Shared Community Coolers with Ice',
      'BYOB & Carry Drinks to the Boat',
      'Always cheaper than a Private Cruise'
    ]
  },
  queen: {
    name: 'Disco Queen Package',
    price: '$95',
    priceWithTax: '$124',
    description: 'Everything in Basic Bach PLUS Premium Upgrades',
    icon: Crown,
    popular: true,
    features: [
      'Everything in Basic Bach Package',
      'Private Cooler with Ice + Storage Bin',
      'Reserved Spot for Your Group',
      'Disco Ball Cup & Bubble Gun for the Bride',
      'Disco Visor & Necklace for the Groom',
      'Direct-to-Boat Alcohol Delivery Service Available',
      '25% Discount on Round-Trip Transportation'
    ]
  },
  sparkle: {
    name: 'Super Sparkle Platinum Package',
    price: '$105',
    priceWithTax: '$137',
    description: 'Everything in Disco Queen PLUS Ultimate VIP Experience',
    icon: Sparkles,
    popular: false,
    features: [
      'Everything in Disco Queen Package',
      'Personal Unicorn Float for Bride or Groom',
      'Mimosa Setup (w/ Champagne Flutes, 3 Juices, Chambong)',
      'Direct-to-Boat Alcohol Delivery Service Available',
      'Towel Service & SPF-50 Sunscreen Provided',
      'Cooler Stocked w/ Drinks When You Arrive — Nothing to Carry'
    ]
  }
};

export function DiscoCruisePricing({ className = '' }: DiscoCruisePricingProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(DISCO_PACKAGES).map(([key, pkg]) => {
          const Icon = pkg.icon;
          
          return (
            <Card
              key={key}
              className={`relative transition-all hover:shadow-xl ${
                pkg.popular ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              data-testid={`card-disco-${key}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/80 text-white px-3 py-1 rounded-bl-lg text-sm">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.description}</p>
                
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary" data-testid={`price-${key}`}>
                      {pkg.price}
                    </span>
                    <span className="text-gray-600">/person</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{pkg.priceWithTax} w/ tax & tip</p>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/atx-disco-cruise">
                  <Button 
                    className="w-full" 
                    variant={pkg.popular ? 'default' : 'outline'}
                    data-testid={`button-book-disco-${key}`}
                  >
                    Book {pkg.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Schedule Info */}
      <Card className="mt-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">ATX Disco Cruise Schedule (March - October)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">Friday</p>
              <p className="text-gray-600">12:00 PM – 4:00 PM</p>
            </div>
            <div>
              <p className="font-medium">Saturday Morning</p>
              <p className="text-gray-600">11:00 AM – 3:00 PM</p>
            </div>
            <div>
              <p className="font-medium">Saturday Evening</p>
              <p className="text-gray-600">3:30 PM – 7:30 PM</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">All cruises are 4 hours • Up to 100 passengers per cruise</p>
        </CardContent>
      </Card>
    </div>
  );
}

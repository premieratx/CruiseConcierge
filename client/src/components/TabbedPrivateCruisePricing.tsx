import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Ship, CreditCard, ArrowRight, Info } from 'lucide-react';
import { Link } from 'wouter';
import { formatCurrency } from '@shared/formatters';
import { HOURLY_RATES, PACKAGE_FLAT_FEES, CREW_FEES, PRICING_DEFAULTS } from '@shared/constants';
import { DayType } from '@shared/pricing';

interface TabbedPrivateCruisePricingProps {
  dayType?: DayType;
  duration?: number;
  className?: string;
}

// Package definitions with features
const PACKAGES = {
  standard: {
    id: 'standard',
    name: 'Standard Package',
    description: 'Essential cruise experience with professional crew and premium amenities',
    features: [
      'Professional captain & crew',
      'Large coolers (bring your ice)',
      'Premium Bluetooth sound system',
      'Clean restroom facilities',
      'Sun & shade areas',
      'BYOB friendly'
    ]
  },
  essentials: {
    id: 'essentials',
    name: 'Essentials Package',
    description: 'Enhanced cruise experience with refreshments and party essentials',
    popular: true,
    features: [
      'Everything in Standard',
      'Coolers pre-stocked with ice',
      '5-gallon water dispenser',
      'Solo cups & napkins included',
      '6-foot table for food/drinks',
      'Vendor coordination assistance'
    ]
  },
  ultimate: {
    id: 'ultimate',
    name: 'Ultimate Package',
    description: 'Complete party package with floats and entertainment extras',
    features: [
      'Everything in Essentials',
      'Giant lily pad float',
      'Unicorn/ring float',
      'Disco ball cups',
      'Bubble guns & wands',
      'Champagne flutes',
      'SPF-50 sunscreen',
      'Complete tableware set'
    ]
  }
} as const;

// Calculate total price with tax and gratuity
function calculateTotalPrice(baseHourly: number, duration: number, packageFee: number, crewFee: number) {
  const baseCost = baseHourly * duration;
  const subtotal = baseCost + packageFee + crewFee;
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
  const gratuity = Math.floor(baseCost * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  
  return {
    baseCost,
    packageFee,
    crewFee,
    subtotal,
    tax,
    gratuity,
    total: subtotal + tax + gratuity
  };
}

export function TabbedPrivateCruisePricing({
  dayType = 'MON_THU',
  duration = 4,
  className = ''
}: TabbedPrivateCruisePricingProps) {
  const [selectedBoat, setSelectedBoat] = useState<'14' | '25' | '50'>('14');
  
  // Boat configurations
  const boats = {
    '14': {
      name: 'Day Tripper',
      capacity: '1-14 guests',
      maxGuests: 14,
      baseHourly: HOURLY_RATES[dayType][14],
      crewFee: 0,
      crewFeeNote: null,
      description: 'Perfect for intimate gatherings and small parties'
    },
    '25': {
      name: 'Me Seeks The Irony',
      capacity: '15-30 guests',
      maxGuests: 30,
      baseHourly: HOURLY_RATES[dayType][25],
      crewFee: 0, // Don't pre-add crew fee
      crewFeeNote: `+${formatCurrency(CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA / 100)}/hr crew fee for 26-30 guests`,
      description: 'Ideal for medium-sized celebrations and group events'
    },
    '50': {
      name: 'Clever Girl',
      capacity: '31-75 guests',
      maxGuests: 75,
      baseHourly: HOURLY_RATES[dayType][50],
      crewFee: 0, // Don't pre-add crew fee
      crewFeeNote: `+${formatCurrency(CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA / 100)}/hr crew fee for 51-75 guests`,
      description: 'Our largest vessel for grand celebrations and corporate events'
    }
  };
  
  const boat = boats[selectedBoat];
  const capacityTier = boat.maxGuests as 14 | 25 | 30 | 50 | 75;
  
  // Calculate pricing for each package
  const standardPricing = calculateTotalPrice(
    boat.baseHourly,
    duration,
    0, // Standard has no package fee
    boat.crewFee * duration
  );
  
  const essentialsPricing = calculateTotalPrice(
    boat.baseHourly,
    duration,
    PACKAGE_FLAT_FEES.ESSENTIALS[capacityTier],
    boat.crewFee * duration
  );
  
  const ultimatePricing = calculateTotalPrice(
    boat.baseHourly,
    duration,
    PACKAGE_FLAT_FEES.ULTIMATE[capacityTier],
    boat.crewFee * duration
  );
  
  const pricingMap = {
    standard: standardPricing,
    essentials: essentialsPricing,
    ultimate: ultimatePricing
  };

  return (
    <div className={className}>
      <Tabs value={selectedBoat} onValueChange={(val) => setSelectedBoat(val as '14' | '25' | '50')}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="14" data-testid="tab-14-person">
            <Ship className="h-4 w-4 mr-2" />
            14-Person
          </TabsTrigger>
          <TabsTrigger value="25" data-testid="tab-25-person">
            <Ship className="h-4 w-4 mr-2" />
            25-Person
          </TabsTrigger>
          <TabsTrigger value="50" data-testid="tab-50-person">
            <Ship className="h-4 w-4 mr-2" />
            50-Person
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedBoat} className="space-y-6">
          {/* Boat Info Card */}
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Ship className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-lg" data-testid="boat-name">{boat.name}</p>
                    <p className="text-sm text-gray-600" data-testid="boat-capacity">{boat.capacity} • {duration} hours</p>
                    <p className="text-xs text-gray-500">{boat.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-base px-4 py-2" data-testid="base-rate">
                  {formatCurrency(boat.baseHourly / 100)}/hour
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Package Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(PACKAGES).map(([key, pkg]) => {
              const pricing = pricingMap[key as keyof typeof pricingMap];
              const deposit = Math.floor(pricing.total * (PRICING_DEFAULTS.DEPOSIT_PERCENT / 100));
              
              return (
                <Card
                  key={pkg.id}
                  className={`relative transition-all hover:shadow-xl ${
                    pkg.popular ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  data-testid={`card-${pkg.id}`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/80 text-white px-3 py-1 rounded-bl-lg text-sm">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.description}</p>
                    
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-primary" data-testid={`total-${pkg.id}`}>
                        {formatCurrency(pricing.total / 100)}
                      </div>
                      <p className="text-xs text-gray-500">Total for {duration} hours</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pricing Breakdown */}
                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base ({duration}hrs @ {formatCurrency(boat.baseHourly / 100)}/hr):</span>
                        <span className="font-medium" data-testid={`base-cost-${pkg.id}`}>
                          {formatCurrency(pricing.baseCost / 100)}
                        </span>
                      </div>
                      {pricing.packageFee > 0 && (
                        <div className="flex justify-between">
                          <span>Package Add-on:</span>
                          <span className="font-medium" data-testid={`package-fee-${pkg.id}`}>
                            {formatCurrency(pricing.packageFee / 100)}
                          </span>
                        </div>
                      )}
                      {pricing.crewFee > 0 && (
                        <div className="flex justify-between">
                          <span>Extra Crew:</span>
                          <span className="font-medium" data-testid={`crew-fee-${pkg.id}`}>
                            {formatCurrency(pricing.crewFee / 100)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-600">
                        <span>Tax (8.25%):</span>
                        <span>{formatCurrency(pricing.tax / 100)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Gratuity (20%):</span>
                        <span>{formatCurrency(pricing.gratuity / 100)}</span>
                      </div>
                    </div>
                    
                    {/* Crew Fee Note (if applicable) */}
                    {boat.crewFeeNote && (
                      <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-blue-800 dark:text-blue-300">
                            {boat.crewFeeNote}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Deposit Info */}
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Deposit Required</span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <p>{PRICING_DEFAULTS.DEPOSIT_PERCENT}% to secure: {formatCurrency(deposit / 100)}</p>
                        <p>Balance due 30 days before cruise</p>
                      </div>
                    </div>
                    
                    <Link href={`/book?package=${pkg.id}&boat=${selectedBoat}&dayType=${dayType}`}>
                      <Button 
                        className="w-full mt-4" 
                        variant={pkg.popular ? 'default' : 'outline'}
                        data-testid={`button-book-${pkg.id}`}
                      >
                        Book {pkg.name}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Additional Info */}
          <Card className="bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold mb-2">Important Notes:</p>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• All prices include 8.25% tax and 20% gratuity</li>
                    <li>• Package add-ons are flat fees (not hourly)</li>
                    <li>• Extra crew fee applies for groups over {selectedBoat === '14' ? '14' : selectedBoat === '25' ? '25' : '50'} guests</li>
                    <li>• {PRICING_DEFAULTS.DEPOSIT_PERCENT}% deposit required to secure booking</li>
                    <li>• Free cancellation up to 30 days before cruise date</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, DollarSign, TrendingDown, Sparkles, Users, Music, Camera, PartyPopper, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import { PRIVATE_CRUISE_PRICING, DISCO_TIME_SLOTS, PRICING_DEFAULTS } from '@shared/constants';

interface PricingCalculation {
  subtotal: number;
  tax: number;
  gratuity: number;
  total: number;
  perPerson: number;
}

interface GroupSizeComparison {
  groupSize: number;
  disco: PricingCalculation;
  privateCruise: {
    friday: PricingCalculation;
    saturday: PricingCalculation;
  };
  privatePlusDjPhoto: {
    friday: PricingCalculation;
    saturday: PricingCalculation;
    djFitsOn14pBoat: boolean;
  };
  savings: {
    friday: {
      vsPrivate: number;
      vsPrivatePlusDjPhoto: number;
    };
    saturday: {
      vsPrivate: number;
      vsPrivatePlusDjPhoto: number;
    };
  };
}

function calculateDiscoPricing(pricePerPerson: number, groupSize: number): PricingCalculation {
  const subtotal = pricePerPerson * groupSize;
  const tax = Math.floor(subtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
  const gratuity = Math.floor(subtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const total = subtotal + tax + gratuity;
  
  return {
    subtotal,
    tax,
    gratuity,
    total,
    perPerson: Math.floor(total / groupSize)
  };
}

function calculatePrivateCruisePricing(boatTier: 14 | 25 | 30 | 50 | 75, dayType: 'FRIDAY' | 'SATURDAY', groupSize: number): PricingCalculation {
  // Use pre-calculated total from PRIVATE_CRUISE_PRICING as the source of truth
  const total = PRIVATE_CRUISE_PRICING[boatTier].packages.standard.totalPrices[dayType];
  const perPerson = Math.floor(total / groupSize);
  
  // For display purposes, show the total as-is without breakdown
  // since the breakdown calculation would not match the pre-calculated total
  return {
    subtotal: total, // Show full price (includes tax & gratuity)
    tax: 0, // Don't show separate tax line
    gratuity: 0, // Don't show separate gratuity line
    total,
    perPerson
  };
}

function calculatePrivatePlusDjPhotoPricing(boatTier: 14 | 25 | 30 | 50 | 75, dayType: 'FRIDAY' | 'SATURDAY', groupSize: number, canFitDj: boolean): PricingCalculation {
  // Use pre-calculated total from PRIVATE_CRUISE_PRICING Ultimate package as the source of truth
  const total = PRIVATE_CRUISE_PRICING[boatTier].packages.ultimate.totalPrices[dayType];
  const perPerson = Math.floor(total / groupSize);
  
  // For display purposes, show the total as-is without breakdown
  // since the breakdown calculation would not match the pre-calculated total
  return {
    subtotal: total, // Show full price (includes tax & gratuity)
    tax: 0, // Don't show separate tax line
    gratuity: 0, // Don't show separate gratuity line
    total,
    perPerson
  };
}

function getBoatTier(groupSize: number): 14 | 25 | 30 | 50 | 75 {
  if (groupSize <= 14) return 14;
  if (groupSize <= 25) return 25;
  if (groupSize <= 30) return 30;
  if (groupSize <= 50) return 50;
  return 75;
}

function calculateGroupComparison(groupSize: number): GroupSizeComparison {
  const boatTier = getBoatTier(groupSize);
  const djFitsOn14pBoat = boatTier > 14; // DJ can't fit on 14-person boat
  
  // Disco cruise pricing - use Saturday 11am-3pm ($105) as the default comparison
  const saturdayMorningSlot = DISCO_TIME_SLOTS[1]; // Saturday 11am-3pm - most popular
  const disco = calculateDiscoPricing(saturdayMorningSlot.basePrice, groupSize);
  
  // Private cruise pricing (Friday & Saturday) - using correct PRIVATE_CRUISE_PRICING
  const privateFriday = calculatePrivateCruisePricing(boatTier, 'FRIDAY', groupSize);
  const privateSaturday = calculatePrivateCruisePricing(boatTier, 'SATURDAY', groupSize);
  
  // Private + DJ + Photo (Ultimate Package) - includes disco atmosphere/entertainment
  const privatePlusFriday = calculatePrivatePlusDjPhotoPricing(boatTier, 'FRIDAY', groupSize, djFitsOn14pBoat);
  const privatePlusSaturday = calculatePrivatePlusDjPhotoPricing(boatTier, 'SATURDAY', groupSize, djFitsOn14pBoat);
  
  return {
    groupSize,
    disco,
    privateCruise: {
      friday: privateFriday,
      saturday: privateSaturday
    },
    privatePlusDjPhoto: {
      friday: privatePlusFriday,
      saturday: privatePlusSaturday,
      djFitsOn14pBoat
    },
    savings: {
      friday: {
        vsPrivate: privateFriday.total - disco.total,
        vsPrivatePlusDjPhoto: privatePlusFriday.total - disco.total
      },
      saturday: {
        vsPrivate: privateSaturday.total - disco.total,
        vsPrivatePlusDjPhoto: privatePlusSaturday.total - disco.total
      }
    }
  };
}

const GROUP_SIZES = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 25];

export default function DiscoVsPrivateValueCalculator() {
  const [selectedSize, setSelectedSize] = useState<number>(14);
  const [selectedDay, setSelectedDay] = useState<'friday' | 'saturday'>('friday');
  
  const comparison = calculateGroupComparison(selectedSize);
  const boatTier = getBoatTier(selectedSize);
  
  return (
    <div className="w-full space-y-3 md:space-y-4" data-testid="disco-vs-private-calculator">
      {/* Group Size Selector */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-center break-words">Choose Your Group Size</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-1 sm:gap-1.5 md:gap-2">
          {GROUP_SIZES.map(size => (
            <Button
              key={size}
              variant={selectedSize === size ? 'default' : 'outline'}
              onClick={() => setSelectedSize(size)}
              className="w-full h-8 sm:h-9 md:h-10 text-xs sm:text-sm md:text-base px-1 sm:px-2"
              data-testid={`group-size-${size}`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex justify-center gap-3">
        <Button
          variant={selectedDay === 'friday' ? 'default' : 'outline'}
          onClick={() => setSelectedDay('friday')}
          className="h-9"
          data-testid="day-friday"
        >
          Friday
        </Button>
        <Button
          variant={selectedDay === 'saturday' ? 'default' : 'outline'}
          onClick={() => setSelectedDay('saturday')}
          className="h-9"
          data-testid="day-saturday"
        >
          Saturday
        </Button>
      </div>

      {/* Pricing Comparison Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Option 1: Disco Cruise */}
        <Card className="border-green-500 border-2 relative overflow-hidden" data-testid="disco-option">
          <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-bold">
            BEST VALUE
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              ATX Disco Cruise
            </CardTitle>
            <CardDescription>Saturday 11am-3pm ($105/person)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>$105.00/person × {selectedSize}</span>
                <span>{formatCurrency(comparison.disco.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (8.25%)</span>
                <span>{formatCurrency(comparison.disco.tax)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Gratuity (20%)</span>
                <span>{formatCurrency(comparison.disco.gratuity)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>TOTAL</span>
                <span>{formatCurrency(comparison.disco.total)}</span>
              </div>
              <div className="text-center text-xl font-bold text-green-600">
                {formatCurrency(comparison.disco.perPerson)}/person
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <p className="font-semibold text-sm">✅ What's Included:</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Professional DJ all day</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Professional photographer</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Private cooler with 30lbs ice</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Giant lily pad floats</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Giant unicorn float</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>All party supplies</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Multi-group party atmosphere</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Everything ready when you arrive</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Option 2: Private Cruise */}
        <Card data-testid="private-option">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Private Cruise
            </CardTitle>
            <CardDescription>{boatTier}-person boat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total price (includes all fees)</span>
                <span className="font-semibold">{formatCurrency(comparison.privateCruise[selectedDay].total)}</span>
              </div>
              <div className="text-center text-xl font-bold text-orange-600 pt-2">
                {formatCurrency(comparison.privateCruise[selectedDay].perPerson)}/person
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <p className="font-semibold text-sm">✅ What You Get:</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Captain</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Empty boat</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Bluetooth speaker</span>
                </li>
              </ul>

              <p className="font-semibold text-sm pt-2 text-red-600">❌ Missing:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>DJ</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Photographer</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Party supplies</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Multi-group energy</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Option 3: Private + Ultimate Package (includes DJ, Photo, Party Supplies) */}
        <Card className="border-red-300" data-testid="private-plus-option">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Private Ultimate Package
            </CardTitle>
            <CardDescription>Includes entertainment & party atmosphere</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total price (includes all fees)</span>
                <span className="font-semibold">{formatCurrency(comparison.privatePlusDjPhoto[selectedDay].total)}</span>
              </div>
              <div className="text-center text-xl font-bold text-red-600 pt-2">
                {formatCurrency(comparison.privatePlusDjPhoto[selectedDay].perPerson)}/person
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <p className="font-semibold text-sm">✅ Ultimate Package Includes:</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Giant lily pad floats</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Specialty floats & party supplies</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Disco atmosphere setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Champagne service & cups</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <p className="font-semibold text-sm text-red-600">❌ Still Missing vs. Disco:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Multi-group party atmosphere</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Professional DJ all day</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Professional photographer</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Everything ready when you arrive</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Summary */}
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-500" data-testid="savings-summary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-green-600" />
            Your Savings with Disco Cruise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-semibold">💰 vs. Private Cruise:</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(comparison.savings[selectedDay].vsPrivate)} saved
              </p>
              <p className="text-sm text-muted-foreground">
                ({formatCurrency(Math.floor(comparison.savings[selectedDay].vsPrivate / selectedSize))}/person)
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">💰 vs. Private + DJ + Photo:</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(comparison.savings[selectedDay].vsPrivatePlusDjPhoto)} saved
              </p>
              <p className="text-sm text-muted-foreground">
                ({formatCurrency(Math.floor(comparison.savings[selectedDay].vsPrivatePlusDjPhoto / selectedSize))}/person)
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-lg font-semibold text-center">
              🎉 PLUS: You get the legendary multi-group party atmosphere, all party supplies, and turnkey experience!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* All Group Sizes Quick Reference */}
      <Card data-testid="quick-reference">
        <CardHeader>
          <CardTitle>Quick Reference: All Group Sizes ({selectedDay === 'friday' ? 'Friday' : 'Saturday'})</CardTitle>
          <CardDescription>ATX Disco Cruise vs. Private Cruise Savings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Size</th>
                  <th className="text-right py-2 px-2">Disco Total</th>
                  <th className="text-right py-2 px-2">Private Total</th>
                  <th className="text-right py-2 px-2">Savings</th>
                  <th className="text-right py-2 px-2">Per Person</th>
                </tr>
              </thead>
              <tbody>
                {GROUP_SIZES.map(size => {
                  const comp = calculateGroupComparison(size);
                  const savings = comp.savings[selectedDay].vsPrivate;
                  return (
                    <tr key={size} className={`border-b ${size === selectedSize ? 'bg-primary/10' : ''}`}>
                      <td className="py-2 px-2 font-semibold">{size} people</td>
                      <td className="text-right py-2 px-2">{formatCurrency(comp.disco.total)}</td>
                      <td className="text-right py-2 px-2">{formatCurrency(comp.privateCruise[selectedDay].total)}</td>
                      <td className="text-right py-2 px-2 text-green-600 font-bold">
                        {formatCurrency(savings)}
                      </td>
                      <td className="text-right py-2 px-2 text-green-600">
                        {formatCurrency(Math.floor(savings / size))}/pp
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-blue-50 dark:bg-blue-900/20" data-testid="key-insights">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">Small Groups (6-14 people):</p>
              <p className="text-sm text-muted-foreground">Disco cruise often costs less per person, especially when adding DJ & photographer to private cruise</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">Medium Groups (15-20 people):</p>
              <p className="text-sm text-muted-foreground">Similar total cost but disco includes DJ, photographer, floats, and party supplies</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <PartyPopper className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">Larger Groups (22-25 people):</p>
              <p className="text-sm text-muted-foreground">More services included with disco cruise - DJ & photographer alone would add $1,200 to private cruise</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

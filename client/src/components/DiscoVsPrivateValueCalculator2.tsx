import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, DollarSign, TrendingDown, Sparkles, Users, Music, Camera, PartyPopper, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import { PRIVATE_CRUISE_FINAL_PRICES, DISCO_PRICING, PRICING_DEFAULTS } from '@shared/constants';

interface PricingCalculation {
  subtotal: number;
  tax: number;
  gratuity: number;
  total: number;
  perPerson: number;
}

interface GroupSizeComparison {
  groupSize: number;
  disco: {
    basic: PricingCalculation;
    disco_queen: PricingCalculation;
    platinum: PricingCalculation;
  };
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

const DJ_COST = 60000; // $600 in cents
const PHOTOGRAPHER_COST = 80000; // $800 in cents

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

function calculatePrivateCruisePricing(basePrice: number, groupSize: number): PricingCalculation {
  const subtotal = basePrice;
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

function calculatePrivatePlusDjPhotoPricing(basePrice: number, groupSize: number, canFitDj: boolean): PricingCalculation {
  const subtotal = basePrice + (canFitDj ? DJ_COST : 0) + PHOTOGRAPHER_COST;
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

function getBoatTier(groupSize: number): 14 | 25 | 50 {
  if (groupSize <= 14) return 14;
  if (groupSize <= 25) return 25;
  return 50;
}

function calculateGroupComparison(groupSize: number): GroupSizeComparison {
  const boatTier = getBoatTier(groupSize);
  const djFitsOn14pBoat = boatTier > 14; // DJ can't fit on 14-person boat
  
  // Disco cruise pricing (all packages)
  const discoBasic = calculateDiscoPricing(DISCO_PRICING.basic, groupSize);
  const discoQueen = calculateDiscoPricing(DISCO_PRICING.disco_queen, groupSize);
  const discoPlatinum = calculateDiscoPricing(DISCO_PRICING.platinum, groupSize);
  
  // Private cruise pricing (Friday & Saturday)
  const privateFriday = calculatePrivateCruisePricing(PRIVATE_CRUISE_FINAL_PRICES.FRIDAY[boatTier], groupSize);
  const privateSaturday = calculatePrivateCruisePricing(PRIVATE_CRUISE_FINAL_PRICES.SATURDAY[boatTier], groupSize);
  
  // Private + DJ + Photographer (Friday & Saturday)
  const privatePlusFriday = calculatePrivatePlusDjPhotoPricing(PRIVATE_CRUISE_FINAL_PRICES.FRIDAY[boatTier], groupSize, djFitsOn14pBoat);
  const privatePlusSaturday = calculatePrivatePlusDjPhotoPricing(PRIVATE_CRUISE_FINAL_PRICES.SATURDAY[boatTier], groupSize, djFitsOn14pBoat);
  
  return {
    groupSize,
    disco: {
      basic: discoBasic,
      disco_queen: discoQueen,
      platinum: discoPlatinum
    },
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
        vsPrivate: privateFriday.total - discoQueen.total,
        vsPrivatePlusDjPhoto: privatePlusFriday.total - discoQueen.total
      },
      saturday: {
        vsPrivate: privateSaturday.total - discoQueen.total,
        vsPrivatePlusDjPhoto: privatePlusSaturday.total - discoQueen.total
      }
    }
  };
}

const GROUP_SIZES = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 25];

export default function DiscoVsPrivateValueCalculator2() {
  const [selectedSize, setSelectedSize] = useState<number>(14);
  const [selectedDay, setSelectedDay] = useState<'friday' | 'saturday'>('friday');
  
  const comparison = calculateGroupComparison(selectedSize);
  const boatTier = getBoatTier(selectedSize);
  
  return (
    <div className="w-full space-y-3 md:space-y-4" data-testid="disco-vs-private-calculator">
      {/* Group Size Selector */}
      <div className="space-y-2">
        <h3 className="text-lg md:text-xl font-bold text-center">Choose Your Group Size</h3>
        <div className="grid grid-cols-5 md:grid-cols-11 gap-1.5 md:gap-2">
          {GROUP_SIZES.map(size => (
            <Button
              key={size}
              variant={selectedSize === size ? 'default' : 'outline'}
              onClick={() => setSelectedSize(size)}
              className="w-full h-8 md:h-10 text-sm md:text-base px-2"
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
            <CardDescription>Disco Queen Package (Most Popular)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>${(DISCO_PRICING.disco_queen / 100).toFixed(2)}/person × {selectedSize}</span>
                <span>{formatCurrency(comparison.disco.disco_queen.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (8.25%)</span>
                <span>{formatCurrency(comparison.disco.disco_queen.tax)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Gratuity (20%)</span>
                <span>{formatCurrency(comparison.disco.disco_queen.gratuity)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>TOTAL</span>
                <span>{formatCurrency(comparison.disco.disco_queen.total)}</span>
              </div>
              <div className="text-center text-xl font-bold text-green-600">
                {formatCurrency(comparison.disco.disco_queen.perPerson)}/person
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
                  <span>Private cooler with ice</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Mimosa supplies ready</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Giant lily pad floats</span>
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
                <span>Base rental</span>
                <span>{formatCurrency(comparison.privateCruise[selectedDay].subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (8.25%)</span>
                <span>{formatCurrency(comparison.privateCruise[selectedDay].tax)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Gratuity (20%)</span>
                <span>{formatCurrency(comparison.privateCruise[selectedDay].gratuity)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>TOTAL</span>
                <span>{formatCurrency(comparison.privateCruise[selectedDay].total)}</span>
              </div>
              <div className="text-center text-xl font-bold text-orange-600">
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

        {/* Option 3: Private + DJ + Photographer */}
        <Card className="border-red-300" data-testid="private-plus-option">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Private + DJ + Photo
            </CardTitle>
            <CardDescription>Try to replicate the experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base rental</span>
                <span>{formatCurrency(comparison.privateCruise[selectedDay].subtotal)}</span>
              </div>
              {comparison.privatePlusDjPhoto.djFitsOn14pBoat ? (
                <div className="flex justify-between text-sm">
                  <span>DJ (4 hours)</span>
                  <span>{formatCurrency(DJ_COST)}</span>
                </div>
              ) : (
                <div className="flex justify-between text-sm text-red-600">
                  <span>DJ</span>
                  <span className="text-xs">❌ Won't fit on {boatTier}p boat</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Photographer (4 hours)</span>
                <span>{formatCurrency(PHOTOGRAPHER_COST)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (8.25%)</span>
                <span>{formatCurrency(comparison.privatePlusDjPhoto[selectedDay].tax)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Gratuity (20%)</span>
                <span>{formatCurrency(comparison.privatePlusDjPhoto[selectedDay].gratuity)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>TOTAL</span>
                <span>{formatCurrency(comparison.privatePlusDjPhoto[selectedDay].total)}</span>
              </div>
              <div className="text-center text-xl font-bold text-red-600">
                {formatCurrency(comparison.privatePlusDjPhoto[selectedDay].perPerson)}/person
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <p className="font-semibold text-sm text-red-600">❌ Still Missing:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Party supplies ($200-300 value)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Multi-group atmosphere (priceless)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Turnkey setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Hassle-free experience</span>
                </li>
              </ul>

              {!comparison.privatePlusDjPhoto.djFitsOn14pBoat && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-start gap-1">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>DJ cannot fit on {boatTier}-person boat - not enough space!</span>
                  </p>
                </div>
              )}
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
          <CardDescription>Disco Queen Package vs. Private Cruise Savings</CardDescription>
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
                      <td className="text-right py-2 px-2">{formatCurrency(comp.disco.disco_queen.total)}</td>
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
              <p className="text-sm text-muted-foreground">Disco cruise is DRAMATICALLY cheaper - save $500-1,500+ total</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">Medium Groups (15-20 people):</p>
              <p className="text-sm text-muted-foreground">Still cheaper or same price but WAY more included</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <PartyPopper className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">Larger Groups (22-25 people):</p>
              <p className="text-sm text-muted-foreground">Incredible value - even if slightly more, you get SO much more for your money</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

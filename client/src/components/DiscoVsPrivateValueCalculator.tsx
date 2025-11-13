import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, DollarSign, TrendingDown, Sparkles, Users, Music, Camera, PartyPopper, Heart, Infinity } from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import { DISCO_TIME_SLOTS, PRICING_DEFAULTS, PRIVATE_CRUISE_PRICING } from '@shared/constants';

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
  privateBoatOnly: {
    friday: PricingCalculation;
    saturday: PricingCalculation;
  };
  buildItYourself: {
    friday: {
      base: PricingCalculation;
      withExtras: PricingCalculation;
    };
    saturday: {
      base: PricingCalculation;
      withExtras: PricingCalculation;
    };
  };
  savings: {
    friday: {
      vsPrivateOnly: number;
      vsBuildItYourself: number;
    };
    saturday: {
      vsPrivateOnly: number;
      vsBuildItYourself: number;
    };
  };
}

// Real costs for building it yourself
const DJ_PHOTOGRAPHER_BARTENDER_COST = 60000; // $600 in cents
const PARTY_SUPPLIES_COST = 20000; // $200 in cents
const PREPARTYTODO_SETUP_HOSTING_COST = 20000; // $200 in cents

// Helper to get boat capacity tier
function getBoatTier(groupSize: number): 14 | 25 | 30 | 50 | 75 {
  if (groupSize <= 14) return 14;
  if (groupSize <= 25) return 25;
  if (groupSize <= 30) return 30;
  if (groupSize <= 50) return 50;
  return 75;
}

// Base boat pricing using PRIVATE_CRUISE_PRICING constants
function getBoatBasePricing(groupSize: number, dayType: 'FRIDAY' | 'SATURDAY'): number {
  const boatTier = getBoatTier(groupSize);
  const hourlyRate = PRIVATE_CRUISE_PRICING[boatTier].baseHourlyRates[dayType];
  const hours = 4;
  return hourlyRate * hours;
}

// Essentials package add-on pricing from PRIVATE_CRUISE_PRICING
function getEssentialsPackageFee(groupSize: number): number {
  const boatTier = getBoatTier(groupSize);
  return PRIVATE_CRUISE_PRICING[boatTier].packages.essentials.addOn;
}

// Ultimate package add-on pricing from PRIVATE_CRUISE_PRICING
function getUltimatePackageFee(groupSize: number): number {
  const boatTier = getBoatTier(groupSize);
  return PRIVATE_CRUISE_PRICING[boatTier].packages.ultimate.addOn;
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

function calculatePrivateBoatOnly(groupSize: number, dayType: 'FRIDAY' | 'SATURDAY'): PricingCalculation {
  const baseBoatCost = getBoatBasePricing(groupSize, dayType);
  const tax = Math.floor(baseBoatCost * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
  const gratuity = Math.floor(baseBoatCost * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const total = baseBoatCost + tax + gratuity;
  
  return {
    subtotal: baseBoatCost,
    tax,
    gratuity,
    total,
    perPerson: Math.floor(total / groupSize)
  };
}

function calculateBuildItYourself(groupSize: number, dayType: 'FRIDAY' | 'SATURDAY'): { base: PricingCalculation; withExtras: PricingCalculation } {
  const baseBoatCost = getBoatBasePricing(groupSize, dayType);
  
  // Build it yourself base = boat + DJ/Photo/Bartender + Party Supplies + Pre-party Setup
  const buildYourselfBase = baseBoatCost + DJ_PHOTOGRAPHER_BARTENDER_COST + PARTY_SUPPLIES_COST + PREPARTYTODO_SETUP_HOSTING_COST;
  const baseTax = Math.floor(buildYourselfBase * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
  const baseGratuity = Math.floor(buildYourselfBase * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const baseTotal = buildYourselfBase + baseTax + baseGratuity;
  
  // With extras = base + Essentials package + Ultimate package (to match full disco experience)
  // Disco includes ice/water (Essentials) AND floats (Ultimate), so both are needed for fair comparison
  const essentialsPackageFee = getEssentialsPackageFee(groupSize);
  const ultimatePackageFee = getUltimatePackageFee(groupSize);
  const withExtrasSubtotal = buildYourselfBase + essentialsPackageFee + ultimatePackageFee;
  const extrasTax = Math.floor(withExtrasSubtotal * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
  const extrasGratuity = Math.floor(withExtrasSubtotal * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100));
  const extrasTotal = withExtrasSubtotal + extrasTax + extrasGratuity;
  
  return {
    base: {
      subtotal: buildYourselfBase,
      tax: baseTax,
      gratuity: baseGratuity,
      total: baseTotal,
      perPerson: Math.floor(baseTotal / groupSize)
    },
    withExtras: {
      subtotal: withExtrasSubtotal,
      tax: extrasTax,
      gratuity: extrasGratuity,
      total: extrasTotal,
      perPerson: Math.floor(extrasTotal / groupSize)
    }
  };
}

function calculateGroupComparison(groupSize: number): GroupSizeComparison {
  // Disco cruise pricing - use Saturday 11am-3pm ($105) as the default comparison
  const saturdayMorningSlot = DISCO_TIME_SLOTS[1]; // Saturday 11am-3pm - most popular
  const disco = calculateDiscoPricing(saturdayMorningSlot.basePrice, groupSize);
  
  // Private boat only pricing (Friday & Saturday)
  const privateBoatFriday = calculatePrivateBoatOnly(groupSize, 'FRIDAY');
  const privateBoatSaturday = calculatePrivateBoatOnly(groupSize, 'SATURDAY');
  
  // Build it yourself pricing (Friday & Saturday) - calculate separately for accurate day-based pricing
  const buildItYourselfFriday = calculateBuildItYourself(groupSize, 'FRIDAY');
  const buildItYourselfSaturday = calculateBuildItYourself(groupSize, 'SATURDAY');
  
  return {
    groupSize,
    disco,
    privateBoatOnly: {
      friday: privateBoatFriday,
      saturday: privateBoatSaturday
    },
    buildItYourself: {
      friday: buildItYourselfFriday,
      saturday: buildItYourselfSaturday  // Fixed: was incorrectly using Friday calculation
    },
    savings: {
      friday: {
        vsPrivateOnly: privateBoatFriday.total - disco.total,
        vsBuildItYourself: buildItYourselfFriday.withExtras.total - disco.total
      },
      saturday: {
        vsPrivateOnly: privateBoatSaturday.total - disco.total,
        vsBuildItYourself: buildItYourselfSaturday.withExtras.total - disco.total
      }
    }
  };
}

const GROUP_SIZES = [8, 10, 12, 14, 16, 18, 20, 22, 25];

export default function DiscoVsPrivateValueCalculator() {
  const [selectedSize, setSelectedSize] = useState<number>(14);
  const [selectedDay, setSelectedDay] = useState<'friday' | 'saturday'>('saturday');
  
  const comparison = calculateGroupComparison(selectedSize);
  
  return (
    <div className="w-full space-y-3 md:space-y-4" data-testid="disco-vs-private-calculator">
      {/* Group Size Selector */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-center break-words">Choose Your Group Size</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1 sm:gap-1.5 md:gap-2">
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
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {/* Option 1: Disco Cruise - BEST VALUE */}
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

        {/* Option 2: Private Boat Only */}
        <Card data-testid="private-option">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Private Boat Only
            </CardTitle>
            <CardDescription>Just the boat, captain & speaker</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Boat rental (4 hours)</span>
                <span>{formatCurrency(comparison.privateBoatOnly[selectedDay].subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax & gratuity</span>
                <span>{formatCurrency(comparison.privateBoatOnly[selectedDay].tax + comparison.privateBoatOnly[selectedDay].gratuity)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>TOTAL</span>
                <span>{formatCurrency(comparison.privateBoatOnly[selectedDay].total)}</span>
              </div>
              <div className="text-center text-xl font-bold text-orange-600">
                {formatCurrency(comparison.privateBoatOnly[selectedDay].perPerson)}/person
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <p className="font-semibold text-sm">✅ What You Get:</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Licensed captain & crew</span>
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
                  <span>DJ & photographer</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Party supplies & floats</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Multi-group energy</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Option 3: Build It Yourself */}
        <Card className="border-red-300" data-testid="build-it-yourself-option">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Build It Yourself
            </CardTitle>
            <CardDescription>Private boat + hire everything separately</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Boat rental (4 hours)</span>
                <span>{formatCurrency(comparison.privateBoatOnly[selectedDay].subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>DJ/Photographer/Bartender</span>
                <span>{formatCurrency(DJ_PHOTOGRAPHER_BARTENDER_COST)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Party supplies</span>
                <span>{formatCurrency(PARTY_SUPPLIES_COST)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pre-party setup & hosting</span>
                <span>{formatCurrency(PREPARTYTODO_SETUP_HOSTING_COST)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Essentials Package (ice/cups)</span>
                <span>{formatCurrency(getEssentialsPackageFee(selectedSize))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Ultimate Package (floats)</span>
                <span>{formatCurrency(getUltimatePackageFee(selectedSize))}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax & gratuity</span>
                <span>{formatCurrency(comparison.buildItYourself[selectedDay].withExtras.tax + comparison.buildItYourself[selectedDay].withExtras.gratuity)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>TOTAL</span>
                <span>{formatCurrency(comparison.buildItYourself[selectedDay].withExtras.total)}</span>
              </div>
              <div className="text-center text-xl font-bold text-red-600">
                {formatCurrency(comparison.buildItYourself[selectedDay].withExtras.perPerson)}/person
              </div>
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
                  <span>Everything ready when you arrive</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                  <span className="font-semibold text-pink-600">Once-in-a-lifetime party cruise with other bach groups celebrating together</span>
                </li>
                <li className="flex items-center gap-2 justify-center pt-2">
                  <Infinity className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-purple-600">PRICELESS</span>
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
              <p className="font-semibold">💰 vs. Private Boat Only:</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(comparison.savings[selectedDay].vsPrivateOnly)} saved
              </p>
              <p className="text-sm text-muted-foreground">
                ({formatCurrency(Math.floor(comparison.savings[selectedDay].vsPrivateOnly / selectedSize))}/person)
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">💰 vs. Build It Yourself:</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(comparison.savings[selectedDay].vsBuildItYourself)} saved
              </p>
              <p className="text-sm text-muted-foreground">
                ({formatCurrency(Math.floor(comparison.savings[selectedDay].vsBuildItYourself / selectedSize))}/person)
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-lg font-semibold text-center flex items-center justify-center gap-2">
              <PartyPopper className="w-6 h-6 text-yellow-500" />
              <span>PLUS: You get the legendary multi-group party atmosphere!</span>
            </p>
            <p className="text-center mt-2 text-muted-foreground">
              The experience of a once-in-a-lifetime party cruise with other bach groups all celebrating the same amazing occasion - <span className="font-bold text-purple-600">PRICELESS</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* All Group Sizes Quick Reference */}
      <Card data-testid="quick-reference">
        <CardHeader>
          <CardTitle>Quick Reference: All Group Sizes ({selectedDay === 'friday' ? 'Friday' : 'Saturday'})</CardTitle>
          <CardDescription>ATX Disco Cruise vs. Build It Yourself Savings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Size</th>
                  <th className="text-right py-2 px-2">Disco Total</th>
                  <th className="text-right py-2 px-2">Build It Total</th>
                  <th className="text-right py-2 px-2">Savings</th>
                  <th className="text-right py-2 px-2">Per Person</th>
                </tr>
              </thead>
              <tbody>
                {GROUP_SIZES.map(size => {
                  const comp = calculateGroupComparison(size);
                  const savings = comp.savings[selectedDay].vsBuildItYourself;
                  return (
                    <tr key={size} className={`border-b ${size === selectedSize ? 'bg-primary/10' : ''}`}>
                      <td className="py-2 px-2 font-semibold">{size} people</td>
                      <td className="text-right py-2 px-2">{formatCurrency(comp.disco.total)}</td>
                      <td className="text-right py-2 px-2">{formatCurrency(comp.buildItYourself[selectedDay].withExtras.total)}</td>
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
          <CardTitle>Real Cost Breakdown - Why Disco Cruise Wins</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">All-Inclusive Value:</p>
              <p className="text-sm text-muted-foreground">Disco cruise includes professional DJ ($200), photographer ($200), bartender service ($200), party supplies ($200), setup/hosting ($200), floats ($250-350), AND the boat - all for $105/person</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">Per-Person Economics:</p>
              <p className="text-sm text-muted-foreground">Larger groups save even more - the $600 DJ/photographer/bartender fee and $400 in setup/supplies gets split among more people on the disco cruise</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">The Priceless Factor:</p>
              <p className="text-sm text-muted-foreground">No private boat can replicate the energy of multiple bach groups celebrating together - that once-in-a-lifetime party atmosphere is truly priceless</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

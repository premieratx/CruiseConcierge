import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import { PRICING_DEFAULTS } from '@shared/constants';
import {
  CheckCircle2,
  Info,
  TrendingUp,
  Star,
  Calendar,
  Users,
  Clock,
  DollarSign,
  CreditCard,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Ship,
  Crown,
  Gift,
  Calculator,
  FileText,
  Shield,
  ArrowRight,
  XCircle,
  Package
} from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

interface PricingPackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  features: (string | PricingFeature)[];
  popular?: boolean;
  badge?: string;
  icon?: typeof Star;
  cta?: string;
  ctaLink?: string;
}

interface PricingTableProps {
  packages?: PricingPackage[];
  variant?: 'disco' | 'private' | 'comparison' | 'simple';
  title?: string;
  description?: string;
  showTaxAndGratuity?: boolean;
  showDeposit?: boolean;
  className?: string;
  dayType?: 'weekday' | 'weekend' | 'saturday';
  groupSize?: number;
  duration?: number;
  eventDate?: Date; // Optional: for calculating urgency-based deposits
}

// Schema.org structured data for pricing
function generatePricingSchema(packages: PricingPackage[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": packages.map((pkg, index) => ({
      "@type": "Offer",
      "@id": `#offer-${pkg.id}`,
      "position": index + 1,
      "name": pkg.name,
      "description": pkg.description,
      "price": pkg.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      "seller": {
        "@type": "Organization",
        "name": "Premier Party Cruises",
        "url": "https://premierpartycruises.com"
      }
    }))
  };
}

// Calculate taxes and fees
function calculateTotal(basePrice: number, includeGratuity: boolean = true) {
  const tax = Math.floor(basePrice * (PRICING_DEFAULTS.TAX_RATE_BASIS_POINTS / 10000));
  const gratuity = includeGratuity ? Math.floor(basePrice * (PRICING_DEFAULTS.GRATUITY_PERCENT / 100)) : 0;
  return {
    base: basePrice,
    tax,
    gratuity,
    total: basePrice + tax + gratuity
  };
}

// Calculate if booking is urgent based on event date
function calculateIsUrgent(eventDate?: Date): boolean {
  if (!eventDate) return false; // Default to non-urgent if no date provided
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);
  const daysUntilEvent = Math.ceil((event.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return daysUntilEvent < PRICING_DEFAULTS.URGENCY_THRESHOLD_DAYS;
}

// Format deposit information
function getDepositInfo(total: number, isUrgent: boolean = false) {
  const depositPercent = isUrgent ? 50 : PRICING_DEFAULTS.DEPOSIT_PERCENT;
  const depositAmount = Math.floor(total * (depositPercent / 100));
  const balanceAmount = total - depositAmount;
  
  return {
    depositPercent,
    depositAmount,
    balanceAmount,
    dueDate: isUrgent ? 'within 48 hours of booking' : '14 days before cruise'
  };
}

// Disco Cruise Pricing Table
function DiscoPricingTable({ packages, showTaxAndGratuity = true, showDeposit = true, eventDate }: { packages: PricingPackage[], showTaxAndGratuity?: boolean, showDeposit?: boolean, eventDate?: Date }) {
  const { toast } = useToast();
  const isUrgent = calculateIsUrgent(eventDate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {packages.map((pkg) => {
        const pricing = calculateTotal(pkg.price * 100); // Convert to cents
        const deposit = getDepositInfo(pricing.total, isUrgent);
        const Icon = pkg.icon || Sparkles;
        
        return (
          <Card 
            key={pkg.id}
            className={cn(
              "relative overflow-hidden transition-all hover:shadow-xl",
              pkg.popular && "ring-2 ring-primary shadow-lg scale-105"
            )}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/80 text-white px-4 py-1 rounded-bl-lg">
                <Star className="h-4 w-4 inline mr-1" />
                Most Popular
              </div>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-8 w-8 text-primary" />
                {pkg.badge && (
                  <Badge variant="secondary">{pkg.badge}</Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
              
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{formatCurrency(pkg.price)}</span>
                  {pkg.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatCurrency(pkg.originalPrice)}
                    </span>
                  )}
                  <span className="text-sm text-gray-600">/person</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => {
                  const isFeatureObj = typeof feature === 'object';
                  const text = isFeatureObj ? feature.text : feature;
                  const included = isFeatureObj ? feature.included : true;
                  
                  return (
                    <div key={index} className="flex items-start gap-2">
                      {included ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={cn(
                        "text-sm",
                        !included && "text-gray-500 line-through"
                      )}>
                        {text}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {showTaxAndGratuity && (
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span className="font-medium">{formatCurrency(pkg.price)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8.25%):</span>
                    <span>{formatCurrency(pricing.tax / 100)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Gratuity (20%):</span>
                    <span>{formatCurrency(pricing.gratuity / 100)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-primary">{formatCurrency(pricing.total / 100)}</span>
                  </div>
                </div>
              )}
              
              {showDeposit && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span className="font-medium">Deposit Required</span>
                  </div>
                  <div className="ml-6 space-y-1 text-gray-600 dark:text-gray-400">
                    <p>{deposit.depositPercent}% deposit: {formatCurrency(deposit.depositAmount / 100)}</p>
                    <p>Balance due {deposit.dueDate}</p>
                  </div>
                </div>
              )}
              
              <Link href={pkg.ctaLink || '/chat'}>
                <Button className="w-full mt-4" variant={pkg.popular ? "default" : "outline"}>
                  {pkg.cta || 'Book Now'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Private Cruise Pricing Table
function PrivateCruisePricingTable({ 
  dayType = 'weekday', 
  groupSize = 20, 
  duration = 4,
  showTaxAndGratuity = true,
  showDeposit = true,
  eventDate
}: { 
  dayType?: string;
  groupSize?: number;
  duration?: number;
  showTaxAndGratuity?: boolean;
  showDeposit?: boolean;
  eventDate?: Date;
}) {
  const [selectedPackage, setSelectedPackage] = useState('essentials');
  const isUrgent = calculateIsUrgent(eventDate);
  
  // Determine boat and base rate based on group size
  const getBoatInfo = () => {
    if (groupSize <= 14) return { boat: 'Day Tripper', baseRate: 200, tier: 14 as const };
    if (groupSize <= 30) return { boat: 'Meeseeks / The Irony', baseRate: 225, tier: 25 as const };
    return { boat: 'Clever Girl', baseRate: 300, tier: 50 as const };
  };
  
  const { boat, baseRate, tier } = getBoatInfo();
  const weekendMultiplier = dayType === 'saturday' ? 1.5 : dayType === 'weekend' ? 1.25 : 1;
  const adjustedRate = baseRate * weekendMultiplier;
  const baseCost = adjustedRate * duration * 100; // Convert to cents
  
  // Add package fees (FLAT fees per cruise, not hourly)
  const packageFeesByTier = {
    14: { essentials: 10000, ultimate: 25000 },  // $100, $250
    25: { essentials: 15000, ultimate: 30000 },  // $150, $300
    50: { essentials: 20000, ultimate: 35000 }   // $200, $350
  };
  
  const packageFees = {
    standard: 0,
    essentials: packageFeesByTier[tier].essentials,  // Flat fee per cruise
    ultimate: packageFeesByTier[tier].ultimate       // Flat fee per cruise
  };
  
  // Add crew fees if needed
  const crewFee = groupSize > 50 ? 10000 * duration : groupSize > 25 ? 5000 * duration : 0;
  
  const packages = [
    {
      id: 'standard',
      name: 'Standard Package',
      fee: 0,
      features: [
        'Professional captain & crew',
        'Large coolers (bring ice)',
        'Bluetooth sound system',
        'Clean restroom',
        'Sun & shade areas',
        'BYOB friendly'
      ]
    },
    {
      id: 'essentials',
      name: 'Essentials Package',
      fee: packageFees.essentials,
      features: [
        'Everything in Standard',
        'Coolers pre-stocked with ice',
        '5-gallon water dispenser',
        'Solo cups included',
        '6-foot table for food',
        'Vendor coordination'
      ]
    },
    {
      id: 'ultimate',
      name: 'Ultimate Package',
      fee: packageFees.ultimate,
      features: [
        'Everything in Essentials',
        'Giant lily pad float',
        'Unicorn/ring float',
        'Disco ball cups',
        'Bubble guns & wands',
        'Champagne flutes',
        'SPF-50 sunscreen',
        'Complete tableware'
      ]
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Boat and Group Info */}
      <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Ship className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-semibold">Recommended Boat: {boat}</p>
                <p className="text-sm text-gray-600">For {groupSize} guests • {duration} hours</p>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              Base Rate: {formatCurrency(adjustedRate)}/hour
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      {/* Package Tabs */}
      <Tabs value={selectedPackage} onValueChange={setSelectedPackage}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="essentials">Essentials</TabsTrigger>
          <TabsTrigger value="ultimate">Ultimate</TabsTrigger>
        </TabsList>
        
        {packages.map((pkg) => {
          const subtotal = baseCost + pkg.fee + crewFee;
          const pricing = calculateTotal(subtotal / 100);
          const deposit = getDepositInfo(pricing.total, isUrgent);
          
          return (
            <TabsContent key={pkg.id} value={pkg.id} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pkg.name}
                    {pkg.id === 'essentials' && (
                      <Badge className="ml-2">Most Popular</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">What's Included:</h4>
                      <div className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Pricing Breakdown:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Base Cruise ({duration}hrs @ {formatCurrency(adjustedRate)}/hr):</span>
                          <span className="font-medium">{formatCurrency(baseCost / 100)}</span>
                        </div>
                        {pkg.fee > 0 && (
                          <div className="flex justify-between">
                            <span>Package Upgrade:</span>
                            <span className="font-medium">{formatCurrency(pkg.fee / 100)}</span>
                          </div>
                        )}
                        {crewFee > 0 && (
                          <div className="flex justify-between">
                            <span>Extra Crew Fee:</span>
                            <span className="font-medium">{formatCurrency(crewFee / 100)}</span>
                          </div>
                        )}
                        
                        {showTaxAndGratuity && (
                          <>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="font-medium">{formatCurrency(subtotal / 100)}</span>
                              </div>
                              <div className="flex justify-between text-gray-600">
                                <span>Tax (8.25%):</span>
                                <span>{formatCurrency(pricing.tax / 100)}</span>
                              </div>
                              <div className="flex justify-between text-gray-600">
                                <span>Gratuity (20% recommended):</span>
                                <span>{formatCurrency(pricing.gratuity / 100)}</span>
                              </div>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t">
                              <span>Total Estimated Cost:</span>
                              <span className="text-primary">{formatCurrency(pricing.total / 100)}</span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {showDeposit && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Booking Requirements</span>
                          </div>
                          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                            <p>• {deposit.depositPercent}% deposit to secure: {formatCurrency(deposit.depositAmount / 100)}</p>
                            <p>• Balance due {deposit.dueDate}: {formatCurrency(deposit.balanceAmount / 100)}</p>
                            <p>• Free cancellation up to 30 days before</p>
                          </div>
                        </div>
                      )}
                      
                      <Link href={`/chat?package=${pkg.id}&groupSize=${groupSize}`}>
                        <Button className="w-full mt-4" variant={pkg.id === 'essentials' ? 'default' : 'outline'}>
                          Book {pkg.name}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

// Comparison Pricing Table
function ComparisonPricingTable({ className }: { className?: string }) {
  const services = [
    {
      name: 'ATX Disco Cruise',
      type: 'Per Person',
      priceRange: '$85-$105',
      duration: '4 hours',
      groupSize: 'Join other groups',
      includes: ['DJ & Photographer', 'Giant floats', 'BYOB'],
      best: 'Best for budget-conscious groups'
    },
    {
      name: 'Private Day Tripper',
      type: 'Hourly',
      priceRange: '$200-$300/hr',
      duration: '4 hour minimum',
      groupSize: 'Up to 14 guests',
      includes: ['Private boat', 'Captain', 'Sound system'],
      best: 'Best for intimate gatherings'
    },
    {
      name: 'Private Meeseeks',
      type: 'Hourly',
      priceRange: '$225-$350/hr',
      duration: '4 hour minimum',
      groupSize: '15-30 guests',
      includes: ['Private boat', 'Captain & crew', 'Premium amenities'],
      best: 'Best for medium groups'
    },
    {
      name: 'Private Clever Girl',
      type: 'Hourly',
      priceRange: '$300-$400/hr',
      duration: '4 hour minimum',
      groupSize: '31-75 guests',
      includes: ['Premium vessel', 'Full crew', 'Ultimate space'],
      best: 'Best for large celebrations'
    }
  ];
  
  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Service</TableHead>
            <TableHead>Pricing</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Group Size</TableHead>
            <TableHead>Includes</TableHead>
            <TableHead>Best For</TableHead>
            <TableHead className="text-right">Book</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <div>
                  <p>{service.name}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {service.type}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold">{service.priceRange}</span>
              </TableCell>
              <TableCell>{service.duration}</TableCell>
              <TableCell>{service.groupSize}</TableCell>
              <TableCell>
                <ul className="text-sm space-y-1">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{service.best}</span>
              </TableCell>
              <TableCell className="text-right">
                <Link href="/chat">
                  <Button size="sm" variant="outline">
                    Select
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold mb-1">Pricing Notes:</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• All prices subject to 8.25% tax</li>
              <li>• 20% gratuity recommended for crew</li>
              <li>• Weekend rates (Fri-Sun) are higher</li>
              <li>• Deposits required to secure booking</li>
              <li>• Group discounts available for 20+ people</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PricingTable2({ 
  packages,
  variant = 'simple',
  title,
  description,
  showTaxAndGratuity = true,
  showDeposit = true,
  className,
  dayType = 'weekday',
  groupSize = 20,
  duration = 4,
  eventDate
}: PricingTableProps) {
  // Add schema markup to document head
  if (packages && typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(generatePricingSchema(packages));
    document.head.appendChild(script);
  }
  
  return (
    <div className={cn("w-full", className)}>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
      )}
      
      {variant === 'disco' && packages && (
        <DiscoPricingTable 
          packages={packages} 
          showTaxAndGratuity={showTaxAndGratuity}
          showDeposit={showDeposit}
          eventDate={eventDate}
        />
      )}
      
      {variant === 'private' && (
        <PrivateCruisePricingTable
          dayType={dayType}
          groupSize={groupSize}
          duration={duration}
          showTaxAndGratuity={showTaxAndGratuity}
          showDeposit={showDeposit}
          eventDate={eventDate}
        />
      )}
      
      {variant === 'comparison' && (
        <ComparisonPricingTable className={className} />
      )}
      
      {variant === 'simple' && packages && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={cn(
              "hover:shadow-lg transition-all",
              pkg.popular && "ring-2 ring-primary"
            )}>
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div className="text-2xl font-bold">{formatCurrency(pkg.price)}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => {
                    const text = typeof feature === 'string' ? feature : feature.text;
                    return (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{text}</span>
                      </li>
                    );
                  })}
                </ul>
                <Link href={pkg.ctaLink || '/chat'}>
                  <Button className="w-full mt-4" variant={pkg.popular ? 'default' : 'outline'}>
                    {pkg.cta || 'Book Now'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
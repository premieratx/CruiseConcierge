import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { 
  DollarSign, Crown, Disc3, Ship, Users, Clock, 
  CheckCircle, Star, Sparkles, Package, Calculator,
  TrendingUp, ArrowRight, Trophy, Gift, Check, X
} from 'lucide-react';
import Footer from '@/components/Footer';
import { PricingTable2 } from '@/components/PricingTable2';
import { ComparisonTable2, type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable2';
import DiscoVsPrivateComparison2 from '@/components/DiscoVsPrivateComparison2';
import DiscoVsPrivateValueCalculator2 from '@/components/DiscoVsPrivateValueCalculator2';
import Breadcrumb from '@/components/Breadcrumb';
import { DISCO_PRICING, DISCO_TIME_SLOTS, PRIVATE_CRUISE_PRICING, BOATS } from '@shared/constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Disco Cruise Time Slots
const discoTimeSlots = DISCO_TIME_SLOTS.map((slot) => ({
  id: slot.id,
  name: slot.label,
  price: slot.basePrice / 100,
  priceWithTax: slot.priceWithTax / 100,
  day: slot.day,
  timeRange: slot.timeRange,
  description: 'ATX Disco Cruise - 4-hour party experience',
  subtitle: `Includes DJ, photographer, floats & party supplies`,
  features: [
    'Full 4-hour Lake Travis cruise experience',
    'Professional DJ entertainment all cruise',
    'Professional photographer capturing memories',
    'Digital photo delivery after the event',
    'Giant unicorn and lily pad floats',
    'Multi-group party atmosphere',
    'Disco decorations and party supplies',
    'BYOB with coolers and ice provided',
    'Clean restrooms and shaded areas'
  ],
  popular: slot.badge === 'BEST',
  icon: slot.badge === 'BEST' ? Crown : (slot.badge === 'FUN!' ? Sparkles : Disc3),
  badge: slot.badge || 'Great Value'
}));

// Private Cruise Packages - 14-person boat (using PRIVATE_CRUISE_PRICING for accurate pricing)
const privateCruisePackages = [
  {
    id: 'standard',
    name: 'Standard Private Cruise',
    price: PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.MON_THU / 100,
    baseHourlyRate: PRIVATE_CRUISE_PRICING[14].baseHourlyRates.MON_THU / 100,
    addOnFee: 0,
    description: 'Essential cruise experience',
    features: [
      'Licensed, fun, experienced captains to take your group safely around the lake in style',
      '2 large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for 14 guests',
      'Plenty of sun & shade areas'
    ],
    icon: Ship,
    badge: `${formatCurrency(PRIVATE_CRUISE_PRICING[14].baseHourlyRates.MON_THU)}/hour × 4 hours`
  },
  {
    id: 'essentials',
    name: 'Private Plus Essentials',
    price: PRIVATE_CRUISE_PRICING[14].packages.essentials.totalPrices.MON_THU / 100,
    baseHourlyRate: PRIVATE_CRUISE_PRICING[14].baseHourlyRates.MON_THU / 100,
    addOnFee: PRIVATE_CRUISE_PRICING[14].packages.essentials.addOn / 100,
    description: 'Complete convenience package',
    features: [
      'Everything from Standard Cruise',
      'Insulated 5-gallon dispenser with ice water',
      '15 gallons of fresh water & 30 solo cups',
      'Coolers pre-stocked with 40lbs of ice',
      '6-ft folding table for food & drinks'
    ],
    popular: true,
    icon: Crown,
    badge: 'MOST POPULAR'
  },
  {
    id: 'ultimate',
    name: 'Private with Ultimate Package',
    price: PRIVATE_CRUISE_PRICING[14].packages.ultimate.totalPrices.MON_THU / 100,
    baseHourlyRate: PRIVATE_CRUISE_PRICING[14].baseHourlyRates.MON_THU / 100,
    addOnFee: PRIVATE_CRUISE_PRICING[14].packages.ultimate.addOn / 100,
    description: 'Complete party experience',
    features: [
      'Everything from Essentials Package',
      '6x20\' giant lily pad float',
      'Unicorn or ring float for guest of honor',
      '5 disco ball cups & 30 additional solo cups',
      'Bubble gun & 3 bubble wands for fun',
      '20 champagne flutes & 3 fruit juices',
      '2 bottles SPF-50 spray sunscreen',
      '3 disco balls installed for party atmosphere'
    ],
    icon: Star,
    badge: `Base + ${formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.ultimate.addOn)} package`
  }
];

// Disco vs Private Comparison Data
const discoVsPrivateComparison: ComparisonRow[] = [
  {
    feature: 'Cost per Person',
    values: [
      { text: '$85-$105', highlight: true },
      '$150-$400+'
    ]
  },
  {
    feature: 'Group Size',
    values: [
      { text: 'Any size (individual tickets)', highlight: true },
      'Minimum group required'
    ]
  },
  {
    feature: 'Privacy',
    values: [
      'Shared with other groups',
      { text: 'Completely private boat', highlight: true }
    ]
  },
  {
    feature: 'DJ & Entertainment',
    values: [
      { text: 'Professional DJ included', highlight: true },
      'Optional add-on'
    ]
  },
  {
    feature: 'Photographer',
    values: [
      { text: 'Professional photos included', highlight: true },
      'Optional add-on'
    ]
  },
  {
    feature: 'Flexibility',
    values: [
      'Fixed schedule',
      { text: 'Choose your time', highlight: true }
    ]
  },
  {
    feature: 'Party Atmosphere',
    values: [
      'High energy, multi-group',
      'Customizable to your group'
    ]
  },
  {
    feature: 'Best For',
    values: [
      'Bachelor/Bachelorette parties',
      'Corporate events, families'
    ]
  }
];

const comparisonColumns: ComparisonColumn[] = [
  { 
    id: 'disco', 
    title: 'ATX Disco Cruise',
    recommended: true
  },
  { 
    id: 'private', 
    title: 'Private Cruise'
  }
];

export default function PricingBreakdown() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEOHead 
        title="Pricing Breakdown | Premier Party Cruises Austin"
        description="Complete pricing breakdown for ATX Disco Cruise packages and Private Boat Rentals. Compare side-by-side, calculate costs, and find the best deal for your Lake Travis party."
      />
      
      <PublicNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Pricing Breakdown', href: '/pricing-breakdown' }
          ]}
        />

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12 mt-8"
        >
          <Badge className="mb-4 bg-blue-600 text-white px-4 py-2 text-sm font-semibold">
            <Calculator className="h-4 w-4 inline mr-2" />
            Complete Pricing Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Pricing Breakdown
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All pricing charts, comparisons, and calculators in one place. 
            Compare Disco Cruise vs Private Boat packages side-by-side and find your perfect party boat experience.
          </p>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8" data-testid="tabs-pricing-breakdown">
            <TabsTrigger value="overview" data-testid="tab-overview">
              <TrendingUp className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="disco" data-testid="tab-disco">
              <Disc3 className="h-4 w-4 mr-2" />
              Disco Packages
            </TabsTrigger>
            <TabsTrigger value="private" data-testid="tab-private">
              <Ship className="h-4 w-4 mr-2" />
              Private Cruises
            </TabsTrigger>
            <TabsTrigger value="calculator" data-testid="tab-calculator">
              <Calculator className="h-4 w-4 mr-2" />
              Calculator
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {/* Side-by-Side Comparison */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                    Disco Cruise vs Private Boat Comparison
                  </CardTitle>
                  <CardDescription>
                    See the key differences between our two party boat options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ComparisonTable2 
                    columns={comparisonColumns}
                    rows={discoVsPrivateComparison}
                    data-testid="comparison-disco-private"
                  />
                </CardContent>
              </Card>

              {/* DiscoVsPrivateComparison Widget */}
              <div className="mb-8">
                <DiscoVsPrivateComparison2 groupSize={15} dayOfWeek={6} />
              </div>

              {/* Quick Price Reference */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Price Reference</CardTitle>
                  <CardDescription>
                    At-a-glance pricing for all our services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Disc3 className="h-5 w-5 text-blue-600" />
                        ATX Disco Cruise Time Slots
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Friday 12-4pm:</span>
                          <span className="font-semibold">{formatCurrency(DISCO_TIME_SLOTS[0].basePrice)}/person</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Saturday 11am-3pm:</span>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-600 text-white text-xs px-2 py-0">BEST</Badge>
                            <span className="font-semibold">{formatCurrency(DISCO_TIME_SLOTS[1].basePrice)}/person</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Saturday 3:30-7:30pm:</span>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-purple-600 text-white text-xs px-2 py-0">FUN!</Badge>
                            <span className="font-semibold">{formatCurrency(DISCO_TIME_SLOTS[2].basePrice)}/person</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Prices include DJ, photographer, floats & party supplies</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Ship className="h-5 w-5 text-blue-600" />
                        Private Boat Rentals
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Day Tripper (14 people):</span>
                          <span className="font-semibold">Starting at {formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.MON_THU)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Meeseeks (25 people):</span>
                          <span className="font-semibold">Starting at {formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.standard.totalPrices.MON_THU)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Clever Girl (50 people):</span>
                          <span className="font-semibold">Starting at {formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.standard.totalPrices.MON_THU)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Disco Cruise Tab */}
          <TabsContent value="disco" className="space-y-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {/* Time Slot Display */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 text-center">ATX Disco Cruise Time Slots</h2>
                <p className="text-center text-gray-600 mb-8">Choose your preferred time slot - all include DJ, photographer, floats & party supplies</p>
                <div className="grid md:grid-cols-3 gap-6">
                  {discoTimeSlots.map((slot, index) => {
                    const Icon = slot.icon;
                    return (
                      <Card 
                        key={slot.id} 
                        className={cn(
                          "relative overflow-hidden transition-all hover:shadow-xl",
                          slot.popular && "border-2 border-blue-500 shadow-lg scale-105"
                        )}
                        data-testid={`timeslot-disco-${slot.id}`}
                      >
                        {slot.badge && (
                          <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                            {slot.badge}
                          </Badge>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="h-8 w-8 text-blue-600" />
                            <CardTitle className="text-2xl">{slot.name}</CardTitle>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-bold text-blue-600">
                                {formatCurrency(slot.price * 100)}
                              </span>
                              <span className="text-gray-600">/person</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Total w/tax & gratuity: {formatCurrency(slot.priceWithTax * 100)}
                            </p>
                            <p className="text-sm font-semibold text-blue-600">{slot.subtitle}</p>
                          </div>
                          <CardDescription>{slot.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {slot.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full mt-6" asChild>
                            <Link href="/atx-disco-cruise">
                              View Details & Book <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <p className="text-center text-sm text-gray-600 mt-6">
                  All time slots run March through October. Optional add-on packages available for bachelor, bachelorette, and combined parties.
                </p>
              </div>

              {/* Additional Info Card */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle>What's Included with Every Time Slot</CardTitle>
                  <CardDescription>
                    All ATX Disco Cruise tickets include these amazing features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Professional DJ playing all cruise</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Professional photographer with digital photos</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Giant unicorn and lily pad floats</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Disco decorations and party supplies</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>BYOB with coolers and ice provided</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Multi-group party atmosphere</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Private Cruise Tab */}
          <TabsContent value="private" className="space-y-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {/* 3-Package Display */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Private Boat Rental Packages</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {privateCruisePackages.map((pkg) => {
                    const Icon = pkg.icon;
                    return (
                      <Card 
                        key={pkg.id}
                        className={cn(
                          "relative overflow-hidden transition-all hover:shadow-xl",
                          pkg.popular && "border-2 border-blue-500 shadow-lg scale-105"
                        )}
                        data-testid={`package-private-${pkg.id}`}
                      >
                        {pkg.popular && (
                          <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                            {pkg.badge}
                          </Badge>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="h-8 w-8 text-blue-600" />
                            <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                          </div>
                          <div className="space-y-2">
                            <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                              {formatCurrency(pkg.baseHourlyRate * 100)}/hour × 4 hours = {formatCurrency(pkg.baseHourlyRate * 4 * 100)}
                            </div>
                            {pkg.addOnFee > 0 && (
                              <div className="text-sm text-gray-600">
                                +{formatCurrency(pkg.addOnFee * 100)} package add-on
                              </div>
                            )}
                            <div className="text-2xl font-bold text-blue-600">
                              ({formatCurrency(pkg.price * 100)} with tax & tip)
                            </div>
                            <Badge variant="outline" className="mt-2">{pkg.badge}</Badge>
                          </div>
                          <CardDescription>{pkg.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full mt-6" asChild>
                            <Link href="/private-cruises">
                              View Details <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <p className="text-center text-sm text-gray-600 mt-6">
                  All prices shown are base hourly rates. Tax, gratuity, and any add-ons are additional.
                </p>
              </div>

              {/* Private Pricing Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Private Cruise Pricing</CardTitle>
                  <CardDescription>
                    Complete breakdown by boat size and rental duration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PricingTable2 variant="private" />
                </CardContent>
              </Card>

              {/* Fleet Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Fleet</CardTitle>
                  <CardDescription>
                    Choose the perfect boat for your group size
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {Object.values(BOATS).map((boat) => (
                      <div key={boat.id} className="space-y-2 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">{boat.displayName || boat.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>Capacity: {boat.capacity} people</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{boat.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Disco vs Private Value Calculator</CardTitle>
                  <CardDescription>
                    Compare costs based on your specific group size and needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DiscoVsPrivateValueCalculator2 />
                </CardContent>
              </Card>

              {/* Additional Pricing Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">When to Choose Disco Cruise</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Bachelor or bachelorette parties</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Budget-conscious groups</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Want DJ and photographer included</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>High-energy party atmosphere</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Smaller groups (under 15 people)</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">When to Choose Private Cruise</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Corporate events and team building</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Family gatherings and celebrations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Need complete privacy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Flexible scheduling requirements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Larger groups (15+ people)</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-12 text-center"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Book Your Party Boat?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get a custom quote or book your cruise today. Our team is here to help you plan the perfect Lake Travis party experience.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild data-testid="button-get-quote">
                  <Link href="/chat">
                    Get Custom Quote
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-contact">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Separator */}
        <div className="my-16 border-t-4 border-gray-300"></div>

        {/* Additional Pricing Charts from Bachelorette Page */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              All Bachelorette Pricing Charts
            </h2>
            <p className="text-lg text-gray-600">
              Every pricing comparison from our Bachelorette page in one place
            </p>
          </div>

          {/* 1. Bachelorette Time Slot Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Bachelorette Cruise Time Slots</CardTitle>
              <CardDescription>
                Compare our three time slot options - all include DJ, photographer, and full amenities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComparisonTable2
                columns={[
                  {
                    id: 'sat_afternoon',
                    title: 'Saturday Afternoon',
                    subtitle: '3:30pm - 7:30pm',
                    badge: { text: 'Great Value', variant: 'outline' }
                  },
                  {
                    id: 'friday',
                    title: 'Friday Afternoon',
                    subtitle: '12:00pm - 4:00pm',
                    recommended: true,
                    badge: { text: 'Best Time', variant: 'default' }
                  },
                  {
                    id: 'sat_morning',
                    title: 'Saturday Morning',
                    subtitle: '11:00am - 3:00pm'
                  }
                ]}
                rows={[
                  {
                    feature: 'Price per Person',
                    values: [
                      '$85',
                      { text: '$95', highlight: true },
                      '$105'
                    ]
                  },
                  {
                    feature: 'Duration',
                    values: ['4 hours', '4 hours', '4 hours']
                  },
                  {
                    feature: 'Professional DJ',
                    values: [true, true, true]
                  },
                  {
                    feature: 'Professional Photographer',
                    values: [true, true, true]
                  },
                  {
                    feature: 'Giant Lily Pad Floats',
                    values: [true, true, true]
                  },
                  {
                    feature: 'BYOB with Coolers & Ice',
                    values: [true, true, true]
                  },
                  {
                    feature: 'Party Supplies Included',
                    values: [true, true, true]
                  },
                  {
                    feature: 'Optional Add-on Packages',
                    values: ['Available', 'Available', 'Available']
                  },
                  {
                    feature: 'Best For',
                    values: [
                      'Sunset vibes & budget',
                      { text: 'Popular party time', highlight: true },
                      'Early celebration'
                    ]
                  }
                ]}
              />
            </CardContent>
          </Card>

          {/* 2. Large Disco vs Private Features Table */}
          <Card>
            <CardHeader>
              <CardTitle>Disco Cruise vs Private Cruise: What's Included</CardTitle>
              <CardDescription>
                Detailed feature comparison between our two cruise types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                        What's Included
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-purple-600 dark:text-purple-400">
                        <div className="flex items-center justify-center gap-2">
                          <Disc3 className="h-5 w-5" />
                          Disco Cruise
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-blue-600 dark:text-blue-400">
                        <div className="flex items-center justify-center gap-2">
                          <Ship className="h-5 w-5" />
                          Private Cruise
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Professional DJ</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Professional Photographer</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Private Cooler with Ice</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Mimosa Supplies (Juice, Fruit, Champagne Flutes)</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Multiple Lily Pad Floats (3 huge 6x20')</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center text-xs text-gray-500">Add-on: $400 for 4-hour cruise</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Party Supplies (Cups, Koozies, Name Tags, Bubbles)</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Ice Water Stations</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Clean Restroom Facilities</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Plenty of Shade Coverage</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Private Boat Charter (Entire Boat for Your Group)</td>
                      <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Captain & Crew Included</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Custom Playlist & Music Control</td>
                      <td className="px-6 py-4 text-center text-xs text-gray-500">DJ Curated</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Flexible Departure Times</td>
                      <td className="px-6 py-4 text-center text-xs text-gray-500">Set Schedule</td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Bring Your Own Decorations</td>
                      <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Price Range Comparison */}
              <div className="grid md:grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800 mt-6">
                <div className="px-6 py-6 text-center">
                  <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">Disco Cruise</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">$85-$105</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">per person (4 hours)</p>
                  <p className="text-xs text-gray-500 mt-2">Best for groups of 10-50</p>
                </div>
                <div className="px-6 py-6 text-center">
                  <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Private Cruise</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">Starting at $1,050</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">(for 4-hour cruise)</p>
                  <p className="text-xs text-gray-500 mt-2">Best for groups of 6-75</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Bachelorette Disco Time Slots */}
          <Card>
            <CardHeader>
              <CardTitle>Bachelorette Disco Cruise Time Slots</CardTitle>
              <CardDescription>
                Choose your perfect time slot - all include DJ, photographer, floats, and full amenities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Saturday Afternoon Slot */}
                <div className="border-2 rounded-lg p-6 space-y-4">
                  <div className="text-center">
                    <Disc3 className="h-12 w-12 mx-auto text-pink-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Saturday Afternoon</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      3:30pm - 7:30pm
                    </p>
                    <div className="text-3xl font-bold mb-2">$85/person</div>
                    <div className="text-lg text-green-600 font-semibold">$111.56 with tax & tip</div>
                    <Badge className="mt-2" variant="outline">Best Value</Badge>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Full 4-hour Lake Travis cruise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Professional DJ & photographer included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Giant lily pad floats & party supplies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>BYOB with coolers and ice provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Optional add-on packages available</span>
                    </li>
                  </ul>
                </div>

                {/* Friday Afternoon Slot */}
                <div className="border-4 border-pink-400 rounded-lg p-6 space-y-4 relative shadow-xl">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white">
                    BEST TIME
                  </Badge>
                  <div className="text-center mt-4">
                    <Crown className="h-12 w-12 mx-auto text-pink-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Friday Afternoon</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      12:00pm - 4:00pm
                    </p>
                    <div className="text-3xl font-bold mb-2">$95/person</div>
                    <div className="text-lg text-green-600 font-semibold">$124.88 with tax & tip</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Full 4-hour Lake Travis cruise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Professional DJ & photographer included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Giant lily pad floats & party supplies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>BYOB with coolers and ice provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Optional add-on packages available</span>
                    </li>
                  </ul>
                </div>

                {/* Saturday Morning Slot */}
                <div className="border-2 rounded-lg p-6 space-y-4">
                  <div className="text-center mt-4">
                    <Trophy className="h-12 w-12 mx-auto text-pink-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Saturday Morning</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      11:00am - 3:00pm
                    </p>
                    <div className="text-3xl font-bold mb-2">$105/person</div>
                    <div className="text-lg text-green-600 font-semibold">$137.81 with tax & tip</div>
                    <Badge className="mt-2" variant="secondary">Prime Time</Badge>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Full 4-hour Lake Travis cruise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Professional DJ & photographer included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Giant lily pad floats & party supplies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>BYOB with coolers and ice provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Optional add-on packages available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Bachelorette Private Package Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Private Cruise Options for Bachelorette Parties</CardTitle>
              <CardDescription>
                Want your own private boat? Choose from our three package tiers - all 4-hour cruises on our 14-person boat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Standard Private Cruise */}
                <div className="border-2 rounded-lg p-6 space-y-4">
                  <div className="text-center">
                    <Package className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Standard Private Cruise</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Essential cruise experience
                    </p>
                    <div className="text-3xl font-bold mb-2">$1,050</div>
                    <div className="text-sm text-gray-500">for 4-hour cruise</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Licensed, fun, experienced captains to take your group safely around the lake in style</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>2 large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Premium Bluetooth speaker system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Clean restroom facilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Comfortable seating for 14 guests</span>
                    </li>
                  </ul>
                </div>

                {/* Private Plus Essentials */}
                <div className="border-4 border-yellow-400 rounded-lg p-6 space-y-4 shadow-lg">
                  <Badge className="mb-2">MOST POPULAR</Badge>
                  <div className="text-center">
                    <Gift className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Private Plus Essentials</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Complete convenience package
                    </p>
                    <div className="text-3xl font-bold mb-2">$1,150</div>
                    <div className="text-sm text-gray-500">for 4-hour cruise</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="font-semibold">Everything from Standard Cruise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Insulated 5-gallon dispenser with ice water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>15 gallons of fresh water & 30 solo cups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Coolers pre-stocked with 40lbs of ice</span>
                    </li>
                  </ul>
                </div>

                {/* Private with Ultimate Package */}
                <div className="border-2 rounded-lg p-6 space-y-4">
                  <div className="text-center">
                    <Crown className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Private with Ultimate Package</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Complete party experience
                    </p>
                    <div className="text-3xl font-bold mb-2">$1,300</div>
                    <div className="text-sm text-gray-500">for 4-hour cruise</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="font-semibold">Everything from Essentials Package</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>6x20' giant lily pad float</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Unicorn or ring float for guest of honor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>5 disco ball cups & bubble gun</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>20 champagne flutes & 3 fruit juices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

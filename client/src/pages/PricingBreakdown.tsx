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
import { DISCO_PRICING, PRIVATE_CRUISE_PRICING, BOATS } from '@shared/constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Disco Cruise Packages
const discoPackages = [
  {
    id: 'basic',
    name: 'Basic Bach Package',
    price: DISCO_PRICING.basic / 100,
    originalPrice: null,
    description: 'Join the ultimate bachelor party cruise',
    subtitle: 'BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise',
    features: [
      'Full 4-hour Lake Travis cruise experience',
      'Professional DJ entertainment all day',
      'Professional photographer capturing memories',
      'Digital photo delivery after the event',
      'Giant unicorn float access',
      'Multi-group party atmosphere',
      'BYOB with shared coolers & ice',
      'Alcohol delivery & lunch delivery available'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value'
  },
  {
    id: 'disco_queen',
    name: 'Disco Queen Package',
    price: DISCO_PRICING.disco_queen / 100,
    originalPrice: 110,
    description: 'Enhanced party experience with premium perks',
    subtitle: 'Private Cooler & Reserved Spot for Your Group',
    features: [
      'Everything in Basic Bach Package',
      'Private cooler with ice & storage bin for your group',
      'Reserved spot for your group on the boat',
      'Disco ball cup & bubble gun for guest of honor',
      'Complimentary direct-to-boat alcohol & lunch delivery',
      '25% discount on round-trip transportation',
      '$50-$100 voucher for Airbnb booze delivery',
      'Premium positioning on the boat'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'platinum',
    name: 'Super Sparkle Platinum',
    price: DISCO_PRICING.platinum / 100,
    originalPrice: 125,
    description: 'Ultimate all-inclusive party luxury',
    subtitle: 'Nothing to Carry, Cooler Stocked When You Arrive!',
    features: [
      'Everything in Disco Queen Package',
      'Personal unicorn float for guest of honor',
      'Mimosa setup with champagne flutes, 3 juices & chambong',
      '$100 voucher for Airbnb concierge services',
      'Towel service & SPF-50 spray sunscreen provided',
      'Nothing to carry - cooler pre-stocked with drinks',
      'Ultimate luxury bachelor/bachelorette experience',
      'Maximum celebration, minimum effort'
    ],
    popular: false,
    icon: Sparkles,
    badge: 'Ultimate Luxury'
  }
];

// Private Cruise Packages - 14-person boat (from constants)
const privateCruisePackages = [
  {
    id: 'standard',
    name: 'Standard Private Cruise',
    price: 800,
    baseHourlyRate: 200,
    addOnFee: 0,
    description: 'Essential cruise experience',
    features: [
      'Amazing, experienced captain',
      '2 large empty coolers (bring your own ice & drinks)',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for 14 guests',
      'Plenty of sun & shade areas'
    ],
    icon: Ship,
    badge: '$200/hour × 4 hours = $800'
  },
  {
    id: 'essentials',
    name: 'Private Plus Essentials',
    price: 900,
    baseHourlyRate: 200,
    addOnFee: 100,
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
    price: 1050,
    baseHourlyRate: 200,
    addOnFee: 250,
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
    badge: '$800 base + $250 package = $1,050'
  }
];

// Disco vs Private Comparison Data
const discoVsPrivateComparison: ComparisonRow[] = [
  {
    feature: 'Cost per Person',
    values: [
      { text: '$65-$95', highlight: true },
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
                        ATX Disco Cruise
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Basic Bach Package:</span>
                          <span className="font-semibold">{formatCurrency(DISCO_PRICING.basic)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Disco Queen Package:</span>
                          <span className="font-semibold">{formatCurrency(DISCO_PRICING.disco_queen)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Super Sparkle Platinum:</span>
                          <span className="font-semibold">{formatCurrency(DISCO_PRICING.platinum)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Ship className="h-5 w-5 text-blue-600" />
                        Private Boat Rentals
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Day Tripper (14 people):</span>
                          <span className="font-semibold">Starting at $1,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Meeseeks (25 people):</span>
                          <span className="font-semibold">Starting at $1,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Clever Girl (50 people):</span>
                          <span className="font-semibold">Starting at $2,000</span>
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
              {/* 3-Package Display */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 text-center">ATX Disco Cruise Packages</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {discoPackages.map((pkg, index) => {
                    const Icon = pkg.icon;
                    return (
                      <Card 
                        key={pkg.id} 
                        className={cn(
                          "relative overflow-hidden transition-all hover:shadow-xl",
                          pkg.popular && "border-2 border-blue-500 shadow-lg scale-105"
                        )}
                        data-testid={`package-disco-${pkg.id}`}
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
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-bold text-blue-600">
                                {formatCurrency(pkg.price * 100)}
                              </span>
                              {pkg.originalPrice && (
                                <span className="text-lg text-gray-400 line-through">
                                  {formatCurrency(pkg.originalPrice * 100)}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{pkg.subtitle}</p>
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
                            <Link href="/atx-disco-cruise">
                              View Details <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Disco Pricing Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Disco Cruise Pricing</CardTitle>
                  <CardDescription>
                    Complete breakdown of all package features and pricing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PricingTable2 variant="disco" />
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
                            <div className="text-3xl font-bold text-blue-600">
                              From {formatCurrency(pkg.price * 100)}
                            </div>
                            <Badge variant="outline">{pkg.badge}</Badge>
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

          {/* 1. Bachelorette Package Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Bachelorette Package Comparison</CardTitle>
              <CardDescription>
                Compare our three bachelorette party packages side-by-side
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComparisonTable2
                columns={[
                  {
                    id: 'basic',
                    title: 'Basic Bach Package',
                    subtitle: 'Budget-friendly fun',
                    badge: { text: 'Great Value', variant: 'outline' }
                  },
                  {
                    id: 'disco_queen',
                    title: 'Disco Queen Package',
                    subtitle: 'Most Popular Choice',
                    recommended: true,
                    badge: { text: 'Bride Cruises FREE!', variant: 'default' }
                  },
                  {
                    id: 'platinum',
                    title: 'Platinum Package',
                    subtitle: 'All-inclusive luxury'
                  }
                ]}
                rows={[
                  {
                    feature: 'Price per Person',
                    values: [
                      '$85',
                      { text: '$95', highlight: true },
                      '$125'
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
                    feature: 'Giant Unicorn Float',
                    values: [true, true, true]
                  },
                  {
                    feature: 'Cooler Service',
                    values: ['Shared cooler', 'Private cooler for group', 'Pre-stocked cooler']
                  },
                  {
                    feature: 'Special Perks',
                    values: [
                      'BYOB',
                      'Disco cups & bubble gun',
                      'Mimosa bar setup'
                    ]
                  },
                  {
                    feature: 'Food/Drink Delivery',
                    values: ['Available', 'Complimentary', 'Complimentary + $100 voucher']
                  },
                  {
                    feature: 'Transportation Discount',
                    values: [false, '25% off', '25% off']
                  },
                  {
                    feature: 'Best For',
                    values: [
                      'Budget-conscious groups',
                      { text: 'Groups of 8-20', highlight: true },
                      'VIP experience seekers'
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
                      <td className="px-6 py-4 text-center text-xs text-gray-500">Add-on: $100/hr</td>
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
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">Starting at $200/hour</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">(3-4 hr minimum)</p>
                  <p className="text-xs text-gray-500 mt-2">Best for groups of 6-75</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Bachelorette Disco Package Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Bachelorette Disco Cruise Packages</CardTitle>
              <CardDescription>
                Three package tiers for bachelorette parties - Bride cruises FREE with Disco Queen & Platinum!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Basic Bach Package */}
                <div className="border-2 rounded-lg p-6 space-y-4">
                  <div className="text-center">
                    <Disc3 className="h-12 w-12 mx-auto text-pink-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Basic Bach Package</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Budget-friendly fun
                    </p>
                    <div className="text-3xl font-bold mb-2">$85/person</div>
                    <div className="text-lg text-green-600 font-semibold">$109 with tax & tip</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Join the BEST bachelorette party on Lake Travis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>BYOB with shared cooler and ice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Professional DJ and photographer included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Giant floats and party atmosphere</span>
                    </li>
                  </ul>
                </div>

                {/* Disco Queen Package */}
                <div className="border-4 border-pink-400 rounded-lg p-6 space-y-4 relative shadow-xl">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white">
                    MOST POPULAR
                  </Badge>
                  <Badge className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs">
                    BRIDE FREE!
                  </Badge>
                  <div className="text-center mt-4">
                    <Crown className="h-12 w-12 mx-auto text-pink-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Disco Queen Package</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Most Popular Choice
                    </p>
                    <div className="text-3xl font-bold mb-2">$95/person</div>
                    <div className="text-lg text-green-600 font-semibold">$122 with tax & tip</div>
                    <div className="text-sm text-gray-400 line-through">was $125</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>🎉 BRIDE CRUISES FREE with this package!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Private cooler with ice for your group</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Disco ball cup & bubble gun for bride</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Complimentary alcohol & lunch delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>25% discount on round-trip transportation</span>
                    </li>
                  </ul>
                </div>

                {/* Platinum Package */}
                <div className="border-2 rounded-lg p-6 space-y-4">
                  <Badge className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs">
                    BRIDE FREE!
                  </Badge>
                  <div className="text-center mt-4">
                    <Trophy className="h-12 w-12 mx-auto text-pink-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Super Sparkle Platinum</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      All-inclusive luxury
                    </p>
                    <div className="text-3xl font-bold mb-2">$125/person</div>
                    <div className="text-lg text-green-600 font-semibold">$135 with tax & tip</div>
                    <div className="text-sm text-gray-400 line-through">was $140</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>🎉 BRIDE CRUISES FREE with this package!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Personal unicorn float for the bride</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Mimosa setup with flutes, juices & chambong</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Cooler pre-stocked with drinks on arrival</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Everything from Disco Queen Package</span>
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
                    <div className="text-3xl font-bold mb-2">$200/hour</div>
                    <div className="text-sm text-gray-500">4-hour minimum = $800</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Amazing, experienced captain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>2 large empty coolers (bring your own ice & drinks)</span>
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
                    <div className="text-3xl font-bold mb-2">$225/hour</div>
                    <div className="text-sm text-gray-500">4-hour minimum = $900</div>
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
                    <div className="text-3xl font-bold mb-2">$250/hour</div>
                    <div className="text-sm text-gray-500">4-hour minimum = $1,000</div>
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

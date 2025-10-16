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
  TrendingUp, ArrowRight
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

// Private Cruise Packages (simplified from actual pricing)
const privateCruisePackages = [
  {
    id: 'standard',
    name: 'Standard Package',
    price: 150,
    description: 'Essential private cruise experience',
    features: [
      'Private boat rental (4-6 hours)',
      'USCG certified captain & crew',
      'Fuel and standard operation',
      'Sound system & Bluetooth',
      'Safety equipment included',
      'Coolers and ice provided',
      'Up to boat capacity passengers'
    ],
    icon: Ship,
    badge: 'Essential'
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: 200,
    description: 'Enhanced private cruise with extras',
    features: [
      'Everything in Standard Package',
      'Extended cruise time options',
      'Premium sound system upgrade',
      'Floating mat & water toys',
      'Decorations setup included',
      'Photo service available',
      'Flexible departure times'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'luxury',
    name: 'Luxury Package',
    price: 300,
    description: 'Ultimate private cruise luxury',
    features: [
      'Everything in Premium Package',
      'Largest boat availability',
      'Professional photographer',
      'Catered food & beverage options',
      'Custom itinerary planning',
      'Premium decorations & setup',
      'White-glove service'
    ],
    icon: Star,
    badge: 'VIP Experience'
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
                <DiscoVsPrivateComparison2 />
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
      </div>

      <Footer />
    </div>
  );
}

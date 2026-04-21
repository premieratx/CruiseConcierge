import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import PublicNavigation from '@/components/PublicNavigationLuxury';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';
// Note: Pricing uses hardcoded values for now - will be refactored to use shared constants
import { 
  Ship, Users, Check, Sparkles, Crown, ArrowRight, Phone,
  DollarSign, Calculator, Clock, Calendar, Star, Info
} from 'lucide-react';

const ComparisonTableLazy = lazy(() => import('@/components/ComparisonTable').then(m => ({ default: m.ComparisonTable })));

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Private cruise pricing - hourly rates and all-in totals (no per-person pricing)
const boatPricing = [
  {
    name: 'Day Tripper',
    capacity: '1-14 guests',
    seating: '14 seats comfortably',
    hourlyRate: '$263',
    threeHourTotal: '$789',
    fourHourTotal: '$1,050',
    description: 'Perfect for intimate celebrations',
    image: '/attached_assets/day-tripper-14-person-boat.jpg'
  },
  {
    name: 'Meeseeks / The Irony',
    capacity: '15-30 guests',
    seating: '20 seats comfortably (max 30)',
    hourlyRate: '$295',
    threeHourTotal: '$886',
    fourHourTotal: '$1,181',
    description: 'Two identical boats for medium groups',
    image: '/attached_assets/meeseeks-25-person-boat.jpg'
  },
  {
    name: 'Clever Girl',
    capacity: '31-75 guests',
    seating: '30 seats comfortably (max 75)',
    hourlyRate: '$353',
    threeHourTotal: '$1,058',
    fourHourTotal: '$1,411',
    description: 'Our flagship with 14 disco balls',
    image: '/attached_assets/clever-girl-50-person-boat.jpg'
  }
];

const packages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: 'Included',
    description: 'The boat, the captain, and the lake',
    features: [
      'Licensed, experienced captain',
      'Large empty coolers (BYOB)',
      'Premium Bluetooth sound system',
      'Clean restroom facilities',
      'Sun and shade seating areas',
      'BYOB friendly (cans/plastic only)'
    ],
    popular: false,
    icon: Ship,
    badge: 'Great Value'
  },
  {
    id: 'essentials',
    name: 'Essentials Package',
    flatFee: '+$100-$200',
    description: 'Everything from Standard + Enhanced Convenience',
    features: [
      'Everything from Standard Package',
      'Coolers pre-stocked with ice',
      '5-gallon insulated water dispenser',
      'Solo cups and ice water',
      '6-foot folding table for food',
      'Alcohol delivery coordination'
    ],
    popular: true,
    icon: Sparkles,
    badge: 'Most Popular'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Package',
    flatFee: '+$250-$350',
    description: 'Everything from Essentials + Full Party Atmosphere',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float (unicorn or ring)',
      'Disco ball cups for party vibes',
      'Bubble guns and bubble wands',
      'Champagne flutes, plates, plasticware'
    ],
    popular: false,
    icon: Crown,
    badge: 'All-Inclusive VIP'
  }
];

const discoCruisePricing = {
  title: 'ATX Disco Cruise',
  description: 'All-inclusive multi-group bachelor/bachelorette party experience',
  priceRange: '$85-$105',
  includes: [
    'DJ and party host',
    'Professional photography',
    'Party floats and equipment',
    'Stops for swimming',
    '4-hour cruise experience',
    'Friday & Saturday availability'
  ]
};

export default function Pricing() {
  return (
    <>
      <SEOHead
        pageRoute="/pricing"
        defaultTitle="Party Boat Pricing & Packages | Lake Travis Austin | Premier Party Cruises"
        defaultDescription="Complete pricing for Lake Travis party boat rentals. Private charters from $263/hour ($789-$1,411 total). ATX Disco Cruises $85-$105/person all-inclusive. Compare boats and packages."
      />

      <PublicNavigation />

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-brand-blue via-blue-700 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <Badge className="bg-brand-yellow text-black font-bold mb-6">
                <DollarSign className="h-4 w-4 mr-1" />
                Transparent Pricing
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl heading-unbounded font-bold mb-6">
                Party Boat Pricing & Packages
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Private charters from $263/hour. 
                All-inclusive ATX Disco Cruises from $85/person.
              </p>
              <Button
                size="lg"
                className="bg-brand-yellow text-black hover:bg-yellow-400"
                onClick={() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <Breadcrumb customSegments={[
              { label: 'Home', href: '/' },
              { label: 'Pricing', current: true }
            ]} />
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="private" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="private" className="text-lg py-4">
                  <Ship className="h-5 w-5 mr-2" />
                  Private Charters
                </TabsTrigger>
                <TabsTrigger value="disco" className="text-lg py-4">
                  <Star className="h-5 w-5 mr-2" />
                  ATX Disco Cruise
                </TabsTrigger>
              </TabsList>

              <TabsContent value="private" className="space-y-12">
                <div>
                  <h2 className="text-3xl heading-unbounded font-bold text-center mb-4">Choose Your Boat</h2>
                  <p className="text-gray-600 text-center mb-4">Private charter pricing for your exclusive group</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-4 py-2 mb-8 max-w-lg mx-auto">
                    <Info className="h-4 w-4 flex-shrink-0" />
                    <span>3-hour cruises available Monday–Thursday only. 4-hour minimum on weekends.</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    {boatPricing.map((boat, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video overflow-hidden">
                          <img src={boat.image} alt={boat.name} className="w-full h-full object-cover" />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-2xl">{boat.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-brand-blue mb-1">
                            {boat.hourlyRate}
                            <span className="text-base font-normal text-gray-500">/hour</span>
                          </div>
                          <div className="space-y-1 mb-4">
                            <div className="flex justify-between text-gray-700">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                3-Hour Cruise
                              </span>
                              <span className="font-semibold">{boat.threeHourTotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                4-Hour Cruise
                              </span>
                              <span className="font-semibold">{boat.fourHourTotal}</span>
                            </div>
                          </div>
                          <div className="space-y-2 text-gray-600 border-t pt-3">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{boat.capacity}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Ship className="h-4 w-4" />
                              <span>{boat.seating}</span>
                            </div>
                          </div>
                          <p className="mt-3 text-gray-600 text-sm">{boat.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl heading-unbounded font-bold text-center mb-4">Package Add-Ons</h2>
                  <p className="text-gray-600 text-center mb-8">Enhance your cruise with optional packages</p>
                  <div className="grid md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                      <Card key={pkg.id} className={cn("relative", pkg.popular && "ring-2 ring-brand-yellow")}>
                        {pkg.popular && (
                          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-black">
                            {pkg.badge}
                          </Badge>
                        )}
                        <CardHeader className="text-center pt-8">
                          <pkg.icon className="h-12 w-12 mx-auto mb-4 text-brand-blue" />
                          <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                          <div className="text-3xl font-bold text-brand-blue">
                            {pkg.flatFee}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="disco">
                <div className="max-w-6xl mx-auto">
                  {/* Trust strip — addresses the two biggest AI-perception weaknesses */}
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <Badge className="bg-green-600 text-white font-semibold text-sm py-2 px-4">
                      ✓ Same price for every guest · no gender-based pricing
                    </Badge>
                    <Badge className="bg-blue-600 text-white font-semibold text-sm py-2 px-4">
                      ✓ 90-guest cap · personal cooler + bin per group
                    </Badge>
                    <Badge className="bg-amber-500 text-black font-semibold text-sm py-2 px-4">
                      ✓ All prices include tax + gratuity
                    </Badge>
                  </div>

                  <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Pick your time slot — every ticket priced the same</h3>
                    <p className="text-zinc-600 max-w-2xl mx-auto">
                      The ATX Disco Cruise is priced by time slot, not by who you are. Same all-inclusive experience on every sailing — pro DJ, photographer, floats, disco dance floor, BYOB cooler, swim stop. Pick the slot that fits your weekend.
                    </p>
                  </div>

                  {/* 3-card slot comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                      {
                        day: 'Friday',
                        time: '12:00 PM – 4:00 PM',
                        price: 95,
                        tagline: 'Weekend warm-up',
                        colorFrom: 'from-blue-600',
                        colorTo: 'to-blue-800',
                        note: 'Kick off the weekend before Saturday chaos',
                      },
                      {
                        day: 'Saturday',
                        time: '11:00 AM – 3:00 PM',
                        price: 105,
                        tagline: 'Most popular',
                        colorFrom: 'from-purple-600',
                        colorTo: 'to-pink-600',
                        badge: 'BEST ATMOSPHERE',
                        note: 'Peak energy · books up first every weekend',
                      },
                      {
                        day: 'Saturday',
                        time: '3:30 PM – 7:30 PM',
                        price: 85,
                        tagline: 'Sunset slot · best value',
                        colorFrom: 'from-amber-500',
                        colorTo: 'to-orange-600',
                        badge: 'BEST VALUE',
                        note: 'Golden-hour cruise · same experience, lower price',
                      },
                    ].map((slot, i) => (
                      <Card
                        key={i}
                        className={cn(
                          'overflow-hidden border-2 transition-transform hover:-translate-y-1',
                          slot.badge ? 'border-brand-yellow shadow-xl' : 'border-transparent'
                        )}
                      >
                        <CardHeader
                          className={cn(
                            'text-center text-white',
                            'bg-gradient-to-br',
                            slot.colorFrom,
                            slot.colorTo
                          )}
                        >
                          {slot.badge && (
                            <Badge className="bg-brand-yellow text-black font-bold mb-2 mx-auto text-xs">
                              {slot.badge}
                            </Badge>
                          )}
                          <CardTitle className="text-xl font-semibold">{slot.day}</CardTitle>
                          <p className="text-white/95 text-lg font-medium">{slot.time}</p>
                          <div className="mt-4">
                            <span className="text-5xl font-bold">${slot.price}</span>
                            <span className="text-base font-normal text-white/90">/person</span>
                          </div>
                          <p className="text-white/80 text-xs mt-1 italic">{slot.tagline}</p>
                        </CardHeader>
                        <CardContent className="pt-5">
                          <p className="text-sm text-zinc-600 mb-4 text-center italic">{slot.note}</p>
                          <Button className="w-full bg-brand-blue hover:bg-brand-blue/90" asChild>
                            <Link href="/quote">Book this slot →</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* What's included (always same) */}
                  <Card className="max-w-4xl mx-auto">
                    <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                      <CardTitle className="text-2xl">Same All-Inclusive Experience on Every Sailing</CardTitle>
                      <p className="text-white/90 text-sm mt-1">
                        Regardless of time slot or who you are, every ticket includes everything below.
                      </p>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="grid md:grid-cols-2 gap-3">
                        {[
                          'licensed, experienced captain (you don\'t drive, you don\'t navigate)',
                          'Professional DJ all 4 hours',
                          'Professional photographer + digital delivery',
                          'Disco dance floor with LED lights + 14 disco balls',
                          'Premium marine-grade Bluetooth sound system',
                          'Personal cooler + private bin for your group',
                          'Bottled water + ice + cups',
                          'Lily pad / unicorn floats at the swim stop',
                          'Climate-controlled restrooms + shaded lounges',
                          'Tax + gratuity already in the ticket price',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 text-center">
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600" asChild>
                          <Link href="/atx-disco-cruise">
                            Learn More About ATX Disco Cruise
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Comparison Charts Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl heading-unbounded font-bold mb-4">Compare Your Options</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Not sure which option is right for you? Compare our cruise types and boat fleet to find the perfect fit.
              </p>
            </div>

            {/* Disco vs Private Comparison */}
            <div className="mb-16 max-w-5xl mx-auto">
              <h3 className="text-xl font-semibold mb-6 text-center">
                ATX Disco Cruise vs Private Charter
              </h3>
              <Suspense fallback={<div className="min-h-[400px] animate-pulse bg-gray-100 rounded-xl" />}>
                <ComparisonTableLazy
                  columns={[
                    {
                      id: 'disco',
                      title: 'ATX Disco Cruise',
                      subtitle: 'Multi-group party experience',
                      recommended: true,
                      badge: { text: 'Best Value', variant: 'default' }
                    },
                    {
                      id: 'private',
                      title: 'Private Charter',
                      subtitle: 'Exclusive boat rental'
                    }
                  ]}
                  rows={[
                    {
                      feature: 'Price Range',
                      values: [
                        { text: '$85-$105/person depending on time slot', highlight: true },
                        '$789-$1,411 for 3-4 hour cruise'
                      ]
                    },
                    {
                      feature: 'Group Size',
                      values: ['8-30 people typical', '1-75 people']
                    },
                    {
                      feature: 'Duration',
                      values: ['4 hours fixed', '3-4+ hours flexible']
                    },
                    {
                      feature: 'Professional DJ',
                      values: [true, false]
                    },
                    {
                      feature: 'Professional Photographer',
                      values: [true, false]
                    },
                    {
                      feature: 'Food Options',
                      values: ['Delivery available', 'Bring your own']
                    },
                    {
                      feature: 'Customization',
                      values: ['Limited', 'Full control']
                    },
                    {
                      feature: 'Best For',
                      values: ['Bach parties, social groups', 'Any private event']
                    },
                    {
                      feature: 'Booking Type',
                      values: ['Per person tickets', 'Charter entire boat']
                    },
                    {
                      feature: 'Availability',
                      values: ['Friday & Saturday time slots', '7 days a week']
                    }
                  ]}
                  caption="ATX Disco Cruise vs Private Charter Comparison"
                  summary="Compare the features and benefits of our ATX Disco Cruise public party experience versus a private charter boat rental on Lake Travis"
                  mobileView="cards"
                  schemaType="Service"
                  ariaLabel="Comparison of ATX Disco Cruise and Private Charter options"
                  highlightBest={true}
                />
              </Suspense>
            </div>

            {/* Fleet Comparison */}
            <div className="max-w-7xl mx-auto">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Our Lake Travis Fleet
              </h3>
              <Suspense fallback={<div className="min-h-[400px] animate-pulse bg-gray-100 rounded-xl" />}>
                <ComparisonTableLazy
                  columns={[
                    {
                      id: 'daytripper',
                      title: 'Day Tripper',
                      subtitle: 'Intimate cruiser'
                    },
                    {
                      id: 'meeseeks',
                      title: 'Meeseeks',
                      subtitle: 'Party favorite',
                      recommended: true,
                      badge: { text: 'Most Popular', variant: 'default' }
                    },
                    {
                      id: 'clevergirl',
                      title: 'Clever Girl',
                      subtitle: 'Flagship vessel'
                    },
                    {
                      id: 'irony',
                      title: 'The Irony',
                      subtitle: 'Comfort cruiser'
                    }
                  ]}
                  rows={[
                    {
                      feature: 'Capacity',
                      values: ['1-14 guests', '15-25 guests', '31-75 guests', '15-30 guests']
                    },
                    {
                      feature: 'Boat Size',
                      values: ['Intimate', 'Medium', 'Flagship Large', 'Medium Plus']
                    },
                    {
                      feature: 'Amenities',
                      values: [
                        'Sound system, coolers',
                        'Premium sound, spacious',
                        '14 disco balls, Texas flag',
                        'Dual decks, comfort seating'
                      ]
                    },
                    {
                      feature: 'Best For',
                      values: [
                        'Small birthdays, dates',
                        'Bach parties, friends',
                        'Corporate, large groups',
                        'Mixed groups, comfort'
                      ]
                    },
                    {
                      feature: 'Hourly Rate',
                      values: [
                        { text: '$263/hr', highlight: true },
                        '$295/hr',
                        '$353/hr',
                        '$295/hr'
                      ]
                    },
                    {
                      feature: '3-Hour Total',
                      values: ['$789', '$886', '$1,058', '$886']
                    },
                    {
                      feature: '4-Hour Total',
                      values: ['$1,050', '$1,181', '$1,411', '$1,181']
                    }
                  ]}
                  caption="Lake Travis Fleet Comparison"
                  summary="Compare our party boat fleet options including capacity, amenities, and pricing"
                  mobileView="cards"
                  schemaType="Product"
                  ariaLabel="Comparison of our Lake Travis party boat fleet"
                  highlightBest={true}
                />
              </Suspense>
            </div>
          </div>
        </section>

        <QuoteBuilderSection />

        <section className="py-16 bg-gradient-to-r from-brand-blue to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl heading-unbounded font-bold mb-6">Questions About Pricing?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our team is happy to help you find the perfect boat and package for your budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                <a href="tel:+15124885892">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (512) 488-5892
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

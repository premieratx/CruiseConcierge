import { Link } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@shared/formatters';
import { PRICING_DEFAULTS, PACKAGE_FLAT_FEES } from '@shared/constants';
import { cn } from '@/lib/utils';
import { 
  Ship, Users, Check, Sparkles, Crown, ArrowRight, Phone,
  DollarSign, Calculator, Clock, Calendar, Star
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const boatPricing = [
  {
    name: 'Day Tripper',
    capacity: '6-14 guests',
    seating: '14 seats comfortably',
    pricePerPerson: PRICING_DEFAULTS.PRIVATE_PER_PERSON_25,
    minGuests: 6,
    maxGuests: 14,
    description: 'Perfect for intimate celebrations',
    image: '/attached_assets/day-tripper-14-person-boat.jpg'
  },
  {
    name: 'Meeseeks / The Irony',
    capacity: '15-30 guests',
    seating: '20 seats comfortably (max 30)',
    pricePerPerson: PRICING_DEFAULTS.PRIVATE_PER_PERSON_25,
    minGuests: 15,
    maxGuests: 30,
    description: 'Two identical boats for medium groups',
    image: '/attached_assets/meeseeks-25-person-boat.jpg'
  },
  {
    name: 'Clever Girl',
    capacity: '31-75 guests',
    seating: '30 seats comfortably (max 75)',
    pricePerPerson: PRICING_DEFAULTS.PRIVATE_PER_PERSON_50,
    minGuests: 31,
    maxGuests: 75,
    description: 'Our flagship with 14 disco balls',
    image: '/attached_assets/clever-girl-50-person-boat.jpg'
  }
];

const packages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: 0,
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
    flatFee: PACKAGE_FLAT_FEES.ESSENTIALS,
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
    flatFee: PACKAGE_FLAT_FEES.ULTIMATE,
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
  pricePerPerson: PRICING_DEFAULTS.DISCO_PER_PERSON,
  includes: [
    'DJ and party host',
    'Open bar (beer, wine, cocktails)',
    'Food spread',
    'Professional photography',
    'Party floats and equipment',
    'Stops for swimming',
    '3-hour cruise experience'
  ]
};

export default function Pricing() {
  return (
    <>
      <SEOHead
        title="Party Boat Pricing & Packages | Lake Travis Austin | Premier Party Cruises"
        description="Complete pricing for Lake Travis party boat rentals. Private charters from $75/person. ATX Disco Cruises $149/person all-inclusive. See packages, boats, and add-ons."
        canonical="https://premierpartycruises.com/pricing"
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-6">
                Party Boat Pricing & Packages
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Private charters starting at ${PRICING_DEFAULTS.PRIVATE_PER_PERSON_25}/person. 
                All-inclusive ATX Disco Cruises at ${PRICING_DEFAULTS.DISCO_PER_PERSON}/person.
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
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Pricing' }
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
                  <h2 className="text-3xl font-playfair font-bold text-center mb-4">Choose Your Boat</h2>
                  <p className="text-gray-600 text-center mb-8">All boats include 3-hour cruise with experienced captain</p>
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
                          <div className="text-3xl font-bold text-brand-blue mb-2">
                            {formatCurrency(boat.pricePerPerson)}
                            <span className="text-lg font-normal text-gray-500">/person</span>
                          </div>
                          <div className="space-y-2 text-gray-600">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{boat.capacity}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Ship className="h-4 w-4" />
                              <span>{boat.seating}</span>
                            </div>
                          </div>
                          <p className="mt-4 text-gray-600">{boat.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-playfair font-bold text-center mb-4">Package Add-Ons</h2>
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
                          {pkg.flatFee > 0 ? (
                            <div className="text-3xl font-bold text-brand-blue">
                              +{formatCurrency(pkg.flatFee)}
                            </div>
                          ) : (
                            <div className="text-xl text-gray-500">Included</div>
                          )}
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
                <Card className="max-w-3xl mx-auto">
                  <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                    <Badge className="bg-brand-yellow text-black font-bold mb-4 mx-auto">
                      All-Inclusive Experience
                    </Badge>
                    <CardTitle className="text-3xl">{discoCruisePricing.title}</CardTitle>
                    <p className="text-white/90">{discoCruisePricing.description}</p>
                    <div className="text-5xl font-bold mt-4">
                      {formatCurrency(discoCruisePricing.pricePerPerson)}
                      <span className="text-xl font-normal">/person</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-4">Everything Included:</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {discoCruisePricing.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          <span>{item}</span>
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
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <QuoteBuilderSection />

        <section className="py-16 bg-gradient-to-r from-brand-blue to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-bold mb-6">Questions About Pricing?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our team is happy to help you find the perfect boat and package for your budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                <a href="tel:512-709-1560">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 512-709-1560
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

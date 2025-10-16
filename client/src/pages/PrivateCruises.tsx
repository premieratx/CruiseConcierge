import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, 
  Zap, Target, Play, Gift,
  MessageSquare, Ticket, Volume2, 
  Mic, Utensils, GlassWater, UserCheck, Leaf, Check,
  AlertCircle, DollarSign, Timer, CreditCard, CloudRain, 
  HelpCircle, Anchor, Droplets, Waves, Info, TrendingUp,
  Gem, Flower, CircleDot, Smile, X, Package,
  Plane, Wine, Eye, Bot, Briefcase, Building2, Cake, GraduationCap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';

// Hero images
import heroImage1 from '@assets/clever-girl-50-person-boat.webp';
import heroImage2 from '@assets/meeseeks-25-person-boat.webp';
import heroImage3 from '@assets/day-tripper-14-person-boat.webp';
import galleryImage1 from '@assets/party-atmosphere-1.webp';
import galleryImage2 from '@assets/party-atmosphere-2.webp';
import galleryImage3 from '@assets/party-atmosphere-3.webp';

// Private Cruise Package Tiers
const privateCruisePackages = [
  {
    id: 'standard',
    name: 'Standard Package',
    hourlyRate: { dayTripper: 200, meeseeks: 225, cleverGirl: 300 },
    description: 'Basic cruise experience',
    subtitle: 'The boat, the captain, and the lake - ready for your event',
    features: [
      'Professional captain and crew',
      'Large coolers (bring your own ice)',
      'Premium Bluetooth sound system',
      'Clean restroom facilities',
      'Sun and shade seating areas',
      'BYOB friendly (cans/plastic only)',
      'Basic cruise experience'
    ],
    popular: false,
    icon: Ship,
    badge: 'Great Value',
    color: 'blue'
  },
  {
    id: 'essentials',
    name: 'Essentials Package',
    hourlyUpgrade: 100,
    description: 'Enhanced convenience',
    subtitle: 'Everything from Standard Package + Enhanced Convenience',
    features: [
      'Everything from Standard Package',
      'Coolers pre-stocked with ice',
      '5-gallon insulated water dispenser',
      'Solo cups and ice water',
      '6-foot folding table for food',
      'Vendor coordination for catering',
      'Enhanced convenience'
    ],
    popular: true,
    icon: Sparkles,
    badge: 'Most Popular',
    color: 'yellow'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Package',
    hourlyUpgrade: 250,
    description: 'Full party atmosphere setup',
    subtitle: 'Everything from Essentials Package + Full Party Atmosphere',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float (unicorn or ring)',
      'Disco ball cups for party vibes',
      'Bubble guns and bubble wands',
      'Champagne flutes and fruit juices',
      'SPF-50 spray sunscreen',
      'Plates, plasticware, paper towels',
      'Full party atmosphere setup'
    ],
    popular: false,
    icon: Crown,
    badge: 'All-Inclusive VIP',
    color: 'purple'
  }
];

// Fleet options with pricing
const fleetOptions = [
  {
    name: 'Day Tripper',
    capacity: 'Up to 14 guests',
    baseRate: 200,
    image: heroImage3,
    features: ['Licensed captain and premium sound system', 'Coolers with ice provided', 'Comfortable seating with sun and shade', '4-hour minimum', 'Ideal for small birthday parties and gatherings']
  },
  {
    name: 'Meeseeks & The Irony',
    capacity: '15-30 guests',
    baseRate: 225,
    image: heroImage2,
    features: ['Professional captain and crew', 'Premium Bluetooth sound system', 'Large coolers with ice', '4-hour minimum', 'Perfect for bachelor/bachelorette parties']
  },
  {
    name: 'Clever Girl',
    capacity: '30-75 guests',
    baseRate: 300,
    image: heroImage1,
    features: ['Flagship boat with 14 disco balls', 'Giant Texas flag display', 'Professional crew and premium amenities', '4-hour minimum', 'Ideal for corporate events and large celebrations']
  }
];

// What's included in private cruises
const whatsIncluded = [
  {
    icon: Ship,
    title: 'Private Boat Charter',
    description: 'Entire boat exclusively for your group - no sharing!'
  },
  {
    icon: UserCheck,
    title: 'Captain & Crew',
    description: 'USCG licensed professionals handling all navigation'
  },
  {
    icon: Music,
    title: 'Custom Music',
    description: 'Bluetooth sound system - play YOUR playlist'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Choose your departure time and cruise duration'
  },
  {
    icon: Anchor,
    title: 'Cooler & Ice',
    description: 'Large cooler with ice for your BYOB beverages'
  },
  {
    icon: Droplets,
    title: 'Ice Water Stations',
    description: 'Stay hydrated with unlimited ice water'
  },
  {
    icon: Shield,
    title: 'Restroom Facilities',
    description: 'Clean onboard restroom for your comfort'
  },
  {
    icon: Sun,
    title: 'Covered Shade',
    description: 'Covered areas to escape the Texas sun'
  },
  {
    icon: Wine,
    title: 'BYOB Friendly',
    description: 'Bring your own beverages and decorations'
  }
];

// FAQs
const faqItems = [
  {
    id: 'pricing',
    question: 'How does private cruise pricing work?',
    answer: 'Private cruises are charged hourly based on the boat size. Day Tripper (up to 14 guests) starts at $200/hr, Meeseeks & The Irony (15-30 guests) at $225/hr, and Clever Girl (30-75 guests) at $300/hr. Add Essentials Package for $100/hr or Ultimate Package for $250/hr more. 4-hour minimum required.'
  },
  {
    id: 'minimum',
    question: 'What is the minimum booking time?',
    answer: '4-hour minimum required for all private cruises. Most groups book 4 hours for a perfect Lake Travis experience.'
  },
  {
    id: 'crew-fees',
    question: 'Are there additional crew fees?',
    answer: 'Additional crew fees apply for larger groups: $50/hour for 26-30 guests, $100/hour for 51-75 guests. 8.25% tax added. Suggested 20% gratuity for exceptional service.'
  },
  {
    id: 'deposit',
    question: 'How much is the deposit?',
    answer: '25% deposit required if booking more than 30 days out. Full payment required if booking within 30 days of cruise date. Flexible payment options available.'
  },
  {
    id: 'cancellation',
    question: 'What is your cancellation policy?',
    answer: 'Full refund if canceled within 48 hours of booking. After that, weather-related cancellations receive full refund at captain\'s discretion.'
  },
  {
    id: 'bring',
    question: 'What can we bring on board?',
    answer: 'Bring your own beverages (BYOB - cans/plastic only), food, decorations, and party supplies. Standard Package requires you to bring your own ice; Essentials and Ultimate packages include ice.'
  },
  {
    id: 'weather',
    question: 'What happens in bad weather?',
    answer: 'Captain makes final call on weather safety. Severe weather results in reschedule or full refund. Light rain usually continues as planned.'
  },
  {
    id: 'booking-advance',
    question: 'How far in advance should we book?',
    answer: 'We recommend 6-12 weeks in advance, especially for weekends and peak season (May-September). Popular dates book up fast!'
  }
];

// Types of private cruises (for bottom links section)
const privateCruiseTypes = [
  {
    title: 'Team Building Events',
    description: 'Corporate team building on Lake Travis with activities and professional service',
    href: '/team-building',
    icon: Briefcase,
    testId: 'link-team-building'
  },
  {
    title: 'Client Entertainment',
    description: 'Impress clients with an exclusive Lake Travis boat experience',
    href: '/client-entertainment',
    icon: Building2,
    testId: 'link-client-entertainment'
  },
  {
    title: 'Company Milestones',
    description: 'Celebrate company achievements on a private boat charter',
    href: '/company-milestone',
    icon: Trophy,
    testId: 'link-company-milestone'
  },
  {
    title: 'Rehearsal Dinners',
    description: 'Intimate pre-wedding celebration on Lake Travis',
    href: '/rehearsal-dinner',
    icon: Heart,
    testId: 'link-rehearsal-dinner'
  },
  {
    title: 'Welcome Parties',
    description: 'Welcome out-of-town guests with a Lake Travis cruise',
    href: '/welcome-party',
    icon: Plane,
    testId: 'link-welcome-party'
  },
  {
    title: 'After Parties',
    description: 'Keep the celebration going after your wedding or event',
    href: '/after-party',
    icon: PartyPopper,
    testId: 'link-after-party'
  },
  {
    title: 'Sweet 16 Parties',
    description: 'Make their 16th birthday unforgettable on Lake Travis',
    href: '/sweet-16',
    icon: Cake,
    testId: 'link-sweet-16'
  },
  {
    title: 'Graduation Parties',
    description: 'Celebrate academic achievements with a boat party',
    href: '/graduation-party',
    icon: GraduationCap,
    testId: 'link-graduation-party'
  },
  {
    title: 'Milestone Birthdays',
    description: '30th, 40th, 50th+ birthday celebrations on the lake',
    href: '/milestone-birthday',
    icon: Gift,
    testId: 'link-milestone-birthday'
  }
];

export default function PrivateCruises() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleGetQuote = () => {
    setLocation('/booking.premierpartycruises.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SEOHead 
        pageRoute="/private-cruises"
        defaultTitle="Private Boat Cruises Lake Travis Austin"
        defaultDescription="Book exclusive private boat charters on Lake Travis Austin. USCG licensed captains, flexible schedules, BYOB friendly. Perfect for corporate events, weddings, birthdays. Starting at $200/hr."
      />
      
      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-yellow-500 to-purple-600 opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-blue-600 text-white text-sm px-4 py-1">
              PRIVATE BOAT CHARTERS
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-yellow-500 to-purple-600 bg-clip-text text-transparent">
              
                Your Private Boat. Your Rules. Your Lake Travis Adventure.
              
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              
                Exclusive boat charters for 14-75 guests. BYOB friendly. Choose your schedule, play your music, create your perfect day on the lake.
              
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg px-8 py-6"
                data-testid="button-hero-get-quote"
              >
                Get Your Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-bold text-lg px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Packages & Pricing
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-blue-600" />
                <span>Private Charter</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>14-75 Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Flexible Schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <Wine className="h-5 w-5 text-blue-600" />
                <span>BYOB Friendly</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <motion.img
              src={heroImage1}
              alt="Clever Girl 50+ person private boat charter Lake Travis"
              className="rounded-xl shadow-2xl w-full h-64 object-cover"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            />
            <motion.img
              src={heroImage2}
              alt="Me Seeks the Irony 25 person private boat Lake Travis"
              className="rounded-xl shadow-2xl w-full h-64 object-cover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            />
            <motion.img
              src={heroImage3}
              alt="Day Tripper 14 person intimate private boat charter"
              className="rounded-xl shadow-2xl w-full h-64 object-cover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            />
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 px-4" id="packages">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl h-auto">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white font-bold text-base py-3 rounded-lg transition-all"
                data-testid="tab-overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="packages" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-black font-bold text-base py-3 rounded-lg transition-all"
                data-testid="tab-packages"
              >
                Packages
              </TabsTrigger>
              <TabsTrigger 
                value="fleet" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white font-bold text-base py-3 rounded-lg transition-all"
                data-testid="tab-fleet"
              >
                Our Fleet
              </TabsTrigger>
              <TabsTrigger 
                value="faq" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-700 data-[state=active]:text-white font-bold text-base py-3 rounded-lg transition-all"
                data-testid="tab-faq"
              >
                FAQs
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
                  
                    Why Choose a Private Cruise?
                  
                </h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
                  
                    Your own private boat on Lake Travis - perfect for any celebration
                  
                </p>

                {/* What's Included Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {whatsIncluded.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-800"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                          <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={handleGetQuote}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                    data-testid="button-overview-get-quote"
                  >
                    Get Your Custom Quote Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
                  
                    Choose Your Package Level
                  
                </h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
                  
                    From basic charter to full VIP - customize your Lake Travis experience
                  
                </p>

                {/* Private vs Disco Comparison */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-center mb-8">Why Choose Private Charter?</h3>
                  <ComparisonTable
                    columns={[
                      {
                        id: 'private',
                        title: 'Private Charter',
                        subtitle: 'Your exclusive experience',
                        recommended: true,
                        badge: { text: 'Total Control', variant: 'default' }
                      },
                      {
                        id: 'disco',
                        title: 'ATX Disco Cruise',
                        subtitle: 'Multi-group party'
                      }
                    ]}
                    rows={[
                      {
                        feature: 'Boat Exclusivity',
                        values: [
                          { text: 'Entire boat to yourself', highlight: true },
                          'Share with other groups'
                        ]
                      },
                      {
                        feature: 'Music Control',
                        values: [
                          { text: 'Your playlist all day', highlight: true },
                          'DJ plays for everyone'
                        ]
                      },
                      {
                        feature: 'Schedule Flexibility',
                        values: [
                          { text: 'Choose any time', highlight: true },
                          'Fixed departures only'
                        ]
                      },
                      {
                        feature: 'Route Customization',
                        values: [
                          { text: 'Captain follows your wishes', highlight: true },
                          'Preset route'
                        ]
                      },
                      {
                        feature: 'Privacy',
                        values: [
                          { text: '100% private', highlight: true },
                          'Meet other groups'
                        ]
                      },
                      {
                        feature: 'Decoration Options',
                        values: [
                          { text: 'Decorate as you wish', highlight: true },
                          'Pre-decorated'
                        ]
                      },
                      {
                        feature: 'Food & Catering',
                        values: [
                          { text: 'Bring any food/catering', highlight: true },
                          'Snacks only'
                        ]
                      },
                      {
                        feature: 'Best For',
                        values: [
                          { text: 'Corporate, family, custom events', highlight: true },
                          'Bach parties only'
                        ]
                      },
                      {
                        feature: 'Group Size',
                        values: [
                          { text: 'Perfect fit for any size', highlight: true },
                          '8-50 people'
                        ]
                      }
                    ]}
                    caption="Private Charter vs ATX Disco Cruise Comparison"
                    summary="Compare the benefits of a private charter versus the multi-group ATX Disco Cruise experience"
                    mobileView="cards"
                    schemaType="Service"
                    ariaLabel="Comparison of Private Charter vs ATX Disco Cruise options"
                  />
                </div>

                {/* Package Comparison Table */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-center mb-8">Compare Private Cruise Packages</h3>
                  <ComparisonTable
                    columns={[
                      {
                        id: 'standard',
                        title: 'Standard Package',
                        subtitle: 'Essential cruise experience'
                      },
                      {
                        id: 'essentials',
                        title: 'Essentials Package',
                        subtitle: 'Enhanced convenience',
                        recommended: true,
                        badge: { text: 'Most Popular', variant: 'default' }
                      },
                      {
                        id: 'ultimate',
                        title: 'Ultimate Package',
                        subtitle: 'Complete VIP experience'
                      }
                    ]}
                    rows={[
                      {
                        feature: 'Hourly Rate (14-person boat)',
                        values: ['$200/hr', { text: '$300/hr', highlight: true }, '$400/hr']
                      },
                      {
                        feature: '4-Hour Total',
                        values: ['$800', { text: '$1,200', highlight: true }, '$1,600']
                      },
                      {
                        feature: 'Captain & Crew',
                        values: [true, true, true]
                      },
                      {
                        feature: 'Coolers Provided',
                        values: ['Empty coolers', { text: 'Pre-iced coolers', highlight: true }, { text: 'Pre-iced coolers', highlight: true }]
                      },
                      {
                        feature: 'Water Service',
                        values: ['BYOB', { text: '15 gallons + dispenser', highlight: true }, { text: '15 gallons + dispenser', highlight: true }]
                      },
                      {
                        feature: 'Party Supplies',
                        values: [false, 'Cups & table', { text: 'Full party setup', highlight: true }]
                      },
                      {
                        feature: 'Giant Float',
                        values: [false, false, { text: '20ft lily pad', highlight: true }]
                      },
                      {
                        feature: 'Champagne Setup',
                        values: [false, false, { text: '20 flutes + juices', highlight: true }]
                      },
                      {
                        feature: 'Fun Extras',
                        values: [false, false, { text: 'Bubble guns & disco balls', highlight: true }]
                      },
                      {
                        feature: 'Best For',
                        values: [
                          'Budget-conscious groups',
                          { text: 'Most bookings', highlight: true },
                          'Premium experiences'
                        ]
                      }
                    ]}
                    caption="Private Cruise Package Comparison"
                    summary="Compare our three private cruise package options to find the perfect level of service for your Lake Travis event"
                    mobileView="cards"
                    schemaType="Service"
                    ariaLabel="Comparison of Private Cruise package options"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {privateCruisePackages.map((pkg) => (
                    <Card 
                      key={pkg.id} 
                      className={cn(
                        "relative h-full transition-all duration-300",
                        pkg.popular && "border-4 border-yellow-400 shadow-2xl scale-105"
                      )}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className="bg-yellow-500 text-black font-black px-6 py-2 text-sm">
                            ⭐ MOST POPULAR
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4 pt-8">
                        <div className="flex justify-center mb-4">
                          <pkg.icon className={cn(
                            "h-16 w-16",
                            pkg.color === 'blue' && "text-blue-600",
                            pkg.color === 'yellow' && "text-yellow-500",
                            pkg.color === 'purple' && "text-purple-600"
                          )} />
                        </div>
                        <CardTitle className="text-2xl font-black">{pkg.name}</CardTitle>
                        <CardDescription className="text-sm mt-2 font-semibold">
                          {pkg.subtitle}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <div className="text-center border-t border-b border-gray-200 dark:border-gray-700 py-4">
                          {pkg.id === 'standard' ? (
                            <>
                              <div className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Starting at</div>
                              <div className="text-4xl font-black text-gray-900 dark:text-white">
                                ${pkg.hourlyRate?.dayTripper}/hr
                              </div>
                              <div className="text-sm text-gray-500 mt-2">
                                Day Tripper (up to 14 guests)
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Add per hour</div>
                              <div className="text-4xl font-black text-gray-900 dark:text-white">
                                +${pkg.hourlyUpgrade}
                              </div>
                              <div className="text-sm text-gray-500 mt-2">
                                Upgrade from Standard
                              </div>
                            </>
                          )}
                        </div>

                        <div className="space-y-3">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className={cn(
                                "h-5 w-5 flex-shrink-0 mt-0.5",
                                pkg.color === 'blue' && "text-blue-600",
                                pkg.color === 'yellow' && "text-yellow-500",
                                pkg.color === 'purple' && "text-purple-600"
                              )} />
                              <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Button
                          className={cn(
                            "w-full font-bold",
                            pkg.color === 'blue' && "bg-blue-600 hover:bg-blue-700",
                            pkg.color === 'yellow' && "bg-yellow-500 hover:bg-yellow-600 text-black",
                            pkg.color === 'purple' && "bg-purple-600 hover:bg-purple-700"
                          )}
                          onClick={handleGetQuote}
                          data-testid={`button-package-${pkg.id}`}
                        >
                          Select {pkg.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pricing Info */}
                <div className="bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-950/30 dark:to-yellow-950/30 border-2 border-blue-300 dark:border-blue-800 rounded-xl p-8 mb-8">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Info className="h-6 w-6 text-blue-600" />
                    Package Pricing by Boat Size
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Day Tripper (up to 14 guests)</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Standard: $200/hr</li>
                        <li>• Essentials: +$100/hr</li>
                        <li>• Ultimate: +$250/hr</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Meeseeks & The Irony (15-30 guests)</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Standard: $225/hr</li>
                        <li>• Essentials: +$100/hr</li>
                        <li>• Ultimate: +$250/hr</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2">Clever Girl (30-75 guests)</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Standard: $300/hr</li>
                        <li>• Essentials: +$100/hr</li>
                        <li>• Ultimate: +$250/hr</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                    * 4-hour minimum. Additional crew fees: $50/hr for 26-30 guests, $100/hr for 51-75 guests. 8.25% tax added. Suggested 20% gratuity.
                  </p>
                </div>

                {/* Transparent Pricing Section */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-2 border-green-300 dark:border-green-800 rounded-xl p-8">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    Transparent Pricing
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our pricing is simple and transparent. <strong>Hourly rate × duration = base cost</strong>. No hidden fees or surprise charges. Additional crew fees apply for larger groups: $50/hour for 26-30 guests, $100/hour for 51-75 guests. 8.25% tax added. Suggested 20% gratuity for exceptional service.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    25% deposit required if booking more than 30 days out. Full payment required if booking within 30 days of cruise date. Flexible payment options available.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Fleet Tab */}
            <TabsContent value="fleet" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
                  
                    Choose Your Boat
                  
                </h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
                  
                    Three boats, all pristine - pick the perfect size for your group
                  
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  {fleetOptions.map((boat, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-48">
                        <img 
                          src={boat.image} 
                          alt={`${boat.name} private boat charter Lake Travis`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                          ${boat.baseRate}/hr
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl font-black">{boat.name}</CardTitle>
                        <CardDescription className="text-lg font-semibold">
                          {boat.capacity}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {boat.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
                          onClick={handleGetQuote}
                          data-testid={`button-boat-${boat.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          Book {boat.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
                  
                    Frequently Asked Questions
                  
                </h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
                  
                    Everything you need to know about private boat charters
                  
                </p>

                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-left font-bold text-lg hover:text-blue-600">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-12 text-center">
                  <Button
                    size="lg"
                    onClick={handleGetQuote}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold"
                    data-testid="button-faq-get-quote"
                  >
                    Still Have Questions? Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Types of Private Cruises Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
            
              Popular Private Cruise Events
            
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
            
              Explore different types of private cruises we specialize in
            
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {privateCruiseTypes.map((type, index) => (
              <Link key={index} href={type.href} data-testid={type.testId}>
                <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-blue-500 group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:scale-110 transition-transform">
                        <type.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {type.title}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            
              Ready to Book Your Private Cruise?
            
          </h2>
          <p className="text-xl text-white/90 mb-8">
            
              Get your custom quote in minutes. Choose your boat, package, and perfect date on Lake Travis.
            
          </p>
          <Button
            size="lg"
            onClick={handleGetQuote}
            className="bg-white text-blue-600 hover:bg-gray-100 font-black text-xl px-12 py-8"
            data-testid="button-cta-get-quote"
          >
            Get Your Custom Quote Now
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Related Links */}
      <RelatedLinks 
        blogLinks={[
          { title: 'Private Cruise Planning Guide', href: '/blogs/private-cruise-planning-guide' },
          { title: 'Lake Travis Event Ideas', href: '/blogs/lake-travis-event-ideas' },
          { title: 'Corporate Event Planning', href: '/blogs/corporate-event-planning-austin' }
        ]}
      />

      <Footer />
    </div>
  );
}

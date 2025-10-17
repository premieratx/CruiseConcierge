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
  Plane, Wine, Eye, Bot, Briefcase, Building2, Cake, GraduationCap, LifeBuoy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';
import Breadcrumb from '@/components/Breadcrumb';
import { FeaturedSnippet } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';
import { WhatToBring } from '@/components/WhatToBring';
import { PricingTable } from '@/components/PricingTable';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionReveal } from '@/components/SectionReveal';

// Hero images
import heroImage1 from '@assets/clever-girl-50-person-boat.webp';
import heroImage2 from '@assets/meeseeks-25-person-boat.webp';
import heroImage3 from '@assets/day-tripper-14-person-boat.webp';
import galleryImage1 from '@assets/party-atmosphere-1.webp';
import galleryImage2 from '@assets/party-atmosphere-2.webp';
import galleryImage3 from '@assets/party-atmosphere-3.webp';

// Private Cruise Package Tiers - UPDATED PRICING
// Import from constants for accurate pricing
import { HOURLY_RATES, PACKAGE_FLAT_FEES, CREW_FEES } from '@shared/constants';

const privateCruisePackages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: { 14: 0, 25: 0, 30: 0, 50: 0, 75: 0 }, // No package fee for standard
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
    flatFee: PACKAGE_FLAT_FEES.ESSENTIALS, // $100-$200 flat fee depending on group size
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
    flatFee: PACKAGE_FLAT_FEES.ULTIMATE, // $250-$350 flat fee depending on group size
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead 
        pageRoute="/private-cruises"
        defaultTitle="Private Boat Cruises Lake Travis Austin"
        defaultDescription="Book exclusive private boat charters on Lake Travis Austin. USCG licensed captains, flexible schedules, BYOB friendly. Perfect for corporate events, weddings, birthdays. Starting at $200/hr."
      />
      
      <PublicNavigation />
      <Breadcrumb />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-gradient-to-br from-blue-100 via-white to-yellow-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-purple-100/30 to-yellow-100/30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal delay={0}>
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-6 py-2 border-0">
                PRIVATE BOAT CHARTERS
              </Badge>
              <h1 className="text-5xl font-bold font-playfair mb-8 text-gray-900 leading-tight">
                Private Boat Rentals Austin
              </h1>
              <p className="text-xl text-gray-900 mb-6 font-semibold">
                Your Private Boat. Your Rules. Your Lake Travis Adventure.
              </p>
              <p className="text-base text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed">
                Exclusive boat charters for 14-75 guests. BYOB friendly. Choose your schedule, play your music, create your perfect day on the lake. Perfect for <InternalLinkHighlight href="/corporate-events" title="Corporate Events">corporate events</InternalLinkHighlight>, <InternalLinkHighlight href="/corporate-events" title="Special Occasions">weddings & birthdays</InternalLinkHighlight>. Looking for a <InternalLinkHighlight href="/atx-disco-cruise" title="ATX Disco Cruise">party atmosphere</InternalLinkHighlight>? Check out our disco cruise!
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button
                  size="lg"
                  onClick={handleGetQuote}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl px-12 py-8 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all"
                  data-testid="button-hero-get-quote"
                >
                  Get Your Custom Quote
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-purple-500 text-purple-300 hover:bg-purple-950/50 hover:text-purple-200 font-bold text-xl px-12 py-8"
                  data-testid="button-hero-view-packages"
                >
                  View Packages & Pricing
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-base text-gray-700">
                <div className="flex items-center gap-3">
                  <Ship className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-900 font-medium">Private Charter</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-purple-600" />
                  <span className="text-gray-900 font-medium">14-75 Guests</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-yellow-600" />
                  <span className="text-gray-900 font-medium">Flexible Schedule</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wine className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-900 font-medium">BYOB Friendly</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Image Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <ScrollReveal delay={0.1}>
              <img
                src={heroImage1}
                alt="Clever Girl 50+ person private boat charter Lake Travis"
                className="rounded-2xl shadow-2xl w-full h-72 object-cover ring-2 ring-blue-500/50 hover:ring-blue-400 transition-all"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <img
                src={heroImage2}
                alt="Me Seeks the Irony 25 person private boat Lake Travis"
                className="rounded-2xl shadow-2xl w-full h-72 object-cover ring-2 ring-purple-500/50 hover:ring-purple-400 transition-all"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <img
                src={heroImage3}
                alt="Day Tripper 14 person intimate private boat charter"
                className="rounded-2xl shadow-2xl w-full h-72 object-cover ring-2 ring-pink-500/50 hover:ring-pink-400 transition-all"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Quick Answer Boxes Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <QuickAnswerBoxGroup
              title="Quick Answers About Private Cruises"
              boxes={[
                {
                  id: 'customize-route',
                  question: 'Can we customize our route?',
                  answer: 'Yes! Work with captain to create your perfect route on Lake Travis. Choose specific coves for swimming, scenic spots for photos, or party areas with other boats. Your captain knows all the best spots and will customize based on weather and your preferences.',
                  keywords: ['customize', 'route', 'captain', 'Lake Travis', 'coves'],
                  icon: MapPin,
                  relatedLink: {
                    href: '#fleet',
                    text: 'View our fleet options'
                  }
                },
                {
                  id: 'life-jackets',
                  question: 'Are life jackets provided?',
                  answer: 'Yes, USCG approved life jackets provided for all guests in various sizes including children and adults. Safety is our top priority with certified captains ensuring proper safety equipment. Life jackets available but not required while seated. Swimming areas supervised by experienced crew.',
                  keywords: ['USCG', 'life jackets', 'safety', 'certified captains'],
                  icon: LifeBuoy,
                  relatedLink: {
                    href: '/faq#safety',
                    text: 'Learn about safety measures'
                  }
                }
              ]}
              columns={2}
              className="max-w-5xl mx-auto"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Snippets Section */}
      <section className="py-24 bg-blue-50/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10">
            <ScrollReveal delay={0}>
              <FeaturedSnippet
                question="How to rent a private boat on Lake Travis?"
                listItems={[
                  "Choose your boat size (14-75 guests) and date",
                  "Select your package level (Standard, Essentials, Premium, or VIP)",
                  "Request a quote online or call (512) 537-2323",
                  "Confirm availability and receive your booking agreement",
                  "Pay the 50% deposit to secure your date",
                  "Plan your BYOB menu and activities",
                  "Board at Hurst Harbor Marina for your cruise"
                ]}
                format="list"
                numbered={true}
                schemaType="HowTo"
              />
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <FeaturedSnippet
                question="Private boat rental prices Austin"
                tableData={[
                  { label: "Day Tripper (14)", value: "$200-275/hr - Intimate gatherings" },
                  { label: "Meeseeks (15-30)", value: "$225-375/hr - Birthday parties" },
                  { label: "Clever Girl (30-75)", value: "$300-475/hr - Large events" }
                ]}
                format="table"
                schemaType="FAQ"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-24 px-4 bg-white" id="packages">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-16 bg-blue-50 p-2 rounded-2xl h-auto border border-gray-200">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white font-bold text-lg py-4 rounded-xl transition-all"
                  data-testid="tab-overview"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="packages" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white font-bold text-lg py-4 rounded-xl transition-all"
                  data-testid="tab-packages"
                >
                  Packages
                </TabsTrigger>
                <TabsTrigger 
                  value="fleet" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-pink-700 data-[state=active]:text-white font-bold text-lg py-4 rounded-xl transition-all"
                  data-testid="tab-fleet"
                >
                  Our Fleet
                </TabsTrigger>
                <TabsTrigger 
                  value="faq" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-700 data-[state=active]:text-white font-bold text-lg py-4 rounded-xl transition-all"
                  data-testid="tab-faq"
                >
                  FAQs
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-12">
                <div className="max-w-6xl mx-auto">
                  <ScrollReveal delay={0}>
                    <div className="relative mb-16">
                      <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">01</div>
                      <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900">
                        Why Choose a Private Cruise?
                      </h2>
                      <p className="text-center text-xl text-gray-700 mb-16">
                        Your own private boat on Lake Travis - perfect for any celebration
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* What's Included Grid */}
                  <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {whatsIncluded.map((item, index) => (
                      <ScrollReveal key={index} delay={index * 0.1}>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-blue-500 transition-all group min-h-[180px]">
                          <div className="flex items-start space-x-4">
                            <div className="p-4 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform">
                              <item.icon className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-xl mb-3 text-gray-900">{item.title}</h3>
                              <p className="text-base text-gray-700">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>

                  <ScrollReveal delay={0.3}>
                    <div className="text-center">
                      <Button
                        size="lg"
                        onClick={handleGetQuote}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl px-12 py-8 shadow-2xl"
                        data-testid="button-overview-get-quote"
                      >
                        Get Your Custom Quote Now
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
                  </ScrollReveal>
                </div>
              </TabsContent>

              {/* Packages Tab */}
              <TabsContent value="packages" className="mt-12">
                <div className="max-w-6xl mx-auto">
                  <ScrollReveal delay={0}>
                    <div className="relative mb-16">
                      <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">02</div>
                      <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900">
                        Choose Your Package Level
                      </h2>
                      <p className="text-center text-xl text-gray-700 mb-16">
                        From basic charter to full VIP - customize your Lake Travis experience
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Private vs Disco Comparison */}
                  <ScrollReveal delay={0.1}>
                    <div className="mb-16">
                      <h3 className="text-2xl font-semibold text-center mb-12 text-gray-900">Why Choose Private Charter?</h3>
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
                  </ScrollReveal>

                  {/* Package Cards */}
                  <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {privateCruisePackages.map((pkg, index) => (
                      <ScrollReveal key={pkg.id} delay={index * 0.15}>
                        <Card className={cn(
                          "relative overflow-hidden bg-white border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[500px]",
                          pkg.popular ? 'border-purple-500 shadow-lg shadow-purple-200' : 'border-gray-200 hover:border-blue-500'
                        )}>
                          {pkg.popular && (
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 text-sm font-bold">
                              {pkg.badge}
                            </div>
                          )}
                          <CardHeader className="pb-6 p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                                <pkg.icon className="h-10 w-10 text-blue-600" />
                              </div>
                              <div>
                                <CardTitle className="text-xl font-semibold text-gray-900">{pkg.name}</CardTitle>
                                <p className="text-sm text-gray-700 mt-1">{pkg.description}</p>
                              </div>
                            </div>
                            <p className="text-gray-700 text-base">{pkg.subtitle}</p>
                          </CardHeader>
                          <CardContent className="p-6">
                            <ul className="space-y-3">
                              {pkg.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700">
                                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              onClick={handleGetQuote}
                              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold"
                              data-testid={`button-package-${pkg.id}`}
                            >
                              Get Quote
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </div>

                  <ScrollReveal delay={0.5}>
                    <PricingTable
                      title="Package Pricing Breakdown"
                      description="Add-on fees for enhanced packages (on top of hourly boat rates)"
                      packages={[
                        {
                          name: 'Standard Package',
                          price: '$0',
                          period: 'included',
                          features: [
                            'Professional captain',
                            'Basic amenities',
                            'Bluetooth sound',
                            'BYOB friendly'
                          ],
                          highlighted: false,
                          ctaText: 'Select Standard',
                          ctaAction: handleGetQuote
                        },
                        {
                          name: 'Essentials Package',
                          price: '$100-200',
                          period: 'flat fee',
                          features: [
                            'Everything in Standard',
                            'Pre-stocked ice',
                            'Water dispenser',
                            'Food table setup'
                          ],
                          highlighted: true,
                          ctaText: 'Select Essentials',
                          ctaAction: handleGetQuote
                        },
                        {
                          name: 'Ultimate Package',
                          price: '$250-350',
                          period: 'flat fee',
                          features: [
                            'Everything in Essentials',
                            'Giant floats',
                            'Party decorations',
                            'Premium amenities'
                          ],
                          highlighted: false,
                          ctaText: 'Select Ultimate',
                          ctaAction: handleGetQuote
                        }
                      ]}
                      testIdPrefix="pricing-private"
                    />
                  </ScrollReveal>
                </div>
              </TabsContent>

              {/* Fleet Tab */}
              <TabsContent value="fleet" className="mt-12" id="fleet">
                <div className="max-w-6xl mx-auto">
                  <ScrollReveal delay={0}>
                    <div className="relative mb-16">
                      <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">03</div>
                      <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900">
                        Our Premium Fleet
                      </h2>
                      <p className="text-center text-xl text-gray-700 mb-16">
                        Choose the perfect vessel for your group size and celebration
                      </p>
                    </div>
                  </ScrollReveal>

                  <div className="grid md:grid-cols-3 gap-8">
                    {fleetOptions.map((boat, index) => (
                      <ScrollReveal key={index} delay={index * 0.15}>
                        <Card className="overflow-hidden bg-white border-2 border-gray-200 hover:border-blue-500 transition-all hover:scale-105 hover:shadow-xl group min-h-[450px]">
                          <div className="relative h-64 overflow-hidden">
                            <img 
                              src={boat.image} 
                              alt={boat.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-2xl font-bold text-white mb-1">{boat.name}</h3>
                              <p className="text-blue-200 font-semibold">{boat.capacity}</p>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <div className="mb-6">
                              <div className="text-3xl font-bold text-gray-900 mb-1">
                                ${boat.baseRate}<span className="text-xl text-gray-700">/hour</span>
                              </div>
                              <p className="text-sm text-gray-700">4-hour minimum</p>
                            </div>
                            <ul className="space-y-3 mb-6">
                              {boat.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700">
                                  <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              onClick={handleGetQuote}
                              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold"
                              data-testid={`button-fleet-${boat.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              Book {boat.name}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="mt-12">
                <div className="max-w-4xl mx-auto">
                  <ScrollReveal delay={0}>
                    <div className="relative mb-16">
                      <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">04</div>
                      <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900">
                        Frequently Asked Questions
                      </h2>
                      <p className="text-center text-xl text-gray-700 mb-16">
                        Everything you need to know about private cruises
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.1}>
                    <Accordion type="single" collapsible className="space-y-4">
                      {faqItems.map((item) => (
                        <AccordionItem 
                          key={item.id} 
                          value={item.id}
                          className="bg-white border border-gray-200 rounded-xl px-6 hover:border-blue-500 transition-all"
                        >
                          <AccordionTrigger 
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 py-6"
                            data-testid={`faq-trigger-${item.id}`}
                          >
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent 
                            className="text-gray-700 pb-6 text-base leading-relaxed"
                            data-testid={`faq-content-${item.id}`}
                          >
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <div className="mt-16 text-center">
                      <Button
                        size="lg"
                        onClick={handleGetQuote}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold text-xl px-12 py-8 shadow-2xl"
                        data-testid="button-faq-get-quote"
                      >
                        Still Have Questions? Get a Quote
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
                  </ScrollReveal>
                </div>
              </TabsContent>
            </Tabs>
          </ScrollReveal>
        </div>
      </section>

      {/* Types of Private Cruises Section */}
      <section className="py-24 px-4 bg-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={0}>
            <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900">
              Popular Private Cruise Events
            </h2>
            <p className="text-center text-xl text-gray-700 mb-16">
              Explore different types of private cruises we specialize in
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {privateCruiseTypes.map((type, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Link href={type.href} data-testid={type.testId}>
                  <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-gray-200 hover:border-blue-500 bg-white group hover:scale-105">
                    <CardHeader className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-4 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform">
                          <type.icon className="h-10 w-10 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {type.title}
                          </CardTitle>
                          <p className="text-gray-700 text-sm mt-2">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollReveal delay={0}>
        <section className="py-24 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold font-playfair text-white mb-8">
              Ready to Book Your Private Cruise?
            </h2>
            <p className="text-xl text-white/95 mb-10">
              Get your custom quote in minutes. Choose your boat, package, and perfect date on Lake Travis.
            </p>
            <Button
              size="lg"
              onClick={handleGetQuote}
              className="bg-white text-blue-600 hover:bg-gray-100 font-black text-2xl px-16 py-10 shadow-2xl hover:scale-105 transition-all"
              data-testid="button-cta-get-quote"
            >
              Get Your Custom Quote Now
              <ArrowRight className="ml-4 h-7 w-7" />
            </Button>
          </div>
        </section>
      </ScrollReveal>

      {/* What to Bring Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <WhatToBring
              variant="private"
              title="What to Bring on Your Private Cruise"
              description="Everything you need for a perfect custom celebration on Lake Travis"
              className="max-w-7xl mx-auto"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Customization Options Section */}
      <SectionReveal>
        <section className="py-24 bg-blue-50/30">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="relative mb-16">
                <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">02</div>
                <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900">
                  Customize Your Experience
                </h2>
                <p className="text-center text-base text-gray-700 max-w-3xl mx-auto">
                  Add-ons and upgrades to make your cruise unforgettable
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Utensils className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Food & Catering</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>BBQ catering from local vendors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Custom birthday cakes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Pizza delivery to boat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Charcuterie boards</span>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Music className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Entertainment</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span>Live DJ services ($300-$500)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span>Professional photographer ($250)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span>Karaoke equipment ($150)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span>Custom playlist setup</span>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-pink-100 rounded-lg">
                        <PartyPopper className="h-6 w-6 text-pink-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Decorations</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                        <span>Birthday banners & balloons</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                        <span>Wedding/anniversary themes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                        <span>Corporate branding setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                        <span>Custom signage</span>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <Wine className="h-6 w-6 text-yellow-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Beverages</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span>Pre-stocked bar setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span>Mimosa bar ingredients</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span>Craft beer selection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span>Signature cocktail mixers</span>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Perfect For Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="relative mb-16">
                <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">03</div>
                <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900">
                  Perfect For Any Occasion
                </h2>
                <p className="text-center text-base text-gray-700 max-w-3xl mx-auto">
                  From corporate events to milestone celebrations
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Corporate Events</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Team building activities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Client entertainment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Holiday parties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Executive retreats</span>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-pink-100 rounded-lg">
                        <Heart className="h-6 w-6 text-pink-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Weddings</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                        <span>Rehearsal dinners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                        <span>Welcome parties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                        <span>After parties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                        <span>Anniversary celebrations</span>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Cake className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Birthdays</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span>30th, 40th, 50th celebrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span>Sweet 16 parties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span>Surprise parties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span>Family gatherings</span>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Reunions</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>High school reunions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>College friend meetups</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Family reunions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Military homecomings</span>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* How It Works Section */}
      <SectionReveal>
        <section className="py-24 bg-blue-50/30">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="relative mb-16">
                <div className="absolute top-4 right-4 text-6xl font-black text-blue-200 opacity-30">04</div>
                <h2 className="text-3xl font-semibold font-playfair text-center mb-6 text-gray-900">
                  Simple Booking Process
                </h2>
                <p className="text-center text-base text-gray-700 max-w-3xl mx-auto">
                  From inquiry to cruise in 5 easy steps
                </p>
              </div>

              <div className="grid md:grid-cols-5 gap-6">
                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6 text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <div className="mx-auto mb-4 p-3 bg-blue-50 rounded-lg inline-block">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-3">Submit Inquiry</CardTitle>
                    <p className="text-base text-gray-700">
                      Fill out our online form with your date, group size, and event type
                    </p>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6 text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-600">2</span>
                    </div>
                    <div className="mx-auto mb-4 p-3 bg-purple-50 rounded-lg inline-block">
                      <Package className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-3">Choose Package</CardTitle>
                    <p className="text-base text-gray-700">
                      Select your boat and package tier with any customizations
                    </p>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6 text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-pink-600">3</span>
                    </div>
                    <div className="mx-auto mb-4 p-3 bg-pink-50 rounded-lg inline-block">
                      <CreditCard className="h-6 w-6 text-pink-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-3">Secure Date</CardTitle>
                    <p className="text-base text-gray-700">
                      Pay your deposit to lock in your reservation
                    </p>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6 text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">4</span>
                    </div>
                    <div className="mx-auto mb-4 p-3 bg-green-50 rounded-lg inline-block">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-3">Final Details</CardTitle>
                    <p className="text-base text-gray-700">
                      Confirm headcount and arrange add-ons one week before
                    </p>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6 text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-yellow-600">5</span>
                    </div>
                    <div className="mx-auto mb-4 p-3 bg-yellow-50 rounded-lg inline-block">
                      <Ship className="h-6 w-6 text-yellow-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-3">Cruise Day</CardTitle>
                    <p className="text-base text-gray-700">
                      Arrive at the marina and enjoy your perfect Lake Travis cruise!
                    </p>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Related Services Section */}
      <RelatedServicesSection currentPath="/private-cruises" />

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

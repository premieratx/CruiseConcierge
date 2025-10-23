import { useState } from 'react';
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
  Plane, Wine, Eye, Bot, Briefcase, Building2, Cake, GraduationCap, LifeBuoy, Snowflake, Moon
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
import { TabbedPrivateCruisePricing } from '@/components/TabbedPrivateCruisePricing';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionReveal } from '@/components/SectionReveal';
import { TableOfContents } from '@/components/TableOfContents';
import { StickyCTA } from '@/components/StickyCTA';
import { LazyImage } from '@/components/LazyImage';

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
    baseRate: 250,
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

// Why Choose Us
const whyChooseUs = [
  {
    icon: Trophy,
    title: '15+ Years Experience',
    description: "Austin's premier party cruise company since 2009 with unmatched Lake Travis expertise"
  },
  {
    icon: UserCheck,
    title: '150,000+ Happy Guests',
    description: 'Trusted by over 150,000 satisfied customers for unforgettable celebrations'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Coast Guard certified captains and pristine safety record ensure peace of mind'
  },
  {
    icon: Star,
    title: 'Premier Fleet',
    description: 'Three exceptional boats from intimate 14-person to grand 75-person capacity'
  },
  {
    icon: Heart,
    title: 'Customizable Experiences',
    description: 'Flexible packages and add-ons to create your perfect Lake Travis celebration'
  },
  {
    icon: Award,
    title: 'Professional Service',
    description: 'Dedicated crew committed to making your event absolutely perfect'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Amanda R.',
    role: 'Corporate Event Organizer',
    rating: 5,
    text: "Booked Clever Girl for our company retreat - 50 people, absolutely perfect! The crew was professional, the boat was immaculate, and everyone had an amazing time. Worth every penny!",
    avatar: '💼'
  },
  {
    id: 2,
    name: 'Jessica & Mark',
    role: 'Wedding Rehearsal Dinner',
    rating: 5,
    text: "Our rehearsal dinner on The Irony was magical! 25 guests, perfect weather, amazing service. The captain found the most beautiful spot on Lake Travis for photos. Highly recommend!",
    avatar: '💕'
  },
  {
    id: 3,
    name: 'David L.',
    role: '40th Birthday Celebration',
    rating: 5,
    text: "Day Tripper was perfect for my milestone birthday with 12 close friends. Intimate, fun, and the crew went above and beyond. Best birthday ever on Lake Travis!",
    avatar: '🎂'
  }
];

// FAQs
const faqItems = [
  {
    id: 'pricing',
    question: 'How does private cruise pricing work?',
    answer: 'Private cruises are charged hourly based on the boat size. Day Tripper (up to 14 guests) starts at $200/hr weekdays, Meeseeks & The Irony (15-30 guests) at $225/hr weekdays, and Clever Girl (30-75 guests) at $250/hr weekdays. Weekend rates are higher. Package flat fees: Essentials $100-200, Ultimate $250-350 (based on boat size). 4-hour minimum required.'
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

// Table of Contents sections
const tocSections = [
  { id: 'hero', title: 'Overview', icon: <Info className="h-4 w-4" /> },
  { id: 'experience', title: 'Experience', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'pricing', title: 'Pricing & Packages', icon: <DollarSign className="h-4 w-4" /> },
  { id: 'availability', title: 'Availability', icon: <Calendar className="h-4 w-4" /> },
  { id: 'benefits', title: 'What\'s Included', icon: <CheckCircle className="h-4 w-4" /> },
  { id: 'features', title: 'Customization', icon: <Package className="h-4 w-4" /> },
  { id: 'why-choose', title: 'Why Choose Us', icon: <Star className="h-4 w-4" /> },
  { id: 'gallery', title: 'Gallery', icon: <Camera className="h-4 w-4" /> },
  { id: 'testimonials', title: 'Reviews', icon: <Quote className="h-4 w-4" /> },
  { id: 'faqs', title: 'FAQs', icon: <HelpCircle className="h-4 w-4" /> }
];

export default function PrivateCruises() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleGetQuote = () => {
    setLocation('/chat');
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

      {/* Table of Contents - Sticky Sidebar */}
      <TableOfContents sections={tocSections} />

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-24 px-4 overflow-hidden bg-gradient-to-br from-blue-100 via-white to-yellow-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-purple-100/30 to-yellow-100/30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal delay={0}>
            <div className="text-center mb-12 md:mb-16 px-4">
              <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm px-4 sm:px-6 py-2 border-0 font-sans tracking-wider font-bold uppercase">
                Private Boat Charters
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 md:mb-8 text-gray-900 leading-tight">
                Private Boat Rentals Austin
              </h1>
              <p className="text-lg sm:text-xl text-gray-900 mb-4 md:mb-6 font-semibold">
                Your Private Boat. Your Rules. Your Lake Travis Adventure.
              </p>
              <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto mb-8 md:mb-10 leading-relaxed">
                Exclusive boat charters for 14-75 guests. BYOB friendly. Choose your schedule, play your music, create your perfect day on the lake. Perfect for <InternalLinkHighlight href="/team-building" title="Corporate Events">corporate events</InternalLinkHighlight>, <InternalLinkHighlight href="/rehearsal-dinner" title="Special Occasions">weddings & birthdays</InternalLinkHighlight>. Looking for a <InternalLinkHighlight href="/atx-disco-cruise" title="ATX Disco Cruise">party atmosphere</InternalLinkHighlight>? Check out our disco cruise!
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
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-purple-600 text-purple-700 hover:bg-purple-50 hover:text-purple-800 font-bold text-xl px-12 py-8"
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
              <LazyImage
                src={heroImage1}
                alt="Clever Girl 50+ person private boat charter Lake Travis"
                className="rounded-2xl shadow-2xl w-full h-72 object-cover ring-2 ring-blue-500/50 hover:ring-blue-400 transition-all"
                priority={true}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <LazyImage
                src={heroImage2}
                alt="Me Seeks the Irony 25 person private boat Lake Travis"
                className="rounded-2xl shadow-2xl w-full h-72 object-cover ring-2 ring-purple-500/50 hover:ring-purple-400 transition-all"
                priority={true}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <LazyImage
                src={heroImage3}
                alt="Day Tripper 14 person intimate private boat charter"
                className="rounded-2xl shadow-2xl w-full h-72 object-cover ring-2 ring-pink-500/50 hover:ring-pink-400 transition-all"
                priority={true}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <SectionReveal>
        <section id="experience" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-6 text-gray-900">
                  The Private Charter Experience
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Discover the freedom and luxury of your own private Lake Travis adventure. Perfect for <InternalLinkHighlight href="/bachelor-party" title="Bachelor Parties">bachelor parties</InternalLinkHighlight>, <InternalLinkHighlight href="/bachelorette-party" title="Bachelorette Parties">bachelorette celebrations</InternalLinkHighlight>, or any special occasion. <InternalLinkHighlightWithArrow href="/" title="Home">See all our cruise options</InternalLinkHighlightWithArrow>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-600 rounded-lg">
                        <Ship className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">Your Exclusive Experience</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      When you book a private charter, you get the entire boat exclusively for your group. No strangers, no sharing - just you, your guests, and the beautiful waters of Lake Travis.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Choose your own departure time</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Create your custom playlist</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Select your preferred route and destinations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Bring your own food, drinks, and decorations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-purple-600 rounded-lg">
                        <UserCheck className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">Professional Service</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Every private charter includes experienced, USCG licensed captains who know Lake Travis like the back of their hand. They'll ensure your safety while showing you the best spots.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Coast Guard certified captains</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Expert knowledge of Lake Travis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Professional crew for larger groups</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Dedicated to making your event perfect</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

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
                      href: '#pricing',
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
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Pricing Section */}
      <SectionReveal>
        <section id="pricing" className="py-24 bg-blue-50/30">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-6 text-gray-900">
                  Pricing & Packages
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Choose from three boats and three package levels to create your perfect experience. Want an all-inclusive party atmosphere? <InternalLinkHighlight href="/atx-disco-cruise" title="ATX Disco Cruise">Check out our ATX Disco Cruise</InternalLinkHighlight>
                </p>
              </div>

              {/* Private Cruise Pricing Component */}
              <div className="mb-12">
                <TabbedPrivateCruisePricing dayType="SATURDAY" duration={4} />
              </div>

              <Tabs defaultValue="fleet" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-12 bg-white p-2 rounded-2xl h-auto border border-gray-200">
                  <TabsTrigger 
                    value="fleet" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white font-bold text-lg py-4 rounded-xl transition-all"
                    data-testid="tab-fleet"
                  >
                    Our Fleet
                  </TabsTrigger>
                  <TabsTrigger 
                    value="packages" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white font-bold text-lg py-4 rounded-xl transition-all"
                    data-testid="tab-packages"
                  >
                    Package Options
                  </TabsTrigger>
                </TabsList>

                {/* Fleet Tab */}
                <TabsContent value="fleet" className="mt-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    {fleetOptions.map((boat, index) => (
                      <Card key={index} className="bg-white border-gray-200 hover:border-blue-500 transition-all">
                        <CardHeader className="p-0">
                          <LazyImage
                            src={boat.image}
                            alt={`${boat.name} private boat charter`}
                            className="w-full h-56 object-cover rounded-t-xl"
                          />
                        </CardHeader>
                        <CardContent className="p-6">
                          <CardTitle className="text-2xl mb-2">{boat.name}</CardTitle>
                          <p className="text-lg font-semibold text-blue-600 mb-4">{boat.capacity}</p>
                          <div className="mb-6">
                            <p className="text-3xl font-bold text-gray-900">${boat.baseRate}<span className="text-lg text-gray-600">/hour</span></p>
                            <p className="text-sm text-gray-600">4-hour minimum</p>
                          </div>
                          <ul className="space-y-2">
                            {boat.features.map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-start gap-2 text-gray-700">
                                <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold mb-6 text-center">Fleet Pricing Overview</h3>
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
                  </div>
                </TabsContent>

                {/* Packages Tab */}
                <TabsContent value="packages" className="mt-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    {privateCruisePackages.map((pkg, index) => {
                      const Icon = pkg.icon;
                      return (
                        <Card 
                          key={index} 
                          className={cn(
                            "bg-white border-2 transition-all",
                            pkg.popular ? "border-yellow-400 shadow-xl ring-2 ring-yellow-200" : "border-gray-200 hover:border-blue-500"
                          )}
                        >
                          <CardHeader>
                            {pkg.popular && (
                              <Badge className="mb-4 bg-yellow-500 text-white w-fit">
                                {pkg.badge}
                              </Badge>
                            )}
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`p-3 bg-${pkg.color}-100 rounded-lg`}>
                                <Icon className={`h-8 w-8 text-${pkg.color}-600`} />
                              </div>
                              <div>
                                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                                <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-6 italic">{pkg.subtitle}</p>
                            <ul className="space-y-3">
                              {pkg.features.map((feature, fIndex) => (
                                <li key={fIndex} className="flex items-start gap-2">
                                  <CheckCircle className={`h-5 w-5 text-${pkg.color}-600 shrink-0 mt-0.5`} />
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="mt-12 text-center bg-white rounded-xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold mb-4">Package Flat Fees</h3>
                    <p className="text-gray-700 mb-6">Add these one-time fees to your hourly boat rental</p>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      <div className="p-6 bg-blue-50 rounded-xl">
                        <Ship className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-bold text-lg mb-2">Standard</h4>
                        <p className="text-3xl font-bold text-blue-600">$0</p>
                        <p className="text-sm text-gray-600 mt-2">No package fee</p>
                      </div>
                      <div className="p-6 bg-yellow-50 rounded-xl border-2 border-yellow-400">
                        <Sparkles className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                        <h4 className="font-bold text-lg mb-2">Essentials</h4>
                        <p className="text-3xl font-bold text-yellow-600">$100-200</p>
                        <p className="text-sm text-gray-600 mt-2">Based on boat size</p>
                      </div>
                      <div className="p-6 bg-purple-50 rounded-xl">
                        <Crown className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                        <h4 className="font-bold text-lg mb-2">Ultimate</h4>
                        <p className="text-3xl font-bold text-purple-600">$250-350</p>
                        <p className="text-sm text-gray-600 mt-2">Based on boat size</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-16 text-center">
                <Button
                  size="lg"
                  onClick={handleGetQuote}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl px-12 py-8"
                  data-testid="button-pricing-get-quote"
                >
                  Get Custom Quote for Your Date
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Availability Section */}
      <SectionReveal>
        <section id="availability" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-6 text-gray-900">
                  Booking & Availability
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Plan ahead for the best experience - popular dates fill up quickly
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-600 rounded-lg">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">When to Book</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Peak Season (May-September)</p>
                          <p className="text-gray-700">Book 6-12 weeks in advance for weekend dates</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                          <Sun className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Shoulder Season (March-April, October)</p>
                          <p className="text-gray-700">Book 4-6 weeks in advance</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                          <Snowflake className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Off-Season (November-February)</p>
                          <p className="text-gray-700">More flexible booking, 2-4 weeks notice</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-purple-600 rounded-lg">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">Cruise Times</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                          <Sun className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Morning Cruises (9am-1pm)</p>
                          <p className="text-gray-700">Perfect for calmer waters and cooler temperatures</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                          <Sun className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Afternoon Cruises (2pm-6pm)</p>
                          <p className="text-gray-700">Peak sunshine and social lake atmosphere</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                          <Moon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Evening Cruises (4pm-8pm)</p>
                          <p className="text-gray-700">Sunset views over Lake Travis (all cruises end by 8:30pm)</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                  <CardContent className="p-12">
                    <h3 className="text-3xl font-bold mb-4">Ready to Book Your Private Charter?</h3>
                    <p className="text-xl mb-8 text-white/90">
                      Get your custom quote and check availability for your preferred date
                    </p>
                    <Button
                      size="lg"
                      onClick={handleGetQuote}
                      className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-xl px-12 py-8"
                      data-testid="button-availability-get-quote"
                    >
                      Check Availability & Get Quote
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Benefits Section - What's Included */}
      <SectionReveal>
        <section id="benefits" className="py-24 bg-blue-50/30">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-6 text-gray-900">
                  What's Included in Every Charter
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Everything you need for an amazing Lake Travis experience is included
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {whatsIncluded.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="bg-white border-gray-200 hover:border-blue-500 transition-all">
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
                          <Icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center text-gray-700">{item.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-16">
                <WhatToBring
                  variant="private"
                  title="What to Bring on Your Private Cruise"
                  description="Everything you need for a perfect custom celebration on Lake Travis"
                  className="max-w-7xl mx-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Features Section - Customization */}
      <SectionReveal>
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-6 text-gray-900">
                  Customize Your Experience
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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

              <div className="mt-12 text-center bg-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Perfect For Any Occasion</h3>
                <div className="grid md:grid-cols-4 gap-6 mt-8">
                  <Card className="bg-white border-gray-200">
                    <CardHeader className="p-6 text-center">
                      <div className="mx-auto mb-3 p-3 bg-blue-100 rounded-lg w-fit">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">Corporate Events</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">Client entertainment, company celebrations, executive retreats</p>
                    </CardHeader>
                  </Card>

                  <Card className="bg-white border-gray-200">
                    <CardHeader className="p-6 text-center">
                      <div className="mx-auto mb-3 p-3 bg-pink-100 rounded-lg w-fit">
                        <Heart className="h-6 w-6 text-pink-600" />
                      </div>
                      <CardTitle className="text-lg">Weddings</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">Rehearsal dinners, welcome parties, after parties</p>
                    </CardHeader>
                  </Card>

                  <Card className="bg-white border-gray-200">
                    <CardHeader className="p-6 text-center">
                      <div className="mx-auto mb-3 p-3 bg-purple-100 rounded-lg w-fit">
                        <Cake className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">Birthdays</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">Milestone celebrations, Sweet 16s, surprise parties</p>
                    </CardHeader>
                  </Card>

                  <Card className="bg-white border-gray-200">
                    <CardHeader className="p-6 text-center">
                      <div className="mx-auto mb-3 p-3 bg-green-100 rounded-lg w-fit">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">Reunions</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">Family gatherings, class reunions, friend meetups</p>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Why Choose Us Section */}
      <SectionReveal>
        <section id="why-choose" className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-6 text-white">
                  Why Choose Premier Party Cruises
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Austin's most trusted name in private boat charters since 2009
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {whyChooseUs.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4 p-4 bg-white/20 rounded-full w-fit">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center text-white/90">{item.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-16 text-center">
                <Button
                  size="lg"
                  onClick={handleGetQuote}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-xl px-12 py-8"
                  data-testid="button-why-choose-get-quote"
                >
                  Book Your Private Charter Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Gallery Section */}
      <SectionReveal>
        <section id="gallery" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-6 text-gray-900">
                  Our Fleet Gallery
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  See our beautiful boats and the amazing experiences our guests enjoy
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <LazyImage
                    src={heroImage1}
                    alt="Clever Girl flagship boat with 14 disco balls"
                    className="rounded-2xl shadow-xl w-full h-72 object-cover hover:scale-105 transition-transform"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Clever Girl</h3>
                    <p className="text-gray-600">Our flagship 50+ person boat</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <LazyImage
                    src={heroImage2}
                    alt="Meeseeks & The Irony 25-person party boat"
                    className="rounded-2xl shadow-xl w-full h-72 object-cover hover:scale-105 transition-transform"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Meeseeks & The Irony</h3>
                    <p className="text-gray-600">Perfect for 15-30 guests</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <LazyImage
                    src={heroImage3}
                    alt="Day Tripper intimate 14-person boat"
                    className="rounded-2xl shadow-xl w-full h-72 object-cover hover:scale-105 transition-transform"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Day Tripper</h3>
                    <p className="text-gray-600">Intimate cruises up to 14 people</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <LazyImage
                    src={galleryImage1}
                    alt="Party atmosphere on Lake Travis"
                    className="rounded-2xl shadow-xl w-full h-72 object-cover hover:scale-105 transition-transform"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Party Atmosphere</h3>
                    <p className="text-gray-600">Unforgettable celebrations</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <LazyImage
                    src={galleryImage2}
                    alt="Lake Travis scenic views"
                    className="rounded-2xl shadow-xl w-full h-72 object-cover hover:scale-105 transition-transform"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Scenic Views</h3>
                    <p className="text-gray-600">Beautiful Lake Travis waters</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <LazyImage
                    src={galleryImage3}
                    alt="Happy guests enjoying cruise"
                    className="rounded-2xl shadow-xl w-full h-72 object-cover hover:scale-105 transition-transform"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Happy Guests</h3>
                    <p className="text-gray-600">Creating amazing memories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Testimonials Section */}
      <SectionReveal>
        <section id="testimonials" className="py-24 bg-blue-50/30">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-6 text-gray-900">
                  What Our Guests Say
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Real reviews from real celebrations on Lake Travis
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-white border-gray-200">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl">{testimonial.avatar}</div>
                        <div>
                          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Quote className="h-8 w-8 text-blue-200 mb-2" />
                      <p className="text-gray-700 italic">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-16 text-center bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-3xl font-bold mb-2">150,000+ Happy Guests</p>
                <p className="text-gray-600">Join thousands of satisfied customers who've celebrated on Lake Travis</p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQs Section */}
      <SectionReveal>
        <section id="faqs" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-6 text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-700">
                  Everything you need to know about private boat charters on Lake Travis
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left text-lg font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-16 text-center bg-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-gray-700 mb-6">Our team is here to help you plan the perfect private charter</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={handleGetQuote}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold"
                  >
                    Get Custom Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <a href="tel:+15127705050">
                      <Phone className="mr-2 h-5 w-5" />
                      Call (512) 770-5050
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* SEO Content Section - Move to bottom */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AIOptimizedSection
              title="Private Boat Rentals Lake Travis Austin"
              content={`
                <p>Looking for <strong>private boat rentals on Lake Travis</strong>? Premier Party Cruises offers exclusive boat charters for groups of 14-75 guests. Our fleet includes three exceptional boats: Day Tripper (up to 14 guests), Meeseeks & The Irony (15-30 guests), and our flagship Clever Girl (30-75 guests).</p>
                
                <h3>Austin Private Boat Charter Services</h3>
                <p>As <strong>Austin's premier private boat charter company</strong>, we've been creating unforgettable Lake Travis experiences since 2009. Choose from Standard, Essentials, or Ultimate packages to customize your perfect celebration. All charters include USCG licensed captains, premium sound systems, coolers with ice, and flexible departure times.</p>
                
                <h3>Perfect for Every Occasion</h3>
                <p>Our <strong>Lake Travis private cruises</strong> are perfect for corporate events, weddings, birthdays, bachelor/bachelorette parties, and family celebrations. With BYOB-friendly policies and customizable routes, you have complete control over your experience.</p>
                
                <h3>Book Your Private Charter Today</h3>
                <p>Ready to book your <strong>private boat rental in Austin</strong>? Get your custom quote online or call (512) 770-5050. We recommend booking 6-12 weeks in advance, especially for weekends during peak season (May-September).</p>
              `}
              searchIntent="transactional"
              keywords={["private boat rentals lake travis", "austin private boat charter", "lake travis boat rental"]}
            />

            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Related Private Cruise Services</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {privateCruiseTypes.slice(0, 9).map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <Link key={index} href={type.href}>
                      <Card className="bg-white border-gray-200 hover:border-blue-500 transition-all cursor-pointer h-full" data-testid={type.testId}>
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <CardTitle className="text-lg">{type.title}</CardTitle>
                          </div>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Sticky CTA */}
      <StickyCTA
        primaryText="Get Free Quote"
        primaryAction={() => handleGetQuote()}
        secondaryText="Call Now"
        secondaryHref="tel:+15127705050"
        showOnDesktop={false}
      />

      <Footer />
    </div>
  );
}

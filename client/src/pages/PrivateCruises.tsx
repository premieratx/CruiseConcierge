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
import VideoGallerySection from '@/components/VideoGallerySection';
import RelatedLinks from '@/components/RelatedLinks';
import FleetSection from '@/components/FleetSection';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';
import Breadcrumb from '@/components/Breadcrumb';
import { FeaturedSnippet, FeaturedSnippetHowTo } from '@/components/FeaturedSnippet';
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
// NOTE: Schema imports removed - all structured data is now handled by SSR via schemaLoader.ts
// to avoid duplicate/conflicting schemas and Google Search Console errors
// SSR schemas loaded: private-cruises/faq.jsonld, private-cruises/service.jsonld

// Hero images
const heroImage1 = '/attached_assets/clever-girl-50-person-boat.webp';
const heroImage2 = '/attached_assets/meeseeks-25-person-boat.webp';
const heroImage3 = '/attached_assets/day-tripper-14-person-boat.webp';
const galleryImage1 = '/attached_assets/party-atmosphere-1.webp';
const galleryImage2 = '/attached_assets/party-atmosphere-2.webp';
const galleryImage3 = '/attached_assets/party-atmosphere-3.webp';

// Private Cruise Package Tiers - UPDATED PRICING
// Import from constants for accurate pricing
import { PACKAGE_FLAT_FEES, CREW_FEES } from '@shared/constants';

const privateCruisePackages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: { 14: 0, 25: 0, 30: 0, 50: 0, 75: 0 }, // No package fee for standard
    description: 'Basic cruise experience',
    subtitle: 'The boat, the captain, and the lake - ready for your event',
    features: [
      'Licensed, fun, experienced captains to take your group safely around the lake in style',
      'Large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
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
      '6-foot folding table for food & drinks',
      'We can help coordinate alcohol delivery through Party On Delivery',
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
    color: 'blue'
  }
];

// Fleet options with pricing
const fleetOptions = [
  {
    name: 'Day Tripper',
    capacity: 'Up to 14 guests',
    baseRate: 800,
    image: heroImage3,
    features: ['Licensed, fun, experienced captains to take your group safely around the lake in style', 'Premium sound system', 'Empty coolers (bring your own ice, or order ahead from Party On Delivery)', 'Comfortable seating with sun and shade', '4-hour cruise', 'Ideal for small birthday parties and gatherings']
  },
  {
    name: 'Meeseeks & The Irony',
    capacity: '15-30 guests',
    baseRate: 900,
    image: heroImage2,
    features: ['Licensed, fun, experienced captains to take your group safely around the lake in style', 'Premium Bluetooth sound system', 'Empty coolers (bring your own ice, or order ahead from Party On Delivery)', '4-hour cruise', 'Perfect for bachelor/bachelorette parties']
  },
  {
    name: 'Clever Girl',
    capacity: '31-75 guests',
    baseRate: 1000,
    image: heroImage1,
    features: ['Flagship boat with 14 disco balls', 'Giant Texas flag display', 'Professional crew and premium amenities', '4-hour cruise', 'Ideal for corporate events and large celebrations']
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
    description: 'Licensed, fun, experienced captains to take your group safely around the lake in style'
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
    title: 'Cooler Space',
    description: 'Empty coolers - bring your own ice, OR add Essentials/Ultimate for ice included, OR order from Party On Delivery'
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
    title: '150,000+ Happy Customers',
    description: 'Trusted by 150,000+ satisfied customers for unforgettable celebrations'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Licensed, fun, experienced captains to take your group safely around the lake in style with a pristine safety record for peace of mind'
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

// Corporate ROI Data
const corporateROI = [
  {
    title: 'Traditional Corporate Venue',
    cost: '$5,000-10,000',
    features: ['Indoor ballroom', 'Restrictive food options', 'Same old experience', 'Forgotten in a week'],
    value: 'Average'
  },
  {
    title: 'Lake Travis Private Charter',
    cost: '$1,800-3,000',
    features: ['Unique experience', 'Bring your own food/drinks', 'Memorable setting', 'Talked about for months'],
    value: 'Exceptional',
    highlighted: true
  }
];

// Premium Emotional Benefits
const emotionalBenefits = [
  {
    icon: Heart,
    title: 'Your Vision, Perfectly Executed',
    description: 'We turn your dream celebration into reality with meticulous attention to detail'
  },
  {
    icon: Shield,
    title: 'Complete Privacy for Your Group',
    description: 'No strangers, no sharing - just you and your VIP guests'
  },
  {
    icon: Target,
    title: 'Tailored to YOUR Exact Needs',
    description: 'Every aspect customized to match your preferences and style'
  },
  {
    icon: Trophy,
    title: 'Impress Clients & Reward Teams',
    description: 'Create experiences that strengthen relationships and close deals'
  }
];

// Import real reviews from shared/reviews-data.ts
import { privateCruiseReviews, type Review } from '@shared/reviews-data';

// Use privateCruiseReviews for Private Cruises page
const testimonials: Review[] = privateCruiseReviews;

// Enhanced FAQs for Private Events
const faqItems = [
  {
    id: 'pricing',
    question: 'How does private cruise pricing work?',
    answer: 'Private cruises have THREE pricing components: (1) Base boat rental for 4-hour cruise - Day Tripper (1-14 guests) $800-$1,400, Meeseeks/Irony (15-30 guests) $900-$1,700 including crew fees for 26-30 guests, Clever Girl (31-75 guests) $1,000-$2,000 including crew fees for 51-75 guests, based on day of week. (2) Package upgrades are FLAT FEES per cruise - Essentials +$100-200, Ultimate +$250-350. (3) Add-ons are FLAT FEES - DJ $600, Photographer $600, Lily Pad $50. All prices shown are for 4-hour cruise.'
  },
  {
    id: 'pricing-example',
    question: 'Can you show me a pricing example?',
    answer: 'Example: Saturday 4-hour cruise for 20 guests: Base boat rental (Meeseeks) = $1,500 for 4-hour cruise. If you add Essentials Package = +$150 flat fee. With Ultimate Package instead = +$300 flat fee. Add Professional DJ = +$600 flat fee. Total with Ultimate + DJ = $1,500 + $300 + $600 = $2,400 plus tax and gratuity.'
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
    answer: 'If booking 14+ days before cruise: 25% deposit required, remaining balance due 14 days before cruise. If booking less than 14 days before cruise: 50% deposit required, remaining balance due within 48 hours of booking (or 3 days after booking). Flexible payment options available.'
  },
  {
    id: 'corporate-invoicing',
    question: 'Do you handle corporate invoicing and payment?',
    answer: 'Yes! We provide professional invoicing with all details needed for expense reports. We accept purchase orders, corporate cards, and can work with your accounting department. NET 30 terms available for established corporate clients.'
  },
  {
    id: 'customize-music',
    question: 'Can we customize the music and entertainment?',
    answer: 'Absolutely! Connect your phone to our premium Bluetooth sound system and play your custom playlist. We can also arrange professional DJs ($600 per cruise), karaoke equipment ($150), or acoustic performers. The boat is YOUR venue - customize it however you want!'
  },
  {
    id: 'catering',
    question: 'Can we bring food aboard?',
    answer: 'Yes! For food, you have two options: (1) Bring your own - easy items that won\'t make a mess, or (2) We can help arrange full catering and setup from Austin vendors. We can also help coordinate alcohol delivery through Party On Delivery for your convenience. Our Essentials and Ultimate packages include a 6-foot table for food service. We provide cooler space (bring your own ice for standard packages - Essentials/Ultimate include ice).'
  },
  {
    id: 'decorations',
    question: 'What about decorations and branding?',
    answer: 'Bring any decorations you want! Corporate clients often add company banners, balloons in brand colors, and custom signage. Wedding parties love florals, lights, and themed decor. We help you set up and secure everything safely. The Ultimate Package includes party atmosphere decorations.'
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
    answer: 'We recommend booking 8-12 weeks for priority time slots - once they book they\'re gone! This is especially important for weekends and peak season (May-September). Prime corporate event dates and wedding season weekends book even further out. Contact us ASAP to secure your preferred date!'
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

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const faqQuestions = [
  {
    question: "Which boat is right for my group size?",
    answer: "We have three options: Day Tripper (up to 14 guests), Meeseeks & The Irony (15-30 guests), and Clever Girl (31-75 guests). Choose the boat that best fits your headcount for the most comfortable experience."
  },
  {
    question: "What's included in a private charter?",
    answer: "Every private charter includes the boat, a licensed captain, a premium Bluetooth sound system, coolers, and an onboard restroom. Depending on your package (Standard, Essentials, or Ultimate), we also provide ice, water stations, floats, and party decorations."
  },
  {
    question: "Can we bring our own alcohol or food?",
    answer: "Yes! We are BYOB-friendly (cans/plastic only, no glass). You're also welcome to bring your own food. We provide table space and coolers. For ultimate convenience, we can help coordinate alcohol delivery through Party On Delivery."
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking 8-12 weeks in advance, especially for Saturdays and peak season (May-September). Prime time slots fill up quickly!"
  },
  {
    question: "What does the captain/crew do?",
    answer: "Your licensed captain handles all navigation and safety so you can relax. They also help with boarding, setting up your music, and anchoring at the best spots for swimming."
  },
  {
    question: "Deposit and cancellation policy?",
    answer: "A deposit is required to secure your date (25-50% depending on how far out you book). We offer a full refund if canceled within 48 hours of booking. Weather-related cancellations are handled at the captain's discretion with a full refund or reschedule."
  },
  {
    question: "What if the weather is bad?",
    answer: "The captain makes the final safety call. If conditions are unsafe, you'll receive a full refund or the option to reschedule. We typically sail in light rain, but not in high winds or lightning."
  },
  {
    question: "Can we customize the cruise route?",
    answer: "Absolutely! While we have popular routes that include scenic cruising and swimming in Devils Cove, you can talk to your captain about specific spots you'd like to see on Lake Travis."
  },
  {
    question: "Where do we depart from?",
    answer: "Our primary departure point is at Emerald Point Marina on Lake Travis. Detailed arrival instructions and parking info will be sent with your booking confirmation."
  },
  {
    question: "How long are the cruises?",
    answer: "Our standard private charters are 4 hours long, which is the perfect amount of time to cruise, swim, and celebrate. Extended durations may be available upon request."
  }
];

export default function PrivateCruises() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGetQuote = () => {
    setLocation('/chat');
  };

  return (
    <div className="min-h-screen bg-white" data-page-ready="private-cruises">
      <SEOHead 
        pageRoute="/private-cruises"
        defaultTitle="Private Party Boat Rentals Lake Travis | Austin Boat Charter from $200/hr"
        defaultDescription="Private party boat rentals on Lake Travis starting at $200/hr. Captain included, BYOB, holds 14-75 guests. Austin's premier private cruise experience since 2009!"
        defaultKeywords={["private boat rental Austin", "Lake Travis private cruise", "austin party cruises", "party boat austin", "Austin boat charter", "private party boat Austin", "Lake Travis boat rental", "Austin yacht rental", "lake travis party boat"]}
        schemaType="service"
      />
      
      <PublicNavigation />
      <Breadcrumb />

      {/* Table of Contents - Sticky Sidebar */}
      <TableOfContents sections={tocSections} />

      {/* Hero Section - Clean and spacious */}
      <section id="hero" className="relative py-16 md:py-24 overflow-hidden bg-gray-900 min-h-[70vh] flex items-center pt-[116px]">
        {/* Local Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
            poster={heroImage1}
            preload="metadata"
          >
            <source src="/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10 px-4 text-white text-center">
          <Badge className="mb-6 md:mb-8 bg-brand-yellow text-gray-900 text-sm sm:text-base px-6 sm:px-8 py-2.5 border-0 font-sans tracking-wider font-bold uppercase shadow-lg">
            Private Boat Charters
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold heading-unbounded mb-6 md:mb-8 text-white leading-tight drop-shadow-lg">
            Private Party Boat Rentals on Lake Travis: Austin Charters for 14-75 Guests
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-brand-yellow mb-8 md:mb-10 font-bold drop-shadow-md">
            Your Private Boat. Your Rules. Your Adventure.
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Exclusive charters for 14-75 guests. BYOB friendly. Choose your schedule, play your music, create your perfect day on the lake.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-10 md:mb-12">
            <Button
              size="lg"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-6 shadow-2xl transition-all transform hover:scale-105"
              data-testid="button-hero-view-packages"
            >
              View Packages & Pricing
              <Gem className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <div
              className="xola-custom xola-checkout w-full sm:w-auto"
              data-button-id="695186923c261203770cc2e7"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-6 shadow-2xl transition-all transform hover:scale-105"
                data-testid="button-hero-get-quote"
              >
                Reserve Your Private Charter
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-brand-yellow" />
              <span className="text-white font-medium">Private Charter</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-yellow" />
              <span className="text-white font-medium">14-75 Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-yellow" />
              <span className="text-white font-medium">Flexible Schedule</span>
            </div>
            <div className="flex items-center gap-2">
              <Wine className="h-5 w-5 text-brand-yellow" />
              <span className="text-white font-medium">BYOB Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Matching Homepage */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span className="font-medium">150K+ Customers</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <Trophy className="w-4 h-4 text-blue-600" />
              <span className="font-medium">16+ Years</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Perfect Safety Record</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section - Reused Component */}
      <FleetSection />

      {/* Quote Builder Section - Embedded Get-A-Quote */}
      <QuoteBuilderSection />

      {/* Premium Emotional Benefits Section - NEW */}

      {/* Experience Section */}
      <SectionReveal>
        <section id="experience" className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-unbounded mb-6 text-gray-900">
                  The Private Charter Experience
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Discover the freedom and luxury of your own private Lake Travis adventure. Perfect for <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Parties">bachelor parties</InternalLinkHighlight>, <InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Parties">bachelorette celebrations</InternalLinkHighlight>, or any special occasion. <InternalLinkHighlightWithArrow href="/" title="Home">See all our cruise options</InternalLinkHighlightWithArrow>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <Card className="bg-blue-50 border-blue-200">
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

                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-brand-navy rounded-lg">
                        <UserCheck className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">Professional Service</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Every private charter includes licensed, fun, experienced captains to take your group safely around the lake in style. They know Lake Travis like the back of their hand and will show you the best spots.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Licensed, fun, experienced captains to take your group safely around the lake in style</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Expert knowledge of Lake Travis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Professional crew for larger groups</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
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
                    answer: 'Yes! The typical cruise includes 30-45 minutes of cruising, then we tie up along the cliffs of a Lake Travis nature preserve with crystal clear water for swimming (typically 1.5-2 hours), then cruise back. However, the time is yours - work with your captain to customize any combination of cruising and swimming time that works for your group.',
                    keywords: ['customize', 'route', 'captain', 'Lake Travis', 'nature preserve'],
                    icon: MapPin,
                    relatedLink: {
                      href: '#pricing',
                      text: 'View our fleet options'
                    }
                  },
                  {
                    id: 'life-jackets',
                    question: 'Are life jackets provided?',
                    answer: 'Yes, life jackets are on board and available for swimming - we encourage guests to wear them for safety. Approved life jackets provided for all guests in various sizes including children and adults. Safety is our top priority with licensed, fun, experienced captains to take your group safely around the lake in style. Swimming areas supervised by experienced crew.',
                    keywords: ['life jackets', 'safety', 'licensed captains'],
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
        <section id="pricing" className="py-12 md:py-24 bg-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-unbounded mb-6 text-yellow-400">
                  Pricing & Packages
                </h2>
                <p className="text-lg text-blue-600 max-w-3xl mx-auto font-medium">
                  Choose from three boats and three package levels to create your perfect private experience on Lake Travis.
                </p>
              </div>

              {/* Private Cruise Pricing Component */}
              <div className="mb-12">
                <TabbedPrivateCruisePricing />
              </div>

              <Tabs defaultValue="fleet" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-12 bg-brand-navy p-2 rounded-2xl h-auto">
                  <TabsTrigger 
                    value="fleet" 
                    className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:bg-white/20 data-[state=inactive]:text-white hover:bg-white/30 font-bold text-lg py-4 rounded-xl transition-all"
                    data-testid="tab-fleet"
                  >
                    Our Fleet
                  </TabsTrigger>
                  <TabsTrigger 
                    value="packages" 
                    className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:bg-white/20 data-[state=inactive]:text-white hover:bg-white/30 font-bold text-lg py-4 rounded-xl transition-all"
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
                            <p className="text-3xl font-bold text-gray-900">${boat.baseRate}</p>
                            <p className="text-sm text-gray-600">for 4-hour cruise</p>
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
                        { label: "Day Tripper (1-14)", value: "$800-$1,400 for 4-hour cruise - Intimate gatherings" },
                        { label: "Meeseeks (15-30)", value: "$900-$1,700 for 4-hour cruise - Birthday parties" },
                        { label: "Clever Girl (31-75)", value: "$1,000-$2,000 for 4-hour cruise - Large events" }
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
                    <p className="text-gray-700 mb-6">Add these one-time fees to your 4-hour cruise</p>
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
                      <div className="p-6 bg-gray-50 rounded-xl">
                        <Crown className="h-12 w-12 text-brand-navy mx-auto mb-3" />
                        <h4 className="font-bold text-lg mb-2">Ultimate</h4>
                        <p className="text-3xl font-bold text-gray-900">$250-350</p>
                        <p className="text-sm text-gray-600 mt-2">Based on boat size</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-12 sm:mt-16 text-center px-4">
                <a
                  href="/chat"
                  className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold text-base sm:text-xl px-6 sm:px-12 py-4 sm:py-6 rounded-md transition-all"
                  data-testid="button-pricing-get-quote"
                >
                  Get Custom Quote for Your Date
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Availability Section */}
      <SectionReveal>
        <section id="availability" className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-unbounded mb-6 text-gray-900">
                  Booking & Availability
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Plan ahead for the best experience - popular dates fill up quickly
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <Card className="bg-blue-50 border-blue-200">
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
                          <p className="text-gray-700">Book 8-12 weeks for priority time slots - once they book they\'re gone!</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                          <Sun className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Shoulder Season (March-April, October)</p>
                          <p className="text-gray-700">Book 8-12 weeks for priority time slots - once they book they\'re gone!</p>
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

                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-brand-navy rounded-lg">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">Cruise Times</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                          <Sun className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Morning Cruises (9am-1pm)</p>
                          <p className="text-gray-700">Perfect for calmer waters and cooler temperatures</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                          <Sun className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Afternoon Cruises (2pm-6pm)</p>
                          <p className="text-gray-700">Peak sunshine and social lake atmosphere</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                          <Moon className="h-5 w-5 text-blue-600" />
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
                <Card className="bg-brand-navy text-white border-0">
                  <CardContent className="p-12">
                    <h3 className="text-3xl font-bold mb-4">Ready to Book Your Private Charter?</h3>
                    <p className="text-xl mb-8 text-white/90">
                      Get your custom quote and check availability for your preferred date
                    </p>
                    <div
                      className="xola-custom xola-checkout inline-block w-full sm:w-auto"
                      data-button-id="695186923c261203770cc2e7"
                    >
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 font-bold text-base sm:text-xl px-6 sm:px-12 py-4 sm:py-6"
                        data-testid="button-availability-get-quote"
                      >
                        Check Availability & Get Quote
                        <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* NEW SEO SECTION 1: Austin Party Cruises for Private Events */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-unbounded text-center mb-8 text-gray-900 leading-tight">
                Austin Party Cruises: Your Private Lake Travis Experience
              </h2>
              
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When planning a memorable celebration, <strong>austin party cruises</strong> on Lake Travis offer an unmatched combination of privacy, luxury, and natural beauty. Our private boat rentals provide the ultimate <strong>party boat austin</strong> experience, giving you complete control over your celebration while our professional crew handles all the details.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Why Choose a Lake Travis Party Boat for Private Events</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  A private <strong>lake travis party boat</strong> charter offers advantages that traditional event venues simply cannot match. With exclusive access to your own boat, you'll enjoy complete privacy, flexible scheduling, and the freedom to customize every aspect of your celebration. Whether you're planning corporate team building, a wedding rehearsal dinner, or a milestone birthday, our <strong>party cruises</strong> provide a unique and memorable setting.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">What Sets Our Austin Party Boat Rentals Apart:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Complete Privacy</strong> - Your group gets the entire boat, no strangers or shared space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Flexible Scheduling</strong> - Choose your departure time, duration, and route</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Professional Crew</strong> - Licensed, experienced captains ensure safe and smooth sailing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>BYOB Friendly</strong> - Bring your own beverages and food to customize your experience</span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Perfect Events for Austin Party Cruises</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Our <strong>austin party cruise</strong> experiences are ideal for a wide range of celebrations. Corporate groups love our boats for team building and client entertainment, offering a unique alternative to traditional conference rooms. Wedding parties choose us for rehearsal dinners and bridal showers, creating intimate pre-wedding memories on the water. Families celebrate milestone birthdays, reunions, and graduations with our private <strong>party boat austin</strong> charters.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <Card className="border-2 border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                        Corporate Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700">Team building, client entertainment, company celebrations. Professional setting with stunning lake views.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-gray-200">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="h-5 w-5 text-blue-600" />
                        Wedding Celebrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700">Rehearsal dinners, bridal showers, wedding party gatherings. Create intimate memories before the big day.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-gray-200">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Cake className="h-5 w-5 text-blue-600" />
                        Special Milestones
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700">Birthdays, graduations, anniversaries, retirements. Celebrate life's biggest moments on the water.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* NEW SEO SECTION 2: Planning Your Lake Travis Party Boat */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-unbounded text-center mb-8 text-gray-900 leading-tight">
                Planning Your Private Party Boat Austin Charter
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Successfully planning your <strong>lake travis party boat</strong> charter requires understanding the options and making decisions that align with your group's needs. With boats ranging from intimate 14-passenger pontoons to high-end 75-passenger party boats, we help you select the perfect vessel for your <strong>party cruises</strong> celebration.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Choosing the Right Boat Size</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  The size of your group determines which <strong>party boat austin</strong> option works best. For intimate gatherings of 10-15 people, our Day Tripper pontoon offers a cozy, personal experience. Mid-sized groups of 20-30 guests typically choose Meeseeks or The Irony, which provide ample space without feeling too large. For major celebrations with 40+ attendees, our flagship Clever Girl party boat delivers the luxury and capacity needed for large-scale <strong>austin party</strong> events.
                </p>

                <div className="bg-white border-2 border-blue-200 p-6 my-8 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Tips for Your Lake Travis Party Boat Experience:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        Timing Your Cruise
                      </h5>
                      <ul className="text-sm text-gray-700 space-y-1 ml-7">
                        <li>• Morning cruises (10am-2pm) best for families</li>
                        <li>• Afternoon (12pm-4pm) most popular for parties</li>
                        <li>• Evening (4pm-8pm) perfect for sunset views</li>
                        <li>• Book 8-12 weeks for peak season</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Wine className="h-5 w-5 text-blue-600" />
                        Food & Beverage
                      </h5>
                      <ul className="text-sm text-gray-700 space-y-1 ml-7">
                        <li>• BYOB with cans/plastic only</li>
                        <li>• Catering available through partners</li>
                        <li>• Empty coolers (BYO ice OR add Essentials/Ultimate for ice included)</li>
                        <li>• Consider alcohol delivery to marina</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Customizing Your Austin Party Cruise</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  The beauty of private <strong>austin party cruises</strong> lies in the customization options. Want a professional DJ to keep the energy high? We can arrange that. Need a photographer to capture your corporate event or family celebration? We have trusted professionals ready. Looking for giant floats and water toys? Our enhanced packages include everything you need to make the most of Lake Travis's pristine waters.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We tie up along the cliffs of a beautiful Lake Travis nature preserve with crystal clear water, perfect for swimming, floating, and celebrating. After cruising for 30-45 minutes, we typically anchor for 1.5-2 hours of swimming time, then cruise back. However, the time is yours - customize any combination of cruising and swimming that works for your group. Whatever your vision for the perfect day on the water, we'll help make it happen.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg my-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Popular Add-Ons for Party Cruises:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Music className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Professional DJ Service</strong> - Live entertainment with high-quality sound system ($600)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Camera className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Professional Photography</strong> - Capture every moment with digital photo delivery ($600)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Anchor className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Giant Floats Package</strong> - Lily pads, unicorns, and water toys ($200-400)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Utensils className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Catering Services</strong> - Partner with local caterers for food and beverages (varies)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Benefits Section - What's Included */}
      <SectionReveal>
        <section id="benefits" className="py-12 md:py-24 bg-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-unbounded mb-6 text-gray-900">
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
        <section id="features" className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-unbounded mb-6 text-gray-900">
                  Customize Your Experience
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Add-ons and upgrades to make your cruise unforgettable
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Utensils className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Food & Drinks</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>BYOB – Bring your own food & drinks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Tables & coolers provided</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Ice included with Essentials/Ultimate packages</span>
                      </li>
                    </ul>
                  </CardHeader>
                </Card>

                <Card className="bg-white border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Music className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Entertainment</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Professional DJ services ($600 per cruise)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Professional photographer ($600 per cruise)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>AV package: microphone + projector/screen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span>Premium Bluetooth sound system</span>
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
                      <CardTitle className="text-xl font-semibold text-gray-900">Beverages via Party On Delivery</CardTitle>
                    </div>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span>Light beer & craft beer selection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span>Hard seltzers & wine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span>Lake-ready cocktail kits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span>Delivered on ice, ready when you arrive!</span>
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
                      <div className="mx-auto mb-3 p-3 bg-gray-100 rounded-lg w-fit">
                        <Heart className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">Weddings</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">Rehearsal dinners, welcome parties, after parties</p>
                    </CardHeader>
                  </Card>

                  <Card className="bg-white border-gray-200">
                    <CardHeader className="p-6 text-center">
                      <div className="mx-auto mb-3 p-3 bg-gray-100 rounded-lg w-fit">
                        <Cake className="h-6 w-6 text-blue-600" />
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

      {/* Corporate ROI Section - NEW */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-6 bg-green-500 text-white text-sm px-4 sm:px-6 py-2 border-0 font-bold tracking-wider uppercase">
                  ROI for Corporate Clients
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  Why Smart Companies Choose Lake Travis
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Better results, lower cost, unforgettable impact
                </p>
              </div>

              {/* ROI Comparison Cards */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {corporateROI.map((option, index) => (
                  <Card 
                    key={index} 
                    className={cn(
                      "bg-white/10 backdrop-blur-sm border-white/20",
                      option.highlighted && "border-2 border-green-400 shadow-2xl shadow-green-500/20"
                    )}
                  >
                    <CardHeader>
                      {option.highlighted && (
                        <Badge className="mb-4 bg-green-500 text-white">BEST VALUE</Badge>
                      )}
                      <CardTitle className="text-2xl text-white">{option.title}</CardTitle>
                      <p className="text-3xl font-bold text-yellow-400">{option.cost}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            {option.highlighted ? (
                              <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                            ) : (
                              <X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                            )}
                            <span className="text-white/90">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 p-4 bg-white/10 rounded-lg">
                        <p className="text-center">
                          <span className="text-sm text-white/70">VALUE:</span>
                          <span className={cn(
                            "block text-xl font-bold mt-1",
                            option.highlighted ? "text-green-400" : "text-yellow-400"
                          )}>
                            {option.value}
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* ROI Benefits */}
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Team Building That Works</h3>
                  <p className="text-white/80">Break down barriers, build real connections</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Client Entertainment That Closes</h3>
                  <p className="text-white/80">Unique experiences that seal the deal</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Star className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Milestones Worth Remembering</h3>
                  <p className="text-white/80">Celebrate success in unforgettable style</p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-lg text-white/90 mb-8">
                  <span className="font-bold text-green-400">500+ successful corporate events</span> | 
                  <span className="font-bold text-yellow-400"> Trusted by Austin's top companies</span> | 
                  <span className="font-bold text-blue-400"> Professional invoicing available</span>
                </p>
                <div
                  className="xola-custom xola-checkout w-full sm:w-auto"
                  data-button-id="695186923c261203770cc2e7"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold text-base sm:text-xl px-6 sm:px-12 py-4 sm:py-6 shadow-2xl"
                  >
                    Get Custom Corporate Quote
                    <Briefcase className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Why Choose Us Section */}
      <SectionReveal>
        <section id="why-choose" className="py-12 md:py-24 bg-brand-navy text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-unbounded mb-6 text-white">
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

              <div className="mt-12 sm:mt-16 text-center px-4">
                <div
                  className="xola-custom xola-checkout w-full sm:w-auto inline-block"
                  data-button-id="695186923c261203770cc2e7"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 font-bold text-base sm:text-xl px-6 sm:px-12 py-4 sm:py-6"
                    data-testid="button-why-choose-get-quote"
                  >
                    Book Your Private Charter Now
                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Gallery Section */}
      <SectionReveal>
        <section id="gallery" className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-unbounded mb-6 text-gray-900">
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
        <section id="testimonials" className="py-12 md:py-24 bg-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-unbounded mb-6 text-gray-900">
                  What Our Guests Say
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Real reviews from real celebrations on Lake Travis
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-white border-gray-200 hover:border-blue-500 transition-all hover:shadow-xl">
                    <CardHeader>
                      {testimonial.highlight && (
                        <Badge className="mb-3 bg-brand-navy text-white">
                          {testimonial.highlight}
                        </Badge>
                      )}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl sm:text-4xl md:text-5xl">{testimonial.avatar}</div>
                        <div>
                          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                          <p className="text-sm text-gray-600 font-medium">{testimonial.role}</p>
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
                      <p className="text-gray-700 italic leading-relaxed">{testimonial.text}</p>
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
                <p className="text-3xl font-bold mb-2">150,000+ Happy Customers</p>
                <p className="text-gray-600">Join thousands of satisfied customers who've celebrated on Lake Travis</p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Planning Guides Section */}
      <SectionReveal>
        <section className="py-12 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Lake Travis Party Boat Planning Guides</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/first-time-lake-travis-boat-rental-guide">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-bold">
                  First-Time Lake Travis Boat Rental Guide
                </Button>
              </Link>
              <Link href="/blog/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-bold">
                  Large Group Party Boat Guide
                </Button>
              </Link>
              <Link href="/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-bold">
                  Boat Party Planning & Logistics
                </Button>
              </Link>
              <Link href="/blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-bold">
                  Boat Party Packages Guide
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQs Section */}
      <SectionReveal>
        <section id="faqs" className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-unbounded mb-6 text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-700">
                  Everything you need to know about private boat charters on Lake Travis
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-start">
                {faqQuestions.map((faq, index) => (
                  <Collapsible
                    key={index}
                    open={openFaq === index}
                    onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}
                    className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-5 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors">
                      <span className="text-lg leading-tight pr-4">{faq.question}</span>
                      <ChevronDown className={cn(
                        "h-5 w-5 text-brand-yellow shrink-0 transition-transform duration-300",
                        openFaq === index ? "rotate-180" : ""
                      )} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-5 text-gray-700 bg-gray-50/50 border-t border-gray-100 leading-relaxed">
                      {faq.answer}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              <div className="mt-16 text-center bg-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-gray-700 mb-6">Our team is here to help you plan the perfect private charter</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                  <a
                    href="/chat"
                    className="inline-flex items-center justify-center w-full sm:w-auto bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 rounded-md transition-all shadow-lg transform hover:-translate-y-1"
                  >
                    Get Custom Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold"
                  >
                    <a href="tel:+15124885892">
                      <Phone className="mr-2 h-5 w-5" />
                      Call (512) 488-5892
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* SEO Content Section - Move to bottom */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <AIOptimizedSection
              title="Private Boat Rentals Lake Travis Austin"
              content={`
                <p>Looking for <strong>private boat rentals on Lake Travis</strong>? Premier Party Cruises offers exclusive boat charters for groups of 1-75 guests. Our fleet includes three exceptional boats: Day Tripper (1-14 guests), Meeseeks & The Irony (15-30 guests), and our flagship Clever Girl (31-75 guests).</p>
                
                <h3>Austin Private Boat Charter Services</h3>
                <p>As <strong>Austin's premier private boat charter company</strong>, we've been creating unforgettable Lake Travis experiences since 2009. Choose from Standard, Essentials, or Ultimate packages to customize your perfect celebration. All charters include licensed, fun, experienced captains, premium sound systems, cooler space (ice included with Essentials/Ultimate packages), and flexible departure times.</p>
                
                <h3>Perfect for Every Occasion</h3>
                <p>Our <strong>Lake Travis private cruises</strong> are perfect for corporate events, weddings, birthdays, bachelor/bachelorette parties, and family celebrations. With BYOB-friendly policies and customizable routes, you have complete control over your experience.</p>
                
                <h3>Book Your Private Charter Today</h3>
                <p>Ready to book your <strong>private boat rental in Austin</strong>? Get your custom quote online or call (512) 488-5892. We recommend booking 8-12 weeks for priority time slots - once they book they\'re gone! This is especially important for weekends during peak season (May-September).</p>
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

      <RelatedLinks />

      {/* Sticky CTA */}
      <StickyCTA
        primaryText="Get Free Quote"
        primaryAction={() => handleGetQuote()}
        secondaryText="Call Now"
        secondaryHref="tel:+15124885892"
        showOnDesktop={false}
      />

      <VideoGallerySection videos={[{id: 'FABtEDZZBA0', title: 'Premier Party Cruises Experience', description: 'See what makes our Lake Travis cruises unforgettable'}]} />

      {/* Fleet Comparison Table */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">Compare Our Fleet</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">All four boats side-by-side. Find the perfect fit for your group size and budget.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-4 font-semibold rounded-tl-lg">Feature</th>
                  <th className="p-4 font-semibold">Day Tripper</th>
                  <th className="p-4 font-semibold">The Irony</th>
                  <th className="p-4 font-semibold">Meeseeks</th>
                  <th className="p-4 font-semibold rounded-tr-lg">Clever Girl</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Max Capacity</td>
                  <td className="p-4">14 guests</td>
                  <td className="p-4">25 guests</td>
                  <td className="p-4">30 guests</td>
                  <td className="p-4">75 guests</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Weekday Rate</td>
                  <td className="p-4">$200/hr</td>
                  <td className="p-4">$300/hr</td>
                  <td className="p-4">$350/hr</td>
                  <td className="p-4">$520/hr</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Weekend Rate</td>
                  <td className="p-4">$250/hr</td>
                  <td className="p-4">$350/hr</td>
                  <td className="p-4">$400/hr</td>
                  <td className="p-4">$520/hr</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Min Hours</td>
                  <td className="p-4">3 hours</td>
                  <td className="p-4">3 hours</td>
                  <td className="p-4">3 hours</td>
                  <td className="p-4">3 hours</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Bluetooth Speakers</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">Yes</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Floats Included</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">Yes (giant lily pad)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Best For</td>
                  <td className="p-4">Intimate groups, couples, small teams</td>
                  <td className="p-4">Medium groups, birthdays, friend groups</td>
                  <td className="p-4">Larger parties, team events</td>
                  <td className="p-4">Big celebrations, corporate, weddings</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Special Features</td>
                  <td className="p-4">Most affordable, cozy vibe</td>
                  <td className="p-4">Great value mid-size</td>
                  <td className="p-4">Spacious deck, swim platform</td>
                  <td className="p-4">14 disco balls, Texas flag deck, flagship</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-6 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <Link href="/atx-disco-cruise" className="hover:text-brand-yellow transition-colors">ATX Disco Cruise</Link>
            <Link href="/private-cruises" className="hover:text-brand-yellow transition-colors">Private Cruises</Link>
            <Link href="/bachelor-party-austin" className="hover:text-brand-yellow transition-colors">Bachelor Party Austin</Link>
            <Link href="/bachelorette-party-austin" className="hover:text-brand-yellow transition-colors">Bachelorette Party Austin</Link>
            <Link href="/wedding-parties" className="hover:text-brand-yellow transition-colors">Wedding Parties</Link>
            <Link href="/birthday-parties" className="hover:text-brand-yellow transition-colors">Birthday Parties</Link>
            <Link href="/celebration-cruises" className="hover:text-brand-yellow transition-colors">Celebration Cruises</Link>
            <Link href="/corporate-events" className="hover:text-brand-yellow transition-colors">Corporate Events</Link>
            <Link href="/party-boat-lake-travis" className="hover:text-brand-yellow transition-colors">Party Boat Lake Travis</Link>
            <Link href="/gallery" className="hover:text-brand-yellow transition-colors">Gallery</Link>
            <Link href="/blogs" className="hover:text-brand-yellow transition-colors">Blog & Tips</Link>
            <Link href="/contact" className="hover:text-brand-yellow transition-colors">Contact</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

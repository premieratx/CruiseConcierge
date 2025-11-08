import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DISCO_PRICING } from '@shared/constants';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import DiscoVsPrivateValueCalculator from '@/components/DiscoVsPrivateValueCalculator';
import { SectionReveal } from '@/components/SectionReveal';
import { ScrollReveal } from '@/components/ScrollReveal';
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, 
  Zap, Target, Play,
  MessageSquare, Ticket, Gift, Disc3, Volume2, 
  Mic, Utensils, GlassWater, UserCheck, Leaf, Check,
  AlertCircle, DollarSign, Timer, CreditCard, CloudRain, 
  HelpCircle, Anchor, Droplets, Waves, Info, TrendingUp,
  Beer, Swords, CircleDot, Smile, X, Package,
  Plane, Wine, Eye, Bot, Navigation
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';
import Breadcrumb from '@/components/Breadcrumb';
import { FeaturedSnippet, FeaturedSnippetHowTo } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';
import { WhatToBring } from '@/components/WhatToBring';
import { PricingTable } from '@/components/PricingTable';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { TableOfContents } from '@/components/TableOfContents';
import { StickyCTA } from '@/components/StickyCTA';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { TransportationGuide } from '@/components/TransportationGuide';
import { LazyImage } from '@/components/LazyImage';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { SchemaMarkup, generateEventSchema, generateProductSchema, generateFAQSchema, 
         generateLocalBusinessSchema, generateServiceSchema, generateAggregateRatingSchema, 
         generateBreadcrumbSchema, generateHowToSchema } from '@/components/SEOSchemaMarkup';

// Hero and gallery images
const heroImage1 = '/attached_assets/bachelor-party-group-guys.webp';
const heroImage2 = '/attached_assets/party-atmosphere-1.webp';
const heroImage3 = '/attached_assets/party-atmosphere-2.webp';
const galleryImage1 = '/attached_assets/day-tripper-14-person-boat.webp';
const galleryImage2 = '/attached_assets/meeseeks-25-person-boat.webp';
const galleryImage3 = '/attached_assets/clever-girl-50-person-boat.webp';
const discoImage1 = '/attached_assets/atx-disco-cruise-party.webp';
const discoImage2 = '/attached_assets/dancing-party-scene.webp';
const floatImage = '/attached_assets/giant-unicorn-float.webp';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// ATX Disco Cruise packages - CORRECTED PRICING
const atxDiscoPackages = [
  {
    id: 'basic_bach',
    name: 'Basic Bach Package',
    price: 85,
    priceWithTaxTip: 111,
    originalPrice: null,
    description: 'Join the ultimate multi-group bachelor party on Lake Travis',
    subtitle: 'Party with other bachelor crews - legendary energy!',
    features: [
      '4-hour party cruise with other bachelor groups',
      'Professional DJ spinning all day',
      'Professional photographer capturing epic moments',
      'Access to giant lily pad floats',
      'BYOB with coolers and ice provided',
      'Meet and party with other bachelor crews',
      'Digital photos delivered after cruise'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Best Value',
    groomSpecial: false
  },
  {
    id: 'disco_king',
    name: 'Disco King Package',
    price: 95,
    priceWithTaxTip: 124,
    originalPrice: null,
    description: 'Our most popular package with VIP perks for your crew',
    subtitle: 'VIP treatment while partying with other groups',
    features: [
      '🎉 GROOM CRUISES FREE with Disco King & Super Sparkle Package ONLY',
      'Private cooler with ice just for your crew',
      'Reserved seating area for your boys',
      'Disco ball cup & party gear for groom',
      'Alcohol delivery coordination available',
      '25% discount on round-trip transportation',
      'Priority boarding for your crew',
      'Everything from Basic Bach Package'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular',
    groomSpecial: true
  },
  {
    id: 'super_sparkle',
    name: 'Super Sparkle Package',
    price: 105,
    priceWithTaxTip: 137,
    originalPrice: null,
    description: 'VIP treatment with all the extras',
    subtitle: 'The ultimate ATX Disco experience',
    features: [
      '🎉 GROOM CRUISES FREE with Disco King & Super Sparkle Package ONLY',
      'Personal unicorn float for the groom',
      'Drink bar setup with supplies',
      'SPF-50 spray sunscreen provided',
      'Towel service for your crew',
      'Premium reserved area',
      'VIP boarding and departure',
      'Everything from Disco King Package'
    ],
    popular: false,
    icon: Trophy,
    badge: 'VIP Experience',
    groomSpecial: true
  }
];

// Private Cruise options for bachelors
const privateCruiseOptions = [
  {
    id: 'day_tripper',
    name: 'Day Tripper (1-14 guests)',
    capacity: 14,
    weekdayRate: 350,
    weekendRate: 450,
    description: 'Perfect for smaller bachelor crews',
    features: [
      'Exclusive use of the entire boat',
      'Custom departure times & itinerary',
      'BYOB - bring whatever you want',
      'Choose your own music/DJ',
      'Private swim stops anywhere'
    ]
  },
  {
    id: 'meeseeks',
    name: 'Meeseeks (25 people)',
    capacity: 25,
    weekdayRate: 550,
    weekendRate: 700,
    description: 'Ideal for medium-sized groups',
    features: [
      'Exclusive use of the entire boat',
      'Plenty of space to party',
      'Multiple seating areas',
      'Large swim platform',
      'Premium sound system'
    ]
  },
  {
    id: 'clever_girl',
    name: 'Clever Girl (30-50 people)',
    capacity: '30-50',
    weekdayRate: 850,
    weekendRate: 1050,
    description: 'Perfect for large bachelor parties',
    features: [
      'Exclusive use of the entire boat',
      'Multiple levels',
      'Party deck area',
      'Full bar setup area',
      'Premium amenities'
    ]
  }
];

// Private Cruise add-ons
const privateCruiseAddOns = [
  {
    name: 'Professional DJ',
    price: 600,
    description: 'Professional DJ for your entire cruise'
  },
  {
    name: 'Professional Photographer',
    price: 600,
    description: 'Capture every legendary moment'
  },
  {
    name: 'Lily Pad Floats',
    price: 50,
    description: 'Giant floats for swimming (per cruise)'
  },
  {
    name: 'Essentials Package',
    price: '100-200',
    description: 'Coolers, ice, cups, basic supplies (per cruise)'
  },
  {
    name: 'Ultimate Package',
    price: '250-350',
    description: 'Everything plus decorations, premium supplies (per cruise)'
  }
];

// Complete list of what's included
const whatsIncluded = [
  {
    icon: Music,
    title: 'Professional DJ',
    description: 'Playing your favorites all day'
  },
  {
    icon: Camera,
    title: 'Professional Photographer',
    description: 'Capturing epic moments'
  },
  {
    icon: Camera,
    title: 'Digital Photo Delivery',
    description: 'After the event'
  },
  {
    icon: Anchor,
    title: 'Private Cooler with Ice',
    description: 'For your crew'
  },
  {
    icon: GlassWater,
    title: 'Drink Supplies',
    description: 'Cups and koozies'
  },
  {
    icon: Waves,
    title: 'Multiple Giant Lily Pad Floats',
    description: '6x20 feet each'
  },
  {
    icon: Gift,
    title: 'Party Supplies',
    description: 'Everything you need'
  },
  {
    icon: Droplets,
    title: 'Ice Water Stations',
    description: 'Throughout the cruise'
  },
  {
    icon: Shield,
    title: 'Clean Restroom Facilities',
    description: 'On board'
  },
  {
    icon: Sun,
    title: 'Shaded Lounge Areas',
    description: 'To escape the sun'
  },
  {
    icon: Users,
    title: 'Party Atmosphere',
    description: 'With other bachelor crews'
  }
];

// FAQs - Enhanced with Bachelor-Specific Questions  
const faqItems = [
  {
    id: 'cooler-policy',
    question: 'Can we bring a cooler of whatever we want?',
    answer: 'Hell yes! BYOB - bring beer, liquor, seltzers - whatever your crew drinks. We provide the coolers and ice. Cans/plastic only for safety.'
  },
  {
    id: 'crew-size',
    question: 'Is there room for our whole crew?',
    answer: 'We\'ve got boats from 14 to 75 people. Most bachelor parties book the Disco Cruise where you party with other bachelor crews - more energy, more fun.'
  },
  {
    id: 'party-vibe',
    question: 'What\'s the party vibe like?',
    answer: 'Think Vegas energy on Lake Travis. DJ spinning, multiple bachelor crews getting wild, giant floats, epic atmosphere. It\'s your last hurrah done right.'
  },
  {
    id: 'refund-policy',
    question: 'Do you offer a refund window after booking?',
    answer: "Yes—48 hours after booking for a full refund. After that, weather rules apply at captain's discretion."
  },
  {
    id: 'split-payment',
    question: 'Can we split payments between the guys?',
    answer: 'Yes. Split payment options are available at checkout - makes it easy for everyone to chip in.'
  },
  {
    id: 'attire',
    question: 'Is disco attire required?',
    answer: 'Encouraged but not required. Most crews go all out - it makes for legendary photos.'
  },
  {
    id: 'weather-policy',
    question: 'What happens in bad weather?',
    answer: 'Rain or shine - we party. For severe weather, we move to Lemonade Disco (land venue).',
    answerJsx: (
      <>
        Rain or shine - we party. For severe weather, we move to{' '}
        <a href="#lemonade-disco" className="text-blue-500 hover:underline font-semibold">
          Lemonade Disco
        </a>{' '}
        (land venue).
      </>
    )
  },
  {
    id: 'add-people',
    question: 'Can we add more guys after booking?',
    answer: 'Yes, usually 1–2 if availability allows—contact us ASAP. The boys always bring more boys.'
  },
  {
    id: 'group-discounts',
    question: 'Do you offer group discounts for 10+ guys?',
    answer: 'Yes! Groups of 10+ get special perks including group discounts, priority boarding, and the groom gets special treatment. Contact us for custom packages.'
  },
  {
    id: 'alcohol-policy',
    question: 'What\'s the alcohol policy?',
    answer: 'BYOB for 21+. Bring whatever you want - beer, liquor, seltzers. Cans/plastic only. We provide coolers with ice and cups.'
  },
  {
    id: 'booking-timeline',
    question: 'How far in advance should we book?',
    answer: 'Peak bachelor season weekends book 8-12 weeks for priority time slots - once they book they\'re gone! Lock it in early or risk missing out.'
  }
];

// Import real reviews from shared/reviews-data.ts
import { bachelorReviews, combinedBachReviews, type Review } from '@shared/reviews-data';

// Use bachelorReviews + combinedBachReviews for Bachelor Party page
const groomTestimonials: Review[] = [...bachelorReviews, ...combinedBachReviews];

// Photo gallery items
const galleryPhotos = [
  { id: 1, src: heroImage1, alt: 'Bachelor Party Austin group celebrating on Lake Travis party boat' },
  { id: 2, src: discoImage1, alt: 'Austin Bachelor Party ATX Disco Cruise on Party Boat Lake Travis' },
  { id: 3, src: galleryImage1, alt: 'Lake Travis Bachelor Party Day Tripper boat cruise' },
  { id: 4, src: discoImage2, alt: 'Bachelor Party Austin dancing on Party Boat Lake Travis cruise' },
  { id: 5, src: galleryImage2, alt: 'Austin Bachelor Party Boat Meeseeks on Lake Travis' },
  { id: 6, src: floatImage, alt: 'Lake Travis Bachelor Party giant unicorn float on Party Boat Austin' },
  { id: 7, src: galleryImage3, alt: 'Bachelor Party Austin Clever Girl boat on Lake Travis' },
  { id: 8, src: heroImage2, alt: 'Austin Bachelor Party Boat atmosphere on Lake Travis' }
];

// Table of Contents sections - Updated with comparison
const tocSections = [
  { id: 'hero', title: 'Overview', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'your-options', title: 'Your Two Options', icon: <Target className="h-4 w-4" /> },
  { id: 'packages', title: 'Packages & Pricing', icon: <Package className="h-4 w-4" /> },
  { id: 'what-to-expect', title: 'What to Expect', icon: <Star className="h-4 w-4" /> },
  { id: 'availability', title: 'Availability', icon: <Calendar className="h-4 w-4" /> },
  { id: 'benefits', title: 'Benefits', icon: <Trophy className="h-4 w-4" /> },
  { id: 'whats-included', title: "What's Included", icon: <CheckCircle className="h-4 w-4" /> },
  { id: 'why-choose', title: 'Why Choose Us', icon: <Shield className="h-4 w-4" /> },
  { id: 'photos', title: 'Photos', icon: <Camera className="h-4 w-4" /> },
  { id: 'testimonials', title: 'Reviews', icon: <Quote className="h-4 w-4" /> },
  { id: 'faqs', title: 'FAQs', icon: <HelpCircle className="h-4 w-4" /> }
];

export default function BachelorParty() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://ppc-quote-builder.lovable.app') {
        return;
      }
      
      if (event.data && event.data.type === 'quote-submitted') {
        navigate('/chat');
        toast({
          title: "Quote Submitted!",
          description: "Redirecting you to view your quote details...",
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate, toast]);

  const handleGetQuote = (packageId?: string) => {
    const params = new URLSearchParams({ cruiseType: 'bachelor' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        title="Austin Bachelor Party Boat | Lake Travis"
        description="Book the ultimate Austin bachelor party cruise on Lake Travis. Groom cruises FREE! Professional DJ, photographer, giant floats included. Austin party boat starting at $85/person."
        keywords="Austin bachelor party, Lake Travis bachelor party, party boat Austin, austin party cruise, bachelor party boat Austin, ATX Disco Cruise bachelor, Austin bachelor ideas, Lake Travis party boat, party cruises"
        canonicalUrl="/bachelor-party"
      />
      
      {/* Comprehensive Schema Markup for SEO */}
      <SchemaMarkup 
        schemas={[
          generateLocalBusinessSchema({
            name: "Premier Party Cruises - Bachelor Parties",
            description: "Austin's premier bachelor party boat service on Lake Travis. Groom cruises FREE, professional DJ, photographer, and all-inclusive packages.",
            url: "https://premierpartycruises.com/bachelor-party",
            priceRange: "$85-$125",
            aggregateRating: {
              ratingValue: "4.9",
              reviewCount: "280"
            }
          }),
          generateServiceSchema({
            name: "Austin Bachelor Party Boat Service",
            description: "All-inclusive bachelor party packages on Lake Travis with professional entertainment, photography, and party supplies.",
            serviceType: "Bachelor Party Cruise",
            areaServed: "Austin",
            hasOfferCatalog: [
              { name: "Basic Bach Package", description: "BYOB party cruise with DJ and photographer", price: 85 },
              { name: "Disco King Package", description: "Groom cruises FREE, private cooler, reserved spot", price: 95 },
              { name: "Super Sparkle Package", description: "All-inclusive luxury with premium extras", price: 105 }
            ],
            aggregateRating: {
              ratingValue: "4.9",
              reviewCount: "280"
            }
          }),
          generateFAQSchema([
            { 
              question: "What is the best bachelor party boat in Austin?", 
              answer: "Premier Party Cruises offers Austin's #1 rated bachelor party boat experience on Lake Travis. With the ATX Disco Cruise, grooms cruise FREE with the Disco King package, and every cruise includes professional DJ, photographer, giant floats, and 4 hours of legendary celebration." 
            },
            { 
              question: "How much does a bachelor party cruise cost in Austin?", 
              answer: "Austin bachelor party cruises start at $85 per person for the Basic Bach Package. The most popular Disco King Package is $95 (groom cruises FREE), and the all-inclusive Super Sparkle Package is $105 per person." 
            },
            { 
              question: "What's included in an Austin bachelor party boat cruise?", 
              answer: "Every bachelor party cruise includes: 4-hour Lake Travis cruise, professional DJ entertainment, professional photographer with digital photos, access to giant floats, BYOB with coolers and ice, and the unique multi-group party atmosphere where you celebrate with other bachelor parties." 
            },
            { 
              question: "Does the groom cruise free on bachelor party boats?", 
              answer: "Yes! The groom cruises FREE with the Disco King and Super Sparkle packages on the ATX Disco Cruise. This popular perk makes these packages the best value for bachelor groups." 
            },
            { 
              question: "How many people can fit on a bachelor party boat?", 
              answer: "ATX Disco Cruise hosts 40-80 guests total with multiple bachelor groups. For private bachelor party charters, boats range from 14-person to 75-person capacity depending on your crew size." 
            }
          ]),
          generateAggregateRatingSchema({
            itemReviewed: {
              type: "Service",
              name: "Premier Party Cruises - Austin Bachelor Party Boat"
            },
            ratingValue: "4.9",
            reviewCount: "130"
          })
        ]}
      />
      
      <PublicNavigation />
      <Breadcrumb />
      
      {/* Table of Contents - Sticky Sidebar */}
      <TableOfContents sections={tocSections} />
      
      {/* Sticky CTA */}
      <StickyCTA
        primaryText="Get Free Quote"
        primaryAction={() => handleGetQuote()}
        secondaryText="Call Now"
        secondaryHref="tel:+15124885892"
        showOnDesktop={false}
      />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster={heroImage1}
          >
            <source src="/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-white text-center flex-grow flex items-center w-full py-12 md:py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-5xl mx-auto w-full"
          >
            <motion.div
              variants={fadeInUp}
              className="mb-6"
            >
              <Badge className="font-sans tracking-wider font-bold uppercase text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 border-0">
                Premier Lake Travis Experience
              </Badge>
            </motion.div>
            
            {/* CRITICAL: H1 with text-6xl and font-playfair - Largest text on page */}
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-4 md:mb-6 text-center leading-tight px-2"
              data-editable 
              data-editable-id="bachelor-hero-title"
            >
              Austin Bachelor Party Cruises on Lake Travis
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl text-brand-yellow font-semibold mb-4 md:mb-6 px-2"
            >
              Lake Travis Ultimate Cruise Experience
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-100 leading-relaxed px-2"
              data-editable 
              data-editable-id="bachelor-hero-subtitle"
            >
              Exclusively for <InternalLinkHighlight href="/bachelorette-party" title="Bachelorette Parties">Bachelorette</InternalLinkHighlight> & Bachelor Parties<br/>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl">The Highlight of Your Weekend Every. Damn. Time.</span>
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg px-10 py-7"
                data-testid="button-hero-see-packages"
              >
                See Packages & Pricing
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-10 py-7 whitespace-normal min-h-[4rem]"
                data-testid="button-hero-book-now-bachelor"
              >
                <Calendar className="mr-2 h-6 w-6 flex-shrink-0" />
                <span className="text-center leading-tight">BOOK NOW - Be the Hero!</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/95 backdrop-blur-sm py-6 px-6 border-t-4 border-blue-500">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-lg md:text-xl font-bold">
              Just <span className="text-blue-600">SHOW UP & GET DOWN</span> - Everything Included!
            </p>
          </div>
        </div>
      </section>

      {/* Subtle Tagline Section - Below Hero */}
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
            <div className="flex items-center gap-2 text-gray-700">
              <Trophy className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">GROOM CRUISES FREE with Disco King & Super Sparkle Package ONLY</span>
            </div>
            <span className="hidden sm:inline text-gray-300">|</span>
            <div className="flex items-center gap-2 text-gray-700">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium">Popular weekends book 8-10 weeks before the date</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Builder Section */}
      <QuoteBuilderSection />

      {/* YOUR TWO OPTIONS SECTION */}
      <SectionReveal>
        <section id="your-options" className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Target className="h-4 w-4 mr-2 inline" />
                Two Legendary Options for Your Send-Off
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Choose Your Perfect Bachelor Party Style
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Two completely different experiences - both legendary!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* ATX Disco Cruise Option */}
              <Card className="border-3 border-blue-400 hover:shadow-2xl transition-all">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <div className="flex items-center justify-center mb-4">
                    <Disc3 className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">OPTION 1: ATX Disco Cruise</CardTitle>
                  <CardDescription className="text-white text-center mt-2">
                    Multi-Group Party Experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Party with other bachelor crews from across America</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>All-inclusive: DJ, photographer, floats included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>From $85 per person (groom FREE on premium packages)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Zero planning stress - everything handled</span>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-center font-bold">Group of 10 = $850-$1,050 total</p>
                    <p className="text-center text-sm text-gray-600">Everything included!</p>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold"
                    onClick={() => navigate('/atx-disco-cruise')}
                  >
                    Learn More About ATX Disco
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Private Cruise Option */}
              <Card className="border-3 border-purple-400 hover:shadow-2xl transition-all">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <div className="flex items-center justify-center mb-4">
                    <Ship className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">OPTION 2: Private Cruises</CardTitle>
                  <CardDescription className="text-white text-center mt-2">
                    Exclusive Boat for Your Crew
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Entire boat exclusively for your crew</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Custom timing, route, and itinerary</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>$350-$1,050 per hour (based on boat size)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Add DJ/photographer for $600 each</span>
                    </li>
                  </ul>
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <p className="text-center font-bold">Group of 10-14 = $1,500-$2,000+</p>
                    <p className="text-center text-sm text-gray-600">Boat + optional add-ons</p>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold"
                    onClick={() => navigate('/private-cruises')}
                  >
                    Learn More About Private
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 3. PACKAGES & PRICING */}
      <SectionReveal>
        <section id="packages" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Package className="h-4 w-4 mr-2 inline" />
                ATX Disco Cruise Packages
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-yellow-400 leading-tight">
                Choose Your Bachelor Party Package
              </h2>
              <p className="text-xl text-blue-600 max-w-3xl mx-auto leading-relaxed font-medium">
                All-inclusive packages from $85/person - cheaper than Vegas, more legendary
              </p>
            </div>

            <Tabs defaultValue="atx_disco" className="max-w-7xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <TabsTrigger value="atx_disco" className="font-bold data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:bg-white/20 data-[state=inactive]:text-white hover:bg-white/30 rounded-lg transition-all">ATX Disco Cruise</TabsTrigger>
                <TabsTrigger value="private" className="font-bold data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:bg-white/20 data-[state=inactive]:text-white hover:bg-white/30 rounded-lg transition-all">Private Cruises</TabsTrigger>
              </TabsList>

              <TabsContent value="atx_disco" className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {atxDiscoPackages.map((pkg) => (
                    <Card 
                      key={pkg.id}
                      className={cn(
                        "relative hover:shadow-2xl transition-all transform hover:scale-105",
                        pkg.popular ? "border-4 border-blue-500 shadow-xl" : "border-2 border-gray-200"
                      )}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-2 text-lg">
                            MOST POPULAR
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <pkg.icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-2">{pkg.subtitle}</p>
                        <div className="mt-6">
                          <div className="text-5xl font-bold text-blue-600">${pkg.price}</div>
                          <p className="text-gray-600 mt-1">per person</p>
                          <p className="text-sm text-gray-500 mt-2">${pkg.priceWithTaxTip} with tax & tip</p>
                          {pkg.groomSpecial && (
                            <Badge className="mt-3 bg-green-100 text-green-800 font-bold">
                              🎉 GROOM CRUISES FREE!
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-8">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          onClick={() => handleGetQuote(pkg.id)}
                          className={cn(
                            "w-full font-bold",
                            pkg.popular 
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                          )}
                        >
                          Book This Package
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="private" className="space-y-8">
                <div className="max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {privateCruiseOptions.map((boat) => (
                      <Card key={boat.id} className="border-2 border-gray-200 hover:border-blue-300 transition-all">
                        <CardHeader>
                          <Ship className="h-10 w-10 mb-4 text-blue-600" />
                          <CardTitle>{boat.name}</CardTitle>
                          <p className="text-sm text-gray-600 mt-2">{boat.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-6">
                            <div className="text-3xl font-bold text-blue-600">
                              ${boat.weekdayRate}-${boat.weekendRate}/hr
                            </div>
                            <p className="text-sm text-gray-500">Weekday-Weekend rates</p>
                            <p className="text-sm text-gray-500 mt-1">4 hour minimum</p>
                          </div>
                          <ul className="space-y-2 text-sm">
                            {boat.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Add-ons Section */}
                  <Card className="border-2 border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="text-2xl">Optional Add-Ons for Private Cruises</CardTitle>
                      <CardDescription>Customize your private experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {privateCruiseAddOns.map((addon, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 border border-purple-200">
                            <div className="font-bold text-lg">{addon.name}</div>
                            <div className="text-2xl font-bold text-purple-600 mt-1">
                              ${typeof addon.price === 'number' ? addon.price : addon.price}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{addon.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Button
                          onClick={() => {
                            const params = new URLSearchParams({ cruiseType: 'private' });
                            navigate(`/chat?${params.toString()}`);
                          }}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold"
                        >
                          Get Private Cruise Quote
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Comparison Calculator */}
            <div className="mt-16 max-w-5xl mx-auto">
              <DiscoVsPrivateValueCalculator variant="bachelor" />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 4. WHAT TO EXPECT */}
      <SectionReveal>
        <section id="what-to-expect" className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Star className="h-4 w-4 mr-2 inline" />
                What to Expect
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Your Bachelor Party Day Experience
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Different experiences for ATX Disco Cruise vs Private Cruises
              </p>
            </div>

            <Tabs defaultValue="atx_disco_expect" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
                <TabsTrigger value="atx_disco_expect" className="font-bold">ATX Disco Day</TabsTrigger>
                <TabsTrigger value="private_expect" className="font-bold">Private Cruise Day</TabsTrigger>
              </TabsList>

              <TabsContent value="atx_disco_expect" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold mb-8 text-center">Day of Disco - What Actually Happens</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Arrive at the Marina (15 min early)</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Park and walk to the boat. Your crew meets other bachelor groups - instant party energy. Captain checks everyone in.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Board & Set Up (First 30 min)</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Load your coolers, claim your spot, meet the DJ. Premium packages get VIP areas. Groom gets special treatment.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Cruise to Party Cove (Hour 1)</h4>
                        <p className="text-gray-700 leading-relaxed">
                          DJ starts spinning, drinks flowing, energy building. Photographer captures the crew. Meet bachelor groups from other cities.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        4
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Peak Party Time (Hours 2-3)</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Anchored at the best spots. Giant floats out, everyone swimming, DJ going hard. This is when legendary moments happen.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        5
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Cruise Back (Hour 4)</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Victory lap back to marina. Exchange contacts with new friends. Plan the night ahead. Photos already being edited.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-blue-50 rounded-lg">
                    <p className="text-center font-bold text-lg">Result: Epic send-off with zero stress</p>
                    <p className="text-center text-gray-600 mt-2">Digital photos delivered within 48 hours</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="private_expect" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold mb-8 text-center">Private Cruise - Your Boat, Your Rules</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Arrive at Your Scheduled Time</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Your boat is ready and waiting. Load your supplies, coolers, and any decorations you brought. Captain reviews safety.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Cruise Your Custom Route</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Tell the captain where you want to go. Popular spots or hidden coves - your choice. Control your own music.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Anchor & Swim Anywhere</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Stop wherever looks good. No schedule to follow. Stay as long as you want at each spot.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        4
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Your Crew Only</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Complete privacy for your group. No strangers, no sharing space. Perfect for specific activities or surprises.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        5
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Flexible Return</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Return when your time is up or extend if you're having too much fun (based on availability).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-purple-50 rounded-lg">
                    <p className="text-center font-bold text-lg">Result: Exclusive experience customized your way</p>
                    <p className="text-center text-gray-600 mt-2">Note: No DJ/photographer unless you add them ($600 each)</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </SectionReveal>

      {/* NEW SEO SECTION 1: Austin Party Cruises for Bachelor Parties */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair text-center mb-8 text-gray-900 leading-tight">
                Austin Party Cruises: The Ultimate Bachelor Send-Off Guide
              </h2>
              
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Planning the perfect bachelor party requires finding activities that create legendary memories, and <strong>austin party cruises</strong> on Lake Travis deliver exactly that. As Austin's premier <strong>party boat</strong> experience for bachelor parties, we've perfected the art of sending off grooms in style since 2009.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Why Lake Travis Party Boats Are Perfect for Bachelor Parties</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  An <strong>austin party cruise</strong> for your bachelor celebration offers advantages that traditional bachelor party venues simply can't match. Lake Travis provides a stunning natural backdrop with 65 miles of pristine shoreline, crystal-clear water perfect for swimming, and exclusive coves where you can anchor and celebrate without interruptions. Our <strong>party cruises</strong> combine the best of outdoor adventure with professional entertainment.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">What Makes Our Austin Party Boat Special for Bachelor Groups:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Groom Cruises FREE</strong> - Save money with our Disco King and Super Sparkle packages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Professional DJ</strong> - Keep the party energy high with a live DJ who knows how to work bachelor crowds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Pro Photography</strong> - Capture epic moments without worrying about losing phones overboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Multi-Group Energy</strong> - Party with bachelor groups from across America for an electric atmosphere</span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Party Boat Austin: Choosing the Right Experience</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  When selecting your <strong>party boat austin</strong> experience, consider your group size and budget. For crews under 15 people, our ATX Disco Cruise typically offers the best value - you'll get professional entertainment, photography, and floats included for less than the cost of renting a private boat. For larger groups of 15+ or those wanting complete privacy, our <strong>lake travis party boat</strong> rentals provide exclusive access and customizable itineraries.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-2 border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        ATX Disco Cruise (Best for 8-14 guys)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700 mb-3">Social experience with other bachelor parties. All-inclusive entertainment, groom cruises FREE with premium packages, and legendary multi-group energy.</p>
                      <p className="font-bold text-blue-600">From $85/person</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-purple-200">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Ship className="h-5 w-5 text-purple-600" />
                        Private Charter (Best for 15+)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700 mb-3">Exclusive boat just for your crew. Custom timing, your own music, complete privacy. Perfect for surprises or specific bachelor traditions.</p>
                      <p className="font-bold text-purple-600">From $350/hour</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* NEW SEO SECTION 2: Lake Travis Party Boat Planning Guide */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair text-center mb-8 text-gray-900 leading-tight">
                Planning Your Lake Travis Party Boat Bachelor Party
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Organizing epic <strong>party cruises</strong> for your best friend's bachelor party doesn't have to be stressful. We've helped thousands of best men and groomsmen plan unforgettable celebrations on our <strong>lake travis party boat</strong> experiences. Here's your complete guide to making it happen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Best Time for Austin Party Boat Bachelor Celebrations</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Peak <strong>austin party</strong> season on Lake Travis runs from March through October, with April-September offering the warmest water temperatures perfect for swimming. Saturday afternoons are our most popular time slots for bachelor parties, typically booking 8-10 weeks in advance during peak season. If you're planning a destination bachelor party to Austin, we recommend booking as soon as you confirm your travel dates.
                </p>

                <div className="bg-white border-2 border-blue-200 p-6 my-8 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Pro Tips for Your Party Boat Austin Bachelor Party:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Beer className="h-5 w-5 text-blue-600" />
                        Drinks & Coolers
                      </h5>
                      <ul className="text-sm text-gray-700 space-y-1 ml-7">
                        <li>• BYOB - bring your favorite beverages</li>
                        <li>• We provide coolers and ice</li>
                        <li>• Order alcohol delivery to marina</li>
                        <li>• Stay hydrated with water too</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-purple-600" />
                        Bachelor Traditions
                      </h5>
                      <ul className="text-sm text-gray-700 space-y-1 ml-7">
                        <li>• Bring bachelor decorations</li>
                        <li>• Plan signature drinks</li>
                        <li>• Coordinate matching gear</li>
                        <li>• Trust our photographer for epic shots</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">What to Expect on Your Austin Party Cruise</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Your <strong>party boat austin</strong> experience begins when you arrive at the marina. After checking in and loading your coolers, you'll board our professionally maintained boat and claim your group's reserved area. As we cruise out to Lake Travis's most scenic locations, the DJ gets the party started while our photographer begins capturing the celebration.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Once anchored at our exclusive swimming cove, you'll have access to giant floats, open water for swimming, and plenty of deck space for celebrating. The multi-group atmosphere on <strong>austin party cruises</strong> creates an energy that single-group boats simply can't replicate - you'll meet bachelor parties from across the country, all celebrating the same milestone. Many best men tell us the social aspect and shared energy between groups made the experience even better than they imagined.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg my-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Making the Most of Your Lake Travis Party Boat:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Arrive Early</strong> - Get to the marina 15 minutes before departure to claim the best spots</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Request Songs</strong> - Our DJ takes requests - plan your groom's entrance song</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Coordinate with Other Groups</strong> - The best bachelor parties embrace the multi-group energy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span><strong>Plan Your Photos</strong> - Think of group shots you want and let our photographer know</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* REMAINING SECTIONS - Keep all the existing sections from here */}
      {/* 5. AVAILABILITY */}
      <SectionReveal>
        <section id="availability" className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Calendar className="h-4 w-4 mr-2 inline" />
                Check Availability
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                When Bachelor Parties Cruise
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Prime bachelor season runs March through October
              </p>
            </div>

            {/* Schedule Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <Sun className="h-10 w-10 mb-4 mx-auto text-yellow-500" />
                  <CardTitle className="text-xl font-bold">Peak Season</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-blue-600 mb-3">March - October</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Saturdays book 8-10 weeks before the date. Lock in your date ASAP.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <Clock className="h-10 w-10 mb-4 mx-auto text-green-600" />
                  <CardTitle className="text-xl font-bold">Morning Cruises</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-green-600 mb-3">11am - 3pm</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Perfect for all-day bachelor celebrations
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <PartyPopper className="h-10 w-10 mb-4 mx-auto text-purple-600" />
                  <CardTitle className="text-xl font-bold">Afternoon Cruises</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-purple-600 mb-3">2pm - 6pm</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Peak party time on Lake Travis
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Booking Timeline */}
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-10 border border-gray-200">
              <h3 className="text-2xl font-semibold font-playfair text-center mb-8 text-gray-900">
                How to Book Your Bachelor Party
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Choose Your Date</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Check availability on our calendar. Peak weekends (April-September) book 8-12 weeks for priority time slots - once they book they\'re gone!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Select Your Package</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Choose between ATX Disco Cruise (Basic, Disco King, or Super Sparkle) or Private Charter. Each has unique benefits for your crew.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Pay Deposit & Confirm</h4>
                    <p className="text-gray-700 leading-relaxed">
                      If booking 14+ days before cruise: 25% deposit, balance due 14 days before cruise. If less than 14 days: 50% deposit, balance due within 48 hours of booking (or 3 days after booking). Full refund within 48 hours of booking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Show Up & Party!</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Arrive 15 minutes before departure. Your captain handles everything else - just bring the boys and your beverages!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Button
                  size="lg"
                  onClick={() => handleGetQuote()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-6"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Check Availability & Book Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Continue with all remaining sections - keep them as they are */}
      {/* 6. BENEFITS */}
      <SectionReveal>
        <section id="benefits" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Trophy className="h-4 w-4 mr-2 inline" />
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Why Bachelor Parties Choose Premier
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                15+ years of bachelor party expertise on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">15+ Years Experience</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    Austin's longest-running party cruise company since 2009. We wrote the book on bachelor parties on Lake Travis.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">150,000+ Parties</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    Bachelor parties from across the country choose Premier Party Cruises for legendary celebrations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Music className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Pro DJ & Photography</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    Professional DJ and photographer on every Disco Cruise. Epic beats and memories captured all day.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-100 hover:border-yellow-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Perfect Safety Record</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    Licensed, fun, experienced captains to take your group safely around the lake in style with pristine safety record. Your crew's safety is our top priority.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-100 hover:border-red-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Best Value on Lake Travis</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    ATX Disco Cruise from $85/person is always cheaper than booking a private boat for smaller groups.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Wine className="h-8 w-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Alcohol Delivery</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    Partner with Party On Delivery - order alcohol online, delivered 50 feet from your boat. Zero hassle!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 7. FEATURES & WHAT'S INCLUDED */}
      <SectionReveal>
        <section id="whats-included" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <CheckCircle className="h-4 w-4 mr-2 inline" />
                What's Included
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Everything You Need for an Epic Day
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                From professional entertainment to giant floats - we've got you covered
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
              {whatsIncluded.map((item, index) => (
                <Card key={index} className="border border-gray-200 hover:border-blue-300 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-brand-yellow/20 rounded-full">
                        <item.icon className="h-6 w-6 text-brand-yellow" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What to Bring */}
            <div className="max-w-5xl mx-auto">
              <WhatToBring
                variant="bachelor"
                title="What to Bring on Your Bachelor Party Cruise"
                description="Pack these essentials for the perfect day on Lake Travis"
                className="max-w-7xl mx-auto"
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 8. WHY CHOOSE PREMIER - Trust Signals */}
      <SectionReveal>
        <section id="why-choose" className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-white/10 border-2 border-white text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm">
                <Crown className="h-4 w-4 mr-2 inline" />
                The Premier Difference
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-white leading-tight">
                Austin's Most Trusted Bachelor Party Company
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Since 2009, we've been the go-to choice for bachelor parties on Lake Travis
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-1 md:mb-2">15+</div>
                <div className="text-sm sm:text-base md:text-xl text-white">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-1 md:mb-2">4 Hrs</div>
                <div className="text-sm sm:text-base md:text-xl text-white">Per Cruise</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-1 md:mb-2">$85+</div>
                <div className="text-sm sm:text-base md:text-xl text-white">Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-1 md:mb-2">5★</div>
                <div className="text-sm sm:text-base md:text-xl text-white">Average Rating</div>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-12 py-7"
              >
                <Calendar className="mr-2 h-6 w-6" />
                Lock In Your Legendary Send-Off
              </Button>
              <p className="text-white/90 text-sm mt-4">
                Professional crew keeps things smooth • BYOB - bring whatever you want
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 9. PHOTO GALLERY */}
      <SectionReveal>
        <section id="photos" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Camera className="h-4 w-4 mr-2 inline" />
                Photo Gallery
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                See the Bachelor Party Experience
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Real photos from real bachelor parties on Lake Travis
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <LazyImage
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 10. TESTIMONIALS */}
      <SectionReveal>
        <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Quote className="h-4 w-4 mr-2 inline" />
                Real Reviews
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                What Grooms Are Saying
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Don't just take our word for it - hear from the crews who partied with us
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {groomTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{testimonial.date}</span>
                      <span>{testimonial.partySize}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 11. FAQs */}
      <SectionReveal>
        <section id="faqs" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <HelpCircle className="h-4 w-4 mr-2 inline" />
                Frequently Asked Questions
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Bachelor Party FAQs
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Everything you need to know before booking
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-2 border-gray-200 rounded-lg px-6 data-[state=open]:border-blue-400">
                  <AccordionTrigger className="hover:text-blue-600 text-left font-bold text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pt-4 text-base">
                    {item.answerJsx || item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </SectionReveal>

      {/* FINAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready for Your Legendary Bachelor Party?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join 150,000+ happy customers who chose Premier Party Cruises for their Lake Travis send-off
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => handleGetQuote()}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-xl px-12 py-7"
            >
              <Calendar className="mr-2 h-6 w-6" />
              Book ATX Disco Cruise
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/private-cruises')}
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-xl px-12 py-7"
            >
              <Ship className="mr-2 h-6 w-6" />
              Book Private Cruise
            </Button>
          </div>
          
          <p className="text-white/90 text-base mt-8">
            Questions? Call <a href="tel:+15124885892" className="underline font-bold">512-488-5892</a> or <a href="/contact" className="underline font-bold">contact us online</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
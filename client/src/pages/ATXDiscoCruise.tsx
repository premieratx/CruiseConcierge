import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { 
  DISCO_TIME_SLOTS, 
  DISCO_BASE_INCLUSIONS, 
  DISCO_ADD_ONS, 
  DISCO_PARTY_TYPES,
  getDiscoNecklaceText,
  getPartyAddOns,
  type DiscoPartyType 
} from '@shared/constants';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { DiscoCruisePricing } from '@/components/DiscoCruisePricing';
import DiscoVsPrivateComparison from '@/components/DiscoVsPrivateComparison';
import DiscoVsPrivateValueCalculator from '@/components/DiscoVsPrivateValueCalculator';
import { SectionReveal } from '@/components/SectionReveal';
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, Zap, Target, MessageSquare, Ticket, 
  Gift, Disc3, Volume2, Mic, Utensils, GlassWater, UserCheck, 
  Leaf, Check, AlertCircle, DollarSign, Timer, CreditCard, 
  CloudRain, HelpCircle, Anchor, Droplets, Waves, Info, 
  TrendingUp, Package, Plane, Wine, PartyPopper as ConfettiIcon,
  X, Eye, Smile, XCircle, Navigation
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
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
import { LazyImage } from '@/components/LazyImage';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
// NOTE: Schema imports removed - all structured data is now handled by SSR via schemaLoader.ts
// to avoid duplicate/conflicting schemas and Google Search Console errors
import { YouTubeVideoBackground } from '@/components/YouTubeVideoBackground';
import AnimatedPhotoGallery from '@/components/AnimatedPhotoGallery';
import { PARTY_PHOTOS, OTHER_ASSETS } from '@/lib/media';

const heroImage1 = PARTY_PHOTOS.atxDiscoCruiseParty;
const heroImage2 = PARTY_PHOTOS.discoPhotoCollage1;
const heroImage3 = PARTY_PHOTOS.bachelorPartyGroup;
const galleryImage1 = PARTY_PHOTOS.discoUnicornCollage;
const galleryImage2 = PARTY_PHOTOS.familyPartyCollage;
const galleryImage3 = PARTY_PHOTOS.nonBachCollage;
const floatImage = OTHER_ASSETS.giantUnicornFloat;

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

const whatsIncluded = [
  {
    icon: Music,
    title: 'Professional DJ',
    description: 'Playing your favorites ALL DAY - party starts when you arrive!'
  },
  {
    icon: Camera,
    title: 'Professional Photographer',
    description: 'Capture every epic moment with high-quality photos sent after'
  },
  {
    icon: Anchor,
    title: 'Shared Coolers',
    description: 'BYOB - bring your drinks, shared coolers available (no private ice)'
  },
  {
    icon: Waves,
    title: 'Giant Unicorn Float',
    description: 'Massive floats to lounge in style on the water'
  },
  {
    icon: Gift,
    title: 'Party Supplies',
    description: 'Cups, koozies, bubbles, and more - all included!'
  },
  {
    icon: Droplets,
    title: 'Ice Water Stations',
    description: 'Stay hydrated with unlimited ice water'
  },
  {
    icon: Shield,
    title: 'Clean Restroom',
    description: 'Full restroom facilities on board'
  },
  {
    icon: Sun,
    title: 'Plenty of Shade',
    description: 'Covered areas to escape the Texas sun'
  },
  {
    icon: Users,
    title: 'Multi-Group Energy',
    description: 'Meet bachelor & bachelorette parties from across the country!'
  }
];

const experienceTimeline = [
  {
    time: 'Step 1: Wake Up the Morning Of',
    title: 'Nothing to Do!',
    description: 'No planning needed whatsoever! Just rally the troops and get to the lake. Everything is completely handled for you - this is the beauty of ATX Disco Cruise!',
    icon: Sun,
    color: 'from-purple-500 to-pink-500'
  },
  {
    time: 'Step 2: Check-In & Board',
    title: 'Party Starts When You Arrive!',
    description: 'Crew setting up your private cooler, DJ warming up and ready, photographer capturing arrival moments. Ice water, cups, koozies, bubbles, name tags all set up. Giant unicorn being inflated!',
    icon: Ship,
    color: 'from-pink-500 to-orange-500'
  },
  {
    time: 'Step 3: Find Your Party Cooler',
    title: 'Get Settled & Start Celebrating',
    description: 'DJ is spinning, photographer taking group pictures. Crew helps find your cooler with your name on it. Get settled, grab a drink, make yourself at home!',
    icon: Music,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    time: 'Step 4: Quick Safety Briefing and Departure - 45-min Tour of Lake Travis',
    title: '"Let\'s Cruise"',
    description: 'Cruise 30-45 minutes to the swim spot while captain gives swimming safety briefing. Simple rules for maximum fun and safety on the water.',
    icon: Shield,
    color: 'from-yellow-500 to-blue-500'
  },
  {
    time: 'Step 5: Swim. Dance. Drink. Be Merry!',
    title: 'Next 2 Hours Are Yours!',
    description: 'Swim, float, dance, mingle with other parties from across the country! DJ takes requests (bribes work). Photographer capturing every epic moment of your celebration.',
    icon: PartyPopper,
    color: 'from-blue-500 to-purple-500'
  },
  {
    time: 'Step 6: Dance Yourself Clean',
    title: 'Epic Sing-Along Finale',
    description: 'Head back to reality with the ultimate sing-along dance party! Dancing Queen, Mr. Brightside, and all the hits. Call your Uber 10 minutes before docking for a seamless exit.',
    icon: Trophy,
    color: 'from-purple-500 to-green-500'
  }
];

// Import real reviews from shared/reviews-data.ts
import { discoHighlightReviews, combinedBachReviews, bachelorReviews, bacheloretteReviews, type Review } from '@shared/reviews-data';

// Use combined bach + highlights from both bachelor and bachelorette for ATX Disco Cruise page
const testimonials: Review[] = [...combinedBachReviews, ...discoHighlightReviews];

const faqItems = [
  {
    id: 'what-is-atx-disco',
    question: 'What is the ATX Disco Cruise?',
    answer: 'A shared 4-hour party boat for bachelor/bachelorette groups with pro DJ and photographer, BYOB, floats, and multi-group energy.'
  },
  {
    id: 'when-does-it-run',
    question: 'When does it run?',
    answer: 'Fridays 12–4 PM and Saturdays 11–3 PM or 3:30–7:30 PM from March to October.'
  },
  {
    id: 'ticket-prices',
    question: 'How much are tickets?',
    answer: 'Tickets are priced by time slot: Friday 12-4pm ($95/person), Saturday 11am-3pm ($105/person - most popular), and Saturday 3:30-7:30pm ($85/person). Optional add-on packages are available based on your party type.'
  },
  {
    id: 'weather-policy',
    question: 'What happens in bad weather?',
    answer: 'Rain or shine. For severe weather, we move the party to Lemonade Disco (land venue).'
  },
  {
    id: 'alcohol-policy',
    question: 'What\'s the alcohol policy?',
    answer: 'BYOB for 21+; cans/plastic only; coolers with ice and cups provided.'
  },
  {
    id: 'photos',
    question: 'When do we get photos?',
    answer: 'Professional photos are delivered digitally within 2–3 weeks after your cruise.'
  },
  {
    id: 'parking',
    question: 'Where do we meet?',
    answer: 'Anderson Mill Marina, 13993 FM 2769, Leander, TX 78641. Arrive 15–20 minutes early; free parking available.'
  }
];

const galleryPhotos = [
  { id: 1, src: heroImage1, alt: 'ATX Disco Cruise party atmosphere on Lake Travis' },
  { id: 2, src: heroImage2, alt: 'Dancing and celebration on the disco cruise' },
  { id: 3, src: heroImage3, alt: 'Bachelor party group enjoying the cruise' },
  { id: 4, src: galleryImage1, alt: 'Party atmosphere on the boat' },
  { id: 5, src: galleryImage2, alt: 'DJ and party scene' },
  { id: 6, src: galleryImage3, alt: 'Groups celebrating on Lake Travis' },
  { id: 7, src: floatImage, alt: 'Giant unicorn float on the water' },
  { id: 8, src: heroImage1, alt: 'Sunset party cruise' }
];

// Table of Contents sections
const tocSections = [
  { id: 'hero', title: 'Overview', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'experience', title: 'What to Expect', icon: <Clock className="h-4 w-4" /> },
  { id: 'why-book', title: 'Why Book ATX Disco', icon: <Zap className="h-4 w-4" /> },
  { id: 'packages', title: 'Packages & Pricing', icon: <Package className="h-4 w-4" /> },
  { id: 'availability', title: 'Availability', icon: <Calendar className="h-4 w-4" /> },
  { id: 'benefits', title: 'Key Benefits', icon: <Trophy className="h-4 w-4" /> },
  { id: 'whats-included', title: "What's Included", icon: <CheckCircle className="h-4 w-4" /> },
  { id: 'why-choose', title: 'Why Choose Us', icon: <Crown className="h-4 w-4" /> },
  { id: 'photos', title: 'Photo Gallery', icon: <Camera className="h-4 w-4" /> },
  { id: 'testimonials', title: 'Testimonials', icon: <Quote className="h-4 w-4" /> },
  { id: 'faqs', title: 'FAQs', icon: <HelpCircle className="h-4 w-4" /> }
];

export default function ATXDiscoCruise() {
  const [, navigate] = useLocation();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedPartyType, setSelectedPartyType] = useState<DiscoPartyType>(DISCO_PARTY_TYPES.bachelorette);
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();

  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion, heroImages.length]);

  const handleBookNow = () => {
    window.open('https://events.premierpartycruises.com/widget/form/X1zEKdfbmjqs2hBHWNN1', '_blank');
  };

  const handleGetQuote = () => {
    window.open('https://events.premierpartycruises.com/widget/form/X1zEKdfbmjqs2hBHWNN1', '_blank');
  };

  return (
    <>
      <SEOHead
        pageRoute="/atx-disco-cruise"
        defaultTitle="ATX Disco Cruise | Lake Travis Bachelorette Party Boat Austin"
        defaultDescription="America's only multi-group party cruise on Lake Travis. Professional DJ, photographer, giant floats included. Austin's best party boat from $85/person."
        defaultKeywords={["ATX Disco Cruise", "austin party cruises", "lake travis party boat", "party boat austin", "austin party cruise", "Austin bachelor party", "Austin bachelorette party", "party cruises", "Lake Travis bachelor party", "Lake Travis bachelorette party", "Austin boat party"]}
        schemaType="event"
      />

      {/* NOTE: All structured data (Event, FAQ, LocalBusiness, Service) is handled by SSR via schemaLoader.ts
          SSR schemas loaded: atx-disco-cruise/event.jsonld, atx-disco-cruise/faq.jsonld
          This avoids duplicate/conflicting schemas and Google Search Console errors. */}

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* 1. HERO SECTION */}
        <motion.section 
          id="hero"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative h-[70vh] flex flex-col justify-center overflow-hidden"
          data-testid="section-hero"
        >
          <YouTubeVideoBackground videoId="4-Yx24Y6oro" posterImage={heroImages[0]} />

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 text-center flex-grow flex items-center">
            <motion.div variants={fadeInUp} className="w-full">
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 md:mb-8 text-center leading-tight drop-shadow-2xl" data-testid="text-hero-headline">
                ATX Disco Cruise: Lake Travis Bachelorette Party Boat
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-8 md:mb-10 font-bold text-center drop-shadow-lg">
                The Country's Only Multi-Group Bach Party Cruise
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-7 shadow-2xl transform hover:scale-105 transition-all"
                  data-testid="button-learn-more"
                >
                  <Phone className="mr-2 h-5 w-5" /> Talk to an Expert
                </Button>
                <a
                  href="https://booking.premierpartycruises.com/quote-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-7 shadow-2xl transform hover:scale-105 transition-all rounded-md inline-flex items-center justify-center"
                  data-testid="button-book-now"
                >
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Hero Details Section - Moved from above for better video visibility */}
        <section className="py-8 md:py-12 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-6">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                Austin Party Cruise on Lake Travis
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                The single most unique and comprehensive <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Parties">bachelor</InternalLinkHighlight>/<InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Parties">bachelorette party</InternalLinkHighlight> experience in the United States
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-4xl mx-auto border border-white/20">
                <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed">
                  <strong className="text-yellow-300">NOT a private cruise - this is a shared multi-group celebration!</strong> Join 50-100+ people from different bachelor & bachelorette parties for an unforgettable 4-hour Lake Travis party with professional DJ, photographer, and giant floats! <InternalLinkHighlightWithArrow href="/private-cruises" title="Private Cruises">Want exclusivity? Book a private charter instead</InternalLinkHighlightWithArrow>
                </p>
              </div>
              <div className="pt-4">
                <p className="text-base md:text-lg font-semibold">
                  🎉 <span className="text-yellow-300">All-Inclusive</span> • Professional DJ & Photographer • <span className="text-pink-300">Fridays & Saturdays</span> 🎉
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Tagline Section - Below Hero */}
        <section className="py-6 md:py-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
              <div className="flex items-center gap-2 text-gray-700">
                <Star className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">420+ Five-Star Reviews</span>
              </div>
              <span className="hidden sm:inline text-gray-300">|</span>
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">150,000+ Happy Customers</span>
              </div>
              <span className="hidden sm:inline text-gray-300">|</span>
              <div className="flex items-center gap-2 text-gray-700">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">Books 8-10 weeks before the date</span>
              </div>
            </div>
          </div>
        </section>

        {/* 1. PRICING - Friday/Saturday Time Slots (MOVED TO TOP) */}
        <SectionReveal>
          <section className="py-12 md:py-20 bg-white" id="packages" data-testid="section-packages">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Package className="h-4 w-4 mr-2 inline" />
                  Pricing & Time Slots
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  ATX Disco Cruise Pricing
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4">
                  Choose your time slot and add optional party packages. Looking for exclusive privacy? <InternalLinkHighlight href="/private-cruises" title="Private Cruises">Check out our private charter options</InternalLinkHighlight>
                </p>
                {/* Early Bird Pricing Indicator */}
                <Badge className="bg-orange-600 text-white px-6 py-3 text-base font-bold animate-bounce">
                  <Users className="h-4 w-4 mr-2 inline" />
                  Book Now for early bird pricing and special deals
                </Badge>
              </div>

              <DiscoCruisePricing partyType={selectedPartyType} showAddOns={false} />

              {/* Party Type Selector Tabs - Below "Included w/ EVERY ATX Disco Cruise Ticket", Above Add-On Packages */}
              <div className="max-w-2xl mx-auto mb-8 mt-12">
                <Tabs value={selectedPartyType} onValueChange={(value) => setSelectedPartyType(value as DiscoPartyType)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-auto" data-testid="tabs-party-type">
                    <TabsTrigger 
                      value={DISCO_PARTY_TYPES.bachelor} 
                      className="py-4 px-6 text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                      data-testid="tab-bachelor"
                    >
                      🎉 Bachelor
                    </TabsTrigger>
                    <TabsTrigger 
                      value={DISCO_PARTY_TYPES.bachelorette} 
                      className="py-4 px-6 text-base font-semibold data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                      data-testid="tab-bachelorette"
                    >
                      💃 Bachelorette
                    </TabsTrigger>
                    <TabsTrigger 
                      value={DISCO_PARTY_TYPES.combined} 
                      className="py-4 px-6 text-base font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                      data-testid="tab-combined"
                    >
                      💑 Combined
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Add-On Packages Section */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {selectedPartyType === 'bachelor' && 'Bachelor Add-On Packages'}
                  {selectedPartyType === 'bachelorette' && 'Bachelorette Add-On Packages'}
                  {selectedPartyType === 'combined' && 'Combined Bach Add-On Packages'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getPartyAddOns(selectedPartyType).map((addOn) => (
                    <Card key={addOn.id} className="border-2 border-purple-200 dark:border-purple-800">
                      <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{addOn.name}</CardTitle>
                          <Badge className="bg-purple-600 text-white">
                            ${(addOn.price / 100).toFixed(0)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          {addOn.inclusions.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Sparkles className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Summary section moved after packages */}
              <div className="text-center bg-white rounded-2xl p-8 max-w-4xl mx-auto border-2 border-purple-200 mt-12">
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  <strong>Every ticket includes:</strong> Professional DJ, Professional Photographer, Giant Floats, Party Supplies & More!
                </p>
                <Badge className="bg-green-600 text-white font-sans tracking-wider font-bold uppercase text-sm px-6 py-3">
                  <TrendingUp className="h-4 w-4 mr-2 inline" />
                  Best Value for Bachelor & Bachelorette Parties
                </Badge>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* Photo Gallery Section */}
        <SectionReveal>
          <section className="py-16 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Real ATX Disco Cruise Party Photos
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                See what past groups experienced on Lake Travis! Click any photo to view full gallery.
              </p>
              <AnimatedPhotoGallery />
            </div>
          </section>
        </SectionReveal>

        {/* 2. EXPERIENCE - 4-Hour Timeline */}
        <SectionReveal>
          <section id="experience" className="py-12 md:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Clock className="h-4 w-4 mr-2 inline" />
                  What to Expect
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Your Day of Disco Experience
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Simple 6-step journey from wake up to party legend! This is America's ONLY multi-group <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Parties">bachelor</InternalLinkHighlight>/<InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Parties">bachelorette party</InternalLinkHighlight> cruise. <InternalLinkHighlightWithArrow href="/private-cruises" title="Private Cruises">Want exclusivity? Book private instead</InternalLinkHighlightWithArrow>
                </p>
              </div>

              <div className="space-y-8 max-w-5xl mx-auto">
                {experienceTimeline.map((hour, idx) => (
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow rounded-xl relative" key={idx} data-testid={`card-hour-${idx + 1}`}>
                    <div className="absolute top-6 left-6 text-6xl font-black text-purple-200 opacity-30 font-sans">
                      {idx + 1}
                    </div>
                    <div className={cn("h-2 bg-gradient-to-r", hour.color)} />
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-full bg-gradient-to-br", hour.color)}>
                          <hour.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{hour.title}</CardTitle>
                          <CardDescription className="text-base font-semibold">{hour.time}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base text-gray-700 dark:text-gray-300">{hour.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <div
                  className="xola-custom xola-checkout"
                  data-button-id="691574bd162501edc00f151a"
                >
                  <Button
                    size="lg"
                    className="btn-primary-hero bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base px-12 py-6 shadow-2xl transform hover:scale-105 transition-all"
                    data-testid="button-experience-cta"
                  >
                    Claim Your Spot Before It Sells Out <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* WHY BOOK SECTION - From KB Doc */}
        <SectionReveal>
          <section id="why-book" className="py-12 md:py-20 bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Zap className="h-4 w-4 mr-2 inline" />
                  Why Book ATX Disco
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Why This is THE Bachelor/Bachelorette Experience
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  The ONLY joint party exclusively for bach parties in America - here's why it's legendary
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="border-2 border-purple-300 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Sparkles className="h-7 w-7 text-purple-600" />
                      Experience Something NEW
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      <strong>The ONLY joint party exclusively for bach parties.</strong> Not your typical boat rental - this is a curated multi-group celebration unlike anything else in the country!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-pink-300 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Heart className="h-7 w-7 text-pink-600" />
                      Priceless Memories & Amazing Vibes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      <strong>100% satisfaction track record!</strong> The energy of 50-100+ people all celebrating the same thing creates an electric atmosphere you can't recreate anywhere else.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-300 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Package className="h-7 w-7 text-green-600" />
                      All-Inclusive, Nothing to Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      <strong>Show up and party - that's it!</strong> DJ, photographer, floats, party supplies all included. We handle everything so you can focus on celebrating.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-300 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <DollarSign className="h-7 w-7 text-blue-600" />
                      Flat-Rate Per-Person Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      <strong>Makes splitting the cost super easy!</strong> No boat minimums or hidden fees. Just simple per-person pricing that everyone can understand.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-300 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Users className="h-7 w-7 text-orange-600" />
                      Party with 50-100+ People
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      <strong>All celebrating the same occasion!</strong> Meet bach parties from Dallas, Houston, California, and beyond. Exchange numbers, make friends, create legendary stories!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-indigo-300 shadow-xl hover:shadow-2xl transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Shield className="h-7 w-7 text-indigo-600" />
                      Weather Guarantee = No Lost Weekends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      <strong>Rain or shine, the party happens!</strong> If weather cancels the boat, we move to "Lemonade Disco" on land. Your celebration is guaranteed!
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-10 border-2 border-purple-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-playfair">
                  This is NOT a Private Cruise - It's BETTER!
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
                  Looking for exclusivity? <InternalLinkHighlight href="/private-cruises" title="Private Cruises">We also offer private boat charters</InternalLinkHighlight> for groups wanting their own boat. But for the ultimate party experience with unmatched energy, ATX Disco Cruise is THE choice!
                </p>
                <div
                  className="xola-custom xola-checkout"
                  data-button-id="691574bd162501edc00f151a"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-6"
                    data-testid="button-why-book-cta"
                  >
                    Join the Party - Book ATX Disco Now!
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 4. AVAILABILITY / BOOKING */}
        <SectionReveal>
          <section id="availability" className="py-12 md:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Calendar className="h-4 w-4 mr-2 inline" />
                  Availability & Booking
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Book Your Spot on the Disco Cruise
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Peak weekends book 8-12 weeks for priority time slots - once they book they\'re gone!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Cruise Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      ATX Disco Cruises run <strong>Fridays 12–4 PM</strong> and <strong>Saturdays</strong> from 11:00 AM - 3:00 PM or 3:30 PM - 7:30 PM during season (March-October).
                    </p>
                    <Badge className="bg-purple-600 text-white">
                      4-Hour Party Experience
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-2 border-pink-100 hover:border-pink-300 transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <Clock className="h-8 w-8 text-pink-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Best Time to Book</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong>Book 8-10 weeks before the date</strong> for peak weekends. Last-minute spots sometimes available during off-season.
                    </p>
                    <Badge className="bg-red-600 text-white">
                      Peak Season Sells Out
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Easy Booking Process</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Simple online booking with <strong>instant confirmation</strong>. Split payments available for your convenience.
                    </p>
                    <Badge className="bg-green-600 text-white">
                      Book in Minutes
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-10 max-w-4xl mx-auto border-2 border-purple-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-playfair">Ready to Join the Best Bach Party?</h3>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Check availability and get instant pricing for your Lake Travis celebration
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div
                    className="xola-custom xola-checkout"
                    data-button-id="691574bd162501edc00f151a"
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-10 py-6"
                    >
                      <Calendar className="mr-2 h-6 w-6" />
                      Check Availability Now
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.open('tel:+15124885892')}
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold text-lg px-10 py-6"
                  >
                    <Phone className="mr-2 h-6 w-6" />
                    Call (512) 488-5892
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* NEW SEO SECTION 1: Austin Party Cruises - ATX Disco Guide */}
        <SectionReveal>
          <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair text-center mb-8 text-gray-900 leading-tight">
                  Austin Party Cruises: The Ultimate Multi-Group Celebration
                </h2>
                
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    The ATX Disco Cruise represents a revolutionary approach to <strong>austin party cruises</strong> on Lake Travis. Unlike traditional private charters, our multi-group format creates an electric atmosphere where bachelor and bachelorette parties from across America celebrate together, creating an energy and social experience that you simply cannot find on a standard <strong>party boat austin</strong> rental.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Why Multi-Group Party Cruises Are Better</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Our <strong>lake travis party boat</strong> experience brings together 50-100 people celebrating bachelor and bachelorette parties, creating a unique social atmosphere that private cruises simply cannot match. Imagine your group of 10-15 friends joining forces with 3-5 other bachelor/bachelorette parties - the energy is contagious, the celebrations are amplified, and friendships are formed that last well beyond the cruise. This innovative approach to <strong>party cruises</strong> has made ATX Disco the most talked-about bachelor/bachelorette experience in Austin.
                  </p>
                  
                  <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">What Makes ATX Disco Austin Party Cruise Special:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span><strong>Multi-Group Energy</strong> - Meet bachelor/bachelorette parties from across the country</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span><strong>All-Inclusive Pricing</strong> - DJ, photographer, and floats included (no hidden fees)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span><strong>Better Value</strong> - Get professional entertainment for less than private boat rental</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span><strong>Zero Planning Stress</strong> - Everything organized, just show up and party</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Perfect for Smaller Bachelor & Bachelorette Groups</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    If you're planning a bachelor or bachelorette party with 8-15 people, ATX Disco Cruise is your best option. Private <strong>austin party cruise</strong> rentals typically cost $1,500-3,000+ for the boat alone, then you need to add DJ ($600), photographer ($600), and equipment - easily exceeding $3,000-4,000 total. With ATX Disco, your entire group gets the same professional entertainment, photography, and premium experience for $850-1,575 total depending on your package. It's the same quality for a fraction of the cost.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <Card className="border-2 border-purple-200">
                      <CardHeader className="bg-purple-50">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                          Cost Comparison
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <p className="font-bold text-sm mb-1">Private Charter (10 people)</p>
                            <p className="text-sm text-gray-700">Boat: $2,000 + DJ: $600 + Photo: $600 = <strong>$3,200 total</strong></p>
                          </div>
                          <div className="border-t pt-3">
                            <p className="font-bold text-sm mb-1">ATX Disco (10 people)</p>
                            <p className="text-sm text-gray-700">10 x $95 = <strong>$950 total</strong> (all included!)</p>
                          </div>
                          <p className="text-xs text-purple-600 font-bold pt-2">Save $2,250 with ATX Disco!</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 border-pink-200">
                      <CardHeader className="bg-pink-50">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="h-5 w-5 text-pink-600" />
                          Social Experience
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-gray-700">Meet 3-5 other bachelor/bachelorette parties. Share the celebration, make new friends, and experience energy that only a multi-group party boat can provide.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* NEW SEO SECTION 2: Lake Travis Party Boat Experience */}
        <SectionReveal>
          <section className="py-12 md:py-20 bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair text-center mb-8 text-gray-900 leading-tight">
                  Your Lake Travis Party Boat Adventure Awaits
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Planning an epic bachelor or bachelorette party in Austin? The ATX Disco Cruise offers the most comprehensive <strong>party cruises</strong> experience on Lake Travis. From the moment you board until you return to the marina, every detail is designed to create an unforgettable celebration that becomes the highlight of your entire weekend.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">What to Expect on Your Party Boat Austin Experience</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Your <strong>party boat austin</strong> adventure begins at Anderson Mill Marina on Lake Travis. After checking in and loading your coolers with your favorite BYOB beverages, you'll board our professionally maintained vessel and find your group's reserved area (add-on packages available). As we cruise out on the lake, our professional DJ starts spinning tracks while groups begin mingling and the photographer captures those early moments of excitement.
                  </p>

                  <div className="bg-white border-2 border-purple-200 p-6 my-8 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Maximize Your Austin Party Experience:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Wine className="h-5 w-5 text-purple-600" />
                          BYOB Tips
                        </h5>
                        <ul className="text-sm text-gray-700 space-y-1 ml-7">
                          <li>• Cans or plastic bottles only (no glass)</li>
                          <li>• Order alcohol delivery to marina</li>
                          <li>• We provide coolers and ice</li>
                          <li>• Stay hydrated - bring water too</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Camera className="h-5 w-5 text-pink-600" />
                          Photo Opportunities
                        </h5>
                        <ul className="text-sm text-gray-700 space-y-1 ml-7">
                          <li>• Pro photographer included</li>
                          <li>• Bring themed decorations</li>
                          <li>• Coordinate group outfits</li>
                          <li>• Use floats for epic shots</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">The Multi-Group Magic of Austin Party Cruises</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    What makes <strong>austin party cruises</strong> on the ATX Disco truly special is the multi-group atmosphere. Your bachelor or bachelorette party joins 3-5 other groups celebrating the same milestone. The DJ plays requests from all parties, creating a festival-like energy. Groups challenge each other to float races, coordin dance-offs, and share in the celebration. Many guests tell us that meeting and partying with other groups from across the country was their favorite unexpected part of the experience.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Once anchored at our exclusive Lake Travis cove, the <strong>lake travis party boat</strong> transforms into a floating party paradise. Jump off the boat into crystal-clear water, relax on giant floats, dance on the deck with the DJ, and let our photographer capture every moment. The 4-hour experience flies by as groups rotate between swimming, floating, dancing, and celebrating together in an atmosphere that feels like a music festival on the water.
                  </p>

                  <div className="bg-purple-50 p-6 rounded-lg my-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Why Groups Choose ATX Disco Over Private Charters:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span><strong>Better Value</strong> - Save $2,000+ vs private charter with DJ and photographer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span><strong>Social Energy</strong> - Meet parties from across America for amplified celebration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span><strong>Zero Planning</strong> - Everything organized and included, just show up</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span><strong>Perfect for 8-15 People</strong> - Ideal size for ATX Disco packages</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 5. BENEFITS */}
        <SectionReveal>
          <section id="benefits" className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Trophy className="h-4 w-4 mr-2 inline" />
                  Key Benefits
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Why Bachelor & Bachelorette Parties Choose ATX Disco
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Transform your celebration into <strong>the highlight of your entire Austin weekend</strong>
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Meet Parties from Across America</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      Party with bachelor & bachelorette groups from across the country! Electric energy celebrating together.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-pink-100 hover:border-pink-300 transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-pink-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Zero Stress Planning</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      Everything is handled! Just show up and celebrate. DJ, photographer, floats, and party supplies all included.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Professional Photos Included</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      Pro photographer captures every moment. Get Instagram-perfect photos delivered after your cruise!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Best Value on Lake Travis</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      From $85/person with DJ, photographer, floats & party supplies included. Private boats cost $1,050+ base rate, then add $1,600+ for the same experience!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-yellow-100 hover:border-yellow-300 transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <Music className="h-8 w-8 text-yellow-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Professional DJ All Day</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      Live DJ playing hits all 4 hours! Takes requests, reads the crowd perfectly, keeps the party energy HIGH!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <Wine className="h-8 w-8 text-indigo-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Easy Alcohol Delivery</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      Order alcohol online, delivered right to the boat. Free delivery with premium packages. Zero hassle!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 6. FEATURES - What's Included Section */}
        <SectionReveal>
          <section className="py-12 md:py-20 bg-gradient-to-br from-purple-50 to-pink-50" id="whats-included" data-testid="section-whats-included">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <CheckCircle className="h-4 w-4 mr-2 inline" />
                  What's Included
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Everything You Need for an Epic Day
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Premium amenities and services for the ultimate multi-group party experience
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {whatsIncluded.map((item, idx) => (
                  <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg" key={idx} data-testid={`card-included-${idx}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full">
                          <item.icon className="h-6 w-6 text-purple-600" />
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
            </div>
          </section>
        </SectionReveal>

        {/* 7. WHY CHOOSE - Trust Signals */}
        <SectionReveal>
          <section id="why-choose" className="py-12 md:py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-white/10 border-2 border-white text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm">
                  <Crown className="h-4 w-4 mr-2 inline" />
                  The Premier Difference
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-white leading-tight">
                  America's Most Unique Bachelor/Bachelorette Experience
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  The only multi-group party cruise in the United States - created in Austin, Texas
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-1 md:mb-2">Only One</div>
                  <div className="text-sm sm:text-base md:text-xl text-white">In the United States</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-1 md:mb-2">$85+</div>
                  <div className="text-sm sm:text-base md:text-xl text-white">Starting Price</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-1 md:mb-2">4 Hrs</div>
                  <div className="text-sm sm:text-base md:text-xl text-white">Per Cruise</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-1 md:mb-2">5★</div>
                  <div className="text-sm sm:text-base md:text-xl text-white">Average Rating</div>
                </div>
              </div>

              <div className="text-center">
                <div
                  className="xola-custom xola-checkout"
                  data-button-id="691574bd162501edc00f151a"
                >
                  <Button
                    size="lg"
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-12 py-7"
                  >
                    <Calendar className="mr-2 h-6 w-6" />
                    Book Your ATX Disco Cruise Today
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 8. PHOTO GALLERY */}
        <SectionReveal>
          <section id="photos" className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Camera className="h-4 w-4 mr-2 inline" />
                  Photo Gallery
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  See the Disco Cruise Experience
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Real photos from real bachelor & bachelorette parties on Lake Travis
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

              <div className="text-center mt-12">
                <div
                  className="xola-custom xola-checkout"
                  data-button-id="691574bd162501edc00f151a"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-6"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Book Your Photo-Perfect Party
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* GUARANTEE SECTION - NEW Hormozi/McDowell Optimization */}
        <SectionReveal>
          <section className="py-12 md:py-20 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <Badge className="mb-6 bg-green-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Shield className="h-4 w-4 mr-2 inline" />
                  Our Guarantee
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  100% Risk-Free Booking
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Book with complete confidence - we've got you covered
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <Card className="border-2 border-green-500 shadow-xl">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <CloudRain className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">Lemonade Disco Guarantee</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Your party is guaranteed to happen - rain or shine!</strong> If severe weather prevents the boat cruise, we move the party to Lemonade Disco, our downtown venue with the same DJ, photographer, and party atmosphere.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-500 shadow-xl">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <XCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">No Refunds Policy</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>All sales are final - no refunds for ATX Disco Cruise.</strong> However, if severe weather prevents the boat cruise, your party continues at Lemonade Disco with the same great experience!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-500 shadow-xl">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">100% Satisfaction Track Record</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>15+ years</strong> running, <strong>150,000+ happy customers</strong>, and a <strong>perfect safety record</strong>. We guarantee the best bach party on Lake Travis!
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 border-2 border-green-500">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Promise to You</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  If you don't have the time of your life on the ATX Disco Cruise, we'll make it right. That's our commitment after <strong>15+ years</strong> of creating unforgettable memories.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Badge className="bg-green-600 text-white px-6 py-3 text-base font-bold">
                    <Check className="h-4 w-4 mr-2 inline" />
                    15+ Years Experience
                  </Badge>
                  <Badge className="bg-blue-600 text-white px-6 py-3 text-base font-bold">
                    <Users className="h-4 w-4 mr-2 inline" />
                    150,000+ Happy Customers
                  </Badge>
                  <Badge className="bg-purple-600 text-white px-6 py-3 text-base font-bold">
                    <Shield className="h-4 w-4 mr-2 inline" />
                    Perfect Safety Record
                  </Badge>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 9. TESTIMONIALS Section - Enhanced with Trust Badges */}
        <SectionReveal>
          <section id="testimonials" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white" data-testid="section-testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Quote className="h-4 w-4 mr-2 inline" />
                  Customer Reviews
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  What Bachelor & Bachelorette Parties Are Saying
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
                  Real reviews from real parties who celebrated the ATX Disco way
                </p>
                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <Badge className="bg-yellow-500 text-black px-6 py-3 text-base font-bold">
                    <Star className="h-5 w-5 mr-2 inline fill-current" />
                    420+ Five-Star Reviews
                  </Badge>
                  <Badge className="bg-green-600 text-white px-6 py-3 text-base font-bold">
                    <Award className="h-5 w-5 mr-2 inline" />
                    #1 Rated Bach Party Experience
                  </Badge>
                  <Badge className="bg-blue-600 text-white px-6 py-3 text-base font-bold">
                    <TrendingUp className="h-5 w-5 mr-2 inline" />
                    98% Would Recommend
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {testimonials.slice(0, 6).map((testimonial) => (
                  <Card key={testimonial.id} className="border-2 border-gray-200 hover:border-purple-300 transition-all hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{testimonial.avatar}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {testimonial.role} • {testimonial.location}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.text}"</p>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        {testimonial.package}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <div
                  className="xola-custom xola-checkout"
                  data-button-id="691574bd162501edc00f151a"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-6"
                  >
                    Book Your Legendary Party Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* COST OF INACTION SECTION - NEW Hormozi/McDowell Optimization */}
        <SectionReveal>
          <section className="py-12 md:py-20 bg-gradient-to-br from-red-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <Badge className="mb-6 bg-red-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <AlertCircle className="h-4 w-4 mr-2 inline" />
                  Cost of Inaction
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  What Happens If You Don't Book ATX Disco?
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  The real cost of choosing the "traditional" route for your <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Parties">bachelor</InternalLinkHighlight> or <InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Parties">bachelorette party</InternalLinkHighlight>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Without ATX Disco */}
                <Card className="border-4 border-red-300 shadow-xl bg-red-50">
                  <CardHeader className="bg-red-600 text-white">
                    <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                      <XCircle className="h-8 w-8" />
                      Without ATX Disco
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Pay $1,500-$2,000+ for Private Charter</p>
                        <p className="text-gray-700">For a group of 10-14 - much higher cost per person</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Stress of Planning Everything</p>
                        <p className="text-gray-700">Find DJ, photographer, buy floats, coordinate everything yourself</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Just Your Small Group</p>
                        <p className="text-gray-700">Miss the legendary multi-group energy that makes it special</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Amateur iPhone Photos</p>
                        <p className="text-gray-700">No professional photographer capturing the memories</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Awkward Silence on the Water</p>
                        <p className="text-gray-700">No professional DJ, just your phone speaker</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Regret & FOMO</p>
                        <p className="text-gray-700">"We should have done the Disco Cruise everyone talks about"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* With ATX Disco */}
                <Card className="border-4 border-green-500 shadow-xl bg-green-50 transform scale-105">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                      <CheckCircle className="h-8 w-8" />
                      With ATX Disco
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Only $85 Per Person</p>
                        <p className="text-gray-700">All-inclusive experience at a fraction of the cost</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Everything Handled For You</p>
                        <p className="text-gray-700">Just show up and party - we handle EVERYTHING</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Electric Multi-Group Energy</p>
                        <p className="text-gray-700">Party with groups from across America - unforgettable vibes!</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Professional Photography Included</p>
                        <p className="text-gray-700">Instagram-worthy shots delivered after your cruise</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">Non-Stop Party with Pro DJ</p>
                        <p className="text-gray-700">Dance floor packed all 4 hours with perfect music</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-900">The Highlight of Your Weekend</p>
                        <p className="text-gray-700">"Best decision we made for the bachelor/bachelorette party!"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Card className="max-w-4xl mx-auto border-4 border-yellow-500 bg-yellow-50">
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">
                      Don't Let Your Group Miss Out on the <span className="text-purple-600">LEGENDARY</span> Experience
                    </h3>
                    <p className="text-xl text-gray-700 mb-6">
                      This is THE bachelor/bachelorette party experience everyone talks about. Don't settle for a boring private boat when you could have the <strong>party of a lifetime</strong> for less money.
                    </p>
                    <div
                      className="xola-custom xola-checkout"
                      data-button-id="691574bd162501edc00f151a"
                    >
                      <Button 
                        size="lg" 
                        className="btn-primary-hero bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xl px-12 py-7 shadow-2xl transform hover:scale-105 transition-all"
                      >
                        Don't Miss Out - Book ATX Disco Now <ArrowRight className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 10. FAQs Section */}
        <SectionReveal>
          <section id="faqs" className="py-12 md:py-20 bg-white" data-testid="section-faq">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <HelpCircle className="h-4 w-4 mr-2 inline" />
                  FAQs
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Everything you need to know about the ATX Disco Cruise
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-2 border-gray-200 rounded-lg px-6 hover:border-purple-300 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-purple-600 py-6">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed pb-6 text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-12 text-center bg-purple-50 rounded-2xl p-8 border border-purple-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Still Have Questions?</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our party experts are here to help you plan the perfect Lake Travis celebration
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div
                    className="xola-custom xola-checkout"
                    data-button-id="691574bd162501edc00f151a"
                  >
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Start a Conversation
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.open('tel:+15124885892')}
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 488-5892
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 11. SEO-ONLY CONTENT (BOTTOM) */}
        
        {/* Quick Answer Boxes - SEO Content */}
        <SectionReveal>
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <QuickAnswerBoxGroup
                title="Quick Answers About ATX Disco Cruise"
                boxes={[
                  {
                    id: 'food-included',
                    question: 'Is food included?',
                    answer: 'Food is not included. Please eat before your cruise and bring snacks/light refreshments if needed. We provide coolers with ice for your BYOB beverages. We can help coordinate alcohol delivery through Party On Delivery.',
                    keywords: ['food', 'eat before', 'bring snacks', 'BYOB', 'coolers'],
                    icon: Utensils,
                    relatedLink: {
                      href: '#packages',
                      text: 'View package options'
                    }
                  },
                  {
                    id: 'music-type',
                    question: 'What kind of music is played?',
                    answer: 'Professional DJ plays crowd-pleasing hits all day! Mix of current top 40, throwback classics, hip-hop, country, and party anthems. DJ takes requests and reads the crowd perfectly. The dance floor energy is incredible with everyone singing along.',
                    keywords: ['DJ', 'music', 'top 40', 'requests', 'dance floor'],
                    icon: Music,
                    relatedLink: {
                      href: '#whats-included',
                      text: 'See what\'s included'
                    }
                  }
                ]}
                columns={2}
                className="max-w-5xl mx-auto"
              />
            </div>
          </section>
        </SectionReveal>

        {/* AI-Optimized Event Timeline Section */}
        <SectionReveal>
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                <AIOptimizedSection
                  type="timeline"
                  title="Your ATX Disco Cruise Day Timeline"
                  description="What to expect on your Lake Travis multi-group party cruise"
                  data={[
                    {
                      time: "10:45 AM",
                      title: "Arrival at Anderson Mill Marina",
                      description: "Check in at the dock, meet your captain, load coolers onto the boat. Free parking available. Bachelor and bachelorette groups gather from across the country.",
                      icon: <MapPin className="w-4 h-4 text-white" />,
                      duration: "15 min"
                    },
                    {
                      time: "11:00 AM",
                      title: "Boarding & Departure",
                      description: "Board the ATX Disco Cruise boat, safety briefing from captain, music starts playing, drinks flowing, cruise begins on Lake Travis. Meet your fellow party groups!",
                      icon: <Ship className="w-4 h-4 text-white" />,
                      duration: "15 min"
                    },
                    {
                      time: "11:30 AM",
                      title: "Party at Popular Coves",
                      description: "Anchor at popular coves, swimming and floating on lily pads, DJ playing hits, photographer capturing memories, multi-group party atmosphere in full effect!",
                      icon: <Anchor className="w-4 h-4 text-white" />,
                      duration: "2 hours"
                    },
                    {
                      time: "2:00 PM",
                      title: "Scenic Cruise & Photos",
                      description: "Cruise scenic parts of Lake Travis, group photos with all the bach parties, more swimming stops, enjoying the Texas sun and celebrating with new friends.",
                      icon: <Camera className="w-4 h-4 text-white" />,
                      duration: "45 min"
                    },
                    {
                      time: "3:00 PM",
                      title: "Return to Marina",
                      description: "Head back to Anderson Mill Marina, last songs and celebrations, exchange numbers with your new friends, dock and disembark. Memories made!",
                      icon: <Navigation className="w-4 h-4 text-white" />,
                      duration: "15 min"
                    }
                  ]}
                />
                
                <AIOptimizedSection
                  type="list"
                  title="Bachelor & Bachelorette Group Size Guide"
                  description="Perfect group sizes for the ATX Disco Cruise"
                  data={[
                    {
                      title: "Small Bach Parties (6-10 people)",
                      description: "Perfect for intimate celebrations. Consider add-on packages for private cooler and reserved spot. Still enjoy the multi-group party atmosphere!",
                      icon: <Users className="w-5 h-5" />,
                      badge: "Intimate Vibe"
                    },
                    {
                      title: "Medium Bach Parties (11-20 people)",
                      description: "Most common size for bachelor and bachelorette groups! Great party energy, mix of your group and others, perfect for the disco cruise experience.",
                      icon: <Users className="w-5 h-5" />,
                      badge: "Most Popular",
                      highlighted: true
                    },
                    {
                      title: "Large Bach Parties (21-35 people)",
                      description: "Big celebrations! Your group will have significant presence on the boat while still enjoying the multi-group party vibe. Epic experience!",
                      icon: <Users className="w-5 h-5" />,
                      badge: "Go Big"
                    },
                    {
                      title: "Extra Large Groups (35+ people)",
                      description: "Consider booking a private cruise for this size! Or split into multiple packages. Contact us for best options for your mega celebration.",
                      icon: <Users className="w-5 h-5" />,
                      badge: "Private Recommended"
                    }
                  ]}
                />
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Cruise Experience Details */}
        <SectionReveal>
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <AIOptimizedSection
                type="statistics"
                title="ATX Disco Cruise Experience Details"
                description="What to expect on America's only multi-group party cruise"
                data={[
                  {
                    value: "Only One",
                    label: "In the United States",
                    icon: <Crown className="w-8 h-8" />,
                    itemProp: "uniqueness"
                  },
                  {
                    value: "4 Hours",
                    label: "Cruise Duration",
                    icon: <Clock className="w-8 h-8" />,
                    itemProp: "duration"
                  },
                  {
                    value: "$85-$105",
                    label: "Per Person Range",
                    icon: <DollarSign className="w-8 h-8" />,
                    itemProp: "priceRange"
                  },
                  {
                    value: "DJ + Photo",
                    label: "Included Pros",
                    icon: <Music className="w-8 h-8" />,
                    itemProp: "entertainment"
                  },
                  {
                    value: "Multi-Group",
                    label: "Party Atmosphere",
                    icon: <Users className="w-8 h-8" />,
                    itemProp: "atmosphere"
                  },
                  {
                    value: "5 Stars",
                    label: "Average Rating",
                    icon: <Star className="w-8 h-8" />,
                    itemProp: "rating"
                  }
                ]}
                className="max-w-6xl mx-auto"
                schemaType="Event"
                structuredData={{
                  "@context": "https://schema.org",
                  "@type": "Event",
                  "name": "ATX Disco Cruise",
                  "description": "Multi-group bachelor and bachelorette party cruise on Lake Travis, Austin Texas",
                  "location": {
                    "@type": "Place",
                    "name": "Lake Travis",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Austin",
                      "addressRegion": "Texas"
                    }
                  },
                  "organizer": {
                    "@type": "Organization",
                    "name": "Premier Party Cruises"
                  }
                }}
              />
            </div>
          </section>
        </SectionReveal>

        {/* Party Planning Checklist */}
        <PartyPlanningChecklist partyType="Bachelor/Bachelorette Party" eventType="disco cruise celebration" />

        {/* What to Bring Section */}
        <SectionReveal>
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <WhatToBring
                variant="disco"
                title="What to Bring on the ATX Disco Cruise"
                description="Everything you need for the ultimate multi-group party on Lake Travis"
                className="max-w-7xl mx-auto"
              />
            </div>
          </section>
        </SectionReveal>

        {/* Featured Snippets - SEO Content */}
        <SectionReveal>
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto space-y-8">
                <FeaturedSnippet
                  question="What is the ATX Disco Cruise?"
                  answer="The ATX Disco Cruise is America's only multi-group bachelor/bachelorette party cruise on Lake Travis in Austin, Texas. It's a 4-hour shared party boat experience featuring professional DJ services, photography, giant floats, and an epic party atmosphere where bachelor and bachelorette parties from across the country celebrate together. Packages start at $85/person."
                  featured={true}
                />
                
                <FeaturedSnippet
                  question="What is included in the ATX Disco Cruise?"
                  answer="All ATX Disco Cruise packages include: Professional DJ playing all 4 hours, professional photographer capturing memories, giant lily pad floats and unicorn floats, party supplies (cups, koozies, bubbles), shared coolers with ice for BYOB, ice water stations, clean restroom facilities, and shaded lounge areas. Premium packages add private coolers, reserved spots, and personalized items for the guest of honor."
                  featured={false}
                />

                <FeaturedSnippet
                  question="How much does the ATX Disco Cruise cost?"
                  answer="ATX Disco Cruise pricing is based on time slot: Friday 12-4pm costs $95/person, Saturday 11am-3pm costs $105/person (most popular), and Saturday 3:30-7:30pm costs $85/person. All tickets include professional DJ, photographer, giant floats, and party supplies. Optional add-on packages available based on your party type. The shared format makes it significantly cheaper than private boat rentals for bachelor and bachelorette parties."
                  featured={false}
                />

                <FeaturedSnippet
                  question="When does the ATX Disco Cruise run?"
                  answer="The ATX Disco Cruise runs on Saturdays from March through October during peak season. Two time slots are available: 11:00 AM - 3:00 PM (morning cruise) and 3:30 PM - 7:30 PM (afternoon cruise). Each cruise is 4 hours long. Peak weekends book 8-12 weeks for priority time slots - once they book they're gone! Early booking is essential for bachelor and bachelorette parties."
                  featured={false}
                />
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* NOTE: All structured data (Event, LocalBusiness, etc.) is handled by SSR via schemaLoader.ts
            to avoid duplicate/conflicting schemas and Google Search Console errors. */}

        {/* Related Services Section */}
        <RelatedServicesSection currentPath="/atx-disco-cruise" />

        {/* Related Links */}
        <RelatedLinks />

        {/* Sticky CTA */}
        <StickyCTA
          primaryText="Book Your Cruise"
          primaryAction={handleBookNow}
          secondaryText="Call Now"
          secondaryHref="tel:+15124885892"
          showOnDesktop={false}
        />

        <Footer />
      </div>
    </>
  );
}

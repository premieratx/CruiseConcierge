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
  Gem, Flower, Flower2, CircleDot, Smile, X, Package,
  Plane, Wine, Eye, Bot, Navigation
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
import { TableOfContents } from '@/components/TableOfContents';
import { StickyCTA } from '@/components/StickyCTA';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { TransportationGuide } from '@/components/TransportationGuide';
import { LazyImage } from '@/components/LazyImage';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.webp';
import heroImage2 from '@assets/atx-disco-cruise-party.webp';
import heroImage3 from '@assets/dancing-party-scene.webp';
import galleryImage1 from '@assets/party-atmosphere-1.webp';
import galleryImage2 from '@assets/party-atmosphere-2.webp';
import galleryImage3 from '@assets/party-atmosphere-3.webp';
import boatImage1 from '@assets/day-tripper-14-person-boat.webp';
import boatImage2 from '@assets/meeseeks-25-person-boat.webp';
import boatImage3 from '@assets/clever-girl-50-person-boat.webp';
import floatImage from '@assets/giant-unicorn-float.webp';

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

// ATX Disco Cruise packages for bachelorettes
const bachelorettePackages = [
  {
    id: 'basic_bachelorette',
    name: 'Basic Bach Package',
    price: DISCO_PRICING.basic / 100,
    originalPrice: null,
    description: 'Join the BEST bachelorette party on Lake Travis',
    subtitle: 'Most affordable option for bachelorette groups',
    features: [
      'Join the BEST bachelorette party on Lake Travis',
      'BYOB with shared cooler and ice',
      'Alcohol & food delivery available',
      'Professional DJ and photographer included',
      'Giant floats and party atmosphere',
      'Most affordable option for bachelorette groups'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value',
    brideSpecial: false
  },
  {
    id: 'disco_queen',
    name: 'Disco Queen Package',
    price: DISCO_PRICING.disco_queen / 100,
    originalPrice: 125,
    description: 'Our signature bachelorette party experience - Most Popular!',
    subtitle: 'Private cooler with ice for your group',
    features: [
      '🎉 BRIDE CRUISES FREE with this package!',
      'Private cooler with ice for your group',
      'Reserved spot for your bachelorette crew',
      'Disco ball cup & bubble gun for bride',
      'Complimentary alcohol & lunch delivery',
      '25% discount on round-trip transportation',
      '$50-$100 Airbnb delivery voucher'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular',
    brideSpecial: true
  },
  {
    id: 'platinum_bride',
    name: 'Super Sparkle Platinum',
    price: DISCO_PRICING.platinum / 100,
    originalPrice: 140,
    description: 'Ultimate all-inclusive bachelorette party luxury',
    subtitle: 'Cooler pre-stocked with drinks on arrival',
    features: [
      '🎉 BRIDE CRUISES FREE with this package!',
      'Personal unicorn float for the bride',
      'Mimosa setup with flutes, juices & chambong',
      '$100 Airbnb concierge services voucher',
      'Towel service & SPF-50 spray sunscreen',
      'Cooler pre-stocked with drinks on arrival',
      'Everything from Disco Queen Package'
    ],
    popular: false,
    icon: Trophy,
    badge: 'All-Inclusive VIP',
    brideSpecial: true
  }
];

// Complete list of what's included
const whatsIncluded = [
  {
    icon: Music,
    title: 'Professional DJ',
    description: 'Playing bachelorette favorites all day'
  },
  {
    icon: Camera,
    title: 'Professional Photographer',
    description: 'Capturing every moment'
  },
  {
    icon: Camera,
    title: 'Digital Photo Delivery',
    description: 'After the event'
  },
  {
    icon: Anchor,
    title: 'Private Cooler with Ice',
    description: 'For your group'
  },
  {
    icon: GlassWater,
    title: 'Mimosa Supplies',
    description: 'With champagne flutes'
  },
  {
    icon: Waves,
    title: 'Multiple Giant Lily Pad Floats',
    description: '6x20 feet each'
  },
  {
    icon: Gift,
    title: 'Party Supplies',
    description: 'Cups, koozies, decorations'
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
    description: 'With other bachelorette groups'
  }
];

// FAQs
const faqItems = [
  {
    id: 'refund-policy',
    question: 'Do you offer a refund window after booking?',
    answer: "Yes—48 hours after booking for a full refund. After that, weather rules apply at captain's discretion."
  },
  {
    id: 'split-payment',
    question: 'Can we split payments between the girls?',
    answer: 'Yes. Split payment options are available at checkout.'
  },
  {
    id: 'attire',
    question: 'Is disco attire required?',
    answer: 'Encouraged but not required; many groups coordinate outfits.'
  },
  {
    id: 'weather-policy',
    question: 'What happens in bad weather?',
    answer: 'Rain or shine. For severe weather, we move to Lemonade Disco (land venue).',
    answerJsx: (
      <>
        Rain or shine. For severe weather, we move to{' '}
        <a href="#lemonade-disco" className="text-pink-500 hover:underline font-semibold">
          Lemonade Disco
        </a>{' '}
        (land venue).
      </>
    )
  },
  {
    id: 'add-people',
    question: 'Can we add more girls after booking?',
    answer: 'Yes, usually 1–2 if availability allows—contact us ASAP.'
  },
  {
    id: 'group-discounts',
    question: 'Do you offer group discounts?',
    answer: 'Yes for larger groups—contact us for details.'
  },
  {
    id: 'alcohol-policy',
    question: 'What\'s the alcohol policy?',
    answer: 'BYOB for 21+; cans/plastic only; coolers with ice and cups provided.'
  },
  {
    id: 'booking-timeline',
    question: 'How far in advance should we book?',
    answer: 'Peak weekends sell out 4–6 weeks in advance; book early.'
  }
];


// Photo gallery items
const galleryPhotos = [
  { id: 1, src: heroImage2, alt: 'Bachelorette Party Austin ATX Disco Cruise on Party Boat Lake Travis' },
  { id: 2, src: heroImage3, alt: 'Austin Bachelorette Party Boat dancing on Lake Travis cruise' },
  { id: 3, src: galleryImage1, alt: 'Bachelorette Party Austin vibes on Lake Travis party boat' },
  { id: 4, src: floatImage, alt: 'Lake Travis Bachelorette Party giant unicorn float on Party Boat Austin' },
  { id: 5, src: galleryImage2, alt: 'Austin Bachelorette Party Boat atmosphere on Lake Travis' },
  { id: 6, src: boatImage1, alt: 'Lake Travis Bachelorette Party Day Tripper boat cruise' },
  { id: 7, src: galleryImage3, alt: 'Bachelorette Party Austin on Lake Travis party boat' },
  { id: 8, src: boatImage2, alt: 'Austin Bachelorette Party Boat Meeseeks on Lake Travis' }
];

// Table of Contents sections - Updated order
const tocSections = [
  { id: 'hero', title: 'Overview', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'experience', title: 'Experience', icon: <Star className="h-4 w-4" /> },
  { id: 'packages', title: 'Packages', icon: <Package className="h-4 w-4" /> },
  { id: 'availability', title: 'Availability', icon: <Calendar className="h-4 w-4" /> },
  { id: 'benefits', title: 'Benefits', icon: <Trophy className="h-4 w-4" /> },
  { id: 'whats-included', title: "What's Included", icon: <CheckCircle className="h-4 w-4" /> },
  { id: 'why-choose', title: 'Why Choose Us', icon: <Shield className="h-4 w-4" /> },
  { id: 'photos', title: 'Photos', icon: <Camera className="h-4 w-4" /> },
  { id: 'testimonials', title: 'Reviews', icon: <Quote className="h-4 w-4" /> },
  { id: 'faqs', title: 'FAQs', icon: <HelpCircle className="h-4 w-4" /> }
];

export default function BacheloretteParty() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [heroImage2, heroImage3, galleryImage1];

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
    const params = new URLSearchParams({ cruiseType: 'bachelorette' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        pageRoute="/bachelorette-party-austin"
        defaultTitle="Bachelorette Party Boat | Premier Austin"
        defaultDescription="Lake Travis bachelorette cruises. Bride cruises FREE! ATX Disco with DJ & photographer. From $85/person. Book today!"
        defaultKeywords={['Austin bachelorette party', 'Lake Travis bachelorette party', 'ATX Disco Cruise', 'bachelorette party boat Austin']}
        schemaType="event"
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
        secondaryHref="tel:+15127705050"
        showOnDesktop={false}
      />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800">
        {/* Image Background with Smooth Crossfade */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentHeroImage ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ pointerEvents: index === currentHeroImage ? 'auto' : 'none' }}
            >
              <LazyImage 
                src={image}
                alt="Bachelorette party Austin cruise on Lake Travis - ATX Disco party boat with DJ and entertainment"
                className="w-full h-full object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </motion.div>
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white text-center flex-grow flex items-center w-full py-20">
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
              <Badge className="font-sans tracking-wider font-bold uppercase text-sm bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 border-0">
                <Heart className="h-4 w-4 mr-2 inline" />
                Premier Bachelorette Experience
              </Badge>
            </motion.div>
            
            {/* CRITICAL: H1 with text-6xl and font-playfair - Largest text on page */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold font-playfair mb-6 text-center leading-tight"
              data-editable 
              data-editable-id="bachelorette-hero-title"
            >
              Austin Bachelorette Party Boat Cruises
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              className="text-2xl md:text-3xl text-brand-yellow font-semibold mb-6"
            >
              Lake Travis Girls' Weekend Celebration
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
              data-editable 
              data-editable-id="bachelorette-hero-subtitle"
            >
              Exclusively for Bachelorette & <InternalLinkHighlight href="/bachelor-party" title="Bachelor Parties">Bachelor Parties</InternalLinkHighlight><br/>
              <span className="text-lg md:text-xl">The Highlight of Your Weekend Every. Damn. Time.</span>
            </motion.p>

            {/* Special Bride Free Offer */}
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-6 mb-6 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2">
                <Heart className="h-6 w-6 fill-current flex-shrink-0" />
                <span className="font-bold text-lg">BRIDE CRUISES FREE with Disco Queen & Platinum!</span>
                <Heart className="h-6 w-6 fill-current flex-shrink-0" />
              </div>
            </motion.div>

            {/* Scarcity Banner */}
            <motion.div 
              variants={fadeInUp}
              className="bg-red-600/90 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-6 w-6 animate-pulse flex-shrink-0" />
                <span className="font-bold text-lg">Most weekends sell out 4-6 weeks early!</span>
              </div>
              <p className="text-base mt-2">Books up SOLID at least a month in advance</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg px-10 py-7 whitespace-normal min-h-[4rem]"
                data-testid="button-hero-book-now-bachelorette"
              >
                <Calendar className="mr-2 h-6 w-6 flex-shrink-0" />
                <span className="text-center leading-tight">BOOK NOW - Be the Hero!</span>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-10 py-7"
                data-testid="button-hero-see-packages"
              >
                See Packages & Pricing
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/95 backdrop-blur-sm py-6 px-6 border-t-4 border-pink-500">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-lg md:text-xl font-bold">
              Just <span className="text-pink-600">SHOW UP & GET DOWN</span> - Everything Included!
            </p>
          </div>
        </div>
      </section>

      {/* 2. EXPERIENCE DESCRIPTION */}
      <SectionReveal>
        <section id="experience" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Sparkles className="h-4 w-4 mr-2 inline" />
                The Bachelorette Experience
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                What Makes Our Bachelorette Parties Special
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                From epic <InternalLinkHighlight href="/atx-disco-cruise" title="ATX Disco Cruise">ATX Disco Cruises</InternalLinkHighlight> to exclusive <InternalLinkHighlight href="/private-cruises" title="Private Cruises">private charters</InternalLinkHighlight>, we deliver unforgettable girls' weekend experiences on Lake Travis. Also perfect for <InternalLinkHighlight href="/bachelor-party" title="Bachelor Parties">bachelor celebrations</InternalLinkHighlight>!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
              {/* ATX Disco Cruise Experience */}
              <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                    <Music className="h-10 w-10 text-pink-600" />
                  </div>
                  <CardTitle className="text-2xl text-center font-playfair">ATX Disco Cruise</CardTitle>
                  <CardDescription className="text-center text-base">
                    The Ultimate Bachelorette Party Boat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Join bachelorette parties from across the country on our legendary <InternalLinkHighlight href="/atx-disco-cruise" title="ATX Disco Cruise">ATX Disco Cruise</InternalLinkHighlight>. Professional DJ, photographer, giant floats, and an electric atmosphere make this the highlight of your Austin girls' weekend. <InternalLinkHighlightWithArrow href="/" title="Home">Explore all our party cruise options</InternalLinkHighlightWithArrow>
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong className="text-pink-600">Bride Cruises FREE</strong> with premium packages</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Professional DJ & Photographer</strong> included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>From $85/person</strong> - most affordable option</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Party with bachelorette groups</strong> from across America</span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => handleGetQuote('disco_queen')}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold"
                  >
                    Book Disco Cruise
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Private Cruise Experience */}
              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <Ship className="h-10 w-10 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl text-center font-playfair">Private Boat Rental</CardTitle>
                  <CardDescription className="text-center text-base">
                    Exclusive Bachelorette Charter
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <InternalLinkHighlight href="/private-cruises" title="Private Cruises">Book an entire boat</InternalLinkHighlight> exclusively for your bride tribe. Perfect for larger groups or those wanting a completely private celebration on Lake Travis with custom itinerary and personalized service.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Exclusive use</strong> of entire boat for your group</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Custom itinerary</strong> and schedule</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Boats for 14-75 guests</strong> available</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Private celebration</strong> with just your bride tribe</span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => {
                      const params = new URLSearchParams({ cruiseType: 'private' });
                      navigate(`/chat?${params.toString()}`);
                    }}
                    variant="outline"
                    className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold"
                  >
                    Get Private Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 3. PRICING / PACKAGES */}
      <SectionReveal>
        <section id="packages" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Package className="h-4 w-4 mr-2 inline" />
                Bachelorette Packages
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Choose Your Bachelorette Party Package
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Find the perfect package for your bride tribe celebration
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
              {bachelorettePackages.map((pkg, index) => (
                <Card 
                  key={pkg.id}
                  className={cn(
                    "relative h-full bg-white transition-all duration-300",
                    pkg.popular && "border-4 border-pink-500 shadow-2xl scale-105",
                    !pkg.popular && "border-2 border-gray-200 hover:border-pink-400 hover:shadow-lg"
                  )}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-sans tracking-wider font-bold uppercase text-sm px-6 py-2">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}
                  
                  {pkg.brideSpecial && !pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-purple-600 text-white font-sans tracking-wider font-bold uppercase text-sm px-4 py-2">
                        <Heart className="h-3 w-3 mr-1 inline fill-current" />
                        BRIDE FREE!
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4 pt-10">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                        <pkg.icon className="h-8 w-8 text-pink-600" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-playfair mb-2">{pkg.name}</CardTitle>
                    <CardDescription className="text-base">
                      {pkg.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="text-center py-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        ${pkg.price}
                        <span className="text-xl text-gray-600">/person</span>
                      </div>
                      <div className="text-base text-green-600 font-semibold">
                        ${pkg.id === 'basic_bachelorette' ? '109' : pkg.id === 'disco_queen' ? '122' : '135'} with tax & tip
                      </div>
                      {pkg.originalPrice && (
                        <div className="text-sm text-gray-500 line-through mt-1">
                          was ${pkg.originalPrice}
                        </div>
                      )}
                    </div>
                    
                    <ul className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-6"
                      onClick={() => handleGetQuote(pkg.id)}
                      data-testid={`button-package-${pkg.id}`}
                    >
                      Select This Package
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center bg-white rounded-2xl p-8 max-w-4xl mx-auto border-2 border-pink-200">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                <strong>All packages include:</strong> Professional DJ, Professional Photographer, Giant Floats, Party Supplies & More!
              </p>
              <Badge className="bg-green-600 text-white font-sans tracking-wider font-bold uppercase text-sm px-6 py-3">
                <TrendingUp className="h-4 w-4 mr-2 inline" />
                Group Discounts Available for 10+ Bridesmaids
              </Badge>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 4. AVAILABILITY / BOOKING */}
      <SectionReveal>
        <section id="availability" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Calendar className="h-4 w-4 mr-2 inline" />
                Availability & Booking
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Reserve Your Girls' Weekend Celebration
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Peak bachelorette weekends book 4-6 weeks in advance - secure your date today
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              <Card className="border-2 border-pink-100 hover:border-pink-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-pink-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Cruise Schedule</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ATX Disco Cruises run <strong>Saturdays & Sundays</strong> from 12:00 PM - 4:00 PM during peak season (April-September).
                  </p>
                  <Badge className="bg-pink-600 text-white">
                    4-Hour Celebration
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Best Time to Book</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Book 4-6 weeks ahead</strong> for peak weekends. Last-minute spots sometimes available for weekdays and off-season.
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
                    Simple online booking with <strong>instant confirmation</strong>. Split payments available for your bride tribe convenience.
                  </p>
                  <Badge className="bg-green-600 text-white">
                    Book in Minutes
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <div className="text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-10 max-w-4xl mx-auto border-2 border-pink-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 font-playfair">Ready to Book Your Bachelorette Party?</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Check availability and get instant pricing for your girls' weekend on Lake Travis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => handleGetQuote()}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg px-10 py-6"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Check Availability Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('tel:+15127705050')}
                  className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold text-lg px-10 py-6"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  Call (512) 770-5050
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 5. BENEFITS */}
      <SectionReveal>
        <section id="benefits" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Trophy className="h-4 w-4 mr-2 inline" />
                Key Benefits
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Why Bachelorette Parties Choose Us
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                The ultimate girls' weekend celebration on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card className="border-2 border-pink-100 hover:border-pink-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-pink-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Bride Cruises FREE</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    With Disco Queen & Platinum packages, the bride celebrates for free! Make your special day even more memorable.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-purple-600" />
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
                  <CardTitle className="text-xl font-bold">Professional Photos</CardTitle>
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
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Meet Bachelorette Parties</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    Party with bachelorette groups from across America! Electric energy celebrating the same occasion together.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-100 hover:border-yellow-300 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Best Value on Lake Travis</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    From $85/person with DJ, photographer & floats included. Always cheaper than private boat for smaller groups!
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
                    Order alcohol online, delivered right to the marina. Free delivery with premium packages. Zero hassle!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 6. FEATURES & WHAT'S INCLUDED */}
      <SectionReveal>
        <section id="whats-included" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <CheckCircle className="h-4 w-4 mr-2 inline" />
                What's Included
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Everything You Need for an Epic Day
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                From professional entertainment to giant floats - we've got your bride tribe covered
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
              {whatsIncluded.map((item, index) => (
                <Card key={index} className="border border-gray-200 hover:border-pink-300 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-pink-100 rounded-full">
                        <item.icon className="h-6 w-6 text-pink-600" />
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
                variant="bachelorette"
                title="What to Bring on Your Bachelorette Party Cruise"
                description="Pack these essentials for the perfect girls' weekend on Lake Travis"
                className="max-w-7xl mx-auto"
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 7. WHY CHOOSE PREMIER - Trust Signals */}
      <SectionReveal>
        <section id="why-choose" className="py-20 bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-white/10 border-2 border-white text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm">
                <Crown className="h-4 w-4 mr-2 inline" />
                The Premier Difference
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-white leading-tight">
                Austin's Most Trusted Bachelorette Party Company
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Since 2009, we've been the go-to choice for bachelorette parties on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-6xl font-bold text-brand-yellow mb-2">15+</div>
                <div className="text-xl text-white">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-brand-yellow mb-2">10K+</div>
                <div className="text-xl text-white">Bachelorette Parties</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-brand-yellow mb-2">100%</div>
                <div className="text-xl text-white">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-brand-yellow mb-2">5★</div>
                <div className="text-xl text-white">Average Rating</div>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-12 py-7"
              >
                <Calendar className="mr-2 h-6 w-6" />
                Join 10,000+ Happy Bachelorette Parties
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 8. PHOTO GALLERY */}
      <SectionReveal>
        <section id="photos" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Camera className="h-4 w-4 mr-2 inline" />
                Photo Gallery
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                See the Bachelorette Party Experience
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Real photos from real bachelorette parties on Lake Travis
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

      {/* 9. TESTIMONIALS/REVIEWS */}
      <SectionReveal>
        <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Quote className="h-4 w-4 mr-2 inline" />
                Customer Reviews
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                What Bachelorette Parties Are Saying
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                Check out our verified reviews on Google and Facebook to see what real customers are saying about their bachelorette party experiences on Lake Travis!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold text-lg px-10 py-6"
                >
                  <a href="https://www.google.com/search?q=premier+party+cruises+austin" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-5 w-5" />
                    View Google Reviews
                  </a>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold text-lg px-10 py-6"
                >
                  <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-5 w-5" />
                    View Facebook Reviews
                  </a>
                </Button>
              </div>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  onClick={() => handleGetQuote()}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-6"
                >
                  Book Your Bachelorette Party Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 10. FAQs */}
      <SectionReveal>
        <section id="faqs" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <HelpCircle className="h-4 w-4 mr-2 inline" />
                FAQs
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Everything you need to know about bachelorette parties on Lake Travis
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-2 border-gray-200 rounded-lg px-6 hover:border-pink-300 transition-colors"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-pink-600 py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-6 text-base">
                    {item.answerJsx || item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center bg-pink-50 rounded-2xl p-8 border border-pink-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Still Have Questions?</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our bachelorette party experts are here to help you plan the perfect Lake Travis celebration
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => handleGetQuote()}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start a Conversation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('tel:+15127705050')}
                  className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call (512) 770-5050
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Transportation & Lodging Guide */}
      <TransportationGuide showAccommodations={true} />

      {/* 11. SEO-ONLY CONTENT (BOTTOM) */}
      
      {/* AI-Optimized Event Timeline Section */}
      <SectionReveal>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              <AIOptimizedSection
                type="timeline"
                title="Your Bachelorette Party Day Timeline"
                description="What to expect on your Lake Travis bachelorette party cruise"
                data={[
                  {
                    time: "11:45 AM",
                    title: "Arrival at Anderson Mill Marina",
                    description: "Check in at the dock, meet your captain, load coolers onto the boat. Free parking available. Bachelorette groups gather and get ready to celebrate the bride.",
                    icon: <MapPin className="w-4 h-4 text-white" />,
                    duration: "15 min"
                  },
                  {
                    time: "12:00 PM",
                    title: "Boarding & Departure",
                    description: "Board your chosen boat (ATX Disco or private charter), safety briefing from captain, music starts playing, mimosas flowing, cruise begins on Lake Travis.",
                    icon: <Ship className="w-4 h-4 text-white" />,
                    duration: "15 min"
                  },
                  {
                    time: "12:30 PM",
                    title: "Party at Popular Coves",
                    description: "Anchor at Devil's Cove or similar spots, swimming and floating on lily pads, DJ playing (Disco cruise), drinks flowing, bachelorette party games and celebrating the bride.",
                    icon: <Anchor className="w-4 h-4 text-white" />,
                    duration: "2.5 hours"
                  },
                  {
                    time: "3:00 PM",
                    title: "Scenic Cruise & Photos",
                    description: "Cruise scenic parts of Lake Travis, group photos with the bride, more swimming stops if requested, enjoying the Texas sun and celebrating your girls' weekend.",
                    icon: <Camera className="w-4 h-4 text-white" />,
                    duration: "45 min"
                  },
                  {
                    time: "4:00 PM",
                    title: "Return to Marina",
                    description: "Head back to Anderson Mill Marina, last songs and celebrations, dock and disembark, continue the bachelorette party in Austin!",
                    icon: <Navigation className="w-4 h-4 text-white" />,
                    duration: "15 min"
                  }
                ]}
              />
              
              <AIOptimizedSection
                type="list"
                title="Bachelorette Party Group Size Guide"
                description="Choose the perfect boat for your bride tribe size"
                data={[
                  {
                    title: "Intimate Bride Tribes (6-10 girls)",
                    description: "Perfect for close friends. Book Day Tripper private boat or join ATX Disco Cruise. Tight-knit vibe, everyone knows each other, easier coordination for the maid of honor.",
                    icon: <Users className="w-5 h-5" />,
                    badge: "Close Friends"
                  },
                  {
                    title: "Standard Bachelorette Parties (11-20 girls)",
                    description: "Most common size. Book Meeseeks or Irony private boats, or multiple Disco Cruise tickets. Great party energy, mix of friend groups, perfect for bachelorette celebrations.",
                    icon: <Users className="w-5 h-5" />,
                    badge: "Most Popular",
                    highlighted: true
                  },
                  {
                    title: "Large Girls' Weekend (21-40 girls)",
                    description: "Big bachelorette blowouts! Book Clever Girl (75 capacity) or combine boats. Epic party atmosphere, multiple friend groups, unforgettable bride celebration experience.",
                    icon: <Users className="w-5 h-5" />,
                    badge: "Go Big"
                  },
                  {
                    title: "Mega Bride Tribes (40+ girls)",
                    description: "Combine bachelorette/bachelor parties or book multiple boats. Contact us for custom packages. Ultimate Lake Travis girls' weekend takeover!",
                    icon: <Users className="w-5 h-5" />,
                    badge: "Custom Package"
                  }
                ]}
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* AI-Optimized Success Metrics */}
      <SectionReveal>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <AIOptimizedSection
              type="statistics"
              title="Bachelorette Party Success by the Numbers"
              description="Why Austin bachelorette parties choose Premier Party Cruises"
              data={[
                {
                  value: "10,000+",
                  label: "Bachelorette Parties Hosted",
                  icon: <Crown className="w-8 h-8" />,
                  itemProp: "numberOfBacheloretteParties"
                },
                {
                  value: "100%",
                  label: "Satisfaction Rate",
                  icon: <Trophy className="w-8 h-8" />,
                  itemProp: "satisfactionRate"
                },
                {
                  value: "4 Hours",
                  label: "Of Girls' Weekend Fun",
                  icon: <Clock className="w-8 h-8" />,
                  itemProp: "duration"
                },
                {
                  value: "$95",
                  label: "Average Per Person",
                  icon: <DollarSign className="w-8 h-8" />,
                  itemProp: "averagePrice"
                },
                {
                  value: "5 Stars",
                  label: "Average Bride Review",
                  icon: <Star className="w-8 h-8" />,
                  itemProp: "rating"
                }
              ]}
              className="max-w-6xl mx-auto"
              schemaType="Event"
              structuredData={{
                "@context": "https://schema.org",
                "@type": "Event",
                "name": "Austin Bachelorette Party Boat Cruise",
                "description": "Bachelorette party boat cruises on Lake Travis, Austin Texas",
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
      <PartyPlanningChecklist partyType="Bachelorette Party" eventType="bachelorette celebration" />

      {/* Featured Snippets and SEO Content - NOW AT BOTTOM */}
      <SectionReveal>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto space-y-8">
              <FeaturedSnippet
                question="What is an Austin bachelorette party boat cruise?"
                answer="An Austin bachelorette party boat cruise is a 4-hour celebration on Lake Travis specifically designed for bachelorette parties. The ATX Disco Cruise features professional DJ services, photography, giant floats, and an epic party atmosphere that makes every bride's celebration unforgettable. The bride cruises FREE with premium packages!"
                format="paragraph"
              />
              
              <FeaturedSnippet
                question="What is included in a bachelorette party boat cruise?"
                answer="All bachelorette party cruises include: Professional DJ playing bride's favorites, professional photographer capturing memories, giant lily pad floats (6x20'), disco ball cups and party supplies, private cooler with ice, mimosa supplies with champagne flutes, ice water stations, clean restrooms, and shaded lounge areas. Premium packages include the bride cruising FREE, alcohol delivery, and personalized bride items."
                format="paragraph"
              />

              <FeaturedSnippet
                question="How much does an Austin bachelorette party boat cost?"
                answer="Austin bachelorette party boat cruises start at $85/person for the Basic Bach Package ($109 with tax & tip). The most popular Disco Queen Package is $95/person ($122 with tax & tip) and includes the BRIDE CRUISING FREE. The all-inclusive Super Sparkle Platinum package is $105/person ($135 with tax & tip) and includes the bride free plus a personal unicorn float, pre-stocked cooler, and full concierge service."
                format="paragraph"
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Quick Answer Boxes - MOVED TO BOTTOM */}
      <SectionReveal>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <QuickAnswerBoxGroup
              title="Quick Answers for Bachelorette Parties"
              boxes={[
                {
                  id: 'decorations-provided',
                  question: 'Do you provide decorations?',
                  answer: 'Basic decorations included with all packages! We provide disco ball cups, bubble guns, and party supplies. Higher packages include personalized items for the bride and premium decorations. You\'re welcome to bring additional custom decorations to personalize your celebration.',
                  keywords: ['decorations', 'disco ball cups', 'bubble guns', 'bride'],
                  icon: Sparkles,
                  relatedLink: {
                    href: '#whats-included',
                    text: 'See what\'s included'
                  }
                },
                {
                  id: 'bathroom-available',
                  question: 'Is there a bathroom on the boat?',
                  answer: 'Yes, all boats have clean, private restroom facilities onboard for your comfort. Our boats are equipped with flushing toilets and handwashing stations. The restrooms are maintained throughout the cruise and stocked with necessary supplies.',
                  keywords: ['bathroom', 'restroom', 'facilities', 'comfort'],
                  icon: Shield,
                  relatedLink: {
                    href: '/faq',
                    text: 'View all FAQs'
                  }
                }
              ]}
              columns={2}
              className="max-w-5xl mx-auto"
            />
          </div>
        </section>
      </SectionReveal>

      {/* Related Services Section - AT BOTTOM */}
      <SectionReveal>
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6">
            <RelatedServicesSection
              title="Other Party Options for Your Girls' Weekend"
              description="Explore more celebration options on Lake Travis"
              services={[
                {
                  title: "Bachelor Parties",
                  description: "Epic bachelor party cruises on Lake Travis",
                  href: "/bachelor-party-austin",
                  icon: <Users className="h-8 w-8" />
                },
                {
                  title: "Private Boat Rentals",
                  description: "Book a private boat for your entire bride tribe",
                  href: "/private-cruises",
                  icon: <Ship className="h-8 w-8" />
                },
                {
                  title: "ATX Disco Cruise",
                  description: "Join the legendary party boat experience",
                  href: "/atx-disco-cruise",
                  icon: <Music className="h-8 w-8" />
                }
              ]}
            />
          </div>
        </section>
      </SectionReveal>

      <RelatedLinks
        title="Other Party Options in Austin"
        links={[
          { href: '/bachelor-party-austin', label: 'Bachelor Parties', description: 'Epic bachelor party cruises on Lake Travis' },
          { href: '/private-cruises', label: 'Private Boat Rentals', description: 'Book a private boat for your group' },
          { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', description: 'Join the legendary party boat experience' },
          { href: '/team-building', label: 'Team Building Events', description: 'Corporate events on Lake Travis' },
        ]}
      />

      <Footer />
    </div>
  );
}

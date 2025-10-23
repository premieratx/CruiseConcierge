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
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, 
  Zap, Target, Play,
  MessageSquare, Ticket, Gift, Disc3, Volume2, 
  Mic, Utensils, GlassWater, UserCheck, Leaf, Check,
  AlertCircle, DollarSign, Timer, CreditCard, CloudRain, 
  HelpCircle, Anchor, Droplets, Waves, Info, TrendingUp, X, Package,
  Plane, Wine, Eye, Smile, Navigation
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import Breadcrumb from '@/components/Breadcrumb';
import { FeaturedSnippet, FeaturedSnippetHowTo } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';
import { WhatToBring } from '@/components/WhatToBring';
import { PricingTable } from '@/components/PricingTable';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { SectionReveal } from '@/components/SectionReveal';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TableOfContents } from '@/components/TableOfContents';
import { StickyCTA } from '@/components/StickyCTA';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { TransportationGuide } from '@/components/TransportationGuide';
import { LazyImage } from '@/components/LazyImage';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.webp';
import heroImage2 from '@assets/party-atmosphere-1.webp';
import heroImage3 from '@assets/party-atmosphere-2.webp';
import galleryImage1 from '@assets/day-tripper-14-person-boat.webp';
import galleryImage2 from '@assets/meeseeks-25-person-boat.webp';
import galleryImage3 from '@assets/clever-girl-50-person-boat.webp';
import discoImage1 from '@assets/atx-disco-cruise-party.webp';
import discoImage2 from '@assets/dancing-party-scene.webp';
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

// ATX Disco Cruise packages with PDF content
const discoPackages = [
  {
    id: 'basic',
    name: 'Basic Bach Package',
    price: DISCO_PRICING.basic / 100,
    originalPrice: null,
    description: 'Join the ultimate bachelor party cruise',
    subtitle: 'BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise',
    features: [
      'Join the ultimate bachelor party cruise',
      'BYOB with shared cooler and ice',
      'Alcohol & food delivery available',
      'Professional DJ and photographer',
      'Giant floats and party atmosphere',
      'Always cheaper than private cruises'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value'
  },
  {
    id: 'disco_king',
    name: 'Disco King Package',
    price: DISCO_PRICING.disco_queen / 100,
    originalPrice: 110,
    description: 'Enhanced bachelor party experience with premium perks',
    subtitle: 'Private Cooler & Reserved Spot for Your Group',
    features: [
      'Private cooler with ice for your group',
      'Reserved spot on the boat',
      'Disco visor & ball necklace for groom',
      'Complimentary alcohol & lunch delivery',
      '25% discount on transportation',
      '$50-$100 Airbnb delivery voucher',
      'Everything from Basic Bach'
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
    description: 'Ultimate all-inclusive Austin bachelor party luxury',
    subtitle: 'Nothing to Carry, Cooler Stocked w/drinks When You Arrive!',
    features: [
      'Personal unicorn float for the groom',
      'Mimosa setup with fruit juice & champagne flutes',
      '$100 Airbnb concierge voucher',
      'Towel service & SPF-50 sunscreen',
      'Cooler pre-stocked when you arrive',
      'Everything from Disco King'
    ],
    popular: false,
    icon: Trophy,
    badge: 'All-Inclusive VIP'
  }
];

// Complete list of what's included from PDF
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
    description: 'For your group'
  },
  {
    icon: GlassWater,
    title: 'Mimosa Supplies',
    description: 'With juice and fruit'
  },
  {
    icon: Waves,
    title: 'Multiple Giant Lily Pad Floats',
    description: '6x20 feet'
  },
  {
    icon: Gift,
    title: 'Party Supplies',
    description: 'Including cups and koozies'
  },
  {
    icon: Droplets,
    title: 'Ice Water Stations',
    description: 'For hydration'
  },
  {
    icon: Shield,
    title: 'Clean Restroom Facilities',
    description: 'On board'
  },
  {
    icon: Sun,
    title: 'Shaded Areas',
    description: 'To escape the sun'
  },
  {
    icon: Users,
    title: 'Party Atmosphere',
    description: 'With other bachelor groups'
  }
];

// FAQs with corrected content
const faqItems = [
  {
    id: 'refund-policy',
    question: 'Do you offer a refund window after booking?',
    answer: "Yes—48 hours after booking for a full refund. After that, weather rules apply at captain's discretion."
  },
  {
    id: 'split-payment',
    question: 'Can we split payments?',
    answer: 'Yes. Split payment options are available at checkout.'
  },
  {
    id: 'attire',
    question: 'Is disco attire required?',
    answer: 'Encouraged but not required.'
  },
  {
    id: 'weather-policy',
    question: 'What happens in bad weather?',
    answer: 'Rain or shine. For severe weather, we move to Lemonade Disco (land venue).',
    answerJsx: (
      <>
        Rain or shine. For severe weather, we move to{' '}
        <a href="#lemonade-disco" className="text-brand-blue hover:underline font-semibold">
          Lemonade Disco
        </a>{' '}
        (land venue).
      </>
    )
  },
  {
    id: 'add-people',
    question: 'Can we add people after booking?',
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
  { id: 1, src: heroImage1, alt: 'Bachelor Party Austin group celebrating on Lake Travis party boat' },
  { id: 2, src: discoImage1, alt: 'Austin Bachelor Party ATX Disco Cruise on Party Boat Lake Travis' },
  { id: 3, src: galleryImage1, alt: 'Lake Travis Bachelor Party Day Tripper boat cruise' },
  { id: 4, src: discoImage2, alt: 'Bachelor Party Austin dancing on Party Boat Lake Travis cruise' },
  { id: 5, src: galleryImage2, alt: 'Austin Bachelor Party Boat Meeseeks on Lake Travis' },
  { id: 6, src: floatImage, alt: 'Lake Travis Bachelor Party giant unicorn float on Party Boat Austin' },
  { id: 7, src: galleryImage3, alt: 'Bachelor Party Austin Clever Girl boat on Lake Travis' },
  { id: 8, src: heroImage2, alt: 'Austin Bachelor Party Boat atmosphere on Lake Travis' }
];

// Table of Contents sections
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
        pageRoute="/bachelor-party-austin"
        defaultTitle="Bachelor Party Boat | Premier Austin"
        defaultDescription="Lake Travis bachelor party cruises. ATX Disco with DJ & photographer. Groom cruises FREE. From $85/person. Book now!"
        defaultKeywords={['Austin bachelor party', 'Lake Travis bachelor party', 'ATX Disco Cruise', 'bachelor party boat Austin']}
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
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
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
                alt="Bachelor party Austin cruise on Lake Travis - ATX Disco party boat with DJ and entertainment"
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
              <Badge className="font-sans tracking-wider font-bold uppercase text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 border-0">
                Premier Lake Travis Experience
              </Badge>
            </motion.div>
            
            {/* CRITICAL: H1 with text-6xl and font-playfair - Largest text on page */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold font-playfair mb-6 text-center leading-tight"
              data-editable 
              data-editable-id="bachelor-hero-title"
            >
              Austin Bachelor Party Boat Rentals
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              className="text-2xl md:text-3xl text-brand-yellow font-semibold mb-6"
            >
              Lake Travis Ultimate Cruise Experience
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
              data-editable 
              data-editable-id="bachelor-hero-subtitle"
            >
              Exclusively for <InternalLinkHighlight href="/bachelorette-party" title="Bachelorette Parties">Bachelorette</InternalLinkHighlight> & Bachelor Parties<br/>
              <span className="text-lg md:text-xl">The Highlight of Your Weekend Every. Damn. Time.</span>
            </motion.p>

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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-10 py-7 whitespace-normal min-h-[4rem]"
                data-testid="button-hero-book-now-bachelor"
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
        <div className="relative z-20 w-full bg-white/95 backdrop-blur-sm py-6 px-6 border-t-4 border-brand-yellow">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-lg md:text-xl font-bold">
              Just <span className="text-brand-blue">SHOW UP & GET DOWN</span> - Everything Included!
            </p>
          </div>
        </div>
      </section>

      {/* 2. EXPERIENCE DESCRIPTION */}
      <SectionReveal>
        <section id="experience" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Trophy className="h-4 w-4 mr-2 inline" />
                The Premier Experience
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                What Makes Our Bachelor Parties Special
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                From epic <InternalLinkHighlight href="/atx-disco-cruise" title="ATX Disco Cruise">ATX Disco Cruises</InternalLinkHighlight> to exclusive <InternalLinkHighlight href="/private-cruises" title="Private Cruises">private charters</InternalLinkHighlight>, we deliver unforgettable bachelor party experiences on Lake Travis. Also perfect for <InternalLinkHighlight href="/bachelorette-party" title="Bachelorette Parties">bachelorette celebrations</InternalLinkHighlight>!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
              {/* ATX Disco Cruise Experience */}
              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <Music className="h-10 w-10 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl text-center font-playfair">ATX Disco Cruise</CardTitle>
                  <CardDescription className="text-center text-base">
                    The Ultimate Party Boat Experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Join bachelor parties from across the country on our legendary <InternalLinkHighlight href="/atx-disco-cruise" title="ATX Disco Cruise">ATX Disco Cruise</InternalLinkHighlight>. Professional DJ, photographer, giant floats, and an electric atmosphere make this the highlight of your Austin weekend. <InternalLinkHighlightWithArrow href="/" title="Home">Explore all our party cruise options</InternalLinkHighlightWithArrow>
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Professional DJ & Photographer included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Meet bachelor groups from all over</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Giant unicorn float & lily pads</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">BYOB - Bring your own beverages</span>
                    </li>
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="text-center mb-4">
                      <span className="text-gray-600">Starting from</span>
                      <div className="text-4xl font-bold text-purple-600">${DISCO_PRICING.basic / 100}</div>
                      <span className="text-gray-600">per person</span>
                    </div>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
                      onClick={() => handleGetQuote('basic')}
                    >
                      View Disco Packages
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Private Charter Experience */}
              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Ship className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-center font-playfair">Private Charters</CardTitle>
                  <CardDescription className="text-center text-base">
                    Exclusive Boat for Your Crew
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Want the boat all to yourselves? <InternalLinkHighlight href="/private-cruises" title="Private Cruises">Book a private charter</InternalLinkHighlight> for complete control over music, schedule, and activities. Perfect for bachelor groups who want privacy and customization.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Entire boat for your group (14-75 capacity)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Full control over music & schedule</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Flexible departure times</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Bring your own decorations</span>
                    </li>
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="text-center mb-4">
                      <span className="text-gray-600">Starting from</span>
                      <div className="text-4xl font-bold text-blue-600">$200</div>
                      <span className="text-gray-600">per hour (4-hour minimum)</span>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                      onClick={() => handleGetQuote('private')}
                    >
                      View Private Options
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 3. PRICING & PACKAGES */}
      <SectionReveal>
        <section id="packages" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Package className="h-4 w-4 mr-2 inline" />
                Pricing & Packages
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Choose Your Bachelor Party Package
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Select the perfect package for your crew - from budget-friendly to all-inclusive VIP
              </p>
            </div>

            {/* ATX Disco Cruise Packages */}
            <div className="mb-16">
              <h3 className="text-3xl font-semibold font-playfair text-center mb-12">ATX Disco Cruise Packages</h3>
              
              <PricingTable
                packages={discoPackages.map(pkg => ({
                  ...pkg,
                  ctaLink: '/book'
                }))}
                variant="disco"
                showTaxAndGratuity={true}
                showDeposit={true}
              />

              <div className="text-center mt-8">
                <p className="text-lg mb-4 text-gray-700">
                  All packages include: DJ, Photographer, Floats, Party Supplies & More!
                </p>
                <Badge className="bg-green-600 text-white px-6 py-2">
                  <TrendingUp className="h-4 w-4 mr-2 inline" />
                  Group Discounts Available for 10+ People
                </Badge>
              </div>
            </div>

            {/* Private Charter Packages */}
            <div>
              <h3 className="text-3xl font-semibold font-playfair text-center mb-6">Private Charter Options</h3>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Want your own private boat? Choose from our three package tiers - all 4-hour cruises starting from $200/hour.
              </p>

              <PricingTable
                variant="private"
                dayType="weekend"
                groupSize={20}
                duration={4}
                showTaxAndGratuity={true}
                showDeposit={true}
              />
            </div>

            {/* Disco vs Private Comparison */}
            <div className="mt-16 max-w-5xl mx-auto">
              <h3 className="text-3xl font-semibold font-playfair text-center mb-8">Disco Cruise vs Private Charter</h3>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                          Feature
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                          Disco Cruise
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                          Private Charter
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Professional DJ</td>
                        <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                        <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Professional Photographer</td>
                        <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                        <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Private Boat (Entire Boat for Your Group)</td>
                        <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                        <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Custom Music Control</td>
                        <td className="px-6 py-4 text-center text-xs text-gray-600">DJ Curated</td>
                        <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Flexible Departure Times</td>
                        <td className="px-6 py-4 text-center text-xs text-gray-600">Set Schedule</td>
                        <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Giant Lily Pad Floats</td>
                        <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                        <td className="px-6 py-4 text-center text-xs text-gray-600">Add-on: $100/hr</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">Party Supplies Included</td>
                        <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                        <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Price Range */}
                <div className="grid md:grid-cols-2 divide-x divide-gray-200 bg-gray-50">
                  <div className="px-8 py-6 text-center">
                    <h3 className="text-lg font-bold text-purple-600 mb-2">Disco Cruise</h3>
                    <p className="text-4xl font-bold text-gray-900">${DISCO_PRICING.basic / 100}-${DISCO_PRICING.platinum / 100}</p>
                    <p className="text-sm text-gray-600 mt-1">per person (4 hours)</p>
                    <p className="text-xs text-gray-600 mt-2">Best for groups of 10-50</p>
                  </div>
                  <div className="px-8 py-6 text-center">
                    <h3 className="text-lg font-bold text-blue-600 mb-2">Private Charter</h3>
                    <p className="text-4xl font-bold text-gray-900">$200-$250/hr</p>
                    <p className="text-sm text-gray-600 mt-1">(4-hour minimum)</p>
                    <p className="text-xs text-gray-600 mt-2">Best for groups of 6-75</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 4. AVAILABILITY & BOOKING */}
      <SectionReveal>
        <section id="availability" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Calendar className="h-4 w-4 mr-2 inline" />
                Availability & Booking
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                When Can You Book Your Bachelor Party?
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We operate year-round on Lake Travis with flexible scheduling for your celebration
              </p>
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              <Card className="border-2 border-yellow-200 hover:border-yellow-400 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Sun className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Morning Cruises</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-blue-600 mb-3">9am - 1pm</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Perfect for early risers and calm waters
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-300 hover:border-blue-500 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Afternoon Cruises</CardTitle>
                  <Badge className="mt-2 bg-blue-600 text-white">Most Popular</Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-blue-600 mb-3">2pm - 6pm</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Peak party time on Lake Travis
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <Waves className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Evening Cruises</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-purple-600 mb-3">7pm - 11pm</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Sunset views and night celebrations
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
                      Check availability on our calendar. Peak weekends (April-September) book up 4-6 weeks in advance. Book early!
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
                      Choose between ATX Disco Cruise (Basic, Disco King, or Platinum) or Private Charter. Each has unique benefits for your crew.
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
                      Secure your booking with a 50% deposit. Final payment due 48 hours before the cruise. Full refund within 48 hours of booking.
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

      {/* 5. BENEFITS - Why Choose Premier */}
      <SectionReveal>
        <section id="benefits" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Trophy className="h-4 w-4 mr-2 inline" />
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Why Bachelor Parties Choose Premier
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                15+ years of bachelor party expertise on Lake Travis with 10,000+ successful celebrations
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
                  <CardTitle className="text-xl font-bold">10,000+ Bachelor Parties</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700 leading-relaxed">
                    We've hosted over 10,000 bachelor parties with perfect safety record and 5-star reviews.
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
                    Coast Guard certified captains and pristine safety record. Your crew's safety is our top priority.
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

      {/* 6. FEATURES & WHAT'S INCLUDED */}
      <SectionReveal>
        <section id="whats-included" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
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

      {/* 7. WHY CHOOSE PREMIER - Trust Signals */}
      <SectionReveal>
        <section id="why-choose" className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="max-w-7xl mx-auto px-6">
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

            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-6xl font-bold text-brand-yellow mb-2">15+</div>
                <div className="text-xl text-white">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-brand-yellow mb-2">10K+</div>
                <div className="text-xl text-white">Bachelor Parties</div>
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
                Join 10,000+ Happy Bachelor Parties
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

      {/* 9. TESTIMONIALS/REVIEWS */}
      <SectionReveal>
        <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Quote className="h-4 w-4 mr-2 inline" />
                Customer Reviews
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                What Bachelor Parties Are Saying
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                Check out our verified reviews on Google and Facebook to see what real customers are saying about their bachelor party experiences on Lake Travis!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-lg px-10 py-6"
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
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-lg px-10 py-6"
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
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-6"
                >
                  Book Your Bachelor Party Today
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
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <HelpCircle className="h-4 w-4 mr-2 inline" />
                FAQs
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Everything you need to know about bachelor parties on Lake Travis
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-2 border-gray-200 rounded-lg px-6 hover:border-blue-300 transition-colors"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-blue-600 py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-6 text-base">
                    {item.answerJsx || item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Still Have Questions?</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our bachelor party experts are here to help you plan the perfect Lake Travis celebration
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => handleGetQuote()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start a Conversation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('tel:+15127705050')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold"
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
                title="Your Bachelor Party Day Timeline"
                description="What to expect on your Lake Travis bachelor party cruise"
                data={[
                  {
                    time: "11:45 AM",
                    title: "Arrival at Anderson Mill Marina",
                    description: "Check in at the dock, meet your captain, load coolers onto the boat. Free parking available. Bachelor party groups gather and get ready.",
                    icon: <MapPin className="w-4 h-4 text-white" />,
                    duration: "15 min"
                  },
                  {
                    time: "12:00 PM",
                    title: "Boarding & Departure",
                    description: "Board your chosen boat (ATX Disco or private charter), safety briefing from captain, music starts playing, cruise begins on Lake Travis.",
                    icon: <Ship className="w-4 h-4 text-white" />,
                    duration: "15 min"
                  },
                  {
                    time: "12:30 PM",
                    title: "Party at Popular Coves",
                    description: "Anchor at Devil's Cove or similar spots, swimming and floating on lily pads, DJ playing (Disco cruise), drinks flowing, bachelor party games.",
                    icon: <Anchor className="w-4 h-4 text-white" />,
                    duration: "2.5 hours"
                  },
                  {
                    time: "3:00 PM",
                    title: "Scenic Cruise & Photos",
                    description: "Cruise scenic parts of Lake Travis, group photos with the groom, more swimming stops if requested, enjoying the Texas sun and views.",
                    icon: <Camera className="w-4 h-4 text-white" />,
                    duration: "45 min"
                  },
                  {
                    time: "4:00 PM",
                    title: "Return to Marina",
                    description: "Head back to Anderson Mill Marina, last songs and celebrations, dock and disembark, continue the party in Austin!",
                    icon: <Navigation className="w-4 h-4 text-white" />,
                    duration: "15 min"
                  }
                ]}
              />
              
              <AIOptimizedSection
                type="list"
                title="Bachelor Party Group Size Guide"
                description="Choose the perfect boat for your crew size"
                data={[
                  {
                    title: "Intimate Groups (8-12 guys)",
                    description: "Perfect for close friends. Book Day Tripper private boat or join ATX Disco Cruise. Tight-knit vibe, everyone knows each other, easier coordination.",
                    icon: <Users className="w-5 h-5" />,
                    badge: "Close Friends"
                  },
                  {
                    title: "Standard Bachelor Parties (13-25 guys)",
                    description: "Most common size. Book Meeseeks or Irony private boats, or multiple Disco Cruise tickets. Great party energy, mix of friend groups, perfect for bachelor celebrations.",
                    icon: <Users className="w-5 h-5" />,
                    badge: "Most Popular",
                    highlighted: true
                  },
                  {
                    title: "Large Celebrations (26-50 guys)",
                    description: "Big bachelor blowouts! Book Clever Girl (75 capacity) or combine boats. Epic party atmosphere, multiple friend groups, unforgettable experience.",
                    icon: <Users className="w-5 h-5" />,
                    badge: "Go Big"
                  },
                  {
                    title: "Mega Groups (50+ guys)",
                    description: "Combine bachelor/bachelorette parties or book multiple boats. Contact us for custom packages. Ultimate Lake Travis takeover!",
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
              title="Bachelor Party Success by the Numbers"
              description="Why Austin bachelor parties choose Premier Party Cruises"
              data={[
                {
                  value: "10,000+",
                  label: "Bachelor Parties Hosted",
                  icon: <Crown className="w-8 h-8" />,
                  itemProp: "numberOfBachelorParties"
                },
                {
                  value: "100%",
                  label: "Satisfaction Rate",
                  icon: <Trophy className="w-8 h-8" />,
                  itemProp: "satisfactionRate"
                },
                {
                  value: "4 Hours",
                  label: "Of Epic Celebration",
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
                  label: "Average Bachelor Review",
                  icon: <Star className="w-8 h-8" />,
                  itemProp: "rating"
                }
              ]}
              className="max-w-6xl mx-auto"
              schemaType="Event"
              structuredData={{
                "@context": "https://schema.org",
                "@type": "Event",
                "name": "Austin Bachelor Party Boat Cruise",
                "description": "Bachelor party boat cruises on Lake Travis, Austin Texas",
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
      <PartyPlanningChecklist partyType="Bachelor Party" eventType="bachelor celebration" />

      {/* Featured Snippets and SEO Content */}
      <SectionReveal>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto space-y-12">
              <FeaturedSnippet
                question="What is the best bachelor party boat in Austin?"
                answer="Premier Party Cruises offers the best bachelor party boat experiences in Austin on Lake Travis. With 15+ years of experience, 10,000+ bachelor parties hosted, and packages starting at $85/person for ATX Disco Cruises or $200/hour for private charters, Premier delivers professional DJ services, photography, giant floats, and an epic party atmosphere that makes every bachelor celebration unforgettable."
                cite="Premier Party Cruises - Austin's #1 Bachelor Party Boat Company"
              />

              <FeaturedSnippetHowTo
                title="How to Book a Bachelor Party Boat in Austin"
                steps={[
                  "Choose your preferred date on Lake Travis (book 4-6 weeks in advance for peak season)",
                  "Select your package: ATX Disco Cruise (Basic $85, Disco King $95, Platinum $105) or Private Charter ($200-250/hour)",
                  "Pay 50% deposit to secure your booking (full refund within 48 hours)",
                  "Final payment due 48 hours before cruise",
                  "Arrive 15 minutes early at Anderson Mill Marina with your crew and beverages"
                ]}
                estimatedTime="4 hours"
                description="Simple 5-step process to book the ultimate Austin bachelor party boat experience on Lake Travis"
              />

              <QuickAnswerBoxGroup
                title="Bachelor Party Austin - Quick Answers"
                boxes={[
                  {
                    id: 'bachelor-cost',
                    question: 'How much does a bachelor party boat cost in Austin?',
                    answer: 'Austin bachelor party boats range from $85-$105 per person for ATX Disco Cruises (includes DJ, photographer, floats) or $200-$250 per hour for private charters with 4-hour minimums. Disco cruises are typically cheaper for groups under 15 people.',
                    keywords: ['cost', 'pricing', 'budget', 'per person'],
                    icon: DollarSign
                  },
                  {
                    id: 'bachelor-what-included',
                    question: 'What is included in a bachelor party boat cruise?',
                    answer: 'Bachelor party boat cruises include professional captain and crew, premium sound system, coolers with ice, all safety equipment, and fuel. ATX Disco Cruises also include professional DJ, photographer, giant floats, party supplies, and reserved seating. Private charters offer full music control and flexible timing.',
                    keywords: ['included', 'amenities', 'features'],
                    icon: CheckCircle
                  },
                  {
                    id: 'bachelor-byob',
                    question: 'Can we bring alcohol on the bachelor party boat?',
                    answer: 'Yes! All bachelor party boats are BYOB (Bring Your Own Booze) for guests 21+. Cans and plastic containers only. Coolers with ice and cups are provided. You can also order from Party On Delivery - they deliver alcohol directly to your boat at the marina, so you don\'t have to carry anything!',
                    keywords: ['BYOB', 'alcohol', 'drinks', 'beverages'],
                    icon: Wine
                  },
                  {
                    id: 'bachelor-group-size',
                    question: 'What size groups can you accommodate?',
                    answer: 'Bachelor party groups from 8-75+ people. Disco Cruises work best for 8-30 people. Private charters available for 14-person boats (Day Tripper), 25-person boats (Meeseeks/Irony), or 50-75 person boats (Clever Girl flagship). For 50+ people, we can arrange multiple boats.',
                    keywords: ['group size', 'capacity', 'how many people'],
                    icon: Users
                  }
                ]}
                columns={2}
              />

              <RelatedServicesSection
                title="Related Austin Party Boat Services"
                services={[
                  {
                    title: "Bachelorette Party Austin",
                    description: "Austin's #1 bachelorette party boat experience with ATX Disco Cruises on Lake Travis. Professional DJ, photographer, and VIP treatment for the bride.",
                    href: "/bachelorette-party-austin",
                    icon: <Heart className="h-6 w-6" />
                  },
                  {
                    title: "ATX Disco Cruise",
                    description: "Join the legendary ATX Disco Cruise on Lake Travis. Professional DJ, photographer, giant floats, and the ultimate party atmosphere for epic celebrations!",
                    href: "/atx-disco-cruise",
                    icon: <Music className="h-6 w-6" />
                  },
                  {
                    title: "Private Lake Travis Charters",
                    description: "Rent a private boat on Lake Travis for your group. Choose from Day Tripper (14), Meeseeks (25), or Clever Girl (75) with full customization.",
                    href: "/private-cruises",
                    icon: <Ship className="h-6 w-6" />
                  },
                  {
                    title: "ATX Disco Cruise",
                    description: "Join the legendary ATX Disco Cruise every Saturday on Lake Travis. Professional DJ, photographer, giant floats, and the ultimate party atmosphere.",
                    href: "/atx-disco-cruise",
                    icon: <Music className="h-6 w-6" />
                  }
                ]}
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Related Links */}
      <RelatedLinks />

      {/* Footer */}
      <Footer />
    </div>
  );
}

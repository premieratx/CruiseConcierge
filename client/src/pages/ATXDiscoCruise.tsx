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
import { DISCO_PRICING } from '@shared/constants';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
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
import { FeaturedSnippet } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';
import { WhatToBring } from '@/components/WhatToBring';
import { PricingTable } from '@/components/PricingTable';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { TableOfContents } from '@/components/TableOfContents';
import { StickyCTA } from '@/components/StickyCTA';
import { LazyImage } from '@/components/LazyImage';

import heroImage1 from '@assets/atx-disco-cruise-party.webp';
import heroImage2 from '@assets/dancing-party-scene.webp';
import heroImage3 from '@assets/bachelor-party-group-guys.webp';
import galleryImage1 from '@assets/party-atmosphere-1.webp';
import galleryImage2 from '@assets/party-atmosphere-2.webp';
import galleryImage3 from '@assets/party-atmosphere-3.webp';
import floatImage from '@assets/giant-unicorn-float.webp';

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

const discoPackages = [
  {
    id: 'basic',
    name: 'Basic Bach Package',
    price: DISCO_PRICING.basic / 100,
    originalPrice: null,
    description: 'Join the BEST Party on Lake Travis, Exclusively for Bach Parties!',
    subtitle: 'BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise',
    features: [
      'Full 4-hour Lake Travis cruise experience',
      'Professional DJ entertainment all day',
      'Professional photographer capturing memories',
      'Digital photo delivery after the event',
      'Giant unicorn float access',
      'Multi-group party atmosphere',
      'BYOB with shared coolers & ice',
      'Alcohol delivery & lunch delivery available'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value'
  },
  {
    id: 'disco_queen',
    name: 'Disco Queen Package',
    price: DISCO_PRICING.disco_queen / 100,
    originalPrice: 110,
    description: 'Enhanced party experience with private cooler and reserved spot',
    subtitle: 'Private Cooler & Reserved Spot for Your Group',
    features: [
      'Everything in Basic Bach Package',
      'Private cooler with ice & storage bin for your group',
      'Reserved spot for your group on the boat',
      'Disco ball cup & bubble gun for guest of honor',
      'Direct-to-boat alcohol & lunch delivery',
      '25% discount on round-trip transportation'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'platinum',
    name: 'Super Sparkle Platinum Disco',
    price: DISCO_PRICING.platinum / 100,
    originalPrice: 125,
    description: 'Ultimate all-inclusive party experience with maximum celebration',
    subtitle: 'Nothing to Carry, Cooler Stocked When You Arrive!',
    features: [
      'Everything in Disco Queen Package',
      'Personal unicorn float for guest of honor',
      'Mimosa setup with champagne flutes, 3 juices & chambong',
      'Towel service & SPF-50 spray sunscreen provided',
      'Nothing to carry - cooler pre-stocked with drinks when you arrive'
    ],
    popular: false,
    icon: Trophy,
    badge: 'All-Inclusive'
  }
];

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
    title: 'Shared Coolers with Ice',
    description: 'BYOB - bring your drinks, we provide coolers and ice'
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
    time: 'Hour 1: Boarding & Meet-Up',
    title: 'Welcome Aboard!',
    description: 'Arrive at Anderson Mill Marina, meet your fellow party-goers from across the country, get your drinks in the coolers, and let the DJ get the energy going!',
    icon: Ship,
    color: 'from-purple-500 to-pink-500'
  },
  {
    time: 'Hour 2: Party Starts',
    title: 'Full Party Mode',
    description: 'DJ cranking hits, photographer capturing moments, floats deployed! Dance, mingle with other bach parties, and experience the legendary multi-group energy.',
    icon: Music,
    color: 'from-pink-500 to-orange-500'
  },
  {
    time: 'Hour 3: Peak Celebration',
    title: 'Maximum Fun',
    description: 'The party is at its peak! Floats in full use, dancing non-stop, making friends with groups from Dallas, Houston, California, and beyond. Pure celebration!',
    icon: PartyPopper,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    time: 'Hour 4: Grand Finale',
    title: 'Epic Send-Off',
    description: 'Final dance party, group photos with your new friends, exchange numbers, and leave with unforgettable memories. The best bach party experience, guaranteed!',
    icon: Trophy,
    color: 'from-yellow-500 to-green-500'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'Bride',
    location: 'Austin, TX',
    rating: 5,
    text: "This was LEGENDARY! We met bachelorette parties from California, Chicago, and Dallas - made so many friends! The DJ was incredible, photographer got AMAZING shots, and the vibe was absolutely electric. Best. Bach. Party. EVER!",
    avatar: '👰',
    package: 'Disco Queen Package'
  },
  {
    id: 2,
    name: 'Jake T.',
    role: 'Best Man',
    location: 'Dallas, TX',
    rating: 5,
    text: "I planned this and the groom won't stop thanking me! Everything was handled - DJ crushed it, photos came out FIRE, and we partied with bachelor groups from across the country. The energy was INSANE. Easiest party I've ever planned!",
    avatar: '🎉',
    package: 'Platinum Package'
  },
  {
    id: 3,
    name: 'Emily R.',
    role: 'Maid of Honor',
    location: 'Houston, TX',
    rating: 5,
    text: "The multi-group atmosphere is what makes this SO special! We danced with parties from everywhere, exchanged Instagrams, and the bride said it was the best day of her life. Professional photos are stunning - better than expected!",
    avatar: '💃',
    package: 'Disco Queen Package'
  },
  {
    id: 4,
    name: 'Marcus L.',
    role: 'Groom',
    location: 'San Antonio, TX',
    rating: 5,
    text: "Meeting other bachelor parties from different states made this unforgettable! The giant unicorn float was EPIC, DJ had everyone dancing, and we left with numbers from guys we're still friends with. This is THE bachelor party experience!",
    avatar: '🦄',
    package: 'Basic Bach Package'
  },
  {
    id: 5,
    name: 'Ashley K.',
    role: 'Bride',
    location: 'Fort Worth, TX',
    rating: 5,
    text: "Nothing to plan, nothing to carry - just SHOW UP and PARTY! The Platinum package had everything ready, cooler stocked, photographer everywhere. Dancing on the water with bachelorettes from across America was MAGICAL!",
    avatar: '✨',
    package: 'Super Sparkle Platinum Disco'
  },
  {
    id: 6,
    name: 'Tyler B.',
    role: 'Best Man',
    location: 'Round Rock, TX',
    rating: 5,
    text: "The professional DJ made this LEGENDARY - best playlist ever! We partied with groups from 5 different states, all celebrating the same thing. The vibe was electric, photos came out amazing, and I'm the hero for booking this!",
    avatar: '🎧',
    package: 'Disco Queen Package'
  }
];

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
    answer: '$85 Basic, $95 Queen/King, $105 Platinum.'
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
  { id: 'experience', title: '4-Hour Experience', icon: <Clock className="h-4 w-4" /> },
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
    navigate('/quote?service=atx-disco-cruise');
  };

  const handleGetQuote = () => {
    navigate('/quote?service=atx-disco-cruise');
  };

  return (
    <>
      <SEOHead
        title="ATX Disco Cruise - Lake Travis Bachelor & Bachelorette Party Boat | Austin TX"
        description="Join America's only multi-group bachelor/bachelorette party cruise on Lake Travis. 4-hour celebration with professional DJ, photographer, giant floats. From $85/person. Book now!"
        keywords="ATX Disco Cruise, Lake Travis party cruise, Austin bachelor party, Austin bachelorette party, party boat Austin, Lake Travis bachelor party, Lake Travis bachelorette party, Austin boat party, disco cruise Austin"
        canonicalUrl="/atx-disco-cruise"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Breadcrumbs */}
        <div className="bg-gray-50 dark:bg-gray-900 py-3">
          <div className="max-w-7xl mx-auto px-6">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/#services' },
                { label: 'ATX Disco Cruise' }
              ]}
            />
          </div>
        </div>

        {/* 1. HERO SECTION */}
        <motion.section 
          id="hero"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative h-[70vh] flex flex-col justify-center overflow-hidden"
          data-testid="section-hero"
        >
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/70 to-orange-900/80 z-10" />
                <LazyImage 
                  src={image} 
                  alt="ATX Disco Cruise party boat on Lake Travis Austin - Bachelor and bachelorette party atmosphere with DJ and dancing"
                  className="w-full h-full object-cover"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-6 text-center flex-grow flex items-center">
            <motion.div variants={fadeInUp} className="w-full">
              <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-center leading-tight" data-testid="text-hero-headline">
                ATX Disco Cruise
              </h1>
              <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mt-4 mb-4 font-bold text-center">
                The Country's Only Multi-Group Bach Party Cruise
              </p>
              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto font-semibold text-center" data-testid="text-hero-subheadline">
                The single most unique and comprehensive <InternalLinkHighlight href="/bachelor-party" title="Bachelor Parties">bachelor</InternalLinkHighlight>/<InternalLinkHighlight href="/bachelorette-party" title="Bachelorette Parties">bachelorette party</InternalLinkHighlight> experience in the United States
              </p>
              <p className="text-base md:text-lg text-white/80 mb-8 max-w-3xl mx-auto text-center" data-testid="text-hero-description">
                Only all-inclusive, multi-group bachelor/bachelorette party cruise in the country. Join parties from across America for an unforgettable 4-hour Lake Travis celebration with professional DJ, photographer, and 100% satisfaction track record! <InternalLinkHighlightWithArrow href="/private-cruises" title="Private Cruises">Or book a private charter</InternalLinkHighlightWithArrow>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base px-8 py-6"
                  data-testid="button-book-now"
                >
                  Book Your Spot Now <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-base px-8 py-6"
                  data-testid="button-learn-more"
                >
                  <Phone className="mr-2" /> Talk to an Expert
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="relative z-30 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
            <div className="container mx-auto">
              <p className="text-center text-gray-900 dark:text-white text-base md:text-lg font-semibold">
                🎉 <span className="text-purple-600">All-Inclusive</span> • Professional DJ & Photographer • <span className="text-pink-600">Saturdays</span> 🎉
              </p>
            </div>
          </div>
        </motion.section>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* 2. EXPERIENCE - 4-Hour Timeline */}
        <SectionReveal>
          <section id="experience" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Clock className="h-4 w-4 mr-2 inline" />
                  The Experience
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Your 4-Hour Party Journey
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Hour-by-hour breakdown of America's most unique <InternalLinkHighlight href="/bachelor-party" title="Bachelor Parties">bachelor</InternalLinkHighlight>/<InternalLinkHighlight href="/bachelorette-party" title="Bachelorette Parties">bachelorette party</InternalLinkHighlight> experience. <InternalLinkHighlightWithArrow href="/" title="Home">Explore all our cruise options</InternalLinkHighlightWithArrow>
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
                <Button
                  size="lg"
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base px-12 py-6"
                  data-testid="button-experience-cta"
                >
                  Experience This Magic <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 3. PRICING - Packages Section */}
        <SectionReveal>
          <section className="py-20 bg-white" id="packages" data-testid="section-packages">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Package className="h-4 w-4 mr-2 inline" />
                  Packages & Pricing
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Choose Your Perfect Package
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  From budget-friendly to all-inclusive VIP - we've got the perfect party package for every group. Looking for exclusive privacy? <InternalLinkHighlight href="/private-cruises" title="Private Cruises">Check out our private charter options</InternalLinkHighlight>
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {discoPackages.map((pkg, index) => (
                  <Card 
                    key={pkg.id} 
                    className={cn(
                      "relative overflow-hidden rounded-xl border-2 hover:shadow-2xl transition-all",
                      pkg.popular ? "ring-4 ring-purple-600 border-purple-600" : "border-gray-200 hover:border-purple-300"
                    )}
                    data-testid={`card-package-${pkg.id}`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2">
                        <Badge className="font-sans tracking-wider bg-white text-purple-600">
                          {pkg.badge}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className={cn(pkg.popular && "pt-14")}>
                      <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                          <pkg.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl text-center font-bold">{pkg.name}</CardTitle>
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          {pkg.originalPrice && (
                            <span className="text-xl text-gray-500 line-through">
                              ${pkg.originalPrice}
                            </span>
                          )}
                          <span className="text-4xl font-bold text-purple-600">
                            ${pkg.price}
                          </span>
                          <span className="text-base text-gray-700 dark:text-gray-300">/person</span>
                        </div>
                      </div>
                      <CardDescription className="text-center text-base mt-2">
                        {pkg.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-base text-gray-700 dark:text-gray-300 text-center">
                        {pkg.description}
                      </p>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-base">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={handleBookNow}
                        className={cn(
                          "w-full",
                          pkg.popular 
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" 
                            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        )}
                        data-testid={`button-select-${pkg.id}`}
                      >
                        Select {pkg.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center bg-white rounded-2xl p-8 max-w-4xl mx-auto border-2 border-purple-200">
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  <strong>All packages include:</strong> Professional DJ, Professional Photographer, Giant Floats, Party Supplies & More!
                </p>
                <Badge className="bg-green-600 text-white font-sans tracking-wider font-bold uppercase text-sm px-6 py-3">
                  <TrendingUp className="h-4 w-4 mr-2 inline" />
                  Best Value for Bachelor & Bachelorette Parties
                </Badge>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 4. AVAILABILITY / BOOKING */}
        <SectionReveal>
          <section id="availability" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Calendar className="h-4 w-4 mr-2 inline" />
                  Availability & Booking
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Book Your Spot on the Disco Cruise
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Peak weekends book 4-6 weeks in advance - secure your date today
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
                      ATX Disco Cruises run <strong>Saturdays</strong> from 11:00 AM - 3:00 PM or 3:30 PM - 7:30 PM during season (March-October).
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
                      <strong>Book 4-6 weeks ahead</strong> for peak weekends. Last-minute spots sometimes available during off-season.
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
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-10 py-6"
                  >
                    <Calendar className="mr-2 h-6 w-6" />
                    Check Availability Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.open('tel:+15127705050')}
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold text-lg px-10 py-6"
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
          <section id="benefits" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Trophy className="h-4 w-4 mr-2 inline" />
                  Key Benefits
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  Why Bachelor & Bachelorette Parties Choose ATX Disco
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  The ultimate multi-group celebration experience on Lake Travis
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
                      From $85/person with DJ, photographer & floats included. Always cheaper than private boat for smaller groups!
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
          <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50" id="whats-included" data-testid="section-whats-included">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <CheckCircle className="h-4 w-4 mr-2 inline" />
                  What's Included
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
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
          <section id="why-choose" className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-white/10 border-2 border-white text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm">
                  <Crown className="h-4 w-4 mr-2 inline" />
                  The Premier Difference
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-white leading-tight">
                  America's Most Unique Bachelor/Bachelorette Experience
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  The only multi-group party cruise in the United States - created in Austin, Texas
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-6xl font-bold text-brand-yellow mb-2">Only One</div>
                  <div className="text-xl text-white">In the United States</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-brand-yellow mb-2">10K+</div>
                  <div className="text-xl text-white">Bach Parties Hosted</div>
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
                  Join 10,000+ Happy Bachelor & Bachelorette Parties
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
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Camera className="h-4 w-4 mr-2 inline" />
                  Photo Gallery
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
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
                <Button
                  size="lg"
                  onClick={() => handleGetQuote()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-6"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Book Your Photo-Perfect Party
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 9. TESTIMONIALS Section */}
        <SectionReveal>
          <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white" data-testid="section-testimonials">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <Quote className="h-4 w-4 mr-2 inline" />
                  Customer Reviews
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
                  What Bachelor & Bachelorette Parties Are Saying
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Real reviews from real parties who celebrated the ATX Disco way
                </p>
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
                <Button
                  size="lg"
                  onClick={() => handleGetQuote()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-6"
                >
                  Book Your Legendary Party Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 10. FAQs Section */}
        <SectionReveal>
          <section id="faqs" className="py-20 bg-white" data-testid="section-faq">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  <HelpCircle className="h-4 w-4 mr-2 inline" />
                  FAQs
                </Badge>
                <h2 className="text-4xl md:text-5xl font-semibold font-playfair text-center mb-6 text-gray-900 leading-tight">
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
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start a Conversation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.open('tel:+15127705050')}
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 770-5050
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
                    answer: 'Food not included but we make it easy! Pre-order lunch delivery direct to the boat through Party on Delivery. Many groups order tacos, pizzas, or sandwiches delivered right to the marina. Snacks and chips are welcome aboard.',
                    keywords: ['food', 'lunch delivery', 'Party on Delivery', 'tacos'],
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
                      description: "Anchor at Devil's Cove or similar spots, swimming and floating on lily pads, DJ playing hits, photographer capturing memories, multi-group party atmosphere in full effect!",
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
                      description: "Perfect for intimate celebrations. Book Disco Queen or Platinum packages for private cooler and reserved spot. Still enjoy the multi-group party atmosphere!",
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

        {/* AI-Optimized Success Metrics */}
        <SectionReveal>
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <AIOptimizedSection
                type="statistics"
                title="ATX Disco Cruise Success by the Numbers"
                description="Why bachelor & bachelorette parties choose the ATX Disco Cruise"
                data={[
                  {
                    value: "Only One",
                    label: "In the United States",
                    icon: <Crown className="w-8 h-8" />,
                    itemProp: "uniqueness"
                  },
                  {
                    value: "10,000+",
                    label: "Bach Parties Hosted",
                    icon: <Trophy className="w-8 h-8" />,
                    itemProp: "numberOfParties"
                  },
                  {
                    value: "100%",
                    label: "Satisfaction Rate",
                    icon: <Shield className="w-8 h-8" />,
                    itemProp: "satisfactionRate"
                  },
                  {
                    value: "4 Hours",
                    label: "Of Non-Stop Celebration",
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
                    label: "Average Review",
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
                  answer="ATX Disco Cruise pricing: Basic Bach Package $85/person, Disco Queen/King Package $95/person (most popular), and Super Sparkle Platinum $105/person. All packages include professional DJ, photographer, giant floats, and party supplies. The shared format makes it significantly cheaper than private boat rentals for bachelor and bachelorette parties."
                  featured={false}
                />

                <FeaturedSnippet
                  question="When does the ATX Disco Cruise run?"
                  answer="The ATX Disco Cruise runs on Saturdays from March through October during peak season. Two time slots are available: 11:00 AM - 3:00 PM (morning cruise) and 3:30 PM - 7:30 PM (afternoon cruise). Each cruise is 4 hours long. Peak weekends book 4-6 weeks in advance, so early booking is recommended for bachelor and bachelorette parties."
                  featured={false}
                />
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* SEO-Optimized Hidden Content for Search Engines */}
        <div className="sr-only" itemScope itemType="https://schema.org/Event">
          <h2 itemProp="name">ATX Disco Cruise - Lake Travis Party Cruise</h2>
          <p itemProp="description">
            The ATX Disco Cruise is Austin's premier multi-group bachelor and bachelorette party cruise and Lake Travis party experience. 
            Join bachelor and bachelorette parties from across the country for an unforgettable 4-hour cruise 
            on beautiful Lake Travis. Professional DJ, photographer, giant floats, and the ultimate party atmosphere.
          </p>
          
          <div itemProp="location" itemScope itemType="https://schema.org/Place">
            <span itemProp="name">Lake Travis, Austin, Texas</span>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressLocality">Austin</span>,
              <span itemProp="addressRegion">TX</span>
            </div>
          </div>

          <h2>ATX Disco Cruise Event Details</h2>
          <p>4-hour multi-group party cruise on Lake Travis with professional DJ and photographer</p>
          <p>BYOB options with shared coolers and ice provided</p>
          <p>Giant unicorn floats and party supplies included</p>
          <p>Perfect for bachelor party Austin and bachelorette party Austin celebrations</p>
          <p>Meet bachelor and bachelorette parties from across America</p>
          <p>Anderson Mill Marina departure location</p>
          
          <h2>ATX Disco Cruise Packages and Pricing</h2>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h3 itemProp="name">Basic Bach Package</h3>
            <meta itemProp="price" content="85" />
            <meta itemProp="priceCurrency" content="USD" />
            <p itemProp="description">$85 per person - Join the BEST Party on Lake Travis, Exclusively for Bach Parties!</p>
            <p>BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise</p>
            <ul>
              <li>Full 4-hour Lake Travis cruise experience</li>
              <li>Professional DJ entertainment all day</li>
              <li>Professional photographer capturing memories</li>
              <li>Digital photo delivery after the event</li>
              <li>Giant unicorn float access</li>
              <li>Multi-group party atmosphere</li>
              <li>BYOB with shared coolers & ice</li>
              <li>Alcohol delivery & lunch delivery available</li>
            </ul>
          </div>

          <div itemScope itemType="https://schema.org/Offer">
            <h3 itemProp="name">Disco Queen Package</h3>
            <meta itemProp="price" content="95" />
            <meta itemProp="priceCurrency" content="USD" />
            <p itemProp="description">$95 per person - Enhanced party experience with private cooler and reserved spot</p>
            <p>Private Cooler & Reserved Spot for Your Group</p>
            <ul>
              <li>Everything in Basic Bach Package</li>
              <li>Private cooler with ice & storage bin for your group</li>
              <li>Reserved spot for your group on the boat</li>
              <li>Disco ball cup & bubble gun for guest of honor</li>
              <li>Direct-to-boat alcohol & lunch delivery</li>
              <li>25% discount on round-trip transportation</li>
            </ul>
          </div>

          <div itemScope itemType="https://schema.org/Offer">
            <h3 itemProp="name">Super Sparkle Platinum Disco Package</h3>
            <meta itemProp="price" content="105" />
            <meta itemProp="priceCurrency" content="USD" />
            <p itemProp="description">$105 per person - Ultimate all-inclusive party experience with maximum celebration</p>
            <p>Nothing to Carry, Cooler Stocked When You Arrive!</p>
            <ul>
              <li>Everything in Disco Queen Package</li>
              <li>Personal unicorn float for guest of honor</li>
              <li>Mimosa setup with champagne flutes, 3 juices & chambong</li>
              <li>Towel service & SPF-50 spray sunscreen provided</li>
              <li>Nothing to carry - cooler pre-stocked with drinks when you arrive</li>
            </ul>
          </div>

          <h2>Lake Travis Party Cruise Keywords</h2>
          <p>ATX Disco Cruise, Lake Travis party cruise, bachelorette party Austin, bachelor party Austin, 
             Austin party boat, Lake Travis bachelor party, Lake Travis bachelorette party, Austin boat party, 
             party cruise Austin, disco cruise Lake Travis, Austin bachelorette cruise, Lake Travis party boat, 
             multi-group bachelor party, multi-group bachelorette party, Austin party cruise, Saturday party cruise</p>
        </div>

        {/* JSON-LD Structured Data for Event */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "ATX Disco Cruise",
            "description": "Austin's premier multi-group bachelor and bachelorette party cruise on Lake Travis. 4-hour party experience with professional DJ, photographer, and multi-group celebration atmosphere. BYOB options available.",
            "image": "https://premierpartycruises.com/assets/atx-disco-cruise-party.jpg",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": "Anderson Mill Marina, Lake Travis",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Austin",
                "addressRegion": "TX",
                "addressCountry": "US"
              }
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Basic Bach Package",
                "price": "85",
                "priceCurrency": "USD",
                "description": "Full 4-hour Lake Travis cruise with DJ, photographer, and giant floats",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
              },
              {
                "@type": "Offer",
                "name": "Disco Queen Package",
                "price": "95",
                "priceCurrency": "USD",
                "description": "Enhanced experience with private cooler, reserved spot, and VIP perks",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
              },
              {
                "@type": "Offer",
                "name": "Super Sparkle Platinum Disco",
                "price": "105",
                "priceCurrency": "USD",
                "description": "Ultimate all-inclusive VIP experience with personal float and premium amenities",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
              }
            ],
            "performer": {
              "@type": "Organization",
              "name": "Premier Party Cruises"
            },
            "organizer": {
              "@type": "Organization",
              "name": "Premier Party Cruises",
              "url": "https://premierpartycruises.com"
            }
          })
        }} />

        {/* JSON-LD Structured Data for LocalBusiness */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises - ATX Disco Cruise",
            "image": "https://premierpartycruises.com/assets/atx-disco-cruise-party.jpg",
            "description": "Premier multi-group bachelor and bachelorette party cruises on Lake Travis. ATX Disco Cruise features professional DJ, photographer, giant floats, and the ultimate party atmosphere for celebrations.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "telephone": "+1-512-488-5892",
            "url": "https://premierpartycruises.com/atx-disco-cruise",
            "priceRange": "$85-$105",
            "servesCuisine": "Party Cruises",
            "paymentAccepted": "Cash, Credit Card, Debit Card",
            "openingHours": "Mo-Su 09:00-21:00",
            "sameAs": [
              "https://www.facebook.com/premierpartycruises",
              "https://www.instagram.com/premierpartycruises"
            ]
          })
        }} />

        {/* Related Services Section */}
        <RelatedServicesSection currentPath="/atx-disco-cruise" />

        {/* Related Links */}
        <RelatedLinks 
          blogLinks={[
            { title: 'ATX Disco Cruise Complete Guide', href: '/blogs/atx-disco-cruise-ultimate-guide' },
            { title: 'What to Expect on the Disco Cruise', href: '/blogs/atx-disco-cruise-experience' },
            { title: 'Bachelor vs Bachelorette Party Tips', href: '/blogs/bachelor-bachelorette-party-tips' }
          ]}
        />

        {/* Sticky CTA */}
        <StickyCTA
          primaryText="Book Your Cruise"
          primaryAction={handleBookNow}
          secondaryText="Call Now"
          secondaryHref="tel:+15127705050"
          showOnDesktop={false}
        />

        <Footer />
      </div>
    </>
  );
}

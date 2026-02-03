import { useState, useEffect, useRef } from 'react';
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
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { DiscoCruisePricing } from '@/components/DiscoCruisePricing';
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
import { FeaturedSnippet, FeaturedSnippetHowTo } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';
import { WhatToBring } from '@/components/WhatToBring';
import { PricingTable } from '@/components/PricingTable';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { StickyCTA } from '@/components/StickyCTA';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { TransportationGuide } from '@/components/TransportationGuide';
import { LazyImage } from '@/components/LazyImage';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { YouTubeVideoBackground } from '@/components/YouTubeVideoBackground';
import ScrollingPhotoGallery from '@/components/ScrollingPhotoGallery';
import { BACHELORETTE_GALLERY } from '@/lib/media';

// Hero video - Clever Girl walkthrough
const heroVideo = '/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4';

// BACHELORETTE PARTY PHOTOS - Unique party photos alternating with boat photos
const heroImage1 = BACHELORETTE_GALLERY[0].src;
const heroImage2 = BACHELORETTE_GALLERY[2].src;
const heroImage3 = BACHELORETTE_GALLERY[4].src;
const galleryImage1 = BACHELORETTE_GALLERY[6].src;
const galleryImage2 = BACHELORETTE_GALLERY[7].src;
const galleryImage3 = BACHELORETTE_GALLERY[1].src;
const partyImage17 = BACHELORETTE_GALLERY[3].src;
const partyImage18 = BACHELORETTE_GALLERY[5].src;

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

// Private Cruise options for bachelorettes
const privateCruiseOptions = [
  {
    id: 'day_tripper',
    name: 'Day Tripper (1-14 guests)',
    capacity: 14,
    weekdayRate: 1050,
    weekendRate: 1838,
    description: 'Perfect for intimate bachelorette groups',
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
    weekdayRate: 1181,
    weekendRate: 1969,
    description: 'Ideal for medium-sized groups',
    features: [
      'Exclusive use of the entire boat',
      'Plenty of space to dance',
      'Multiple seating areas',
      'Large swim platform',
      'Premium sound system'
    ]
  },
  {
    id: 'clever_girl',
    name: 'Clever Girl (30-50 people)',
    capacity: '30-50',
    weekdayRate: 1413,
    weekendRate: 2260,
    description: 'Perfect for large bachelorette parties',
    features: [
      'Exclusive use of the entire boat',
      'Multiple levels',
      'Dance floor area',
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
    description: 'Capture every moment professionally'
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

// FAQs - Enhanced with Bachelorette-Specific Questions
const faqItems = [
  {
    id: 'refund-policy',
    question: 'Do you offer a refund window after booking?',
    answer: "Yes—48 hours after booking for a full refund. After that, weather rules apply at captain's discretion."
  },
  {
    id: 'bride-decorations',
    question: 'Can we decorate for the bride?',
    answer: 'Absolutely! We encourage bachelorette decorations. We provide disco ball cups, bubble guns, and party supplies. You can bring additional decorations like banners, signs, sashes, and matching outfits. Just avoid confetti or loose glitter that could blow into the lake.'
  },
  {
    id: 'safe-non-swimmers',
    question: 'Is it safe for non-swimmers?',
    answer: 'Yes! Safety is our #1 priority. Life jackets are available for everyone, swimming is optional, boats have railings and safe areas, and our experienced captains maintain a safe, female-friendly environment. Many guests enjoy the cruise without ever getting in the water.'
  },
  {
    id: 'non-drinkers',
    question: 'What if some girls don\'t drink?',
    answer: 'Perfect for everyone! We provide ice water stations, you can bring non-alcoholic beverages, mocktails are popular, and the experience is about celebrating the bride - not just drinking. The DJ, floats, and party atmosphere make it fun for everyone.'
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
    question: 'Do you offer group discounts for 10+ girls?',
    answer: 'Yes! Groups of 10+ receive special perks including group discounts, priority boarding, complimentary decorations, and the maid of honor gets a special gift. Contact us for custom packages for groups of 20+.'
  },
  {
    id: 'alcohol-policy',
    question: 'What\'s the alcohol policy?',
    answer: 'BYOB for 21+; cans/plastic only; coolers with ice and cups provided.'
  },
  {
    id: 'booking-timeline',
    question: 'How far in advance should we book?',
    answer: 'Peak bachelorette season (March-October) books out quickly. We recommend booking 8-12 weeks for priority time slots - once they book they\'re gone! Last-minute spots occasionally available for flexible groups.'
  }
];


// Import real reviews from shared/reviews-data.ts
import { bacheloretteReviews, combinedBachReviews, type Review } from '@shared/reviews-data';

// Use bacheloretteReviews + combinedBachReviews for Bachelorette Party page
const brideTestimonials: Review[] = [...bacheloretteReviews, ...combinedBachReviews];

// Photo gallery items - Alternating party and boat photos
const galleryPhotos = BACHELORETTE_GALLERY.map((photo, idx) => ({
  id: idx + 1,
  src: photo.src,
  alt: photo.alt
}));

export default function BacheloretteParty() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroImages = [heroImage2, heroImage3, galleryImage1];
  
  // Video carousel data
  const carouselVideos = [
    { id: 'USWZ3BrexEI', title: 'Full Length Disco Cruise Highlight Reel', isShort: false },
    { id: '4-Yx24Y6oro', title: 'ATX Disco Cruise Experience', isShort: false },
    { id: 'riFpt4IEmBY', title: 'Girls Gone Disco', isShort: true },
    { id: 'AmiWjlT5u10', title: 'Kyle: MVP of the ATX Disco Cruise', isShort: true }
  ];
  
  const goToPrevVideo = () => setActiveVideoIndex((prev) => (prev === 0 ? carouselVideos.length - 1 : prev - 1));
  const goToNextVideo = () => setActiveVideoIndex((prev) => (prev === carouselVideos.length - 1 ? 0 : prev + 1));

  const handleVideoLoadedData = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoError = () => {
    setVideoFailed(true);
  };

  useEffect(() => {
    if (reducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://booking.premierpartycruises.com/quote-v2') {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" data-page-ready="bachelorette-party">
      <SEOHead
        pageRoute="/bachelorette-party-austin"
        defaultTitle="Austin Bachelorette Party Boats | Lake Travis Bachelorette Weekend"
        defaultDescription="Bachelorette party in Austin starting at $85! Lake Travis boat cruises with DJ, photographer, floats. Perfect Austin bachelorette weekend experience. Reserve now!"
        defaultKeywords={["Austin bachelorette party", "Lake Travis bachelorette party", "party boat Austin", "austin party cruise", "bachelorette party boat Austin", "ATX Disco Cruise bachelorette", "Austin bachelorette ideas", "Lake Travis party boat", "cruise for bachelorette party"]}
        schemaType="service"
      />
      
      {/* NOTE: Schema markup is handled by SSR via schemaLoader.ts to avoid duplicates */}
      {/* Schemas loaded from: attached_assets/schema_data/bachelorette-party-austin/ */}
      
      <PublicNavigation />
      
      {/* Sticky CTA */}
      <StickyCTA
        primaryText="Get Free Quote"
        primaryAction={() => handleGetQuote()}
        secondaryText="Call Now"
        secondaryHref="tel:+15124885892"
        showOnDesktop={false}
      />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Fallback image */}
          <img src={heroImage1} alt="Austin Bachelorette Party" className="w-full h-full object-cover" style={{ display: videoLoaded && !videoFailed ? 'none' : 'block' }} loading="eager" />
          {/* Hero Video */}
          {!videoFailed && (
            <video ref={videoRef} className="w-full h-full object-cover" style={{ display: videoLoaded ? 'block' : 'none' }} src={heroVideo} muted loop playsInline autoPlay preload="auto" onLoadedData={handleVideoLoadedData} onError={handleVideoError} />
          )}
          <div className="absolute inset-0 bg-black/40" />
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
              <Badge className="font-sans tracking-wider font-bold uppercase text-sm bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 border-0">
                <Heart className="h-4 w-4 mr-2 inline" />
                Premier Bachelorette Experience
              </Badge>
            </motion.div>
            
            {/* CRITICAL: H1 with text-6xl and heading-unbounded - Largest text on page */}
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold heading-unbounded mb-4 md:mb-6 text-center leading-tight px-2"
              data-editable 
              data-editable-id="bachelorette-hero-title"
            >
              Austin Bachelorette Party Boats on Lake Travis
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl text-brand-yellow font-semibold mb-4 md:mb-6 px-2"
            >
              Lake Travis Girls' Weekend Celebration
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-100 leading-relaxed px-2"
              data-editable 
              data-editable-id="bachelorette-hero-subtitle"
            >
              Exclusively for Bachelorette & <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Parties">Bachelor Parties</InternalLinkHighlight><br/>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl">The Highlight of Your Weekend Every. Damn. Time.</span>
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
            >
              <Button
                size="lg"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-7"
                data-testid="button-hero-see-packages"
              >
                See Packages & Pricing
                <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
              >
                <Button
                  size="lg"
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-7 whitespace-normal"
                  data-testid="button-hero-book-now-bachelorette"
                >
                  <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-center leading-tight">BOOK NOW</span>
                </Button>
              </div>
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

      {/* ATX Disco Cruise Video Carousel Section */}
      <section className="py-8 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="relative">
            {/* Left Arrow */}
            <button 
              onClick={goToPrevVideo}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full transition-all shadow-lg"
              aria-label="Previous video"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Right Arrow */}
            <button 
              onClick={goToNextVideo}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full transition-all shadow-lg"
              aria-label="Next video"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Videos Container - All 4 visible */}
            <div className="flex items-center justify-center gap-2 md:gap-3 py-4 px-10 md:px-16">
              {carouselVideos.map((video, index) => {
                const isActive = index === activeVideoIndex;
                
                return (
                  <div
                    key={video.id}
                    onClick={() => setActiveVideoIndex(index)}
                    className={`
                      transition-all duration-300 cursor-pointer rounded-xl overflow-hidden shadow-2xl flex-shrink-0
                      ${isActive 
                        ? 'w-[40%] md:w-[35%] opacity-100 scale-105 z-10 ring-4 ring-pink-500' 
                        : 'w-[18%] md:w-[20%] opacity-60 scale-95 hover:opacity-80'
                      }
                    `}
                  >
                    <div className={video.isShort ? 'aspect-[9/16]' : 'aspect-video'}>
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}${isActive ? '?autoplay=1&mute=1&loop=1&playlist=' + video.id : ''}`}
                        title={video.title}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Video Title */}
            <p className="text-center text-white text-sm md:text-base mt-2 font-medium">
              {carouselVideos[activeVideoIndex].title}
            </p>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-3">
              {carouselVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveVideoIndex(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                    index === activeVideoIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ATX Bachelorette Party Boat Options Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50 via-orange-50/30 to-amber-50">
        <div className="max-w-5xl mx-auto px-6">
          {/* Main Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl heading-unbounded font-bold text-[#C85A54] mb-3">
              ATX Bachelorette Party Boat Options
            </h2>
            <p className="text-xl md:text-2xl heading-unbounded italic text-[#2B3A67]">
              Two Amazing Party Cruise Choices for Your Unforgettable Weekend in Austin
            </p>
          </div>

          {/* Two Column Layout - Disco Cruise & Private Cruise */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* ATX Disco Cruise Column */}
            <div className="bg-white/80 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl md:text-3xl heading-unbounded font-bold text-[#2B3A67] mb-6 leading-tight">
                ATX Disco Cruise: The Ultimate Bachelorette Party Experience
              </h3>
              
              <ul className="space-y-3 text-gray-800 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span><strong className="text-[#C85A54]">All-inclusive, Turnkey, DRINK & ICE DELIVERY AVAILABLE!</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span><strong className="text-[#C85A54]">3-12 Bachelorette & Bachelor Parties Together</strong> Celebrating the Same, Amazing Occasion!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span><strong className="text-[#C85A54]">World-famous, all-inclusive, one-of-a-kind</strong> 4-hour party cruise - the ONLY party like it in the country!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span><strong className="text-[#C85A54]">GIANT 25-foot Unicorn Float</strong> - Biggest in the Country!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span><strong className="text-[#C85A54]">Professional DJ & photographer</strong> to capture the moment - Amazing music, free photos sent after</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span>3 Lily Pads, Add-On Packages Available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span>Ice Water, Cups, Koozies, Bubbles, & Name Tags</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span>Private coolers w/ice & locker for each group's convenience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span><strong className="text-[#C85A54]">EXCLUSIVELY for Bachelorette & Bachelor parties!</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span><strong className="text-[#C85A54]">VIBES are OFF THE CHARTS!</strong> - EVERYONE is celebrating the same occasion, it's just magic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span>All party supplies, coolers with ice, and floats included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span><strong className="text-[#C85A54]">Zero planning required</strong> on your part</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C85A54] font-bold mt-1">•</span>
                  <span><strong className="text-[#C85A54]">Weather backup</strong> for a guaranteed good time, rain or shine!</span>
                </li>
              </ul>

              {/* ATX Disco Cruise Pricing Chart - Matching Private Cruise Style */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {/* Friday */}
                <div className="border-2 border-[#3B5998] rounded-xl overflow-hidden">
                  <div className="bg-[#3B5998] text-white py-2 sm:py-3 px-1 sm:px-2 text-center">
                    <p className="font-bold text-xs sm:text-sm">Friday</p>
                    <p className="text-[10px] sm:text-xs">(12-4pm)</p>
                  </div>
                  <div className="p-2 sm:p-4 text-center bg-white">
                    <p className="text-lg sm:text-xl font-bold text-[#2B3A67]">$95</p>
                    <p className="text-xs text-[#2B3A67] -mt-1">per person</p>
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
                      <p className="text-[#C85A54] font-bold text-sm sm:text-base">$124 all-in</p>
                      <p className="text-gray-500 text-[10px] sm:text-xs">w/ tax, tip & fees</p>
                    </div>
                  </div>
                </div>

                {/* Saturday Day */}
                <div className="border-2 border-[#3B5998] rounded-xl overflow-hidden">
                  <div className="bg-[#3B5998] text-white py-2 sm:py-3 px-1 sm:px-2 text-center">
                    <p className="font-bold text-xs sm:text-sm">Saturday</p>
                    <p className="text-[10px] sm:text-xs">(11am-3pm)</p>
                  </div>
                  <div className="p-2 sm:p-4 text-center bg-white">
                    <p className="text-lg sm:text-xl font-bold text-[#2B3A67]">$105</p>
                    <p className="text-xs text-[#2B3A67] -mt-1">per person</p>
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
                      <p className="text-[#C85A54] font-bold text-sm sm:text-base">$137 all-in</p>
                      <p className="text-gray-500 text-[10px] sm:text-xs">w/ tax, tip & fees</p>
                    </div>
                  </div>
                </div>

                {/* Saturday Sunset */}
                <div className="border-2 border-[#3B5998] rounded-xl overflow-hidden">
                  <div className="bg-[#3B5998] text-white py-2 sm:py-3 px-1 sm:px-2 text-center">
                    <p className="font-bold text-xs sm:text-sm">Saturday</p>
                    <p className="text-[10px] sm:text-xs">(3:30-7:30pm)</p>
                  </div>
                  <div className="p-2 sm:p-4 text-center bg-white">
                    <p className="text-lg sm:text-xl font-bold text-[#2B3A67]">$85</p>
                    <p className="text-xs text-[#2B3A67] -mt-1">per person</p>
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
                      <p className="text-[#C85A54] font-bold text-sm sm:text-base">$111 all-in</p>
                      <p className="text-gray-500 text-[10px] sm:text-xs">w/ tax, tip & fees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All-Inclusive Private Party Cruise Column */}
            <div className="bg-white/80 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl md:text-3xl heading-unbounded font-bold text-[#2B3A67] mb-6 leading-tight">
                All-Inclusive Private Party Cruise:
              </h3>
              
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-[#2B3A67] font-bold mt-1">•</span>
                  <span><strong className="text-[#2B3A67]">Exclusive private boat</strong> for 14-30 guests with captain & crew</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2B3A67] font-bold mt-1">•</span>
                  <span><strong className="text-[#2B3A67]">Full freedom</strong> to choose your route, music, and timing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2B3A67] font-bold mt-1">•</span>
                  <span><strong className="text-[#2B3A67]">Bluetooth sound system</strong> to play your favorite tunes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2B3A67] font-bold mt-1">•</span>
                  <span><strong className="text-[#2B3A67]">BYOB with large coolers provided</strong></span>
                </li>
              </ul>

              {/* Packages Section */}
              <div className="mt-6 space-y-4">
                <div className="bg-gradient-to-r from-[#2B3A67]/5 to-[#2B3A67]/10 rounded-lg p-4 border-l-4 border-[#2B3A67]">
                  <p className="font-bold text-[#2B3A67]">Add a Mimosa Party Cooler - $100</p>
                  <p className="text-gray-600 text-sm mt-1">Champagne, OJ, and flutes for the group</p>
                </div>

                <div className="bg-gradient-to-r from-[#C85A54]/5 to-[#C85A54]/10 rounded-lg p-4 border-l-4 border-[#C85A54]">
                  <p className="font-bold text-[#C85A54]">Essentials Package - $100-$150</p>
                  <p className="text-gray-600 text-sm mt-1">Coolers, ice, cups, koozies, party supplies - everything you need!</p>
                </div>

                <div className="bg-gradient-to-r from-[#2B3A67]/5 to-[#2B3A67]/10 rounded-lg p-4 border-l-4 border-[#2B3A67]">
                  <p className="font-bold text-[#2B3A67]">Ultimate Disco Party Package - $250-$300</p>
                  <p className="text-gray-600 text-sm mt-1">Everything in Essentials PLUS decorations, premium supplies, floats, and more!</p>
                </div>
              </div>

              {/* Additional Add-ons */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="font-bold text-[#2B3A67] mb-3">Additional Add-ons:</p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B3A67] font-bold mt-1">•</span>
                    <span>Professional DJ for your cruise - <strong>$600</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B3A67] font-bold mt-1">•</span>
                    <span>Professional Photographer - <strong>$600</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B3A67] font-bold mt-1">•</span>
                    <span>Bartender for your cruise - <strong>$600</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B3A67] font-bold mt-1">•</span>
                    <span>Giant Lily Pad Floats (6x20 feet) - <strong>$50/each</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* REMEMBER Section */}
          <div className="mb-12">
            <h3 className="text-3xl heading-unbounded font-bold text-[#C85A54] text-center mb-8 tracking-wide">
              REMEMBER:
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Personalized Private Cruise */}
              <div className="bg-white/90 rounded-xl p-6 shadow-md border-t-4 border-[#2B3A67]">
                <h4 className="text-xl heading-unbounded font-bold text-[#C85A54] mb-4">Personalized Private Cruise</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We'll help you throw an amazing all-inclusive private cruise if you'd like it private - it'll be AMAZING!
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mt-3">
                  Add one of our all-inclusive packages to make it turnkey!
                </p>
              </div>

              {/* ATX Disco Cruise */}
              <div className="bg-white/90 rounded-xl p-6 shadow-md border-t-4 border-[#C85A54]">
                <h4 className="text-xl heading-unbounded font-bold text-[#C85A54] mb-4">ATX Disco Cruise: All-Inclusive Experience</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The ATX Disco Cruise Includes <strong className="underline">EVERYTHING</strong>: Professional DJ & Photographer are Included! - photos sent after the cruise!
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mt-3">
                  AND - the Giant Unicorn Float is ONLY on the ATX Disco Cruise!
                </p>
              </div>

              {/* Value vs. Experience */}
              <div className="bg-white/90 rounded-xl p-6 shadow-md border-t-4 border-[#2B3A67]">
                <h4 className="text-xl heading-unbounded font-bold text-[#C85A54] mb-4">Value vs. Experience</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The Private Cruise MIGHT be cheaper, but the ATX Disco Cruise is a one-of-a-kind EXPERIENCE that you'll remember forever
                </p>
                <p className="text-[#C85A54] font-bold text-sm mt-3 italic">
                  - Real talk y'all!
                </p>
              </div>
            </div>
          </div>

          {/* Private Cruise Pricing Table */}
          <div className="bg-white/90 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl md:text-3xl heading-unbounded font-bold text-[#2B3A67] text-center mb-8">
              Private Cruise Pricing for up to 14 people:
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Friday */}
              <div className="border-2 border-[#3B5998] rounded-xl overflow-hidden">
                <div className="bg-[#3B5998] text-white py-3 px-4 text-center">
                  <p className="font-bold">Friday</p>
                  <p className="text-sm">(12-4, 430-830)</p>
                </div>
                <div className="p-5 text-center">
                  <p className="text-2xl font-bold text-[#2B3A67]">$225/hr</p>
                  <p className="text-gray-600 text-sm mt-1">$900 for 4-hr Cruise</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-[#C85A54] font-bold text-lg">$1,181 total</p>
                    <p className="text-gray-500 text-xs">w/ tax, tip & fees</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 font-medium">~$84-$168 per person</p>
                    <p className="text-gray-500 text-xs">(7-14ppl)</p>
                  </div>
                </div>
              </div>

              {/* Saturday Afternoon */}
              <div className="border-2 border-[#3B5998] rounded-xl overflow-hidden">
                <div className="bg-[#3B5998] text-white py-3 px-4 text-center">
                  <p className="font-bold">Saturday</p>
                  <p className="text-sm">(11-3, 330-730)</p>
                </div>
                <div className="p-5 text-center">
                  <p className="text-2xl font-bold text-[#2B3A67]">$350/hr</p>
                  <p className="text-gray-600 text-sm mt-1">$1400 for 4-hr Cruise</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-[#C85A54] font-bold text-lg">$1,837 total</p>
                    <p className="text-gray-500 text-xs">w/ tax, tip & fees</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 font-medium">~$131-$263 per person</p>
                    <p className="text-gray-500 text-xs">(7-14ppl)</p>
                  </div>
                </div>
              </div>

              {/* Sunday */}
              <div className="border-2 border-[#3B5998] rounded-xl overflow-hidden">
                <div className="bg-[#3B5998] text-white py-3 px-4 text-center">
                  <p className="font-bold">Sunday</p>
                  <p className="text-sm">(11-3, 330-730)</p>
                </div>
                <div className="p-5 text-center">
                  <p className="text-2xl font-bold text-[#2B3A67]">$250/hr</p>
                  <p className="text-gray-600 text-sm mt-1">$1000 for 4-hr Cruise</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-[#C85A54] font-bold text-lg">$1,312 total</p>
                    <p className="text-gray-500 text-xs">w/ tax, tip & fees</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 font-medium">~$94-$187 per person</p>
                    <p className="text-gray-500 text-xs">(7-14ppl)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Tagline Section - Below Hero */}
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
            <div className="flex items-center gap-2 text-gray-700">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium">Popular weekends book 8-10 weeks before the date</span>
            </div>
            <span className="hidden sm:inline text-gray-300">|</span>
            <div className="flex items-center gap-2 text-gray-700">
              <Heart className="h-5 w-5 text-pink-600" />
              <span className="text-sm font-medium">Packages from $85-$105 per person</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Photo Gallery */}
      <section className="py-12 bg-gradient-to-b from-pink-100 to-white dark:from-pink-900/30 dark:to-gray-950 overflow-hidden">
        <div className="text-center mb-6">
          <h2 className="text-3xl heading-unbounded font-bold text-gray-900 dark:text-white mb-2">
            Real Bachelorette Parties on Lake Travis
          </h2>
          <p className="text-gray-600 dark:text-gray-300">See the celebrations happening every weekend</p>
        </div>
        <ScrollingPhotoGallery pageType="bachelorette" />
      </section>

      {/* Quote Builder Section */}
      <QuoteBuilderSection />

      {/* YOUR TWO OPTIONS SECTION */}
      <SectionReveal>
        <section id="your-options" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Target className="h-4 w-4 mr-2 inline" />
                Two Amazing Options for Your Celebration
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                Choose Your Perfect Bachelorette Party Style
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Two completely different experiences - both unforgettable!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* ATX Disco Cruise Option */}
              <Card className="border-3 border-pink-400 hover:shadow-2xl transition-all">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
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
                      <span>Party with other bachelorette groups from across America</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>All-inclusive: DJ, photographer, floats included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>From $85 per person - all packages</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Zero planning stress - everything handled</span>
                    </li>
                  </ul>
                  <div className="bg-pink-50 p-4 rounded-lg mb-4">
                    <p className="text-center font-bold">Group of 10 = $850-$1,050 total</p>
                    <p className="text-center text-sm text-gray-600">Everything included!</p>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold"
                    onClick={() => navigate('/atx-disco-cruise')}
                  >
                    Learn More About ATX Disco
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Private Cruise Option */}
              <Card className="border-3 border-purple-400 hover:shadow-2xl transition-all">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <div className="flex items-center justify-center mb-4">
                    <Ship className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">OPTION 2: Private Cruises</CardTitle>
                  <CardDescription className="text-white text-center mt-2">
                    Exclusive Boat for Your Group
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Entire boat exclusively for your group</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Custom timing, route, and itinerary</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>$1,050-$2,660 for 4-hour cruise (based on boat size)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Add DJ for $600</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Add Photographer for $600</span>
                    </li>
                  </ul>
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <p className="text-center font-bold">Group of 10-14 = $1,500-$2,000+</p>
                    <p className="text-center text-sm text-gray-600">Boat + optional add-ons</p>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
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

      {/* 2. EXPERIENCE DESCRIPTION */}
      <SectionReveal>
        <section id="experience" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Sparkles className="h-4 w-4 mr-2 inline" />
                The Bachelorette Experience
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                What Makes Our Bachelorette Parties Special
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                From epic <InternalLinkHighlight href="/atx-disco-cruise" title="ATX Disco Cruise">ATX Disco Cruises</InternalLinkHighlight> to exclusive <InternalLinkHighlight href="/private-cruises" title="Private Cruises">private charters</InternalLinkHighlight>, we deliver unforgettable girls' weekend experiences on Lake Travis. Also perfect for <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Parties">bachelor celebrations</InternalLinkHighlight>!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
              {/* ATX Disco Cruise Experience */}
              <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                    <Music className="h-10 w-10 text-pink-600" />
                  </div>
                  <CardTitle className="text-2xl text-center heading-unbounded">ATX Disco Cruise</CardTitle>
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
                  <div
                    className="xola-custom xola-checkout"
                    data-button-id="695186923c261203770cc2e7"
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold"
                    >
                      Book Disco Cruise
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Private Cruise Experience */}
              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <Ship className="h-10 w-10 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl text-center heading-unbounded">Private Boat Rental</CardTitle>
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

      {/* EMOTIONAL BENEFITS FOR BACHELORETTES */}
      <SectionReveal>
        <section id="emotional-benefits" className="py-12 md:py-20 bg-gradient-to-br from-white to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Heart className="h-4 w-4 mr-2 inline" />
                Why Brides Choose Us
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                The Bachelorette Party Your Friends Will Talk About for YEARS
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Your last fling before the ring done RIGHT
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Emotional Benefit Cards */}
              <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-full p-3">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="heading-unbounded text-2xl font-bold mb-2">Zero Stress, Maximum Memories</h3>
                      <p className="text-gray-700 leading-relaxed">
                        No herding cats, no planning nightmares, no coordinating 15 different opinions. 
                        Just show up, celebrate your bride, and create memories that'll last forever.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="heading-unbounded text-2xl font-bold mb-2">Meet Other Bride Tribes - Instant Besties!</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Party with 3-4 other bachelorette groups on the disco cruise! 
                        Share the excitement, make new friends, and create an epic party atmosphere together.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-200 hover:border-pink-400 transition-all hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-full p-3">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="heading-unbounded text-2xl font-bold mb-2">Instagram-Worthy Every Moment</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Professional photographer captures every laugh, every toast, every perfect moment. 
                        Giant unicorn floats, sunset views, and your whole squad looking amazing!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="heading-unbounded text-2xl font-bold mb-2">Safe, Female-Friendly Environment</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Professional crew that respects boundaries, secure environment for all your girls, 
                        and a celebration focused on YOU - not unwanted attention.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Big Emotional Promise */}
            <div className="mt-16 max-w-4xl mx-auto text-center">
              <Card className="bg-gradient-to-r from-pink-600 to-purple-600 text-white border-0">
                <CardContent className="p-12">
                  <h3 className="heading-unbounded text-3xl font-bold mb-4">
                    This Is YOUR Moment
                  </h3>
                  <p className="text-xl mb-6 opacity-95 leading-relaxed">
                    You deserve a bachelorette party that matches the magic of your upcoming wedding. 
                    Where every detail is handled, every friend has a blast, and you feel like the absolute queen you are.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div
                      className="xola-custom xola-checkout"
                      data-button-id="695186923c261203770cc2e7"
                    >
                      <Button
                        size="lg"
                        className="bg-white text-pink-600 hover:bg-gray-100 font-bold text-lg px-10 py-6"
                      >
                        <Sparkles className="mr-2 h-6 w-6" />
                        Plan The Perfect Bachelorette
                      </Button>
                    </div>
                    <Button
                      size="lg"
                      variant="outlineLight"
                      onClick={() => navigate('/atx-disco-cruise')}
                      className="text-lg px-10 py-6"
                    >
                      See Party Details
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 3. PRICING / PACKAGES */}
      <SectionReveal>
        <section id="packages" className="py-12 md:py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Package className="h-4 w-4 mr-2 inline" />
                Bachelorette Packages
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                Choose Your Bachelorette Party Package
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Find the perfect package for your bride tribe celebration
              </p>
            </div>
            
            {/* ATX DISCO CRUISE OPTION */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <Badge className="bg-pink-600 text-white px-4 py-2 mb-4">
                  OPTION 1
                </Badge>
                <h3 className="text-3xl heading-unbounded font-bold mb-2">ATX Disco Cruise</h3>
                <p className="text-lg text-gray-700">Multi-group party with other bachelorette parties</p>
              </div>
              
              <DiscoCruisePricing partyType="bachelorette" showAddOns={true} />
            </div>

            {/* PRIVATE CRUISE OPTION */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <Badge className="bg-purple-600 text-white px-4 py-2 mb-4">
                  OPTION 2
                </Badge>
                <h3 className="text-3xl heading-unbounded font-bold mb-2">Private Cruises</h3>
                <p className="text-lg text-gray-700">Exclusive boat just for your group</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-8">
                {privateCruiseOptions.map((boat, index) => (
                  <Card 
                    key={boat.id}
                    className="relative h-full bg-white transition-all duration-300 border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                          <Ship className="h-8 w-8 text-purple-600" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl heading-unbounded mb-2">{boat.name}</CardTitle>
                      <CardDescription className="text-base">
                        {boat.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="text-center py-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          ${boat.weekdayRate}-${boat.weekendRate}
                        </div>
                        <div className="text-sm text-gray-600">
                          for 4-hour cruise (Weekday-Weekend)
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {boat.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6"
                        onClick={() => navigate('/private-cruises')}
                        data-testid={`button-private-${boat.id}`}
                      >
                        Book Private Cruise
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Private Cruise Add-ons */}
              <Card className="bg-purple-50 border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-xl">Optional Add-ons for Private Cruises</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {privateCruiseAddOns.map((addon, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold text-gray-900">{addon.name}:</span>
                          <span className="text-gray-700 ml-2">
                            ${typeof addon.price === 'number' ? addon.price : addon.price}
                          </span>
                          <p className="text-sm text-gray-600">{addon.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* COMPARISON SECTION */}
            <div className="max-w-6xl mx-auto">
              <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-300 p-8">
                <CardHeader>
                  <CardTitle className="text-3xl heading-unbounded text-center mb-4">
                    Which Option is Right for Your Group?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* ATX Disco Comparison */}
                    <div className="text-center">
                      <Badge className="bg-pink-600 text-white px-4 py-2 mb-4">ATX DISCO CRUISE</Badge>
                      <h4 className="heading-unbounded text-xl font-bold mb-4">Perfect if you want:</h4>
                      <ul className="text-left space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Social experience with other bride tribes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>All-inclusive (DJ, photographer, floats included)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Best value for smaller groups (under 20)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Zero planning stress</span>
                        </li>
                      </ul>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-bold text-lg mb-2">Cost for 10 people:</p>
                        <p className="text-2xl font-bold text-pink-600">$850 - $1,050 total</p>
                        <p className="text-sm text-gray-600">All-inclusive with everything!</p>
                      </div>
                    </div>
                    
                    {/* Private Cruise Comparison */}
                    <div className="text-center">
                      <Badge className="bg-purple-600 text-white px-4 py-2 mb-4">PRIVATE CRUISE</Badge>
                      <h4 className="heading-unbounded text-xl font-bold mb-4">Perfect if you want:</h4>
                      <ul className="text-left space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Exclusive boat just for your group</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Custom itinerary and timing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Bring your own everything</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Large groups (20+ people)</span>
                        </li>
                      </ul>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-bold text-lg mb-2">Cost for 10-14 people (4 hours):</p>
                        <p className="text-2xl font-bold text-purple-600">$1,500-$2,000+</p>
                        <p className="text-sm text-gray-600">Boat + DJ ($600) + Photo ($600)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center border-t-2 border-pink-200 pt-6">
                    <p className="text-lg font-bold mb-4">💡 Pro Tip for Bachelorette Groups:</p>
                    <p className="text-gray-700">
                      Most bachelorette parties under 20 people choose ATX Disco Cruise for the value and social atmosphere. 
                      Private cruises make sense for very large groups or those wanting complete privacy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* WHAT TO EXPECT SECTION */}
      <SectionReveal>
        <section id="what-to-expect" className="py-12 md:py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Star className="h-4 w-4 mr-2 inline" />
                What to Expect
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                Your Day on the Water
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Step-by-step guide for each experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* ATX Disco Cruise Steps */}
              <Card className="border-2 border-pink-300">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  <CardTitle className="text-2xl text-center">ATX Disco Cruise Experience</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                      <div>
                        <p className="font-bold">Arrive at Marina (11:45 AM)</p>
                        <p className="text-sm text-gray-600">Check-in at Anderson Mill Marina, get your wristbands</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                      <div>
                        <p className="font-bold">Board the Boat (12:00 PM)</p>
                        <p className="text-sm text-gray-600">Find your group's reserved area, drop off coolers</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                      <div>
                        <p className="font-bold">Cruise Lake Travis (12:00-12:45 PM)</p>
                        <p className="text-sm text-gray-600">DJ starts the party, meet other bachelorette groups</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                      <div>
                        <p className="font-bold">Swimming at Nature Preserve (12:45-2:45 PM)</p>
                        <p className="text-sm text-gray-600">Tie up along cliffs, crystal clear water, floats, photos, games</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                      <div>
                        <p className="font-bold">Cruise Back (3:00-4:00 PM)</p>
                        <p className="text-sm text-gray-600">More dancing, group photos, celebrate together</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">6</span>
                      <div>
                        <p className="font-bold">Return to Marina (4:00 PM)</p>
                        <p className="text-sm text-gray-600">Disembark, continue the party at lakeside bars</p>
                      </div>
                    </li>
                  </ol>
                  <div className="mt-6 bg-pink-50 p-4 rounded-lg">
                    <p className="text-sm font-bold mb-2">✨ Everything Provided:</p>
                    <p className="text-sm">DJ, photographer, floats, coolers stocked with ice, party supplies. Order drinks from Party On Delivery to have them waiting on the boat!</p>
                  </div>
                </CardContent>
              </Card>

              {/* Private Cruise Steps */}
              <Card className="border-2 border-purple-300">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="text-2xl text-center">Private Cruise Experience</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                      <div>
                        <p className="font-bold">Choose Your Time</p>
                        <p className="text-sm text-gray-600">Depart whenever you want (morning, afternoon, sunset)</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                      <div>
                        <p className="font-bold">Board Your Private Boat</p>
                        <p className="text-sm text-gray-600">Load your supplies, decorations, food & drinks</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                      <div>
                        <p className="font-bold">Custom Itinerary</p>
                        <p className="text-sm text-gray-600">Go wherever you want on the lake</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                      <div>
                        <p className="font-bold">Your Music, Your Rules</p>
                        <p className="text-sm text-gray-600">Play your playlist or hire a DJ (+$600)</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                      <div>
                        <p className="font-bold">Private Swimming</p>
                        <p className="text-sm text-gray-600">Anchor anywhere for exclusive swimming</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">6</span>
                      <div>
                        <p className="font-bold">Return When You Want</p>
                        <p className="text-sm text-gray-600">Extend hourly if having too much fun</p>
                      </div>
                    </li>
                  </ol>
                  <div className="mt-6 bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm font-bold mb-2">⚡ Coolers & Drinks:</p>
                    <p className="text-sm">Empty coolers provided on board. Add ice with our Essentials or Ultimate package. Order drinks from Party On Delivery to have them stocked on the boat!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* NEW SEO SECTION 1: Austin Party Cruises Guide */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-unbounded text-center mb-8 text-gray-900 leading-tight">
                Austin Party Cruises: Your Complete Bachelorette Celebration Guide
              </h2>
              
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When it comes to planning an unforgettable bachelorette party, <strong>austin party cruises</strong> on Lake Travis offer the perfect blend of adventure, relaxation, and celebration. As Austin's premier <strong>party boat</strong> experience, we've helped thousands of brides and their friends create memories that last a lifetime.
                </p>
                
                <h3 className="heading-unbounded text-2xl font-bold text-gray-900 mb-4 mt-8">Why Choose a Lake Travis Party Boat for Your Bachelorette?</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  A <strong>cruise for bachelorette party</strong> celebrations combines the best of Austin's outdoor lifestyle with world-class entertainment. Lake Travis provides the perfect backdrop with its crystal-clear waters, stunning Hill Country views, and endless sunshine. Our <strong>austin party cruise</strong> experiences are designed specifically for bachelorette groups who want more than just a standard celebration.
                </p>
                
                <div className="bg-pink-50 border-l-4 border-pink-600 p-6 my-8 rounded-r-lg">
                  <h4 className="heading-unbounded text-xl font-bold text-gray-900 mb-3">What Makes Austin Party Cruises Special:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>Professional DJ</strong> - Live entertainment tailored to your bride tribe's music preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>Pro Photography</strong> - Capture Instagram-worthy moments without worrying about phones in the water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>Giant Floats</strong> - Relax on massive lily pads and unicorn floats perfect for group photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>BYOB Friendly</strong> - Bring your favorite drinks and we'll provide the coolers and ice</span>
                    </li>
                  </ul>
                </div>

                <h3 className="heading-unbounded text-2xl font-bold text-gray-900 mb-4 mt-8">ATX Disco Cruise vs Private Charter: What's the Best Value?</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  When choosing your <strong>party boat austin</strong> experience, the ATX Disco Cruise delivers unmatched value for bachelorette parties of any size. While a bare-bones private boat rental may appear cheaper per person for larger groups, you'd be missing everything that makes a bachelorette party legendary!
                </p>
                
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-300 p-6 my-6 rounded-lg">
                  <h4 className="heading-unbounded text-xl font-bold text-gray-900 mb-3">What's Included in Your ATX Disco Cruise Ticket:</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-gray-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>Professional DJ</strong> ($600 value)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>Pro Photographer</strong> ($600 value)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>Giant Floats & Party Supplies</strong> ($200 value)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>Setup & Party Hosting</strong> ($200 value)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>Multi-Group Party Energy</strong> (Priceless!)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                      <span><strong>Curated Bachelorette Experience</strong></span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 italic">
                    To recreate the ATX Disco Cruise experience on a private boat, you'd need to add DJ ($600) + Photographer ($600) + Party Supplies ($200) + Setup/Hosting ($200) to the base boat rate - making the Disco Cruise the clear winner for value AND experience.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-2 border-pink-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-br from-pink-50 to-pink-100">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="h-5 w-5 text-pink-600" />
                        ATX Disco Cruise (Best Value!)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700 mb-3">All-inclusive bachelorette party experience with legendary multi-group energy. Everything you need for an epic celebration is included - no hidden costs!</p>
                      <p className="font-bold text-pink-600 text-xl">$85-$105/person</p>
                      <p className="text-sm text-gray-600 mt-2">Includes DJ, photographer, floats, party supplies & more</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-purple-200">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        Private Charter (Want Privacy?)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700 mb-3">Exclusive boat for your crew only. Bring your own entertainment and supplies. Good for very specific needs or complete privacy.</p>
                      <p className="font-bold text-purple-600">From $1,050 base rate</p>
                      <p className="text-sm text-gray-600 mt-2">Add $1,600+ for DJ, photographer & party essentials</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* NEW SEO SECTION 2: Planning Your Austin Party Cruise */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-unbounded text-center mb-8 text-gray-900 leading-tight">
                Planning Your Lake Travis Girls' Trip
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Organizing a <strong>party cruises</strong> celebration for your best friend's bachelorette requires some planning, but we make it simple. Here's your step-by-step guide to creating the ultimate <strong>lake travis party boat</strong> experience that your bride tribe will never forget.
                </p>

                <h3 className="heading-unbounded text-2xl font-bold text-gray-900 mb-4 mt-8">Timing Your Austin Party Cruise</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  The best time for <strong>austin party</strong> celebrations on Lake Travis is between April and September when the weather is perfect and the water is warm. However, we run cruises year-round with covered areas to keep you comfortable in any season. For the most popular dates, especially weekend cruises, we recommend booking 8-12 weeks for priority time slots - once they book they're gone!
                </p>

                <div className="bg-white border-2 border-pink-200 p-6 my-8 rounded-lg shadow-md">
                  <h4 className="heading-unbounded text-xl font-bold text-gray-900 mb-4">Pro Tips for Your Party Boat Austin Experience:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Sun className="h-5 w-5 text-yellow-600" />
                        Weather Prep
                      </h5>
                      <ul className="text-sm text-gray-700 space-y-1 ml-7">
                        <li>• Bring sunscreen (SPF 50+)</li>
                        <li>• Pack sunglasses and hats</li>
                        <li>• Consider UV-protective swim wear</li>
                        <li>• Stay hydrated with water</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Camera className="h-5 w-5 text-pink-600" />
                        Photo Moments
                      </h5>
                      <ul className="text-sm text-gray-700 space-y-1 ml-7">
                        <li>• Coordinate matching outfits</li>
                        <li>• Bring props and decorations</li>
                        <li>• Use waterproof phone cases</li>
                        <li>• Trust our pro photographer</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="heading-unbounded text-2xl font-bold text-gray-900 mb-4 mt-8">What to Expect on Your Cruise for Bachelorette Party</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Your <strong>lake travis party boat</strong> adventure begins the moment you arrive at the marina. Our friendly crew will help you check in, load your coolers, and find your reserved spot on the boat. As we cruise out to our exclusive swimming areas, the DJ kicks off the party while our photographer starts capturing candid moments of your celebration.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Once we anchor at one of Lake Travis's most beautiful coves, you'll have full access to giant floats, swimming areas, and plenty of space to dance and celebrate. The multi-group atmosphere means you'll meet other bachelorette parties from across the country, creating an electric energy that makes <strong>austin party cruises</strong> truly special. Many brides say the social aspect - meeting and celebrating with other bride tribes - was their favorite unexpected part of the experience!
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 4. AVAILABILITY / BOOKING */}
      <SectionReveal>
        <section id="availability" className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Calendar className="h-4 w-4 mr-2 inline" />
                Availability & Booking
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                Reserve Your Girls' Weekend Celebration
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Peak bachelorette weekends book 8-12 weeks for priority time slots - once they book they\'re gone!
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
                    ATX Disco Cruises run <strong>Friday 12-4pm, Saturday 11am-3pm, Saturday 3:30-7:30pm</strong> during peak season (April-September).
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
                    <strong>Book 8-10 weeks before the date</strong> for peak weekends. Last-minute spots sometimes available for weekdays and off-season.
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
                    Simple online booking with <strong>instant confirmation</strong>. Secure checkout for your bride tribe convenience.
                  </p>
                  <Badge className="bg-green-600 text-white">
                    Book in Minutes
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <div className="text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-10 max-w-4xl mx-auto border-2 border-pink-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 heading-unbounded">Ready to Book Your Bachelorette Party?</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Check availability and get instant pricing for your girls' weekend on Lake Travis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div
                  className="xola-custom xola-checkout"
                  data-button-id="695186923c261203770cc2e7"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg px-10 py-6"
                  >
                    <Calendar className="mr-2 h-6 w-6" />
                    Check Availability Now
                  </Button>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('tel:+15124885892')}
                  className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold text-lg px-10 py-6"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  Call (512) 488-5892
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 5. BENEFITS */}
      <SectionReveal>
        <section id="benefits" className="py-12 md:py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Trophy className="h-4 w-4 mr-2 inline" />
                Key Benefits
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                Why Bachelorette Parties Choose Us
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                The ultimate girls' weekend celebration on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
        <section id="whats-included" className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <CheckCircle className="h-4 w-4 mr-2 inline" />
                What's Included
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
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
                        <h3 className="heading-unbounded text-2xl mb-2 text-gray-900">{item.title}</h3>
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
        <section id="why-choose" className="py-12 md:py-20 bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-white/10 border-2 border-white text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm">
                <Crown className="h-4 w-4 mr-2 inline" />
                The Premier Difference
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-white leading-tight">
                Austin's Most Trusted Bachelorette Party Company
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Since 2009, we've been the go-to choice for bachelorette parties on Lake Travis
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
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
              >
                <Button
                  size="lg"
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-12 py-7"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Book Your Bachelorette Party Today
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
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Camera className="h-4 w-4 mr-2 inline" />
                Photo Gallery
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
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
        <section id="testimonials" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Quote className="h-4 w-4 mr-2 inline" />
                Customer Reviews
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
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
                <div
                  className="xola-custom xola-checkout"
                  data-button-id="695186923c261203770cc2e7"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-6"
                  >
                    Book Your Bachelorette Party Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 10. FAQs */}
      <SectionReveal>
        <section id="faqs" className="py-12 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <HelpCircle className="h-4 w-4 mr-2 inline" />
                FAQs
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
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
              <h3 className="heading-unbounded text-2xl font-bold mb-4 text-gray-900">Still Have Questions?</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our bachelorette party experts are here to help you plan the perfect Lake Travis celebration
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div
                  className="xola-custom xola-checkout"
                  data-button-id="695186923c261203770cc2e7"
                >
                  <Button
                    size="lg"
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start a Conversation
                  </Button>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('tel:+15124885892')}
                  className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call (512) 488-5892
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
        <section className="py-10 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              <AIOptimizedSection
                type="timeline"
                title="Your Bachelorette Party Day Timeline"
                description="What to expect on your Lake Travis bachelorette party cruise"
                data={[
                  {
                    time: "11:45 AM",
                    title: "Arrival at Anderson Mill Marina",
                    description: "Check in at the dock, meet your captain, load coolers onto the boat. Free parking available. Groups gather and get ready to celebrate!",
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
                    description: "Anchor at popular coves, swimming and floating on lily pads, DJ playing (Disco cruise), drinks flowing, bachelorette party games and celebrating the bride.",
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

      {/* Package Highlights */}
      <SectionReveal>
        <section className="py-10 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <AIOptimizedSection
              type="statistics"
              title="Bachelorette Party Experience Details"
              description="What to expect on your Lake Travis bachelorette party cruise"
              data={[
                {
                  value: "4 Hours",
                  label: "Cruise Duration",
                  icon: <Clock className="w-8 h-8" />
                },
                {
                  value: "$85-$105",
                  label: "Per Person Range",
                  icon: <DollarSign className="w-8 h-8" />
                },
                {
                  value: "14-75",
                  label: "Guest Capacity",
                  icon: <Users className="w-8 h-8" />
                },
                {
                  value: "DJ + Photo",
                  label: "Included Pros",
                  icon: <Music className="w-8 h-8" />
                },
                {
                  value: "5 Stars",
                  label: "Average Rating",
                  icon: <Star className="w-8 h-8" />
                }
              ]}
              className="max-w-6xl mx-auto"
            />
          </div>
        </section>
      </SectionReveal>

      {/* Party Planning Checklist */}
      <PartyPlanningChecklist partyType="Bachelorette Party" eventType="bachelorette celebration" />

      {/* Featured Snippets and SEO Content - NOW AT BOTTOM */}
      <SectionReveal>
        <section className="py-10 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto space-y-8">
              <FeaturedSnippet
                question="What is an Austin bachelorette party boat cruise?"
                answer="An Austin bachelorette party boat cruise is a 4-hour celebration on Lake Travis specifically designed for bachelorette parties. The ATX Disco Cruise features professional DJ services, photography, giant floats, and an epic party atmosphere that makes every bride's celebration unforgettable."
                format="paragraph"
              />
              
              <FeaturedSnippet
                question="What is included in a bachelorette party boat cruise?"
                answer="All bachelorette party cruises include: Professional DJ playing bride's favorites, professional photographer capturing memories, giant lily pad floats (6x20'), disco ball cups and party supplies, private cooler with ice, mimosa supplies with champagne flutes, ice water stations, clean restrooms, and shaded lounge areas. Premium packages include alcohol delivery and personalized bride items."
                format="paragraph"
              />

              <FeaturedSnippet
                question="How much does an Austin bachelorette party boat cost?"
                answer="Austin bachelorette party boat cruises range from $85-$105 per person depending on the day and time slot. Saturday 3:30-7:30pm is $85/person ($111.56 with tax & gratuity), Friday 12-4pm is $95/person ($124.88 with tax & gratuity), and Saturday 11am-3pm is $105/person ($137.81 with tax & gratuity). All time slots include professional DJ, photographer, giant floats, party supplies, and BYOB with coolers and ice."
                format="paragraph"
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Quick Answer Boxes - MOVED TO BOTTOM */}
      <SectionReveal>
        <section className="py-10 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
        <section className="py-10 md:py-16 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <RelatedServicesSection
              title="Other Party Options for Your Girls' Weekend"
              description="Explore more celebration options on Lake Travis"
              services={[
                {
                  title: "Combined Bachelor Bachelorette Party",
                  description: "Celebrate together! Combined bachelor bachelorette party austin cruises bring everyone together for one epic Lake Travis experience",
                  href: "/combined-bachelor-bachelorette",
                  icon: <Heart className="h-8 w-8" />
                },
                {
                  title: "Austin Bachelor Party Boat",
                  description: "Epic austin bachelor party boat cruises on Lake Travis for the guys",
                  href: "/bachelor-party-austin",
                  icon: <Users className="h-8 w-8" />
                },
                {
                  title: "ATX Disco Cruise",
                  description: "Join the legendary austin party boat experience with DJ and photographer",
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
          { href: '/combined-bachelor-bachelorette', label: 'Combined Bachelor Bachelorette Party Austin', description: 'Celebrate together with a combined bach party on Lake Travis' },
          { href: '/bachelor-party-austin', label: 'Austin Bachelor Party Boat', description: 'Epic bachelor party cruises on Lake Travis' },
          { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', description: 'Join the legendary austin party boat experience' },
          { href: '/private-cruises', label: 'Private Boat Rentals', description: 'Book a private boat for your group' },
        ]}
      />

      <Footer />
    </div>
  );
}

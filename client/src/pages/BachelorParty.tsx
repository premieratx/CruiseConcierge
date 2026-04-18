import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigationLuxury';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  Plane, Wine, Eye, Bot, Navigation, ChevronDown, ChevronRight
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DISCO_PRICING } from '@shared/constants';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { SectionReveal } from '@/components/SectionReveal';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';
import Breadcrumb from '@/components/Breadcrumb';
import { FeaturedSnippet, FeaturedSnippetHowTo } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
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
import { YouTubeVideoBackground } from '@/components/YouTubeVideoBackground';
import { DiscoCruisePricing } from '@/components/DiscoCruisePricing';
import ScrollingPhotoGallery from '@/components/ScrollingPhotoGallery';
import VideoShowcaseGrid from '@/components/VideoShowcaseGrid';
import { BACHELOR_GALLERY } from '@/lib/media';
import showcaseVideo1 from '@assets/disco_dance_party_v3.mp4';
import showcaseVideo2 from '@assets/mr_brightside_compressed.mp4';
import showcaseVideo3 from '@assets/pursuit_of_happiness_compressed.mp4';
import showcaseVideo4 from '@assets/fireball_dance_party_compressed.mp4';

// Hero video - Clever Girl walkthrough
const heroVideo = '/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4';

// BACHELOR PARTY PHOTOS - Unique party photos alternating with boat photos
const heroImage1 = BACHELOR_GALLERY[0].src;
const heroImage2 = BACHELOR_GALLERY[2].src;
const heroImage3 = BACHELOR_GALLERY[4].src;
const galleryImage1 = BACHELOR_GALLERY[6].src;
const galleryImage2 = BACHELOR_GALLERY[7].src;
const galleryImage3 = BACHELOR_GALLERY[1].src;
const discoImage1 = BACHELOR_GALLERY[3].src;
const discoImage2 = BACHELOR_GALLERY[5].src;

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

// ATX Disco Cruise packages are now rendered via DiscoCruisePricing component
// which uses data from @shared/constants

// Private Cruise options for bachelors
const privateCruiseOptions = [
  {
    id: 'day_tripper',
    name: 'Day Tripper (1-14 guests)',
    capacity: 14,
    weekdayRate: 800,
    weekendRate: 1400,
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
    weekdayRate: 900,
    weekendRate: 1500,
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
    weekdayRate: 1000,
    weekendRate: 1600,
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
    description: 'Co-ed: bachelorette & bachelor groups from across the country'
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
    answer: 'We\'ve got boats from 14 to 75 people. Most bachelor parties book the Disco Cruise — it\'s a co-ed experience where your crew parties alongside bachelorette groups from across the country. More energy, more fun.'
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
    answer: 'BYOB for 21+. Bring whatever you want - beer, liquor, seltzers. Cans/plastic only. We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) and cups.'
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

// Blog links for Bachelor Party
const bachelorBlogs = [
  { href: "/blogs/austin-bachelor-party-ideas", title: "Austin Bachelor Party Ideas" },
  { href: "/lake-travis-bachelor-party-boats", title: "Lake Travis Bachelor Party Boats" },
  { href: "/blogs/lake-travis-bachelor-party-austin-celebrations", title: "Lake Travis Bachelor Party Celebrations" },
  { href: "/blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations", title: "Ultimate Bachelor Boat Rental Guide" }
];

// Bachelor Specific FAQ
const bachelorFaqs = [
  {
    question: "What's included in the ATX Disco Cruise?",
    answer: "Every ATX Disco Cruise bachelor party includes: 4-hour Lake Travis cruise, professional DJ entertainment, professional photographer with digital photos, access to giant lily pad floats, private cooler with ice, disco ball necklace for the groom, and party supplies."
  },
  {
    question: "How many guys can join?",
    answer: "We've got boats from 14 to 75 people. For the ATX Disco Cruise, you can book for groups of any size, from 2 to 40+."
  },
  {
    question: "Do we have to mix with other groups?",
    answer: "The ATX Disco Cruise is a multi-group experience where you celebrate alongside other bachelor and bachelorette parties. This creates an electric, high-energy atmosphere. If you want a private boat for just your crew, we offer private charters for 14, 25, 50, or 75 guests."
  },
  {
    question: "What about alcohol?",
    answer: "All our cruises are BYOB. Bring whatever your crew drinks—beer, liquor, seltzers. Cans/plastic only for safety. We provide coolers and ice."
  },
  {
    question: "Can we bring food?",
    answer: "Yes, you are welcome to bring snacks and food. We recommend easy-to-eat items. For private charters, we can also help coordinate catering."
  },
  {
    question: "Private vs Disco — which is better for a bachelor party?",
    answer: "The Disco Cruise is best for groups who want a high-energy party atmosphere with a DJ, photographer, and other groups to celebrate with. Private charters are best for groups who want total privacy, their own custom itinerary, and to control their own music."
  },
  {
    question: "How far in advance to book?",
    answer: "Peak bachelor season weekends book 8-12 weeks in advance. We recommend locking in your date as soon as your travel is confirmed."
  },
  {
    question: "Deposit and cancellation policy?",
    answer: "We offer a full refund if canceled within 48 hours of booking. After that, we require 50% deposit to hold the date, with the balance due 14 days before your cruise."
  },
  {
    question: "What's different about the bachelor vs bachelorette experience?",
    answer: "While both get the same top-tier amenities (DJ, photographer, floats), we tailor the experience to each group. Grooms get special treatment, and our DJs know how to keep the energy right for a bachelor send-off."
  }
];

// Photo gallery items - Alternating party and boat photos
const galleryPhotos = BACHELOR_GALLERY.map((photo, idx) => ({
  id: idx + 1,
  src: photo.src,
  alt: photo.alt
}));

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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroImages = [heroImage1, heroImage2, heroImage3];
  
  const carouselVideos = [
    { id: 'USWZ3BrexEI', title: 'Full Length Disco Cruise Highlight Reel', isShort: false },
    { id: 'riFpt4IEmBY', title: 'Girls Gone Disco', isShort: true },
    { id: 'AmiWjlT5u10', title: 'Kyle: MVP of the ATX Disco Cruise', isShort: true },
    { id: '4-Yx24Y6oro', title: 'ATX Disco Cruise Experience', isShort: false }
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

  // Legacy cross-origin iframe listener removed — quote flow is now
  // in-house (EmbeddedQuoteFlow) and routes its own post-submit UX.

  const handleGetQuote = (packageId?: string) => {
    const params = new URLSearchParams({ cruiseType: 'bachelor' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white" data-page-ready="bachelor-party">
      <SEOHead
        pageRoute="/bachelor-party-austin"
        defaultTitle="Austin Bachelor Party Boats | Lake Travis Party Boat Rentals (2026)"
        defaultDescription="Plan the perfect Austin bachelor party on Lake Travis. Party boats starting at $85/person with DJ, photographer & giant floats. BYOB, 4-hour cruises. 150,000+ guests served. Book today!"
        defaultKeywords={["Austin bachelor party", "Lake Travis bachelor party", "party boat Austin", "austin party cruise", "bachelor party boat Austin", "ATX Disco Cruise bachelor", "Austin bachelor ideas", "Lake Travis party boat", "party cruises"]}
        schemaType="service"
      />
      
      {/* Comprehensive Schema Markup for SEO */}
      <SchemaMarkup 
        schemas={[
          generateLocalBusinessSchema({
            name: "Premier Party Cruises - Bachelor Parties",
            description: "Austin's premier bachelor party boat service on Lake Travis with professional DJ, photographer, and all-inclusive packages.",
            url: "https://premierpartycruises.com/bachelor-party",
            priceRange: "$85-$125",
            aggregateRating: {
              ratingValue: "4.9",
              reviewCount: "130"
            }
          }),
          generateServiceSchema({
            name: "Austin Bachelor Party Boat Service",
            description: "All-inclusive bachelor party packages on Lake Travis with professional entertainment, photography, and party supplies.",
            serviceType: "Bachelor Party Cruise",
            areaServed: "Austin",
            hasOfferCatalog: [
              { name: "Friday 12-4pm ATX Disco Cruise", description: "4-hour party cruise with DJ, photographer, and floats", price: 95 },
              { name: "Saturday 11am-3pm ATX Disco Cruise", description: "Premium Saturday afternoon time slot with all inclusions", price: 105 },
              { name: "Saturday 3:30-7:30pm ATX Disco Cruise", description: "Evening party cruise with DJ and photographer", price: 85 }
            ],
            aggregateRating: {
              ratingValue: "4.9",
              reviewCount: "130"
            }
          }),
          generateFAQSchema([
            { 
              question: "What is the best bachelor party boat in Austin?", 
              answer: "Premier Party Cruises offers Austin's #1 rated bachelor party boat experience on Lake Travis. With the ATX Disco Cruise, every cruise includes professional DJ, photographer, giant floats, and 4 hours of legendary celebration." 
            },
            { 
              question: "How much does a bachelor party cruise cost in Austin?", 
              answer: "ATX Disco Cruise bachelor parties range from $85-$105 per person depending on the time slot. Friday 12-4pm is $95/person, Saturday 11am-3pm is $105/person, and Saturday 3:30-7:30pm is $85/person. All prices include tax and gratuity." 
            },
            { 
              question: "What's included in an Austin bachelor party boat cruise?", 
              answer: "Every ATX Disco Cruise bachelor party includes: 4-hour Lake Travis cruise, professional DJ entertainment, professional photographer with digital photos, access to giant lily pad floats, private cooler with ice, disco ball necklace for the groom, party supplies, and the unique multi-group party atmosphere where you celebrate with other bachelor parties." 
            },
            { 
              question: "How many people can fit on a bachelor party boat?", 
              answer: "ATX Disco Cruise hosts 40-80 guests total with multiple bachelor and bachelorette groups from all over the country creating an electric party atmosphere. For private bachelor party charters, boats range from 14-person to 75-person capacity depending on your crew size." 
            }
          ])
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
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-gray-900 pt-[116px]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Fallback image */}
          <img src={heroImage1} alt="Austin Bachelor Party" className="w-full h-full object-cover" style={{ display: videoLoaded && !videoFailed ? 'none' : 'block' }} loading="eager" />
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
              <Badge className="font-sans tracking-wider font-bold uppercase text-sm bg-brand-navy text-white px-6 py-2 border-0">
                Premier Lake Travis Experience
              </Badge>
            </motion.div>
            
            {/* CRITICAL: H1 with text-6xl and heading-unbounded - Largest text on page */}
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold heading-unbounded mb-4 md:mb-6 text-center leading-tight px-2"
              data-editable 
              data-editable-id="bachelor-hero-title"
            >
              Austin Bachelor Party Boats on Lake Travis
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
              Exclusively for <InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Parties">Bachelorette</InternalLinkHighlight> & Bachelor Parties<br/>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl">The Highlight of Your Weekend Every. Damn. Time.</span>
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
            >
              <Button
                size="lg"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg text-sm sm:text-lg h-auto"
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
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg text-sm sm:text-lg h-auto whitespace-normal"
                  data-testid="button-hero-book-now-bachelor"
                >
                  <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-center leading-tight">BOOK NOW</span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured YouTube Video - Full Disco Cruise Highlight Reel */}
      <section className="py-10 md:py-14 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">Watch the ATX Disco Cruise in Action</h2>
          <p className="text-center text-gray-300 text-sm md:text-base mb-6">Full-length highlight reel — real footage from real parties</p>
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/USWZ3BrexEI?rel=0&modestbranding=1"
              title="ATX Disco Cruise Full Highlight Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Video Showcase Grid - 4 autoplay videos */}
      <VideoShowcaseGrid
        videos={[
          { src: showcaseVideo1, title: 'Disco Cruise Dance Party' },
          { src: showcaseVideo2, title: 'Mr. Brightside Singalong OTW Home' },
          { src: showcaseVideo3, title: 'Pursuit of Happiness IRL' },
          { src: showcaseVideo4, title: "Just Gettin' Started" },
        ]}
        title="Action Shots from the ATX Disco Cruise"
        subtitle="Tap any video to watch full screen with audio"
      />

      {/* ATX Disco Cruise Video Carousel Section */}
      <section className="py-8 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="relative">
            <button 
              onClick={goToPrevVideo}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full transition-all shadow-lg"
              aria-label="Previous video"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={goToNextVideo}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full transition-all shadow-lg"
              aria-label="Next video"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
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
                        ? 'w-[40%] md:w-[35%] opacity-100 scale-105 z-10 ring-4 ring-blue-500' 
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
            
            <p className="text-center text-white text-sm md:text-base mt-2 font-medium">
              {carouselVideos[activeVideoIndex].title}
            </p>
            
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

      {/* Subtle Tagline Section - Below Hero */}
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
            <div className="flex items-center gap-2 text-gray-700">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium">Popular weekends book 8-10 weeks before the date</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Photo Gallery */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="text-center mb-6">
          <h2 className="text-3xl heading-unbounded font-bold text-gray-900 dark:text-white mb-2">
            Real Bachelor Parties on Lake Travis
          </h2>
          <p className="text-gray-600 dark:text-gray-300">See the legendary parties happening every weekend</p>
        </div>
        <ScrollingPhotoGallery pageType="bachelor" />
      </section>

      {/* Quote Builder Section */}
      <QuoteBuilderSection />

      {/* YOUR TWO OPTIONS SECTION */}
      <SectionReveal>
        <section id="your-options" className="pt-12 pb-8 md:pt-20 md:pb-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Target className="h-4 w-4 mr-2 inline" />
                Two Legendary Options for Your Send-Off
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                Choose Your Perfect Bachelor Party Style
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Two completely different experiences - both legendary!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* ATX Disco Cruise Option */}
              <Card className="border-3 border-blue-400 hover:shadow-2xl transition-all flex flex-col">
                <CardHeader className="bg-brand-navy text-white">
                  <div className="flex items-center justify-center mb-4">
                    <Disc3 className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">OPTION 1: ATX Disco Cruise</CardTitle>
                  <CardDescription className="text-white text-center mt-2">
                    Multi-Group Party Experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-1">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Party with bachelorette and bachelor parties from across the country — it's a co-ed experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>All-inclusive: DJ, photographer, floats included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>$85-$105 per person (3 time slots available)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Zero planning stress - everything handled</span>
                    </li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-center font-bold">Group of 10 = $850-$1,050 total</p>
                    <p className="text-center text-sm text-gray-600">Friday/Saturday time slots available!</p>
                  </div>
                  <div className="mt-auto">
                    <Button
                      className="w-full bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
                      onClick={() => navigate('/atx-disco-cruise')}
                    >
                      Learn More About ATX Disco
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Private Cruise Option */}
              <Card className="border-2 border-gray-300 hover:shadow-2xl transition-all flex flex-col">
                <CardHeader className="bg-brand-navy text-white">
                  <div className="flex items-center justify-center mb-4">
                    <Ship className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">OPTION 2: Private Cruises</CardTitle>
                  <CardDescription className="text-white text-center mt-2">
                    Exclusive Boat for Your Crew
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-1">
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
                      <span>Starting at $800 for 4-hour cruise (based on boat + day) + tax & gratuity</span>
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
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-center font-bold">Starting at $800 for your crew</p>
                    <p className="text-center text-sm text-gray-600">Base boat rate + tax & gratuity</p>
                  </div>
                  <div className="mt-auto">
                    <Button
                      className="w-full bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
                      onClick={() => navigate('/private-cruises')}
                    >
                      Learn More About Private
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 3. PACKAGES & PRICING */}
      <SectionReveal>
        <section id="packages" className="pt-12 pb-12 md:pt-16 md:pb-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Package className="h-4 w-4 mr-2 inline" />
                ATX Disco Cruise Packages
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                Choose Your Bachelor Party Time Slot
              </h2>
              <p className="text-xl text-blue-600 max-w-3xl mx-auto leading-relaxed font-medium">
                ATX Disco Cruise: $85-$105/person - cheaper than Vegas, more legendary
              </p>
            </div>

            <Tabs defaultValue="atx_disco" className="max-w-7xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 bg-brand-navy p-2 rounded-xl">
                <TabsTrigger value="atx_disco" className="font-bold data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:bg-white/20 data-[state=inactive]:text-white hover:bg-white/30 rounded-lg transition-all">ATX Disco Cruise</TabsTrigger>
                <TabsTrigger value="private" className="font-bold data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:bg-white/20 data-[state=inactive]:text-white hover:bg-white/30 rounded-lg transition-all">Private Cruises</TabsTrigger>
              </TabsList>

              <TabsContent value="atx_disco" className="space-y-8">
                <DiscoCruisePricing partyType="bachelor" showAddOns={true} className="max-w-6xl mx-auto" />
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
                            <div className="text-3xl font-bold text-gray-900">
                              ${boat.weekdayRate.toLocaleString()}–${boat.weekendRate.toLocaleString()}
                            </div>
                            <p className="text-xl font-bold text-gray-800 mt-1">for 4-hour cruise</p>
                            <p className="text-xs text-gray-500 mt-1">+ tax & gratuity · weekday–Saturday rates</p>
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
                  <Card className="border-2 border-gray-200 bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-2xl">Optional Add-Ons for Private Cruises</CardTitle>
                      <CardDescription>Customize your private experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {privateCruiseAddOns.map((addon, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="font-bold text-lg">{addon.name}</div>
                            <div className="text-2xl font-bold text-gray-900 mt-1">
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
                          className="bg-brand-navy hover:bg-blue-900 text-white font-bold"
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

          </div>
        </section>
      </SectionReveal>

      {/* 4. WHAT TO EXPECT */}
      <SectionReveal>
        <section id="what-to-expect" className="pt-8 pb-12 md:pt-12 md:pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Star className="h-4 w-4 mr-2 inline" />
                What to Expect
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
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
                          Park and walk to the boat. Your crew meets bachelor and bachelorette groups from all over the country - instant party energy. Captain checks everyone in.
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
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Cruise Lake Travis (30-45 min)</h4>
                        <p className="text-gray-700 leading-relaxed">
                          DJ starts spinning, drinks flowing, energy building. Photographer captures the crew. Meet bachelor and bachelorette groups from cities across America.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        4
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Swimming at Nature Preserve (1.5-2 hours)</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Tied up along cliffs with crystal clear water. Giant floats out, everyone swimming, DJ going hard. This is when legendary moments happen.
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
                    <p className="text-center font-bold text-lg mb-3">Everything Provided:</p>
                    <p className="text-center text-gray-700">DJ, photographer, floats, coolers stocked with ice, party supplies. Order drinks from Party On Delivery to have them waiting on the boat!</p>
                    <p className="text-center text-gray-600 mt-3">Digital photos delivered within 48 hours</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="private_expect" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold mb-8 text-center">Private Cruise - Your Boat, Your Rules</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-xl">
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
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-xl">
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
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-xl">
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
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-xl">
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
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-xl">
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

                  <div className="mt-10 p-6 bg-gray-50 rounded-lg">
                    <p className="text-center font-bold text-lg mb-3">Coolers & Drinks:</p>
                    <p className="text-center text-gray-700">Empty coolers provided on board. Add ice with our Essentials or Ultimate package. Order drinks from Party On Delivery to have them stocked on the boat!</p>
                    <p className="text-center text-gray-600 mt-3">Note: DJ ($600) and Photographer ($600) available as add-ons</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="availability" className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Calendar className="h-4 w-4 mr-2 inline" />
                Check Availability
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
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

              <Card className="border-2 border-gray-200 hover:border-brand-yellow transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <PartyPopper className="h-10 w-10 mb-4 mx-auto text-blue-600" />
                  <CardTitle className="text-xl font-bold">Afternoon Cruises</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-3">2pm - 6pm</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Peak party time on Lake Travis
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Booking Timeline */}
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl shadow-lg p-10 border border-gray-200">
              <h3 className="text-2xl font-semibold heading-unbounded text-center mb-8 text-gray-900">
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
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Select Your Time Slot</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Choose between ATX Disco Cruise (3 time slots available) or Private Charter. Each has unique benefits for your crew.
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
                <div
                  className="xola-custom xola-checkout inline-block"
                  data-button-id="695186923c261203770cc2e7"
                >
                  <Button
                    size="lg"
                    className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg text-lg h-auto"
                  >
                    <Calendar className="mr-2 h-6 w-6" />
                    Check Availability & Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 7. FEATURES & WHAT'S INCLUDED */}
      <SectionReveal>
        <section id="whats-included" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <CheckCircle className="h-4 w-4 mr-2 inline" />
                What's Included
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
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
        <section id="why-choose" className="py-20 bg-brand-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-white/10 border-2 border-white text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm">
                <Crown className="h-4 w-4 mr-2 inline" />
                The Premier Difference
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-white leading-tight">
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
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
              >
                <Button
                  size="lg"
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg text-lg h-auto"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Lock In Your Legendary Send-Off
                </Button>
              </div>
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
              <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Camera className="h-4 w-4 mr-2 inline" />
                Photo Gallery
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
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

      {/* Cross-link: Combined Bach + Bachelorette Cruise authority block */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-1">Plan together, celebrate together</p>
              <p className="text-white text-lg font-semibold">The ATX Disco Cruise works for <Link href="/combined-bachelor-bachelorette-austin" className="text-brand-yellow hover:underline">combined bach parties</Link> too — guys and girls on the same cruise, same energy, all-inclusive.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/atx-disco-cruise">
                <a className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-5 py-3 rounded-lg text-sm whitespace-nowrap transition-colors">⭐ ATX Disco Cruise</a>
              </Link>
              <Link href="/bachelorette-party-austin">
                <a className="border border-white/40 text-white hover:bg-white/10 font-semibold px-5 py-3 rounded-lg text-sm whitespace-nowrap transition-colors">Bachelorette Party →</a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <SectionReveal>
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Quote className="h-4 w-4 mr-2 inline" />
                Real Reviews
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
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
              <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <HelpCircle className="h-4 w-4 mr-2 inline" />
                Frequently Asked Questions
              </Badge>
              <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                Bachelor Party FAQs
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Everything you need to know before booking
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {faqItems.map((item) => (
                <Collapsible
                  key={item.id}
                  className="border-2 border-gray-200 rounded-lg px-6 py-4 data-[state=open]:border-brand-yellow transition-all"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-blue-600 text-left font-bold text-lg group">
                    {item.question}
                    <ChevronDown className="h-5 w-5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="text-gray-700 leading-relaxed pt-4 text-base">
                    {item.answerJsx || item.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FINAL CTA SECTION */}
      <section className="py-20 bg-brand-navy">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready for Your Legendary Bachelor Party?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join hundreds of happy customers who chose Premier Party Cruises for their Lake Travis send-off
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div
              className="xola-custom xola-checkout"
              data-button-id="695186923c261203770cc2e7"
            >
              <Button
                size="lg"
                className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg text-xl h-auto"
              >
                <Calendar className="mr-2 h-6 w-6" />
                Book ATX Disco Cruise
              </Button>
            </div>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/private-cruises')}
              className="text-xl px-12 py-7 border-white text-white hover:bg-white/10"
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

      {/* Related Experiences Section - SEO Internal Linking */}
      <SectionReveal>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Related Austin Party Experiences
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore more Lake Travis party options for your celebration
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-all border-2 hover:border-brand-yellow">
                <CardContent className="pt-6 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-bold text-xl mb-3">Combined Bachelor Bachelorette Party Austin</h3>
                  <p className="text-gray-600 mb-4">
                    Why celebrate separately? Book a combined bachelor bachelorette party austin experience on Lake Travis - everyone celebrates together!
                  </p>
                  <Link href="/combined-bachelor-bachelorette-austin">
                    <Button variant="outline" className="w-full border-gray-700 text-gray-700 hover:bg-gray-50">
                      View Combined Parties <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-all border-2 hover:border-brand-yellow">
                <CardContent className="pt-6 text-center">
                  <Crown className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-bold text-xl mb-3">Lake Travis Bachelorette Party</h3>
                  <p className="text-gray-600 mb-4">
                    Planning a separate celebration? Check out our lake travis bachelorette party cruises for an unforgettable bride tribe experience.
                  </p>
                  <Link href="/bachelorette-party-austin">
                    <Button variant="outline" className="w-full border-gray-700 text-gray-700 hover:bg-gray-50">
                      View Bachelorette Parties <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-all border-2 hover:border-orange-300">
                <CardContent className="pt-6 text-center">
                  <Disc3 className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                  <h3 className="font-bold text-xl mb-3">ATX Disco Cruise</h3>
                  <p className="text-gray-600 mb-4">
                    Join the legendary austin party boat experience! DJ, photographer, and party atmosphere included on every cruise.
                  </p>
                  <Link href="/atx-disco-cruise">
                    <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                      View ATX Disco Cruise <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Austin Bachelor Party Planning Guides */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-unbounded">
              Austin Bachelor Party Planning Guides
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert tips and local advice for planning an epic bachelor weekend in Austin.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bachelorBlogs.map((blog, index) => (
              <Link key={index} href={blog.href}>
                <a className="group block h-full">
                  <Card className="h-full border-2 border-transparent group-hover:border-brand-yellow transition-all hover:shadow-xl overflow-hidden bg-white">
                    <CardContent className="p-6 flex items-center justify-between">
                      <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </span>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-brand-yellow group-hover:translate-x-1 transition-all" />
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bachelor Party FAQ Section */}
      <section id="faqs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-brand-yellow text-gray-900 px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
              Bachelor Party FAQs
            </Badge>
            <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
              Common Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-6xl mx-auto">
            {bachelorFaqs.map((faq, index) => (
              <Collapsible key={index} className="border-b border-gray-100">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-6 text-left group">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors pr-8">
                    {faq.question}
                  </h3>
                  <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-brand-yellow transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Internal Links Strip */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
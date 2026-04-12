import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, Sun, Shield, Award,
  MessageCircle, Quote, GlassWater, Check,
  DollarSign, HelpCircle, Anchor, Navigation, ChevronDown, Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { SectionReveal } from '@/components/SectionReveal';
import { InternalLinkHighlight } from '@/components/InternalLinkHighlight';
import { WhatToBring } from '@/components/WhatToBring';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { StickyCTA } from '@/components/StickyCTA';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { TransportationGuide } from '@/components/TransportationGuide';
import { LazyImage } from '@/components/LazyImage';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import VideoShowcaseGrid from '@/components/VideoShowcaseGrid';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BACHELORETTE_GALLERY } from '@/lib/media';
import { bacheloretteReviews, combinedBachReviews, type Review } from '@shared/reviews-data';
import ScrollingPhotoGallery from '@/components/ScrollingPhotoGallery';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import showcaseVideo1 from '@assets/disco_dance_party_v3.mp4';
import showcaseVideo2 from '@assets/mr_brightside_compressed.mp4';
import showcaseVideo3 from '@assets/pursuit_of_happiness_compressed.mp4';
import showcaseVideo4 from '@assets/fireball_dance_party_compressed.mp4';
import { DiscoCruisePricing } from '@/components/DiscoCruisePricing';

// Hero video - Clever Girl walkthrough
const heroVideo = '/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4';

// BACHELORETTE PARTY PHOTOS
const heroImage1 = BACHELORETTE_GALLERY[0].src;
const heroImage2 = BACHELORETTE_GALLERY[2].src;
const heroImage3 = BACHELORETTE_GALLERY[4].src;
const galleryImage1 = BACHELORETTE_GALLERY[6].src;

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
    weekdayRate: 800,
    weekendRate: 1400,
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
    weekdayRate: 900,
    weekendRate: 1500,
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
    weekdayRate: 1000,
    weekendRate: 1600,
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
    icon: Sparkles,
    title: 'Party Supplies',
    description: 'Cups, koozies, decorations'
  }
];

// Use bacheloretteReviews + combinedBachReviews for Bachelorette Party page
const brideTestimonials: Review[] = [...bacheloretteReviews, ...combinedBachReviews];

// Photo gallery items
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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Video carousel data
  const carouselVideos = [
    { id: 'USWZ3BrexEI', title: 'Full Length Disco Cruise Highlight Reel' },
    { id: '4-Yx24Y6oro', title: 'ATX Disco Cruise Experience' },
    { id: 'riFpt4IEmBY', title: 'Girls Gone Disco' },
    { id: 'AmiWjlT5u10', title: 'Kyle: MVP of the ATX Disco Cruise' }
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

  const handleGetQuote = (packageId?: string) => {
    const params = new URLSearchParams({ cruiseType: 'bachelorette' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white" data-page-ready="bachelorette-party">
      <SEOHead
        pageRoute="/bachelorette-party-austin"
        defaultTitle="Austin Bachelorette Party Boats | Lake Travis Bachelorette Cruise (2026)"
        defaultDescription="Austin bachelorette party boats starting at $85/person on Lake Travis. DJ, photographer, giant unicorn float, BYOB. The perfect bachelorette cruise. 150K+ happy guests. Reserve now!"
        defaultKeywords={["Austin bachelorette party", "Lake Travis bachelorette party", "party boat Austin", "austin party cruise", "bachelorette party boat Austin", "ATX Disco Cruise bachelorette", "Austin bachelorette ideas", "Lake Travis party boat", "cruise for bachelorette party"]}
        schemaType="service"
      />
      
      <PublicNavigation />
      
      <StickyCTA
        primaryText="Get Free Quote"
        primaryAction={() => handleGetQuote()}
        secondaryText="Call Now"
        secondaryHref="tel:+15124885892"
        showOnDesktop={false}
      />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-gray-900 pt-[116px]">
        <div className="absolute inset-0 z-0">
          <img src={heroImage1} alt="Austin Bachelorette Party" className="w-full h-full object-cover" style={{ display: videoLoaded && !videoFailed ? 'none' : 'block' }} loading="eager" />
          {!videoFailed && (
            <video ref={videoRef} className="w-full h-full object-cover" style={{ display: videoLoaded ? 'block' : 'none' }} src={heroVideo} muted loop playsInline autoPlay preload="auto" onLoadedData={handleVideoLoadedData} onError={handleVideoError} />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-white text-center flex-grow flex items-center w-full py-12 md:py-20">
          <motion.div initial="hidden" animate="visible" variants={staggerChildren} className="max-w-5xl mx-auto w-full">
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge className="font-sans tracking-wider font-bold uppercase text-sm bg-brand-navy text-white px-4 sm:px-6 py-2 border-0">
                <Heart className="h-4 w-4 mr-2 inline" />
                Premier Bachelorette Experience
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold heading-unbounded mb-4 md:mb-6 text-center leading-tight px-2"
              data-editable 
              data-editable-id="bachelorette-hero-title"
            >
              Austin Bachelorette Party Boats on Lake Travis
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="text-xl sm:text-2xl md:text-3xl text-brand-yellow font-semibold mb-4 md:mb-6 px-2">
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

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                size="lg"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-7 rounded-lg"
              >
                See Packages & Pricing
                <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              
              <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
                <Button
                  size="lg"
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-7 rounded-lg whitespace-normal"
                >
                  <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-center leading-tight">BOOK NOW</span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-20 w-full bg-black/60 backdrop-blur-sm py-4 px-6 border-t border-white/20">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-white text-lg md:text-xl font-bold">
              Just <span className="text-brand-yellow">SHOW UP & GET DOWN</span> — Everything Included!
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STATS BAR */}
      <section className="py-6 bg-brand-navy">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '15+', label: 'Years on Lake Travis' },
              { value: '150K+', label: 'Happy Guests' },
              { value: '#1', label: 'Austin Bachelorette Activity' },
              { value: '5★', label: 'Google Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-brand-yellow heading-unbounded">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
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

      {/* Video Showcase Grid */}
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

      {/* SCROLLING PHOTO GALLERY */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="text-center mb-6">
          <h2 className="text-3xl heading-unbounded font-bold text-gray-900 mb-2">
            Real Bachelorette Parties on Lake Travis
          </h2>
          <p className="text-gray-600">See the celebrations happening every weekend</p>
        </div>
        <ScrollingPhotoGallery pageType="bachelorette" />
      </section>

      {/* Video Carousel */}
      <section className="py-8 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="relative">
            <button onClick={goToPrevVideo} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full transition-all shadow-lg">
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 rotate-90" />
            </button>
            <button onClick={goToNextVideo} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full transition-all shadow-lg">
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 -rotate-90" />
            </button>
            
            <div className="flex items-center justify-center gap-2 md:gap-3 py-4 px-10 md:px-16">
              {carouselVideos.map((video, index) => {
                const isActive = index === activeVideoIndex;
                return (
                  <div key={video.id} onClick={() => setActiveVideoIndex(index)} className={`transition-all duration-300 cursor-pointer rounded-xl overflow-hidden shadow-2xl flex-shrink-0 ${isActive ? 'w-[40%] md:w-[35%] opacity-100 scale-105 z-10 ring-4 ring-brand-yellow' : 'w-[18%] md:w-[20%] opacity-60 scale-95 hover:opacity-80'}`}>
                    <div className='aspect-video'>
                      <iframe src={`https://www.youtube.com/embed/${video.id}${isActive ? '?autoplay=1&mute=1&loop=1&playlist=' + video.id : ''}`} title={video.title} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-white text-sm md:text-base mt-2 font-medium">{carouselVideos[activeVideoIndex].title}</p>
          </div>
        </div>
      </section>

      {/* TWO OPTIONS COMPARISON */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Sparkles className="h-4 w-4 mr-2 inline" />
                Two Ways to Celebrate
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold heading-unbounded text-center mb-4 text-gray-900 leading-tight">
                Choose Your Bachelorette Party Style
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">Both options include a professional captain and a full 4 hours on the water.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 border-brand-navy hover:shadow-2xl transition-all flex flex-col">
                <CardHeader className="bg-brand-navy text-white rounded-t-lg">
                  <div className="flex items-center justify-center mb-3">
                    <Music className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-xl font-bold text-center">OPTION 1: ATX Disco Cruise</CardTitle>
                  <CardDescription className="text-white/80 text-center mt-1">Multi-Group All-Inclusive Party</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-1">
                  <ul className="space-y-3 mb-6">
                    {[
                      'Party with bachelorette crews from across the country — electric shared energy',
                      'All-inclusive: DJ, photographer, giant floats, coolers with ice',
                      '$85–$105 per person (three time slots available)',
                      'BYOB — beer in cans; wine, champagne, and spirits in your cooler welcome',
                      'Zero planning stress — we handle everything',
                      'Book as early as 8–12 weeks out for peak weekends',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-center font-bold text-gray-900">Group of 10 = $850–$1,050 total</p>
                    <p className="text-center text-sm text-gray-600">Friday or Saturday time slots available</p>
                  </div>
                  <div className="mt-auto">
                    <Button className="w-full bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-lg" onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}>
                      See Disco Cruise Pricing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-300 hover:shadow-2xl transition-all flex flex-col">
                <CardHeader className="bg-gray-800 text-white rounded-t-lg">
                  <div className="flex items-center justify-center mb-3">
                    <Ship className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-xl font-bold text-center">OPTION 2: Private Charter</CardTitle>
                  <CardDescription className="text-white/80 text-center mt-1">Exclusive Boat for Your Group Only</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-1">
                  <ul className="space-y-3 mb-6">
                    {[
                      'Entire boat exclusively for your bachelorette crew',
                      'Flexible timing — pick any date and time',
                      'Starting at $800 for a 4-hour cruise + tax & gratuity',
                      'BYOB with large on-board coolers and ice provided',
                      'Add DJ ($600) or Photographer ($600) as upgrades',
                      'Day Tripper (14), Meeseeks (30), or Clever Girl (75 guests)',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-center font-bold text-gray-900">Starting at $800 for your crew</p>
                    <p className="text-center text-sm text-gray-600">Base boat rate + tax & gratuity</p>
                  </div>
                  <div className="mt-auto">
                    <Button className="w-full bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-lg" onClick={() => navigate('/private-cruises')}>
                      See Private Cruise Options
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* HOW IT WORKS */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Calendar className="h-4 w-4 mr-2 inline" />
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold heading-unbounded text-gray-900 mb-4">
                From Booking to Boarding in 4 Steps
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                No day-of logistics headaches. Just show up and celebrate.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  icon: Calendar,
                  title: 'Pick Your Date & Time Slot',
                  body: 'Choose Friday 12–4pm ($95/person), Saturday 11am–3pm ($105/person), or Saturday 3:30–7:30pm ($85/person). Saturday 11am is the most popular bachelorette slot — book 8–12 weeks in advance.',
                },
                {
                  step: '02',
                  icon: Phone,
                  title: 'Book Online or Call',
                  body: 'Book through our website or call (512) 488-5892 to hold your date. We\'ll confirm your group size and any add-ons (Mimosa Cooler, photographer, etc.).',
                },
                {
                  step: '03',
                  icon: MapPin,
                  title: 'Arrive at Anderson Mill Marina',
                  body: 'Meet us at 13993 FM 2769, Leander, TX 78641 — just 35 minutes from downtown Austin. Free parking on-site. Show up BYOB ready — beer in cans, no glass beer bottles. Wine, champagne, and spirits in a cooler are fine.',
                },
                {
                  step: '04',
                  icon: Star,
                  title: 'Party on Lake Travis',
                  body: 'Board the boat and let the DJ take over. 4 hours of music, swimming, giant floats, and professional photos. You leave with hundreds of high-quality shots delivered digitally.',
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-brand-yellow" />
                  </div>
                  <div className="text-sm font-bold text-brand-yellow tracking-widest mb-2">STEP {item.step}</div>
                  <h3 className="font-bold text-gray-900 heading-unbounded text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* WHY LAKE TRAVIS FOR BACHELORETTE */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-brand-navy text-white px-4 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                  Why Lake Travis
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold heading-unbounded text-gray-900 mb-6 leading-tight">
                  Austin Is the #1 Bachelorette City in America
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>Austin has held its spot as one of America's top bachelorette destinations for over a decade — and Lake Travis is a big reason why. Unlike Nashville bar crawls or Scottsdale pool parties where you're competing for space with hundreds of strangers, Lake Travis puts your group on a boat with a professional DJ and photographer. Your own world. On the water. For four hours.</p>
                  <p>The ATX Disco Cruise is the only cruise in the US where multiple bachelorette groups celebrate together in a festival atmosphere. The energy is electric without anyone having to carry the vibe themselves — the DJ does that. Groups fly in from California, New York, and Chicago specifically for this experience.</p>
                  <p>Austin adds everything else a bachelorette weekend needs: world-class restaurants, a rooftop bar scene on Rainey Street, live music on 6th Street, and day spas. The combination is unmatched anywhere in the South.</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    'Crystal-clear swimming coves',
                    'Texas Hill Country backdrop',
                    'Devil\'s Cove anchor spot',
                    '30 min from downtown Austin',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {BACHELORETTE_GALLERY.slice(0, 4).map((photo, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden">
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* EARLY QUOTE BUILDER */}
      <QuoteBuilderSection title="Get Your Instant Bachelorette Quote" defaultCruiseType="bachelorette" />

      {/* 3. PRICING / PACKAGES */}
      <SectionReveal>
        <section id="packages" className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-navy text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Package className="h-4 w-4 mr-2 inline" />
                Bachelorette Packages
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                Choose Your Bachelorette Party Package
              </h2>
            </div>
            
            {/* ATX DISCO CRUISE OPTION */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <Badge className="bg-brand-navy text-white px-4 py-2 mb-4">OPTION 1: THE SOCIAL EXPERIENCE</Badge>
                <h3 className="text-3xl heading-unbounded font-bold mb-2 text-gray-900">ATX Disco Cruise</h3>
                <p className="text-lg text-gray-700">Party with bachelorette and bachelor parties from across the country</p>
              </div>
              <DiscoCruisePricing partyType="bachelorette" showAddOns={true} />
              <div className="flex justify-center mt-10">
                <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
                  <Button size="lg" className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold text-xl px-12 py-8 rounded-lg shadow-xl">
                    BOOK DISCO CRUISE NOW
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>

            {/* PRIVATE CRUISE OPTION */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <Badge className="bg-gray-700 text-white px-4 py-2 mb-4">OPTION 2: EXCLUSIVE CHARTER</Badge>
                <h3 className="text-3xl heading-unbounded font-bold mb-2 text-gray-900">Private Cruises</h3>
                <p className="text-lg text-gray-700">Exclusive boat just for your group</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-8">
                {privateCruiseOptions.map((boat) => (
                  <Card key={boat.id} className="relative h-full bg-white transition-all duration-300 border-2 border-gray-200 hover:border-brand-yellow hover:shadow-lg">
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Ship className="h-8 w-8 text-gray-600" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl heading-unbounded mb-2">{boat.name}</CardTitle>
                      <CardDescription className="text-base text-center">{boat.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center py-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-gray-900 mb-1">${boat.weekdayRate.toLocaleString()}–${boat.weekendRate.toLocaleString()}</div>
                        <div className="text-xl font-bold text-gray-800 mt-1">for 4-hour cruise</div>
                        <div className="text-xs text-gray-500 mt-1">+ tax & gratuity · weekday–Saturday rates</div>
                      </div>
                      <ul className="space-y-3">
                        {boat.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm leading-relaxed text-left">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold py-6 rounded-lg" onClick={() => navigate('/private-cruises')}>
                        Book Private Cruise
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Cross-link: Combined Bach + Disco Cruise authority block */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-1">Did you know?</p>
              <p className="text-white text-lg font-semibold">The ATX Disco Cruise is also Austin's #1 <Link href="/combined-bachelor-bachelorette-austin" className="text-brand-yellow hover:underline">combined bach party</Link> option — guys and girls on the same cruise, all-inclusive.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/atx-disco-cruise">
                <a className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-5 py-3 rounded-lg text-sm whitespace-nowrap transition-colors">⭐ ATX Disco Cruise</a>
              </Link>
              <Link href="/combined-bachelor-bachelorette-austin">
                <a className="border border-white/40 text-white hover:bg-white/10 font-semibold px-5 py-3 rounded-lg text-sm whitespace-nowrap transition-colors">Combined Party →</a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <SectionReveal>
        <section id="amenities" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Badge className="mb-6 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
              <Sparkles className="h-4 w-4 mr-2 inline" />
              Everything You Need Included
            </Badge>
            <h2 className="text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
              Bachelorette Party Essentials
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16 mt-12">
              {whatsIncluded.map((item, index) => (
                <Card key={index} className="border border-gray-200 hover:border-brand-yellow transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 text-left">
                      <div className="flex-shrink-0 p-3 bg-gray-100 rounded-full">
                        <item.icon className="h-6 w-6 text-gray-700" />
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
            <WhatToBring variant="bachelorette" title="What to Bring" className="max-w-7xl mx-auto" />
          </div>
        </section>
      </SectionReveal>

      {/* TRANSPORTATION GUIDE */}
      <SectionReveal>
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-brand-navy text-white px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <MapPin className="h-4 w-4 mr-2 inline" />
                Getting There
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold heading-unbounded text-gray-900 mb-4">
                Marina Directions & Transportation
              </h2>
            </div>
            <TransportationGuide />
          </div>
        </section>
      </SectionReveal>

      {/* PARTY PLANNING CHECKLIST */}
      <SectionReveal>
        <PartyPlanningChecklist
          partyType="Austin Bachelorette Party"
          eventType="bachelorette"
        />
      </SectionReveal>

      {/* TESTIMONIALS */}
      <SectionReveal>
        <section id="testimonials" className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-navy text-white px-4 sm:px-6 py-2 font-sans tracking-wider font-bold uppercase text-sm border-0">
                <Quote className="h-4 w-4 mr-2 inline" />
                Customer Reviews
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold heading-unbounded text-center mb-6 text-gray-900 leading-tight">
                What Bachelorette Parties Are Saying
              </h2>
            </div>
            <VideoTestimonials reviews={brideTestimonials} theme="bachelorette" />
          </div>
        </section>
      </SectionReveal>

      {/* QUOTE BUILDER SECTION */}
      <QuoteBuilderSection title="Get Your Instant Quote" defaultCruiseType="bachelorette" />

      {/* BLOG CROSS-LINKS SECTION */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-navy text-white px-4 py-1">PLANNING GUIDES</Badge>
            <h2 className="text-3xl md:text-4xl font-bold heading-unbounded text-gray-900">
              Austin Bachelorette Party Planning Guides
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { href: "/3-day-austin-bachelorette-itinerary", title: "3-Day Austin Bachelorette Itinerary" },
              { href: "/austin-bachelorette-nightlife", title: "Austin Bachelorette Nightlife Guide" },
              { href: "/budget-austin-bachelorette", title: "Budget Austin Bachelorette Guide" },
              { href: "/atx-disco-cruise", title: "ATX Disco Cruise — Book Now" },
              { href: "/top-10-austin-bachelorette-ideas", title: "Top 10 Austin Bachelorette Ideas" },
              { href: "/ultimate-austin-bachelorette-weekend", title: "Ultimate Austin Bachelorette Weekend" },
              { href: "/adventure-austin-bachelorette", title: "Adventure Bachelorette Options" }
            ].map((blog, idx) => (
              <Link key={idx} href={blog.href}>
                <a className="group bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-brand-yellow hover:shadow-md transition-all flex items-center justify-between">
                  <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{blog.title}</span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION - 2 COL ACCORDION */}
      <section id="faqs" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-unbounded mb-4 text-gray-900">
              Bachelorette Party FAQs
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              { q: "What's included in the ATX Disco Cruise bachelorette package?", a: "Everything you need. Professional DJ playing bachelorette-friendly sets all day, a professional photographer on board for the full 4 hours, giant lily pad and unicorn floats, private coolers stocked with ice for your group, party supplies (cups, koozies, sashes), and a safe, high-energy atmosphere with other bachelorette groups." },
              { q: "How much does a bachelorette party cruise on Lake Travis cost?", a: "The ATX Disco Cruise starts at $85 per person for the Saturday 3:30–7:30pm slot, $95 for Friday 12–4pm, and $105 for Saturday 11am–3pm. All prices include tax and gratuity. A group of 10 runs $850–$1,050 total. Private charters start at $800 for a 4-hour minimum on the Day Tripper (14 guests)." },
              { q: "How many guests can come on the bachelorette cruise?", a: "The ATX Disco Cruise accommodates any group size — we've had bachelorette groups from 4 to 40+. For private charters, the Day Tripper holds 14, the Meeseeks holds up to 30, and our flagship Clever Girl holds up to 75 guests exclusively." },
              { q: "Disco Cruise vs Private Charter — which is right for our bachelorette?", a: "Disco Cruises are perfect for groups under 25 who want a party atmosphere with other bachelorette groups, all-inclusive amenities, and the best per-person value. Private charters are best for groups wanting the entire boat to themselves, custom timing, or groups of 25+. Both include a professional captain and 4 hours on the water." },
              { q: "Can we bring our own alcohol?", a: "Yes — all our cruises are BYOB. Cans and plastic containers only, no glass bottles. We provide the coolers and plenty of ice. Many bachelorette groups add our Mimosa Party Cooler ($100) which includes champagne flutes, juices, and the full mimosa setup pre-arranged on the boat." },
              { q: "What do we wear on the bachelorette boat party?", a: "Most bachelorette groups coordinate outfits. Matching swimsuits or two-pieces with bride accessories (sashes, veils, cowboy hats) are the go-to. The disco theme means metallic, sequin, or color-coordinated looks photograph beautifully with the boat's disco balls and Lake Travis backdrop. The photographer is on board all day." },
              { q: "Where is the marina located and how do we get there?", a: "Anderson Mill Marina, 13993 FM 2769, Leander, TX 78641 — about 35 minutes from downtown Austin. Free parking is available on-site. We recommend rideshare (Lyft/Uber) for bachelorette groups so everyone can drink. Rideshare services run regularly to the marina from Austin." },
              { q: "How far in advance should we book the bachelorette cruise?", a: "For Saturday 11am–3pm slots from May through September, book 8–12 weeks in advance. Those are the most popular bachelorette slots and fill fast. The Saturday 3:30–7:30pm and Friday slots typically have more availability. Call (512) 488-5892 for last-minute openings within 2–3 weeks." },
              { q: "Can we decorate the boat for the bride?", a: "Absolutely — we encourage bachelorette decorations! Bring banners, balloons, and bride-specific props to make the experience memorable. Just no loose glitter, confetti, or items that go in the water. The photographer will capture all the decorated moments." },
              { q: "What is the cancellation policy?", a: "We offer a 48-hour full refund window from the time of booking. After 48 hours, bookings are non-refundable but we offer date rescheduling for weather-related cancellations at our discretion. We recommend booking early and purchasing travel protection if you have flexibility concerns." },
              { q: "Is the ATX Disco Cruise only for bachelorette parties?", a: "The ATX Disco Cruise is popular with bachelorette and bachelor parties, but also welcomes birthday groups, anniversary celebrations, and friend groups. On any given Saturday you'll have multiple bachelorette groups, bachelor groups, and celebration crews all sharing the boat — which creates the festival energy that makes the experience unique." },
              { q: "Can we do a combined bachelor/bachelorette party on the cruise?", a: "Yes — combined bach parties are one of our most popular bookings. Both groups board together and share the DJ, photographer, and floats. The cost per person is identical to booking separately, and the shared experience is often the highlight of the entire wedding weekend. Learn more on our combined bachelor/bachelorette page." },
              { q: "What's the best time slot for a bachelorette party?", a: "Saturday 11am–3pm is the most popular bachelorette time slot — the boat is at full energy, midday Lake Travis is stunning, and it leaves the evening free for dinner and nightlife on Rainey Street or South Congress. Saturday 3:30–7:30pm is the most budget-friendly option at $85/person and ends as the sun sets over the Hill Country." },
              { q: "Do you offer bachelorette party packages with extras?", a: "Yes. Add-ons available include the Mimosa Party Cooler ($100), floating DJ booth upgrade, alcohol delivery to the boat, and food delivery service. For private charters, add a professional DJ ($600) or photographer ($600). Our team can help customize your bachelorette experience — call (512) 488-5892." },
              { q: "What makes Premier Party Cruises the best bachelorette option in Austin?", a: "We're the only Lake Travis cruise company with a professional on-board photographer included at no extra cost on the Disco Cruise. With 15+ years operating on Lake Travis, 150,000+ guests served, a perfect safety record, and Coast Guard certified captains, we're Austin's most trusted bachelorette party boat. Groups fly in from across the country specifically for this experience." },
            ].map((faq, idx) => (
              <Collapsible key={idx} open={openFaq === idx} onOpenChange={() => setOpenFaq(openFaq === idx ? null : idx)} className="border-b border-gray-200">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pb-4 text-gray-600 leading-relaxed">{faq.a}</CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* COMPACT DARK BOTTOM CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold heading-unbounded mb-6">Ready to Plan the Best Weekend Ever?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
              <Button size="lg" className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-10 py-6 rounded-lg w-full sm:w-auto shadow-lg">BOOK NOW</Button>
            </div>
            <Button size="lg" variant="outlineLight" onClick={() => handleGetQuote()} className="font-bold px-10 py-6 rounded-lg border-2 w-full sm:w-auto">GET FREE QUOTE</Button>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS STRIP */}
      <section className="py-6 bg-gray-900 border-t border-gray-800">
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
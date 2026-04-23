import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigationLuxury';
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
import { DiscoCruisePricing } from '@/components/DiscoCruisePricing';
import { SectionReveal } from '@/components/SectionReveal';
import { 
  Users, Clock, Star, Calendar, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music,
  Heart, Camera, PartyPopper, Trophy, Shield, Award,
  Quote, Zap, Check, DollarSign,
  CloudRain, HelpCircle, Anchor, Waves, Gift, Droplets, Sun, Ship,
  TrendingUp, Package, XCircle, ChevronDown
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from '@/hooks/use-toast';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
import { LazyImage } from '@/components/LazyImage';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
// NOTE: Schema imports removed - all structured data is now handled by SSR via schemaLoader.ts
// to avoid duplicate/conflicting schemas and Google Search Console errors
import { YouTubeVideoBackground } from '@/components/YouTubeVideoBackground';
import ScrollingPhotoGallery from '@/components/ScrollingPhotoGallery';
import VideoShowcaseGrid from '@/components/VideoShowcaseGrid';
import { DISCO_GALLERY } from '@/lib/media';
import showcaseVideo1 from '@assets/disco_dance_party_v3.mp4';
import showcaseVideo2 from '@assets/mr_brightside_compressed.mp4';
import showcaseVideo3 from '@assets/pursuit_of_happiness_compressed.mp4';
import showcaseVideo4 from '@assets/fireball_dance_party_compressed.mp4';

// Hero video - Clever Girl walkthrough
const heroVideo = '/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4';

// DISCO CRUISE PHOTOS - Unique party photos alternating with boat photos
const heroImage1 = DISCO_GALLERY[0].src;
const heroImage2 = DISCO_GALLERY[2].src;
const heroImage3 = DISCO_GALLERY[4].src;
const galleryImage1 = DISCO_GALLERY[6].src;
const galleryImage2 = DISCO_GALLERY[7].src;
const galleryImage3 = DISCO_GALLERY[1].src;

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
    description: 'Some of the best DJs in Austin playing an amazing selection of favorites - not all disco, just party vibes all day!'
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
    color: 'from-brand-navy to-blue-700'
  },
  {
    time: 'Step 2: Check-In & Board',
    title: 'Party Starts When You Arrive!',
    description: 'Check-in at Anderson Mill Marina. Crew setting up your private cooler stocked with ice, DJ warming up and ready, photographer capturing arrival moments. Ice water, cups, koozies, bubbles, name tags all set up. Giant unicorn being inflated!',
    icon: Ship,
    color: 'from-blue-700 to-sky-500'
  },
  {
    time: 'Step 3: Find Your Party Cooler',
    title: 'Get Settled & Start Celebrating',
    description: 'DJ is spinning, photographer taking group pictures. Crew helps find your cooler stocked with ice - and if you ordered from Party On Delivery, your drinks are waiting! Get settled, grab a drink, make yourself at home!',
    icon: Music,
    color: 'from-sky-500 to-cyan-400'
  },
  {
    time: 'Step 4: Quick Safety Briefing and Departure - 45-min Tour of Lake Travis',
    title: '"Let\'s Cruise"',
    description: 'Cruise 30-45 minutes to the swim spot while captain gives swimming safety briefing. Simple rules for maximum fun and safety on the water.',
    icon: Shield,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    time: 'Step 5: Swim. Dance. Drink. Be Merry!',
    title: 'Next 2 Hours Are Yours!',
    description: 'Swim, float, dance, mingle with other parties from across the country! DJ takes requests (bribes work). Photographer capturing every epic moment of your celebration.',
    icon: PartyPopper,
    color: 'from-blue-500 to-blue-800'
  },
  {
    time: 'Step 6: Dance Yourself Clean',
    title: 'Epic Sing-Along Finale',
    description: 'Head back to reality with the ultimate sing-along dance party! Dancing Queen, Mr. Brightside, and all the hits. Call your Uber 10 minutes before docking for a seamless exit.',
    icon: Trophy,
    color: 'from-blue-800 to-brand-navy'
  }
];

// Import real reviews from shared/reviews-data.ts
import { discoHighlightReviews, combinedBachReviews, bachelorReviews, bacheloretteReviews, type Review } from '@shared/reviews-data';

// Use combined bach + highlights from both bachelor and bachelorette for ATX Disco Cruise page
const testimonials: Review[] = [...combinedBachReviews, ...discoHighlightReviews];

const faqItems = [
  {
    question: "What exactly is the ATX Disco Cruise?",
    answer: "The ATX Disco Cruise is America's only multi-group bachelor and bachelorette party boat. It's a shared 4-hour experience on Lake Travis featuring a professional DJ, photographer, giant floats, and an incredible party atmosphere where groups from across the country celebrate together."
  },
  {
    question: "We'll be sharing with strangers — how does that work?",
    answer: "It's the best part! You'll be on a large, double-decker boat with 3-5 other bachelor/bachelorette groups. Everyone is there for the same reason: to have an epic time. The shared energy creates a festival-like vibe that you just can't get on a private charter."
  },
  {
    question: "What's included in the all-inclusive package?",
    answer: "Your ticket includes the 4-hour cruise, a professional DJ, a professional photographer, giant unicorn and lily pad floats, party supplies (cups, koozies, bubbles), shared coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), and unlimited ice water. It's designed to be zero-stress!"
  },
  {
    question: "Is there a DJ on every cruise?",
    answer: "Yes! We have some of the best DJs in Austin on every single cruise. They play a mix of party favorites, throwbacks, and current hits to keep the energy high from start to finish."
  },
  {
    question: "What about the photographer?",
    answer: "A professional photographer is on board for every cruise to capture all the best moments. You'll receive a link to a digital gallery of high-quality photos 2-3 weeks after your cruise, included in your ticket price."
  },
  {
    question: "How much alcohol is included?",
    answer: "The ATX Disco Cruise is BYOB. We provide the coolers and the ice, and you bring whatever beer, seltzers, or wine you'd like (no glass or straight hard liquor, please). You can even have drinks delivered directly to the marina through Party On Delivery."
  },
  {
    question: "What's the capacity?",
    answer: "Our boats are spacious and designed for large groups. While we have multiple groups on board, there's plenty of room for everyone to dance, lounge, and swim comfortably. The total capacity varies by vessel but typically ranges from 50-80 guests."
  },
  {
    question: "How far in advance should we book?",
    answer: "We recommend booking at least 8-12 weeks in advance, especially for Saturday time slots during the peak season (March-October). These spots are highly sought after and sell out quickly!"
  },
  {
    question: "What is the cancellation policy?",
    answer: "All sales for the ATX Disco Cruise are final. However, we offer a 'Rain or Shine' guarantee. If severe weather prevents us from being on the lake, we move the party to our downtown partner venue, Lemonade Disco, so the celebration never stops."
  },
  {
    question: "What should we wear?",
    answer: "Swimwear is the standard! Many groups choose to coordinate with themed outfits, matching swimsuits, or disco-inspired accessories. Don't forget sunscreen, towels, and a change of clothes if you're heading straight to dinner afterward."
  },
  {
    question: "Can we do a combined bachelor AND bachelorette party on the same cruise?",
    answer: "Absolutely — this is one of our most common bookings. The ATX Disco Cruise is the perfect setting for a combined party because the shared energy of the cruise handles the entertainment for both groups. You book together, board together, and share the DJ and photographer. It costs less per person than two separate events and the bonding experience before the wedding is genuinely special."
  },
  {
    question: "How do we get to Anderson Mill Marina?",
    answer: "Anderson Mill Marina is located at 13993 FM 2769, Leander, TX 78641 — approximately 30 minutes from downtown Austin. Free parking is available in the marina lot. Many groups arrange party bus or rideshare transportation so everyone travels together and no one has to be the designated driver. Uber and Lyft both service the marina reliably."
  },
  {
    question: "What happens with the photos — when do we get them and what's the quality like?",
    answer: "A professional photographer is on board for the entire 4-hour cruise capturing candid and group shots. Your photos are delivered as a digital gallery link within 2–3 weeks after your cruise date, sent to the email on file. The gallery includes high-resolution images — the kind you'll actually want to print and post, not blurry phone shots. This is fully included in your ticket price with no additional fee."
  },
  {
    question: "Can we add food or a meal to the cruise?",
    answer: "You can bring your own food — snacks, sandwiches, a full spread, whatever your group wants. Many groups coordinate food delivery directly to the marina dock before departure (pizza, tacos, and sandwiches are common). We can also connect you with catering vendors. There is a 6-foot folding table available with the Essentials package if you want a proper setup."
  },
  {
    question: "What add-ons are available and are they worth it?",
    answer: "Our most popular add-ons: the Mimosa Party Cooler ($100) includes champagne flutes, juices, and fruit — eliminates the need to coordinate your own mimosa setup. The Sparkle Package ($100) adds extra party supplies, VIP floats, and a special setup for the guest of honor. Both are flat fees per cruise, not per person, so they become very cost-effective for larger groups. Towel service and SPF-50 spray sunscreen are also available on board."
  },
  // AI Visibility: seeded from SEMRush Questions extract
  {
    question: "Does every guest pay the same price on the ATX Disco Cruise, or does it vary by gender or guest?",
    answer: "Every guest in your group pays the same flat per-person ticket price. The only factor that changes the price is the day and time slot you book: Friday 12–4 PM is $95/person, Saturday 11 AM–3 PM (most popular, peak energy) is $105/person, Saturday 3:30–7:30 PM (best value, catches the sunset) is $85/person. Tax and 20% gratuity are included — so the number you see is the number you pay. No per-guest surcharges, no gender-based variations, no hidden fees. This also makes splitting the cost across a bachelor or bachelorette group trivially simple — total divided by headcount, done."
  },
  {
    question: "Are there 21+ only party cruises with DJs in Austin?",
    answer: "Yes — the ATX Disco Cruise is Austin's only shared DJ-led 21+ party cruise. Every ticket includes a professional DJ performing live for the full 4 hours, 14 disco balls with LED lighting, a dedicated dance floor, a professional photographer capturing the day (with a digital gallery delivered 2–3 weeks later), giant lily pad and unicorn floats, a private cooler with ice per group, mimosa supplies, and full BYOB privileges. Because it's a shared multi-group format designed specifically for bachelor and bachelorette parties, the 21+ age requirement is enforced at boarding with valid ID. Runs March through October on Friday afternoons and both Saturday slots."
  },
  {
    question: "Do any Austin lake cruises include professional photography in the ticket price?",
    answer: "Yes — every ATX Disco Cruise ticket includes a professional photographer for the full 4-hour cruise at no additional charge. Your digital gallery of 75–150+ edited high-res photos is delivered 2–3 weeks after your cruise via a shared gallery link. The photographer captures boarding, group shots on deck, dancing under the disco balls, swim-stop candids, sunset moments (if you're on the 3:30 PM slot), and guest-of-honor bach sash/veil shots. This is one of the reasons the per-person ticket is a genuinely better value than DIY pontoon alternatives where you'd separately book a photographer for $300–$500. For private charters, the photographer is an optional add-on ($300–$500) with the same gallery delivery format."
  }
];

const galleryPhotos = DISCO_GALLERY.map((photo, idx) => ({
  id: idx + 1,
  src: photo.src,
  alt: photo.alt
}));

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPartyType, setSelectedPartyType] = useState<DiscoPartyType>(DISCO_PARTY_TYPES.bachelorette);
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
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
  }, [reducedMotion, heroImages.length]);

  const handleGetQuote = () => {
    navigate('/chat');
  };

  const handleBookNow = () => {
    navigate('/chat');
  };

  return (
    <>
      <SEOHead
        pageRoute="/atx-disco-cruise"
        defaultTitle="ATX Disco Cruise | Austin's All-Inclusive Party Boat on Lake Travis"
        defaultDescription="ATX Disco Cruise on Lake Travis - Austin's premier all-inclusive party boat. DJ, photographer, floats, BYOB. Starting at $85/person. Bachelor & bachelorette parties. Book now!"
        defaultKeywords={["ATX Disco Cruise", "austin party cruises", "lake travis party boat", "party boat austin", "austin party cruise", "Austin bachelor party", "Austin bachelorette party", "party cruises", "Lake Travis bachelor party", "Lake Travis bachelorette party", "Austin boat party"]}
        schemaType="event"
      />

      {/* NOTE: All structured data (Event, FAQ, LocalBusiness, Service) is handled by SSR via schemaLoader.ts
          SSR schemas loaded: atx-disco-cruise/event.jsonld, atx-disco-cruise/faq.jsonld
          This avoids duplicate/conflicting schemas and Google Search Console errors. */}

      <div className="min-h-screen bg-white dark:bg-gray-950" data-page-ready="atx-disco-cruise">
        <PublicNavigation />

        {/* 1. HERO SECTION */}
        <motion.section 
          id="hero"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden pt-[116px]"
          data-testid="section-hero"
        >
          <div className="absolute inset-0 z-0">
            {/* Fallback image */}
            <img src={heroImages[0]} alt="ATX Disco Cruise" className="w-full h-full object-cover" style={{ display: videoLoaded && !videoFailed ? 'none' : 'block' }} loading="eager" />
            {/* Hero Video */}
            {!videoFailed && (
              <video ref={videoRef} className="w-full h-full object-cover" style={{ display: videoLoaded ? 'block' : 'none' }} src={heroVideo} muted loop playsInline autoPlay preload="auto" onLoadedData={handleVideoLoadedData} onError={handleVideoError} />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 text-center flex-grow flex items-center">
            <motion.div variants={fadeInUp} className="w-full">
              <h1 className="heading-unbounded text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 md:mb-8 text-center leading-tight drop-shadow-2xl" data-testid="text-hero-headline">
                ATX Disco Cruise: Austin's Premier All-Inclusive Party Boat on Lake Travis
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-300 mb-8 md:mb-10 font-bold text-center drop-shadow-lg">
                The Country's Only Multi-Group Bach Party Cruise
              </p>
              
                <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/chat')}
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
                  data-testid="button-learn-more"
                >
                  <Phone className="mr-2 h-5 w-5" /> Talk to an Expert
                </Button>
                <a
                  href="/chat"
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg inline-flex items-center justify-center"
                  data-testid="button-book-now"
                >
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Scrolling Photo Gallery - Below Hero */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl heading-unbounded font-bold text-gray-900 dark:text-white mb-2">
              Real Parties, Real Fun
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Photos from actual ATX Disco Cruise celebrations</p>
          </div>
          <ScrollingPhotoGallery pageType="disco" />
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
                          ? 'w-[40%] md:w-[35%] opacity-100 scale-105 z-10 ring-4 ring-brand-yellow' 
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

        {/* 1. PRICING - Friday/Saturday Time Slots (MOVED TO TOP) */}
        <SectionReveal>
          <section className="py-8 md:py-12 bg-white" id="packages" data-testid="section-packages">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-semibold heading-unbounded text-center mb-3 text-gray-900">
                  ATX Disco Cruise Pricing
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Choose your time slot — all-inclusive pricing on Lake Travis. <InternalLinkHighlight href="/private-cruises" title="Private Cruises">Want your own boat? See private charters.</InternalLinkHighlight></p>
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
                      className="py-4 px-6 text-base font-semibold data-[state=active]:bg-brand-navy data-[state=active]:text-white"
                      data-testid="tab-bachelorette"
                    >
                      Bachelorette
                    </TabsTrigger>
                    <TabsTrigger 
                      value={DISCO_PARTY_TYPES.combined} 
                      className="py-4 px-6 text-base font-semibold data-[state=active]:bg-brand-navy data-[state=active]:text-white"
                      data-testid="tab-combined"
                    >
                      Combined
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
                    <Card key={addOn.id} className="border-2 border-gray-200 dark:border-gray-700">
                      <CardHeader className="bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{addOn.name}</CardTitle>
                          <Badge className="bg-brand-navy text-white">
                            ${(addOn.price / 100).toFixed(0)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          {addOn.inclusions.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Sparkles className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Summary section */}
              <div className="text-center bg-green-50 rounded-xl p-4 max-w-3xl mx-auto border border-green-200 mt-8">
                <p className="text-gray-700 text-sm font-medium"><strong>Every ticket includes:</strong> Pro DJ · Pro Photographer · Giant Floats · Party Supplies · Coolers with Ice</p>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* 2. EXPERIENCE - 4-Hour Timeline */}
        <SectionReveal>
          <section id="experience" className="py-8 md:py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-semibold heading-unbounded text-center mb-3 text-gray-900">
                  Your 4-Hour Disco Cruise Experience
                </h2>
                <p className="text-gray-600">America's only multi-group <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Parties">bachelor</InternalLinkHighlight> &amp; <InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Parties">bachelorette party</InternalLinkHighlight> cruise on Lake Travis. <InternalLinkHighlightWithArrow href="/private-cruises" title="Private Cruises">Want a private boat?</InternalLinkHighlightWithArrow></p>
              </div>

              <div className="max-w-3xl mx-auto space-y-3">
                {experienceTimeline.map((hour, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-yellow transition-all" data-testid={`card-hour-${idx + 1}`}>
                    <div className={cn("flex-shrink-0 p-2.5 rounded-full bg-gradient-to-br self-start", hour.color)}>
                      <hour.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-gray-900 text-sm">{hour.title}</span>
                        <span className="text-xs text-blue-600 font-semibold">{hour.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{hour.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
                  <Button size="lg" className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8" data-testid="button-experience-cta">
                    Claim Your Spot <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Scrolling Photo Gallery — Combined Parties (different photos than hero gallery) */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <div className="text-center mb-6">
            <h2 className="text-3xl heading-unbounded font-bold text-gray-900 dark:text-white mb-2">
              Bachelor &amp; Bachelorette Parties on Lake Travis
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Real groups celebrating together every Friday &amp; Saturday</p>
          </div>
          <ScrollingPhotoGallery pageType="combined" />
        </section>

        {/* WHY BOOK SECTION */}
        <SectionReveal>
          <section id="why-book" className="py-8 md:py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-semibold heading-unbounded mb-3 text-gray-900">
                  Why Austin's #1 Bachelor &amp; Bachelorette Party Cruise
                </h2>
                <p className="text-gray-600">America's only multi-group party boat — exclusively for bach parties on Lake Travis.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                {[
                  { icon: <Sparkles className="h-5 w-5 text-blue-600" />, title: "One-of-a-Kind in America", text: "The ONLY multi-group bach party boat in the U.S." },
                  { icon: <Heart className="h-5 w-5 text-brand-yellow" />, title: "Electric Party Atmosphere", text: "50–100+ people all celebrating together — unmatched energy." },
                  { icon: <Package className="h-5 w-5 text-green-600" />, title: "Fully All-Inclusive", text: "DJ, photographer, floats &amp; supplies. Show up and party." },
                  { icon: <DollarSign className="h-5 w-5 text-blue-600" />, title: "Simple Per-Person Pricing", text: "No boat minimums. Easy to split. No hidden fees." },
                  { icon: <Users className="h-5 w-5 text-orange-600" />, title: "Party with 50–100+ People", text: "Meet bach parties from across the country. Legendary vibes." },
                  { icon: <Shield className="h-5 w-5 text-indigo-600" />, title: "Rain-or-Shine Guarantee", text: "Bad weather? Party moves to Lemonade Disco downtown." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-yellow transition-all">
                    <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
                  <Button size="lg" className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8" data-testid="button-why-book-cta">
                    Join the Party — Book ATX Disco Now!
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 4. AVAILABILITY / BOOKING */}
        <SectionReveal>
          <section id="availability" className="py-8 md:py-12 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold heading-unbounded mb-3 text-gray-900">
                Book Your Lake Travis Party Barge Spot
              </h2>
              <p className="text-gray-600 mb-8">Fridays 12–4 PM · Saturdays 11 AM–3 PM or 3:30–7:30 PM (March–October). Peak weekends book 8–10 weeks out.</p>
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8 text-left">
                <div className="flex gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div><p className="font-bold text-sm text-gray-900">Cruise Schedule</p><p className="text-gray-600 text-sm">Fri &amp; Sat seasonal (Mar–Oct) — 4-hour cruise.</p></div>
                </div>
                <div className="flex gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div><p className="font-bold text-sm text-gray-900">Book 8–10 Weeks Early</p><p className="text-gray-600 text-sm">Peak weekends sell out fast. Off-season sometimes available.</p></div>
                </div>
                <div className="flex gap-3 p-4 bg-white rounded-xl border border-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div><p className="font-bold text-sm text-gray-900">Instant Confirmation</p><p className="text-gray-600 text-sm">Secure online checkout. Done in minutes.</p></div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
                  <Button size="lg" className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold">
                    <Calendar className="mr-2 h-5 w-5" />Check Availability
                  </Button>
                </div>
                <Button size="lg" variant="outline" onClick={() => window.open('tel:+15124885892')} className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold">
                  <Phone className="mr-2 h-5 w-5" />Call (512) 488-5892
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 6. FEATURES - What's Included Section */}
        <SectionReveal>
          <section className="py-8 md:py-12 bg-gray-50" id="whats-included" data-testid="section-whats-included">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-semibold heading-unbounded text-center mb-3 text-gray-900">
                  Everything Included with Your ATX Disco Ticket
                </h2>
                <p className="text-gray-600">All-inclusive — DJ, photographer, floats &amp; more on your Lake Travis party boat.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {whatsIncluded.map((item, idx) => (
                  <Card className="border-2 border-gray-100 hover:border-brand-yellow transition-all hover:shadow-lg" key={idx} data-testid={`card-included-${idx}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 p-3 bg-gray-100 rounded-full">
                          <item.icon className="h-6 w-6 text-gray-700" />
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
          <section id="why-choose" className="py-8 md:py-12 bg-brand-navy">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-semibold heading-unbounded text-center mb-2 text-white">
                  America's Only Multi-Group Bach Party Cruise
                </h2>
                <p className="text-white/80 text-sm">Created in Austin, Texas — the only one in the United States</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
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
                  data-button-id="695186923c261203770cc2e7"
                >
                  <Button
                    size="lg"
                    className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
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
          <section id="photos" className="py-8 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-semibold heading-unbounded text-center mb-2 text-gray-900">
                  See the ATX Disco Cruise in Action
                </h2>
                <p className="text-gray-600">Real photos from bachelor &amp; bachelorette parties on Lake Travis</p>
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
                  data-button-id="695186923c261203770cc2e7"
                >
                  <Button
                    size="lg"
                    className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Book Your Photo-Perfect Party
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* GUARANTEE SECTION */}
        <SectionReveal>
          <section className="py-8 md:py-12 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-semibold heading-unbounded text-center mb-2 text-gray-900">
                  100% Risk-Free Booking
                </h2>
                <p className="text-gray-600">15+ years · 150,000+ happy guests · Perfect safety record</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex gap-3 p-5 bg-white rounded-xl border-2 border-green-200">
                  <CloudRain className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Lemonade Disco Guarantee</p>
                    <p className="text-gray-600 text-sm">Bad weather? Party moves to our downtown Austin venue — same DJ, same energy.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-5 bg-white rounded-xl border-2 border-blue-200">
                  <XCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">No Refunds Policy</p>
                    <p className="text-gray-600 text-sm">All sales final — but your party is always guaranteed to happen.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-5 bg-white rounded-xl border-2 border-gray-200">
                  <Trophy className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Perfect Track Record</p>
                    <p className="text-gray-600 text-sm">15+ years running, 5★ average rating, perfect safety record.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 9. TESTIMONIALS Section */}
        <SectionReveal>
          <section id="testimonials" className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-white" data-testid="section-testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-semibold heading-unbounded text-center mb-3 text-gray-900">
                  What Real Bach Parties Are Saying
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge className="bg-yellow-500 text-black px-4 py-1.5 text-sm font-bold"><Star className="h-3.5 w-3.5 mr-1 inline fill-current" />420+ Five-Star Reviews</Badge>
                  <Badge className="bg-green-600 text-white px-4 py-1.5 text-sm font-bold"><Award className="h-3.5 w-3.5 mr-1 inline" />#1 Rated Bach Party</Badge>
                  <Badge className="bg-blue-600 text-white px-4 py-1.5 text-sm font-bold"><TrendingUp className="h-3.5 w-3.5 mr-1 inline" />98% Would Recommend</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {testimonials.slice(0, 6).map((testimonial) => (
                  <Card key={testimonial.id} className="border-2 border-gray-200 hover:border-brand-yellow transition-all hover:shadow-xl">
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
                      <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                        {testimonial.package}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <div className="xola-custom xola-checkout" data-button-id="695186923c261203770cc2e7">
                  <Button size="lg" className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8">
                    Book Your Legendary Party <ArrowRight className="ml-2 h-5 w-5 inline" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>


        {/* 11. SEO-ONLY CONTENT (BOTTOM) */}

        {/* Disco Cruise vs Private Charter Comparison Table */}
        <SectionReveal>
          <section className="py-8 bg-white dark:bg-gray-900">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">ATX Disco Cruise vs. Private Charter</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">Not sure which option is right for your group? Compare our two experiences side-by-side.</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="p-4 font-semibold rounded-tl-lg">Feature</th>
                      <th className="p-4 font-semibold">ATX Disco Cruise</th>
                      <th className="p-4 font-semibold rounded-tr-lg">Private Charter</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium">Pricing</td>
                      <td className="p-4">$85-$138/person (all-inclusive)</td>
                      <td className="p-4">From $200/hour (entire boat)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      <td className="p-4 font-medium">Duration</td>
                      <td className="p-4">4 hours (fixed time slots)</td>
                      <td className="p-4">3-8 hours (flexible)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium">Group Size</td>
                      <td className="p-4">5-75 per group (shared boat)</td>
                      <td className="p-4">14-75 (exclusive boat)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      <td className="p-4 font-medium">DJ & Music</td>
                      <td className="p-4">Included (professional DJ)</td>
                      <td className="p-4">Bluetooth speakers (DJ add-on available)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium">Photographer</td>
                      <td className="p-4">Included (digital delivery)</td>
                      <td className="p-4">Add-on available</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      <td className="p-4 font-medium">Giant Floats</td>
                      <td className="p-4">Included (lily pad & more)</td>
                      <td className="p-4">Included</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium">BYOB</td>
                      <td className="p-4">Yes, coolers & ice included</td>
                      <td className="p-4">Yes, bring your own cooler</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      <td className="p-4 font-medium">Best For</td>
                      <td className="p-4">Bach parties, birthdays, social groups wanting high-energy atmosphere</td>
                      <td className="p-4">Corporate events, weddings, groups wanting privacy & exclusivity</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Party Vibe</td>
                      <td className="p-4">High energy, multi-group, co-ed party</td>
                      <td className="p-4">Customizable, private experience</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="#packages">
                  <Button className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8">Book Disco Cruise</Button>
                </Link>
                <Link href="/private-cruises">
                  <Button variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold px-8">Explore Private Charters</Button>
                </Link>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 13. Compact Bottom CTA Section */}
        <section className="py-8 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold heading-unbounded text-white mb-8">
              Ready to Party on Lake Travis?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleBookNow}
                className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg w-full sm:w-auto"
              >
                Book Your Cruise
              </Button>
              <Link href="/contact">
                <a className="text-white hover:text-brand-yellow font-bold transition-colors">
                  Have Questions? Contact Us →
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* 14. Internal Links Strip */}
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
    </>
  );
}

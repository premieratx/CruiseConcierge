import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigationLuxury';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { SectionReveal } from '@/components/SectionReveal';
import { DISCO_TIME_SLOTS, DISCO_BASE_INCLUSIONS, DISCO_ADD_ONS, getDiscoNecklaceText } from '@shared/constants';
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
  Plane, Wine, ChevronDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import Footer from '@/components/Footer';
import { combinedBachReviews } from '@shared/reviews-data';
import { YouTubeVideoBackground } from '@/components/YouTubeVideoBackground';
import AnimatedPhotoGallery from '@/components/AnimatedPhotoGallery';
import VideoShowcaseGrid from '@/components/VideoShowcaseGrid';
import { COMBINED_GALLERY } from '@/lib/media';
import showcaseVideo1 from '@assets/disco_dance_party_v3.mp4';
import showcaseVideo2 from '@assets/mr_brightside_compressed.mp4';
import showcaseVideo3 from '@assets/pursuit_of_happiness_compressed.mp4';
import showcaseVideo4 from '@assets/fireball_dance_party_compressed.mp4';
import { initXolaEmbeds } from '@/services/xola';

// Hero video - Clever Girl walkthrough
const heroVideo = '/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4';

// COMBINED PARTY PHOTOS - Unique party photos alternating with boat photos
const heroImage1 = COMBINED_GALLERY[0].src;
const heroImage2 = COMBINED_GALLERY[2].src;
const heroImage3 = COMBINED_GALLERY[4].src;
const galleryImage1 = COMBINED_GALLERY[6].src;
const galleryImage2 = COMBINED_GALLERY[7].src;
const galleryImage3 = COMBINED_GALLERY[1].src;
const partyImage27 = COMBINED_GALLERY[3].src;
const partyImage28 = COMBINED_GALLERY[5].src;

// Combined party add-ons from constants
const combinedAddOns = DISCO_ADD_ONS.combined;

// What's included for combined parties - base disco cruise inclusions + combined-specific necklaces
const whatsIncludedText = [
  ...DISCO_BASE_INCLUSIONS,
  getDiscoNecklaceText('combined')
];

// FAQs for combined parties
const faqItems = [
  {
    id: 'what-is-combined',
    question: 'What is a combined bach party?',
    answer: 'Both parties celebrate together. Saves time & money, and everyone bonds before the wedding.'
  },
  {
    id: 'group-size',
    question: 'How many people can you fit?',
    answer: 'Disco cruise handles 20–40+; private boats hold up to 75.'
  },
  {
    id: 'private-or-disco',
    question: 'Disco or private cruise?',
    answer: "Under 30: disco. 30+: private. We'll help you choose."
  },
  {
    id: 'different-preferences',
    question: 'What if guys & girls want different things?',
    answer: 'Plenty of zones: floats, DJ, lounge. BYOB keeps it flexible.'
  },
  {
    id: 'activities',
    question: 'Best activities for mixed groups?',
    answer: 'DJ, floats, swimming—universal fun for everyone.'
  },
  {
    id: 'booking-timeline',
    question: 'How far in advance to book?',
    answer: 'Book 6–8 weeks early; weekends fill fast.'
  }
];


// Photo gallery items - Alternating party and boat photos
const galleryPhotos = COMBINED_GALLERY.map((photo, idx) => ({
  id: idx + 1,
  src: photo.src,
  alt: photo.alt
}));

export default function CombinedBachelorBachelorette() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroImages = [heroImage2, heroImage3, galleryImage1];
  
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

  // Lovable iframe listener removed — EmbeddedQuoteFlow handles its own
  // navigation via Supabase create-lead + router redirect.

  useEffect(() => {
    const timer = setTimeout(() => {
      initXolaEmbeds();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleGetQuote = (packageId?: string) => {
    const params = new URLSearchParams({ cruiseType: 'combined' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white" data-page-ready="combined-bach-party">
      <SEOHead
        pageRoute="/combined-bachelor-bachelorette-austin"
        defaultTitle="Combined Bachelor & Bachelorette Party Austin | Joint Lake Travis Cruise"
        defaultDescription="Planning a combined bachelor and bachelorette party? Austin Lake Travis joint bach cruises from $85/person. DJ, photographer, floats, BYOB. The ultimate co-ed party boat experience!"
        defaultKeywords={['combined bachelor bachelorette party Austin', 'Lake Travis combined party', 'bachelor bachelorette party together', 'Austin group party cruise']}
        schemaType="event"
      />
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Fallback image */}
          <img src={heroImages[0]} alt="Combined Bachelor Bachelorette Party" className="w-full h-full object-cover" style={{ display: videoLoaded && !videoFailed ? 'none' : 'block' }} loading="eager" />
          {/* Hero Video */}
          {!videoFailed && (
            <video ref={videoRef} className="w-full h-full object-cover" style={{ display: videoLoaded ? 'block' : 'none' }} src={heroVideo} muted loop playsInline autoPlay preload="auto" onLoadedData={handleVideoLoadedData} onError={handleVideoError} />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-white text-center flex-grow flex items-center">
          <div className="max-w-5xl mx-auto">
            <h1 
              className="heading-unbounded text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-center leading-tight"
              data-editable 
              data-editable-id="combined-hero-title"
            >
              Joint Bachelor & Bachelorette Party on Lake Travis
            </h1>
            
            <p 
              className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-gray-100 text-center max-w-3xl mx-auto"
              data-editable 
              data-editable-id="combined-hero-subtitle"
            >
              The Best of Both Worlds - Guys & Girls Together for One Epic Celebration!
              <br />
              The Modern Way to Celebrate - All Your Friends, One Unforgettable Party
            </p>

            <Badge className="bg-brand-navy text-white px-6 py-3 text-base font-sans tracking-wider mb-6">
              🎉 The Best of Both Worlds - One Epic Celebration
            </Badge>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
                data-testid="button-hero-book-combined"
              >
                <Button 
                  size="lg"
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  BOOK NOW
                </Button>
              </div>
              <Button
                onClick={() => handleGetQuote()}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-3 rounded-lg"
              >
                <MessageSquare className="mr-2 h-6 w-6" />
                GET A QUOTE
              </Button>
            </div>
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

      {/* ATX Disco Cruise Highlight Section - THE option for combined parties */}
      <section className="py-14 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-brand-yellow text-gray-900 font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-6">⭐ THE #1 OPTION FOR COMBINED PARTIES</span>
          <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-4">
            The ATX Disco Cruise — Built for Exactly This
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            The <Link href="/atx-disco-cruise" className="text-brand-yellow font-bold hover:underline">ATX Disco Cruise</Link> is America's only all-inclusive multi-group bachelor and bachelorette party cruise — meaning your <Link href="/bachelor-party-austin" className="text-white/80 hover:underline font-semibold">bachelor party</Link> and <Link href="/bachelorette-party-austin" className="text-white/80 hover:underline font-semibold">bachelorette party</Link> can cruise together on the same boat, partying alongside other bach groups in an electric, high-energy atmosphere with a professional DJ, photographer, and giant floats — all-inclusive from $85/person.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10 text-left">
            {[
              { icon: '🎵', title: 'Professional DJ', desc: 'Playing non-stop hits for the entire 4-hour cruise' },
              { icon: '📸', title: 'Photographer Included', desc: 'Every moment captured — delivered digitally after' },
              { icon: '🛟', title: 'Giant Lily Pad Floats', desc: 'Jump in the lake together — included on every cruise' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-lg mb-1">{item.title}</div>
                <div className="text-white/80 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/atx-disco-cruise">
              <a className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg transition-colors">
                See ATX Disco Cruise Details
                <ArrowRight className="h-5 w-5" />
              </a>
            </Link>
            <Link href="/private-cruises">
              <a className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-4 rounded-lg text-lg transition-colors">
                Or: Book a Private Charter
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <SectionReveal>
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Real Combined Bachelor/Bachelorette Party Photos
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              See what past groups experienced on Lake Travis! Click any photo to view full gallery.
            </p>
            <AnimatedPhotoGallery />
          </div>
        </section>
      </SectionReveal>

      {/* Why Combined Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">01</span>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Why Combined Bach Parties Are The Modern Trend
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                More couples are choosing combined celebrations - and for good reason. Save time, save money, and bring everyone together for one unforgettable party!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: DollarSign, title: 'Save Money', desc: 'One party is always cheaper than two separate events' },
                { icon: Users, title: 'Everyone Together', desc: 'Friends bond before the wedding - no one misses out' },
                { icon: Zap, title: 'More Energy', desc: 'Combined groups create an incredible party atmosphere' }
              ].map((benefit, idx) => (
                <Card key={idx} className="rounded-xl border-2 hover:shadow-xl transition-all">
                  <CardContent className="pt-8 text-center">
                    <benefit.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-bold text-xl mb-3 text-center">{benefit.title}</h3>
                    <p className="text-base text-gray-600 text-center">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Time Slot Pricing Section */}
      <SectionReveal>
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">02</span>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Choose Your Time Slot
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Select the perfect time for your combined celebration - pricing varies by day and time
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {DISCO_TIME_SLOTS.map((slot, idx) => (
                <Card 
                  key={slot.id} 
                  className={cn(
                    "rounded-xl relative",
                    slot.badge === 'BEST' ? "border-4 border-brand-yellow shadow-2xl" : "border-2"
                  )}
                >
                  {slot.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-gray-900 font-bold font-sans tracking-wider">
                      {slot.badge === 'BEST' ? 'MOST POPULAR' : slot.badge}
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <Clock className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <CardTitle className="heading-unbounded text-2xl mb-2 text-center">
                      {slot.label}
                    </CardTitle>
                    <div className="mb-2">
                      <div className="text-4xl font-black text-gray-900">
                        ${(slot.basePrice / 100).toFixed(2)}
                      </div>
                      <p className="text-lg font-semibold text-gray-700">per person</p>
                      <p className="text-sm text-gray-500 mt-1">
                        ${(slot.priceWithTax / 100).toFixed(2)} with tax & gratuity
                      </p>
                    </div>
                    <CardDescription className="text-center text-base">
                      {slot.day} • {slot.timeRange}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="xola-custom xola-checkout"
                      data-button-id="695186923c261203770cc2e7"
                    >
                      <Button
                        className="w-full bg-brand-navy hover:bg-blue-900"
                        data-testid={`button-timeslot-${slot.id}`}
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        Book {slot.day}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* What's Included Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">03</span>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                What's Included in Every Combined Party
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                From DJ to photographer, floats to party supplies - we've got everything covered for your crew
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {whatsIncludedText.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-base text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Add-Ons Section */}
      <SectionReveal>
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">04</span>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                Optional Add-Ons for Combined Parties
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                Take your celebration to the next level with these premium add-on packages
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {combinedAddOns.map((addon) => (
                <Card key={addon.id} className="rounded-xl border-2 hover:shadow-xl transition-all">
                  <CardHeader className="text-center pb-4">
                    <Package className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <CardTitle className="heading-unbounded text-2xl mb-2 text-center">
                      {addon.name}
                    </CardTitle>
                    <div className="text-3xl font-black text-gray-900">
                      ${addon.price / 100}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {addon.inclusions.map((inclusion, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-base">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Reviews Section */}
      <SectionReveal>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">05</span>
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                What Real Customers Are Saying
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto mb-8 text-center">
                Don't just take our word for it - read hundreds of 5-star reviews from real customers on Google and Facebook
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-gray-700 text-gray-700 hover:bg-gray-900 hover:text-white font-bold text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6"
                  data-testid="button-google-reviews"
                >
                  <a href="https://www.google.com/search?q=premier+party+cruises+austin" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-5 w-5" />
                    Read Google Reviews
                  </a>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-gray-700 text-gray-700 hover:bg-gray-900 hover:text-white font-bold text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6"
                  data-testid="button-facebook-reviews"
                >
                  <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-5 w-5" />
                    Read Facebook Reviews
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 10. Planning Guides Section */}
      <SectionReveal>
        <section className="py-24 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-12">
              Combined Party Planning & Logistics Guides
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Boat Party Planning & Logistics",
                  href: "/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide",
                  desc: "Complete planning and coordination guide for your Lake Travis boat party."
                },
                {
                  title: "Lake Travis Large Groups Guide",
                  href: "/blogs/lake-travis-large-groups-guide",
                  desc: "Essential tips for organizing successful events for groups of 20+."
                }
              ].map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <a className="block group">
                    <Card className="h-full rounded-xl border-2 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      <CardContent className="pt-8 px-6 text-center flex flex-col h-full">
                        <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mb-6 flex-grow">{item.desc}</p>
                        <div className="flex items-center justify-center text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                          Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <div id="faqs" className="scroll-mt-20">
          <section className="py-24 bg-gray-50 text-center">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-6xl font-black text-gray-100 opacity-30 absolute -mt-8">06</span>
                <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                  Combined Party FAQs
                </h2>
                <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                  Common questions about combined bachelor/bachelorette celebrations
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto text-left">
                {faqItems.map((faq, idx) => (
                  <Collapsible
                    key={faq.id}
                    open={openFaq === idx}
                    onOpenChange={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full bg-white rounded-xl border shadow-sm h-fit"
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors rounded-xl">
                      <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                      <ChevronDown className={cn(
                        "h-5 w-5 text-gray-500 transition-transform duration-200",
                        openFaq === idx && "transform rotate-180"
                      )} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </section>
        </div>
      </SectionReveal>

      {/* Final CTA Section */}
      <SectionReveal>
        <section className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 text-center text-white">
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center">
              Ready to Book Your Combined Party?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400">
              The modern way to celebrate - bring both crews together for one epic day on Lake Travis!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
              >
                <Button
                  size="lg"
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
                  data-testid="button-final-cta"
                >
                  <PartyPopper className="mr-2 h-6 w-6" />
                  BOOK NOW
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

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

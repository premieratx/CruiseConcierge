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
  Plane, Wine, Eye, Smile
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import Breadcrumb from '@/components/Breadcrumb';
import { FeaturedSnippet, FeaturedSnippetHowTo } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';

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

// Bachelor party testimonials
const testimonials = [
  {
    id: 1,
    name: 'Jake Martinez',
    role: 'Groom',
    location: 'Austin, TX',
    rating: 5,
    text: "This was hands down the BEST party I've ever been to! The ATX Disco Cruise was insane - we met bachelor parties from Dallas, Chicago, even California! The energy was absolutely electric. All the guys said it was their favorite bachelor party experience EVER.",
    avatar: '🤵',
    package: 'Disco King Package'
  },
  {
    id: 2,
    name: 'Mike Thompson',
    role: 'Best Man',
    location: 'Houston, TX',
    rating: 5,
    text: "I planned this and literally EVERYTHING was handled - no stress whatsoever! The DJ absolutely crushed it, professional photos came out AMAZING, and the free alcohol delivery was clutch. My buddy still calls me the GOAT for finding this!",
    avatar: '🎉',
    package: 'Platinum Package'
  },
  {
    id: 3,
    name: 'Chris Johnson',
    role: 'Groom',
    location: 'Dallas, TX',
    rating: 5,
    text: "Dancing on the water with the boys was LEGENDARY! We partied with groups from all over the country - made so many friends. The vibe was insane, everyone celebrating the same occasion. SERIOUSLY the highlight of the entire weekend!",
    avatar: '🕺',
    package: 'Basic Bach Package'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Best Man',
    location: 'San Antonio, TX',
    rating: 5,
    text: "The GIANT unicorn float was EPIC! We dominated that thing, photographer got some incredible shots. Meeting other bachelor parties from across the country made it even better. This is THE party you book - trust me, you'll be the hero!",
    avatar: '🎊',
    package: 'Disco King Package'
  },
  {
    id: 5,
    name: 'Ryan Smith',
    role: 'Groom',
    location: 'Fort Worth, TX',
    rating: 5,
    text: "Show your groom the BEST weekend of his life! Nothing to plan, nothing to carry - just SHOW UP and GET DOWN. Everything was ready on the boat. The DJ, photographer, floats, vibes - all PERFECT. Priceless memories made!",
    avatar: '🦄',
    package: 'Platinum Package'
  },
  {
    id: 6,
    name: 'Brandon Lee',
    role: 'Best Man',
    location: 'Round Rock, TX',
    rating: 5,
    text: "The DJ was INCREDIBLE - best party playlist I've ever heard! Professional photographer captured every wild moment. We met groups from all over and exchanged numbers with guys from 4 different states. Absolutely unforgettable!",
    avatar: '🎧',
    package: 'Disco King Package'
  },
  {
    id: 7,
    name: 'Marcus Williams',
    role: 'Groom',
    location: 'Plano, TX',
    rating: 5,
    text: "My best man is a LEGEND for finding this! The professional photos came out amazing - better than our actual wedding photos LOL! The party atmosphere with other bachelor groups was next level. 100% the highlight of my bachelor weekend!",
    avatar: '📸',
    package: 'Platinum Package'
  },
  {
    id: 8,
    name: 'Tyler Rodriguez',
    role: 'Best Man',
    location: 'Cedar Park, TX',
    rating: 5,
    text: "Everything was HANDLED - literally zero stress! Free alcohol delivery to the boat, DJ was bumping, photographer everywhere. We just showed up and partied. The groom still thanks me every time we hang out. Be the hero who books this!",
    avatar: '⭐',
    package: 'Disco King Package'
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

export default function BachelorParty() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return; // Skip animation for reduced motion
    
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/bachelor-party-austin"
        defaultTitle="Bachelor Party Boat | Premier Austin"
        defaultDescription="Lake Travis bachelor party cruises. ATX Disco with DJ & photographer. Groom cruises FREE. From $85/person. Book now!"
        defaultKeywords={['Austin bachelor party', 'Lake Travis bachelor party', 'ATX Disco Cruise', 'bachelor party boat Austin']}
        schemaType="event"
      />
      <PublicNavigation />
      <Breadcrumb />
      
      {/* Hero Section with Crossfade */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
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
              <img 
                src={image}
                alt="Bachelor party Austin cruise on Lake Travis - ATX Disco party boat with DJ and entertainment"
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
                loading={index === 0 ? "eager" : "lazy"}
                fetchpriority={index === 0 ? "high" : "low"}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </motion.div>
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-white text-center flex-grow flex items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-5xl mx-auto w-full"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
              data-editable data-editable-id="bachelor-hero-title"
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
              className="text-xl md:text-2xl mb-8 text-gray-100"
              data-editable data-editable-id="bachelor-hero-subtitle"
            >
              Exclusively for Bachelorette & Bachelor Parties<br/>
              <span className="text-lg">The Highlight of Your Weekend Every. Damn. Time.</span>
            </motion.p>

            {/* Scarcity Banner */}
            <motion.div 
              variants={fadeInUp}
              className="bg-red-600/90 backdrop-blur-sm rounded-lg p-4 mb-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-6 w-6 animate-pulse" />
                <span className="font-bold text-lg">Most weekends sell out 4-6 weeks early!</span>
              </div>
              <p className="text-sm mt-2">Books up SOLID at least a month in advance</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-base sm:text-lg md:text-xl px-6 sm:px-8 py-4 sm:py-5 md:py-6 whitespace-normal min-h-[3.5rem] sm:min-h-[4rem]"
                data-testid="button-hero-book-now-bachelor"
              >
                <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                <span className="text-center leading-tight">BOOK NOW - Be the Hero!</span>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveTab('packages')}
                className="border-white text-white hover:bg-white hover:text-black font-bold"
                data-testid="button-hero-see-packages"
              >
                See Packages & Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-900 dark:text-white text-base md:text-lg font-semibold">
              Just <span className="text-brand-blue">SHOW UP & GET DOWN</span> - Everything Included!
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer Boxes Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <QuickAnswerBoxGroup
            title="Quick Answers for Bachelor Parties"
            boxes={[
              {
                id: 'start-time',
                question: 'What time do bachelor party cruises start?',
                answer: 'Multiple daily departures available: Morning cruises at 10 AM, popular noon departures at 12 PM, and afternoon cruises at 2 PM. Private charters offer flexible start times from 9 AM to sunset, perfect for customizing your bachelor party schedule.',
                keywords: ['departures', 'morning', 'noon', 'afternoon', 'private charters'],
                icon: Clock,
                relatedLink: {
                  href: '#packages',
                  text: 'View packages and times'
                }
              },
              {
                id: 'cooler-allowed',
                question: 'Can we bring a cooler on the boat?',
                answer: 'Yes! All boats have large coolers with ice provided. BYOB is encouraged - bring your favorite beverages and we\'ll keep them cold. For disco cruises, higher packages include private coolers. Private charters always include dedicated cooler space for your group.',
                keywords: ['cooler', 'BYOB', 'ice', 'beverages'],
                icon: Package,
                relatedLink: {
                  href: '/faq',
                  text: 'See all FAQs'
                }
              }
            ]}
            columns={2}
            className="max-w-5xl mx-auto"
          />
        </div>
      </section>

      {/* Build My Quote Now Section */}
      <section className="py-16 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={reducedMotion ? undefined : { once: true }}
            variants={reducedMotion ? undefined : fadeInUp}
            className="text-center"
          >
            <h2 
              className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6 text-white tracking-wider"
              data-editable 
              data-editable-id="quote-builder-heading"
            >
              BUILD MY QUOTE NOW
            </h2>
            <p 
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              data-editable 
              data-editable-id="quote-builder-subheading"
            >
              Get instant pricing for your <Link href="/party-boat-lake-travis" className="text-primary hover:underline">Lake Travis</Link> celebration in minutes
            </p>
            
            {!showQuoteBuilder ? (
              <Button
                size="lg"
                onClick={() => setShowQuoteBuilder(true)}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-10 md:px-14 lg:px-16 py-4 sm:py-5 md:py-6 lg:py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide whitespace-normal min-h-[3.5rem] sm:min-h-[4rem]"
                data-testid="button-build-quote"
              >
                <Sparkles className="mr-2 sm:mr-2 md:mr-3 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 flex-shrink-0" />
                <span data-editable data-editable-id="quote-builder-button" className="text-center leading-tight">Start Building Your Quote</span>
                <ArrowRight className="ml-2 sm:ml-2 md:ml-3 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 flex-shrink-0" />
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowQuoteBuilder(false)}
                className="border-3 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-12 py-6 rounded-2xl backdrop-blur-sm mb-8"
                data-testid="button-hide-quote"
              >
                <X className="mr-2 h-5 w-5" />
                <span data-editable data-editable-id="quote-builder-hide-button">Hide Quote Builder</span>
              </Button>
            )}
          </motion.div>

          {/* Expandable Quote Builder Iframe */}
          <AnimatePresence>
            {showQuoteBuilder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-12 overflow-hidden"
              >
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <iframe 
                      src="https://ppc-quote-builder.lovable.app/"
                      title="Build Your Quote - Premier Party Cruises"
                      className="w-full"
                      style={{ 
                        minHeight: '1200px',
                        height: '90vh',
                        border: 'none'
                      }}
                      allow="payment; geolocation"
                      allowFullScreen
                      data-testid="iframe-quote-builder"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Snippets Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* What is a bachelor party boat cruise? */}
            <FeaturedSnippet
              question="What is a bachelor party boat cruise?"
              answer="A bachelor party boat cruise is a 4-hour celebration on Lake Travis where bachelor groups enjoy professional DJ entertainment, swimming, BYOB drinks, and party with other bachelor groups. These cruises feature giant floats, photography, and create unforgettable memories for the groom and crew."
              format="paragraph"
              schemaType="FAQ"
            />
            
            {/* How to plan a bachelor party on Lake Travis */}
            <FeaturedSnippetHowTo
              title="How to plan a bachelor party on Lake Travis?"
              description="Follow these steps to plan the perfect bachelor party on Lake Travis:"
              steps={[
                "Book your cruise 4-6 weeks in advance to secure your date",
                "Choose between ATX Disco Cruise ($85-125/person) or Private Charter ($200-400/hour)",
                "Select your package level (Basic, Disco King, or Platinum)",
                "Pre-order alcohol delivery through Party on Delivery",
                "Arrange round-trip transportation with 25% discount",
                "Check-in at Anderson Mill Marina at 11:30 AM on cruise day",
                "Bring swimsuits, sunglasses, and get ready to party!"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 h-auto p-1">
              <TabsTrigger value="overview" data-testid="tab-overview"><span data-editable data-editable-id="bachelor-tab-overview">Overview</span></TabsTrigger>
              <TabsTrigger value="included" data-testid="tab-included"><span data-editable data-editable-id="bachelor-tab-included">What's Included</span></TabsTrigger>
              <TabsTrigger value="packages" data-testid="tab-packages"><span data-editable data-editable-id="bachelor-tab-packages">Packages</span></TabsTrigger>
              <TabsTrigger value="compare" data-testid="tab-compare"><span data-editable data-editable-id="bachelor-tab-compare">Compare</span></TabsTrigger>
              <TabsTrigger value="faq" data-testid="tab-faq"><span data-editable data-editable-id="bachelor-tab-faq">FAQs</span></TabsTrigger>
              <TabsTrigger value="photos" data-testid="tab-photos"><span data-editable data-editable-id="bachelor-tab-photos">Photos</span></TabsTrigger>
              <TabsTrigger value="testimonials" data-testid="tab-testimonials"><span data-editable data-editable-id="bachelor-tab-reviews">Reviews</span></TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelor-overview-main-heading">
                  Show Your Groom the <span className="text-brand-yellow">BEST Weekend</span> of His Life!
                </h2>
                
                <div className="bg-brand-yellow/10 border-2 border-brand-yellow rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold text-brand-yellow mb-4 text-center" data-editable data-editable-id="bachelor-overview-hero-callout">
                    You'll Be the HERO - Everyone Will Love This!
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Trophy className="h-6 w-6 text-brand-yellow mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelor-overview-feature-1-title">The ONLY All-Inclusive Boat Party in Austin!</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-overview-feature-1-desc">Experience <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-semibold">our ATX Disco Cruise</Link>, the ONLY joint party in the country EXCLUSIVELY for Bach parties - unique experience you can't get anywhere else!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-6 w-6 text-brand-yellow mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelor-overview-feature-2-title">Meet Bachelor Parties from All Over the Country!</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-overview-feature-2-desc">The energy is AMAZING - everyone celebrating the same occasion! Make friends & create priceless memories!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Waves className="h-6 w-6 text-brand-yellow mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelor-overview-feature-3-title">Party on the BIGGEST Unicorn Float in the Country!</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-overview-feature-3-desc">Our GIANT 25-ft unicorn float is legendary - Instagram gold every time!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Zap className="h-6 w-6 text-brand-yellow mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelor-overview-feature-4-title">Nothing to Plan, Nothing to Carry!</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-overview-feature-4-desc">Everything is ready on the boat - just order booze and SHOW UP! FREE alcohol & lunch delivery from Party on Delivery!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <DollarSign className="h-6 w-6 text-brand-yellow mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelor-overview-feature-5-title">Flat-Rate Per-Person Pricing</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-overview-feature-5-desc">Makes payment splitting EASY - everyone pays their own way. ALWAYS cheaper than a <Link href="/private-cruises" className="text-primary hover:underline">private cruise</Link>!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Disco Day Experience */}
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-6" data-editable data-editable-id="bachelor-timeline-title">
                    Your <span className="text-brand-yellow">Disco Day Experience</span>
                  </h3>
                  <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8" data-editable data-editable-id="bachelor-timeline-subtitle">
                    SERIOUSLY the highlight of the weekend EVERY single time!
                  </p>
                  
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-black font-bold">
                          1
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelor-timeline-step-1-title">Arrival & Check-In (11:30 AM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-timeline-step-1-desc">
                          Meet at the dock - our crew welcomes your group! Check in is a breeze, grab your wristbands and party favors. 
                          Your alcohol delivery is waiting (if you pre-ordered) or grab drinks from the marina store.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-black font-bold">
                          2
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelor-timeline-step-2-title">Boarding & Setup (11:45 AM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-timeline-step-2-desc">
                          Board the boat and claim your crew's spot! Your private cooler is already stocked with ice. 
                          Set up your drinks, grab some party supplies, and start vibing with other bachelor parties!
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-black font-bold">
                          3
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelor-timeline-step-3-title">We Launch! Party Starts NOW! (12:00 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-timeline-step-3-desc">
                          DJ drops the first beat and the party EXPLODES! Dance floor opens, drinks flowing, 
                          energy through the roof! Professional photographer capturing every epic moment!
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-black font-bold">
                          4
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelor-timeline-step-4-title">Cruising Lake Travis (12:00-2:30 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-timeline-step-4-desc">
                          Dancing, partying, meeting other groups from across the country! The vibes are INSANE - 
                          everyone's celebrating, the music is BUMPING, and you're making memories that'll last forever!
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-black font-bold">
                          5
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelor-timeline-step-5-title">Anchor Time! Float Party! (2:30-3:30 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-timeline-step-5-desc">
                          We anchor and the LEGENDARY UNICORN comes out! Jump in Lake Travis, float on the lily pads, 
                          dominate the BIGGEST unicorn float in the country! This is THE Instagram moment - photographer going wild!
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-black font-bold">
                          6
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelor-timeline-step-6-title">Return & Last Dance (3:30-4:00 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-timeline-step-6-desc">
                          Head back with one EPIC last dance! DJ brings it home, everyone's singing along, 
                          phone numbers exchanged with your new crew from across the country. You did it - you're the LEGEND!
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-8 bg-green-50 dark:bg-green-950/20 border-2 border-green-500 rounded-lg p-6 text-center">
                    <p className="text-lg font-bold text-green-700 dark:text-green-400 mb-2" data-editable data-editable-id="bachelor-timeline-result-title">
                      🎉 The Result: Priceless Memories & Amazing Vibes! 🎉
                    </p>
                    <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-timeline-result-desc">
                      Your crew will talk about this for YEARS. You'll be the hero who planned the BEST bachelor party they've ever been to!
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-lg" data-editable data-editable-id="bachelor-overview-pricing">
                    Starting at just <span className="text-brand-yellow font-bold text-2xl">$85/person</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">($109 with tax & tip)</span>
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelor-overview-details">
                    Friday & Saturday • 4 Hours on Lake Travis • Up to 50 People
                  </p>
                  
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                    data-testid="button-overview-book-bachelor"
                  >
                    <span data-editable data-editable-id="bachelor-overview-book-button">Book Your Bachelor Party Now</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <p className="text-sm text-red-600 font-semibold" data-editable data-editable-id="bachelor-overview-urgency">
                    ⚠️ Limited Availability - Books up 4-6 weeks in advance!
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* What's Included Tab */}
            <TabsContent value="included" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4" data-editable data-editable-id="bachelor-included-title">
                  EVERYTHING Included but Alcohol!
                </h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8" data-editable data-editable-id="bachelor-included-subtitle">
                  Just SHOW UP & GET DOWN - We handle everything else
                </p>

                {/* Disco vs Private Comparison Sub-Tabs */}
                <Tabs defaultValue="comparison" className="w-full mb-8">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="comparison" data-testid="tab-disco-vs-private">Disco vs Private</TabsTrigger>
                    <TabsTrigger value="disco-details" data-testid="tab-disco-details">Disco Details</TabsTrigger>
                  </TabsList>

                  {/* Comparison Grid */}
                  <TabsContent value="comparison">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                                What's Included
                              </th>
                              <th className="px-6 py-4 text-center text-sm font-bold text-purple-600 dark:text-purple-400">
                                <div className="flex items-center justify-center gap-2">
                                  <Disc3 className="h-5 w-5" />
                                  Disco Cruise
                                </div>
                              </th>
                              <th className="px-6 py-4 text-center text-sm font-bold text-blue-600 dark:text-blue-400">
                                <div className="flex items-center justify-center gap-2">
                                  <Ship className="h-5 w-5" />
                                  Private Cruise
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Professional DJ</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Professional Photographer</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Private Cooler with Ice</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Party Supplies (Cups, Koozies, Name Tags)</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Multiple Lily Pad Floats (3 huge 6x20')</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                              <td className="px-6 py-4 text-center text-xs text-gray-500">Add-on: $100/hr</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Ice Water Stations</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Clean Restroom Facilities</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Plenty of Shade Coverage</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Private Boat Charter (Entire Boat for Your Group)</td>
                              <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Captain & Crew Included</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Custom Playlist & Music Control</td>
                              <td className="px-6 py-4 text-center text-xs text-gray-500">DJ Curated</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Flexible Departure Times</td>
                              <td className="px-6 py-4 text-center text-xs text-gray-500">Set Schedule</td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">Bring Your Own Decorations</td>
                              <td className="px-6 py-4 text-center"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                              <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Price Range Comparison */}
                      <div className="grid md:grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800">
                        <div className="px-6 py-6 text-center">
                          <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">Disco Cruise</h3>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">$85-$105</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">per person (4 hours)</p>
                          <p className="text-xs text-gray-500 mt-2">Best for groups of 10-50</p>
                        </div>
                        <div className="px-6 py-6 text-center">
                          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Private Cruise</h3>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">Starting at $200/hour</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">(3-4 hr minimum)</p>
                          <p className="text-xs text-gray-500 mt-2">Best for groups of 6-75</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-300 dark:border-blue-800 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Which is Right for You?
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Choose Disco Cruise if you want:</h4>
                          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                            <li>• Professional DJ & Photographer included</li>
                            <li>• All party supplies & amenities provided</li>
                            <li>• Best value per person pricing</li>
                            <li>• Meet bachelor parties from all over</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Choose Private Cruise if you want:</h4>
                          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                            <li>• Entire boat to yourself</li>
                            <li>• Full control over music & schedule</li>
                            <li>• Bring your own decorations</li>
                            <li>• Flexible departure times</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Disco Details Tab */}
                  <TabsContent value="disco-details">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {whatsIncluded.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-brand-yellow/20 rounded-full">
                              <item.icon className="h-6 w-6 text-brand-yellow" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-2" data-editable data-editable-id={`bachelor-included-item-${index}-title`}>{item.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" data-editable data-editable-id={`bachelor-included-item-${index}-description`}>{item.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-brand-blue/10 border-2 border-brand-blue rounded-xl p-6 text-center">
                      <h3 className="text-xl font-bold mb-4" data-editable data-editable-id="bachelor-included-unicorn-title">Plus the BIGGEST Unicorn Float in the Country!</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4" data-editable data-editable-id="bachelor-included-unicorn-desc">
                        Our GIANT 25-ft Inflatable Unicorn Float is Instagram-worthy and unforgettable
                      </p>
                      <Button
                        onClick={() => handleGetQuote()}
                        className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                        data-testid="button-included-book-bachelor"
                      >
                        <span data-editable data-editable-id="bachelor-included-reserve-button">Reserve Your Date Now</span>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages" className="mt-8">
              <Tabs defaultValue="disco" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="disco" data-testid="tab-disco-packages">Disco Cruise Packages</TabsTrigger>
                  <TabsTrigger value="private" data-testid="tab-private-packages">Private Cruise Packages</TabsTrigger>
                </TabsList>

                {/* Existing Disco Packages Content */}
                <TabsContent value="disco">
                  <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelor-packages-title">
                      Choose Your Bachelor Party Package
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {discoPackages.map((pkg) => (
                        <Card 
                          key={pkg.id} 
                          className={cn(
                            "relative h-full",
                            pkg.popular && "border-2 border-brand-yellow shadow-xl"
                          )}
                        >
                          {pkg.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                              <Badge className="bg-brand-yellow text-black font-bold px-4 py-1">
                                <span data-editable data-editable-id={`bachelor-package-${pkg.id}-badge`}>MOST POPULAR</span>
                              </Badge>
                            </div>
                          )}
                          
                          <CardHeader className="text-center pb-4">
                            <div className="flex justify-center mb-4">
                              <pkg.icon className="h-12 w-12 text-brand-yellow" />
                            </div>
                            <CardTitle className="text-2xl" data-editable data-editable-id={`bachelor-package-${pkg.id}-name`}>{pkg.name}</CardTitle>
                            <CardDescription className="text-sm mt-2" data-editable data-editable-id={`bachelor-package-${pkg.id}-subtitle`}>
                              {pkg.subtitle}
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <div className="text-center">
                              <div className="text-3xl font-bold">
                                ${pkg.price}/person
                              </div>
                              <div className="text-lg text-green-600 dark:text-green-400 font-semibold">
                                ${pkg.id === 'basic' ? '109' : pkg.id === 'disco_king' ? '122' : '135'} with tax & tip
                              </div>
                              {pkg.originalPrice && (
                                <div className="text-sm text-gray-400 line-through">
                                  was ${pkg.originalPrice}
                                </div>
                              )}
                            </div>
                            
                            <ul className="space-y-2">
                              {pkg.features.map((feature, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm" data-editable data-editable-id={`bachelor-package-${pkg.id}-feature-${i}`}>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <Button
                              className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                              onClick={() => handleGetQuote(pkg.id)}
                              data-testid={`button-package-${pkg.id}`}
                            >
                              <span data-editable data-editable-id={`bachelor-package-${pkg.id}-button`}>Select This Package</span>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center">
                      <p className="text-lg mb-4" data-editable data-editable-id="bachelor-packages-includes-text">
                        All packages include: DJ, Photographer, Floats, Party Supplies & More!
                      </p>
                      <Badge className="bg-green-600 text-white">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span data-editable data-editable-id="bachelor-packages-discount-badge">Group Discounts Available for 10+ People</span>
                      </Badge>
                    </div>
                  </div>
                </TabsContent>

                {/* New Private Packages Content */}
                <TabsContent value="private">
                  <div className="max-w-6xl mx-auto">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
                      Private Cruise Options for Bach Parties
                    </h3>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
                      Want your own private boat? Choose from our three package tiers - all 4-hour cruises on our 14-person boat.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Standard Package - $200/hr */}
                      <Card className="border-2">
                        <CardContent className="p-6">
                          <div className="text-center mb-4">
                            <Package className="h-12 w-12 mx-auto text-brand-blue mb-2" />
                            <h4 className="text-2xl font-bold mb-2">Standard Private Cruise</h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Essential cruise experience</p>
                            <div className="text-3xl font-bold text-brand-blue">$200/hour</div>
                            <p className="text-sm text-gray-500">4-hour minimum = $800</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Amazing, experienced captain</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>2 large empty coolers (bring your own ice & drinks)</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Premium Bluetooth speaker system</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Clean restroom facilities</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Comfortable seating for 14 guests</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Plenty of sun & shade areas</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Essentials Package - $225/hr */}
                      <Card className="border-2 border-brand-yellow shadow-lg">
                        <CardContent className="p-6">
                          <Badge className="mb-2">MOST POPULAR</Badge>
                          <div className="text-center mb-4">
                            <Gift className="h-12 w-12 mx-auto text-brand-blue mb-2" />
                            <h4 className="text-2xl font-bold mb-2">Private Plus Essentials</h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Complete convenience package</p>
                            <div className="text-3xl font-bold text-brand-blue">$225/hour</div>
                            <p className="text-sm text-gray-500">4-hour minimum = $900</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span className="font-semibold">Everything from Standard Cruise</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Insulated 5-gallon dispenser with ice water</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>15 gallons of fresh water & 30 solo cups</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Coolers pre-stocked with 40lbs of ice</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>6-ft folding table for food & drinks</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Ultimate Package - $250/hr */}
                      <Card className="border-2">
                        <CardContent className="p-6">
                          <div className="text-center mb-4">
                            <Crown className="h-12 w-12 mx-auto text-brand-blue mb-2" />
                            <h4 className="text-2xl font-bold mb-2">Private with Ultimate Package</h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Complete party experience</p>
                            <div className="text-3xl font-bold text-brand-blue">$250/hour</div>
                            <p className="text-sm text-gray-500">4-hour minimum = $1,000</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span className="font-semibold">Everything from Essentials Package</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>6x20' giant lily pad float</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Unicorn or ring float for guest of honor</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>5 disco ball cups & 30 additional solo cups</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Bubble gun & 3 bubble wands for fun</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>20 champagne flutes & 3 fruit juices</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>2 bottles SPF-50 spray sunscreen</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>3 disco balls installed for party atmosphere</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-8 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All prices shown are base hourly rates. Tax, gratuity, and any add-ons are additional.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Compare Tab - Comprehensive Value Calculator */}
            <TabsContent value="compare" className="mt-8">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4" data-editable data-editable-id="bachelor-compare-title">
                  <DollarSign className="w-10 h-10 inline mr-3 text-green-600" />
                  The Math Doesn't Lie: Disco Cruise Wins for Guys' Weekend
                </h2>
                <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
                  See exactly how much you save with the ATX Disco Cruise for any group size
                </p>
                <DiscoVsPrivateValueCalculator />
                <div className="mt-12 text-center">
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-base sm:text-lg md:text-xl px-6 sm:px-8 py-4 sm:py-5 md:py-6 h-auto whitespace-normal min-h-[3.5rem] sm:min-h-[4rem]"
                    data-testid="button-compare-book-bachelor"
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-center leading-tight">Book the Best Bachelor Party Experience</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 flex-shrink-0" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faq" className="mt-8">
              {/* Why Choose ATX Disco Cruise Section */}
              <div className="mb-12 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-gray-950 dark:via-orange-950/20 dark:to-pink-950/20 rounded-2xl p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                  Why Choose ATX Disco Cruise?
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Unbeatable Value</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">3-5x better value than private rentals with all entertainment included</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Multi-Group Energy</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Meet other bachelor parties from across the country for epic vibes</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">100% Satisfaction</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Thousands of groups served since 2009 with perfect track record</p>
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/atx-disco-cruise">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold"
                      data-testid="button-why-choose-disco"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Explore ATX Disco Cruise
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelor-faq-title">
                  Frequently Asked Questions
                </h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item) => (
                    <AccordionItem 
                      key={item.id} 
                      value={item.id}
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg px-6"
                    >
                      <AccordionTrigger 
                        className="text-left hover:no-underline"
                        data-testid={`faq-trigger-${item.id}`}
                      >
                        <span data-editable data-editable-id={`bachelor-faq-${item.id}-question`}>{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400">
                        <span data-editable data-editable-id={`bachelor-faq-${item.id}-answer`}>
                          {(item as any).answerJsx || item.answer}
                        </span>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Card className="mt-8 bg-brand-yellow/10 border-brand-yellow">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3" data-editable data-editable-id="bachelor-faq-help-title">Still have questions?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4" data-editable data-editable-id="bachelor-faq-help-desc">
                      Our team is here to help make your bachelor party perfect!
                    </p>
                    <Button
                      onClick={() => handleGetQuote()}
                      variant="outline"
                      className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black"
                      data-testid="button-faq-contact"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      <span data-editable data-editable-id="bachelor-faq-chat-button">Chat with Us</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelor-photos-title">
                  Bachelor Party Vibes & Photos
                </h2>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {galleryPhotos.map((photo) => (
                      <CarouselItem key={photo.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2">
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="rounded-lg w-full h-64 object-cover"
                            loading="lazy"
                            data-testid={`photo-gallery-${photo.id}`}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                <div className="mt-8 text-center">
                  <p className="text-lg mb-4" data-editable data-editable-id="bachelor-photos-description">
                    Professional photography included with every cruise!
                  </p>
                  <Button
                    onClick={() => handleGetQuote()}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                    data-testid="button-photos-book-bachelor"
                  >
                    <span data-editable data-editable-id="bachelor-photos-book-button">Book Your Epic Bachelor Party</span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelor-testimonials-title">
                  What Grooms Are Saying
                </h2>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {testimonials.map((testimonial) => (
                      <CarouselItem key={testimonial.id} className="md:basis-1/2">
                        <Card className="h-full">
                          <CardContent className="pt-6">
                            <div className="flex items-center mb-4">
                              <span className="text-3xl md:text-4xl mr-4">{testimonial.avatar}</span>
                              <div>
                                <p className="font-semibold" data-editable data-editable-id={`bachelor-testimonial-${testimonial.id}-name`}>{testimonial.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400" data-editable data-editable-id={`bachelor-testimonial-${testimonial.id}-role`}>
                                  {testimonial.role} • {testimonial.location}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex mb-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 mb-3" data-editable data-editable-id={`bachelor-testimonial-${testimonial.id}-text`}>
                              "{testimonial.text}"
                            </p>
                            
                            <Badge variant="secondary"><span data-editable data-editable-id={`bachelor-testimonial-${testimonial.id}-package`}>{testimonial.package}</span></Badge>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                <div className="mt-8 text-center">
                  <p className="text-lg mb-4" data-editable data-editable-id="bachelor-testimonials-description">
                    Join thousands of satisfied grooms who made their bachelor party legendary!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                    data-testid="button-testimonials-book-bachelor"
                  >
                    <span data-editable data-editable-id="bachelor-testimonials-success-button">Be the Next Success Story</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comprehensive Why You Should Book ATX Disco Cruise Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={reducedMotion ? undefined : { once: true }}
            variants={reducedMotion ? undefined : fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-brand-yellow text-black text-xl px-8 py-3 font-bold">
              <Sparkles className="w-6 h-6 mr-2 inline" /> ATX Disco Cruise
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
              Why You Should Book the <span className="text-brand-yellow">ATX Disco Cruise</span>
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-brand-yellow mb-4">
              SHOW UP & GET DOWN!!
            </p>
            <p className="text-xl text-white/90 max-w-4xl mx-auto">
              The country's ONLY all-inclusive multi-group bachelor party cruise. Here's why thousands of groups choose us every year.
            </p>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={reducedMotion ? undefined : { once: true }}
            variants={reducedMotion ? undefined : staggerChildren}
            className="max-w-7xl mx-auto"
          >
            <Accordion type="multiple" className="space-y-4">
              {/* Benefit 1: Show Up & Get Down */}
              <AccordionItem value="item-1" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-showup">
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-brand-yellow" />
                    <span>Just SHOW UP & GET DOWN! Everything's Included!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">Literally just show up with your booze and PARTY! We provide absolutely everything else:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Professional DJ playing your favorite hits all day long</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Professional photographer capturing every epic moment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Private cooler with ice already set up for your group</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Mimosa supplies (juice & fresh fruit - just add champagne!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Giant lily pad floats for the ultimate Instagram moment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Bubbles, koozies, name tags, cups - all the party supplies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Ice water stations to keep everyone hydrated</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 2: Best Weekend Ever */}
              <AccordionItem value="item-2" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-best-weekend">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-6 w-6 text-brand-yellow" />
                    <span>Show Your Groom the BEST Weekend of His Life!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p>This isn't just another boat rental - it's a LEGENDARY experience that will be talked about for years! Your groom and crew will remember this as the most epic day of the entire bachelor party weekend. With professional entertainment, amazing vibes, and the energy of multiple bachelor parties celebrating together, this is THE highlight that makes your Austin bachelor party unforgettable.</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 3: Highlight Every Time */}
              <AccordionItem value="item-3" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-highlight">
                  <div className="flex items-center gap-3">
                    <Star className="h-6 w-6 text-brand-yellow fill-current" />
                    <span>It's the Highlight of The Weekend, EVERY. DAMN. TIME.</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p>Don't just take our word for it - after hosting thousands of bachelor parties, we can confidently say this is THE most fun they've had in years. The combination of the beautiful lake, professional DJ, amazing energy from multiple groups, and 4 full hours of non-stop partying creates an experience that consistently tops every other bachelor party activity. Your crew will be talking about this for decades!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 4: Turnkey Convenience */}
              <AccordionItem value="item-4" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-turnkey">
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-brand-yellow" />
                    <span>You've Got Enough to Worry About! We Handle Everything!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">Planning a bachelor party is stressful enough. Don't deal with:</p>
                  <ul className="space-y-2 ml-6 mb-3">
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <span>Renting and hauling coolers, ice, cups, and party supplies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <span>Coordinating a DJ or music setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <span>Finding and paying a photographer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <span>Buying floats and water toys</span>
                    </li>
                  </ul>
                  <p className="font-bold text-brand-yellow">Everything is ready when you arrive - just bring your booze and GET DOWN!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 5: Multi-Group Party */}
              <AccordionItem value="item-5" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-multi-group">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-brand-yellow" />
                    <span>Party With Other Bachelor Parties from All Over America!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">This is what makes the ATX Disco Cruise TRULY unique - you're not alone on the boat! We host multiple bachelor parties from across the country, all celebrating together:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Meet groups from California, New York, Florida, and everywhere in between</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Everyone's there for the SAME REASON - to celebrate and go CRAZY!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>The energy is ELECTRIC when everyone's celebrating together</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Make friends, exchange stories, and create a party atmosphere that's UNMATCHED</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 6: Best Value */}
              <AccordionItem value="item-6" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-value">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-brand-yellow" />
                    <span>Cheaper Per Person Than a Private Cruise (Most of the Time!)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">For smaller groups (under 15 people), the ATX Disco Cruise is ALWAYS the better deal:</p>
                  <div className="bg-black/30 rounded-lg p-4 mb-3">
                    <p className="font-bold text-brand-yellow mb-2">Private Boat Math:</p>
                    <p>$2,000 private rental ÷ 10 people = $200/person (and you still need to buy supplies!)</p>
                  </div>
                  <div className="bg-green-900/30 rounded-lg p-4">
                    <p className="font-bold text-green-400 mb-2">Disco Cruise Math:</p>
                    <p>$95/person ALL-INCLUSIVE with DJ, photographer, supplies, and MORE!</p>
                  </div>
                  <p className="mt-3 font-bold">You get WAY more value for WAY less money!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 7: Disco Attire */}
              <AccordionItem value="item-7" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-disco-attire">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-brand-yellow" />
                    <span>Dress Up In Your Finest Disco Attire!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">While it's not required, we STRONGLY encourage dressing up in disco attire! Think:</p>
                  <ul className="space-y-2 ml-6 mb-3">
                    <li>• Sequined shirts and bell-bottoms</li>
                    <li>• Platform shoes and funky sunglasses</li>
                    <li>• Afro wigs and glitter everything</li>
                    <li>• Go full Saturday Night Fever!</li>
                  </ul>
                  <p className="font-bold text-brand-yellow">The groups that dress up have 10X MORE FUN and get AMAZING photos!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 8: People Watching */}
              <AccordionItem value="item-8" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-people-watching">
                  <div className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-brand-yellow" />
                    <span>Watch Everyone Celebrate & Go Nuts - Best People Watching on Earth!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p>Seeing 3-4 different bachelor parties all going wild at the same time is PRICELESS entertainment in itself! Watch groups in crazy costumes, see different celebration styles from across America, witness epic dance-offs, and be part of the most energetic party atmosphere you've ever experienced. It's a show within a party within a cruise!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 9: Nothing Compares */}
              <AccordionItem value="item-9" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-nothing-compares">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-brand-yellow" />
                    <span>Nothing Else Compares - We're Miles Ahead!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">We've analyzed every bachelor party option in Austin and across America:</p>
                  <ul className="space-y-2 ml-6 mb-3">
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <span>Pontoon boat rentals: Tiny, basic, 2 hours max, bring everything yourself</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <span>Party buses: Cramped, just driving around, no swimming or water fun</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <span>Bar crawls: Expensive drinks, dealing with crowds, no unique experience</span>
                    </li>
                  </ul>
                  <p className="font-bold text-brand-yellow">The ATX Disco Cruise is in a league of its own - nothing else offers this combination of value, fun, and unique experience!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 10: Proven Track Record */}
              <AccordionItem value="item-10" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-track-record">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-brand-yellow" />
                    <span>You're In Good Hands - 14 Years, ZERO Incidents!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">Safety and fun go hand-in-hand with Premier Party Cruises:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>14+ years of operating bachelor parties on Lake Travis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>ZERO safety incidents - perfect track record</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Professional, experienced crew who know how to throw a party safely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Thousands of 5-star reviews from satisfied bachelor parties</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 11: Split Payment */}
              <AccordionItem value="item-11" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-split-payment">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-brand-yellow" />
                    <span>Split Payment With Your Group - Easy as 1-2-3!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">No more chasing people down for Venmo payments! Our split payment option makes it EASY:</p>
                  <div className="space-y-3 ml-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-brand-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <p>Share the payment link with your group</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-brand-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <p>Everyone pays their own share directly</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-brand-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <p>No awkward money conversations or fronting thousands of dollars!</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 12: Stress-Free Booking */}
              <AccordionItem value="item-12" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-brand-yellow" data-testid="accordion-stress-free">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-brand-yellow" />
                    <span>Stress-Free Booking Process - But Don't Sleep On It!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-brand-yellow mb-2">Super Easy to Book:</p>
                      <ul className="space-y-2 ml-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <span>Quick online checkout in minutes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <span>48-hour full refund window if plans change</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <span>Can easily add more people after booking</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-4">
                      <p className="font-bold text-red-300 mb-2">⚠️ BUT DON'T WAIT TOO LONG!</p>
                      <p>We book up SOLID at least a month in advance! Most weekends sell out 4-6 weeks early. Book NOW to secure your spot!</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-2xl px-16 py-8"
                data-testid="button-why-book-cta-bachelor"
              >
                <Sparkles className="mr-3 h-7 w-7" />
                Book Your ATX Disco Cruise Now!
                <ArrowRight className="ml-3 h-7 w-7" />
              </Button>
              <p className="text-white/80 mt-4">Weekends sell out 4-6 weeks in advance - don't miss out!</p>
            </div>
          </motion.div>
        </div>
      </section>

      <PartyPlanningChecklist partyType="Bachelor Party" eventType="bachelor celebration" />

      {/* 10 Reasons Why Austin Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-blue-700 to-purple-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={reducedMotion ? undefined : { once: true }}
            variants={reducedMotion ? undefined : fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-6"
              data-testid="heading-austin-reasons-bachelor"
            >
              10 Reasons Why Austin is the Best Place for Bachelor Parties
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover why Austin bachelor parties are legendary and why Lake Travis is the ultimate destination
            </p>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={reducedMotion ? undefined : { once: true }}
            variants={reducedMotion ? undefined : staggerChildren}
            className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto"
          >
            {/* Reason 1 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-1"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Waves className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">Lake Travis - Crystal Clear Waters</h3>
                  </div>
                  <p className="text-white/90">
                    Austin's Lake Travis offers the clearest water in Texas with 270 miles of pristine shoreline. Perfect weather year-round means your Austin bachelor party can happen any season.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reason 2 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-2"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Music className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">World-Famous Nightlife</h3>
                  </div>
                  <p className="text-white/90">
                    6th Street, Rainey Street, and the Warehouse District make Austin the live music capital with incredible nightlife. Your bachelor party Austin experience includes the best bars and clubs in Texas.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reason 3 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-3"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Utensils className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">Unbeatable Food Scene</h3>
                  </div>
                  <p className="text-white/90">
                    Austin's food trucks, BBQ joints, and award-winning restaurants create the perfect bachelor party fuel. From Franklin BBQ to food truck tacos, Austin bachelor parties eat like kings.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reason 4 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">No State Income Tax</h3>
                  </div>
                  <p className="text-white/90">
                    Your Austin bachelor party budget goes further - Texas has no state income tax, so drinks, activities, and entertainment cost less than other major cities.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reason 5 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Sun className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">Perfect Year-Round Weather</h3>
                  </div>
                  <p className="text-white/90">
                    Austin's 300 days of sunshine per year mean your bachelor party Austin celebration happens rain or shine. Lake Travis maintains a constant 70-degree water temperature.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reason 6 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    6
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">30 Minutes from Everything</h3>
                  </div>
                  <p className="text-white/90">
                    Austin bachelor parties access Lake Travis party boats in 30 minutes, downtown bars in 20 minutes, and Hill Country wineries in 45 minutes. Everything's close.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reason 7 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    7
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Anchor className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">Party Boat Capital</h3>
                  </div>
                  <p className="text-white/90">
                    Austin is home to Premier Party Cruises - the longest-running <Link href="/party-boat-austin" className="text-primary hover:underline">party boat</Link> company on Lake Travis with 15+ years of experience and 100,000+ happy customers.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reason 8 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    8
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">Diverse Entertainment Options</h3>
                  </div>
                  <p className="text-white/90">
                    Your Austin bachelor party can include party boats, topgolf, kayaking, live music, BBQ tours, brewery crawls, and more all in one weekend.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reason 9 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-9"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    9
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">Bachelor-Friendly Atmosphere</h3>
                  </div>
                  <p className="text-white/90">
                    Austin welcomes bachelor parties with open arms. The city's 'Keep Austin Weird' culture means anything goes and everyone's welcome.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reason 10 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              data-testid="reason-card-10"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-bold text-xl flex items-center justify-center">
                    10
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Plane className="h-8 w-8 text-brand-yellow" />
                    <h3 className="text-2xl font-bold text-white">Easy Airport Access</h3>
                  </div>
                  <p className="text-white/90">
                    Austin-Bergstrom International Airport serves 150+ destinations. Your Austin bachelor party guests fly in easily from anywhere in the country.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={reducedMotion ? undefined : { once: true }}
            variants={reducedMotion ? undefined : fadeInUp}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={() => handleGetQuote()}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6"
              data-testid="button-austin-reasons-book-bachelor"
            >
              <Calendar className="mr-2 h-6 w-6" />
              Book Your Austin Bachelor Party Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Related Experiences Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={reducedMotion ? undefined : { once: true }}
            variants={reducedMotion ? undefined : fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold font-heading mb-4">
              Related Austin Party Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Planning more than just a bachelor party? Explore our full range of Lake Travis party boat experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/bachelorette-party-austin">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Bachelorette Party Austin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Austin's #1 bachelorette party boat experience with ATX Disco Cruises on Lake Travis. Professional DJ, photographer, and VIP treatment.
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Bachelorette Parties
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/combined-bachelor-bachelorette-austin">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Combined Bachelor/Bachelorette Austin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Celebrate together! Combined bach parties on Lake Travis with the best of both worlds.
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Combined Parties
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/party-boat-austin">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <Ship className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Party Boat Austin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Explore all our Austin party boat options - from private charters to ATX Disco Cruises on Lake Travis.
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      View All Party Boats
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t shadow-lg z-40 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 animate-pulse" />
              <span className="text-sm font-semibold" data-editable data-editable-id="bachelor-sticky-footer-urgency">Limited Availability - Books 4-6 weeks out!</span>
            </div>
            <Button
              onClick={() => handleGetQuote()}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
              data-testid="button-sticky-book-bachelor"
            >
              <span data-editable data-editable-id="bachelor-sticky-footer-button">Book Bachelor Party Now</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* The Lemonade Disco - Weather Guarantee Section */}
      <section id="lemonade-disco" className="py-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400">
        <div className="container mx-auto px-6">
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={reducedMotion ? undefined : { once: true }}
            variants={reducedMotion ? undefined : fadeInUp}
            className="max-w-5xl mx-auto"
          >
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl border-4 border-white">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <CloudRain className="h-12 w-12 text-blue-600" />
                  <Sun className="h-16 w-16 text-yellow-500" />
                  <Smile className="h-12 w-12 text-orange-600" />
                </div>
                <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">Lemonade Disco</span>
                </CardTitle>
                <CardDescription className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  If The Weather Gives Us Lemons, We Make Lemonade! :)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Shield className="h-7 w-7 text-blue-600" />
                    Your 100% Weather Guarantee
                  </h3>
                  <p className="text-lg mb-4">
                    We're the ONLY party cruise company in America with a comprehensive weather backup plan. If severe weather makes it unsafe to cruise, we automatically switch to our land-based party - The Lemonade Disco!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border-2 border-green-300 dark:border-green-800">
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      What's Included in Lemonade Disco:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Utensils className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>Full fajita or BBQ buffet (your choice!)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Wine className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>Drinks provided for the group</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Music className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>Same professional DJ keeping the party going</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Camera className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>Professional photographer still capturing memories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <PartyPopper className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>Same multi-group party atmosphere indoors</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border-2 border-purple-300 dark:border-purple-800">
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Heart className="h-6 w-6 text-purple-600" />
                      Why This Matters:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Plane className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span>Perfect peace of mind for out-of-town groups</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span>Your bachelor party happens NO MATTER WHAT</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Smile className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span>Often ends up being just as fun (sometimes even MORE!)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span>No additional cost - included in your package!</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-950/30 dark:to-pink-950/30 rounded-xl p-6 border-2 border-orange-300 dark:border-orange-700 text-center">
                  <p className="text-lg font-semibold mb-2">
                    <AlertCircle className="h-6 w-6 inline mr-2 text-orange-600" />
                    When Does Lemonade Disco Happen?
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Only if there's a <strong>complete rain-out</strong> with severe weather making it unsafe to be on the water. 
                    Light rain? We still cruise! We've got covered areas and the party keeps going. 
                    But if it's genuinely dangerous weather, we've got you covered with the Lemonade Disco!
                  </p>
                </div>

                <div className="text-center pt-4">
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
                    Book With Confidence - Your Party WILL Happen!
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    No other bachelor party experience in America offers this level of weather protection. 
                    That's just one more reason why we're #1!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 pb-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
              EXPLORE MORE AUSTIN PARTY CRUISE OPTIONS
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check out our other Lake Travis party boat experiences perfect for any celebration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-from-bachelor">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Party Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Sister service - ATX Disco Cruise bachelorette party boats on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/combined-bachelor-bachelorette-austin" data-testid="link-combined-from-bachelor">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Combined Bachelor & Bachelorette</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Party together on our Lake Travis party boats - perfect for couples</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/private-cruises" data-testid="link-private-from-bachelor">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Austin Cruises</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Exclusive private boat charters on Lake Travis for bachelor groups</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery" data-testid="link-gallery-from-bachelor">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Photo Gallery</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">See real bachelor party photos from our Austin boat cruises</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" data-testid="link-contact-from-bachelor">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Get a custom quote for your bachelor party boat experience</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/" data-testid="link-home-from-bachelor">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-yellow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Back to Home</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Explore all our party cruise options and services</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Hidden Crawlable Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/Service">
        <h2>Bachelor Party Austin - Lake Travis Party Boat Packages</h2>
        
        {/* ATX Disco Cruise Packages */}
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Basic Bach Package - Bachelor Party Austin</h3>
          <meta itemProp="price" content="85.00" />
          <meta itemProp="priceCurrency" content="USD" />
          <p itemProp="description">$85 per person bachelor party Austin package on Lake Travis party boat. Join the BEST Party on Lake Travis, Exclusively for Bach Parties! BYOB, throw your drinks in a shared cooler with ice. Alcohol Delivery and Lunch Delivery Available. ALWAYS Cheaper than a Private Cruise. If you're trying to keep it cheap, this is your move for your bachelor party Austin celebration!</p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content="85.00" />
            <meta itemProp="priceCurrency" content="USD" />
            <link itemProp="availability" href="https://schema.org/InStock" />
            <link itemProp="url" href="https://premierpartycruises.com/bachelor-party-austin" />
          </div>
        </div>
        
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Disco King Package - Bachelor Party Lake Travis</h3>
          <meta itemProp="price" content="95.00" />
          <meta itemProp="priceCurrency" content="USD" />
          <p itemProp="description">$95 per person Disco King bachelor party package on Lake Travis party boat Austin. Private Cooler with Ice and Storage Bin for Your Group. Reserved Spot for Your Group. Disco Visor and Disco Ball Necklace for the Groom. Complimentary Direct-to-Boat Alcohol and Lunch Delivery. 25% Discount on Round-Trip Transportation. $50-$100 Voucher for Airbnb Booze Delivery. Most Popular bachelor party Austin package!</p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content="95.00" />
            <meta itemProp="priceCurrency" content="USD" />
            <link itemProp="availability" href="https://schema.org/InStock" />
            <link itemProp="url" href="https://premierpartycruises.com/bachelor-party-austin" />
          </div>
        </div>
        
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Super Sparkle Platinum Disco - Ultimate Bachelor Party Austin</h3>
          <meta itemProp="price" content="105.00" />
          <meta itemProp="priceCurrency" content="USD" />
          <p itemProp="description">$105 per person Platinum bachelor party Lake Travis package. Everything in the Disco King Package. Personal Unicorn Float for the Groom. Mimosa Setup with Champagne Flutes, 3 Juices, and a Chambong! $100 Voucher for Airbnb Concierge Services. Towel Service and SPF-50 Spray Sunscreen Provided. Nothing to Carry, Cooler Stocked with drinks When You Arrive! Ultimate all-inclusive Austin bachelor party luxury on Lake Travis party boat.</p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content="105.00" />
            <meta itemProp="priceCurrency" content="USD" />
            <link itemProp="availability" href="https://schema.org/InStock" />
            <link itemProp="url" href="https://premierpartycruises.com/bachelor-party-austin" />
          </div>
        </div>
        
        {/* What's Included - Bachelor Party Austin */}
        <h3>What's Included in Every Bachelor Party Austin Package</h3>
        <ul>
          <li>Professional DJ Playing your favorites ALL DAY - bachelor party starts when you arrive on Lake Travis party boat</li>
          <li>Professional Photographer - Capture every epic bachelor party Austin moment with high-quality photos sent after</li>
          <li>Private Cooler with Ice - Your bachelor group's own cooler, fully stocked with ice on Lake Travis</li>
          <li>Mimosa Supplies - Juice, fresh fruit - just add champagne for your bachelor party Austin</li>
          <li>Multiple Lily Pad Floats - 3 huge 6x20' floats to lounge in style on Lake Travis party boat</li>
          <li>Party Supplies - Cups, koozies, name tags, bubbles - all included for bachelor party Austin!</li>
          <li>Ice Water Stations - Stay hydrated with unlimited ice water on Lake Travis</li>
          <li>Clean Restroom - Full restroom facilities on board our bachelor party boat</li>
          <li>Plenty of Shade - Covered areas to escape the Texas sun during your Lake Travis bachelor party</li>
        </ul>
        
        {/* Private Cruise Options for Bachelor Party Austin */}
        <h3>Private Bachelor Party Cruises on Lake Travis</h3>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelor Party Cruise 14 Guests - Lake Travis</h4>
          <p itemProp="description">Private bachelor party boat for up to 14 guests on Lake Travis. Monday-Thursday from $1,050, Friday from $1,181, Saturday from $1,838, Sunday from $1,313. Exclusive private charter for your bachelor party Austin group.</p>
        </div>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelor Party Cruise 25 Guests - Lake Travis Party Boat</h4>
          <p itemProp="description">Private Lake Travis party boat for 15-25 bachelor party guests. Monday-Thursday from $1,181, Friday from $1,313, Saturday from $1,969, Sunday from $1,444. Perfect size for bachelor party Austin celebrations.</p>
        </div>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelor Party Cruise 30 Guests - Austin Party Boat</h4>
          <p itemProp="description">Lake Travis bachelor party boat for 26-30 guests. Monday-Thursday from $1,381, Friday from $1,513, Saturday from $2,169, Sunday from $1,644. Ideal for larger bachelor party Austin groups.</p>
        </div>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelor Party Cruise 50 Guests - Large Lake Travis Boat</h4>
          <p itemProp="description">Large bachelor party boat Lake Travis for 31-50 guests. Monday-Thursday from $1,313, Friday from $1,444, Saturday from $2,100, Sunday from $1,575. Spacious Lake Travis party boat for big bachelor party Austin celebrations.</p>
        </div>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelor Party Cruise 75 Guests - Mega Lake Travis Party Boat</h4>
          <p itemProp="description">Mega bachelor party boat on Lake Travis for 51-75 guests. Monday-Thursday from $1,613, Friday from $1,744, Saturday from $2,400, Sunday from $1,875. Largest Lake Travis party boat option for massive bachelor party Austin events.</p>
        </div>
        
        {/* Keywords Integration */}
        <p>Looking for the ultimate bachelor party Austin experience? Our Lake Travis party boat cruises offer the best bachelor party packages in Austin. Whether you choose our affordable ATX Disco Cruise bachelor party or a private Lake Travis bachelor party boat charter, we guarantee an unforgettable celebration. Book your bachelor party Austin today on our premier Lake Travis party boat!</p>
      </div>

      {/* JSON-LD Structured Data for Bachelor Party Services */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://premierpartycruises.com/bachelor-party-austin/#service",
          "name": "Bachelor Party Boat Cruises on Lake Travis",
          "provider": {
            "@id": "https://premierpartycruises.com/#organization"
          },
          "areaServed": ["Austin TX", "Texas", "United States"],
          "description": "Exclusive bachelor party cruises on Lake Travis featuring ATX Disco Cruise packages with BYOB options, professional DJ, professional photographer, giant floats, and all-inclusive party amenities. Austin's premier bachelor party boat experience.",
          "offers": [
            {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "85.00",
              "name": "Basic Bach Package",
              "description": "Join the BEST Party on Lake Travis, Exclusively for Bach Parties! BYOB, shared cooler with ice, alcohol and lunch delivery available. ALWAYS cheaper than a private cruise.",
              "url": "https://premierpartycruises.com/bachelor-party-austin",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "95.00",
              "name": "Disco King Package",
              "description": "Private Cooler with Ice & Storage Bin for Your Group. Reserved Spot. Disco Visor & Disco Ball Necklace for the Groom. Complimentary Direct-to-Boat Alcohol & Lunch Delivery. 25% Discount on Round-Trip Transportation.",
              "url": "https://premierpartycruises.com/bachelor-party-austin",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "105.00",
              "name": "Super Sparkle Platinum Disco",
              "description": "Everything in Disco King Package. Personal Unicorn Float for the Groom. Mimosa Setup with Champagne Flutes, 3 Juices & Chambong. $100 Voucher for Airbnb Concierge Services. Towel Service & SPF-50 Spray Sunscreen. Nothing to Carry, Cooler Stocked When You Arrive!",
              "url": "https://premierpartycruises.com/bachelor-party-austin",
              "availability": "https://schema.org/InStock"
            }
          ]
        })
      }} />

      {/* Related Links */}
      <RelatedLinks 
        blogLinks={[
          { title: 'Lake Travis Bachelor Party Boat Rentals: The Ultimate Guide', href: '/blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations' },
          { title: 'Creative Lake Travis Boat Party Themes', href: '/blogs/creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations' },
          { title: 'Perfect Itinerary for a Bachelor Party in Austin', href: '/blogs/perfect-bachelor-party-itinerary-austin' }
        ]}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
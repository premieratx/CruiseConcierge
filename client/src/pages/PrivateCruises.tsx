import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import ExperienceCards from '@/components/ExperienceCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Ship, Users, Star, Calendar, Trophy, Shield, Award,
  MessageSquare, Quote, Volume2, 
  Calculator, FileCheck, CreditCard, PersonStanding,
  ChefHat, Wifi, Bluetooth, Building,
  UserCheck, Target, Headphones, Check, Sparkles,
  Waves, Wine, Umbrella, Music, Clock,
  Package, Gift, Heart, Crown, Anchor, PartyPopper, ArrowRight, X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import SEOHead from '@/components/SEOHead';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { formatCurrency } from '@shared/formatters';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { 
  PRIVATE_CRUISE_PACKAGES, 
  PRIVATE_CRUISE_PRICING,
  PRIVATE_CAPACITY_TIERS, 
  PACKAGE_COMPARISON_FEATURES,
  BOATS,
  CREW_FEES,
  DISCO_PRICING,
  ADDON_FEES,
  HOURLY_RATES
} from '@shared/constants';

// Hero and gallery images 
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/atx-disco-cruise-party.jpg';
import heroImage3 from '@assets/dancing-party-scene.jpg';
import galleryImage1 from '@assets/party-atmosphere-1.jpg';
import galleryImage2 from '@assets/party-atmosphere-2.jpg';
import galleryImage3 from '@assets/party-atmosphere-3.jpg';

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

// Fleet capacity options for display
const fleetCapacities = [
  { 
    capacity: `${BOATS.DAY_TRIPPER.capacity}-person`, 
    name: BOATS.DAY_TRIPPER.displayName, 
    subtitle: BOATS.DAY_TRIPPER.description,
    maxCapacity: BOATS.DAY_TRIPPER.capacity
  },
  { 
    capacity: `${BOATS.ME_SEEKS_THE_IRONY.seatingCapacity}-${BOATS.ME_SEEKS_THE_IRONY.capacity} person`, 
    name: BOATS.ME_SEEKS_THE_IRONY.displayName, 
    subtitle: BOATS.ME_SEEKS_THE_IRONY.description,
    maxCapacity: BOATS.ME_SEEKS_THE_IRONY.capacity
  },
  { 
    capacity: `${BOATS.CLEVER_GIRL.seatingCapacity}-${BOATS.CLEVER_GIRL.capacity} person`, 
    name: BOATS.CLEVER_GIRL.displayName, 
    subtitle: BOATS.CLEVER_GIRL.description,
    maxCapacity: BOATS.CLEVER_GIRL.capacity
  }
];

// Pricing breakdown components
const pricingFeatures = [
  {
    icon: Calculator,
    title: 'Transparent Pricing',
    description: 'Hourly rate × duration = base cost. No hidden fees or surprise charges.'
  },
  {
    icon: PersonStanding,
    title: 'Extra Crew Fee',
    description: `26-30 people: +$${CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA / 100}/hour. 51-75 people: +$${CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA / 100}/hour for enhanced service & safety.`
  },
  {
    icon: FileCheck,
    title: 'Tax & Gratuity',
    description: '8.25% tax added. Suggested 20% gratuity for exceptional crew service.'
  },
  {
    icon: CreditCard,
    title: 'Flexible Deposits',
    description: '25% deposit if >30 days out. Full payment required if <30 days from cruise.'
  }
];

// Why choose Premier Party Cruises
const whyChooseUs = [
  {
    icon: Trophy,
    title: '14+ Years Experience',
    description: 'Austin\'s longest-running party cruise company with unmatched Lake Travis expertise.'
  },
  {
    icon: UserCheck,
    title: '125,000+ Happy Customers',
    description: 'We\'ve created unforgettable memories for over 125,000 guests with 5-star service.'
  },
  {
    icon: Shield,
    title: 'Perfect Safety Record',
    description: 'Coast Guard certified captains and pristine safety record ensure your peace of mind.'
  },
  {
    icon: Star,
    title: 'Newest Fleet',
    description: 'Austin\'s newest and nicest boats with premium amenities and sound systems.'
  },
  {
    icon: Headphones,
    title: 'Full-Service Experience',
    description: 'Professional crew, premium sound, coolers, ice, and all amenities included.'
  },
  {
    icon: Target,
    title: 'Custom Experiences',
    description: 'Tailored packages for any celebration - corporate events, weddings, birthday parties, anniversaries.'
  }
];

// Testimonials for private cruises
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Corporate Event Planner',
    rating: 5,
    text: 'Premier Party Cruises made our company retreat absolutely unforgettable. The 50-person yacht was perfect, the crew was professional, and the experience exceeded all expectations. Our team is still talking about it!',
    event: 'Corporate Retreat',
    groupSize: 45,
    image: '/testimonials/sarah.jpg'
  },
  {
    id: 2,
    name: 'Michael & Jennifer Chen',
    role: 'Newlyweds',
    rating: 5,
    text: 'Our wedding reception cruise on Lake Travis was magical. The sunset views, professional service, and attention to detail made our special day perfect. Worth every penny!',
    event: 'Wedding Reception',
    groupSize: 75,
    image: '/testimonials/chen.jpg'
  },
  {
    id: 3,
    name: 'David Rodriguez',
    role: 'Birthday Celebration',
    rating: 5,
    text: 'Booked the 25-person pontoon for my 40th birthday and it was incredible. The crew went above and beyond, the boat was immaculate, and the Lake Travis experience was unforgettable.',
    event: '40th Birthday Party',
    groupSize: 22,
    image: '/testimonials/david.jpg'
  }
];

// FAQ data with corrected content
const faqData = [
  {
    question: "What's included?",
    answer: 'Licensed, experienced captain & crew, premium Bluetooth sound, coolers with ice, restrooms, sun & shade seating, and safety equipment.'
  },
  {
    question: 'Can we bring food and drinks?',
    answer: 'Yes. BYOB (21+), cans/plastic only; bring snacks or meals. We provide coolers with ice and cups.'
  },
  {
    question: 'How do deposits and payments work?',
    answer: '25% deposit if >30 days out (balance due 30 days prior). If booking within 30 days, 50% deposit due and remainder within 72 hours.'
  },
  {
    question: 'What\'s your cancellation policy?',
    answer: "48-hour full refund window after booking. After that, cancellations are weather-dependent at the captain's discretion. Pro-rated refunds if weather shortens the cruise."
  },
  {
    question: 'Is swimming allowed?',
    answer: "Yes, when conditions are safe and at the captain's discretion. Life jackets required in the water."
  },
  {
    question: 'What about life jackets?',
    answer: 'Adult life jackets are provided. Infant/child life jackets must be brought by guests.'
  }
];

export default function PrivateCruises() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
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

  const handleGetQuote = () => {
    // Navigate to chat for instant quote
    navigate('/chat?cruiseType=private');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/private-cruises"
        defaultTitle="Private Boat Rentals | Lake Travis Austin"
        defaultDescription="Private Lake Travis boat charters for 14-75 guests. Professional crews, perfect for events, weddings & celebrations. Book today!"
        defaultKeywords={[
          'private cruise austin',
          'boat rental lake travis',
          'private party boat austin',
          'lake travis charter boat',
          'austin boat rental private',
          'corporate boat rental austin',
          'wedding boat charter lake travis',
          'private yacht rental austin'
        ]}
      />
      <ClientOnly><PublicNavigation /></ClientOnly>
      
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
                alt="Private cruise Lake Travis - Premier party boat with professional crew and premium amenities"
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
            <motion.div variants={fadeInUp} className="mb-8">
              <Ship className="h-20 w-20 text-brand-yellow mx-auto mb-8" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-8 leading-tight"
              data-editable data-editable-id="private-hero-title"
            >
              EVERYTHING SET UP
              <span className="block text-brand-yellow">WHEN YOU ARRIVE</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed"
              data-editable data-editable-id="private-hero-subtitle"
            >
              <span className="text-brand-yellow font-bold">Choose Your Perfect Package.</span> From basic cruising to ultimate party experiences, 
              we handle all the setup so you can focus on making memories. Professional crew, premium amenities, 
              and everything scaled perfectly for your group size.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-20"
            >
              <Button
                size="lg"
                asChild
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 transition-all duration-300 hover:scale-105 whitespace-normal min-h-[3.5rem] sm:min-h-[4rem]"
                data-testid="button-book-private-cruise"
              >
                <Link href="/chat" className="flex items-center justify-center">
                  <Calendar className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="text-center leading-tight">BOOK YOUR PRIVATE CRUISE</span>
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleGetQuote}
                className="border-white text-white hover:bg-white hover:text-black font-bold text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 transition-all duration-300 hover:scale-105 whitespace-normal min-h-[3.5rem] sm:min-h-[4rem]"
                data-testid="button-get-instant-quote"
              >
                <MessageSquare className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                <span className="text-center leading-tight">GET INSTANT QUOTE</span>
              </Button>
            </motion.div>

            {/* Key selling points */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto text-center"
            >
              {[
                { icon: Package, text: '3 Package Levels', subtext: 'Standard • Essentials • Ultimate' },
                { icon: Users, text: '5 Capacity Options', subtext: '14 • 25 • 30 • 50 • 75 Person Boats' },
                { icon: Clock, text: 'No Setup Required', subtext: 'Everything ready when you arrive' },
                { icon: Wine, text: 'Alcohol Delivery', subtext: 'Convenient party planning' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center p-4">
                  <item.icon className="h-10 w-10 sm:h-12 sm:w-12 text-brand-yellow mb-3 sm:mb-4 flex-shrink-0" />
                  <div className="font-bold text-sm sm:text-base mb-2">{item.text}</div>
                  <div className="text-xs sm:text-sm text-gray-200">{item.subtext}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-900 dark:text-white text-base md:text-lg font-semibold">
              <span className="text-brand-blue">14-75 Guests</span> • Professional Crew • <span className="text-brand-blue">Everything Ready</span>
            </p>
          </div>
        </div>
      </section>

      {/* Build My Quote Now Section */}
      <section className="py-16 bg-gradient-to-br from-brand-blue via-purple-600 to-blue-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 
              className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-6 text-white tracking-wider px-4"
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
              Get instant pricing for your Lake Travis celebration in minutes
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

      {/* Comprehensive Package Showcase */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              CHOOSE YOUR PERFECT PACKAGE
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              From basic cruising to ultimate party experiences - every capacity, every celebration, everything perfectly scaled for your group.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-8 text-lg"
            >
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-brand-blue" />
                <span className="font-semibold">Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-brand-blue" />
                <span className="font-semibold">Essentials</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6 text-brand-blue" />
                <span className="font-semibold">Ultimate</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Tabbed Capacity Interface */}
          <div className="relative">
            <Tabs defaultValue="experiences" className="w-full">
              {/* Sticky Tab Navigation */}
              <div className="sticky top-16 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 py-6 mb-8">
                <div className="container mx-auto px-6">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 lg:max-w-5xl lg:mx-auto bg-transparent p-0">
                    <TabsTrigger 
                      value="experiences" 
                      className="flex flex-col items-center gap-2 py-4 px-3 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-blue/50 hover:shadow-md transition-all duration-200 data-[state=active]:border-brand-blue data-[state=active]:bg-brand-blue data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105"
                    >
                      <PartyPopper className="h-5 w-5" />
                      <span className="font-bold">Experiences</span>
                      <span className="text-xs opacity-80">All Events</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="14" 
                      className="flex flex-col items-center gap-2 py-4 px-3 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-blue/50 hover:shadow-md transition-all duration-200 data-[state=active]:border-brand-blue data-[state=active]:bg-brand-blue data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105"
                    >
                      <Ship className="h-5 w-5" />
                      <span className="font-bold">Up to 14</span>
                      <span className="text-xs opacity-80">Day Tripper</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="25" 
                      className="flex flex-col items-center gap-2 py-4 px-3 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-blue/50 hover:shadow-md transition-all duration-200 data-[state=active]:border-brand-blue data-[state=active]:bg-brand-blue data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105"
                    >
                      <Ship className="h-5 w-5" />
                      <span className="font-bold">15-30 People</span>
                      <span className="text-xs opacity-80">Me Seeks The Irony</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="50" 
                      className="flex flex-col items-center gap-2 py-4 px-3 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-blue/50 hover:shadow-md transition-all duration-200 data-[state=active]:border-brand-blue data-[state=active]:bg-brand-blue data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105"
                    >
                      <Ship className="h-5 w-5" />
                      <span className="font-bold">31-75 People</span>
                      <span className="text-xs opacity-80">Clever Girl</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="disco" 
                      className="flex flex-col items-center gap-2 py-4 px-3 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-yellow/50 hover:shadow-md transition-all duration-200 data-[state=active]:border-brand-yellow data-[state=active]:bg-brand-yellow data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:scale-105"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span className="font-bold">ATX Disco Cruise</span>
                      <span className="text-xs opacity-80">ATX Disco</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              {/* Experiences Tab - First tab showing all experience types */}
              <TabsContent value="experiences" className="mt-0">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Curated Experiences for Every Occasion
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                      From elegant wedding celebrations to corporate team building, discover our premium private cruise experiences designed for your special moments.
                    </p>
                  </motion.div>
                  <ExperienceCards />
                </div>
              </TabsContent>

              {/* Tab Content */}
              {PRIVATE_CAPACITY_TIERS.map((capacity) => {
                const tierData = PRIVATE_CRUISE_PACKAGES[capacity];
                return (
                  <TabsContent key={capacity} value={capacity.toString()} className="mt-0">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={staggerChildren}
                      className="mb-16"
                >
                  {/* Capacity Tier Header */}
                  <motion.div variants={fadeInUp} className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Ship className="h-8 w-8 text-brand-blue" />
                      <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
                        {capacity}-Person {tierData.boatName}
                      </h3>
                      <Ship className="h-8 w-8 text-brand-blue" />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                      {tierData.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-brand-blue/10 px-4 py-2 rounded-full">
                      <Users className="h-4 w-4 text-brand-blue" />
                      <span className="text-sm font-semibold text-brand-blue">
                        Up to {capacity} people • {tierData.seatingCapacity} comfortable seats
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Package Cards */}
                  <motion.div
                    variants={staggerChildren}
                    className="grid md:grid-cols-3 gap-8"
                  >
                    {Object.entries(tierData.packages).map(([packageType, packageData], index) => (
                      <motion.div key={packageType} variants={fadeInUp}>
                        <Card className={`h-full hover:shadow-xl transition-all duration-300 ${
                          packageType === 'ultimate' 
                            ? 'border-2 border-brand-yellow bg-gradient-to-br from-brand-yellow/5 to-brand-blue/5' 
                            : packageType === 'essentials'
                            ? 'border-2 border-brand-blue/50'
                            : 'border border-gray-200 dark:border-gray-700'
                        }`}>
                          <CardContent className="p-6">
                            {/* Package Header */}
                            <div className="text-center mb-6">
                              <div className="flex items-center justify-center mb-3">
                                {packageType === 'standard' && <Package className="h-8 w-8 text-brand-blue" />}
                                {packageType === 'essentials' && <Gift className="h-8 w-8 text-brand-blue" />}
                                {packageType === 'ultimate' && <Crown className="h-8 w-8 text-brand-yellow" />}
                              </div>
                              {packageType === 'ultimate' && (
                                <Badge className="mb-2 bg-brand-yellow text-black font-bold">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  MOST POPULAR
                                </Badge>
                              )}
                              <h4 className="text-xl font-heading font-bold mb-2">
                                {packageData.name}
                              </h4>
                              <p className="text-brand-blue font-semibold mb-2">
                                {packageData.tagline}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                {packageData.description}
                              </p>
                            </div>
                            
                            {/* Value Proposition */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                              <div className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {packageData.valueProposition}
                                </p>
                              </div>
                            </div>
                            
                            {/* Inclusions */}
                            <div className="mb-6">
                              <h5 className="font-semibold mb-3 flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                What's Included
                              </h5>
                              <ul className="space-y-2">
                                {packageData.inclusions.map((inclusion: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                    <span>{inclusion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Highlights */}
                            <div className="mb-6">
                              <h5 className="font-semibold mb-3 flex items-center gap-2">
                                <Star className="h-4 w-4 text-brand-blue" />
                                Key Highlights
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {packageData.highlights.map((highlight: string, idx: number) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            {/* Ideal For */}
                            <div className="mb-6">
                              <h5 className="font-semibold mb-3 flex items-center gap-2">
                                <Heart className="h-4 w-4 text-red-500" />
                                Perfect For
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {packageData.ideal_for.map((use: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {use}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            {/* CTA */}
                            <Button
                              className={`w-full font-semibold ${
                                packageType === 'ultimate'
                                  ? 'bg-brand-yellow hover:bg-brand-yellow/90 text-black'
                                  : 'bg-brand-blue hover:bg-brand-blue/90 text-white'
                              }`}
                              data-testid={`button-select-${packageType}-${capacity}`}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Choose {packageData.name.split(' ')[0]} Package
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </TabsContent>
            );
          })}

          {/* Special Disco Cruise Tab */}
              <TabsContent value="disco" className="mt-0">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerChildren}
                  className="mb-16"
                >
                  <motion.div variants={fadeInUp} className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Sparkles className="h-8 w-8 text-brand-yellow" />
                      <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
                        ATX Disco Cruise Experience
                      </h3>
                      <Sparkles className="h-8 w-8 text-brand-yellow" />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                      Join Austin's most epic floating dance party with professional DJ, photography, and party atmosphere guaranteed!
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-brand-yellow/20 px-4 py-2 rounded-full">
                      <Users className="h-4 w-4 text-brand-yellow" />
                      <span className="text-sm font-semibold text-brand-yellow">
                        Up to 100 people • Bachelor/Bachelorette parties only
                      </span>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
                    <Card className="border-2 border-brand-yellow bg-gradient-to-br from-brand-yellow/10 to-brand-blue/5">
                      <CardContent className="p-8">
                        <div className="text-center mb-8">
                          <h4 className="text-2xl font-heading font-bold mb-4">
                            Ready to Party? Let's Make It Epic!
                          </h4>
                          <p className="text-lg text-gray-600 dark:text-gray-300">
                            Bachelor and bachelorette parties can choose between our signature disco cruise experience 
                            or a private cruise tailored to your group size.
                          </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="text-center p-6 bg-brand-yellow/10 rounded-lg">
                            <Sparkles className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
                            <h5 className="text-xl font-bold mb-2">Disco Cruise</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                              Join other bachelor/bachelorette parties on Austin's most epic floating dance party
                            </p>
                            <div className="text-brand-yellow font-bold text-lg">
                              $${DISCO_PRICING.basic / 100}-$${DISCO_PRICING.platinum / 100} per person
                            </div>
                          </div>
                          
                          <div className="text-center p-6 bg-brand-blue/10 rounded-lg">
                            <Ship className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                            <h5 className="text-xl font-bold mb-2">Private Cruise</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                              Have the entire boat to yourselves with customized experience
                            </p>
                            <div className="text-brand-blue font-bold text-lg">
                              From $${Math.floor(HOURLY_RATES.MON_THU[14] / 100 / 4)} per person
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <Button 
                            size="lg"
                            className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                            onClick={() => window.location.href = '/bachelor-party'}
                          >
                            <PartyPopper className="h-5 w-5 mr-2" />
                            Explore Bachelor/Bachelorette Options
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Convenience & Value Proposition Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue/5 to-brand-yellow/5 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              EVERYTHING SET UP
              <span className="block text-brand-blue">WHEN YOU ARRIVE</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
            >
              No hassle, no setup, no worries. We handle every detail so you can focus on what matters most - 
              making incredible memories with the people you care about.
            </motion.p>
          </motion.div>

          {/* Convenience Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {[
              {
                icon: Clock,
                title: "No Setup Required",
                description: "Professional crew handles all setup and breakdown. You just show up and start partying!",
                highlight: "Zero Prep Time"
              },
              {
                icon: Wine,
                title: "Alcohol Delivery Service",
                description: "We can coordinate alcohol delivery directly to your boat. Ultimate convenience for party planning!",
                highlight: "Direct to Boat"
              },
              {
                icon: Anchor,
                title: "Professional Captain",
                description: "Experienced, Coast Guard certified captains handle all navigation while you celebrate.",
                highlight: "14+ Years Experience"
              },
              {
                icon: Sparkles,
                title: "Premium Everything",
                description: "From disco balls to giant floats - everything is premium quality and ready to use.",
                highlight: "No Compromises"
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-brand-blue/30">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <feature.icon className="h-16 w-16 text-brand-blue mx-auto mb-4" />
                      <Badge variant="secondary" className="mb-2">{feature.highlight}</Badge>
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Alcohol Delivery Service Highlight */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-brand-yellow/10 to-brand-blue/10 border-2 border-brand-yellow/50 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-6">
                  <Wine className="h-12 w-12 text-brand-blue mr-4" />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                      Alcohol Delivery Service Available
                    </h3>
                    <p className="text-brand-blue font-semibold">Ultimate Party Planning Convenience</p>
                  </div>
                  <Wine className="h-12 w-12 text-brand-blue ml-4" />
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Skip the liquor store runs! We can coordinate with local delivery services to have your 
                  beverages waiting on your boat when you arrive. Beer, wine, cocktail supplies - 
                  everything perfectly chilled and ready for your celebration.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">Pre-chilled beverages</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">Delivered to your boat</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">No extra hassle for you</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/chat?cruiseType=private&service=alcohol-delivery')}
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-8 py-3"
                  data-testid="button-alcohol-delivery-info"
                >
                  <Wine className="mr-2 h-4 w-4" />
                  Learn About Alcohol Delivery
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Professional Setup & Service Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              PROFESSIONAL SETUP & SERVICE
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Our experienced crew transforms your boat into the perfect party venue before you even step aboard.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Service Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-8"
            >
              {[
                {
                  icon: Headphones,
                  title: "Premium Sound System Setup",
                  description: "Professional-grade Bluetooth speakers positioned perfectly for your celebration",
                  features: ["Crystal clear audio", "Bass that gets everyone moving", "Seamless phone connectivity"]
                },
                {
                  icon: Waves,
                  title: "Party Floats & Entertainment",
                  description: "Giant lily pads, specialty floats, and disco balls installed and ready",
                  features: ["20-foot lily pad floats", "Unicorn floats for VIPs", "Disco balls for atmosphere"]
                },
                {
                  icon: Umbrella,
                  title: "Comfort & Convenience",
                  description: "Tables, seating, sunscreen, and all amenities perfectly arranged",
                  features: ["Folding tables positioned", "Coolers stocked with ice", "Sun protection provided"]
                },
                {
                  icon: Shield,
                  title: "Safety & Peace of Mind",
                  description: "Coast Guard certified captains and pristine safety equipment",
                  features: ["14+ years experience", "Perfect safety record", "Local Lake Travis expertise"]
                }
              ].map((service, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-brand-blue" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center"
            >
              <Card className="p-8 bg-gradient-to-br from-brand-blue/5 to-brand-yellow/5 border-2 border-brand-blue/20">
                <CardContent className="pt-6">
                  <Trophy className="h-20 w-20 text-brand-blue mx-auto mb-6" />
                  <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
                    Austin's Most Trusted
                  </h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="font-semibold">Years in Business</span>
                      <span className="text-brand-blue font-bold">14+ Years</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="font-semibold">Happy Customers</span>
                      <span className="text-brand-blue font-bold">125,000+</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="font-semibold">Safety Record</span>
                      <span className="text-green-500 font-bold">Perfect</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-semibold">Fleet Quality</span>
                      <span className="text-brand-blue font-bold">Austin's Newest</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => navigate('/chat?cruiseType=private')}
                    className="w-full mt-6 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold"
                    data-testid="button-trust-quote"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Experience The Difference
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Transparency Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              TRANSPARENT PRICING
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              No hidden fees or surprise charges. Here's exactly how our pricing works.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pricingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center"
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <feature.icon className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Example Pricing Breakdown */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 bg-white dark:bg-gray-800">
              <h3 className="text-2xl font-heading font-bold mb-6 text-center text-gray-900 dark:text-white">
                Example: 25-Person Weekend Cruise (4 Hours)
              </h3>
              
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Base Rate (4 hours × $340/hr)</span>
                  <span className="font-bold">{formatCurrency(1360)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Extra Crew Fee (25 people)</span>
                  <span className="font-bold">{formatCurrency(200)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-bold">{formatCurrency(1560)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Tax (8.25%)</span>
                  <span className="font-bold">{formatCurrency(129)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Suggested Gratuity (20%)</span>
                  <span className="font-bold">{formatCurrency(312)}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t-2 border-brand-blue text-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-brand-blue">{formatCurrency(2001)}</span>
                </div>
                <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                  = {formatCurrency(Math.round(2001 / 25))} per person
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  onClick={() => navigate('/chat?cruiseType=private')}
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-8 py-3"
                  data-testid="button-open-calculator"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Get Your Custom Quote
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Premier Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              WHY CHOOSE PREMIER
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Austin's most trusted and experienced party cruise company delivers exceptional experiences every time.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center group"
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-brand-blue/50">
                  <reason.icon className="h-16 w-16 text-brand-blue mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {reason.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              HAPPY CUSTOMERS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Read what our satisfied customers say about their private cruise experiences.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                data-testid={`testimonial-${testimonial.id}`}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-1 mr-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                      {testimonial.event}
                    </Badge>
                  </div>
                  
                  <Quote className="h-8 w-8 text-brand-blue mb-4 opacity-50" />
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-brand-blue">{testimonial.groupSize} guests</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white"
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Get answers to common questions about private cruise bookings and experiences.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg px-6 border-none"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:text-brand-blue transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <PartyPlanningChecklist partyType="Private Cruise" eventType="private charter" />

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-yellow text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-bold mb-8"
            >
              READY TO CRUISE?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 leading-relaxed"
            >
              Book your exclusive private Lake Travis experience today. 
              Our team is ready to create the perfect celebration for your group.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button
                size="lg"
                asChild
                className="bg-white text-brand-blue hover:bg-gray-100 font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-book-now-final"
              >
                <Link href="/chat">
                  <Calendar className="mr-3 h-6 w-6" />
                  BOOK NOW
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleGetQuote}
                className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-get-quote-final"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                GET CUSTOM QUOTE
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
              DISCOVER MORE AUSTIN PARTY EXPERIENCES
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our specialized Lake Travis party boat packages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/bachelor-party-austin" data-testid="link-bachelor-from-private">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelor Party Boats Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Epic bachelor party cruises on Lake Travis with DJ and photographer</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-from-private">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Austin Cruises</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Premier bachelorette party boats - ATX Disco Cruise</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/combined-bachelor-bachelorette-austin" data-testid="link-combined-from-private">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Combined Parties</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Bachelor and bachelorette together on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/party-boat-lake-travis" data-testid="link-party-boat-from-private">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Party Boat Lake Travis</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">All our Austin party boat options and fleet</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/client-entertainment" data-testid="link-client-entertainment-from-private">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Corporate Events</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Professional client entertainment on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery" data-testid="link-gallery-from-private">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Photo Gallery</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">View our private cruise photo gallery</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" data-testid="link-contact-from-private">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Get your custom private cruise quote</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/" data-testid="link-home-from-private">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Home</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Back to all party cruise services</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Hidden Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/Service">
        <h2>Private Cruise Charter Packages and Pricing - Lake Travis Austin</h2>
        
        {/* Fleet Information */}
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">{BOATS.DAY_TRIPPER.displayName} - 14 Person Boat</h3>
          <p itemProp="description">{BOATS.DAY_TRIPPER.description}. Perfect for intimate gatherings and small celebrations on Lake Travis.</p>
          <meta itemProp="category" content="Boat Charter" />
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">{BOATS.ME_SEEKS_THE_IRONY.displayName} - 25-30 Person Boat</h3>
          <p itemProp="description">{BOATS.ME_SEEKS_THE_IRONY.description}. Ideal for medium-sized celebrations and corporate events on Lake Travis.</p>
          <meta itemProp="category" content="Boat Charter" />
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">{BOATS.CLEVER_GIRL.displayName} - 50-75 Person Boat</h3>
          <p itemProp="description">{BOATS.CLEVER_GIRL.description}. Premium vessel for large celebrations, weddings, and corporate events on Lake Travis.</p>
          <meta itemProp="category" content="Boat Charter" />
        </div>

        {/* 14-Person Capacity Tier Pricing */}
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">14-Person Private Cruise Packages</h3>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Standard 4-Hour Cruise (14 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[14].packages.standard.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.standard.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[14].packages.standard.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Essentials Package (14 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[14].packages.essentials.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.essentials.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.essentials.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.essentials.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.essentials.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.essentials.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.essentials.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.essentials.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.essentials.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[14].packages.essentials.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Ultimate Disco Party Package (14 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[14].packages.ultimate.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.ultimate.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.ultimate.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.ultimate.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.ultimate.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.ultimate.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.ultimate.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.ultimate.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[14].packages.ultimate.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[14].packages.ultimate.inclusions.join(', ')}</p>
          </div>
        </div>

        {/* 25-Person Capacity Tier Pricing */}
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">25-Person Private Cruise Packages</h3>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Standard 4-Hour Cruise (25 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[25].packages.standard.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.standard.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.standard.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.standard.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.standard.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.standard.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.standard.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.standard.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.standard.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[25].packages.standard.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Essentials Package (25 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[25].packages.essentials.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.essentials.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.essentials.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.essentials.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.essentials.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.essentials.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.essentials.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.essentials.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.essentials.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[25].packages.essentials.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Ultimate Disco Party Package (25 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[25].packages.ultimate.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.ultimate.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.ultimate.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.ultimate.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.ultimate.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.ultimate.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.ultimate.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.ultimate.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[25].packages.ultimate.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[25].packages.ultimate.inclusions.join(', ')}</p>
          </div>
        </div>

        {/* 30-Person Capacity Tier Pricing */}
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">30-Person Private Cruise Packages (Extra Crew Required)</h3>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Standard 4-Hour Cruise (30 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[30].packages.standard.description} - Includes ${CREW_FEES.HOURLY_RATES.SMALL_BOAT_EXTRA / 100}/hour extra crew fee for enhanced service and safety.</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.standard.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.standard.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.standard.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.standard.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.standard.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.standard.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.standard.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.standard.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[30].packages.standard.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Essentials Package (30 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[30].packages.essentials.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.essentials.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.essentials.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.essentials.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.essentials.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.essentials.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.essentials.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.essentials.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.essentials.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[30].packages.essentials.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Ultimate Disco Party Package (30 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[30].packages.ultimate.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.ultimate.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.ultimate.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.ultimate.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.ultimate.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.ultimate.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.ultimate.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.ultimate.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[30].packages.ultimate.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[30].packages.ultimate.inclusions.join(', ')}</p>
          </div>
        </div>

        {/* 50-Person Capacity Tier Pricing */}
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">50-Person Private Cruise Packages</h3>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Standard 4-Hour Cruise (50 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[50].packages.standard.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.standard.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.standard.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.standard.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.standard.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.standard.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.standard.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.standard.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.standard.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[50].packages.standard.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Essentials Package (50 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[50].packages.essentials.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.essentials.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.essentials.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.essentials.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.essentials.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.essentials.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.essentials.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.essentials.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.essentials.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[50].packages.essentials.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Ultimate Disco Party Package (50 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[50].packages.ultimate.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.ultimate.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.ultimate.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.ultimate.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.ultimate.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.ultimate.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.ultimate.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.ultimate.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[50].packages.ultimate.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[50].packages.ultimate.inclusions.join(', ')}</p>
          </div>
        </div>

        {/* 75-Person Capacity Tier Pricing */}
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">75-Person Private Cruise Packages (Extra Crew Required)</h3>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Standard 4-Hour Cruise (75 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[75].packages.standard.description} - Includes ${CREW_FEES.HOURLY_RATES.LARGE_BOAT_EXTRA / 100}/hour extra crew fee for enhanced service and safety.</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.standard.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.standard.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.standard.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.standard.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.standard.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.standard.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.standard.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.standard.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[75].packages.standard.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Essentials Package (75 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[75].packages.essentials.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.essentials.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.essentials.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.essentials.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.essentials.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.essentials.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.essentials.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.essentials.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.essentials.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[75].packages.essentials.inclusions.join(', ')}</p>
          </div>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h4 itemProp="name">Ultimate Disco Party Package (75 guests)</h4>
            <p itemProp="description">{PRIVATE_CRUISE_PACKAGES[75].packages.ultimate.description}</p>
            <p>Monday-Thursday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.ultimate.totalPrices.MON_THU)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.ultimate.totalPrices.MON_THU)}</span></p>
            <p>Friday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.ultimate.totalPrices.FRIDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.ultimate.totalPrices.FRIDAY)}</span></p>
            <p>Saturday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.ultimate.totalPrices.SATURDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.ultimate.totalPrices.SATURDAY)}</span></p>
            <p>Sunday: <span itemProp="price" content={formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.ultimate.totalPrices.SUNDAY)}>{formatCurrency(PRIVATE_CRUISE_PRICING[75].packages.ultimate.totalPrices.SUNDAY)}</span></p>
            <meta itemProp="priceCurrency" content="USD" />
            <p>Includes: {PRIVATE_CRUISE_PACKAGES[75].packages.ultimate.inclusions.join(', ')}</p>
          </div>
        </div>

        {/* Additional Service Information */}
        <h2>Private Boat Charter Services - Lake Travis Austin TX</h2>
        <p>Premier Party Cruises offers exclusive private boat charters on Lake Travis, Austin, Texas. Our fleet includes the {BOATS.DAY_TRIPPER.displayName} (14-person capacity), {BOATS.ME_SEEKS_THE_IRONY.displayName} (25-30 person capacity), and {BOATS.CLEVER_GIRL.displayName} (50-75 person capacity). Each boat features professional Coast Guard certified captains, premium Bluetooth sound systems, clean restroom facilities, and ample seating areas with sun and shade options.</p>
        
        <h3>Package Options</h3>
        <p>Standard Package: Essential cruise experience with professional crew, premium sound system, coolers, and all basic amenities. Perfect for those who want to bring their own refreshments.</p>
        <p>Essentials Package: Everything from Standard plus pre-stocked ice coolers, fresh water dispenser, setup tables, and cups. Ideal for hassle-free entertaining.</p>
        <p>Ultimate Disco Party Package: Complete all-inclusive experience with giant lily pad floats, specialty floats, disco atmosphere, party supplies, champagne service, sun protection, and complete tableware. The ultimate celebration package.</p>
        
        <h3>Service Areas</h3>
        <p>Lake Travis private boat rentals, Austin boat charter services, corporate event cruises, wedding party boats, birthday celebration cruises, bachelor and bachelorette party boats, team building cruises, anniversary celebrations, Lake Travis boat tours, private yacht rental Austin.</p>
      </div>

      
      {/* JSON-LD Structured Data - Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "https://premierpartycruises.com/private-cruises/#service",
                    "name": "Private Party Boat Charters on Lake Travis",
                    "provider": {
                              "@id": "https://premierpartycruises.com/#organization"
                    },
                    "areaServed": [
                              "Austin TX",
                              "Texas",
                              "United States"
                    ],
                    "description": "Private 3–4 hour charters with licensed, experienced captain & crew, premium Bluetooth sound, coolers, restrooms, sun & shade seating. Adult life jackets provided; infant/child jackets must be brought by guests.",
                    "offers": [
                              {
                                        "@type": "Offer",
                                        "priceCurrency": "USD",
                                        "price": "200.00",
                                        "priceSpecification": {
                                                  "@type": "PriceSpecification",
                                                  "minPrice": 200
                                        },
                                        "url": "https://premierpartycruises.com/private-cruises",
                                        "availability": "https://schema.org/InStock",
                                        "name": "Base hourly (from)"
                              },
                              {
                                        "@type": "Offer",
                                        "priceCurrency": "USD",
                                        "price": "100.00",
                                        "url": "https://premierpartycruises.com/private-cruises",
                                        "name": "Essentials Add‑On (14p)"
                              },
                              {
                                        "@type": "Offer",
                                        "priceCurrency": "USD",
                                        "price": "150.00",
                                        "url": "https://premierpartycruises.com/private-cruises",
                                        "name": "Essentials Add‑On (25–30p)"
                              },
                              {
                                        "@type": "Offer",
                                        "priceCurrency": "USD",
                                        "price": "200.00",
                                        "url": "https://premierpartycruises.com/private-cruises",
                                        "name": "Essentials Add‑On (50–75p)"
                              },
                              {
                                        "@type": "Offer",
                                        "priceCurrency": "USD",
                                        "price": "250.00",
                                        "url": "https://premierpartycruises.com/private-cruises",
                                        "name": "Ultimate Disco Party (14p)"
                              },
                              {
                                        "@type": "Offer",
                                        "priceCurrency": "USD",
                                        "price": "300.00",
                                        "url": "https://premierpartycruises.com/private-cruises",
                                        "name": "Ultimate Disco Party (25–30p)"
                              },
                              {
                                        "@type": "Offer",
                                        "priceCurrency": "USD",
                                        "price": "350.00",
                                        "url": "https://premierpartycruises.com/private-cruises",
                                        "name": "Ultimate Disco Party (50–75p)"
                              },
                              {
                                        "@type": "Offer",
                                        "priceCurrency": "USD",
                                        "price": "50.00",
                                        "url": "https://premierpartycruises.com/private-cruises",
                                        "name": "Lily Pad Add‑On"
                              }
                    ],
                    "aggregateRating": {
                              "@type": "AggregateRating",
                              "ratingValue": "5.0",
                              "bestRating": "5",
                              "ratingCount": 300
                    }
          })
      }} />

      {/* Related Links */}
      <RelatedLinks 
        blogLinks={[
          { title: 'Complete Private Cruise Planning Guide', href: '/blogs/lake-travis-private-cruise-planning-guide' },
          { title: 'Choosing the Right Boat Size', href: '/blogs/choosing-boat-size-private-cruise' },
          { title: 'Private Cruise vs Disco Cruise', href: '/blogs/private-vs-disco-cruise-comparison' }
        ]}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
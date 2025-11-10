import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import YouTubeHeroEmbed from '@/components/YouTubeHeroEmbed';
import VideoGallerySection from '@/components/VideoGallerySection';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { formatCurrency } from '@shared/formatters';
import { PRICING_DEFAULTS } from '@shared/constants';
import SEOHead from '@/components/SEOHead';
import { SectionReveal } from '@/components/SectionReveal';
import { birthdayReviews } from '@shared/reviews-data';
import { 
  Cake, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, PartyPopper, Shield,
  Star, MessageSquare, Crown, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, Gift, Camera,
  Music, Wine, Heart, Trophy, Confetti, X
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Hero and gallery images
const heroImage1 = '/attached_assets/party-atmosphere-1.jpg';
const heroImage2 = '/attached_assets/party-atmosphere-2.jpg';
const heroImage3 = '/attached_assets/party-atmosphere-3.jpg';
const galleryImage1 = '/attached_assets/atx-disco-cruise-party.jpg';
const galleryImage2 = '/attached_assets/dancing-party-scene.jpg';
const galleryImage3 = '/attached_assets/clever-girl-50-person-boat.jpg';

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

const confettiAnimation = {
  hidden: { scale: 0, rotate: 0 },
  visible: {
    scale: [0, 1.2, 1],
    rotate: [0, 360],
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

// Milestone Birthday packages
const birthdayPackages = [
  {
    id: 'standard',
    name: 'Standard 4-Hour Cruise',
    basePrice: 200,
    description: 'Make this birthday unforgettable - Age in style on the water',
    features: [
      'Licensed, fun, experienced captains to take your group safely around the lake in style',
      '2 large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for up to 14 guests',
      'Plenty of sun & shade areas',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    popular: false,
    icon: Gift,
    badge: 'Great Value'
  },
  {
    id: 'essentials',
    name: 'Cruise w/Essentials Package',
    basePrice: 225,
    addOnPrice: 100,
    description: 'Milestone birthday with complete convenience',
    features: [
      'Everything from Standard Cruise',
      'Insulated 5-gallon dispenser with ice water',
      'Fresh water & solo cups',
      'Coolers pre-stocked with ice',
      '6-ft folding table for food & drinks',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Party Package',
    basePrice: 250,
    addOnPrice: 250,
    description: 'Unforgettable luxury milestone with entertainment and party supplies',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float (unicorn or ring)',
      'Disco ball cups for party vibes',
      'Bubble guns & bubble wands',
      'Champagne flutes & fruit juices',
      'SPF-50 spray sunscreen',
      'Plates, plasticware, & paper towels',
      'Disco balls installed for party atmosphere',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    popular: false,
    icon: Trophy,
    badge: 'VIP Experience'
  }
];

// Milestone ages and themes
const milestoneAges = [
  { age: 21, theme: 'Finally Legal', color: 'text-yellow-500' },
  { age: 30, theme: 'Dirty Thirty', color: 'text-orange-500' },
  { age: 40, theme: 'Fabulous Forty', color: 'text-red-500' },
  { age: 50, theme: 'Fabulous Fifty', color: 'text-purple-500' },
  { age: 60, theme: 'Sensational Sixty', color: 'text-blue-500' },
  { age: 'Custom', theme: 'Any Milestone', color: 'text-brand-blue' }
];

// What's included
const whatsIncluded = [
  {
    icon: Cake,
    title: 'Birthday Setup',
    description: 'Dedicated cake table and celebration area'
  },
  {
    icon: PartyPopper,
    title: 'Milestone Decorations',
    description: 'Age-specific banners and themed decor'
  },
  {
    icon: Camera,
    title: 'Photo Moments',
    description: 'Props and backdrops for milestone photos'
  },
  {
    icon: Music,
    title: 'Party Music',
    description: 'DJ or playlist from birthday person\'s era'
  },
  {
    icon: Wine,
    title: 'Toast Ready',
    description: 'Champagne service for milestone toasts'
  },
  {
    icon: Gift,
    title: 'Memory Making',
    description: 'Guest book and memory stations'
  },
  {
    icon: Heart,
    title: 'VIP Treatment',
    description: 'Special attention for birthday honoree'
  },
  {
    icon: Shield,
    title: 'Full Service',
    description: 'Professional crew handles everything'
  },
  {
    icon: Star,
    title: 'Surprise Support',
    description: 'Help coordinating surprise elements'
  }
];

// FAQs - corrected content
const faqItems = [
  {
    id: 'included',
    question: "What's included?",
    answer: 'Licensed, experienced captain & crew, premium Bluetooth sound, coolers with ice, restrooms, sun & shade seating, and safety equipment.'
  },
  {
    id: 'food-drinks',
    question: 'Can we bring food and drinks?',
    answer: 'Yes. BYOB (21+), cans/plastic only; bring snacks or meals. We provide coolers with ice and cups.'
  },
  {
    id: 'deposits-payments',
    question: 'How do deposits and payments work?',
    answer: 'If booking 14+ days before cruise: 25% deposit required, remaining balance due 14 days before cruise. If booking less than 14 days before cruise: 50% deposit required, remaining balance due within 48 hours of booking (or 3 days after booking).'
  },
  {
    id: 'cancellation',
    question: 'What\'s your cancellation policy?',
    answer: "48-hour full refund window after booking. After that, cancellations are weather-dependent at the captain's discretion. Pro-rated refunds if weather shortens the cruise."
  },
  {
    id: 'swimming',
    question: 'Is swimming allowed?',
    answer: "Yes, when conditions are safe and at the captain's discretion. Life jackets required in the water."
  },
  {
    id: 'life-jackets',
    question: 'What about life jackets?',
    answer: 'Adult life jackets are provided. Infant/child life jackets must be brought by guests.'
  }
];


export default function MilestoneBirthday() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [selectedAge, setSelectedAge] = useState(null);
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

  const handleGetQuote = () => {
    navigate('/chat?eventType=milestone-birthday');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=milestone-birthday&action=book');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead 
        pageRoute="/milestone-birthday"
        defaultTitle="Milestone Birthday | Lake Travis Cruises"
        defaultDescription="Celebrate 21st, 30th, 40th, 50th birthdays on Lake Travis! Decorations, photos, party packages. Make milestone memories!"
        defaultKeywords={[
          'milestone birthday cruise austin',
          '30th birthday party lake travis',
          '40th birthday boat rental',
          '50th birthday celebration austin',
          'birthday party cruise lake travis'
        ]}
      />

      <ClientOnly><PublicNavigation /></ClientOnly>

      {/* Hero Section with Crossfade */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden ">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/FABtEDZZBA0?autoplay=1&mute=1&loop=1&playlist=FABtEDZZBA0&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&playsinline=1"
            title="Premier Party Cruises Drone Video Background"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ border: 'none' }}
            data-testid="youtube-background-video"
          />
          {/* White Overlay for contrast - 75% opacity */}
          <div className="absolute inset-0 bg-white/75"></div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-6 flex-grow flex items-center">
          <motion.div 
            className="max-w-4xl mx-auto text-center w-full"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-6 py-3 text-base font-sans tracking-wider bg-blue-100 text-gray-900 border-blue-300 shadow-lg">
                <Cake className="mr-2 h-5 w-5" />
                Celebrate Life's Big Milestones
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-extrabold mb-6 text-center text-gray-900 drop-shadow-sm"
              variants={fadeInUp}
            >
              Milestone Birthday Celebrations
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8 font-bold drop-shadow-sm max-w-3xl mx-auto text-center"
              variants={fadeInUp}
            >
              Celebrate Life's Big Milestones
            </motion.p>

            <motion.div 
              className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-6 shadow-xl max-w-5xl mx-auto mb-8"
              variants={fadeInUp}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-900 font-semibold leading-relaxed">
                Make your milestone birthday unforgettable with a custom celebration 
                cruise on Lake Travis. 21st, 30th, 40th, 50th, and beyond!
              </p>
            </motion.div>

            {/* Milestone Age Selector */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-8"
              variants={fadeInUp}
            >
              {milestoneAges.map((milestone) => (
                <motion.button
                  key={milestone.age}
                  onClick={() => setSelectedAge(milestone.age)}
                  className={cn(
                    "px-4 py-2 rounded-full border-2 transition-all",
                    selectedAge === milestone.age
                      ? "bg-brand-yellow text-black border-brand-yellow"
                      : "bg-blue-100 text-gray-900 border-blue-300 hover:bg-blue-200"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-bold">
                    {milestone.age === 'Custom' ? milestone.age : `${milestone.age}th`}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-base sm:text-lg px-8 py-6 shadow-xl"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Plan Your Milestone
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-base sm:text-lg px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Packages
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Animated Confetti Icon */}
            <motion.div 
              className="absolute top-10 right-10 text-brand-yellow opacity-20"
              variants={confettiAnimation}
              initial="hidden"
              animate="visible"
            >
              <PartyPopper className="h-24 w-24" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/90 backdrop-blur-sm py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-base md:text-lg font-semibold">
              <span className="text-purple-600">21st • 30th • 40th • 50th</span> • Custom Packages • <span className="text-purple-600">Unforgettable Celebrations</span>
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
              className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white tracking-wider"
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
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-2xl px-16 py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                data-testid="button-build-quote"
              >
                <Sparkles className="mr-3 h-7 w-7" />
                <span data-editable data-editable-id="quote-builder-button">Start Building Your Quote</span>
                <ArrowRight className="ml-3 h-7 w-7" />
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

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Milestone Birthday Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package for your milestone celebration. 
              Every birthday deserves to be celebrated in style!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {birthdayPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "relative h-full hover:shadow-2xl transition-all duration-300",
                  pkg.popular && "border-2 border-brand-yellow shadow-xl scale-105"
                )}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-brand-yellow text-black font-bold px-4 py-1">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <pkg.icon className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-brand-blue">
                        {pkg.basePrice === 200 && '$1,050-$1,838'}
                        {pkg.basePrice === 225 && '$1,181-$1,969'}
                        {pkg.basePrice === 250 && '$1,413-$2,260'}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        for 4-hour cruise
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {pkg.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={handleGetQuote}
                      data-testid={`button-package-${pkg.id}`}
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Making Milestone Memories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need for an unforgettable milestone celebration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatsIncluded.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <item.icon className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Milestone Memories Made
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Check out our verified reviews on Google and Facebook to see what real birthday celebrants are saying about their milestone cruises on Lake Travis!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-lg px-10 py-6"
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
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-lg px-10 py-6"
              >
                <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer">
                  <Star className="mr-2 h-5 w-5" />
                  View Facebook Reviews
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Milestone Birthday FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about milestone birthday cruises
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem value={item.id} className="mb-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span className="font-semibold">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 pl-8">
                      <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Party Planning Checklist */}
      <PartyPlanningChecklist 
        partyType="Milestone Birthday"
        eventType="milestone birthday celebration"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-600">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Make Your Milestone Unforgettable
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Life's big birthdays deserve big celebrations. Let us help you create 
              a milestone birthday cruise that you'll remember forever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6 shadow-xl"
                data-testid="button-cta-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Planning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/contact')}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6"
                data-testid="button-cta-contact"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us: 512-488-5892
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Experiences Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Related Birthday Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our full range of birthday party boat experiences on Lake Travis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/sweet-16">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Sweet 16</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Teen birthday celebrations
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Sweet 16 Parties
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
              <Link href="/birthday-parties">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <PartyPopper className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Birthday Parties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      All birthday party options
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      View All Birthday Parties
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
              <Link href="/private-cruises">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Ship className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Private Cruises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Custom private charters
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Private Cruises
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hidden SEO Content - Crawlable but not visible */}
      <div className="sr-only" itemScope itemType="https://schema.org/Service">
        <h2>Milestone Birthday Party Cruise Austin - Lake Travis Birthday Boat Rental</h2>
        <p itemProp="description">
          Premier milestone birthday party cruises on Lake Travis for 21st, 30th, 40th, 50th, 60th birthdays and beyond. 
          Celebrate age milestones with private boat parties, DJ, decorations, and stunning lake views. Birthday boat rentals from 14-75 guests.
        </p>
        
        {/* Pricing Content for Crawlers */}
        <h3>Milestone Birthday Private Cruise Pricing - All Guest Capacities</h3>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">1-14 Guests Milestone Birthday Pricing</h4>
          <p>Monday-Thursday: Standard $800, Essentials $900, Ultimate $1,000</p>
          <p>Friday: Standard $900, Essentials $1,000, Ultimate $1,100</p>
          <p>Saturday: Standard $1,400, Essentials $1,500, Ultimate $1,600</p>
          <p>Sunday: Standard $1,000, Essentials $1,100, Ultimate $1,200</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">15-25 Guests Milestone Birthday Pricing</h4>
          <p>Monday-Thursday: Standard $900, Essentials $1,050, Ultimate $1,200</p>
          <p>Friday: Standard $1,000, Essentials $1,150, Ultimate $1,300</p>
          <p>Saturday: Standard $1,500, Essentials $1,650, Ultimate $1,800</p>
          <p>Sunday: Standard $1,100, Essentials $1,250, Ultimate $1,400</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">26-30 Guests Milestone Birthday Pricing</h4>
          <p>Monday-Thursday: Standard $1,050, Essentials $1,200, Ultimate $1,350</p>
          <p>Friday: Standard $1,150, Essentials $1,300, Ultimate $1,450</p>
          <p>Saturday: Standard $1,650, Essentials $1,800, Ultimate $1,950</p>
          <p>Sunday: Standard $1,250, Essentials $1,400, Ultimate $1,550</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">31-50 Guests Milestone Birthday Cruise Pricing</h4>
          <p>Monday-Thursday: Standard $1,000, Essentials $1,200, Ultimate $1,350</p>
          <p>Friday: Standard $1,100, Essentials $1,300, Ultimate $1,450</p>
          <p>Saturday: Standard $1,600, Essentials $1,800, Ultimate $1,950</p>
          <p>Sunday: Standard $1,200, Essentials $1,400, Ultimate $1,550</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">51-75 Guests Large Milestone Birthday Pricing</h4>
          <p>Monday-Thursday: Standard $1,300, Essentials $1,500, Ultimate $1,650</p>
          <p>Friday: Standard $1,400, Essentials $1,600, Ultimate $1,750</p>
          <p>Saturday: Standard $1,900, Essentials $2,100, Ultimate $2,250</p>
          <p>Sunday: Standard $1,500, Essentials $1,700, Ultimate $1,850</p>
        </div>
        
        <h3>Milestone Birthday Party Features and Amenities</h3>
        <ul>
          <li>21st birthday party boat cruise on Lake Travis</li>
          <li>30th birthday celebration with DJ and dancing</li>
          <li>40th birthday milestone party on private yacht</li>
          <li>50th birthday cruise with full bar service</li>
          <li>60th birthday celebration boat rental Austin</li>
          <li>Age-specific decorations and themed party supplies</li>
          <li>Professional crew and captain included</li>
          <li>Premium sound system and entertainment options</li>
          <li>Sunset timing available for milestone photos</li>
          <li>Full bar service with champagne toasts</li>
          <li>Cake service and birthday celebration coordination</li>
        </ul>
        
        <h3>Austin Milestone Birthday Cruise Keywords</h3>
        <p>milestone birthday Austin, 21st birthday party boat Lake Travis, 30th birthday cruise Austin, 40th birthday party boat, 
        50th birthday Lake Travis celebration, 60th birthday cruise Austin, birthday boat rental Lake Travis, Austin birthday party cruise, 
        milestone party boat Austin, Lake Travis birthday charter, private birthday boat rental Austin, birthday yacht rental Lake Travis</p>
        
        <h3>Fleet Options for Milestone Birthday Parties</h3>
        <p>Day Tripper (14 guests), Meeseeks (25 guests), Tito (30 guests), Clever Girl (50 guests), Millennium Falcon (75 guests)</p>
      </div>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Milestone Birthday Party Cruise Austin",
          "description": "Premier milestone birthday party cruises on Lake Travis for 21st, 30th, 40th, 50th, 60th birthdays and beyond. Private boat parties with DJ, decorations, and lake views.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "30.3895",
              "longitude": "-97.8686"
            },
            "telephone": "(512) 488-5892",
            "priceRange": "$800-$2,250"
          },
          "areaServed": {
            "@type": "City",
            "name": "Austin, TX"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Milestone Birthday Standard Package",
              "price": "800",
              "priceCurrency": "USD",
              "description": "4-hour milestone birthday cruise for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Milestone Birthday Essentials Package",
              "price": "900",
              "priceCurrency": "USD",
              "description": "4-hour birthday party with amenities for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Milestone Birthday Ultimate Package",
              "price": "1000",
              "priceCurrency": "USD",
              "description": "4-hour luxury birthday celebration with full entertainment for 1-14 guests"
            }
          ]
        })
      }} />

      
      {/* JSON-LD Structured Data - Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "https://premierpartycruises.com/milestone-birthday/#service",
                    "name": "Private Cruise — Milestone Birthdays",
                    "provider": {
                              "@id": "https://premierpartycruises.com/#organization"
                    },
                    "areaServed": [
                              "Austin TX",
                              "Texas",
                              "United States"
                    ],
                    "description": "Private 3–4 hour cruise with licensed, experienced captain & crew, premium Bluetooth sound, coolers, restrooms, sun & shade seating. Choose Essentials or Ultimate Disco Party package add‑ons."
          })
      }} />

      <VideoGallerySection videos={[{id: 'FABtEDZZBA0', title: 'Premier Party Cruises Experience', description: 'See what makes our Lake Travis cruises unforgettable'}]} />

      <Footer />
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import YouTubeHeroEmbed from '@/components/YouTubeHeroEmbed';
import VideoGallerySection from '@/components/VideoGallerySection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { formatCurrency } from '@shared/formatters';
import { PACKAGE_FLAT_FEES, CREW_FEES } from '@shared/constants';
import SEOHead from '@/components/SEOHead';
import { SectionReveal } from '@/components/SectionReveal';
import { weddingReviews } from '@shared/reviews-data';
import { 
  PartyPopper, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Music, Utensils,
  Star, Shield, Gift, MessageSquare, Wine, GlassWater,
  Mic, Crown, Award, Quote, ChevronRight, Ship,
  Anchor, Sun, Info, TrendingUp, Plane, Heart, Smile, X
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Hero and gallery images
const heroImage1 = '/attached_assets/bachelor-party-group-guys.jpg';
const heroImage2 = '/attached_assets/meeseeks-25-person-boat.jpg';
const heroImage3 = '/attached_assets/atx-disco-cruise-party.jpg';
const galleryImage1 = '/attached_assets/party-atmosphere-1.jpg';
const galleryImage2 = '/attached_assets/party-atmosphere-2.jpg';
const galleryImage3 = '/attached_assets/party-atmosphere-3.jpg';

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

// Welcome Party packages - REAL packages only (Standard, Essentials, Ultimate)
const welcomePackages = [
  {
    id: 'standard',
    name: 'Standard Package',
    flatFee: { 14: 0, 25: 0, 30: 0, 50: 0, 75: 0 },
    description: 'Basic cruise experience',
    subtitle: 'The boat, the captain, and the lake - welcome your guests in style',
    features: [
      'Licensed, fun, experienced captains to take your group safely around the lake in style',
      'Large empty coolers (plenty of cooler space - bring your own ice & drinks, or order ahead from Party On Delivery)',
      'Premium Bluetooth sound system',
      'Clean restroom facilities',
      'Sun and shade seating areas',
      'BYOB friendly (cans/plastic only)',
      'Basic cruise experience'
    ],
    popular: false,
    icon: Ship,
    badge: 'Great Value',
    color: 'blue'
  },
  {
    id: 'essentials',
    name: 'Essentials Package',
    flatFee: PACKAGE_FLAT_FEES.ESSENTIALS,
    description: 'Enhanced convenience',
    subtitle: 'Everything from Standard Package + Enhanced Convenience',
    features: [
      'Everything from Standard Package',
      'Coolers pre-stocked with ice',
      '5-gallon insulated water dispenser',
      'Solo cups and ice water',
      '6-foot folding table for food & drinks',
      'We can help coordinate alcohol delivery through Party On Delivery',
      'Enhanced convenience'
    ],
    popular: true,
    icon: Sparkles,
    badge: 'Most Popular',
    color: 'yellow'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Package',
    flatFee: PACKAGE_FLAT_FEES.ULTIMATE,
    description: 'Full party atmosphere setup',
    subtitle: 'Everything from Essentials Package + Full Party Atmosphere',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float (unicorn or ring)',
      'Disco ball cups for party vibes',
      'Bubble guns and bubble wands',
      'Champagne flutes and fruit juices',
      'SPF-50 spray sunscreen',
      'Plates, plasticware, paper towels',
      'Full party atmosphere setup'
    ],
    popular: false,
    icon: Crown,
    badge: 'All-Inclusive VIP',
    color: 'purple'
  }
];

// Boat-specific pricing for 4-hour cruises
const boatPricing = {
  '14': {
    name: 'Day Tripper',
    capacity: '1-14 guests',
    packages: {
      standard: { range: '$1,050 - $1,838', note: '4-hour cruise' },
      essentials: { range: '$1,181 - $1,969', addOn: '+$100 Essentials Package', note: '4-hour cruise w/Essentials' },
      ultimate: { range: '$1,413 - $2,260', addOn: '+$250 Ultimate Package', note: '4-hour cruise w/Ultimate' }
    }
  },
  '25': {
    name: 'Meeseeks / The Irony',
    capacity: '15-30 guests',
    packages: {
      standard: { range: '$1,181 - $2,050', note: '4-hour cruise' },
      essentials: { range: '$1,331 - $2,200', addOn: '+$150 Essentials Package', note: '4-hour cruise w/Essentials' },
      ultimate: { range: '$1,531 - $2,500', addOn: '+$300 Ultimate Package', note: '4-hour cruise w/Ultimate' }
    }
  },
  '50': {
    name: 'Clever Girl',
    capacity: '31-75 guests',
    packages: {
      standard: { range: '$1,313 - $2,350', note: '4-hour cruise' },
      essentials: { range: '$1,513 - $2,550', addOn: '+$200 Essentials Package', note: '4-hour cruise w/Essentials' },
      ultimate: { range: '$1,663 - $2,800', addOn: '+$350 Ultimate Package', note: '4-hour cruise w/Ultimate' }
    }
  }
};

// What's included in every package - GUARANTEED
const guaranteedInclusions = [
  {
    icon: Ship,
    title: 'Professional Captain & Crew',
    description: 'Licensed, experienced captain handles boat operation and safety'
  },
  {
    icon: Music,
    title: 'Premium Sound System',
    description: 'Bluetooth sound system for your music playlist'
  },
  {
    icon: Wine,
    title: 'BYOB Coordination',
    description: 'We coordinate Party On Delivery for seamless drink delivery'
  },
  {
    icon: GlassWater,
    title: 'Coolers & Ice Provided',
    description: 'Coolers with ice included (pre-stocked with upgraded packages)'
  },
  {
    icon: Sun,
    title: 'Comfort & Amenities',
    description: 'Restrooms, comfortable seating, sun & shade areas included'
  },
  {
    icon: Shield,
    title: 'Safety Equipment',
    description: 'All required safety equipment and life jackets provided'
  }
];

// Optional concierge services - AVAILABLE UPON REQUEST
const conciergeServices = [
  {
    icon: Utensils,
    title: 'Food Coordination',
    description: 'We can help arrange catering from Austin vendors (optional service)'
  },
  {
    icon: Mic,
    title: 'Entertainment Booking',
    description: 'Live music can be arranged upon request (optional service)'
  },
  {
    icon: Gift,
    title: 'Custom Services',
    description: 'Welcome bags and decorations available upon request (optional)'
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
    answer: 'Yes. For food, you have two options: (1) Bring your own - easy items that won\'t make a mess, or (2) We can help arrange full catering and setup from Austin vendors. BYOB (21+), cans/plastic only. We provide coolers with ice and cups.'
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
    answer: "Yes, when conditions are safe and at the captain's discretion. Life jackets are on board and available for swimming - we encourage guests to wear them for safety."
  },
  {
    id: 'life-jackets',
    question: 'What about life jackets?',
    answer: 'Adult life jackets are provided. Infant/child life jackets must be brought by guests.'
  }
];


export default function WelcomeParty() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedBoatSize, setSelectedBoatSize] = useState<'14' | '25' | '50'>('14');
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return; // Skip animation for reduced motion
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const handleGetQuote = () => {
    navigate('/chat?eventType=welcome-party');
  };

  const handleBookNow = () => {
    window.open('https://booking.premierpartycruises.com/quote-v2', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead 
        pageRoute="/welcome-party"
        defaultTitle="Wedding Welcome Party | Lake Travis"
        defaultDescription="Welcome wedding guests on Lake Travis! Texas BBQ, live music, Austin hospitality. Perfect way to start your wedding weekend!"
        defaultKeywords={[
          'wedding welcome party cruise',
          'lake travis welcome reception',
          'wedding weekend cruise austin',
          'out of town guest welcome',
          'austin wedding cruise'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
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
          {/* Gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/50"></div>
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
              <Badge className="mb-6 px-6 py-3 text-base font-sans tracking-wider bg-purple-100 border-purple-300 shadow-lg">
                <Plane className="mr-2 h-5 w-5" />
                Welcome Your Wedding Guests in Style
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-extrabold mb-6 text-center text-gray-900 drop-shadow-sm"
              variants={fadeInUp}
            >
              Welcome Party Cruises
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8 font-bold drop-shadow-sm max-w-3xl mx-auto text-center"
              variants={fadeInUp}
            >
              Welcome Your Wedding Guests in Style
            </motion.p>

            <motion.div 
              className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-6 shadow-xl max-w-5xl mx-auto mb-8"
              variants={fadeInUp}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-900 font-semibold leading-relaxed">
                Kick off your wedding weekend with an unforgettable Lake Travis cruise. 
                Perfect for bringing families together with Texas hospitality.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <div
                className="xola-custom xola-checkout"
                data-button-id="691574bd162501edc00f151a"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-base sm:text-lg px-8 py-6 shadow-xl"
                  data-testid="button-hero-get-quote"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Plan Your Welcome Party
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold text-base sm:text-lg px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Packages
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">400+</div>
                <div className="text-sm text-gray-600">Welcome Parties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">25-75</div>
                <div className="text-sm text-gray-600">Guest Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">5.0★</div>
                <div className="text-sm text-gray-600">Guest Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/90 backdrop-blur-sm py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-base md:text-lg font-semibold">
              <span className="text-purple-600">Welcome Guests</span> • Texas Hospitality • <span className="text-purple-600">Wedding Weekend Kickoff</span>
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
              className="text-2xl md:text-3xl font-heading font-bold mb-6 text-white tracking-wider"
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
              Welcome Party Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package to welcome your wedding guests. 
              All packages include Texas hospitality and Lake Travis views.
            </p>
          </motion.div>

          {/* Tabbed Pricing by Boat Size */}
          <Tabs value={selectedBoatSize} onValueChange={(val) => setSelectedBoatSize(val as '14' | '25' | '50')} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-blue-100 dark:bg-blue-950 p-1">
              <TabsTrigger 
                value="14" 
                data-testid="tab-14-person"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold"
              >
                <Ship className="h-4 w-4 mr-2" />
                14-Person Boat
              </TabsTrigger>
              <TabsTrigger 
                value="25" 
                data-testid="tab-25-person"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold"
              >
                <Ship className="h-4 w-4 mr-2" />
                25-Person Boat
              </TabsTrigger>
              <TabsTrigger 
                value="50" 
                data-testid="tab-50-person"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold"
              >
                <Ship className="h-4 w-4 mr-2" />
                50-Person Boat
              </TabsTrigger>
            </TabsList>

            {/* Boat Info Card */}
            <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Ship className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold text-lg">{boatPricing[selectedBoatSize].name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{boatPricing[selectedBoatSize].capacity}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Cards for Each Boat Size */}
            {(['14', '25', '50'] as const).map((boatSize) => (
              <TabsContent key={boatSize} value={boatSize}>
                <div className="grid md:grid-cols-3 gap-8">
                  {welcomePackages.map((pkg, index) => {
                    const pricing = boatPricing[boatSize].packages[pkg.id as keyof typeof boatPricing['14']['packages']];
                    
                    return (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={cn(
                          "relative h-full hover:shadow-2xl transition-all duration-300",
                          pkg.popular && "border-2 border-brand-yellow shadow-xl"
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
                                {pricing.range}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {pricing.note}
                              </p>
                              {pricing.addOn && (
                                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-2">
                                  {pricing.addOn}
                                </p>
                              )}
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

                            <div
                              className="xola-custom xola-checkout"
                              data-button-id="691574bd162501edc00f151a"
                            >
                              <Button 
                                className="w-full"
                                variant={pkg.popular ? "default" : "outline"}
                                data-testid={`button-package-${pkg.id}-${boatSize}`}
                              >
                                Get Quote
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Guaranteed Inclusions Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              What's Included in Every Package
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Guaranteed with your welcome party cruise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {guaranteedInclusions.map((item, index) => (
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

      {/* Optional Concierge Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-6 py-2 text-base font-sans tracking-wider bg-purple-100 border-purple-300">
              Optional Add-Ons
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Optional Concierge Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Available upon request - we'll help coordinate these services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {conciergeServices.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start p-6 rounded-lg bg-white dark:bg-gray-950 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <item.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
              Welcome Party Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Check out our verified reviews on Google and Facebook to see what real couples are saying about their welcome party cruises on Lake Travis!
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
              Welcome Party Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about hosting your welcome party cruise
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
        partyType="Wedding Welcome Party"
        eventType="welcome party"
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
              Ready to Welcome Your Guests?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Start your wedding weekend with an unforgettable Lake Travis welcome party. 
              Let us help you create the perfect first impression.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="691574bd162501edc00f151a"
              >
                <Button
                  size="lg"
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6 shadow-xl"
                  data-testid="button-cta-get-quote"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Planning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

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
              Related Wedding Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our full range of wedding event experiences on Lake Travis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/rehearsal-dinner">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <Utensils className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Rehearsal Dinner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Rehearsal dinner cruises
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Rehearsal Dinners
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
              <Link href="/after-party">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Music className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">After Party</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      After party celebrations
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore After Parties
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
              <Link href="/wedding-parties">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Wedding Parties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Wedding event planning
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      View All Wedding Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Hidden Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/Service">
        <h2>Welcome Party Cruise Austin - Lake Travis Wedding Guest Reception</h2>
        <p itemProp="description">
          Premier welcome party cruises on Lake Travis for wedding guests. Perfect for greeting out-of-town visitors with 
          Texas BBQ, live music, and stunning lake views. Wedding weekend kick-off celebrations from 14-75 guests.
        </p>
        
        {/* Pricing Content for Crawlers */}
        <h3>Welcome Party Private Cruise Pricing - All Guest Capacities</h3>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">1-14 Guests Welcome Party Pricing</h4>
          <p>Monday-Thursday: Standard $1,050, Essentials $1,150, Ultimate $1,300</p>
          <p>Friday: Standard $1,181, Essentials $1,281, Ultimate $1,431</p>
          <p>Saturday: Standard $1,838, Essentials $1,938, Ultimate $2,088</p>
          <p>Sunday: Standard $1,313, Essentials $1,413, Ultimate $1,563</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">15-25 Guests Welcome Reception Pricing</h4>
          <p>Monday-Thursday: Standard $1,181, Essentials $1,331, Ultimate $1,481</p>
          <p>Friday: Standard $1,313, Essentials $1,463, Ultimate $1,613</p>
          <p>Saturday: Standard $1,969, Essentials $2,119, Ultimate $2,269</p>
          <p>Sunday: Standard $1,444, Essentials $1,594, Ultimate $1,744</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">26-30 Guests Welcome Party Pricing</h4>
          <p>Monday-Thursday: Standard $1,381, Essentials $1,531, Ultimate $1,681</p>
          <p>Friday: Standard $1,513, Essentials $1,663, Ultimate $1,813</p>
          <p>Saturday: Standard $2,169, Essentials $2,319, Ultimate $2,469</p>
          <p>Sunday: Standard $1,644, Essentials $1,794, Ultimate $1,944</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">31-50 Guests Wedding Welcome Cruise Pricing</h4>
          <p>Monday-Thursday: Standard $1,313, Essentials $1,513, Ultimate $1,663</p>
          <p>Friday: Standard $1,444, Essentials $1,644, Ultimate $1,794</p>
          <p>Saturday: Standard $2,100, Essentials $2,300, Ultimate $2,450</p>
          <p>Sunday: Standard $1,575, Essentials $1,775, Ultimate $1,925</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">51-75 Guests Large Welcome Party Pricing</h4>
          <p>Monday-Thursday: Standard $1,613, Essentials $1,813, Ultimate $1,963</p>
          <p>Friday: Standard $1,744, Essentials $1,944, Ultimate $2,094</p>
          <p>Saturday: Standard $2,400, Essentials $2,600, Ultimate $2,750</p>
          <p>Sunday: Standard $1,875, Essentials $2,075, Ultimate $2,225</p>
        </div>
        
        <h3>Welcome Party Features and Amenities</h3>
        <ul>
          <li>Out-of-town wedding guest welcome reception on Lake Travis</li>
          <li>Tables and coolers provided for your food and drinks</li>
          <li>Live music and entertainment for wedding guests</li>
          <li>Professional crew and captain included</li>
          <li>Premium sound system for speeches and toasts</li>
          <li>Sunset timing available for photo opportunities</li>
          <li>Transportation coordination from hotels</li>
          <li>Customizable decorations to match wedding theme</li>
          <li>BYOB friendly - Party On Delivery coordination available</li>
        </ul>
        
        <h3>Austin Welcome Party Cruise Keywords</h3>
        <p>welcome party Austin, wedding welcome cruise Lake Travis, out of town guest reception, wedding weekend kickoff Austin, 
        Lake Travis welcome party boat, Austin wedding guest cruise, welcome reception on water, Texas wedding welcome event, 
        Lake Travis wedding weekend, Austin wedding hospitality cruise, wedding guest welcome boat rental, Lake Travis private welcome party</p>
        
        <h3>Fleet Options for Welcome Parties</h3>
        <p>Day Tripper (14 guests), Meeseeks (25 guests), Tito (30 guests), Clever Girl (50 guests), Millennium Falcon (75 guests)</p>
      </div>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Welcome Party Cruise Austin",
          "description": "Premium welcome party cruises on Lake Travis for wedding guests. Perfect for greeting out-of-town visitors with Texas BBQ, live music, and stunning lake views.",
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
            "priceRange": "$1,050-$2,750"
          },
          "areaServed": {
            "@type": "City",
            "name": "Austin, TX"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Welcome Party Standard Package",
              "price": "1050",
              "priceCurrency": "USD",
              "description": "4-hour welcome party cruise for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Welcome Party Essentials Package",
              "price": "1150",
              "priceCurrency": "USD",
              "description": "4-hour welcome reception with amenities for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Welcome Party Ultimate Package",
              "price": "1300",
              "priceCurrency": "USD",
              "description": "4-hour luxury welcome party with full entertainment for 1-14 guests"
            }
          ]
        })
      }} />

      
      {/* JSON-LD Structured Data - Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "https://premierpartycruises.com/welcome-party/#service",
                    "name": "Private Cruise — Wedding Welcome Parties",
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
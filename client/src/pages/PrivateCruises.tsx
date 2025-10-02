import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Chat from '@/pages/Chat';
import ExperienceCards from '@/components/ExperienceCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  Package, Gift, Heart, Crown, Anchor, PartyPopper
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { formatCurrency } from '@shared/formatters';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { 
  PRIVATE_CRUISE_PACKAGES, 
  PRIVATE_CAPACITY_TIERS, 
  PACKAGE_COMPARISON_FEATURES,
  BOATS,
  CREW_FEES,
  DISCO_PRICING,
  ADDON_FEES,
  HOURLY_RATES
} from '@shared/constants';

// Hero and gallery images 
import heroImage1 from '@assets/image_1757844813165.png';
import heroImage2 from '@assets/image_1757850768476.png';
import heroImage3 from '@assets/image_1757853656553.png';
import galleryImage1 from '@assets/image_1757877906674.png';
import galleryImage2 from '@assets/image_1757884902886.png';
import galleryImage3 from '@assets/image_1757886911506.png';

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
    description: 'Tailored packages for any celebration - corporate events, weddings, birthdays, anniversaries.'
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

// FAQ data
const faqData = [
  {
    question: 'How far in advance should I book my private cruise?',
    answer: 'We recommend booking 2-4 weeks in advance for weekend dates, especially during peak season (April-September). Weekday cruises typically have more availability and can often be booked with shorter notice.'
  },
  {
    question: 'What\'s included in the private cruise price?',
    answer: 'All private cruises include: professional Coast Guard certified captain, fuel, coolers with ice, premium sound system with Bluetooth connectivity, safety equipment, and basic amenities. Food, beverages, and extra crew (if needed) are additional.'
  },
  {
    question: 'Can we bring our own food and drinks?',
    answer: 'Absolutely! You can bring your own food, snacks, and beverages (including alcohol for guests 21+). We provide coolers and ice. We can also connect you with preferred catering partners for full-service dining.'
  },
  {
    question: 'What happens if the weather is bad?',
    answer: 'Safety is our top priority. If weather conditions are unsafe, we\'ll work with you to reschedule your cruise to another date. We monitor weather closely and will contact you 24-48 hours before your cruise if conditions look questionable.'
  },
  {
    question: 'Do you provide decorations for special events?',
    answer: 'We can accommodate basic decorations and help coordinate with local vendors for more elaborate setups. Many clients bring their own decorations, and our crew is happy to help with setup before departure.'
  },
  {
    question: 'What are your cancellation policies?',
    answer: 'Cancellations more than 14 days prior receive full refund. 7-14 days prior: 50% refund. Less than 7 days: no refund except for unsafe weather conditions. We offer date changes based on availability.'
  },
  {
    question: 'How do deposits and payments work?',
    answer: 'If booking more than 30 days out, we require a 25% deposit to secure your date. The balance is due 30 days before your cruise. If booking within 30 days, full payment is required upfront.'
  },
  {
    question: 'Can swimming be included in our private cruise?',
    answer: 'Yes! Lake Travis offers great swimming opportunities. We can anchor in swimming areas and provide ladder access. We recommend bringing water shoes and sunscreen. Swimming is always at your own risk.'
  }
];

export default function PrivateCruises() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();

  const handleGetQuote = () => {
    // Navigate to chat for instant quote
    navigate('/chat?cruiseType=private');
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Private Cruise Charters",
    "description": "Exclusive private boat charters on Lake Travis with professional crews and premium amenities",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Premier Party Cruises",
      "url": "https://premierppartycruises.com",
      "telephone": "+1-512-488-5892",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "addressCountry": "US"
      }
    },
    "areaServed": "Lake Travis, Austin, Texas",
    "serviceType": "Private Boat Charter"
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Private Cruise Charter - Lake Travis",
    "description": "Exclusive private boat charters on Lake Travis with professional crews, premium amenities, and flexible capacity options for any celebration or corporate event.",
    "brand": {
      "@type": "Brand",
      "name": "Premier Party Cruises"
    },
    "offers": [
      {
        "@type": "AggregateOffer",
        "name": "14-Person Boat Charter",
        "lowPrice": "320.00",
        "highPrice": "450.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://premierppartycruises.com/private-cruises",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "AggregateOffer",
        "name": "25-30 Person Boat Charter",
        "lowPrice": "400.00",
        "highPrice": "600.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://premierppartycruises.com/private-cruises",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "AggregateOffer",
        "name": "50+ Person Boat Charter",
        "lowPrice": "600.00",
        "highPrice": "850.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://premierppartycruises.com/private-cruises",
        "priceValidUntil": "2025-12-31"
      }
    ],
    "category": "Event Services",
    "areaServed": {
      "@type": "City",
      "name": "Austin"
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/private-cruises"
        defaultTitle="Private Cruise Charters Lake Travis Austin | Premier Party Cruises"
        defaultDescription="Exclusive private boat charters on Lake Travis. 14-75 person capacity boats with professional crews. Perfect for corporate events, weddings, birthdays & celebrations. Book your private cruise today!"
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
        schemaType="service"
        customSchema={[serviceSchema, productSchema]}
      />
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-marine-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-yellow/20 dark:from-brand-blue/10 dark:to-brand-yellow/10" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Ship className="h-20 w-20 text-brand-blue mx-auto mb-8" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 text-gray-900 dark:text-white"
              data-editable data-editable-id="private-hero-title"
            >
              EVERYTHING SET UP
              <span className="block text-brand-blue">WHEN YOU ARRIVE</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              data-editable data-editable-id="private-hero-subtitle"
            >
              <span className="text-brand-blue font-bold">Choose Your Perfect Package.</span> From basic cruising to ultimate party experiences, 
              we handle all the setup so you can focus on making memories. Professional crew, premium amenities, 
              and everything scaled perfectly for your group size.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Button
                size="lg"
                asChild
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-book-private-cruise"
              >
                <Link href="/chat">
                  <Calendar className="mr-3 h-6 w-6" />
                  BOOK YOUR PRIVATE CRUISE
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleGetQuote}
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-xl px-12 py-6 transition-all duration-300 hover:scale-105"
                data-testid="button-get-instant-quote"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                GET INSTANT QUOTE
              </Button>
            </motion.div>

            {/* Key selling points */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
            >
              {[
                { icon: Package, text: '3 Package Levels', subtext: 'Standard • Essentials • Ultimate' },
                { icon: Users, text: '5 Capacity Options', subtext: '14 • 25 • 30 • 50 • 75 Person Boats' },
                { icon: Clock, text: 'No Setup Required', subtext: 'Everything ready when you arrive' },
                { icon: Wine, text: 'Alcohol Delivery', subtext: 'Convenient party planning' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <item.icon className="h-12 w-12 text-brand-blue mb-4" />
                  <div className="font-bold text-gray-900 dark:text-white mb-2">{item.text}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{item.subtext}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-yellow rounded-full animate-ping opacity-30" style={{animationDelay: '0s'}} />
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-brand-blue rounded-full animate-ping opacity-40" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-brand-yellow rounded-full animate-ping opacity-20" style={{animationDelay: '2s'}} />
        </div>
      </section>
      
      {/* Streamlined Booking Section */}
      <section id="booking-widget" className="py-24 bg-gray-50 dark:bg-gray-900">
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
              BOOK YOUR PRIVATE CRUISE
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Choose your group size and preferred date to see available boats and pricing.
              Our streamlined booking process makes it easy to secure your Lake Travis adventure.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Chat />
          </motion.div>
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
              <div className="sticky top-16 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 py-4 mb-8">
                <div className="container mx-auto px-6">
                  <TabsList className="grid w-full grid-cols-5 lg:max-w-3xl lg:mx-auto bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    <TabsTrigger 
                      value="experiences" 
                      className="flex flex-col items-center gap-1 py-3 px-2 text-xs data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                    >
                      <PartyPopper className="h-4 w-4" />
                      <span className="font-semibold">Experiences</span>
                      <span className="text-[10px] opacity-70">All Events</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="14" 
                      className="flex flex-col items-center gap-1 py-3 px-2 text-xs data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                    >
                      <Ship className="h-4 w-4" />
                      <span className="font-semibold">14 People</span>
                      <span className="text-[10px] opacity-70">Day Tripper</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="25" 
                      className="flex flex-col items-center gap-1 py-3 px-2 text-xs data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                    >
                      <Ship className="h-4 w-4" />
                      <span className="font-semibold">25-30 People</span>
                      <span className="text-[10px] opacity-70">Me Seeks The Irony</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="50" 
                      className="flex flex-col items-center gap-1 py-3 px-2 text-xs data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                    >
                      <Ship className="h-4 w-4" />
                      <span className="font-semibold">50-75 People</span>
                      <span className="text-[10px] opacity-70">Clever Girl</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="disco" 
                      className="flex flex-col items-center gap-1 py-3 px-2 text-xs data-[state=active]:bg-brand-yellow data-[state=active]:text-black"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span className="font-semibold">Disco Cruise</span>
                      <span className="text-[10px] opacity-70">ATX Disco</span>
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

      {/* Booking Section with Chat Component */}
      <section id="booking-widget" className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider">
                BOOK YOUR PRIVATE CRUISE
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Get started with our instant quote builder and book your private Lake Travis cruise.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-7xl mx-auto"
          >
            <Chat defaultEventType="private" />
          </motion.div>
        </div>
      </section>

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

    </div>
  );
}
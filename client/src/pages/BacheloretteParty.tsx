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
import SEOHead, { generateFAQSchema, generateComprehensiveLocalBusinessSchema } from '@/components/SEOHead';
import { useInlineEdit } from '@/hooks/useInlineEdit';
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
  HelpCircle, Anchor, Droplets, Waves, Info, TrendingUp,
  Gem, Flower, Flower2, CircleDot, Smile, X, Package,
  Plane, Wine, Eye, Bot
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/atx-disco-cruise-party.jpg';
import heroImage3 from '@assets/dancing-party-scene.jpg';
import galleryImage1 from '@assets/party-atmosphere-1.jpg';
import galleryImage2 from '@assets/party-atmosphere-2.jpg';
import galleryImage3 from '@assets/party-atmosphere-3.jpg';
import boatImage1 from '@assets/day-tripper-14-person-boat.jpg';
import boatImage2 from '@assets/meeseeks-25-person-boat.jpg';
import boatImage3 from '@assets/clever-girl-50-person-boat.jpg';
import floatImage from '@assets/giant-unicorn-float.jpg';

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

const heartBeat = {
  hidden: { scale: 1 },
  visible: { 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
};

// ATX Disco Cruise packages for bachelorettes
const bachelorettePackages = [
  {
    id: 'basic_bachelorette',
    name: 'Basic Bach Package',
    price: DISCO_PRICING.basic / 100,
    originalPrice: null,
    description: 'Join the BEST Party on Lake Travis, Exclusively for Bach Parties!',
    subtitle: 'BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise',
    features: [
      'Join the BEST Party on Lake Travis, Exclusively for Bach Parties!',
      'BYOB, throw your drinks in a shared cooler w/ice',
      'Alcohol Delivery & Lunch Delivery Available',
      'ALWAYS Cheaper than a Private Cruise',
      'If you\'re trying to keep it cheap, this is your move!'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value',
    brideSpecial: false
  },
  {
    id: 'disco_queen',
    name: 'Disco Queen Package',
    price: DISCO_PRICING.disco_queen / 100,
    originalPrice: 125,
    description: 'Our signature bachelorette party experience - That Happens to be Our Specialty!',
    subtitle: 'Private Cooler & Reserved Spot for Your Group',
    features: [
      '🎉 Bride Cruises FREE with this package!',
      'Private Cooler w/Ice & Storage Bin for Your Group',
      'Reserved Spot for Your Group',
      'Disco Ball Cup & Bubble Gun for the Bride',
      'Complimentary Direct-to-Boat Alcohol & Lunch Delivery',
      '25% Discount on Round-Trip Transportation',
      '$50-$100 Voucher for Airbnb Booze Delivery'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular',
    brideSpecial: true
  },
  {
    id: 'platinum_bride',
    name: 'Super Sparkle Platinum Disco',
    price: DISCO_PRICING.platinum / 100,
    originalPrice: 140,
    description: 'Ultimate all-inclusive Austin bachelorette party luxury',
    subtitle: 'Nothing to Carry, Cooler Stocked w/drinks When You Arrive!',
    features: [
      '🎉 Bride Cruises FREE with this package!',
      'Everything in the Disco Queen Package',
      'Personal Unicorn Float for the Bride',
      'Mimosa Setup w/Champagne Flutes, 3 Juices, & a Chambong!',
      '$100 Voucher for Airbnb Concierge Services',
      'Towel Service & SPF-50 Spray Sunscreen Provided',
      'Nothing to Carry, Cooler Stocked w/drinks When You Arrive!'
    ],
    popular: false,
    icon: Trophy,
    badge: 'All-Inclusive VIP',
    brideSpecial: true
  }
];

// Complete list of what's included from PDF
const whatsIncluded = [
  {
    icon: Music,
    title: 'Professional DJ',
    description: 'Playing your favorites ALL DAY - party starts when you arrive!'
  },
  {
    icon: Camera,
    title: 'Professional Photographer',
    description: 'Capture every magical moment with Instagram-worthy photos'
  },
  {
    icon: Anchor,
    title: 'Private Cooler with Ice',
    description: 'Your group\'s own cooler, fully stocked with ice'
  },
  {
    icon: GlassWater,
    title: 'Mimosa Supplies',
    description: 'Juice, fresh fruit - just add champagne!'
  },
  {
    icon: Waves,
    title: 'Multiple Lily Pad Floats',
    description: '3 huge 6x20\' floats to lounge in style on the water'
  },
  {
    icon: Gift,
    title: 'Party Supplies',
    description: 'Cups, koozies, name tags, bubbles - all included!'
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
  }
];

// FAQs with PDF content
const faqItems = [
  {
    id: 'refund-policy',
    question: 'What is your refund policy?',
    answer: 'We offer a 48-hour full refund window after booking. This gives you time to coordinate with your girls and make sure everyone is on board. After 48 hours, deposits become non-refundable but can be transferred to another date with advance notice.'
  },
  {
    id: 'split-payment',
    question: 'Can we split the payment between the girls?',
    answer: 'Absolutely! We offer split payment options at checkout. Each bridesmaid can pay their portion directly, making it easy to manage group bookings. The MOH doesn\'t have to front the entire cost!'
  },
  {
    id: 'attire',
    question: 'Is disco attire required?',
    answer: 'Disco attire is encouraged but not required! Many bachelorette groups love coordinating disco outfits - it makes for AMAZING photos and adds to the fun vibe. But come as you are - the most important thing is celebrating the bride!'
  },
  {
    id: 'weather-policy',
    question: 'What happens if there\'s bad weather?',
    answer: 'We cruise rain or shine - the boat has cover available! For severe weather (lightning, high winds), we have the "Lemonade Disco" backup plan: a land party with fajita/BBQ buffet and drinks. You\'ll still have an epic bachelorette party, just on dry land!'
  },
  {
    id: 'add-people',
    question: 'Can we add more girls after booking?',
    answer: 'Yes! You can easily add 1-2 more bridesmaids after booking, subject to availability. Just contact us as soon as you know, and we\'ll add them to your reservation. The earlier you let us know, the better!'
  },
  {
    id: 'bride-free',
    question: 'Does the bride really cruise free?',
    answer: 'YES! With our Disco Queen and Platinum packages, the bride cruises absolutely FREE! It\'s our way of making sure she has the best bachelorette party ever. Just book 8+ paying guests on either package and she\'s covered!'
  },
  {
    id: 'group-discounts',
    question: 'Do you offer group discounts?',
    answer: 'Yes! Groups of 10+ people receive special discounted rates. The bigger your bridal squad, the better the deal. Contact us for specific pricing for your group size.'
  },
  {
    id: 'alcohol-policy',
    question: 'What\'s your alcohol policy?',
    answer: 'BYOB - bring your own bubbly! We provide private coolers with ice for each group. We also partner with local alcohol delivery services who can deliver champagne and rosé directly to the boat. We handle everything else!'
  },
  {
    id: 'booking-timeline',
    question: 'How far in advance should we book?',
    answer: 'Book as early as possible! Most weekends sell out 4-6 weeks in advance, and we\'re usually booked SOLID at least a month ahead. Spring & summer bachelorette season books up even faster. Don\'t wait - secure your date now!'
  }
];

// Bachelorette party testimonials
const testimonials = [
  {
    id: 1,
    name: 'Emma Rodriguez',
    role: 'Bride',
    location: 'Austin, TX',
    rating: 5,
    text: "OMG this was the BEST party I've EVER been to! We met bachelorette parties from LA, Miami, even New York! The energy was ELECTRIC - everyone celebrating together made it SO special. The professional photos are Instagram PERFECTION!",
    avatar: '👰',
    package: 'Disco Queen Package'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Maid of Honor',
    location: 'Houston, TX',
    rating: 5,
    text: "I planned this and literally EVERYTHING was handled - zero stress! The DJ was FIRE, professional photos came out AMAZING, and the free champagne delivery was perfect. My bride still says I'm a genius for finding this!",
    avatar: '💕',
    package: 'Platinum Package'
  },
  {
    id: 3,
    name: 'Jessica Martinez',
    role: 'Bride',
    location: 'San Antonio, TX',
    rating: 5,
    text: "Dancing on the lake with my girls was MAGICAL! We met parties from all over the country - made lifelong friends. The vibe was incredible, everyone celebrating their bride. SERIOUSLY the highlight of my entire bachelorette weekend!",
    avatar: '💃',
    package: 'Basic Bach Package'
  },
  {
    id: 4,
    name: 'Megan Thompson',
    role: 'Maid of Honor',
    location: 'Dallas, TX',
    rating: 5,
    text: "The GIANT unicorn float was EVERYTHING! We got the most incredible photos - our photographer captured pure magic. Meeting other bachelorette parties from across America made it even more fun. This IS their specialty!",
    avatar: '🎉',
    package: 'Disco Queen Package'
  },
  {
    id: 5,
    name: 'Ashley Williams',
    role: 'Bride',
    location: 'Fort Worth, TX',
    rating: 5,
    text: "Show your bride the BEST weekend of her life! Nothing to plan, nothing to carry - just SHOW UP and GET DOWN. Everything was ready on the boat. The DJ, photographer, unicorn float - all PERFECT. Priceless memories made!",
    avatar: '🦄',
    package: 'Platinum Package'
  },
  {
    id: 6,
    name: 'Rachel Davis',
    role: 'Bridesmaid',
    location: 'Round Rock, TX',
    rating: 5,
    text: "The DJ was INCREDIBLE - best playlist ever! We partied with bachelorette parties from 5 different states and exchanged Instas with everyone. The energy was INSANE - everyone celebrating the same occasion!",
    avatar: '🥂',
    package: 'Disco Queen Package'
  },
  {
    id: 7,
    name: 'Lauren Miller',
    role: 'Bride',
    location: 'Cedar Park, TX',
    rating: 5,
    text: "My MOH is a LEGEND for finding this! The professional photos turned out better than our engagement photos! The party atmosphere with other bachelorette groups was NEXT LEVEL. 100% the highlight of my bachelorette weekend!",
    avatar: '👑',
    package: 'Platinum Package'
  },
  {
    id: 8,
    name: 'Olivia Martinez',
    role: 'Maid of Honor',
    location: 'Plano, TX',
    rating: 5,
    text: "Everything was HANDLED - literally zero stress! Free champagne delivery to the boat, DJ was bumping, photographer captured EVERYTHING. We just showed up and partied. The bride still thanks me constantly. Be the hero!",
    avatar: '✨',
    package: 'Disco Queen Package'
  }
];

// Photo gallery items
const galleryPhotos = [
  { id: 1, src: heroImage2, alt: 'Bachelorette Party Austin ATX Disco Cruise on Party Boat Lake Travis' },
  { id: 2, src: heroImage3, alt: 'Austin Bachelorette Party Boat dancing on Lake Travis cruise' },
  { id: 3, src: galleryImage1, alt: 'Bachelorette Party Austin vibes on Lake Travis party boat' },
  { id: 4, src: floatImage, alt: 'Lake Travis Bachelorette Party giant unicorn float on Party Boat Austin' },
  { id: 5, src: galleryImage2, alt: 'Austin Bachelorette Party Boat atmosphere on Lake Travis' },
  { id: 6, src: boatImage1, alt: 'Lake Travis Bachelorette Party Day Tripper boat cruise' },
  { id: 7, src: galleryImage3, alt: 'Bachelorette Party Austin on Lake Travis party boat' },
  { id: 8, src: boatImage2, alt: 'Austin Bachelorette Party Boat Meeseeks on Lake Travis' }
];

export default function BacheloretteParty() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const heroImages = [heroImage2, heroImage3, galleryImage1];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    const params = new URLSearchParams({ cruiseType: 'bachelorette' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "ATX DISCO CRUISE - Bachelorette Party Boat Experience",
    "description": "Austin's #1 rated bachelorette party boat experience. The ATX DISCO CRUISE is the ultimate bachelorette party on Lake Travis featuring professional DJ, photographer, disco dance floor, premium sound system, and bride cruises FREE exclusively for bachelorette parties.",
    "startDate": "2025-10-11T14:00:00-05:00",
    "endDate": "2025-10-11T21:00:00-05:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Anderson Mill Marina - Lake Travis",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13993 FM2769",
        "addressLocality": "Leander",
        "addressRegion": "TX",
        "postalCode": "78641",
        "addressCountry": "US"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Premier Party Cruises",
      "url": "https://premierpartycruises.com",
      "telephone": "(512) 488-5892"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://premierpartycruises.com/bachelorette-party-austin",
      "price": "85.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01",
      "description": "ATX DISCO CRUISE bachelorette party packages starting at $85/person - Bride cruises FREE with Disco Queen and Platinum packages"
    },
    "performer": {
      "@type": "Organization",
      "name": "Premier Party Cruises"
    },
    "image": "https://premierpartycruises.com/assets/atx-disco-cruise-party.jpg"
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ATX Disco Cruise - Bachelorette Party Package",
    "description": "Join Austin's best bachelorette party on Lake Travis with DJ, photographer, and bride cruises free. Exclusively for bachelorette parties with professional entertainment and amenities included.",
    "brand": {
      "@type": "Brand",
      "name": "Premier Party Cruises"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Bachelorette Package",
        "price": "85.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://premierppartycruises.com/bachelorette-party",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "Offer",
        "name": "Disco Queen Package",
        "price": "95.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://premierppartycruises.com/bachelorette-party",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "Offer",
        "name": "Super Sparkle Platinum Package",
        "price": "105.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://premierppartycruises.com/bachelorette-party",
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
        pageRoute="/bachelorette-party-austin"
        defaultTitle="Bachelorette Party Boat Austin | Lake Travis"
        defaultDescription="Austin's #1 bachelorette party cruise! Bride cruises FREE with all-inclusive packages. DJ, photographer & more included. Book now!"
        defaultKeywords={['Austin bachelorette party', 'Lake Travis bachelorette party', 'ATX Disco Cruise', 'bachelorette party boat Austin']}
        schemaType="event"
        customSchema={[
          generateComprehensiveLocalBusinessSchema({
            pageDescription: "Austin's #1 bachelorette party boat cruise on Lake Travis! ATX Disco Cruise offers all-inclusive bachelorette packages with DJ, photographer, and Bride cruises FREE. Our specialty since 2009!",
            additionalServices: [
              {
                name: "Bachelorette Party Boat Cruises",
                description: "Unforgettable bachelorette party cruises on Lake Travis with ATX DISCO CRUISE - Bride cruises FREE on select packages"
              },
              {
                name: "ATX Disco Cruise Bachelorette Packages",
                description: "Exclusive bachelorette packages: Basic Bach, Disco Queen, and Platinum - professional DJ and photographer included"
              },
              {
                name: "Austin Bachelorette Party Planning",
                description: "Complete bachelorette party planning services on Lake Travis - our specialty since 2009"
              }
            ]
          }),
          eventSchema,
          productSchema,
          generateFAQSchema(faqItems)
        ]}
      />
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0"
            >
              <img 
                src={heroImages[currentHeroImage]}
                alt="Bachelorette party Austin cruise on Lake Travis - ATX Disco party boat with DJ, photographer and bride celebrations"
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
                loading="eager"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-white text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-5xl mx-auto"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-2xl md:text-4xl lg:text-6xl font-bold mb-6"
              data-editable data-editable-id="bachelorette-hero-title"
            >
              Austin Bachelorette Party Boat<br/>
              <span className="text-pink-400">The Ultimate Lake Travis Experience</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 text-gray-100"
              data-editable data-editable-id="bachelorette-hero-subtitle"
            >
              Exclusively for Bachelorette & Bachelor Parties<br/>
              <span className="text-lg">The Highlight of Your Weekend Every. Damn. Time.</span>
            </motion.p>

            {/* Special Offer Banner */}
            <motion.div 
              variants={fadeInUp}
              className="bg-pink-600/90 backdrop-blur-sm rounded-lg p-4 mb-6 max-w-2xl mx-auto"
            >
              <motion.div 
                animate="visible"
                initial="hidden"
                variants={heartBeat}
                className="flex items-center justify-center space-x-2"
              >
                <Heart className="h-6 w-6 fill-current" />
                <span className="font-bold text-lg" data-editable data-editable-id="bachelorette-bride-free-banner">BRIDE CRUISES FREE with Disco Queen & Platinum!</span>
                <Heart className="h-6 w-6 fill-current" />
              </motion.div>
            </motion.div>

            {/* Scarcity Banner */}
            <motion.div 
              variants={fadeInUp}
              className="bg-red-600/90 backdrop-blur-sm rounded-lg p-4 mb-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-6 w-6 animate-pulse" />
                <span className="font-bold text-lg" data-editable data-editable-id="bachelorette-scarcity-text">Most weekends sell out 4-6 weeks early!</span>
              </div>
              <p className="text-sm mt-2" data-editable data-editable-id="bachelorette-scarcity-details">Books up SOLID at least a month in advance</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xl px-8 py-6"
                data-testid="button-hero-book-now-bachelorette"
              >
                <Calendar className="mr-2 h-6 w-6" />
                <span data-editable data-editable-id="bachelorette-hero-book-button">BOOK NOW - You'll Be the Hero!</span>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveTab('packages')}
                className="border-white text-white hover:bg-white hover:text-black font-bold"
                data-testid="button-hero-see-packages"
              >
                <span data-editable data-editable-id="bachelorette-hero-packages-button">See Packages & Pricing</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg"
            >
              <span data-editable data-editable-id="bachelorette-hero-tagline">Just <span className="text-pink-400 font-bold">SHOW UP & GET DOWN</span> - Everything Included!</span>
            </motion.p>
          </motion.div>
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

      {/* Combined Party Option Banner */}
      <section className="py-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">Planning a Combined <Link href="/bachelor-party-austin" className="text-primary hover:underline">Bachelor</Link> & Bachelorette Party?</h3>
                  <p className="text-white/90">Bring both sides together for one epic celebration on Lake Travis!</p>
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => navigate('/combined-bachelor-bachelorette-austin')}
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold whitespace-nowrap"
                data-testid="button-combined-party-option"
              >
                <PartyPopper className="mr-2 h-5 w-5" />
                Explore Combined Parties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2 h-auto p-1">
              <TabsTrigger value="overview" data-testid="tab-overview"><span data-editable data-editable-id="bachelorette-tab-overview">Overview</span></TabsTrigger>
              <TabsTrigger value="included" data-testid="tab-included"><span data-editable data-editable-id="bachelorette-tab-included">What's Included</span></TabsTrigger>
              <TabsTrigger value="packages" data-testid="tab-packages"><span data-editable data-editable-id="bachelorette-tab-packages">Packages</span></TabsTrigger>
              <TabsTrigger value="compare" data-testid="tab-compare"><span data-editable data-editable-id="bachelorette-tab-compare">Compare</span></TabsTrigger>
              <TabsTrigger value="faq" data-testid="tab-faq"><span data-editable data-editable-id="bachelorette-tab-faq">FAQs</span></TabsTrigger>
              <TabsTrigger value="photos" data-testid="tab-photos"><span data-editable data-editable-id="bachelorette-tab-photos">Photos</span></TabsTrigger>
              <TabsTrigger value="testimonials" data-testid="tab-testimonials"><span data-editable data-editable-id="bachelorette-tab-reviews">Reviews</span></TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelorette-overview-title">
                  Show Your Bride the <span className="text-pink-500">BEST Weekend</span> of Her Life!
                </h2>
                
                <div className="bg-pink-100 dark:bg-pink-950/30 border-2 border-pink-400 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-4 text-center" data-editable data-editable-id="bachelorette-overview-subtitle">
                    You'll Be the HERO - She'll Love You Forever!
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Trophy className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelorette-feature-1-title">The ONLY All-Inclusive Boat Party in Austin!</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-feature-1-description">The ONLY joint party in the country EXCLUSIVELY for Bach parties - this IS our specialty!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelorette-feature-2-title">Meet Bachelorette Parties from All Over!</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-feature-2-description">The energy is INCREDIBLE - everyone celebrating the same occasion! Create priceless memories together!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Waves className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelorette-feature-4-title">Dance on the BIGGEST Unicorn Float in the Country!</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-feature-4-description">Our GIANT 25-ft unicorn float is Instagram MAGIC - every bride goes wild for it!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Zap className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelorette-feature-5-title">Nothing to Plan, Nothing to Carry!</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-feature-5-description">Everything is ready on the boat - just order champagne and SHOW UP! FREE delivery from Party on Delivery!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Heart className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold" data-editable data-editable-id="bachelorette-feature-3-title">Bride Cruises FREE!</p>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-feature-3-description">With Disco Queen or Platinum packages (8+ paying guests) - flat-rate pricing makes splitting costs EASY!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Disco Day Experience */}
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-6" data-editable data-editable-id="bachelorette-timeline-title">
                    Your <span className="text-pink-500">Disco Day Experience</span>
                  </h3>
                  <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8" data-editable data-editable-id="bachelorette-timeline-subtitle">
                    SERIOUSLY the highlight of the weekend EVERY single time!
                  </p>
                  
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          1
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelorette-timeline-step-1-title">Arrival & Check-In (11:30 AM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-timeline-step-1-desc">
                          Meet at the dock - our crew welcomes your squad with open arms! Check-in is quick, grab your wristbands and party goodies. 
                          Your champagne delivery is ready (if pre-ordered) or grab bottles from the marina store!
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
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          2
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelorette-timeline-step-2-title">Boarding & Setup (11:45 AM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-timeline-step-2-desc">
                          Board and claim your bride tribe's spot! Your private cooler is ice-cold and ready. 
                          Set up the mimosas, grab cute cups and koozies, start vibing with other bachelorette squads!
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
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          3
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelorette-timeline-step-3-title">We Launch! Party Starts NOW! (12:00 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-timeline-step-3-desc">
                          DJ drops the beat and the party EXPLODES! Dance floor opens, mimosas flowing, 
                          energy through the ROOF! Professional photographer capturing every fabulous moment!
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
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          4
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelorette-timeline-step-4-title">Cruising Lake Travis (12:00-2:30 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-timeline-step-4-desc">
                          Dancing, celebrating, meeting bachelorette parties from all across America! The vibes are MAGICAL - 
                          everyone's celebrating their bride, music is PERFECT, and you're creating memories that last forever!
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
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          5
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelorette-timeline-step-5-title">Anchor Time! Float Party! (2:30-3:30 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-timeline-step-5-desc">
                          We anchor and the LEGENDARY UNICORN comes out! Jump in Lake Travis, lounge on lily pads, 
                          conquer the BIGGEST unicorn float in America! THE Instagram moment - photographer going WILD capturing it all!
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
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          6
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1" data-editable data-editable-id="bachelorette-timeline-step-6-title">Return & Last Dance (3:30-4:00 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-timeline-step-6-desc">
                          Head back with one EPIC final dance! DJ brings it home, everyone's singing along, 
                          Instagram handles exchanged with your new besties from around the country. You're the LEGEND who made this happen!
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-8 bg-green-50 dark:bg-green-950/20 border-2 border-green-500 rounded-lg p-6 text-center">
                    <p className="text-lg font-bold text-green-700 dark:text-green-400 mb-2" data-editable data-editable-id="bachelorette-timeline-result-title">
                      💕 The Result: Priceless Memories & Amazing Vibes! 💕
                    </p>
                    <p className="text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-timeline-result-desc">
                      Your bride tribe will talk about this for YEARS. You'll be the hero who planned the BEST bachelorette party ever!
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-lg">
                    <span data-editable data-editable-id="bachelorette-pricing-text">Starting at just <span className="text-pink-500 font-bold text-2xl">$85/person</span></span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">($109 with tax & tip)</span>
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400" data-editable data-editable-id="bachelorette-overview-details">
                    Friday & Saturday • 4 Hours on Lake Travis • Up to 50 People
                  </p>
                  
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold"
                    data-testid="button-overview-book-bachelorette"
                  >
                    <span data-editable data-editable-id="bachelorette-overview-book-button">Book Your Bachelorette Party Now</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <p className="text-sm text-red-600 font-semibold" data-editable data-editable-id="bachelorette-availability-warning">
                    ⚠️ Limited Availability - Spring & Summer books up fast!
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* What's Included Tab */}
            <TabsContent value="included" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4" data-editable data-editable-id="bachelorette-included-title">
                  EVERYTHING Included but Alcohol!
                </h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8" data-editable data-editable-id="bachelorette-included-subtitle">
                  Just SHOW UP & GET DOWN - We handle everything else
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {whatsIncluded.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-pink-50 dark:bg-gray-900 rounded-lg p-6"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-pink-200 dark:bg-pink-900/50 rounded-full">
                          <item.icon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2" data-editable data-editable-id={`bachelorette-included-item-${index}-title`}>{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" data-editable data-editable-id={`bachelorette-included-item-${index}-description`}>{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-purple-100 dark:bg-purple-950/30 border-2 border-purple-400 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold mb-4" data-editable data-editable-id="bachelorette-unicorn-title">Plus the BIGGEST Unicorn Float in the Country!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4" data-editable data-editable-id="bachelorette-unicorn-description">
                    Our GIANT 25-ft Inflatable Unicorn Float is Instagram-worthy and unforgettable
                  </p>
                  <Button
                    onClick={() => handleGetQuote()}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                    data-testid="button-included-book-bachelorette"
                  >
                    <span data-editable data-editable-id="bachelorette-included-reserve-button">Reserve Your Date Now</span>
                  </Button>
                </div>
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
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelorette-packages-title">
                      Choose Your Bachelorette Party Package
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {bachelorettePackages.map((pkg) => (
                        <Card 
                          key={pkg.id} 
                          className={cn(
                            "relative h-full",
                            pkg.popular && "border-2 border-pink-400 shadow-xl"
                          )}
                        >
                          {pkg.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                              <Badge className="bg-pink-500 text-white font-bold px-4 py-1" data-editable data-editable-id="bachelorette-most-popular-badge">
                                MOST POPULAR
                              </Badge>
                            </div>
                          )}
                          
                          {pkg.brideSpecial && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10 w-full text-center">
                              <Badge className="bg-purple-600 text-white text-xs px-3 py-1" data-editable data-editable-id="bachelorette-bride-free-badge">
                                BRIDE FREE!
                              </Badge>
                            </div>
                          )}
                          
                          <CardHeader className="text-center pb-4 pt-8">
                            <div className="flex justify-center mb-4">
                              <pkg.icon className="h-12 w-12 text-pink-500" />
                            </div>
                            <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                            <CardDescription className="text-sm mt-2">
                              {pkg.subtitle}
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <div className="text-center">
                              <div className="text-3xl font-bold">
                                ${pkg.price}/person
                              </div>
                              <div className="text-lg text-green-600 dark:text-green-400 font-semibold">
                                ${pkg.id === 'basic_bachelorette' ? '109' : pkg.id === 'disco_queen' ? '122' : '135'} with tax & tip
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
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <Button
                              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold"
                              onClick={() => handleGetQuote(pkg.id)}
                              data-testid={`button-package-${pkg.id}`}
                            >
                              Select This Package
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center">
                      <p className="text-lg mb-4">
                        All packages include: DJ, Photographer, Floats, Party Supplies & More!
                      </p>
                      <Badge className="bg-green-600 text-white">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Group Discounts Available for 10+ People
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
                  <DollarSign className="w-10 h-10 inline mr-3 text-green-600" />
                  The Math Doesn't Lie: Disco Cruise is the Best Deal for Brides
                </h2>
                <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
                  See exactly how much you save with the ATX Disco Cruise for any group size 💕
                </p>
                <DiscoVsPrivateValueCalculator />
                <div className="mt-12 text-center">
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xl px-8 py-6 h-auto"
                    data-testid="button-compare-book-bachelorette"
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    Book the Best Bachelorette Experience
                    <ArrowRight className="w-6 h-6 ml-3" />
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Meet other bachelorette parties from across the country for amazing vibes</p>
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
                      data-testid="button-why-choose-disco-bachelorette"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Explore ATX Disco Cruise
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
                  Frequently Asked Questions
                </h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item) => (
                    <AccordionItem 
                      key={item.id} 
                      value={item.id}
                      className="bg-pink-50 dark:bg-gray-900 rounded-lg px-6"
                    >
                      <AccordionTrigger 
                        className="text-left hover:no-underline"
                        data-testid={`faq-trigger-${item.id}`}
                      >
                        <span data-editable data-editable-id={`bachelorette-faq-${item.id}-question`}>{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400">
                        <span data-editable data-editable-id={`bachelorette-faq-${item.id}-answer`}>{item.answer}</span>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Card className="mt-8 bg-pink-100 dark:bg-pink-950/30 border-pink-400">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Still have questions?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Our team specializes in bachelorette parties - we're here to help!
                    </p>
                    <Button
                      onClick={() => handleGetQuote()}
                      variant="outline"
                      className="border-pink-400 text-pink-600 hover:bg-pink-400 hover:text-white"
                      data-testid="button-faq-contact"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat with Us
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
                  Bachelorette Party Vibes & Photos
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
                  <p className="text-lg mb-4" data-editable data-editable-id="bachelorette-photos-description">
                    Professional photography included - Instagram-worthy photos guaranteed!
                  </p>
                  <Button
                    onClick={() => handleGetQuote()}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold"
                    data-testid="button-photos-book-bachelorette"
                  >
                    <span data-editable data-editable-id="bachelorette-photos-book-button">Book Your Dream Bachelorette Party</span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelorette-testimonials-title">
                  What Brides Are Saying
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
                                <p className="font-semibold" data-editable data-editable-id={`bachelorette-testimonial-${testimonial.id}-name`}>{testimonial.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400" data-editable data-editable-id={`bachelorette-testimonial-${testimonial.id}-role`}>
                                  {testimonial.role} • {testimonial.location}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex mb-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 mb-3" data-editable data-editable-id={`bachelorette-testimonial-${testimonial.id}-text`}>
                              "{testimonial.text}"
                            </p>
                            
                            <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                              <span data-editable data-editable-id={`bachelorette-testimonial-${testimonial.id}-package`}>{testimonial.package}</span>
                            </Badge>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                <div className="mt-8 text-center">
                  <p className="text-lg mb-4" data-editable data-editable-id="bachelorette-testimonials-description">
                    Join thousands of happy brides who made their bachelorette party legendary!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold"
                    data-testid="button-testimonials-book-bachelorette"
                  >
                    <span data-editable data-editable-id="bachelorette-testimonials-success-button">Be the Next Success Story</span>
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-pink-400 text-white text-xl px-8 py-3 font-bold">
              <Sparkles className="w-6 h-6 mr-2 inline" /> ATX Disco Cruise
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
              Why You Should Book the <span className="text-pink-400">ATX Disco Cruise</span>
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-pink-400 mb-4">
              SHOW UP & GET DOWN!!
            </p>
            <p className="text-xl text-white/90 max-w-4xl mx-auto">
              The country's ONLY all-inclusive multi-group bachelorette party cruise. Here's why thousands of bride tribes choose us every year.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-7xl mx-auto"
          >
            <Accordion type="multiple" className="space-y-4">
              {/* Benefit 1: Show Up & Get Down */}
              <AccordionItem value="item-1" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-showup-bachelorette">
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-pink-400" />
                    <span>Just SHOW UP & GET DOWN! Everything's Included!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">Literally just show up with your champagne and PARTY! We provide absolutely everything else:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Professional DJ playing your favorite hits all day long</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Professional photographer capturing every fabulous moment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Private cooler with ice already set up for your bride tribe</span>
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
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-best-weekend-bachelorette">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-6 w-6 text-pink-400" />
                    <span>Show Your Bride the BEST Weekend of Her Life!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p>This isn't just another boat rental - it's a LEGENDARY experience that will be talked about for years! Your bride and squad will remember this as the most epic day of the entire bachelorette party weekend. With professional entertainment, amazing vibes, and the energy of multiple bachelorette parties celebrating together, this is THE highlight that makes your Austin bachelorette party unforgettable.</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 3: Highlight Every Time */}
              <AccordionItem value="item-3" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-highlight-bachelorette">
                  <div className="flex items-center gap-3">
                    <Star className="h-6 w-6 text-pink-400 fill-current" />
                    <span>It's the Highlight of The Weekend, EVERY. DAMN. TIME.</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p>Don't just take our word for it - after hosting thousands of bachelorette parties, we can confidently say this is THE most fun they've had in years. The combination of the beautiful lake, professional DJ, amazing energy from multiple bride tribes, and 4 full hours of non-stop partying creates an experience that consistently tops every other bachelorette party activity. Your squad will be talking about this for decades!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 4: Turnkey Convenience */}
              <AccordionItem value="item-4" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-turnkey-bachelorette">
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-pink-400" />
                    <span>You've Got Enough to Worry About! We Handle Everything!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">Planning a bachelorette party is stressful enough. Don't deal with:</p>
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
                  <p className="font-bold text-pink-400">Everything is ready when you arrive - just bring your champagne and GET DOWN!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 5: Multi-Group Party */}
              <AccordionItem value="item-5" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-multi-group-bachelorette">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-pink-400" />
                    <span>Party With Other Bachelorette Parties from All Over America!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">This is what makes the ATX Disco Cruise TRULY unique - you're not alone on the boat! We host multiple bachelorette parties from across the country, all celebrating together:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Meet bride tribes from California, New York, Florida, and everywhere in between</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Everyone's there for the SAME REASON - to celebrate their bride and go CRAZY!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>The energy is MAGICAL when everyone's celebrating together</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Make new friends, exchange stories, and create a party atmosphere that's UNMATCHED</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 6: Best Value */}
              <AccordionItem value="item-6" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-value-bachelorette">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-pink-400" />
                    <span>Cheaper Per Person Than a Private Cruise (Most of the Time!)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">For smaller groups (under 15 people), the ATX Disco Cruise is ALWAYS the better deal:</p>
                  <div className="bg-black/30 rounded-lg p-4 mb-3">
                    <p className="font-bold text-pink-400 mb-2">Private Boat Math:</p>
                    <p>$2,000 private rental ÷ 10 people = $200/person (and you still need to buy supplies!)</p>
                  </div>
                  <div className="bg-green-900/30 rounded-lg p-4">
                    <p className="font-bold text-green-400 mb-2">Disco Cruise Math:</p>
                    <p>$95/person ALL-INCLUSIVE with DJ, photographer, supplies, and MORE!</p>
                  </div>
                  <p className="mt-3 font-bold">You get WAY more value for WAY less money!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 7: You'll Be With Your Girls */}
              <AccordionItem value="item-7" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-girls-weekend-bachelorette">
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-pink-400 fill-current" />
                    <span>You'll Be With Your Girls All Weekend - Make It Count!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">This is a special time - your bride tribe is together for her big weekend! Make it extraordinary:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Create memories that will last a lifetime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>Give your bride an experience she'll NEVER forget</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>The ATX Disco Cruise is THE highlight every single time</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 8: Disco Attire */}
              <AccordionItem value="item-8" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-disco-attire-bachelorette">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-pink-400" />
                    <span>Dress Up In Your Finest Disco Attire!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">While it's not required, we STRONGLY encourage dressing up in disco attire! Think:</p>
                  <ul className="space-y-2 ml-6 mb-3">
                    <li>• Sequined dresses and jumpsuits</li>
                    <li>• Platform shoes and funky sunglasses</li>
                    <li>• Feather boas and glitter everything</li>
                    <li>• Go full disco diva!</li>
                  </ul>
                  <p className="font-bold text-pink-400">The bride tribes that dress up have 10X MORE FUN and get AMAZING photos!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 9: People Watching */}
              <AccordionItem value="item-9" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-people-watching-bachelorette">
                  <div className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-pink-400" />
                    <span>Watch Everyone Celebrate & Go Nuts - Best People Watching on Earth!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p>Seeing 3-4 different bachelorette parties all going wild at the same time is PRICELESS entertainment in itself! Watch bride tribes in fabulous costumes, see different celebration styles from across America, witness epic dance-offs, and be part of the most energetic party atmosphere you've ever experienced. It's a show within a party within a cruise!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 10: Nothing Compares */}
              <AccordionItem value="item-10" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-nothing-compares-bachelorette">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-pink-400" />
                    <span>Nothing Else Compares - We're Miles Ahead!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">We've analyzed every bachelorette party option in Austin and across America:</p>
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
                  <p className="font-bold text-pink-400">The ATX Disco Cruise is in a league of its own - nothing else offers this combination of value, fun, and unique experience!</p>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 11: Proven Track Record */}
              <AccordionItem value="item-11" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-track-record-bachelorette">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-pink-400" />
                    <span>You're In Good Hands - 14 Years, ZERO Incidents!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">Safety and fun go hand-in-hand with Premier Party Cruises:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>14+ years of operating bachelorette parties on Lake Travis</span>
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
                      <span>Thousands of 5-star reviews from satisfied bride tribes</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 12: Split Payment */}
              <AccordionItem value="item-12" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-split-payment-bachelorette">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-pink-400" />
                    <span>Split Payment With Your Group - Easy as 1-2-3!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <p className="mb-3">No more chasing people down for Venmo payments! Our split payment option makes it EASY:</p>
                  <div className="space-y-3 ml-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-pink-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <p>Share the payment link with your bride tribe</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-pink-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <p>Everyone pays their own share directly</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-pink-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <p>No awkward money conversations or fronting thousands of dollars!</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Benefit 13: Stress-Free Booking */}
              <AccordionItem value="item-13" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                <AccordionTrigger className="text-xl font-bold hover:text-pink-400" data-testid="accordion-stress-free-bachelorette">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-pink-400" />
                    <span>Stress-Free Booking Process - But Don't Sleep On It!</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/90 text-lg pt-4">
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-pink-400 mb-2">Super Easy to Book:</p>
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
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-2xl px-16 py-8"
                data-testid="button-why-book-cta-bachelorette"
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

      {/* The Lemonade Disco - Weather Guarantee Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
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
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-pink-600">Lemonade Disco</span>
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
                        <span>Drinks provided for the bride tribe</span>
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
                        <span>Perfect peace of mind for out-of-town bride tribes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span>Your bachelorette party happens NO MATTER WHAT</span>
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
                    No other bachelorette party experience in America offers this level of weather protection. 
                    That's just one more reason why we're #1!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <PartyPlanningChecklist partyType="Bachelorette Party" eventType="bachelorette celebration" />

      {/* 10 Reasons Why Austin Section */}
      <section className="py-20 bg-gradient-to-br from-pink-600 via-purple-700 to-pink-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-6"
              data-testid="heading-austin-reasons-bachelorette"
            >
              10 Reasons Why Austin is the Best Place for Bachelorette Parties
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover why Austin bachelorette parties are legendary and why Lake Travis is the ultimate destination for your bride tribe
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Waves className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">Lake Travis - Crystal Clear Waters</h3>
                  </div>
                  <p className="text-white/90">
                    Austin's Lake Travis offers the clearest water in Texas with 270 miles of pristine shoreline. Perfect weather year-round means your Austin bachelorette party can happen any season.
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Music className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">World-Famous Nightlife</h3>
                  </div>
                  <p className="text-white/90">
                    6th Street, Rainey Street, and the Warehouse District make Austin the live music capital with incredible nightlife. Your bachelorette party Austin experience includes the best bars and clubs in Texas.
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Utensils className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">Unbeatable Food Scene</h3>
                  </div>
                  <p className="text-white/90">
                    Austin's food trucks, BBQ joints, and award-winning restaurants create the perfect bachelorette party fuel. From Franklin BBQ to food truck tacos, Austin bachelorette parties eat like queens.
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">No State Income Tax</h3>
                  </div>
                  <p className="text-white/90">
                    Your Austin bachelorette party budget goes further - Texas has no state income tax, so drinks, activities, and entertainment cost less than other major cities.
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Sun className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">Perfect Year-Round Weather</h3>
                  </div>
                  <p className="text-white/90">
                    Austin's 300 days of sunshine per year mean your bachelorette party Austin celebration happens rain or shine. Lake Travis maintains a constant 70-degree water temperature.
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    6
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">30 Minutes from Everything</h3>
                  </div>
                  <p className="text-white/90">
                    Austin bachelorette parties access Lake Travis party boats in 30 minutes, downtown bars in 20 minutes, and Hill Country wineries in 45 minutes. Everything's close.
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    7
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Anchor className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">Party Boat Capital</h3>
                  </div>
                  <p className="text-white/90">
                    Austin is home to Premier Party Cruises - the longest-running party boat company on Lake Travis with 15+ years of experience and 100,000+ happy customers.
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    8
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">Diverse Entertainment Options</h3>
                  </div>
                  <p className="text-white/90">
                    Your Austin bachelorette party can include party boats, wine tours, spa days, live music, rooftop bars, and more all in one weekend.
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    9
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">Bachelorette-Friendly Atmosphere</h3>
                  </div>
                  <p className="text-white/90">
                    Austin welcomes bachelorette parties with open arms. The city's 'Keep Austin Weird' culture means anything goes and everyone's welcome.
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
                  <div className="w-12 h-12 rounded-full bg-pink-400 text-white font-bold text-xl flex items-center justify-center">
                    10
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Plane className="h-8 w-8 text-pink-300" />
                    <h3 className="text-2xl font-bold text-white">Easy Airport Access</h3>
                  </div>
                  <p className="text-white/90">
                    Austin-Bergstrom International Airport serves 150+ destinations. Your Austin bachelorette party guests fly in easily from anywhere in the country.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={() => handleGetQuote()}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xl px-12 py-6"
              data-testid="button-austin-reasons-book-bachelorette"
            >
              <Calendar className="mr-2 h-6 w-6" />
              Book Your Austin Bachelorette Party Now
            </Button>
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
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold font-heading mb-4">
              Related Austin Party Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Planning more than just a bachelorette party? Explore our full range of Lake Travis party boat experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/bachelor-party-austin">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <Crown className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Bachelor Party Austin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Epic bachelor parties on Lake Travis with ATX Disco Cruises, professional DJ, photographer, and all-inclusive packages.
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Bachelor Parties
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
                    <CardTitle className="text-2xl text-center">Combined Bachelor/Bachelorette</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Joint celebrations for couples celebrating together with friends from both sides on Lake Travis.
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
              <Link href="/party-boat-lake-travis">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Ship className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Party Boat Lake Travis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      All our Lake Travis party boat options including private charters, disco cruises, and custom experiences.
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
              <span className="text-sm font-semibold" data-editable data-editable-id="bachelorette-sticky-footer-urgency">Limited Availability - Books 4-6 weeks out!</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-600 text-white animate-pulse">
                <Heart className="h-3 w-3 mr-1" />
                <span data-editable data-editable-id="bachelorette-sticky-footer-bride-badge">Bride FREE!</span>
              </Badge>
              <Button
                onClick={() => handleGetQuote()}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold"
                data-testid="button-sticky-book-bachelorette"
              >
                <span data-editable data-editable-id="bachelorette-sticky-footer-button">Book Bachelorette Party Now</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 pb-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
              MORE LAKE TRAVIS PARTY EXPERIENCES
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover other Austin party boat options for your perfect celebration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/bachelor-party-austin" data-testid="link-bachelor-from-bachelorette">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-pink-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelor Party Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Sister service - Epic bachelor party boat cruises on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/combined-bachelor-bachelorette-austin" data-testid="link-combined-from-bachelorette">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-pink-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Combined Party Cruises</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Bachelor and bachelorette groups party together on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/private-cruises" data-testid="link-private-from-bachelorette">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-pink-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Bachelorette Charters</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Exclusive private boat rentals for your bridal party on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery" data-testid="link-gallery-from-bachelorette">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-pink-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Photo Gallery</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Real photos from our Austin bachelorette party boat cruises</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" data-testid="link-contact-from-bachelorette">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-pink-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Get your custom bachelorette party quote today</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/" data-testid="link-home-from-bachelorette">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-pink-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">All Services</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">View all our Lake Travis party cruise experiences</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Hidden Crawlable Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/Service">
        <h2>Bachelorette Party Austin - Lake Travis Party Boat Packages</h2>
        
        {/* ATX Disco Cruise Packages */}
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Basic Bach Package - Bachelorette Party Austin</h3>
          <meta itemProp="price" content="85.00" />
          <meta itemProp="priceCurrency" content="USD" />
          <p itemProp="description">$85 per person bachelorette party Austin package on Lake Travis party boat. Join the BEST Party on Lake Travis, Exclusively for Bach Parties! BYOB, throw your drinks in a shared cooler with ice. Alcohol Delivery and Lunch Delivery Available. ALWAYS Cheaper than a Private Cruise. If you're trying to keep it cheap, this is your move for your bachelorette party Austin celebration!</p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content="85.00" />
            <meta itemProp="priceCurrency" content="USD" />
            <link itemProp="availability" href="https://schema.org/InStock" />
            <link itemProp="url" href="https://premierpartycruises.com/bachelorette-party-austin" />
          </div>
        </div>
        
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Disco Queen Package - Bachelorette Party Lake Travis</h3>
          <meta itemProp="price" content="95.00" />
          <meta itemProp="priceCurrency" content="USD" />
          <p itemProp="description">$95 per person Disco Queen bachelorette party package on Lake Travis party boat Austin. BRIDE CRUISES FREE with this package! Private Cooler with Ice and Storage Bin for Your Group. Reserved Spot for Your Group. Disco Ball Cup and Bubble Gun for the Bride. Complimentary Direct-to-Boat Alcohol and Lunch Delivery. 25% Discount on Round-Trip Transportation. $50-$100 Voucher for Airbnb Booze Delivery. Most Popular bachelorette party Austin package - That Happens to be Our Specialty!</p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content="95.00" />
            <meta itemProp="priceCurrency" content="USD" />
            <link itemProp="availability" href="https://schema.org/InStock" />
            <link itemProp="url" href="https://premierpartycruises.com/bachelorette-party-austin" />
          </div>
        </div>
        
        <div itemScope itemType="https://schema.org/Service">
          <h3 itemProp="name">Super Sparkle Platinum Disco - Ultimate Bachelorette Party Austin</h3>
          <meta itemProp="price" content="105.00" />
          <meta itemProp="priceCurrency" content="USD" />
          <p itemProp="description">$105 per person Platinum bachelorette party Lake Travis package. BRIDE CRUISES FREE with this package! Everything in the Disco Queen Package. Personal Unicorn Float for the Bride. Mimosa Setup with Champagne Flutes, 3 Juices, and a Chambong! $100 Voucher for Airbnb Concierge Services. Towel Service and SPF-50 Spray Sunscreen Provided. Nothing to Carry, Cooler Stocked with drinks When You Arrive! Ultimate all-inclusive Austin bachelorette party luxury on Lake Travis party boat.</p>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content="105.00" />
            <meta itemProp="priceCurrency" content="USD" />
            <link itemProp="availability" href="https://schema.org/InStock" />
            <link itemProp="url" href="https://premierpartycruises.com/bachelorette-party-austin" />
          </div>
        </div>
        
        {/* What's Included - Bachelorette Party Austin */}
        <h3>What's Included in Every Bachelorette Party Austin Package</h3>
        <ul>
          <li>Professional DJ Playing your favorites ALL DAY - bachelorette party starts when you arrive on Lake Travis party boat</li>
          <li>Professional Photographer - Capture every magical bachelorette party Austin moment with Instagram-worthy photos</li>
          <li>Private Cooler with Ice - Your bridal squad's own cooler, fully stocked with ice on Lake Travis</li>
          <li>Mimosa Supplies - Juice, fresh fruit - just add champagne for your bachelorette party Austin</li>
          <li>Multiple Lily Pad Floats - 3 huge 6x20' floats to lounge in style on Lake Travis party boat</li>
          <li>Party Supplies - Cups, koozies, name tags, bubbles - all included for bachelorette party Austin!</li>
          <li>Ice Water Stations - Stay hydrated with unlimited ice water on Lake Travis</li>
          <li>Clean Restroom - Full restroom facilities on board our bachelorette party boat</li>
          <li>Plenty of Shade - Covered areas to escape the Texas sun during your Lake Travis bachelorette party</li>
        </ul>
        
        {/* Private Cruise Options for Bachelorette Party Austin */}
        <h3>Private Bachelorette Party Cruises on Lake Travis</h3>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelorette Party Cruise 14 Guests - Lake Travis</h4>
          <p itemProp="description">Private bachelorette party boat for up to 14 guests on Lake Travis. Monday-Thursday from $1,050, Friday from $1,181, Saturday from $1,838, Sunday from $1,313. Exclusive private charter for your bachelorette party Austin group.</p>
        </div>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelorette Party Cruise 25 Guests - Lake Travis Party Boat</h4>
          <p itemProp="description">Private Lake Travis party boat for 15-25 bachelorette party guests. Monday-Thursday from $1,181, Friday from $1,313, Saturday from $1,969, Sunday from $1,444. Perfect size for bachelorette party Austin celebrations.</p>
        </div>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelorette Party Cruise 30 Guests - Austin Party Boat</h4>
          <p itemProp="description">Lake Travis bachelorette party boat for 26-30 guests. Monday-Thursday from $1,381, Friday from $1,513, Saturday from $2,169, Sunday from $1,644. Ideal for larger bachelorette party Austin groups.</p>
        </div>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelorette Party Cruise 50 Guests - Large Lake Travis Boat</h4>
          <p itemProp="description">Large bachelorette party boat Lake Travis for 31-50 guests. Monday-Thursday from $1,313, Friday from $1,444, Saturday from $2,100, Sunday from $1,575. Spacious Lake Travis party boat for big bachelorette party Austin celebrations.</p>
        </div>
        <div itemScope itemType="https://schema.org/Service">
          <h4 itemProp="name">Private Bachelorette Party Cruise 75 Guests - Mega Lake Travis Party Boat</h4>
          <p itemProp="description">Mega bachelorette party boat on Lake Travis for 51-75 guests. Monday-Thursday from $1,613, Friday from $1,744, Saturday from $2,400, Sunday from $1,875. Largest Lake Travis party boat option for massive bachelorette party Austin events.</p>
        </div>
        
        {/* Keywords Integration */}
        <p>Looking for the ultimate bachelorette party Austin experience? Our Lake Travis party boat cruises offer the best bachelorette party packages in Austin. Whether you choose our affordable ATX Disco Cruise bachelorette party (where the bride cruises FREE on select packages!) or a private Lake Travis bachelorette party boat charter, we guarantee an unforgettable celebration. Book your bachelorette party Austin today on our premier Lake Travis party boat!</p>
      </div>

      {/* JSON-LD Structured Data for Bachelorette Party Services */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Bachelorette Party Boat Cruises",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "description": "Austin's #1 bachelorette party boat experience on Lake Travis - Bride cruises FREE on select packages!",
            "url": "https://premierpartycruises.com",
            "telephone": "(512) 488-5892",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "13993 FM2769",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "postalCode": "78641",
              "addressCountry": "US"
            },
            "areaServed": {
              "@type": "City",
              "name": "Austin"
            }
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Bachelorette Party Packages Austin",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Basic Bach Package - Bachelorette Party Austin",
                  "description": "Join the BEST Party on Lake Travis, Exclusively for Bach Parties! BYOB bachelorette party boat experience"
                },
                "price": "85.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://premierpartycruises.com/bachelorette-party-austin"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Disco Queen Package - Bachelorette Party Lake Travis",
                  "description": "Private cooler, reserved spot, BRIDE CRUISES FREE, and premium bachelorette party amenities on Lake Travis"
                },
                "price": "95.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://premierpartycruises.com/bachelorette-party-austin"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Super Sparkle Platinum Disco - Ultimate Bachelorette Party",
                  "description": "All-inclusive VIP bachelorette party boat experience on Lake Travis with BRIDE CRUISES FREE, unicorn float, and full amenities"
                },
                "price": "105.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://premierpartycruises.com/bachelorette-party-austin"
              }
            ]
          }
        })
      }} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
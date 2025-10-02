import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
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
import { DISCO_PRICING } from '@shared/constants';
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
  Gem, Flower, Flower2, CircleDot, Smile
} from 'lucide-react';

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
  { id: 1, src: heroImage2, alt: 'ATX Disco Cruise party' },
  { id: 2, src: heroImage3, alt: 'Dancing on the cruise' },
  { id: 3, src: galleryImage1, alt: 'Bachelorette party vibes' },
  { id: 4, src: floatImage, alt: 'Giant unicorn float' },
  { id: 5, src: galleryImage2, alt: 'Party atmosphere' },
  { id: 6, src: boatImage1, alt: 'Day Tripper boat' },
  { id: 7, src: galleryImage3, alt: 'Lake Travis party' },
  { id: 8, src: boatImage2, alt: 'Meeseeks boat' }
];

export default function BacheloretteParty() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const heroImages = [heroImage2, heroImage3, galleryImage1];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGetQuote = (packageId?: string) => {
    const params = new URLSearchParams({ cruiseType: 'bachelorette' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/bachelorette-party"
        defaultTitle="Austin Bachelorette Party Boat Cruises | ATX Disco Cruise | Lake Travis"
        defaultDescription="The Ultimate Bachelorette Party Cruise Experience! Join the ONLY all-inclusive boat party in Austin exclusively for bach parties. Bride cruises FREE! Professional DJ, photographer, and everything included. Book now!"
        defaultKeywords={['Austin bachelorette party', 'Lake Travis bachelorette party', 'ATX Disco Cruise', 'bachelorette party boat Austin']}
        schemaType="event"
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
                alt="Austin Bachelorette Party ATX Disco Cruise"
                className="w-full h-full object-cover"
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
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              data-editable data-editable-id="bachelorette-hero-title"
            >
              The Ultimate Bachelorette Party<br/>
              <span className="text-pink-400">Cruise Experience</span>
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
              className="flex flex-col sm:flex-row gap-4 justify-center"
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
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelorette-overview-title">
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
                        <p className="font-semibold">Dance on the BIGGEST Unicorn Float in the Country!</p>
                        <p className="text-gray-600 dark:text-gray-400">Our GIANT 25-ft unicorn float is Instagram MAGIC - every bride goes wild for it!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Zap className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Nothing to Plan, Nothing to Carry!</p>
                        <p className="text-gray-600 dark:text-gray-400">Everything is ready on the boat - just order champagne and SHOW UP! FREE delivery from Party on Delivery!</p>
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
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Your <span className="text-pink-500">Disco Day Experience</span>
                  </h3>
                  <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
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
                        <h4 className="font-bold text-lg mb-1">Arrival & Check-In (11:30 AM)</h4>
                        <p className="text-gray-600 dark:text-gray-400">
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
                        <h4 className="font-bold text-lg mb-1">Boarding & Setup (11:45 AM)</h4>
                        <p className="text-gray-600 dark:text-gray-400">
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
                        <h4 className="font-bold text-lg mb-1">We Launch! Party Starts NOW! (12:00 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400">
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
                        <h4 className="font-bold text-lg mb-1">Cruising Lake Travis (12:00-2:30 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400">
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
                        <h4 className="font-bold text-lg mb-1">Anchor Time! Float Party! (2:30-3:30 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400">
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
                        <h4 className="font-bold text-lg mb-1">Return & Last Dance (3:30-4:00 PM)</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Head back with one EPIC final dance! DJ brings it home, everyone's singing along, 
                          Instagram handles exchanged with your new besties from around the country. You're the LEGEND who made this happen!
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-8 bg-green-50 dark:bg-green-950/20 border-2 border-green-500 rounded-lg p-6 text-center">
                    <p className="text-lg font-bold text-green-700 dark:text-green-400 mb-2">
                      💕 The Result: Priceless Memories & Amazing Vibes! 💕
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your bride tribe will talk about this for YEARS. You'll be the hero who planned the BEST bachelorette party ever!
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-lg">
                    <span data-editable data-editable-id="bachelorette-pricing-text">Starting at just <span className="text-pink-500 font-bold text-2xl">$85/person</span></span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">($98 with tax & tip)</span>
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
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-editable data-editable-id="bachelorette-included-title">
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
                          <h3 className="font-semibold mb-1" data-editable data-editable-id={`bachelorette-included-item-${index}-title`}>{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400" data-editable data-editable-id={`bachelorette-included-item-${index}-description`}>{item.description}</p>
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
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" data-editable data-editable-id="bachelorette-packages-title">
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
                            ${pkg.id === 'basic_bachelorette' ? '98' : pkg.id === 'disco_queen' ? '111' : '124'} with tax & tip
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

            {/* Compare Tab */}
            <TabsContent value="compare" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  Disco Cruise vs Private Cruise
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Disco Cruise */}
                  <Card className="border-2 border-pink-400">
                    <CardHeader className="bg-pink-100 dark:bg-pink-950/30">
                      <CardTitle className="flex items-center justify-between">
                        <span>ATX Disco Cruise</span>
                        <Badge className="bg-green-600 text-white">BEST VALUE</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-2xl font-bold">$85-$105</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">per person</p>
                        </div>
                        
                        <div className="bg-purple-100 dark:bg-purple-950/30 rounded-lg p-3">
                          <p className="font-semibold text-purple-700 dark:text-purple-400">
                            💕 Bride Cruises FREE with Disco Queen/Platinum!
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="font-semibold">Perfect for groups of 8-20</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Example: 12 girls = $1,140 total (or less with bride free!)
                          </p>
                        </div>
                        
                        <div className="border-t pt-4">
                          <p className="font-semibold mb-2">What You Get:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Professional DJ all day</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Professional photographer</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Giant unicorn float</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>All party supplies included</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Party atmosphere with other groups</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>48-hour refund policy</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Private Cruise */}
                  <Card className="border-2 border-gray-300">
                    <CardHeader className="bg-gray-100 dark:bg-gray-800">
                      <CardTitle>Private Cruise</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-2xl font-bold">$1,700+</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">base price (before tax/gratuity)</p>
                        </div>
                        
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            No special bride perks or packages
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="font-semibold">4-hour minimum</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Example: $2,100+ with tax & gratuity
                          </p>
                        </div>
                        
                        <div className="border-t pt-4">
                          <p className="font-semibold mb-2">What You Get:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Captain and boat</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Empty coolers</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Bluetooth speaker</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                              <span className="h-4 w-4 ml-1">❌</span>
                              <span>No DJ or entertainment</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                              <span className="h-4 w-4 ml-1">❌</span>
                              <span>No photographer</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                              <span className="h-4 w-4 ml-1">❌</span>
                              <span>No party atmosphere</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-lg mb-4">
                    💡 <span className="font-semibold">Pro Tip:</span> For bachelorette groups under 20, the Disco Cruise is always the better value!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold"
                    data-testid="button-compare-book-bachelorette"
                  >
                    Book the Disco Cruise & Save!
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faq" className="mt-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
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
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400">
                        {item.answer}
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
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
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
                  <p className="text-lg mb-4">
                    Professional photography included - Instagram-worthy photos guaranteed!
                  </p>
                  <Button
                    onClick={() => handleGetQuote()}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold"
                    data-testid="button-photos-book-bachelorette"
                  >
                    Book Your Dream Bachelorette Party
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  What Brides Are Saying
                </h2>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {testimonials.map((testimonial) => (
                      <CarouselItem key={testimonial.id} className="md:basis-1/2">
                        <Card className="h-full">
                          <CardContent className="pt-6">
                            <div className="flex items-center mb-4">
                              <span className="text-4xl mr-4">{testimonial.avatar}</span>
                              <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {testimonial.role} • {testimonial.location}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex mb-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                              "{testimonial.text}"
                            </p>
                            
                            <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                              {testimonial.package}
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
                  <p className="text-lg mb-4">
                    Join thousands of happy brides who made their bachelorette party legendary!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold"
                    data-testid="button-testimonials-book-bachelorette"
                  >
                    Be the Next Success Story
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Sticky CTA Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t shadow-lg z-40 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 animate-pulse" />
              <span className="text-sm font-semibold">Limited Availability - Books 4-6 weeks out!</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-600 text-white animate-pulse">
                <Heart className="h-3 w-3 mr-1" />
                Bride FREE!
              </Badge>
              <Button
                onClick={() => handleGetQuote()}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold"
                data-testid="button-sticky-book-bachelorette"
              >
                Book Bachelorette Party Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
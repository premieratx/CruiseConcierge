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
import { DISCO_PRICING } from '@shared/constants';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
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
  Plane, Wine
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

// Combined party packages - gender-neutral
const combinedPartyPackages = [
  {
    id: 'basic_combined',
    name: 'Basic Combined Package',
    price: DISCO_PRICING.basic / 100,
    originalPrice: null,
    description: 'Join the BEST Party on Lake Travis - Guys & Girls Together!',
    subtitle: 'BYOB & Keep it Affordable - Perfect for Budget-Conscious Groups',
    features: [
      'Join the ultimate party cruise with friends from both sides!',
      'BYOB, shared cooler with ice for everyone',
      'Alcohol & food delivery available to the boat',
      'ALWAYS more affordable than separate parties',
      'Perfect for groups who want to celebrate together'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value',
    coupleSpecial: false
  },
  {
    id: 'party_squad',
    name: 'Party Squad Package',
    price: DISCO_PRICING.disco_queen / 100,
    originalPrice: 125,
    description: 'Our signature combined party experience - The Ultimate Group Celebration!',
    subtitle: 'Private Cooler & Reserved Area for Your Entire Crew',
    features: [
      '🎉 Both Bride & Groom can cruise FREE (conditions apply)!',
      'Private Cooler w/Ice & Storage for Your Entire Group',
      'Reserved Spot for Your Combined Party',
      'Special Celebration Items for the Happy Couple',
      'Complimentary Direct-to-Boat Alcohol & Food Delivery',
      '25% Discount on Round-Trip Transportation',
      '$50-$100 Voucher for Airbnb Delivery Services'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular',
    coupleSpecial: true
  },
  {
    id: 'ultimate_celebration',
    name: 'Ultimate Celebration Package',
    price: DISCO_PRICING.platinum / 100,
    originalPrice: 140,
    description: 'All-inclusive luxury for the ultimate combined bachelor/bachelorette party',
    subtitle: 'Everything Ready When You Arrive - Just Show Up & Party!',
    features: [
      '🎉 Both Bride & Groom cruise FREE with this package!',
      'Everything in the Party Squad Package',
      'Premium Party Floats for the Entire Group',
      'Mixology Setup w/Champagne, Juices & Party Supplies',
      '$100 Voucher for Airbnb Concierge Services',
      'Towel Service & SPF-50 Spray Sunscreen for Everyone',
      'Completely Turnkey - Cooler Stocked, Everything Ready!'
    ],
    popular: false,
    icon: Trophy,
    badge: 'All-Inclusive VIP',
    coupleSpecial: true
  }
];

// What's included for combined parties
const whatsIncluded = [
  {
    icon: Music,
    title: 'Professional DJ',
    description: 'Playing music everyone loves - guys and girls both enjoy the vibe!'
  },
  {
    icon: Camera,
    title: 'Professional Photographer',
    description: 'Capture epic group photos with all your friends together'
  },
  {
    icon: Anchor,
    title: 'Private Group Cooler',
    description: 'Dedicated cooler space for your combined group, fully iced'
  },
  {
    icon: GlassWater,
    title: 'Party Supplies',
    description: 'Mixers, cups, ice - everything both guys and girls need'
  },
  {
    icon: Waves,
    title: 'Multiple Party Floats',
    description: 'Giant floats everyone can enjoy on the water'
  },
  {
    icon: Gift,
    title: 'Celebration Essentials',
    description: 'Cups, koozies, party supplies for the entire crew!'
  },
  {
    icon: Droplets,
    title: 'Ice Water Stations',
    description: 'Keep everyone hydrated throughout the party'
  },
  {
    icon: Shield,
    title: 'Clean Restrooms',
    description: 'Full facilities on board for everyone'
  },
  {
    icon: Sun,
    title: 'Shaded Areas',
    description: 'Plenty of covered space to escape the sun'
  }
];

// FAQs for combined parties - corrected content
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
    id: 'split-payment',
    question: 'Can we split payments?',
    answer: 'Yes—split payment options available at checkout.'
  },
  {
    id: 'different-preferences',
    question: 'What if guys & girls want different things?',
    answer: 'Plenty of zones: floats, DJ, lounge. BYOB keeps it flexible.'
  },
  {
    id: 'couple-free',
    question: 'Do the bride & groom cruise free?',
    answer: 'Yes, with Party Squad or Ultimate Package (16+ paying guests).'
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

// Combined party testimonials
const testimonials = [
  {
    id: 1,
    name: 'Mike & Jessica Turner',
    role: 'Bride & Groom',
    location: 'Austin, TX',
    rating: 5,
    text: "Best decision EVER! Our friends from both sides got to know each other before the wedding, and now they're all friends. The party was LEGENDARY - everyone still talks about it. Way better than doing separate parties!",
    avatar: '💑',
    package: 'Ultimate Celebration Package'
  },
  {
    id: 2,
    name: 'Brad Morrison',
    role: 'Best Man',
    location: 'Houston, TX',
    rating: 5,
    text: "Planning a combined party was WAY easier than I thought! Premier handled everything - DJ was bumping, everyone had a blast. The guys loved the floats, the girls loved the DJ, and we all partied together. Epic day!",
    avatar: '🎉',
    package: 'Party Squad Package'
  },
  {
    id: 3,
    name: 'Sarah & David Chen',
    role: 'Bride & Groom',
    location: 'Dallas, TX',
    rating: 5,
    text: "Our friends are basically one big crew anyway, so a combined party made perfect sense. <Link href='/party-boat-lake-travis' className='text-primary hover:underline'>Lake Travis</Link> was GORGEOUS, the boat had room for everyone, and the vibe was incredible. Both of us cruised free too!",
    avatar: '👫',
    package: 'Party Squad Package'
  },
  {
    id: 4,
    name: 'Alex Martinez',
    role: 'Maid of Honor',
    location: 'San Antonio, TX',
    rating: 5,
    text: "I was skeptical about combining parties but WOW was I wrong! The energy with everyone together was INSANE. The DJ read the room perfectly, photographer got amazing group shots, and everyone made new friends!",
    avatar: '✨',
    package: 'Ultimate Celebration Package'
  },
  {
    id: 5,
    name: 'Tom & Rachel Williams',
    role: 'Bride & Groom',
    location: 'Round Rock, TX',
    rating: 5,
    text: "This is the future of bachelor/bachelorette parties! Why separate when you can celebrate together? Our crew had the time of their lives - dancing, swimming, partying on the water. ZERO complaints, ALL smiles!",
    avatar: '🚢',
    package: 'Party Squad Package'
  },
  {
    id: 6,
    name: 'Kevin Patel',
    role: 'Best Man',
    location: 'Plano, TX',
    rating: 5,
    text: "Coordinating with the MOH to plan this was smooth! Premier made everything easy. Both crews loved it - the guys were impressed, the girls had a blast, and seeing everyone party together was awesome!",
    avatar: '🎊',
    package: 'Basic Combined Package'
  },
  {
    id: 7,
    name: 'Amanda & Chris Johnson',
    role: 'Bride & Groom',
    location: 'Cedar Park, TX',
    rating: 5,
    text: "Our friends became FAMILY after this party! There's something special about everyone celebrating us together. The professional photos are incredible - both sides laughing and having fun. Priceless memories!",
    avatar: '💕',
    package: 'Ultimate Celebration Package'
  },
  {
    id: 8,
    name: 'Lisa Rodriguez',
    role: 'Bridesmaid',
    location: 'Georgetown, TX',
    rating: 5,
    text: "Meeting the groom's friends on the boat was so much fun! We all bonded over the music, floats, and good vibes. By the end, we were all one big party crew. The wedding was even better because we all knew each other!",
    avatar: '🥳',
    package: 'Party Squad Package'
  }
];

// Photo gallery items
const galleryPhotos = [
  { id: 1, src: heroImage2, alt: 'Combined Bachelor Bachelorette Austin party on Lake Travis party boat' },
  { id: 2, src: heroImage3, alt: 'Party Boat Austin friends dancing on Lake Travis cruise' },
  { id: 3, src: galleryImage1, alt: 'Combined Bachelor Bachelorette Austin mixed group party vibes on Lake Travis' },
  { id: 4, src: floatImage, alt: 'Lake Travis Party floats on Party Boat Austin' },
  { id: 5, src: galleryImage2, alt: 'Combined Bachelor Bachelorette Austin party atmosphere on Lake Travis' },
  { id: 6, src: boatImage1, alt: 'Party Boat Austin Day Tripper on Lake Travis' },
  { id: 7, src: galleryImage3, alt: 'Lake Travis Party celebration on Party Boat Austin' },
  { id: 8, src: boatImage2, alt: 'Combined Bachelor Bachelorette Austin Meeseeks boat on Lake Travis' }
];

export default function CombinedBachelorBachelorette() {
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
    const params = new URLSearchParams({ cruiseType: 'combined' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/combined-bachelor-bachelorette"
        defaultTitle="Combined Bach Party | Premier Austin"
        defaultDescription="Combined bachelor & bachelorette parties on Lake Travis! Private boats & disco cruises for groups celebrating together."
        defaultKeywords={['combined bachelor bachelorette party Austin', 'Lake Travis combined party', 'bachelor bachelorette party together', 'Austin group party cruise']}
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
                alt="Combined Bachelor Bachelorette Austin party on Lake Travis Party Boat"
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
              data-editable data-editable-id="combined-hero-title"
            >
              Combined Bachelor & Bachelorette Parties on Lake Travis
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 text-gray-100"
              data-editable data-editable-id="combined-hero-subtitle"
            >
              The Best of Both Worlds - Guys & Girls Together for One Epic Celebration!<br/>
              <span className="text-lg">The Modern Way to Celebrate - All Your Friends, One Unforgettable Party</span>
            </motion.p>

            {/* Special Offer Banner */}
            <motion.div 
              variants={fadeInUp}
              className="bg-brand-blue/90 backdrop-blur-sm rounded-lg p-4 mb-6 max-w-2xl mx-auto"
            >
              <motion.div 
                animate="visible"
                initial="hidden"
                variants={heartBeat}
                className="flex items-center justify-center space-x-2"
              >
                <PartyPopper className="h-6 w-6" />
                <span className="font-bold text-lg" data-editable data-editable-id="combined-couple-free-banner">BOTH Bride & Groom Cruise FREE on Party Squad & Ultimate!</span>
                <PartyPopper className="h-6 w-6" />
              </motion.div>
            </motion.div>

            {/* Scarcity Banner */}
            <motion.div 
              variants={fadeInUp}
              className="bg-red-600/90 backdrop-blur-sm rounded-lg p-4 mb-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-6 w-6 animate-pulse" />
                <span className="font-bold text-lg" data-editable data-editable-id="combined-scarcity-text">Combined parties book up FAST - reserve now!</span>
              </div>
              <p className="text-sm mt-2" data-editable data-editable-id="combined-scarcity-details">Larger group dates fill 6-8 weeks in advance</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xl px-8 py-6"
                data-testid="button-hero-book-combined"
              >
                <Calendar className="mr-2 h-6 w-6" />
                <span data-editable data-editable-id="combined-hero-book-button">Book Your Combined Celebration!</span>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveTab('packages')}
                className="border-white text-white hover:bg-white hover:text-black font-bold"
                data-testid="button-hero-see-packages-combined"
              >
                <span data-editable data-editable-id="combined-hero-packages-button">See Packages & Pricing</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg"
            >
              <span data-editable data-editable-id="combined-hero-tagline">The <span className="text-brand-blue font-bold">MODERN TREND</span> - Everyone Together, Maximum Fun!</span>
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

      {/* Why Choose Combined Parties Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose a Combined Bachelor & Bachelorette Party?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              It's the modern way to celebrate! Bring together friends from both sides for one epic party on Lake Travis. More fun, better memories, and everyone gets to know each other before the big day!
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Larger Groups Welcome</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We excel at handling bigger groups! Both sides together means more fun, and we have boats from 14-75 people.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <CardContent className="pt-6">
                  <Ship className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Private & Disco Options</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose private boats for complete control or join our Disco Cruise for the party vibe - both perfect for mixed groups!
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <CardContent className="pt-6">
                  <Trophy className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Professional Everything</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Expert crews, pro DJs, professional photographers - we handle all the details so everyone just shows up and parties!
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center h-full">
                <CardContent className="pt-6">
                  <Sparkles className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Flexible for All</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Different preferences? No problem! Floats, dancing, chilling, swimming - activities everyone enjoys together.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What's Included in Your Combined Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need for an epic celebration with everyone together!
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {whatsIncluded.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <item.icon className="h-10 w-10 text-brand-blue mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Tabs Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="packages" data-testid="tab-packages">Packages</TabsTrigger>
              <TabsTrigger value="compare" data-testid="tab-compare">Compare</TabsTrigger>
              <TabsTrigger value="faq" data-testid="tab-faq">FAQs</TabsTrigger>
              <TabsTrigger value="photos" data-testid="tab-photos">Photos</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Disc3 className="h-6 w-6 mr-2 text-brand-blue" />
                        ATX Disco Cruise Option
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Perfect for groups of 16-40 who want the party atmosphere! Join other celebrating groups on our signature disco cruise with professional DJ, photographer, and incredible energy.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Professional DJ playing music everyone loves</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Professional photographer for group photos</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Both bride & groom can cruise FREE (16+ guests)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>More affordable than private - split costs easily</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Ship className="h-6 w-6 mr-2 text-brand-blue" />
                        Private Cruise Option
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Ideal for larger combined groups or those wanting complete boat control! Private cruises give you the entire boat, custom itinerary, and total flexibility for your celebration.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Entire boat exclusively for your group</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Boats from 14 to 75 people capacity</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Custom itinerary and timing</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Add DJ, photographer, catering as needed</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-brand-blue to-blue-700 text-white">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      The Combined Party Advantage
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <Users className="h-10 w-10 mx-auto mb-3" />
                        <h4 className="font-bold mb-2">Build Bonds Early</h4>
                        <p className="text-sm opacity-90">
                          Friends from both sides get to know each other before the wedding - makes the big day even better!
                        </p>
                      </div>
                      <div className="text-center">
                        <DollarSign className="h-10 w-10 mx-auto mb-3" />
                        <h4 className="font-bold mb-2">Better Value</h4>
                        <p className="text-sm opacity-90">
                          One party is more cost-effective than two separate events - everyone saves money!
                        </p>
                      </div>
                      <div className="text-center">
                        <Sparkles className="h-10 w-10 mx-auto mb-3" />
                        <h4 className="font-bold mb-2">Maximum Fun</h4>
                        <p className="text-sm opacity-90">
                          Bigger group = bigger energy! The combined celebration creates unforgettable memories.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                  <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                      Choose Your Combined Party Package
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                      {combinedPartyPackages.map((pkg) => (
                        <Card 
                          key={pkg.id} 
                          className={cn(
                            "relative overflow-hidden transition-all hover:shadow-2xl",
                            pkg.popular && "border-2 border-brand-blue shadow-xl"
                          )}
                        >
                          {pkg.popular && (
                            <div className="absolute top-0 right-0 bg-brand-blue text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                              {pkg.badge}
                            </div>
                          )}
                          
                          {!pkg.popular && pkg.badge && (
                            <Badge className="absolute top-4 right-4 bg-gray-600">
                              {pkg.badge}
                            </Badge>
                          )}
                          
                          <CardHeader>
                            <div className="flex items-center justify-center mb-4">
                              <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                <pkg.icon className="h-8 w-8 text-brand-blue" />
                              </div>
                            </div>
                            <CardTitle className="text-center text-2xl">
                              {pkg.name}
                            </CardTitle>
                            <CardDescription className="text-center">
                              {pkg.description}
                            </CardDescription>
                            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                              {pkg.subtitle}
                            </p>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <div className="text-center">
                              <div className="text-3xl font-bold">
                                ${pkg.price}/person
                              </div>
                              <div className="text-lg text-green-600 dark:text-green-400 font-semibold">
                                ${pkg.id === 'basic_combined' ? '109' : pkg.id === 'party_squad' ? '122' : '135'} with tax & tip
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
                              className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold"
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
                        Special rates for combined groups 16+ people
                      </Badge>
                    </div>
                  </div>
                </TabsContent>

                {/* New Private Packages Content */}
                <TabsContent value="private">
                  <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
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

            {/* Compare Tab */}
            <TabsContent value="compare" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  Disco Cruise vs Private Cruise for Combined Parties
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Disco Cruise */}
                  <Card className="border-2 border-brand-blue">
                    <CardHeader className="bg-blue-100 dark:bg-blue-950/30">
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
                        
                        <div className="bg-blue-100 dark:bg-blue-950/30 rounded-lg p-3">
                          <p className="font-semibold text-blue-700 dark:text-blue-400">
                            🎉 Bride & Groom BOTH Cruise FREE (16+ guests)!
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="font-semibold">Perfect for combined groups of 16-40</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Example: 20 people = $1,700 total (or less with couple free!)
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
                              <span>Party floats for everyone</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>All party supplies included</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>High-energy party atmosphere</span>
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
                            Couple pays same as everyone else
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
                              <span>Entire boat exclusively yours</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Captain and crew</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>Empty coolers & Bluetooth</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                              <span className="h-4 w-4 ml-1">❌</span>
                              <span>No DJ (extra cost)</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                              <span className="h-4 w-4 ml-1">❌</span>
                              <span>No photographer (extra cost)</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                              <span className="h-4 w-4 ml-1">❌</span>
                              <span>No party atmosphere included</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-lg mb-4">
                    💡 <span className="font-semibold">Pro Tip:</span> For combined groups under 30, the Disco Cruise offers incredible value and energy!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-brand-blue hover:bg-blue-700 text-white font-bold"
                    data-testid="button-compare-book-combined"
                  >
                    Book Your Combined Party Now!
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faq" className="mt-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  Combined Party FAQs
                </h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item) => (
                    <AccordionItem 
                      key={item.id} 
                      value={item.id}
                      className="bg-blue-50 dark:bg-gray-900 rounded-lg px-6"
                    >
                      <AccordionTrigger 
                        className="text-left hover:no-underline"
                        data-testid={`faq-trigger-${item.id}`}
                      >
                        <span data-editable data-editable-id={`combined-faq-${item.id}-question`}>{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400">
                        <span data-editable data-editable-id={`combined-faq-${item.id}-answer`}>{item.answer}</span>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Card className="mt-8 bg-blue-100 dark:bg-blue-950/30 border-blue-400">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Still have questions?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      We specialize in combined celebrations - we're here to help plan your perfect party!
                    </p>
                    <Button
                      onClick={() => handleGetQuote()}
                      variant="outline"
                      className="border-blue-400 text-blue-600 hover:bg-blue-400 hover:text-white"
                      data-testid="button-faq-contact-combined"
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
                  Combined Party Vibes & Photos
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
                            data-testid={`photo-gallery-combined-${photo.id}`}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                <div className="mt-8 text-center">
                  <p className="text-lg mb-4" data-editable data-editable-id="combined-photos-description">
                    Professional photography included - capture epic group memories!
                  </p>
                  <Button
                    onClick={() => handleGetQuote()}
                    className="bg-brand-blue hover:bg-blue-700 text-white font-bold"
                    data-testid="button-photos-book-combined"
                  >
                    <span data-editable data-editable-id="combined-photos-book-button">Book Your Combined Celebration!</span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" data-editable data-editable-id="combined-testimonials-title">
                  What Couples Are Saying
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
                                <p className="font-semibold" data-editable data-editable-id={`combined-testimonial-${testimonial.id}-name`}>{testimonial.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400" data-editable data-editable-id={`combined-testimonial-${testimonial.id}-role`}>
                                  {testimonial.role} • {testimonial.location}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex mb-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 mb-3" data-editable data-editable-id={`combined-testimonial-${testimonial.id}-text`}>
                              "{testimonial.text}"
                            </p>
                            
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              <span data-editable data-editable-id={`combined-testimonial-${testimonial.id}-package`}>{testimonial.package}</span>
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
                  <p className="text-lg mb-4" data-editable data-editable-id="combined-testimonials-description">
                    Join countless happy couples who brought everyone together for one epic celebration!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-brand-blue hover:bg-blue-700 text-white font-bold"
                    data-testid="button-testimonials-book-combined"
                  >
                    <span data-editable data-editable-id="combined-testimonials-success-button">Start Your Combined Celebration</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <PartyPlanningChecklist partyType="Combined Bachelor & Bachelorette Party" eventType="combined celebration" />

      {/* 10 Reasons Why Austin Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-purple-700 to-blue-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              data-testid="heading-austin-reasons-combined"
            >
              10 Reasons Why Austin is the Best Place for Combined Bachelor/Bachelorette Parties
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover why Austin combined parties are the modern trend and why Lake Travis is the ultimate destination for celebrating together
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Waves className="h-8 w-8 text-blue-300" />
                    <h3 className="text-2xl font-bold text-white">Lake Travis - Crystal Clear Waters</h3>
                  </div>
                  <p className="text-white/90">
                    Austin's Lake Travis offers the clearest water in Texas with 270 miles of pristine shoreline. Perfect weather year-round means your Austin combined party can happen any season.
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Music className="h-8 w-8 text-blue-300" />
                    <h3 className="text-2xl font-bold text-white">World-Famous Nightlife</h3>
                  </div>
                  <p className="text-white/90">
                    6th Street, Rainey Street, and the Warehouse District make Austin the live music capital with incredible nightlife. Your combined bachelor bachelorette party Austin experience includes the best bars and clubs in Texas.
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Utensils className="h-8 w-8 text-blue-300" />
                    <h3 className="text-2xl font-bold text-white">Unbeatable Food Scene</h3>
                  </div>
                  <p className="text-white/90">
                    Austin's food trucks, BBQ joints, and award-winning restaurants create the perfect party fuel. From Franklin BBQ to food truck tacos, Austin combined bachelor bachelorette parties eat like royalty.
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-8 w-8 text-blue-300" />
                    <h3 className="text-2xl font-bold text-white">No State Income Tax</h3>
                  </div>
                  <p className="text-white/90">
                    Your Austin combined bachelor bachelorette party budget goes further - Texas has no state income tax, so drinks, activities, and entertainment cost less than other major cities.
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Sun className="h-8 w-8 text-blue-300" />
                    <h3 className="text-2xl font-bold text-white">Perfect Year-Round Weather</h3>
                  </div>
                  <p className="text-white/90">
                    Austin's 300 days of sunshine per year mean your combined bachelor bachelorette party Austin celebration happens rain or shine. Lake Travis maintains a constant 70-degree water temperature.
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    6
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-8 w-8 text-blue-300" />
                    <h3 className="text-2xl font-bold text-white">30 Minutes from Everything</h3>
                  </div>
                  <p className="text-white/90">
                    Austin combined bachelor bachelorette parties access Lake Travis party boats in 30 minutes, downtown bars in 20 minutes, and Hill Country wineries in 45 minutes. Everything's close.
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    7
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Anchor className="h-8 w-8 text-blue-300" />
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    8
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="h-8 w-8 text-blue-300" />
                    <h3 className="text-2xl font-bold text-white">Diverse Entertainment Options</h3>
                  </div>
                  <p className="text-white/90">
                    Your Austin combined bachelor bachelorette party can include party boats, wine tours, live music, BBQ tours, rooftop bars, and more all in one weekend.
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    9
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="h-8 w-8 text-blue-300" />
                    <h3 className="text-2xl font-bold text-white">Party-Friendly Atmosphere</h3>
                  </div>
                  <p className="text-white/90">
                    Austin welcomes combined bachelor bachelorette parties with open arms. The city's 'Keep Austin Weird' culture means anything goes and everyone's welcome.
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
                  <div className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold text-xl flex items-center justify-center">
                    10
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Plane className="h-8 w-8 text-blue-300" />
                    <h3 className="text-2xl font-bold text-white">Easy Airport Access</h3>
                  </div>
                  <p className="text-white/90">
                    Austin-Bergstrom International Airport serves 150+ destinations. Your Austin combined bachelor bachelorette party guests fly in easily from anywhere in the country.
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
              className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xl px-12 py-6"
              data-testid="button-austin-reasons-book-combined"
            >
              <Calendar className="mr-2 h-6 w-6" />
              Book Your Austin Combined Party Now
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
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Explore More Party Options
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Looking for separate celebrations or custom charter options? Discover all our Lake Travis party experiences.
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
                      Separate bachelor party options with ATX Disco Cruises, professional DJ, photographer, and guys-only celebration packages.
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
                      Bachelorette-only experiences on Lake Travis with VIP treatment, professional entertainment, and girls' celebration packages.
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
              transition={{ delay: 0.3 }}
            >
              <Link href="/private-cruises">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <Ship className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Private Cruises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Custom private charter options tailored to your group with flexible packages, catering options, and personalized experiences.
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      View Private Cruises
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
              <span className="text-sm font-semibold" data-editable data-editable-id="combined-sticky-footer-urgency">Combined parties book fast - reserve today!</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-brand-blue text-white animate-pulse">
                <PartyPopper className="h-3 w-3 mr-1" />
                <span data-editable data-editable-id="combined-sticky-footer-couple-badge">Couple FREE!</span>
              </Badge>
              <Button
                onClick={() => handleGetQuote()}
                className="bg-brand-blue hover:bg-blue-700 text-white font-bold"
                data-testid="button-sticky-book-combined"
              >
                <span data-editable data-editable-id="combined-sticky-footer-button">Book Combined Party Now</span>
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
              EXPLORE OTHER AUSTIN PARTY BOATS
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check out our other Lake Travis cruise experiences for your celebration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/bachelor-party-austin" data-testid="link-bachelor-from-combined">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelor Party Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Epic bachelor party boat cruises on Lake Travis for guys</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-from-combined">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Party Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Premier bachelorette party cruises - Our specialty since 2009</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/private-cruises" data-testid="link-private-from-combined">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Lake Travis Cruises</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Exclusive private charters for your combined party on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery" data-testid="link-gallery-from-combined">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Photo Gallery</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">See photos from our Austin party boat celebrations</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" data-testid="link-contact-from-combined">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Get a quote for your combined party boat experience</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/" data-testid="link-home-from-combined">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-brand-blue">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">View All Options</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Explore all our Lake Travis party cruise services</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data for Combined Bachelor/Bachelorette Party Services */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin/#service",
          "name": "Combined Bachelor/Bachelorette Party Cruises on Lake Travis",
          "provider": {
            "@id": "https://premierpartycruises.com/#organization"
          },
          "areaServed": ["Austin TX", "Texas", "United States"],
          "description": "Joint bachelor/bachelorette party celebrations on Lake Travis with flexible group options. Celebrate together with ATX Disco Cruise or private charter options featuring professional DJ, photographer, and both bride & groom cruise FREE on select packages. The modern way to celebrate - all your friends, one unforgettable party.",
          "offers": [
            {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "85.00",
              "name": "Basic Combined Package",
              "description": "Join the ultimate party cruise with friends from both sides! BYOB, shared cooler with ice for everyone. Alcohol & food delivery available to the boat. ALWAYS more affordable than separate parties.",
              "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "95.00",
              "name": "Party Squad Package",
              "description": "Both Bride & Groom can cruise FREE! Private Cooler with Ice & Storage for Your Entire Group. Reserved Spot for Your Combined Party. Special Celebration Items for the Happy Couple. Complimentary Direct-to-Boat Alcohol & Food Delivery. 25% Discount on Round-Trip Transportation.",
              "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "105.00",
              "name": "Ultimate Celebration Package",
              "description": "Both Bride & Groom cruise FREE! Everything in Party Squad Package. Premium Party Floats for the Entire Group. Mixology Setup with Champagne, Juices & Party Supplies. $100 Voucher for Airbnb Concierge Services. Towel Service & SPF-50 Spray Sunscreen for Everyone. Completely Turnkey - Cooler Stocked, Everything Ready!",
              "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
              "availability": "https://schema.org/InStock"
            }
          ]
        })
      }} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { DISCO_PRICING } from '@shared/constants';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import DiscoVsPrivateComparison from '@/components/DiscoVsPrivateComparison';
import DiscoVsPrivateValueCalculator from '@/components/DiscoVsPrivateValueCalculator';
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, Zap, Target, MessageSquare, Ticket, 
  Gift, Disc3, Volume2, Mic, Utensils, GlassWater, UserCheck, 
  Leaf, Check, AlertCircle, DollarSign, Timer, CreditCard, 
  CloudRain, HelpCircle, Anchor, Droplets, Waves, Info, 
  TrendingUp, Package, Plane, Wine, PartyPopper as ConfettiIcon,
  X, Eye, Smile, XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { ComparisonTable, type ComparisonColumn, type ComparisonRow } from '@/components/ComparisonTable';
import Breadcrumb from '@/components/Breadcrumb';
import { FeaturedSnippet } from '@/components/FeaturedSnippet';
import { QuickAnswerBox, QuickAnswerBoxGroup } from '@/components/QuickAnswerBox';
import { InternalLinkHighlight, InternalLinkHighlightWithArrow } from '@/components/InternalLinkHighlight';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';

import heroImage1 from '@assets/atx-disco-cruise-party.webp';
import heroImage2 from '@assets/dancing-party-scene.webp';
import heroImage3 from '@assets/bachelor-party-group-guys.webp';
import galleryImage1 from '@assets/party-atmosphere-1.webp';
import galleryImage2 from '@assets/party-atmosphere-2.webp';
import galleryImage3 from '@assets/party-atmosphere-3.webp';
import floatImage from '@assets/giant-unicorn-float.webp';

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

const discoPackages = [
  {
    id: 'basic',
    name: 'Basic Bach Package',
    price: DISCO_PRICING.basic / 100,
    originalPrice: null,
    description: 'Join the BEST Party on Lake Travis, Exclusively for Bach Parties!',
    subtitle: 'BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise',
    features: [
      'Full 4-hour Lake Travis cruise experience',
      'Professional DJ entertainment all day',
      'Professional photographer capturing memories',
      'Digital photo delivery after the event',
      'Giant unicorn float access',
      'Multi-group party atmosphere',
      'BYOB with shared coolers & ice',
      'Alcohol delivery & lunch delivery available'
    ],
    popular: false,
    icon: Disc3,
    badge: 'Great Value'
  },
  {
    id: 'disco_queen',
    name: 'Disco Queen Package',
    price: DISCO_PRICING.disco_queen / 100,
    originalPrice: 110,
    description: 'Enhanced party experience with premium perks and VIP treatment',
    subtitle: 'Private Cooler & Reserved Spot for Your Group',
    features: [
      'Everything in Basic Bach Package',
      'Private cooler with ice & storage bin for your group',
      'Reserved spot for your group on the boat',
      'Disco ball cup & bubble gun for guest of honor',
      'Complimentary direct-to-boat alcohol & lunch delivery',
      '25% discount on round-trip transportation',
      '$50-$100 voucher for Airbnb booze delivery',
      'Premium positioning on the boat'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'platinum',
    name: 'Super Sparkle Platinum Disco',
    price: DISCO_PRICING.platinum / 100,
    originalPrice: 125,
    description: 'Ultimate all-inclusive party experience with maximum celebration',
    subtitle: 'Nothing to Carry, Cooler Stocked When You Arrive!',
    features: [
      'Everything in Disco Queen Package',
      'Personal unicorn float for guest of honor',
      'Mimosa setup with champagne flutes, 3 juices & chambong',
      '$100 voucher for Airbnb concierge services',
      'Towel service & SPF-50 spray sunscreen provided',
      'Nothing to carry - cooler pre-stocked with drinks',
      'VIP treatment throughout the cruise',
      'Extended photo coverage & exclusive surprises'
    ],
    popular: false,
    icon: Trophy,
    badge: 'All-Inclusive VIP'
  }
];

const whatsIncluded = [
  {
    icon: Music,
    title: 'Professional DJ',
    description: 'Playing your favorites ALL DAY - party starts when you arrive!'
  },
  {
    icon: Camera,
    title: 'Professional Photographer',
    description: 'Capture every epic moment with high-quality photos sent after'
  },
  {
    icon: Anchor,
    title: 'Shared Coolers with Ice',
    description: 'BYOB - bring your drinks, we provide coolers and ice'
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
    time: 'Hour 1: Boarding & Meet-Up',
    title: 'Welcome Aboard!',
    description: 'Arrive at Anderson Mill Marina, meet your fellow party-goers from across the country, get your drinks in the coolers, and let the DJ get the energy going!',
    icon: Ship,
    color: 'from-purple-500 to-pink-500'
  },
  {
    time: 'Hour 2: Party Starts',
    title: 'Full Party Mode',
    description: 'DJ cranking hits, photographer capturing moments, floats deployed! Dance, mingle with other bach parties, and experience the legendary multi-group energy.',
    icon: Music,
    color: 'from-pink-500 to-orange-500'
  },
  {
    time: 'Hour 3: Peak Celebration',
    title: 'Maximum Fun',
    description: 'The party is at its peak! Floats in full use, dancing non-stop, making friends with groups from Dallas, Houston, California, and beyond. Pure celebration!',
    icon: PartyPopper,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    time: 'Hour 4: Grand Finale',
    title: 'Epic Send-Off',
    description: 'Final dance party, group photos with your new friends, exchange numbers, and leave with unforgettable memories. The best bach party experience, guaranteed!',
    icon: Trophy,
    color: 'from-yellow-500 to-green-500'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'Bride',
    location: 'Austin, TX',
    rating: 5,
    text: "This was LEGENDARY! We met bachelorette parties from California, Chicago, and Dallas - made so many friends! The DJ was incredible, photographer got AMAZING shots, and the vibe was absolutely electric. Best. Bach. Party. EVER!",
    avatar: '👰',
    package: 'Disco Queen Package'
  },
  {
    id: 2,
    name: 'Jake T.',
    role: 'Best Man',
    location: 'Dallas, TX',
    rating: 5,
    text: "I planned this and the groom won't stop thanking me! Everything was handled - DJ crushed it, photos came out FIRE, and we partied with bachelor groups from across the country. The energy was INSANE. Easiest party I've ever planned!",
    avatar: '🎉',
    package: 'Platinum Package'
  },
  {
    id: 3,
    name: 'Emily R.',
    role: 'Maid of Honor',
    location: 'Houston, TX',
    rating: 5,
    text: "The multi-group atmosphere is what makes this SO special! We danced with parties from everywhere, exchanged Instagrams, and the bride said it was the best day of her life. Professional photos are stunning - better than expected!",
    avatar: '💃',
    package: 'Disco Queen Package'
  },
  {
    id: 4,
    name: 'Marcus L.',
    role: 'Groom',
    location: 'San Antonio, TX',
    rating: 5,
    text: "Meeting other bachelor parties from different states made this unforgettable! The giant unicorn float was EPIC, DJ had everyone dancing, and we left with numbers from guys we're still friends with. This is THE bachelor party experience!",
    avatar: '🦄',
    package: 'Basic Bach Package'
  },
  {
    id: 5,
    name: 'Ashley K.',
    role: 'Bride',
    location: 'Fort Worth, TX',
    rating: 5,
    text: "Nothing to plan, nothing to carry - just SHOW UP and PARTY! The Platinum package had everything ready, cooler stocked, photographer everywhere. Dancing on the water with bachelorettes from across America was MAGICAL!",
    avatar: '✨',
    package: 'Super Sparkle Platinum Disco'
  },
  {
    id: 6,
    name: 'Tyler B.',
    role: 'Best Man',
    location: 'Round Rock, TX',
    rating: 5,
    text: "The professional DJ made this LEGENDARY - best playlist ever! We partied with groups from 5 different states, all celebrating the same thing. The vibe was electric, photos came out amazing, and I'm the hero for booking this!",
    avatar: '🎧',
    package: 'Disco Queen Package'
  }
];

const faqItems = [
  {
    id: 'what-is-atx-disco',
    question: 'What is the ATX Disco Cruise?',
    answer: 'A shared 4-hour party boat for bachelor/bachelorette groups with pro DJ and photographer, BYOB, floats, and multi-group energy.'
  },
  {
    id: 'when-does-it-run',
    question: 'When does it run?',
    answer: 'Fridays 12–4 PM and Saturdays 11–3 PM or 3:30–7:30 PM from March to October.'
  },
  {
    id: 'ticket-prices',
    question: 'How much are tickets?',
    answer: '$85 Basic, $95 Queen/King, $105 Platinum.'
  },
  {
    id: 'weather-policy',
    question: 'What happens in bad weather?',
    answer: 'Rain or shine. For severe weather, we move the party to Lemonade Disco (land venue).'
  },
  {
    id: 'alcohol-policy',
    question: 'What\'s the alcohol policy?',
    answer: 'BYOB for 21+; cans/plastic only; coolers with ice and cups provided.'
  },
  {
    id: 'photos',
    question: 'When do we get photos?',
    answer: 'Professional photos are delivered digitally within 2–3 weeks after your cruise.'
  },
  {
    id: 'parking',
    question: 'Where do we meet?',
    answer: 'Anderson Mill Marina, 13993 FM 2769, Leander, TX 78641. Arrive 15–20 minutes early; free parking available.'
  }
];

const quickStats = [
  { icon: Trophy, label: '100%', value: 'Satisfaction Track Record', color: 'text-yellow-600' },
  { icon: Users, label: 'Thousands', value: 'Groups Served Nationwide', color: 'text-pink-600' },
  { icon: DollarSign, label: '3-5x', value: 'Better Value vs Private', color: 'text-green-600' },
  { icon: Calendar, label: '5+ Years', value: 'Weekly Operations', color: 'text-blue-600' },
  { icon: Shield, label: 'Only in USA', value: 'Multi-Group Bach Cruise', color: 'text-orange-600' }
];

export default function ATXDiscoCruise() {
  const [, navigate] = useLocation();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return; // Skip animation for reduced motion
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const handleBookNow = () => {
    navigate('/booking-flow?cruise=disco');
  };


  return (
    <>
      <SEOHead
        pageRoute="/atx-disco-cruise"
        defaultTitle="ATX Disco Cruise | Premier Lake Travis"
        defaultDescription="Austin's exclusive bach party cruise. $85-105/person all-inclusive. DJ, photographer, 4-hour party. Fridays & Saturdays!"
        defaultKeywords={['ATX disco cruise', 'bachelor party Austin', 'bachelorette party Austin', 'party boat Lake Travis', 'all-inclusive bachelor party', 'Austin party cruise', 'Lake Travis party boat', 'disco cruise Austin']}
        image={heroImage1}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <PublicNavigation />
        <Breadcrumb />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative h-[70vh] flex flex-col justify-center overflow-hidden"
          data-testid="section-hero"
        >
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/70 to-orange-900/80 z-10" />
                <img 
                  src={image} 
                  alt="ATX Disco Cruise party boat on Lake Travis Austin - Bachelor and bachelorette party atmosphere with DJ and dancing"
                  className="w-full h-full object-cover"
                  width={1920}
                  height={1080}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchpriority={index === 0 ? "high" : "low"}
                />
              </motion.div>
            ))}
          </div>

          <div className="relative z-20 max-w-6xl mx-auto px-4 text-center flex-grow flex items-center">
            <motion.div variants={fadeInUp}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6" data-testid="text-hero-headline">
                ATX Disco Cruise
              </h1>
              <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mt-4 mb-4 font-bold">
                The Country's Only Multi-Group Bach Party Cruise
              </p>
              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto font-semibold" data-testid="text-hero-subheadline">
                The single most unique and comprehensive bachelor/bachelorette party experience in the United States
              </p>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto" data-testid="text-hero-description">
                Only all-inclusive, multi-group bachelor/bachelorette party cruise in the country. Join parties from across America for an unforgettable 4-hour Lake Travis celebration with professional DJ, photographer, and 100% satisfaction track record! Need a larger private celebration? Explore <Link href="/private-cruises" className="text-brand-yellow hover:underline font-semibold">our private cruises</Link> for exclusive group experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base sm:text-lg px-6 sm:px-8 py-6 min-h-[3.5rem] sm:min-h-[4rem]"
                  data-testid="button-book-now"
                >
                  Book Your Spot Now <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 py-6 min-h-[3.5rem] sm:min-h-[4rem]"
                  data-testid="button-learn-more"
                >
                  <Phone className="mr-2" /> Talk to an Expert
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Feature Bar */}
          <div className="relative z-30 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
            <div className="container mx-auto">
              <p className="text-center text-gray-900 dark:text-white text-base md:text-lg font-semibold">
                🎉 <span className="text-purple-600">All-Inclusive</span> • Professional DJ & Photographer • <span className="text-pink-600">Fridays & Saturdays</span> 🎉
              </p>
            </div>
          </div>
        </motion.section>

        {/* Quick Answer Boxes Section */}
        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-6">
            <QuickAnswerBoxGroup
              title="Quick Answers About ATX Disco Cruise"
              boxes={[
                {
                  id: 'food-included',
                  question: 'Is food included?',
                  answer: 'Food not included but we make it easy! Pre-order lunch delivery direct to the boat through Party on Delivery. Many groups order tacos, pizzas, or sandwiches delivered right to the marina. Snacks and chips are welcome aboard.',
                  keywords: ['food', 'lunch delivery', 'Party on Delivery', 'tacos'],
                  icon: Utensils,
                  relatedLink: {
                    href: '#packages',
                    text: 'View package options'
                  }
                },
                {
                  id: 'music-type',
                  question: 'What kind of music is played?',
                  answer: 'Professional DJ plays crowd-pleasing hits all day! Mix of current top 40, throwback classics, hip-hop, country, and party anthems. DJ takes requests and reads the crowd perfectly. The dance floor energy is incredible with everyone singing along.',
                  keywords: ['DJ', 'music', 'top 40', 'requests', 'dance floor'],
                  icon: Music,
                  relatedLink: {
                    href: '#whats-included',
                    text: 'See what\'s included'
                  }
                }
              ]}
              columns={2}
              className="max-w-5xl mx-auto"
            />
          </div>
        </section>


        {/* National Leadership & Market Impact Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white"
          data-testid="section-national-leadership"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black text-lg px-6 py-3">
                <Trophy className="w-5 h-5 mr-2 inline" /> National Market Leader
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why We're #1 in the Nation
              </h2>
              <p className="text-2xl text-white/90 font-semibold mb-2">
                Single-handedly making Austin a top-tier <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Party Cruises">bachelor</InternalLinkHighlight> & <InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Party Cruises">bachelorette</InternalLinkHighlight> destination
              </p>
              <p className="text-xl text-white/80 max-w-4xl mx-auto">
                After analyzing thousands of customer reviews and competitive offerings nationwide, one conclusion is clear: nothing else comes close to what we've created with the ATX Disco Cruise.
              </p>
            </motion.div>

            <motion.div variants={staggerChildren} className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Shield className="w-8 h-8 text-yellow-400" />
                    Only in America
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-3">
                  <p className="text-lg font-semibold">The country's only all-inclusive, multi-group bachelor/bachelorette party cruise</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>No other company offers this unique multi-group experience nationwide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Exclusive format perfected over 5+ years of weekly operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Thousands of groups from across America served with 100% satisfaction</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <CloudRain className="w-8 h-8 text-blue-400" />
                    Industry's Only Weather Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-3">
                  <p className="text-lg font-semibold">The Lemonade Disco - Weather Backup Plan</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Only company with comprehensive rain backup protocol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Land-based party with fajita/BBQ buffet, drinks, and DJ if severe weather</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Your celebration happens no matter what - guaranteed!</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-green-400" />
                    Unbeatable Value
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-3">
                  <p className="text-lg font-semibold">3-5x better value than private rentals while including MORE</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Professional DJ & photographer included (not extra)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Full 4-hour experience (2x longer than typical 2-hour rentals)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Almost always cheaper per person with better amenities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Award className="w-8 h-8 text-purple-400" />
                    Proven Track Record
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-3">
                  <p className="text-lg font-semibold">14+ years of excellence, 100% satisfaction guarantee</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Consistent 5-star reviews from thousands of groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>84% of reviews specifically mention "great value"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>America's most trusted bachelor/bachelorette party cruise</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Packages Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-4"
          data-testid="section-packages"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-packages-headline">
                Choose Your Package
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-packages-subheadline">
                From budget-friendly to all-inclusive VIP - we've got you covered
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {discoPackages.map((pkg, idx) => (
                <motion.div key={pkg.id} variants={fadeInUp}>
                  <Card 
                    className={cn(
                      "relative h-full hover:shadow-2xl transition-all duration-300",
                      pkg.popular && "border-4 border-pink-500 shadow-xl scale-105"
                    )}
                    data-testid={`card-package-${pkg.id}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-pink-500 text-white px-6 py-1 text-sm">
                          {pkg.badge}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <pkg.icon className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                      <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-purple-600">
                          ${pkg.price}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-xl text-gray-400 line-through">
                            ${pkg.originalPrice}
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-base font-medium">
                        {pkg.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        {pkg.description}
                      </p>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={cn(
                          "w-full mt-6",
                          pkg.popular 
                            ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                            : "bg-purple-600 hover:bg-purple-700"
                        )}
                        onClick={handleBookNow}
                        data-testid={`button-select-${pkg.id}`}
                      >
                        Select {pkg.name} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Featured Snippets Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* What is the ATX Disco Cruise? */}
              <FeaturedSnippet
                question="What is the ATX Disco Cruise?"
                answer="The ATX Disco Cruise is Austin's exclusive 4-hour party boat experience on Lake Travis for bachelor and bachelorette parties. It features professional DJ entertainment, photography, giant floats, and brings together multiple celebration groups for an epic shared party atmosphere at $85-125 per person."
                format="paragraph"
                schemaType="FAQ"
              />
              
              {/* What's included in the disco cruise? */}
              <FeaturedSnippet
                question="What's included in the disco cruise?"
                listItems={[
                  "Professional DJ playing music for 4 hours",
                  "Professional photographer with digital photo delivery",
                  "Giant unicorn float and lily pad floats",
                  "BYOB with coolers and ice provided",
                  "Ice water stations for hydration",
                  "Party supplies including cups and koozies",
                  "Clean restroom facilities on board",
                  "Covered shade areas"
                ]}
                format="list"
                schemaType="FAQ"
              />
            </div>
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
              <Badge className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xl px-8 py-3 font-bold">
                <Sparkles className="w-6 h-6 mr-2 inline" /> Why Book ATX Disco Cruise
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
                Why You Should Book the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">ATX Disco Cruise</span>
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                SHOW UP & GET DOWN!!
              </p>
              <p className="text-xl text-white/90 max-w-4xl mx-auto">
                The country's ONLY all-inclusive multi-group <InternalLinkHighlight href="/bachelor-party-austin" title="Bachelor Party Cruises">bachelor</InternalLinkHighlight>/<InternalLinkHighlight href="/bachelorette-party-austin" title="Bachelorette Party Cruises">bachelorette</InternalLinkHighlight> party cruise. Here's why thousands of groups from across America choose us every year. <InternalLinkHighlightWithArrow href="/gallery" title="View Our Fleet">See our boats in action</InternalLinkHighlightWithArrow>
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
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-showup-disco">
                    <div className="flex items-center gap-3">
                      <Zap className="h-6 w-6 text-yellow-400" />
                      <span>Just SHOW UP & GET DOWN! Everything's Included!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p className="mb-3">Literally just show up with your alcohol and PARTY! We provide absolutely everything else:</p>
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
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-best-weekend-disco">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-6 w-6 text-yellow-400" />
                      <span>The BEST Weekend of Their Life!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p>This isn't just another boat rental - it's a LEGENDARY experience that will be talked about for years! Your group will remember this as the most epic day of the entire bachelor/bachelorette party weekend. With professional entertainment, amazing vibes, and the energy of multiple parties celebrating together, this is THE highlight that makes your Austin party unforgettable.</p>
                  </AccordionContent>
                </AccordionItem>

                {/* Benefit 3: Highlight Every Time */}
                <AccordionItem value="item-3" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-highlight-disco">
                    <div className="flex items-center gap-3">
                      <Star className="h-6 w-6 text-yellow-400 fill-current" />
                      <span>It's the Highlight of The Weekend, EVERY. DAMN. TIME.</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p>Don't just take our word for it - after hosting thousands of parties, we can confidently say this is THE most fun they've had in years. The combination of the beautiful lake, professional DJ, amazing energy from multiple groups, and 4 full hours of non-stop partying creates an experience that consistently tops every other party activity. Your crew will be talking about this for decades!</p>
                  </AccordionContent>
                </AccordionItem>

                {/* Benefit 4: Turnkey Convenience */}
                <AccordionItem value="item-4" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-turnkey-disco">
                    <div className="flex items-center gap-3">
                      <Heart className="h-6 w-6 text-yellow-400" />
                      <span>You've Got Enough to Worry About! We Handle Everything!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p className="mb-3">Planning a party is stressful enough. Don't deal with:</p>
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
                    <p className="font-bold text-yellow-400">Everything is ready when you arrive - just bring your booze and GET DOWN!</p>
                  </AccordionContent>
                </AccordionItem>

                {/* Benefit 5: Multi-Group Party */}
                <AccordionItem value="item-5" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-multi-group-disco">
                    <div className="flex items-center gap-3">
                      <Users className="h-6 w-6 text-yellow-400" />
                      <span>Party With Other Bachelor & Bachelorette Parties from All Over America!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p className="mb-3">This is what makes the ATX Disco Cruise TRULY unique - you're not alone on the boat! We host multiple bachelor AND bachelorette parties from across the country, all celebrating together:</p>
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
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-value-disco">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-6 w-6 text-yellow-400" />
                      <span>Cheaper Per Person Than a Private Cruise (Most of the Time!)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p className="mb-3">For smaller groups (under 15 people), the ATX Disco Cruise is ALWAYS the better deal:</p>
                    <div className="bg-black/30 rounded-lg p-4 mb-3">
                      <p className="font-bold text-yellow-400 mb-2">Private Boat Math:</p>
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
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-disco-attire-disco">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-6 w-6 text-yellow-400" />
                      <span>Dress Up In Your Finest Disco Attire!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p className="mb-3">While it's not required, we STRONGLY encourage dressing up in disco attire! Think:</p>
                    <ul className="space-y-2 ml-6 mb-3">
                      <li>• Sequins, bell-bottoms, and platform shoes</li>
                      <li>• Funky sunglasses and afro wigs</li>
                      <li>• Glitter everything!</li>
                      <li>• Go full Saturday Night Fever/Studio 54!</li>
                    </ul>
                    <p className="font-bold text-yellow-400">The groups that dress up have 10X MORE FUN and get AMAZING photos!</p>
                  </AccordionContent>
                </AccordionItem>

                {/* Benefit 8: People Watching */}
                <AccordionItem value="item-8" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-people-watching-disco">
                    <div className="flex items-center gap-3">
                      <Eye className="h-6 w-6 text-yellow-400" />
                      <span>Watch Everyone Celebrate & Go Nuts - Best People Watching on Earth!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p>Seeing 3-4 different bachelor and bachelorette parties all going wild at the same time is PRICELESS entertainment in itself! Watch groups in crazy costumes, see different celebration styles from across America, witness epic dance-offs, and be part of the most energetic party atmosphere you've ever experienced. It's a show within a party within a cruise!</p>
                  </AccordionContent>
                </AccordionItem>

                {/* Benefit 9: Nothing Compares */}
                <AccordionItem value="item-9" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-nothing-compares-disco">
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-yellow-400" />
                      <span>Nothing Else Compares - We're Miles Ahead!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p className="mb-3">We've analyzed every party option in Austin and across America:</p>
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
                    <p className="font-bold text-yellow-400">The ATX Disco Cruise is in a league of its own - nothing else offers this combination of value, fun, and unique experience!</p>
                  </AccordionContent>
                </AccordionItem>

                {/* Benefit 10: Proven Track Record */}
                <AccordionItem value="item-10" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-track-record-disco">
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-yellow-400" />
                      <span>You're In Good Hands - 14 Years, ZERO Incidents!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p className="mb-3">Safety and fun go hand-in-hand with Premier Party Cruises:</p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span>14+ years of operating parties on Lake Travis</span>
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
                        <span>Thousands of 5-star reviews from satisfied groups</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* Benefit 11: Split Payment */}
                <AccordionItem value="item-11" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-split-payment-disco">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-yellow-400" />
                      <span>Split Payment With Your Group - Easy as 1-2-3!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <p className="mb-3">No more chasing people down for Venmo payments! Our split payment option makes it EASY:</p>
                    <div className="space-y-3 ml-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                        <p>Share the payment link with your group</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                        <p>Everyone pays their own share directly</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                        <p>No awkward money conversations or fronting thousands of dollars!</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Benefit 12: Stress-Free Booking */}
                <AccordionItem value="item-12" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6">
                  <AccordionTrigger className="text-xl font-bold hover:text-yellow-400" data-testid="accordion-stress-free-disco">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-yellow-400" />
                      <span>Stress-Free Booking Process - But Don't Sleep On It!</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 text-lg pt-4">
                    <div className="space-y-4">
                      <div>
                        <p className="font-bold text-yellow-400 mb-2">Super Easy to Book:</p>
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
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-bold text-2xl px-16 py-8"
                  data-testid="button-why-book-cta-disco"
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
                          <span>Your party happens NO MATTER WHAT</span>
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
                      No other party experience in America offers this level of weather protection. 
                      That's just one more reason why we're #1!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* What's Included Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20"
          data-testid="section-whats-included"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-included-headline">
                Everything You Need, All Included
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-included-subheadline">
                Premium amenities and services for the ultimate party experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {whatsIncluded.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="text-center hover:shadow-lg transition-shadow h-full" data-testid={`card-included-${idx}`}>
                    <CardContent className="pt-6">
                      <item.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 4-Hour Experience Timeline */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-4"
          data-testid="section-experience"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-experience-headline">
                Your 4-Hour Journey
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-experience-subheadline">
                Hour-by-hour breakdown of an unforgettable experience
              </p>
            </motion.div>

            <div className="space-y-8">
              {experienceTimeline.map((hour, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow" data-testid={`card-hour-${idx + 1}`}>
                    <div className={cn("h-2 bg-gradient-to-r", hour.color)} />
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-full bg-gradient-to-br", hour.color)}>
                          <hour.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{hour.title}</CardTitle>
                          <CardDescription className="text-base font-semibold">{hour.time}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">{hour.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Comprehensive Value Comparison Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-8 md:py-12 px-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10"
          data-testid="section-value-comparison"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              <DollarSign className="w-8 h-8 inline mr-2 text-green-600" />
              The Math Doesn't Lie: Disco Cruise Wins
            </h2>
            <p className="text-base md:text-lg text-center text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
              See exactly how much you save with the ATX Disco Cruise for any group size
            </p>
            
            {/* Detailed Comparison Table */}
            <div className="mb-12">
              <ComparisonTable
                columns={[
                  {
                    id: 'disco',
                    title: 'ATX Disco Cruise',
                    subtitle: 'Multi-group party experience',
                    recommended: true,
                    badge: { text: 'Best Value', variant: 'default' }
                  },
                  {
                    id: 'private',
                    title: 'Private Charter',
                    subtitle: 'Your group only'
                  }
                ]}
                rows={[
                  {
                    feature: 'Price per Person',
                    values: [
                      { text: '$85-$125', highlight: true },
                      '$175-$450'
                    ]
                  },
                  {
                    feature: 'Professional DJ',
                    values: [
                      { text: 'Included', highlight: true },
                      'Extra $600-800'
                    ]
                  },
                  {
                    feature: 'Professional Photographer',
                    values: [
                      { text: 'Included', highlight: true },
                      'Extra $800-1000'
                    ]
                  },
                  {
                    feature: 'Party Atmosphere',
                    values: [
                      { text: 'Multiple bach groups', highlight: true },
                      'Just your group'
                    ]
                  },
                  {
                    feature: 'Giant Float Included',
                    values: [true, 'Extra $150-200']
                  },
                  {
                    feature: 'Party Supplies',
                    values: [
                      { text: 'All included', highlight: true },
                      'You buy & bring'
                    ]
                  },
                  {
                    feature: 'Food/Drink Delivery',
                    values: ['Free service', 'You arrange']
                  },
                  {
                    feature: 'Minimum People',
                    values: ['No minimum', '8-14 minimum']
                  },
                  {
                    feature: 'Planning Required',
                    values: [
                      { text: 'Zero - just show up', highlight: true },
                      'Hours of prep'
                    ]
                  },
                  {
                    feature: 'Total Value',
                    values: [
                      { text: '$350+ per person', highlight: true },
                      '$200 per person'
                    ]
                  }
                ]}
                caption="ATX Disco Cruise vs Private Charter Comparison"
                summary="Compare the all-inclusive ATX Disco Cruise with traditional private boat charters on Lake Travis"
                mobileView="cards"
                schemaType="Service"
                ariaLabel="Comparison of ATX Disco Cruise vs Private Charter options"
              />
            </div>
            
            <DiscoVsPrivateValueCalculator />
          </div>
        </motion.section>

        {/* The Cost of NOT Booking - Emotional Impact Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
          data-testid="section-cost-of-not-booking"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-red-600 dark:text-red-400">
              <AlertCircle className="w-12 h-12 inline mr-3" />
              The Hidden Cost of Booking a Private Cruise Instead
            </h2>
            <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12">
              It's not just about the money you'll spend - it's about what you'll miss
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-400">Financial Loss</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Pay $500-$1,500+ MORE for a private cruise with less included</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Spend hours planning, shopping, and coordinating (time = money)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Pay separately for DJ ($600) and photographer ($800) - if they even fit on the boat</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Buy all party supplies yourself ($200-300) - and probably forget something</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-400">Experience Loss (Priceless)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Miss the legendary multi-group party atmosphere everyone talks about</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">No chance to meet bachelor/bachelorette parties from across America</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Just your group on an empty boat instead of an epic celebration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-sm">Lifelong FOMO: "Why didn't we do the disco cruise like everyone else?"</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-500">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-center mb-4">
                  🚨 The REAL Cost: Regret
                </h3>
                <p className="text-center text-lg mb-4">
                  "We're having our bach party in Austin this summer. What should we do?"
                </p>
                <p className="text-center text-xl font-bold mb-4">
                  Everyone: "OMG the disco cruise is LEGENDARY!"
                </p>
                <p className="text-center text-lg">
                  You: "We... we didn't book it. We got a private boat instead..."
                </p>
                <p className="text-center text-2xl font-bold text-red-600 dark:text-red-400 mt-6">
                  Don't let that be you. 😭
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* The Tragedy - Emotional Appeal Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white"
          data-testid="section-the-tragedy"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Don't Be That Person Who Hears About It After
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl mb-12">
              <p className="leading-relaxed">
                Every single weekend, we hear the same heartbreaking story from groups on other boats:
              </p>
              
              <Card className="bg-white/10 border-white/20">
                <CardContent className="pt-6">
                  <p className="text-2xl font-semibold italic mb-4">
                    "We heard about the disco cruise from another group on the lake!"
                  </p>
                  <p className="text-xl italic">
                    "Why didn't we book this?! This looks SO much better than our private boat!"
                  </p>
                </CardContent>
              </Card>

              <p className="leading-relaxed">
                They watch from their quiet, empty boat as the disco cruise passes by - music pumping, 
                people dancing, multiple groups celebrating together, pure joy and energy.
              </p>

              <p className="leading-relaxed text-2xl font-bold">
                They realize they chose wrong. But it's too late.
              </p>
            </div>

            <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-8 mb-12">
              <h3 className="text-3xl font-bold mb-4">This is THE Experience That Defines Austin Bach Parties</h3>
              <p className="text-xl leading-relaxed">
                When people plan bach parties in Austin, the ATX Disco Cruise is THE thing everyone recommends. 
                It's the difference between a good weekend and a LEGENDARY weekend. It's the story people tell 
                for years. It's the experience that makes Austin a top-tier bach party destination.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-2xl font-bold">
                Miss it and you'll hear about it from EVERY other group who did it.
              </p>
              <p className="text-3xl font-bold text-yellow-400">
                Book it and be the hero who gave them the BEST DAY EVER.
              </p>
            </div>

            <div className="mt-12">
              <Link href="/quote-builder">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-12 py-8 h-auto"
                  data-testid="button-tragedy-cta"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Book the Legendary Disco Cruise Now
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              <p className="mt-4 text-sm text-white/80">
                48-hour full refund policy • Split payments available • Weather guaranteed
              </p>
            </div>
          </div>
        </motion.section>

        {/* Why Disco Cruise Wins for Your Group Size - Price Comparison Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-teal-900/20"
          data-testid="section-group-size-pricing"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-green-600 text-white text-lg px-6 py-2">
                <DollarSign className="w-5 h-5 mr-2 inline" /> Price Transparency
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                💰 Why Disco Cruise Wins for Your Group Size
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                See exactly how much you save AND get way more value!
              </p>
            </motion.div>

            <Tabs defaultValue="10-12" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 mb-8 h-auto bg-transparent">
                <TabsTrigger 
                  value="6-8" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                  data-testid="tab-6-8-people"
                >
                  <Users className="w-4 h-4" />
                  6-8 People
                </TabsTrigger>
                <TabsTrigger 
                  value="10-12" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                  data-testid="tab-10-12-people"
                >
                  <Users className="w-4 h-4" />
                  10-12 People
                </TabsTrigger>
                <TabsTrigger 
                  value="15-18" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                  data-testid="tab-15-18-people"
                >
                  <Users className="w-4 h-4" />
                  15-18 People
                </TabsTrigger>
                <TabsTrigger 
                  value="20-25" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                  data-testid="tab-20-25-people"
                >
                  <Users className="w-4 h-4" />
                  20-25 People
                </TabsTrigger>
                <TabsTrigger 
                  value="combined" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center gap-2 py-3"
                  data-testid="tab-combined-party"
                >
                  <Heart className="w-4 h-4" />
                  Combined Party
                </TabsTrigger>
              </TabsList>

              {/* 6-8 People Tab */}
              <TabsContent value="6-8" className="mt-8" data-testid="content-6-8-people">
                <Card className="border-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-3xl">6-8 People - Small Squad</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Disco Pricing */}
                    <div className="bg-green-50 dark:bg-green-950/30 border-4 border-green-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <PartyPopper className="w-6 h-6 text-green-600" />
                        🎉 DISCO CRUISE: DISCO QUEEN PACKAGE
                      </h3>
                      <div className="border-t-2 border-green-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>8 guests × $95 = $760.00</p>
                        <p>Tax (8.25%): $62.70</p>
                        <p>Gratuity (20%): $152.00</p>
                        <div className="border-t border-green-400 my-2"></div>
                        <p className="font-bold text-2xl text-green-700 dark:text-green-400">TOTAL: $974.70</p>
                        <p className="font-bold text-xl">Per Person: $121.84</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          ✅ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Professional DJ ($600 value)</li>
                          <li>• Professional photographer ($800 value)</li>
                          <li>• Private cooler for your group</li>
                          <li>• Reserved spot on the boat</li>
                          <li>• Giant inflatable unicorn & lily pads</li>
                          <li>• All party supplies (cups, koozies, bubbles)</li>
                          <li>• Disco ball cup for bride/groom</li>
                          <li>• Alcohol delivery voucher ($50-100)</li>
                          <li>• 25% off transportation</li>
                          <li>• Multi-group party atmosphere</li>
                          <li>• ZERO setup stress</li>
                        </ul>
                      </div>
                    </div>

                    {/* Private Pricing */}
                    <div className="bg-red-50 dark:bg-red-950/30 border-4 border-red-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Ship className="w-6 h-6 text-red-600" />
                        🚤 PRIVATE CRUISE: STANDARD PACKAGE
                      </h3>
                      <div className="border-t-2 border-red-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>Day Tripper (Saturday premium rate)</p>
                        <p>$350/hour × 4 hours = $1,400.00</p>
                        <p>Tax (8.25%): $115.50</p>
                        <p>Gratuity (20%): $280.00</p>
                        <div className="border-t border-red-400 my-2"></div>
                        <p className="font-bold text-2xl text-red-700 dark:text-red-400">TOTAL: $1,795.50</p>
                        <p className="font-bold text-xl">Per Person: $224.44</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Captain and empty boat</li>
                          <li>• Bluetooth speaker</li>
                          <li>• Coolers with ice</li>
                        </ul>
                        <h4 className="font-bold text-xl mt-4 mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU DON'T GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• No DJ</li>
                          <li>• No photographer</li>
                          <li>• No party supplies</li>
                          <li>• No floats</li>
                          <li>• You setup everything</li>
                        </ul>
                      </div>
                    </div>

                    {/* Verdict */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-4 border-yellow-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        🏆 THE VERDICT
                      </h3>
                      <div className="border-t-2 border-yellow-400 my-4"></div>
                      <p className="text-lg mb-4">
                        Small but mighty! Even though private seems 'exclusive,' you're paying $820 MORE for an empty boat. The disco cruise gives you professional entertainment, photographer capturing every moment, and 90+ other party people creating an electric atmosphere. For intimate groups, the value is insane!
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          💰 DISCO ADVANTAGE:
                        </h4>
                        <p className="mb-3">Even at $974.70 total vs private's $1,795.50, you get $1,600+ in extras!</p>
                        <div className="space-y-2">
                          <p className="font-bold">To match the disco experience on a private boat:</p>
                          <p>Private Base: $1,795.50</p>
                          <p>+ Hire DJ: $600.00</p>
                          <p>+ Photographer: $800.00</p>
                          <p>+ Party Supplies: $200.00</p>
                          <div className="border-t border-gray-400 my-2"></div>
                          <p className="font-bold text-xl text-red-600">Real Cost: $3,395.50 (That's $2,420 MORE than disco!)</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        ✨ PLUS: The multi-group party energy is PRICELESS. For small squads, being part of a 100-person party atmosphere creates memories you can't get on an empty boat!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 10-12 People Tab */}
              <TabsContent value="10-12" className="mt-8" data-testid="content-10-12-people">
                <Card className="border-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-3xl">10-12 People - Classic Party</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Disco Pricing */}
                    <div className="bg-green-50 dark:bg-green-950/30 border-4 border-green-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <PartyPopper className="w-6 h-6 text-green-600" />
                        🎉 DISCO CRUISE: DISCO QUEEN PACKAGE
                      </h3>
                      <div className="border-t-2 border-green-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>12 guests × $95 = $1,140.00</p>
                        <p>Tax (8.25%): $94.05</p>
                        <p>Gratuity (20%): $228.00</p>
                        <div className="border-t border-green-400 my-2"></div>
                        <p className="font-bold text-2xl text-green-700 dark:text-green-400">TOTAL: $1,462.05</p>
                        <p className="font-bold text-xl">Per Person: $121.84</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          ✅ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Professional DJ ($600 value)</li>
                          <li>• Professional photographer ($800 value)</li>
                          <li>• Private cooler for your group</li>
                          <li>• Reserved spot on the boat</li>
                          <li>• Giant inflatable unicorn & lily pads</li>
                          <li>• All party supplies (cups, koozies, bubbles)</li>
                          <li>• Disco ball cup for bride/groom</li>
                          <li>• Alcohol delivery voucher ($50-100)</li>
                          <li>• 25% off transportation</li>
                          <li>• Multi-group party atmosphere</li>
                          <li>• ZERO setup stress</li>
                        </ul>
                      </div>
                    </div>

                    {/* Private Pricing */}
                    <div className="bg-red-50 dark:bg-red-950/30 border-4 border-red-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Ship className="w-6 h-6 text-red-600" />
                        🚤 PRIVATE CRUISE: STANDARD PACKAGE
                      </h3>
                      <div className="border-t-2 border-red-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>Day Tripper (Saturday premium rate)</p>
                        <p>$350/hour × 4 hours = $1,400.00</p>
                        <p>Tax (8.25%): $115.50</p>
                        <p>Gratuity (20%): $280.00</p>
                        <div className="border-t border-red-400 my-2"></div>
                        <p className="font-bold text-2xl text-red-700 dark:text-red-400">TOTAL: $1,795.50</p>
                        <p className="font-bold text-xl">Per Person: $149.63</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Captain and empty boat</li>
                          <li>• Bluetooth speaker</li>
                          <li>• Coolers with ice</li>
                        </ul>
                        <h4 className="font-bold text-xl mt-4 mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU DON'T GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• No DJ</li>
                          <li>• No photographer</li>
                          <li>• No party supplies</li>
                          <li>• No floats</li>
                          <li>• You setup everything</li>
                        </ul>
                      </div>
                    </div>

                    {/* Verdict */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-4 border-yellow-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        🏆 THE VERDICT
                      </h3>
                      <div className="border-t-2 border-yellow-400 my-4"></div>
                      <p className="text-lg mb-4">
                        Perfect party size! You're saving $333 AND getting a DJ, photographer, and all the party vibes. Private boats at this size still feel empty – you're literally paying more for less fun. The disco cruise turns your dozen friends into part of a 100-person celebration. That's the energy your bach party deserves!
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          💰 DISCO ADVANTAGE:
                        </h4>
                        <p className="mb-3">At $1,462.05 total vs private's $1,795.50, you save $333 AND get $1,600+ in extras!</p>
                        <div className="space-y-2">
                          <p className="font-bold">To match the disco experience on a private boat:</p>
                          <p>Private Base: $1,795.50</p>
                          <p>+ Hire DJ: $600.00</p>
                          <p>+ Photographer: $800.00</p>
                          <p>+ Party Supplies: $200.00</p>
                          <div className="border-t border-gray-400 my-2"></div>
                          <p className="font-bold text-xl text-red-600">Real Cost: $3,395.50 (That's $1,933 MORE than disco!)</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        ✨ PLUS: The multi-group party energy is PRICELESS. Your group becomes part of something bigger and better!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 15-18 People Tab */}
              <TabsContent value="15-18" className="mt-8" data-testid="content-15-18-people">
                <Card className="border-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-3xl">15-18 People - Big Celebration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Disco Pricing */}
                    <div className="bg-green-50 dark:bg-green-950/30 border-4 border-green-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <PartyPopper className="w-6 h-6 text-green-600" />
                        🎉 DISCO CRUISE: DISCO QUEEN PACKAGE
                      </h3>
                      <div className="border-t-2 border-green-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>18 guests × $95 = $1,710.00</p>
                        <p>Tax (8.25%): $141.08</p>
                        <p>Gratuity (20%): $342.00</p>
                        <div className="border-t border-green-400 my-2"></div>
                        <p className="font-bold text-2xl text-green-700 dark:text-green-400">TOTAL: $2,193.08</p>
                        <p className="font-bold text-xl">Per Person: $121.84</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          ✅ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Professional DJ ($600 value)</li>
                          <li>• Professional photographer ($800 value)</li>
                          <li>• Private cooler for your group</li>
                          <li>• Reserved spot on the boat</li>
                          <li>• Giant inflatable unicorn & lily pads</li>
                          <li>• All party supplies (cups, koozies, bubbles)</li>
                          <li>• Disco ball cup for bride/groom</li>
                          <li>• Alcohol delivery voucher ($50-100)</li>
                          <li>• 25% off transportation</li>
                          <li>• Multi-group party atmosphere</li>
                          <li>• ZERO setup stress</li>
                        </ul>
                      </div>
                    </div>

                    {/* Private Pricing */}
                    <div className="bg-red-50 dark:bg-red-950/30 border-4 border-red-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Ship className="w-6 h-6 text-red-600" />
                        🚤 PRIVATE CRUISE: STANDARD PACKAGE
                      </h3>
                      <div className="border-t-2 border-red-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>Meeseeks/Irony (Saturday premium rate)</p>
                        <p>$375/hour × 4 hours = $1,500.00</p>
                        <p>Tax (8.25%): $123.75</p>
                        <p>Gratuity (20%): $300.00</p>
                        <div className="border-t border-red-400 my-2"></div>
                        <p className="font-bold text-2xl text-red-700 dark:text-red-400">TOTAL: $1,923.75</p>
                        <p className="font-bold text-xl">Per Person: $106.88</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Captain and empty boat</li>
                          <li>• Bluetooth speaker</li>
                          <li>• Coolers with ice</li>
                        </ul>
                        <h4 className="font-bold text-xl mt-4 mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU DON'T GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• No DJ</li>
                          <li>• No photographer</li>
                          <li>• No party supplies</li>
                          <li>• No floats</li>
                          <li>• You setup everything</li>
                        </ul>
                      </div>
                    </div>

                    {/* Verdict */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-4 border-yellow-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        🏆 THE VERDICT
                      </h3>
                      <div className="border-t-2 border-yellow-400 my-4"></div>
                      <p className="text-lg mb-4">
                        The sweet spot! Yes, private is $269 cheaper upfront, but here's reality: You're on an empty boat with a Bluetooth speaker. To get the same experience, add DJ ($600) + photographer ($800) + supplies ($200) = $3,523.75 total. That's $1,330 MORE than the disco cruise! Plus, your group of 18 gets absorbed into the disco party energy instead of creating it all yourself. Way more fun, way less work!
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          💰 DISCO ADVANTAGE:
                        </h4>
                        <p className="mb-3">Private looks $269 cheaper at $1,923.75 vs disco's $2,193.08, but you get NOTHING!</p>
                        <div className="space-y-2">
                          <p className="font-bold">To match the disco experience on a private boat:</p>
                          <p>Private Base: $1,923.75</p>
                          <p>+ Hire DJ: $600.00</p>
                          <p>+ Photographer: $800.00</p>
                          <p>+ Party Supplies: $200.00</p>
                          <div className="border-t border-gray-400 my-2"></div>
                          <p className="font-bold text-xl text-red-600">Real Cost: $3,523.75 (That's $1,330 MORE than disco!)</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        ✨ PLUS: The multi-group party energy is PRICELESS. Your group of 18 gets absorbed into the party instead of trying to create it yourselves!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 20-25 People Tab */}
              <TabsContent value="20-25" className="mt-8" data-testid="content-20-25-people">
                <Card className="border-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-3xl">20-25 People - Epic Bash</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Disco Pricing */}
                    <div className="bg-green-50 dark:bg-green-950/30 border-4 border-green-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <PartyPopper className="w-6 h-6 text-green-600" />
                        🎉 DISCO CRUISE: DISCO QUEEN PACKAGE
                      </h3>
                      <div className="border-t-2 border-green-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>22 guests × $95 = $2,090.00</p>
                        <p>Tax (8.25%): $172.43</p>
                        <p>Gratuity (20%): $418.00</p>
                        <div className="border-t border-green-400 my-2"></div>
                        <p className="font-bold text-2xl text-green-700 dark:text-green-400">TOTAL: $2,680.43</p>
                        <p className="font-bold text-xl">Per Person: $121.84</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          ✅ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Professional DJ ($600 value)</li>
                          <li>• Professional photographer ($800 value)</li>
                          <li>• Private cooler for your group</li>
                          <li>• Reserved spot on the boat</li>
                          <li>• Giant inflatable unicorn & lily pads</li>
                          <li>• All party supplies (cups, koozies, bubbles)</li>
                          <li>• Disco ball cup for bride/groom</li>
                          <li>• Alcohol delivery voucher ($50-100)</li>
                          <li>• 25% off transportation</li>
                          <li>• Multi-group party atmosphere</li>
                          <li>• ZERO setup stress</li>
                        </ul>
                      </div>
                    </div>

                    {/* Private Pricing */}
                    <div className="bg-red-50 dark:bg-red-950/30 border-4 border-red-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Ship className="w-6 h-6 text-red-600" />
                        🚤 PRIVATE CRUISE: STANDARD PACKAGE
                      </h3>
                      <div className="border-t-2 border-red-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>Meeseeks/Irony (Saturday premium rate)</p>
                        <p>$375/hour × 4 hours = $1,500.00</p>
                        <p>Tax (8.25%): $123.75</p>
                        <p>Gratuity (20%): $300.00</p>
                        <div className="border-t border-red-400 my-2"></div>
                        <p className="font-bold text-2xl text-red-700 dark:text-red-400">TOTAL: $1,923.75</p>
                        <p className="font-bold text-xl">Per Person: $87.44</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Captain and empty boat</li>
                          <li>• Bluetooth speaker</li>
                          <li>• Coolers with ice</li>
                        </ul>
                        <h4 className="font-bold text-xl mt-4 mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU DON'T GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• No DJ</li>
                          <li>• No photographer</li>
                          <li>• No party supplies</li>
                          <li>• No floats</li>
                          <li>• You setup everything</li>
                        </ul>
                      </div>
                    </div>

                    {/* Verdict */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-4 border-yellow-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        🏆 THE VERDICT
                      </h3>
                      <div className="border-t-2 border-yellow-400 my-4"></div>
                      <p className="text-lg mb-4">
                        Big squad energy! Private looks $756 cheaper, but you're getting a captain and a speaker. That's it. To recreate the disco vibe, you'd need to hire a DJ ($600), photographer ($800), buy all party supplies ($200), and somehow manufacture the energy of 100 people partying together. Total: $3,523.75. For big groups, the disco cruise isn't just a better deal – it's the ONLY way to get this experience!
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          💰 DISCO ADVANTAGE:
                        </h4>
                        <p className="mb-3">Private looks $756 cheaper at $1,923.75 vs disco's $2,680.43, but you get NOTHING!</p>
                        <div className="space-y-2">
                          <p className="font-bold">To match the disco experience on a private boat:</p>
                          <p>Private Base: $1,923.75</p>
                          <p>+ Hire DJ: $600.00</p>
                          <p>+ Photographer: $800.00</p>
                          <p>+ Party Supplies: $200.00</p>
                          <div className="border-t border-gray-400 my-2"></div>
                          <p className="font-bold text-xl text-red-600">Real Cost: $3,523.75 (That's $843 MORE than disco!)</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        ✨ PLUS: The multi-group party energy is PRICELESS. 22 people can't create the same vibe as 100!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Combined Party Tab */}
              <TabsContent value="combined" className="mt-8" data-testid="content-combined-party">
                <Card className="border-4 border-pink-500">
                  <CardHeader>
                    <CardTitle className="text-3xl flex items-center gap-2">
                      <Heart className="w-8 h-8 text-pink-600" />
                      Combined Bachelor/Bachelorette Party
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Disco Pricing */}
                    <div className="bg-pink-50 dark:bg-pink-950/30 border-4 border-pink-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <PartyPopper className="w-6 h-6 text-pink-600" />
                        🎉 DISCO CRUISE: DISCO QUEEN PACKAGE
                      </h3>
                      <div className="border-t-2 border-pink-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>18 guests × $95 = $1,710.00</p>
                        <p>Tax (8.25%): $141.08</p>
                        <p>Gratuity (20%): $342.00</p>
                        <div className="border-t border-pink-400 my-2"></div>
                        <p className="font-bold text-2xl text-pink-700 dark:text-pink-400">TOTAL: $2,193.08</p>
                        <p className="font-bold text-xl">Per Person: $121.84</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-pink-600" />
                          ✅ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Professional DJ ($600 value)</li>
                          <li>• Professional photographer ($800 value)</li>
                          <li>• Private cooler for your group</li>
                          <li>• Reserved spot on the boat</li>
                          <li>• Giant inflatable unicorn & lily pads</li>
                          <li>• All party supplies (cups, koozies, bubbles)</li>
                          <li>• Disco ball cup for bride/groom</li>
                          <li>• Alcohol delivery voucher ($50-100)</li>
                          <li>• 25% off transportation</li>
                          <li>• Multi-group party atmosphere</li>
                          <li>• ZERO setup stress</li>
                        </ul>
                      </div>
                    </div>

                    {/* Private Pricing */}
                    <div className="bg-red-50 dark:bg-red-950/30 border-4 border-red-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Ship className="w-6 h-6 text-red-600" />
                        🚤 PRIVATE CRUISE: STANDARD PACKAGE
                      </h3>
                      <div className="border-t-2 border-red-400 my-4"></div>
                      <div className="space-y-2 text-lg">
                        <p>Meeseeks/Irony (Saturday premium rate)</p>
                        <p>$375/hour × 4 hours = $1,500.00</p>
                        <p>Tax (8.25%): $123.75</p>
                        <p>Gratuity (20%): $300.00</p>
                        <div className="border-t border-red-400 my-2"></div>
                        <p className="font-bold text-2xl text-red-700 dark:text-red-400">TOTAL: $1,923.75</p>
                        <p className="font-bold text-xl">Per Person: $106.88</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• Captain and empty boat</li>
                          <li>• Bluetooth speaker</li>
                          <li>• Coolers with ice</li>
                        </ul>
                        <h4 className="font-bold text-xl mt-4 mb-3 flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          ❌ YOU DON'T GET:
                        </h4>
                        <ul className="space-y-2 ml-6">
                          <li>• No DJ</li>
                          <li>• No photographer</li>
                          <li>• No party supplies</li>
                          <li>• No floats</li>
                          <li>• You setup everything</li>
                        </ul>
                      </div>
                    </div>

                    {/* Verdict */}
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 border-4 border-pink-500 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-pink-600" />
                        🏆 THE VERDICT
                      </h3>
                      <div className="border-t-2 border-pink-400 my-4"></div>
                      <p className="text-lg mb-4">
                        Bros and brides unite! Combined parties are where disco cruises absolutely SHINE. Why? The multi-group dynamic! You've got 100 people on board – other bach parties, bachelorette squads, birthday crews. The guys vibe with guys, girls connect with girls, everyone mingles, and suddenly your party of 18 becomes part of something legendary. On a private boat? You're just... 18 people on a boat. Same faces the whole time. The disco cruise creates those 'remember when we met those people' moments. Plus, having a professional DJ read the mixed crowd and a photographer capturing the combined chaos? That's $1,600 in value you can't recreate. This is THE move for combined parties!
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-pink-600" />
                          💰 DISCO ADVANTAGE FOR COMBINED PARTIES:
                        </h4>
                        <p className="mb-3">The multi-group atmosphere makes combined parties MAGICAL!</p>
                        <div className="space-y-2">
                          <p className="font-bold">To match the disco experience on a private boat:</p>
                          <p>Private Base: $1,923.75</p>
                          <p>+ Hire DJ (who can read mixed crowds): $600.00</p>
                          <p>+ Photographer (for combined group shots): $800.00</p>
                          <p>+ Party Supplies: $200.00</p>
                          <div className="border-t border-gray-400 my-2"></div>
                          <p className="font-bold text-xl text-red-600">Real Cost: $3,523.75 (That's $1,330 MORE than disco!)</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-600" />
                        ❤️‍🔥 PLUS: The multi-group party energy is PRICELESS for combined parties. Meeting other mixed groups creates the most memorable experiences!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-12 text-center">
              <Button
                size="lg"
                onClick={handleBookNow}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-2xl px-16 py-8"
                data-testid="button-pricing-cta"
              >
                <Trophy className="mr-3 h-7 w-7" />
                Book the Best Value Now!
                <ArrowRight className="ml-3 h-7 w-7" />
              </Button>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                All calculations include tax & gratuity • Saturday premium rates shown
              </p>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Carousel */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4"
          data-testid="section-testimonials"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" data-testid="text-testimonials-headline">
              <Quote className="w-10 h-10 inline mr-3 text-purple-600" />
              What Our Customers Say
            </h2>
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full" data-testid={`card-testimonial-${testimonial.id}`}>
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">{testimonial.avatar}</span>
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription>{testimonial.role} • {testimonial.location}</CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{testimonial.text}</p>
                        <Badge variant="outline" className="text-xs">{testimonial.package}</Badge>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-white/50 dark:bg-gray-800/50"
          data-testid="section-faq"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" data-testid="text-faq-headline">
              <HelpCircle className="w-10 h-10 inline mr-3 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-6 bg-white dark:bg-gray-800" data-testid={`accordion-faq-${faq.id}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        {/* Party Planning Checklist */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4"
          data-testid="section-checklist"
        >
          <div className="max-w-5xl mx-auto">
            <PartyPlanningChecklist eventType="disco" />
          </div>
        </motion.section>

        {/* Lemonade Disco Weather Backup */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
          data-testid="section-weather-backup"
        >
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-yellow-500">
              <CardHeader className="text-center">
                <CloudRain className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
                <CardTitle className="text-3xl mb-2" data-testid="text-weather-headline">
                  Lemonade Disco - Weather Backup Plan
                </CardTitle>
                <CardDescription className="text-lg" data-testid="text-weather-subheadline">
                  When life gives you rain, we throw a Lemonade Disco!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-center" data-testid="text-weather-description">
                  We cruise rain or shine with covered areas on the boat! But for severe weather (lightning, high winds), 
                  we activate our legendary backup plan - a land-based party that's become famous in its own right.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-orange-600" /> What's Included
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Fajita or BBQ buffet with all the fixings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Professional DJ keeping the party going</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Indoor/covered venue with full bar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Same multi-group party atmosphere</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" /> Our Guarantee
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Still an epic party, just on dry land</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Full refund if we cancel and can't provide Lemonade Disco</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>Many groups love the Lemonade Disco as much as the cruise!</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg mt-6">
                  <p className="text-center font-semibold text-yellow-800 dark:text-yellow-200">
                    💡 Pro Tip: Some bach parties book specifically hoping for the Lemonade Disco - it's that good!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600"
          data-testid="section-final-cta"
        >
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-final-cta-headline">
              Ready for America's Best Bach Party?
            </h2>
            <p className="text-xl mb-8 opacity-90" data-testid="text-final-cta-subheadline">
              Join bachelor & bachelorette parties from across the country for an unforgettable experience. 
              Book now before your date sells out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleBookNow}
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6"
                data-testid="button-final-book-now"
              >
                Book Your Spot Now <ArrowRight className="ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/contact')}
                className="border-white text-white hover:bg-white/20 text-lg px-8 py-6"
                data-testid="button-final-contact"
              >
                <Phone className="mr-2" /> Questions? Call Us
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-75" data-testid="text-final-urgency">
              ⚡ Peak weekends sell out 4-6 weeks in advance. Don't wait!
            </p>
          </div>
        </motion.section>

        {/* SEO-Optimized Hidden Content for Search Engines */}
        <div className="sr-only" itemScope itemType="https://schema.org/Event">
          <h2 itemProp="name">ATX Disco Cruise - Lake Travis Party Cruise</h2>
          <p itemProp="description">
            The ATX Disco Cruise is Austin's premier bachelorette party cruise and Lake Travis party experience. 
            Join bachelor and bachelorette parties from across the country for an unforgettable 4-hour cruise 
            on beautiful Lake Travis. Professional DJ, photographer, giant floats, and the ultimate party atmosphere.
          </p>
          
          <div itemProp="location" itemScope itemType="https://schema.org/Place">
            <span itemProp="name">Lake Travis, Austin, Texas</span>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressLocality">Austin</span>,
              <span itemProp="addressRegion">TX</span>
            </div>
          </div>

          <h2>ATX Disco Cruise Event Details</h2>
          <p>4-hour party cruise on Lake Travis with professional DJ and photographer</p>
          <p>BYOB options with shared coolers and ice provided</p>
          <p>Giant unicorn floats and party supplies included</p>
          <p>Perfect for bachelorette party Austin celebrations</p>
          <p>Meet bachelor and bachelorette parties from across America</p>
          <p>Anderson Mill Marina departure location</p>
          
          <h2>ATX Disco Cruise Packages and Pricing</h2>
          
          <div itemScope itemType="https://schema.org/Offer">
            <h3 itemProp="name">Basic Bach Package</h3>
            <meta itemProp="price" content="85" />
            <meta itemProp="priceCurrency" content="USD" />
            <p itemProp="description">$85 per person - Join the BEST Party on Lake Travis, Exclusively for Bach Parties!</p>
            <p>BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise</p>
            <ul>
              <li>Full 4-hour Lake Travis cruise experience</li>
              <li>Professional DJ entertainment all day</li>
              <li>Professional photographer capturing memories</li>
              <li>Digital photo delivery after the event</li>
              <li>Giant unicorn float access</li>
              <li>Multi-group party atmosphere</li>
              <li>BYOB with shared coolers & ice</li>
              <li>Alcohol delivery & lunch delivery available</li>
            </ul>
          </div>

          <div itemScope itemType="https://schema.org/Offer">
            <h3 itemProp="name">Disco Queen Package</h3>
            <meta itemProp="price" content="95" />
            <meta itemProp="priceCurrency" content="USD" />
            <p itemProp="description">$95 per person - Enhanced party experience with premium perks and VIP treatment</p>
            <p>Private Cooler & Reserved Spot for Your Group</p>
            <ul>
              <li>Everything in Basic Bach Package</li>
              <li>Private cooler with ice & storage bin for your group</li>
              <li>Reserved spot for your group on the boat</li>
              <li>Disco ball cup & bubble gun for guest of honor</li>
              <li>Complimentary direct-to-boat alcohol & lunch delivery</li>
              <li>25% discount on round-trip transportation</li>
              <li>$50-$100 voucher for Airbnb booze delivery</li>
              <li>Premium positioning on the boat</li>
            </ul>
          </div>

          <div itemScope itemType="https://schema.org/Offer">
            <h3 itemProp="name">Super Sparkle Platinum Disco Package</h3>
            <meta itemProp="price" content="105" />
            <meta itemProp="priceCurrency" content="USD" />
            <p itemProp="description">$105 per person - Ultimate all-inclusive party experience with maximum celebration</p>
            <p>Nothing to Carry, Cooler Stocked When You Arrive!</p>
            <ul>
              <li>Everything in Disco Queen Package</li>
              <li>Personal unicorn float for guest of honor</li>
              <li>Mimosa setup with champagne flutes, 3 juices & chambong</li>
              <li>$100 voucher for Airbnb concierge services</li>
              <li>Towel service & SPF-50 spray sunscreen provided</li>
              <li>Nothing to carry - cooler pre-stocked with drinks</li>
              <li>VIP treatment throughout the cruise</li>
              <li>Extended photo coverage & exclusive surprises</li>
            </ul>
          </div>

          <h2>Lake Travis Party Cruise Keywords</h2>
          <p>ATX Disco Cruise, Lake Travis party cruise, bachelorette party Austin, bachelor party Austin, 
             Austin party boat, Lake Travis bachelor party, Lake Travis bachelorette party, Austin boat party, 
             party cruise Austin, disco cruise Lake Travis, Austin bachelorette cruise, Lake Travis party boat</p>
        </div>

        {/* JSON-LD Structured Data for Event */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "ATX Disco Cruise",
            "description": "Austin's premier bachelorette party cruise on Lake Travis. 4-hour party experience with professional DJ, photographer, and multi-group celebration atmosphere. BYOB options available.",
            "image": "https://premierpartycruises.com/assets/atx-disco-cruise-party.jpg",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": "Anderson Mill Marina, Lake Travis",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Austin",
                "addressRegion": "TX",
                "addressCountry": "US"
              }
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Basic Bach Package",
                "price": "85",
                "priceCurrency": "USD",
                "description": "Full 4-hour Lake Travis cruise with DJ, photographer, and giant floats",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
              },
              {
                "@type": "Offer",
                "name": "Disco Queen Package",
                "price": "95",
                "priceCurrency": "USD",
                "description": "Enhanced experience with private cooler, reserved spot, and VIP perks",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
              },
              {
                "@type": "Offer",
                "name": "Super Sparkle Platinum Disco",
                "price": "105",
                "priceCurrency": "USD",
                "description": "Ultimate all-inclusive VIP experience with personal float and premium amenities",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
              }
            ],
            "performer": {
              "@type": "Organization",
              "name": "Premier Party Cruises"
            },
            "organizer": {
              "@type": "Organization",
              "name": "Premier Party Cruises",
              "url": "https://premierpartycruises.com"
            }
          })
        }} />

        {/* JSON-LD Structured Data for LocalBusiness */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises - ATX Disco Cruise",
            "image": "https://premierpartycruises.com/assets/atx-disco-cruise-party.jpg",
            "description": "Premier bachelorette party cruises on Lake Travis. ATX Disco Cruise features professional DJ, photographer, giant floats, and the ultimate party atmosphere for bachelor and bachelorette celebrations.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "telephone": "+1-512-488-5892",
            "url": "https://premierpartycruises.com/atx-disco-cruise",
            "priceRange": "$85-$105",
            "servesCuisine": "Party Cruises",
            "paymentAccepted": "Cash, Credit Card, Debit Card",
            "openingHours": "Mo-Su 09:00-21:00",
            "sameAs": [
              "https://www.facebook.com/premierpartycruises",
              "https://www.instagram.com/premierpartycruises"
            ]
          })
        }} />

        {/* Related Services Section */}
        <RelatedServicesSection currentPath="/atx-disco-cruise" />

        {/* Related Links */}
        <RelatedLinks 
          blogLinks={[
            { title: 'ATX Disco Cruise Complete Guide', href: '/blogs/atx-disco-cruise-ultimate-guide' },
            { title: 'What to Expect on the Disco Cruise', href: '/blogs/atx-disco-cruise-experience' },
            { title: 'Bachelor vs Bachelorette Party Tips', href: '/blogs/bachelor-bachelorette-party-tips' }
          ]}
        />

        <Footer />
      </div>
    </>
  );
}

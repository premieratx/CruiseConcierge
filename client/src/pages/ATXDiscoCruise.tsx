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
import { SectionReveal } from '@/components/SectionReveal';
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
import { WhatToBring } from '@/components/WhatToBring';
import { PricingTable } from '@/components/PricingTable';
import AIOptimizedSection from '@/components/AIOptimizedSection';
import { TableOfContents } from '@/components/TableOfContents';
import { StickyCTA } from '@/components/StickyCTA';

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

// Table of Contents sections
const tocSections = [
  { id: 'hero', title: 'Overview', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'quick-answers', title: 'Quick Answers', icon: <MessageCircle className="h-4 w-4" /> },
  { id: 'packages', title: 'Packages & Pricing', icon: <Package className="h-4 w-4" /> },
  { id: 'whats-included', title: "What's Included", icon: <CheckCircle className="h-4 w-4" /> },
  { id: 'experience', title: '4-Hour Experience', icon: <Clock className="h-4 w-4" /> },
  { id: 'testimonials', title: 'Reviews & Testimonials', icon: <Quote className="h-4 w-4" /> },
  { id: 'faqs', title: 'FAQs', icon: <HelpCircle className="h-4 w-4" /> },
  { id: 'what-to-bring', title: 'What to Bring', icon: <Ticket className="h-4 w-4" /> },
  { id: 'final-cta', title: 'Book Now', icon: <Calendar className="h-4 w-4" /> }
];

export default function ATXDiscoCruise() {
  const [, navigate] = useLocation();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return;
    
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

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <PublicNavigation />
        <Breadcrumb />

        {/* Hero Section */}
        <motion.section 
          id="hero"
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

          <div className="relative z-20 max-w-7xl mx-auto px-6 text-center flex-grow flex items-center">
            <motion.div variants={fadeInUp} className="w-full">
              <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 text-center" data-testid="text-hero-headline">
                ATX Disco Cruise
              </h1>
              <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mt-4 mb-4 font-bold text-center">
                The Country's Only Multi-Group Bach Party Cruise
              </p>
              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto font-semibold text-center" data-testid="text-hero-subheadline">
                The single most unique and comprehensive bachelor/bachelorette party experience in the United States
              </p>
              <p className="text-base md:text-lg text-white/80 mb-8 max-w-3xl mx-auto text-center" data-testid="text-hero-description">
                Only all-inclusive, multi-group bachelor/bachelorette party cruise in the country. Join parties from across America for an unforgettable 4-hour Lake Travis celebration with professional DJ, photographer, and 100% satisfaction track record! Need a larger private celebration? Explore <Link href="/private-cruises" className="text-brand-yellow hover:underline font-semibold">our private cruises</Link> for exclusive group experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base px-8 py-6"
                  data-testid="button-book-now"
                >
                  Book Your Spot Now <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-base px-8 py-6"
                  data-testid="button-learn-more"
                >
                  <Phone className="mr-2" /> Talk to an Expert
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="relative z-30 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
            <div className="container mx-auto">
              <p className="text-center text-gray-900 dark:text-white text-base md:text-lg font-semibold">
                🎉 <span className="text-purple-600">All-Inclusive</span> • Professional DJ & Photographer • <span className="text-pink-600">Fridays & Saturdays</span> 🎉
              </p>
            </div>
          </div>
        </motion.section>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* Quick Answer Boxes Section */}
        <SectionReveal>
          <section id="quick-answers" className="py-24 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-6">
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
        </SectionReveal>

        {/* Packages Section */}
        <SectionReveal>
          <section className="py-24 px-6 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900" id="packages" data-testid="section-packages">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center" data-testid="text-packages-headline">
                  Choose Your Package
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center" data-testid="text-packages-subheadline">
                  From budget-friendly to all-inclusive VIP - we've got the perfect party package for every group
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {discoPackages.map((pkg, index) => (
                  <Card 
                    key={pkg.id} 
                    className={cn(
                      "relative overflow-hidden rounded-xl",
                      pkg.popular && "ring-4 ring-purple-600 shadow-2xl"
                    )}
                    data-testid={`card-package-${pkg.id}`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2">
                        <Badge className="font-sans tracking-wider bg-white text-purple-600">
                          {pkg.badge}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className={cn(pkg.popular && "pt-14")}>
                      <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                          <pkg.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl text-center">{pkg.name}</CardTitle>
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          {pkg.originalPrice && (
                            <span className="text-xl text-gray-400 line-through">
                              ${pkg.originalPrice}
                            </span>
                          )}
                          <span className="text-4xl font-bold text-purple-600">
                            ${pkg.price}
                          </span>
                          <span className="text-base text-gray-600 dark:text-gray-400">/person</span>
                        </div>
                      </div>
                      <CardDescription className="text-center text-base mt-2">
                        {pkg.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-base text-gray-700 dark:text-gray-300 text-center">
                        {pkg.description}
                      </p>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-base">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={handleBookNow}
                        className={cn(
                          "w-full",
                          pkg.popular 
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" 
                            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        )}
                        data-testid={`button-select-${pkg.id}`}
                      >
                        Select {pkg.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* What's Included Section */}
        <SectionReveal>
          <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950" id="whats-included" data-testid="section-whats-included">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center" data-testid="text-included-headline">
                  Everything You Need, All Included
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 text-center" data-testid="text-included-subheadline">
                  Premium amenities and services for the ultimate party experience
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {whatsIncluded.map((item, idx) => (
                  <Card className="text-center hover:shadow-lg transition-shadow h-full rounded-xl" key={idx} data-testid={`card-included-${idx}`}>
                    <CardContent className="pt-6">
                      <item.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                      <h3 className="text-lg font-bold mb-2 text-center">{item.title}</h3>
                      <p className="text-base text-gray-600 dark:text-gray-400 text-center">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* 4-Hour Experience Timeline */}
        <SectionReveal>
          <section id="experience" className="py-24 px-6 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900" data-testid="section-experience">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center" data-testid="text-experience-headline">
                  Your 4-Hour Journey
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 text-center" data-testid="text-experience-subheadline">
                  Hour-by-hour breakdown of an unforgettable experience
                </p>
              </div>

              <div className="space-y-8">
                {experienceTimeline.map((hour, idx) => (
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow rounded-xl relative" key={idx} data-testid={`card-hour-${idx + 1}`}>
                    <div className="absolute top-6 left-6 text-6xl font-black text-purple-200 opacity-30 font-sans">
                      {idx + 1}
                    </div>
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
                      <p className="text-base text-gray-700 dark:text-gray-300">{hour.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base px-12 py-6"
                  data-testid="button-experience-cta"
                >
                  Experience This Magic <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Testimonials Section */}
        <SectionReveal>
          <section id="testimonials" className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950" data-testid="section-testimonials">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-16" data-testid="text-testimonials-headline">
                <Quote className="w-10 h-10 inline mr-3 text-purple-600" />
                What Our Customers Say
              </h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full rounded-xl" data-testid={`card-testimonial-${testimonial.id}`}>
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-4xl">{testimonial.avatar}</span>
                            <div>
                              <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                              <CardDescription className="text-base">{testimonial.role} • {testimonial.location}</CardDescription>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-base text-gray-700 dark:text-gray-300 mb-3">{testimonial.text}</p>
                          <Badge variant="outline" className="text-xs font-sans tracking-wider">{testimonial.package}</Badge>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>
        </SectionReveal>

        {/* FAQ Section */}
        <SectionReveal>
          <section id="faqs" className="py-24 px-6 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900" data-testid="section-faq">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-16" data-testid="text-faq-headline">
                <HelpCircle className="w-10 h-10 inline mr-3 text-purple-600" />
                Frequently Asked Questions
              </h2>
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="border rounded-xl px-6 bg-white dark:bg-gray-800" data-testid={`accordion-faq-${faq.id}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-semibold text-base">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Final CTA Section */}
        <SectionReveal>
          <section id="final-cta" className="py-24 px-6 bg-gradient-to-r from-purple-600 to-pink-600" data-testid="section-final-cta">
            <div className="max-w-7xl mx-auto text-center text-white">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center" data-testid="text-final-cta-headline">
                Ready for America's Best Bach Party?
              </h2>
              <p className="text-base mb-8 opacity-90 text-center max-w-3xl mx-auto" data-testid="text-final-cta-subheadline">
                Join bachelor & bachelorette parties from across the country for an unforgettable experience. 
                Book now before your date sells out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={handleBookNow}
                  className="bg-white text-purple-600 hover:bg-gray-100 text-base px-8 py-6"
                  data-testid="button-final-book-now"
                >
                  Book Your Spot Now <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="border-white text-white hover:bg-white/20 text-base px-8 py-6"
                  data-testid="button-final-contact"
                >
                  <Phone className="mr-2" /> Questions? Call Us
                </Button>
              </div>
              <p className="mt-6 text-sm opacity-75 text-center" data-testid="text-final-urgency">
                ⚡ Peak weekends sell out 4-6 weeks in advance. Don't wait!
              </p>
            </div>
          </section>
        </SectionReveal>

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

        {/* What to Bring Section */}
        <SectionReveal>
          <section id="what-to-bring" className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
            <div className="max-w-7xl mx-auto px-6">
              <WhatToBring
                variant="disco"
                title="What to Bring on the ATX Disco Cruise"
                description="Everything you need for the ultimate party on Lake Travis"
                className="max-w-7xl mx-auto"
              />
            </div>
          </section>
        </SectionReveal>

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

        {/* Sticky CTA */}
        <StickyCTA
          primaryText="Book Your Cruise"
          primaryAction={handleBookNow}
          secondaryText="Call Now"
          secondaryHref="tel:+15127705050"
          showOnDesktop={false}
        />

        <Footer />
      </div>
    </>
  );
}

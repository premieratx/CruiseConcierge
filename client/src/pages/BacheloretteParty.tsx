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
import { SectionReveal } from '@/components/SectionReveal';
import { ScrollReveal } from '@/components/ScrollReveal';
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

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.webp';
import heroImage2 from '@assets/atx-disco-cruise-party.webp';
import heroImage3 from '@assets/dancing-party-scene.webp';
import galleryImage1 from '@assets/party-atmosphere-1.webp';
import galleryImage2 from '@assets/party-atmosphere-2.webp';
import galleryImage3 from '@assets/party-atmosphere-3.webp';
import boatImage1 from '@assets/day-tripper-14-person-boat.webp';
import boatImage2 from '@assets/meeseeks-25-person-boat.webp';
import boatImage3 from '@assets/clever-girl-50-person-boat.webp';
import floatImage from '@assets/giant-unicorn-float.webp';

// ATX Disco Cruise packages for bachelorettes
const bachelorettePackages = [
  {
    id: 'basic_bachelorette',
    name: 'Basic Bach Package',
    price: DISCO_PRICING.basic / 100,
    originalPrice: null,
    description: 'Join the BEST bachelorette party on Lake Travis',
    subtitle: 'Most affordable option for bachelorette groups',
    features: [
      'Join the BEST bachelorette party on Lake Travis',
      'BYOB with shared cooler and ice',
      'Alcohol & food delivery available',
      'Professional DJ and photographer included',
      'Giant floats and party atmosphere',
      'Most affordable option for bachelorette groups'
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
    description: 'Our signature bachelorette party experience - Most Popular!',
    subtitle: 'Private cooler with ice for your group',
    features: [
      '🎉 BRIDE CRUISES FREE with this package!',
      'Private cooler with ice for your group',
      'Reserved spot for your bachelorette crew',
      'Disco ball cup & bubble gun for bride',
      'Complimentary alcohol & lunch delivery',
      '25% discount on round-trip transportation',
      '$50-$100 Airbnb delivery voucher'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular',
    brideSpecial: true
  },
  {
    id: 'platinum_bride',
    name: 'Super Sparkle Platinum',
    price: DISCO_PRICING.platinum / 100,
    originalPrice: 140,
    description: 'Ultimate all-inclusive bachelorette party luxury',
    subtitle: 'Cooler pre-stocked with drinks on arrival',
    features: [
      '🎉 BRIDE CRUISES FREE with this package!',
      'Personal unicorn float for the bride',
      'Mimosa setup with flutes, juices & chambong',
      '$100 Airbnb concierge services voucher',
      'Towel service & SPF-50 spray sunscreen',
      'Cooler pre-stocked with drinks on arrival',
      'Everything from Disco Queen Package'
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
    description: 'Playing bachelorette favorites all day'
  },
  {
    icon: Camera,
    title: 'Professional Photographer',
    description: 'Capturing every moment'
  },
  {
    icon: Anchor,
    title: 'Private Cooler Space',
    description: 'Private cooler space for your group'
  },
  {
    icon: GlassWater,
    title: 'Mimosa Supplies',
    description: 'Mimosa supplies with champagne flutes'
  },
  {
    icon: Waves,
    title: 'Giant Lily Pad Floats',
    description: 'Multiple 6x20\' giant lily pad floats'
  },
  {
    icon: Gift,
    title: 'Party Supplies',
    description: 'Cups, koozies, decorations'
  },
  {
    icon: Droplets,
    title: 'Ice Water Stations',
    description: 'Ice water stations throughout the cruise'
  },
  {
    icon: Shield,
    title: 'Clean Restroom Facilities',
    description: 'Clean restroom facilities on board'
  },
  {
    icon: Sun,
    title: 'Shaded Lounge Areas',
    description: 'Shaded lounge areas'
  },
  {
    icon: Users,
    title: 'Party Atmosphere',
    description: 'Party atmosphere with other bachelorette groups'
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
    question: 'Can we split payments between the girls?',
    answer: 'Yes. Split payment options are available at checkout.'
  },
  {
    id: 'attire',
    question: 'Is disco attire required?',
    answer: 'Encouraged but not required; many groups coordinate outfits.'
  },
  {
    id: 'weather-policy',
    question: 'What happens in bad weather?',
    answer: 'Rain or shine. For severe weather, we move to Lemonade Disco (land venue).',
    answerJsx: (
      <>
        Rain or shine. For severe weather, we move to{' '}
        <a href="#lemonade-disco" className="text-pink-500 hover:underline font-semibold">
          Lemonade Disco
        </a>{' '}
        (land venue).
      </>
    )
  },
  {
    id: 'add-people',
    question: 'Can we add more girls after booking?',
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

// Table of Contents sections
const tocSections = [
  { id: 'hero', title: 'Hero', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'quick-answers', title: 'Quick Answers', icon: <MessageCircle className="h-4 w-4" /> },
  { id: 'packages', title: 'Packages', icon: <Package className="h-4 w-4" /> },
  { id: 'whats-included', title: "What's Included", icon: <CheckCircle className="h-4 w-4" /> },
  { id: 'testimonials', title: 'Testimonials', icon: <Quote className="h-4 w-4" /> },
  { id: 'photos', title: 'Photos', icon: <Camera className="h-4 w-4" /> },
  { id: 'faqs', title: 'FAQs', icon: <HelpCircle className="h-4 w-4" /> },
  { id: 'what-to-bring', title: 'What to Bring', icon: <Ticket className="h-4 w-4" /> },
  { id: 'planning-timeline', title: 'Planning Timeline', icon: <Calendar className="h-4 w-4" /> }
];

export default function BacheloretteParty() {
  const [, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const heroImages = [heroImage2, heroImage3, galleryImage1];

  useEffect(() => {
    if (reducedMotion) return;
    
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
    const params = new URLSearchParams({ cruiseType: 'bachelorette' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  // Sticky CTA configuration
  const stickyCTA = (
    <StickyCTA
      primaryText="Get Free Quote"
      primaryAction={() => handleGetQuote()}
      secondaryText="Call Now"
      secondaryHref="tel:+15127705050"
      showOnDesktop={false}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        pageRoute="/bachelorette-party-austin"
        defaultTitle="Bachelorette Party Boat | Premier Austin"
        defaultDescription="Lake Travis bachelorette cruises. Bride cruises FREE! ATX Disco with DJ & photographer. From $85/person. Book today!"
        defaultKeywords={['Austin bachelorette party', 'Lake Travis bachelorette party', 'ATX Disco Cruise', 'bachelorette party boat Austin']}
        schemaType="event"
      />
      <PublicNavigation />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-24 px-4 overflow-hidden bg-gradient-to-br from-pink-100 via-white to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-100/30 to-blue-100/30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal delay={0}>
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-6 py-2 border-0 font-sans tracking-wider font-bold uppercase">
                Bachelorette Party Cruises
              </Badge>
              
              <h1 className="text-5xl font-bold font-playfair text-gray-900 mb-6" data-editable data-editable-id="bachelorette-hero-title">
                Austin Bachelorette Party Cruises
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" data-editable data-editable-id="bachelorette-hero-subtitle">
                Exclusively for Bachelorette & Bachelor Parties<br/>
                The Highlight of Your Weekend Every. Damn. Time.
              </p>

              {/* Special Offer Banner */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Heart className="h-6 w-6 fill-current" />
                  <span className="font-bold text-lg font-sans tracking-wider" data-editable data-editable-id="bachelorette-bride-free-banner">BRIDE CRUISES FREE with Disco Queen & Platinum!</span>
                  <Heart className="h-6 w-6 fill-current" />
                </div>
              </div>

              {/* Scarcity Banner */}
              <div className="bg-red-600 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <AlertCircle className="h-6 w-6 animate-pulse" />
                  <span className="font-bold text-base font-sans tracking-wider uppercase" data-editable data-editable-id="bachelorette-scarcity-text">Most weekends sell out 4-6 weeks early!</span>
                </div>
                <p className="text-sm mt-2 text-white" data-editable data-editable-id="bachelorette-scarcity-details">Books up SOLID at least a month in advance</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  onClick={() => handleGetQuote()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-6"
                  data-testid="button-hero-book-now-bachelorette"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  <span data-editable data-editable-id="bachelorette-hero-book-button">BOOK NOW - You'll Be the Hero!</span>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setActiveTab('packages')}
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold text-lg px-8 py-6"
                  data-testid="button-hero-see-packages"
                >
                  <span data-editable data-editable-id="bachelorette-hero-packages-button">See Packages & Pricing</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <p className="text-lg text-gray-700">
                <span data-editable data-editable-id="bachelorette-hero-tagline">Just <span className="text-pink-600 font-bold">SHOW UP & GET DOWN</span> - Everything Included!</span>
              </p>
            </div>
          </ScrollReveal>

          {/* Hero Image Gallery */}
          <ScrollReveal delay={0.2}>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {heroImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentHeroImage ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={image}
                    alt="Bachelorette party Austin cruise on Lake Travis"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Answer Boxes Section */}
      <SectionReveal>
        <section id="quick-answers" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <QuickAnswerBoxGroup
              title="Quick Answers for Bachelorette Parties"
              boxes={[
                {
                  id: 'decorations-provided',
                  question: 'Do you provide decorations?',
                  answer: 'Basic decorations included with all packages! We provide disco ball cups, bubble guns, and party supplies. Higher packages include personalized items for the bride and premium decorations. You\'re welcome to bring additional custom decorations to personalize your celebration.',
                  keywords: ['decorations', 'disco ball cups', 'bubble guns', 'bride'],
                  icon: Sparkles,
                  relatedLink: {
                    href: '#whats-included',
                    text: 'See what\'s included'
                  }
                },
                {
                  id: 'bathroom-available',
                  question: 'Is there a bathroom on the boat?',
                  answer: 'Yes, all boats have clean, private restroom facilities onboard for your comfort. Our boats are equipped with flushing toilets and handwashing stations. The restrooms are maintained throughout the cruise and stocked with necessary supplies.',
                  keywords: ['bathroom', 'restroom', 'facilities', 'comfort'],
                  icon: Shield,
                  relatedLink: {
                    href: '/faq',
                    text: 'View all FAQs'
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
        <section id="packages" className="py-24 bg-blue-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-pink-200 opacity-30 absolute -mt-12">01</span>
              <h2 className="text-3xl font-semibold font-playfair text-center text-gray-900 mb-4" data-editable data-editable-id="bachelorette-packages-title">
                Choose Your Bachelorette Party Package
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Find the perfect package for your bride tribe celebration
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {bachelorettePackages.map((pkg, index) => (
                <ScrollReveal key={pkg.id} delay={index * 0.1}>
                  <Card 
                    className={cn(
                      "relative h-full bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300",
                      pkg.popular && "border-2 border-pink-500 shadow-xl hover:shadow-2xl",
                      !pkg.popular && "hover:border-pink-500 hover:shadow-lg"
                    )}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-sans tracking-wider font-bold uppercase text-sm px-4 py-1" data-editable data-editable-id="bachelorette-most-popular-badge">
                          MOST POPULAR
                        </Badge>
                      </div>
                    )}
                    
                    {pkg.brideSpecial && !pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-purple-600 text-white font-sans tracking-wider font-bold uppercase text-sm px-3 py-1" data-editable data-editable-id="bachelorette-bride-free-badge">
                          BRIDE FREE!
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4 pt-8">
                      <div className="flex justify-center mb-4">
                        <pkg.icon className="h-12 w-12 text-pink-500" />
                      </div>
                      <CardTitle className="text-xl font-semibold font-playfair">{pkg.name}</CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {pkg.subtitle}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          ${pkg.price}/person
                        </div>
                        <div className="text-base text-green-600 font-semibold">
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
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                        onClick={() => handleGetQuote(pkg.id)}
                        data-testid={`button-package-${pkg.id}`}
                      >
                        Select This Package
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center">
              <p className="text-base text-gray-600 mb-4">
                All packages include: DJ, Photographer, Floats, Party Supplies & More!
              </p>
              <Badge className="bg-green-600 text-white font-sans tracking-wider font-bold uppercase text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                Group Discounts Available for 10+ People
              </Badge>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* What's Included Section */}
      <SectionReveal>
        <section id="whats-included" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-pink-200 opacity-30 absolute -mt-12">02</span>
              <h2 className="text-3xl font-semibold font-playfair text-center text-gray-900 mb-4">
                What's Included in Your Bachelorette Cruise
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need for an unforgettable celebration on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whatsIncluded.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-pink-50 rounded-xl p-6 border border-gray-200 hover:border-pink-500 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-pink-200 rounded-full">
                        <item.icon className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2" data-editable data-editable-id={`bachelorette-included-item-${index}-title`}>{item.title}</h3>
                        <p className="text-base text-gray-600 leading-relaxed" data-editable data-editable-id={`bachelorette-included-item-${index}-description`}>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-pink-400 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold font-playfair mb-4" data-editable data-editable-id="bachelorette-unicorn-title">Plus the BIGGEST Unicorn Float in the Country!</h3>
              <p className="text-base text-gray-600 mb-6" data-editable data-editable-id="bachelorette-unicorn-description">
                Our GIANT 25-ft Inflatable Unicorn Float is Instagram-worthy and unforgettable
              </p>
              <Button
                onClick={() => handleGetQuote()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-6"
                data-testid="button-included-book-bachelorette"
              >
                <span data-editable data-editable-id="bachelorette-included-reserve-button">Reserve Your Date Now</span>
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Testimonials Section */}
      <SectionReveal>
        <section id="testimonials" className="py-24 bg-blue-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-pink-200 opacity-30 absolute -mt-12">03</span>
              <h2 className="text-3xl font-semibold font-playfair text-center text-gray-900 mb-4" data-testid="heading-reviews-bachelorette">
                What Brides Are Saying
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real reviews from real bachelorette parties on Lake Travis
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={testimonial.id} delay={index * 0.1}>
                  <Card className="bg-white rounded-xl p-6 border border-gray-200 hover:border-pink-500 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-base text-gray-700 mb-4">"{testimonial.text}"</p>
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{testimonial.avatar}</div>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.location}</p>
                          <Badge className="mt-1 bg-pink-100 text-pink-700 font-sans tracking-wider text-xs">
                            {testimonial.package}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Photo Gallery Section */}
      <SectionReveal>
        <section id="photos" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-pink-200 opacity-30 absolute -mt-12">04</span>
              <h2 className="text-3xl font-semibold font-playfair text-center text-gray-900 mb-4" data-testid="heading-gallery-bachelorette">
                Bachelorette Party Photo Gallery
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See what your Lake Travis bachelorette party will look like
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryPhotos.map((photo, index) => (
                <ScrollReveal key={photo.id} delay={index * 0.1}>
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <section id="faqs" className="py-24 bg-blue-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-6xl font-black text-pink-200 opacity-30 absolute -mt-12">05</span>
              <h2 className="text-3xl font-semibold font-playfair text-center text-gray-900 mb-4" data-testid="heading-faq-bachelorette">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about planning your bachelorette party cruise
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="bg-white rounded-xl border border-gray-200 px-6"
                  >
                    <AccordionTrigger className="text-lg font-semibold hover:text-pink-600" data-testid={`faq-${item.id}`}>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700 pt-4">
                      {item.answerJsx || item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* What to Bring Section */}
      <SectionReveal>
        <section id="what-to-bring" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <WhatToBring
              variant="bachelorette"
              title="What to Bring on Your Bachelorette Party Cruise"
              description="Everything you need for an amazing day celebrating on Lake Travis"
              className="max-w-7xl mx-auto"
            />
          </div>
        </section>
      </SectionReveal>

      {/* Planning Checklist */}
      <SectionReveal>
        <section id="planning-timeline" className="py-24 bg-blue-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <AIOptimizedSection
              type="timeline"
              title="Bachelorette Party Planning Timeline"
              description="Your step-by-step guide to planning the perfect Lake Travis bachelorette party"
              data={[
                {
                  time: "8 Weeks Before",
                  title: "Initial Planning Phase",
                  description: "Lock in your date and headcount. Book your ATX Disco Cruise or private boat (peak season fills up fast!). Create group chat and collect payments. Reserve Austin accommodations.",
                  icon: <Calendar className="w-4 h-4 text-white" />,
                  duration: "Critical"
                },
                {
                  time: "4 Weeks Before",
                  title: "Finalize Details",
                  description: "Choose your package level (Basic, Disco Queen, or Platinum). Order matching outfits or disco attire. Book transportation to/from marina. Plan pre/post cruise activities.",
                  icon: <CheckCircle className="w-4 h-4 text-white" />,
                  duration: "Important"
                },
                {
                  time: "2 Weeks Before",
                  title: "Final Preparations",
                  description: "Confirm final headcount with Premier Party Cruises. Use delivery vouchers for alcohol/food orders. Create playlist requests for DJ. Check weather forecast.",
                  icon: <Sparkles className="w-4 h-4 text-white" />,
                  duration: "Finalize"
                },
                {
                  time: "1 Week Before",
                  title: "Last-Minute Tasks",
                  description: "Send reminder to all attendees with marina address. Assign cooler/supplies responsibility. Confirm transportation pickup times. Download venue's app for photos.",
                  icon: <MessageSquare className="w-4 h-4 text-white" />,
                  duration: "Confirm"
                },
                {
                  time: "Day Of",
                  title: "Party Day Checklist",
                  description: "Arrive 15 min early to Anderson Mill Marina. Bring IDs, sunscreen, and party attitude. Don't forget the bride's special accessories! Have payment ready for add-ons.",
                  icon: <PartyPopper className="w-4 h-4 text-white" />,
                  duration: "Celebrate!"
                }
              ]}
              className="max-w-4xl mx-auto"
            />
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA Section */}
      <SectionReveal>
        <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold font-playfair text-white mb-6">
              Ready to Book Your Bachelorette Party?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Weekends sell out 4-6 weeks in advance. Don't miss out on the BEST bachelorette party experience in Austin!
            </p>
            <Button
              size="lg"
              onClick={() => handleGetQuote()}
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-xl px-12 py-8"
              data-testid="button-final-cta-bachelorette"
            >
              <Sparkles className="mr-3 h-7 w-7" />
              Book Your ATX Disco Cruise Now!
              <ArrowRight className="ml-3 h-7 w-7" />
            </Button>
            <p className="text-white/80 mt-6 text-base">
              BRIDE CRUISES FREE with Disco Queen & Platinum packages!
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* Table of Contents */}
      <TableOfContents sections={tocSections} />

      <PartyPlanningChecklist partyType="Bachelorette Party" eventType="bachelorette celebration" />
      
      <RelatedLinks
        title="Other Party Options in Austin"
        links={[
          { href: '/bachelor-party-austin', label: 'Bachelor Parties', description: 'Epic bachelor party cruises on Lake Travis' },
          { href: '/private-cruises', label: 'Private Boat Rentals', description: 'Book a private boat for your group' },
          { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', description: 'Join the legendary party boat experience' },
          { href: '/team-building', label: 'Team Building Events', description: 'Corporate events on Lake Travis' },
        ]}
      />

      {/* Sticky CTA */}
      {stickyCTA}

      <Footer />
    </div>
  );
}

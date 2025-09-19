import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { EnhancedBookingCalendar } from '@/components/EnhancedBookingCalendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import logoPath from '@assets/PPC Logo LARGE_1757881944449.png';
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, ChevronRight,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, 
  Zap, Target, Play,
  MessageSquare, Ticket, Gift, Disc3, Volume2, 
  Mic, Utensils, GlassWater, Gem,
  Flower, Flower2, CircleDot, Smile, UserCheck
} from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import { DiscoVsPrivateComparison, QuickDealHighlight } from '@/components/DiscoVsPrivateComparison';
import { PRIVATE_CRUISE_PACKAGES } from '@shared/constants';
import { PricingPolicyDisplay, PolicySummary } from '@/components/PricingPolicyDisplay';
import SEOHead from '@/components/SEOHead';

// Hero and gallery images - Real photos from live website
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const heartBeat = {
  hidden: { scale: 1 },
  visible: { 
    scale: [1, 1.1, 1],
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
};

// ATX Disco Cruise packages for bachelorettes - Real comprehensive details
const bachelorettePackages = [
  {
    id: 'basic_bachelorette',
    name: 'Basic Bach Package',
    price: 85,
    originalPrice: null,
    description: 'Join the BEST Party on Lake Travis, Exclusively for Bach Parties!',
    subtitle: 'BYOB & Keep it Cheap - ALWAYS Cheaper than a Private Cruise',
    allPackagesInclude: [
      'Incredible DJ on Every Cruise, Party Started When You Arrive',
      'Professional Photographer w/Free Photos Sent After the Cruise!',
      'GIANT 25-ft Inflatable Unicorn Float - Biggest in the Country!',
      '3 Huge 6x20\' Lily Pad Floats to Lounge in Style',
      'Party w/Bachelorette & Bachelor Parties from All Over the Country',
      'Ice in Coolers, Ice Water, Cups, Koozies, Bubbles, & Name Tags'
    ],
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
    price: 95,
    originalPrice: 125,
    description: 'Our signature bachelorette party experience - That Happens to be Our Specialty!',
    subtitle: 'Private Cooler & Reserved Spot for Your Group',
    allPackagesInclude: [
      'Incredible DJ on Every Cruise, Party Started When You Arrive',
      'Professional Photographer w/Free Photos Sent After the Cruise!',
      'GIANT 25-ft Inflatable Unicorn Float - Biggest in the Country!',
      '3 Huge 6x20\' Lily Pad Floats to Lounge in Style',
      'Party w/Bachelorette & Bachelor Parties from All Over the Country',
      'Ice in Coolers, Ice Water, Cups, Koozies, Bubbles, & Name Tags'
    ],
    features: [
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
    price: 105,
    originalPrice: 140,
    description: 'Ultimate all-inclusive Austin bachelorette party luxury',
    subtitle: 'Nothing to Carry, Cooler Stocked w/drinks When You Arrive!',
    allPackagesInclude: [
      'Incredible DJ on Every Cruise, Party Started When You Arrive',
      'Professional Photographer w/Free Photos Sent After the Cruise!',
      'GIANT 25-ft Inflatable Unicorn Float - Biggest in the Country!',
      '3 Huge 6x20\' Lily Pad Floats to Lounge in Style',
      'Party w/Bachelorette & Bachelor Parties from All Over the Country',
      'Ice in Coolers, Ice Water, Cups, Koozies, Bubbles, & Name Tags'
    ],
    features: [
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

// What's included in the bachelorette experience
const bacheloretteFeatures = [
  {
    icon: Music,
    title: 'Austin\'s Funkiest DJs',
    description: 'Specializing in bachelorette party energy with custom bridal playlists and party hosting expertise.'
  },
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'Instagram-worthy photos capturing every magical moment of the bride\'s special celebration.'
  },
  {
    icon: Ship,
    title: 'Lake Travis Instagram Paradise',
    description: 'Austin\'s most stunning lake setting providing the perfect backdrop for unforgettable bridal photos.'
  },
  {
    icon: GlassWater,
    title: 'Signature Bachelorette Cocktails',
    description: 'Partner with local providers for premium champagne and signature cocktails delivered to your cruise.'
  },
  {
    icon: Users,
    title: 'Bridal Party Bonding',
    description: 'Perfect atmosphere for the girls to celebrate together in Austin\'s most unique party venue.'
  },
  {
    icon: Shield,
    title: 'Safe & Trusted',
    description: 'Coast Guard certified captains and pristine safety record - parents approve, bride celebrates!'
  }
];

// Bachelorette party testimonials
const bacheloretteTestimonials = [
  {
    id: 1,
    name: 'Emma Rodriguez',
    role: 'Bride',
    location: 'Austin, TX',
    rating: 5,
    text: "OMG this was the BEST bachelorette party ever! Premier Party Cruises really is the specialty for bachelorette parties. The disco cruise was absolutely perfect - dancing on the lake with my girls was magical. The photos turned out incredible!",
    avatar: '👰',
    package: 'Disco Queen Package'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Maid of Honor',
    location: 'Houston, TX',
    rating: 5,
    text: "I planned this for my sister's bachelorette and it exceeded every expectation! The bride disco free deal was amazing, professional photography captured everything, and the DJ knew exactly how to keep the party going. So stress-free to plan!",
    avatar: '🎉',
    package: 'Platinum Bride Package'
  },
  {
    id: 3,
    name: 'Jessica Martinez',
    role: 'Bride',
    location: 'San Antonio, TX',
    rating: 5,
    text: "Premier Party Cruises made my bachelorette party legendary! The ATX Disco Cruise is genius - dancing on Lake Travis with incredible Austin views. All my girls said it was the best bachelorette they've ever been to. Thank you for making it special!",
    avatar: '💃',
    package: 'Basic Bride Package'
  },
  {
    id: 4,
    name: 'Megan Thompson',
    role: 'Maid of Honor',
    location: 'Dallas, TX',
    rating: 5,
    text: "This really is their specialty! From the moment we booked to the last song, everything was perfect for our bachelorette party. The disco theme, professional photos, and Lake Travis setting made for the most Instagram-worthy celebration ever!",
    avatar: '📸',
    package: 'Disco Queen Package'
  }
];

// Group size options for bachelorettes
const bacheloretteGroupSizes = [
  { size: '6-10', label: 'Intimate Bridal Party', description: 'Close friends & sisters only', popular: false },
  { size: '11-18', label: 'Classic Bachelorette', description: 'Perfect Austin bachelorette size', popular: true },
  { size: '19-30', label: 'Big Bridal Celebration', description: 'Extended friend groups', popular: false },
  { size: '31-50', label: 'Epic Bachelorette Bash', description: 'Maximum capacity celebration', popular: false }
];

// Why choose Premier for bachelorettes - Marketing positioning messages
const whyChoosePremier = [
  {
    icon: Sparkles,
    title: 'Experience Something New!',
    description: 'The ATX Disco Cruise is the ONLY all-inclusive boat party in Austin - unique experience you can\'t get anywhere else!'
  },
  {
    icon: Users,
    title: 'ONLY Joint Party EXCLUSIVELY for Bach Parties!',
    description: 'Meet & Mingle w/Other Bachelorette & Bachelor Parties from All Over the Country - this is the ONLY party in the country exclusively for Bach parties!'
  },
  {
    icon: Trophy,
    title: 'Party on the BIGGEST Unicorn Float in the Country!',
    description: 'Our GIANT 25-ft Inflatable Unicorn Float is the biggest in the country - Instagram-worthy memories guaranteed!'
  },
  {
    icon: Heart,
    title: 'This is an EXPERIENCE you\'ll remember & laugh about forever!',
    description: 'Priceless Memories & Amazing Vibes - All-Inclusive, Nothing to Plan, just show up and party!'
  },
  {
    icon: Target,
    title: 'Flat-rate, Per-Person Pricing Makes it Easy to Split Payment',
    description: 'No complicated pricing structures or hidden fees - everyone pays the same simple rate and you\'re done!'
  },
  {
    icon: PartyPopper,
    title: 'Don\'t Miss the BEST Party in ATX!',
    description: '14+ Years of Epic Parties - We\'ve hosted thousands of bachelorette parties and know exactly what makes them legendary.'
  }
];

// Special offers for bachelorettes
const specialOffers = [
  {
    icon: Gift,
    title: 'Bride Disco FREE!',
    description: 'When you book Disco Queen or Platinum packages, the bride cruises for FREE!',
    highlight: true
  },
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'Capture every magical moment with our on-board professional photographers.',
    highlight: false
  },
  {
    icon: GlassWater,
    title: 'Champagne Toast',
    description: 'Complimentary champagne toast for the bride on premium packages.',
    highlight: false
  },
  {
    icon: Flower2,
    title: 'Bridal Decorations',
    description: 'Beautiful bachelorette party decorations to make your cruise extra special.',
    highlight: false
  }
];

export default function BacheloretteParty() {
  const [, navigate] = useLocation();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [heroImage1, heroImage2, heroImage3];

  // Auto-rotate hero images
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen bg-white dark:bg-brand-black">
      <SEOHead
        pageRoute="/bachelorette-party"
        defaultTitle="Austin Bachelorette Party Boat Cruises | Lake Travis | Premier Party Cruises"
        defaultDescription="Perfect Austin bachelorette party on Lake Travis! Disco cruises with DJ, dancing, drinks, and incredible views. Bride rides free on weekends!"
        defaultKeywords={['Austin bachelorette party', 'Lake Travis bachelorette', 'bachelorette party boat', 'disco cruise Austin', 'bachelorette party ideas Austin', 'Austin party boat rental']}
        schemaType="event"
      />
      <PublicNavigation />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img 
                src={heroImages[currentHeroImage]} 
                alt="Austin Bachelorette Party Cruise"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-6"
          >
            <Badge className="bg-brand-yellow text-brand-black mb-4 px-6 py-2 text-lg font-bold tracking-widest">
              <motion.div
                variants={heartBeat}
                animate="visible"
                className="flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                THAT HAPPENS TO BE OUR SPECIALTY!
              </motion.div>
            </Badge>
          </motion.div>

          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-8xl font-heading font-bold mb-6 tracking-widest"
            data-testid="heading-hero"
          >
            AUSTIN'S PREMIER
            <br />
            <span className="text-brand-yellow">BACHELORETTE</span>
            <br />
            PARTY CRUISE
          </motion.h1>

          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
            data-testid="text-hero-description"
          >
            Dance on Lake Travis with your girls! ATX Disco Cruise specializing in bachelorette parties with professional DJs, photography, and the bride cruises FREE on premium packages.
          </motion.p>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="btn-primary text-xl px-12 py-6"
              asChild
              data-testid="button-book-bachelorette"
            >
              <a href="#booking-widget">
                BOOK YOUR BACHELORETTE PARTY
                <ArrowRight className="w-6 h-6 ml-2" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-outline text-xl px-12 py-6 border-white text-white hover:bg-white hover:text-brand-black"
              onClick={() => handleGetQuote()}
              data-testid="button-get-quote"
            >
              GET CUSTOM QUOTE
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-8 flex items-center justify-center gap-8 text-lg"
          >
            <div className="flex items-center gap-2" data-testid="stat-years">
              <Trophy className="w-6 h-6 text-brand-yellow" />
              <span>14+ Years Bachelorette Specialty</span>
            </div>
            <div className="flex items-center gap-2" data-testid="stat-rating">
              <Star className="w-6 h-6 text-brand-yellow" />
              <span>5-Star Reviews</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
          onClick={() => scrollToSection('specialty')}
          data-testid="button-scroll-down"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2 tracking-widest">DISCOVER OUR SPECIALTY</span>
            <ChevronRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Streamlined Booking Widget */}
      <section id="booking-widget" className="py-16 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <EnhancedBookingCalendar 
            defaultEventType="bachelorette"
            defaultGroupSize={10}
            className="mb-8"
          />
          
          {/* Pricing Policy Information */}
          <div className="mt-8 max-w-4xl mx-auto">
            <PricingPolicyDisplay 
              context="bachelorette-booking"
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border-l-4 border-l-pink-500"
            />
          </div>
        </div>
      </section>

      {/* Our Specialty Section */}
      <section id="specialty" className="py-24 bg-brand-yellow">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-brand-black tracking-widest"
              data-testid="heading-specialty"
            >
              THAT HAPPENS TO BE
              <br />
              <span className="text-brand-blue">OUR SPECIALTY!</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-brand-black max-w-4xl mx-auto leading-relaxed"
              data-testid="text-specialty-description"
            >
              For over 14 years, we've perfected the art of Austin bachelorette parties. From the ATX Disco Cruise experience to professional photography, we know exactly what makes your celebration legendary.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyChoosePremier.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="h-full bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-specialty-${index}`}>
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4 text-brand-black tracking-widest" data-testid={`heading-feature-${index}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed" data-testid={`text-feature-${index}`}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ATX Disco Cruise Showcase */}
      <section className="py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-brand-black dark:text-brand-white tracking-widest"
              data-testid="heading-disco-cruise"
            >
              ATX DISCO CRUISE
              <br />
              <span className="text-brand-blue">BACHELORETTE EXPERIENCE</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              data-testid="text-disco-description"
            >
              Dance the night away with your bridal party on Lake Travis! Our signature ATX Disco Cruise combines Austin's funkiest DJs, professional photography, and stunning lake views for the ultimate bachelorette celebration.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {bacheloretteFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="h-full bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-feature-${index}`}>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-brand-black" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4 text-brand-black dark:text-brand-white tracking-widest" data-testid={`heading-feature-${index}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed" data-testid={`text-feature-${index}`}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-24 bg-brand-blue">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-white tracking-widest"
              data-testid="heading-special-offers"
            >
              SPECIAL BRIDAL
              <br />
              <span className="text-brand-yellow">OFFERS</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {specialOffers.map((offer, index) => {
              const IconComponent = offer.icon;
              return (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={cn(
                    "h-full border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
                    offer.highlight ? "bg-brand-yellow" : "bg-white"
                  )} data-testid={`card-offer-${index}`}>
                    <CardContent className="p-8 text-center">
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6",
                        offer.highlight ? "bg-brand-black" : "bg-brand-blue"
                      )}>
                        <IconComponent className={cn(
                          "w-8 h-8",
                          offer.highlight ? "text-brand-yellow" : "text-white"
                        )} />
                      </div>
                      <h3 className={cn(
                        "text-2xl font-heading font-bold mb-4 tracking-widest",
                        offer.highlight ? "text-brand-black" : "text-brand-black"
                      )} data-testid={`heading-offer-${index}`}>
                        {offer.title}
                      </h3>
                      <p className={cn(
                        "leading-relaxed",
                        offer.highlight ? "text-brand-black" : "text-gray-600"
                      )} data-testid={`text-offer-${index}`}>
                        {offer.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Bachelorette Packages */}
      <section className="py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-brand-black dark:text-brand-white tracking-widest"
              data-testid="heading-packages"
            >
              BACHELORETTE
              <br />
              <span className="text-brand-blue">PARTY PACKAGES</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              data-testid="text-packages-description"
            >
              Choose from our specially curated bachelorette packages, each designed to make your Austin celebration unforgettable. Premium packages include bride disco FREE!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid lg:grid-cols-3 gap-8"
          >
            {bachelorettePackages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              return (
                <motion.div key={pkg.id} variants={scaleIn}>
                  <Card className={cn(
                    "h-full relative overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2",
                    pkg.popular ? "border-brand-yellow bg-gradient-to-b from-brand-yellow/10 to-white dark:to-brand-black scale-105" : "border-brand-gray-200 dark:border-brand-gray-700 bg-white dark:bg-brand-gray-800"
                  )} data-testid={`card-package-${pkg.id}`}>
                    {pkg.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-brand-yellow text-brand-black text-center py-2 font-bold tracking-widest">
                        {pkg.badge}
                      </div>
                    )}
                    {!pkg.popular && pkg.badge && (
                      <Badge className="absolute top-4 right-4 bg-brand-blue text-white" data-testid={`badge-${pkg.id}`}>
                        {pkg.badge}
                      </Badge>
                    )}

                    <CardContent className={cn("p-8", pkg.popular && "pt-16")}>
                      <div className="text-center mb-8">
                        <div className={cn(
                          "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
                          pkg.popular ? "bg-brand-yellow" : "bg-brand-blue"
                        )}>
                          <IconComponent className={cn(
                            "w-10 h-10",
                            pkg.popular ? "text-brand-black" : "text-white"
                          )} />
                        </div>

                        <h3 className="text-3xl font-heading font-bold mb-2 text-brand-black dark:text-brand-white tracking-widest" data-testid={`heading-package-${pkg.id}`}>
                          {pkg.name}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-4xl font-heading font-bold text-brand-blue" data-testid={`price-${pkg.id}`}>
                            ${pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-2xl text-gray-500 line-through" data-testid={`original-price-${pkg.id}`}>
                              ${pkg.originalPrice}
                            </span>
                          )}
                          <span className="text-gray-600 dark:text-gray-400">/person</span>
                        </div>

                        {pkg.brideSpecial && (
                          <Badge className="bg-brand-yellow text-brand-black mb-4 px-4 py-2 font-bold" data-testid={`special-${pkg.id}`}>
                            <Heart className="w-4 h-4 mr-2" />
                            BRIDE DISCO FREE!
                          </Badge>
                        )}

                        <p className="text-gray-600 dark:text-gray-300 mb-6" data-testid={`description-${pkg.id}`}>
                          {pkg.description}
                        </p>
                      </div>

                      <div className="space-y-4 mb-8">
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3" data-testid={`feature-${pkg.id}-${featureIndex}`}>
                            <CheckCircle className="w-6 h-6 text-brand-blue mt-0.5 flex-shrink-0" />
                            <span className={cn(
                              "text-gray-700 dark:text-gray-300",
                              feature.includes('BRIDE DISCO FOR FREE') && "font-bold text-brand-blue"
                            )}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        className={cn(
                          "w-full text-lg font-bold tracking-widest py-6",
                          pkg.popular ? "btn-primary" : "btn-outline"
                        )}
                        asChild
                        data-testid={`button-book-${pkg.id}`}
                      >
                        <a href="#booking-widget">
                          BOOK {pkg.name.toUpperCase()}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Need a custom package for your bridal party? We specialize in creating perfect bachelorette experiences!
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-outline text-xl px-12 py-6"
              onClick={() => handleGetQuote()}
              data-testid="button-custom-quote"
            >
              GET CUSTOM BACHELORETTE QUOTE
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Smart Deal Comparison Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-emerald-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-emerald-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-100 text-pink-800 px-4 py-2 text-sm font-medium border-pink-200">
                <Sparkles className="h-4 w-4 mr-2" />
                Smart Deal Finder for Her
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Disco vs Private: Perfect Match for Your Girls
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Our intelligent comparison shows you exactly when disco cruises save the most money vs when private cruises offer better value for your bachelorette party size and vibe.
              </p>
            </motion.div>

            {/* Quick Highlights for Bachelorette Party Scenarios */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <QuickDealHighlight 
                  groupSize={10} 
                  dayOfWeek={6}
                  className="h-full"
                />
                <div className="mt-3 text-center">
                  <Badge className="bg-green-100 text-green-800 text-xs">Bridal Squad Special</Badge>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Perfect for the core girls - saves over $900!</p>
                </div>
              </motion.div>
              
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <QuickDealHighlight 
                  groupSize={14} 
                  dayOfWeek={6}
                  className="h-full"
                />
                <div className="mt-3 text-center">
                  <Badge className="bg-purple-100 text-purple-800 text-xs">Classic Bachelorette</Badge>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Most popular size - disco queen savings</p>
                </div>
              </motion.div>
              
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <QuickDealHighlight 
                  groupSize={12} 
                  dayOfWeek={2}
                  className="h-full"
                />
                <div className="mt-3 text-center">
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Weekday Luxury</Badge>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Tuesday-Thursday private elegance</p>
                </div>
              </motion.div>
            </div>

            {/* Interactive Comparison Tool */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <DiscoVsPrivateComparison 
                groupSize={12}
                dayOfWeek={6}
                showAlternatives={true}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6"
              />
            </motion.div>

            {/* Pro Tips Section */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <Card className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border-rose-200 dark:border-rose-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-rose-800 dark:text-rose-200">
                    <Crown className="h-5 w-5" />
                    Bridal Party Savings Secrets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">💎 Money-Saving Tips:</h4>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>• Groups under 15: Disco saves $400-1,200 on weekends</li>
                        <li>• Groups 8-12: Move to Tuesday-Thursday private at $87-105/girl</li>
                        <li>• Groups 15+: Private gives you VIP treatment & customization</li>
                        <li>• Disco Queen package often best value for 10-15 girls</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">👑 Best Value Sweet Spots:</h4>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>• 8-12 girls: Saturday disco saves $700-1,100 guaranteed</li>
                        <li>• 10-14 girls: Perfect disco queen territory with bride perks</li>
                        <li>• 18+ girls: Private becomes competitive for luxury experience</li>
                        <li>• Weekday private: Elegant value at $75-105 per person</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Private Cruise Options Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-2 text-sm font-medium border-purple-200">
                <Ship className="h-4 w-4 mr-2" />
                Private Bachelorette Cruises
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Your Own Private Boat & Celebration
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                When you want total privacy, custom vibes, and VIP treatment - plus incredible weekday value that often beats group pricing per person.
              </p>
            </motion.div>

            {/* Private Package Options */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {Object.entries(PRIVATE_CRUISE_PACKAGES[25].packages).map(([key, pkg], index) => (
                <motion.div
                  key={key}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative ${key === 'essentials' ? 'border-2 border-purple-500 shadow-lg scale-105' : ''}`}>
                    {key === 'essentials' && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {key === 'standard' && <Ship className="h-5 w-5 text-purple-600" />}
                          {key === 'essentials' && <Crown className="h-5 w-5 text-purple-600" />}
                          {key === 'ultimate' && <Trophy className="h-5 w-5 text-purple-600" />}
                        </div>
                        {key === 'essentials' && (
                          <Badge className="bg-green-100 text-green-800">Best Value</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <CardDescription className="text-sm">{pkg.tagline}</CardDescription>
                      <div className="text-2xl font-bold text-purple-600">
                        From $75-140/person
                        <div className="text-sm font-normal text-slate-600 dark:text-slate-400">
                          Depends on group size & day
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        {pkg.description}
                      </p>
                      <div className="space-y-2">
                        {pkg.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Button 
                          className="w-full" 
                          variant={key === 'essentials' ? 'default' : 'outline'}
                          onClick={() => handleGetQuote(key)}
                          data-testid={`button-select-private-${key}`}
                        >
                          Get Private Quote
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Private Cruise Benefits */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-slate-800 dark:text-slate-200">
                    Why Brides Love Private Bachelorette Cruises
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Just Your Girls</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">No strangers - intimate celebration with your squad</p>
                    </div>
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Custom Timeline</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Choose your departure time that works for the bride</p>
                    </div>
                    <div className="text-center">
                      <GlassWater className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Signature Cocktails</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Bring exactly the champagne and drinks you love</p>
                    </div>
                    <div className="text-center">
                      <Heart className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Bride's Dream</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Customize everything to match her perfect day</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Group Size Options */}
      <section className="py-24 bg-brand-gray-50 dark:bg-brand-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-heading font-bold mb-6 text-brand-black dark:text-brand-white tracking-widest"
              data-testid="heading-group-sizes"
            >
              PERFECT FOR ANY
              <br />
              <span className="text-brand-blue">BRIDAL PARTY SIZE</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {bacheloretteGroupSizes.map((group, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className={cn(
                  "h-full bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                  group.popular && "border-brand-yellow"
                )} data-testid={`card-group-${index}`}>
                  <CardContent className="p-8 text-center">
                    {group.popular && (
                      <Badge className="bg-brand-yellow text-brand-black mb-4" data-testid={`badge-popular-${index}`}>
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="text-3xl font-heading font-bold mb-2 text-brand-blue tracking-widest" data-testid={`heading-group-${index}`}>
                      {group.size}
                    </h3>
                    <h4 className="text-xl font-bold mb-4 text-brand-black dark:text-brand-white tracking-wide" data-testid={`label-group-${index}`}>
                      {group.label}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300" data-testid={`description-group-${index}`}>
                      {group.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-heading font-bold mb-6 text-brand-black dark:text-brand-white tracking-widest"
              data-testid="heading-testimonials"
            >
              WHAT BRIDES
              <br />
              <span className="text-brand-blue">ARE SAYING</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 gap-8"
          >
            {bacheloretteTestimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={scaleIn}>
                <Card className="h-full bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:shadow-xl transition-all duration-300" data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-brand-black dark:text-brand-white" data-testid={`name-${testimonial.id}`}>
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300" data-testid={`role-${testimonial.id}`}>
                          {testimonial.role} • {testimonial.location}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Quote className="w-8 h-8 text-brand-blue mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed" data-testid={`text-${testimonial.id}`}>
                      {testimonial.text}
                    </p>
                    <Badge variant="outline" className="border-brand-blue text-brand-blue" data-testid={`package-${testimonial.id}`}>
                      {testimonial.package}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-white tracking-widest"
              data-testid="heading-final-cta"
            >
              MAKE HER
              <br />
              <span className="text-brand-yellow">BACHELORETTE LEGENDARY</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              data-testid="text-final-cta"
            >
              Join thousands of brides who chose Premier Party Cruises for their Austin bachelorette party. Experience our specialty and create memories that will last a lifetime on Lake Travis.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                size="lg" 
                className="btn-primary text-2xl px-16 py-8"
                asChild
                data-testid="button-final-book"
              >
                <a href="#booking-widget">
                  BOOK YOUR BACHELORETTE CRUISE
                  <ArrowRight className="w-8 h-8 ml-3" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
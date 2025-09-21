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
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, 
  Zap, Target, Play,
  MessageSquare, Ticket, Gift, Disc3, Volume2, 
  Mic, Utensils, GlassWater, UserCheck, Leaf
} from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import { DiscoVsPrivateComparison, QuickDealHighlight } from '@/components/DiscoVsPrivateComparison';
import { PRIVATE_CRUISE_PACKAGES } from '@shared/constants';
import { PricingPolicyDisplay, PolicySummary } from '@/components/PricingPolicyDisplay';
import SEOHead from '@/components/SEOHead';

// Hero and gallery images - Real photos from live website
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/party-atmosphere-1.jpg';
import heroImage3 from '@assets/party-atmosphere-2.jpg';
import galleryImage1 from '@assets/day-tripper-14-person-boat.jpg';
import galleryImage2 from '@assets/meeseeks-25-person-boat.jpg';
import galleryImage3 from '@assets/clever-girl-50-person-boat.jpg';

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

// ATX Disco Cruise packages - Real comprehensive details
const discoPackages = [
  {
    id: 'basic',
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
    badge: 'Great Value'
  },
  {
    id: 'disco_queen',
    name: 'Disco King Package',
    price: 95,
    originalPrice: 110,
    description: 'Enhanced bachelor party experience with premium perks',
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
      'Disco Visor & Disco Ball Necklace for the Groom',
      'Complimentary Direct-to-Boat Alcohol & Lunch Delivery',
      '25% Discount on Round-Trip Transportation',
      '$50-$100 Voucher for Airbnb Booze Delivery'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'platinum',
    name: 'Super Sparkle Platinum Disco',
    price: 105,
    originalPrice: 125,
    description: 'Ultimate all-inclusive Austin bachelor party luxury',
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
      'Everything in the Disco King Package',
      'Personal Unicorn Float for the Groom',
      'Mimosa Setup w/Champagne Flutes, 3 Juices, & a Chambong!',
      '$100 Voucher for Airbnb Concierge Services',
      'Towel Service & SPF-50 Spray Sunscreen Provided',
      'Nothing to Carry, Cooler Stocked w/drinks When You Arrive!'
    ],
    popular: false,
    icon: Trophy,
    badge: 'All-Inclusive VIP'
  }
];

// What's included in the experience
const experienceFeatures = [
  {
    icon: Music,
    title: 'Professional DJ Experience',
    description: 'High-energy DJs who specialize in bachelor party vibes with custom playlists and party hosting.'
  },
  {
    icon: Camera,
    title: 'Party Photography',
    description: 'Professional photographers capture all the epic moments you\'ll want to remember (and some you might not).'
  },
  {
    icon: Ship,
    title: 'Lake Travis Exclusive',
    description: 'Austin\'s most beautiful lake setting with crystal clear waters and stunning Hill Country views.'
  },
  {
    icon: GlassWater,
    title: 'Alcohol Delivery Partners',
    description: 'We connect you with local providers to deliver premium alcohol directly to your cruise departure.'
  },
  {
    icon: Users,
    title: 'Group Bonding',
    description: 'Perfect environment for the whole crew to celebrate together on a private floating party venue.'
  },
  {
    icon: Shield,
    title: 'Safe & Professional',
    description: 'Coast Guard certified captains, pristine safety record, and designated driver solution.'
  }
];

// Bachelor party testimonials
const testimonials = [
  {
    id: 1,
    name: 'Jake Martinez',
    role: 'Groom',
    location: 'Austin, TX',
    rating: 5,
    text: "This was hands down the best bachelor party ever! The ATX Disco Cruise was insane - great music, amazing crew, and Lake Travis is beautiful. All the guys said it was their favorite bachelor party they've been to.",
    avatar: '🤵',
    package: 'Disco King Package'
  },
  {
    id: 2,
    name: 'Mike Thompson',
    role: 'Best Man',
    location: 'Houston, TX',
    rating: 5,
    text: "I planned this for my buddy's bachelor party and it exceeded all expectations. The DJ was incredible, photography was awesome, and having drinks delivered made it stress-free. 10/10 would book again!",
    avatar: '🎉',
    package: 'Bachelor Platinum Package'
  },
  {
    id: 3,
    name: 'Chris Johnson',
    role: 'Groom',
    location: 'Dallas, TX',
    rating: 5,
    text: "Premier Party Cruises made my bachelor party legendary! The disco cruise concept is genius - dancing on the water with the boys was unforgettable. Professional crew, amazing vibes, couldn't ask for more.",
    avatar: '🕺',
    package: 'Basic Bach Package'
  }
];

// Group size options
const groupSizes = [
  { size: '8-12', label: 'Intimate Group', description: 'Close friends only', popular: false },
  { size: '13-20', label: 'Standard Party', description: 'Perfect bachelor party size', popular: true },
  { size: '21-35', label: 'Big Celebration', description: 'Extended friend group', popular: false },
  { size: '36-50', label: 'Epic Party', description: 'Maximum capacity celebration', popular: false }
];

// Why choose ATX Disco Cruise for bachelor parties - Marketing positioning messages
const whyChooseUs = [
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
    icon: Music,
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
    description: '14+ Years of Epic Parties - We\'ve hosted thousands of bachelor parties and know exactly what makes them legendary.'
  }
];

export default function BachelorParty() {
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
    const params = new URLSearchParams({ cruiseType: 'bachelor' });
    if (packageId) {
      params.set('package', packageId);
    }
    navigate(`/chat?${params.toString()}`);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/bachelor-party"
        defaultTitle="Austin Bachelor Party Boat Cruises | Lake Travis | Premier Party Cruises"
        defaultDescription="Ultimate Austin bachelor party experience on Lake Travis. Join our epic disco cruises with DJ, drinks, and unforgettable memories. Book now!"
        defaultKeywords={['Austin bachelor party', 'Lake Travis bachelor party', 'bachelor party boat', 'disco cruise Austin', 'bachelor party ideas Austin', 'Austin party boat rental']}
        schemaType="event"
      />
      <PublicNavigation />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with rotating images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 2 }}
              className="absolute inset-0"
            >
              <img 
                src={heroImages[currentHeroImage]}
                alt="Austin Bachelor Party ATX Disco Cruise"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="mb-8">
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-16 md:h-20 mx-auto mb-4"
                data-testid="img-hero-logo"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight tracking-wider">
                ULTIMATE AUSTIN
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-brand-yellow mb-6 leading-tight tracking-wider">
                BACHELOR PARTY CRUISE
              </h2>
            </motion.div>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Experience Something New! The ATX Disco Cruise is the ONLY all-inclusive boat party in Austin - 
              Party on the BIGGEST Unicorn Float in the Country with Bach parties from all over!
            </motion.p>

            {/* Key Features */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Music className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg">Professional DJ</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Camera className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg">Party Photography</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <MapPin className="h-6 w-6 text-brand-yellow flex-shrink-0" />
                <span className="font-semibold text-lg">Lake Travis Dancing</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                size="lg"
                asChild
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                data-testid="button-hero-book-bachelor-party"
              >
                <a href="#booking-widget">
                  <Calendar className="mr-3 h-6 w-6" />
                  BOOK BACHELOR PARTY
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleGetQuote()}
                className="border-3 border-white text-white hover:bg-white hover:text-black font-bold text-xl px-12 py-6 rounded-2xl backdrop-blur-sm tracking-wide"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                GET BACHELOR QUOTE
              </Button>
            </motion.div>

            {/* Pricing Teaser */}
            <motion.div variants={fadeInUp} className="mt-8">
              <p className="text-lg text-gray-200">
                Starting at <span className="text-brand-yellow font-bold text-2xl">$85/person</span> • Friday & Saturday • Up to 50 People
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex flex-col items-center cursor-pointer" onClick={() => scrollToSection('packages')}>
            <span className="text-sm mb-3 font-medium tracking-wide">EXPLORE PACKAGES</span>
            <motion.div 
              className="w-6 h-12 border-2 border-white rounded-full flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-1 h-4 bg-white rounded-full mt-2" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Streamlined Booking Widget */}
      <section id="booking-widget" className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <EnhancedBookingCalendar 
            defaultEventType="bachelor"
            defaultGroupSize={12}
            className="mb-8"
          />
          
          {/* Bachelor Party Options Comparison */}
          <div className="mt-12 max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <motion.h3 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white"
              >
                Two Amazing Bachelor Party Options
              </motion.h3>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              >
                Choose between our signature disco cruise experience or a private cruise tailored to your group size.
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Disco Cruise Option */}
              <motion.div variants={fadeInUp}>
                <Card className="border-2 border-brand-yellow bg-gradient-to-br from-brand-yellow/10 to-brand-blue/5 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-brand-yellow/20">
                        <Sparkles className="h-12 w-12 text-brand-yellow" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-brand-yellow mb-2">
                      ATX Disco Cruise
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Join other bachelor parties on Austin's most epic floating dance party
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-brand-yellow mb-2">$85-$105</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">per person</div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-semibold text-brand-yellow">Three Package Options:</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Basic Package:</span>
                          <span className="font-bold">$85/person</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Disco King Package:</span>
                          <span className="font-bold">$95/person</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platinum Package:</span>
                          <span className="font-bold">$105/person</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        What's Included (All Packages):
                      </h5>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Incredible DJ & Party Atmosphere</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Professional Photography (Free Photos)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Giant 25-ft Inflatable Unicorn Float</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>3 Huge Lily Pad Floats</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Party with other bachelor/bachelorette groups</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-brand-yellow/10 p-4 rounded-lg">
                      <div className="text-sm text-center">
                        <div className="font-bold text-brand-yellow">Best For Groups Of:</div>
                        <div>8-20 people who want to party & save money</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Private Cruise Option */}
              <motion.div variants={fadeInUp}>
                <Card className="border-2 border-brand-blue bg-gradient-to-br from-brand-blue/10 to-gray-50 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-brand-blue/20">
                        <Ship className="h-12 w-12 text-brand-blue" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-brand-blue mb-2">
                      Private Cruise
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Have the entire boat to yourselves with customized experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-brand-blue mb-2">$75-$149</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">per person (varies by group size & day)</div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-semibold text-brand-blue">Three Package Options:</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Standard Package:</span>
                          <span className="font-bold">Base Rate</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Essentials Package:</span>
                          <span className="font-bold">+$100-200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ultimate Package:</span>
                          <span className="font-bold">+$250-350</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        What's Included (All Packages):
                      </h5>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Entire boat exclusively for your group</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Professional captain & crew</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Premium sound system</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Coolers & ice (BYOB)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Customizable itinerary</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-brand-blue/10 p-4 rounded-lg">
                      <div className="text-sm text-center">
                        <div className="font-bold text-brand-blue">Best For Groups Of:</div>
                        <div>15+ people who want privacy & control</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Smart Recommendations */}
            <motion.div variants={fadeInUp} className="mt-8">
              <Card className="bg-gradient-to-r from-brand-yellow/10 to-brand-blue/10 border-dashed border-2 border-brand-yellow">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold mb-4">💡 Smart Recommendation</h4>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="p-4 bg-brand-yellow/20 rounded-lg">
                      <div className="font-bold text-brand-yellow mb-2">For Groups of 8-15 People:</div>
                      <p>Disco cruise saves you $300-800+ vs private cruise, especially on weekends!</p>
                    </div>
                    <div className="p-4 bg-brand-blue/20 rounded-lg">
                      <div className="font-bold text-brand-blue mb-2">For Groups of 20+ People:</div>
                      <p>Private cruise often becomes more cost-effective and gives you total control.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Pricing Policy Information */}
          <div className="mt-8 max-w-4xl mx-auto">
            <PricingPolicyDisplay 
              context="bachelor"
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border-l-4 border-l-brand-yellow"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Premier Party Cruises Section */}
      <section id="why-choose-us" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-brand-blue text-white font-bold text-lg px-6 py-2 tracking-wider">
                PREMIER PARTY CRUISES
              </Badge>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider">
                WHY WE'RE AUSTIN'S #1 CHOICE
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                14+ years of creating unforgettable bachelor party experiences on Lake Travis. 
                Here's why over 125,000 customers trust us with their celebrations.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {discoPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={scaleIn}
                className={cn(
                  "relative",
                  pkg.popular && "transform scale-105"
                )}
              >
                <Card className={cn(
                  "h-full transition-all duration-300 hover:shadow-2xl border-2",
                  pkg.popular 
                    ? "border-brand-yellow bg-gradient-to-br from-brand-yellow/5 to-brand-blue/5" 
                    : "border-gray-200 dark:border-gray-700 hover:border-brand-blue/50"
                )}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-brand-yellow text-black font-bold px-6 py-2 text-sm tracking-wider">
                        {pkg.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className={cn(
                        "p-4 rounded-full",
                        pkg.popular ? "bg-brand-yellow/20" : "bg-brand-blue/10"
                      )}>
                        <pkg.icon className={cn(
                          "h-8 w-8",
                          pkg.popular ? "text-brand-yellow" : "text-brand-blue"
                        )} />
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-heading font-bold mb-2 tracking-wider" data-testid={`text-package-name-${pkg.id}`}>
                      {pkg.name}
                    </CardTitle>
                    
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {pkg.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          ${pkg.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-brand-blue" data-testid={`text-package-price-${pkg.id}`}>
                        ${pkg.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">/person</span>
                    </div>
                    
                    <CardDescription className="text-base" data-testid={`text-package-description-${pkg.id}`}>
                      {pkg.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 tracking-wide"
                        asChild
                        data-testid={`button-book-package-${pkg.id}`}
                      >
                        <a href="#booking-widget">
                          <Calendar className="mr-2 h-5 w-5" />
                          BOOK THIS PACKAGE
                        </a>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="w-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold py-3 tracking-wide"
                        onClick={() => handleGetQuote(pkg.id)}
                        data-testid={`button-quote-package-${pkg.id}`}
                      >
                        GET CUSTOM QUOTE
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Group Size Options */}
          <motion.div 
            variants={fadeInUp}
            className="mt-20 text-center"
          >
            <h3 className="text-3xl font-heading font-bold mb-8 text-gray-900 dark:text-white tracking-wider">
              PERFECT FOR ANY GROUP SIZE
            </h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {groupSizes.map((group, index) => (
                <div key={index} className={cn(
                  "p-6 rounded-2xl border-2 transition-all duration-300",
                  group.popular 
                    ? "border-brand-yellow bg-brand-yellow/10" 
                    : "border-gray-200 dark:border-gray-700 hover:border-brand-blue/50"
                )}>
                  <div className="text-2xl font-bold text-brand-blue mb-2">{group.size}</div>
                  <div className="font-semibold mb-1">{group.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{group.description}</div>
                  {group.popular && (
                    <Badge className="mt-2 bg-brand-yellow text-black text-xs">Most Popular</Badge>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smart Deal Comparison Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-950/20 dark:via-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 px-4 py-2 text-sm font-medium border-emerald-200">
                <Sparkles className="h-4 w-4 mr-2" />
                Smart Deal Finder
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Disco vs Private: Best Deal for Your Crew
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Our intelligent comparison shows you exactly when disco cruises save you money vs when private cruises offer better value for your bachelor party size.
              </p>
            </motion.div>

            {/* Quick Highlights for Bachelor Party Scenarios */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <QuickDealHighlight 
                  groupSize={8} 
                  dayOfWeek={6}
                  className="h-full"
                />
                <div className="mt-3 text-center">
                  <Badge className="bg-green-100 text-green-800 text-xs">Small Crew Special</Badge>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Perfect for the core crew - saves over $1,000!</p>
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
                  groupSize={15} 
                  dayOfWeek={6}
                  className="h-full"
                />
                <div className="mt-3 text-center">
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Standard Bachelor Party</Badge>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Most popular size - still great disco savings</p>
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
                  dayOfWeek={1}
                  className="h-full"
                />
                <div className="mt-3 text-center">
                  <Badge className="bg-purple-100 text-purple-800 text-xs">Weekday Value</Badge>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Monday-Thursday private cruise deals</p>
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
                groupSize={15}
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
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                    <Trophy className="h-5 w-5" />
                    Pro Tips for Maximum Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">💰 Money-Saving Strategies:</h4>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>• Groups under 15: Disco cruises save $500-1,200 on weekends</li>
                        <li>• Groups 8-12: Move to Monday-Thursday for private at $87/person</li>
                        <li>• Groups 15+: Consider private for more space and customization</li>
                        <li>• Saturday disco often beats Friday disco + private combo</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">🎯 Best Value Sweet Spots:</h4>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>• 8-10 guys: Saturday disco saves $1,000+ guaranteed</li>
                        <li>• 12-15 guys: Saturday disco still wins by $400-700</li>
                        <li>• 20+ guys: Private becomes competitive, especially weekdays</li>
                        <li>• Weekday private: Amazing value at $47-87 per person</li>
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
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium border-blue-200">
                <Ship className="h-4 w-4 mr-2" />
                Private Bachelor Cruises
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Your Own Private Boat & Crew
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                When you want complete control, privacy, and customization - plus amazing weekday value that often beats group pricing.
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
                  <Card className={`h-full relative ${key === 'essentials' ? 'border-2 border-blue-500 shadow-lg scale-105' : ''}`}>
                    {key === 'essentials' && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {key === 'standard' && <Ship className="h-5 w-5 text-blue-600" />}
                          {key === 'essentials' && <Crown className="h-5 w-5 text-blue-600" />}
                          {key === 'ultimate' && <Trophy className="h-5 w-5 text-blue-600" />}
                        </div>
                        {key === 'essentials' && (
                          <Badge className="bg-green-100 text-green-800">Best Value</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <CardDescription className="text-sm">{pkg.tagline}</CardDescription>
                      <div className="text-2xl font-bold text-blue-600">
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
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-slate-800 dark:text-slate-200">
                    Why Guys Love Private Bachelor Cruises
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <UserCheck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Your Crew Only</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">No strangers - just you and the boys</p>
                    </div>
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Flexible Schedule</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Choose your own departure time</p>
                    </div>
                    <div className="text-center">
                      <GlassWater className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">BYOB Freedom</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Bring exactly what you want</p>
                    </div>
                    <div className="text-center">
                      <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Custom Experience</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Tailor the trip to your group</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider">
                THE COMPLETE EXPERIENCE
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Every ATX Disco Cruise bachelor party includes everything you need for an unforgettable celebration. 
                We handle the details so you can focus on the groom.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {experienceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center group"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-6 rounded-full bg-brand-blue/10 group-hover:bg-brand-blue/20 transition-all duration-300">
                    <feature.icon className="h-10 w-10 text-brand-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-white tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Benefits */}
          <motion.div variants={fadeInUp} className="mt-20">
            <Card className="bg-gradient-to-r from-brand-blue/5 to-brand-yellow/5 border-2 border-brand-blue/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white tracking-wider">
                    BACHELOR PARTY BONUSES
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Gift className="h-8 w-8 text-brand-yellow mx-auto mb-3" />
                    <h4 className="font-bold mb-2">Free Groom Upgrades</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Special groom perks included in every bachelor party package
                    </p>
                  </div>
                  <div>
                    <Leaf className="h-8 w-8 text-brand-yellow mx-auto mb-3" />
                    <h4 className="font-bold mb-2">Lake Travis Exclusive</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Austin's most beautiful lake setting for epic bachelor memories
                    </p>
                  </div>
                  <div>
                    <Shield className="h-8 w-8 text-brand-yellow mx-auto mb-3" />
                    <h4 className="font-bold mb-2">Safe Transportation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Professional crew ensures everyone gets home safely
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose ATX Disco Cruise Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider">
                WHY CHOOSE ATX DISCO CRUISE
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Austin's premier bachelor party destination with unique experiences you can't find anywhere else.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto"
          >
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex space-x-6 group"
              >
                <div className="flex-shrink-0">
                  <div className="p-4 rounded-2xl bg-brand-blue/10 group-hover:bg-brand-blue/20 transition-all duration-300">
                    <reason.icon className="h-8 w-8 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white tracking-wide">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white tracking-wider">
                LEGENDARY BACHELOR PARTIES
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Real stories from grooms and best men who chose ATX Disco Cruise for their ultimate bachelor party celebration.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={scaleIn}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-brand-blue/50">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="text-4xl">{testimonial.avatar}</div>
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role} • {testimonial.location}</div>
                      <Badge className="mt-2 bg-brand-yellow/20 text-brand-blue text-xs">
                        {testimonial.package}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-wider">
                READY FOR THE ULTIMATE
              </h2>
              <h3 className="text-3xl md:text-5xl font-heading font-bold text-brand-yellow mb-6 tracking-wider">
                BACHELOR PARTY?
              </h3>
              <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                Book your ATX Disco Cruise bachelor party today and create memories that will last a lifetime. 
                Austin's most epic bachelor party experience awaits!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                  data-testid="button-final-book-bachelor-party"
                >
                  <a href="#booking-widget">
                    <Calendar className="mr-3 h-6 w-6" />
                    BOOK BACHELOR PARTY NOW
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </a>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleGetQuote()}
                  className="border-3 border-white text-white hover:bg-white hover:text-black font-bold text-xl px-12 py-6 rounded-2xl backdrop-blur-sm tracking-wide"
                  data-testid="button-final-get-quote"
                >
                  <Phone className="mr-3 h-6 w-6" />
                  CALL FOR QUOTE
                </Button>
              </div>

              <div className="mt-8 space-y-2">
                <p className="text-lg">
                  <Phone className="inline h-5 w-5 mr-2" />
                  Call now: <span className="font-bold">(512) 488-5892</span>
                </p>
                <p className="text-base text-gray-200">
                  Available Friday & Saturday • Up to 50 People • Starting $85/person
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
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
import { 
  Users, Clock, Star, Calendar, MapPin, Ship, Phone,
  ArrowRight, CheckCircle, Sparkles, Crown, Music, 
  Heart, Camera, PartyPopper, Sun, Trophy, Shield, Award,
  MessageCircle, Quote, 
  Zap, Target, Play,
  MessageSquare, Ticket, Gift, Disc3, Volume2, 
  Mic, Utensils, GlassWater, UserCheck, Leaf, Check,
  AlertCircle, DollarSign, Timer, CreditCard, CloudRain, 
  HelpCircle, Anchor, Droplets, Waves, Info, TrendingUp
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/party-atmosphere-1.jpg';
import heroImage3 from '@assets/party-atmosphere-2.jpg';
import galleryImage1 from '@assets/day-tripper-14-person-boat.jpg';
import galleryImage2 from '@assets/meeseeks-25-person-boat.jpg';
import galleryImage3 from '@assets/clever-girl-50-person-boat.jpg';
import discoImage1 from '@assets/atx-disco-cruise-party.jpg';
import discoImage2 from '@assets/dancing-party-scene.jpg';
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

// ATX Disco Cruise packages with PDF content
const discoPackages = [
  {
    id: 'basic',
    name: 'Basic Bach Package',
    price: 85,
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
    badge: 'Great Value'
  },
  {
    id: 'disco_king',
    name: 'Disco King Package',
    price: 95,
    originalPrice: 110,
    description: 'Enhanced bachelor party experience with premium perks',
    subtitle: 'Private Cooler & Reserved Spot for Your Group',
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
    description: 'Capture every epic moment with high-quality photos sent after'
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
    answer: 'We offer a 48-hour full refund window after booking. This gives you time to coordinate with your group and make sure everyone is on board. After 48 hours, deposits become non-refundable but can be transferred to another date with advance notice.'
  },
  {
    id: 'split-payment',
    question: 'Can we split the payment between multiple people?',
    answer: 'Absolutely! We offer split payment options at checkout. Each person can pay their portion directly, making it easy to manage group bookings. The organizer doesn\'t have to front the entire cost.'
  },
  {
    id: 'attire',
    question: 'Is disco attire required?',
    answer: 'Disco attire is encouraged but not required! Many groups love dressing up in disco themes - it makes for amazing photos and adds to the fun vibe. But come as you are - the most important thing is that you\'re comfortable and ready to party!'
  },
  {
    id: 'weather-policy',
    question: 'What happens if there\'s bad weather?',
    answer: 'We cruise rain or shine - the boat has cover available! For severe weather (lightning, high winds), we have the "Lemonade Disco" backup plan: a land party with fajita/BBQ buffet and drinks. You\'ll still have an epic party, just on dry land. Full refunds are only issued if we cancel and cannot provide the backup event.'
  },
  {
    id: 'add-people',
    question: 'Can we add people after booking?',
    answer: 'Yes! You can easily add 1-2 people after booking, subject to availability. Just contact us as soon as you know, and we\'ll add them to your reservation. The earlier you let us know, the better we can accommodate.'
  },
  {
    id: 'group-discounts',
    question: 'Do you offer group discounts?',
    answer: 'Yes! Groups of 10+ people receive special discounted rates. The bigger your group, the better the deal. Contact us for specific pricing for your group size.'
  },
  {
    id: 'alcohol-policy',
    question: 'What\'s your alcohol policy?',
    answer: 'BYOB - bring your own beverages! We provide private coolers with ice for each group. We also partner with local alcohol delivery services who can deliver your drinks directly to the boat. Just bring what you want to drink and we handle everything else!'
  },
  {
    id: 'booking-timeline',
    question: 'How far in advance should we book?',
    answer: 'Book as early as possible! Most weekends sell out 4-6 weeks in advance, and we\'re usually booked SOLID at least a month ahead. Peak season (March-October) books up even faster. Don\'t wait - secure your date now!'
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
    package: 'Platinum Package'
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
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Best Man',
    location: 'San Antonio, TX',
    rating: 5,
    text: "Be the legend who finds this! My buddy couldn't stop thanking me for booking the disco cruise. The energy was unreal, other bachelor groups made it even more fun. You'll be the hero of the weekend!",
    avatar: '🎊',
    package: 'Disco King Package'
  },
  {
    id: 5,
    name: 'Ryan Smith',
    role: 'Groom',
    location: 'Fort Worth, TX',
    rating: 5,
    text: "Show your groom the BEST weekend of his life! This cruise was the highlight of our entire Austin trip. Everything was included, no stress, just pure fun. The giant unicorn float alone was worth it!",
    avatar: '🦄',
    package: 'Platinum Package'
  }
];

// Photo gallery items
const galleryPhotos = [
  { id: 1, src: heroImage1, alt: 'Bachelor party group on boat' },
  { id: 2, src: discoImage1, alt: 'ATX Disco Cruise party scene' },
  { id: 3, src: galleryImage1, alt: 'Day Tripper boat' },
  { id: 4, src: discoImage2, alt: 'Dancing on the cruise' },
  { id: 5, src: galleryImage2, alt: 'Meeseeks boat' },
  { id: 6, src: floatImage, alt: 'Giant unicorn float' },
  { id: 7, src: galleryImage3, alt: 'Clever Girl boat' },
  { id: 8, src: heroImage2, alt: 'Party atmosphere' }
];

export default function BachelorParty() {
  const [, navigate] = useLocation();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const heroImages = [heroImage1, heroImage2, heroImage3];

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead
        pageRoute="/bachelor-party"
        defaultTitle="Austin Bachelor Party Boat Cruises | ATX Disco Cruise | Lake Travis"
        defaultDescription="The Ultimate Bachelor Party Cruise Experience! Join the ONLY all-inclusive boat party in Austin exclusively for bach parties. Professional DJ, photographer, and everything included. Book now - sells out 4-6 weeks early!"
        defaultKeywords={['Austin bachelor party', 'Lake Travis bachelor party', 'ATX Disco Cruise', 'bachelor party boat Austin']}
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
                alt="Austin Bachelor Party ATX Disco Cruise"
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
            >
              The Ultimate Bachelor Party<br/>
              <span className="text-brand-yellow">Cruise Experience</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 text-gray-100"
            >
              Exclusively for Bachelorette & Bachelor Parties<br/>
              <span className="text-lg">The Highlight of Your Weekend Every. Damn. Time.</span>
            </motion.p>

            {/* Scarcity Banner */}
            <motion.div 
              variants={fadeInUp}
              className="bg-red-600/90 backdrop-blur-sm rounded-lg p-4 mb-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2">
                <AlertCircle className="h-6 w-6 animate-pulse" />
                <span className="font-bold text-lg">Most weekends sell out 4-6 weeks early!</span>
              </div>
              <p className="text-sm mt-2">Books up SOLID at least a month in advance</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => handleGetQuote()}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-xl px-8 py-6"
                data-testid="button-hero-book-now-bachelor"
              >
                <Calendar className="mr-2 h-6 w-6" />
                BOOK NOW - Be the Hero!
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveTab('packages')}
                className="border-white text-white hover:bg-white hover:text-black font-bold"
                data-testid="button-hero-see-packages"
              >
                See Packages & Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg"
            >
              Just <span className="text-brand-yellow font-bold">SHOW UP & GET DOWN</span> - Everything Included!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2 h-auto p-1">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="included" data-testid="tab-included">What's Included</TabsTrigger>
              <TabsTrigger value="packages" data-testid="tab-packages">Packages</TabsTrigger>
              <TabsTrigger value="compare" data-testid="tab-compare">Compare</TabsTrigger>
              <TabsTrigger value="faq" data-testid="tab-faq">FAQs</TabsTrigger>
              <TabsTrigger value="photos" data-testid="tab-photos">Photos</TabsTrigger>
              <TabsTrigger value="testimonials" data-testid="tab-testimonials">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  Show Your Groom the <span className="text-brand-yellow">BEST Weekend</span> of His Life!
                </h2>
                
                <div className="bg-brand-yellow/10 border-2 border-brand-yellow rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold text-brand-yellow mb-4 text-center">
                    Why You'll Be the Legend Who Found This
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Trophy className="h-6 w-6 text-brand-yellow mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Experience Something New!</p>
                        <p className="text-gray-600 dark:text-gray-400">The ONLY all-inclusive boat party in Austin - unique experience you can't get anywhere else!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-6 w-6 text-brand-yellow mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Party with Other Bachelor Parties!</p>
                        <p className="text-gray-600 dark:text-gray-400">Meet & mingle with bachelor/bachelorette parties from all over the country</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <DollarSign className="h-6 w-6 text-brand-yellow mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Better Value Than Private</p>
                        <p className="text-gray-600 dark:text-gray-400">ALWAYS cheaper per person than a private cruise for groups under 20</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-lg">
                    Starting at just <span className="text-brand-yellow font-bold text-2xl">$85/person</span>
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Friday & Saturday • 4 Hours on Lake Travis • Up to 50 People
                  </p>
                  
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                    data-testid="button-overview-book-bachelor"
                  >
                    Book Your Bachelor Party Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <p className="text-sm text-red-600 font-semibold">
                    ⚠️ Limited Availability - Books up 4-6 weeks in advance!
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* What's Included Tab */}
            <TabsContent value="included" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  EVERYTHING Included but Alcohol!
                </h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Just SHOW UP & GET DOWN - We handle everything else
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {whatsIncluded.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-brand-yellow/20 rounded-full">
                          <item.icon className="h-6 w-6 text-brand-yellow" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-brand-blue/10 border-2 border-brand-blue rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold mb-4">Plus the BIGGEST Unicorn Float in the Country!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Our GIANT 25-ft Inflatable Unicorn Float is Instagram-worthy and unforgettable
                  </p>
                  <Button
                    onClick={() => handleGetQuote()}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                    data-testid="button-included-book-bachelor"
                  >
                    Reserve Your Date Now
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  Choose Your Bachelor Party Package
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {discoPackages.map((pkg) => (
                    <Card 
                      key={pkg.id} 
                      className={cn(
                        "relative h-full",
                        pkg.popular && "border-2 border-brand-yellow shadow-xl"
                      )}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className="bg-brand-yellow text-black font-bold px-4 py-1">
                            MOST POPULAR
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                          <pkg.icon className="h-12 w-12 text-brand-yellow" />
                        </div>
                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                        <CardDescription className="text-sm mt-2">
                          {pkg.subtitle}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold">
                            ${pkg.price}
                            {pkg.originalPrice && (
                              <span className="text-lg text-gray-400 line-through ml-2">
                                ${pkg.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">per person</div>
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
                          className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
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
                  <Card className="border-2 border-brand-yellow">
                    <CardHeader className="bg-brand-yellow/10">
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
                        
                        <div className="space-y-2">
                          <p className="font-semibold">Perfect for groups of 8-20</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Example: 12 people = $1,140 total
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
                    💡 <span className="font-semibold">Pro Tip:</span> For groups under 20, the Disco Cruise is always the better value!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                    data-testid="button-compare-book-bachelor"
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
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg px-6"
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

                <Card className="mt-8 bg-brand-yellow/10 border-brand-yellow">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Still have questions?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Our team is here to help make your bachelor party perfect!
                    </p>
                    <Button
                      onClick={() => handleGetQuote()}
                      variant="outline"
                      className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black"
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
                  Bachelor Party Vibes & Photos
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
                    Professional photography included with every cruise!
                  </p>
                  <Button
                    onClick={() => handleGetQuote()}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                    data-testid="button-photos-book-bachelor"
                  >
                    Book Your Epic Bachelor Party
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  What Grooms Are Saying
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
                            
                            <Badge variant="secondary">{testimonial.package}</Badge>
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
                    Join thousands of satisfied grooms who made their bachelor party legendary!
                  </p>
                  <Button
                    size="lg"
                    onClick={() => handleGetQuote()}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
                    data-testid="button-testimonials-book-bachelor"
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
            <Button
              onClick={() => handleGetQuote()}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
              data-testid="button-sticky-book-bachelor"
            >
              Book Bachelor Party Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import Chat from '@/pages/Chat';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SEOHead from '@/components/SEOHead';
import { formatCurrency } from '@shared/formatters';
import { HOURLY_RATES, PRICING_DEFAULTS } from '@shared/constants';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { 
  Cake, Users, Star, Calendar, Trophy, Shield, Award,
  MessageSquare, Quote, Volume2, Clock, PartyPopper,
  Calculator, Gift, CreditCard, PersonStanding, Heart,
  ChefHat, Wifi, Target, Headphones, Check, Sparkles,
  Waves, Wine, Umbrella, Music, ArrowRight, Camera,
  Crown, Anchor, Presentation, Zap, ChevronRight,
  DollarSign, Smile, Gem, CheckCircle, X, Ship
} from 'lucide-react';

// Hero and gallery images - reuse from other pages
import heroImage1 from '@assets/party-atmosphere-1.jpg';
import heroImage2 from '@assets/party-atmosphere-2.jpg';
import heroImage3 from '@assets/party-atmosphere-3.jpg';
import boatImage1 from '@assets/day-tripper-14-person-boat.jpg';
import boatImage2 from '@assets/meeseeks-25-person-boat.jpg';
import boatImage3 from '@assets/clever-girl-50-person-boat.jpg';
import floatImage from '@assets/giant-unicorn-float.jpg';
import discoImage from '@assets/atx-disco-cruise-party.jpg';

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

// Milestone birthdays
const milestones = [
  { age: '21st', label: 'Finally Legal', icon: Wine, color: 'text-purple-500' },
  { age: '30th', label: 'Dirty Thirty', icon: Gem, color: 'text-blue-500' },
  { age: '40th', label: 'Fabulous Forty', icon: Crown, color: 'text-green-500' },
  { age: '50th', label: 'Fifty & Fabulous', icon: Trophy, color: 'text-yellow-500' }
];

// Birthday packages
const birthdayPackages = [
  {
    name: 'Essential Birthday',
    icon: Gift,
    price: 'Starting at $200/hr',
    description: 'Everything you need for an amazing birthday cruise',
    features: [
      'Private boat for your group',
      'Professional captain',
      'Premium sound system',
      'Coolers with ice',
      'Swimming & floating',
      'Customizable playlist'
    ],
    ideal: 'Perfect for: Intimate celebrations, budget-conscious parties'
  },
  {
    name: 'Birthday Bash',
    icon: PartyPopper,
    price: 'Starting at $225/hr',
    description: 'Enhanced celebration with party essentials',
    features: [
      'Everything from Essential',
      'Birthday decorations included',
      'Complimentary birthday banner',
      'Party supplies (cups, plates)',
      'Fresh water & soft drinks',
      'Setup assistance'
    ],
    ideal: 'Most Popular Choice - Everything handled for you!',
    popular: true
  },
  {
    name: 'VIP Birthday Experience',
    icon: Crown,
    price: 'Starting at $250/hr',
    description: 'Ultimate birthday luxury on the water',
    features: [
      'Everything from Birthday Bash',
      'Giant party floats',
      'Birthday VIP cruises FREE',
      'Professional photographer',
      'Champagne toast setup',
      'Premium decorations',
      'Catering coordination'
    ],
    ideal: 'For milestone birthdays and unforgettable celebrations',
    vip: true
  }
];

// What's included
const birthdayInclusions = [
  {
    icon: Cake,
    title: 'Birthday Atmosphere',
    description: 'Decorations and party vibes ready'
  },
  {
    icon: Music,
    title: 'Your Music',
    description: 'Bluetooth sound system for your playlist'
  },
  {
    icon: Waves,
    title: 'Swimming Fun',
    description: 'Jump in Lake Travis anytime'
  },
  {
    icon: Camera,
    title: 'Photo Worthy',
    description: 'Instagram-perfect birthday moments'
  },
  {
    icon: Shield,
    title: 'Safe Celebration',
    description: 'Professional crew ensures safety'
  },
  {
    icon: Gift,
    title: 'Stress-Free',
    description: 'We handle the details'
  }
];

// Birthday testimonials
const birthdayTestimonials = [
  {
    id: 1,
    name: 'Jessica Thompson',
    age: '30th Birthday',
    rating: 5,
    text: "My dirty thirty on <Link href='/party-boat-lake-travis' className='text-primary hover:underline'>Lake Travis</Link> was absolutely perfect! The crew made me feel like a VIP, the decorations were amazing, and my friends are still talking about it. Best birthday ever!",
    avatar: '🎉',
    boat: 'Me Seeks The Irony'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    age: '21st Birthday',
    rating: 5,
    text: "Finally 21 and celebrated in style! The crew was so fun, helped with our party games, and made sure everyone had an incredible time. The sunset views were unreal!",
    avatar: '🎂',
    boat: 'Day Tripper'
  },
  {
    id: 3,
    name: 'Sarah Chen',
    age: '40th Birthday',
    rating: 5,
    text: "Turned 40 feeling like 20! The VIP package was worth every penny - photographer captured amazing memories, the floats were so fun, and the crew went above and beyond.",
    avatar: '👑',
    boat: 'Clever Girl'
  },
  {
    id: 4,
    name: 'David Park',
    age: '50th Birthday',
    rating: 5,
    text: "My wife surprised me with a 50th birthday cruise and it was phenomenal. Professional service, beautiful boat, and the perfect way to celebrate with family and friends.",
    avatar: '🏆',
    boat: 'Clever Girl'
  },
  {
    id: 5,
    name: 'Amanda Foster',
    age: '25th Birthday',
    rating: 5,
    text: "Quarter century celebration done right! The birthday VIP cruised free which saved us money, and the party atmosphere was exactly what we wanted. 10/10 would book again!",
    avatar: '🎊',
    boat: 'Me Seeks The Irony'
  },
  {
    id: 6,
    name: 'Jason Williams',
    age: '35th Birthday',
    rating: 5,
    text: "Best decision ever for my 35th! The crew handled everything, decorations were on point, and swimming in Lake Travis was the perfect touch. My friends loved it!",
    avatar: '🎈',
    boat: 'Day Tripper'
  },
  {
    id: 7,
    name: 'Lisa Anderson',
    age: 'Sweet 16',
    rating: 5,
    text: "My daughter's sweet 16 on the boat was magical! The crew was great with the teenagers, kept them safe while having fun. She said it was the best birthday party ever!",
    avatar: '💕',
    boat: 'Me Seeks The Irony'
  }
];

// Birthday FAQs
const birthdayFAQs = [
  {
    question: 'Does the birthday person really cruise free?',
    answer: 'Yes! With our VIP Birthday Experience package and 10+ paying guests, the birthday VIP cruises absolutely FREE! It\'s our way of making your special day even more special.'
  },
  {
    question: 'What decorations do you provide?',
    answer: 'Our Birthday Bash and VIP packages include birthday banners, balloons, and table decorations. The VIP package includes premium decorations and custom touches. You\'re also welcome to bring additional decorations to personalize your celebration.'
  },
  {
    question: 'Can we bring a birthday cake?',
    answer: 'Absolutely! We recommend cupcakes or a cake that\'s easy to serve on a moving boat. We provide plates, utensils, and napkins with our party packages. We can also coordinate with local bakeries for delivery to the marina.'
  },
  {
    question: 'What\'s the best package for a milestone birthday?',
    answer: 'For milestone birthdays (21st, 30th, 40th, 50th), we highly recommend the VIP Birthday Experience. It includes professional photography to capture the memories, premium decorations, and special touches that make milestone birthdays unforgettable.'
  },
  {
    question: 'How many people can we bring?',
    answer: 'Our boats accommodate different group sizes: Day Tripper (up to 14), Me Seeks The Irony (up to 30), and Clever Girl (up to 75). Choose based on your guest list. The birthday person counts toward the capacity.'
  },
  {
    question: 'Can we have party games and activities?',
    answer: 'Yes! Our crew loves helping with birthday games and activities. Popular options include water games, floating competitions, dance-offs, and photo contests. The giant floats in our VIP package are perfect for birthday fun!'
  },
  {
    question: 'What about music and announcements?',
    answer: 'All boats have premium Bluetooth sound systems. Create your perfect birthday playlist! Our crew can help with birthday announcements, song dedications, and even lead a birthday sing-along.'
  },
  {
    question: 'Do you offer group discounts?',
    answer: 'Yes! Larger groups receive better per-person rates, and remember - with 10+ guests on the VIP package, the birthday person cruises FREE. This can save you hundreds of dollars!'
  }
];

// Gallery images
const galleryImages = [
  { src: heroImage1, alt: 'Birthday Party Boat Austin celebration on Lake Travis' },
  { src: heroImage2, alt: 'Lake Travis Birthday Party friends celebrating cruise' },
  { src: heroImage3, alt: 'Birthday Party Boat Austin party atmosphere' },
  { src: boatImage1, alt: 'Lake Travis Birthday Party intimate cruise boat' },
  { src: boatImage2, alt: 'Birthday Party Boat Austin medium group boat' },
  { src: boatImage3, alt: 'Lake Travis Birthday Party large yacht celebration' },
  { src: floatImage, alt: 'Birthday Party Boat Austin fun on Lake Travis giant floats' },
  { src: discoImage, alt: 'Lake Travis Birthday Party celebration vibes' }
];

export default function BirthdayParties() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=birthday');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=birthday');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/birthday-parties"
        defaultTitle="Birthday Party Boat | Lake Travis Austin"
        defaultDescription="Lake Travis birthday cruises. VIP cruises FREE! Perfect for milestone birthdays. Decorations included. Book today!"
        defaultKeywords={[
          'birthday cruise austin',
          'birthday party boat lake travis',
          '21st birthday cruise',
          '30th birthday boat party',
          '40th birthday cruise austin',
          'milestone birthday celebration',
          'birthday boat rental austin',
          'lake travis birthday party'
        ]}
        schemaType="service"
      />
      <ClientOnly><PublicNavigation /></ClientOnly>
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage1}
            alt="Birthday Party Boat Austin cruise celebration on Lake Travis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        
        <motion.div
          className="relative z-10 container mx-auto px-6 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Badge className="mb-4 bg-brand-yellow text-black px-4 py-2 text-sm font-bold animate-pulse">
            🎉 BIRTHDAY VIP CRUISES FREE! 🎉
          </Badge>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tight" data-editable data-editable-id="h1-birthday-hero">
            MAKE YOUR<br />
            BIRTHDAY<br />
            <span className="text-brand-yellow">LEGENDARY!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" data-editable data-editable-id="p-birthday-tagline">
            Celebrate on Lake Travis • All ages welcome • Milestone specialists
          </p>
          
          {/* Milestone badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {milestones.map((milestone) => (
              <Badge 
                key={milestone.age}
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2"
              >
                <milestone.icon className={cn("h-4 w-4 mr-2", milestone.color)} />
                <span className="font-bold">{milestone.age}</span>
                <span className="ml-2 opacity-90">{milestone.label}</span>
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetQuote}
              size="lg"
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-6 sm:px-8 py-6 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse"
              data-testid="button-hero-get-quote"
            >
              <Cake className="mr-2 h-5 w-5" />
              PLAN MY BIRTHDAY
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate('/chat?eventType=birthday')}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-6 sm:px-8 py-6 text-base sm:text-lg"
              data-testid="button-hero-view-packages"
            >
              <Gift className="mr-2 h-5 w-5" />
              VIEW PACKAGES
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              { icon: PartyPopper, stat: '5,000+', label: 'Birthday Parties' },
              { icon: Smile, stat: '100%', label: 'Happy Birthdays' },
              { icon: Gift, stat: 'FREE', label: 'Birthday VIP' },
              { icon: Star, stat: '5.0', label: 'Birthday Reviews' }
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <item.icon className="h-6 w-6 text-brand-yellow mx-auto mb-2" />
                <div className="text-2xl font-bold">{item.stat}</div>
                <div className="text-sm opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Feature Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-900 dark:text-white text-base md:text-lg font-semibold">
              🎂 <span className="text-brand-yellow">Birthday VIP FREE</span> • All Ages Welcome • <span className="text-brand-yellow">Milestone Specialists</span> 🎂
            </p>
          </div>
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
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-6 sm:py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                data-testid="button-build-quote"
              >
                <Sparkles className="mr-2 sm:mr-3 h-5 sm:h-7 w-5 sm:w-7" />
                <span data-editable data-editable-id="quote-builder-button">Start Building Your Quote</span>
                <ArrowRight className="ml-2 sm:ml-3 h-5 sm:h-7 w-5 sm:w-7" />
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowQuoteBuilder(false)}
                className="border-3 border-white text-white hover:bg-white hover:text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-6 rounded-2xl backdrop-blur-sm mb-8"
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

      {/* Main Content with Tabs */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg">
              <TabsTrigger value="overview" className="font-semibold text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="packages" className="font-semibold text-xs sm:text-sm">Packages</TabsTrigger>
              <TabsTrigger value="included" className="font-semibold text-xs sm:text-sm">What's Included</TabsTrigger>
              <TabsTrigger value="pricing" className="font-semibold text-xs sm:text-sm">Pricing</TabsTrigger>
              <TabsTrigger value="faqs" className="font-semibold text-xs sm:text-sm">FAQs</TabsTrigger>
              <TabsTrigger value="photos" className="font-semibold text-xs sm:text-sm">Photos</TabsTrigger>
              <TabsTrigger value="testimonials" className="font-semibold text-xs sm:text-sm">Testimonials</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={staggerChildren}
                viewport={{ once: true }}
              >
                <div className="text-center max-w-4xl mx-auto mb-12">
                  <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">
                    AUSTIN'S FAVORITE BIRTHDAY DESTINATION
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    Forget boring dinners and crowded bars. Your birthday deserves a Lake Travis adventure! 
                    With decorations included, music pumping, and the birthday VIP cruising FREE, 
                    we make your special day absolutely legendary.
                  </p>
                </div>

                {/* Special Offer Banner */}
                <div className="bg-gradient-to-r from-brand-yellow via-yellow-400 to-brand-yellow p-8 rounded-2xl text-center shadow-xl mb-12">
                  <PartyPopper className="h-12 w-12 text-black mx-auto mb-4 animate-bounce" />
                  <h3 className="text-3xl font-black text-black mb-3">BIRTHDAY VIP CRUISES FREE!</h3>
                  <p className="text-lg text-black/80 font-semibold">
                    Book the VIP Birthday Experience with 10+ guests and the birthday person cruises FREE!
                  </p>
                </div>

                {/* Milestone Birthdays */}
                <div className="mb-12">
                  <h3 className="text-3xl font-bold text-center mb-8">Milestone Birthday Specialists</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {milestones.map((milestone, index) => (
                      <motion.div key={index} variants={fadeInUp}>
                        <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                          <CardContent className="pt-6">
                            <milestone.icon className={cn("h-12 w-12 mx-auto mb-3", milestone.color)} />
                            <h4 className="text-2xl font-bold mb-2">{milestone.age}</h4>
                            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                              {milestone.label}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Heart,
                      title: 'We Love Birthdays',
                      description: 'Our crew makes every birthday special with personalized touches and genuine enthusiasm.'
                    },
                    {
                      icon: Sparkles,
                      title: 'All-Inclusive Fun',
                      description: 'Decorations, music, swimming, and party atmosphere - everything for an epic birthday.'
                    },
                    {
                      icon: Trophy,
                      title: 'Unforgettable Memories',
                      description: 'Lake Travis views, sunset magic, and birthday moments you\'ll treasure forever.'
                    }
                  ].map((item, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="pt-6">
                          <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <item.icon className="h-8 w-8 text-brand-yellow" />
                          </div>
                          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages" className="space-y-12">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">BIRTHDAY PACKAGES</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Choose your perfect birthday experience
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {birthdayPackages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className={cn(
                      "h-full hover:shadow-xl transition-all duration-300",
                      pkg.popular && "border-2 border-brand-yellow",
                      pkg.vip && "border-2 border-brand-blue"
                    )}>
                      {pkg.popular && (
                        <div className="bg-brand-yellow text-black text-center py-2 font-bold">
                          MOST POPULAR
                        </div>
                      )}
                      {pkg.vip && (
                        <div className="bg-brand-blue text-white text-center py-2 font-bold">
                          BIRTHDAY VIP FREE!
                        </div>
                      )}
                      <CardHeader>
                        <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-4">
                          <pkg.icon className="h-6 w-6 text-brand-yellow" />
                        </div>
                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                        <div className="text-2xl font-bold text-brand-blue">{pkg.price}</div>
                        <CardDescription className="text-base">{pkg.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-6">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          {pkg.ideal}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* What's Included Tab */}
            <TabsContent value="included" className="space-y-12">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">EVERYTHING FOR YOUR BIRTHDAY</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  We handle the details so you can enjoy your special day
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {birthdayInclusions.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-8 w-8 text-brand-yellow" />
                      </div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Birthday Specials */}
              <div className="bg-gradient-to-r from-brand-yellow/20 to-brand-blue/20 rounded-2xl p-8 mt-12">
                <h3 className="text-2xl font-bold text-center mb-8">Birthday Special Add-Ons</h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {[
                    'Custom birthday cake coordination',
                    'Professional birthday photoshoot',
                    'Champagne toast service',
                    'Birthday party games package',
                    'Catering services available',
                    'Transportation coordination'
                  ].map((addon) => (
                    <div key={addon} className="flex items-center">
                      <PartyPopper className="h-5 w-5 text-brand-yellow mr-3" />
                      <span className="font-semibold">{addon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-12">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">BIRTHDAY PRICING</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Flexible options for every birthday celebration
                </p>
              </div>

              {/* Special Offer */}
              <div className="bg-brand-yellow text-black rounded-2xl p-8 text-center mb-8 shadow-xl">
                <Trophy className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-black mb-3">BIRTHDAY VIP CRUISES FREE!</h3>
                <p className="text-lg font-semibold mb-4">
                  Book VIP Birthday Experience + 10 guests = Birthday person cruises FREE!
                </p>
                <p className="text-base">
                  That's up to $200 in savings for your special day!
                </p>
              </div>

              {/* Pricing Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                  <thead>
                    <tr className="bg-brand-blue text-white">
                      <th className="p-4 text-left font-bold">Group Size</th>
                      <th className="p-4 text-center font-bold">Mon-Thu</th>
                      <th className="p-4 text-center font-bold">Friday</th>
                      <th className="p-4 text-center font-bold">Sat-Sun</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4">
                        <div>
                          <span className="font-semibold">Up to 14 people</span>
                          <br />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Intimate celebrations</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">From {formatCurrency(HOURLY_RATES.MON_THU[14] * 4)}</td>
                      <td className="p-4 text-center">From {formatCurrency(HOURLY_RATES.FRIDAY[14] * 4)}</td>
                      <td className="p-4 text-center">From {formatCurrency(HOURLY_RATES.SAT_SUN[14] * 4)}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4">
                        <div>
                          <span className="font-semibold">15-30 people</span>
                          <br />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Most popular size</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">From {formatCurrency(HOURLY_RATES.MON_THU[25] * 4)}</td>
                      <td className="p-4 text-center">From {formatCurrency(HOURLY_RATES.FRIDAY[25] * 4)}</td>
                      <td className="p-4 text-center">From {formatCurrency(HOURLY_RATES.SAT_SUN[25] * 4)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4">
                        <div>
                          <span className="font-semibold">31-75 people</span>
                          <br />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Big birthday bashes</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">From {formatCurrency(HOURLY_RATES.MON_THU[50] * 4)}</td>
                      <td className="p-4 text-center">From {formatCurrency(HOURLY_RATES.FRIDAY[50] * 4)}</td>
                      <td className="p-4 text-center">From {formatCurrency(HOURLY_RATES.SAT_SUN[50] * 4)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardContent className="p-6">
                    <Gift className="h-8 w-8 text-brand-yellow mb-3" />
                    <h4 className="font-bold mb-2">Group Discounts</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Larger groups = better rates per person<br />
                      Plus birthday VIP cruises FREE with 10+ guests!
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <DollarSign className="h-8 w-8 text-brand-yellow mb-3" />
                    <h4 className="font-bold mb-2">Easy Payment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Split payments available for groups<br />
                      25% deposit holds your birthday date
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs" className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">BIRTHDAY CRUISE FAQs</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Everything about planning the perfect birthday cruise
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {birthdayFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md px-6"
                  >
                    <AccordionTrigger className="text-left hover:text-brand-yellow transition-colors py-4">
                      <span className="font-semibold text-lg">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">BIRTHDAY MEMORIES</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  See the birthday magic on Lake Travis
                </p>
              </div>

              <Carousel className="max-w-5xl mx-auto">
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {image.alt}
                      </p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">BIRTHDAY LOVE</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Real birthday celebrations, real happy guests
                </p>
              </div>

              <Carousel className="max-w-4xl mx-auto">
                <CarouselContent>
                  {birthdayTestimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id}>
                      <Card className="mx-4">
                        <CardContent className="p-8">
                          <div className="flex items-center mb-4">
                            <div className="text-4xl mr-4">{testimonial.avatar}</div>
                            <div>
                              <h3 className="font-bold text-lg">{testimonial.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {testimonial.age}
                              </p>
                              <div className="flex items-center mt-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <Quote className="h-8 w-8 text-brand-yellow/20 mb-3" />
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {testimonial.text}
                          </p>
                          <Badge variant="secondary">
                            Boat: {testimonial.boat}
                          </Badge>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {birthdayTestimonials.slice(0, 4).map((testimonial) => (
                  <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="text-3xl mr-3">{testimonial.avatar}</div>
                        <div className="flex-1">
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.age}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-brand-yellow text-brand-yellow" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Party Planning Checklist */}
      <PartyPlanningChecklist 
        partyType="Birthday Party"
        eventType="birthday celebration"
      />

      {/* Embedded Chat Component */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Plan Your Birthday Cruise</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your birthday vision and get an instant quote
              </p>
            </div>
            <Chat />
          </div>
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
              Related Birthday Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Make your birthday celebration unforgettable with our specialized Lake Travis party boat experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/milestone-birthday">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-yellow-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/10 rounded-full flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Milestone Birthday</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Celebrate 21st, 30th, 40th, 50th birthday cruises on Lake Travis with special milestone packages and VIP treatment.
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Milestone Birthdays
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
              <Link href="/sweet-16">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Cake className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Sweet 16</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Teen birthday celebrations on Lake Travis with safe, supervised fun and unforgettable Sweet 16 party experiences.
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Sweet 16 Parties
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
                      Custom birthday charter options on Lake Travis with personalized packages, flexible scheduling, and exclusive boat rentals.
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
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-40 md:hidden">
        <div className="flex gap-4">
          <Button
            onClick={handleBookNow}
            className="flex-1 bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
            data-testid="button-sticky-book"
          >
            <Calendar className="mr-2 h-4 w-4" />
            BOOK BIRTHDAY
          </Button>
          <Button
            onClick={handleGetQuote}
            variant="outline"
            className="flex-1 border-brand-yellow text-brand-yellow"
            data-testid="button-sticky-quote"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            GET QUOTE
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
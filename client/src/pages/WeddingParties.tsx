import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
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
  Heart, Users, Star, Calendar, Trophy, Shield, Award,
  MessageSquare, Quote, Volume2, Clock, Sparkles,
  Calculator, Gift, CreditCard, PersonStanding, Camera,
  ChefHat, Wifi, Target, Headphones, Check, Flower,
  Waves, Wine, Umbrella, Music, ArrowRight, Flower2,
  Crown, Anchor, Sun, Zap, ChevronRight, Gem,
  DollarSign, Smile, GlassWater, CheckCircle, Sunset, X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Hero and gallery images - reuse from other pages
import heroImage1 from '@assets/clever-girl-50-person-boat.jpg';
import heroImage2 from '@assets/meeseeks-25-person-boat.jpg';
import heroImage3 from '@assets/day-tripper-14-person-boat.jpg';
import galleryImage1 from '@assets/party-atmosphere-1.jpg';
import galleryImage2 from '@assets/party-atmosphere-2.jpg';
import galleryImage3 from '@assets/party-atmosphere-3.jpg';
import floatImage from '@assets/giant-unicorn-float.jpg';
import discoImage from '@assets/dancing-party-scene.jpg';

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

// Wedding event types
const weddingEvents = [
  {
    name: 'Rehearsal Dinner',
    icon: Wine,
    description: 'Intimate gathering before the big day',
    features: [
      'Relaxed atmosphere for families to mingle',
      'Sunset cruise timing perfect for toasts',
      'Professional service for formal dinner',
      'Customizable menu options',
      'Private space for speeches',
      'Photo opportunities with wedding party'
    ]
  },
  {
    name: 'Welcome Party',
    icon: Users,
    description: 'Greet out-of-town guests in style',
    features: [
      'Casual meet & greet atmosphere',
      'Austin skyline views to wow guests',
      'Cocktail cruise format',
      'Mix and mingle layout',
      'Welcome bags distribution',
      'Ice breaker activities available'
    ]
  },
  {
    name: 'After Party',
    icon: Sparkles,
    description: 'Keep the celebration going',
    features: [
      'Late-night party cruise',
      'Dance floor on the water',
      'Continuation of reception energy',
      'Casual dress code',
      'Late-night snacks available',
      'Perfect send-off to honeymoon'
    ]
  }
];

// Wedding packages
const weddingPackages = [
  {
    name: 'Standard 4-Hour Cruise',
    icon: Heart,
    price: 'Starting at $200/hr',
    description: 'Perfect for rehearsal dinners, welcome parties, and after parties',
    features: [
      'Amazing, experienced captain',
      '2 large empty coolers (bring your own ice & drinks)',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for up to 14 guests',
      'Plenty of sun & shade areas',
      'Vendor coordination for catering'
    ],
    ideal: 'Essential wedding event experience'
  },
  {
    name: 'Cruise w/Essentials Package',
    icon: Flower,
    price: 'Starting at $225/hr',
    description: 'Wedding celebration with complete convenience',
    features: [
      'Everything from Standard Cruise',
      'Insulated 5-gallon dispenser with ice water',
      'Fresh water & solo cups',
      'Coolers pre-stocked with ice',
      '6-ft folding table for food & drinks',
      'Vendor coordination for catering'
    ],
    ideal: 'Most popular for wedding events',
    popular: true
  },
  {
    name: 'Ultimate Party Package',
    icon: Gem,
    price: 'Starting at $250/hr',
    description: 'Elegant wedding experience with entertainment and party supplies',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float (unicorn or ring)',
      'Disco ball cups for party vibes',
      'Bubble guns & bubble wands',
      'Champagne flutes & fruit juices',
      'SPF-50 spray sunscreen',
      'Plates, plasticware, & paper towels',
      'Disco balls installed for party atmosphere',
      'Vendor coordination for catering'
    ],
    ideal: 'For unforgettable wedding celebrations',
    luxury: true
  }
];

// What's included for weddings
const weddingInclusions = [
  {
    icon: Sunset,
    title: 'Sunset Magic',
    description: 'Golden hour timing for perfect photos'
  },
  {
    icon: Camera,
    title: 'Photo Ready',
    description: 'Stunning backdrops for wedding album'
  },
  {
    icon: Wine,
    title: 'Champagne Service',
    description: 'Toast setup with glassware provided'
  },
  {
    icon: Flower2,
    title: 'Elegant Atmosphere',
    description: 'Romantic ambiance and decorations'
  },
  {
    icon: Shield,
    title: 'Professional Service',
    description: 'Experienced crew for formal events'
  },
  {
    icon: Music,
    title: 'Custom Playlist',
    description: 'Your wedding music, your way'
  }
];

// Wedding testimonials
const weddingTestimonials = [
  {
    id: 1,
    name: 'Sarah & Michael Johnson',
    event: 'Rehearsal Dinner',
    rating: 5,
    text: "Our rehearsal dinner cruise was absolutely perfect! The sunset views were breathtaking, the crew was incredibly professional, and our families had the best time getting to know each other. It set the perfect tone for our wedding weekend.",
    avatar: '💑',
    boat: 'Clever Girl'
  },
  {
    id: 2,
    name: 'Emily & David Chen',
    event: 'Welcome Party',
    rating: 5,
    text: "We wanted something uniquely Austin for our out-of-town guests, and the welcome party cruise exceeded expectations! Everyone was talking about it all weekend. The crew handled everything beautifully.",
    avatar: '💕',
    boat: 'Me Seeks The Irony'
  },
  {
    id: 3,
    name: 'Jessica & Ryan Martinez',
    event: 'After Party',
    rating: 5,
    text: "After our reception, we took our wedding party and close friends on a late-night cruise. It was the perfect ending to our perfect day! Dancing under the stars on Lake Travis - unforgettable!",
    avatar: '💖',
    boat: 'Clever Girl'
  },
  {
    id: 4,
    name: 'Amanda & Chris Thompson',
    event: 'Rehearsal Dinner',
    rating: 5,
    text: "The intimate setting on the water was exactly what we wanted for our rehearsal dinner. The photographer captured stunning sunset shots, and the champagne toast with the Austin skyline backdrop was magical.",
    avatar: '💐',
    boat: 'Day Tripper'
  },
  {
    id: 5,
    name: 'Lauren & James Wilson',
    event: 'Wedding Reception',
    rating: 5,
    text: "We actually had our entire small wedding reception on the yacht! 50 guests, perfect weather, incredible service. Our guests said it was the most unique and beautiful wedding they'd attended.",
    avatar: '💒',
    boat: 'Clever Girl'
  }
];

// Wedding FAQs
const weddingFAQs = [
  {
    question: 'What wedding events work best on a cruise?',
    answer: 'Rehearsal dinners are our most popular, offering an intimate setting for families to bond. Welcome parties are perfect for greeting out-of-town guests with Austin flair. After parties keep the celebration going post-reception. We\'ve also hosted small wedding ceremonies and receptions on our larger yachts.'
  },
  {
    question: 'Can we have a formal dinner on board?',
    answer: 'Absolutely! We work with Austin\'s top wedding caterers to provide plated dinners, buffets, or cocktail reception formats. Our boats have tables that can be elegantly set with linens, centerpieces, and formal place settings. The crew ensures professional service throughout.'
  },
  {
    question: 'What about wedding decorations?',
    answer: 'Our Romance and Luxury packages include elegant decorations like string lights, floral arrangements, and white linens. You\'re welcome to bring additional decorations to match your wedding theme. We can coordinate with your wedding planner for cohesive styling.'
  },
  {
    question: 'Is photography included?',
    answer: 'Professional photography is included with our Romance Package (1 hour) and Luxury Package (full event). The golden hour lighting on Lake Travis creates stunning photos for your wedding album. We also have recommended photographers familiar with our boats.'
  },
  {
    question: 'What\'s the best time for a wedding cruise?',
    answer: 'Sunset cruises (starting 2-3 hours before sunset) are most popular for the romantic lighting and cooler temperatures. This timing allows for both daylight and sunset photos, plus the magical "blue hour" afterwards.'
  },
  {
    question: 'Can we have speeches and toasts?',
    answer: 'Yes! Our sound systems include microphones for speeches and toasts. The intimate setting on the water creates a perfect atmosphere for heartfelt words. We can help coordinate the timing and setup for your toast schedule.'
  },
  {
    question: 'How many guests can you accommodate?',
    answer: 'Day Tripper: Up to 14 guests (perfect for immediate family), Me Seeks: Up to 30 guests (ideal for wedding party), Clever Girl: Up to 75 guests (accommodates most rehearsal dinners and welcome parties). Choose based on your guest list.'
  },
  {
    question: 'What about catering and bar service?',
    answer: 'We partner with preferred wedding caterers and can arrange full bar service with professional bartenders. From passed appetizers to plated dinners, we accommodate various service styles. Champagne for toasts is included in our wedding packages.'
  }
];

// Gallery images
const galleryImages = [
  { src: heroImage1, alt: 'Elegant wedding yacht' },
  { src: heroImage2, alt: 'Rehearsal dinner boat' },
  { src: heroImage3, alt: 'Intimate wedding cruise' },
  { src: galleryImage1, alt: 'Wedding celebration on water' },
  { src: galleryImage2, alt: 'Romantic sunset cruise' },
  { src: galleryImage3, alt: 'Wedding party atmosphere' },
  { src: floatImage, alt: 'Fun wedding after party' },
  { src: discoImage, alt: 'Wedding reception dancing' }
];

export default function WeddingParties() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const { toast } = useToast();
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

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

  const handleGetQuote = () => {
    navigate('/chat?eventType=wedding');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=wedding');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/wedding-parties"
        defaultTitle="Wedding Cruises Lake Travis | Rehearsal Dinners & Wedding Events"
        defaultDescription="Elegant wedding cruises on Lake Travis. Perfect for rehearsal dinners, welcome parties, and after parties. Professional service, sunset views, champagne toasts. Create unforgettable wedding memories!"
        defaultKeywords={[
          'wedding cruise austin',
          'rehearsal dinner lake travis',
          'wedding welcome party boat',
          'wedding after party cruise',
          'lake travis wedding venue',
          'austin wedding boat rental',
          'sunset wedding cruise',
          'wedding yacht charter austin'
        ]}
        schemaType="service"
      />
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage1}
            alt="Wedding cruise event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        
        <motion.div
          className="relative z-10 container mx-auto px-6 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Badge className="mb-4 bg-white/90 text-black px-4 py-2 text-sm font-semibold">
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            WEDDING CELEBRATIONS ON THE WATER
            <Heart className="h-4 w-4 ml-2 text-red-500" />
          </Badge>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tight" data-editable data-editable-id="h1-wedding-hero">
            CREATE<br />
            UNFORGETTABLE<br />
            <span className="text-brand-yellow">WEDDING MEMORIES</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed font-light" data-editable data-editable-id="p-wedding-tagline">
            Rehearsal Dinners • Welcome Parties • After Parties<br />
            Elegant celebrations with sunset views on Lake Travis
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetQuote}
              size="lg"
              className="bg-white hover:bg-gray-100 text-black font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              data-testid="button-hero-get-quote"
            >
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              PLAN WEDDING EVENT
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate('/chat?eventType=wedding')}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-8 py-6 text-lg"
              data-testid="button-hero-view-packages"
            >
              <Gem className="mr-2 h-5 w-5" />
              VIEW PACKAGES
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              { icon: Heart, stat: '300+', label: 'Weddings Hosted' },
              { icon: Sunset, stat: '100%', label: 'Perfect Sunsets' },
              { icon: Camera, stat: 'Pro', label: 'Photography' },
              { icon: Star, stat: '5.0', label: 'Wedding Reviews' }
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <item.icon className="h-6 w-6 text-brand-yellow mx-auto mb-2" />
                <div className="text-2xl font-bold">{item.stat}</div>
                <div className="text-sm opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
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

      {/* Main Content with Tabs */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-gradient-to-r from-brand-blue to-indigo-600 dark:from-brand-blue dark:to-indigo-800 p-2 rounded-2xl shadow-2xl border-2 border-brand-yellow">
              <TabsTrigger value="overview" className="font-black text-base md:text-lg uppercase tracking-wider data-[state=active]:bg-brand-yellow data-[state=active]:text-black data-[state=active]:shadow-xl data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white transition-all duration-300 rounded-xl">Overview</TabsTrigger>
              <TabsTrigger value="events" className="font-black text-base md:text-lg uppercase tracking-wider data-[state=active]:bg-brand-yellow data-[state=active]:text-black data-[state=active]:shadow-xl data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white transition-all duration-300 rounded-xl">Event Types</TabsTrigger>
              <TabsTrigger value="packages" className="font-black text-base md:text-lg uppercase tracking-wider data-[state=active]:bg-brand-yellow data-[state=active]:text-black data-[state=active]:shadow-xl data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white transition-all duration-300 rounded-xl">Packages</TabsTrigger>
              <TabsTrigger value="included" className="font-black text-base md:text-lg uppercase tracking-wider data-[state=active]:bg-brand-yellow data-[state=active]:text-black data-[state=active]:shadow-xl data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white transition-all duration-300 rounded-xl">What's Included</TabsTrigger>
              <TabsTrigger value="faqs" className="font-black text-base md:text-lg uppercase tracking-wider data-[state=active]:bg-brand-yellow data-[state=active]:text-black data-[state=active]:shadow-xl data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white transition-all duration-300 rounded-xl">FAQs</TabsTrigger>
              <TabsTrigger value="photos" className="font-black text-base md:text-lg uppercase tracking-wider data-[state=active]:bg-brand-yellow data-[state=active]:text-black data-[state=active]:shadow-xl data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white transition-all duration-300 rounded-xl">Photos</TabsTrigger>
              <TabsTrigger value="testimonials" className="font-black text-base md:text-lg uppercase tracking-wider data-[state=active]:bg-brand-yellow data-[state=active]:text-black data-[state=active]:shadow-xl data-[state=inactive]:text-white/80 data-[state=inactive]:hover:text-white transition-all duration-300 rounded-xl">Testimonials</TabsTrigger>
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
                    AUSTIN'S MOST ROMANTIC WEDDING VENUE
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    Your wedding weekend deserves extraordinary moments. Whether it's an intimate rehearsal dinner, 
                    a welcoming party for guests, or keeping the celebration going after the reception, 
                    our elegant cruises create unforgettable memories on Lake Travis.
                  </p>
                </div>

                {/* Why Choose Wedding Cruises */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {[
                    {
                      icon: Sunset,
                      title: 'Sunset Romance',
                      description: 'Golden hour lighting creates magical moments and stunning wedding photos on the water.'
                    },
                    {
                      icon: Heart,
                      title: 'Intimate Elegance',
                      description: 'Private yacht setting brings families together in an exclusive, elegant atmosphere.'
                    },
                    {
                      icon: Shield,
                      title: 'Stress-Free Planning',
                      description: 'Professional crew handles every detail so you can focus on celebrating love.'
                    }
                  ].map((item, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="pt-6">
                          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <item.icon className="h-8 w-8 text-rose-500" />
                          </div>
                          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Perfect Wedding Moments */}
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10 rounded-2xl p-8">
                  <h3 className="text-3xl font-bold text-center mb-8">Perfect Wedding Weekend Moments</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {[
                      'Thursday: Welcome Party',
                      'Friday: Rehearsal Dinner',
                      'Saturday: Wedding Day',
                      'Saturday Night: After Party',
                      'Sunday: Farewell Brunch Cruise',
                      'Anniversary Celebrations'
                    ].map((moment) => (
                      <Badge
                        key={moment}
                        variant="secondary"
                        className="py-3 px-4 text-center justify-center font-semibold bg-white dark:bg-gray-800"
                      >
                        {moment}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Event Types Tab */}
            <TabsContent value="events" className="space-y-12">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">WEDDING EVENT OPTIONS</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Each event type crafted for your wedding weekend needs
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {weddingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mb-4">
                          <event.icon className="h-6 w-6 text-rose-500" />
                        </div>
                        <CardTitle className="text-2xl">{event.name}</CardTitle>
                        <CardDescription className="text-base">{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {event.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages" className="space-y-12">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">WEDDING PACKAGES</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Elegant options for every wedding celebration
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {weddingPackages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className={cn(
                      "h-full hover:shadow-xl transition-all duration-300",
                      pkg.popular && "border-2 border-rose-400",
                      pkg.luxury && "border-2 border-gold-500"
                    )}>
                      {pkg.popular && (
                        <div className="bg-rose-500 text-white text-center py-2 font-semibold">
                          MOST POPULAR
                        </div>
                      )}
                      {pkg.luxury && (
                        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-center py-2 font-bold">
                          ULTIMATE LUXURY
                        </div>
                      )}
                      <CardHeader>
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mb-4">
                          <pkg.icon className="h-6 w-6 text-rose-500" />
                        </div>
                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                        <div className="text-2xl font-bold text-rose-500">{pkg.price}</div>
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
                <h2 className="text-4xl font-heading font-black mb-6">WEDDING ELEGANCE INCLUDED</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Every detail for your perfect wedding celebration
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {weddingInclusions.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-8 w-8 text-rose-500" />
                      </div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Premium Add-Ons */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-2xl p-8 mt-12">
                <h3 className="text-2xl font-bold text-center mb-8">Premium Wedding Add-Ons</h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {[
                    'Full wedding catering service',
                    'Professional videography',
                    'Live music or string quartet',
                    'Custom floral arrangements',
                    'Wedding cake service',
                    'Transportation for wedding party'
                  ].map((addon) => (
                    <div key={addon} className="flex items-center">
                      <Flower2 className="h-5 w-5 text-rose-500 mr-3" />
                      <span className="font-semibold">{addon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs" className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">WEDDING CRUISE FAQs</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Everything for planning your wedding event
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {weddingFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md px-6"
                  >
                    <AccordionTrigger className="text-left hover:text-rose-500 transition-colors py-4">
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
                <h2 className="text-4xl font-heading font-black mb-6">WEDDING GALLERY</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Elegant wedding celebrations on Lake Travis
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
                <h2 className="text-4xl font-heading font-black mb-6">WEDDING LOVE STORIES</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Real couples, real celebrations, real memories
                </p>
              </div>

              <Carousel className="max-w-4xl mx-auto">
                <CarouselContent>
                  {weddingTestimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id}>
                      <Card className="mx-4">
                        <CardContent className="p-8">
                          <div className="flex items-center mb-4">
                            <div className="text-4xl mr-4">{testimonial.avatar}</div>
                            <div>
                              <h3 className="font-bold text-lg">{testimonial.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {testimonial.event}
                              </p>
                              <div className="flex items-center mt-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-rose-500 text-rose-500" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <Quote className="h-8 w-8 text-rose-200 dark:text-rose-900 mb-3" />
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
                {weddingTestimonials.slice(0, 4).map((testimonial) => (
                  <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="text-3xl mr-3">{testimonial.avatar}</div>
                        <div className="flex-1">
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.event}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-rose-500 text-rose-500" />
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
        partyType="Wedding Event"
        eventType="wedding celebration"
      />

      {/* Embedded Chat Component */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Plan Your Wedding Cruise</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your wedding vision and receive a custom quote
              </p>
            </div>
            <Chat />
          </div>
        </div>
      </section>

      {/* Sticky CTA Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-40 md:hidden">
        <div className="flex gap-4">
          <Button
            onClick={handleBookNow}
            className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold"
            data-testid="button-sticky-book"
          >
            <Calendar className="mr-2 h-4 w-4" />
            BOOK WEDDING
          </Button>
          <Button
            onClick={handleGetQuote}
            variant="outline"
            className="flex-1 border-rose-500 text-rose-500 hover:bg-rose-50"
            data-testid="button-sticky-quote"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            GET QUOTE
          </Button>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import YouTubeHeroEmbed from '@/components/YouTubeHeroEmbed';
import VideoGallerySection from '@/components/VideoGallerySection';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { formatCurrency } from '@shared/formatters';
import SEOHead from '@/components/SEOHead';
import { SectionReveal } from '@/components/SectionReveal';
import { birthdayReviews } from '@shared/reviews-data';
import { 
  Sparkles, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Star, Camera, Music,
  Heart, MessageSquare, Crown, Quote, ChevronRight,
  Ship, Sun, Info, TrendingUp, Gift, PartyPopper,
  Flower2, Smile, IceCream, Palette, Shield, X, Cake
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Hero and gallery images
const heroImage1 = '/attached_assets/party-atmosphere-1.jpg';
const heroImage2 = '/attached_assets/party-atmosphere-2.jpg';
const heroImage3 = '/attached_assets/dancing-party-scene.jpg';
const galleryImage1 = '/attached_assets/atx-disco-cruise-party.jpg';
const galleryImage2 = '/attached_assets/bachelor-party-group-guys.jpg';
const galleryImage3 = '/attached_assets/giant-unicorn-float.jpg';

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

const sparkleFloat = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: [-20, 20, -20],
    opacity: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Sweet 16 packages
const sweet16Packages = [
  {
    id: 'standard',
    name: 'Standard 4-Hour Cruise',
    basePrice: 200,
    description: 'A coming-of-age celebration - Make it sweet and memorable',
    features: [
      'Amazing, experienced captain',
      '2 large empty coolers (bring your own ice & drinks)',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for up to 14 guests',
      'Plenty of sun & shade areas',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    popular: false,
    icon: Gift,
    badge: 'Great Start'
  },
  {
    id: 'essentials',
    name: 'Cruise w/Essentials Package',
    basePrice: 225,
    addOnPrice: 100,
    description: 'Sweet 16 with complete convenience',
    features: [
      'Everything from Standard Cruise',
      'Insulated 5-gallon dispenser with ice water',
      'Fresh water & solo cups',
      'Coolers pre-stocked with ice',
      '6-ft folding table for food & drinks',
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Party Package',
    basePrice: 250,
    addOnPrice: 250,
    description: 'Ultimate luxury sweet 16 with entertainment and party supplies',
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
      'We can help coordinate alcohol delivery through Party On Delivery'
    ],
    popular: false,
    icon: Sparkles,
    badge: 'Ultimate Party'
  }
];

// What's included
const whatsIncluded = [
  {
    icon: Sparkles,
    title: 'Princess Treatment',
    description: 'Make the birthday girl feel like royalty'
  },
  {
    icon: Camera,
    title: 'Photo Worthy',
    description: 'Instagram and TikTok ready setups'
  },
  {
    icon: Music,
    title: 'Teen DJ',
    description: 'Current hits and dance favorites'
  },
  {
    icon: IceCream,
    title: 'Sweet Treats',
    description: 'Dessert bar and cake setup'
  },
  {
    icon: Flower2,
    title: 'Pretty Decor',
    description: 'Pink, gold, and sparkly decorations'
  },
  {
    icon: Palette,
    title: 'Mocktail Bar',
    description: 'Fancy non-alcoholic drinks'
  },
  {
    icon: Heart,
    title: 'Friend Fun',
    description: 'Activities perfect for teen groups'
  },
  {
    icon: Shield,
    title: 'Safe Environment',
    description: 'Supervised and secure celebration'
  },
  {
    icon: Smile,
    title: 'Memory Making',
    description: 'Create unforgettable moments'
  }
];

// FAQs - corrected content
const faqItems = [
  {
    id: 'included',
    question: "What's included?",
    answer: 'Licensed, experienced captain & crew, premium Bluetooth sound, coolers with ice, restrooms, sun & shade seating, and safety equipment.'
  },
  {
    id: 'food-drinks',
    question: 'Can we bring food and drinks?',
    answer: 'Yes. BYOB (21+), cans/plastic only; bring snacks or meals. We provide coolers with ice and cups.'
  },
  {
    id: 'deposits-payments',
    question: 'How do deposits and payments work?',
    answer: 'If booking 14+ days before cruise: 25% deposit required, remaining balance due 14 days before cruise. If booking less than 14 days before cruise: 50% deposit required, remaining balance due within 48 hours of booking (or 3 days after booking).'
  },
  {
    id: 'cancellation',
    question: 'What\'s your cancellation policy?',
    answer: "48-hour full refund window after booking. After that, cancellations are weather-dependent at the captain's discretion. Pro-rated refunds if weather shortens the cruise."
  },
  {
    id: 'swimming',
    question: 'Is swimming allowed?',
    answer: "Yes, when conditions are safe and at the captain's discretion. Life jackets required in the water."
  },
  {
    id: 'life-jackets',
    question: 'What about life jackets?',
    answer: 'Adult life jackets are provided. Infant/child life jackets must be brought by guests.'
  }
];


export default function Sweet16() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const [selectedPackage, setSelectedPackage] = useState('sweet_deluxe');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    if (reducedMotion) return; // Skip animation for reduced motion
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const handleGetQuote = () => {
    navigate('/chat?eventType=sweet-16');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=sweet-16&action=book');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead 
        pageRoute="/sweet-16"
        defaultTitle="Sweet 16 Cruises | Lake Travis Austin"
        defaultDescription="Instagram-worthy Sweet 16 cruises on Lake Travis! DJ, decorations, teen-friendly fun. Make her 16th birthday magical!"
        defaultKeywords={[
          'sweet 16 cruise austin',
          'sweet sixteen party lake travis',
          'teen birthday cruise austin',
          '16th birthday boat party',
          'sweet 16 celebration ideas austin'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section with Crossfade */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden ">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/FABtEDZZBA0?autoplay=1&mute=1&loop=1&playlist=FABtEDZZBA0&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&playsinline=1"
            title="Premier Party Cruises Drone Video Background"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ border: 'none' }}
            data-testid="youtube-background-video"
          />
          {/* White Overlay for contrast - 75% opacity */}
          <div className="absolute inset-0 bg-white/75"></div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-6 flex-grow flex items-center">
          <motion.div 
            className="max-w-4xl mx-auto text-center w-full"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-6 py-3 text-base font-sans tracking-wider bg-pink-100 text-gray-900 border-pink-300 shadow-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Make Her 16th Birthday Magical
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-extrabold mb-6 text-center text-gray-900 drop-shadow-sm"
              variants={fadeInUp}
            >
              Sweet 16 Birthday Cruises
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8 font-bold drop-shadow-sm max-w-3xl mx-auto text-center"
              variants={fadeInUp}
            >
              Make Her 16th Birthday Magical
            </motion.p>

            <motion.div 
              className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-6 shadow-xl max-w-5xl mx-auto mb-8"
              variants={fadeInUp}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-900 font-semibold leading-relaxed">
                Celebrate this milestone birthday with an unforgettable Lake Travis cruise. 
                Instagram-worthy moments, amazing friends, and memories to last a lifetime!
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-base sm:text-lg px-8 py-6 shadow-xl"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Plan Sweet 16
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-base sm:text-lg px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Packages
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">200+</div>
                <div className="text-sm text-white/80">Sweet 16s</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">25-75</div>
                <div className="text-sm text-white/80">Guest Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">5.0★</div>
                <div className="text-sm text-white/80">Parent Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/90 backdrop-blur-sm py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-base md:text-lg font-semibold">
              <span className="text-purple-600">Instagram-Worthy</span> • Teen-Friendly Fun • <span className="text-purple-600">Unforgettable Memories</span>
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

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-b from-white to-pink-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Sweet 16 Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package for her special day. 
              Every detail designed to make her feel like a princess!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sweet16Packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "relative h-full hover:shadow-2xl transition-all duration-300",
                  pkg.popular && "border-2 border-pink-400 shadow-xl scale-105"
                )}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-pink-400 text-white font-bold px-4 py-1">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                      <pkg.icon className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-pink-500">
                        ${pkg.basePrice}<span className="text-lg font-normal">/hr</span>
                      </div>
                      {pkg.addOnPrice && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          +${pkg.addOnPrice}/hr from base
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">Minimum 3 hours</p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {pkg.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={handleGetQuote}
                      data-testid={`button-package-${pkg.id}`}
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Everything for Her Perfect Day
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Creating magical moments for her Sweet 16 celebration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatsIncluded.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start p-4 rounded-lg hover:bg-pink-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <item.icon className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Sweet 16 Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Check out our verified reviews on Google and Facebook to see what real families are saying about their Sweet 16 cruises on Lake Travis!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold text-lg px-10 py-6"
              >
                <a href="https://www.google.com/search?q=premier+party+cruises+austin" target="_blank" rel="noopener noreferrer">
                  <Star className="mr-2 h-5 w-5" />
                  View Google Reviews
                </a>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold text-lg px-10 py-6"
              >
                <a href="https://www.facebook.com/premierpartycruises" target="_blank" rel="noopener noreferrer">
                  <Star className="mr-2 h-5 w-5" />
                  View Facebook Reviews
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Sweet 16 FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything parents need to know about Sweet 16 cruises
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem value={item.id} className="mb-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="font-semibold">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 pl-8">
                      <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Party Planning Checklist */}
      <PartyPlanningChecklist 
        partyType="Sweet 16 Party"
        eventType="Sweet 16 celebration"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-purple-600">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Make Her Sweet 16 Dreams Come True
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              She only turns 16 once. Let us help you create a magical celebration 
              she'll remember forever with her best friends on Lake Travis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-white hover:bg-gray-100 text-pink-500 font-bold text-lg px-8 py-6 shadow-xl"
                data-testid="button-cta-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Planning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/contact')}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6"
                data-testid="button-cta-contact"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us: 512-488-5892
              </Button>
            </div>
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
              Related Birthday Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our full range of birthday party boat experiences on Lake Travis.
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
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <Cake className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Milestone Birthday</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      21st, 30th, 40th birthday cruises
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
              <Link href="/birthday-parties">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <PartyPopper className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Birthday Parties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Birthday party planning
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      View All Birthday Parties
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
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Ship className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Private Cruises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Private charter options
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Private Cruises
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hidden SEO Content - Crawlable but not visible */}
      <div className="sr-only" itemScope itemType="https://schema.org/Service">
        <h2>Sweet 16 Party Cruise Austin - Lake Travis Sweet Sixteen Birthday Boat Rental</h2>
        <p itemProp="description">
          Unforgettable Sweet 16 birthday party cruises on Lake Travis. Instagram-worthy celebrations with DJ, decorations, teen-friendly fun, 
          and magical moments for her special day. Sweet Sixteen boat rentals from 14-75 guests with professional supervision.
        </p>
        
        {/* Pricing Content for Crawlers */}
        <h3>Sweet 16 Birthday Private Cruise Pricing - All Guest Capacities</h3>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">1-14 Guests Sweet 16 Pricing</h4>
          <p>Monday-Thursday: Standard $800, Essentials $900, Ultimate $1,000</p>
          <p>Friday: Standard $900, Essentials $1,000, Ultimate $1,100</p>
          <p>Saturday: Standard $1,400, Essentials $1,500, Ultimate $1,600</p>
          <p>Sunday: Standard $1,000, Essentials $1,100, Ultimate $1,200</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">15-25 Guests Sweet 16 Pricing</h4>
          <p>Monday-Thursday: Standard $900, Essentials $1,050, Ultimate $1,200</p>
          <p>Friday: Standard $1,000, Essentials $1,150, Ultimate $1,300</p>
          <p>Saturday: Standard $1,500, Essentials $1,650, Ultimate $1,800</p>
          <p>Sunday: Standard $1,100, Essentials $1,250, Ultimate $1,400</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">26-30 Guests Sweet 16 Pricing</h4>
          <p>Monday-Thursday: Standard $1,050, Essentials $1,200, Ultimate $1,350</p>
          <p>Friday: Standard $1,150, Essentials $1,300, Ultimate $1,450</p>
          <p>Saturday: Standard $1,650, Essentials $1,800, Ultimate $1,950</p>
          <p>Sunday: Standard $1,250, Essentials $1,400, Ultimate $1,550</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">31-50 Guests Sweet 16 Cruise Pricing</h4>
          <p>Monday-Thursday: Standard $1,000, Essentials $1,200, Ultimate $1,350</p>
          <p>Friday: Standard $1,100, Essentials $1,300, Ultimate $1,450</p>
          <p>Saturday: Standard $1,600, Essentials $1,800, Ultimate $1,950</p>
          <p>Sunday: Standard $1,200, Essentials $1,400, Ultimate $1,550</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">51-75 Guests Large Sweet 16 Pricing</h4>
          <p>Monday-Thursday: Standard $1,300, Essentials $1,500, Ultimate $1,650</p>
          <p>Friday: Standard $1,400, Essentials $1,600, Ultimate $1,750</p>
          <p>Saturday: Standard $1,900, Essentials $2,100, Ultimate $2,250</p>
          <p>Sunday: Standard $1,500, Essentials $1,700, Ultimate $1,850</p>
        </div>
        
        <h3>Sweet 16 Party Features and Amenities</h3>
        <ul>
          <li>Sweet 16 party boat cruise on Lake Travis Austin</li>
          <li>Teen-friendly supervised celebration environment</li>
          <li>Instagram-worthy photo setups and decorations</li>
          <li>DJ with age-appropriate music and playlists</li>
          <li>Pink, gold, and sparkly themed decorations</li>
          <li>Mocktail bar with fancy non-alcoholic drinks</li>
          <li>Professional crew and safety supervision</li>
          <li>Premium sound system for dancing</li>
          <li>Swimming and water activities</li>
          <li>Birthday cake service and celebration coordination</li>
          <li>Photo props and TikTok-ready backdrops</li>
        </ul>
        
        <h3>Austin Sweet 16 Cruise Keywords</h3>
        <p>sweet 16 Lake Travis, sweet sixteen party boat Austin, 16th birthday cruise Lake Travis, teen birthday party boat Austin, 
        sweet 16 celebration Austin, Lake Travis sweet 16 party, Austin sweet sixteen cruise, birthday boat rental Lake Travis teens, 
        sweet 16 yacht party Austin, Lake Travis teen birthday, private sweet 16 boat rental Austin, Instagram sweet 16 party Lake Travis</p>
        
        <h3>Fleet Options for Sweet 16 Parties</h3>
        <p>Day Tripper (14 guests), Meeseeks (25 guests), Tito (30 guests), Clever Girl (50 guests), Millennium Falcon (75 guests)</p>
      </div>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Sweet 16 Party Cruise Austin",
          "description": "Unforgettable Sweet 16 birthday party cruises on Lake Travis. Instagram-worthy celebrations with DJ, decorations, and teen-friendly fun.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "30.3895",
              "longitude": "-97.8686"
            },
            "telephone": "(512) 488-5892",
            "priceRange": "$800-$2,250"
          },
          "areaServed": {
            "@type": "City",
            "name": "Austin, TX"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Sweet 16 Standard Package",
              "price": "800",
              "priceCurrency": "USD",
              "description": "4-hour sweet 16 cruise for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Sweet 16 Essentials Package",
              "price": "900",
              "priceCurrency": "USD",
              "description": "4-hour sweet 16 party with amenities for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Sweet 16 Ultimate Package",
              "price": "1000",
              "priceCurrency": "USD",
              "description": "4-hour luxury sweet 16 celebration with full entertainment for 1-14 guests"
            }
          ]
        })
      }} />

      
      {/* JSON-LD Structured Data - Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "https://premierpartycruises.com/sweet-16/#service",
                    "name": "Private Cruise — Sweet 16 Parties",
                    "provider": {
                              "@id": "https://premierpartycruises.com/#organization"
                    },
                    "areaServed": [
                              "Austin TX",
                              "Texas",
                              "United States"
                    ],
                    "description": "Private 3–4 hour cruise with licensed, experienced captain & crew, premium Bluetooth sound, coolers, restrooms, sun & shade seating. Choose Essentials or Ultimate Disco Party package add‑ons."
          })
      }} />

      <VideoGallerySection videos={[{id: 'FABtEDZZBA0', title: 'Premier Party Cruises Experience', description: 'See what makes our Lake Travis cruises unforgettable'}]} />

      <Footer />
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
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
import { 
  Sunset, Heart, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Camera, Wine, 
  Music, Utensils, Star, Shield, Gift, MessageSquare,
  Mic, GlassWater, Crown, Award, Quote, ChevronRight,
  Ship, Anchor, Sun, Cloud, Info, TrendingUp, X
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Hero and gallery images
import heroImage1 from '@assets/dancing-party-scene.jpg';
import heroImage2 from '@assets/clever-girl-50-person-boat.jpg';
import heroImage3 from '@assets/day-tripper-14-person-boat.jpg';
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

// Rehearsal Dinner packages
const rehearsalPackages = [
  {
    id: 'standard',
    name: 'Standard 4-Hour Cruise',
    capacity: 'Up to 14 guests',
    basePrice: 200,
    description: 'Intimate pre-wedding gathering - Toast to tomorrow',
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
    icon: Heart,
    badge: 'Perfect Start'
  },
  {
    id: 'essentials',
    name: 'Cruise w/Essentials Package',
    capacity: 'Up to 14 guests',
    basePrice: 225,
    addOnPrice: 100,
    description: 'Rehearsal dinner with complete convenience',
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
    capacity: 'Up to 14 guests',
    basePrice: 250,
    addOnPrice: 250,
    description: 'Ultimate pre-wedding celebration with entertainment and party supplies',
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
    badge: 'VIP Experience'
  }
];

// What's included in all rehearsal dinner cruises
const whatsIncluded = [
  {
    icon: Sunset,
    title: 'Sunset Timing',
    description: 'Perfectly timed for golden hour photos and romantic ambiance'
  },
  {
    icon: Mic,
    title: 'Speech Setup',
    description: 'Wireless microphone for heartfelt toasts and speeches'
  },
  {
    icon: Camera,
    title: 'Photo Opportunities',
    description: 'Scenic Lake Travis backdrops for wedding album photos'
  },
  {
    icon: Utensils,
    title: 'Dinner Ready',
    description: 'Full setup with tables and coolers for your food'
  },
  {
    icon: Wine,
    title: 'Bar Service Area',
    description: 'Designated area for bar setup and service'
  },
  {
    icon: Music,
    title: 'Ambient Music',
    description: 'Premium sound system for background music'
  },
  {
    icon: Heart,
    title: 'Couple\'s Corner',
    description: 'Special seating area for bride and groom'
  },
  {
    icon: Shield,
    title: 'Professional Crew',
    description: 'Experienced staff to ensure smooth service'
  },
  {
    icon: Gift,
    title: 'Decor Assistance',
    description: 'Help setting up your personal decorations'
  }
];

// Rehearsal dinner specific FAQs - corrected content
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
    answer: '25% deposit if >30 days out (balance due 30 days prior). If booking within 30 days, 50% deposit due and remainder within 72 hours.'
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


export default function RehearsalDinner() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const reducedMotion = useReducedMotion();
  const [selectedPackage, setSelectedPackage] = useState('classic');
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
    navigate('/chat?eventType=rehearsal-dinner');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=rehearsal-dinner&action=book');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead 
        pageRoute="/rehearsal-dinner"
        defaultTitle="Rehearsal Dinner Cruises | Lake Travis"
        defaultDescription="Elegant rehearsal dinner cruises on Lake Travis. Sunset views, dinner service for 30-75 guests. Perfect pre-wedding celebration!"
        defaultKeywords={[
          'rehearsal dinner cruise austin',
          'lake travis rehearsal dinner',
          'wedding rehearsal boat',
          'sunset dinner cruise austin',
          'pre-wedding celebration lake travis'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section with Crossfade */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
        {/* Image Background with Smooth Crossfade */}
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
              <img 
                src={image}
                alt="Rehearsal Dinner Party Boat Austin cruise on Lake Travis - Elegant pre-wedding celebrations"
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
                loading={index === 0 ? "eager" : "lazy"}
                fetchpriority={index === 0 ? "high" : "low"}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </motion.div>
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-white flex-grow flex items-center">
          <motion.div 
            className="max-w-4xl mx-auto text-center w-full"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-6 py-3 text-base font-sans tracking-wider bg-white/20 backdrop-blur-sm border-white/30">
                <Sunset className="mr-2 h-5 w-5" />
                Elegant Pre-Wedding Celebrations
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-center"
              variants={fadeInUp}
            >
              Rehearsal Dinner on Lake Travis
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-base mb-8 text-white/90 max-w-3xl mx-auto text-center"
              variants={fadeInUp}
            >
              Create an unforgettable evening before your big day with an elegant sunset cruise, 
              gourmet dining, and heartfelt toasts on the water.
            </motion.p>

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
                Get Custom Quote
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
                <div className="text-3xl font-bold text-pink-400">500+</div>
                <div className="text-sm text-white/80">Rehearsal Dinners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">30-75</div>
                <div className="text-sm text-white/80">Guest Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">5.0★</div>
                <div className="text-sm text-white/80">Average Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="relative z-20 w-full bg-white/90 backdrop-blur-sm py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-900 text-base md:text-lg font-semibold">
              <span className="text-purple-600">Sunset Views</span> • Gourmet Dining • <span className="text-purple-600">Elegant Celebrations</span>
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
      <section id="packages" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Rehearsal Dinner Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package for your pre-wedding celebration. All packages include sunset timing, 
              professional crew, and full setup assistance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {rehearsalPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "relative h-full hover:shadow-2xl transition-all duration-300",
                  pkg.popular && "border-2 border-brand-yellow shadow-xl scale-105"
                )}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-brand-yellow text-black font-bold px-4 py-1">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <pkg.icon className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">{pkg.capacity}</CardDescription>
                    
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-brand-blue">
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
              Everything You Need for the Perfect Evening
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We handle all the details so you can focus on celebrating
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
                className="flex items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <item.icon className="h-6 w-6 text-brand-blue" />
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Love Stories from the Lake
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Check out our verified reviews on Google and Facebook to see what real couples are saying about their rehearsal dinner cruises on Lake Travis!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-lg px-10 py-6"
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
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-lg px-10 py-6"
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about rehearsal dinner cruises
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
                        <Info className="h-5 w-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
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
        partyType="Rehearsal Dinner"
        eventType="rehearsal dinner"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-600">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Ready to Plan Your Perfect Rehearsal Dinner?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Let us help you create an unforgettable evening before your big day. 
              Our team is ready to make your rehearsal dinner dreams come true.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6 shadow-xl"
                data-testid="button-cta-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Get Custom Quote
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
              Related Wedding Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our full range of wedding event experiences on Lake Travis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/welcome-party">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <PartyPopper className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Welcome Party</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Welcome party on water
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Welcome Parties
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
              <Link href="/after-party">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Music className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">After Party</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Post-wedding celebrations
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore After Parties
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
              <Link href="/wedding-parties">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/10 rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Wedding Parties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      All wedding event options
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      View All Wedding Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Hidden Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/Service">
        <h2>Rehearsal Dinner Cruise Lake Travis - Austin Wedding Pre-Celebration</h2>
        <p itemProp="description">
          Elegant rehearsal dinner cruises on Lake Travis. Perfect pre-wedding celebration with sunset views, gourmet dining, 
          and heartfelt toasts. Intimate gatherings from 14-75 guests with professional service and stunning backdrops.
        </p>
        
        {/* Pricing Content for Crawlers */}
        <h3>Rehearsal Dinner Private Cruise Pricing - All Guest Capacities</h3>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">1-14 Guests Rehearsal Dinner Pricing</h4>
          <p>Monday-Thursday: Standard $1,050, Essentials $1,150, Ultimate $1,300</p>
          <p>Friday: Standard $1,181, Essentials $1,281, Ultimate $1,431</p>
          <p>Saturday: Standard $1,838, Essentials $1,938, Ultimate $2,088</p>
          <p>Sunday: Standard $1,313, Essentials $1,413, Ultimate $1,563</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">15-25 Guests Pre-Wedding Dinner Pricing</h4>
          <p>Monday-Thursday: Standard $1,181, Essentials $1,331, Ultimate $1,481</p>
          <p>Friday: Standard $1,313, Essentials $1,463, Ultimate $1,613</p>
          <p>Saturday: Standard $1,969, Essentials $2,119, Ultimate $2,269</p>
          <p>Sunday: Standard $1,444, Essentials $1,594, Ultimate $1,744</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">26-30 Guests Rehearsal Dinner Pricing</h4>
          <p>Monday-Thursday: Standard $1,381, Essentials $1,531, Ultimate $1,681</p>
          <p>Friday: Standard $1,513, Essentials $1,663, Ultimate $1,813</p>
          <p>Saturday: Standard $2,169, Essentials $2,319, Ultimate $2,469</p>
          <p>Sunday: Standard $1,644, Essentials $1,794, Ultimate $1,944</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">31-50 Guests Wedding Rehearsal Cruise Pricing</h4>
          <p>Monday-Thursday: Standard $1,313, Essentials $1,513, Ultimate $1,663</p>
          <p>Friday: Standard $1,444, Essentials $1,644, Ultimate $1,794</p>
          <p>Saturday: Standard $2,100, Essentials $2,300, Ultimate $2,450</p>
          <p>Sunday: Standard $1,575, Essentials $1,775, Ultimate $1,925</p>
        </div>
        <div itemScope itemType="https://schema.org/Offer">
          <h4 itemProp="name">51-75 Guests Large Rehearsal Dinner Pricing</h4>
          <p>Monday-Thursday: Standard $1,613, Essentials $1,813, Ultimate $1,963</p>
          <p>Friday: Standard $1,744, Essentials $1,944, Ultimate $2,094</p>
          <p>Saturday: Standard $2,400, Essentials $2,600, Ultimate $2,750</p>
          <p>Sunday: Standard $1,875, Essentials $2,075, Ultimate $2,225</p>
        </div>
        
        <h3>Rehearsal Dinner Features and Services</h3>
        <ul>
          <li>Rehearsal dinner cruise on Lake Travis with sunset timing</li>
          <li>Tables and setup for your food and drinks</li>
          <li>Wireless microphone for toasts and speeches</li>
          <li>Scenic photo opportunities for wedding album</li>
          <li>Bar service area with beverage options</li>
          <li>Elegant table settings and decor assistance</li>
          <li>Special seating area for bride and groom</li>
          <li>Premium sound system for ambient music</li>
          <li>Professional crew for seamless service</li>
          <li>Customizable decorations to match wedding theme</li>
        </ul>
        
        <h3>Austin Rehearsal Dinner Cruise Keywords</h3>
        <p>rehearsal dinner Austin, rehearsal dinner cruise Lake Travis, wedding rehearsal boat Austin, pre-wedding dinner cruise, 
        Lake Travis sunset dinner, Austin rehearsal celebration, wedding rehearsal yacht Lake Travis, intimate rehearsal dinner boat, 
        Lake Travis pre-wedding event, Austin wedding rehearsal venue, sunset rehearsal cruise, Lake Travis wedding rehearsal party</p>
        
        <h3>Fleet Options for Rehearsal Dinners</h3>
        <p>Day Tripper (14 guests), Meeseeks (25 guests), Tito (30 guests), Clever Girl (50 guests), Millennium Falcon (75 guests)</p>
      </div>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Rehearsal Dinner Cruise Lake Travis",
          "description": "Elegant rehearsal dinner cruises on Lake Travis. Perfect pre-wedding celebration with sunset views, gourmet dining, and heartfelt toasts on the water.",
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
            "priceRange": "$1,050-$2,750"
          },
          "areaServed": {
            "@type": "City",
            "name": "Austin, TX"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Rehearsal Dinner Standard Package",
              "price": "1050",
              "priceCurrency": "USD",
              "description": "4-hour rehearsal dinner cruise for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Rehearsal Dinner Essentials Package",
              "price": "1150",
              "priceCurrency": "USD",
              "description": "4-hour rehearsal dinner with amenities for 1-14 guests"
            },
            {
              "@type": "Offer",
              "name": "Rehearsal Dinner Ultimate Package",
              "price": "1300",
              "priceCurrency": "USD",
              "description": "4-hour luxury rehearsal dinner with full service for 1-14 guests"
            }
          ]
        })
      }} />

      
      {/* JSON-LD Structured Data - Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "https://premierpartycruises.com/rehearsal-dinner/#service",
                    "name": "Private Cruise — Rehearsal Dinners",
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

      <Footer />
    </div>
  );
}
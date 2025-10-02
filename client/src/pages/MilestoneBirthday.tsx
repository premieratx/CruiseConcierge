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
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { formatCurrency } from '@shared/formatters';
import { HOURLY_RATES, PRICING_DEFAULTS } from '@shared/constants';
import SEOHead from '@/components/SEOHead';
import { 
  Cake, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, PartyPopper, Shield,
  Star, MessageSquare, Crown, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, Gift, Camera,
  Music, Wine, Heart, Trophy, Confetti
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/party-atmosphere-1.jpg';
import heroImage2 from '@assets/party-atmosphere-2.jpg';
import heroImage3 from '@assets/party-atmosphere-3.jpg';
import galleryImage1 from '@assets/atx-disco-cruise-party.jpg';
import galleryImage2 from '@assets/dancing-party-scene.jpg';
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

const confettiAnimation = {
  hidden: { scale: 0, rotate: 0 },
  visible: {
    scale: [0, 1.2, 1],
    rotate: [0, 360],
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

// Milestone Birthday packages
const birthdayPackages = [
  {
    id: 'essential',
    name: 'Essential Celebration',
    basePrice: HOURLY_RATES.MON_THU[25] / 100, // Uses centralized pricing from shared/constants.ts
    description: 'Perfect for intimate milestone celebrations',
    features: [
      'Premium pontoon boat (25-30 guests)',
      'Professional captain and crew',
      '3-4 hour birthday cruise',
      'Birthday decorations and banners',
      'Music system with party playlist',
      'Birthday cake table setup',
      'Photo opportunities',
      'Swimming stop included'
    ],
    popular: false,
    icon: Gift,
    badge: 'Great Value'
  },
  {
    id: 'premium',
    name: 'Premium Party',
    basePrice: HOURLY_RATES.MON_THU[50] / 100, // Uses centralized pricing from shared/constants.ts
    addOnPrice: 75,
    description: 'Enhanced milestone celebration with extras',
    features: [
      'Everything in Essential Celebration',
      'Upgraded yacht (50 guests)',
      'Professional photographer (2 hours)',
      'Custom milestone decorations',
      'DJ or live music option',
      'Champagne toast for milestone',
      'Memory book station',
      'Photo props for milestone age'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Bash',
    basePrice: HOURLY_RATES.FRIDAY[50] / 100, // Uses centralized pricing from shared/constants.ts
    addOnPrice: 125,
    description: 'Unforgettable luxury milestone experience',
    features: [
      'Everything in Premium Party',
      'Luxury yacht (75 guests)',
      'Full event photography/videography',
      'Custom themed decorations',
      'Live entertainment',
      'Premium catering options',
      'Surprise elements coordination',
      'Fireworks display option',
      'VIP birthday person deck'
    ],
    popular: false,
    icon: Trophy,
    badge: 'VIP Experience'
  }
];

// Milestone ages and themes
const milestoneAges = [
  { age: 21, theme: 'Finally Legal', color: 'text-yellow-500' },
  { age: 30, theme: 'Dirty Thirty', color: 'text-orange-500' },
  { age: 40, theme: 'Fabulous Forty', color: 'text-red-500' },
  { age: 50, theme: 'Fabulous Fifty', color: 'text-purple-500' },
  { age: 60, theme: 'Sensational Sixty', color: 'text-blue-500' },
  { age: 'Custom', theme: 'Any Milestone', color: 'text-brand-blue' }
];

// What's included
const whatsIncluded = [
  {
    icon: Cake,
    title: 'Birthday Setup',
    description: 'Dedicated cake table and celebration area'
  },
  {
    icon: PartyPopper,
    title: 'Milestone Decorations',
    description: 'Age-specific banners and themed decor'
  },
  {
    icon: Camera,
    title: 'Photo Moments',
    description: 'Props and backdrops for milestone photos'
  },
  {
    icon: Music,
    title: 'Party Music',
    description: 'DJ or playlist from birthday person\'s era'
  },
  {
    icon: Wine,
    title: 'Toast Ready',
    description: 'Champagne service for milestone toasts'
  },
  {
    icon: Gift,
    title: 'Memory Making',
    description: 'Guest book and memory stations'
  },
  {
    icon: Heart,
    title: 'VIP Treatment',
    description: 'Special attention for birthday honoree'
  },
  {
    icon: Shield,
    title: 'Full Service',
    description: 'Professional crew handles everything'
  },
  {
    icon: Star,
    title: 'Surprise Support',
    description: 'Help coordinating surprise elements'
  }
];

// FAQs
const faqItems = [
  {
    id: 'ages',
    question: 'What milestone birthdays do you typically celebrate?',
    answer: 'We specialize in all milestone birthdays - 21st, 30th, 40th, 50th, 60th, and beyond! Each milestone gets special touches: 21st parties often feature celebratory toasts, 30th and 40th focus on fun themes, while 50th and beyond emphasize elegance and nostalgia.'
  },
  {
    id: 'surprise',
    question: 'Can you help coordinate a surprise party?',
    answer: 'Absolutely! We\'re experts at surprise parties. We\'ll work with your designated planner, coordinate arrival timing, help with distraction plans, and ensure the birthday person is genuinely surprised. Our crew is discreet and professional.'
  },
  {
    id: 'decorations',
    question: 'What decorations are included vs. what can we bring?',
    answer: 'We provide basic birthday banners, balloons, and table settings. You\'re welcome to bring custom decorations, photo displays, or themed items. Popular additions include decade-specific decorations, photo timelines, and personalized banners.'
  },
  {
    id: 'cake',
    question: 'Can we bring our own birthday cake?',
    answer: 'Yes! We have a dedicated cake table with all serving supplies. We can also connect you with local bakeries who deliver to the marina. Our crew will handle cake service and coordinate the perfect moment for singing and candles.'
  },
  {
    id: 'activities',
    question: 'What activities work well for different age groups?',
    answer: 'For 21st-30th: dancing, swimming, party games. For 40th-50th: mix of relaxation and celebration. For 60th+: scenic cruising, storytelling, nostalgic music. We customize activities based on your group\'s preferences and energy level.'
  },
  {
    id: 'gifts',
    question: 'How do guests handle bringing gifts on a boat?',
    answer: 'We have a designated gift table area. Many groups opt for a gift opening on land and cards-only on the boat. We can also arrange gift transportation back to vehicles after the cruise.'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Jennifer Walsh',
    role: 'Celebrated 50th Birthday',
    rating: 5,
    text: 'My husband surprised me with a 50th birthday cruise and it was absolutely perfect! The crew helped with the surprise, the decorations were beautiful, and dancing on the lake at sunset was magical. Best birthday ever!',
    image: '/testimonials/jennifer.jpg'
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    role: '40th Birthday Bash',
    rating: 5,
    text: 'Turned 40 in style with 45 friends on Lake Travis! The photo props were hilarious, the DJ played all my favorite songs, and the crew made me feel like a VIP. Can\'t wait to do it again at 50!',
    image: '/testimonials/mike.jpg'
  },
  {
    id: 3,
    name: 'Sarah Chen',
    role: 'Organized Dad\'s 60th',
    rating: 5,
    text: 'Organized my dad\'s 60th birthday cruise with family from across the country. The crew was amazing with our multi-generational group, the photographer captured precious moments, and Dad said it was his best birthday ever.',
    image: '/testimonials/sarah.jpg'
  }
];

export default function MilestoneBirthday() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [selectedAge, setSelectedAge] = useState(null);

  const handleGetQuote = () => {
    navigate('/chat?eventType=milestone-birthday');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=milestone-birthday&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/milestone-birthday"
        defaultTitle="Milestone Birthday Party Cruises | Lake Travis | Austin"
        defaultDescription="Celebrate 21st, 30th, 40th, 50th birthdays and beyond on Lake Travis. Customized milestone celebrations with decorations, photography, and unforgettable memories."
        defaultKeywords={[
          'milestone birthday cruise austin',
          '30th birthday party lake travis',
          '40th birthday boat rental',
          '50th birthday celebration austin',
          'birthday party cruise lake travis'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-full h-full">
              <img 
                src={heroImage1} 
                alt="Milestone Birthday Cruise" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 px-4 py-2 text-lg bg-white/20 backdrop-blur-sm border-white/30">
                <Cake className="mr-2 h-5 w-5" />
                Celebrate Life's Big Milestones
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Milestone Birthday
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                Celebrations
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Make your milestone birthday unforgettable with a custom celebration 
              cruise on Lake Travis. 21st, 30th, 40th, 50th, and beyond!
            </motion.p>

            {/* Milestone Age Selector */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-8"
              variants={fadeInUp}
            >
              {milestoneAges.map((milestone) => (
                <motion.button
                  key={milestone.age}
                  onClick={() => setSelectedAge(milestone.age)}
                  className={cn(
                    "px-4 py-2 rounded-full border-2 transition-all",
                    selectedAge === milestone.age
                      ? "bg-brand-yellow text-black border-brand-yellow"
                      : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-bold">
                    {milestone.age === 'Custom' ? milestone.age : `${milestone.age}th`}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6 shadow-xl"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Plan Your Milestone
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6"
                data-testid="button-hero-view-packages"
              >
                View Packages
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Animated Confetti Icon */}
            <motion.div 
              className="absolute top-10 right-10 text-brand-yellow opacity-20"
              variants={confettiAnimation}
              initial="hidden"
              animate="visible"
            >
              <PartyPopper className="h-24 w-24" />
            </motion.div>
          </motion.div>
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
              Milestone Birthday Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package for your milestone celebration. 
              Every birthday deserves to be celebrated in style!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {birthdayPackages.map((pkg, index) => (
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
              Making Milestone Memories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need for an unforgettable milestone celebration
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
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Milestone Memories Made
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what our birthday celebrants are saying
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
                      ))}
                    </div>
                    
                    <Quote className="h-8 w-8 text-brand-blue/20 mb-2" />
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                      "{testimonial.text}"
                    </p>

                    <div className="border-t pt-4">
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Milestone Birthday FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about milestone birthday cruises
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
              Make Your Milestone Unforgettable
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Life's big birthdays deserve big celebrations. Let us help you create 
              a milestone birthday cruise that you'll remember forever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6 shadow-xl"
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
    </div>
  );
}
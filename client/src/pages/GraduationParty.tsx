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
  GraduationCap, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Trophy, Shield,
  Star, MessageSquare, Award, Quote, ChevronRight,
  Ship, Sun, Info, TrendingUp, PartyPopper, Camera,
  Music, Gift, Rocket, BookOpen, Target
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/party-atmosphere-1.jpg';
import heroImage2 from '@assets/party-atmosphere-2.jpg';
import heroImage3 from '@assets/party-atmosphere-3.jpg';
import galleryImage1 from '@assets/atx-disco-cruise-party.jpg';
import galleryImage2 from '@assets/dancing-party-scene.jpg';
import galleryImage3 from '@assets/giant-unicorn-float.jpg';

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

const capToss = {
  hidden: { y: 0, rotate: 0 },
  visible: {
    y: [-100, 0],
    rotate: [0, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeOut"
    }
  }
};

// Graduation packages
const graduationPackages = [
  {
    id: 'standard',
    name: 'Standard 4-Hour Cruise',
    basePrice: 200,
    description: 'Celebrate this milestone achievement - Toast to the future',
    features: [
      'Amazing, experienced captain',
      '2 large empty coolers (bring your own ice & drinks)',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for up to 14 guests',
      'Plenty of sun & shade areas',
      'Vendor coordination for catering'
    ],
    popular: false,
    icon: BookOpen,
    badge: 'Great Value'
  },
  {
    id: 'essentials',
    name: 'Cruise w/Essentials Package',
    basePrice: 225,
    addOnPrice: 100,
    description: 'Graduation party with complete convenience',
    features: [
      'Everything from Standard Cruise',
      'Insulated 5-gallon dispenser with ice water',
      'Fresh water & solo cups',
      'Coolers pre-stocked with ice',
      '6-ft folding table for food & drinks',
      'Vendor coordination for catering'
    ],
    popular: true,
    icon: Trophy,
    badge: 'Most Popular'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Party Package',
    basePrice: 250,
    addOnPrice: 250,
    description: 'Luxury graduation celebration with entertainment and party supplies',
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
    popular: false,
    icon: Rocket,
    badge: 'Ultimate Celebration'
  }
];

// What's included
const whatsIncluded = [
  {
    icon: GraduationCap,
    title: 'Cap & Gown Ready',
    description: 'Perfect photo ops in graduation attire'
  },
  {
    icon: Trophy,
    title: 'Achievement Focus',
    description: 'Celebrate academic accomplishments'
  },
  {
    icon: Camera,
    title: 'Photo Memories',
    description: 'Capture this milestone moment'
  },
  {
    icon: Music,
    title: 'Celebration Music',
    description: 'Graduation hits and party favorites'
  },
  {
    icon: Target,
    title: 'Future Forward',
    description: 'Toast to bright futures ahead'
  },
  {
    icon: Gift,
    title: 'Memory Making',
    description: 'Guest signatures and well wishes'
  },
  {
    icon: PartyPopper,
    title: 'Party Atmosphere',
    description: 'Fun celebration with classmates'
  },
  {
    icon: Shield,
    title: 'Professional Service',
    description: 'Experienced crew for smooth event'
  },
  {
    icon: Star,
    title: 'Graduate VIP',
    description: 'Special treatment for the grad'
  }
];

// FAQs
const faqItems = [
  {
    id: 'timing',
    question: 'When should we schedule a graduation party cruise?',
    answer: 'Most graduation cruises happen within 1-2 weeks after graduation ceremonies. Popular times are late May through early June for high school and May for college. Book early as this is our busiest season for grad parties!'
  },
  {
    id: 'combined',
    question: 'Can we combine multiple graduates in one party?',
    answer: 'Absolutely! Joint graduation parties are very popular and cost-effective. We can customize decorations for multiple schools/graduates. Many friend groups combine their celebrations for one epic party.'
  },
  {
    id: 'decorations',
    question: 'Can we use school colors and graduation themes?',
    answer: 'Yes! We love customizing with school colors, mascots, and graduation year. Bring banners, signs, or photos. Popular additions include photo displays showing the graduate\'s journey from kindergarten to graduation.'
  },
  {
    id: 'ages',
    question: 'Do you accommodate both high school and college graduations?',
    answer: 'Yes! We tailor the experience to the age group. High school grads (17-18) have supervised, alcohol-free celebrations with mocktails. College grads (21+) can have bar service. Mixed age groups are handled appropriately.'
  },
  {
    id: 'activities',
    question: 'What activities work best for graduation parties?',
    answer: 'Swimming, dancing, photo sessions, superlatives/awards, toasts and speeches, and future predictions games are all popular. For high school grads, we focus on fun activities. College grads often prefer more socializing time.'
  },
  {
    id: 'gifts',
    question: 'How do guests handle graduation gifts?',
    answer: 'We have a designated gift table area. Many grads request "cards only" for the cruise and handle larger gifts separately. We can also coordinate gift card boxes or money trees as requested.'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'The Martinez Family',
    role: 'High School Graduation 2024',
    rating: 5,
    text: 'Our daughter\'s graduation cruise was the perfect way to celebrate her achievement! The crew was amazing, the photos turned out beautifully, and all her friends had a blast. She\'ll remember this forever!',
    image: '/testimonials/martinez.jpg'
  },
  {
    id: 2,
    name: 'Jake Thompson',
    role: 'UT Austin Graduate',
    rating: 5,
    text: 'Epic way to celebrate finishing college! We had 50 friends on the yacht, perfect weather, and the crew helped make it unforgettable. Way better than a regular grad party. Hook \'em!',
    image: '/testimonials/jake.jpg'
  },
  {
    id: 3,
    name: 'Susan Lee',
    role: 'Organized Joint Grad Party',
    rating: 5,
    text: 'We combined 4 graduates from different high schools for one amazing celebration. The crew handled the logistics perfectly, customized decorations for each school, and everyone had an incredible time!',
    image: '/testimonials/susan.jpg'
  }
];

export default function GraduationParty() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('grad_essentials');

  const handleGetQuote = () => {
    navigate('/chat?eventType=graduation-party');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=graduation-party&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/graduation-party"
        defaultTitle="Graduation Party Cruises | Lake Travis | Austin TX"
        defaultDescription="Celebrate graduation in style with a Lake Travis cruise! Perfect for high school and college grads. Cap & gown photos, achievement celebrations, and unforgettable memories."
        defaultKeywords={[
          'graduation party cruise austin',
          'grad party lake travis',
          'high school graduation cruise',
          'college graduation boat party',
          'graduation celebration austin'
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
                alt="Graduation Party Cruise" 
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
                <GraduationCap className="mr-2 h-5 w-5" />
                Celebrate Your Achievement
              </Badge>
            </motion.div>

            {/* Animated Graduation Cap */}
            <motion.div 
              className="absolute top-20 right-20 text-brand-yellow opacity-30"
              variants={capToss}
              initial="hidden"
              animate="visible"
            >
              <GraduationCap className="h-16 w-16" />
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Graduation
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                Party Cruises
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              You did it! Celebrate your graduation milestone with an unforgettable 
              Lake Travis cruise. The perfect send-off to your next adventure!
            </motion.p>

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
                Plan Grad Party
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

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">500+</div>
                <div className="text-sm text-white/80">Grad Parties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">HS & College</div>
                <div className="text-sm text-white/80">All Levels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">5.0★</div>
                <div className="text-sm text-white/80">Graduate Rating</div>
              </div>
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
              Graduation Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package for your graduation celebration. 
              Every achievement deserves to be celebrated!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {graduationPackages.map((pkg, index) => (
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
              Celebrating Your Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need for the perfect graduation celebration
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
              Graduation Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Hear from graduates and their families
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
              Graduation Party FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about graduation cruises
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
              Celebrate Your Achievement in Style!
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              You've worked hard for this moment. Celebrate your graduation with an 
              unforgettable Lake Travis cruise that matches your achievement!
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
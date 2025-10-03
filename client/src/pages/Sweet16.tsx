import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import { EmbeddedQuoteBuilder } from '@/components/EmbeddedQuoteBuilder';
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
import { 
  Sparkles, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Star, Camera, Music,
  Heart, MessageSquare, Crown, Quote, ChevronRight,
  Ship, Sun, Info, TrendingUp, Gift, PartyPopper,
  Flower2, Smile, IceCream, Palette, Shield
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/party-atmosphere-1.jpg';
import heroImage2 from '@assets/party-atmosphere-2.jpg';
import heroImage3 from '@assets/dancing-party-scene.jpg';
import galleryImage1 from '@assets/atx-disco-cruise-party.jpg';
import galleryImage2 from '@assets/bachelor-party-group-guys.jpg';
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
      'Vendor coordination for catering'
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
      'Vendor coordination for catering'
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
      'Vendor coordination for catering'
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

// FAQs
const faqItems = [
  {
    id: 'supervision',
    question: 'What supervision is provided for teen parties?',
    answer: 'Our professional crew maintains a safe, supervised environment throughout the cruise. We have clear safety rules, designated swimming areas with supervision, and maintain appropriate music and atmosphere for teens. Parents are welcome to attend or can feel confident leaving their teens in our care.'
  },
  {
    id: 'parents',
    question: 'Can parents attend or is it teens only?',
    answer: 'That\'s entirely up to you! Many Sweet 16s have a mix of teens with a few parents/chaperones on board. Some prefer teens-only with parents just for drop-off/pickup. We accommodate either format and ensure appropriate supervision regardless.'
  },
  {
    id: 'food',
    question: 'What food and drink options work best for Sweet 16s?',
    answer: 'Popular options include pizza, sliders, tacos, fruit platters, and dessert bars. For drinks, we create fancy mocktails, smoothies, sodas, and juices. Everything is presented beautifully for those important Instagram moments!'
  },
  {
    id: 'music',
    question: 'What kind of music is appropriate?',
    answer: 'Our DJs specialize in teen parties with current pop hits, clean versions of popular songs, and dance favorites. The birthday girl can provide a playlist or our DJ will read the room. All music is age-appropriate and parent-approved.'
  },
  {
    id: 'activities',
    question: 'What activities do teens enjoy on the cruise?',
    answer: 'Dancing is always popular! Plus swimming, photo sessions, TikTok video creation, mocktail making, and scenic cruising. We can also arrange games, contests, or special surprises based on the birthday girl\'s interests.'
  },
  {
    id: 'themes',
    question: 'Can we have a themed Sweet 16?',
    answer: 'Absolutely! Popular themes include Enchanted Garden, Hollywood Glam, Tropical Paradise, or Disco Dreams. We\'ll help coordinate decorations, props, and even suggest dress codes to match your theme perfectly.'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Madison\'s Mom',
    role: 'Sweet 16 in June',
    rating: 5,
    text: 'Madison\'s Sweet 16 cruise was absolutely perfect! The decorations were gorgeous, the crew was amazing with the teens, and the photos turned out incredible. She said it was the best day of her life!',
    image: '/testimonials/madison-mom.jpg'
  },
  {
    id: 2,
    name: 'Emma Thompson',
    role: 'Birthday Girl',
    rating: 5,
    text: 'OMG best Sweet 16 ever! The yacht was so pretty, my friends had the best time, and the sunset was gorgeous! The DJ played all our favorite songs and the mocktails were so fancy. Thank you for making my day so special!',
    image: '/testimonials/emma.jpg'
  },
  {
    id: 3,
    name: 'The Johnson Family',
    role: 'Sophia\'s Sweet 16',
    rating: 5,
    text: 'We were nervous about 40 teenagers on a boat, but the crew handled everything perfectly. Safe, fun, and memorable. Sophia and her friends are still talking about it months later. Worth every penny!',
    image: '/testimonials/johnson-family.jpg'
  }
];

export default function Sweet16() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('sweet_deluxe');

  const handleGetQuote = () => {
    navigate('/chat?eventType=sweet-16');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=sweet-16&action=book');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-950 dark:to-gray-900">
      <SEOHead 
        pageRoute="/sweet-16"
        defaultTitle="Sweet 16 Birthday Cruises | Lake Travis | Austin TX"
        defaultDescription="Unforgettable Sweet 16 birthday cruises on Lake Travis. Instagram-worthy celebrations with DJ, decorations, and teen-friendly fun. Make her 16th birthday magical!"
        defaultKeywords={[
          'sweet 16 cruise austin',
          'sweet sixteen party lake travis',
          'teen birthday cruise austin',
          '16th birthday boat party',
          'sweet 16 celebration ideas austin'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Sparkles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              variants={sparkleFloat}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.3 }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
          ))}
        </div>

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
                alt="Sweet 16 Cruise" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-pink-900/40 via-purple-900/30 to-pink-900/50" />
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
              <Badge className="mb-4 px-4 py-2 text-lg bg-pink-500/30 backdrop-blur-sm border-pink-300">
                <Sparkles className="mr-2 h-5 w-5" />
                Make Her 16th Birthday Magical
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Sweet 16
              <span className="block text-3xl md:text-5xl mt-2 text-pink-300">
                Birthday Cruises
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Celebrate this milestone birthday with an unforgettable Lake Travis cruise. 
              Instagram-worthy moments, amazing friends, and memories to last a lifetime!
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold text-lg px-8 py-6 shadow-xl"
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
                <div className="text-3xl font-bold text-pink-300">200+</div>
                <div className="text-sm text-white/80">Sweet 16s</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-300">25-75</div>
                <div className="text-sm text-white/80">Guest Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-300">5.0★</div>
                <div className="text-sm text-white/80">Parent Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <EmbeddedQuoteBuilder pageContext="home" className="my-16" />

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
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Sweet 16 Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Hear from happy birthday girls and their parents
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
                        <Star key={i} className="h-5 w-5 fill-pink-400 text-pink-400" />
                      ))}
                    </div>
                    
                    <Quote className="h-8 w-8 text-pink-200 mb-2" />
                    
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
    </div>
  );
}
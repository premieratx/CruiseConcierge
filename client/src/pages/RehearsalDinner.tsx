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
  Sunset, Heart, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Camera, Wine, 
  Music, Utensils, Star, Shield, Gift, MessageSquare,
  Mic, GlassWater, Crown, Award, Quote, ChevronRight,
  Ship, Anchor, Sun, Cloud, Info, TrendingUp
} from 'lucide-react';

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
      'Vendor coordination for catering'
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
      'Vendor coordination for catering'
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
      'Vendor coordination for catering'
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
    title: 'Catering Ready',
    description: 'Full setup for your chosen catering service'
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

// Rehearsal dinner specific FAQs
const faqItems = [
  {
    id: 'catering',
    question: 'Do you provide catering for rehearsal dinners?',
    answer: 'While we don\'t provide catering directly, we work with Austin\'s best catering partners who specialize in boat events. We\'ll connect you with trusted vendors and our crew will assist with all setup and service during your cruise.'
  },
  {
    id: 'timing',
    question: 'What time should we schedule our rehearsal dinner cruise?',
    answer: 'We recommend starting 2 hours before sunset for the best experience. This gives you daylight for boarding and mingling, sunset for dinner and photos, and twilight for speeches and toasts. Our team will help you choose the perfect timing based on your wedding date.'
  },
  {
    id: 'speeches',
    question: 'How do speeches and toasts work on the boat?',
    answer: 'We provide a wireless microphone system perfect for speeches. The boat has designated areas ideal for toasts with everyone able to see and hear. Many couples do speeches during sunset for the most romantic backdrop.'
  },
  {
    id: 'decorations',
    question: 'Can we decorate the boat for our rehearsal dinner?',
    answer: 'Absolutely! We encourage personalizing the space. Our crew arrives early to help with setup. We can accommodate flowers, signs, photos, and lighting. We\'ll work with your wedding planner or help you DIY.'
  },
  {
    id: 'backup-weather',
    question: 'What\'s the backup plan for bad weather?',
    answer: 'The yacht has covered areas for light rain. For severe weather, we\'ll work with you to reschedule or we can arrange an indoor waterfront venue. We monitor weather closely and communicate any concerns 48 hours before your event.'
  },
  {
    id: 'parking',
    question: 'Is there parking for all our guests?',
    answer: 'Yes! We have ample free parking at the marina. We can also arrange shuttle service from your hotel or venue. Many couples use this as a gathering point before heading to the rehearsal dinner cruise together.'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael Thompson',
    role: 'Married June 2024',
    rating: 5,
    text: 'Our rehearsal dinner cruise was absolutely perfect! The sunset was breathtaking, the crew handled everything flawlessly, and our families still talk about how special it was. It set the perfect tone for our wedding weekend.',
    image: '/testimonials/sarah-michael.jpg'
  },
  {
    id: 2,
    name: 'Jennifer Chen',
    role: 'Mother of the Bride',
    rating: 5,
    text: 'As the mother of the bride, I wanted the rehearsal dinner to be memorable. The crew went above and beyond, the yacht was beautiful, and watching my daughter and future son-in-law against the sunset was magical.',
    image: '/testimonials/jennifer.jpg'
  },
  {
    id: 3,
    name: 'David & Amy Rodriguez',
    role: 'Married September 2024',
    rating: 5,
    text: 'We had 65 guests and the Grand Package was incredible. The photographer captured amazing moments, the catering setup was seamless, and the speeches with the lake backdrop were unforgettable. Highly recommend!',
    image: '/testimonials/david-amy.jpg'
  }
];

export default function RehearsalDinner() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('classic');

  const handleGetQuote = () => {
    navigate('/chat?eventType=rehearsal-dinner');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=rehearsal-dinner&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/rehearsal-dinner"
        defaultTitle="Rehearsal Dinner Cruises Lake Travis | Premier Party Cruises"
        defaultDescription="Create an unforgettable rehearsal dinner on Lake Travis. Elegant sunset cruises with dinner service for 30-75 guests. Perfect pre-wedding celebration on the water."
        defaultKeywords={[
          'rehearsal dinner cruise austin',
          'lake travis rehearsal dinner',
          'wedding rehearsal boat',
          'sunset dinner cruise austin',
          'pre-wedding celebration lake travis'
        ]}
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image Carousel */}
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
                alt="Rehearsal Dinner Cruise" 
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
                <Sunset className="mr-2 h-5 w-5" />
                Elegant Pre-Wedding Celebrations
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Rehearsal Dinner
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                on Lake Travis
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
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
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-lg px-8 py-6 shadow-xl"
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
                <div className="text-sm text-white/80">Rehearsal Dinners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">30-75</div>
                <div className="text-sm text-white/80">Guest Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">5.0★</div>
                <div className="text-sm text-white/80">Average Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <EmbeddedQuoteBuilder pageContext="home" className="my-16" />

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
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Love Stories from the Lake
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what couples are saying about their rehearsal dinner cruises
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
    </div>
  );
}
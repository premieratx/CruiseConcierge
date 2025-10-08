import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
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
import { 
  Target, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Trophy, Shield,
  Star, MessageSquare, Award, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, Zap, Play,
  UserCheck, Building, Briefcase, Lightbulb, Handshake, X
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.webp';
import heroImage2 from '@assets/day-tripper-14-person-boat.webp';
import heroImage3 from '@assets/meeseeks-25-person-boat.webp';
import galleryImage1 from '@assets/party-atmosphere-1.webp';
import galleryImage2 from '@assets/party-atmosphere-2.webp';
import galleryImage3 from '@assets/party-atmosphere-3.webp';

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

// Team Building packages
const teamBuildingPackages = [
  {
    id: 'standard',
    name: 'Standard 4-Hour Cruise',
    basePrice: 200,
    description: 'Strengthen bonds outside the office - Collaborative celebration',
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
    icon: Users,
    badge: 'Great Start'
  },
  {
    id: 'essentials',
    name: 'Cruise w/Essentials Package',
    basePrice: 225,
    addOnPrice: 100,
    description: 'Team building with complete convenience',
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
    description: 'Premium team building with entertainment and party supplies',
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
    badge: 'Executive Level'
  }
];

// What's included
const whatsIncluded = [
  {
    icon: Target,
    title: 'Goal-Oriented Activities',
    description: 'Challenges designed to improve team collaboration'
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    description: 'Interactive exercises that build critical thinking'
  },
  {
    icon: Handshake,
    title: 'Trust Building',
    description: 'Activities that strengthen team bonds'
  },
  {
    icon: Trophy,
    title: 'Competitions',
    description: 'Fun team challenges with prizes and recognition'
  },
  {
    icon: Award,
    title: 'Awards Ceremony',
    description: 'Celebrate team achievements and MVPs'
  },
  {
    icon: Building,
    title: 'Company Culture',
    description: 'Reinforce values and build stronger culture'
  },
  {
    icon: Sun,
    title: 'Relaxation Time',
    description: 'Balance activities with scenic relaxation'
  },
  {
    icon: Shield,
    title: 'Professional Facilitation',
    description: 'Expert guidance throughout your event'
  },
  {
    icon: Zap,
    title: 'Energy Boost',
    description: 'Reinvigorate your team\'s motivation'
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

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Jennifer Walsh',
    role: 'HR Director, Tech Startup',
    rating: 5,
    text: 'Our team building cruise exceeded expectations! The facilitator was excellent, activities were engaging, and our team left energized and more connected. Best team event we\'ve ever done.',
    image: '/testimonials/jennifer.jpg'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'CEO, Marketing Agency',
    rating: 5,
    text: 'The Executive Retreat package was perfect for our leadership team. The strategic planning sessions on the water were incredibly productive, and the setting helped everyone think creatively.',
    image: '/testimonials/marcus.jpg'
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    role: 'Operations Manager',
    rating: 5,
    text: 'Our 45-person team had an amazing day! The activities were fun but meaningful, and we saw immediate improvements in communication and collaboration back at the office.',
    image: '/testimonials/sarah.jpg'
  }
];

export default function TeamBuilding() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('enhanced_team');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=team-building');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=team-building&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/team-building"
        defaultTitle="Team Building Cruises | Lake Travis"
        defaultDescription="Transform your team on Lake Travis! Interactive challenges, professional facilitation. Build stronger bonds on the water!"
        defaultKeywords={[
          'corporate team building austin',
          'lake travis team building',
          'team building boat cruise',
          'corporate retreat austin',
          'team building activities lake travis'
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
                alt="Team Building Party Boat Austin cruise on Lake Travis" 
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
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
                <Target className="mr-2 h-5 w-5" />
                Build Stronger Teams on the Water
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Team Building
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                Adventures
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Transform your team with interactive challenges, professional facilitation, 
              and unforgettable experiences on Lake Travis. For larger corporate gatherings, consider <Link href="/private-cruises" className="text-brand-yellow hover:underline font-semibold">our private cruise options</Link> for exclusive team events.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                onClick={handleGetQuote}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-6 shadow-xl"
                data-testid="button-hero-get-quote"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Plan Team Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold text-base sm:text-lg px-6 sm:px-8 py-6"
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
                <div className="text-sm text-white/80">Teams Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">98%</div>
                <div className="text-sm text-white/80">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">15-75</div>
                <div className="text-sm text-white/80">Team Size</div>
              </div>
            </motion.div>
          </motion.div>
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
              Team Building Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package for your team's goals. 
              All packages include activities, facilitation, and Lake Travis experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamBuildingPackages.map((pkg, index) => (
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
              Building Teams, Creating Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need for impactful team development
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
              Team Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what companies say about their team building experiences
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
              Team Building FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about corporate team building cruises
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
        partyType="Team Building Event"
        eventType="team building event"
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
              Ready to Transform Your Team?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Create lasting impact with a team building experience your employees will never forget. 
              Let's plan your perfect team event on Lake Travis.
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
              Related Corporate Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our full range of corporate event solutions on Lake Travis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/client-entertainment">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <Briefcase className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Client Entertainment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Impress clients with Lake Travis experiences
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Client Entertainment
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
              <Link href="/company-milestone">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Company Milestone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Celebrate company achievements on water
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Company Milestones
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
              <Link href="/corporate-events">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-green-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Building className="h-8 w-8 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Corporate Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      All corporate party boat options
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      View All Corporate Events
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
        <h2 itemProp="name">Team Building Corporate Events Austin Lake Travis</h2>
        <p itemProp="description">
          Premier Party Cruises offers exceptional team building experiences on Lake Travis in Austin, Texas. 
          Our corporate team building cruises provide the perfect environment for strengthening team bonds, 
          improving communication, and boosting morale through engaging activities on the water. Professional 
          facilitators, customizable programs, and beautiful Lake Travis scenery create unforgettable team experiences.
        </p>
        
        <h2>Team Building Services Austin</h2>
        <p>
          Professional team building activities on Lake Travis including problem-solving challenges, 
          communication exercises, trust-building activities, leadership development, and collaborative games. 
          Customizable programs designed to meet your company's specific goals and team dynamics.
        </p>
        
        <h2>Private Cruise Pricing for Corporate Groups</h2>
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">14 Guest Team Building Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$200</span> per hour for groups up to 14 people</p>
          <p itemProp="description">Ideal for small team retreats and executive groups</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">15-25 Guest Team Building Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$250</span> per hour for groups of 15-25 people</p>
          <p itemProp="description">Perfect for department team building events</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">26-30 Guest Team Building Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$300</span> per hour for groups of 26-30 people</p>
          <p itemProp="description">Great for mid-size team events</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">31-50 Guest Team Building Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$350</span> per hour for groups of 31-50 people</p>
          <p itemProp="description">Ideal for company-wide team building</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">51-75 Guest Team Building Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$400</span> per hour for groups of 51-75 people</p>
          <p itemProp="description">Perfect for large corporate events</p>
        </div>
        
        <h2>Team Building Features</h2>
        <ul>
          <li>Professional team building facilitators and activity coordinators</li>
          <li>Customizable programs tailored to your company goals</li>
          <li>Trust-building and communication exercises on the water</li>
          <li>Problem-solving challenges and collaborative games</li>
          <li>Leadership development activities</li>
          <li>Customizable catering options from Austin's best caterers</li>
          <li>Professional sound system for presentations and announcements</li>
          <li>Climate-controlled spaces and outdoor deck areas</li>
          <li>Beautiful Lake Travis scenery for team photos</li>
          <li>Experienced captain and professional crew</li>
        </ul>
        
        <h2>Keywords: Team Building Austin, Corporate Events Lake Travis, Team Activities Boat Cruise</h2>
        <p>
          team building Austin, corporate team building Lake Travis, team building activities Austin, 
          corporate events Austin, team retreat Lake Travis, company team building Austin Texas, 
          corporate boat cruise Austin, team bonding activities Lake Travis, corporate party boat Austin, 
          team building cruise Austin, Lake Travis corporate events, Austin team activities boat, 
          corporate team retreat Austin, team building boat rental Austin, company outing Lake Travis
        </p>
        
        <h2>Fleet Options for Team Building</h2>
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Day Tripper - 14 Person Boat</h3>
          <p itemProp="description">
            Perfect for executive teams and small group retreats. Intimate setting with premium amenities, 
            ideal for focused team building sessions and strategic planning meetings on the water.
          </p>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Me Seeks the Irony - 25 Person Boat</h3>
          <p itemProp="description">
            Ideal for department team building. Spacious deck areas for activities, comfortable seating, 
            and perfect size for interactive team challenges and group bonding exercises.
          </p>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Clever Girl - 50 Person Boat</h3>
          <p itemProp="description">
            Our flagship vessel for large corporate team building events. Multiple deck levels, 
            presentation areas, and ample space for team activities, competitions, and company-wide gatherings.
          </p>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Corporate Team Building Events",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "image": "https://premierpartycruises.com/logo.png",
            "@id": "https://premierpartycruises.com",
            "url": "https://premierpartycruises.com",
            "telephone": "(512) 488-5892",
            "priceRange": "$200-$400 per hour",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Lake Travis",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "postalCode": "78734",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 30.3894,
              "longitude": -97.9322
            },
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "09:00",
              "closes": "21:00"
            }],
            "sameAs": [
              "https://www.facebook.com/premierpartycruises",
              "https://www.instagram.com/premierpartycruises"
            ]
          },
          "areaServed": {
            "@type": "City",
            "name": "Austin",
            "sameAs": "https://en.wikipedia.org/wiki/Austin,_Texas"
          },
          "description": "Professional team building experiences on Lake Travis in Austin, Texas. Customizable corporate events with activities, facilitators, and premium boat rentals for teams of 14-75 people.",
          "offers": [
            {
              "@type": "Offer",
              "name": "14 Guest Team Building Package",
              "price": "200",
              "priceCurrency": "USD",
              "description": "Small team retreats and executive groups up to 14 people"
            },
            {
              "@type": "Offer",
              "name": "15-25 Guest Team Building Package",
              "price": "250",
              "priceCurrency": "USD",
              "description": "Department team building for 15-25 people"
            },
            {
              "@type": "Offer",
              "name": "26-30 Guest Team Building Package",
              "price": "300",
              "priceCurrency": "USD",
              "description": "Mid-size team events for 26-30 people"
            },
            {
              "@type": "Offer",
              "name": "31-50 Guest Team Building Package",
              "price": "350",
              "priceCurrency": "USD",
              "description": "Company-wide team building for 31-50 people"
            },
            {
              "@type": "Offer",
              "name": "51-75 Guest Team Building Package",
              "price": "400",
              "priceCurrency": "USD",
              "description": "Large corporate events for 51-75 people"
            }
          ]
        })
      }} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })
      }} />

      {/* Related Links */}
      <RelatedLinks 
        blogLinks={[
          { title: 'Effective Corporate Team Building', href: '/blogs/corporate-team-building-lake-travis' },
          { title: 'Planning a Team Retreat', href: '/blogs/planning-team-retreat-austin' },
          { title: 'Team Building Activity Ideas', href: '/blogs/team-building-activities-lake-travis' }
        ]}
      />

      
      {/* JSON-LD Structured Data - Service Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "https://premierpartycruises.com/team-building/#service",
                    "name": "Private Cruise — Team Building & Offsites",
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
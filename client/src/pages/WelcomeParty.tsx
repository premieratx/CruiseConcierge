import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
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
  PartyPopper, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Music, Utensils,
  Star, Shield, Gift, MessageSquare, Wine, GlassWater,
  Mic, Crown, Award, Quote, ChevronRight, Ship,
  Anchor, Sun, Info, TrendingUp, Plane, Heart, Smile, X
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/meeseeks-25-person-boat.jpg';
import heroImage3 from '@assets/atx-disco-cruise-party.jpg';
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

// Welcome Party packages
const welcomePackages = [
  {
    id: 'standard',
    name: 'Standard 4-Hour Cruise',
    basePrice: 200,
    description: 'Welcome your guests in style - First impression celebration',
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
    icon: Smile,
    badge: 'Great Start'
  },
  {
    id: 'essentials',
    name: 'Cruise w/Essentials Package',
    basePrice: 225,
    addOnPrice: 100,
    description: 'Welcome party with complete convenience',
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
    description: 'Ultimate welcome reception with entertainment and party supplies',
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
    badge: 'All-Inclusive'
  }
];

// What's included
const whatsIncluded = [
  {
    icon: Plane,
    title: 'Guest Welcome',
    description: 'Perfect for welcoming out-of-town wedding guests'
  },
  {
    icon: Utensils,
    title: 'Texas Cuisine',
    description: 'Authentic BBQ or Fajita bar options'
  },
  {
    icon: Music,
    title: 'Live Entertainment',
    description: 'Options for acoustic or full band performances'
  },
  {
    icon: Wine,
    title: 'Bar Service',
    description: 'Full bar setup with local craft options'
  },
  {
    icon: PartyPopper,
    title: 'Festive Atmosphere',
    description: 'Casual mingling space for guests to connect'
  },
  {
    icon: Gift,
    title: 'Welcome Amenities',
    description: 'Welcome bags and local treats available'
  },
  {
    icon: Sun,
    title: 'Flexible Timing',
    description: 'Afternoon or evening cruise options'
  },
  {
    icon: Shield,
    title: 'Full Service',
    description: 'Professional crew handles everything'
  },
  {
    icon: Heart,
    title: 'Wedding Focus',
    description: 'Customized to match your wedding theme'
  }
];

// FAQs
const faqItems = [
  {
    id: 'timing',
    question: 'When should we schedule the welcome party cruise?',
    answer: 'Most couples schedule their welcome party the day before the wedding, either as an afternoon or early evening cruise. This gives out-of-town guests a chance to meet everyone before the big day while keeping the schedule relaxed.'
  },
  {
    id: 'food',
    question: 'What food options work best for welcome parties?',
    answer: 'Texas BBQ and Fajita bars are our most popular choices - they\'re casual, delicious, and give guests a true Austin experience. We can also arrange lighter appetizers or full dinner service based on your preferences.'
  },
  {
    id: 'music',
    question: 'What entertainment options do you recommend?',
    answer: 'For welcome parties, we recommend either acoustic musicians for a relaxed vibe or a small band for more energy. The music creates atmosphere while still allowing guests to mingle and chat comfortably.'
  },
  {
    id: 'transportation',
    question: 'How do guests get to the boat?',
    answer: 'We have ample parking at the marina, and many couples arrange shuttle buses from hotels. This makes it easy for out-of-town guests and creates a fun group arrival experience.'
  },
  {
    id: 'weather',
    question: 'What if the weather doesn\'t cooperate?',
    answer: 'Our boats have covered areas for sun or light rain protection. For severe weather, we can reschedule or arrange an alternative waterfront venue. We monitor conditions closely and communicate any concerns early.'
  },
  {
    id: 'customization',
    question: 'Can we customize the party to match our wedding theme?',
    answer: 'Absolutely! We love helping couples create cohesive wedding weekends. From decorations to menu choices, we\'ll work with you to ensure the welcome party perfectly complements your wedding style.'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Emily & James Wilson',
    role: 'Married May 2024',
    rating: 5,
    text: 'Our welcome party cruise was the perfect way to kick off our wedding weekend! Our guests from across the country got to experience Lake Travis and Austin hospitality. The BBQ was incredible and the sunset was magical.',
    image: '/testimonials/emily-james.jpg'
  },
  {
    id: 2,
    name: 'Robert Martinez',
    role: 'Father of the Groom',
    rating: 5,
    text: 'As hosts of the welcome party, we wanted something special. The crew made everything effortless, the live music was perfect, and watching our families come together on the lake was priceless.',
    image: '/testimonials/robert.jpg'
  },
  {
    id: 3,
    name: 'Lauren & Chris Thompson',
    role: 'Married August 2024',
    rating: 5,
    text: 'Having 60+ guests from different states, the welcome cruise was brilliant! Everyone relaxed, the Texas BBQ was a hit, and it set the perfect tone for our wedding weekend. Highly recommend!',
    image: '/testimonials/lauren-chris.jpg'
  }
];

export default function WelcomeParty() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=welcome-party');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=welcome-party&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/welcome-party"
        defaultTitle="Wedding Welcome Party Cruises | Lake Travis | Premier Party Cruises"
        defaultDescription="Welcome your out-of-town wedding guests with a memorable Lake Travis cruise. Texas BBQ, live music, and Austin hospitality. Perfect start to your wedding weekend."
        defaultKeywords={[
          'wedding welcome party cruise',
          'lake travis welcome reception',
          'wedding weekend cruise austin',
          'out of town guest welcome',
          'austin wedding cruise'
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
                alt="Welcome Party Cruise" 
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
                <Plane className="mr-2 h-5 w-5" />
                Welcome Your Wedding Guests in Style
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Welcome Party
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                Cruises
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Kick off your wedding weekend with an unforgettable Lake Travis cruise. 
              Perfect for bringing families together with Texas hospitality.
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
                Plan Your Welcome Party
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
                <div className="text-3xl font-bold text-brand-yellow">400+</div>
                <div className="text-sm text-white/80">Welcome Parties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">25-75</div>
                <div className="text-sm text-white/80">Guest Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">5.0★</div>
                <div className="text-sm text-white/80">Guest Rating</div>
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
              Welcome Party Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package to welcome your wedding guests. 
              All packages include Texas hospitality and Lake Travis views.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {welcomePackages.map((pkg, index) => (
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
              The Perfect Wedding Weekend Start
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to welcome your guests in true Austin style
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
              Welcome Party Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what couples say about their welcome party cruises
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
              Welcome Party Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about hosting your welcome party cruise
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
        partyType="Wedding Welcome Party"
        eventType="welcome party"
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
              Ready to Welcome Your Guests?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Start your wedding weekend with an unforgettable Lake Travis welcome party. 
              Let us help you create the perfect first impression.
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
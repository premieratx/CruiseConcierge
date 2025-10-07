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
import SEOHead, { generateComprehensiveLocalBusinessSchema, generateFAQSchema } from '@/components/SEOHead';
import { 
  Briefcase, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Wine, Shield,
  Star, MessageSquare, Award, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, Utensils,
  Building, Handshake, Crown, Diamond, GlassWater, X, Trophy
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/clever-girl-50-person-boat.jpg';
import heroImage2 from '@assets/atx-disco-cruise-party.jpg';
import heroImage3 from '@assets/dancing-party-scene.jpg';
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

// Client Entertainment packages
const clientPackages = [
  {
    id: 'standard',
    name: 'Standard 4-Hour Cruise',
    basePrice: 200,
    description: 'Impress and entertain in style - Close deals on the water',
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
    icon: Briefcase,
    badge: 'Excellent Value'
  },
  {
    id: 'essentials',
    name: 'Cruise w/Essentials Package',
    basePrice: 225,
    addOnPrice: 100,
    description: 'Client entertainment with complete convenience',
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
    description: 'Ultimate VIP client experience with entertainment and party supplies',
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
    icon: Diamond,
    badge: 'Ultra Luxury'
  }
];

// What's included
const whatsIncluded = [
  {
    icon: Wine,
    title: 'Premium Bar Service',
    description: 'Top-shelf spirits and fine wines to impress'
  },
  {
    icon: Utensils,
    title: 'Gourmet Catering',
    description: 'Elevated cuisine from Austin\'s best caterers'
  },
  {
    icon: Handshake,
    title: 'Networking Layout',
    description: 'Designed for comfortable business conversations'
  },
  {
    icon: Sun,
    title: 'Scenic Routes',
    description: 'Showcase Austin\'s beauty to your clients'
  },
  {
    icon: Building,
    title: 'Company Branding',
    description: 'Custom signage and branded elements'
  },
  {
    icon: Shield,
    title: 'White-Glove Service',
    description: 'Professional staff focused on excellence'
  },
  {
    icon: Award,
    title: 'VIP Treatment',
    description: 'Make your clients feel valued and special'
  },
  {
    icon: GlassWater,
    title: 'Full Amenities',
    description: 'Everything needed for comfort and luxury'
  },
  {
    icon: Star,
    title: 'Memorable Experience',
    description: 'Create lasting positive impressions'
  }
];

// FAQs
const faqItems = [
  {
    id: 'impression',
    question: 'How does a cruise help with client relationships?',
    answer: 'A Lake Travis cruise provides a unique, memorable experience that sets you apart from typical dinners or golf outings. The relaxed atmosphere facilitates better conversations, the scenery impresses, and clients appreciate the special effort, strengthening business relationships.'
  },
  {
    id: 'catering',
    question: 'What catering options work best for client entertainment?',
    answer: 'We recommend gourmet appetizer stations for mingling or seated dinners for formal occasions. Popular choices include surf & turf, sushi stations, or Austin BBQ with an upscale twist. All dietary restrictions can be accommodated.'
  },
  {
    id: 'bar',
    question: 'What bar service is included?',
    answer: 'Our Premium and Platinum packages include full bar setup with professional bartenders. We offer premium spirits, fine wines, craft beers, and signature cocktails. Non-alcoholic options are always available for all guests.'
  },
  {
    id: 'timing',
    question: 'What\'s the best time for client entertainment cruises?',
    answer: 'Sunset cruises (5-8 PM) are most popular, offering beautiful views and transitioning from day to evening. Lunch cruises (11 AM-2 PM) work well for business hours, while evening cruises create a special event atmosphere.'
  },
  {
    id: 'privacy',
    question: 'Will we have privacy for business discussions?',
    answer: 'Absolutely. All client entertainment cruises are private charters. You have the entire boat to yourselves with discrete, professional crew. The layout includes quiet areas perfect for confidential conversations.'
  },
  {
    id: 'customization',
    question: 'Can we customize the experience for our industry?',
    answer: 'Yes! We regularly customize experiences for tech companies, law firms, financial services, and more. From menu selections to entertainment choices, we\'ll tailor everything to match your company culture and client expectations.'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Richard Anderson',
    role: 'Partner, Law Firm',
    rating: 5,
    text: 'We\'ve entertained our top clients on Premier Party Cruises three times now. The professional service, attention to detail, and stunning Lake Travis views never fail to impress. It\'s become our go-to for important client events.',
    image: '/testimonials/richard.jpg'
  },
  {
    id: 2,
    name: 'Lisa Martinez',
    role: 'VP Sales, Tech Company',
    rating: 5,
    text: 'Closed our biggest deal of the year after a client cruise. The relaxed atmosphere and VIP treatment showed our clients how much we value the relationship. Worth every penny for the ROI.',
    image: '/testimonials/lisa.jpg'
  },
  {
    id: 3,
    name: 'James Chen',
    role: 'CEO, Financial Services',
    rating: 5,
    text: 'The Platinum package exceeded expectations. Our international clients were blown away by the experience. The crew was discreet and professional, the food was exceptional, and the setting was perfect.',
    image: '/testimonials/james.jpg'
  }
];

export default function ClientEntertainment() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=client-entertainment');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=client-entertainment&action=book');
  };

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/client-entertainment"
        defaultTitle="Client Entertainment Cruises | Corporate Events | Lake Travis"
        defaultDescription="Luxury Lake Travis client entertainment cruises. Gourmet dining, premium bar service & unforgettable experiences that impress."
        defaultKeywords={[
          'client entertainment austin',
          'corporate client cruise',
          'business entertainment lake travis',
          'client appreciation events',
          'luxury corporate cruise austin'
        ]}
        customSchema={[
          generateComprehensiveLocalBusinessSchema({
            pageDescription: "Premier client entertainment and corporate event cruises on Lake Travis, Austin. Luxury boat charters with gourmet dining and premium service to impress your most important clients. 14+ years experience.",
            additionalServices: [
              {
                name: "Client Entertainment Cruises",
                description: "Luxury Lake Travis cruises designed to impress and entertain your most important clients"
              },
              {
                name: "Corporate Event Boat Rentals",
                description: "Professional corporate team building and client entertainment on premium Lake Travis boats"
              },
              {
                name: "Business Entertainment Services",
                description: "Complete corporate entertainment packages with gourmet dining and premium bar service"
              },
              {
                name: "Client Appreciation Events",
                description: "Exclusive client appreciation events on Lake Travis - elevate your business relationships"
              }
            ]
          }),
          faqSchema
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
                alt="Client Entertainment Party Boat Austin cruise on Lake Travis" 
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
                <Diamond className="mr-2 h-5 w-5" />
                Impress Your Most Important Clients
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Client Entertainment
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                Cruises
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Create unforgettable experiences that strengthen relationships and 
              close deals on Austin's beautiful Lake Travis.
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
                Plan Client Event
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
                <div className="text-3xl font-bold text-brand-yellow">300+</div>
                <div className="text-sm text-white/80">Corporate Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">Fortune 500</div>
                <div className="text-sm text-white/80">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">5.0★</div>
                <div className="text-sm text-white/80">Client Rating</div>
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
              Client Entertainment Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect level of luxury for your client events. 
              All packages include professional service and stunning lake views.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {clientPackages.map((pkg, index) => (
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
              Creating Exceptional Client Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Every detail designed to impress and build relationships
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
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See how companies strengthen client relationships on the water
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
              Client Entertainment FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about hosting clients on Lake Travis
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
        partyType="Client Entertainment Event"
        eventType="client entertainment event"
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
              Elevate Your Client Relationships
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Create memorable experiences that strengthen partnerships and drive business success. 
              Let us help you impress your most important clients.
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
              <Link href="/team-building">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-brand-blue">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Team Building</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Build stronger teams on Lake Travis
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Team Building
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
                      Celebrate business milestones
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
                      Corporate event planning resources
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

      {/* Related Services Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
              MORE AUSTIN PARTY BOAT SERVICES
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our other Lake Travis cruise experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/party-boat-lake-travis" data-testid="link-party-boat-from-client">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-green-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Lake Travis Party Boats</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Premier Austin party boats for celebrations on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/private-cruises" data-testid="link-private-from-client">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-green-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Private Austin Charters</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Exclusive private boat rentals on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/bachelor-party-austin" data-testid="link-bachelor-from-client">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-green-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelor Party Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Epic bachelor party cruises on Lake Travis</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-from-client">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-green-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Bachelorette Party Austin</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Premier bachelorette cruises - Our specialty since 2009</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery" data-testid="link-gallery-from-client">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-green-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Photo Gallery</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">See our Lake Travis corporate event photos</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" data-testid="link-contact-from-client">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-green-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">Get your corporate event quote today</p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/" data-testid="link-home-from-client">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-green-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">All Services</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">View all our party cruise options</p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Hidden Content for Search Engines */}
      <div className="sr-only" itemScope itemType="https://schema.org/Service">
        <h1 itemProp="name">Client Entertainment Corporate Events Austin Lake Travis</h1>
        <p itemProp="description">
          Premier Party Cruises specializes in client entertainment on Lake Travis in Austin, Texas. 
          Impress your most important clients with unforgettable experiences on the water. Our luxury 
          boat cruises provide the perfect setting for relationship building, deal closing, and client 
          appreciation. Professional white-glove service, gourmet catering, and stunning Lake Travis 
          views create lasting positive impressions that strengthen business partnerships.
        </p>
        
        <h2>Client Entertainment Services Austin</h2>
        <p>
          VIP client entertainment experiences on Lake Travis including gourmet catering, premium bar service, 
          professional networking layouts, scenic routes showcasing Austin's beauty, company branding options, 
          and white-glove service. Create memorable experiences that set you apart from competitors and 
          strengthen client relationships through unique Lake Travis boat experiences.
        </p>
        
        <h2>Private Cruise Pricing for Corporate Groups</h2>
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">14 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$200</span> per hour for groups up to 14 people</p>
          <p itemProp="description">Intimate VIP client experiences and executive entertaining</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">15-25 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$250</span> per hour for groups of 15-25 people</p>
          <p itemProp="description">Perfect for client appreciation events and networking</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">26-30 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$300</span> per hour for groups of 26-30 people</p>
          <p itemProp="description">Great for client mixers and business development</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">31-50 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$350</span> per hour for groups of 31-50 people</p>
          <p itemProp="description">Ideal for major client events and industry networking</p>
        </div>
        
        <div itemScope itemType="https://schema.org/Offer">
          <h3 itemProp="name">51-75 Guest Client Entertainment Package</h3>
          <meta itemProp="priceCurrency" content="USD" />
          <p>Starting at <span itemProp="price">$400</span> per hour for groups of 51-75 people</p>
          <p itemProp="description">Perfect for large client appreciation events</p>
        </div>
        
        <h2>Client Entertainment Features</h2>
        <ul>
          <li>Premium bar service with top-shelf spirits and fine wines</li>
          <li>Gourmet catering from Austin's best caterers</li>
          <li>Professional networking layout designed for business conversations</li>
          <li>Scenic routes showcasing Lake Travis and Austin beauty</li>
          <li>Custom company branding and signage options</li>
          <li>White-glove service from professional staff</li>
          <li>VIP treatment to impress your most important clients</li>
          <li>Full amenities for comfort and luxury</li>
          <li>Customizable presentations and announcements</li>
          <li>Experienced captain and professional crew</li>
        </ul>
        
        <h2>Keywords: Client Entertainment Austin, Corporate Events Lake Travis, Business Boat Cruise</h2>
        <p>
          client entertainment Austin, corporate client events Lake Travis, client entertainment boat cruise, 
          business entertainment Austin, client appreciation Lake Travis, corporate hospitality Austin Texas, 
          VIP client events boat Austin, business development Lake Travis, corporate party boat Austin, 
          client networking cruise Austin, Lake Travis corporate entertainment, Austin client events boat, 
          business relationship building Austin, client appreciation cruise Austin, corporate boat rental Austin
        </p>
        
        <h2>Fleet Options for Client Entertainment</h2>
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Day Tripper - 14 Person Boat</h3>
          <p itemProp="description">
            Perfect for VIP client entertainment and executive hosting. Intimate luxury setting with premium 
            amenities, ideal for confidential business discussions and high-level relationship building.
          </p>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Me Seeks the Irony - 25 Person Boat</h3>
          <p itemProp="description">
            Ideal for client appreciation events. Spacious layout for networking, comfortable seating for 
            conversations, and perfect size for intimate yet impressive business entertainment.
          </p>
        </div>
        
        <div itemScope itemType="https://schema.org/Product">
          <h3 itemProp="name">Clever Girl - 50 Person Boat</h3>
          <p itemProp="description">
            Our flagship vessel for major client events. Multiple deck levels for mingling, presentation 
            areas for announcements, and luxury amenities that demonstrate your commitment to excellence.
          </p>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Corporate Client Entertainment Events",
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
          "description": "VIP client entertainment experiences on Lake Travis in Austin, Texas. Luxury boat cruises with gourmet catering, premium service, and white-glove hospitality for groups of 14-75 people.",
          "offers": [
            {
              "@type": "Offer",
              "name": "14 Guest Client Entertainment Package",
              "price": "200",
              "priceCurrency": "USD",
              "description": "VIP client experiences and executive entertaining up to 14 people"
            },
            {
              "@type": "Offer",
              "name": "15-25 Guest Client Entertainment Package",
              "price": "250",
              "priceCurrency": "USD",
              "description": "Client appreciation and networking for 15-25 people"
            },
            {
              "@type": "Offer",
              "name": "26-30 Guest Client Entertainment Package",
              "price": "300",
              "priceCurrency": "USD",
              "description": "Client mixers and business development for 26-30 people"
            },
            {
              "@type": "Offer",
              "name": "31-50 Guest Client Entertainment Package",
              "price": "350",
              "priceCurrency": "USD",
              "description": "Major client events and industry networking for 31-50 people"
            },
            {
              "@type": "Offer",
              "name": "51-75 Guest Client Entertainment Package",
              "price": "400",
              "priceCurrency": "USD",
              "description": "Large client appreciation events for 51-75 people"
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

      <Footer />
    </div>
  );
}
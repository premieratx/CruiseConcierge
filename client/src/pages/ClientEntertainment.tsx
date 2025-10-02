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
import SEOHead from '@/components/SEOHead';
import { 
  Briefcase, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Wine, Shield,
  Star, MessageSquare, Award, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, Utensils,
  Building, Handshake, Crown, Diamond, GlassWater
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
    id: 'professional',
    name: 'Professional Package',
    basePrice: 525,
    description: 'Impressive client entertainment essentials',
    features: [
      'Premium pontoon boat (25-30 guests)',
      'Professional captain and crew',
      '3-4 hour scenic cruise',
      'Gourmet appetizer stations',
      'Premium bar setup area',
      'Background music system',
      'Networking-friendly layout',
      'Sunset timing available'
    ],
    popular: false,
    icon: Briefcase,
    badge: 'Excellent Value'
  },
  {
    id: 'premium',
    name: 'Premium Package',
    basePrice: 675,
    addOnPrice: 100,
    description: 'Enhanced experience for important clients',
    features: [
      'Everything in Professional Package',
      'Upgraded luxury yacht (50 guests)',
      'Gourmet catering menu',
      'Premium open bar service',
      'Professional wait staff',
      'Live acoustic entertainment',
      'VIP seating areas',
      'Custom company branding'
    ],
    popular: true,
    icon: Crown,
    badge: 'Most Popular'
  },
  {
    id: 'platinum',
    name: 'Platinum Package',
    basePrice: 875,
    addOnPrice: 175,
    description: 'Ultimate VIP client experience',
    features: [
      'Everything in Premium Package',
      'Mega yacht (75 guests)',
      'Five-star dining experience',
      'Top-shelf open bar',
      'Live band or DJ',
      'Professional photographer',
      'Concierge service',
      'Gift bags for clients',
      'Priority docking and service'
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

  const handleGetQuote = () => {
    navigate('/chat?eventType=client-entertainment');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=client-entertainment&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/client-entertainment"
        defaultTitle="Client Entertainment Cruises | Corporate Events | Lake Travis"
        defaultDescription="Impress your most important clients with luxury Lake Travis cruises. Gourmet dining, premium bar service, and unforgettable experiences. Elevate your client relationships."
        defaultKeywords={[
          'client entertainment austin',
          'corporate client cruise',
          'business entertainment lake travis',
          'client appreciation events',
          'luxury corporate cruise austin'
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
                alt="Client Entertainment Cruise" 
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
    </div>
  );
}
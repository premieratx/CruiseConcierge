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
import { HOURLY_RATES, PRICING_DEFAULTS } from '@shared/constants';
import SEOHead from '@/components/SEOHead';
import { 
  Trophy, Users, Calendar, MapPin, Clock, Phone,
  ArrowRight, CheckCircle, Sparkles, Award, Shield,
  Star, MessageSquare, Crown, Quote, ChevronRight,
  Ship, Anchor, Sun, Info, TrendingUp, PartyPopper,
  Building, Mic, GlassWater, Gift, Camera, Rocket, X, Briefcase
} from 'lucide-react';

// Hero and gallery images
import heroImage1 from '@assets/bachelor-party-group-guys.jpg';
import heroImage2 from '@assets/atx-disco-cruise-party.jpg';
import heroImage3 from '@assets/giant-unicorn-float.jpg';
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

const float = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Company Milestone packages
const milestonePackages = [
  {
    id: 'standard',
    name: 'Standard 4-Hour Cruise',
    basePrice: 200,
    description: 'Celebrate achievements together - Recognition and appreciation',
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
    icon: Award,
    badge: 'Perfect Start'
  },
  {
    id: 'essentials',
    name: 'Cruise w/Essentials Package',
    basePrice: 225,
    addOnPrice: 100,
    description: 'Milestone celebration with complete convenience',
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
    description: 'Ultimate celebration with entertainment and party supplies',
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
    icon: Trophy,
    title: 'Achievement Focus',
    description: 'Celebrate your company\'s important milestones'
  },
  {
    icon: Mic,
    title: 'Speech Platform',
    description: 'Perfect setup for executive addresses'
  },
  {
    icon: Camera,
    title: 'Memory Capture',
    description: 'Professional documentation of your celebration'
  },
  {
    icon: Building,
    title: 'Company Branding',
    description: 'Custom branding throughout the experience'
  },
  {
    icon: PartyPopper,
    title: 'Celebration Setup',
    description: 'Decorations and atmosphere for success'
  },
  {
    icon: Award,
    title: 'Awards Ceremony',
    description: 'Professional setup for recognitions'
  },
  {
    icon: Gift,
    title: 'Commemorative Items',
    description: 'Options for lasting mementos'
  },
  {
    icon: Shield,
    title: 'Full Service',
    description: 'Professional crew handles everything'
  },
  {
    icon: Star,
    title: 'VIP Treatment',
    description: 'Make your team feel valued and special'
  }
];

// FAQs
const faqItems = [
  {
    id: 'occasions',
    question: 'What types of milestones do companies celebrate?',
    answer: 'Common celebrations include IPOs, major funding rounds, company anniversaries (5, 10, 25 years), achieving revenue goals, successful product launches, mergers and acquisitions, awards and recognitions, and major contract wins.'
  },
  {
    id: 'customization',
    question: 'How can we customize the celebration to our achievement?',
    answer: 'We\'ll work with you to create a themed experience. This includes custom signage, specific decorations, branded materials, tailored menu selections, and even coordinating with your marketing team for photo/video content that aligns with your announcement strategy.'
  },
  {
    id: 'awards',
    question: 'Can we hold an awards ceremony on the boat?',
    answer: 'Absolutely! We have dedicated spaces perfect for presentations, with PA systems for speeches and awards. Many companies use the sunset as a backdrop for award photos, creating memorable moments for recipients.'
  },
  {
    id: 'timing',
    question: 'When should we schedule our milestone celebration?',
    answer: 'Most companies celebrate within 2-4 weeks of the achievement while excitement is high. Afternoon cruises work well for all-hands celebrations, while evening cruises create a more formal atmosphere for executive teams.'
  },
  {
    id: 'media',
    question: 'Can we use photos/videos for company marketing?',
    answer: 'Yes! With our professional photography/videography packages, you\'ll receive high-quality content perfect for social media, press releases, and internal communications. We can coordinate with your marketing team on specific shots needed.'
  },
  {
    id: 'size',
    question: 'What if our entire company won\'t fit on one boat?',
    answer: 'For larger companies, we can arrange multiple boats departing together, or schedule department rotations throughout the day. Some companies also choose to celebrate with their core team or top performers as a special recognition.'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Michael Thompson',
    role: 'CEO, Tech Startup',
    rating: 5,
    text: 'Celebrated our Series B funding on a Premier cruise. The team loved it, investors were impressed, and the photos were perfect for our announcement. Couldn\'t have asked for a better way to mark this milestone.',
    image: '/testimonials/michael.jpg'
  },
  {
    id: 2,
    name: 'Sandra Lee',
    role: 'HR Director, Fortune 500',
    rating: 5,
    text: 'For our 25th anniversary, we wanted something special. The Legacy package delivered beyond expectations. The crew handled our 70-person event flawlessly, and employees still talk about it months later.',
    image: '/testimonials/sandra.jpg'
  },
  {
    id: 3,
    name: 'Robert Kim',
    role: 'COO, Financial Services',
    rating: 5,
    text: 'After closing our biggest deal ever, we celebrated in style. The yacht, service, and atmosphere were perfect for recognizing our team\'s hard work. It showed our employees how much we value their contributions.',
    image: '/testimonials/robert.jpg'
  }
];

export default function CompanyMilestone() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const [selectedPackage, setSelectedPackage] = useState('achievement');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleGetQuote = () => {
    navigate('/chat?eventType=company-milestone');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=company-milestone&action=book');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/company-milestone"
        defaultTitle="Company Milestone Celebrations | Corporate Events | Lake Travis"
        defaultDescription="Celebrate your company's achievements with unforgettable Lake Travis cruises. Perfect for IPOs, anniversaries, and major wins. Make your milestone memorable."
        defaultKeywords={[
          'company milestone celebration',
          'corporate anniversary cruise',
          'IPO celebration austin',
          'company achievement party',
          'corporate milestone event lake travis'
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
                alt="Company Celebration Party Boat Austin milestone event on Lake Travis" 
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
                <Trophy className="mr-2 h-5 w-5" />
                Celebrate Your Success in Style
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading mb-6"
              variants={fadeInUp}
            >
              Company Milestone
              <span className="block text-3xl md:text-5xl mt-2 text-brand-yellow">
                Celebrations
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Mark your company's greatest achievements with an unforgettable 
              celebration on Lake Travis that your team will never forget.
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
                Plan Celebration
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

            {/* Quick Stats with animation */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              <motion.div className="text-center" variants={float}>
                <div className="text-3xl font-bold text-brand-yellow">200+</div>
                <div className="text-sm text-white/80">Milestones Celebrated</div>
              </motion.div>
              <motion.div className="text-center" variants={float}>
                <div className="text-3xl font-bold text-brand-yellow">IPO</div>
                <div className="text-sm text-white/80">Celebrations</div>
              </motion.div>
              <motion.div className="text-center" variants={float}>
                <div className="text-3xl font-bold text-brand-yellow">5.0★</div>
                <div className="text-sm text-white/80">Company Rating</div>
              </motion.div>
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
              Milestone Celebration Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect package to honor your achievement. 
              Every milestone deserves a memorable celebration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {milestonePackages.map((pkg, index) => (
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
              Honoring Your Company's Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything needed to create a memorable milestone celebration
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
              Milestone Memories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Companies share their celebration experiences
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
              Milestone Celebration FAQs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about celebrating company achievements
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
        partyType="Company Milestone"
        eventType="company celebration"
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
              Ready to Celebrate Your Success?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Your company's achievements deserve an extraordinary celebration. 
              Let us help you create an unforgettable milestone event on Lake Travis.
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
                      Team building activities
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
              <Link href="/client-entertainment">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <Briefcase className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Client Entertainment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Client appreciation events
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
                      Corporate party options
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

      <Footer />
    </div>
  );
}
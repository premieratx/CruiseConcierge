import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import PartyPlanningChecklist from '@/components/PartyPlanningChecklist';
import Chat from '@/pages/Chat';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SEOHead from '@/components/SEOHead';
import { formatCurrency } from '@shared/formatters';
import { HOURLY_RATES, PRICING_DEFAULTS } from '@shared/constants';
import { cn } from '@/lib/utils';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { 
  Building, Users, Star, Calendar, Trophy, Shield, Award,
  MessageSquare, Quote, Volume2, Clock, Briefcase,
  Calculator, FileCheck, CreditCard, PersonStanding,
  ChefHat, Wifi, Target, Headphones, Check, Sparkles,
  Waves, Wine, Umbrella, Music, ArrowRight, Camera,
  Gift, Heart, Crown, Anchor, PartyPopper, Presentation,
  TrendingUp, HandshakeIcon, DollarSign, ChevronRight,
  Receipt, Coffee, Award as AwardIcon, Network, UserCheck,
  CheckCircle, X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Hero and gallery images - reuse from other pages
import heroImage1 from '@assets/clever-girl-50-person-boat.jpg';
import heroImage2 from '@assets/meeseeks-25-person-boat.jpg';
import heroImage3 from '@assets/day-tripper-14-person-boat.jpg';
import galleryImage1 from '@assets/party-atmosphere-1.jpg';
import galleryImage2 from '@assets/party-atmosphere-2.jpg';
import galleryImage3 from '@assets/party-atmosphere-3.jpg';
import floatImage from '@assets/giant-unicorn-float.jpg';
import discoImage from '@assets/atx-disco-cruise-party.jpg';

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

// Corporate packages
const corporatePackages = [
  {
    name: 'Standard 4-Hour Cruise',
    icon: Users,
    basePrice: 200,
    description: 'Professional team building on water - Impress clients and boost morale',
    features: [
      'Amazing, experienced captain',
      '2 large empty coolers (bring your own ice & drinks)',
      'Premium Bluetooth speaker system',
      'Clean restroom facilities',
      'Comfortable seating for up to 14 guests',
      'Plenty of sun & shade areas',
      'Vendor coordination for catering'
    ],
    ideal: 'Ideal for: Quarterly meetings, new team formation, remote team gatherings'
  },
  {
    name: 'Cruise w/Essentials Package',
    icon: HandshakeIcon,
    basePrice: 225,
    description: 'Corporate event with complete convenience',
    features: [
      'Everything from Standard Cruise',
      'Insulated 5-gallon dispenser with ice water',
      'Fresh water & solo cups',
      'Coolers pre-stocked with ice',
      '6-ft folding table for food & drinks',
      'Vendor coordination for catering'
    ],
    ideal: 'Ideal for: Client appreciation, deal celebrations, VIP entertainment'
  },
  {
    name: 'Ultimate Party Package',
    icon: Briefcase,
    basePrice: 250,
    description: 'Professional event with entertainment and party supplies',
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
    ideal: 'Ideal for: Board meetings, strategic planning, executive bonding'
  }
];

// Why choose corporate cruises
const whyChooseCorporate = [
  {
    icon: Receipt,
    title: 'Tax Deductible',
    description: 'Business entertainment expenses are tax-deductible. We provide detailed invoices for easy expense reporting.'
  },
  {
    icon: Network,
    title: 'Unique Networking',
    description: 'Break away from boardrooms. Foster genuine connections in a relaxed, memorable setting.'
  },
  {
    icon: TrendingUp,
    title: 'ROI Focused',
    description: 'Boost team morale, strengthen client relationships, and see real returns on your investment.'
  },
  {
    icon: Camera,
    title: 'Professional Documentation',
    description: 'Capture the event with professional photography for company newsletters and social media.'
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Complete liability coverage and Coast Guard certified operations for corporate peace of mind.'
  },
  {
    icon: Award,
    title: '14 Years Experience',
    description: 'Trusted by Austin\'s top companies for over a decade. We know corporate events.'
  }
];

// What's included
const corporateInclusions = [
  {
    icon: Building,
    title: 'Professional Captain',
    description: 'Experienced, licensed, and corporate-event trained'
  },
  {
    icon: Wifi,
    title: 'Premium Sound System',
    description: 'Crystal clear audio for presentations or music'
  },
  {
    icon: ChefHat,
    title: 'Catering Coordination',
    description: 'We work with Austin\'s best corporate caterers'
  },
  {
    icon: Coffee,
    title: 'Refreshment Stations',
    description: 'Coffee, water, and soft drinks available'
  },
  {
    icon: Presentation,
    title: 'Presentation Setup',
    description: 'Microphone and speaker system included'
  },
  {
    icon: UserCheck,
    title: 'Dedicated Crew',
    description: 'Professional service throughout your event'
  }
];

// Corporate testimonials
const corporateTestimonials = [
  {
    id: 1,
    name: 'Jennifer Martinez',
    role: 'HR Director',
    company: 'TechCorp Austin',
    rating: 5,
    text: "Our quarterly team building event was a huge success! The crew was professional, the boat was perfect for our 45-person team, and the experience brought everyone together. Best corporate event we've had in years!",
    avatar: '👔',
    event: 'Team Building'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Sales Director',
    company: 'Global Solutions Inc',
    rating: 5,
    text: "We closed our biggest deal of the year after taking clients out on the yacht. The premium experience and Austin skyline views created the perfect atmosphere. Worth every penny!",
    avatar: '💼',
    event: 'Client Entertainment'
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    role: 'CEO',
    company: 'StartUp Hub',
    rating: 5,
    text: "Our executive retreat on Lake Travis was incredibly productive. Away from office distractions, we accomplished more in 4 hours than we typically do in a week of meetings. Highly recommend!",
    avatar: '🏆',
    event: 'Executive Retreat'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Operations Manager',
    company: 'Austin Logistics',
    rating: 5,
    text: "Perfect for our company anniversary celebration! The crew handled everything professionally, the boat was immaculate, and our employees are still talking about it months later.",
    avatar: '🎯',
    event: 'Company Celebration'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Marketing Director',
    company: 'Creative Agency',
    rating: 5,
    text: "We use Premier Party Cruises for all our client entertainment now. The tax-deductible aspect combined with the memorable experience makes it our go-to for important meetings.",
    avatar: '📈',
    event: 'Client Meetings'
  }
];

// Corporate FAQs
const corporateFAQs = [
  {
    question: 'Are corporate cruise expenses tax-deductible?',
    answer: 'Yes! Business entertainment expenses, including boat charters for corporate events, are typically tax-deductible. We provide detailed invoices with all necessary information for your accounting department. Consult your tax advisor for specific guidance.'
  },
  {
    question: 'Can we have a presentation or meeting on board?',
    answer: 'Absolutely! Our boats are equipped with premium sound systems perfect for presentations. We have microphones available and can accommodate both formal presentations and casual discussions. Many companies find the unique setting enhances creativity and engagement.'
  },
  {
    question: 'What catering options are available?',
    answer: 'We work with Austin\'s top corporate caterers to provide everything from light appetizers to full buffet spreads. Options include breakfast meetings, working lunches, cocktail receptions, and formal dinners. We can accommodate dietary restrictions and preferences.'
  },
  {
    question: 'How do we handle alcohol at a corporate event?',
    answer: 'You have complete control over alcohol service. Options include: BYOB with our coolers and ice, hiring a professional bartender, limiting to beer and wine only, or having an alcohol-free event. We help ensure responsible service for corporate liability.'
  },
  {
    question: 'What\'s the best boat size for our team?',
    answer: 'Day Tripper (14 people): Perfect for executive teams or small departments. Me Seeks (25-30 people): Ideal for medium teams or client groups. Clever Girl (50-75 people): Best for large departments or company-wide events. We help you choose based on your specific needs.'
  },
  {
    question: 'Can we brand the experience with our company logo?',
    answer: 'Yes! We can accommodate custom banners, branded materials, and corporate decorations. Many companies bring branded merchandise, welcome signs, and company flags. We\'ll help coordinate the setup before your guests arrive.'
  },
  {
    question: 'What about transportation to and from the boat?',
    answer: 'We can coordinate with local transportation companies for shuttle services from your office to the marina. This ensures everyone arrives together and eliminates parking concerns. Transportation costs are separate but we handle all coordination.'
  },
  {
    question: 'How far in advance should we book?',
    answer: 'For corporate events, we recommend booking 3-4 weeks in advance, especially for Friday afternoon or weekend events. Weekday events often have more flexibility. End-of-quarter celebrations and holiday parties book up quickly, so plan ahead.'
  }
];

// Gallery images
const galleryImages = [
  { src: heroImage1, alt: 'Corporate Party Boat Austin yacht event on Lake Travis' },
  { src: heroImage2, alt: 'Lake Travis Corporate Events team building cruise' },
  { src: heroImage3, alt: 'Corporate Party Boat Austin executive meeting' },
  { src: galleryImage1, alt: 'Lake Travis Corporate Events celebration' },
  { src: galleryImage2, alt: 'Corporate Party Boat Austin client entertainment cruise' },
  { src: galleryImage3, alt: 'Lake Travis Corporate Events professional networking' },
  { src: floatImage, alt: 'Corporate Party Boat Austin team relaxation on Lake Travis' },
  { src: discoImage, alt: 'Lake Travis Corporate Events company party atmosphere' }
];

export default function CorporateEvents() {
  const [location, navigate] = useLocation();
  const { isEditMode } = useInlineEdit();
  const { toast } = useToast();
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://ppc-quote-builder.lovable.app') {
        return;
      }
      
      if (event.data && event.data.type === 'quote-submitted') {
        navigate('/chat');
        toast({
          title: "Quote Submitted!",
          description: "Redirecting you to view your quote details...",
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate, toast]);

  const handleGetQuote = () => {
    navigate('/chat?eventType=corporate');
  };

  const handleBookNow = () => {
    navigate('/chat?eventType=corporate');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEOHead 
        pageRoute="/corporate-events"
        defaultTitle="Corporate Events | Premier Party Cruises"
        defaultDescription="Lake Travis corporate cruises. Team building, client entertainment, company celebrations. Tax-deductible. Call (512) 488-5892."
        defaultKeywords={[
          'corporate cruise austin',
          'team building lake travis',
          'client entertainment austin',
          'corporate event boat rental',
          'business cruise austin',
          'company party boat',
          'executive retreat lake travis',
          'corporate yacht rental austin'
        ]}
        schemaType="service"
      />
      <PublicNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage1}
            alt="Corporate Party Boat Austin cruise event on Lake Travis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <motion.div
          className="relative z-10 container mx-auto px-6 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Badge className="mb-4 bg-brand-blue text-white px-4 py-2 text-sm font-bold">
            PROFESSIONAL CORPORATE CRUISES
          </Badge>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tight" data-editable data-editable-id="h1-corporate-hero">
            IMPRESS CLIENTS.<br />
            REWARD YOUR TEAM.<br />
            <span className="text-brand-yellow">ELEVATE YOUR BUSINESS.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" data-editable data-editable-id="p-corporate-tagline">
            Tax-deductible business entertainment • Professional service • Unforgettable experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetQuote}
              size="lg"
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-6 sm:px-8 py-6 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              data-testid="button-hero-get-quote"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              GET CORPORATE QUOTE
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate('/chat?eventType=corporate')}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-6 sm:px-8 py-6 text-base sm:text-lg"
              data-testid="button-hero-view-packages"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              VIEW PACKAGES
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              { icon: Building, stat: '500+', label: 'Corporate Events' },
              { icon: Users, stat: '50,000+', label: 'Team Members' },
              { icon: Receipt, stat: '100%', label: 'Tax Deductible' },
              { icon: Star, stat: '5.0', label: 'Business Rating' }
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <item.icon className="h-6 w-6 text-brand-yellow mx-auto mb-2" />
                <div className="text-2xl font-bold">{item.stat}</div>
                <div className="text-sm opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
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
              Get instant pricing for your <Link href="/party-boat-lake-travis" className="text-primary hover:underline">Lake Travis</Link> celebration in minutes
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

      {/* Main Content with Tabs */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg">
              <TabsTrigger value="overview" className="font-semibold text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="packages" className="font-semibold text-xs sm:text-sm">Packages</TabsTrigger>
              <TabsTrigger value="included" className="font-semibold text-xs sm:text-sm">What's Included</TabsTrigger>
              <TabsTrigger value="pricing" className="font-semibold text-xs sm:text-sm">Pricing</TabsTrigger>
              <TabsTrigger value="faqs" className="font-semibold text-xs sm:text-sm">FAQs</TabsTrigger>
              <TabsTrigger value="photos" className="font-semibold text-xs sm:text-sm">Photos</TabsTrigger>
              <TabsTrigger value="testimonials" className="font-semibold text-xs sm:text-sm">Testimonials</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={staggerChildren}
                viewport={{ once: true }}
              >
                <div className="text-center max-w-4xl mx-auto mb-12">
                  <h2 className="text-4xl md:text-5xl font-heading font-black mb-6" data-editable data-editable-id="h2-corporate-overview">
                    AUSTIN'S PREMIER CORPORATE CRUISE EXPERIENCE
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed" data-editable data-editable-id="p-corporate-overview-desc">
                    Take your next corporate event to the water. Whether it's team building, client entertainment, 
                    or celebrating success, our professional cruises deliver unforgettable experiences that strengthen 
                    relationships and drive business results.
                  </p>
                </div>

                {/* Why Choose Corporate Cruises */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {whyChooseCorporate.slice(0, 3).map((item, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="pt-6">
                          <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <item.icon className="h-8 w-8 text-brand-blue" />
                          </div>
                          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Perfect For Section */}
                <div className="bg-brand-blue/5 rounded-2xl p-8">
                  <h3 className="text-3xl font-bold text-center mb-8">Perfect For Every Business Need</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {[
                      'Team Building',
                      'Client Entertainment',
                      'Sales Celebrations',
                      'Quarterly Meetings',
                      'Product Launches',
                      'Executive Retreats',
                      'Holiday Parties',
                      'Milestone Celebrations'
                    ].map((event) => (
                      <Badge
                        key={event}
                        variant="secondary"
                        className="py-3 px-4 text-center justify-center font-semibold"
                      >
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages" className="space-y-12">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">TAILORED CORPORATE PACKAGES</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Choose the perfect package for your business objectives
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {corporatePackages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                          <pkg.icon className="h-6 w-6 text-brand-blue" />
                        </div>
                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                        <CardDescription className="text-base">{pkg.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-6">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          {pkg.ideal}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-8">Every Corporate Package Includes</h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {[
                    'Professional Coast Guard certified captain',
                    'Tax-deductible invoice documentation',
                    'Flexible scheduling options',
                    'Customizable itinerary',
                    'Corporate liability insurance',
                    'Dedicated event coordinator'
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center">
                      <Award className="h-5 w-5 text-brand-yellow mr-3 flex-shrink-0" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* What's Included Tab */}
            <TabsContent value="included" className="space-y-12">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">PROFESSIONAL AMENITIES INCLUDED</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Everything you need for a successful corporate event
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {corporateInclusions.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-8 w-8 text-brand-blue" />
                      </div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Add-On Services */}
              <div className="bg-brand-yellow/10 border-2 border-brand-yellow rounded-2xl p-8 mt-12">
                <h3 className="text-2xl font-bold text-center mb-8">Premium Add-On Services</h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {[
                    'Professional bartender service',
                    'Full catering packages',
                    'Corporate photography/videography',
                    'Custom branded decorations',
                    'Transportation coordination',
                    'Live music or DJ services'
                  ].map((addon) => (
                    <div key={addon} className="flex items-center">
                      <Sparkles className="h-5 w-5 text-brand-yellow mr-3" />
                      <span className="font-semibold">{addon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-12">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">CORPORATE PRICING</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Transparent pricing for your budget planning. All expenses are tax-deductible.
                </p>
              </div>

              {/* Pricing Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                  <thead>
                    <tr className="bg-brand-blue text-white">
                      <th className="p-4 text-left font-bold">Boat Capacity</th>
                      <th className="p-4 text-center font-bold">Mon-Thu</th>
                      <th className="p-4 text-center font-bold">Friday</th>
                      <th className="p-4 text-center font-bold">Sat-Sun</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4">
                        <div>
                          <span className="font-semibold">14 Person (Day Tripper)</span>
                          <br />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Executive teams</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{formatCurrency(HOURLY_RATES.MON_THU[14])}/hour</td>
                      <td className="p-4 text-center">{formatCurrency(HOURLY_RATES.FRIDAY[14])}/hour</td>
                      <td className="p-4 text-center">{formatCurrency(HOURLY_RATES.SAT_SUN[14])}/hour</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4">
                        <div>
                          <span className="font-semibold">25-30 Person (Me Seeks)</span>
                          <br />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Departments & teams</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{formatCurrency(HOURLY_RATES.MON_THU[25])}/hour</td>
                      <td className="p-4 text-center">{formatCurrency(HOURLY_RATES.FRIDAY[25])}/hour</td>
                      <td className="p-4 text-center">{formatCurrency(HOURLY_RATES.SAT_SUN[25])}/hour</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4">
                        <div>
                          <span className="font-semibold">50-75 Person (Clever Girl)</span>
                          <br />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Company-wide events</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{formatCurrency(HOURLY_RATES.MON_THU[50])}/hour</td>
                      <td className="p-4 text-center">{formatCurrency(HOURLY_RATES.FRIDAY[50])}/hour</td>
                      <td className="p-4 text-center">{formatCurrency(HOURLY_RATES.SAT_SUN[50])}/hour</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Corporate Benefits */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardContent className="p-6">
                    <Receipt className="h-8 w-8 text-brand-blue mb-3" />
                    <h4 className="font-bold mb-2">Tax Deductible</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      100% tax-deductible as business entertainment expense<br />
                      Detailed invoices provided for accounting
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <DollarSign className="h-8 w-8 text-brand-blue mb-3" />
                    <h4 className="font-bold mb-2">Volume Discounts</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Book multiple events for annual discounts<br />
                      Special rates for recurring quarterly events
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-brand-blue/10 rounded-lg p-6 text-center">
                <Briefcase className="h-10 w-10 text-brand-blue mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Corporate Account Benefits</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Set up a corporate account for simplified billing, priority booking, and exclusive perks.<br />
                  Contact us for custom packages and annual agreements.
                </p>
              </div>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs" className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">CORPORATE EVENT FAQs</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Everything you need to know for planning your corporate cruise
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {corporateFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md px-6"
                  >
                    <AccordionTrigger className="text-left hover:text-brand-blue transition-colors py-4">
                      <span className="font-semibold text-lg">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">CORPORATE EVENTS GALLERY</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  See why Austin's top companies choose us for their events
                </p>
              </div>

              <Carousel className="max-w-5xl mx-auto">
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {image.alt}
                      </p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-heading font-black mb-6">WHAT BUSINESSES SAY</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Trusted by Austin's leading companies
                </p>
              </div>

              <Carousel className="max-w-4xl mx-auto">
                <CarouselContent>
                  {corporateTestimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id}>
                      <Card className="mx-4">
                        <CardContent className="p-8">
                          <div className="flex items-center mb-4">
                            <div className="text-4xl mr-4">{testimonial.avatar}</div>
                            <div>
                              <h3 className="font-bold text-lg">{testimonial.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {testimonial.role} • {testimonial.company}
                              </p>
                              <div className="flex items-center mt-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <Quote className="h-8 w-8 text-brand-blue/20 mb-3" />
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {testimonial.text}
                          </p>
                          <Badge variant="secondary">
                            Event: {testimonial.event}
                          </Badge>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {corporateTestimonials.slice(0, 4).map((testimonial) => (
                  <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="text-3xl mr-3">{testimonial.avatar}</div>
                        <div className="flex-1">
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role} • {testimonial.company}
                          </p>
                          <div className="flex items-center mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-brand-yellow text-brand-yellow" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Party Planning Checklist */}
      <PartyPlanningChecklist 
        partyType="Corporate Event"
        eventType="corporate event"
      />

      {/* Embedded Chat Component */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Get Your Corporate Quote</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your event and receive a detailed quote with tax-deductible invoice
              </p>
            </div>
            <Chat />
          </div>
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
              Explore our complete range of corporate event options on Lake Travis for team building and client entertainment.
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
                      <Target className="h-8 w-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-center">Team Building</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Interactive team building activities on Lake Travis designed to strengthen collaboration, boost morale, and create lasting connections.
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
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-green-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Briefcase className="h-8 w-8 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Client Entertainment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Impress your top clients with exclusive Lake Travis experiences, premium service, and unforgettable corporate hospitality events.
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Client Events
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
              <Link href="/company-milestone">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-yellow-500">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/10 rounded-full flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                    <CardTitle className="text-2xl text-center">Company Milestone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      Celebrate company achievements, anniversaries, and major milestones with memorable Lake Travis corporate celebration cruises.
                    </p>
                    <Button className="w-full mt-4" variant="outline">
                      Celebrate Milestones
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-40 md:hidden">
        <div className="flex gap-4">
          <Button
            onClick={handleBookNow}
            className="flex-1 bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
            data-testid="button-sticky-book"
          >
            <Calendar className="mr-2 h-4 w-4" />
            BOOK EVENT
          </Button>
          <Button
            onClick={handleGetQuote}
            variant="outline"
            className="flex-1 border-brand-blue text-brand-blue"
            data-testid="button-sticky-quote"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            GET QUOTE
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Package, Phone, Clock, CheckCircle2, 
  Gift, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Utensils, Wine, Sparkles,
  DollarSign, ClipboardCheck, PartyPopper, Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-6_1760080740018.jpg';
import sectionImage1 from '@assets/@capitalcityshots-7_1760080740018.jpg';
import sectionImage2 from '@assets/@capitalcityshots-8_1760080740018.jpg';
import sectionImage3 from '@assets/@capitalcityshots-9_1760080740019.jpg';
import sectionImage4 from '@assets/@capitalcityshots-10_1760080740019.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const allInclusiveBenefits = [
  { 
    icon: Package, 
    title: 'One Simple Package', 
    description: 'Everything bundled together for your all inclusive corporate event Austin experience',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: DollarSign, 
    title: 'Predictable Pricing', 
    description: 'Know your total cost upfront with our turnkey corporate party boat packages',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: ClipboardCheck, 
    title: 'Zero Stress Planning', 
    description: 'We handle all the details for your hassle free company event Austin',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: PartyPopper, 
    title: 'Ready to Party', 
    description: 'Show up and enjoy your party package Lake Travis celebration',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const packageTiers = [
  {
    name: 'Standard Package',
    tagline: 'The Essentials',
    price: 'Starting at $1,200',
    color: 'border-blue-500',
    headerBg: 'bg-blue-500',
    features: [
      'Private boat charter (3 hours)',
      'Professional captain and crew',
      'Premium sound system',
      'BYOB - bring your own beverages',
      'Coolers with ice provided',
      'Giant lily pad float included',
      'Perfect for teams of 14-25'
    ],
    best: 'Budget-conscious teams',
    cta: 'Great starter option for your hassle free company event Austin'
  },
  {
    name: 'Essentials Package',
    tagline: 'Most Popular',
    price: 'Starting at $2,400',
    color: 'border-amber-500',
    headerBg: 'bg-amber-500',
    popular: true,
    features: [
      'Everything in Standard, plus:',
      'Party On Delivery beverage coordination',
      'Pre-stocked coolers on arrival',
      'Catering coordination assistance',
      'Extended 4-hour cruise option',
      'Premium float collection',
      'Dedicated event coordinator',
      'Perfect for teams of 25-50'
    ],
    best: 'Most corporate groups',
    cta: 'Our most popular all inclusive corporate event Austin package'
  },
  {
    name: 'Ultimate Package',
    tagline: 'White Glove Service',
    price: 'Starting at $4,500',
    color: 'border-purple-500',
    headerBg: 'bg-purple-500',
    features: [
      'Everything in Essentials, plus:',
      'Full catering included',
      'Premium beverage package',
      'Professional photographer (2 hours)',
      'Custom decorations and branding',
      'Extended 5-hour cruise',
      'VIP dock-side setup',
      'Post-event photo gallery',
      'Perfect for teams of 50-75'
    ],
    best: 'Executive retreats & major celebrations',
    cta: 'The ultimate turnkey corporate party boat experience'
  }
];

const partyOnDeliveryFeatures = [
  { icon: Wine, title: 'Beverage Selection', description: 'Choose from curated drink packages or customize your own' },
  { icon: Truck, title: 'Dock Delivery', description: 'Beverages delivered and stocked before you arrive' },
  { icon: Sparkles, title: 'Ice & Coolers', description: 'Everything chilled and ready for your party package Lake Travis event' },
  { icon: ClipboardCheck, title: 'Inventory Handled', description: 'No shopping, no hauling, no stress' }
];

const cateringPartners = [
  { name: 'Local BBQ Options', description: 'Austin-style smoked meats and sides' },
  { name: 'Tex-Mex Favorites', description: 'Tacos, fajitas, and fresh guacamole' },
  { name: 'Gourmet Appetizers', description: 'Upscale finger foods for corporate settings' },
  { name: 'Health-Conscious Menus', description: 'Fresh, light options for wellness-focused teams' }
];

const whyAllInclusive = [
  { stat: '0', label: 'Planning Headaches' },
  { stat: '100%', label: 'Cost Transparency' },
  { stat: '1', label: 'Point of Contact' },
  { stat: '5-Star', label: 'Service Rating' }
];

const faqs = [
  {
    question: 'What exactly is included in an all inclusive corporate event Austin package?',
    answer: 'Our all inclusive corporate event Austin packages include private boat charter, professional crew, sound system, and coordination services. Depending on the tier you choose, packages can include beverage coordination through Party On Delivery, catering setup, decorations, and even professional photography. The goal is to handle everything so you can focus on your team.'
  },
  {
    question: 'How does the Party On Delivery beverage service work?',
    answer: 'Party On Delivery is our beverage coordination partner. They help you select drinks, handle all purchasing, and deliver everything to the dock before your cruise. When you arrive for your party package Lake Travis event, your coolers are already stocked and chilled. No trips to the store, no hauling heavy cases.'
  },
  {
    question: 'Can we customize the catering for dietary restrictions?',
    answer: 'Absolutely! Our catering partners accommodate vegetarian, vegan, gluten-free, and other dietary needs. When planning your turnkey corporate party boat event, we\'ll discuss your team\'s requirements and ensure everyone has great options to enjoy.'
  },
  {
    question: 'What makes this different from just renting a boat ourselves?',
    answer: 'When you book a hassle free company event Austin with us, you\'re not just getting a boat. You\'re getting a complete event solution. We coordinate beverages, catering, timing, and all logistics. You don\'t need to figure out where to buy ice, how to transport food, or when to arrive for setup. We handle it all.'
  },
  {
    question: 'How far in advance should we book an all-inclusive package?',
    answer: 'For all inclusive corporate event Austin packages, we recommend booking 3-4 weeks ahead, especially for the Ultimate tier. This gives us time to coordinate all vendors and ensure everything is perfect. Popular dates during spring and fall book even faster.'
  },
  {
    question: 'Can we add services to a lower-tier package?',
    answer: 'Yes! Our packages are flexible. If you start with the Standard package but want to add beverage coordination or catering, we can customize. Think of the tiers as starting points for your party package Lake Travis experience.'
  },
  {
    question: 'What happens if weather forces a cancellation?',
    answer: 'Safety is our priority. If weather conditions make the cruise unsafe, we offer full rescheduling or refunds. Your turnkey corporate party boat booking is protected, and our team monitors conditions closely to communicate early if there are concerns.'
  },
  {
    question: 'Do you offer corporate discounts for recurring events?',
    answer: 'Yes! Companies that book multiple events throughout the year receive preferred pricing. Many Austin businesses use us for quarterly team outings, and we reward that loyalty with special rates on hassle free company event Austin packages.'
  }
];

const internalLinks = [
  { href: '/team-building', label: 'Team Building Events', icon: Users },
  { href: '/client-entertainment', label: 'Client Entertainment', icon: Building2 },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/corporate-events', label: 'Corporate Events', icon: Award }
];

export default function AllInclusiveCorporatePackages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>All Inclusive Corporate Event Austin | Party Package Lake Travis | Premier Party Cruises</title>
        <meta name="description" content="Book an all inclusive corporate event Austin with turnkey corporate party boat packages on Lake Travis. Hassle free company event Austin with catering, beverages, and full coordination. Party package Lake Travis made easy." />
        <meta name="keywords" content="all inclusive corporate event Austin, party package Lake Travis, turnkey corporate party boat, hassle free company event Austin, corporate boat rental Austin, team building Lake Travis" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/all-inclusive-corporate-packages-austin" />
        <meta property="og:title" content="All Inclusive Corporate Event Austin | Party in a Box Packages" />
        <meta property="og:description" content="Turnkey corporate party boat experiences on Lake Travis. All inclusive packages with beverages, catering, and full event coordination." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="all-inclusive-corporate-packages-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              ALL-INCLUSIVE PACKAGES
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              The "Party in a Box" – All Inclusive Corporate Event Austin
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Turnkey Corporate Party Boat Packages on Lake Travis
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Your hassle free company event Austin starts here. We handle everything so you can focus on your team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg px-8 py-6" data-testid="button-plan-event">
                  <Package className="mr-2 h-5 w-5" />
                  Plan Your All-Inclusive Event
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages">
                  View All Corporate Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Hero Image with SEO Alt */}
        <section className="relative -mt-8 mb-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={heroImage}
              alt="All inclusive corporate event Austin party package Lake Travis turnkey"
              className="w-full rounded-2xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="benefits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="benefits-title">Why Choose an All Inclusive Corporate Event Austin Package?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our party package Lake Travis options remove all the complexity from corporate event planning
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allInclusiveBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-purple-200" data-testid={`card-benefit-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What is Party in a Box Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="party-in-box-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">THE CONCEPT</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="party-box-title">What is "Party in a Box"?</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Think of it as your turnkey corporate party boat solution. Instead of coordinating multiple vendors, 
                    managing logistics, and stressing over details, you get one comprehensive package that includes everything 
                    your team needs for an unforgettable Lake Travis experience.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Our all inclusive corporate event Austin packages are designed for busy professionals who want to 
                    celebrate with their teams without the planning headaches. From beverages to catering to entertainment, 
                    we coordinate it all so you can show up and enjoy.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Single point of contact for all event details</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Transparent pricing with no hidden fees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Professional coordination from start to finish</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Hassle free company event Austin guarantee</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Turnkey corporate party boat experience Lake Travis all inclusive"
                      className="w-full h-full object-cover"
                      data-testid="img-party-box"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Gift className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="font-bold text-sm">Everything Included</p>
                        <p className="text-xs text-gray-500">One simple package</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-purple-900 text-white" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyAllInclusive.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-amber-400" data-testid={`stat-value-${index}`}>{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Package Tiers Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="packages-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">PACKAGE TIERS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="packages-title">Party Package Lake Travis Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose the level of service that fits your team's needs and budget
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {packageTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-amber-500 text-white font-bold px-4 py-1">MOST POPULAR</Badge>
                    </div>
                  )}
                  <Card className={`h-full border-2 ${tier.color} ${tier.popular ? 'shadow-xl scale-105' : ''}`} data-testid={`card-package-${index}`}>
                    <CardHeader className={`${tier.headerBg} text-white text-center py-6`}>
                      <p className="text-sm font-medium opacity-90">{tier.tagline}</p>
                      <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                      <p className="text-xl font-bold mt-2">{tier.price}</p>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Best for:</p>
                        <p className="font-medium text-sm">{tier.best}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-4">{tier.cta}</p>
                      <Link href="/chat">
                        <Button className="w-full" variant={tier.popular ? 'default' : 'outline'} data-testid={`button-select-package-${index}`}>
                          Select This Package
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Party On Delivery Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-purple-800 to-slate-900 text-white" data-testid="pod-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-amber-400 text-black">BEVERAGE PARTNER</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="pod-title">Party On Delivery Partnership</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    One of the biggest hassles of planning a corporate boat party is coordinating beverages. 
                    Our partnership with Party On Delivery eliminates that stress entirely for your all inclusive corporate event Austin.
                  </p>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    They handle everything from selection to delivery. When you arrive at the dock for your 
                    turnkey corporate party boat experience, your drinks are already chilled and waiting.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {partyOnDeliveryFeatures.map((feature, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4">
                        <feature.icon className="h-6 w-6 text-amber-400 mb-2" />
                        <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                        <p className="text-xs text-white/80">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage2}
                      alt="Party package Lake Travis beverage service hassle free"
                      className="w-full h-full object-cover"
                      data-testid="img-pod"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Catering Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-800 dark:to-gray-900" data-testid="catering-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Hassle free company event Austin catering coordination"
                      className="w-full h-full object-cover"
                      data-testid="img-catering"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-amber-100 text-amber-700">CATERING COORDINATION</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="catering-title">Catering Options for Your Party Package Lake Travis</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Great food makes great events. We've partnered with Austin's best caterers to offer 
                    seamless food coordination for your hassle free company event Austin experience.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {cateringPartners.map((partner, index) => (
                      <Card key={index} className="bg-white/80">
                        <CardContent className="p-4">
                          <Utensils className="h-5 w-5 text-amber-500 mb-2" />
                          <h4 className="font-bold text-sm mb-1">{partner.name}</h4>
                          <p className="text-xs text-gray-500">{partner.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Whether you want casual BBQ or elegant appetizers, we coordinate timing, delivery, 
                    and setup so everything arrives fresh and ready for your turnkey corporate party boat event.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why All-Inclusive Works Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="why-works-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">THE BENEFITS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="why-works-title">Why All-Inclusive Works for Corporate Events</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Corporate event planners choose our all inclusive corporate event Austin packages because 
                    they solve real problems. Here's why the all-inclusive approach makes sense:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        Predictable Budgeting
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Know your total cost upfront. No surprise vendor bills, no last-minute expenses. 
                        Your finance team will appreciate the transparency of our party package Lake Travis pricing.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        Time Savings
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Stop juggling multiple vendors and timelines. One call to us handles everything. 
                        That's what hassle free company event Austin really means.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-purple-500" />
                        Professional Results
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        We do this every week. Our experience means your turnkey corporate party boat event 
                        runs smoothly because we've already solved the problems you haven't thought of yet.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Users className="h-5 w-5 text-amber-500" />
                        Focus on Your Team
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The whole point is team bonding. When you're not worrying about logistics, 
                        you can actually enjoy the event with your colleagues.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="All inclusive corporate event Austin team celebration Lake Travis"
                      className="w-full h-full object-cover"
                      data-testid="img-why-works"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h3 className="text-xl font-bold text-center mb-8">Explore More Corporate Event Options</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid={`link-card-${index}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <link.icon className="h-8 w-8 text-purple-500" />
                      <span className="font-medium">{link.label}</span>
                      <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">Frequently Asked Questions About All-Inclusive Packages</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about our party package Lake Travis experiences
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400" data-testid={`faq-content-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-800 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="cta-title">Ready for Your Hassle Free Company Event Austin?</h2>
              <p className="text-lg text-white/90 mb-8">
                Let us show you how easy planning a turnkey corporate party boat experience can be. 
                Get a custom quote for your all inclusive corporate event Austin today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg px-8 py-6" data-testid="button-get-quote">
                    <Package className="mr-2 h-5 w-5" />
                    Get Your All-Inclusive Quote
                  </Button>
                </Link>
                <a href="tel:5125555555">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-call-now">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        <Footer />
      </div>
    </>
  );
}

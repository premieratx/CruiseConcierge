import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Scale, 
  TrendingUp, Shield, Crown, Lock, Landmark, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-3_1760072938923.jpg';
import sectionImage1 from '@assets/@capitalcityshots-14_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-15_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-16_1760080740020.jpg';
import sectionImage4 from '@assets/@capitalcityshots-17_1760080740020.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const industryBenefits = [
  { 
    icon: Lock, 
    title: 'Privacy & Exclusivity', 
    description: 'Confidential conversations away from the office – perfect for law firm party Austin events',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Handshake, 
    title: 'Client Appreciation', 
    description: 'Impress clients with attorney client entertainment boat experiences they\'ll remember',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: TrendingUp, 
    title: 'Team Building', 
    description: 'Finance team building Lake Travis cruises that strengthen professional bonds',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Crown, 
    title: 'Professional Yet Relaxed', 
    description: 'The ideal balance for a professional corporate event Austin firms deserve',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const eventTypes = [
  {
    title: 'Partner Retreats',
    description: 'Strategic planning in a private setting for law firm party Austin gatherings',
    features: [
      'Private boat charter for partners only',
      'Confidential discussion environment',
      'Sunset cruise timing available',
      'Premium catering coordination'
    ]
  },
  {
    title: 'Client Entertainment',
    description: 'Make lasting impressions with attorney client entertainment boat events',
    features: [
      'VIP treatment for valued clients',
      'Networking-friendly layouts',
      'Custom branding options',
      'Professional crew service'
    ]
  },
  {
    title: 'Attorney & Associate Bonding',
    description: 'Break down barriers with professional corporate event Austin experiences',
    features: [
      'Full firm gatherings welcome',
      'Mentorship opportunities',
      'Cross-department networking',
      'Recognition celebrations'
    ]
  },
  {
    title: 'Finance Team Celebrations',
    description: 'Reward performance with finance team building Lake Travis outings',
    features: [
      'Quarter-end celebrations',
      'Deal closing parties',
      'Trading floor team events',
      'Annual retreat options'
    ]
  }
];

const whyChooseUs = [
  { stat: '100%', label: 'Private Charter Experience' },
  { stat: '14-75', label: 'Guest Capacity Options' },
  { stat: '5-Star', label: 'Google Review Rating' },
  { stat: '10+ Years', label: 'Professional Event Experience' }
];

const faqs = [
  {
    question: 'Is the boat private for our law firm party Austin event?',
    answer: 'Absolutely. Every charter is 100% private – your group only. This is essential for law firm party Austin events where confidentiality matters. You won\'t share the vessel with other groups, allowing for private conversations and a professional corporate event Austin atmosphere.'
  },
  {
    question: 'How does finance team building Lake Travis compare to traditional venues?',
    answer: 'Finance team building Lake Travis cruises offer something traditional conference rooms can\'t – a truly memorable experience. The change of scenery breaks down hierarchical barriers, encourages authentic conversation, and creates the professional corporate event Austin finance teams actually enjoy attending.'
  },
  {
    question: 'What makes this ideal for attorney client entertainment boat events?',
    answer: 'Attorney client entertainment boat experiences combine exclusivity with hospitality. Your clients feel valued in a unique setting, away from crowded restaurants. The private environment is perfect for relationship building, and the scenic backdrop makes for memorable moments at your law firm party Austin event.'
  },
  {
    question: 'Can we host formal discussions during a professional corporate event Austin cruise?',
    answer: 'Yes! Many firms use our cruises for partner meetings, strategic planning, and client presentations. The professional corporate event Austin setting is surprisingly conducive to focused discussion, with the added benefit of a relaxed atmosphere. We can arrange specific seating layouts upon request.'
  },
  {
    question: 'What boat sizes work best for finance team building Lake Travis events?',
    answer: "For finance team building Lake Travis events, we recommend: Day Tripper (14 guests) for executive teams, Meeseeks (25 guests) for department events, Clever Girl (50 guests) for division gatherings, and Clever Girl (50-75 guests, add'l crew fee for 51-75) for full company events."
  },
  {
    question: 'How do we handle catering for a law firm party Austin event?',
    answer: 'All cruises are BYOB-friendly. For law firm party Austin events, many firms bring their own catering from preferred restaurants or we can connect you with local catering partners. We provide coolers, ice, tables, and setup – you focus on your guests.'
  },
  {
    question: 'Is this appropriate for attorney client entertainment boat events with conservative clients?',
    answer: 'Absolutely. Our attorney client entertainment boat experiences are completely customizable. Choose a sunset cruise with wine and light appetizers for a sophisticated atmosphere. The professional corporate event Austin setting adapts to any firm culture.'
  },
  {
    question: 'What\'s the booking process for professional events?',
    answer: 'Simple: Get a quote online or call us. We recommend booking 2-4 weeks ahead for law firm party Austin or finance team building Lake Travis events. We\'ll help match the right boat to your group size and confirm all details in advance.'
  }
];

const packageOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Executive retreats & partner meetings', icon: Briefcase },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Department outings & client events', icon: Users },
  { name: 'Clever Girl', capacity: '50 guests', best: 'Full practice groups & firm events', icon: Building2 },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Company-wide celebrations', icon: Landmark }
];

const whyFinanceAndLawFirms = [
  {
    icon: Scale,
    title: 'Law Firms',
    description: 'From summer associate events to partner retreats, law firm party Austin cruises deliver the exclusivity your firm expects',
    benefits: ['Partner retreat planning', 'Summer associate events', 'Client appreciation', 'Lateral hiring events']
  },
  {
    icon: TrendingUp,
    title: 'Finance & Investment',
    description: 'Finance team building Lake Travis experiences that celebrate wins and build stronger trading floor bonds',
    benefits: ['Quarter-end celebrations', 'Deal closing parties', 'Team building events', 'Client entertainment']
  },
  {
    icon: Landmark,
    title: 'Accounting Firms',
    description: 'Post busy-season rewards and client events with professional corporate event Austin quality',
    benefits: ['Tax season wrap parties', 'Manager retreats', 'Client appreciation', 'New hire integration']
  },
  {
    icon: GraduationCap,
    title: 'Consulting Firms',
    description: 'Impress clients with attorney client entertainment boat quality experiences they won\'t forget',
    benefits: ['Client appreciation', 'Project celebrations', 'Team building', 'Partner events']
  }
];

export default function FinanceLawFirmsBoatParties() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Boat Parties for Finance & Law Firms Austin | Attorney Client Entertainment Lake Travis</title>
        <meta name="description" content="Host exclusive law firm party Austin events and finance team building Lake Travis cruises. Professional corporate event Austin boat charters with attorney client entertainment boat experiences. Private cruises for 14-75 guests." />
        <meta name="keywords" content="law firm party Austin, finance team building Lake Travis, professional corporate event Austin, attorney client entertainment boat, law firm events Austin, finance team outing Lake Travis, corporate boat charter Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/finance-law-firms-boat-parties-austin" />
        <meta property="og:title" content="Boat Parties for Finance & Law Firms Austin | Attorney Client Entertainment Lake Travis" />
        <meta property="og:description" content="Exclusive law firm party Austin events and finance team building Lake Travis cruises. Professional corporate event Austin experiences with attorney client entertainment boat charters." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-3_1760072938923.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="finance-law-firms-blog-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold" data-testid="badge-hero">
              FINANCE & LAW FIRM EVENTS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Making a Splash – Boat Parties for Finance & Law Firms
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Premium Attorney Client Entertainment Boat Experiences on Lake Travis
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Where professional excellence meets unforgettable experiences. Host your next law firm party Austin event or finance team building Lake Travis outing on the water.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-plan-event">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Professional Event
                </Button>
              </Link>
              <Link href="/client-entertainment">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-client-entertainment">
                  View Client Entertainment Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Why Finance & Law Firms Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="benefits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="section-title-benefits">Why Finance & Law Firms Choose Lake Travis Boat Events</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A law firm party Austin venue that matches your firm's standards. Finance team building Lake Travis experiences that elevate ordinary team events into extraordinary memories.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200" data-testid={`benefit-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-blue-900 text-white" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400" data-testid={`stat-value-${index}`}>{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Appreciation Events Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="client-appreciation-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {/* Text content at top */}
              <div className="mb-10">
                <Badge className="mb-4 bg-blue-100 text-blue-700">CLIENT APPRECIATION</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="section-title-client">Impress Clients in a Setting They'll Never Forget</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed max-w-4xl">
                  For law firm party Austin client events, the venue matters. Take your most valued clients on an attorney client entertainment boat experience that demonstrates your commitment to excellence. A professional corporate event Austin boat charter says "you're important to us" in ways a restaurant dinner simply can't.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl">
                  Finance team building Lake Travis client events create relationship-building opportunities in a relaxed, memorable setting. Whether celebrating a closed deal or nurturing a growing partnership, the exclusive environment facilitates conversations that strengthen business bonds.
                </p>
              </div>
              
              {/* Image centered */}
              <div className="mb-10">
                <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={sectionImage1}
                    alt="Finance team building Lake Travis professional corporate event Austin executives networking"
                    className="w-full h-full object-cover"
                    data-testid="image-client-appreciation"
                  />
                </div>
              </div>
              
              {/* Info cards below image - larger text */}
              <div className="grid sm:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                {eventTypes.slice(0, 2).map((event, index) => (
                  <Card key={index} className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-lg mb-2">{event.title}</h4>
                      <p className="text-base text-gray-600 mb-3">{event.description}</p>
                      <ul className="space-y-2">
                        {event.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="text-base text-blue-600 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Link href="/client-entertainment">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-client-entertainment">
                    <Handshake className="mr-2 h-5 w-5" />
                    Learn About Client Entertainment
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partner Retreat & Team Bonding Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white" data-testid="partner-retreat-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {/* Text content at top */}
              <div className="mb-10">
                <Badge className="mb-4 bg-yellow-400 text-black">PARTNER RETREATS & TEAM BONDING</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="section-title-retreat">Attorney & Associate Team Building That Actually Works</h2>
                <p className="text-lg text-white/90 mb-6 leading-relaxed max-w-4xl">
                  Traditional law firm party Austin events often feel forced. Our boat charters create natural opportunities for partners, associates, and staff to connect authentically. The professional corporate event Austin atmosphere encourages conversation without the pressure of a formal dinner.
                </p>
                <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-4xl">
                  For finance team building Lake Travis events, the change of scenery breaks down barriers between departments. Traders, analysts, and managers interact as equals on the water, building bonds that translate back to the office.
                </p>
              </div>

              {/* Image centered */}
              <div className="mb-10">
                <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={sectionImage2}
                    alt="Law firm party Austin attorney client entertainment boat private charter professional"
                    className="w-full h-full object-cover"
                    data-testid="image-partner-retreat"
                  />
                </div>
              </div>
              
              {/* Info cards below image - larger text */}
              <div className="grid sm:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                {eventTypes.slice(2, 4).map((event, index) => (
                  <Card key={index} className="bg-white/10 border-white/20">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-white text-lg mb-2">{event.title}</h4>
                      <p className="text-base text-white/80 mb-3">{event.description}</p>
                      <ul className="space-y-2">
                        {event.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="text-base text-yellow-400 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Link href="/team-building">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-team-building">
                    <Users className="mr-2 h-5 w-5" />
                    Explore Team Building Options
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Industries We Serve Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="industries-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="section-title-industries">Professional Environment on the Water</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                We understand the culture of professional services. Whether it's a law firm party Austin tradition or a finance team building Lake Travis celebration, we deliver attorney client entertainment boat experiences that match your firm's standards.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyFinanceAndLawFirms.map((industry, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-blue-200" data-testid={`industry-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <industry.icon className="h-7 w-7 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-center">{industry.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base mb-4 text-center">{industry.description}</p>
                      <ul className="space-y-2">
                        {industry.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">BOAT OPTIONS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="section-title-boats">Boats Matching Your Firm Size & Culture</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    From intimate partner meetings to full-firm celebrations, we have the right vessel for your law firm party Austin event or finance team building Lake Travis outing. Each boat provides a professional corporate event Austin atmosphere with all the amenities your team expects.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {packageOptions.map((boat, index) => (
                      <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow" data-testid={`boat-card-${index}`}>
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <boat.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold">{boat.name}</h4>
                            <p className="text-blue-600 text-sm">{boat.capacity}</p>
                            <p className="text-gray-500 text-xs mt-1">{boat.best}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-view-fleet">
                      <Ship className="mr-2 h-5 w-5" />
                      View Our Full Fleet
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Professional corporate event Austin law firm party boat charter Lake Travis"
                      className="w-full h-full object-cover"
                      data-testid="image-boats"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Ship className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Multiple Options</p>
                        <p className="text-xs text-gray-500">14-75 Guests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="included-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="Attorney client entertainment boat finance team building Lake Travis corporate cruise amenities"
                      className="w-full h-full object-cover"
                      data-testid="image-included"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">All-Inclusive</p>
                        <p className="text-xs text-gray-500">Professional Service</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-green-100 text-green-700">WHAT'S INCLUDED</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="section-title-included">Everything for a Seamless Professional Event</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Focus on your law firm party Austin guests or finance team building Lake Travis connections – we handle the logistics. Every professional corporate event Austin charter includes premium amenities for an unforgettable attorney client entertainment boat experience.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Private boat charter (3+ hours)',
                      'Professional captain and crew',
                      'Premium Bluetooth sound system',
                      'Giant lily pad floats for relaxation',
                      'Coolers and ice provided',
                      'BYOB friendly – bring your own catering',
                      'Flexible departure times (sunset cruises available)',
                      'Free parking at the marina'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3" data-testid={`included-feature-${index}`}>
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/corporate-events">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-corporate-events">
                      <Calendar className="mr-2 h-5 w-5" />
                      View Corporate Event Options
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="section-title-faq">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about law firm party Austin events, finance team building Lake Travis outings, and professional corporate event Austin experiences
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4" data-testid={`faq-content-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cta-title">
                Ready to Plan Your Law Firm Party Austin or Finance Team Building Lake Travis Event?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your professional corporate event Austin. We'll help you select the perfect boat for your attorney client entertainment boat experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-get-quote">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <a href="tel:5124885892">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-call">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 727-0422
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

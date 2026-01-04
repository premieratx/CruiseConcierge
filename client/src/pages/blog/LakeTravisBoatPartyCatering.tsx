import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Utensils, Phone, Clock, CheckCircle2, 
  Wine, Award, Sparkles, MapPin, Calendar, Star,
  ArrowRight, Building2, UtensilsCrossed, PartyPopper,
  Package, Anchor, Coffee, Heart, Salad, Pizza,
  Truck, ClipboardCheck, Beer, Sandwich
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-8_1760080740018.jpg';
import sectionImage1 from '@assets/@capitalcityshots-9_1760080740019.jpg';
import sectionImage2 from '@assets/@capitalcityshots-10_1760080740019.jpg';
import sectionImage3 from '@assets/@capitalcityshots-11_1760080740019.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const cateringOptions = [
  {
    title: 'DIY / BYOB',
    icon: Package,
    price: 'Most Affordable',
    description: 'Bring your own food and beverages for Lake Travis boat party catering',
    features: [
      'Coolers with ice provided',
      'BYOB friendly (cans & plastic only)',
      'Bring any food you want',
      'Perfect for casual party boat food Austin gatherings'
    ],
    best: 'Budget-conscious groups, casual celebrations',
    color: 'border-blue-500',
    headerBg: 'bg-blue-500'
  },
  {
    title: 'Party On Delivery',
    icon: Truck,
    price: 'Convenient',
    description: 'Beverage delivery service for boat catering Lake Travis events',
    features: [
      'Curated drink packages available',
      'Delivered to dock, pre-chilled',
      'No store runs needed',
      'Perfect for food and beverage boat party coordination'
    ],
    best: 'Groups wanting convenience without full catering',
    color: 'border-green-500',
    headerBg: 'bg-green-500',
    popular: true
  },
  {
    title: 'Catered Experience',
    icon: UtensilsCrossed,
    price: 'Full Service',
    description: 'Professional Lake Travis boat party catering coordination',
    features: [
      'Local caterer recommendations',
      'Menu planning assistance',
      'Delivery coordination',
      'Complete Austin boat party food service'
    ],
    best: 'Corporate events, special celebrations',
    color: 'border-purple-500',
    headerBg: 'bg-purple-500'
  }
];

const foodIdeas = [
  { icon: Pizza, title: 'Easy Finger Foods', description: 'Sandwiches, wraps, chips for casual party boat food Austin' },
  { icon: Sandwich, title: 'Deli Platters', description: 'Pre-made platters work great for boat catering Lake Travis' },
  { icon: Salad, title: 'Fresh Salads', description: 'Light options perfect for food and beverage boat party days' },
  { icon: UtensilsCrossed, title: 'BBQ Boxes', description: 'Austin-style BBQ for hearty Lake Travis boat party catering' },
  { icon: Coffee, title: 'Snack Boxes', description: 'Charcuterie and snack boxes for Austin boat party food grazing' },
  { icon: PartyPopper, title: 'Celebration Cakes', description: 'Birthday cakes and desserts for special boat catering Lake Travis events' }
];

const beverageGuide = [
  { icon: Beer, title: 'Beer & Seltzers', description: 'Cans only for Lake Travis boat party catering - no glass allowed' },
  { icon: Wine, title: 'Wine & Cocktails', description: 'Transfer to plastic for party boat food Austin safety' },
  { icon: Coffee, title: 'Non-Alcoholic', description: 'Sodas, water, juices for food and beverage boat party variety' },
  { icon: Sparkles, title: 'Mixers', description: 'Bring mixers for custom boat catering Lake Travis cocktails' }
];

const partyOnDelivery = [
  { title: 'Curated Packages', description: 'Pre-selected drink options for Lake Travis boat party catering' },
  { title: 'Custom Orders', description: 'Choose exactly what you want for your party boat food Austin event' },
  { title: 'Dock Delivery', description: 'Beverages waiting for you, chilled and ready' },
  { title: 'Ice Included', description: 'No need to worry about keeping drinks cold' }
];

const cateringTips = [
  { icon: Package, title: 'Keep It Simple', description: 'Finger foods work best for Lake Travis boat party catering - no plates needed' },
  { icon: ClipboardCheck, title: 'Plan Portions', description: 'Calculate 2-3 drinks per person per hour for party boat food Austin events' },
  { icon: Truck, title: 'Arrive Early', description: 'Allow time to load food and beverage boat party supplies before departure' },
  { icon: Utensils, title: 'Bring Serving Supplies', description: 'Napkins, utensils, cups if needed for boat catering Lake Travis' },
  { icon: Wine, title: 'No Glass Policy', description: 'Transfer glass bottles to plastic for Austin boat party food safety' },
  { icon: Coffee, title: 'Stay Hydrated', description: 'Balance alcohol with water for Lake Travis boat party catering' }
];

const whyPremier = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'What are the food and beverage rules for Lake Travis boat party catering?',
    answer: 'Lake Travis boat party catering is flexible! You can bring your own food and beverages (BYOB). Important rules: only cans and plastic containers allowed - no glass. We provide coolers with ice. Party boat food Austin can include any type of food you prefer, from snacks to full catered meals.'
  },
  {
    question: 'Can we have alcohol on the party boat food Austin cruises?',
    answer: 'Yes! All our boats are BYOB for party boat food Austin events. Bring beer, wine, cocktails - just no glass containers. Lake Travis boat party catering for beverages works well with canned drinks and plastic bottles. Transfer any glass bottles to plastic before boarding for boat catering Lake Travis safety.'
  },
  {
    question: 'What is Party On Delivery for food and beverage boat party events?',
    answer: 'Party On Delivery is our beverage coordination service for food and beverage boat party events. They offer curated drink packages or custom orders delivered to the dock. Your beverages arrive chilled and ready for your Lake Travis boat party catering needs - no store runs required!'
  },
  {
    question: 'Do you provide catering for boat catering Lake Travis events?',
    answer: 'We provide catering coordination for boat catering Lake Travis events. While we don\'t cook food ourselves, we connect you with excellent local caterers and help coordinate delivery. Our team ensures your Austin boat party food arrives on time and is properly loaded for your cruise.'
  },
  {
    question: 'What type of food works best for Lake Travis boat party catering?',
    answer: 'For Lake Travis boat party catering, finger foods work best - sandwiches, wraps, fruit, chips, and easy-to-eat items. Avoid messy foods that require cutting. BBQ boxes, deli platters, and charcuterie are popular party boat food Austin choices. Keep food simple and crowd-friendly.'
  },
  {
    question: 'How much food and drinks should we bring for food and beverage boat party cruises?',
    answer: 'For food and beverage boat party planning: estimate 2-3 drinks per person per hour, plus water. For food, plan appetizer-style portions unless having a meal cruise. Our boat catering Lake Travis team can help you calculate exact amounts based on your cruise length and group size.'
  },
  {
    question: 'Can we have a birthday cake on Austin boat party food cruises?',
    answer: 'Absolutely! Birthday cakes are welcome for Austin boat party food celebrations. Just bring the cake in a secure container and we\'ll make space in our coolers or shaded area. Many Lake Travis boat party catering cruises feature celebration cakes for birthdays and special occasions.'
  },
  {
    question: 'What if we want full-service boat catering Lake Travis for corporate events?',
    answer: 'For corporate boat catering Lake Travis, we recommend our full catering coordination. We\'ll connect you with professional caterers who specialize in boat-friendly menus. They handle everything from menu planning to dock delivery, creating a complete food and beverage boat party experience.'
  }
];

const internalLinks = [
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/quote', label: 'Get Quote', icon: Star }
];

export default function LakeTravisBoatPartyCatering() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Boat Party Catering - Food & Beverage Coordination | Premier Party Cruises</title>
        <meta name="description" content="Complete guide to Lake Travis boat party catering, party boat food Austin options, and boat catering Lake Travis coordination. BYOB rules, Party On Delivery, and food and beverage boat party planning tips." />
        <meta name="keywords" content="Lake Travis boat party catering, party boat food Austin, boat catering Lake Travis, Austin boat party food, food and beverage boat party, party boat catering Austin, Lake Travis boat food" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events" />
        <meta property="og:title" content="Lake Travis Boat Party Catering - Food & Beverage Coordination Guide" />
        <meta property="og:description" content="Everything you need to know about Lake Travis boat party catering. BYOB rules, catering options, and food planning tips for the perfect party boat experience." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-party-catering-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-orange-900 via-red-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat party catering - food and beverages on party boat Austin"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              Food & Beverage Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Party Catering<br />
              <span className="text-amber-400">Food & Beverage Coordination</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Everything you need to know about party boat food Austin options. From BYOB guidelines to full boat catering Lake Travis coordination, plan the perfect food and beverage boat party experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/quote">Plan Your Party</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-900 font-semibold"
                data-testid="button-view-boats"
              >
                <Link href="/private-cruises">View Our Fleet</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyPremier.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative -mt-8 mb-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={heroImage}
              alt="Party boat food Austin - guests enjoying Lake Travis boat party catering experience"
              className="w-full rounded-2xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </section>

        {/* Catering Options */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="catering-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700">CATERING OPTIONS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="catering-title">Lake Travis Boat Party Catering Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose the party boat food Austin approach that works best for your celebration
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {cateringOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full ${option.color} border-2 ${option.popular ? 'ring-2 ring-amber-400' : ''}`} data-testid={`card-option-${index}`}>
                    {option.popular && (
                      <div className="bg-amber-400 text-black text-center py-1 font-bold text-sm">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader className={`${option.headerBg} text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{option.title}</CardTitle>
                          <p className="text-white/90">{option.price}</p>
                        </div>
                        <option.icon className="h-10 w-10" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{option.description}</p>
                      <ul className="space-y-2 mb-4">
                        {option.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <strong>Best for:</strong> {option.best}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Food Ideas */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="food-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-red-100 text-red-700">FOOD IDEAS</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="food-title">Best Food Ideas for Boat Catering Lake Travis</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  These Austin boat party food options work perfectly on the water
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {foodIdeas.map((idea, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                      <idea.icon className="h-6 w-6 text-orange-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{idea.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{idea.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage1}
                  alt="Austin boat party food - delicious catering options for Lake Travis boat party"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-food"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Beverage Guide */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="beverage-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">BEVERAGE GUIDE</Badge>
              <h2 className="text-3xl font-bold mb-4">Food and Beverage Boat Party Drink Options</h2>
              <p className="text-gray-600 dark:text-gray-400">
                BYOB is welcome - just remember: cans and plastic only, no glass!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {beverageGuide.map((bev, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`card-bev-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 mx-auto mb-4 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                        <bev.icon className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{bev.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{bev.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Party On Delivery Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900" data-testid="pod-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage2}
                  alt="Food and beverage boat party - Party On Delivery service for Lake Travis catering"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-pod"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-green-100 text-green-700">BEVERAGE DELIVERY</Badge>
                <h2 className="text-3xl font-bold mb-6">Party On Delivery - Convenient Lake Travis Boat Party Catering</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Skip the store runs and have your beverages delivered to the dock, chilled and ready for your party boat food Austin celebration.
                </p>
                <div className="space-y-4">
                  {partyOnDelivery.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Catering Tips */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">PRO TIPS</Badge>
              <h2 className="text-3xl font-bold mb-4">Austin Boat Party Food Planning Tips</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Insider advice for successful boat catering Lake Travis events
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cateringTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-tip-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <tip.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{tip.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4">Lake Travis Boat Party Catering FAQs</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Common questions about party boat food Austin and boat catering Lake Travis
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-white dark:bg-gray-900 rounded-lg px-6" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Party Options</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Find the perfect Lake Travis experience for your celebration
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid={`link-card-${index}`}>
                      <CardContent className="pt-6 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-900 via-red-800 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Lake Travis Boat Party Catering?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Let us help coordinate the perfect party boat food Austin experience. From BYOB to full boat catering Lake Travis, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                  data-testid="button-final-quote"
                >
                  <Link href="/quote">Get Your Quote</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-orange-900 font-semibold"
                  data-testid="button-final-call"
                >
                  <a href="tel:512-709-1560">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 512-709-1560
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

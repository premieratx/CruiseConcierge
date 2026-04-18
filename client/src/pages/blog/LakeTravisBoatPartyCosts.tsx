import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, DollarSign, Phone, Clock, CheckCircle2, 
  Calculator, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, CreditCard, Percent,
  Package, ClipboardCheck, TrendingUp, Anchor,
  Music, Sun, Camera, Heart, Zap, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-6_1760080740018.jpg';
import sectionImage1 from '@assets/@capitalcityshots-7_1760080740018.jpg';
import sectionImage2 from '@assets/@capitalcityshots-8_1760080740018.jpg';
import sectionImage3 from '@assets/@capitalcityshots-9_1760080740019.jpg';

const boatPricing = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    basePrice: '$800',
    weekendPrice: '$1,000',
    duration: '3-4 hours',
    perPerson: '$64-75/person',
    description: 'Most affordable Lake Travis boat party costs for intimate groups',
    features: ['Single-deck pontoon with arch canopy', 'Bluetooth sound system', 'Giant lily pad float', 'Professional captain'],
    icon: Users,
    color: 'border-blue-500',
    headerBg: 'bg-blue-500'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    basePrice: '$1,200',
    weekendPrice: '$1,400',
    duration: '3-4 hours',
    perPerson: '$48-56/person',
    description: 'Mid-range party boat pricing Austin for medium groups',
    features: ['Single-deck pontoon with arch canopy', 'Premium sound system', 'Multiple float options', 'Extended deck space'],
    icon: Ship,
    color: 'border-green-500',
    headerBg: 'bg-green-500'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    basePrice: '$1,400',
    weekendPrice: '$1,650',
    duration: '3-4 hours',
    perPerson: '$47-55/person',
    description: 'Popular boat rental costs Lake Travis for larger celebrations',
    features: ['Single-deck pontoon with arch canopy', 'Full float collection', 'Spacious layout', 'Professional captain'],
    icon: Anchor,
    color: 'border-amber-500',
    headerBg: 'bg-amber-500',
    popular: true
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    basePrice: '$2,200',
    weekendPrice: '$2,600',
    duration: '3-5 hours',
    perPerson: '$35-52/person',
    description: 'Best value Lake Travis party boat costs for large groups with 14 disco balls',
    features: ['Single-deck pontoon with arch canopy', '14 disco balls', 'Maximum dance space', 'Add\'l crew fee for 51-75 guests'],
    icon: Star,
    color: 'border-purple-500',
    headerBg: 'bg-purple-500'
  }
];

const pricingFactors = [
  { icon: Calendar, title: 'Day of Week', description: 'Weekend Lake Travis boat party costs are typically 15-20% higher than weekday rates' },
  { icon: Clock, title: 'Time Slot', description: 'Sunset cruises command premium party boat pricing Austin due to high demand' },
  { icon: Users, title: 'Group Size', description: 'Larger boats offer better per-person boat rental costs Lake Travis value' },
  { icon: Sun, title: 'Season', description: 'Peak season (April-October) sees highest Austin boat party budget requirements' }
];

const budgetTips = [
  { icon: Calendar, title: 'Book Weekdays', description: 'Save 15-20% on Lake Travis boat party costs by choosing Tuesday-Thursday cruises' },
  { icon: Users, title: 'Right-Size Your Group', description: 'Maximize per-person value with party boat pricing Austin that fits your actual headcount' },
  { icon: Package, title: 'BYOB Smartly', description: 'All boats are BYOB - smart shopping reduces overall boat rental costs Lake Travis' },
  { icon: Clock, title: 'Morning Slots', description: 'Early cruises offer lower Austin boat party budget pricing than sunset times' },
  { icon: TrendingUp, title: 'Book Early', description: 'Advance booking often locks in better Lake Travis party boat costs' },
  { icon: Percent, title: 'Ask About Discounts', description: 'Military, first responder, and weekday discounts available on party boat pricing Austin' }
];

const whatsIncluded = [
  { icon: Anchor, title: 'Professional Captain', description: 'Licensed captain included in all Lake Travis boat party costs' },
  { icon: Music, title: 'Sound System', description: 'Premium Bluetooth speakers in every party boat pricing Austin package' },
  { icon: Waves, title: 'Floats & Swimming', description: 'Giant lily pad and swimming stops included in boat rental costs Lake Travis' },
  { icon: Package, title: 'Coolers & Ice', description: 'Ice-filled coolers provided - part of your Austin boat party budget' },
  { icon: Shield, title: 'Safety Equipment', description: 'All required safety gear included in Lake Travis party boat costs' },
  { icon: Camera, title: 'Photo Ops', description: 'Stunning backdrops included - no extra party boat pricing Austin charges' }
];

const addOnCosts = [
  { name: 'Party On Delivery', description: 'Beverages delivered to dock for your Lake Travis boat party', price: 'Varies by selection' },
  { name: 'Catering Coordination', description: 'Connect with local caterers - free coordination service', price: 'Free' },
  { name: 'Extended Time', description: 'Add hours to your party boat pricing Austin package', price: '$200-400/hour' },
  { name: 'Photography', description: 'Professional photos of your boat rental costs Lake Travis event', price: 'Starting at $300' },
  { name: 'Decorations', description: 'Custom decorations for your Austin boat party budget', price: 'Starting at $100' }
];

const whyPremier = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'What are typical Lake Travis boat party costs for different group sizes?',
    answer: 'Lake Travis boat party costs start at $800 for our Day Tripper (14 guests, Monday-Thursday) and range up to $2,200+ for our flagship Clever Girl (50-75 guests). Per-person party boat pricing Austin breaks down to $35-75 depending on boat size and day of week. Weekend boat rental costs Lake Travis run about 15-20% higher than weekday rates.'
  },
  {
    question: 'What factors affect party boat pricing Austin the most?',
    answer: 'The biggest factors affecting party boat pricing Austin are: day of week (weekends cost more), time slot (sunset cruises are premium), season (April-October is peak), and boat size. Planning your Austin boat party budget around weekday afternoon slots can save 20-30% on Lake Travis party boat costs.'
  },
  {
    question: 'What is included in the base boat rental costs Lake Travis?',
    answer: 'All boat rental costs Lake Travis include: private charter, professional captain, premium sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), giant lily pad float, and swimming stops. Your Lake Travis boat party costs cover everything needed for a great time - just bring your beverages and food.'
  },
  {
    question: 'How can I minimize my Austin boat party budget?',
    answer: 'To minimize your Austin boat party budget: book weekdays (save 15-20%), choose morning/afternoon over sunset slots, right-size your boat to actual guest count, bring your own beverages (BYOB), and book 2-4 weeks ahead. These strategies can reduce Lake Travis boat party costs by 20-40%.'
  },
  {
    question: 'Are there hidden fees in party boat pricing Austin?',
    answer: 'No hidden fees! Our party boat pricing Austin is transparent. Base Lake Travis party boat costs include captain, fuel, equipment, and standard amenities. Optional add-ons like catering coordination, photography, or extended time are clearly priced. Gratuity for your captain (15-20%) is customary but not required.'
  },
  {
    question: 'Do you offer payment plans for Lake Travis boat party costs?',
    answer: 'Yes! For Lake Travis boat party costs, we require a deposit to secure your date with the balance due before your cruise. This makes party boat pricing Austin more manageable for budget planning. Contact us about specific Austin boat party budget payment options.'
  },
  {
    question: 'What discounts are available on boat rental costs Lake Travis?',
    answer: 'We offer several discounts on boat rental costs Lake Travis: weekday rates (15-20% off), military and first responder discounts, multi-booking corporate rates, and occasional seasonal promotions. Ask about current Lake Travis party boat costs specials when you inquire.'
  },
  {
    question: 'How does party boat pricing Austin compare to other venues?',
    answer: 'Party boat pricing Austin often provides better value than traditional venues. When you factor in the unique experience, included captain, sound system, floats, and stunning Lake Travis setting, boat rental costs Lake Travis compete favorably with restaurant buyouts or event spaces - plus your guests get an unforgettable experience.'
  }
];

const internalLinks = [
  { href: '/bachelor-party-austin', label: 'Bachelor Party Cruises', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Star },
  { href: '/quote', label: 'Get Custom Quote', icon: Calculator }
];

export default function LakeTravisBoatPartyCosts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning"
        defaultTitle="Lake Travis Boat Party Costs - Complete Pricing Guide & Budget Planning | Premier Party Cruises"
        defaultDescription="Complete guide to Lake Travis boat party costs starting at $800. Compare party boat pricing Austin options, understand boat rental costs Lake Travis, and plan your Austin boat party budget. Transparent pricing since 2010."
        defaultKeywords={['Lake Travis boat party costs', 'party boat pricing Austin', 'boat rental costs Lake Travis', 'Austin boat party budget', 'Lake Travis party boat costs', 'party boat rental prices Austin', 'Lake Travis boat charter pricing']}
        image={heroImage}
      />

      <BlogV2Layout
        title="Lake Travis Boat Party Costs - Complete Pricing Guide & Budget Planning"
        description="Complete guide to Lake Travis boat party costs starting at $800. Compare party boat pricing Austin options, understand boat rental costs Lake Travis, and plan your Austin boat party budget. Transparent pricing since 2010."
        slug="lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning"
        category="Planning Guides"
        categoryHref="/private-cruises"
        pillarTitle="Private Party Boat Charters"
        pillarHref="/private-cruises"
        relatedArticles={[
          { title: "Lake Travis Boat Party Packages - Complete Guide", href: "/blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing" },
          { title: "Lake Travis Boat Party Reviews - Real Customer Experiences", href: "/blogs/lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials" },
          { title: "Lake Travis Boat Party Insurance - Coverage & Liability", href: "/blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events" },
        ]}
      >
      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-party-costs-page">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-green-900 via-emerald-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat party costs - party boats on beautiful Lake Travis waters"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              Complete Pricing Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Party Costs<br />
              <span className="text-amber-400">Pricing Guide & Budget Planning</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Everything you need to know about party boat pricing Austin. Transparent boat rental costs Lake Travis starting at $800 for groups of 14-75 guests. Plan your Austin boat party budget with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Get Your Custom Quote</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-900 font-semibold"
                data-testid="button-view-boats"
              >
                <Link href="/private-cruises">View Our Fleet</Link>
              </Button>
            </div>
          </div>
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Explore our full guide to{' '}
            <Link href="/party-boat-lake-travis" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Lake Travis party boat rentals</Link>{' '}
            for everything from pricing and logistics to safety and entertainment.
          </p>
        </div>
      </div>


        {/* Stats Section */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyPremier.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative -mt-8 mb-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={heroImage}
              alt="Lake Travis boat party costs - guests enjoying party boat rental on Lake Travis Austin"
              className="w-full rounded-2xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </section>

        {/* Boat Pricing Breakdown */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="pricing-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">TRANSPARENT PRICING</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="pricing-title">Lake Travis Boat Party Costs by Boat</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Compare party boat pricing Austin across our entire fleet. All boat rental costs Lake Travis include captain, sound system, floats, and coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company).
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {boatPricing.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full ${boat.color} border-2 ${boat.popular ? 'ring-2 ring-amber-400' : ''}`} data-testid={`card-boat-${index}`}>
                    {boat.popular && (
                      <div className="bg-amber-400 text-black text-center py-1 font-bold text-sm">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader className={`${boat.headerBg} text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl">{boat.name}</CardTitle>
                          <p className="text-white/90">{boat.capacity}</p>
                        </div>
                        <boat.icon className="h-10 w-10" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Weekday</div>
                          <div className="text-xl font-bold text-green-600">{boat.basePrice}</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Weekend</div>
                          <div className="text-xl font-bold text-amber-600">{boat.weekendPrice}</div>
                        </div>
                      </div>
                      <div className="text-center mb-4 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{boat.perPerson}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{boat.description}</p>
                      <ul className="space-y-2">
                        {boat.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Factors */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="factors-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">What Affects Party Boat Pricing Austin?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Understanding these factors helps you plan your Austin boat party budget effectively
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingFactors.map((factor, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`card-factor-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <factor.icon className="h-7 w-7 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{factor.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{factor.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Budget Tips Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-amber-100 text-amber-700">MONEY-SAVING TIPS</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="tips-title">How to Maximize Your Austin Boat Party Budget</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Smart planning can significantly reduce your Lake Travis boat party costs while still enjoying an incredible experience on the water.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {budgetTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <tip.icon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">{tip.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage1}
                  alt="Party boat pricing Austin - guests enjoying affordable Lake Travis boat party"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-tips"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900" data-testid="included-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">WHAT'S INCLUDED</Badge>
              <h2 className="text-3xl font-bold mb-4">Everything in Your Boat Rental Costs Lake Travis</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our Lake Travis party boat costs include all the essentials for an amazing experience
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatsIncluded.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-included-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Optional Add-Ons */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="addons-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage2}
                  alt="Boat rental costs Lake Travis - optional add-ons for party boat experience"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-addons"
                />
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-purple-100 text-purple-700">OPTIONAL UPGRADES</Badge>
                <h2 className="text-3xl font-bold mb-6">Additional Services & Lake Travis Party Boat Costs</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Enhance your party boat pricing Austin package with these optional add-ons
                </p>
                <div className="space-y-4">
                  {addOnCosts.map((addon, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{addon.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{addon.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-600">{addon.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4">Lake Travis Boat Party Costs FAQs</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Common questions about party boat pricing Austin and boat rental costs Lake Travis
              </p>
            </m.div>

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
            <m.div
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
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <m.div
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
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-green-900 via-emerald-800 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Your Lake Travis Boat Party Costs?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Get a personalized quote for your party boat pricing Austin experience. Our team will help you find the perfect boat rental costs Lake Travis for your budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                  data-testid="button-final-quote"
                >
                  <Link href="/book-now">Get Your Custom Quote</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-900 font-semibold"
                  data-testid="button-final-call"
                >
                  <a href="tel:512-488-5892">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 512-488-5892
                  </a>
                </Button>
              </div>
            </m.div>
          </div>
        </section>

      </div>
      </BlogV2Layout>
    </>
    </LazyMotionProvider>
  );
}

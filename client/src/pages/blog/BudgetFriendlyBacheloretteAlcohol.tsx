import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  DollarSign, Wine, Ship, Calculator, Package, 
  Calendar, Star, Users, Heart, Sparkles, CheckCircle2,
  ArrowRight, PiggyBank, Target, TrendingDown, Gift,
  Clock, Percent, Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/disco_fun_first_1765193453547.jpg';
import sectionImage1 from '@assets/disco_fun3_1765193453547.jpg';
import sectionImage2 from '@assets/disco_fun5_1765193453548.jpg';

const trustStats = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const budgetStrategies = [
  { 
    icon: Package, 
    title: 'BYOB Advantage', 
    description: 'All our boats are BYOB - bring your own budget bachelorette party alcohol and save hundreds compared to venues with drink minimums',
    savings: 'Save $300-500'
  },
  { 
    icon: Users, 
    title: 'Split Costs Evenly', 
    description: 'Divide boat rental and affordable bachelorette alcohol costs among the group for budget-friendly bachelorette party pricing',
    savings: 'Per person savings'
  },
  { 
    icon: Calendar, 
    title: 'Weekday Bookings', 
    description: 'Book your budget bachelorette party boat on Thursday or Friday for lower rates than Saturday',
    savings: 'Save 15-20%'
  },
  { 
    icon: Target, 
    title: 'Smart Beverage Math', 
    description: 'Calculate 3-4 drinks per person for a 3-hour budget-friendly bachelorette party cruise',
    savings: 'No waste'
  }
];

const affordableAlcoholGuide = [
  { 
    category: 'Best Value Seltzers', 
    items: ['Bud Light Seltzer (24pk ~$22)', 'Topo Chico Hard Seltzer (12pk ~$18)', 'Vizzy (24pk ~$24)'],
    perDrink: '$0.90-1.50',
    bestFor: 'Budget bachelorette party crowd pleasers'
  },
  { 
    category: 'Affordable Wine Options', 
    items: ['Bota Box (3L = 4 bottles, ~$18)', 'Black Box Wine (3L ~$20)', 'Barefoot Canned Wine (4pk ~$10)'],
    perDrink: '$1.50-2.50',
    bestFor: 'Budget-friendly bachelorette party wine lovers'
  },
  { 
    category: 'Value Beer Picks', 
    items: ['Modelo/Corona (24pk ~$28)', 'Shiner (24pk ~$26)', 'Lone Star (30pk ~$22)'],
    perDrink: '$0.75-1.20',
    bestFor: 'Affordable bachelorette Austin boat parties'
  },
  { 
    category: 'Smart Spirit Choices', 
    items: ['Tito\'s Vodka (1.75L ~$35)', 'Espolòn Tequila (750ml ~$25)', 'Deep Eddy Vodka (1.75L ~$28)'],
    perDrink: '$1-2 with mixers',
    bestFor: 'Budget bachelorette party cocktails'
  }
];

const costBreakdown = [
  { item: 'Day Tripper (14 guests, 4hr)', cost: 'Starting at $800', perPerson: '~$57/person', note: 'Most budget-friendly bachelorette party boat option' },
  { item: 'Meeseeks (25 guests, 3hr)', cost: '$1,200', perPerson: '~$48/person', note: 'Great value for affordable bachelorette Austin groups' },
  { item: 'The Irony (30 guests, 3hr)', cost: '$1,400', perPerson: '~$47/person', note: 'Best per-person rate for budget bachelorette party' },
  { item: 'Clever Girl (50 guests, 3hr)', cost: '$2,200', perPerson: '~$44/person', note: 'Lowest per-person for budget-friendly bachelorette party' }
];

const budgetAlcoholMath = {
  groupSize: 15,
  cruiseLength: '3 hours',
  drinksPerPerson: 4,
  totalDrinks: 60,
  budgetOption: {
    name: 'Budget-Friendly Mix',
    items: [
      { item: '2x 24pk Hard Seltzer', cost: '$44' },
      { item: '1x Bota Box Wine (3L)', cost: '$18' },
      { item: '1x Tito\'s 1.75L + Mixers', cost: '$45' },
      { item: 'Ice and cups', cost: '$15' }
    ],
    total: '$122',
    perPerson: '$8.13'
  }
};

const savingsVsVenues = [
  { venue: 'Downtown Austin Bar Package', cost: '$50-75/person', drinks: '3-4 drinks' },
  { venue: 'Hotel Rooftop Party', cost: '$40-60/person', drinks: '2-3 drinks' },
  { venue: 'Wine Bar Private Event', cost: '$45-65/person', drinks: '3-4 glasses' },
  { venue: 'Budget Bachelorette Party Boat (BYOB)', cost: '$55-65/person total', drinks: 'Unlimited BYOB + boat' }
];

const proTips = [
  { tip: 'Costco Run', description: 'Buy budget bachelorette party alcohol at Costco for the best bulk prices on seltzers and spirits' },
  { tip: 'Pre-Made Batched Cocktails', description: 'Mix margaritas and ranch water ahead for affordable bachelorette Austin party prep' },
  { tip: 'Ice Strategy', description: 'Bring extra ice bags for your budget-friendly bachelorette party - we provide coolers' },
  { tip: 'Skip Glass Transfers', description: 'Buy canned wine directly instead of transferring for your budget bachelorette party boat' },
  { tip: 'Assign a Beverage Coordinator', description: 'One person handles alcohol shopping for best affordable bachelorette party deals' },
  { tip: 'Consider Party On Delivery', description: 'Let them handle shopping and delivery for your budget-friendly bachelorette party' }
];

const fleetOptions = [
  { name: 'Day Tripper', capacity: '14 guests', description: 'Intimate budget-friendly bachelorette party boat' },
  { name: 'Meeseeks', capacity: '25 guests', description: 'Mid-size affordable bachelorette Austin option' },
  { name: 'The Irony', capacity: '30 guests', description: 'Popular budget bachelorette party choice' },
  { name: 'Clever Girl', capacity: '50-75 guests', description: 'Lowest per-person for budget-friendly bachelorette party (add\'l crew fee for 51-75)' }
];

const faqs = [
  {
    question: 'What is the most budget-friendly bachelorette party boat option?',
    answer: 'For the most budget-friendly bachelorette party experience, consider our Day Tripper (starting at $800 (4-hour cruise), up to 14 guests) which works out to about $57 per person for the boat alone on a 4-hour cruise. When you add affordable bachelorette alcohol at around $8-10 per person BYOB, your total is under $70 per person for a Lake Travis cruise - much less than most Austin bars or venues.'
  },
  {
    question: 'How much should we budget for alcohol at a budget bachelorette party?',
    answer: 'For a budget-friendly bachelorette party, plan $8-15 per person for BYOB alcohol. With smart shopping at Costco or Total Wine, you can stock a 3-hour affordable bachelorette Austin cruise for about $100-150 total for 15 guests. Focus on value seltzers, boxed wine, and mid-tier spirits for the best budget bachelorette party beverage mix.'
  },
  {
    question: 'What are the cheapest quality alcohol options for a Lake Travis bachelorette?',
    answer: 'Best value options for your budget-friendly bachelorette party include: Bud Light Seltzer 24-packs (~$22), Bota Box wine (equals 4 bottles for ~$18), Tito\'s Vodka 1.75L (~$35), and Lone Star beer 30-packs (~$22). All are quality options that keep your affordable bachelorette alcohol budget low while keeping the party going strong.'
  },
  {
    question: 'How does BYOB save money for a budget bachelorette party?',
    answer: 'BYOB is the biggest budget-friendly bachelorette party hack! At Austin bars, drinks cost $10-15 each. On our boats, you bring your own - a $1-2 per drink average with smart shopping. For 15 guests having 4 drinks each, you save $480-780 compared to bar prices. That\'s massive savings for your affordable bachelorette Austin celebration.'
  },
  {
    question: 'Should we do Party On Delivery or shop ourselves for budget bachelorette party?',
    answer: 'For pure budget-friendly bachelorette party savings, shopping yourself at Costco or Total Wine is cheapest. However, Party On Delivery saves time and ensures you get boat-legal containers (cans/plastic only). They can also catch deals and help with quantities for your affordable bachelorette alcohol needs. Factor your time value into the decision.'
  },
  {
    question: 'What day of the week is cheapest for a budget bachelorette party cruise?',
    answer: 'Thursday and Friday cruises offer 15-20% savings over Saturday rates for budget-friendly bachelorette party boat rentals. Sunday mornings can also have lower rates. Book your affordable bachelorette Austin cruise on these days to maximize savings while still having an amazing Lake Travis experience.'
  },
  {
    question: 'How do we split costs fairly for a budget-friendly bachelorette party?',
    answer: 'For the fairest budget bachelorette party split: divide boat rental equally, have everyone Venmo one person for alcohol costs, and the bride pays nothing. Use apps like Splitwise to track expenses. For affordable bachelorette alcohol, each person can bring a specific item (one brings beer, another brings wine, etc.).'
  },
  {
    question: 'Is it cheaper to do cocktails or cans for budget bachelorette party boats?',
    answer: 'Pre-made canned cocktails are convenient but cost more. For a budget-friendly bachelorette party, mixing your own is cheaper: a $30 tequila bottle makes 15+ margaritas vs. buying 15 canned margs at $3-4 each. Bring plastic pitchers to batch affordable bachelorette alcohol cocktails right on the boat.'
  }
];

const internalLinks = [
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/quote', label: 'Get Your Quote', icon: Calendar }
];

export default function BudgetFriendlyBacheloretteAlcohol() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank"
        defaultTitle="Budget-Friendly Bachelorette Party Alcohol | Maximum Fun Without Breaking the Bank | Premier Party Cruises"
        defaultDescription="Plan a budget-friendly bachelorette party with smart alcohol strategies. Affordable bachelorette Austin tips, BYOB savings guide, and budget bachelorette party boat options. Maximum fun, minimum spend on Lake Travis."
        defaultKeywords={['budget-friendly bachelorette party', 'budget bachelorette party', 'affordable bachelorette Austin', 'affordable bachelorette alcohol', 'cheap bachelorette party ideas', 'budget Lake Travis bachelorette', 'BYOB bachelorette party']}
        image={heroImage}
      />

      <BlogV2Layout
        title="Budget-Friendly Bachelorette Party Alcohol | Maximum Fun Without Breaking the Bank | Premier Party Cruises"
        description="Plan a budget-friendly bachelorette party with smart alcohol strategies. Affordable bachelorette Austin tips, BYOB savings guide, and budget bachelorette party boat options. Maximum fun, minimum spend on Lake Travis."
        slug="budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank"
        category="Bachelorette Guides"
        categoryHref="/bachelorette-party-austin"
        pillarTitle="Austin Bachelorette Party Guide"
        pillarHref="/bachelorette-party-austin"
        relatedArticles={[
          { title: "Cocktail Kits vs Individual Bottles: The Smart Strategy", href: "/blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy" },
          { title: "The Ultimate Austin Bachelorette Party Alcohol Guide", href: "/blogs/the-ultimate-austin-bachelorette-party-alcohol-guide-what-to-order-when-to-order-and-how-much-you-actually-need" },
          { title: "Bachelorette Party Alcohol Emergency Kit", href: "/blogs/bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions" },
        ]}
      >
      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="budget-friendly-bachelorette-alcohol-page">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Budget-friendly bachelorette party group celebrating with affordable drinks on Lake Travis boat"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-green-400 text-black font-bold" data-testid="badge-hero">
              💰 SMART SAVINGS GUIDE
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Budget-Friendly Bachelorette<br />
              <span className="text-green-300">Party Alcohol Guide</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Maximum fun without breaking the bank! Smart strategies for affordable bachelorette Austin 
              celebrations with budget bachelorette party tips for Lake Travis boat cruises.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8"
                data-testid="button-book-cruise"
              >
                <Link href="/bachelorette-party-austin">Book Budget-Friendly Cruise</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-900 font-semibold"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Get Custom Quote</Link>
              </Button>
            </div>
          </div>
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This guide is part of our complete{' '}
            <Link href="/bachelorette-party-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin bachelorette party boats</Link>{' '}
            resource — your ultimate planning hub for Lake Travis bachelorette celebrations.
          </p>
        </div>
      </div>


        {/* Trust Stats */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustStats.map((item, index) => (
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

        {/* Budget Strategies */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="strategies-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">SMART SAVINGS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="strategies-title">4 Key Strategies for a Budget-Friendly Bachelorette Party</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Maximize fun while minimizing costs for your affordable bachelorette Austin celebration
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {budgetStrategies.map((strategy, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-green-500" data-testid={`strategy-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <strategy.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <Badge className="mb-2 bg-green-500 text-white">{strategy.savings}</Badge>
                      <h3 className="font-bold text-lg mb-2">{strategy.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{strategy.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* BYOB Savings Highlight */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white" data-testid="byob-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="byob-title">The BYOB Advantage for Budget-Friendly Bachelorette Parties</h2>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Skip drink minimums and per-drink charges. Bring your own affordable bachelorette alcohol and save $500+ 
                compared to Austin bars and venues.
              </p>
            </m.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Budget Bachelorette Party Math</h3>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-green-200 text-sm">Group Size</p>
                      <p className="text-2xl font-bold">{budgetAlcoholMath.groupSize} guests</p>
                    </div>
                    <div>
                      <p className="text-green-200 text-sm">Cruise Length</p>
                      <p className="text-2xl font-bold">{budgetAlcoholMath.cruiseLength}</p>
                    </div>
                    <div>
                      <p className="text-green-200 text-sm">Drinks/Person</p>
                      <p className="text-2xl font-bold">{budgetAlcoholMath.drinksPerPerson}</p>
                    </div>
                    <div>
                      <p className="text-green-200 text-sm">Total Drinks</p>
                      <p className="text-2xl font-bold">{budgetAlcoholMath.totalDrinks}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="font-bold mb-3">{budgetAlcoholMath.budgetOption.name}</h4>
                    {budgetAlcoholMath.budgetOption.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm mb-2">
                        <span>{item.item}</span>
                        <span className="font-semibold">{item.cost}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/20 pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Budget Bachelorette Party Alcohol</span>
                        <span className="text-green-300">{budgetAlcoholMath.budgetOption.total}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-200">
                        <span>Per Person</span>
                        <span>{budgetAlcoholMath.budgetOption.perPerson}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src={sectionImage1}
                  alt="Budget-friendly bachelorette party guests enjoying affordable drinks on Lake Travis boat"
                  className="rounded-2xl shadow-xl w-full"
                  data-testid="img-byob"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Affordable Alcohol Guide */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="alcohol-guide-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-emerald-100 text-emerald-700">SHOPPING GUIDE</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="alcohol-guide-title">Affordable Bachelorette Alcohol: Best Value Picks</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Quality options that keep your budget bachelorette party costs low
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {affordableAlcoholGuide.map((category, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`alcohol-category-${index}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{category.category}</CardTitle>
                        <Badge className="bg-green-100 text-green-700">{category.perDrink}/drink</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{category.bestFor}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.items.map((item, iIndex) => (
                          <li key={iIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {item}
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

        {/* Cost Breakdown */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="cost-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="cost-title">Budget-Friendly Bachelorette Party Boat Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Compare per-person costs for affordable bachelorette Austin cruises
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {costBreakdown.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow text-center" data-testid={`boat-cost-${index}`}>
                    <CardContent className="pt-6">
                      <Ship className="h-10 w-10 text-green-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">{boat.item}</h3>
                      <div className="text-3xl font-bold text-green-600 mb-1">{boat.cost}</div>
                      <Badge className="mb-3 bg-green-500 text-white">{boat.perPerson}</Badge>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{boat.note}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vs Venues Comparison */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="comparison-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <Badge className="mb-4 bg-green-100 text-green-700">VALUE COMPARISON</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="comparison-title">Budget-Friendly Bachelorette Party: Boat vs. Venues</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  See why a budget bachelorette party boat cruise delivers more value than traditional Austin venues.
                </p>
                
                <div className="space-y-4">
                  {savingsVsVenues.map((venue, index) => (
                    <div key={index} className={`p-4 rounded-lg ${index === savingsVsVenues.length - 1 ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500' : 'bg-gray-100 dark:bg-gray-800'}`} data-testid={`venue-compare-${index}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">{venue.venue}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{venue.drinks}</p>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${index === savingsVsVenues.length - 1 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>{venue.cost}</span>
                          {index === savingsVsVenues.length - 1 && (
                            <div className="flex items-center gap-1 text-green-600 text-sm">
                              <Trophy className="h-4 w-4" />
                              Best Value
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src={sectionImage2}
                  alt="Affordable bachelorette Austin celebration on Lake Travis boat with budget-friendly drinks"
                  className="rounded-2xl shadow-xl w-full"
                  data-testid="img-comparison"
                />
              </div>
            </m.div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-900" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-emerald-500 text-white">PRO TIPS</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="tips-title">Budget Bachelorette Party Pro Tips</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Insider tricks for the most affordable bachelorette Austin experience
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proTips.map((tip, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`pro-tip-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <PiggyBank className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{tip.tip}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet Options */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="fleet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="fleet-title">Our Budget-Friendly Bachelorette Party Fleet</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                All boats are single-deck pontoons with arch canopy - BYOB friendly
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fleetOptions.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow text-center" data-testid={`fleet-option-${index}`}>
                    <CardContent className="pt-6">
                      <Ship className="h-10 w-10 text-green-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg">{boat.name}</h3>
                      <Badge className="my-2">{boat.capacity}</Badge>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{boat.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold" data-testid="button-book-now">
                <Link href="/bachelorette-party-austin">
                  <Heart className="mr-2 h-5 w-5" />
                  Book Your Budget-Friendly Cruise
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quote Builder */}
        <QuoteBuilderSection />

        {/* Internal Links */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Affordable Bachelorette Austin Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Additional resources for planning your budget-friendly bachelorette party
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {internalLinks.map((link, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid={`internal-link-${index}`}>
                      <CardContent className="pt-6 text-center">
                        <link.icon className="h-10 w-10 text-green-600 mx-auto mb-4" />
                        <h3 className="font-bold">{link.label}</h3>
                        <ArrowRight className="h-5 w-5 mx-auto mt-2 text-gray-400" />
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">Budget-Friendly Bachelorette Party FAQs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Answers to common questions about affordable bachelorette Austin celebrations
              </p>
            </m.div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:text-green-600">
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

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Budget-Friendly Bachelorette Party?</h2>
              <p className="text-xl text-green-100 mb-8">
                Get a custom quote for your affordable bachelorette Austin Lake Travis cruise today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-bold text-lg px-8" data-testid="cta-quote">
                  <Link href="/book-now">
                    <Calculator className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-lg px-8" data-testid="cta-contact">
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
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

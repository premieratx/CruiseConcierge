import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Wine, Beer, PartyPopper, Clock, Ship, Calculator, 
  Calendar, Star, Users, Heart, Sparkles, CheckCircle2,
  ArrowRight, Package, Target, Gift, Truck, GlassWater,
  Timer, ListChecks, Lightbulb, Anchor, Music, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/disco_fun_first_1765193453547.jpg';
import sectionImage1 from '@assets/disco_fun3_1765193453547.jpg';
import sectionImage2 from '@assets/disco_fun5_1765193453548.jpg';
import sectionImage3 from '@assets/disco_fun7_1765193453548.jpg';

const trustStats = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const whatToOrderCategories = [
  { 
    icon: Wine, 
    category: 'Champagne & Sparkling',
    color: 'pink',
    items: [
      { name: 'Prosecco', description: 'Budget-friendly bubbles for mimosas', quantity: '2-3 bottles per 10 guests' },
      { name: 'Brut Champagne', description: 'For toasting the bride', quantity: '1 bottle per 8 guests' },
      { name: 'Rosé Sparkling', description: 'Photo-perfect pink bubbles', quantity: '1-2 bottles per 10 guests' }
    ],
    tip: 'Pro tip: Canned sparkling wine is boat-safe and Instagram-ready!'
  },
  { 
    icon: Wine, 
    category: 'Wine Selection',
    color: 'purple',
    items: [
      { name: 'Rosé (Dry)', description: 'The bachelorette party staple', quantity: '3-4 bottles per 10 guests' },
      { name: 'White Wine', description: 'Sauvignon Blanc or Pinot Grigio', quantity: '2 bottles per 10 guests' },
      { name: 'Boxed Wine', description: '3L box equals 4 bottles', quantity: '1 box per 8-10 guests' }
    ],
    tip: 'Boxed wine is perfect for boats - no glass, stays cold longer!'
  },
  { 
    icon: GlassWater, 
    category: 'Hard Seltzers & RTDs',
    color: 'blue',
    items: [
      { name: 'White Claw/Truly', description: 'Crowd-pleasing low-cal option', quantity: '2-3 per person for 3hr cruise' },
      { name: 'High Noon', description: 'Vodka-based, slightly stronger', quantity: '2 per person' },
      { name: 'Ranch Water Cans', description: 'Texas favorite tequila seltzer', quantity: '2-3 per person' }
    ],
    tip: 'Mix brands for variety - everyone has a favorite!'
  },
  { 
    icon: Beer, 
    category: 'Beer & Light Options',
    color: 'amber',
    items: [
      { name: 'Light Beer', description: 'Michelob Ultra, Corona Light', quantity: '2-3 per person' },
      { name: 'Craft Beer', description: 'Local Austin brews', quantity: '1-2 per person' },
      { name: 'Mexican Lagers', description: 'Modelo, Pacifico, Dos Equis', quantity: '2-3 per person' }
    ],
    tip: 'Keep it light for hot Texas days on the water!'
  }
];

const whenToOrderTimeline = [
  { 
    timeframe: '2-3 Weeks Before',
    icon: Calendar,
    tasks: [
      'Survey your group for drink preferences',
      'Calculate quantities based on guest count',
      'Research Party On Delivery for convenience',
      'Book your Lake Travis cruise if not done yet'
    ],
    priority: 'Planning Phase'
  },
  { 
    timeframe: '1 Week Before',
    icon: ListChecks,
    tasks: [
      'Finalize alcohol order with Party On Delivery',
      'Or place Costco/Total Wine bulk order',
      'Confirm ice and cooler situation',
      'Assign someone to pick up if doing self-shopping'
    ],
    priority: 'Order Phase'
  },
  { 
    timeframe: '2-3 Days Before',
    icon: Package,
    tasks: [
      'Confirm delivery timing with Party On Delivery',
      'Pre-chill wines and sparkling if shopping yourself',
      'Prepare mixers for batched cocktails',
      'Buy last-minute snacks and water'
    ],
    priority: 'Prep Phase'
  },
  { 
    timeframe: 'Day Of',
    icon: PartyPopper,
    tasks: [
      'Party On Delivery delivers directly to marina',
      'Or load coolers with pre-chilled beverages',
      'Bring extra ice for backup',
      'Don\'t forget water for hydration!'
    ],
    priority: 'Party Time!'
  }
];

const quantityCalculator = {
  cruiseLength: '3 hours',
  scenarios: [
    { 
      guests: 10, 
      light: { drinks: 30, breakdown: '12 seltzers, 8 wines, 6 beers, 4 sparkling' },
      moderate: { drinks: 40, breakdown: '16 seltzers, 12 wines, 8 beers, 4 sparkling' },
      festive: { drinks: 50, breakdown: '20 seltzers, 15 wines, 10 beers, 5 sparkling' }
    },
    { 
      guests: 15, 
      light: { drinks: 45, breakdown: '18 seltzers, 12 wines, 9 beers, 6 sparkling' },
      moderate: { drinks: 60, breakdown: '24 seltzers, 18 wines, 12 beers, 6 sparkling' },
      festive: { drinks: 75, breakdown: '30 seltzers, 22 wines, 15 beers, 8 sparkling' }
    },
    { 
      guests: 20, 
      light: { drinks: 60, breakdown: '24 seltzers, 16 wines, 12 beers, 8 sparkling' },
      moderate: { drinks: 80, breakdown: '32 seltzers, 24 wines, 16 beers, 8 sparkling' },
      festive: { drinks: 100, breakdown: '40 seltzers, 30 wines, 20 beers, 10 sparkling' }
    },
    { 
      guests: 25, 
      light: { drinks: 75, breakdown: '30 seltzers, 20 wines, 15 beers, 10 sparkling' },
      moderate: { drinks: 100, breakdown: '40 seltzers, 30 wines, 20 beers, 10 sparkling' },
      festive: { drinks: 125, breakdown: '50 seltzers, 38 wines, 25 beers, 12 sparkling' }
    }
  ]
};

const partyOnDeliveryBenefits = [
  { icon: Truck, title: 'Marina Delivery', description: 'Beverages delivered directly to your boat - no hauling coolers!' },
  { icon: Package, title: 'Curated Packages', description: 'Pre-made bachelorette packages with perfect variety' },
  { icon: Target, title: 'Right Quantities', description: 'They know exactly how much you need for Lake Travis cruises' },
  { icon: Clock, title: 'Timed Perfectly', description: 'Cold drinks waiting when you arrive at the marina' },
  { icon: Gift, title: 'Special Touches', description: 'Add custom labels, bride straws, and party extras' },
  { icon: Heart, title: 'Local Expertise', description: 'Austin-based team knows what works on the water' }
];

const lakeTravisCruiseTips = [
  { 
    icon: Anchor, 
    title: 'Boat-Friendly Containers Only',
    description: 'No glass allowed! Stick to cans, plastic bottles, and boxed wine. Our boats provide coolers and ice.',
    important: true
  },
  { 
    icon: Timer, 
    title: 'Plan for 3-4 Hour Cruises',
    description: 'Most bachelorette cruises are 3-4 hours. Plan 3-4 drinks per person for moderate drinking pace.'
  },
  { 
    icon: GlassWater, 
    title: 'Hydration is Key',
    description: 'Texas sun + alcohol = dehydration. Bring 1 water per person per hour. Liquid IV or Waterboy helps!'
  },
  { 
    icon: Music, 
    title: 'ATX Disco Cruise Special',
    description: 'Our famous disco cruise includes DJ and photographer. BYOB makes it even more affordable!'
  },
  { 
    icon: Camera, 
    title: 'Photo-Ready Drinks',
    description: 'Pink drinks photograph best! Rosé cans, watermelon seltzers, and champagne for the \'gram.'
  },
  { 
    icon: Sparkles, 
    title: 'Celebration Moment',
    description: 'Save a special bottle for sunset toast. Our crew can help coordinate the perfect photo moment!'
  }
];

const faqs = [
  {
    question: 'What alcohol should I bring for an Austin bachelorette party boat cruise?',
    answer: 'For a Lake Travis bachelorette cruise, bring a mix of seltzers (White Claw, High Noon), rosé wine (canned or boxed for boat safety), light beers, and sparkling wine for toasts. Plan 3-4 drinks per person for a 3-hour cruise. Skip glass bottles - cans and plastic only on the boats!'
  },
  {
    question: 'How much alcohol do I need for a bachelorette party with 15 people?',
    answer: 'For 15 guests on a 3-hour Lake Travis cruise, plan 45-75 total drinks depending on your group\'s vibe. A good mix: 24 hard seltzers, 18 glasses worth of wine (2-3 boxes or 4-5 bottles in cans), 12 beers, and 1-2 bottles of sparkling for toasts. Always have water and non-alcoholic options too!'
  },
  {
    question: 'When should I order alcohol for my Austin bachelorette party?',
    answer: 'Start planning 2-3 weeks out by surveying your group. Place your order 1 week before - either through Party On Delivery for convenience or at Costco/Total Wine for best prices. For Party On Delivery, book 3-5 days ahead to ensure marina delivery on your cruise day.'
  },
  {
    question: 'What is Party On Delivery and how does it work?',
    answer: 'Party On Delivery is an Austin-based alcohol delivery service perfect for Lake Travis parties. They deliver cold beverages directly to your marina before your cruise. They offer curated bachelorette packages and know exactly what works on the water. It\'s the stress-free option for busy maids of honor!'
  },
  {
    question: 'Can I bring glass bottles on Lake Travis party boats?',
    answer: 'No - glass is not allowed on any of our Lake Travis party boats for safety reasons. Stick to canned wine, boxed wine, hard seltzers, canned beer, and plastic bottles. If you have a special champagne, transfer it to a plastic carafe before boarding.'
  },
  {
    question: 'What\'s the best champagne alternative for a boat bachelorette?',
    answer: 'Canned sparkling wines like Barefoot Bubbly, Sofia Coppola\'s Blanc de Blancs, or Chandon Garden Spritz are perfect boat-friendly champagne alternatives. They\'re Instagram-worthy, single-serve, and no glass! Budget about 2-3 per person for a celebratory vibe.'
  },
  {
    question: 'How do I keep drinks cold on a Lake Travis cruise?',
    answer: 'Our party boats provide coolers and ice! Bring extra ice if you have a large group. Pre-chill everything 24 hours before. Frozen drinks like wine slushies or frozen margaritas (in insulated containers) are also great for Texas heat.'
  },
  {
    question: 'Should we do BYOB or use Party On Delivery for our bachelorette cruise?',
    answer: 'Both work great! BYOB via Costco/Total Wine is most budget-friendly ($8-15/person). Party On Delivery costs slightly more but saves time and stress - they deliver cold to the marina. For destination bachelorette parties where the bridal party is from out of town, Party On Delivery is often worth it.'
  }
];

const internalLinks = [
  { href: '/bachelorette-party-austin', label: 'Bachelorette Party Cruises', icon: Heart },
  { href: '/private-cruises', label: 'Private Boat Rentals', icon: Ship },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/chat', label: 'Get Your Quote', icon: Calendar }
];

export default function UltimateBacheloretteAlcoholGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/the-ultimate-austin-bachelorette-party-alcohol-guide-what-to-order-when-to-order-and-how-much-you-actually-need"
        defaultTitle="The Ultimate Austin Bachelorette Party Alcohol Guide | What to Order, When & How Much | Premier Party Cruises"
        defaultDescription="Complete Austin bachelorette party alcohol guide: what to order (champagne, wine, seltzers), when to order (timeline), and how much you need for Lake Travis cruises. Party On Delivery tips included!"
        defaultKeywords={['Austin bachelorette party alcohol', 'bachelorette party drinks', 'Lake Travis bachelorette cruise', 'what to bring bachelorette party boat', 'Party On Delivery Austin', 'bachelorette party planning', 'Austin party boat alcohol']}
        image="https://premierpartycruises.com/attached_assets/disco_fun_first_1765193453547.jpg"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="ultimate-bachelorette-alcohol-guide-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-pink-600 via-rose-600 to-fuchsia-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Austin bachelorette party group celebrating on Lake Travis party boat with drinks"
          />
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-pink-400 text-black font-bold" data-testid="badge-hero">
              🥂 COMPLETE PLANNING GUIDE
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              The Ultimate Austin Bachelorette<br />
              <span className="text-pink-200">Party Alcohol Guide</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-4" data-testid="hero-subtitle">
              What to Order, When to Order, and How Much You Actually Need
            </p>
            
            <p className="text-lg text-pink-100 max-w-2xl mx-auto mb-8">
              Your complete guide to planning the perfect drinks for your Austin bachelorette party 
              on Lake Travis - from champagne toasts to boat-friendly seltzers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8"
                data-testid="button-book-cruise"
              >
                <Link href="/bachelorette-party-austin">Book Bachelorette Cruise</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-pink-900 font-semibold"
                data-testid="button-get-quote"
              >
                <Link href="/chat">Get Custom Quote</Link>
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
                  <div className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Order Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="what-to-order-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-100 text-pink-700">DRINK GUIDE</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="what-to-order-title">What to Order for Your Bachelorette Party</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The perfect drink mix for Lake Travis bachelorette cruises - boat-friendly options the whole squad will love
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-8">
              {whatToOrderCategories.map((category, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-pink-500" data-testid={`category-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                          <category.icon className="h-6 w-6 text-pink-600" />
                        </div>
                        <CardTitle className="text-xl">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-4">
                        {category.items.map((item, iIndex) => (
                          <div key={iIndex} className="border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                              </div>
                            </div>
                            <p className="text-xs text-pink-600 mt-1 font-medium">{item.quantity}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg">
                        <p className="text-sm text-pink-700 dark:text-pink-300 flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          {category.tip}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Break */}
        <section className="py-0">
          <img 
            src={sectionImage1}
            alt="Bachelorette party group celebrating with drinks on Lake Travis boat cruise"
            className="w-full h-64 md:h-96 object-cover"
          />
        </section>

        {/* When to Order Section */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-600 text-white" data-testid="when-to-order-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-white text-pink-700">TIMING GUIDE</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="when-to-order-title">When to Order: Your Bachelorette Alcohol Timeline</h2>
              <p className="text-xl text-pink-100 max-w-2xl mx-auto">
                Don't leave drink planning to the last minute! Follow this timeline for stress-free bachelorette party prep.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whenToOrderTimeline.map((phase, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/10 backdrop-blur border-white/20" data-testid={`timeline-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <phase.icon className="h-5 w-5 text-white" />
                        </div>
                        <Badge className="bg-pink-300 text-pink-900">{phase.priority}</Badge>
                      </div>
                      <h3 className="font-bold text-lg mb-3">{phase.timeframe}</h3>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, tIndex) => (
                          <li key={tIndex} className="flex items-start gap-2 text-sm text-pink-100">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-pink-300" />
                            {task}
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

        {/* How Much You Need Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="quantity-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-rose-100 text-rose-700">QUANTITY CALCULATOR</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="quantity-title">How Much Alcohol Do You Actually Need?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Use our calculator guide based on a {quantityCalculator.cruiseLength} Lake Travis cruise. 
                Choose your group's drinking style!
              </p>
            </m.div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse" data-testid="quantity-table">
                <thead>
                  <tr className="bg-pink-50 dark:bg-pink-900/20">
                    <th className="border border-pink-200 dark:border-pink-800 p-4 text-left font-bold">Group Size</th>
                    <th className="border border-pink-200 dark:border-pink-800 p-4 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">Light 🍃</span>
                      </div>
                      <span className="text-xs text-gray-500 font-normal">3 drinks/person</span>
                    </th>
                    <th className="border border-pink-200 dark:border-pink-800 p-4 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600">Moderate 🎉</span>
                      </div>
                      <span className="text-xs text-gray-500 font-normal">4 drinks/person</span>
                    </th>
                    <th className="border border-pink-200 dark:border-pink-800 p-4 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600">Festive 🥳</span>
                      </div>
                      <span className="text-xs text-gray-500 font-normal">5 drinks/person</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quantityCalculator.scenarios.map((scenario, index) => (
                    <tr key={index} className="hover:bg-pink-50/50 dark:hover:bg-pink-900/10">
                      <td className="border border-pink-200 dark:border-pink-800 p-4 font-bold text-lg">
                        {scenario.guests} Guests
                      </td>
                      <td className="border border-pink-200 dark:border-pink-800 p-4">
                        <div className="font-bold text-green-600">{scenario.light.drinks} drinks</div>
                        <div className="text-xs text-gray-500">{scenario.light.breakdown}</div>
                      </td>
                      <td className="border border-pink-200 dark:border-pink-800 p-4">
                        <div className="font-bold text-yellow-600">{scenario.moderate.drinks} drinks</div>
                        <div className="text-xs text-gray-500">{scenario.moderate.breakdown}</div>
                      </td>
                      <td className="border border-pink-200 dark:border-pink-800 p-4">
                        <div className="font-bold text-pink-600">{scenario.festive.drinks} drinks</div>
                        <div className="text-xs text-gray-500">{scenario.festive.breakdown}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-pink-600" />
                Pro Quantity Tips
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                  Always round UP - it's better to have extra than run out!
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                  Include 10-15% non-alcoholic options (sparkling water, sodas)
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                  Hot weather = more drinking, so adjust for Texas summer
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                  Morning cruises typically drink less than afternoon/sunset
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Image Break */}
        <section className="py-0">
          <img 
            src={sectionImage2}
            alt="Austin bachelorette party celebrating with champagne toast on Lake Travis cruise"
            className="w-full h-64 md:h-96 object-cover"
          />
        </section>

        {/* Party On Delivery Section */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="pod-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-500 text-white">PARTNER SPOTLIGHT</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="pod-title">Party On Delivery: The Stress-Free Solution</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Let the professionals handle your bachelorette party alcohol! Party On Delivery specializes in 
                Lake Travis boat party beverage service.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {partyOnDeliveryBenefits.map((benefit, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`pod-benefit-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                        <benefit.icon className="h-6 w-6 text-pink-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ask our team about Party On Delivery when you book your bachelorette cruise!
              </p>
              <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
                <Link href="/chat">
                  Get Quote with Delivery Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Lake Travis Cruise Tips */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="cruise-tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">LAKE TRAVIS TIPS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cruise-tips-title">Bachelorette Cruise Drink Tips</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Expert advice for a perfect Lake Travis bachelorette party from our experienced crew
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lakeTravisCruiseTips.map((tip, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full hover:shadow-lg transition-shadow ${tip.important ? 'border-2 border-red-400' : ''}`} data-testid={`tip-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tip.important ? 'bg-red-100' : 'bg-blue-100'}`}>
                          <tip.icon className={`h-5 w-5 ${tip.important ? 'text-red-600' : 'text-blue-600'}`} />
                        </div>
                        {tip.important && <Badge className="bg-red-100 text-red-700">Important</Badge>}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Break */}
        <section className="py-0">
          <img 
            src={sectionImage3}
            alt="Lake Travis party boat with bachelorette group enjoying sunset drinks"
            className="w-full h-64 md:h-96 object-cover"
          />
        </section>

        {/* FAQs */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-pink-100 text-pink-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about bachelorette party alcohol planning
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`} 
                  className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 px-6"
                  data-testid={`faq-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <PartyPopper className="h-16 w-16 mx-auto mb-6 text-pink-200" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="cta-title">
                Ready to Book Your Austin Bachelorette Cruise?
              </h2>
              <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                Now that you know what to bring, let's plan the perfect Lake Travis party! 
                Our team will help you coordinate everything - including Party On Delivery options.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-pink-600 hover:bg-pink-50 font-bold text-lg px-8"
                  data-testid="button-book-now"
                >
                  <Link href="/bachelorette-party-austin">
                    <Heart className="mr-2 h-5 w-5" />
                    View Bachelorette Packages
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-semibold"
                  data-testid="button-quote"
                >
                  <Link href="/chat">
                    Get Custom Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {internalLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="flex items-center gap-2 text-pink-200 hover:text-white transition-colors text-sm"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}

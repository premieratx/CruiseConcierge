import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Cloud, Sun, Thermometer, Droplets, Wind, Calendar,
  ArrowRight, CheckCircle2, AlertTriangle, Ship, Users,
  Umbrella, Snowflake, Leaf, Flower2, Waves, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-1_1760080740012.jpg';
import sectionImage1 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import sectionImage2 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import sectionImage3 from '@assets/@capitalcityshots-4_1760080740017.jpg';
import sectionImage4 from '@assets/@capitalcityshots-5_1760080740018.jpg';

const weatherBenefits = [
  { 
    icon: Sun, 
    title: '270+ Sunny Days', 
    description: 'Austin weather for boating is exceptional with year-round sunshine on Lake Travis',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Thermometer, 
    title: 'Extended Season', 
    description: 'Best time to boat on Lake Travis spans March through November for seasonal boat party planning',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  { 
    icon: Droplets, 
    title: 'Flexible Policies', 
    description: 'Lake Travis party weather doesn\'t have to be perfect - we reschedule for severe conditions',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Calendar, 
    title: 'Year-Round Fun', 
    description: 'Every season offers unique advantages for your Austin boat party weather experience',
    color: 'text-green-600',
    bg: 'bg-green-100'
  }
];

const seasonalGuides = [
  {
    name: 'Spring (March-May)',
    tagline: 'Perfect Conditions',
    icon: Flower2,
    color: 'border-green-500',
    headerBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
    popular: true,
    weather: {
      temp: '70-85°F',
      water: '65-75°F',
      rainfall: 'Moderate (3-4" monthly)',
      wind: 'Light to moderate'
    },
    pros: [
      'Ideal Austin weather for boating',
      'Wildflowers blooming around the lake',
      'Comfortable temperatures for dancing',
      'Perfect water temps for swimming'
    ],
    cons: [
      'Peak wedding/bachelorette season (book early)',
      'Occasional spring storms',
      'Higher demand means earlier bookings needed'
    ],
    best: 'Bachelorette parties & bachelor celebrations',
    cta: 'The best time to boat on Lake Travis for most events'
  },
  {
    name: 'Summer (June-August)',
    tagline: 'Peak Party Season',
    icon: Sun,
    color: 'border-amber-500',
    headerBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
    weather: {
      temp: '85-100°F',
      water: '78-85°F',
      rainfall: 'Low (1-2" monthly)',
      wind: 'Light'
    },
    pros: [
      'Warmest water temperatures',
      'Longest daylight hours',
      'Most reliable weather conditions',
      'Prime swimming and floating weather'
    ],
    cons: [
      'Intense Texas heat (hydration essential)',
      'Highest demand period',
      'Peak pricing in effect'
    ],
    best: 'Birthday parties & summer celebrations',
    cta: 'Prime Lake Travis party weather for water activities'
  },
  {
    name: 'Fall (September-November)',
    tagline: 'Hidden Gem',
    icon: Leaf,
    color: 'border-orange-500',
    headerBg: 'bg-gradient-to-r from-orange-500 to-red-500',
    weather: {
      temp: '65-85°F',
      water: '70-80°F',
      rainfall: 'Moderate (3" monthly)',
      wind: 'Light to moderate'
    },
    pros: [
      'Comfortable Austin weather for boating',
      'Beautiful fall colors around lake',
      'Less crowded than summer',
      'Still warm enough for swimming'
    ],
    cons: [
      'Occasional cold fronts',
      'ACL and UT football compete for hotel rooms',
      'Daylight hours decreasing'
    ],
    best: 'Corporate events & team building',
    cta: 'Excellent value for seasonal boat party planning'
  },
  {
    name: 'Winter (December-February)',
    tagline: 'Off-Peak Value',
    icon: Snowflake,
    color: 'border-blue-500',
    headerBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    weather: {
      temp: '45-65°F',
      water: '50-60°F',
      rainfall: 'Low (2" monthly)',
      wind: 'Variable'
    },
    pros: [
      'Best pricing of the year',
      'Easy availability',
      'Crisp, clear skies common',
      'Holiday parties on the water'
    ],
    cons: [
      'Too cold for swimming',
      'Shorter daylight hours',
      'Occasional winter storms'
    ],
    best: 'Holiday parties & intimate celebrations',
    cta: 'Budget-friendly Austin boat party weather option'
  }
];

const weatherPolicies = [
  { condition: 'Light Rain', action: 'We cruise! Our arch canopy provides coverage', icon: Droplets },
  { condition: 'Thunderstorms', action: 'We delay or reschedule for safety', icon: Cloud },
  { condition: 'High Winds (25+ mph)', action: 'We may delay until conditions improve', icon: Wind },
  { condition: 'Severe Weather', action: 'Full reschedule with no penalty', icon: AlertTriangle }
];

const monthlyBreakdown = [
  { month: 'January', temp: '45-60°F', swimming: 'No', events: 'Holiday afterglows, intimate parties' },
  { month: 'February', temp: '50-65°F', swimming: 'No', events: 'Valentine\'s, early spring celebrations' },
  { month: 'March', temp: '55-75°F', swimming: 'Brave souls', events: 'Spring break, early bachelorettes' },
  { month: 'April', temp: '65-80°F', swimming: 'Yes!', events: 'Peak bachelorette/bachelor season' },
  { month: 'May', temp: '70-85°F', swimming: 'Yes!', events: 'Graduations, weddings, corporate' },
  { month: 'June', temp: '80-95°F', swimming: 'Absolutely', events: 'Summer parties, birthdays' },
  { month: 'July', temp: '85-100°F', swimming: 'Essential', events: 'Peak summer celebrations' },
  { month: 'August', temp: '85-100°F', swimming: 'Essential', events: 'Back to school, last summer hurrahs' },
  { month: 'September', temp: '75-90°F', swimming: 'Yes!', events: 'Corporate, fall kickoffs' },
  { month: 'October', temp: '65-80°F', swimming: 'Yes', events: 'Halloween, fall festivals' },
  { month: 'November', temp: '55-70°F', swimming: 'Maybe', events: 'Thanksgiving, early holiday' },
  { month: 'December', temp: '45-60°F', swimming: 'No', events: 'Holiday parties, NYE' }
];

const fleetInfo = [
  { name: 'Day Tripper', capacity: '14 guests', description: 'Intimate gatherings' },
  { name: 'Meeseeks', capacity: '25 guests', description: 'Medium groups' },
  { name: 'The Irony', capacity: '30 guests', description: 'Larger parties' },
  { name: 'Clever Girl', capacity: '50-75 guests', description: 'Flagship vessel' }
];

const faqs = [
  {
    question: 'What is the best time to boat on Lake Travis?',
    answer: 'The best time to boat on Lake Travis is spring (March-May) and fall (September-November) when Austin weather for boating is most comfortable. Temperatures range from 65-85°F with lower humidity than summer. However, summer offers the warmest water for swimming, and winter provides the best pricing. Every season has advantages for seasonal boat party planning on Lake Travis.'
  },
  {
    question: 'What happens if weather affects my Lake Travis party?',
    answer: 'Lake Travis party weather doesn\'t have to be perfect! Light rain? We cruise with our arch canopy coverage. Thunderstorms or severe weather? We offer full rescheduling with no penalty. Our captains monitor conditions 48 hours before your event and communicate proactively. Safety always comes first, but we do everything possible to make your Austin boat party weather concerns disappear.'
  },
  {
    question: 'Can you boat on Lake Travis in winter?',
    answer: 'Absolutely! Winter Austin weather for boating can be beautiful - crisp, clear skies and comfortable daytime temperatures (45-65°F). While swimming isn\'t advised, winter Lake Travis boat parties are perfect for holiday celebrations, intimate gatherings, and corporate events. Plus, you\'ll enjoy the best pricing and easiest availability of the year.'
  },
  {
    question: 'How hot does it get on Lake Travis in summer?',
    answer: 'Summer Lake Travis party weather brings temperatures of 85-100°F, with the hottest days in July and August. The water temperature reaches 78-85°F, perfect for swimming. For summer seasonal boat party planning, we recommend booking morning or sunset cruises to avoid peak heat. Hydration is essential - our BYOB policy means you can bring plenty of water alongside beverages.'
  },
  {
    question: 'What months have the best Austin weather for boating?',
    answer: 'April, May, September, and October offer the best time to boat on Lake Travis. These months feature comfortable temperatures (65-85°F), warm water for swimming, and lower humidity than peak summer. Spring brings wildflowers, while fall offers beautiful foliage. Both seasons are popular, so book your Austin boat party weather-perfect cruise early!'
  },
  {
    question: 'Does Lake Travis have a rainy season?',
    answer: 'Austin experiences two wetter periods: spring (April-May) and fall (September-October) with 3-4 inches monthly. However, rain typically comes as brief afternoon storms rather than all-day events. Our seasonal boat party planning accounts for weather patterns, and we can often cruise before or after storms pass. Lake Travis party weather is remarkably reliable overall.'
  },
  {
    question: 'What should I wear for different seasons on Lake Travis?',
    answer: 'For spring/fall Austin weather for boating: layers, swimsuit underneath, light jacket for evening. Summer: swimwear, cover-up, sunscreen, hat. Winter: warm layers, windbreaker, closed-toe shoes. All seasons: reef-safe sunscreen and sunglasses. The best time to boat on Lake Travis changes what you pack, but the fun remains constant!'
  },
  {
    question: 'How do water levels affect Lake Travis boating?',
    answer: 'Lake Travis water levels fluctuate based on rainfall. Lower levels expose more coves for exploring but may affect some marinas. Higher levels mean more swimming spots. Our experienced captains know the lake in all conditions and adjust routes accordingly. Lake Travis party weather and water levels rarely prevent great cruises - we adapt to conditions year-round.'
  }
];

const internalLinks = [
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Waves },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Users },
  { href: '/corporate-events', label: 'Corporate Events', icon: Calendar }
];

export default function LakeTravisWeatherPlanning() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties"
        defaultTitle="Lake Travis Weather Planning: Best Time to Boat | Seasonal Guide for Austin Boat Parties"
        defaultDescription="Plan the perfect Lake Travis boat party with our weather guide. Learn the best time to boat on Lake Travis, Austin weather for boating by season, and seasonal boat party planning tips. Lake Travis party weather advice from local experts."
        defaultKeywords={['Lake Travis weather', 'best time to boat on Lake Travis', 'Austin weather for boating', 'Lake Travis party weather', 'seasonal boat party planning', 'Lake Travis boating seasons', 'Austin boat party weather']}
        image={heroImage}
      />

      <BlogV2Layout
        title="Lake Travis Weather Planning: Best Time to Boat"
        description="Plan the perfect Lake Travis boat party with our weather guide. Learn the best time to boat on Lake Travis, Austin weather for boating by season, and seasonal boat party planning tips. Lake Travis party weather advice from local experts."
        slug="lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties"
        category="Planning Guides"
        categoryHref="/private-cruises"
        pillarTitle="Private Party Boat Charters"
        pillarHref="/private-cruises"
        relatedArticles={[
          { title: "Lake Travis Boat Party Logistics - Complete Planning Guide", href: "/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide" },
          { title: "Lake Travis Boat Party Regulations - Legal Requirements", href: "/blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide" },
          { title: "Lake Travis Boat Party Insurance - Coverage & Liability", href: "/blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events" },
        ]}
      >
      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-weather-page">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-cyan-700 to-blue-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Lake Travis Weather Planning: Best Time to Boat - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              SEASONAL PLANNING GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Weather Planning: Best Time to Boat for Perfect Parties
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Seasonal Considerations for Austin Boat Party Weather
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Master seasonal boat party planning with our expert guide to Lake Travis party weather throughout the year.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/private-cruises">
                <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg px-8 py-6" data-testid="button-book-cruise">
                  <Ship className="mr-2 h-5 w-5" />
                  Book Your Cruise
                </Button>
              </Link>
              <Link href="/atx-disco-cruise">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-disco-cruise">
                  ATX Disco Cruise
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
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


        {/* Hero Image with SEO Alt */}
        <section className="relative -mt-8 mb-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={heroImage}
              alt="Lake Travis weather best time to boat Austin weather for boating seasonal party planning"
              className="w-full rounded-2xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="benefits-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="benefits-title">Why Lake Travis Weather Works for Your Party</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Austin weather for boating is among the best in Texas, with year-round opportunities
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {weatherBenefits.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200" data-testid={`card-benefit-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="intro-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">WEATHER OVERVIEW</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="intro-title">Understanding Lake Travis Party Weather</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Lake Travis enjoys one of the most favorable climates for boating in Texas. With over 270 sunny days 
                    annually, Austin weather for boating is remarkably reliable. Understanding seasonal patterns helps 
                    you choose the best time to boat on Lake Travis for your specific celebration.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Whether you're planning a summer splash party or a cozy winter corporate event, our seasonal boat 
                    party planning guide ensures you're prepared. Lake Travis party weather varies throughout the year, 
                    but each season offers unique advantages for your Austin boat party.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">270+ sunny days make Austin weather for boating exceptional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Swimming season extends from April through October</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Year-round cruising available with seasonal boat party planning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Flexible weather policies protect your investment</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Best time to boat on Lake Travis Austin weather for boating sunny day party"
                      className="w-full h-full object-cover"
                      data-testid="img-intro"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Sun className="h-8 w-8 text-amber-500" />
                      <div>
                        <p className="font-bold text-sm">270+ Sunny Days</p>
                        <p className="text-xs text-gray-500">Per year in Austin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Seasonal Guides Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="seasons-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">SEASONAL GUIDE</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="seasons-title">Lake Travis Weather by Season</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Find the best time to boat on Lake Travis for your specific celebration
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-8">
              {seasonalGuides.map((season, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  {season.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-green-500 text-white font-bold px-4 py-1">MOST POPULAR</Badge>
                    </div>
                  )}
                  <Card className={`h-full border-2 ${season.color} ${season.popular ? 'shadow-xl' : ''}`} data-testid={`card-season-${index}`}>
                    <CardHeader className={`${season.headerBg} text-white py-6`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium opacity-90">{season.tagline}</p>
                          <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <season.icon className="h-6 w-6" />
                            {season.name}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                          <p className="text-gray-500 text-xs">Air Temp</p>
                          <p className="font-bold">{season.weather.temp}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                          <p className="text-gray-500 text-xs">Water Temp</p>
                          <p className="font-bold">{season.weather.water}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                          <p className="text-gray-500 text-xs">Rainfall</p>
                          <p className="font-bold text-xs">{season.weather.rainfall}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                          <p className="text-gray-500 text-xs">Wind</p>
                          <p className="font-bold">{season.weather.wind}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold text-sm mb-2 text-green-600">Pros:</h4>
                        <ul className="space-y-1">
                          {season.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold text-sm mb-2 text-amber-600">Considerations:</h4>
                        <ul className="space-y-1">
                          {season.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Best for:</p>
                        <p className="font-medium text-sm">{season.best}</p>
                        <p className="text-xs text-gray-500 italic mt-1">{season.cta}</p>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Weather Policies Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 text-white" data-testid="policies-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-amber-400 text-black">WEATHER POLICIES</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="policies-title">What Happens in Bad Lake Travis Party Weather?</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Don't stress about Austin boat party weather! We have clear policies that protect your celebration. 
                    Our captains have 15+ years of experience reading Lake Travis conditions and prioritizing safety 
                    while maximizing fun.
                  </p>
                  
                  <div className="space-y-4">
                    {weatherPolicies.map((policy, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-bold mb-1 flex items-center gap-2">
                          <policy.icon className="h-5 w-5 text-amber-400" />
                          {policy.condition}
                        </h4>
                        <p className="text-sm text-white/80">{policy.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage2}
                      alt="Lake Travis party weather conditions Austin weather for boating safety"
                      className="w-full h-full object-cover"
                      data-testid="img-policies"
                    />
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Monthly Breakdown Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="monthly-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-100 text-purple-700">MONTH BY MONTH</Badge>
                <h2 className="text-3xl font-bold mb-4" data-testid="monthly-title">Lake Travis Weather: Monthly Breakdown</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Plan your seasonal boat party with detailed monthly Austin weather for boating
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" data-testid="monthly-table">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-3 text-left font-bold">Month</th>
                      <th className="p-3 text-left font-bold">Temperature</th>
                      <th className="p-3 text-left font-bold">Swimming?</th>
                      <th className="p-3 text-left font-bold">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyBreakdown.map((month, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <td className="p-3 font-medium">{month.month}</td>
                        <td className="p-3">{month.temp}</td>
                        <td className="p-3">{month.swimming}</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{month.events}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </m.div>
          </div>
        </section>

        {/* Fleet Info Section */}
        <section className="py-12 bg-blue-900 text-white" data-testid="fleet-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold">Our Fleet for Every Lake Travis Weather Condition</h3>
              <p className="text-white/80 mt-2">All boats feature single-deck pontoon design with protective arch canopy</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {fleetInfo.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <Ship className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                  <p className="text-xl font-bold text-amber-400" data-testid={`boat-name-${index}`}>{boat.name}</p>
                  <p className="text-sm text-white/90 mt-1">{boat.capacity}</p>
                  <p className="text-xs text-white/70">{boat.description}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Tips Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
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
                      alt="Seasonal boat party planning Lake Travis best time to boat Austin"
                      className="w-full h-full object-cover"
                      data-testid="img-tips"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-cyan-100 text-cyan-700">PRO TIPS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="tips-title">Seasonal Boat Party Planning Tips</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        Book Early for Peak Seasons
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The best time to boat on Lake Travis (April-May, September-October) books 4-6 weeks ahead. 
                        Summer weekends fill even faster. Early booking ensures your preferred date and time.
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Umbrella className="h-5 w-5 text-cyan-500" />
                        Have a Backup Plan
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        While Lake Travis party weather is usually reliable, keep your schedule flexible. 
                        Our reschedule policies make it easy to move your cruise if severe weather threatens.
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Sun className="h-5 w-5 text-amber-500" />
                        Time Your Cruise Right
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Summer Austin weather for boating is hottest 2-5 PM. Morning and sunset cruises 
                        offer more comfortable temperatures. Sunset cruises are magical any season!
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Thermometer className="h-5 w-5 text-red-500" />
                        Dress for the Season
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Seasonal boat party planning means packing appropriately. Layers for spring/fall, 
                        sun protection for summer, warm gear for winter cruises on Lake Travis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h3 className="text-xl font-bold text-center mb-8">Plan Your Lake Travis Boat Party</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {internalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid={`link-card-${index}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <link.icon className="h-8 w-8 text-blue-500" />
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
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4" data-testid="faq-title">Frequently Asked Questions About Lake Travis Weather</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about Austin weather for boating and the best time to boat on Lake Travis
              </p>
            </m.div>

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
        <section className="py-16 bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="cta-title">Ready to Book Your Lake Travis Boat Party?</h2>
              <p className="text-lg text-white/90 mb-8">
                No matter the season, our experienced captains ensure the best Austin boat party weather experience. 
                Start planning your perfect seasonal boat party today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg px-8 py-6" data-testid="button-book-now">
                    <Ship className="mr-2 h-5 w-5" />
                    Book Your Cruise
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-contact">
                    <MapPin className="mr-2 h-5 w-5" />
                    Ask About Conditions
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

      </div>
      </BlogV2Layout>
    </>
    </LazyMotionProvider>
  );
}

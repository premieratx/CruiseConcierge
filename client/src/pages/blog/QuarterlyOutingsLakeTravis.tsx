import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Repeat,
  Sun, Snowflake, Leaf, TreeDeciduous, Sparkles, Crown,
  Package, CalendarDays, Percent, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/meeseeks-25-person-boat.webp';
import sectionImage1 from '@assets/meeseeks-1_1763968010088.jpg';
import sectionImage2 from '@assets/meeseeks-2_1763968010089.jpg';
import sectionImage3 from '@assets/meeseeks-4 austin party boat rental_1763968010090.jpg';

const quarterlyBenefits = [
  { 
    icon: Repeat, 
    title: 'Consistent Team Connection', 
    description: 'Build stronger bonds with regular quarterly team outings Austin companies love',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Percent, 
    title: 'Package Deal Savings', 
    description: 'Lock in negotiated rates for your corporate boat party Lake Travis events',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: CalendarDays, 
    title: 'Simplified Planning', 
    description: 'One vendor, stored preferences, and streamlined booking for company event ideas Austin teams need',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Heart, 
    title: 'Employee Engagement', 
    description: 'Regular team building Lake Travis outings boost morale and retention',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const seasonalThemes = [
  {
    title: 'Spring Kickoff',
    icon: Sun,
    season: 'Q1',
    description: 'Start the year with energy on a quarterly team outing Austin style',
    features: [
      'New year goal-setting session',
      'Team bonding activities',
      'Perfect spring weather',
      'Fresh start vibes'
    ],
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    title: 'Summer Celebration',
    icon: Waves,
    season: 'Q2',
    description: 'Cool off with a corporate boat party Lake Travis style',
    features: [
      'Swimming and water activities',
      'Sunset cruise options',
      'Peak summer fun',
      'Team building Lake Travis adventures'
    ],
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    title: 'Fall Retreat',
    icon: Leaf,
    season: 'Q3',
    description: 'Reflect on progress with company event ideas Austin loves',
    features: [
      'End-of-quarter reviews',
      'Beautiful fall colors',
      'Strategic planning sessions',
      'Comfortable temperatures'
    ],
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  },
  {
    title: 'Holiday Celebration',
    icon: Sparkles,
    season: 'Q4',
    description: 'End the year in style with team building Lake Travis festivities',
    features: [
      'Holiday party atmosphere',
      'Year-end celebrations',
      'Award ceremonies',
      'Festive decorations available'
    ],
    color: 'text-red-600',
    bg: 'bg-red-100'
  }
];

const whyLakeTravis = [
  { stat: '4x', label: 'Yearly Events Made Easy' },
  { stat: '14-75', label: 'Guest Capacity Range' },
  { stat: 'BYOB', label: 'Bring Your Own Food & Drinks' },
  { stat: '5-Star', label: 'Google Review Rating' }
];

const boatOptions = [
  { 
    name: 'Day Tripper', 
    capacity: '14 guests', 
    best: 'Small team quarterly team outing Austin',
    description: 'Perfect for intimate department gatherings and executive retreats'
  },
  { 
    name: 'Meeseeks / The Irony', 
    capacity: '25-30 guests', 
    best: 'Mid-size corporate boat party Lake Travis',
    description: 'Ideal for department-wide company event ideas Austin teams prefer'
  },
  { 
    name: 'Clever Girl', 
    capacity: '50-75 guests', 
    best: 'Large company-wide team building Lake Travis',
    description: 'Our flagship vessel for major quarterly celebrations'
  }
];

const packageOptions = [
  {
    name: 'Standard Package',
    icon: Ship,
    description: 'The boat, the captain, and the lake',
    features: [
      'Licensed, experienced captain',
      'Premium Bluetooth sound system',
      'Large empty coolers (bring ice)',
      'Clean restroom facilities',
      'Sun and shade seating areas',
      'BYOB friendly (cans/plastic only)'
    ],
    badge: 'Great Value',
    color: 'blue'
  },
  {
    name: 'Essentials Package',
    icon: Package,
    description: 'Enhanced convenience for your quarterly team outing Austin',
    features: [
      'Everything from Standard Package',
      'Coolers pre-stocked with ice',
      '5-gallon insulated water dispenser',
      'Solo cups and ice water',
      '6-foot folding table for food & drinks',
      'Alcohol delivery coordination available'
    ],
    badge: 'Most Popular',
    color: 'yellow',
    popular: true
  },
  {
    name: 'Ultimate Package',
    icon: Crown,
    description: 'Full party atmosphere for corporate boat party Lake Travis events',
    features: [
      'Everything from Essentials Package',
      'Giant lily pad float',
      'Guest of honor float (unicorn or ring)',
      'Disco ball cups for party vibes',
      'Bubble guns and bubble wands',
      'Champagne flutes and fruit juices',
      'SPF-50 spray sunscreen',
      'Plates, plasticware, paper towels'
    ],
    badge: 'All-Inclusive VIP',
    color: 'purple'
  }
];

const faqs = [
  {
    question: 'How do recurring quarterly bookings work with Premier Party Cruises?',
    answer: 'We make quarterly team outing Austin planning simple. Book all four events at once and we store your preferences, dietary notes, and setup details. Each quarter, we reach out to confirm dates and any adjustments. Many companies lock in their corporate boat party Lake Travis schedule for the whole year.'
  },
  {
    question: 'Do you offer discounts for booking multiple quarterly events?',
    answer: 'Yes! Companies that commit to quarterly team building Lake Travis events receive package pricing. Contact us for custom quotes based on your group size and frequency. The more you book, the more you save on company event ideas Austin teams love.'
  },
  {
    question: 'Can we change the boat size between quarters?',
    answer: 'Absolutely. Your quarterly team outing Austin might be smaller in Q1 (just leadership) and larger in Q4 (full company). We have boats from 14 to 75 guests to accommodate different group sizes throughout the year.'
  },
  {
    question: 'What if we need to reschedule one of our quarterly events?',
    answer: 'We understand plans change. With advance notice, we offer flexible rescheduling for your corporate boat party Lake Travis events. Weather cancellations are always fully refunded or rescheduled at no additional cost.'
  },
  {
    question: 'How far in advance should we book quarterly events?',
    answer: 'For the best selection, we recommend booking your annual schedule 2-3 months ahead. Popular dates for team building Lake Travis fill quickly, especially summer months and holiday season. Lock in dates early to secure your preferred times.'
  },
  {
    question: 'Can each quarterly event have a different theme?',
    answer: 'Yes! Many companies theme their company event ideas Austin around each season - spring kickoffs, summer celebrations, fall retreats, and holiday parties. We can help coordinate decorations and setup for each unique quarterly team outing Austin event.'
  },
  {
    question: 'What activities work best for quarterly team building?',
    answer: 'Our corporate boat party Lake Travis experience offers swimming, floating on giant lily pads, networking time, and scenic cruising. Many teams use the relaxed atmosphere for goal-setting, recognition ceremonies, or simply unwinding together on team building Lake Travis outings.'
  },
  {
    question: 'Do you handle catering for quarterly events?',
    answer: 'All cruises are BYOB. You can bring your own food and drinks, or we can connect you with local Austin caterers. For recurring quarterly team outing Austin events, many companies establish relationships with caterers we recommend.'
  }
];

export default function QuarterlyOutingsLakeTravis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/quarterly-outings-lake-travis-make-routine-company-events-easy"
        defaultTitle="Quarterly Team Outings Austin | Corporate Boat Party Lake Travis | Premier Party Cruises"
        defaultDescription="Make routine company events easy with Premier's quarterly boat packages. Plan team building Lake Travis outings, corporate boat party events, and company event ideas Austin businesses love. Book all 4 seasons!"
        defaultKeywords={['quarterly team outing Austin', 'corporate boat party Lake Travis', 'company event ideas Austin', 'team building Lake Travis', 'quarterly corporate events', 'recurring company outings', 'seasonal team events Austin']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Quarterly Team Outings Austin - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold" data-testid="badge-quarterly-events">
              QUARTERLY CORPORATE EVENTS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Quarterly Team Outings Austin
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Make Routine Company Events Easy with Premier's Boat Packages
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Transform your corporate boat party Lake Travis experience into a year-round tradition. 
              Book all four seasons and enjoy simplified planning with team building Lake Travis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6"
                  data-testid="button-plan-quarterly-events"
                >
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Plan Quarterly Events
                </Button>
              </Link>
              <Link href="/team-building">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                  data-testid="button-view-team-building"
                >
                  View Team Building Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <img 
            src={heroImage} 
            alt="Quarterly corporate outing boat party Lake Travis Austin team event" 
            className="hidden"
          />
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            See our complete guide to{' '}
            <Link href="/corporate-events" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin corporate event boats</Link>{' '}
            for team building, client entertainment, and company celebrations on Lake Travis.
          </p>
        </div>
      </div>


        {/* Why Quarterly vs Annual Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Quarterly Team Outings Beat Annual Events</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Annual company parties are great, but quarterly team outing Austin events create 
                lasting culture. Here's why more companies are choosing regular team building Lake Travis experiences.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quarterlyBenefits.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
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

        {/* Stats Section */}
        <section className="py-12 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyLakeTravis.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400">{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose a Boat Every Time Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">WHY CHOOSE A BOAT EVERY TIME?</Badge>
                  <h2 className="text-3xl font-bold mb-6">Consistency Makes Planning Easy</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    When you commit to quarterly team outing Austin events on the water, everything 
                    gets simpler. Same vendor, stored preferences, negotiated rates. Your corporate boat 
                    party Lake Travis becomes a well-oiled machine.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      'One trusted vendor relationship',
                      'Stored preferences and dietary notes',
                      'Negotiated package pricing for company event ideas Austin',
                      'Priority booking for peak dates',
                      'Consistent quality every quarter',
                      'Streamlined invoicing and budgeting'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/client-entertainment">
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                      data-testid="button-client-entertainment"
                    >
                      <Handshake className="mr-2 h-5 w-5" />
                      Client Entertainment Options
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Company quarterly outing Lake Travis boat cruise Austin team building"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Repeat className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Recurring Booking</p>
                        <p className="text-xs text-gray-500">Set it and forget it</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Seasonal Themes Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Seasonal Themes for Every Quarter</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Make each quarterly team outing Austin event unique with seasonal themes. 
                Your corporate boat party Lake Travis can reflect the energy of each season.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasonalThemes.map((theme, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-12 h-12 ${theme.bg} rounded-full flex items-center justify-center`}>
                          <theme.icon className={`h-6 w-6 ${theme.color}`} />
                        </div>
                        <Badge variant="outline" className="font-bold">{theme.season}</Badge>
                      </div>
                      <CardTitle className="text-lg">{theme.title}</CardTitle>
                      <p className="text-sm text-gray-500">{theme.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {theme.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
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

        {/* How Premier Makes It Easy Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
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
                      src={sectionImage2}
                      alt="Austin corporate event quarterly team outing party boat Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">HOW PREMIER MAKES IT EASY</Badge>
                  <h2 className="text-3xl font-bold mb-6">Recurring Booking Benefits</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    When you book quarterly team outing Austin events with Premier, we remember 
                    everything. Your corporate boat party Lake Travis preferences are stored and 
                    ready for each event.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { title: 'Stored Preferences', desc: 'We remember your setup, music, and catering contacts' },
                      { title: 'Package Discounts', desc: 'Save with multi-event company event ideas Austin pricing' },
                      { title: 'Priority Dates', desc: 'First pick of prime team building Lake Travis dates' },
                      { title: 'Dedicated Contact', desc: 'Same coordinator for all your events' }
                    ].map((item, index) => (
                      <Card key={index} className="bg-white/10 border-white/20">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-white">{item.title}</h4>
                          <p className="text-white/70 text-sm mt-1">{item.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/company-milestone">
                    <Button 
                      size="lg" 
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold"
                      data-testid="button-milestone-events"
                    >
                      <Trophy className="mr-2 h-5 w-5" />
                      Milestone Celebration Ideas
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">BOAT OPTIONS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Boats for Every Quarterly Team Outing Austin</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Your team size may vary quarter to quarter. Our fleet accommodates everything 
                    from intimate leadership retreats to full company celebrations. Every corporate 
                    boat party Lake Travis includes a professional captain and crew.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {boatOptions.map((boat, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-lg">{boat.name}</h4>
                            <Badge variant="outline" className="text-blue-600">{boat.capacity}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-1">{boat.best}</p>
                          <p className="text-sm text-gray-600">{boat.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/private-cruises">
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                      data-testid="button-view-fleet"
                    >
                      <Ship className="mr-2 h-5 w-5" />
                      View Full Fleet
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Lake Travis quarterly company party boat corporate team celebration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">14-75 Guests</p>
                        <p className="text-xs text-gray-500">Flexible capacity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Choose Your Package for Team Building Lake Travis</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Every quarterly team outing Austin event can be customized with our three package tiers. 
                Choose the same package each quarter or mix it up for variety.
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              {packageOptions.map((pkg, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className={`h-full hover:shadow-lg transition-shadow ${pkg.popular ? 'border-2 border-yellow-400 relative' : ''}`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-yellow-400 text-black font-bold">{pkg.badge}</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <div className={`w-16 h-16 mx-auto mb-4 bg-${pkg.color}-100 rounded-full flex items-center justify-center`}>
                        <pkg.icon className={`h-8 w-8 text-${pkg.color}-600`} />
                      </div>
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <p className="text-sm text-gray-500">{pkg.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
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

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* Internal Links Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Company Event Ideas Austin</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Your quarterly team outing Austin events can include any of these experiences. 
                Mix and match throughout the year for variety.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Team Building', href: '/team-building', description: 'Build stronger teams with team building Lake Travis activities', icon: Users },
                { title: 'Client Entertainment', href: '/client-entertainment', description: 'Impress clients with corporate boat party Lake Travis experiences', icon: Handshake },
                { title: 'Company Milestones', href: '/company-milestone', description: 'Celebrate achievements with company event ideas Austin style', icon: Trophy },
                { title: 'Private Cruises', href: '/private-cruises', description: 'Explore our full fleet for quarterly team outing Austin events', icon: Ship },
                { title: 'Corporate Events', href: '/corporate-events', description: 'Full corporate boat party Lake Travis planning guide', icon: Building2 }
              ].map((link, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-blue-200 border-2">
                      <CardContent className="pt-6">
                        <link.icon className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="font-bold text-lg mb-2">{link.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{link.description}</p>
                        <div className="flex items-center gap-1 text-blue-600 mt-4 font-semibold text-sm">
                          Learn More <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about quarterly team outing Austin and corporate boat party Lake Travis events
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
                  data-testid={`accordion-faq-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline" data-testid={`accordion-trigger-${index}`}>
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
        <section className="py-16 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Book Your Quarterly Team Outing Austin Events?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your team building Lake Travis schedule. We'll help you 
                plan all four quarters and save with our corporate boat party Lake Travis packages.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6"
                    data-testid="button-get-quote"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Get Your Quarterly Quote
                  </Button>
                </Link>
                <a href="tel:5124885892">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                    data-testid="button-call-now"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 488-5892
                  </Button>
                </a>
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

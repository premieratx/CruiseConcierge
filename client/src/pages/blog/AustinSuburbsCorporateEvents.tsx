import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Car, Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-5_1760072938923.jpg';
import sectionImage1 from '@assets/@capitalcityshots-16_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-17_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-18_1760080740021.jpg';

const suburbBenefits = [
  { 
    icon: Car, 
    title: 'Easy Drive from Round Rock', 
    description: 'Your Round Rock corporate event is just 30-40 minutes from Lake Travis boat party fun',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Navigation, 
    title: 'Quick Access from Cedar Park', 
    description: 'Cedar Park team building groups reach us in only 20-30 minutes',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Trophy, 
    title: 'Escape the Office Park', 
    description: 'Leander company party planners love getting teams out of suburban offices',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Handshake, 
    title: 'Austin Suburbs Boat Party', 
    description: 'The ultimate Austin suburbs boat party Lake Travis experience awaits',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const suburbLocations = [
  {
    name: 'Round Rock',
    driveTime: '30-40 minutes',
    directions: 'Take I-35 South to US-183 West, then TX-71 West to Lakeway',
    highlights: ['Tech corridor companies', 'Growing business hub', 'Easy highway access']
  },
  {
    name: 'Cedar Park',
    driveTime: '20-30 minutes',
    directions: 'Take US-183 South to TX-71 West, follow to Lakeway Marina',
    highlights: ['Closest suburb to Lake Travis', 'Thriving business community', 'Direct route available']
  },
  {
    name: 'Leander',
    driveTime: '25-35 minutes',
    directions: 'Take US-183 South through Cedar Park to TX-71 West',
    highlights: ['Fast-growing area', 'Many tech startups', 'Beautiful scenic drive']
  },
  {
    name: 'Georgetown',
    driveTime: '40-50 minutes',
    directions: 'Take I-35 South to US-183 West, continue to Lake Travis',
    highlights: ['Historic downtown area', 'Corporate headquarters', 'Worth the drive']
  }
];

const whySuburbsChooseUs = [
  { stat: '20-40', label: 'Minutes from Austin Suburbs' },
  { stat: '14-75', label: 'Guest Capacity Options' },
  { stat: '100%', label: 'Private Charter Experience' },
  { stat: '5-Star', label: 'Google Review Rating' }
];

const faqs = [
  {
    question: 'How long does it take to get to Lake Travis from Round Rock for a corporate event?',
    answer: 'A Round Rock corporate event group can reach our marina in about 30-40 minutes via I-35 and US-183. We recommend leaving a bit early during rush hour. Many Round Rock corporate event planners love that the drive itself becomes part of the team bonding experience.'
  },
  {
    question: 'Is Cedar Park team building on Lake Travis worth the drive?',
    answer: 'Absolutely! Cedar Park team building groups are some of our most frequent guests. At just 20-30 minutes away, Cedar Park team building on the water is an easy escape from the office. Cedar Park team building events consistently get rave reviews from participants.'
  },
  {
    question: 'Can Leander companies book boat parties?',
    answer: 'Yes! We host many Leander company party events throughout the year. A Leander company party on Lake Travis offers a unique experience that employees remember. The drive from Leander to our marina is scenic and straightforward, making Leander company party planning stress-free.'
  },
  {
    question: 'What makes Austin suburbs boat party Lake Travis events special?',
    answer: 'An Austin suburbs boat party Lake Travis experience offers something you can\'t get at a restaurant or conference room. Austin suburbs boat party Lake Travis events let teams unwind on the water, swim, and connect in a relaxed atmosphere. Many Austin suburbs boat party Lake Travis organizers say it\'s their best team event ever.'
  },
  {
    question: 'Do you offer corporate packages for suburban Austin companies?',
    answer: 'Yes! We work with companies from Round Rock, Cedar Park, Leander, Georgetown, Pflugerville, and beyond. Our corporate packages include private boat charter, professional crew, and all the amenities your team needs for a memorable event.'
  },
  {
    question: 'What should we bring for a corporate boat party?',
    answer: 'All our cruises are BYOB. Bring your own food, drinks, and coolers. We provide ice, giant lily pad floats for swimming, and a premium sound system. We recommend finger foods that are easy to serve on the boat.'
  },
  {
    question: 'How do we get to the marina from Pflugerville or Georgetown?',
    answer: 'From Pflugerville, take US-183 West to TX-71 West (about 35-45 minutes). From Georgetown, take I-35 South to US-183 West (about 40-50 minutes). Both routes offer easy highway driving with minimal traffic outside rush hour.'
  },
  {
    question: 'Can we book for just our department or does it need to be company-wide?',
    answer: 'We host events of all sizes! Our smallest boat fits 14 guests, perfect for department outings. Our largest accommodates 75, ideal for company-wide celebrations. Many Round Rock corporate event planners start with a department cruise and then bring the whole company back.'
  }
];

const packageOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Small team outings' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Department events' },
  { name: 'Clever Girl', capacity: '50 guests', best: 'Large team retreats' },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Company-wide events' }
];

const perfectForCompanies = [
  'Tech startups in Round Rock',
  'Healthcare companies in Cedar Park',
  'Financial firms in Georgetown',
  'Manufacturing teams from Pflugerville',
  'Retail headquarters in Leander',
  'Lakeway-based businesses'
];

export default function AustinSuburbsCorporateEvents() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/austin-suburbs-corporate-events"
        defaultTitle="Austin Suburb Corporate Events – Round Rock, Cedar Park, Leander | Lake Travis Boat Parties"
        defaultDescription="Plan your Round Rock corporate event, Cedar Park team building, or Leander company party on Lake Travis. Austin suburbs boat party Lake Travis experiences for corporate groups. Private charters for 14-75 guests."
        defaultKeywords={['Round Rock corporate event', 'Cedar Park team building', 'Leander company party', 'Austin suburbs boat party Lake Travis', 'Georgetown corporate events', 'Pflugerville team building', 'Lake Travis corporate cruise']}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="austin-suburbs-corporate-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Austin Suburb Corporate Events – Round Rock, Cedar Park, Leander - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              AUSTIN SUBURBS SPOTLIGHT
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Corporate Events for Round Rock, Cedar Park & Beyond
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              The Perfect Lake Travis Escape for Austin Area Companies
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Whether you're planning a Round Rock corporate event, Cedar Park team building retreat, or Leander company party – Lake Travis is closer than you think.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6"
                  data-testid="button-plan-corporate-event"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Corporate Event
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                  data-testid="button-view-corporate-options"
                >
                  View Corporate Options
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
            See our complete guide to{' '}
            <Link href="/corporate-events" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin corporate event boats</Link>{' '}
            for team building, client entertainment, and company celebrations on Lake Travis.
          </p>
        </div>
      </div>


        {/* Hero Image Display */}
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage}
                alt="Round Rock corporate event Cedar Park team building Lake Travis boat party"
                className="w-full h-auto object-cover"
                data-testid="img-hero-corporate"
              />
            </div>
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
              <h2 className="text-3xl font-bold mb-4">Lake Travis: The Perfect Escape for Austin Area Companies</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From Round Rock corporate event gatherings to Cedar Park team building retreats, Austin suburbs boat party Lake Travis experiences create lasting memories
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {suburbBenefits.map((item, index) => (
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
        <section className="py-12 bg-blue-900 text-white" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whySuburbsChooseUs.map((item, index) => (
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

        {/* Round Rock Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="round-rock-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">ROUND ROCK COMPANIES</Badge>
                  <h2 className="text-3xl font-bold mb-6">Easy Access from Round Rock</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Planning a Round Rock corporate event? Lake Travis is just 30-40 minutes away via I-35 and US-183. 
                    Many Round Rock corporate event organizers tell us the scenic drive becomes part of the experience – 
                    a chance for the team to decompress before hitting the water.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Your Round Rock corporate event on our boats offers something no conference room can match. 
                    Teams swim, relax on giant lily pads, and connect in ways that strengthen working relationships. 
                    Book your Round Rock corporate event today and see why so many tech corridor companies choose us.
                  </p>
                  
                  <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-blue-500" />
                      Driving Directions from Round Rock
                    </h4>
                    <p className="text-gray-600">
                      Take I-35 South to US-183 West, then TX-71 West to Lakeway. Follow signs to marina. 
                      Total drive: approximately 30-40 minutes.
                    </p>
                  </div>
                  
                  <Link href="/team-building">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-team-building-round-rock">
                      <Target className="mr-2 h-5 w-5" />
                      View Team Building Options
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Round Rock corporate event team enjoying Lake Travis boat party"
                      className="w-full h-full object-cover"
                      data-testid="img-round-rock-section"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">30-40 Minutes</p>
                        <p className="text-xs text-gray-500">From Round Rock</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Cedar Park Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="cedar-park-section">
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
                      alt="Cedar Park team building corporate group on Lake Travis party boat"
                      className="w-full h-full object-cover"
                      data-testid="img-cedar-park-section"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">CEDAR PARK TEAMS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Easy Access from Cedar Park</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Cedar Park team building events are our specialty! At just 20-30 minutes from Lake Travis, 
                    Cedar Park team building groups have the easiest commute of any Austin suburb. 
                    That's why Cedar Park team building planners book with us again and again.
                  </p>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    Whether it's a quarterly outing or annual celebration, Cedar Park team building on the water 
                    offers the perfect escape from the office. Cedar Park team building activities on our boats 
                    include swimming, floating, music, and genuine team connection.
                  </p>
                  
                  <div className="bg-white/10 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-yellow-400" />
                      Driving Directions from Cedar Park
                    </h4>
                    <p className="text-white/80">
                      Take US-183 South to TX-71 West, follow to Lakeway Marina. 
                      Total drive: approximately 20-30 minutes.
                    </p>
                  </div>
                  
                  <Link href="/client-entertainment">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-client-entertainment">
                      <Handshake className="mr-2 h-5 w-5" />
                      Client Entertainment Options
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Leander & More Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="leander-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">LEANDER & BEYOND</Badge>
                  <h2 className="text-3xl font-bold mb-6">Perfect for Leander, Georgetown, Pflugerville & Lakeway Companies</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Planning a Leander company party? You're not alone! Leander company party events have grown 
                    as the city has boomed. A Leander company party on Lake Travis shows your team you value 
                    unique experiences over boring conference rooms.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Beyond Leander company party events, we host groups from Georgetown, Pflugerville, and Lakeway regularly. 
                    The Austin suburbs boat party Lake Travis experience is perfect for companies who want to 
                    break free from the typical office park routine.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {suburbLocations.map((location, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-800">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-blue-600">{location.name}</h4>
                          <p className="text-sm text-gray-500">{location.driveTime}</p>
                          <ul className="mt-2 space-y-1">
                            {location.highlights.slice(0, 2).map((highlight, idx) => (
                              <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-view-private-cruises">
                      <Ship className="mr-2 h-5 w-5" />
                      View Private Cruises
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Leander company party Austin suburbs boat party Lake Travis corporate event"
                      className="w-full h-full object-cover"
                      data-testid="img-leander-section"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">All Austin Suburbs</p>
                        <p className="text-xs text-gray-500">Welcome here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Why Suburban Companies Love Boat Events */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="why-love-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Suburban Companies Love Boat Events</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Escape the office park and create real connections on the water
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Break the Routine',
                  description: 'Your Round Rock corporate event or Cedar Park team building outing becomes the highlight of the quarter when it\'s on Lake Travis.',
                  icon: Award
                },
                {
                  title: 'Real Team Bonding',
                  description: 'Forget trust falls. Swimming together, sharing food, and enjoying Austin suburbs boat party Lake Travis vibes creates genuine connections.',
                  icon: Users
                },
                {
                  title: 'Memorable Experiences',
                  description: 'A Leander company party on a boat beats any restaurant. Employees will talk about their Austin suburbs boat party Lake Travis trip for years.',
                  icon: Star
                },
                {
                  title: 'Stress-Free Planning',
                  description: 'We handle everything for your Round Rock corporate event. Just bring your team, food, and drinks – we provide the rest.',
                  icon: CheckCircle2
                },
                {
                  title: 'Flexible Options',
                  description: 'From 14-person department outings to 75-guest company-wide Cedar Park team building events, we have the right boat.',
                  icon: Ship
                },
                {
                  title: 'Perfect Location',
                  description: 'Lake Travis is central to Round Rock, Cedar Park, Leander, Georgetown, and Pflugerville. Everyone can get there easily.',
                  icon: MapPin
                }
              ].map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <item.icon className="h-6 w-6 text-blue-600" />
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

        {/* Boat Options Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-400 text-black">OUR FLEET</Badge>
                <h2 className="text-3xl font-bold mb-4">Boats for Every Team Size</h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  From intimate Round Rock corporate event gatherings to large-scale Cedar Park team building celebrations
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {packageOptions.map((boat, index) => (
                  <Card key={index} className="bg-white/10 border-white/20">
                    <CardContent className="p-6 text-center">
                      <Ship className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
                      <h4 className="font-bold text-white text-lg">{boat.name}</h4>
                      <p className="text-yellow-400 font-semibold">{boat.capacity}</p>
                      <p className="text-white/70 text-sm mt-2">{boat.best}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-view-all-boats">
                    <Ship className="mr-2 h-5 w-5" />
                    View All Boats
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="perfect-for-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-8">Perfect for Companies From</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {perfectForCompanies.map((company, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-700 text-sm py-2 px-4">
                    {company}
                  </Badge>
                ))}
              </div>
            </m.div>
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
              <h2 className="text-3xl font-bold mb-4">FAQs for Austin Area Corporate Groups</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about Round Rock corporate event planning, Cedar Park team building, and Austin suburbs boat party Lake Travis experiences
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border px-6"
                  data-testid={`accordion-item-faq-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline">
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
        <section className="py-16 bg-gradient-to-br from-blue-900 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Plan Your Austin Suburbs Corporate Event?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Whether it's a Round Rock corporate event, Cedar Park team building retreat, or Leander company party – 
                we'll help you create an unforgettable Austin suburbs boat party Lake Travis experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6"
                    data-testid="button-get-quote-cta"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <a href="tel:5127270422">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                    data-testid="button-call-cta"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 727-0422
                  </Button>
                </a>
              </div>
            </m.div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 bg-white dark:bg-gray-900" data-testid="internal-links-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/team-building">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Team Building</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/client-entertainment">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <Handshake className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Client Entertainment</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/private-cruises">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <Ship className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Private Cruises</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/corporate-events">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <Building2 className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Corporate Events</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}

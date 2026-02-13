import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Music, Sparkles,
  PartyPopper, UtensilsCrossed, Camera, Crown, Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/clever-girl-50-person-boat.webp';
import sectionImage1 from '@assets/@capitalcityshots-25_1760080807866.jpg';
import sectionImage2 from '@assets/@capitalcityshots-26_1760080807866.jpg';
import sectionImage3 from '@assets/@capitalcityshots-27_1760080807866.jpg';
import sectionImage4 from '@assets/@capitalcityshots-28_1760080807867.jpg';

const takeoverBenefits = [
  { 
    icon: Crown, 
    title: 'Maximum Capacity', 
    description: 'Our Clever Girl boat holds the full 75 person corporate event Austin maximum for ultimate impact',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Sparkles, 
    title: '14 Disco Balls', 
    description: 'Transform your large company party Lake Travis into an unforgettable celebration on the water',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Flag, 
    title: 'Giant Texas Flag', 
    description: 'The iconic 8-foot Texas flag makes your corporate bash boat Austin truly legendary',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  { 
    icon: PartyPopper, 
    title: 'Full Takeover', 
    description: 'Book the entire vessel for your 75 guest event Lake Travis with private charter exclusivity',
    color: 'text-green-600',
    bg: 'bg-green-100'
  }
];

const cleverGirlFeatures = [
  {
    title: 'Flagship Open Deck',
    description: 'The largest outdoor space on Lake Travis for your 75 person corporate event Austin',
    features: [
      '360-degree panoramic views',
      'Massive open air dance floor with arch canopy',
      'Multiple seating zones',
      'Perfect for team photos'
    ]
  },
  {
    title: 'Climate-Controlled Cabin',
    description: 'Premium indoor space accommodating your full large company party Lake Travis',
    features: [
      'Full AC/heating system',
      'Luxury lounge seating',
      'Built-in bar stations',
      'Year-round comfort'
    ]
  },
  {
    title: 'Premium Sound System',
    description: 'DJ-quality audio that turns your corporate bash boat Austin into an epic celebration',
    features: [
      'Bluetooth connectivity',
      'Multiple speaker zones',
      'Wireless microphone',
      'Crystal clear audio'
    ]
  },
  {
    title: 'Signature Features',
    description: 'The extras that make your 75 guest event Lake Travis absolutely unforgettable',
    features: [
      '14 disco balls',
      'Giant Texas flag',
      'LED lighting throughout',
      'Instagram-worthy moments'
    ]
  }
];

const eventStats = [
  { stat: '75', label: 'Maximum Guests' },
  { stat: '14', label: 'Disco Balls' },
  { stat: '8ft', label: 'Texas Flag' },
  { stat: '5-Star', label: 'Reviews' }
];

const perfectForEvents = [
  { name: 'Full Company Celebrations', desc: 'Bring everyone together for maximum impact' },
  { name: 'Annual Meetings', desc: 'Combine business with unforgettable team bonding' },
  { name: 'Major Milestones', desc: 'IPOs, acquisitions, and company anniversaries' },
  { name: 'Holiday Mega-Parties', desc: 'Year-end celebrations that nobody forgets' },
  { name: 'Product Launches', desc: 'Make announcements in spectacular style' },
  { name: 'Client Appreciation', desc: 'Impress your top accounts all at once' }
];

const coordinationServices = [
  {
    title: 'Event Planning',
    tips: [
      'Dedicated event coordinator',
      'Custom timeline creation',
      'Vendor recommendations',
      'Day-of support included'
    ]
  },
  {
    title: 'Catering Coordination',
    tips: [
      'Partner caterer connections',
      'Menu planning assistance',
      'Serving logistics handled',
      'BYOB alcohol policy'
    ]
  },
  {
    title: 'Entertainment Options',
    tips: [
      'DJ recommendations available',
      'Live music coordination',
      'Photo booth partners',
      'Custom playlist setup'
    ]
  },
  {
    title: 'Transportation',
    tips: [
      'Marina parking for 75+ cars',
      'Charter bus coordination',
      'Rideshare staging area',
      'Clear guest directions'
    ]
  },
  {
    title: 'Group Activities',
    tips: [
      'Giant lily pad floats',
      'Swimming stops included',
      'Team photo coordination',
      'Sunset viewing times'
    ]
  },
  {
    title: 'Communication',
    tips: [
      'Guest info templates',
      'Timing coordination',
      'Weather monitoring',
      'Day-of crew briefing'
    ]
  }
];

const faqs = [
  {
    question: 'What is the maximum capacity for a 75 person corporate event Austin?',
    answer: 'Our Clever Girl flagship boat holds exactly 75 guests maximum for your 75 person corporate event Austin. This is the largest capacity on Lake Travis for a private charter, making it perfect for large company party Lake Travis events where you need everyone together.'
  },
  {
    question: 'How do I coordinate catering for a 75 guest event Lake Travis?',
    answer: 'All corporate bash boat Austin cruises are BYOB. We can connect you with experienced local caterers who specialize in boat events. For 75 guests, we recommend heavy appetizers or boxed meals. Our team helps coordinate delivery timing and serving logistics for your large company party Lake Travis.'
  },
  {
    question: 'What makes the Clever Girl perfect for 75 person corporate events?',
    answer: 'The Clever Girl is our flagship vessel featuring 14 disco balls, a giant 8-foot Texas flag, premium sound system, and the largest deck space on Lake Travis. With 75 person maximum capacity, it\'s the only boat that can handle your full corporate bash boat Austin without splitting the group.'
  },
  {
    question: 'How far in advance should I book a 75 guest event Lake Travis?',
    answer: 'For 75 person corporate event Austin bookings, we strongly recommend 4-6 weeks advance notice. The Clever Girl is our most popular boat for large company party Lake Travis events, and prime dates fill quickly. Contact us early to secure your preferred date.'
  },
  {
    question: 'What activities work best for 75-person corporate events?',
    answer: 'Your 75 guest event Lake Travis includes swimming stops with giant lily pad floats, dancing under 14 disco balls, sunset cruises, and plenty of networking space. Many companies add CEO addresses, team awards, and group photos at our designated photo spots.'
  },
  {
    question: 'Is there parking for 75 guests at the marina?',
    answer: 'Yes! Our marina has ample free parking for your entire large company party Lake Travis. We also coordinate with charter bus companies and have a dedicated rideshare staging area for your corporate bash boat Austin event.'
  },
  {
    question: 'What happens if weather affects our 75 person corporate event Austin?',
    answer: 'Safety is our top priority for every 75 guest event Lake Travis. If conditions require cancellation, we offer full rescheduling or refunds. Our team monitors forecasts closely and communicates proactively about any weather concerns.'
  },
  {
    question: 'Do you provide event coordination for large company parties?',
    answer: 'Absolutely! Every corporate bash boat Austin with 75 guests includes dedicated event coordination. We help with timelines, vendor connections, catering logistics, and day-of support to ensure your large company party Lake Travis runs smoothly.'
  },
  {
    question: 'Can we customize the experience for our 75 person corporate event Austin?',
    answer: 'Every 75 guest event Lake Travis is fully customizable. From cruise timing to playlist preferences to special announcements, we work with you to create the perfect corporate bash boat Austin experience that matches your company culture.'
  },
  {
    question: 'What\'s included in the 75-person boat charter?',
    answer: 'Your large company party Lake Travis includes: private charter of the Clever Girl (3+ hours), professional captain and crew, 14 disco balls, giant Texas flag, premium sound system with Bluetooth, giant lily pad floats, coolers with ice, and free marina parking for all guests.'
  }
];

export default function CompanyParty75People() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/company-party-75-people-austin"
        defaultTitle="75 Person Corporate Event Austin | Large Company Party Lake Travis Boat"
        defaultDescription="Host the ultimate 75 person corporate event Austin on Lake Travis. Our Clever Girl flagship boat holds 75 guests with 14 disco balls and giant Texas flag. Book your corporate bash boat Austin today!"
        defaultKeywords={['75 person corporate event Austin', 'large company party Lake Travis', 'corporate bash boat Austin', '75 guest event Lake Travis', 'corporate party boat', 'Austin company celebration', 'Lake Travis corporate event']}
        image="https://premierpartycruises.com/assets/clever-girl-50-person-boat.webp"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="page-company-party-75-people">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-amber-900 via-purple-800 to-slate-900 text-white overflow-hidden"
          data-testid="section-hero"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="75 Person Corporate Event Austin - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-400 text-black font-bold" data-testid="badge-hero">
              75 GUEST MAXIMUM CAPACITY
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="heading-hero">
              Hosting a 75-Person Corporate Bash – The Ultimate Lake Travis Takeover
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Maximum Capacity, Maximum Impact – The Largest 75 Person Corporate Event Austin Experience
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              When your entire company needs to celebrate together, our flagship Clever Girl with 14 disco balls and giant Texas flag delivers the ultimate large company party Lake Travis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-hero-quote">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your 75-Person Takeover
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-hero-corporate">
                  View Corporate Packages
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


        {/* Hero Image Section */}
        <section className="relative -mt-8 z-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage}
                alt="75 person corporate event boat Lake Travis Austin large company bash Clever Girl"
                className="w-full h-auto object-cover"
                data-testid="img-hero-clever-girl"
              />
            </div>
          </div>
        </section>

        {/* Takeover Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-benefits">The Ultimate Lake Travis Takeover</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                When you book a 75 person corporate event Austin, you're commanding the largest private charter on Lake Travis. This is the corporate bash boat Austin experience your team deserves.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {takeoverBenefits.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-amber-200" data-testid={`card-benefit-${index}`}>
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
        <section className="py-12 bg-amber-900 text-white" data-testid="section-stats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {eventStats.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400" data-testid={`stat-value-${index}`}>{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Clever Girl Flagship Features Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-clever-girl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-amber-100 text-amber-700">CLEVER GIRL FLAGSHIP</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-clever-girl">Built for the Ultimate 75 Person Corporate Event Austin</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    The Clever Girl is our flagship vessel – the crown jewel of Lake Travis party boats. With 75 person maximum capacity, 
                    14 disco balls, and the iconic giant Texas flag, your large company party Lake Travis will be absolutely legendary. 
                    No other corporate bash boat Austin comes close to this level of impact.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {cleverGirlFeatures.map((feature, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`card-feature-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{feature.description}</p>
                          <ul className="space-y-1">
                            {feature.features.slice(0, 2).map((f, idx) => (
                              <li key={idx} className="text-xs text-amber-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="75 guest event Lake Travis large company party boat cruise corporate celebration"
                      className="w-full h-full object-cover"
                      data-testid="img-section-1"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Crown className="h-8 w-8 text-amber-500" />
                      <div>
                        <p className="font-bold text-sm">75 Guest Max</p>
                        <p className="text-xs text-gray-500">Flagship capacity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-gradient-to-br from-amber-900 via-purple-800 to-slate-900 text-white" data-testid="section-perfect-for">
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
                      alt="75 person corporate event Austin full company celebration boat party"
                      className="w-full h-full object-cover"
                      data-testid="img-section-2"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">MEGA EVENTS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-perfect-for">75 Guest Event Lake Travis – Perfect For Full Company Celebrations</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    When you need your entire company together for a large company party Lake Travis, nothing else delivers 
                    the same wow factor as a 75 person corporate event Austin on our flagship Clever Girl.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {perfectForEvents.map((event, index) => (
                      <Card key={index} className="bg-white/10 border-white/20" data-testid={`card-event-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-white">{event.name}</h4>
                          <p className="text-white/70 text-xs mt-1">{event.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/team-building">
                      <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-team-building">
                        <Users className="mr-2 h-5 w-5" />
                        Team Building
                      </Button>
                    </Link>
                    <Link href="/client-entertainment">
                      <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold" data-testid="button-client-entertainment">
                        <Handshake className="mr-2 h-5 w-5" />
                        Client Entertainment
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* All-Inclusive Coordination Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-coordination">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">ALL-INCLUSIVE COORDINATION</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-coordination">Corporate Bash Boat Austin – Full-Service Event Support</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Planning a 75 person corporate event Austin requires expert coordination. Every large company party Lake Travis 
                    includes dedicated event support to handle all the details so you can focus on celebrating.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Private flagship charter (3+ hours)',
                      'Professional captain and full crew',
                      'Dedicated event coordinator',
                      '14 disco balls + giant Texas flag',
                      'Premium sound system with Bluetooth',
                      'Giant lily pad floats included',
                      'BYOB with catering coordination',
                      'Free marina parking for 75+ cars'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-white font-bold" data-testid="button-private-cruises">
                      <Ship className="mr-2 h-5 w-5" />
                      View Private Cruise Details
                    </Button>
                  </Link>
                </div>
                
                <div>
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-xl mb-6">
                    <img 
                      src={sectionImage3}
                      alt="Corporate bash boat Austin 75 guest event Lake Travis coordination services"
                      className="w-full h-full object-cover"
                      data-testid="img-section-3"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {coordinationServices.slice(0, 4).map((service, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-800" data-testid={`card-service-${index}`}>
                        <CardContent className="p-3">
                          <h4 className="font-bold text-xs mb-2">{service.title}</h4>
                          <ul className="space-y-1">
                            {service.tips.slice(0, 2).map((tip, idx) => (
                              <li key={idx} className="text-xs text-gray-500 flex items-center gap-1">
                                <CheckCircle2 className="h-2 w-2 text-green-500" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-gallery">See Your 75 Guest Event Lake Travis In Action</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our large company party Lake Travis events create memories that last. Here's what your corporate bash boat Austin could look like.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage1}
                  alt="75 person corporate event Austin team celebration on flagship boat"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  data-testid="img-gallery-1"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage2}
                  alt="Large company party Lake Travis corporate group celebration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  data-testid="img-gallery-2"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage3}
                  alt="Corporate bash boat Austin disco ball celebration 75 guests"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  data-testid="img-gallery-3"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage4}
                  alt="75 guest event Lake Travis sunset corporate party cruise"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  data-testid="img-gallery-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-purple-700 text-white" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Crown className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-cta">Ready to Plan Your 75 Person Corporate Event Austin?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                The Clever Girl flagship is the only boat on Lake Travis that can accommodate your full large company party Lake Travis. 
                Book your corporate bash boat Austin today and secure your 75 guest event Lake Travis before your date is taken.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-amber-700 font-bold text-lg px-8 py-6" data-testid="button-cta-quote">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Get Your Quote Now
                  </Button>
                </Link>
                <Link href="/corporate-events">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-cta-corporate">
                    <Building2 className="mr-2 h-5 w-5" />
                    Corporate Event Details
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800" data-testid="section-links">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h3 className="text-xl font-bold text-center mb-8">Explore More Corporate Event Options</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/team-building">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="link-team-building">
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-bold">Team Building</h4>
                    <p className="text-sm text-gray-500">Build stronger teams on the water</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/client-entertainment">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="link-client-entertainment">
                  <CardContent className="p-4 text-center">
                    <Handshake className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-bold">Client Entertainment</h4>
                    <p className="text-sm text-gray-500">Impress your top accounts</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/private-cruises">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="link-private-cruises">
                  <CardContent className="p-4 text-center">
                    <Ship className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                    <h4 className="font-bold">Private Cruises</h4>
                    <p className="text-sm text-gray-500">Explore all boat options</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/corporate-events">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid="link-corporate-events">
                  <CardContent className="p-4 text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-bold">Corporate Events</h4>
                    <p className="text-sm text-gray-500">Full corporate packages</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-amber-100 text-amber-700">FAQ</Badge>
                <h2 className="text-3xl font-bold mb-4" data-testid="heading-faq">Frequently Asked Questions About 75 Person Corporate Events</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Everything you need to know about hosting your large company party Lake Travis on our flagship vessel.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border rounded-lg px-4 bg-gray-50 dark:bg-gray-800"
                    data-testid={`faq-item-${index}`}
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

              <div className="text-center mt-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Have more questions about your 75 person corporate event Austin? Our team is ready to help plan your corporate bash boat Austin.
                </p>
                <Link href="/chat">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-white font-bold" data-testid="button-faq-quote">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us Today
                  </Button>
                </Link>
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

import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Music, Sparkles,
  PartyPopper, UtensilsCrossed, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/clever-girl-50-person-boat.webp';
import sectionImage1 from '@assets/@capitalcityshots-21_1760080807864.jpg';
import sectionImage2 from '@assets/@capitalcityshots-22_1760080807865.jpg';
import sectionImage3 from '@assets/@capitalcityshots-23_1760080807865.jpg';
import sectionImage4 from '@assets/@capitalcityshots-24_1760080807866.jpg';

const bigGroupBenefits = [
  { 
    icon: Users, 
    title: 'Room for Everyone', 
    description: 'Our Clever Girl boat comfortably holds 50-75 guests for your 50 person company party Austin event',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Sparkles, 
    title: '14 Disco Balls', 
    description: 'Turn your large team event Lake Travis into an unforgettable dance party on the water',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Trophy, 
    title: 'Maximum Impact', 
    description: 'Create lasting memories with a company bash boat Austin experience your team will talk about',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: PartyPopper, 
    title: 'Celebration Ready', 
    description: 'Perfect venue for 50 guest boat rental Lake Travis company-wide celebrations',
    color: 'text-green-600',
    bg: 'bg-green-100'
  }
];

const cleverGirlFeatures = [
  {
    title: 'Spacious Open Deck',
    description: 'Expansive outdoor space perfect for mingling at your 50 person company party Austin',
    features: [
      '360-degree Lake Travis views',
      'Open air dance floor under arch canopy',
      'Multiple seating areas',
      'Perfect for group photos'
    ]
  },
  {
    title: 'Climate-Controlled Cabin',
    description: 'Comfortable indoor space for your large team event Lake Travis any time of year',
    features: [
      'Full AC/heating system',
      'Lounge seating throughout',
      'Built-in bar areas',
      'Escape from sun or rain'
    ]
  },
  {
    title: 'Premium Sound System',
    description: 'DJ-quality audio turns your company bash boat Austin into an epic party',
    features: [
      'Bluetooth connectivity',
      'Multiple speaker zones',
      'Microphone for toasts',
      'Crystal clear sound'
    ]
  },
  {
    title: '14 Disco Balls',
    description: 'The signature feature that makes your 50 guest boat rental Lake Travis unique',
    features: [
      'LED lighting throughout',
      'Party atmosphere guaranteed',
      'Instagram-worthy moments',
      'Day or sunset cruises'
    ]
  }
];

const eventStats = [
  { stat: '50-75', label: 'Guest Capacity' },
  { stat: '14', label: 'Disco Balls' },
  { stat: '3+ Hours', label: 'Cruise Duration' },
  { stat: '5-Star', label: 'Reviews' }
];

const perfectForEvents = [
  { name: 'Company Milestones', desc: 'Celebrate anniversaries and achievements' },
  { name: 'Department Outings', desc: 'Bond with your entire team at once' },
  { name: 'Holiday Parties', desc: 'Year-end celebrations with impact' },
  { name: 'Product Launches', desc: 'Announce in unforgettable style' },
  { name: 'Team Rewards', desc: 'Incentive trips that motivate' },
  { name: 'Client Entertainment', desc: 'Impress your biggest accounts' }
];

const logisticsTips = [
  {
    title: 'Catering for 50+',
    tips: [
      'Partner with local caterers we recommend',
      'Finger foods work best on the water',
      'Plan 3-4 appetizers per person',
      'Bring your own alcohol (BYOB)'
    ]
  },
  {
    title: 'Activity Planning',
    tips: [
      'Giant lily pad floats for swimming',
      'Dance floor with disco balls',
      'Team photo opportunities',
      'Sunset viewing from the open deck'
    ]
  },
  {
    title: 'Coordination Tips',
    tips: [
      'Book 3-4 weeks ahead for best dates',
      'Send parking info to all guests',
      'Assign a point person for your group',
      'Confirm headcount 1 week before'
    ]
  },
  {
    title: 'Transportation',
    tips: [
      'Free parking at marina for 50+ cars',
      'Charter buses available nearby',
      'Rideshare pickup/dropoff area',
      'Clear directions to dock'
    ]
  },
  {
    title: 'What to Bring',
    tips: [
      'Sunscreen and sunglasses',
      'Comfortable shoes for boat',
      'Light layers for evening',
      'Camera for memories'
    ]
  },
  {
    title: 'Communication',
    tips: [
      'Share event details 2 weeks out',
      'Create group chat for day-of',
      'Confirm timing with our crew',
      'Set clear boarding time'
    ]
  }
];

const faqs = [
  {
    question: 'What is the capacity for a 50 person company party Austin on your boats?',
    answer: 'Our flagship Clever Girl boat is perfect for 50 person company party Austin events, comfortably holding up to 75 guests. This single-deck party barge features 14 disco balls, arch canopy, and premium sound system. Clever Girl is the largest in our fleet and perfect for your large team event Lake Travis.'
  },
  {
    question: 'How do I handle catering for a 50 guest boat rental Lake Travis event?',
    answer: 'All our company bash boat Austin cruises are BYOB, meaning you bring your own food and drinks. We can recommend local caterers experienced with boat events. Plan for finger foods and appetizers that are easy to serve on the water. We provide coolers and ice.'
  },
  {
    question: 'What makes the Clever Girl perfect for large team events?',
    answer: 'The Clever Girl features 14 disco balls, a premium sound system, spacious open deck with arch canopy, and shaded seating areas - everything you need for an epic 50 person company party Austin. The single-deck layout with plenty of space gives your large team event Lake Travis room to mingle and celebrate.'
  },
  {
    question: 'How far in advance should I book a 50 guest boat rental Lake Travis?',
    answer: 'For company bash boat Austin events with 50+ guests, we recommend booking 3-4 weeks in advance. Popular dates fill quickly, especially for large team event Lake Travis requests. Contact us early to secure your preferred date and boat.'
  },
  {
    question: 'What activities can we do during a large group boat party?',
    answer: 'Your 50 person company party Austin includes swimming stops with giant lily pad floats, dancing under disco balls, sunset viewing from the open deck, and plenty of space for team networking. Many companies add team toasts, awards ceremonies, and group photos.'
  },
  {
    question: 'Is there parking for 50 guests at the marina?',
    answer: 'Yes! Our marina has ample free parking for your entire 50 guest boat rental Lake Travis party. We also have a designated rideshare pickup area and can accommodate charter buses for company bash boat Austin events.'
  },
  {
    question: 'What happens if weather affects our large group cruise?',
    answer: 'Safety is our top priority. If weather conditions aren\'t suitable for your large team event Lake Travis, we offer full rescheduling or refunds. Our team monitors forecasts closely and communicates proactively about any concerns.'
  },
  {
    question: 'Can we customize the experience for our 50 person company party Austin?',
    answer: 'Absolutely! We work with you to create the perfect company bash boat Austin experience. From cruise timing to playlist preferences, we help customize your 50 guest boat rental Lake Travis to match your company culture and goals.'
  }
];

export default function CompanyParty50People() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/company-party-50-people-austin"
        defaultTitle="50 Person Company Party Austin | Large Team Event Lake Travis Boat Rental"
        defaultDescription="Plan the ultimate 50 person company party Austin on Lake Travis. Our Clever Girl boat holds 50-75 guests with 14 disco balls. Perfect for large team events. Book your company bash boat Austin today!"
        defaultKeywords={['50 person company party Austin', 'large team event Lake Travis', 'company bash boat Austin', '50 guest boat rental Lake Travis', 'corporate party boat', 'Austin company celebration']}
        image="https://premierpartycruises.com/assets/clever-girl-50-person-boat.webp"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="page-company-party-50-people">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="section-hero"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="50 Person Company Party Austin - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-400 text-black font-bold" data-testid="badge-hero">
              50-75 GUEST CAPACITY
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="heading-hero">
              How to Throw a 50-Person Company Bash on Lake Travis
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Big Group, Big Impact – The Ultimate Large Team Event Lake Travis Experience
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Make your 50 person company party Austin unforgettable with our flagship Clever Girl boat featuring 14 disco balls.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-hero-quote">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your 50-Person Event
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
                alt="50 person company party boat Lake Travis Austin large team event Clever Girl"
                className="w-full h-auto object-cover"
                data-testid="img-hero-clever-girl"
              />
            </div>
          </div>
        </section>

        {/* Big Group Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-benefits">Big Group, Big Impact</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                When you need to impress 50+ colleagues at once, only a company bash boat Austin delivers the wow factor
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bigGroupBenefits.map((item, index) => (
                <m.div
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
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-purple-900 text-white" data-testid="section-stats">
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

        {/* Clever Girl Features Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-clever-girl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">CLEVER GIRL BOAT</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-clever-girl">Built for 50 Person Company Party Austin Events</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    The Clever Girl is our flagship vessel designed specifically for large team event Lake Travis gatherings. 
                    With 50-75 guest capacity and 14 disco balls, your company bash boat Austin will be legendary.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {cleverGirlFeatures.map((feature, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`card-feature-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{feature.description}</p>
                          <ul className="space-y-1">
                            {feature.features.slice(0, 2).map((f, idx) => (
                              <li key={idx} className="text-xs text-purple-600 flex items-center gap-1">
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
                      alt="Large team event Lake Travis 50 person company party boat cruise"
                      className="w-full h-full object-cover"
                      data-testid="img-section-1"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Music className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="font-bold text-sm">14 Disco Balls</p>
                        <p className="text-xs text-gray-500">Party atmosphere</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-800 to-slate-900 text-white" data-testid="section-perfect-for">
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
                      alt="50 guest boat rental Lake Travis company celebration corporate event"
                      className="w-full h-full object-cover"
                      data-testid="img-section-2"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">PERFECT OCCASIONS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-perfect-for">50 Guest Boat Rental Lake Travis – Ideal For</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    When your entire department or company needs to celebrate together, a large team event Lake Travis 
                    creates impact that smaller venues simply can't match.
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

        {/* Logistics Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-logistics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">EVENT LOGISTICS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-logistics">Planning Your 50 Person Company Party Austin</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Organizing a large team event Lake Travis requires attention to detail. We've helped hundreds of companies 
                    plan successful 50+ person events and know exactly what it takes.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Private boat charter (3+ hours)',
                      'Professional captain and crew',
                      'Premium sound system with Bluetooth',
                      '14 disco balls for party atmosphere',
                      'Giant lily pad floats included',
                      'BYOB - bring your own catering',
                      'Free marina parking for 50+ cars',
                      'Flexible scheduling options'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold" data-testid="button-private-cruises">
                      <Ship className="mr-2 h-5 w-5" />
                      View Private Cruise Options
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Company bash boat Austin large group corporate party Lake Travis"
                      className="w-full h-full object-cover"
                      data-testid="img-section-3"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <UtensilsCrossed className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">BYOB Catering</p>
                        <p className="text-xs text-gray-500">Full flexibility</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Planning Tips Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-tips">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-tips">Logistics Tips for 50-Person Events</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Make your large team event Lake Travis seamless with these proven planning strategies
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logisticsTips.map((section, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-tip-${index}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
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

        {/* Additional Image Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Your 50 Guest Boat Rental Lake Travis Awaits</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                See why Austin companies choose Premier Party Cruises for their company bash boat Austin celebrations
              </p>
            </m.div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={sectionImage4}
                alt="50 person company party Austin team celebration Lake Travis boat rental"
                className="w-full h-auto object-cover"
                data-testid="img-section-4"
              />
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="section-faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-faq">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about 50 person company party Austin events on Lake Travis
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
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
        <section className="py-16 bg-gradient-to-br from-purple-900 to-slate-900 text-white" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-cta">
                Ready to Book Your 50 Person Company Party Austin?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your large team event Lake Travis. Our team will help you plan 
                every detail of your company bash boat Austin experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-cta-quote">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <a href="tel:5127270422">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-cta-call">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 727-0422
                  </Button>
                </a>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/team-building">
                  <Button variant="link" className="text-white/80 hover:text-white" data-testid="link-team-building">
                    Team Building <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/client-entertainment">
                  <Button variant="link" className="text-white/80 hover:text-white" data-testid="link-client-entertainment">
                    Client Entertainment <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button variant="link" className="text-white/80 hover:text-white" data-testid="link-private-cruises">
                    Private Cruises <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/corporate-events">
                  <Button variant="link" className="text-white/80 hover:text-white" data-testid="link-corporate-events">
                    Corporate Events <ArrowRight className="ml-1 h-4 w-4" />
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

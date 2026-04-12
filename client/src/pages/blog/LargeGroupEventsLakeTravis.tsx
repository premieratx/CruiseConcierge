import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Phone, Clock, CheckCircle2, 
  Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Anchor, PartyPopper, Sailboat
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

const largeGroupBenefits = [
  { 
    icon: Users, 
    title: 'Multi-Boat Coordination', 
    description: 'We coordinate multiple boats for your large group party Austin event, keeping everyone connected on the water',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Ship, 
    title: 'Fleet Flexibility', 
    description: 'Mix and match boats for your mega event Lake Travis celebration to fit any group size over 75 guests',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: PartyPopper, 
    title: 'Unified Experience', 
    description: 'Your 100 person boat party Austin feels like one big celebration even across multiple vessels',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Building2, 
    title: 'Corporate Ready', 
    description: 'Perfect for corporate large group event Lake Travis gatherings with professional coordination',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const eventTypes = [
  {
    title: 'Corporate Gatherings',
    description: 'Large company events and team celebrations',
    features: [
      'Multi-boat coordination for 100+ guests',
      'Professional crew on each vessel',
      'Synchronized departure and arrival',
      'Corporate large group event Lake Travis specialist'
    ]
  },
  {
    title: 'Mega Celebrations',
    description: 'Weddings, reunions, and milestone parties',
    features: [
      'Mega event Lake Travis planning expertise',
      'Combined fleet capacity up to 164 guests',
      'Coordinated activities across boats',
      'Large group party Austin coordination'
    ]
  },
  {
    title: 'Festival Style Events',
    description: 'Multi-boat flotillas and party fleets',
    features: [
      '100 person boat party Austin capability',
      'Boats cruise together on the lake',
      'Shared swimming and anchor spots',
      'DJ coordination across vessels'
    ]
  },
  {
    title: 'Private Mega Parties',
    description: 'Exclusive large-scale celebrations',
    features: [
      'VIP treatment for all guests',
      'Custom event planning',
      'Dedicated event coordinator',
      'Premium mega event Lake Travis experience'
    ]
  }
];

const largeGroupStats = [
  { stat: '164', label: 'Max Combined Guests' },
  { stat: '4', label: 'Boats in Our Fleet' },
  { stat: '75', label: 'Clever Girl Capacity' },
  { stat: '100+', label: 'Events Coordinated' }
];

const faqs = [
  {
    question: 'What is the maximum capacity for a large group party Austin event?',
    answer: 'Our flagship Clever Girl holds up to 75 guests. For larger groups planning a 100 person boat party Austin celebration, we coordinate multiple boats to sail together. With our full fleet, we can accommodate up to 164 guests across all vessels for your mega event Lake Travis experience.'
  },
  {
    question: 'How does multi-boat coordination work for mega events?',
    answer: 'For corporate large group event Lake Travis gatherings over 75 people, we synchronize multiple boats to depart and cruise together. Boats anchor near each other so guests can mingle during swimming. Our crews coordinate timing so your large group party Austin feels unified throughout the experience.'
  },
  {
    question: 'What boats are best for 100 person boat party Austin events?',
    answer: 'For groups of 100+, we typically combine our Clever Girl (50-75 guests) with Meeseeks (25 guests) or The Irony (30 guests). This gives you the capacity for your mega event Lake Travis while keeping the party connected. Each boat has its own captain, sound system, and amenities.'
  },
  {
    question: 'Can guests move between boats during the cruise?',
    answer: 'While guests cannot transfer between boats during cruising, we coordinate anchor stops where boats tie up together. This allows mingling during swim time at your large group party Austin. Many groups use this for networking during corporate large group event Lake Travis gatherings.'
  },
  {
    question: 'How far in advance should we book for 100+ person events?',
    answer: 'For mega event Lake Travis celebrations with 100+ guests, we recommend booking 4-6 weeks ahead. Multi-boat coordination requires scheduling all vessels for the same time. Popular dates for 100 person boat party Austin events book quickly, so earlier is always better.'
  },
  {
    question: 'Do you provide event coordination for large groups?',
    answer: 'Yes! Large group party Austin events include dedicated coordination. We help plan logistics, timing, boat assignments, and on-water activities. For corporate large group event Lake Travis gatherings, we can work with your event planners to ensure everything runs smoothly.'
  },
  {
    question: 'What is the pricing for mega events with multiple boats?',
    answer: 'Multi-boat mega event Lake Travis pricing depends on which vessels you choose and your cruise duration. We offer package discounts for booking multiple boats. Contact us for a custom quote for your 100 person boat party Austin - we will find the best combination for your budget.'
  },
  {
    question: 'Can we have different themes on each boat?',
    answer: 'Absolutely! Some large group party Austin clients divide guests by department, age group, or preference. Each boat can have its own music, food theme, or vibe while still being part of your unified mega event Lake Travis celebration.'
  }
];

const boatOptions = [
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Flagship for large groups', description: 'Our largest vessel perfect for corporate large group event Lake Travis gatherings' },
  { name: 'The Irony', capacity: '30 guests', best: 'Add-on for mega events', description: 'Great secondary boat for 100 person boat party Austin coordination' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'VIP overflow boat', description: 'Perfect for executive groups during large group party Austin' },
  { name: 'Day Tripper', capacity: '14 guests', best: 'Intimate add-on', description: 'Ideal for special guests at your mega event Lake Travis' }
];

export default function LargeGroupEventsLakeTravis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/large-group-events-lake-travis"
        defaultTitle="Large & Mega Group Events Lake Travis | 100+ Person Boat Parties Austin"
        defaultDescription="Host large group party Austin events for 100+ people on Lake Travis. Multi-boat coordination for mega event Lake Travis celebrations. Corporate large group event specialists. Book your 100 person boat party Austin today!"
        defaultKeywords={['large group party Austin', 'mega event Lake Travis', '100 person boat party Austin', 'corporate large group event Lake Travis', 'multi-boat party Austin', 'large event boat rental Lake Travis']}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="page-large-group-events">
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
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Large & Mega Group Events Lake Travis - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-purple-600 font-bold">
              LARGE GROUP SPECIALISTS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Large & Mega Group Events on Lake Travis
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Hosting 100+ People for Unforgettable Celebrations
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Plan your large group party Austin event with our multi-boat coordination. From corporate gatherings to mega event Lake Travis celebrations, we make it happen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-purple-600 font-bold text-lg px-8 py-6" data-testid="button-plan-event">
                  <Users className="mr-2 h-5 w-5" />
                  Plan Your Mega Event
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-corporate">
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
            Explore our full guide to{' '}
            <Link href="/party-boat-lake-travis" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Lake Travis party boat rentals</Link>{' '}
            for everything from pricing and logistics to safety and entertainment.
          </p>
        </div>
      </div>


        {/* Benefits Grid */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Choose Us for Large Group Party Austin Events</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Expert coordination for mega event Lake Travis celebrations with 100+ guests
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {largeGroupBenefits.map((item, index) => (
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
              {largeGroupStats.map((item, index) => (
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

        {/* Hosting 100+ Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-hosting-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">HOSTING 100+ PEOPLE</Badge>
                  <h2 className="text-3xl font-bold mb-6">How We Handle 100 Person Boat Party Austin Events</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Our Clever Girl holds 75 guests max - the largest party boat on Lake Travis. For your large group party Austin event with more than 75 people, we coordinate multiple boats to cruise together as a fleet. This creates a unified mega event Lake Travis experience where everyone is part of the celebration.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Multi-boat coordination means your 100 person boat party Austin departs together, cruises as a group, and anchors side-by-side for swimming. It's the perfect solution for corporate large group event Lake Travis gatherings that need capacity beyond a single vessel.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {[
                      'Synchronized departure and cruising',
                      'Boats anchor together for swimming',
                      'Dedicated captain on each vessel',
                      'Coordinated timing throughout'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold" data-testid="button-view-fleet">
                      <Ship className="mr-2 h-5 w-5" />
                      View Our Fleet
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Large group party Austin celebrating on Lake Travis boat with 75+ guests"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="font-bold text-sm">Multi-Boat Fleet</p>
                        <p className="text-xs text-gray-500">Up to 164 guests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Why Lake Travis Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-800 to-slate-900 text-white" data-testid="section-why-lake-travis">
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
                      alt="Mega event Lake Travis with multi-boat party fleet on beautiful water"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">WHY LAKE TRAVIS</Badge>
                  <h2 className="text-3xl font-bold mb-6">The Perfect Venue for Mega Event Lake Travis Celebrations</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Lake Travis offers the space and beauty that large group party Austin events need. With 65 miles of shoreline and stunning Hill Country views, there's room for your entire group to spread out and enjoy. No cramped venues - just open water and Texas sky.
                  </p>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    For corporate large group event Lake Travis gatherings, the lake provides a unique backdrop that impresses clients and energizes teams. Your 100 person boat party Austin becomes an unforgettable experience that no conference room can match.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Waves, text: 'Open water freedom' },
                      { icon: MapPin, text: 'Scenic Hill Country' },
                      { icon: Anchor, text: 'Private anchor spots' },
                      { icon: Star, text: 'Memorable experience' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-yellow-400" />
                        <span className="text-white/90">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Fleet Options Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-fleet">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-green-100 text-green-700">FLEET OPTIONS</Badge>
              <h2 className="text-3xl font-bold mb-4">Boats for Your Large Group Party Austin</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Combine vessels to create the perfect 100 person boat party Austin experience
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {boatOptions.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-green-200" data-testid={`card-boat-${index}`}>
                    <CardContent className="pt-6">
                      <Sailboat className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-1 text-center">{boat.name}</h3>
                      <p className="text-green-600 font-semibold text-center mb-2">{boat.capacity}</p>
                      <p className="text-sm text-gray-500 text-center mb-2">{boat.best}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{boat.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Popular Combinations for Mega Event Lake Travis</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                      <span><strong>100 guests:</strong> Clever Girl (75) + Meeseeks (25) - Perfect for 100 person boat party Austin</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                      <span><strong>105 guests:</strong> Clever Girl (75) + The Irony (30) - Great for corporate large group event Lake Travis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                      <span><strong>164 guests:</strong> Full fleet rental - Ultimate large group party Austin experience</span>
                    </li>
                  </ul>
                </div>
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={sectionImage3}
                    alt="Corporate large group event Lake Travis with multiple boats cruising together"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Types Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-event-types">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-100 text-purple-700">EVENT TYPES</Badge>
                <h2 className="text-3xl font-bold mb-4">Large Group Party Austin Events We Host</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  From corporate gatherings to celebration parties, we coordinate mega event Lake Travis experiences for all occasions
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {eventTypes.map((event, index) => (
                  <Card key={index} className="bg-white/80" data-testid={`card-event-type-${index}`}>
                    <CardHeader>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <p className="text-gray-500">{event.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {event.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* Coordination Services Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-coordination">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="100 person boat party Austin with coordinated multi-boat event planning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="font-bold text-sm">Expert Coordination</p>
                        <p className="text-xs text-gray-500">Seamless events</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">COORDINATION SERVICES</Badge>
                  <h2 className="text-3xl font-bold mb-6">Mega Event Lake Travis Planning Support</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Large group party Austin events need expert coordination. Our team handles the logistics so you can focus on your guests. From boat assignments to synchronized timing, we make your 100 person boat party Austin run smoothly.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      { title: 'Pre-Event Planning', desc: 'Boat selection, timing, and guest assignments for corporate large group event Lake Travis' },
                      { title: 'Day-Of Coordination', desc: 'Synchronized departures, anchor coordination, and crew communication' },
                      { title: 'Guest Management', desc: 'Parking coordination, boarding assistance, and headcount verification' },
                      { title: 'Vendor Coordination', desc: 'Work with your caterers, photographers, and entertainment for mega event Lake Travis' }
                    ].map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold">{service.title}:</span>
                          <span className="text-gray-600 dark:text-gray-400"> {service.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/team-building">
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold" data-testid="button-team-building">
                        Team Building Events
                      </Button>
                    </Link>
                    <Link href="/client-entertainment">
                      <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50" data-testid="button-client-entertainment">
                        Client Entertainment
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </m.div>
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
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about large group party Austin and mega event Lake Travis planning
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
        <section className="py-16 bg-gradient-to-br from-purple-900 to-slate-900 text-white" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Plan Your Large Group Party Austin?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your 100 person boat party Austin or mega event Lake Travis celebration. We will help coordinate the perfect multi-boat experience for your group.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-get-quote">
                    <Users className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <a href="tel:5124885892">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-call">
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

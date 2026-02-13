import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Music, Utensils, Sparkles
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
import sectionImage3 from '@assets/meeseeks-3 lake travis party boat_1763968010089.jpg';
import sectionImage4 from '@assets/meeseeks-4 austin party boat rental_1763968010090.jpg';

const sweetSpotBenefits = [
  { 
    icon: Users, 
    title: 'Perfect Group Size', 
    description: 'A 25 person company party Austin event lets everyone connect without getting lost in the crowd',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Target, 
    title: 'Meaningful Conversations', 
    description: 'Your medium team event Lake Travis allows genuine team bonding that larger groups can\'t achieve',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: Trophy, 
    title: 'Cost-Effective', 
    description: 'Mid-size group boat rental Lake Travis offers the best value per person for department budgets',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Handshake, 
    title: 'Easy Coordination', 
    description: 'A department party boat Austin is simple to organize with 20-30 colleagues',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const activityIdeas = [
  {
    title: 'Team Swimming & Floating',
    description: 'Enjoy the water with your mid-size group',
    features: [
      'Giant lily pad floats for groups',
      'Swimming in pristine Lake Travis',
      'Perfect water temperatures spring-fall',
      'Great for 25 person company party Austin'
    ]
  },
  {
    title: 'Casual Team Discussions',
    description: 'Connect outside the conference room',
    features: [
      'Relaxed networking atmosphere',
      'Strategy planning on the water',
      'Department goal setting sessions',
      'Ideal for medium team event Lake Travis'
    ]
  },
  {
    title: 'Sunset Cruise Experience',
    description: 'End your department party boat Austin with stunning views',
    features: [
      'Golden hour photo opportunities',
      'Memorable team moments',
      'Perfect backdrop for celebration',
      'Mid-size group boat rental Lake Travis highlight'
    ]
  },
  {
    title: 'Music & Entertainment',
    description: 'Premium sound for your 25-person gathering',
    features: [
      'Bluetooth speaker system',
      'Create custom playlists',
      'Dance floor on deck',
      'Great for company celebrations'
    ]
  }
];

const statsSection = [
  { stat: '25-30', label: 'Guest Sweet Spot' },
  { stat: '3+ Hours', label: 'Cruise Duration' },
  { stat: '100%', label: 'Private Experience' },
  { stat: '5-Star', label: 'Customer Ratings' }
];

const faqs = [
  {
    question: 'Why is 25 people the "sweet spot" for a company boat party?',
    answer: 'A 25 person company party Austin on Lake Travis hits the perfect balance. It\'s large enough to create energy and excitement, but small enough that everyone can talk to each other. Your department party boat Austin experience means no one feels left out, and meaningful connections happen naturally. This mid-size group boat rental Lake Travis is ideal for departments, growing teams, or project groups.'
  },
  {
    question: 'Which boats work best for a 25-person medium team event Lake Travis?',
    answer: 'For your medium team event Lake Travis, we recommend the Meeseeks (up to 25 guests) or The Irony (up to 30 guests). Both boats offer the perfect space for a department party boat Austin, with comfortable seating, premium sound systems, and plenty of deck space for mingling. These mid-size group boat rental Lake Travis options ensure everyone has room without feeling too spread out.'
  },
  {
    question: 'What makes a mid-size group boat rental Lake Travis different from larger charters?',
    answer: 'A mid-size group boat rental Lake Travis offers intimacy that larger boats can\'t match. Your 25 person company party Austin will feel exclusive rather than crowded. Everyone can hear each other, move around easily, and participate in activities together. The department party boat Austin experience is more personal and memorable.'
  },
  {
    question: 'How should we plan food for a medium team event Lake Travis?',
    answer: 'For your medium team event Lake Travis, we recommend bringing catered finger foods or pre-made platters. With 25 guests, it\'s easy to coordinate dietary needs. Our department party boat Austin cruises are BYOB, so you control the menu and budget. Many clients doing a mid-size group boat rental Lake Travis opt for simple appetizers that are easy to enjoy while socializing.'
  },
  {
    question: 'What activities work best for a 25 person company party Austin?',
    answer: 'Your 25 person company party Austin can include swimming, floating on giant lily pads, casual games, and group discussions. The medium team event Lake Travis setting is perfect for team photos, recognition ceremonies, or informal networking. A department party boat Austin allows enough space for multiple activities happening at once.'
  },
  {
    question: 'How far in advance should we book a mid-size group boat rental Lake Travis?',
    answer: 'For a mid-size group boat rental Lake Travis, we recommend booking 2-4 weeks ahead. The Meeseeks and Irony boats are popular for 25 person company party Austin events, and weekends fill fast. Your department party boat Austin experience will be better if you have plenty of time to plan and coordinate with your team.'
  },
  {
    question: 'Can we do team building activities during a department party boat Austin?',
    answer: 'Absolutely! A department party boat Austin is ideal for informal team building. The medium team event Lake Travis setting naturally encourages conversation and connection. Many teams use their 25 person company party Austin for quarterly celebrations, project milestones, or welcome events for new hires. The mid-size group boat rental Lake Travis format creates organic bonding opportunities.'
  },
  {
    question: 'What makes a 25-person group easier to manage than larger events?',
    answer: 'A 25 person company party Austin is much easier to coordinate logistically. RSVP tracking, food quantities, and transportation are all simpler with a medium team event Lake Travis. Your department party boat Austin requires less planning time and fewer vendors. The mid-size group boat rental Lake Travis approach means less stress for organizers and more fun for everyone.'
  }
];

const boatOptions = [
  { 
    name: 'Meeseeks', 
    capacity: '25 guests', 
    best: 'Perfect for 25 person company party Austin',
    features: ['Premium sound system', 'Comfortable seating', 'Giant lily pads', 'Shaded areas']
  },
  { 
    name: 'The Irony', 
    capacity: '30 guests', 
    best: 'Ideal for medium team event Lake Travis',
    features: ['Spacious deck', 'Dance floor', 'Multiple seating zones', 'Great for department party boat Austin']
  }
];

export default function CompanyParty25People() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/company-party-25-people-austin"
        defaultTitle="Planning a Company Party for 25 People - Finding the Sweet Spot | Lake Travis Austin"
        defaultDescription="Discover why a 25 person company party Austin on Lake Travis is the perfect size. Mid-size group boat rental Lake Travis offers intimate team bonding. Book your department party boat Austin today."
        defaultKeywords={['25 person company party Austin', 'medium team event Lake Travis', 'department party boat Austin', 'mid-size group boat rental Lake Travis', 'corporate boat party Austin', 'team outing Lake Travis']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="company-party-25-page">
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
          aria-label="Planning a Company Party for 25 People - Finding the Sweet Spot - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold">
              MEDIUM TEAM EVENT LAKE TRAVIS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Planning a 25 Person Company Party Austin – Finding the Sweet Spot
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Big Enough for Variety, Small Enough for Real Connection
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Discover why a mid-size group boat rental Lake Travis creates the perfect team experience. Your department party boat Austin will be unforgettable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-hero-quote">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your 25 Person Party
                </Button>
              </Link>
              <Link href="/team-building">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-hero-team-building">
                  View Team Building Options
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


        {/* Why 25 is the Sweet Spot Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="sweet-spot-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">THE PERFECT SIZE</Badge>
              <h2 className="text-3xl font-bold mb-4">Why a 25 Person Company Party Austin Hits the Sweet Spot</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A medium team event Lake Travis offers the best of both worlds – energy and intimacy. Your department party boat Austin will feel exclusive while still having the buzz of a real celebration.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sweetSpotBenefits.map((item, index) => (
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

        {/* Stats Section */}
        <section className="py-12 bg-blue-900 text-white" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {statsSection.map((item, index) => (
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

        {/* Finding the Sweet Spot Content Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="content-section-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">FINDING THE SWEET SPOT</Badge>
                  <h2 className="text-3xl font-bold mb-6">Why Medium-Sized Groups Create Better Experiences</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    When planning a 25 person company party Austin, you've found the magic number. Your mid-size group boat rental Lake Travis is large enough to feel like a real event, but intimate enough that every person matters. Unlike massive corporate gatherings where people stick to their usual cliques, a department party boat Austin naturally encourages everyone to interact.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A medium team event Lake Travis means you can have a single conversation that includes everyone, or break into smaller groups without losing the sense of togetherness. This is why department heads and team leaders love the 25-person format for their 25 person company party Austin celebrations.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Link href="/corporate-events">
                      <Button className="bg-blue-600 hover:bg-blue-700" data-testid="link-corporate-events">
                        <Building2 className="mr-2 h-4 w-4" />
                        Corporate Events
                      </Button>
                    </Link>
                    <Link href="/client-entertainment">
                      <Button variant="outline" data-testid="link-client-entertainment">
                        <Handshake className="mr-2 h-4 w-4" />
                        Client Entertainment
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Medium team event Lake Travis 25 person company party boat rental Austin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">25 Person Sweet Spot</p>
                        <p className="text-xs text-gray-500">Perfect for departments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Boat Features Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="boats-section">
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
                      alt="Department party boat Austin Meeseeks and Irony boats for mid-size group rental Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">PERFECT BOATS FOR 25</Badge>
                  <h2 className="text-3xl font-bold mb-6">Meeseeks & The Irony: Built for Medium Teams</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    For your 25 person company party Austin, we recommend the Meeseeks (25 guests) or The Irony (30 guests). These boats are designed for mid-size group boat rental Lake Travis, with the perfect balance of intimate seating areas and open deck space for your department party boat Austin.
                  </p>
                  
                  <div className="grid gap-4 mb-8">
                    {boatOptions.map((boat, index) => (
                      <Card key={index} className="bg-white/10 border-white/20" data-testid={`card-boat-${index}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-white text-lg">{boat.name}</h4>
                              <p className="text-yellow-400">{boat.capacity}</p>
                            </div>
                            <Badge className="bg-blue-500">{boat.best}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {boat.features.map((feature, idx) => (
                              <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full text-white/90">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-view-boats">
                      <Ship className="mr-2 h-5 w-5" />
                      View All Boats
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="perfect-for-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">PERFECT FOR</Badge>
                  <h2 className="text-3xl font-bold mb-6">Who Benefits Most from a 25 Person Company Party Austin</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A medium team event Lake Travis is ideal for specific types of corporate gatherings. Whether you're celebrating a department milestone or welcoming new team members, a department party boat Austin creates the perfect environment for connection.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Department outings and team celebrations',
                      'Growing startups and scale-up teams',
                      'Project team completion celebrations',
                      'Quarterly sales team rewards',
                      'New hire welcome events',
                      'Client appreciation for mid-size accounts',
                      'Leadership team retreats',
                      'Cross-functional team building'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/team-building">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold" data-testid="button-team-building">
                      <Target className="mr-2 h-5 w-5" />
                      Team Building Packages
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="25 person company party Austin department team event mid-size group celebration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-8 w-8 text-amber-500" />
                      <div>
                        <p className="font-bold text-sm">Perfect Fit</p>
                        <p className="text-xs text-gray-500">For department events</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Activity Ideas Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="activities-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">ACTIVITY IDEAS</Badge>
              <h2 className="text-3xl font-bold mb-4">What to Do During Your Mid-Size Group Boat Rental Lake Travis</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Your 25 person company party Austin offers plenty of options for team fun. Here's what works best for a department party boat Austin.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              {activityIdeas.map((activity, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-activity-${index}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{activity.title}</CardTitle>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {activity.features.map((feature, idx) => (
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

        {/* Image Feature Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="image-feature-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="Mid-size group boat rental Lake Travis department party boat Austin corporate team outing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div>
                  <Badge className="mb-4 bg-amber-100 text-amber-700">PLANNING TIPS</Badge>
                  <h2 className="text-3xl font-bold mb-6">How to Plan the Perfect 25 Person Company Party Austin</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Planning a medium team event Lake Travis is straightforward with these tips. Your department party boat Austin will run smoothly when you follow these guidelines for your mid-size group boat rental Lake Travis.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Book 2-4 Weeks Ahead', desc: 'Popular boats for 25 person company party Austin fill fast' },
                      { title: 'Coordinate Food Simply', desc: 'Finger foods work best for medium team event Lake Travis' },
                      { title: 'Set Clear Meeting Time', desc: 'Have everyone arrive 15 minutes early for department party boat Austin' },
                      { title: 'Plan Light Activities', desc: 'Swimming and conversation are perfect for mid-size group boat rental Lake Travis' }
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-gray-100">{tip.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions About Mid-Size Group Boat Rental Lake Travis</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about planning a 25 person company party Austin and department party boat Austin
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

        {/* Internal Links Section */}
        <section className="py-12 bg-white dark:bg-gray-900" data-testid="internal-links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Explore More Corporate Options</h3>
            </m.div>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/team-building">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200" data-testid="link-card-team-building">
                  <CardContent className="p-6 text-center">
                    <Target className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                    <h4 className="font-bold">Team Building</h4>
                    <p className="text-sm text-gray-500">Build stronger teams</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/client-entertainment">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200" data-testid="link-card-client-entertainment">
                  <CardContent className="p-6 text-center">
                    <Handshake className="h-8 w-8 mx-auto mb-3 text-green-600" />
                    <h4 className="font-bold">Client Entertainment</h4>
                    <p className="text-sm text-gray-500">Impress your clients</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/private-cruises">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-200" data-testid="link-card-private-cruises">
                  <CardContent className="p-6 text-center">
                    <Ship className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                    <h4 className="font-bold">Private Cruises</h4>
                    <p className="text-sm text-gray-500">Exclusive charters</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/corporate-events">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-amber-200" data-testid="link-card-corporate-events">
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-3 text-amber-600" />
                    <h4 className="font-bold">Corporate Events</h4>
                    <p className="text-sm text-gray-500">All company events</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
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
                Ready to Plan Your 25 Person Company Party Austin?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your medium team event Lake Travis. We'll help you choose the perfect department party boat Austin experience.
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
            </m.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}

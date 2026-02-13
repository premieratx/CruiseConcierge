import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Heart, Music, Anchor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/day-tripper-14-person-boat.webp';
import sectionImage1 from '@assets/meeseeks-1_1763968010088.jpg';
import sectionImage2 from '@assets/meeseeks-2_1763968010089.jpg';
import sectionImage3 from '@assets/day-tripper-14-person-boat.jpg';
import sectionImage4 from '@assets/meeseeks-3 lake travis party boat_1763968010089.jpg';

const smallTeamBenefits = [
  { 
    icon: Heart, 
    title: 'Everyone Connects', 
    description: 'With just 10 people, no one gets lost in the crowd. Every team member bonds.',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  },
  { 
    icon: Users, 
    title: 'Intimate Setting', 
    description: 'An intimate corporate party boat Austin experience where conversations flow naturally.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Trophy, 
    title: 'Big Impact', 
    description: 'Small team event Lake Travis creates lasting memories without breaking the budget.',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Target, 
    title: 'Focused Fun', 
    description: 'Plan a 10 person company party Austin that hits every goal perfectly.',
    color: 'text-green-600',
    bg: 'bg-green-100'
  }
];

const dayTripperFeatures = [
  {
    title: 'Perfect Size',
    description: '14-person capacity means your 10 guests have room to move and relax',
    icon: Users
  },
  {
    title: 'Premium Sound',
    description: 'Bluetooth-connected speaker system for your playlist',
    icon: Music
  },
  {
    title: 'Water Activities',
    description: 'Giant lily pad floats included for swimming stops',
    icon: Waves
  },
  {
    title: 'Professional Crew',
    description: 'Experienced captain handles everything while you enjoy',
    icon: Anchor
  }
];

const activityIdeas = [
  {
    title: 'Swimming & Floating',
    description: 'Anchor in a quiet cove and let your team enjoy the water on our giant lily pad floats.',
    forSmallTeams: 'Perfect for 10 - everyone gets a spot on the float!'
  },
  {
    title: 'Sunset Cruise',
    description: 'Time your small group boat rental Lake Travis for golden hour and watch the sun set over the hills.',
    forSmallTeams: 'Intimate atmosphere as day turns to night.'
  },
  {
    title: 'Casual Team Discussion',
    description: 'Use the relaxed setting for informal brainstorming or strategy sessions.',
    forSmallTeams: 'No conference room walls - just open water and fresh ideas.'
  },
  {
    title: 'Celebration Cruise',
    description: 'Mark a project completion, quarter-end, or team milestone with a special outing.',
    forSmallTeams: 'Every person feels celebrated and appreciated.'
  }
];

const whatsIncluded = [
  'Private boat charter (3+ hours)',
  'Professional captain',
  'Premium Bluetooth sound system',
  'Giant lily pad floats for swimming',
  'Coolers and ice provided',
  'BYOB - bring your own food and drinks',
  'Flexible departure times',
  'Free parking at the marina'
];

const faqs = [
  {
    question: 'What boat is best for a 10 person company party Austin event?',
    answer: 'The Day Tripper is our top choice for groups of 10. With a 14-person capacity, it gives your team comfortable space without feeling empty. It\'s designed specifically for small group boat rental Lake Travis experiences with all the amenities you need.'
  },
  {
    question: 'How much does a small team event Lake Travis cost?',
    answer: 'Pricing for a 10 person company party Austin starts around $800-1200 for a 3-hour cruise, depending on the day and time. Contact us for an exact quote - we often have special rates for weekday corporate events.'
  },
  {
    question: 'Can we bring our own food and drinks?',
    answer: 'Absolutely! All our intimate corporate party boat Austin cruises are BYOB. Bring your own catering, snacks, and beverages. We provide coolers and ice to keep everything cold.'
  },
  {
    question: 'What activities work best for small teams on the water?',
    answer: 'For a small group boat rental Lake Travis, we recommend swimming at a quiet cove, floating on our giant lily pads, and casual conversations on deck. The intimate setting is perfect for team bonding without structured activities.'
  },
  {
    question: 'How far in advance should we book for a 10 person company party Austin?',
    answer: 'We recommend booking 1-2 weeks ahead for small team events. Weekdays often have more availability. The Day Tripper is popular, so early booking ensures you get your preferred date and time.'
  },
  {
    question: 'What if our group size changes?',
    answer: 'The Day Tripper accommodates up to 14 guests, so you have some flexibility. If your team grows beyond that, we can help you find a larger boat. Just let us know as soon as possible if your headcount changes.'
  },
  {
    question: 'Is a small team event Lake Travis good for team building?',
    answer: 'Yes! In fact, smaller groups often have better team building outcomes. Everyone participates, conversations are deeper, and no one gets left out. It\'s an intimate corporate party boat Austin experience that brings people together.'
  },
  {
    question: 'What should we bring for a 10 person company party Austin cruise?',
    answer: 'Bring sunscreen, swimsuits, towels, food, drinks, and a great playlist. We handle the boat, crew, floats, coolers, and ice. Dress casual and be ready to have fun!'
  }
];

const stats = [
  { stat: '10', label: 'Perfect Group Size' },
  { stat: '14', label: 'Day Tripper Capacity' },
  { stat: '3+', label: 'Hours of Fun' },
  { stat: '5-Star', label: 'Customer Reviews' }
];

export default function CompanyParty10People() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/company-party-10-people-austin"
        defaultTitle="10 Person Company Party Austin | Small Team Event Lake Travis | Premier Party Cruises"
        defaultDescription="Plan the perfect 10 person company party Austin on Lake Travis. Intimate corporate party boat Austin for small teams. Small group boat rental Lake Travis with Day Tripper - ideal for 10 guests."
        defaultKeywords={['10 person company party Austin', 'small team event Lake Travis', 'intimate corporate party boat Austin', 'small group boat rental Lake Travis', 'Day Tripper boat rental', 'small corporate event Austin']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="page-company-party-10-people">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden"
          data-testid="section-hero"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="10 Person Company Party Austin - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-blue-600 font-bold" data-testid="badge-small-team">
              SMALL TEAM, BIG FUN
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="heading-main">
              How to Plan a Company Party for 10 People
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              The Ultimate Guide to a 10 Person Company Party Austin on Lake Travis
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              When it comes to small team event Lake Travis celebrations, smaller groups mean bigger connections. 
              Discover why an intimate corporate party boat Austin experience is perfect for your team of 10.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6" data-testid="button-plan-event">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Plan Your Small Team Event
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-boats">
                  View Our Boats
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


        {/* Why Small Teams Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-why-small-teams">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-why-small-teams">
                Why Small Team Parties Work Great on a Boat
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A small group boat rental Lake Travis creates the perfect environment for meaningful connections. 
                Here's why a 10 person company party Austin on the water beats any conference room.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {smallTeamBenefits.map((item, index) => (
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
        <section className="py-12 bg-blue-900 text-white" data-testid="section-stats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((item, index) => (
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

        {/* Day Tripper Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-day-tripper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">THE DAY TRIPPER</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-day-tripper">
                    The Perfect Boat for Your 10 Person Company Party Austin
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Our Day Tripper is specifically designed for intimate corporate party boat Austin experiences. 
                    With a 14-person capacity, it's the ideal choice for your small team event Lake Travis celebration. 
                    Your group of 10 will have comfortable space to move around while maintaining that close-knit atmosphere.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    This small group boat rental Lake Travis option comes fully equipped with everything you need 
                    for an unforgettable day on the water. No need for a massive party boat when you're planning 
                    an intimate gathering - the Day Tripper delivers big fun for small teams.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {dayTripperFeatures.map((feature, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`card-feature-${index}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <feature.icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm">{feature.title}</h4>
                              <p className="text-xs text-gray-500">{feature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Small team event Lake Travis intimate corporate gathering on Day Tripper boat"
                      className="w-full h-full object-cover"
                      data-testid="image-day-tripper"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Ship className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Day Tripper</p>
                        <p className="text-xs text-gray-500">14 Guest Capacity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="section-whats-included">
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
                      alt="10 person company party Austin small group boat rental Lake Travis amenities"
                      className="w-full h-full object-cover"
                      data-testid="image-whats-included"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">WHAT'S INCLUDED</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-whats-included">
                    Everything Your Small Group Boat Rental Lake Travis Needs
                  </h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    When you book a 10 person company party Austin with us, everything is taken care of. 
                    Focus on enjoying your small team event Lake Travis while we handle the details.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {whatsIncluded.map((item, index) => (
                      <li key={index} className="flex items-center gap-3" data-testid={`list-item-included-${index}`}>
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/chat">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-get-quote">
                      <Calendar className="mr-2 h-5 w-5" />
                      Get Your Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Activity Ideas Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-activities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">ACTIVITY IDEAS</Badge>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-activities">
                    Fun Things to Do on Your Intimate Corporate Party Boat Austin
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    A small team event Lake Travis doesn't need elaborate activities. The best moments happen 
                    naturally when you're relaxed on the water. Here are some ideas to make your 10 person 
                    company party Austin unforgettable.
                  </p>
                  
                  <div className="space-y-4">
                    {activityIdeas.map((activity, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow" data-testid={`card-activity-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-lg mb-1">{activity.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{activity.description}</p>
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {activity.forSmallTeams}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Intimate corporate party boat Austin small team activities on Lake Travis"
                      className="w-full h-full object-cover"
                      data-testid="image-activities"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Waves className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Water Fun</p>
                        <p className="text-xs text-gray-500">Included with every cruise</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-related-pages">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Corporate Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Planning a larger event? Need ideas for client entertainment? Check out these related pages.
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/team-building">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid="link-team-building">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-bold text-lg mb-2">Team Building</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Full team building experiences</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/client-entertainment">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid="link-client-entertainment">
                  <CardContent className="p-6 text-center">
                    <Handshake className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="font-bold text-lg mb-2">Client Entertainment</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Impress clients on the water</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/private-cruises">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid="link-private-cruises">
                  <CardContent className="p-6 text-center">
                    <Ship className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                    <h3 className="font-bold text-lg mb-2">Private Cruises</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">View all boat options</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/corporate-events">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid="link-corporate-events">
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-amber-600" />
                    <h3 className="font-bold text-lg mb-2">Corporate Events</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">All corporate event options</p>
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
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-faq">
                FAQs About Small Group Rentals
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Common questions about planning a 10 person company party Austin or small team event Lake Travis.
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-gray-50 dark:bg-gray-800 rounded-lg px-6" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline" data-testid={`faq-trigger-${index}`}>
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

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white" data-testid="section-final-cta">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6" data-testid="heading-final-cta">
                    Ready to Plan Your 10 Person Company Party Austin?
                  </h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Your small team deserves big fun. Book an intimate corporate party boat Austin 
                    experience on the Day Tripper and give your team a small team event Lake Travis 
                    they'll talk about for years.
                  </p>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    Our small group boat rental Lake Travis packages are designed to make planning easy. 
                    Get a quote today and start planning your 10 person company party Austin adventure.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/chat">
                      <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-book-now">
                        <Calendar className="mr-2 h-5 w-5" />
                        Book Your Cruise
                      </Button>
                    </Link>
                    <a href="tel:5128727999">
                      <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold" data-testid="button-call-us">
                        <Phone className="mr-2 h-5 w-5" />
                        (512) 872-7999
                      </Button>
                    </a>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="Small group boat rental Lake Travis 10 person company party Austin celebration"
                      className="w-full h-full object-cover"
                      data-testid="image-final-cta"
                    />
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}

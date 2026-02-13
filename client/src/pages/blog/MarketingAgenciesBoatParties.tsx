import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Briefcase, Phone, CheckCircle2, 
  Target, Award, Waves, Calendar, Star,
  ArrowRight, Building2, Lightbulb, Palette, Megaphone,
  Sparkles, Zap, TrendingUp, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-6_1760080740018.jpg';
import sectionImage1 from '@assets/@capitalcityshots-7_1760080740018.jpg';
import sectionImage2 from '@assets/@capitalcityshots-8_1760080740018.jpg';
import sectionImage3 from '@assets/@capitalcityshots-9_1760080740019.jpg';
import sectionImage4 from '@assets/@capitalcityshots-10_1760080740019.jpg';

const creativeBenefits = [
  { 
    icon: Lightbulb, 
    title: 'Fresh Inspiration', 
    description: 'Break free from office walls and spark new ideas on the open water at your marketing agency party Austin experience',
    color: 'text-yellow-600',
    bg: 'bg-yellow-100'
  },
  { 
    icon: Palette, 
    title: 'Creative Flow', 
    description: 'The scenic Lake Travis backdrop unlocks creative thinking for your advertising agency boat Austin outing',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    icon: Users, 
    title: 'Team Chemistry', 
    description: 'Build real bonds during creative team building Lake Travis experiences that translate to better collaboration',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Megaphone, 
    title: 'Campaign Celebration', 
    description: 'Toast campaign wins and milestones with a memorable creative retreat Lake Travis celebration',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  }
];

const eventTypes = [
  {
    title: 'Campaign Launch Parties',
    description: 'Celebrate successful campaigns with your creative team',
    features: [
      'Toast your latest wins on the water',
      'Private charter for your agency',
      'Premium sound system for presentations',
      'Perfect for post-launch celebrations'
    ]
  },
  {
    title: 'Creative Retreats',
    description: 'Break away from the office to brainstorm and strategize',
    features: [
      'Inspiring Lake Travis scenery',
      'Space for whiteboard sessions',
      'Relaxed atmosphere for big thinking',
      'Team bonding activities included'
    ]
  },
  {
    title: 'Client Appreciation Events',
    description: 'Impress clients with unforgettable experiences',
    features: [
      'VIP treatment for your best clients',
      'Unique venue that stands out',
      'Build stronger client relationships',
      'Catering coordination available'
    ]
  },
  {
    title: 'Team Milestones',
    description: 'Celebrate awards, anniversaries, and achievements',
    features: [
      'Award ceremony space',
      'Photo opportunities galore',
      'Sunset cruise options',
      'Group sizes up to 75'
    ]
  }
];

const whyCreatives = [
  { stat: '100%', label: 'Creative Freedom' },
  { stat: '3+ Hours', label: 'Brainstorm Sessions' },
  { stat: '14-75', label: 'Team Capacity' },
  { stat: '5-Star', label: 'Client Reviews' }
];

const faqs = [
  {
    question: 'Is a boat party suitable for a marketing agency party Austin event?',
    answer: 'Absolutely! A marketing agency party Austin event on Lake Travis is perfect for creative teams. The unique setting breaks the routine and sparks fresh thinking. Many Austin marketing and advertising agencies book our boats for retreats, celebrations, and client events.'
  },
  {
    question: 'Can we hold brainstorming sessions during a creative retreat Lake Travis cruise?',
    answer: 'Yes! Our boats provide great spaces for creative team building Lake Travis brainstorming sessions. The relaxed water environment actually enhances creative thinking. Bring portable whiteboards or use our sound system for presentations. Many creative teams find the lake inspires their best ideas.'
  },
  {
    question: 'What size boats work best for advertising agency boat Austin outings?',
    answer: "For advertising agency boat Austin events, we offer boats from 14 to 75 guests. Small creative teams love the Day Tripper (14 guests), while full agency retreats work great on Clever Girl (50-75 guests, add'l crew fee for 51-75). We can help you pick the right boat for your team size."
  },
  {
    question: 'Can we bring our own food and drinks for a creative retreat Lake Travis event?',
    answer: 'Yes! All our creative retreat Lake Travis cruises are BYOB. Bring your own catering or snacks, plus any beverages you prefer. We provide coolers and ice. Many agencies order from local Austin restaurants and have food delivered to the marina.'
  },
  {
    question: 'How does creative team building Lake Travis differ from regular team building?',
    answer: 'Creative team building Lake Travis experiences tap into the natural inspiration of the water and scenery. Unlike traditional corporate venues, the lake environment encourages relaxed conversation and out-of-the-box thinking. The change of scenery helps creative professionals see problems from new angles.'
  },
  {
    question: 'Can we host client presentations during a marketing agency party Austin cruise?',
    answer: 'Yes! Our boats have premium sound systems perfect for presentations. For a marketing agency party Austin client event, you can showcase work, pitch concepts, or celebrate campaign wins. The unique setting makes your presentation memorable and shows clients you think differently.'
  },
  {
    question: 'What makes Lake Travis ideal for an advertising agency boat Austin event?',
    answer: 'Lake Travis offers stunning scenery that inspires creativity. For an advertising agency boat Austin outing, the combination of beautiful views, relaxed atmosphere, and private space creates the perfect environment for both celebration and creative work. Plus, it shows clients and team members that your agency values unique experiences.'
  },
  {
    question: 'How far in advance should we book a creative retreat Lake Travis cruise?',
    answer: 'For creative retreat Lake Travis bookings, we recommend 2-4 weeks ahead. Popular dates fill fast, especially during spring and fall. The sooner you book, the more options you have for boat selection and timing. Contact us early to secure your preferred date.'
  }
];

const packageOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Small creative teams' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Department brainstorms' },
  { name: 'Clever Girl', capacity: '50 guests', best: 'Full agency retreats' },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Agency-wide events' }
];

export default function MarketingAgenciesBoatParties() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/marketing-creative-agencies-boat-austin"
        defaultTitle="Marketing Agency Party Austin | Creative Team Building Lake Travis | Advertising Agency Boat"
        defaultDescription="Plan the ultimate marketing agency party Austin on Lake Travis. Creative team building, advertising agency boat rentals, and creative retreat Lake Travis experiences. Boats for 14-75 guests."
        defaultKeywords={['marketing agency party Austin', 'creative team building Lake Travis', 'advertising agency boat Austin', 'creative retreat Lake Travis', 'Austin marketing events', 'creative agency boat party']}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="marketing-agencies-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Marketing Agency Party Austin - Premier Party Cruises Lake Travis"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-purple-600 font-bold">
              CREATIVE AGENCY EVENTS
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Marketing & Creative Agencies – Unleash Creativity with a Boat Brainstorm
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              The Ultimate Marketing Agency Party Austin Experience on Lake Travis
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Break free from the conference room. Host your creative team building Lake Travis retreat on the water where inspiration flows as freely as the waves.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-purple-600 font-bold text-lg px-8 py-6"
                  data-testid="button-plan-event"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Plan Your Creative Event
                </Button>
              </Link>
              <Link href="/team-building">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                  data-testid="button-view-team-building"
                >
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


        {/* Why Creative Teams Love Boat Parties */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Creative Teams Love Boat Parties</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From marketing agency party Austin celebrations to advertising agency boat Austin brainstorms, creative professionals thrive on the water
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {creativeBenefits.map((item, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
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
        <section className="py-12 bg-gradient-to-r from-purple-900 to-pink-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyCreatives.map((item, index) => (
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

        {/* How Water Inspires Creativity */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-inspiration">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-700">THE CREATIVE ADVANTAGE</Badge>
                  <h2 className="text-3xl font-bold mb-6">How the Water Inspires Creativity</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    There's a reason creatives have always been drawn to water. The gentle motion of the boat, the endless horizon, and the freedom from office distractions create the perfect environment for breakthrough thinking. Your creative team building Lake Travis experience taps into this natural source of inspiration.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Whether you're planning a marketing agency party Austin event to celebrate a campaign win or an advertising agency boat Austin brainstorm session, the lake setting helps your team see challenges from new perspectives. The change of scenery literally changes how your brain processes information.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Natural environment reduces stress and opens minds',
                      'No interruptions from emails or office distractions',
                      'Scenic beauty stimulates visual creativity',
                      'Relaxed atmosphere encourages bold ideas',
                      'Team bonding happens naturally on the water'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-purple-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Creative team brainstorming on Lake Travis boat party marketing agency Austin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="font-bold text-sm">Big Ideas</p>
                        <p className="text-xs text-gray-500">Born on the water</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-event-types">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Perfect For Your Agency</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From creative retreat Lake Travis escapes to advertising agency boat Austin celebrations, we host it all
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventTypes.map((event, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <p className="text-sm text-gray-500">{event.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {event.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/client-entertainment">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  data-testid="button-client-entertainment"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Learn About Client Entertainment
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Boat Options for Creative Agencies */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white" data-testid="section-boats">
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
                      alt="Advertising agency boat Austin party boat fleet Lake Travis creative team"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">BOAT OPTIONS</Badge>
                  <h2 className="text-3xl font-bold mb-6">Boats for Creative Agencies</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Whether you're hosting an intimate creative retreat Lake Travis brainstorm or a full marketing agency party Austin celebration, we have the perfect vessel. Each boat offers a private experience with professional crew and premium amenities.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {packageOptions.map((boat, index) => (
                      <Card key={index} className="bg-white/10 border-white/20">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-white">{boat.name}</h4>
                          <p className="text-yellow-400 text-sm">{boat.capacity}</p>
                          <p className="text-white/70 text-xs mt-1">{boat.best}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Link href="/private-cruises">
                    <Button 
                      size="lg" 
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold"
                      data-testid="button-view-boats"
                    >
                      <Ship className="mr-2 h-5 w-5" />
                      View All Boats
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-included">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700">WHAT'S INCLUDED</Badge>
                  <h2 className="text-3xl font-bold mb-6">Everything for Your Creative Event</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Focus on your creative team building Lake Travis experience while we handle the logistics. Every marketing agency party Austin event includes premium amenities.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Private boat charter (3+ hours)',
                      'Professional captain and crew',
                      'Premium Bluetooth sound system',
                      'Giant lily pad floats for swimming',
                      'Coolers and ice provided',
                      'BYOB - bring your own catering',
                      'Flexible scheduling options',
                      'Free parking at the marina'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/corporate-events">
                    <Button 
                      size="lg" 
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
                      data-testid="button-corporate-events"
                    >
                      <Building2 className="mr-2 h-5 w-5" />
                      Explore Corporate Events
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Creative retreat Lake Travis boat party marketing team Austin celebration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">All-Inclusive</p>
                        <p className="text-xs text-gray-500">No hidden fees</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Success Stories / Testimonials Teaser */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Creative Teams Love Us</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Marketing agencies and creative teams across Austin choose Premier Party Cruises for their advertising agency boat Austin events
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Our marketing agency party Austin celebration was incredible. The whole team came back energized and full of fresh ideas.",
                  author: "Marketing Director",
                  company: "Austin Creative Agency"
                },
                {
                  quote: "The creative retreat Lake Travis experience helped us bond as a team in ways the office never could. Highly recommend!",
                  author: "Creative Director", 
                  company: "Digital Marketing Firm"
                },
                {
                  quote: "We host our advertising agency boat Austin client events here every quarter. Clients are always impressed.",
                  author: "Account Executive",
                  company: "Full-Service Ad Agency"
                }
              ].map((testimonial, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 italic mb-4">"{testimonial.quote}"</p>
                      <p className="font-bold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">See the Experience</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Get a glimpse of what your creative team building Lake Travis experience could look like
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={sectionImage4}
                  alt="Marketing agency party Austin Lake Travis boat celebration creative team outing"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={heroImage}
                  alt="Marketing agency team building boat party Lake Travis Austin creative brainstorm"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
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
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about marketing agency party Austin and creative team building Lake Travis events
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
        <section className="py-16 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Unleash Your Team's Creativity?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Book your marketing agency party Austin or creative retreat Lake Travis experience today. We'll help you plan an unforgettable event.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6"
                    data-testid="button-get-quote"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get Your Quote
                  </Button>
                </Link>
                <a href="tel:5127270422">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                    data-testid="button-call"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 727-0422
                  </Button>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/team-building">
                  <span className="text-white/80 hover:text-white underline cursor-pointer" data-testid="link-team-building">
                    Team Building
                  </span>
                </Link>
                <span className="text-white/60">|</span>
                <Link href="/client-entertainment">
                  <span className="text-white/80 hover:text-white underline cursor-pointer" data-testid="link-client-entertainment">
                    Client Entertainment
                  </span>
                </Link>
                <span className="text-white/60">|</span>
                <Link href="/private-cruises">
                  <span className="text-white/80 hover:text-white underline cursor-pointer" data-testid="link-private-cruises">
                    Private Cruises
                  </span>
                </Link>
                <span className="text-white/60">|</span>
                <Link href="/corporate-events">
                  <span className="text-white/80 hover:text-white underline cursor-pointer" data-testid="link-corporate-events">
                    Corporate Events
                  </span>
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

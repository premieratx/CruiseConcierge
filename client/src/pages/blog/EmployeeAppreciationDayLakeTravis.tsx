import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Target, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, Handshake, Trophy, Heart,
  Gift, PartyPopper, Sparkles, Shield, Music
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-12_1760080740019.jpg';
import sectionImage1 from '@assets/@capitalcityshots-13_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-14_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-15_1760080740020.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const appreciationBenefits = [
  { 
    icon: Heart, 
    title: 'Show Genuine Appreciation', 
    description: 'A corporate boat party Austin experience shows employees you truly value their hard work and dedication',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  { 
    icon: Users, 
    title: 'Build Team Unity', 
    description: 'Team building Lake Travis cruises create bonds that translate to better collaboration back at the office',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Trophy, 
    title: 'Boost Morale', 
    description: 'Employee appreciation ideas Austin that go beyond the ordinary make your team feel truly special',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Gift, 
    title: 'Create Memories', 
    description: 'A Lake Travis corporate event gives your team an unforgettable experience they will talk about for years',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const whyBoatParty = [
  {
    title: 'Unique Venue',
    description: 'Stand out from typical office parties with a corporate boat party Austin experience on beautiful Lake Travis',
    features: [
      'Stunning lake views and scenery',
      'Private charter just for your team',
      'Escape the ordinary office environment',
      'Create Instagram-worthy moments'
    ]
  },
  {
    title: 'All-Inclusive Convenience',
    description: 'Our Lake Travis corporate event packages handle every detail so you can focus on celebrating',
    features: [
      'Professional captain and crew',
      'Sound system and entertainment',
      'Coolers and ice provided',
      'Flexible scheduling options'
    ]
  },
  {
    title: 'Stress-Free Planning',
    description: 'Employee appreciation ideas Austin made easy with our full-service approach to team building Lake Travis',
    features: [
      'Dedicated event coordination',
      'Catering partnerships available',
      'BYOB flexibility',
      'One simple booking process'
    ]
  },
  {
    title: 'Activities for Everyone',
    description: 'From swimming to sunset toasts, our corporate boat party Austin experience offers something for every team member',
    features: [
      'Swimming and water activities',
      'Giant lily pad floats',
      'Award ceremonies on board',
      'Sunset cruise options'
    ]
  }
];

const safetyStats = [
  { stat: '14+', label: 'Years of Excellence' },
  { stat: '125,000+', label: 'Happy Guests Served' },
  { stat: '100%', label: 'Perfect Safety Record' },
  { stat: '5-Star', label: 'Google Review Rating' }
];

const faqs = [
  {
    question: 'How do I plan a corporate boat party Austin for Employee Appreciation Day?',
    answer: 'Planning is simple! Contact us with your group size, preferred date, and any special requests. We handle the rest - from boat selection to coordination with catering partners. Our team building Lake Travis experts will guide you through every step to ensure a memorable employee appreciation event.'
  },
  {
    question: 'What employee appreciation ideas Austin can we incorporate on the boat?',
    answer: 'Popular activities include award ceremonies, team photo sessions, swimming and floating on giant lily pads, sunset toasts, and group games. Many companies use the Lake Travis corporate event as an opportunity to recognize top performers and celebrate company milestones together.'
  },
  {
    question: 'Can we bring our own food and drinks for the corporate boat party Austin?',
    answer: 'Absolutely! All our private cruises are BYOB (cans and plastic only). You can bring your own catering or we can connect you with local catering partners who specialize in corporate events. We also partner with Party On Delivery for convenient alcohol delivery that arrives iced and ready.'
  },
  {
    question: 'What size boats are available for team building Lake Travis events?',
    answer: "We have boats for groups of all sizes: Day Tripper (14 guests) for small teams, Meeseeks and The Irony (25-30 guests) for medium groups, and Clever Girl (50-75 guests, add'l crew fee for 51-75) for large company celebrations. Each Lake Travis corporate event includes professional crew and all amenities."
  },
  {
    question: 'How far in advance should we book our employee appreciation boat party?',
    answer: 'For employee appreciation ideas Austin and corporate events, we recommend booking 2-4 weeks in advance. Popular dates during spring and fall fill quickly. The sooner you reach out, the more flexibility you will have in choosing your preferred date and boat for your team building Lake Travis experience.'
  }
];

const boatOptions = [
  { name: 'Day Tripper', capacity: '14 guests', best: 'Small team outings & intimate celebrations', description: 'Perfect for department teams and executive retreats' },
  { name: 'Meeseeks', capacity: '25 guests', best: 'Medium team gatherings', description: 'Ideal for cross-functional team building Lake Travis events' },
  { name: 'The Irony', capacity: '30 guests', best: 'Departmental celebrations', description: 'Great for larger departments and multiple teams' },
  { name: 'Clever Girl', capacity: '50-75 guests', best: 'Company-wide employee appreciation', description: 'Our flagship for large Lake Travis corporate events' }
];

const activityIdeas = [
  {
    icon: Waves,
    title: 'Swimming & Water Fun',
    description: 'Jump in and cool off in beautiful Lake Travis waters'
  },
  {
    icon: Trophy,
    title: 'Awards Ceremony',
    description: 'Recognize top performers with a memorable on-water celebration'
  },
  {
    icon: Music,
    title: 'Dance Party',
    description: 'Premium Bluetooth sound system for your favorite playlist'
  },
  {
    icon: PartyPopper,
    title: 'Team Games',
    description: 'Fun activities that bring your team closer together'
  },
  {
    icon: Sparkles,
    title: 'Sunset Toast',
    description: 'End the day with a beautiful Lake Travis sunset and celebratory drinks'
  },
  {
    icon: Gift,
    title: 'Gift Presentations',
    description: 'Special space for presenting employee appreciation gifts'
  }
];

export default function EmployeeAppreciationDayLakeTravis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Employee Appreciation Day Boat Party Lake Travis | Corporate Events Austin | Premier Party Cruises</title>
        <meta name="description" content="Plan the perfect employee appreciation boat party on Lake Travis. All-inclusive corporate boat party Austin with team building activities, BYOB, catering coordination. Book your Lake Travis corporate event today!" />
        <meta name="keywords" content="corporate boat party Austin, Lake Travis corporate event, employee appreciation ideas Austin, team building Lake Travis, employee appreciation day Austin, corporate party boat Lake Travis, Austin company party ideas, team celebration Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/employee-appreciation-day-reward-your-team-with-an-easy-all-inclusive-boat-party" />
        <meta property="og:title" content="Employee Appreciation Day Boat Party Lake Travis | Corporate Events Austin" />
        <meta property="og:description" content="Reward your team with an unforgettable corporate boat party Austin on Lake Travis. All-inclusive packages, team building activities, and stress-free planning." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Employee Appreciation Day Boat Party Lake Travis" />
        <meta name="twitter:description" content="Plan the perfect employee appreciation event with a Lake Travis corporate event. Team building, celebration, and unforgettable memories." />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-orange-600 font-bold" data-testid="badge-hero">
              EMPLOYEE APPRECIATION IDEAS AUSTIN
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Employee Appreciation Day – Reward Your Team with an Easy, All-Inclusive Boat Party
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              The Ultimate Corporate Boat Party Austin Experience on Lake Travis
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Show your team they matter with an unforgettable Lake Travis corporate event. From team building Lake Travis activities to sunset celebrations, we make employee appreciation easy and memorable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/private-cruises">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-orange-600 font-bold text-lg px-8 py-6" data-testid="button-book-now-hero">
                  <Gift className="mr-2 h-5 w-5" />
                  Book Your Team's Celebration
                </Button>
              </Link>
              <Link href="/team-building">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-team-building-hero">
                  View Team Building Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Intro Section - Why Employee Appreciation Matters */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Why Employee Appreciation Matters More Than Ever</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                In today's competitive job market, showing genuine appreciation for your team isn't just nice to have—it's essential. Employees who feel valued are more engaged, productive, and loyal. But the typical pizza party or gift card just doesn't cut it anymore. Your team deserves employee appreciation ideas Austin that go beyond the ordinary.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                That's where a corporate boat party Austin comes in. Imagine taking your entire team out on the beautiful waters of Lake Travis for a day of celebration, relaxation, and genuine connection. A Lake Travis corporate event transforms a simple thank-you into an experience your team will talk about for years.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/client-entertainment">
                  <Button variant="outline" className="font-semibold" data-testid="link-client-entertainment">
                    Client Entertainment Options
                  </Button>
                </Link>
                <Link href="/company-milestone">
                  <Button variant="outline" className="font-semibold" data-testid="link-company-milestone">
                    Company Milestone Celebrations
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why a Corporate Boat Party Austin for Employee Appreciation?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Team building Lake Travis experiences that create lasting memories and stronger teams
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {appreciationBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-orange-200" data-testid={`card-benefit-${index}`}>
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 ${item.bg} rounded-full flex items-center justify-center`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Stats Section */}
        <section className="py-12 bg-orange-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {safetyStats.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-400">{item.stat}</p>
                  <p className="text-sm md:text-base text-white/80 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Boat Party Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-orange-100 text-orange-700">UNIQUE VENUE FOR EMPLOYEE APPRECIATION</Badge>
                  <h2 className="text-3xl font-bold mb-6">Why a Boat Party for Employee Appreciation?</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    When it comes to employee appreciation ideas Austin, nothing beats taking your team out of the office and onto the water. A Lake Travis corporate event offers a unique setting that encourages genuine connection and creates memories that last.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {whyBoatParty.slice(0, 4).map((item, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`card-why-boat-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                          <ul className="space-y-1">
                            {item.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-orange-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {feature}
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
                      alt="Corporate team building on Lake Travis party boat Austin Texas"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Heart className="h-8 w-8 text-red-500" />
                      <div>
                        <p className="font-bold text-sm">Employee Appreciation</p>
                        <p className="text-xs text-gray-500">Make them feel valued</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How Premier Makes It Easy */}
        <section className="py-16 bg-gradient-to-br from-orange-900 via-amber-800 to-red-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
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
                      alt="Lake Travis employee appreciation boat cruise corporate team bonding"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-yellow-400 text-black">STRESS-FREE PLANNING</Badge>
                  <h2 className="text-3xl font-bold mb-6">How Premier Makes Your Corporate Boat Party Austin Easy</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Planning a Lake Travis corporate event shouldn't add stress to your already busy schedule. That's why we handle everything so you can focus on celebrating your team's achievements.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      { title: 'BYOB Flexibility', desc: 'Bring your own food and drinks, or we can help coordinate catering' },
                      { title: 'Party On Delivery Partnership', desc: 'Alcohol delivered, iced, and ready when you arrive' },
                      { title: 'Catering Coordination', desc: 'We connect you with Austin\'s best caterers for team building Lake Travis events' },
                      { title: 'All-Inclusive Packages', desc: 'Captain, crew, sound system, coolers, and ice all included' },
                      { title: 'Flexible Scheduling', desc: 'Morning, afternoon, or sunset cruises to fit your team\'s schedule' }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                        <div>
                          <span className="font-bold">{item.title}</span>
                          <p className="text-white/70 text-sm">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/private-cruises">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold" data-testid="button-view-packages">
                      <Ship className="mr-2 h-5 w-5" />
                      Explore Private Cruise Options
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Activities & Ideas Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Activities & Ideas for Your Corporate Boat Party Austin</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Make your employee appreciation ideas Austin come to life with these team building Lake Travis activities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activityIdeas.map((activity, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-activity-${index}`}>
                    <CardContent className="pt-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                        <activity.icon className="h-7 w-7 text-orange-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{activity.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Boat Options Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-orange-100 text-orange-700">BOAT OPTIONS FOR ANY TEAM SIZE</Badge>
                  <h2 className="text-3xl font-bold mb-6">Choose the Perfect Boat for Your Lake Travis Corporate Event</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you're planning employee appreciation ideas Austin for a small department or a company-wide celebration, we have the perfect corporate boat party Austin option for your team.
                  </p>
                  
                  <div className="space-y-4">
                    {boatOptions.map((boat, index) => (
                      <Card key={index} className="bg-white shadow-md" data-testid={`card-boat-${index}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-lg text-gray-900">{boat.name}</h4>
                              <p className="text-orange-600 font-semibold">{boat.capacity}</p>
                              <p className="text-sm text-gray-600 mt-1">{boat.best}</p>
                              <p className="text-xs text-gray-500 mt-1">{boat.description}</p>
                            </div>
                            <Ship className="h-8 w-8 text-orange-500" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Austin corporate boat party employee reward celebration Lake Travis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">14+ Years Experience</p>
                        <p className="text-xs text-gray-500">Perfect safety record</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* Internal Links Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Explore More Corporate Event Options</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover all the ways Premier Party Cruises can make your Lake Travis corporate event special
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/team-building">
                <Button variant="outline" className="font-semibold" data-testid="link-team-building">
                  <Users className="mr-2 h-4 w-4" />
                  Team Building Events
                </Button>
              </Link>
              <Link href="/client-entertainment">
                <Button variant="outline" className="font-semibold" data-testid="link-client-entertainment-2">
                  <Handshake className="mr-2 h-4 w-4" />
                  Client Entertainment
                </Button>
              </Link>
              <Link href="/company-milestone">
                <Button variant="outline" className="font-semibold" data-testid="link-company-milestone-2">
                  <Trophy className="mr-2 h-4 w-4" />
                  Company Milestones
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button variant="outline" className="font-semibold" data-testid="link-private-cruises">
                  <Ship className="mr-2 h-4 w-4" />
                  Private Cruises
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button variant="outline" className="font-semibold" data-testid="link-corporate-events">
                  <Building2 className="mr-2 h-4 w-4" />
                  Corporate Events
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about corporate boat party Austin and employee appreciation ideas Austin
              </p>
            </motion.div>

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
        <section className="py-16 bg-gradient-to-br from-orange-900 to-red-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Plan Your Employee Appreciation Event?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Give your team the recognition they deserve with an unforgettable corporate boat party Austin on Lake Travis. Our team building Lake Travis experts are ready to help you plan the perfect celebration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/private-cruises">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6" data-testid="button-book-now-cta">
                    <Gift className="mr-2 h-5 w-5" />
                    Book Your Team's Celebration
                  </Button>
                </Link>
                <a href="tel:5127270422">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-call-cta">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 727-0422
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

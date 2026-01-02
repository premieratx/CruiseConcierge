import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { 
  Ship, Users, Briefcase, Phone, Clock, CheckCircle2, 
  Gift, Award, Waves, MapPin, Calendar, Star,
  ArrowRight, Building2, PartyPopper, Trophy, Snowflake,
  Music, Utensils, Sparkles, Wine
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-1_1760080740012.jpg';
import sectionImage1 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import sectionImage2 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import sectionImage3 from '@assets/@capitalcityshots-4_1760080740017.jpg';
import sectionImage4 from '@assets/@capitalcityshots-5_1760080740018.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const holidayBenefits = [
  { 
    icon: Snowflake, 
    title: 'Unique Holiday Venue', 
    description: 'Skip the boring conference room - host your company holiday party Austin style on the water',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    icon: Star, 
    title: 'Built-In Holiday Ambiance', 
    description: 'Stunning lake views and sunset backdrops create magical holiday boat party Austin memories',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  { 
    icon: Users, 
    title: 'Private Celebration', 
    description: 'Your team has the entire boat for an exclusive corporate holiday party Lake Travis experience',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  { 
    icon: PartyPopper, 
    title: 'Year-End Celebration', 
    description: 'Reward your team with an unforgettable Lake Travis holiday celebration they will talk about all year',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

const boatOptions = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    best: 'Intimate team gatherings',
    description: 'Perfect for small departments or executive teams planning a company holiday party Austin outing'
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    best: 'Medium-sized teams',
    description: 'Ideal for department holiday celebrations with room for everyone to mingle'
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    best: 'Growing teams',
    description: 'Great for corporate holiday party Lake Travis events with a bit more space'
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    best: 'Large company parties',
    description: 'Our flagship vessel for full company holiday boat party Austin celebrations'
  }
];

const packageTiers = [
  {
    name: 'Standard Package',
    description: 'Essential cruise experience',
    icon: Ship,
    features: [
      'Licensed, experienced captain',
      'Premium Bluetooth sound system',
      'Large coolers (bring your own ice)',
      'Clean restroom facilities',
      'Sun and shade seating areas',
      'BYOB friendly (cans/plastic only)'
    ],
    best: 'Budget-conscious teams',
    color: 'blue'
  },
  {
    name: 'Essentials Package',
    description: 'Enhanced convenience for your holiday event',
    icon: Sparkles,
    features: [
      'Everything in Standard',
      'Coolers pre-stocked with ice',
      '5-gallon water dispenser',
      'Solo cups and ice water',
      '6-foot folding table for setup',
      'Party On Delivery coordination'
    ],
    best: 'Most corporate events',
    color: 'yellow',
    popular: true
  },
  {
    name: 'Ultimate Package',
    description: 'Full holiday party atmosphere',
    icon: Gift,
    features: [
      'Everything in Essentials',
      'Giant lily pad float',
      'Guest of honor float',
      'Disco ball party cups',
      'Bubble guns and wands',
      'Champagne flutes and juices',
      'SPF-50 sunscreen provided'
    ],
    best: 'Premium celebrations',
    color: 'purple'
  }
];

const entertainmentIdeas = [
  {
    title: 'Holiday Music Playlist',
    description: 'Connect to our premium Bluetooth sound system and play festive tunes for your holiday boat party Austin celebration',
    icon: Music
  },
  {
    title: 'Dance Party on Deck',
    description: 'Our boats have plenty of space for dancing under the stars during your Lake Travis holiday celebration',
    icon: PartyPopper
  },
  {
    title: 'Holiday Games & Awards',
    description: 'Organize ugly sweater contests, white elephant exchanges, or year-end awards for your corporate holiday party Lake Travis',
    icon: Trophy
  },
  {
    title: 'Photo Opportunities',
    description: 'Capture stunning sunset photos with the lake as your backdrop for unforgettable company holiday party Austin memories',
    icon: Star
  }
];

const planningTimeline = [
  { weeks: '6-8 weeks before', task: 'Book your boat and choose your package for the best selection' },
  { weeks: '4 weeks before', task: 'Finalize headcount and coordinate with Party On Delivery for beverages' },
  { weeks: '2 weeks before', task: 'Plan your menu, entertainment, and any special activities' },
  { weeks: '1 week before', task: 'Send final details to your team including parking and meeting location' },
  { weeks: 'Day of', task: 'Arrive 15 minutes early, let your captain handle the rest' }
];

const whyLakeTravis = [
  { stat: '3+ Hours', label: 'Cruise Duration Options' },
  { stat: '14-75', label: 'Guest Capacity Range' },
  { stat: '100%', label: 'Private Charter Experience' },
  { stat: '5-Star', label: 'Google Review Rating' }
];

const faqs = [
  {
    question: 'When should I book my company holiday party Austin cruise?',
    answer: 'We recommend booking 6-8 weeks in advance for corporate holiday party Lake Travis events. December dates fill quickly, so early booking ensures you get your preferred date and boat size.'
  },
  {
    question: 'How many people can you accommodate for a holiday boat party Austin?',
    answer: 'Our fleet accommodates groups from 14 to 75 guests. The Day Tripper holds 14, Meeseeks holds 25, The Irony holds 30, and our flagship Clever Girl accommodates 50-75 for large company celebrations.'
  },
  {
    question: 'Can we bring our own holiday food and drinks for our Lake Travis holiday celebration?',
    answer: 'Yes! All our cruises are BYOB. You can bring your own catering or we can coordinate with Party On Delivery to have food and beverages ready when you arrive. We provide coolers and ice.'
  },
  {
    question: 'What if the weather is bad for our corporate holiday party Lake Travis?',
    answer: 'Safety is our priority. If weather forces a cancellation, we offer full rescheduling or refunds. Our team monitors conditions and will contact you ahead of time with any concerns.'
  },
  {
    question: 'Can we decorate the boat for our company holiday party Austin?',
    answer: 'Yes, you can bring holiday decorations! We ask that decorations be removable and not damage the boat. Many teams bring holiday-themed items, banners, and festive accessories.'
  },
  {
    question: 'Do you offer corporate packages or discounts for holiday boat party Austin events?',
    answer: 'We offer corporate packages designed for business groups. Contact us for custom quotes based on your group size, date, and specific needs. We work with companies of all sizes for their Lake Travis holiday celebration.'
  },
  {
    question: 'What time slots are available for corporate holiday party Lake Travis cruises?',
    answer: 'We offer morning, afternoon, and sunset cruises. Sunset cruises are especially popular for holiday events as they provide stunning photo opportunities and a magical atmosphere for your celebration.'
  },
  {
    question: 'Is swimming allowed during our company holiday party Austin cruise?',
    answer: 'Swimming is allowed when conditions are safe and at the captain\'s discretion. December water can be chilly, but some adventurous teams still enjoy a quick dip during their Lake Travis holiday celebration!'
  }
];

export default function CompanyHolidayPartyLakeTravis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>How to Throw the Perfect Company Holiday Party on Lake Travis | Austin Corporate Celebrations</title>
        <meta name="description" content="Plan the ultimate company holiday party Austin experience on Lake Travis. Corporate holiday party boat rentals for 14-75 guests. BYOB, catering coordination, and stunning sunset views." />
        <meta name="keywords" content="company holiday party Austin, corporate holiday party Lake Travis, holiday boat party Austin, Lake Travis holiday celebration, Austin corporate Christmas party, holiday office party boat" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/company-holiday-party-lake-travis" />
        <meta property="og:title" content="How to Throw the Perfect Company Holiday Party on Lake Travis | Austin Corporate Celebrations" />
        <meta property="og:description" content="Plan the ultimate company holiday party Austin experience on Lake Travis. Corporate holiday boat rentals with stunning sunset views." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-1_1760080740012.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-red-900 via-green-800 to-slate-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-white text-red-600 font-bold" data-testid="badge-holiday-party">
              <Snowflake className="mr-1 h-4 w-4" />
              HOLIDAY CELEBRATION GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              How to Throw the Perfect Company Holiday Party on Lake Travis
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
              Your Complete Guide to Planning a Corporate Holiday Party Lake Travis Experience
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Create an unforgettable company holiday party Austin celebration that your team will remember all year. 
              Skip the boring venue and celebrate on the water with stunning views.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-red-600 font-bold text-lg px-8 py-6"
                  data-testid="button-plan-holiday-party"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  Plan Your Holiday Party
                </Button>
              </Link>
              <Link href="/corporate-events">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                  data-testid="button-view-corporate-events"
                >
                  View Corporate Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Why Lake Travis Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Lake Travis Makes the Ultimate Holiday Backdrop</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Forget the crowded restaurants and predictable venues. A holiday boat party Austin celebration on Lake Travis 
                offers stunning scenery, privacy, and an experience your team will never forget.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {holidayBenefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow border-2 hover:border-red-200" data-testid={`card-benefit-${index}`}>
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

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-red-800 to-green-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {whyLakeTravis.map((item, index) => (
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

        {/* Selecting the Ideal Boat Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-red-100 text-red-700">SELECTING THE IDEAL BOAT</Badge>
                  <h2 className="text-3xl font-bold mb-6">Choose the Perfect Vessel for Your Company Holiday Party Austin</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Whether you're planning an intimate executive gathering or a large corporate holiday party Lake Travis celebration, 
                    we have the right boat for your team. Each vessel offers a private, all-inclusive experience with professional crew.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {boatOptions.map((boat, index) => (
                      <Card key={index} className="bg-white/80" data-testid={`card-boat-${index}`}>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-sm mb-1">{boat.name}</h4>
                          <p className="text-red-600 text-xs font-semibold">{boat.capacity}</p>
                          <p className="text-xs text-gray-500 mt-1">{boat.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Link href="/private-cruises">
                      <Button 
                        size="lg" 
                        className="bg-red-600 hover:bg-red-700 text-white font-bold"
                        data-testid="button-view-all-boats"
                      >
                        <Ship className="mr-2 h-5 w-5" />
                        View All Boats
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage1}
                      alt="Corporate holiday party Lake Travis boat celebration with team enjoying sunset"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-8 w-8 text-red-500" />
                      <div>
                        <p className="font-bold text-sm">Private Charters</p>
                        <p className="text-xs text-gray-500">Your team only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Package Tiers Section */}
        <section className="py-16 bg-gradient-to-br from-red-900 via-green-800 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-yellow-400 text-black">PACKAGE TIERS</Badge>
              <h2 className="text-3xl font-bold mb-4">Choose Your Holiday Boat Party Austin Experience</h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                From simple and affordable to all-inclusive luxury, select the package that fits your Lake Travis holiday celebration vision.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {packageTiers.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className={`h-full bg-white/10 border-white/20 relative ${pkg.popular ? 'ring-2 ring-yellow-400' : ''}`} data-testid={`card-package-${index}`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-yellow-400 text-black font-bold">MOST POPULAR</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <pkg.icon className="h-8 w-8 text-yellow-400" />
                        <div>
                          <CardTitle className="text-white">{pkg.name}</CardTitle>
                          <p className="text-white/70 text-sm">{pkg.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                            <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-yellow-400 font-semibold">Best for: {pkg.best}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Food & Beverage Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage2}
                      alt="Holiday boat party Austin food and beverage setup on Lake Travis cruise"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Wine className="h-8 w-8 text-purple-500" />
                      <div>
                        <p className="font-bold text-sm">BYOB Friendly</p>
                        <p className="text-xs text-gray-500">We provide the coolers</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <Badge className="mb-4 bg-purple-100 text-purple-700">FOOD & BEVERAGE</Badge>
                  <h2 className="text-3xl font-bold mb-6">Coordinate Catering for Your Company Holiday Party Austin</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    All our cruises are BYOB! Bring your own food and drinks, or let us coordinate with Party On Delivery 
                    to have everything ready when you arrive for your corporate holiday party Lake Travis event.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      'Coolers and ice provided on board',
                      'Party On Delivery coordination available',
                      'Tables for food and drink setup',
                      'Cans and plastic containers only (no glass)',
                      'We can recommend local catering partners',
                      'Holiday-themed drinks and treats welcome'
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
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
                      data-testid="button-client-entertainment"
                    >
                      <Utensils className="mr-2 h-5 w-5" />
                      Learn About Client Entertainment
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Entertainment Ideas Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Entertainment Ideas for Your Lake Travis Holiday Celebration</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Make your holiday boat party Austin event unforgettable with these entertainment suggestions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {entertainmentIdeas.map((idea, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-entertainment-${index}`}>
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <idea.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{idea.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{idea.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Timeline Section */}
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
                  <Badge className="mb-4 bg-blue-100 text-blue-700">PLANNING TIMELINE</Badge>
                  <h2 className="text-3xl font-bold mb-6">How to Plan Your Corporate Holiday Party Lake Travis Event</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Follow this simple timeline to ensure your company holiday party Austin celebration goes smoothly. 
                    The earlier you book, the better selection of dates and boats you'll have.
                  </p>
                  
                  <div className="space-y-4">
                    {planningTimeline.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex-shrink-0 w-24">
                          <Badge className="bg-red-100 text-red-700 text-xs">{item.weeks}</Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{item.task}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage3}
                      alt="Lake Travis holiday celebration planning team gathering on party boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Book Early</p>
                        <p className="text-xs text-gray-500">December fills fast</p>
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

        {/* Team Building CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Planning a Company Holiday Party Austin? Consider Team Building Too!</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Many companies combine their Lake Travis holiday celebration with team building activities. 
                    Our boats provide the perfect setting for strengthening team bonds while celebrating the season.
                  </p>
                  <p className="text-lg text-white/80 mb-8">
                    Whether you want informal networking time or structured holiday games, a holiday boat party Austin 
                    on the water creates memories that last well beyond the holiday season.
                  </p>
                  
                  <Link href="/team-building">
                    <Button 
                      size="lg" 
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold"
                      data-testid="button-team-building"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Explore Team Building Options
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={sectionImage4}
                      alt="Company holiday party Austin team building activities on Lake Travis boat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
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
                Common questions about planning a corporate holiday party Lake Travis celebration
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

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-red-900 via-green-800 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Snowflake className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Plan Your Company Holiday Party Austin Celebration?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get a custom quote for your holiday boat party Austin event. We'll help you pick the right boat 
                and create the perfect Lake Travis holiday celebration for your team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-6"
                    data-testid="button-get-quote-final"
                  >
                    <Gift className="mr-2 h-5 w-5" />
                    Get Your Holiday Quote
                  </Button>
                </Link>
                <a href="tel:5127270422">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                    data-testid="button-call-phone"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call (512) 727-0422
                  </Button>
                </a>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/team-building">
                  <Button 
                    variant="link" 
                    className="text-white/80 hover:text-white"
                    data-testid="link-team-building"
                  >
                    Team Building <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/client-entertainment">
                  <Button 
                    variant="link" 
                    className="text-white/80 hover:text-white"
                    data-testid="link-client-entertainment"
                  >
                    Client Entertainment <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button 
                    variant="link" 
                    className="text-white/80 hover:text-white"
                    data-testid="link-private-cruises"
                  >
                    Private Cruises <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/corporate-events">
                  <Button 
                    variant="link" 
                    className="text-white/80 hover:text-white"
                    data-testid="link-corporate-events"
                  >
                    Corporate Events <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

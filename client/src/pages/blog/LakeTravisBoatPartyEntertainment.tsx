import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, Music, Phone, Clock, CheckCircle2, 
  Waves, Award, Sparkles, MapPin, Calendar, Star,
  ArrowRight, Building2, Gamepad2, PartyPopper,
  Package, Anchor, Camera, Heart, Zap, Shield,
  Sun, Umbrella, Palmtree, Dumbbell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-7_1760080740018.jpg';
import sectionImage1 from '@assets/@capitalcityshots-8_1760080740018.jpg';
import sectionImage2 from '@assets/@capitalcityshots-9_1760080740019.jpg';
import sectionImage3 from '@assets/@capitalcityshots-10_1760080740019.jpg';

const entertainmentCategories = [
  {
    title: 'Water Activities',
    icon: Waves,
    color: 'bg-blue-500',
    items: [
      { name: 'Swimming Stops', description: 'Multiple scenic coves for Lake Travis boat party activities swimming' },
      { name: 'Giant Lily Pad Float', description: 'Included with every party boat entertainment Austin rental' },
      { name: 'Water Lounging', description: 'Float and relax during your boat party amenities Lake Travis experience' },
      { name: 'Cliff Viewing', description: 'See stunning Lake Travis scenery from the water' }
    ]
  },
  {
    title: 'Music & Sound',
    icon: Music,
    color: 'bg-purple-500',
    items: [
      { name: 'Premium Bluetooth Speakers', description: 'High-quality sound system on every Austin party boat activities vessel' },
      { name: 'Custom Playlists', description: 'Connect your phone for personalized Lake Travis party entertainment' },
      { name: 'Party Mode Sound', description: 'Perfect volume for conversation and dancing' },
      { name: 'Waterproof Equipment', description: 'All boat party entertainment Austin systems are marine-grade' }
    ]
  },
  {
    title: 'Onboard Amenities',
    icon: Package,
    color: 'bg-amber-500',
    items: [
      { name: 'Shaded Seating Areas', description: 'Single-deck pontoons with arch canopy for comfort' },
      { name: 'Coolers with Ice', description: 'Keep beverages cold for your party boat amenities Lake Travis' },
      { name: 'Comfortable Seating', description: 'Plenty of space for all Lake Travis boat party activities' },
      { name: 'Safety Equipment', description: 'Life jackets and safety gear for Austin party boat activities' }
    ]
  },
  {
    title: 'Scenic Experience',
    icon: Sun,
    color: 'bg-green-500',
    items: [
      { name: 'Lake Travis Views', description: 'Stunning hill country scenery during Lake Travis party entertainment' },
      { name: 'Sunset Cruises', description: 'Golden hour magic for boat party entertainment Austin' },
      { name: 'Wildlife Spotting', description: 'See birds and fish during your party boat amenities Lake Travis' },
      { name: 'Secluded Coves', description: 'Private swimming spots for Austin party boat activities' }
    ]
  }
];

const boatAmenities = [
  {
    name: 'Day Tripper',
    capacity: '14 guests',
    highlights: ['Single-deck pontoon with arch canopy', 'Bluetooth sound system', 'Giant lily pad float', 'Perfect for intimate Lake Travis boat party activities'],
    icon: Users
  },
  {
    name: 'Meeseeks',
    capacity: '25 guests',
    highlights: ['Single-deck pontoon with arch canopy', 'Premium sound system', 'Multiple floats', 'Great party boat entertainment Austin for medium groups'],
    icon: PartyPopper
  },
  {
    name: 'The Irony',
    capacity: '30 guests',
    highlights: ['Single-deck pontoon with arch canopy', 'Full float collection', 'Spacious layout', 'Popular boat party amenities Lake Travis option'],
    icon: Ship
  },
  {
    name: 'Clever Girl',
    capacity: '50-75 guests',
    highlights: ['Single-deck pontoon with arch canopy', '14 disco balls for ultimate party vibes', 'Maximum dance space', 'Flagship Austin party boat activities experience'],
    icon: Sparkles
  }
];

const activityIdeas = [
  { icon: Music, title: 'Dance Party', description: 'Turn up your playlist and dance on Lake Travis boat party activities' },
  { icon: Waves, title: 'Swimming Breaks', description: 'Cool off with refreshing swims during boat party entertainment Austin' },
  { icon: Camera, title: 'Photo Sessions', description: 'Capture memories with stunning party boat amenities Lake Travis backdrops' },
  { icon: PartyPopper, title: 'Themed Parties', description: 'Coordinate decorations for your Lake Travis party entertainment' },
  { icon: Gamepad2, title: 'Party Games', description: 'Bring card games and activities for Austin party boat activities' },
  { icon: Sun, title: 'Sunbathing', description: 'Relax on the deck during your boat party entertainment Austin cruise' }
];

const whyPremier = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'What entertainment is included with Lake Travis boat party activities?',
    answer: 'All Lake Travis boat party activities include: premium Bluetooth sound system, giant lily pad float, swimming stops in scenic coves, and comfortable shaded seating. Our party boat entertainment Austin packages are designed for maximum fun without extra charges for basic amenities.'
  },
  {
    question: 'Can we bring our own music for boat party entertainment Austin?',
    answer: 'Absolutely! Every boat party entertainment Austin vessel has Bluetooth speakers. Connect your phone and play your custom playlist. Our premium sound systems ensure great party boat amenities Lake Travis sound quality whether you\'re dancing or relaxing.'
  },
  {
    question: 'What water activities are available during Austin party boat activities?',
    answer: 'Austin party boat activities include swimming in Lake Travis\'s scenic coves, floating on our giant lily pad, and water lounging. All Lake Travis party entertainment cruises make stops for swimming - just bring swimwear and towels for the best boat party amenities Lake Travis experience.'
  },
  {
    question: 'Are the boats comfortable for party boat amenities Lake Travis events?',
    answer: 'Yes! All party boat amenities Lake Travis vessels are single-deck pontoons with arch canopies for shade. Comfortable seating accommodates your entire group, and our Lake Travis boat party activities boats are designed for both relaxation and dancing.'
  },
  {
    question: 'Can we decorate the boat for Lake Travis party entertainment?',
    answer: 'Yes, tasteful decorations are welcome for Lake Travis party entertainment! Balloons, banners, and themed items are fine. Our boat party entertainment Austin team can suggest decoration-friendly options. Just avoid anything that could damage the vessel or fly into the water.'
  },
  {
    question: 'What makes Clever Girl special for Austin party boat activities?',
    answer: 'Clever Girl is our flagship for Austin party boat activities - featuring 14 disco balls for ultimate party vibes! This 50-75 guest vessel offers maximum dance space, premium sound, and the best Lake Travis party entertainment atmosphere. Additional crew fee applies for groups of 51-75.'
  },
  {
    question: 'Are party boat amenities Lake Travis good for corporate events?',
    answer: 'Party boat amenities Lake Travis are perfect for corporate events! The relaxed atmosphere encourages team bonding, while premium sound systems enable presentations or background music. Lake Travis boat party activities offer unique team-building opportunities like group swimming and shared experiences.'
  },
  {
    question: 'What should we bring for boat party entertainment Austin?',
    answer: 'For boat party entertainment Austin, bring: sunscreen, sunglasses, swimwear, towels, beverages (BYOB - cans/plastic only), snacks or catering, phone/speaker charger, and any decorations. We provide coolers with ice for your Austin party boat activities essentials.'
  }
];

const internalLinks = [
  { href: '/bachelor-party-austin', label: 'Bachelor Parties', icon: Users },
  { href: '/bachelorette-party-austin', label: 'Bachelorette Parties', icon: Heart },
  { href: '/private-cruises', label: 'Private Cruises', icon: Ship },
  { href: '/corporate-events', label: 'Corporate Events', icon: Building2 },
  { href: '/atx-disco-cruise', label: 'ATX Disco Cruise', icon: Sparkles },
  { href: '/quote', label: 'Get Quote', icon: Star }
];

export default function LakeTravisBoatPartyEntertainment() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events"
        defaultTitle="Lake Travis Boat Party Activities & Entertainment | Party Boat Amenities Austin | Premier Party Cruises"
        defaultDescription="Discover Lake Travis boat party activities, entertainment options, and amenities. Party boat entertainment Austin includes premium sound, floats, swimming stops. Complete guide to boat party amenities Lake Travis and Austin party boat activities."
        defaultKeywords={['Lake Travis boat party activities', 'party boat entertainment Austin', 'boat party amenities Lake Travis', 'Austin party boat activities', 'Lake Travis party entertainment', 'party boat fun Austin', 'Lake Travis boat entertainment']}
        image={heroImage}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-party-entertainment-page">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-pink-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat party activities - guests enjoying entertainment on party boat Austin"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              Activities & Amenities Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Party Activities<br />
              <span className="text-amber-400">Entertainment & Amenities</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Everything you need for unforgettable party boat entertainment Austin. From premium sound systems to swimming stops, discover all the boat party amenities Lake Travis has to offer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/book-now">Plan Your Party</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-900 font-semibold"
                data-testid="button-view-boats"
              >
                <Link href="/private-cruises">View Our Fleet</Link>
              </Button>
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


        {/* Stats Section */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyPremier.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative -mt-8 mb-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={heroImage}
              alt="Party boat entertainment Austin - guests enjoying Lake Travis boat party activities and amenities"
              className="w-full rounded-2xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </section>

        {/* Entertainment Categories */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="entertainment-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">ENTERTAINMENT OPTIONS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="entertainment-title">Lake Travis Boat Party Activities & Entertainment</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Everything included in your party boat entertainment Austin experience
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 gap-8">
              {entertainmentCategories.map((category, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow" data-testid={`card-category-${index}`}>
                    <CardHeader className={`${category.color} text-white`}>
                      <div className="flex items-center gap-3">
                        <category.icon className="h-8 w-8" />
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-4">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
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

        {/* Boat Amenities by Vessel */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="boats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">OUR FLEET</Badge>
              <h2 className="text-3xl font-bold mb-4">Boat Party Amenities Lake Travis by Vessel</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Each boat offers unique Austin party boat activities features
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boatAmenities.map((boat, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-boat-${index}`}>
                    <CardContent className="pt-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-3">
                          <boat.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-bold text-xl">{boat.name}</h3>
                        <p className="text-purple-600 dark:text-purple-400 font-medium">{boat.capacity}</p>
                      </div>
                      <ul className="space-y-2">
                        {boat.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
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

        {/* Activity Ideas */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="activities-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-pink-100 text-pink-700">ACTIVITY IDEAS</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="activities-title">Make the Most of Your Lake Travis Party Entertainment</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Creative ideas to maximize fun during your Austin party boat activities
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activityIdeas.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <activity.icon className="h-6 w-6 text-purple-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage1}
                  alt="Austin party boat activities - guests dancing and swimming on Lake Travis"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-activities"
                />
              </m.div>
            </div>
          </div>
        </section>

        {/* Scenic Experience Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900" data-testid="scenic-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage2}
                  alt="Lake Travis boat party activities - scenic sunset cruise entertainment"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-scenic"
                />
              </m.div>
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-orange-100 text-orange-700">THE EXPERIENCE</Badge>
                <h2 className="text-3xl font-bold mb-6">Unforgettable Boat Party Entertainment Austin</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Lake Travis offers the perfect backdrop for party boat amenities Lake Travis celebrations. The stunning hill country scenery, crystal-clear water, and beautiful coves create an atmosphere unlike any other venue.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Sun className="h-6 w-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Sunset Magic</h4>
                      <p className="text-gray-600 dark:text-gray-400">Golden hour Lake Travis party entertainment is legendary</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Waves className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Secluded Coves</h4>
                      <p className="text-gray-600 dark:text-gray-400">Private swimming spots for Austin party boat activities</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Camera className="h-6 w-6 text-purple-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Stunning Backdrops</h4>
                      <p className="text-gray-600 dark:text-gray-400">Instagram-worthy scenes for boat party amenities Lake Travis</p>
                    </div>
                  </li>
                </ul>
              </m.div>
            </div>
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
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4">Lake Travis Boat Party Activities FAQs</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Common questions about party boat entertainment Austin and amenities
              </p>
            </m.div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-white dark:bg-gray-900 rounded-lg px-6" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline" data-testid={`faq-trigger-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="links-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Party Options</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Find the perfect Lake Travis entertainment experience
              </p>
            </m.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer" data-testid={`link-card-${index}`}>
                      <CardContent className="pt-6 text-center">
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-800 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Unforgettable Lake Travis Boat Party Activities?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Experience the best party boat entertainment Austin has to offer. Premium sound, stunning views, and incredible boat party amenities Lake Travis await.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                  data-testid="button-final-quote"
                >
                  <Link href="/book-now">Plan Your Party</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-900 font-semibold"
                  data-testid="button-final-call"
                >
                  <a href="tel:512-488-5892">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 512-488-5892
                  </a>
                </Button>
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

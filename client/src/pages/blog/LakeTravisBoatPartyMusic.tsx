import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, Music, Phone, Clock, CheckCircle2, 
  Volume2, Award, Sparkles, MapPin, Calendar, Star,
  ArrowRight, Building2, Headphones, PartyPopper,
  Package, Anchor, Radio, Heart, Mic, Speaker,
  Bluetooth, Smartphone, ListMusic, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImage from '@assets/@capitalcityshots-9_1760080740019.jpg';
import sectionImage1 from '@assets/@capitalcityshots-10_1760080740019.jpg';
import sectionImage2 from '@assets/@capitalcityshots-11_1760080740019.jpg';
import sectionImage3 from '@assets/@capitalcityshots-12_1760080740019.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const soundSystems = [
  {
    boat: 'Day Tripper',
    capacity: '14 guests',
    system: 'Bluetooth Speakers',
    features: ['Premium marine-grade speakers', 'Bluetooth connectivity', 'Phone charging available', 'Perfect for intimate Lake Travis boat party music'],
    icon: Speaker,
    color: 'border-blue-500',
    headerBg: 'bg-blue-500'
  },
  {
    boat: 'Meeseeks',
    capacity: '25 guests',
    system: 'Premium Sound System',
    features: ['High-quality Bluetooth speakers', 'Multiple speaker zones', 'Aux connection available', 'Great party boat sound system Austin for medium groups'],
    icon: Volume2,
    color: 'border-green-500',
    headerBg: 'bg-green-500'
  },
  {
    boat: 'The Irony',
    capacity: '30 guests',
    system: 'Enhanced Audio',
    features: ['Multi-zone speaker setup', 'Bluetooth connectivity', 'Powerful bass response', 'Popular boat party DJ Austin choice'],
    icon: Radio,
    color: 'border-amber-500',
    headerBg: 'bg-amber-500',
    popular: true
  },
  {
    boat: 'Clever Girl',
    capacity: '50-75 guests',
    system: 'Ultimate Party System',
    features: ['Premium multi-speaker array', '14 disco balls for ambiance', 'Dance floor acoustics', 'Best Lake Travis boat party music experience'],
    icon: Sparkles,
    color: 'border-purple-500',
    headerBg: 'bg-purple-500'
  }
];

const musicTips = [
  { icon: ListMusic, title: 'Create Your Playlist Early', description: 'Build your party boat sound system Austin playlist before the cruise' },
  { icon: Bluetooth, title: 'Test Bluetooth Connection', description: 'Pair your device quickly for seamless Lake Travis boat party music' },
  { icon: Smartphone, title: 'Charge Your Phone', description: 'Full battery ensures uninterrupted boat party DJ Austin entertainment' },
  { icon: Volume2, title: 'Mix Up the Vibe', description: 'Vary tempo for music for boat parties Lake Travis energy management' },
  { icon: Play, title: 'Queue Songs Ahead', description: 'Pre-queue tracks to avoid gaps in party boat sound system Austin' },
  { icon: Headphones, title: 'Consider Your Crowd', description: 'Choose Lake Travis boat party music everyone can enjoy' }
];

const playlistIdeas = [
  {
    genre: 'Party Anthems',
    description: 'High-energy hits perfect for party boat sound system Austin dancing',
    mood: 'Upbeat & Danceable',
    icon: PartyPopper
  },
  {
    genre: 'Lake Vibes',
    description: 'Chill summer tunes for relaxed Lake Travis boat party music moments',
    mood: 'Relaxed & Sunny',
    icon: Anchor
  },
  {
    genre: 'Throwback Mix',
    description: 'Classic hits everyone knows for boat party DJ Austin sing-alongs',
    mood: 'Nostalgic & Fun',
    icon: Music
  },
  {
    genre: 'Country Lake Party',
    description: 'Austin-style country for authentic music for boat parties Lake Travis',
    mood: 'Texas Friendly',
    icon: Star
  }
];

const entertainmentOptions = [
  { icon: Bluetooth, title: 'Bluetooth Streaming', description: 'Connect any device to our Lake Travis boat party music systems' },
  { icon: Smartphone, title: 'Phone DJ', description: 'You control the party boat sound system Austin from your phone' },
  { icon: ListMusic, title: 'Spotify/Apple Music', description: 'Stream from any app for boat party DJ Austin playlists' },
  { icon: Mic, title: 'Announcements', description: 'Make toasts and speeches through music for boat parties Lake Travis' }
];

const whyPremier = [
  { stat: '14+', label: 'Years in Business' },
  { stat: '125,000+', label: 'Happy Guests' },
  { stat: '100%', label: 'Safety Record' },
  { stat: '5-Star', label: 'Google Rating' }
];

const faqs = [
  {
    question: 'What type of sound systems are on your Lake Travis boat party music vessels?',
    answer: 'All our boats feature premium marine-grade Bluetooth speakers for Lake Travis boat party music. Each party boat sound system Austin is designed for outdoor use with clear sound quality. Our flagship Clever Girl includes enhanced audio with multiple speaker zones plus 14 disco balls for the ultimate boat party DJ Austin atmosphere.'
  },
  {
    question: 'How do we connect to the party boat sound system Austin?',
    answer: 'Connecting to our party boat sound system Austin is simple! All boats have Bluetooth connectivity - just pair your phone and start playing. One designated person typically controls the music for boat parties Lake Travis to avoid confusion. Our crew can help you connect at the start of your Lake Travis boat party music cruise.'
  },
  {
    question: 'Can we bring our own DJ for boat party DJ Austin events?',
    answer: 'While you can designate someone as your boat party DJ Austin, professional DJ equipment with separate powered speakers isn\'t typically necessary. Our built-in party boat sound system Austin provides excellent sound for groups up to 75. For special events, contact us about music for boat parties Lake Travis with enhanced audio needs.'
  },
  {
    question: 'What music apps work with Lake Travis boat party music systems?',
    answer: 'Any music app works with our Lake Travis boat party music systems! Spotify, Apple Music, Pandora, Amazon Music, YouTube Music - if it plays on your phone, it plays through our party boat sound system Austin. Just connect via Bluetooth and enjoy your boat party DJ Austin experience.'
  },
  {
    question: 'Is the party boat sound system Austin loud enough for dancing?',
    answer: 'Yes! Our party boat sound system Austin is designed for parties. The speakers provide strong bass and clear vocals perfect for dancing on the water. Our larger boats like Clever Girl feature enhanced systems for bigger music for boat parties Lake Travis dance events. We balance great sound with not disturbing other lake users.'
  },
  {
    question: 'What should we include in our music for boat parties Lake Travis playlist?',
    answer: 'For music for boat parties Lake Travis, mix upbeat dance tracks with some chill moments. Include crowd favorites everyone knows for sing-alongs. Consider your group\'s preferences - bachelor parties might want different Lake Travis boat party music than corporate events. Pro tip: create a collaborative playlist so everyone contributes!'
  },
  {
    question: 'Can we make announcements through the boat party DJ Austin system?',
    answer: 'Yes! You can pause the boat party DJ Austin music for toasts, speeches, or announcements. This is perfect for birthday celebrations, proposals, or corporate recognition on your Lake Travis boat party music cruise. Just let your captain know when you want to use the party boat sound system Austin for speaking.'
  },
  {
    question: 'Do you have backup music if our phone dies during music for boat parties Lake Travis?',
    answer: 'We can provide charging options to keep your music for boat parties Lake Travis going! Bring a charging cable, and we\'ll help keep your device powered. For longer cruises, consider bringing a portable charger. Our party boat sound system Austin continues working as long as your device is connected to Lake Travis boat party music.'
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

export default function LakeTravisBoatPartyMusic() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lake Travis Boat Party Music - Sound Systems & Entertainment | Premier Party Cruises</title>
        <meta name="description" content="Complete guide to Lake Travis boat party music and sound systems. Party boat sound system Austin features, boat party DJ Austin tips, and music for boat parties Lake Travis. Premium Bluetooth audio on all vessels." />
        <meta name="keywords" content="Lake Travis boat party music, party boat sound system Austin, boat party DJ Austin, music for boat parties Lake Travis, party boat entertainment Austin, Lake Travis boat party entertainment, Austin party boat music" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/lake-travis-boat-party-music-sound-systems-and-entertainment-coordination" />
        <meta property="og:title" content="Lake Travis Boat Party Music - Sound Systems & Entertainment Guide" />
        <meta property="og:description" content="Everything you need to know about Lake Travis boat party music. Premium sound systems, DJ tips, and playlist ideas for the perfect party boat experience." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950" data-testid="lake-travis-boat-party-music-page">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-violet-900 via-purple-800 to-slate-900 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Lake Travis boat party music - premium sound system on party boat Austin"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-amber-400 text-black font-bold" data-testid="badge-hero">
              Music & Sound Systems Guide
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Lake Travis Boat Party Music<br />
              <span className="text-amber-400">Sound Systems & Entertainment</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-testid="hero-subtitle">
              Everything you need to know about party boat sound system Austin. From Bluetooth connectivity to playlist tips, master the music for boat parties Lake Travis experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                data-testid="button-get-quote"
              >
                <Link href="/quote">Book Your Party</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-violet-900 font-semibold"
                data-testid="button-view-boats"
              >
                <Link href="/private-cruises">View Our Fleet</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-12 bg-slate-100 dark:bg-slate-900" data-testid="stats-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whyPremier.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400">{item.stat}</div>
                  <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative -mt-8 mb-8">
          <div className="max-w-5xl mx-auto px-4">
            <img 
              src={heroImage}
              alt="Party boat sound system Austin - guests dancing to Lake Travis boat party music"
              className="w-full rounded-2xl shadow-2xl"
              data-testid="img-hero"
            />
          </div>
        </section>

        {/* Sound Systems by Boat */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="systems-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-violet-100 text-violet-700">SOUND SYSTEMS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="systems-title">Party Boat Sound System Austin by Vessel</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Each boat features premium audio for your Lake Travis boat party music experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {soundSystems.map((system, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full ${system.color} border-2 ${system.popular ? 'ring-2 ring-amber-400' : ''}`} data-testid={`card-system-${index}`}>
                    {system.popular && (
                      <div className="bg-amber-400 text-black text-center py-1 font-bold text-sm">
                        MOST POPULAR
                      </div>
                    )}
                    <CardHeader className={`${system.headerBg} text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{system.boat}</CardTitle>
                          <p className="text-white/90">{system.capacity}</p>
                        </div>
                        <system.icon className="h-10 w-10" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-4">{system.system}</p>
                      <ul className="space-y-2">
                        {system.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Music Tips */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="tips-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-pink-100 text-pink-700">PRO TIPS</Badge>
                <h2 className="text-3xl font-bold mb-6" data-testid="tips-title">Boat Party DJ Austin Tips for the Perfect Playlist</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Make the most of your music for boat parties Lake Travis experience
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {musicTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                      <tip.icon className="h-6 w-6 text-violet-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{tip.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage1}
                  alt="Boat party DJ Austin - guests enjoying music for boat parties Lake Travis"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-tips"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Playlist Ideas */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="playlist-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700">PLAYLIST IDEAS</Badge>
              <h2 className="text-3xl font-bold mb-4">Music for Boat Parties Lake Travis Inspiration</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Popular playlist themes for your Lake Travis boat party music
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlistIdeas.map((playlist, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow" data-testid={`card-playlist-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                        <playlist.icon className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{playlist.genre}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{playlist.description}</p>
                      <Badge variant="outline" className="text-xs">{playlist.mood}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Entertainment Options */}
        <section className="py-16 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="entertainment-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <img 
                  src={sectionImage2}
                  alt="Lake Travis boat party music - entertainment options on party boat Austin"
                  className="rounded-2xl shadow-xl"
                  data-testid="img-entertainment"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-purple-100 text-purple-700">ENTERTAINMENT</Badge>
                <h2 className="text-3xl font-bold mb-6">Party Boat Sound System Austin Features</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Our Lake Travis boat party music systems offer versatile entertainment options
                </p>
                <div className="space-y-4">
                  {entertainmentOptions.map((option, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <option.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{option.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800" data-testid="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4">Lake Travis Boat Party Music FAQs</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Common questions about party boat sound system Austin and boat party DJ Austin
              </p>
            </motion.div>

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
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Explore More Party Options</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Find the perfect Lake Travis music experience
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalLinks.map((link, index) => (
                <motion.div
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
                        <link.icon className="h-8 w-8 mx-auto mb-2 text-violet-600" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-violet-900 via-purple-800 to-slate-900 text-white" data-testid="cta-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Epic Lake Travis Boat Party Music?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Experience premium party boat sound system Austin with Bluetooth connectivity and amazing acoustics. Your music for boat parties Lake Travis adventure awaits!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8"
                  data-testid="button-final-quote"
                >
                  <Link href="/quote">Book Your Party</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-violet-900 font-semibold"
                  data-testid="button-final-call"
                >
                  <a href="tel:512-488-5892">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 512-488-5892
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { 
  Ship, Users, PartyPopper, Music, Waves, Star, ArrowRight, 
  Camera, Sparkles, Heart, Crown, Mic2, Guitar, Film,
  Anchor, GlassWater, Sun, Laugh
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';

import discoParty from '@assets/atx-disco-cruise-party.webp';
import dancingScene from '@assets/dancing-party-scene.webp';
import partyAtmosphere1 from '@assets/party-atmosphere-1.webp';
import partyAtmosphere2 from '@assets/party-atmosphere-2.webp';
import partyAtmosphere3 from '@assets/party-atmosphere-3.webp';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const celebrities = [
  {
    name: 'Matthew McConaughey',
    icon: Film,
    title: 'The Austin Legend',
    description: 'Alright, alright, alright! Who better to kick off our dream party barge than Austin\'s most famous resident? Matthew would be the first one with his toes in the water, Longhorns shirt flowing in the Lake Travis breeze, leading everyone in a spontaneous speech about living life to the fullest. He\'d probably end up becoming best friends with the DJ and convincing everyone that this moment—right here, right now—is exactly where they\'re meant to be.',
    funFact: 'He\'d definitely bring his own bongo drums for an impromptu jam session.',
    image: partyAtmosphere1
  },
  {
    name: 'Beyoncé',
    icon: Crown,
    title: 'The Queen of Houston (Honorary Texan)',
    description: 'Queen Bey grew up just three hours away in Houston, so she\'s practically Lake Travis royalty. Imagine her taking over the party boat dance floor, turning our disco cruise into an impromptu Coachella-level performance. She\'d have everyone learning the Single Ladies dance on the lily pad floats, and suddenly our 50-person party boat becomes the hottest venue in Texas.',
    funFact: 'Blue Ivy would obviously be in charge of the playlist quality control.',
    image: partyAtmosphere2
  },
  {
    name: 'Post Malone',
    icon: Guitar,
    title: 'The Chill Vibes Master',
    description: 'Post is basically the spirit animal of every Lake Travis party boat adventure. He\'d show up with his guitar, a cooler full of Bud Light, and zero pretense. Between his face tattoos and genuinely chill personality, he\'d be the guy bonding with bachelor parties and bachelorette crews alike, probably teaching everyone card tricks and requesting 90s country songs from the DJ.',
    funFact: 'Would 100% challenge Captain Brian to a beer pong tournament on the swim deck.',
    image: partyAtmosphere3
  },
  {
    name: 'Willie Nelson',
    icon: Mic2,
    title: 'The Texas Icon',
    description: 'No dream party barge in Austin would be complete without the Red Headed Stranger himself. Willie would bring that timeless Texas spirit, probably rolling up with Trigger (his legendary guitar) and serenading everyone with "On the Road Again" as the sun sets over Lake Travis. He\'d have stories that last longer than the 4-hour cruise and would somehow make everyone feel like family.',
    funFact: 'He\'d insist on a group photo with every single guest and remember all their names.',
    image: dancingScene
  },
  {
    name: 'Doja Cat',
    icon: Sparkles,
    title: 'The Viral Energy',
    description: 'Doja would bring that chaotic, hilarious, TikTok-ready energy that every legendary party needs. She\'d be the one creating viral moments, teaching the crowd trending dances, and somehow convincing everyone to do a synchronized jump into Lake Travis. Her outfit would absolutely break Instagram, and she\'d make sure our party photographer got the content of a lifetime.',
    funFact: 'Would definitely start a spontaneous freestyle rap battle with the bachelorette party.',
    image: discoParty
  }
];

const whyPartyBoatsCelebWorthy = [
  { icon: Anchor, title: 'Privacy on the Water', description: 'No paparazzi, no crowds—just pure Lake Travis freedom and VIP vibes' },
  { icon: Music, title: 'Professional DJ', description: 'Request any song, any era, any vibe—our DJ makes dreams come true' },
  { icon: Camera, title: 'Pro Photography', description: 'Every legendary moment captured in high-quality, Instagram-ready glory' },
  { icon: Waves, title: 'Giant Float Lounges', description: '6x20 feet floating paradise for swimming, chilling, and celebrity-level relaxation' },
  { icon: Sun, title: 'Stunning Scenery', description: 'Texas Hill Country views that even Hollywood can\'t replicate' },
  { icon: GlassWater, title: 'BYOB Freedom', description: 'Bring whatever you want—we provide ice, cups, and the good times' }
];

export default function TopFiveCelebritiesPartyBarge() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>The Top Five Celebrities at Our Dream Party Barge | Premier Party Cruises Austin</title>
        <meta name="description" content="Imagine the ultimate Lake Travis party boat with your dream celebrity guest list! From Matthew McConaughey to Beyoncé, discover which 5 stars we'd invite to the ultimate Austin disco cruise adventure." />
        <meta name="keywords" content="Lake Travis party boat, Austin party cruise, celebrity party, ATX Disco Cruise, party barge Austin, Lake Travis boat rental, Austin boat party" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/the-top-five-celebrities-at-our-dream-party-barge" />
        <meta property="og:title" content="The Top Five Celebrities at Our Dream Party Barge" />
        <meta property="og:description" content="Who would you invite to the ultimate Lake Travis party boat? Here's our dream celebrity guest list for the perfect Austin disco cruise!" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/the-top-five-celebrities-at-our-dream-party-barge" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${discoParty})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-500 text-black font-bold">
              DREAM PARTY GUEST LIST
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Top Five Celebrities at Our<br />Dream Party Barge
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              If we could throw the ultimate <strong>Lake Travis party boat</strong> bash with any celebrities in the world, who would make the guest list? Here's our fantasy lineup for the most epic <strong>ATX Disco Cruise</strong> ever imagined.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atx-disco-cruise">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Book Your Own Party Cruise
                </Button>
              </Link>
              <Link href="/private-cruises">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                  View Private Charters
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">The Ultimate Fantasy: Celebrities on a Lake Travis Party Boat</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                We've hosted thousands of <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">Austin party boats</Link> over the years—bachelor parties, bachelorette crews, corporate celebrations, and milestone birthdays. But we got to thinking: if we could create the ULTIMATE <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> with any five celebrities in the world, who would we invite?
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                This is our dream guest list for the perfect <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis party boat</Link> adventure. From local Austin legends to Texas icons to viral superstars—these are the five people who would make our party barge absolutely legendary.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Grab a drink, put on your favorite playlist, and imagine cruising the Texas Hill Country waters with this incredible crew...
              </p>
            </motion.div>
          </div>
        </section>

        {/* Celebrity Spotlights */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-purple-600 text-white">THE DREAM LINEUP</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Five Celebrity Dream Guests
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Each one brings something special to the party barge experience
              </p>
            </motion.div>

            <div className="space-y-12">
              {celebrities.map((celebrity, index) => (
                <motion.div 
                  key={celebrity.name}
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeInUp}
                >
                  <Card className={`overflow-hidden shadow-xl ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                    <div className={`lg:flex ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="lg:w-2/5 h-64 lg:h-auto relative">
                        <img 
                          src={celebrity.image} 
                          alt={`${celebrity.name} inspired Lake Travis party atmosphere`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-black">#{index + 1}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="lg:w-3/5 p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                            <celebrity.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{celebrity.name}</h3>
                            <p className="text-purple-600 dark:text-purple-400 font-semibold">{celebrity.title}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                          {celebrity.description}
                        </p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                          <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                            <Laugh className="h-5 w-5" />
                            <span className="font-semibold">Party Boat Prediction:</span>
                          </div>
                          <p className="text-yellow-800 dark:text-yellow-300 mt-1">{celebrity.funFact}</p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Party Boats Are Celebrity-Worthy */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <Badge className="mb-4 bg-blue-600 text-white">CELEBRITY-WORTHY EXPERIENCE</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Our Party Boats Are VIP-Ready
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Even if celebrities aren't on YOUR guest list, you'll party like they're there
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyPartyBoatsCelebWorthy.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeInUp}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-400">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Break */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-3 gap-4">
              <img 
                src={partyAtmosphere1} 
                alt="Lake Travis party boat atmosphere" 
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img 
                src={dancingScene} 
                alt="Dancing on Austin party cruise" 
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img 
                src={partyAtmosphere3} 
                alt="Party vibes on Lake Travis" 
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Star className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Create Your Own Celebrity-Worthy Party?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                You might not have Matthew McConaughey on your guest list, but with our professional DJ, photographer, and stunning Lake Travis views, your party will feel just as legendary. Book your <strong>Austin party boat</strong> adventure today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Book ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    Get a Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <p className="mt-8 text-white/70 text-sm">
                <Link href="/bachelor-party-austin" className="hover:text-white underline">Bachelor Parties</Link> • 
                <Link href="/bachelorette-party-austin" className="hover:text-white underline"> Bachelorette Parties</Link> • 
                <Link href="/private-cruises" className="hover:text-white underline"> Private Cruises</Link> • 
                <Link href="/party-boat-lake-travis" className="hover:text-white underline"> Lake Travis Party Boats</Link>
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

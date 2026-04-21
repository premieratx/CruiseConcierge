import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, PartyPopper, Phone, Clock, CheckCircle2, 
  Anchor, Music, Sun, Waves, MapPin, Calendar, Beer, Star,
  ArrowRight, Camera, Shield, Utensils, Car, Mic, Sparkles,
  Heart, Trophy, Gift, Crown, Zap, Home, Bed, Wine, Coffee,
  Compass, Sunset, Mountain, MapPinned, DollarSign, Plane
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import { BlogImageBreak, BlogPhotoStrip, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';

import discoParty from '@assets/atx-disco-cruise-party.webp';
import dancingScene from '@assets/dancing-party-scene.webp';
import cleverGirl from '@assets/clever-girl-50-person-boat.webp';
import unicornFloat from '@assets/giant-unicorn-float.webp';

const whyJointParty = [
  { icon: Heart, title: 'Celebrate Together', description: 'Experience the excitement of your pre-wedding celebration side by side with your partner' },
  { icon: Users, title: 'Unite Your Crews', description: 'Bridesmaids and groomsmen bond before the wedding - no more strangers at the altar' },
  { icon: DollarSign, title: 'Budget-Friendly', description: 'One epic party costs less than two separate events - more fun for less money' },
  { icon: Calendar, title: 'Less Planning Stress', description: 'Coordinate one celebration instead of juggling two separate weekends' },
  { icon: Trophy, title: 'Bigger Party Energy', description: 'Combine groups for an even more epic celebration with double the fun' },
  { icon: Gift, title: 'Shared Memories', description: 'Create stories you\'ll both tell at your wedding reception and beyond' }
];

const discoCruiseFeatures = [
  { icon: Users, title: 'Perfect Co-Ed Mixer', description: 'Designed specifically for bachelor AND bachelorette parties celebrating together' },
  { icon: Music, title: 'Professional DJ', description: 'Non-stop hits from 70s disco to today\'s bangers keep everyone dancing' },
  { icon: Camera, title: 'Pro Photographer', description: 'Every legendary moment captured for Instagram and your wedding slideshow' },
  { icon: Waves, title: 'Giant Lily Pad Floats', description: '6x20 feet floating lounges perfect for your combined crew' },
  { icon: Shield, title: 'Licensed-Certified Captains', description: '15+ years and 150,000 happy partiers with a perfect safety record' },
  { icon: Gift, title: 'All-Inclusive Package', description: 'DJ, photographer, floats, ice, cups - just bring your BYOB drinks via Party On Delivery' }
];

const itineraryDay1 = [
  { time: '2:00 PM', activity: 'Arrival & Check-In', description: 'Groups arrive and get settled at Airbnb or hotel near Lake Travis' },
  { time: '4:00 PM', activity: 'Welcome Happy Hour', description: 'Mix & mingle at a Rainey Street bar - bridesmaids meet groomsmen' },
  { time: '7:00 PM', activity: 'Group Dinner', description: 'Texas BBQ feast at Terry Black\'s or Salt Lick' },
  { time: '9:00 PM', activity: '6th Street Exploration', description: 'Bar hop on Austin\'s legendary entertainment strip together' }
];

const itineraryDay2 = [
  { time: '10:00 AM', activity: 'Brunch & Recovery', description: 'Late breakfast with mimosas and tacos' },
  { time: '12:00 PM', activity: 'ATX Disco Cruise Prep', description: 'Party On Delivery brings drinks and supplies to the marina' },
  { time: '1:00 PM', activity: 'ATX Disco Cruise', description: '4-hour Lake Travis party boat - the main event!' },
  { time: '6:00 PM', activity: 'Sunset Drinks', description: 'Decompress at Oasis Texas with lake views' },
  { time: '8:00 PM', activity: 'Downtown Celebration', description: 'Continue the party on West 6th or East Austin' }
];

const itineraryDay3 = [
  { time: '10:00 AM', activity: 'Farewell Brunch', description: 'Casual breakfast and gift exchange' },
  { time: '12:00 PM', activity: 'Optional Activity', description: 'Barton Springs, South Congress shopping, or spa recovery' },
  { time: '3:00 PM', activity: 'Departures', description: 'Goodbyes and travel home with amazing memories' }
];

export default function JointBachelorBachelorettePartyGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <BlogV2Layout
      title="How to Plan an Amazing Joint Bachelor/Bachelorette Party in Austin | Premier Party Cruises"
      description="Planning a joint bachelor bachelorette party in Austin? Discover the ultimate guide to combined bachelor bachelorette celebrations on Lake Travis. ATX Disco Cruise is PERFECT for co-ed groups mixing together. Book your Lake Travis party boat today!"
      slug="joint-bachelor-bachelorette-party-guide"
      category="Combined Bach Guides"
      categoryHref="/combined-bachelor-bachelorette-austin"
      pillarTitle="Combined Bachelor/Bachelorette Party Guide"
      pillarHref="/combined-bachelor-bachelorette-austin"
      relatedArticles={[
        { title: "Epic Austin Bachelorette Party Guide", href: "/blogs/epic-austin-bachelorette-party-guide" },
        { title: "Epic Austin Bachelor Party Guide", href: "/blogs/epic-bachelor-party-austin-guide" },
        { title: "ATX Disco Cruise Experience", href: "/atx-disco-cruise" },
      ]}
    >
    <>
      <SEOHead
        pageRoute="/blogs/joint-bachelor-bachelorette-party-guide"
        defaultTitle="How to Plan an Amazing Joint Bachelor/Bachelorette Party in Austin | Premier Party Cruises"
        defaultDescription="Planning a joint bachelor bachelorette party in Austin? Discover the ultimate guide to combined bachelor bachelorette celebrations on Lake Travis. ATX Disco Cruise is PERFECT for co-ed groups mixing together. Book your Lake Travis party boat today!"
        defaultKeywords={['joint bachelor bachelorette party', 'Austin bachelor party', 'combined bachelor bachelorette', 'ATX Disco Cruise', 'Lake Travis party boat', 'bachelor party in Austin', 'party boat Austin', 'co-ed bachelor party', 'joint bach party Austin', 'combined pre-wedding party']}
        image="https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white overflow-hidden"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${discoParty})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-500 text-black font-bold" data-testid="badge-joint-party-guide">
              ULTIMATE JOINT PARTY GUIDE
            </Badge>
            <h1 className="heading-unbounded text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              How to Plan an Amazing<br />Joint Bachelor/Bachelorette Party in Austin
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Double the fun, Austin-style! Discover how to plan the perfect <strong>combined bachelor bachelorette</strong> celebration on Lake Travis with the legendary ATX Disco Cruise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atx-disco-cruise">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6" data-testid="button-book-disco-cruise">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Book ATX Disco Cruise
                </Button>
              </Link>
              <Link href="/combined-bachelor-bachelorette-austin">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages">
                  View Joint Party Packages
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


        {/* Introduction: Double the Fun, Austin-Style */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-introduction">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Double the Fun with Your Austin Bachelor Party, Austin-Style</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Planning a <strong>joint bachelor bachelorette party</strong> is the hottest trend in pre-wedding celebrations, and Austin, Texas is the perfect destination to make it happen. Why celebrate separately when you can double the fun with a <strong>combined bachelor bachelorette</strong> weekend on a <strong>lake travis bachelor party boat</strong> that brings both crews together for an unforgettable experience?
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Austin offers everything you need for an epic <strong>bachelor party in Austin</strong> that includes the bride-to-be's squad too. From the legendary nightlife on 6th Street to the stunning waters of Lake Travis, this city is built for celebration. And when it comes to the ultimate activity for your <strong>joint bachelor bachelorette party</strong>, nothing beats the <Link href="/atx-disco-cruise" className="text-purple-600 hover:underline font-semibold">ATX Disco Cruise</Link> – specifically designed for co-ed groups partying together.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Whether you're coordinating a <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">party boat Austin</Link> adventure or planning a full weekend itinerary, this guide covers everything you need to know about hosting the perfect <strong>combined bachelor bachelorette</strong> celebration. Let's dive in!
              </p>

              <BlogImageBreak
                src={discoParty}
                alt="Austin bachelor party boat with joint bachelor bachelorette party on Lake Travis"
                caption="Bachelor and bachelorette crews celebrating together on Lake Travis"
              />
            </m.div>
          </div>
        </section>

        {/* Why a Joint Party? The Perks of Combining Forces */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-why-joint">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-pink-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why a Joint Austin Bachelor Party? The Perks of Combining Forces</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                More couples are choosing <strong>combined bachelor bachelorette</strong> parties for good reason. A <strong>joint bachelor bachelorette party</strong> isn't just about saving money (though that's a nice bonus) – it's about creating shared memories, uniting your wedding parties, and celebrating your love together.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {whyJointParty.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow rounded-xl border-2 border-pink-200 dark:border-pink-800">
                    <CardContent className="p-6">
                      <item.icon className="h-10 w-10 text-pink-600 mb-3" />
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                When you book a <strong>lake travis bachelor party boat</strong> experience, your bridesmaids and groomsmen get to know each other before the wedding day. No more awkward introductions at the rehearsal dinner – they'll already be friends at your <strong>austin bachelor party</strong>! Plus, with <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> handling your drinks and supplies, coordinating for a larger <strong>combined bachelor bachelorette</strong> group has never been easier.
              </p>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Pro Tip: Book Early for Joint Parties
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Joint bachelor bachelorette parties</strong> are booking up fast, especially during peak wedding season (March-October). The <Link href="/atx-disco-cruise" className="text-purple-600 hover:underline font-semibold">ATX Disco Cruise</Link> is perfect for your <strong>combined bachelor bachelorette</strong> celebration, but popular dates fill months in advance. <Link href="/book-now" className="text-blue-600 hover:underline font-semibold">Book now</Link> to secure your spot!
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* Joint Activity Must-Do: The ATX Disco Cruise */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-atx-disco">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Ship className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Joint Activity Must-Do: The Lake Travis Bachelor Party Boat Cruise</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                If there's one activity that's absolutely PERFECT for a <strong>joint bachelor bachelorette party</strong>, it's the legendary <Link href="/atx-disco-cruise" className="text-purple-600 hover:underline font-semibold">ATX Disco Cruise</Link> by <Link href="/" className="text-blue-600 hover:underline font-semibold">Premier Party Cruises</Link>. This isn't just another boat rental – it's Austin's premier multi-group <strong>Lake Travis party boat</strong> experience specifically designed for co-ed celebrations.
              </p>

              <div className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/20 dark:to-blue-900/20 p-8 rounded-xl mb-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
                  <Crown className="h-7 w-7 text-yellow-500" />
                  Why ATX Disco Cruise is PERFECT for Joint Parties
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  The <strong>ATX Disco Cruise</strong> is the ONLY multi-group all-inclusive bachelor/bachelorette cruise in the entire United States! It's literally built for your <strong>combined bachelor bachelorette</strong> celebration. Here's what makes it perfect for co-ed groups:
                </p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Co-Ed by Design:</strong> Bachelor AND bachelorette parties celebrate together on the same boat – perfect for your <strong>joint bachelor bachelorette party</strong>!</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Built-In Social Scene:</strong> Meet other groups partying together – instant new friends for your combined crew</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>All-Inclusive Experience:</strong> Professional DJ, photographer, giant lily pad floats, ice, and cups included</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>BYOB Made Easy:</strong> Use <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> to supply drinks for your larger combined group – they deliver right to the marina!</span>
                  </li>
                </ul>
              </div>

              <BlogImageBreak
                src={dancingScene}
                alt="Lake travis bachelor party boat with groups dancing on Austin bachelor party cruise"
                caption="Your combined crew will dance all day on the ATX Disco Cruise"
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {discoCruiseFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow rounded-xl border-2 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6">
                      <feature.icon className="h-10 w-10 text-blue-600 mb-3" />
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                The 4-hour <strong>lake travis bachelor party boat</strong> cruise includes everything you need for an epic day on the water. Your <strong>austin bachelor party</strong> and bachelorette crew will dance to hits from the 70s to today, take legendary photos with the professional photographer, and float on massive lily pads during swim breaks. Just bring your own drinks and snacks – <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> makes it easy by delivering everything you need directly to the marina before your cruise!
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Want a more intimate experience? <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">Premier Party Cruises</Link> also offers <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">private party boat charters</Link> on Lake Travis for <strong>combined bachelor bachelorette</strong> groups who want exclusive use of a vessel. Check out the <Link href="/gallery" className="text-purple-600 hover:underline font-semibold">gallery</Link> to see real parties in action!
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold" data-testid="button-book-disco">
                    <Ship className="mr-2 h-5 w-5" />
                    Book ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="button-private-charter">
                    <Anchor className="mr-2 h-5 w-5" />
                    View Private Charters
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* Balancing the Itinerary: Something for Everyone */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-itinerary-balance">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Compass className="h-8 w-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Balancing the Itinerary: Something for Everyone</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                The key to a successful <strong>joint bachelor bachelorette party</strong> is planning activities that appeal to both crews. Austin's diverse offerings make this easy! Your <strong>combined bachelor bachelorette</strong> weekend should include a mix of high-energy adventures and relaxed hangouts.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="rounded-xl border-2 border-pink-200 dark:border-pink-800">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <Sparkles className="h-6 w-6 text-pink-500" />
                      For the Bachelorette Crew
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                        <span>Spa day at Milk + Honey or VIVA Day Spa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                        <span>South Congress shopping and cute cafes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                        <span>Rooftop cocktails at The Sunset Room</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                        <span>Instagram-worthy brunch spots</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-2 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <Trophy className="h-6 w-6 text-blue-500" />
                      For the Bachelor Crew
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Golf at Top Golf or UT Golf Club</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Texas BBQ tour – Franklin, Terry Black's</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Craft brewery crawl on East 6th</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>F1 track tour at COTA</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl border-2 border-purple-200 dark:border-purple-800 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Heart className="h-6 w-6 text-purple-500" />
                    <Users className="h-6 w-6 text-purple-500" />
                    Activities Everyone Will Love Together
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span><strong><Link href="/atx-disco-cruise" className="text-purple-600 hover:underline">ATX Disco Cruise</Link></strong> – the main event!</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>6th Street bar crawl together</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Rainey Street bungalow bars</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Live music on Red River</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Group dinner at a steakhouse</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Karaoke night at Ego's</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Barton Springs swimming</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Food truck park feast</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                For more ideas, check out our guides to <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-semibold">bachelor party in Austin</Link> activities and <Link href="/bachelorette-party-austin" className="text-pink-600 hover:underline font-semibold">bachelorette party Austin</Link> adventures. And don't forget – <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> can supply drinks for all your group activities, not just the <strong>Lake Travis party boat</strong> adventure!
              </p>
            </m.div>
          </div>
        </section>

        {/* Logistics for a Larger, Co-Ed Group */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-logistics">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <MapPinned className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Logistics for a Larger, Co-Ed Group</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Planning logistics for a <strong>joint bachelor bachelorette party</strong> means coordinating for a larger group – but don't worry, it's easier than you think! Here's how to nail the details for your <strong>combined bachelor bachelorette</strong> celebration.
              </p>

              <BlogImageBreak
                src={cleverGirl}
                alt="Clever Girl lake travis bachelor party boat for bachelor party Austin Texas large groups"
                caption="Clever Girl - our flagship vessel for large combined groups up to 50+ guests"
              />

              {/* Accommodations */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Home className="h-6 w-6 text-blue-600" />
                  Accommodations for Combined Groups
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  For a <strong>joint bachelor bachelorette party</strong>, consider renting a large Airbnb or VRBO near Lake Travis that fits everyone. Look for properties with:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start gap-2">
                    <Bed className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span>6-10 bedrooms for your combined crew (many sleep 20+ guests)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Waves className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span>Private pool and hot tub for late-night hangouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span>Lake Travis location for easy access to your <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">party boat Austin</Link> experience</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Pro tip: Have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> stock your rental with drinks, mixers, and snacks before you arrive. They can supply drinks for larger combined groups with everything from beer and wine to custom cocktail packages!
                </p>
              </div>

              {/* Transportation */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Car className="h-6 w-6 text-purple-600" />
                  Transportation for Your Combined Crew
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Getting a larger <strong>combined bachelor bachelorette</strong> group around Austin requires planning:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Party Bus:</strong> Rent a party bus for bar crawls – keeps everyone together</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Uber XL Fleet:</strong> Book multiple Uber XLs for flexibility downtown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Marina Transport:</strong> The <Link href="/atx-disco-cruise" className="text-purple-600 hover:underline font-semibold">ATX Disco Cruise</Link> departs from an easy-access marina with parking</span>
                  </li>
                </ul>
              </div>

              {/* Reservations */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Calendar className="h-6 w-6 text-pink-600" />
                  Reservations & Bookings
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Large group reservations require advance planning. Here's your checklist:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-pink-500 flex-shrink-0 mt-1" />
                    <span><strong>3-6 Months Out:</strong> Book <Link href="/atx-disco-cruise" className="text-purple-600 hover:underline font-semibold">ATX Disco Cruise</Link> or <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">private boat charter</Link></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-pink-500 flex-shrink-0 mt-1" />
                    <span><strong>2-3 Months Out:</strong> Lock in accommodations and restaurant reservations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-pink-500 flex-shrink-0 mt-1" />
                    <span><strong>1 Week Out:</strong> Order from <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> for all your beverage needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-pink-500 flex-shrink-0 mt-1" />
                    <span><strong>Day Before:</strong> Confirm all reservations and transportation</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Need help with planning? Check our <Link href="/faq" className="text-blue-600 hover:underline font-semibold">FAQ</Link> or <Link href="/contact" className="text-blue-600 hover:underline font-semibold">contact us</Link> – we've helped plan hundreds of <strong>joint bachelor bachelorette parties</strong>! You can also view our <Link href="/pricing-breakdown" className="text-purple-600 hover:underline font-semibold">pricing breakdown</Link> to budget for your <strong>combined bachelor bachelorette</strong> celebration.
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* Sample 3-Day Joint Party Itinerary */}
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-itinerary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-8 w-8 text-orange-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sample 3-Day Joint Party Itinerary</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Here's a sample itinerary for the perfect <strong>joint bachelor bachelorette party</strong> weekend in Austin. The <Link href="/atx-disco-cruise" className="text-purple-600 hover:underline font-semibold">ATX Disco Cruise</Link> on Day 2 is the centerpiece – and with <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> handling your beverages, you can focus on the fun!
              </p>

              {/* Day 1 */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Sun className="h-6 w-6 text-yellow-500" />
                  Day 1: Arrival & Downtown Fun
                </h3>
                <div className="space-y-4">
                  {itineraryDay1.map((item, index) => (
                    <div key={index} className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-orange-100 dark:border-gray-700">
                      <div className="flex-shrink-0 w-20 text-center">
                        <Badge className="bg-orange-500 text-white">{item.time}</Badge>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.activity}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 2 */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Ship className="h-6 w-6 text-blue-500" />
                  Day 2: The Main Event – ATX Disco Cruise
                </h3>
                <div className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/20 dark:to-blue-900/20 p-4 rounded-lg mb-4 border-2 border-purple-200">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Pro Tip: Order from <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Party On Delivery</a> – they'll deliver drinks, mixers, ice, and snacks directly to the marina before your <strong>Lake Travis party boat</strong> cruise!
                  </p>
                </div>
                <div className="space-y-4">
                  {itineraryDay2.map((item, index) => (
                    <div key={index} className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-100 dark:border-gray-700">
                      <div className="flex-shrink-0 w-20 text-center">
                        <Badge className={index === 2 ? "bg-purple-600 text-white" : "bg-blue-500 text-white"}>{item.time}</Badge>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.activity}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 3 */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Coffee className="h-6 w-6 text-amber-600" />
                  Day 3: Recovery & Farewell
                </h3>
                <div className="space-y-4">
                  {itineraryDay3.map((item, index) => (
                    <div key={index} className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-amber-100 dark:border-gray-700">
                      <div className="flex-shrink-0 w-20 text-center">
                        <Badge className="bg-amber-500 text-white">{item.time}</Badge>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.activity}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <BlogImageBreak
                src={unicornFloat}
                alt="Giant unicorn float on austin bachelor party boat lake travis bachelor party cruise"
                caption="Float like royalty on our giant lily pads during your combined celebration"
              />
            </m.div>
          </div>
        </section>

        {/* Party On Delivery Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" data-testid="section-party-on-delivery">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Wine className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Let Party On Delivery Handle the Drinks</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Coordinating beverages for a larger <strong>combined bachelor bachelorette</strong> group can be a headache – but <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Party On Delivery</a> makes it effortless! They're Austin's premier beverage delivery service and the perfect partner for your <strong>joint bachelor bachelorette party</strong>.
              </p>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-green-200 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Why Party On Delivery is Perfect for Joint Parties</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Marina Delivery:</strong> Drops off drinks directly at the <Link href="/atx-disco-cruise" className="text-purple-600 hover:underline">ATX Disco Cruise</Link> marina</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Large Group Packages:</strong> Custom orders for 20, 30, 40+ guests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Full Bar Setup:</strong> Beer, wine, spirits, mixers, ice, cups</span>
                    </li>
                  </ul>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Vacation Rental Stocking:</strong> Have drinks waiting at your Airbnb</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Last-Minute Orders:</strong> Same-day delivery available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>No Glass Reminders:</strong> They know <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline">Lake Travis party boat</Link> rules!</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Skip the stress of shopping for a large group. <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Party On Delivery</a> will supply drinks for larger combined groups – whether you're stocking your rental, preparing for the <strong>party boat Austin</strong> cruise, or setting up for a downtown bar crawl. They've partnered with <Link href="/" className="text-blue-600 hover:underline font-semibold">Premier Party Cruises</Link> to make your <strong>joint bachelor bachelorette party</strong> completely hassle-free!
              </p>
            </m.div>
          </div>
        </section>

        {/* Conclusion: One for the Books */}
        <section className="py-16 bg-white dark:bg-gray-900" data-testid="section-conclusion">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Conclusion: Your Austin Bachelor Party Adventure Awaits</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                A <strong>joint bachelor bachelorette party</strong> in Austin on a <strong>lake travis bachelor party boat</strong> isn't just a celebration – it's an experience that will define your wedding weekend. By combining forces for your <strong>austin bachelor party</strong>, you'll create memories that both crews will talk about for years, save money, reduce planning stress, and most importantly, celebrate your love together with everyone who matters most.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                The <Link href="/atx-disco-cruise" className="text-purple-600 hover:underline font-semibold">ATX Disco Cruise</Link> is the centerpiece activity that makes <strong>combined bachelor bachelorette</strong> celebrations truly special. It's the only multi-group, co-ed party cruise in the country – designed from the ground up for bachelor AND bachelorette parties to celebrate together on the beautiful waters of Lake Travis.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                With <Link href="/" className="text-blue-600 hover:underline font-semibold">Premier Party Cruises</Link> handling your <strong>Lake Travis party boat</strong> experience and <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Party On Delivery</a> taking care of drinks for your larger combined group, all you need to do is show up ready to party. Your <strong>bachelor party in Austin</strong> just got twice as fun!
              </p>

              <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 p-8 rounded-xl mb-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Ready to Plan Your Joint Party?</h3>
                <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                  Book the legendary <strong>ATX Disco Cruise</strong> for your <strong>joint bachelor bachelorette party</strong> – the perfect co-ed celebration on Lake Travis!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/atx-disco-cruise">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold w-full sm:w-auto" data-testid="button-book-disco-final">
                      <PartyPopper className="mr-2 h-5 w-5" />
                      Book ATX Disco Cruise
                    </Button>
                  </Link>
                  <Link href="/combined-bachelor-bachelorette-austin">
                    <Button size="lg" variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50 w-full sm:w-auto" data-testid="button-view-combined-packages">
                      <Heart className="mr-2 h-5 w-5" />
                      View Combined Packages
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/pricing-breakdown" className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-testid="link-pricing">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-900 dark:text-white">View Pricing</span>
                </Link>
                <Link href="/faq" className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-testid="link-faq">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900 dark:text-white">Read FAQs</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-testid="link-contact">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-gray-900 dark:text-white">Contact Us</span>
                </Link>
              </div>

            </m.div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <QuoteBuilderSection />

        {/* More Resources Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              {/* More Resources */}
              <div className="pt-8">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Explore More Party Resources</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/bachelor-party-austin" className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors" data-testid="link-bachelor-austin">
                    <Users className="h-6 w-6 text-blue-600" />
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Bachelor Party Austin</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Complete guide for the guys</p>
                    </div>
                  </Link>
                  <Link href="/bachelorette-party-austin" className="flex items-center gap-3 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors" data-testid="link-bachelorette-austin">
                    <Heart className="h-6 w-6 text-pink-600" />
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Bachelorette Party Austin</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Ultimate guide for the girls</p>
                    </div>
                  </Link>
                  <Link href="/private-cruises" className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors" data-testid="link-private-cruises">
                    <Ship className="h-6 w-6 text-purple-600" />
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Private Cruises</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Exclusive boat charters</p>
                    </div>
                  </Link>
                  <Link href="/gallery" className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors" data-testid="link-gallery">
                    <Camera className="h-6 w-6 text-amber-600" />
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Photo Gallery</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">See real parties in action</p>
                    </div>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </section>

      </div>
    </>
    </BlogV2Layout>
    </LazyMotionProvider>
  );
}

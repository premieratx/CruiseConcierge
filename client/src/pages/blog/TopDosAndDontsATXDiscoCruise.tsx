import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, PartyPopper, CheckCircle2, XCircle,
  Music, Waves, Beer, Star, ArrowRight, Camera, Shield, 
  Utensils, Sparkles, Heart, Trophy, Gift, Crown, Zap,
  Droplets, AlertTriangle, Shirt, Smile, ThumbsUp, ThumbsDown,
  Anchor, LifeBuoy, GlassWater
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { BlogImageBreak } from '@/components/BlogImageBreak';

import discoParty from '@assets/atx-disco-cruise-party.webp';
import dancingScene from '@assets/dancing-party-scene.webp';
import cleverGirl from '@assets/clever-girl-50-person-boat.webp';
import unicornFloat from '@assets/giant-unicorn-float.webp';
import InlineCTABar from '@/components/InlineCTABar';


const dosList = [
  { 
    icon: Droplets, 
    title: 'DO: Stay Hydrated All Day', 
    description: 'Water stations are provided, but bring Liquid IV or electrolyte packets. The Texas sun and dancing will test you!' 
  },
  { 
    icon: Shirt, 
    title: 'DO: Dress for the Occasion', 
    description: 'Matching outfits, themed costumes, sashes and tiaras - the ATX Disco Cruise is your stage to shine.' 
  },
  { 
    icon: Users, 
    title: 'DO: Make Friends with Other Groups', 
    description: 'This is a CO-ED party! Bachelor and bachelorette groups mix and mingle. Form a supergroup for 6th Street!' 
  },
  { 
    icon: Utensils, 
    title: 'DO: Bring Snacks for the Crew', 
    description: 'Breakfast tacos, sandwiches, finger foods - fuel your 4-hour party on the water.' 
  },
  { 
    icon: PartyPopper, 
    title: 'DO: Party Smart & Pace Yourself', 
    description: 'Go hard, but save energy for the after-party. Captain Brian\'s motto: "Don\'t be a dick and don\'t die."' 
  }
];

const dontsList = [
  { 
    icon: Beer, 
    title: 'DON\'T: Overdo Hard Liquor Early', 
    description: 'Beer and seltzers are your friends. Too many shots too early = missing the best parts of the cruise.' 
  },
  { 
    icon: AlertTriangle, 
    title: 'DON\'T: Be Disrespectful to Others', 
    description: 'Read the room, respect boundaries. This is a shared experience - keep the vibes positive for everyone.' 
  },
  { 
    icon: Anchor, 
    title: 'DON\'T: Ignore Boat Safety Rules', 
    description: 'No glass beer bottles, no diving while moving, follow crew instructions. Safety keeps the party going!' 
  }
];

const whyDiscoCruiseWorks = [
  { icon: Users, title: 'Co-Ed Party Mixer', description: 'Bachelor AND bachelorette parties together - meet new friends and form a supergroup!' },
  { icon: Music, title: 'Professional DJ', description: 'Non-stop hits from 70s disco to today\'s bangers keep the dance floor packed' },
  { icon: Camera, title: 'Pro Photographer', description: 'Every legendary moment captured for Instagram and memories' },
  { icon: Waves, title: 'Giant Lily Pad Floats', description: '6x20 feet floating lounges for swimming breaks and chilling' },
  { icon: Shield, title: 'USCG-Certified Captains', description: '15+ years and 150,000 happy partiers with perfect safety record' },
  { icon: Gift, title: 'All-Inclusive Package', description: 'DJ, photographer, floats, ice, cups - just bring your BYOB drinks' }
];

export default function TopDosAndDontsATXDiscoCruise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/the-top-dos-and-dont-for-success-on-the-atx-disco-cruise-with-premier-party-cruises"
        defaultTitle="ATX Disco Cruise: Top Dos and Donts for Success | Premier Party Cruises"
        defaultDescription="Master the top do's and don'ts for success on the ATX Disco Cruise. Essential planning tips for bachelor and bachelorette boat parties on Lake Travis including hydration, dress code, making friends, bringing snacks, and party smart strategies."
        defaultKeywords={['ATX Disco Cruise', 'Lake Travis party boat', 'Austin bachelor party', 'Austin bachelorette party', 'party boat tips', 'Lake Travis cruise tips', 'Austin party boat', 'disco cruise dos and donts']}
        image="https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp"
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${discoParty})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-500 text-black font-bold">
              ULTIMATE PARTY CRUISE GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Top Do's and Don'ts for Success<br />on the ATX Disco Cruise
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Planning a <strong>bachelor or bachelorette party</strong> on Lake Travis? Here's everything you need to know to crush your <strong>ATX Disco Cruise</strong> experience with Premier Party Cruises.
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


        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Guide to the Ultimate ATX Disco Cruise Experience</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                You've made the decision to book the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> for your celebration - excellent choice! This isn't just another <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">party boat in Austin</Link>. It's the only multi-group, all-inclusive party cruise in the U.S. where <strong>bachelor and bachelorette parties celebrate together</strong> on <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis</Link>.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Picture a floating nightclub combined with a co-ed mixer - you'll be dancing alongside other party groups, making new friends, and potentially forming a "supergroup" for after-party adventures on 6th Street or Rainey Street. But to maximize your experience, there are some crucial do's and don'ts you need to know.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Captain Brian, who's been running these legendary <strong>Lake Travis party boat</strong> cruises for 15+ years with over 150,000 happy guests, has one simple motto: <strong>"Don't be a dick and don't die."</strong> Follow that golden rule, plus these pro tips, and you're guaranteed an epic day on the water.
              </p>

              <BlogImageBreak
                src={discoParty}
                alt="Bachelor and bachelorette parties celebrating together on the ATX Disco Cruise Lake Travis"
                caption="Bachelor and bachelorette groups mixing it up on the ATX Disco Cruise"
              />
            </m.div>
          </div>
        </section>

        <InlineCTABar variant="slate" />

        {/* The DO's Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <ThumbsUp className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The DO's: How to Crush Your ATX Disco Cruise</h2>
              </div>

              {/* DO: Stay Hydrated */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Droplets className="h-6 w-6 text-blue-600" />
                  DO: Stay Hydrated All Day Long
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Texas sun + cold drinks + 4 hours of dancing = dehydration danger zone. We provide water stations on every <strong>Lake Travis party boat</strong> cruise, but the smartest party groups come prepared with hydration reinforcements.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Pack Liquid IV, Waterboy, or other electrolyte packets to drop in your water bottles. Have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> include hydration supplies in your drink order - they'll deliver everything right to the marina, including water, electrolyte drinks, and cooler ice.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>The 1:1 Rule:</strong> For every alcoholic drink, have one glass of water. Your evening on 6th Street will thank you!
                  </p>
                </div>
              </div>

              {/* DO: Dress for the Occasion */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Shirt className="h-6 w-6 text-pink-600" />
                  DO: Dress for the Occasion
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> is basically a floating costume party! Matching Hawaiian shirts, ridiculous groom-to-be hats, bride squad sashes, themed costumes (80s workout, disco divas, cowboys) - the more creative, the better.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  You're not just partying with your crew - you're on a co-ed <strong>party boat Austin</strong> experience with other groups. Looking sharp (or hilariously ridiculous) breaks the ice instantly. Plus, our professional photographer is capturing everything for Instagram-worthy memories.
                </p>
                <div className="bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>Pro Tip:</strong> Don't forget swimwear under your costume! You'll want to hit those giant lily pad floats during the cruise.
                  </p>
                </div>
              </div>

              <BlogImageBreak
                src={dancingScene}
                alt="Lake Travis party boat with groups dancing on the ATX Disco Cruise"
                caption="Stay hydrated and keep the dance floor energy going all cruise long"
              />

              {/* DO: Make Friends with Other Groups */}
              <div className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/20 dark:to-blue-900/20 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <Users className="h-5 w-5 text-blue-500" />
                  DO: Make Friends with Other Groups
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Here's what makes the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> different from any other <strong>party boat Austin</strong> experience: it's a CO-ED party where <strong>bachelor and bachelorette groups mix together</strong>. Embrace it! The magic happens when you step outside your crew and start mingling.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  We've seen countless crews team up to form "supergroups" that roll together to 6th Street or Rainey Street after the cruise. Some have even become friends for life. The shared experience of dancing on the same <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis party boat</Link>, swimming in the same cove, and celebrating similar milestones creates instant bonds.
                </p>
                <div className="bg-white dark:bg-gray-800 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>Supergroup Pro Tip:</strong> If you hit it off with another group, exchange numbers and plan to meet up at a <Link href="/combined-bachelor-bachelorette-austin" className="text-blue-600 hover:underline font-semibold">combined bach bar crawl</Link> later!
                  </p>
                </div>
              </div>

              {/* DO: Bring Snacks */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Utensils className="h-6 w-6 text-orange-600" />
                  DO: Bring Snacks for the Crew
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  You're about to spend 4 hours dancing, swimming, and partying on a <strong>Lake Travis party boat</strong>. Food is BYOB just like drinks, and trust us - you'll want it. An empty stomach plus sun plus alcohol equals a rough time.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Austin breakfast tacos are the perfect pre-cruise fuel (Torchy's, Tacodeli, Veracruz All Natural). Pack a cooler with sandwiches, granola bars, and easy finger foods. <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> can coordinate snack boxes, coolers, and ice delivered right to the marina.
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>Snack Pro Tip:</strong> Have your drink coolers pre-loaded with ice delivered to the marina. Less hassle, more party time!
                  </p>
                </div>
              </div>

              {/* DO: Party Smart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <PartyPopper className="h-6 w-6 text-purple-600" />
                  DO: Party Smart & Pace Yourself
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This is YOUR celebration. The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> is designed for maximum fun - we've got the DJ spinning bangers, the photographer capturing memories, giant floats for lake swimming, and a dance floor ready to be dominated. Go for it!
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  But remember Captain Brian's legendary motto that's guided 15+ years and 150,000+ happy guests: <strong>"Don't be a dick and don't die."</strong> Be cool to everyone, respect the crew and other guests, stay hydrated, and pace yourself so you can enjoy the rest of your Austin weekend.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>The Balance:</strong> The best party stories come from those who went all out on the boat but still had energy for 6th Street that night!
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* The DON'Ts Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <ThumbsDown className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The DON'Ts: Avoid These Party Cruise Mistakes</h2>
              </div>

              {/* DON'T: Overdo Hard Liquor */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Beer className="h-6 w-6 text-red-600" />
                  DON'T: Overdo Hard Liquor Early
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  We've seen it countless times: the crew that brings nothing but tequila and does shots from minute one. By hour two, half the group is fading. By hour three, they're missing the best swimming spot. Don't be that crew.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Beer and seltzers are your friends on the <strong>Lake Travis party boat</strong>. Lower ABV means longer-lasting energy. Save the hard liquor for mixed drinks you can sip, not slam. <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> can help you plan the perfect drink balance based on your group size and cruise duration.
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>Smart Drink Strategy:</strong> Start with beers/seltzers for the first 2 hours, then switch to cocktails if you want.
                  </p>
                </div>
              </div>

              <BlogImageBreak
                src={cleverGirl}
                alt="Clever Girl lake travis party boat for Austin celebrations"
                caption="The Clever Girl - One of our flagship Lake Travis party boats"
              />

              {/* DON'T: Be Disrespectful */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  DON'T: Be Disrespectful to Others
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> is a shared experience with <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-semibold">bachelor parties</Link>, <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette parties</Link>, and other groups. Yes, it's a co-ed mixer vibe, but that doesn't mean anything goes. Read the room. If someone's not interested in chatting, move on gracefully.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This is Captain Brian's "Don't be a dick" rule in action. The magic of the <strong>party boat Austin</strong> experience is that everyone's celebrating. Positive vibes attract positive connections. Being genuinely friendly (not pushy) is how groups end up forming those legendary supergroups for after-cruise adventures.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>The Vibe Check:</strong> Just be normal humans having fun together. That's how real connections happen!
                  </p>
                </div>
              </div>

              {/* DON'T: Ignore Safety */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Anchor className="h-6 w-6 text-blue-600" />
                  <LifeBuoy className="h-6 w-6 text-red-600" />
                  DON'T: Ignore Boat Safety Rules
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  It's easy to forget you're cruising <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis</Link> when the DJ is bumping and you're having the time of your life. But this is Captain Brian's "Don't die" part of the motto. Some non-negotiable safety rules keep everyone having fun:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>No glass beer bottles.</strong> Broken glass on a boat deck = ruined party. Beer must be in cans. Wine, champagne, and spirits in a cooler are fine.</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>No diving or jumping while the boat is moving.</strong> We anchor in beautiful coves for swimming time. Wait for it.</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Follow crew instructions.</strong> Our USCG-certified captains have 15+ years experience. When they say something, there's a reason.</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Don't overestimate your swimming abilities.</strong> The lake is deep. Stay near the floats and don't swim too far from the boat.</span>
                  </li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>Our Track Record:</strong> 150,000+ guests, 15+ years, perfect safety record. That's because everyone follows the rules!
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        <InlineCTABar variant="amber" />

        {/* Why ATX Disco Cruise Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why the ATX Disco Cruise Works So Well</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Everything included for an epic <strong>Lake Travis party boat</strong> experience - just bring your crew and BYOB drinks
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyDiscoCruiseWorks.map((item, index) => (
                <m.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <item.icon className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Party On Delivery Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <Gift className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Make It Easy with Party On Delivery</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Planning a party is stressful enough without worrying about beer runs, ice, coolers, and mixers. That's where <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> becomes your secret weapon for an effortless <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> experience.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">What Party On Delivery Handles for You:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Marina delivery:</strong> All your drinks, ice, and coolers delivered directly to the boat before you arrive</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Airbnb stocking:</strong> Have your rental fridge full of drinks for pre-gaming and recovery</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Hydration supplies:</strong> Water, electrolyte drinks, Liquid IV packets - stay fresh all day</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Ice coordination:</strong> Fresh bags of ice so your drinks stay cold the entire 4-hour cruise</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Quantity planning:</strong> They'll recommend exactly how much based on your group size</span>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Combining the all-inclusive <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> with <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> means zero logistics headaches. You show up, your drinks are waiting, and you party. That's it.
              </p>

              <BlogImageBreak
                src={unicornFloat}
                alt="Giant unicorn float on lake travis party boat cruise in Austin Texas"
                caption="Giant floats for swimming breaks - because even party animals need to cool off"
              />
            </m.div>
          </div>
        </section>

        <InlineCTABar variant="navy" />

        {/* Quick Reference Card */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Quick Reference: Do's vs Don'ts</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Do's Column */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-500">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                    <ThumbsUp className="h-6 w-6" />
                    DO These Things
                  </h3>
                  <ul className="space-y-3">
                    {dosList.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{item.title.replace('DO: ', '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Don'ts Column */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border-2 border-red-500">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-700 dark:text-red-400">
                    <ThumbsDown className="h-6 w-6" />
                    DON'T Do These Things
                  </h3>
                  <ul className="space-y-3">
                    {dontsList.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{item.title.replace('DON\'T: ', '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Remember Captain Brian's motto: <strong>"Don't be a dick and don't die."</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Follow that simple rule and you're guaranteed an epic <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> experience!
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your ATX Disco Cruise Adventure?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                The <strong>ATX Disco Cruise</strong> is the premier <strong>Lake Travis party boat</strong> experience. <Link href="/bachelor-party-austin" className="text-yellow-400 hover:underline font-semibold">Bachelor groups</Link>, <Link href="/bachelorette-party-austin" className="text-yellow-400 hover:underline font-semibold">bachelorette parties</Link>, amazing memories, and potential supergroup formations await. Book now with Premier Party Cruises!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/book-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Book Your Cruise Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6">
                    Questions? Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 justify-center text-sm text-white/80">
                <Link href="/atx-disco-cruise" className="hover:text-white underline">ATX Disco Cruise</Link>
                <span>•</span>
                <Link href="/bachelor-party-austin" className="hover:text-white underline">Bachelor Party Austin</Link>
                <span>•</span>
                <Link href="/bachelorette-party-austin" className="hover:text-white underline">Bachelorette Party Austin</Link>
                <span>•</span>
                <Link href="/private-cruises" className="hover:text-white underline">Private Cruises</Link>
                <span>•</span>
                <Link href="/gallery" className="hover:text-white underline">Photo Gallery</Link>
                <span>•</span>
                <Link href="/faq" className="hover:text-white underline">FAQ</Link>
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

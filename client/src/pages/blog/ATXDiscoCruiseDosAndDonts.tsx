import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
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
import { BlogImageBreak, BlogPhotoStrip, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';

import discoParty from '@assets/atx-disco-cruise-party.webp';
import dancingScene from '@assets/dancing-party-scene.webp';
import cleverGirl from '@assets/clever-girl-50-person-boat.webp';
import unicornFloat from '@assets/giant-unicorn-float.webp';
import bachelorHero from '@assets/bachelor-party-group-guys.webp';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const dosList = [
  { 
    icon: Shirt, 
    title: 'DO: Dress to Impress', 
    description: 'Costumes, matching shirts, themes - go all out! The ATX Disco Cruise is the perfect stage for your crew to shine.' 
  },
  { 
    icon: Droplets, 
    title: 'DO: Hydrate Between Beers', 
    description: 'Water stations are provided, but smart groups bring Liquid IV or Waterboy packets to stay fresh all cruise long.' 
  },
  { 
    icon: Users, 
    title: 'DO: Make Friends & Form a Supergroup', 
    description: 'This is a CO-ED party! Bachelor and bachelorette groups mix and mingle. You might leave with new friends for life.' 
  },
  { 
    icon: Utensils, 
    title: 'DO: Bring Snacks', 
    description: 'Breakfast tacos, sandwiches, chips - fuel your crew for 4 hours of dancing and swimming on Lake Travis.' 
  },
  { 
    icon: PartyPopper, 
    title: 'DO: Party Hard and Party Smart', 
    description: 'This is YOUR day - dance, swim, celebrate! Just remember Captain Brian\'s motto: "Don\'t be a dick and don\'t die."' 
  }
];

const dontsList = [
  { 
    icon: Beer, 
    title: 'DON\'T: Overdo the Hard Liquor or Shots', 
    description: 'Beer and seltzers are your friends on the water. Too many shots early = missing the best parts of the cruise.' 
  },
  { 
    icon: AlertTriangle, 
    title: 'DON\'T: Be That Creepy or Rude Guy', 
    description: 'This is a shared party boat with other groups. Respect everyone, read the room, and keep the vibes positive.' 
  },
  { 
    icon: Anchor, 
    title: 'DON\'T: Forget You\'re On a Boat', 
    description: 'No glass containers, no diving while moving, follow crew instructions. Safety keeps the party going!' 
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

export default function ATXDiscoCruiseDosAndDonts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Top Do's and Don'ts for an Epic ATX Disco Cruise Bachelor Party | Premier Party Cruises</title>
        <meta name="description" content="Planning an ATX Disco Cruise bachelor party? Master the do's and don'ts for an epic Lake Travis party boat experience. Learn Captain Brian's rules, hydration tips, Party On Delivery coordination, and how to mix with bachelorette groups for the ultimate Austin bachelor party." />
        <meta name="keywords" content="ATX Disco Cruise, Austin bachelor party, Lake Travis party boat, party boat Austin, bachelor party in Austin, ATX Disco Cruise tips, Lake Travis bachelor party, Austin party boat tips, co-ed party boat Austin" />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/atx-disco-cruise-dos-and-donts-bachelor-party" />
        <meta property="og:title" content="Top Do's and Don'ts for an Epic ATX Disco Cruise Bachelor Party" />
        <meta property="og:description" content="Master the do's and don'ts for an epic ATX Disco Cruise bachelor party on Lake Travis. Pro tips from Captain Brian himself!" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PublicNavigation />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${discoParty})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-500 text-black font-bold" data-testid="badge-dos-donts-guide">
              ULTIMATE ATX DISCO CRUISE GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Top Do's and Don'ts for an Epic<br />ATX Disco Cruise Bachelor Party
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Planning the ultimate <strong>Austin bachelor party</strong> on Lake Travis? Here's everything you need to know to crush your <strong>ATX Disco Cruise</strong> experience - from dress codes to drink strategies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atx-disco-cruise">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6" data-testid="button-book-disco-cruise-hero">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Book ATX Disco Cruise
                </Button>
              </Link>
              <Link href="/bachelor-party-austin">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-bachelor-packages">
                  View Bachelor Packages
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
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Welcome to the Ultimate Austin Bachelor Party Boat Experience</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                So you've booked the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> for your <strong>bachelor party in Austin</strong> - smart move! This isn't your average <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">party boat Austin</Link> rental. It's the only multi-group, all-inclusive party cruise in the U.S. where <strong>bachelor and bachelorette parties celebrate together</strong> on <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis</Link>.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Think of it as a floating nightclub mixed with a co-ed mixer - you'll be dancing alongside other party groups, making new friends, and potentially forming a "supergroup" for after-party adventures on 6th Street. But to maximize your <strong>Lake Travis party boat</strong> experience, there are some crucial do's and don'ts you need to know.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Captain Brian, who's been running these legendary <strong>lake travis bachelor party boat</strong> cruises for 15+ years with over 150,000 happy guests, has one simple motto: <strong>"Don't be a dick and don't die."</strong> Follow that, plus these pro tips, and you're guaranteed an epic <strong>austin bachelor party</strong> day on the water.
              </p>

              <BlogImageBreak
                src={discoParty}
                alt="Austin bachelor party boat cruise with bachelorette parties celebrating together on Lake Travis"
                caption="Bachelor and bachelorette groups mixing it up on the ATX Disco Cruise"
              />
            </motion.div>
          </div>
        </section>

        {/* The DO's Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <ThumbsUp className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The DO's: How to Crush Your Lake Travis Bachelor Party Boat Experience</h2>
              </div>

              {/* DO: Dress to Impress */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Shirt className="h-6 w-6 text-green-600" />
                  DO: Dress to Impress (Costumes, Themes, Coordination)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> is basically a floating costume party. This is your chance to go all out! Matching Hawaiian shirts, ridiculous groom-to-be hats, themed costumes (80s workout, cowboys, anything goes) - the more creative, the better.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Why? Because you're not just partying with your crew - you're on a co-ed <strong>party boat Austin</strong> experience with <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette parties</Link> and other groups. Looking sharp (or hilariously ridiculous) breaks the ice instantly. Plus, our professional photographer is capturing everything for Instagram-worthy memories.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>Pro tip:</strong> Don't forget swim trunks under your costume! You'll want to hit those giant lily pad floats during the cruise.
                  </p>
                </div>
              </div>

              {/* DO: Hydrate Between Beers */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Droplets className="h-6 w-6 text-blue-600" />
                  DO: Hydrate Between Beers (Water Stations, Liquid IV, Waterboy)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Texas sun + cold beers + dancing = dehydration danger zone. We provide water stations on every <strong>Lake Travis party boat</strong> cruise, but the smartest <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-semibold">Austin bachelor party</Link> groups come prepared with hydration reinforcements.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Pack some Liquid IV or Waterboy electrolyte packets to drop in your water bottles. Have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> include hydration supplies in your drink order - they'll deliver everything right to the marina, including water, electrolyte drinks, and even cooler ice to keep everything cold.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>The 1:1 Rule:</strong> For every beer, drink one glass of water. Your night on 6th Street will thank you. <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> can stock your Airbnb fridge with recovery supplies for after the cruise too!
                  </p>
                </div>
              </div>

              <BlogImageBreak
                src={dancingScene}
                alt="Lake Travis bachelor party boat with groups dancing on the ATX Disco Cruise"
                caption="Stay hydrated and keep the dance floor energy going all cruise long"
              />

              {/* DO: Make Friends & Form a Supergroup */}
              <div className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/20 dark:to-blue-900/20 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <Users className="h-5 w-5 text-blue-500" />
                  DO: Make Friends & Form a Supergroup (Co-Ed Mixing Emphasis)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Here's what makes the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> different from any other <strong>party boat Austin</strong> experience: it's a CO-ED party where <strong>bachelor and bachelorette groups mix together</strong>. Embrace it! The magic happens when you step outside your crew and start mingling.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  We've seen countless bachelor crews team up with bachelorette groups to form "supergroups" that roll together to 6th Street or Rainey Street after the cruise. Some have even become friends for life. The shared experience of dancing on the same <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis party boat</Link>, swimming in the same cove, and celebrating similar milestones creates instant bonds.
                </p>
                <div className="bg-white dark:bg-gray-800 border-l-4 border-pink-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>Supergroup Pro Tip:</strong> If you hit it off with another group, exchange numbers and plan to meet up at <Link href="/combined-bachelor-bachelorette-austin" className="text-blue-600 hover:underline font-semibold">a combined bachelor-bachelorette bar crawl</Link> later. It's happened hundreds of times on our cruises!
                  </p>
                </div>
              </div>

              {/* DO: Bring Snacks */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Utensils className="h-6 w-6 text-orange-600" />
                  DO: Bring Snacks (Breakfast Tacos, Sandwiches, Fuel Up!)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  You're about to spend 4 hours dancing, swimming, and partying on a <strong>Lake Travis party boat</strong>. Food is BYOB just like drinks, and trust us - you'll want it. An empty stomach plus sun plus alcohol equals a rough time.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Austin breakfast tacos are the perfect pre-cruise fuel (Torchy's, Tacodeli, Veracruz All Natural). Pack a cooler with sandwiches, chips, and easy finger foods. The best part? <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> doesn't just deliver alcohol - they can coordinate snack boxes, coolers, ice, and even hangover recovery kits delivered right to the marina or your Airbnb.
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>Snack Pro Tip:</strong> Have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> bring your drink coolers pre-loaded with ice to the marina. Less hassle, more party time. Check out our <Link href="/faq" className="text-blue-600 hover:underline font-semibold">FAQ page</Link> for more BYOB tips!
                  </p>
                </div>
              </div>

              {/* DO: Party Hard and Party Smart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <PartyPopper className="h-6 w-6 text-purple-600" />
                  DO: Party Hard and Party Smart (Captain Brian's Motto)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This is YOUR <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-semibold">Austin bachelor party</Link>. The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> is designed for maximum fun - we've got the DJ spinning bangers, the photographer capturing memories, giant floats for lake swimming, and a dance floor ready to be dominated. Go hard!
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  But remember Captain Brian's legendary motto that's guided 15+ years and 150,000+ happy guests: <strong>"Don't be a dick and don't die."</strong> It's simple but profound. Be cool to everyone, respect the crew and other guests, stay hydrated, and make decisions that let you enjoy the rest of your Austin weekend.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>The Balance:</strong> The best <strong>bachelor party in Austin</strong> stories come from guys who went all out on the boat but still had energy for 6th Street that night. View our <Link href="/gallery" className="text-blue-600 hover:underline font-semibold">photo gallery</Link> to see what epic looks like!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The DON'Ts Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <ThumbsDown className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The DON'Ts: Avoid These Austin Bachelor Party Cruise Mistakes</h2>
              </div>

              {/* DON'T: Overdo the Hard Liquor */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Beer className="h-6 w-6 text-red-600" />
                  DON'T: Overdo the Hard Liquor or Shots (Beer/Seltzers Preferred)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  We've seen it countless times: the bachelor crew that brings nothing but tequila and does shots from minute one. By hour two, half the group is fading. By hour three, they're missing the best swimming spot. Don't be those guys.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Beer and seltzers are your friends on the <strong>Lake Travis party boat</strong>. Lower ABV means longer-lasting energy. Save the hard liquor for mixed drinks you can sip, not slam. <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> can help you plan the perfect drink balance - they'll suggest quantities based on your group size and cruise duration.
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>Smart Drink Strategy:</strong> Start with beers/seltzers for the first 2 hours, then switch to cocktails if you want. Have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> include mixers and you'll have options. Check <Link href="/pricing-breakdown" className="text-blue-600 hover:underline font-semibold">pricing details</Link> to budget for your perfect drink package.
                  </p>
                </div>
              </div>

              <BlogImageBreak
                src={cleverGirl}
                alt="Clever Girl lake travis bachelor party boat for bachelor party Austin Texas celebrations"
                caption="The Clever Girl - One of our flagship Lake Travis party boats"
              />

              {/* DON'T: Be That Creepy or Rude Guy */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  DON'T: Be That Creepy or Rude Guy (Respect Others)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> is a shared experience with <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette parties</Link> and other groups. Yes, it's a co-ed mixer vibe, but that doesn't mean anything goes. Read the room. If someone's not interested in chatting, move on. Keep it fun, not creepy.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  This is Captain Brian's "Don't be a dick" in action. The magic of the <strong>party boat Austin</strong> experience is that everyone's celebrating. Positive vibes attract positive connections. Being genuinely friendly (not slimy) is how bachelor crews end up forming those legendary supergroups with bachelorette parties for after-cruise adventures.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    <strong>The Vibe Check:</strong> If your approach feels like you're "running game," you're doing it wrong. Just be normal humans having fun together. That's how real connections happen - and that's why groups return for <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">private cruises</Link> to celebrate future events!
                  </p>
                </div>
              </div>

              {/* DON'T: Forget You're On a Boat */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Anchor className="h-6 w-6 text-blue-600" />
                  <LifeBuoy className="h-6 w-6 text-red-600" />
                  DON'T: Forget You're On a Boat (Safety Rules Matter)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  It's easy to forget you're cruising <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis</Link> when the DJ is bumping and you're having the time of your life. But this is Captain Brian's "Don't die" part of the motto. Some non-negotiable safety rules keep everyone having fun:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>No glass containers.</strong> Broken glass on a boat deck = ruined party. Use plastic or cans only. <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> can include plastic cups in your order.</span>
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
                    <strong>Our Track Record:</strong> 150,000+ guests, 15+ years, perfect safety record. That's because everyone follows the rules. Questions? Visit our <Link href="/faq" className="text-blue-600 hover:underline font-semibold">FAQ page</Link> or <Link href="/contact" className="text-blue-600 hover:underline font-semibold">contact us</Link> directly!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why ATX Disco Cruise Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why the ATX Disco Cruise is the Best Lake Travis Bachelor Party Boat Experience</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Everything included for an epic <strong>Lake Travis party boat</strong> experience - just bring your crew and BYOB drinks
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyDiscoCruiseWorks.map((item, index) => (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`card-feature-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <item.icon className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Party On Delivery Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <Gift className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Make It Easy with Party On Delivery</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Planning a <strong>bachelor party in Austin</strong> is stressful enough without worrying about beer runs, ice, coolers, and mixers. That's where <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> becomes your secret weapon for an effortless <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> experience.
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
                Combining the all-inclusive <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> with <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> means zero logistics headaches. You show up, your drinks are waiting, and you party. That's it. It's how the smartest <strong>Austin bachelor party</strong> planners do it.
              </p>

              <BlogImageBreak
                src={unicornFloat}
                alt="Giant unicorn float on lake travis bachelor party boat cruise in Austin Texas"
                caption="Giant floats for swimming breaks - because even party animals need to cool off"
              />
            </motion.div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
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
                  Follow that simple rule and you're guaranteed an epic <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> bachelor party!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for the Ultimate Austin Bachelor Party on Lake Travis?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                The <strong>ATX Disco Cruise</strong> is the premier <strong>lake travis bachelor party boat</strong> experience. Bachelor groups, <Link href="/bachelorette-party-austin" className="text-yellow-400 hover:underline font-semibold">bachelorette parties</Link>, amazing memories, and potential supergroup formations. Book your <strong>austin bachelor party</strong> now and get ready to party on <Link href="/party-boat-lake-travis" className="text-yellow-400 hover:underline font-semibold">Lake Travis</Link>!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/book-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6" data-testid="button-book-now-cta">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Book Your Cruise Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-contact-cta">
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
                <Link href="/private-cruises" className="hover:text-white underline">Private Cruises</Link>
                <span>•</span>
                <Link href="/gallery" className="hover:text-white underline">Photo Gallery</Link>
                <span>•</span>
                <Link href="/faq" className="hover:text-white underline">FAQ</Link>
                <span>•</span>
                <Link href="/pricing-breakdown" className="hover:text-white underline">Pricing</Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

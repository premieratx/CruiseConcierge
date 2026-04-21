import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, PartyPopper, Phone, Clock, CheckCircle2, 
  Anchor, Music, Sun, Waves, MapPin, Calendar, Beer, Star,
  ArrowRight, Camera, Shield, Utensils, Car, Mic, Sparkles,
  Heart, Trophy, Gift, Crown, Zap, Package, DollarSign,
  ThumbsUp, AlertCircle, Truck, Wine, GlassWater
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogV2Layout from '@/components/BlogV2Layout';
import { BlogImageBreak, BlogPhotoStrip, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';

import bachelorHero from '@assets/bachelor-party-group-guys.webp';
import discoParty from '@assets/atx-disco-cruise-party.webp';
import cleverGirl from '@assets/clever-girl-50-person-boat.webp';

const whyLakeTravis = [
  { icon: Waves, title: 'Crystal Clear Waters', description: 'Stunning Hill Country reservoir perfect for swimming and partying' },
  { icon: Sun, title: '300+ Days of Sunshine', description: 'Austin weather keeps the party going April through October' },
  { icon: Music, title: 'Floating Nightclub Vibes', description: 'Professional DJ, disco lights, and premium sound systems' },
  { icon: MapPin, title: '30 Min from Downtown', description: 'Close to 6th Street for after-party bar crawls' },
  { icon: Users, title: 'Co-Ed Party Scene', description: 'Bachelor AND bachelorette groups partying together' },
  { icon: Shield, title: 'Licensed-Certified Safety', description: '15+ years, 150,000+ guests, perfect safety record' }
];

const discoCruiseFeatures = [
  { icon: Users, title: 'Co-Ed Party Mixer', description: 'Bachelor AND bachelorette groups party TOGETHER on the same boat - the ultimate social scene!' },
  { icon: Music, title: 'Professional DJ All Day', description: 'Non-stop hits from 70s disco to today\'s chart-toppers' },
  { icon: Camera, title: 'Pro Photographer Included', description: 'Every legendary moment captured for Instagram and memories' },
  { icon: Waves, title: 'Giant Lily Pad Floats', description: '6x20 feet floating lounges for swimming breaks in Lake Travis' },
  { icon: Shield, title: 'Licensed-Certified Captains', description: '15+ years experience with 150,000+ happy partiers' },
  { icon: Gift, title: 'All-Inclusive Package', description: 'DJ, photographer, floats, ice, cups - just bring your BYOB drinks' }
];

const partyOnDeliveryBenefits = [
  { icon: Truck, title: 'Marina Delivery', description: 'Drinks delivered directly to the boat before your cruise' },
  { icon: Package, title: 'Rental House Pre-Stocking', description: 'Have your Airbnb or VRBO stocked before you arrive' },
  { icon: DollarSign, title: '100% Buyback Policy', description: 'Return unopened items for full refund - zero waste, zero stress' },
  { icon: Phone, title: 'Free Consultations', description: 'Expert help planning quantities for your group size' }
];

const privateVsDisco = [
  { 
    type: 'ATX Disco Cruise',
    icon: PartyPopper,
    pros: ['Meet other bachelor/bachelorette groups', 'DJ & photographer included', 'Lower per-person cost', 'Social mixer atmosphere', 'All amenities included'],
    cons: ['Shared boat experience', 'Fixed schedule times'],
    bestFor: 'Groups wanting a social party atmosphere and to meet new people'
  },
  {
    type: 'Private Charter',
    icon: Crown,
    pros: ['Exclusive boat for your group', 'Flexible itinerary', 'Custom music choices', 'Private swimming spots', 'Intimate celebration'],
    cons: ['Higher total cost', 'Need to arrange DJ/photographer separately'],
    bestFor: 'Groups wanting privacy or with specific itinerary needs'
  }
];

const tipsForSuccess = [
  { icon: Calendar, title: 'Book 2-3 Months Ahead', description: 'Peak season fills fast - especially summer weekends and holidays' },
  { icon: Beer, title: 'Use Party On Delivery', description: 'Skip grocery runs - have drinks delivered to marina or rental house' },
  { icon: Sun, title: 'Apply Waterproof Sunscreen', description: 'Lake Travis sun is intense - reapply every 2 hours' },
  { icon: Camera, title: 'Bring Waterproof Phone Case', description: 'You\'ll want photos but phones and lake water don\'t mix' },
  { icon: Utensils, title: 'Eat Before Boarding', description: 'A good breakfast keeps everyone energized for the party' },
  { icon: Car, title: 'Arrange Transportation', description: 'Book rideshare or party bus - no driving after drinking on the lake' }
];

export default function LakeTravisBachelorPartyBoatsGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/lake-travis-bachelor-party-boats-guide"
        defaultTitle="Lake Travis Bachelor Party Boats: The Ultimate Austin Party Cruise Experience | Premier Party Cruises"
        defaultDescription="Plan the ultimate Lake Travis bachelor party on Austin's best party boats. Experience the famous ATX Disco Cruise where bachelor and bachelorette groups party together. BYOB-friendly with Party On Delivery coordination. Book your Austin party boat today!"
        defaultKeywords={['Lake Travis bachelor party', 'Austin party boat', 'party boat Austin', 'Lake Travis party barge', 'Austin party barge', 'bachelor party in Austin', 'ATX Disco Cruise', 'Lake Travis boat rental', 'Austin bachelor party boats']}
        image="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys.webp"
      />
      <BlogV2Layout
        title="Lake Travis Bachelor Party Boats: The Ultimate Austin Party Cruise Experience"
        description="Plan the ultimate Lake Travis bachelor party on Austin's best party boats. Experience the famous ATX Disco Cruise where bachelor and bachelorette groups party together. BYOB-friendly with Party On Delivery coordination. Book your Austin party boat today!"
        slug="lake-travis-bachelor-party-boats-guide"
        category="Bachelor Guides"
        categoryHref="/bachelor-party-austin"
        pillarTitle="Austin Bachelor Party Guide"
        pillarHref="/bachelor-party-austin"
        relatedArticles={[
          { title: "Top 10 Reasons for a Lake Travis Bachelor Party Boat", href: "/blogs/top-10-reasons-austin-bachelor-party-lake-travis-boat" },
          { title: "Austin Bachelor Party Ideas", href: "/blogs/austin-bachelor-party-ideas" },
          { title: "Epic Austin Bachelor Party Ultimate Guide", href: "/blogs/epic-bachelor-party-austin-ultimate-guide" },
        ]}
      >

      <div className="min-h-screen bg-white dark:bg-gray-950">

        {/* Hero Section */}
        <m.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bachelorHero})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-500 text-black font-bold" data-testid="badge-lake-travis-guide">
              LAKE TRAVIS BACHELOR PARTY GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Lake Travis Bachelor Party Boats:<br />The Ultimate Austin Party Cruise Experience
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Experience the legendary <strong>ATX Disco Cruise</strong> where bachelor AND bachelorette groups party TOGETHER on Lake Travis. Austin's only co-ed party boat experience!
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
        </m.section>

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This guide is part of our complete{' '}
            <Link href="/bachelor-party-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin bachelor party boats</Link>{' '}
            resource — your one-stop planning hub for Lake Travis bachelor celebrations.
          </p>
        </div>
      </div>


        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Why Lake Travis is THE Place for Your Austin Bachelor Party</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                When it comes to planning your <strong>austin bachelor party</strong>, a <strong>lake travis bachelor party boat</strong> is the crown jewel of Austin's outdoor party scene. This stunning Hill Country reservoir offers crystal-clear waters, breathtaking scenery, and endless coves perfect for a floating celebration. Whether you're looking for an <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">Austin party boat</Link> rental or the famous <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link>, Lake Travis delivers an unforgettable experience.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                What makes a <strong>party boat Austin</strong> experience so special? Picture this: you and your crew cruising the open waters of Lake Travis, premium sound system pumping your favorite tracks, cold drinks in hand, and the Texas sun keeping the vibes perfect. Then you anchor in a secluded cove for swimming, floating on giant lily pads, and creating memories that'll last a lifetime.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">Premier Party Cruises</Link> has been the leader in <strong>Lake Travis party barge</strong> experiences for over 15 years, hosting 150,000+ happy guests with a perfect safety record. From intimate groups to massive celebrations, we have the perfect <strong>Austin party barge</strong> for your <strong>bachelor party in Austin</strong>.
              </p>

              <BlogImageBreak
                src={bachelorHero}
                alt="Lake travis bachelor party boat cruise with guys celebrating on Austin party boat"
                caption="Your legendary Lake Travis bachelor party adventure starts here"
              />
            </m.div>
          </div>
        </section>

        {/* Why Lake Travis Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why Lake Travis is the Ultimate Bachelor Party Destination</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Just 30 minutes from downtown Austin, Lake Travis combines stunning natural beauty with world-class party boat experiences
              </p>
            </m.div>

            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyLakeTravis.map((item, index) => (
                <m.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </m.div>

            <div className="text-center mt-10">
              <Link href="/party-boat-lake-travis">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" data-testid="button-explore-lake-travis">
                  <Waves className="mr-2 h-5 w-5" />
                  Explore Lake Travis Party Boats
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ATX Disco Cruise Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Crown className="h-8 w-8 text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The ATX Disco Cruise: Bachelor Party Paradise</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> isn't just another <strong>party boat Austin</strong> experience – it's the ultimate <strong>austin bachelor party</strong> destination and the only co-ed party cruise in the entire United States where <strong>bachelor AND bachelorette groups party TOGETHER</strong> on the same <strong>lake travis bachelor party boat</strong>. This is what makes it legendary.
              </p>

              <div className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/20 dark:to-blue-900/20 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <Users className="h-5 w-5 text-blue-500" />
                  The Co-Ed Party Experience
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Picture this: your bachelor crew on one side of the boat, a bachelorette party on the other, and by the end of the cruise, you're all dancing together like old friends. The <strong>ATX Disco Cruise</strong> creates the ultimate social mixer atmosphere where groups mingle, dance, and celebrate together.
                </p>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  It's not uncommon for bachelor and bachelorette groups to team up for after-party bar crawls on <Link href="/blogs/austin-bachelor-party-ideas" className="text-blue-600 hover:underline">6th Street</Link> after the cruise!
                </p>
              </div>

              <BlogImageBreak
                src={discoParty}
                alt="Austin bachelor party boat experience on the ATX Disco Cruise Lake Travis"
                caption="Bachelor and bachelorette groups celebrating together on the famous ATX Disco Cruise"
              />

              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">What's Included on the ATX Disco Cruise</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {discoCruiseFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                The 4-hour <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> experience includes everything you need for an epic <strong>austin bachelor party</strong>: professional DJ spinning hits from 70s disco to today's bangers, a pro photographer capturing every legendary moment, giant 6x20 feet lily pad floats for swimming breaks, plus all the ice, cups, and water you need. All <strong>lake travis bachelor party boat</strong> cruises are BYOB-friendly – just bring your own beverages (no glass containers).
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold" data-testid="button-book-disco-main">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Book ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/pricing-breakdown">
                  <Button size="lg" variant="outline" data-testid="button-view-pricing">
                    <DollarSign className="mr-2 h-5 w-5" />
                    View Pricing Details
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* BYOB + Party On Delivery Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Beer className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">BYOB + Party On Delivery = Zero Stress</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                All <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">Premier Party Cruises</Link> boats are BYOB-friendly, which means huge savings on your <strong>austin bachelor party</strong>. When you book a <strong>lake travis bachelor party boat</strong>, here's the game-changer: <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Party On Delivery</a> takes all the hassle out of getting drinks.
              </p>

              <div className="bg-white dark:bg-gray-800 border-2 border-green-500 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://www.partyondelivery.com/favicon.ico" 
                    alt="Party On Delivery" 
                    className="w-8 h-8"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Why Party On Delivery is a Bachelor Party Must</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {partyOnDeliveryBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{benefit.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Party On Delivery</a> coordinates directly with the marina to have your coolers, beer, wine, spirits, and mixers waiting at the dock before your <strong>Austin party barge</strong> cruise begins. They'll even pre-stock your Airbnb or VRBO rental house, so cold drinks are waiting when you arrive in Austin.
                </p>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Their <strong>100% buyback policy</strong> means you can order generously without worry – they'll buy back any unopened items for a full refund. Plus, they offer <strong>free consultations</strong> to help you calculate exactly how much your group needs.
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Pro Tip: The Ultimate Bachelor Party Combo
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Book your <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link>, have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">Party On Delivery</a> stock your rental house AND deliver drinks to the marina, and you won't have to step foot in a grocery store the entire weekend. That's more time for actual partying!
                </p>
              </div>

              <div className="text-center">
                <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-party-on-delivery">
                    <Truck className="mr-2 h-5 w-5" />
                    Get Free Party On Delivery Consultation
                  </Button>
                </a>
              </div>
            </m.div>
          </div>
        </section>

        {/* Private Charter vs Disco Cruise */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Private Charter vs. ATX Disco Cruise: Which is Right for You?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-10">
                Both options deliver an incredible <strong>Lake Travis party barge</strong> experience – here's how to choose
              </p>

              <BlogImageBreak
                src={cleverGirl}
                alt="Bachelor party austin texas on the Clever Girl 50-person lake travis bachelor party boat"
                caption="The Clever Girl: Our flagship 50-person party boat for private charters"
              />

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {privateVsDisco.map((option, index) => (
                  <Card key={index} className={`h-full ${option.type === 'ATX Disco Cruise' ? 'ring-2 ring-yellow-500' : ''}`}>
                    {option.type === 'ATX Disco Cruise' && (
                      <div className="bg-yellow-500 text-black text-center py-2 text-sm font-bold">
                        MOST POPULAR FOR BACHELOR PARTIES
                      </div>
                    )}
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <option.icon className={`h-8 w-8 ${option.type === 'ATX Disco Cruise' ? 'text-yellow-500' : 'text-blue-600'}`} />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{option.type}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4" /> Pros
                        </h4>
                        <ul className="space-y-1">
                          {option.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-orange-600 mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" /> Considerations
                        </h4>
                        <ul className="space-y-1">
                          {option.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Best for:</strong> {option.bestFor}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold" data-testid="button-book-disco-compare">
                    Book ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/private-cruises">
                  <Button size="lg" variant="outline" data-testid="button-view-private-charters">
                    Explore Private Charters
                  </Button>
                </Link>
              </div>

              <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
                Not sure which option is best? <Link href="/contact" className="text-blue-600 hover:underline font-semibold">Contact our team</Link> or check our <Link href="/faq" className="text-blue-600 hover:underline font-semibold">FAQ page</Link> for more details.
              </p>
            </m.div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Tips for a Legendary Lake Travis Bachelor Party Boat Experience</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-10">
                Follow these insider tips to make your <strong>austin bachelor party</strong> on a <strong>lake travis bachelor party boat</strong> absolutely unforgettable
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {tipsForSuccess.map((tip, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <tip.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{tip.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-10">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <Wine className="h-6 w-6 text-purple-500" />
                  The Ultimate Bachelor Weekend Itinerary
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Friday Night</h4>
                      <p className="text-gray-600 dark:text-gray-400">Arrive in Austin, check into rental house (already stocked by <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Party On Delivery</a>), hit <Link href="/blogs/austin-bachelor-party-ideas" className="text-blue-600 hover:underline">6th Street or Rainey Street</Link> for a warm-up bar crawl</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Saturday</h4>
                      <p className="text-gray-600 dark:text-gray-400">Morning: Texas BBQ breakfast. Afternoon: <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline">ATX Disco Cruise</Link> on Lake Travis (drinks delivered to marina by <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Party On Delivery</a>). Evening: After-party downtown</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Sunday</h4>
                      <p className="text-gray-600 dark:text-gray-400">Recovery brunch, return unopened drinks to <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Party On Delivery</a> for full refund, head home with legendary memories</p>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Related Links Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">More Austin Bachelor Party Resources</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blogs/austin-bachelor-party-ideas" className="block">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" data-testid="link-bachelor-ideas">
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-blue-600 hover:underline">Austin Bachelor Party Ideas: Epic Guys' Weekend Guide</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Complete guide to planning the ultimate bachelor party in Austin</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/combined-bachelor-bachelorette-austin" className="block">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" data-testid="link-combined-party">
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-blue-600 hover:underline">Combined Bachelor-Bachelorette Parties in Austin</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Why more couples are celebrating together on Lake Travis</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/bachelorette-party-austin" className="block">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" data-testid="link-bachelorette">
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-blue-600 hover:underline">Bachelorette Party Austin Guide</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Planning a bachelorette? Check out our dedicated guide</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/gallery" className="block">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" data-testid="link-gallery">
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-blue-600 hover:underline">Photo Gallery</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">See real bachelor parties on our Lake Travis boats</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Lake Travis Bachelor Party?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Whether you choose the legendary <strong>ATX Disco Cruise</strong> or a private <strong>Austin party barge</strong> charter, your crew is in for an unforgettable celebration. Let's make it happen!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/book-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6" data-testid="button-book-now-cta">
                    <PartyPopper className="mr-2 h-5 w-5" />
                    Book Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-contact-cta">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  <span>150,000+ Happy Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>Perfect Safety Record</span>
                </div>
              </div>

              <p className="mt-8 text-white/70">
                Don't forget to use <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline font-semibold">Party On Delivery</a> for hassle-free drink delivery to the marina and your rental house!
              </p>
            </m.div>
          </div>
        </section>

      </div>
      </BlogV2Layout>
    </>
    </LazyMotionProvider>
  );
}

import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp, staggerContainer } from '@/components/LazyMotion';
import { Link } from 'wouter';
import SEOHead from '@/components/SEOHead';
import { 
  Ship, Users, PartyPopper, Sparkles, Crown, Music, 
  Anchor, Sun, Waves, Star, ArrowRight, Camera, 
  Heart, Trophy, Gift, Zap, Shirt, Palette, Glasses
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { BlogImageBreak, BlogPhotoStrip } from '@/components/BlogImageBreak';
import { DISCO_FUN_PHOTOS } from '@/lib/media';

import discoParty from '@assets/atx-disco-cruise-party.webp';
import dancingScene from '@assets/dancing-party-scene.webp';
import bachelorHero from '@assets/bachelor-party-group-guys.webp';
import partyAtmosphere1 from '@assets/party-atmosphere-1.webp';
import cleverGirl from '@assets/clever-girl-50-person-boat.webp';


const outfitThemes = [
  { 
    icon: Star, 
    title: 'Disco Cowboys', 
    tagline: 'Yeehaw meets Studio 54',
    description: 'Cowboy hats covered in glitter, sequin vests over denim, rhinestone boots, and bolo ties that sparkle under the disco lights.'
  },
  { 
    icon: Anchor, 
    title: 'Nautical Bros', 
    tagline: 'Captain and Crew',
    description: 'The groom rocks a full captain uniform while the crew sports sailor hats, striped shirts, and anchor accessories.'
  },
  { 
    icon: Music, 
    title: '70s Retro Kings', 
    tagline: 'Groovy baby, groovy',
    description: 'Bell bottoms, afro wigs, gold medallions, platform shoes, and open-collar polyester shirts. Peak disco energy.'
  },
  { 
    icon: Sparkles, 
    title: 'Wiggin\' Out', 
    tagline: 'Hair today, party tonight',
    description: 'Everyone rocks crazy wigs – mullets, afros, neon mohawks, long flowing locks. The wilder, the better.'
  },
  { 
    icon: Sun, 
    title: 'Hawaiian Bros', 
    tagline: 'Aloha means party',
    description: 'Hawaiian shirts, leis, flower crowns, grass skirts (optional), and flip flops. Tropical vibes on Lake Travis.'
  },
  { 
    icon: Shirt, 
    title: 'Team Uniform', 
    tagline: 'Squad goals activated',
    description: 'Custom matching tees, jerseys with the groom\'s name, or coordinated colors. Easy to spot your crew in the crowd.'
  }
];

export default function BachelorPartyOutfitIdeas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
    <>
      <SEOHead 
        pageRoute="/blogs/bachelor-party-outfit-ideas-atx-disco-cruise"
        defaultTitle="Best Bachelor Party Outfit Ideas for the ATX Disco Cruise | Premier Party Cruises"
        defaultDescription="Planning outfits for your Austin bachelor party on Lake Travis? Discover the best costume and theme ideas for the ATX Disco Cruise. From Disco Cowboys to Nautical Bros, dress up to stand out and break the ice with bachelorette groups!"
        defaultKeywords={['Austin bachelor party outfits', 'ATX Disco Cruise costumes', 'Lake Travis party boat outfits', 'bachelor party in Austin themes', 'party boat Austin costume ideas', 'bachelor party costume themes', 'disco cruise outfit ideas']}
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
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${discoParty})` }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-yellow-500 text-black font-bold" data-testid="badge-outfit-guide">
              DRESS TO IMPRESS GUIDE
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Best Bachelor Party Outfit Ideas<br />for the ATX Disco Cruise
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Planning an <strong>Austin bachelor party</strong>? The guys who commit to a theme always have the most fun on the <Link href="/atx-disco-cruise" className="underline hover:text-yellow-300">ATX Disco Cruise</Link>. Here's how to stand out and break the ice with other groups!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atx-disco-cruise">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6" data-testid="button-book-disco-cruise">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Book ATX Disco Cruise
                </Button>
              </Link>
              <Link href="/bachelor-party-austin">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6" data-testid="button-view-packages">
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
              <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Why Costumes Matter for Your Austin Bachelor Party on Lake Travis</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Listen up, best men and groomsmen – here's the secret sauce to an unforgettable <strong>bachelor party in Austin</strong>: GO ALL IN on a theme. The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> isn't your typical <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">party boat in Austin</Link>. It's a floating nightclub where bachelor AND <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette parties</Link> mix and mingle together.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                And you know what's the ultimate icebreaker on a <strong>lake travis bachelor party boat</strong>? A crew of guys in matching Disco Cowboy outfits or 70s bell bottoms strutting onto that boat. The bachelorette groups LOVE it. They'll want photos with you. Conversations start naturally. Friendships form at your <strong>austin bachelor party</strong>. Maybe even some after-party plans get made.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                <strong>Pro tip:</strong> Let <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> handle all your drinks, mixers, and party supplies – they'll deliver everything right to the marina so you can focus on looking fabulous and having fun!
              </p>

              <BlogImageBreak
                src={bachelorHero}
                alt="Austin bachelor party boat group in matching outfits ready for Lake Travis party cruise"
                caption="Groups that commit to themes become legends on the ATX Disco Cruise"
              />
            </m.div>
          </div>
        </section>

        {/* Theme 1: Disco Cowboys */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Theme #1: Disco Cowboys</h2>
              </div>
              <Badge className="mb-4 bg-yellow-500/20 text-yellow-800 dark:text-yellow-300">Yeehaw meets Studio 54</Badge>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                This one's PERFECT for an <strong>Austin bachelor party</strong> – because what's more Texas than cowboys, and what's more disco cruise than glitter? Mash them together and you've got the ultimate <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis party boat</Link> look.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">The Disco Cowboy Checklist:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" /> Cowboy hats covered in glitter or sequins</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" /> Rhinestone or bedazzled vests over tank tops</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" /> Fringe jackets (silver or gold)</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" /> Metallic bolo ties</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" /> Cowboy boots (bonus points for sparkle)</li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                <strong>Party tip:</strong> Coordinate with <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> to have custom koozies with "Disco Cowboy Crew" printed on them delivered with your drinks. The bachelorette girls will be stealing them as souvenirs!
              </p>
            </m.div>
          </div>
        </section>

        {/* Theme 2: Nautical Bros */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Anchor className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Theme #2: Nautical Bros (Captain & Crew)</h2>
              </div>
              <Badge className="mb-4 bg-blue-500/20 text-blue-800 dark:text-blue-300">The Groom is Captain</Badge>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                You're on a boat, so why not look the part? The Nautical Bros theme is classic, easy to pull off, and absolutely hilarious on the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link>. The groom rocks a full captain's uniform (the more ridiculous, the better), while the crew sports sailor gear.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">The Captain & Crew Kit:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2 text-blue-800 dark:text-blue-300">For the Groom (Captain):</h5>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• Captain's hat (gold embroidery = chef's kiss)</li>
                      <li>• White blazer with gold buttons</li>
                      <li>• Aviator sunglasses</li>
                      <li>• Fake captain's badge</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2 text-blue-800 dark:text-blue-300">For the Crew:</h5>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• White sailor caps</li>
                      <li>• Blue and white striped shirts</li>
                      <li>• Anchor temporary tattoos</li>
                      <li>• Rope bracelets</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Order your sailor gear online and have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> handle the drinks so you can focus on perfecting your salutes. When you board that <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">party boat in Austin</Link>, the whole lake will know your crew has arrived!
              </p>

              <BlogImageBreak
                src={cleverGirl}
                alt="Lake travis bachelor party boat perfect for nautical themed bachelor party Austin Texas"
                caption="Set sail on the ultimate Lake Travis party boat adventure"
              />
            </m.div>
          </div>
        </section>

        {/* Theme 3: 70s Retro Kings */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Music className="h-8 w-8 text-orange-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Theme #3: 70s Retro Kings</h2>
              </div>
              <Badge className="mb-4 bg-orange-500/20 text-orange-800 dark:text-orange-300">Groovy baby, groovy</Badge>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> literally has a DJ spinning disco bangers all day. So why not dress the part? The 70s Retro Kings theme is PEAK disco energy and will have you feeling like you stepped straight out of Saturday Night Fever.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">The Groovy Essentials:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-orange-500" /> Bell bottom pants (the wider, the better)</li>
                  <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-orange-500" /> Afro wigs in various colors</li>
                  <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-orange-500" /> Gold medallions on chains</li>
                  <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-orange-500" /> Platform shoes or chunky sneakers</li>
                  <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-orange-500" /> Open-collar polyester shirts</li>
                  <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-orange-500" /> Oversized sunglasses with tinted lenses</li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                This is the theme that gets you on the dance floor IMMEDIATELY. When the DJ drops "Stayin' Alive" and your crew hits the floor in full 70s regalia, the <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette parties</Link> will be lining up to dance with you. Trust us, we've seen it happen countless times on the <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis party boat</Link>! Complete the vibe by having <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> bring retro-inspired cocktail mixers to your pre-cruise party.
              </p>
            </m.div>
          </div>
        </section>

        {/* Theme 4: Wiggin' Out */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Palette className="h-8 w-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Theme #4: Wiggin' Out</h2>
              </div>
              <Badge className="mb-4 bg-purple-500/20 text-purple-800 dark:text-purple-300">Hair today, party tonight</Badge>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Sometimes the simplest themes hit the hardest. The "Wiggin' Out" theme requires just one thing: EVERYONE wears a crazy wig. That's it. No coordination needed beyond that. The variety is what makes it hilarious – and <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> can ensure your drinks and party supplies are ready while you focus on your new hairdos!
              </p>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Wig Ideas for the Squad:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700 dark:text-gray-300">
                  <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center">Mullets</span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center">Rainbow Afros</span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center">Neon Mohawks</span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center">Long Rapunzel</span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center">Elvis Pompadour</span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center">Surfer Dude Blonde</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                <strong>Best man pro tip:</strong> Buy a bulk pack of wigs online and distribute them at the Airbnb. Have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> stock the fridge with drinks and mixers so everyone can pregame while trying on their new hair. The group photos will be ICONIC before you even board the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link>!
              </p>

              <BlogImageBreak
                src={dancingScene}
                alt="Austin bachelor party guests dancing on lake travis bachelor party boat disco cruise"
                caption="The dance floor is where themed outfits really shine"
              />
            </m.div>
          </div>
        </section>

        {/* Theme 5: Hawaiian Bros */}
        <section className="py-16 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Sun className="h-8 w-8 text-teal-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Theme #5: Hawaiian Bros</h2>
              </div>
              <Badge className="mb-4 bg-teal-500/20 text-teal-800 dark:text-teal-300">Aloha means party</Badge>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                You're on <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis</Link> in the Texas sun – what better vibe than tropical paradise? The Hawaiian Bros theme is comfortable, colorful, and instantly recognizable. Plus, those Hawaiian shirts actually breathe in the heat!
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">The Aloha Kit:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2"><Sun className="h-4 w-4 text-teal-500" /> Bright Hawaiian shirts (the louder, the better)</li>
                  <li className="flex items-center gap-2"><Sun className="h-4 w-4 text-teal-500" /> Flower leis for everyone</li>
                  <li className="flex items-center gap-2"><Sun className="h-4 w-4 text-teal-500" /> Straw hats or flower crowns</li>
                  <li className="flex items-center gap-2"><Sun className="h-4 w-4 text-teal-500" /> Flip flops (easy for jumping in the lake!)</li>
                  <li className="flex items-center gap-2"><Sun className="h-4 w-4 text-teal-500" /> Grass skirts (optional but hilarious)</li>
                  <li className="flex items-center gap-2"><Sun className="h-4 w-4 text-teal-500" /> Coconut cups for your drinks</li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                This theme pairs perfectly with tropical drinks! Have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> deliver rum, pineapple juice, and all the Mai Tai mixers to the marina. When you break out the coconut cups filled with tropical cocktails, the vibe will be IMMACULATE. Check out our <Link href="/pricing-breakdown" className="text-blue-600 hover:underline font-semibold">pricing breakdown</Link> to plan your perfect cruise!
              </p>
            </m.div>
          </div>
        </section>

        {/* Theme 6: Team Uniform */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Shirt className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Theme #6: Team Uniform</h2>
              </div>
              <Badge className="mb-4 bg-green-500/20 text-green-800 dark:text-green-300">Squad goals activated</Badge>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                If your crew isn't into full costumes, the Team Uniform theme is the perfect compromise. Custom matching tees, jerseys, or even just coordinated colors make you instantly recognizable as a unit on the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link>.
              </p>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Team Uniform Ideas:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-green-500" /> Custom tees with the groom's face printed on them</li>
                  <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-green-500" /> Matching jerseys with "GROOM'S CREW" and numbers</li>
                  <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-green-500" /> Same color tank tops with individual nicknames</li>
                  <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-green-500" /> Coordinated sunglasses and hats</li>
                  <li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-green-500" /> Matching swim trunks for lake time</li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Order custom tees online with a funny quote or inside joke about the groom. When you roll up to that <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">party boat Austin</Link> style, everyone will know your squad means business. <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> can even deliver matching koozies with your custom design!
              </p>
            </m.div>
          </div>
        </section>

        {/* Theme 7: Groom in Costume */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Crown className="h-8 w-8 text-pink-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Theme #7: Funny "Groom in Costume" + Group in Theme</h2>
              </div>
              <Badge className="mb-4 bg-pink-500/20 text-pink-800 dark:text-pink-300">The groom gets roasted</Badge>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                This classic <strong>bachelor party in Austin</strong> move never fails: put the groom in something RIDICULOUS while the rest of the group stays relatively normal (but coordinated). It's a guaranteed way to embarrass him lovingly and create legendary photos on the <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis party boat</Link>.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Groom Costume Ideas:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-pink-500" /> Inflatable sumo wrestler suit</li>
                    <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-pink-500" /> Full banana costume</li>
                    <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-pink-500" /> T-Rex inflatable costume</li>
                    <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-pink-500" /> Unicorn onesie</li>
                  </ul>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-pink-500" /> Bride dress (the ultimate gag)</li>
                    <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-pink-500" /> Superhero cape and underwear</li>
                    <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-pink-500" /> "Ball and Chain" costume</li>
                    <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-pink-500" /> Giant baby costume</li>
                  </ul>
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                While the groom suffers in his ridiculous outfit, the groomsmen wear matching "Groom's Crew" tees. The <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette groups</Link> on the cruise will be DYING to take photos. The professional photographer on the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> will capture every hilarious moment. Check our <Link href="/gallery" className="text-blue-600 hover:underline font-semibold">gallery</Link> for proof!
              </p>

              <BlogImageBreak
                src={partyAtmosphere1}
                alt="Bachelor party Austin Texas groups mixing with bachelorettes on lake travis bachelor party boat"
                caption="Costumes are the ultimate conversation starters between groups"
              />
            </m.div>
          </div>
        </section>

        {/* Bonus Props & Extras */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Bonus Props & Extras That Level Up Any Theme</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Whatever theme you choose for your <strong>Austin bachelor party</strong>, these bonus props take things to the next level. They're cheap, easy to pack, and create amazing photo opportunities on the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link>.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                      <Camera className="h-5 w-5 text-blue-500" /> Props Box
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Inflatable microphones</li>
                      <li>• Oversized sunglasses</li>
                      <li>• Glow sticks & necklaces</li>
                      <li>• Fake mustaches</li>
                      <li>• Party blowers</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                      <Glasses className="h-5 w-5 text-purple-500" /> Temporary Tattoos
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Custom groom's face tattoos</li>
                      <li>• "GROOM SQUAD" arm bands</li>
                      <li>• Mustache finger tattoos</li>
                      <li>• Anchor/nautical designs</li>
                      <li>• Funny sayings</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                      <Gift className="h-5 w-5 text-green-500" /> Practical Swag
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Custom koozies</li>
                      <li>• Matching fanny packs</li>
                      <li>• Themed sunglasses</li>
                      <li>• Waterproof phone pouches</li>
                      <li>• Matching floaties</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl mb-6">
                <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
                  Let Party On Delivery Handle the Logistics
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> doesn't just deliver alcohol – they can stock your Airbnb with mixers, ice, snacks, cups, and party supplies too. Order your custom koozies and have them delivered with all your drinks. That way you can spend your time perfecting your outfits instead of running errands!
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* The Social Advantage Section */}
        <section className="py-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-purple-600" />
                <Heart className="h-8 w-8 text-pink-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The Social Advantage: Why Themes Break the Ice on Your Lake Travis Bachelor Party Boat</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Here's the thing about the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> that makes it the ultimate <strong>Austin bachelor party</strong> experience: you're NOT alone on the boat. Bachelor parties, <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette parties</Link>, birthday groups, and friend crews all cruise together on this <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis party boat</Link>.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Why Costumes = Instant Connections:</h4>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <Camera className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                    <span><strong>Photo requests:</strong> Bachelorette groups WILL ask to take photos with the Disco Cowboys or the Captain & Crew. It's a guaranteed conversation starter.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <span><strong>Dance floor magnetism:</strong> Themed groups attract attention when they hit the floor together. Other groups want to join the fun!</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>After-party connections:</strong> We've literally seen bachelor and bachelorette groups exchange info and meet up downtown later. Costumes made it happen.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <span><strong>Memorable moments:</strong> The professional photographer will find YOU first because you stand out. Your photos will be legendary.</span>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                The groups that show up in basic shorts and t-shirts? They blend in. The groups that COMMIT to a theme? They become the stars of the cruise. Which one do you want your <strong>austin bachelor party</strong> on the <strong>lake travis bachelor party boat</strong> to be?
              </p>
            </m.div>
          </div>
        </section>

        {/* Final Thoughts */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <PartyPopper className="h-8 w-8 text-yellow-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Final Thoughts: Dress Up to Get Down</h2>
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Planning your <strong>austin bachelor party</strong>? The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> is already the best <strong>lake travis bachelor party boat</strong> experience – but YOUR crew can make it even better by committing to a theme. Whether you go full Disco Cowboy, embrace the 70s Retro Kings lifestyle, or keep it simple with matching team uniforms, the effort WILL pay off.
              </p>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl mb-8">
                <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">Your Bachelor Party Checklist:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-600" /> <strong>Step 1:</strong> Book your <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> spots</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-600" /> <strong>Step 2:</strong> Pick a theme from this guide and commit</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-600" /> <strong>Step 3:</strong> Order costumes/accessories online</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-600" /> <strong>Step 4:</strong> Have <a href="https://www.partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Party On Delivery</a> stock your drinks</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-600" /> <strong>Step 5:</strong> Show up, stand out, party hard</li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Have questions about the cruise? Check out our <Link href="/faq" className="text-blue-600 hover:underline font-semibold">FAQ page</Link> or <Link href="/contact" className="text-blue-600 hover:underline font-semibold">contact us</Link> directly. For <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">private charter options</Link>, we've got you covered too. Now stop reading and start planning – your legendary <strong>austin bachelor party</strong> on the <strong>lake travis bachelor party boat</strong> awaits!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/atx-disco-cruise">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6" data-testid="button-book-cruise-final">
                    <Ship className="mr-2 h-5 w-5" />
                    Book the ATX Disco Cruise
                  </Button>
                </Link>
                <Link href="/book-now">
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-6" data-testid="button-book-now">
                    Book Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* Theme Overview Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Quick Theme Reference Guide</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Pick your theme and make your <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline">Austin bachelor party</Link> unforgettable
              </p>
            </m.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outfitThemes.map((theme, index) => (
                <m.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow" data-testid={`theme-card-${index}`}>
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 mb-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center">
                        <theme.icon className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{theme.title}</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-400 mb-2 italic">{theme.tagline}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{theme.description}</p>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
    </LazyMotionProvider>
  );
}

import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, Sun, CheckCircle2, Users, Music, Ship, MapPin, Utensils, ThermometerSun, PartyPopper, Star, ChevronRight, Leaf, DollarSign, Backpack } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-1_1760080740012.jpg';
import sectionImage1 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import sectionImage2 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import sectionImage3 from '@assets/@capitalcityshots-4_1760080740017.jpg';

export default function AustinBachelorPartySeptember() {
  return (
    <div data-page-ready="austin-bachelor-party-september" className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Why Austin is Perfect for Bachelor Parties in September | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Plan a September Austin bachelor party: 71°F-91°F weather, Labor Day vibe, Lake Travis boats & complete guide. Rain or shine, great deals and perfect conditions!" 
        />
        <meta 
          name="keywords" 
          content="September bachelor party Austin, Austin bachelor party, Lake Travis party boat, Labor Day bachelor party, Austin nightlife September" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelor-party-september" />
        
        <meta property="og:title" content="Why Austin is Perfect for Bachelor Parties in September" />
        <meta property="og:description" content="Plan a September Austin bachelor party with Lake Travis boats, Labor Day energy, and perfect fall weather." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/austin-bachelor-party-september" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-1_1760080740012.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why Austin is Perfect for Bachelor Parties in September",
            "description": "Plan a September Austin bachelor party: 71°F-91°F weather, Labor Day vibe, Lake Travis boats & complete guide. Rain or shine!",
            "image": "https://premierpartycruises.com/attached_assets/@capitalcityshots-1_1760080740012.jpg",
            "author": {
              "@type": "Organization",
              "name": "Premier Party Cruises",
              "url": "https://premierpartycruises.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Premier Party Cruises",
              "url": "https://premierpartycruises.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://premierpartycruises.com/media/schema/ppc-logo.png"
              }
            },
            "datePublished": "2024-09-01",
            "dateModified": "2025-12-09",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/austin-bachelor-party-september"
            }
          })}
        </script>
      </Helmet>

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Leaf className="h-4 w-4 text-brand-yellow" />
              <span className="text-sm font-semibold">September Bachelor Party Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Austin is Perfect for<br />
              <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                Bachelor Parties in September
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
              Labor Day energy, ideal weather, and shoulder season deals.<br />
              Your ultimate September bachelor party guide!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                  data-testid="button-hero-get-quote"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Get Your Quote
                </Button>
              </Link>
              <a href="tel:5124885892">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                  data-testid="button-hero-call"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  (512) 488-5892
                </Button>
              </a>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-yellow" />
                <span>Hundreds of Happy Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-brand-yellow fill-brand-yellow" />
                <span>4.9★ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-brand-yellow" />
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <ThermometerSun className="h-8 w-8 text-orange-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Austin Weather in September</h2>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-black text-orange-600">71°F-91°F</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Temp</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-amber-600">3.5"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rainfall</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  September offers ideal conditions for your austin bachelor party on Lake Travis party boats. The summer heat starts to break, creating comfortable temperatures perfect for a bachelor party austin texas adventure. Water temperatures remain warm and inviting for the ultimate lake travis bachelor party boat experience.
                </p>
                <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <p className="font-bold text-green-800 dark:text-green-300 mb-2">Perfect Weather, Any Weather!</p>
                  <p className="text-green-700 dark:text-green-400 text-sm">
                    Our boats are fully weather-ready with wind curtains and rain curtains for any conditions. Cooler evening? We have blankets and propane heaters. Your party goes on rain or shine!
                  </p>
                </div>
              </div>
              <div className="relative">
                <LazyImage 
                  src={heroImage} 
                  alt="Austin bachelor party boat cruise on Lake Travis in September with Labor Day celebrations" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
                <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  Perfect Lake Weather!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <PartyPopper className="h-8 w-8 text-orange-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">September Events & Festivals</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-orange-200 dark:border-orange-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                      <Star className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Labor Day Weekend</h3>
                      <p className="text-gray-600 dark:text-gray-400">Kick off September with the biggest party weekend of the fall. Lake Travis is packed with celebration energy!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-orange-200 dark:border-orange-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                      <Music className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">ACL Festival Prep</h3>
                      <p className="text-gray-600 dark:text-gray-400">The city buzzes with anticipation for Austin City Limits. Pre-festival energy fills every bar and venue.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-orange-200 dark:border-orange-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                      <Users className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">UT Football Kickoff</h3>
                      <p className="text-gray-600 dark:text-gray-400">Longhorn football season brings electric game-day energy to Austin. Hook 'em horns!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-orange-200 dark:border-orange-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                      <Sun className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Shoulder Season Perks</h3>
                      <p className="text-gray-600 dark:text-gray-400">After Labor Day, enjoy excellent availability and better rates while weather stays perfect.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Party Boat Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <LazyImage 
                  src={sectionImage1} 
                  alt="Lake Travis bachelor party boat rental with group celebrating bachelor party austin texas" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <Ship className="h-8 w-8 text-blue-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Lake Travis Party Boats</h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  September offers excellent availability for a lake travis bachelor party boat at off-season rates. Book 3-4 weeks in advance for best selection. Our austin bachelor party boats accommodate 14-75 guests with captain, crew, premium sound system, and water activities. Experience the perfect austin bachelor party this fall!
                </p>
                <ul className="space-y-3">
                  {[
                    'BYOB - bring your own drinks via Party On Delivery',
                    'Professional captain and crew included',
                    'Bluetooth sound system for your playlist',
                    'Swimming and water activities',
                    'Perfect lake conditions in September'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nightlife Section */}
      <section className="py-16 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Music className="h-12 w-12 mx-auto text-purple-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Austin Nightlife in September</h2>
              <p className="text-xl text-purple-200">6th Street and Rainey Street are legendary. Here's where to celebrate.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Kung Fu Saloon', type: 'Games & Drinks', desc: 'Arcade games, skeeball, and cold drinks' },
                { name: 'Rain on 4th', type: 'Nightclub', desc: 'Dancing, bottle service, VIP areas' },
                { name: 'Rainey Street Bars', type: 'Bar District', desc: 'Bungalow bars with backyards and craft cocktails' },
                { name: 'Midnight Cowboy', type: 'Speakeasy', desc: 'Upscale cocktails, reservation required' },
                { name: 'Craft Pride', type: 'Beer Bar', desc: 'Texas craft beers and whiskey' },
                { name: 'Electric Jellyfish', type: 'Rooftop', desc: 'Downtown views and tropical vibes' }
              ].map((venue, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-purple-500/30 hover:bg-white/20 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-white mb-1">{venue.name}</h3>
                    <p className="text-purple-300 text-sm mb-2">{venue.type}</p>
                    <p className="text-purple-100 text-sm">{venue.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <DollarSign className="h-8 w-8 text-green-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">September Pricing & Deals</h2>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                <strong>Shoulder season rates.</strong> Expect $600-900/person for a great austin bachelor party experience. Excellent availability for lake travis bachelor party boat adventures!
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Ship className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$120-180</p>
                  <p className="text-gray-600 dark:text-gray-400">per person for boat</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <MapPin className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Great Deals</p>
                  <p className="text-gray-600 dark:text-gray-400">on accommodations</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Utensils className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Happy Hours</p>
                  <p className="text-gray-600 dark:text-gray-400">restaurant specials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Pack Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Backpack className="h-8 w-8 text-orange-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">What to Pack</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    'Light, breathable clothing for warm weather',
                    'Sunscreen and sunglasses (Texas sun is strong!)',
                    'Swimwear for Lake Travis boat cruise',
                    'Casual comfortable shoes for bar hopping',
                    'Hat for sun protection on the lake'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <LazyImage 
                  src={sectionImage2} 
                  alt="Bachelor party austin texas group enjoying lake travis bachelor party boat experience" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Itinerary Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Calendar className="h-12 w-12 mx-auto text-orange-500 mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Sample September Weekend</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">The perfect bachelor party itinerary</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-orange-200 dark:border-orange-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-orange-600 mb-4">SATURDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-600">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Breakfast tacos at Veracruz or Juan in a Million</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-600">1pm</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">Lake Travis Party Boat Cruise (3-4 hours)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-600">5pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Return to hotel to refresh</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-600">7pm</span>
                      <span className="text-gray-700 dark:text-gray-300">BBQ feast at Franklin or Terry Black's</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-600">9pm</span>
                      <span className="text-gray-700 dark:text-gray-300">6th Street bar crawl starting at Kung Fu Saloon</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-amber-200 dark:border-amber-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-amber-600 mb-4">SUNDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-sm font-bold text-amber-600">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Recovery brunch at Kerbey Lane</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-sm font-bold text-amber-600">1pm</span>
                      <span className="text-gray-700 dark:text-gray-300">TopGolf or brewery tour</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-sm font-bold text-amber-600">4pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Farewell drinks and departure</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-amber-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Star className="h-12 w-12 mx-auto text-yellow-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Pro Tips for September Bachelor Parties</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Book Lake Travis boats and accommodations 3-4 weeks in advance',
                'Flexible timing works great - weather is consistently good',
                'Make BBQ and steakhouse reservations ahead of time',
                'Take advantage of Labor Day weekend energy early in the month',
                'Check UT football schedule for game day bar crawl energy',
                'Consider mid-week boats for best rates after Labor Day'
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <ChevronRight className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-1" />
                  <span className="text-lg">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <LazyImage 
              src={sectionImage3} 
              alt="Austin bachelor party celebration on lake travis bachelor party boat Labor Day" 
              className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8"
              aspectRatio="21/9"
            />
            
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              Book Your September Bachelor Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              September is perfect for bachelor parties in Austin. Labor Day energy, great weather, and epic celebrations await. Reserve your Lake Travis party boat and create memories that will last forever!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
                  data-testid="button-final-cta"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Get Your Free Quote
                </Button>
              </Link>
              <a href="tel:5124885892">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold text-lg px-10 py-7"
                  data-testid="button-final-call"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  (512) 488-5892
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

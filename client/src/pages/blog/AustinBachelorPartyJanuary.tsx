import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, Sun, CheckCircle2, Users, Music, Ship, MapPin, Utensils, ThermometerSun, PartyPopper, Star, ChevronRight, Snowflake, DollarSign, Backpack } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-5_1760080740018.jpg';
import sectionImage1 from '@assets/@capitalcityshots-6_1760080740018.jpg';
import sectionImage2 from '@assets/@capitalcityshots-7_1760080740018.jpg';
import sectionImage3 from '@assets/@capitalcityshots-8_1760080740018.jpg';

export default function AustinBachelorPartyJanuary() {
  return (
    <div data-page-ready="austin-bachelor-party-january" className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Why Austin is Perfect for Bachelor Parties in January | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Plan a January Austin bachelor party: 43°F-59°F weather, off-season deals, Lake Travis boats & complete guide. Rain or shine, 30-40% cheaper rates and fewer crowds!" 
        />
        <meta 
          name="keywords" 
          content="January bachelor party Austin, Austin bachelor party, Lake Travis party boat, winter bachelor party, Austin nightlife January, off-season bachelor party" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelor-party-january" />
        
        <meta property="og:title" content="Why Austin is Perfect for Bachelor Parties in January" />
        <meta property="og:description" content="Plan a January Austin bachelor party with Lake Travis boats, off-season deals, and great winter weather." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/austin-bachelor-party-january" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-5_1760080740018.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why Austin is Perfect for Bachelor Parties in January",
            "description": "Plan a January Austin bachelor party: 43°F-59°F weather, off-season deals, Lake Travis boats & complete guide. Rain or shine!",
            "image": "https://premierpartycruises.com/attached_assets/@capitalcityshots-5_1760080740018.jpg",
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
            "datePublished": "2024-01-01",
            "dateModified": "2025-12-09",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/austin-bachelor-party-january"
            }
          })}
        </script>
      </Helmet>

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-slate-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Snowflake className="h-4 w-4 text-cyan-300" />
              <span className="text-sm font-semibold">January Bachelor Party Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Austin is Perfect for<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                Bachelor Parties in January
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Off-season value, fewer crowds, and amazing deals.<br />
              Your ultimate January bachelor party guide!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-cyan-400/50 transition-all hover:scale-105"
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
                <Users className="h-5 w-5 text-cyan-300" />
                <span>125,000+ Happy Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-cyan-300 fill-cyan-300" />
                <span>4.9★ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-cyan-300" />
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
                  <ThermometerSun className="h-8 w-8 text-blue-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Austin Weather in January</h2>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-900/30 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-black text-blue-600">43°F-59°F</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Temp</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-slate-600">2"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rainfall</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  January in Austin offers mild winter weather perfect for outdoor activities. Midday temperatures often reach the 60s, making afternoon lake cruises comfortable and enjoyable. The low rainfall means more sunny days for your bachelor party adventures.
                </p>
                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="font-bold text-blue-800 dark:text-blue-300 mb-2">We're Weather-Ready!</p>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    Our boats come equipped with cozy blankets, propane heaters, and even a fire pit on select vessels. Plus wind curtains and rain curtains mean your party goes on rain or shine!
                  </p>
                </div>
              </div>
              <div className="relative">
                <LazyImage 
                  src={heroImage} 
                  alt="January bachelor party on Lake Travis" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  Best Off-Season Deals!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <PartyPopper className="h-8 w-8 text-blue-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">January Events & Festivals</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200 dark:border-blue-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                      <Star className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">New Year's Festivities</h3>
                      <p className="text-gray-600 dark:text-gray-400">Kick off January with lingering New Year's celebration energy. Austin bars and venues keep the party going!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-200 dark:border-blue-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                      <Users className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Austin Marathon</h3>
                      <p className="text-gray-600 dark:text-gray-400">The Austin Marathon brings athletic energy and festive crowds to the city in mid-January.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-200 dark:border-blue-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                      <Utensils className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Austin Restaurant Week</h3>
                      <p className="text-gray-600 dark:text-gray-400">Score amazing deals at Austin's best restaurants during Restaurant Week specials!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-200 dark:border-blue-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Off-Season Savings</h3>
                      <p className="text-gray-600 dark:text-gray-400">January is low season - enjoy 30-40% savings on boats, hotels, and activities!</p>
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
                  alt="Bachelor party boat on Lake Travis" 
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
                  January offers the best availability and lowest prices of the year. Book midday cruises (12-4pm) when temperatures are warmest. Our Austin bachelor party boats accommodate 14-75 guests with captain, crew, premium sound system, and water activities.
                </p>
                <ul className="space-y-3">
                  {[
                    'BYOB - bring your own drinks via Party On Delivery',
                    'Professional captain and crew included',
                    'Bluetooth sound system for your playlist',
                    'Midday cruises for warmest temperatures',
                    'Best rates of the year in January'
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
      <section className="py-16 bg-gradient-to-br from-slate-800 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Music className="h-12 w-12 mx-auto text-cyan-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Austin Nightlife in January</h2>
              <p className="text-xl text-blue-200">6th Street and Rainey Street are legendary. Here's where to celebrate.</p>
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
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-blue-500/30 hover:bg-white/20 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-white mb-1">{venue.name}</h3>
                    <p className="text-cyan-300 text-sm mb-2">{venue.type}</p>
                    <p className="text-blue-100 text-sm">{venue.desc}</p>
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
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">January Pricing & Deals</h2>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                <strong>LOW season rates - 30-40% cheaper!</strong> Expect $500-700/person for an amazing weekend experience.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Ship className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$90-140</p>
                  <p className="text-gray-600 dark:text-gray-400">per person for boat</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <MapPin className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">30-40% Off</p>
                  <p className="text-gray-600 dark:text-gray-400">on accommodations</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Utensils className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Restaurant Week</p>
                  <p className="text-gray-600 dark:text-gray-400">dining specials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Pack Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Backpack className="h-8 w-8 text-blue-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">What to Pack</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    'Layers - mornings are cool, afternoons warm up',
                    'Light jacket for evening bar hopping',
                    'Swimwear for midday lake cruises (sun warms up!)',
                    'Comfortable shoes for 6th Street adventures',
                    'Sunglasses - January sun is bright on the lake'
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
                  alt="Bachelor party group celebrating" 
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
              <Calendar className="h-12 w-12 mx-auto text-blue-500 mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Sample January Weekend</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">The perfect bachelor party itinerary</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-blue-200 dark:border-blue-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-blue-600 mb-4">SATURDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-bold text-blue-600">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Breakfast tacos at Veracruz or Juan in a Million</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-bold text-blue-600">12pm</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">Lake Travis Party Boat Cruise (12-4pm warmest!)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-bold text-blue-600">5pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Return to hotel to refresh</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-bold text-blue-600">7pm</span>
                      <span className="text-gray-700 dark:text-gray-300">BBQ feast at Franklin or Terry Black's</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-bold text-blue-600">9pm</span>
                      <span className="text-gray-700 dark:text-gray-300">6th Street bar crawl starting at Kung Fu Saloon</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-slate-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-slate-600 mb-4">SUNDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded text-sm font-bold text-slate-600">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Recovery brunch at Kerbey Lane</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded text-sm font-bold text-slate-600">1pm</span>
                      <span className="text-gray-700 dark:text-gray-300">TopGolf or brewery tour</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded text-sm font-bold text-slate-600">4pm</span>
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
      <section className="py-16 bg-gradient-to-br from-blue-600 to-slate-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Star className="h-12 w-12 mx-auto text-cyan-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Pro Tips for January Bachelor Parties</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Book midday cruises (12-4pm) for the warmest temperatures on the lake',
                'Take advantage of Restaurant Week deals at Austin\'s best spots',
                'Catch a UT basketball game for electric sports bar energy',
                'Book last-minute - January availability is excellent',
                'Layer up for morning activities, strip down for afternoon fun',
                'Hotels offer best rates of the year - upgrade your accommodations!'
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <ChevronRight className="h-5 w-5 text-cyan-300 flex-shrink-0 mt-1" />
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
              alt="Bachelor party celebration on Lake Travis" 
              className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8"
              aspectRatio="21/9"
            />
            
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              Book Your January Bachelor Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              January is the best value month for bachelor parties in Austin. Fewer crowds, amazing deals, and comfortable weather await. Reserve your Lake Travis party boat and save big while creating memories that will last forever!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
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
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-lg px-10 py-7"
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

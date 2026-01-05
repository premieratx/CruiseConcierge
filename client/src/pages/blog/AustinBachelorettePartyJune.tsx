import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, Sun, CheckCircle2, Users, Music, Ship, MapPin, Utensils, ThermometerSun, PartyPopper, Star, ChevronRight, Sparkles, DollarSign, Backpack } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-10_1760073205050.jpg';
import sectionImage1 from '@assets/@capitalcityshots-11_1760073205050.jpg';
import sectionImage2 from '@assets/@capitalcityshots-13_1760073115406.jpg';
import sectionImage3 from '@assets/@capitalcityshots-14_1760073205050.jpg';

export default function AustinBachelorettePartyJune() {
  return (
    <div data-page-ready="austin-bachelorette-party-june" className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Why Austin is Perfect for Bachelorette Parties in June | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Plan a June Austin bachelorette party: 74°F-93°F weather, pool parties, pride month, Lake Travis boats & complete guide. Rain or shine, peak summer celebration awaits!" 
        />
        <meta 
          name="keywords" 
          content="June bachelorette party Austin, Austin bachelorette party, Lake Travis party boat, summer bachelorette Austin, Austin girls trip June" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelorette-party-june" />
        
        <meta property="og:title" content="Why Austin is Perfect for Bachelorette Parties in June" />
        <meta property="og:description" content="Plan a June Austin bachelorette party with Lake Travis boats, pool parties, and peak summer vibes." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/austin-bachelorette-party-june" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-10_1760073205050.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why Austin is Perfect for Bachelorette Parties in June",
            "description": "Plan a June Austin bachelorette party: 74°F-93°F weather, pool parties, pride month, Lake Travis boats & complete guide. Rain or shine!",
            "image": "https://premierpartycruises.com/attached_assets/@capitalcityshots-10_1760073205050.jpg",
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
            "datePublished": "2024-06-01",
            "dateModified": "2025-12-09",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/austin-bachelorette-party-june"
            }
          })}
        </script>
      </Helmet>

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-yellow-200" />
              <span className="text-sm font-semibold">June Bachelorette Party Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Austin is Perfect for<br />
              <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                Bachelorette Parties in June
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-pink-100 mb-8 leading-relaxed">
              Peak summer vibes, pool parties, and the longest days of the year.<br />
              Your ultimate June bachelorette party guide for the bride-to-be!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-yellow-50 text-pink-500 font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-white/50 transition-all hover:scale-105"
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
                <Users className="h-5 w-5 text-yellow-200" />
                <span>Hundreds of Happy Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-200 fill-yellow-200" />
                <span>4.9★ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-yellow-200" />
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
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Austin Weather in June</h2>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-pink-100 dark:from-yellow-900/30 dark:to-pink-900/30 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-black text-orange-600">74°F-93°F</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Temp</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-pink-600">3"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rainfall</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  June kicks off peak summer for your austin bachelorette party! Expect hot, sunny days perfect for pool parties and lake travis bachelorette party boat cruises. The longest days of the year mean more time to celebrate your bachelorette party austin texas style with your bride squad. Water temperatures are ideal for swimming and all water activities!
                </p>
                <div className="mt-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl p-4">
                  <p className="font-bold text-cyan-800 dark:text-cyan-300 mb-2">Beat the Heat on Lake Travis!</p>
                  <p className="text-cyan-700 dark:text-cyan-400 text-sm">
                    It's hot everywhere this time of year, but Lake Travis is one of the best places in the country to cool off! Jump in for a swim, enjoy the breeze on the water, and we have wind curtains for shade. Rain or shine, your party goes on!
                  </p>
                </div>
              </div>
              <div className="relative">
                <LazyImage 
                  src={heroImage} 
                  alt="Austin bachelorette party boat cruise on Lake Travis in June with bride squad enjoying summer sun" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
                <div className="absolute -bottom-4 -right-4 bg-pink-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  Peak Summer Vibes!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <PartyPopper className="h-8 w-8 text-pink-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">June Events & Celebrations</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                      <Sun className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Summer Solstice</h3>
                      <p className="text-gray-600 dark:text-gray-400">Celebrate the longest day of the year! Austin throws epic summer solstice parties and outdoor celebrations.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                      <Sparkles className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Pride Month Events</h3>
                      <p className="text-gray-600 dark:text-gray-400">Austin Pride brings incredible energy! Rainbow celebrations, parades, and parties all month long.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Pool Party Season</h3>
                      <p className="text-gray-600 dark:text-gray-400">June kicks off Austin's legendary pool party scene. Day clubs, rooftop pools, and endless summer vibes!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full">
                      <Music className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Live Music Season</h3>
                      <p className="text-gray-600 dark:text-gray-400">Outdoor concerts and live music venues are in full swing. The Live Music Capital lives up to its name!</p>
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
                  alt="Lake Travis bachelorette party boat rental with austin bachelorette party group enjoying summer cruise" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <Ship className="h-8 w-8 text-pink-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Lake Travis Party Boats</h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  June is peak season for your austin bachelorette party - book your lake travis bachelorette party boat 2-3 months in advance for best selection! Our bachelorette party austin texas boats accommodate 14-75 guests with captain, crew, premium sound system, and water activities. Perfect for the bride tribe!
                </p>
                <ul className="space-y-3">
                  {[
                    'BYOB - bring your own drinks via Party On Delivery',
                    'Professional captain and crew included',
                    'Bluetooth sound system for your bachelorette playlist',
                    'Swimming and water activities',
                    'Prime lake conditions with warm water temps'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0" />
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
      <section className="py-16 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Music className="h-12 w-12 mx-auto text-pink-200 mb-4" />
              <h2 className="text-3xl font-black mb-4">Austin Nightlife for Bachelorettes</h2>
              <p className="text-xl text-pink-100">The best spots for your girls' night out in Austin!</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Maggie Mae\'s Rooftop', type: 'Rooftop Bar', desc: 'Iconic 6th Street views, live music, VIP sections' },
                { name: 'The W Austin', type: 'Hotel Bar & Pool', desc: 'Chic cocktails, pool scene, celebrity vibes' },
                { name: 'Coconut Club', type: 'Tropical Lounge', desc: 'Tiki drinks, dancing, bachelorette-friendly' },
                { name: 'The Roosevelt Room', type: 'Speakeasy', desc: 'Craft cocktails, intimate ambiance, photo-worthy' },
                { name: 'Midnight Cowboy', type: 'Hidden Bar', desc: 'Reservation-only speakeasy, upscale experience' },
                { name: 'Rain on 4th', type: 'Dance Club', desc: 'Dancing all night, bottle service, bachelorette packages' }
              ].map((venue, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-pink-400/30 hover:bg-white/20 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-white mb-1">{venue.name}</h3>
                    <p className="text-pink-200 text-sm mb-2">{venue.type}</p>
                    <p className="text-pink-100 text-sm">{venue.desc}</p>
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
              <DollarSign className="h-8 w-8 text-pink-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">June Pricing - Peak Season</h2>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-yellow-50 dark:from-pink-900/20 dark:to-yellow-900/20 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                <strong>Peak summer rates.</strong> Expect $750-1000/person for an unforgettable bachelorette weekend.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Ship className="h-8 w-8 mx-auto text-pink-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$150-220</p>
                  <p className="text-gray-600 dark:text-gray-400">per person for boat</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <MapPin className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Peak Rates</p>
                  <p className="text-gray-600 dark:text-gray-400">book early for deals</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Utensils className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Brunch Scene</p>
                  <p className="text-gray-600 dark:text-gray-400">make reservations!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Pack Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Backpack className="h-8 w-8 text-pink-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">What to Pack</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    'Light sundresses and cute summer outfits',
                    'Lots of sunscreen - Texas sun is no joke!',
                    'Multiple swimsuits for pool parties and lake days',
                    'Comfortable sandals for walking and cute heels for nights out',
                    'Wide-brim hat for sun protection on the boat'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                      <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <LazyImage 
                  src={sectionImage2} 
                  alt="Bachelorette party austin texas group celebrating summer fun on lake travis bachelorette party boat" 
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
              <Calendar className="h-12 w-12 mx-auto text-pink-500 mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Sample June Bachelorette Weekend</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">The perfect itinerary for the bride-to-be!</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-pink-200 dark:border-pink-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-pink-600 mb-4">SATURDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">10am</span>
                      <span className="text-gray-700 dark:text-gray-300">Pool party brunch at The W or JW Marriott</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">12pm</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">Lake Travis Party Boat Cruise (3-4 hours)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">4pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Return to hotel for refresh and photos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">7pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Dinner at Uchi or June's All Day</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">10pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Rainey Street bar hopping or 6th Street dancing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-yellow-200 dark:border-yellow-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-yellow-600 mb-4">SUNDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-sm font-bold text-yellow-600">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Recovery brunch at Josephine House or Juliet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-sm font-bold text-yellow-600">1pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Spa day or South Congress shopping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-sm font-bold text-yellow-600">4pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Farewell mimosas and departure</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Star className="h-12 w-12 mx-auto text-yellow-100 mb-4" />
              <h2 className="text-3xl font-black mb-4">Pro Tips for June Bachelorettes</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Book Lake Travis boats and accommodations 2-3 months in advance',
                'Start lake activities early (noon) to beat the afternoon heat',
                'Pool party Saturdays are the best - plan around them!',
                'Make dinner and brunch reservations at least 2 weeks ahead',
                'Pack extra sunscreen and stay hydrated in the Texas heat',
                'Consider Friday boat cruises for slightly lower rates'
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <ChevronRight className="h-5 w-5 text-yellow-100 flex-shrink-0 mt-1" />
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
              alt="Austin bachelorette party boat celebration on Lake Travis with summer swimming and bride squad" 
              className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8"
              aspectRatio="21/9"
            />
            
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              Book Your June Bachelorette Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              June is the ultimate month for an austin bachelorette party celebration. Pool parties, peak summer vibes, and epic bachelorette party austin texas celebrations await the bride-to-be. Reserve your lake travis bachelorette party boat and make memories that will last forever!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
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
                  className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-bold text-lg px-10 py-7"
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

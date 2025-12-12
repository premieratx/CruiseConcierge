import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, Sun, CheckCircle2, Users, Music, Ship, MapPin, Utensils, ThermometerSun, PartyPopper, Star, ChevronRight, DollarSign, Backpack, Waves } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-13_1760080740020.jpg';
import sectionImage1 from '@assets/@capitalcityshots-14_1760080740020.jpg';
import sectionImage2 from '@assets/@capitalcityshots-15_1760080740020.jpg';
import sectionImage3 from '@assets/@capitalcityshots-16_1760080740020.jpg';

export default function AustinBachelorPartyMay() {
  return (
    <div data-page-ready="austin-bachelor-party-may" className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Why Austin is Perfect for Bachelor Parties in May | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Plan a May Austin bachelor party: 70°F-87°F weather, Memorial Day energy, Lake Travis boats & complete guide. Rain or shine, summer kickoff and pool party season!" 
        />
        <meta 
          name="keywords" 
          content="May bachelor party Austin, Austin bachelor party, Lake Travis party boat, Memorial Day bachelor party, Austin pool parties May" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelor-party-may" />
        
        <meta property="og:title" content="Why Austin is Perfect for Bachelor Parties in May" />
        <meta property="og:description" content="Plan a May Austin bachelor party with Lake Travis boats, Memorial Day energy, and perfect summer kickoff weather." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/austin-bachelor-party-may" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-13_1760080740020.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why Austin is Perfect for Bachelor Parties in May",
            "description": "Plan a May Austin bachelor party: 70°F-87°F weather, Memorial Day vibe, Lake Travis boats & complete guide. Rain or shine!",
            "image": "https://premierpartycruises.com/attached_assets/@capitalcityshots-13_1760080740020.jpg",
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
            "datePublished": "2024-05-01",
            "dateModified": "2025-12-09",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/austin-bachelor-party-may"
            }
          })}
        </script>
      </Helmet>

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sun className="h-4 w-4 text-brand-yellow" />
              <span className="text-sm font-semibold">May Bachelor Party Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Austin is Perfect for<br />
              <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                Bachelor Parties in May
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-yellow-100 mb-8 leading-relaxed">
              Memorial Day energy, pool party season, and summer kickoff.<br />
              Your ultimate May bachelor party guide!
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
                  <ThermometerSun className="h-8 w-8 text-yellow-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Austin Weather in May</h2>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-black text-yellow-600">70°F-87°F</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Temp</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-amber-600">4"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rainfall</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  May marks the start of summer in Austin! Warm temperatures perfect for Lake Travis party boats and pool parties. The water is warming up and conditions are ideal for outdoor celebrations. Get ready for the summer kickoff!
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
                  alt="May bachelor party on Lake Travis" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  Summer Kickoff!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <PartyPopper className="h-8 w-8 text-yellow-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">May Events & Festivals</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-yellow-200 dark:border-yellow-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                      <Star className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Memorial Day Weekend</h3>
                      <p className="text-gray-600 dark:text-gray-400">The biggest party weekend of late spring! Lake Travis is absolutely packed with celebration energy and summer vibes.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-yellow-200 dark:border-yellow-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      <Waves className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Pool Party Season Begins</h3>
                      <p className="text-gray-600 dark:text-gray-400">Austin's famous pool parties kick into high gear. Hotels and venues open their pools for legendary daytime celebrations.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-yellow-200 dark:border-yellow-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                      <Music className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Outdoor Concert Season</h3>
                      <p className="text-gray-600 dark:text-gray-400">Austin's outdoor music venues are in full swing. Catch shows at Stubbs, The Backyard, and many rooftop bars.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-yellow-200 dark:border-yellow-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                      <Sun className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Summer Festival Preview</h3>
                      <p className="text-gray-600 dark:text-gray-400">Experience Austin's vibrant summer scene before peak tourist season. Perfect weather for all outdoor activities.</p>
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
                  May is peak season on Lake Travis! Book 2-3 months in advance, especially for Memorial Day weekend. Our Austin bachelor party boats accommodate 14-75 guests with captain, crew, premium sound system, and water activities.
                </p>
                <ul className="space-y-3">
                  {[
                    'BYOB - bring your own drinks via Party On Delivery',
                    'Professional captain and crew included',
                    'Bluetooth sound system for your playlist',
                    'Swimming and water activities',
                    'Perfect warm water temperatures in May'
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
              <h2 className="text-3xl font-black mb-4">Austin Nightlife in May</h2>
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
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">May Pricing & Peak Season</h2>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                <strong>Peak season begins!</strong> Expect $700-1000/person for an epic weekend experience.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Ship className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$150-220</p>
                  <p className="text-gray-600 dark:text-gray-400">per person for boat</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <MapPin className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Peak Rates</p>
                  <p className="text-gray-600 dark:text-gray-400">book early for best deals</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Utensils className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Summer Menus</p>
                  <p className="text-gray-600 dark:text-gray-400">patio dining season</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Pack Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Backpack className="h-8 w-8 text-yellow-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">What to Pack</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    'Light, breathable clothing for warm weather',
                    'Lots of sunscreen (Texas sun is intense in May!)',
                    'Swimwear for Lake Travis and pool parties',
                    'Comfortable shoes for bar hopping',
                    'Sunglasses and hat for sun protection'
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
              <Calendar className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Sample May Weekend</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">The perfect bachelor party itinerary</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-yellow-200 dark:border-yellow-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-yellow-600 mb-4">SATURDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-sm font-bold text-yellow-600">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Breakfast tacos at Veracruz or Juan in a Million</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-sm font-bold text-yellow-600">1pm</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">Lake Travis Party Boat Cruise (3-4 hours)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-sm font-bold text-yellow-600">5pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Pool party at the hotel or rooftop bar</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-sm font-bold text-yellow-600">7pm</span>
                      <span className="text-gray-700 dark:text-gray-300">BBQ feast at Franklin or Terry Black's</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-sm font-bold text-yellow-600">9pm</span>
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
      <section className="py-16 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Star className="h-12 w-12 mx-auto text-yellow-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Pro Tips for May Bachelor Parties</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Book Lake Travis boats 2-3 months in advance for Memorial Day',
                'Pool parties are HUGE in May - plan daytime activities around them',
                'Make BBQ and steakhouse reservations well ahead of time',
                'Memorial Day weekend is the busiest - book everything early',
                'Bring extra sunscreen - Texas sun is no joke in May',
                'Check outdoor concert schedules for amazing live music'
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
              alt="Bachelor party celebration on Lake Travis" 
              className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8"
              aspectRatio="21/9"
            />
            
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              Book Your May Bachelor Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              May is the ultimate time for bachelor parties in Austin. Memorial Day energy, pool party season, and epic summer kickoff await. Reserve your Lake Travis party boat and create memories that will last forever!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
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
                  className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-bold text-lg px-10 py-7"
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

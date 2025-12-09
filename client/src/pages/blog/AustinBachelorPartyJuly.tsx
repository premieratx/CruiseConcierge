import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, Sun, CheckCircle2, Users, Music, Ship, MapPin, Utensils, ThermometerSun, PartyPopper, Star, ChevronRight, Flame, DollarSign, Backpack } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import LazyImage from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-17_1760080740020.jpg';
import sectionImage1 from '@assets/@capitalcityshots-18_1760080740021.jpg';
import sectionImage2 from '@assets/@capitalcityshots-19_1760080740021.jpg';
import sectionImage3 from '@assets/@capitalcityshots-20_1760080740021.jpg';

export default function AustinBachelorPartyJuly() {
  return (
    <div data-page-ready="austin-bachelor-party-july" className="min-h-screen bg-gradient-to-b from-red-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Why Austin is Perfect for Bachelor Parties in July | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Plan a July Austin bachelor party: 76°F-96°F hot summer weather, 4th of July celebrations, Lake Travis boats & fireworks. Peak season guide!" 
        />
        <meta 
          name="keywords" 
          content="July bachelor party Austin, Austin bachelor party, Lake Travis party boat, 4th of July bachelor party, Austin nightlife July, summer bachelor party Texas" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelor-party-july" />
        
        <meta property="og:title" content="Why Austin is Perfect for Bachelor Parties in July" />
        <meta property="og:description" content="Plan a July Austin bachelor party with Lake Travis boats, 4th of July fireworks, and hot summer celebrations." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/austin-bachelor-party-july" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-17_1760080740020.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why Austin is Perfect for Bachelor Parties in July",
            "description": "Plan a July Austin bachelor party: 76°F-96°F hot summer weather, 4th of July celebrations, Lake Travis boats & fireworks.",
            "image": "https://premierpartycruises.com/attached_assets/@capitalcityshots-17_1760080740020.jpg",
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
            "datePublished": "2024-07-01",
            "dateModified": "2025-12-09",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/austin-bachelor-party-july"
            }
          })}
        </script>
      </Helmet>

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 via-blue-600 to-red-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-semibold">July Bachelor Party Guide - Hot Summer!</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Austin is Perfect for<br />
              <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Bachelor Parties in July
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-red-100 mb-8 leading-relaxed">
              4th of July celebrations, peak lake season, and fireworks!<br />
              Your ultimate summer bachelor party guide!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-100 text-red-600 font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-white/50 transition-all hover:scale-105"
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
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                  data-testid="button-hero-call"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  (512) 488-5892
                </Button>
              </a>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-white" />
                <span>125,000+ Happy Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-white fill-white" />
                <span>4.9★ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-white" />
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
                  <ThermometerSun className="h-8 w-8 text-red-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Austin Weather in July</h2>
                </div>
                <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-black text-red-600">76°F-96°F</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Temp (HOT!)</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-blue-600">2"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rainfall</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  July is peak summer in Austin! Hot temperatures make Lake Travis the perfect escape. Start your lake activities early (9am-1pm) to beat the afternoon heat. Water temperatures are warm and perfect for swimming. Plan indoor or shaded activities during peak heat hours.
                </p>
              </div>
              <div className="relative">
                <LazyImage 
                  src={heroImage} 
                  alt="July bachelor party on Lake Travis" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
                <div className="absolute -bottom-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  Peak Summer Season!
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
              <PartyPopper className="h-8 w-8 text-red-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">July Events & Celebrations</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-red-200 dark:border-red-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                      <Star className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Independence Day Weekend</h3>
                      <p className="text-gray-600 dark:text-gray-400">The 4th of July brings epic fireworks over Lake Travis! Book early - this is the most popular weekend of summer.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-200 dark:border-blue-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      <Ship className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Peak Lake Season</h3>
                      <p className="text-gray-600 dark:text-gray-400">Lake Travis is at its absolute best. Warm water, packed coves, and non-stop party atmosphere!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 dark:border-red-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                      <PartyPopper className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Lake Fireworks Shows</h3>
                      <p className="text-gray-600 dark:text-gray-400">Multiple lakeside communities host spectacular fireworks displays. Watch from the boat for the ultimate experience!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-200 dark:border-blue-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                      <Music className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Hot Summer Nights</h3>
                      <p className="text-gray-600 dark:text-gray-400">Austin's nightlife is electric! Rooftop bars, pool parties, and 6th Street are packed with energy all month.</p>
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
                  alt="Bachelor party boat on Lake Travis in July" 
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
                  July is PEAK season - book 3+ months in advance, especially for 4th of July weekend! Our Austin bachelor party boats accommodate 14-75 guests with captain, crew, premium sound system, and all the water activities you need to beat the heat.
                </p>
                <ul className="space-y-3">
                  {[
                    'BYOB - bring your own drinks via Party On Delivery',
                    'Professional captain and crew included',
                    'Bluetooth sound system for your playlist',
                    'Swimming and water activities - essential in July!',
                    'Shaded areas to escape the Texas sun'
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
      <section className="py-16 bg-gradient-to-br from-blue-900 to-red-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Music className="h-12 w-12 mx-auto text-blue-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Austin Nightlife in July</h2>
              <p className="text-xl text-blue-200">Hot summer nights call for cold drinks. Here's where to celebrate.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Kung Fu Saloon', type: 'Games & Drinks', desc: 'Arcade games, skeeball, and ice-cold drinks' },
                { name: 'Rain on 4th', type: 'Nightclub', desc: 'Dancing, bottle service, AC paradise' },
                { name: 'Rainey Street Bars', type: 'Bar District', desc: 'Bungalow bars with backyards and misters' },
                { name: 'Cidercade', type: 'Arcade Bar', desc: 'Free games, craft ciders, perfect summer hangout' },
                { name: 'Electric Jellyfish', type: 'Rooftop', desc: 'Downtown views and tropical frozen drinks' },
                { name: 'Handlebar', type: 'Dive Bar', desc: 'Classic Austin vibes, late-night tacos nearby' }
              ].map((venue, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-blue-500/30 hover:bg-white/20 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-white mb-1">{venue.name}</h3>
                    <p className="text-blue-300 text-sm mb-2">{venue.type}</p>
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
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">July Pricing - Peak Season</h2>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-blue-50 dark:from-red-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                <strong>Peak season rates.</strong> Expect $800-1200/person for a premium summer weekend experience.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Ship className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$180-250</p>
                  <p className="text-gray-600 dark:text-gray-400">per person for boat</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <MapPin className="h-8 w-8 mx-auto text-red-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Peak Rates</p>
                  <p className="text-gray-600 dark:text-gray-400">book accommodations early</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Utensils className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$100-150/day</p>
                  <p className="text-gray-600 dark:text-gray-400">food & drinks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Pack Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Backpack className="h-8 w-8 text-red-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">What to Pack for July</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    'Very light, breathable clothing - it\'s HOT!',
                    'LOTS of sunscreen (SPF 50+ recommended)',
                    'Wide-brim hat for sun protection',
                    'Multiple swimsuits for Lake Travis activities',
                    'Reusable water bottle - stay hydrated!',
                    'Sunglasses (polarized for the lake)',
                    'Sandals and comfortable shoes for nights out'
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
                  alt="Bachelor party group celebrating in July" 
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
              <Calendar className="h-12 w-12 mx-auto text-red-500 mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Sample July Weekend</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">The perfect summer bachelor party itinerary (beat the heat!)</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-red-200 dark:border-red-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-red-600 mb-4">SATURDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded text-sm font-bold text-red-600">9am</span>
                      <span className="text-gray-700 dark:text-gray-300">Breakfast tacos at Veracruz or Juan in a Million</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded text-sm font-bold text-red-600">10am</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">Lake Travis Party Boat Cruise (beat the heat!)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded text-sm font-bold text-red-600">2pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Return to hotel, pool time & AC recovery</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded text-sm font-bold text-red-600">7pm</span>
                      <span className="text-gray-700 dark:text-gray-300">BBQ feast at Franklin or Terry Black's</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded text-sm font-bold text-red-600">9pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Rainey Street bar crawl or 6th Street</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-200 dark:border-blue-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-blue-600 mb-4">SUNDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-bold text-blue-600">10am</span>
                      <span className="text-gray-700 dark:text-gray-300">Recovery brunch at Kerbey Lane (AC!)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-bold text-blue-600">12pm</span>
                      <span className="text-gray-700 dark:text-gray-300">TopGolf (covered bays) or bowling</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-bold text-blue-600">3pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Hotel pool party before departure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-bold text-blue-600">5pm</span>
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
      <section className="py-16 bg-gradient-to-br from-red-500 via-blue-600 to-red-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Star className="h-12 w-12 mx-auto text-yellow-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Pro Tips for July Bachelor Parties</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Book Lake Travis boats and accommodations 3+ months in advance',
                'For 4th of July weekend, book 4-6 months ahead - it sells out!',
                'Start lake activities early (9am-1pm) to avoid peak afternoon heat',
                'Make BBQ and steakhouse reservations well in advance',
                'Plan indoor or shaded activities during 2pm-5pm peak heat',
                'Stay hydrated! Drink plenty of water throughout the day'
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
              alt="Bachelor party celebration on Lake Travis in July" 
              className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8"
              aspectRatio="21/9"
            />
            
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              Book Your July Bachelor Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              July is peak season for Austin bachelor parties. 4th of July fireworks, hot summer lake days, and legendary nightlife await. Book early to secure your Lake Travis party boat and create unforgettable memories!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
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
                  className="border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold text-lg px-10 py-7"
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

import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, CheckCircle2, Users, Music, Ship, MapPin, Utensils, ThermometerSun, PartyPopper, Star, ChevronRight, DollarSign, Backpack, Sparkles, Ghost } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-1_1760080740012.jpg';
import sectionImage1 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import sectionImage2 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import sectionImage3 from '@assets/@capitalcityshots-4_1760080740017.jpg';

export default function AustinBachelorettePartyOctober() {
  return (
    <div data-page-ready="austin-bachelorette-party-october" className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Why Austin is Perfect for Bachelorette Parties in October | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Plan an October Austin bachelorette party: 56°F-78°F fall weather, ACL Festival vibes, Halloween celebrations, Lake Travis boats & complete girls' trip guide!" 
        />
        <meta 
          name="keywords" 
          content="October bachelorette party Austin, Austin bachelorette party, Lake Travis party boat, ACL Festival bachelorette, Halloween bachelorette Austin, girls trip Austin October" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelorette-party-october" />
        
        <meta property="og:title" content="Why Austin is Perfect for Bachelorette Parties in October" />
        <meta property="og:description" content="Plan an October Austin bachelorette party with ACL Festival vibes, Halloween celebrations, Lake Travis boats, and perfect fall weather." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/austin-bachelorette-party-october" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-1_1760080740012.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why Austin is Perfect for Bachelorette Parties in October",
            "description": "Plan an October Austin bachelorette party: 56°F-78°F fall weather, ACL Festival vibes, Halloween celebrations, Lake Travis boats & complete girls' trip guide.",
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
            "datePublished": "2024-10-01",
            "dateModified": "2025-12-09",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/austin-bachelorette-party-october"
            }
          })}
        </script>
      </Helmet>

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-amber-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              <span className="text-sm font-semibold">October Bachelorette Party Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Austin is Perfect for<br />
              <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                Bachelorette Parties in October
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
              ACL Festival energy, Halloween celebrations, and perfect fall weather.<br />
              Your ultimate October girls' trip guide!
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
                <Users className="h-5 w-5 text-brand-yellow" />
                <span>125,000+ Happy Guests</span>
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
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Austin Weather in October</h2>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-purple-100 dark:from-orange-900/30 dark:to-purple-900/30 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-black text-orange-600">56°F-78°F</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Temp</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-purple-600">4"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rainfall</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  October brings perfect fall weather to Austin - warm days ideal for Lake Travis boat cruises and cool evenings perfect for exploring 6th Street. It's the sweet spot between Texas summer heat and winter chill, making it one of the best months for a bachelorette celebration!
                </p>
              </div>
              <div className="relative">
                <LazyImage 
                  src={heroImage} 
                  alt="October bachelorette party on Lake Travis" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
                <div className="absolute -bottom-4 -right-4 bg-purple-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  Perfect Fall Weather!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <PartyPopper className="h-8 w-8 text-purple-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">October Events & Festivals</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-purple-200 dark:border-purple-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                      <Music className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Austin City Limits Festival</h3>
                      <p className="text-gray-600 dark:text-gray-400">Two epic weekends of world-class music at Zilker Park! The city's energy is absolutely electric during ACL.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-200 dark:border-purple-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                      <Ghost className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Halloween Celebrations</h3>
                      <p className="text-gray-600 dark:text-gray-400">Austin goes all out for Halloween! Epic costume parties, haunted bar crawls, and themed celebrations everywhere.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-200 dark:border-purple-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                      <Sparkles className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Fall Festival Season</h3>
                      <p className="text-gray-600 dark:text-gray-400">Pumpkin patches, fall markets, and outdoor festivals make October magical for your bride tribe!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-200 dark:border-purple-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full">
                      <Star className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Prime Bachelorette Season</h3>
                      <p className="text-gray-600 dark:text-gray-400">October is one of the most popular months for bachelorettes in Austin - book early for the best options!</p>
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
                  alt="Bachelorette party boat on Lake Travis" 
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
                  October is peak season! Book 6-8 weeks in advance for ACL weekends. Our Austin bachelorette party boats accommodate 14-75 guests with captain, crew, premium sound system, and Instagram-worthy lake views. Perfect for the bride-to-be and her crew!
                </p>
                <ul className="space-y-3">
                  {[
                    'BYOB - bring your own drinks via Party On Delivery',
                    'Professional captain and crew included',
                    'Bluetooth sound system for your bachelorette playlist',
                    'Swimming and water activities in perfect fall weather',
                    'Halloween costume party cruises are a hit!'
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
      <section className="py-16 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Music className="h-12 w-12 mx-auto text-pink-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Austin Nightlife in October</h2>
              <p className="text-xl text-pink-200">Bachelorette-approved bars and Halloween costume crawls await!</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'The W Rooftop', type: 'Rooftop Bar', desc: 'Stunning downtown views perfect for bride squad photos' },
                { name: 'Barbarella', type: 'Dance Club', desc: 'Retro vibes and epic dance floor for your crew' },
                { name: 'Rainey Street', type: 'Bar District', desc: 'Bungalow bars with backyards, photo ops everywhere' },
                { name: 'Maggie Mae\'s', type: '6th Street', desc: 'Multi-level nightclub, perfect for bachelorette groups' },
                { name: 'The Tipsy Alchemist', type: 'Cocktail Bar', desc: 'Instagrammable drinks and gorgeous atmosphere' },
                { name: 'Halloween Bar Crawl', type: 'Costume Party', desc: 'Dirty 6th goes all out for Halloween weekend!' }
              ].map((venue, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-pink-500/30 hover:bg-white/20 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-white mb-1">{venue.name}</h3>
                    <p className="text-pink-300 text-sm mb-2">{venue.type}</p>
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
              <DollarSign className="h-8 w-8 text-green-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">October Pricing & Deals</h2>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                <strong>Peak season pricing.</strong> ACL weekends are premium. Expect $700-1000/person for an amazing weekend experience.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Ship className="h-8 w-8 mx-auto text-pink-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$150-220</p>
                  <p className="text-gray-600 dark:text-gray-400">per person for boat</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <MapPin className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Book Early</p>
                  <p className="text-gray-600 dark:text-gray-400">ACL hotels sell out fast</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Utensils className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Brunch Spots</p>
                  <p className="text-gray-600 dark:text-gray-400">reserve ahead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Pack Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Backpack className="h-8 w-8 text-purple-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">What to Pack</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    'Layers for cool mornings and warm afternoons',
                    'Cute boots for Rainey Street bar hopping',
                    'Halloween costume if celebrating that weekend',
                    'Light jacket for evening boat cruises',
                    'Swimwear - midday lake temps are still great!'
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
                  alt="Bachelorette party group celebrating" 
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
              <Calendar className="h-12 w-12 mx-auto text-purple-500 mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Sample October Weekend</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">The perfect bachelorette itinerary for the bride-to-be</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-purple-200 dark:border-purple-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-purple-600 mb-4">SATURDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm font-bold text-purple-600">10am</span>
                      <span className="text-gray-700 dark:text-gray-300">Brunch at Jo's Coffee or Perla's</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm font-bold text-purple-600">12pm</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">Lake Travis Bachelorette Boat Cruise (3-4 hours)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm font-bold text-purple-600">5pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Return to Airbnb for glam session</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm font-bold text-purple-600">7pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Dinner at Uchi or ATX Cocina</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm font-bold text-purple-600">9pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Rainey Street bar hop with bride sash!</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-pink-200 dark:border-pink-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-pink-600 mb-4">SUNDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Recovery brunch at Flower Child or Bouldin Creek</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">1pm</span>
                      <span className="text-gray-700 dark:text-gray-300">South Congress shopping + "I Love You So Much" mural</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">4pm</span>
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
      <section className="py-16 bg-gradient-to-br from-orange-500 via-amber-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Sparkles className="h-12 w-12 mx-auto text-yellow-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Pro Tips for October Bachelorettes</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Book Lake Travis boats 2-3 MONTHS ahead for ACL weekends',
                'Halloween costume party boat cruises are absolutely epic!',
                'Non-ACL weekends offer better rates and availability',
                'Reserve brunch and dinner spots well in advance',
                'Matching bride squad outfits are perfect for fall photos',
                'Consider a weeknight boat for better deals during peak season'
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
              alt="Bachelorette party celebration on Lake Travis" 
              className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8"
              aspectRatio="21/9"
            />
            
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              Book Your October Bachelorette Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              October is perfect for bachelorette parties in Austin. ACL Festival vibes, Halloween celebrations, and gorgeous fall weather await. Reserve your Lake Travis party boat and give the bride-to-be a celebration she'll never forget!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
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
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold text-lg px-10 py-7"
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

import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, Sun, CheckCircle2, Users, Music, Ship, MapPin, Utensils, ThermometerSun, PartyPopper, Star, ChevronRight, Heart, DollarSign, Backpack } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-1_1760072938922.jpg';
import sectionImage1 from '@assets/@capitalcityshots-2_1760072938923.jpg';
import sectionImage2 from '@assets/@capitalcityshots-3_1760072938923.jpg';
import sectionImage3 from '@assets/@capitalcityshots-4_1760072938923.jpg';

export default function AustinBachelorettePartyFebruary() {
  return (
    <div data-page-ready="austin-bachelorette-party-february" className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Why Austin is Perfect for Bachelorette Parties in February | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Plan a February Austin bachelorette party: 43°F-64°F weather, Valentine's romance, Galentine's Day, Lake Travis boats & complete guide. Amazing off-season deals!" 
        />
        <meta 
          name="keywords" 
          content="February bachelorette party Austin, Austin bachelorette party, Lake Travis party boat, Valentine's bachelorette party, Galentine's Day Austin, Austin nightlife February" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/austin-bachelorette-party-february" />
        
        <meta property="og:title" content="Why Austin is Perfect for Bachelorette Parties in February" />
        <meta property="og:description" content="Plan a February Austin bachelorette party with Lake Travis boats, Valentine's romance, and amazing off-season deals." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/austin-bachelorette-party-february" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/@capitalcityshots-1_1760072938922.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why Austin is Perfect for Bachelorette Parties in February",
            "description": "Plan a February Austin bachelorette party: 43°F-64°F weather, Valentine's romance, Galentine's Day, Lake Travis boats & complete guide.",
            "image": "https://premierpartycruises.com/attached_assets/@capitalcityshots-1_1760072938922.jpg",
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
            "datePublished": "2024-02-01",
            "dateModified": "2025-12-09",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/austin-bachelorette-party-february"
            }
          })}
        </script>
      </Helmet>

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Heart className="h-4 w-4 text-pink-200 fill-pink-200" />
              <span className="text-sm font-semibold">February Bachelorette Party Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Austin is Perfect for<br />
              <span className="bg-gradient-to-r from-pink-200 via-white to-pink-200 bg-clip-text text-transparent">
                Bachelorette Parties in February
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-pink-100 mb-8 leading-relaxed">
              Valentine's romance, Galentine's celebrations, and incredible off-season deals.<br />
              Your ultimate February bachelorette party guide!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-pink-100 text-pink-600 font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-white/50 transition-all hover:scale-105"
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
                <Users className="h-5 w-5 text-pink-200" />
                <span>125,000+ Happy Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-pink-200 fill-pink-200" />
                <span>4.9★ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-pink-200" />
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
                  <ThermometerSun className="h-8 w-8 text-rose-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Austin Weather in February</h2>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-black text-rose-600">43°F-64°F</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Temp</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-pink-600">2"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rainfall</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  February in Austin offers mild winter weather perfect for a bride-to-be celebration. While mornings are crisp, afternoons warm up beautifully for Lake Travis boat cruises. Pack layers and enjoy the cozy vibes with your bridal squad!
                </p>
              </div>
              <div className="relative">
                <LazyImage 
                  src={heroImage} 
                  alt="February bachelorette party on Lake Travis" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
                <div className="absolute -bottom-4 -right-4 bg-rose-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  Valentine's Season!
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
              <PartyPopper className="h-8 w-8 text-rose-500" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">February Events & Celebrations</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Valentine's Day Weekend</h3>
                      <p className="text-gray-600 dark:text-gray-400">The most romantic time of year! Austin buzzes with love-themed celebrations, special menus, and pink decorations everywhere.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full">
                      <Users className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Galentine's Day Weekend</h3>
                      <p className="text-gray-600 dark:text-gray-400">Celebrate with your bridesmaids on February 13th! Perfect timing for a girls' trip before Valentine's Day.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                      <Music className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Mardi Gras Vibes</h3>
                      <p className="text-gray-600 dark:text-gray-400">Austin brings New Orleans energy with Mardi Gras celebrations! Beads, music, and festive fun for your bridal squad.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Off-Season Value</h3>
                      <p className="text-gray-600 dark:text-gray-400">February is LOW season for Austin tourism. Score amazing deals on hotels, boats, and experiences for your bachelorette crew!</p>
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
                  <Ship className="h-8 w-8 text-rose-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Lake Travis Party Boats</h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  February is LOW season with excellent availability and amazing deals. Book 2-3 weeks in advance for best selection. Our Austin bachelorette party boats accommodate 14-75 guests with captain, crew, premium sound system, and photo-worthy backdrops!
                </p>
                <ul className="space-y-3">
                  {[
                    'BYOB - bring your own drinks via Party On Delivery',
                    'Professional captain and crew included',
                    'Bluetooth sound system for your bachelorette playlist',
                    'Perfect for bride-to-be photo ops',
                    'Cozy cruising in February weather'
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
      <section className="py-16 bg-gradient-to-br from-rose-900 to-pink-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Music className="h-12 w-12 mx-auto text-pink-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Austin Nightlife for Your Bridal Squad</h2>
              <p className="text-xl text-pink-200">Rainey Street and downtown are bachelorette paradise. Here's where to celebrate!</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Midnight Cowboy', type: 'Speakeasy', desc: 'Upscale cocktails, reservation required, perfect for bachelorette vibes' },
                { name: 'Container Bar', type: 'Rooftop', desc: 'Shipping container bar with rooftop views and Instagram moments' },
                { name: "Whisler's", type: 'Craft Cocktails', desc: 'Intimate mezcal bar with rooftop and photo ops' },
                { name: 'Rainey Street Bungalows', type: 'Bar District', desc: 'House parties, backyards, and craft cocktails for the girls' },
                { name: 'Summit Rooftop', type: 'Rooftop Lounge', desc: 'Stunning downtown views and VIP bottle service' },
                { name: 'Handlebar', type: 'Dance Club', desc: 'Dancing, fun vibes, and bachelorette energy' }
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
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">February Pricing & Deals</h2>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                <strong>LOW season = Amazing value!</strong> Expect $500-750/person for an incredible bachelorette weekend.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Ship className="h-8 w-8 mx-auto text-rose-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$100-150</p>
                  <p className="text-gray-600 dark:text-gray-400">per person for boat</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <MapPin className="h-8 w-8 mx-auto text-pink-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Best Deals</p>
                  <p className="text-gray-600 dark:text-gray-400">on hotels & Airbnbs</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Utensils className="h-8 w-8 mx-auto text-red-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Spa Combos</p>
                  <p className="text-gray-600 dark:text-gray-400">pamper packages available</p>
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
                  <Backpack className="h-8 w-8 text-rose-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">What to Pack</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    'Layers - mornings are crisp, afternoons warm up',
                    'Chic outfits for nightlife and photo ops',
                    'Swimwear for heated pools and boat cruise',
                    'Comfortable walking shoes for bar hopping',
                    'Light jacket for rooftop bars in the evening'
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
              <Calendar className="h-12 w-12 mx-auto text-rose-500 mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Sample February Weekend</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">The perfect bachelorette party itinerary for the bride-to-be</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-pink-200 dark:border-pink-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-rose-600 mb-4">SATURDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-rose-600">10am</span>
                      <span className="text-gray-700 dark:text-gray-300">Brunch at June's All Day or Juniper</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-rose-600">12pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Spa and pamper session for the bride</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-rose-600">2pm</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">Lake Travis Party Boat Cruise (3-4 hours)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-rose-600">6pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Return to hotel to glam up</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-rose-600">8pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Dinner at Uchi or Perla's</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-rose-600">10pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Rainey Street bar crawl ending at Midnight Cowboy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-rose-200 dark:border-rose-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-pink-600 mb-4">SUNDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-rose-100 dark:bg-rose-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Recovery brunch with mimosas at Hillside Farmacy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-rose-100 dark:bg-rose-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">1pm</span>
                      <span className="text-gray-700 dark:text-gray-300">South Congress shopping and photo ops</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-rose-100 dark:bg-rose-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">4pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Farewell drinks and departure hugs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="py-16 bg-gradient-to-br from-pink-500 to-rose-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Star className="h-12 w-12 mx-auto text-pink-200 mb-4" />
              <h2 className="text-3xl font-black mb-4">Pro Tips for February Bachelorette Parties</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Book Valentine\'s weekend boats and restaurants EARLY - it\'s the busiest time',
                'Rooftop bars are cozy with heat lamps - perfect for evening drinks',
                'Spa day combos are available at discounted off-season rates',
                'Consider Galentine\'s weekend (Feb 13) for easier reservations',
                'Check for Mardi Gras events for extra festive energy',
                'Afternoon boat cruises are warmer than morning trips'
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <ChevronRight className="h-5 w-5 text-pink-200 flex-shrink-0 mt-1" />
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
              Book Your February Bachelorette Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              February is perfect for bachelorette parties in Austin. Valentine's romance, Galentine's celebrations, amazing deals, and unforgettable memories await the bride-to-be and her squad!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
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
                  className="border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-bold text-lg px-10 py-7"
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

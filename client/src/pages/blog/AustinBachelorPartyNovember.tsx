import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, CheckCircle2, Users, Music, Ship, MapPin, Utensils, ThermometerSun, PartyPopper, Star, ChevronRight, Leaf, DollarSign, Backpack } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { LazyImage } from '@/components/LazyImage';
import MonthlyGuidesNav from '@/components/MonthlyGuidesNav';

import heroImage from '@assets/@capitalcityshots-21_1760080807864.jpg';
import sectionImage1 from '@assets/@capitalcityshots-22_1760080807865.jpg';
import sectionImage2 from '@assets/@capitalcityshots-23_1760080807865.jpg';
import sectionImage3 from '@assets/@capitalcityshots-24_1760080807866.jpg';

export default function AustinBachelorPartyNovember() {
  return (
    <div data-page-ready="austin-bachelor-party-november" className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <SEOHead 
        pageRoute="/blogs/austin-bachelor-party-november"
        defaultTitle="Why Austin is Perfect for Bachelor Parties in November | Premier Party Cruises"
        defaultDescription="Plan a November Austin bachelor party: 52°F-71°F crisp weather, UT Football rivalry games, Thanksgiving vibes & Lake Travis boats. Rain or shine, shoulder season deals!"
        defaultKeywords={['November bachelor party Austin', 'Austin bachelor party', 'Lake Travis party boat', 'Thanksgiving bachelor party', 'Austin nightlife November', 'UT football bachelor party']}
        image="https://premierpartycruises.com/attached_assets/@capitalcityshots-21_1760080807864.jpg"
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-700 to-red-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Leaf className="h-4 w-4 text-amber-300" />
              <span className="text-sm font-semibold">November Bachelor Party Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Austin is Perfect for<br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Bachelor Parties in November
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
              Fall football season, Thanksgiving vibes, and crisp weather.<br />
              Your ultimate November bachelor party guide!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-amber-400 hover:bg-amber-300 text-black font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-amber-400/50 transition-all hover:scale-105"
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
                <Users className="h-5 w-5 text-amber-300" />
                <span>Hundreds of Happy Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-300 fill-amber-300" />
                <span>4.9★ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-amber-300" />
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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


      {/* Weather Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <ThermometerSun className="h-8 w-8 text-orange-600" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Austin Weather in November</h2>
                </div>
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-black text-orange-700">52°F-71°F</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Temp</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-amber-700">3"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rainfall</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  November brings crisp, comfortable weather perfect for your austin bachelor party adventure. The cooler temperatures make a lake travis bachelor party boat refreshing during midday, while evenings are ideal for patio dining and bar hopping. It's great BBQ weather for a bachelor party austin texas celebration!
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
                  alt="Austin bachelor party boat cruise on Lake Travis in November with fall weather" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
                <div className="absolute -bottom-4 -right-4 bg-orange-700 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  Perfect Fall Weather!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <PartyPopper className="h-8 w-8 text-orange-600" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">November Events & Festivals</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-amber-200 dark:border-amber-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                      <Star className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">UT Football Rivalry Games</h3>
                      <p className="text-gray-600 dark:text-gray-400">November brings the biggest Longhorn matchups of the season. Game day energy transforms Austin into an epic celebration!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-amber-200 dark:border-amber-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                      <Utensils className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Thanksgiving Week</h3>
                      <p className="text-gray-600 dark:text-gray-400">The week before Thanksgiving is busy but fun! Celebrate with friends before heading home for the holiday.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-amber-200 dark:border-amber-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                      <Music className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Austin Food & Wine Festival</h3>
                      <p className="text-gray-600 dark:text-gray-400">World-class culinary experiences featuring Texas BBQ, local wines, and celebrity chef appearances.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-amber-200 dark:border-amber-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Fall Shoulder Season</h3>
                      <p className="text-gray-600 dark:text-gray-400">Enjoy excellent availability and shoulder season rates while weather stays beautiful for outdoor activities.</p>
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
                  alt="Lake Travis bachelor party boat rental with group celebrating bachelor party austin texas fall" 
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
                  November offers excellent availability for a lake travis bachelor party boat at shoulder season rates. Midday cruises are perfect for swimming while evenings are crisp and refreshing. Our austin bachelor party boats accommodate 14-75 guests with captain, crew, and premium sound system. Plan the ultimate austin bachelor party this fall!
                </p>
                <ul className="space-y-3">
                  {[
                    'BYOB - bring your own drinks via Party On Delivery',
                    'Professional captain and crew included',
                    'Bluetooth sound system for your playlist',
                    'Swimming still works great midday',
                    'Crisp fall lake conditions in November'
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
      <section className="py-16 bg-gradient-to-br from-amber-900 to-orange-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Music className="h-12 w-12 mx-auto text-amber-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Austin Nightlife in November</h2>
              <p className="text-xl text-amber-200">6th Street and Rainey Street are legendary. Here's where to celebrate.</p>
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
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-amber-500/30 hover:bg-white/20 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-white mb-1">{venue.name}</h3>
                    <p className="text-amber-300 text-sm mb-2">{venue.type}</p>
                    <p className="text-amber-100 text-sm">{venue.desc}</p>
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
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">November Pricing & Deals</h2>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                <strong>Shoulder season rates.</strong> Expect $550-800/person for a great austin bachelor party experience. Great availability for lake travis bachelor party boat fall adventures!
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Ship className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$100-160</p>
                  <p className="text-gray-600 dark:text-gray-400">per person for boat</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <MapPin className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Great Deals</p>
                  <p className="text-gray-600 dark:text-gray-400">on accommodations</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Utensils className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">BBQ Season</p>
                  <p className="text-gray-600 dark:text-gray-400">perfect weather for BBQ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Pack Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Backpack className="h-8 w-8 text-orange-600" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">What to Pack</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    'Layers - mornings and evenings are cool',
                    'Light jacket for evening activities',
                    'Long pants for cooler evenings',
                    'Swimwear still works great for midday lake cruises',
                    'Comfortable shoes for bar hopping and game day'
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
                  alt="Bachelor party austin texas group enjoying lake travis bachelor party boat fall experience" 
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
              <Calendar className="h-12 w-12 mx-auto text-orange-600 mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Sample November Weekend</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">The perfect bachelor party itinerary</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-orange-200 dark:border-orange-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-orange-700 mb-4">SATURDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-700">10am</span>
                      <span className="text-gray-700 dark:text-gray-300">Breakfast tacos at Veracruz or Juan in a Million</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-700">12pm</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">Lake Travis Party Boat Cruise (3-4 hours)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-700">4pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Return to hotel to refresh</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-700">6pm</span>
                      <span className="text-gray-700 dark:text-gray-300">BBQ feast at Franklin or Terry Black's</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-sm font-bold text-orange-700">9pm</span>
                      <span className="text-gray-700 dark:text-gray-300">6th Street bar crawl starting at Kung Fu Saloon</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-amber-200 dark:border-amber-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-amber-700 mb-4">SUNDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-sm font-bold text-amber-700">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Recovery brunch at Kerbey Lane</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-sm font-bold text-amber-700">1pm</span>
                      <span className="text-gray-700 dark:text-gray-300">TopGolf or brewery tour</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-sm font-bold text-amber-700">4pm</span>
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
      <section className="py-16 bg-gradient-to-br from-amber-600 via-orange-700 to-red-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Star className="h-12 w-12 mx-auto text-amber-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Pro Tips for November Bachelor Parties</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Check UT football schedule - game days bring incredible energy to Austin',
                'Thanksgiving week is busy but fun - book accommodations early',
                'Great BBQ weather - shorter lines than summer',
                'Book Lake Travis boats 2-3 weeks in advance for best selection',
                'Midday cruises are best for swimming - water is still warm enough',
                'Bring layers for evening bar hopping and outdoor patios'
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <ChevronRight className="h-5 w-5 text-amber-300 flex-shrink-0 mt-1" />
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
              alt="Austin bachelor party celebration on lake travis bachelor party boat fall season" 
              className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8"
              aspectRatio="21/9"
            />
            
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              Book Your November Bachelor Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              November is perfect for bachelor parties in Austin. UT Football rivalry games, Thanksgiving vibes, and crisp fall weather await. Reserve your Lake Travis party boat and create memories that will last forever!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-orange-700 hover:bg-orange-600 text-white font-bold text-lg px-10 py-7 shadow-2xl transition-all hover:scale-105"
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
                  className="border-2 border-orange-700 text-orange-700 hover:bg-orange-50 font-bold text-lg px-10 py-7"
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

      <MonthlyGuidesNav type="bachelor" currentMonth="November" />

      <Footer />
    </div>
  );
}

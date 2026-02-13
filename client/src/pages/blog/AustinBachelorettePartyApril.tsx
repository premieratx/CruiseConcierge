import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, Sun, CheckCircle2, Users, Music, Ship, MapPin, Utensils, ThermometerSun, PartyPopper, Star, ChevronRight, Flower, DollarSign, Backpack } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import MonthlyGuidesNav from '@/components/MonthlyGuidesNav';
import { LazyImage } from '@/components/LazyImage';

import heroImage from '@assets/@capitalcityshots-5_1760072938923.jpg';
import sectionImage1 from '@assets/@capitalcityshots-8_1760073115406.jpg';
import sectionImage2 from '@assets/@capitalcityshots-9_1760073172208.jpg';
import sectionImage3 from '@assets/@capitalcityshots-9_1760073205047.jpg';

export default function AustinBachelorettePartyApril() {
  return (
    <div data-page-ready="austin-bachelorette-party-april" className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <SEOHead 
        pageRoute="/blogs/austin-bachelorette-party-april"
        defaultTitle="Why Austin is Perfect for Bachelorette Parties in April | Premier Party Cruises"
        defaultDescription="Plan an April Austin bachelorette party: 62°F-80°F spring weather, bluebonnet season, Lake Travis boats & complete guide. Rain or shine, perfect spring celebration!"
        defaultKeywords={['April bachelorette party Austin', 'Austin bachelorette party', 'Lake Travis party boat', 'spring bachelorette party', 'Austin nightlife April', 'bluebonnet bachelorette photos']}
        image="https://premierpartycruises.com/attached_assets/@capitalcityshots-5_1760072938923.jpg"
      />

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Flower className="h-4 w-4 text-pink-200" />
              <span className="text-sm font-semibold">April Bachelorette Party Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Austin is Perfect for<br />
              <span className="bg-gradient-to-r from-pink-200 via-white to-pink-200 bg-clip-text text-transparent">
                Bachelorette Parties in April
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-pink-100 mb-8 leading-relaxed">
              Wildflower season, perfect spring weather, and unforgettable celebrations.<br />
              Your ultimate April bachelorette guide for the bride-to-be!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-pink-50 text-pink-600 font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-white/50 transition-all hover:scale-105"
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
                <span>Hundreds of Happy Guests</span>
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

      {/* Topic Cluster Pillar Link */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This guide is part of our complete{' '}
            <Link href="/bachelorette-party-austin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Austin bachelorette party boats</Link>{' '}
            resource — your ultimate planning hub for Lake Travis bachelorette celebrations.
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
                  <ThermometerSun className="h-8 w-8 text-pink-500" />
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">Austin Weather in April</h2>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-black text-pink-600">62°F-80°F</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Temp</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-purple-600">2.5"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rainfall</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  April delivers the most beautiful spring weather for your austin bachelorette party. Perfect temperatures for outdoor patios, lake travis bachelorette party boat days, and exploring the Hill Country bluebonnets. Not too hot, not too cold—just right for your bachelorette party austin texas celebration with the bride tribe!
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
                  alt="Austin bachelorette party boat cruise on Lake Travis in April with bride squad celebrating spring" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  aspectRatio="4/3"
                />
                <div className="absolute -bottom-4 -right-4 bg-pink-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  🌸 Peak Wildflower Season!
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
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">April Events & Festivals</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      <Flower className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Texas Wildflower Season</h3>
                      <p className="text-gray-600 dark:text-gray-400">Bluebonnets are at their peak! Perfect backdrop for Instagram-worthy bridal party photos in the Hill Country.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                      <PartyPopper className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Eeyore's Birthday Party</h3>
                      <p className="text-gray-600 dark:text-gray-400">Austin's iconic free-spirited celebration in Pease Park. Drums, costumes, and bohemian vibes—perfect for adventurous bride squads!</p>
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
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Spring Music Festivals</h3>
                      <p className="text-gray-600 dark:text-gray-400">Austin's live music scene comes alive with outdoor festivals, rooftop concerts, and patio performances throughout the city.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-pink-200 dark:border-pink-900 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full">
                      <Sun className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Easter & Spring Celebrations</h3>
                      <p className="text-gray-600 dark:text-gray-400">Brunch specials, spring-themed cocktails, and festive energy at Austin's best restaurants and bars.</p>
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
                  alt="Lake Travis bachelorette party boat rental with austin bachelorette party group enjoying spring cruise" 
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
                  April is perfect for a lake travis bachelorette party boat cruise! The water is warming up for your austin bachelorette party, crowds are manageable, and the scenery is stunning with spring blooms. Our bachelorette party austin texas boats accommodate 14-75 guests with captain, crew, premium sound system, and photo-worthy moments.
                </p>
                <ul className="space-y-3">
                  {[
                    'BYOB - bring your own rosé via Party On Delivery',
                    'Professional captain and crew included',
                    'Bluetooth sound system for your bridal playlist',
                    'Swimming and water activities',
                    'Perfect spring lake conditions in April'
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
      <section className="py-16 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Music className="h-12 w-12 mx-auto text-pink-300 mb-4" />
              <h2 className="text-3xl font-black mb-4">Austin Nightlife for Bachelorettes</h2>
              <p className="text-xl text-pink-200">From Rainey Street to 6th Street, here are the bride squad favorites.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'The W Rooftop', type: 'Rooftop Bar', desc: 'Stunning views, craft cocktails, perfect for group photos' },
                { name: 'Rainey Street Bars', type: 'Bar District', desc: 'Bungalow bars with backyards, string lights & cocktails' },
                { name: 'Pete\'s Dueling Piano Bar', type: 'Live Music', desc: 'Sing-along fun, perfect for bachelorette energy' },
                { name: 'Container Bar', type: 'Outdoor Venue', desc: 'Unique shipping container bar with great vibes' },
                { name: 'Geraldine\'s', type: 'Upscale Lounge', desc: 'Chic cocktails and live music at Hotel Van Zandt' },
                { name: 'Handle Bar', type: 'Dance Club', desc: 'Dancing, bottle service, VIP bachelorette packages' }
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
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">April Pricing & Deals</h2>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                <strong>Shoulder season value.</strong> Expect $600-850/person for an unforgettable bachelorette weekend.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Ship className="h-8 w-8 mx-auto text-pink-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">$120-180</p>
                  <p className="text-gray-600 dark:text-gray-400">per person for boat</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <MapPin className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Great Deals</p>
                  <p className="text-gray-600 dark:text-gray-400">on Airbnbs & hotels</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <Utensils className="h-8 w-8 mx-auto text-rose-500 mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">Brunch Spots</p>
                  <p className="text-gray-600 dark:text-gray-400">with spring menus</p>
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
                    'Floral dresses and spring outfits for photos',
                    'Comfortable walking shoes for exploring',
                    'Sunglasses and light layers for evenings',
                    'Swimwear for the Lake Travis boat cruise',
                    'Matching bride squad accessories'
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
                  alt="Bachelorette party austin texas group celebrating on lake travis bachelorette party boat in spring" 
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
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Sample April Weekend</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">The perfect bachelorette itinerary for your bride tribe</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-pink-200 dark:border-pink-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-pink-600 mb-4">SATURDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">10am</span>
                      <span className="text-gray-700 dark:text-gray-300">Champagne brunch at Perla's or Sway</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">12pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Bluebonnet photoshoot in the Hill Country</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">2pm</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">Lake Travis Party Boat Cruise (3-4 hours)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">6pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Return to Airbnb to get ready</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">8pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Dinner at Uchi or Clark's Oyster Bar</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded text-sm font-bold text-pink-600">10pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Rainey Street bar hop with the bride squad</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-200 dark:border-purple-900">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-purple-600 mb-4">SUNDAY</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm font-bold text-purple-600">11am</span>
                      <span className="text-gray-700 dark:text-gray-300">Recovery brunch at June's All Day</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm font-bold text-purple-600">1pm</span>
                      <span className="text-gray-700 dark:text-gray-300">South Congress shopping & coffee</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm font-bold text-purple-600">3pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Mural photos at "I Love You So Much" wall</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm font-bold text-purple-600">4pm</span>
                      <span className="text-gray-700 dark:text-gray-300">Farewell toasts and departure</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="py-16 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Star className="h-12 w-12 mx-auto text-pink-200 mb-4" />
              <h2 className="text-3xl font-black mb-4">Pro Tips for April Bachelorettes</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Bluebonnet photo ops are at their peak—schedule a morning shoot!',
                'Book outdoor patios for brunch and dinner reservations',
                'Lake Travis boats book up fast—reserve 4-6 weeks ahead',
                'Pack layers: mornings can be cool, afternoons warm',
                'Check if Eeyore\'s Birthday Party falls on your weekend',
                'Consider weekday arrival for better hotel rates'
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
              alt="Austin bachelorette party boat celebration on Lake Travis with spring wildflowers and bride squad" 
              className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8"
              aspectRatio="21/9"
            />
            
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              Book Your April Bachelorette Party
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              April is perfect for an austin bachelorette party celebration. Bluebonnets, spring weather, and epic bachelorette party austin texas moments await your bride tribe. Reserve your lake travis bachelorette party boat and create memories that will last forever!
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

      <MonthlyGuidesNav type="bachelorette" currentMonth="April" />
      <Footer />
    </div>
  );
}

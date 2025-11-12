import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Utensils, Music, Sparkles, Phone, Heart, Coffee, Sun, Moon, Star, PartyPopper, ShoppingBag, Camera, Palmtree, Wine, Waves, Ship, Shield, Users, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';

export default function MustHavesAustinBacheloretteWeekend() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Must-Haves for the Perfect Austin Bachelorette Weekend in Texas | Party Planning Guide</title>
        <meta 
          name="description" 
          content="Plan the perfect bachelorette party in Austin, Texas! Complete weekend guide with must-have activities, venues, and insider tips for an epic celebration." 
        />
        <meta 
          name="keywords" 
          content="bachelorette party in austin texas, bachelorette weekend austin, austin bachelorette party" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Must-Haves for the Perfect Austin Bachelorette Weekend in Texas" />
        <meta property="og:description" content="Complete weekend guide with must-have activities, venues, and insider tips for an epic Austin bachelorette celebration" />
        <meta property="og:type" content="article" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Must-Haves for the Perfect Austin Bachelorette Weekend in Texas",
            "description": "Plan the perfect bachelorette party in Austin, Texas! Complete weekend guide with must-have activities, venues, and insider tips for an epic celebration.",
            "image": "https://premierpartycruises.com/media/schema/bachelorette-party.jpg",
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
            "datePublished": "2025-11-01",
            "dateModified": "2025-11-12",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/must-haves-austin-bachelorette-weekend"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Heart className="h-4 w-4 text-brand-yellow" />
              <span className="text-sm font-semibold">Ultimate Bachelorette Weekend Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Must-Haves for the Perfect<br />
              <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                Bachelorette Weekend
              </span>
              <br />in Austin, Texas
            </h1>
            
            <p className="text-xl md:text-2xl text-pink-100 mb-8 leading-relaxed">
              From fun things to fashion to getting around and everything in between,<br />
              we've got you all set up for success!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                  data-testid="button-hero-get-quote"
                >
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Get Your Quote
                </Button>
              </Link>
              <a href="tel:5124885892">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold text-lg px-8 py-6"
                  data-testid="button-hero-call"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us
                </Button>
              </a>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-yellow" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-brand-yellow" />
                <span>125K+ Guests Served</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-yellow" />
                <span>Perfect Safety Record</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Austin, Texas is the perfect destination for an unforgettable bachelorette weekend! With its vibrant nightlife, incredible food scene, beautiful outdoor spaces, and legendary live music, the city offers everything you need for an epic celebration. Whether you're looking for relaxation, adventure, or non-stop partying, Austin delivers.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                This comprehensive guide will walk you through a perfect weekend itinerary, from Thursday arrival to Sunday brunch, including the best venues, activities, and insider tips to make your <Link href="/bachelorette-party-austin" className="text-pink-600 hover:underline font-medium">Austin bachelorette party</Link> absolutely legendary.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Ready to plan the perfect celebration? Let's dive into your ultimate Austin bachelorette weekend!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THURSDAY Itinerary */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full p-4">
                <Moon className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">THURSDAY</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">Arrival & First Night Festivities</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Hotel Van Zandt */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-pink-200 dark:border-pink-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 dark:bg-pink-900 rounded-full p-3 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-pink-600 dark:text-pink-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Check In: Hotel Van Zandt
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Start your weekend in style at this iconic Rainey Street boutique hotel. Modern luxury meets Austin's vibrant music scene, with a prime location perfect for exploring the city.
                      </p>
                      <a 
                        href="https://www.hotelvanzandt.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit Hotel Van Zandt <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bach Babes */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 flex-shrink-0">
                      <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Shopping: Bach Babes
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Get the party started with custom bachelorette swag! Bach Babes specializes in fun, Instagram-worthy party supplies, matching outfits, and all the accessories you need to make your squad stand out.
                      </p>
                      <a 
                        href="https://www.bachbabes.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Shop Bach Babes <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Elizabeth Street Cafe */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0">
                      <Utensils className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Dinner: Elizabeth Street Cafe
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        End your first night at this beautiful French-Vietnamese cafe. The charming atmosphere, delicious cuisine, and stunning Instagrammable decor make it the perfect spot for your first group dinner.
                      </p>
                      <a 
                        href="https://www.elizabethstreetcafe.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit Elizabeth Street Cafe <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FRIDAY Itinerary */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full p-4">
                <Sun className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">FRIDAY</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">Lake Travis Party & Nightlife</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Lake Travis Boat Party */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-brand-blue bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-blue rounded-full p-3 flex-shrink-0">
                      <Ship className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block bg-brand-yellow text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
                        ⭐ HIGHLIGHT OF THE WEEKEND
                      </div>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                        Morning/Afternoon: Lake Travis Private Boat Party
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        This is THE must-do activity for your Austin bachelorette weekend! Spend 4 hours on a <Link href="/private-cruises" className="text-blue-600 hover:underline font-bold">private party boat</Link> on beautiful Lake Travis with your squad. BYOB, professional captain, premium sound system, floats, and stunning views.
                      </p>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Why It's Perfect:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">Private boat experience just for your group</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">BYOB - bring your favorite drinks & save money</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">Swimming, floating, dancing on the lake</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">Perfect for photos & unforgettable memories</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/bachelorette-party-austin">
                          <Button className="bg-brand-blue hover:bg-blue-700 text-white">
                            <Waves className="mr-2 h-4 w-4" />
                            Bachelorette Packages
                          </Button>
                        </Link>
                        <Link href="/chat">
                          <Button variant="outline" className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Your Boat
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Taco Deli */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-3 flex-shrink-0">
                      <Coffee className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Post-Boat Fuel: Taco Deli
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        After your boat party, refuel with Austin's best breakfast tacos! Taco Deli is a local favorite with fresh, delicious tacos that'll power you through the rest of the day.
                      </p>
                      <a 
                        href="https://www.tacodeli.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit Taco Deli <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ATX Disco Cruise */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-3 flex-shrink-0">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                        ✨ EVENING PARTY OPTION
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Evening: ATX Disco Cruise (Optional)
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Want to keep the lake party going? Join our legendary evening disco cruise! Dance under the stars with a DJ, disco lights, and an epic party atmosphere on Lake Travis.
                      </p>
                      <Link href="/atx-disco-cruise">
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                          <Sparkles className="mr-2 h-4 w-4" />
                          Disco Cruise Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kemuri Tatsuya */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-red-200 dark:border-red-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 dark:bg-red-900 rounded-full p-3 flex-shrink-0">
                      <Utensils className="h-6 w-6 text-red-600 dark:text-red-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Dinner: Kemuri Tatsuya
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Experience incredible Japanese BBQ at this trendy East Austin spot. The unique flavors and cool atmosphere make it perfect for a memorable group dinner.
                      </p>
                      <a 
                        href="https://www.kemuri-tatsuya.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit Kemuri Tatsuya <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* White Horse */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-orange-200 dark:border-orange-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-3 flex-shrink-0">
                      <Music className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Late Night: White Horse
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        End the night at Austin's iconic honky-tonk! Live music, dancing, and authentic Texas vibes make White Horse the perfect spot to experience Austin's legendary nightlife.
                      </p>
                      <a 
                        href="https://www.thewhitehorseaustin.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit White Horse <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SATURDAY Itinerary */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full p-4">
                <Palmtree className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">SATURDAY</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">Relaxation & Final Night Out</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Barton Springs */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-cyan-200 dark:border-cyan-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-cyan-100 dark:bg-cyan-900 rounded-full p-3 flex-shrink-0">
                      <Waves className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Morning Recovery: Barton Springs Pool
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Refresh and recharge in Austin's famous natural spring-fed pool. The cool, crystal-clear water is the perfect hangover cure and a beautiful way to start your day.
                      </p>
                      <a 
                        href="https://www.austintexas.gov/department/barton-springs-pool" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit Barton Springs <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terry Black's BBQ */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-amber-200 dark:border-amber-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-3 flex-shrink-0">
                      <Utensils className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Lunch: Terry Black's BBQ
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        No Austin trip is complete without authentic Texas BBQ! Terry Black's serves up some of the best brisket, ribs, and sides in the city. Come hungry!
                      </p>
                      <a 
                        href="https://www.terryblacksbbq.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit Terry Black's <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Justine's */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-pink-200 dark:border-pink-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 dark:bg-pink-900 rounded-full p-3 flex-shrink-0">
                      <Wine className="h-6 w-6 text-pink-600 dark:text-pink-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Dinner: Justine's Brasserie
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Step into old-world Paris at this romantic French brasserie. Delicious food, vintage vibes, and a magical garden patio create an unforgettable dining experience.
                      </p>
                      <a 
                        href="https://www.justines1937.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit Justine's <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coconut Club */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 flex-shrink-0">
                      <PartyPopper className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Night Out: Coconut Club
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Dance the night away at this tropical-themed club featuring top DJs, craft cocktails, and an energetic dance floor. The perfect finale to your bachelorette weekend!
                      </p>
                      <a 
                        href="https://coconutclubaustin.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit Coconut Club <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SUNDAY Itinerary */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-orange-500 to-yellow-600 text-white rounded-full p-4">
                <Coffee className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">SUNDAY</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">Farewell Brunch</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Banger's Brunch */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-orange-200 dark:border-orange-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-3 flex-shrink-0">
                      <Utensils className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Farewell Brunch: Banger's Sausage House & Beer Garden
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        End your weekend on a high note with Banger's legendary brunch! Featuring creative sausages, hearty plates, and a huge outdoor beer garden, it's the perfect spot to reminisce about your amazing weekend before heading home.
                      </p>
                      <a 
                        href="https://www.bangersaustin.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        Visit Banger's <CheckCircle2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Additional Resources
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need for the perfect Austin bachelorette weekend
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bachelor Party Guide */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Planning a Bachelor Party Too?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Check out our complete guide for the guys' celebration!
                  </p>
                  <Link href="/bachelor-party-austin">
                    <Button variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                      Bachelor Party Guide
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Combined Party */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <Heart className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Combined Celebrations
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Want to celebrate together? We've got you covered!
                  </p>
                  <Link href="/combined-bachelor-bachelorette-austin">
                    <Button variant="outline" className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                      Combined Party Options
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Private Cruises */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-cyan-200 dark:border-cyan-800">
                <CardContent className="p-6">
                  <Ship className="h-8 w-8 text-cyan-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Private Boat Rentals
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Explore all our private cruise options and pricing
                  </p>
                  <Link href="/private-cruises">
                    <Button variant="outline" className="w-full border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white">
                      View All Boats
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Book Now */}
              <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-pink-200 dark:border-pink-800 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-800">
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8 text-pink-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Ready to Book?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Get your custom quote in minutes!
                  </p>
                  <Link href="/chat">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                      Get Your Quote Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-brand-yellow" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready for an Unforgettable Weekend?
            </h2>
            <p className="text-xl text-pink-100 mb-8 leading-relaxed">
              Austin is waiting! Book your Lake Travis boat party and make memories that'll last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 shadow-2xl"
                  data-testid="button-cta-get-quote"
                >
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Plan Your Weekend
                </Button>
              </Link>
              <a href="tel:5124885892">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold text-lg px-8 py-6"
                  data-testid="button-cta-call"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  (512) 488-5892
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

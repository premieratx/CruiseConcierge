import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CloudRain, Sun, Wind, Snowflake, Calendar, Shield, CheckCircle2, Phone, Thermometer, Umbrella, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

export default function LakeTravisWeatherGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" data-page-ready="lake-travis-weather-guide">
      <Helmet>
        <title>Lake Travis Weather Planning | Seasonal Guide for Perfect Boat Parties</title>
        <meta 
          name="description" 
          content="Plan perfect Lake Travis boat parties year-round! Seasonal weather guide, safety tips, and best times for Austin celebrations. 15+ years experience." 
        />
        <meta 
          name="keywords" 
          content="Lake Travis weather, Austin boat party seasons, Lake Travis year-round boating, best time Lake Travis, seasonal party planning Austin, Lake Travis weather guide" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Lake Travis Weather Planning: Seasonal Guide" />
        <meta property="og:description" content="Complete seasonal weather guide for perfect Lake Travis boat parties" />
        <meta property="og:type" content="article" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Lake Travis Weather Planning: Seasonal Considerations for Perfect Boat Parties",
            "description": "Comprehensive seasonal weather guide for planning Lake Travis boat parties in Austin, Texas",
            "image": "https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg",
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
              "@id": "https://premierpartycruises.com/lake-travis-weather-guide"
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
      <section className="relative bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sun className="h-4 w-4 text-brand-yellow" />
              <span className="text-sm font-semibold">Year-Round Lake Travis Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Lake Travis Weather<br />
              <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                Seasonal Planning Guide
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-sky-100 mb-8 leading-relaxed">
              Plan the perfect boat party every season on Austin's premier lake.<br />
              Expert tips for spring, summer, fall, and winter celebrations!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                  data-testid="button-hero-get-quote"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan Your Cruise
                </Button>
              </Link>
              <a href="tel:5124885892">
                <Button 
                  size="lg" 
                  variant="outlineLight" 
                  className="text-lg px-8 py-6"
                  data-testid="button-hero-call"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  (512) 488-5892
                </Button>
              </a>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-yellow" />
                <span>Perfect Safety Record</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-brand-yellow" />
                <span>Year-Round Cruises</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-yellow" />
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                The shimmering waters of Lake Travis offer unforgettable party boat experiences year-round where guests have a great time. From lively <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-medium">bachelor</Link> and <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-medium">bachelorette celebrations</Link> to <Link href="/corporate-events" className="text-blue-600 hover:underline font-medium">corporate events</Link> and <Link href="/birthday-parties" className="text-blue-600 hover:underline font-medium">birthday parties</Link>, our lake travis boat rentals provide a unique backdrop for every occasion. Understanding the lake's dynamic weather patterns is key to planning the perfect celebration.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                With 15+ years of experience and 125,000+ satisfied guests, Premier Party Cruises operates custom-built, high-end <Link href="/private-cruises" className="text-blue-600 hover:underline font-medium">single-deck party boats</Link> on Lake Travis. Our experienced team knows Lake Travis weather intimately and highly recommend checking seasonal conditions before booking your austin boat rental. This guide helps you plan the perfect cruise for any season, ensuring safety, comfort, and maximum fun on the water! <Link href="/testimonials-faq" className="text-blue-600 hover:underline font-medium">Read what our guests say</Link> about cruising in different seasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Sections */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Spring */}
            <Card className="mb-8 overflow-hidden border-2 border-green-300 dark:border-green-700">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-8 w-8" />
                  <div>
                    <h2 className="text-3xl font-black">Spring on Lake Travis</h2>
                    <p className="text-green-100 text-lg">March - May | The Awakening</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Thermometer className="h-6 w-6 text-green-600" />
                      Weather Overview
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Temps:</strong> 70-85°F - Perfect outdoor weather</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Water:</strong> Calm with moderate winds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Watch For:</strong> Early spring storms (brief)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Perfect For</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-medium">Bachelor</Link>/<Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-medium">bachelorette parties</Link></li>
                      <li>• <Link href="/corporate-events" className="text-blue-600 hover:underline font-medium">Corporate</Link> <Link href="/team-building" className="text-blue-600 hover:underline font-medium">team building</Link></li>
                      <li>• <Link href="/birthday-parties" className="text-blue-600 hover:underline font-medium">Birthday celebrations</Link></li>
                      <li>• Early season events</li>
                    </ul>
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                        Pro Tip: Pack sunscreen and light layers. Spring offers ideal weather without summer crowds!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summer */}
            <Card className="mb-8 overflow-hidden border-2 border-orange-300 dark:border-orange-700">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Sun className="h-8 w-8" />
                  <div>
                    <h2 className="text-3xl font-black">Summer on Lake Travis</h2>
                    <p className="text-orange-100 text-lg">June - August | Peak Party Season</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Thermometer className="h-6 w-6 text-orange-600" />
                      Weather Overview
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Temps:</strong> 90-100°F+ with high humidity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Water:</strong> Perfect swimming temperature</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Watch For:</strong> Brief afternoon thunderstorms</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Perfect For</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Swimming & water activities</li>
                      <li>• High-energy celebrations</li>
                      <li>• <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-medium">ATX Disco Cruise</Link> (Fri/Sat)</li>
                      <li>• Family reunions, <Link href="/blog/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests" className="text-blue-600 hover:underline font-medium">large group events</Link></li>
                    </ul>
                    <div className="mt-4 p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                        Pro Tip: Stay hydrated! Bring LOTS of water, seek shade, pack sunscreen. Brief afternoon storms cool things down.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fall */}
            <Card className="mb-8 overflow-hidden border-2 border-amber-300 dark:border-amber-700">
              <div className="bg-gradient-to-r from-amber-600 to-orange-700 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-8 w-8" />
                  <div>
                    <h2 className="text-3xl font-black">Fall on Lake Travis</h2>
                    <p className="text-amber-100 text-lg">September - November | Golden Hours</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Thermometer className="h-6 w-6 text-amber-600" />
                      Weather Overview
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Temps:</strong> 70-80°F - Ideal comfort</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Humidity:</strong> Significantly lower than summer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Skies:</strong> Often clear with stunning sunsets</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Perfect For</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Intimate <Link href="/rehearsal-dinner" className="text-blue-600 hover:underline font-medium">weddings</Link> & events</li>
                      <li>• <Link href="/corporate-events" className="text-blue-600 hover:underline font-medium">Corporate retreats</Link></li>
                      <li>• <Link href="/milestone-birthday" className="text-blue-600 hover:underline font-medium">Milestone birthdays</Link></li>
                      <li>• Sunset cruises</li>
                    </ul>
                    <div className="mt-4 p-4 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                      <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                        Pro Tip: Fall offers the best weather with fewer crowds. Pack light layers for cooler evenings. Perfect sunset views!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Winter */}
            <Card className="mb-8 overflow-hidden border-2 border-blue-300 dark:border-blue-700">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-700 p-6 text-white">
                <div className="flex items-center gap-3">
                  <Snowflake className="h-8 w-8" />
                  <div>
                    <h2 className="text-3xl font-black">Winter on Lake Travis</h2>
                    <p className="text-blue-100 text-lg">December - February | Unexpected Charms</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Thermometer className="h-6 w-6 text-blue-600" />
                      Weather Overview
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Temps:</strong> 50-65°F - Mild Texas winters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Crowds:</strong> Significantly less busy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Watch For:</strong> Occasional cold fronts, check wind</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Perfect For</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Intimate gatherings, <Link href="/private-cruises" className="text-blue-600 hover:underline font-medium">private cruises</Link></li>
                      <li>• Unique holiday parties</li>
                      <li>• <Link href="/corporate-events" className="text-blue-600 hover:underline font-medium">Corporate end-of-year events</Link></li>
                      <li>• Tranquil escapes</li>
                    </ul>
                    <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                        Pro Tip: Layer clothing! Many winter days are sunny and crisp. Check wind advisories. Perfect for cozy celebrations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Year-Round Safety Tips */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Year-Round Boating Safety
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Our perfect safety record over 15+ years speaks for itself
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <CloudRain className="h-6 w-6 text-blue-600" />
                    Weather Monitoring
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Check National Weather Service daily</li>
                    <li>• Monitor wind conditions (critical on Lake Travis)</li>
                    <li>• Watch for storm warnings</li>
                    <li>• Our captains monitor weather in real-time</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sun className="h-6 w-6 text-orange-600" />
                    Sun & Hydration
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Apply sunscreen every 2 hours (even cloudy days)</li>
                    <li>• Bring LOTS of water - hydration is critical</li>
                    <li>• Use our shaded areas for breaks</li>
                    <li>• Wear hats and sunglasses</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Wind className="h-6 w-6 text-cyan-600" />
                    Wind Awareness
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Strong winds can change conditions quickly</li>
                    <li>• Our captains navigate wind patterns expertly</li>
                    <li>• Secure loose items before departure</li>
                    <li>• We monitor wind advisories continuously</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Umbrella className="h-6 w-6 text-purple-600" />
                    Flexible Rescheduling
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• We proactively communicate weather changes</li>
                    <li>• Flexible rescheduling for severe weather</li>
                    <li>• Safety always comes first</li>
                    <li>• Call (512) 488-5892 for weather updates</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center text-gray-900 dark:text-white mb-12">
              Weather Planning FAQs
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    What's the best season for a Lake Travis boat party?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Spring (March-May) and Fall (September-November) offer the most pleasant temperatures and stable weather. Summer (June-August) is perfect for swimming and water sports despite the heat. Winter can be lovely for intimate gatherings with less crowds. <Link href="/chat" className="text-blue-600 hover:underline font-medium">Book your cruise</Link> for any season - we'll help you plan!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    How does Premier Party Cruises handle bad weather?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We continuously monitor weather conditions and will proactively communicate with you about any potential changes. Our experienced captains are trained to navigate various conditions, and we have established protocols to ensure passenger safety. We offer flexible rescheduling for severe weather.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Can we cruise in winter on Lake Travis?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Absolutely! Many winter days in Austin are sunny and crisp (50-65°F). We cruise year-round. Pack layers for cooler temperatures and check wind advisories. Winter offers a unique, less crowded Lake Travis experience perfect for <Link href="/private-cruises" className="text-blue-600 hover:underline font-medium">intimate celebrations</Link> and <Link href="/corporate-events" className="text-blue-600 hover:underline font-medium">corporate gatherings</Link>.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    What should we bring for different seasons?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Spring/Fall: Light layers, sunscreen, hats. Summer: Swimwear, LOTS of water, sunscreen, towels. Winter: Warm layers, hats, gloves. Year-round: Sunglasses, medications, cameras, and BYOB beverages in cans/plastic (no glass).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Plan Your Perfect<br />Lake Travis Celebration
            </h2>
            <p className="text-xl md:text-2xl text-sky-100 mb-10 leading-relaxed">
              Every season is boat party season on Lake Travis!<br />
              15+ years experience • Perfect safety record • Year-round cruises
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-10 py-7 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                  data-testid="button-final-cta-quote"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Get Your Quote
                </Button>
              </Link>
              <a href="tel:5124885892">
                <Button 
                  size="lg" 
                  variant="outlineLight" 
                  className="text-lg px-10 py-7"
                  data-testid="button-final-cta-call"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  Call (512) 488-5892
                </Button>
              </a>
            </div>

            <div className="text-sm text-sky-200">
              <p className="mb-2">📍 Anderson Mill Marina - 13993 FM 2769, Leander, TX 78641</p>
              <p>Available 365 days a year | BYOB cruises | Weather monitoring included</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

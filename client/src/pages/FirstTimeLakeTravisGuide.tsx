import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Anchor, Ship, Users, Calendar, Shield, Music, Camera, Waves, ChevronRight, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';

export default function FirstTimeLakeTravisGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>First-Time Lake Travis Boat Rental Guide | Essential Austin Party Planning Tips</title>
        <meta 
          name="description" 
          content="Planning your first Lake Travis boat rental? Expert guide to choosing boats, safety, pricing, and Austin party planning. 15+ years experience, 125,000+ guests." 
        />
        <meta 
          name="keywords" 
          content="Lake Travis boat rental, Austin party planning, first time boat rental, Lake Travis guide, party boat Austin, bachelor party Lake Travis, bachelorette party Austin" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="First-Time Lake Travis Boat Rental: Essential Guide" />
        <meta property="og:description" content="Your complete guide to planning the perfect Lake Travis party boat experience" />
        <meta property="og:type" content="article" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "First-Time Lake Travis Boat Rental: Essential Tips for Austin Party Planning",
            "description": "Comprehensive guide for planning your first Lake Travis boat party",
            "image": "https://premierpartycruises.com/media/schema/disco-dance-floor.jpg",
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
              "@id": "https://premierpartycruises.com/first-time-lake-travis-guide"
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
      <section className="relative bg-gradient-to-br from-brand-blue via-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              <span className="text-sm font-semibold">Your Complete Lake Travis Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              First-Time Lake Travis<br />
              <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                Boat Rental Guide
              </span>
              <br />for Austin Parties
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Essential tips for planning the perfect Austin party boat experience.<br />
              From choosing your vessel to safety tips and pricing.
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
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-bold text-lg px-8 py-6"
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
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-yellow" />
                <span>125,000+ Happy Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow" />
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
                Austin, Texas boasts vibrant culture and the stunning Lake Travis. A party boat rental offers the perfect blend of excitement and scenic beauty. Whether you're planning a bachelor party, bachelorette celebration, birthday, or corporate event, understanding lake travis boat rentals is key to a seamless, unforgettable day on the water where everyone has a great time.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                This comprehensive guide from Premier Party Cruises equips you with everything you need to know for your first austin boat rental, ensuring confident planning and smooth Austin party execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Choosing Your Vessel Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Ship className="h-12 w-12 text-brand-blue mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Choose Your Perfect Party Boat
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Premier Party Cruises operates custom-built, high-end single-deck party boats on Lake Travis. With 15+ years of experience and 125,000+ satisfied customers who highly recommend our services, we ensure your celebration is perfect.
              </p>
            </div>

            {/* Fleet Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Day Tripper */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white">
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-bold mb-1">Day Tripper</h3>
                  <p className="text-blue-100">Up to 14 Guests</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-black text-brand-blue mb-1">$800-$1,400</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">4-hour cruise (varies by day)</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Oversized pontoon-style boat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Single-deck, BYOB</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Bluetooth speakers, grill, restroom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Lily pads, coolers included</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Perfect for intimate gatherings, family outings, smaller bachelor/bachelorette parties
                  </p>
                </CardContent>
              </Card>

              {/* Meeseeks & The Irony */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-brand-blue">
                <div className="bg-gradient-to-br from-brand-blue to-blue-600 p-6 text-white relative">
                  <div className="absolute top-2 right-2 bg-brand-yellow text-black text-xs font-bold px-2 py-1 rounded">
                    POPULAR
                  </div>
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-bold mb-1">Meeseeks & The Irony</h3>
                  <p className="text-blue-100">Up to 25-30 Guests</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-black text-brand-blue mb-1">$1,000-$2,100</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">4-hour cruise (varies by day)</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Mid-size party boat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Raised stage for photos & bands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Premium Bluetooth system, grill</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Sun/shade seating, restroom</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Ideal for bachelor/bachelorette parties, pre-wedding events, mid-sized celebrations
                  </p>
                </CardContent>
              </Card>

              {/* Clever Girl */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-purple-500">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 text-white">
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-bold mb-1">Clever Girl</h3>
                  <p className="text-purple-100">Up to 50-75 Guests</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-black text-purple-600 mb-1">$2,000-$4,200</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">4-hour cruise (varies by day)</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">20x50ft dance floor w/ Texas flag</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Two premium restrooms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Full stage, 14 disco balls, tiki bar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Premium sound system, 4 coolers</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Best for large celebrations, corporate events, weddings, reunions
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* What's Included Box */}
            <Card className="bg-gradient-to-br from-brand-blue to-blue-700 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Anchor className="h-6 w-6" />
                  All Cruises Include
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Professional Licensed Captain (CPR certified)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">All Fuel & Boat Fees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Coolers with Ice & Cups</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Life Jackets for All Passengers</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Lily Pad Floats</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Bluetooth Sound System</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Clean Restroom(s)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">BYOB (Bring Your Own Beverages)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Safety First on Lake Travis
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Premier Party Cruises maintains a <span className="font-bold text-green-600">perfect safety record</span> over 15+ years and 125,000+ guests
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    Our Safety Standards
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>All captains are licensed, experienced, and CPR certified</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Defibrillators on every boat</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Extensive first aid kits and inflatable life vests</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Regular boat maintenance and inspections</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Weather monitoring and route planning</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Waves className="h-6 w-6 text-brand-blue" />
                    Passenger Guidelines
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Always listen to your captain's instructions</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Life jackets available for all passengers</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Responsible alcohol consumption (BYOB in cans/plastic only)</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Stay aware of surroundings and other boats</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Designated swimmer watch when using floats</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                <strong className="text-brand-blue">Texas Parks & Wildlife</strong> emphasizes safe boating practices. Our perfect safety record demonstrates our commitment to providing both fun and secure experiences on Lake Travis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips & Add-Ons Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Sparkles className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Maximize Your Experience
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Pro tips and premium add-ons to elevate your Lake Travis adventure
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Essential Tips */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Essential Tips</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <Calendar className="h-6 w-6 text-brand-blue flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Book in Advance</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Especially during peak season (April-September). Weekends book up fast!</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Users className="h-6 w-6 text-brand-blue flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Accurate Head Count</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Choose the right boat size for your group. Strict capacity limits enforced for safety.</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Ship className="h-6 w-6 text-brand-blue flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">What to Bring</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Sunscreen, towels, swimwear, hats, sunglasses, BYOB beverages in cans/plastic</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Anchor className="h-6 w-6 text-brand-blue flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Arrive Early</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Allow time for parking, loading coolers, and getting settled before departure</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Premium Add-Ons */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-300 dark:border-purple-700">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Premium Add-Ons</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <Music className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Professional DJ</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Elevate your party with expert mixing and energy</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Camera className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Professional Photographer</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Capture memories with high-quality photos</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Waves className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Additional Floats</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Unicorn floats, extra lily pads, more water fun!</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Ship className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Transportation</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">14-person sprinter vans at 25% discount</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* ATX Disco Cruise Callout */}
            <Card className="bg-gradient-to-r from-brand-blue via-purple-600 to-pink-600 text-white border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-brand-yellow text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
                      AMERICA'S ONLY MULTI-GROUP PARTY CRUISE
                    </div>
                    <h3 className="text-3xl font-black mb-4">
                      Try the ATX Disco Cruise!
                    </h3>
                    <p className="text-lg text-white/90 mb-6">
                      Join 50-100 bachelor/bachelorette partiers on a 4-hour shared cruise with professional DJ, photographer, giant floats, and BYOB. Starting at just $85/person!
                    </p>
                    <Link href="/atx-disco-cruise">
                      <Button 
                        size="lg" 
                        className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold"
                        data-testid="button-disco-cruise-cta"
                      >
                        Learn About Disco Cruise
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <Music className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm font-semibold">Pro DJ</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <Camera className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm font-semibold">Photos</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <Users className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm font-semibold">Multi-Group</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center text-gray-900 dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    What boats can I rent on Lake Travis?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Premier Party Cruises operates three custom-built, high-end single-deck party boats: Day Tripper (14 guests), Meeseeks & The Irony (25-30 guests), and Clever Girl (50-75 guests). All boats are BYOB and include professional captains, coolers with ice, Bluetooth sound systems, and safety equipment.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Is alcohol allowed on Lake Travis boat rentals?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes! All Premier Party Cruises are BYOB (Bring Your Own Beverages). We provide coolers with ice and cups. Please bring beverages in cans or plastic containers only (no glass). You must be 21+ to consume alcohol, and we encourage responsible drinking.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Do I need a license to drive a boat on Lake Travis?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    No! All Premier Party Cruises include a professional, licensed, CPR-certified captain. You don't need any boating experience - just show up, relax, and enjoy the ride while our experienced captain handles navigation and safety.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    How far in advance should I book my Lake Travis boat rental?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We recommend booking as early as possible, especially for peak season (April-September) and weekends. Popular dates can book out weeks or months in advance. However, we sometimes have last-minute availability - contact us at (512) 488-5892 to check!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    What should I bring for a day on Lake Travis?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Essentials include: sunscreen, towels, swimwear, hats, sunglasses, water, and your BYOB beverages in cans/plastic. We provide coolers with ice, cups, Bluetooth speakers, lily pad floats, and all safety equipment. Optional: extra snacks, waterproof phone cases, GoPro cameras.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    What's the difference between a private cruise and the ATX Disco Cruise?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    A private cruise gives you exclusive use of the boat for your group (4-hour rental). The ATX Disco Cruise is a shared 4-hour experience where 3-5 bachelor/bachelorette parties cruise together with a professional DJ and photographer. Disco Cruise starts at $85/person, while private cruises range from $800-$4,200 for the entire boat (varies by size and day).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Your Unforgettable Lake Travis Adventure Awaits
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
              With 15+ years of experience, 125,000+ happy guests, and a perfect safety record, Premier Party Cruises is Austin's trusted choice for Lake Travis celebrations. Let's plan your perfect party boat experience!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-10 py-7 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                  data-testid="button-final-cta-quote"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Get Your Custom Quote
                </Button>
              </Link>
              <a href="tel:5124885892">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-blue font-bold text-lg px-10 py-7"
                  data-testid="button-final-cta-call"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  Call (512) 488-5892
                </Button>
              </a>
            </div>

            <div className="text-sm text-blue-200">
              <p className="mb-2">📍 Anderson Mill Marina - 13993 FM 2769, Leander, TX 78641</p>
              <p>Available 7 days a week | Same-day quotes | Flexible booking options</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

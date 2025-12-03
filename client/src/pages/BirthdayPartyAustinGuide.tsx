import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cake, Ship, Users, Calendar, Shield, Music, Camera, Sparkles, CheckCircle2, Phone, PartyPopper, Gift, Anchor } from 'lucide-react';
import { Link } from 'wouter';

export default function BirthdayPartyAustinGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" data-page-ready="birthday-party-austin-guide">
      <Helmet>
        <title>Birthday Party Boat Austin | Milestone Celebrations on Lake Travis</title>
        <meta 
          name="description" 
          content="Celebrate milestone birthdays on Lake Travis! Austin's premier party boat rentals with BYOB, crew, and floats. 15+ years, 125,000+ guests served." 
        />
        <meta 
          name="keywords" 
          content="birthday party Austin, milestone birthday Lake Travis, party boat birthday, Austin birthday celebration, Lake Travis birthday party, 30th birthday Austin, 40th birthday party, 50th birthday Lake Travis" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Birthday Party Boat Austin | Lake Travis Milestone Celebrations" />
        <meta property="og:description" content="Unforgettable milestone birthday celebrations on Lake Travis with Premier Party Cruises" />
        <meta property="og:type" content="article" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Birthday Party Boat Austin: Milestone Celebrations Made Easy",
            "description": "Complete guide to planning unforgettable milestone birthday parties on Lake Travis",
            "image": "https://premierpartycruises.com/media/schema/hero-boat-1.jpg",
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
              "@id": "https://premierpartycruises.com/birthday-party-austin-guide"
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
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <PartyPopper className="h-4 w-4 text-brand-yellow" />
              <span className="text-sm font-semibold">Milestone Birthdays on Lake Travis</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Austin Birthday Party<br />
              <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                Boat Rentals
              </span>
              <br />on Lake Travis
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
              Make your 30th, 40th, 50th, or any birthday unforgettable with an exclusive<br />
              Lake Travis party boat celebration. BYOB, professional crew, and stunning views!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                  data-testid="button-hero-get-quote"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  Plan Your Celebration
                </Button>
              </Link>
              <a href="tel:5124885892">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold text-lg px-8 py-6"
                  data-testid="button-hero-call"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  (512) 488-5892
                </Button>
              </a>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Cake className="h-5 w-5 text-brand-yellow" />
                <span>125,000+ Celebrations</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-yellow" />
                <span>Perfect Safety Record</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-yellow" />
                <span>Groups 14-75 People</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lake Travis Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Why Lake Travis for Your Birthday?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Austin's most spectacular venue for milestone celebrations
              </p>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Austin, Texas boasts vibrant culture, live music, and stunning natural beauty, with Lake Travis standing out as the ultimate destination for milestone birthday celebrations. Unlike traditional party venues, a <Link href="/private-cruises" className="text-blue-600 hover:underline font-medium">private party boat</Link> on Lake Travis provides an exclusive, dynamic environment that creates unforgettable memories where guests have a great time celebrating together.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                With 15+ years of experience and over 125,000 satisfied guests, Premier Party Cruises specializes in transforming <Link href="/milestone-birthday" className="text-blue-600 hover:underline font-medium">milestone birthdays</Link> into extraordinary Lake Travis adventures. Our austin boat rental services include custom-built, high-end single-deck party boats that offer the perfect blend of comfort, excitement, and scenic beauty for your special day. <Link href="/testimonials-faq" className="text-blue-600 hover:underline font-medium">Read our customer reviews</Link> to see why we're Austin's top choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Options */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Ship className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Choose Your Birthday Boat
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                All boats are BYOB with professional captains, coolers, floats & sound systems
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Intimate Celebration - 14 guests */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white">
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-bold mb-1">Day Tripper</h3>
                  <p className="text-blue-100">Up to 14 Guests</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-black text-purple-600 mb-1">$800-$1,400</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">4-hour cruise (varies by day)</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Perfect for intimate birthday celebrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">BYOB with coolers & ice provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Bluetooth speakers, grill, restroom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Lily pads for swimming fun</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Best for: Close friends & family milestone birthdays, <Link href="/sweet-16" className="text-blue-600 hover:underline font-medium">Sweet 16 parties</Link>
                  </p>
                </CardContent>
              </Card>

              {/* Mid-Size Party - 25-30 guests */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-purple-500">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 text-white relative">
                  <div className="absolute top-2 right-2 bg-brand-yellow text-black text-xs font-bold px-2 py-1 rounded">
                    MOST POPULAR
                  </div>
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-bold mb-1">Meeseeks & The Irony</h3>
                  <p className="text-purple-100">Up to 25-30 Guests</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-black text-purple-600 mb-1">$1,000-$2,100</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">4-hour cruise (varies by day)</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Ideal for milestone birthday parties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Raised stage for photos & toasts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Premium sound system, BYOB setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Sun/shade areas, restroom, grill</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Best for: 30th, 40th, 50th <Link href="/milestone-birthday" className="text-blue-600 hover:underline font-medium">birthday celebrations</Link>
                  </p>
                </CardContent>
              </Card>

              {/* Grand Celebration - 50-75 guests */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-pink-500">
                <div className="bg-gradient-to-br from-pink-600 to-orange-600 p-6 text-white">
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-bold mb-1">Clever Girl</h3>
                  <p className="text-pink-100">Up to 50-75 Guests</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-black text-pink-600 mb-1">$2,000-$4,200</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">4-hour cruise (varies by day)</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Grand milestone birthday celebrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">20x50ft dance floor with Texas flag</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Full stage, 14 disco balls, tiki bar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Two restrooms, premium sound, BYOB</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Best for: Epic 60th, 70th birthday bashes, <Link href="/graduation-party" className="text-blue-600 hover:underline font-medium">graduation parties</Link>, <Link href="/blog/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests" className="text-blue-600 hover:underline font-medium">large group celebrations</Link>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Premium Add-Ons */}
            <Card className="mt-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  Elevate Your Birthday Celebration
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Music className="h-6 w-6 text-purple-600 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Professional DJ</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Keep the party energy high with expert mixing (also available on our <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-medium">ATX Disco Cruise</Link>)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Camera className="h-6 w-6 text-purple-600 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Professional Photographer</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Capture every milestone moment</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Anchor className="h-6 w-6 text-purple-600 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Additional Floats & Toys</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Unicorn floats, extra lily pads, water fun</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ship className="h-6 w-6 text-purple-600 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Transportation Service</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">14-person sprinter vans at 25% discount</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Planning Tips */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Birthday Party Planning Tips
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Make your milestone celebration stress-free and spectacular
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-purple-600" />
                    Book Early
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Milestone birthdays deserve premium dates! Book 4-8 weeks in advance, especially for weekends and peak season (April-September). Our lake travis boat rentals are in high demand.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Saturday slots fill up fast - past clients highly recommend booking early. <Link href="/chat" className="text-blue-600 hover:underline font-medium">Secure your date today</Link> at (512) 488-5892
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="h-6 w-6 text-purple-600" />
                    Get Your Head Count
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Choose the right boat size: 14 guests (intimate), 25-30 (classic party), 50-75 (grand celebration). Strict capacity limits for safety.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Not sure? <Link href="/chat" className="text-blue-600 hover:underline font-medium">Contact our team</Link> and we'll help you select the perfect vessel!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Cake className="h-6 w-6 text-purple-600" />
                    BYOB & Catering
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    All cruises are BYOB - bring your favorite beverages in cans/plastic (no glass). We provide coolers, ice, and cups. Many bring birthday cakes and snacks!
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pro tip: Use <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Party On Delivery</a> for convenient alcohol delivery, then pre-chill drinks and pack coolers at home for easy loading
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-purple-600" />
                    Safety First
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Our perfect safety record over 15+ years speaks for itself. Professional CPR-certified captains, life jackets for all, defibrillators on every boat.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Celebrate with complete peace of mind on Lake Travis
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center text-gray-900 dark:text-white mb-12">
              Birthday Party FAQs
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Can I bring my own birthday cake and decorations?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Absolutely! Many birthday parties bring cakes, cupcakes, and decorations. Our boats have space for food setup, and the natural Lake Travis scenery provides a beautiful backdrop. Just avoid loose items that could blow away! The same setup works great for <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-medium">bachelorette parties</Link> and <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-medium">bachelor parties</Link> too.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    What's included in the rental price?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Every cruise includes: professional licensed captain (CPR certified), all fuel & boat fees, coolers with ice & cups, life jackets, lily pad floats, Bluetooth sound system, clean restroom(s), and BYOB capability. Add-ons like DJ, photographer, and extra floats available.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Can we customize the cruise route?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes! Our captains work with you to create the perfect birthday cruise experience - whether you want to anchor in a quiet cove for swimming, cruise past scenic spots, or find the best sunset views. Your celebration, your route!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    What's the best time of year for a birthday boat party?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We cruise year-round! Spring (March-May) and Fall (September-November) offer perfect weather. Summer (June-August) is great for swimming and water activities. Even winter has sunny days perfect for intimate celebrations. <Link href="/blog/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties" className="text-blue-600 hover:underline font-medium">Check our seasonal weather guide</Link> to help you choose the best timing!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Plan Your<br />Milestone Birthday?
            </h2>
            <p className="text-xl md:text-2xl text-purple-100 mb-10 leading-relaxed">
              15+ years of experience • 125,000+ celebrations • Perfect safety record<br />
              Make your birthday unforgettable on Lake Travis!
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
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold text-lg px-10 py-7"
                  data-testid="button-final-cta-call"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  Call (512) 488-5892
                </Button>
              </a>
            </div>

            <div className="text-sm text-purple-200">
              <p className="mb-2">📍 Anderson Mill Marina - 13993 FM 2769, Leander, TX 78641</p>
              <p>Available 7 days a week | BYOB cruises | All ages welcome</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

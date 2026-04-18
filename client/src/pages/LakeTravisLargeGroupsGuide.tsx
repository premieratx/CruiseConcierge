import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ship, Users, Calendar, Shield, Music, Camera, CheckCircle2, Phone, Sparkles, Anchor, Building2, Trophy, Heart } from 'lucide-react';
import { Link } from 'wouter';
import { BlogImageBreak, BlogPhotoStrip, BlogPartyGallery, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';
import PublicNavigationLuxury from '@/components/PublicNavigationLuxury';
import Footer from '@/components/Footer';

export default function LakeTravisLargeGroupsGuide() {
  return (
    <div data-page-ready="lake-travis-large-groups-guide" className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PublicNavigationLuxury />
      <Helmet>
        <title>Lake Travis Boat Rentals Texas | Large Group Party Boats (20-75 Guests) Austin</title>
        <meta 
          name="description" 
          content="Lake Travis boat rentals for large groups in Austin, Texas. Party boat cruises for 20-75 guests. Corporate events, reunions. BYOB. Book now!" 
        />
        <meta 
          name="keywords" 
          content="boat rental lake travis texas, party boat austin, large group boat rental, Austin corporate events, Lake Travis team building, reunion party boat, bachelorette party" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Lake Travis Large Group Party Boat Rentals | 20-75 Guests" />
        <meta property="og:description" content="Premier party boat rentals for large groups on Lake Travis" />
        <meta property="og:type" content="article" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Lake Travis Party Boat Rentals: Ultimate Guide for Large Group Events",
            "description": "Complete guide to planning large group celebrations on Lake Travis for 20-75 guests",
            "image": "https://premierpartycruises.com/media/schema/hero-boat-2.jpg",
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
              "@id": "https://premierpartycruises.com/lake-travis-large-groups-guide"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue via-cyan-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Users className="h-4 w-4 text-brand-yellow" />
              <span className="text-sm font-semibold">Large Group Specialists</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Lake Travis Party Boat Rentals:<br />
              <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                Ultimate Texas Guide
              </span>
              <br />for Large Group Events (20+ Guests)
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Corporate events, reunions, large celebrations on Austin's premier lake.<br />
              Austin boat rental with custom-built party boats, professional crews, BYOB, and all amenities!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                  data-testid="button-hero-get-quote"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Get Group Quote
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
                <Users className="h-5 w-5 text-brand-yellow" />
                <span>Thousands of Guests Served</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-brand-yellow" />
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lake Travis for Large Groups */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center text-gray-900 dark:text-white mb-12">
              Why Lake Travis for Large Group Events?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6 text-center">
                  <Building2 className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Corporate Events
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <Link href="/team-building" className="text-blue-600 hover:underline font-medium">Team building</Link>, <Link href="/client-entertainment" className="text-blue-600 hover:underline font-medium">client entertainment</Link>, <Link href="/company-milestone" className="text-blue-600 hover:underline font-medium">company milestones</Link> - create memorable experiences beyond the boardroom
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-cyan-200 dark:border-cyan-800">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Family Reunions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bring generations together on the water for unforgettable family celebrations and reconnections
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Celebrations
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <Link href="/rehearsal-dinner" className="text-blue-600 hover:underline font-medium">Weddings</Link>, <Link href="/milestone-birthday" className="text-blue-600 hover:underline font-medium">anniversaries</Link>, <Link href="/graduation-party" className="text-blue-600 hover:underline font-medium">graduations</Link> - exclusive venues for life's biggest moments
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Large boat photo - Clever Girl flagship */}
            <BlogImageBreak 
              src={BLOG_BOAT_PHOTOS.large.src}
              alt={BLOG_BOAT_PHOTOS.large.alt}
              caption="Clever Girl: Our flagship party boat accommodates up to 75 guests with a massive dance floor"
              className="max-w-3xl mx-auto"
            />

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Lake Travis offers an unparalleled backdrop for large group events in Austin, Texas. The crystal-clear waters, scenic coves, and vibrant atmosphere create an ideal setting that traditional venues simply can't match. Premier Party Cruises operates custom-built, high-end <Link href="/private-cruises" className="text-blue-600 hover:underline font-medium">single-deck party boats</Link> on Lake Travis, providing a dynamic, exclusive environment that fosters camaraderie and creates unforgettable memories for groups of 20-75 people. Our lake travis boat rentals ensure everyone has a great time with professional crews and premium amenities. <Link href="/testimonials-faq" className="text-blue-600 hover:underline font-medium">Read our reviews</Link> from satisfied corporate clients and event planners who highly recommend our services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Options for Large Groups */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Ship className="h-12 w-12 text-brand-blue mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Large Group Fleet Options
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                All boats BYOB with professional captains, full amenities & premium sound systems
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* 25-30 Guests */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-blue-500">
                <div className="bg-gradient-to-br from-brand-blue to-blue-600 p-6 text-white">
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-bold mb-1">Meeseeks & The Irony</h3>
                  <p className="text-blue-100">20-30 Guests</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-black text-brand-blue mb-1">$1,000-$2,100</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">4-hour cruise (varies by day)</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Perfect for mid-size corporate teams & reunions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Raised stage ideal for presentations & photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Premium Bluetooth sound, BYOB with coolers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Clean restroom, sun/shade seating, grill</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Life jackets, lily pads, safety equipment</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Ideal for: Small <Link href="/corporate-events" className="text-blue-600 hover:underline font-medium">corporate retreats</Link>, family reunions, extended friend groups, <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-medium">bachelor parties</Link>
                  </p>
                </CardContent>
              </Card>

              {/* 50-75 Guests */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-cyan-500">
                <div className="bg-gradient-to-br from-cyan-600 to-blue-800 p-6 text-white relative">
                  <div className="absolute top-2 right-2 bg-brand-yellow text-black text-xs font-bold px-2 py-1 rounded">
                    LARGE GROUPS
                  </div>
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-bold mb-1">Clever Girl</h3>
                  <p className="text-cyan-100">50-75 Guests</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-black text-cyan-600 mb-1">$2,000-$4,200</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">4-hour cruise (varies by day)</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Maximum capacity for grand celebrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">20x50ft dance floor with painted Texas flag</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Full stage perfect for bands, DJs, presentations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">14 disco balls, movable tiki bar, 4 large coolers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Two premium restrooms (nicest on Lake Travis)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Rearrangeable layout for custom event setups</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Ideal for: Large corporate events, big reunions, <Link href="/rehearsal-dinner" className="text-blue-600 hover:underline font-medium">weddings</Link>, <Link href="/birthday-parties" className="text-blue-600 hover:underline font-medium">major celebrations</Link>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Photo Strip - Medium and Large boats */}
            <BlogPhotoStrip 
              photos={[
                { 
                  src: BLOG_BOAT_PHOTOS.medium.src, 
                  alt: BLOG_BOAT_PHOTOS.medium.alt, 
                  caption: 'Meeseeks: Perfect for 20-30 guests' 
                },
                { 
                  src: BLOG_BOAT_PHOTOS.large.src, 
                  alt: BLOG_BOAT_PHOTOS.large.alt, 
                  caption: 'Clever Girl: Up to 75 guests' 
                },
              ]}
              columns={2}
            />

            {/* What's Included */}
            <Card className="bg-gradient-to-br from-brand-blue to-blue-700 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Anchor className="h-6 w-6" />
                  Every Large Group Cruise Includes
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Professional Licensed Captain (CPR Certified)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">All Fuel & Boat Operating Fees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Multiple Coolers with Ice & Cups</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Premium Bluetooth Sound Systems</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Life Jackets for All Passengers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Lily Pad Floats for Swimming</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Clean Restroom Facilities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">BYOB (Bring Your Own Beverages)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <span className="font-semibold">Defibrillators & Safety Equipment</span>
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
            <h2 className="text-4xl font-black text-center text-gray-900 dark:text-white mb-12">
              Large Group Planning Essentials
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-brand-blue" />
                    Book Well in Advance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Large group events require 4-12 weeks advance booking, especially for peak season (April-September) and weekends. Our larger boats book out quickly for corporate events and major celebrations. For the best austin boat rental experience, <Link href="/chat" className="text-blue-600 hover:underline font-medium">get your quote</Link> today to secure your preferred date!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="h-6 w-6 text-brand-blue" />
                    Accurate Head Count
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Provide accurate guest counts early: 20-30 guests → Mid-size boat, 31-75 guests → Clever Girl. Strict capacity limits enforced for safety. We'll help you choose the perfect vessel!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Music className="h-6 w-6 text-brand-blue" />
                    Entertainment & Activities
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Add professional DJ, photographer, or live music. Our boats have premium sound systems and stages (check out our <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-medium">ATX Disco Cruise</Link> for a pre-planned party experience). Plan <Link href="/team-building" className="text-blue-600 hover:underline font-medium">team-building activities</Link>, swimming stops, or scenic cruising routes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Ship className="h-6 w-6 text-brand-blue" />
                    Transportation & Logistics
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Coordinate group transportation to Anderson Mill Marina. We offer 14-person sprinter vans at 25% discount. Plan early arrival for parking, loading coolers, and group photos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Real Party Moments Gallery */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <BlogPartyGallery title="Real Large Group Celebrations on Lake Travis" />
          </div>
        </div>
      </section>

      {/* Premium Add-Ons */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Sparkles className="h-12 w-12 text-brand-blue mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Elevate Your Large Group Event
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Premium add-ons to make your celebration extraordinary
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Music className="h-10 w-10 text-brand-blue flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Professional DJ Service
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Expert DJs who read the crowd and keep energy high. Perfect for corporate events, reunions, and celebrations. Custom playlists available.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-cyan-200 dark:border-cyan-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Camera className="h-10 w-10 text-cyan-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Professional Photography
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Capture every moment of your large group event. Group photos, candids, and action shots. Digital delivery included.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Anchor className="h-10 w-10 text-purple-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Additional Water Toys & Floats
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Extra lily pads, unicorn floats, and water toys for large groups. More fun, more memories!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Ship className="h-10 w-10 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Group Transportation
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        14-person sprinter van rentals at 25% discount for Premier Party Cruises guests. Coordinate seamless group arrival.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dance Floor / Group Photo Break */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <BlogImageBreak 
              src={BLOG_PARTY_PHOTOS.dancing.src}
              alt={BLOG_PARTY_PHOTOS.dancing.alt}
              caption="Our boats feature spacious dance floors perfect for large group celebrations"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center text-gray-900 dark:text-white mb-12">
              Large Group Event FAQs
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    How far in advance should we book for a large corporate event?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We recommend 4-12 weeks in advance for groups of 20+ people, especially for weekends and peak season (April-September). Large <Link href="/corporate-events" className="text-blue-600 hover:underline font-medium">corporate events</Link> often book 2-3 months ahead. <Link href="/chat" className="text-blue-600 hover:underline font-medium">Contact us</Link> at (512) 488-5892 to check availability!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Can we bring our own catering for a large group?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes! All cruises are BYOB and you can bring food. Our boats have space for catering setups. Many corporate clients bring catered meals, while reunions often do potluck-style. We provide coolers with ice for beverages (cans/plastic only, no glass). Need drinks? Try <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Party On Delivery</a> for convenient alcohol delivery to your group.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    What's the difference between the 25-30 and 50-75 person boats?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Meeseeks & The Irony (25-30) is perfect for mid-size groups with raised stage and premium sound. Clever Girl (50-75) is our flagship with massive 20x50ft dance floor, full stage, 14 disco balls, tiki bar, two restrooms, and room for up to 75 guests. Both are BYOB with professional crews!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Can we customize the cruise route for our event?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Absolutely! Our experienced captains work with you to create the perfect route - scenic cruising, anchored swimming spots, sunset viewing areas, or a mix. For <Link href="/corporate-events" className="text-blue-600 hover:underline font-medium">corporate events</Link>, we can even find quieter areas for presentations or <Link href="/team-building" className="text-blue-600 hover:underline font-medium">team activities</Link>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-cyan-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Plan Your<br />Large Group Event?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
              15+ years experience • Perfect safety record • 150,000+ guests served<br />
              Austin's trusted choice for large group Lake Travis celebrations!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-10 py-7 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                  data-testid="button-final-cta-quote"
                >
                  <Calendar className="mr-2 h-6 w-6" />
                  Get Group Quote
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

            <div className="text-sm text-blue-200">
              <p className="mb-2">📍 Anderson Mill Marina - 13993 FM 2769, Leander, TX 78641</p>
              <p>Available 7 days a week | BYOB cruises | Corporate invoicing available</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Phone, Sparkles, CheckCircle2, Users, Music, Ship, MapPin, Utensils, Camera, PartyPopper, Star, ChevronRight, Waves } from 'lucide-react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import { BlogImageBreak, BlogPhotoStrip, BlogPartyGallery, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';

export default function MustHavesAustinBacheloretteWeekend() {
  return (
    <div data-page-ready="must-haves-bachelorette-weekend" className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Helmet>
        <title>Must-Haves for the Perfect Austin Bachelorette Weekend | Premier Party Cruises</title>
        <meta 
          name="description" 
          content="Planning a bachelorette party in Austin, Texas? This complete weekend guide covers must-have activities from Lake Travis boat parties to Austin's best restaurants, nightlife, and insider tips for an unforgettable celebration." 
        />
        <meta 
          name="keywords" 
          content="Austin bachelorette party, bachelorette weekend Austin, Lake Travis party boat, Austin nightlife, bachelorette party ideas, Austin party planning" 
        />
        <link rel="canonical" href="https://premierpartycruises.com/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Must-Haves for the Perfect Austin Bachelorette Weekend" />
        <meta property="og:description" content="Complete weekend guide for an unforgettable Austin bachelorette party" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://premierpartycruises.com/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend" />
        <meta property="og:image" content="https://premierpartycruises.com/attached_assets/bachelor-party-group-guys.webp" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Must-Haves for the Perfect Bachelorette Weekend in Austin, Texas",
            "description": "Planning a bachelorette party in Austin, Texas? This complete weekend guide covers must-have activities from Lake Travis boat parties to Austin's best restaurants, nightlife, and insider tips.",
            "image": "https://premierpartycruises.com/attached_assets/bachelor-party-group-guys.webp",
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
            "datePublished": "2025-01-31",
            "dateModified": "2025-11-12",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://premierpartycruises.com/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend"
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

      <PublicNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              <span className="text-sm font-semibold">Your Ultimate Austin Bachelorette Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Must-Haves for the Perfect<br />
              <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                Austin Bachelorette Weekend
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              From Lake Travis party boats to Austin's best restaurants and nightlife.<br />
              Here's how you do it RIGHT!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
                  data-testid="button-hero-get-quote"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Party Boat
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

      {/* Introduction */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                So, it's really happening, isn't it?
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Chances are, if you are googling "bachelorette party in Austin, Texas"— you've got a pretty big task at hand. Planning the perfect bachelorette weekend in Austin requires attention to detail, but we're here to help. One minute it's just you and your besties eating two day old pizza off the counter after staying up too late studying for exams or partying the night before and before you know it… you or someone you know is the first to get engaged.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                The bad news is that planning a trip for multiple people can be…overwhelming. <Link href="/bachelorette-party-austin" className="text-brand-blue hover:underline font-semibold">Austin, Texas has become one of the nation's top bachelorette party destinations</Link> for a reason. With a lethal combination of the best food, music, and a culture that's unique to this town and this town only? It's not difficult to see why we have brides and grooms to-be FLOCKING here for their bachelorette weekend Austin celebrations.
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                BUT THERE ARE SO MANY CHOICES.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                How about this…we give you one itinerary that we believe in with our whole hearts, made by locals.
              </p>
            </div>
            
            <BlogImageBreak
              src={BLOG_PARTY_PHOTOS.bachelorette.src}
              alt={BLOG_PARTY_PHOTOS.bachelorette.alt}
              caption="Bride and besties celebrating on Lake Travis"
            />
          </div>
        </div>
      </section>

      {/* Thursday Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black">
                1
              </div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                THURSDAY
              </h2>
            </div>

            <Card className="mb-8 border-2 border-purple-200 dark:border-purple-900">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-purple-600" />
                      Arrival & Check-In
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Arriving on a Thursday evening is the move. Everyone has time to tie up loose ends in the morning, have a travel day, and get settled before the action really begins.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Fly into <strong>Austin Bergstrom International Airport</strong> and grab your rideshares to your hotel. In this scenario you are staying at <strong>The Kimpton Hotel Van Zandt</strong> on Rainey Street. Why? It's beautiful, has a pool and is conveniently located within stumbling distance of the action.
                    </p>
                    <a 
                      href="https://www.reservationdesk.com/hotel/613ac38/hotel-van-zandt-austin-tx/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      Kimpton Hotel Van Zandt <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <PartyPopper className="h-6 w-6 text-purple-600" />
                      Room Decor
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      If you are a bachelorette party the first best decision you have made is that you decided to hire <strong>Bach Babes</strong> beforehand, and they have decked out your hotel room in the theme you chose, DISCO COWGIRL. The bride walks in and is blown away, it's an instant mood.
                    </p>
                    <a 
                      href="https://www.bachbabes.com/austinform" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1 mb-2 block"
                    >
                      Bach Babes Austin <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Utensils className="h-6 w-6 text-purple-600" />
                    Dinner & Shopping
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        <strong>Allen's Boots</strong> - Purchase one of a kind Texan footwear to sport all weekend
                      </p>
                      <a 
                        href="https://www.allensboots.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        Visit Allen's Boots <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        <strong>Elizabeth Street Cafe</strong> - Vietnamese/French fusion. Everything on the menu is amazing, the drinks are fantastic.
                      </p>
                      <a 
                        href="https://elizabethstreetcafe.com/austin/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        View Menu <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      💡 <strong>Pro Tip:</strong> This first night is allllll about getting ready. This is a marathon, not a sprint!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Friday - THE BIG DAY */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black">
                2
              </div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                FRIDAY - THE BIG DAY!
              </h2>
            </div>

            {/* Party Boat Highlight */}
            <Card className="mb-8 border-4 border-brand-yellow shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Ship className="h-16 w-16 text-brand-blue mx-auto mb-4" />
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                    🎉 PARTY BOAT ON LAKE TRAVIS 🎉
                  </h3>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                    The squad is excited because today….you are going on a <strong>PARTY BOAT ON LAKE TRAVIS WITH PREMIER PARTY CRUISES</strong>!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">What's Included:</h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>Professional DJ</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>Professional photographer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>Experienced captains</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>Coolers, ice, water, cups</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>Lily pads for the water</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>Mimosa setup for each party</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 p-6 rounded-lg">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">Why It's Perfect:</h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-brand-yellow flex-shrink-0 mt-0.5 fill-brand-yellow" />
                        <span>Priced per ticket (easy payments)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-brand-yellow flex-shrink-0 mt-0.5 fill-brand-yellow" />
                        <span>Meet other bach parties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-brand-yellow flex-shrink-0 mt-0.5 fill-brand-yellow" />
                        <span>Dance, swim, and celebrate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-brand-yellow flex-shrink-0 mt-0.5 fill-brand-yellow" />
                        <span>4-hour cruise (12pm-4pm)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/bachelorette-party-austin">
                    <Button 
                      size="lg" 
                      className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-lg px-8 py-6"
                      data-testid="button-book-party-boat"
                    >
                      <Ship className="mr-2 h-5 w-5" />
                      Book Your Party Boat Now
                    </Button>
                  </Link>
                </div>
                
                <BlogPhotoStrip
                  photos={[
                    { src: BLOG_BOAT_PHOTOS.medium.src, alt: BLOG_BOAT_PHOTOS.medium.alt, caption: 'Perfect for bachelorette groups of 15-30' },
                    { src: BLOG_BOAT_PHOTOS.large.src, alt: BLOG_BOAT_PHOTOS.large.alt, caption: 'Flagship boat for larger parties' }
                  ]}
                  columns={2}
                />
              </CardContent>
            </Card>

            {/* Rest of Friday */}
            <Card className="mb-8 border-2 border-blue-200 dark:border-blue-900">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  The Rest of Your Friday
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      AM
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Breakfast at Taco Deli</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Everyone walks to get breakfast tacos, only fifteen minutes away. DO NOT SKIP THE DOÑA SAUCE if you like spicy things.
                      </p>
                      <a 
                        href="https://locations.tacodeli.com/tacodeli-5346fd3548f4" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        View Tacodeli <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      PM
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Dinner at Kemuri Tatsuya</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Fun and wild surprises in shareable dishes and the drinks come in kitschy containers like tiki cats!
                      </p>
                      <a 
                        href="https://kemuri-tatsuya.com/location/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        View Restaurant <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      <Music className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">White Horse for Live Music</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Meet up with the other groups from the disco cruise on the East Side for live music and two stepping.
                      </p>
                      <a 
                        href="https://www.thewhitehorseaustin.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        The White Horse <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Saturday */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black">
                3
              </div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                SATURDAY
              </h2>
            </div>

            <Card className="mb-8 border-2 border-green-200 dark:border-green-900">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Waves className="h-6 w-6 text-green-600" />
                      Morning Recovery at Barton Springs
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Get up and don't worry about getting too ready or feeling hungover, you are grabbing smoothie bowls and vegan breakfast items at <strong>Juiceland</strong>, and heading to <strong>Barton Springs</strong>. Jump into the cold spring water together, nap on blankets, people watch, and enjoy the skyline.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href="https://www.juiceland.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        JuiceLand <ChevronRight className="h-4 w-4" />
                      </a>
                      <a 
                        href="https://www.austintexas.gov/department/barton-springs-pool" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        Barton Springs Pool <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Utensils className="h-6 w-6 text-green-600" />
                      Lunch at Terry Black's BBQ
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      You really can't leave Austin without tacos and barbecue, it's just not allowed. Casual and messy food after swimming go hand in hand.
                    </p>
                    <a 
                      href="https://www.terryblacksbbq.com/austin" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      Terry Black's BBQ <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Utensils className="h-6 w-6 text-green-600" />
                      Fancy Dinner at Justine's Brasserie
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Escargot, Steak Frites, fantastic drinks— it's the best for a fancy night out. One of Austin's most beloved restaurants frequented by locals and travelers alike.
                    </p>
                    <a 
                      href="https://justines1937.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      Justine's Brasserie <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Camera className="h-6 w-6 text-green-600" />
                      Lumiere Tintype Photography
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Make an appointment at <strong>Lumiere Tintype</strong>, located in the back garden of Justine's. These beautiful and unique old fashioned portraits are the kind of intensely special thing your grandkids will keep around.
                    </p>
                    <a 
                      href="http://lumieretintype.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      Lumiere Tintype <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Music className="h-6 w-6 text-green-600" />
                      Nightlife at Coconut Club
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Burn it down at <strong>Coconut Club and Neon Grotto</strong>. This club has different levels, themes, DJs, a rooftop spot— it's perfect. Invite all the friends you've made at the Disco Cruise!
                    </p>
                    <a 
                      href="https://www.instagram.com/coconutclub.austin/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      Coconut Club <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                
                <BlogPhotoStrip
                  photos={[
                    { src: BLOG_PARTY_PHOTOS.float.src, alt: BLOG_PARTY_PHOTOS.float.alt, caption: 'Float party vibes on Lake Travis' },
                    { src: BLOG_PARTY_PHOTOS.tropical.src, alt: BLOG_PARTY_PHOTOS.tropical.alt, caption: 'Tropical celebration with the crew' }
                  ]}
                  columns={2}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sunday */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black">
                4
              </div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                SUNDAY
              </h2>
            </div>

            <Card className="mb-8 border-2 border-orange-200 dark:border-orange-900">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Final Brunch at Banger's
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Well. That went by fast. It's time to get ready to leave— you are exhausted and sore from all the dancing and laughing you've put your body through.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  <strong>Banger's Brunch</strong> is your last hoorah. Get there right when it opens, get the giant Manmosas, enjoy live music and incredible food, cheers your bride and say goodbye to your group— it's been a legendary trip.
                </p>
                <a 
                  href="https://bangersaustin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1 text-lg"
                >
                  Banger's Sausage House & Beer Garden <ChevronRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
            
            <BlogPartyGallery title="Your Austin Bachelorette Awaits" />
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <PartyPopper className="h-16 w-16 mx-auto mb-6" />
            <p className="text-xl mb-8 leading-relaxed">
              When it comes to options for this city, we know they are endless. That's why this is only the first of several itineraries we are putting out. At Premier we take fun and friendship seriously, and we want you to have a BLAST with your crew on your bachelorette party in Austin, Texas.
            </p>
            <p className="text-3xl font-black mb-4">
              Life is short
            </p>
            <p className="text-xl mb-8">
              Follow the call of the Disco Ball, live it up, hug your friends, celebrate love, and eat tacos
            </p>
            <Link href="/chat">
              <Button 
                size="lg" 
                className="bg-brand-yellow hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6"
                data-testid="button-cta-bottom"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Start Planning Your Weekend
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

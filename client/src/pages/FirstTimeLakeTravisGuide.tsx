import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { SectionReveal } from '@/components/SectionReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LazyImage } from '@/components/LazyImage';
import { TableOfContents } from '@/components/TableOfContents';
import { StickyCTA } from '@/components/StickyCTA';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { BlogImageBreak, BlogPhotoStrip, BlogPartyGallery, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';
import { 
  Anchor, Ship, Users, Calendar, Shield, Music, Camera, Waves, 
  ChevronRight, Phone, Sparkles, CheckCircle2, Clock, MapPin,
  Sun, Compass, LifeBuoy, PartyPopper, Star, DollarSign, 
  MessageCircle, Heart, Umbrella, Thermometer
} from 'lucide-react';
import { Link } from 'wouter';

const tableOfContents = [
  { id: 'choose-boat', title: 'Choosing Your Perfect Boat' },
  { id: 'fleet-gallery', title: 'Our Fleet Photo Gallery' },
  { id: 'what-to-expect', title: 'What to Expect on Your First Cruise' },
  { id: 'safety', title: 'Safety & Responsible Fun' },
  { id: 'pricing', title: 'Pricing & Packages' },
  { id: 'planning-tips', title: 'Party Planning Tips' },
  { id: 'faq', title: 'Frequently Asked Questions' }
];

const fleetPhotos = [
  { src: '/attached_assets/day-tripper-14-person-boat.webp', alt: 'Day Tripper - 14 person party boat on Lake Travis', title: 'Day Tripper (14 guests)' },
  { src: '/attached_assets/meeseeks-25-person-boat.webp', alt: 'Meeseeks - 25 person party boat for Lake Travis cruises', title: 'Meeseeks (20-30 guests)' },
  { src: '/attached_assets/clever-girl-50-person-boat.webp', alt: 'Clever Girl - 75 person flagship party boat', title: 'Clever Girl (31-75 guests)' },
  { src: '/attached_assets/atx-disco-cruise-party.webp', alt: 'ATX Disco Cruise party atmosphere on Lake Travis', title: 'ATX Disco Cruise' },
  { src: '/attached_assets/giant-unicorn-float.webp', alt: 'Giant unicorn float included with Lake Travis boat rentals', title: 'Giant Floats Included' },
  { src: '/attached_assets/dancing-party-scene.webp', alt: 'Party scene dancing on Lake Travis boat cruise', title: 'Epic Party Vibes' },
];

export default function FirstTimeLakeTravisGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" data-page-ready="first-time-guide">
      <SEOHead 
        pageRoute="/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning"
        defaultTitle="Lake Travis Boat Rental Guide | Austin Party Boat Tips for First-Timers"
        defaultDescription="Planning your first Lake Travis boat rental? Expert guide to choosing boats, safety, pricing, and Austin party planning. 15+ years experience, 150,000+ guests."
        defaultKeywords={[
          'lake travis boat rental',
          'austin party planning',
          'first time boat rental',
          'lake travis guide',
          'party boat austin',
          'bachelor party lake travis',
          'bachelorette party austin',
          'austin boat rental',
          'lake travis party boat'
        ]}
      />
      <PublicNavigation />
      <Breadcrumb />
      
      <StickyCTA 
        primaryText="Get Your Quote"
        primaryHref="/chat"
        secondaryText="Call Now"
        secondaryHref="tel:+15124885892"
      />

      {/* Hero Section */}
      <SectionReveal>
        <section className="relative bg-gradient-to-br from-brand-blue via-blue-600 to-blue-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <LazyImage 
              src="/attached_assets/party-atmosphere-2.webp"
              alt="Lake Travis party boat experience"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Sparkles className="h-4 w-4 text-brand-yellow" />
                <span className="text-sm font-semibold">Your Complete Lake Travis Guide</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Lake Travis Boat Rental Guide:<br />
                <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
                  Austin Party Boat Tips
                </span>
                <br />for First-Timers
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
                  <span>15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-brand-yellow" />
                  <span>150,000+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-yellow" />
                  <span>Perfect Safety Record</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <TableOfContents sections={tableOfContents} />

      {/* Introduction Section */}
      <SectionReveal>
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Austin, Texas boasts vibrant culture and the stunning <strong>Lake Travis</strong>. A <strong>party boat rental</strong> offers the perfect blend of excitement and scenic beauty. Whether you're planning a <Link href="/bachelor-party-austin" className="text-blue-600 hover:text-blue-700 font-semibold">bachelor party</Link>, <Link href="/bachelorette-party-austin" className="text-blue-600 hover:text-blue-700 font-semibold">bachelorette celebration</Link>, <Link href="/birthday-parties" className="text-blue-600 hover:text-blue-700 font-semibold">birthday</Link>, or <Link href="/corporate-events" className="text-blue-600 hover:text-blue-700 font-semibold">corporate event</Link>, understanding <strong>Lake Travis boat rentals</strong> is key to a seamless, unforgettable day on the water.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  This comprehensive guide from <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">Premier Party Cruises</Link> equips you with everything you need to know for your first <strong>Austin boat rental</strong>, ensuring confident planning and smooth party execution.
                </p>
              </div>

              <BlogPhotoStrip 
                photos={[
                  BLOG_BOAT_PHOTOS.small,
                  BLOG_BOAT_PHOTOS.medium,
                  BLOG_BOAT_PHOTOS.large
                ]}
                columns={3}
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Choosing Your Vessel Section */}
      <SectionReveal>
        <section id="choose-boat" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-600 text-white font-bold px-4 py-2">
                  CHOOSE YOUR BOAT
                </Badge>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                  Choose Your Perfect Party Boat
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Premier Party Cruises operates custom-built, high-end single-deck party boats on Lake Travis. With 15+ years of experience and 150,000+ satisfied customers, we ensure your celebration is perfect.
                </p>
              </div>

              {/* Fleet Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Day Tripper */}
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700">
                  <div className="relative h-48">
                    <LazyImage
                      src="/attached_assets/day-tripper-14-person-boat.webp"
                      alt="Day Tripper 14-person boat for intimate Lake Travis parties"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Day Tripper</h3>
                    <p className="text-blue-600 font-bold mb-3">Up to 14 Guests</p>
                    <div className="text-2xl font-black text-brand-blue mb-3">$800-$1,400</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">4-hour cruise (varies by day)</p>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Perfect for intimate groups</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Bluetooth speaker system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Lily pad float included</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Meeseeks */}
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-blue-500 ring-2 ring-blue-500">
                  <Badge className="absolute top-4 right-4 bg-blue-600 text-white font-bold z-10">
                    MOST POPULAR
                  </Badge>
                  <div className="relative h-48">
                    <LazyImage
                      src="/attached_assets/meeseeks-25-person-boat.webp"
                      alt="Meeseeks 25-person boat for Lake Travis party cruises"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Meeseeks / The Irony</h3>
                    <p className="text-blue-600 font-bold mb-3">15-30 Guests</p>
                    <div className="text-2xl font-black text-brand-blue mb-3">$1,400-$2,200</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">4-hour cruise (varies by day)</p>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>2 identical boats available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Premium sound system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Large lily pad + floats</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Clever Girl */}
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700">
                  <div className="relative h-48">
                    <LazyImage
                      src="/attached_assets/clever-girl-50-person-boat.webp"
                      alt="Clever Girl 75-person flagship party boat with 14 disco balls"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Clever Girl</h3>
                    <p className="text-blue-600 font-bold mb-3">31-75 Guests</p>
                    <div className="text-2xl font-black text-brand-blue mb-3">$2,400-$4,200</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">4-hour cruise (varies by day)</p>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>14 disco balls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Austin's largest party boat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Premium DJ sound system</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Fleet Photo Gallery */}
      <SectionReveal>
        <section id="fleet-gallery" className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-purple-600 text-white font-bold px-4 py-2">
                SEE OUR BOATS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                Lake Travis Party Boat Gallery
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Take a look at our fleet and see what makes Premier Party Cruises the top choice for Lake Travis boat rentals
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {fleetPhotos.map((photo, index) => (
                <div 
                  key={index}
                  className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group aspect-square"
                >
                  <LazyImage
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-bold">{photo.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* What to Expect Section */}
      <SectionReveal>
        <section id="what-to-expect" className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-600 text-white font-bold px-4 py-2">
                  WHAT'S INCLUDED
                </Badge>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                  What to Expect on Your First Cruise
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Every Premier Party Cruises rental includes everything you need for an epic day on Lake Travis
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Ship className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Professional Captain</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Licensed, CPR-certified captain handles all navigation so you can relax</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Music className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Premium Sound</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Bluetooth speakers to play your own music and party playlists</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Waves className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Giant Floats</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">6x20' lily pad floats, unicorn floats, and water toys included</p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Umbrella className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Coolers & Ice</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Coolers with ice provided for your BYOB beverages</p>
                  </CardContent>
                </Card>
              </div>

              <BlogImageBreak 
                src={BLOG_PARTY_PHOTOS.celebration.src}
                alt={BLOG_PARTY_PHOTOS.celebration.alt}
                caption="Your captain makes every celebration special - champagne pop included!"
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Safety Section */}
      <SectionReveal>
        <section id="safety" className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-600 text-white font-bold px-4 py-2">
                  YOUR SAFETY MATTERS
                </Badge>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                  Safety & Responsible Fun on Lake Travis
                </h2>
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Safety is paramount on <strong>Lake Travis</strong>. Premier Party Cruises has maintained a <strong>perfect safety record</strong> over 15+ years serving 150,000+ guests. All our boats are fully equipped with TPWD-approved safety equipment, and every cruise is led by a licensed, CPR-certified captain who prioritizes your group's wellbeing.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <LifeBuoy className="h-10 w-10 text-green-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Life Jackets</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">TPWD-approved life jackets available for all passengers</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <Shield className="h-10 w-10 text-blue-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Licensed Captain</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Professional, CPR-certified captain handles all navigation</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-6">
                    <Star className="h-10 w-10 text-purple-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Perfect Record</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">15+ years of safe cruises with countless happy guests</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Pricing Section */}
      <SectionReveal>
        <section id="pricing" className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-500 text-black font-bold px-4 py-2">
                  TRANSPARENT PRICING
                </Badge>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                  Lake Travis Boat Rental Pricing
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  All-inclusive pricing with no hidden fees. Captain, fuel, and amenities included!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-2 border-blue-300 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <Ship className="h-6 w-6" />
                      Private Cruises
                    </CardTitle>
                    <p className="text-blue-100">Exclusive boat for your group</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="font-medium">Day Tripper (1-14)</span>
                        <span className="font-bold text-blue-600">$800-$1,400</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="font-medium">Meeseeks (15-30)</span>
                        <span className="font-bold text-blue-600">$1,400-$2,200</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="font-medium">Clever Girl (31-75)</span>
                        <span className="font-bold text-blue-600">$2,400-$4,200</span>
                      </div>
                      <p className="text-sm text-gray-500">*Prices vary by day of week. All 4-hour cruises.</p>
                    </div>
                    <Link href="/private-cruises">
                      <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                        View Private Cruise Options
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-300 hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <PartyPopper className="h-6 w-6" />
                      ATX Disco Cruise
                    </CardTitle>
                    <p className="text-purple-100">Join the party (per person)</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="font-medium">Standard Ticket</span>
                        <span className="font-bold text-purple-600">$85-$105/person</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="font-medium">Professional DJ</span>
                        <span className="text-green-600">Included</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="font-medium">Photographer</span>
                        <span className="text-green-600">Included</span>
                      </div>
                      <p className="text-sm text-gray-500">*3-5 bachelor/bachelorette parties cruise together!</p>
                    </div>
                    <Link href="/atx-disco-cruise">
                      <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                        Learn About Disco Cruise
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Planning Tips Section */}
      <SectionReveal>
        <section id="planning-tips" className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-orange-500 text-white font-bold px-4 py-2">
                  PRO TIPS
                </Badge>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                  First-Time Party Planning Tips
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-8 w-8 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Book Early</h4>
                        <p className="text-gray-600 dark:text-gray-400">Popular dates book weeks in advance, especially during peak season (April-September). Reserve your date as soon as you know your plans!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Sun className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Pack Smart</h4>
                        <p className="text-gray-600 dark:text-gray-400">Bring sunscreen, towels, swimwear, sunglasses, and your BYOB beverages in cans/plastic. We provide coolers with ice and cups!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Arrive 15 Min Early</h4>
                        <p className="text-gray-600 dark:text-gray-400">Meet at Anderson Mill Marina (13993 FM 2769, Leander TX 78641). Free parking available. Arrive early to load coolers and get settled!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Thermometer className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Check Weather</h4>
                        <p className="text-gray-600 dark:text-gray-400">Texas weather can change quickly. We monitor conditions and will contact you if there are any concerns about your cruise date.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <section id="faq" className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gray-800 text-white font-bold px-4 py-2">
                  GOT QUESTIONS?
                </Badge>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      What boats can I rent on Lake Travis?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Premier Party Cruises offers three boat sizes: Day Tripper (up to 14 guests), Meeseeks/The Irony (15-30 guests), and Clever Girl (31-75 guests). All are custom-built party boats with premium amenities.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Is alcohol allowed on Lake Travis boat rentals?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Yes! All Premier Party Cruises are BYOB (Bring Your Own Beverages). We provide coolers with ice and cups. Please bring beverages in cans or plastic containers only (no glass). You must be 21+ to consume alcohol.
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
                      We recommend booking as early as possible, especially for peak season (April-September) and weekends. Popular dates can book out weeks or months in advance. Contact us at (512) 488-5892 to check availability!
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      What should I bring for a day on Lake Travis?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Essentials include: sunscreen, towels, swimwear, hats, sunglasses, water, and your BYOB beverages in cans/plastic. We provide coolers with ice, cups, Bluetooth speakers, lily pad floats, and all safety equipment.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      What's the difference between a private cruise and the ATX Disco Cruise?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      A private cruise gives you exclusive use of the boat for your group (4-hour rental). The ATX Disco Cruise is a shared 4-hour experience where 3-5 bachelor/bachelorette parties cruise together with a professional DJ and photographer. Disco Cruise starts at $85/person, while private cruises range from $800-$4,200.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <BlogPartyGallery title="See What Your Lake Travis Party Could Look Like" />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA Section */}
      <SectionReveal>
        <section className="py-20 bg-gradient-to-br from-brand-blue via-blue-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <LazyImage 
              src="/attached_assets/dancing-party-scene.webp"
              alt="Lake Travis party celebration"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Your Unforgettable Lake Travis Adventure Awaits
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
                With 15+ years of experience, countless happy guests, and a perfect safety record, Premier Party Cruises is Austin's trusted choice for Lake Travis celebrations. Let's plan your perfect party boat experience!
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
                <p className="mb-2">Anderson Mill Marina - 13993 FM 2769, Leander, TX 78641</p>
                <p>Available 7 days a week | Same-day quotes | Flexible booking options</p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <QuoteBuilderSection />

      <Footer />
    </div>
  );
}

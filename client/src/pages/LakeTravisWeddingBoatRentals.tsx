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
import { 
  Heart, Ship, Users, Calendar, Music, Camera, Sparkles, 
  Sun, Wine, MapPin, Star, PartyPopper, Clock, Gift, 
  CheckCircle2, Crown, Gem, Trophy, Anchor, Utensils
} from 'lucide-react';
import { Link } from 'wouter';

const tableOfContents = [
  { id: 'why-wedding-boat', title: 'Why Choose a Wedding Boat on Lake Travis' },
  { id: 'ceremony-boats', title: 'Boat Wedding Ceremonies' },
  { id: 'rehearsal-dinners', title: 'Rehearsal Dinners on the Water' },
  { id: 'welcome-parties', title: 'Welcome Parties & After-Parties' },
  { id: 'venue-options', title: 'Boat Size & Venue Options' },
  { id: 'planning-guide', title: 'Wedding Boat Planning Guide' },
  { id: 'pricing-packages', title: 'Wedding Package Pricing' },
  { id: 'real-weddings', title: 'Real Wedding Stories' }
];

export default function LakeTravisWeddingBoatRentals() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <SEOHead 
        pageRoute="/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations"
        defaultTitle="Lake Travis Wedding Boat Rentals: Unique Venues for Austin Celebrations"
        defaultDescription="Discover unique Lake Travis wedding boat rentals for ceremonies, rehearsal dinners & receptions. Create unforgettable Austin wedding celebrations on the water!"
        defaultKeywords={[
          'lake travis wedding boat',
          'wedding boat rental austin',
          'boat wedding ceremony',
          'lake travis wedding venues',
          'rehearsal dinner boat',
          'austin wedding boats',
          'unique wedding venues austin',
          'lake travis wedding',
          'boat reception venue',
          'austin lake wedding'
        ]}
      />
      <PublicNavigation />
      <Breadcrumb />
      
      <StickyCTA 
        primaryText="Plan Your Wedding Boat Event"
        primaryHref="/chat"
        secondaryText="Call Now"
        secondaryHref="tel:+15124885892"
      />

      <SectionReveal>
        <section className="relative py-24 px-6 bg-gradient-to-br from-blue-600 via-pink-600 to-purple-600 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <LazyImage 
              src="/attached_assets/party-atmosphere-2.webp"
              alt="Lake Travis wedding boat rental celebration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Heart className="h-16 w-16 text-pink-300 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 text-white drop-shadow-lg">
              Lake Travis Wedding Boat Rentals: Unique Venues for Austin Celebrations
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Create magical wedding moments on Lake Travis! From intimate boat ceremonies to grand rehearsal dinners and unforgettable receptions, discover Austin's most unique wedding venue option.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Updated November 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span>5.0 Rating</span>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <TableOfContents sections={tableOfContents} />

      <SectionReveal>
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Searching for a truly unique wedding venue? <strong>Lake Travis wedding boat</strong> rentals offer an unforgettable alternative to traditional venues! Whether you're planning an intimate <strong>boat wedding ceremony</strong> with just immediate family, a stunning <strong>rehearsal dinner boat</strong> celebration, or a complete <strong>boat reception venue</strong> experience, Lake Travis provides the breathtaking backdrop for your <strong>austin wedding boats</strong> celebration. <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">Premier Party Cruises</Link> specializes in creating magical <strong>lake travis wedding venues</strong> on the water.
              </p>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Austin couples are increasingly choosing <strong>wedding boat rental austin</strong> options for their celebrations because they offer stunning Hill Country views, built-in photography locations, and a unique experience guests will never forget. Your <strong>lake travis wedding</strong> combines outdoor beauty with climate-controlled comfort, professional service with casual elegance, and traditional romance with adventurous spirit. This makes <strong>unique wedding venues austin</strong> on Lake Travis perfect for couples who want to break from convention while still creating an elegant, memorable celebration.
              </p>

              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                This comprehensive guide explores everything you need to know about <strong>austin lake wedding</strong> celebrations on boats. From choosing the right vessel for your <strong>boat wedding ceremony</strong> to coordinating logistics for your <strong>rehearsal dinner boat</strong> event, we'll show you how to transform your wedding vision into reality on the beautiful waters of Lake Travis. Discover why more couples are saying "I do" aboard these stunning <strong>lake travis wedding boat</strong> venues!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="hover:shadow-xl transition-all rounded-xl border-2 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Romantic Setting</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Perfect backdrop for <strong>boat wedding ceremony</strong> moments
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all rounded-xl border-2 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Camera className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Photo-Ready</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Stunning views for <strong>lake travis wedding</strong> photos
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all rounded-xl border-2 border-pink-200">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">All-Inclusive</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Complete <strong>wedding boat rental austin</strong> packages
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-16 bg-gradient-to-b from-white to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-pink-500 text-white font-bold px-4 py-2">
                OUR WEDDING FLEET
              </Badge>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                Choose Your Perfect Boat for Your Wedding Event
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                From intimate elopements to grand celebrations, we have the perfect vessel for every wedding moment
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64">
                  <LazyImage
                    src="/attached_assets/day-tripper-14-person-boat.webp"
                    alt="Day Tripper 14-person boat perfect for intimate wedding ceremonies"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Day Tripper</h3>
                  <p className="text-pink-600 font-bold mb-3">Perfect for 1-14 guests</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Ideal for intimate elopements, small ceremonies, or bridal party celebrations
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Intimate ceremony space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Premium sound system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Perfect for elopements</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 ring-2 ring-pink-500">
                <Badge className="absolute top-4 right-4 bg-pink-500 text-white font-bold z-10">
                  MOST POPULAR
                </Badge>
                <div className="relative h-64">
                  <LazyImage
                    src="/attached_assets/meeseeks-25-person-boat.webp"
                    alt="Me Seeks 25-person boat for wedding parties and rehearsal dinners"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Me Seeks / The Irony</h3>
                  <p className="text-pink-600 font-bold mb-3">Perfect for 15-30 guests</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Best for wedding ceremonies, rehearsal dinners, and bridal showers
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Ceremony & reception space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Multiple photo locations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>2 boats available</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64">
                  <LazyImage
                    src="/attached_assets/clever-girl-50-person-boat.webp"
                    alt="Clever Girl 50-person flagship boat for large weddings and receptions"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Clever Girl</h3>
                  <p className="text-pink-600 font-bold mb-3">Perfect for 31-75 guests</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Our flagship vessel - perfect for large ceremonies and wedding receptions
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Full reception capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Dancing & entertainment space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Premium lighting & sound</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => window.location.href = '/chat'}
                className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Heart className="h-5 w-5 mr-2" />
                Get Your Custom Wedding Quote
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="why-wedding-boat" className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Why Choose a Wedding Boat on Lake Travis
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Choosing a <strong>lake travis wedding boat</strong> for your celebration offers advantages that traditional venues simply can't match. Your guests will experience 360-degree views of the stunning Texas Hill Country, crystal-clear blue waters, and unforgettable sunsets—all without leaving the venue! A <strong>wedding boat rental austin</strong> provides a naturally beautiful setting that requires minimal decoration, saving you money while creating maximum wow-factor for your <strong>austin wedding boats</strong> event. Plus, the intimate boat setting keeps your wedding party and guests together in one space, fostering connection and celebration.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                <strong>Lake travis wedding venues</strong> on boats offer incredible flexibility for your celebration style. Want a casual, relaxed vibe? A daytime <strong>boat wedding ceremony</strong> with swimming afterward fits perfectly. Prefer elegant sophistication? Sunset cruises with champagne toasts create pure magic during your <strong>lake travis wedding</strong>. <Link href="/wedding-parties" className="text-blue-600 hover:text-blue-700 font-semibold">Wedding party options</Link> from <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">Premier Party Cruises</Link> accommodate 14 to 75 guests, making them perfect for intimate elopements or larger celebrations for your <strong>unique wedding venues austin</strong> experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="rounded-xl hover:shadow-lg transition-shadow border-2 border-pink-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Heart className="h-8 w-8 text-pink-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Stunning Natural Beauty</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Lake Travis provides breathtaking backdrops for your <strong>boat wedding ceremony</strong> without expensive floral installations or decorations. The Hill Country scenery, sparkling water, and Texas sunsets create romance naturally for your <strong>austin lake wedding</strong>.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow border-2 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Camera className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Built-In Photo Locations</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your <strong>lake travis wedding boat</strong> offers dozens of stunning photo opportunities—sunset shots on the bow, intimate moments on the upper deck, and group photos with Hill Country views. Your photographer will love these <strong>lake travis wedding</strong> backdrops!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow border-2 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Users className="h-8 w-8 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Intimate Guest Experience</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Unlike sprawling venues where guests scatter, your <strong>wedding boat rental austin</strong> keeps everyone together in one beautiful space. This creates better mingling, stronger connections, and a more cohesive celebration during your <strong>boat reception venue</strong> event.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow border-2 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Trophy className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Memorable & Unique</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your guests have attended countless traditional weddings. A <strong>boat wedding ceremony</strong> or <strong>rehearsal dinner boat</strong> celebration stands out as truly special and memorable among <strong>unique wedding venues austin</strong> has to offer!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-pink-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-pink-600" />
                Perfect Austin Weather Year-Round
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Austin's mild climate makes <strong>lake travis wedding venues</strong> on boats perfect year-round! Spring (March-May) and fall (September-November) offer ideal temperatures for your <strong>austin wedding boats</strong> celebration, while summer evenings provide warm, romantic conditions for sunset ceremonies. Even winter months feature comfortable 60-70°F days perfect for your <strong>lake travis wedding</strong> on the water.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Our boats include both open-air deck areas and climate-controlled indoor spaces, ensuring comfort regardless of weather during your <strong>wedding boat rental austin</strong> event. This flexibility means you can plan your <strong>boat reception venue</strong> celebration with confidence any month of the year!
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="ceremony-boats" className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Boat Wedding Ceremonies on Lake Travis
            </h2>

            <div className="mb-8">
              <LazyImage 
                src="/attached_assets/party-atmosphere-1.webp"
                alt="Boat wedding ceremony on Lake Travis with Hill Country views"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Imagine exchanging vows with sparkling blue waters and Texas Hill Country scenery as your backdrop! A <strong>boat wedding ceremony</strong> on Lake Travis creates an incredibly romantic setting that photographs beautifully and provides guests with an unforgettable experience. Your <strong>lake travis wedding boat</strong> ceremony can be as intimate as just the two of you plus an officiant, or accommodate up to 75 guests for a larger celebration. The gentle rocking of the boat, the fresh lake breeze, and the stunning 360-degree views create pure magic for your <strong>austin lake wedding</strong> ceremony.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <Link href="/private-cruises" className="text-pink-600 hover:text-pink-700 font-semibold">Private cruise options</Link> give you complete control over your <strong>boat wedding ceremony</strong> timing, location on the lake, and ceremony details. Many couples choose sunset cruises for golden-hour "I do" moments, while others prefer daytime ceremonies followed by swimming and celebration. <Link href="/" className="text-pink-600 hover:text-pink-700 font-semibold">Premier Party Cruises</Link> works with your officiant, photographer, and any other vendors to ensure your <strong>lake travis wedding</strong> ceremony flows perfectly, making these some of the most sought-after <strong>unique wedding venues austin</strong> offers.
              </p>
            </div>

            <Card className="mb-8 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-pink-300 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Heart className="h-8 w-8 text-pink-600" />
                  Wedding Ceremony Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Intimate Elopements (2-14 guests)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Perfect for couples who want a private, romantic <strong>boat wedding ceremony</strong> with just close family or friends. Our 14-guest boat provides an intimate setting for your <strong>lake travis wedding</strong> elopement.
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                        <span>Private ceremony on the bow with Hill Country backdrop</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                        <span>Captain can serve as witness if needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                        <span>Champagne toast included for your <strong>austin wedding boats</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                        <span>Multiple ceremony location options on the lake</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6">
                    <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Small Ceremonies (15-50 guests)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Our 25 and 50-guest boats are ideal for traditional <strong>wedding boat rental austin</strong> ceremonies with your full wedding party and close friends and family during your <strong>lake travis wedding venues</strong> celebration.
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Spacious deck area for ceremony seating</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Sound system for music and officiant microphone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Room for ceremony + reception on same cruise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Coordination with your vendors for seamless <strong>boat wedding ceremony</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6">
                    <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Large Celebrations (51-75 guests)</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Our 75-guest boat accommodates larger weddings, perfect for couples who want all their loved ones present for their <strong>austin lake wedding</strong> ceremony among <strong>unique wedding venues austin</strong>.
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Two-level boat with multiple viewing areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Professional sound and lighting available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Full reception capabilities post-ceremony</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Climate-controlled indoor space for guests</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="my-12">
              <LazyImage 
                src="/attached_assets/giant-unicorn-float.webp"
                alt="Wedding party having fun on Lake Travis with water toys"
                className="w-full rounded-2xl shadow-2xl"
              />
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                Many couples add fun water activities after the ceremony - creating memorable moments for guests!
              </p>
            </div>

            <div className="mt-12 text-center">
              <Button 
                onClick={() => window.location.href = '/chat'}
                className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Heart className="h-5 w-5 mr-2" />
                Plan Your Boat Wedding Ceremony
              </Button>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Talk to our wedding specialists about <Link href="/wedding-parties" className="text-pink-600 hover:text-pink-700 font-semibold">wedding party packages</Link> and availability
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="rehearsal-dinners" className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Rehearsal Dinners on the Water
            </h2>

            <div className="mb-8">
              <LazyImage 
                src="/attached_assets/dancing-party-scene.webp"
                alt="Rehearsal dinner boat celebration on Lake Travis"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A <strong>rehearsal dinner boat</strong> celebration on Lake Travis sets the perfect tone for your wedding weekend! Instead of a stuffy restaurant or hotel ballroom, treat your wedding party and close family to an unforgettable evening on the water. Your <strong>lake travis wedding boat</strong> rehearsal dinner allows everyone to relax, bond, and enjoy Texas sunsets before the big day. This has become one of the most popular uses for <strong>lake travis wedding venues</strong> on boats, offering a unique alternative to traditional rehearsal dinner locations.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <Link href="/rehearsal-dinner" className="text-purple-600 hover:text-purple-700 font-semibold">Rehearsal dinner cruise options</Link> typically run 3-4 hours, giving you time for a scenic cruise, dinner service, toasts and speeches, and quality time with your closest loved ones. Many couples coordinate catering from their favorite Austin restaurants, while others opt for casual appetizer-style dining during their <strong>wedding boat rental austin</strong> rehearsal event. The relaxed boat atmosphere encourages mingling and creates a memorable kick-off to your <strong>austin wedding boats</strong> celebration weekend!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-purple-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-700 dark:text-purple-400">
                    <Utensils className="h-6 w-6 inline mr-2" />
                    Catering Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    For your <strong>rehearsal dinner boat</strong>, bring catered meals from favorite Austin restaurants aboard, or work with our recommended caterers who specialize in boat events for your <strong>lake travis wedding</strong> dinner.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>BBQ platters from famous Austin joints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Upscale plated dinners from fine dining restaurants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Casual taco bar or appetizer spreads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Dessert and cake service coordination</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-700 dark:text-blue-400">
                    <Wine className="h-6 w-6 inline mr-2" />
                    Beverage Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    All <strong>austin lake wedding</strong> boat events are BYOB! Coordinate beverage delivery to the marina via <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">Party On Delivery</a> for hassle-free service.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Wine and champagne for toasts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Beer and cocktails in pre-stocked coolers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Non-alcoholic options for all guests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Ice and coolers provided by the boat</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-pink-700 dark:text-pink-400">
                    <Music className="h-6 w-6 inline mr-2" />
                    Entertainment & Atmosphere
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Create the perfect mood for your <strong>rehearsal dinner boat</strong> with music, lighting, and optional entertainment during your <strong>boat reception venue</strong> rehearsal event.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Premium sound system for playlists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Microphone for toasts and speeches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Optional acoustic musician or DJ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Sunset timing for romantic atmosphere</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-green-700 dark:text-green-400">
                    <Users className="h-6 w-6 inline mr-2" />
                    Guest Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Your <strong>wedding boat rental austin</strong> rehearsal dinner creates bonding opportunities that traditional venues can't match for your <strong>unique wedding venues austin</strong> experience.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Intimate setting encourages conversation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Wedding parties bond before big day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Memorable photos with Hill Country backdrop</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Relaxed atmosphere reduces pre-wedding stress</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="my-12">
              <LazyImage 
                src="/attached_assets/bachelor-party-group-guys.webp"
                alt="Wedding party celebrating rehearsal dinner on Lake Travis boat"
                className="w-full rounded-2xl shadow-2xl"
              />
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                Your rehearsal dinner sets the tone for an amazing wedding weekend - celebrate in style on Lake Travis!
              </p>
            </div>

          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="welcome-parties" className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Welcome Parties & After-Parties
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Beyond ceremonies and rehearsal dinners, <strong>lake travis wedding boat</strong> rentals excel for welcome parties and after-parties! A daytime welcome cruise the day before your wedding gives out-of-town guests a fun introduction to Austin while wedding parties can bond. Similarly, a day-after brunch cruise or afternoon celebration extends your wedding weekend festivities. These <strong>lake travis wedding venues</strong> events create additional opportunities for quality time with loved ones during your <strong>austin wedding boats</strong> celebration weekend.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <Link href="/welcome-party" className="text-blue-600 hover:text-blue-700 font-semibold">Welcome party cruises</Link> and <Link href="/after-party" className="text-blue-600 hover:text-blue-700 font-semibold">after-party celebrations</Link> let you maximize your time with guests who've traveled to celebrate your <strong>austin lake wedding</strong>. Many couples book multiple cruises during their wedding weekend—perhaps a casual <Link href="/atx-disco-cruise" className="text-blue-600 hover:text-blue-700 font-semibold">ATX Disco Cruise</Link> for the welcome party, a private boat for the rehearsal dinner, and another boat for post-wedding recovery brunch. This showcases why these are such popular <strong>unique wedding venues austin</strong> options!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-300 rounded-xl">
                <CardContent className="p-6">
                  <Sun className="h-12 w-12 text-blue-600 mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Welcome Party Ideas</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Kick off your wedding weekend with a fun <strong>wedding boat rental austin</strong> welcome cruise that gets everyone in the celebration spirit!
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Casual afternoon cruise with swimming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>BBQ and drinks on the lake</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Sunset cocktail cruise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Icebreaker games for guests to mingle</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 border-2 border-purple-300 rounded-xl">
                <CardContent className="p-6">
                  <PartyPopper className="h-12 w-12 text-purple-600 mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">After-Party Celebrations</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Extend the wedding festivities with a day-after <strong>lake travis wedding</strong> recovery cruise or celebration!
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Brunch cruise with mimosas and Bloody Marys</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Casual lake day with relaxed vibe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Photo sharing and wedding recap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Last quality time before guests depart</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="my-12">
              <LazyImage 
                src="/attached_assets/atx-disco-cruise-party.webp"
                alt="Wedding welcome party and after-party celebration on Lake Travis"
                className="w-full rounded-2xl shadow-2xl"
              />
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                Welcome parties and after-parties on Lake Travis create unforgettable memories for your wedding weekend!
              </p>
            </div>

          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="venue-options" className="py-16 bg-gradient-to-b from-white to-pink-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Boat Size & Venue Options
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Choosing the right boat size for your <strong>wedding boat rental austin</strong> event ensures everyone's comfort and creates the perfect atmosphere. <Link href="/private-cruises" className="text-pink-600 hover:text-pink-700 font-semibold">Private cruise fleet options</Link> from <Link href="/" className="text-pink-600 hover:text-pink-700 font-semibold">Premier Party Cruises</Link> range from intimate 14-guest vessels perfect for elopements to spacious 75-guest boats ideal for full wedding celebrations. Each boat offers unique features and layouts designed for different <strong>boat wedding ceremony</strong> and reception needs among our <strong>lake travis wedding venues</strong> options.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 border-blue-300 rounded-xl">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
                  <CardTitle className="text-xl text-center">14-Guest Boat</CardTitle>
                  <p className="text-3xl font-bold text-center text-blue-600 mt-2">$1,050-$1,380</p>
                  <p className="text-center text-gray-600 dark:text-gray-400 text-sm">4-hour cruise</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm font-bold">
                    Perfect for intimate celebrations:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Elopement <strong>boat wedding ceremony</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Immediate family only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Micro-wedding celebrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Intimate <strong>rehearsal dinner boat</strong></span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-300 rounded-xl ring-4 ring-purple-200">
                <CardHeader className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900">
                  <Badge className="bg-purple-600 text-white w-fit mx-auto mb-2">Most Popular</Badge>
                  <CardTitle className="text-xl text-center">25-50 Guest Boats</CardTitle>
                  <p className="text-3xl font-bold text-center text-purple-600 mt-2">$1,680-$2,380</p>
                  <p className="text-center text-gray-600 dark:text-gray-400 text-sm">4-hour cruise</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm font-bold">
                    Ideal for most <strong>lake travis wedding</strong> events:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Traditional <strong>austin wedding boats</strong> size</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Full wedding party + close family</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Ceremony + reception on same boat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Rehearsal dinners for extended family</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-300 rounded-xl">
                <CardHeader className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900">
                  <CardTitle className="text-xl text-center">75-Guest Boat</CardTitle>
                  <p className="text-3xl font-bold text-center text-pink-600 mt-2">$2,660</p>
                  <p className="text-center text-gray-600 dark:text-gray-400 text-sm">4-hour cruise</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm font-bold">
                    For grand <strong>boat reception venue</strong> celebrations:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Large wedding celebrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Extended family + friend groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Multi-level boat with spacious areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Full reception with dancing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="planning-guide" className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Wedding Boat Planning Guide
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Successfully planning your <strong>lake travis wedding boat</strong> event requires attention to several key logistics. Book early—popular wedding season dates (April-October) fill up quickly for <strong>unique wedding venues austin</strong>. We recommend reserving your boat 6-9 months in advance for your <strong>austin lake wedding</strong>, especially for weekend dates during peak season. Work closely with <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">Premier Party Cruises</Link> to coordinate timing, vendor access, and all special requirements for your <strong>boat wedding ceremony</strong> or reception.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-2 border-blue-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-700 dark:text-blue-400">
                    Vendor Coordination
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Your <strong>wedding boat rental austin</strong> works seamlessly with your other wedding vendors. Coordinate with:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Photographers familiar with boat settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Caterers experienced with boat service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Florists for boat-friendly arrangements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Officiants comfortable on boats</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-700 dark:text-purple-400">
                    Timeline Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Plan your <strong>boat wedding ceremony</strong> timeline accounting for:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>30 min early boarding for setup & guests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>20-30 min ceremony itself</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Cocktail hour while cruising scenic areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Dinner, toasts, cake cutting, dancing time</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-pink-700 dark:text-pink-400">
                    Guest Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Help guests prepare for your <strong>lake travis wedding</strong>:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Provide detailed marina directions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Suggest appropriate footwear (boat-safe)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Note weather-appropriate attire needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Share boarding time (arrive 20 min early)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-green-700 dark:text-green-400">
                    Weather Contingency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Austin's weather is generally reliable, but plan for:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Covered areas available on all boats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Climate-controlled indoor spaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Flexible ceremony location options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Rescheduling policies for severe weather</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="pricing-packages" className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Wedding Package Pricing
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Wedding boat rental austin</strong> pricing is straightforward and all-inclusive. <Link href="/private-cruises" className="text-blue-600 hover:text-blue-700 font-semibold">Private wedding cruises</Link> range from <strong>$1,050 to $2,660 for a complete 4-hour cruise</strong>, depending on boat size and package level. These rates include captain and crew, all fuel, premium amenities, sound system, coolers with ice, and professional service. When comparing to traditional venue costs plus rentals, catering, and coordination, <strong>lake travis wedding venues</strong> on boats offer exceptional value for your <strong>austin lake wedding</strong> celebration!
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-pink-300 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">What's Included in Every Wedding Package</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <span>Professional captain and crew for your <strong>boat wedding ceremony</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <span>Premium sound system for ceremony music & toasts</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <span>Coolers pre-filled with ice for your beverages</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <span>All fuel and operational costs covered</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <span>Clean restroom facilities onboard</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <span>Both indoor and outdoor seating areas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <span>Vendor coordination and access to the boat</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <span>Stunning Lake Travis & Hill Country views</span>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-300 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Optional Upgrades for Your Wedding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold mb-3 text-gray-900 dark:text-white">Professional Services</h5>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <Gift className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Professional photography packages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Gift className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>DJ or live music entertainment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Gift className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Videography services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Gift className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Day-of coordinator</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold mb-3 text-gray-900 dark:text-white">Amenities & Decor</h5>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <Gift className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Catering coordination with local restaurants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Gift className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Custom floral arrangements and decor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Gift className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Specialty lighting and ambiance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Gift className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Extended cruise hours beyond 4-hour standard</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="real-weddings" className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Real Wedding Stories from Lake Travis
            </h2>
            
            <div className="space-y-6">
              <Card className="border-2 border-pink-300 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Heart className="h-8 w-8 text-pink-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">Jessica & Michael - May 2025</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">50-guest ceremony & reception | $2,180</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Our <strong>boat wedding ceremony</strong> on Lake Travis was absolutely magical! The sunset ceremony was breathtaking, and having our reception on the same boat meant no transition stress. Our guests LOVED the unique venue—many said it was the best wedding they'd ever attended. <Link href="/" className="text-pink-600 hover:text-pink-700">Premier Party Cruises</Link> made everything seamless, from coordinating our caterer to timing the ceremony perfectly for golden hour photos. Worth every penny for this <strong>lake travis wedding</strong> experience!"
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-300 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Users className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">David & Sarah - September 2025</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Elopement + rehearsal dinner | 2 cruises</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "We did an intimate elopement <strong>boat wedding ceremony</strong> with just our parents on the 14-guest boat, then hosted our full <strong>rehearsal dinner boat</strong> celebration the next day with 40 friends. This gave us the best of both worlds—the private, emotional ceremony we wanted plus a big celebration with everyone we love. These <strong>unique wedding venues austin</strong> options let us customize our wedding weekend perfectly. Highly recommend this approach!"
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-300 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Camera className="h-8 w-8 text-purple-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">Amanda & Chris - October 2025</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">25-guest ceremony | $1,680</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "As a photographer myself, I knew our <strong>austin lake wedding</strong> photos would be incredible on Lake Travis, but they exceeded even my high expectations! The natural lighting, water reflections, and Hill Country backdrop created stunning images with zero artificial setup needed. Our <strong>wedding boat rental austin</strong> investment paid for itself in the photos alone—we didn't need elaborate decorations or expensive backdrops. The boat itself was the perfect venue!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-16 bg-gradient-to-b from-white to-pink-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-pink-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Heart className="h-8 w-8 text-pink-600" />
                Ready to Plan Your Dream Wedding on Lake Travis?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Transform your wedding dreams into reality with a <strong>boat wedding ceremony</strong>, <strong>rehearsal dinner boat</strong>, or reception on the stunning waters of Lake Travis! Whether you're envisioning an intimate elopement for two or a grand celebration with 75 guests, our <strong>lake travis wedding boat</strong> options provide the perfect setting for your special day. Say "I do" with Hill Country views, create unforgettable memories with your loved ones, and enjoy stress-free planning with our experienced team.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                <Link href="/" className="text-pink-600 hover:text-pink-700 font-semibold">Premier Party Cruises</Link> specializes in creating magical <strong>lake travis wedding venues</strong> that reflect your unique love story. From coordinating with your photographer and caterer to ensuring perfect ceremony timing for sunset photos, we handle every detail of your <strong>wedding boat rental austin</strong> celebration. Our fleet of <strong>austin wedding boats</strong> offers something for every wedding style and budget among the most <strong>unique wedding venues austin</strong> has to offer!
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Contact us today to start planning your <strong>austin lake wedding</strong> on the water. Popular wedding season dates book up quickly, so reach out now to secure your preferred date for your <strong>boat reception venue</strong> celebration. Let's create the wedding of your dreams on beautiful Lake Travis!
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      <QuoteBuilderSection />

      <Footer />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Lake Travis Wedding Boat Rentals: Unique Venues for Austin Celebrations",
          "description": "Discover unique Lake Travis wedding boat rentals for ceremonies, rehearsal dinners & receptions. Create unforgettable Austin wedding celebrations on the water!",
          "image": [
            "https://premierpartycruises.com/attached_assets/party-atmosphere-2.webp",
            "https://premierpartycruises.com/attached_assets/party-atmosphere-1.webp",
            "https://premierpartycruises.com/attached_assets/dancing-party-scene.webp"
          ],
          "author": {
            "@type": "Organization",
            "name": "Premier Party Cruises",
            "url": "https://premierpartycruises.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Premier Party Cruises",
            "logo": {
              "@type": "ImageObject",
              "url": "https://premierpartycruises.com/attached_assets/PPC-Logo-LARGE.webp"
            }
          },
          "datePublished": "2025-11-11",
          "dateModified": "2025-11-11",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://premierpartycruises.com/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "64",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}
      </script>
    </div>
  );
}

import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { SectionReveal } from '@/components/SectionReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { 
  Anchor, Ship, Users, Calendar, Shield, CheckCircle2,
  Sun, Waves, Music, Camera, Sparkles, Clock
} from 'lucide-react';
import { Link } from 'wouter';

export default function LakeTravisBoatRentalGuide() {
  const { isEditMode } = useInlineEdit();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950" data-page-ready="lake-travis-boat-rental-guide">
      <SEOHead 
        pageRoute="/first-time-lake-travis-boat-rental-guide"
        defaultTitle="Lake Travis Boat Rental Guide | Austin Party"
        defaultDescription="First-time Lake Travis boat rental? Get essential tips for successful Austin party planning. Everything you need to know for your event on Lake Travis."
        defaultKeywords={[
          'Lake Travis boat rental',
          'Austin party planning',
          'first time boat rental',
          'Lake Travis party boat',
          'Austin boat charter',
          'party boat Austin',
          'Lake Travis events',
          'Austin bachelor party boat',
          'Lake Travis bachelorette party'
        ]}
        schemaType="article"
      />
      <PublicNavigation />
      <Breadcrumb />
      
      {/* Hero Section */}
      <SectionReveal>
        <section className="relative py-24 px-6 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center">
            <Anchor className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 text-white drop-shadow-lg">
              First-Time Lake Travis Boat Rental: Essential Tips for Austin Party Planning
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Everything you need to know for your perfect Lake Travis party boat experience
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Updated November 2025</span>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Introduction */}
      <SectionReveal>
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Planning your first <strong>Lake Travis boat rental</strong> for an Austin party? You're in for an unforgettable experience! Whether it's a <Link href="/bachelor-party-austin" className="text-blue-600 hover:text-blue-700 font-semibold">bachelor party</Link>, <Link href="/bachelorette-party-austin" className="text-blue-600 hover:text-blue-700 font-semibold">bachelorette celebration</Link>, <Link href="/corporate-events" className="text-blue-600 hover:text-blue-700 font-semibold">corporate event</Link>, or <Link href="/birthday-parties" className="text-blue-600 hover:text-blue-700 font-semibold">birthday bash</Link>, Lake Travis offers the perfect backdrop for your event. This comprehensive guide covers everything first-timers need to know about Austin party planning on the water.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="hover:shadow-xl transition-all rounded-xl">
                <CardContent className="p-6 text-center">
                  <Ship className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Multiple Boats</h3>
                  <p className="text-gray-600 dark:text-gray-400">From 14 to 75 guests</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all rounded-xl">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Perfect Safety</h3>
                  <p className="text-gray-600 dark:text-gray-400">15+ years, zero incidents</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all rounded-xl">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">All-Inclusive</h3>
                  <p className="text-gray-600 dark:text-gray-400">Everything you need</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Why Choose Lake Travis */}
      <SectionReveal>
        <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Why Lake Travis is Perfect for Your Party
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Lake Travis isn't just any lake – it's Austin's premier destination for water-based celebrations. Located just 20 minutes from downtown Austin, this 19,000-acre reservoir offers stunning Hill Country views, crystal-clear water, and perfect weather conditions for most of the year.
              </p>
              
              <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">What Makes Lake Travis Special:</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Sun className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">300+ Days of Sunshine</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Austin's incredible weather means you can party on the water nearly year-round. Spring through fall offers perfect conditions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Waves className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Crystal Clear Waters</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        The lake's clean, refreshing water is perfect for swimming, floating, and water activities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Camera className="h-8 w-8 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Instagram-Worthy Views</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Stunning Hill Country scenery provides the perfect backdrop for your celebration photos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Users className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Close to Austin</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Just 20 minutes from downtown, making it easy for all your guests to join the fun.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Understanding Rental Options */}
      <SectionReveal>
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Understanding Your Lake Travis Boat Rental Options
            </h2>

            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When booking your first Lake Travis boat rental, it's crucial to understand what's included in your package. At <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">Premier Party Cruises</Link>, we offer truly all-inclusive packages that take the stress out of party planning.
              </p>
            </div>

            <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-blue-600" />
                  What's Included in Your Rental
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Professional Captain</strong> - Licensed, experienced captains who prioritize your safety and fun</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Fuel Included</strong> - No surprise costs, everything's covered in your price</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Premium Sound System</strong> - Bluetooth-enabled speakers for your perfect party playlist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Large Floats</strong> - Inflatable water toys for swimming and relaxing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Coolers</strong> - BYO ice or use Party On Delivery for hassle-free refreshments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Life Jackets & Safety Equipment</strong> - All required safety gear included</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-xl">
              <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-600" />
                Pro Tip: Consider Your Group Size
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Our fleet accommodates 1-75 guests across three boats. Choose the <strong>Day Tripper</strong> (1-14 guests) for intimate gatherings, <strong>Meeseeks</strong> (15-30 guests) for medium parties, or <strong>Clever Girl</strong> (31-75 guests) for large celebrations. Visit our <Link href="/private-cruises" className="text-blue-600 hover:text-blue-700 font-semibold">Private Cruises page</Link> for detailed pricing, or check out the <Link href="/atx-disco-cruise" className="text-blue-600 hover:text-blue-700 font-semibold">ATX Disco Cruise</Link> for a unique all-inclusive experience.
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Safety First */}
      <SectionReveal>
        <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Navigating Lake Travis Safely and Responsibly
            </h2>

            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Safety is paramount when enjoying Lake Travis. That's why we maintain a <strong>perfect safety record</strong> over 15+ years of operation. Our experienced captains handle all navigation while you focus on having fun.
              </p>
            </div>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                  <Shield className="h-8 w-8 text-blue-600" />
                  Our Safety Commitments
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Licensed Captains</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      All our captains are licensed, fun, and experienced - taking your group safely around the lake in style.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Safety Equipment</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Life jackets for all passengers, first aid kits, and emergency communication equipment on every boat.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Weather Monitoring</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      We continuously monitor weather conditions and will reschedule if conditions aren't safe.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Responsible Service</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      We follow all Texas Parks and Wildlife guidelines for responsible boating and alcohol consumption.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </SectionReveal>

      {/* Party On Delivery Integration */}
      <SectionReveal>
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              The Role of Alcohol Delivery in Your Lake Travis Party
            </h2>

            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">Party On Delivery</a> has revolutionized Lake Travis boat parties. As Austin's only integrated alcohol delivery service for boat parties, they deliver drinks directly to your boat - chilled, organized, and ready to enjoy.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Why Use Party On Delivery?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Music className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Delivered to Your Boat</strong> - No hauling heavy coolers or worrying about ice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Pre-Chilled & Ready</strong> - Everything arrives cold and ready to serve</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Seamless Integration</strong> - Coordinates directly with Premier Party Cruises for timing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Music className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300"><strong>Focus on Fun</strong> - Eliminate logistics stress and enjoy your celebration</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <a 
                    href="https://partyondelivery.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="lg" data-testid="button-party-on-delivery">
                      Visit Party On Delivery
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </SectionReveal>

      {/* Maximizing Your Experience */}
      <SectionReveal>
        <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Maximizing Your First-Time Boat Rental Experience
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">📅 Book in Advance</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Especially during peak season (March-October), popular dates fill up fast. Book 2-3 weeks ahead for best availability.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">🎒 Pack Smart</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Bring sunscreen, towels, swimwear, sunglasses, and waterproof phone cases. We provide coolers and floats!
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">💬 Communicate Clearly</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Share your party vision with us! Special songs? Surprise moments? We'll make it happen.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">😎 Relax & Enjoy</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    With our all-inclusive service, just show up and get down. We handle everything else!
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                A well-planned party is a stress-free party. With Premier Party Cruises and Party On Delivery, you have everything needed for an unforgettable Austin adventure on Lake Travis!
              </p>
              <Link href="/chat">
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold text-lg px-8 py-6 rounded-xl" data-testid="button-build-quote">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Build My Quote Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              FAQ: Your Lake Travis Boat Rental Questions Answered
            </h2>

            <div className="space-y-6">
              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Q: What boats can I rent on Lake Travis?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Premier Party Cruises offers three boats: Day Tripper (1-14 guests, $1,050-$1,838 for 4-hour cruise), Meeseeks (15-30 guests, $1,181-$1,969 for 4-hour cruise), and Clever Girl (31-75 guests, $1,413-$2,260 for 4-hour cruise). All include captain, fuel, sound system, and floats.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Q: Can I bring my own drinks?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Absolutely! We provide coolers (BYO ice). Or use <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">Party On Delivery</a> to have everything delivered directly to your boat, pre-chilled and ready.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Q: Is Lake Travis good for first-time boat renters?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Perfect for first-timers! Our licensed captains handle all navigation, safety, and logistics. You just bring your group and enjoy the experience. We've safely hosted thousands of guests over 15 years.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Q: What's the best time of year for Lake Travis boat rentals?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    March through October offers ideal conditions, with peak season May-September. However, Austin's 300+ days of sunshine mean you can enjoy the lake nearly year-round!
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Q: How far in advance should I book?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    For peak season weekends (especially bachelor/bachelorette parties), book 2-4 weeks ahead. Last-minute bookings are sometimes available - contact us to check!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Related Services */}
      <SectionReveal>
        <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-gray-900 dark:text-white">
              Explore Our Lake Travis Party Boat Experiences
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/bachelor-party-austin" data-testid="link-bachelor-party">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Bachelor Party Boats</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Ultimate Austin bachelor party cruises with DJ, photographer, and all-inclusive packages
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/bachelorette-party-austin" data-testid="link-bachelorette-party">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Bachelorette Cruises</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Unforgettable bachelorette party boats - Our specialty since 2009
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/private-cruises" data-testid="link-private-cruises">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Private Charters</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Exclusive boat rentals for birthdays, corporate events, and celebrations
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      <Footer />
    </div>
  );
}
